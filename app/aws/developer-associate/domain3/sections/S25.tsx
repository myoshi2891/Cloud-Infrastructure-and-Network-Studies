import { Diagram } from '../Diagram';
/** 原本のs25を全文・順序どおり収録。 */
export function S25() { return <>
<h2 id="s25" tabIndex={-1}>{"Step 20：AWS サービスによるアプリケーション環境の管理（Skill 3.4.4）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.4"}</strong>{": AWS サービスを使ってアプリケーション環境を管理する"}</p>{" "}</blockquote>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 71">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"環境の単位"}</th>

<th scope="col">{"ポイント"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Elastic Beanstalk"}</strong></td>

<td>{"環境（Environment）"}</td>

<td>{"同一アプリで dev / prod 環境を作成。"}<strong>{"CNAME スワップ"}</strong>{" で blue/green"}</td>

</tr>

<tr>

<td><strong>{"AWS Amplify Hosting"}</strong></td>

<td>{"ブランチ"}</td>

<td>{"ブランチごとに環境変数・URL"}</td>

</tr>

<tr>

<td><strong>{"AWS CodeDeploy"}</strong></td>

<td>{"アプリケーション → "}<strong>{"デプロイグループ"}</strong></td>

<td>{"グループごとに対象・戦略・アラームを設定"}</td>

</tr>

<tr>

<td><strong>{"AWS AppConfig"}</strong></td>

<td>{"Environment"}</td>

<td>{"環境ごとにアラーム・配信戦略"}</td>

</tr>

<tr>

<td><strong>{"API Gateway"}</strong></td>

<td>{"ステージ"}</td>

<td>{"ステージ変数・スロットリング"}</td>

</tr>

<tr>

<td><strong>{"CloudFormation / SAM"}</strong></td>

<td>{"スタック"}</td>

<td>{"環境名をパラメータ化"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d32" label="Step 20：AWS サービスによるアプリケーション環境の管理（Skill 3.4.4）の図解 d32" />
{" "}
<p><strong>{"ベストプラクティス"}</strong>{": ① 環境ごとに "}<strong>{"別の IAM ロール"}</strong>{" ② Beanstalk では "}<strong>{"DB を環境の外（RDS 別管理）"}</strong>{" に置く ③ 環境設定は "}<strong>{"保存済み設定（Saved configuration）や .ebextensions"}</strong>{" でコード化 ④ 不要な一時環境は自動削除。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"3 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.environments.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Elastic Beanstalk の環境"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/elasticbeanstalk/latest/dg/using-features.environments.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CNAME スワップ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeDeploy のデプロイグループ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codedeploy/latest/userguide/deployment-groups.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
