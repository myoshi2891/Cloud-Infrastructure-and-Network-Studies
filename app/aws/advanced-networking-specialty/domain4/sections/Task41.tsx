import { Diagram } from '../Diagram';
/** 原本のtask1区画を全文保持。 */
export default function Task41(){return <div className="guide-part" data-part="task1">
<h2 id="task-4-1" tabIndex={-1}>{"Task 4.1 ネットワーク機能の実装・保守(セキュリティ/コンプライアンス要件)"}</h2>
{"\n"}
<p><a id="p2"></a></p>
{"\n"}
<h2 id="sec-7" tabIndex={-1}>{"2. 脅威モデルと一般的な脅威"}</h2>
{"\n"}
<h3 id="s2-1" tabIndex={-1}>{"2-1. 脅威モデリングとは"}</h3>
{"\n"}
<p>{"「"}<strong>{"何を守るか → どこから攻撃されうるか → どう防ぐか"}</strong>{"」をアーキテクチャ図に沿って洗い出す手法です。試験の Skills in に「Developing a threat model and identifying appropriate mitigation strategies for a given network architecture」が含まれています。"}</p>
{"\n"}
<Diagram id="diag-3" label={"2-1. 脅威モデリングとは"} />
{"\n"}
<h3 id="s2-2" tabIndex={-1}>{"2-2. STRIDE と AWS の対策マッピング"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2-2. STRIDE と AWS の対策マッピング（表5）"}><table><thead><tr className="header"><th scope="col">{"脅威(STRIDE)"}</th><th scope="col">{"ネットワークでの例"}</th><th scope="col">{"主な AWS の緩和策"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"S"}</strong>{"poofing(なりすまし)"}</td><td>{"偽の DNS 応答、偽サーバ"}</td><td>{"DNSSEC、ACM 証明書、mTLS、IAM 認証"}</td></tr><tr className="even"><td><strong>{"T"}</strong>{"ampering(改ざん)"}</td><td>{"通信内容の書き換え"}</td><td>{"TLS / IPsec、CloudTrail ログ整合性検証"}</td></tr><tr className="odd"><td><strong>{"R"}</strong>{"epudiation(否認)"}</td><td>{"操作の証拠がない"}</td><td>{"CloudTrail、Flow Logs、WAF ログ"}</td></tr><tr className="even"><td><strong>{"I"}</strong>{"nformation disclosure(情報漏えい)"}</td><td>{"盗聴、データ持ち出し"}</td><td>{"暗号化、Network Firewall の egress 制御、VPC エンドポイントポリシー"}</td></tr><tr className="odd"><td><strong>{"D"}</strong>{"enial of service(サービス拒否)"}</td><td>{"DDoS、大量リクエスト"}</td><td>{"Shield、WAF レートベースルール、CloudFront、Auto Scaling"}</td></tr><tr className="even"><td><strong>{"E"}</strong>{"levation of privilege(権限昇格)"}</td><td>{"侵害後の横展開"}</td><td>{"SG の最小化、サブネット分離、GuardDuty、IAM 最小権限"}</td></tr></tbody></table></div>
{"\n"}
<h3 id="s2-3" tabIndex={-1}>{"2-3. 一般的なネットワーク脅威と対策"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"2-3. 一般的なネットワーク脅威と対策（表6）"}><table><thead><tr className="header"><th scope="col">{"脅威"}</th><th scope="col">{"説明"}</th><th scope="col">{"対策サービス"}</th></tr></thead><tbody><tr className="odd"><td>{"ボリューメトリック DDoS(L3/L4)"}</td><td>{"UDP フラッド、SYN フラッド、反射増幅"}</td><td><strong>{"Shield Standard/Advanced"}</strong>{"、CloudFront、Global Accelerator"}</td></tr><tr className="even"><td>{"アプリケーション層 DDoS(L7)"}</td><td>{"HTTP フラッド"}</td><td><strong>{"WAF"}</strong>{" レートベースルール、Shield Advanced の自動 L7 緩和"}</td></tr><tr className="odd"><td>{"SQL インジェクション / XSS"}</td><td>{"アプリ脆弱性の悪用"}</td><td><strong>{"WAF"}</strong>{" マネージドルール(Core、SQLi)"}</td></tr><tr className="even"><td>{"ボット / 認証情報の総当たり"}</td><td>{"スクレイピング、ログイン攻撃"}</td><td>{"WAF Bot Control、ATP(アカウント乗っ取り防止)"}</td></tr><tr className="odd"><td>{"データ持ち出し(Exfiltration)"}</td><td>{"侵害ホストが外部へ送信"}</td><td><strong>{"Network Firewall"}</strong>{"(ドメイン許可リスト)、DNS Firewall、VPC エンドポイントポリシー"}</td></tr><tr className="even"><td>{"横展開(Lateral movement)"}</td><td>{"侵害後に内部へ拡大"}</td><td>{"SG の参照指定、サブネット分離、TGW ルートテーブル分離"}</td></tr><tr className="odd"><td>{"DNS トンネリング / DGA"}</td><td>{"DNS を悪用した C2 通信"}</td><td><strong>{"Route 53 Resolver DNS Firewall(Advanced)"}</strong>{"、GuardDuty"}</td></tr><tr className="even"><td>{"中間者攻撃(MITM)"}</td><td>{"経路上での盗聴・改ざん"}</td><td>{"TLS、IPsec、MACsec、DNSSEC"}</td></tr><tr className="odd"><td>{"ポートスキャン・偵察"}</td><td>{"開いているポートの探索"}</td><td>{"SG/NACL、GuardDuty、Network Firewall IPS"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"AWS DDoS Resiliency ホワイトペーパー: "}<a href="https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/aws-best-practices-ddos-resiliency.html">{"https://docs.aws.amazon.com/whitepapers/latest/aws-best-practices-ddos-resiliency/aws-best-practices-ddos-resiliency.html"}</a></li>{"\n"}<li>{"GuardDuty の検出タイプ: "}<a href="https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html">{"https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_finding-types-active.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p3"></a></p>
{"\n"}
<h2 id="sec-11" tabIndex={-1}>{"3. インバウンド通信の保護(AWS WAF / AWS Shield / Network Firewall)"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Skills"}</strong>{": Securing inbound traffic flows into AWS (for example, AWS WAF, AWS Shield, Network Firewall)"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s3-1" tabIndex={-1}>{"3-1. 全体像: 外から内へ、層ごとに守る"}</h3>
{"\n"}
<Diagram id="diag-4" label={"3-1. 全体像: 外から内へ、層ごとに守る"} />
{"\n"}
<h3 id="s3-2" tabIndex={-1}>{"3-2. AWS Shield(DDoS 対策)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3-2. AWS Shield(DDoS 対策)（表7）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"Shield Standard"}</th><th scope="col">{"Shield Advanced"}</th></tr></thead><tbody><tr className="odd"><td>{"料金"}</td><td><strong>{"無料・全顧客に自動適用"}</strong></td><td>{"有料(月額固定 + データ転送料、1 年契約)"}</td></tr><tr className="even"><td>{"保護レイヤ"}</td><td>{"L3 / L4"}</td><td>{"L3 / L4 / "}<strong>{"L7"}</strong>{"(WAF と併用)"}</td></tr><tr className="odd"><td>{"対象"}</td><td>{"CloudFront・Route 53 などの AWS エッジ"}</td><td>{"CloudFront、Route 53、Global Accelerator、ALB、CLB、Elastic IP(EC2/NLB)"}</td></tr><tr className="even"><td>{"追加機能"}</td><td>{"なし"}</td><td>{"高度な検出、"}<strong>{"SRT(Shield Response Team)"}</strong>{" による支援、"}<strong>{"DDoS コスト保護"}</strong>{"、プロアクティブ・エンゲージメント、ヘルスベース検出、"}<strong>{"自動アプリケーション層 DDoS 緩和"}</strong></td></tr></tbody></table></div>
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ul>{"\n"}<li>{"DDoS 耐性のある構成にする: "}<strong>{"CloudFront / Route 53 / Global Accelerator などエッジ経由"}</strong>{"にし、オリジンを直接公開しない(CloudFront のマネージドプレフィックスリストを使い ALB の SG を CloudFront からのみに絞る、またはカスタムヘッダーで検証)。"}</li>{"\n"}<li>{"Shield Advanced は "}<strong>{"Route 53 ヘルスチェック"}</strong>{" と関連付けるとヘルスベース検出が有効になり、検知が早くなる。"}</li>{"\n"}<li>{"重要な環境では "}<strong>{"Auto Scaling"}</strong>{" と組み合わせてスケールで吸収し、DDoS コスト保護も活用する。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<h3 id="s3-3" tabIndex={-1}>{"3-3. AWS WAF(L7 のウェブ攻撃対策)"}</h3>
{"\n"}
<p><strong>{"保護対象にできるリソース"}</strong>{": CloudFront、ALB、API Gateway(REST API)、AppSync、Cognito ユーザープール、App Runner、Verified Access など。"}<strong>{"NLB には直接アタッチできません"}</strong>{"(試験頻出)。"}</p>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3-3. AWS WAF(L7 のウェブ攻撃対策)（表8）"}><table><thead><tr className="header"><th scope="col">{"概念"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Web ACL"}</strong></td><td>{"ルールの集合。リソースに関連付ける。既定アクション(Allow / Block)を持つ"}</td></tr><tr className="even"><td><strong>{"ルール / ルールグループ"}</strong></td><td>{"条件(IP、国、ヘッダー、URI、ボディ、レート等)とアクション"}</td></tr><tr className="odd"><td><strong>{"アクション"}</strong></td><td>{"Allow、Block、"}<strong>{"Count"}</strong>{"(様子見)、CAPTCHA、Challenge"}</td></tr><tr className="even"><td><strong>{"マネージドルールグループ"}</strong></td><td>{"AWS 提供(Core rule set、Known bad inputs、SQL database、Amazon IP reputation list、Anonymous IP list、Bot Control、ATP など)"}</td></tr><tr className="odd"><td><strong>{"レートベースルール"}</strong></td><td>{"送信元ごとのリクエスト数が閾値を超えたら Block(L7 DDoS・総当たり対策)"}</td></tr><tr className="even"><td><strong>{"WCU(Web ACL capacity unit)"}</strong></td><td>{"ルールの複雑さを示す容量。Web ACL ごとに上限あり"}</td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-5" label={"3-3. AWS WAF(L7 のウェブ攻撃対策)"} />
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ol>{"\n"}<li>{"新しいルールはまず "}<strong>{"Count モード"}</strong>{" で導入し、ログで誤検知を確認してから Block に切り替える。"}</li>{"\n"}<li><strong>{"AWS マネージドルール"}</strong>{" を基本とし、独自ルールで補う。"}</li>{"\n"}<li><strong>{"レートベースルール"}</strong>{" をログイン・API エンドポイントに適用する。"}</li>{"\n"}<li><strong>{"WAF ログを有効化"}</strong>{"(送信先は CloudWatch Logs / S3 / Firehose。"}<strong>{"宛先名は "}<code>{"aws-waf-logs-"}</code>{" で始める必要あり"}</strong>{")。機密ヘッダーは "}<strong>{"フィールド編集(redaction)"}</strong>{" で隠す。"}</li>{"\n"}<li>{"CloudFront に使う Web ACL は "}<strong>{"スコープ CLOUDFRONT(米国東部バージニア北部リージョンで作成)"}</strong>{"。ALB 用は "}<strong>{"REGIONAL"}</strong>{"(ALB と同じリージョン)。"}</li>{"\n"}<li>{"複数アカウントは "}<strong>{"Firewall Manager"}</strong>{" の WAF ポリシーで一括適用。"}</li>{"\n"}</ol>{"\n"}</div></div>
{"\n"}
<div className="code-sample" data-lang="bash"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"3-3. AWS WAF(L7 のウェブ攻撃対策)（コード1）"}>
<div className="code-line"><span className="c1">{"# 例: Web ACL に ALB を関連付ける(AWS CLI)"}</span></div>
<div className="code-line">{"aws"}<span className="w">{" "}</span>{"wafv2"}<span className="w">{" "}</span>{"associate-web-acl"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--web-acl-arn"}<span className="w">{" "}</span>{"arn:aws:wafv2:ap-northeast-1:111122223333:regional/webacl/my-acl/xxxx"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--resource-arn"}<span className="w">{" "}</span>{"arn:aws:elasticloadbalancing:ap-northeast-1:111122223333:loadbalancer/app/my-alb/yyyy"}</div>
</div></div>{"\n"}</div>
{"\n"}
<h3 id="s3-4" tabIndex={-1}>{"3-4. AWS Network Firewall(VPC の入口・出口・VPC 間を検査)"}</h3>
{"\n"}
<p><strong>{"マネージド型のステートフル ファイアウォール + IPS"}</strong>{"。VPC 内の "}<strong>{"ファイアウォールサブネット"}</strong>{" に "}<strong>{"ファイアウォールエンドポイント"}</strong>{" を作り、ルートテーブルでそこへ通信を向けて検査します。"}</p>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3-4. AWS Network Firewall(VPC の入口・出口・VPC 間を検査)（表9）"}><table><thead><tr className="header"><th scope="col">{"コンポーネント"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"ファイアウォール"}</strong></td><td>{"VPC とサブネット(AZ ごと)に紐付く実体。エンドポイントが作られる"}</td></tr><tr className="even"><td><strong>{"ファイアウォールポリシー"}</strong></td><td>{"ルールグループの集合と既定動作を定義"}</td></tr><tr className="odd"><td><strong>{"ステートレスルールグループ"}</strong></td><td>{"パケット単位で評価(pass / drop / "}<strong>{"forward to stateful"}</strong>{")"}</td></tr><tr className="even"><td><strong>{"ステートフルルールグループ"}</strong></td><td>{"接続単位で評価。"}<strong>{"Suricata 互換"}</strong>{"ルール、ドメインリスト(HTTP ホスト/TLS SNI)、標準 5-tuple ルール、AWS マネージドの脅威シグネチャ"}</td></tr><tr className="odd"><td><strong>{"ルール評価順"}</strong></td><td><strong>{"Strict order"}</strong>{"(定義した優先度どおり。"}<strong>{"既定アクション drop を設定可能"}</strong>{")と Action order(pass → drop → reject → alert)"}</td></tr><tr className="even"><td><strong>{"TLS インスペクション"}</strong></td><td>{"TLS を復号して検査し、再暗号化(ACM の証明書を使用)"}</td></tr><tr className="odd"><td><strong>{"ログ"}</strong></td><td>{"alert / flow / TLS の 3 種類を S3・CloudWatch Logs・Firehose へ"}</td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-6" label={"3-4. AWS Network Firewall(VPC の入口・出口・VPC 間を検査)"} />
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong>{"(AWS 公式ベストプラクティスガイドの要旨)"}</div>{"\n"}<ul>{"\n"}<li><strong>{"ステートレスの既定アクションは「Forward to stateful rule groups」"}</strong>{" にし、フィルタリングはステートフルエンジンに集約する(ステートレスの pass ルールがあると、ステートフル検査をすり抜けてしまうため)。"}</li>{"\n"}<li><strong>{"Strict rule order"}</strong>{" を使い、ドメイン許可リスト方式では "}<strong>{"ステートフル既定アクションを Drop established"}</strong>{" にする(TCP ハンドシェイクを通して TLS SNI を検査できるようにするため。Drop all では SNI を検査する前にハンドシェイクが破棄される)。"}</li>{"\n"}<li>{"出口制御は "}<strong>{"ドメインリスト(許可リスト)"}</strong>{" で HTTPS の SNI を検査。"}</li>{"\n"}<li>{"一般的な脆弱性対策に "}<strong>{"AWS マネージドルールグループ"}</strong>{"(脅威シグネチャ)を併用。"}</li>{"\n"}<li><strong>{"AZ ごとに 1 つ以上のエンドポイント"}</strong>{" を配置し、可用性を確保(AZ 間で非対称ルーティングにならないよう AZ 内で完結させる)。"}</li>{"\n"}<li>{"ログ(alert / flow)を必ず有効化する。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<div className="code-sample" data-lang="bash"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"3-4. AWS Network Firewall(VPC の入口・出口・VPC 間を検査)（コード2）"}>
<div className="code-line"><span className="c1">{"# 例: 許可ドメインだけを通すルールグループ(ドメインリスト型・許可リスト)"}</span></div>
<div className="code-line">{"aws"}<span className="w">{" "}</span>{"network-firewall"}<span className="w">{" "}</span>{"create-rule-group"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--rule-group-name"}<span className="w">{" "}</span>{"allow-approved-domains"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--type"}<span className="w">{" "}</span>{"STATEFUL"}<span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--capacity"}<span className="w">{" "}</span><span className="m">{"100"}</span><span className="w">{" "}</span><span className="se">{"\\"}</span></div>
<div className="code-line"><span className="w">{"  "}</span>{"--rule-group"}<span className="w">{" "}</span><span className="s1">{"'{"}</span></div>
<div className="code-line"><span className="s1">{"    \"RulesSource\": {"}</span></div>
<div className="code-line"><span className="s1">{"      \"RulesSourceList\": {"}</span></div>
<div className="code-line"><span className="s1">{"        \"Targets\": [\".amazonaws.com\", \".example.com\"],"}</span></div>
<div className="code-line"><span className="s1">{"        \"TargetTypes\": [\"HTTP_HOST\", \"TLS_SNI\"],"}</span></div>
<div className="code-line"><span className="s1">{"        \"GeneratedRulesType\": \"ALLOWLIST\""}</span></div>
<div className="code-line"><span className="s1">{"      }"}</span></div>
<div className="code-line"><span className="s1">{"    },"}</span></div>
<div className="code-line"><span className="s1">{"    \"StatefulRuleOptions\": { \"RuleOrder\": \"STRICT_ORDER\" }"}</span></div>
<div className="code-line"><span className="s1">{"  }'"}</span></div>
</div></div>{"\n"}</div>
{"\n"}
<h3 id="s3-5" tabIndex={-1}>{"3-5. Network Firewall でインバウンド通信を検査する構成(ingress routing)"}</h3>
{"\n"}
<p>{"インターネットからの通信を "}<strong>{"IGW のルートテーブル(エッジ関連付け)"}</strong>{" で一度ファイアウォールエンドポイントに通し、その後ワークロードへ届けます。"}</p>
{"\n"}
<Diagram id="diag-7" label={"3-5. Network Firewall でインバウンド通信を検査する構成(ingress routing)"} />
{"\n"}
<h3 id="s3-6" tabIndex={-1}>{"3-6. Gateway Load Balancer(GWLB)で第三者アプライアンスを使う"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3-6. Gateway Load Balancer(GWLB)で第三者アプライアンスを使う（表10）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"説明"}</th></tr></thead><tbody><tr className="odd"><td>{"役割"}</td><td>{"サードパーティ製ファイアウォール/IPS を "}<strong>{"透過的に"}</strong>{" 挿入し、スケール・冗長化する"}</td></tr><tr className="even"><td>{"プロトコル"}</td><td><strong>{"GENEVE(UDP 6081)"}</strong>{" でパケットをカプセル化してアプライアンスへ転送"}</td></tr><tr className="odd"><td>{"接続点"}</td><td><strong>{"GWLB エンドポイント(GWLBe)"}</strong>{" をルートテーブルのターゲットに指定"}</td></tr><tr className="even"><td>{"特徴"}</td><td>{"フロー単位で同じアプライアンスに固定(フロースティッキネス)。ヘルスチェックで障害アプライアンスを除外"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"ベストプラクティス"}</strong>{": 複数 AZ にアプライアンスを配置し、"}<strong>{"クロスゾーン負荷分散"}</strong>{"と "}<strong>{"TGW のアプライアンスモード"}</strong>{"(後述)で "}<strong>{"行きと戻りを同じアプライアンスに通す(対称ルーティング)"}</strong>{"。"}</p>
{"\n"}
<h3 id="s3-7" tabIndex={-1}>{"3-7. 選択の目安(インバウンド)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"3-7. 選択の目安(インバウンド)（表11）"}><table><thead><tr className="header"><th scope="col">{"要件"}</th><th scope="col">{"選ぶもの"}</th></tr></thead><tbody><tr className="odd"><td>{"SQLi/XSS/ボット対策など HTTP レベルの防御"}</td><td><strong>{"WAF"}</strong>{"(CloudFront or ALB に)"}</td></tr><tr className="even"><td>{"L3/L4 の DDoS を自動で防ぎたい"}</td><td><strong>{"Shield Standard"}</strong>{"(自動)"}</td></tr><tr className="odd"><td>{"高度な DDoS 対策・コスト保護・専門チーム支援"}</td><td><strong>{"Shield Advanced"}</strong></td></tr><tr className="even"><td>{"非 HTTP(TCP/UDP)も含めた VPC 入口での IPS/ドメイン/ポート検査"}</td><td><strong>{"Network Firewall"}</strong></td></tr><tr className="odd"><td>{"既存の他社製 NGFW を使いたい"}</td><td><strong>{"Gateway Load Balancer"}</strong></td></tr><tr className="even"><td>{"グローバルにアクセスを加速しつつ DDoS 対策"}</td><td><strong>{"Global Accelerator + Shield"}</strong></td></tr></tbody></table></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"AWS WAF 開発者ガイド: "}<a href="https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html">{"https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html"}</a></li>{"\n"}<li>{"AWS Shield 開発者ガイド: "}<a href="https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html">{"https://docs.aws.amazon.com/waf/latest/developerguide/shield-chapter.html"}</a></li>{"\n"}<li>{"Network Firewall 開発者ガイド: "}<a href="https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html">{"https://docs.aws.amazon.com/network-firewall/latest/developerguide/what-is-aws-network-firewall.html"}</a></li>{"\n"}<li>{"Network Firewall ルール評価順: "}<a href="https://docs.aws.amazon.com/network-firewall/latest/developerguide/suricata-rule-evaluation-order.html">{"https://docs.aws.amazon.com/network-firewall/latest/developerguide/suricata-rule-evaluation-order.html"}</a></li>{"\n"}<li>{"Network Firewall ベストプラクティス(GitHub 公式): "}<a href="https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/">{"https://aws.github.io/aws-security-services-best-practices/guides/network-firewall/"}</a></li>{"\n"}<li>{"Gateway Load Balancer: "}<a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html">{"https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p4"></a></p>
{"\n"}
<h2 id="sec-19" tabIndex={-1}>{"4. アウトバウンド通信の保護"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Skills"}</strong>{": Securing outbound traffic flows from AWS (for example, Network Firewall, proxies, Gateway Load Balancers)"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s4-1" tabIndex={-1}>{"4-1. なぜ出口制御が必要か"}</h3>
{"\n"}
<p>{"侵害されたホストは、"}<strong>{"外部の C2 サーバーへ通信したりデータを持ち出したり"}</strong>{" します。入口だけでなく "}<strong>{"出口を「許可リスト方式」で絞る"}</strong>{" ことが、情報漏えい対策の要です。"}</p>
{"\n"}
<h3 id="s4-2" tabIndex={-1}>{"4-2. 出口制御の選択肢"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4-2. 出口制御の選択肢（表12）"}><table><thead><tr className="header"><th scope="col">{"手段"}</th><th scope="col">{"検査レイヤ"}</th><th scope="col">{"特徴"}</th><th scope="col">{"向いているケース"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Network Firewall"}</strong></td><td>{"L3〜L7(SNI / HTTP ホスト、Suricata)"}</td><td>{"マネージド。ドメイン許可リスト、IPS、TLS 検査"}</td><td>{"標準的な出口フィルタリング"}</td></tr><tr className="even"><td><strong>{"プロキシ(Squid 等)"}</strong></td><td>{"L7(HTTP/HTTPS)"}</td><td>{"EC2 / コンテナで自前運用。URL・認証・キャッシュ"}</td><td>{"詳細な URL 制御、ユーザー認証が必要"}</td></tr><tr className="odd"><td><strong>{"GWLB + 第三者 NGFW"}</strong></td><td>{"L3〜L7(製品依存)"}</td><td>{"既存製品の機能・ポリシーを継続利用"}</td><td>{"既存セキュリティ製品の標準化"}</td></tr><tr className="even"><td><strong>{"Route 53 Resolver DNS Firewall"}</strong></td><td>{"DNS"}</td><td>{"悪性・不許可ドメインの名前解決をブロック"}</td><td>{"DNS 経由の持ち出し・C2 の遮断"}</td></tr><tr className="odd"><td><strong>{"VPC エンドポイント + エンドポイントポリシー"}</strong></td><td>{"AWS API"}</td><td>{"インターネットを経由せず AWS サービスへ。許可する操作・リソースを限定"}</td><td>{"AWS サービス向け通信"}</td></tr><tr className="even"><td><strong>{"NAT ゲートウェイ"}</strong></td><td>{"L3/L4"}</td><td>{"送信元 NAT のみ("}<strong>{"フィルタ機能なし"}</strong>{")"}</td><td>{"単に出口を提供する(制御は他で)"}</td></tr></tbody></table></div>
{"\n"}
<blockquote>{"\n"}<p><strong>{"試験ポイント"}</strong>{": NAT ゲートウェイ自体には "}<strong>{"ドメインやコンテンツでの制御機能がありません"}</strong>{"。「特定のドメインだけ許可」→ "}<strong>{"Network Firewall(ドメインリスト)またはプロキシ"}</strong>{" が答えになります。"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s4-3" tabIndex={-1}>{"4-3. 集中型の出口(Centralized egress)"}</h3>
{"\n"}
<p>{"複数の VPC(スポーク)の出口を "}<strong>{"検査用 VPC"}</strong>{" に集約します。"}</p>
{"\n"}
<Diagram id="diag-8" label={"4-3. 集中型の出口(Centralized egress)"} />
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ul>{"\n"}<li><strong>{"AZ ごとに"}</strong>{" ファイアウォールエンドポイントと NAT ゲートウェイを置き、"}<strong>{"AZ をまたぐ通信を避ける"}</strong>{"(コストと可用性)。"}</li>{"\n"}<li>{"TGW の VPC アタッチメントで "}<strong>{"アプライアンスモード(Appliance Mode)を有効化"}</strong>{" し、行きと戻りを同じ AZ のファイアウォールに通す("}<strong>{"対称ルーティング"}</strong>{")。"}</li>{"\n"}<li>{"ファイアウォールポリシーは "}<strong>{"「許可ドメインのみ」+ ステートフル既定アクション「Drop established」"}</strong>{"。"}</li>{"\n"}<li>{"出口の許可ドメインは "}<strong>{"ログ(alert/flow)で実際の利用を把握してから"}</strong>{" 絞り込む。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<h3 id="s4-4" tabIndex={-1}>{"4-4. DNS による持ち出しを防ぐ"}</h3>
{"\n"}
<Diagram id="diag-9" label={"4-4. DNS による持ち出しを防ぐ"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4-4. DNS による持ち出しを防ぐ（表13）"}><table><thead><tr className="header"><th scope="col">{"設定項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"ドメインリスト"}</td><td>{"自作リスト、または "}<strong>{"AWS マネージドドメインリスト"}</strong>{"(マルウェア、ボットネット C2 など)"}</td></tr><tr className="even"><td>{"アクション"}</td><td>{"ALLOW / BLOCK(応答は NODATA・NXDOMAIN・OVERRIDE) / ALERT"}</td></tr><tr className="odd"><td>{"フェイルクローズ / フェイルオープン"}</td><td>{"DNS Firewall が判定できない場合に "}<strong>{"名前解決を止める(クローズ)か通す(オープン)か"}</strong>{" を VPC ごとに選択"}</td></tr><tr className="even"><td>{"DNS Firewall Advanced"}</td><td>{"DGA(ドメイン生成アルゴリズム)や DNS トンネリングを "}<strong>{"検出してブロック"}</strong></td></tr><tr className="odd"><td>{"管理"}</td><td><strong>{"Firewall Manager"}</strong>{" で組織全体に適用可能"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"ベストプラクティス"}</strong>{": 外部 DNS リゾルバー(8.8.8.8 など)へのポート 53 通信を "}<strong>{"ネットワーク ACL や Network Firewall で拒否"}</strong>{" し、必ず Route 53 Resolver を経由させる。そうしないと DNS Firewall をすり抜けられます。"}</p>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"Network Firewall の導入パターン(AWS ブログ): "}<a href="https://aws.amazon.com/blogs/networking-and-content-delivery/deployment-models-for-aws-network-firewall/">{"https://aws.amazon.com/blogs/networking-and-content-delivery/deployment-models-for-aws-network-firewall/"}</a></li>{"\n"}<li>{"Route 53 Resolver DNS Firewall: "}<a href="https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html">{"https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resolver-dns-firewall.html"}</a></li>{"\n"}<li>{"Transit Gateway アプライアンスモード: "}<a href="https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-appliance-scenario.html">{"https://docs.aws.amazon.com/vpc/latest/tgw/transit-gateway-appliance-scenario.html"}</a></li>{"\n"}<li>{"集中型の出口(Whitepaper): "}<a href="https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/centralized-egress-to-internet.html">{"https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/centralized-egress-to-internet.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p5"></a></p>
{"\n"}
<h2 id="sec-24" tabIndex={-1}>{"5. VPC 間・VPC 内通信の保護"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Skills"}</strong>{": Securing inter-VPC traffic within an account or across multiple accounts (for example, security groups, network ACLs, VPC endpoint policies)"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s5-1" tabIndex={-1}>{"5-1. セキュリティグループ(SG)とネットワーク ACL(NACL)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5-1. セキュリティグループ(SG)とネットワーク ACL(NACL)（表14）"}><table><thead><tr className="header"><th scope="col">{"比較項目"}</th><th scope="col">{"セキュリティグループ"}</th><th scope="col">{"ネットワーク ACL"}</th></tr></thead><tbody><tr className="odd"><td>{"適用単位"}</td><td><strong>{"ENI(インスタンス)"}</strong></td><td><strong>{"サブネット"}</strong></td></tr><tr className="even"><td>{"状態"}</td><td><strong>{"ステートフル"}</strong>{"(戻り通信は自動許可)"}</td><td><strong>{"ステートレス"}</strong>{"(戻り通信も明示的に許可)"}</td></tr><tr className="odd"><td>{"ルール種別"}</td><td><strong>{"許可のみ"}</strong>{"(拒否ルールなし)"}</td><td><strong>{"許可と拒否"}</strong></td></tr><tr className="even"><td>{"評価"}</td><td>{"全ルールを評価"}</td><td><strong>{"ルール番号の小さい順"}</strong>{"に評価し、最初に一致したもので決定"}</td></tr><tr className="odd"><td>{"既定"}</td><td>{"受信: すべて拒否、送信: すべて許可"}</td><td>{"既定 NACL: すべて許可 / "}<strong>{"カスタム NACL: 作成直後はすべて拒否"}</strong></td></tr><tr className="even"><td>{"送信元指定"}</td><td>{"IP、プレフィックスリスト、"}<strong>{"他の SG"}</strong></td><td>{"IP の CIDR のみ"}</td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-10" label={"5-1. セキュリティグループ(SG)とネットワーク ACL(NACL)"} />
{"\n"}
<blockquote>{"\n"}<p><strong>{"よくある落とし穴"}</strong>{": NACL はステートレスなので、"}<strong>{"戻り通信用のエフェメラルポート(例: 1024–65535)"}</strong>{" を明示的に許可しないと通信が成立しません。"}</p>{"\n"}</blockquote>
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ol>{"\n"}<li><strong>{"SG を主たる制御手段"}</strong>{" にする。送信元には "}<strong>{"他の SG を参照"}</strong>{"(例: アプリ層 SG は「Web 層 SG からのみ」許可)し、IP 変更に強くする。"}</li>{"\n"}<li>{"NACL は "}<strong>{"サブネット単位の粗い拒否(特定 IP のブロックなど)の補助"}</strong>{" として使う。ルール番号は 100 刻みで余裕を持たせる。"}</li>{"\n"}<li>{"SSH(22)/RDP(3389) を "}<code>{"0.0.0.0/0"}</code>{" に開けない。"}<strong>{"Session Manager"}</strong>{" で踏み台を不要にする。"}</li>{"\n"}<li><strong>{"AWS マネージドプレフィックスリスト / カスタムプレフィックスリスト"}</strong>{" で CIDR 群を一元管理し、複数 SG・ルートテーブルで再利用する。"}</li>{"\n"}<li>{"既定 SG は "}<strong>{"すべてのルールを削除"}</strong>{" して使わない(Config ルール "}<code>{"vpc-default-security-group-closed"}</code>{")。"}</li>{"\n"}</ol>{"\n"}</div></div>
{"\n"}
<h3 id="s5-2" tabIndex={-1}>{"5-2. VPC エンドポイントとエンドポイントポリシー"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5-2. VPC エンドポイントとエンドポイントポリシー（表15）"}><table><thead><tr className="header"><th scope="col">{"種類"}</th><th scope="col">{"対象"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"ゲートウェイエンドポイント"}</strong></td><td><strong>{"S3、DynamoDB"}</strong></td><td>{"ルートテーブルにエントリを追加。無料。VPC 外(オンプレ・他リージョン)からは使えない"}</td></tr><tr className="even"><td><strong>{"インターフェイスエンドポイント(PrivateLink)"}</strong></td><td>{"多くの AWS サービス、自社/他社サービス"}</td><td>{"サブネットに "}<strong>{"ENI"}</strong>{" を作成。"}<strong>{"SG を適用可能"}</strong>{"。オンプレからも利用可"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"エンドポイントポリシー"}</strong>{" は、エンドポイントにアタッチする "}<strong>{"リソースベースポリシー"}</strong>{"で、"}<strong>{"そのエンドポイント経由で許可する主体・操作・リソースを限定"}</strong>{"します。"}</p>
{"\n"}
<Diagram id="diag-11" label={"5-2. VPC エンドポイントとエンドポイントポリシー"} />
{"\n"}
<blockquote>{"\n"}<p><strong>{"重要"}</strong>{": エンドポイントポリシーは "}<strong>{"IAM ポリシーやバケットポリシーを「置き換える」のではなく、追加の制限層"}</strong>{" です。"}<strong>{"最終的な権限は、これらの共通部分(すべてが許可した場合のみ許可)"}</strong>{"。既定のエンドポイントポリシーは「フルアクセス」です。"}</p>{"\n"}</blockquote>
{"\n"}
<div className="code-sample" data-lang="json"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"5-2. VPC エンドポイントとエンドポイントポリシー（コード3）"}>
<div className="code-line"><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"Version\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"2012-10-17\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"Statement\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Sid\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"AllowOnlyOrgBucketsViaEndpoint\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Effect\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"Allow\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Principal\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"*\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Action\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span><span className="s2">{"\"s3:GetObject\""}</span><span className="p">{","}</span><span className="w">{" "}</span><span className="s2">{"\"s3:PutObject\""}</span><span className="p">{"],"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Resource\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"arn:aws:s3:::my-company-data/*\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Condition\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"        "}</span><span className="nt">{"\"StringEquals\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"{"}</span><span className="w">{" "}</span><span className="nt">{"\"aws:PrincipalOrgID\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"o-exampleorgid\""}</span><span className="w">{" "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="p">{"]"}</span></div>
<div className="code-line"><span className="p">{"}"}</span></div>
</div></div>{"\n"}</div>
{"\n"}
<div className="code-sample" data-lang="json"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"5-2. VPC エンドポイントとエンドポイントポリシー（コード4）"}>
<div className="code-line"><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"Version\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"2012-10-17\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"Statement\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Sid\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"DenyAccessUnlessFromMyVpcEndpoint\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Effect\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"Deny\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Principal\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"*\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Action\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"s3:*\""}</span><span className="p">{","}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Resource\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span><span className="s2">{"\"arn:aws:s3:::my-company-data\""}</span><span className="p">{","}</span><span className="w">{" "}</span><span className="s2">{"\"arn:aws:s3:::my-company-data/*\""}</span><span className="p">{"],"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="nt">{"\"Condition\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"        "}</span><span className="nt">{"\"StringNotEquals\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"{"}</span><span className="w">{" "}</span><span className="nt">{"\"aws:SourceVpce\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="s2">{"\"vpce-0123456789abcdef0\""}</span><span className="w">{" "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"      "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="p">{"]"}</span></div>
<div className="code-line"><span className="p">{"}"}</span></div>
</div></div>{"\n"}</div>
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス(データ境界: Data Perimeter)"}</strong></div>{"\n"}<ul>{"\n"}<li><strong>{"ID 境界"}</strong>{": "}<code>{"aws:PrincipalOrgID"}</code>{" で「自組織の ID のみ」。"}</li>{"\n"}<li><strong>{"リソース境界"}</strong>{": "}<code>{"aws:ResourceOrgID"}</code>{" で「自組織のリソースのみ」にアクセス(データ持ち出し先の制限)。"}</li>{"\n"}<li><strong>{"ネットワーク境界"}</strong>{": "}<code>{"aws:SourceVpce"}</code>{" / "}<code>{"aws:SourceVpc"}</code>{" で「自社の VPC エンドポイント経由のみ」。"}</li>{"\n"}<li>{"PrivateLink の "}<strong>{"インターフェイスエンドポイントにも SG を付与"}</strong>{"し、アクセス元を限定する。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<h3 id="s5-3" tabIndex={-1}>{"5-3. VPC 間接続でのセキュリティ"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5-3. VPC 間接続でのセキュリティ（表16）"}><table><thead><tr className="header"><th scope="col">{"接続方式"}</th><th scope="col">{"セキュリティ上のポイント"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"VPC ピアリング"}</strong></td><td>{"推移的ルーティング不可。SG で他 VPC の SG / CIDR を参照可能(同一リージョン内)。ルートは必要な CIDR のみ"}</td></tr><tr className="even"><td><strong>{"Transit Gateway"}</strong></td><td><strong>{"ルートテーブルの分離(セグメンテーション)"}</strong>{"。関連付け(association)と伝播(propagation)を制御。"}<strong>{"ブラックホールルール"}</strong>{"で通信遮断。RAM でアカウント間共有"}</td></tr><tr className="odd"><td><strong>{"PrivateLink"}</strong></td><td><strong>{"サービス単位"}</strong>{"で公開(ネットワーク全体を接続しない)。CIDR 重複でも可。エンドポイントポリシーと SG で制御"}</td></tr><tr className="even"><td><strong>{"VPC Lattice"}</strong></td><td>{"サービス間通信を "}<strong>{"認証ポリシー(IAM)"}</strong>{" で制御"}</td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-12" label={"5-3. VPC 間接続でのセキュリティ"} />
{"\n"}
<h3 id="s5-4" tabIndex={-1}>{"5-4. Firewall Manager による一元管理"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"5-4. Firewall Manager による一元管理（表17）"}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"前提"}</td><td><strong>{"AWS Organizations"}</strong>{" + Firewall Manager 管理者アカウント(委任可)。"}<strong>{"AWS Config の有効化が必要"}</strong></td></tr><tr className="even"><td>{"管理できるポリシー"}</td><td>{"WAF、Shield Advanced、"}<strong>{"セキュリティグループ"}</strong>{"(共通 SG・コンテンツ監査・使用状況監査)、"}<strong>{"ネットワーク ACL"}</strong>{"、"}<strong>{"Network Firewall"}</strong>{"、"}<strong>{"DNS Firewall"}</strong>{"、サードパーティ FW"}</td></tr><tr className="odd"><td>{"特徴"}</td><td><strong>{"新規アカウント/リソースへ自動適用"}</strong>{"、非準拠リソースの検出と "}<strong>{"自動修復(auto remediation)"}</strong></td></tr></tbody></table></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"SG: "}<a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html">{"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html"}</a></li>{"\n"}<li>{"NACL: "}<a href="https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html">{"https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html"}</a></li>{"\n"}<li>{"VPC エンドポイントポリシー: "}<a href="https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html">{"https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html"}</a></li>{"\n"}<li>{"データ境界ホワイトペーパー: "}<a href="https://docs.aws.amazon.com/whitepapers/latest/building-a-data-perimeter-on-aws/building-a-data-perimeter-on-aws.html">{"https://docs.aws.amazon.com/whitepapers/latest/building-a-data-perimeter-on-aws/building-a-data-perimeter-on-aws.html"}</a></li>{"\n"}<li>{"Transit Gateway ルートテーブル: "}<a href="https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html">{"https://docs.aws.amazon.com/vpc/latest/tgw/tgw-route-tables.html"}</a></li>{"\n"}<li>{"Firewall Manager: "}<a href="https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html">{"https://docs.aws.amazon.com/waf/latest/developerguide/fms-chapter.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p6"></a></p>
{"\n"}
<h2 id="sec-29" tabIndex={-1}>{"6. セキュリティ・コンプライアンスを満たすアーキテクチャ"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Skills"}</strong>{": Implementing an AWS network architecture to meet security and compliance requirements (for example, untrusted network, perimeter VPC, three-tier architecture)"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s6-1" tabIndex={-1}>{"6-1. 3 層アーキテクチャ(Three-tier)"}</h3>
{"\n"}
<p>{"Web / アプリ / データを "}<strong>{"サブネットと SG で分離"}</strong>{" する基本形です。"}</p>
{"\n"}
<Diagram id="diag-13" label={"6-1. 3 層アーキテクチャ(Three-tier)"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6-1. 3 層アーキテクチャ(Three-tier)（表18）"}><table><thead><tr className="header"><th scope="col">{"層"}</th><th scope="col">{"サブネット"}</th><th scope="col">{"主な制御"}</th></tr></thead><tbody><tr className="odd"><td>{"Web"}</td><td>{"パブリック(IGW へのルートあり)"}</td><td>{"WAF、ALB の SG は 443 を公開"}</td></tr><tr className="even"><td>{"アプリ"}</td><td>{"プライベート(NAT / FW 経由で出口)"}</td><td>{"SG は "}<strong>{"Web 層 SG のみ"}</strong>{" 許可"}</td></tr><tr className="odd"><td>{"データ"}</td><td>{"分離(IGW・NAT へのルートなし)"}</td><td>{"SG は "}<strong>{"アプリ層 SG のみ"}</strong>{" 許可、暗号化(KMS + TLS)"}</td></tr></tbody></table></div>
{"\n"}
<h3 id="s6-2" tabIndex={-1}>{"6-2. 境界(Perimeter)VPC / 信頼できないネットワーク(Untrusted)"}</h3>
{"\n"}
<p><strong>{"インターネット、パートナー、オンプレミス"}</strong>{"といった「信頼できないネットワーク」との接点を "}<strong>{"専用の境界 VPC(DMZ・Inspection VPC)"}</strong>{" に集約し、内部 VPC へは "}<strong>{"検査を通過した通信だけ"}</strong>{" を渡します。"}</p>
{"\n"}
<Diagram id="diag-14" label={"6-2. 境界(Perimeter)VPC / 信頼できないネットワーク(Untrusted)"} />
{"\n"}
<h3 id="s6-3" tabIndex={-1}>{"6-3. 集中型検査(East-West も含む)"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6-3. 集中型検査(East-West も含む)（表19）"}><table><thead><tr className="header"><th scope="col">{"通信方向"}</th><th scope="col">{"説明"}</th><th scope="col">{"検査の置き場所"}</th></tr></thead><tbody><tr className="odd"><td>{"North-South(Ingress)"}</td><td>{"インターネット → AWS"}</td><td>{"境界 VPC / ALB の WAF / FW の ingress routing"}</td></tr><tr className="even"><td>{"North-South(Egress)"}</td><td>{"AWS → インターネット"}</td><td>{"検査 VPC の Network Firewall + NAT"}</td></tr><tr className="odd"><td>{"East-West"}</td><td>{"VPC ⇔ VPC、VPC ⇔ オンプレ"}</td><td><strong>{"TGW 経由で検査 VPC を通す"}</strong></td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-15" label={"6-3. 集中型検査(East-West も含む)"} />
{"\n"}
<blockquote>{"\n"}<p><strong>{"アプライアンスモード"}</strong>{": 有効にしない場合、TGW は AZ をまたいだ非対称なパスを選ぶことがあり、"}<strong>{"ステートフルな検査が失敗(戻りパケットが別のアプライアンスに到達)"}</strong>{" します。ステートフルな検査 VPC では "}<strong>{"必ず有効化"}</strong>{" してください。"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s6-4" tabIndex={-1}>{"6-4. 要件別の設計ガイド"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6-4. 要件別の設計ガイド（表20）"}><table><thead><tr className="header"><th scope="col">{"コンプライアンス要件の例"}</th><th scope="col">{"実装"}</th></tr></thead><tbody><tr className="odd"><td>{"インターネットに直接出さない"}</td><td>{"プライベート/分離サブネット + VPC エンドポイント + NAT/FW 経由の出口"}</td></tr><tr className="even"><td>{"特定ドメインだけ外部通信可"}</td><td>{"Network Firewall ドメインリスト(出口)"}</td></tr><tr className="odd"><td>{"全通信の記録(PCI DSS 等)"}</td><td>{"Flow Logs、ALB/WAF/FW ログ、CloudTrail を S3 へ長期保存(オブジェクトロック)"}</td></tr><tr className="even"><td>{"転送中データの暗号化"}</td><td>{"TLS 1.2+、IPsec、MACsec、VPC Encryption Controls"}</td></tr><tr className="odd"><td>{"他アカウントへの持ち出し禁止"}</td><td>{"エンドポイントポリシー + SCP + "}<code>{"aws:ResourceOrgID"}</code></td></tr><tr className="even"><td>{"設定逸脱の検知・是正"}</td><td>{"Config ルール / コンフォーマンスパック + 自動修復"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"Building a Scalable and Secure Multi-VPC AWS Network Infrastructure: "}<a href="https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/welcome.html">{"https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/welcome.html"}</a></li>{"\n"}<li>{"Network Firewall と TGW の統合(AWS ブログ): "}<a href="https://aws.amazon.com/blogs/networking-and-content-delivery/centralized-inspection-architecture-with-aws-gateway-load-balancer-and-aws-transit-gateway/">{"https://aws.amazon.com/blogs/networking-and-content-delivery/centralized-inspection-architecture-with-aws-gateway-load-balancer-and-aws-transit-gateway/"}</a></li>{"\n"}<li>{"AWS Security Reference Architecture: "}<a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html">{"https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html"}</a></li>{"\n"}</ul>
{"\n"}
<p><a id="p7"></a></p>
{"\n"}
<h2 id="sec-34" tabIndex={-1}>{"7. コンプライアンスのテストとインシデント自動通知"}</h2>
{"\n"}
<blockquote>{"\n"}<p><strong>{"Skills"}</strong>{": Testing compliance with the initial requirements (for example, failover test, resiliency) / Automating security incident reporting and alerting using AWS"}</p>{"\n"}</blockquote>
{"\n"}
<h3 id="s7-1" tabIndex={-1}>{"7-1. 要件が満たされているかのテスト"}</h3>
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"7-1. 要件が満たされているかのテスト（表21）"}><table><thead><tr className="header"><th scope="col">{"テスト"}</th><th scope="col">{"内容"}</th><th scope="col">{"ツール"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"到達性の検証"}</strong></td><td>{"「A から B へ到達できる/できない」を設定ベースで確認(パケットは送らない)"}</td><td><strong>{"VPC Reachability Analyzer"}</strong></td></tr><tr className="even"><td><strong>{"意図しないアクセスの検出"}</strong></td><td>{"「インターネットから DB へ到達可能な経路がないか」などを検査"}</td><td><strong>{"Network Access Analyzer"}</strong>{"(Network Access Scope)"}</td></tr><tr className="odd"><td><strong>{"フェイルオーバーテスト"}</strong></td><td>{"AZ・ファイアウォールエンドポイント・VPN トンネル・Direct Connect の障害時に切り替わるか"}</td><td>{"手動停止、"}<strong>{"AWS Fault Injection Service(FIS)"}</strong>{"、DX の "}<strong>{"フェイルオーバーテスト機能"}</strong>{"(BGP セッションの意図的停止)"}</td></tr><tr className="even"><td><strong>{"レジリエンステスト"}</strong></td><td>{"負荷・障害下でも要件を維持するか"}</td><td>{"FIS(ネットワーク切断系アクション)、Auto Scaling の確認"}</td></tr><tr className="odd"><td><strong>{"構成の継続評価"}</strong></td><td>{"ルール違反の検出"}</td><td><strong>{"AWS Config"}</strong>{" ルール / コンフォーマンスパック、"}<strong>{"Security Hub"}</strong></td></tr><tr className="even"><td><strong>{"証跡の収集"}</strong></td><td>{"監査向けの証拠"}</td><td><strong>{"Audit Manager"}</strong>{"、"}<strong>{"AWS Artifact"}</strong>{"(AWS 側のコンプライアンスレポート)"}</td></tr></tbody></table></div>
{"\n"}
<Diagram id="diag-16" label={"7-1. 要件が満たされているかのテスト"} />
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ul>{"\n"}<li>{"構成変更のたびに "}<strong>{"Reachability Analyzer"}</strong>{" を CI/CD やパイプラインに組み込み、「到達してはならない経路」が回帰しないようにする。"}</li>{"\n"}<li>{"VPN は "}<strong>{"2 本のトンネル(別 AZ のエンドポイント)"}</strong>{" の片側を停止して切り替えを確認。DX は "}<strong>{"冗長接続(別ロケーション 2 本 + VPN バックアップ)"}</strong>{" と BFD を設定し、フェイルオーバーテストを定期実施。"}</li>{"\n"}<li><strong>{"ペネトレーションテスト"}</strong>{" は AWS のポリシーに従う(多くのサービスで事前承認は不要だが、禁止行為(DDoS シミュレーション等)は別途ポリシーあり)。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<h3 id="s7-2" tabIndex={-1}>{"7-2. セキュリティインシデントの自動検出・通知・対応"}</h3>
{"\n"}
<Diagram id="diag-17" label={"7-2. セキュリティインシデントの自動検出・通知・対応"} />
{"\n"}
<div className="table-scroll" role="region" tabIndex={0} aria-label={"7-2. セキュリティインシデントの自動検出・通知・対応（表22）"}><table><thead><tr className="header"><th scope="col">{"サービス"}</th><th scope="col">{"役割"}</th><th scope="col">{"試験でのキーワード"}</th></tr></thead><tbody><tr className="odd"><td><strong>{"Amazon GuardDuty"}</strong></td><td><strong>{"Flow Logs・DNS ログ・CloudTrail"}</strong>{" を自動分析して脅威を検出(Flow Logs を自分で有効化しなくても分析対象)"}</td><td>{"ポートスキャン、C2 通信、暗号通貨マイニング、DNS 持ち出し"}</td></tr><tr className="even"><td><strong>{"Amazon EventBridge"}</strong></td><td>{"イベントをルールで振り分け、各ターゲットを起動"}</td><td>{"変更検知 → 自動通知・是正"}</td></tr><tr className="odd"><td><strong>{"AWS Config"}</strong></td><td>{"リソース設定の評価と "}<strong>{"自動修復(SSM Automation)"}</strong></td><td><code>{"restricted-ssh"}</code>{"、"}<code>{"vpc-flow-logs-enabled"}</code></td></tr><tr className="even"><td><strong>{"AWS Security Hub"}</strong></td><td>{"複数サービスの検出結果を集約・標準チェック"}</td><td>{"一元的なダッシュボード"}</td></tr><tr className="odd"><td><strong>{"Amazon Detective"}</strong></td><td>{"Flow Logs 等から調査用のグラフを構築"}</td><td>{"根本原因の調査"}</td></tr><tr className="even"><td><strong>{"Amazon Inspector"}</strong></td><td>{"EC2 のネットワーク到達性(Network reachability)の検出"}</td><td>{"意図しない公開ポート"}</td></tr><tr className="odd"><td><strong>{"Amazon SNS"}</strong></td><td>{"通知"}</td><td>{"メール、SMS、HTTPS"}</td></tr></tbody></table></div>
{"\n"}
<p><strong>{"例: SG が 0.0.0.0/0 の SSH 許可に変更されたら自動で元に戻す"}</strong></p>
{"\n"}
<div className="code-sample" data-lang="json"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"7-2. セキュリティインシデントの自動検出・通知・対応（コード5）"}>
<div className="code-line"><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"source\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span><span className="s2">{"\"aws.ec2\""}</span><span className="p">{"],"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"detail-type\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span><span className="s2">{"\"AWS API Call via CloudTrail\""}</span><span className="p">{"],"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="nt">{"\"detail\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"{"}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="nt">{"\"eventSource\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span><span className="s2">{"\"ec2.amazonaws.com\""}</span><span className="p">{"],"}</span></div>
<div className="code-line"><span className="w">{"    "}</span><span className="nt">{"\"eventName\""}</span><span className="p">{":"}</span><span className="w">{" "}</span><span className="p">{"["}</span><span className="s2">{"\"AuthorizeSecurityGroupIngress\""}</span><span className="p">{"]"}</span></div>
<div className="code-line"><span className="w">{"  "}</span><span className="p">{"}"}</span></div>
<div className="code-line"><span className="p">{"}"}</span></div>
</div></div>{"\n"}</div>
{"\n"}
<p>{"上記の EventBridge ルールをトリガーに、Lambda で追加されたルールを検査し、違反していれば "}<code>{"RevokeSecurityGroupIngress"}</code>{" を実行して SNS で通知します。"}</p>
{"\n"}
<div className="code-sample" data-lang="python"><div className="highlight"><div className="code-block" role="region" tabIndex={0} aria-label={"7-2. セキュリティインシデントの自動検出・通知・対応（コード6）"}>
<div className="code-line"><span className="kn">{"import"}</span><span className="w">{" "}</span><span className="nn">{"boto3"}</span></div>
<div className="code-line">{""}</div>
<div className="code-line"><span className="n">{"ec2"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="n">{"boto3"}</span><span className="o">{"."}</span><span className="n">{"client"}</span><span className="p">{"("}</span><span className="s2">{"\"ec2\""}</span><span className="p">{")"}</span></div>
<div className="code-line">{""}</div>
<div className="code-line"><span className="k">{"def"}</span><span className="w">{" "}</span><span className="nf">{"is_admin_rule"}</span><span className="p">{"("}</span><span className="n">{"perm"}</span><span className="p">{"):"}</span></div>
<div className="code-line">{"    "}<span className="n">{"protocol"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="n">{"perm"}</span><span className="o">{"."}</span><span className="n">{"get"}</span><span className="p">{"("}</span><span className="s2">{"\"ipProtocol\""}</span><span className="p">{")"}</span></div>
<div className="code-line">{"    "}<span className="n">{"tcp_admin"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="n">{"protocol"}</span>{" "}<span className="ow">{"in"}</span>{" "}<span className="p">{"("}</span><span className="s2">{"\"tcp\""}</span><span className="p">{","}</span>{" "}<span className="s2">{"\"6\""}</span><span className="p">{")"}</span>{" "}<span className="ow">{"and"}</span>{" "}<span className="nb">{"any"}</span><span className="p">{"("}</span><span className="n">{"perm"}</span><span className="o">{"."}</span><span className="n">{"get"}</span><span className="p">{"("}</span><span className="s2">{"\"fromPort\""}</span><span className="p">{","}</span>{" "}<span className="o">{"-"}</span><span className="mi">{"1"}</span><span className="p">{")"}</span>{" "}<span className="o">{"<="}</span>{" "}<span className="n">{"port"}</span>{" "}<span className="o">{"<="}</span>{" "}<span className="n">{"perm"}</span><span className="o">{"."}</span><span className="n">{"get"}</span><span className="p">{"("}</span><span className="s2">{"\"toPort\""}</span><span className="p">{","}</span>{" "}<span className="o">{"-"}</span><span className="mi">{"1"}</span><span className="p">{")"}</span>{" "}<span className="k">{"for"}</span>{" "}<span className="n">{"port"}</span>{" "}<span className="ow">{"in"}</span>{" "}<span className="p">{"("}</span><span className="mi">{"22"}</span><span className="p">{","}</span>{" "}<span className="mi">{"3389"}</span><span className="p">{"))"}</span></div>
<div className="code-line">{"    "}<span className="k">{"return"}</span>{" "}<span className="n">{"protocol"}</span>{" "}<span className="o">{"=="}</span>{" "}<span className="s2">{"\"-1\""}</span>{" "}<span className="ow">{"or"}</span>{" "}<span className="n">{"tcp_admin"}</span></div>
<div className="code-line">{""}</div>
<div className="code-line"><span className="k">{"def"}</span><span className="w">{" "}</span><span className="nf">{"handler"}</span><span className="p">{"("}</span><span className="n">{"event"}</span><span className="p">{","}</span>{" "}<span className="n">{"context"}</span><span className="p">{"):"}</span></div>
<div className="code-line">{"    "}<span className="n">{"detail"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="n">{"event"}</span><span className="p">{"["}</span><span className="s2">{"\"detail\""}</span><span className="p">{"]"}</span></div>
<div className="code-line">{"    "}<span className="n">{"group_id"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="n">{"detail"}</span><span className="p">{"["}</span><span className="s2">{"\"requestParameters\""}</span><span className="p">{"]["}</span><span className="s2">{"\"groupId\""}</span><span className="p">{"]"}</span></div>
<div className="code-line">{"    "}<span className="k">{"for"}</span>{" "}<span className="n">{"perm"}</span>{" "}<span className="ow">{"in"}</span>{" "}<span className="n">{"detail"}</span><span className="p">{"["}</span><span className="s2">{"\"requestParameters\""}</span><span className="p">{"]["}</span><span className="s2">{"\"ipPermissions\""}</span><span className="p">{"]["}</span><span className="s2">{"\"items\""}</span><span className="p">{"]:"}</span></div>
<div className="code-line">{"        "}<span className="k">{"if"}</span>{" "}<span className="ow">{"not"}</span>{" "}<span className="n">{"is_admin_rule"}</span><span className="p">{"("}</span><span className="n">{"perm"}</span><span className="p">{"):"}</span></div>
<div className="code-line">{"            "}<span className="k">{"continue"}</span></div>
<div className="code-line">{"        "}<span className="k">{"for"}</span>{" "}<span className="n">{"rng"}</span>{" "}<span className="ow">{"in"}</span>{" "}<span className="n">{"perm"}</span><span className="o">{"."}</span><span className="n">{"get"}</span><span className="p">{"("}</span><span className="s2">{"\"ipRanges\""}</span><span className="p">{","}</span>{" "}<span className="p">{"{})"}</span><span className="o">{"."}</span><span className="n">{"get"}</span><span className="p">{"("}</span><span className="s2">{"\"items\""}</span><span className="p">{","}</span>{" "}<span className="p">{"[]):"}</span></div>
<div className="code-line">{"            "}<span className="k">{"if"}</span>{" "}<span className="n">{"rng"}</span><span className="o">{"."}</span><span className="n">{"get"}</span><span className="p">{"("}</span><span className="s2">{"\"cidrIp\""}</span><span className="p">{")"}</span>{" "}<span className="o">{"!="}</span>{" "}<span className="s2">{"\"0.0.0.0/0\""}</span><span className="p">{":"}</span></div>
<div className="code-line">{"                "}<span className="k">{"continue"}</span></div>
<div className="code-line">{"            "}<span className="n">{"revoked"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="p">{"{"}</span></div>
<div className="code-line">{"                "}<span className="s2">{"\"IpProtocol\""}</span><span className="p">{":"}</span>{" "}<span className="n">{"perm"}</span><span className="p">{"["}</span><span className="s2">{"\"ipProtocol\""}</span><span className="p">{"],"}</span></div>
<div className="code-line">{"                "}<span className="s2">{"\"IpRanges\""}</span><span className="p">{":"}</span>{" "}<span className="p">{"[{"}</span><span className="s2">{"\"CidrIp\""}</span><span className="p">{":"}</span>{" "}<span className="s2">{"\"0.0.0.0/0\""}</span><span className="p">{"}],"}</span></div>
<div className="code-line">{"            "}<span className="p">{"}"}</span></div>
<div className="code-line">{"            "}<span className="k">{"if"}</span>{" "}<span className="n">{"perm"}</span><span className="p">{"["}</span><span className="s2">{"\"ipProtocol\""}</span><span className="p">{"]"}</span>{" "}<span className="o">{"!="}</span>{" "}<span className="s2">{"\"-1\""}</span><span className="p">{":"}</span></div>
<div className="code-line">{"                "}<span className="n">{"revoked"}</span><span className="p">{"["}</span><span className="s2">{"\"FromPort\""}</span><span className="p">{"]"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="n">{"perm"}</span><span className="p">{"["}</span><span className="s2">{"\"fromPort\""}</span><span className="p">{"]"}</span></div>
<div className="code-line">{"                "}<span className="n">{"revoked"}</span><span className="p">{"["}</span><span className="s2">{"\"ToPort\""}</span><span className="p">{"]"}</span>{" "}<span className="o">{"="}</span>{" "}<span className="n">{"perm"}</span><span className="p">{"["}</span><span className="s2">{"\"toPort\""}</span><span className="p">{"]"}</span></div>
<div className="code-line">{"            "}<span className="n">{"ec2"}</span><span className="o">{"."}</span><span className="n">{"revoke_security_group_ingress"}</span><span className="p">{"("}</span><span className="n">{"GroupId"}</span><span className="o">{"="}</span><span className="n">{"group_id"}</span><span className="p">{","}</span>{" "}<span className="n">{"IpPermissions"}</span><span className="o">{"="}</span><span className="p">{"["}</span><span className="n">{"revoked"}</span><span className="p">{"])"}</span></div>
</div></div>{"\n"}</div>
{"\n"}
<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label"><strong>{"ベストプラクティス"}</strong></div>{"\n"}<ul>{"\n"}<li><strong>{"検知 → 通知 → 自動是正"}</strong>{" の 3 点セットで設計し、重大度に応じて「通知のみ」と「自動是正」を使い分ける。"}</li>{"\n"}<li>{"GuardDuty は "}<strong>{"全リージョン・全アカウント(Organizations の委任管理者)"}</strong>{" で有効にし、結果は Security Hub に集約する。"}</li>{"\n"}<li>{"自動是正は "}<strong>{"誤検知で本番を止めない"}</strong>{" よう、まず通知のみで運用して精度を確認する。"}</li>{"\n"}</ul>{"\n"}</div></div>
{"\n"}
<p><strong>{"根拠 URL"}</strong></p>
{"\n"}
<ul>{"\n"}<li>{"Reachability Analyzer: "}<a href="https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html">{"https://docs.aws.amazon.com/vpc/latest/reachability/what-is-reachability-analyzer.html"}</a></li>{"\n"}<li>{"Network Access Analyzer: "}<a href="https://docs.aws.amazon.com/vpc/latest/network-access-analyzer/what-is-vpc-network-access-analyzer.html">{"https://docs.aws.amazon.com/vpc/latest/network-access-analyzer/what-is-vpc-network-access-analyzer.html"}</a></li>{"\n"}<li>{"AWS Fault Injection Service: "}<a href="https://docs.aws.amazon.com/fis/latest/userguide/what-is.html">{"https://docs.aws.amazon.com/fis/latest/userguide/what-is.html"}</a></li>{"\n"}<li>{"Direct Connect フェイルオーバーテスト: "}<a href="https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_failover.html">{"https://docs.aws.amazon.com/directconnect/latest/UserGuide/resiliency_failover.html"}</a></li>{"\n"}<li>{"GuardDuty: "}<a href="https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html">{"https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html"}</a></li>{"\n"}<li>{"Config マネージドルール一覧: "}<a href="https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html">{"https://docs.aws.amazon.com/config/latest/developerguide/managed-rules-by-aws-config.html"}</a></li>{"\n"}<li>{"Security Hub: "}<a href="https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html">{"https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html"}</a></li>{"\n"}</ul>
{"\n"}
</div>;}
