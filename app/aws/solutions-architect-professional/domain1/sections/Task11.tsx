import { Diagram } from "../Diagram";

export default function Task11() {
    return (
        <section className="guide-section" data-section="task11">
<h2 id="2-task-11-ネットワーク接続戦略を設計する" tabIndex={-1}>
                    2. Task 1.1 ネットワーク接続戦略を設計する
                </h2>
<h3 id="21-exam-guide-が求めている内容" tabIndex={-1}>2.1 Exam Guide が求めている内容</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.1 Exam Guide が求めている内容 (表3)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">区分</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Knowledge</td>
                                <td>
                                    AWS グローバルインフラ, VPC / Direct Connect / VPN /
                                    推移的ルーティング / コンテナサービス, ハイブリッド DNS (Route
                                    53 Resolver), ネットワーク分割 (サブネット, IP アドレス, VPC
                                    間接続), ネットワークトラフィック監視
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Skills</td>
                                <td>
                                    複数 VPC の接続方式の評価,
                                    オンプレミスやコロケーションとの統合方式の評価,
                                    ネットワークとレイテンシ要件に基づくリージョンと AZ の選択, AWS
                                    ツールによるトラフィックフローのトラブルシューティング,
                                    サービスエンドポイントの利用
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="22-step-1-基礎用語を押さえる" tabIndex={-1}>2.2 Step 1: 基礎用語を押さえる</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.2 Step 1: 基礎用語を押さえる (表4)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">用語</th>
                                <th scope="col">意味</th>
                                <th scope="col">試験でのポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>CIDR</td>
                                <td>IP アドレス範囲の表記 (例 10.0.0.0/16)</td>
                                <td>VPC 間でCIDRが重複するとピアリングや TGW の経路が成立しない</td>
                            </tr>
                            <tr className="even">
                                <td>サブネット</td>
                                <td>VPC を AZ 単位で分割した範囲</td>
                                <td>1つのサブネットは1つの AZ にのみ属する</td>
                            </tr>
                            <tr className="odd">
                                <td>ルートテーブル</td>
                                <td>宛先ごとの転送先を決める表</td>
                                <td>接続を作っただけでは通信できず、経路追加が必要</td>
                            </tr>
                            <tr className="even">
                                <td>Internet Gateway</td>
                                <td>VPC とインターネットを結ぶ出入口</td>
                                <td>パブリックサブネットはこれへの経路を持つ</td>
                            </tr>
                            <tr className="odd">
                                <td>NAT Gateway</td>
                                <td>プライベートサブネットから外向きのみ通信させる</td>
                                <td>AZ 単位のリソース。AZ ごとに配置して耐障害性を確保する</td>
                            </tr>
                            <tr className="even">
                                <td>推移的ルーティング</td>
                                <td>A-B-C とつながるとき A から C へ B 経由で通信できること</td>
                                <td>VPC ピアリングでは成立しない (非推移的)</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="23-step-2-aws-グローバルインフラと-region--az-の選び方" tabIndex={-1}>
                    2.3 Step 2: AWS グローバルインフラと Region / AZ の選び方
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.3 Step 2: AWS グローバルインフラと Region / AZ の選び方 (表5)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">構成要素</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Region</td>
                                <td>
                                    地理的に独立した拠点。サービス提供状況や価格はリージョンで異なる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Availability Zone</td>
                                <td>リージョン内の独立したデータセンター群。低遅延でつながる</td>
                            </tr>
                            <tr className="odd">
                                <td>Local Zone / Wavelength / Outposts</td>
                                <td>利用者やオンプレミスに近い場所で AWS を使うための拡張</td>
                            </tr>
                            <tr className="even">
                                <td>エッジロケーション</td>
                                <td>
                                    CloudFront や Global Accelerator などのコンテンツ配信と受付拠点
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>リージョン選択で確認する観点 (優先順の目安):</p>
<ol>
                    <li>法規制とデータ所在地の要件 (データを国外に出せない場合は最優先)</li>
                    <li>利用者とのレイテンシ</li>
                    <li>必要なサービスや機能がそのリージョンで提供されているか</li>
                    <li>料金</li>
                    <li>DR 構成を組む場合の対になるリージョンの距離と提供状況</li>
                </ol>
<h3 id="24-step-3-複数-vpc-をつなぐ方式を選ぶ" tabIndex={-1}>
                    2.4 Step 3: 複数 VPC をつなぐ方式を選ぶ
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.4 Step 3: 複数 VPC をつなぐ方式を選ぶ (表6)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">仕組み</th>
                                <th scope="col">向いているケース</th>
                                <th scope="col">制約と注意点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>VPC ピアリング</td>
                                <td>2つの VPC を1対1で接続</td>
                                <td>VPC が少数で単純な接続</td>
                                <td>
                                    非推移的。CIDR 重複不可。VPC
                                    数が増えると接続数が急増して管理困難
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Transit Gateway (TGW)</td>
                                <td>リージョナルなハブに VPC や VPN を接続</td>
                                <td>多数の VPC とオンプレミスを集約</td>
                                <td>
                                    アタッチメントとデータ処理に課金。ルートテーブルで分離が可能
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>AWS PrivateLink</td>
                                <td>特定のサービスだけを非公開で公開</td>
                                <td>CIDR が重複していてもサービス単位で提供したい場合</td>
                                <td>一方向 (利用者から提供者) の接続。VPC 全体の接続ではない</td>
                            </tr>
                            <tr className="even">
                                <td>VPC 共有 (RAM)</td>
                                <td>1つの VPC のサブネットを他アカウントに共有</td>
                                <td>ネットワークを一元管理して多数のアカウントで使う</td>
                                <td>サブネット共有で、アカウントごとの VPC は作らない</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<Diagram id="diag-3" label={"2.4 Step 3: 複数 VPC をつなぐ方式を選ぶ"} />
<h4>Transit Gateway の重要ポイント</h4>
<ul>
                    <li>
                        接続対象 (アタッチメント): VPC, Site-to-Site VPN, Direct Connect Gateway,
                        他の TGW (ピアリング), Connect (SD-WAN 向け)
                    </li>
                    <li>
                        ルートテーブルの「関連付け (association)」と「伝播
                        (propagation)」で、どのアタッチメント同士が通信できるかを制御できます。本番と開発を分離するときの定番手法です
                    </li>
                    <li>
                        リージョン間は TGW ピアリングで接続できます (ピアリング経路は静的ルート)
                    </li>
                    <li>
                        検査用 VPC (ファイアウォール機器など) を経由させる場合は、往復の経路を同じ
                        AZ に揃えるため Appliance mode を有効にします
                    </li>
                    <li>
                        VPN アタッチメントで ECMP を使うと、VPN
                        トンネル1本あたりの帯域を超えて合算できます
                    </li>
                </ul>
<Diagram id="diag-4" label={"Transit Gateway の重要ポイント"} />
<h4>推移的ルーティングの考え方 (頻出)</h4>
<ul>
                    <li>VPC ピアリングでは、A-B と B-C をつないでも A から C へは通信できません</li>
                    <li>
                        ピアリング先の VPC にある VPN、Direct Connect、NAT
                        Gateway、インターネットゲートウェイを経由した通信 (エッジ間ルーティング)
                        もできません
                    </li>
                    <li>
                        解決策は「ハブとなる TGW
                        を使う」か「必要な組み合わせの分だけ直接ピアリングする」です
                    </li>
                </ul>
<h3 id="25-step-4-オンプレミスやコロケーションと接続する" tabIndex={-1}>
                    2.5 Step 4: オンプレミスやコロケーションと接続する
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.5 Step 4: オンプレミスやコロケーションと接続する (表7)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方式</th>
                                <th scope="col">特徴</th>
                                <th scope="col">向いているケース</th>
                                <th scope="col">注意点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Site-to-Site VPN</td>
                                <td>インターネット経由の IPsec。1接続に2本のトンネル</td>
                                <td>早く安く始めたい。バックアップ回線</td>
                                <td>
                                    標準トンネルの帯域は1本あたり約1.25 Gbps が上限。Transit Gateway
                                    または Cloud WAN にアタッチした接続では Large Bandwidth Tunnels
                                    により1本あたり最大5 Gbps。インターネット品質に依存
                                </td>
                            </tr>
                            <tr className="even">
                                <td>AWS Direct Connect</td>
                                <td>専用線でAWSに接続</td>
                                <td>安定した帯域と低遅延、大容量転送</td>
                                <td>開通に時間がかかる。標準では暗号化されない</td>
                            </tr>
                            <tr className="odd">
                                <td>Direct Connect + VPN</td>
                                <td>専用線上で IPsec を重ねる</td>
                                <td>専用線でも暗号化が必須の要件</td>
                                <td>構成が複雑になる。MACsec という選択肢もある</td>
                            </tr>
                            <tr className="even">
                                <td>Client VPN</td>
                                <td>利用者端末向けの VPN</td>
                                <td>リモートワーカーの接続</td>
                                <td>拠点間接続ではない</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h4>Direct Connect の基本構成</h4>
<ul>
                    <li>接続 (Connection): 専用接続 (Dedicated) とホスト型接続 (パートナー経由)</li>
                    <li>
                        仮想インターフェイス (VIF): Private VIF (VPC や VGW への接続), Public VIF
                        (AWS のパブリックサービスへの接続), Transit VIF (Transit Gateway への接続)
                    </li>
                    <li>
                        Direct Connect Gateway: 複数リージョンの VPC や TGW に1本の Direct Connect
                        から到達させる
                    </li>
                    <li>
                        回復性の考え方: 1拠点1回線は単一障害点です。AWS は「最大の回復性
                        (2ロケーションに各2回線)」「高い回復性
                        (2ロケーションに各1回線)」「開発とテスト用」といったモデルを提示しています
                    </li>
                    <li>低コストのバックアップには Site-to-Site VPN を併用するのが定番です</li>
                </ul>
<Diagram id="diag-5" label={"Direct Connect の基本構成"} />
<h3 id="26-step-5-ハイブリッド-dns-route-53-resolver" tabIndex={-1}>
                    2.6 Step 5: ハイブリッド DNS (Route 53 Resolver)
                </h3>
<p>オンプレミスと AWS の間で名前解決を相互に行うための仕組みです。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.6 Step 5: ハイブリッド DNS (Route 53 Resolver) (表8)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">構成要素</th>
                                <th scope="col">役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Inbound Endpoint</td>
                                <td>
                                    オンプレミスの DNS から AWS 内 (プライベートホストゾーン)
                                    の名前を引くための入口
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Outbound Endpoint</td>
                                <td>
                                    AWS から オンプレミスの DNS へ問い合わせを転送するための出口
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>転送ルール (Forwarding Rule)</td>
                                <td>特定のドメインを特定の DNS サーバーへ転送するルール</td>
                            </tr>
                            <tr className="even">
                                <td>Route 53 Profiles / RAM</td>
                                <td>ルールや設定を複数 VPC やアカウントで共有する</td>
                            </tr>
                            <tr className="odd">
                                <td>Resolver DNS Firewall</td>
                                <td>不正ドメインへの問い合わせを制御する</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<Diagram id="diag-6" label={"2.6 Step 5: ハイブリッド DNS (Route 53 Resolver)"} />
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">ベストプラクティス</div>
                        <ul>
                            <li>Resolver Endpoint は可用性のため複数 AZ に配置する</li>
                            <li>
                                転送ルールは共有サービスアカウントで一元管理し、AWS RAM
                                で他アカウントに共有する
                            </li>
                            <li>
                                プライベートホストゾーンを複数 VPC やアカウントで使うときは、VPC
                                の関連付けを行う (別アカウントの VPC には関連付けの認可が必要)
                            </li>
                        </ul>
                    </div>
                </div>
<h3 id="27-step-6-ネットワーク分割と-ip-アドレス設計" tabIndex={-1}>
                    2.7 Step 6: ネットワーク分割と IP アドレス設計
                </h3>
<ul>
                    <li>
                        最初に全社の IP 計画を作り、VPC の CIDR
                        を重複させないことが最大の原則です。後から変更するのは困難です
                    </li>
                    <li>
                        IP アドレス管理には Amazon VPC IP Address Manager (IPAM)
                        を使うと、組織全体の CIDR の割り当てと重複検出を自動化できます
                    </li>
                    <li>IP アドレスが不足する場合は VPC にセカンダリ CIDR を追加できます</li>
                    <li>
                        コンテナ (EKS など) は Pod が VPC の IP
                        を消費しやすく、枯渇しがちです。セカンダリ CIDR を使う、IPv6
                        を使うといった対策が必要です
                    </li>
                    <li>
                        セキュリティグループ (インスタンス単位、ステートフル) とネットワーク ACL
                        (サブネット単位、ステートレス) の使い分けは Task 1.2 で扱います
                    </li>
                </ul>
<h3 id="28-step-7-サービスエンドポイント-vpc-エンドポイント" tabIndex={-1}>
                    2.8 Step 7: サービスエンドポイント (VPC エンドポイント)
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.8 Step 7: サービスエンドポイント (VPC エンドポイント) (表9)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">種類</th>
                                <th scope="col">対象</th>
                                <th scope="col">仕組み</th>
                                <th scope="col">料金</th>
                                <th scope="col">オンプレミスからの利用</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Gateway エンドポイント</td>
                                <td>Amazon S3 と DynamoDB のみ</td>
                                <td>ルートテーブルにエントリを追加</td>
                                <td>無料</td>
                                <td>不可 (ピアリング先 VPC からも不可)</td>
                            </tr>
                            <tr className="even">
                                <td>Interface エンドポイント</td>
                                <td>多数の AWS サービス, 他社提供サービス, 自社公開サービス</td>
                                <td>サブネットに ENI を作成 (PrivateLink)</td>
                                <td>時間料金とデータ処理料金</td>
                                <td>可 (Direct Connect や VPN 経由)</td>
                            </tr>
                            <tr className="odd">
                                <td>Gateway Load Balancer エンドポイント</td>
                                <td>ファイアウォールなど仮想アプライアンス</td>
                                <td>トラフィックをアプライアンスへ透過的に誘導</td>
                                <td>時間料金とデータ処理料金</td>
                                <td>用途による</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">ベストプラクティス</div>
                        <ul>
                            <li>
                                VPC 内から S3 や DynamoDB へのアクセスは、まず無料の Gateway
                                エンドポイントを検討する (NAT Gateway のデータ処理料金も削減できる)
                            </li>
                            <li>
                                オンプレミスから S3 へプライベートにアクセスしたい場合は、Interface
                                エンドポイントを使う
                            </li>
                            <li>
                                エンドポイントポリシーで、アクセスできるバケットやアクション、組織
                                (<code>aws:PrincipalOrgID</code>) を絞り込む
                            </li>
                            <li>
                                共有サービス VPC にエンドポイントを集約し、TGW
                                経由で共有する構成はコスト削減に有効だが、データ処理料金と DNS
                                設計も合わせて評価する
                            </li>
                        </ul>
                    </div>
                </div>
<h3 id="29-step-8-集中型ネットワーク設計パターン-ハブアンドスポーク" tabIndex={-1}>
                    2.9 Step 8: 集中型ネットワーク設計パターン (ハブ・アンド・スポーク)
                </h3>
<p>
                    多数のアカウントと VPC
                    がある組織では、ネットワークアカウントに共通機能を集約します。
                </p>
<Diagram id="diag-7" label={"2.9 Step 8: 集中型ネットワーク設計パターン (ハブ・アンド・スポーク)"} />
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.9 Step 8: 集中型ネットワーク設計パターン (ハブ・アンド・スポーク) (表10)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">集約するもの</th>
                                <th scope="col">目的</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>検査 (Network Firewall, GWLB)</td>
                                <td>出入りと VPC 間通信の一元的な検査</td>
                            </tr>
                            <tr className="even">
                                <td>Egress (NAT Gateway)</td>
                                <td>外向き通信の出口を統一し、監視と制御を容易にする</td>
                            </tr>
                            <tr className="odd">
                                <td>Direct Connect と VPN</td>
                                <td>回線を共有し、アカウントごとに専用線を持たない</td>
                            </tr>
                            <tr className="even">
                                <td>DNS とエンドポイント</td>
                                <td>名前解決と PrivateLink の共有</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="210-step-9-ネットワークの監視とトラブルシューティング" tabIndex={-1}>
                    2.10 Step 9: ネットワークの監視とトラブルシューティング
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.10 Step 9: ネットワークの監視とトラブルシューティング (表11)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ツール</th>
                                <th scope="col">用途</th>
                                <th scope="col">使いどころ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>VPC Flow Logs</td>
                                <td>IP トラフィックのメタデータ記録 (許可と拒否)</td>
                                <td>通信が拒否されているか、誰が通信しているか</td>
                            </tr>
                            <tr className="even">
                                <td>Traffic Mirroring</td>
                                <td>パケット本体を複製して分析ツールへ送る</td>
                                <td>詳細なパケット解析、侵入検知</td>
                            </tr>
                            <tr className="odd">
                                <td>Reachability Analyzer</td>
                                <td>2点間の到達性を設定から静的に解析</td>
                                <td>「なぜつながらないか」を経路上で特定</td>
                            </tr>
                            <tr className="even">
                                <td>Network Access Analyzer</td>
                                <td>意図しないネットワークアクセス経路の検出</td>
                                <td>想定外の公開や経路の監査</td>
                            </tr>
                            <tr className="odd">
                                <td>Transit Gateway Network Manager</td>
                                <td>TGW やグローバルネットワークの可視化</td>
                                <td>多拠点ネットワークの一元的な把握</td>
                            </tr>
                            <tr className="even">
                                <td>Route 53 Resolver クエリログ</td>
                                <td>DNS クエリの記録</td>
                                <td>名前解決の不具合調査やセキュリティ調査</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>トラブルシューティングの標準手順:</p>
<Diagram id="diag-8" label={"2.10 Step 9: ネットワークの監視とトラブルシューティング"} />
<h3 id="211-コンテナサービスのネットワーク-exam-guide-の-knowledge-に登場" tabIndex={-1}>
                    2.11 コンテナサービスのネットワーク (Exam Guide の Knowledge に登場)
                </h3>
<ul>
                    <li>
                        Amazon ECS の awsvpc ネットワークモードでは、タスクごとに ENI
                        が割り当てられ、タスク単位でセキュリティグループを設定できる
                    </li>
                    <li>
                        Amazon EKS の標準 CNI (VPC CNI) は Pod に VPC の IP
                        アドレスを割り当てるため、サブネットの IP 枯渇に注意する
                    </li>
                    <li>
                        プライベートサブネットのコンテナがイメージを取得するには、ECR 用の 2 つの
                        Interface エンドポイント (<code>com.amazonaws.&lt;region&gt;.ecr.api</code>
                        と <code>com.amazonaws.&lt;region&gt;.ecr.dkr</code>)
                        と、イメージレイヤーを取得する S3 の Gateway エンドポイントを用意すると、NAT
                        Gateway 経由を避けられる
                    </li>
                </ul>
<h3 id="212-task-11-ベストプラクティスまとめ" tabIndex={-1}>
                    2.12 Task 1.1 ベストプラクティスまとめ
                </h3>
<ul>
                    <li>全社の IP 計画を先に作成し、CIDR の重複を防ぐ (IPAM の活用)</li>
                    <li>VPC が増える見込みなら、最初から Transit Gateway を採用する</li>
                    <li>本番と非本番はルートテーブルで分離する</li>
                    <li>Direct Connect には必ず冗長化と VPN のバックアップを組み合わせる</li>
                    <li>暗号化要件がある場合は MACsec か VPN を併用する</li>
                    <li>S3 と DynamoDB には Gateway エンドポイントを使う</li>
                    <li>NAT Gateway と主要リソースは AZ ごとに配置する</li>
                    <li>通信の記録 (Flow Logs) を有効化し、組織の集中ログに送る</li>
                </ul>
<h3 id="213-task-11-でよく狙われる落とし穴" tabIndex={-1}>
                    2.13 Task 1.1 でよく狙われる落とし穴
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2.13 Task 1.1 でよく狙われる落とし穴 (表12)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">状況</th>
                                <th scope="col">誤りやすい選択</th>
                                <th scope="col">正しい考え方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>多数の VPC を相互接続</td>
                                <td>ピアリングを網目状に作成</td>
                                <td>Transit Gateway を使う</td>
                            </tr>
                            <tr className="even">
                                <td>CIDR が重複した VPC 間で一部サービスだけ提供</td>
                                <td>ピアリング</td>
                                <td>PrivateLink を使う</td>
                            </tr>
                            <tr className="odd">
                                <td>オンプレミスから S3 へプライベート接続</td>
                                <td>Gateway エンドポイント</td>
                                <td>Interface エンドポイント (Gateway はオンプレミスから不可)</td>
                            </tr>
                            <tr className="even">
                                <td>専用線の暗号化</td>
                                <td>専用線は安全だから不要</td>
                                <td>標準では暗号化されない。MACsec や VPN を併用</td>
                            </tr>
                            <tr className="odd">
                                <td>専用線の障害対策</td>
                                <td>回線を1本のまま</td>
                                <td>複数ロケーションの冗長化と VPN バックアップ</td>
                            </tr>
                            <tr className="even">
                                <td>経路は正しいのにつながらない</td>
                                <td>ルートテーブルのみ確認</td>
                                <td>SG, NACL (ステートレスで戻り通信も必要), Flow Logs まで確認</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="214-ソース-task-11" tabIndex={-1}>2.14 ソース (Task 1.1)</h3>
<ul>
                    <li>
                        Building a Scalable and Secure Multi-VPC AWS Network Infrastructure:
                        <a href="https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/welcome.html">https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/welcome.html</a>
                    </li>
                    <li>
                        VPC ピアリング:
                        <a href="https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html">https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html</a>
                    </li>
                    <li>
                        Transit Gateway:
                        <a href="https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html">https://docs.aws.amazon.com/vpc/latest/tgw/what-is-transit-gateway.html</a>
                    </li>
                    <li>
                        AWS PrivateLink:
                        <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html">https://docs.aws.amazon.com/vpc/latest/privatelink/what-is-privatelink.html</a>
                    </li>
                    <li>
                        Gateway エンドポイント:
                        <a href="https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html">https://docs.aws.amazon.com/vpc/latest/privatelink/gateway-endpoints.html</a>
                    </li>
                    <li>
                        Site-to-Site VPN:
                        <a href="https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html">https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html</a>
                    </li>
                    <li>
                        AWS Direct Connect:
                        <a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html">https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html</a>
                    </li>
                    <li>
                        Direct Connect Resiliency Toolkit:
                        <a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html">https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_toolkit.html</a>
                    </li>
                    <li>
                        Amazon VPC connectivity options (ホワイトペーパー):
                        <a href="https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/welcome.html">https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/welcome.html</a>
                    </li>
                    <li>
                        Route 53 Resolver:
                        <a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html">https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver.html</a>
                    </li>
                    <li>
                        Hybrid Cloud DNS Options for Amazon VPC:
                        <a href="https://docs.aws.amazon.com/whitepapers/latest/hybrid-cloud-dns-options-for-vpc/hybrid-cloud-dns-options-for-vpc.html">https://docs.aws.amazon.com/whitepapers/latest/hybrid-cloud-dns-options-for-vpc/hybrid-cloud-dns-options-for-vpc.html</a>
                    </li>
                    <li>
                        VPC IPAM:
                        <a href="https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html">https://docs.aws.amazon.com/vpc/latest/ipam/what-it-is-ipam.html</a>
                    </li>
                    <li>
                        VPC Flow Logs:
                        <a href="https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html">https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html</a>
                    </li>
                    <li>
                        Traffic Mirroring:
                        <a href="https://docs.aws.amazon.com/vpc/latest/mirroring/what-is-traffic-mirroring.html">https://docs.aws.amazon.com/vpc/latest/mirroring/what-is-traffic-mirroring.html</a>
                    </li>
                    <li>
                        Reachability Analyzer:
                        <a href="https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html">https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html</a>
                    </li>
                    <li>
                        Network Access Analyzer:
                        <a href="https://docs.aws.amazon.com/vpc/latest/network-access-analyzer/what-is-network-access-analyzer.html">https://docs.aws.amazon.com/vpc/latest/network-access-analyzer/what-is-network-access-analyzer.html</a>
                    </li>
                </ul>
<hr />
        </section>
    );
}
