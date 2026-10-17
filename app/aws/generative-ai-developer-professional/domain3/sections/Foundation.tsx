import { Diagram } from '../Diagram';
/** 原本のfoundation区分を全文・順序どおり保持する。 */
export default function Foundation() { return <div className="guide-part" data-part="foundation">{" "}
<div className="hero">{" "}<div className="kicker">{" AWS Certified Generative AI Developer - Professional · Domain 3 "}</div>{" "}<h1>{" AWS Certified Generative AI Developer - Professional (AIP-C01) Content Domain 3: AI Safety, Security, and Governance 完全ガイド（初学者向け・ステップバイステップ） "}</h1>{" "}<div className="meta-row">{" "}<span className="pill">{"配点 "}<strong>{"20%"}</strong></span>{" "}<span className="pill">{"対象 "}<strong>{"AIP-C01 受験者"}</strong></span>{" "}<span className="pill">{"図解 "}<strong>{"Mermaid 19点"}</strong></span>{" "}<span className="pill">{"参考 URL "}<strong>{"48件"}</strong></span>{" "}</div>{" "}</div>
{" "}
<p>{" "}<strong>{"対象"}</strong>{": AIP-C01 受験者（生成AIアプリを AWS で本番運用する開発者）"}<br  />{" "}<strong>{"配点"}</strong>{": Domain 3 は "}<strong>{"スコア対象問題の 20%"}</strong>{"（Domain 1: 31% / Domain 2: 26% / Domain 3: 20% / Domain 4: 12% / Domain 5: 11%）"}<br  />{" "}<strong>{"根拠となる公式ソース（アンカー）"}</strong>{": "}<a href="https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01.html">{"AIP-C01 Exam Guide"}</a>{" ／ "}<a href="https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain3.html">{"Domain 3 ページ"}</a><br  />{" "}<strong>{"図解ルール"}</strong>{": ASCII アートは使用せず、フローチャートは Mermaid、図解・表は Markdown で記述しています。 "}</p>
{" "}
<hr  />
{" "}
<h2 id="usage" tabIndex={-1}>{"0. このガイドの使い方"}</h2>
{" "}
<ol type="1">{" "}<li>{"先に "}<strong>{"Step 0〜1"}</strong>{" で全体像と脅威を掴む。"}</li>{" "}<li>{" "}<strong>{"Step 2"}</strong>{" は Guardrails の基礎、"}<strong>{"Step 3〜17"}</strong>{" は試験ガイドの 4 Task・15 Skill に 1 対 1 で対応、"}<strong>{"Step 18"}</strong>{" は Task 3.4 のまとめ。各 Step は「何を守るか → 使うサービス → 仕組み → ベストプラクティス → 試験の着眼点 → 参考 URL」の順。 "}</li>{" "}<li>{" 最後の "}<strong>{"Step 19〜22"}</strong>{" で統合アーキテクチャ・サービス選択表・引っ掛け表・練習問題・チートシートで仕上げる。 "}</li>{" "}</ol>
{" "}
<p>{" "}<strong>{"注意（URL について）"}</strong>{": 各 Step の参考 URL は AWS 公式ドキュメント中心です。執筆時に内容を直接確認できたものと、公式の既知パスを記載したものが混在します（末尾の「参考 URL 一覧」に区別を記載）。ページ構成は変更され得るため、404 の場合は公式ドキュメント内検索で該当ページ名を探してください。 "}</p>
{" "}
<hr  />
{" "}
<h2 id="toc" tabIndex={-1}>{"目次"}</h2>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"目次の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"Step"}</th><th scope="col">{"内容"}</th><th scope="col">{"対応 Skill"}</th></tr></thead><tbody><tr className="odd"><td>{"0"}</td><td>{"Domain 3 の全体像"}</td><td>{"全体"}</td></tr><tr className="even"><td>{"1"}</td><td>{"生成AI特有の脅威を理解する"}</td><td>{"全体"}</td></tr><tr className="odd"><td>{"2"}</td><td>{"Amazon Bedrock Guardrails の基礎"}</td><td>{"3.1 共通"}</td></tr><tr className="even"><td>{"3"}</td><td>{"入力の安全対策（有害入力の防御）"}</td><td>{"3.1.1"}</td></tr><tr className="odd"><td>{"4"}</td><td>{"出力の安全対策（有害出力の防止）"}</td><td>{"3.1.2"}</td></tr><tr className="even"><td>{"5"}</td><td>{"ハルシネーション対策（精度検証）"}</td><td>{"3.1.3"}</td></tr><tr className="odd"><td>{"6"}</td><td>{"多層防御（Defense in Depth）"}</td><td>{"3.1.4"}</td></tr><tr className="even"><td>{"7"}</td><td>{"高度な脅威検知（Prompt Injection / Jailbreak）"}</td><td>{"3.1.5"}</td></tr><tr className="odd"><td>{"8"}</td><td>{"保護された AI 環境（ネットワーク・IAM・データアクセス）"}</td><td>{"3.2.1"}</td></tr><tr className="even"><td>{"9"}</td><td>{"プライバシー保護システム（PII 検出・保持）"}</td><td>{"3.2.2"}</td></tr><tr className="odd"><td>{"10"}</td><td>{"プライバシー重視設計（マスキング・匿名化）"}</td><td>{"3.2.3"}</td></tr><tr className="even"><td>{"11"}</td><td>{"コンプライアンスフレームワーク"}</td><td>{"3.3.1"}</td></tr><tr className="odd"><td>{"12"}</td><td>{"データソース追跡（トレーサビリティ）"}</td><td>{"3.3.2"}</td></tr><tr className="even"><td>{"13"}</td><td>{"組織ガバナンス"}</td><td>{"3.3.3"}</td></tr><tr className="odd"><td>{"14"}</td><td>{"継続監視と高度なガバナンス統制"}</td><td>{"3.3.4"}</td></tr><tr className="even"><td>{"15"}</td><td>{"透明性（説明可能性）"}</td><td>{"3.4.1"}</td></tr><tr className="odd"><td>{"16"}</td><td>{"公平性評価"}</td><td>{"3.4.2"}</td></tr><tr className="even"><td>{"17"}</td><td>{"ポリシー準拠 AI"}</td><td>{"3.4.3"}</td></tr><tr className="odd"><td>{"18"}</td><td>{"Task 3.4 のまとめ"}</td><td>{"3.4"}</td></tr><tr className="even"><td>{"19"}</td><td>{"統合リファレンスアーキテクチャ"}</td><td>{"全体"}</td></tr><tr className="odd"><td>{"20"}</td><td>{"サービス選択早見表・引っ掛け表"}</td><td>{"全体"}</td></tr><tr className="even"><td>{"21"}</td><td>{"練習問題 10 問"}</td><td>{"全体"}</td></tr><tr className="odd"><td>{"22"}</td><td>{"直前チートシート"}</td><td>{"全体"}</td></tr><tr className="even"><td>{"-"}</td><td>{"参考 URL 一覧"}</td><td>{"-"}</td></tr></tbody></table>{" "}</div>
{" "}
<hr  />
{" "}
<h2 id="step-0" tabIndex={-1}>{"Step 0. Domain 3 の全体像"}</h2>
{" "}
<h3 id="sec-0-1" tabIndex={-1}>{"0-1. 4 つの Task と 15 の Skill"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"0-1. 4 つの Task と 15 の Skillの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"Task"}</th><th scope="col">{"テーマ"}</th><th scope="col">{"Skill 数"}</th><th scope="col">{"一言で言うと"}</th></tr></thead><tbody><tr className="odd"><td>{"3.1"}</td><td>{"入出力の安全対策"}</td><td>{"5"}</td><td>{"「危険なものを入れない・出さない・嘘を出さない」"}</td></tr><tr className="even"><td>{"3.2"}</td><td>{"データセキュリティとプライバシー"}</td><td>{"3"}</td><td>{"「データを守る箱を作り、個人情報を漏らさない」"}</td></tr><tr className="odd"><td>{"3.3"}</td><td>{"ガバナンスとコンプライアンス"}</td><td>{"4"}</td><td>{"「誰が・何を・いつ・なぜ使ったか説明できる」"}</td></tr><tr className="even"><td>{"3.4"}</td><td>{"責任ある AI"}</td><td>{"3"}</td><td>{"「透明・公平・ポリシー準拠」"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-1" label="0-1. 4 つの Task と 15 の Skill" />
{" "}
<h3 id="sec-0-2" tabIndex={-1}>{"0-2. 守る対象の 3 方向"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"0-2. 守る対象の 3 方向の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"方向"}</th><th scope="col">{"守る対象"}</th><th scope="col">{"代表的な失敗例"}</th></tr></thead><tbody><tr className="odd"><td>{"入力"}</td><td>{"モデルに渡すデータ"}</td><td>{"悪意あるプロンプト、PII を含む入力"}</td></tr><tr className="even"><td>{"モデル／処理"}</td><td>{"推論基盤・データ基盤"}</td><td>{"公開インターネット経由の通信、過剰な IAM 権限"}</td></tr><tr className="odd"><td>{"出力"}</td><td>{"ユーザーに返す回答"}</td><td>{"有害表現、ハルシネーション、機密の漏えい"}</td></tr></tbody></table>{" "}</div>
{" "}
<hr  />
{" "}
<h2 id="step-1" tabIndex={-1}>{"Step 1. 生成AI特有の脅威を理解する"}</h2>
{" "}
<p>{" 従来の Web アプリの脅威に加え、"}<strong>{"自然言語そのものが攻撃経路になる"}</strong>{"点が最大の違いです。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"Step 1. 生成AI特有の脅威を理解するの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"脅威"}</th><th scope="col">{"説明"}</th><th scope="col">{"主な対策"}</th></tr></thead><tbody><tr className="odd"><td>{"Prompt Injection（直接）"}</td><td>{" ユーザーが「以前の指示を無視して…」と入力し、開発者の指示を上書きする "}</td><td>{"Guardrails の Prompt Attack フィルター、入力タグ、入力検証"}</td></tr><tr className="even"><td>{"Prompt Injection（間接）"}</td><td>{" 検索で取得した文書・Web ページ・API 応答に悪意ある命令が埋め込まれている "}</td><td>{"取得コンテンツにも同じ検証を適用、取得元の許可リスト化"}</td></tr><tr className="odd"><td>{"Jailbreak"}</td><td>{"役割演技などでモデルの安全ルールを回避する"}</td><td>{"Prompt Attack フィルター、安全分類器"}</td></tr><tr className="even"><td>{"機密情報の漏えい"}</td><td>{"PII や社内機密が入力・出力・ログに残る"}</td><td>{"機密情報フィルター、Comprehend / Macie、ログのマスキング"}</td></tr><tr className="odd"><td>{"ハルシネーション"}</td><td>{"もっともらしい誤情報の生成"}</td><td>{" Knowledge Bases による根拠付け、Contextual grounding check、Automated Reasoning "}</td></tr><tr className="even"><td>{"有害コンテンツ"}</td><td>{"憎悪・暴力・性的表現など"}</td><td>{"コンテンツフィルター"}</td></tr><tr className="odd"><td>{"過剰な権限（Excessive Agency）"}</td><td>{"エージェントが必要以上の操作権限を持つ"}</td><td>{"最小権限 IAM、承認フロー"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-2" label="Step 1. 生成AI特有の脅威を理解する" />
{" "}
<p>{" "}<strong>{"ポイント"}</strong>{": 攻撃は「ユーザー入力」だけでなく「検索で取得した文書」からも来ます。試験では "}<strong>{"間接 Prompt Injection も同等に検証する"}</strong>{" という考え方が問われます。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" OWASP Top 10 for LLM Applications: "}<a href="https://genai.owasp.org/llm-top-10/">{"https://genai.owasp.org/llm-top-10/"}</a>{" "}</li>{" "}<li>{" AWS Well-Architected Agentic AI Lens（入力検証）: "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec08.html">{"https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec08.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}</div>; }
