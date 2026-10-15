import { Diagram } from '../Diagram';
/** 原本のtask13区分を全文保持する。 */
export default function Task13() { return <div className="guide-part" data-part="task13"><h2 id="5-task-13-fm-向けデータ検証と処理パイプライン" tabIndex={-1}>{"5. Task 1.3 FM 向けデータ検証と処理パイプライン"}</h2>

<p><strong>{"Task の目的"}</strong>{": 「ゴミを入れればゴミが出る」を防ぐため、FM に渡すデータを検証し、種類ごとに処理し、モデルが求める形式に整え、品質を高める。"}</p>

<h3 id="データ処理パイプライン全体像" tabIndex={-1}>{"データ処理パイプライン全体像"}</h3>

<Diagram id="diag-6" label="データ処理パイプライン全体像の図解" />

<h3 id="skill-131-データ品質の検証ワークフロー" tabIndex={-1}>{"Skill 1.3.1 データ品質の検証ワークフロー"}</h3>

<p><strong>{"何をするか"}</strong>{": データが品質基準を満たしているか、FM に渡す前に自動で検査する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"検証の観点"}</th><th scope="col">{"チェック例"}</th></tr></thead><tbody><tr className="odd"><td>{"完全性"}</td><td>{"必須項目の欠損がないか"}</td></tr><tr className="even"><td>{"形式"}</td><td>{"日付、文字コード、スキーマが想定どおりか"}</td></tr><tr className="odd"><td>{"一意性"}</td><td>{"重複した文書や行がないか"}</td></tr><tr className="even"><td>{"妥当性"}</td><td>{"値の範囲、許容される値の一覧に収まっているか"}</td></tr><tr className="odd"><td>{"機密性"}</td><td>{"個人情報が混入していないか(Comprehend の PII 検出は英語とスペイン語のみ対応。日本語の PII 検出には使えないため、別の手段で確認する)"}</td></tr></tbody></table></div>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"サービス"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody><tr className="odd"><td>{"AWS Glue Data Quality"}</td><td>{"ルールを DQDL(Data Quality Definition Language)で定義し、データセットを自動評価"}</td></tr><tr className="even"><td>{"SageMaker Data Wrangler"}</td><td>{"データの探索、変換、品質の確認を対話的に行う"}</td></tr><tr className="odd"><td>{"Lambda のカスタム関数"}</td><td>{"業務固有のルール(文書の言語判定、サイズ上限など)"}</td></tr><tr className="even"><td>{"CloudWatch メトリクスとアラーム"}</td><td>{"検証の合格率を指標化し、閾値割れで通知"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"検証を"}<strong>{"パイプラインの入口"}</strong>{"に置き、不合格データは"}<strong>{"隔離"}</strong>{"して原因調査できるようにする"}</li>{" "}<li>{"合格率や不合格理由を"}<strong>{"メトリクス化"}</strong>{"し、データ品質の劣化を早期に検知する"}</li>{" "}<li>{"ルールは"}<strong>{"コードとして管理"}</strong>{"(バージョン管理、レビュー)する"}</li>{" "}</ul></div></div>

<p>{"出典: AWS Glue Data Quality "}<a href="https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html">{"https://docs.aws.amazon.com/glue/latest/dg/glue-data-quality.html"}</a></p>

<p>{"出典: SageMaker Data Wrangler "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/data-wrangler.html"}</a></p>

<p>{"出典: Amazon CloudWatch "}<a href="https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html">{"https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/WhatIsCloudWatch.html"}</a></p>

<h3 id="skill-132-データ種類別マルチモーダルの処理" tabIndex={-1}>{"Skill 1.3.2 データ種類別(マルチモーダル)の処理"}</h3>

<p><strong>{"何をするか"}</strong>{": テキスト、画像、音声、表形式データを、それぞれに適した方法で FM が扱える状態にする。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"データ種類"}</th><th scope="col">{"処理の考え方"}</th><th scope="col">{"使えるサービス"}</th></tr></thead><tbody><tr className="odd"><td>{"テキスト"}</td><td>{"文字コード統一、不要部分の除去、分割"}</td><td>{"Lambda、Glue"}</td></tr><tr className="even"><td>{"画像"}</td><td>{"画像を直接マルチモーダルモデルへ入力、または文字抽出"}</td><td>{"Bedrock のマルチモーダルモデル、Amazon Textract"}</td></tr><tr className="odd"><td>{"音声"}</td><td>{"文字起こししてテキスト化し、通常のテキストとして扱う"}</td><td>{"Amazon Transcribe"}</td></tr><tr className="even"><td>{"表形式"}</td><td>{"行を文章化する、または要約して渡す"}</td><td>{"SageMaker Processing、Glue"}</td></tr><tr className="odd"><td>{"動画、複合ドキュメント"}</td><td>{"音声、画面、テキストを分解して処理"}</td><td>{"Bedrock Data Automation、複数サービスの組み合わせ"}</td></tr></tbody></table></div>

<Diagram id="diag-7" label="Skill 1.3.2 データ種類別(マルチモーダル)の処理の図解" />

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"大量処理は "}<strong>{"SageMaker Processing や Step Functions"}</strong>{" でスケールさせ、Lambda の実行時間制限に収まらない処理を切り出す"}</li>{" "}<li>{"画像内の文字や表の構造が重要な場合は、"}<strong>{"文字抽出の精度"}</strong>{"を先に検証する"}</li>{" "}<li>{"音声は"}<strong>{"話者分離や言語指定"}</strong>{"など、文字起こしの設定で品質が変わる"}</li>{" "}</ul></div></div>

<p>{"出典: Amazon Transcribe "}<a href="https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html">{"https://docs.aws.amazon.com/transcribe/latest/dg/what-is.html"}</a></p>

<p>{"出典: Amazon Textract "}<a href="https://docs.aws.amazon.com/textract/latest/dg/what-is.html">{"https://docs.aws.amazon.com/textract/latest/dg/what-is.html"}</a></p>

<p>{"出典: SageMaker Processing "}<a href="https://docs.aws.amazon.com/sagemaker/latest/dg/processing-job.html">{"https://docs.aws.amazon.com/sagemaker/latest/dg/processing-job.html"}</a></p>

<p>{"出典: Bedrock Data Automation "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/bda.html"}</a></p>

<h3 id="skill-133-モデル固有の入力形式への整形" tabIndex={-1}>{"Skill 1.3.3 モデル固有の入力形式への整形"}</h3>

<p><strong>{"何をするか"}</strong>{": モデルやエンドポイントが要求するリクエスト形式に、データを正しく変換する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"呼び出し方"}</th><th scope="col">{"形式の特徴"}</th></tr></thead><tbody><tr className="odd"><td>{"Bedrock InvokeModel"}</td><td><strong>{"モデルごとに異なる"}</strong>{" JSON 本文(フィールド名や構造が違う)"}</td></tr><tr className="even"><td>{"Bedrock Converse API"}</td><td>{"共通の messages 形式(役割と内容の配列)で、モデル間の差を吸収"}</td></tr><tr className="odd"><td>{"SageMaker AI エンドポイント"}</td><td>{"コンテナが期待する形式(JSON や CSV など)に合わせて整形"}</td></tr><tr className="even"><td>{"対話アプリ"}</td><td>{"ユーザーとアシスタントの発話を、順序を守って履歴として並べる"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"特別な理由がなければ "}<strong>{"Converse API"}</strong>{" を使い、形式依存をコードの外に出す"}</li>{" "}<li>{"対話では"}<strong>{"システムプロンプト(役割や制約)と会話履歴を分けて"}</strong>{"渡す"}</li>{" "}<li>{"履歴が長くなったら、"}<strong>{"古い発話の要約や切り詰め"}</strong>{"でトークン上限を守る"}</li>{" "}<li>{"整形処理は"}<strong>{"関数として独立"}</strong>{"させ、単体テストできるようにする"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock Converse API "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/conversation-inference.html"}</a></p>

<p>{"出典: Bedrock InvokeModel "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/inference-invoke.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/inference-invoke.html"}</a></p>

<h3 id="skill-134-入力データの品質向上" tabIndex={-1}>{"Skill 1.3.4 入力データの品質向上"}</h3>

<p><strong>{"何をするか"}</strong>{": 入力をあらかじめ整えて、FM の回答の質と一貫性を高める。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"例"}</th><th scope="col">{"サービス"}</th></tr></thead><tbody><tr className="odd"><td>{"正規化"}</td><td>{"表記ゆれ、全角半角、日付形式の統一"}</td><td>{"Lambda"}</td></tr><tr className="even"><td>{"エンティティ抽出"}</td><td>{"人名、組織名、日付、PII の抽出"}</td><td>{"Amazon Comprehend(日本語は一般エンティティ認識のみ対応。PII 検出は英語とスペイン語のみ)"}</td></tr><tr className="odd"><td>{"再構成"}</td><td>{"乱れた文章を FM で整えた文章に書き換える"}</td><td>{"Bedrock"}</td></tr><tr className="even"><td>{"ノイズ除去"}</td><td>{"ヘッダー、フッター、定型文の削除"}</td><td>{"Lambda、Glue"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"変換の前後で"}<strong>{"意味が変わっていないか"}</strong>{"をサンプル検査する(FM による書き換えは誤りも混入し得る)"}</li>{" "}<li>{"抽出したエンティティは"}<strong>{"メタデータ"}</strong>{"として保存し、検索の絞り込みに使う(Task 1.4.2)"}</li>{" "}<li>{"PII は、FM に渡す前にマスキングするか、ガードレールで保護する"}</li>{" "}</ul></div></div>

<p>{"出典: Amazon Comprehend "}<a href="https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html">{"https://docs.aws.amazon.com/comprehend/latest/dg/what-is.html"}</a></p>

<h3 id="task-13-の試験ポイント" tabIndex={-1}>{"Task 1.3 の試験ポイント"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"よく出る場面"}</th><th scope="col">{"選ぶ答えの方向"}</th></tr></thead><tbody><tr className="odd"><td>{"データ品質をルールで自動検査したい"}</td><td>{"AWS Glue Data Quality"}</td></tr><tr className="even"><td>{"音声データを RAG に取り込みたい"}</td><td>{"Transcribe で文字起こし後にテキストとして処理"}</td></tr><tr className="odd"><td>{"モデルを替えても呼び出しコードを変えたくない"}</td><td>{"Converse API"}</td></tr><tr className="even"><td>{"文書から人名や組織名を抽出したい"}</td><td>{"Amazon Comprehend"}</td></tr></tbody></table></div>

<hr />
</div>; }
