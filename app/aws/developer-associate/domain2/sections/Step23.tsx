import { Diagram } from '../Diagram';
import { ChecklistItem } from '../ChecklistItem';
/** 原本のStep 23　総まとめ：選択フロー・ひっかけ・練習問題を省略せず収録。 */
export function Step23() { return (<section className="section">
<h2 id="step-23" tabIndex={-1}>{"Step 23 総まとめ：選択フロー・ひっかけ・練習問題"}</h2>
{" "}
<h3>{"23-1 「認証・認可」サービス選択フロー"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={32} label="Step 23　総まとめ：選択フロー・ひっかけ・練習問題の図解" />
</div>
{" "}
<h3>{"23-2 「暗号化」判断フロー"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={33} label="Step 23　総まとめ：選択フロー・ひっかけ・練習問題の図解" />
</div>
{" "}
<h3>{"23-3 「機密データ管理」判断フロー"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={34} label="Step 23　総まとめ：選択フロー・ひっかけ・練習問題の図解" />
</div>
{" "}
<h3>{"23-4 サービス別「やること・やってはいけないこと」早見表"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"やること"}</th>

<th scope="col">{"やってはいけないこと"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"IAM"}</td>

<td>{"ロール＋最小権限、条件キー"}</td>

<td><code>{"*:*"}</code>{"の付与、アクセスキーのコード埋め込み"}</td>

</tr>

<tr>

<td>{"STS"}</td>

<td>{"一時認証情報、"}<code>{"ExternalId"}</code></td>

<td>{"長期キーの配布"}</td>

</tr>

<tr>

<td>{"Cognito"}</td>

<td>{"ユーザープール＋PKCE、MFA、トークン検証"}</td>

<td>{"IDトークンでAPI認可、Implicit、未認証アクセスの放置"}</td>

</tr>

<tr>

<td>{"API Gateway"}</td>

<td>{"オーソライザー（JWT／IAM／Lambda）"}</td>

<td>{"APIキーだけで認証したつもりになる"}</td>

</tr>

<tr>

<td>{"KMS"}</td>

<td>{"エンベロープ暗号化、ローテーション、鍵ポリシー分離"}</td>

<td>{"4KB超を直接暗号化、鍵の即時削除"}</td>

</tr>

<tr>

<td>{"S3"}</td>

<td>{"既定暗号化、HTTPS強制、署名付きURLは短期限"}</td>

<td>{"公開設定の放置、HTTP許可"}</td>

</tr>

<tr>

<td>{"ACM／Private CA"}</td>

<td>{"自動更新、DNS検証維持"}</td>

<td>{"本番で自己署名、証明書の期限切れ放置"}</td>

</tr>

<tr>

<td>{"Secrets Manager"}</td>

<td>{"自動ローテーション、最小権限、キャッシュ"}</td>

<td>{"コード・Gitに直書き、ログ出力"}</td>

</tr>

<tr>

<td>{"Parameter Store"}</td>

<td>{"SecureString、パス階層で権限分離"}</td>

<td>{"機密を"}<code>{"String"}</code>{"で保存"}</td>

</tr>

<tr>

<td>{"Lambda環境変数"}</td>

<td>{"参照先だけ入れる、CMK＋最小権限"}</td>

<td>{"平文の機密を入れる"}</td>

</tr>

<tr>

<td>{"マルチテナント"}</td>

<td>{"検証済みクレームでテナント特定、データ層で強制"}</td>

<td>{"リクエストボディのテナントIDを信用"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"23-5 試験頻出の「ひっかけ」総まとめ"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ひっかけ"}</th>

<th scope="col">{"正しい理解"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"明示的DenyとAllowの競合"}</td>

<td><strong>{"Denyが勝つ"}</strong></td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"EC2にアクセスキーを渡す"}</td>

<td><strong>{"インスタンスプロファイル（ロール）"}</strong></td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"IDトークンでAPIを認可"}</td>

<td><strong>{"アクセストークン"}</strong>{"を使う"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"APIキー＝認証"}</td>

<td><strong>{"使用量制御"}</strong>{"であり認証ではない"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"JWTは暗号化されている"}</td>

<td><strong>{"署名のみ"}</strong>{"（中身は読める）"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"KMS Encryptで大きなファイル"}</td>

<td><strong>{"4KB上限"}</strong>{"。エンベロープ暗号化"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"AWSマネージドキーを他アカウントと共有"}</td>

<td><strong>{"不可"}</strong>{"。カスタマーマネージドキー"}</td>

</tr>

<tr>

<td>{"8"}</td>

<td>{"キーローテーションでARNが変わる"}</td>

<td><strong>{"変わらない"}</strong>{"。古い素材も保持"}</td>

</tr>

<tr>

<td>{"9"}</td>

<td>{"CloudFront用ACM証明書のリージョン"}</td>

<td><strong>{"us-east-1"}</strong></td>

</tr>

<tr>

<td>{"10"}</td>

<td>{"Parameter Storeの自動ローテーション"}</td>

<td><strong>{"なし"}</strong>{"（Secrets Manager）"}</td>

</tr>

<tr>

<td>{"11"}</td>

<td>{"RDSの既存DBに暗号化をオン"}</td>

<td><strong>{"スナップショットのコピー→暗号化→復元"}</strong></td>

</tr>

<tr>

<td>{"12"}</td>

<td>{"S3読み取りできるのに復号失敗"}</td>

<td><strong><code>{"kms:Decrypt"}</code>{"不足"}</strong></td>

</tr>

<tr>

<td>{"13"}</td>

<td>{"パスワードを暗号化して保存"}</td>

<td><strong>{"ハッシュ化"}</strong></td>

</tr>

<tr>

<td>{"14"}</td>

<td>{"フロントで非表示にすれば安全"}</td>

<td><strong>{"サーバー側で認可"}</strong></td>

</tr>

<tr>

<td>{"15"}</td>

<td>{"リクエストのtenantIdで絞る"}</td>

<td><strong>{"検証済みトークンのクレーム"}</strong>{"から"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"23-6 練習問題（解答は折りたたみ内）"}</h3>
{" "}
<p><strong>{"問1."}</strong>{" Lambda関数から別アカウントのS3バケットを読み取る必要があります。最小権限で安全な方法はどれですか。"}</p>
{" "}
<p>{"A. 別アカウントのIAMユーザーのアクセスキーをLambdaの環境変数に保存する B. 別アカウントのロールを"}<code>{"AssumeRole"}</code>{"で引き受け、一時認証情報を使う C. バケットを公開する D. rootユーザーの認証情報を使う"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。信頼ポリシーで許可されたクロスアカウントロールを引き受けて一時認証情報を使います。A・Dは長期認証情報の漏洩リスク、Cは公開で不適切です。（Step 3）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問2."}</strong>{" モバイルアプリのユーザーが、自分専用のS3プレフィックスに"}<strong>{"直接"}</strong>{"ファイルをアップロードできるようにしたい。適切な構成は？"}</p>
{" "}
<p>{"A. ユーザープールのみ使用し、アクセストークンでS3へアクセス B. ユーザープール＋IDプールで一時認証情報を取得し、ポリシー変数でユーザーごとのプレフィックスに限定 C. 全ユーザーでIAMユーザーのキーを共有 D. S3バケットをパブリックにする"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。AWSリソースへの直接アクセスにはIDプールが一時認証情報を発行します。"}<code>{"${cognito-identity.amazonaws.com:sub}"}</code>{"のポリシー変数で個人ごとに限定します。（Step 6・8）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問3."}</strong>{" API Gateway（REST API）を、Cognitoでサインインしたユーザーだけが呼べるようにしたい。"}<strong>{"最小の運用負荷"}</strong>{"で実現する方法は？"}</p>
{" "}
<p>{"A. すべてのリクエストでLambdaが署名を自前計算 B. Cognitoユーザープールオーソライザーを設定する C. APIキーのみを要求する D. IPアドレスで許可する"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。マネージドなオーソライザーがトークンを検証します。APIキーは認証手段ではありません。（Step 5・7）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問4."}</strong>{" 5MBのファイルを、KMSキーを使ってアプリ側で暗号化したい。適切な方法は？"}</p>
{" "}
<p>{"A. KMSの"}<code>{"Encrypt"}</code>{"を直接呼ぶ B. "}<code>{"GenerateDataKey"}</code>{"でデータキーを取得し、ローカルでデータを暗号化し、暗号化されたデータキーを一緒に保存する C. KMSキーをダウンロードして使う D. 暗号化せずHTTPSだけにする"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。"}<code>{"Encrypt"}</code>{"は最大4KB。エンベロープ暗号化を使います。KMSキーの素材は取り出せません。（Step 11）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問5."}</strong>{" 別アカウントのKMSキーで暗号化されたS3オブジェクトを、自アカウントのLambdaで読み取りたい。必要な設定を"}<strong>{"2つ"}</strong>{"選べ。"}</p>
{" "}
<p>{"A. キー所有アカウントの鍵ポリシーで、自アカウントのロールに"}<code>{"kms:Decrypt"}</code>{"を許可 B. 自アカウントのロールのIAMポリシーで、そのキーARNへの"}<code>{"kms:Decrypt"}</code>{"を許可 C. キーを"}<code>{"aws/s3"}</code>{"に変更する D. バケットのHTTPSを無効にする E. IAMユーザーを作成してキーを配布"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：A・B"}</strong>{"。クロスアカウントでは鍵ポリシーと利用側のIAMポリシーの"}<strong>{"両方"}</strong>{"が必要です。（Step 15）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問6."}</strong>{" RDSのDBパスワードを"}<strong>{"自動で定期的に変更"}</strong>{"し、アプリは常に最新のパスワードで接続したい。最適な組み合わせは？"}</p>
{" "}
<p>{"A. Parameter StoreのSecureStringに保存し、手動で更新 B. Secrets Managerに保存し、自動ローテーションを有効化。アプリは"}<code>{"AWSCURRENT"}</code>{"を取得 C. Lambdaの環境変数に平文で保存 D. ソースコードに定数として記述"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。自動ローテーションはSecrets Managerの機能です。（Step 19）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問7."}</strong>{" Lambda関数にDBパスワードを渡す方法として"}<strong>{"最も推奨"}</strong>{"されるものは？"}</p>
{" "}
<p>{"A. 環境変数に平文で設定 B. 環境変数にシークレット名のみを設定し、実行時にSecrets Managerから取得してキャッシュ C. デプロイパッケージに設定ファイルとして同梱 D. Gitリポジトリに"}<code>{".env"}</code>{"をコミット"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。環境変数には参照先だけを持たせ、実行ロールに"}<code>{"secretsmanager:GetSecretValue"}</code>{"（必要に応じて"}<code>{"kms:Decrypt"}</code>{"）を付与します。（Step 18・19）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問8."}</strong>{" KMSのカスタマーマネージドキー（対称）のキーマテリアルを"}<strong>{"毎年自動で"}</strong>{"入れ替えたい。正しい説明は？"}</p>
{" "}
<p>{"A. ローテーションすると、キーARNが変わるので、アプリを更新する必要がある B. "}<code>{"EnableKeyRotation"}</code>{"で有効化。ARNは変わらず、過去の暗号文も復号できる C. 非対称キーでも自動ローテーションできる D. AWSマネージドキーの自動ローテーションを無効にできる"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。ARN・エイリアスは変わらず、古いキーマテリアルは保持されます。非対称キーは手動、AWSマネージドキーは自動で毎年（無効化不可）です。（Step 16）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問9."}</strong>{" マルチテナントSaaSのLambdaが、テナントごとのDynamoDBデータへアクセスします。テナント間のデータ漏えいを防ぐ"}<strong>{"最も適切な"}</strong>{"設計は？"}</p>
{" "}
<p>{"A. リクエストボディの"}<code>{"tenantId"}</code>{"を使い、アプリのコードでフィルターする B. 検証済みJWTのクレームからテナントIDを取得し、テナントに限定した一時認証情報（セッションタグ＋IAM条件）でアクセスする C. すべてのテナントで共通の管理者ロールを使う D. テナントIDをURLのクエリ文字列で渡す"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。テナントIDは信頼できる出所から取得し、データ層（IAM条件・LeadingKeys）でも強制します。（Step 21）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問10."}</strong>{" アプリのログに、顧客のカード番号とメールアドレスが平文で出力されていることが判明しました。"}<strong>{"今後の再発防止"}</strong>{"として適切なものを"}<strong>{"2つ"}</strong>{"選べ。"}</p>
{" "}
<p>{"A. ログ出力前にサニタイズ（マスキング／リダクション）するフィルターを実装する B. CloudWatch Logsのデータ保護ポリシーで機密データを検出・マスクする C. ログの保持期間を無期限にする D. ログを全ユーザーに公開する E. 環境変数にカード番号を保存する"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：A・B"}</strong>{"。アプリ側のサニタイズとサービス側のデータ保護の二重対策です。（Step 20）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問11."}</strong>{" CloudFrontのカスタムドメインにHTTPSを設定するため、ACMで証明書を発行します。どのリージョンで作成しますか。"}</p>
{" "}
<p>{"A. ap-northeast-1（東京） B. us-east-1（バージニア北部） C. 配信元（オリジン）と同じリージョン D. リージョンは問わない"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：B"}</strong>{"。CloudFrontで使うACM証明書は"}<code>{"us-east-1"}</code>{"に作成します。（Step 13）"}</p>
{" "}
</details>
{" "}
<p><strong>{"問12."}</strong>{" 組織内の複数のマイクロサービス間で、**相互にクライアント証明書で認証（mTLS）**したい。内部用の証明書を発行・管理するのに適したサービスは？"}</p>
{" "}
<p>{"A. AWS Private CA B. ACMのパブリック証明書のみ C. 自己署名証明書を各チームが自由に作成 D. IAMユーザーのアクセスキー"}</p>
{" "}
<details>
<summary>{"解答と解説"}</summary>
{" "}
<p><strong>{"正解：A"}</strong>{"。社内PKIにはAWS Private CAを使用します。（Step 13）"}</p>
{" "}
</details>
{" "}
<h3>{"23-7 最終チェックリスト（自己採点用）"}</h3>
{" "}
<p><strong>{"Task 1：認証・認可"}</strong></p>
{" "}
<ul>
{" "}
<ChecklistItem index={0}>{" ポリシーの評価ルール（暗黙のDeny／明示的Deny優先）を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={1}>{" ロールの信頼ポリシーと許可ポリシーの違いを説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={2}>{" 認証情報プロバイダーチェーンと、長期キーを避ける理由を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={3}>{" SigV4と署名付きURLの役割を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={4}>{" ユーザープールとIDプールの違いを説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={5}>{" JWTの検証項目（署名・exp・iss・aud）と3種のトークンを説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={6}>{" IDOR対策とDynamoDB LeadingKeysの使い方を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={7}>{" サービス間認証の選択肢（IAM／M2M／リソースポリシー）を説明できる"}</ChecklistItem>
{" "}
</ul>
{" "}
<p><strong>{"Task 2：暗号化"}</strong></p>
{" "}
<ul>
{" "}
<ChecklistItem index={8}>{" 保管時／転送中の暗号化と、HTTPS強制の方法を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={9}>{" エンベロープ暗号化の流れと4KB制限を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={10}>{" SSE-S3／SSE-KMS／SSE-C／クライアントサイド暗号化の違いを説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={11}>{" ACMとPrivate CAの使い分け、CloudFrontの"}<code>{"us-east-1"}</code>{"を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={12}>{" 開発用のSSH鍵・自己署名証明書の作り方と、本番に使わない理由を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={13}>{" クロスアカウントで必要な両側の許可と、AWSマネージドキーの制約を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={14}>{" 自動・オンデマンド・手動ローテーションの違いを説明できる"}</ChecklistItem>
{" "}
</ul>
{" "}
<p><strong>{"Task 3：機密データ管理"}</strong></p>
{" "}
<ul>
{" "}
<ChecklistItem index={15}>{" PII／PHIなどのデータ分類と保護策を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={16}>{" Lambda環境変数の暗号化と、参照先だけを持たせる設計を説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={17}>{" Secrets ManagerとParameter Storeの使い分けを説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={18}>{" サニタイズ・マスキング・トークン化・ハッシュ化の違いを説明できる"}</ChecklistItem>
{" "}
<ChecklistItem index={19}>{" マルチテナントの分離モデルと、テナントIDの信頼できる取得方法を説明できる"}</ChecklistItem>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
