import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 21　マルチテナントのデータアクセスパターン（Skill 2.3.6）を省略せず収録。 */
export function Step21() { return (<section className="section">
<h2 id="step-21" tabIndex={-1}>{"Step 21 マルチテナントのデータアクセスパターン（Skill 2.3.6）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「マルチテナントアプリケーション向けのデータアクセスパターンを実装する」"}</strong>{"："}<strong>{"テナント間のデータ分離"}</strong>{"。"}</p>
{" "}
<h3>{"21-1 マルチテナントとは"}</h3>
{" "}
<p><strong>{"1つのアプリ（SaaS）を複数の顧客（テナント）が共有"}</strong>{"する構成です。最大のリスクは、"}<strong>{"テナントAのユーザーがテナントBのデータを見てしまう"}</strong>{"ことです。"}</p>
{" "}
<h3>{"21-2 テナント分離モデル"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 96">
<table>

<thead>

<tr>

<th scope="col">{"モデル"}</th>

<th scope="col">{"概要"}</th>

<th scope="col">{"分離の強さ"}</th>

<th scope="col">{"コスト・運用"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"サイロ（Silo）"}</strong></td>

<td>{"テナントごとに"}<strong>{"専用リソース"}</strong>{"（アカウント／DB／テーブル）"}</td>

<td>{"強い"}</td>

<td>{"コスト高・管理が複雑"}</td>

</tr>

<tr>

<td><strong>{"プール（Pool）"}</strong></td>

<td><strong>{"共有リソース"}</strong>{"にテナントIDで論理分離"}</td>

<td>{"論理的（設計次第）"}</td>

<td>{"コスト効率が良い・規模に強い"}</td>

</tr>

<tr>

<td><strong>{"ブリッジ（Bridge）"}</strong></td>

<td>{"サイロとプールの"}<strong>{"混在"}</strong>{"（階層・用途ごと）"}</td>

<td>{"中間"}</td>

<td>{"バランス型"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<div className="diagram-card">
<Diagram index={29} label="Step 21　マルチテナントのデータアクセスパターン（Skill 2.3.6）の図解" />
</div>
{" "}
<h3>{"21-3 基本原則："}<strong>{"テナントIDは「信頼できる出所」から取る"}</strong></h3>
{" "}
<div className="diagram-card">
<Diagram index={30} label="Step 21　マルチテナントのデータアクセスパターン（Skill 2.3.6）の図解" />
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 97">
<table>

<thead>

<tr>

<th scope="col">{"悪い例"}</th>

<th scope="col">{"良い例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"リクエストのJSONの"}<code>{"tenantId"}</code>{"を信じる"}</td>

<td><strong>{"検証済みトークンのクレーム"}</strong>{"（"}<code>{"custom:tenant_id"}</code>{"やグループ）から取得"}</td>

</tr>

<tr>

<td>{"全テナントのデータにアクセスできる強い権限でクエリし、アプリ側のフィルターだけで分ける"}</td>

<td><strong>{"データアクセス層の権限自体をテナントに限定"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"21-4 DynamoDBでの分離パターン"}</h3>
{" "}
<p><strong>{"パーティションキーにテナントIDを含める"}</strong>{"設計と、"}<strong>{"IAMの条件"}</strong>{"で強制する設計を組み合わせます。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 98">
<table>

<thead>

<tr>

<th scope="col">{"テーブル設計"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"パーティションキー＝テナントID"}</td>

<td><code>{"PK = TENANT#t-001"}</code>{"、"}<code>{"SK = ORDER#..."}</code></td>

</tr>

<tr>

<td>{"複合キー"}</td>

<td><code>{"PK = TENANT#t-001#ORDER"}</code>{"、"}<code>{"SK = 日付"}</code></td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"IAMで"}<strong>{"テナントに属するキーのみ"}</strong>{"に限定（STSセッションタグやポリシー変数を活用）："}</p>
{" "}
<CodeBlock index={36} language="json" lines={["{","  \"Effect\": \"Allow\",","  \"Action\": [\"dynamodb:GetItem\", \"dynamodb:Query\", \"dynamodb:PutItem\"],","  \"Resource\": \"arn:aws:dynamodb:ap-northeast-1:111122223333:table/Orders\",","  \"Condition\": {","    \"ForAllValues:StringLike\": {","      \"dynamodb:LeadingKeys\": [\"TENANT#${aws:PrincipalTag/TenantId}*\"]","    }","  }","}"]} />
{" "}
<p><strong>{"テナント限定の認証情報を作る（セッションタグ）"}</strong></p>
{" "}
<CodeBlock index={37} language="python" lines={["import boto3","","sts = boto3.client(\"sts\")","resp = sts.assume_role(","    RoleArn=\"arn:aws:iam::111122223333:role/TenantAccessRole\",","    RoleSessionName=f\"tenant-{tenant_id}\",","    Tags=[{\"Key\": \"TenantId\", \"Value\": tenant_id}],  # IAM条件で参照できる","    DurationSeconds=900,",")"]} />
{" "}
<blockquote>{" "}<p>{"ロールの信頼ポリシーに"}<code>{"sts:TagSession"}</code>{"の許可が必要です。"}<strong>{"アプリ（Lambda）が信頼できるテナントIDを検証したうえでのみタグを付ける"}</strong>{"ことが前提です。"}</p>{" "}</blockquote>
{" "}
<h3>{"21-5 S3・RDSでの分離"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 99">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"分離方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"S3"}</td>

<td><strong>{"テナントごとのプレフィックス"}</strong>{"（"}<code>{"tenants/t-001/"}</code>{"）＋IAM／ABACで制限。"}<strong>{"S3アクセスポイント"}</strong>{"でテナント別のアクセスポイントを作成する方法もある"}</td>

</tr>

<tr>

<td>{"RDS／Aurora（PostgreSQL）"}</td>

<td><strong>{"行レベルセキュリティ（RLS）"}</strong>{"、またはテナントごとのスキーマ／DB"}</td>

</tr>

<tr>

<td>{"OpenSearch"}</td>

<td>{"インデックス分離、ドキュメントレベルのセキュリティ"}</td>

</tr>

<tr>

<td>{"KMS"}</td>

<td><strong>{"テナントごとのKMSキー"}</strong>{"（高分離要件。鍵の無効化でテナントのデータを使用不可にもできる）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"PostgreSQLのRLSの考え方："}</p>
{" "}
<CodeBlock index={38} language="sql" lines={["ALTER TABLE orders ENABLE ROW LEVEL SECURITY;","","CREATE POLICY tenant_isolation ON orders","  USING (tenant_id = current_setting('app.tenant_id')::uuid);","","-- 接続ごとにテナントを設定（アプリが検証済みの値で）","SET app.tenant_id = '11111111-1111-1111-1111-111111111111';"]} />
{" "}
<h3>{"21-6 分離を「迂回できない」層に置く"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={31} label="Step 21　マルチテナントのデータアクセスパターン（Skill 2.3.6）の図解" />
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 100">
<table>

<thead>

<tr>

<th scope="col">{"層"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"アプリ"}</td>

<td>{"必ずテナントコンテキストを通す共通ライブラリ"}</td>

</tr>

<tr>

<td>{"認証情報"}</td>

<td><strong>{"テナント限定の一時認証情報"}</strong>{"（コードのバグがあっても他テナントに届かない）"}</td>

</tr>

<tr>

<td>{"データ"}</td>

<td>{"RLS／LeadingKeys条件で"}<strong>{"強制"}</strong></td>

</tr>

<tr>

<td>{"監査"}</td>

<td>{"ログに"}<code>{"tenant_id"}</code>{"を付与し、CloudTrail／アクセスログで追跡"}</td>

</tr>

<tr>

<td>{"性能"}</td>

<td><strong>{"ノイジーネイバー"}</strong>{"対策（スロットリング、使用量プラン、テナント別クォータ）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"21-7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 101">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"テナントIDはリクエストのパラメータを信じず"}</strong>{"、検証済みトークンのクレームから取得"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"アプリのフィルターだけに頼らず、"}<strong>{"IAM条件・RLS・テナント限定認証情報"}</strong>{"でデータ層も強制"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"要件に応じて"}<strong>{"サイロ／プール／ブリッジ"}</strong>{"を選ぶ（規制の厳しいテナントはサイロ）"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"すべてのログ・メトリクスに"}<strong>{"テナントIDを付与"}</strong></td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong>{"テナント別の暗号化キー"}</strong>{"やアクセス制御を検討"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td><strong>{"クロステナントアクセスのテスト"}</strong>{"（異なるテナントの資格情報で他テナントのIDを指定して拒否されるか）を自動テストに含める"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"スロットリング・クォータで"}<strong>{"ノイジーネイバー"}</strong>{"を抑制"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「リクエストボディの"}<code>{"tenantId"}</code>{"でクエリを絞る」→ "}<strong>{"改ざん可能"}</strong>{"。トークンのクレームを使う。"}</li>
{" "}
<li>{"「プールモデルは共有なので分離できない」→ "}<strong>{"誤り"}</strong>{"。IAM条件・RLSなどで論理分離できる。"}</li>
{" "}
<li>{"「すべてのテナントに同じ強力なロールでアクセス」→ "}<strong>{"最小権限違反"}</strong>{"。テナント限定の認証情報を使う。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"SaaS Lens（Well-Architected）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html">{"https://docs.aws.amazon.com/wellarchitected/latest/saas-lens/saas-lens.html"}</a></li>
{" "}
<li>{"SaaSアーキテクチャの基礎（ホワイトペーパー）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/saas-architecture-fundamentals.html">{"https://docs.aws.amazon.com/whitepapers/latest/saas-architecture-fundamentals/saas-architecture-fundamentals.html"}</a></li>
{" "}
<li>{"DynamoDB：きめ細かなアクセス制御："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/specifying-conditions.html"}</a></li>
{" "}
<li>{"STSのセッションタグ："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/id_session-tags.html"}</a></li>
{" "}
<li>{"PostgreSQL 行レベルセキュリティ："}<a target="_blank" rel="noopener" href="https://www.postgresql.org/docs/current/ddl-rowsecurity.html">{"https://www.postgresql.org/docs/current/ddl-rowsecurity.html"}</a></li>
{" "}
<li>{"AWSホワイトペーパー「SaaS Tenant Isolation Strategies」："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/whitepapers/latest/saas-tenant-isolation-strategies/saas-tenant-isolation-strategies.html">{"https://docs.aws.amazon.com/whitepapers/latest/saas-tenant-isolation-strategies/saas-tenant-isolation-strategies.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
