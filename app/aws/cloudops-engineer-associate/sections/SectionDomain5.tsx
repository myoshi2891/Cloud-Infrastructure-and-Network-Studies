import { Diagram } from "../Diagram";
import CodeBlock from "../CodeBlock";


/**
 * SectionDomain5
 */
export default function SectionDomain5() {
    return (
        <>
<h1 id="s-h1-5">Domain 5: ネットワークとコンテンツ配信(18%)</h1>
<p>ネットワークは <strong>「つなぐ → 名前を引く → 配る → 直す」</strong> の順で学ぶと整理しやすくなります。</p>
<Diagram id="dg55" />

<h2 id="s-h2-13">Step 11. Task 5.1 ネットワーク機能と接続の実装・最適化</h2>
<h3 id="s-h3-50">Skill 5.1.1 🔴 VPC の構成(サブネット・ルートテーブル・NACL・SG・NAT・IGW・Egress-only IGW)</h3>
<blockquote>
<p>公式スキル文: VPC を構成する(例: サブネット、ルートテーブル、ネットワーク ACL、セキュリティグループ、NAT ゲートウェイ、インターネットゲートウェイ、Egress-only インターネットゲートウェイ)。</p>
</blockquote>
<h4>(1) 全体像</h4>
<Diagram id="dg56" />

<h4>(2) 構成要素の早見表</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">要素</th>
<th scope="col">役割</th>
<th scope="col">重要ポイント</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>VPC</strong></td>
<td>論理的に分離されたネットワーク</td>
<td>CIDR は <strong>/16〜/28</strong>。<strong>作成後はセカンダリ CIDR を追加可能</strong></td>
</tr>
<tr>
<td><strong>サブネット</strong></td>
<td>VPC を分割した IP 範囲。<strong>1 つの AZ に属する</strong></td>
<td>各サブネットで <strong>5 つの IP が予約</strong></td>
</tr>
<tr>
<td><strong>ルートテーブル</strong></td>
<td>通信の行き先を決める</td>
<td>各サブネットは <strong>1 つ</strong> のルートテーブルに関連付く。<strong><code>local</code> ルート(VPC 内通信)は常に存在</strong></td>
</tr>
<tr>
<td><strong>パブリックサブネット</strong></td>
<td><strong>ルートテーブルに IGW へのルートがある</strong> サブネット</td>
<td>通信するには <strong>パブリック IP / Elastic IP</strong> も必要</td>
</tr>
<tr>
<td><strong>プライベートサブネット</strong></td>
<td>IGW へのルートがない</td>
<td>外向き通信は <strong>NAT ゲートウェイ</strong> 経由</td>
</tr>
<tr>
<td><strong>インターネットゲートウェイ(IGW)</strong></td>
<td>VPC とインターネットの出入口</td>
<td>水平スケールで冗長・追加料金なし</td>
</tr>
<tr>
<td><strong>NAT ゲートウェイ</strong></td>
<td><strong>プライベートサブネットから外向きのみ</strong> のインターネット通信(IPv4)</td>
<td><strong>パブリックサブネットに配置し Elastic IP を割り当て</strong>。<strong>AZ 単位のリソース</strong></td>
</tr>
<tr>
<td><strong>Egress-only IGW</strong></td>
<td><strong>IPv6</strong> のプライベートサブネットから <strong>外向きのみ</strong></td>
<td>IPv6 版の NAT 相当(IPv6 は NAT 不要で全アドレスがパブリックなため、<strong>インバウンドを遮断しつつアウトバウンドを許可</strong> する)</td>
</tr>
<tr>
<td><strong>セキュリティグループ(SG)</strong></td>
<td><strong>インスタンス(ENI)レベル</strong> のファイアウォール</td>
<td><strong>ステートフル</strong> / <strong>Allow のみ</strong> / 既定でインバウンド全拒否・アウトバウンド全許可 / <strong>他の SG を参照可能</strong></td>
</tr>
<tr>
<td><strong>ネットワーク ACL(NACL)</strong></td>
<td><strong>サブネットレベル</strong> のファイアウォール</td>
<td><strong>ステートレス</strong> / <strong>Allow と Deny</strong> / <strong>番号の小さいルールから評価</strong> / <strong>戻りの通信(エフェメラルポート 1024〜65535)を明示的に許可</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) SG と NACL の違い(超頻出)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">セキュリティグループ</th>
<th scope="col">ネットワーク ACL</th>
</tr>
</thead>
<tbody>
<tr>
<td>適用単位</td>
<td><strong>ENI(インスタンス)</strong></td>
<td><strong>サブネット</strong></td>
</tr>
<tr>
<td>状態</td>
<td><strong>ステートフル</strong>(戻りの通信は自動許可)</td>
<td><strong>ステートレス</strong>(往路・復路を <strong>両方</strong> 設定)</td>
</tr>
<tr>
<td>ルール</td>
<td><strong>Allow のみ</strong></td>
<td><strong>Allow と Deny</strong></td>
</tr>
<tr>
<td>評価</td>
<td>すべてのルールを評価</td>
<td><strong>番号順(最初に一致したルールで決定)</strong></td>
</tr>
<tr>
<td>既定</td>
<td>インバウンド全拒否 / アウトバウンド全許可</td>
<td><strong>既定 NACL は全許可</strong>(カスタム NACL は作成直後は全拒否)</td>
</tr>
<tr>
<td>用途</td>
<td><strong>基本の制御</strong></td>
<td><strong>特定 IP のブロックなど追加の防御層</strong></td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>3 層構成(パブリック / アプリ用プライベート / DB 用プライベート)</strong> を <strong>複数 AZ</strong> に作る</li>
<li>ワークロードは <strong>プライベートサブネットに置き</strong>、<strong>ALB だけをパブリックサブネット</strong> に置く</li>
<li><strong>NAT ゲートウェイは AZ ごと</strong> に作成(AZ 障害と AZ 間通信料金の回避)</li>
<li><strong>SG は最小権限・SG 同士の参照</strong> で許可し、<code>0.0.0.0/0</code> への SSH / RDP 開放はしない</li>
<li>NACL は <strong>既定のまま</strong> で運用し、必要な場合のみ <strong>ブロック用途</strong> で利用</li>
<li><strong>将来の拡張</strong> を見込んで十分なサイズの CIDR・サブネットを確保し、<strong>他の VPC / オンプレミスと重複しない</strong> 範囲にする</li>
<li><strong>VPC フローログ</strong> を有効化する</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>VPC: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html">https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html</a></li>
<li>セキュリティグループ: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html</a></li>
<li>ネットワーク ACL: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html</a></li>
<li>NAT ゲートウェイ: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html</a></li>
<li>Egress-only インターネットゲートウェイ: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html">https://docs.aws.amazon.com/vpc/latest/userguide/egress-only-internet-gateway.html</a></li>
</ul>
<h3 id="s-h3-51">Skill 5.1.2 🔴 プライベート接続の構成(VPC エンドポイント / PrivateLink / VPC ピアリング)</h3>
<blockquote>
<p>公式スキル文: プライベートネットワーク接続を構成する(例: VPC エンドポイント、AWS PrivateLink、VPC ピアリング)。</p>
</blockquote>
<h4>(1) 選び方</h4>
<Diagram id="dg57" />

<h4>(2) 各方式の比較</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">方式</th>
<th scope="col">仕組み</th>
<th scope="col">特徴・制約</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ゲートウェイエンドポイント</strong></td>
<td><strong>ルートテーブルにプレフィックスリストのルート</strong> を追加</td>
<td><strong>S3 と DynamoDB のみ対応</strong>。<strong>無料</strong>。VPC 内からのみ(オンプレミスや別リージョンからは不可)</td>
</tr>
<tr>
<td><strong>インターフェイスエンドポイント(PrivateLink)</strong></td>
<td>サブネットに <strong>ENI(プライベート IP)</strong> を作成してサービスに接続</td>
<td><strong>ほとんどの AWS サービス・他社サービス・自社サービス</strong> に対応。<strong>時間 + データ量で課金</strong>。<strong>SG で制御</strong>。<strong>プライベート DNS</strong> を有効にすると通常のサービス名がエンドポイントの IP に解決される。オンプレミス(VPN / Direct Connect)からも利用可</td>
</tr>
<tr>
<td><strong>PrivateLink(エンドポイントサービス)</strong></td>
<td><strong>自社サービス(NLB / GWLB の背後)</strong> を他の VPC / アカウントに <strong>一方向で</strong> 公開</td>
<td><strong>CIDR の重複があっても使える</strong>。<strong>サービス側の VPC 全体を公開しない</strong></td>
</tr>
<tr>
<td><strong>VPC ピアリング</strong></td>
<td><strong>2 つの VPC を 1 対 1 で接続</strong></td>
<td><strong>推移的ではない</strong>(A–B、B–C があっても A–C は通信不可)。<strong>CIDR の重複不可</strong>。<strong>両方のルートテーブルにルートを追加</strong>。<strong>クロスアカウント / クロスリージョン</strong> 可。同一リージョンでは <strong>SG の相互参照</strong> が可能</td>
</tr>
<tr>
<td><strong>Transit Gateway</strong></td>
<td><strong>ハブ & スポーク</strong> で多数の VPC / VPN / Direct Connect を接続</td>
<td><strong>推移的な通信が可能</strong>。ルートテーブルとアタッチメントで制御。時間 + データ量で課金</td>
</tr>
</tbody>
</table></div>
<h4>(3) 設定のポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>エンドポイントポリシー</strong></td>
<td>エンドポイント経由でアクセスできる <strong>リソース / アクション</strong> を制限(例: 特定バケットのみ)</td>
</tr>
<tr>
<td><strong>S3 バケットポリシー</strong></td>
<td><code>aws:SourceVpce</code> で <strong>特定のエンドポイント経由以外を拒否</strong></td>
</tr>
<tr>
<td><strong>プライベート DNS</strong></td>
<td>VPC の <strong>DNS 解決 / DNS ホスト名</strong> の両方が有効であること</td>
</tr>
<tr>
<td>ピアリングの失敗</td>
<td><strong>ルートの追加漏れ(片側だけ)</strong>、<strong>SG / NACL でのブロック</strong>、<strong>CIDR の重複</strong></td>
</tr>
<tr>
<td>インターフェイスエンドポイントの失敗</td>
<td><strong>エンドポイントの SG が 443 を許可していない</strong>、プライベート DNS が無効、エンドポイントポリシー</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>S3 / DynamoDB は必ずゲートウェイエンドポイント</strong>(無料。NAT ゲートウェイのコストと通信を削減)</li>
<li><strong>エンドポイントポリシーと SG で最小権限</strong></li>
<li>多数の VPC の接続は <strong>Transit Gateway</strong>、少数なら <strong>ピアリング</strong></li>
<li><strong>インターフェイスエンドポイントは利用する AZ ごとに配置</strong> し可用性を確保</li>
<li>閉域構成のサブネットでは <strong>SSM / CloudWatch Logs / ECR などのエンドポイント</strong> を忘れずに追加</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>AWS PrivateLink / VPC エンドポイント: <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html">https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html</a></li>
<li>ゲートウェイエンドポイント: <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html">https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html</a></li>
<li>VPC ピアリング: <a href="https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html">https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html</a></li>
<li>Transit Gateway: <a href="https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html">https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html</a></li>
</ul>
<h3 id="s-h3-52">Skill 5.1.3 🟡 ネットワーク保護サービスの監査(DNS Firewall / WAF / Shield / Network Firewall)</h3>
<blockquote>
<p>公式スキル文: 単一アカウント内の AWS ネットワーク保護サービス(例: Route 53 Resolver DNS Firewall、AWS WAF、AWS Shield、AWS Network Firewall)を監査する。</p>
</blockquote>
<h4>(1) 守る場所による使い分け</h4>
<Diagram id="dg58" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">守る対象</th>
<th scope="col">主な機能</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AWS WAF</strong></td>
<td><strong>Web アプリケーション(HTTP / HTTPS)</strong>。CloudFront、ALB、API Gateway、AppSync、Cognito などにアタッチ</td>
<td><strong>Web ACL</strong> にルール(マネージドルールグループ、IP セット、<strong>レートベースルール</strong>、正規表現、SQL インジェクション / XSS 対策、Bot 制御)。アクション: Allow / Block / <strong>Count</strong>(まず観測) / CAPTCHA</td>
</tr>
<tr>
<td><strong>AWS Shield</strong></td>
<td><strong>DDoS 攻撃</strong></td>
<td><strong>Shield Standard</strong>: 全顧客に <strong>自動・無料</strong>(L3 / L4)。<strong>Shield Advanced</strong>: 有料、高度な検知・<strong>DDoS 対応チーム(SRT)</strong>・<strong>コスト保護</strong>・WAF 連携</td>
</tr>
<tr>
<td><strong>AWS Network Firewall</strong></td>
<td><strong>VPC 内外の通信</strong>(ステートフル / ステートレス検査、<strong>Suricata 互換ルール</strong>、ドメインフィルタ、侵入防止)</td>
<td><strong>ファイアウォールサブネットにエンドポイント</strong> を配置し、ルートテーブルで通信をそこへ向ける。アラート / フローログ</td>
</tr>
<tr>
<td><strong>Route 53 Resolver DNS Firewall</strong></td>
<td><strong>VPC からの DNS クエリ</strong></td>
<td><strong>ドメインリスト</strong>(許可 / 拒否)に基づく <strong>ルールグループ</strong> を VPC に関連付け。マルウェア C2 や <strong>DNS トンネリング / 不正ドメインへの名前解決</strong> をブロック。アクション: ALLOW / BLOCK / ALERT。<strong>障害時の動作(フェイルオープン / クローズ)</strong> を設定</td>
</tr>
<tr>
<td>(補足)<strong>AWS Firewall Manager</strong></td>
<td>複数アカウントのファイアウォールルールの一元管理</td>
<td>本スキルは <strong>単一アカウント</strong> が対象のため補足のみ</td>
</tr>
</tbody>
</table></div>
<h4>(2) 「監査」で見るポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">観点</th>
<th scope="col">確認内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>適用漏れ</td>
<td><strong>公開されているエンドポイント(ALB / CloudFront / API Gateway)すべてに Web ACL が関連付いているか</strong>、DNS Firewall がすべての VPC に関連付いているか</td>
</tr>
<tr>
<td>ルールの有効性</td>
<td><strong>ルールが Count のままになっていないか</strong>、マネージドルールが最新か、誤検知の例外</td>
</tr>
<tr>
<td>ログ</td>
<td><strong>WAF ログ</strong>(CloudWatch Logs / S3 / Firehose)・<strong>Network Firewall のアラート / フローログ</strong>・<strong>DNS Firewall のクエリログ</strong> を有効化して分析しているか</td>
</tr>
<tr>
<td>メトリクス</td>
<td><strong><code>BlockedRequests</code> / <code>AllowedRequests</code> / <code>CountedRequests</code></strong>、DDoS の検知</td>
</tr>
<tr>
<td>継続的な準拠</td>
<td><strong>AWS Config ルール</strong> や <strong>Security Hub</strong> で <strong>Web ACL 未設定などを継続検出</strong></td>
</tr>
<tr>
<td>変更の監査</td>
<td><strong>CloudTrail</strong> でルール変更の履歴を確認</td>
</tr>
</tbody>
</table></div>
<h4>(3) ベストプラクティス</h4>
<ul>
<li><strong>新しいルールは Count で開始</strong> し、ログで誤検知を確認してから Block に切り替える</li>
<li>公開サービスは <strong>CloudFront + WAF + Shield</strong> を前段に置く</li>
<li><strong>すべての保護サービスのログを有効化</strong> し、分析・アラートにつなぐ</li>
<li><strong>多層防御</strong>: SG / NACL + WAF + Network Firewall + DNS Firewall</li>
<li>マネージドルールを活用し、<strong>カスタムルールは必要最小限</strong></li>
</ul>
<h4>(4) 参考 URL</h4>
<ul>
<li>AWS WAF: <a href="https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html">https://docs.aws.amazon.com/waf/latest/developerguide/what-is-aws-waf.html</a></li>
<li>AWS Shield: <a href="https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html">https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html</a></li>
<li>AWS Network Firewall: <a href="https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html">https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html</a></li>
<li>Route 53 Resolver DNS Firewall: <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html</a></li>
</ul>
<h3 id="s-h3-53">Skill 5.1.4 🟡 ネットワークアーキテクチャのコスト最適化</h3>
<blockquote>
<p>公式スキル文: ネットワークアーキテクチャのコストを最適化する。</p>
</blockquote>
<h4>(1) コストが発生しやすい箇所</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">課金の考え方</th>
<th scope="col">最適化のポイント</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>NAT ゲートウェイ</strong></td>
<td><strong>時間課金 + 処理したデータ量(GB)課金</strong></td>
<td><strong>S3 / DynamoDB はゲートウェイエンドポイント(無料)</strong> へ。AWS サービス宛ての大量通信は <strong>インターフェイスエンドポイント</strong> を検討。使われていない NAT を整理</td>
</tr>
<tr>
<td><strong>AZ 間のデータ転送</strong></td>
<td><strong>AZ をまたぐ通信は双方向で課金</strong></td>
<td>通信量の多い構成は <strong>同一 AZ 内</strong> に寄せる。<strong>NLB のクロスゾーンの有効化</strong> による課金に注意。<strong>AZ ごとの NAT</strong> で AZ 越えを回避</td>
</tr>
<tr>
<td><strong>インターネットへのデータ転送(アウト)</strong></td>
<td><strong>インターネットへ出る通信</strong> は課金(<strong>インバウンドは無料</strong>)</td>
<td><strong>CloudFront 経由</strong> にする(<strong>オリジン → CloudFront の転送は無料</strong>、配信単価も下がる)</td>
</tr>
<tr>
<td><strong>パブリック IPv4 アドレス</strong></td>
<td><strong>使用中・未使用を問わず時間課金</strong></td>
<td><strong>不要な Elastic IP / パブリック IP を解放</strong>、IPv6 や ALB の共有、プライベート通信への切替</td>
</tr>
<tr>
<td><strong>VPC エンドポイント(インターフェイス)</strong></td>
<td><strong>時間 + データ量</strong></td>
<td><strong>AZ 数・本数を必要最小限</strong> に。共有エンドポイントを検討</td>
</tr>
<tr>
<td><strong>Transit Gateway</strong></td>
<td><strong>アタッチメント時間 + データ量</strong></td>
<td>少数の VPC なら <strong>VPC ピアリング</strong>(<strong>同一 AZ 内なら転送無料</strong>)が安い場合も</td>
</tr>
<tr>
<td><strong>リージョン間転送</strong></td>
<td>リージョンをまたぐ通信は課金</td>
<td>不要なクロスリージョン通信を避け、データを <strong>利用する場所の近く</strong> に置く</td>
</tr>
<tr>
<td><strong>VPC フローログ</strong></td>
<td>ログ取り込み・保管料金</td>
<td><strong>対象と詳細度を絞る</strong>(必要な範囲のみ、S3 保管・ライフサイクル)</td>
</tr>
<tr>
<td><strong>VPN / Direct Connect</strong></td>
<td>接続時間 + データ転送</td>
<td>大量転送は <strong>Direct Connect</strong> のほうが転送単価が安い</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg59" />

<h4>(2) ベストプラクティス</h4>
<ul>
<li><strong>まず可視化</strong>:Cost Explorer や CUR(Cost and Usage Report)で <strong>使用タイプ別</strong> に把握する</li>
<li><strong>S3 / DynamoDB は必ずゲートウェイエンドポイント</strong></li>
<li><strong>CloudFront で配信</strong> し、オリジンからのデータ転送量を削減</li>
<li><strong>パブリック IPv4 を最小化</strong> し、未使用の Elastic IP を解放する</li>
<li>コストと可用性のトレードオフを意識する(<strong>NAT を 1 つに減らす = コスト減だが AZ 障害に弱くなる</strong>)</li>
<li>タグで <strong>コスト配分</strong> を明確にする</li>
</ul>
<h4>(3) 参考 URL</h4>
<ul>
<li>NAT ゲートウェイの料金・考慮事項: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html</a></li>
<li>ゲートウェイエンドポイント: <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html">https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html</a></li>
<li>AWS Cost Explorer: <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html">https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html</a></li>
</ul>
<h2 id="s-h2-14">Step 12. Task 5.2 ドメイン・DNS・コンテンツ配信</h2>
<h3 id="s-h3-54">Skill 5.2.1 🔴 DNS の構成(Route 53 Resolver)</h3>
<blockquote>
<p>公式スキル文: DNS を構成する(例: Route 53 Resolver)。</p>
</blockquote>
<h4>(1) Route 53 の基本</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>ホストゾーン</td>
<td>ドメインの DNS レコードの入れ物。<strong>パブリック</strong>(インターネット向け)/ <strong>プライベート</strong>(VPC 内向け)</td>
</tr>
<tr>
<td>レコード</td>
<td>A(IPv4)、AAAA(IPv6)、CNAME、MX、TXT、NS など</td>
</tr>
<tr>
<td><strong>エイリアスレコード</strong></td>
<td><strong>AWS リソース(ALB、CloudFront、S3 など)を指す Route 53 独自のレコード</strong>。<strong>ゾーンの頂点(<code>example.com</code>)にも設定可能</strong>、<strong>クエリは無料</strong>、ターゲットのヘルスを評価できる</td>
</tr>
<tr>
<td><strong>CNAME</strong></td>
<td>別の名前を指す。<strong>ゾーンの頂点(<code>example.com</code>)には設定できない</strong></td>
</tr>
<tr>
<td>TTL</td>
<td>キャッシュの有効時間</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>「<code>example.com</code>(頂点ドメイン)を ALB / CloudFront に向けたい」→ エイリアスレコード</strong>(CNAME は不可)</p>
</blockquote>
<h4>(2) VPC 内の DNS</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>Route 53 Resolver(VPC リゾルバー)</td>
<td>VPC 内の <strong>既定の DNS(VPC の <code>+2</code> アドレス / <code>169.254.169.253</code>)</strong></td>
</tr>
<tr>
<td><strong><code>enableDnsSupport</code></strong></td>
<td>VPC の DNS 解決を有効にする</td>
</tr>
<tr>
<td><strong><code>enableDnsHostnames</code></strong></td>
<td>インスタンスに DNS ホスト名を付与</td>
</tr>
<tr>
<td><strong>プライベートホストゾーン</strong></td>
<td><strong>VPC に関連付けた VPC 内でのみ解決</strong> できる内部用ドメイン。<strong>上の 2 つの設定がどちらも有効</strong> であること</td>
</tr>
<tr>
<td>複数 VPC で共有</td>
<td>プライベートホストゾーンを <strong>複数の VPC に関連付ける</strong>(クロスアカウントは追加手順が必要)</td>
</tr>
</tbody>
</table></div>
<h4>(3) ハイブリッド DNS(オンプレミス ⇔ AWS)</h4>
<Diagram id="dg60" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">エンドポイント</th>
<th scope="col">方向</th>
<th scope="col">用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>インバウンドエンドポイント</strong></td>
<td><strong>オンプレミス → AWS</strong></td>
<td>オンプレから <strong>AWS のプライベートホストゾーン</strong> を解決</td>
</tr>
<tr>
<td><strong>アウトバウンドエンドポイント + 転送ルール</strong></td>
<td><strong>AWS → オンプレミス</strong></td>
<td>VPC から <strong>オンプレミスのドメイン</strong> を解決(転送ルールで対象ドメインと転送先 DNS を指定)</td>
</tr>
<tr>
<td>ルールの共有</td>
<td><strong>AWS RAM</strong> で転送ルールを他アカウントと共有</td>
<td></td>
</tr>
<tr>
<td>配置</td>
<td><strong>高可用性のため 2 つ以上の AZ に ENI を配置</strong></td>
<td></td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li>頂点ドメインや AWS リソースへの紐付けは <strong>エイリアスレコード</strong></li>
<li>ハイブリッド環境は <strong>Resolver エンドポイントと転送ルール</strong> で名前解決を統一</li>
<li>Resolver エンドポイントは <strong>複数 AZ</strong>、<strong>クエリログ</strong> を有効化して調査に備える</li>
<li>切り替えが予定されるレコードは <strong>TTL を事前に短く</strong> する</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>Route 53 Resolver: <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html</a></li>
<li>Route 53 ホストゾーン: <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/hosted-zones-working-with.html</a></li>
</ul>
<h3 id="s-h3-55">Skill 5.2.2 🔴 Route 53 のルーティングポリシー・設定・クエリログ</h3>
<blockquote>
<p>公式スキル文: Route 53 のルーティングポリシー、設定、クエリログを実装する。</p>
</blockquote>
<h4>(1) ルーティングポリシー一覧</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ポリシー</th>
<th scope="col">動作</th>
<th scope="col">主な用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>シンプル</strong></td>
<td>1 つのリソースに対して応答(複数の値を返すことも可能)</td>
<td>単一のリソース</td>
</tr>
<tr>
<td><strong>加重(Weighted)</strong></td>
<td><strong>重み(割合)</strong> に応じて振り分け</td>
<td><strong>カナリアデプロイ・段階的移行・A/B テスト</strong></td>
</tr>
<tr>
<td><strong>レイテンシー</strong></td>
<td><strong>ユーザーに最もレイテンシーの低いリージョン</strong> へ</td>
<td>マルチリージョンの性能最適化</td>
</tr>
<tr>
<td><strong>フェイルオーバー</strong></td>
<td><strong>プライマリが異常ならセカンダリへ</strong>(<strong>プライマリにヘルスチェックが必須</strong>)</td>
<td><strong>アクティブ / パッシブ構成の DR</strong></td>
</tr>
<tr>
<td><strong>位置情報(Geolocation)</strong></td>
<td><strong>ユーザーの所在地(国・大陸)</strong> で振り分け</td>
<td>コンテンツ規制、言語・ローカライズ、データレジデンシー</td>
</tr>
<tr>
<td><strong>地理的近接性(Geoproximity)</strong></td>
<td><strong>リソースとユーザーの距離</strong> で振り分け。<strong>バイアス</strong> で範囲を調整(Traffic Flow が必要)</td>
<td>地理的な負荷調整</td>
</tr>
<tr>
<td><strong>IP ベース</strong></td>
<td><strong>クライアントの IP アドレス範囲(CIDR)</strong> で振り分け</td>
<td>特定の ISP / ネットワークを特定のエンドポイントへ</td>
</tr>
<tr>
<td><strong>複数値回答(Multivalue Answer)</strong></td>
<td><strong>正常な複数のレコード(最大 8 個)</strong> をランダムに返す(ヘルスチェック対応)</td>
<td>簡易的な負荷分散(ELB の代替ではない)</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg61" />

<blockquote>
<p>💡 <strong>位置情報 vs レイテンシー</strong>: 「ユーザーの <strong>場所で</strong> 振り分け(規制・言語)」→ 位置情報。「<strong>速さで</strong> 振り分け」→ レイテンシー。</p>
</blockquote>
<h4>(3) ヘルスチェックとの組み合わせ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>ヘルスチェック対象</td>
<td>エンドポイント / 他のヘルスチェックの組み合わせ / CloudWatch アラーム</td>
</tr>
<tr>
<td><strong>エイリアスの「ターゲットのヘルスを評価」</strong></td>
<td>ALB 等のヘルス状態に連動して、異常なら除外</td>
</tr>
<tr>
<td>詳細</td>
<td>Skill 2.2.1 を参照</td>
</tr>
</tbody>
</table></div>
<h4>(4) クエリログ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">種類</th>
<th scope="col">内容</th>
<th scope="col">出力先</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>パブリックホストゾーンのクエリログ</strong></td>
<td><strong>ホストゾーンに対する DNS クエリ</strong>(ドメイン名、レコードタイプ、応答コード、エッジロケーションなど)</td>
<td><strong>CloudWatch Logs</strong>(<strong><code>us-east-1</code> のロググループ</strong> が必要)</td>
</tr>
<tr>
<td><strong>Resolver クエリログ</strong></td>
<td><strong>VPC 内のリソースからの DNS クエリ</strong>(どのインスタンスがどの名前を引いたか)</td>
<td><strong>CloudWatch Logs / S3 / Kinesis Data Firehose</strong></td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>フェイルオーバー・加重などはヘルスチェックと組み合わせ</strong>、<strong>TTL は短め</strong>(切替を速くする)</li>
<li>本番の DNS 変更は <strong>加重ルーティングで段階的</strong> に行う</li>
<li><strong>クエリログ</strong> を有効化し、<strong>不審なドメインへのクエリ</strong>・障害時の名前解決を調査できるようにする</li>
<li>重要なドメインは <strong>登録のロック・DNSSEC</strong> を検討する</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>ルーティングポリシー: <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html</a></li>
<li>DNS クエリのログ記録: <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/query-logs.html</a></li>
<li>DNS フェイルオーバー: <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html</a></li>
</ul>
<h3 id="s-h3-56">Skill 5.2.3 🔴 コンテンツ・サービスの配信(CloudFront / Global Accelerator)</h3>
<blockquote>
<p>公式スキル文: コンテンツとサービスの配信を構成する(例: Amazon CloudFront、AWS Global Accelerator)。</p>
</blockquote>
<h4>(1) CloudFront の仕組み</h4>
<Diagram id="dg62" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">構成要素</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ディストリビューション</strong></td>
<td>CloudFront の配信設定の単位</td>
</tr>
<tr>
<td><strong>オリジン</strong></td>
<td>S3 バケット、ALB / EC2、任意の HTTP サーバー</td>
</tr>
<tr>
<td><strong>ビヘイビア</strong></td>
<td><strong>パスパターンごと</strong> に、オリジン・キャッシュポリシー・プロトコル・関数などを設定</td>
</tr>
<tr>
<td><strong>キャッシュポリシー</strong></td>
<td><strong>キャッシュキー</strong>(クエリ文字列・ヘッダー・Cookie)と TTL</td>
</tr>
<tr>
<td><strong>オリジンリクエストポリシー</strong></td>
<td>キャッシュキーに含めずに <strong>オリジンへ転送する値</strong></td>
</tr>
<tr>
<td><strong>OAC(Origin Access Control)</strong></td>
<td><strong>S3 オリジンへのアクセスを CloudFront 経由に限定</strong>(S3 を非公開にする。旧 OAI の後継)</td>
</tr>
<tr>
<td><strong>署名付き URL / Cookie</strong></td>
<td><strong>有料コンテンツ・限定公開</strong> の制御</td>
</tr>
<tr>
<td><strong>WAF 連携 / 地理的制限</strong></td>
<td>攻撃防御、国単位のブロック</td>
</tr>
<tr>
<td><strong>Lambda@Edge / CloudFront Functions</strong></td>
<td>エッジでリクエスト / レスポンスを加工(リダイレクト、ヘッダー追加など)</td>
</tr>
<tr>
<td><strong>カスタムエラーページ</strong></td>
<td>オリジンのエラーに対する独自のレスポンス</td>
</tr>
<tr>
<td>料金クラス</td>
<td>配信するエッジロケーションの範囲でコストを調整</td>
</tr>
</tbody>
</table></div>
<h4>(2) AWS Global Accelerator</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>概要</td>
<td><strong>2 つの静的エニーキャスト IP アドレス</strong> を提供し、ユーザーを <strong>最寄りのエッジ</strong> から <strong>AWS のグローバルネットワーク</strong> 経由でアプリへ導く</td>
</tr>
<tr>
<td>対象エンドポイント</td>
<td><strong>ALB、NLB、EC2、Elastic IP</strong></td>
</tr>
<tr>
<td>プロトコル</td>
<td><strong>TCP / UDP</strong>(HTTP に限らない)</td>
</tr>
<tr>
<td>特徴</td>
<td><strong>ヘルスチェックによる自動フェイルオーバー</strong>、<strong>トラフィックダイヤル</strong>(リージョンごとの割合調整)、<strong>固定 IP(IP の許可リストに登録しやすい)</strong></td>
</tr>
<tr>
<td><strong>キャッシュはしない</strong></td>
<td>あくまで <strong>経路の最適化</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) CloudFront と Global Accelerator の使い分け</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">観点</th>
<th scope="col">CloudFront</th>
<th scope="col">Global Accelerator</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>キャッシュ</strong></td>
<td><strong>あり</strong>(エッジでキャッシュ)</td>
<td><strong>なし</strong></td>
</tr>
<tr>
<td>対象</td>
<td><strong>HTTP / HTTPS コンテンツ</strong></td>
<td><strong>TCP / UDP の任意のアプリ</strong>(ゲーム、IoT、VoIP など)</td>
</tr>
<tr>
<td>IP アドレス</td>
<td>変動(DNS 名で利用)</td>
<td><strong>固定の 2 つの IP</strong></td>
</tr>
<tr>
<td>主な利点</td>
<td>静的 / 動的コンテンツの <strong>高速配信・オリジン負荷軽減</strong></td>
<td><strong>ネットワーク経路の最適化・高速なフェイルオーバー・固定 IP</strong></td>
</tr>
<tr>
<td>使いどころ</td>
<td>静的サイト、画像・動画、API の高速化</td>
<td><strong>固定 IP が必須</strong>、<strong>HTTP 以外のプロトコル</strong>、<strong>マルチリージョンの高速切替</strong></td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>キャッシュしたい → CloudFront。固定 IP や非 HTTP の高速化 → Global Accelerator。</strong></p>
</blockquote>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>S3 オリジンは OAC でアクセスを CloudFront 経由のみ</strong> にする(S3 を直接公開しない)</li>
<li><strong>HTTPS 強制</strong>(ビューアープロトコルポリシー)と <strong>ACM 証明書(us-east-1)</strong></li>
<li><strong>キャッシュキーは最小限</strong> にしてヒット率を上げる</li>
<li><strong>WAF + Shield</strong> を併用して保護する</li>
<li>静的ファイルは <strong>バージョン付きファイル名</strong> で運用し、無効化を最小化</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>CloudFront: <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html">https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html</a></li>
<li>AWS Global Accelerator: <a href="https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html">https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html</a></li>
</ul>
<h2 id="s-h2-15">Step 13. Task 5.3 ネットワーク接続のトラブルシュート</h2>
<h3 id="s-h3-57">Skill 5.3.1 🔴 VPC 構成のトラブルシュート(サブネット・ルートテーブル・NACL・SG・Transit Gateway・NAT)</h3>
<blockquote>
<p>公式スキル文: VPC 構成をトラブルシュートする(例: サブネット、ルートテーブル、ネットワーク ACL、セキュリティグループ、トランジットゲートウェイ、NAT ゲートウェイ)。</p>
</blockquote>
<h4>(1) 「つながらない」の基本の切り分け</h4>
<p><strong>通信は経路上の「全部の関所」を通る必要があります。</strong> 外側から順に確認します。</p>
<Diagram id="dg63" />

