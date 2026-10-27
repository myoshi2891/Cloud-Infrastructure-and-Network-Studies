import { ChecklistCard } from '../Checklist';

export default function ChecklistSection() {
    return (
        <section className="guide-part" data-part="checklist">
            <h2 id="6-ベストプラクティス総チェックリスト" tabIndex={-1}>6. ベストプラクティス総チェックリスト</h2>
            <h3 id="61-組織アカウント設計" tabIndex={-1}>6.1 組織・アカウント設計</h3>
            <ChecklistCard
                items={[
                    { id: 'chk1', label: 'ログアーカイブ専用アカウントとセキュリティ専用アカウントを分離している' },
                    { id: 'chk2', label: '検出サービスの委任管理者をセキュリティアカウントに指定している' },
                    { id: 'chk3', label: '新規アカウントの自動有効化を設定している' },
                    { id: 'chk4', label: 'すべてのリージョンで有効化している' },
                ]}
            />
            <h3 id="62-ログ" tabIndex={-1}>6.2 ログ</h3>
            <ChecklistCard
                items={[
                    { id: 'chk5', label: '組織トレイル (マルチリージョン) がある' },
                    { id: 'chk6', label: 'ログファイル整合性検証が有効' },
                    {
                        id: 'chk7',
                        label: (
                            <>
                                CloudTrail のログが SSE-KMS で暗号化され、キーポリシーに{' '}
                                <code>aws:SourceArn</code> 条件がある
                            </>
                        ),
                    },
                    { id: 'chk8', label: 'CloudWatch Logs にも CloudTrail を送り、重要操作のアラームを設定している' },
                    { id: 'chk9', label: '必要に応じて、データイベントとネットワークアクティビティイベントを有効化している' },
                    { id: 'chk10', label: '重要な VPC にフローログ、DNS クエリログを有効化している' },
                    { id: 'chk11', label: 'ログの保持期間とライフサイクルを要件に合わせている' },
                ]}
            />
            <h3 id="63-検出" tabIndex={-1}>6.3 検出</h3>
            <ChecklistCard
                items={[
                    { id: 'chk12', label: 'GuardDuty を全リージョンで有効化し、ワークロードに合う保護プランを選んでいる' },
                    { id: 'chk13', label: 'Macie、Inspector を必要な範囲で有効化している' },
                    { id: 'chk14', label: 'Security Hub で検出結果を集約し、集約リージョンを設定している' },
                    { id: 'chk15', label: 'Config を有効化し、コンフォーマンスパックで組織全体にルールを展開している' },
                ]}
            />
            <h3 id="64-自動化運用" tabIndex={-1}>6.4 自動化・運用</h3>
            <ChecklistCard
                items={[
                    { id: 'chk16', label: '検出結果を EventBridge で通知・自動対応につなげている' },
                    { id: 'chk17', label: '抑制ルールや自動化ルールは条件を絞っている' },
                    { id: 'chk18', label: 'State Manager で CloudWatch エージェントの導入と設定を自動化している' },
                    { id: 'chk19', label: 'ログ欠落を検知する仕組み (Config ルールや Security Hub のコントロール) がある' },
                ]}
            />
            <hr />
        </section>
    );
}
