import { Diagram } from "../Diagram";

export default function Task13() {
    return (
        <section className="guide-section" data-section="task13">
<h2 id="4-task-13-信頼性と復元力のあるアーキテクチャを設計する" tabIndex={-1}>
                    4. Task 1.3 信頼性と復元力のあるアーキテクチャを設計する
                </h2>
<h3 id="41-exam-guide-が求めている内容" tabIndex={-1}>4.1 Exam Guide が求めている内容</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4.1 Exam Guide が求めている内容 (表22)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">区分</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Knowledge</td>
                                <td>
                                    RTO と RPO, 災害対策 (AWS Elastic Disaster Recovery,
                                    パイロットライト, ウォームスタンバイ, マルチサイト),
                                    バックアップと復元
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Skills</td>
                                <td>
                                    RTO と RPO に基づく DR 設計,
                                    障害からの自動復旧を実装するアーキテクチャ,
                                    スケールアップとスケールアウトの比較による最適な設計,
                                    効果的なバックアップと復元の戦略
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="42-step-1-rto-と-rpo-を理解する" tabIndex={-1}>4.2 Step 1: RTO と RPO を理解する</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4.2 Step 1: RTO と RPO を理解する (表23)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">指標</th>
                                <th scope="col">意味</th>
                                <th scope="col">問いかけ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>RTO (Recovery Time Objective)</td>
                                <td>障害発生から復旧までに許容できる時間</td>
                                <td>何分で元に戻す必要があるか</td>
                            </tr>
                            <tr className="even">
                                <td>RPO (Recovery Point Objective)</td>
                                <td>許容できるデータ損失の時間幅</td>
                                <td>最後のバックアップから何分のデータ損失まで許されるか</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<ul>
                    <li>RTO と RPO が小さい (厳しい) ほど、構成は複雑になりコストは高くなる</li>
                    <li>
                        試験では、要件の RTO と RPO を満たす中で最も安価な方式を選ぶ問題が頻出する
                    </li>
                </ul>
<h3 id="43-step-2-4つの-dr-戦略" tabIndex={-1}>4.3 Step 2: 4つの DR 戦略</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4.3 Step 2: 4つの DR 戦略 (表24)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">戦略</th>
                                <th scope="col">RTO と RPO の目安</th>
                                <th scope="col">構成の概要</th>
                                <th scope="col">コスト</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>バックアップと復元 (Backup and Restore)</td>
                                <td>時間単位</td>
                                <td>データをバックアップし、障害時にインフラを再構築して復元</td>
                                <td>最も低い</td>
                            </tr>
                            <tr className="even">
                                <td>パイロットライト (Pilot Light)</td>
                                <td>数十分</td>
                                <td>
                                    データは常時レプリケートし、最小限のコア機能のみ稼働。障害時に本格的に起動して拡張
                                </td>
                                <td>低い</td>
                            </tr>
                            <tr className="odd">
                                <td>ウォームスタンバイ (Warm Standby)</td>
                                <td>分単位</td>
                                <td>縮小した完全構成を常時稼働。障害時にスケールアップ</td>
                                <td>中程度</td>
                            </tr>
                            <tr className="even">
                                <td>マルチサイト Active/Active</td>
                                <td>ほぼゼロに近い</td>
                                <td>複数リージョンで同時に稼働し、トラフィックを分散</td>
                                <td>最も高い</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<Diagram id="diag-13" label={"4.3 Step 2: 4つの DR 戦略"} />
<p>
                    {"出典: "}{" "}
                    <a href="https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html">https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-workloads-on-aws.html</a>
                </p>
<h3 id="44-step-3-aws-elastic-disaster-recovery-drs" tabIndex={-1}>
                    4.4 Step 3: AWS Elastic Disaster Recovery (DRS)
                </h3>
<ul>
                    <li>
                        オンプレミスや他クラウド、AWS 上のサーバーを、AWS
                        の復旧先リージョンへ継続的にブロックレベルでレプリケートするサービス
                    </li>
                    <li>
                        復旧先には低コストなステージングエリアを置き、レプリケーションデータを保持する。障害時またはテスト時にのみ復旧用インスタンスを起動する
                        (パイロットライトに近い方式)
                    </li>
                    <li>
                        ポイントインタイム復旧が可能で、ランサムウェアなどデータ破損前の時点へ戻せる
                    </li>
                    <li>実環境に影響を与えずに DR 訓練 (ドリル) を実施できる</li>
                    <li>復旧後の元の環境への切り戻し (フェイルバック) にも対応している</li>
                </ul>
<Diagram id="diag-14" label={"4.4 Step 3: AWS Elastic Disaster Recovery (DRS)"} />
<p>
                    {"出典: "}{" "}
                    <a href="https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html">https://docs.aws.amazon.com/drs/latest/userguide/what-is-drs.html</a>
                </p>
<h3 id="45-step-4-自動復旧とデータレプリケーション" tabIndex={-1}>
                    4.5 Step 4: 自動復旧とデータレプリケーション
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4.5 Step 4: 自動復旧とデータレプリケーション (表25)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">領域</th>
                                <th scope="col">仕組み</th>
                                <th scope="col">ポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>EC2 の自己修復</td>
                                <td>
                                    Auto Scaling
                                    グループのヘルスチェックで異常なインスタンスを自動入れ替え。単一インスタンスなら最小と最大を1にして自己修復
                                </td>
                                <td>ELB のヘルスチェックを連携させる</td>
                            </tr>
                            <tr className="even">
                                <td>ロードバランサー</td>
                                <td>複数 AZ に配置し、異常なターゲットを自動で除外</td>
                                <td>クロスゾーン負荷分散の仕様を確認</td>
                            </tr>
                            <tr className="odd">
                                <td>DNS フェイルオーバー</td>
                                <td>Route 53 のヘルスチェックとフェイルオーバールーティング</td>
                                <td>主系の異常時に副系へ切り替え</td>
                            </tr>
                            <tr className="even">
                                <td>RDS Multi-AZ</td>
                                <td>
                                    別 AZ
                                    のスタンバイへ同期レプリケーションし、障害時に自動フェイルオーバー
                                </td>
                                <td>高可用性が目的 (リード拡張は目的外)</td>
                            </tr>
                            <tr className="odd">
                                <td>RDS リードレプリカ</td>
                                <td>非同期レプリケーション。リージョンをまたぐ作成と昇格が可能</td>
                                <td>読み取り分散と DR の補助</td>
                            </tr>
                            <tr className="even">
                                <td>Aurora</td>
                                <td>
                                    ストレージは3つの AZ に6つのコピーを保持。Aurora Global Database
                                    でリージョン間の低遅延レプリケーション
                                </td>
                                <td>リージョン障害に備える DR に有効</td>
                            </tr>
                            <tr className="odd">
                                <td>DynamoDB</td>
                                <td>グローバルテーブルでマルチリージョンの Active/Active、PITR</td>
                                <td>低 RPO の要件に有効</td>
                            </tr>
                            <tr className="even">
                                <td>S3</td>
                                <td>
                                    クロスリージョンレプリケーション (CRR)。Replication Time Control
                                    (RTC) は新規オブジェクトの 99.99% を15分以内に複製することを保証
                                    (全オブジェクトの15分以内の複製を保証するものではない)
                                </td>
                                <td>別リージョンに複製して DR とコンプライアンスに対応</td>
                            </tr>
                            <tr className="odd">
                                <td>EBS と AMI</td>
                                <td>スナップショットを別リージョンにコピー</td>
                                <td>バックアップと復元戦略の基本</td>
                            </tr>
                            <tr className="even">
                                <td>監視と自動対応</td>
                                <td>
                                    CloudWatch アラーム、EventBridge、Systems Manager Automation
                                </td>
                                <td>検知から復旧操作までを自動化</td>
                            </tr>
                            <tr className="odd">
                                <td>インフラ再現</td>
                                <td>CloudFormation と StackSets</td>
                                <td>DR 側の環境をコードで再現</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html">https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html">https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html</a>
                    </li>
                </ul>
<h3 id="46-step-5-スケールアップとスケールアウト" tabIndex={-1}>
                    4.6 Step 5: スケールアップとスケールアウト
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4.6 Step 5: スケールアップとスケールアウト (表26)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">スケールアップ (垂直)</th>
                                <th scope="col">スケールアウト (水平)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>方法</td>
                                <td>より大きなインスタンスへ変更</td>
                                <td>インスタンス数を増やす</td>
                            </tr>
                            <tr className="even">
                                <td>可用性</td>
                                <td>変更時に停止が発生しやすく、単一障害点が残る</td>
                                <td>複数 AZ に分散でき、障害に強い</td>
                            </tr>
                            <tr className="odd">
                                <td>上限</td>
                                <td>インスタンスサイズに上限がある</td>
                                <td>理論上はより大きく拡張できる</td>
                            </tr>
                            <tr className="even">
                                <td>前提</td>
                                <td>構成変更が少なくて済む</td>
                                <td>アプリケーションをステートレスにする必要がある</td>
                            </tr>
                            <tr className="odd">
                                <td>典型例</td>
                                <td>既存 DB の性能向上</td>
                                <td>Web 層と AP 層の Auto Scaling</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<ul>
                    <li>
                        状態 (セッション) は ElastiCache や DynamoDB
                        など外部に出し、インスタンスをステートレスにする
                    </li>
                    <li>
                        Auto Scaling
                        はターゲット追跡スケーリングを基本にし、需要が予測できる場合は予測スケーリングやスケジュールを併用する
                    </li>
                    <li>複数 AZ にまたがる配置が、スケールアウトの信頼性メリットを引き出す</li>
                </ul>
<h3 id="47-step-6-バックアップと復元の戦略-aws-backup" tabIndex={-1}>
                    4.7 Step 6: バックアップと復元の戦略 (AWS Backup)
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4.7 Step 6: バックアップと復元の戦略 (AWS Backup) (表27)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機能</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>バックアッププラン</td>
                                <td>
                                    スケジュール、保持期間、ライフサイクル
                                    (コールドストレージへの移行) を定義
                                </td>
                            </tr>
                            <tr className="even">
                                <td>タグによる割り当て</td>
                                <td>タグが付いたリソースを自動的にバックアップ対象にする</td>
                            </tr>
                            <tr className="odd">
                                <td>クロスリージョンとクロスアカウントコピー</td>
                                <td>
                                    別リージョンや別アカウントにバックアップを複製して耐障害性を高める
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Backup Vault Lock</td>
                                <td>
                                    ガバナンスモードとコンプライアンスモードがある。ランサムウェア対策にはコンプライアンスモードを使う。猶予期間
                                    (グレースタイム) の終了後に変更不可となり、ルートユーザーや AWS
                                    でも解除できない。保持期間が終わるまで復旧ポイントを削除できず、そのストレージコストも払い続ける
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Organizations との統合</td>
                                <td>バックアップポリシーを組織全体に適用</td>
                            </tr>
                            <tr className="even">
                                <td>復元テスト</td>
                                <td>復元できることを定期的に自動検証</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<div className="callout-practice">
                    <div className="icon">✓</div>
                    <div className="body">
                        <div className="label">ベストプラクティス</div>
                        <ul>
                            <li>
                                「3-2-1 ルール」を目安にする
                                (3つのコピー、2種類の媒体、1つはオフサイト)
                            </li>
                            <li>
                                バックアップは本番とは別のアカウントとリージョンに保管し、侵害の影響範囲を分離する
                            </li>
                            <li>復元テストを実施する。復元できないバックアップは意味がない</li>
                            <li>
                                保持期間は法規制とコストの両面で設計し、ライフサイクルで古いデータを低コスト層に移す
                            </li>
                        </ul>
                    </div>
                </div>
<p>
                    {"出典: "}{" "}
                    <a href="https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html">https://docs.aws.amazon.com/aws-backup/latest/devguide/whatisbackup.html</a>
                </p>
<h3 id="48-task-13-ベストプラクティスまとめ" tabIndex={-1}>
                    4.8 Task 1.3 ベストプラクティスまとめ
                </h3>
<ul>
                    <li>RTO と RPO を事業側と合意してから DR 戦略を選ぶ</li>
                    <li>単一 AZ や単一インスタンスなど、単一障害点を排除する</li>
                    <li>自動で検知し、自動で復旧する仕組みを優先し、手作業の手順を減らす</li>
                    <li>DR は設計だけでなく、定期的な訓練を実施する</li>
                    <li>バックアップは分離したアカウントに保存し、改ざん防止を有効化する</li>
                </ul>
<h3 id="49-task-13-よく狙われる落とし穴" tabIndex={-1}>4.9 Task 1.3 よく狙われる落とし穴</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"4.9 Task 1.3 よく狙われる落とし穴 (表28)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">状況</th>
                                <th scope="col">誤りやすい選択</th>
                                <th scope="col">正しい考え方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>RTO が数時間でコストを最小にしたい</td>
                                <td>ウォームスタンバイやマルチサイト</td>
                                <td>バックアップと復元</td>
                            </tr>
                            <tr className="even">
                                <td>RPO がほぼゼロでリージョン障害にも備える</td>
                                <td>日次スナップショットのコピー</td>
                                <td>
                                    Aurora Global Database や DynamoDB
                                    グローバルテーブルなどの継続的レプリケーション
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>RDS の高可用性</td>
                                <td>リードレプリカ</td>
                                <td>
                                    Multi-AZ 配置
                                    (リードレプリカは非同期で自動フェイルオーバーが目的ではない)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ランサムウェア対策</td>
                                <td>同一アカウントの通常バックアップ</td>
                                <td>
                                    別アカウントへのコピーと Backup Vault Lock
                                    (コンプライアンスモード。猶予期間後に変更不可となり、保持期間中は削除できない)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>オンプレミスサーバーの DR を低コストで</td>
                                <td>常時フル構成を AWS に用意</td>
                                <td>AWS Elastic Disaster Recovery</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<hr />
        </section>
    );
}
