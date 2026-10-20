import {Diagram} from '../Diagram';
/** 原本のtask3を全文・順序どおり保持する。 */
export default function Task13(){return <section className="guide-part" data-part="task3"><h2 id={"task-13-ロードバランシング設計"} tabIndex={-1}>{"Task 1.3: ロードバランシング設計"}</h2>
{" "}
<p >{" タスク文: 高可用性、スケーラビリティ、セキュリティの要件を満たすために、ロードバランシングを統合したソリューションを設計する。 "}</p>
{" "}
<h3 id={"試験ガイドが求める内容-2"} tabIndex={-1}>{"試験ガイドが求める内容"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"試験ガイドが求める内容（表27）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"項目"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Knowledge"}</td><td >{"OSI 参照モデルの L3、L4、L7 でのロードバランシングの仕組み"}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{" ロードバランサーの種類と、ネットワーク設計、高可用性、セキュリティの要件への適合 "}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{" ユースケースに応じた接続パターン (内部向け、外部向けロードバランサーなど) "}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{"ロードバランサーのスケーリング要因"}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{" 他サービス (Global Accelerator、CloudFront、AWS WAF、Route 53、Amazon EKS、ACM) との統合 "}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{" 設定オプション (プロキシプロトコル、クロスゾーン負荷分散、セッションアフィニティ、ルーティングアルゴリズム) "}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{" ターゲットグループの設定オプション (TCP、GENEVE、IP とインスタンスの違い) "}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{"Kubernetes クラスター向けの AWS Load Balancer Controller"}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{"暗号化と認証の考慮事項 (TLS 終端、TLS パススルー)"}</td></tr><tr className={"even"}><td >{"Skills"}</td><td >{" ユースケースに応じたロードバランサーの選択、Auto Scaling との統合、既存アプリケーション環境との統合 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-1-ロードバランサーの種類を理解する"} tabIndex={-1}>{" ステップ 1: ロードバランサーの種類を理解する "}</h3>
{" "}
<p >{" Elastic Load Balancing (ELB) には、主に次の 3 種類の現行ロードバランサーがあります (Classic Load Balancer は旧世代)。 "}</p>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 1: ロードバランサーの種類を理解する（表28）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"動作する層"}</th><th scope="col">{"主なプロトコル"}</th><th scope="col">{"得意なこと"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Application Load Balancer (ALB)"}</td><td >{"L7"}</td><td >{"HTTP、HTTPS、gRPC、WebSocket"}</td><td >{"パスやホスト名によるルーティング、認証、WAF 連携"}</td></tr><tr className={"even"}><td >{"Network Load Balancer (NLB)"}</td><td >{"L4"}</td><td >{"TCP、UDP、TLS"}</td><td >{" 超低遅延、高スループット、静的 IP、送信元 IP の保持、PrivateLink "}</td></tr><tr className={"odd"}><td >{"Gateway Load Balancer (GWLB)"}</td><td >{"L3 のゲートウェイと L4 の負荷分散"}</td><td >{"IP パケット (GENEVE でカプセル化)"}</td><td >{" ファイアウォールや IDS などの仮想アプライアンスの透過的な挿入 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"ALB の詳細"}</h4>
{" "}
<ul >{" "}<li >{" リスナールールの条件として、ホスト名、パス、HTTP ヘッダー、HTTP メソッド、クエリ文字列、送信元 IP を使える。 "}</li>{" "}<li >{" アクションは、転送、リダイレクト、固定レスポンス、認証 (Amazon Cognito または OIDC 対応の IdP) など。 "}</li>{" "}<li >{"ターゲットの種類は、インスタンス、IP アドレス、Lambda 関数。"}</li>{" "}<li >{" 加重ターゲットグループで、ブルーグリーンデプロイやカナリアリリースができる。 "}</li>{" "}<li >{"AWS WAF を直接関連付けられる。"}</li>{" "}<li >{" 静的 IP アドレスは持たない (ノードの IP は変わるため、必ず DNS 名を使う)。クライアントの IP は X-Forwarded-For ヘッダーで確認する。 "}</li>{" "}<li >{"相互 TLS (mTLS) に対応している。"}</li>{" "}</ul>
{" "}
<h4 >{"NLB の詳細"}</h4>
{" "}
<ul >{" "}<li >{" AZ ごとに静的 IP アドレス (Elastic IP を割り当て可能) を持つため、固定 IP が必要な要件や、ファイアウォールでの許可リストに適する。 "}</li>{" "}<li >{" 送信元 IP アドレスを保持できる。ターゲットの種類によって挙動が異なる点に注意する (IP ターゲットではプロキシプロトコル v2 の利用が有効な場面がある)。 "}</li>{" "}<li >{" TLS リスナーで ACM の証明書を使った TLS 終端ができる。または TCP リスナーで暗号化されたままバックエンドへ通す (TLS パススルー)。 "}</li>{" "}<li >{"セキュリティグループを関連付けられる (作成時に設定)。"}</li>{" "}<li >{" AWS PrivateLink のエンドポイントサービスの裏側には、NLB か GWLB が必要。 "}</li>{" "}<li >{" ALB をターゲットにできるため、ALB の前に NLB を置いて静的 IP を得る構成が可能 (Global Accelerator でも代替できる)。 "}</li>{" "}</ul>
{" "}
<h4 >{"GWLB の詳細"}</h4>
{" "}
<ul >{" "}<li >{" セキュリティアプライアンス (次世代ファイアウォール、IDS、IPS など) の前段に置く。 "}</li>{" "}<li >{" GENEVE プロトコル (UDP のポート 6081) で、元のパケットをカプセル化してアプライアンスへ渡す。 "}</li>{" "}<li >{" 利用側の VPC には、GWLB エンドポイント (GWLBe) を作り、ルートテーブルのターゲットに指定してトラフィックを通す。 "}</li>{" "}<li >{"フロー単位のスティッキネス (同じフローは同じアプライアンスへ) を保つ。"}</li>{" "}<li >{" 集中型の検査 VPC を作り、Transit Gateway で各 VPC から集約する構成が代表的 (Task 1.6)。 "}</li>{" "}</ul>
{" "}
<h4 >{"選び方の早見表"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"選び方の早見表（表29）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"要件"}</th><th scope="col">{"選択"}</th></tr></thead><tbody ><tr className={"odd"}><td >{" パスやホスト名で振り分けたい、WAF を使いたい、Cognito 認証をしたい "}</td><td >{"ALB"}</td></tr><tr className={"even"}><td >{"固定 IP、UDP、超低遅延、数百万の同時接続"}</td><td >{"NLB"}</td></tr><tr className={"odd"}><td >{"PrivateLink でサービスを公開したい"}</td><td >{"NLB (または GWLB)"}</td></tr><tr className={"even"}><td >{" サードパーティのセキュリティアプライアンスを透過的に挟みたい "}</td><td >{"GWLB"}</td></tr><tr className={"odd"}><td >{"gRPC や HTTP/2、WebSocket"}</td><td >{"ALB"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-8" label={"選び方の早見表"} />
{" "}
<h3 id={"ステップ-2-接続パターン-内部向けと外部向け"} tabIndex={-1}>{" ステップ 2: 接続パターン (内部向けと外部向け) "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 2: 接続パターン (内部向けと外部向け)（表30）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"配置"}</th><th scope="col">{"用途"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"インターネット向け (外部)"}</td><td >{" パブリックサブネットにノードを置く。パブリック IP を持ち、インターネットゲートウェイ経由で受ける "}</td><td >{"公開 Web、公開 API"}</td></tr><tr className={"even"}><td >{"内部向け"}</td><td >{"プライベートサブネットにノードを置く。プライベート IP のみ"}</td><td >{"多層構成の内部通信、オンプレミスや他 VPC からの内部アクセス"}</td></tr></tbody></table>{" "}</div>
{" "}
<ul >{" "}<li >{" 公開する場合は、ロードバランサーだけをパブリックサブネットに置き、アプリケーションサーバーはプライベートサブネットに置く。 "}</li>{" "}<li >{" ロードバランサーは、必ず複数の AZ のサブネットに配置して可用性を確保する。 "}</li>{" "}<li >{" 内部向けのロードバランサーは、Direct Connect や VPN を経由して、オンプレミスから利用できる。逆に、IP ターゲットを使うと、オンプレミスや他 VPC のサーバーを、ロードバランサーのターゲットにできる (到達可能な、許可された IP 範囲が対象)。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-3-ターゲットグループの設定"} tabIndex={-1}>{" ステップ 3: ターゲットグループの設定 "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 3: ターゲットグループの設定（表31）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"設定"}</th><th scope="col">{"選択肢と意味"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"ターゲットタイプ"}</td><td >{" instance (インスタンス ID を指定)、ip (IP アドレスを指定。オンプレミスや他 VPC、コンテナのタスクを指定できる)、lambda、alb (NLB のターゲットとして ALB を指定) "}</td></tr><tr className={"even"}><td >{"プロトコル"}</td><td >{" HTTP、HTTPS、gRPC (ALB)。TCP、UDP、TCP_UDP、TLS (NLB)。GENEVE (GWLB) "}</td></tr><tr className={"odd"}><td >{"ヘルスチェック"}</td><td >{" プロトコル、パス、間隔、しきい値を設定して、異常なターゲットを自動で除外する "}</td></tr><tr className={"even"}><td >{"登録解除の遅延"}</td><td >{" ターゲットを外す際に、処理中のリクエストが終わるのを待つ時間 (コネクションドレイニング) "}</td></tr><tr className={"odd"}><td >{"スロースタート"}</td><td >{"新しいターゲットへのリクエストを徐々に増やす (ALB)"}</td></tr></tbody></table>{" "}</div>
{" "}
<p >{" instance タイプと ip タイプの違い: instance は ENI のプライマリのプライベート IP 宛てに転送するのに対し、ip は指定した任意の IP 宛てに転送する。ECS や EKS で、コンテナが独自の ENI と IP を持つ場合 (awsvpc モードや VPC CNI) は ip タイプが適する。 "}</p>
{" "}
<h3 id={"ステップ-4-設定オプション"} tabIndex={-1}>{"ステップ 4: 設定オプション"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 4: 設定オプション（表32）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"オプション"}</th><th scope="col">{"説明"}</th><th scope="col">{"要点"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"クロスゾーン負荷分散"}</td><td >{"すべての AZ のターゲットに均等に振り分ける"}</td><td >{" ALB は常に有効 (ターゲットグループ単位で無効化可能)。NLB と GWLB は既定で無効。有効にすると AZ 間のデータ転送料金が発生することがある (NLB) "}</td></tr><tr className={"even"}><td >{"セッションアフィニティ (スティッキーセッション)"}</td><td >{"同じクライアントを同じターゲットへ送り続ける"}</td><td >{" ALB では、期間ベース (ロードバランサーが Cookie を発行) とアプリケーションベース (アプリが Cookie を発行) がある。NLB はフローハッシュで、送信元 IP などに基づく "}</td></tr><tr className={"odd"}><td >{"ルーティングアルゴリズム"}</td><td >{" ALB は、ラウンドロビン (既定)、最小未処理リクエスト、加重ランダム。NLB は、フローハッシュ "}</td><td >{" リクエストの処理時間にばらつきが大きいときは、最小未処理リクエストが有効 "}</td></tr><tr className={"even"}><td >{"プロキシプロトコル"}</td><td >{" 接続元の情報を、TCP 接続の先頭に付けて、バックエンドへ伝える (NLB は v2) "}</td><td >{"バックエンドがプロキシプロトコルを解釈できる必要がある"}</td></tr><tr className={"odd"}><td >{"送信元 IP の取得"}</td><td >{" ALB は X-Forwarded-For ヘッダー。NLB は送信元 IP の保持、またはプロキシプロトコル "}</td><td >{"用途に応じて使い分ける"}</td></tr><tr className={"even"}><td >{"アイドルタイムアウト"}</td><td >{"接続が無通信で保持される時間 (ALB の既定は 60 秒)"}</td><td >{" 長時間の処理があるアプリは、値の調整やキープアライブを検討する "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-5-暗号化と認証-tls-終端とパススルー"} tabIndex={-1}>{" ステップ 5: 暗号化と認証 (TLS 終端とパススルー) "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 5: 暗号化と認証 (TLS 終端とパススルー)（表33）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"パターン"}</th><th scope="col">{"動き"}</th><th scope="col">{"メリット"}</th><th scope="col">{"デメリットや注意点"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"TLS 終端 (オフロード)"}</td><td >{" ロードバランサーで復号し、バックエンドには平文 (HTTP) で渡す "}</td><td >{" 証明書管理を ACM と ELB に集約でき、バックエンドの負荷が減る。ALB は L7 の機能を使える "}</td><td >{"ロードバランサーからバックエンドの区間は平文になる"}</td></tr><tr className={"even"}><td >{"再暗号化 (エンドツーエンド TLS)"}</td><td >{" ロードバランサーで復号して検査した後、再度暗号化してバックエンドへ送る "}</td><td >{"全区間で暗号化できる。ALB の L7 機能も使える"}</td><td >{" バックエンドにも証明書が必要。ALB はバックエンドの証明書の有効性までは検証しない "}</td></tr><tr className={"odd"}><td >{"TLS パススルー"}</td><td >{"NLB の TCP リスナーで、暗号化されたままバックエンドに通す"}</td><td >{" 暗号化を変更せずに通し、バックエンドで終端する。クライアント証明書を、バックエンドで直接検証できる "}</td><td >{"L7 の機能は使えず、バックエンドが証明書を管理する"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-9" label={"ステップ 5: 暗号化と認証 (TLS 終端とパススルー)"} />
{" "}
<ul >{" "}<li >{" 複数のドメインの証明書を 1 つのリスナーに置く場合は、SNI (Server Name Indication) を使う。 "}</li>{" "}<li >{" セキュリティポリシー (対応する TLS バージョンと暗号スイート) を、要件に合わせて選ぶ。 "}</li>{" "}<li >{" ALB では、Cognito や OIDC 対応の IdP による認証を、リスナールールのアクションで実装できる。 "}</li>{" "}<li >{" 証明書の発行と更新は、AWS Certificate Manager (ACM) を使うと自動化できる。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-6-スケーリングの要因"} tabIndex={-1}>{"ステップ 6: スケーリングの要因"}</h3>
{" "}
<ul >{" "}<li >{"ALB と NLB は、トラフィックに応じて自動でスケールする。"}</li>{" "}<li >{" 急激な (数分での) 大幅なトラフィック増が予想される場合は、事前に AWS サポートに相談するか、ALB のキャパシティユニットの予約機能を検討する。 "}</li>{" "}<li >{" ALB は、サブネットに十分な空き IP アドレス (少なくとも 8 個。/27 以上のサブネットを推奨) が必要。スケール時にノードが追加されるため。 "}</li>{" "}<li >{" ALB のノードの IP アドレスは変わるので、IP アドレスを固定して前提にしない。必ず DNS 名を使う。 "}</li>{" "}<li >{" 課金とスケールの単位は、ALB は LCU (ロードバランサーキャパシティユニット)、NLB は NLCU で、CloudWatch メトリクスで消費量を確認できる。 "}</li>{" "}<li >{" AZ の偏りがある場合は、クロスゾーン負荷分散の設定で、ターゲットへの負荷の均等性が変わる。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-7-auto-scaling-との統合"} tabIndex={-1}>{"ステップ 7: Auto Scaling との統合"}</h3>
{" "}
<ol >{" "}<li >{" ターゲットグループを Auto Scaling グループ (ASG) にアタッチする。インスタンスは起動時に自動で登録され、終了時に自動で登録解除される。 "}</li>{" "}<li >{" ASG のヘルスチェックタイプを ELB にして、ロードバランサーのヘルスチェックで異常と判断されたインスタンスを、ASG が自動で置き換える。 "}</li>{" "}<li >{" スケーリングポリシーに、ターゲット追跡スケーリングで、ターゲットあたりのリクエスト数 (ALBRequestCountPerTarget) を使うと、負荷に応じた台数調整ができる。 "}</li>{" "}<li >{" 登録解除の遅延とライフサイクルフックを使い、スケールイン時にも処理中のリクエストを安全に完了させる。 "}</li>{" "}<li >{" ウォームプールとスロースタートで、新しいインスタンスの立ち上がりによる性能劣化を和らげる。 "}</li>{" "}</ol>
{" "}
<h3 id={"ステップ-8-他サービスとの統合"} tabIndex={-1}>{"ステップ 8: 他サービスとの統合"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 8: 他サービスとの統合（表34）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"統合先"}</th><th scope="col">{"統合の内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Global Accelerator"}</td><td >{" ALB や NLB をエンドポイントにして、静的 IP とバックボーン経由の高速化を得る "}</td></tr><tr className={"even"}><td >{"CloudFront"}</td><td >{"ALB をオリジンにする。VPC オリジンで、ALB を非公開にできる"}</td></tr><tr className={"odd"}><td >{"AWS WAF"}</td><td >{" ALB (と CloudFront、API Gateway など) に関連付ける。NLB には直接関連付けられない "}</td></tr><tr className={"even"}><td >{"Route 53"}</td><td >{" エイリアスレコードで、ELB の DNS 名を指す。ヘルスの評価と連動できる "}</td></tr><tr className={"odd"}><td >{"ACM"}</td><td >{"リスナーの証明書を、発行と自動更新で管理する"}</td></tr><tr className={"even"}><td >{"Amazon EKS"}</td><td >{" AWS Load Balancer Controller で、Ingress から ALB を、Service から NLB を自動作成する "}</td></tr><tr className={"odd"}><td >{"PrivateLink"}</td><td >{"NLB (または GWLB) を、エンドポイントサービスとして公開する"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-9-aws-load-balancer-controller-kubernetes"} tabIndex={-1}>{" ステップ 9: AWS Load Balancer Controller (Kubernetes) "}</h3>
{" "}
<p >{" AWS Load Balancer Controller は、EKS などの Kubernetes クラスターで動く Controller で、Kubernetes のリソースの定義に応じて、ELB を自動で作成し管理します。 "}</p>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 9: AWS Load Balancer Controller (Kubernetes)（表35）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"Kubernetes のリソース"}</th><th scope="col">{"作られる AWS のリソース"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Ingress"}</td><td >{" ALB (L7 のルーティング。アノテーションで、スキーム、証明書、WAF などを設定) "}</td></tr><tr className={"even"}><td >{"Service (type が LoadBalancer)"}</td><td >{"NLB (L4。アノテーションで、ターゲットタイプなどを設定)"}</td></tr><tr className={"odd"}><td >{"TargetGroupBinding"}</td><td >{"既存のターゲットグループに、Pod を登録する"}</td></tr></tbody></table>{" "}</div>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 9: AWS Load Balancer Controller (Kubernetes)（表36）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"ターゲットタイプ"}</th><th scope="col">{"動作"}</th><th scope="col">{"特徴"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"ip モード"}</td><td >{" ロードバランサーが、Pod の IP アドレスへ直接転送する (VPC CNI を使用) "}</td><td >{" ノードを経由する追加のホップがなく、効率が良い。Pod 単位のヘルスチェックができる "}</td></tr><tr className={"even"}><td >{"instance モード"}</td><td >{"ノードの NodePort へ転送し、kube-proxy が Pod へ振り分ける"}</td><td >{"余分なホップが発生する"}</td></tr></tbody></table>{" "}</div>
{" "}
<div className="code-block" role="region" tabIndex={0} aria-label={"ステップ 9: AWS Load Balancer Controller (Kubernetes)（コード3）"}><div className="code-line"><span className="ans-code-token-0">{"# Ingress から ALB を作る例 (ip モード、インターネット向け)"}</span></div>
<div className="code-line"><span className="ans-code-token-6">{"apiVersion"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"networking.k8s.io/v1"}</div>
<div className="code-line"><span className="ans-code-token-6">{"kind"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"Ingress"}</div>
<div className="code-line"><span className="ans-code-token-6">{"metadata"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span><span className="ans-code-token-6">{"name"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"web-ingress"}</div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span><span className="ans-code-token-6">{"annotations"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"    "}</span><span className="ans-code-token-6">{"alb.ingress.kubernetes.io/scheme"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"internet-facing"}</div>
<div className="code-line"><span className="ans-code-token-1">{"    "}</span><span className="ans-code-token-6">{"alb.ingress.kubernetes.io/target-type"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"ip"}</div>
<div className="code-line"><span className="ans-code-token-1">{"    "}</span><span className="ans-code-token-6">{"alb.ingress.kubernetes.io/listen-ports"}</span>{":"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-3">{"'[{\"HTTPS\":443}]'"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"    "}</span><span className="ans-code-token-6">{"alb.ingress.kubernetes.io/certificate-arn"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"arn:aws:acm:ap-northeast-1:111122223333:certificate/example"}</div>
<div className="code-line"><span className="ans-code-token-6">{"spec"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span><span className="ans-code-token-6">{"ingressClassName"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"alb"}</div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span><span className="ans-code-token-6">{"rules"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"    "}</span>{"-"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-6">{"http"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"        "}</span><span className="ans-code-token-6">{"paths"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"          "}</span>{"-"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-6">{"path"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"/"}</div>
<div className="code-line"><span className="ans-code-token-1">{"            "}</span><span className="ans-code-token-6">{"pathType"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"Prefix"}</div>
<div className="code-line"><span className="ans-code-token-1">{"            "}</span><span className="ans-code-token-6">{"backend"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"              "}</span><span className="ans-code-token-6">{"service"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"                "}</span><span className="ans-code-token-6">{"name"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"web"}</div>
<div className="code-line"><span className="ans-code-token-1">{"                "}</span><span className="ans-code-token-6">{"port"}</span>{":"}</div>
<div className="code-line"><span className="ans-code-token-1">{"                  "}</span><span className="ans-code-token-6">{"number"}</span>{":"}<span className="ans-code-token-1">{" "}</span>{"80"}</div></div>
{" "}
<Diagram id="diag-10" label={"ステップ 9: AWS Load Balancer Controller (Kubernetes)"} />
{" "}
<ul >{" "}<li >{" Controller には IAM の権限が必要 (IAM Roles for Service Accounts、または EKS Pod Identity で付与する)。 "}</li>{" "}<li >{" ロードバランサーを自動で配置するサブネットは、kubernetes.io/role/elb (公開用) と kubernetes.io/role/internal-elb (内部用) のタグで識別される。 "}</li>{" "}<li >{" IngressGroup の機能で、複数の Ingress が 1 つの ALB を共有でき、コストを抑えられる。 "}</li>{" "}</ul>
{" "}
<h3 id={"ベストプラクティス-task-13"} tabIndex={-1}>{"ベストプラクティス (Task 1.3)"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス (Task 1.3)（表37）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"ベストプラクティス"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"可用性"}</td><td >{" 複数 AZ に配置し、ターゲットも複数 AZ に分散する。ヘルスチェックは実際のアプリの健全性を反映するパスにする "}</td></tr><tr className={"even"}><td >{"公開範囲"}</td><td >{" ロードバランサーだけをパブリックに置き、ターゲットはプライベートサブネットに置く "}</td></tr><tr className={"odd"}><td >{"セキュリティ"}</td><td >{" ターゲットのセキュリティグループは、ロードバランサーのセキュリティグループからの通信のみ許可する (セキュリティグループの参照) "}</td></tr><tr className={"even"}><td >{"防御"}</td><td >{" ALB には AWS WAF を関連付け、前段に CloudFront や Shield を併用する "}</td></tr><tr className={"odd"}><td >{"TLS"}</td><td >{" 最新のセキュリティポリシーを選び、証明書は ACM で自動更新する "}</td></tr><tr className={"even"}><td >{"スケール"}</td><td >{" ASG と連携し、ターゲット追跡スケーリングで自動化する。急激な増加は事前に備える "}</td></tr><tr className={"odd"}><td >{"接続"}</td><td >{"DNS 名で参照し、IP アドレスに依存しない"}</td></tr><tr className={"even"}><td >{"ログ"}</td><td >{"アクセスログを有効にする (Task 1.4)"}</td></tr><tr className={"odd"}><td >{"コンテナ"}</td><td >{" EKS では、ip モードと AWS Load Balancer Controller を使い、Pod へ直接転送する "}</td></tr><tr className={"even"}><td >{"運用"}</td><td >{"登録解除の遅延を適切に設定し、デプロイ時の接続断を防ぐ"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"選択のコツと試験での落とし穴-2"} tabIndex={-1}>{"選択のコツと試験での落とし穴"}</h3>
{" "}
<ul >{" "}<li >{" 「静的 IP が必要」「UDP」と書かれていれば NLB。ALB には静的 IP も UDP もない。 "}</li>{" "}<li >{"「パスベースのルーティング」「ホストヘッダー」「WAF」は ALB。"}</li>{" "}<li >{"「ファイアウォールアプライアンスを透過的に」は GWLB (GENEVE)。"}</li>{" "}<li >{" NLB にはセキュリティグループを後付けできないなど、作成時の設定に制約がある場合がある。最新の仕様を確認する。 "}</li>{" "}<li >{" 「クライアント証明書をバックエンドで検証したい」は、NLB の TLS パススルーを考える。 "}</li>{" "}<li >{" 「クライアントの本当の IP が知りたい」は、ALB なら X-Forwarded-For。NLB なら送信元 IP の保持か、プロキシプロトコル。 "}</li>{" "}<li >{"クロスゾーン負荷分散は、ALB は既定で有効、NLB と GWLB は既定で無効。"}</li>{" "}</ul>
{" "}
<div className={"source-block"}>{" "}<p className={"source-head"} data-count={"6 件"}>{"出典:"}</p>{" "}<ul className={"source-grid"}>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/elasticloadbalancing/.../what-is-load-balancing.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/what-is-load-balancing.html"}>{"Elastic Load Balancing とは"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/elasticloadbalancing/latest/application/introduction.html"}>{"Application Load Balancer"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/elasticloadbalancing/latest/network/introduction.html"}>{"Network Load Balancer"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/elasticloadbalancing/latest/gateway/introduction.html"}>{"Gateway Load Balancer"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/eks/.../aws-load-balancer-controller.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html"}>{"Amazon EKS の AWS Load Balancer Controller"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html"}>{"AWS Certificate Manager とは"}</a>{" "}</li>{" "}</ul>{" "}</div>
{" "}</section>;}
