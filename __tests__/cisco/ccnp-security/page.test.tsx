// __tests__/cisco/ccnp-security/page.test.tsx
// @vitest-environment jsdom
import { vi, describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fireEvent, render } from '@testing-library/react';
import inventory from '@/docs/migration-inventory/cisco-ccnp-security.json';
import CcnpSecurityGuide from '@/app/cisco/ccnp-security/CcnpSecurityGuide';
import { DIAGRAMS, NAV_GROUPS } from '@/app/cisco/ccnp-security/constants';
import { withCcnpSecurityCorrections } from '@/__tests__/helpers/ccnp-security-source-corrections';
import { defineMigrationSuite, extractBodyContent } from '@/__tests__/helpers/migration-test-utils';

vi.mock('@/components/MermaidDiagram', async () => {
    const { MermaidDiagramMock } = await import('@/__tests__/helpers/migration-test-utils');
    return { MermaidDiagram: MermaidDiagramMock };
});

defineMigrationSuite(
    'CCNP Security 完全ガイド — 全量移行検証',
    CcnpSecurityGuide,
    withCcnpSecurityCorrections(inventory),
);

describe('CCNP Security ガイド — リスト・スタイリング・図解・コード検証', () => {
    it('スコープCSSに金色ドットリストと数字バッジ、Tabler Icons、図解ラッパー透過、リンク下線が定義されている', () => {
        const cssPath = resolve('app/cisco/ccnp-security/page.css');
        const css = readFileSync(cssPath, 'utf8').replace(/\s+/g, '');
        expect(css).toContain("@import'@tabler/icons-webfont/tabler-icons.min.css'");
        expect(css).toContain('.ccnp-security-page');
        expect(css).toContain('mainul>li::before');
        expect(css).toContain('mainol>li::before');
        expect(css).toContain('.srclistli::before');
        expect(css).toContain('.diagram.mm>[role="img"]{background:transparent');
        expect(css).toContain('.ccnp-security-pagea{color:var(--color-ccnp-security-indigo);text-decoration:underline');
    });

    it('ページCSSはローカルのカスタムプロパティを定義せず、構文ハイライト以外に生の hex を残さない', () => {
        const css = readFileSync(resolve('app/cisco/ccnp-security/page.css'), 'utf8');
        expect(css.match(/^\s*--[A-Za-z0-9_-]+\s*:/gm)).toBeNull();
        // 構文ハイライト（.hljs-* / .tk-*）のルールだけを除外して生 hex を検出する
        const nonHighlightRules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
            .filter(([, selector]) => !/\.(hljs-|tk-)/.test(selector ?? ''))
            .map(([, selector, body]) => `${(selector ?? '').trim()}{${body ?? ''}}`);
        const offending = nonHighlightRules.filter((rule) => /#[0-9a-fA-F]{3,8}\b/.test(rule));
        expect(offending).toEqual([]);
    });

    it('ページCSSが参照する --color-ccnp-security-* / --font-ccnp-security-* はすべて globals.css の @theme に定義されている', () => {
        const css = readFileSync(resolve('app/cisco/ccnp-security/page.css'), 'utf8');
        const globals = readFileSync(resolve('app/globals.css'), 'utf8');
        const referenced = [...new Set([...css.matchAll(/var\((--(?:color|font)-ccnp-security-[\w-]+)\)/g)].map((m) => m[1]))];
        expect(referenced.length).toBeGreaterThan(0);
        const missing = referenced.filter((name) => !new RegExp(`^\\s*${name}\\s*:`, 'm').test(globals));
        expect(missing).toEqual([]);
    });

    it('試験アイコン用の icon-theme-ccnp-security ユーティリティが Cisco テーマ配色で globals.css に定義されている', () => {
        const globals = readFileSync(resolve('app/globals.css'), 'utf8');
        const block = globals.match(/@utility icon-theme-ccnp-security\s*\{([^}]*)\}/)?.[1] ?? '';
        expect(block.replace(/\s+/g, '')).toBe(
            'background:var(--color-theme-cisco-bg);color:var(--color-theme-cisco-fg);',
        );
    });

    it('サイドバーの nav ランドマークに読み上げ名があり、目次は NAV_GROUPS と同じ順序・文言で描画される', () => {
        const { container } = render(<CcnpSecurityGuide />);
        const nav = container.querySelector('#sidebar nav');
        expect(nav?.getAttribute('aria-label')?.trim()).toBeTruthy();
        const expected: string[] = [];
        for (const group of NAV_GROUPS) {
            if (group.href) expected.push(`${group.href}|${group.title}`);
            for (const item of group.items) {
                expected.push(`${item.href}|${item.title}`);
                for (const sub of item.subItems ?? []) expected.push(`${sub.href}|${sub.title}`);
            }
        }
        const rendered = [...container.querySelectorAll('#sidebar nav a')].map(
            (a) => `${a.getAttribute('href')}|${a.textContent}`,
        );
        expect(rendered).toEqual(expected);
        const plainHeaders = [...container.querySelectorAll('#sidebar nav .nav-group.nav-plain')].map((e) => e.textContent);
        expect(plainHeaders).toEqual(NAV_GROUPS.filter((g) => !g.href).map((g) => g.title));
        expect(container.querySelectorAll('#sidebar nav .nav-group > a')).toHaveLength(NAV_GROUPS.filter((g) => g.href).length);
    });

    it.each([
        ['d5', 'SCOR v2.0 出題比率'],
        ['d31', 'SNCF v1.2 出題比率'],
        ['d36', 'SISE v1.2 出題比率'],
        ['d45', 'SSCA v2.0 出題比率'],
        ['d49', 'SDSI v1.0 出題比率'],
    ])('出題比率の円グラフ %s は内容を表す短い読み上げ名「%s」を持つ', (id, label) => {
        const { container } = render(<CcnpSecurityGuide />);
        expect(container.querySelector(`#diag-${id}`)?.getAttribute('aria-label')).toBe(label);
    });

    it('モバイルメニューボタンに Tabler Icon (.ti-menu-2) が使用され、コードブロックに原本の .tk-c / .tk-p / .hljs-subst が保持されている', () => {
        const { container } = render(<CcnpSecurityGuide />);
        expect(container.querySelector('#menuBtn i.ti.ti-menu-2')).not.toBeNull();
        expect(container.querySelectorAll('.code-block .tk-c').length).toBe(18);
        expect(container.querySelectorAll('.code-block .tk-p').length).toBe(8);
        expect(container.querySelectorAll('.code-block .hljs-subst').length).toBe(3);
    });

    it('全コードブロックの読み上げ名は実装上の言語クラスを含まず、直前の見出しを示して一意である', () => {
        // Arrange & Act
        const { container } = render(<CcnpSecurityGuide />);
        const labels = [...container.querySelectorAll('.code-block')].map((block) => block.getAttribute('aria-label') ?? '');

        // Assert
        expect(labels).toHaveLength(inventory.counts.codeBlock);
        labels.forEach((label) => {
            expect(label).toMatch(/^.+ のコード例$/);
            expect(label).not.toMatch(/language-|plain/);
        });
        expect(new Set(labels).size).toBe(labels.length);
        expect(labels[0]).toBe('1.10 セキュリティ機器 API を呼び出すスクリプトの読解（Python） のコード例');
    });

    it('製品名は Cisco Defense Orchestrator に訂正されている', () => {
        // Arrange & Act
        const { container } = render(<CcnpSecurityGuide />);

        // Assert
        expect(container.textContent).toContain('Cisco Defense Orchestrator → Security Cloud Control');
        expect(container.textContent).not.toContain('Defender Orchestrator');
    });

    it('Serif トークンは登録済みの可変フォント名を優先し、ページがそのフォントを読み込む', () => {
        // Arrange
        const globals = readFileSync(resolve('app/globals.css'), 'utf8');
        const page = readFileSync(resolve('app/cisco/ccnp-security/page.tsx'), 'utf8');

        // Act
        const token = globals.match(/--font-ccnp-security-serif:\s*([^;]+);/)?.[1];

        // Assert
        expect(token).toBe('"Source Serif 4 Variable", "Source Serif 4", "Noto Serif JP", "Hiragino Mincho ProN", "Yu Mincho", Georgia, serif');
        expect(page).toContain("import '@fontsource-variable/source-serif-4/index.css'");
    });

    it('生成器の NavBar テンプレートは現行のリンク操作ハンドラーと一致し、再生成で退行しない', () => {
        // Arrange
        const navBar = readFileSync(resolve('app/cisco/ccnp-security/NavBar.tsx'), 'utf8');
        const generator = readFileSync(resolve('scripts/migrate-ccnp-security.mjs'), 'utf8');

        // Act
        const handler = navBar.slice(navBar.indexOf('const handleLinkClick'), navBar.indexOf('[onClose]);'));

        // Assert
        expect(handler).toContain('targetEl.focus({ preventScroll: true });');
        expect(generator).toContain(handler);
    });

    it('全53図がビューポート接近時の遅延描画を指定している', () => {
        const { container } = render(<CcnpSecurityGuide />);
        const diagrams = [...container.querySelectorAll('[data-chart]')];
        expect(diagrams).toHaveLength(53);
        diagrams.forEach((diagram) => {
            expect(diagram.getAttribute('data-defer-until-visible')).toBe('true');
        });
    });

    it('Diagram コンポーネントが原本単体の全派生色を含む render-theme.json を使用している', () => {
        const themePath = resolve('app/cisco/ccnp-security/render-theme.json');
        const theme = JSON.parse(readFileSync(themePath, 'utf8'));
        expect(theme.theme).toBe('base');
        expect(theme.flowchart.padding).toBe(15);
        expect(theme.sequence.wrap).toBe(false);
        expect(theme.themeVariables.mainBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.nodeBkg).toBe('#EEF1F8');
        expect(theme.themeVariables.clusterBkg).toBe('#F6F7F9');
    });
});

