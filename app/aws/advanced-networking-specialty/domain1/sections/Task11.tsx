import {Diagram} from '../Diagram';
/** 原本のtask1を全文・順序どおり保持する。 */
export default function Task11(){return <section className="guide-part" data-part="task1"><h2 id={"task-11-エッジネットワークサービス"} tabIndex={-1}>{" Task 1.1: エッジネットワークサービス "}</h2>
{" "}
<p >{" タスク文: グローバルなアーキテクチャで、ユーザーパフォーマンスとトラフィック管理を最適化するエッジネットワークサービスを組み込んだソリューションを設計する。 "}</p>
{" "}
<h3 id={"試験ガイドが求める内容"} tabIndex={-1}>{"試験ガイドが求める内容"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"試験ガイドが求める内容（表6）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"項目"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Knowledge"}</td><td >{" コンテンツ配信ネットワーク (例: Amazon CloudFront) の設計パターン "}</td></tr><tr className={"even"}><td >{"Knowledge"}</td><td >{" グローバルトラフィック管理 (例: AWS Global Accelerator) の設計パターン "}</td></tr><tr className={"odd"}><td >{"Knowledge"}</td><td >{" 上記と他サービス (例: Elastic Load Balancing、Amazon API Gateway) との統合パターン "}</td></tr><tr className={"even"}><td >{"Skills"}</td><td >{" インターネットからのグローバルな受信と送信トラフィックの要件を評価し、適切なコンテンツ配信ソリューションを設計する "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"ステップ-1-なぜエッジサービスが必要か"} tabIndex={-1}>{" ステップ 1: なぜエッジサービスが必要か "}</h3>
{" "}
<p >{" ユーザーが地球の反対側にあるリージョンのアプリケーションへ直接アクセスすると、次の問題が起きます。 "}</p>
{" "}
<ul >{" "}<li >{"物理的な距離による遅延 (往復時間) が大きい"}</li>{" "}<li >{"TCP と TLS のハンドシェイクで何度も往復するため、遅延が何倍にも膨らむ"}</li>{" "}<li >{"インターネット経路は混雑や障害の影響を受け、品質が安定しない"}</li>{" "}</ul>
{" "}
<p >{" エッジサービスは、ユーザーの近くで通信を受け止め、そこから先を AWS のグローバルバックボーンネットワークで運ぶことで、これらを改善します。 "}</p>
{" "}
<h3 id={"ステップ-2-amazon-cloudfront-を理解する"} tabIndex={-1}>{" ステップ 2: Amazon CloudFront を理解する "}</h3>
{" "}
<p >{" CloudFront は HTTP と HTTPS のコンテンツを世界中のエッジロケーションでキャッシュして配信する CDN です。静的コンテンツだけでなく、動的コンテンツや API の高速化にも使えます。 "}</p>
{" "}
<h4 >{"CloudFront の基本構成要素"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"CloudFront の基本構成要素（表7）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"意味"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"ディストリビューション"}</td><td >{" CloudFront の配信設定の単位。ドメイン名 (xxxx.cloudfront.net) が割り当てられる "}</td></tr><tr className={"even"}><td >{"オリジン"}</td><td >{" コンテンツの取得元。S3、ALB、API Gateway、EC2、オンプレミスのサーバーなど "}</td></tr><tr className={"odd"}><td >{"エッジロケーション"}</td><td >{"ユーザーに最も近い配信拠点"}</td></tr><tr className={"even"}><td >{"リージョナルエッジキャッシュ"}</td><td >{"エッジロケーションとオリジンの間にある中間キャッシュ層"}</td></tr><tr className={"odd"}><td >{"Origin Shield"}</td><td >{" オリジンの手前に追加する集中キャッシュ層。オリジンへのリクエストを集約する "}</td></tr><tr className={"even"}><td >{"キャッシュビヘイビア"}</td><td >{" パスパターンごとに、オリジン、キャッシュ設定、許可メソッドなどを切り替える設定 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"リクエストが処理される流れ"}</h4>
{" "}
<Diagram id="diag-2" label={"リクエストが処理される流れ"} />
{" "}
<h4 >{"キャッシュを制御する 3 つのポリシー"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"キャッシュを制御する 3 つのポリシー（表8）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"ポリシー"}</th><th scope="col">{"役割"}</th><th scope="col">{"設計の考え方"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"キャッシュポリシー"}</td><td >{" キャッシュキー (何を同一リクエストとみなすか) と TTL を決める "}</td><td >{" キャッシュキーに含める要素は必要最小限にして、ヒット率を上げる "}</td></tr><tr className={"even"}><td >{"オリジンリクエストポリシー"}</td><td >{" キャッシュキーには含めないが、オリジンに転送する情報を決める "}</td><td >{"認証ヘッダーなどを転送しつつ、キャッシュは分断させない"}</td></tr><tr className={"odd"}><td >{"レスポンスヘッダーポリシー"}</td><td >{"CORS やセキュリティヘッダーを付与する"}</td><td >{"HSTS などをエッジで一括付与する"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"オリジンのアクセス保護"}</h4>
{" "}
<ul >{" "}<li >{" S3 オリジンには、Origin Access Control (OAC) を使い、CloudFront 経由でのみ S3 を読めるようにする。旧方式の OAI よりも、SSE-KMS やすべてのリージョンへの対応など機能が広い。 "}</li>{" "}<li >{" ALB や EC2 オリジンを、インターネットに公開せずに CloudFront の背後に置きたい場合は、VPC オリジンを使う。プライベートサブネット内のリソースをオリジンにできる。 "}</li>{" "}<li >{" VPC オリジンを使わない構成では、ALB のセキュリティグループで CloudFront のマネージドプレフィックスリスト (com.amazonaws.global.cloudfront.origin-facing) を許可し、さらに CloudFront からカスタムヘッダー (秘密の値) を付けて ALB 側で検証する、という二重の防御が定番。 "}</li>{" "}</ul>
{" "}
<div className="code-block" role="region" tabIndex={0} aria-label={"オリジンのアクセス保護（コード1）"}><div className="code-line"><span className="ans-code-token-0">{"# CloudFront から ALB への通信だけを許可するセキュリティグループルールの例"}</span></div>
<div className="code-line"><span className="ans-code-token-0">{"# (プレフィックスリスト ID は pl- で始まる値を、リージョンごとに確認して指定する)"}</span></div>
<div className="code-line">{"aws"}<span className="ans-code-token-1">{" "}</span>{"ec2"}<span className="ans-code-token-1">{" "}</span>{"authorize-security-group-ingress"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-2">{"\\"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span>{"--group-id"}<span className="ans-code-token-1">{" "}</span>{"sg-0123456789abcdef0"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-2">{"\\"}</span></div>
<div className="code-line"><span className="ans-code-token-1">{"  "}</span>{"--ip-permissions"}<span className="ans-code-token-1">{" "}</span><span className="ans-code-token-3">{"'IpProtocol=tcp,FromPort=443,ToPort=443,PrefixListIds=[{PrefixListId=pl-xxxxxxxx}]'"}</span></div></div>
{" "}
<h4 >{"配信コンテンツの保護"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"配信コンテンツの保護（表9）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"手段"}</th><th scope="col">{"用途"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"署名付き URL と署名付き Cookie"}</td><td >{" 有料コンテンツなど、特定ユーザーだけに配信する。信頼されたキーグループで署名する "}</td></tr><tr className={"even"}><td >{"AWS WAF"}</td><td >{" SQL インジェクション、レートベースルール、Bot 対策などの L7 防御 "}</td></tr><tr className={"odd"}><td >{"AWS Shield"}</td><td >{" Standard は CloudFront で自動適用。より高度な保護は Shield Advanced "}</td></tr><tr className={"even"}><td >{"地理的制限"}</td><td >{"国単位で配信を許可または拒否する"}</td></tr><tr className={"odd"}><td >{"フィールドレベル暗号化"}</td><td >{" 特定のフォーム項目をエッジで公開鍵暗号化し、オリジンの手前までは復号できないようにする "}</td></tr><tr className={"even"}><td >{"TLS 設定"}</td><td >{" 視聴者からエッジの間と、エッジからオリジンの間の両方で HTTPS を強制する "}</td></tr></tbody></table>{" "}</div>
{" "}
<p >{" 落とし穴: CloudFront のカスタムドメインに使う ACM 証明書は、バージニア北部リージョン (us-east-1) で発行する必要があります。ALB 用の証明書は ALB と同じリージョンで発行します。この違いは頻出です。 "}</p>
{" "}
<h4 >{"エッジでの処理 (CloudFront Functions と Lambda@Edge)"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"エッジでの処理 (CloudFront Functions と Lambda@Edge)（表10）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"CloudFront Functions"}</th><th scope="col">{"Lambda@Edge"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"実行タイミング"}</td><td >{"ビューアーリクエストとビューアーレスポンス"}</td><td >{"ビューアーとオリジンの両方向、計 4 か所"}</td></tr><tr className={"even"}><td >{"用途"}</td><td >{" URL の書き換え、ヘッダー操作、簡単なリダイレクトなど軽量処理 "}</td><td >{"認証、外部呼び出し、複雑な処理"}</td></tr><tr className={"odd"}><td >{"特徴"}</td><td >{"非常に低レイテンシーで低コスト。ネットワークアクセスは不可"}</td><td >{"処理能力が高く柔軟。Lambda は us-east-1 で作成する"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"可用性を高める機能"}</h4>
{" "}
<ul >{" "}<li >{" オリジンフェイルオーバー: プライマリとセカンダリのオリジンをオリジングループにまとめ、特定のステータスコードやタイムアウトで自動的に切り替える。読み取り系メソッド (GET、HEAD、OPTIONS) が対象。 "}</li>{" "}<li >{" Origin Shield: オリジンへのリクエストを集約し、オリジンの負荷とコストを減らす。オリジンに最も近いリージョンを選ぶ。 "}</li>{" "}<li >{" 継続的デプロイ: ステージング用ディストリビューションで、一部のトラフィックだけに新設定を試せる。 "}</li>{" "}</ul>
{" "}
<h4 >{"運用とコスト"}</h4>
{" "}
<ul >{" "}<li >{" 無効化 (インバリデーション) は便利だが、頻繁に行うのは避け、ファイル名にバージョンを含める運用 (例: app.v2.js) を優先する。 "}</li>{" "}<li >{" 料金クラスで、配信するエッジロケーションの範囲を絞ってコストを下げられる。 "}</li>{" "}<li >{" AWS オリジンから CloudFront へのデータ転送は課金されない。CloudFront を前段に置くと、転送コストの面でも有利になることが多い。 "}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-3-aws-global-accelerator-を理解する"} tabIndex={-1}>{" ステップ 3: AWS Global Accelerator を理解する "}</h3>
{" "}
<p >{" Global Accelerator は、2 つの静的なエニーキャスト IP アドレスを提供し、ユーザーを最寄りのエッジから AWS のバックボーン経由で最適なリージョンのエンドポイントへ導くサービスです。CloudFront と違い、キャッシュはしません。 "}</p>
{" "}
<h4 >{"主な概念"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"主な概念（表11）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"意味"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"アクセラレーター"}</td><td >{" 静的 IP アドレスを持つ、Global Accelerator の本体 (標準とカスタムルーティングの 2 種類) "}</td></tr><tr className={"even"}><td >{"リスナー"}</td><td >{" ポート範囲とプロトコル (TCP または UDP) を指定して、受信接続を待ち受ける "}</td></tr><tr className={"odd"}><td >{"エンドポイントグループ"}</td><td >{" リージョンごとのエンドポイントの集まり。トラフィックダイヤルで、リージョンへの配分割合を調整できる "}</td></tr><tr className={"even"}><td >{"エンドポイント"}</td><td >{"ALB、NLB、EC2 インスタンス、Elastic IP アドレス"}</td></tr><tr className={"odd"}><td >{"ヘルスチェックとフェイルオーバー"}</td><td >{" 異常なエンドポイントから自動で切り離す。DNS の TTL に依存しないため切り替えが速い "}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"標準アクセラレーターとカスタムルーティングアクセラレーター"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"標準アクセラレーターとカスタムルーティングアクセラレーター（表12）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"種類"}</th><th scope="col">{"特徴"}</th><th scope="col">{"典型的な用途"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"標準"}</td><td >{"最も近い正常なエンドポイントへ振り分ける"}</td><td >{"Web アプリ、API、一般的な TCP と UDP アプリ"}</td></tr><tr className={"even"}><td >{"カスタムルーティング"}</td><td >{" アプリが決めた特定の EC2 インスタンスとポートへ確定的に振り分ける "}</td><td >{"ゲームのセッション割り当て、VoIP"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"設計上のポイント"}</h4>
{" "}
<ul >{" "}<li >{" 固定 IP アドレスが必要な場合 (取引先のファイアウォールで許可 IP を固定したいなど) に強い。 "}</li>{" "}<li >{" クライアント IP アドレスの保持に対応するエンドポイントがある (詳細はドキュメントで確認)。 "}</li>{" "}<li >{" トラフィックダイヤルで、リージョン間の段階的な切り替えやメンテナンスができる。 "}</li>{" "}<li >{"BYOIP (自前の IP アドレス範囲の持ち込み) に対応している。"}</li>{" "}<li >{"ブルーグリーンのリージョン切り替えや、DR のフェイルオーバーに向く。"}</li>{" "}</ul>
{" "}
<h3 id={"ステップ-4-cloudfront-と-global-accelerator-の使い分け"} tabIndex={-1}>{" ステップ 4: CloudFront と Global Accelerator の使い分け "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 4: CloudFront と Global Accelerator の使い分け（表13）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"CloudFront"}</th><th scope="col">{"Global Accelerator"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"対象プロトコル"}</td><td >{"HTTP と HTTPS (WebSocket にも対応)"}</td><td >{"TCP と UDP (任意のポート)"}</td></tr><tr className={"even"}><td >{"キャッシュ"}</td><td >{"あり (最大の効果)"}</td><td >{"なし"}</td></tr><tr className={"odd"}><td >{"IP アドレス"}</td><td >{"エッジごとに多数で、変動する"}</td><td >{"2 つの静的エニーキャスト IP"}</td></tr><tr className={"even"}><td >{"主な効果"}</td><td >{"キャッシュヒットによる低遅延とオリジン負荷軽減"}</td><td >{"バックボーン経由の経路最適化と高速フェイルオーバー"}</td></tr><tr className={"odd"}><td >{"エッジでのコード実行"}</td><td >{"あり (Functions と Lambda@Edge)"}</td><td >{"なし"}</td></tr><tr className={"even"}><td >{"典型的な用途"}</td><td >{"静的コンテンツ、動画配信、API の高速化"}</td><td >{" ゲーム、VoIP、IoT、固定 IP が必須の API、マルチリージョンの切り替え "}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-3" label={"ステップ 4: CloudFront と Global Accelerator の使い分け"} />
{" "}
<h3 id={"ステップ-5-他サービスとの統合パターン"} tabIndex={-1}>{" ステップ 5: 他サービスとの統合パターン "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップ 5: 他サービスとの統合パターン（表14）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"パターン"}</th><th scope="col">{"構成"}</th><th scope="col">{"ポイント"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"静的 Web サイト"}</td><td >{"CloudFront とオリジンの S3 (OAC)"}</td><td >{"バケットは非公開のまま、CloudFront 経由でのみ読ませる"}</td></tr><tr className={"even"}><td >{"動的 Web アプリ"}</td><td >{" CloudFront と ALB (VPC オリジンまたは CloudFront 限定の許可) "}</td><td >{"WAF を CloudFront に付け、ALB は CloudFront からのみ受ける"}</td></tr><tr className={"odd"}><td >{"API"}</td><td >{"CloudFront と リージョナル API Gateway"}</td><td >{"API Gateway のエンドポイントタイプは次の表を参照"}</td></tr><tr className={"even"}><td >{"固定 IP の API"}</td><td >{"Global Accelerator と NLB または ALB"}</td><td >{"取引先に許可してもらう IP を 2 つに固定できる"}</td></tr><tr className={"odd"}><td >{"マルチリージョン active-active"}</td><td >{"Global Accelerator と各リージョンの ALB"}</td><td >{"ヘルスチェックによる自動フェイルオーバー"}</td></tr><tr className={"even"}><td >{"DNS との組み合わせ"}</td><td >{" Route 53 のエイリアスレコードで CloudFront や Global Accelerator を指す "}</td><td >{"独自ドメインで公開できる"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"API Gateway のエンドポイントタイプ"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"API Gateway のエンドポイントタイプ（表15）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"タイプ"}</th><th scope="col">{"特徴"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"エッジ最適化"}</td><td >{" API Gateway が管理する CloudFront を経由する (利用者側からは見えない) "}</td><td >{"世界中に分散したクライアントからの API"}</td></tr><tr className={"even"}><td >{"リージョナル"}</td><td >{" 同一リージョンのクライアント向け。自前の CloudFront を前段に置ける "}</td><td >{" CloudFront の設定 (WAF、キャッシュポリシー) を自分で細かく制御したいとき "}</td></tr><tr className={"odd"}><td >{"プライベート"}</td><td >{"インターフェイス VPC エンドポイント経由でのみアクセス可能"}</td><td >{"VPC 内部や、ハイブリッド接続された環境からの内部 API"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"補足: インバウンドとアウトバウンドの両方向を意識する"}</h4>
{" "}
<p >{" 試験ガイドのスキルは「グローバルな受信と送信トラフィックの要件を評価する」と書かれています。 "}</p>
{" "}
<ul >{" "}<li >{" 受信 (ユーザーからアプリ): CloudFront や Global Accelerator で最適化する "}</li>{" "}<li >{" 送信 (アプリからユーザーやインターネット): 大きなコンテンツの配信は CloudFront で行い、オリジンからのデータ転送コストを抑える。プライベートサブネットからのインターネット向け通信は NAT ゲートウェイや、集約したエグレス VPC を使う (Task 1.6 を参照) "}</li>{" "}<li >{" ユーザーからの大容量アップロードには、S3 Transfer Acceleration もエッジロケーションを活用する選択肢になる "}</li>{" "}</ul>
{" "}
<h3 id={"ベストプラクティス-task-11"} tabIndex={-1}>{"ベストプラクティス (Task 1.1)"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ベストプラクティス (Task 1.1)（表16）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"ベストプラクティス"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"キャッシュ"}</td><td >{" キャッシュキーを最小限にして、ヒット率を高める。URL ごとの TTL をコンテンツ特性に合わせる "}</td></tr><tr className={"even"}><td >{"オリジン保護"}</td><td >{" S3 には OAC、ALB には VPC オリジンか、プレフィックスリストとカスタムヘッダーの併用で、オリジンへの直接アクセスを塞ぐ "}</td></tr><tr className={"odd"}><td >{"暗号化"}</td><td >{" ビューアーからエッジ、エッジからオリジンの両区間で HTTPS を強制する "}</td></tr><tr className={"even"}><td >{"WAF と Shield"}</td><td >{" エッジ (CloudFront) で防御して、悪意あるトラフィックをオリジンに到達させない "}</td></tr><tr className={"odd"}><td >{"可用性"}</td><td >{" オリジンフェイルオーバー、Origin Shield、マルチリージョンオリジンを検討する "}</td></tr><tr className={"even"}><td >{"可観測性"}</td><td >{" CloudFront の標準ログやリアルタイムログと CloudWatch メトリクスで、キャッシュヒット率とエラー率を監視する "}</td></tr><tr className={"odd"}><td >{"更新"}</td><td >{"無効化に頼らず、バージョン付きファイル名で更新する"}</td></tr><tr className={"even"}><td >{"使い分け"}</td><td >{" キャッシュが効く HTTP は CloudFront、静的 IP や非 HTTP や高速切替は Global Accelerator "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"選択のコツと試験での落とし穴"} tabIndex={-1}>{"選択のコツと試験での落とし穴"}</h3>
{" "}
<ul >{" "}<li >{" 「固定 IP」「UDP」「ゲーム」「高速フェイルオーバー」というキーワードが出たら、Global Accelerator を疑う。 "}</li>{" "}<li >{" 「キャッシュ」「静的コンテンツ」「エッジで URL 書き換え」「署名付き URL」は CloudFront。 "}</li>{" "}<li >{" Route 53 のフェイルオーバーは DNS のキャッシュ (TTL) の影響を受けるが、Global Accelerator は IP が変わらないため、DNS キャッシュに依存せず切り替えられる。 "}</li>{" "}<li >{"CloudFront の ACM 証明書は us-east-1。"}</li>{" "}<li >{"「S3 のバケットを公開せずに CloudFront で配信」は OAC。"}</li>{" "}</ul>
{" "}
<div className={"source-block"}>{" "}<p className={"source-head"} data-count={"6 件"}>{"出典:"}</p>{" "}<ul className={"source-grid"}>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/AmazonCloudFront/.../Introduction.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html"}>{"Amazon CloudFront とは"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/AmazonCloudFront/.../private-content-restricting-access-to-s3.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-restricting-access-to-s3.html"}>{"CloudFront で S3 オリジンへのアクセスを制限する (OAC)"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/AmazonCloudFront/.../origin-shield.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/origin-shield.html"}>{"CloudFront Origin Shield"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/AmazonCloudFront/.../private-content-vpc-origins.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/private-content-vpc-origins.html"}>{"CloudFront の VPC オリジン"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/global-accelerator/.../what-is-global-accelerator.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html"}>{"AWS Global Accelerator とは"}</a>{" "}</li>{" "}<li >{" "}<a className={"src-card"} data-url={"docs.aws.amazon.com/apigateway/.../api-gateway-api-endpoint-types.html"} target={"_blank"} rel={"noopener noreferrer"} href={"https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html"}>{"Amazon API Gateway のエンドポイントタイプ"}</a>{" "}</li>{" "}</ul>{" "}</div>
{" "}</section>;}
