import { Diagram } from '../Diagram';
import { ChecklistCard, ChecklistCount } from '../ChecklistCard';
/** 原本のsummary本文。 */
export default function Content() { return <>
<h2 id={"6-試験直前の総まとめ"} tabIndex={-1}>
{"6. 試験直前の総まとめ"}
</h2>
{"\n                "}
<h3 id={"61-well-architected-の-6-つの柱で見る移行の判断軸"} tabIndex={-1}>
{"\n                    6.1 Well-Architected の 6 つの柱で見る移行の判断軸\n                "}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 36：6.1 Well-Architected の 6 つの柱で見る移行の判断軸"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"柱"}
</th>
<th scope="col">
{"移行・モダナイゼーションでの問い"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"運用上の優秀性"}
</td>
<td>
{"\n                                    移行手順を自動化・再現できるか (Orchestrator、MGN\n                                    のポストローンチ、IaC)\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"セキュリティ"}
</td>
<td>
{"移行中・移行後に最小権限と暗号化が守られているか"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"信頼性"}
</td>
<td>
{"カットオーバー失敗時に戻せるか、Multi-AZ か"}
</td>
</tr>
<tr className={"even"}>
<td>
{"パフォーマンス効率"}
</td>
<td>
{"実測値でライトサイジングし、専用サービスを選んだか"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"コスト最適化"}
</td>
<td>
{"\n                                    TCO を比較し、Savings Plans とマネージド化で運用費を下げたか\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"サステナビリティ"}
</td>
<td>
{"過剰リソースをなくし、効率の良い構成を選んだか"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"62-制約条件から答えを引く早見表"} tabIndex={-1}>
{"6.2 「制約条件」から答えを引く早見表"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 37：6.2 「制約条件」から答えを引く早見表"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"制約条件"}
</th>
<th scope="col">
{"優先して考える選択肢"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"変更を最小に、とにかく早く"}
</td>
<td>
{"Rehost (MGN)、Relocate"}
</td>
</tr>
<tr className={"even"}>
<td>
{"運用負荷を下げたい"}
</td>
<td>
{"Replatform (RDS、Aurora、Beanstalk、Fargate)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"長期的な俊敏性とスケール"}
</td>
<td>
{"Refactor (サーバーレス、マイクロサービス)"}
</td>
</tr>
<tr className={"even"}>
<td>
{"ダウンタイムを最小に"}
</td>
<td>
{"\n                                    MGN の継続レプリケーション、DMS の Full load + CDC、Route 53\n                                    の重み付け\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"回線が細い・量が膨大"}
</td>
<td>
{"Snow Family"}
</td>
</tr>
<tr className={"even"}>
<td>
{"継続的なファイル同期"}
</td>
<td>
{"DataSync"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"取引先が FTP/SFTP"}
</td>
<td>
{"Transfer Family"}
</td>
</tr>
<tr className={"even"}>
<td>
{"閉域で安全に転送"}
</td>
<td>
{"Direct Connect、VPN、VPC エンドポイント (PrivateLink)"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"ライセンス費用の削減"}
</td>
<td>
{"商用 DB から Aurora 等へ (SCT + DMS)、BYOL の検討"}
</td>
</tr>
<tr className={"even"}>
<td>
{"既存ブローカーをそのまま"}
</td>
<td>
{"Amazon MQ"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"移行前に統制を整える"}
</td>
<td>
{"Control Tower、Organizations、SCP"}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"63-よくある引っかけポイント"} tabIndex={-1}>
{"6.3 よくある引っかけポイント"}
</h3>
{"\n                "}
<div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 38：6.3 よくある引っかけポイント"}>
{"\n                    "}
<table>
<thead>
<tr className={"header"}>
<th scope="col">
{"引っかけ"}
</th>
<th scope="col">
{"正しい理解"}
</th>
</tr>
</thead>
<tbody>
<tr className={"odd"}>
<td>
{"「異種 DB 移行は DMS だけで完結」"}
</td>
<td>
{"\n                                    "}
<strong>
{"スキーマ変換 (SCT) が先に必要"}
</strong>
{"。DMS\n                                    はデータ移行が主\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"「Direct Connect は暗号化されている」"}
</td>
<td>
{"\n                                    "}
<strong>
{"既定では暗号化されない"}
</strong>
{"。MACsec や VPN\n                                    併用で暗号化\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「Snow Family は常に最速」"}
</td>
<td>
{"小〜中規模でネットワークが十分なら DataSync の方が早く簡単"}
</td>
</tr>
<tr className={"even"}>
<td>
{"「Fargate = ECS の別名」"}
</td>
<td>
{"\n                                    Fargate は "}
<strong>
{"実行基盤"}
</strong>
{"。ECS と EKS の両方で使える\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「SNS = キュー」"}
</td>
<td>
{"\n                                    SNS は "}
<strong>
{"プッシュ配信 (1 対多)"}
</strong>
{"。バッファは SQS\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"「Lambda は何でも向く」"}
</td>
<td>
<strong>
{"最大 15 分"}
</strong>
{"。長時間処理は Fargate や Batch"}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「Rehost では何も改善しない」"}
</td>
<td>
{"\n                                    まず移して、その後に Replatform や Refactor\n                                    へ進める戦略もよくある\n                                "}
</td>
</tr>
<tr className={"even"}>
<td>
{"「Migration Hub が移行を実行する」"}
</td>
<td>
{"\n                                    Migration Hub は "}
<strong>
{"追跡・計画の一元管理"}
</strong>
{"。実移行は\n                                    MGN や DMS が行う\n                                "}
</td>
</tr>
<tr className={"odd"}>
<td>
{"「レプリケーション完了 = 切替完了」"}
</td>
<td>
{"\n                                    最後に\n                                    "}
<strong>
{"テストとカットオーバーとファイナライズ"}
</strong>
{" が必要\n                                "}
</td>
</tr>
</tbody>
</table>
{"\n                "}
</div>
{"\n                "}
<h3 id={"64-最終チェックリスト"} tabIndex={-1}>
{"6.4 最終チェックリスト"}
</h3>
{"\n                "}
<ChecklistCard>
{"\n                    "}
<div className={"checklist-header"}>
{"\n                        "}
<span className={"title"}>
{"最終チェックリスト"}
</span>
<ChecklistCount total={10}/>
{"\n                    "}
</div>
{"\n                    "}
<ul>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk1"} type={"checkbox"}/>
<label htmlFor={"chk1"}>
{"7Rs を、それぞれ具体例つきで説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk2"} type={"checkbox"}/>
<label htmlFor={"chk2"}>
{"100 TB を 1 Gbps で送った場合のおおよその日数を計算できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk3"} type={"checkbox"}/>
<label htmlFor={"chk3"}>
{"MGN の 7 ステップ (エージェントからファイナライズ)\n                                を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk4"} type={"checkbox"}/>
<label htmlFor={"chk4"}>
{"同種・異種 DB 移行で使うツールと手順の違いを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk5"} type={"checkbox"}/>
<label htmlFor={"chk5"}>
{"Direct Connect と VPN\n                                を、期間・帯域・暗号化の観点で使い分けられる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk6"} type={"checkbox"}/>
<label htmlFor={"chk6"}>
{"ECS、EKS、Fargate、App Runner の違いを言える"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk7"} type={"checkbox"}/>
<label htmlFor={"chk7"}>
{"EBS、EFS、FSx、S3、Volume Gateway を要件から選べる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk8"} type={"checkbox"}/>
<label htmlFor={"chk8"}>
{"SQS、SNS、EventBridge、Step Functions、Amazon MQ\n                                を使い分けられる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk9"} type={"checkbox"}/>
<label htmlFor={"chk9"}>
{"ストラングラーフィグパターンを説明できる"}
</label>
{"\n                        "}
</li>
{"\n                        "}
<li>
{"\n                            "}
<input id={"chk10"} type={"checkbox"}/>
<label htmlFor={"chk10"}>
{"Migration Hub の提供状況の変更点を説明できる"}
</label>
{"\n                        "}
</li>
{"\n                    "}
</ul>
{"\n                "}
</ChecklistCard>
{"\n                "}
<hr />
{"\n                "}
</>; }
