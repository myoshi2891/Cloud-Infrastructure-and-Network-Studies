import { Diagram } from '../Diagram';
/** 原本のtask11区分を全文保持する。 */
export default function Task11() { return <div className="guide-part" data-part="task11"><h2 id="3-task-11-要件分析と-genai-ソリューション設計" tabIndex={-1}>{"3. Task 1.1 要件分析と GenAI ソリューション設計"}</h2>

<p><strong>{"Task の目的"}</strong>{": いきなり実装せず、ビジネス要件と技術制約を整理し、小さく検証してから本番に広げる。"}</p>

<h3 id="設計の全体フロー" tabIndex={-1}>{"設計の全体フロー"}</h3>

<Diagram id="diag-2" label="設計の全体フローの図解" />

<h3 id="skill-111-ビジネス要件に合うアーキテクチャ設計" tabIndex={-1}>{"Skill 1.1.1 ビジネス要件に合うアーキテクチャ設計"}</h3>

<p><strong>{"何をするか"}</strong>{": 業務ニーズと技術制約から、FM、連携パターン、デプロイ方式を選ぶ。"}</p>

<p><strong>{"考える順番(ステップ)"}</strong></p>

<ol><li><strong>{"目的を一文で書く"}</strong>{"(例: 社内規程の問い合わせ対応時間を半減する)"}</li><li><strong>{"入出力を決める"}</strong>{"(テキストだけか、画像や音声も含むか、出力は自由文か JSON か)"}</li><li><strong>{"非機能要件を洗い出す"}</strong>{"(応答時間、同時利用数、可用性、データの置き場所、監査要件)"}</li><li><strong>{"GenAI のパターンを選ぶ"}</strong>{"(下表)"}</li><li><strong>{"FM、連携方式、デプロイ方式を選ぶ"}</strong></li></ol>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"要件の傾向"}</th><th scope="col">{"適したパターン"}</th><th scope="col">{"主なサービス"}</th></tr></thead><tbody><tr className="odd"><td>{"自社データに基づく回答"}</td><td>{"RAG"}</td><td>{"Bedrock Knowledge Bases、OpenSearch"}</td></tr><tr className="even"><td>{"手順を踏む業務の自動化"}</td><td>{"エージェント"}</td><td>{"Bedrock Agents、Step Functions"}</td></tr><tr className="odd"><td>{"決まった形式への変換や要約"}</td><td>{"プロンプトのみ"}</td><td>{"Bedrock、Prompt Management"}</td></tr><tr className="even"><td>{"特定ドメインの口調や専門用語への適応"}</td><td>{"カスタマイズ(ファインチューニング)"}</td><td>{"Bedrock、SageMaker AI"}</td></tr><tr className="odd"><td>{"同期の対話応答"}</td><td>{"API Gateway と Lambda の同期呼び出し"}</td><td>{"API Gateway、Lambda"}</td></tr><tr className="even"><td>{"大量文書の夜間処理"}</td><td>{"非同期、バッチ処理"}</td><td>{"Step Functions、バッチ推論"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul><li>{"まず"}<strong>{"プロンプトと RAG"}</strong>{" で解決できないか検討し、それでも足りない場合にだけカスタマイズへ進む(コストと運用負荷が段違いのため)"}</li><li>{"データの所在地や機密度の要件を、"}<strong>{"モデル選定より前"}</strong>{"に確認する"}</li><li>{"同期で足りるか、非同期にすべきかを、遅延要件から決める"}</li></ul></div></div>

<p>{"出典: AWS Well-Architected Framework Generative AI Lens "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html">{"https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html"}</a></p>

<h3 id="skill-112-poc-による実現性の検証" tabIndex={-1}>{"Skill 1.1.2 PoC による実現性の検証"}</h3>

<p><strong>{"何をするか"}</strong>{": 本格開発の前に、小さな実装で「できるか、速いか、価値があるか」を確かめる。"}</p>

<p><strong>{"ステップ"}</strong></p>

<ol><li>{"代表的な質問や入力を "}<strong>{"20 から 50 件程度"}</strong>{"集める(評価データセット)"}</li><li>{"Bedrock のプレイグラウンドや SDK で、候補モデルに同じ入力を流す"}</li><li>{"品質、遅延、1 リクエストあたりのコストを記録する"}</li><li>{"成功基準(例: 正答率 85% 以上)を満たすか判定する"}</li></ol>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"PoC で測る観点"}</th><th scope="col">{"見る指標の例"}</th></tr></thead><tbody><tr className="odd"><td>{"品質"}</td><td>{"正確さ、根拠の妥当性、幻覚(誤情報)の頻度"}</td></tr><tr className="even"><td>{"性能"}</td><td>{"応答時間、最初のトークンまでの時間、スループット"}</td></tr><tr className="odd"><td>{"コスト"}</td><td>{"入力と出力トークン数あたりの料金、1 件あたりの総費用"}</td></tr><tr className="even"><td>{"業務価値"}</td><td>{"工数削減、一次回答率、ユーザー満足度"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul><li>{"PoC でも"}<strong>{"評価データセットを固定"}</strong>{"し、モデルやプロンプト変更の前後を比べられるようにする"}</li><li>{"PoC のコードを"}<strong>{"そのまま本番に流用しない"}</strong>{"前提で、学びを設計に反映する"}</li><li>{"失敗条件(撤退基準)も最初に決めておく"}</li></ul></div></div>

<p>{"出典: Amazon Bedrock ユーザーガイド "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-bedrock.html"}</a></p>

<h3 id="skill-113-標準化された技術コンポーネント" tabIndex={-1}>{"Skill 1.1.3 標準化された技術コンポーネント"}</h3>

<p><strong>{"何をするか"}</strong>{": 複数のアプリやチームで同じ品質を再現できるよう、共通部品とレビュー基準を作る。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"標準化の対象"}</th><th scope="col">{"具体例"}</th></tr></thead><tbody><tr className="odd"><td>{"設計レビュー"}</td><td>{"Well-Architected Tool の Generative AI Lens でワークロードを評価"}</td></tr><tr className="even"><td>{"インフラ"}</td><td>{"CloudFormation、CDK のテンプレートで Bedrock、IAM、ログ設定をひな形化"}</td></tr><tr className="odd"><td>{"プロンプト"}</td><td>{"Bedrock Prompt Management のテンプレートを共有(Task 1.6)"}</td></tr><tr className="even"><td>{"呼び出し層"}</td><td>{"共通の Lambda 関数やライブラリで Bedrock 呼び出し、リトライ、ログを統一"}</td></tr><tr className="odd"><td>{"ガードレール"}</td><td>{"組織共通のガードレール設定を再利用"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul><li>{"Generative AI Lens の"}<strong>{"ベストプラクティス ID"}</strong>{"(例: GENOPS03-BP01 プロンプトテンプレート管理)で、レビュー観点を共有する"}</li><li>{"共通部品はバージョン管理し、変更はレビューを通す"}</li></ul></div></div>

<p>{"出典: Generative AI Lens GENOPS03-BP01 "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops03-bp01.html">{"https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops03-bp01.html"}</a></p>

<p>{"出典: AWS Well-Architected Tool "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html">{"https://docs.aws.amazon.com/wellarchitected/latest/userguide/intro.html"}</a></p>

<h3 id="task-11-の試験ポイント" tabIndex={-1}>{"Task 1.1 の試験ポイント"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"よく出る場面"}</th><th scope="col">{"選ぶ答えの方向"}</th></tr></thead><tbody><tr className="odd"><td>{"本番化前に実現性を確かめたい"}</td><td>{"Bedrock で PoC を作り、評価データで測る"}</td></tr><tr className="even"><td>{"複数チームで構成を揃えたい"}</td><td>{"Well-Architected の Generative AI Lens とテンプレート化"}</td></tr><tr className="odd"><td>{"自社文書で回答させたい"}</td><td>{"まず RAG。ファインチューニングは最後の選択肢"}</td></tr></tbody></table></div>

<hr />
</div>; }
