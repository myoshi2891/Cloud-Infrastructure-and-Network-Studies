import { Diagram } from '../Diagram';
/** 原本のfoundation区分を全文保持する。 */
export default function Foundation() { return <div className="guide-part" data-part="foundation">
<div className="hero"><div className="kicker">{"AWS Certified Generative AI Developer Professional · Domain 1"}</div><h1>{"AWS Certified Generative AI Developer - Professional (AIP-C01)"}</h1><div className="meta-row">{" "}<span className="pill">{"配点 "}<strong>{"Domain 1 · 31%"}</strong></span>{" "}<span className="pill">{"対象 "}<strong>{"初学者"}</strong></span>{" "}<span className="pill">{"図解 "}<strong>{"Mermaid 21点"}</strong></span>{" "}<span className="pill">{"参考ソース "}<strong>{"59件"}</strong></span>{" "}</div></div>

<p><strong>{"Content Domain 1: Foundation Model Integration, Data Management, and Compliance 初学者向けステップバイステップ解説"}</strong></p>

<p>{"対象: 生成AIアプリ開発の初学者(AWSの基本サービスを触ったことがある方)"}</p>

<p>{"位置づけ: AIP-C01 試験の "}<strong>{"Domain 1(スコア対象の 31%)"}</strong>{" を、公式試験ガイドの Task / Skill 順に解説します"}</p>

<p>{"作法: 図解は Mermaid と Markdown の表のみを使用(ASCII アート不使用)"}</p>

<hr />

<h2 id="1-この-domain-の全体像" tabIndex={-1}>{"1. この Domain の全体像"}</h2>

<h3 id="11-試験の基本情報公式試験ガイドより" tabIndex={-1}>{"1.1 試験の基本情報(公式試験ガイドより)"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"試験名"}</td><td>{"AWS Certified Generative AI Developer - Professional (AIP-C01)"}</td></tr><tr className="even"><td>{"想定受験者"}</td><td>{"本番グレードのアプリを AWS またはオープンソース技術で構築した経験が 2 年以上、GenAI 実装の実務経験が 1 年"}</td></tr><tr className="odd"><td>{"採点対象の問題数"}</td><td>{"65 問(ほかに採点されない問題が 10 問)"}</td></tr><tr className="even"><td>{"合格スコア"}</td><td>{"100 から 1,000 のスケールドスコアで 750 以上"}</td></tr><tr className="odd"><td>{"問題形式"}</td><td>{"択一(正解 1・誤り 3)と複数選択(5 択以上から 2 つ以上)"}</td></tr><tr className="even"><td>{"採点方式"}</td><td>{"補償型。分野ごとの合格点はなく、全体で合格すればよい"}</td></tr><tr className="odd"><td>{"Domain 1 の比重"}</td><td>{"31%(5 つの Domain の中で最大)"}</td></tr><tr className="even"><td>{"試験範囲外"}</td><td>{"モデルの開発と学習、高度な ML 技法、データエンジニアリングと特徴量エンジニアリング"}</td></tr></tbody></table></div>

<p>{"Domain 1 は最も配点が大きいため、ここを固めることが合格への近道です。"}</p>

<h3 id="12-domain-1-の-6-つの-task" tabIndex={-1}>{"1.2 Domain 1 の 6 つの Task"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"Task"}</th><th scope="col">{"テーマ"}</th><th scope="col">{"Skill 数"}</th><th scope="col">{"ひとことで言うと"}</th></tr></thead><tbody><tr className="odd"><td>{"1.1"}</td><td>{"要件分析と設計"}</td><td>{"3"}</td><td>{"作る前に「何を、どう作るか」を決める"}</td></tr><tr className="even"><td>{"1.2"}</td><td>{"FM の選定と構成"}</td><td>{"4"}</td><td>{"最適なモデルを選び、切り替え可能で止まらない構成にする"}</td></tr><tr className="odd"><td>{"1.3"}</td><td>{"データ検証と処理"}</td><td>{"4"}</td><td>{"FM に渡すデータを検証し、整え、形式を合わせる"}</td></tr><tr className="even"><td>{"1.4"}</td><td>{"ベクトルストア"}</td><td>{"5"}</td><td>{"意味検索のためのデータ置き場を設計し、最新に保つ"}</td></tr><tr className="odd"><td>{"1.5"}</td><td>{"検索メカニズム"}</td><td>{"6"}</td><td>{"分割、埋め込み、検索、再ランク、クエリ改善で RAG の精度を上げる"}</td></tr><tr className="even"><td>{"1.6"}</td><td>{"プロンプトと統制"}</td><td>{"6"}</td><td>{"プロンプトを設計、管理、テスト、連鎖させる"}</td></tr></tbody></table></div>

<h3 id="13-domain-1-の学習ロードマップ" tabIndex={-1}>{"1.3 Domain 1 の学習ロードマップ"}</h3>

<Diagram id="diag-0" label="1.3 Domain 1 の学習ロードマップの図解" />

<p>{"出典: 試験ガイド Domain 1 "}<a href="https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain1.html">{"https://docs.aws.amazon.com/aws-certification/latest/ai-professional-01/ai-professional-01-domain1.html"}</a></p>

<hr />

<h2 id="2-先に押さえる基本用語" tabIndex={-1}>{"2. 先に押さえる基本用語"}</h2>

<p>{"初学者がつまずきやすい用語を最初に整理します。以降の説明はすべてこの用語が前提です。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"用語"}</th><th scope="col">{"やさしい説明"}</th><th scope="col">{"関連 Task"}</th></tr></thead><tbody><tr className="odd"><td>{"FM(基盤モデル)"}</td><td>{"大量データで事前学習された汎用 AI モデル。文章生成、要約、画像理解など幅広く使える"}</td><td>{"全般"}</td></tr><tr className="even"><td>{"Amazon Bedrock"}</td><td>{"複数社の FM を共通の API で使えるフルマネージドサービス"}</td><td>{"全般"}</td></tr><tr className="odd"><td>{"トークン"}</td><td>{"モデルが文章を処理する最小単位。料金、入力上限、速度に直結する"}</td><td>{"1.2, 1.5"}</td></tr><tr className="even"><td>{"プロンプト"}</td><td>{"モデルへの指示文。役割、手順、出力形式などを書く"}</td><td>{"1.6"}</td></tr><tr className="odd"><td>{"RAG"}</td><td>{"Retrieval Augmented Generation。外部データを検索して、その結果をモデルに渡して回答させる方式"}</td><td>{"1.4, 1.5"}</td></tr><tr className="even"><td>{"埋め込み(Embedding)"}</td><td>{"文章や画像の意味を数値の列(ベクトル)に変換したもの。意味が近いものは近い値になる"}</td><td>{"1.5"}</td></tr><tr className="odd"><td>{"ベクトルストア"}</td><td>{"ベクトルを保存し、近いものを高速に探せるデータベース"}</td><td>{"1.4"}</td></tr><tr className="even"><td>{"チャンク"}</td><td>{"長い文書を検索しやすい大きさに分割した 1 片"}</td><td>{"1.5"}</td></tr><tr className="odd"><td>{"ナレッジベース"}</td><td>{"Bedrock が提供する、取り込み、分割、埋め込み、検索までを担う RAG 用のマネージド機能"}</td><td>{"1.4, 1.5"}</td></tr><tr className="even"><td>{"推論プロファイル"}</td><td>{"モデルと、リクエストを振り分けられるリージョンの組を定義したもの"}</td><td>{"1.2"}</td></tr><tr className="odd"><td>{"ガードレール"}</td><td>{"有害コンテンツ、機密情報、禁止トピックなどを入出力で制御する機能"}</td><td>{"1.6"}</td></tr><tr className="even"><td>{"LoRA"}</td><td>{"少ないパラメータだけを追加学習する軽量なカスタマイズ手法"}</td><td>{"1.2"}</td></tr></tbody></table></div>

<h3 id="rag-の基本の流れ" tabIndex={-1}>{"RAG の基本の流れ"}</h3>

<Diagram id="diag-1" label="RAG の基本の流れの図解" />

<p>{"この図の「ベクトルストア」「チャンク」「埋め込み」「プロンプト」が、Task 1.4 から 1.6 の主役です。"}</p>

<p>{"出典: Amazon Bedrock Knowledge Bases "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base.html"}</a></p>

<hr />
</div>; }
