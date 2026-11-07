import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DIAGRAM_DESCRIPTIONS } from '@/app/aws/security-specialty/domain6/constants';
import renderTheme from '@/app/aws/security-specialty/domain6/render-theme.json';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain6-guide.fidelity.json';

const scriptPath = 'scripts/migrate-scs-domain6.mjs';
const script = readFileSync(scriptPath, 'utf8');
const css = readFileSync('app/aws/security-specialty/domain6/page.css', 'utf8');

let hasSource = false;
try {
    execFileSync('git', ['cat-file', '-e', `${fixture.sourceCommit}^{commit}`], { stdio: 'ignore' });
    hasSource = true;
} catch (error) {
    if (process.env.CI) {
        throw new Error(`fixture.sourceCommit ${fixture.sourceCommit} が見つかりません。CI では完全な Git履歴を取得してください。`, {
            cause: error,
        });
    }
}

describe('SCS Domain 6 再生成の整合性', () => {
    it('全図の説明を生成スクリプトの descriptions と同期する', () => {
        Object.values(DIAGRAM_DESCRIPTIONS).forEach((description) => {
            expect(script).toContain(description);
        });
    });

    it('Mermaid・コードブロック・構文ハイライトの追加CSSを生成スクリプトが保持する', () => {
        const tailCss = css.slice(css.indexOf('.scs-domain6-page .mermaid-wrap > [role="img"]'));
        expect(tailCss).toContain('.hljs-keyword');
        expect(tailCss).toContain('pre.code.code-block');
        const normalizedScript = script.replaceAll('${scope}', '.scs-domain6-page');
        expect(normalizedScript).toContain(tailCss.trimEnd());
    });

    it('ガイド本体を Server Component に保ち、生成テンプレートも同じにする', () => {
        const guide = readFileSync(
            'app/aws/security-specialty/domain6/ScsDomain6Guide.tsx',
            'utf8',
        );
        const template = script.slice(script.indexOf('const guideComponent ='));

        expect(guide).not.toContain('use client');
        expect(template.slice(0, template.indexOf('import NavBar'))).not.toContain('use client');
    });

    it('目次の実装を生成テンプレートと同一に保つ', () => {
        const template = script.match(/const navBarComponent = `([\s\S]*?)`;\n/)?.[1] ?? '';
        const generated = template.replaceAll('\\`', '`').replaceAll('\\$', '$');

        expect(generated).toBe(readFileSync('app/aws/security-specialty/domain6/NavBar.tsx', 'utf8'));
    });

    it('色以外のテーマ値を文字列へ壊さず保持し、生成スクリプトも同じ変換に限定する', () => {
        expect(renderTheme.themeVariables).toMatchObject({
            THEME_COLOR_LIMIT: 12,
            radius: 5,
            strokeWidth: 1,
            useGradient: true,
        });
        expect(JSON.stringify(renderTheme)).not.toContain('#undefined');
        expect(script).toContain("typeof v === 'string' && isValid(v) ? toHex(v) : v");
    });

    it('Page コンポーネントを Server Component に保つ', () => {
        const page = readFileSync('app/aws/security-specialty/domain6/page.tsx', 'utf8');
        expect(page).not.toContain('use client');
    });
});

describe.skipIf(!hasSource)('SCS Domain 6 固定Git原本からの全量再生成', () => {
    const route = 'app/aws/security-specialty/domain6';
    let output = '';

    /** 一時ディレクトリへ生成したファイルの内容を返す。 */
    const generated = (file: string) => readFileSync(join(output, route, file), 'utf8');

    beforeAll(() => {
        output = mkdtempSync(join(tmpdir(), 'scs-domain6-regeneration-'));
        const gitDir = execFileSync('git', ['rev-parse', '--absolute-git-dir'], { encoding: 'utf8' }).trim();
        execFileSync('bun', [resolve(scriptPath), 'all'], {
            cwd: output,
            env: { ...process.env, GIT_DIR: gitDir },
            stdio: 'pipe',
        });
    }, 60_000);

    afterAll(() => {
        rmSync(output, { recursive: true, force: true });
    });

    it('生成する全ファイルがチェックイン済みの実装と完全一致する', () => {
        const files = readdirSync(join(output, route), { recursive: true, encoding: 'utf8' }).filter((file) =>
            statSync(join(output, route, file)).isFile(),
        );

        expect(files).toEqual(expect.arrayContaining(['page.css', 'sections/ExamPrep.tsx', 'sections/HeroIntro.tsx']));
        files.forEach((file) => {
            expect(generated(file), file).toBe(readFileSync(join(route, file), 'utf8'));
        });
    });
});

