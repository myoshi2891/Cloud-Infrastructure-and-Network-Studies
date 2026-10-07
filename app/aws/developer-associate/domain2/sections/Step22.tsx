import { CodeBlock } from '../CodeBlock';
/** 原本のStep 22　AIサービスを組み込むときのセキュリティ（新興トピック）を省略せず収録。 */
export function Step22() { return (<section className="section">
<h2 id="step-22" tabIndex={-1}>{"Step 22 AIサービスを組み込むときのセキュリティ（新興トピック）"}</h2>
{" "}
<h3>{"位置づけ"}</h3>
{" "}
<p>{"公式の試験ガイドは「新興トピック（Emerging topics）」として、"}<strong>{"AIサービスを開発に統合する際のセキュリティリスクの特定と軽減"}</strong>{"（データプライバシー制御、アクセス管理、AIモデルの入出力の制御、AIエージェントのやり取りの保護、機密コンテンツがログに出ないようにすること）を挙げています。これらは"}<strong>{"採点対象外のプレテスト問題として出る可能性がある"}</strong>{"とされています。配点には影響しませんが、現場で重要なため基本を押さえます。"}</p>
{" "}
<h3>{"22-1 リスクと対策の対応表"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"リスク"}</th>

<th scope="col">{"具体例"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"過剰な権限"}</strong></td>

<td>{"AIを呼ぶロールが"}<code>{"bedrock:*"}</code>{"＋"}<code>{"Resource: *"}</code></td>

<td><code>{"bedrock:InvokeModel"}</code>{"を"}<strong>{"特定のモデルARN"}</strong>{"に限定"}</td>

</tr>

<tr>

<td><strong>{"機密データの漏えい（入力）"}</strong></td>

<td>{"プロンプトにPII・シークレットを含める"}</td>

<td>{"送信前の"}<strong>{"マスキング／リダクション"}</strong>{"、Guardrailsの機密情報フィルター"}</td>

</tr>

<tr>

<td><strong>{"機密データの漏えい（出力）"}</strong></td>

<td>{"モデルがPIIや内部情報を出力"}</td>

<td>{"出力のフィルタリング、ガードレール"}</td>

</tr>

<tr>

<td><strong>{"プロンプトインジェクション"}</strong></td>

<td>{"入力に「前の指示を無視して…」と埋め込まれる"}</td>

<td>{"入力の検証、システム指示と外部データの分離、"}<strong>{"出力を信頼しない"}</strong></td>

</tr>

<tr>

<td><strong>{"ログへの機密混入"}</strong></td>

<td>{"プロンプト・応答の全文を平文でログ"}</td>

<td>{"ログ出力の制限、CloudWatch Logsのデータ保護、保持期間の設定"}</td>

</tr>

<tr>

<td><strong>{"エージェントの過剰な操作"}</strong></td>

<td>{"AIエージェントが任意のAPIを実行"}</td>

<td>{"ツールごとの"}<strong>{"最小権限ロール"}</strong>{"、人間の承認、操作の許可リスト"}</td>

</tr>

<tr>

<td><strong>{"データの学習利用・保管"}</strong></td>

<td>{"機密データが意図せず外部へ"}</td>

<td>{"サービスのデータ取り扱い方針を確認、暗号化、VPCエンドポイント"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"22-2 最小権限の例"}</h3>
{" "}
<CodeBlock language="json" lines={["{","  \"Effect\": \"Allow\",","  \"Action\": [\"bedrock:InvokeModel\"],","  \"Resource\": \"arn:aws:bedrock:ap-northeast-1::foundation-model/<利用するモデルID>\"","}"]} />
{" "}
<h3>{"22-3 押さえるべき考え方"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ポイント"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"AIも"}<strong>{"通常のAWSサービスと同じ"}</strong>{"セキュリティ原則（IAM最小権限・暗号化・ログ・シークレット管理）で守る"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"モデルの出力は信頼できない入力"}</strong>{"として扱う（SQL・シェルへ直接渡さない、必ず検証）"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"プロンプト・応答に"}<strong>{"機密を含めない／含める場合はマスキング"}</strong>{"し、ログを制御する"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"AIエージェントには、実行できるツール・権限を最小限に"}</strong>{"する"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"AIによるコード生成・レビュー結果も、"}<strong>{"人間がレビュー"}</strong>{"し、セキュリティスキャンを通す"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"試験ガイド：Emerging topics："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html">{"https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html"}</a></li>
{" "}
<li>{"Amazon Bedrock Guardrails："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a></li>
{" "}
<li>{"Amazon Bedrockのセキュリティ："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/bedrock/latest/userguide/security.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/security.html"}</a></li>
{" "}
<li>{"OWASP Top 10 for LLM Applications："}<a target="_blank" rel="noopener" href="https://owasp.org/www-project-top-10-for-large-language-model-applications/">{"https://owasp.org/www-project-top-10-for-large-language-model-applications/"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
