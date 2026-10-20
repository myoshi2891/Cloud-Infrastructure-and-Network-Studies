import { Diagram } from '../Diagram';
/** 原本のfoundationを順序どおり保持する。 */
export default function Foundation(){return <section data-part="foundation" className="guide-part">{" "}
<div className={"hero"}>{" "}<div className={"kicker"}>{" AWS Certified Generative AI Developer - Professional · Domain 5 "}</div>{" "}<h1 >{" AWS Certified Generative AI Developer - Professional (AIP-C01) Content Domain 5: Testing, Validation, and Troubleshooting 初学者向けステップバイステップ解説 "}</h1>{" "}<div className={"meta-row"}>{" "}<span className={"pill"}>{"配点 "}<strong >{"約11%"}</strong></span><span className={"pill"}>{"対象 "}<strong >{"初学者〜中級者"}</strong></span><span className={"pill"}>{"図解 "}<strong >{"Mermaid 18点"}</strong></span><span className={"pill"}>{"参考文献 "}<strong >{"31件"}</strong></span>{" "}</div>{" "}</div>
{" "}
<h2 id={"0-このガイドの使い方"} tabIndex={-1}>{"0. このガイドの使い方"}</h2>
{" "}
<h3 id={"各スキルの読み方"} tabIndex={-1}>{"各スキルの読み方"}</h3>
{" "}
<p >{"各 Skill は次の同じ型で書いてあります。迷ったらこの順に読んでください。"}</p>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"各スキルの読み方（表1）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"順番"}</th><th scope="col">{"見出し"}</th><th scope="col">{"中身"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"1"}</td><td >{"やさしい説明"}</td><td >{"初学者向けの「そもそも何か」"}</td></tr><tr className={"even"}><td >{"2"}</td><td >{"ステップで理解する"}</td><td >{"実際にどう作るか(手順)"}</td></tr><tr className={"odd"}><td >{"3"}</td><td >{"関連サービス・機能"}</td><td >{"試験に出る AWS サービス名と役割"}</td></tr><tr className={"even"}><td >{"4"}</td><td >{"ベストプラクティス"}</td><td >{"設計・運用で守る原則"}</td></tr><tr className={"odd"}><td >{"5"}</td><td >{"試験での狙われ方"}</td><td >{"「こう問われたらこう選ぶ」"}</td></tr><tr className={"even"}><td >{"6"}</td><td >{"根拠ソース"}</td><td >{"参照 URL"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"注意事項"} tabIndex={-1}>{"注意事項"}</h3>
{" "}
<ul >{" "}<li >{" 試験範囲は公式の Exam Guide が正です。サービス名・機能・提供リージョンは更新が早いため、最終確認は必ず公式ドキュメントで行ってください。 "}</li>{" "}<li >{" 根拠ソースは AWS 公式(docs / What's New / AWS Blog)を優先し、補足として第三者記事を付けています。第三者記事は「補足」と明記しています。 "}</li>{" "}<li >{"図は Mermaid(フローチャート)と Markdown 表のみを使っています。"}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id={"1-domain-5-の全体像"} tabIndex={-1}>{"1. Domain 5 の全体像"}</h2>
{" "}
<h3 id={"11-ドメイン構造"} tabIndex={-1}>{"1.1 ドメイン構造"}</h3>
{" "}
<Diagram id="diag-1" label={"1.1 ドメイン構造"} />
{" "}
<h3 id={"12-スキル早見表出題キーワードと主要サービス"} tabIndex={-1}>{" 1.2 スキル早見表(出題キーワードと主要サービス) "}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.2 スキル早見表(出題キーワードと主要サービス)（表2）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"スキル"}</th><th scope="col">{"一言でいうと"}</th><th scope="col">{"主なキーワード"}</th><th scope="col">{"主な AWS サービス・機能"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"5.1.1"}</td><td >{"良い回答とは何かを数値化する枠組み"}</td><td >{"relevance, factual accuracy, consistency, fluency"}</td><td >{"Bedrock Evaluations"}</td></tr><tr className={"even"}><td >{"5.1.2"}</td><td >{"最適なモデル・設定を比較して選ぶ"}</td><td >{" A/B, canary, multi-model, token efficiency, latency-to-quality "}</td><td >{"Bedrock Model Evaluation, Lambda エイリアス, API Gateway"}</td></tr><tr className={"odd"}><td >{"5.1.3"}</td><td >{"利用者の声を品質改善に使う"}</td><td >{"feedback, rating, annotation"}</td><td >{"人間評価ワークフロー, DynamoDB, S3"}</td></tr><tr className={"even"}><td >{"5.1.4"}</td><td >{"品質を継続的に守る仕組み"}</td><td >{"continuous evaluation, regression, quality gate"}</td><td >{"CodePipeline, CodeBuild, Step Functions"}</td></tr><tr className={"odd"}><td >{"5.1.5"}</td><td >{"複数の視点で評価する"}</td><td >{"RAG evaluation, LLM-as-a-Judge, human feedback"}</td><td >{"Bedrock Evaluations, Knowledge Bases"}</td></tr><tr className={"even"}><td >{"5.1.6"}</td><td >{"検索部分だけを切り出して測る"}</td><td >{"relevance scoring, context matching, retrieval latency"}</td><td >{"Knowledge Bases 検索評価"}</td></tr><tr className={"odd"}><td >{"5.1.7"}</td><td >{"エージェントがちゃんと仕事をしたか測る"}</td><td >{"task completion, tool usage, reasoning quality"}</td><td >{"AgentCore Evaluations, Bedrock Agents トレース"}</td></tr><tr className={"even"}><td >{"5.1.8"}</td><td >{"結果を関係者に伝える"}</td><td >{"visualization, automated report, comparison"}</td><td >{"CloudWatch ダッシュボード, QuickSight, Athena"}</td></tr><tr className={"odd"}><td >{"5.1.9"}</td><td >{"更新前後で壊れていないか確認する"}</td><td >{"synthetic workflow, hallucination rate, semantic drift"}</td><td >{"CloudWatch Synthetics, CloudWatch アラーム"}</td></tr><tr className={"even"}><td >{"5.2.1"}</td><td >{"入力が多すぎる・切れる問題"}</td><td >{"context window overflow, dynamic chunking, truncation"}</td><td >{"Converse API の stopReason, トークン数管理"}</td></tr><tr className={"odd"}><td >{"5.2.2"}</td><td >{"API 呼び出しが失敗する問題"}</td><td >{"error logging, request validation, response analysis"}</td><td >{"Bedrock エラーコード, 呼び出しログ, CloudTrail"}</td></tr><tr className={"even"}><td >{"5.2.3"}</td><td >{"プロンプトの品質・安定性の問題"}</td><td >{"prompt testing, version comparison"}</td><td >{"Bedrock Prompt Management"}</td></tr><tr className={"odd"}><td >{"5.2.4"}</td><td >{"検索が外れる問題"}</td><td >{"embedding quality, drift, chunking, vector search tuning"}</td><td >{"Knowledge Bases, OpenSearch"}</td></tr><tr className={"even"}><td >{"5.2.5"}</td><td >{"プロンプトの継続的な保守"}</td><td >{"template testing, CloudWatch Logs, X-Ray, schema validation"}</td><td >{"CloudWatch Logs Insights, X-Ray"}</td></tr></tbody></table>{" "}</div>
{" "}
<hr  />
{" "}
<h2 id={"2-前提知識-なぜ生成aiのテストは従来と違うのか"} tabIndex={-1}>{" 2. 前提知識: なぜ生成AIのテストは従来と違うのか "}</h2>
{" "}
<h3 id={"21-従来の-ml-評価との違い"} tabIndex={-1}>{"2.1 従来の ML 評価との違い"}</h3>
{" "}
<p >{" 従来の機械学習(分類・回帰)は、正解ラベルが 1 つに決まるため「正解率(accuracy)」「F1」などで機械的に採点できました。生成AIは同じ質問に対して何通りもの正しい文章があり得るため、同じやり方では評価できません。 "}</p>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.1 従来の ML 評価との違い（表3）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"従来の ML 評価"}</th><th scope="col">{"生成AI(FM)の評価"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"正解"}</td><td >{"1 つに決まる"}</td><td >{"複数の許容回答がある"}</td></tr><tr className={"even"}><td >{"主な指標"}</td><td >{"accuracy, precision, recall, F1"}</td><td >{" relevance(関連性), factual accuracy(事実性), consistency(一貫性), fluency(流暢さ), safety(安全性) "}</td></tr><tr className={"odd"}><td >{"採点方法"}</td><td >{"自動計算"}</td><td >{"自動指標 + LLM による採点 + 人間による採点の組み合わせ"}</td></tr><tr className={"even"}><td >{"再現性"}</td><td >{"同じ入力なら同じ出力"}</td><td >{"同じ入力でも出力が揺れる(temperature など)"}</td></tr><tr className={"odd"}><td >{"失敗の型"}</td><td >{"誤分類"}</td><td >{"ハルシネーション, 有害出力, 形式崩れ, 文脈切れ"}</td></tr><tr className={"even"}><td >{"評価対象"}</td><td >{"モデル単体"}</td><td >{" モデル + プロンプト + 検索(RAG) + ツール + ガードレールの全体 "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"22-評価とトラブルシュートの関係"} tabIndex={-1}>{"2.2 評価とトラブルシュートの関係"}</h3>
{" "}
<p >{" 評価(Task 5.1)は「問題を見つける仕組み」、トラブルシュート(Task 5.2)は「見つけた問題の原因を特定して直す手順」です。両者は 1 つのループになっています。 "}</p>
{" "}
<Diagram id="diag-2" label={"2.2 評価とトラブルシュートの関係"} />
{" "}
<h3 id={"23-最初に覚える用語"} tabIndex={-1}>{"2.3 最初に覚える用語"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2.3 最初に覚える用語（表4）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"意味"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"FM (Foundation Model)"}</td><td >{"基盤モデル。Amazon Bedrock 上で呼び出す LLM など"}</td></tr><tr className={"even"}><td >{"ゴールデンデータセット"}</td><td >{" 質問と期待される回答(または評価観点)をセットにした、評価用の基準データ "}</td></tr><tr className={"odd"}><td >{"LLM-as-a-Judge"}</td><td >{"別の LLM に採点役をさせる評価方法"}</td></tr><tr className={"even"}><td >{"RAG"}</td><td >{"検索で取得した文書を根拠にして回答を生成する構成"}</td></tr><tr className={"odd"}><td >{"ハルシネーション"}</td><td >{" 根拠のない内容や事実と異なる内容をもっともらしく生成すること "}</td></tr><tr className={"even"}><td >{"セマンティックドリフト"}</td><td >{" 出力の意味内容が、時間や更新によって以前の基準からずれていくこと "}</td></tr><tr className={"odd"}><td >{"リグレッションテスト"}</td><td >{"変更後に、以前できていたことが壊れていないか確認するテスト"}</td></tr><tr className={"even"}><td >{"品質ゲート"}</td><td >{"基準を満たさなければ次の工程(デプロイ)に進ませない関門"}</td></tr><tr className={"odd"}><td >{"コンテキストウィンドウ"}</td><td >{"モデルが 1 回の呼び出しで扱える入力+出力のトークン上限"}</td></tr><tr className={"even"}><td >{"チャンク"}</td><td >{"RAG で文書を分割した検索の単位"}</td></tr></tbody></table>{" "}</div>
{" "}
<hr  />
{" "}</section>;}
