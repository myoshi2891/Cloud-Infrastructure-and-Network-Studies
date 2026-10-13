import { Diagram } from '../Diagram';
/** 原本のs29を全文・順序どおり収録。 */
export function S29() { return <>
<h2 id="s29" tabIndex={-1}>{"Step 24：ラベルとブランチによるバージョン・リリース管理（Skill 3.4.9）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.9"}</strong>{": ラベルとブランチを使って、バージョンとリリースを管理する"}</p>{" "}</blockquote>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 78">
<table>

<thead>

<tr>

<th scope="col">{"仕組み"}</th>

<th scope="col">{"使い方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Git ブランチ"}</strong></td>

<td><code>{"main"}</code>{"（本番）、"}<code>{"develop"}</code>{"（統合）、"}<code>{"feature/*"}</code>{"、"}<code>{"release/*"}</code>{"、"}<code>{"hotfix/*"}</code>{"。ブランチを環境に対応づける（例："}<code>{"main"}</code>{"→prod、"}<code>{"develop"}</code>{"→dev）"}</td>

</tr>

<tr>

<td><strong>{"Git タグ"}</strong></td>

<td><code>{"v1.4.0"}</code>{" のように "}<strong>{"リリースの起点を固定"}</strong>{"。CodePipeline V2 は "}<strong>{"タグをトリガー"}</strong>{" にできる"}</td>

</tr>

<tr>

<td><strong>{"セマンティックバージョニング"}</strong></td>

<td><code>{"MAJOR.MINOR.PATCH"}</code>{"（互換性を壊す／機能追加／バグ修正）"}</td>

</tr>

<tr>

<td><strong>{"Lambda バージョン + エイリアス"}</strong></td>

<td>{"バージョンは不変。エイリアスで dev / prod を示す"}</td>

</tr>

<tr>

<td><strong>{"ECR イメージタグ"}</strong></td>

<td>{"バージョン番号やコミット SHA。"}<strong>{"不変タグ"}</strong>{" 推奨"}</td>

</tr>

<tr>

<td><strong>{"S3 バージョニング"}</strong></td>

<td>{"アーティファクトの履歴管理"}</td>

</tr>

<tr>

<td><strong>{"Parameter Store のラベル"}</strong></td>

<td>{"パラメータの特定バージョンに "}<strong>{"ラベル"}</strong>{" を付けて参照"}</td>

</tr>

<tr>

<td><strong>{"Secrets Manager のステージングラベル"}</strong></td>

<td><code>{"AWSCURRENT"}</code>{" / "}<code>{"AWSPREVIOUS"}</code>{" / "}<code>{"AWSPENDING"}</code>{" でローテーション管理"}</td>

</tr>

<tr>

<td><strong>{"Amplify ブランチ"}</strong></td>

<td>{"ブランチ＝環境（ブランチ単位で自動デプロイ）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d37" label="Step 24：ラベルとブランチによるバージョン・リリース管理（Skill 3.4.9）の図解 d37" />
{" "}
<p><strong>{"ベストプラクティス"}</strong>{": ① "}<strong>{"trunk-based（短命ブランチ）"}</strong>{" で小さく頻繁に統合 ② "}<strong>{"main を保護"}</strong>{"（PR 必須）③ リリースは "}<strong>{"タグ"}</strong>{" で固定し、成果物の "}<strong>{"バージョンと Git のタグを対応づける"}</strong>{" ④ "}<code>{"latest"}</code>{" に頼らない ⑤ 本番へは "}<strong>{"タグ／リリースブランチのみ"}</strong>{" をデプロイ対象にする。"}</p>
{" "}
<p><strong>{"狙われどころ"}</strong>{": 「特定コミットを本番リリースとして固定したい」→ "}<strong>{"Git タグ"}</strong>{"。「ブランチごとに自動で環境」→ "}<strong>{"Amplify"}</strong>{"。「ブランチごとに別ステージへデプロイ」→ パイプラインのブランチフィルター。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"5 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodePipeline V2 のトリガー"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codepipeline/latest/userguide/pipeline-types.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-labels.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Parameter Store のラベル"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/systems-manager/latest/userguide/sysman-paramstore-labels.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/getting-started.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Secrets Manager のバージョンとステージングラベル"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/secretsmanager/latest/userguide/getting-started.html"}</span></a>
<a className="ref" href="https://semver.org/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Semantic Versioning"}</span><span className="ref-url"><b>{"semver.org"}</b>{"/"}</span></a>
<a className="ref" href="https://trunkbaseddevelopment.com/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Trunk Based Development"}</span><span className="ref-url"><b>{"trunkbaseddevelopment.com"}</b>{"/"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
