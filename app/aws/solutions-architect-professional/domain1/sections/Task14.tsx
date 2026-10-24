import { Diagram } from "../Diagram";

export default function Task14() {
    return (
        <section className="guide-section" data-section="task14">
<h2 id="5-task-14-マルチアカウント環境を設計する" tabIndex={-1}>
                    5. Task 1.4 マルチアカウント環境を設計する
                </h2>
<h3 id="51-exam-guide-が求めている内容" tabIndex={-1}>5.1 Exam Guide が求めている内容</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.1 Exam Guide が求めている内容 (表29)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">区分</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Knowledge</td>
                                <td>
                                    AWS Organizations と AWS Control Tower,
                                    マルチアカウントのイベント通知, 環境をまたぐ AWS リソース共有
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Skills</td>
                                <td>
                                    組織の要件に最適なアカウント構造の評価,
                                    集中ログとイベント通知の戦略の提案,
                                    マルチアカウントのガバナンスモデルの策定
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="52-step-1-なぜアカウントを分けるのか" tabIndex={-1}>
                    5.2 Step 1: なぜアカウントを分けるのか
                </h3>
<p>アカウントは AWS における最も強い分離境界です。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.2 Step 1: なぜアカウントを分けるのか (表30)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">目的</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>セキュリティの分離</td>
                                <td>侵害や誤操作の影響範囲 (ブラスト半径) を限定する</td>
                            </tr>
                            <tr className="even">
                                <td>環境の分離</td>
                                <td>本番、開発、検証の権限と変更を明確に分ける</td>
                            </tr>
                            <tr className="odd">
                                <td>コストの可視化</td>
                                <td>アカウント単位でコストを把握できる</td>
                            </tr>
                            <tr className="even">
                                <td>クォータの分離</td>
                                <td>
                                    サービスクォータ (上限)
                                    がアカウント単位のため、他の環境に影響されない
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>コンプライアンス</td>
                                <td>規制対象のワークロードを独立して管理できる</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="53-step-2-aws-organizations-の基本" tabIndex={-1}>
                    5.3 Step 2: AWS Organizations の基本
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.3 Step 2: AWS Organizations の基本 (表31)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>管理アカウント</td>
                                <td>
                                    組織を作成し、請求の支払いと組織の管理を行う。ワークロードは置かない
                                </td>
                            </tr>
                            <tr className="even">
                                <td>メンバーアカウント</td>
                                <td>組織に所属するアカウント</td>
                            </tr>
                            <tr className="odd">
                                <td>OU (組織単位)</td>
                                <td>
                                    アカウントをまとめる階層グループ。ポリシーを OU 単位で適用できる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>一括請求</td>
                                <td>
                                    全アカウントの請求を統合し、ボリューム割引や RI と Savings Plans
                                    の共有ができる
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>委任管理者</td>
                                <td>
                                    管理アカウントの代わりに特定サービスの組織管理を担当するメンバーアカウント
                                </td>
                            </tr>
                            <tr className="even">
                                <td>信頼されたアクセス</td>
                                <td>他の AWS サービスが組織全体を管理できるようにする設定</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h4>組織のポリシーの種類</h4>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"組織のポリシーの種類 (表32)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ポリシー</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>SCP (サービスコントロールポリシー)</td>
                                <td>アカウント内のプリンシパルが使える権限の上限を決める</td>
                            </tr>
                            <tr className="even">
                                <td>RCP (リソースコントロールポリシー)</td>
                                <td>
                                    組織内のリソースに対する権限の上限を決める
                                    (リソース側のガードレール)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>タグポリシー</td>
                                <td>タグのキーや値の形式を統一する</td>
                            </tr>
                            <tr className="even">
                                <td>バックアップポリシー</td>
                                <td>バックアップ計画を組織全体に適用する</td>
                            </tr>
                            <tr className="odd">
                                <td>宣言型ポリシー</td>
                                <td>サービス設定の基準を組織全体で強制する</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h4>SCP の重要ルール (頻出)</h4>
<ul>
                    <li>
                        SCP は権限を「付与」せず、「上限」を決める。許可の付与は IAM ポリシーが行う
                    </li>
                    <li>
                        管理アカウントには SCP
                        は適用されない。だからこそ管理アカウントにワークロードを置かない
                    </li>
                    <li>
                        メンバーアカウントのルートユーザーを含むすべてのプリンシパルに適用される
                    </li>
                    <li>サービスにリンクされたロールには影響しない</li>
                    <li>
                        階層 (ルート、OU、アカウント)
                        のすべてで許可されている権限だけが、実効権限になる (積集合)
                    </li>
                    <li>
                        運用しやすいのは、既定の FullAWSAccess
                        を残して特定の操作を拒否する拒否リスト方式
                    </li>
                </ul>
<p>リージョン制限の SCP の例 (リージョン制限):</p>
<div className="code-block" role="region" aria-label="リージョン制限 SCP の例" tabIndex={0}>
<div className="code-line"><span className="tok-pun">{"{"}</span></div>
<div className="code-line">  <span className="tok-key">{'"Version"'}</span><span className="tok-pun">:</span> <span className="tok-str">{'"2012-10-17"'}</span><span className="tok-pun">,</span></div>
<div className="code-line">  <span className="tok-key">{'"Statement"'}</span><span className="tok-pun">:</span> <span className="tok-pun">[</span></div>
<div className="code-line">    <span className="tok-pun">{"{"}</span></div>
<div className="code-line">      <span className="tok-key">{'"Sid"'}</span><span className="tok-pun">:</span> <span className="tok-str">{'"DenyOutsideAllowedRegions"'}</span><span className="tok-pun">,</span></div>
<div className="code-line">      <span className="tok-key">{'"Effect"'}</span><span className="tok-pun">:</span> <span className="tok-str">{'"Deny"'}</span><span className="tok-pun">,</span></div>
<div className="code-line">      <span className="tok-key">{'"NotAction"'}</span><span className="tok-pun">:</span> <span className="tok-pun">[</span></div>
<div className="code-line">        <span className="tok-str">{'"iam:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"organizations:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"support:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"sts:*"'}</span><span className="tok-pun">,</span></div>
<div className="code-line">        <span className="tok-str">{'"cloudfront:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"route53:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"route53domains:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"waf:*"'}</span><span className="tok-pun">,</span></div>
<div className="code-line">        <span className="tok-str">{'"globalaccelerator:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"budgets:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"ce:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"cur:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"health:*"'}</span><span className="tok-pun">,</span></div>
<div className="code-line">        <span className="tok-str">{'"trustedadvisor:*"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"s3:ListAllMyBuckets"'}</span></div>
<div className="code-line">      <span className="tok-pun">]</span><span className="tok-pun">,</span></div>
<div className="code-line">      <span className="tok-key">{'"Resource"'}</span><span className="tok-pun">:</span> <span className="tok-str">{'"*"'}</span><span className="tok-pun">,</span></div>
<div className="code-line">      <span className="tok-key">{'"Condition"'}</span><span className="tok-pun">:</span> <span className="tok-pun">{"{"}</span></div>
<div className="code-line">        <span className="tok-key">{'"StringNotEquals"'}</span><span className="tok-pun">:</span> <span className="tok-pun">{"{"}</span></div>
<div className="code-line">          <span className="tok-key">{'"aws:RequestedRegion"'}</span><span className="tok-pun">:</span> <span className="tok-pun">[</span><span className="tok-str">{'"ap-northeast-1"'}</span><span className="tok-pun">,</span> <span className="tok-str">{'"us-east-1"'}</span><span className="tok-pun">]</span></div>
<div className="code-line">        <span className="tok-pun">{"}"}</span></div>
<div className="code-line">      <span className="tok-pun">{"}"}</span></div>
<div className="code-line">    <span className="tok-pun">{"}"}</span></div>
<div className="code-line">  <span className="tok-pun">]</span></div>
<div className="code-line"><span className="tok-pun">{"}"}</span></div>
</div>
<p>
                    {"注意: "}
                    <code>NotAction</code>
                    {" の除外リストは代表例です。グローバルサービスのアクションは利用するサービスに応じてサービスごとの例外追加が必要なため、AWS 公式のリージョン制限 SCP の例を参照して網羅性を確認してください。"}
                </p>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html">https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html">https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html">https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_rcps.html</a>
                    </li>
                </ul>
<h3 id="54-step-3-アカウント構造の設計-ou-の分け方" tabIndex={-1}>
                    5.4 Step 3: アカウント構造の設計 (OU の分け方)
                </h3>
<p>
                    AWS のホワイトペーパー「Organizing Your AWS Environment Using Multiple
                    Accounts」では、機能ごとに OU を分ける設計が推奨されています。
                </p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.4 Step 3: アカウント構造の設計 (OU の分け方) (表33)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">OU の例</th>
                                <th scope="col">主なアカウント</th>
                                <th scope="col">目的</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Security</td>
                                <td>ログアーカイブ, セキュリティツール (監査)</td>
                                <td>全体のログと監視を独立して保護</td>
                            </tr>
                            <tr className="even">
                                <td>Infrastructure</td>
                                <td>ネットワーク, 共有サービス</td>
                                <td>Transit Gateway や DNS、共通基盤を管理</td>
                            </tr>
                            <tr className="odd">
                                <td>Workloads</td>
                                <td>本番, 非本番 (開発、検証)</td>
                                <td>アプリケーションの実行環境。本番と非本番で OU を分ける</td>
                            </tr>
                            <tr className="even">
                                <td>Sandbox</td>
                                <td>個人や学習用</td>
                                <td>自由に試せるが、厳しい予算とガードレールで保護</td>
                            </tr>
                            <tr className="odd">
                                <td>Policy Staging</td>
                                <td>ポリシー検証用</td>
                                <td>新しい SCP を本番適用の前に検証</td>
                            </tr>
                            <tr className="even">
                                <td>Suspended</td>
                                <td>閉鎖予定のアカウント</td>
                                <td>全操作を拒否する SCP を適用して退避</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<Diagram id="diag-15" label={"5.4 Step 3: アカウント構造の設計 (OU の分け方)"} />
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">設計のベストプラクティス</div>
                        <ul>
                            <li>
                                OU
                                は組織図ではなく、「同じセキュリティ要件とポリシーを適用したい単位」で作る
                            </li>
                            <li>階層は深くしすぎない (SCP の継承が複雑化する)</li>
                            <li>
                                本番ワークロードはアプリケーションやチームごとに専用アカウントを持たせる
                            </li>
                            <li>管理アカウントは請求と組織管理に限定する</li>
                            <li>新しい SCP はまず検証用 OU で動作を確認してから展開する</li>
                        </ul>
                    </div>
                </div>
<p>
                    {"出典: "}
                    <a href="https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/organizing-your-aws-environment.html">https://docs.aws.amazon.com/whitepapers/latest/organizing-your-aws-environment/organizing-your-aws-environment.html</a>
                </p>
<h3 id="55-step-4-aws-control-tower" tabIndex={-1}>5.5 Step 4: AWS Control Tower</h3>
<p>
                    AWS Control Tower は、Organizations
                    と関連サービスを使って、ベストプラクティスに沿ったマルチアカウント環境
                    (ランディングゾーン) を自動構築し、継続的に統制するサービスです。
                </p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.5 Step 4: AWS Control Tower (表34)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機能</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ランディングゾーン</td>
                                <td>
                                    初期のアカウント構成、ID
                                    管理、ログ集約などを一括セットアップする。ログアーカイブと監査用のアカウントが作られる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>コントロール (旧ガードレール)</td>
                                <td>
                                    予防型 (SCP で実行を阻止), 検出型 (AWS Config で違反を検出),
                                    プロアクティブ型 (CloudFormation のデプロイ前に検査)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Account Factory</td>
                                <td>
                                    標準化された新規アカウントを払い出す。ネットワーク設定やベースラインを自動適用
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ドリフト検出</td>
                                <td>設定が想定から外れた状態を検知</td>
                            </tr>
                            <tr className="odd">
                                <td>ダッシュボード</td>
                                <td>準拠状況を組織全体で可視化</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>使い分け:</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.5 Step 4: AWS Control Tower (表35)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">状況</th>
                                <th scope="col">選択</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>新規にマルチアカウントを素早く、標準的に構築したい</td>
                                <td>Control Tower</td>
                            </tr>
                            <tr className="even">
                                <td>既存の Organizations に独自要件の細かい制御を作り込みたい</td>
                                <td>Organizations を直接使い、必要に応じて Control Tower を併用</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>
                    注意点: Control Tower には「ホーム
                    リージョン」があり、後から変更できない点が設計時の重要事項です。
                </p>
<p>
                    {"出典: "}
                    <a href="https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html">https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html</a>
                </p>
<h3 id="56-step-5-集中ログとイベント通知" tabIndex={-1}>5.6 Step 5: 集中ログとイベント通知</h3>
<Diagram id="diag-16" label={"5.6 Step 5: 集中ログとイベント通知"} />
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.6 Step 5: 集中ログとイベント通知 (表36)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">目的</th>
                                <th scope="col">手段</th>
                                <th scope="col">ポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>API 操作ログ</td>
                                <td>CloudTrail の組織の証跡</td>
                                <td>新規アカウントにも自動適用。整合性検証、KMS 暗号化</td>
                            </tr>
                            <tr className="even">
                                <td>設定の履歴と準拠</td>
                                <td>AWS Config の組織アグリゲーター</td>
                                <td>全アカウントとリージョンの設定を1か所で参照</td>
                            </tr>
                            <tr className="odd">
                                <td>アプリケーションと OS のログ</td>
                                <td>
                                    CloudWatch Logs のサブスクリプションフィルターと Firehose で中央
                                    S3 へ
                                </td>
                                <td>クロスアカウントの送信先を中央アカウントに用意</td>
                            </tr>
                            <tr className="even">
                                <td>横断的な監視</td>
                                <td>CloudWatch のクロスアカウントオブザーバビリティ</td>
                                <td>
                                    監視アカウントがソースアカウントのメトリクス、ログ、トレースを参照
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>イベント通知</td>
                                <td>EventBridge のクロスアカウントイベントバス</td>
                                <td>
                                    バスのリソースポリシーで組織 (<code>aws:PrincipalOrgID</code>)
                                    を許可
                                </td>
                            </tr>
                            <tr className="even">
                                <td>通知の配信</td>
                                <td>Amazon SNS のトピックポリシー</td>
                                <td>組織内のアカウントからの発行を許可</td>
                            </tr>
                            <tr className="odd">
                                <td>AWS の障害や計画イベント</td>
                                <td>AWS Health の組織ビュー</td>
                                <td>全アカウントの影響を一覧化</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">ベストプラクティス</div>
                        <ul>
                            <li>
                                ログアーカイブアカウントへの書き込み専用権限を各アカウントに与え、削除や変更は専用の少数の管理者のみに限定する
                            </li>
                            <li>
                                S3 のバージョニングと Object Lock
                                を有効化し、ライフサイクルで低コスト層へ移行する
                            </li>
                            <li>通知は重要度でルーティングし、ノイズを減らす</li>
                        </ul>
                    </div>
                </div>
<h3 id="57-step-6-リソースの共有-aws-ram-と関連手段" tabIndex={-1}>
                    5.7 Step 6: リソースの共有 (AWS RAM と関連手段)
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.7 Step 6: リソースの共有 (AWS RAM と関連手段) (表37)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">手段</th>
                                <th scope="col">共有する対象</th>
                                <th scope="col">ポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>AWS Resource Access Manager (RAM)</td>
                                <td>
                                    サブネット (VPC 共有), Transit Gateway, Route 53 Resolver
                                    ルール, License Manager の設定など
                                </td>
                                <td>
                                    組織内共有を有効にすると、招待なしで共有できる。コピーではなく同一リソースを共有
                                </td>
                            </tr>
                            <tr className="even">
                                <td>VPC 共有</td>
                                <td>1つの VPC のサブネットを複数アカウントで利用</td>
                                <td>
                                    ネットワークは所有アカウントが管理し、参加アカウントはリソースを起動する。VPC
                                    の数と接続を削減
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Service Catalog</td>
                                <td>承認済みの製品 (テンプレート)</td>
                                <td>ポートフォリオを共有し、標準構成を提供</td>
                            </tr>
                            <tr className="even">
                                <td>リソースベースのポリシー</td>
                                <td>S3, KMS, SQS, ECR など</td>
                                <td>組織 ID の条件で組織内に限定</td>
                            </tr>
                            <tr className="odd">
                                <td>AMI とスナップショットの共有</td>
                                <td>AMI, EBS スナップショット</td>
                                <td>暗号化している場合は鍵の共有も必要</td>
                            </tr>
                            <tr className="even">
                                <td>CloudFormation StackSets</td>
                                <td>同一テンプレートを複数アカウントとリージョンへ展開</td>
                                <td>組織と連携して新規アカウントへ自動展開</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/ram/latest/userguide/what-is.html">https://docs.aws.amazon.com/ram/latest/userguide/what-is.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-sharing.html</a>
                    </li>
                </ul>
<h3 id="58-step-7-マルチアカウントのガバナンスモデル" tabIndex={-1}>
                    5.8 Step 7: マルチアカウントのガバナンスモデル
                </h3>
<p>統制は「予防」「検出」「修復」の3層で考えます。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.8 Step 7: マルチアカウントのガバナンスモデル (表38)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">層</th>
                                <th scope="col">目的</th>
                                <th scope="col">手段</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>予防</td>
                                <td>違反操作を最初から実行できなくする</td>
                                <td>
                                    SCP, RCP, 権限境界, Control Tower の予防型コントロール, Service
                                    Catalog
                                </td>
                            </tr>
                            <tr className="even">
                                <td>検出</td>
                                <td>違反や逸脱を見つける</td>
                                <td>
                                    AWS Config ルール, Security Hub, GuardDuty, Access Analyzer,
                                    Control Tower の検出型コントロール
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>修復</td>
                                <td>違反を自動または半自動で是正する</td>
                                <td>
                                    EventBridge と Systems Manager Automation, Lambda, Config
                                    の自動修復
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>典型的なガードレール (SCP の例):</p>
<ul>
                    <li>組織からの脱退を禁止する</li>
                    <li>CloudTrail、Config、GuardDuty の無効化を禁止する</li>
                    <li>許可されたリージョン以外の利用を禁止する</li>
                    <li>暗号化されていない EBS ボリュームや RDS の作成を禁止する</li>
                    <li>ルートユーザーの利用を禁止する (メンバーアカウント)</li>
                    <li>必須タグがないリソースの作成を禁止する</li>
                </ul>
<Diagram id="diag-17" label={"5.8 Step 7: マルチアカウントのガバナンスモデル"} />
<h3 id="59-task-14-ベストプラクティスまとめ" tabIndex={-1}>
                    5.9 Task 1.4 ベストプラクティスまとめ
                </h3>
<ul>
                    <li>管理アカウントにはワークロードを置かず、請求と組織管理だけに使う</li>
                    <li>セキュリティ、ログ、ネットワークの専用アカウントを最初に用意する</li>
                    <li>全ガードレールは予防、検出、修復の3層で考え、まず予防 (SCP) で防ぐ</li>
                    <li>
                        新規アカウントは Account Factory
                        などで自動払い出しし、ベースラインを自動適用する
                    </li>
                    <li>
                        各セキュリティサービスは委任管理者に権限を委任し、管理アカウントでの運用を最小化する
                    </li>
                    <li>ルートユーザーに MFA を設定し、日常利用を避ける</li>
                </ul>
<h3 id="510-task-14-よく狙われる落とし穴" tabIndex={-1}>5.10 Task 1.4 よく狙われる落とし穴</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5.10 Task 1.4 よく狙われる落とし穴 (表39)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">状況</th>
                                <th scope="col">誤りやすい選択</th>
                                <th scope="col">正しい考え方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>メンバーアカウントでの特定操作を禁止</td>
                                <td>各アカウントで IAM ポリシーを設定</td>
                                <td>OU に SCP を適用</td>
                            </tr>
                            <tr className="even">
                                <td>管理アカウントの操作を SCP で制限したい</td>
                                <td>SCP を適用</td>
                                <td>管理アカウントには SCP は効かない。使わない運用にする</td>
                            </tr>
                            <tr className="odd">
                                <td>SCP に Allow を書けば権限が付与される</td>
                                <td>SCP で許可を付与</td>
                                <td>SCP は上限のみ。IAM ポリシーでの許可が別途必要</td>
                            </tr>
                            <tr className="even">
                                <td>多数アカウントでネットワークを共通化</td>
                                <td>アカウントごとに VPC を作成して接続</td>
                                <td>VPC 共有 (RAM) や Transit Gateway を活用</td>
                            </tr>
                            <tr className="odd">
                                <td>新規アカウントに標準設定を自動で適用</td>
                                <td>手動で設定</td>
                                <td>Control Tower の Account Factory や StackSets</td>
                            </tr>
                            <tr className="even">
                                <td>全アカウントの CloudTrail 集約</td>
                                <td>各アカウントで個別に証跡作成</td>
                                <td>組織の証跡を1つ作成</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<hr />
        </section>
    );
}
