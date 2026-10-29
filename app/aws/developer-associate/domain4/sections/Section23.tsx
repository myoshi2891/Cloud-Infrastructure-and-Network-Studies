import { Diagram } from '../Diagram';
/** 原本step-22の全内容。 */
export function Section23() { return (<section className="section" id="step-22" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-adjustments" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 3 · Step 22 · 4.3.7"}</p>
<h2>{"アプリケーションのリソース使用量を最適化する"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p><strong>{"CPU・メモリ・ネットワーク・API 呼び出し・DB 接続・課金"}</strong>{" といったリソースを、"}<strong>{"無駄なく使う"}</strong>{" コーディングと設定の勘所をまとめて学びます。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"22-1. Lambda のコード最適化"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 132">
<table className="t3">

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"やること"}</th>

<th scope="col">{"効果"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"初期化のコードはハンドラーの外"}</strong></td>

<td>{"SDK クライアント、DB 接続、設定の読み込みは "}<strong>{"ハンドラーの外で 1 回だけ"}</strong></td>

<td>{"実行環境の再利用で "}<strong>{"2 回目以降の呼び出しが速い"}</strong></td>

</tr>

<tr>

<td><strong>{"接続の再利用"}</strong></td>

<td>{"HTTP / DB の接続を "}<strong>{"使い回す"}</strong>{"(Keep-Alive)"}</td>

<td>{"接続確立のコスト削減"}</td>

</tr>

<tr>

<td><strong>{"パッケージの縮小"}</strong></td>

<td>{"不要な依存関係を外す、必要な SDK モジュールだけを import"}</td>

<td><strong>{"コールドスタートの短縮"}</strong></td>

</tr>

<tr>

<td><strong>{"共通ライブラリはレイヤー"}</strong></td>

<td>{"複数関数で共有する依存関係をレイヤーに"}</td>

<td>{"管理の効率化"}</td>

</tr>

<tr>

<td><strong>{"環境変数で設定"}</strong></td>

<td>{"設定値を "}<strong>{"コードに埋め込まず"}</strong>{" 環境変数 / AppConfig へ"}</td>

<td>{"再デプロイ不要で調整"}</td>

</tr>

<tr>

<td><strong>{"/tmp の活用"}</strong></td>

<td>{"再利用可能な一時データを "}<code>{"/tmp"}</code>{" に(ただし関数間で共有されない)"}</td>

<td>{"再ダウンロードの削減"}</td>

</tr>

<tr>

<td><strong>{"再帰呼び出しの回避"}</strong></td>

<td>{"Lambda が自分自身を呼ぶ設計は "}<strong>{"無限ループ・課金の暴走"}</strong>{" の原因(再帰ループ検出機能もある)"}</td>

<td>{"コスト事故の防止"}</td>

</tr>

<tr>

<td><strong>{"タイムアウトを適切に"}</strong></td>

<td>{"長すぎる設定は "}<strong>{"問題があるときに課金が膨らむ"}</strong>{"。短すぎれば失敗"}</td>

<td>{"実測にもとづく設定"}</td>

</tr>

<tr>

<td><strong>{"arm64(Graviton)"}</strong></td>

<td>{"対応ライブラリなら arm64 を選ぶ"}</td>

<td>{"価格性能比の向上"}</td>

</tr>

<tr>

<td><strong>{"SnapStart"}</strong></td>

<td>{"Java・Python・.NET の起動を大幅に短縮"}</td>

<td>{"コールドスタート対策"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"22-2. データベース接続の最適化"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 133">
<table>

<thead>

<tr>

<th scope="col">{"問題"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Lambda から RDS / Aurora へ接続すると、同時実行数の分だけ接続が増えて枯渇"}</strong></td>

<td><strong>{"Amazon RDS Proxy"}</strong>{"(接続をプールして再利用、フェイルオーバーも高速化)"}</td>

</tr>

<tr>

<td>{"接続が切れる / 遅い"}</td>

<td>{"接続の "}<strong>{"再利用"}</strong>{"、ハンドラー外で接続を保持"}</td>

</tr>

<tr>

<td>{"読み取り負荷"}</td>

<td><strong>{"リードレプリカ"}</strong>{" へ振り分け、頻出クエリは "}<strong>{"キャッシュ"}</strong>{"(Step 21)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"22-3. DynamoDB の最適化"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 134">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Scan を避け、Query を使う"}</strong></td>

<td>{"Scan は "}<strong>{"テーブル全体を読む"}</strong>{" ため、容量を大量に消費する。パーティションキーを指定する Query を使う"}</td>

</tr>

<tr>

<td><strong>{"必要な属性だけを取得"}</strong></td>

<td><code>{"ProjectionExpression"}</code>{" で取得する項目を絞り、転送量を削減(消費する読み取り容量はアイテム全体のサイズで計算されるため減らない)"}</td>

</tr>

<tr>

<td><strong>{"ページネーション"}</strong></td>

<td>{"結果が 1 MB を超えると分割される。"}<code>{"LastEvaluatedKey"}</code>{" で続きを取得"}</td>

</tr>

<tr>

<td><strong>{"バッチ操作"}</strong></td>

<td><code>{"BatchGetItem"}</code>{" / "}<code>{"BatchWriteItem"}</code>{" で往復回数を減らす("}<strong>{"一部失敗(UnprocessedItems)の再試行が必要"}</strong>{")"}</td>

</tr>

<tr>

<td><strong>{"ホットパーティションの回避"}</strong></td>

<td>{"パーティションキーを "}<strong>{"値の種類が多く均等にアクセスされるもの"}</strong>{" にする"}</td>

</tr>

<tr>

<td><strong>{"容量モード"}</strong></td>

<td>{"予測できる負荷はプロビジョンド + Auto Scaling、予測できない負荷はオンデマンド"}</td>

</tr>

<tr>

<td><strong>{"結果整合性の読み取り"}</strong></td>

<td>{"強い整合性が不要なら、"}<strong>{"結果整合性の読み取り"}</strong>{"(消費する読み取り容量が半分)"}</td>

</tr>

<tr>

<td><strong>{"GSI の活用"}</strong></td>

<td>{"主キー以外のアクセスパターンは "}<strong>{"GSI"}</strong>{" で効率化"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"22-4. メッセージング・ストレージ・ネットワーク"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 135">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"最適化"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"SQS"}</strong></td>

<td><strong>{"ロングポーリング"}</strong>{"("}<code>{"WaitTimeSeconds"}</code>{" 最大 20 秒)で空の受信と課金を削減。"}<strong>{"バッチ"}</strong>{"での送受信(1 回で最大 10 件)で API 呼び出しを削減"}</td>

</tr>

<tr>

<td><strong>{"Lambda + SQS / Kinesis"}</strong></td>

<td><strong>{"バッチサイズとバッチウィンドウ"}</strong>{" を調整して、呼び出し回数を削減"}</td>

</tr>

<tr>

<td><strong>{"SNS"}</strong></td>

<td><strong>{"フィルターポリシー"}</strong>{" で不要な配信を削減(Step 19)"}</td>

</tr>

<tr>

<td><strong>{"S3"}</strong></td>

<td>{"大きなファイルは "}<strong>{"マルチパートアップロード"}</strong>{"、並列ダウンロード、"}<strong>{"範囲指定の取得"}</strong>{"。署名付き URL でクライアントが直接転送(Lambda を経由しない)"}</td>

</tr>

<tr>

<td><strong>{"API の呼び出し"}</strong></td>

<td><strong>{"ペイロードを圧縮"}</strong>{"、"}<strong>{"必要な項目だけ"}</strong>{" 返す、"}<strong>{"リクエストの集約(バッチ化)"}</strong></td>

</tr>

<tr>

<td><strong>{"非同期化"}</strong></td>

<td>{"時間のかかる処理は "}<strong>{"非同期"}</strong>{"(SQS・EventBridge・Step Functions)にして、API の応答を速く保つ"}</td>

</tr>

<tr>

<td><strong>{"Step Functions"}</strong></td>

<td><strong>{"短時間・大量"}</strong>{" の処理は Express ワークフロー、"}<strong>{"長時間・監査が必要"}</strong>{" なら Standard(課金モデルが異なる)"}</td>

</tr>

<tr>

<td><strong>{"リトライ"}</strong></td>

<td>{"指数バックオフ + ジッターで、スロットリング時の無駄な呼び出しを減らす"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"22-5. コスト面の最適化"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 136">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"無駄な呼び出しをなくす"}</strong></td>

<td>{"フィルタリング、キャッシュ、バッチ処理、不要なポーリングの停止"}</td>

</tr>

<tr>

<td><strong>{"ログの量を適正化"}</strong></td>

<td>{"ログレベル・保持期間(Step 9)"}</td>

</tr>

<tr>

<td><strong>{"使われていないリソースの削除"}</strong></td>

<td>{"古い Lambda バージョン、不要なプロビジョニング済み同時実行数、アイドルのキャッシュノード"}</td>

</tr>

<tr>

<td><strong>{"コストの把握"}</strong></td>

<td><strong>{"Cost Explorer / Budgets"}</strong>{"、"}<strong>{"タグ付け"}</strong>{" でアプリ単位のコストを見える化"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card">
<Diagram id="d31" label="図 32" />
</figure>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 137">
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

<td>{"初期化"}</td>

<td>{"SDK クライアントや接続は "}<strong>{"ハンドラーの外"}</strong>{" で生成"}</td>

<td>{"実行環境の再利用"}</td>

</tr>

<tr>

<td>{"DB 接続"}</td>

<td>{"Lambda → RDS は "}<strong>{"RDS Proxy"}</strong></td>

<td>{"接続数の枯渇防止"}</td>

</tr>

<tr>

<td>{"DynamoDB"}</td>

<td><strong>{"Query + 必要な属性だけ"}</strong>{"。Scan は避ける"}</td>

<td>{"容量とレイテンシの削減"}</td>

</tr>

<tr>

<td>{"ポーリング"}</td>

<td>{"SQS は "}<strong>{"ロングポーリング + バッチ"}</strong></td>

<td>{"空振りと課金の削減"}</td>

</tr>

<tr>

<td>{"呼び出しの削減"}</td>

<td><strong>{"キャッシュ、バッチ、フィルタリング"}</strong></td>

<td>{"総リソース量の削減"}</td>

</tr>

<tr>

<td>{"非同期化"}</td>

<td>{"重い処理は "}<strong>{"非同期"}</strong>{" で切り離す"}</td>

<td>{"応答時間とスケーラビリティ"}</td>

</tr>

<tr>

<td>{"依存の最小化"}</td>

<td>{"不要なライブラリを削る"}</td>

<td>{"コールドスタート短縮"}</td>

</tr>

<tr>

<td>{"継続的見直し"}</td>

<td>{"使用状況メトリクスと "}<strong>{"Compute Optimizer"}</strong>{" で定期的に見直す"}</td>

<td>{"無駄の発見"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 138">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「Lambda の呼び出しごとに DB 接続が作られ、RDS の接続数が上限に達する」"}</td>

<td><strong>{"RDS Proxy"}</strong>{" + 接続をハンドラー外で再利用"}</td>

</tr>

<tr>

<td>{"「DynamoDB の読み取りコストを減らしたい(特定の属性だけ必要)」"}</td>

<td>{"Scan → Query への変更(消費容量を削減)。"}<strong><code>{"ProjectionExpression"}</code></strong>{" は転送量を減らすが、消費容量は減らない"}</td>

</tr>

<tr>

<td>{"「SQS の空のレスポンスで API コストが増える」"}</td>

<td><strong>{"ロングポーリング"}</strong></td>

</tr>

<tr>

<td>{"「Lambda のコールドスタートを短くしたい(コード側の対策)」"}</td>

<td><strong>{"パッケージを小さく"}</strong>{"、不要な import を減らす、初期化を最適化"}</td>

</tr>

<tr>

<td>{"「Lambda が自分自身を呼び出して課金が暴走」"}</td>

<td>{"再帰呼び出しの回避。予約済み同時実行数を 0 にして緊急停止"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"Lambda のベストプラクティス: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"}</a></li>
{" "}
<li>{"RDS Proxy: "}<a href="https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html"}</a></li>
{" "}
<li>{"DynamoDB のベストプラクティス: "}<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/best-practices.html"}</a></li>
{" "}
<li>{"SQS のベストプラクティス: "}<a href="https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-best-practices.html"}</a></li>
{" "}
<li>{"Lambda のコールドスタート最適化(Serverless Lens): "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html"}</a></li>
{" "}
</ul>
{" "}
</section>); }
