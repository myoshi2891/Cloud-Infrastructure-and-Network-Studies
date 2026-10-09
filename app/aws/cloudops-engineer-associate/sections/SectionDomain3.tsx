import { Diagram } from "../Diagram";
import CodeBlock from "../CodeBlock";


/**
 * SectionDomain3
 */
export default function SectionDomain3() {
    return (
        <>
<h1 id="s-h1-3">Domain 3: デプロイ、プロビジョニング、自動化(22%)</h1>
<p>合言葉は <strong>「手作業をやめ、コードで再現可能にする」</strong> です。</p>
<Diagram id="dg31" />

<h2 id="s-h2-9">Step 7. Task 3.1 クラウドリソースのプロビジョニングと保守</h2>
<h3 id="s-h3-32">Skill 3.1.1 🟡 AMI とコンテナイメージの作成・管理(EC2 Image Builder)</h3>
<blockquote>
<p>公式スキル文: AMI とコンテナイメージを作成・管理する(例: EC2 Image Builder)。</p>
</blockquote>
<h4>(1) AMI(Amazon Machine Image)とは</h4>
<p>EC2 インスタンスを起動するための <strong>テンプレート</strong>(OS・ソフトウェア・設定・ボリューム構成)です。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>構成要素</td>
<td>ルートボリュームのスナップショット、起動許可、ブロックデバイスマッピング</td>
</tr>
<tr>
<td><strong>リージョン固有</strong></td>
<td>AMI は <strong>作成したリージョンでのみ使える</strong>。他リージョンで使うには <strong>AMI のコピー</strong> が必要</td>
</tr>
<tr>
<td>共有</td>
<td>特定のアカウント / 組織 / 公開。<strong>暗号化 AMI の共有は、使用している KMS キーも共有先に許可</strong> する必要がある(AWS マネージドキーで暗号化したものは共有不可)</td>
</tr>
<tr>
<td>ゴールデン AMI</td>
<td>標準化した設定・エージェント・パッチ適用済みの <strong>社内標準 AMI</strong></td>
</tr>
<tr>
<td>廃止</td>
<td>古い AMI は <strong>非推奨(deprecate)→ 登録解除</strong> し、関連スナップショットも整理(コスト削減)</td>
</tr>
</tbody>
</table></div>
<h4>(2) EC2 Image Builder</h4>
<p>AMI やコンテナイメージの <strong>作成・テスト・配布を自動化するマネージドサービス</strong>(パイプライン)です。</p>
<Diagram id="dg32" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">要素</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>コンポーネント</strong></td>
<td>ビルド / テスト用の手順(ソフトウェアのインストール、設定、セキュリティ強化など)。YAML</td>
</tr>
<tr>
<td><strong>イメージレシピ</strong></td>
<td>ベースイメージ + コンポーネントの組み合わせ</td>
</tr>
<tr>
<td><strong>インフラストラクチャ設定</strong></td>
<td>ビルド用インスタンスのタイプ、サブネット、SG、IAM ロール</td>
</tr>
<tr>
<td><strong>配布設定</strong></td>
<td>出力先リージョン、共有するアカウント、タグ、暗号化</td>
</tr>
<tr>
<td><strong>パイプライン</strong></td>
<td>ビルド → テスト → 配布を <strong>スケジュール</strong> または手動で実行</td>
</tr>
<tr>
<td>出力</td>
<td><strong>AMI</strong> または <strong>コンテナイメージ(Amazon ECR へ)</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) コンテナイメージの管理(Amazon ECR)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>プライベートレジストリ</td>
<td>IAM で制御されたコンテナイメージの保管場所</td>
</tr>
<tr>
<td><strong>イメージスキャン</strong></td>
<td>脆弱性スキャン(基本スキャン / Amazon Inspector による拡張スキャン)</td>
</tr>
<tr>
<td><strong>ライフサイクルポリシー</strong></td>
<td>古い / 未タグのイメージを自動削除してコスト削減</td>
</tr>
<tr>
<td><strong>レプリケーション</strong></td>
<td>別リージョン / アカウントへ複製</td>
</tr>
<tr>
<td><strong>タグのイミュータビリティ</strong></td>
<td>既存タグの上書きを禁止(再現性・改ざん防止)</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>手作業でのイメージ作成をやめ</strong>、Image Builder などで <strong>再現可能なパイプライン化</strong></li>
<li><strong>定期的に再ビルド</strong> し、最新パッチを反映する(Systems Manager Patch Manager と併用)</li>
<li>ビルドの中に <strong>セキュリティ強化・脆弱性スキャン・テスト</strong> を組み込む</li>
<li>AMI に <strong>機密情報(キー・パスワード)を焼き込まない</strong></li>
<li>ECR は <strong>スキャン・ライフサイクル・タグのイミュータビリティ</strong> を有効化する</li>
<li>不要になった AMI とスナップショットを <strong>棚卸し</strong> する</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>EC2 Image Builder: <a href="https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html">https://docs.aws.amazon.com/imagebuilder/latest/userguide/what-is-image-builder.html</a></li>
<li>AMI: <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html</a></li>
<li>Amazon ECR: <a href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html">https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html</a></li>
</ul>
<h3 id="s-h3-33">Skill 3.1.2 🔴 CloudFormation と AWS CDK によるリソース管理</h3>
<blockquote>
<p>公式スキル文: CloudFormation と AWS CDK を使って AWS リソースを作成・管理する。(SOA-C03 では「スタック」の作成・管理が追加)</p>
</blockquote>
<h4>(1) Infrastructure as Code(IaC)とは</h4>
<p>インフラの構成を <strong>コード(テンプレート)として記述</strong> し、同じ構成を <strong>何度でも再現</strong> できるようにする考え方です。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">利点</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>再現性</td>
<td>開発・本番で同じ構成を作れる</td>
</tr>
<tr>
<td>変更管理</td>
<td>Git で履歴・レビュー・ロールバック</td>
</tr>
<tr>
<td>自動化</td>
<td>CI/CD に組み込める</td>
</tr>
<tr>
<td>ドリフト検知</td>
<td>手動変更との差分を検出</td>
</tr>
</tbody>
</table></div>
<h4>(2) CloudFormation の基本</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>テンプレート</strong></td>
<td>YAML / JSON のリソース定義</td>
</tr>
<tr>
<td><strong>スタック</strong></td>
<td>テンプレートから作られたリソースの <strong>まとまり</strong>(作成・更新・削除の単位)</td>
</tr>
<tr>
<td><strong>変更セット(Change Set)</strong></td>
<td>更新を <strong>適用前にプレビュー</strong> する</td>
</tr>
<tr>
<td><strong>ドリフト検出</strong></td>
<td>実リソースがテンプレートと <strong>ズレていないか</strong> を検出</td>
</tr>
</tbody>
</table></div>
<p><strong>テンプレートの主なセクション</strong></p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">セクション</th>
<th scope="col">役割</th>
<th style={{ textAlign: "center" }} scope="col">必須</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Parameters</code></td>
<td>実行時に渡す値(環境名、インスタンスタイプなど)</td>
<td style={{ textAlign: "center" }}></td>
</tr>
<tr>
<td><code>Mappings</code></td>
<td>固定の対応表(リージョン別 AMI など)</td>
<td style={{ textAlign: "center" }}></td>
</tr>
<tr>
<td><code>Conditions</code></td>
<td>条件によるリソース作成の切り替え</td>
<td style={{ textAlign: "center" }}></td>
</tr>
<tr>
<td><strong><code>Resources</code></strong></td>
<td><strong>作成するリソース</strong></td>
<td style={{ textAlign: "center" }}><strong>必須</strong></td>
</tr>
<tr>
<td><code>Outputs</code></td>
<td>他のスタックや利用者に出力する値(エクスポート可能)</td>
<td style={{ textAlign: "center" }}></td>
</tr>
</tbody>
</table></div>
<p><strong>よく使う組み込み関数</strong></p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">関数</th>
<th scope="col">用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>!Ref</code></td>
<td>パラメータ値 / リソースの ID を参照</td>
</tr>
<tr>
<td><code>!GetAtt</code></td>
<td>リソースの属性(ARN、DNS 名など)を取得</td>
</tr>
<tr>
<td><code>!Sub</code></td>
<td>文字列内に変数を埋め込む</td>
</tr>
<tr>
<td><code>!ImportValue</code></td>
<td>他スタックがエクスポートした値を参照</td>
</tr>
<tr>
<td><code>!If</code> / <code>!Equals</code></td>
<td>条件分岐</td>
</tr>
</tbody>
</table></div>
<p><strong>最小のテンプレート例</strong></p>
<CodeBlock index={5} />

<h4>(3) スタックの更新フロー</h4>
<Diagram id="dg33" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">保護の仕組み</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>DeletionPolicy</strong></td>
<td>スタック削除時の挙動(<code>Delete</code> / <strong><code>Retain</code></strong> / <strong><code>Snapshot</code></strong>。DB や EBS は Snapshot が有効)</td>
</tr>
<tr>
<td><strong>UpdateReplacePolicy</strong></td>
<td>更新で <strong>置き換え</strong> が発生したときの旧リソースの扱い</td>
</tr>
<tr>
<td><strong>スタックポリシー</strong></td>
<td>更新時に <strong>特定リソースの変更を禁止</strong></td>
</tr>
<tr>
<td><strong>終了保護</strong></td>
<td>スタックの <strong>誤削除を防止</strong></td>
</tr>
<tr>
<td><strong>ネストされたスタック</strong></td>
<td>共通部品の再利用・テンプレートの分割</td>
</tr>
<tr>
<td><strong>クロススタック参照</strong></td>
<td><code>Outputs</code> の <code>Export</code> と <code>!ImportValue</code>(参照されているスタックは削除不可)</td>
</tr>
<tr>
<td><strong>カスタムリソース</strong></td>
<td>Lambda 等で CloudFormation 未対応の処理を実行</td>
</tr>
<tr>
<td><strong>cfn-init / cfn-signal(CreationPolicy)</strong></td>
<td>EC2 内の設定と、<strong>起動完了のシグナル待ち</strong></td>
</tr>
</tbody>
</table></div>
<h4>(4) AWS CDK(Cloud Development Kit)</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>概要</td>
<td><strong>TypeScript / Python / Java / C# / Go などのプログラミング言語</strong> でインフラを定義するフレームワーク</td>
</tr>
<tr>
<td>仕組み</td>
<td><strong>CDK のコード → <code>cdk synth</code> で CloudFormation テンプレートを生成 → CloudFormation がデプロイ</strong></td>
</tr>
<tr>
<td><strong>コンストラクト</strong></td>
<td>L1(CloudFormation そのもの)/ <strong>L2(推奨のデフォルト・ヘルパー付き)</strong> / L3(パターン = 複数リソースの組み合わせ)</td>
</tr>
<tr>
<td>主なコマンド</td>
<td><code>cdk bootstrap</code>(初回準備)、<code>cdk synth</code>、<code>cdk diff</code>(差分確認)、<code>cdk deploy</code>、<code>cdk destroy</code></td>
</tr>
<tr>
<td>利点</td>
<td>ループ・条件・関数などで <strong>簡潔に</strong> 書ける、型による補完、テスト可能</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg34" />

<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>変更セット / <code>cdk diff</code> で必ず差分を確認</strong> してからデプロイ(特に <strong>置換</strong> に注意)</li>
<li>DB・ストレージなど <strong>重要リソースには <code>DeletionPolicy</code> / <code>UpdateReplacePolicy</code></strong>、スタックには <strong>終了保護</strong></li>
<li><strong>ドリフト検出</strong> を定期的に実施し、<strong>手動変更をしない</strong> 運用にする</li>
<li>テンプレートを <strong>ネスト / モジュール化</strong> して再利用し、Git で管理する</li>
<li><strong>パラメータ化</strong> して環境差分をテンプレート外に出す。<strong>機密値は Secrets Manager / Parameter Store を動的参照</strong> で取得する</li>
<li>リソース名をハードコードしすぎない(名前の固定は置換更新の失敗や重複の原因)</li>
<li>CloudFormation の実行には <strong>サービスロール</strong> を使い、最小権限にする</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>CloudFormation: <a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html">https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html</a></li>
<li>変更セット: <a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html">https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html</a></li>
<li>ドリフト検出: <a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html">https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html</a></li>
<li>AWS CDK: <a href="https://docs.aws.amazon.com/cdk/v2/guide/home.html">https://docs.aws.amazon.com/cdk/v2/guide/home.html</a></li>
</ul>
<h3 id="s-h3-34">Skill 3.1.3 🔴 デプロイ問題の特定と修復(サブネットサイズ・CloudFormation エラー・権限)</h3>
<blockquote>
<p>公式スキル文: デプロイの問題を特定・修復する(例: サブネットサイズの問題、CloudFormation エラー、権限の問題)。</p>
</blockquote>
<h4>(1) 切り分けの全体像</h4>
<Diagram id="dg35" />

<h4>(2) サブネットサイズの問題</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ポイント</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>予約 IP</td>
<td><strong>各サブネットで 5 つの IP アドレスが AWS により予約</strong>(先頭 4 つと末尾 1 つ)。<strong>例: /24(256)→ 利用可能 251</strong></td>
</tr>
<tr>
<td><strong>最小サイズ</strong></td>
<td>サブネットの CIDR は <strong>/28(16 アドレス)〜/16</strong></td>
</tr>
<tr>
<td>症状</td>
<td><code>InsufficientFreeAddressesInSubnet</code>(サブネットの空き IP が不足)で EC2 / Auto Scaling / ENI の作成が失敗</td>
</tr>
<tr>
<td>IP を消費するもの</td>
<td>EC2、<strong>ELB のノード</strong>、<strong>NAT ゲートウェイ</strong>、VPC エンドポイント、<strong>Lambda の VPC ENI</strong>、<strong>EKS の Pod(VPC CNI)</strong>、RDS など</td>
</tr>
<tr>
<td>対処</td>
<td>空きのある <strong>別サブネット</strong> を追加 / <strong>セカンダリ CIDR</strong> を VPC に追加して新サブネットを作成 / 不要な ENI・リソースの整理(<strong>サブネットの CIDR は後から変更不可</strong>)</td>
</tr>
</tbody>
</table></div>
<h4>(3) CloudFormation のよくあるエラー</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">エラー・症状</th>
<th scope="col">原因と対処</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong><code>CREATE_FAILED</code></strong></td>
<td><strong>スタックイベントを時系列で見て「最初の失敗」</strong> を探す(後続の失敗は連鎖的なもの)</td>
</tr>
<tr>
<td><code>InsufficientCapabilitiesException</code></td>
<td><strong>IAM リソース作成には <code>CAPABILITY_IAM</code> / <code>CAPABILITY_NAMED_IAM</code>、マクロ等は <code>CAPABILITY_AUTO_EXPAND</code> の承認が必要</strong></td>
</tr>
<tr>
<td><code>AlreadyExists</code></td>
<td>固定名のリソースが <strong>既に存在</strong> → 名前の重複を避ける</td>
</tr>
<tr>
<td>依存関係・循環参照</td>
<td><code>DependsOn</code> / 参照の見直し(<strong>Circular dependency</strong>)</td>
</tr>
<tr>
<td>クォータ超過</td>
<td><strong>Service Quotas</strong> で上限引き上げを申請</td>
</tr>
<tr>
<td>ロールバック</td>
<td>作成失敗時は <strong><code>ROLLBACK_COMPLETE</code></strong>(<strong>再作成にはスタックの削除が必要</strong>)</td>
</tr>
<tr>
<td><strong><code>UPDATE_ROLLBACK_FAILED</code></strong></td>
<td>原因(権限・手動削除されたリソース等)を直して <strong>「更新のロールバックを続行」</strong>(必要なら失敗リソースをスキップ)</td>
</tr>
<tr>
<td><code>DELETE_FAILED</code></td>
<td>他リソースが依存(例: 中身があるバケット、ENI が付いた SG)→ 依存を除去して再削除</td>
</tr>
<tr>
<td>待機が終わらない</td>
<td><code>cfn-signal</code> / <code>CreationPolicy</code> の <strong>シグナルが届かない</strong>(ネットワーク、スクリプトエラー)</td>
</tr>
</tbody>
</table></div>
<h4>(4) 権限の問題</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">確認すること</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>AccessDenied</code> / <code>UnauthorizedOperation</code></td>
<td>実行者の IAM ポリシー、<strong>CloudFormation の実行ロール</strong>、<strong>SCP / 権限境界</strong>、リソースポリシー</td>
</tr>
<tr>
<td><code>iam:PassRole</code> エラー</td>
<td>ロールをサービスに渡す権限が <strong>PassRole</strong> で必要(Resource を絞る)</td>
</tr>
<tr>
<td>EC2 が暗号化ボリュームを使えない</td>
<td><strong>KMS キーポリシー / グラント</strong>(Auto Scaling のサービスリンクロールにキー権限が必要)</td>
</tr>
<tr>
<td>認可メッセージがエンコードされている</td>
<td><code>aws sts decode-authorization-message</code> で解読</td>
</tr>
<tr>
<td>調査の起点</td>
<td><strong>CloudTrail</strong> で拒否イベントを検索、<strong>IAM ポリシーシミュレーター</strong> で検証</td>
</tr>
</tbody>
</table></div>
<h4>(5) その他のデプロイ失敗の例</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>InsufficientInstanceCapacity</code></td>
<td>AZ に指定タイプの空きがない → <strong>別 AZ / 別タイプ</strong>(ASG は複数タイプを指定)</td>
</tr>
<tr>
<td><code>InstanceLimitExceeded</code> / <code>VcpuLimitExceeded</code></td>
<td><strong>vCPU クォータ</strong> 超過</td>
</tr>
<tr>
<td>AMI が見つからない</td>
<td><strong>リージョン固有</strong> / 共有されていない / 非推奨</td>
</tr>
<tr>
<td>キーペア・SG が見つからない</td>
<td>別リージョン・別 VPC のリソースを指定している</td>
</tr>
</tbody>
</table></div>
<h4>(6) ベストプラクティス</h4>
<ul>
<li><strong><code>/24</code> 以上のゆとりあるサブネット設計</strong>(スケーリング・ENI の増加を見込む)</li>
<li>CloudFormation は <strong>スタックイベント → 最初の失敗リソース</strong> から読む</li>
<li><strong>変更セットと <code>cfn-lint</code> / <code>cdk diff</code></strong> でデプロイ前に問題を検出</li>
<li>デプロイ権限は <strong>最小権限</strong>。CloudTrail で拒否を継続監視</li>
<li><strong>Service Quotas</strong> を事前に確認し、上限に近づいたらアラームを設定</li>
</ul>
<h4>(7) 参考 URL</h4>
<ul>
<li>CloudFormation のトラブルシュート: <a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html">https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/troubleshooting.html</a></li>
<li>サブネットのサイズ設計: <a href="https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html">https://docs.aws.amazon.com/vpc/latest/userguide/subnet-sizing.html</a></li>
<li>IAM のアクセス拒否のトラブルシュート: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html</a></li>
</ul>
<h3 id="s-h3-35">Skill 3.1.4 🟡 複数リージョン・アカウントへのプロビジョニングと共有(AWS RAM / StackSets)</h3>
<blockquote>
<p>公式スキル文: 複数のリージョンとアカウントにリソースをプロビジョニング・共有する(例: AWS Resource Access Manager [AWS RAM]、CloudFormation StackSets)。</p>
</blockquote>
<h4>(1) 2 つのアプローチの違い</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">何をするか</th>
<th scope="col">例</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CloudFormation StackSets</strong></td>
<td><strong>同じテンプレートを複数アカウント・複数リージョンにデプロイ</strong>(各アカウントに <strong>別々のリソースが作られる</strong>)</td>
<td>全アカウントに同じ IAM ロール、Config ルール、ログ設定を展開</td>
</tr>
<tr>
<td><strong>AWS RAM</strong></td>
<td><strong>1 つのリソースを他のアカウントと共有</strong>(リソースは 1 つ、複数アカウントが利用)</td>
<td><strong>VPC サブネット</strong>、Transit Gateway、Route 53 Resolver ルールなどを共有</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg36" />

<h4>(2) StackSets のポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>構成</td>
<td><strong>管理アカウント(または委任管理者)</strong> の StackSet → 各ターゲットアカウント / リージョンに <strong>スタックインスタンス</strong> を作成</td>
</tr>
<tr>
<td><strong>アクセス許可モデル</strong></td>
<td><strong>サービスマネージド</strong>(Organizations と統合・<strong>新規アカウントへ自動デプロイ</strong>可能・IAM ロールの事前作成不要)/ <strong>セルフマネージド</strong>(<code>AWSCloudFormationStackSetAdministrationRole</code> と、各ターゲットの <code>AWSCloudFormationStackSetExecutionRole</code> を自分で用意)</td>
</tr>
<tr>
<td>運用設定</td>
<td><strong>同時実行数</strong>・<strong>障害許容数</strong>(一定数失敗したら停止)・リージョン順序</td>
</tr>
<tr>
<td>更新</td>
<td>StackSet のテンプレート更新が <strong>全スタックインスタンスに反映</strong></td>
</tr>
<tr>
<td>ドリフト検出</td>
<td>StackSet 単位で実施可能</td>
</tr>
</tbody>
</table></div>
<h4>(3) AWS RAM のポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>共有先</td>
<td>特定アカウント / <strong>OU / 組織全体</strong>(Organizations で <strong>共有を有効化</strong> すると招待の承認が不要)</td>
</tr>
<tr>
<td>代表的な共有対象</td>
<td><strong>VPC サブネット(共有 VPC)</strong>、<strong>Transit Gateway</strong>、Route 53 Resolver ルール、License Manager 設定 など</td>
</tr>
<tr>
<td>共有 VPC</td>
<td>中央のネットワークアカウントが VPC を作り、各ワークロードアカウントがサブネット内にリソースを作成</td>
</tr>
<tr>
<td><strong>リージョン</strong></td>
<td>共有は <strong>リソースがあるリージョン内</strong> が基本</td>
</tr>
<tr>
<td>制限</td>
<td>共有された側は、<strong>所有者のリソースを変更・削除できない</strong>(リソース種別ごとに権限が異なる)</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li>全アカウント共通の設定は <strong>StackSets(サービスマネージド + 自動デプロイ)</strong> で一元化</li>
<li><strong>段階的に展開</strong>(まず少数のアカウント / リージョン)し、障害許容数を設定する</li>
<li>ネットワークは <strong>RAM による共有 VPC / Transit Gateway 共有</strong> で重複を避ける</li>
<li>共有は <strong>最小の範囲(OU 単位など)</strong> に限定する</li>
<li>Control Tower / Organizations の <strong>委任管理者</strong> を活用し、管理アカウントの使用を最小化</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>StackSets: <a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html">https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html</a></li>
<li>AWS RAM: <a href="https://docs.aws.amazon.com/ram/latest/userguide/what-is.html">https://docs.aws.amazon.com/ram/latest/userguide/what-is.html</a></li>
</ul>
<h3 id="s-h3-36">Skill 3.1.5 🔴 デプロイ戦略とサービスの実装</h3>
<blockquote>
<p>公式スキル文: デプロイ戦略とサービスを実装する。</p>
</blockquote>
<h4>(1) 主なデプロイ戦略の比較</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">戦略</th>
<th scope="col">仕組み</th>
<th scope="col">ダウンタイム</th>
<th scope="col">ロールバック</th>
<th scope="col">コスト</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>All-at-once(一括)</strong></td>
<td>全台を一度に更新</td>
<td><strong>あり</strong></td>
<td>遅い(再デプロイ)</td>
<td>最小</td>
</tr>
<tr>
<td><strong>ローリング</strong></td>
<td>数台ずつ順に更新</td>
<td>なし(ただし一部台数は処理能力が一時低下)</td>
<td>やや遅い</td>
<td>低</td>
</tr>
<tr>
<td><strong>ローリング(追加バッチ付き)</strong></td>
<td>追加の新台数を先に立ててから更新</td>
<td>なし(能力維持)</td>
<td>やや遅い</td>
<td>中</td>
</tr>
<tr>
<td><strong>イミュータブル(Immutable)</strong></td>
<td><strong>新しい台数一式を別に作成</strong>し、成功したら切替・旧台数を削除</td>
<td>なし</td>
<td><strong>速い</strong>(旧環境へ戻すだけ)</td>
<td>高(一時的に 2 倍)</td>
</tr>
<tr>
<td><strong>Blue/Green</strong></td>
<td>本番(Blue)と同じ新環境(Green)を用意し、<strong>トラフィックを切替</strong></td>
<td>なし</td>
<td><strong>非常に速い</strong>(切り戻し)</td>
<td>高(2 環境)</td>
</tr>
<tr>
<td><strong>カナリア</strong></td>
<td><strong>一部(例 10%)のユーザーだけ</strong> 新バージョンへ → 問題なければ全体へ</td>
<td>なし</td>
<td>速い</td>
<td>中</td>
</tr>
<tr>
<td><strong>リニア</strong></td>
<td>一定割合ずつ <strong>段階的に</strong> 増やす</td>
<td>なし</td>
<td>速い</td>
<td>中</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg37" />

<h4>(2) サービス別の実装</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">使える戦略・機能</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AWS CodeDeploy</strong></td>
<td><strong>EC2 / オンプレ</strong>: インプレース(ローリング)/ Blue/Green。<strong>Lambda</strong>: カナリア / リニア / 一括(エイリアスの重み付けで切替)。<strong>ECS</strong>: Blue/Green。<strong>自動ロールバック</strong>(CloudWatch アラーム連動)</td>
</tr>
<tr>
<td><strong>Elastic Beanstalk</strong></td>
<td>デプロイポリシー: <strong>All at once / Rolling / Rolling with additional batch / Immutable / Traffic splitting</strong>。環境の <strong>URL スワップ</strong> で Blue/Green</td>
</tr>
<tr>
<td><strong>Auto Scaling グループ</strong></td>
<td><strong>インスタンスリフレッシュ</strong>(最小正常率を指定してローリング置換)</td>
</tr>
<tr>
<td><strong>ECS</strong></td>
<td>ローリングアップデート(<strong>最小正常率 / 最大率</strong> で制御)、Blue/Green</td>
</tr>
<tr>
<td><strong>Lambda</strong></td>
<td><strong>バージョン + エイリアス(重み付け)</strong> でカナリア</td>
</tr>
<tr>
<td><strong>Route 53 / ALB</strong></td>
<td><strong>加重ルーティング</strong> / <strong>ターゲットグループの重み付け</strong> でトラフィックを段階移行</td>
</tr>
</tbody>
</table></div>
<h4>(3) 戦略の選び方</h4>
<Diagram id="dg38" />

<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>ヘルスチェックとアラームを自動ロールバックに連動</strong> させる(CodeDeploy など)</li>
<li>本番は <strong>ダウンタイムなし</strong> の戦略(ローリング / Blue/Green / カナリア)</li>
<li><strong>DB スキーマ変更は後方互換</strong> にし、新旧バージョンが並行稼働できるようにする</li>
<li><strong>デプロイとリリースを分ける</strong>(機能フラグ)</li>
<li>デプロイは <strong>IaC / パイプラインで自動化</strong> し、手動変更を避ける</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>AWS CodeDeploy: <a href="https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html">https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html</a></li>
<li>Elastic Beanstalk のデプロイポリシー: <a href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html">https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html</a></li>
<li>AWS のデプロイオプション(ホワイトペーパー): <a href="https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/welcome.html">https://docs.aws.amazon.com/whitepapers/latest/overview-deployment-options/welcome.html</a></li>
</ul>
<h3 id="s-h3-37">Skill 3.1.6 🟡 サードパーティツール(Terraform / Git)によるデプロイ自動化</h3>
<blockquote>
<p>公式スキル文: サードパーティツール(例: Terraform、Git)を使い、管理して、リソースのデプロイを自動化する。</p>
</blockquote>
<h4>(1) Terraform の基本</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>プロバイダー</td>
<td>AWS などの API を操作するプラグイン(<code>hashicorp/aws</code>)</td>
</tr>
<tr>
<td><code>terraform init</code></td>
<td>プロバイダー・モジュールの初期化</td>
</tr>
<tr>
<td><code>terraform plan</code></td>
<td><strong>変更内容のプレビュー</strong>(CloudFormation の変更セットに相当)</td>
</tr>
<tr>
<td><code>terraform apply</code></td>
<td>変更の適用</td>
</tr>
<tr>
<td><strong>ステート</strong></td>
<td>管理対象リソースの <strong>現在の状態の記録</strong>(機密情報が含まれうる)</td>
</tr>
<tr>
<td>モジュール</td>
<td>再利用可能な構成の部品</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">CloudFormation</th>
<th scope="col">Terraform</th>
</tr>
</thead>
<tbody>
<tr>
<td>AWS 専用・AWS が管理</td>
<td><strong>マルチクラウド</strong>・HCL で記述</td>
</tr>
<tr>
<td>スタックが状態を保持(AWS 側)</td>
<td><strong>ステートファイルを自分で管理</strong></td>
</tr>
<tr>
<td>変更セット</td>
<td><code>terraform plan</code></td>
</tr>
</tbody>
</table></div>
<h4>(2) ステート管理(最重要)</h4>
<Diagram id="dg39" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ベストプラクティス</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>リモートステート</strong></td>
<td>S3 バックエンドに保存(<strong>暗号化・バージョニング・アクセス制限</strong>)。チームで共有</td>
</tr>
<tr>
<td><strong>ステートロック</strong></td>
<td>同時実行による破損を防ぐ。S3 バックエンドは従来 DynamoDB でロックしていたが、<strong>S3 ネイティブのロック(<code>use_lockfile</code>)</strong> が利用可能(利用バージョンの対応は公式ドキュメントで確認)</td>
</tr>
<tr>
<td>機密情報</td>
<td>ステートには平文の値が入ることがある → <strong>ステートを厳重に保護</strong></td>
</tr>
<tr>
<td>バージョン固定</td>
<td>プロバイダーと Terraform のバージョンを固定</td>
</tr>
<tr>
<td>ドリフト</td>
<td><code>plan</code> で差分を検出し、<strong>手動変更をしない</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) Git と運用フロー</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">プラクティス</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>ブランチ + <strong>プルリクエスト</strong></td>
<td>IaC の変更を <strong>レビュー</strong> してからマージ</td>
</tr>
<tr>
<td>CI で自動検証</td>
<td><code>fmt</code>、<code>validate</code>、<code>plan</code> の結果をレビューに添付</td>
</tr>
<tr>
<td>マージで自動デプロイ</td>
<td><strong>パイプラインが <code>apply</code></strong> を実行(人が直接 <code>apply</code> しない)</td>
</tr>
<tr>
<td>認証</td>
<td>CI には <strong>長期のアクセスキーではなく一時認証情報</strong>(IAM ロール / OIDC フェデレーション)</td>
</tr>
<tr>
<td>タグ / リリース</td>
<td>デプロイした版を追跡し、<strong>ロールバックは前のコミットを再適用</strong></td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>IaC はすべて Git 管理</strong>し、変更は <strong>プルリクエスト経由</strong></li>
<li>Terraform の <strong>ステートは S3 リモート + 暗号化 + ロック</strong></li>
<li><strong>最小権限</strong> のデプロイロールを使い、<strong>長期キーをコードに含めない</strong></li>
<li><code>plan</code> を <strong>必ずレビュー</strong>(特に destroy / replace)</li>
<li>環境(dev / stg / prod)は <strong>ステート・認証情報を分離</strong></li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>Terraform AWS Provider: <a href="https://registry.terraform.io/providers/hashicorp/aws/latest/docs">https://registry.terraform.io/providers/hashicorp/aws/latest/docs</a></li>
<li>Terraform S3 バックエンド: <a href="https://developer.hashicorp.com/terraform/language/backend/s3">https://developer.hashicorp.com/terraform/language/backend/s3</a></li>
<li>AWS 規範ガイダンス(Terraform AWS Provider のベストプラクティス): <a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/terraform-aws-provider-best-practices/introduction.html">https://docs.aws.amazon.com/prescriptive-guidance/latest/terraform-aws-provider-best-practices/introduction.html</a></li>
</ul>
<h2 id="s-h2-10">Step 8. Task 3.2 既存リソース管理の自動化</h2>
<h3 id="s-h3-38">Skill 3.2.1 🔴 AWS サービスによる運用プロセスの自動化(Systems Manager)</h3>
<blockquote>
<p>公式スキル文: AWS サービス(例: Systems Manager)を使って運用プロセスを自動化する。</p>
</blockquote>
<h4>(1) Systems Manager(SSM)の主要機能</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容</th>
<th scope="col">例</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Run Command</strong></td>
<td>複数インスタンスで <strong>コマンドを一斉実行</strong>(SSH 不要)</td>
<td>全台でログ収集</td>
</tr>
<tr>
<td><strong>State Manager</strong></td>
<td><strong>望ましい状態を維持</strong>(関連付けで定期適用)</td>
<td>CloudWatch エージェントを常に導入済みに</td>
</tr>
<tr>
<td><strong>Patch Manager</strong></td>
<td><strong>パッチ適用の自動化</strong>(パッチベースライン、パッチグループ、メンテナンスウィンドウ)</td>
<td>毎週日曜に OS パッチ</td>
</tr>
<tr>
<td><strong>Session Manager</strong></td>
<td><strong>ブラウザ / CLI から安全にシェル接続</strong>(SSH ポート開放・踏み台不要。<strong>操作ログを S3 / CloudWatch Logs に記録</strong>)</td>
<td>踏み台サーバーの廃止</td>
</tr>
<tr>
<td><strong>Parameter Store</strong></td>
<td>設定値・シークレットの保管(SecureString)</td>
<td>環境ごとの設定</td>
</tr>
<tr>
<td><strong>Automation</strong></td>
<td>ランブックによる自動化(Skill 1.2.3)</td>
<td>再起動・AMI 作成</td>
</tr>
<tr>
<td><strong>Inventory</strong></td>
<td>ソフトウェア・設定の <strong>棚卸し</strong></td>
<td>台帳の自動作成</td>
</tr>
<tr>
<td><strong>Maintenance Windows</strong></td>
<td><strong>メンテナンス時間帯</strong> にタスクを実行</td>
<td>夜間のパッチ</td>
</tr>
<tr>
<td><strong>OpsCenter</strong></td>
<td>運用上の課題(OpsItem)の一元管理</td>
<td>アラーム → OpsItem</td>
</tr>
<tr>
<td><strong>Fleet Manager / Distributor</strong></td>
<td>インスタンスの GUI 管理 / パッケージ配布</td>
<td></td>
</tr>
</tbody>
</table></div>
<h4>(2) 「管理対象インスタンス」になるための前提条件</h4>
<Diagram id="dg40" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">前提</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>SSM エージェント</td>
<td>主要な AMI に搭載済み。サービスが起動していること</td>
</tr>
<tr>
<td><strong>IAM</strong></td>
<td><strong><code>AmazonSSMManagedInstanceCore</code> を含むインスタンスプロファイル</strong>(または Default Host Management Configuration)</td>
</tr>
<tr>
<td><strong>ネットワーク</strong></td>
<td><strong>インターネット(NAT / IGW)または VPC エンドポイント</strong>(<strong><code>ssm</code>、<code>ssmmessages</code>、<code>ec2messages</code></strong>。S3 / CloudWatch Logs 用も必要に応じて)</td>
</tr>
<tr>
<td>ハイブリッド</td>
<td>オンプレミスは <strong>ハイブリッドアクティベーション</strong> で登録(<code>mi-</code> で始まる ID)</td>
</tr>
</tbody>
</table></div>
<h4>(3) Patch Manager の流れ</h4>
<Diagram id="dg41" />

