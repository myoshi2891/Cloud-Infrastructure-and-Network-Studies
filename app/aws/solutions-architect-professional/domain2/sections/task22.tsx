import { Diagram } from '../Diagram';
import type { ChecklistProps } from '../types';
/** 原本のtask22本文。 */
export default function Content({ progress, updateProgress }: ChecklistProps) { void progress; void updateProgress; return <>
<h2 id={"4-task-22-ビジネス継続性の確保"} tabIndex={-1}>
{"4. Task 2.2 ビジネス継続性の確保"}
</h2>
{"\n                "}
<p>
{"公式: 「Design a solution to ensure business continuity」"}
</p>
{"\n                "}
<h3 id={"step-1-何を問われるか-1"} tabIndex={-1}>
{"Step 1: 何を問われるか"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 1: 何を問われるか"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"区分"}
</th>
{"\n                                "}
<th scope="col">
{"公式の項目"}
</th>
{"\n                                "}
<th scope="col">
{"やさしい言い換え"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"AWS グローバルインフラストラクチャ"}
</td>
{"\n                                "}
<td>
{"リージョン、AZ、エッジ拠点の構造"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"Route 53 などのネットワーク概念、ルーティング方式"}
</td>
{"\n                                "}
<td>
{"障害時にトラフィックを別の場所へ向ける方法"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"RTO と RPO"}
</td>
{"\n                                "}
<td>
{"復旧時間とデータ損失許容量"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"知識"}
</td>
{"\n                                "}
<td>
{"\n                                    DR\n                                    シナリオ(バックアップとリストア、パイロットライト、ウォームスタンバイ、マルチサイト)\n                                "}
</td>
{"\n                                "}
<td>
{"災害対策の4つの型"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"スキル"}
</td>
{"\n                                "}
<td>
{"DR の構成、データ/DB レプリケーション、DR テスト"}
</td>
{"\n                                "}
<td>
{"実際に作る・複製する・訓練する"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"スキル"}
</td>
{"\n                                "}
<td>
{"自動化されコスト効率の高いバックアップ(複数 AZ/リージョン)"}
</td>
{"\n                                "}
<td>
{"勝手に取れて、安くて、遠くにも保管できる"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"スキル"}
</td>
{"\n                                "}
<td>
{"障害時も使える可用性の高い設計、集中監視による事前復旧"}
</td>
{"\n                                "}
<td>
{"壊れても動く、壊れる前に気づく"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-a-aws-グローバルインフラの基礎"} tabIndex={-1}>
{"\n                    Step 2-A: AWS グローバルインフラの基礎\n                "}
</h3>
{"\n                "}
<Diagram id="diag-4" label={"Step 2-A: AWS グローバルインフラの基礎"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart TB\n    G[\"AWS グローバルインフラ\"]\n    R[\"リージョン<br/>地理的に離れた独立した地域\"]\n    AZ[\"アベイラビリティゾーン<br/>リージョン内の独立した拠点\"]\n    E[\"エッジロケーション<br/>CloudFront などの配信拠点\"]\n    LZ[\"Local Zones / Wavelength<br/>ユーザー近くへの拡張\"]\n    G --> R\n    R --> AZ\n    G --> E\n    G --> LZ"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"単位"}
</th>
{"\n                                "}
<th scope="col">
{"障害の想定範囲"}
</th>
{"\n                                "}
<th scope="col">
{"守れる障害の例"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"同一 AZ 内の冗長化"}
</td>
{"\n                                "}
<td>
{"機器単体"}
</td>
{"\n                                "}
<td>
{"サーバー故障"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Multi-AZ"}
</td>
{"\n                                "}
<td>
{"データセンター(AZ)単位"}
</td>
{"\n                                "}
<td>
{"AZ 停電、AZ 障害"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Multi-Region"}
</td>
{"\n                                "}
<td>
{"リージョン全体"}
</td>
{"\n                                "}
<td>
{"リージョン規模の障害、大規模災害、規制要件"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"ポイント"}
</strong>
{":\n                    「リージョン障害まで想定」「規制で遠隔地にデータを置く必要がある」といった要件があるときだけ\n                    Multi-Region を検討します。Multi-AZ で足りるのに Multi-Region\n                    にすると、コストと複雑さが無駄に増えます。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-b-rto-と-rpo"} tabIndex={-1}>
{"Step 2-B: RTO と RPO"}
</h3>
{"\n                "}
<Diagram id="diag-5" label={"Step 2-B: RTO と RPO"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart LR\n    A[\"最後のバックアップ<br/>または複製時点\"] -->|\"RPO<br/>失ってよいデータの期間\"| B[\"障害発生\"]\n    B -->|\"RTO<br/>復旧までに許容できる時間\"| C[\"サービス復旧\"]\n\n    classDef dangerFill fill:#ffdfe5,stroke:#c0213f,color:#5c1020;\n    classDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\n    class B dangerFill\n    class C successFill"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"指標"}
</th>
{"\n                                "}
<th scope="col">
{"意味"}
</th>
{"\n                                "}
<th scope="col">
{"小さくするほど"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"RPO"}
</td>
{"\n                                "}
<td>
{"障害時にどの時点のデータまで戻れればよいか"}
</td>
{"\n                                "}
<td>
{"\n                                    データ損失が減る。レプリケーション頻度/同期性が必要になり高コスト\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"RTO"}
</td>
{"\n                                "}
<td>
{"障害発生からサービス再開までの許容時間"}
</td>
{"\n                                "}
<td>
{"\n                                    停止時間が減る。復元手順の自動化やパイロットライトでも短縮できる。常時稼働の待機環境(ウォームスタンバイ/ホットスタンバイ)まで求めると高コスト\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-c-dr-4戦略最重要"} tabIndex={-1}>
{"Step 2-C: DR 4戦略(最重要)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-C: DR 4戦略(最重要)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"戦略"}
</th>
{"\n                                "}
<th scope="col">
{"仕組み"}
</th>
{"\n                                "}
<th scope="col">
{"RTO / RPO の目安"}
</th>
{"\n                                "}
<th scope="col">
{"コスト"}
</th>
{"\n                                "}
<th scope="col">
{"向いている場面"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"バックアップとリストア"}
</td>
{"\n                                "}
<td>
{"バックアップを別リージョンへ保存し、災害時に復元"}
</td>
{"\n                                "}
<td>
{"時間単位(長い)"}
</td>
{"\n                                "}
<td>
{"最も低い"}
</td>
{"\n                                "}
<td>
{"停止を数時間〜1日許容できる"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"パイロットライト"}
</td>
{"\n                                "}
<td>
{"\n                                    データだけ常時複製し、アプリ基盤は最小(停止状態)で用意。災害時に起動・拡張\n                                "}
</td>
{"\n                                "}
<td>
{"数十分程度"}
</td>
{"\n                                "}
<td>
{"低〜中"}
</td>
{"\n                                "}
<td>
{"中程度の RTO"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ウォームスタンバイ"}
</td>
{"\n                                "}
<td>
{"縮小版のフル環境を常時稼働。災害時にスケールアップ"}
</td>
{"\n                                "}
<td>
{"分単位"}
</td>
{"\n                                "}
<td>
{"中〜高"}
</td>
{"\n                                "}
<td>
{"短い RTO、常時テスト可能にしたい"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"マルチサイト Active/Active"}
</td>
{"\n                                "}
<td>
{"複数リージョンで同時に本番稼働"}
</td>
{"\n                                "}
<td>
{"ほぼゼロに近づけられる"}
</td>
{"\n                                "}
<td>
{"最も高い"}
</td>
{"\n                                "}
<td>
{"ほぼ無停止・データ損失ほぼゼロ"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    上表の時間は設計の目安です。実際の RTO/RPO\n                    は構成・データ量・運用手順で変わります。出典の AWS\n                    ホワイトペーパー(参考URL一覧)で最新の整理を確認してください。\n                "}
</p>
{"\n                "}
<Diagram id="diag-6" label={"Step 2-C: DR 4戦略(最重要)"}/>
{"\n                "}
<h3 id={"step-2-d-データとデータベースのレプリケーション"} tabIndex={-1}>
{"\n                    Step 2-D: データとデータベースのレプリケーション\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-D: データとデータベースのレプリケーション"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"サービス"}
</th>
{"\n                                "}
<th scope="col">
{"機能"}
</th>
{"\n                                "}
<th scope="col">
{"特徴・注意点"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon S3"}
</td>
{"\n                                "}
<td>
{"\n                                    クロスリージョンレプリケーション(CRR)、同一リージョンレプリケーション(SRR)\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"バージョニングが必須"}
</strong>
{"。S3 Replication Time\n                                    Control で複製時間の目標を設定可能。S3 Multi-Region Access\n                                    Points で複数リージョンへ単一エンドポイント提供\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon RDS"}
</td>
{"\n                                "}
<td>
{"\n                                    Multi-AZ DB\n                                    インスタンス(同期レプリケーション、自動フェイルオーバー)、Multi-AZ\n                                    DB\n                                    クラスター(準同期レプリケーション、読み取り可能なスタンバイ2台)、クロスリージョンリードレプリカ\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"Multi-AZ は可用性(同一リージョン)"}
</strong>
{"、"}
<strong>
{"リードレプリカは読み取り拡張とDR(昇格が必要)"}
</strong>
{"\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon Aurora"}
</td>
{"\n                                "}
<td>
{"\n                                    Aurora レプリカ(最大15)、Aurora Global\n                                    Database(リージョン間を専用インフラで低遅延複製)\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    グローバルデータベースは通常1秒未満の遅延が目標。災害時はセカンダリリージョンを昇格\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Amazon DynamoDB"}
</td>
{"\n                                "}
<td>
{"\n                                    PITR(ポイントインタイムリカバリ)、グローバルテーブル(マルチリージョン・マルチアクティブ)\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    グローバルテーブルは各リージョンで書き込み可能。MREC(マルチリージョン結果整合性)では競合は最後の書き込み優先、MRSC(マルチリージョン強整合性)では同一項目への同時書き込みが\n                                    ReplicatedWriteConflictException で失敗し得る\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon EBS"}
</td>
{"\n                                "}
<td>
{"\n                                    スナップショットのリージョン間コピー、Data Lifecycle Manager\n                                    による自動化\n                                "}
</td>
{"\n                                "}
<td>
{"増分バックアップ"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Elastic Disaster Recovery (DRS)"}
</td>
{"\n                                "}
<td>
{"\n                                    サーバーのブロックレベル継続レプリケーションで、低コストなステージング領域から復旧\n                                "}
</td>
{"\n                                "}
<td>
{"\n                                    オンプレミス/他クラウド/AWS から AWS への DR に利用。秒単位の\n                                    RPO、分単位の RTO を目指せる\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Amazon ElastiCache"}
</td>
{"\n                                "}
<td>
{"Global Datastore などクロスリージョン複製"}
</td>
{"\n                                "}
<td>
{"対応エンジンと機能を確認"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"重要な落とし穴"}
</strong>
{":\n                    継続的レプリケーションは、"}
<strong>
{"データ破損や誤削除も複製してしまいます"}
</strong>
{"。そのため、バージョニングやポイントインタイムリカバリ、バックアップを併用します。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-e-route-53-とフェイルオーバー"} tabIndex={-1}>
{"\n                    Step 2-E: Route 53 とフェイルオーバー\n                "}
</h3>
{"\n                "}
<Diagram id="diag-7" label={"Step 2-E: Route 53 とフェイルオーバー"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：flowchart TB\n    U[\"ユーザー\"] --> R53[\"Route 53<br/>フェイルオーバーポリシー\"]\n    HC[\"ヘルスチェック\"] --> R53\n    R53 -->|\"正常時\"| P[\"プライマリ環境<br/>東京リージョン\"]\n    R53 -->|\"異常検知時\"| S[\"セカンダリ環境<br/>大阪リージョン\"]\n    P --> HC\n\n    classDef successFill fill:#d7f1e2,stroke:#1d7f4e,color:#0f3d26;\n    classDef warnFill fill:#ffe8c7,stroke:#a85f0a,color:#4a2a00;\n    class P successFill\n    class S warnFill"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"機能"}
</th>
{"\n                                "}
<th scope="col">
{"内容"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"ヘルスチェック"}
</td>
{"\n                                "}
<td>
{"\n                                    エンドポイント監視、他のヘルスチェックの組み合わせ(計算ヘルスチェック)、CloudWatch\n                                    アラーム連動\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"フェイルオーバールーティング"}
</td>
{"\n                                "}
<td>
{"プライマリが異常ならセカンダリへ応答を切替(Active-Passive)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"Route 53 Application Recovery Controller (ARC)"}
</td>
{"\n                                "}
<td>
{"\n                                    ルーティングコントロール(安全にトラフィックを切替)、準備状況チェック、ゾーンシフト(AZ\n                                    単位でトラフィックを退避)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
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
<p>
{"\n                            フェイルオーバー時は"}
<strong>
{"データプレーン(稼働中の仕組み)に依存する設計"}
</strong>
{"にします。災害時にコントロールプレーン(リソース作成・変更の\n                            API)が使えない場合を想定し、切替操作は事前に用意した仕組み(ARC\n                            のルーティングコントロールなど)に任せる方が確実です。\n                        "}
</p>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-2-f-バックアップの自動化aws-backup"} tabIndex={-1}>
{"\n                    Step 2-F: バックアップの自動化(AWS Backup)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-F: バックアップの自動化(AWS Backup)"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"機能"}
</th>
{"\n                                "}
<th scope="col">
{"内容"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"バックアッププラン"}
</td>
{"\n                                "}
<td>
{"スケジュール、保持期間、コピー先を一元定義"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"対応サービス"}
</td>
{"\n                                "}
<td>
{"EC2/EBS、RDS、Aurora、DynamoDB、EFS、FSx、S3 など多数"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"クロスリージョン/クロスアカウントコピー"}
</td>
{"\n                                "}
<td>
{"\n                                    遠隔地・別アカウントへ自動コピー(ランサムウェア対策にも有効)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Backup Vault Lock"}
</td>
{"\n                                "}
<td>
{"\n                                    WORM\n                                    で改ざん・削除から保護。ガバナンスモードは十分な権限を持つユーザーが解除可能、コンプライアンスモードは猶予期間終了後、保持期間中の削除・変更を防止\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"リストアテスト"}
</td>
{"\n                                "}
<td>
{"バックアップから復元できるか自動検証"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"Organizations 連携"}
</td>
{"\n                                "}
<td>
{"組織全体のバックアップポリシーを一括適用"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"コスト効率の工夫"}
</strong>
{":\n                    コールドストレージへの移行に対応したリソースタイプでは、ライフサイクルで古いバックアップを低コストのコールドストレージへ移行、タグベースで対象リソースを自動選択、不要になった保持期間を見直す。\n                "}
</p>
{"\n                "}
<h3 id={"step-2-g-dr-テストと集中監視"} tabIndex={-1}>
{"Step 2-G: DR テストと集中監視"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 2-G: DR テストと集中監視"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"取り組み"}
</th>
{"\n                                "}
<th scope="col">
{"内容"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"DR テスト"}
</td>
{"\n                                "}
<td>
{"\n                                    "}
<strong>
{"テストされていない DR は DR ではない"}
</strong>
{"。定期的にフェイルオーバー演習(ゲームデイ)を実施\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"AWS Fault Injection Service (FIS)"}
</td>
{"\n                                "}
<td>
{"意図的に障害を起こして耐障害性を検証"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"集中監視"}
</td>
{"\n                                "}
<td>
{"\n                                    CloudWatch、EventBridge、Systems Manager OpsCenter、Health\n                                    Dashboard で検知し、自動復旧(Auto Scaling、Systems Manager\n                                    Automation、Lambda)につなげる\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"IaC による復旧"}
</td>
{"\n                                "}
<td>
{"\n                                    DR リージョンの環境を CloudFormation/CDK で再現可能にしておく\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"クォータの事前確認"}
</td>
{"\n                                "}
<td>
{"\n                                    DR リージョンでも Service Quotas\n                                    を十分に確保(災害時に上限不足にならないように)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"step-3-task-22-試験のコツ"} tabIndex={-1}>
{"Step 3: Task 2.2 試験のコツ"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表：Step 3: Task 2.2 試験のコツ"}>
{"\n                    "}
<table>
{"\n                        "}
<thead>
{"\n                            "}
<tr className={"header"}>
{"\n                                "}
<th scope="col">
{"問題文のキーワード"}
</th>
{"\n                                "}
<th scope="col">
{"選ぶべき方向性"}
</th>
{"\n                            "}
</tr>
{"\n                        "}
</thead>
{"\n                        "}
<tbody>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「RTO 数時間、最小コスト」"}
</td>
{"\n                                "}
<td>
{"バックアップとリストア(AWS Backup のクロスリージョンコピー)"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「データは常時複製、基盤は最小限」"}
</td>
{"\n                                "}
<td>
{"パイロットライト"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「分単位で復旧、縮小版を常時稼働」"}
</td>
{"\n                                "}
<td>
{"\n                                    ウォームスタンバイ(Aurora Global Database\n                                    のセカンダリリージョンを昇格する Active/Passive 構成など)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「ほぼ無停止、リージョン障害でも継続」"}
</td>
{"\n                                "}
<td>
{"\n                                    マルチサイト Active/Active(DynamoDB グローバルテーブル、Aurora\n                                    DSQL\n                                    のマルチリージョンクラスターなど複数リージョンで書き込めるデータストア、Route\n                                    53)\n                                "}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「オンプレミスサーバーを AWS へ DR」"}
</td>
{"\n                                "}
<td>
{"AWS Elastic Disaster Recovery"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「リージョン間 DB の低遅延複製」"}
</td>
{"\n                                "}
<td>
{"Aurora Global Database"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"odd"}>
{"\n                                "}
<td>
{"「どのリージョンからも書き込み」"}
</td>
{"\n                                "}
<td>
{"DynamoDB グローバルテーブル"}
</td>
{"\n                            "}
</tr>
{"\n                            "}
<tr className={"even"}>
{"\n                                "}
<td>
{"「バックアップの削除・改ざんを防ぐ」"}
</td>
{"\n                                "}
<td>
{"AWS Backup Vault Lock、クロスアカウントコピー"}
</td>
{"\n                            "}
</tr>
{"\n                        "}
</tbody>
{"\n                    "}
</table>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
</>; }
