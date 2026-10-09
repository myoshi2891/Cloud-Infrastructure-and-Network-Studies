import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のStep 7　ベアラートークンによるアプリの保護（Skill 2.1.2）を省略せず収録。 */
export function Step7() { return (<section className="section">
<h2 id="step-7" tabIndex={-1}>{"Step 7 ベアラートークンによるアプリの保護（Skill 2.1.2）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「ベアラートークンでアプリケーションを保護する」"}</strong>{"：JWTの構造、検証すべき項目、Cognitoのトークンの種類と有効期限を理解すること。"}</p>
{" "}
<h3>{"7-1 ベアラートークンとは"}</h3>
{" "}
<p>{"「"}<strong>{"持っている人（bearer）を正当な利用者とみなす"}</strong>{"」トークンです。HTTPの"}<code>{"Authorization"}</code>{"ヘッダーで送ります。"}</p>
{" "}
<CodeBlock index={10} language="http" lines={["GET /orders HTTP/1.1","Host: api.example.com","Authorization: Bearer eyJraWQiOiJ...（JWT）"]} />
{" "}
<p><strong>{"鍵のかかっていない鍵束"}</strong>{"のようなもので、盗まれると誰でも使えます。そのため、"}<strong>{"HTTPS必須・短い有効期限・安全な保管"}</strong>{"が絶対条件です（RFC 6750）。"}</p>
{" "}
<h3>{"7-2 JWT（JSON Web Token）の構造"}</h3>
{" "}
<p>{"JWTは "}<code>{"ヘッダー.ペイロード.署名"}</code>{" の3部構成で、各部をBase64URLエンコードしてドットで連結します。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 32">
<table>

<thead>

<tr>

<th scope="col">{"パート"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ヘッダー"}</td>

<td>{"アルゴリズムと鍵ID"}</td>

<td><code>{"alg"}</code>{"、"}<code>{"kid"}</code></td>

</tr>

<tr>

<td>{"ペイロード（クレーム）"}</td>

<td>{"発行者、対象者、有効期限、ユーザー情報"}</td>

<td><code>{"iss"}</code>{"、"}<code>{"aud"}</code>{"（またはclient_id）、"}<code>{"exp"}</code>{"、"}<code>{"sub"}</code>{"、"}<code>{"scope"}</code></td>

</tr>

<tr>

<td>{"署名"}</td>

<td>{"改ざん検知"}</td>

<td>{"発行者の秘密鍵で署名"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><strong>{"ペイロードは暗号化ではなくエンコードにすぎません"}</strong>{"。誰でも読めるため、"}<strong>{"秘密情報（パスワードなど）を入れない"}</strong>{"こと。"}</p>{" "}</blockquote>
{" "}
<h3>{"7-3 JWTを検証するときのチェックリスト"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 33">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"検証項目"}</th>

<th scope="col">{"失敗すると"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"署名"}</strong>{"が発行元の公開鍵（JWKS）で正しい"}</td>

<td>{"偽造トークンを受け入れる"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong><code>{"exp"}</code></strong>{"（有効期限）が切れていない"}</td>

<td>{"失効トークンの再利用"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td><strong><code>{"iss"}</code></strong>{"（発行者）が想定したユーザープールか"}</td>

<td>{"他のIdPのトークンを受け入れる"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong><code>{"aud"}</code>{" / "}<code>{"client_id"}</code></strong>{" が自分のアプリか"}</td>

<td>{"他アプリ向けトークンの流用"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong><code>{"token_use"}</code></strong>{"（"}<code>{"id"}</code>{"／"}<code>{"access"}</code>{"）が期待どおりか"}</td>

<td>{"IDトークンをAPI認可に誤用"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td><strong><code>{"scope"}</code></strong>{"やグループが必要な権限を満たすか"}</td>

<td>{"認可の抜け"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"署名の公開鍵は、ユーザープールの"}<strong>{"JWKSエンドポイント"}</strong>{"から取得して使います。実運用では、API Gatewayのオーソライザーやライブラリに検証を任せるのが安全です。"}</p>
{" "}
<h3>{"7-4 Cognitoの3種類のトークン"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 34">
<table>

<thead>

<tr>

<th scope="col">{"トークン"}</th>

<th scope="col">{"用途"}</th>

<th scope="col">{"既定の有効期限（設定可）"}</th>

<th scope="col">{"送り先"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"IDトークン"}</strong></td>

<td>{"ユーザーが誰かを示す（プロフィール属性など）"}</td>

<td>{"1時間"}</td>

<td>{"アプリ内の本人確認"}</td>

</tr>

<tr>

<td><strong>{"アクセストークン"}</strong></td>

<td>{"認可。スコープ付きでAPIにアクセス"}</td>

<td>{"1時間"}</td>

<td><strong>{"リソースサーバー（API）"}</strong></td>

</tr>

<tr>

<td><strong>{"リフレッシュトークン"}</strong></td>

<td>{"新しいID／アクセストークンの取得"}</td>

<td>{"30日"}</td>

<td><strong>{"Cognitoのみ"}</strong>{"（APIに送らない）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<ul>
{" "}
<li>{"有効期限は"}<strong>{"アプリクライアント単位"}</strong>{"で設定でき、リフレッシュトークンは取り消し（"}<strong>{"失効"}</strong>{"）が可能です。失効させると、そこから発行されたトークンも使えなくなります。"}</li>
{" "}
<li><strong>{"IDトークンとアクセストークンは別の鍵で署名"}</strong>{"されます（"}<code>{"kid"}</code>{"が異なる）。それぞれ独立して検証します。"}</li>
{" "}
</ul>
{" "}
<h3>{"7-5 API Gatewayでトークンを検証する流れ"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={9} label="Step 7　ベアラートークンによるアプリの保護（Skill 2.1.2）の図解" />
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 35">
<table>

<thead>

<tr>

<th scope="col">{"API種別"}</th>

<th scope="col">{"オーソライザー"}</th>

<th scope="col">{"設定の要点"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"REST API"}</td>

<td>{"Cognitoユーザープールオーソライザー"}</td>

<td>{"トークンを渡すヘッダー名を指定。IDトークンまたはスコープ付きアクセストークン"}</td>

</tr>

<tr>

<td>{"HTTP API"}</td>

<td>{"JWTオーソライザー"}</td>

<td>{"issuerとaudience（クライアントID）を設定。OIDC準拠のIdPならCognito以外も可"}</td>

</tr>

<tr>

<td>{"共通"}</td>

<td>{"Lambdaオーソライザー"}</td>

<td>{"独自トークン／外部IdPのためのカスタム検証。認可ポリシーを返す"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"7-6 OAuth 2.0 の主要なフロー"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 36">
<table>

<thead>

<tr>

<th scope="col">{"フロー"}</th>

<th scope="col">{"使う場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"認可コード＋PKCE"}</td>

<td>{"Web・モバイル・SPAのユーザーサインイン（推奨）"}</td>

</tr>

<tr>

<td>{"クライアントクレデンシャル"}</td>

<td><strong>{"マシン間通信（M2M）"}</strong>{"。ユーザーを介さずスコープ付きアクセストークンを取得"}</td>

</tr>

<tr>

<td>{"Implicit"}</td>

<td>{"旧方式。トークンがURLに露出するため非推奨"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"7-7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 37">
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

<td><strong>{"必ずHTTPS"}</strong>{"で送る。URLのクエリ文字列にトークンを入れない"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"アクセストークンは"}<strong>{"短寿命"}</strong>{"、更新はリフレッシュトークン"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"検証は"}<strong>{"署名・exp・iss・aud・token_use"}</strong>{"をすべて行う"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"IDトークンで"}<strong>{"API認可をしない"}</strong>{"（アクセストークンを使う）"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"トークンの保存先に注意（Webなら"}<code>{"HttpOnly"}</code>{"・"}<code>{"Secure"}</code>{"クッキーなど。"}<code>{"localStorage"}</code>{"はXSSの影響を受けやすい）"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"ログアウトやユーザー無効化時に"}<strong>{"リフレッシュトークンを失効"}</strong>{"させる"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"トークンを"}<strong>{"ログに出力しない"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「JWTのペイロードは暗号化されている」→ "}<strong>{"誤り"}</strong>{"（署名されているだけ）。"}</li>
{" "}
<li>{"「リフレッシュトークンをAPIに送る」→ "}<strong>{"誤り"}</strong>{"（Cognitoのトークンエンドポイント専用）。"}</li>
{" "}
<li>{"「APIキーを渡せば認証になる」→ 認証ではない（Step 5）。"}</li>
{" "}
<li>{"「M2Mで安全にトークンを得たい」→ "}<strong>{"クライアントクレデンシャル"}</strong>{"（Cognitoのリソースサーバー＋スコープ）。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"Cognitoのトークン（アクセストークン）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-access-token.html"}</a></li>
{" "}
<li>{"リフレッシュトークンの利用・失効："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-refresh-token.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-the-refresh-token.html"}</a></li>
{" "}
<li>{"JWTの検証："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html">{"https://docs.aws.amazon.com/cognito/latest/developerguide/amazon-cognito-user-pools-using-tokens-verifying-a-jwt.html"}</a></li>
{" "}
<li>{"トークン有効期限（CreateUserPoolClient API）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPoolClient.html">{"https://docs.aws.amazon.com/cognito-user-identity-pools/latest/APIReference/API_CreateUserPoolClient.html"}</a></li>
{" "}
<li>{"API GatewayのJWTオーソライザー（HTTP API）："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-jwt-authorizer.html"}</a></li>
{" "}
<li>{"RFC 6750（Bearer Token）："}<a target="_blank" rel="noopener" href="https://datatracker.ietf.org/doc/html/rfc6750">{"https://datatracker.ietf.org/doc/html/rfc6750"}</a></li>
{" "}
<li>{"RFC 7519（JWT）："}<a target="_blank" rel="noopener" href="https://datatracker.ietf.org/doc/html/rfc7519">{"https://datatracker.ietf.org/doc/html/rfc7519"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
