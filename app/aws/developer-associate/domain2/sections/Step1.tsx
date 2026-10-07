import { Diagram } from '../Diagram';
/** 原本のStep 1　セキュリティの全体像を省略せず収録。 */
export function Step1() { return (<section className="section">
<h2 id="step-1" tabIndex={-1}>{"Step 1 セキュリティの全体像"}</h2>
{" "}
<h3>{"1-1 責任共有モデル"}</h3>
{" "}
<p>{"AWSでは、セキュリティの責任をAWSと利用者で分担します。"}</p>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"区分"}</th>

<th scope="col">{"責任を持つ側"}</th>

<th scope="col">{"具体例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"クラウド"}<strong>{"の"}</strong>{"セキュリティ"}</td>

<td>{"AWS"}</td>

<td>{"データセンター、ハードウェア、ホストOS、マネージドサービスの基盤"}</td>

</tr>

<tr>

<td>{"クラウド"}<strong>{"における"}</strong>{"セキュリティ"}</td>

<td>{"利用者（開発者）"}</td>

<td>{"IAM設定、アプリのコード、データの暗号化設定、シークレットの扱い、OS／ミドルウェアのパッチ（EC2の場合）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"開発者が直接責任を負うのは「"}<strong>{"自分のアプリが誰に何を許すか（認証・認可）"}</strong>{"」「"}<strong>{"データをどう守るか（暗号化）"}</strong>{"」「"}<strong>{"秘密情報をどう持つか（機密管理）"}</strong>{"」です。これがそのままドメイン2の3タスクになります。"}</p>
{" "}
<h3>{"1-2 セキュリティの4本柱"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={2} label="Step 1　セキュリティの全体像の図解" />
</div>
{" "}
<h3>{"1-3 最重要用語"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"認証（AuthN）"}</td>

<td>{"本人確認"}</td>

<td>{"パスワード、MFA、署名付きリクエスト"}</td>

</tr>

<tr>

<td>{"認可（AuthZ）"}</td>

<td>{"権限の確認"}</td>

<td>{"「このユーザーはこのS3バケットを読める」"}</td>

</tr>

<tr>

<td>{"プリンシパル"}</td>

<td>{"操作主体（人・ロール・サービス）"}</td>

<td>{"IAMユーザー、IAMロール、AWSサービス"}</td>

</tr>

<tr>

<td>{"ポリシー"}</td>

<td>{"権限を記述したJSON"}</td>

<td>{"Allow / Deny、Action、Resource、Condition"}</td>

</tr>

<tr>

<td>{"一時認証情報"}</td>

<td>{"有効期限つき認証情報"}</td>

<td>{"STSが発行（アクセスキーID＋シークレット＋セッショントークン）"}</td>

</tr>

<tr>

<td>{"保管時の暗号化"}</td>

<td>{"保存されたデータの暗号化"}</td>

<td>{"S3のSSE、EBS暗号化"}</td>

</tr>

<tr>

<td>{"転送中の暗号化"}</td>

<td>{"通信経路の暗号化"}</td>

<td>{"TLS（HTTPS）"}</td>

</tr>

<tr>

<td>{"最小権限"}</td>

<td>{"必要最小限の権限だけ与える原則"}</td>

<td>{"特定バケット・特定アクションのみ許可"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"1-4 全Stepを貫く「5つの大原則」"}</h3>
{" "}
<ol>
{" "}
<li><strong>{"最小権限"}</strong>{"：必要な権限だけを与える。"}</li>
{" "}
<li><strong>{"長期認証情報を避ける"}</strong>{"：IAMロールと一時認証情報を使う。"}</li>
{" "}
<li><strong>{"コードに秘密を書かない"}</strong>{"：Secrets ManagerやParameter Storeから取得する。"}</li>
{" "}
<li><strong>{"常に暗号化"}</strong>{"：保管時も転送中も。"}</li>
{" "}
<li><strong>{"多層防御"}</strong>{"：認証・認可・暗号化・ログを重ねる。"}</li>
{" "}
</ol>
{" "}
<h3>{"根拠ソース（Step 0・1）"}</h3>
{" "}
<ul>
{" "}
<li>{"試験ガイド（DVA-C02）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html">{"https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html"}</a></li>
{" "}
<li>{"ドメイン2（Security）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02-domain2.html">{"https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02-domain2.html"}</a></li>
{" "}
<li>{"対象サービス一覧（In-Scope）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/dva-02-in-scope-services.html">{"https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/dva-02-in-scope-services.html"}</a></li>
{" "}
<li>{"資格ページ："}<a target="_blank" rel="noopener" href="https://aws.amazon.com/certification/certified-developer-associate/">{"https://aws.amazon.com/certification/certified-developer-associate/"}</a></li>
{" "}
<li>{"責任共有モデル："}<a target="_blank" rel="noopener" href="https://aws.amazon.com/compliance/shared-responsibility-model/">{"https://aws.amazon.com/compliance/shared-responsibility-model/"}</a></li>
{" "}
<li>{"IAMのセキュリティベストプラクティス："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
