import { Diagram } from "../Diagram";

export default function Task15() {
    return (
        <section className="guide-section" data-section="task15">
<h2 id="6-task-15-コスト最適化と可視化の戦略を決める" tabIndex={-1}>
                    6. Task 1.5 コスト最適化と可視化の戦略を決める
                </h2>
<h3 id="61-exam-guide-が求めている内容" tabIndex={-1}>6.1 Exam Guide が求めている内容</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.1 Exam Guide が求めている内容 (表40)"}>
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
                                    コストと使用状況の監視ツール (Trusted Advisor, Pricing
                                    Calculator, Cost Explorer, Budgets), 購入オプション
                                    (リザーブドインスタンス, Savings Plans, スポットインスタンス),
                                    右サイジングの可視化ツール (Compute Optimizer, S3 Storage Lens)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Skills</td>
                                <td>
                                    AWS ツールでのコストと使用状況の監視,
                                    コストを事業部門に紐づける効果的なタグ戦略の策定,
                                    購入オプションがコストとパフォーマンスに与える影響の理解
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="62-step-1-コストを見る-可視化ツール" tabIndex={-1}>
                    6.2 Step 1: コストを見る (可視化ツール)
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.2 Step 1: コストを見る (可視化ツール) (表41)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ツール</th>
                                <th scope="col">用途</th>
                                <th scope="col">ポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>AWS Cost Explorer</td>
                                <td>コストと使用量を可視化、分析、予測</td>
                                <td>
                                    サービス、アカウント、タグ、リージョンなどで絞り込みやグループ化。RI
                                    と Savings Plans の推奨も確認可能
                                </td>
                            </tr>
                            <tr className="even">
                                <td>AWS Budgets</td>
                                <td>予算を設定し、超過や予測超過をアラート</td>
                                <td>
                                    コスト、使用量、RI と Savings Plans
                                    の使用率とカバレッジの予算。予算アクションで自動対応も可能
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Cost and Usage Report (CUR)</td>
                                <td>最も詳細なコストと使用量データ</td>
                                <td>
                                    S3 に出力し、Athena や QuickSight
                                    で分析。レポート作成時に「リソース ID を含める (Include resource
                                    IDs)」を選択した場合のみリソース単位まで確認可能
                                </td>
                            </tr>
                            <tr className="even">
                                <td>AWS Cost Anomaly Detection</td>
                                <td>想定外のコスト急増を機械学習で検知</td>
                                <td>通知先を設定して早期に気づく</td>
                            </tr>
                            <tr className="odd">
                                <td>AWS Trusted Advisor</td>
                                <td>
                                    コスト、セキュリティ、耐障害性などのベストプラクティスチェック
                                </td>
                                <td>利用できるチェックの範囲は AWS サポートプランに依存する</td>
                            </tr>
                            <tr className="even">
                                <td>AWS Pricing Calculator</td>
                                <td>構築前の料金見積もり</td>
                                <td>設計段階でのコスト比較に使う</td>
                            </tr>
                            <tr className="odd">
                                <td>Cost Categories</td>
                                <td>コストを独自のルールで分類</td>
                                <td>事業部門やプロジェクトごとの集計に使える</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html">https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html">https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html">https://docs.aws.amazon.com/cur/latest/userguide/what-is-cur.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html">https://docs.aws.amazon.com/cost-management/latest/userguide/manage-ad.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html">https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html</a>
                    </li>
                    <li><a href="https://calculator.aws/">https://calculator.aws/</a></li>
                </ul>
<h3 id="63-step-2-購入オプションを選ぶ" tabIndex={-1}>6.3 Step 2: 購入オプションを選ぶ</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.3 Step 2: 購入オプションを選ぶ (表42)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">オプション</th>
                                <th scope="col">割引の目安</th>
                                <th scope="col">仕組み</th>
                                <th scope="col">向いているケース</th>
                                <th scope="col">注意点</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>オンデマンド</td>
                                <td>なし</td>
                                <td>使った分だけ従量課金</td>
                                <td>予測不能、短期、試験的な負荷</td>
                                <td>最も柔軟だが割高</td>
                            </tr>
                            <tr className="even">
                                <td>リザーブドインスタンス (RI)</td>
                                <td>最大約72%</td>
                                <td>
                                    1年または3年の利用を約束。スタンダードとコンバーティブルがある
                                </td>
                                <td>安定した特定のインスタンスの利用</td>
                                <td>コンバーティブルは変更可能だが割引率はやや低い</td>
                            </tr>
                            <tr className="odd">
                                <td>Savings Plans</td>
                                <td>
                                    タイプ別: Compute 最大約66%、EC2 Instance 最大約72%、Database
                                    最大約35%
                                </td>
                                <td>
                                    1時間あたりの利用額 (ドル) を約束。Compute と EC2 Instance
                                    は1年または3年、Database は1年
                                </td>
                                <td>構成が変わりうる安定した利用</td>
                                <td>
                                    Compute Savings Plans は EC2、Fargate、Lambda
                                    に適用され柔軟。EC2 Instance Savings Plans
                                    は特定リージョンのインスタンスファミリーに限定。Database Savings
                                    Plans は Aurora や RDS などが対象
                                </td>
                            </tr>
                            <tr className="even">
                                <td>スポットインスタンス</td>
                                <td>最大約90%</td>
                                <td>余剰容量を低価格で利用。中断される可能性あり (2分前に通知)</td>
                                <td>中断に耐える処理 (バッチ、分析、CI)</td>
                                <td>状態保持が必要な処理や中断不可の処理には不向き</td>
                            </tr>
                            <tr className="odd">
                                <td>Dedicated Hosts</td>
                                <td>要件次第</td>
                                <td>物理サーバーを専有</td>
                                <td>既存のサーバーライセンス (BYOL) や規制要件</td>
                                <td>コストが高くなりやすい</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>
                    割引率は AWS
                    が公表する上限の目安で、リージョンや条件によって変わります。最新の料金は公式ページで確認してください。
                </p>
<Diagram id="diag-18" label={"6.3 Step 2: 購入オプションを選ぶ"} />
<p>組織での活用ポイント:</p>
<ul>
                    <li>
                        一括請求では、RI と Savings Plans
                        の割引が組織内のアカウント間で自動的に共有される。購入は集約して、使用率を高める
                    </li>
                    <li>
                        ベースの使用量は Savings
                        Plans、変動分はオンデマンド、中断可能なものはスポットを組み合わせる
                        (ミックス戦略)
                    </li>
                    <li>
                        スポットを使う場合は、複数のインスタンスタイプと AZ
                        に分散して中断の影響を減らす
                    </li>
                </ul>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html">https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html">https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-spot-instances.html</a>
                    </li>
                </ul>
<h3 id="631-購入オプションがパフォーマンスに与える影響" tabIndex={-1}>
                    6.3.1 購入オプションがパフォーマンスに与える影響
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.3.1 購入オプションがパフォーマンスに与える影響 (表43)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>性能そのもの</td>
                                <td>
                                    購入オプション (RI、Savings Plans、オンデマンド)
                                    は性能を変えない。同じインスタンスなら性能は同じ
                                </td>
                            </tr>
                            <tr className="even">
                                <td>スポットの中断</td>
                                <td>
                                    中断されると処理が止まるため、可用性やスループットに影響する。中断耐性のある設計が前提
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>容量の確保</td>
                                <td>
                                    RI (ゾーン指定)
                                    とキャパシティ予約は容量を確保できる。スポットとオンデマンドは容量不足の可能性がある
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="64-step-3-タグ戦略でコストを事業部門に紐づける" tabIndex={-1}>
                    6.4 Step 3: タグ戦略でコストを事業部門に紐づける
                </h3>
<p>コスト配分タグを使うと、コストを部門、プロジェクト、環境ごとに集計できます。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.4 Step 3: タグ戦略でコストを事業部門に紐づける (表44)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">手順</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>1. タグ設計</td>
                                <td>
                                    必須タグのキーと値のルールを決める (例: CostCenter, Project,
                                    Environment, Owner)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>2. 有効化</td>
                                <td>
                                    請求コンソールで「コスト配分タグ」を有効化する。有効化後に反映まで時間がかかり、過去分には遡って適用されない
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>3. 強制</td>
                                <td>
                                    タグポリシーで形式を統一する。SCP
                                    の条件キーで対応するリソース作成リクエストをタグなしなら拒否し、AWS
                                    Config の required-tags
                                    ルールで未タグのリソースを検出して修復する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>4. 分析</td>
                                <td>Cost Explorer、CUR、Cost Categories でタグ別に集計する</td>
                            </tr>
                            <tr className="odd">
                                <td>5. 運用</td>
                                <td>未タグのリソースを定期的に検出して修正する</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<Diagram id="diag-19" label={"6.4 Step 3: タグ戦略でコストを事業部門に紐づける"} />
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.4 Step 3: タグ戦略でコストを事業部門に紐づける (表45)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">タグの例</th>
                                <th scope="col">値の例</th>
                                <th scope="col">用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>CostCenter</td>
                                <td>CC-1001</td>
                                <td>部門への配賦</td>
                            </tr>
                            <tr className="even">
                                <td>Project</td>
                                <td>project-alpha</td>
                                <td>プロジェクト別の集計</td>
                            </tr>
                            <tr className="odd">
                                <td>Environment</td>
                                <td>prod, dev</td>
                                <td>環境別のコスト比較</td>
                            </tr>
                            <tr className="even">
                                <td>Owner</td>
                                <td>team-a</td>
                                <td>担当者の明確化</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>重要な注意点:</p>
<ul>
                    <li>
                        タグポリシーは、タグの形式を標準化するもので、タグの付与そのものを自動で必須化するわけではない。作成時の拒否には
                        SCP の条件キーを使い (対応するリソースのみ)、作成後の検出と修復には Config
                        の required-tags ルールを使う
                    </li>
                    <li>
                        アカウントを事業部門ごとに分ける設計は、タグよりも確実なコスト分離になる
                        (Task 1.4 と連動)
                    </li>
                    <li>
                        タグ付けできないコストや共有コストは、Cost Categories
                        などで按分のルールを設ける
                    </li>
                </ul>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html">https://docs.aws.amazon.com/awsaccountbilling/latest/aboutv2/cost-alloc-tags.html</a>
                    </li>
                    <li>
                        Tagging Best Practices:{" "}
                        <a href="https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html">https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html</a>
                    </li>
                </ul>
<h3 id="65-step-4-右サイジング-rightsizing-の可視化" tabIndex={-1}>
                    6.5 Step 4: 右サイジング (Rightsizing) の可視化
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.5 Step 4: 右サイジング (Rightsizing) の可視化 (表46)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ツール</th>
                                <th scope="col">内容</th>
                                <th scope="col">ポイント</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>AWS Compute Optimizer</td>
                                <td>
                                    EC2、Auto Scaling グループ、EBS、Lambda
                                    などの最適な構成を機械学習で推奨
                                </td>
                                <td>
                                    利用には有効化 (オプトイン) が必要。メモリ使用率の分析には
                                    CloudWatch エージェントの導入が必要。組織全体で有効化できる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Amazon S3 Storage Lens</td>
                                <td>S3 の使用状況とアクティビティを組織全体で可視化</td>
                                <td>
                                    コスト最適化や保護の観点の指標を提供。無料と有料 (高度な)
                                    のメトリクスがある
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>S3 ライフサイクルと Intelligent-Tiering</td>
                                <td>アクセス頻度に応じて自動で低コスト層へ移行</td>
                                <td>アクセスパターンが不明な場合は Intelligent-Tiering</td>
                            </tr>
                            <tr className="even">
                                <td>Trusted Advisor</td>
                                <td>使われていないリソースや低使用率のリソースを指摘</td>
                                <td>サポートプランによって利用範囲が異なる</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>出典:</p>
<ul>
                    <li>
                        <a href="https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html">https://docs.aws.amazon.com/compute-optimizer/latest/ug/what-is-compute-optimizer.html</a>
                    </li>
                    <li>
                        <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage_lens.html</a>
                    </li>
                </ul>
<h3 id="66-step-5-データ転送コストの考え方-補足" tabIndex={-1}>
                    6.6 Step 5: データ転送コストの考え方 (補足)
                </h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.6 Step 5: データ転送コストの考え方 (補足) (表47)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">通信の種類</th>
                                <th scope="col">コストの考え方</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>同一 AZ 内のプライベート IP 通信</td>
                                <td>一般に無料</td>
                            </tr>
                            <tr className="even">
                                <td>AZ をまたぐ通信</td>
                                <td>課金対象。高可用性とコストのトレードオフになる</td>
                            </tr>
                            <tr className="odd">
                                <td>リージョンをまたぐ通信</td>
                                <td>課金対象。DR のレプリケーションで考慮が必要</td>
                            </tr>
                            <tr className="even">
                                <td>インターネットへの送信</td>
                                <td>課金対象。CloudFront を使うと削減できる場合がある</td>
                            </tr>
                            <tr className="odd">
                                <td>NAT Gateway 経由の通信</td>
                                <td>
                                    時間料金に加えてデータ処理料金が発生。Gateway エンドポイントで
                                    S3 と DynamoDB のトラフィックを逃がして削減
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Transit Gateway 経由の通信</td>
                                <td>アタッチメント料金とデータ処理料金が発生</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="67-task-15-ベストプラクティスまとめ" tabIndex={-1}>
                    6.7 Task 1.5 ベストプラクティスまとめ
                </h3>
<ul>
                    <li>予算と異常検知アラートを最初から設定し、コスト急増を早期に検知する</li>
                    <li>タグ戦略は設計の初期に決め、必須化する</li>
                    <li>
                        購入オプションは「ベース使用量は約束型、変動はオンデマンド、中断可能はスポット」の組み合わせ
                    </li>
                    <li>
                        Compute Optimizer と Trusted Advisor
                        を定期的に確認し、右サイジングを継続する
                    </li>
                    <li>
                        データ転送の経路 (NAT、AZ 間、リージョン間) をアーキテクチャ設計時に見積もる
                    </li>
                </ul>
<h3 id="68-task-15-よく狙われる落とし穴" tabIndex={-1}>6.8 Task 1.5 よく狙われる落とし穴</h3>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"6.8 Task 1.5 よく狙われる落とし穴 (表48)"}>
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
                                <td>中断できない本番 DB のコスト削減</td>
                                <td>スポットインスタンス</td>
                                <td>RI や Savings Plans</td>
                            </tr>
                            <tr className="even">
                                <td>インスタンスファミリーを変える予定がある</td>
                                <td>EC2 Instance Savings Plans やスタンダード RI</td>
                                <td>Compute Savings Plans やコンバーティブル RI</td>
                            </tr>
                            <tr className="odd">
                                <td>タグ別にコストを見たい</td>
                                <td>タグを付けただけ</td>
                                <td>コスト配分タグの有効化も必要 (遡及適用はされない)</td>
                            </tr>
                            <tr className="even">
                                <td>全タグの付与を必須にしたい</td>
                                <td>タグポリシーのみ</td>
                                <td>SCP で作成時に拒否し、Config ルールで検出と修復</td>
                            </tr>
                            <tr className="odd">
                                <td>予算超過時に自動で停止したい</td>
                                <td>通知のみ</td>
                                <td>Budgets の予算アクション</td>
                            </tr>
                            <tr className="even">
                                <td>リソース単位の最も詳細な分析</td>
                                <td>Cost Explorer のみ</td>
                                <td>Cost and Usage Report と Athena</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<hr />
        </section>
    );
}
