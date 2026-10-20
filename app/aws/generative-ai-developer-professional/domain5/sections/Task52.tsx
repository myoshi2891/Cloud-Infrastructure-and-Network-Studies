import { Diagram } from '../Diagram';
/** 原本のtask2を順序どおり保持する。 */
export default function Task52(){return <section data-part="task2" className="guide-part"><h2 id={"4-task-52-生成aiアプリをトラブルシュートする"} tabIndex={-1}>{" 4. Task 5.2 生成AIアプリをトラブルシュートする "}</h2>
{" "}
<h3 id={"40-トラブルシュートの基本方針"} tabIndex={-1}>{"4.0 トラブルシュートの基本方針"}</h3>
{" "}
<p >{" 生成AIアプリは「入力 → プロンプト → 検索 → モデル → 後処理 → 出力」と多くの部品がつながっています。"}<strong >{"どの部品の問題かを切り分ける"}</strong>{"ことが最初の仕事です。 "}</p>
{" "}
<Diagram id="diag-11" label={"4.0 トラブルシュートの基本方針"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4.0 トラブルシュートの基本方針（表27）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"症状"}</th>{" "}<th scope="col">{"最初に疑う場所"}</th>{" "}<th scope="col">{"最初に見るもの"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"ThrottlingException など API エラー"}</td>{" "}<td >{"5.2.2"}</td>{" "}<td >{"エラーコード、クォータ、リトライ設定"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"出力が途中で切れる"}</td>{" "}<td >{"5.2.1"}</td>{" "}<td >{"Converse API の stopReason、maxTokens"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"入力が長すぎるというエラー"}</td>{" "}<td >{"5.2.1"}</td>{" "}<td >{"入力トークン数、コンテキストウィンドウ"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"回答が根拠と合わない(RAG)"}</td>{" "}<td >{"5.2.4"}</td>{" "}<td >{"取得されたチャンクの内容"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"形式が崩れる、指示を無視する"}</td>{" "}<td >{"5.2.3 / 5.2.5"}</td>{" "}<td >{"プロンプト本文、スキーマ検証結果"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"以前より急に品質が落ちた"}</td>{" "}<td >{"5.2.5"}</td>{" "}<td >{"プロンプトのバージョン、モデルのバージョン、変更履歴"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<hr  />
{" "}
<h3 id={"skill-521-コンテンツ処理の問題"} tabIndex={-1}>{"Skill 5.2.1 コンテンツ処理の問題"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM とのやり取りで必要な情報が完全に処理されるようにコンテンツ処理の問題を解決する(例: コンテキストウィンドウ溢れの診断、動的チャンキング戦略、プロンプト設計の最適化、切り詰め(truncation)関連エラーの分析)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" モデルが 1 回に読める量(コンテキストウィンドウ)には上限があります。入力が多すぎると"}<strong >{"エラーになる"}</strong>{"か、"}<strong >{"一部が読まれない・出力が途中で切れる"}</strong>{"ことがあります。「必要な情報が最後まで処理されているか」を確認し直す作業です。 "}</p>
{" "}
<h4 >{"用語"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"用語（表28）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"用語"}</th>{" "}<th scope="col">{"意味"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"トークン"}</td>{" "}<td >{" モデルが文章を処理する最小単位。日本語は文字数より多くのトークンになる場合がある "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"コンテキストウィンドウ"}</td>{" "}<td >{" 1 回の呼び出しで扱える入力+出力の上限トークン数(モデルごとに異なる) "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"maxTokens"}</td>{" "}<td >{"生成する出力の上限。小さすぎると途中で止まる"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"stopReason"}</td>{" "}<td >{"生成が止まった理由。Converse API の応答で確認できる"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<p >{" Converse API の "}<code >{"stopReason"}</code>{" には "}<code >{"end_turn"}</code>{"(正常終了)、"}<code >{"tool_use"}</code>{"、"}<code >{"max_tokens"}</code>{"、"}<code >{"stop_sequence"}</code>{"、"}<code >{"guardrail_intervened"}</code>{"、"}<code >{"content_filtered"}</code>{" などがあります。"}<code >{"max_tokens"}</code>{" は、生成が maxTokens の指定、またはモデルが扱える最大トークン数を超えて止まったことを示します。 "}</p>
{" "}
<h4 >{"診断の手順"}</h4>
{" "}
<Diagram id="diag-12" label={"診断の手順"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"診断の手順（表29）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"症状"}</th>{" "}<th scope="col">{"原因"}</th>{" "}<th scope="col">{"対処"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"回答が文の途中で終わる"}</td>{" "}<td >{"出力が maxTokens に到達(stopReason = max_tokens)"}</td>{" "}<td >{"maxTokens を引き上げる、出力を簡潔にする指示、複数回に分割"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"入力の検証エラー"}</td>{" "}<td >{"入力が上限超過、またはパラメータ不正"}</td>{" "}<td >{"トークン数を事前計測し、上限内に収める"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"長い文書の一部しか反映されない"}</td>{" "}<td >{"入力過多・重要情報が中間に埋もれる"}</td>{" "}<td >{"重要部分を先頭か末尾に置く、検索で関連部分だけを渡す"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"会話が長くなると前の内容を忘れる"}</td>{" "}<td >{"履歴の蓄積でウィンドウを圧迫、または古い履歴の切り捨て"}</td>{" "}<td >{"履歴の要約、直近 N ターン+要約の保持"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"RAG で関連チャンクが多すぎる"}</td>{" "}<td >{"取得件数・チャンクサイズが大きい"}</td>{" "}<td >{"件数削減、リランカーで上位だけ渡す、チャンクサイズ見直し"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"動的チャンキング戦略"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"動的チャンキング戦略（表30）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"戦略"}</th>{" "}<th scope="col">{"概要"}</th>{" "}<th scope="col">{"向く場面"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"固定長"}</td>{" "}<td >{"一定のサイズで分割"}</td>{" "}<td >{"構造が単純な文書"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"階層型"}</td>{" "}<td >{"親(大きい)と子(小さい)で分割し、検索は子、文脈は親で補う"}</td>{" "}<td >{"長い構造化文書"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"セマンティック"}</td>{" "}<td >{"意味のまとまりで分割"}</td>{" "}<td >{"明確な区切りがない文書(契約書・技術マニュアル等)"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"入力長に応じた動的分割"}</td>{" "}<td >{" 入力が上限を超えるときに分割して順次処理(Map-Reduce 要約など) "}</td>{" "}<td >{"長文の要約・分析"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<blockquote >{" "}<p >{" 長文を扱う典型パターン: 文書を分割 → 各チャンクを並列に要約(Map)→ 要約を統合(Reduce)。AWS Step Functions の Map 状態で並列化できます。 "}</p>{" "}</blockquote>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"呼び出し前にトークン数を見積もる。"}</strong>{" 上限超過を事前に検出して、要約や分割にフォールバックします。 "}</li>{" "}<li >{" "}<strong >{"応答の stopReason を必ずログに残す。"}</strong>{" "}<code >{"max_tokens"}</code>{" を検知して再生成や警告に使います。 "}</li>{" "}<li >{" "}<strong >{"プロンプトの構成を最適化する。"}</strong>{" 重要な指示は先頭、参照情報は区切り(タグ等)で明確に分けます。 "}</li>{" "}<li >{" "}<strong >{"RAG では「取得件数 × チャンクサイズ」で入力量を設計する。"}</strong>{" "}</li>{" "}<li >{" "}<strong >{"会話履歴は全部送らない。"}</strong>{" 要約+直近のやり取りに絞ります。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{"「応答が途中で切れる」→ stopReason が max_tokens → maxTokens の調整。"}</li>{" "}<li >{" 「長文ドキュメントの要約でコンテキスト上限を超える」→ チャンク分割+Map-Reduce、または階層的要約。 "}</li>{" "}<li >{" 「入力が長すぎてエラーになる」→ 入力トークン数の事前計測と、要約・分割・件数削減。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.2.1)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html"}>{"Amazon Bedrock API Reference: Converse(stopReason の値)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/model-parameters-deepseek.html"}>{"Amazon Bedrock モデルパラメータ(max_tokens と stopReason の説明の例)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://repost.aws/knowledge-center/bedrock-knowledge-bases-accurate-results-filters"}>{"AWS re:Post: Knowledge Bases の検索結果を改善する(セマンティック / 階層チャンキング)"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-522-fm-統合apiの問題"} tabIndex={-1}>{"Skill 5.2.2 FM 統合(API)の問題"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: GenAI サービス特有の API 統合問題を特定・修正する(例: エラーログ、リクエスト検証、レスポンス分析)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" アプリから Amazon Bedrock などの API を呼ぶときに起きる"}<strong >{"エラーを読み解いて直す"}</strong>{"スキルです。まずエラーの種類で「自分の入力が悪いのか」「一時的な混雑か」「権限か」を分けます。 "}</p>
{" "}
<h4 >{"Bedrock Runtime の主なエラー"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Bedrock Runtime の主なエラー（表31）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"エラー"}</th>{" "}<th scope="col">{"HTTP"}</th>{" "}<th scope="col">{"意味"}</th>{" "}<th scope="col">{"典型的な対処"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"ValidationException"}</td>{" "}<td >{"400"}</td>{" "}<td >{" 入力が制約を満たさない(形式不正、パラメータ範囲外、入力過大など) "}</td>{" "}<td >{"リクエスト本文・パラメータ・モデル固有の形式を確認"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"AccessDeniedException"}</td>{" "}<td >{"403"}</td>{" "}<td >{"権限なし(IAM、モデルアクセス、リソースポリシー)"}</td>{" "}<td >{"IAM ポリシー、モデルへのアクセス設定、SCP を確認"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"ResourceNotFoundException"}</td>{" "}<td >{"404"}</td>{" "}<td >{"モデル ID・リソースが存在しない"}</td>{" "}<td >{"モデル ID、リージョン、推論プロファイルの指定を確認"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"ModelTimeoutException"}</td>{" "}<td >{"408"}</td>{" "}<td >{"モデル処理がタイムアウト"}</td>{" "}<td >{" 入力・出力を短くする、クライアントのタイムアウト設定を見直す "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"ModelErrorException"}</td>{" "}<td >{"424"}</td>{" "}<td >{"モデル処理中にエラー"}</td>{" "}<td >{"リトライ、入力の見直し"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"ThrottlingException"}</td>{" "}<td >{"429"}</td>{" "}<td >{"アカウントのクォータ超過"}</td>{" "}<td >{" リトライ(指数バックオフ+ジッター)、クォータ引き上げ、リージョン分散 "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"InternalServerException"}</td>{" "}<td >{"500"}</td>{" "}<td >{"サービス内部エラー"}</td>{" "}<td >{"リトライ、継続する場合はサポートへ"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"ServiceUnavailableException"}</td>{" "}<td >{"503"}</td>{" "}<td >{"サービスが一時的に利用不可"}</td>{" "}<td >{"リトライ、フォールバックモデル"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<blockquote >{" "}<p >{" Bedrock のユーザーガイドにエラーコード別のトラブルシュートページがあります(下記 URL)。試験前に一度目を通してください。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"切り分けの流れ"}</h4>
{" "}
<Diagram id="diag-13" label={"切り分けの流れ"} />
{" "}
<h4 >{"3 つの技術: エラーログ・リクエスト検証・レスポンス分析"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"3 つの技術: エラーログ・リクエスト検証・レスポンス分析（表32）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"技術"}</th>{" "}<th scope="col">{"内容"}</th>{" "}<th scope="col">{"実装のヒント"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"エラーログ"}</td>{" "}<td >{"失敗したリクエストの文脈を残す"}</td>{" "}<td >{" リクエスト ID、モデル ID、リージョン、エラーコード、メッセージを構造化ログ(JSON)で CloudWatch Logs に出力。入力そのものは機微情報になり得るためマスキング "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"リクエスト検証"}</td>{" "}<td >{"送信前に自分で検証する"}</td>{" "}<td >{" スキーマ検証、入力トークン数の確認、InvokeModel のモデル固有 JSON と Converse の共通形式の取り違い防止 "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"レスポンス分析"}</td>{" "}<td >{"返ってきた内容を確認する"}</td>{" "}<td >{" stopReason、usage(入出力トークン数)、metrics(latencyMs)をログ化し、異常値で警告 "}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"呼び出しのトラブルを減らす設計"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"呼び出しのトラブルを減らす設計（表33）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"対策"}</th>{" "}<th scope="col">{"内容"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"リトライ戦略"}</td>{" "}<td >{" 一時的エラー(429 / 5xx / タイムアウト)のみ、指数バックオフ+ジッターで再試行。400 系(入力不正)はリトライしても直らない "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"SDK のリトライモード"}</td>{" "}<td >{"AWS SDK の標準・アダプティブなリトライ設定を利用"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"スロットリング対策"}</td>{" "}<td >{" クォータ(リクエスト数・トークン数/分)の監視、クロスリージョン推論プロファイルの活用、Provisioned Throughput、SQS などによるキューイング・平準化 "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"フォールバック"}</td>{" "}<td >{"代替モデル・縮退応答(簡易回答)への切替"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"Converse API の利用"}</td>{" "}<td >{" モデル間で共通のリクエスト形式にして、モデル固有形式の取り違いを減らす "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"監査・調査"}</td>{" "}<td >{" モデル呼び出しログ(入出力・メタデータを S3 / CloudWatch Logs へ)、CloudTrail(API 呼び出しの監査) "}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"エラーを「再試行してよいもの」と「してはいけないもの」に分類して実装する。"}</strong>{" "}</li>{" "}<li >{" "}<strong >{"リクエスト ID を発行してアプリ・API ゲートウェイ・Bedrock 呼び出しを横断して追跡できるようにする。"}</strong>{" "}</li>{" "}<li >{" "}<strong >{"クォータの使用率をメトリクスで監視し、上限に近づく前にアラームを出す。"}</strong>{" "}</li>{" "}<li >{" "}<strong >{"モデル呼び出しログは機微データを含み得る。"}</strong>{" 暗号化(KMS)、アクセス制御、保持期間を設計します。 "}</li>{" "}<li >{" "}<strong >{"タイムアウトはモデルの応答時間に合わせる。"}</strong>{" 長い生成にはストリーミング(ConverseStream)を検討します。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「ピーク時に ThrottlingException が出る」→ 指数バックオフ+ジッター、クォータ緩和申請、クロスリージョン推論、キューによる平準化。 "}</li>{" "}<li >{" 「ValidationException が出る」→ リクエスト本文・パラメータ・入力サイズの検証(リトライでは直らない)。 "}</li>{" "}<li >{" 「特定ユーザーだけ AccessDenied」→ IAM ポリシー・モデルアクセス・リソースポリシーの確認。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.2.2)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/troubleshooting-api-error-codes.html"}>{"Troubleshooting Amazon Bedrock API Error Codes(Bedrock ユーザーガイド)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/APIReference/API_runtime_Converse.html"}>{"Amazon Bedrock API Reference: Converse"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"}>{"Amazon Bedrock モデル呼び出しのログ記録"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-523-プロンプトエンジニアリングの問題"} tabIndex={-1}>{" Skill 5.2.3 プロンプトエンジニアリングの問題 "}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: 基本的なプロンプト調整を超えて、FM の応答品質と一貫性を改善するプロンプトエンジニアリングの問題をトラブルシュートする(例: プロンプトテストフレームワーク、バージョン比較、体系的な改善)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" 「プロンプトを何となく書き換えて様子を見る」状態から卒業し、"}<strong >{"テストデータで測りながら、変更点を 1 つずつ比較して改善する"}</strong>{"やり方です。 "}</p>
{" "}
<h4 >{"よくあるプロンプトの問題と対処"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"よくあるプロンプトの問題と対処（表34）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"問題"}</th>{" "}<th scope="col">{"例"}</th>{" "}<th scope="col">{"対処"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"指示が曖昧"}</td>{" "}<td >{"「簡単に説明して」で毎回長さが違う"}</td>{" "}<td >{"長さ・形式・対象読者を具体的に指定"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"形式が崩れる"}</td>{" "}<td >{"JSON に余計な文章が混ざる"}</td>{" "}<td >{"出力スキーマを明示、例(few-shot)を提示、出力検証と再試行"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"指示の無視"}</td>{" "}<td >{"長い入力で冒頭の制約が守られない"}</td>{" "}<td >{"重要な制約を末尾でも再掲、区切りタグで構造化"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"回答のぶれ"}</td>{" "}<td >{"同じ質問で毎回結論が違う"}</td>{" "}<td >{"temperature を下げる、判断基準を明記"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"ハルシネーション"}</td>{" "}<td >{"資料にない内容を断定"}</td>{" "}<td >{" 「資料にない場合は分からないと答える」と明記、根拠引用を要求、RAG と併用 "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"拒否が多すぎる/少なすぎる"}</td>{" "}<td >{"正当な質問を断る、不適切な依頼に応じる"}</td>{" "}<td >{"役割・許可範囲を明記、ガードレールと併用"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"例への過剰適合"}</td>{" "}<td >{"few-shot の例と同じ内容を返す"}</td>{" "}<td >{"例の多様化、例の数を調整"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"体系的な改善サイクル"}</h4>
{" "}
<Diagram id="diag-14" label={"体系的な改善サイクル"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"体系的な改善サイクル（表35）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"Step"}</th>{" "}<th scope="col">{"やること"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"1"}</td>{" "}<td >{" 失敗した入出力を集めて分類する(形式崩れ、事実誤り、拒否過多など) "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"2"}</td>{" "}<td >{"仮説を立て、"}<strong >{"1 回の変更は 1 点だけ"}</strong>{"にする"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"3"}</td>{" "}<td >{"プロンプトに新しいバージョンを付ける"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"4"}</td>{" "}<td >{" 同じ評価データ・同じパラメータで新旧を比較する(平均だけでなく、悪化したケースも見る) "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"5"}</td>{" "}<td >{"改善かつ副作用なしなら採用する"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"6"}</td>{" "}<td >{"失敗事例をリグレッションセットに追加する"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"関連サービス・機能"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"関連サービス・機能（表36）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"サービス・機能"}</th>{" "}<th scope="col">{"役割"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"Amazon Bedrock Prompt Management"}</td>{" "}<td >{" プロンプトを保存・バージョン管理。2 つのバージョンを選んで比較でき、JSON の差分が並べて表示される。テスト変数を埋めて実行すれば、各バージョンの出力も比較できる "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"Amazon Bedrock Evaluations"}</td>{" "}<td >{"プロンプト変更の効果を同一データセットで定量比較"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"Bedrock のプロンプト最適化機能"}</td>{" "}<td >{"プロンプトの書き換え支援(補助的に利用)"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"出力検証(スキーマ・ルール)"}</td>{" "}<td >{"形式の合否を自動判定"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"プロンプトはコードと同様にバージョン管理する。"}</strong>{" 変更理由と評価結果を紐づけます。 "}</li>{" "}<li >{" "}<strong >{"変更は 1 点ずつ。"}</strong>{" 複数同時に変えると効果の原因が不明になります。 "}</li>{" "}<li >{" "}<strong >{"平均スコアだけで判断しない。"}</strong>{" 一部の重要ケースが悪化していないかを確認します。 "}</li>{" "}<li >{" "}<strong >{"プロンプトで解決できる問題かを見極める。"}</strong>{" 事実の欠落は検索(RAG)、安全性はガードレール、能力不足はモデル変更が適切な場合があります。 "}</li>{" "}<li ><strong >{"例(few-shot)は実際の失敗事例から作る。"}</strong></li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「プロンプト変更の影響を安全に比較したい」→ Prompt Management のバージョン比較+共通評価データセットでの評価。 "}</li>{" "}<li >{" 「出力が JSON にならないことがある」→ スキーマの明示+出力検証+再試行(Skill 5.2.5 とも連動)。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.2.3)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-compare.html"}>{"Compare versions of a prompt in Prompt management - Amazon Bedrock"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html"}>{"Amazon Bedrock Prompt Management"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/bedrock/evaluations/"}>{"Amazon Bedrock Evaluations(製品ページ)"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-524-検索システムの問題"} tabIndex={-1}>{"Skill 5.2.4 検索システムの問題"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM を補強する情報検索の有効性に影響する問題を特定・解決する(例: モデル応答の関連性分析、埋め込み品質の診断、ドリフト監視、ベクトル化問題の解決、チャンキングと前処理の是正、ベクトル検索の性能最適化)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" RAG の回答が悪いとき、原因の多くは"}<strong >{"検索側"}</strong>{"にあります。「正しい文書がインデックスにあるか」「正しく分割・ベクトル化されているか」「検索設定が適切か」を順に確認します。 "}</p>
{" "}
<h4 >{"RAG パイプラインと問題が起きやすい箇所"}</h4>
{" "}
<Diagram id="diag-15" label={"RAG パイプラインと問題が起きやすい箇所"} />
{" "}
<h4 >{"症状 → 原因 → 対処"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"症状 → 原因 → 対処（表37）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"症状"}</th>{" "}<th scope="col">{"考えられる原因"}</th>{" "}<th scope="col">{"対処"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"関連文書が取れない"}</td>{" "}<td >{"文書が取り込まれていない、取り込みジョブ失敗、同期漏れ"}</td>{" "}<td >{" データソースの同期状態・取り込みジョブのエラーを確認、再同期 "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"文脈が足りない回答"}</td>{" "}<td >{"チャンクが小さすぎて意味が分断"}</td>{" "}<td >{"チャンクサイズ拡大、階層型・セマンティック、オーバーラップ"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"無関係な内容が混ざる"}</td>{" "}<td >{"チャンクが大きすぎる、取得件数が多い"}</td>{" "}<td >{"チャンク縮小、件数削減、リランカー、メタデータフィルタ"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"型番・固有名詞が検索で外れる"}</td>{" "}<td >{"意味検索だけでキーワード一致が弱い"}</td>{" "}<td >{"ハイブリッド検索"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"日本語など言語で精度が低い"}</td>{" "}<td >{"埋め込みモデルがその言語に弱い"}</td>{" "}<td >{"多言語対応の埋め込みモデルへ変更 → 全文書を再インデックス"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"質問と文書で結果が極端に悪い"}</td>{" "}<td >{"取り込み時と検索時で埋め込みモデルが異なる、次元数の不一致"}</td>{" "}<td >{"同一モデル・同一次元に統一"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"表・図・PDF の内容が欠ける"}</td>{" "}<td >{"前処理(テキスト抽出)の失敗"}</td>{" "}<td >{" パーサの見直し、前処理で構造を保持、カスタム Lambda による変換 "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"古い情報が返る"}</td>{" "}<td >{"更新が反映されていない(ドリフト)"}</td>{" "}<td >{" 定期同期、更新イベント連動、取り込み日時メタデータで絞り込み "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"検索が遅い"}</td>{" "}<td >{"インデックス規模、検索パラメータ、フィルタ、リソース不足"}</td>{" "}<td >{" 検索パラメータ調整、フィルタの併用、リソース(OCU 等)と構成の見直し、件数削減、リランキングの必要性を再評価 "}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"診断で使う 5 つの視点"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"診断で使う 5 つの視点（表38）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"視点"}</th>{" "}<th scope="col">{"やること"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"応答の関連性分析"}</td>{" "}<td >{" 質問ごとに「取得されたチャンク」を目視確認し、関連・無関連を分類。検索のみの評価(Skill 5.1.6)で定量化 "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"埋め込み品質の診断"}</td>{" "}<td >{" 似た質問が似たベクトルになっているか、既知の関連ペアの類似度を確認。モデル・次元・言語の整合を点検 "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"ドリフト監視"}</td>{" "}<td >{" データ側(更新の遅れ)と質問側(新しい話題の増加)の変化を監視。検索評価を定期実行して劣化を検知 "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"ベクトル化の問題解決"}</td>{" "}<td >{" 取り込みジョブの失敗ログ、空のチャンク、極端に長い・短いチャンクを確認 "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"ベクトル検索の性能最適化"}</td>{" "}<td >{" レイテンシ(p95 など)を計測し、件数・フィルタ・インデックス設定・リソースを調整 "}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"Knowledge Bases で効くつまみ(再掲)"}</h4>
{" "}
<ul >{" "}<li >{"取得件数の増減(既定では少数のチャンクを返す)"}</li>{" "}<li >{"チャンク戦略(固定長 / 階層 / セマンティック / カスタム Lambda)"}</li>{" "}<li >{"ハイブリッド検索(意味+キーワード)"}</li>{" "}<li >{"リランカーモデル"}</li>{" "}<li >{"メタデータフィルタ"}</li>{" "}<li >{"クエリ分解"}</li>{" "}</ul>
{" "}
<blockquote >{" "}<p >{" セマンティックチャンキングは追加コストが発生します。品質向上と費用のバランスを評価して選びます。 "}</p>{" "}</blockquote>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"「取れた文書を見る」を最初の手順にする。"}</strong>{" 検索結果を見ずにプロンプトだけ直しても解決しません。 "}</li>{" "}<li >{" "}<strong >{"埋め込みモデルを変えたら全文書を再ベクトル化する。"}</strong>{" 新旧を混在させません。 "}</li>{" "}<li >{" "}<strong >{"チャンク戦略は文書の種類ごとに選ぶ。"}</strong>{" FAQ、契約書、マニュアルでは最適が異なります。 "}</li>{" "}<li >{" "}<strong >{"検索評価を定期ジョブにして、劣化を早期に検知する。"}</strong>{" "}</li>{" "}<li >{" "}<strong >{"メタデータ(日付・部署・種別)を付与して絞り込みと鮮度管理に使う。"}</strong>{" "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「RAG が古い情報を返す」→ データ同期・更新パイプライン、取り込み日時メタデータ。 "}</li>{" "}<li >{"「検索時と取り込み時で結果が噛み合わない」→ 埋め込みモデルの不一致。"}</li>{" "}<li >{"「型番検索が弱い」→ ハイブリッド検索。"}</li>{" "}<li >{" 「文脈が分断された回答」→ チャンクサイズ・階層/セマンティックチャンキング。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.2.4)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://repost.aws/knowledge-center/bedrock-knowledge-bases-accurate-results-filters"}>{"AWS re:Post: Knowledge Bases の検索精度と取得結果を改善する"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"}>{"Amazon Bedrock Knowledge Bases ユーザーガイド"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://community.aws/content/2mtDG9fTNk4R75eKRx1HsfynvEr/7-failure-points-of-a-retrieval-augmented-generation-and-assessment-methodology"}>{"AWS Community: 7 Failure Points of a RAG and Assessment Methodology"}</a>{" "}</li>{" "}<li >{" 補足(第三者): "}<a href={"https://hidekazu-konishi.com/entry/amazon_bedrock_knowledge_bases_retrieval_quality_engineering.html"}>{"Amazon Bedrock Knowledge Bases Retrieval Quality Engineering"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}
<h3 id={"skill-525-プロンプト保守の問題"} tabIndex={-1}>{"Skill 5.2.5 プロンプト保守の問題"}</h3>
{" "}
<blockquote >{" "}<p >{" 公式の出題文: FM とのやり取りの性能を継続的に改善するため、プロンプトの保守問題をトラブルシュートする(例: テンプレートテストと CloudWatch Logs によるプロンプト混乱の診断、X-Ray によるプロンプトの可観測性パイプライン、スキーマ検証による形式不整合の検出、体系的なプロンプト改善ワークフロー)。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"やさしい説明"}</h4>
{" "}
<p >{" プロンプトは一度作って終わりではなく、運用の中で"}<strong >{"変更され、劣化し、再発する問題"}</strong>{"を抱えます。変更履歴・ログ・トレース・出力検証を整備して「何を変えたら何が起きたか」を追えるようにします。 "}</p>
{" "}
<h4 >{"4 本柱"}</h4>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"4 本柱（表39）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"柱"}</th>{" "}<th scope="col">{"目的"}</th>{" "}<th scope="col">{"使うもの"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"テンプレートテスト"}</td>{" "}<td >{" プロンプトテンプレートに変数を埋めたときの組み立て不具合を事前に見つける "}</td>{" "}<td >{" 単体テスト、テスト変数(Prompt Management)、境界値(空・超長文・特殊文字) "}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"ログによる診断"}</td>{" "}<td >{"「プロンプトが混乱した」ケースを後から調べる"}</td>{" "}<td >{" Bedrock のモデル呼び出しログ、CloudWatch Logs、Logs Insights "}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"可観測性パイプライン"}</td>{" "}<td >{" リクエストごとにどのプロンプト版・モデル・検索結果で処理されたかを追跡 "}</td>{" "}<td >{"AWS X-Ray(トレース)、CloudWatch 生成AIオブザーバビリティ"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"スキーマ検証"}</td>{" "}<td >{"出力形式の不整合を機械的に検出"}</td>{" "}<td >{"JSON スキーマ検証、再試行ロジック"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"可観測性パイプライン"}</h4>
{" "}
<Diagram id="diag-16" label={"可観測性パイプライン"} />
{" "}
<p >{" CloudWatch の生成AIオブザーバビリティは、プロンプトのエンドツーエンドのトレースで、ナレッジベース・ツール・モデルなどの構成要素のどこに問題があるかを特定する助けになります。Strands Agents、LangChain、LangGraph などのフレームワークにも対応しています。 "}</p>
{" "}
<h4 >{"X-Ray でプロンプトの文脈を残す例(Python)"}</h4>
{" "}
<div className="code-block" role="region" tabIndex={0} aria-label={"X-Ray でプロンプトの文脈を残す例(Python)（コード1）"}><div className="code-line hljs"><span className="hljs-keyword">{"from"}</span>{" aws_xray_sdk.core "}<span className="hljs-keyword">{"import"}</span>{" xray_recorder"}</div>
<div className="code-line hljs"></div>
<div className="code-line hljs"><span className="hljs-keyword">{"def"}</span>{" "}<span className="hljs-title function_">{"invoke_with_trace"}</span>{"("}<span className="hljs-params">{"client, model_id, prompt_version, messages"}</span>{"):"}</div>
<div className="code-line hljs">{"    "}<span className="hljs-keyword">{"with"}</span>{" xray_recorder.in_subsegment("}<span className="hljs-string">{"\"bedrock_converse\""}</span>{") "}<span className="hljs-keyword">{"as"}</span>{" seg:"}</div>
<div className="code-line hljs">{"        "}<span className="hljs-comment">{"# 注釈はフィルタ検索できる。キーは英数字とアンダースコア"}</span></div>
<div className="code-line hljs">{"        seg.put_annotation("}<span className="hljs-string">{"\"prompt_version\""}</span>{", prompt_version)"}</div>
<div className="code-line hljs">{"        seg.put_annotation("}<span className="hljs-string">{"\"model_id\""}</span>{", model_id)"}</div>
<div className="code-line hljs">{"        resp = client.converse(modelId=model_id, messages=messages)"}</div>
<div className="code-line hljs">{"        usage = resp.get("}<span className="hljs-string">{"\"usage\""}</span>{", {})"}</div>
<div className="code-line hljs">{"        seg.put_annotation("}<span className="hljs-string">{"\"stop_reason\""}</span>{", resp.get("}<span className="hljs-string">{"\"stopReason\""}</span>{", "}<span className="hljs-string">{"\"unknown\""}</span>{"))"}</div>
<div className="code-line hljs">{"        seg.put_annotation("}<span className="hljs-string">{"\"input_tokens\""}</span>{", usage.get("}<span className="hljs-string">{"\"inputTokens\""}</span>{", "}<span className="hljs-number">{"0"}</span>{"))"}</div>
<div className="code-line hljs">{"        seg.put_annotation("}<span className="hljs-string">{"\"output_tokens\""}</span>{", usage.get("}<span className="hljs-string">{"\"outputTokens\""}</span>{", "}<span className="hljs-number">{"0"}</span>{"))"}</div>
<div className="code-line hljs">{"        "}<span className="hljs-keyword">{"return"}</span>{" resp"}</div></div>
{" "}
<blockquote >{" "}<p >{" 注意: 注釈に利用者の入力そのもの(個人情報)を入れないでください。バージョン・ID・件数などのメタデータに留めます。 "}</p>{" "}</blockquote>
{" "}
<h4 >{"CloudWatch Logs Insights でプロンプト問題を調べる例"}</h4>
{" "}
<p >{" 呼び出しログを CloudWatch Logs に出力している前提で、プロンプトバージョンごとの失敗傾向を集計する例です(フィールド名は実際のログ構造に合わせて調整してください)。 "}</p>
{" "}
<div className="code-block" role="region" tabIndex={0} aria-label={"CloudWatch Logs Insights でプロンプト問題を調べる例（コード2）"}><div className="code-line hljs"><span className="hljs-keyword">{"fields"}</span>{" "}<span className="hljs-variable">{"@timestamp"}</span>{", input.inputTokenCount, output.outputTokenCount, modelId"}</div>
<div className="code-line hljs"><span className="hljs-operator">{"|"}</span>{" "}<span className="hljs-keyword">{"filter"}</span>{" "}<span className="hljs-built_in">{"ispresent"}</span>{"(output.outputTokenCount)"}</div>
<div className="code-line hljs"><span className="hljs-operator">{"|"}</span>{" "}<span className="hljs-keyword">{"stats"}</span>{" "}<span className="hljs-built_in">{"avg"}</span>{"(output.outputTokenCount) "}<span className="hljs-keyword">{"as"}</span>{" avg_out, "}<span className="hljs-built_in">{"max"}</span>{"(output.outputTokenCount) "}<span className="hljs-keyword">{"as"}</span>{" max_out, "}<span className="hljs-built_in">{"count"}</span>{"(*) "}<span className="hljs-keyword">{"as"}</span>{" n "}<span className="hljs-keyword">{"by"}</span>{" modelId, "}<span className="hljs-built_in">{"bin"}</span>{"("}<span className="hljs-number">{"1"}</span>{"h)"}</div>
<div className="code-line hljs"><span className="hljs-operator">{"|"}</span>{" "}<span className="hljs-keyword">{"sort"}</span>{" "}<span className="hljs-variable">{"@timestamp"}</span>{" "}<span className="hljs-keyword">{"desc"}</span></div></div>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"CloudWatch Logs Insights でプロンプト問題を調べる例（表40）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"見るポイント"}</th>{" "}<th scope="col">{"示唆"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"出力トークンが急に増減した"}</td>{" "}<td >{"プロンプト変更の副作用、冗長化、または途中切れ"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"特定のプロンプト版だけエラー・低評価が多い"}</td>{" "}<td >{"直近の変更が原因"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"入力トークンが上限に近い"}</td>{" "}<td >{"5.2.1 のコンテンツ溢れの予兆"}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"スキーマ検証のパターン"}</h4>
{" "}
<Diagram id="diag-17" label={"スキーマ検証のパターン"} />
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"スキーマ検証のパターン（表41）"}>{" "}<table >{" "}<thead >{" "}<tr className={"header"}>{" "}<th scope="col">{"実装のポイント"}</th>{" "}<th scope="col">{"内容"}</th>{" "}</tr>{" "}</thead>{" "}<tbody >{" "}<tr className={"odd"}>{" "}<td >{"検証"}</td>{" "}<td >{"JSON Schema や Pydantic などで型・必須項目・列挙値を検証"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"再試行"}</td>{" "}<td >{"検証エラー内容をプロンプトに添えて再生成(回数上限を設ける)"}</td>{" "}</tr>{" "}<tr className={"odd"}>{" "}<td >{"記録"}</td>{" "}<td >{"不適合の発生率をメトリクス化(プロンプト版ごと)"}</td>{" "}</tr>{" "}<tr className={"even"}>{" "}<td >{"予防"}</td>{" "}<td >{" プロンプトでスキーマを明示、例を提示、ツール利用(function calling)による構造化出力を検討 "}</td>{" "}</tr>{" "}</tbody>{" "}</table>{" "}</div>
{" "}
<h4 >{"体系的な改善ワークフロー"}</h4>
{" "}
<ol >{" "}<li >{"不適合・低評価・混乱の事例をログとトレースから収集する"}</li>{" "}<li >{"プロンプト版・モデル・検索結果で層別して傾向を確認する"}</li>{" "}<li >{"仮説に基づき 1 点だけ変更して新しい版を作る"}</li>{" "}<li >{"テンプレートテストと評価データセットで検証する"}</li>{" "}<li >{"カナリアで段階展開し、スキーマ適合率・品質スコア・コストを監視する"}</li>{" "}<li >{"問題があれば前の版へ戻す(ロールバック)"}</li>{" "}</ol>
{" "}
<div className={"callout-practice"}>{" "}<div className={"icon"}>{"✓"}</div>{" "}<div className={"body"}>{" "}<div className={"label"}>{"ベストプラクティス"}</div>{" "}<ol >{" "}<li >{" "}<strong >{"すべてのリクエストにプロンプト版・モデル ID・取得文書 ID を記録する。"}</strong>{" 後から原因を絞り込めます。 "}</li>{" "}<li >{" "}<strong >{"テンプレートの変数埋め込みを単体テストする。"}</strong>{" 空・長文・引用符や改行の混入などの境界値を含めます。 "}</li>{" "}<li >{" "}<strong >{"出力は信頼せず検証する。"}</strong>{" 形式検証は必ず通してから後続処理へ渡します。 "}</li>{" "}<li >{" "}<strong >{"ログは機微情報を含む。"}</strong>{" マスキング、暗号化、アクセス制御、保持期間を設計します(Sensitive Data Protection も検討)。 "}</li>{" "}<li >{" "}<strong >{"品質メトリクスにアラームを設定する。"}</strong>{" スキーマ不適合率、再試行率などが上がったら通知します。 "}</li>{" "}</ol>{" "}</div>{" "}</div>
{" "}
<h4 >{"試験での狙われ方"}</h4>
{" "}
<ul >{" "}<li >{" 「プロンプトのどの版で問題が起きたか追跡したい」→ X-Ray 注釈 / ログへのプロンプト版記録 + Prompt Management のバージョン管理。 "}</li>{" "}<li >{" 「出力形式がときどき崩れて後続処理が失敗する」→ スキーマ検証+再試行、構造化出力の指示。 "}</li>{" "}<li >{" 「プロンプトが原因の品質劣化をログから診断したい」→ モデル呼び出しログ+CloudWatch Logs Insights。 "}</li>{" "}</ul>
{" "}
<h4 >{"根拠ソース"}</h4>
{" "}
<ul >{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain5.html"}>{"Exam Guide Domain 5(Skill 5.2.5)"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/GenAI-observability.html"}>{"Generative AI observability - Amazon CloudWatch"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://aws.amazon.com/about-aws/whats-new/2025/10/generative-ai-observability-amazon-cloudwatch"}>{"What's New: Generative AI observability now generally available for Amazon CloudWatch"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/model-invocation-logging.html"}>{"Amazon Bedrock モデル呼び出しのログ記録"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html"}>{"AWS X-Ray 開発者ガイド"}</a>{" "}</li>{" "}<li >{" "}<a href={"https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-version-compare.html"}>{"Compare versions of a prompt in Prompt management - Amazon Bedrock"}</a>{" "}</li>{" "}</ul>
{" "}
<hr  />
{" "}</section>;}
