import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs10を全文・順序どおり収録。 */
export function S10() { return <>
<h2 id="s10" tabIndex={-1}>{"Step 7：デプロイ済みコードのテスト（Skill 3.2.1）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.2.1"}</strong>{": AWS のサービスとツールを使って、デプロイ済みのコードをテストする"}</p>{" "}</blockquote>
{" "}
<h3>{"7.1 テストの置き場所は 2 つ：手元 と クラウド"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 23">
<table>

<thead>

<tr>

<th scope="col">{"場所"}</th>

<th scope="col">{"方法"}</th>

<th scope="col">{"長所"}</th>

<th scope="col">{"短所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"手元（ローカル）"}</strong></td>

<td><code>{"sam local invoke"}</code>{"、"}<code>{"sam local start-api"}</code>{"（Docker 使用）"}</td>

<td>{"速い、無料、すぐ試せる"}</td>

<td>{"本物の IAM・ネットワーク・サービス連携とは差が出る"}</td>

</tr>

<tr>

<td><strong>{"クラウド（dev 環境）"}</strong></td>

<td>{"Lambda コンソールの "}<strong>{"テスト"}</strong>{"、"}<code>{"aws lambda invoke"}</code>{"、"}<code>{"sam sync"}</code></td>

<td><strong>{"本物の環境"}</strong>{" で検証できる"}</td>

<td>{"デプロイが必要、少額の課金"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d10" label="Step 7：デプロイ済みコードのテスト（Skill 3.2.1）の図解 d10" />
{" "}
<h3>{"7.2 デプロイ済み Lambda をテストする方法"}</h3>
{" "}
<p><strong>{"① Lambda コンソールの「テスト」タブ"}</strong>{" テストイベント（JSON）を保存して何度でも実行できます。結果・ログ・実行時間・使用メモリが画面に出ます。"}</p>
{" "}
<p><strong>{"② AWS CLI で呼び出す"}</strong></p>
{" "}
<CodeBlock index={8} language="bash" lines={["aws lambda invoke \\","  --function-name my-func \\","  --payload '{\"orderId\": \"A-001\"}' \\","  --cli-binary-format raw-in-base64-out \\","  --log-type Tail \\","  response.json"]} />
{" "}
<ul>
{" "}
<li>{"AWS CLI v2 では、JSON を直接渡すときに "}<code>{"--cli-binary-format raw-in-base64-out"}</code>{" が必要です（付けないと base64 を期待してエラーになる）。"}</li>
{" "}
<li><code>{"--log-type Tail"}</code>{" で、直近のログ末尾（base64）をレスポンスに含められます。"}</li>
{" "}
</ul>
{" "}
<p><strong>{"③ 呼び出しタイプ（Invocation type）"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 24">
<table>

<thead>

<tr>

<th scope="col">{"タイプ"}</th>

<th scope="col">{"動作"}</th>

<th scope="col">{"用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"RequestResponse"}</code>{"（既定）"}</td>

<td><strong>{"同期"}</strong>{"。結果を待つ"}</td>

<td>{"テスト、API 連携"}</td>

</tr>

<tr>

<td><code>{"Event"}</code></td>

<td><strong>{"非同期"}</strong>{"。すぐ 202 を返す"}</td>

<td>{"イベント処理のテスト"}</td>

</tr>

<tr>

<td><code>{"DryRun"}</code></td>

<td>{"権限・パラメータだけ確認し、"}<strong>{"実行しない"}</strong></td>

<td>{"権限チェック"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"7.3 確認に使うツール"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 25">
<table>

<thead>

<tr>

<th scope="col">{"ツール"}</th>

<th scope="col">{"何がわかるか"}</th>

<th scope="col">{"コマンド・場所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Amazon CloudWatch Logs"}</strong></td>

<td>{"出力ログ、エラーのスタックトレース"}</td>

<td><code>{"sam logs --name Func --tail"}</code></td>

</tr>

<tr>

<td><strong>{"CloudWatch Logs Insights"}</strong></td>

<td>{"ログのクエリ集計"}</td>

<td>{"コンソール"}</td>

</tr>

<tr>

<td><strong>{"AWS X-Ray"}</strong></td>

<td>{"リクエストの経路・各サービスの遅延"}</td>

<td>{"関数でアクティブトレースを有効化"}</td>

</tr>

<tr>

<td><strong>{"CloudWatch Metrics"}</strong></td>

<td>{"Invocations、Errors、Duration、Throttles"}</td>

<td>{"コンソール"}</td>

</tr>

<tr>

<td><strong>{"SAM Accelerate（"}<code>{"sam sync"}</code>{"）"}</strong></td>

<td>{"コード変更を "}<strong>{"素早く"}</strong>{" クラウドへ同期"}</td>

<td><code>{"sam sync --watch"}</code>{"（開発用）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"⚠️ "}<code>{"sam sync"}</code>{" は "}<strong>{"開発環境向け"}</strong>{"（CloudFormation を経由せず直接更新する場合がある）です。"}<strong>{"本番には使わず"}</strong>{"、"}<code>{"sam deploy"}</code>{" とパイプラインを使います。"}</p>{" "}</blockquote>
{" "}
<h3>{"7.4 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 26">
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

<td><strong>{"構造化ログ（JSON）"}</strong>{" を出力し、相関 ID を付ける"}</td>

<td>{"ログ検索・追跡が容易"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"X-Ray"}</strong>{" を有効化して外部呼び出しの遅延を可視化"}</td>

<td>{"ボトルネックの特定"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"テストは "}<strong>{"dev 専用環境"}</strong>{" で行い、本番データを使わない"}</td>

<td>{"事故防止"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"ローカル → クラウド"}</strong>{" の順で段階的に確認"}</td>

<td>{"速く、安く、早期に不具合発見"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"機密情報や個人情報を "}<strong>{"ログに出さない"}</strong></td>

<td>{"コンプライアンス"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"7.5 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 27">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ローカルで Lambda を Docker 上で試したい"}</td>

<td><code>{"sam local invoke"}</code></td>

</tr>

<tr>

<td>{"ローカルで API を起動して試したい"}</td>

<td><code>{"sam local start-api"}</code></td>

</tr>

<tr>

<td>{"デプロイ済み関数の実行ログを見る"}</td>

<td><strong>{"CloudWatch Logs"}</strong>{"（"}<code>{"sam logs"}</code>{"）"}</td>

</tr>

<tr>

<td>{"呼び出し経路と遅延を可視化"}</td>

<td><strong>{"AWS X-Ray"}</strong></td>

</tr>

<tr>

<td>{"権限だけ確認して実行はしたくない"}</td>

<td>{"呼び出しタイプ "}<strong>{"DryRun"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"5 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/testing-functions.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda 関数のテスト"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/testing-functions.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"SAM CLI コマンドリファレンス"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/serverless-sam-cli-command-reference.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-using-invoke.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"sam local invoke"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/serverless-sam-cli-using-invoke.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-sync.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"sam sync（SAM Accelerate）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-sync.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-invocation.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda の呼び出し"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/lambda-invocation.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
