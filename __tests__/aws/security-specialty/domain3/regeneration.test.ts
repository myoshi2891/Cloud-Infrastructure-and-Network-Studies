import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DIAGRAM_DESCRIPTIONS } from '@/app/aws/security-specialty/domain3/constants';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain3-guide.fidelity.json';

const scriptPath = 'scripts/migrate-scs-domain3.mjs';
const examPrepPath = 'app/aws/security-specialty/domain3/sections/ExamPrep.tsx';
const script = readFileSync(scriptPath, 'utf8');
const css = readFileSync('app/aws/security-specialty/domain3/page.css', 'utf8');

/** 生成スクリプトの実行に必要な固定原本コミットがあるかを返す。 */
const hasSourceCommit = (): boolean =>
    spawnSync('git', ['cat-file', '-e', `${fixture.sourceCommit}^{commit}`]).status === 0;

describe('SCS Domain 3 再生成の保護', () => {
    it.skipIf(!hasSourceCommit())(
        '手動保守の ExamPrep は単独指定でも上書きせず失敗終了する',
        () => {
            const before = readFileSync(examPrepPath, 'utf8');

            const result = spawnSync('bun', [scriptPath, 'examprep'], { encoding: 'utf8' });

            expect(result.status).toBe(1);
            expect(result.stderr).toContain('手動保守');
            expect(readFileSync(examPrepPath, 'utf8')).toBe(before);
        },
        30_000,
    );

    it('演習問題カードの CSS を生成スクリプトが一字一句保持する', () => {
        const practiceCss = css.slice(css.indexOf('/* Section 9:'));

        expect(practiceCss).toContain('.practice-option');
        expect(script).toContain(practiceCss.trimEnd());
    });

    it('全図の説明を生成スクリプトの descriptions と同期する', () => {
        Object.values(DIAGRAM_DESCRIPTIONS).forEach((description) => {
            expect(script).toContain(description);
        });
    });

    it('ガイド本体を Server Component に保ち、生成テンプレートも同じにする', () => {
        const guide = readFileSync('app/aws/security-specialty/domain3/ScsDomain3Guide.tsx', 'utf8');
        const template = script.slice(script.indexOf('const guideComponent ='));

        expect(guide).not.toContain('use client');
        expect(template.slice(0, template.indexOf('import NavBar'))).not.toContain('use client');
    });
});
