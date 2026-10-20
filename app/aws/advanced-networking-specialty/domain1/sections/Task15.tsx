import {Diagram} from '../Diagram';
/** 原本のtask5を全文・順序どおり保持する。 */
export default function Task15(){return <section className="guide-part" data-part="task5"><h2 id={"task-15-ハイブリッド接続とルーティング"} tabIndex={-1}>{" Task 1.5: ハイブリッド接続とルーティング "}</h2>
{" "}
<p >{" タスク文: オンプレミスネットワークと AWS クラウドの間の、ルーティング戦略と接続アーキテクチャを設計する。 "}</p>
{" "}
<h3 id={"試験ガイドが求める内容-4"} tabIndex={-1}>{"試験ガイドが求める内容"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"試験ガイドが求める内容（表48）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"項目"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Knowledge"}</td><td >{"ルーティングの基礎 (動的と静的、BGP)"}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{" 物理的な相互接続の L1 と L2 の概念 (VLAN、LAG、光モジュール、ジャンボフレーム) "}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{"カプセル化と暗号化の技術 (GRE、IPsec)"}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{"AWS アカウント間のリソース共有"}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{"オーバーレイネットワーク"}</td></tr><tr className={"even"}><td >{"Skills"}</td><td >{"ハイブリッド接続の要件の特定"}</td></tr><tr className={"odd"}><td >{"Skills"}</td><td >{" AWS Direct Connect と AWS Site-to-Site VPN による冗長なハイブリッド接続の設計 "}</td></tr><tr className={"even"}><td >{"Skills"}</td><td >{" BGP 属性を使い、望ましいトラフィックパターン (負荷分散、アクティブ・パッシブ) に合わせて経路を制御する BGP ルーティングの設計 "}</td></tr><tr className={"odd"}><td >{"Skills"}</td><td >{" SD-WAN と AWS の統合の設計 (Transit Gateway Connect、オーバーレイネットワーク) "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-1-ルーティングの基礎"} tabIndex={-1}>{"ステップ 1: ルーティングの基礎"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 1: ルーティングの基礎（表49）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"方式"}</th><th scope="col">{"特徴"}</th><th scope="col">{"向く場面"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"静的ルーティング"}</td><td >{"管理者が手動で経路を設定する。障害時の自動切り替えがない"}</td><td >{"小規模、単純な構成"}</td></tr><tr className={"even"}><td >{"動的ルーティング (BGP)"}</td><td >{" ルーター同士が経路情報を交換し、障害時に自動で経路を切り替える "}</td><td >{"冗長構成、大規模、ハイブリッド接続全般"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"BGP の基本"}</h4>
{" "}
<ul >{" "}<li >{" BGP は、異なる自律システム (AS) 間で経路を交換するプロトコル。AWS とオンプレミスの間では eBGP を使う。 "}</li>{" "}<li >{" AS 番号 (ASN): 自分の AS を識別する番号。プライベート ASN の範囲は、16 ビットの 64512 から 65534 と、32 ビットの 4200000000 から 4294967294。 "}</li>{" "}<li >{" 経路選択の基本は「最長一致 (より具体的なプレフィックス) が優先」。同じプレフィックスなら、BGP 属性で優劣を決める。 "}</li>{" "}<li >{" BGP セッションは、ホールドタイマーでダウンを検出する。より速く検出したい場合は、BFD (双方向フォワーディング検出) を使う。Direct Connect では AWS 側で BFD が自動で有効になるので、オンプレミスのルーター側で設定する。 "}</li>{" "}<li >{" ルート数には上限があり、超過するとセッションが切れる場合がある。そのため、広告するプレフィックスは集約する。 "}</li>{" "}</ul>
{" "}
<h4 >{"主な BGP 属性"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"主な BGP 属性（表50）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"属性"}</th><th scope="col">{"意味"}</th><th scope="col">{"使い方"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"ローカルプリファレンス"}</td><td >{"自 AS 内で、どの出口を優先するか (値が大きいほど優先)"}</td><td >{"オンプレミスから AWS へ出ていく経路を制御する"}</td></tr><tr className={"even"}><td >{"AS パス (プリペンド)"}</td><td >{"経路が通過する AS の数 (短いほど優先)"}</td><td >{"自分の ASN を重複して付けて、経路を劣後させる"}</td></tr><tr className={"odd"}><td >{"MED"}</td><td >{"隣接する AS に、どの入口を使ってほしいかを示す"}</td><td >{"同じ隣接 AS との複数のリンク間の優先度"}</td></tr><tr className={"even"}><td >{"コミュニティ"}</td><td >{"経路に付けるタグ"}</td><td >{" Direct Connect では、ローカルプリファレンスの指定や、広告範囲の制御に使う "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-2-aws-direct-connect-dx"} tabIndex={-1}>{"ステップ 2: AWS Direct Connect (DX)"}</h3>
{" "}
<p >{" Direct Connect は、オンプレミスと AWS を、専用線で接続するサービスです。インターネットを経由しないため、遅延と帯域が安定し、データ転送料金も低くなります。 "}</p>
{" "}
<h4 >{"接続の種類"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"接続の種類（表51）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"専用接続 (Dedicated)"}</td><td >{" AWS から直接、専用のポートを提供する (1、10、100 Gbps など)。お客様が、DX ロケーションまでの回線を手配する "}</td></tr><tr className={"even"}><td >{"ホスト接続 (Hosted)"}</td><td >{" AWS パートナーが提供する。50 Mbps など、小さい帯域から選べる "}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"仮想インターフェイス (VIF)"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仮想インターフェイス (VIF)（表52）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"VIF の種類"}</th><th scope="col">{"接続先"}</th><th scope="col">{"用途"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"プライベート VIF"}</td><td >{" VPC (仮想プライベートゲートウェイ) または Direct Connect ゲートウェイ "}</td><td >{"プライベート IP で VPC へ接続する"}</td></tr><tr className={"even"}><td >{"トランジット VIF"}</td><td >{"Direct Connect ゲートウェイ経由で Transit Gateway"}</td><td >{"多数の VPC を、Transit Gateway で集約して接続する"}</td></tr><tr className={"odd"}><td >{"パブリック VIF"}</td><td >{" AWS のパブリックサービス (S3、DynamoDB などのパブリックエンドポイント) "}</td><td >{" インターネットを経由せず、パブリックエンドポイントへ接続する "}</td></tr></tbody></table>{" "}</div>
{" "}
<ul >{" "}<li >{"各 VIF は、IEEE 802.1Q の VLAN タグで識別される (L2 の概念)。"}</li>{" "}<li >{"ホスト接続は、1 つの VIF のみをサポートする。"}</li>{" "}<li >{" Direct Connect ゲートウェイは、グローバルなリソースで、任意の DX ロケーションの VIF から、異なるリージョンの VPC や Transit Gateway へ接続できる。 "}</li>{" "}</ul>
{" "}
<p >{" 落とし穴: 1 つの Direct Connect ゲートウェイに、複数の VPC を関連付けても、VPC 間の通信は転送されません (VPC 間の推移的な通信は不可)。VPC 同士をつなぎたい場合は、Transit Gateway などを使います。 "}</p>
{" "}
<h4 >{"物理層 (L1) と L2 の概念"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"物理層 (L1) と L2 の概念（表53）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"光モジュールと光ファイバー"}</td><td >{" シングルモードファイバー。1 Gbps は 1000BASE-LX、10 Gbps は 10GBASE-LR、100 Gbps は 100GBASE-LR4 など、速度に応じた規格を選ぶ "}</td></tr><tr className={"even"}><td >{"オートネゴシエーション"}</td><td >{" ポートの速度設定と、AWS 側の設定を合わせる。不一致はリンクが上がらない原因になる "}</td></tr><tr className={"odd"}><td >{"LAG (リンクアグリゲーション)"}</td><td >{" LACP (IEEE 802.3ad) で、同じ帯域の複数の接続を、1 つの論理的な接続にまとめる。帯域の拡大と冗長化ができる。構成できる接続数と、最小リンク数の設定がある "}</td></tr><tr className={"even"}><td >{"ジャンボフレーム"}</td><td >{" プライベート VIF は MTU 9001、トランジット VIF は MTU 8500 まで対応する。パブリック VIF は非対応 "}</td></tr><tr className={"odd"}><td >{"MACsec"}</td><td >{" 対応する専用接続 (10 Gbps と 100 Gbps) で、L2 の暗号化ができる "}</td></tr></tbody></table>{" "}</div>
{" "}
<p >{" MTU の注意: 経路上の MTU が不一致だと、大きなパケットが破棄され、通信が不安定になる場合がある (PMTUD のための ICMP を許可する)。Site-to-Site VPN は、MTU が約 1500 バイトに制限される。 "}</p>
{" "}
<h3 id={"ステップ-3-aws-site-to-site-vpn"} tabIndex={-1}>{"ステップ 3: AWS Site-to-Site VPN"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 3: AWS Site-to-Site VPN（表54）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"仕組み"}</td><td >{" インターネット (または DX) 上で、IPsec トンネルを作って、暗号化して通信する "}</td></tr><tr className={"even"}><td >{"構成"}</td><td >{" 1 つの VPN 接続に、2 本のトンネル (異なる AZ のエンドポイント) がある。冗長性のため、両方を設定する "}</td></tr><tr className={"odd"}><td >{"帯域"}</td><td >{" トンネルあたり最大 1.25 Gbps の目安 (Transit Gateway と ECMP を使うと、複数トンネルで合算できる) "}</td></tr><tr className={"even"}><td >{"ルーティング"}</td><td >{"静的、または BGP による動的"}</td></tr><tr className={"odd"}><td >{"終端先"}</td><td >{" 仮想プライベートゲートウェイ、Transit Gateway、AWS Cloud WAN "}</td></tr><tr className={"even"}><td >{"高速化オプション"}</td><td >{" Accelerated VPN は、Global Accelerator のエッジを使って、経路を安定化する (Transit Gateway 終端で利用) "}</td></tr><tr className={"odd"}><td >{"DX 上の VPN"}</td><td >{" プライベート IP VPN は、Direct Connect のトランジット VIF 上に VPN を作り、プライベートな経路で IPsec 暗号化を行う "}</td></tr><tr className={"even"}><td >{"カスタマーゲートウェイ"}</td><td >{"オンプレミス側の VPN 機器を表す AWS のリソース"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"Direct Connect と VPN の比較"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Direct Connect と VPN の比較（表55）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"Direct Connect"}</th><th scope="col">{"Site-to-Site VPN"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"経路"}</td><td >{"専用線 (インターネットを経由しない)"}</td><td >{"インターネット (または DX)"}</td></tr><tr className={"even"}><td >{"帯域と遅延"}</td><td >{"安定し、大きな帯域を確保できる"}</td><td >{"インターネットの品質に依存し、トンネルあたりの上限がある"}</td></tr><tr className={"odd"}><td >{"暗号化"}</td><td >{"既定では暗号化なし (MACsec や IPsec VPN を併用して暗号化)"}</td><td >{"IPsec で暗号化"}</td></tr><tr className={"even"}><td >{"導入までの期間"}</td><td >{"数週間から数か月 (回線の手配が必要)"}</td><td >{"数分から数時間"}</td></tr><tr className={"odd"}><td >{"コスト"}</td><td >{"ポート料金と回線費用。データ転送料金は低め"}</td><td >{"接続料金とデータ転送料金"}</td></tr><tr className={"even"}><td >{"典型的な用途"}</td><td >{"大容量、本番の常時接続、低遅延"}</td><td >{"迅速な導入、小規模、DX のバックアップ"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-4-要件を特定し接続方式を選ぶ"} tabIndex={-1}>{" ステップ 4: 要件を特定し、接続方式を選ぶ "}</h3>
{" "}
<p >{"ハイブリッド接続の要件として、次の観点を確認します。"}</p>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 4: 要件を特定し、接続方式を選ぶ（表56）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"確認すること"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"帯域"}</td><td >{"必要なスループット (ピーク時を含む)"}</td></tr><tr className={"even"}><td >{"遅延と安定性"}</td><td >{"アプリケーションが許容する遅延とジッター"}</td></tr><tr className={"odd"}><td >{"可用性"}</td><td >{"許容できる停止時間と、冗長化のレベル"}</td></tr><tr className={"even"}><td >{"セキュリティ"}</td><td >{"暗号化の要件、インターネット経由の可否"}</td></tr><tr className={"odd"}><td >{"導入期間"}</td><td >{"開始までの猶予"}</td></tr><tr className={"even"}><td >{"コスト"}</td><td >{"回線費用、データ転送料金"}</td></tr><tr className={"odd"}><td >{"規模"}</td><td >{"接続する VPC の数、ルートの数、リージョンの数"}</td></tr><tr className={"even"}><td >{"管理"}</td><td >{"既存のネットワーク機器と、運用体制"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-12" label={"ステップ 4: 要件を特定し、接続方式を選ぶ"} />
{" "}
<h3 id={"ステップ-5-冗長なハイブリッド接続の設計"} tabIndex={-1}>{" ステップ 5: 冗長なハイブリッド接続の設計 "}</h3>
{" "}
<h4 >{"Direct Connect のレジリエンスモデル"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Direct Connect のレジリエンスモデル（表57）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"モデル"}</th><th scope="col">{"構成"}</th><th scope="col">{"目的"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"最大のレジリエンス"}</td><td >{" 2 つ以上の DX ロケーションに、それぞれ冗長な接続 (計 4 接続以上)、別々のデバイスで終端する "}</td><td >{" 重要な本番ワークロード。デバイス、接続、ロケーションの障害に耐える "}</td></tr><tr className={"even"}><td >{"高いレジリエンス"}</td><td >{"2 つの DX ロケーションに、1 本ずつの接続"}</td><td >{"ロケーション全体の障害に耐える"}</td></tr><tr className={"odd"}><td >{"開発とテスト"}</td><td >{"1 つのロケーションに、冗長な接続"}</td><td >{"開発とテスト環境"}</td></tr></tbody></table>{" "}</div>
{" "}
<ul >{" "}<li >{"オンプレミス側のルーターも冗長化し、単一障害点をなくす。"}</li>{" "}<li >{" DX が停止した場合の自動切り替えのため、Site-to-Site VPN をバックアップとして構成する。 "}</li>{" "}<li >{" 定期的にフェイルオーバーのテストを行い、期待どおりに切り替わることを確認する。 "}</li>{" "}</ul>
{" "}
<h4 >{"DX と VPN のバックアップ構成"}</h4>
{" "}
<Diagram id="diag-13" label={"DX と VPN のバックアップ構成"} />
{" "}
<ul >{" "}<li >{" 同じプレフィックスの経路が DX と VPN の両方から届いた場合、AWS は一般に Direct Connect を優先する。より具体的なプレフィックス (最長一致) は、さらに優先される。詳細な優先順位は、公式ドキュメントで確認する。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-6-bgp-でトラフィックを制御する"} tabIndex={-1}>{" ステップ 6: BGP でトラフィックを制御する "}</h3>
{" "}
<h4 >{"方向ごとの制御手段"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"方向ごとの制御手段（表58）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"方向"}</th><th scope="col">{"制御する人"}</th><th scope="col">{"主な手段"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"オンプレミスから AWS へ (出ていく経路)"}</td><td >{"オンプレミス側のルーターの設定"}</td><td >{"ローカルプリファレンス、複数リンクでの ECMP"}</td></tr><tr className={"even"}><td >{"AWS からオンプレミスへ (戻る経路)"}</td><td >{"オンプレミスから AWS へ広告する経路の属性"}</td><td >{" AS パスのプリペンド、より具体的なプレフィックス、Direct Connect のローカルプリファレンスのコミュニティ "}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"Direct Connect のコミュニティ"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Direct Connect のコミュニティ（表59）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"コミュニティ"}</th><th scope="col">{"意味"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"7224:7100"}</td><td >{"ローカルプリファレンス 低"}</td></tr><tr className={"even"}><td >{"7224:7200"}</td><td >{"ローカルプリファレンス 中"}</td></tr><tr className={"odd"}><td >{"7224:7300"}</td><td >{"ローカルプリファレンス 高"}</td></tr><tr className={"even"}><td >{"7224:9100、7224:9200、7224:9300"}</td><td >{" パブリック VIF での広告範囲 (同一リージョン、同一大陸、グローバル) "}</td></tr></tbody></table>{" "}</div>
{" "}
<ul >{" "}<li >{" 同じプレフィックスを複数の DX 接続で広告する場合、AWS はローカルプリファレンスの高いものを優先し、同じ値なら AS パスが短いものを選ぶ (詳細は DX の BGP の仕様を確認)。 "}</li>{" "}</ul>
{" "}
<h4 >{"トラフィックパターンの設計"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"トラフィックパターンの設計（表60）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"パターン"}</th><th scope="col">{"設計方法"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"アクティブ・アクティブ (負荷分散)"}</td><td >{" 複数の経路に、同じ属性で広告し、ECMP で分散する。あるいは、プレフィックスを分割して、半分ずつ別の経路で広告する "}</td></tr><tr className={"even"}><td >{"アクティブ・パッシブ"}</td><td >{" バックアップ側の経路に、AS パスのプリペンドや、低いローカルプリファレンスのコミュニティを付けて、劣後させる "}</td></tr><tr className={"odd"}><td >{"特定の通信だけ別経路"}</td><td >{" より具体的なプレフィックスを、特定の経路で広告する (最長一致が優先される) "}</td></tr></tbody></table>{" "}</div>
{" "}
<div className="code-block" role="region" tabIndex={0} aria-label={"トラフィックパターンの設計（コード7）"}><div className="code-line"><span className="ans-code-token-0">{"# 例: AWS CLI で Direct Connect の仮想インターフェイスを確認する"}</span></div>
<div className="code-line">{"aws"}<span className="ans-code-token-1">{" "}</span>{"directconnect"}<span className="ans-code-token-1">{" "}</span>{"describe-virtual-interfaces"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-2">{"\\"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span>{"--query"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-3">{"'virtualInterfaces[].{id:virtualInterfaceId,type:virtualInterfaceType,vlan:vlan,state:virtualInterfaceState}'"}</span></div></div>
{" "}
<h3 id={"ステップ-7-カプセル化暗号化オーバーレイネットワーク"} tabIndex={-1}>{" ステップ 7: カプセル化、暗号化、オーバーレイネットワーク "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 7: カプセル化、暗号化、オーバーレイネットワーク（表61）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"技術"}</th><th scope="col">{"説明"}</th><th scope="col">{"AWS での利用"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"IPsec"}</td><td >{"IP パケットを暗号化と認証する"}</td><td >{"Site-to-Site VPN、DX 上の VPN"}</td></tr><tr className={"even"}><td >{"GRE"}</td><td >{" パケットを別のパケットで包んで、トンネルを作る (IP プロトコル番号 47)。暗号化はしない "}</td><td >{"Transit Gateway Connect"}</td></tr><tr className={"odd"}><td >{"VXLAN"}</td><td >{"L2 のフレームを、UDP で包んで、L3 の上に L2 の網を作る"}</td><td >{"トラフィックミラーリング"}</td></tr><tr className={"even"}><td >{"GENEVE"}</td><td >{"拡張しやすいカプセル化 (UDP のポート 6081)"}</td><td >{"Gateway Load Balancer"}</td></tr></tbody></table>{" "}</div>
{" "}
<ul >{" "}<li >{" オーバーレイネットワークは、物理的な (アンダーレイの) ネットワークの上に、論理的なネットワークを作る考え方。SD-WAN は、オーバーレイの代表例。 "}</li>{" "}<li >{" 暗号化の選択肢は、L2 では MACsec、L3 では IPsec。要件 (暗号化の層、帯域、コスト) に応じて選ぶ。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-8-sd-wan-と-aws-の統合"} tabIndex={-1}>{"ステップ 8: SD-WAN と AWS の統合"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 8: SD-WAN と AWS の統合（表62）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"方式"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Transit Gateway Connect"}</td><td >{" Transit Gateway に、GRE トンネルと BGP で、SD-WAN の仮想アプライアンスを接続する。トランスポートには、VPC または Direct Connect のアタッチメントを使う。IPsec の VPN より、トンネルあたりの帯域が大きい "}</td></tr><tr className={"even"}><td >{"VPN 接続"}</td><td >{" SD-WAN のアプライアンスから、Transit Gateway へ、IPsec の VPN を張る "}</td></tr><tr className={"odd"}><td >{"AWS Cloud WAN"}</td><td >{" グローバルなネットワークを、ポリシーで定義して管理する。VPN や Connect で、SD-WAN とも連携できる "}</td></tr></tbody></table>{" "}</div>
{" "}
<ul >{" "}<li >{" Connect アタッチメントは、BGP が必須。1 つのアタッチメントに、複数の Connect ピア (GRE トンネル) を作れる。 "}</li>{" "}<li >{" SD-WAN のアプライアンスは、VPC 内の EC2 に置き、冗長化のために複数の AZ に配置する。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-9-アカウント間のリソース共有"} tabIndex={-1}>{" ステップ 9: アカウント間のリソース共有 "}</h3>
{" "}
<ul >{" "}<li >{" AWS Resource Access Manager (RAM) で、Transit Gateway、サブネット、Resolver ルール、プレフィックスリストなどを、他のアカウントや組織 (OU) に共有できる。 "}</li>{" "}<li >{" Direct Connect では、ホスト VIF (別アカウントへ VIF を割り当てる) と、Direct Connect ゲートウェイの関連付け提案 (別アカウントの VPC や Transit Gateway を関連付ける) で、アカウントをまたいで共有できる。 "}</li>{" "}<li >{" 共有サービスアカウントに、ハイブリッド接続を集約すると、各アカウントが個別に回線を持たずに済み、コストと運用を削減できる。 "}</li>{" "}</ul>
{" "}
<h3 id={"ベストプラクティス-task-15"} tabIndex={-1}>{"ベストプラクティス (Task 1.5)"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス (Task 1.5)（表63）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"ベストプラクティス"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"冗長化"}</td><td >{" 最大のレジリエンスモデル (2 つ以上のロケーション) と、VPN のバックアップを組み合わせる "}</td></tr><tr className={"even"}><td >{"ルーティング"}</td><td >{"動的ルーティング (BGP) を使い、BFD で障害を素早く検出する"}</td></tr><tr className={"odd"}><td >{"経路制御"}</td><td >{" AS パスのプリペンド、コミュニティ、具体的なプレフィックスで、意図した経路を作る "}</td></tr><tr className={"even"}><td >{"集約"}</td><td >{"広告するプレフィックスを集約し、ルート数の上限に備える"}</td></tr><tr className={"odd"}><td >{"MTU"}</td><td >{" 経路全体の MTU を揃え、ジャンボフレームを使う場合は両端と中間を確認する "}</td></tr><tr className={"even"}><td >{"暗号化"}</td><td >{"要件に応じて MACsec か IPsec を使う"}</td></tr><tr className={"odd"}><td >{"集中化"}</td><td >{" Direct Connect ゲートウェイと Transit Gateway で、ハイブリッド接続を集約する "}</td></tr><tr className={"even"}><td >{"テスト"}</td><td >{"定期的に、フェイルオーバーの検証を行う"}</td></tr><tr className={"odd"}><td >{"監視"}</td><td >{" ConnectionState、TunnelState などにアラームを設定する (Task 1.4) "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"選択のコツと試験での落とし穴-4"} tabIndex={-1}>{"選択のコツと試験での落とし穴"}</h3>
{" "}
<ul >{" "}<li >{" 「インターネットを経由せず、安定した帯域」は Direct Connect。「迅速に」「バックアップ」は VPN。 "}</li>{" "}<li >{" 「DX のトラフィックを暗号化したい」は、MACsec (L2) か、DX 上の IPsec VPN (L3)。DX は既定では暗号化されない。 "}</li>{" "}<li >{" 「複数の VPC を、1 本の DX で接続」は、トランジット VIF と Transit Gateway、または DX ゲートウェイ。 "}</li>{" "}<li >{" 「SD-WAN を Transit Gateway に」は Transit Gateway Connect (GRE と BGP)。 "}</li>{" "}<li >{" 「アクティブ・パッシブ」は、プリペンドか低いローカルプリファレンスで、バックアップを劣後させる。 "}</li>{" "}<li >{"「最大のレジリエンス」は、別のロケーションに、別のデバイスで終端する。"}</li>{" "}</ul>
{" "}
<div className={"source-block"}>{" "}<p className={"source-head"} data-count={"8 件"}>{"出典:"}</p>{" "}<ul className={"source-grid"}>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/directconnect/.../Welcome.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/directconnect/latest/UserGuide/Welcome.html"}>{"AWS Direct Connect とは"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/directconnect/.../routing-and-bgp.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/directconnect/latest/UserGuide/routing-and-bgp.html"}>{"Direct Connect のルーティングポリシーと BGP コミュニティ"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/directconnect/.../direct-connect-gateways.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/directconnect/latest/UserGuide/direct-connect-gateways.html"}>{"Direct Connect ゲートウェイ"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"aws.amazon.com/directconnect/resiliency-recommendation"} target={"_blank"} rel={"noopener noreferrer"} href={"https://aws.amazon.com/directconnect/resiliency-recommendation/"}>{"Direct Connect のレジリエンスに関する推奨事項"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html"}>{"AWS Site-to-Site VPN とは"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/vpc/latest/tgw/tgw-connect.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/vpc/latest/tgw/tgw-connect.html"}>{"Transit Gateway Connect アタッチメント"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/network-manager/.../what-is-cloudwan.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/network-manager/latest/cloudwan/what-is-cloudwan.html"}>{"AWS Cloud WAN とは"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/ram/latest/userguide/what-is.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/ram/latest/userguide/what-is.html"}>{"AWS Resource Access Manager とは"}</a>{" "}</li>{" "}</ul>{" "}</div>
{" "}</section>;}
