import { Diagram } from '../Diagram';
/** 原本のtask1を順序どおり保持する。 */
export default function Task51(){return <section data-part="task1" className="guide-part"><h2 id={"3-task-51-生成aiの評価システムを実装する"} tabIndex={-1}>{" 3. Task 5.1 生成AIの評価システムを実装する "}</h2>
{" "}
<h3 id={"task-51-の全体フロー"} tabIndex={-1}>{"Task 5.1 の全体フロー"}</h3>
{" "}
<Diagram id="diag-3" label={"Task 5.1 の全体フロー"} />
{" "}
<hr  />
{" "}
<h3 id={"skill-511-評価フレームワーク品質指標"} tabIndex={-1}>{" Skill 5.1.1 評価フレームワーク(品質指標) "}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: 従来の ML 評価を超えて FM 出力の品質と有効性を評価する包括的な評価フレームワークを作る(例: relevance, factual accuracy, consistency, fluency の指標)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" 「この AI の回答は良いのか?」を、感覚ではなく**物差し(指標)**で測れるようにする設計図が評価フレームワークです。生成AIは正解が 1 つではないため、「何を良いとするか」を最初に言葉と数値で決めておく必要があります。 "}</p>
{" "}
<h4 >{"ステップで理解する"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップで理解する（表5）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"Step"}</th><th scope="col">{"やること"}</th><th scope="col">{"具体例(社内FAQボット)"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"1"}</td><td >{"成功の定義を決める"}</td><td >{"「社内規程に基づく正しい回答を、1回で解決できる」"}</td></tr><tr className={"even"}><td >{"2"}</td><td >{"指標を選ぶ"}</td><td >{"関連性・事実性・一貫性・流暢さ・安全性・応答時間・コスト"}</td></tr><tr className={"odd"}><td >{"3"}</td><td >{"評価データを作る"}</td><td >{"実際の問い合わせ 100〜500 件 + 期待回答(または評価観点)"}</td></tr><tr className={"even"}><td >{"4"}</td><td >{"採点者を決める"}</td><td >{"自動指標、LLM 採点、人間レビューの役割分担"}</td></tr><tr className={"odd"}><td >{"5"}</td><td >{"合格基準(閾値)を決める"}</td><td >{"事実性 0.9 以上、有害出力 0 件 など"}</td></tr><tr className={"even"}><td >{"6"}</td><td >{"ベースラインを測る"}</td><td >{"現行のモデル+プロンプトで一度測り、基準値にする"}</td></tr><tr className={"odd"}><td >{"7"}</td><td >{"変更ごとに再測定"}</td><td >{"プロンプトやモデルを変えるたびに同じデータで比較"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"主な品質指標"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"主な品質指標（表6）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"指標"}</th><th scope="col">{"何を見るか"}</th><th scope="col">{"測り方の例"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Relevance(関連性)"}</td><td >{"質問に対して的を射た回答か"}</td><td >{"LLM 採点、人間評価"}</td></tr><tr className={"even"}><td >{"Factual accuracy(事実性)"}</td><td >{"事実や根拠文書と矛盾していないか"}</td><td >{"参照回答との比較、faithfulness(根拠への忠実性)の採点"}</td></tr><tr className={"odd"}><td >{"Consistency(一貫性)"}</td><td >{"同じ質問・言い換えに対して回答がぶれないか"}</td><td >{" 同一プロンプトを複数回実行して回答の類似度や判定のばらつきを比較 "}</td></tr><tr className={"even"}><td >{"Fluency / Coherence(流暢さ・論理的一貫性)"}</td><td >{"文として自然で、話の筋が通っているか"}</td><td >{"LLM 採点"}</td></tr><tr className={"odd"}><td >{"Completeness(網羅性)"}</td><td >{"必要な情報が抜けていないか"}</td><td >{"LLM 採点"}</td></tr><tr className={"even"}><td >{"Safety(安全性)"}</td><td >{"有害・偏見・不適切な内容がないか"}</td><td >{"Guardrails の判定、LLM 採点(harmfulness, stereotyping など)"}</td></tr><tr className={"odd"}><td >{"Format compliance(形式遵守)"}</td><td >{"指定した JSON などの形式を守るか"}</td><td >{"スキーマ検証(プログラム的)"}</td></tr><tr className={"even"}><td >{"Latency / Cost"}</td><td >{"応答時間とトークンコスト"}</td><td >{"CloudWatch メトリクス"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"関連サービス・機能"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"関連サービス・機能（表7）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"サービス・機能"}</th><th scope="col">{"役割"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Amazon Bedrock Evaluations"}</td><td >{" 自動評価(プログラム的)、LLM-as-a-Judge、人間評価を提供。カスタムメトリクスも作成可能 "}</td></tr><tr className={"even"}><td >{"Amazon S3"}</td><td >{"評価用データセット(JSONL など)と結果の保管"}</td></tr><tr className={"odd"}><td >{"Amazon CloudWatch"}</td><td >{"レイテンシ・トークン数などの運用指標"}</td></tr></tbody></table>{" "}</div>
{" "}
<p >{" Bedrock のプログラム的な自動評価では、accuracy・robustness・toxicity などの定義済み指標を、用意済みまたはカスタムのデータセットで測れます。主観的な指標には人間評価ワークフローを設定できます。 "}</p>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"指標は 1 つに絞らず複数にする。"}</strong>{" 関連性が高くても事実が間違っていれば使えません。品質・安全・コストをセットで見ます。 "}</li>{" "}<li >{" "}<strong >{"評価データは実際の利用ログから作る。"}</strong>{" 開発者が思いつく質問だけでは偏ります。低評価だった実例や境界ケース(曖昧な質問、範囲外の質問)も入れます。 "}</li>{" "}<li >{" "}<strong >{"評価データはバージョン管理する。"}</strong>{" S3 のバージョニングや Git で履歴を残し、「どのデータで測った結果か」を追えるようにします。 "}</li>{" "}<li >{" "}<strong >{"評価実行時は条件を固定する。"}</strong>{" temperature などの推論パラメータとプロンプトのバージョンを記録し、比較の公平性を保ちます。 "}</li>{" "}<li >{" "}<strong >{"ビジネス KPI と結びつける。"}</strong>{" 「解決率」「問い合わせ削減数」など、事業成果に対応づけます。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「従来の精度指標だけでは不十分。FM 出力を評価するには?」→ relevance / factual accuracy / consistency / fluency など"}<strong >{"複数観点の指標と、LLM・人間を含む評価"}</strong>{"を組み合わせる。 "}</li>{" "}<li >{" 「ハルシネーションを検出したい」→ 根拠文書との整合性(faithfulness / groundedness)を測る評価を設計する。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.1)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/bedrock/evaluations/"}>{"Amazon Bedrock Evaluations(製品ページ)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"}>{"Amazon Bedrock モデル評価(ユーザーガイド)"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-512-モデル評価システムと構成の最適化"} tabIndex={-1}>{" Skill 5.1.2 モデル評価システムと構成の最適化 "}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: 最適な構成を特定する体系的なモデル評価システムを作る(例: Bedrock Model Evaluations、FM の A/B テストとカナリアテスト、マルチモデル評価、トークン効率・レイテンシ対品質比・ビジネス成果のコストパフォーマンス分析)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" 「どのモデル」「どのプロンプト」「どのパラメータ」が、自分たちの用途で最も良いかを"}<strong >{"同じ条件で比べて決める"}</strong>{"仕組みです。品質だけでなく、コストと速度も同時に比べるのがポイントです。 "}</p>
{" "}
<h4 >{"評価方法の選び方"}</h4>
{" "}
<Diagram id="diag-4" label={"評価方法の選び方"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"評価方法の選び方（表8）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"手法"}</th><th scope="col">{"何をする"}</th><th scope="col">{"いつ使う"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Bedrock Model Evaluation(自動)"}</td><td >{"用意したデータセットでモデルを採点"}</td><td >{"導入前のモデル選定、プロンプト変更の事前確認"}</td></tr><tr className={"even"}><td >{"Bedrock Model Evaluation(人間)"}</td><td >{"人が回答を比較・評価"}</td><td >{"文体・好みなど主観的な品質"}</td></tr><tr className={"odd"}><td >{"マルチモデル評価"}</td><td >{"同一データを複数モデルで実行して比較"}</td><td >{"モデル選定、世代更新の影響確認"}</td></tr><tr className={"even"}><td >{"A/B テスト"}</td><td >{"利用者を 2 グループに分けて並行比較"}</td><td >{"本番でユーザー行動(解決率・満足度)を比較したい"}</td></tr><tr className={"odd"}><td >{"カナリアテスト"}</td><td >{"新構成を少量(例: 数%)の本番トラフィックに限定公開"}</td><td >{"安全に段階展開したい。異常時は即ロールバック"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"A/B・カナリアを実現する AWS の仕組み(例)"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"A/B・カナリアを実現する AWS の仕組み(例)（表9）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"仕組み"}</th><th scope="col">{"使い方"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"AWS Lambda エイリアスの加重ルーティング"}</td><td >{"同じ関数の 2 バージョンへ重み付けでトラフィックを分ける"}</td></tr><tr className={"even"}><td >{"Amazon API Gateway のカナリアリリース"}</td><td >{"ステージ単位で一部のリクエストを新バージョンへ"}</td></tr><tr className={"odd"}><td >{"AWS AppConfig"}</td><td >{" 機能フラグでモデル ID・プロンプトバージョンを切り替え、段階展開 "}</td></tr><tr className={"even"}><td >{"Amazon CloudWatch アラーム"}</td><td >{" カナリア中のエラー率・レイテンシ・品質スコアを監視して自動ロールバックの判断材料にする "}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"コストパフォーマンス分析の指標"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"コストパフォーマンス分析の指標（表10）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"指標"}</th><th scope="col">{"意味"}</th><th scope="col">{"見る場所"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Token efficiency(トークン効率)"}</td><td >{"同じ品質を何トークンで達成したか"}</td><td >{" Bedrock の入出力トークン数メトリクス(InputTokenCount, OutputTokenCount) "}</td></tr><tr className={"even"}><td >{"Latency-to-quality ratio"}</td><td >{"速度に対する品質のバランス"}</td><td >{"InvocationLatency と評価スコアを同じ表で比較"}</td></tr><tr className={"odd"}><td >{"Cost per successful task"}</td><td >{"成功 1 件あたりのコスト"}</td><td >{"成功率 ÷ 総コスト"}</td></tr><tr className={"even"}><td >{"Business outcome"}</td><td >{"事業成果"}</td><td >{"解決率、CVR、問い合わせ削減など"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote >{" "}<p >{" 補足: 「一番高性能なモデル」が最適とは限りません。要件を満たす最も安価・高速なモデルを選ぶのが原則です。 "}</p>{" "}</blockquote>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"同一データ・同一プロンプト・同一パラメータで比較する。"}</strong>{" 条件が違うと比較になりません。 "}</li>{" "}<li >{" "}<strong >{"品質・速度・コストの 3 軸で表にする。"}</strong>{" 一軸だけで判断しません。 "}</li>{" "}<li >{" "}<strong >{"カナリアは「小さく始めて広げる」。"}</strong>{" 異常を検知したら自動で元に戻せる仕組み(アラーム連動)を先に用意します。 "}</li>{" "}<li >{" "}<strong >{"本番では指標が揃うまで十分な件数を確保する。"}</strong>{" 少数のサンプルで勝敗を判断しません。 "}</li>{" "}<li >{" "}<strong >{"LLM-as-a-Judge を使う場合は 1 評価ジョブ 1 モデル。"}</strong>{" 複数モデル比較は評価ジョブを分けて実施し、同じ評価データ・同じジャッジで揃えます。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「新しいモデル候補を本番影響なしで比較したい」→ Bedrock Model Evaluation による事前評価。 "}</li>{" "}<li >{" 「本番で少量のトラフィックだけ新プロンプトを試し、問題があればすぐ戻したい」→ カナリア(Lambda エイリアス重み付け / API Gateway カナリア / AppConfig)+ CloudWatch アラーム。 "}</li>{" "}<li >{" 「コストと品質のバランスを定量化したい」→ トークン数、レイテンシ、品質スコアを並べたコストパフォーマンス分析。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.2)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/bedrock/evaluations/"}>{"Amazon Bedrock Evaluations(製品ページ)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/blogs/aws/new-rag-evaluation-and-llm-as-a-judge-capabilities-in-amazon-bedrock"}>{"AWS News Blog: New RAG evaluation and LLM-as-a-judge capabilities in Amazon Bedrock"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/blogs/machine-learning/use-custom-metrics-to-evaluate-your-generative-ai-application-with-amazon-bedrock/"}>{"Use custom metrics to evaluate your generative AI application with Amazon Bedrock(1 ジョブ 1 モデルの記述あり)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html"}>{"AWS Lambda エイリアス(加重ルーティング)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GenAI-observability.html"}>{"Amazon CloudWatch Bedrock メトリクス・生成AIオブザーバビリティ"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-513-ユーザー中心の評価"} tabIndex={-1}>{"Skill 5.1.3 ユーザー中心の評価"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: ユーザー体験に基づいて FM の性能を継続的に改善する、ユーザー中心の評価の仕組みを作る(例: フィードバック UI、出力の評価システム、回答品質を評価するアノテーションワークフロー)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" 自動評価では拾えない「使っている人が本当に役に立ったと感じたか」を集めて、改善に回す仕組みです。 "}</p>
{" "}
<h4 >{"ステップで理解する"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップで理解する（表11）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"Step"}</th><th scope="col">{"やること"}</th><th scope="col">{"実装のヒント"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"1"}</td><td >{"フィードバック収集 UI を付ける"}</td><td >{"回答ごとの 👍 / 👎、5 段階評価、自由記述コメント"}</td></tr><tr className={"even"}><td >{"2"}</td><td >{"リクエストと結びつけて保存"}</td><td >{" リクエスト ID / トレース ID、プロンプトバージョン、モデル ID と一緒に DynamoDB や S3 に保存 "}</td></tr><tr className={"odd"}><td >{"3"}</td><td >{"暗黙のシグナルも集める"}</td><td >{"再質問・やり直し・離脱・コピー操作など"}</td></tr><tr className={"even"}><td >{"4"}</td><td >{"低評価をサンプリングしてアノテーション"}</td><td >{"人間が回答を採点(正確性、有用性、トーン等)"}</td></tr><tr className={"odd"}><td >{"5"}</td><td >{"評価データセットに還元"}</td><td >{"問題のあった質問をゴールデンデータセットに追加"}</td></tr><tr className={"even"}><td >{"6"}</td><td >{"改善して再評価"}</td><td >{"プロンプト・検索設定・モデルを修正し、リグレッション確認"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-5" label={"ステップで理解する"} />
{" "}
<h4 >{"関連サービス・機能"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"関連サービス・機能（表12）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"サービス・機能"}</th><th scope="col">{"役割"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Amazon Bedrock の人間評価"}</td><td >{" 自社チームまたは AWS 管理のチームで回答を評価するワークフロー "}</td></tr><tr className={"even"}><td >{"Amazon DynamoDB / Amazon S3"}</td><td >{"フィードバックと評価結果の保存"}</td></tr><tr className={"odd"}><td >{"Amazon API Gateway + AWS Lambda"}</td><td >{"フィードバック受付 API"}</td></tr><tr className={"even"}><td >{"Amazon SageMaker Ground Truth / Amazon Augmented AI(A2I)"}</td><td >{"アノテーション・人間レビューの作業フロー(補助的な選択肢)"}</td></tr><tr className={"odd"}><td >{"Amazon Athena / Amazon QuickSight"}</td><td >{"フィードバックの集計・可視化"}</td></tr></tbody></table>{" "}</div>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"フィードバックは「どの回答に対するものか」を必ず紐づける。"}</strong>{" リクエスト ID・プロンプトバージョン・モデル ID・取得文書 ID を一緒に保存します。 "}</li>{" "}<li >{" "}<strong >{"評価基準(ルーブリック)を文章で定義する。"}</strong>{" アノテーター間で採点がぶれないよう、基準と例を渡します。 "}</li>{" "}<li >{" "}<strong >{"個人情報を扱う場合はマスキングと権限分離を行う。"}</strong>{" フィードバックやログにはユーザー入力が含まれます。 "}</li>{" "}<li >{" "}<strong >{"低評価だけでなく高評価もサンプリングする。"}</strong>{" 良い例を「守るべき挙動」としてリグレッションテストに使えます。 "}</li>{" "}<li >{" "}<strong >{"フィードバックの収集コストを下げる。"}</strong>{" 入力の負担が少ないほど回収率が上がります。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「ユーザー体験を継続的に改善したい」→ フィードバック UI + 評価保存 + アノテーション + 評価データセットへの還元、というループを選ぶ。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.3)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/bedrock/evaluations/"}>{"Amazon Bedrock Evaluations(人間評価の記述)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/sagemaker/latest/dg/a2i-use-augmented-ai-a2i-human-review-loops.html"}>{"Amazon Augmented AI(A2I)人間レビュー"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-514-品質保証qaプロセス"} tabIndex={-1}>{"Skill 5.1.4 品質保証(QA)プロセス"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM の一貫した性能基準を維持する体系的な QA プロセスを作る(例: 継続的評価ワークフロー、モデル出力のリグレッションテスト、デプロイ時の自動品質ゲート)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" 通常のソフトウェアの CI/CD に「回答の品質テスト」を組み込み、基準を下回る変更は自動で止める仕組みです。 "}</p>
{" "}
<h4 >{"ステップで理解する"}</h4>
{" "}
<Diagram id="diag-6" label={"ステップで理解する"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップで理解する（表13）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"Step"}</th><th scope="col">{"やること"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"1"}</td><td >{" リグレッション用の評価セットを固定する(過去に問題があった質問・守るべき回答を含める) "}</td></tr><tr className={"even"}><td >{"2"}</td><td >{"変更のたびに CI で評価を自動実行する"}</td></tr><tr className={"odd"}><td >{"3"}</td><td >{" 品質ゲートの閾値を数値で決める(例: 事実性スコア・形式遵守率・有害出力ゼロ) "}</td></tr><tr className={"even"}><td >{"4"}</td><td >{" 閾値未達ならデプロイを止める(CodePipeline のステージ失敗、承認待ち) "}</td></tr><tr className={"odd"}><td >{"5"}</td><td >{"デプロイ後も定期的(夜間など)に継続評価を回す"}</td></tr><tr className={"even"}><td >{"6"}</td><td >{"結果を保存し、前回との差分(劣化)を検知する"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"関連サービス・機能"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"関連サービス・機能（表14）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"サービス"}</th><th scope="col">{"役割"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"AWS CodePipeline / AWS CodeBuild"}</td><td >{"評価をパイプラインに組み込み、ゲートで停止"}</td></tr><tr className={"even"}><td >{"AWS Step Functions"}</td><td >{" 評価の複数ステップ(実行→採点→集計→判定)のオーケストレーション "}</td></tr><tr className={"odd"}><td >{"Amazon EventBridge Scheduler"}</td><td >{"夜間・定期の継続評価のトリガー"}</td></tr><tr className={"even"}><td >{"Amazon Bedrock Evaluations"}</td><td >{"自動評価ジョブ"}</td></tr><tr className={"odd"}><td >{"Amazon S3"}</td><td >{"評価データセット・結果の保管とバージョニング"}</td></tr><tr className={"even"}><td >{"Amazon CloudWatch アラーム"}</td><td >{"品質メトリクスの劣化通知"}</td></tr></tbody></table>{" "}</div>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"プロンプトもコードと同じく変更管理する。"}</strong>{" バージョン管理し、変更のたびにテストを走らせます。 "}</li>{" "}<li >{" "}<strong >{"リグレッションセットは育てる。"}</strong>{" 本番で見つかった失敗は必ずテストに追加します。 "}</li>{" "}<li >{" "}<strong >{"ゲートは「平均」だけでなく「最悪ケース」も見る。"}</strong>{" 有害出力ゼロ、重要質問の正答など、個別の必須条件を設けます。 "}</li>{" "}<li >{" "}<strong >{"評価の揺らぎを考慮する。"}</strong>{" 生成の非決定性があるため、複数回実行や統計的な余裕を持たせた閾値にします。 "}</li>{" "}<li >{" "}<strong >{"継続評価で「モデル側の更新」も検知する。"}</strong>{" モデルバージョンが変わった場合も同じ評価を自動実行します。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「プロンプト変更で品質が劣化しないよう自動で防ぎたい」→ CI/CD に評価ジョブとゲートを組み込む。 "}</li>{" "}<li >{" 「モデルのバージョン更新後に出力が変わっていないか確認したい」→ リグレッションテスト(ゴールデンデータセットで比較)。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.4)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available"}>{"Amazon Bedrock AgentCore Evaluations GA(CI/CD でのリグレッションテスト対応の記述)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html"}>{"AWS CodePipeline ドキュメント"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-515-多角的な評価rag評価--llm-as-a-judge--人間評価"} tabIndex={-1}>{" Skill 5.1.5 多角的な評価(RAG評価 / LLM-as-a-Judge / 人間評価) "}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM 出力を複数の視点から徹底的に評価する(例: RAG 評価、LLM-as-a-Judge による自動品質評価、人間のフィードバック収集インターフェース)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" 1 つの採点方法だけでは必ず盲点ができます。そこで「機械的な自動指標」「LLM による採点」「人間による採点」を組み合わせ、さらに RAG の場合は「検索」と「生成」を分けて評価します。 "}</p>
{" "}
<h4 >{"3 つの評価者の比較"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3 つの評価者の比較（表15）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"評価者"}</th><th scope="col">{"長所"}</th><th scope="col">{"短所"}</th><th scope="col">{"向いている場面"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"プログラム的(自動指標)"}</td><td >{"速い・安い・再現性が高い"}</td><td >{"意味の良し悪しは測りにくい"}</td><td >{"形式遵守、定型の正誤、毒性判定、大量の回帰テスト"}</td></tr><tr className={"even"}><td >{"LLM-as-a-Judge"}</td><td >{"人間に近い観点を大量・低コストで採点"}</td><td >{"ジャッジの癖(偏り)がある"}</td><td >{"正確性・網羅性・有用性・忠実性などの日常的な評価"}</td></tr><tr className={"odd"}><td >{"人間評価"}</td><td >{"最も信頼でき、主観的な品質も測れる"}</td><td >{"遅い・高い・基準がぶれる"}</td><td >{"最終判断、ジャッジの校正、ブランドトーン"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"Amazon Bedrock Evaluations でできること"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Amazon Bedrock Evaluations でできること（表16）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"機能"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"モデル評価(LLM-as-a-Judge)"}</td><td >{" カスタムのプロンプトデータセットに対して、正確性・網羅性・有害性などの指標で評価 "}</td></tr><tr className={"even"}><td >{"RAG 検索のみの評価"}</td><td >{" 検索品質を context relevance(文脈の関連性)・context coverage(文脈のカバー率)などで評価 "}</td></tr><tr className={"odd"}><td >{"RAG 検索+生成の評価"}</td><td >{" エンドツーエンドの回答品質を評価。Knowledge Bases 以外の自前 RAG の出力も評価可能 "}</td></tr><tr className={"even"}><td >{"カスタムメトリクス"}</td><td >{"独自の評価観点をジャッジ用プロンプトとして定義して追加"}</td></tr><tr className={"odd"}><td >{"引用系の指標"}</td><td >{" citation precision / citation coverage(引用の精度・網羅性)が RAG 評価に追加されている "}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote >{" "}<p >{" 評価はジャッジとなる LLM を選び、データセットを S3 に置き、指標を選んで実行する流れです。評価ジョブには Bedrock と S3 にアクセスできる IAM サービスロールが必要です。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"RAG は「2 段階」に分けて評価する"}</h4>
{" "}
<Diagram id="diag-7" label={"RAG は「2 段階」に分けて評価する"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"RAG は「2 段階」に分けて評価する（表17）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"結果"}</th><th scope="col">{"疑うべき場所"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"検索スコアが低い"}</td><td >{"チャンク分割、埋め込みモデル、検索方式、メタデータフィルタ"}</td></tr><tr className={"even"}><td >{"検索は良いが回答が悪い"}</td><td >{"プロンプト、モデル選択、コンテキストの詰め込み方"}</td></tr><tr className={"odd"}><td >{"回答は流暢だが根拠がない"}</td><td >{" faithfulness(忠実性)が低い。根拠提示の指示や引用の要求を強化 "}</td></tr></tbody></table>{" "}</div>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"LLM-as-a-Judge のベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"ジャッジのプロンプトに明確な基準とスケールを書く。"}</strong>{" 曖昧な基準は採点のぶれにつながります。 "}</li>{" "}<li >{" "}<strong >{"ジャッジを人間評価で校正する。"}</strong>{" 少数のサンプルで人間とジャッジの一致度を確認します。 "}</li>{" "}<li >{" "}<strong >{"ジャッジの偏りに注意する。"}</strong>{" 長い回答を好む、順序で結果が変わる、自分と同系統のモデルを好む、といった傾向が知られています。順序を入れ替えて再評価するなど対策します。 "}</li>{" "}<li >{" "}<strong >{"評価対象と別のモデルをジャッジにするのが無難。"}</strong>{" 自己評価の甘さを避けます。 "}</li>{" "}<li >{" "}<strong >{"評価コストを見積もる。"}</strong>{" RAG 評価は 1 テストケースにつき複数回の LLM 呼び出しが発生するため、データセットの規模とジャッジモデルの価格を事前に確認します。 "}</li>{" "}<li >{" "}<strong >{"人間フィードバックの収集 UI を併設する。"}</strong>{" 本番の低評価をアノテーションに回します(Skill 5.1.3)。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「RAG の回答が悪い。検索と生成のどちらが原因か切り分けたい」→ 検索のみの評価と、検索+生成のエンドツーエンド評価を分けて実行。 "}</li>{" "}<li >{"「大量の出力を人間に近い基準で低コストに採点したい」→ LLM-as-a-Judge。"}</li>{" "}<li >{"「主観的な品質(トーン等)の最終確認」→ 人間評価。"}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.5)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/bedrock/evaluations/"}>{"Amazon Bedrock Evaluations(製品ページ)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/blogs/aws/new-rag-evaluation-and-llm-as-a-judge-capabilities-in-amazon-bedrock"}>{"AWS News Blog: New RAG evaluation and LLM-as-a-judge capabilities in Amazon Bedrock"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/blogs/machine-learning/use-custom-metrics-to-evaluate-your-generative-ai-application-with-amazon-bedrock/"}>{"AWS ML Blog: Use custom metrics to evaluate your generative AI application with Amazon Bedrock"}</a>{" "}</li>{" "}<li >{" 補足(第三者): "}<a href={"https://medium.com/@shawn-jiang/evaluating-llms-on-amazon-bedrock-part-2-9d90a9672ebe"}>{"Evaluating RAG using Bedrock's built-in LLM-as-a-Judge(Part 2)"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-516-検索品質テスト"} tabIndex={-1}>{"Skill 5.1.6 検索品質テスト"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM を補強する情報検索コンポーネントを評価・最適化する検索品質テストを実装する(例: 関連性スコア、コンテキスト一致の検証、検索レイテンシの測定)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" RAG では「正しい文書が取れていなければ、どんなに賢いモデルでも正しく答えられません」。そこで、生成を切り離して"}<strong >{"検索だけ"}</strong>{"を測ります。 "}</p>
{" "}
<h4 >{"測る 3 つの観点"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"測る 3 つの観点（表18）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"観点"}</th><th scope="col">{"問い"}</th><th scope="col">{"指標の例"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"関連性"}</td><td >{"取れた文書は質問に関係あるか"}</td><td >{"context relevance、Precision@k(上位 k 件のうち関連する割合)"}</td></tr><tr className={"even"}><td >{"網羅性"}</td><td >{"必要な情報は全部取れているか"}</td><td >{"context coverage、Recall@k"}</td></tr><tr className={"odd"}><td >{"順位の良さ"}</td><td >{"重要な文書が上位に来ているか"}</td><td >{"MRR、nDCG(順位を考慮した指標)"}</td></tr><tr className={"even"}><td >{"速度"}</td><td >{"検索に何ミリ秒かかるか"}</td><td >{"検索レイテンシ(p50 / p95 / p99)"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"ステップで理解する"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"ステップで理解する（表19）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"Step"}</th><th scope="col">{"やること"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"1"}</td><td >{"質問と「取れるべき文書(正解チャンク)」のペアを作る"}</td></tr><tr className={"even"}><td >{"2"}</td><td >{" 検索のみの評価を実行する(Bedrock の RAG 検索評価、または自前スクリプト) "}</td></tr><tr className={"odd"}><td >{"3"}</td><td >{"関連性・網羅性・順位・レイテンシを集計する"}</td></tr><tr className={"even"}><td >{"4"}</td><td >{" チャンクサイズ・検索方式・件数・リランカーなどを 1 つずつ変えて再測定する "}</td></tr><tr className={"odd"}><td >{"5"}</td><td >{"改善した設定を本番に反映し、継続的に監視する"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"検索品質を改善する主なつまみ(Bedrock Knowledge Bases)"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"検索品質を改善する主なつまみ(Bedrock Knowledge Bases)（表20）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"つまみ"}</th><th scope="col">{"効果"}</th></tr></thead><tbody ><tr className={"odd"}><td >{" チャンク戦略(固定長 / 階層 / セマンティック / カスタム Lambda) "}</td><td >{"検索単位の質が変わる"}</td></tr><tr className={"even"}><td >{"ハイブリッド検索"}</td><td >{" 意味検索とキーワード検索を併用して、固有名詞・型番などの取りこぼしを減らす "}</td></tr><tr className={"odd"}><td >{"リランカーモデル"}</td><td >{"取得結果を質問への関連度で並べ替える"}</td></tr><tr className={"even"}><td >{"メタデータフィルタ"}</td><td >{"部署・日付・文書種別で候補を絞り込む"}</td></tr><tr className={"odd"}><td >{"取得件数の調整"}</td><td >{" 既定では少数のチャンクを返す。増やすと再現率は上がるがコストとノイズも増える "}</td></tr><tr className={"even"}><td >{"クエリ分解"}</td><td >{"複数観点の質問を分割して検索する"}</td></tr></tbody></table>{" "}</div>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"検索を単体で評価する。"}</strong>{" 生成の揺らぎを排除でき、原因が特定しやすくなります。 "}</li>{" "}<li >{" "}<strong >{"「1 つずつ変更」して比較する。"}</strong>{" 複数同時に変えると効果の要因が不明になります。 "}</li>{" "}<li >{" "}<strong >{"品質とレイテンシのトレードオフを見る。"}</strong>{" リランキングは品質を上げる一方で遅延が増えます。両方を測って判断します。 "}</li>{" "}<li >{" "}<strong >{"評価データに難しい質問(言い換え、略語、複数文書にまたがる質問)を含める。"}</strong>{" "}</li>{" "}<li >{" "}<strong >{"文書更新後も定期的に再評価する。"}</strong>{" 内容の古さや追加文書による劣化(ドリフト)を検出します。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「RAG の検索精度を定量的にテストしたい」→ 検索のみの評価(context relevance / coverage)+ レイテンシ測定。 "}</li>{" "}<li >{"「型番や固有名詞が検索で外れる」→ ハイブリッド検索(キーワード併用)。"}</li>{" "}<li >{"「上位に関連性の低い文書が混じる」→ リランカー、メタデータフィルタ。"}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.6)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/bedrock/evaluations/"}>{"Amazon Bedrock Evaluations(RAG 検索評価)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://repost.aws/knowledge-center/bedrock-knowledge-bases-accurate-results-filters"}>{"AWS re:Post: Amazon Bedrock Knowledge Bases の検索精度を改善するには"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"}>{"Amazon Bedrock Knowledge Bases ユーザーガイド"}</a>{" "}</li>{" "}<li >{" 補足(第三者): "}<a href={"https://hidekazu-konishi.com/entry/amazon_bedrock_knowledge_bases_retrieval_quality_engineering.html"}>{"Amazon Bedrock Knowledge Bases Retrieval Quality Engineering"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-517-エージェント性能フレームワーク"} tabIndex={-1}>{" Skill 5.1.7 エージェント性能フレームワーク "}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: エージェントがタスクを正しく効率的に遂行することを確認する性能フレームワークを作る(例: タスク完了率の測定、ツール使用の有効性評価、Amazon Bedrock Agent の評価、マルチステップワークフローでの推論品質の評価)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" エージェントは「考える → ツールを呼ぶ → 結果を見て次を考える」を繰り返します。最終回答だけでなく、**途中の判断(どのツールを、どんな引数で呼んだか)**も評価する必要があります。 "}</p>
{" "}
<h4 >{"評価する 3 つの層"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"評価する 3 つの層（表21）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"層"}</th><th scope="col">{"問い"}</th><th scope="col">{"指標の例"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"結果"}</td><td >{"ユーザーの目的を達成したか"}</td><td >{"タスク完了率、Goal success rate"}</td></tr><tr className={"even"}><td >{"過程(ツール)"}</td><td >{"正しいツールを正しい引数で呼んだか"}</td><td >{" Tool selection accuracy(ツール選択精度)、Tool parameter accuracy(引数精度)、Tool call error rate(呼び出し失敗率) "}</td></tr><tr className={"odd"}><td >{"過程(推論)"}</td><td >{"筋道立てて考えられたか、無駄な手順はないか"}</td><td >{"推論の質、ステップ数、無限ループの有無、レイテンシ・コスト"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-8" label={"評価する 3 つの層"} />
{" "}
<h4 >{"関連サービス・機能"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"関連サービス・機能（表22）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"サービス・機能"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Amazon Bedrock AgentCore Evaluations"}</td><td >{" エージェント向けのマネージド評価。2026 年 3 月 31 日に一般提供開始。オンライン評価(本番トラフィックをサンプリングして継続採点)とオンデマンド評価(CI/CD でのリグレッションテスト等)の 2 種類 "}</td></tr><tr className={"even"}><td >{"組み込み評価器(13 種)"}</td><td >{"応答品質、安全性、タスク完了、ツール使用などを評価"}</td></tr><tr className={"odd"}><td >{"Ground Truth"}</td><td >{" 参照回答、セッション単位の期待行動(アサーション)、期待するツール実行順序などを基準として評価 "}</td></tr><tr className={"even"}><td >{"カスタム評価器"}</td><td >{" LLM ベース(プロンプトとモデルを指定)または Lambda ホストのコードベース(Python / JavaScript) "}</td></tr><tr className={"odd"}><td >{"AgentCore Observability / CloudWatch"}</td><td >{" 評価結果を観測データと同じ場所で可視化し、アラートも設定可能 "}</td></tr><tr className={"even"}><td >{"Amazon Bedrock Agents のトレース"}</td><td >{"エージェントの各ステップ(推論・ツール呼び出し)を確認"}</td></tr><tr className={"odd"}><td >{"オープンソース手法"}</td><td >{" Ragas などで RAG 部分、LLM-as-a-judge で推論やテキスト→SQL を評価する構成例が AWS ブログで公開されている "}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote >{" "}<p >{" 試験ガイドの表現は「Amazon Bedrock Agent evaluations」です。AgentCore Evaluations は 2026 年の GA 機能なので、学習時は「Bedrock のエージェント評価全般」として両方(Bedrock Agents のトレース確認と AgentCore Evaluations)を押さえてください。 "}</p>{" "}</blockquote>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"最終回答だけで合否を決めない。"}</strong>{" ツール選択や引数ミスが隠れた失敗の原因になります。 "}</li>{" "}<li >{" "}<strong >{"期待するツール呼び出し順序を Ground Truth として用意する。"}</strong>{" 重要なワークフローは手順まで検証します。 "}</li>{" "}<li >{" "}<strong >{"本番ではオンライン評価でサンプリング監視、変更時はオンデマンド評価でリグレッション確認。"}</strong>{" 役割を分けます。 "}</li>{" "}<li >{" "}<strong >{"ステップ数・トークン・レイテンシも指標にする。"}</strong>{" 正しくても無駄に長いエージェントは運用コストが高くなります。 "}</li>{" "}<li >{" "}<strong >{"ツール側のエラー(タイムアウト、権限不足)とエージェントの判断ミスを切り分ける。"}</strong>{" ツール呼び出し失敗率と選択精度を別々に見ます。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「エージェントが正しいツールを選んでいるか測りたい」→ Tool selection accuracy / Tool parameter accuracy。 "}</li>{" "}<li >{" 「本番のエージェント品質を継続的に監視したい」→ AgentCore Evaluations のオンライン評価 + CloudWatch アラート。 "}</li>{" "}<li >{" 「リリース前にエージェントの回帰テストを CI/CD で回したい」→ オンデマンド評価。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.7)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/jp/about-aws/whats-new/2026/03/agentcore-evaluations-generally-available/"}>{"What's New: Amazon Bedrock AgentCore Evaluations is now generally available(日本語版)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/blogs/aws/amazon-bedrock-agentcore-adds-quality-evaluations-and-policy-controls-for-deploying-trusted-ai-agents/"}>{"AWS News Blog: Amazon Bedrock AgentCore adds quality evaluations and policy controls"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/blogs/machine-learning/evaluating-ai-agents-real-world-lessons-from-building-agentic-systems-at-amazon"}>{"AWS ML Blog: Evaluating AI agents: Real-world lessons from building agentic systems at Amazon"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/blogs/machine-learning/evaluate-amazon-bedrock-agents-with-ragas-and-llm-as-a-judge"}>{"AWS ML Blog: Evaluate Amazon Bedrock Agents with Ragas and LLM-as-a-judge"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-518-レポーティング"} tabIndex={-1}>{"Skill 5.1.8 レポーティング"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM 実装の性能指標とインサイトを関係者に効果的に伝える総合的なレポーティングシステムを作る(例: 可視化ツール、自動レポート、モデル比較の可視化)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" 評価結果は、見られて判断に使われて初めて価値があります。読む人(経営層・プロダクト担当・エンジニア)ごとに見せ方を変え、自動で定期配信する仕組みを作ります。 "}</p>
{" "}
<h4 >{"読み手ごとの見せ方"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"読み手ごとの見せ方（表23）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"読み手"}</th><th scope="col">{"知りたいこと"}</th><th scope="col">{"見せる指標"}</th><th scope="col">{"形式"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"経営層・事業責任者"}</td><td >{"投資対効果は出ているか"}</td><td >{"解決率、問い合わせ削減数、コスト"}</td><td >{"週次・月次の要約レポート"}</td></tr><tr className={"even"}><td >{"プロダクト担当"}</td><td >{"利用者は満足しているか"}</td><td >{"満足度、低評価の理由分類"}</td><td >{"ダッシュボード"}</td></tr><tr className={"odd"}><td >{"エンジニア"}</td><td >{"どこが劣化したか、原因は何か"}</td><td >{"品質スコア、検索指標、エラー率、レイテンシ、トークン"}</td><td >{"詳細ダッシュボード、アラート"}</td></tr><tr className={"even"}><td >{"リスク・ガバナンス"}</td><td >{"安全性・コンプライアンスは守られているか"}</td><td >{"有害出力件数、ガードレール介入数"}</td><td >{"監査用レポート"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"自動レポートの構成"}</h4>
{" "}
<Diagram id="diag-9" label={"自動レポートの構成"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"自動レポートの構成（表24）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"サービス"}</th><th scope="col">{"役割"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Amazon S3 + AWS Glue / Amazon Athena"}</td><td >{"評価結果を SQL で集計"}</td></tr><tr className={"even"}><td >{"Amazon QuickSight"}</td><td >{"経営・プロダクト向けの可視化"}</td></tr><tr className={"odd"}><td >{"Amazon CloudWatch ダッシュボード・アラーム"}</td><td >{"運用メトリクスの可視化と通知"}</td></tr><tr className={"even"}><td >{"Amazon EventBridge Scheduler + AWS Lambda"}</td><td >{"定期的な自動レポート生成"}</td></tr><tr className={"odd"}><td >{"Amazon SNS / Amazon SES"}</td><td >{"レポート配信"}</td></tr><tr className={"even"}><td >{"Bedrock Evaluations のレポート画面"}</td><td >{"評価ジョブごとの指標を確認(モデル比較にも利用)"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 >{"モデル比較を伝えるときの可視化の例"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"モデル比較を伝えるときの可視化の例（表25）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"見せたいこと"}</th><th scope="col">{"向いている表現"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"複数モデルの品質差"}</td><td >{"指標ごとの棒グラフ、比較表"}</td></tr><tr className={"even"}><td >{"品質とコストのトレードオフ"}</td><td >{"散布図(横軸: コスト、縦軸: 品質)"}</td></tr><tr className={"odd"}><td >{"時系列の劣化・改善"}</td><td >{"折れ線グラフ(バージョン変更点に注釈)"}</td></tr><tr className={"even"}><td >{"失敗の内訳"}</td><td >{"失敗カテゴリ別の積み上げ棒グラフ"}</td></tr></tbody></table>{" "}</div>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"指標には必ず「基準値」と「前回比」を併記する。"}</strong>{" 数字だけでは良し悪しが分かりません。 "}</li>{" "}<li >{" "}<strong >{"レポートに評価条件(データセットのバージョン、モデル ID、プロンプトバージョン)を載せる。"}</strong>{" 再現可能性を担保します。 "}</li>{" "}<li >{" "}<strong >{"アラートとレポートを分ける。"}</strong>{" 緊急事態はアラート、傾向は定期レポートで伝えます。 "}</li>{" "}<li >{" "}<strong >{"ビジネス指標と技術指標を並べて見せる。"}</strong>{" 技術的な改善が事業成果につながっているかを示します。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「評価結果を定期的にステークホルダーへ自動共有したい」→ EventBridge Scheduler + Lambda + Athena / QuickSight(または SNS 配信)。 "}</li>{" "}<li >{" 「複数モデルの比較結果を可視化したい」→ QuickSight や CloudWatch ダッシュボードでの比較可視化。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.8)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GenAI-observability.html"}>{"Amazon CloudWatch 生成AIオブザーバビリティ"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/quicksight/latest/user/welcome.html"}>{"Amazon QuickSight ユーザーガイド"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/athena/latest/ug/what-is.html"}>{"Amazon Athena ユーザーガイド"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-519-デプロイ検証"} tabIndex={-1}>{"Skill 5.1.9 デプロイ検証"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM の更新時にも信頼性を維持するデプロイ検証システムを作る(例: 合成ユーザーワークフロー、ハルシネーション率とセマンティックドリフトの AI 特有の出力検証、応答の一貫性を確認する自動品質チェック)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" モデルやプロンプトを更新した直後に、「本番で期待どおりに動いているか」を自動で確かめる仕組みです。通常のヘルスチェック(動いているか)に加えて、"}<strong >{"答えの中身が劣化していないか"}</strong>{"も検証します。 "}</p>
{" "}
<h4 >{"検証の流れ"}</h4>
{" "}
<Diagram id="diag-10" label={"検証の流れ"} />
{" "}
<h4 >{"検証項目"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"検証項目（表26）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th><th scope="col">{"方法の例"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"合成ユーザーワークフロー"}</td><td >{"実際の利用者の操作を模した定型シナリオを本番に流す"}</td><td >{" CloudWatch Synthetics のカナリア(API を定期的に呼び出し応答を検証)、独自の Lambda "}</td></tr><tr className={"even"}><td >{"ハルシネーション率"}</td><td >{"根拠のない回答の割合"}</td><td >{"根拠文書との整合性を LLM-as-a-Judge で採点(faithfulness)"}</td></tr><tr className={"odd"}><td >{"セマンティックドリフト"}</td><td >{"回答の意味が基準からずれていないか"}</td><td >{" 基準回答と新回答の埋め込みベクトルの類似度を比較し、閾値以下で警告 "}</td></tr><tr className={"even"}><td >{"応答の一貫性"}</td><td >{"同じ質問に同じ傾向で答えるか"}</td><td >{"同一質問の複数回実行での判定ばらつき"}</td></tr><tr className={"odd"}><td >{"形式・スキーマ"}</td><td >{"JSON などの構造が壊れていないか"}</td><td >{"JSON スキーマ検証"}</td></tr><tr className={"even"}><td >{"運用指標"}</td><td >{"エラー率、レイテンシ、トークン使用量"}</td><td >{"CloudWatch メトリクスとアラーム"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote >{" "}<p >{" 「セマンティックドリフト」は、単語が違っても意味が同じなら問題ないため、文字列一致ではなく"}<strong >{"意味(埋め込み)の類似度"}</strong>{"で測るのがポイントです。 "}</p>{" "}</blockquote>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"デプロイ前の評価(オフライン)とデプロイ後の検証(オンライン)を両方行う。"}</strong>{" どちらか片方では不十分です。 "}</li>{" "}<li >{" "}<strong >{"ロールバック手段を先に用意する。"}</strong>{" Lambda エイリアスの切り戻し、AppConfig の機能フラグ、モデル ID の旧版固定など。 "}</li>{" "}<li >{" "}<strong >{"モデル ID は「最新」に自動追従させず明示的に固定する。"}</strong>{" 意図しない挙動変化を防ぎ、更新時に評価してから切り替えます。 "}</li>{" "}<li >{" "}<strong >{"合成ワークフローは「重要な業務シナリオ」を網羅する。"}</strong>{" 正常系だけでなく、範囲外の質問・拒否すべき質問も含めます。 "}</li>{" "}<li >{" "}<strong >{"ベースライン(基準回答・基準スコア)を保存し、更新のたびに比較する。"}</strong>{" "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「モデル更新後にハルシネーションが増えていないか自動で確認したい」→ 合成ワークフロー + faithfulness 評価 + アラーム。 "}</li>{" "}<li >{" 「回答の意味がじわじわ変化していないか検知したい」→ 埋め込み類似度によるセマンティックドリフト監視。 "}</li>{" "}<li >{" 「問題が出たらすぐ元に戻したい」→ カナリア展開 + CloudWatch アラーム連動のロールバック。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.1.9)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html"}>{"Amazon CloudWatch Synthetics(カナリア)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html"}>{"AWS Lambda エイリアス(加重ルーティング)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GenAI-observability.html"}>{"Amazon CloudWatch 生成AIオブザーバビリティ"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}</section>;}
