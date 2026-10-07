import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 16　キーローテーションの有効化と無効化（Skill 2.2.7）を省略せず収録。 */
export function Step16() { return (<section className="section">
<h2 id="step-16" tabIndex={-1}>{"Step 16 キーローテーションの有効化と無効化（Skill 2.2.7）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「キーローテーションを有効化・無効化する」"}</strong>{"：対象となるキー、既定の期間、手動・オンデマンドの違い。"}</p>
{" "}
<h3>{"16-1 ローテーションとは"}</h3>
{" "}
<p>{"KMSキーの"}<strong>{"裏側の暗号化素材（キーマテリアル）を新しいものに切り替える"}</strong>{"ことです。"}<strong>{"キーID・ARN・エイリアスは変わりません"}</strong>{"。以前のキーマテリアルは保持されるため、"}<strong>{"過去に暗号化したデータも復号できます"}</strong>{"（アプリの変更・再暗号化は不要）。"}</p>
{" "}
<div className="diagram-card">
<Diagram index={21} label="Step 16　キーローテーションの有効化と無効化（Skill 2.2.7）の図解" />
</div>
{" "}
<h3>{"16-2 ローテーションの種類"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"対象"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"自動ローテーション"}</strong></td>

<td>{"設定した周期で自動"}</td>

<td>{"対称暗号化KMSキー（鍵素材をKMSが生成した"}<code>{"AWS_KMS"}</code>{"起源）の"}<strong>{"カスタマーマネージドキー"}</strong></td>

</tr>

<tr>

<td><strong>{"オンデマンドローテーション"}</strong></td>

<td>{"任意のタイミングで即時実行（自動ローテーションの有無に関係なく可能）"}</td>

<td>{"対称暗号化のカスタマーマネージドキー"}</td>

</tr>

<tr>

<td><strong>{"手動ローテーション"}</strong></td>

<td>{"新しいキーを作り、"}<strong>{"エイリアスを付け替える"}</strong></td>

<td>{"自動・オンデマンドに非対応のキー（非対称、HMAC、カスタムキーストア等）"}</td>

</tr>

<tr>

<td><strong>{"AWSマネージドキー"}</strong></td>

<td><strong>{"AWSが毎年自動"}</strong>{"（利用者は有効・無効を切り替えられない）"}</td>

<td>{"-"}</td>

</tr>

<tr>

<td><strong>{"AWS所有キー"}</strong></td>

<td>{"サービス側が管理"}</td>

<td>{"利用者は操作不可"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"16-3 自動ローテーションの主な仕様"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"既定の周期"}</td>

<td><strong>{"365日"}</strong></td>

</tr>

<tr>

<td>{"カスタム周期"}</td>

<td>{"設定可能（90〜2,560日）"}</td>

</tr>

<tr>

<td>{"無効化されたキー"}</td>

<td>{"ローテーションされない"}</td>

</tr>

<tr>

<td>{"削除待ちのキー"}</td>

<td>{"ローテーションされない"}</td>

</tr>

<tr>

<td>{"監視"}</td>

<td>{"CloudTrail／CloudWatchで確認可能"}</td>

</tr>

<tr>

<td>{"対象外（手動が必要）"}</td>

<td>{"非対称キー、HMACキー、カスタムキーストアのキー。インポートした鍵素材は"}<strong>{"自動ローテーション対象外"}</strong>{"（対称キーのオンデマンドローテーションは対応）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"16-4 有効化・無効化（CLI／API）"}</h3>
{" "}
<CodeBlock language="bash" lines={["# 自動ローテーションを有効化（既定は365日）","aws kms enable-key-rotation --key-id alias/my-app-key","","# 周期を指定して有効化","aws kms enable-key-rotation --key-id alias/my-app-key --rotation-period-in-days 180","","# 状態を確認","aws kms get-key-rotation-status --key-id alias/my-app-key","","# 今すぐローテーション（オンデマンド）","aws kms rotate-key-on-demand --key-id alias/my-app-key","","# 自動ローテーションを無効化","aws kms disable-key-rotation --key-id alias/my-app-key"]} />
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"API"}</th>

<th scope="col">{"役割"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"EnableKeyRotation"}</code></td>

<td>{"自動ローテーションを有効化"}</td>

</tr>

<tr>

<td><code>{"DisableKeyRotation"}</code></td>

<td>{"自動ローテーションを無効化"}</td>

</tr>

<tr>

<td><code>{"GetKeyRotationStatus"}</code></td>

<td>{"状態を確認"}</td>

</tr>

<tr>

<td><code>{"RotateKeyOnDemand"}</code></td>

<td>{"即時ローテーション"}</td>

</tr>

<tr>

<td><code>{"ListKeyRotations"}</code></td>

<td>{"ローテーション履歴を取得"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"16-5 手動ローテーション（エイリアスの付け替え）"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={22} label="Step 16　キーローテーションの有効化と無効化（Skill 2.2.7）の図解" />
</div>
{" "}
<ul>
{" "}
<li>{"アプリが"}<strong>{"エイリアス"}</strong>{"を参照していれば、コード変更なしで切り替えられます。"}</li>
{" "}
<li>{"古いキーは、古いデータの復号が必要なうちは"}<strong>{"削除しません"}</strong>{"。"}</li>
{" "}
</ul>
{" "}
<h3>{"16-6 他のローテーションとの違い"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"対象"}</th>

<th scope="col">{"ローテーション方法"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"KMSのキーマテリアル"}</td>

<td>{"本Stepのとおり（自動・オンデマンド・手動）"}</td>

</tr>

<tr>

<td><strong>{"Secrets Managerのシークレット"}</strong></td>

<td>{"Lambdaによる"}<strong>{"自動ローテーション"}</strong>{"（Step 19）"}</td>

</tr>

<tr>

<td>{"IAMのアクセスキー（長期）"}</td>

<td>{"手動または運用で定期的に更新（使わないのが理想）"}</td>

</tr>

<tr>

<td>{"ACM証明書"}</td>

<td>{"ACMが自動更新（Step 13）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"16-7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"カスタマーマネージドキー（対称）は"}<strong>{"自動ローテーションを有効"}</strong>{"にする"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"組織の規程があれば"}<strong>{"カスタム周期"}</strong>{"を設定"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"アプリは"}<strong>{"キーIDではなくエイリアス"}</strong>{"を参照"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"ローテーションは"}<strong>{"暗号文の再暗号化を不要にする"}</strong>{"ため、運用負荷が低い"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"コンプライアンスはAWS Configのルール（キーローテーション有効の確認）で継続監視"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「ローテーションするとキーARNが変わる」→ "}<strong>{"誤り"}</strong>{"（変わらない）。"}</li>
{" "}
<li>{"「ローテーション後、古いデータが復号できなくなる」→ "}<strong>{"誤り"}</strong>{"（古い素材が保持される）。"}</li>
{" "}
<li>{"「AWSマネージドキーのローテーションを無効にしたい」→ "}<strong>{"不可"}</strong>{"（毎年自動）。"}</li>
{" "}
<li>{"「非対称キーの自動ローテーション」→ "}<strong>{"不可"}</strong>{"（手動で新キーに切り替え）。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"KMSキーのローテーション："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html"}</a></li>
{" "}
<li>{"RotateKeyOnDemand API："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/APIReference/API_RotateKeyOnDemand.html">{"https://docs.aws.amazon.com/kms/latest/APIReference/API_RotateKeyOnDemand.html"}</a></li>
{" "}
<li>{"EnableKeyRotation API："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKeyRotation.html">{"https://docs.aws.amazon.com/kms/latest/APIReference/API_EnableKeyRotation.html"}</a></li>
{" "}
<li>{"インポートキーのオンデマンドローテーション（AWSセキュリティブログ）："}<a target="_blank" rel="noopener" href="https://aws.amazon.com/blogs/security/how-to-use-on-demand-rotation-for-aws-kms-imported-keys/">{"https://aws.amazon.com/blogs/security/how-to-use-on-demand-rotation-for-aws-kms-imported-keys/"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
