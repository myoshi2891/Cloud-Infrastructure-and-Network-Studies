/** 原本のSection1。本文・装飾・SVGをそのままサーバー描画する。 */
export default function Section1() { return <>
<h2 id={"0-このガイドの読み方と注意点"} tabIndex={-1}>{"0. このガイドの読み方と注意点"}</h2>
{"\n                "}
<h3 id={"01-情報の確度について"} tabIndex={-1}>{"0.1 情報の確度について"}</h3>
{"\n                "}
<div className={"table-scroll"}>{"\n                    "}<table aria-label={"用語・比較表 1"}><thead><tr className={"header"}><th scope="col">{"区分"}{" "}</th><th scope="col">{"内容"}{" "}</th><th scope="col">{"根拠の強さ"}{" "}</th></tr></thead><tbody><tr className={"odd"}><td>{"確認済み（本文プレビュー）"}{" "}</td><td>{"目次全体、Foreword、Clause 1〜5.4.5（NaaSの途中）まで"}{" "}</td><td>{"公開サンプルPDFで本文を直接確認"}{" "}</td></tr><tr className={"even"}><td>{"目次＋公的機関の解説で確認"}{" "}</td><td>{"5.5（デプロイメントモデル）、Clause 6〜11 の項目構成"}{" "}</td><td>{"目次、JTC 1・ドイツBSI・Part 3 本文の引用"}{" "}</td></tr><tr className={"odd"}><td>{"一般的な技術解説"}{" "}</td><td>{"各項目の初学者向けの補足・具体例"}{" "}</td><td>{"\n                                    本ガイド作成者による一般的な説明（AWS・Google\n                                    Cloud等の公開資料で裏付け）\n                                "}{" "}</td></tr></tbody></table>{"\n                "}</div>
{"\n                "}
<blockquote className={"callout callout-warn"}>{"\n                    "}<p>{"\n                        注意：公開サンプルで確認できた本文は Clause 5.4.5 付近までです。Clause 5.4.6\n                        以降の細部は、"}<strong>{"項目名と公的機関の要約に基づく説明"}</strong>{"です。試験・監査・契約など正確さが必要な場面では、原典を購入して確認してください。\n                    "}</p>{"\n                "}</blockquote>
{"\n                "}
<h3 id={"02-表記ルール"} tabIndex={-1}>{"0.2 表記ルール"}</h3>
{"\n                "}
<ul>{"\n                    "}<li>{"略語は規格の定義に従います（CSC、CSP、CSN、CSU など。後述）"}</li>{"\n                    "}<li>{"図解は Mermaid（フローチャート）と Markdown の表で表現します"}</li>{"\n                    "}<li>{"\n                        「規格がそう書いている」部分と「具体例（本ガイドの補足）」部分は区別して書きます\n                    "}</li>{"\n                "}</ul>
{"\n\n                "}
</>; }
