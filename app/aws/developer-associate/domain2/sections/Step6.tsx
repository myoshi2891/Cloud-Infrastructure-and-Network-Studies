import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 6　IDプロバイダーによるフェデレーション（Skill 2.1.1）を省略せず収録。 */
export function Step6() { return (<section className="section">
<h2 id="step-6" tabIndex={-1}>{"Step 6 IDプロバイダーによるフェデレーション（Skill 2.1.1）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「IDプロバイダー（IdP）を使ってフェデレーションアクセスを実装する（例：Amazon Cognito、IAM）」"}</strong></p>
{" "}
<h3>{"6-1 フェデレーションとは"}</h3>
{" "}
<p>{"「"}<strong>{"自社でユーザー管理せず、すでに信頼されたIdP（Google、企業のAD、Apple等）の認証結果を借りる"}</strong>{"」仕組みです。ユーザーは、IdPで認証され、その証明（トークン／アサーション）を使ってアプリやAWSにアクセスします。"}</p>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"意味"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"IdP（IDプロバイダー）"}</td>

<td>{"ユーザーを認証する側（Google、Entra ID、Okta、企業ADなど）"}</td>

</tr>

<tr>

<td>{"SP / アプリ"}</td>

<td>{"認証結果を受け取る側"}</td>

</tr>

<tr>

<td>{"SAML 2.0"}</td>

<td>{"企業向けSSOで多いXMLベースのプロトコル"}</td>

</tr>

<tr>

<td>{"OpenID Connect（OIDC）"}</td>

<td>{"OAuth 2.0の上に作られたIDレイヤー。JWT形式のIDトークンを使う"}</td>

</tr>

<tr>

<td>{"OAuth 2.0"}</td>

<td>{"認可の枠組み（アクセストークンの発行方法を定める）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"6-2 AWSでフェデレーションを実現する3つの道"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={7} label="Step 6　IDプロバイダーによるフェデレーション（Skill 2.1.1）の図解" />
</div>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"選択肢"}</th>

<th scope="col">{"用途"}</th>

<th scope="col">{"仕組み"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Amazon Cognito"}</strong></td>

<td>{"アプリのユーザー管理・サインイン"}</td>

<td>{"ユーザープール＋IDプール"}</td>

</tr>

<tr>

<td><strong>{"IAM Identity Center"}</strong></td>

<td>{"社員のAWSアカウント／アプリへのSSO"}</td>

<td>{"外部IdPと連携、権限セット"}</td>

</tr>

<tr>

<td><strong>{"IAM IDプロバイダー（SAML／OIDC）"}</strong></td>

<td>{"既存IdPと直接フェデレーション。GitHub Actions、EKSのIRSAなど"}</td>

<td><code>{"AssumeRoleWithSAML"}</code>{" / "}<code>{"AssumeRoleWithWebIdentity"}</code></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"6-3 Amazon Cognitoの2本柱"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col"></th>

<th scope="col"><strong>{"ユーザープール（User Pools）"}</strong></th>

<th scope="col"><strong>{"IDプール（Identity Pools）"}</strong></th>

</tr>

</thead>

<tbody>

<tr>

<td>{"役割"}</td>

<td><strong>{"ユーザーディレクトリ＋認証"}</strong></td>

<td><strong>{"AWS一時認証情報の発行"}</strong></td>

</tr>

<tr>

<td>{"出力"}</td>

<td>{"JWT（IDトークン、アクセストークン、リフレッシュトークン）"}</td>

<td>{"STS一時認証情報（AWSリソースへ直接アクセス用）"}</td>

</tr>

<tr>

<td>{"認証元"}</td>

<td>{"自前ユーザー、Google／Apple等のソーシャル、SAML、OIDC"}</td>

<td>{"ユーザープール、ソーシャル、SAML、OIDC、（任意で）未認証ゲスト"}</td>

</tr>

<tr>

<td>{"主な用途"}</td>

<td>{"サインアップ／サインイン、MFA、API Gatewayの保護"}</td>

<td>{"モバイル・Webから"}<strong>{"S3やDynamoDBを直接"}</strong>{"呼ぶ"}</td>

</tr>

<tr>

<td>{"覚え方"}</td>

<td>{"「"}<strong>{"誰か"}</strong>{"を確認する」"}</td>

<td>{"「"}<strong>{"AWSに入る鍵"}</strong>{"を渡す」"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"Cognitoの公式ドキュメントでは、"}<strong>{"IDトークンはユーザーの認証、アクセストークンはユーザーの認可、リフレッシュトークンは認証情報の更新"}</strong>{"に使うと整理されています。"}</p>
{" "}
<h3>{"6-4 代表的な構成：ユーザープール＋IDプール"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={8} label="Step 6　IDプロバイダーによるフェデレーション（Skill 2.1.1）の図解" />
</div>
{" "}
<h3>{"6-5 IDプールが付与するロール"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"ロール"}</th>

<th scope="col">{"対象"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"認証済みロール"}</td>

<td>{"サインイン済みユーザー"}</td>

</tr>

<tr>

<td>{"未認証ロール"}</td>

<td>{"ゲスト（有効にする場合）。"}<strong>{"最小権限"}</strong>{"に"}</td>

</tr>

<tr>

<td>{"ロールマッピング"}</td>

<td>{"ユーザーの属性やグループに応じて異なるロールを割り当て"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"6-6 Cognito ユーザープールの主な機能"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"サインイン方式"}</td>

<td>{"ユーザー名／メール／電話、パスキー、ワンタイムパスワードなど"}</td>

</tr>

<tr>

<td>{"MFA"}</td>

<td>{"SMS、TOTP、メール OTP など"}</td>

</tr>

<tr>

<td>{"ソーシャル／SAML／OIDC連携"}</td>

<td>{"外部IdPのユーザーをユーザープールに統合"}</td>

</tr>

<tr>

<td>{"グループ"}</td>

<td>{"ユーザーをグループに分類し、IDプールのロール割り当てや認可に利用"}</td>

</tr>

<tr>

<td>{"Lambdaトリガー"}</td>

<td>{"サインアップ前検証、トークン生成前のクレーム追加（Pre Token Generation）など"}</td>

</tr>

<tr>

<td>{"機能プラン"}</td>

<td>{"Lite／Essentials／Plusのプランがあり、新規ユーザープールの既定はEssentials（料金・機能は公式で要確認）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"6-7 SAML／OIDCとIAMを直接つなぐ場合"}</h3>
{" "}
<CodeBlock language="json" lines={["{","  \"Version\": \"2012-10-17\",","  \"Statement\": [","    {","      \"Effect\": \"Allow\",","      \"Principal\": { \"Federated\": \"arn:aws:iam::111122223333:oidc-provider/token.actions.githubusercontent.com\" },","      \"Action\": \"sts:AssumeRoleWithWebIdentity\",","      \"Condition\": {","        \"StringEquals\": {","          \"token.actions.githubusercontent.com:aud\": \"sts.amazonaws.com\"","        },","        \"StringLike\": {","          \"token.actions.githubusercontent.com:sub\": \"repo:my-org/my-repo:ref:refs/heads/main\"","        }","      }","    }","  ]","}"]} />
{" "}
<blockquote>{" "}<p>{"信頼ポリシーの"}<code>{"sub"}</code>{"（主体）条件を絞らないと、"}<strong>{"他リポジトリのワークフローにも引き受けを許してしまう"}</strong>{"ため必須です。"}</p>{" "}</blockquote>
{" "}
<h3>{"6-8 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"パスワードを自前で保存せず、Cognitoなどの"}<strong>{"マネージドIdP"}</strong>{"に任せる"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"認証コードフロー＋"}<strong>{"PKCE"}</strong>{"を使う（SPAやモバイルでは特に）。Implicitグラントは避ける"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td><strong>{"MFA"}</strong>{"を有効にする（可能なら必須に）"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"IDプールの"}<strong>{"未認証アクセスは原則無効"}</strong>{"。有効にしても権限を最小限にする"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"IDプールのロールには"}<strong>{"ポリシー変数"}</strong>{"（例：ユーザーIDごとのS3プレフィックス）で個人単位に絞る（Step 8）"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"IdP側の信頼ポリシーで"}<code>{"aud"}</code>{"・"}<code>{"sub"}</code>{"を必ず検証"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"問い"}</th>

<th scope="col">{"答え"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"アプリのユーザーがS3に"}<strong>{"直接"}</strong>{"アップロードしたい"}</td>

<td>{"IDプール（一時認証情報）"}</td>

</tr>

<tr>

<td>{"API GatewayをCognitoで保護したい"}</td>

<td><strong>{"ユーザープール"}</strong>{"のトークン（IDプールではない）"}</td>

</tr>

<tr>

<td>{"社員が複数AWSアカウントにSSOしたい"}</td>

<td>{"IAM Identity Center"}</td>

</tr>

<tr>

<td>{"企業のSAML IdPのユーザーをアプリに統合"}</td>

<td>{"ユーザープールのSAML連携"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"Cognitoの用語と概念："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-terms.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-terms.html"}</a></li>
{" "}
<li>{"Amazon Cognitoとは："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/what-is-amazon-cognito.html"}</a></li>
{" "}
<li>{"Cognito IDプール："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-identity.html"}</a></li>
{" "}
<li>{"IAMのIDプロバイダーとフェデレーション："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_providers.html"}</a></li>
{" "}
<li>{"IAM Identity Center："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html">{"https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html"}</a></li>
{" "}
<li>{"AssumeRoleWithWebIdentity："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithWebIdentity.html">{"https://docs.aws.amazon.com/STS/latest/APIReference/API_AssumeRoleWithWebIdentity.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
