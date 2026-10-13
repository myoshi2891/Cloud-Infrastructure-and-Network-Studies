import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs13を全文・順序どおり収録。 */
export function S13() { return <>
<h2 id="s13" tabIndex={-1}>{"Step 10：既存環境へのスタック更新（Skill 3.2.4）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.2.4"}</strong>{": 既存の環境にアプリケーションスタックの更新をデプロイする（例：AWS SAM テンプレートを別のステージング環境にデプロイする）"}</p>{" "}</blockquote>
{" "}
<h3>{"10.1 考え方：同じテンプレート × 違うパラメータ × 違うスタック"}</h3>
{" "}
<p><strong>{"同じ SAM / CloudFormation テンプレート"}</strong>{" を使い、"}<strong>{"パラメータとスタック名を変えるだけ"}</strong>{" で、dev / staging / prod を作り分けます。"}</p>
{" "}
<Diagram id="d14" label="Step 10：既存環境へのスタック更新（Skill 3.2.4）の図解 d14" />
{" "}
<h3>{"10.2 samconfig.toml で環境別の設定を持つ"}</h3>
{" "}
<CodeBlock index={13} language="toml" lines={["version = 0.1","","[default.deploy.parameters]","stack_name = \"myapp-dev\"","resolve_s3 = true","capabilities = \"CAPABILITY_IAM\"","parameter_overrides = \"Stage=dev\"","","[staging.deploy.parameters]","stack_name = \"myapp-staging\"","resolve_s3 = true","capabilities = \"CAPABILITY_IAM\"","parameter_overrides = \"Stage=staging LogLevel=INFO\"","","[prod.deploy.parameters]","stack_name = \"myapp-prod\"","resolve_s3 = true","capabilities = \"CAPABILITY_IAM\"","parameter_overrides = \"Stage=prod LogLevel=WARN\"","confirm_changeset = true"]} />
{" "}
<CodeBlock index={14} language="bash" lines={["sam build","sam deploy --config-env staging      # staging 用の設定でデプロイ","sam deploy --config-env prod         # prod 用（変更セットの確認つき）"]} />
{" "}
<h3>{"10.3 テンプレート側：Parameters と Conditions"}</h3>
{" "}
<CodeBlock index={15} language="yaml" lines={["Parameters:","  Stage:","    Type: String","    AllowedValues: [dev, staging, prod]","","Conditions:","  IsProd: !Equals [!Ref Stage, prod]","","Resources:","  OrderFunction:","    Type: AWS::Serverless::Function","    Properties:","      Handler: app.handler","      Runtime: python3.13","      MemorySize: !If [IsProd, 1024, 256]    # 本番だけ大きく","      Environment:","        Variables:","          STAGE: !Ref Stage"]} />
{" "}
<h3>{"10.4 更新の安全な流れ（変更セット）"}</h3>
{" "}
<p><code>{"sam deploy"}</code>{" は内部で CloudFormation の "}<strong>{"変更セット（Change Set）"}</strong>{" を作成し、それを実行します。"}</p>
{" "}
<Diagram id="d15" label="Step 10：既存環境へのスタック更新（Skill 3.2.4）の図解 d15" />
{" "}
<h3>{"10.5 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 36">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"環境ごとにスタックを分ける"}</strong>{"（スタック名に環境名）"}</td>

<td>{"独立性・安全性"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"prod は "}<strong><code>{"confirm_changeset"}</code>{"（または "}<code>{"--no-execute-changeset"}</code>{"）"}</strong>{" で内容確認"}</td>

<td>{"意図しない削除・置換の防止"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"環境差分は "}<strong>{"Parameters / Conditions / Mappings"}</strong>{" で表現"}</td>

<td>{"テンプレートを 1 つに保てる"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong><code>{"sam validate --lint"}</code></strong>{" や "}<strong>{"cfn-lint"}</strong>{" で事前検査"}</td>

<td>{"構文・ベストプラクティス違反の早期検出"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"本番デプロイは "}<strong>{"人の手ではなくパイプライン"}</strong>{" から行う"}</td>

<td>{"再現性と監査性"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"同じ成果物（ビルド済み）を staging → prod に昇格"}</td>

<td>{"「テストしたものを出す」"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"10.6 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 37">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"同じ SAM テンプレートを staging にもデプロイ"}</td>

<td><strong>{"スタック名とパラメータを変えて "}<code>{"sam deploy"}</code></strong>{"（"}<code>{"--config-env"}</code>{"）"}</td>

</tr>

<tr>

<td>{"本番更新前に変更内容を確認したい"}</td>

<td><strong>{"変更セット"}</strong></td>

</tr>

<tr>

<td>{"環境ごとに値を変えたい"}</td>

<td><strong>{"Parameters"}</strong>{"（＋ Conditions / Mappings）"}</td>

</tr>

<tr>

<td>{"デプロイ失敗時の挙動"}</td>

<td>{"既定で "}<strong>{"ロールバック"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"4 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"samconfig（SAM CLI の設定ファイル）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/serverless-sam-cli-config.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"変更セットによる更新"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-anatomy.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CloudFormation テンプレートの構造"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/template-anatomy.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"sam deploy"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-deploy.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