describe('CCNP Security ガイド — コードブロックのキーボードフォーカス', () => {
    const css = readFileSync(resolve('app/cisco/ccnp-security/page.css'), 'utf8');

    it('.code-block の outline を常時無効化せず、:focus-visible で可視の枠を表示する', () => {
        const base = css.slice(css.indexOf('.ccnp-security-page .code-block {'));
        expect(base.slice(0, base.indexOf('}'))).not.toMatch(/outline:\s*none/);

        const focusStart = css.indexOf('.ccnp-security-page .code-block:focus-visible {');
        expect(focusStart, 'missing .code-block:focus-visible rule').toBeGreaterThanOrEqual(0);
        const focus = css.slice(focusStart, css.indexOf('}', focusStart));
        expect(focus).toMatch(/outline:\s*2px solid var\(--color-ccnp-security-indigo\);/);
    });
});

describe('CCNP Security ガイド — モバイル目次のアクセシビリティ', () => {
    const css = readFileSync(resolve('app/cisco/ccnp-security/page.css'), 'utf8');
    const mobile = css.slice(css.indexOf('@media (max-width: 1024px)'));
    const ruleOf = (selector: string): string => {
        const start = mobile.indexOf(`${selector} {`);
        expect(start, `missing mobile rule: ${selector}`).toBeGreaterThanOrEqual(0);
        return mobile.slice(start, mobile.indexOf('}', start));
    };

    it('閉じたサイドバーは visibility: hidden でフォーカス・読み上げ対象から外れ、スライド後に隠れる', () => {
        const closed = ruleOf('.ccnp-security-page .sidebar');
        expect(closed).toMatch(/transform:\s*translateX\(-100%\);/);
        expect(closed).toMatch(/visibility:\s*hidden;/);
        expect(closed).toMatch(/transition:\s*transform \.2s ease,\s*visibility 0s linear \.2s;/);
    });

    it('nav-open 時はサイドバーを即座に可視へ戻す', () => {
        const open = ruleOf('.ccnp-security-page.nav-open .sidebar');
        expect(open).toMatch(/transform:\s*none;/);
        expect(open).toMatch(/visibility:\s*visible;/);
        expect(open).toMatch(/transition:\s*transform \.2s ease,\s*visibility 0s;/);
    });

    it('目次ボタンは免責事項バナーの高さも含めて下へずらす', () => {
        const button = ruleOf('.ccnp-security-page .menu-btn');
        expect(button).toMatch(
            /top:\s*calc\(var\(--header-h, 60px\) \+ var\(--disclaimer-height, 0px\) \+ 12px\);/,
        );
    });
});

