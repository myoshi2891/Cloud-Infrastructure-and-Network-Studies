import { Diagram } from '../Diagram';
/** 原本のtask41本文。 */
export default function Content() { return <>
<h2 id={"2-task-41-移行対象となる既存ワークロードとプロセスの選定"} tabIndex={-1}>
{"\n                    2. Task 4.1 移行対象となる既存ワークロードとプロセスの選定\n                "}
</h2>
{"\n                "}
<h3 id={"21-ステップ全体像-移行の-3-フェーズ"} tabIndex={-1}>
{"\n                    2.1 ステップ全体像 (移行の 3 フェーズ)\n                "}
</h3>
{"\n                "}
<p>
{"AWS の大規模移行ガイダンスでは、移行を大きく 3 つのフェーズに分けて考えます。"}
</p>
{"\n                "}
<Diagram id="diag-1" label={"2.1 ステップ全体像 (移行の 3 フェーズ)"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 3：2.1 ステップ全体像 (移行の 3 フェーズ)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"フェーズ"}
</th>
<th scope="col">
{"やること"}
</th>
<th scope="col">
{"関連サービス・手法"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Assess"}
</td>
<td>
{"現状把握、移行準備度の評価、ビジネスケース作成"}
</td>
<td>
{"\n                                    Application Discovery Service, Migration Evaluator, Pricing\n                                    Calculator\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"Mobilize"}
</td>
<td>
{"\n                                    ランディングゾーン整備、移行計画、スキル習得、ポートフォリオ分析\n                                "}
</td>
<td>
{"Control Tower, Organizations, Migration Hub, 7Rs 判定"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Migrate and Modernize"}
</td>
<td>
{"ウェーブごとに実移行、移行後の最適化"}
</td>
<td>
{"MGN, DMS, DataSync, 各種モダナイゼーション"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"22-ステップ-1-現状の棚卸し-discovery"} tabIndex={-1}>
{"\n                    2.2 ステップ 1: 現状の棚卸し (Discovery)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"AWS Application Discovery Service"}
</strong>
{"\n                    は、オンプレミスのサーバーを自動的に発見し、構成・性能・依存関係のデータを集めるサービスです。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 4：2.2 ステップ 1: 現状の棚卸し (Discovery)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"収集方法"}
</th>
<th scope="col">
{"仕組み"}
</th>
<th scope="col">
{"向いているケース"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"Agentless Collector"}
</td>
<td>
{"\n                                    VMware\n                                    環境などに仮想アプライアンスを置き、エージェント導入なしで収集\n                                "}
</td>
<td>
{"多数の VM を素早く棚卸ししたい、ゲスト OS に触れたくない"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Discovery Agent"}
</td>
<td>
{"各サーバーにエージェントをインストールし、より詳細に収集"}
</td>
<td>
{"\n                                    "}
<strong>
{"プロセス単位の情報やネットワーク接続 (依存関係)"}
</strong>
{"\n                                    まで知りたい\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        収集データ: CPU・メモリ・ディスクの使用状況、実行中プロセス、サーバー間の\n                        TCP 接続など\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"依存関係の可視化が超重要"}
</strong>
{": 「A サーバーを先に移すと B\n                        と通信できなくなる」事故を防ぎ、ウェーブ分けの根拠になります\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        データは Migration Hub (または後継) に集約し、Amazon Athena\n                        で分析することもできます\n                    "}
</li>
{"\n                "}
</ul>
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
{"\n                                稼働の波 (月末処理、四半期バッチなど) を含められるよう、"}
<strong>
{"最低でも数週間から 1 か月程度のデータを集める"}
</strong>
{"\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                性能データは後の\n                                "}
<strong>
{"ライトサイジング (適正サイズ選定)"}
</strong>
{"\n                                の根拠になるので必ず取得する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                依存関係が不明なまま移行せず、通信先を洗い出してから移行単位を決める\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"23-ステップ-2-追跡の一元化-migration-hub"} tabIndex={-1}>
{"\n                    2.3 ステップ 2: 追跡の一元化 (Migration Hub)\n                "}
</h3>
{"\n                "}
<p>
{"\n                    "}
<strong>
{"AWS Migration Hub"}
</strong>
{"\n                    は、発見・計画・移行状況を一か所で確認する場所です。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 5：2.3 ステップ 2: 追跡の一元化 (Migration Hub)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"機能"}
</th>
<th scope="col">
{"内容"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ホームリージョン"}
</td>
<td>
{"移行の追跡データを保存するリージョン。最初に 1 つ選ぶ"}
</td>
</tr>
<tr className={"even"}>
<td>
{"進捗の集約"}
</td>
<td>
{"MGN や DMS などのツールの進捗状況を集約して表示"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"戦略レコメンデーション"}
</td>
<td>
{"アプリごとに 7Rs のどれが適するかの推奨を出す"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Orchestrator"}
</td>
<td>
{"\n                                    サーバーやエンタープライズアプリの移行を自動化・ワークフロー化\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Refactor Spaces"}
</td>
<td>
{"モノリスを段階的にマイクロサービスへ分解する基盤"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
{"\n                    注意: 第 0.4 節のとおり、新規利用は AWS Transform\n                    への移行が案内されています。試験では「"}
<strong>
{"複数ツールの移行状況を単一のダッシュボードで追跡する"}
</strong>
{"」という問いに\n                    Migration Hub が答えになる点を押さえましょう。\n                "}
</p>
{"\n                "}
<h3 id={"24-ステップ-3-7rs-で各アプリの方針を決める-最重要"} tabIndex={-1}>
{"\n                    2.4 ステップ 3: 7Rs で各アプリの方針を決める (最重要)\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 6：2.4 ステップ 3: 7Rs で各アプリの方針を決める (最重要)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"R"}
</th>
<th scope="col">
{"名前"}
</th>
<th scope="col">
{"意味"}
</th>
<th scope="col">
{"例"}
</th>
<th scope="col">
{"工数"}
</th>
<th scope="col">
{"クラウドの恩恵"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"1"}
</td>
<td>
{"Retire"}
</td>
<td>
{"使われていないので廃止"}
</td>
<td>
{"利用者のいない古い社内ツール"}
</td>
<td>
{"最小"}
</td>
<td>
{"コスト削減"}
</td>
</tr>
<tr className={"even"}>
<td>
{"2"}
</td>
<td>
{"Retain"}
</td>
<td>
{"今回は移さず残す"}
</td>
<td>
{"規制・遅延・最近導入済みで後回し"}
</td>
<td>
{"なし"}
</td>
<td>
{"なし"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"3"}
</td>
<td>
{"Rehost"}
</td>
<td>
{"そのまま EC2 に載せ替え (Lift and Shift)"}
</td>
<td>
{"MGN でサーバー丸ごと"}
</td>
<td>
{"小"}
</td>
<td>
{"小〜中"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4"}
</td>
<td>
{"Relocate"}
</td>
<td>
{"ハイパーバイザー層でまとめて移す"}
</td>
<td>
{"VMware 環境をそのままクラウドへ"}
</td>
<td>
{"小"}
</td>
<td>
{"小"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"5"}
</td>
<td>
{"Repurchase"}
</td>
<td>
{"製品を乗り換える (SaaS 化)"}
</td>
<td>
{"自社 CRM から SaaS の CRM へ"}
</td>
<td>
{"中"}
</td>
<td>
{"中"}
</td>
</tr>
<tr className={"even"}>
<td>
{"6"}
</td>
<td>
{"Replatform"}
</td>
<td>
{"少しだけ手を入れてマネージド化"}
</td>
<td>
{"自前 DB を RDS や Aurora へ"}
</td>
<td>
{"中"}
</td>
<td>
{"中〜大"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"7"}
</td>
<td>
{"Refactor / Re-architect"}
</td>
<td>
{"アーキテクチャを作り直す"}
</td>
<td>
{"モノリスをサーバーレスやマイクロサービスへ"}
</td>
<td>
{"大"}
</td>
<td>
{"最大"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<Diagram id="diag-2" label={"2.4 ステップ 3: 7Rs で各アプリの方針を決める (最重要)"}/>
{"\n                "}
<p>
<strong>
{"試験でよく出る判断の目安"}
</strong>
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 7：2.4 ステップ 3: 7Rs で各アプリの方針を決める (最重要)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"問題文のキーワード"}
</th>
<th scope="col">
{"選ぶ R"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"\n                                    「コード変更なし」「期限が非常に短い」「データセンター契約の期限が迫る」\n                                "}
</td>
<td>
{"Rehost (必要なら Relocate)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"\n                                    「運用負荷を減らしたい」「パッチ適用をなくしたい」「少しの変更で」\n                                "}
</td>
<td>
{"Replatform"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「スケーラビリティの限界」「俊敏性」「長期的に最大の価値」"}
</td>
<td>
{"Refactor"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「ライセンス費用が高い製品を SaaS に」"}
</td>
<td>
{"Repurchase"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「誰も使っていない」「重複している」"}
</td>
<td>
{"Retire"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「メインフレームなどで当面移せない」「データ主権・遅延」"}
</td>
<td>
{"Retain"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"25-ステップ-4-tco-を評価してビジネスケースを作る"} tabIndex={-1}>
{"\n                    2.5 ステップ 4: TCO を評価してビジネスケースを作る\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 8：2.5 ステップ 4: TCO を評価してビジネスケースを作る"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"ツール"}
</th>
<th scope="col">
{"用途"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"AWS Pricing Calculator"}
</td>
<td>
{"移行後の AWS 構成の見積もり"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Migration Evaluator"}
</td>
<td>
{"\n                                    現行環境の実使用量データから、移行後コストのビジネスケースを作る\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"Cost Explorer / Budgets"}
</td>
<td>
{"移行後のコスト可視化と予算管理"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<p>
<strong>
{"TCO に入れるべき項目 (オンプレ側の隠れコスト)"}
</strong>
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 9：2.5 ステップ 4: TCO を評価してビジネスケースを作る"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"カテゴリ"}
</th>
<th scope="col">
{"具体例"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"ハードウェア"}
</td>
<td>
{"サーバー、ストレージ、ネットワーク機器の購入・更改"}
</td>
</tr>
<tr className={"even"}>
<td>
{"施設"}
</td>
<td>
{"ラック、電力、冷却、床面積"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ソフトウェア"}
</td>
<td>
{"OS、DB、仮想化のライセンスとサポート"}
</td>
</tr>
<tr className={"even"}>
<td>
{"人件費"}
</td>
<td>
{"運用、保守、パッチ適用、障害対応"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"機会損失"}
</td>
<td>
{"調達リードタイム、スケールできない損失"}
</td>
</tr>
<tr className={"even"}>
<td>
{"移行コスト"}
</td>
<td>
{"並行稼働期間、学習コスト、移行ツール費用、データ転送費用"}
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
{"実測値でサイジング"}
</strong>
{"する。オンプレの過剰スペックをそのまま持ち込むと、クラウド側も過剰になる\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                安定稼働するものは\n                                "}
<strong>
{"Savings Plans / リザーブドインスタンス"}
</strong>
{"を前提にして比較する\n                            "}
</li>
{"\n                            "}
<li>
{"\n                                既存の "}
<strong>
{"ライセンス持ち込み (BYOL)"}
</strong>
{" やライセンス条件が\n                                TCO を大きく左右するので事前に確認する\n                            "}
</li>
{"\n                        "}
</ul>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n                "}
<h3 id={"26-ステップ-5-ウェーブ計画で優先順位をつける"} tabIndex={-1}>
{"\n                    2.6 ステップ 5: ウェーブ計画で優先順位をつける\n                "}
</h3>
{"\n                "}
<Diagram id="diag-3" label={"2.6 ステップ 5: ウェーブ計画で優先順位をつける"}/>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 10：2.6 ステップ 5: ウェーブ計画で優先順位をつける"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"方針"}
</th>
<th scope="col">
{"理由"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"最初は "}
<strong>
{"低リスク・依存関係が少ない"}
</strong>
{"アプリ"}
</td>
<td>
{"手順・体制・ガバナンスを小さく検証して学べる"}
</td>
</tr>
<tr className={"even"}>
<td>
{"\n                                    依存関係のあるアプリは "}
<strong>
{"同じウェーブでまとめる"}
</strong>
{"\n                                "}
</td>
<td>
{"通信遅延 (オンプレとクラウドをまたぐ) を避ける"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"最も複雑・重要なものは後半"}
</td>
<td>
{"経験値が貯まってから挑戦する"}
</td>
</tr>
<tr className={"even"}>
<td>
{"\n                                    各ウェーブに "}
<strong>
{"切り戻し (ロールバック) 計画"}
</strong>
{"を用意\n                                "}
</td>
<td>
{"失敗時に旧環境へ戻れるようにする"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"27-task-41-のまとめ-試験の着眼点"} tabIndex={-1}>
{"2.7 Task 4.1 のまとめ (試験の着眼点)"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 11：2.7 Task 4.1 のまとめ (試験の着眼点)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"問われ方"}
</th>
<th scope="col">
{"答えの方向性"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"オンプレのサーバー間の通信関係を把握したい"}
</td>
<td>
{"Application Discovery Service の Discovery Agent"}
</td>
</tr>
<tr className={"even"}>
<td>
{"エージェントを入れずに VM 一覧と性能を取りたい"}
</td>
<td>
{"Agentless Collector"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"複数の移行ツールの進捗を一元管理したい"}
</td>
<td>
{"Migration Hub (現在は AWS Transform が推奨)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"どの移行戦略が適切か自動推奨してほしい"}
</td>
<td>
{"Migration Hub 戦略レコメンデーション"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"現行コストとの比較でビジネスケースを作りたい"}
</td>
<td>
{"Migration Evaluator と Pricing Calculator"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<div className={"source-block"}>
{"\n                    "}
<div className={"source-head"}>
{"出典"}
</div>
{"\n                    "}
<ul className={"source-grid"}>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf"}>
<span className={"num"}>
{"1"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"公式 Exam Guide (Task 4.1)"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/welcome.html"}>
<span className={"num"}>
{"2"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"AWS Prescriptive Guidance 大規模移行ガイド"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/welcome.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html"}>
<span className={"num"}>
{"3"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"7Rs (移行戦略)"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/prescriptive-guidance/latest/large-migration-guide/migration-strategies.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html"}>
<span className={"num"}>
{"4"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Application Discovery Service"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html"}>
<span className={"num"}>
{"5"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Migration Hub"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/migrationhub/latest/ug/migrationhub-availability-change.html"}>
<span className={"num"}>
{"6"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Migration Hub の提供状況の変更"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/migrationhub/latest/ug/migrationhub-availability-change.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html"}>
<span className={"num"}>
{"7"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"AWS Pricing Calculator"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://docs.aws.amazon.com/pricing-calculator/latest/userguide/what-is-pricing-calculator.html"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<a className={"src-card"} href={"https://aws.amazon.com/migration-evaluator/"}>
<span className={"num"}>
{"8"}
</span>
<span className={"txt"}>
<span className={"name"}>
{"Migration Evaluator"}
<span className={"sep"}>
{":"}
</span>
</span>
<span className={"url"}>
{"https://aws.amazon.com/migration-evaluator/"}
</span>
</span>
</a>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</div>
{"\n                "}
<hr />
{"\n                "}
</>; }
