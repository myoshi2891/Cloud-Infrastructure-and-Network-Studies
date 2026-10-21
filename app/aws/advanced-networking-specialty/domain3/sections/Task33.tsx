import { Diagram } from '../Diagram';
/** 原本のtask3区分を全文保持する。 */
export default function Task33(){return <div className="guide-part" data-part="task3"><h2 id={"part-c-task-33-性能信頼性コストの最適化"} tabIndex={-1}>{" Part C. Task 3.3 性能・信頼性・コストの最適化 "}</h2>

<blockquote>{" "}<p>{" "}<strong>{"公式のタスク文"}</strong>{": Optimize AWS networks for performance, reliability, and cost-effectiveness "}</p>{" "}</blockquote>

<h3 id={"c-0-このタスクで問われること"} tabIndex={-1}>{"C-0. このタスクで問われること"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"C-0. このタスクで問われること（表57）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"内容（Exam Guide の要旨）"}</th></tr></thead><tbody><tr className={"odd"}><td>{"知識"}</td><td>{" VPC ピアリングと TGW の使い分け／帯域削減の方法（ユニキャスト対マルチキャスト、CloudFront）／VPC とオンプレミス間のコスト効率の良い接続／ネットワークインターフェイスの種類／Route 53 の高可用性機能（ヘルスチェック、レイテンシー・加重レコード）／負荷分散パターン／サブネットの最適化／フレームサイズの最適化 "}</td></tr><tr className={"even"}><td>{"スキル"}</td><td>{" スループット最適化／最適なネットワークインターフェイスの選択（ENI・ENA・EFA）／ピアリング・プロキシ・TGW の選択／マルチキャスト実装／Route 53 のパブリック/プライベートホストゾーンとレコード作成／Auto Scaling 向けサブネット最適化／IP 枯渇の防止（セカンダリ CIDR）／ジャンボフレーム設定／Global Accelerator による最適化 "}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-1-step-1vpc-ピアリングプロキシtransit-gateway-を使い分ける"} tabIndex={-1}>{" C-1. Step 1：VPC ピアリング・プロキシ・Transit Gateway を使い分ける "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" 接続方式は、"}<strong>{"VPC の数・必要な通信・コスト・運用負荷"}</strong>{" で最適解が変わります。試験では「要件から最適な方式を選ぶ」問題が頻出です。 "}</p>

<h4>{"比較表"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"比較表（表58）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col"><strong>{"VPC ピアリング"}</strong></th><th scope="col"><strong>{"Transit Gateway"}</strong></th><th scope="col"><strong>{"プロキシ / PrivateLink 型"}</strong></th></tr></thead><tbody><tr className={"odd"}><td>{"接続形態"}</td><td>{"1対1"}</td><td>{"ハブ&スポーク"}</td><td>{"サービス単位"}</td></tr><tr className={"even"}><td>{"推移的ルーティング"}</td><td><strong>{"不可"}</strong></td><td><strong>{"可能"}</strong></td><td>{"該当なし"}</td></tr><tr className={"odd"}><td>{"接続数が増えると"}</td><td>{"接続数が "}<strong>{"n(n-1)/2"}</strong>{" で増える"}</td><td>{"アタッチメントを足すだけ"}</td><td>{"利用側の追加が容易"}</td></tr><tr className={"even"}><td>{"オンプレミス接続の共有"}</td><td>{"不可（エッジ間ルーティング不可）"}</td><td><strong>{"可能"}</strong>{"（VPN/DX を共有）"}</td><td>{"別途構成"}</td></tr><tr className={"odd"}><td>{"帯域"}</td><td>{" AWS ネットワーク内で "}<strong>{"帯域の集約ボトルネックなし"}</strong>{" "}</td><td>{" VPC アタッチメントあたりの上限あり（AZ あたり最大 100 Gbps） "}</td><td>{"NLB/エンドポイントの性能に依存"}</td></tr><tr className={"even"}><td>{"コスト"}</td><td>{" "}<strong>{"ピアリング自体の追加料金なし"}</strong>{"（データ転送料金は発生） "}</td><td>{"アタッチメント時間課金 + 処理データ量課金"}</td><td>{"エンドポイント時間 + 処理データ量課金"}</td></tr><tr className={"odd"}><td>{"向く場面"}</td><td>{"少数 VPC、大量転送、低コスト"}</td><td>{"多数 VPC、オンプレミス統合、集中管理"}</td><td>{"CIDR 重複、サービス公開"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"注意"}</strong>{": 料金は リージョンや時期で変わります。最新は "}<a href={"https://aws.amazon.com/transit-gateway/pricing/"}>{"Transit Gateway の料金ページ"}</a>{" などで確認してください。 "}</p>{" "}</blockquote>

<h4>{"選択フロー"}</h4>

<Diagram id="diag-19" label={"選択フロー"} />

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"大量のデータを 2つの VPC 間で、できるだけ低コストで転送"}</strong>{"」は "}<strong>{"VPC ピアリング"}</strong>{"。「"}<strong>{"数十の VPC とオンプレミスを一元的に接続"}</strong>{"」は "}<strong>{"Transit Gateway"}</strong>{"。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表59）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" 通信量の多い特定ペアだけ "}<strong>{"ピアリングで直結"}</strong>{"、それ以外は TGW という "}<strong>{"併用"}</strong>{" も検討する "}</td><td>{"TGW のデータ処理料金を削減できる"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" VPC 数が増える見込みなら "}<strong>{"最初から TGW"}</strong>{" にする "}</td><td>{"後でピアリング網を作り直すのは大変"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" 検査（ファイアウォール）が必要なら "}<strong>{"TGW + 検査 VPC（アプライアンスモード）"}</strong>{" "}</td><td>{"中央で通信を検査できる"}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-2-step-2vpc-とオンプレミスのコスト効率の良い接続"} tabIndex={-1}>{" C-2. Step 2：VPC とオンプレミスのコスト効率の良い接続 "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"C-2. Step 2：VPC とオンプレミスのコスト効率の良い接続（表60）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"接続方式"}</th><th scope="col">{"特徴"}</th><th scope="col">{"コスト面のポイント"}</th><th scope="col">{"向く場面"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"Site-to-Site VPN"}</strong></td><td>{"短期間で導入。暗号化。インターネット品質に依存"}</td><td>{"接続時間 + データ転送"}</td><td>{"小〜中規模、バックアップ、早期開始"}</td></tr><tr className={"even"}><td><strong>{"Direct Connect"}</strong></td><td>{"専用線。帯域が安定、遅延が小さい"}</td><td>{" ポート時間 + "}<strong>{"データ転送（AWS からの送信）が一般に インターネット経由より割安"}</strong>{" "}</td><td>{"大量・継続的な転送、安定性が重要"}</td></tr><tr className={"odd"}><td><strong>{"DX + VPN（バックアップ）"}</strong></td><td>{"専用線を主、VPN を副"}</td><td>{"専用線の補完として低コスト"}</td><td>{"回復性が必要"}</td></tr><tr className={"even"}><td><strong>{"VPN over DX（プライベート IP VPN）"}</strong></td><td>{"DX 上で IPsec 暗号化"}</td><td>{"DX 帯域の上に暗号化を追加"}</td><td>{"専用線でも暗号化が必要な要件"}</td></tr><tr className={"odd"}><td><strong>{"DX（MACsec）"}</strong></td><td>{"専用接続のレイヤー2暗号化"}</td><td>{"対応ポートが必要"}</td><td>{"回線レベルの暗号化要件"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-20" label={"C-2. Step 2：VPC とオンプレミスのコスト効率の良い接続"} />

<h4>{"その他のコスト最適化の要点"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"その他のコスト最適化の要点（表61）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"施策"}</th><th scope="col">{"効果"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" S3/DynamoDB へは "}<strong>{"ゲートウェイ型エンドポイント"}</strong>{"（無料）を使う "}</td><td>{"NAT ゲートウェイのデータ処理料金を削減"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" "}<strong>{"同一 AZ 内"}</strong>{" の通信に寄せる（AZ 間転送は課金されるため） "}</td><td>{"AZ 間データ転送料金の削減"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" 不要になった TGW アタッチメント、EIP、NAT ゲートウェイを整理する "}</td><td>{"時間課金の削減"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{" "}<strong>{"CloudFront"}</strong>{" でキャッシュし、オリジンからの転送を減らす "}</td><td>{"インターネット向け転送料金・帯域の削減"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{" データ転送コストを "}<strong>{"Cost Explorer / CUR"}</strong>{" で可視化する "}</td><td>{"無駄な通信の発見"}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-3-step-3帯域使用量を減らすユニキャスト対マルチキャストcloudfront"} tabIndex={-1}>{" C-3. Step 3：帯域使用量を減らす（ユニキャスト対マルチキャスト、CloudFront） "}</h3>

<h4>{"3.1 ユニキャストとマルチキャスト"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.1 ユニキャストとマルチキャスト（表62）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"方式"}</th><th scope="col">{"動作"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"ユニキャスト"}</strong></td><td>{"1対1。受信者の数だけ同じデータを送る"}</td><td>{"受信者が増えると送信側の負荷と帯域が増える"}</td></tr><tr className={"even"}><td><strong>{"マルチキャスト"}</strong></td><td>{"1対多。1回の送信を、グループ参加者へ複製して配る"}</td><td>{" 同じデータを多数に配るときに "}<strong>{"送信帯域を節約"}</strong>{" "}</td></tr></tbody></table>{" "}</div>

<h4>{"3.2 AWS でのマルチキャスト（Transit Gateway マルチキャスト）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.2 AWS でのマルチキャスト（Transit Gateway マルチキャスト）（表63）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"仕組み"}</td><td>{" TGW に "}<strong>{"マルチキャストドメイン"}</strong>{" を作り、VPC サブネットを関連付ける。ドメインの上限は TGW あたり 20 "}</td></tr><tr className={"even"}><td>{"グループ管理"}</td><td>{" "}<strong>{"IGMPv2"}</strong>{" で参加・離脱するか、"}<strong>{"静的"}</strong>{" にメンバーを登録する "}</td></tr><tr className={"odd"}><td>{"送信元/受信者"}</td><td>{" 対応する "}<strong>{"Nitro"}</strong>{" ベースのインスタンスの ENI など "}</td></tr><tr className={"even"}><td>{"対象"}</td><td>{" VPC 内のマルチキャスト。オンプレミスとの間は、構成要件を公式ドキュメントで確認する "}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-21" label={"3.2 AWS でのマルチキャスト（Transit Gateway マルチキャスト）"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.2 AWS でのマルチキャスト（Transit Gateway マルチキャスト）（表64）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" マルチキャストが必要なアプリ（市場データ配信、映像配信など）だけに使う "}</td><td>{"通常のアプリには不要で、設計が複雑になる"}</td></tr><tr className={"even"}><td>{"2"}</td><td><strong>{"IGMP と静的登録"}</strong>{" をアプリの要件で選ぶ"}</td><td>{"動的な参加が必要か、固定メンバーかで決まる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" ドメインごとに "}<strong>{"サブネットの関連付けとグループの設定を IaC 管理"}</strong>{" する "}</td><td>{"設定漏れで配信が届かない事故を防ぐ"}</td></tr></tbody></table>{" "}</div>

<h4>{"3.3 CloudFront による帯域削減"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3.3 CloudFront による帯域削減（表65）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"効果"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"キャッシュ"}</td><td>{" エッジにコンテンツを置き、"}<strong>{"オリジンへのリクエストと転送量を削減"}</strong>{" "}</td></tr><tr className={"even"}><td>{"近接配信"}</td><td>{"ユーザーに近い拠点から配信し、遅延を短縮"}</td></tr><tr className={"odd"}><td>{"接続の最適化"}</td><td>{"オリジンとの接続を再利用し、効率化"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"同じ静的コンテンツを世界中の多数のユーザーへ配る、オリジンの負荷と転送量を下げたい"}</strong>{"」→ CloudFront。「"}<strong>{"TCP/UDP の非 HTTP トラフィックを高速化したい／固定 IP が必要"}</strong>{"」→ Global Accelerator（C-9 参照）。 "}</p>{" "}</blockquote>

<h3 id={"c-4-step-4ネットワークインターフェイスの種類と選び方"} tabIndex={-1}>{" C-4. Step 4：ネットワークインターフェイスの種類と選び方 "}</h3>

<h4>{"比較表"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"比較表（表66）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"概要"}</th><th scope="col">{"向く用途"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"ENI"}</strong>{"（Elastic Network Interface）"}</td><td>{" VPC 内の仮想 NIC。IP・SG・MAC を持ち、インスタンス間で付け替え可能 "}</td><td>{" 基本。管理用ネットワーク分離、フェイルオーバー用の IP 付け替え "}</td></tr><tr className={"even"}><td><strong>{"ENA"}</strong>{"（Elastic Network Adapter）"}</td><td>{" 高性能な準仮想化ドライバー。多くの現行世代インスタンスで利用 "}</td><td><strong>{"標準的な高スループット・低遅延"}</strong></td></tr><tr className={"odd"}><td><strong>{"ENA Express"}</strong></td><td>{" ENA 上で "}<strong>{"SRD（Scalable Reliable Datagram）"}</strong>{" を使い、パケットの経路を分散して 1 フローの性能と テイルレイテンシーを改善 "}</td><td>{"同一 AZ 内の 1 フローの大きな転送"}</td></tr><tr className={"even"}><td><strong>{"EFA"}</strong>{"（Elastic Fabric Adapter）"}</td><td>{" "}<strong>{"OS バイパス"}</strong>{" による低遅延通信を提供（libfabric、MPI、NCCL） "}</td><td><strong>{"HPC、機械学習の分散学習"}</strong></td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"注意"}</strong>{": ENA Express は、同一 AZ 内など利用条件があります。対応インスタンスタイプ・条件・帯域の数値は変更があるため、"}<a href={"https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ena-express.html"}>{"公式ドキュメント"}</a>{" で確認してください。 "}</p>{" "}</blockquote>

<Diagram id="diag-22" label={"比較表"} />

<h4>{"スループットを最適化する要点"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"スループットを最適化する要点（表67）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"施策"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" "}<strong>{"ネットワーク性能の高いインスタンスタイプ"}</strong>{" を選ぶ "}</td><td>{"帯域・PPS・接続追跡の上限はインスタンスサイズに依存する"}</td></tr><tr className={"even"}><td>{"2"}</td><td><strong>{"クラスタープレイスメントグループ"}</strong>{" を使う"}</td><td>{"同一ラック近傍に配置され、低遅延・高帯域"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" "}<strong>{"ジャンボフレーム（MTU 9001）"}</strong>{" を閉じた経路で使う "}</td><td>{"同じデータ量でも パケット数が減り、効率が上がる"}</td></tr><tr className={"even"}><td>{"4"}</td><td><strong>{"複数フロー（並列接続）"}</strong>{" にする"}</td><td>{"1フローの上限を超えて合計帯域を使える"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{"最新の ENA ドライバーを使う"}</td><td>{"性能・機能の改善を得られる"}</td></tr><tr className={"even"}><td>{"6"}</td><td><code>{"*_allowance_exceeded"}</code>{" を監視する"}</td><td>{"上限超過を検知する（B-3 参照）"}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-5-step-5ジャンボフレームを設定する接続タイプ別"} tabIndex={-1}>{" C-5. Step 5：ジャンボフレームを設定する（接続タイプ別） "}</h3>

<h4>{"接続タイプ別の可否（再掲）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"接続タイプ別の可否（再掲）（表68）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"経路"}</th><th scope="col">{"ジャンボフレーム"}</th><th scope="col">{"MTU"}</th></tr></thead><tbody><tr className={"odd"}><td>{"同一 VPC / ピアリング / TGW 内"}</td><td>{"使える"}</td><td>{"9001（TGW 経由は最大 8500）"}</td></tr><tr className={"even"}><td>{"Direct Connect プライベート VIF"}</td><td>{"使える"}</td><td>{"9001"}</td></tr><tr className={"odd"}><td>{"Direct Connect トランジット VIF"}</td><td>{"使える"}</td><td><strong>{"8500"}</strong></td></tr><tr className={"even"}><td>{"インターネットゲートウェイ経由"}</td><td>{"使えない"}</td><td>{"1500"}</td></tr><tr className={"odd"}><td>{"Site-to-Site VPN"}</td><td>{"使えない"}</td><td>{"1500"}</td></tr></tbody></table>{" "}</div>

<h4>{"設定の流れ"}</h4>

<Diagram id="diag-23" label={"設定の流れ"} />

<blockquote>{" "}<p>{" "}<strong>{"重要"}</strong>{": DX の VIF の MTU を 8500 または 9001 に変更すると、"}<strong>{"物理接続の更新が行われ、一時的な影響が出る可能性"}</strong>{" があります。DX コンソールの「Jumbo Frame Capable」で対応可否を確認できます。 "}</p>{" "}</blockquote>

<h4>{"疎通確認（トランジット VIF 経由で 8500 の場合）"}</h4>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"疎通確認（トランジット VIF 経由で 8500 の場合）（コード7）"}><div className="code-line"><span className={"c1"}>{"# 8500 - 28(ICMP+IP ヘッダ) = 8472 バイトのペイロードで確認"}</span></div>
<div className="code-line">{"ping"}<span className={"w"}>{" "}</span>{"-M"}<span className={"w"}>{" "}</span><span className={"k"}>{"do"}</span><span className={"w"}>{" "}</span>{"-s"}<span className={"w"}>{" "}</span><span className={"m"}>{"8472"}</span><span className={"w"}>{" "}</span><span className={"m"}>{"10"}</span>{".0.2.20"}</div></div>{" "}</div>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表69）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" ジャンボフレームは "}<strong>{"経路全体で MTU を揃えられる場合のみ"}</strong>{" 使う "}</td><td>{"1か所でも小さいと ICMP 遮断時に通信が黙って失敗する"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" インターネット・VPN 宛の通信は "}<strong>{"1500"}</strong>{" のままにする "}</td><td>{"経路上限が 1500"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{"変更はメンテナンスウィンドウで実施する"}</td><td>{"VIF の更新による影響を避ける"}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-6-step-6route-53-で高可用性を実現する"} tabIndex={-1}>{" C-6. Step 6：Route 53 で高可用性を実現する "}</h3>

<h4>{"6.1 ホストゾーン"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"6.1 ホストゾーン（表70）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"用途"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"パブリックホストゾーン"}</strong></td><td>{"インターネットからの名前解決"}</td></tr><tr className={"even"}><td><strong>{"プライベートホストゾーン"}</strong></td><td>{" 指定した "}<strong>{"VPC 内だけ"}</strong>{" の名前解決（内部サービス名） "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"プライベートホストゾーンの前提"}</strong>{": 関連付ける VPC で "}<strong>{"DNS 解決"}</strong>{" と "}<strong>{"DNS ホスト名"}</strong>{" の両方を有効にする必要があります。 "}</p>{" "}</blockquote>

<h4>{"6.2 ルーティングポリシー"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"6.2 ルーティングポリシー（表71）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"ポリシー"}</th><th scope="col">{"動作"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"シンプル"}</strong></td><td>{"1つの値を返す"}</td><td>{"単一リソース"}</td></tr><tr className={"even"}><td><strong>{"加重（Weighted）"}</strong></td><td>{"重みの比率で振り分け"}</td><td>{" "}<strong>{"カナリアリリース、段階的移行"}</strong>{"、負荷の比率調整 "}</td></tr><tr className={"odd"}><td><strong>{"レイテンシー（Latency）"}</strong></td><td>{"利用者に "}<strong>{"最も遅延が小さい"}</strong>{" リージョンへ"}</td><td>{"複数リージョンの性能最適化"}</td></tr><tr className={"even"}><td><strong>{"フェイルオーバー（Failover）"}</strong></td><td>{"プライマリが異常ならセカンダリへ"}</td><td><strong>{"アクティブ/パッシブ"}</strong>{" の災害対策"}</td></tr><tr className={"odd"}><td><strong>{"位置情報（Geolocation）"}</strong></td><td>{"利用者の "}<strong>{"所在地"}</strong>{" に基づく"}</td><td>{"地域ごとのコンテンツ、規制対応"}</td></tr><tr className={"even"}><td><strong>{"地理的近接性（Geoproximity）"}</strong></td><td>{"物理的な近さ（バイアスで調整可）"}</td><td>{"リソース位置と利用者位置に基づく配分"}</td></tr><tr className={"odd"}><td><strong>{"IP ベース"}</strong></td><td>{"利用者の "}<strong>{"CIDR"}</strong>{" に基づく"}</td><td>{"特定のネットワークを特定のエンドポイントへ"}</td></tr><tr className={"even"}><td><strong>{"複数値回答（Multivalue）"}</strong></td><td>{"最大 8 つの正常なレコードを返す"}</td><td>{"簡易的な DNS ロードバランシング（ヘルスチェック付き）"}</td></tr></tbody></table>{" "}</div>

<h4>{"6.3 ヘルスチェック"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"6.3 ヘルスチェック（表72）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"エンドポイントの監視"}</strong></td><td>{"HTTP/HTTPS/TCP でエンドポイントを定期確認"}</td></tr><tr className={"even"}><td><strong>{"算出されたヘルスチェック"}</strong></td><td>{"複数のヘルスチェックを AND/OR/しきい値で結合"}</td></tr><tr className={"odd"}><td><strong>{"CloudWatch アラームの監視"}</strong></td><td>{" アラームの状態を基に判定。"}<strong>{"プライベートな（インターネットから見えない）リソースにも使える"}</strong>{" "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": Route 53 のヘルスチェッカーは "}<strong>{"パブリックな エンドポイント"}</strong>{" を監視します。"}<strong>{"プライベートな VPC 内リソース"}</strong>{" は、"}<strong>{"CloudWatch アラームに基づくヘルスチェック"}</strong>{" を使います。 "}</p>{" "}</blockquote>

<h4>{"6.4 組み合わせ設計例：「レイテンシー + ヘルスチェック + フェイルオーバー」"}</h4>

<Diagram id="diag-24" label={"6.4 組み合わせ設計例：「レイテンシー + ヘルスチェック + フェイルオーバー」"} />

<h4>{"6.5 AZ をまたぐプライベート DNS の設計"}</h4>

<p>{" プライベートホストゾーンで、"}<strong>{"複数 AZ のターゲットを返す"}</strong>{" と、AZ 障害に強くなります。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"6.5 AZ をまたぐプライベート DNS の設計（表73）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"方法"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"加重レコード + ヘルスチェック"}</td><td>{"AZ ごとに重みを付け、異常な AZ を除外する"}</td></tr><tr className={"even"}><td><strong>{"ELB（ALB/NLB）のエイリアスレコード"}</strong></td><td>{" ELB が複数 AZ のターゲットへ分散する。"}<strong>{"エイリアスレコードはクエリ課金なし"}</strong>{"（AWS リソース宛） "}</td></tr><tr className={"odd"}><td>{"Resolver エンドポイント"}</td><td>{"オンプレミスと VPC の間で名前解決を連携する"}</td></tr></tbody></table>{" "}</div>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表74）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{"AWS リソースへは "}<strong>{"エイリアスレコード"}</strong>{" を使う"}</td><td>{"追加料金なし・IP 変更に追随・ヘルスの評価に対応"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"重要なレコードに "}<strong>{"ヘルスチェック"}</strong>{" を付ける"}</td><td>{"障害時に自動で切り替わる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" "}<strong>{"TTL を適切に短く"}</strong>{" する（フェイルオーバー対象は短め） "}</td><td>{"切り替えの反映が速くなる"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{" 複数リージョンでは "}<strong>{"レイテンシー + ヘルスチェック"}</strong>{" を基本にする "}</td><td>{"性能と可用性を両立"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{" プライベートホストゾーンは、必要な "}<strong>{"すべての VPC に関連付け"}</strong>{" る "}</td><td>{"関連付けのない VPC は名前解決できない"}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-7-step-7負荷分散とトラフィック分散パターン"} tabIndex={-1}>{" C-7. Step 7：負荷分散とトラフィック分散パターン "}</h3>

<h4>{"Elastic Load Balancing の比較"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Elastic Load Balancing の比較（表75）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"レイヤー"}</th><th scope="col">{"特徴"}</th><th scope="col">{"向く場面"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"ALB"}</strong></td><td>{"L7（HTTP/HTTPS/gRPC）"}</td><td>{"パス・ホスト・ヘッダーによるルーティング"}</td><td>{"Web アプリ、マイクロサービス"}</td></tr><tr className={"even"}><td><strong>{"NLB"}</strong></td><td>{"L4（TCP/UDP/TLS）"}</td><td>{" "}<strong>{"超低遅延・高スループット"}</strong>{"、"}<strong>{"AZ ごとの固定 IP（EIP）"}</strong>{"、送信元 IP の保持 "}</td><td>{"高性能、固定 IP が必要、PrivateLink のバックエンド"}</td></tr><tr className={"odd"}><td><strong>{"GWLB"}</strong></td><td>{"L3（GENEVE）"}</td><td>{" "}<strong>{"セキュリティアプライアンス"}</strong>{" の透過的な挿入・スケール "}</td><td>{"ファイアウォール、IDS/IPS の集中検査"}</td></tr></tbody></table>{" "}</div>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表76）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{"ロードバランサーは "}<strong>{"複数 AZ"}</strong>{" に配置する"}</td><td>{"AZ 障害への耐性"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" "}<strong>{"クロスゾーン負荷分散"}</strong>{" の既定値を理解する（ALB は有効、NLB は 既定で無効） "}</td><td>{"AZ 間のターゲット数が偏ると、負荷も偏る"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" ヘルスチェックの閾値・間隔を "}<strong>{"アプリの起動時間"}</strong>{" に合わせる "}</td><td>{"誤検知や遅い検知を防ぐ"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"登録解除の遅延（コネクションドレイニング）を設定する"}</td><td>{"デプロイ時の通信断を防ぐ"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{"固定 IP や 送信元 IP の保持が必要なら "}<strong>{"NLB"}</strong></td><td>{"ALB は IP が変動する"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"ファイアウォールアプライアンスを中央に置き、複数 VPC のトラフィックを透過的に検査"}</strong>{"」→ "}<strong>{"GWLB"}</strong>{"（+ TGW）。「"}<strong>{"静的 IP が必要で、高性能な TCP"}</strong>{"」→ "}<strong>{"NLB"}</strong>{"。 "}</p>{" "}</blockquote>

<h3 id={"c-8-step-8vpc-サブネットの最適化"} tabIndex={-1}>{"C-8. Step 8：VPC サブネットの最適化"}</h3>

<h4>{"8.1 Auto Scaling に備えたサブネット設計"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"8.1 Auto Scaling に備えたサブネット設計（表77）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"IP の確保"}</strong></td><td>{" サブネットのサイズに、"}<strong>{"スケールアウト時の最大台数 + 予備"}</strong>{" を見込む。サブネットでは "}<strong>{"先頭4つと末尾1つ（計5つ）の IP が予約"}</strong>{" されている "}</td></tr><tr className={"even"}><td><strong>{"複数 AZ"}</strong></td><td>{" Auto Scaling グループに "}<strong>{"複数 AZ のサブネット"}</strong>{" を指定する "}</td></tr><tr className={"odd"}><td><strong>{"サブネットの用途分離"}</strong></td><td>{" ワークロードの種類（Web・アプリ・DB）、LB、エンドポイント、TGW アタッチメントを分ける "}</td></tr><tr className={"even"}><td><strong>{"余裕"}</strong></td><td>{" 他のサービスが ENI として IP を使う（ELB、Lambda、EKS、エンドポイント）ことも見込む "}</td></tr></tbody></table>{" "}</div>

<h4>{"8.2 IP アドレス枯渇の防止"}</h4>

<Diagram id="diag-25" label={"8.2 IP アドレス枯渇の防止"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"8.2 IP アドレス枯渇の防止（表78）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"手段"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"セカンダリ CIDR の追加"}</strong></td><td>{" VPC に追加の IPv4 CIDR を関連付け、新しいサブネットを作る（VPC あたりの CIDR 数には上限あり） "}</td></tr><tr className={"even"}><td><strong>{"100.64.0.0/10 の利用"}</strong></td><td>{" 重複しにくい範囲として、コンテナ（EKS のカスタムネットワーキング）等で活用されることが多い "}</td></tr><tr className={"odd"}><td><strong>{"IPv6 の導入"}</strong></td><td>{"事実上、枯渇しない アドレス空間"}</td></tr><tr className={"even"}><td><strong>{"IPAM"}</strong></td><td>{"組織全体の CIDR を一元管理し、重複・枯渇を予防"}</td></tr><tr className={"odd"}><td><strong>{"プレフィックス委任"}</strong></td><td>{" ENI に /28 単位でアドレスを割り当て、Pod 数が多い環境の IP 効率を上げる "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"既存 VPC の IPv4 が枯渇した。再構築なしで解決したい"}</strong>{"」→ "}<strong>{"セカンダリ CIDR の追加"}</strong>{"（+ 新しいサブネット）。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表79）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" VPC 作成時に "}<strong>{"大きめの CIDR"}</strong>{" を確保する（後から縮小できない） "}</td><td>{"拡張余地"}</td></tr><tr className={"even"}><td>{"2"}</td><td><strong>{"IPAM"}</strong>{" で CIDR を一元管理する"}</td><td>{"重複・枯渇の予防"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" サブネット使用率を "}<strong>{"監視"}</strong>{"（CloudWatch などで空き IP を確認）する "}</td><td>{"枯渇の前に対応"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{" TGW アタッチメント用に "}<strong>{"小さな専用サブネット"}</strong>{" を用意する "}</td><td>{"他のワークロードと IP を取り合わない"}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-9-step-9aws-global-accelerator-で性能と可用性を高める"} tabIndex={-1}>{" C-9. Step 9：AWS Global Accelerator で性能と可用性を高める "}</h3>

<h4>{"仕組み"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み（表80）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"静的エニーキャスト IP"}</strong></td><td>{" 2つの固定 IP を提供し、世界中のエッジロケーションから広告される "}</td></tr><tr className={"even"}><td>{"経路"}</td><td>{" 利用者は最寄りのエッジから "}<strong>{"AWS のグローバルバックボーン"}</strong>{" に入り、エンドポイントへ到達する（インターネットの経路を通る区間が短い） "}</td></tr><tr className={"odd"}><td>{"エンドポイント"}</td><td>{"ALB、NLB、EC2、Elastic IP"}</td></tr><tr className={"even"}><td>{"障害対応"}</td><td>{" "}<strong>{"ヘルスチェック"}</strong>{" で異常なエンドポイントを除外し、"}<strong>{"高速にフェイルオーバー"}</strong>{" "}</td></tr><tr className={"odd"}><td>{"制御"}</td><td>{" "}<strong>{"トラフィックダイヤル"}</strong>{"（リージョン単位の割合）、"}<strong>{"エンドポイントの重み"}</strong>{" "}</td></tr><tr className={"even"}><td>{"プロトコル"}</td><td><strong>{"TCP / UDP"}</strong>{"（HTTP に限らない）"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-26" label={"仕組み"} />

<h4>{"CloudFront との使い分け"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"CloudFront との使い分け（表81）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"比較"}</th><th scope="col"><strong>{"Global Accelerator"}</strong></th><th scope="col"><strong>{"CloudFront"}</strong></th></tr></thead><tbody><tr className={"odd"}><td>{"主目的"}</td><td>{" "}<strong>{"性能と可用性"}</strong>{" の向上（経路の最適化、高速フェイルオーバー） "}</td><td><strong>{"キャッシュ配信"}</strong>{"（帯域とオリジン負荷の削減）"}</td></tr><tr className={"even"}><td>{"対象プロトコル"}</td><td>{"TCP / UDP"}</td><td>{"HTTP/HTTPS（および WebSocket など）"}</td></tr><tr className={"odd"}><td>{"固定 IP"}</td><td><strong>{"あり"}</strong>{"（静的エニーキャスト IP）"}</td><td>{"なし（ドメイン名で利用）"}</td></tr><tr className={"even"}><td>{"キャッシュ"}</td><td>{"なし"}</td><td>{"あり"}</td></tr><tr className={"odd"}><td>{"向く場面"}</td><td>{" ゲーム、IoT、VoIP、固定 IP が必要な通信、"}<strong>{"リージョン間の高速切替"}</strong>{" "}</td><td>{"静的/動的コンテンツ配信"}</td></tr></tbody></table>{" "}</div>

<h4>{"Route 53 との使い分け"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Route 53 との使い分け（表82）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"比較"}</th><th scope="col">{"Global Accelerator"}</th><th scope="col">{"Route 53（DNS）"}</th></tr></thead><tbody><tr className={"odd"}><td>{"切り替えの仕組み"}</td><td>{" "}<strong>{"IP は変わらない"}</strong>{"ので、DNS キャッシュに左右されない "}</td><td>{" DNS の "}<strong>{"TTL とクライアントのキャッシュ"}</strong>{" に依存 "}</td></tr><tr className={"even"}><td>{"障害時の切り替え速度"}</td><td><strong>{"速い"}</strong></td><td>{"TTL 次第"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"DNS キャッシュのせいでフェイルオーバーが遅い／クライアントが IP を固定で許可リストに登録している"}</strong>{"」→ "}<strong>{"Global Accelerator"}</strong>{"。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表83）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" アクセラレーターは "}<strong>{"複数リージョンのエンドポイント"}</strong>{" で構成する "}</td><td>{"リージョン障害に耐える"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" "}<strong>{"トラフィックダイヤル"}</strong>{" で、段階的なリリース/切替を行う "}</td><td>{"リスクを抑えて切り替えられる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" "}<strong>{"クライアント IP の保持"}</strong>{" が必要か要件を確認する "}</td><td>{"エンドポイントの種類で挙動が異なる"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"ヘルスチェックの設定を、アプリの状態を反映するパスにする"}</td><td>{"本当に異常なときだけ切り替える"}</td></tr></tbody></table>{" "}</div>

<h3 id={"c-10-task-33-まとめ判断早見表"} tabIndex={-1}>{"C-10. Task 3.3 まとめ：判断早見表"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"C-10. Task 3.3 まとめ：判断早見表（表84）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"要件"}</th><th scope="col">{"選択肢"}</th></tr></thead><tbody><tr className={"odd"}><td>{"2つの VPC 間の大量転送を低コストに"}</td><td><strong>{"VPC ピアリング"}</strong></td></tr><tr className={"even"}><td>{"数十の VPC + オンプレミスを統合"}</td><td><strong>{"Transit Gateway"}</strong></td></tr><tr className={"odd"}><td>{"CIDR が重複した VPC のサービスを使う"}</td><td><strong>{"PrivateLink"}</strong></td></tr><tr className={"even"}><td>{"継続的な大量転送のコストを下げる"}</td><td><strong>{"Direct Connect"}</strong>{"（+ VPN バックアップ）"}</td></tr><tr className={"odd"}><td>{"S3 へのアクセスで NAT のコストを下げたい"}</td><td><strong>{"ゲートウェイ型 VPC エンドポイント"}</strong></td></tr><tr className={"even"}><td>{"HPC のノード間通信の超低遅延"}</td><td><strong>{"EFA"}</strong>{" + クラスタープレイスメントグループ"}</td></tr><tr className={"odd"}><td>{"1 フローの性能・テイル遅延を改善（同一 AZ）"}</td><td><strong>{"ENA Express"}</strong></td></tr><tr className={"even"}><td>{"同じデータを多数の受信者へ効率よく配る"}</td><td><strong>{"TGW マルチキャスト"}</strong></td></tr><tr className={"odd"}><td>{"静的コンテンツを世界中へ配信"}</td><td><strong>{"CloudFront"}</strong></td></tr><tr className={"even"}><td>{"TCP/UDP の高速化 + 固定 IP + 高速切替"}</td><td><strong>{"Global Accelerator"}</strong></td></tr><tr className={"odd"}><td>{"複数リージョンで遅延が小さい所へ誘導"}</td><td><strong>{"Route 53 レイテンシー + ヘルスチェック"}</strong></td></tr><tr className={"even"}><td>{"カナリアリリース（段階的な切替）"}</td><td>{" "}<strong>{"Route 53 加重"}</strong>{" または "}<strong>{"Global Accelerator のトラフィックダイヤル"}</strong>{" "}</td></tr><tr className={"odd"}><td>{"VPC の IPv4 が枯渇"}</td><td><strong>{"セカンダリ CIDR"}</strong>{"（+ IPAM）"}</td></tr><tr className={"even"}><td>{"ファイアウォールを集中配置"}</td><td><strong>{"GWLB + TGW"}</strong></td></tr><tr className={"odd"}><td>{"ジャンボフレームを使いたい"}</td><td>{" "}<strong>{"DX・VPC・TGW 内のみ"}</strong>{"（インターネット・VPN は 1500） "}</td></tr></tbody></table>{" "}</div>
</div>;}