describe('CCNP Security ガイド — 802.1X シーケンス図 (d27)', () => {
    it('端末は Authenticator とだけ EAP を交換し、ISE とのやり取りは Authenticator が RADIUS で中継する', () => {
        const dsl = DIAGRAMS.d27 ?? '';
        const messages = dsl.split('\n').filter((line) => /->>|-->>/.test(line));
        // 端末(S)と ISE(R)を直接結ぶメッセージは存在しない
        expect(messages.filter((line) => /^S-+>>R:|^R-+>>S:/.test(line))).toEqual([]);
        const exchange = messages.findIndex((line) => line.startsWith('S->>A: 認証情報の交換'));
        expect(exchange).toBeGreaterThanOrEqual(0);
        expect(messages[exchange + 1]).toMatch(/^A->>R: /);
        // 既存の RADIUS のやり取りは保持する
        expect(messages).toContain('A->>R: RADIUS Access-Request(EAP をカプセル化)');
        expect(messages).toContain('R-->>A: Access-Challenge(EAP 方式のやり取り)');
        expect(messages).toContain('R-->>A: Access-Accept(VLAN/dACL/SGT)');
        expect(messages.at(-1)).toBe('A-->>S: EAP-Success・ポート開放');
    });
});

describe('CCNP Security ガイド — FTD のトラフィック処理順 (d33)', () => {
    it('受信時の宛先 NAT 逆変換をアクセスコントロールより前に置き、送出時の NAT と区別する', () => {
        const nodes = [...(DIAGRAMS.d33 ?? '').matchAll(/\b[A-Z]\w*\["([^"]+)"\]/g)].map((m) => m[1] ?? '');
        const indexOf = (text: string) => nodes.findIndex((label) => label.includes(text));
        const unNat = indexOf('宛先 NAT の逆変換');
        const acp = indexOf('アクセスコントロールルール');
        const outboundNat = indexOf('送信元 NAT');
        expect(unNat).toBeGreaterThanOrEqual(0);
        expect(unNat).toBeLessThan(acp);
        expect(outboundNat).toBeGreaterThan(acp);
        // NAT を除く既存の処理順は保持する
        const others = ['インタフェースで受信', 'プレフィルタ', 'セキュリティインテリジェンス', '復号', 'ID の解決', 'アクセスコントロールルール', '侵入防御/ファイルポリシー', '送出'];
        const positions = others.map(indexOf);
        expect(positions.every((p) => p >= 0)).toBe(true);
        expect([...positions].sort((a, b) => a - b)).toEqual(positions);
    });
});

describe('CCNP Security ガイド — 図の横スクロール領域', () => {
    it('.mm コンテナ自体がキーボードでフォーカスでき、横スクロール可能な領域として読み上げ名を持つ', () => {
        const { container } = render(<CcnpSecurityGuide />);
        const scrollers = [...container.querySelectorAll('.diagram > .mm')];
        expect(scrollers).toHaveLength(inventory.counts.diagram);
        scrollers.forEach((scroller) => {
            expect(scroller).toHaveAttribute('tabindex', '0');
            expect(scroller).toHaveAttribute('role', 'region');
            const label = scroller.getAttribute('aria-label') ?? '';
            const diagramLabel = scroller.parentElement?.getAttribute('aria-label') ?? '';
            expect(diagramLabel).not.toBe('');
            expect(label).toContain(diagramLabel);
            expect(label).toContain('横スクロール');
        });
    });
});

describe('CCNP Security ガイド — モバイル目次の Escape 操作', () => {
    const keydownCalls = (spy: { mock: { calls: unknown[][] } }) =>
        spy.mock.calls.filter(([type]) => type === 'keydown');

    const renderGuide = () => {
        const { container, unmount } = render(<CcnpSecurityGuide />);
        const page = container.querySelector('.ccnp-security-page');
        const button = container.querySelector<HTMLButtonElement>('#menuBtn');
        if (!page || !button) throw new Error('目次の開閉要素が描画されていません');
        return { page, button, unmount };
    };

    it('開いた目次を Escape で閉じ、フォーカスを開閉ボタンへ戻す', () => {
        // Arrange
        const { page, button } = renderGuide();
        fireEvent.click(button);
        expect(page).toHaveClass('nav-open');

        // Act
        fireEvent.keyDown(document, { key: 'Escape' });

        // Assert
        expect(page).not.toHaveClass('nav-open');
        expect(button).toHaveAttribute('aria-expanded', 'false');
        expect(document.activeElement).toBe(button);
    });

    it('Escape 以外のキーでは目次を閉じない', () => {
        // Arrange
        const { page, button } = renderGuide();
        fireEvent.click(button);

        // Act
        fireEvent.keyDown(document, { key: 'Enter' });

        // Assert
        expect(page).toHaveClass('nav-open');
        expect(button).toHaveAttribute('aria-expanded', 'true');
    });

    it('閉じている間は keydown を購読せず、Escape でフォーカスを奪わない', () => {
        // Arrange
        const addSpy = vi.spyOn(document, 'addEventListener');
        const { button } = renderGuide();

        // Act
        fireEvent.keyDown(document, { key: 'Escape' });

        // Assert
        expect(keydownCalls(addSpy)).toHaveLength(0);
        expect(document.activeElement).not.toBe(button);
        addSpy.mockRestore();
    });

    it.each([
        ['ボタンで閉じたとき', (button: HTMLButtonElement) => { fireEvent.click(button); }],
        ['Escape で閉じたとき', () => { fireEvent.keyDown(document, { key: 'Escape' }); }],
    ])('%s に登録済みの keydown リスナーを解除する', (_label, close) => {
        // Arrange
        const addSpy = vi.spyOn(document, 'addEventListener');
        const removeSpy = vi.spyOn(document, 'removeEventListener');
        const { button } = renderGuide();
        fireEvent.click(button);
        const [registered] = keydownCalls(addSpy);
        expect(registered).toBeDefined();

        // Act
        close(button);

        // Assert
        expect(keydownCalls(removeSpy).map(([, listener]) => listener)).toEqual([registered?.[1]]);
        addSpy.mockRestore();
        removeSpy.mockRestore();
    });

    it('開いたままアンマウントすると keydown リスナーを解除する', () => {
        // Arrange
        const addSpy = vi.spyOn(document, 'addEventListener');
        const removeSpy = vi.spyOn(document, 'removeEventListener');
        const { button, unmount } = renderGuide();
        fireEvent.click(button);
        const [registered] = keydownCalls(addSpy);
        expect(registered).toBeDefined();

        // Act
        unmount();

        // Assert
        expect(keydownCalls(removeSpy).map(([, listener]) => listener)).toEqual([registered?.[1]]);
        addSpy.mockRestore();
        removeSpy.mockRestore();
    });
});
