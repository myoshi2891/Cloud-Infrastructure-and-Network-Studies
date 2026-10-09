import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.1.12 Amazon EventBridgeを全量保持する。 */
export function Sk1112(){return (<section className="section" id="sk-1-1-12" tabIndex={-1}>
<h2>{"Skill 1.1.12 Amazon EventBridge"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: Amazon EventBridge を使ってイベント駆動パターンを実装する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"イベントを受け取り、ルールで振り分け、ターゲットへ届ける"}</strong>{"サーバーレスのイベントバスです。疎結合なイベント駆動アーキテクチャの中心になります。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"基本の仕組み"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 45">
<table>

<thead>

<tr>

<th scope="col">{"要素"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"イベントバス"}</strong></td>

<td>{"イベントの受け皿。"}<strong>{"デフォルトバス"}</strong>{"（AWS サービスのイベントが流れる）、"}<strong>{"カスタムバス"}</strong>{"（自分のアプリ用）、"}<strong>{"パートナーバス"}</strong>{"（SaaS 連携）"}</td>

</tr>

<tr>

<td><strong>{"イベント"}</strong></td>

<td>{"JSON 形式。"}<code>{"source"}</code>{"、"}<code>{"detail-type"}</code>{"、"}<code>{"detail"}</code>{" などを持つ"}</td>

</tr>

<tr>

<td><strong>{"ルール"}</strong></td>

<td><strong>{"イベントパターン"}</strong>{"に合致したイベントを"}<strong>{"ターゲット"}</strong>{"へ送る（または"}<strong>{"スケジュール"}</strong>{"で起動）"}</td>

</tr>

<tr>

<td><strong>{"ターゲット"}</strong></td>

<td>{"Lambda、SQS、SNS、Step Functions、Kinesis、API 送信先（HTTP）など。"}<strong>{"1 つのルールに複数のターゲット"}</strong>{"を設定可能"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d15" label="Skill 1.1.12 Amazon EventBridgeの図解 d15" /></figure>
{" "}
<p>{"イベントの構造（例）です。"}</p>
{" "}
<CodeBlock index={8} language="json" lines={["json{","  \"version\": \"0\",","  \"id\": \"abc-123\",","  \"detail-type\": \"OrderPlaced\",","  \"source\": \"com.example.orders\",","  \"account\": \"123456789012\",","  \"time\": \"2026-10-04T01:00:00Z\",","  \"region\": \"ap-northeast-1\",","  \"detail\": { \"orderId\": \"A001\", \"amount\": 5000, \"status\": \"NEW\" }","}"]} />
{" "}
<p>{"自分のアプリからイベントを発行する SDK の例です。"}</p>
{" "}
<CodeBlock index={9} language="python" lines={["pythonevents = boto3.client(\"events\")","events.put_events(Entries=[{","    \"EventBusName\": \"orders-bus\",","    \"Source\": \"com.example.orders\",","    \"DetailType\": \"OrderPlaced\",","    \"Detail\": json.dumps({\"orderId\": \"A001\", \"amount\": 5000}),","}])"]} />
{" "}
<h4>{"イベントパターン（フィルタリング）"}</h4>
{" "}
<p>{"ルールの"}<strong>{"イベントパターン"}</strong>{"で、必要なイベントだけを選びます。"}</p>
{" "}
<CodeBlock index={10} language="json" lines={["json{","  \"source\": [\"com.example.orders\"],","  \"detail-type\": [\"OrderPlaced\"],","  \"detail\": {","    \"amount\": [{ \"numeric\": [\">=\", 1000] }],","    \"status\": [{ \"anything-but\": \"CANCELLED\" }]","  }","}"]} />
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 46">
<table>

<thead>

<tr>

<th scope="col">{"比較の種類"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"完全一致"}</td>

<td><code>{"\"status\": [\"NEW\"]"}</code></td>

</tr>

<tr>

<td>{"プレフィックス / サフィックス"}</td>

<td><code>{"{ \"prefix\": \"order-\" }"}</code></td>

</tr>

<tr>

<td>{"数値"}</td>

<td><code>{"{ \"numeric\": [\">\", 100] }"}</code></td>

</tr>

<tr>

<td>{"存在チェック"}</td>

<td><code>{"{ \"exists\": true }"}</code></td>

</tr>

<tr>

<td>{"除外"}</td>

<td><code>{"{ \"anything-but\": [...] }"}</code></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"主な機能"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 47">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"EventBridge Scheduler"}</strong></td>

<td><strong>{"cron / rate / 1 回限り"}</strong>{"のスケジュール実行。タイムゾーン指定や、時間のばらつき（フレキシブルタイムウィンドウ）に対応。大量のスケジュールにも向く（現在、スケジュール実行の推奨手段）"}</td>

</tr>

<tr>

<td><strong>{"EventBridge Pipes"}</strong></td>

<td><strong>{"ソース → フィルター → エンリッチメント → ターゲット"}</strong>{"を、コードなしでつなぐ（ソース例: SQS、Kinesis、DynamoDB Streams）"}</td>

</tr>

<tr>

<td><strong>{"入力トランスフォーマー"}</strong></td>

<td>{"ターゲットに渡す前にイベントの形を変換"}</td>

</tr>

<tr>

<td><strong>{"アーカイブとリプレイ"}</strong></td>

<td>{"イベントを保存して、あとから"}<strong>{"再生"}</strong>{"（障害復旧、テスト）"}</td>

</tr>

<tr>

<td><strong>{"スキーマレジストリ"}</strong></td>

<td>{"イベントのスキーマを検出・管理し、コードバインディングを生成"}</td>

</tr>

<tr>

<td><strong>{"API 送信先（API destinations）"}</strong></td>

<td>{"外部の HTTP API（SaaS など）をターゲットにする。認証情報は接続で管理し、"}<strong>{"レート制限"}</strong>{"も設定できる"}</td>

</tr>

<tr>

<td><strong>{"クロスアカウント / クロスリージョン"}</strong></td>

<td>{"別アカウント・別リージョンのバスにイベントを転送"}</td>

</tr>

<tr>

<td><strong>{"DLQ と再試行ポリシー"}</strong></td>

<td>{"ターゲットへの配信に失敗したイベントを "}<strong>{"SQS の DLQ"}</strong>{" に退避。再試行は既定で"}<strong>{"最大 24 時間 / 185 回"}</strong>{"まで試みる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"EventBridge・SNS・SQS の使い分け"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 48">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"EventBridge"}</th>

<th scope="col">{"SNS"}</th>

<th scope="col">{"SQS"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"主な役割"}</td>

<td><strong>{"ルールで振り分け"}</strong>{"るイベントバス"}</td>

<td>{"シンプルな"}<strong>{"Pub/Sub 配信"}</strong></td>

<td><strong>{"バッファ"}</strong>{"付きキュー"}</td>

</tr>

<tr>

<td>{"ルーティング"}</td>

<td>{"本文（"}<code>{"detail"}</code>{"）の内容まで細かく"}</td>

<td>{"メッセージ属性中心のフィルター"}</td>

<td>{"なし（キューに入るだけ）"}</td>

</tr>

<tr>

<td>{"スループット"}</td>

<td>{"高い"}</td>

<td><strong>{"非常に高い"}</strong></td>

<td>{"非常に高い"}</td>

</tr>

<tr>

<td>{"外部 SaaS 連携"}</td>

<td><strong>{"パートナーイベントソース / API 送信先"}</strong></td>

<td>{"限定的"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td>{"保持・再処理"}</td>

<td>{"アーカイブ / リプレイ"}</td>

<td>{"なし"}</td>

<td>{"保持期間と DLQ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"イベントのスキーマ"}</strong>{"（"}<code>{"source"}</code>{" / "}<code>{"detail-type"}</code>{" / "}<code>{"detail"}</code>{"）を設計・管理し、"}<strong>{"後方互換"}</strong>{"で進化させる"}</li>
{" "}
<li>{"すべてのターゲットに "}<strong>{"DLQ と再試行ポリシー"}</strong>{"を設定する"}</li>
{" "}
<li>{"ターゲットは"}<strong>{"冪等"}</strong>{"に作る（配信は少なくとも 1 回）"}</li>
{" "}
<li>{"スケジュール実行は "}<strong>{"EventBridge Scheduler"}</strong>{" を使う"}</li>
{" "}
<li>{"順序や"}<strong>{"バッファ"}</strong>{"が必要な処理は、EventBridge → "}<strong>{"SQS"}</strong>{" → Lambda の構成にする"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「S3 / EC2 などの AWS 側のイベントで処理を起動したい」→ "}<strong>{"EventBridge のルール"}</strong></li>
{" "}
<li>{"「毎日 9 時に Lambda を実行」→ "}<strong>{"EventBridge Scheduler（または cron のルール）"}</strong></li>
{" "}
<li>{"「コードなしで SQS → 絞り込み → Step Functions とつなぎたい」→ "}<strong>{"EventBridge Pipes"}</strong></li>
{" "}
<li>{"「過去のイベントをもう一度流したい」→ "}<strong>{"アーカイブとリプレイ"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
