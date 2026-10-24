import { Diagram } from "../Diagram";

export default function Task12() {
    return (
        <section className="guide-section" data-section="task12">
<h2 id="3-task-12-セキュリティコントロールを規定する" tabIndex={-1}>
                    3. Task 1.2 セキュリティコントロールを規定する
                </h2>
<h3 id="31-exam-guide-が求めている内容" tabIndex={-1}>3.1 Exam Guide が求めている内容</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3.1 Exam Guide が求めている内容 (表13)"}>
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
                                    IAM と IAM Identity Center, ルートテーブル /
                                    セキュリティグループ / ネットワーク ACL, 暗号鍵と証明書の管理
                                    (AWS KMS, ACM), セキュリティ・ID・コンプライアンスツール
                                    (CloudTrail, IAM Access Analyzer, Security Hub, Inspector)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Skills</td>
                                <td>
                                    クロスアカウントアクセス管理の評価, サードパーティ ID
                                    プロバイダーとの統合, 保存時と転送時の暗号化戦略,
                                    集中的なセキュリティイベント通知と監査の戦略
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="32-step-1-iam-の基本と権限評価の考え方" tabIndex={-1}>
                    3.2 Step 1: IAM の基本と権限評価の考え方
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3.2 Step 1: IAM の基本と権限評価の考え方 (表14)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">意味</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ID ベースのポリシー</td>
                                <td>ユーザー、グループ、ロールにアタッチして許可を与える</td>
                            </tr>
                            <tr className="even">
                                <td>リソースベースのポリシー</td>
                                <td>
                                    S3 バケット、KMS キー、SQS
                                    キューなどリソース側に付けて、誰に許可するかを書く
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>信頼ポリシー</td>
                                <td>IAM ロールを「誰が引き受けられるか」を定義する</td>
                            </tr>
                            <tr className="even">
                                <td>アクセス許可の境界 (Permissions Boundary)</td>
                                <td>IAM ユーザーやロールが持てる権限の上限を決める</td>
                            </tr>
                            <tr className="odd">
                                <td>SCP (サービスコントロールポリシー)</td>
                                <td>
                                    Organizations で、アカウントが使える権限の上限を決める (Task 1.4
                                    で詳述)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>セッションポリシー</td>
                                <td>ロール引き受け時に、そのセッションの権限をさらに絞る</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>評価の基本原則 (簡略化したもの):</p>
<ol>
                    <li>明示的な Deny があれば、他に Allow があっても拒否される</li>
                    <li>何も許可されていなければ、デフォルトで拒否される (暗黙の Deny)</li>
                    <li>
                        SCP
                        や権限境界は「許可を与える」のではなく「上限を決める」。上限の内側で、さらに
                        ID ベースやリソースベースのポリシーが許可して初めて実行できる
                    </li>
                </ol>
<Diagram id="diag-9" label={"3.2 Step 1: IAM の基本と権限評価の考え方"} />
<p>
                    補足: 同一アカウント内で、リソースベースポリシーが IAM ユーザー ARN
                    (<code>arn:aws:iam::&lt;アカウントID&gt;:user/&lt;ユーザー名&gt;</code>)
                    または引き受けたロールのセッション ARN
                    (<code>arn:aws:sts::&lt;アカウントID&gt;:assumed-role/&lt;ロール名&gt;/&lt;セッション名&gt;</code>)
                    に直接許可を与えている場合、権限境界による暗黙の Deny では制限されません。ロール
                    ARN
                    に対する許可は、従来どおり権限境界の範囲に制限されます。どちらの場合も明示的な
                    Deny は優先されます。
                </p>
<p>
                    {"出典: "}
                    <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html</a>
                </p>
<h3 id="33-step-2-クロスアカウントアクセス" tabIndex={-1}>
                    3.3 Step 2: クロスアカウントアクセス
                </h3>
<p>別のアカウントのリソースにアクセスさせる方法は主に2つです。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3.3 Step 2: クロスアカウントアクセス (表15)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">仕組み</th>
                                <th scope="col">向いているケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>IAM ロールの引き受け (AssumeRole)</td>
                                <td>
                                    相手アカウントのロールを一時的に引き受ける。一時認証情報が発行される
                                </td>
                                <td>
                                    管理者や自動化処理が別アカウントを操作する。最も推奨される標準方式
                                </td>
                            </tr>
                            <tr className="even">
                                <td>リソースベースのポリシー</td>
                                <td>
                                    リソース側のポリシーで、他アカウントのプリンシパルを許可する
                                </td>
                                <td>
                                    S3, SQS, SNS, KMS, ECR
                                    などで、ロールを引き受けずに直接アクセスさせたい場合
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>
                    異なるアカウント間では、「リソース側のアカウントが許可」と「アクセス元のアカウントの
                    ID ポリシーが許可」の両方が揃う必要があります。
                </p>
<Diagram id="diag-10" label={"3.3 Step 2: クロスアカウントアクセス"} />
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">ベストプラクティス</div>
                        <ul>
                            <li>長期のアクセスキーを渡さず、ロールと一時認証情報を使う</li>
                            <li>
                                サードパーティにロールの引き受けを許可する場合は、外部 ID
                                (ExternalId) を要求し、「混乱した代理人 (confused deputy)
                                問題」を防ぐ
                            </li>
                            <li>
                                組織内の共有には、リソースポリシーで{' '}
                                <code>aws:PrincipalOrgID</code>{' '}
                                条件を使い、アカウントを1つずつ列挙しない
                            </li>
                            <li>権限の委任をする管理者には権限境界を付け、権限昇格を防ぐ</li>
                        </ul>
                    </div>
                </div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic-cross-account.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/confused-deputy.html</a>
                    </li>
                </ul>
<h3 id="34-step-3-id-管理とサードパーティ-id-プロバイダー連携" tabIndex={-1}>
                    3.4 Step 3: ID 管理とサードパーティ ID プロバイダー連携
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3.4 Step 3: ID 管理とサードパーティ ID プロバイダー連携 (表16)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">概要</th>
                                <th scope="col">向いているケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>IAM Identity Center</td>
                                <td>
                                    複数アカウントと業務アプリへのシングルサインオンを一元管理。権限セット
                                    (Permission Set) をアカウントに割り当てる
                                </td>
                                <td>従業員が多数のアカウントを使う組織の標準</td>
                            </tr>
                            <tr className="even">
                                <td>IAM の SAML 2.0 フェデレーション</td>
                                <td>外部 IdP の SAML アサーションで IAM ロールを引き受ける</td>
                                <td>
                                    単一アカウント向けの既存連携や、Identity Center が使えない場合
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Amazon Cognito</td>
                                <td>
                                    自社アプリのエンドユーザー向けの認証と認可 (ユーザープールと ID
                                    プール)
                                </td>
                                <td>顧客向けアプリのログイン</td>
                            </tr>
                            <tr className="even">
                                <td>AWS Directory Service</td>
                                <td>
                                    マネージドな Active Directory (AWS Managed Microsoft AD) と AD
                                    Connector
                                </td>
                                <td>Windows 系ワークロードや既存 AD との連携</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<Diagram id="diag-11" label={"3.4 Step 3: ID 管理とサードパーティ ID プロバイダー連携"} />
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">ベストプラクティス</div>
                        <ul>
                            <li>
                                従業員の人手によるアクセスは IAM ユーザーを作らず、Identity Center
                                と外部 IdP に統一する
                            </li>
                            <li>
                                外部 IdP
                                のグループを権限セットに割り当て、人の入退社をIdP側で管理する (SCIM
                                で自動同期)
                            </li>
                            <li>ルートユーザーは MFA を有効化し、日常の運用に使わない</li>
                            <li>
                                属性ベースアクセス制御 (ABAC)
                                を使うと、タグに基づく柔軟な権限付与ができ、ポリシー数を減らせる
                            </li>
                        </ul>
                    </div>
                </div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html">https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html">https://docs.aws.amazon.com/singlesignon/latest/userguide/manage-your-identity-source-idp.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers_saml.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html</a>
                    </li>
                </ul>
<h3 id="35-step-4-ネットワークレベルの制御" tabIndex={-1}>
                    3.5 Step 4: ネットワークレベルの制御
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3.5 Step 4: ネットワークレベルの制御 (表17)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">項目</th>
                                <th scope="col">セキュリティグループ</th>
                                <th scope="col">ネットワーク ACL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>適用単位</td>
                                <td>ENI (インスタンスなど)</td>
                                <td>サブネット</td>
                            </tr>
                            <tr className="even">
                                <td>状態</td>
                                <td>ステートフル (戻り通信は自動許可)</td>
                                <td>ステートレス (戻り通信も明示的に許可が必要)</td>
                            </tr>
                            <tr className="odd">
                                <td>ルール</td>
                                <td>許可のみ</td>
                                <td>許可と拒否</td>
                            </tr>
                            <tr className="even">
                                <td>評価</td>
                                <td>すべてのルールを評価</td>
                                <td>番号の小さいルールから順に評価</td>
                            </tr>
                            <tr className="odd">
                                <td>典型的な使い方</td>
                                <td>通常のアクセス制御の主役</td>
                                <td>特定の IP を明示的にブロックするなど、追加の防御</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<ul>
                    <li>
                        セキュリティグループは、他のセキュリティグループを参照元に指定できる (例:
                        アプリ層は Web 層の SG からのみ許可)
                    </li>
                    <li>
                        より高度な検査には AWS Network Firewall, AWS WAF, AWS Shield を組み合わせる
                    </li>
                    <li>組織全体への一括適用には AWS Firewall Manager を使う (Task 1.4 で関連)</li>
                </ul>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html</a>
                    </li>
                </ul>
<h3 id="36-step-5-暗号化戦略-保存時と転送時" tabIndex={-1}>
                    3.6 Step 5: 暗号化戦略 (保存時と転送時)
                </h3>
<h4>AWS KMS の基礎</h4>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"AWS KMS の基礎 (表18)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">鍵の種類</th>
                                <th scope="col">管理者</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>AWS 所有のキー</td>
                                <td>AWS</td>
                                <td>利用者からは見えない。無料。監査や制御はできない</td>
                            </tr>
                            <tr className="even">
                                <td>AWS マネージドキー</td>
                                <td>AWS</td>
                                <td>
                                    サービスごとに作成され、自動ローテーション。ポリシーは変更できない
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>カスタマーマネージドキー (CMK)</td>
                                <td>利用者</td>
                                <td>
                                    キーポリシー、ローテーション、無効化、削除を制御できる。クロスアカウント共有が可能
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<ul>
                    <li>
                        エンベロープ暗号化: データ本体はデータキーで暗号化し、データキーを KMS
                        のキーで暗号化する
                    </li>
                    <li>
                        KMS では「キーポリシー」が必須で、アクセス制御の基点になる。IAM
                        ポリシーだけでは許可されない (キーポリシーが IAM に委任している場合のみ IAM
                        ポリシーが効く)
                    </li>
                    <li>
                        マルチリージョンキーを使うと、リージョンをまたいで同じキーを使った暗号化と復号ができる
                        (グローバルテーブルやDR で有効)
                    </li>
                    <li>
                        暗号化済みの EBS スナップショットや AMI を別アカウントと共有するには、AWS
                        マネージドキーではなくカスタマーマネージドキーが必要で、相手アカウントにキーの使用を許可する
                    </li>
                </ul>
<h4>ACM (AWS Certificate Manager)</h4>
<ul>
                    <li>
                        TLS 証明書の発行、デプロイ、自動更新を行う。ELB, CloudFront, API Gateway
                        などの統合サービスに関連付けて使う
                    </li>
                    <li>
                        パブリック証明書は ACM で無料発行できる。プライベート CA (AWS Private CA)
                        で社内用の証明書を発行する選択肢もある
                    </li>
                    <li>
                        CloudFront 用の証明書は米国東部 (バージニア北部)
                        リージョンで発行する必要がある (頻出)
                    </li>
                    <li>
                        証明書のエクスポートの可否など仕様は更新されるため、最新の挙動は公式ドキュメントで確認すること
                    </li>
                </ul>
<h4>保存時と転送時の暗号化まとめ</h4>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"保存時と転送時の暗号化まとめ (表19)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">対象</th>
                                <th scope="col">保存時</th>
                                <th scope="col">転送時</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>S3</td>
                                <td>SSE-S3 (既定), SSE-KMS, DSSE-KMS, SSE-C</td>
                                <td>
                                    HTTPS を必須化 (バケットポリシーで
                                    <code>aws:SecureTransport</code>)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>EBS</td>
                                <td>KMS による暗号化 (アカウント単位で既定の暗号化を有効化可能)</td>
                                <td>
                                    暗号化ボリュームでは、インスタンスとボリュームの間を移動するデータも暗号化される
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>RDS と Aurora</td>
                                <td>作成時に KMS による暗号化を指定 (後から変更は不可)</td>
                                <td>SSL と TLS 接続を強制</td>
                            </tr>
                            <tr className="even">
                                <td>DynamoDB</td>
                                <td>既定で暗号化 (キーの種類を選択)</td>
                                <td>HTTPS</td>
                            </tr>
                            <tr className="odd">
                                <td>拠点間通信</td>
                                <td>-</td>
                                <td>VPN (IPsec), MACsec, TLS</td>
                            </tr>
                            <tr className="even">
                                <td>アプリケーション通信</td>
                                <td>-</td>
                                <td>ACM の証明書を ELB や CloudFront に適用</td>
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
                                暗号化を例外ではなく既定にする (EBS の既定暗号化、S3
                                の既定暗号化、SCP で非暗号化の作成を拒否)
                            </li>
                            <li>鍵は用途や環境ごとに分け、キーポリシーは最小権限にする</li>
                            <li>
                                自動ローテーションを有効化する。鍵の削除は待機期間を置き、慎重に扱う
                            </li>
                            <li>
                                鍵管理を厳格な専用ハードウェアで行う要件がある場合は AWS CloudHSM
                                を検討する
                            </li>
                        </ul>
                    </div>
                </div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/kms/latest/developerguide/overview.html">https://docs.aws.amazon.com/kms/latest/developerguide/overview.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html">https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html">https://docs.aws.amazon.com/kms/latest/developerguide/multi-region-keys-overview.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html</a>
                    </li>
                </ul>
<h3 id="37-step-6-集中的なセキュリティイベントの通知と監査" tabIndex={-1}>
                    3.7 Step 6: 集中的なセキュリティイベントの通知と監査
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3.7 Step 6: 集中的なセキュリティイベントの通知と監査 (表20)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">サービス</th>
                                <th scope="col">役割</th>
                                <th scope="col">組織での使い方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>AWS CloudTrail</td>
                                <td>API 呼び出しの記録</td>
                                <td>
                                    組織の証跡 (Organization Trail) で全アカウントを1つの S3
                                    に集約。ログファイルの整合性検証を有効化
                                </td>
                            </tr>
                            <tr className="even">
                                <td>AWS Config</td>
                                <td>リソース設定の記録と準拠評価</td>
                                <td>
                                    アグリゲーターで全アカウントとリージョンを集約。コンフォーマンスパックで規則を一括展開
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Security Hub</td>
                                <td>検出結果の集約と、セキュリティ標準への準拠チェック</td>
                                <td>委任管理者アカウントで全アカウントの検出結果を集約</td>
                            </tr>
                            <tr className="even">
                                <td>Amazon GuardDuty</td>
                                <td>脅威検出 (CloudTrail, VPC フローログ, DNS ログなどを分析)</td>
                                <td>組織で自動有効化し、委任管理者が一元管理</td>
                            </tr>
                            <tr className="odd">
                                <td>Amazon Inspector</td>
                                <td>脆弱性スキャン (EC2, ECR, Lambda)</td>
                                <td>組織全体で自動有効化</td>
                            </tr>
                            <tr className="even">
                                <td>IAM Access Analyzer</td>
                                <td>外部公開や未使用アクセスの検出, ポリシーの検証と生成</td>
                                <td>組織を信頼ゾーンとして外部アクセスを検出</td>
                            </tr>
                            <tr className="odd">
                                <td>Amazon Macie</td>
                                <td>S3 内の機密データの検出</td>
                                <td>組織のバケットを横断して検出</td>
                            </tr>
                            <tr className="even">
                                <td>Amazon Detective</td>
                                <td>セキュリティ調査の補助</td>
                                <td>検出結果の原因調査</td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Audit Manager</td>
                                <td>監査証拠の自動収集</td>
                                <td>監査対応の効率化</td>
                            </tr>
                            <tr className="even">
                                <td>AWS Artifact</td>
                                <td>AWS のコンプライアンスレポートの入手</td>
                                <td>監査人への証跡提出</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<Diagram id="diag-12" label={"3.7 Step 6: 集中的なセキュリティイベントの通知と監査"} />
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">ベストプラクティス</div>
                        <ul>
                            <li>
                                セキュリティツールの管理はセキュリティ専用アカウント (委任管理者)
                                に集約し、管理アカウントでは運用しない
                            </li>
                            <li>
                                ログは専用のログアーカイブアカウントの S3
                                に保存し、バージョニング、Object Lock (Compliance
                                モードでは、保持期間中のオブジェクトバージョンを root
                                ユーザーを含め誰も削除・上書きできない。ただし新しいバージョンの書き込みや削除マーカーの作成は防げず、保護されたバージョンが最新版として見えなくなる可能性があるため、バケットポリシーで許可されていない{' '}
                                <code>s3:PutObject</code> と削除マーカーを作成する{' '}
                                <code>s3:DeleteObject</code> を拒否する。Governance
                                モードを使う場合は{' '}
                                <code>s3:BypassGovernanceRetention</code> 権限を厳しく制限する)、KMS
                                暗号化、厳格なバケットポリシーで改ざんを防ぐ
                            </li>
                            <li>
                                検出結果は EventBridge
                                から通知基盤へ連携し、重要度に応じて自動修復する (例: 公開された S3
                                バケットを自動で非公開化)
                            </li>
                            <li>
                                Security Hub
                                は名称や機能構成が更新されているため、最新の構成は公式ドキュメントで確認する
                            </li>
                        </ul>
                    </div>
                </div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html">https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html">https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html">https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html">https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html">https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html</a>
                    </li>
                    <li>
                        AWS Security Reference Architecture:
                        <a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html">https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html</a>
                    </li>
                </ul>
<h3 id="38-task-12-よく狙われる落とし穴" tabIndex={-1}>3.8 Task 1.2 よく狙われる落とし穴</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3.8 Task 1.2 よく狙われる落とし穴 (表21)"}>
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
                                <td>別アカウントへの一時的な管理アクセス</td>
                                <td>IAM ユーザーとアクセスキーを作成</td>
                                <td>信頼ポリシー付きのロールを引き受ける</td>
                            </tr>
                            <tr className="even">
                                <td>全アカウントの操作を禁止したい</td>
                                <td>各アカウントの IAM で個別に拒否</td>
                                <td>Organizations の SCP を使う</td>
                            </tr>
                            <tr className="odd">
                                <td>暗号化スナップショットの共有</td>
                                <td>AWS マネージドキーのまま共有</td>
                                <td>カスタマーマネージドキーに切り替え、キー使用を許可</td>
                            </tr>
                            <tr className="even">
                                <td>従業員の多数アカウントへのログイン</td>
                                <td>アカウントごとに IAM ユーザー</td>
                                <td>IAM Identity Center と外部 IdP</td>
                            </tr>
                            <tr className="odd">
                                <td>組織全体の検出結果を一元化</td>
                                <td>各アカウントのコンソールを確認</td>
                                <td>Security Hub と GuardDuty の委任管理者</td>
                            </tr>
                            <tr className="even">
                                <td>特定 IP をブロック</td>
                                <td>セキュリティグループで拒否</td>
                                <td>SG は許可のみ。ネットワーク ACL で拒否</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<hr />
        </section>
    );
}
