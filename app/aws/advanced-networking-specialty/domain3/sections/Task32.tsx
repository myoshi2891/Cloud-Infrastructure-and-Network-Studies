import { Diagram } from '../Diagram';
/** 原本のtask2区分を全文保持する。 */
export default function Task32(){return <div className="guide-part" data-part="task2"><h2 id={"part-b-task-32-トラフィックの監視分析とトラブルシューティング"} tabIndex={-1}>{" Part B. Task 3.2 トラフィックの監視・分析とトラブルシューティング "}</h2>

<blockquote>{" "}<p>{" "}<strong>{"公式のタスク文"}</strong>{": Monitor and analyze network traffic to troubleshoot and optimize connectivity patterns "}</p>{" "}</blockquote>

<h3 id={"b-0-このタスクで問われること"} tabIndex={-1}>{"B-0. このタスクで問われること"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"B-0. このタスクで問われること（表36）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"内容（Exam Guide の要旨）"}</th></tr></thead><tbody><tr className={"odd"}><td>{"知識"}</td><td>{" ネットワーク性能指標と到達性の制約（ルーティング、パケットサイズ）／性能・到達性の問題を評価するログとメトリクス（パケットロスなど）／収集・分析ツール（CloudWatch、VPC Flow Logs、VPC Traffic Mirroring）／経路分析ツール（Reachability Analyzer、Transit Gateway Network Manager） "}</td></tr><tr className={"even"}><td>{"スキル"}</td><td>{" ツール出力の分析／トポロジーの把握／パケット分析／設定ミスによる接続障害の調査／ネットワーク設計要件の検証／接続意図の検証の自動化／VPC 内のパケットサイズ不一致の調査 "}</td></tr></tbody></table>{" "}</div>

<h3 id={"b-1-step-1どのツールを使うかの全体地図"} tabIndex={-1}>{" B-1. Step 1：「どのツールを使うか」の全体地図 "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" ネットワーク調査ツールは多く、"}<strong>{"目的に合わないツールを使うと原因に辿り着けません"}</strong>{"。まず「何を知りたいか」で選びます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"なぜ必要か（表37）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"知りたいこと"}</th><th scope="col">{"使うツール"}</th><th scope="col">{"種類"}</th></tr></thead><tbody><tr className={"odd"}><td>{"設定上、通信が "}<strong>{"通るはずか"}</strong>{" を知りたい"}</td><td><strong>{"Reachability Analyzer"}</strong></td><td>{"設定の静的分析（実パケットは送らない）"}</td></tr><tr className={"even"}><td>{" 実際に "}<strong>{"誰が誰と通信し、許可/拒否されたか"}</strong>{" を知りたい "}</td><td><strong>{"VPC Flow Logs"}</strong></td><td>{"通信の記録（メタデータ）"}</td></tr><tr className={"odd"}><td>{" パケットの "}<strong>{"中身（ヘッダ・ペイロード）"}</strong>{" を見たい "}</td><td><strong>{"VPC Traffic Mirroring"}</strong></td><td>{"パケットコピー"}</td></tr><tr className={"even"}><td>{" 帯域・パケロス・遅延・状態の "}<strong>{"数値推移"}</strong>{" を見たい "}</td><td><strong>{"Amazon CloudWatch"}</strong>{" メトリクス/アラーム"}</td><td>{"数値監視"}</td></tr><tr className={"odd"}><td><strong>{"全体構成・経路・イベント"}</strong>{" を俯瞰したい"}</td><td><strong>{"Transit Gateway Network Manager"}</strong></td><td>{"トポロジーと可視化"}</td></tr><tr className={"even"}><td>{" EC2 間やサービス宛の "}<strong>{"TCP の遅延・パケロス"}</strong>{" を見たい "}</td><td><strong>{"CloudWatch Network Flow Monitor"}</strong></td><td>{"エージェントによる受動監視"}</td></tr><tr className={"odd"}><td>{" オンプレミス宛のハイブリッド回線を "}<strong>{"能動的に測りたい"}</strong>{" "}</td><td><strong>{"CloudWatch Network Synthetic Monitor"}</strong></td><td>{"プローブによる能動監視"}</td></tr><tr className={"even"}><td><strong>{"インターネット側"}</strong>{" の性能・可用性を知りたい"}</td><td><strong>{"CloudWatch Internet Monitor"}</strong></td><td>{"基準値との比較"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-13" label={"なぜ必要か"} />

<h3 id={"b-2-step-2性能指標と到達性の制約を理解する"} tabIndex={-1}>{" B-2. Step 2：性能指標と到達性の制約を理解する "}</h3>

<h4>{"主な性能指標"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"主な性能指標（表38）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"指標"}</th><th scope="col">{"意味"}</th><th scope="col">{"悪化したときに疑うこと"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"帯域（スループット）"}</strong></td><td>{"単位時間に流せるデータ量"}</td><td>{"インスタンス/回線/ゲートウェイの上限"}</td></tr><tr className={"even"}><td><strong>{"遅延（レイテンシ）"}</strong></td><td>{"往復にかかる時間"}</td><td>{"経路の遠回り、リージョン距離"}</td></tr><tr className={"odd"}><td><strong>{"パケットロス"}</strong></td><td>{"届かなかった割合"}</td><td>{"輻輳、上限超過、回線品質"}</td></tr><tr className={"even"}><td><strong>{"ジッタ"}</strong></td><td>{"遅延のばらつき"}</td><td>{"輻輳、経路切替"}</td></tr><tr className={"odd"}><td><strong>{"PPS"}</strong></td><td>{"1秒あたりのパケット数"}</td><td>{"小さなパケットの大量送信"}</td></tr></tbody></table>{" "}</div>

<h4>{"到達性を妨げる典型要因"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"到達性を妨げる典型要因（表39）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"分類"}</th><th scope="col">{"具体例"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"ルーティング"}</strong></td><td>{" ルートがない／優先順位の誤解／ブラックホール／戻りの経路がない（非対称） "}</td></tr><tr className={"even"}><td><strong>{"フィルタ"}</strong></td><td>{" セキュリティグループ、ネットワーク ACL（"}<strong>{"ステートレス"}</strong>{"、戻りも許可が必要）、ファイアウォール "}</td></tr><tr className={"odd"}><td><strong>{"パケットサイズ"}</strong></td><td>{"MTU 不一致、PMTUD の ICMP が遮断されている"}</td></tr><tr className={"even"}><td><strong>{"上限"}</strong></td><td>{"帯域、PPS、コネクション数、ルート数の超過"}</td></tr><tr className={"odd"}><td><strong>{"名前解決"}</strong></td><td>{" DNS の設定誤り（Route 53 Resolver、プライベートホストゾーン） "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"小さい通信（ping、ログイン）は通るが、大きなデータ転送だけ止まる"}</strong>{"」はほぼ "}<strong>{"MTU / MSS（パケットサイズ）"}</strong>{" の問題です（B-7 参照）。 "}</p>{" "}</blockquote>

<h3 id={"b-3-step-3amazon-cloudwatch-でメトリクスとログを監視する"} tabIndex={-1}>{" B-3. Step 3：Amazon CloudWatch でメトリクスとログを監視する "}</h3>

<h4>{"仕組み"}</h4>

<p>{" CloudWatch は、各サービスが自動送信するメトリクスを集め、アラームや ダッシュボードにします。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み（表40）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"対象"}</th><th scope="col">{"主なメトリクス（例）"}</th><th scope="col">{"見るポイント"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"Direct Connect"}</strong></td><td>{" "}<code>{"ConnectionState"}</code>{"、"}<code>{"ConnectionBpsEgress/Ingress"}</code>{"、"}<code>{"ConnectionPpsEgress/Ingress"}</code>{"、"}<code>{"ConnectionErrorCount"}</code>{"、"}<code>{"ConnectionLightLevelTx/Rx"}</code>{" "}</td><td>{"接続の up/down、帯域の使用率、エラー、光レベルの劣化"}</td></tr><tr className={"even"}><td><strong>{"Site-to-Site VPN"}</strong></td><td><code>{"TunnelState"}</code>{"、"}<code>{"TunnelDataIn/Out"}</code></td><td>{"2本のトンネルの状態（片方だけ down を検知）"}</td></tr><tr className={"odd"}><td><strong>{"Transit Gateway"}</strong></td><td>{" "}<code>{"BytesIn/Out"}</code>{"、"}<code>{"PacketsIn/Out"}</code>{"、"}<code>{"PacketDropCountBlackhole"}</code>{"、"}<code>{"PacketDropCountNoRoute"}</code>{" "}</td><td>{"ブラックホール（行き先なし）や ルートなしで捨てられた数"}</td></tr><tr className={"even"}><td><strong>{"NAT ゲートウェイ"}</strong></td><td>{" "}<code>{"ErrorPortAllocation"}</code>{"、"}<code>{"PacketsDropCount"}</code>{"、"}<code>{"ConnectionAttemptCount"}</code>{" "}</td><td>{"ポート枯渇や 同時接続の限界"}</td></tr><tr className={"odd"}><td><strong>{"ELB（ALB/NLB）"}</strong></td><td>{" "}<code>{"UnHealthyHostCount"}</code>{"、"}<code>{"TargetResponseTime"}</code>{"、"}<code>{"TargetConnectionErrorCount"}</code>{"（※NLB は "}<code>{"UnHealthyHostCount"}</code>{"、"}<code>{"TCP_Target_Reset_Count"}</code>{" など） "}</td><td>{"ターゲットの健全性と遅延"}</td></tr><tr className={"even"}><td><strong>{"EC2 の ENA"}</strong></td><td>{" "}<code>{"ethtool"}</code>{" の "}<code>{"bw_in_allowance_exceeded"}</code>{"、"}<code>{"bw_out_allowance_exceeded"}</code>{"、"}<code>{"pps_allowance_exceeded"}</code>{"、"}<code>{"conntrack_allowance_exceeded"}</code>{"、"}<code>{"linklocal_allowance_exceeded"}</code>{"（CloudWatch へは自動送信されない。"}<code>{"ethtool -S"}</code>{" で確認するか、CloudWatch エージェントの "}<code>{"ethtool"}</code>{" 収集を設定する。取り込んだメトリクス名には "}<code>{"ethtool_"}</code>{" 接頭辞が付く） "}</td><td>{" "}<strong>{"インスタンスの帯域・PPS・接続追跡の上限超過によるドロップ"}</strong>{" "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「EC2 の ネットワーク性能が突然落ちた。CPU は余裕がある」→ ENA のネットワーク許容量超過メトリクス（"}<code>{"*_allowance_exceeded"}</code>{"）を確認し、"}<strong>{"より大きなインスタンスタイプ"}</strong>{"、または "}<strong>{"ENA Express/EFA"}</strong>{" を検討します。 "}</p>{" "}</blockquote>

<h4>{"CloudWatch の使い方（ベストプラクティス込み）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"CloudWatch の使い方（ベストプラクティス込み）（表41）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" DX の "}<code>{"ConnectionState"}</code>{"、VPN の "}<code>{"TunnelState"}</code>{" に "}<strong>{"アラーム"}</strong>{" を設定する "}</td><td>{"障害を利用者より先に検知できる"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" 帯域使用率が "}<strong>{"目安 70〜80%"}</strong>{" を超えたら通知する "}</td><td>{"輻輳前に増強を計画できる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" TGW の "}<code>{"PacketDropCountBlackhole"}</code>{" / "}<code>{"NoRoute"}</code>{" を "}<strong>{"ダッシュボード化"}</strong>{" する "}</td><td>{"ルート不備を早期に発見できる"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{" Logs の "}<strong>{"メトリクスフィルタ"}</strong>{" で、REJECT などを数値化する "}</td><td>{"ログを数値監視へ変換できる"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{" "}<strong>{"クロスアカウント/クロスリージョンのダッシュボード"}</strong>{" を作る "}</td><td>{"多数の VPC を一括で見られる"}</td></tr></tbody></table>{" "}</div>

<h3 id={"b-4-step-4vpc-flow-logs-で通信の記録を分析する"} tabIndex={-1}>{" B-4. Step 4：VPC Flow Logs で通信の記録を分析する "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" Flow Logs は "}<strong>{"「誰が（送信元）誰に（宛先）どのポートで、許可/拒否されたか」"}</strong>{" を記録します。拒否された通信の特定に最適です。 "}</p>

<h4>{"仕組み"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み（表42）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"取得できる粒度"}</td><td>{"VPC、サブネット、ENI のいずれか"}</td></tr><tr className={"even"}><td>{"保存先"}</td><td>{"CloudWatch Logs、Amazon S3、Amazon Data Firehose"}</td></tr><tr className={"odd"}><td>{"集約間隔"}</td><td>{"1分 または 10分（既定は10分）"}</td></tr><tr className={"even"}><td>{"記録内容"}</td><td><strong>{"メタデータのみ"}</strong>{"（ペイロードは含まない）"}</td></tr><tr className={"odd"}><td>{"主なフィールド"}</td><td>{" "}<code>{"srcaddr"}</code>{"、"}<code>{"dstaddr"}</code>{"、"}<code>{"srcport"}</code>{"、"}<code>{"dstport"}</code>{"、"}<code>{"protocol"}</code>{"、"}<code>{"packets"}</code>{"、"}<code>{"bytes"}</code>{"、"}<code>{"action"}</code>{"（ACCEPT/REJECT）、"}<code>{"log-status"}</code>{" "}</td></tr><tr className={"even"}><td>{"拡張フィールド（カスタム形式）"}</td><td>{" "}<code>{"pkt-srcaddr"}</code>{"、"}<code>{"pkt-dstaddr"}</code>{"、"}<code>{"flow-direction"}</code>{"、"}<code>{"tcp-flags"}</code>{"、"}<code>{"vpc-id"}</code>{"、"}<code>{"subnet-id"}</code>{"、"}<code>{"az-id"}</code>{" など "}</td></tr></tbody></table>{" "}</div>

<p>{" "}<strong>{"記録されない通信（例）"}</strong>{": Amazon の DNS サーバーとの通信、DHCP、インスタンスメタデータ（169.254.169.254）、Amazon Time Sync、Windows のライセンス認証、VPC ルーターの予約 IP への通信、Traffic Mirroring のミラートラフィック。 "}</p>

<h4>{"ログの読み方（例）"}</h4>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"text"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"ログの読み方（例）（コード1）"}><div className="code-line"><span className={"mi"}>{"2"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"123456789010"}</span><span className={"w"}>{" "}</span><span className={"nv"}>{"eni-0a1b2c3d"}</span><span className={"w"}>{" "}</span><span className={"mf"}>{"10.0.1.10"}</span><span className={"w"}>{" "}</span><span className={"mf"}>{"10.0.2.20"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"49152"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"443"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"6"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"20"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"4000"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"1700000000"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"1700000060"}</span><span className={"w"}>{" "}</span><span className={"gi"}>{"ACCEPT"}</span><span className={"w"}>{" "}</span><span className={"kc"}>{"OK"}</span></div>
<div className="code-line"><span className={"mi"}>{"2"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"123456789010"}</span><span className={"w"}>{" "}</span><span className={"nv"}>{"eni-0a1b2c3d"}</span><span className={"w"}>{" "}</span><span className={"mf"}>{"10.0.1.10"}</span><span className={"w"}>{" "}</span><span className={"mf"}>{"10.0.2.20"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"49153"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"22"}</span><span className={"w"}>{"  "}</span><span className={"mi"}>{"6"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"1"}</span><span className={"w"}>{"  "}</span><span className={"mi"}>{"40"}</span><span className={"w"}>{"   "}</span><span className={"mi"}>{"1700000000"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"1700000060"}</span><span className={"w"}>{" "}</span><span className={"gd"}>{"REJECT"}</span><span className={"w"}>{" "}</span><span className={"kc"}>{"OK"}</span></div></div>{" "}</div>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ログの読み方（例）（表43）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"読み取り"}</th><th scope="col">{"判断"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1行目: 宛先ポート 443、"}<code>{"ACCEPT"}</code></td><td>{"HTTPS は許可されている"}</td></tr><tr className={"even"}><td>{"2行目: 宛先ポート 22、"}<code>{"REJECT"}</code></td><td>{"SSH は拒否。セキュリティグループか ネットワーク ACL を確認"}</td></tr></tbody></table>{" "}</div>

<h4>{"SG と NACL のどちらが拒否したかの見分け方"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"SG と NACL のどちらが拒否したかの見分け方（表44）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"観察"}</th><th scope="col">{"疑う箇所"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"往路は ACCEPT、戻りが REJECT"}</strong></td><td>{" "}<strong>{"ネットワーク ACL"}</strong>{"（ステートレスなので戻りの許可が必要） "}</td></tr><tr className={"even"}><td>{"往路から REJECT"}</td><td>{"セキュリティグループ、または ネットワーク ACL の許可不足"}</td></tr><tr className={"odd"}><td>{"ログに "}<strong>{"そもそも出ない"}</strong></td><td>{" ルーティングの問題（パケットが届いていない）、または記録対象外の通信。"}<code>{"log-status"}</code>{" が "}<code>{"SKIPDATA"}</code>{" のレコードは、集約間隔中に記録がスキップされた（容量超過や内部エラー）ことを示す "}</td></tr></tbody></table>{" "}</div>

<h4>{"Athena での分析例"}</h4>

<p>{" S3 に保存した Flow Logs を Athena で集計すると、拒否上位の通信を調べられます。 "}</p>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"sql"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"Athena での分析例（コード2）"}><div className="code-line"><span className={"k"}>{"SELECT"}</span><span className={"w"}>{" "}</span><span className={"n"}>{"srcaddr"}</span><span className={"p"}>{","}</span><span className={"w"}>{" "}</span><span className={"n"}>{"dstaddr"}</span><span className={"p"}>{","}</span><span className={"w"}>{" "}</span><span className={"n"}>{"dstport"}</span><span className={"p"}>{","}</span><span className={"w"}>{" "}</span><span className={"k"}>{"COUNT"}</span><span className={"p"}>{"("}</span><span className={"o"}>{"*"}</span><span className={"p"}>{")"}</span><span className={"w"}>{" "}</span><span className={"k"}>{"AS"}</span><span className={"w"}>{" "}</span><span className={"n"}>{"rejects"}</span></div>
<div className="code-line"><span className={"k"}>{"FROM"}</span><span className={"w"}>{" "}</span><span className={"n"}>{"vpc_flow_logs"}</span></div>
<div className="code-line"><span className={"k"}>{"WHERE"}</span><span className={"w"}>{" "}</span><span className={"n"}>{"action"}</span><span className={"w"}>{" "}</span><span className={"o"}>{"="}</span><span className={"w"}>{" "}</span><span className={"s1"}>{"'REJECT'"}</span></div>
<div className="code-line"><span className={"k"}>{"GROUP"}</span><span className={"w"}>{" "}</span><span className={"k"}>{"BY"}</span><span className={"w"}>{" "}</span><span className={"n"}>{"srcaddr"}</span><span className={"p"}>{","}</span><span className={"w"}>{" "}</span><span className={"n"}>{"dstaddr"}</span><span className={"p"}>{","}</span><span className={"w"}>{" "}</span><span className={"n"}>{"dstport"}</span></div>
<div className="code-line"><span className={"k"}>{"ORDER"}</span><span className={"w"}>{" "}</span><span className={"k"}>{"BY"}</span><span className={"w"}>{" "}</span><span className={"n"}>{"rejects"}</span><span className={"w"}>{" "}</span><span className={"k"}>{"DESC"}</span></div>
<div className="code-line"><span className={"k"}>{"LIMIT"}</span><span className={"w"}>{" "}</span><span className={"mi"}>{"20"}</span><span className={"p"}>{";"}</span></div></div>{" "}</div>

<h4>{"Flow Logs を作成する例（AWS CLI）"}</h4>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"Flow Logs を作成する例（AWS CLI）（コード3）"}><div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"create-flow-logs"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--resource-type"}<span className={"w"}>{" "}</span>{"VPC"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--resource-ids"}<span className={"w"}>{" "}</span>{"vpc-0123456789abcdef0"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--traffic-type"}<span className={"w"}>{" "}</span>{"ALL"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--log-destination-type"}<span className={"w"}>{" "}</span>{"s3"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--log-destination"}<span className={"w"}>{" "}</span>{"arn:aws:s3:::my-flow-logs-bucket/vpc/"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--max-aggregation-interval"}<span className={"w"}>{" "}</span><span className={"m"}>{"60"}</span><span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--log-format"}<span className={"w"}>{" "}</span><span className={"s1"}>{"'${version} ${vpc-id} ${srcaddr} ${dstaddr} ${dstport} ${protocol} ${bytes} ${action} ${tcp-flags} ${flow-direction} ${log-status}'"}</span></div></div>{" "}</div>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表45）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" 長期保存と分析は "}<strong>{"S3 + Athena"}</strong>{"、リアルタイム検知は "}<strong>{"CloudWatch Logs"}</strong>{" を使い分ける "}</td><td>{"コストと用途の最適化"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" "}<strong>{"カスタム形式"}</strong>{" で必要なフィールド（"}<code>{"tcp-flags"}</code>{"、"}<code>{"pkt-srcaddr"}</code>{" など）を含める "}</td><td>{"NAT やエンドポイント経由の実際の送信元が分かる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" 全 VPC で有効化し、"}<strong>{"集約アカウント"}</strong>{" に保管する "}</td><td>{"監査・調査の漏れを防ぐ"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"調査時は集約間隔を "}<strong>{"1分"}</strong>{" にする"}</td><td>{"事象の発生時刻を精密に追える"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{"ログのライフサイクル（保存期間）を設定する"}</td><td>{"保管コストを抑える"}</td></tr></tbody></table>{" "}</div>

<h3 id={"b-5-step-5vpc-traffic-mirroring-でパケットを解析する"} tabIndex={-1}>{" B-5. Step 5：VPC Traffic Mirroring でパケットを解析する "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" Flow Logs は中身を見られません。"}<strong>{"パケットの中身（TCP のフラグ、再送、ペイロード）を詳しく見たいとき"}</strong>{" は Traffic Mirroring を使います。 "}</p>

<h4>{"仕組み"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み（表46）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"構成要素"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"ミラーソース"}</strong></td><td>{"コピー元の ENI（Nitro ベースのインスタンスが対象）"}</td></tr><tr className={"even"}><td><strong>{"ミラーフィルタ"}</strong></td><td>{" コピーするトラフィックの条件（プロトコル・ポート・CIDR、方向） "}</td></tr><tr className={"odd"}><td><strong>{"ミラーターゲット"}</strong></td><td>{" コピー先（ENI、"}<strong>{"Network Load Balancer"}</strong>{"、Gateway Load Balancer エンドポイント） "}</td></tr><tr className={"even"}><td><strong>{"ミラーセッション"}</strong></td><td>{"ソース・フィルタ・ターゲットの組み合わせ"}</td></tr><tr className={"odd"}><td><strong>{"カプセル化"}</strong></td><td>{"コピーは "}<strong>{"VXLAN（UDP 4789）"}</strong>{" で送られる"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-14" label={"仕組み"} />

<h4>{"使いどころ"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"使いどころ（表47）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"用途"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"パケット整形（Packet Shaping）の分析"}</strong></td><td>{"再送、ウィンドウサイズ、遅延などを解析"}</td></tr><tr className={"even"}><td>{"セキュリティ検知（IDS）"}</td><td>{"不正通信の検知"}</td></tr><tr className={"odd"}><td>{"性能調査"}</td><td>{"アプリ層の遅延の原因特定"}</td></tr></tbody></table>{" "}</div>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表48）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td><strong>{"フィルタで必要な通信だけ"}</strong>{" に絞る"}</td><td>{"ターゲットの負荷とコストを減らす"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"ターゲットは "}<strong>{"NLB の背後に複数台"}</strong>{" 置く"}</td><td>{"解析側の可用性とスケールを確保する"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" ミラーセッションの "}<strong>{"パケット長を制限（切り詰め）"}</strong>{" する "}</td><td>{"ヘッダだけを見たい場合に帯域を節約できる"}</td></tr><tr className={"even"}><td>{"4"}</td><td><strong>{"ミラー用トラフィックの帯域を考慮"}</strong>{" する"}</td><td>{"ソースの ENI の帯域を圧迫する可能性がある"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{"常時ではなく "}<strong>{"調査時に有効化"}</strong>{" する"}</td><td>{"コストとリスクの低減"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"ペイロードを含むパケットレベルの解析が必要"}</strong>{"」→ Traffic Mirroring。「"}<strong>{"拒否された通信を探す"}</strong>{"」→ Flow Logs。この対比が定番です。 "}</p>{" "}</blockquote>

<h3 id={"b-6-step-6reachability-analyzer-と-network-manager-で経路を可視化検証する"} tabIndex={-1}>{" B-6. Step 6：Reachability Analyzer と Network Manager で経路を可視化・検証する "}</h3>

<h4>{"6.1 Reachability Analyzer（到達性分析）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"6.1 Reachability Analyzer（到達性分析）（表49）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"何をするか"}</td><td>{" 送信元と宛先を指定し、"}<strong>{"設定（ルート、SG、NACL、ゲートウェイなど）を解析して、到達可能か"}</strong>{" を判定する "}</td></tr><tr className={"even"}><td>{"重要な特徴"}</td><td>{" "}<strong>{"実際にパケットを送らない"}</strong>{"（設定を静的に分析する） "}</td></tr><tr className={"odd"}><td>{"結果"}</td><td>{" 到達可能: 経路の各ホップを表示／到達不可: "}<strong>{"ブロックしている構成要素と説明コード"}</strong>{" を表示 "}</td></tr><tr className={"even"}><td>{"対象の例"}</td><td>{" ENI、インスタンス、IGW、VPN ゲートウェイ、TGW、VPC エンドポイント、VPC ピアリングなど "}</td></tr><tr className={"odd"}><td>{"制限の例"}</td><td>{" 経路の途中にインターネットゲートウェイがある分析など、対応しないケースがある（説明コードで通知される） "}</td></tr></tbody></table>{" "}</div>

<p>{"CLI の流れ:"}</p>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"6.1 Reachability Analyzer（到達性分析）（コード4）"}><div className="code-line"><span className={"c1"}>{"# 1. パス（調べたい送信元と宛先）を作成"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"create-network-insights-path"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--source"}<span className={"w"}>{" "}</span>{"eni-0aaa1111bbb2222cc"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--destination"}<span className={"w"}>{" "}</span>{"eni-0ddd3333eee4444ff"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--protocol"}<span className={"w"}>{" "}</span>{"tcp"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--destination-port"}<span className={"w"}>{" "}</span><span className={"m"}>{"443"}</span></div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 2. 分析を実行"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"start-network-insights-analysis"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--network-insights-path-id"}<span className={"w"}>{" "}</span>{"nip-0abc123def456789"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 3. 結果を確認（NetworkPathFound が false なら ExplanationCode が出る）"}</span></div>
<div className="code-line">{"aws"}<span className={"w"}>{" "}</span>{"ec2"}<span className={"w"}>{" "}</span>{"describe-network-insights-analyses"}<span className={"w"}>{" "}</span><span className={"se"}>{"\\"}</span></div>
<div className="code-line"><span className={"w"}>{"  "}</span>{"--network-insights-analysis-ids"}<span className={"w"}>{" "}</span>{"nia-0abc123def456789"}</div></div>{" "}</div>

<Diagram id="diag-15" label={"6.1 Reachability Analyzer（到達性分析）"} />

<h5>{"「接続意図の検証を自動化する」方法（試験の指定スキル）"}</h5>

<p>{" 変更のたびに手作業で確認する代わりに、"}<strong>{"パスと分析を IaC・パイプラインに組み込みます"}</strong>{"。 "}</p>

<Diagram id="diag-16" label={"6.1 Reachability Analyzer（到達性分析）"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"6.1 Reachability Analyzer（到達性分析）（表50）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" "}<strong>{"重要な通信パス（本番→DB、オンプレミス→共通サービス）を「期待値」として保存"}</strong>{" する "}</td><td>{"変更の影響を毎回自動で確認できる"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"変更のパイプラインに分析を組み込む"}</td><td>{"本番で壊す前に検出できる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" 障害時は、"}<strong>{"まず Reachability Analyzer で設定を確認 → 設定に問題がなければ Flow Logs / Traffic Mirroring で実トラフィックを確認"}</strong>{" "}</td><td>{"調査の順番を決めると速い"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{" "}<strong>{"Network Access Analyzer"}</strong>{"（意図しないアクセス経路の検出）と使い分ける "}</td><td>{"前者は「通るか」、後者は「通ってはいけない経路がないか」"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": Reachability Analyzer は「"}<strong>{"設定が原因か"}</strong>{"」を確かめます。設定上は通るのに通信できないなら、OS 設定・アプリ・MTU・負荷など設定以外が原因です。 "}</p>{" "}</blockquote>

<h4>{"6.2 Transit Gateway Network Manager"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"6.2 Transit Gateway Network Manager（表51）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"機能"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"グローバルネットワーク"}</strong></td><td>{" TGW・VPN・SD-WAN 機器・Cloud WAN を1つの論理ネットワークとして登録し、"}<strong>{"トポロジーを可視化"}</strong>{" "}</td></tr><tr className={"even"}><td><strong>{"ルートアナライザー"}</strong></td><td>{" TGW のルートテーブル上で、送信元から宛先への "}<strong>{"経路を分析"}</strong>{"（ルートの有無や不一致を発見） "}</td></tr><tr className={"odd"}><td><strong>{"イベントと メトリクス"}</strong></td><td>{" 接続状態の変化（アタッチメントの障害、ルート変更など）を "}<strong>{"EventBridge / CloudWatch"}</strong>{" で通知 "}</td></tr><tr className={"even"}><td><strong>{"リージョン間の性能"}</strong></td><td>{"AWS リージョン間の遅延を確認できる"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"ベストプラクティス"}</strong>{": 複数リージョン・複数アカウントの TGW を運用する場合、"}<strong>{"Network Manager に登録して全体を1画面で把握"}</strong>{" し、イベントを通知に接続します。 "}</p>{" "}</blockquote>

<h3 id={"b-7-step-7パケットサイズ不一致mtumssを解決する"} tabIndex={-1}>{" B-7. Step 7：パケットサイズ不一致（MTU/MSS）を解決する "}</h3>

<h4>{"仕組み"}</h4>

<p>{" "}<strong>{"MTU"}</strong>{" は1回に送れる最大パケットサイズです。経路の途中に "}<strong>{"MTU の小さい区間"}</strong>{" があると、大きなパケットは分割（断片化）されるか、破棄されます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み（表52）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"通信の種類"}</th><th scope="col">{"MTU の目安（公式値）"}</th></tr></thead><tbody><tr className={"odd"}><td>{"一般的なインスタンス間（同一 VPC 内など）"}</td><td>{"最大 "}<strong>{"9001"}</strong>{"（ジャンボフレーム）"}</td></tr><tr className={"even"}><td><strong>{"インターネットゲートウェイ"}</strong>{" 経由"}</td><td><strong>{"1500"}</strong></td></tr><tr className={"odd"}><td><strong>{"Site-to-Site VPN"}</strong>{" 経由"}</td><td>{"トンネル上限 "}<strong>{"1500"}</strong>{"／実効パケット MTU "}<strong>{"1446"}</strong>{"（MSS "}<strong>{"1406"}</strong>{"）"}</td></tr><tr className={"even"}><td><strong>{"Direct Connect プライベート VIF"}</strong></td><td>{"1500 または "}<strong>{"9001"}</strong></td></tr><tr className={"odd"}><td><strong>{"Direct Connect トランジット VIF"}</strong></td><td>{"1500 または "}<strong>{"8500"}</strong></td></tr><tr className={"even"}><td>{" "}<strong>{"Transit Gateway"}</strong>{"（VPC・DX・Connect・ピアリング間） "}</td><td>{"最大 "}<strong>{"8500"}</strong></td></tr></tbody></table>{" "}</div>

<h4>{"典型的な障害の流れ"}</h4>

<Diagram id="diag-17" label={"典型的な障害の流れ"} />

<h4>{"症状と対処"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"症状と対処（表53）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"症状"}</th><th scope="col">{"原因"}</th><th scope="col">{"対処"}</th></tr></thead><tbody><tr className={"odd"}><td>{" ping や ログイン、小さな HTTP は通る／大きな転送や TLS ハンドシェイクで止まる "}</td><td><strong>{"パスMTU の不一致 + ICMP 遮断"}</strong></td><td>{" "}<strong>{"ICMP タイプ3・コード4（Fragmentation Needed）"}</strong>{" を許可（IPv6 は ICMPv6 Packet Too Big） "}</td></tr><tr className={"even"}><td>{"VPN 経由だけ遅い／再送が多い"}</td><td>{"IPsec のオーバーヘッドで実効 MTU が下がる"}</td><td>{" お客様ルーターで "}<strong>{"TCP MSS クランプ（最大 1406）"}</strong>{" を設定、または MTU を最大値 "}<strong>{"1446"}</strong>{" 以下に下げる。暗号化・ハッシュアルゴリズム、NAT トラバーサル、IP ファミリー（IPv4/IPv6）の設定に応じて、さらに低い値を選ぶ "}</td></tr><tr className={"odd"}><td>{"ジャンボフレーム設定後に一部の通信が失敗"}</td><td>{"経路上に 1500 の区間がある"}</td><td>{" 経路上の "}<strong>{"全ホップで MTU を揃える"}</strong>{"、インターネット向け通信は 1500、VPN 向け通信は 1446（MSS 1406）に "}</td></tr></tbody></table>{" "}</div>

<h4>{"確認コマンド（Linux）"}</h4>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"確認コマンド（Linux）（コード5）"}><div className="code-line"><span className={"c1"}>{"# 現在の MTU を確認"}</span></div>
<div className="code-line">{"ip"}<span className={"w"}>{" "}</span>{"link"}<span className={"w"}>{" "}</span>{"show"}<span className={"w"}>{" "}</span>{"eth0"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# DF ビットを立てて、パケットサイズ別に疎通確認（1472 + 28 = 1500）"}</span></div>
<div className="code-line">{"ping"}<span className={"w"}>{" "}</span>{"-M"}<span className={"w"}>{" "}</span><span className={"k"}>{"do"}</span><span className={"w"}>{" "}</span>{"-s"}<span className={"w"}>{" "}</span><span className={"m"}>{"1472"}</span><span className={"w"}>{" "}</span><span className={"m"}>{"10"}</span>{".0.2.20"}</div>
<div className="code-line"></div>
<div className="code-line"><span className={"c1"}>{"# 経路上の MTU を調べる"}</span></div>
<div className="code-line">{"tracepath"}<span className={"w"}>{" "}</span><span className={"m"}>{"10"}</span>{".0.2.20"}</div></div>{" "}</div>

<div className={"code-sample"}>{" "}<div className={"code-lang"}>{"bash"}</div>{" "}<div className="code-block highlight" role="region" tabIndex={0} aria-label={"確認コマンド（Linux）（コード6）"}><div className="code-line"><span className={"c1"}>{"# 一時的に MTU を 1500 に設定する例（検証用）"}</span></div>
<div className="code-line">{"sudo"}<span className={"w"}>{" "}</span>{"ip"}<span className={"w"}>{" "}</span>{"link"}<span className={"w"}>{" "}</span><span className={"nb"}>{"set"}</span><span className={"w"}>{" "}</span>{"dev"}<span className={"w"}>{" "}</span>{"eth0"}<span className={"w"}>{" "}</span>{"mtu"}<span className={"w"}>{" "}</span><span className={"m"}>{"1500"}</span></div></div>{" "}</div>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表54）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" "}<strong>{"セキュリティグループ/NACL で ICMP の Fragmentation Needed を許可"}</strong>{" する "}</td><td>{"PMTUD が機能する前提"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" インターネット方向を含む通信では "}<strong>{"MTU 1500"}</strong>{"、VPN 方向では "}<strong>{"MTU 1446（MSS 1406）"}</strong>{" を前提にする "}</td><td>{"経路上の最小値に合わせる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" ジャンボフレームを使うなら、"}<strong>{"閉じた経路（同一 VPC・TGW・DX）に限定"}</strong>{" する "}</td><td>{"意図しない断片化や欠落を防ぐ"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"VPN の MSS を 1406 以下にクランプする"}</td><td>{"断片化を避ける定番の対処"}</td></tr></tbody></table>{" "}</div>

<h3 id={"b-8-step-8aws-network-monitoringflow--synthetic--internet-monitor"} tabIndex={-1}>{" B-8. Step 8：AWS Network Monitoring（Flow / Synthetic / Internet Monitor） "}</h3>

<p>{"CloudWatch の Network Monitoring には、目的の異なる3つの機能があります。"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"B-8. Step 8：AWS Network Monitoring（Flow / Synthetic / Internet Monitor）（表55）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"機能"}</th><th scope="col">{"何を測るか"}</th><th scope="col">{"仕組み"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"Network Flow Monitor"}</strong></td><td>{" EC2 間や、S3・DynamoDB など AWS サービス宛の "}<strong>{"TCP の遅延・パケットロス"}</strong>{" "}</td><td>{" インスタンスに "}<strong>{"軽量エージェント"}</strong>{" を導入し、TCP 接続の統計を収集（受動的） "}</td></tr><tr className={"even"}><td><strong>{"Network Synthetic Monitor"}</strong></td><td>{" AWS とオンプレミス間の "}<strong>{"ハイブリッド接続の遅延・パケットロス"}</strong>{" "}</td><td>{" AWS 上のリソースから、オンプレミス宛の "}<strong>{"プローブ"}</strong>{" を送信（能動的） "}</td></tr><tr className={"odd"}><td><strong>{"Internet Monitor"}</strong></td><td>{" インターネット経由のアクセスの "}<strong>{"性能・可用性"}</strong>{" "}</td><td>{" AWS のグローバルな接続データから基準値を算出し、"}<strong>{"障害イベント"}</strong>{" を通知 "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"問題の原因がアプリ側か、AWS インフラ側か切り分けたい"}</strong>{"」→ Network Flow Monitor。「"}<strong>{"専用線やVPN の遅延・ロスを継続監視したい"}</strong>{"」→ Network Synthetic Monitor。 "}</p>{" "}</blockquote>

<h3 id={"b-9-task-32-まとめ障害切り分けの標準手順"} tabIndex={-1}>{" B-9. Task 3.2 まとめ：障害切り分けの標準手順 "}</h3>

<Diagram id="diag-18" label={"B-9. Task 3.2 まとめ：障害切り分けの標準手順"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"B-9. Task 3.2 まとめ：障害切り分けの標準手順（表56）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"症状"}</th><th scope="col">{"まず疑うこと"}</th><th scope="col">{"使うツール"}</th></tr></thead><tbody><tr className={"odd"}><td>{"新しく作った VPC 間で通信できない"}</td><td>{"ルートの不足、SG の許可不足"}</td><td>{"Reachability Analyzer"}</td></tr><tr className={"even"}><td>{"特定の通信だけ REJECT"}</td><td>{"SG/NACL"}</td><td>{"Flow Logs"}</td></tr><tr className={"odd"}><td>{"往路は ACCEPT で戻りが REJECT"}</td><td>{"NACL（ステートレス）"}</td><td>{"Flow Logs"}</td></tr><tr className={"even"}><td>{"大きなデータだけ止まる"}</td><td>{"MTU/MSS、ICMP の遮断"}</td><td><code>{"ping -M do"}</code>{"、"}<code>{"tracepath"}</code></td></tr><tr className={"odd"}><td>{"EC2 の性能が上がらない"}</td><td>{"ENA の上限超過"}</td><td><code>{"ethtool -S"}</code>{"、CloudWatch"}</td></tr><tr className={"even"}><td>{"専用線の遅延・ロスを監視したい"}</td><td>{"―"}</td><td>{"Network Synthetic Monitor"}</td></tr><tr className={"odd"}><td>{"多数の TGW の全体像を把握したい"}</td><td>{"―"}</td><td>{"Transit Gateway Network Manager"}</td></tr><tr className={"even"}><td>{"パケットの中身を見たい"}</td><td>{"―"}</td><td>{"Traffic Mirroring"}</td></tr></tbody></table>{" "}</div>
</div>;}
