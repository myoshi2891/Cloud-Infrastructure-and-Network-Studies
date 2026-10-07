import { CodeBlock } from '../CodeBlock';
/** 原本のStep 14　開発用の証明書とSSH鍵の生成（Skill 2.2.5）を省略せず収録。 */
export function Step14() { return (<section className="section">
<h2 id="step-14" tabIndex={-1}>{"Step 14 開発用の証明書とSSH鍵の生成（Skill 2.2.5）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「開発目的で証明書とSSH鍵を生成する」"}</strong>{"：コマンドの基本と、"}<strong>{"開発専用であること"}</strong>{"の理解。"}</p>
{" "}
<h3>{"14-1 SSH鍵ペアの基本"}</h3>
{" "}
<p>{"SSH鍵は"}<strong>{"公開鍵"}</strong>{"（サーバーに置く）と"}<strong>{"秘密鍵"}</strong>{"（自分だけが持つ）のペアです。"}</p>
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

<td>{"公開鍵"}</td>

<td>{"EC2に登録される。漏れても問題なし"}</td>

</tr>

<tr>

<td>{"秘密鍵（"}<code>{".pem"}</code>{"／秘密鍵ファイル）"}</td>

<td><strong>{"他人に渡さない・Gitに入れない"}</strong>{"。権限"}<code>{"400"}</code></td>

</tr>

<tr>

<td>{"EC2キーペア"}</td>

<td>{"公開鍵をインスタンスに埋め込み、秘密鍵でSSH接続"}</td>

</tr>

<tr>

<td>{"紛失"}</td>

<td>{"秘密鍵は後から再取得"}<strong>{"できない"}</strong>{"（新しい鍵ペアで対応）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"14-2 EC2のキーペアを作る2つの方法"}</h3>
{" "}
<CodeBlock language="bash" lines={["# 方法1：AWSに作らせる（秘密鍵は作成時に一度だけ取得可能）","aws ec2 create-key-pair \\","  --key-name dev-key \\","  --key-type ed25519 \\","  --query 'KeyMaterial' --output text > dev-key.pem","chmod 400 dev-key.pem","","# 方法2：自分で作って公開鍵だけインポート（秘密鍵は手元から出さない）","ssh-keygen -t ed25519 -f ~/.ssh/dev-key -C \"dev@example.com\"","aws ec2 import-key-pair \\","  --key-name dev-key \\","  --public-key-material fileb://~/.ssh/dev-key.pub","","# 接続","ssh -i ~/.ssh/dev-key ec2-user@<パブリックIPまたはDNS>"]} />
{" "}
<blockquote>{" "}<p>{"方法2は、"}<strong>{"秘密鍵がAWSを通らない"}</strong>{"ため、より安全です。"}</p>{" "}</blockquote>
{" "}
<h3>{"14-3 開発用の自己署名証明書（OpenSSL）"}</h3>
{" "}
<CodeBlock language="bash" lines={["# 秘密鍵と自己署名証明書を同時に作る（開発・テスト専用）","openssl req -x509 -newkey rsa:2048 -nodes \\","  -keyout dev.key -out dev.crt -days 30 \\","  -subj \"/CN=localhost\" \\","  -addext \"subjectAltName=DNS:localhost,IP:127.0.0.1\""]} />
{" "}
<p>{"CSRを作ってCAに署名してもらう流れ："}</p>
{" "}
<CodeBlock language="bash" lines={["openssl genrsa -out server.key 2048","openssl req -new -key server.key -out server.csr -subj \"/CN=dev.internal.example.com\"","# server.csr をCA（例：AWS Private CA）に提出して署名してもらう"]} />
{" "}
<h3>{"14-4 用途の整理"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"目的"}</th>

<th scope="col">{"推奨"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ローカル開発のHTTPS"}</td>

<td>{"自己署名証明書や開発用ツール"}</td>

</tr>

<tr>

<td>{"開発環境のSSH"}</td>

<td>{"ed25519／RSAのキーペア"}</td>

</tr>

<tr>

<td>{"ステージング・本番の公開TLS"}</td>

<td><strong>{"ACM"}</strong>{"（Step 13）"}</td>

</tr>

<tr>

<td>{"社内通信の本番"}</td>

<td><strong>{"AWS Private CA"}</strong></td>

</tr>

<tr>

<td>{"インスタンスへの安全な接続"}</td>

<td><strong>{"Systems Manager Session Manager"}</strong>{"（SSHポート開放・鍵管理が不要）、EC2 Instance Connect"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"14-5 ベストプラクティス"}</h3>
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

<td>{"自己署名証明書は"}<strong>{"開発・テスト専用"}</strong>{"。本番に使わない"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"秘密鍵は"}<code>{"chmod 400"}</code>{"、"}<strong>{"Gitに含めない"}</strong>{"（"}<code>{".gitignore"}</code>{"）"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"鍵の種類は"}<strong>{"ed25519"}</strong>{"または十分な長さのRSA（2048ビット以上）"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"開発用証明書の"}<strong>{"有効期間は短く"}</strong></td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"本番サーバーでは"}<strong>{"SSH鍵に頼らずSession Manager"}</strong>{"の利用を検討"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"セキュリティグループで"}<strong>{"SSH（22）を全世界に開放しない"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「秘密鍵をなくしたので再ダウンロード」→ "}<strong>{"できない"}</strong>{"。新規キーペアで対応。"}</li>
{" "}
<li>{"「本番の公開サイトに自己署名証明書」→ "}<strong>{"不適切"}</strong>{"（ブラウザが警告）。"}</li>
{" "}
<li>{"「SSHの公開鍵を厳重に隠す」→ 隠すべきは"}<strong>{"秘密鍵"}</strong>{"。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"EC2キーペア："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html">{"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html"}</a></li>
{" "}
<li>{"Systems Manager Session Manager："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html">{"https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html"}</a></li>
{" "}
<li>{"AWS Private CAで証明書を発行："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/privateca/latest/userguide/PcaIssueCert.html">{"https://docs.aws.amazon.com/privateca/latest/userguide/PcaIssueCert.html"}</a></li>
{" "}
<li>{"OpenSSL "}<code>{"req"}</code>{" コマンド："}<a target="_blank" rel="noopener" href="https://docs.openssl.org/master/man1/openssl-req/">{"https://docs.openssl.org/master/man1/openssl-req/"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