<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>SSH / RDP の公開をやめ、Session Manager</strong> を使う(監査ログも残る)</li>
<li>パッチは <strong>ベースライン + メンテナンスウィンドウ</strong> で自動化し、<strong>まずテスト環境で検証</strong></li>
<li><strong>State Manager</strong> で「エージェントの導入」など構成を維持</li>
<li>設定値・シークレットは <strong>Parameter Store / Secrets Manager</strong> に集約</li>
<li><strong>タグ</strong> で対象を指定し、台数が増えても自動で対象に含める</li>
<li>実行の <strong>ログ(S3 / CloudWatch Logs)と通知</strong> を設定する</li>
</ul>
<h4>(5) トラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">確認すること</th>
</tr>
</thead>
<tbody>
<tr>
<td>Fleet Manager / Run Command の対象に出ない</td>
<td>上のフローチャート(エージェント → IAM → 経路)を順に確認</td>
</tr>
<tr>
<td>Session Manager で接続できない</td>
<td>ロール、VPC エンドポイント、エージェントのバージョン、ユーザー側の IAM 権限</td>
</tr>
<tr>
<td>パッチが適用されない</td>
<td>パッチグループのタグ、ベースラインの承認ルール、メンテナンスウィンドウの設定</td>
</tr>
</tbody>
</table></div>
<h4>(6) 参考 URL</h4>
<ul>
<li>Systems Manager: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/what-is-systems-manager.html</a></li>
<li>Patch Manager: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/patch-manager.html</a></li>
<li>Session Manager: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager.html</a></li>
<li>Run Command: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html</a></li>
<li>State Manager: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html</a></li>
</ul>
<h3 id="s-h3-39">Skill 3.2.2 🔴 イベント駆動の自動化(Lambda / S3 イベント通知 / EventBridge / DevOps Agent)</h3>
<blockquote>
<p>公式スキル文: AWS のサービスと機能(例: Lambda、S3 イベント通知、EventBridge、AWS DevOps Agent)を使ってイベント駆動の自動化を実装する。</p>
</blockquote>
<h4>(1) イベント駆動とは</h4>
<p><strong>「何かが起きたら(イベント)、自動で処理を実行する」</strong> 仕組みです。ポーリングや人手が不要になります。</p>
<Diagram id="dg42" />

