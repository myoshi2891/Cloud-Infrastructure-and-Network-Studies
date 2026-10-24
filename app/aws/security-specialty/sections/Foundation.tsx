import { Diagram } from '../Diagram';
/** 原本foundationの全文・表・図・コードを保持する区画。 */
export default function Foundation() { return <div className="guide-part" data-part="foundation">
{"\n                "}
<div className="hero">{"\n                    "}<div className="kicker">{"AWS Certified Security - Specialty · SCS-C03"}</div>{"\n                    "}<h1 >{"\n                        AWS Certified Security - Specialty (SCS-C03)\n                        初学者向けステップバイステップ完全ガイド\n                    "}</h1>{"\n                    "}<div className="meta-row">{"\n                        "}<span className="pill">{"ドメイン "}<strong >{"6"}</strong></span>{"\n                        "}<span className="pill">{"タスク "}<strong >{"16"}</strong></span>{"\n                        "}<span className="pill">{"図解 "}<strong >{"Mermaid 40点"}</strong></span>{"\n                        "}<span className="pill">{"参考URL "}<strong >{"170件"}</strong></span>{"\n                    "}</div>{"\n                "}</div>
{"\n\n                "}
<div className="callout-practice">{"\n                    "}<div className="icon">{"✓"}</div>{"\n                    "}<div className="body">{"\n                        "}<div className="label">{"ガイド概要"}</div>{"\n                        "}<p >{"\n                            対象試験: AWS Certified Security - Specialty (SCS-C03)"}<br  />{"試験ガイド(公式):\n                            "}<a href="https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html">{"https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html"}</a><br  />{"本ガイドの構成: 公式試験ガイドの 6 コンテンツドメイン / 全 16\n                            タスクに沿って、各スキル(Skill)の「何か」「なぜ必要か」「どう設定するか」「ベストプラクティス」「根拠\n                            URL」を解説します。"}<br  />{"図解ルール: ASCII 図は使わず、フローは\n                            Mermaid、表は Markdown 表で表現します。\n                        "}</p>{"\n                    "}</div>{"\n                "}</div>
{"\n                "}
<hr  />
{"\n                "}
<h2 id="0-はじめに-試験の全体像" tabIndex={-1}>{"0. はじめに: 試験の全体像"}</h2>
{"\n                "}
<h3 id="01-この試験は何を測るのか" tabIndex={-1}>{"0.1 この試験は何を測るのか"}</h3>
{"\n                "}
<p >{"\n                    公式ガイドによると、この試験は「クラウドソリューションを守る責任を持つ人」向けで、AWS\n                    の製品・サービスを安全にするための知識を問います。具体的には次の能力が検証されます。\n                "}</p>
{"\n                "}
<div className="table-scroll" role="region" tabIndex={0} aria-label="0.1 この試験は何を測るのか 表1">{"\n                    "}<table ><thead ><tr className="header"><th scope="col">{"検証される能力"}</th><th scope="col">{"かみ砕いた意味"}</th></tr></thead><tbody ><tr className="odd"><td >{"データ分類と保護メカニズムの適用"}</td><td >{"機密度に応じてデータの守り方を変えられる"}</td></tr><tr className="even"><td >{"暗号化方式の実装"}</td><td >{"保存時・転送時の暗号化を正しく選び設定できる"}</td></tr><tr className="odd"><td >{"安全なインターネットプロトコルの実装"}</td><td >{"TLS などを強制し、古い設定を排除できる"}</td></tr><tr className="even"><td >{"セキュリティサービスによる本番環境の保護"}</td><td >{"GuardDuty / WAF / Config などを使いこなせる"}</td></tr><tr className="odd"><td >{"コスト・セキュリティ・複雑さのトレードオフ判断"}</td><td >{"「最強」ではなく「要件に合う最小構成」を選べる"}</td></tr><tr className="even"><td >{"セキュリティ運用とリスクの理解"}</td><td >{"検知から復旧までの運用を理解している"}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<p >{"\n                    根拠: 試験ガイド Introduction\n                    "}<a href="https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html">{"https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html"}</a>{"\n                "}</p>
{"\n                "}
<h3 id="02-想定受験者と範囲外" tabIndex={-1}>{"0.2 想定受験者と範囲外"}</h3>
{"\n                "}
<ul >{"\n                    "}<li >{"\n                        想定: クラウドソリューションの保護に "}<strong >{"3〜5 年相当"}</strong>{" の経験\n                    "}</li>{"\n                    "}<li >{"\n                        範囲外(試験で問われない):\n                        暗号アルゴリズムの設計、パケットレベルのトラフィック解析、クラウド全体のアーキテクチャ設計、エンドユーザーコンピューティング管理、機械学習モデルの訓練\n                    "}</li>{"\n                "}</ul>
{"\n                "}
<div className="callout-practice">{"\n                    "}<div className="icon">{"✓"}</div>{"\n                    "}<div className="body">{"\n                        "}<div className="label">{"ポイント"}</div>{"\n                        "}<p >{"\n                            範囲外が明示されているので、「パケットを 1\n                            つずつ読み解く」ような深掘りは不要です。サービスの選択と設定判断に集中しましょう。\n                        "}</p>{"\n                    "}</div>{"\n                "}</div>
{"\n                "}
<h3 id="03-試験形式とスコア" tabIndex={-1}>{"0.3 試験形式とスコア"}</h3>
{"\n                "}
<div className="table-scroll" role="region" tabIndex={0} aria-label="0.3 試験形式とスコア 表2">{"\n                    "}<table ><thead ><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className="odd"><td >{"問題数"}</td><td >{"\n                                    採点対象 50 問 + 採点対象外 15 問(どれが採点外かは分からない)\n                                "}</td></tr><tr className="even"><td >{"問題形式"}</td><td >{"多肢選択、複数選択、並べ替え(Ordering)、マッチング"}</td></tr><tr className="odd"><td >{"合格スコア"}</td><td >{"100〜1,000 のスケールスコアで 750 以上"}</td></tr><tr className="even"><td >{"採点モデル"}</td><td >{"補償型(ドメインごとの足切りなし。全体で合格すればよい)"}</td></tr><tr className="odd"><td >{"未回答"}</td><td >{"不正解扱い。推測回答のペナルティはなし"}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<div className="callout-practice">{"\n                    "}<div className="icon">{"✓"}</div>{"\n                    "}<div className="body">{"\n                        "}<div className="label">{"ポイント"}</div>{"\n                        "}<p >{"\n                            未回答は不正解なので、わからなくても必ず何か選びます。補償型なので、苦手ドメインがあっても得意ドメインでカバーできます。\n                        "}</p>{"\n                    "}</div>{"\n                "}</div>
{"\n                "}
<h3 id="04-ドメイン配分" tabIndex={-1}>{"0.4 ドメイン配分"}</h3>
{"\n                "}
<Diagram id="diagram-1" label="0.4 ドメイン配分 図1" />
{"\n                "}
<p >{"\n                    IAM(20%)が最大で、次いでインフラ(18%)とデータ保護(18%)です。IAM\n                    は他ドメインの問題にも登場するため、最優先で固めるのが効率的です。\n                "}</p>
{"\n                "}
<h3 id="05-scs-c02-から-scs-c03-への主な変更点" tabIndex={-1}>{"\n                    0.5 SCS-C02 から SCS-C03 への主な変更点\n                "}</h3>
{"\n                "}
<p >{"SCS-C03 は 2025 年 12 月 2 日以降の試験です。"}</p>
{"\n                "}
<div className="table-scroll" role="region" tabIndex={0} aria-label="0.5 SCS-C02 から SCS-C03 への主な変更点 表3">{"\n                    "}<table ><thead ><tr className="header"><th scope="col">{"区分"}</th><th scope="col">{"主な内容"}</th></tr></thead><tbody ><tr className="odd"><td >{"構造変更"}</td><td >{"\n                                    旧「Threat Detection and Incident Response」と「Security Logging\n                                    and Monitoring」が、新 Domain 1 Detection と Domain 2 Incident\n                                    Response に再編。Domain 6 は「Security Foundations and\n                                    Governance」に名称変更\n                                "}</td></tr><tr className="even"><td >{"追加"}</td><td >{"\n                                    検出結果の妥当性検証(2.2.3)、OCSF 形式や外部 WAF\n                                    ルールとの統合(3.1.4)、生成 AI\n                                    アプリのガードレール(3.2.7)、リソース間の転送中暗号化(5.1.3)、インポート鍵と\n                                    AWS\n                                    生成鍵の違い(5.3.3)、機微データのマスキング(5.3.4)、単一/複数リージョンでの鍵・証明書管理(5.3.5)\n                                "}</td></tr><tr className="odd"><td >{"削除"}</td><td >{"\n                                    ASFF、AWS Security Incident Response\n                                    Guide、ホストベースセキュリティ、TCP/IP 基礎、IAM\n                                    ポリシー要素の基礎、TLS の概念、S3\n                                    静的ウェブサイトホスティングなど\n                                "}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<p >{"\n                    根拠: Appendix: Comparison of SCS-C02 and SCS-C03\n                    "}<a href="https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03-appendix-b.html">{"https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03-appendix-b.html"}</a>{"\n                "}</p>
{"\n                "}
<div className="callout-practice">{"\n                    "}<div className="icon">{"✓"}</div>{"\n                    "}<div className="body">{"\n                        "}<div className="label">{"補足"}</div>{"\n                        "}<p >{"\n                            「IAM ポリシー要素の基礎」「TLS\n                            の概念」は出題範囲の記述から外れましたが、設定を判断する問題の前提にはなります。本ガイドでも最小限は解説します。\n                        "}</p>{"\n                    "}</div>{"\n                "}</div>
{"\n                "}
<h3 id="06-学習の進め方全体ロードマップ" tabIndex={-1}>{"0.6 学習の進め方(全体ロードマップ)"}</h3>
{"\n                "}
<Diagram id="diagram-2" label="0.6 学習の進め方(全体ロードマップ) 図2" />
{"\n                "}
<p >{"\n                    IAM\n                    と暗号化(KMS)を先にやると、後続ドメインの「なぜこの権限・この鍵が必要か」が理解しやすくなります。\n                "}</p>
{"\n                "}
<hr  />
{"\n                "}
<h2 id="1-前提知識-これだけは先に押さえる" tabIndex={-1}>{"1. 前提知識: これだけは先に押さえる"}</h2>
{"\n                "}
<h3 id="11-責任共有モデル" tabIndex={-1}>{"1.1 責任共有モデル"}</h3>
{"\n                "}
<p >{"\n                    AWS\n                    は「クラウド"}<strong >{"の"}</strong>{"セキュリティ」(データセンター、ハードウェア、ホスト\n                    OS、仮想化層)を担い、お客様は「クラウド"}<strong >{"における"}</strong>{"セキュリティ」(データ、IAM、OS\n                    パッチ、ネットワーク設定、暗号化の選択)を担います。サービスの抽象度が上がるほど\n                    AWS の担当範囲が広がります。\n                "}</p>
{"\n                "}
<div className="table-scroll" role="region" tabIndex={0} aria-label="1.1 責任共有モデル 表4">{"\n                    "}<table ><thead ><tr className="header"><th scope="col">{"サービス種別"}</th><th scope="col">{"例"}</th><th scope="col">{"お客様の主な責任"}</th></tr></thead><tbody ><tr className="odd"><td >{"IaaS 型"}</td><td >{"Amazon EC2"}</td><td >{"ゲスト OS パッチ、SG、IAM、データ暗号化、アプリ"}</td></tr><tr className="even"><td >{"コンテナ型"}</td><td >{"Amazon ECS / EKS(EC2 起動タイプ)"}</td><td >{"コンテナイメージ、タスク/Pod の権限、ネットワークポリシー"}</td></tr><tr className="odd"><td >{"抽象化サービス"}</td><td >{"Amazon S3、DynamoDB"}</td><td >{"データ分類、アクセス制御、暗号化設定、ログ"}</td></tr><tr className="even"><td >{"サーバーレス"}</td><td >{"AWS Lambda"}</td><td >{"コード、実行ロール、依存ライブラリ"}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<p >{"\n                    根拠:\n                    "}<a href="https://aws.amazon.com/compliance/shared-responsibility-model/">{"https://aws.amazon.com/compliance/shared-responsibility-model/"}</a>{"\n                "}</p>
{"\n                "}
<h3 id="12-セキュリティの基本原則" tabIndex={-1}>{"1.2 セキュリティの基本原則"}</h3>
{"\n                "}
<div className="table-scroll" role="region" tabIndex={0} aria-label="1.2 セキュリティの基本原則 表5">{"\n                    "}<table ><thead ><tr className="header"><th scope="col">{"原則"}</th><th scope="col">{"意味"}</th><th scope="col">{"代表的な AWS 手段"}</th></tr></thead><tbody ><tr className="odd"><td >{"最小権限"}</td><td >{"必要な権限だけを付ける"}</td><td >{"IAM ポリシー、Permission Boundary、Access Analyzer"}</td></tr><tr className="even"><td >{"多層防御"}</td><td >{"1 か所が破られても次で止める"}</td><td >{"WAF、SG、NACL、Network Firewall、SCP"}</td></tr><tr className="odd"><td >{"職務分離"}</td><td >{"1 人・1 アカウントに権限を集中させない"}</td><td >{"マルチアカウント、ロール分離"}</td></tr><tr className="even"><td >{"トレーサビリティ"}</td><td >{"誰がいつ何をしたか追える"}</td><td >{"CloudTrail、Config、各種ログ"}</td></tr><tr className="odd"><td >{"自動化"}</td><td >{"人手を減らして一貫性を保つ"}</td><td >{"EventBridge、SSM Automation、IaC"}</td></tr><tr className="even"><td >{"暗号化の徹底"}</td><td >{"保存時も転送時も暗号化"}</td><td >{"KMS、ACM、TLS 強制"}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<p >{"\n                    根拠: AWS Well-Architected Framework Security Pillar\n                    "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html">{"https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html"}</a>{"\n                "}</p>
{"\n                "}
<h3 id="13-iam-ポリシーの最低限の読み方" tabIndex={-1}>{"1.3 IAM ポリシーの最低限の読み方"}</h3>
{"\n                "}
<p >{"\n                    試験ガイドの旧版にあった「Principal / Action / Resource /\n                    Condition」は、問題文のポリシー JSON を読むために今でも必要です。\n                "}</p>
{"\n                "}
<div className="codeblock">{"\n                    "}<span className="lang">{"json"}</span>{"\n                    "}<div className="code-block" tabIndex={0} role="region" aria-label="1.3 IAM ポリシーの最低限の読み方 コード1"><div className="code-line"><code ><span className="p">{"{"}</span></code></div>
<div className="code-line"><code ><span className="w">{"  "}</span></code><code ><span className="nt">{"\"Version\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="s2">{"\"2012-10-17\""}</span></code><code ><span className="p">{","}</span></code></div>
<div className="code-line"><code ><span className="w">{"  "}</span></code><code ><span className="nt">{"\"Statement\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="p">{"["}</span></code></div>
<div className="code-line"><code ><span className="w">{"    "}</span></code><code ><span className="p">{"{"}</span></code></div>
<div className="code-line"><code ><span className="w">{"      "}</span></code><code ><span className="nt">{"\"Sid\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="s2">{"\"AllowReadOnlyToReportsBucket\""}</span></code><code ><span className="p">{","}</span></code></div>
<div className="code-line"><code ><span className="w">{"      "}</span></code><code ><span className="nt">{"\"Effect\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="s2">{"\"Allow\""}</span></code><code ><span className="p">{","}</span></code></div>
<div className="code-line"><code ><span className="w">{"      "}</span></code><code ><span className="nt">{"\"Action\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="p">{"["}</span></code><code ><span className="s2">{"\"s3:GetObject\""}</span></code><code ><span className="p">{","}</span></code><code ><span className="w">{" "}</span></code><code ><span className="s2">{"\"s3:ListBucket\""}</span></code><code ><span className="p">{"],"}</span></code></div>
<div className="code-line"><code ><span className="w">{"      "}</span></code><code ><span className="nt">{"\"Resource\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="p">{"["}</span></code></div>
<div className="code-line"><code ><span className="w">{"        "}</span></code><code ><span className="s2">{"\"arn:aws:s3:::example-reports\""}</span></code><code ><span className="p">{","}</span></code></div>
<div className="code-line"><code ><span className="w">{"        "}</span></code><code ><span className="s2">{"\"arn:aws:s3:::example-reports/*\""}</span></code></div>
<div className="code-line"><code ><span className="w">{"      "}</span></code><code ><span className="p">{"],"}</span></code></div>
<div className="code-line"><code ><span className="w">{"      "}</span></code><code ><span className="nt">{"\"Condition\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="p">{"{"}</span></code></div>
<div className="code-line"><code ><span className="w">{"        "}</span></code><code ><span className="nt">{"\"Bool\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="p">{"{"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="nt">{"\"aws:SecureTransport\""}</span></code><code ><span className="p">{":"}</span></code><code ><span className="w">{" "}</span></code><code ><span className="s2">{"\"true\""}</span></code><code ><span className="w">{" "}</span></code><code ><span className="p">{"}"}</span></code></div>
<div className="code-line"><code ><span className="w">{"      "}</span></code><code ><span className="p">{"}"}</span></code></div>
<div className="code-line"><code ><span className="w">{"    "}</span></code><code ><span className="p">{"}"}</span></code></div>
<div className="code-line"><code ><span className="w">{"  "}</span></code><code ><span className="p">{"]"}</span></code></div>
<div className="code-line"><code ><span className="p">{"}"}</span></code></div></div>{"\n                "}</div>
{"\n                "}
<div className="table-scroll" role="region" tabIndex={0} aria-label="1.3 IAM ポリシーの最低限の読み方 表6">{"\n                    "}<table ><thead ><tr className="header"><th scope="col">{"要素"}</th><th scope="col">{"役割"}</th><th scope="col">{"補足"}</th></tr></thead><tbody ><tr className="odd"><td >{"Effect"}</td><td >{"Allow か Deny"}</td><td >{"明示的 Deny は常に最優先"}</td></tr><tr className="even"><td >{"Action"}</td><td >{"許可/拒否する API"}</td><td >{"ワイルドカードは最小限に"}</td></tr><tr className="odd"><td >{"Resource"}</td><td >{"対象リソースの ARN"}</td><td >{"\n                                    バケット自体(ListBucket)とオブジェクト(GetObject)で ARN\n                                    が異なる点に注意\n                                "}</td></tr><tr className="even"><td >{"Principal"}</td><td >{"誰に対してか"}</td><td >{"リソースベースポリシーと信頼ポリシーにのみ登場"}</td></tr><tr className="odd"><td >{"Condition"}</td><td >{"追加条件"}</td><td >{"タグ、送信元 IP、TLS 使用有無、MFA など"}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<h3 id="14-主要サービスの地図" tabIndex={-1}>{"1.4 主要サービスの地図"}</h3>
{"\n                "}
<Diagram id="diagram-3" label="1.4 主要サービスの地図 図3" />
{"\n                "}
<div className="callout-practice">{"\n                    "}<div className="icon">{"✓"}</div>{"\n                    "}<div className="body">{"\n                        "}<div className="label">{"ポイント"}</div>{"\n                        "}<p >{"\n                            「記録(Logs)を集め、検出サービスが分析し、Security Hub\n                            に集約され、EventBridge\n                            から自動対応につながる」という一本の流れで全体を理解すると、各サービスの位置づけが迷いません。\n                        "}</p>{"\n                    "}</div>{"\n                "}</div>
{"\n                "}
<hr  />
{"\n                "}
</div>; }