<h4>(2) 症状別の確認ポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">確認すること</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>パブリックサブネットのインスタンスにインターネットから届かない</strong></td>
<td><strong>ルートテーブルに IGW へのルート</strong>、<strong>パブリック IPv4 / EIP</strong>、SG のインバウンド、NACL</td>
</tr>
<tr>
<td><strong>プライベートサブネットからインターネットに出られない</strong></td>
<td><strong>プライベートのルートテーブルに NAT ゲートウェイへのルート</strong>、<strong>NAT ゲートウェイは「パブリックサブネット」に配置</strong>(そのサブネットが IGW へのルートを持つ)、NAT に EIP、SG のアウトバウンド、NACL</td>
</tr>
<tr>
<td>NAT 経由の接続が断続的に失敗</td>
<td>CloudWatch の <strong><code>ErrorPortAllocation</code></strong>(ポート枯渇。同一宛先への大量接続)→ NAT を複数に分散 / 接続の再利用</td>
</tr>
<tr>
<td><strong>VPC ピアリングで通信できない</strong></td>
<td><strong>両側のルートテーブルにルートがあるか</strong>、SG / NACL、CIDR の重複</td>
</tr>
<tr>
<td><strong>Transit Gateway 経由で通信できない</strong></td>
<td><strong>アタッチメントが有効(available)</strong> か、<strong>TGW ルートテーブル(関連付け / 伝播)</strong>、<strong>各 VPC のサブネットのルートテーブルに TGW 向けルート</strong>、VPC のアタッチメントサブネット(AZ)、SG / NACL</td>
</tr>
<tr>
<td><strong>片方向だけ通る(ping は戻らない等)</strong></td>
<td><strong>NACL がステートレス</strong> なので復路の許可漏れ</td>
</tr>
<tr>
<td>SG に許可があるのに通らない</td>
<td><strong>NACL の拒否</strong>、<strong>ルート</strong>、OS ファイアウォール、<strong>SG の参照先が違う SG</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) 調査ツール</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ツール</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Reachability Analyzer</strong></td>
<td><strong>送信元と宛先を指定して、経路上の構成(ルート、SG、NACL、TGW など)を静的に分析</strong> し、到達可能か・<strong>ブロックしている箇所</strong> を示す(<strong>実際にパケットは送らない</strong>)</td>
</tr>
<tr>
<td><strong>Network Access Analyzer</strong></td>
<td>意図しないネットワークアクセスパスの検出</td>
</tr>
<tr>
<td><strong>VPC フローログ</strong></td>
<td>実際の通信の <strong>ACCEPT / REJECT</strong> を確認(Skill 5.3.2)</td>
</tr>
<tr>
<td><strong>VPC Traffic Mirroring</strong></td>
<td>パケットを複製して詳細分析</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>ハンズオンの鉄則</strong>: SG の問題かどうかは <strong>SG は拒否ログを残さない</strong> ので、<strong>フローログの REJECT</strong> は <strong>主に NACL や SG による拒否</strong> を示す点に注意。<strong>Reachability Analyzer で構成を静的に確認 → フローログで実トラフィックを確認</strong> の順が効率的。</p>
</blockquote>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>変更履歴(CloudTrail / Config)</strong> で、直前に何が変わったかを最初に確認する</li>
<li><strong>Reachability Analyzer を日常の変更検証・トラブルシュートに活用</strong></li>
<li><strong>フローログを事前に有効化</strong> しておく(障害後に有効化しても過去は見えない)</li>
<li>ネットワーク変更は <strong>IaC + レビュー</strong> で行い、手動変更を避ける</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>Reachability Analyzer: <a href="https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html">https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html</a></li>
<li>VPC のトラブルシュート(NAT ゲートウェイ): <a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html">https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html</a></li>
<li>Transit Gateway: <a href="https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html">https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html</a></li>
</ul>
<h3 id="s-h3-58">Skill 5.3.2 🔴 ネットワークログの収集と解釈(VPC フローログ / ELB / WAF / CloudFront / コンテナ)</h3>
<blockquote>
<p>公式スキル文: ネットワークログを収集・解釈してトラブルシュートする(例: VPC フローログ、ELB アクセスログ、AWS WAF Web ACL ログ、CloudFront ログ、コンテナログ)。</p>
</blockquote>
<h4>(1) ログの種類早見表</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ログ</th>
<th scope="col">何が分かるか</th>
<th scope="col">出力先</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>VPC フローログ</strong></td>
<td><strong>ENI / サブネット / VPC を通る IP 通信のメタデータ</strong>(誰から誰へ、ポート、許可 / 拒否)</td>
<td>CloudWatch Logs / S3 / Firehose</td>
</tr>
<tr>
<td><strong>ELB アクセスログ</strong></td>
<td><strong>ロードバランサーが処理した各リクエスト</strong>(クライアント IP、ステータス、処理時間など)</td>
<td><strong>S3</strong></td>
</tr>
<tr>
<td><strong>WAF Web ACL ログ</strong></td>
<td><strong>WAF が検査したリクエスト</strong>(どのルールで許可 / ブロックされたか)</td>
<td>CloudWatch Logs / S3 / Firehose</td>
</tr>
<tr>
<td><strong>CloudFront ログ</strong></td>
<td><strong>エッジが処理したリクエスト</strong>(キャッシュ結果、ステータス、オリジン遅延)</td>
<td><strong>標準ログ(S3 など)</strong> / <strong>リアルタイムログ(Kinesis Data Streams)</strong></td>
</tr>
<tr>
<td><strong>コンテナログ</strong></td>
<td>アプリの標準出力</td>
<td><strong>ECS: <code>awslogs</code> ドライバー / FireLens(Fluent Bit)</strong> → CloudWatch Logs。<strong>EKS: CloudWatch Observability アドオン(Fluent Bit)</strong></td>
</tr>
</tbody>
</table></div>
<h4>(2) VPC フローログの読み方</h4>
<p><strong>既定のフォーマットのフィールド</strong></p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">フィールド</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>version</code> / <code>account-id</code> / <code>interface-id</code></td>
<td>バージョン / アカウント / ENI</td>
</tr>
<tr>
<td><code>srcaddr</code> / <code>dstaddr</code></td>
<td>送信元 / 宛先 IP</td>
</tr>
<tr>
<td><code>srcport</code> / <code>dstport</code></td>
<td>送信元 / 宛先ポート</td>
</tr>
<tr>
<td><code>protocol</code></td>
<td>プロトコル番号(<strong>6 = TCP、17 = UDP、1 = ICMP</strong>)</td>
</tr>
<tr>
<td><code>packets</code> / <code>bytes</code></td>
<td>パケット数 / バイト数</td>
</tr>
<tr>
<td><code>start</code> / <code>end</code></td>
<td>集計の開始 / 終了時刻</td>
</tr>
<tr>
<td><strong><code>action</code></strong></td>
<td><strong><code>ACCEPT</code>(許可)/ <code>REJECT</code>(拒否)</strong></td>
</tr>
<tr>
<td><code>log-status</code></td>
<td>OK / NODATA / SKIPDATA</td>
</tr>
</tbody>
</table></div>
<p><strong>サンプルと読み方</strong></p>
<CodeBlock index={8} />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">行</th>
<th scope="col">解釈</th>
</tr>
</thead>
<tbody>
<tr>
<td>1 行目</td>
<td><code>203.0.113.12</code> から <code>10.0.1.5</code> の <strong>TCP 22(SSH)</strong> への通信が <strong>許可された</strong></td>
</tr>
<tr>
<td>2 行目</td>
<td><code>203.0.113.99</code> からの SSH が <strong>拒否された</strong>(SG / NACL でブロック)</td>
</tr>
</tbody>
</table></div>
<p><strong>判断のコツ</strong></p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">パターン</th>
<th scope="col">示唆すること</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>インバウンドが ACCEPT なのに、戻りが REJECT</strong></td>
<td><strong>NACL(ステートレス)の復路の許可漏れ</strong> の可能性が高い(SG はステートフルなので戻りは自動許可)</td>
</tr>
<tr>
<td>宛先ポートが想定外で REJECT が大量</td>
<td><strong>ポートスキャン / 不正アクセス</strong> の可能性</td>
</tr>
<tr>
<td><code>REJECT</code> が出るのに SG は許可している</td>
<td><strong>NACL の拒否</strong> を疑う</td>
</tr>
<tr>
<td>フローログに <strong>出てこない</strong></td>
<td>経路・ルートの問題(そもそも届いていない)、またはフローログの対象外</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">注意点</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>フローログは「ペイロード」を記録しない</strong></td>
<td>メタデータのみ</td>
</tr>
<tr>
<td><strong>記録されない通信</strong></td>
<td><strong>Amazon DNS サーバー宛の DNS 通信、DHCP、インスタンスメタデータ(<code>169.254.169.254</code>)、Amazon Time Sync Service、Windows ライセンス認証</strong> など</td>
</tr>
<tr>
<td><strong>集計間隔</strong></td>
<td>1 分または 10 分</td>
</tr>
<tr>
<td><strong>作成後の変更</strong></td>
<td>フローログの設定は <strong>作成後に変更不可</strong>(再作成が必要)</td>
</tr>
<tr>
<td>取り付け先</td>
<td><strong>VPC / サブネット / ENI</strong></td>
</tr>
</tbody>
</table></div>
<p><strong>CloudWatch Logs Insights で拒否が多い送信元を集計する例</strong></p>
<CodeBlock index={9} />

