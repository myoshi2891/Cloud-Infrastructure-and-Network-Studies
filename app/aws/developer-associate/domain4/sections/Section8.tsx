import { Diagram } from '../Diagram';
/** 原本step-7の全内容。 */
export function Section8() { return (<section className="section" id="step-7" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-plug-connected" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 1 · Step 7 · 4.1.7"}</p>
<h2>{"サービス間連携の問題をデバッグする"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p>{"現代のアプリは "}<strong>{"API Gateway → Lambda → SQS → Lambda → DynamoDB"}</strong>{" のように、サービスをつないで作ります。部品単体は正しくても、"}<strong>{"つなぎ目(権限・形式・タイムアウト・再試行)"}</strong>{" で問題が起きます。つなぎ目別の症状と原因を学びます。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"7-1. つなぎ目のよくある問題 5 分類"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 39">
<table className="t3">

<thead>

<tr>

<th scope="col">{"分類"}</th>

<th scope="col">{"症状の例"}</th>

<th scope="col">{"確認すること"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"権限"}</td>

<td><code>{"AccessDenied"}</code>{"、呼び出されない"}</td>

<td>{"呼び出す側の "}<strong>{"IAM ロール"}</strong>{" と、呼び出される側の "}<strong>{"リソースベースポリシー"}</strong>{"(Lambda の "}<code>{"add-permission"}</code>{" など)"}</td>

</tr>

<tr>

<td>{"データ形式"}</td>

<td>{"502、パースエラー、"}<code>{"null"}</code></td>

<td>{"イベントの JSON 構造、Lambda の戻り値の形式、Content-Type"}</td>

</tr>

<tr>

<td>{"タイムアウトの不整合"}</td>

<td>{"504、処理の二重実行"}</td>

<td>{"各サービスのタイムアウトの "}<strong>{"大小関係"}</strong></td>

</tr>

<tr>

<td>{"スロットリング"}</td>

<td>{"429、"}<code>{"ThrottlingException"}</code></td>

<td>{"クォータ、同時実行数、"}<strong>{"再試行(指数バックオフ + ジッター)"}</strong></td>

</tr>

<tr>

<td>{"再試行・重複"}</td>

<td>{"同じ処理が複数回実行される"}</td>

<td><strong>{"冪等性"}</strong>{"、再試行の回数、DLQ の有無"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card">
<Diagram id="d12" label="図 13" />
</figure>
{" "}
<h4>{"7-2. サービス別のデバッグポイント"}</h4>
{" "}
<p><strong>{"API Gateway + Lambda"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 40">
<table className="t3">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"原因"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"502 Bad Gateway"}</td>

<td>{"Lambda の戻り値が "}<strong>{"プロキシ統合の形式"}</strong>{"("}<code>{"statusCode"}</code>{"、"}<code>{"headers"}</code>{"、"}<code>{"body"}</code>{"(文字列))でない。または Lambda が例外で終了"}</td>

<td>{"戻り値の形式を修正。"}<strong>{"実行ログを有効化"}</strong>{" して確認"}</td>

</tr>

<tr>

<td>{"504 Gateway Timeout"}</td>

<td>{"統合のタイムアウトを超えた(REST API の既定は 29 秒)"}</td>

<td>{"処理を短くする、"}<strong>{"非同期化"}</strong>{"(SQS や Step Functions)する"}</td>

</tr>

<tr>

<td>{"429 Too Many Requests"}</td>

<td>{"API のスロットリング上限"}</td>

<td><strong>{"使用量プランとスロットリング設定"}</strong>{" を見直す、クライアントで再試行"}</td>

</tr>

<tr>

<td>{"403 Forbidden"}</td>

<td>{"認可(IAM / Cognito / Lambda オーソライザー)、"}<strong>{"WAF"}</strong>{"、リソースポリシーによる拒否"}</td>

<td>{"どの認可方式が拒否したか "}<strong>{"アクセスログ・実行ログ"}</strong>{" で確認"}</td>

</tr>

<tr>

<td>{"実際の遅延が分からない"}</td>

<td><code>{"Latency"}</code>{"(全体)と "}<code>{"IntegrationLatency"}</code>{"(バックエンドのみ)の差を見る"}</td>

<td>{"差が大きいなら API Gateway 側の処理、小さいならバックエンドが遅い"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"API Gateway は "}<strong>{"アクセスログ"}</strong>{"(誰が・いつ・どのステータスで)と "}<strong>{"実行ログ"}</strong>{"(内部処理の詳細)を CloudWatch Logs に出せます。X-Ray トレースもステージ設定で有効化できます。"}</p>
{" "}
<p><strong>{"SQS + Lambda(イベントソースマッピング)"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 41">
<table className="t3">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"原因"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"同じメッセージが何度も処理される"}</td>

<td>{"関数が失敗してメッセージが "}<strong>{"キューに戻る"}</strong>{"、または "}<strong>{"可視性タイムアウトが短い"}</strong></td>

<td>{"可視性タイムアウトを "}<strong>{"関数のタイムアウトより長く"}</strong>{"(AWS は 6 倍以上を推奨)する"}</td>

</tr>

<tr>

<td>{"1 件の失敗でバッチ全体が再処理される"}</td>

<td>{"バッチ内の失敗が全体の失敗として扱われる"}</td>

<td><strong><code>{"ReportBatchItemFailures"}</code>{"(バッチ項目の失敗の報告)"}</strong>{" で失敗したメッセージだけを戻す"}</td>

</tr>

<tr>

<td>{"失敗が延々と続く(ポイズンメッセージ)"}</td>

<td>{"処理できないメッセージが無限に再配信される"}</td>

<td><strong>{"DLQ + "}<code>{"maxReceiveCount"}</code></strong>{" を設定する"}</td>

</tr>

<tr>

<td>{"スロットルが出る"}</td>

<td>{"Lambda の同時実行数が不足"}</td>

<td>{"予約済み同時実行数、"}<strong>{"イベントソースの最大同時実行数"}</strong>{" を調整"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"Lambda の非同期呼び出し(S3 / SNS / EventBridge → Lambda)"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 42">
<table>

<thead>

<tr>

<th scope="col">{"ポイント"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"再試行"}</td>

<td>{"失敗時に既定で "}<strong>{"最大 2 回"}</strong>{" 再試行(0〜2 で設定可能)。イベントの最大保持時間も設定できる(最長 6 時間)"}</td>

</tr>

<tr>

<td>{"失敗の受け皿"}</td>

<td><strong>{"DLQ(SQS / SNS)"}</strong>{" または "}<strong>{"失敗時の送信先(Destinations)"}</strong>{"。Destinations は成功・失敗の両方、および失敗の詳細情報を送れる"}</td>

</tr>

<tr>

<td>{"重複"}</td>

<td>{"少なくとも 1 回(at-least-once)なので、"}<strong>{"冪等性"}</strong>{" が必要"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"Kinesis / DynamoDB Streams + Lambda"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 43">
<table className="t3">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"原因"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"IteratorAge"}</code>{" が増え続ける"}</td>

<td>{"処理が追いつかない、"}<strong>{"1 つの不良レコードでシャードが止まっている"}</strong></td>

<td><strong><code>{"BisectBatchOnFunctionError"}</code></strong>{"、最大再試行回数、最大レコード経過時間、"}<strong>{"失敗時の送信先"}</strong>{" を設定。並列化係数を上げる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"EventBridge"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 44">
<table className="t3">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"原因"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ターゲットが呼ばれない"}</td>

<td>{"ルールのイベントパターンが一致しない、ターゲットへの権限不足"}</td>

<td>{"イベントパターンを確認、"}<code>{"FailedInvocations"}</code>{" メトリクスを見る"}</td>

</tr>

<tr>

<td>{"配信失敗を拾いたい"}</td>

<td>{"再試行を使い切った"}</td>

<td><strong>{"ターゲットの DLQ(SQS)"}</strong>{" を設定(既定の再試行は最大 24 時間・最大 185 回)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"Step Functions"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 45">
<table>

<thead>

<tr>

<th scope="col">{"ポイント"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"調査"}</td>

<td><strong>{"実行履歴(Execution history)"}</strong>{" の各ステートの入出力とエラーを見る。CloudWatch Logs への実行ログ出力(ALL / ERROR / FATAL)や X-Ray トレースも有効化できる"}</td>

</tr>

<tr>

<td>{"回復"}</td>

<td><code>{"Retry"}</code>{"(再試行)と "}<code>{"Catch"}</code>{"(例外の捕捉と代替処理)をステート定義に書く"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"DynamoDB"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 46">
<table className="t3">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"原因"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"ProvisionedThroughputExceededException"}</code></td>

<td>{"読み書き容量の不足、"}<strong>{"ホットパーティション"}</strong>{"(特定キーへのアクセス集中)"}</td>

<td>{"容量の見直し、オンデマンド化、キー設計の見直し、"}<strong>{"SDK の指数バックオフ"}</strong>{"、Contributor Insights で偏りを確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"7-3. 再試行の基本: 指数バックオフ + ジッター"}</h4>
{" "}
<p>{"失敗したらすぐ再試行すると、障害中のサービスにさらに負荷をかけます。"}<strong>{"待ち時間を指数的に増やし(バックオフ)、ランダムなずれ(ジッター)を加える"}</strong>{" のが定石です。AWS SDK は多くの API で "}<strong>{"標準で再試行とバックオフを実装"}</strong>{" しています。"}</p>
{" "}
<figure className="diagram-card">
<Diagram id="d13" label="図 14" />
</figure>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 47">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"ベストプラクティス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"冪等性"}</td>

<td>{"少なくとも 1 回配信を前提に、"}<strong>{"冪等キー"}</strong>{"(注文 ID など)で重複処理を防ぐ"}</td>

</tr>

<tr>

<td>{"DLQ"}</td>

<td>{"非同期・キュー・ストリームの連携には "}<strong>{"DLQ または失敗時の送信先を必ず設定"}</strong>{" する"}</td>

</tr>

<tr>

<td>{"再試行"}</td>

<td><strong>{"指数バックオフ + ジッター"}</strong>{"。再試行回数には上限を設ける"}</td>

</tr>

<tr>

<td>{"タイムアウト"}</td>

<td>{"下流のタイムアウト < 上流のタイムアウト の順に設定し、"}<strong>{"階層的に整合"}</strong>{" させる"}</td>

</tr>

<tr>

<td>{"権限"}</td>

<td>{"「呼ぶ側のロール」と「呼ばれる側のリソースポリシー」の "}<strong>{"両方"}</strong>{" を確認する"}</td>

</tr>

<tr>

<td>{"可観測性"}</td>

<td>{"連携の全経路で "}<strong>{"トレース(X-Ray)を有効化"}</strong>{" し、リクエスト ID をログに残す"}</td>

</tr>

<tr>

<td>{"部分失敗"}</td>

<td>{"バッチ処理は "}<strong>{"部分的なバッチ失敗の報告"}</strong>{" を使う"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 48">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「API Gateway が 502。Lambda ログでは成功している」"}</td>

<td><strong>{"戻り値の形式"}</strong>{"(プロキシ統合の要件)を疑う"}</td>

</tr>

<tr>

<td>{"「SQS のメッセージが二重処理される」"}</td>

<td><strong>{"可視性タイムアウト"}</strong>{" が関数のタイムアウトより短い、または冪等性がない"}</td>

</tr>

<tr>

<td>{"「バッチの 1 件だけ失敗。残りは再処理したくない」"}</td>

<td><strong><code>{"ReportBatchItemFailures"}</code></strong></td>

</tr>

<tr>

<td>{"「SNS から Lambda への通知が来ない」"}</td>

<td>{"Lambda の "}<strong>{"リソースベースポリシー"}</strong>{"(SNS からの呼び出し許可)"}</td>

</tr>

<tr>

<td>{"「Kinesis の処理が止まった」"}</td>

<td>{"不良レコードによる再試行ループ。"}<strong>{"BisectBatchOnFunctionError / 失敗時の送信先"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"Lambda の非同期呼び出し(再試行・DLQ・Destinations): "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html"}</a></li>
{" "}
<li>{"Lambda と SQS: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/with-sqs.html"}</a></li>
{" "}
<li>{"SQS のエラー処理(バッチ項目の失敗の報告): "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-errorhandling.html"}</a></li>
{" "}
<li>{"Lambda と Kinesis: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/with-kinesis.html"}</a></li>
{" "}
<li>{"API Gateway と CloudWatch の監視: "}<a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/monitoring-cloudwatch.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/monitoring-cloudwatch.html"}</a></li>
{" "}
<li>{"EventBridge の DLQ: "}<a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html"}</a></li>
{" "}
<li>{"EventBridge の再試行ポリシー: "}<a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-retry-policy.html"}</a></li>
{" "}
<li>{"Step Functions のエラー処理: "}<a href="https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/step-functions/latest/dg/concepts-error-handling.html"}</a></li>
{" "}
<li>{"DynamoDB のエラー処理: "}<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Programming.Errors.html"}</a></li>
{" "}
<li>{"タイムアウト・再試行・ジッター付きバックオフ(Amazon Builders' Library): "}<a href="https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/" target="_blank" rel="noopener">{"https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/"}</a></li>
{" "}
</ul>
{" "}
</section>); }
