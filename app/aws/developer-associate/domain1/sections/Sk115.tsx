import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.1.5 耐障害性とレジリエンスのあるコードを全量保持する。 */
export function Sk115(){return (<section className="section" id="sk-1-1-5" tabIndex={-1}>
<h2>{"Skill 1.1.5 耐障害性とレジリエンスのあるコード"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: プログラミング言語（Java、C#、Python、JavaScript、TypeScript、Go など）で、耐障害性とレジリエンスのあるアプリケーションを作る"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"分散システムでは「"}<strong>{"失敗はいつか必ず起きる"}</strong>{"」前提で、失敗しても全体が止まらない・壊れないコードを書くスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"失敗の種類を見分ける"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 13">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"一時的な失敗（transient）"}</td>

<td>{"スロットリング（429 / "}<code>{"ThrottlingException"}</code>{"）、タイムアウト、5xx、ネットワーク断"}</td>

<td><strong>{"再試行（リトライ）する"}</strong></td>

</tr>

<tr>

<td>{"恒久的な失敗"}</td>

<td>{"入力不正（400）、権限不足（403）、リソースが存在しない（404）"}</td>

<td>{"再試行しても無意味。"}<strong>{"エラーとして処理"}</strong>{"する"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"基本の 5 つの武器"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 14">
<table>

<thead>

<tr>

<th scope="col">{"武器"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"補足"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"指数バックオフ"}</td>

<td>{"再試行の間隔を 1 秒 → 2 秒 → 4 秒… と倍々に広げる"}</td>

<td>{"相手の回復を待つ"}</td>

</tr>

<tr>

<td>{"ジッター（揺らぎ）"}</td>

<td>{"待ち時間にランダム性を足す"}</td>

<td>{"多数のクライアントが"}<strong>{"同時に"}</strong>{"再試行する「雷鳴の群れ（thundering herd）」を防ぐ"}</td>

</tr>

<tr>

<td>{"タイムアウト"}</td>

<td>{"接続・読み取りに上限時間を設ける"}</td>

<td>{"無限に待たない"}</td>

</tr>

<tr>

<td>{"冪等性"}</td>

<td>{"同じ操作を何回実行しても結果が同じ"}</td>

<td>{"再試行・重複配信による二重処理を防ぐ"}</td>

</tr>

<tr>

<td>{"DLQ（デッドレターキュー）"}</td>

<td>{"何度やっても失敗するメッセージの退避先"}</td>

<td>{"原因調査と再処理に使う"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d07" label="Skill 1.1.5 耐障害性とレジリエンスのあるコードの図解 d07" /></figure>
{" "}
<h4>{"AWS SDK の再試行機能"}</h4>
{" "}
<p>{"AWS SDK には再試行ロジックが"}<strong>{"標準で組み込まれています"}</strong>{"。自分で書く前に、まず設定で調整できないかを考えます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 15">
<table>

<thead>

<tr>

<th scope="col">{"再試行モード"}</th>

<th scope="col">{"概要"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"legacy"}</code></td>

<td>{"SDK ごとの従来の動作"}</td>

</tr>

<tr>

<td><code>{"standard"}</code></td>

<td>{"標準。指数バックオフ + ジッター。多くの SDK でこれが推奨"}</td>

</tr>

<tr>

<td><code>{"adaptive"}</code></td>

<td>{"standard に加え、スロットリングを検知してクライアント側で送信レートを自動調整（試験的な位置づけの SDK もある）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"Python（boto3）での設定例です。"}</p>
{" "}
<CodeBlock index={0} language="python" lines={["pythonimport boto3","from botocore.config import Config","","config = Config(","    retries={\"max_attempts\": 5, \"mode\": \"standard\"},  # 最大試行回数とモード","    connect_timeout=3,   # 接続のタイムアウト（秒）","    read_timeout=10,     # 読み取りのタイムアウト（秒）",")","dynamodb = boto3.client(\"dynamodb\", config=config)"]} />
{" "}
<h4>{"冪等性を作る 3 つの方法"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 16">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"仕組み"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"DynamoDB の条件付き書き込み"}</td>

<td><code>{"ConditionExpression: attribute_not_exists(request_id)"}</code>{" で「初回のみ書ける」ようにする"}</td>

</tr>

<tr>

<td>{"冪等性キー（Idempotency Key）"}</td>

<td>{"リクエストごとに一意なキーを付け、処理済みかをデータストアで確認"}</td>

</tr>

<tr>

<td>{"SQS FIFO の重複排除"}</td>

<td><code>{"MessageDeduplicationId"}</code>{" で 5 分間の重複送信を排除"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"Lambda では、AWS が提供する "}<strong>{"Powertools for AWS Lambda の Idempotency ユーティリティ"}</strong>{"で、冪等性を簡単に実装できます。"}</p>
{" "}
<h4>{"その他の耐障害性テクニック"}</h4>
{" "}
<ul>
{" "}
<li><strong>{"グレースフルデグラデーション（縮退運転）"}</strong>{": 一部の機能が使えなくても、残りの機能で動き続ける（例: レコメンドが取れなければ人気順を表示）"}</li>
{" "}
<li><strong>{"ヘルスチェック"}</strong>{": ロードバランサーやターゲットグループで、異常なインスタンスを切り離す"}</li>
{" "}
<li><strong>{"ステートレス化"}</strong>{": Skill 1.1.2 のとおり。台が落ちても別の台が引き継げる"}</li>
{" "}
<li><strong>{"Multi-AZ / リージョンの分散"}</strong>{": インフラ側の冗長化（試験では「コードの側でできること」が中心）"}</li>
{" "}
</ul>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"再試行は"}<strong>{"一時的な失敗のみ"}</strong>{"に行い、"}<strong>{"指数バックオフ + ジッター + 最大回数"}</strong>{"を必ず付ける"}</li>
{" "}
<li>{"再試行される前提で、すべての書き込み処理を"}<strong>{"冪等"}</strong>{"にする"}</li>
{" "}
<li>{"「すべての外部呼び出しにタイムアウトを設定する」を習慣にする"}</li>
{" "}
<li>{"失敗したメッセージは捨てず、"}<strong>{"DLQ に送ってアラームを設定"}</strong>{"する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「スロットリングエラーが頻発する」→ "}<strong>{"指数バックオフ + ジッター"}</strong>{"、あるいは SDK の再試行設定"}</li>
{" "}
<li>{"「リトライで二重課金が起きた」→ "}<strong>{"冪等性キー / 条件付き書き込み"}</strong></li>
{" "}
<li>{"「再試行しても決して成功しないメッセージで処理が詰まる」→ "}<strong>{"DLQ"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