<p>(S3 に保存したフローログは <strong>Amazon Athena</strong> で SQL 分析できます。)</p>
<h4>(3) ELB アクセスログ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">主なフィールド</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>elb_status_code</code></td>
<td><strong>ロードバランサーがクライアントに返したステータス</strong></td>
</tr>
<tr>
<td><code>target_status_code</code></td>
<td><strong>ターゲットが返したステータス</strong>(ターゲットに届かなければ <code>-</code>)</td>
</tr>
<tr>
<td><code>request_processing_time</code> / <code>target_processing_time</code> / <code>response_processing_time</code></td>
<td>LB の受付時間 / <strong>ターゲットの処理時間</strong> / 応答送信時間</td>
</tr>
<tr>
<td><code>client:port</code> / <code>target:port</code></td>
<td>クライアント / ターゲットのアドレス</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">読み方</th>
<th scope="col">示唆すること</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>elb_status_code = 502/503/504</code> + <strong><code>target_status_code</code> が <code>-</code></strong></td>
<td>ターゲットへ到達できていない、またはターゲットが応答していない(ヘルスチェック・SG・ターゲット停止)</td>
</tr>
<tr>
<td><code>target_processing_time</code> が大きい</td>
<td><strong>アプリ(ターゲット)の遅さ</strong> が原因</td>
</tr>
<tr>
<td><code>elb_status_code = 5xx</code> かつ <code>target_status_code = 5xx</code></td>
<td><strong>アプリケーション自身のエラー</strong></td>
</tr>
</tbody>
</table></div>
<p><strong>重要</strong>: <strong>アクセスログは既定で無効</strong>。有効化して <strong>S3 バケットに保存</strong>(バケットポリシーで ELB のログ配信を許可する必要がある)。</p>
<h4>(4) WAF ログ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">主なフィールド</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>action</code></td>
<td><code>ALLOW</code> / <code>BLOCK</code> / <code>COUNT</code></td>
</tr>
<tr>
<td><code>terminatingRuleId</code></td>
<td><strong>最終的に判断したルール</strong></td>
</tr>
<tr>
<td><code>ruleGroupList</code> / <code>nonTerminatingMatchingRules</code></td>
<td>マッチしたルールグループ / 終端しないルール(Count)</td>
</tr>
<tr>
<td><code>httpRequest</code></td>
<td>クライアント IP、URI、ヘッダー など</td>
</tr>
</tbody>
</table></div>
<p>→ <strong>「正当なユーザーがブロックされる(誤検知)」の調査</strong> に使う。まず該当ルールを <strong>Count</strong> にして影響を確認する。</p>
<h4>(5) CloudFront ログ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">主なフィールド</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>x-edge-result-type</code></td>
<td><strong><code>Hit</code> / <code>RefreshHit</code> / <code>Miss</code> / <code>Error</code> など</strong>(キャッシュの結果)</td>
</tr>
<tr>
<td><code>sc-status</code></td>
<td>ステータスコード</td>
</tr>
<tr>
<td><code>time-taken</code> / <code>time-to-first-byte</code></td>
<td>処理時間</td>
</tr>
<tr>
<td>種類</td>
<td><strong>標準ログ(数分〜遅延あり)</strong> と <strong>リアルタイムログ(数秒で Kinesis へ)</strong></td>
</tr>
</tbody>
</table></div>
<h4>(6) コンテナログ</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">環境</th>
<th scope="col">収集</th>
</tr>
</thead>
<tbody>
<tr>
<td>ECS(EC2 / Fargate)</td>
<td>タスク定義の <strong><code>awslogs</code> ログドライバー</strong> で CloudWatch Logs へ。高度なルーティングは <strong>FireLens</strong></td>
</tr>
<tr>
<td>EKS</td>
<td><strong>Amazon CloudWatch Observability アドオン(Fluent Bit)</strong></td>
</tr>
<tr>
<td>確認</td>
<td><strong>Container Insights</strong> のメトリクスと組み合わせて分析</td>
</tr>
<tr>
<td>失敗の例</td>
<td><strong>ログ出力先の権限(タスク実行ロール)</strong> 不足でログが出ない</td>
</tr>
</tbody>
</table></div>
<h4>(7) ベストプラクティス</h4>
<ul>
<li><strong>必要なログは事前に有効化</strong>(フローログ・ELB アクセスログ・WAF ログ・CloudFront ログ・Resolver クエリログ)</li>
<li>ログの <strong>保存先・保持期間・暗号化・アクセス制御</strong> を決める(<strong>S3 ライフサイクル</strong>)</li>
<li><strong>Athena と Logs Insights</strong> で素早く分析できるようにテーブル / クエリを準備する</li>
<li><strong>ログから CloudWatch メトリクス / アラームを作成</strong>(例: REJECT の急増)</li>
<li><strong>組織の証跡・ログは別アカウントに集約</strong> して改ざんを防ぐ</li>
</ul>
<h4>(8) 参考 URL</h4>
<ul>
<li>VPC フローログ: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html">https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html</a></li>
<li>ALB アクセスログ: <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html">https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-access-logs.html</a></li>
<li>AWS WAF のログ記録: <a href="https://docs.aws.amazon.com/waf/latest/developerguide/logging.html">https://docs.aws.amazon.com/waf/latest/developerguide/logging.html</a></li>
<li>CloudFront 標準ログ: <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html">https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/AccessLogs.html</a></li>
</ul>
<h3 id="s-h3-59">Skill 5.3.3 🔴 CloudFront のキャッシュ問題の特定と修復</h3>
<blockquote>
<p>公式スキル文: CloudFront のキャッシュに関する問題を特定し修復する。</p>
</blockquote>
<h4>(1) まず確認:キャッシュは効いているか</h4>
<p>レスポンスヘッダー <strong><code>X-Cache</code></strong> で確認できます。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col"><code>X-Cache</code> の値</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong><code>Hit from cloudfront</code></strong></td>
<td>エッジのキャッシュから返した</td>
</tr>
<tr>
<td><strong><code>Miss from cloudfront</code></strong></td>
<td>キャッシュがなく <strong>オリジンから取得</strong> した</td>
</tr>
<tr>
<td><strong><code>RefreshHit from cloudfront</code></strong></td>
<td>期限切れのキャッシュを <strong>オリジンで再検証</strong> し、更新不要と判断して返した</td>
</tr>
<tr>
<td><strong><code>Error from cloudfront</code></strong></td>
<td>エラー</td>
</tr>
</tbody>
</table></div>
<p><code>Age</code> ヘッダーは <strong>キャッシュされてからの経過秒数</strong> を示します。</p>
<h4>(2) よくある問題と対処</h4>
<Diagram id="dg64" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">問題</th>
<th scope="col">原因</th>
<th scope="col">対処</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ヒット率が低い</strong></td>
<td>キャッシュキーに <strong>不要な値(全クエリ文字列・全ヘッダー・全 Cookie)</strong> を含めている</td>
<td><strong>キャッシュポリシーで必要な値だけ</strong> に絞る(不要なものは <strong>オリジンリクエストポリシー</strong> で転送)</td>
</tr>
<tr>
<td>ヒット率が低い</td>
<td>オリジンが <code>Cache-Control: no-cache / no-store / private</code> を返している</td>
<td>オリジンのヘッダーを見直す / CloudFront の <strong>最小 TTL</strong> で上書き</td>
</tr>
<tr>
<td><strong>更新したのに古い内容</strong></td>
<td>TTL 内はキャッシュが返る</td>
<td><strong>無効化(<code>{'/*'}</code> やパス指定)</strong>。ただし <strong>バージョン付きのファイル名</strong> が確実・低コスト</td>
</tr>
<tr>
<td>他人の内容が見える</td>
<td><strong>認証・個人用のコンテンツを共有キャッシュ</strong> に載せた</td>
<td><strong>キャッシュしない(<code>Cache-Control: private</code>)</strong>、<strong>キャッシュキーに識別子(Cookie / Authorization)</strong> を含める</td>
</tr>
<tr>
<td><strong>オリジンへの負荷が高い</strong></td>
<td>ミスが多い、<strong>同時に同じオブジェクトを要求</strong></td>
<td><strong>Origin Shield</strong> の有効化、TTL を長く</td>
</tr>
<tr>
<td><strong>S3 オリジンで 403</strong></td>
<td><strong>OAC の設定とバケットポリシーの不一致</strong>、オブジェクトが存在しない(権限がない場合 S3 は 403 を返すことがある)</td>
<td>OAC とバケットポリシー(<code>cloudfront.amazonaws.com</code> + <code>AWS:SourceArn</code>)を確認</td>
</tr>
<tr>
<td>ALB オリジンで異常</td>
<td><strong>Host ヘッダーを転送していない</strong> などで、ALB 側のルーティング / 証明書と不一致</td>
<td>オリジンリクエストポリシーで <strong>必要なヘッダー(Host)</strong> を転送。<strong>オリジンの SG</strong> が CloudFront からのアクセスを許可しているか</td>
</tr>
<tr>
<td><strong>エラー応答がキャッシュされて復旧しない</strong></td>
<td><strong>エラーレスポンスも既定でキャッシュ</strong>(<strong>Error Caching Minimum TTL</strong> が既定 10 秒)</td>
<td><strong>エラーキャッシュの TTL を調整</strong>、オリジンを修復</td>
</tr>
<tr>
<td>圧縮されない</td>
<td>圧縮の有効化漏れ、オリジンの <code>Content-Length</code> / 対応形式</td>
<td><strong>自動圧縮を有効化</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) TTL の決まり方</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">設定</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>最小 TTL / 既定 TTL / 最大 TTL</strong></td>
<td>ビヘイビアのキャッシュポリシーで設定</td>
</tr>
<tr>
<td>オリジンの <strong><code>Cache-Control: max-age</code> / <code>s-maxage</code> / <code>Expires</code></strong></td>
<td>あれば <strong>最小 TTL と最大 TTL の範囲内で</strong> 採用。ない場合は <strong>既定 TTL</strong></td>
</tr>
<tr>
<td>注意</td>
<td><strong>最小 TTL を 0 より大きくすると、オリジンの <code>no-cache</code> 等を上書きしてキャッシュする</strong></td>
</tr>
</tbody>
</table></div>
<h4>(4) 無効化(Invalidation)のポイント</h4>
<ul>
<li><strong>パスを指定</strong>(<code>/images/*</code>、<code>/index.html</code> など)して実行</li>
<li><strong>月あたり最初の 1,000 パスまで無料</strong>(以降は課金)。<strong>ワイルドカードは 1 パスとして数える</strong></li>
<li>完了まで <strong>数分</strong> かかる</li>
<li><strong>頻繁に無効化が必要なら、ファイル名にバージョン(ハッシュ)を付ける設計に変更</strong> する</li>
</ul>
<h4>(5) 監視メトリクス</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">メトリクス</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Requests</code></td>
<td>リクエスト数</td>
</tr>
<tr>
<td><code>4xxErrorRate</code> / <code>5xxErrorRate</code></td>
<td>エラー率</td>
</tr>
<tr>
<td><code>OriginLatency</code>(追加メトリクス)</td>
<td>オリジンの応答時間</td>
</tr>
<tr>
<td><code>CacheHitRate</code>(追加メトリクス)</td>
<td><strong>キャッシュヒット率</strong></td>
</tr>
</tbody>
</table></div>
<h4>(6) ベストプラクティス</h4>
<ul>
<li><strong>キャッシュキーを最小限</strong> にし、<strong>ヒット率を継続的に監視</strong></li>
<li><strong>静的コンテンツは長い TTL + ファイル名のバージョニング</strong>、<strong>動的なパーソナライズ内容は慎重に</strong></li>
<li><strong>Origin Shield</strong> でオリジンの負荷を軽減</li>
<li><strong>標準ログ / リアルタイムログ</strong> と CloudWatch メトリクスで挙動を把握</li>
<li><strong>オリジンのセキュリティ</strong>(OAC、SG)を CloudFront 経由のみに絞る</li>
</ul>
<h4>(7) 参考 URL</h4>
<ul>
<li>キャッシュヒット率の改善: <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio.html">https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cache-hit-ratio.html</a></li>
<li>コンテンツの有効期限(TTL): <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html">https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Expiration.html</a></li>
<li>ファイルの無効化: <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html">https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html</a></li>
</ul>
<h3 id="s-h3-60">Skill 5.3.4 🔴 ハイブリッド接続・プライベート接続のトラブルシュート</h3>
<blockquote>
<p>公式スキル文: ハイブリッド接続とプライベート接続の問題を特定・トラブルシュートする。(VPN は SOA-C02 の Task 4.2 から SOA-C03 では Task 5.1 側に移動)</p>
</blockquote>
<h4>(1) ハイブリッド接続の選択肢</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">方式</th>
<th scope="col">特徴</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Site-to-Site VPN</strong></td>
<td><strong>インターネット経由の IPsec</strong> で暗号化。<strong>1 つの接続に 2 本のトンネル(冗長化)</strong>。終端は <strong>仮想プライベートゲートウェイ(VGW)または Transit Gateway</strong>。ルーティングは <strong>BGP(動的)/ 静的</strong>。トンネルあたり最大 1.25 Gbps</td>
</tr>
<tr>
<td><strong>Direct Connect</strong></td>
<td><strong>専用線</strong> による接続。<strong>安定した帯域・低レイテンシ</strong>。<strong>単体では暗号化されない</strong>(VPN / MACsec と併用)。<strong>仮想インターフェイス(VIF)</strong>: プライベート / パブリック / トランジット</td>
</tr>
<tr>
<td><strong>Client VPN</strong></td>
<td><strong>ユーザー(クライアント)</strong> が VPC / オンプレに接続する <strong>マネージドな OpenVPN ベース</strong> のサービス</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg65" />

<h4>(2) VPN のトラブルシュート</h4>
<Diagram id="dg66" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">主な原因</th>
</tr>
</thead>
<tbody>
<tr>
<td>トンネルが DOWN</td>
<td><strong>事前共有キー・IKE / IPsec パラメーター不一致</strong>、カスタマーゲートウェイの設定誤り、<strong>UDP 500 / 4500 のブロック</strong>、NAT-T の設定</td>
</tr>
<tr>
<td>トンネルは UP だが通信できない</td>
<td><strong>ルーティング</strong>(BGP の広告漏れ・ルート伝播が無効)、<strong>SG / NACL</strong>、<strong>CIDR の重複</strong></td>
</tr>
<tr>
<td>通信が不安定・遅い</td>
<td><strong>帯域上限(トンネルあたり)</strong>、<strong>MTU / 断片化</strong>、非対称ルーティング、ECMP の利用(Transit Gateway)</td>
</tr>
</tbody>
</table></div>
<p><strong>VPN の監視</strong>: CloudWatch メトリクス <strong><code>TunnelState</code></strong>(0 = DOWN / 1 = UP)、<code>TunnelDataIn</code> / <code>TunnelDataOut</code>、VPN ログ(CloudWatch Logs に出力可能)</p>
<h4>(3) Direct Connect のトラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">確認すること</th>
</tr>
</thead>
<tbody>
<tr>
<td>接続(物理)が DOWN</td>
<td><code>ConnectionState</code> メトリクス、ケーブル・パートナー側の状態、ライト(光レベル)</td>
</tr>
<tr>
<td>VIF が <code>down</code></td>
<td><strong>VLAN ID・BGP の ASN・認証キー・IP アドレス</strong> の設定、ルーター側の設定</td>
</tr>
<tr>
<td>BGP セッションが確立しない</td>
<td><strong>ピア IP / ASN / MD5 キーの不一致</strong>、ファイアウォールで TCP 179 をブロック</td>
</tr>
<tr>
<td>通信できない</td>
<td><strong>仮想プライベートゲートウェイ / Direct Connect Gateway / Transit Gateway の関連付け</strong>、<strong>ルート広告・ルートテーブル</strong>、SG / NACL</td>
</tr>
<tr>
<td><strong>冗長性</strong></td>
<td><strong>複数接続 / 複数ロケーション</strong>、バックアップとして VPN。<strong>BFD</strong> で障害検知を高速化</td>
</tr>
</tbody>
</table></div>
<h4>(4) プライベート接続(PrivateLink / VPC エンドポイント)のトラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">確認すること</th>
</tr>
</thead>
<tbody>
<tr>
<td>エンドポイントに接続できない</td>
<td><strong>エンドポイントの SG が 443(必要なポート)を許可しているか</strong>、サブネットの NACL、ルート</td>
</tr>
<tr>
<td>名前解決が <strong>パブリック IP のまま</strong></td>
<td><strong>プライベート DNS が有効か</strong>、VPC の <code>enableDnsSupport</code> / <code>enableDnsHostnames</code>、<strong>クライアントの DNS 設定</strong></td>
</tr>
<tr>
<td><strong>ゲートウェイエンドポイント(S3)</strong> で通らない</td>
<td><strong>ルートテーブルにエンドポイントのルートがあるか</strong>、<strong>エンドポイントポリシー</strong>、<strong>S3 バケットポリシーの <code>aws:SourceVpce</code></strong></td>
</tr>
<tr>
<td>権限エラー</td>
<td><strong>エンドポイントポリシー</strong> が必要な操作を許可しているか</td>
</tr>
<tr>
<td><strong>エンドポイントサービス(自社公開)</strong></td>
<td><strong>接続リクエストの承認</strong>、<strong>NLB のヘルスチェックと正常ターゲット</strong>、<strong>AZ の一致</strong>(利用者とサービスで共通の AZ が必要)</td>
</tr>
<tr>
<td>オンプレからエンドポイントを使えない</td>
<td><strong>DNS(Resolver インバウンド)</strong>、VPN / Direct Connect のルーティング</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li>VPN は <strong>2 本のトンネルをどちらも使えるように構成</strong>(カスタマー側も冗長化)。<strong>BGP で動的ルーティング</strong></li>
<li>重要な接続は <strong>Direct Connect + VPN バックアップ</strong>、<strong>複数ロケーション</strong></li>
<li><strong>TunnelState / ConnectionState にアラーム</strong> を設定</li>
<li><strong>CIDR の重複を避ける</strong> ネットワーク設計</li>
<li><strong>ハイブリッド DNS(Resolver エンドポイント)</strong> を忘れずに構成</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>Site-to-Site VPN: <a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html">https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html</a></li>
<li>VPN のトラブルシュート: <a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/Troubleshooting.html">https://docs.aws.amazon.com/vpn/latest/s2svpn/Troubleshooting.html</a></li>
<li>Direct Connect: <a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html">https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html</a></li>
<li>AWS PrivateLink: <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html">https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html</a></li>
</ul>
<h3 id="s-h3-61">Skill 5.3.5 🟡 CloudWatch ネットワークモニタリングサービスの設定と分析</h3>
<blockquote>
<p>公式スキル文: CloudWatch のネットワークモニタリングサービスを設定・分析する。(<strong>SOA-C03 で追加</strong>)</p>
</blockquote>
<h4>(1) 3 つのサービスの役割</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col"><strong>何を測るか</strong></th>
<th scope="col">仕組み</th>
<th scope="col">主な用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CloudWatch Internet Monitor</strong></td>
<td><strong>インターネット経由での、ユーザーとアプリケーションの間の性能・可用性</strong></td>
<td>AWS が世界のインターネットトラフィックを分析し、<strong>クライアントの場所・ISP(ネットワーク)</strong> 別に <strong>可用性・レイテンシ</strong> を可視化。VPC、CloudFront、NLB、WorkSpaces などをモニタリング対象に指定</td>
<td>「<strong>特定の地域・ISP のユーザーだけ遅い / 繋がらない</strong>」の原因が <strong>インターネット側</strong> かを判断。ヘルスイベント通知、<strong>より速い経路(CloudFront など)の提案</strong></td>
</tr>
<tr>
<td><strong>CloudWatch Network Synthetic Monitor</strong></td>
<td><strong>AWS とオンプレミスの間のハイブリッド接続</strong>(Direct Connect / VPN)の <strong>パケットロスとレイテンシ</strong></td>
<td><strong>VPC のサブネットから、オンプレの宛先 IP へ継続的にプローブ(ICMP / TCP)</strong> を送る <strong>アクティブ監視</strong>(エージェント不要)</td>
<td><strong>ハイブリッド回線の劣化</strong> を事前に検知</td>
</tr>
<tr>
<td><strong>CloudWatch Network Flow Monitor</strong></td>
<td><strong>ワークロード間 / ワークロードと AWS サービス間のネットワークフロー</strong> の性能</td>
<td><strong>EC2 / EKS に軽量エージェント</strong> を導入し、<strong>再送・再送タイムアウト・転送量</strong> などを収集。<strong>問題が AWS ネットワーク側かどうか</strong> を判定する洞察</td>
<td><strong>ワークロード同士の通信遅延・パケット再送</strong> の原因調査</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg67" />

<h4>(2) その他の関連機能</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CloudWatch Synthetics(カナリア)</strong></td>
<td><strong>スクリプトで定期的に URL / API にアクセス</strong> し、可用性・応答時間を監視(<strong>ユーザー視点</strong>)</td>
</tr>
<tr>
<td>ELB / NAT / TGW / VPN の <strong>メトリクス</strong></td>
<td><code>TargetResponseTime</code>、<code>ErrorPortAllocation</code>、<code>PacketDropCount...</code>、<code>TunnelState</code> など</td>
</tr>
<tr>
<td>VPC フローログ</td>
<td>Skill 5.3.2</td>
</tr>
</tbody>
</table></div>
<h4>(3) ベストプラクティス</h4>
<ul>
<li>ユーザー向けのアプリは <strong>Internet Monitor で地域 / ISP 別の傾向</strong> を継続的に把握する</li>
<li><strong>ハイブリッド接続は Network Synthetic Monitor</strong> で、<strong>障害が起きる前に劣化を検知</strong></li>
<li><strong>アラーム(パケットロス・レイテンシのしきい値)を設定</strong> して通知・自動対応につなぐ</li>
<li>問題の切り分けは <strong>「ユーザー ⇔ インターネット」→「オンプレ ⇔ AWS」→「AWS 内部」</strong> の順に、適切なサービスを使い分ける</li>
<li>結果を <strong>ダッシュボードに集約</strong> する</li>
</ul>
<h4>(4) 参考 URL</h4>
<ul>
<li>CloudWatch Internet Monitor: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-InternetMonitor.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-InternetMonitor.html</a></li>
<li>CloudWatch Network Synthetic Monitor: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/what-is-network-monitor.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/what-is-network-monitor.html</a></li>
<li>CloudWatch Network Flow Monitor: <a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-NetworkFlowMonitor.html">https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-NetworkFlowMonitor.html</a></li>
</ul>
        </>
    );
}
