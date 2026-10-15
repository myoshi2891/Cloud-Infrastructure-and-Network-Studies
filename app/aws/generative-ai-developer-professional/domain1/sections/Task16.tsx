import { Diagram } from '../Diagram';
/** 原本のtask16区分を全文保持する。 */
export default function Task16() { return <div className="guide-part" data-part="task16"><h2 id="8-task-16-プロンプトエンジニアリングとガバナンス" tabIndex={-1}>{"8. Task 1.6 プロンプトエンジニアリングとガバナンス"}</h2>

<p><strong>{"Task の目的"}</strong>{": プロンプトを「その場の文章」ではなく、"}<strong>{"設計、管理、テストされる資産"}</strong>{"として扱う。"}</p>

<h3 id="プロンプト管理のライフサイクル" tabIndex={-1}>{"プロンプト管理のライフサイクル"}</h3>

<Diagram id="diag-16" label="プロンプト管理のライフサイクルの図解" />

<h3 id="skill-161-モデルへの指示フレームワーク振る舞いの制御" tabIndex={-1}>{"Skill 1.6.1 モデルへの指示フレームワーク(振る舞いの制御)"}</h3>

<p><strong>{"何をするか"}</strong>{": 役割、制約、出力形式を体系的に指示し、FM の振る舞いを制御する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"要素"}</th><th scope="col">{"内容"}</th><th scope="col">{"実現手段"}</th></tr></thead><tbody><tr className="odd"><td>{"役割定義(システムプロンプト)"}</td><td>{"「あなたは社内規程の案内担当です」のような役割と守るべき制約"}</td><td>{"Bedrock Prompt Management のテンプレート"}</td></tr><tr className="even"><td>{"出力形式の指定"}</td><td>{"JSON の項目、文字数、口調"}</td><td>{"テンプレートの出力形式セクション"}</td></tr><tr className="odd"><td>{"責任ある AI のルール"}</td><td>{"有害表現、機密情報、禁止トピックの制御"}</td><td><strong>{"Bedrock Guardrails"}</strong></td></tr></tbody></table></div>

<p><strong>{"Guardrails の主な機能"}</strong></p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"機能"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"コンテンツフィルター"}</td><td>{"有害なコンテンツ(暴力、ヘイトなど)の入出力を検出、遮断"}</td></tr><tr className="even"><td>{"拒否トピック"}</td><td>{"扱ってはいけない話題を定義"}</td></tr><tr className="odd"><td>{"ワードフィルター"}</td><td>{"特定の語句を禁止"}</td></tr><tr className="even"><td>{"機密情報フィルター"}</td><td>{"PII の検出、マスキング、拒否"}</td></tr><tr className="odd"><td>{"コンテキスト的な根拠確認"}</td><td>{"回答が提供された情報に基づいているかを検査し、幻覚を抑える"}</td></tr><tr className="even"><td>{"ApplyGuardrail API"}</td><td>{"FM を呼ばずに、任意のテキストへ単独でガードレールを適用"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"指示は"}<strong>{"プロンプトとガードレールの二重"}</strong>{"で守る(プロンプトだけでは破られる可能性がある)"}</li>{" "}<li>{"ガードレールは"}<strong>{"入力と出力の両方"}</strong>{"に適用する"}</li>{" "}<li>{"禁止事項は「〜しないで」だけでなく、"}<strong>{"代わりに何をするか"}</strong>{"(例: 担当窓口を案内する)も書く"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock Guardrails "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a></p>

<p>{"出典: Bedrock Prompt Management "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"}</a></p>

<h3 id="skill-162-文脈を保つ対話型システム" tabIndex={-1}>{"Skill 1.6.2 文脈を保つ対話型システム"}</h3>

<p><strong>{"何をするか"}</strong>{": 会話の履歴や意図を踏まえ、あいまいな質問には聞き返すなど、自然なやり取りを実現する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"課題"}</th><th scope="col">{"解決手段"}</th></tr></thead><tbody><tr className="odd"><td>{"会話履歴を保存したい"}</td><td>{"DynamoDB にセッション ID をキーとして履歴を保存"}</td></tr><tr className="even"><td>{"ユーザーの意図を判別したい"}</td><td>{"Amazon Comprehend や FM による意図認識"}</td></tr><tr className="odd"><td>{"情報が足りないときに聞き返したい"}</td><td>{"Step Functions で「不足項目の確認」ワークフローを構成"}</td></tr><tr className="even"><td>{"履歴が長すぎる"}</td><td>{"古い履歴の要約、重要な情報だけを保持"}</td></tr></tbody></table></div>

<Diagram id="diag-17" label="Skill 1.6.2 文脈を保つ対話型システムの図解" />

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"履歴には "}<strong>{"TTL(有効期限)"}</strong>{" を設定して、不要なデータを残さない"}</li>{" "}<li>{"会話履歴にも"}<strong>{"個人情報"}</strong>{"が含まれるため、保存期間とアクセス権限を設計する"}</li>{" "}<li>{"聞き返しは"}<strong>{"必要最小限"}</strong>{"にする(多すぎると使い勝手が落ちる)"}</li>{" "}</ul></div></div>

<p>{"出典: Amazon DynamoDB TTL "}<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html"}</a></p>

<p>{"出典: AWS Step Functions "}<a href="https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html">{"https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"}</a></p>

<h3 id="skill-163-プロンプトの管理とガバナンス" tabIndex={-1}>{"Skill 1.6.3 プロンプトの管理とガバナンス"}</h3>

<p><strong>{"何をするか"}</strong>{": プロンプトを組織の資産として、一貫性と監督のもとで管理する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"統制の目的"}</th><th scope="col">{"手段"}</th></tr></thead><tbody><tr className="odd"><td>{"再利用と一貫性"}</td><td>{"Prompt Management のパラメータ付きテンプレート(変数は二重の波括弧で記述)"}</td></tr><tr className="even"><td>{"変更管理と承認"}</td><td>{"バージョン管理と承認ワークフロー"}</td></tr><tr className="odd"><td>{"リポジトリ"}</td><td>{"S3 にテンプレートを保管(バージョニング有効化)"}</td></tr><tr className="even"><td>{"利用の追跡"}</td><td><strong>{"CloudTrail"}</strong>{" で API 操作を記録"}</td></tr><tr className="odd"><td>{"アクセスの記録"}</td><td><strong>{"CloudWatch Logs"}</strong>{" でアクセスやモデル呼び出しを記録（PII やシークレットを含むペイロードは最小化・マスクし、ログの閲覧権限と保持期間を設定する）"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"本番で使うのは"}<strong>{"固定されたバージョン"}</strong>{"のみとし、作業中の下書きとは分離する"}</li>{" "}<li>{"誰が、いつ、どのプロンプトを変更したかを"}<strong>{"追跡可能"}</strong>{"にする"}</li>{" "}<li>{"変更の"}<strong>{"承認フロー"}</strong>{"(レビュアーの承認後にバージョン発行)を設ける"}</li>{" "}<li>{"IAM で、プロンプトの"}<strong>{"編集権限と利用権限を分離"}</strong>{"する"}</li>{" "}<li>{"Generative AI Lens も、プロンプトテンプレートのバージョン管理と共有を推奨している"}</li>{" "}</ul></div></div>

<p>{"出典: GENOPS03-BP01 プロンプトテンプレート管理 "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops03-bp01.html">{"https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/genops03-bp01.html"}</a></p>

<p>{"出典: Bedrock モデル呼び出しのログ記録 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"}</a></p>

<p>{"出典: AWS CloudTrail "}<a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html">{"https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html"}</a></p>

<h3 id="skill-164-プロンプトの品質保証" tabIndex={-1}>{"Skill 1.6.4 プロンプトの品質保証"}</h3>

<p><strong>{"何をするか"}</strong>{": プロンプトを変更しても、品質が落ちない(回帰しない)ことを自動で確認する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"確認の種類"}</th><th scope="col">{"内容"}</th><th scope="col">{"手段"}</th></tr></thead><tbody><tr className="odd"><td>{"出力の検証"}</td><td>{"期待する形式(JSON の構造、必須項目、文字数)を満たすか"}</td><td>{"Lambda の検証関数"}</td></tr><tr className="even"><td>{"エッジケースのテスト"}</td><td>{"空入力、極端に長い入力、想定外の言語、攻撃的な入力"}</td><td>{"Step Functions で多数のケースを一括実行"}</td></tr><tr className="odd"><td>{"回帰テスト"}</td><td>{"変更前後で、同じテストセットの品質が維持されているか"}</td><td>{"CloudWatch のメトリクスと比較"}</td></tr></tbody></table></div>

<Diagram id="diag-18" label="Skill 1.6.4 プロンプトの品質保証の図解" />

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"テストセットは"}<strong>{"実際の失敗事例を追加し続けて"}</strong>{"育てる"}</li>{" "}<li>{"FM の出力は毎回変わり得るため、"}<strong>{"完全一致ではなく条件(形式、必須要素)で"}</strong>{"判定する"}</li>{" "}<li><strong>{"温度を低めに固定"}</strong>{"したテストを併用し、再現性を確保する"}</li>{" "}</ul></div></div>

<p>{"出典: Amazon CloudWatch "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"}</a></p>

<p>{"出典: Bedrock 評価 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/evaluation.html"}</a></p>

<h3 id="skill-165-基本を超えたプロンプトの反復改善" tabIndex={-1}>{"Skill 1.6.5 基本を超えたプロンプトの反復改善"}</h3>

<p><strong>{"何をするか"}</strong>{": 基本的な指示から一歩進め、構造化、出力形式の指定、思考の誘導、フィードバックで品質を高める。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"技法"}</th><th scope="col">{"内容"}</th><th scope="col">{"例"}</th></tr></thead><tbody><tr className="odd"><td>{"構造化された入力"}</td><td>{"指示、文脈、質問、制約をタグなどで区切る"}</td><td>{"「文脈」と「質問」を明確に分ける"}</td></tr><tr className="even"><td>{"出力形式の指定"}</td><td>{"JSON スキーマ、箇条書き、文字数を明示"}</td><td>{"「次の JSON 形式のみで出力」"}</td></tr><tr className="odd"><td>{"例示(Few-shot)"}</td><td>{"入力と望ましい出力の例を数件示す"}</td><td>{"良い回答例を 2 から 3 件添える"}</td></tr><tr className="even"><td>{"Chain-of-Thought"}</td><td>{"段階的に考えるよう促し、複雑な推論の精度を上げる"}</td><td>{"「手順を踏んで考えてから答える」"}</td></tr><tr className="odd"><td>{"フィードバックループ"}</td><td>{"利用者の評価や失敗事例を取り込み、プロンプトを継続的に改善"}</td><td>{"低評価の回答を分析して指示を修正"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li><strong>{"一度に 1 つだけ変更"}</strong>{"して効果を測る(複数同時に変えると原因が分からない)"}</li>{" "}<li>{"指示は"}<strong>{"具体的に"}</strong>{"(あいまいな表現を避け、数値や形式を明記)"}</li>{" "}<li>{"RAG では「"}<strong>{"提供した文脈だけを根拠に回答し、なければ分からないと答える"}</strong>{"」と明記して幻覚を抑える"}</li>{" "}<li>{"出力を機械処理する場合は、"}<strong>{"形式違反時の再試行"}</strong>{"を実装する"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock プロンプトエンジニアリングのガイドライン "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"}</a></p>

<p>{"出典: AWS プロンプトエンジニアリング規範ガイダンス "}<a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/introduction.html">{"https://docs.aws.amazon.com/prescriptive-guidance/latest/llm-prompt-engineering-best-practices/introduction.html"}</a></p>

<h3 id="skill-166-複雑なタスクのためのプロンプトシステム" tabIndex={-1}>{"Skill 1.6.6 複雑なタスクのためのプロンプトシステム"}</h3>

<p><strong>{"何をするか"}</strong>{": 1 つのプロンプトでは難しいタスクを、複数のプロンプトと処理の連鎖(ワークフロー)に分けて実現する。"}</p>

<p><strong>{"Amazon Bedrock Flows(旧称: Prompt Flows)"}</strong>{" は、コードをほとんど書かずに、プロンプト、条件分岐、ナレッジベース、Lambda などを線でつないでワークフローを作る機能です。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"主なノード"}</th><th scope="col">{"役割"}</th></tr></thead><tbody><tr className="odd"><td>{"Input / Output"}</td><td>{"フローの入口と出口"}</td></tr><tr className="even"><td>{"Prompt"}</td><td>{"プロンプトを実行(Prompt Management のものを再利用可能)"}</td></tr><tr className="odd"><td>{"Condition"}</td><td>{"条件に応じて処理を分岐(複数条件が真なら先に定義した条件が優先され、既定の分岐も定義できる)"}</td></tr><tr className="even"><td>{"Knowledge Base"}</td><td>{"ナレッジベースを検索"}</td></tr><tr className="odd"><td>{"Lambda"}</td><td>{"前処理や後処理などの独自ロジック"}</td></tr><tr className="even"><td>{"Agent"}</td><td>{"Bedrock エージェントを呼び出し"}</td></tr></tbody></table></div>

<Diagram id="diag-19" label="Skill 1.6.6 複雑なタスクのためのプロンプトシステムの図解" />

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li><strong>{"小さなプロンプトに分割"}</strong>{"する(1 つに詰め込むより、各ステップを単純にした方が安定する)"}</li>{" "}<li>{"共通処理(分類、要約、整形)は"}<strong>{"再利用可能な部品"}</strong>{"として Prompt Management に保存"}</li>{" "}<li><strong>{"前処理(入力の検証、正規化)と後処理(形式検査、ガードレール)"}</strong>{"をフローに組み込む"}</li>{" "}<li>{"フロー自体も"}<strong>{"バージョン管理"}</strong>{"し、エイリアスで本番を切り替える"}</li>{" "}<li>{"条件分岐に使う分類は、"}<strong>{"出力形式を厳密に指定"}</strong>{"して、分岐判定を安定させる"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock Flows のノード "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/flows-nodes.html"}</a></p>

<p>{"出典: Bedrock Flows の概要 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"}</a></p>

<h3 id="task-16-の試験ポイント" tabIndex={-1}>{"Task 1.6 の試験ポイント"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"よく出る場面"}</th><th scope="col">{"選ぶ答えの方向"}</th></tr></thead><tbody><tr className="odd"><td>{"プロンプトを組織で共有、バージョン管理したい"}</td><td>{"Bedrock Prompt Management"}</td></tr><tr className="even"><td>{"有害表現や PII を入出力で制御したい"}</td><td>{"Bedrock Guardrails"}</td></tr><tr className="odd"><td>{"プロンプトの変更履歴や利用状況を監査したい"}</td><td>{"CloudTrail と CloudWatch Logs"}</td></tr><tr className="even"><td>{"条件分岐を含む複数ステップの処理を、コードなしで作りたい"}</td><td>{"Bedrock Flows"}</td></tr><tr className="odd"><td>{"会話履歴を保存したい"}</td><td>{"DynamoDB"}</td></tr><tr className="even"><td>{"情報不足のとき聞き返したい"}</td><td>{"Step Functions の確認ワークフロー"}</td></tr><tr className="odd"><td>{"プロンプト変更の影響を自動確認したい"}</td><td>{"Lambda での出力検証と Step Functions でのテスト実行"}</td></tr></tbody></table></div>

<hr />
</div>; }
