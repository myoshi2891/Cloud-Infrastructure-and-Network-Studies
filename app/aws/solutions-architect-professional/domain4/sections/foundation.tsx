import { Diagram } from '../Diagram';
/** 原本のfoundation本文。 */
export default function Content() { return <>
{"\n                "}
<div className={"hero"}>
{"\n                    "}
<div className={"kicker"}>
{"Solutions Architect Professional · Domain 4"}
</div>
{"\n                    "}
<h1>
{"\n                        AWS Certified Solutions Architect - Professional (SAP-C02) Content Domain 4:\n                        Accelerate Workload Migration and Modernization 完全ガイド(初学者向け)\n                    "}
</h1>
{"\n                    "}
<div className={"meta-row"}>
{"\n                        "}
<span className={"pill"}>
{"配点 "}
<strong>
{"約20%"}
</strong>
</span>
{"\n                        "}
<span className={"pill"}>
{"対象 "}
<strong>
{"初学者"}
</strong>
</span>
{"\n                        "}
<span className={"pill"}>
{"図解 "}
<strong>
{"Mermaid 16点"}
</strong>
</span>
{"\n                        "}
<span className={"pill"}>
{"参考文献 "}
<strong>
{"50件"}
</strong>
</span>
{"\n                    "}
</div>
{"\n                "}
</div>
{"\n\n                "}
<p>
{"\n                    対象試験: AWS Certified Solutions Architect - Professional (SAP-C02)"}
<br />
{"出題比率:\n                    Domain 4 は全体の "}
<strong>
{"20%"}
</strong>
{" (スコア対象の約 65 問のうち、おおよそ 13\n                    問前後の目安)"}
<br />
{"根拠資料: 公式 Exam Guide (Version 1.2) の Task 4.1 〜 4.4\n                    と、各サービスの AWS 公式ドキュメント"}
<br />
{"表記ルール: 図解は Mermaid と\n                    Markdown のみを使用 (ASCII アートは使いません)\n                "}
</p>
{"\n                "}
<hr />
{"\n                "}
<h2 id={"0-このガイドの使い方"} tabIndex={-1}>
{"0. このガイドの使い方"}
</h2>
{"\n                "}
<h3 id={"01-domain-4-は何を問う分野か"} tabIndex={-1}>
{"0.1 Domain 4 は何を問う分野か"}
</h3>
{"\n                "}
<p>
{"\n                    一言でいうと\n                    "}
<strong>
{"「今あるシステム (オンプレミスや他クラウド)\n                        を、どう選び、どう運び、どう作り変えるか」"}
</strong>
{"\n                    を問う分野です。\n                "}
</p>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 1：0.1 Domain 4 は何を問う分野か"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"Task"}
</th>
<th scope="col">
{"テーマ"}
</th>
<th scope="col">
{"一言でいうと"}
</th>
<th scope="col">
{"中心となるサービス"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"4.1"}
</td>
<td>
{"移行対象の選定"}
</td>
<td>
{"何を、どの順番で、どの方針で移すか決める"}
</td>
<td>
{"Migration Hub, Application Discovery Service, 7Rs, TCO"}
</td>
</tr>
<tr className={"even"}>
<td>
{"4.2"}
</td>
<td>
{"最適な移行方法の決定"}
</td>
<td>
{"どのツールで、どの回線で、安全に運ぶか決める"}
</td>
<td>
{"\n                                    DataSync, Transfer Family, Snow Family, MGN, DMS, SCT, Direct\n                                    Connect, VPN\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"4.3"}
</td>
<td>
{"移行後の新アーキテクチャ決定"}
</td>
<td>
{"移した先で何の部品 (計算・保存・DB) を使うか決める"}
</td>
<td>
{"\n                                    EC2, Beanstalk, ECS, EKS, Fargate, EBS, EFS, FSx, S3, RDS,\n                                    Aurora, DynamoDB\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"4.4"}
</td>
<td>
{"モダナイゼーションの機会発見"}
</td>
<td>
{"疎結合・サーバーレス・専用 DB に作り変える"}
</td>
<td>
{"\n                                    Lambda, SQS, SNS, EventBridge, Step Functions, Aurora\n                                    Serverless, ElastiCache\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"02-全体像"} tabIndex={-1}>
{"0.2 全体像"}
</h3>
{"\n                "}
<Diagram id="diag-0" label={"0.2 全体像"}/>
{"\n                "}
<h3 id={"03-学習の進め方-おすすめステップ"} tabIndex={-1}>
{"0.3 学習の進め方 (おすすめステップ)"}
</h3>
{"\n                "}
<ol>
{"\n                    "}
<li>
{"\n                        まず "}
<strong>
{"7Rs"}
</strong>
{" (4.1) を暗記する。ここが Domain 4 の背骨です。\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        次に "}
<strong>
{"「データ量 × 回線 × 期間」で転送手段を選ぶ思考"}
</strong>
{" (4.2)\n                        を身につける。\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        4.3 は「"}
<strong>
{"どの要件のときにどのサービスか"}
</strong>
{"」の対応表を覚える。\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        4.4 は「"}
<strong>
{"同期か非同期か、1 対 1 か 1 対多か"}
</strong>
{"」で統合サービスを切り分ける。\n                    "}
</li>
{"\n                    "}
<li>
{"最後に第 6 章の早見表で、キーワードから答えを引く練習をする。"}
</li>
{"\n                "}
</ol>
{"\n                "}
<p>
{"\n                    初学者向けの注意: SAP-C02 は長い文章の中から\n                    "}
<strong>
{"「制約条件」(ダウンタイム、予算、期間、運用負荷、既存ライセンス)\n                        を拾う力"}
</strong>
{"\n                    を試します。サービス名の暗記より「なぜそれを選ぶか」を言えることが重要です。\n                "}
</p>
{"\n                "}
<h3 id={"04-サービス提供状況に関する重要な注意-2026-年-10-月時点"} tabIndex={-1}>
{"\n                    0.4 サービス提供状況に関する重要な注意 (2026 年 10 月時点)\n                "}
</h3>
{"\n                "}
<ul>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"AWS Migration Hub は 2025 年 11 月 7\n                            日以降、新規顧客の受付を停止"}
</strong>
{"しています。既存顧客は継続利用でき、AWS が推奨する後継は\n                        "}
<strong>
{"AWS Transform"}
</strong>
{" です (出典は第 7 章)。\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        ただし公式 Exam Guide (Version 1.2) には Migration Hub\n                        が引き続き記載されています。"}
<strong>
{"試験対策としては Migration Hub の役割 (発見・評価・追跡の一元管理)\n                            を理解しつつ、実務では AWS Transform も確認する"}
</strong>
{"という姿勢が安全です。\n                    "}
</li>
{"\n                    "}
<li>
{"\n                        "}
<strong>
{"AWS Snow Family (Snowball Edge を含む)\n                            は新規顧客に提供されていません"}
</strong>
{"。既存顧客は継続利用できます。本ガイドの Snow Family\n                        に関する推奨は、試験対策と利用資格のある既存顧客向けの文脈として扱ってください。新規顧客は、オンライン転送なら\n                        "}
<strong>
{"AWS DataSync"}
</strong>
{"、物理的な搬入なら\n                        "}
<strong>
{"AWS Data Transfer Terminal"}
</strong>
{"\n                        などの現行の代替手段を検討します。最新状況は必ず公式ドキュメントで確認してください。\n                    "}
</li>
{"\n                "}
</ul>
{"\n                "}
<hr />
{"\n                "}
<h2 id={"1-基礎用語-まずここから"} tabIndex={-1}>
{"1. 基礎用語 (まずここから)"}
</h2>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 2：1. 基礎用語 (まずここから)"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"用語"}
</th>
<th scope="col">
{"やさしい説明"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"オンプレミス"}
</td>
<td>
{"自社のデータセンターや社内サーバー室にあるシステム"}
</td>
</tr>
<tr className={"even"}>
<td>
{"移行 (Migration)"}
</td>
<td>
{"システムを AWS に移すこと"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"モダナイゼーション"}
</td>
<td>
{"移すついでに、クラウドの強みを活かすよう作り変えること"}
</td>
</tr>
<tr className={"even"}>
<td>
{"Lift and Shift"}
</td>
<td>
{"構成をほぼそのままクラウドに持ち上げて移すこと (Rehost)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"カットオーバー"}
</td>
<td>
{"本番の利用先を旧環境から新環境に切り替える瞬間"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ウェーブ (Wave)"}
</td>
<td>
{"\n                                    一度に移すアプリケーションのまとまり。段階的に複数回に分けて移す\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"RTO / RPO"}
</td>
<td>
{"\n                                    復旧までの許容時間 / 失ってよいデータの時間幅。切替計画でも使う\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"ダウンタイム"}
</td>
<td>
{"サービスが止まる時間。小さいほど複雑・高コストになりやすい"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"CDC"}
</td>
<td>
{"\n                                    Change Data Capture。DB の変更分だけを継続的にコピーする仕組み\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"同種 / 異種移行"}
</td>
<td>
{"\n                                    DB エンジンが同じ (例 MySQL から MySQL) か、違う (例 Oracle から\n                                    PostgreSQL) か\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"TCO"}
</td>
<td>
{"\n                                    Total Cost of\n                                    Ownership。購入・運用・人件費・電力まで含めた総保有コスト\n                                "}
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
