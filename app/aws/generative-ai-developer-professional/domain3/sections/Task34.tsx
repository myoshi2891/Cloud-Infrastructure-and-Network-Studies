import { Diagram } from '../Diagram';
/** 原本のtask4区分を全文・順序どおり保持する。 */
export default function Task34() { return <div className="guide-part" data-part="task4"><h2 id="task-3-4" tabIndex={-1}>{"Task 3.4 責任ある AI の実装"}</h2>
{" "}
<h2 id="step-15" tabIndex={-1}>{"Step 15. 透明性（Skill 3.4.1）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.4.1"}</strong>{": FM 出力における透明な AI システムを開発する（ユーザー向け説明のための推論表示、CloudWatch による信頼度メトリクス収集と不確実性の定量化、出典帰属のための根拠提示、Bedrock Agent トレースによる推論トレース）。 "}</p>
{" "}
<h3 id="sec-15-1" tabIndex={-1}>{"15-1. 透明性の 4 つの形"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"15-1. 透明性の 4 つの形の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"形"}</th><th scope="col">{"内容"}</th><th scope="col">{"実装手段"}</th></tr></thead><tbody><tr className="odd"><td>{"推論の表示"}</td><td>{"なぜその回答になったかをユーザーに分かる形で示す"}</td><td>{" 回答に判断理由の要約を添える（内部の生の思考ではなく、要点を整理した説明） "}</td></tr><tr className="even"><td>{"不確実性の定量化"}</td><td>{"どのくらい自信があるかを数値で扱う"}</td><td>{" 検証スコア（grounding 等）を CloudWatch にメトリクスとして記録し、閾値で表示や分岐を変える "}</td></tr><tr className="odd"><td>{"根拠提示（出典帰属）"}</td><td>{"回答がどの資料に基づくかを示す"}</td><td>{"Knowledge Bases の引用情報、出典メタデータ"}</td></tr><tr className="even"><td>{"推論トレース"}</td><td>{"エージェントが何をしたかを追跡"}</td><td>{"Bedrock Agent のトレース"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-15-2" tabIndex={-1}>{"15-2. Bedrock Agent トレース"}</h3>
{" "}
<p>{" "}<strong>{"最新状況の注意"}</strong>{": Amazon Bedrock Agents は Amazon Bedrock Agents Classic に名称変更され、2026 年 7 月 30 日以降は新規顧客が利用を開始できません（メンテナンスモード）。本節は試験範囲として解説を残しますが、本番向けに新規実装する場合は Amazon Bedrock AgentCore の最新資料を参照してください。"}<br  />{" 出典: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/agents-classic-maintenance-mode.html"}</a>{" "}</p>
{" "}
<p>{" InvokeAgent のトレースは "}<strong>{"既定で無効"}</strong>{" です。リクエストで "}<code>{"enableTrace=true"}</code>{" を指定すると、エージェントの応答にトレースが付き、オーケストレーションの各ステップが分かります。運用で記録するには、この指定を有効にしたうえでトレースを保存します。主な要素は次のとおりです。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"15-2. Bedrock Agent トレースの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"要素"}</th><th scope="col">{"意味"}</th></tr></thead><tbody><tr className="odd"><td>{"Rationale"}</td><td>{"次の行動に関するエージェントの推論"}</td></tr><tr className="even"><td>{"InvocationInput"}</td><td>{"呼び出したアクショングループ／KB と渡した入力"}</td></tr><tr className="odd"><td>{"Observation"}</td><td>{"実行結果（ツール出力、KB 検索結果）"}</td></tr><tr className="even"><td>{"失敗時の理由"}</td><td>{"ステップが失敗した場合にその理由が返る"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-16" label="15-2. Bedrock Agent トレース" />
{" "}
<h3 id="sec-15-3" tabIndex={-1}>{"15-3. 不確実性の扱い（確信度の見せ方）"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"15-3. 不確実性の扱い（確信度の見せ方）の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"スコア状態"}</th><th scope="col">{"推奨する UI／動作"}</th></tr></thead><tbody><tr className="odd"><td>{"高"}</td><td>{"回答と出典を通常表示"}</td></tr><tr className="even"><td>{"中"}</td><td>{" 「この回答は資料で十分に確認できていません」と注意書きを付ける "}</td></tr><tr className="odd"><td>{"低"}</td><td>{"回答せず「分かりません」または人手エスカレーション"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-15-4" tabIndex={-1}>{"15-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 出典は "}<strong>{"リンク可能な形"}</strong>{"で提示し、ユーザーが原典で確認できるようにする。 "}</li>{" "}<li>{" 推論の表示は "}<strong>{"利用者に有用な要約"}</strong>{"にとどめ、機密（内部プロンプト・他者の PII）を含めない。 "}</li>{" "}<li>{" トレースは "}<code>{"enableTrace=true"}</code>{" で有効化して "}<strong>{"本番でも保存"}</strong>{"し、インシデント調査・監査に使う。ただしトレースにユーザーデータが含まれるため "}<strong>{"保存先のアクセス制御と保持期間"}</strong>{"を設計する。 "}</li>{" "}<li>{" 確信度の閾値は評価データで "}<strong>{"較正"}</strong>{"する（高く見えて間違うことがあるため過信しない）。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-15-5" tabIndex={-1}>{"15-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「エージェントがなぜその行動を選んだか追跡」→ "}<strong>{"Bedrock Agent トレース"}</strong>{"。「回答の根拠を示す」→ "}<strong>{"引用（KB のソース帰属）"}</strong>{"。「不確実性を可視化して運用」→ "}<strong>{"CloudWatch に信頼度メトリクス"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Agent トレース: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/trace-events.html"}</a>{" "}</li>{" "}<li>{" Knowledge Bases: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"}</a>{" "}</li>{" "}<li>{" AWS Well-Architected Responsible AI Lens: "}<a href="https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html">{"https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-16" tabIndex={-1}>{"Step 16. 公平性評価（Skill 3.4.2）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.4.2"}</strong>{": バイアスのない FM 出力を確保する公平性評価を適用する（アプリケーション側で公平性メトリクスを算出して CloudWatch にカスタムメトリクスとして発行、Bedrock Prompt Management と Prompt Flows による体系的な A/B テスト、LLM-as-a-judge による自動モデル評価）。 "}</p>
{" "}
<h3 id="sec-16-1" tabIndex={-1}>{"16-1. 公平性とは"}</h3>
{" "}
<p>{" 属性（性別・年齢・国籍など）が違うだけで、"}<strong>{"回答の質や内容が不当に変わらない"}</strong>{"ことです。ステレオタイプの再生産も含みます。 "}</p>
{" "}
<h3 id="sec-16-2" tabIndex={-1}>{"16-2. 3 つの手法"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"16-2. 3 つの手法の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th><th scope="col">{"サービス"}</th></tr></thead><tbody><tr className="odd"><td>{"公平性メトリクスの計測"}</td><td>{"属性別の出力差を数値化し、継続的に記録"}</td><td>{" CloudWatch（メトリクスとして収集）、Bedrock Evaluations（新規利用の代替）。SageMaker Clarify は既存顧客のみ利用可 "}</td></tr><tr className="even"><td>{"体系的な A/B テスト"}</td><td>{"プロンプトの版を切り替え、同条件で比較"}</td><td>{" Bedrock Prompt Management（版管理）、Prompt Flows（ワークフローで分岐・比較） "}</td></tr><tr className="odd"><td>{"LLM-as-a-judge"}</td><td>{"別の LLM が評価者となり、自動採点"}</td><td>{" Bedrock Evaluations（Stereotyping、Harmfulness などの組み込み指標） "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-16-3" tabIndex={-1}>{"16-3. 評価サイクル"}</h3>
{" "}
<Diagram id="diag-17" label="16-3. 評価サイクル" />
{" "}
<h3 id="sec-16-4" tabIndex={-1}>{"16-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" 評価データは "}<strong>{"属性だけを入れ替えた対（ペア）"}</strong>{"で作り、差を直接比較する。 "}</li>{" "}<li>{" "}<strong>{"評価者モデル自体にもバイアスがある"}</strong>{"ため、人手の抜き取り確認を併用する。 "}</li>{" "}<li>{" 公平性は "}<strong>{"リリース前だけでなく継続計測"}</strong>{"する（Step 14 のバイアスドリフト）。 "}</li>{" "}<li>{" プロンプト変更は "}<strong>{"バージョン管理して比較可能"}</strong>{"にする（Prompt Management の版）。 "}</li>{" "}<li>{" 「どの属性・どの指標を重視するか」を "}<strong>{"利用文脈で決めて文書化"}</strong>{"（モデルカードに記載）。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-16-5" tabIndex={-1}>{"16-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「プロンプトの 2 案を体系的に比較」→ "}<strong>{"Prompt Management + Prompt Flows の A/B テスト"}</strong>{"。「大量の出力を自動で偏り評価」→ "}<strong>{"LLM-as-a-judge"}</strong>{"。「継続的に公平性を監視」→ "}<strong>{"CloudWatch に公平性メトリクス"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" モデル評価の指標（Stereotyping 等）: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/model-evaluation-metrics.html"}</a>{" "}</li>{" "}<li>{" Bedrock Evaluations: "}<a href="https://aws.amazon.com/bedrock/evaluations/">{"https://aws.amazon.com/bedrock/evaluations/"}</a>{" "}</li>{" "}<li>{" Prompt Management: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"}</a>{" "}</li>{" "}<li>{" Prompt Flows: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/flows.html"}</a>{" "}</li>{" "}<li>{" SageMaker Clarify（既存顧客のみ）: "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-fairness-and-explainability.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-fairness-and-explainability.html"}</a>{" "}</li>{" "}<li>{" Clarify の提供状況と代替手段: "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-availability-change.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-17" tabIndex={-1}>{"Step 17. ポリシー準拠 AI（Skill 3.4.3）"}</h2>
{" "}
<p>{" "}<strong>{"Skill 3.4.3"}</strong>{": 責任ある AI の実践への準拠を確保するポリシー準拠 AI システムを開発する（ポリシー要件に基づく Guardrails、FM の制限を文書化するモデルカード、自動コンプライアンスチェックを行う Lambda 関数）。 "}</p>
{" "}
<h3 id="sec-17-1" tabIndex={-1}>{"17-1. 「ポリシー → 実装 → 証明」の対応"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"17-1. 「ポリシー → 実装 → 証明」の対応の表"}>{" "}<table><thead><tr className="header"><th scope="col">{"ポリシー要件の例"}</th><th scope="col">{"実装"}</th><th scope="col">{"証明"}</th></tr></thead><tbody><tr className="odd"><td>{"医療診断・投資助言をしない"}</td><td>{"Guardrails の Denied topics"}</td><td>{"ガードレールのバージョンとテスト結果"}</td></tr><tr className="even"><td>{"個人情報を出力しない"}</td><td>{"機密情報フィルター"}</td><td>{"ブロック／マスクのログ"}</td></tr><tr className="odd"><td>{"差別的表現を出さない"}</td><td>{"Content filters"}</td><td>{"Harmfulness／Stereotyping 評価結果"}</td></tr><tr className="even"><td>{"回答に免責文を必ず付ける"}</td><td>{"Lambda 後処理"}</td><td>{"自動チェックのログ"}</td></tr><tr className="odd"><td>{"モデルの制限・用途を明示"}</td><td>{"モデルカード"}</td><td>{"カードの版履歴"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="sec-17-2" tabIndex={-1}>{"17-2. 自動コンプライアンスチェックの流れ"}</h3>
{" "}
<Diagram id="diag-18" label="17-2. 自動コンプライアンスチェックの流れ" />
{" "}
<h3 id="sec-17-3" tabIndex={-1}>{"17-3. モデルカードに書く「制限」の例"}</h3>
{" "}
<ul>{" "}<li>{"想定していない言語・領域での精度低下"}</li>{" "}<li>{"最新情報を持たない（知識の更新時期）"}</li>{" "}<li>{"ハルシネーションの可能性と、必須の人手確認範囲"}</li>{" "}<li>{"評価で確認できた偏りの傾向と緩和策"}</li>{" "}</ul>
{" "}
<h3 id="sec-17-4" tabIndex={-1}>{"17-4. ベストプラクティス"}</h3>
{" "}
<div className="callout-practice">{" "}<div className="icon">{"✓"}</div>{" "}<div className="body">{" "}<ul>{" "}<li>{" ポリシー文言を "}<strong>{"そのまま Guardrails の設定に落とし込み"}</strong>{"、設定とポリシーの対応表を維持する。 "}</li>{" "}<li>{" "}<strong>{"テストケースを資産化"}</strong>{"（ポリシーごとの合格／不合格例）し、変更のたびに回帰テストする。 "}</li>{" "}<li>{" コンプライアンスチェック Lambda は "}<strong>{"フェイルクローズ"}</strong>{"にする。 "}</li>{" "}<li>{" ガードレール変更を "}<strong>{"IaC（CloudFormation 等）でコード管理"}</strong>{"し、レビュー・履歴を残す。 "}</li>{" "}</ul>{" "}</div>{" "}</div>
{" "}
<h3 id="sec-17-5" tabIndex={-1}>{"17-5. 試験の着眼点"}</h3>
{" "}
<p>{" 「ポリシー要件を自動的に技術へ反映」→ "}<strong>{"Guardrails"}</strong>{"。「FM の限界を利用者・監査者へ伝える」→ "}<strong>{"モデルカード"}</strong>{"。「出力が基準を満たすか自動検証」→ "}<strong>{"Lambda"}</strong>{"。 "}</p>
{" "}
<p><strong>{"参考 URL"}</strong></p>
{" "}
<ul>{" "}<li>{" Guardrails: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails.html"}</a>{" "}</li>{" "}<li>{" Denied topics: "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-denied-topics.html"}</a>{" "}</li>{" "}<li>{" SageMaker モデルカード: "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/model-cards.html"}</a>{" "}</li>{" "}<li>{" CloudFormation（Guardrail）: "}<a href="https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-guardrail.html">{"https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-bedrock-guardrail.html"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h2 id="step-18" tabIndex={-1}>{"Step 18. Task 3.4 のまとめ"}</h2>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label={"Step 18. Task 3.4 のまとめの表"}>{" "}<table><thead><tr className="header"><th scope="col">{"Skill"}</th><th scope="col">{"キーワード"}</th><th scope="col">{"代表サービス・機能"}</th></tr></thead><tbody><tr className="odd"><td>{"3.4.1 透明性"}</td><td>{"説明・不確実性・出典・トレース"}</td><td>{"Agent トレース、KB 引用、CloudWatch 信頼度メトリクス"}</td></tr><tr className="even"><td>{"3.4.2 公平性"}</td><td>{"属性間の差・A/B・自動評価"}</td><td>{"Prompt Management / Flows、LLM-as-a-judge、公平性メトリクス"}</td></tr><tr className="odd"><td>{"3.4.3 ポリシー準拠"}</td><td>{"要件を技術へ・限界の文書化"}</td><td>{"Guardrails、モデルカード、Lambda チェック"}</td></tr></tbody></table>{" "}</div>
{" "}
<hr  />
{" "}</div>; }
