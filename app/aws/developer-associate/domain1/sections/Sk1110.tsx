import { Diagram } from '../Diagram';
/** Skill 1.1.10 ストリーミングデータを全量保持する。 */
export function Sk1110(){return (<section className="section" id="sk-1-1-10" tabIndex={-1}>
<h2>{"Skill 1.1.10 ストリーミングデータ"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: AWS サービスを使ってストリーミングデータを扱う"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"終わりなく流れ続けるデータ（ログ、クリックストリーム、IoT センサー値など）を、"}<strong>{"順序を保ちつつ"}</strong>{"取り込み・処理・配信するスキルです。中心は "}<strong>{"Amazon Kinesis"}</strong>{" です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"Kinesis ファミリーの役割"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 37">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"役割"}</th>

<th scope="col">{"コンシューマーのコード"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Kinesis Data Streams"}</strong></td>

<td>{"ストリームを"}<strong>{"保持"}</strong>{"し、複数のコンシューマーが読み取れる。順序・再読み取りが可能"}</td>

<td>{"自分で書く（Lambda、KCL など）"}</td>

</tr>

<tr>

<td><strong>{"Amazon Data Firehose"}</strong></td>

<td>{"ストリームを"}<strong>{"ほぼリアルタイムで宛先へ配信"}</strong>{"する（S3、Redshift、OpenSearch Service、HTTP エンドポイントなど）。バッファリングあり"}</td>

<td>{"不要（設定のみ。変換は Lambda で可能）"}</td>

</tr>

<tr>

<td>{"Managed Service for Apache Flink"}</td>

<td>{"ストリームに対する SQL / Flink による分析"}</td>

<td>{"—"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"Kinesis Data Streams の基本概念"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 38">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"シャード（Shard）"}</strong></td>

<td>{"ストリームの処理単位。"}<strong>{"シャード数で容量が決まる"}</strong></td>

</tr>

<tr>

<td><strong>{"レコード"}</strong></td>

<td>{"データ本体 + "}<strong>{"パーティションキー"}</strong>{" + シーケンス番号"}</td>

</tr>

<tr>

<td><strong>{"パーティションキー"}</strong></td>

<td>{"キーのハッシュ値で、レコードが入る"}<strong>{"シャードが決まる"}</strong>{"。"}<strong>{"同じキー = 同じシャード = 順序が保たれる"}</strong></td>

</tr>

<tr>

<td><strong>{"保持期間"}</strong></td>

<td>{"既定 24 時間（最大 365 日まで延長可能）"}</td>

</tr>

<tr>

<td><strong>{"キャパシティモード"}</strong></td>

<td><strong>{"オンデマンド"}</strong>{"（自動スケール）と"}<strong>{"プロビジョニング済み"}</strong>{"（シャード数を自分で指定）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"シャード 1 本あたりの目安は、"}<strong>{"書き込み: 1 MB/秒または 1,000 レコード/秒"}</strong>{"、"}<strong>{"読み取り: 2 MB/秒（共有）"}</strong>{"です。"}</p>
{" "}
<figure className="diagram-card"><Diagram id="d13" label="Skill 1.1.10 ストリーミングデータの図解 d13" /></figure>
{" "}
<h4>{"読み取り方式"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 39">
<table>

<thead>

<tr>

<th scope="col">{"方式"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"共有スループット"}</strong></td>

<td>{"シャードあたり 2 MB/秒を、"}<strong>{"すべてのコンシューマーで分け合う"}</strong></td>

</tr>

<tr>

<td><strong>{"拡張ファンアウト（Enhanced Fan-Out）"}</strong></td>

<td><strong>{"コンシューマーごとに専用で 2 MB/秒/シャード"}</strong>{"。プッシュ型（HTTP/2）で低レイテンシー。コンシューマーが複数あるときに使う"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"よくあるエラーと対処"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 40">
<table>

<thead>

<tr>

<th scope="col">{"エラー"}</th>

<th scope="col">{"原因"}</th>

<th scope="col">{"対処"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"ProvisionedThroughputExceededException"}</code></td>

<td>{"シャードの書き込み / 読み取り容量を超過。"}<strong>{"ホットシャード"}</strong>{"（特定のキーに偏る）が典型"}</td>

<td>{"パーティションキーを"}<strong>{"分散"}</strong>{"させる、シャードを増やす（分割）、"}<strong>{"指数バックオフで再試行"}</strong>{"、オンデマンドモード、拡張ファンアウト"}</td>

</tr>

<tr>

<td>{"一部のレコードだけ失敗"}</td>

<td><code>{"PutRecords"}</code>{" はバッチ内で"}<strong>{"部分的に失敗し得る"}</strong>{"（応答に "}<code>{"FailedRecordCount"}</code>{"）"}</td>

<td><strong>{"失敗したレコードだけ"}</strong>{"を再送する"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"Lambda で Kinesis を処理する"}</h4>
{" "}
<p>{"Lambda は"}<strong>{"イベントソースマッピング"}</strong>{"でシャードをポーリングします（詳細は Skill 1.2.7）。主な設定は次のとおりです。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 41">
<table>

<thead>

<tr>

<th scope="col">{"設定"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"バッチサイズ / バッチウィンドウ"}</td>

<td>{"一度に渡すレコード数 / 溜める最大時間"}</td>

</tr>

<tr>

<td>{"並列化係数（Parallelization Factor）"}</td>

<td><strong>{"1 シャードあたり最大 10 の並列実行"}</strong>{"（同じパーティションキーの順序は保たれる）"}</td>

</tr>

<tr>

<td>{"開始位置"}</td>

<td><code>{"LATEST"}</code>{" / "}<code>{"TRIM_HORIZON"}</code>{"（最古から）/ "}<code>{"AT_TIMESTAMP"}</code></td>

</tr>

<tr>

<td>{"エラー処理"}</td>

<td><code>{"BisectBatchOnFunctionError"}</code>{"、"}<code>{"MaximumRetryAttempts"}</code>{"、"}<code>{"MaximumRecordAgeInSeconds"}</code>{"、失敗時の送信先（Skill 1.2.3）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"Kinesis・SQS・Firehose の使い分け"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 42">
<table>

<thead>

<tr>

<th scope="col">{"要件"}</th>

<th scope="col">{"選ぶサービス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"順序"}</strong>{"が必要・"}<strong>{"同じデータを複数のコンシューマーが読む"}</strong>{"・"}<strong>{"再読み取り"}</strong>{"したい"}</td>

<td>{"Kinesis Data Streams"}</td>

</tr>

<tr>

<td>{"1 件ずつ処理して"}<strong>{"削除"}</strong>{"、ワーカーで"}<strong>{"分担"}</strong>{"、シンプルに非同期化したい"}</td>

<td>{"SQS"}</td>

</tr>

<tr>

<td>{"コードなしで S3 などに"}<strong>{"ほぼリアルタイムで配信"}</strong>{"したい"}</td>

<td>{"Amazon Data Firehose"}</td>

</tr>

<tr>

<td>{"Kafka との互換性が必要"}</td>

<td>{"Amazon MSK"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"パーティションキーは"}<strong>{"カーディナリティが高く、均等に分散"}</strong>{"するものを選ぶ（Skill 1.3.1 と同じ考え方）"}</li>
{" "}
<li>{"書き込みは "}<strong><code>{"PutRecords"}</code>{"（バッチ）"}</strong>{"を使い、"}<strong>{"失敗したレコードのみ"}</strong>{"再送する"}</li>
{" "}
<li>{"複数のコンシューマーには"}<strong>{"拡張ファンアウト"}</strong>{"を使う"}</li>
{" "}
<li>{"コンシューマーは"}<strong>{"冪等"}</strong>{"に作る（再読み取り・再試行で重複する可能性がある）"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「"}<code>{"ProvisionedThroughputExceededException"}</code>{" が出る」→ "}<strong>{"ホットシャード対策（キー分散）+ バックオフ + シャード増"}</strong></li>
{" "}
<li>{"「同じ順序で複数アプリが同じデータを読みたい」→ "}<strong>{"Kinesis Data Streams（+ 拡張ファンアウト）"}</strong></li>
{" "}
<li>{"「ストリームを S3 にコードなしで保存したい」→ "}<strong>{"Amazon Data Firehose"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
