import { Diagram } from '../Diagram';

export default function Hero() {
    return (
        <section className="guide-part" data-part="hero">
            <div className="hero"><div className="kicker">AWS Certified Security - Specialty · Domain 1</div>{' '}<h1>AWS Certified Security - Specialty (SCS-C03) Content Domain 1: Detection 初学者向けステップバイステップガイド</h1>{' '}<div className="meta-row"><span className="pill">配点{' '}<strong>約16%</strong></span>{' '}<span className="pill">対象{' '}<strong>初学者</strong></span>{' '}<span className="pill">図解{' '}<strong>Mermaid 9点</strong></span>{' '}<span className="pill">参考文献{' '}<strong>33件</strong></span></div></div>
<p>対象試験: AWS Certified Security - Specialty (SCS-C03)<br />{' '}対象ドメイン: Content Domain 1: Detection (スコア対象問題の 16%)<br />{' '}想定読者: AWS のセキュリティを初めて体系的に学ぶ方<br />{' '}作成日: 2026-10-17 (内容は作成時点の公式ドキュメントに基づきます。試験前に必ず最新情報を確認してください)</p>
<hr />
<h2 id="0-このドメインの全体像と試験での位置づけ" tabIndex={-1}>0. このドメインの全体像と試験での位置づけ</h2>
<h3 id="01-detection-とは何か-やさしい説明" tabIndex={-1}>0.1 Detection とは何か (やさしい説明)</h3>
<p>家の防犯に例えると、次の 3 つに分けられます。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label="0.1 Detection とは何か (やさしい説明) 表 1"><table><thead><tr className="header"><th scope="col">防犯の例え</th><th scope="col">AWS での役割</th><th scope="col">代表サービス</th></tr></thead><tbody><tr className="odd"><td>防犯カメラの録画</td><td>何が起きたかを記録する (ログ)</td><td>CloudTrail、VPC Flow Logs、CloudWatch Logs</td></tr><tr className="even"><td>警備会社の見回り</td><td>怪しい動きを自動で見つける (検出)</td><td>GuardDuty、Macie、Inspector、Config</td></tr><tr className="odd"><td>警備室のモニター</td><td>検出結果を 1 か所に集めて見る (集約・通知)</td><td>Security Hub、EventBridge、CloudWatch アラーム</td></tr></tbody></table></div>
<p>Domain 1 は「記録する」「見つける」「集めて知らせる」「うまく動かないときに直す」の 4 つを問います。</p>
<h3 id="02-試験ガイド上の構造" tabIndex={-1}>0.2 試験ガイド上の構造</h3>
<p>公式の試験ガイドでは、Domain 1 は 3 つの Task と 13 の Skill で構成されています。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label="0.2 試験ガイド上の構造 表 2"><table><thead><tr className="header"><th scope="col">Task</th><th scope="col">内容</th><th scope="col">含まれる Skill</th></tr></thead><tbody><tr className="odd"><td>1.1</td><td>監視とアラートの設計・実装 (アカウント単位または組織単位)</td><td>1.1.1 から 1.1.5</td></tr><tr className="even"><td>1.2</td><td>ログソリューションの設計・実装</td><td>1.2.1 から 1.2.6</td></tr><tr className="odd"><td>1.3</td><td>監視・ログ・アラートのトラブルシューティング</td><td>1.3.1 から 1.3.2</td></tr></tbody></table></div>
<h3 id="03-skill-一覧-公式の記述と本ガイドでの対応章" tabIndex={-1}>0.3 Skill 一覧 (公式の記述と、本ガイドでの対応章)</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label="0.3 Skill 一覧 (公式の記述と、本ガイドでの対応章) 表 3"><table><thead><tr className="header"><th scope="col">Skill</th><th scope="col">公式の内容 (要約)</th><th scope="col">本ガイドの章</th></tr></thead><tbody><tr className="odd"><td>1.1.1</td><td>ワークロードを分析して監視要件を決める</td><td>2.1</td></tr><tr className="even"><td>1.1.2</td><td>ワークロード監視戦略を設計・実装する (例: リソースのヘルスチェック)</td><td>2.2</td></tr><tr className="odd"><td>1.1.3</td><td>セキュリティイベントと監視イベントを集約する</td><td>2.3</td></tr><tr className="even"><td>1.1.4</td><td>異常なデータやイベントを検出するメトリクス・アラート・ダッシュボードを作る (例: GuardDuty、Security Lake、Security Hub、Macie)</td><td>2.4</td></tr><tr className="odd"><td>1.1.5</td><td>定期的な評価や調査を自動化する (例: Config コンフォーマンスパック、Security Hub、Systems Manager State Manager)</td><td>2.5</td></tr><tr className="even"><td>1.2.1</td><td>要件に基づき、ログの取り込み元と保管先を特定する</td><td>3.1</td></tr><tr className="odd"><td>1.2.2</td><td>AWS サービスとアプリケーションのログ設定 (例: 組織トレイル、CloudWatch 専用ロギングアカウント、CloudWatch Logs エージェント)</td><td>3.2</td></tr><tr className="even"><td>1.2.3</td><td>ログ保管とログデータレイク (例: Security Lake) を実装し、サードパーティと連携する</td><td>3.3</td></tr><tr className="odd"><td>1.2.4</td><td>ログを分析する (例: CloudWatch Logs Insights、Athena、Security Hub の検出結果)</td><td>3.4</td></tr><tr className="even"><td>1.2.5</td><td>ログを正規化・解析・相関させる (例: OpenSearch Service、Lambda、Managed Grafana)</td><td>3.5</td></tr><tr className="odd"><td>1.2.6</td><td>ネットワーク設計や脅威に合わせたログソースを選ぶ (例: VPC Flow Logs、Transit Gateway フローログ、Route 53 Resolver ログ)</td><td>3.6</td></tr><tr className="even"><td>1.3.1</td><td>リソースの機能・権限・設定を分析する (例: Lambda ログ、API Gateway ログ、ヘルスチェック、CloudFront ログ)</td><td>4.1</td></tr><tr className="odd"><td>1.3.2</td><td>設定ミスを是正する (例: CloudWatch エージェント設定、ログ欠落の調査)</td><td>4.2</td></tr></tbody></table></div>
<h3 id="04-試験の形式-公式ガイドより" tabIndex={-1}>0.4 試験の形式 (公式ガイドより)</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label="0.4 試験の形式 (公式ガイドより) 表 4"><table><thead><tr className="header"><th scope="col">項目</th><th scope="col">内容</th></tr></thead><tbody><tr className="odd"><td>採点対象の問題数</td><td>50 問 (これとは別に採点されない 15 問が含まれる)</td></tr><tr className="even"><td>問題形式</td><td>択一、複数選択、並べ替え (3 から 5 個の手順)、マッチング</td></tr><tr className="odd"><td>合格スコア</td><td>1,000 点満点中 750 点</td></tr><tr className="even"><td>採点方式</td><td>補償型 (ドメインごとの合格点はなく、全体で合格すればよい)</td></tr><tr className="odd"><td>不正解の扱い</td><td>未回答は不正解。推測で答えても減点はない</td></tr></tbody></table></div>
<p>学習のコツ: Domain 1 は 16% なので 50 問中およそ 8 問です。他ドメイン (Incident Response、Infrastructure Security など) と密接に関係するため、サービスの「役割分担」を先に頭に入れると効率的です。</p>
<p>出典:{' '}<a href="https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html">https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html</a></p>
<hr />
<h2 id="1-検出の仕組みを-1-枚で理解する" tabIndex={-1}>1. 検出の仕組みを 1 枚で理解する</h2>
<p>最初に全体の流れをつかみます。細かいサービスは後の章で 1 つずつ学びます。</p>
<Diagram id="diag-1" label="1. 検出の仕組みを 1 枚で理解する" />
<h3 id="11-3-つの言葉を区別する" tabIndex={-1}>1.1 3 つの言葉を区別する</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label="1.1 3 つの言葉を区別する 表 5"><table><thead><tr className="header"><th scope="col">言葉</th><th scope="col">意味</th><th scope="col">例</th></tr></thead><tbody><tr className="odd"><td>ログ</td><td>起きたことの記録 (材料)</td><td>CloudTrail のイベント、フローログ</td></tr><tr className="even"><td>検出 (Finding)</td><td>ログなどを分析して見つけた「怪しい点」</td><td>GuardDuty の検出結果</td></tr><tr className="odd"><td>アラート</td><td>人やシステムに知らせる仕組み</td><td>EventBridge から SNS や Lambda へ</td></tr></tbody></table></div>
<h3 id="12-共通のベストプラクティス-まず覚える-5-か条" tabIndex={-1}>1.2 共通のベストプラクティス (まず覚える 5 か条)</h3>
<ol><li>すべてのリージョンで、すべてのアカウントを対象にする (使っていないリージョンも攻撃対象になる)。</li>{' '}<li>ログは「ログアーカイブ専用アカウント」に集め、変更・削除できないように守る。</li>{' '}<li>検出サービスは AWS Organizations の委任管理者アカウント (通常はセキュリティアカウント) で一元管理する。</li>{' '}<li>新しいアカウントが増えたら自動で有効化する (自動有効化設定)。</li>{' '}<li>検出結果は Security Hub などに集約し、EventBridge で自動対応につなぐ。</li></ol>
<hr />
        </section>
    );
}
