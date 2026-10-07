import { Diagram } from '../Diagram';
/** Skill 1.2.1 VPC 内プライベートリソースへのアクセスを全量保持する。 */
export function Sk121(){return (<section className="section" id="sk-1-2-1" tabIndex={-1}>
<h2>{"Skill 1.2.1 VPC 内プライベートリソースへのアクセス"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: Lambda コードから VPC 内のプライベートリソースにアクセスする方法を説明する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"Lambda から "}<strong>{"VPC のプライベートサブネット内のリソース"}</strong>{"（RDS、ElastiCache など）へ接続するための設定を理解するスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"既定の状態と VPC 接続"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 52">
<table>

<thead>

<tr>

<th scope="col">{"状態"}</th>

<th scope="col">{"インターネット"}</th>

<th scope="col">{"VPC 内のプライベートリソース"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"既定（VPC 設定なし）"}</strong></td>

<td>{"利用可能（AWS 管理の VPC で動作）"}</td>

<td><strong>{"アクセス不可"}</strong></td>

</tr>

<tr>

<td><strong>{"VPC 設定あり"}</strong></td>

<td><strong>{"既定では不可"}</strong>{"（自分の VPC のルーティング次第）"}</td>

<td>{"アクセス可能"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"VPC に接続するには、関数に"}<strong>{"サブネット"}</strong>{"と"}<strong>{"セキュリティグループ"}</strong>{"を指定します。Lambda はそのサブネットに "}<strong>{"ENI（Elastic Network Interface）"}</strong>{"（Hyperplane ENI）を作り、VPC 内のリソースと通信します。"}</p>
{" "}
<h4>{"必要な設定"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 53">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"サブネット"}</td>

<td><strong>{"複数の AZ のプライベートサブネットを指定"}</strong>{"（可用性のため）"}</td>

</tr>

<tr>

<td>{"セキュリティグループ"}</td>

<td>{"Lambda 用の SG を作り、"}<strong>{"接続先 SG のインバウンドで Lambda の SG を許可"}</strong>{"（例: RDS の 3306 / 5432 / ElastiCache の 6379）"}</td>

</tr>

<tr>

<td>{"実行ロールの権限"}</td>

<td>{"ENI の作成・削除に必要な権限（"}<strong><code>{"AWSLambdaVPCAccessExecutionRole"}</code></strong>{" マネージドポリシー）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"VPC 接続した Lambda から、インターネットや AWS サービスへ出るには"}</h4>
{" "}
<p>{"VPC 内の Lambda は、"}<strong>{"パブリックサブネットに置いてもインターネットに出られません"}</strong>{"（パブリック IP が付かないため）。次のいずれかが必要です。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 54">
<table>

<thead>

<tr>

<th scope="col">{"到達したい先"}</th>

<th scope="col">{"方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"インターネットの外部 API"}</strong></td>

<td><strong>{"プライベートサブネット → NAT ゲートウェイ（パブリックサブネットに配置）→ インターネットゲートウェイ"}</strong></td>

</tr>

<tr>

<td><strong>{"S3 / DynamoDB"}</strong></td>

<td><strong>{"ゲートウェイ型 VPC エンドポイント"}</strong>{"（無料）。NAT 不要"}</td>

</tr>

<tr>

<td><strong>{"その他の AWS サービス"}</strong>{"（SQS、Secrets Manager、KMS など）"}</td>

<td><strong>{"インターフェース型 VPC エンドポイント（AWS PrivateLink）"}</strong>{"、または NAT"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d17" label="Skill 1.2.1 VPC 内プライベートリソースへのアクセスの図解 d17" /></figure>
{" "}
<h4>{"RDS への接続の注意（RDS Proxy）"}</h4>
{" "}
<p>{"Lambda は"}<strong>{"同時実行数に応じて"}</strong>{"多数の接続を DB に張ります。DB の接続数が枯渇しやすいため、"}<strong>{"Amazon RDS Proxy"}</strong>{" で接続をプールして共有するのが定番の対策です。接続処理は"}<strong>{"ハンドラーの外"}</strong>{"で行い、再利用します。"}</p>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"VPC に接続するのは、"}<strong>{"VPC 内のリソースに本当に必要なときだけ"}</strong>{"にする（不要なら接続しない）"}</li>
{" "}
<li><strong>{"複数 AZ のサブネット"}</strong>{"を指定する"}</li>
{" "}
<li>{"S3 / DynamoDB は"}<strong>{"ゲートウェイエンドポイント"}</strong>{"を使い、NAT のコストと経路を減らす"}</li>
{" "}
<li>{"RDS には "}<strong>{"RDS Proxy"}</strong>{" を使い、接続数を保護する"}</li>
{" "}
<li>{"SG は"}<strong>{"最小限"}</strong>{"（必要な送信・受信だけ）にする"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「Lambda から RDS（プライベートサブネット）に接続したい」→ "}<strong>{"関数に VPC 設定（サブネット + SG）。DB の SG で Lambda の SG を許可"}</strong></li>
{" "}
<li>{"「VPC 設定した Lambda が外部 API / S3 に届かなくなった」→ "}<strong>{"NAT ゲートウェイ または VPC エンドポイント"}</strong></li>
{" "}
<li>{"「Lambda の同時実行で DB の接続数が枯渇」→ "}<strong>{"RDS Proxy"}</strong></li>
{" "}
<li>{"「Lambda をパブリックサブネットに置いたらインターネットに出られる?」→ "}<strong>{"出られない（NAT が必要）"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
