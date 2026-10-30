/** WCAG 2.x の相対輝度。`#rgb` / `#rrggbb` のみ受け付ける。 */
function relativeLuminance(hex: string): number {
    const raw = hex.replace('#', '');
    const full = raw.length === 3 ? [...raw].map((c) => c + c).join('') : raw;
    if (!/^[0-9a-fA-F]{6}$/.test(full)) throw new Error(`Unsupported color: ${hex}`);
    const [r, g, b] = [0, 2, 4].map((i) => {
        const c = Number.parseInt(full.slice(i, i + 2), 16) / 255;
        return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    }) as [number, number, number];
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x のコントラスト比（1〜21）。 */
export function contrastRatio(foreground: string, background: string): number {
    const [light, dark] = [relativeLuminance(foreground), relativeLuminance(background)].sort((a, b) => b - a) as [number, number];
    return (light + 0.05) / (dark + 0.05);
}

/** globals.css から `--<name>: <hex>;` の値を取り出す。未定義なら例外。 */
export function themeColor(globals: string, name: string): string {
    const match = globals.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,6});`));
    if (!match?.[1]) throw new Error(`Token not found: --${name}`);
    return match[1];
}
