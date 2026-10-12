import { Diagram } from '../Diagram';
/** 原本のs22を全文・順序どおり収録。 */
export function S22() { return <>
<h2 id="s22" tabIndex={-1}>{"Step 17：Lambda のデプロイパッケージ形式（Skill 3.4.1）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.1"}</strong>{": Lambda のデプロイパッケージの選択肢を説明する"}</p>{" "}</blockquote>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 67">
<table>

<thead>

<tr>

<th scope="col">{"形式"}</th>

<th scope="col">{"上限・特徴"}</th>

<th scope="col">{"向いている場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{".zip（直接アップロード）"}</strong></td>

<td>{"zip 50 MB まで（コンソール／CLI／SDK で直接）"}</td>

<td>{"小さな関数"}</td>

</tr>

<tr>

<td><strong>{".zip（S3 経由）"}</strong></td>

<td>{"解凍後 "}<strong>{"250 MB"}</strong>{"（レイヤー含む）"}</td>

<td>{"一般的な関数、SAM / CloudFormation"}</td>

</tr>

<tr>

<td><strong>{"レイヤー"}</strong></td>

<td>{"1 関数に最大 "}<strong>{"5 つ"}</strong>{"。合計で解凍後 250 MB の枠内"}</td>

<td>{"共通ライブラリの共有"}</td>

</tr>

<tr>

<td><strong>{"コンテナイメージ"}</strong></td>

<td>{"最大 "}<strong>{"10 GB"}</strong>{"。ECR（同一リージョン）に置く"}</td>

<td>{"大きな依存関係（ML など）、既存の Docker 資産"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d29" label="Step 17：Lambda のデプロイパッケージ形式（Skill 3.4.1）の図解 d29" />
{" "}
<p><strong>{"ベストプラクティス"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 68">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"zip が 50MB 超なら "}<strong>{"S3 経由"}</strong>{"（"}<code>{"CodeUri"}</code>{" と "}<code>{"sam package"}</code>{"/"}<code>{"sam deploy"}</code>{" が自動化）"}</td>

<td>{"直接アップロードの上限回避"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"コンテナは "}<strong>{"AWS 提供ベースイメージ"}</strong>{" か "}<strong>{"Runtime Interface Client"}</strong>{" を含む OCI イメージを使う"}</td>

<td>{"Lambda が起動できる必要がある"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"イメージは "}<strong>{"ECR に push し、不変タグまたはダイジェスト"}</strong>{" で参照"}</td>

<td>{"再現性"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"コード署名（Code signing）"}</strong>{" で改ざんを防ぐ"}</td>

<td>{"供給網対策"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"ローカルでは "}<strong>{"Runtime Interface Emulator"}</strong>{" でコンテナを検証"}</td>

<td>{"デプロイ前確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"試験での狙われどころ"}</strong>{": 「250MB を超える」→ コンテナ、「共通コードの一元更新」→ レイヤー、「zip を 1 回で直接アップロードできるサイズ」→ 50MB。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"4 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"デプロイパッケージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/gettingstarted-package.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/images-create.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"コンテナイメージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/images-create.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"レイヤー"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/chapter-layers.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"クォータ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/gettingstarted-limits.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
