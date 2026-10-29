import { Diagram } from '../Diagram';
/** 原本step-18の全内容。 */
export function Section19() { return (<section className="section" id="step-18" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-cpu" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"Task 3 · Step 18 · 4.3.3"}</p>
<h2>{"最小限のメモリとコンピューティング能力を決める"}</h2>
</div>
</div>
{" "}
<h3>{"この項目で学ぶこと"}</h3>
{" "}
<p><strong>{"「足りない」と遅く・失敗し、「多すぎる」と無駄にコストがかかります。"}</strong>{" 必要十分な量を "}<strong>{"データに基づいて"}</strong>{" 決める方法を学びます。"}</p>
{" "}
<h3>{"やさしい解説"}</h3>
{" "}
<h4>{"18-1. Lambda のメモリ設定(最重要)"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 103">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"設定範囲"}</td>

<td><strong>{"128 MB 〜 10,240 MB"}</strong>{"(1 MB 単位)"}</td>

</tr>

<tr>

<td><strong>{"CPU の決まり方"}</strong></td>

<td><strong>{"メモリに比例して CPU が割り当てられる"}</strong>{"(CPU を直接指定する設定はない)。"}<strong>{"1,769 MB で約 1 vCPU"}</strong></td>

</tr>

<tr>

<td>{"料金"}</td>

<td><strong>{"メモリ(GB)× 実行時間(秒)= GB 秒"}</strong>{" で課金(+ リクエスト数)"}</td>

</tr>

<tr>

<td>{"タイムアウト"}</td>

<td>{"最大 900 秒(15 分)"}</td>

</tr>

<tr>

<td>{"一時ストレージ(/tmp)"}</td>

<td>{"512 MB 〜 10,240 MB"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"重要な逆説:"}</strong>{" メモリを増やすと "}<strong>{"単価は上がるが、CPU も増えて実行時間が短くなる"}</strong>{" ので、"}<strong>{"合計コストが下がることがある"}</strong>{" (CPU を多く使う処理ほど顕著)。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 104">
<table className="t3">

<thead>

<tr>

<th scope="col">{"メモリ"}</th>

<th scope="col">{"実行時間"}</th>

<th scope="col">{"概算コスト(相対)"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"128 MB"}</td>

<td>{"10 秒"}</td>

<td>{"0.125 GB × 10 = "}<strong>{"1.25"}</strong></td>

</tr>

<tr>

<td>{"512 MB"}</td>

<td>{"2.5 秒"}</td>

<td>{"0.5 GB × 2.5 = "}<strong>{"1.25"}</strong>{"(同コストで 4 倍速い)"}</td>

</tr>

<tr>

<td>{"1,024 MB"}</td>

<td>{"1.2 秒"}</td>

<td>{"1 GB × 1.2 = "}<strong>{"1.2"}</strong>{"(さらに速く、より安い)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"※ 数値は考え方を示す架空の例です。"}<strong>{"実測が必須"}</strong>{" です。"}</p>
{" "}
<figure className="diagram-card">
<Diagram id="d26" label="図 27" />
</figure>
{" "}
<h4>{"18-2. 最適なメモリを見つける道具"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 105">
<table>

<thead>

<tr>

<th scope="col">{"道具"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWS Lambda Power Tuning"}</strong>{"(オープンソース)"}</td>

<td>{"Step Functions で、"}<strong>{"複数のメモリ設定で関数を実際に実行"}</strong>{" し、コスト・速度を比較するグラフを出す"}</td>

</tr>

<tr>

<td><strong>{"AWS Compute Optimizer"}</strong></td>

<td>{"実際の使用状況(メトリクス)から、"}<strong>{"Lambda のメモリ設定"}</strong>{" や "}<strong>{"EC2 / ECS on Fargate / EBS"}</strong>{" の推奨サイズを提示"}</td>

</tr>

<tr>

<td><strong>{"ログの "}<code>{"Max Memory Used"}</code></strong>{" / "}<strong>{"Lambda Insights"}</strong></td>

<td>{"実使用メモリの確認"}</td>

</tr>

<tr>

<td><strong>{"負荷テスト"}</strong></td>

<td>{"ピーク時の挙動確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"18-3. Lambda 以外の「最小限のコンピューティング」"}</h4>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 106">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"決め方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"EC2"}</strong></td>

<td>{"CloudWatch の CPU・メモリ(CloudWatch エージェント)を確認し、"}<strong>{"Compute Optimizer"}</strong>{" でライトサイジング(インスタンスタイプの見直し)"}</td>

</tr>

<tr>

<td><strong>{"ECS / Fargate"}</strong></td>

<td><strong>{"タスクサイズ(CPU・メモリ)"}</strong>{" をコンテナの実使用量に合わせる。Container Insights で確認。メモリ超過はタスクの強制停止(OOM)につながる"}</td>

</tr>

<tr>

<td><strong>{"Elastic Beanstalk"}</strong></td>

<td>{"インスタンスタイプと Auto Scaling の設定を、負荷に合わせて見直す"}</td>

</tr>

<tr>

<td><strong>{"全般"}</strong></td>

<td><strong>{"Graviton(arm64)"}</strong>{" を使うと "}<strong>{"同等性能でコスト効率が良い"}</strong>{" ことが多い(Lambda も arm64 を選択可能。ただしライブラリの対応を確認)"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 107">
<table className="t3">

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"決め方"}</td>

<td>{"推測ではなく、"}<strong>{"Power Tuning などで実測"}</strong>{" して決める"}</td>

<td>{"最適点は処理内容により異なる"}</td>

</tr>

<tr>

<td>{"余裕"}</td>

<td><code>{"Max Memory Used"}</code>{" に "}<strong>{"余裕(安全マージン)"}</strong>{" を持たせる"}</td>

<td>{"データ量の変動による OOM を防ぐ"}</td>

</tr>

<tr>

<td>{"CPU バウンド"}</td>

<td>{"CPU を使う処理は "}<strong>{"メモリを増やして CPU を増やす"}</strong></td>

<td>{"実行時間短縮でコストが下がる場合がある"}</td>

</tr>

<tr>

<td>{"I/O 待ち中心"}</td>

<td>{"外部呼び出し待ちが大半なら、メモリを増やしても "}<strong>{"効果が小さい"}</strong></td>

<td>{"待ち時間は短縮されない"}</td>

</tr>

<tr>

<td>{"再評価"}</td>

<td>{"コード変更・データ量増加のたびに "}<strong>{"見直す"}</strong></td>

<td>{"最適値は変わる"}</td>

</tr>

<tr>

<td>{"アーキテクチャ"}</td>

<td>{"対応できるなら "}<strong>{"arm64(Graviton)"}</strong>{" を検討"}</td>

<td>{"価格性能比の向上"}</td>

</tr>

<tr>

<td>{"継続"}</td>

<td><strong>{"Compute Optimizer の推奨を定期確認"}</strong></td>

<td>{"無駄の発見"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"ひっかけポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 108">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"正しい考え方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"「Lambda の CPU を増やしたい」"}</td>

<td><strong>{"メモリを増やす"}</strong>{"(CPU 単独の設定はない)"}</td>

</tr>

<tr>

<td>{"「Lambda を速くしたいが、コードは変えられない」"}</td>

<td><strong>{"メモリ(= CPU)を増やす"}</strong></td>

</tr>

<tr>

<td>{"「最適なメモリサイズを自動で見つけたい」"}</td>

<td><strong>{"Lambda Power Tuning"}</strong>{" / "}<strong>{"Compute Optimizer"}</strong></td>

</tr>

<tr>

<td>{"「"}<code>{"Max Memory Used"}</code>{" が割り当てにほぼ等しく、失敗する」"}</td>

<td>{"メモリ不足。"}<strong>{"割り当てを増やす"}</strong></td>

</tr>

<tr>

<td>{"「メモリを増やすと必ずコストが上がる?」"}</td>

<td><strong>{"いいえ"}</strong>{"。実行時間が短縮されて下がる場合がある"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"参考 URL"}</h3>
{" "}
<ul className="ref-list">
{" "}
<li>{"Lambda のメモリ設定: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html"}</a></li>
{" "}
<li>{"AWS Lambda Power Tuning: "}<a href="https://github.com/alexcasalboni/aws-lambda-power-tuning" target="_blank" rel="noopener">{"https://github.com/alexcasalboni/aws-lambda-power-tuning"}</a></li>
{" "}
<li>{"AWS Compute Optimizer: "}<a href="https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html"}</a></li>
{" "}
<li>{"Lambda のベストプラクティス: "}<a href="https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/lambda/latest/dg/best-practices.html"}</a></li>
{" "}
<li>{"ECS のタスクサイズ: "}<a href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html" target="_blank" rel="noopener">{"https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html"}</a></li>
{" "}
</ul>
{" "}
</section>); }
