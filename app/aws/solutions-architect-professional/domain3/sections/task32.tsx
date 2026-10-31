import { Diagram } from '../Diagram';
/** 原本のtask32本文。 */
export default function Content() { return <>
<h2 id={"4-task-32-セキュリティを改善する"} tabIndex={-1}>
{"4. Task 3.2 セキュリティを改善する"}
</h2>
{"\n                "}
<h3 id={"41-このタスクで問われることexam-guide-より"} tabIndex={-1}>
{"\n                    4.1 このタスクで問われること(Exam Guide より)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 22：4.1 このタスクで問われること(Exam Guide より)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"区分"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"データ保持、データの機密度、規制要件"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"自動監視と自動修復の戦略 (例: AWS Config ルール)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"シークレット管理 (例: Systems Manager、AWS Secrets Manager)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"最小権限の原則"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Knowledge"}
</td>
<td>
{"セキュリティ関連の AWS ソリューション"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Knowledge"}
</td>
<td>
{"パッチ適用とバックアップの実践"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"シークレットと認証情報の安全な管理を評価する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"最小権限の観点で環境を監査する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"すべての層でセキュリティが確保されているか確認する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"ユーザーとサービスの操作を包括的に追跡できるか確認する"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"脆弱性検出時の自動対応に優先順位を付ける"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Skills"}
</td>
<td>
{"\n                                    パッチと更新のプロセス、バックアッププロセスを設計・実装する\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Skills"}
</td>
<td>
{"修復 (remediation) 手法を使う"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"42-全体像-防ぐ見つける直す残す"} tabIndex={-1}>
{"4.2 全体像: 防ぐ、見つける、直す、残す"}
</h3>
{"\n                "}
<Diagram id="diag-5" label={"4.2 全体像: 防ぐ、見つける、直す、残す"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 23：4.2 全体像: 防ぐ、見つける、直す、残す"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"目的"}
</th>
<th scope="col">
{"役割"}
</th>
<th scope="col">
{"代表サービス"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"防ぐ"}
</td>
<td>
{"事故が起きにくい状態を作る"}
</td>
<td>
{"IAM、KMS、Secrets Manager、SCP"}
</td>
</tr>
<tr className={"even"}>
<td>
{"見つける"}
</td>
<td>
{"脅威、脆弱性、設定不備を検知"}
</td>
<td>
{"GuardDuty、Inspector、Config、Macie"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"直す"}
</td>
<td>
{"検知後に自動で是正"}
</td>
<td>
{"EventBridge、Lambda、SSM Automation、Config 修復アクション"}
</td>
</tr>
<tr className={"even"}>
<td>
{"残す"}
</td>
<td>
{"追跡と復元のための記録"}
</td>
<td>
{"CloudTrail、Config、AWS Backup"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"43-step-1-データの保持機密度規制要件を整理する"} tabIndex={-1}>
{"\n                    4.3 Step 1: データの保持・機密度・規制要件を整理する\n                "}
</h3>
{"\n                "}
<p>
{"\n                    まず「どのデータが、どれだけ重要で、どれだけ保管するか」を決めます。技術の選定はその後です。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 24：4.3 Step 1: データの保持・機密度・規制要件を整理する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"要件"}
</th>
<th scope="col">
{"使うサービスと機能"}
</th>
<th scope="col">
{"ポイント"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"機密データ (個人情報など) を S3 から見つけたい"}
</td>
<td>
{"Amazon Macie"}
</td>
<td>
{"S3 内の機密データを自動検出し、リスクを可視化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"一定期間は削除も上書きもさせたくない (WORM)"}
</td>
<td>
{"S3 Object Lock"}
</td>
<td>
{"\n                                    ガバナンスモードとコンプライアンスモードがある。コンプライアンスモードは\n                                    root でも保持期間中は削除できない\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"古いデータを自動で低コストの層へ移し、期限後に削除"}
</td>
<td>
{"S3 ライフサイクル"}
</td>
<td>
{"保持期間と削除を自動化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"バックアップを改ざん・削除から守る"}
</td>
<td>
{"AWS Backup Vault Lock"}
</td>
<td>
{"バックアップの保持ルールを強制"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"保管データの暗号化"}
</td>
<td>
{"AWS KMS"}
</td>
<td>
{"\n                                    キーポリシーで管理。自動ローテーションは AWS\n                                    が生成したキーマテリアルを持つ対称カスタマーマネージドキーのみ対象で、それ以外のキーはローテーションが必要なら手動で行う\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"コンプライアンス証跡の入手"}
</td>
<td>
{"AWS Artifact"}
</td>
<td>
{"AWS の監査レポートを取得"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"監査の準備を継続的に自動化"}
</td>
<td>
{"AWS Audit Manager"}
</td>
<td>
{"証拠収集を自動化"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"44-step-2-自動監視と自動修復-aws-config"} tabIndex={-1}>
{"\n                    4.4 Step 2: 自動監視と自動修復 (AWS Config)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    AWS Config\n                    は「リソースの設定がどう変わったか」を記録し、「ルールに合っているか」を評価します。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 25：4.4 Step 2: 自動監視と自動修復 (AWS Config)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"機能"}
</th>
<th scope="col">
{"役割"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"構成レコーダー"}
</td>
<td>
{"リソースの設定変更を継続的に記録"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Config ルール"}
</td>
<td>
{"\n                                    設定がルールに適合か不適合かを評価\n                                    (マネージドルールとカスタムルール)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"適合パック"}
</td>
<td>
{"\n                                    ルールと修復アクションをまとめたパッケージ。組織全体へ展開できる\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"アグリゲーター"}
</td>
<td>
{"複数アカウントとリージョンの結果を 1 か所に集約"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"修復アクション"}
</td>
<td>
{"\n                                    不適合リソースに対して SSM Automation ドキュメントを実行\n                                    (手動または自動)\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"修復の流れ"}
</h4>
{"\n                "}
<Diagram id="diag-6" label={"修復の流れ"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 26：修復の流れ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"よくある修復例"}
</th>
<th scope="col">
{"使うルールの例"}
</th>
<th scope="col">
{"修復の内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"S3 バケットのパブリックアクセスを防ぐ"}
</td>
<td>
{"S3 パブリックアクセス関連のマネージドルール"}
</td>
<td>
{"パブリックアクセスブロックを有効化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"EBS ボリュームの暗号化漏れ"}
</td>
<td>
{"暗号化確認のマネージドルール"}
</td>
<td>
{"通知し、再作成を促す"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"不要なポートの開放"}
</td>
<td>
{"セキュリティグループ関連のルール"}
</td>
<td>
{"不適切なルールを削除"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"ベストプラクティス"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 27：ベストプラクティス"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"#"}
</th>
<th scope="col">
{"プラクティス"}
</th>
<th scope="col">
{"理由"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1"}
</td>
<td>
{"まず「検出と通知」から始め、確認してから自動修復へ進める"}
</td>
<td>
{"誤った自動修復による障害を防ぐ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"組織単位で適合パックを展開し、アグリゲーターで集約する"}
</td>
<td>
{"アカウントごとの設定漏れを防ぐ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"修復アクションには必要最小限の権限だけを持つロールを使う"}
</td>
<td>
{"自動修復自体が攻撃経路にならないようにする"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"45-step-3-シークレットと認証情報を安全に管理する"} tabIndex={-1}>
{"\n                    4.5 Step 3: シークレットと認証情報を安全に管理する\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 28：4.5 Step 3: シークレットと認証情報を安全に管理する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"観点"}
</th>
<th scope="col">
{"AWS Secrets Manager"}
</th>
<th scope="col">
{"Systems Manager Parameter Store"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"主な用途"}
</td>
<td>
{"データベースの認証情報や API キー"}
</td>
<td>
{"設定値と、必要に応じて機密値"}
</td>
</tr>
<tr className={"even"}>
<td>
{"自動ローテーション"}
</td>
<td>
{"あり (Lambda でローテーション。RDS などは統合済み)"}
</td>
<td>
{"標準機能としてはなし"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"暗号化"}
</td>
<td>
{"KMS で常に暗号化"}
</td>
<td>
{"SecureString で KMS による暗号化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"複数リージョンへの複製"}
</td>
<td>
{"あり"}
</td>
<td>
{"なし"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト"}
</td>
<td>
{"シークレットごとに課金"}
</td>
<td>
{"標準パラメータは無料 (高度なパラメータは有料)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"選ぶ目安"}
</td>
<td>
{"自動ローテーションが必要なら Secrets Manager"}
</td>
<td>
{"設定値の管理や、コストを抑えたいときは Parameter Store"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"よくある悪い例と改善"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 29：よくある悪い例と改善"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"現状 (悪い例)"}
</th>
<th scope="col">
{"改善案"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ソースコードや環境変数に DB パスワードを直書き"}
</td>
<td>
{"Secrets Manager から取得し、自動ローテーションを有効にする"}
</td>
</tr>
<tr className={"even"}>
<td>
{"EC2 に長期のアクセスキーを保存"}
</td>
<td>
{"\n                                    IAM ロール (インスタンスプロファイル) を使い、一時認証情報を使う\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"全員が共通の認証情報を使い回している"}
</td>
<td>
{"個人ごとの IAM Identity Center やロールへ分ける"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"CLI の例: シークレットの取得"}
</h4>
{"\n                "}
<pre className="code code-block" tabIndex={0} role="group" aria-label="bash コード例">
<div className="code-line">
{""}
<span className="hljs-built_in">
{"aws"}
</span>
{" secretsmanager get-secret-value \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-keyword">
{"--secret-id"}
</span>
{" prod/app/db-credentials \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-keyword">
{"--query"}
</span>
{" SecretString \\"}
</div>
<div className="code-line">
{"  "}
<span className="hljs-keyword">
{"--output"}
</span>
{" text"}
</div>
</pre>
{"\n                "}
<h3 id={"46-step-4-最小権限を監査して改善する"} tabIndex={-1}>
{"\n                    4.6 Step 4: 最小権限を監査して改善する\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 30：4.6 Step 4: 最小権限を監査して改善する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"道具"}
</th>
<th scope="col">
{"何ができるか"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"IAM Access Analyzer (外部アクセス)"}
</td>
<td>
{"外部のアカウントや公開状態になっているリソースを検出"}
</td>
</tr>
<tr className={"even"}>
<td>
{"IAM Access Analyzer (未使用アクセス)"}
</td>
<td>
{"使われていない権限、ロール、アクセスキーを検出"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"IAM Access Analyzer (ポリシー生成)"}
</td>
<td>
{"CloudTrail のログから実際に使われた操作だけのポリシーを作成"}
</td>
</tr>
<tr className={"even"}>
<td>
{"IAM Access Analyzer (ポリシー検証)"}
</td>
<td>
{"ポリシーの文法やセキュリティ上の警告を確認"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"IAM 最終アクセス情報"}
</td>
<td>
{"サービスや操作が最後に使われた時期を確認"}
</td>
</tr>
<tr className={"even"}>
<td>
{"IAM 認証情報レポート"}
</td>
<td>
{"アカウント内ユーザーの認証情報の状態を一覧"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"SCP (Organizations)"}
</td>
<td>
{"アカウントが付与できる権限の上限を組織で制限"}
</td>
</tr>
<tr className={"even"}>
<td>
{"アクセス許可の境界"}
</td>
<td>
{"ユーザーやロールが持てる権限の上限を設定"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"権限を絞り込む手順"}
</h4>
{"\n                "}
<Diagram id="diag-7" label={"権限を絞り込む手順"}/>
{"\n                "}
<h3 id={"47-step-5-すべての層でセキュリティを確保する-多層防御"} tabIndex={-1}>
{"\n                    4.7 Step 5: すべての層でセキュリティを確保する (多層防御)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 31：4.7 Step 5: すべての層でセキュリティを確保する (多層防御)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"層"}
</th>
<th scope="col">
{"対策"}
</th>
<th scope="col">
{"サービス"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"エッジ"}
</td>
<td>
{"DDoS 対策、悪意あるリクエスト遮断"}
</td>
<td>
{"AWS Shield、AWS WAF、CloudFront"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ネットワーク"}
</td>
<td>
{"通信の制御と検査"}
</td>
<td>
{"\n                                    セキュリティグループ、ネットワーク ACL、AWS Network Firewall\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ネットワーク (組織全体)"}
</td>
<td>
{"ルールの一括管理"}
</td>
<td>
{"AWS Firewall Manager"}
</td>
</tr>
<tr className={"even"}>
<td>
{"コンピュート"}
</td>
<td>
{"脆弱性管理とパッチ"}
</td>
<td>
{"Amazon Inspector、Patch Manager"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"アプリケーション"}
</td>
<td>
{"認証と認可"}
</td>
<td>
{"Amazon Cognito、IAM"}
</td>
</tr>
<tr className={"even"}>
<td>
{"データ"}
</td>
<td>
{"暗号化と分類"}
</td>
<td>
{"AWS KMS、Macie、ACM"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ID"}
</td>
<td>
{"最小権限と一時的な認証情報"}
</td>
<td>
{"IAM、IAM Identity Center、STS"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"48-step-6-ユーザーとサービスの操作を追跡する"} tabIndex={-1}>
{"\n                    4.8 Step 6: ユーザーとサービスの操作を追跡する\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 32：4.8 Step 6: ユーザーとサービスの操作を追跡する"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"追跡したいこと"}
</th>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"補足"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"だれがどの API を呼んだか"}
</td>
<td>
{"AWS CloudTrail"}
</td>
<td>
{"\n                                    管理イベントのイベント履歴は 90\n                                    日。長期保管するには証跡を作成して S3\n                                    へ保存。証跡が既定で記録するのは管理イベントのみで、S3\n                                    オブジェクトレベル操作などのデータイベントは対象リソースを明示的に選択して有効化する\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"組織全体の API 履歴"}
</td>
<td>
{"CloudTrail 組織の証跡"}
</td>
<td>
{"管理アカウントから全アカウントへ適用"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"証跡を SQL で調べたい"}
</td>
<td>
{"CloudTrail Lake (既存顧客のみ) / 新規は Amazon CloudWatch"}
</td>
<td>
{"\n                                    CloudTrail Lake はイベントデータの保管とクエリ。2026 年 5 月 31\n                                    日以降は新規顧客に提供されないため、新規利用者は CloudWatch へ\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"設定の変更履歴"}
</td>
<td>
{"AWS Config"}
</td>
<td>
{"リソースの設定タイムライン"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ネットワーク通信の記録"}
</td>
<td>
{"VPC フローログ"}
</td>
<td>
{"許可と拒否の通信を記録"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ログの改ざん検知"}
</td>
<td>
{"CloudTrail ログファイルの整合性検証"}
</td>
<td>
{"検証用のダイジェストで確認"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"ベストプラクティス"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 33：ベストプラクティス"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"#"}
</th>
<th scope="col">
{"プラクティス"}
</th>
<th scope="col">
{"理由"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1"}
</td>
<td>
{"\n                                    全リージョンの証跡を有効にし、ログ専用アカウントの S3\n                                    へ集約する。全リージョン化してもデータイベントは記録されないため、必要な対象リソースを明示的に選んで有効化する\n                                "}
</td>
<td>
{"追跡漏れと改ざんを防ぐ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"ログ保管バケットは暗号化し、削除をさせない保護を設定する"}
</td>
<td>
{"監査証跡の信頼性を保つ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"人にも自動処理にも、個別の識別できる ID を使う"}
</td>
<td>
{"「だれが」を特定できる"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"49-step-7-脆弱性への自動対応に優先順位を付ける"} tabIndex={-1}>
{"\n                    4.9 Step 7: 脆弱性への自動対応に優先順位を付ける\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 34：4.9 Step 7: 脆弱性への自動対応に優先順位を付ける"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"検出するもの"}
</th>
<th scope="col">
{"次の一手"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon GuardDuty"}
</td>
<td>
{"不審な動き (異常な API 呼び出し、通信など)"}
</td>
<td>
{"検出結果を EventBridge へ送り、隔離やチケット化を自動化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon Inspector"}
</td>
<td>
{"EC2、コンテナイメージ、Lambda のソフトウェア脆弱性"}
</td>
<td>
{"優先度付き検出結果をもとにパッチを適用"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"AWS Security Hub"}
</td>
<td>
{"複数サービスの検出結果を集約し、基準に対する準拠を評価"}
</td>
<td>
{"集約結果を自動対応のトリガーにする"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon Detective"}
</td>
<td>
{"検出結果の原因調査"}
</td>
<td>
{"調査を効率化"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"優先順位の付け方"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 35：優先順位の付け方"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"優先度"}
</th>
<th scope="col">
{"状況"}
</th>
<th scope="col">
{"対応"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"高"}
</td>
<td>
{"外部から悪用可能で、重要データに触れる脆弱性"}
</td>
<td>
{"即時に自動隔離やパッチ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"中"}
</td>
<td>
{"内部のみ、または影響が限定的"}
</td>
<td>
{"計画的にパッチ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"低"}
</td>
<td>
{"悪用が困難、影響が軽微"}
</td>
<td>
{"定期メンテナンスで対応"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"410-step-8-パッチとバックアップを仕組み化する"} tabIndex={-1}>
{"\n                    4.10 Step 8: パッチとバックアップを仕組み化する\n                "}
</h3>
{"\n                "}
<h4>
{"パッチ"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 36：パッチ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ポイント"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Patch Manager"}
</td>
<td>
{"\n                                    パッチベースラインで対象と承認ルールを定義し、メンテナンスウィンドウで適用\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"準拠状況の確認"}
</td>
<td>
{"Patch Manager の準拠レポートで未適用を確認"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"不変インフラ"}
</td>
<td>
{"\n                                    稼働中のサーバーへ当てる代わりに、パッチ済みのイメージで置き換える\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"検出との連携"}
</td>
<td>
{"Inspector で見つけた脆弱性を Patch Manager で是正"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h4>
{"バックアップ"}
</h4>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 37：バックアップ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"観点"}
</th>
<th scope="col">
{"AWS Backup の機能"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"一元管理"}
</td>
<td>
{"バックアッププランで対象と保持期間を統一"}
</td>
</tr>
<tr className={"even"}>
<td>
{"リージョン障害対策"}
</td>
<td>
{"別リージョンへコピー"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"アカウント侵害対策"}
</td>
<td>
{"別アカウントへコピー"}
</td>
</tr>
<tr className={"even"}>
<td>
{"改ざん対策"}
</td>
<td>
{"Backup Vault Lock"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"組織展開"}
</td>
<td>
{"Organizations のバックアップポリシー"}
</td>
</tr>
<tr className={"even"}>
<td>
{"検証"}
</td>
<td>
{"復元テストで本当に戻せるか確認"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"callout-practice"}>
{"\n                    "}
<div className={"icon"}>
{"✓"}
</div>
{"\n                    "}
<div className={"body"}>
{"\n                        "}
<div className={"label"}>
{"重要"}
</div>
{"\n                        "}
<p>
{"\n                            「バックアップを取っている」ことと「復元できる」ことは別です。復元の検証までを運用に含めます。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"411-task-32-の試験での考え方"} tabIndex={-1}>
{"4.11 Task 3.2 の試験での考え方"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 38：4.11 Task 3.2 の試験での考え方"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"問題文のキーワード"}
</th>
<th scope="col">
{"選ぶ方向"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"認証情報を自動でローテーションしたい"}
</td>
<td>
{"AWS Secrets Manager"}
</td>
</tr>
<tr className={"even"}>
<td>
{"権限が広すぎるので実績に基づいて絞りたい"}
</td>
<td>
{"IAM Access Analyzer のポリシー生成と未使用アクセス検出"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"設定違反を自動で是正したい"}
</td>
<td>
{"AWS Config ルールと自動修復"}
</td>
</tr>
<tr className={"even"}>
<td>
{"機密データが S3 にあるか知りたい"}
</td>
<td>
{"Amazon Macie"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"脆弱性スキャンをしたい"}
</td>
<td>
{"Amazon Inspector"}
</td>
</tr>
<tr className={"even"}>
<td>
{"不審なアクティビティを検出したい"}
</td>
<td>
{"Amazon GuardDuty"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"複数サービスの検出結果を 1 か所で見たい"}
</td>
<td>
{"AWS Security Hub"}
</td>
</tr>
<tr className={"even"}>
<td>
{"削除や変更を許さず保管したい"}
</td>
<td>
{"S3 Object Lock、Backup Vault Lock"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"全アカウントで同じ制限を強制したい"}
</td>
<td>
{"SCP"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"出典:"}
</p>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html"}>
{"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"}>
{"https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/config/latest/developerguide/remediation.html"}>
{"https://docs.aws.amazon.com/config/latest/developerguide/remediation.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"}>
{"https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html"}>
{"https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"}>
{"https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"}>
{"https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"}>
{"https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"}>
{"https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"}
</a>
{"\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<a href={"https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"}>
{"https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html"}
</a>
{"\n                    "}
</li>
{"\n                "}
</ul>
{"\n\n                "}
</>; }
