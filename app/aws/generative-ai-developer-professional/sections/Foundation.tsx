import { Diagram } from '../Diagram';
/** 原本のfoundation本文を全量移行。 */
export default function Foundation() {
    return <div className="guide-part" data-part="foundation">

    <div className="hero"><div className="kicker">{"\n                        AWS Certified Generative AI Developer · Professional\n                    "}</div><h1>{"\n                        AWS Certified Generative AI Developer - Professional (AIP-C01)\n                        初学者向けステップバイステップ解説ガイド\n                    "}</h1><div className="meta-row"><span className="pill">{"試験 "}<strong>{"AIP-C01 / 合格 750点"}</strong></span><span className="pill">{"対象 "}<strong>{"初学者〜中級者"}</strong></span><span className="pill">{"図解 "}<strong>{"Mermaid 34点"}</strong></span><span className="pill">{"参考URL "}<strong>{"55件"}</strong></span></div></div>

    <p><strong>{"対象読者"}</strong>{":\n                    生成AI(GenAI)アプリ開発の経験が浅い方、AWSの基礎知識(IAM・S3・Lambda・VPC\n                    など)がある方\n                "}</p>

    <p><strong>{"ゴール"}</strong>{": 公式試験ガイドの5ドメイン・全スキルを、"}<strong>{"概念 → AWSサービス → ベストプラクティス → 試験での着眼点"}</strong>{"の順に理解する\n                "}</p>

    <p><strong>{"最終確認日"}</strong>{":\n                    2026-10-09(試験範囲・サービス仕様は変わるため、受験前に必ず公式ガイドで再確認してください)\n                "}</p>

    <p><strong>{"図解ルール"}</strong>{": ASCIIアート禁止。フローチャートは\n                    Mermaid、図解・表は Markdown で記述しています。\n                "}</p>

    <hr />

    <h2 id="0-この資料の使い方と試験の全体像" tabIndex={-1}>{"0. この資料の使い方と試験の全体像"}</h2>

    <h3 id="01-試験の基本情報公式試験ガイドより" tabIndex={-1}>{"\n                    0.1 試験の基本情報(公式試験ガイドより)\n                "}</h3>

    <div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"試験名"}</td><td>{"\n                                    AWS Certified Generative AI Developer - Professional(AIP-C01)\n                                "}</td></tr><tr className="even"><td>{"想定受験者"}</td><td>{"\n                                    AWS上または OSS でのプロダクション級アプリ構築経験2年以上 +\n                                    AI/ML またはデータエンジニアリング経験 + GenAI実装経験1年以上\n                                "}</td></tr><tr className="odd"><td>{"問題数"}</td><td>{"\n                                    採点対象65問 + 採点対象外10問(どれが採点対象外かは分からない)\n                                "}</td></tr><tr className="even"><td>{"問題形式"}</td><td>{"\n                                    択一(正解1・不正解3)、複数選択(5択以上から2つ以上選ぶ。全部正解で得点)\n                                "}</td></tr><tr className="odd"><td>{"スコア"}</td><td>{"\n                                    100〜1,000のスケールドスコア、"}<strong>{"合格は750以上"}</strong></td></tr><tr className="even"><td>{"採点方式"}</td><td>{"\n                                    補償型(ドメインごとの合格点はなく、総合点のみで合否が決まる)\n                                "}</td></tr><tr className="odd"><td>{"未回答"}</td><td>{"\n                                    不正解扱い。推測による減点はないので"}<strong>{"必ず全問回答する"}</strong></td></tr></tbody></table></div>

    <h3 id="02-試験の対象外出題されにくい領域" tabIndex={-1}>{"0.2 試験の対象外(出題されにくい領域)"}</h3>

    <p>{"\n                    公式ガイドは、次の業務を"}<strong>{"受験者に期待しない"}</strong>{"と明記しています(非網羅)。\n                "}</p>

    <ul><li>{"モデルの開発とトレーニング"}</li><li>{"高度なML技術"}</li><li>{"データエンジニアリングと特徴量エンジニアリング"}</li></ul>

    <p>{"\n                    つまり本試験は「"}<strong>{"モデルを作る"}</strong>{"」ではなく「"}<strong>{"既存のFMを本番アプリにどう組み込み、安全に、速く、安く運用するか"}</strong>{"」を問う試験です。\n                "}</p>

    <h3 id="03-ドメイン配点" tabIndex={-1}>{"0.3 ドメイン配点"}</h3>

    <div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"ドメイン"}</th><th scope="col">{"内容"}</th><th scope="col">{"配点"}</th><th scope="col">{"タスク数"}</th><th scope="col">{"スキル数"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{"FM統合、データ管理、コンプライアンス"}</td><td><strong>{"31%"}</strong></td><td>{"6"}</td><td>{"28"}</td></tr><tr className="even"><td>{"2"}</td><td>{"実装と統合"}</td><td><strong>{"26%"}</strong></td><td>{"5"}</td><td>{"25"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"AI安全性・セキュリティ・ガバナンス"}</td><td><strong>{"20%"}</strong></td><td>{"4"}</td><td>{"15"}</td></tr><tr className="even"><td>{"4"}</td><td>{"GenAIアプリの運用効率と最適化"}</td><td><strong>{"12%"}</strong></td><td>{"3"}</td><td>{"16"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"テスト・検証・トラブルシューティング"}</td><td><strong>{"11%"}</strong></td><td>{"2"}</td><td>{"14"}</td></tr></tbody></table></div>

    <Diagram id="chart-1" label="0.3 ドメイン配点の図解"/>

    <p><strong>{"学習の優先順位"}</strong>{": D1 + D2 で全体の57%を占めます。まず\n                    "}<strong>{"Amazon Bedrock・Knowledge Bases(RAG)・エージェント"}</strong>{"\n                    を重点的に固めてください。\n                "}</p>

    <h3 id="04-各セクションの読み方" tabIndex={-1}>{"0.4 各セクションの読み方"}</h3>

    <p>{"各タスクは次の順で書いています。"}</p>

    <ol><li><strong>{"タスクの狙い"}</strong>{"(何ができるようになるか)"}</li><li><strong>{"スキル早見表"}</strong>{"(公式スキル番号 → 主なサービス → 一言ポイント)\n                    "}</li><li><strong>{"ステップ解説"}</strong>{"(初学者向けの噛み砕き説明 + Mermaid図)"}</li><li><strong>{"ベストプラクティス"}</strong></li><li><strong>{"試験での着眼点"}</strong>{"(引っかけ・判断基準)"}</li></ol>

    <p><strong>{"注意"}</strong>{": 公式ガイドの「for\n                    example」に挙がるサービスは"}<strong>{"例示"}</strong>{"です。試験ではシナリオの制約(コスト・レイテンシ・運用負荷・コンプライアンス)から最適解を選ぶ力が問われます。\n                "}</p>

    <hr />

    <h2 id="1-前提知識step-0" tabIndex={-1}>{"1. 前提知識(Step 0)"}</h2>

    <h3 id="11-用語を最初に整理する" tabIndex={-1}>{"1.1 用語を最初に整理する"}</h3>

    <div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"用語"}</th><th scope="col">{"初学者向けの説明"}</th></tr></thead><tbody><tr className="odd"><td>{"FM(Foundation Model、基盤モデル)"}</td><td>{"\n                                    大量データで事前学習された汎用モデル。LLM(テキスト)やマルチモーダルモデルを含む\n                                "}</td></tr><tr className="even"><td>{"トークン"}</td><td>{"\n                                    モデルが処理する文字の最小単位に近いもの。"}<strong>{"料金・レート制限・コンテキスト長はトークン単位"}</strong>{"で決まる\n                                "}</td></tr><tr className="odd"><td>{"コンテキストウィンドウ"}</td><td>{"1回の呼び出しで扱えるトークンの上限(入力 + 出力)"}</td></tr><tr className="even"><td>{"プロンプト"}</td><td>{"\n                                    モデルへの指示文。システムプロンプト(役割・ルール)とユーザープロンプトに分かれる\n                                "}</td></tr><tr className="odd"><td>{"埋め込み(Embedding)"}</td><td>{"\n                                    テキストや画像を数値ベクトルに変換したもの。意味が近いほどベクトルも近くなる\n                                "}</td></tr><tr className="even"><td>{"ベクトルストア"}</td><td>{"埋め込みを保存し、類似検索(最近傍探索)できるデータベース"}</td></tr><tr className="odd"><td>{"RAG"}</td><td>{"\n                                    回答前に外部知識を検索し、その結果をプロンプトに付けて生成する方式\n                                "}</td></tr><tr className="even"><td>{"ハルシネーション"}</td><td>{"もっともらしいが事実でない出力"}</td></tr><tr className="odd"><td>{"エージェント"}</td><td>{"\n                                    FMが「考える → ツールを呼ぶ →\n                                    結果を見て次を決める」を繰り返して目標を達成する仕組み\n                                "}</td></tr><tr className="even"><td>{"MCP(Model Context Protocol)"}</td><td>{"エージェントとツール/データソースをつなぐ標準プロトコル"}</td></tr><tr className="odd"><td>{"Guardrails"}</td><td>{"入力・出力に安全ルールを適用する仕組み"}</td></tr></tbody></table></div>

    <h3 id="12-genaiアプリの全体アーキテクチャ" tabIndex={-1}>{"1.2 GenAIアプリの全体アーキテクチャ"}</h3>

    <Diagram id="chart-2" label="1.2 GenAIアプリの全体アーキテクチャの図解"/>

    <h3 id="13-amazon-bedrock-の-api-を整理する試験の土台" tabIndex={-1}>{"\n                    1.3 Amazon Bedrock の API を整理する(試験の土台)\n                "}</h3>

    <div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"API / 機能"}</th><th scope="col">{"用途"}</th><th scope="col">{"覚え方"}</th></tr></thead><tbody><tr className="odd"><td>{"InvokeModel"}</td><td>{"モデル固有のJSON形式で1回呼ぶ"}</td><td>{"モデルごとにリクエスト形式が違う"}</td></tr><tr className="even"><td>{"InvokeModelWithResponseStream"}</td><td>{"上記のストリーミング版"}</td><td>{"トークンを順次受け取る"}</td></tr><tr className="odd"><td>{"Converse / ConverseStream"}</td><td><strong>{"モデルに依存しない統一形式"}</strong>{"で会話を扱う"}</td><td>{"モデル切り替えに強い。会話履歴・ツール定義を共通化"}</td></tr><tr className="even"><td>{"ApplyGuardrail"}</td><td>{"FMを呼ばずに"}<strong>{"Guardrailsだけ"}</strong>{"を評価"}</td><td>{"他社モデルや独自データにも安全チェックを適用できる"}</td></tr><tr className="odd"><td>{"Retrieve"}</td><td>{"Knowledge Bases から検索結果だけ取得"}</td><td>{"検索と生成を自前で制御したいとき"}</td></tr><tr className="even"><td>{"RetrieveAndGenerate"}</td><td>{"検索 + 生成を一括実行"}</td><td>{"最短でRAGを動かしたいとき"}</td></tr><tr className="odd"><td>{"InvokeAgent"}</td><td>{"Bedrock Agents を呼ぶ"}</td><td>{"エージェントの実行"}</td></tr><tr className="even"><td>{"バッチ推論"}</td><td>{"大量データを非同期でまとめて処理"}</td><td>{"リアルタイム不要ならオンデマンドより割安(公式に割引あり)"}</td></tr></tbody></table></div>

    <div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><p>{"\n                            モデル切り替えの可能性があるなら、"}<strong>{"Converse API を既定"}</strong>{"にする。モデル固有パラメータは\n                            "}<code>{"additionalModelRequestFields"}</code>{" で渡す。\n                        "}</p></div></div>

    <h3 id="14-推論の消費方式を整理する" tabIndex={-1}>{"1.4 推論の消費方式を整理する"}</h3>

    <div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"特徴"}</th><th scope="col">{"向くケース"}</th></tr></thead><tbody><tr className="odd"><td>{"オンデマンド"}</td><td>{"使った分だけ課金。スロットリングあり"}</td><td>{"開発・変動トラフィック"}</td></tr><tr className="even"><td>{"クロスリージョン推論(推論プロファイル)"}</td><td>{"\n                                    複数リージョンへ自動ルーティングしスループット向上。追加のルーティング料金なし\n                                "}</td><td>{"スパイク耐性、リージョン内容量不足"}</td></tr><tr className="odd"><td>{"Provisioned Throughput"}</td><td>{"モデルユニットを確保。専用スループット"}</td><td>{"安定した大量トラフィック、カスタムモデルの推論"}</td></tr><tr className="even"><td>{"バッチ推論"}</td><td>{"非同期・大量処理"}</td><td>{"レポート生成、データ拡充などの夜間処理"}</td></tr></tbody></table></div>

    <Diagram id="chart-3" label="1.4 推論の消費方式を整理するの図解"/>

    <p>{"\n                    出典:\n                    "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html">{"Increase throughput with cross-Region inference"}</a>{"、"}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/inference-how.html">{"How inference works in Amazon Bedrock"}</a></p>

    <hr />

    </div>;
}
