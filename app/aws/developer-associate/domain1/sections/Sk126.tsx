import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.2.6 Lambda のパフォーマンスチューニングを全量保持する。 */
export function Sk126(){return (<section className="section" id="sk-1-2-6" tabIndex={-1}>
<h2>{"Skill 1.2.6 Lambda のパフォーマンスチューニング"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: 最適なパフォーマンスのために Lambda 関数をチューニングする"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"Lambda は"}<strong>{"メモリ量・初期化・パッケージ・接続の使い回し"}</strong>{"で速度と費用が大きく変わります。"}<strong>{"計測してから調整"}</strong>{"するのが基本です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"料金の考え方"}</h4>
{" "}
<p>{"Lambda の料金は、"}<strong>{"リクエスト数"}</strong>{"と"}<strong>{"実行時間（ミリ秒）× 割り当てメモリ"}</strong>{"で決まります。メモリを増やすと単価は上がりますが、"}<strong>{"CPU も増えて実行時間が短くなる"}</strong>{"ため、総額が"}<strong>{"下がることもあります"}</strong>{"。"}</p>
{" "}
<h4>{"チューニングの 5 つの柱"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 69">
<table>

<thead>

<tr>

<th scope="col">{"柱"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"メモリ / CPU の最適化"}</strong></td>

<td>{"最適な値を"}<strong>{"実測"}</strong>{"で探す"}</td>

<td><strong>{"AWS Lambda Power Tuning"}</strong>{"（Step Functions ベースのツール）、"}<strong>{"AWS Compute Optimizer"}</strong>{" の推奨"}</td>

</tr>

<tr>

<td><strong>{"コールドスタートの低減"}</strong></td>

<td>{"初期化を軽くする"}</td>

<td>{"パッケージを小さく・不要な依存を除く、"}<strong>{"SDK クライアントや接続をハンドラー外で初期化"}</strong>{"、"}<strong>{"SnapStart"}</strong>{"、"}<strong>{"プロビジョニング済み同時実行"}</strong>{"、必要に応じて "}<strong>{"arm64"}</strong></td>

</tr>

<tr>

<td><strong>{"初期化コードと実行コードの分離"}</strong></td>

<td>{"毎回やる必要のない処理を"}<strong>{"Init フェーズ"}</strong>{"に置く"}</td>

<td>{"ハンドラーの"}<strong>{"外"}</strong>{"でクライアント生成・設定取得・モデルのロード"}</td>

</tr>

<tr>

<td><strong>{"接続・外部呼び出しの最適化"}</strong></td>

<td>{"接続を使い回し、待ち時間を減らす"}</td>

<td><strong>{"HTTP キープアライブ"}</strong>{"、"}<strong>{"RDS Proxy"}</strong>{"、並列呼び出し、タイムアウト設定"}</td>

</tr>

<tr>

<td><strong>{"パッケージの最適化"}</strong></td>

<td>{"小さく保つ"}</td>

<td>{"不要なライブラリの除去、"}<strong>{"レイヤー"}</strong>{"、ツリーシェイキング・バンドル（Node.js の esbuild など）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d22" label="Skill 1.2.6 Lambda のパフォーマンスチューニングの図解 d22" /></figure>
{" "}
<h4>{"ハンドラーの外 / 中の書き分け（Python の例）"}</h4>
{" "}
<CodeBlock index={13} language="python" lines={["pythonimport os, boto3","","# Init フェーズ（ハンドラーの外）: ウォームスタートで再利用される","dynamodb = boto3.resource(\"dynamodb\")","table = dynamodb.Table(os.environ[\"TABLE_NAME\"])","CACHE = {}   # 「あれば得」なキャッシュとして使う（永続状態にしない）","","def handler(event, context):","    # Invoke フェーズ: 毎回実行される。ここには必要最小限の処理だけ","    key = event[\"id\"]","    if key not in CACHE:","        CACHE[key] = table.get_item(Key={\"id\": key}).get(\"Item\")","    return CACHE[key]"]} />
{" "}
<h4>{"イベントソースマッピングのチューニング（SQS / Kinesis / DynamoDB Streams）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 70">
<table>

<thead>

<tr>

<th scope="col">{"設定"}</th>

<th scope="col">{"効果"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"バッチサイズ"}</strong></td>

<td>{"1 回の呼び出しで処理する件数。大きいほどスループットが上がり、呼び出し回数と費用が減る（SQS Standard は最大 10,000 件、バッチウィンドウが必要）"}</td>

</tr>

<tr>

<td><strong>{"バッチウィンドウ"}</strong></td>

<td>{"バッチを溜める最大時間（最大 300 秒）"}</td>

</tr>

<tr>

<td><strong>{"最大同時実行数（SQS）"}</strong></td>

<td>{"SQS ソースから起動される Lambda の同時実行数の"}<strong>{"上限"}</strong>{"（最小 2）。"}<strong>{"下流を守る"}</strong></td>

</tr>

<tr>

<td><strong>{"並列化係数（Kinesis / DynamoDB Streams）"}</strong></td>

<td>{"1 シャードあたり最大 10 並列"}</td>

</tr>

<tr>

<td><strong>{"イベントフィルタリング"}</strong></td>

<td>{"条件に合うイベントだけ関数を起動し、"}<strong>{"無駄な呼び出しと費用を削減"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"まず計測する"}</strong>{"（CloudWatch Logs Insights、X-Ray、Lambda Insights）。推測で調整しない"}</li>
{" "}
<li><strong>{"メモリは実測で決める"}</strong>{"（Power Tuning）"}</li>
{" "}
<li><strong>{"クライアントや接続はハンドラーの外"}</strong>{"で初期化し、再利用する"}</li>
{" "}
<li><strong>{"パッケージは小さく"}</strong>{"、不要な依存を排除する"}</li>
{" "}
<li>{"バッチ処理は"}<strong>{"バッチサイズ・ウィンドウ"}</strong>{"で効率化し、"}<strong>{"イベントフィルタリング"}</strong>{"で不要な起動を減らす"}</li>
{" "}
<li>{"下流が弱いときは、"}<strong>{"SQS の最大同時実行数 / 予約済み同時実行"}</strong>{"で制御する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「CPU 負荷の高い関数を速くしたい」→ "}<strong>{"メモリを増やす"}</strong>{"（CPU が比例して増える）"}</li>
{" "}
<li>{"「初回の呼び出しだけ遅い」→ "}<strong>{"コールドスタート対策（SnapStart / プロビジョニング済み同時実行 / 初期化の見直し）"}</strong></li>
{" "}
<li>{"「呼び出しごとに DB 接続を作って遅い」→ "}<strong>{"ハンドラーの外で接続を初期化 / RDS Proxy"}</strong></li>
{" "}
<li>{"「関数の最適なメモリ値を知りたい」→ "}<strong>{"Lambda Power Tuning / Compute Optimizer"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
