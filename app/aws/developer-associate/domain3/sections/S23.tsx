import { Diagram } from '../Diagram';
/** 原本のs23を全文・順序どおり収録。 */
export function S23() { return <>
<h2 id="s23" tabIndex={-1}>{"Step 18：API Gateway のステージとカスタムドメイン（Skill 3.4.2）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.2"}</strong>{": API Gateway のステージとカスタムドメインを説明する"}</p>{" "}</blockquote>
{" "}
<p>{"既定の URL（"}<code>{"https://{api-id}.execute-api.{region}.amazonaws.com/{stage}"}</code>{"）の代わりに、"}<strong>{"自社ドメイン"}</strong>{"（例："}<code>{"api.example.com"}</code>{"）で公開する仕組みが "}<strong>{"カスタムドメイン名"}</strong>{" です。"}</p>
{" "}
<Diagram id="d30" label="Step 18：API Gateway のステージとカスタムドメイン（Skill 3.4.2）の図解 d30" />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 69">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"証明書"}</td>

<td><strong>{"AWS Certificate Manager（ACM）"}</strong>{" で発行・管理"}</td>

</tr>

<tr>

<td><strong>{"エッジ最適化"}</strong>{"エンドポイント"}</td>

<td>{"証明書は "}<strong>{"us-east-1"}</strong>{" に必要（CloudFront 経由）"}</td>

</tr>

<tr>

<td><strong>{"リージョン"}</strong>{"エンドポイント"}</td>

<td>{"証明書は "}<strong>{"API と同じリージョン"}</strong></td>

</tr>

<tr>

<td>{"DNS"}</td>

<td><strong>{"Route 53 のエイリアスレコード"}</strong>{"（または CNAME）をドメイン名のターゲットに向ける"}</td>

</tr>

<tr>

<td>{"マッピング"}</td>

<td><strong>{"ベースパスマッピング／API マッピング"}</strong>{" で「パス → API + ステージ」を対応づける"}</td>

</tr>

<tr>

<td>{"追加機能"}</td>

<td><strong>{"相互 TLS（mTLS）"}</strong>{"、TLS の最小バージョン指定"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"ベストプラクティス"}</strong>{": ① ステージ名を URL に露出させたくないなら、カスタムドメインに "}<strong>{"マッピング"}</strong>{" して隠す ② 証明書は ACM の "}<strong>{"自動更新"}</strong>{" を使う ③ バージョンは "}<code>{"v1/"}</code>{"、"}<code>{"v2/"}</code>{" のように "}<strong>{"ベースパスで分離"}</strong>{" ④ dev / prod で "}<strong>{"別ドメイン"}</strong>{"（"}<code>{"dev-api."}</code>{" / "}<code>{"api."}</code>{"）を用意する。"}</p>
{" "}
<p><strong>{"狙われどころ"}</strong>{": 「エッジ最適化 + カスタムドメイン」→ "}<strong>{"us-east-1 の ACM 証明書"}</strong>{"。「独自ドメインで API を公開」→ "}<strong>{"カスタムドメイン + Route 53 + ACM"}</strong>{"。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"3 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/how-to-custom-domains.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"カスタムドメイン名"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/how-to-custom-domains.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/stages.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ステージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/apigateway/latest/developerguide/stages.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ACM"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/acm/latest/userguide/acm-overview.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
