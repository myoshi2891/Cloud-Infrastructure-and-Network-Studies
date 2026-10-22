import { Diagram } from '../Diagram';
/** 原本のtask1区分を全文保持する。 */
export default function Task31(){return <div className="guide-part" data-part="task1"><h2 id={"part-a-task-31-ルーティングと接続性の維持"} tabIndex={-1}>{" Part A. Task 3.1 ルーティングと接続性の維持 "}</h2>

<blockquote>{" "}<p>{" "}<strong>{"公式のタスク文"}</strong>{": Maintain routing and connectivity on AWS and hybrid networks "}</p>{" "}</blockquote>

<h3 id={"a-0-このタスクで問われること"} tabIndex={-1}>{"A-0. このタスクで問われること"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"A-0. このタスクで問われること（表5）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"内容（Exam Guide の要旨）"}</th></tr></thead><tbody><tr className={"odd"}><td>{"知識"}</td><td>{" ハイブリッド網で使うルーティングプロトコル（例: Direct Connect 上の BGP）／接続方式（DXGW、TGW、VIF）／上限と クォータ（帯域、ルート数）／カスタムサービスへのプライベート・パブリックなアクセス手段（PrivateLink、VPC ピアリング）／リージョン間・リージョン内の通信パターン "}</td></tr><tr className={"even"}><td>{"スキル"}</td><td>{" ルーティングプロトコルの管理／カスタムサービスへのプライベートアクセスの維持／ルートテーブルによるトラフィック制御（自動伝播・BGP）／AWS サービスへのプライベート/パブリックアクセスの設定／静的・動的ルーティングの最適化（ルート集約、CIDR 重複） "}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-1-step-1ルートテーブルの基本ルールを理解する"} tabIndex={-1}>{" A-1. Step 1：ルートテーブルの基本ルールを理解する "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" 通信が「どこへ流れるか」を決めるのはルートテーブルです。トラブルの大半は "}<strong>{"ルートの優先順位を誤解している"}</strong>{" ことから起きます。 "}</p>

<h4>{"仕組み：判断の順番"}</h4>

<p>{"ルーターは、宛先 IP に対し次の順番で行き先を決めます。"}</p>

<Diagram id="diag-2" label={"仕組み：判断の順番"} />

<p>{" "}<strong>{"最長プレフィックス一致"}</strong>{"とは、より細かい範囲（例: "}<code>{"/24"}</code>{"）を、広い範囲（例: "}<code>{"/16"}</code>{"）より優先する規則です。"}<code>{"10.10.2.15/32"}</code>{" は "}<code>{"10.10.2.0/24"}</code>{" より優先されます。 "}</p>

<h4>{"VPC ルートテーブルでの優先順位（同じ宛先の場合）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"VPC ルートテーブルでの優先順位（同じ宛先の場合）（表6）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"優先度"}</th><th scope="col">{"ルートの種類"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" 静的ルート（VPC ピアリング、インターネットゲートウェイ、TGW、ゲートウェイ型 VPC エンドポイントなど） "}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"プレフィックスリストを参照するルート"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" 伝播されたルート：Direct Connect の BGP ルート → VPN の静的ルート → VPN の BGP ルート の順 "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"補足"}</strong>{": 宛先が "}<strong>{"完全に同じ"}</strong>{" ときの順位です。範囲の広さが違えば、常に最長プレフィックス一致が先に適用されます。 "}</p>{" "}<p>{" "}<strong>{"注意"}</strong>{": VPC 自身の CIDR に対する "}<strong>{"ローカルルートは最優先"}</strong>{" で、より具体的な伝播ルートでも上書きできません。 "}</p>{" "}</blockquote>

<h4>{"Transit Gateway ルートテーブルでの優先順位（同じ宛先の場合）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Transit Gateway ルートテーブルでの優先順位（同じ宛先の場合）（表7）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"優先度"}</th><th scope="col">{"ルートの種類"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{"静的ルート"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"プレフィックスリスト参照ルート"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{"VPC アタッチメントの伝播ルート"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"Direct Connect ゲートウェイの伝播ルート"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{"Transit Gateway Connect の伝播ルート"}</td></tr><tr className={"even"}><td>{"6"}</td><td>{"Site-to-Site VPN の伝播ルート"}</td></tr><tr className={"odd"}><td>{"7"}</td><td>{"ピアリングアタッチメントのルート"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「静的ルートと伝播ルートが同じ宛先なら "}<strong>{"静的が勝つ"}</strong>{"」は頻出です。意図せず静的ルートが残っていて、BGP で学習した経路が使われない、というトラブルがよく出題されます。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表8）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{"可能な限り "}<strong>{"動的ルーティング（BGP）"}</strong>{" を使う"}</td><td>{"障害時に自動で経路が切り替わり、運用負荷が下がる"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" 静的ルートは「意図が明確なもの」だけに限定し、説明をタグに残す "}</td><td>{"古い静的ルートが動的経路を隠すのを防ぐ"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" ルートの変更前に Reachability Analyzer で影響を確認する（→ Part B） "}</td><td>{"本番での誤設定を防ぐ"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-2-step-2direct-connect-と-bgp-を管理する"} tabIndex={-1}>{" A-2. Step 2：Direct Connect と BGP を管理する "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" Direct Connect (DX) は、オンプレミスと AWS を "}<strong>{"専用線"}</strong>{" で結ぶ接続です。経路の交換には "}<strong>{"BGP"}</strong>{" を使うため、BGP の動きを理解していないと、遠回りの経路・片方向だけ通らない通信・突然のセッション切断といった問題を調べられません。 "}</p>

