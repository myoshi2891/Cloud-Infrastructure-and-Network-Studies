import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 4　プログラムによるアクセスの設定（Skill 2.1.3）を省略せず収録。 */
export function Step4() { return (<section className="section">
<h2 id="step-4" tabIndex={-1}>{"Step 4 プログラムによるアクセスの設定（Skill 2.1.3）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「AWSへのプログラムアクセスを設定する」"}</strong>{"：CLI・SDKが認証情報をどこから取得するかを理解し、安全な方法を選べること。"}</p>
{" "}
<h3>{"4-1 アクセス方法の整理"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 16">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"使う場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"マネジメントコンソール"}</td>

<td>{"人が画面で操作"}</td>

</tr>

<tr>

<td>{"AWS CLI"}</td>

<td>{"シェルから操作・スクリプト"}</td>

</tr>

<tr>

<td>{"AWS SDK（boto3など）"}</td>

<td>{"アプリケーションコード"}</td>

</tr>

<tr>

<td>{"直接REST API"}</td>

<td>{"通常はSDKに任せる（SigV4署名が必要。Step 5）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"4-2 認証情報の種類と安全性"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 17">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"安全性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ロールの一時認証情報"}</td>

<td>{"Lambda、EC2、ECSが自動取得"}</td>

<td>{"高い（自動更新・失効する）"}</td>

</tr>

<tr>

<td>{"IAM Identity Centerのセッション"}</td>

<td><code>{"aws sso login"}</code></td>

<td>{"高い（人間の開発者向け）"}</td>

</tr>

<tr>

<td>{"IAMユーザーのアクセスキー（長期）"}</td>

<td><code>{"AKIA..."}</code></td>

<td>{"低い（漏洩リスク。使わないのが理想）"}</td>

</tr>

<tr>

<td>{"rootのアクセスキー"}</td>

<td>{"-"}</td>

<td><strong>{"作らない"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"4-3 認証情報プロバイダーチェーン"}</h3>
{" "}
<p>{"SDK／CLIは、認証情報を"}<strong>{"決まった順序で探索"}</strong>{"します。代表的な探索元は次のとおりです（細かい順序はSDKごとに異なるため、公式の「標準化された認証情報プロバイダー」を確認してください）。"}</p>
{" "}
<div className="diagram-card">
<Diagram index={5} label="Step 4　プログラムによるアクセスの設定（Skill 2.1.3）の図解" />
</div>
{" "}
<blockquote>{" "}<p>{"「ローカル開発では環境変数やプロファイル、AWS上の実行環境ではロール」と使い分けます。"}<strong>{"コード内に認証情報を書く必要はありません"}</strong>{"。"}</p>{" "}</blockquote>
{" "}
<h3>{"4-4 ローカル開発の推奨設定（IAM Identity Center）"}</h3>
{" "}
<CodeBlock index={5} language="bash" lines={["# 初回のみ：SSOプロファイルを作成","aws configure sso","","# ログイン（ブラウザで認証。一時認証情報が取得される）","aws sso login --profile dev","","# プロファイルを使って実行","aws s3 ls --profile dev"]} />
{" "}
<p>{"プロファイルのAssumeRole設定例（"}<code>{"~/.aws/config"}</code>{"）："}</p>
{" "}
<CodeBlock index={6} language="ini" lines={["[profile partner]","role_arn = arn:aws:iam::222233334444:role/PartnerReadRole","source_profile = dev","role_session_name = dev-session","region = ap-northeast-1"]} />
{" "}
<h3>{"4-5 EC2のメタデータ：IMDSv2"}</h3>
{" "}
<p>{"EC2上のアプリはインスタンスメタデータサービス（IMDS）から一時認証情報を取得します。SSRF攻撃による認証情報の窃取を防ぐため、"}<strong>{"セッショントークン方式のIMDSv2"}</strong>{"を必須にします。"}</p>
{" "}
<CodeBlock index={7} language="bash" lines={["# IMDSv2：まずトークンを取得してからメタデータを読む","TOKEN=$(curl -s -X PUT \"http://169.254.169.254/latest/api/token\" \\","  -H \"X-aws-ec2-metadata-token-ttl-seconds: 21600\")","curl -s -H \"X-aws-ec2-metadata-token: $TOKEN\" \\","  http://169.254.169.254/latest/meta-data/iam/security-credentials/"]} />
{" "}
<h3>{"4-6 AWS外の環境から使う場合"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 18">
<table>

<thead>

<tr>

<th scope="col">{"状況"}</th>

<th scope="col">{"推奨"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"オンプレミス・他クラウドのワークロード"}</td>

<td>{"IAM Roles Anywhere（X.509証明書で一時認証情報を取得）"}</td>

</tr>

<tr>

<td>{"GitHub Actionsなど外部CI"}</td>

<td>{"OIDCフェデレーション（"}<code>{"AssumeRoleWithWebIdentity"}</code>{"）。長期キー不要"}</td>

</tr>

<tr>

<td>{"開発者のPC"}</td>

<td>{"IAM Identity Center"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"4-7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 19">
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

<td>{"長期アクセスキーを"}<strong>{"作らない・使わない"}</strong>{"。やむを得ない場合は定期的にローテーションし、使っていないキーは無効化・削除"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"コード・Git・ログ・環境変数ファイルにキーを残さない"}</strong>{"（"}<code>{".gitignore"}</code>{"、シークレットスキャン）"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"AWS上ではロール、人にはIdentity Centerを使う"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"プロファイルを使い分けて本番と開発を混ぜない"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"EC2ではIMDSv2を必須にする"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「Lambdaのコードに"}<code>{"aws_access_key_id"}</code>{"を直書き」→ "}<strong>{"誤り"}</strong>{"。実行ロールを使う。"}</li>
{" "}
<li>{"「Gitに誤ってキーをコミットした」→ キーを"}<strong>{"即時に無効化・削除"}</strong>{"してから新規発行し、履歴の対処をする（コミットを消すだけでは不十分）。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"SDK・ツール共通の認証情報プロバイダー（標準化）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html">{"https://docs.aws.amazon.com/sdkref/latest/guide/standardized-credentials.html"}</a></li>
{" "}
<li>{"AWS CLIの認証設定："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-authentication.html">{"https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-authentication.html"}</a></li>
{" "}
<li>{"IAM Identity Center："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html">{"https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html"}</a></li>
{" "}
<li>{"IAM Roles Anywhere："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html">{"https://docs.aws.amazon.com/rolesanywhere/latest/userguide/introduction.html"}</a></li>
{" "}
<li>{"IMDSv2："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html">{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html"}</a></li>
{" "}
<li>{"長期アクセスキーの代替："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
