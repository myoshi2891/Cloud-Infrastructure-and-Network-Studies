import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.3.7 データライフサイクルの管理を全量保持する。 */
export function Sk137(){return (<section className="section" id="sk-1-3-7" tabIndex={-1}>
<h2>{"Skill 1.3.7 データライフサイクルの管理"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: データのライフサイクルを管理する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"データは"}<strong>{"作られてから、使われなくなり、消えるまで"}</strong>{"の流れがあります。"}<strong>{"古くなったデータを自動で安く保管・削除"}</strong>{"して、費用とリスクを減らすスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"DynamoDB: TTL"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 98">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"仕組み"}</td>

<td><strong>{"TTL 属性"}</strong>{"（Unix エポック秒の"}<strong>{"数値"}</strong>{"）に指定した時刻を過ぎたアイテムを"}<strong>{"自動削除"}</strong></td>

</tr>

<tr>

<td>{"削除のタイミング"}</td>

<td><strong>{"期限直後ではなく、通常は数日以内（48 時間以内が目安）"}</strong>{"にバックグラウンドで削除される"}</td>

</tr>

<tr>

<td>{"費用"}</td>

<td>{"TTL による削除は"}<strong>{"書き込み容量を消費しない"}</strong>{"（無料）"}</td>

</tr>

<tr>

<td>{"注意点"}</td>

<td>{"期限切れでも"}<strong>{"削除されるまでは読み取りで返る"}</strong>{"ため、"}<strong>{"アプリ側で期限をフィルター"}</strong>{"する。削除は "}<strong>{"Streams に記録"}</strong>{"される（サービスによる削除として識別可能）"}</td>

</tr>

<tr>

<td>{"用途"}</td>

<td>{"セッション、一時トークン、ログ、キャッシュ、一定期間後に不要になるデータ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<CodeBlock index={17} language="python" lines={["pythonimport time","expire_at = int(time.time()) + 3600 * 24 * 7       # 7 日後（Unix エポック秒・整数）","table.put_item(Item={\"sessionId\": \"s-001\", \"userId\": \"u-1\", \"expireAt\": expire_at})","# テーブルの TTL 属性として \"expireAt\" を指定しておく"]} />
{" "}
<h4>{"Amazon S3: ライフサイクル"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 99">
<table>

<thead>

<tr>

<th scope="col">{"ストレージクラス"}</th>

<th scope="col">{"特徴"}</th>

<th scope="col">{"向く用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"S3 Standard"}</strong></td>

<td>{"頻繁なアクセス"}</td>

<td>{"アクティブなデータ"}</td>

</tr>

<tr>

<td><strong>{"S3 Intelligent-Tiering"}</strong></td>

<td>{"アクセスパターンに応じて"}<strong>{"自動で階層を移動"}</strong></td>

<td>{"アクセス頻度が不明・変動する"}</td>

</tr>

<tr>

<td><strong>{"S3 Standard-IA"}</strong></td>

<td>{"低頻度アクセス・複数 AZ。取り出し料金あり"}</td>

<td>{"月に 1 回程度の参照"}</td>

</tr>

<tr>

<td><strong>{"S3 One Zone-IA"}</strong></td>

<td>{"低頻度・"}<strong>{"単一 AZ"}</strong>{"（AZ の障害で失われ得る）"}</td>

<td>{"再作成可能なデータ"}</td>

</tr>

<tr>

<td><strong>{"S3 Glacier Instant Retrieval"}</strong></td>

<td>{"アーカイブ・ミリ秒で取得"}</td>

<td>{"四半期に 1 回程度の参照"}</td>

</tr>

<tr>

<td><strong>{"S3 Glacier Flexible Retrieval"}</strong></td>

<td>{"アーカイブ・分〜時間で取得"}</td>

<td>{"年に 1〜2 回の参照"}</td>

</tr>

<tr>

<td><strong>{"S3 Glacier Deep Archive"}</strong></td>

<td><strong>{"最安"}</strong>{"・数時間以上で取得"}</td>

<td>{"長期保管（法規制対応）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d29" label="Skill 1.3.7 データライフサイクルの管理の図解 d29" /></figure>
{" "}
<p>{"S3 ライフサイクルルールで、"}<strong>{"移行（Transition）"}</strong>{"と"}<strong>{"有効期限（Expiration：削除）"}</strong>{"を設定します。"}<strong>{"バージョニング"}</strong>{"を使っている場合は、"}<strong>{"非現行バージョン"}</strong>{"（古い版）の移行・削除、"}<strong>{"不完全なマルチパートアップロードの削除"}</strong>{"も設定できます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 100">
<table>

<thead>

<tr>

<th scope="col">{"注意"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Standard-IA / One Zone-IA への移行"}</td>

<td><strong>{"オブジェクトは作成から 30 日以上"}</strong>{"経過している必要がある"}</td>

</tr>

<tr>

<td>{"最小保管期間"}</td>

<td>{"各 IA / Glacier クラスに"}<strong>{"最小課金期間"}</strong>{"がある（早期に削除しても課金される）"}</td>

</tr>

<tr>

<td>{"小さなオブジェクト"}</td>

<td>{"IA 系は"}<strong>{"最小課金サイズ（128 KB）"}</strong>{"があるため、小さいオブジェクトの移行は不利"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"その他のサービス"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 101">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"ライフサイクル管理"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Amazon SQS"}</strong></td>

<td>{"メッセージ保持期間（既定 4 日、最大 14 日）で自動削除"}</td>

</tr>

<tr>

<td><strong>{"CloudWatch Logs"}</strong></td>

<td>{"ロググループの"}<strong>{"保持期間"}</strong>{"を設定（既定は無期限 → 設定しないと増え続ける）"}</td>

</tr>

<tr>

<td><strong>{"Kinesis Data Streams"}</strong></td>

<td>{"保持期間（24 時間〜365 日）"}</td>

</tr>

<tr>

<td><strong>{"DynamoDB Streams"}</strong></td>

<td>{"24 時間"}</td>

</tr>

<tr>

<td><strong>{"ElastiCache"}</strong></td>

<td>{"キーごとの "}<strong>{"TTL（有効期限）"}</strong>{" / 削除ポリシー（evict）"}</td>

</tr>

<tr>

<td><strong>{"AWS Backup"}</strong></td>

<td>{"バックアップの保持・コールドストレージへの移行をポリシーで管理"}</td>

</tr>

<tr>

<td><strong>{"RDS / Aurora"}</strong></td>

<td>{"自動バックアップの保持期間（1〜35 日）、スナップショットの手動管理"}</td>

</tr>

<tr>

<td><strong>{"ECR"}</strong></td>

<td>{"イメージの"}<strong>{"ライフサイクルポリシー"}</strong>{"で古いイメージを削除"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"データごとに"}<strong>{"保持期間と、必要なアクセス頻度"}</strong>{"を決め、"}<strong>{"自動化"}</strong>{"する（手作業の削除に頼らない）"}</li>
{" "}
<li>{"DynamoDB のセッション・一時データには "}<strong>{"TTL"}</strong>{" を設定する"}</li>
{" "}
<li>{"S3 は"}<strong>{"アクセス頻度が不明なら Intelligent-Tiering"}</strong>{"、"}<strong>{"予測できるなら"}</strong>{"ライフサイクルルールで"}<strong>{"階段状に移行"}</strong>{"する"}</li>
{" "}
<li><strong>{"ログの保持期間を設定"}</strong>{"して、無制限に増えないようにする"}</li>
{" "}
<li>{"法規制のある長期保管は "}<strong>{"Glacier Deep Archive"}</strong>{" と "}<strong>{"S3 Object Lock"}</strong>{" を検討する"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「期限切れのセッションデータを、コストをかけずに自動削除したい」→ "}<strong>{"DynamoDB TTL"}</strong></li>
{" "}
<li>{"「S3 のデータを、時間が経つほど安いクラスへ自動で移したい」→ "}<strong>{"ライフサイクルルール"}</strong></li>
{" "}
<li>{"「アクセスパターンが予測できない」→ "}<strong>{"S3 Intelligent-Tiering"}</strong></li>
{" "}
<li>{"「DynamoDB の TTL 属性の形式」→ "}<strong>{"Unix エポック秒の数値"}</strong></li>
{" "}
<li>{"「TTL の期限が来たのにまだデータが読める」→ "}<strong>{"削除は遅延する。アプリ側で期限をフィルター"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
