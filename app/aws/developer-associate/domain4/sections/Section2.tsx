import { Diagram } from '../Diagram';
/** 原本step-1の全内容。 */
export function Section2() { return (<section className="section" id="step-1" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-bug" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 1 · Step 1 · 4.1.1"}</p>
<h2>{"コードをデバッグして不具合を特定する"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p>{"「動かない・間違った結果が出る」アプリを、"}<strong>{"再現 → 切り分け → 原因特定"}</strong>{" の順で調べる基本動作を学びます。クラウドでは「手元では動くのに AWS 上で動かない」が頻発するので、"}<strong>{"手元で AWS 環境を再現する道具"}</strong>{" と "}<strong>{"本番のエラーを読み解く道具"}</strong>{" の両方が出題されます。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"1-1. エラーの種類を見分ける(最重要)"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 8">
<table className="t4">

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"誰の責任か"}</th>

<th scope="col">{"見るべき場所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"コードのバグ(関数内の例外)"}</td>

<td>{"NullPointer、KeyError、型エラー"}</td>

<td>{"開発者"}</td>

<td>{"アプリケーションログのスタックトレース"}</td>

</tr>

<tr>

<td>{"設定ミス"}</td>

<td>{"ハンドラー名の間違い、環境変数の不足、タイムアウト設定が短い"}</td>

<td>{"開発者"}</td>

<td>{"関数設定、Lambda の Init エラー"}</td>

</tr>

<tr>

<td>{"権限不足"}</td>

<td>{"AccessDeniedException、403"}</td>

<td>{"IAM ポリシー / リソースポリシー"}</td>

<td>{"エラーメッセージの「どの API・どのリソースか」"}</td>

</tr>

<tr>

<td>{"上限超過"}</td>

<td>{"ThrottlingException、429、ProvisionedThroughputExceededException"}</td>

<td>{"クォータ・容量"}</td>

<td>{"メトリクス(Throttles など)"}</td>

</tr>

<tr>

<td>{"依存先の障害"}</td>

<td>{"タイムアウト、接続拒否、5xx"}</td>

<td>{"外部サービス"}</td>

<td>{"ログ、トレースのサブセグメント"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"1-2. HTTP ステータスコードの読み方"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 9">
<table className="t3">

<thead>

<tr>

<th scope="col">{"コード"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"典型的な原因"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"400"}</td>

<td>{"リクエストが不正"}</td>

<td>{"パラメーター不足、JSON の形式エラー、バリデーション失敗"}</td>

</tr>

<tr>

<td>{"401 / 403"}</td>

<td>{"認証・認可エラー"}</td>

<td>{"トークン期限切れ、IAM 権限不足、WAF やリソースポリシーによる拒否"}</td>

</tr>

<tr>

<td>{"404"}</td>

<td>{"リソースなし"}</td>

<td>{"パスやリソース名の誤り"}</td>

</tr>

<tr>

<td>{"429"}</td>

<td>{"呼び出しが多すぎる"}</td>

<td>{"スロットリング(同時実行・API のレート制限)"}</td>

</tr>

<tr>

<td>{"500"}</td>

<td>{"サーバー内部エラー"}</td>

<td>{"アプリケーションの未処理例外"}</td>

</tr>

<tr>

<td>{"502"}</td>

<td>{"不正なゲートウェイ"}</td>

<td>{"バックエンド(Lambda など)の "}<strong>{"応答形式が不正"}</strong>{"、ALB が不正な応答を受信"}</td>

</tr>

<tr>

<td>{"503"}</td>

<td>{"サービス利用不可"}</td>

<td>{"ALB が生成する 503: "}<strong>{"ターゲットグループが空、または登録済みターゲットがすべて unused(未使用)状態"}</strong></td>

</tr>

<tr>

<td>{"504"}</td>

<td>{"ゲートウェイタイムアウト"}</td>

<td>{"バックエンドの応答が "}<strong>{"時間内に返らない"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"1-3. 手元で再現する道具"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 10">
<table>

<thead>

<tr>

<th scope="col">{"道具"}</th>

<th scope="col">{"できること"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWS SAM CLI"}</strong>{" "}<code>{"sam local invoke"}</code></td>

<td>{"Lambda 関数を "}<strong>{"ローカルのコンテナで実行"}</strong>{"。イベント JSON を渡してテストできる"}</td>

</tr>

<tr>

<td><strong>{"AWS SAM CLI"}</strong>{" "}<code>{"sam local start-api"}</code></td>

<td>{"API Gateway と Lambda をローカルで起動して HTTP でテストできる"}</td>

</tr>

<tr>

<td><strong>{"AWS SAM CLI"}</strong>{" "}<code>{"sam sync --watch"}</code></td>

<td>{"コード変更を "}<strong>{"クラウド上の実環境へ素早く反映"}</strong>{" して確認できる"}</td>

</tr>

<tr>

<td><strong>{"AWS SAM CLI"}</strong>{" "}<code>{"sam logs"}</code></td>

<td>{"CloudWatch Logs の出力をコマンドラインで追う"}</td>

</tr>

<tr>

<td><strong>{"AWS CLI"}</strong>{" "}<code>{"--debug"}</code></td>

<td>{"CLI が送るリクエストとレスポンス、認証情報の解決過程を表示"}</td>

</tr>

<tr>

<td><strong>{"AWS CloudShell"}</strong></td>

<td>{"ブラウザ内の CLI 環境。認証済みで AWS CLI をすぐに試せる"}</td>

</tr>

<tr>

<td>{"コンソールの "}<strong>{"テストイベント"}</strong></td>

<td>{"Lambda に任意のイベントを手動で送って結果とログを確認"}</td>

</tr>

<tr>

<td><strong>{"SDK のログ出力"}</strong></td>

<td>{"SDK の HTTP リクエスト・リトライ回数を出して、呼び出しの実態を確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card">
<Diagram id="d03" label="図 4" />
</figure>
{" "}
<h4>{"1-4. Lambda 特有のよくあるエラー"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 11">
<table className="t3">

<thead>

<tr>

<th scope="col">{"症状"}</th>

<th scope="col">{"原因の例"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"Runtime.HandlerNotFound"}</code></td>

<td>{"ハンドラー名(ファイル名.関数名)の設定が実際のコードとずれている"}</td>

<td>{"関数設定のハンドラーを修正"}</td>

</tr>

<tr>

<td><code>{"Runtime.ImportModuleError"}</code></td>

<td>{"依存ライブラリがパッケージに含まれていない、アーキテクチャ不一致"}</td>

<td>{"依存関係を同梱、Lambda レイヤーを使う、arm64 / x86_64 を合わせる"}</td>

</tr>

<tr>

<td><code>{"Task timed out after N seconds"}</code></td>

<td>{"処理が設定したタイムアウトより長い、外部呼び出しが固まっている"}</td>

<td>{"タイムアウトを調整し、"}<strong>{"呼び出し先のタイムアウトは Lambda より短く"}</strong>{" する"}</td>

</tr>

<tr>

<td><code>{"Runtime exited with error: signal: killed"}</code>{" / メモリ不足"}</td>

<td>{"Max Memory Used が割り当てを超えた"}</td>

<td>{"メモリ割り当てを増やす、処理を見直す"}</td>

</tr>

<tr>

<td>{"関数が VPC 内でインターネットに出られない"}</td>

<td>{"NAT ゲートウェイや VPC エンドポイントがない"}</td>

<td>{"ネットワーク構成を確認(設計自体は試験の対象外だが、症状は出題される)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 12">
<table className="t3">

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"再現性"}</td>

<td>{"イベント JSON を "}<strong>{"ファイルとして保存"}</strong>{" し、"}<code>{"sam local invoke -e event.json"}</code>{" で繰り返し再現する"}</td>

<td>{"同じ入力で何度でも検証できる"}</td>

</tr>

<tr>

<td>{"例外処理"}</td>

<td>{"例外は握りつぶさず、"}<strong>{"原因が分かる情報(入力の ID、依存先名)をログに出して再スロー"}</strong>{" する"}</td>

<td>{"原因特定が速くなる"}</td>

</tr>

<tr>

<td>{"切り分け"}</td>

<td>{"「コード」「設定」「権限」「上限」「依存先」の 5 分類で考える"}</td>

<td>{"無駄な調査を減らせる"}</td>

</tr>

<tr>

<td>{"エラー表示"}</td>

<td>{"AWS のエラーメッセージ("}<code>{"User: ... is not authorized to perform: ..."}</code>{")を "}<strong>{"そのまま読む"}</strong></td>

<td>{"足りない権限・対象リソースが書いてある"}</td>

</tr>

<tr>

<td>{"テスト"}</td>

<td>{"ビジネスロジックと AWS SDK 呼び出しを分け、SDK 部分はモックして単体テストする"}</td>

<td>{"手元で高速に不具合を再現できる"}</td>

</tr>

<tr>

<td>{"AI 支援"}</td>

<td>{"Amazon Q Developer などで "}<strong>{"エラーメッセージの解説や修正案"}</strong>{" を得る(最終判断は人間が行う)"}</td>

<td>{"新興トピックとして出題範囲に含まれる("}<a href="#app-d">{"付録 D"}</a>{")"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 13">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「Lambda を手元でテストしたい」"}</td>

<td><strong>{"SAM CLI の "}<code>{"sam local invoke"}</code></strong>{" が定番の答え"}</td>

</tr>

<tr>

<td>{"「本番の Lambda が 502 を返す(API Gateway プロキシ統合)」"}</td>

<td>{"多くは "}<strong>{"Lambda の戻り値の形式"}</strong>{" が不正(statusCode / body が必要)"}</td>

</tr>

<tr>

<td>{"「403 が出る」"}</td>

<td>{"まず "}<strong>{"IAM ポリシー・リソースポリシー・認可方式"}</strong>{" のどれが拒否したかを確認"}</td>

</tr>

<tr>

<td>{"「タイムアウトする」"}</td>

<td>{"関数のタイムアウト値と、"}<strong>{"呼び出し元(API Gateway など)側のタイムアウト"}</strong>{" の両方を確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"Lambda のトラブルシューティング: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/lambda-troubleshooting.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/lambda-troubleshooting.html"}</a></li>
{" "}
<li>{"SAM でのテストとデバッグ: "}<a href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-test-and-debug.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-test-and-debug.html"}</a></li>
{" "}
<li>{"AWS CLI のデバッグ: "}<a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-help.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/cli/latest/userguide/cli-usage-help.html"}</a></li>
{" "}
</ul>
{" "}
</section>); }
