import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 18　機密を含む環境変数の暗号化（Skill 2.3.2）を省略せず収録。 */
export function Step18() { return (<section className="section">
<h2 id="step-18" tabIndex={-1}>{"Step 18 機密を含む環境変数の暗号化（Skill 2.3.2）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「機密データを含む環境変数を暗号化する」"}</strong></p>
{" "}
<h3>{"18-1 環境変数と機密情報"}</h3>
{" "}
<p>{"環境変数は設定を渡す便利な手段ですが、"}<strong>{"平文のまま機密情報（パスワード、APIキー）を入れると漏れやすい"}</strong>{"という問題があります（コンソールで見える、ログに出る、クラッシュダンプに載る、など）。"}</p>
{" "}
<h3>{"18-2 Lambda環境変数の暗号化"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"階層"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"保管時の暗号化（既定）"}</strong></td>

<td>{"環境変数は、"}<strong>{"AWSが管理するKMSキー"}</strong>{"で既定で暗号化される（"}<code>{"aws/lambda"}</code>{"相当）"}</td>

</tr>

<tr>

<td><strong>{"カスタマーマネージドキーの指定"}</strong></td>

<td>{"関数に"}<strong>{"自分のKMSキー"}</strong>{"を設定可能。関数の実行ロールに"}<code>{"kms:Decrypt"}</code>{"が必要"}</td>

</tr>

<tr>

<td><strong>{"暗号化ヘルパー（転送中の暗号化）"}</strong></td>

<td>{"コンソールで環境変数をKMSで"}<strong>{"クライアントサイド暗号化"}</strong>{"し、コードで復号。"}<strong>{"コンソール・APIで平文が見えない"}</strong></td>

</tr>

<tr>

<td>{"合計サイズ"}</td>

<td>{"環境変数全体で"}<strong>{"4KB"}</strong>{"まで"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<div className="diagram-card">
<Diagram index={24} label="Step 18　機密を含む環境変数の暗号化（Skill 2.3.2）の図解" />
</div>
{" "}
<blockquote>{" "}<p>{"既定の暗号化は「保存されたものが暗号化される」だけで、"}<strong>{"関数を見る権限がある人にはコンソールで平文が見える"}</strong>{"点に注意。より強く隠すなら暗号化ヘルパー、あるいは"}<strong>{"そもそも環境変数に秘密を入れない"}</strong>{"（次項）。"}</p>{" "}</blockquote>
{" "}
<h3>{"18-3 最も推奨されるパターン："}<strong>{"環境変数には「参照先」だけを入れる"}</strong></h3>
{" "}
<div className="diagram-card">
<Diagram index={25} label="Step 18　機密を含む環境変数の暗号化（Skill 2.3.2）の図解" />
</div>
{" "}
<CodeBlock language="python" lines={["import os","import json","import boto3","","secrets = boto3.client(\"secretsmanager\")","_cache = {}","","def get_db_credentials():","    name = os.environ[\"SECRET_NAME\"]  # 環境変数にあるのは「名前」だけ","    if name not in _cache:","        resp = secrets.get_secret_value(SecretId=name)","        _cache[name] = json.loads(resp[\"SecretString\"])","    return _cache[name]"]} />
{" "}
<ul>
{" "}
<li><strong>{"コールドスタート時に取得してキャッシュ"}</strong>{"し、API呼び出しとコストを抑えます（キャッシュの有効期限にも注意。ローテーション後に古い値を使い続けないよう）。"}</li>
{" "}
</ul>
{" "}
<h3>{"18-4 他の実行環境での機密の渡し方"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"環境"}</th>

<th scope="col">{"推奨される方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"ECS"}</strong></td>

<td>{"タスク定義の"}<code>{"secrets"}</code>{"でSecrets ManagerまたはParameter Storeの値を"}<strong>{"環境変数として注入"}</strong>{"（タスク実行ロールに取得権限が必要）"}</td>

</tr>

<tr>

<td><strong>{"EKS"}</strong></td>

<td>{"Secrets Manager連携（CSIドライバー等）、Kubernetes Secretsの暗号化"}</td>

</tr>

<tr>

<td><strong>{"Elastic Beanstalk"}</strong></td>

<td>{"環境プロパティに平文を入れず、Secrets Manager／Parameter Storeを参照"}</td>

</tr>

<tr>

<td><strong>{"CodeBuild"}</strong></td>

<td>{"環境変数のタイプを"}<code>{"PARAMETER_STORE"}</code>{"または"}<code>{"SECRETS_MANAGER"}</code>{"にする（"}<code>{"PLAINTEXT"}</code>{"に機密を置かない）"}</td>

</tr>

<tr>

<td><strong>{"CloudFormation"}</strong></td>

<td>{"動的参照（"}<code>{"{{resolve:secretsmanager:...}}"}</code>{"／"}<code>{"{{resolve:ssm-secure:...}}"}</code>{"）。テンプレートに平文を書かない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"ECSタスク定義の例："}</p>
{" "}
<CodeBlock language="json" lines={["{","  \"containerDefinitions\": [","    {","      \"name\": \"app\",","      \"image\": \"123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/app:latest\",","      \"secrets\": [","        {","          \"name\": \"DB_PASSWORD\",","          \"valueFrom\": \"arn:aws:secretsmanager:ap-northeast-1:111122223333:secret:prod/db-AbCdEf:password::\"","        }","      ]","    }","  ]","}"]} />
{" "}
<h3>{"18-5 ベストプラクティス"}</h3>
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

<td>{"機密を"}<strong>{"環境変数に平文で入れない"}</strong>{"。名前（参照先）だけを入れ、実行時に取得"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"環境変数を使う場合、"}<strong>{"カスタマーマネージドキー"}</strong>{"＋最小権限の"}<code>{"kms:Decrypt"}</code></td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"より強く保護するなら"}<strong>{"暗号化ヘルパー"}</strong>{"で暗号文として保持"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"環境変数の値を"}<strong>{"ログ・エラー出力に出さない"}</strong>{"（"}<code>{"print(os.environ)"}</code>{"を避ける）"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"ビルド（CodeBuild等）でも機密は"}<strong>{"シークレットサービス経由"}</strong>{"で注入"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"IaC（CloudFormation／CDK）に機密を"}<strong>{"ハードコードしない"}</strong>{"。動的参照を使う"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「Lambdaの環境変数にDBパスワードを平文で設定すれば、既定の暗号化があるので安全」→ "}<strong>{"不十分"}</strong>{"（コンソールで閲覧可能）。"}<strong>{"Secrets Manager等の利用が推奨"}</strong>{"。"}</li>
{" "}
<li>{"「CodeBuildの環境変数タイプ"}<code>{"PLAINTEXT"}</code>{"にシークレット」→ "}<strong>{"不適切"}</strong>{"。"}</li>
{" "}
<li>{"「環境変数のKMSカスタマーマネージドキーを指定したら、実行ロールの追加権限は不要」→ "}<strong>{"誤り"}</strong>{"（"}<code>{"kms:Decrypt"}</code>{"が必要）。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"Lambda環境変数の使用（暗号化・ヘルパー）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html">{"https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html"}</a></li>
{" "}
<li>{"ECSでSecrets Managerのシークレットを渡す："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html">{"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/secrets-envvar-secrets-manager.html"}</a></li>
{" "}
<li>{"CodeBuildの環境変数："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html">{"https://docs.aws.amazon.com/codebuild/latest/userguide/build-env-ref-env-vars.html"}</a></li>
{" "}
<li>{"CloudFormationの動的参照："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html">{"https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html"}</a></li>
{" "}
<li>{"Elastic Beanstalkでシークレットを使う："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.secrets.html">{"https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/AWSHowTo.secrets.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
