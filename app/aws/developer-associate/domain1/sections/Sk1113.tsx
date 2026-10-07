import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.1.13 サードパーティ連携のレジリエンスを全量保持する。 */
export function Sk1113(){return (<section className="section" id="sk-1-1-13" tabIndex={-1}>
<h2>{"Skill 1.1.13 サードパーティ連携のレジリエンス"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: サードパーティのサービスとの統合に対して、レジリエンスのあるアプリケーションコードを実装する（例: リトライロジック、サーキットブレーカー、エラー処理パターン）"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"自分たちが制御できない外部 API"}</strong>{"（決済・メール・SaaS など）が遅い・落ちる・制限をかけてくる前提で、自分のアプリを守るコードを書くスキルです。Skill 1.1.5 の応用編です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"代表的なパターン"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 49">
<table>

<thead>

<tr>

<th scope="col">{"パターン"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"防げる問題"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"リトライ + 指数バックオフ + ジッター"}</strong></td>

<td>{"一時的な失敗のみ、間隔を広げながら再試行"}</td>

<td>{"一時的な障害、スロットリング"}</td>

</tr>

<tr>

<td><strong>{"タイムアウト"}</strong></td>

<td>{"接続・応答に上限を設ける"}</td>

<td>{"外部が応答せず、自分のスレッド / Lambda が固まる"}</td>

</tr>

<tr>

<td><strong>{"サーキットブレーカー"}</strong></td>

<td>{"失敗が続いたら一定時間"}<strong>{"呼び出し自体を止める"}</strong></td>

<td>{"落ちている相手に呼び続けて"}<strong>{"自分のリソースを消耗"}</strong>{"する、障害の連鎖"}</td>

</tr>

<tr>

<td><strong>{"フォールバック"}</strong></td>

<td>{"代替の結果（キャッシュ、既定値、別ベンダー）を返す"}</td>

<td>{"外部障害時のユーザー体験の悪化"}</td>

</tr>

<tr>

<td><strong>{"バルクヘッド（隔離）"}</strong></td>

<td>{"呼び出し元ごとにリソースを分け、1 つの遅延が全体を巻き込まないようにする"}</td>

<td>{"1 つの依存先の遅延による全体の停止"}</td>

</tr>

<tr>

<td><strong>{"冪等性キー"}</strong></td>

<td>{"再送しても二重実行されない"}</td>

<td>{"リトライによる二重課金"}</td>

</tr>

<tr>

<td><strong>{"レート制限の尊重"}</strong></td>

<td><code>{"429"}</code>{" と "}<strong><code>{"Retry-After"}</code></strong>{" ヘッダーに従う"}</td>

<td>{"相手からのブロック"}</td>

</tr>

<tr>

<td><strong>{"DLQ / 非同期化"}</strong></td>

<td>{"失敗した要求を退避して後で再処理"}</td>

<td>{"データ欠損"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"サーキットブレーカーの 3 つの状態"}</h4>
{" "}
<figure className="diagram-card"><Diagram id="d16" label="Skill 1.1.13 サードパーティ連携のレジリエンスの図解 d16" /></figure>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 50">
<table>

<thead>

<tr>

<th scope="col">{"状態"}</th>

<th scope="col">{"動作"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Closed（閉）"}</strong></td>

<td>{"通常どおり呼び出す。失敗回数を数える"}</td>

</tr>

<tr>

<td><strong>{"Open（開）"}</strong></td>

<td>{"呼び出さず"}<strong>{"すぐにエラー / フォールバック"}</strong>{"を返す（相手を休ませる）"}</td>

</tr>

<tr>

<td><strong>{"Half-Open（半開）"}</strong></td>

<td>{"少数の試験的な呼び出しで回復を確認する。成功なら Closed、失敗なら Open"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"Lambda は実行環境が使い捨てになり得るため、サーキットブレーカーの"}<strong>{"状態は外部"}</strong>{"（DynamoDB や ElastiCache など）で共有する設計が必要になる場合があります。"}</p>{" "}</blockquote>
{" "}
<h4>{"AWS サービスで実現する"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 51">
<table>

<thead>

<tr>

<th scope="col">{"やりたいこと"}</th>

<th scope="col">{"方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ステップごとの再試行・フォールバック"}</td>

<td><strong>{"Step Functions の "}<code>{"Retry"}</code>{"（"}<code>{"IntervalSeconds"}</code>{" / "}<code>{"MaxAttempts"}</code>{" / "}<code>{"BackoffRate"}</code>{" / "}<code>{"JitterStrategy"}</code>{"）と "}<code>{"Catch"}</code></strong></td>

</tr>

<tr>

<td>{"外部 API 呼び出しのレート制御"}</td>

<td><strong>{"EventBridge API destinations"}</strong>{"（呼び出し頻度の上限、失敗時の再試行、DLQ）"}</td>

</tr>

<tr>

<td>{"外部呼び出しを非同期化して保護"}</td>

<td><strong>{"SQS で受けて"}</strong>{"、Lambda の同時実行数（最大同時実行数）で呼び出し量を絞る"}</td>

</tr>

<tr>

<td>{"資格情報の管理"}</td>

<td><strong>{"AWS Secrets Manager"}</strong>{"（外部 API キーをコードや環境変数に直書きしない）"}</td>

</tr>

<tr>

<td>{"失敗の可視化"}</td>

<td><strong>{"CloudWatch の指標 / アラーム"}</strong>{"、"}<strong>{"構造化ログ"}</strong>{"、X-Ray でのトレース"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"Step Functions での再試行の定義例です。"}</p>
{" "}
<CodeBlock index={11} language="json" lines={["json\"CallPaymentApi\": {","  \"Type\": \"Task\",","  \"Resource\": \"arn:aws:states:::lambda:invoke\",","  \"Retry\": [{","    \"ErrorEquals\": [\"States.TaskFailed\", \"Lambda.ServiceException\"],","    \"IntervalSeconds\": 2,","    \"MaxAttempts\": 4,","    \"BackoffRate\": 2.0,","    \"JitterStrategy\": \"FULL\"","  }],","  \"Catch\": [{","    \"ErrorEquals\": [\"States.ALL\"],","    \"Next\": \"NotifyAndCompensate\"","  }],","  \"End\": true","}"]} />
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"すべての外部呼び出しにタイムアウト"}</strong>{"を設定する（Lambda のタイムアウトより短くする）"}</li>
{" "}
<li><strong>{"再試行は一時的なエラーに限定"}</strong>{"し、上限と指数バックオフ + ジッターを付ける"}</li>
{" "}
<li>{"外部が長く不調な場合は"}<strong>{"サーキットブレーカー"}</strong>{"で自分を守り、"}<strong>{"フォールバック"}</strong>{"を用意する"}</li>
{" "}
<li>{"書き込み系の外部 API には"}<strong>{"冪等性キー"}</strong>{"を付ける"}</li>
{" "}
<li>{"外部の API キーは "}<strong>{"Secrets Manager"}</strong>{" で管理し、ローテーションを検討する"}</li>
{" "}
<li>{"外部とのやり取りは"}<strong>{"ログ・指標・アラーム"}</strong>{"で観測できるようにする"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「外部 API が落ちている間、自分のシステムまで遅くなる」→ "}<strong>{"サーキットブレーカー + タイムアウト + フォールバック"}</strong></li>
{" "}
<li>{"「外部の SaaS に呼び出し頻度の上限がある」→ "}<strong>{"SQS + 同時実行数の制限 / EventBridge API destinations"}</strong></li>
{" "}
<li>{"「ワークフローの特定のステップだけ再試行したい」→ "}<strong>{"Step Functions の "}<code>{"Retry"}</code>{" / "}<code>{"Catch"}</code></strong></li>
{" "}
</ul>
{" "}
</section>);}
