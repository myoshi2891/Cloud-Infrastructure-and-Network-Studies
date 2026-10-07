import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 11　AWS KMSと鍵の使い方（Skill 2.2.4）を省略せず収録。 */
export function Step11() { return (<section className="section">
<h2 id="step-11" tabIndex={-1}>{"Step 11 AWS KMSと鍵の使い方（Skill 2.2.4）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「暗号化鍵を使ってデータを暗号化・復号する」"}</strong>{"：KMSの鍵の種類、エンベロープ暗号化、鍵ポリシー、主なAPIを理解すること。"}</p>
{" "}
<h3>{"11-1 AWS KMSとは"}</h3>
{" "}
<p><strong>{"鍵の作成・保管・利用管理を行うマネージドサービス"}</strong>{"です。KMSキー（旧称CMK）の"}<strong>{"平文の鍵素材は、KMSの外に出ません"}</strong>{"。アプリはKMSにAPIで「暗号化して」「復号して」と依頼します。"}</p>
{" "}
<h3>{"11-2 KMSキーの種類"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"作成・管理"}</th>

<th scope="col">{"ローテーション"}</th>

<th scope="col">{"鍵ポリシーの編集"}</th>

<th scope="col">{"備考"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWS所有キー"}</strong></td>

<td>{"AWSが内部で管理"}</td>

<td>{"AWS側で管理"}</td>

<td>{"不可"}</td>

<td>{"アカウントのKMSには表示されない。無料"}</td>

</tr>

<tr>

<td><strong>{"AWSマネージドキー"}</strong></td>

<td>{"サービスが作成（例："}<code>{"aws/s3"}</code>{"）"}</td>

<td><strong>{"自動で毎年"}</strong></td>

<td>{"不可"}</td>

<td>{"有効化・無効化の操作は不可"}</td>

</tr>

<tr>

<td><strong>{"カスタマーマネージドキー"}</strong></td>

<td><strong>{"利用者が作成・管理"}</strong></td>

<td>{"任意で有効化"}</td>

<td><strong>{"可"}</strong></td>

<td>{"細かな制御、クロスアカウント共有、監査に向く"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"11-3 KMSキーのタイプ"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"タイプ"}</th>

<th scope="col">{"用途"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"対称（AES-256-GCM）"}</td>

<td>{"暗号化／復号。AWSサービス統合で一般的"}</td>

</tr>

<tr>

<td>{"非対称（RSA／ECC）"}</td>

<td>{"署名・検証、または公開鍵暗号"}</td>

</tr>

<tr>

<td>{"HMAC"}</td>

<td>{"メッセージ認証コード（MAC）の生成・検証"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"11-4 エンベロープ暗号化（最重要）"}</h3>
{" "}
<p>{"KMSの"}<code>{"Encrypt"}</code>{"APIで直接暗号化できるのは"}<strong>{"最大4KB（4,096バイト）"}<strong>{"です。大きなデータは"}</strong>{"データキーでデータを暗号化し、そのデータキーをKMSキーで暗号化"}</strong>{"する方式（エンベロープ暗号化）で扱います。"}</p>
{" "}
<div className="diagram-card">
<Diagram index={14} label="Step 11　AWS KMSと鍵の使い方（Skill 2.2.4）の図解" />
</div>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"手順"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"暗号化"}</td>

<td><code>{"GenerateDataKey"}</code>{" →平文データキーでデータを暗号化→平文キーを破棄→暗号文と暗号化済みデータキーを一緒に保存"}</td>

</tr>

<tr>

<td>{"復号"}</td>

<td>{"暗号化済みデータキーを"}<code>{"Decrypt"}</code>{"でKMSに復号させる→平文データキーでデータを復号"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"利点：大きなデータでも"}<strong>{"KMSへの通信は小さなキーだけ"}</strong>{"で済み、データはローカルで高速に処理できる。S3のSSE-KMSもこの方式で動いています。"}</p>{" "}</blockquote>
{" "}
<h3>{"11-5 主なKMS API"}</h3>
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

<td><code>{"Encrypt"}</code>{" / "}<code>{"Decrypt"}</code></td>

<td>{"小さなデータ（最大4KB）の暗号化・復号"}</td>

</tr>

<tr>

<td><code>{"GenerateDataKey"}</code></td>

<td>{"データキー（平文＋暗号化済み）を生成"}</td>

</tr>

<tr>

<td><code>{"GenerateDataKeyWithoutPlaintext"}</code></td>

<td>{"暗号化済みデータキーのみ生成（後で使う用）"}</td>

</tr>

<tr>

<td><code>{"ReEncrypt"}</code></td>

<td>{"平文を出さずに別のキーで暗号化し直す"}</td>

</tr>

<tr>

<td><code>{"CreateGrant"}</code></td>

<td>{"一時的・限定的な権限を付与"}</td>

</tr>

<tr>

<td><code>{"Sign"}</code>{" / "}<code>{"Verify"}</code></td>

<td>{"非対称キーでの署名"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"11-6 暗号化コンテキスト（Encryption Context）"}</h3>
{" "}
<p>{"暗号化・復号の際に渡す"}<strong>{"追加の認証データ（AAD）"}<strong>{"で、秘密ではないキーと値のペアです。復号時に同じコンテキストが必要になり、"}<strong>{"改ざん・取り違えの検知"}</strong>{"と、CloudTrailでの"}</strong>{"監査"}</strong>{"に役立ちます。"}</p>
{" "}
<CodeBlock language="python" lines={["import boto3","","kms = boto3.client(\"kms\")","key_id = \"alias/my-app-key\"","","enc = kms.encrypt(","    KeyId=key_id,","    Plaintext=b\"my small secret\",","    EncryptionContext={\"app\": \"orders\", \"tenant\": \"t-001\"},",")","blob = enc[\"CiphertextBlob\"]","","dec = kms.decrypt(","    CiphertextBlob=blob,","    EncryptionContext={\"app\": \"orders\", \"tenant\": \"t-001\"},  # 一致しないと失敗",")","print(dec[\"Plaintext\"])"]} />
{" "}
<h3>{"11-7 鍵ポリシーとIAMポリシー（KMS独自のルール）"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"KMSキーには必ず鍵ポリシーがあります"}</strong>{"。他のサービスと違い、鍵ポリシーが許可の起点です。"}</li>
{" "}
<li>{"IAMポリシーでKMSを許可するには、"}<strong>{"鍵ポリシーがアカウントのIAMによる制御を許可していること"}</strong>{"（既定の鍵ポリシーはアカウントのrootに許可を委任している）が必要です。"}</li>
{" "}
</ul>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"鍵ポリシー"}</td>

<td>{"キーのリソースベースポリシー。管理者と利用者を分けて定義"}</td>

</tr>

<tr>

<td>{"IAMポリシー"}</td>

<td>{"鍵ポリシーが許す範囲でユーザー／ロールに付与"}</td>

</tr>

<tr>

<td>{"グラント"}</td>

<td>{"一時的・プログラムによる委任（AWSサービスが内部でよく使う）"}</td>

</tr>

<tr>

<td>{"エイリアス"}</td>

<td><code>{"alias/my-app-key"}</code>{"のような分かりやすい名前"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"鍵ポリシーの考え方（管理者と利用者を分離）："}</p>
{" "}
<CodeBlock language="json" lines={["{","  \"Sid\": \"AllowUseOfTheKey\",","  \"Effect\": \"Allow\",","  \"Principal\": { \"AWS\": \"arn:aws:iam::111122223333:role/OrdersAppRole\" },","  \"Action\": [\"kms:Encrypt\", \"kms:Decrypt\", \"kms:GenerateDataKey\"],","  \"Resource\": \"*\",","  \"Condition\": {","    \"StringEquals\": { \"kms:ViaService\": \"s3.ap-northeast-1.amazonaws.com\" }","  }","}"]} />
{" "}
<h3>{"11-8 アプリが使うロールに必要なKMS権限（よくある落とし穴）"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"状況"}</th>

<th scope="col">{"必要な権限"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"SSE-KMSのS3オブジェクトを読む"}</td>

<td><code>{"s3:GetObject"}</code>{" に加え "}<strong><code>{"kms:Decrypt"}</code></strong></td>

</tr>

<tr>

<td>{"SSE-KMSのS3へ書き込む"}</td>

<td><code>{"s3:PutObject"}</code>{" に加え "}<strong><code>{"kms:GenerateDataKey"}</code></strong>{"（必要に応じて"}<code>{"kms:Encrypt"}</code>{"）"}</td>

</tr>

<tr>

<td>{"暗号化SQSに送信"}</td>

<td><code>{"kms:GenerateDataKey"}</code>{" と "}<code>{"kms:Decrypt"}</code></td>

</tr>

<tr>

<td>{"「Access Denied」でS3権限は正しい"}</td>

<td>{"**KMS側の権限（鍵ポリシー／IAM）**を疑う"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"11-9 鍵の削除"}</h3>
{" "}
<ul>
{" "}
<li>{"KMSキーの削除は"}<strong>{"待機期間（7〜30日）"}<strong>{"を経て実行され、その間は"}</strong>{"キャンセル可能"}</strong>{"です。"}</li>
{" "}
<li>{"削除すると、そのキーで暗号化されたデータは"}<strong>{"復号できなくなります"}</strong>{"。削除の前に"}<strong>{"無効化"}</strong>{"して影響を確認するのが定石です。"}</li>
{" "}
</ul>
{" "}
<h3>{"11-10 ベストプラクティス"}</h3>
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

<td>{"4KB超のデータは"}<strong>{"エンベロープ暗号化"}</strong>{"（"}<code>{"GenerateDataKey"}</code>{"）"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"鍵ポリシーで"}<strong>{"管理者と利用者を分離"}</strong>{"し、最小権限にする"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td><code>{"kms:ViaService"}</code>{"で特定サービス経由のみに限定"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"暗号化コンテキスト"}</strong>{"を使って用途を縛り、監査に活かす"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"業務／データ分類ごとにキーを分け、"}<strong>{"エイリアス"}</strong>{"で管理"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"自動ローテーションを有効化（Step 16）"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"CloudTrailでKMS API呼び出しを監査"}</td>

</tr>

<tr>

<td>{"8"}</td>

<td>{"平文のデータキーは"}<strong>{"メモリにだけ置き、使用後に破棄"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「KMSの"}<code>{"Encrypt"}</code>{"で数MBのファイルを直接暗号化」→ "}<strong>{"不可（4KB上限）"}</strong>{"。エンベロープ暗号化。"}</li>
{" "}
<li>{"「KMSキーそのものをダウンロードして使う」→ "}<strong>{"不可"}</strong>{"（鍵素材は取り出せない）。"}</li>
{" "}
<li>{"「S3の読み取り権限があるのに復号できない」→ "}<strong><code>{"kms:Decrypt"}</code>{"が不足"}</strong>{"。"}</li>
{" "}
<li>{"「鍵を即時削除したい」→ "}<strong>{"待機期間7〜30日"}</strong>{"が必須。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"AWS KMSとは："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/overview.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/overview.html"}</a></li>
{" "}
<li>{"KMSの概念（エンベロープ暗号化など）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html"}</a></li>
{" "}
<li>{"鍵ポリシー："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html"}</a></li>
{" "}
<li>{"暗号化コンテキスト："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/encrypt_context.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/encrypt_context.html"}</a></li>
{" "}
<li>{"KMS APIリファレンス："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/APIReference/Welcome.html">{"https://docs.aws.amazon.com/kms/latest/APIReference/Welcome.html"}</a></li>
{" "}
<li>{"KMSキーの削除："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html">{"https://docs.aws.amazon.com/kms/latest/developerguide/deleting-keys.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
