import { Diagram } from '../Diagram';
/** 原本のfoundation区分を全文保持する。 */
export default function Foundation(){return <div className="guide-part" data-part="foundation">
<div className={"hero"}>{" "}<div className={"kicker"}>{" AWS Certified Advanced Networking - Specialty · Domain 2 "}</div>{" "}<h1>{" AWS Certified Advanced Networking - Specialty (ANS-C01) Content Domain 2: Network Implementation(ネットワークの実装)初学者向けステップバイステップ解説 "}</h1>{" "}<div className={"meta-row"}>{" "}<span className={"pill"}>{"配点 "}<strong>{"約26%"}</strong></span>{" "}<span className={"pill"}>{"対象 "}<strong>{"初学者〜中級者"}</strong></span>{" "}<span className={"pill"}>{"図解 "}<strong>{"Mermaid 26点"}</strong></span>{" "}<span className={"pill"}>{"参考文献 "}<strong>{"40件"}</strong></span>{" "}</div>{" "}</div>

<blockquote className={"note"}>{" "}<p>{"対象試験: AWS Certified Advanced Networking - Specialty (ANS-C01)"}</p>{" "}<p>{" 想定受験: Pearson VUE(テストセンターまたはオンライン)での受験。受験言語は英語・日本語・韓国語・中国語(簡体字)から選択でき、本ガイドは日本国内から"}<strong>{"日本語または英語"}</strong>{"で受験する読者を想定 "}</p>{" "}<p>{" 受験可能期間(2026年10月17日確認): 英語版の公式認定ページは「最終受験日 2026年12月31日」と記載しており、この時点では予約・受験が可能です。一方、日本語版の公式ページは「最終受験日 2026年8月25日」のままで、記載が食い違っています。本ガイドは更新が新しい英語版ページの "}<strong>{"2026年12月31日"}</strong>{" を適用日として扱います。言語・地域ごとの予約枠は、予約前に Pearson VUE の予約画面で必ず確認してください(出典: "}<a href={"https://aws.amazon.com/certification/certified-advanced-networking-specialty/"}>{"英語版"}</a>{" / "}<a href={"https://aws.amazon.com/jp/certification/certified-advanced-networking-specialty/"}>{"日本語版"}</a>{") "}</p>{" "}<p>{" 対象ドメイン: "}<strong>{"Content Domain 2: Network Implementation(出題比率 26%)"}</strong>{" "}</p>{" "}<p>{" 想定読者: ネットワークの基礎(IPアドレス、サブネット、ルーティング)をざっくり知っている初学者〜中級者 "}</p>{" "}<p>{" 根拠(アンカー): "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/advanced-networking-specialty-01/advanced-networking-specialty-01-domain2.html"}>{"ANS-C01 試験ガイド Domain 2"}</a>{" "}</p>{" "}</blockquote>

<h2 id={"0-このガイドの使い方"} tabIndex={-1}>{"0. このガイドの使い方"}</h2>

<h3 id={"01-domain-2-の位置づけ"} tabIndex={-1}>{"0.1 Domain 2 の位置づけ"}</h3>

<p>{" ANS-C01 は4つのドメインで構成されます。Domain 2 は「設計(Domain 1)で決めた構成を"}<strong>{"実際に作って繋ぐ"}</strong>{"」領域で、出題比率は26%です。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"0.1 Domain 2 の位置づけ（表1）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"ドメイン"}</th><th scope="col">{"内容"}</th><th scope="col">{"比率"}</th></tr></thead><tbody><tr className={"odd"}><td>{"Domain 1"}</td><td>{"Network Design(設計)"}</td><td>{"30%"}</td></tr><tr className={"even"}><td><strong>{"Domain 2"}</strong></td><td><strong>{"Network Implementation(実装)"}</strong></td><td><strong>{"26%"}</strong></td></tr><tr className={"odd"}><td>{"Domain 3"}</td><td>{"Network Management and Operation(運用)"}</td><td>{"20%"}</td></tr><tr className={"even"}><td>{"Domain 4"}</td><td>{"Network Security, Compliance, and Governance(セキュリティ)"}</td><td>{"24%"}</td></tr></tbody></table>{" "}</div>

<p>{" 試験形式の要点(試験ガイドより): 出題形式は"}<strong>{"複数選択(Multiple response)"}</strong>{"と"}<strong>{"マッチング(Matching)"}</strong>{"のみで、スコア対象は50問(別途、採点対象外の問題が15問)。合格は"}<strong>{"スケールスコア750以上(100〜1,000)"}</strong>{"、合否は試験全体で判定される補償型スコアリングです。 "}</p>

<h3 id={"02-4つのタスクと学習の順番"} tabIndex={-1}>{"0.2 4つのタスクと学習の順番"}</h3>

<Diagram id="diag-1" label={"0.2 4つのタスクと学習の順番"} />

<p>{" この順番は「物理回線 → 論理的なネットワーク → 名前 → 自動化」と、下から上へ積み上げる順序です。初学者はこの順で読むと理解しやすくなります。 "}</p>

<h3 id={"03-各タスクの知識とスキル試験ガイドの要約"} tabIndex={-1}>{" 0.3 各タスクの「知識」と「スキル」(試験ガイドの要約) "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"0.3 各タスクの「知識」と「スキル」(試験ガイドの要約)（表2）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"タスク"}</th><th scope="col">{"主な知識"}</th><th scope="col">{"主なスキル"}</th></tr></thead><tbody><tr className={"odd"}><td>{"2.1"}</td><td>{" ルーティングプロトコル、VPN、L1(LOA、コロケーション、Direct Connect)、L2/L3、Transit Gateway Connect、DNS、ファイアウォール、L4/L7ロードバランシング、AWS Organizations/RAM、Reachability Analyzer "}</td><td>{" 物理要件の構成、静的/動的ルーティング、既存オンプレとの接続、名前解決、LB構成、監視とログ、接続性テスト "}</td></tr><tr className={"even"}><td>{"2.2"}</td><td>{" VPC Peering、Transit Gateway、VPN、SD-WAN、MPLS、PrivateLink、SAML/AD、SG/NACL/Network Firewall "}</td><td>{" 単一/複数VPC設計、サードパーティ連携、ハブ&スポーク、DNS、境界のセキュリティ、監視 "}</td></tr><tr className={"odd"}><td>{"2.3"}</td><td>{" プライベート/パブリックホストゾーン、ルーティングポリシー、委任と転送、レコードタイプ、DNSSEC、RAM共有、インバウンド/アウトバウンドエンドポイント "}</td><td>{" ゾーンと条件付き転送、トラフィック管理、ハイブリッドDNS、DNSSEC、集中/分散DNS、監視 "}</td></tr><tr className={"even"}><td>{"2.4"}</td><td>{" IaC(CDK/CloudFormation/CLI/SDK)、イベント駆動自動化、ハードコードの問題点 "}</td><td>{" 再利用可能な構成、イベント連携、ハイブリッド自動化、コスト最適化 "}</td></tr></tbody></table>{" "}</div>

<blockquote className={"note"}>{" "}<p>{" 試験ガイド自体が「網羅的な一覧ではない」と明記しています。本ガイドは各項目を実務レベルまで掘り下げ、関連する周辺知識も補っています。 "}</p>{" "}</blockquote>

<h3 id={"04-表記ルール"} tabIndex={-1}>{"0.4 表記ルール"}</h3>

<ul>{" "}<li>{" 図は "}<strong>{"Mermaid(フローチャート)"}</strong>{" と "}<strong>{"Markdownの表"}</strong>{" のみ使用しています(ASCII図は使いません)。 "}</li>{" "}<li>{" 数値(クォータ、帯域など)は変更されることがあります。"}<strong>{"必ず最新の公式ドキュメントで確認"}</strong>{"してください(§9にURLあり)。 "}</li>{" "}<li>{" ベストプラクティスは各節の末尾に「✅ ベストプラクティス」として整理しています。 "}</li>{" "}</ul>

<h2 id={"1-前提知識の整理l1l2l3bgpcidr"} tabIndex={-1}>{"1. 前提知識の整理(L1/L2/L3・BGP・CIDR)"}</h2>

<h3 id={"11-osi参照モデルとawsサービスの対応"} tabIndex={-1}>{" 1.1 OSI参照モデルとAWSサービスの対応 "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.1 OSI参照モデルとAWSサービスの対応（表3）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"層"}</th><th scope="col">{"名前"}</th><th scope="col">{"主な概念"}</th><th scope="col">{"試験で登場するAWSの要素"}</th></tr></thead><tbody><tr className={"odd"}><td>{"L1"}</td><td>{"物理層"}</td><td>{"光ファイバー、ポート、クロスコネクト"}</td><td>{"Direct Connect ロケーション、LOA-CFA、コロケーション"}</td></tr><tr className={"even"}><td>{"L2"}</td><td>{"データリンク層"}</td><td>{"VLAN、MACアドレス、スイッチング"}</td><td>{"Direct Connect の VIF(802.1Q VLAN ID)"}</td></tr><tr className={"odd"}><td>{"L3"}</td><td>{"ネットワーク層"}</td><td>{"IPアドレス、ルーティング"}</td><td>{"VPC ルートテーブル、BGP、Transit Gateway、GWLB(L3)"}</td></tr><tr className={"even"}><td>{"L4"}</td><td>{"トランスポート層"}</td><td>{"TCP/UDP、ポート"}</td><td>{"NLB、セキュリティグループ、NACL"}</td></tr><tr className={"odd"}><td>{"L7"}</td><td>{"アプリケーション層"}</td><td>{"HTTP、DNS"}</td><td>{"ALB、Route 53、AWS WAF"}</td></tr></tbody></table>{" "}</div>

<h3 id={"12-ルーティングの基本"} tabIndex={-1}>{"1.2 ルーティングの基本"}</h3>

<p>{" ルーターは「宛先IPアドレス → 次に渡す相手(ネクストホップ)」の対応表(ルーティングテーブル)で転送先を決めます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.2 ルーティングの基本（表4）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"方式"}</th><th scope="col">{"説明"}</th><th scope="col">{"長所"}</th><th scope="col">{"短所"}</th></tr></thead><tbody><tr className={"odd"}><td>{"静的ルーティング"}</td><td>{"管理者が手動で経路を書く"}</td><td>{"単純、BGP不要"}</td><td>{"障害時の自動切替ができない、変更が手作業"}</td></tr><tr className={"even"}><td>{"動的ルーティング(BGP)"}</td><td>{"ルーター同士が経路情報を交換する"}</td><td>{"自動で経路を学習・切替できる"}</td><td>{"BGPの設定と理解が必要"}</td></tr></tbody></table>{" "}</div>

<p>{" AWSで使う動的ルーティングは"}<strong>{"BGP(Border Gateway Protocol)"}</strong>{"です。BGPの最低限の用語は次の通りです。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.2 ルーティングの基本（表5）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"意味"}</th></tr></thead><tbody><tr className={"odd"}><td>{"ASN(自律システム番号)"}</td><td>{" ネットワーク運営者を識別する番号。プライベートASNの範囲は 64512〜65534(2バイト)と 4200000000〜4294967294(4バイト) "}</td></tr><tr className={"even"}><td>{"eBGP"}</td><td>{"異なるASN同士のBGP。AWSとオンプレのピアリングはeBGP"}</td></tr><tr className={"odd"}><td>{"AS_PATH"}</td><td>{"経路が通過したASNの列。"}<strong>{"短いほど優先"}</strong>{"される"}</td></tr><tr className={"even"}><td>{"MED / Local Preference"}</td><td>{"経路の優先度を調整する属性"}</td></tr><tr className={"odd"}><td>{"BGPコミュニティ"}</td><td>{"経路に付けるタグ。Direct Connectでは優先度制御に使う"}</td></tr><tr className={"even"}><td>{"BFD"}</td><td>{" 高速な障害検知プロトコル。BGP単独のタイムアウトより早く切り替えられる "}</td></tr></tbody></table>{" "}</div>

<h3 id={"13-cidrと重複の問題"} tabIndex={-1}>{"1.3 CIDRと重複の問題"}</h3>

<p>{" CIDR(例: "}<code>{"10.0.0.0/16"}</code>{")で表すアドレス範囲が、"}<strong>{"接続したい相手と重複すると多くの接続方式が使えません"}</strong>{"(VPC Peering は重複不可、Transit Gateway も同一ルートテーブル内で曖昧になる)。実装前に必ずIPアドレス計画(IPAM)を確認します。 "}</p>

<Diagram id="diag-2" label={"1.3 CIDRと重複の問題"} />

<blockquote className={"note"}>{" "}<p>{" PrivateLink は「サービス単位で一方向に」公開する仕組みなので、CIDRが重複していても使える、というのが試験の定番ポイントです(§3.4)。 "}</p>{" "}</blockquote>
</div>;}
