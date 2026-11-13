/** 原本のSection8。本文・装飾・SVGをそのままサーバー描画する。 */
export default function Section8() { return <>
<h2 id={"7-ステップ7横断的側面clause-7"} tabIndex={-1}>{"7. ステップ7：横断的側面（Clause 7）"}</h2>
{"\n                "}
<h3 id={"71-横断的側面とは"} tabIndex={-1}>{"7.1 横断的側面とは"}</h3>
{"\n                "}
<p>{"\n                    特定の役割・活動・サービスにとどまらず、"}<strong>{"複数の役割や活動に共通して影響するテーマ"}</strong>{"です。Part\n                    3（リファレンスアーキテクチャ）でも、Part 2 の Clause 7\n                    の横断的側面を参照しています。\n                "}</p>
{"\n                "}
<h3 id={"72-13の横断的側面72714と総論71"} tabIndex={-1}>{"\n                    7.2 13の横断的側面（7.2〜7.14）と総論（7.1）\n                "}</h3>
{"\n                "}
<blockquote className={"callout"}>{"\n                    "}<p>{"\n                        Clause 7 は、7.1 General（総論）と、7.2〜7.14\n                        の13の個別の横断的側面から構成されます。以下の表は13の個別項目です。\n                    "}</p>{"\n                    "}<p>{"\n                        以下の説明は、目次の項目名に基づく初学者向けの一般的な補足です。各項目の規格上の正確な記述は原典で確認してください。\n                    "}</p>{"\n                "}</blockquote>
{"\n                "}
<div className={"table-scroll"}>{"\n                    "}<table aria-label={"用語・比較表 20"}><thead><tr className={"header"}><th scope="col">{"Clause"}{" "}</th><th scope="col">{"横断的側面"}{" "}</th><th scope="col">{"初学者向けの意味"}{" "}</th></tr></thead><tbody><tr className={"odd"}><td>{"7.2"}{" "}</td><td>{"Auditability（監査可能性）"}{" "}</td><td>{"提供・利用の状況を後から検証できること"}{" "}</td></tr><tr className={"even"}><td>{"7.3"}{" "}</td><td>{"Availability（可用性）"}{" "}</td><td>{"必要な時に使えること"}{" "}</td></tr><tr className={"odd"}><td>{"7.4"}{" "}</td><td>{"Governance（ガバナンス）"}{" "}</td><td>{"方針・責任・統制の枠組み"}{" "}</td></tr><tr className={"even"}><td>{"7.5"}{" "}</td><td>{"Interoperability（相互運用性）"}{" "}</td><td>{"異なるシステム間で連携できること"}{" "}</td></tr><tr className={"odd"}><td>{"7.6"}{" "}</td><td>{"Maintenance and versioning（保守とバージョン管理）"}{" "}</td><td>{"更新・変更を管理すること"}{" "}</td></tr><tr className={"even"}><td>{"7.7"}{" "}</td><td>{"Performance（性能）"}{" "}</td><td>{"処理能力・応答の良さ"}{" "}</td></tr><tr className={"odd"}><td>{"7.8"}{" "}</td><td>{"Portability（移植性）"}{" "}</td><td>{"データやアプリを別環境へ移せること"}{" "}</td></tr><tr className={"even"}><td>{"7.9"}{" "}</td><td>{"Protection of PII（個人情報の保護）"}{" "}</td><td>{"個人を識別できる情報の扱い（Clause 3 の用語が前提）"}{" "}</td></tr><tr className={"odd"}><td>{"7.10"}{" "}</td><td>{"Regulatory（規制）"}{" "}</td><td>{"法令・規制への対応"}{" "}</td></tr><tr className={"even"}><td>{"7.11"}{" "}</td><td>{"Resiliency（回復力）"}{" "}</td><td>{"障害から立ち直る力"}{" "}</td></tr><tr className={"odd"}><td>{"7.12"}{" "}</td><td>{"Reversibility（可逆性）"}{" "}</td><td>{"利用をやめた時にデータ等を取り戻せること"}{" "}</td></tr><tr className={"even"}><td>{"7.13"}{" "}</td><td>{"Security（セキュリティ）"}{" "}</td><td>{"機密性・完全性・可用性の確保"}{" "}</td></tr><tr className={"odd"}><td>{"7.14"}{" "}</td><td>{"\n                                    Service levels and service level\n                                    agreement（サービスレベルとSLA）\n                                "}{" "}</td><td>{"品質目標と合意"}{" "}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<h3 id={"73-関連する規格資料"} tabIndex={-1}>{"7.3 関連する規格・資料"}</h3>
{"\n                "}
<div className={"table-scroll"}>{"\n                    "}<table aria-label={"用語・比較表 21"}><thead><tr className={"header"}><th scope="col">{"側面"}{" "}</th><th scope="col">{"関連しやすい規格（例）"}{" "}</th></tr></thead><tbody><tr className={"odd"}><td>{"SLA"}{" "}</td><td>{"ISO/IEC 19086-1（SLAフレームワーク）"}{" "}</td></tr><tr className={"even"}><td>{"相互運用性・移植性"}{" "}</td><td>{"ISO/IEC 19941"}{" "}</td></tr><tr className={"odd"}><td>{"データの流れ・分類"}{" "}</td><td>{"ISO/IEC 19944-1"}{" "}</td></tr><tr className={"even"}><td>{"データ共有契約"}{" "}</td><td>{"ISO/IEC 23751"}{" "}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<blockquote className={"callout"}>{"\n                    "}<p>{"\n                        これらは JTC 1\n                        の「クラウドコンピューティング」の主要規格リストに挙がっています。\n                    "}</p>{"\n                "}</blockquote>
{"\n                "}
<h3 id={"74-可用性回復力の考え方google-cloud-の公開資料より"} tabIndex={-1}>{"\n                    7.4 可用性・回復力の考え方（Google Cloud の公開資料より）\n                "}</h3>
{"\n                "}
<p>{"\n                    Google Cloud の信頼性ガイドは、"}<strong>{"障害ドメイン"}</strong>{"（failure\n                    domain）を、他と独立して故障し得る資源（またはその集まり）と説明し、ゾーン・リージョンはその例としています。複数の障害ドメインに冗長配置すると、単一のドメインより高い可用性を得られるとされます。\n                "}</p>
{"\n                "}
<div className={"table-scroll"}>{"\n                    "}<table aria-label={"用語・比較表 22"}><thead><tr className={"header"}><th scope="col">{"配置"}{" "}</th><th scope="col">{"目安の可用性"}{" "}</th><th scope="col">{"30日の許容停止時間の目安"}{" "}</th></tr></thead><tbody><tr className={"odd"}><td>{"単一ゾーン"}{" "}</td><td>{"99.9%"}{" "}</td><td>{"約43.2分"}{" "}</td></tr><tr className={"even"}><td>{"1リージョン内の複数ゾーン"}{" "}</td><td>{"99.99%"}{" "}</td><td>{"約4.3分"}{" "}</td></tr><tr className={"odd"}><td>{"複数リージョン"}{" "}</td><td>{"99.999%"}{" "}</td><td>{"約26秒"}{" "}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<blockquote className={"callout"}>{"\n                    "}<p>{"\n                        これは Google Cloud\n                        のガイドが多くのワークロードに対して示す"}<strong>{"目標値の目安"}</strong>{"であり、配置構成だけで達成が保証される値ではありません。実際の可用性はアプリケーション設計や運用にも左右され、各サービスの\n                        SLA（サービスごとに定められた契約上の値）とも別物です。また、ISO規格の数値ではありません。可用性や回復力という横断的側面を、実際の設計に落とす例として参考にしてください。\n                    "}</p>{"\n                "}</blockquote>
{"\n                "}
<h3 id={"75-セキュリティと責任共有aws-の公開資料より"} tabIndex={-1}>{"\n                    7.5 セキュリティと責任共有（AWS の公開資料より）\n                "}</h3>
{"\n                "}
<p>{"\n                    AWS の「責任共有モデル」は、"}<strong>{"クラウド\"の\"セキュリティ"}</strong>{"（AWS\n                    が基盤を守る）と"}<strong>{"クラウド\"内\"のセキュリティ"}</strong>{"（顧客がデータ・アプリ・設定等を守る）に分けて説明しています。顧客の責任範囲は、選んだサービスによって変わります。\n                "}</p>
{"\n                "}
<p>{"\n                    これは、本ガイド 4.6 節の「IaaS・PaaS・SaaS で CSC\n                    の管理範囲が違う」という整理と、考え方が同じです。\n                "}</p>
{"\n\n                "}
</>; }
