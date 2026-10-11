import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 2　IAMの基礎とポリシー評価（Skill 2.1.6）を省略せず収録。 */
export function Step2() { return (<section className="section">
<h2 id="step-2" tabIndex={-1}>{"Step 2 IAMの基礎とポリシー評価（Skill 2.1.6）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「IAMプリンシパルの権限を定義する」"}</strong>{"：ポリシーの種類を理解し、JSONを読み書きし、最小権限で設計できること。"}</p>
{" "}
<h3>{"2-1 IAMの登場人物"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 5">
<table>

<thead>

<tr>

<th scope="col">{"要素"}</th>

<th scope="col">{"説明"}</th>

<th scope="col">{"開発者の関わり方"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"IAMユーザー"}</td>

<td>{"長期認証情報を持つ個人・アプリ"}</td>

<td>{"できるだけ使わない"}</td>

</tr>

<tr>

<td>{"IAMグループ"}</td>

<td>{"ユーザーの集まり"}</td>

<td>{"管理者が扱う（範囲外）"}</td>

</tr>

<tr>

<td><strong>{"IAMロール"}</strong></td>

<td>{"一時的に引き受ける権限の入れ物"}</td>

<td><strong>{"主役"}</strong>{"。Lambda、EC2、ECSなどに付ける"}</td>

</tr>

<tr>

<td>{"ポリシー"}</td>

<td>{"権限のJSON"}</td>

<td>{"読み書きできる必要がある"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"2-2 ポリシーの種類"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 6">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"アタッチ先"}</th>

<th scope="col">{"役割"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"アイデンティティベース"}</td>

<td>{"ユーザー・グループ・ロール"}</td>

<td>{"「この主体は何ができるか」"}</td>

</tr>

<tr>

<td>{"リソースベース"}</td>

<td>{"S3バケット、SQSキュー、KMSキー、Lambdaなど"}</td>

<td>{"「このリソースに誰が何をできるか」"}</td>

</tr>

<tr>

<td>{"信頼ポリシー"}</td>

<td>{"IAMロール"}</td>

<td>{"「誰がこのロールを引き受けられるか」"}</td>

</tr>

<tr>

<td>{"アクセス許可の境界"}</td>

<td>{"ユーザー・ロール"}</td>

<td>{"付与できる権限の"}<strong>{"上限"}</strong></td>

</tr>

<tr>

<td>{"SCP（Organizations）"}</td>

<td>{"アカウント・OU"}</td>

<td>{"アカウント全体の"}<strong>{"上限"}</strong></td>

</tr>

<tr>

<td>{"セッションポリシー"}</td>

<td>{"一時セッション"}</td>

<td>{"その場の権限をさらに"}<strong>{"絞る"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"2-3 ポリシーの構造"}</h3>
{" "}
<CodeBlock index={0} language="json" lines={["{","  \"Version\": \"2012-10-17\",","  \"Statement\": [","    {","      \"Sid\": \"ReadOnlyOneBucket\",","      \"Effect\": \"Allow\",","      \"Action\": [\"s3:GetObject\", \"s3:ListBucket\"],","      \"Resource\": [","        \"arn:aws:s3:::my-app-bucket\",","        \"arn:aws:s3:::my-app-bucket/*\"","      ],","      \"Condition\": {","        \"Bool\": { \"aws:SecureTransport\": \"true\" }","      }","    }","  ]","}"]} />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 7">
<table>

<thead>

<tr>

<th scope="col">{"要素"}</th>

<th scope="col">{"意味"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Effect"}</td>

<td>{"Allow または Deny"}</td>

</tr>

<tr>

<td>{"Action"}</td>

<td>{"許可・拒否するAPI操作"}</td>

</tr>

<tr>

<td>{"Resource"}</td>

<td>{"対象リソースのARN"}</td>

</tr>

<tr>

<td>{"Principal"}</td>

<td>{"リソースベースポリシーで「誰に」"}</td>

</tr>

<tr>

<td>{"Condition"}</td>

<td>{"追加条件（IP、タグ、MFA、TLSなど）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><code>{"s3:ListBucket"}</code>{" は"}<strong>{"バケットARN"}</strong>{"、"}<code>{"s3:GetObject"}</code>{" は"}<strong>{"オブジェクトARN（"}<code>{"/*"}</code>{"付き）"}</strong>{"に対する権限です。両方のResourceを書き忘れるのが典型的な失敗です。"}</p>{" "}</blockquote>
{" "}
<h3>{"2-4 ポリシー評価のルール"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={3} label="Step 2　IAMの基礎とポリシー評価（Skill 2.1.6）の図解" />
</div>
{" "}
<p><strong>{"覚えるべき3原則"}</strong></p>
{" "}
<ol>
{" "}
<li>{"既定は"}<strong>{"暗黙のDeny"}</strong>{"（何も許可がなければ拒否）。"}</li>
{" "}
<li><strong>{"明示的なDenyは常に最優先"}</strong>{"。"}</li>
{" "}
<li>{"同一アカウント内では、アイデンティティベースかリソースベースのどちらかがAllowなら許可されうる。"}<strong>{"アカウントをまたぐ場合は、両側の許可が必要"}</strong>{"（Step 15でKMSを例に再確認）。"}</li>
{" "}
</ol>
{" "}
<h3>{"2-5 便利な条件キー"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 8">
<table>

<thead>

<tr>

<th scope="col">{"条件キー"}</th>

<th scope="col">{"用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"aws:SecureTransport"}</code></td>

<td>{"HTTPS通信のみ許可（S3バケットポリシーの定番）"}</td>

</tr>

<tr>

<td><code>{"aws:PrincipalTag/キー"}</code></td>

<td>{"主体のタグによるABAC"}</td>

</tr>

<tr>

<td><code>{"aws:PrincipalOrgID"}</code></td>

<td>{"組織内のアカウントに限定"}</td>

</tr>

<tr>

<td><code>{"aws:MultiFactorAuthPresent"}</code></td>

<td>{"MFAを使った場合のみ許可"}</td>

</tr>

<tr>

<td><code>{"aws:SourceArn"}</code>{" / "}<code>{"aws:SourceAccount"}</code></td>

<td>{"混乱した代理問題の対策（Step 3）"}</td>

</tr>

<tr>

<td><code>{"kms:ViaService"}</code></td>

<td>{"特定サービス経由のKMS利用に限定（Step 11）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"2-6 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 9">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"AWSマネージドポリシーで始め、"}<strong>{"カスタマー管理ポリシーで絞り込む"}</strong></td>

<td>{"広すぎる権限を避ける"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><code>{"\"Action\": \"*\""}</code>{" と "}<code>{"\"Resource\": \"*\""}</code>{" の同時使用を避ける"}</td>

<td>{"事実上の管理者権限になる"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"開発中はアクセスアドバイザー／ポリシー生成などで、実際に使った権限に絞る"}</td>

<td>{"最小権限の継続的な見直し"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"条件キーでHTTPS・MFA・組織を強制"}</td>

<td>{"多層防御"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"rootユーザーは日常で使わない"}</td>

<td>{"権限が無制限"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「明示的なDenyとAllowが競合したら？」→ "}<strong>{"Denyが勝つ"}</strong>{"。"}</li>
{" "}
<li>{"「ポリシーを何もアタッチしていない新規ユーザーの権限は？」→ "}<strong>{"暗黙のDenyで何もできない"}</strong>{"。"}</li>
{" "}
<li>{"「アクセス許可の境界だけでAllowされる？」→ "}<strong>{"されない"}</strong>{"（境界は上限であり、許可を付与しない）。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"IAMポリシーの評価ロジック："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html"}</a></li>
{" "}
<li>{"IAMのポリシーとアクセス許可："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html"}</a></li>
{" "}
<li>{"IAMのセキュリティベストプラクティス："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html"}</a></li>
{" "}
<li>{"ABAC："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html">{"https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
