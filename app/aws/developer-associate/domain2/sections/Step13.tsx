import { Diagram } from '../Diagram';
/** 原本のStep 13　証明書管理：ACMとAWS Private CA（Skill 2.2.2）を省略せず収録。 */
export function Step13() { return (<section className="section">
<h2 id="step-13" tabIndex={-1}>{"Step 13 証明書管理：ACMとAWS Private CA（Skill 2.2.2）"}</h2>
{" "}
<h3>{"試験で問われること"}</h3>
{" "}
<p><strong>{"「証明書の管理を説明する（例：AWS Private CA）」"}</strong></p>
{" "}
<h3>{"13-1 証明書とは"}</h3>
{" "}
<p>{"TLS証明書は、"}<strong>{"サーバーが本物であること"}</strong>{"と"}<strong>{"公開鍵"}</strong>{"を、認証局（CA）の署名で保証するデジタル文書です。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 61">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"意味"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"CA（認証局）"}</td>

<td>{"証明書に署名する機関"}</td>

</tr>

<tr>

<td>{"パブリック証明書"}</td>

<td>{"ブラウザ等が信頼するCAが発行。インターネット公開サービス向け"}</td>

</tr>

<tr>

<td>{"プライベート証明書"}</td>

<td>{"組織内のプライベートCAが発行。"}<strong>{"社内の通信・mTLS・IoT"}</strong>{"向け"}</td>

</tr>

<tr>

<td>{"CSR"}</td>

<td>{"証明書署名要求（公開鍵とドメイン情報）"}</td>

</tr>

<tr>

<td>{"証明書チェーン"}</td>

<td>{"ルートCA→中間CA→サーバー証明書"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13-2 AWS Certificate Manager（ACM）と AWS Private CA"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 62">
<table>

<thead>

<tr>

<th aria-hidden="true" scope="col"></th>

<th scope="col"><strong>{"ACM（パブリック証明書）"}</strong></th>

<th scope="col"><strong>{"AWS Private CA"}</strong></th>

</tr>

</thead>

<tbody>

<tr>

<td>{"目的"}</td>

<td>{"インターネット向けTLS証明書"}</td>

<td><strong>{"組織内（プライベート）"}</strong>{"の証明書"}</td>

</tr>

<tr>

<td>{"発行元"}</td>

<td>{"ACM（Amazonのパブリック信頼CA）"}</td>

<td>{"自分で作る"}<strong>{"プライベートCA階層"}</strong></td>

</tr>

<tr>

<td>{"ドメイン検証"}</td>

<td><strong>{"DNS検証"}</strong>{"（推奨）／メール検証"}</td>

<td>{"不要（自組織で発行ポリシーを定義）"}</td>

</tr>

<tr>

<td>{"更新"}</td>

<td>{"条件を満たせば"}<strong>{"自動更新"}</strong></td>

<td>{"ACM経由で発行した証明書は自動更新に対応"}</td>

</tr>

<tr>

<td>{"主な利用先"}</td>

<td>{"ALB／NLB、CloudFront、API Gateway"}</td>

<td>{"社内サービス、mTLS、IoT、デバイス、コード署名など"}</td>

</tr>

<tr>

<td>{"失効"}</td>

<td>{"-"}</td>

<td>{"CRL／OCSPで失効管理"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13-3 ACMが使えるサービスと注意点"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 63">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"注意点"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Elastic Load Balancing"}</td>

<td>{"リージョン内のACM証明書を関連付け"}</td>

</tr>

<tr>

<td><strong>{"CloudFront"}</strong></td>

<td>{"証明書は"}<strong>{"米国東部（バージニア北部）"}<code>{"us-east-1"}</code>{"のACM"}</strong>{"に作成する必要がある"}</td>

</tr>

<tr>

<td>{"API Gateway"}</td>

<td>{"カスタムドメインにACM証明書を使用（エッジ最適化は"}<code>{"us-east-1"}</code>{"）"}</td>

</tr>

<tr>

<td>{"EC2上のアプリ"}</td>

<td>{"ACMのパブリック証明書は、既定では"}<strong>{"秘密鍵を取り出して直接インストールできない"}</strong>{"。"}<strong>{"ALB等に終端させる"}</strong>{"のが基本"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13-4 ACMでの発行・更新の流れ"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={17} label="Step 13　証明書管理：ACMとAWS Private CA（Skill 2.2.2）の図解" />
</div>
{" "}
<blockquote>{" "}<p><strong>{"DNS検証のCNAMEを削除すると自動更新に失敗"}</strong>{"します。残しておくのが鉄則です。"}</p>{" "}</blockquote>
{" "}
<h3>{"13-5 AWS Private CAの使いどころ"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={18} label="Step 13　証明書管理：ACMとAWS Private CA（Skill 2.2.2）の図解" />
</div>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 64">
<table>

<thead>

<tr>

<th scope="col">{"用途"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"社内の内部通信"}</td>

<td>{"マイクロサービス間のTLS／"}<strong>{"mTLS（相互TLS）"}</strong></td>

</tr>

<tr>

<td>{"内部ドメイン"}</td>

<td><code>{"service.internal.example.com"}</code>{"のようなプライベート名"}</td>

</tr>

<tr>

<td>{"デバイス認証"}</td>

<td>{"IoT・端末のクライアント証明書"}</td>

</tr>

<tr>

<td>{"ACM連携"}</td>

<td>{"ACMのプライベート証明書として発行・自動更新"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13-6 証明書管理の運用ポイント"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 65">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"有効期限"}</td>

<td>{"失効は障害になる。自動更新を前提にする"}</td>

</tr>

<tr>

<td>{"失効"}</td>

<td>{"秘密鍵が漏洩したら失効（CRL／OCSP）"}</td>

</tr>

<tr>

<td>{"インポート証明書"}</td>

<td>{"ACMにインポートした証明書は"}<strong>{"自動更新されない"}</strong>{"（自分で更新が必要）"}</td>

</tr>

<tr>

<td>{"監視"}</td>

<td>{"期限切れ間近をCloudWatch／EventBridgeなどで通知"}</td>

</tr>

<tr>

<td>{"秘密鍵"}</td>

<td>{"絶対にコードやGitに含めない"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"13-7 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="セキュリティの表 66">
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

<td>{"パブリックな通信は"}<strong>{"ACM"}</strong>{"で証明書を取得し、自動更新に任せる"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"DNS検証"}</strong>{"を使い、検証用レコードを維持する"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"社内通信は"}<strong>{"AWS Private CA"}</strong>{"で内部PKIを構築（自己署名の乱立を避ける）"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"証明書の期限を監視・アラートする"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"CloudFrontでは"}<strong><code>{"us-east-1"}</code></strong>{"に証明書を用意"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"本番で"}<strong>{"自己署名証明書を使わない"}</strong>{"（Step 14は開発用のみ）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"試験のひっかけ"}</h3>
{" "}
<ul>
{" "}
<li>{"「CloudFront用のACM証明書を東京リージョンに作成」→ "}<strong>{"誤り"}</strong>{"（"}<code>{"us-east-1"}</code>{"）。"}</li>
{" "}
<li>{"「ACMにインポートした証明書も自動更新される」→ "}<strong>{"誤り"}</strong>{"。"}</li>
{" "}
<li>{"「社内サービス間の相互認証（mTLS）の証明書」→ "}<strong>{"AWS Private CA"}</strong>{"。"}</li>
{" "}
<li>{"「ACMの証明書をEC2に直接インストール」→ 通常は"}<strong>{"不可"}</strong>{"。ALBなどで終端。"}</li>
{" "}
</ul>
{" "}
<h3>{"根拠ソース"}</h3>
{" "}
<ul>
{" "}
<li>{"AWS Certificate Managerとは："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">{"https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"}</a></li>
{" "}
<li>{"ACMのDNS検証："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html">{"https://docs.aws.amazon.com/acm/latest/userguide/dns-validation.html"}</a></li>
{" "}
<li>{"ACM証明書の更新："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html">{"https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html"}</a></li>
{" "}
<li>{"AWS Private CAとは："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html">{"https://docs.aws.amazon.com/privateca/latest/userguide/PcaWelcome.html"}</a></li>
{" "}
<li>{"CloudFrontでACM証明書を使う："}<a target="_blank" rel="noopener" href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html">{"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cnames-and-https-requirements.html"}</a></li>
{" "}
</ul>
{" "}
<hr />
{" "}
</section>); }
