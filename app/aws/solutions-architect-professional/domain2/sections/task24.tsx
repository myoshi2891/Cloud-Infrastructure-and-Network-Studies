import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask24本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"6-task-24-信頼性要件を満たす戦略の設計"} tabIndex={-1}>
{"\n                    6. Task 2.4 信頼性要件を満たす戦略の設計\n                "}
</h2>
{"\n                "}
<p>
{"公式: 「Design a strategy to meet reliability requirements」"}
</p>
{"\n                "}
<h3 id={"step-1-何を問われるか-3"} tabIndex={-1}>
{"Step 1: 何を問われるか"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 32：Step 1: 何を問われるか"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"区分"}
</th>
<th scope="col">
{"公式の項目"}
</th>
<th scope="col">
{"やさしい言い換え"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"知識"}
</td>
<td>
{"\n                                    グローバルインフラ、ストレージ/レプリケーション(S3、RDS、ElastiCache)\n                                "}
</td>
<td>
{"データを複数の場所に安全に持つ方法"}
</td>
</tr>
<tr className={"even"}>
<td>
{"知識"}
</td>
<td>
{"Multi-AZ / Multi-Region アーキテクチャ"}
</td>
<td>
{"拠点をまたいで冗長化する設計"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"知識"}
</td>
<td>
{"Auto Scaling のポリシーとイベント"}
</td>
<td>
{"負荷や障害に応じて自動で台数を増減する仕組み"}
</td>
</tr>
<tr className={"even"}>
<td>
{"知識"}
</td>
<td>
{"アプリケーション統合(SNS、SQS、Step Functions)"}
</td>
<td>
{"システム同士を「疎結合」でつなぐ部品"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"知識"}
</td>
<td>
{"サービスクォータと制限"}
</td>
<td>
{"AWS の利用上限"}
</td>
</tr>
<tr className={"even"}>
<td>
{"スキル"}
</td>
<td>
{"\n                                    高可用性環境、障害を前提とした設計、疎結合、フェイルオーバーの運用、マネージドサービス、DNS\n                                    ルーティングポリシー\n                                "}
</td>
<td>
{"壊れても続く・すぐ切り替わる・連鎖して壊れない設計"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"Task 2.2 との違い"}
</strong>
{": 2.2\n                    は「災害(リージョン規模)後に事業を継続する」視点、2.4\n                    は「日常的な障害(インスタンス故障、AZ\n                    障害、負荷急増)でも落とさない」視点です。重なる部分は多いので、セットで理解しましょう。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-a-高可用性の基本形multi-az"} tabIndex={-1}>
{"Step 2-A: 高可用性の基本形(Multi-AZ)"}
</h3>
{"\n                "}
<Diagram id="diag-13" label={"Step 2-A: 高可用性の基本形(Multi-AZ)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 33：Step 2-A: 高可用性の基本形(Multi-AZ)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"層"}
</th>
<th scope="col">
{"高可用性の手段"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"DNS"}
</td>
<td>
{"Route 53(ヘルスチェックと組み合わせ)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ロードバランサー"}
</td>
<td>
{"\n                                    ELB は複数 AZ\n                                    に自動分散。異常なターゲットを切り離す(ヘルスチェック)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コンピュート"}
</td>
<td>
{"\n                                    Auto Scaling グループを"}
<strong>
{"複数 AZ に配置"}
</strong>
{"。異常インスタンスを自動で置換\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"データベース"}
</td>
<td>
{"\n                                    RDS Multi-AZ、Aurora(ストレージは3つの AZ\n                                    に6コピー)、DynamoDB(リージョン内で複数 AZ に自動複製)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ストレージ"}
</td>
<td>
{"\n                                    S3(複数 AZ に自動冗長化。One Zone クラスは除く)、EFS(複数 AZ)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ネットワーク"}
</td>
<td>
{"AZ ごとに NAT ゲートウェイを配置(AZ 障害時の連鎖を防ぐ)"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-b-ストレージとデータベースのレプリケーション戦略"} tabIndex={-1}>
{"\n                    Step 2-B: ストレージとデータベースのレプリケーション戦略\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 34：Step 2-B: ストレージとデータベースのレプリケーション戦略"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"同一リージョン内の可用性"}
</th>
<th scope="col">
{"リージョン間"}
</th>
<th scope="col">
{"補足"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon S3"}
</td>
<td>
{"複数 AZ に自動冗長化"}
</td>
<td>
{"CRR、Multi-Region Access Points"}
</td>
<td>
{"バージョニングで誤削除対策"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon RDS"}
</td>
<td>
{"\n                                    "}
<strong>
{"Multi-AZ DB インスタンス"}
</strong>
{"(同期レプリケーション、自動フェイルオーバー、通常1〜2分程度)/\n                                    "}
<strong>
{"Multi-AZ DB クラスター"}
</strong>
{"(準同期レプリケーション、読み取り可能なスタンバイ2台。フェイルオーバー時間はレプリカラグに依存し得る)\n                                "}
</td>
<td>
{"クロスリージョンリードレプリカ"}
</td>
<td>
{"\n                                    リードレプリカは非同期。DB\n                                    インスタンス構成のスタンバイは"}
<strong>
{"読み取りに使えない"}
</strong>
{"(DB\n                                    クラスター構成のスタンバイは読み取り可能)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon Aurora"}
</td>
<td>
{"最大15のレプリカ、自動フェイルオーバー"}
</td>
<td>
{"Global Database"}
</td>
<td>
{"レプリカがあれば短時間でフェイルオーバー可能"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon DynamoDB"}
</td>
<td>
{"自動で複数 AZ"}
</td>
<td>
{"グローバルテーブル"}
</td>
<td>
{"オンデマンド/プロビジョンドの容量モードを選択"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon ElastiCache"}
</td>
<td>
{"レプリカとMulti-AZ自動フェイルオーバー(Valkey / Redis OSS)"}
</td>
<td>
{"Global Datastore"}
</td>
<td>
{"Memcached はレプリケーションなし(別途設計が必要)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon EFS"}
</td>
<td>
{"複数 AZ に自動冗長化(Standard クラス)"}
</td>
<td>
{"EFS レプリケーション"}
</td>
<td>
{"One Zone クラスは単一 AZ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"ひっかけ"}
</strong>
{": RDS の\n                    "}
<strong>
{"Multi-AZ は「可用性」"}
</strong>
{"、"}
<strong>
{"リードレプリカは「読み取りのスケールアウト(+DR)」"}
</strong>
{"。目的が違うので混同しないこと。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-c-auto-scalingポリシーとイベント"} tabIndex={-1}>
{"\n                    Step 2-C: Auto Scaling(ポリシーとイベント)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 35：Step 2-C: Auto Scaling(ポリシーとイベント)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"スケーリング方式"}
</th>
<th scope="col">
{"内容"}
</th>
<th scope="col">
{"使いどころ"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ターゲット追跡"}
</td>
<td>
{"指標(例: CPU 50%)を目標値に保つよう自動調整"}
</td>
<td>
<strong>
{"最初の選択肢"}
</strong>
{"。設定が簡単"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ステップスケーリング"}
</td>
<td>
{"アラームの超過幅に応じて段階的に増減"}
</td>
<td>
{"負荷に応じたきめ細かい調整"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"スケジュールスケーリング"}
</td>
<td>
{"時刻や日付で増減"}
</td>
<td>
{"予測できる負荷(営業時間、イベント)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"予測スケーリング"}
</td>
<td>
{"過去のパターンを機械学習で予測し事前に拡張"}
</td>
<td>
{"周期的な負荷、起動に時間がかかるアプリ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"カスタムメトリクス"}
</td>
<td>
{"例: SQS の「1インスタンスあたりの待ちメッセージ数」"}
</td>
<td>
{"キュー処理ワーカーの最適な増減"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 36：Step 2-C: Auto Scaling(ポリシーとイベント)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"関連機能"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ライフサイクルフック"}
</td>
<td>
{"起動/終了の途中で処理を挟む(設定完了待ち、ログ退避など)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ウォームプール"}
</td>
<td>
{"\n                                    事前に初期化済みのインスタンスを待機させ、スケールアウトを高速化\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"インスタンスリフレッシュ"}
</td>
<td>
{"AMI 更新などで段階的にインスタンスを入れ替え"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ヘルスチェック"}
</td>
<td>
{"\n                                    EC2 と ELB のヘルスチェックを併用し、アプリ異常も検知して置換\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"通知(イベント)"}
</td>
<td>
{"起動、終了、失敗を SNS / EventBridge に通知"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-d-疎結合アプリケーション統合"} tabIndex={-1}>
{"\n                    Step 2-D: 疎結合(アプリケーション統合)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"密結合の問題"}
</strong>
{":\n                    呼び出し先が落ちたり遅くなると、呼び出し元も連鎖して落ちます。間にキューやイベントバスを挟むと、"}
<strong>
{"片方が止まっても他方は影響を受けにくく"}
</strong>
{"なります。\n                "}
</p>
{"\n                "}
<Diagram id="diag-14" label={"Step 2-D: 疎結合(アプリケーション統合)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 37：Step 2-D: 疎結合(アプリケーション統合)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"サービス"}
</th>
<th scope="col">
{"役割"}
</th>
<th scope="col">
{"試験の要点"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Amazon SQS"}
</td>
<td>
{"\n                                    メッセージキュー(バッファ)。標準(ほぼ無制限スループット、順序保証なし、少なくとも1回)、FIFO(順序保証、重複排除)\n                                "}
</td>
<td>
{"\n                                    可視性タイムアウト、ロングポーリング、"}
<strong>
{"デッドレターキュー"}
</strong>
{"(失敗メッセージの隔離)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Amazon SNS"}
</td>
<td>
{"Pub/Sub(1つのメッセージを多数へ配信)"}
</td>
<td>
{"\n                                    "}
<strong>
{"SNS + SQS のファンアウト"}
</strong>
{"、フィルターポリシー\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon EventBridge"}
</td>
<td>
{"\n                                    イベントバス。ルールでイベントをターゲットへ振り分け、SaaS/AWS\n                                    サービスのイベントを連携\n                                "}
</td>
<td>
{"スケジュール実行、イベント駆動"}
</td>
</tr>
<tr className={"even"}>
<td>
{"AWS Step Functions"}
</td>
<td>
{"\n                                    ワークフローのオーケストレーション。リトライ、エラー処理、並列処理、人の承認待ちを定義\n                                "}
</td>
<td>
{"\n                                    Standard(長時間。ワークフロー実行は exactly-once だが、"}
<code>
{"Retry"}
</code>
{"\n                                    を定義したタスクは再実行されうる)と\n                                    Express(高頻度、短時間。非同期は at-least-once、同期は\n                                    at-most-once)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Amazon Kinesis / MSK"}
</td>
<td>
{"ストリーミングデータの取り込み"}
</td>
<td>
{"順序付きのリアルタイム処理"}
</td>
</tr>
<tr className={"even"}>
<td>
{"API Gateway"}
</td>
<td>
{"API の公開、スロットリング、キャッシュ"}
</td>
<td>
{"バックエンドの保護"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"callout-practice"}>
{"\n                    "}
<div className={"icon"}>
{"✓"}
</div>
{"\n                    "}
<div className={"body"}>
{"\n                        "}
<div className={"label"}>
{"ベストプラクティス"}
</div>
{"\n                        "}
<ul>
{"\n                            "}
<li>
{"\n                                "}
<strong>
{"同期呼び出しを減らし、非同期(キュー/イベント)にする"}
</strong>
{"\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                処理は"}
<strong>
{"冪等"}
</strong>
{"(同じメッセージを2回処理しても結果が同じ)に設計する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                リトライには"}
<strong>
{"指数バックオフとジッター"}
</strong>
{"を使い、再試行の集中を避ける\n                            "}
</li>
{"\n                            "}
<li>
<strong>
{"デッドレターキュー"}
</strong>
{"と監視アラームを必ず設定する"}
</li>
{"\n                            "}
<li>
{"\n                                Step Functions\n                                で"}
<strong>
{"リトライとエラー分岐"}
</strong>
{"を明示し、障害時の補償処理(Saga\n                                パターン)を設計する\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-e-サービスクォータ上限"} tabIndex={-1}>
{"Step 2-E: サービスクォータ(上限)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 38：Step 2-E: サービスクォータ(上限)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"項目"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Service Quotas"}
</td>
<td>
{"クォータの確認、引き上げ申請、使用率アラーム設定を一元管理"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Trusted Advisor"}
</td>
<td>
{"クォータ使用率が高いサービスを警告"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"設計上の注意"}
</td>
<td>
{"\n                                    急なスケールアウトや"}
<strong>
{"DR 先リージョンで上限に達して起動できない"}
</strong>
{"事態を防ぐ。リージョンごと・アカウントごとにクォータが異なるため、事前に引き上げる\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ソフトリミットとハードリミット"}
</td>
<td>
{"\n                                    引き上げ可能なものと不可能なものがある。設計上の制約として把握する\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-f-dns-ルーティングポリシーroute-53"} tabIndex={-1}>
{"\n                    Step 2-F: DNS ルーティングポリシー(Route 53)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 39：Step 2-F: DNS ルーティングポリシー(Route 53)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ポリシー"}
</th>
<th scope="col">
{"動作"}
</th>
<th scope="col">
{"典型的な用途"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"シンプル"}
</td>
<td>
{"\n                                    1つのレコードに1つ(または複数)の値を返す。ヘルスチェック連動なし\n                                "}
</td>
<td>
{"単純な構成"}
</td>
</tr>
<tr className={"even"}>
<td>
{"加重 (Weighted)"}
</td>
<td>
{"比率で振り分け(例: 90:10)"}
</td>
<td>
<strong>
{"カナリア/Blue/Green"}
</strong>
{"、段階的移行"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"レイテンシー"}
</td>
<td>
{"ユーザーに"}
<strong>
{"最も遅延が小さい"}
</strong>
{"リージョンへ"}
</td>
<td>
{"グローバル展開でのパフォーマンス最適化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"フェイルオーバー"}
</td>
<td>
{"プライマリが異常ならセカンダリへ"}
</td>
<td>
{"Active-Passive の DR"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"位置情報 (Geolocation)"}
</td>
<td>
<strong>
{"ユーザーの所在地(国・大陸)"}
</strong>
{"で振り分け"}
</td>
<td>
{"言語、コンテンツ規制、データ主権"}
</td>
</tr>
<tr className={"even"}>
<td>
{"地理的近接 (Geoproximity)"}
</td>
<td>
{"\n                                    リソースの場所と"}
<strong>
{"バイアス"}
</strong>
{"でトラフィック量を調整\n                                "}
</td>
<td>
{"リージョン間の比率を地理的に調整"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"IP ベース"}
</td>
<td>
{"クライアントの IP 範囲(CIDR)で振り分け"}
</td>
<td>
{"特定 ISP/ネットワークを特定のエンドポイントへ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"複数値回答"}
</td>
<td>
{"最大8件の正常な値を返す(ヘルスチェック付き)"}
</td>
<td>
{"簡易的な負荷分散"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"ひっかけ"}
</strong>
{": 「"}
<strong>
{"最も速い"}
</strong>
{"リージョン」=\n                    レイテンシー、「"}
<strong>
{"国ごとに"}
</strong>
{"コンテンツを出し分け」=\n                    位置情報、「"}
<strong>
{"災害時に切り替え"}
</strong>
{"」=\n                    フェイルオーバー、「"}
<strong>
{"徐々に移行"}
</strong>
{"」= 加重。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-g-障害を前提とした設計design-for-failure"} tabIndex={-1}>
{"\n                    Step 2-G: 障害を前提とした設計(Design for Failure)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 40：Step 2-G: 障害を前提とした設計(Design for Failure)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"原則"}
</th>
<th scope="col">
{"具体策"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"単一障害点を排除"}
</td>
<td>
{"すべての層を複数 AZ に。NAT ゲートウェイや DB も冗長化"}
</td>
</tr>
<tr className={"even"}>
<td>
{"障害を自動で検知・復旧"}
</td>
<td>
{"ヘルスチェック、Auto Scaling の置換、自動フェイルオーバー"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"連鎖障害を防ぐ"}
</td>
<td>
{"\n                                    タイムアウト、リトライ(バックオフ)、サーキットブレーカー、バルクヘッド(隔離)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"グレースフルデグラデーション"}
</td>
<td>
{"\n                                    一部機能が落ちても主要機能は継続(キャッシュの古い値を返す等)\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ステートレス化"}
</td>
<td>
{"セッション情報を ElastiCache や DynamoDB に外出し"}
</td>
</tr>
<tr className={"even"}>
<td>
{"回復力のテスト"}
</td>
<td>
{"FIS による障害注入、ゲームデイ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-3-task-24-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.4 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 41：Step 3: Task 2.4 試験のコツ"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"問題文のキーワード"}
</th>
<th scope="col">
{"選ぶべき方向性"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"「AZ 障害でも継続」"}
</td>
<td>
{"複数 AZ の ELB + Auto Scaling + Multi-AZ DB"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「バックエンドの急増に耐える」「処理の取りこぼしを防ぐ」"}
</td>
<td>
{"SQS でバッファリング"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「1つのイベントを複数システムへ」"}
</td>
<td>
{"SNS + SQS ファンアウト、EventBridge"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「複雑な処理フロー、リトライ、分岐」"}
</td>
<td>
{"Step Functions"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「失敗を繰り返すメッセージを退避」"}
</td>
<td>
{"SQS デッドレターキュー"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「予測できる負荷」"}
</td>
<td>
{"スケジュール/予測スケーリング"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「DR 先で起動できない」"}
</td>
<td>
{"Service Quotas の事前引き上げ"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
</>; }
