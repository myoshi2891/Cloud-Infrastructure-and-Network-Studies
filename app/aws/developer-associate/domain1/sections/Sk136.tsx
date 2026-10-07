import { Diagram } from '../Diagram';
/** Skill 1.3.6 データストアの利用・管理・保守を全量保持する。 */
export function Sk136(){return (<section className="section" id="sk-1-3-6" tabIndex={-1}>
<h2>{"Skill 1.3.6 データストアの利用・管理・保守"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: データストアを使用、管理、保守する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"アプリの"}<strong>{"用途に合ったデータストアを選び"}</strong>{"、バックアップ・スケーリング・接続管理など"}<strong>{"運用面"}</strong>{"まで押さえるスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"データストアの選び方"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 94">
<table>

<thead>

<tr>

<th scope="col">{"データの性質"}</th>

<th scope="col">{"選ぶサービス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"キーによる高速アクセス、大規模、サーバーレス"}</td>

<td><strong>{"Amazon DynamoDB"}</strong></td>

<td>{"ミリ秒の応答、無制限に近いスケール、運用不要"}</td>

</tr>

<tr>

<td>{"複雑なクエリ・JOIN・トランザクション、既存の RDB"}</td>

<td><strong>{"Amazon RDS / Aurora"}</strong></td>

<td>{"SQL・ACID"}</td>

</tr>

<tr>

<td>{"ファイル・画像・ログ・バックアップなどのオブジェクト"}</td>

<td><strong>{"Amazon S3"}</strong></td>

<td>{"低コスト、高耐久性、ほぼ無制限の容量"}</td>

</tr>

<tr>

<td>{"ミリ秒未満のキャッシュ、セッション"}</td>

<td><strong>{"ElastiCache（Redis OSS / Valkey / Memcached）"}</strong></td>

<td>{"メモリ上で高速"}</td>

</tr>

<tr>

<td>{"全文検索・ログ分析"}</td>

<td><strong>{"Amazon OpenSearch Service"}</strong></td>

<td>{"検索とアグリゲーション"}</td>

</tr>

<tr>

<td>{"関係のネットワーク（グラフ）"}</td>

<td>{"Amazon Neptune"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td>{"時系列"}</td>

<td>{"Amazon Timestream"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td>{"ドキュメント（MongoDB 互換）"}</td>

<td>{"Amazon DocumentDB"}</td>

<td>{"—"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"DynamoDB の管理機能"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 95">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"TTL（Time to Live）"}</strong></td>

<td>{"期限切れのアイテムを"}<strong>{"自動削除"}</strong>{"（書き込み容量を消費しない）。属性は"}<strong>{"Unix エポック秒（数値）"}</strong></td>

</tr>

<tr>

<td><strong>{"ポイントインタイムリカバリ（PITR）"}</strong></td>

<td>{"過去 "}<strong>{"35 日間"}</strong>{"の任意の時点に復元（秒単位）"}</td>

</tr>

<tr>

<td><strong>{"オンデマンドバックアップ"}</strong></td>

<td>{"任意のタイミングで取得。保持は手動管理（AWS Backup で一元化も可）"}</td>

</tr>

<tr>

<td><strong>{"グローバルテーブル"}</strong></td>

<td><strong>{"マルチリージョン・マルチアクティブ"}</strong>{"のレプリケーション（低遅延と高可用性）"}</td>

</tr>

<tr>

<td><strong>{"DynamoDB Streams"}</strong></td>

<td>{"変更の記録（Skill 1.2.7）"}</td>

</tr>

<tr>

<td><strong>{"暗号化"}</strong></td>

<td><strong>{"保管時は常に暗号化"}</strong>{"（AWS 所有キー / AWS マネージドキー / カスタマーマネージドキー）"}</td>

</tr>

<tr>

<td><strong>{"削除保護"}</strong></td>

<td>{"誤ってテーブルを削除しないよう保護"}</td>

</tr>

<tr>

<td><strong>{"テーブルクラス"}</strong></td>

<td><strong>{"Standard"}</strong>{" / "}<strong>{"Standard-IA"}</strong>{"（アクセス頻度が低いデータのストレージ費用を削減）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"S3 の管理機能"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 96">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"バージョニング"}</strong></td>

<td>{"上書き・削除から保護"}</td>

</tr>

<tr>

<td><strong>{"ライフサイクルルール"}</strong></td>

<td>{"自動で別のストレージクラスへ移行・削除（Skill 1.3.7）"}</td>

</tr>

<tr>

<td><strong>{"暗号化"}</strong></td>

<td><strong>{"既定でサーバー側暗号化（SSE-S3）が有効"}</strong>{"。SSE-KMS、DSSE-KMS、SSE-C も選べる"}</td>

</tr>

<tr>

<td><strong>{"署名付き URL"}</strong></td>

<td>{"期限付きアクセス（Skill 1.1.9）"}</td>

</tr>

<tr>

<td><strong>{"マルチパートアップロード"}</strong></td>

<td>{"大きなファイル（100 MB 以上で推奨、5 GB 超は必須）"}</td>

</tr>

<tr>

<td><strong>{"イベント通知"}</strong></td>

<td>{"Lambda / SQS / SNS / EventBridge へ通知"}</td>

</tr>

<tr>

<td><strong>{"レプリケーション"}</strong></td>

<td>{"リージョン内 / リージョン間のコピー"}</td>

</tr>

<tr>

<td><strong>{"パブリックアクセスブロック"}</strong></td>

<td>{"意図しない公開を防ぐ（既定で有効）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"RDS / Aurora の管理"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 97">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Multi-AZ"}</strong></td>

<td><strong>{"別の AZ に同期レプリケーション"}</strong>{"。"}<strong>{"可用性向上（自動フェイルオーバー）"}</strong>{"が目的。読み取りの分散には使わない（Aurora は別）"}</td>

</tr>

<tr>

<td><strong>{"リードレプリカ"}</strong></td>

<td><strong>{"非同期レプリケーション"}</strong>{"で"}<strong>{"読み取りの負荷を分散"}</strong>{"（結果整合性）"}</td>

</tr>

<tr>

<td><strong>{"自動バックアップ / スナップショット"}</strong></td>

<td>{"ポイントインタイムリカバリ。保持期間 "}<strong>{"1〜35 日"}</strong></td>

</tr>

<tr>

<td><strong>{"RDS Proxy"}</strong></td>

<td>{"接続のプール。"}<strong>{"Lambda からの大量接続"}</strong>{"に有効"}</td>

</tr>

<tr>

<td><strong>{"IAM データベース認証 / Secrets Manager"}</strong></td>

<td>{"パスワードを使わない / "}<strong>{"自動ローテーション"}</strong></td>

</tr>

<tr>

<td><strong>{"Aurora Serverless v2"}</strong></td>

<td>{"負荷に応じて"}<strong>{"容量が自動でスケール"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d28" label="Skill 1.3.6 データストアの利用・管理・保守の図解 d28" /></figure>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"アクセスパターンから"}</strong>{"データストアを選ぶ（「慣れているから」で選ばない）"}</li>
{" "}
<li>{"DynamoDB は "}<strong>{"TTL・PITR・削除保護"}</strong>{"を有効にし、"}<strong>{"暗号化"}</strong>{"を行う"}</li>
{" "}
<li>{"S3 は"}<strong>{"バージョニング・ライフサイクル・パブリックアクセスブロック"}</strong>{"を設定する"}</li>
{" "}
<li>{"RDS は "}<strong>{"Multi-AZ"}</strong>{"（可用性）と"}<strong>{"リードレプリカ"}</strong>{"（性能）を使い分け、"}<strong>{"Lambda には RDS Proxy"}</strong>{" を使う"}</li>
{" "}
<li><strong>{"認証情報は Secrets Manager"}</strong>{" で管理し、ローテーションする"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「RDS の読み取り負荷を下げたい」→ "}<strong>{"リードレプリカ / キャッシュ"}</strong></li>
{" "}
<li>{"「RDS の可用性を高めたい（自動フェイルオーバー）」→ "}<strong>{"Multi-AZ"}</strong></li>
{" "}
<li>{"「Multi-AZ とリードレプリカの違い」→ "}<strong>{"Multi-AZ = 同期・可用性、リードレプリカ = 非同期・読み取りのスケール"}</strong></li>
{" "}
<li>{"「誤って削除 / 更新したデータを元に戻したい」→ "}<strong>{"DynamoDB の PITR / S3 のバージョニング"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
