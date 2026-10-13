import { Diagram } from '../Diagram';
/** 原本のs28を全文・順序どおり収録。 */
export function S28() { return <>
<h2 id="s28" tabIndex={-1}>{"Step 23：ロールバック（Skill 3.4.8）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.8"}</strong>{": 既存のデプロイ戦略を使ってアプリケーションをロールバックする"}</p>{" "}</blockquote>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 77">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"ロールバックの方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"CodeDeploy"}</strong></td>

<td><strong>{"自動ロールバック"}</strong>{"（デプロイ失敗、またはアラーム閾値超過）。実体は「"}<strong>{"直近の成功リビジョンを新しいデプロイとして再実行"}</strong>{"」。Lambda / ECS ではトラフィックを旧バージョンへ戻す"}</td>

</tr>

<tr>

<td><strong>{"Lambda エイリアス"}</strong></td>

<td><code>{"update-alias"}</code>{" で "}<strong>{"旧バージョンへ付け替え"}</strong>{"（即時）"}</td>

</tr>

<tr>

<td><strong>{"Elastic Beanstalk"}</strong></td>

<td>{"旧アプリケーションバージョンを再デプロイ。Immutable は新グループを破棄、Blue/Green は "}<strong>{"CNAME を戻す"}</strong></td>

</tr>

<tr>

<td><strong>{"CloudFormation / SAM"}</strong></td>

<td>{"作成・更新の失敗で "}<strong>{"自動ロールバック"}</strong>{"。ロールバックトリガー（CloudWatch アラーム）で監視可能"}</td>

</tr>

<tr>

<td><strong>{"API Gateway"}</strong></td>

<td>{"カナリアを "}<strong>{"削除（破棄）"}</strong>{"、または以前の "}<strong>{"デプロイ"}</strong>{" をステージに再適用"}</td>

</tr>

<tr>

<td><strong>{"ECS"}</strong></td>

<td><strong>{"サーキットブレーカー"}</strong>{" で失敗時に前のタスク定義へ戻す"}</td>

</tr>

<tr>

<td><strong>{"AppConfig"}</strong></td>

<td>{"アラームで "}<strong>{"自動ロールバック"}</strong>{"、または手動で前の設定へ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d36" label="Step 23：ロールバック（Skill 3.4.8）の図解 d36" />
{" "}
<p><strong>{"ベストプラクティス"}</strong>{": ① 戻せる前提で "}<strong>{"旧バージョンを残す"}</strong>{"（Lambda バージョン、ECR タグ、S3 バージョニング）② "}<strong>{"自動ロールバック条件（アラーム）を事前定義"}</strong>{" ③ ロールバック手順を "}<strong>{"テストしておく"}</strong>{" ④ "}<strong>{"DB マイグレーションは後方互換"}</strong>{"にして戻せるようにする ⑤ "}<strong>{"UPDATE_ROLLBACK_FAILED"}</strong>{" の対処（原因修正後 ContinueUpdateRollback）を知っておく。"}</p>
{" "}
<p><strong>{"狙われどころ"}</strong>{": 「アラーム発報で自動的に戻したい」→ CodeDeploy のデプロイグループに "}<strong>{"アラーム + 自動ロールバック"}</strong>{"。「Lambda を即座に戻す」→ エイリアスを旧バージョンへ。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"3 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeDeploy のロールバック"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CloudFormation のロールバックトリガー"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda のエイリアス"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/configuration-aliases.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