<h4>{"仕組み①：3種類の VIF"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み①：3種類の VIF（表9）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"VIF の種類"}</th><th scope="col">{"つなぐ先"}</th><th scope="col">{"典型的な用途"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"プライベート VIF"}</strong></td><td>{"VPC（VGW 経由）または Direct Connect ゲートウェイ"}</td><td>{"1つまたは少数の VPC との接続"}</td></tr><tr className={"even"}><td><strong>{"トランジット VIF"}</strong></td><td>{" Direct Connect ゲートウェイ経由で "}<strong>{"Transit Gateway"}</strong>{" または Cloud WAN "}</td><td>{"多数の VPC との接続"}</td></tr><tr className={"odd"}><td><strong>{"パブリック VIF"}</strong></td><td>{"AWS のパブリックエンドポイント（S3 など VPC 外のサービス）"}</td><td>{"S3 や DynamoDB への専用線経由アクセス"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-3" label={"仕組み①：3種類の VIF"} />

<h4>{"仕組み②：BGP による経路制御"}</h4>

<p>{" BGP では、オンプレミスと AWS がお互いに「自分の持つ経路」を広告します。次の3つを使い分けて経路を操作します。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み②：BGP による経路制御（表10）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"手段"}</th><th scope="col">{"向き"}</th><th scope="col">{"効果"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"ローカルプリファレンス用 BGP コミュニティ"}</strong></td><td>{"AWS から オンプレミスへ向かう通信"}</td><td>{"お客様が広告する経路に付けて、AWS 側の優先度を指定する"}</td></tr><tr className={"even"}><td><strong>{"AS_PATH プリペンド"}</strong></td><td>{"同上"}</td><td>{"経路を「遠く」見せて優先度を下げる"}</td></tr><tr className={"odd"}><td><strong>{"より具体的なプレフィックスの広告"}</strong></td><td>{"同上"}</td><td>{"最長プレフィックス一致で必ず優先させる"}</td></tr></tbody></table>{" "}</div>

<p>{"AWS が複数経路から1つを選ぶ順番は、おおむね次のとおりです。"}</p>

<Diagram id="diag-4" label={"仕組み②：BGP による経路制御"} />

<p><strong>{"ローカルプリファレンス用コミュニティ（Direct Connect）"}</strong></p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み②：BGP による経路制御（表11）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"コミュニティ"}</th><th scope="col">{"意味"}</th></tr></thead><tbody><tr className={"odd"}><td><code>{"7224:7100"}</code></td><td>{"低い優先度"}</td></tr><tr className={"even"}><td><code>{"7224:7200"}</code></td><td>{"中程度の優先度"}</td></tr><tr className={"odd"}><td><code>{"7224:7300"}</code></td><td>{"高い優先度"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"重要"}</strong>{": 「AWS →オンプレミス」の戻り経路は上の方法で制御しますが、「オンプレミス → AWS」の経路は "}<strong>{"お客様のルーターのポリシーが決めます"}</strong>{"。往路と復路は別々に設計する必要があります。 "}</p>{" "}</blockquote>

<h4>{"仕組み③：障害検知を速くする（BFD）"}</h4>

<p>{" BGP 単体の障害検知は、既定のホールドタイマーに依存し、数十秒〜数分かかります。"}<strong>{"BFD (Bidirectional Forwarding Detection)"}</strong>{" を有効にすると、秒単位で障害を検知してフェイルオーバーできます。AWS 側は BFD に対応していますが、"}<strong>{"お客様のルーター側でも有効化が必要"}</strong>{" です。 "}</p>

<h4>{"仕組み④：Direct Connect ゲートウェイ（DXGW）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み④：Direct Connect ゲートウェイ（DXGW）（表12）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"役割"}</td><td>{" 1つの専用線から、複数リージョンの VPC / TGW に到達できるようにする "}</td></tr><tr className={"even"}><td>{"TGW との関連付け"}</td><td>{" DXGW に TGW を関連付ける。DXGW と TGW の "}<strong>{"ASN は異なる値"}</strong>{" にする必要がある（同じだと関連付けに失敗する） "}</td></tr><tr className={"odd"}><td>{"許可プレフィックス"}</td><td>{" TGW 関連付け時に「AWS からオンプレミスへ広告するプレフィックス」を指定する "}</td></tr><tr className={"even"}><td>{"注意"}</td><td>{" トランジット VIF を使う DXGW では、プライベート VIF を併用できない "}</td></tr></tbody></table>{" "}</div>

<h4>{"ステップ手順：新しい拠点を DX で接続する流れ"}</h4>

<Diagram id="diag-5" label={"ステップ手順：新しい拠点を DX で接続する流れ"} />

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表13）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" 重要な通信は "}<strong>{"複数ロケーションに別々の DX 接続"}</strong>{" を用意する（最大の回復性モデル） "}</td><td>{"1か所の障害・メンテナンスでも通信が継続する"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" DX の "}<strong>{"バックアップとして Site-to-Site VPN"}</strong>{" を用意する "}</td><td>{"専用線が落ちても、インターネット経由で継続できる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td><strong>{"BFD を有効化"}</strong>{" する"}</td><td>{"障害検知を秒単位に短縮する"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"BGP セッションに "}<strong>{"MD5 認証"}</strong>{" を設定する"}</td><td>{"不正なピアからの経路注入を防ぐ"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{" 広告するルートを "}<strong>{"集約"}</strong>{" し、VIF のプレフィックス割り当て（既定 100）以内に収める "}</td><td>{" プライベート/トランジット VIF の上限を超えると BGP セッションが切れる（A-5 参照） "}</td></tr><tr className={"even"}><td>{"6"}</td><td>{" 経路制御は "}<strong>{"コミュニティ・AS_PATH・具体的プレフィックス"}</strong>{" を組み合わせ、設計書に残す "}</td><td>{"属人化を防ぎ、障害調査を速くする"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-3-step-3site-to-site-vpn-を管理する"} tabIndex={-1}>{" A-3. Step 3：Site-to-Site VPN を管理する "}</h3>

<h4>{"仕組み"}</h4>

<p>{" Site-to-Site VPN は、インターネット（または DX 上）に IPsec トンネルを作る接続です。1つの VPN 接続には "}<strong>{"2本のトンネル"}</strong>{"（異なる AZ のエンドポイント）が含まれます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み（表14）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"ルーティング"}</td><td><strong>{"動的（BGP）"}</strong>{" または "}<strong>{"静的"}</strong></td></tr><tr className={"even"}><td>{"AWS 側の終端"}</td><td>{"VGW、または Transit Gateway"}</td></tr><tr className={"odd"}><td>{"帯域"}</td><td>{" 標準トンネルで最大 "}<strong>{"1.25 Gbps"}</strong>{"。大容量帯域トンネル（Large Bandwidth Tunnel）なら最大 "}<strong>{"5 Gbps"}</strong>{" "}</td></tr><tr className={"even"}><td>{"帯域を増やす方法"}</td><td>{" Transit Gateway にアタッチした VPN は "}<strong>{"ECMP"}</strong>{" で複数トンネルを束ねる "}</td></tr><tr className={"odd"}><td>{"MTU"}</td><td>{" VPN トンネルの上限は "}<strong>{"1500 バイト"}</strong>{"。IPsec のオーバーヘッドで実効パケット MTU は "}<strong>{"1446 バイト"}</strong>{"（TCP MSS "}<strong>{"1406"}</strong>{"）。ジャンボフレーム不可 "}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-6" label={"仕組み"} />

<h4>{"動的 と 静的 の選び方"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"動的 と 静的 の選び方（表15）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"比較"}</th><th scope="col">{"動的 (BGP)"}</th><th scope="col">{"静的"}</th></tr></thead><tbody><tr className={"odd"}><td>{"障害時の自動切替"}</td><td>{"できる"}</td><td>{"できない（手動対応や別の仕組みが必要）"}</td></tr><tr className={"even"}><td>{"ルート変更の反映"}</td><td>{"自動"}</td><td>{"手動"}</td></tr><tr className={"odd"}><td>{"TGW での ECMP"}</td><td>{"使える"}</td><td>{"使えない"}</td></tr><tr className={"even"}><td>{"向いている場面"}</td><td><strong>{"基本はこちら"}</strong></td><td>{"BGP 非対応の機器を使う場合"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「VPN の帯域を超えてしまう → TGW + 動的ルーティング + "}<strong>{"ECMP"}</strong>{"」「1トンネルが 1.25 Gbps を超える → "}<strong>{"大容量帯域トンネル"}</strong>{"」が定番の答えです。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表16）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" "}<strong>{"2本のトンネルを両方有効"}</strong>{" にし、お客様側でも両方を設定する "}</td><td>{"片方のトンネルのメンテナンス中も通信が続く"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"動的ルーティング（BGP）を使う"}</td><td>{"切替が自動になる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{"大容量が必要なら TGW で ECMP を使う"}</td><td>{"帯域を水平に拡張できる"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"VPN 経路の MSS を適切に設定（クランプ）する"}</td><td>{"IPsec のオーバーヘッドによる断片化・欠落を防ぐ（→ Part B）"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{"DX と VPN を併用する場合、優先する経路を BGP 属性で明示する"}</td><td>{"意図しない経路への切替を防ぐ"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-4-step-4transit-gateway-で多数の接続をまとめる"} tabIndex={-1}>{" A-4. Step 4：Transit Gateway で多数の接続をまとめる "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" VPC やオンプレミス拠点が増えると、1対1でつなぐ方式は管理できなくなります。Transit Gateway (TGW) は "}<strong>{"ハブ&スポーク"}</strong>{" の中継点です。 "}</p>

<h4>{"仕組み"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組み（表17）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"概念"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"アタッチメント"}</strong></td><td>{"TGW への接続口（VPC、VPN、DXGW、ピアリング、Connect）"}</td></tr><tr className={"even"}><td><strong>{"関連付け (Association)"}</strong></td><td>{" アタッチメントが "}<strong>{"どのルートテーブルで経路を引くか"}</strong>{" を決める "}</td></tr><tr className={"odd"}><td><strong>{"伝播 (Propagation)"}</strong></td><td>{" アタッチメントの経路を "}<strong>{"どのルートテーブルに広告するか"}</strong>{" を決める "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"ポイント"}</strong>{": 「関連付け」は "}<strong>{"出ていく方向の引き先"}</strong>{"、「伝播」は "}<strong>{"入ってくる経路の広告先"}</strong>{" です。この2つを分けて考えると、ルートテーブルを分離した設計（本番と開発の分離など）が理解できます。 "}</p>{" "}</blockquote>

<Diagram id="diag-7" label={"仕組み"} />

<h4>{"重要な上限値（2026-10-16 時点の公式値）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"重要な上限値（2026-10-16 時点の公式値）（表18）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"値"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1つの TGW あたりのアタッチメント数"}</td><td>{"5,000"}</td></tr><tr className={"even"}><td>{"1つの TGW あたりのルートテーブル数"}</td><td>{"20"}</td></tr><tr className={"odd"}><td>{"1つの TGW の全ルートテーブル合計ルート数（動的+静的）"}</td><td>{"10,000"}</td></tr><tr className={"even"}><td>{"VPC アタッチメントの帯域（AZ あたり）"}</td><td>{"最大 100 Gbps"}</td></tr><tr className={"odd"}><td>{"VPC アタッチメントの PPS（AZ あたり）"}</td><td>{"最大 7,500,000"}</td></tr><tr className={"even"}><td>{"Connect ピア（GRE トンネル）の帯域"}</td><td>{" 最大 5 Gbps／1アタッチメントあたり最大 4 ピア（合計 20 Gbps） "}</td></tr><tr className={"odd"}><td>{"VPN で TGW → お客様機器へ広告するルート数"}</td><td>{"5,000"}</td></tr><tr className={"even"}><td>{"VPN で お客様機器 → TGW へ広告できる動的ルート数"}</td><td>{"1,000"}</td></tr><tr className={"odd"}><td>{"TGW 間ピアリングのアタッチメント数"}</td><td>{"50"}</td></tr><tr className={"even"}><td>{"マルチキャストドメイン数"}</td><td>{"20"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"注意"}</strong>{": 上限の中には引き上げ申請ができるものとできないものがあります。必ず "}<a href={"https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-quotas.html"}>{"Transit Gateway クォータ"}</a>{" の「調整可能」列を確認してください。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表19）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" VPC アタッチメントには "}<strong>{"AZ ごとに1つのサブネット"}</strong>{" を指定する（専用の小さなサブネット推奨） "}</td><td>{"各 AZ から TGW に到達できるようにし、管理しやすくする"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" 環境（本番／開発）の分離は "}<strong>{"ルートテーブルを分けて"}</strong>{" 実現する "}</td><td>{"関連付けと伝播で通信可否を制御できる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" "}<strong>{"ルート数を監視"}</strong>{" し、上限の手前でアラートを出す "}</td><td>{"上限超過時はルートが取り込まれず障害になる"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"オンプレミス経路は集約して広告する"}</td><td>{"ルート数と BGP の負荷を減らす"}</td></tr><tr className={"odd"}><td>{"5"}</td><td>{" アプライアンス（検査用）を経由する構成では "}<strong>{"アプライアンスモード"}</strong>{" を有効にする "}</td><td>{"往復で同じ AZ を通し、ステートフルな検査が崩れるのを防ぐ"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-5-step-5クォータ上限が運用に与える影響"} tabIndex={-1}>{" A-5. Step 5：クォータ（上限）が運用に与える影響 "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" 構成が正しくても、"}<strong>{"上限に達すると突然つながらなくなります"}</strong>{"。運用では「どの上限に近づいているか」を常に把握します。 "}</p>

<h4>{"Direct Connect の主な上限（公式値）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Direct Connect の主な上限（公式値）（表20）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"値"}</th><th scope="col">{"上限に達すると"}</th></tr></thead><tbody><tr className={"odd"}><td>{" プライベート/トランジット VIF で お客様 → AWS に広告できるルート数（BGP セッションあたり） "}</td><td>{"既定 "}<strong>{"100"}</strong>{"（IPv4・IPv6 それぞれ）。プレフィックス割り当てで最大 1,000 まで設定可能"}</td><td><strong>{"BGP セッションが Idle になり、切断される"}</strong></td></tr><tr className={"even"}><td>{"パブリック VIF で広告できるルート数"}</td><td>{"1,000（引き上げ不可）"}</td><td>{"同様にセッション異常"}</td></tr><tr className={"odd"}><td>{"ホスト型接続あたりの VIF 数"}</td><td>{"1"}</td><td>{"追加不可"}</td></tr><tr className={"even"}><td>{"専用接続あたりの VIF 数"}</td><td>{"プライベート/パブリック 50 + トランジット 4（合計 51）"}</td><td>{"合計 51 は引き上げ不可。トランジット VIF は SA/TAM に相談可能"}</td></tr><tr className={"odd"}><td>{"DXGW あたりの VIF 数（プライベート/トランジット）"}</td><td>{"30"}</td><td>{"追加不可"}</td></tr><tr className={"even"}><td>{"DXGW あたりの TGW 数"}</td><td>{"6"}</td><td>{"追加不可"}</td></tr><tr className={"odd"}><td>{"DXGW あたりの VGW 数"}</td><td>{"20"}</td><td>{"追加不可"}</td></tr><tr className={"even"}><td>{"TGW あたりの AWS → オンプレミスへ広告するプレフィックス数"}</td><td>{"200"}</td><td>{"超過分は広告されない"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「オンプレミスから 100 を超えるルートを広告したら BGP が切れた」→ まず VIF の "}<strong>{"プレフィックス割り当て"}</strong>{" を必要数まで増やします（CreatePrivateVirtualInterface / UpdateVirtualInterfaceAttributes で最大 1,000）。Service Quotas の申請ではありません。割り当てを増やせない場合に "}<strong>{"ルート集約"}</strong>{"（またはデフォルトルートの広告）を使います。 "}</p>{" "}</blockquote>

<h4>{"上限に備える運用の流れ"}</h4>

<Diagram id="diag-8" label={"上限に備える運用の流れ"} />

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表21）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td><strong>{"Service Quotas"}</strong>{" で使用率アラームを設定する"}</td><td>{"上限到達の前に気づける"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" 引き上げ不可の上限は "}<strong>{"設計段階"}</strong>{" で回避する（集約、構成分割） "}</td><td>{"後から変えられない"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{"新しい拠点・VPC を追加する前に、ルート数への影響を試算する"}</td><td>{"追加が原因の障害を防ぐ"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-6-step-6カスタムサービスへのプライベートアクセスを維持するprivatelink-と-vpc-ピアリング"} tabIndex={-1}>{" A-6. Step 6：カスタムサービスへのプライベートアクセスを維持する（PrivateLink と VPC ピアリング） "}</h3>

<h4>{"なぜ必要か"}</h4>

<p>{" 別の VPC やアカウントにあるサービスに、インターネットを経由せず安全にアクセスしたい場面は多くあります。主な手段は "}<strong>{"PrivateLink"}</strong>{" と "}<strong>{"VPC ピアリング"}</strong>{" です。 "}</p>

<h4>{"仕組みの違い"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"仕組みの違い（表22）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"比較"}</th><th scope="col"><strong>{"AWS PrivateLink"}</strong></th><th scope="col"><strong>{"VPC ピアリング"}</strong></th></tr></thead><tbody><tr className={"odd"}><td>{"つなぐ範囲"}</td><td><strong>{"特定のサービス"}</strong>{" だけを公開"}</td><td><strong>{"VPC 全体"}</strong>{"どうしを接続"}</td></tr><tr className={"even"}><td>{"方向"}</td><td>{"利用者 → サービス提供者（"}<strong>{"一方向"}</strong>{"）"}</td><td>{"双方向"}</td></tr><tr className={"odd"}><td>{"CIDR の重複"}</td><td><strong>{"重複していても利用可能"}</strong></td><td>{"重複していると "}<strong>{"作成できない"}</strong></td></tr><tr className={"even"}><td>{"推移的ルーティング"}</td><td>{"該当しない"}</td><td><strong>{"できない"}</strong>{"（A↔B、B↔C でも A↔C は不可）"}</td></tr><tr className={"odd"}><td>{"構成要素"}</td><td>{" サービス提供側: NLB または GWLB／利用側: インターフェイス VPC エンドポイント "}</td><td>{"ルートテーブルにピアリング接続を追加"}</td></tr><tr className={"even"}><td>{"規模の拡大"}</td><td>{"多数の利用者でも管理しやすい"}</td><td>{"接続数が増えると管理が煩雑"}</td></tr><tr className={"odd"}><td>{"向いている場面"}</td><td>{" SaaS 的な提供、"}<strong>{"CIDR 重複"}</strong>{"、公開範囲を絞りたい "}</td><td>{"少数の VPC を広く接続したい"}</td></tr></tbody></table>{" "}</div>

<h4>{"選択フロー"}</h4>

<Diagram id="diag-9" label={"選択フロー"} />

<h4>{"PrivateLink の運用ポイント"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"PrivateLink の運用ポイント（表23）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"可用性"}</td><td>{" インターフェイスエンドポイントは "}<strong>{"使用する AZ ごと"}</strong>{" にサブネットを指定する。複数 AZ に配置して冗長化する "}</td></tr><tr className={"even"}><td>{"承認"}</td><td>{" サービス提供側で、接続リクエストの "}<strong>{"承認"}</strong>{" を必須にできる "}</td></tr><tr className={"odd"}><td>{"DNS"}</td><td>{" プライベート DNS を有効にすると、既定のサービス名で エンドポイントに解決できる "}</td></tr><tr className={"even"}><td>{"セキュリティ"}</td><td>{" エンドポイントにセキュリティグループを関連付け、エンドポイントポリシーで操作範囲を絞る "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"補足"}</strong>{": PrivateLink は "}<strong>{"リージョンをまたいだ接続"}</strong>{" にも対応しています（クロスリージョン PrivateLink）。詳細・対応状況は公式ドキュメントで確認してください。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表24）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{"サービス提供は "}<strong>{"PrivateLink を優先"}</strong>{" する"}</td><td>{"公開範囲が最小で、CIDR 重複も問題にならない"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"ピアリング使用時は、"}<strong>{"CIDR 計画を最初に行う"}</strong></td><td>{"後から重複が見つかると作り直しになる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" ピアリングのルートテーブル更新を "}<strong>{"自動化（IaC）"}</strong>{" する "}</td><td>{"追加漏れによる片方向通信を防ぐ"}</td></tr><tr className={"even"}><td>{"4"}</td><td>{"エンドポイントは "}<strong>{"複数 AZ"}</strong>{" に作成する"}</td><td>{"AZ 障害に備える"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-7-step-7ルートテーブルで通信を正しく向ける伝播bgp集約cidr-重複"} tabIndex={-1}>{" A-7. Step 7：ルートテーブルで通信を正しく向ける（伝播・BGP・集約・CIDR 重複） "}</h3>

<h4>{"7.1 ルート伝播（Route Propagation）"}</h4>

<p>{" VGW または TGW を使う場合、オンプレミスから学習した経路を "}<strong>{"VPC ルートテーブルに自動で追加（伝播）"}</strong>{" できます。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"7.1 ルート伝播（Route Propagation）（表25）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"設定場所"}</td><td>{"VPC のルートテーブルで「ルート伝播」を有効化"}</td></tr><tr className={"even"}><td>{"伝播されるもの"}</td><td>{"VPN（静的/動的）や Direct Connect の経路"}</td></tr><tr className={"odd"}><td>{"手動のルート"}</td><td>{" 同じ宛先に手動ルートがあると "}<strong>{"手動（静的）が優先"}</strong>{" "}</td></tr><tr className={"even"}><td>{"TGW の場合"}</td><td>{" VPC ルートテーブルには "}<strong>{"手動で TGW 宛のルートを追加"}</strong>{" が必要（TGW 側のルートが VPC に自動伝播されることはない） "}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": TGW を使う場合、"}<strong>{"VPC のサブネットルートテーブルに TGW 宛のルートを追加し忘れる"}</strong>{" のが典型的な原因です。 "}</p>{" "}</blockquote>

<h4>{"7.2 ルート集約（Summarization）"}</h4>

<p>{"複数の細かい経路を、1つの広い経路にまとめます。"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"7.2 ルート集約（Summarization）（表26）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"集約前"}</th><th scope="col">{"集約後"}</th></tr></thead><tbody><tr className={"odd"}><td>{" "}<code>{"10.1.0.0/24"}</code>{", "}<code>{"10.1.1.0/24"}</code>{", "}<code>{"10.1.2.0/24"}</code>{", "}<code>{"10.1.3.0/24"}</code>{" "}</td><td><code>{"10.1.0.0/22"}</code></td></tr></tbody></table>{" "}</div>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"7.2 ルート集約（Summarization）（表27）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"メリット"}</th><th scope="col">{"注意点"}</th></tr></thead><tbody><tr className={"odd"}><td>{"ルート数が減る（上限回避）"}</td><td>{" 集約範囲に "}<strong>{"存在しない宛先"}</strong>{" が含まれると、通信が吸い込まれる（ブラックホール）可能性がある "}</td></tr><tr className={"even"}><td>{"BGP の更新が安定する"}</td><td>{" 集約後も、"}<strong>{"より具体的な経路で例外制御"}</strong>{" できるよう設計する "}</td></tr></tbody></table>{" "}</div>

<h4>{"7.3 CIDR 重複への対処"}</h4>

<Diagram id="diag-10" label={"7.3 CIDR 重複への対処"} />

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"7.3 CIDR 重複への対処（表28）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"手段"}</th><th scope="col">{"向いている場面"}</th><th scope="col">{"注意点"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"PrivateLink"}</strong></td><td>{"一方向のサービス利用"}</td><td>{"双方向通信には不向き"}</td></tr><tr className={"even"}><td><strong>{"プライベート NAT ゲートウェイ"}</strong></td><td>{"IP の変更が難しい既存環境"}</td><td>{"設計と運用が複雑になる"}</td></tr><tr className={"odd"}><td><strong>{"CIDR の再設計"}</strong></td><td>{"長期的に最善"}</td><td>{"移行作業が必要"}</td></tr><tr className={"even"}><td><strong>{"TGW のルートテーブル分離"}</strong></td><td>{"重複する VPC を互いに隔離する"}</td><td>{"重複 CIDR の VPC 間通信はできない"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"補足"}</strong>{": TGW に重複する CIDR の VPC をアタッチした場合、後からアタッチした VPC のルートは "}<strong>{"伝播されません"}</strong>{"。 "}</p>{" "}</blockquote>

<h4>{"7.4 ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"7.4 ベストプラクティス（表29）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" 組織全体で "}<strong>{"IP アドレス計画"}</strong>{" を管理する（Amazon VPC IPAM の活用） "}</td><td>{"重複を設計段階で防げる"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" オンプレミス側と AWS 側の "}<strong>{"経路広告の方針"}</strong>{" を文書化する "}</td><td>{"変更時の影響範囲が分かる"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" 集約は「"}<strong>{"広い範囲を広告し、特別な通信だけ具体的に広告"}</strong>{"」の方針にする "}</td><td>{"ルート数と制御性を両立できる"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-8-step-8aws-サービスへのプライベートパブリックアクセスを設定する"} tabIndex={-1}>{" A-8. Step 8：AWS サービスへのプライベート／パブリックアクセスを設定する "}</h3>

<h4>{"選択肢の比較"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"選択肢の比較（表30）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"アクセス方法"}</th><th scope="col">{"経路"}</th><th scope="col">{"主な対象"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"ゲートウェイ型 VPC エンドポイント"}</strong></td><td>{"VPC 内のルート（AWS ネットワーク内）"}</td><td>{"S3、DynamoDB"}</td><td>{" "}<strong>{"無料"}</strong>{"。ルートテーブルにエントリを追加して使う "}</td></tr><tr className={"even"}><td><strong>{"インターフェイス型 VPC エンドポイント"}</strong></td><td>{"VPC 内の ENI（PrivateLink）"}</td><td>{"多くの AWS サービス"}</td><td>{" 時間と処理量で課金。オンプレミスからも DX/VPN 経由で到達可能 "}</td></tr><tr className={"odd"}><td><strong>{"パブリック VIF（DX）"}</strong></td><td>{"専用線 → AWS パブリックエンドポイント"}</td><td>{"S3 など"}</td><td>{"インターネットを通さず専用線で到達"}</td></tr><tr className={"even"}><td><strong>{"インターネット経由（IGW/NAT）"}</strong></td><td>{"インターネット"}</td><td>{"パブリックエンドポイント"}</td><td>{"追加の保護（暗号化・認証）が必要"}</td></tr><tr className={"odd"}><td><strong>{"VPN（パブリック）"}</strong></td><td>{"インターネット上の IPsec"}</td><td>{"パブリックエンドポイント／VPC"}</td><td>{"暗号化。帯域に上限あり"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-11" label={"選択肢の比較"} />

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": 「"}<strong>{"オンプレミスから S3 へ、コストを抑え、かつインターネットを経由せず"}</strong>{"」は、一般に "}<strong>{"パブリック VIF"}</strong>{"、または "}<strong>{"プライベート VIF/VPN ＋ インターフェイス型 S3 エンドポイント"}</strong>{" が答えになります。要件（帯域・コスト・VPC 内の制御）を見て選びます。 "}</p>{" "}</blockquote>

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表31）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" S3/DynamoDB へは "}<strong>{"ゲートウェイ型エンドポイント"}</strong>{" を第一候補にする "}</td><td>{"無料で、NAT ゲートウェイのデータ処理料金も削減できる"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{"エンドポイントポリシーで "}<strong>{"アクセス先を絞る"}</strong></td><td>{"意図しないバケットへの流出を防ぐ"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{" パブリック VIF では "}<strong>{"広告するプレフィックスを必要最小限"}</strong>{" にする "}</td><td>{"不要な経路の流入を防ぐ"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-9-step-9リージョン間リージョン内の通信パターン"} tabIndex={-1}>{" A-9. Step 9：リージョン間・リージョン内の通信パターン "}</h3>

<h4>{"リージョン内（Intra-Region）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"リージョン内（Intra-Region）（表32）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"方式"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody><tr className={"odd"}><td>{"VPC ピアリング"}</td><td>{"低コスト・低遅延。推移的ルーティング不可"}</td></tr><tr className={"even"}><td>{"Transit Gateway"}</td><td>{"ハブ&スポーク。多数の VPC に適する"}</td></tr><tr className={"odd"}><td>{"PrivateLink"}</td><td>{"サービス単位の公開"}</td></tr><tr className={"even"}><td>{"VPC 共有（AWS RAM）"}</td><td>{"同一サブネットを複数アカウントで共有"}</td></tr></tbody></table>{" "}</div>

<h4>{"リージョン間（Inter-Region）"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"リージョン間（Inter-Region）（表33）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"方式"}</th><th scope="col">{"特徴"}</th><th scope="col">{"注意点"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"リージョン間 VPC ピアリング"}</strong></td><td>{"AWS のバックボーン上で暗号化される"}</td><td>{"ルートは手動、推移的ルーティング不可"}</td></tr><tr className={"even"}><td><strong>{"TGW ピアリング"}</strong></td><td>{"TGW どうしを接続"}</td><td>{"ルートは "}<strong>{"静的のみ"}</strong>{"（動的伝播なし）"}</td></tr><tr className={"odd"}><td><strong>{"AWS Cloud WAN"}</strong></td><td>{"ポリシーで広域ネットワークを管理"}</td><td>{"大規模・多リージョン向け"}</td></tr><tr className={"even"}><td><strong>{"PrivateLink（クロスリージョン）"}</strong></td><td>{"サービス単位の公開"}</td><td>{"対応状況を要確認"}</td></tr><tr className={"odd"}><td><strong>{"Global Accelerator / CloudFront"}</strong></td><td>{"ユーザーとリージョン間の最適化"}</td><td>{"用途がユーザー向けトラフィック中心"}</td></tr></tbody></table>{" "}</div>

<Diagram id="diag-12" label={"リージョン間（Inter-Region）"} />

<h4>{"ベストプラクティス"}</h4>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス（表34）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className={"odd"}><td>{"1"}</td><td>{" リージョン間は "}<strong>{"TGW ピアリング"}</strong>{" か "}<strong>{"Cloud WAN"}</strong>{" で一元管理する "}</td><td>{"VPC ピアリングを網目状に増やすと管理が破綻する"}</td></tr><tr className={"even"}><td>{"2"}</td><td>{" TGW ピアリングの静的ルートは "}<strong>{"IaC で管理"}</strong>{" する "}</td><td>{"変更漏れによる片方向通信を防ぐ"}</td></tr><tr className={"odd"}><td>{"3"}</td><td>{"帯域・遅延要件を事前に測定する"}</td><td>{"想定外の遅延による性能劣化を防ぐ"}</td></tr></tbody></table>{" "}</div>

<h3 id={"a-10-task-31-まとめ判断早見表"} tabIndex={-1}>{"A-10. Task 3.1 まとめ：判断早見表"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"A-10. Task 3.1 まとめ：判断早見表（表35）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"シナリオ"}</th><th scope="col">{"推奨する対応"}</th></tr></thead><tbody><tr className={"odd"}><td>{"専用線の障害検知を速くしたい"}</td><td><strong>{"BFD"}</strong>{" を有効化"}</td></tr><tr className={"even"}><td>{"専用線が落ちたら自動でバックアップへ切り替えたい"}</td><td><strong>{"DX + VPN"}</strong>{" の併用（BGP 動的）"}</td></tr><tr className={"odd"}><td>{"オンプレミスから 100 を超えるルートを広告したい"}</td><td><strong>{"プレフィックス割り当て"}</strong>{" の引き上げ（最大 1,000）。増やせない場合はルート集約またはデフォルトルート"}</td></tr><tr className={"even"}><td>{"VPN の帯域が足りない（TGW 利用）"}</td><td>{" "}<strong>{"ECMP"}</strong>{" で複数トンネルを束ねる／"}<strong>{"大容量帯域トンネル"}</strong>{" "}</td></tr><tr className={"odd"}><td>{"静的ルートと BGP の経路が競合する"}</td><td>{" "}<strong>{"静的ルートが優先"}</strong>{" される点を確認し、不要な静的ルートを削除 "}</td></tr><tr className={"even"}><td>{"CIDR が重複した VPC のサービスを使いたい"}</td><td><strong>{"PrivateLink"}</strong></td></tr><tr className={"odd"}><td>{"多数の VPC とオンプレミスを接続したい"}</td><td><strong>{"Transit Gateway"}</strong>{"（DXGW + トランジット VIF）"}</td></tr><tr className={"even"}><td>{"TGW 経由でも VPC 側から通じない"}</td><td>{" VPC のルートテーブルに "}<strong>{"TGW 宛のルート"}</strong>{" があるか確認 "}</td></tr><tr className={"odd"}><td>{"異なるリージョンの TGW を接続したい"}</td><td><strong>{"TGW ピアリング"}</strong>{"（静的ルート）"}</td></tr></tbody></table>{" "}</div>
</div>;}
