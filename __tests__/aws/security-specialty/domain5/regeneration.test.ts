import { execFileSync } from 'node:child_process';
import { mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { DIAGRAM_DESCRIPTIONS } from '@/app/aws/security-specialty/domain5/constants';
import renderTheme from '@/app/aws/security-specialty/domain5/render-theme.json';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain5-guide.fidelity.json';

const scriptPath = 'scripts/migrate-scs-domain5.mjs';
const script = readFileSync(scriptPath, 'utf8');
const css = readFileSync('app/aws/security-specialty/domain5/page.css', 'utf8');

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

describe('SCS Domain 5 再生成の整合性', () => {
    it('全図の説明を生成スクリプトの descriptions と同期する', () => {
        Object.values(DIAGRAM_DESCRIPTIONS).forEach((description) => {
            expect(script).toContain(description);
        });
    });

    it('Mermaid・コードブロック・構文ハイライトの追加CSSを生成スクリプトが保持する', () => {
        const tailCss = css.slice(css.indexOf('.scs-domain5-page .mermaid-wrap > [role="img"]'));
        expect(tailCss).toContain('.hljs-keyword');
        expect(tailCss).toContain('pre.code.code-block');
        const normalizedScript = script.replaceAll('${scope}', '.scs-domain5-page');
        expect(normalizedScript).toContain(tailCss.trimEnd());
    });

    it('ガイド本体を Server Component に保ち、生成テンプレートも同じにする', () => {
        const guide = readFileSync(
            'app/aws/security-specialty/domain5/ScsDomain5Guide.tsx',
            'utf8',
        );
        const template = script.slice(script.indexOf('const guideComponent ='));

        expect(guide).not.toContain('use client');
        expect(template.slice(0, template.indexOf('import NavBar'))).not.toContain('use client');
    });

    it('目次の実装を生成テンプレートと同一に保つ', () => {
        const template = script.match(/const navBarComponent = `([\s\S]*?)`;\n/)?.[1] ?? '';
        const generated = template.replaceAll('\\`', '`').replaceAll('\\$', '$');

        expect(generated).toBe(readFileSync('app/aws/security-specialty/domain5/NavBar.tsx', 'utf8'));
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
        const page = readFileSync('app/aws/security-specialty/domain5/page.tsx', 'utf8');
        expect(page).not.toContain('use client');
    });
});

describe.skipIf(!hasSource)('SCS Domain 5 固定Git原本からの全量再生成', () => {
    const route = 'app/aws/security-specialty/domain5';
    let output = '';

    /** 一時ディレクトリへ生成したファイルの内容を返す。 */
    const generated = (file: string) => readFileSync(join(output, route, file), 'utf8');

    beforeAll(() => {
        // 実ファイルを上書きしないよう、作業ディレクトリだけを一時ディレクトリへ切り替えて全量生成する
        output = mkdtempSync(join(tmpdir(), 'scs-domain5-regeneration-'));
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

        expect(files).toEqual(expect.arrayContaining(['page.css', 'sections/ExamPrep.tsx']));
        files.forEach((file) => {
            expect(generated(file), file).toBe(readFileSync(join(route, file), 'utf8'));
        });
    });

    it('全8問の PracticeOptions を問題 ID と原本の正解つきで保持する', () => {
        const wrappers = [
            ...generated('sections/ExamPrep.tsx').matchAll(/<PracticeOptions questionId="([^"]+)" answers=\{([^}]+)\}>/g),
        ].map((match) => [match[1], JSON.parse(match[2]!)]);

        expect(wrappers).toEqual([
            ['問題-1', ['B']],
            ['問題-2', ['B']],
            ['問題-3', ['A', 'C']],
            ['問題-4', ['C']],
            ['問題-5', ['C']],
            ['問題-6', ['B']],
            ['問題-7', ['B']],
            ['問題-8', ['B']],
        ]);
        expect(generated('sections/ExamPrep.tsx')).toContain('import PracticeOptions from "../PracticeOptions";');
    });

    it('演習の配置・選択肢・採点結果の CSS を保持し、問題文の強調をバッジ化しない', () => {
        const regenerated = generated('page.css');

        [
            '[data-part="examprep"] > h2 + p {',
            '[data-part="examprep"] > h3 + p {',
            '[data-part="examprep"] > .practice-options > li {',
            '.main .practice-options > li[data-result="correct"] {',
            '.main .practice-options > li[data-result="wrong"] {',
            '.practice-feedback[data-result="correct"] {',
            '.practice-feedback[data-result="wrong"] {',
        ].forEach((rule) => expect(regenerated).toContain(rule));
        expect(regenerated).not.toContain('[data-part="examprep"] > p > strong');
    });
});
