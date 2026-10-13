import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs12を全文・順序どおり収録。 */
export function S12() { return <>
<h2 id="s12" tabIndex={-1}>{"Step 9：開発用エンドポイントと API Gateway ステージ（Skill 3.2.3）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.2.3"}</strong>{": 開発用エンドポイントを使ってアプリケーションをテストする（例：Amazon API Gateway のステージを設定する）"}</p>{" "}</blockquote>
{" "}
<h3>{"9.1 API Gateway の「ステージ」とは"}</h3>
{" "}
<p><strong>{"ステージ"}</strong>{" は、API のデプロイ済みスナップショットに付ける "}<strong>{"名前付きの公開窓口"}</strong>{"（例："}<code>{"dev"}</code>{"、"}<code>{"test"}</code>{"、"}<code>{"prod"}</code>{"）です。ステージごとに "}<strong>{"別の URL"}</strong>{" が付きます。"}</p>
{" "}
<CodeBlock index={10} language="text" lines={["https://{api-id}.execute-api.{region}.amazonaws.com/{stage-name}/{resource}"]} />
{" "}
<h3>{"9.2 REST API の「デプロイ」と「ステージ」の関係"}</h3>
{" "}
<Diagram id="d13" label="Step 9：開発用エンドポイントと API Gateway ステージ（Skill 3.2.3）の図解 d13" />
{" "}
<blockquote>{" "}<p>{"⚠️ "}<strong>{"最重要ポイント"}</strong>{": REST API は、リソースやメソッドを変更しても "}<strong>{"再デプロイしない限り、ステージには反映されません"}</strong>{"。「変更したのに動かない」は、まず "}<strong>{"再デプロイ漏れ"}</strong>{" を疑います。"}</p>{" "}</blockquote>
{" "}
<h3>{"9.3 ステージで設定できること"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 32">
<table>

<thead>

<tr>

<th scope="col">{"設定"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"ステージ変数"}</strong></td>

<td>{"環境ごとに変わる値（例：Lambda エイリアス名、バックエンド URL）。"}<code>{"${stageVariables.変数名}"}</code>{" で参照"}</td>

</tr>

<tr>

<td><strong>{"スロットリング"}</strong></td>

<td>{"ステージ／メソッド単位のレート制限"}</td>

</tr>

<tr>

<td><strong>{"キャッシュ"}</strong></td>

<td>{"レスポンスキャッシュの有効化"}</td>

</tr>

<tr>

<td><strong>{"ログ・メトリクス"}</strong></td>

<td>{"CloudWatch Logs への実行ログ、詳細メトリクス"}</td>

</tr>

<tr>

<td><strong>{"カナリアリリース"}</strong></td>

<td>{"ステージ内で "}<strong>{"一部のトラフィックだけ新しいデプロイへ"}</strong>{" 流す"}</td>

</tr>

<tr>

<td><strong>{"WAF / クライアント証明書"}</strong></td>

<td>{"セキュリティ設定"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"9.4 REST API と HTTP API の違い（ステージ観点）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 33">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"REST API"}</th>

<th scope="col">{"HTTP API"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"デプロイ操作"}</td>

<td><strong>{"明示的なデプロイが必要"}</strong></td>

<td><strong>{"自動デプロイ（auto-deploy）"}</strong>{" を有効にできる"}</td>

</tr>

<tr>

<td>{"既定のステージ"}</td>

<td>{"なし（作成する）"}</td>

<td><strong><code>{"$default"}</code>{" ステージ"}</strong></td>

</tr>

<tr>

<td>{"ステージ変数"}</td>

<td>{"使える"}</td>

<td>{"使える"}</td>

</tr>

<tr>

<td>{"カナリアリリース"}</td>

<td><strong>{"使える"}</strong></td>

<td>{"使えない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"9.5 開発エンドポイントを使ったテストの流れ"}</h3>
{" "}
<ol>
{" "}
<li><code>{"dev"}</code>{" ステージを作成してデプロイする。"}</li>
{" "}
<li><code>{"dev"}</code>{" の "}<strong>{"Invoke URL"}</strong>{" に "}<code>{"curl"}</code>{" やテストコードでアクセスする。"}</li>
{" "}
<li>{"ステージ変数で、バックエンド（Lambda エイリアス "}<code>{"dev"}</code>{"）に接続する。"}</li>
{" "}
<li>{"問題なければ、同じ定義を "}<code>{"test"}</code>{" → "}<code>{"prod"}</code>{" ステージに昇格する。"}</li>
{" "}
</ol>
{" "}
<CodeBlock index={11} language="bash" lines={["curl -i https://abc123.execute-api.ap-northeast-1.amazonaws.com/dev/orders"]} />
{" "}
<h3>{"9.6 SAM でのステージ指定"}</h3>
{" "}
<CodeBlock index={12} language="yaml" lines={["Resources:","  ApiGateway:","    Type: AWS::Serverless::Api","    Properties:","      StageName: dev            # ステージ名","      Variables:","        lambdaAlias: dev        # ステージ変数"]} />
{" "}
<h3>{"9.7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 34">
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

<td>{"dev / test / prod の "}<strong>{"ステージ（または別アカウント）を分ける"}</strong></td>

<td>{"影響範囲の限定"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"環境差分は "}<strong>{"ステージ変数"}</strong>{" で吸収し、API 定義は共通にする"}</td>

<td>{"定義のずれを防ぐ"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"dev ステージでは "}<strong>{"詳細ログ"}</strong>{" を有効、prod ではデータ量を考慮"}</td>

<td>{"調査性とコストの両立"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"prod へは "}<strong>{"カナリアリリース"}</strong>{" で段階展開"}</td>

<td>{"事故の影響を最小化"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"コンソールの "}<strong>{"テスト機能（Test invoke）"}</strong>{" で、デプロイ前にメソッドを確認"}</td>

<td>{"早期の不具合発見"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"9.8 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 35">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"API を変更したが、ステージの動作が変わらない"}</td>

<td><strong>{"API を再デプロイ"}</strong>{" していない"}</td>

</tr>

<tr>

<td>{"環境ごとに異なる Lambda を呼びたい（API 定義は共通）"}</td>

<td><strong>{"ステージ変数"}</strong></td>

</tr>

<tr>

<td>{"本番ステージに一部のトラフィックだけ新バージョンを流す"}</td>

<td><strong>{"カナリアリリース設定"}</strong>{"（REST API）"}</td>

</tr>

<tr>

<td>{"開発用に手軽な URL でテスト"}</td>

<td><strong>{"dev ステージの Invoke URL"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"6 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/stages.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"API Gateway のステージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/stages.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-stages.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ステージの設定"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/set-up-stages.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-deploy-api.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"REST API のデプロイ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/how-to-deploy-api.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/amazon-api-gateway-using-stage-variables.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ステージ変数"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/amazon-api-gateway-using-stage-variables.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/canary-release.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"カナリアリリース"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/canary-release.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-stages.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"HTTP API のステージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/http-api-stages.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
