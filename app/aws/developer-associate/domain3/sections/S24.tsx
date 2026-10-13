import { Diagram } from '../Diagram';
/** 原本のs24を全文・順序どおり収録。 */
export function S24() { return <>
<h2 id="s24" tabIndex={-1}>{"Step 19：既存 IaC テンプレートの更新（Skill 3.4.3）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.3"}</strong>{": 既存の IaC テンプレート（SAM、CloudFormation）を更新する"}</p>{" "}</blockquote>
{" "}
<p>{"テンプレートを編集して再デプロイすると、CloudFormation は "}<strong>{"差分だけ"}</strong>{" を反映します。ただし変更内容によって "}<strong>{"リソースへの影響の重さ"}</strong>{" が違います。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 70">
<table>

<thead>

<tr>

<th scope="col">{"更新動作"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"No interruption"}</strong></td>

<td>{"中断なしで更新"}</td>

<td>{"Lambda のタイムアウト変更"}</td>

</tr>

<tr>

<td><strong>{"Some interruption"}</strong></td>

<td>{"一時的な中断あり"}</td>

<td>{"EC2 のインスタンスタイプ変更"}</td>

</tr>

<tr>

<td><strong>{"Replacement"}</strong></td>

<td><strong>{"新しいリソースを作って古いものを削除"}</strong>{"（物理 ID が変わる）"}</td>

<td>{"名前固定リソースの名前変更、RDS の一部プロパティ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d31" label="Step 19：既存 IaC テンプレートの更新（Skill 3.4.3）の図解 d31" />
{" "}
<p><strong>{"ベストプラクティス"}</strong>{": ① "}<strong>{"変更セット"}</strong>{" で Replacement の有無を必ず確認 ② 名前を固定しない ③ "}<strong>{"スタックポリシー"}</strong>{" で重要リソースの更新を禁止 ④ "}<strong>{"ドリフト検出"}</strong>{" で手作業変更を把握 ⑤ ステートフルなリソースに "}<code>{"DeletionPolicy"}</code>{" と "}<code>{"UpdateReplacePolicy"}</code>{" ⑥ "}<code>{"UPDATE_ROLLBACK_FAILED"}</code>{" は原因を直して "}<strong>{"ContinueUpdateRollback"}</strong>{"。"}</p>
{" "}
<p><strong>{"狙われどころ"}</strong>{": 「更新前に影響確認」→ 変更セット。「本番 DB を更新で消したくない」→ スタックポリシー / UpdateReplacePolicy。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"4 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"更新動作"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"変更セット"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"スタックポリシー"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ドリフト検出"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
