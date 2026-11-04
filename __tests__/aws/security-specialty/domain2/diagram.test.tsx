import { readFileSync } from 'node:fs';
import { render } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { Diagram } from '@/app/aws/security-specialty/domain2/Diagram';
import { DIAGRAMS } from '@/app/aws/security-specialty/domain2/constants';
import fixture from '@/docs/migration-inventory/aws-scs-c03-domain2-guide.fidelity.json';

vi.mock('@/components/MermaidDiagram', async () => ({
    MermaidDiagram: (await import('@/__tests__/helpers/migration-test-utils')).MermaidDiagramMock,
}));

it('provides actual YAML newlines before each original Mermaid chart', () => {
    for (const id of Object.keys(DIAGRAMS) as (keyof typeof DIAGRAMS)[]) {
        const { container, unmount } = render(<Diagram id={id} label="図の説明" />);
        const chart = container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
        expect(chart).toMatch(/^---\nconfig: /);
        expect(chart).toContain('\n---\n' + DIAGRAMS[id]);
        expect(chart).not.toContain(String.raw`---\nconfig:`);
        unmount();
    }
});

it('preserves source Mermaid themeVariables and flowchart settings over shared dark defaults', () => {
    const { container } = render(<Diagram id="diag-1" label="IRライフサイクルフロー" />);
    const chart = container.querySelector('[data-chart]')!.getAttribute('data-chart')!;
    const config = JSON.parse(chart.split('\n')[1]!.slice('config: '.length));
    const expectedVars = fixture.guideInteractions.mermaidConfig.themeVariables;
    expect(Object.fromEntries(Object.keys(expectedVars).map((key) => [key, config.themeVariables[key]]))).toEqual(
        expectedVars,
    );
    expect(config.flowchart).toEqual(fixture.guideInteractions.mermaidConfig.flowchart);
});


it.each([
    ['diag-2', ['ワークロードアカウント群', 'ログアーカイブアカウント', 'セキュリティツールアカウント', 'EventBridge', 'Lambda', 'Step Functions', 'フォレンジックアカウント'], ['監査']],
    ['diag-3', ['CloudWatch アラーム', 'OpsItem', '類似', 'Automation ランブック', '承認'], ['Incident Manager']],
    ['diag-4', ['調査用ロール', '封じ込め用ロール', 'Security Hub', 'Detective', 'CloudTrail', 'SCP', '最小権限', 'Shield Advanced', 'WAF'], ['連絡先', 'エスカレーション']],
    ['diag-5', ['Shield Advanced', 'WAF', 'Web ACL', 'アプリケーション層の自動緩和', 'Route 53 ヘルスチェック', 'SRT', 'プロアクティブエンゲージメント', 'CloudWatch'], ['SRTサポート有効化']],
    ['diag-9', ['Config と GuardDuty', 'Security Hub', 'EventBridge', 'DynamoDB', 'トリアージ', 'メモリ取得フロー', 'ディスク取得フロー', 'S3', 'SG で隔離', 'EBS スナップショット', 'フォレンジックアカウント', 'フォレンジック AMI', 'SSM ドキュメント', 'SNS', 'AppSync'], ['メモリダンプ', '転送']],
    ['diag-11', ['メタデータを記録', '終了保護', 'タグ', 'EBS スナップショット', 'メモリイメージ', 'セキュリティグループで隔離', '暗号化', 'フォレンジックアカウント', 'ハッシュ', '証拠を保管', 'ボリュームをアタッチ'], ['保護タグ付与', 'メモリ保全']],
    ['diag-13', ['重大度と対象リソース', '想定内', '誤検知として記録', '抑制ルール', '関連ログで裏付け', 'インシデントとして宣言', '影響範囲を評価', '封じ込め'], ['誤検知判定', '影響範囲評価、インシデント宣言']],
    ['diag-14', ['EC2', '隔離 SG', 'IAM アクセスキー', 'トークン発行時刻', 'IAM ロール', 'Revoke active sessions', 'S3 バケット', 'WAF', '効果'], ['RDS', 'コンテナ']],
    ['diag-15', ['根絶', 'バックアップと AMI', '隔離環境で検証', '本番へ復旧', '強化した監視', '再発の兆候'], ['事後レビュー', '段階的']],
] as const)('describes the actual nodes of %s for screen readers', (id, present, absent) => {
    const { container } = render(<Diagram id={id} label="図" />);
    const description = container.querySelector('.sr-only')!.textContent!;
    for (const term of present) expect(description, term).toContain(term);
    for (const term of absent) expect(description, term).not.toContain(term);
});

it('rejects unknown diagram IDs at compile time', () => {
    // @ts-expect-error 定義されていない図IDは DiagramId に含まれない
    const element = <Diagram id="diag-999" label="存在しない図" />;
    expect(element.props.id).toBe('diag-999');
});

it('describes every diagram with its own text instead of the label', () => {
    const label = '図の見出し';
    for (const id of Object.keys(DIAGRAMS) as (keyof typeof DIAGRAMS)[]) {
        const { container, unmount } = render(<Diagram id={id} label={label} />);
        const description = container.querySelector('.sr-only')!.textContent!.trim();
        expect(description, id).not.toBe('');
        expect(description, id).not.toBe(label);
        unmount();
    }
});

it.each([
    ['Diagram.tsx', 'app/aws/security-specialty/domain2/Diagram.tsx'],
    ['scaffold template', 'scripts/scaffold-scs-domain2.mjs'],
])('requires a description for every DiagramId in %s', (_name, path) => {
    // Vitest は型検査をしないため、説明文の網羅を型で強制する宣言をソースで検証する
    const source = readFileSync(path, 'utf8');
    expect(source).toContain('const descriptions: Record<DiagramId, string> = {');
    expect(source).toContain('{descriptions[id]}');
    expect(source).not.toContain('descriptions[id] ?? label');
});
