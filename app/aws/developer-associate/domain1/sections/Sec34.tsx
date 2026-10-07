
/** よく出る「ひっかけ」パターン集を全量保持する。 */
export function Sec34(){return (<section className="section" id="sec-34" tabIndex={-1}>
<h2>{"よく出る「ひっかけ」パターン集"}</h2>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 112">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ひっかけ"}</th>

<th scope="col">{"正しい理解"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"Lambda はずっと動かせる"}</td>

<td><strong>{"最大 15 分"}</strong>{"。それ以上は Step Functions / ECS / Batch"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"同期呼び出しの Lambda も自動で再試行される"}</td>

<td>{"自動再試行は"}<strong>{"非同期"}</strong>{"。同期は"}<strong>{"呼び出し元が再試行"}</strong></td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"SQS の DLQ は Lambda の設定"}</td>

<td>{"SQS ソースでは"}<strong>{"キュー側の設定"}</strong>{"（"}<code>{"maxReceiveCount"}</code>{"）"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"予約済み同時実行でコールドスタートが減る"}</td>

<td>{"減らすのは"}<strong>{"プロビジョニング済み同時実行 / SnapStart"}</strong>{"。予約済みは"}<strong>{"上限 + 確保"}</strong></td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"FilterExpression で RCU が減る"}</td>

<td><strong>{"減らない"}</strong>{"（読み取り量で課金）"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"GSI でも強い整合性の読み取りができる"}</td>

<td><strong>{"できない"}</strong>{"（LSI は可能）"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"LSI は後から追加できる"}</td>

<td><strong>{"テーブル作成時のみ"}</strong></td>

</tr>

<tr>

<td>{"8"}</td>

<td>{"DAX は強い整合性の読み取りも高速化する"}</td>

<td>{"強い整合性は "}<strong>{"DAX を素通り"}</strong>{"する"}</td>

</tr>

<tr>

<td>{"9"}</td>

<td>{"VPC の Lambda をパブリックサブネットに置けばインターネットに出られる"}</td>

<td><strong>{"出られない"}</strong>{"。"}<strong>{"NAT ゲートウェイ"}</strong>{"が必要（S3 / DynamoDB は VPC エンドポイント）"}</td>

</tr>

<tr>

<td>{"10"}</td>

<td>{"SQS Standard は順序と 1 回配信を保証する"}</td>

<td><strong>{"ベストエフォートの順序 + 少なくとも 1 回"}</strong>{"。保証が必要なら "}<strong>{"FIFO"}</strong></td>

</tr>

<tr>

<td>{"11"}</td>

<td>{"Kinesis のシャード数に関係なく容量は同じ"}</td>

<td><strong>{"シャードが容量の単位"}</strong>{"（書き込み 1 MB/秒・1,000 件/秒）"}</td>

</tr>

<tr>

<td>{"12"}</td>

<td>{"Python の "}<code>{"float"}</code>{" をそのまま DynamoDB に保存できる"}</td>

<td><strong><code>{"Decimal"}</code></strong>{" を使う"}</td>

</tr>

<tr>

<td>{"13"}</td>

<td>{"S3 → Lambda の起動権限は実行ロールで付与"}</td>

<td><strong>{"リソースベースポリシー"}</strong>{"（呼び出される側）で許可"}</td>

</tr>

<tr>

<td>{"14"}</td>

<td>{"Multi-AZ でリードレプリカのように読み取りを分散できる"}</td>

<td>{"Multi-AZ は"}<strong>{"可用性"}</strong>{"。読み取りの分散は"}<strong>{"リードレプリカ"}</strong></td>

</tr>

<tr>

<td>{"15"}</td>

<td>{"REST API でも HTTP API でも同じ機能が使える"}</td>

<td>{"検証・マッピングテンプレート・キャッシュ・使用量プランは "}<strong>{"REST API"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
</section>);}
