import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 20　サニタイズとデータマスキング（Skill 2.3.4・2.3.5）を省略せず収録。 */
export function Step20() { return (<section className="section">
<h2 id="step-20" tabIndex={-1}>{"Step 20 サニタイズとデータマスキング（Skill 2.3.4・2.3.5）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"Skill 2.3.4"}</strong>{"「機密データを"}<strong>{"サニタイズ"}</strong>{"する」"}</li>
{" "}
<li><strong>{"Skill 2.3.5"}</strong>{"「"}<strong>{"アプリケーションレベルのデータマスキングとサニタイズ"}</strong>{"を実装する」"}</li>
{" "}
</ul>
{" "}
<h3>{"20-1 用語を整理する"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 91">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"サニタイズ（sanitize）"}</strong></td>

<td>{"不要・危険な部分を"}<strong>{"取り除く／無害化"}</strong>{"する。機密のログ出力の除去や、入力の無害化"}</td>

<td>{"ログからトークンを除去、入力のエスケープ"}</td>

</tr>

<tr>

<td><strong>{"マスキング（masking）"}</strong></td>

<td>{"一部を伏せて"}<strong>{"表示を隠す"}</strong>{"（元の値は別の場所に存在）"}</td>

<td><code>{"4111-****-****-1111"}</code>{"、"}<code>{"t***@example.com"}</code></td>

</tr>

<tr>

<td><strong>{"リダクション（redaction）"}</strong></td>

<td>{"機密部分を"}<strong>{"完全に削除・黒塗り"}</strong></td>

<td><code>{"[REDACTED]"}</code></td>

</tr>

<tr>

<td><strong>{"トークン化"}</strong></td>

<td>{"機密値を"}<strong>{"無意味な代替値（トークン）"}</strong>{"に置換し、本物は別の安全な場所に保管"}</td>

<td>{"カード番号→トークン"}</td>

</tr>

<tr>

<td><strong>{"ハッシュ化"}</strong></td>

<td>{"元に戻せない値に変換"}</td>

<td>{"パスワード（ソルト＋低速ハッシュ）、一意性の検索キー"}</td>

</tr>

<tr>

<td><strong>{"匿名化／仮名化"}</strong></td>

<td>{"個人が特定できなくする／別名で置換"}</td>

<td>{"テスト用データの作成"}</td>

</tr>

<tr>

<td><strong>{"暗号化"}</strong></td>

<td>{"鍵で元に戻せる形で保護"}</td>

<td>{"KMS、Encryption SDK"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><strong>{"暗号化は「鍵があれば元に戻る」、マスキング・ハッシュ化は「元に戻さない／見せない」"}</strong>{"という違いが重要です。"}</p>{" "}</blockquote>
{" "}
<h3>{"20-2 機密データが漏れる主な経路"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={28} label="Step 20　サニタイズとデータマスキング（Skill 2.3.4・2.3.5）の図解" />
</div>
{" "}
<h3>{"20-3 アプリケーションレベルの実装例"}</h3>
{" "}
<p><strong>{"表示用マスキング"}</strong></p>
{" "}
<CodeBlock index={32} language="python" lines={["import re","","def mask_email(email: str) -> str:","    local, _, domain = email.partition(\"@\")","    return (local[:1] + \"***@\" + domain) if domain else \"***\"","","def mask_card(number: str) -> str:","    digits = re.sub(r\"\\D\", \"\", number)","    return \"*\" * (len(digits) - 4) + digits[-4:]","","print(mask_email(\"taro@example.com\"))   # t***@example.com","print(mask_card(\"4111 1111 1111 1111\")) # ************1111"]} />
{" "}
<p><strong>{"ログのサニタイズ（ロギングフィルター）"}</strong></p>
{" "}
<CodeBlock index={33} language="python" lines={["import logging","import re","","SENSITIVE = [","    (re.compile(r\"(?i)(password|secret|token|api[_-]?key)\\s*[:=]\\s*\\S+\"), r\"\\1=[REDACTED]\"),","    (re.compile(r\"\\b\\d{4}[- ]?\\d{4}[- ]?\\d{4}[- ]?\\d{4}\\b\"), \"[CARD]\"),","]","","class RedactFilter(logging.Filter):","    def filter(self, record):","        msg = record.getMessage()","        for pattern, repl in SENSITIVE:","            msg = pattern.sub(repl, msg)","        record.msg, record.args = msg, ()","        return True","","logger = logging.getLogger(\"app\")","logger.addFilter(RedactFilter())"]} />
{" "}
<p><strong>{"レスポンスの最小化（必要な項目だけ返す）"}</strong></p>
{" "}
<CodeBlock index={34} language="python" lines={["def to_public_user(user: dict) -> dict:","    allowed = {\"id\", \"display_name\", \"created_at\"}","    return {k: v for k, v in user.items() if k in allowed}  # 許可リスト方式"]} />
{" "}
<blockquote>{" "}<p><strong>{"許可リスト（allow-list）方式"}</strong>{"：返す項目を明示的に指定すると、新しい機密項目が追加されても"}<strong>{"うっかり漏れません"}</strong>{"。"}</p>{" "}</blockquote>
{" "}
<h3>{"20-4 AWSの機能による支援"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 92">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"CloudWatch Logsのデータ保護ポリシー"}</strong></td>

<td>{"ログ内の機密データ（個人情報など）を"}<strong>{"検出し、マスク"}</strong>{"。マスクされていない値は、権限（"}<code>{"logs:Unmask"}</code>{"）のある人だけが参照可能"}</td>

</tr>

<tr>

<td><strong>{"Amazon Macie"}</strong></td>

<td>{"S3内の機密データを検出（保存先の点検）"}</td>

</tr>

<tr>

<td><strong>{"Amazon Comprehend"}</strong></td>

<td>{"テキスト内のPIIを検出・（編集用に）位置を特定"}</td>

</tr>

<tr>

<td><strong>{"API Gatewayのマッピングテンプレート／レスポンス変換"}</strong></td>

<td>{"レスポンスに含める項目を制限"}</td>

</tr>

<tr>

<td><strong>{"Amazon Bedrock Guardrails"}</strong></td>

<td>{"生成AIの入出力から機密情報をフィルタ（Step 22）"}</td>

</tr>

<tr>

<td><strong>{"X-Ray"}</strong></td>

<td>{"アノテーション／メタデータに機密を入れない設計"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"20-5 入力のサニタイズ（セキュアコーディング）"}</h3>
{" "}
<p>{"機密データの保護と並んで、"}<strong>{"外部入力を信用しない"}</strong>{"ことも基本です。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 93">
<table>

<thead>

<tr>

<th scope="col">{"脅威"}</th>

<th scope="col">{"対策"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"SQLインジェクション"}</td>

<td><strong>{"パラメータ化クエリ（プレースホルダ）"}</strong>{"、ORM"}</td>

</tr>

<tr>

<td>{"NoSQLインジェクション"}</td>

<td>{"入力の型・形式を検証"}</td>

</tr>

<tr>

<td>{"XSS"}</td>

<td>{"出力時のエスケープ、コンテンツセキュリティポリシー"}</td>

</tr>

<tr>

<td>{"コマンドインジェクション"}</td>

<td>{"シェル呼び出しを避ける、入力の許可リスト検証"}</td>

</tr>

<tr>

<td>{"パストラバーサル"}</td>

<td>{"パス正規化、許可ディレクトリの外を拒否"}</td>

</tr>

<tr>

<td>{"過大な入力"}</td>

<td>{"サイズ制限、API Gatewayのリクエスト検証（スキーマ）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<CodeBlock index={35} language="python" lines={["# 悪い例（SQLインジェクション）","cursor.execute(f\"SELECT * FROM users WHERE id = '{user_input}'\")","","# 良い例（パラメータ化）","cursor.execute(\"SELECT * FROM users WHERE id = %s\", (user_input,))"]} />
{" "}
<h3>{"20-6 テスト・開発環境のデータ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 94">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"合成データ（ダミー）"}</td>

<td>{"本番に似せた架空データを生成"}</td>

</tr>

<tr>

<td>{"匿名化／マスキングしたコピー"}</td>

<td>{"本番データを変換してから非本番へ"}</td>

</tr>

<tr>

<td>{"アクセス分離"}</td>

<td>{"非本番環境から本番データストアへの権限を与えない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"20-7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 95">
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

<td><strong>{"ログに機密を出さない"}</strong>{"を原則に、ロギングフィルターとCloudWatch Logsのデータ保護で二重に防ぐ"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"レスポンスは"}<strong>{"許可リスト方式"}</strong>{"で最小限に"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"表示は"}<strong>{"マスキング"}</strong>{"、保管は"}<strong>{"暗号化"}</strong>{"、検索用には"}<strong>{"ハッシュ"}</strong>{"など目的で使い分け"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"パスワードは"}<strong>{"ソルト付きの低速ハッシュ"}</strong>{"（bcrypt／Argon2等）。自前で暗号化して保存しない（Cognito等に委任が望ましい）"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"URL・クエリ文字列に機密を載せない（POSTのボディやヘッダー）"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"非本番環境には"}<strong>{"合成データ"}</strong>{"または"}<strong>{"匿名化データ"}</strong></td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"入力は"}<strong>{"検証（許可リスト）＋パラメータ化"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「ログにカード番号が出てしまった。対策は？」→ "}<strong>{"ログ出力前のサニタイズ／CloudWatch Logsデータ保護ポリシー"}</strong>{"。"}</li>
{" "}
<li>{"「パスワードを暗号化して保存」→ 通常は"}<strong>{"ハッシュ化"}</strong>{"（復号できる必要がない）。"}</li>
{" "}
<li>{"「マスキング済みなので暗号化は不要」→ "}<strong>{"誤り"}</strong>{"（保管データは別途暗号化が必要）。"}</li>
{" "}
<li>{"「テスト環境で本番データをそのまま使う」→ "}<strong>{"不適切"}</strong>{"（匿名化・合成データ）。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"CloudWatch Logsの機密データのマスク（データ保護ポリシー）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/mask-sensitive-log-data.html"}</a></li>
{" "}
<li>{"Amazon Macie："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html">{"https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html"}</a></li>
{" "}
<li>{"Amazon ComprehendのPII検出："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"}</a></li>
{" "}
<li>{"API Gatewayのリクエスト検証："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-method-request-validation.html"}</a></li>
{" "}
<li>{"OWASP Top 10："}<a target="_blank" rel="noopener" href="https://owasp.org/www-project-top-ten/">{"https://owasp.org/www-project-top-ten/"}</a></li>
{" "}
<li>{"OWASP Input Validation Cheat Sheet："}<a target="_blank" rel="noopener" href="https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html">{"https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html"}</a></li>
{" "}
<li>{"OWASP SQL Injection Prevention Cheat Sheet："}<a target="_blank" rel="noopener" href="https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html">{"https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html"}</a></li>
{" "}
<li>{"OWASP Password Storage Cheat Sheet："}<a target="_blank" rel="noopener" href="https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html">{"https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
