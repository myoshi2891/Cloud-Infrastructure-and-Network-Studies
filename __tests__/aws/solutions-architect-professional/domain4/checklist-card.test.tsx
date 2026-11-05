// @vitest-environment jsdom
import fs from 'node:fs';
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { ChecklistCard, ChecklistCount } from '@/app/aws/solutions-architect-professional/domain4/ChecklistCard';

const renderCard = (restored: readonly boolean[]) => render(
    <ChecklistCard>
        <ChecklistCount total={restored.length} />
        {restored.map((checked, index) => (
            <label key={index}>
                <input type="checkbox" defaultChecked={checked} />
                {`項目${index + 1}`}
            </label>
        ))}
    </ChecklistCard>,
);

describe('SAP Domain 4 ChecklistCard の完了数', () => {
    it('ブラウザーが復元したチェック済み項目をマウント直後の完了数へ反映する', () => {
        // Arrange & Act: 戻る操作等でチェック状態が復元された状態を defaultChecked で再現する
        renderCard([true, false, true]);

        // Assert
        expect(screen.getByText('2 / 3 完了')).toBeInTheDocument();
    });

    it('マウント後の変更は既存の onChange で追従する', () => {
        // Arrange
        renderCard([true, false, false]);
        const [, second] = screen.getAllByRole('checkbox');

        // Act
        fireEvent.click(second as HTMLElement);

        // Assert
        expect(screen.getByText('2 / 3 完了')).toBeInTheDocument();
    });

    it('復元項目がなければ 0 件から始まる', () => {
        renderCard([false, false]);
        expect(screen.getByText('0 / 2 完了')).toBeInTheDocument();
    });

    it('再生成スクリプトの ChecklistCard テンプレートもマウント時同期を含む', () => {
        const script = fs.readFileSync('scripts/migrate-sap-domain4.mjs', 'utf8');
        const template = script.match(/write\('ChecklistCard\.tsx',`([\s\S]*?)`\);/)?.[1] ?? '';
        expect(template).toContain("const card=useCallback((node:HTMLDivElement|null)=>{if(node)setCount(node.querySelectorAll('input:checked').length);},[]);");
        expect(template).toContain('ref={card}');
        expect(template).toContain("querySelectorAll('input:checked')");
    });
});