<h4>(2) S3 イベント通知</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>トリガー</td>
<td>オブジェクトの作成・削除・復元・レプリケーションなど</td>
</tr>
<tr>
<td>通知先</td>
<td><strong>Lambda、SNS、SQS、EventBridge</strong></td>
</tr>
<tr>
<td>フィルター</td>
<td><strong>プレフィックス / サフィックス</strong>(例: <code>images/</code> かつ <code>.jpg</code>)</td>
</tr>
<tr>
<td>権限</td>
<td>通知先側で <strong>S3 からの呼び出しを許可</strong>(Lambda のリソースベースポリシー / SNS・SQS のアクセスポリシー)</td>
</tr>
<tr>
<td>配信</td>
<td>通常は数秒で配信。<strong>少なくとも 1 回</strong> 配信(重複しうる) → <strong>処理は冪等</strong> にする</td>
</tr>
<tr>
<td>注意</td>
<td><strong>同じバケット・同じ出力先でイベントを書き戻すとループ</strong> になる(例: 画像を同じプレフィックスへ出力)</td>
</tr>
<tr>
<td>EventBridge 連携</td>
<td>S3 から <strong>EventBridge に全イベントを送る</strong> と、高度なフィルタリング・複数ターゲットが可能</td>
</tr>
</tbody>
</table></div>
<h4>(3) Lambda の連携方法</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">呼び出し形態</th>
<th scope="col">例</th>
<th scope="col">特徴</th>
</tr>
</thead>
<tbody>
<tr>
<td>同期</td>
<td>API Gateway、ALB</td>
<td>結果を待つ</td>
</tr>
<tr>
<td><strong>非同期</strong></td>
<td><strong>S3、SNS、EventBridge</strong></td>
<td>失敗時 <strong>既定で 2 回リトライ</strong>。<strong>DLQ / 失敗時の送信先</strong> を設定可能</td>
</tr>
<tr>
<td><strong>イベントソースマッピング</strong></td>
<td><strong>SQS、Kinesis、DynamoDB Streams</strong></td>
<td>Lambda がサービスをポーリング。バッチ処理</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">Lambda の制限と運用ポイント</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>実行時間</td>
<td><strong>最大 15 分</strong></td>
</tr>
<tr>
<td>同時実行</td>
<td>アカウント / リージョンの上限あり。<strong>予約済み同時実行</strong> で保護・制限</td>
</tr>
<tr>
<td>エラー処理</td>
<td><strong>DLQ(SQS / SNS)</strong> や <strong>失敗時の送信先</strong></td>
</tr>
<tr>
<td>監視</td>
<td><code>Errors</code>、<code>Throttles</code>、<code>Duration</code>、<code>IteratorAge</code>(ストリーム)</td>
</tr>
</tbody>
</table></div>
<h4>(3-2) AWS DevOps Agent とのイベント連携</h4>
<p>AWS DevOps Agent は、CloudWatch アラームや外部の通知ツールなどのイベントをトリガーに <strong>インシデントの調査を自動開始</strong> し、結果を Slack や AWS サポートケース、<strong>EventBridge のイベント</strong> などへ出力できる、新しい運用自動化の選択肢です。<strong>調査・分析の自動化</strong> が得意で、変更を加える修復は <strong>権限の設計と承認フロー</strong> を前提に検討します。</p>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>イベント駆動は疎結合</strong> にし、間に <strong>SQS / EventBridge</strong> を挟んで再試行・バッファリングを確保</li>
<li>処理は <strong>冪等</strong>(同じイベントが重複しても安全)に作る</li>
<li><strong>DLQ / 失敗時の送信先</strong> を設定し、失敗を見逃さない</li>
<li>Lambda の実行ロールは <strong>最小権限</strong></li>
<li><strong>ループ(自分の出力が自分を起動)</strong> に注意し、プレフィックスやバケットを分ける</li>
<li>CloudTrail / AWS Config / GuardDuty などの <strong>イベントをトリガー</strong> にして、運用を自動化する</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>S3 イベント通知: <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventNotifications.html</a></li>
<li>Lambda: <a href="https://docs.aws.amazon.com/lambda/latest/dg/welcome.html">https://docs.aws.amazon.com/lambda/latest/dg/welcome.html</a></li>
<li>EventBridge: <a href="https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html">https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-what-is.html</a></li>
</ul>
        </>
    );
}
