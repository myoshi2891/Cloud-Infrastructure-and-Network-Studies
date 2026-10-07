import { Diagram } from '../Diagram';
/** 原本のStep 17　データ分類：PII・PHIなど（Skill 2.3.1）を省略せず収録。 */
export function Step17() { return (<section className="section">
<h2 id="step-17" tabIndex={-1}>{"Step 17 データ分類：PII・PHIなど（Skill 2.3.1）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「データ分類（例：個人を特定できる情報［PII］、保護対象医療情報［PHI］）を説明する」"}</strong></p>
{" "}
<h3>{"17-1 なぜ分類するのか"}</h3>
{" "}
<p><strong>{"守るべきデータの重要度に応じて、保護の強さを変える"}</strong>{"ためです。すべてを最高レベルで守るのは非効率で、逆に分類しないと重要データが守られません。"}</p>
{" "}
<h3>{"17-2 代表的なデータ区分"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"区分"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"PII"}</strong>{"（Personally Identifiable Information）"}</td>

<td>{"個人を特定できる情報"}</td>

<td>{"氏名、住所、メールアドレス、電話番号、マイナンバー、パスポート番号、IPアドレス（文脈による）"}</td>

</tr>

<tr>

<td><strong>{"PHI"}</strong>{"（Protected Health Information）"}</td>

<td>{"個人に紐づく"}<strong>{"医療・健康情報"}</strong></td>

<td>{"診断名、検査結果、診療履歴、保険情報（医療情報の取り扱い規制の対象）"}</td>

</tr>

<tr>

<td><strong>{"決済カード情報"}</strong></td>

<td>{"クレジットカード番号など"}</td>

<td>{"PANなど（PCI DSSの対象）"}</td>

</tr>

<tr>

<td>{"認証情報"}</td>

<td>{"パスワード、APIキー、トークン、秘密鍵"}</td>

<td>{"Step 19で厳格に管理"}</td>

</tr>

<tr>

<td>{"機密事業情報"}</td>

<td>{"企業秘密、契約、財務"}</td>

<td>{"社内規程で分類"}</td>

</tr>

<tr>

<td>{"公開情報"}</td>

<td>{"公開しても問題ない"}</td>

<td>{"製品カタログなど"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"法令（個人情報保護法、GDPR、HIPAAなど）は、対象となる情報の定義と保護義務が異なります。"}<strong>{"試験ではPII／PHIの意味と、分類に応じた保護策の選択"}</strong>{"が問われます。"}</p>{" "}</blockquote>
{" "}
<h3>{"17-3 分類レベルの例と、対応する保護策"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"分類"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"暗号化"}</th>

<th scope="col">{"アクセス制御"}</th>

<th scope="col">{"追加対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"公開"}</td>

<td>{"製品情報"}</td>

<td>{"転送中のみ"}</td>

<td>{"緩やか"}</td>

<td>{"-"}</td>

</tr>

<tr>

<td>{"社内限定"}</td>

<td>{"社内資料"}</td>

<td>{"保管時＋転送中"}</td>

<td>{"ロールベース"}</td>

<td>{"ログ取得"}</td>

</tr>

<tr>

<td>{"機密"}</td>

<td>{"顧客PII"}</td>

<td><strong>{"KMS（カスタマーマネージドキー）"}</strong>{"、必要に応じ項目単位"}</td>

<td><strong>{"最小権限"}</strong>{"、MFA"}</td>

<td>{"監査ログ、マスキング、保持期間の設定"}</td>

</tr>

<tr>

<td>{"最重要"}</td>

<td>{"PHI、カード情報、認証情報"}</td>

<td>{"クライアントサイド暗号化も検討"}</td>

<td><strong>{"厳格な分離"}</strong>{"、承認制"}</td>

<td>{"専用アカウント／キー、ログへの出力禁止"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"17-4 AWSで分類を実装・支援する機能"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"役割"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Amazon Macie"}</strong></td>

<td>{"S3内の"}<strong>{"機密データ（PIIなど）を自動検出・分類"}</strong>{"し、リスクを可視化"}</td>

</tr>

<tr>

<td><strong>{"タグ付け"}</strong></td>

<td>{"リソース・S3オブジェクトに"}<code>{"DataClassification=Confidential"}</code>{"などのタグ → "}<strong>{"ABAC"}</strong>{"や課金・監査に活用"}</td>

</tr>

<tr>

<td><strong>{"KMSキーの分離"}</strong></td>

<td>{"分類レベルごとにキーを分け、利用者を絞る"}</td>

</tr>

<tr>

<td><strong>{"S3ライフサイクル／保持設定"}</strong></td>

<td>{"保持期間・削除ルールの自動化"}</td>

</tr>

<tr>

<td><strong>{"CloudWatch Logsのデータ保護ポリシー"}</strong></td>

<td>{"ログ内の機密データを検出・マスク（Step 20）"}</td>

</tr>

<tr>

<td><strong>{"Amazon Comprehend"}</strong></td>

<td>{"テキストからPIIを検出（"}<code>{"DetectPiiEntities"}</code>{"）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<div className="diagram-card">
<Diagram index={23} label="Step 17　データ分類：PII・PHIなど（Skill 2.3.1）の図解" />
</div>
{" "}
<h3>{"17-5 ベストプラクティス"}</h3>
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

<td><strong>{"データを収集する段階で分類"}</strong>{"し、不要な個人情報は"}<strong>{"そもそも集めない"}</strong>{"（データ最小化）"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"分類をタグで機械可読にし、アクセス制御・暗号化・ライフサイクルに自動連動"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"PII／PHIは、"}<strong>{"ログ・エラーメッセージ・URL・環境変数に出さない"}</strong></td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"保持期間"}</strong>{"を定め、不要になったら削除"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"分類ごとに"}<strong>{"KMSキー・IAMロールを分け"}</strong>{"、影響範囲を限定"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"Macieなどで"}<strong>{"意図しない場所に機密データがないか"}</strong>{"継続的に点検"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"本番データを"}<strong>{"開発・テスト環境にそのまま持ち込まない"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「PHIとは決済カード番号」→ "}<strong>{"誤り"}</strong>{"（PHIは医療・健康情報）。"}</li>
{" "}
<li>{"「S3内のPIIを自動で検出したい」→ "}<strong>{"Amazon Macie"}</strong>{"。"}</li>
{" "}
<li>{"「全データに同じ最高レベルの保護を一律に適用」→ "}<strong>{"非効率"}</strong>{"。分類に応じて調整。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"Amazon Macieとは："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html">{"https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"}</a></li>
{" "}
<li>{"データ分類（AWSホワイトペーパー）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/whitepapers/latest/data-classification/data-classification.html">{"https://docs.aws.amazon.com/whitepapers/latest/data-classification/data-classification.html"}</a></li>
{" "}
<li>{"Amazon Comprehend：PII検出："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"}</a></li>
{" "}
<li>{"S3オブジェクトのタグ付け："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-tagging.html"}</a></li>
{" "}
<li>{"AWSのHIPAA対応："}<a target="_blank" rel="noopener" href="https://aws.amazon.com/compliance/hipaa-compliance/">{"https://aws.amazon.com/compliance/hipaa-compliance/"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
