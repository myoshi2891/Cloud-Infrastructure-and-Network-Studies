import { Diagram } from '../Diagram';
/** 原本のtask1区分を全文・順序どおり保持する。 */
export default function Task31() { return <div data-part="task1"><h2 id="task-3-1" tabIndex={-1}>{"Task 3.1 入出力の安全対策"}</h2>
{" "}
<h2 id="step-2" tabIndex={-1}>{"Step 2. Amazon Bedrock Guardrails の基礎"}</h2>
{" "}
<p>{" Task 3.1 の中心サービスです。ここを理解すると Skill 3.1.1〜3.1.5 の大半が解けます。 "}</p>
{" "}
<h3 id="sec-2-1" tabIndex={-1}>{"2-1. Guardrails とは"}</h3>
{" "}
<p>{" アプリの要件と責任ある AI ポリシーに合わせ、"}<strong>{"プロンプトとモデル応答の両方"}</strong>{"にセーフガードを適用する機能です。 "}</p>
{" "}
<h3 id="sec-2-2" tabIndex={-1}>{"2-2. 6 つのポリシー（セーフガード）"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"ポリシー"}</th><th scope="col">{"何をするか"}</th><th scope="col">{"入力"}</th><th scope="col">{"出力"}</th><th scope="col">{"初学者向けのたとえ"}</th></tr></thead><tbody><tr className="odd"><td>{"Content filters"}</td><td>{"有害なテキスト・画像を検出しフィルタ"}</td><td>{"○"}</td><td>{"○"}</td><td>{"暴言・暴力表現の検問所"}</td></tr><tr className="even"><td>{"Denied topics"}</td><td>{"アプリの目的に合わない話題を拒否"}</td><td>{"○"}</td><td>{"○"}</td><td>{"「医療診断の話は禁止」という看板"}</td></tr><tr className="odd"><td>{"Word filters"}</td><td>{"特定の語句・不適切語を完全一致で遮断"}</td><td>{"○"}</td><td>{"○"}</td><td>{"NG ワード辞書"}</td></tr><tr className="even"><td>{"Sensitive information filters"}</td><td>{" PII や正規表現で定義した情報をブロックまたはマスク（ツール定義・"}<code>{"toolUse.input"}</code>{"・"}<code>{"toolResult"}</code>{" は検査もマスクもしない。ツール引数は実行前に、ツール結果はモデルへ返す前に、アプリ側で別途検査・マスクする） "}</td><td>{"○"}</td><td>{"○"}</td><td>{"個人情報の黒塗り係"}</td></tr><tr className="odd"><td>{"Contextual grounding check"}</td><td>{" 根拠資料との整合性と質問への関連性でハルシネーションを検出（対応言語は英語・フランス語・スペイン語のみ。日本語の回答は埋め込みによる意味的類似度の検証や LLM-as-a-judge で代替する） "}</td><td>{"-"}</td><td>{"○"}</td><td>{"「その答え、資料に書いてある？」と確認する係"}</td></tr><tr className="even"><td>{"Automated Reasoning checks"}</td><td>{" 論理ルールに対して回答の正確性を検証（対応言語は英語（米国）のみ。日本語の回答は検証できない。Converse では "}<code>{"guardContent"}</code>{"、InvokeModel では "}<code>{"tagSuffix"}</code>{" 付きの XML タグで検証対象を囲む。タグなしの plain text はエラーにならず、評価対象なしとしてチェックがスキップされる） "}</td><td>{"-"}</td><td>{"○"}</td><td>{"論理的な校閲者"}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" Prompt Attack（プロンプト攻撃検出）は "}<strong>{"Content filters の一種"}</strong>{"として設定します（"}<code>{"contentPolicyConfig"}</code>{" 内）。"}<strong>{"入力側のみ"}</strong>{"が対象です。 "}</p>
{" "}
<h3 id="sec-2-3" tabIndex={-1}>{"2-3. 重要な設定ポイント"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"フィルター強度"}</td><td>{"Content filters は強度（なし／低／中／高）を調整できる"}</td></tr><tr className="even"><td>{"動作"}</td><td>{" ポリシーごとにブロック（拒否メッセージを返す）を選べ、機密情報フィルターは "}<strong>{"マスク（匿名化）"}</strong>{" も選べる。ただし検出が常にブロックになるわけではなく、アクションを "}<strong>{"NONE"}</strong>{" にすると検出結果を返すだけでブロックしない。Automated Reasoning checks も検証結果（findings）を返すだけで自動ブロックはしない。こうした検出結果をどう扱うか（再生成・警告表示・人手確認など）はアプリケーション側で実装する "}</td></tr><tr className="odd"><td>{"入力タグ"}</td><td>{" "}<code>{"InvokeModel"}</code>{" / "}<code>{"InvokeModelWithResponseStream"}</code>{" で Prompt Attack を使う場合、"}<strong>{"ユーザー入力部分をタグで囲む"}</strong>{"必要がある。これにより開発者のシステムプロンプトが誤検出されない "}</td></tr><tr className="even"><td>{"バージョン"}</td><td>{" 作業用の DRAFT と、固定された番号付きバージョンを使い分け、本番は番号付きバージョンを指定する "}</td></tr><tr className="odd"><td>{"ApplyGuardrail API"}</td><td>{" "}<strong>{"モデル呼び出しと切り離して"}</strong>{" 任意のテキストにガードレールを適用できる（Bedrock 以外のモデルの出力検証にも使える） "}</td></tr><tr className="even"><td>{"ストリーミング"}</td><td>{" 同期モード（チェック後に配信、安全だが遅延大）と非同期モード（先に配信、低遅延だがチェック前に一部が出る可能性）がある "}</td></tr><tr className="odd"><td>{"IAM での強制"}</td><td>{" IAM ポリシーに "}<code>{"bedrock:GuardrailIdentifier"}</code>{" 条件キーを入れ、"}<strong>{"指定ガードレールなしの推論呼び出しを拒否"}</strong>{"できる。対象は "}<code>{"Converse"}</code>{" / "}<code>{"ConverseStream"}</code>{" / "}<code>{"InvokeModel"}</code>{" / "}<code>{"InvokeModelWithResponseStream"}</code>{" に限られ、すべての Bedrock API に適用できるわけではない。"}<code>{"InvokeAgent"}</code>{" や "}<code>{"RetrieveAndGenerate"}</code>{" を含む構成では内部のモデル呼び出しにガードレール指定がない場合があり、AccessDenied になり得る。また、ガードレールの指定を強制しても入力全体の検査は保証されない（呼び出し側が入力タグで評価範囲を指定できるため、タグの外に置いた部分は評価から外れる） "}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-3" label="2-3. 重要な設定ポイント" />
{" "}
<h3 id="sec-2-4" tabIndex={-1}>{"2-4. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" 最初は検出のみ（detect）モードで誤検出を観察し、後からブロックへ切り替える "}</td><td>{"正常な利用を止めないため"}</td></tr><tr className="even"><td>{"2"}</td><td>{"本番は番号付きバージョンを参照する"}</td><td>{"DRAFT の変更が本番へ即影響しないように"}</td></tr><tr className="odd"><td>{"3"}</td><td>{" "}<code>{"bedrock:GuardrailIdentifier"}</code>{" 条件キーで利用を強制する（対象は Converse / ConverseStream / InvokeModel / InvokeModelWithResponseStream）。入力タグは信頼できるサーバー側コンポーネントで生成し、クライアントにタグや "}<code>{"tagSuffix"}</code>{" を指定させない。"}<code>{"tagSuffix"}</code>{" はリクエストごとに新しい予測困難な値(暗号論的乱数など)を使う "}</td><td>{" ガードレールの呼び忘れを防ぐ。ただし入力タグで評価範囲を絞れるため、これだけで迂回を完全には防げない "}</td></tr><tr className="even"><td>{"4"}</td><td>{"Prompt Attack を使う場合は必ず入力タグでユーザー入力を囲む"}</td><td>{"システムプロンプトの誤検出を避ける"}</td></tr><tr className="odd"><td>{"5"}</td><td>{" ガードレール設定は「作って終わり」にせず、本番ログで継続的に調整する "}</td><td>{"攻撃手法とデータ分類が変化するため"}</td></tr><tr className="even"><td>{"6"}</td><td>{"Guardrails だけに頼らず多層防御にする（Step 6）"}</td><td>{"単一の対策には限界がある"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-2-5" tabIndex={-1}>{"2-5. 試験の着眼点"}</h3>
{" "}
<ul>{" "}<li>{" 「"}<strong>{"モデルを問わず"}</strong>{"ガードレールを適用したい」→ "}<strong>{"ApplyGuardrail API"}</strong>{" "}</li>{" "}<li>{" 「"}<strong>{"全開発者に"}</strong>{"ガードレール利用を強制したい」→ "}<strong>{"IAM 条件キー "}<code>{"bedrock:GuardrailIdentifier"}</code></strong>{" "}</li>{" "}<li>{" 「ハルシネーション検出」→ "}<strong>{"Contextual grounding check"}</strong>{"（根拠資料と照合）／論理ルール検証なら "}<strong>{"Automated Reasoning checks"}</strong>{"（対応言語は英語（米国）のみ。日本語の回答は検証できない） "}</li>{" "}<li>{" 「PII を伏せて回答を返したい」→ "}<strong>{"Sensitive information filters のマスク"}</strong>{" "}</li>{" "}</ul>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Guardrails 概要: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a>{" "}</li>{" "}<li>{" Guardrails の仕組み: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html"}</a>{" "}</li>{" "}<li>{" Prompt Attack 検出: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html"}</a>{" "}</li>{" "}<li>{" ガードレール強制（IAM 条件キー）: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-permissions-id.html"}</a>{" "}</li>{" "}<li>{" ApplyGuardrail API: "}<a href="https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ApplyGuardrail.html">{"https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_ApplyGuardrail.html"}</a>{" "}</li>{" "}<li>{" CloudFormation（AWS::Bedrock::Guardrail）: "}<a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-guardrail.html">{"https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-guardrail.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-3" tabIndex={-1}>{"Step 3. 入力の安全対策（Skill 3.1.1）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.1.1"}</strong>{": 有害なユーザー入力から FM を守る包括的なコンテンツ安全システムを構築する（Bedrock Guardrails によるフィルタ、Step Functions と Lambda によるカスタムモデレーションワークフロー、リアルタイム検証）。 "}</p>
{" "}
<h3 id="sec-3-1" tabIndex={-1}>{"3-1. 何を守るのか"}</h3>
{" "}
<p>{" モデルに渡る前に、"}<strong>{"有害・不正・不要な入力"}</strong>{"を止めます。入力が一度モデルに入ると、モデルが誤って従う危険があるためです。 "}</p>
{" "}
<h3 id="sec-3-2" tabIndex={-1}>{"3-2. 選択肢の整理"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"要件"}</th><th scope="col">{"使うもの"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"標準的な有害表現・攻撃の遮断"}</td><td>{"Guardrails（Content filters、Denied topics、Prompt Attack）"}</td><td>{"ノーコード設定で素早く導入できる"}</td></tr><tr className="even"><td>{"社内独自ルール（例: 取引先名の含有確認、人手承認）"}</td><td>{"Step Functions + Lambda のカスタムモデレーション"}</td><td>{"条件分岐・外部システム呼び出し・人手レビューを組める"}</td></tr><tr className="odd"><td>{"即時のリアルタイム検証"}</td><td>{"API 層／Lambda の同期検証"}</td><td>{"低遅延で形式・長さ・文字種を弾く"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-3-3" tabIndex={-1}>{"3-3. カスタムモデレーションワークフロー例"}</h3>
{" "}
<Diagram id="diag-4" label="3-3. カスタムモデレーションワークフロー例" />
{" "}
<h3 id="sec-3-4" tabIndex={-1}>{"3-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" "}<strong>{"安い検証を先に"}</strong>{"（文字数・形式 → Guardrails → 高度な分類）。コストと遅延を抑える。 "}</li>{" "}<li>{" 拒否した入力は "}<strong>{"理由カテゴリ付きでログ化"}</strong>{"し、後で閾値調整に使う（個人情報は伏せて記録）。 "}</li>{" "}<li>{" 入力サイズ・トークン上限を決め、"}<strong>{"過大入力（DoS・コスト攻撃）"}</strong>{" を API 層で弾く。 "}</li>{" "}<li>{" ユーザー入力と指示文を "}<strong>{"構造的に分離"}</strong>{"（タグ・区切り）する。 "}</li>{" "}<li>{" Step Functions の Standard / Express のどちらを使うかは、人手承認など長時間待ちがあるなら Standard、短時間・大量なら Express を検討する。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-3-5" tabIndex={-1}>{"3-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「Guardrails では表現できない"}<strong>{"組織固有の承認ロジック"}</strong>{"が必要」→ "}<strong>{"Step Functions + Lambda"}</strong>{"。「ほぼ設定だけで有害入力を止めたい」→ "}<strong>{"Guardrails"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Guardrails: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a>{" "}</li>{" "}<li>{" AWS Step Functions 開発者ガイド: "}<a href="https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html">{"https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html"}</a>{" "}</li>{" "}<li>{" Amazon API Gateway 開発者ガイド: "}<a href="https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html">{"https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-4" tabIndex={-1}>{"Step 4. 出力の安全対策（Skill 3.1.2）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.1.2"}</strong>{": 有害な出力を防ぐコンテンツ安全フレームワークを作成する（Guardrails による応答フィルタ、コンテンツモデレーションと毒性検出のための専用 FM 評価、決定的な結果を得るための text-to-SQL 変換）。 "}</p>
{" "}
<h3 id="sec-4-1" tabIndex={-1}>{"4-1. 3 つの手段"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"手段"}</th><th scope="col">{"内容"}</th><th scope="col">{"タイミング"}</th></tr></thead><tbody><tr className="odd"><td>{"Guardrails の応答フィルタ"}</td><td>{"出力に Content filters / 機密情報フィルター等を適用"}</td><td>{"実行時"}</td></tr><tr className="even"><td>{"専用 FM 評価"}</td><td>{"毒性・有害性などの指標でモデルや設定を評価"}</td><td>{"リリース前・定期"}</td></tr><tr className="odd"><td>{"text-to-SQL による決定性の確保"}</td><td>{" 数値や集計を LLM に「計算」させず、SQL を生成して DB に実行させる "}</td><td>{"実行時（設計）"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-4-2" tabIndex={-1}>{"4-2. FM 評価で有害性をチェックする"}</h3>
{" "}
<p>{" Amazon Bedrock の "}<strong>{"LLM-as-a-judge"}</strong>{" 評価では、組み込み指標として Correctness、Completeness、Helpfulness、Following instructions、"}<strong>{"Harmfulness"}</strong>{"、"}<strong>{"Stereotyping"}</strong>{" などが使えます。自社データのプロンプトセットでモデルや Guardrails 設定の効果を比較できます。 "}</p>
{" "}
<h3 id="sec-4-3" tabIndex={-1}>{"4-3. text-to-SQL で「決定的な結果」を得る"}</h3>
{" "}
<p>{" LLM は同じ質問でも数値を変えてしまうことがあります。"}<strong>{"集計や正確な数値が必要な質問"}</strong>{"は、LLM に答えを直接作らせず次の流れにします。 "}</p>
{" "}
<Diagram id="diag-5" label="4-3. text-to-SQL で「決定的な結果」を得る" />
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"設計ポイント"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"生成 SQL の検証"}</td><td>{" SELECT のみ許可、対象テーブル・列の許可リスト、禁止構文のチェック "}</td></tr><tr className="even"><td>{"実行権限"}</td><td>{" "}<strong>{"読み取り専用"}</strong>{"の最小権限ロール（更新・削除は不可） "}</td></tr><tr className="odd"><td>{"結果の信頼性"}</td><td>{" 数値は DB から取得するため、同じデータなら同じ結果になる（決定的） "}</td></tr><tr className="even"><td>{"追加の安全策"}</td><td>{" スキーマ情報は必要最小限だけモデルに渡す／結果行数の上限を設ける "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-4-4" tabIndex={-1}>{"4-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 「正確な数値・集計・ID 参照」は "}<strong>{"LLM に推測させず、決定的なシステム（SQL・API）に任せる"}</strong>{"。 "}</li>{" "}<li>{" LLM が生成した SQL は "}<strong>{"信頼できない入力として扱い"}</strong>{"、実行前に必ず検証する。 "}</li>{" "}<li>{" 出力側 Guardrails と、リリース前の有害性評価を "}<strong>{"両方"}</strong>{"実施する（実行時＋事前）。 "}</li>{" "}<li>{" ブロック時のメッセージは、攻撃者にルールを教えない一般的な文面にする。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-4-5" tabIndex={-1}>{"4-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「集計結果が毎回ぶれる」→ "}<strong>{"text-to-SQL で決定的に"}</strong>{"。「出力の有害性を事前に比較したい」→ "}<strong>{"Bedrock のモデル評価（LLM-as-a-judge の Harmfulness 等）"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" モデル評価の指標: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html"}</a>{" "}</li>{" "}<li>{" Bedrock Evaluations: "}<a href="https://aws.amazon.com/bedrock/evaluations/">{"https://aws.amazon.com/bedrock/evaluations/"}</a>{" "}</li>{" "}<li>{" Guardrails: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-5" tabIndex={-1}>{"Step 5. ハルシネーション対策（Skill 3.1.3）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.1.3"}</strong>{": FM 応答のハルシネーションを減らす正確性検証システムを開発する（Bedrock Knowledge Bases による根拠付けとファクトチェック、信頼度スコアリングと意味的類似度検索による検証、JSON Schema による構造化出力の強制）。 "}</p>
{" "}
<h3 id="sec-5-1" tabIndex={-1}>{"5-1. ハルシネーションとは"}</h3>
{" "}
<p>{" 根拠のない内容を、事実のように自信ありげに生成してしまう現象です。"}<strong>{"ゼロにはできない"}</strong>{"ため、「減らす」「検知する」「見せ方で補う」を組み合わせます。 "}</p>
{" "}
<h3 id="sec-5-2" tabIndex={-1}>{"5-2. 対策マップ"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"対策"}</th><th scope="col">{"仕組み"}</th><th scope="col">{"主なサービス"}</th></tr></thead><tbody><tr className="odd"><td>{"根拠付け（Grounding）"}</td><td>{"信頼できる社内データを検索して回答の材料にする（RAG）"}</td><td>{"Bedrock Knowledge Bases"}</td></tr><tr className="even"><td>{"根拠との照合"}</td><td>{" 回答が取得文書に裏付けられているか、質問に関連しているかをスコア化（対象は要約・言い換え・通常の QA などのサポート用途に限り、会話型 QA・チャットボットは対象外。対応言語は英語・フランス語・スペイン語のみ。チャット用途や日本語の回答は下の「意味的類似度による検証」の方法で別途検証する） "}</td><td>{"Guardrails の Contextual grounding check"}</td></tr><tr className="odd"><td>{"論理ルールでの検証"}</td><td>{" ポリシー文書から作った論理ルールで回答を検証（対応言語は英語（米国）のみ。日本語の回答は検証できない。Converse では "}<code>{"guardContent"}</code>{"、InvokeModel では "}<code>{"tagSuffix"}</code>{" 付きの XML タグで囲まないと、エラーにならずスキップされる） "}</td><td>{"Guardrails の Automated Reasoning checks"}</td></tr><tr className="even"><td>{"意味的類似度による検証"}</td><td>{" 回答と根拠文のベクトルの近さを測り、低ければ警告・再生成する補助シグナル（類似度が高くても事実の裏付けにはならない）。根拠に支えられた回答として扱う前に、主張単位の整合性チェックか人によるレビューを必須にする "}</td><td>{"埋め込みモデル + ベクトル検索"}</td></tr><tr className="odd"><td>{"信頼度スコアリング"}</td><td>{"検証結果をスコア化し閾値で分岐"}</td><td>{"Lambda + CloudWatch メトリクス"}</td></tr><tr className="even"><td>{"構造化出力の強制"}</td><td>{"出力を JSON Schema に従わせ、形式を検証"}</td><td>{"ツール利用（スキーマ指定）+ Lambda でスキーマ検証"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-5-3" tabIndex={-1}>{"5-3. Contextual grounding check を理解する"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"Grounding"}</td><td>{" 回答が提示した根拠資料に "}<strong>{"裏付けられているか"}</strong>{" "}</td></tr><tr className="even"><td>{"Relevance"}</td><td>{"回答がユーザーの質問に "}<strong>{"関連しているか"}</strong></td></tr><tr className="odd"><td>{"閾値"}</td><td>{"各スコアに閾値を設定し、下回ればブロック"}</td></tr><tr className="even"><td>{"必要な入力"}</td><td>{"根拠資料（grounding source）、質問（query）、検証対象の応答"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-5-4" tabIndex={-1}>{"5-4. 検証フロー例"}</h3>
{" "}
<Diagram id="diag-6" label="5-4. 検証フロー例" />
{" "}
<h3 id="sec-5-5" tabIndex={-1}>{"5-5. 構造化出力を JSON Schema で強制する理由"}</h3>
{" "}
<p>{" 自由文は後続処理（DB 登録、API 呼び出し）で壊れやすい。"}<strong>{"スキーマで形を固定"}</strong>{"し、"}<strong>{"Lambda で検証"}</strong>{"してから使えば、形式不正や想定外フィールドによる不具合・注入を減らせます。型・必須項目・列挙値（enum）・文字数上限を定義します。 "}</p>
{" "}
<h3 id="sec-5-6" tabIndex={-1}>{"5-6. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 回答には "}<strong>{"必ず引用元（出典）を付ける"}</strong>{"（Step 15 の透明性にも直結）。 "}</li>{" "}<li>{" 根拠が見つからないときは "}<strong>{"「分かりません」と答える設計"}</strong>{"にする（プロンプトとフローで明示）。 "}</li>{" "}<li>{" スコア閾値は "}<strong>{"本番に近いデータで調整"}</strong>{"する。厳しすぎると有用な回答まで落ちる。 "}</li>{" "}<li>{" 重要判断（医療・法務・金融）は "}<strong>{"人手確認"}</strong>{"を挟む。 "}</li>{" "}<li>{" 検証失敗の件数を CloudWatch メトリクスにして、品質劣化を早期検知する。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-5-7" tabIndex={-1}>{"5-7. 試験の着眼点"}</h3>
{" "}
<p>{" 「回答が取得文書に基づいているか自動検証したい」→ "}<strong>{"Contextual grounding check"}</strong>{"。「社内規則（論理ルール）に照らして検証」→ "}<strong>{"Automated Reasoning checks"}</strong>{"（対応言語は英語（米国）のみ。日本語の回答は検証できない）。「下流システムが形式に依存」→ "}<strong>{"JSON Schema"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Contextual grounding check: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-contextual-grounding-check.html"}</a>{" "}</li>{" "}<li>{" Automated Reasoning checks: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-automated-reasoning-checks.html"}</a>{" "}</li>{" "}<li>{" Knowledge Bases: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"}</a>{" "}</li>{" "}<li>{" Guardrails 概要（6 ポリシー一覧）: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-6" tabIndex={-1}>{"Step 6. 多層防御（Skill 3.1.4）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.1.4"}</strong>{": FM の悪用に対する包括的な保護を提供する多層防御システムを作成する（Amazon Comprehend による前処理フィルター、Bedrock によるモデルベースのガードレール、Lambda による後処理検証、API Gateway による API 応答フィルタリング）。 "}</p>
{" "}
<h3 id="sec-6-1" tabIndex={-1}>{"6-1. 考え方"}</h3>
{" "}
<p>{" "}<strong>{"1 つの壁が破られても次の壁が止める"}</strong>{"。入口から出口まで、役割の違うチェックを重ねます。 "}</p>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"層"}</th><th scope="col">{"役割"}</th><th scope="col">{"サービス例"}</th></tr></thead><tbody><tr className="odd"><td>{"1. 入口（API 層）"}</td><td>{"認証・スロットリング・サイズ制限・スキーマ検証"}</td><td>{"API Gateway（+ WAF 等）"}</td></tr><tr className="even"><td>{"2. 前処理"}</td><td>{"毒性・プロンプト安全性・PII の事前判定"}</td><td>{" Amazon Comprehend（毒性・プロンプト安全性は英語のみ。日本語や新規顧客は Bedrock Guardrails） "}</td></tr><tr className="odd"><td>{"3. モデルベース保護"}</td><td>{"有害・攻撃・話題逸脱・機密の遮断"}</td><td>{"Bedrock Guardrails"}</td></tr><tr className="even"><td>{"4. 後処理検証"}</td><td>{"ビジネスルール、形式、禁止語、数値範囲の最終確認"}</td><td>{"Lambda"}</td></tr><tr className="odd"><td>{"5. 出口（API 応答）"}</td><td>{"応答の整形・不要フィールド除去・ヘッダ制御"}</td><td>{"API Gateway 応答処理"}</td></tr><tr className="even"><td>{"6. 監視"}</td><td>{"全層のログとアラート"}</td><td>{"CloudWatch / CloudTrail"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-7" label="6-1. 考え方" />
{" "}
<h3 id="sec-6-2" tabIndex={-1}>{"6-2. Amazon Comprehend の役割"}</h3>
{" "}
<p>{" Comprehend は "}<strong>{"従来型の NLP サービス"}</strong>{"で、前処理に向きます。PII 検出、"}<strong>{"毒性検出"}</strong>{"、"}<strong>{"プロンプト安全性の分類"}</strong>{"などが使えます。LLM を呼ぶ前に "}<strong>{"安価・高速"}</strong>{"に一次判定できるのが利点です。 "}</p>
{" "}
<p>{" "}<strong>{"注意"}</strong>{": 毒性検出とプロンプト安全性の分類は "}<strong>{"英語のみ"}</strong>{"対応です。また、プロンプト安全性の分類は "}<strong>{"新規顧客には提供されていません"}</strong>{"（過去 12 か月以内に利用した既存アカウントは継続利用可）。日本語プロンプトや新規顧客の場合は、"}<strong>{"Bedrock Guardrails"}</strong>{"（コンテンツフィルター・Prompt Attack 検出）で代替します。ただし日本語の Content filters / Prompt Attack は "}<strong>{"Standard tier が必要"}</strong>{"です（Classic tier は英語・フランス語・スペイン語のみ）。Standard tier は "}<strong>{"クロスリージョン推論を必要とする"}</strong>{"ため、単一リージョン内での処理が求められる環境ではこの代替策を適用できません。利用する場合は、許可された送信先リージョンに適合する "}<strong>{"guardrail profile"}</strong>{" を選択してください。"}<br  />{" 出典: Amazon Comprehend Trust and safety "}<a href="https://docs.aws.amazon.com/comprehend/latest/dg/trust-safety.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/trust-safety.html"}</a>{" "}</p>
{" "}
<h3 id="sec-6-3" tabIndex={-1}>{"6-3. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 各層は "}<strong>{"異なる検知手法"}</strong>{"にする（ルール／分類器／LLM ベース）。同じ弱点を共有しないため。 "}</li>{" "}<li>{" 後処理（Lambda）は "}<strong>{"ビジネス固有のルール"}</strong>{"を担当し、Guardrails と役割を重複させすぎない。 "}</li>{" "}<li>{" "}<strong>{"フェイルクローズ"}</strong>{"（検証系が失敗したら通さない）を基本にする。 "}</li>{" "}<li>{" 全層の判定結果を "}<strong>{"相関 ID"}</strong>{" で追跡できるようにログに残す。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-6-4" tabIndex={-1}>{"6-4. 試験の着眼点"}</h3>
{" "}
<p>{" 「Guardrails だけで十分か？」→ 試験では "}<strong>{"多層（前処理＋Guardrails＋後処理＋API 応答）"}</strong>{" が正解になりやすい。「モデル呼び出し前に安価に有害・PII 判定」→ "}<strong>{"Comprehend"}</strong>{"（英語の場合。日本語・新規顧客のプロンプト安全性判定は "}<strong>{"Bedrock Guardrails"}</strong>{"）。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Amazon Comprehend 開発者ガイド（PII）: "}<a href="https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/how-pii.html"}</a>{" "}</li>{" "}<li>{" Amazon Comprehend 開発者ガイド（トップ）: "}<a href="https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html"}</a>{" "}</li>{" "}<li>{" AWS Prescriptive Guidance（生成AI推論のセキュリティ参照アーキテクチャ）: "}<a href="https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/gen-ai-model-inference.html">{"https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/gen-ai-model-inference.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-7" tabIndex={-1}>{"Step 7. 高度な脅威検知（Skill 3.1.5）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.1.5"}</strong>{": 敵対的入力とセキュリティ脆弱性から保護する高度な脅威検知を実装する（Prompt Injection・Jailbreak 検出、入力サニタイズとコンテンツフィルター、安全分類器、自動化された敵対的テストワークフロー）。 "}</p>
{" "}
<h3 id="sec-7-1" tabIndex={-1}>{"7-1. 脅威と対策の対応表"}</h3>
{" "}
<div className="table-scroll">{" "}<table><thead><tr className="header"><th scope="col">{"脅威"}</th><th scope="col">{"検知・防御"}</th><th scope="col">{"補足"}</th></tr></thead><tbody><tr className="odd"><td>{"Prompt Injection"}</td><td>{"Guardrails の Prompt Attack フィルター"}</td><td>{"入力タグでユーザー入力を明示"}</td></tr><tr className="even"><td>{"Jailbreak"}</td><td>{"同上 + 安全分類器"}</td><td>{"役割演技・エンコード回避なども想定"}</td></tr><tr className="odd"><td>{"システムプロンプト漏えい"}</td><td>{" Prompt Attack の検出（PROMPT_LEAKAGE 検出は "}<strong>{"Standard tier が必須"}</strong>{"で、Classic tier では利用不可）+ 出力側チェック "}</td><td>{"機密を "}<strong>{"プロンプトに埋めない"}</strong>{" のが根本策"}</td></tr><tr className="even"><td>{"間接 Injection"}</td><td>{"取得文書にも同じ検証"}</td><td>{"取得元の許可リスト、信頼レベルの区別"}</td></tr><tr className="odd"><td>{"入力サニタイズ"}</td><td>{"制御文字・過大入力・特殊エンコードの除去／正規化"}</td><td>{"Lambda / API 層"}</td></tr><tr className="even"><td>{"安全分類器"}</td><td>{" Comprehend のプロンプト安全性分類（英語のみ・新規顧客は利用不可）、Bedrock Guardrails の Prompt Attack 検出、独自の分類モデル "}</td><td>{"前処理として配置"}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" "}<strong>{"補足（新しい API）"}</strong>{": 本ガイド作成時点の情報として、Bedrock Runtime に "}<code>{"InvokeGuardrailChecks"}</code>{" という API が追加されており、ガードレールを事前作成せずにコンテンツフィルター・Prompt Attack・機密情報の検査を呼び出せるとされています（Prompt Attack のカテゴリに JAILBREAK / PROMPT_INJECTION / PROMPT_LEAKAGE）。試験ガイドには名指しされていませんが、今後の更新で触れられる可能性があるため、公式 API リファレンスで最新仕様を確認してください。 "}</p>
{" "}
<h3 id="sec-7-2" tabIndex={-1}>{"7-2. 自動化された敵対的テスト"}</h3>
{" "}
<p>{" 攻撃を "}<strong>{"人が思いつく範囲"}</strong>{" だけでテストすると漏れます。CI/CD に組み込み、継続的に攻撃シナリオを流します。 "}</p>
{" "}
<Diagram id="diag-8" label="7-2. 自動化された敵対的テスト" />
{" "}
<h3 id="sec-7-3" tabIndex={-1}>{"7-3. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" "}<strong>{"機密情報（鍵・内部ルール）をシステムプロンプトに入れない"}</strong>{"。入れた時点で漏えいリスクになる。 "}</li>{" "}<li>{" 取得文書・ツール出力・ユーザー入力を "}<strong>{"信頼レベルで区別"}</strong>{"し、低信頼の内容を命令として解釈させない。 "}</li>{" "}<li>{" 攻撃集を "}<strong>{"定期更新"}</strong>{"し、リリースごとに回帰テストする。 "}</li>{" "}<li>{" 検出率・誤検出率を "}<strong>{"メトリクス化"}</strong>{"し、設定変更の効果を数値で確認する。 "}</li>{" "}<li>{" ガードレール設定は "}<strong>{"一度きりにせず"}</strong>{"、本番のブロックログを見て調整し続ける。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-7-4" tabIndex={-1}>{"7-4. 試験の着眼点"}</h3>
{" "}
<p>{" 「ユーザー入力にだけ適用し、システムプロンプトは誤検出させたくない」→ "}<strong>{"入力タグ"}</strong>{"。「継続的に攻撃耐性を検証」→ "}<strong>{"自動化された敵対的テストワークフロー"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Prompt Attack 検出: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-prompt-attack.html"}</a>{" "}</li>{" "}<li>{" ユーザー入力へのタグ適用: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-tagging.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-tagging.html"}</a>{" "}</li>{" "}<li>{" InvokeGuardrailChecks API: "}<a href="https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeGuardrailChecks.html">{"https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_InvokeGuardrailChecks.html"}</a>{" "}</li>{" "}<li>{" Well-Architected Agentic AI Lens（入力検証）: "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec08.html">{"https://docs.aws.amazon.com/wellarchitected/latest/agentic-ai-lens/agentsec08.html"}</a>{" "}</li>{" "}<li>{" OWASP Top 10 for LLM Applications: "}<a href="https://genai.owasp.org/llm-top-10/">{"https://genai.owasp.org/llm-top-10/"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}</div>; }
