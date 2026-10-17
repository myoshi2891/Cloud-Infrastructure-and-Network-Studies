import { Diagram } from '../Diagram';
/** 原本のtask2区分を全文・順序どおり保持する。 */
export default function Task42() { return <div className="guide-part" data-part="task2"><h2 id="task-42-アプリケーション性能の最適化" className="part" tabIndex={-1}>{" Task 4.2 アプリケーション性能の最適化 "}</h2>
{" "}
<h2 id="step-6-skill-421-応答性の高い-ai-システム" tabIndex={-1}>{" Step 6: Skill 4.2.1 応答性の高い AI システム "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: レイテンシとコストのトレードオフに対処し、FM を使ったユーザー体験を高める応答性の高い AI システムを作る (予測可能なクエリの事前計算、時間に敏感なアプリ向けの低レイテンシ Bedrock モデル、複雑なワークフロー向けの並列リクエスト、レスポンスストリーミング、性能ベンチマーク)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="6-1-レイテンシの内訳を知る" tabIndex={-1}>{"6-1. レイテンシの内訳を知る"}</h3>
{" "}
<p>{"「遅い」と感じる原因は 1 つではありません。まず分解します。"}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="6-1. レイテンシの内訳を知るの表 24">{" "}<table><thead><tr className="header"><th scope="col">{"区間"}</th><th scope="col">{"内容"}</th><th scope="col">{"主な改善手段"}</th></tr></thead><tbody><tr className="odd"><td>{"ネットワーク / 認証"}</td><td>{"クライアントから API までの往復"}</td><td>{"リージョンの近接、接続の再利用、VPC エンドポイント"}</td></tr><tr className="even"><td>{"前処理"}</td><td>{"検索、プロンプト組み立て、ガードレール"}</td><td>{"検索の最適化、並列化"}</td></tr><tr className="odd"><td>{"TTFT"}</td><td>{"最初のトークンが届くまで"}</td><td>{"低レイテンシモデル、プロンプトキャッシュ、入力の短縮"}</td></tr><tr className="even"><td>{"生成"}</td><td>{"出力トークン数 × 1 トークンあたりの時間"}</td><td>{"出力の短縮、小型モデル"}</td></tr><tr className="odd"><td>{"後処理"}</td><td>{"整形、ログ、保存"}</td><td>{"非同期化"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="6-2-5-つの手法" tabIndex={-1}>{"6-2. 5 つの手法"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="6-2. 5 つの手法の表 25">{" "}<table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"説明"}</th><th scope="col">{"効果が出る場面"}</th></tr></thead><tbody><tr className="odd"><td>{"事前計算 (プリコンピュート)"}</td><td>{" よくある質問や定期レポートを "}<strong>{"あらかじめ生成"}</strong>{" して保存し、実行時は取り出すだけにする "}</td><td>{"予測可能なクエリ。人気の質問、毎朝のサマリ"}</td></tr><tr className="even"><td>{"低レイテンシモデルの選択"}</td><td>{" 小型で高速なモデル、またはレイテンシ最適化推論 ("}<code>{"performanceConfig"}</code>{" で "}<code>{"optimized"}</code>{" を指定) を使う "}</td><td>{"対話型、リアルタイム支援"}</td></tr><tr className="odd"><td>{"並列リクエスト"}</td><td>{" 互いに依存しない複数の処理 (複数文書の要約、複数ツール呼び出し) を同時に実行 "}</td><td>{"複雑なワークフロー"}</td></tr><tr className="even"><td>{"レスポンスストリーミング"}</td><td>{"生成されたトークンを逐次クライアントへ流す"}</td><td>{"体感速度の改善 (全体時間は変わらなくても)"}</td></tr><tr className="odd"><td>{"性能ベンチマーク"}</td><td>{"p50、p95、p99 と TTFT を継続計測し、変更の前後で比較"}</td><td>{"改善の効果確認、劣化の検知"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" "}<strong>{"ストリーミングの要点"}</strong>{": ストリーミングは「合計時間を短くする」のではなく、「最初の文字が出るまでを短くして "}<strong>{"体感を改善する"}</strong>{"」手法です。試験では「ユーザー体験を改善」の文脈で選ぶ手法です。 "}</p>{" "}</blockquote>
{" "}
<blockquote>{" "}<p>{" "}<strong>{"レイテンシ最適化推論の注意"}</strong>{": この機能は、対応するモデルやリージョンが限られ、仕様も更新されます (ドキュメントでは当面プレビュー扱いの記載があり、クォータを超えると標準レイテンシで処理され、標準料金で課金される旨が書かれています)。利用前に最新の対応表を確認してください。 "}</p>{" "}</blockquote>
{" "}
<h3 id="6-3-ストリーミングの実装経路" tabIndex={-1}>{"6-3. ストリーミングの実装経路"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="6-3. ストリーミングの実装経路の表 26">{" "}<table><thead><tr className="header"><th scope="col">{"経路"}</th><th scope="col">{"使いどころ"}</th></tr></thead><tbody><tr className="odd"><td>{"Bedrock の ConverseStream / InvokeModelWithResponseStream"}</td><td>{"モデルからの逐次受信"}</td></tr><tr className="even"><td>{"Lambda のレスポンスストリーミング"}</td><td>{"サーバーレスでクライアントへ逐次返す"}</td></tr><tr className="odd"><td>{"API Gateway の WebSocket API"}</td><td>{"双方向のチャット UI"}</td></tr><tr className="even"><td>{"AWS AppSync のサブスクリプション"}</td><td>{"GraphQL ベースのリアルタイム更新"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-9" label="6-3. ストリーミングの実装経路" />
{" "}
<h3 id="6-4-並列化の例" tabIndex={-1}>{"6-4. 並列化の例"}</h3>
{" "}
<Diagram id="diag-10" label="6-4. 並列化の例" />
{" "}
<p>{" 直列だと 3 回分の時間がかかりますが、並列なら最も遅い 1 回分 + 統合の時間で済みます。ただし "}<strong>{"同時実行はクォータ (TPM、RPM) を消費する"}</strong>{" ので、スロットリングに注意します (Step 8)。Step Functions の Parallel / Map 状態や、アプリ側の非同期処理で実装できます。 "}</p>
{" "}
<h3 id="6-5-ベストプラクティス" tabIndex={-1}>{"6-5. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="6-5. ベストプラクティスの表 27">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" まず "}<strong>{"計測して遅い区間を特定"}</strong>{" してから対策を選ぶ "}</td><td>{"当てずっぽうの最適化は効果が薄い"}</td></tr><tr className="even"><td>{"2"}</td><td>{"対話 UI にはストリーミングを標準採用する"}</td><td>{"体感速度が大きく改善する"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"予測可能なクエリは事前計算して保存する"}</td><td>{"実行時の FM 呼び出しをゼロにできる"}</td></tr><tr className="even"><td>{"4"}</td><td>{" 時間に敏感な処理は小型 / 低レイテンシモデルを選び、重い処理は別経路に分離する "}</td><td>{"要件に合わせて使い分ける"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"依存関係のない処理は並列化する"}</td><td>{"全体の待ち時間を短縮"}</td></tr><tr className="even"><td>{"6"}</td><td>{"出力の長さを制限する"}</td><td>{"生成時間は出力トークン数に比例する"}</td></tr><tr className="odd"><td>{"7"}</td><td>{" レイテンシは平均ではなく "}<strong>{"p95 / p99"}</strong>{" で目標を決める "}</td><td>{"遅い尾の部分がユーザー不満の原因"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="6-6-試験の狙われどころ" tabIndex={-1}>{"6-6. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「ユーザー体験を改善し、待ち時間の不満を減らしたい」→ "}<strong>{"ストリーミング"}</strong>{"。 "}</li>{" "}<li>{"「毎日同じ時間に同じ種類のレポート」→ "}<strong>{"事前計算"}</strong>{"。"}</li>{" "}<li>{" 「独立した複数の FM 呼び出しがあり全体が遅い」→ "}<strong>{"並列化"}</strong>{"。 "}</li>{" "}<li>{" 「対話アプリで最速の応答が必要」→ "}<strong>{"低レイテンシモデル / レイテンシ最適化"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: Optimize model inference for latency / Amazon Bedrock ConverseStream (Step 22 を参照) "}</p>
{" "}
<h2 id="step-7-skill-422-検索-リトリーバル-性能の向上" tabIndex={-1}>{" Step 7: Skill 4.2.2 検索 (リトリーバル) 性能の向上 "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: FM のコンテキスト拡張のために、取得情報の関連性と速度を高める (インデックス最適化、クエリ前処理、カスタムスコアリングを使ったハイブリッド検索の実装)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="7-1-なぜ検索性能が重要か" tabIndex={-1}>{"7-1. なぜ検索性能が重要か"}</h3>
{" "}
<p>{" RAG の回答品質は、"}<strong>{"どの情報を FM に渡せたか"}</strong>{" でほぼ決まります。検索が遅ければ全体も遅くなり、検索が外れれば幻覚の原因になります。 "}</p>
{" "}
<h3 id="7-2-検索パイプラインの全体像" tabIndex={-1}>{"7-2. 検索パイプラインの全体像"}</h3>
{" "}
<Diagram id="diag-11" label="7-2. 検索パイプラインの全体像" />
{" "}
<h3 id="7-3-3-つの改善領域" tabIndex={-1}>{"7-3. 3 つの改善領域"}</h3>
{" "}
<h4 id="1-インデックス最適化" tabIndex={-1}>{"(1) インデックス最適化"}</h4>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="(1) インデックス最適化の表 28">{" "}<table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th><th scope="col">{"効果"}</th></tr></thead><tbody><tr className="odd"><td>{"チャンク戦略"}</td><td>{" サイズ、オーバーラップ、構造 (見出し単位や意味単位) を評価で決める "}</td><td>{"関連情報の取りこぼしと雑音の両方を減らす"}</td></tr><tr className="even"><td>{"ベクトル次元"}</td><td>{"次元数の小さい埋め込み設定を選ぶ (対応するモデルの場合)"}</td><td>{" ストレージとレイテンシを削減。精度とのトレードオフは評価で確認 "}</td></tr><tr className="odd"><td>{"ANN パラメータ (HNSW など)"}</td><td>{"検索時の探索幅や構築時のパラメータを調整する"}</td><td>{"精度と速度のバランスを調整"}</td></tr><tr className="even"><td>{"量子化"}</td><td>{"ベクトルを圧縮して保持する"}</td><td>{"メモリとコストを削減 (再現率への影響を評価)"}</td></tr><tr className="odd"><td>{"メタデータとフィルタ"}</td><td>{"属性 (部署、日付、文書種別) で候補を絞る"}</td><td>{"検索範囲を狭めて高速化し、関連性も向上"}</td></tr><tr className="even"><td>{"シャード / レプリカ設計"}</td><td>{"データ量と検索負荷に合わせる"}</td><td>{"検索スループットと可用性"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 id="2-クエリ前処理" tabIndex={-1}>{"(2) クエリ前処理"}</h4>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="(2) クエリ前処理の表 29">{" "}<table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"クエリ書き換え"}</td><td>{" 曖昧な質問や会話の文脈依存表現を、単独で意味の通る検索クエリに直す "}</td></tr><tr className="even"><td>{"クエリ分解"}</td><td>{"複合的な質問を複数のサブクエリに分けて検索する"}</td></tr><tr className="odd"><td>{"メタデータフィルタの抽出"}</td><td>{" 「2025 年の」「営業部の」といった条件を、フィルタとして自動で取り出す "}</td></tr><tr className="even"><td>{"正規化"}</td><td>{"表記揺れ、略語、不要語の整理"}</td></tr></tbody></table>{" "}</div>
{" "}
<h4 id="3-ハイブリッド検索とカスタムスコアリング" tabIndex={-1}>{" (3) ハイブリッド検索とカスタムスコアリング "}</h4>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="(3) ハイブリッド検索とカスタムスコアリングの表 30">{" "}<table><thead><tr className="header"><th scope="col">{"検索方式"}</th><th scope="col">{"得意"}</th><th scope="col">{"苦手"}</th></tr></thead><tbody><tr className="odd"><td>{"ベクトル (セマンティック) 検索"}</td><td>{"言い換え、意味の近さ"}</td><td>{"固有名詞、型番、コード、正確な語句"}</td></tr><tr className="even"><td>{"キーワード (語彙) 検索"}</td><td>{"固有名詞、型番、完全一致"}</td><td>{"言い換え、同義語"}</td></tr><tr className="odd"><td><strong>{"ハイブリッド"}</strong></td><td>{"両方の長所を組み合わせる"}</td><td>{"スコアの統合設計が必要"}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" ハイブリッド検索では、ベクトルとキーワードのスコアは "}<strong>{"尺度が異なる"}</strong>{" ため、正規化したうえで重み付けして統合します (これが「カスタムスコアリング」)。 "}</p>
{" "}
<ul>{" "}<li>{" Amazon Bedrock Knowledge Bases の取得設定には、検索タイプを "}<code>{"HYBRID"}</code>{" または "}<code>{"SEMANTIC"}</code>{" に上書きする項目があります。"}<strong>{"ハイブリッドは、フィルタ可能なテキストフィールドを持つ Amazon OpenSearch Serverless のベクトルストアで利用できる"}</strong>{" と説明されています (他の構成では SEMANTIC のみ)。 "}</li>{" "}<li>{" 取得結果には "}<strong>{"リランカーモデルによる再ランキング"}</strong>{" を設定できます。 "}</li>{" "}<li>{"取得件数 ("}<code>{"numberOfResults"}</code>{") も調整項目です。"}</li>{" "}<li>{" 自分で OpenSearch を運用する場合は、ハイブリッドクエリと検索パイプラインの正規化処理 (最小最大正規化など) や重み設定で、キーワードとベクトルの比率を調整できます。 "}</li>{" "}</ul>
{" "}
<h3 id="7-4-ベストプラクティス" tabIndex={-1}>{"7-4. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="7-4. ベストプラクティスの表 31">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" 型番、固有名詞、略語が多い文書では "}<strong>{"ハイブリッド検索"}</strong>{" を使う "}</td><td>{"ベクトル検索だけでは外しやすい"}</td></tr><tr className="even"><td>{"2"}</td><td>{" 検索後に "}<strong>{"再ランキング"}</strong>{" して上位だけを FM に渡す "}</td><td>{"精度向上とトークン削減を同時に達成"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"メタデータでフィルタし、検索範囲を絞る"}</td><td>{"速度と関連性の向上、アクセス制御にも有効"}</td></tr><tr className="even"><td>{"4"}</td><td>{"検索の評価指標 (再現率、適合率、順位指標) を定義して測る"}</td><td>{"改善効果を数値で確認"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"チャンクサイズは文書種別ごとに実験で決める"}</td><td>{"万能な値はない"}</td></tr><tr className="even"><td>{"6"}</td><td>{" 埋め込みモデルを変えたら "}<strong>{"再インデックス"}</strong>{" する "}</td><td>{"異なるモデルのベクトルは比較できない"}</td></tr><tr className="odd"><td>{"7"}</td><td>{"検索の遅延と品質の両方を監視する"}</td><td>{"片方だけでは劣化に気づけない"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="7-5-試験の狙われどころ" tabIndex={-1}>{"7-5. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「製品型番や固有名詞の検索精度が低い」→ "}<strong>{"ハイブリッド検索 (キーワード + ベクトル)"}</strong>{"。 "}</li>{" "}<li>{"「検索結果の順位を改善したい」→ "}<strong>{"再ランキング"}</strong>{"。"}</li>{" "}<li>{"「曖昧な質問で取得が外れる」→ "}<strong>{"クエリ書き換え / 分解"}</strong>{"。"}</li>{" "}<li>{" 「検索が遅い」→ "}<strong>{"インデックス最適化 (メタデータフィルタ、量子化、パラメータ調整、シャード設計)"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: Amazon Bedrock Knowledge Bases の取得設定 API リファレンス / Amazon OpenSearch Service ハイブリッド検索 (Step 22 を参照) "}</p>
{" "}
<h2 id="step-8-skill-423-fm-スループットの最適化" tabIndex={-1}>{" Step 8: Skill 4.2.3 FM スループットの最適化 "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: GenAI ワークロード特有のスループット課題に対処する (トークン処理の最適化、バッチ推論戦略、同時モデル呼び出しの管理)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="8-1-genai-特有のスループット課題" tabIndex={-1}>{"8-1. GenAI 特有のスループット課題"}</h3>
{" "}
<p>{" 従来の API と違い、GenAI の呼び出しは「"}<strong>{"1 件ごとの重さ (トークン数) が大きく不均一"}</strong>{"」で「"}<strong>{"処理時間が長い"}</strong>{"」ため、リクエスト数だけでなくトークン量で制限されます。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="8-1. GenAI 特有のスループット課題の表 32">{" "}<table><thead><tr className="header"><th scope="col">{"課題"}</th><th scope="col">{"原因"}</th><th scope="col">{"対策"}</th></tr></thead><tbody><tr className="odd"><td>{"スロットリング (HTTP 429)"}</td><td>{"RPM または TPM のクォータ超過"}</td><td>{" 再試行、キュー、クロスリージョン推論、クォータ引き上げ、Provisioned Throughput "}</td></tr><tr className="even"><td>{"長い処理時間による同時実行の枯渇"}</td><td>{"生成に数秒から数十秒かかる"}</td><td>{"同時実行数の制御、非同期化"}</td></tr><tr className="odd"><td>{"突発的なスパイク"}</td><td>{"業務の山、イベント"}</td><td>{"キューで平準化、事前スケール"}</td></tr><tr className="even"><td>{"クォータの無駄な消費"}</td><td><code>{"maxTokens"}</code>{" が過大、不要な再試行"}</td><td><code>{"maxTokens"}</code>{" の適正化、冪等な再試行"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="8-2-3-つの最適化領域" tabIndex={-1}>{"8-2. 3 つの最適化領域"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="8-2. 3 つの最適化領域の表 33">{" "}<table><thead><tr className="header"><th scope="col">{"領域"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"トークン処理の最適化"}</td><td>{" 入力と出力のトークンを減らす (Step 2)、キャッシュを使う (Step 5)、"}<code>{"maxTokens"}</code>{" を現実的な値にする "}</td></tr><tr className="even"><td>{"バッチ推論戦略"}</td><td>{" 急がない処理を Bedrock のバッチ推論や SQS と組み合わせて処理 (Step 4) "}</td></tr><tr className="odd"><td>{"同時呼び出しの管理"}</td><td>{" セマフォなどで同時数を上限化し、バックオフ付き再試行、キューによる平準化、クロスリージョン推論 "}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" Bedrock のスケーリングとスループットのドキュメントでは、"}<strong>{"bedrock-runtime エンドポイントではモデルが対応していればクロスリージョン推論を使い、予測可能で持続的な負荷には Provisioned Throughput を検討する"}</strong>{" ことが推奨されています。 "}</p>{" "}</blockquote>
{" "}
<h3 id="8-3-スロットリング対策のフロー" tabIndex={-1}>{"8-3. スロットリング対策のフロー"}</h3>
{" "}
<Diagram id="diag-12" label="8-3. スロットリング対策のフロー" />
{" "}
<p>{" "}<strong>{"ジッター (ランダムな揺らぎ)"}</strong>{" を加える理由: 多数のクライアントが同じタイミングで再試行すると、再び同時にぶつかるためです。 "}</p>
{" "}
<h3 id="8-4-同時実行管理のパターン" tabIndex={-1}>{"8-4. 同時実行管理のパターン"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="8-4. 同時実行管理のパターンの表 34">{" "}<table><thead><tr className="header"><th scope="col">{"パターン"}</th><th scope="col">{"しくみ"}</th><th scope="col">{"適する場面"}</th></tr></thead><tbody><tr className="odd"><td>{"アプリ内セマフォ"}</td><td>{"同時に実行する FM 呼び出し数を上限化"}</td><td>{"1 プロセス内の並列処理"}</td></tr><tr className="even"><td>{"SQS + Lambda (最大同時実行数の設定)"}</td><td>{"キューで受け、消費側の並列数でクォータを守る"}</td><td>{"非同期処理、スパイク吸収"}</td></tr><tr className="odd"><td>{"Step Functions Map の最大同時実行数"}</td><td>{"大量アイテムの並列度を制御"}</td><td>{"バッチ的処理"}</td></tr><tr className="even"><td>{"クロスリージョン推論プロファイル"}</td><td>{"複数リージョンに分散して容量を確保"}</td><td>{"ピーク時の 429 対策"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="8-5-ベストプラクティス" tabIndex={-1}>{"8-5. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="8-5. ベストプラクティスの表 35">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" 429 には "}<strong>{"指数バックオフ + ジッター"}</strong>{" で再試行する "}</td><td>{"同時衝突を避ける"}</td></tr><tr className="even"><td>{"2"}</td><td>{"同時実行数に上限を設けて、クォータ内に収める"}</td><td>{"自分で自分を詰まらせない"}</td></tr><tr className="odd"><td>{"3"}</td><td><code>{"maxTokens"}</code>{" を必要最小限に設定する"}</td><td>{"クォータの予約消費を抑えられる (モデルの仕様を確認)"}</td></tr><tr className="even"><td>{"4"}</td><td>{"スロットリング数を CloudWatch で監視し、アラームを設定"}</td><td>{"容量不足の早期検知"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"非リアルタイム処理はバッチ推論に移す"}</td><td>{"オンデマンドのクォータをリアルタイム用に残せる"}</td></tr><tr className="even"><td>{"6"}</td><td>{" 恒常的な不足にはクォータ引き上げ申請か Provisioned Throughput "}</td><td>{"再試行だけでは根本解決にならない"}</td></tr><tr className="odd"><td>{"7"}</td><td>{"冪等性を確保して再試行による二重処理を防ぐ"}</td><td>{"重複課金や重複実行の回避"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="8-6-試験の狙われどころ" tabIndex={-1}>{"8-6. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「ピーク時に ThrottlingException が出る」→ "}<strong>{"指数バックオフ、クロスリージョン推論、キューによる平準化"}</strong>{" (まず低コストな対策)。恒常的なら Provisioned Throughput。 "}</li>{" "}<li>{"「数万件の文書を一括処理」→ "}<strong>{"バッチ推論"}</strong>{"。"}</li>{" "}<li>{" 「同時実行を制御してクォータ内に収めたい」→ "}<strong>{"SQS + Lambda の同時実行上限 / Step Functions Map の同時実行数"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: Amazon Bedrock Scaling and throughput best practices / 実務解説記事 (Step 22 を参照) "}</p>
{" "}
<h2 id="step-9-skill-424-fm-性能の調整-パラメータと-ab-テスト" tabIndex={-1}>{" Step 9: Skill 4.2.4 FM 性能の調整 (パラメータと A/B テスト) "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: 特定のユースケースで最適な結果を出すために FM の性能を高める (モデル固有のパラメータ設定、改善を評価する A/B テスト、要件に基づく temperature と top-k / top-p の選択)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="9-1-主要な推論パラメータ" tabIndex={-1}>{"9-1. 主要な推論パラメータ"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="9-1. 主要な推論パラメータの表 36">{" "}<table><thead><tr className="header"><th scope="col">{"パラメータ"}</th><th scope="col">{"働き"}</th><th scope="col">{"値を下げると"}</th><th scope="col">{"値を上げると"}</th></tr></thead><tbody><tr className="odd"><td>{"temperature"}</td><td>{"出力のランダム性"}</td><td>{"決定的で一貫した出力"}</td><td>{"多様で創造的な出力 (ばらつきも増える)"}</td></tr><tr className="even"><td>{"top-p (nucleus)"}</td><td>{"累積確率が p に達するまでの候補から選ぶ"}</td><td>{"候補が絞られ安定"}</td><td>{"候補が広がり多様"}</td></tr><tr className="odd"><td>{"top-k"}</td><td>{"確率上位 k 個の候補から選ぶ"}</td><td>{"候補が絞られ安定"}</td><td>{"候補が広がり多様"}</td></tr><tr className="even"><td>{"maxTokens"}</td><td>{"出力の最大長"}</td><td>{"短く切れる (途中で終わることも)"}</td><td>{"長い出力を許容 (コスト増)"}</td></tr><tr className="odd"><td>{"stopSequences"}</td><td>{"指定の文字列で生成を停止"}</td><td>{"-"}</td><td>{"-"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" top-k は "}<strong>{"モデル固有"}</strong>{" の項目で、Converse API では共通の "}<code>{"inferenceConfig"}</code>{" ではなく、モデル固有の追加フィールドで渡す場合があります。モデルごとのパラメータ仕様を確認する必要があります (これが「モデル固有のパラメータ設定」の意味です)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="9-2-用途別の設定の考え方" tabIndex={-1}>{"9-2. 用途別の設定の考え方"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="9-2. 用途別の設定の考え方の表 37">{" "}<table><thead><tr className="header"><th scope="col">{"用途"}</th><th scope="col">{"方向性"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"事実ベースの Q&A、RAG 回答"}</td><td>{"temperature を低く"}</td><td>{"一貫性と正確性を優先し、幻覚を抑える"}</td></tr><tr className="even"><td>{"抽出、分類、構造化出力 (JSON)"}</td><td>{"temperature を低く (ほぼ 0)"}</td><td>{"形式の安定が重要"}</td></tr><tr className="odd"><td>{"コード生成"}</td><td>{"低めから中程度"}</td><td>{"正確さが重要だが、解の探索も必要な場合あり"}</td></tr><tr className="even"><td>{"ブレインストーミング、コピー案"}</td><td>{"temperature を高めに"}</td><td>{"多様性が価値になる"}</td></tr><tr className="odd"><td>{"要約"}</td><td>{"低めから中程度"}</td><td>{"忠実さを保つ"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" "}<strong>{"原則"}</strong>{": temperature と top-p の "}<strong>{"両方を同時に大きく変えない"}</strong>{"。1 つずつ変えて効果を確認します (多くのモデルのガイダンスで、どちらか一方の調整が推奨されています)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="9-3-ab-テストの進め方" tabIndex={-1}>{"9-3. A/B テストの進め方"}</h3>
{" "}
<Diagram id="diag-13" label="9-3. A/B テストの進め方" />
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="9-3. A/B テストの進め方の表 38">{" "}<table><thead><tr className="header"><th scope="col">{"実装要素"}</th><th scope="col">{"候補"}</th></tr></thead><tbody><tr className="odd"><td>{"プロンプトのバージョン管理"}</td><td>{"Amazon Bedrock Prompt Management (バージョン)"}</td></tr><tr className="even"><td>{"トラフィック分割"}</td><td>{" アプリ側の振り分け、AWS AppConfig の機能フラグ、API Gateway / Lambda のエイリアスによる重み付け "}</td></tr><tr className="odd"><td>{"オフライン評価"}</td><td>{" Amazon Bedrock の評価機能 (モデル評価、RAG 評価)、ゴールデンデータセット "}</td></tr><tr className="even"><td>{"オンライン指標"}</td><td>{" CloudWatch カスタムメトリクス (ユーザーフィードバック、解決率、遅延、コスト) "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="9-4-ベストプラクティス" tabIndex={-1}>{"9-4. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="9-4. ベストプラクティスの表 39">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td><strong>{"1 回に 1 つの変数"}</strong>{" だけを変えて比較する"}</td><td>{"効果の原因を特定できる"}</td></tr><tr className="even"><td>{"2"}</td><td>{" 先に "}<strong>{"成功指標とガードレール指標"}</strong>{" (品質が落ちていないか) を定義する "}</td><td>{"後付けの解釈を避ける"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"十分なサンプル数で比較し、偶然の差を見分ける"}</td><td>{"少数の結果で判断しない"}</td></tr><tr className="even"><td>{"4"}</td><td>{" プロンプトとパラメータをバージョン管理し、結果と紐づけて記録する "}</td><td>{"再現性と巻き戻しが可能"}</td></tr><tr className="odd"><td>{"5"}</td><td>{" まずオフライン (ゴールデンデータセット) で絞り、有望なものだけオンライン A/B に進める "}</td><td>{"本番ユーザーへの影響を最小化"}</td></tr><tr className="even"><td>{"6"}</td><td>{"モデル更新時は、同じ評価セットで回帰テストをする"}</td><td>{"新モデルでの品質低下を検知"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="9-5-試験の狙われどころ" tabIndex={-1}>{"9-5. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{"「事実に基づく一貫した回答」→ "}<strong>{"temperature を低く"}</strong>{"。"}</li>{" "}<li>{"「より創造的な案がほしい」→ "}<strong>{"temperature を高めに"}</strong>{"。"}</li>{" "}<li>{" 「改善が本当に効果あるか確かめたい」→ "}<strong>{"A/B テスト (指標を定義し、トラフィックを分割)"}</strong>{"。 "}</li>{" "}<li>{" 「プロンプトの版を管理し比較」→ "}<strong>{"Bedrock Prompt Management"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: Amazon Bedrock Inference parameters / Prompt Management / Evaluations (Step 22 を参照) "}</p>
{" "}
<h2 id="step-10-skill-425-fm-ワークロード向けリソース配分" tabIndex={-1}>{" Step 10: Skill 4.2.5 FM ワークロード向けリソース配分 "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: FM ワークロードに特化した効率的なリソース配分システムを作る (トークン処理要件に基づく容量計画、プロンプトと補完のパターンの使用率モニタリング、GenAI のトラフィックパターンに最適化したオートスケーリング)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="10-1-従来のスケーリングとの違い" tabIndex={-1}>{"10-1. 従来のスケーリングとの違い"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="10-1. 従来のスケーリングとの違いの表 40">{" "}<table><thead><tr className="header"><th scope="col">{"観点"}</th><th scope="col">{"従来の Web アプリ"}</th><th scope="col">{"GenAI アプリ"}</th></tr></thead><tbody><tr className="odd"><td>{"負荷の単位"}</td><td>{"リクエスト数、CPU"}</td><td><strong>{"トークン量"}</strong>{"、同時生成数"}</td></tr><tr className="even"><td>{"1 件の処理時間"}</td><td>{"ミリ秒から数百ミリ秒"}</td><td>{"数秒から数十秒 (ストリーミング接続が長く続く)"}</td></tr><tr className="odd"><td>{"ボトルネック"}</td><td>{"アプリの CPU やメモリ"}</td><td><strong>{"FM のクォータ"}</strong>{"、外部呼び出しの待ち"}</td></tr><tr className="even"><td>{"スケール指標"}</td><td>{"CPU 使用率"}</td><td><strong>{"キュー長、同時実行数、トークン消費率"}</strong></td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" アプリ側は「FM の応答待ち」で止まっていることが多く、CPU 使用率はほとんど上がりません。そのため "}<strong>{"CPU ベースのオートスケーリングは効きにくい"}</strong>{" のがポイントです。 "}</p>{" "}</blockquote>
{" "}
<h3 id="10-2-容量計画-トークン処理量から逆算する" tabIndex={-1}>{" 10-2. 容量計画: トークン処理量から逆算する "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="10-2. 容量計画: トークン処理量から逆算するの表 41">{" "}<table><thead><tr className="header"><th scope="col">{"手順"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{"機能ごとに、平均入力トークンと平均出力トークンを実測する"}</td></tr><tr className="even"><td>{"2"}</td><td>{"ピーク時の毎分リクエスト数を見積もる"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"機能ごとのピーク TPM を合算する"}</td></tr><tr className="even"><td>{"4"}</td><td>{" クォータ、Provisioned Throughput、クロスリージョン推論のどれで賄うか決める "}</td></tr><tr className="odd"><td>{"5"}</td><td>{" 余裕度 (ヘッドルーム) を持たせ、成長を見込んで定期的に見直す "}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="10-3-使用率モニタリング-プロンプトと補完のパターン" tabIndex={-1}>{" 10-3. 使用率モニタリング: プロンプトと補完のパターン "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="10-3. 使用率モニタリング: プロンプトと補完のパターンの表 42">{" "}<table><thead><tr className="header"><th scope="col">{"観察する指標"}</th><th scope="col">{"わかること"}</th><th scope="col">{"打つ手"}</th></tr></thead><tbody><tr className="odd"><td>{"入力トークン対出力トークンの比"}</td><td>{"入力過多 (長い文脈) か 出力過多 (冗長) か"}</td><td>{"入力過多なら剪定とキャッシュ、出力過多なら制限"}</td></tr><tr className="even"><td>{"機能別、テナント別のトークン消費"}</td><td>{"コストとクォータを使っている主体"}</td><td>{"配分の調整、課金や上限の設定"}</td></tr><tr className="odd"><td>{"時間帯別の分布"}</td><td>{"ピークと谷"}</td><td>{"スケジュールスケーリング、バッチの時間帯移動"}</td></tr><tr className="even"><td>{"スロットリング率"}</td><td>{"容量不足の兆候"}</td><td>{"容量追加、平準化"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="10-4-genai-のトラフィックに合うスケーリング構成" tabIndex={-1}>{" 10-4. GenAI のトラフィックに合うスケーリング構成 "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="10-4. GenAI のトラフィックに合うスケーリング構成の表 43">{" "}<table><thead><tr className="header"><th scope="col">{"構成要素"}</th><th scope="col">{"スケーリング方法"}</th></tr></thead><tbody><tr className="odd"><td>{"Lambda"}</td><td>{" 同時実行数の予約 / 上限で FM クォータを守る。長い処理はタイムアウトに注意 "}</td></tr><tr className="even"><td>{"ECS / Fargate"}</td><td>{" キュー長や同時接続数などの "}<strong>{"カスタムメトリクス"}</strong>{" でスケール (ターゲット追跡) "}</td></tr><tr className="odd"><td>{"SQS + ワーカー"}</td><td>{"キューの深さ (処理待ち件数) に比例してワーカーを増減"}</td></tr><tr className="even"><td>{"Bedrock (オンデマンド)"}</td><td>{"アプリ側ではなく、クォータと推論プロファイルで管理"}</td></tr><tr className="odd"><td>{"Provisioned Throughput"}</td><td>{"モデルユニット数で容量を調整 (すぐに増減できない前提で計画)"}</td></tr><tr className="even"><td>{"自己ホスト (SageMaker AI のエンドポイントなど)"}</td><td>{" Application Auto Scaling で、同時リクエスト数などの指標でスケール "}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-14" label="10-4. GenAI のトラフィックに合うスケーリング構成" />
{" "}
<h3 id="10-5-ベストプラクティス" tabIndex={-1}>{"10-5. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="10-5. ベストプラクティスの表 44">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" スケール指標を "}<strong>{"キュー長や同時実行数"}</strong>{" にする (CPU 一辺倒にしない) "}</td><td>{"FM 待ちでは CPU が上がらない"}</td></tr><tr className="even"><td>{"2"}</td><td>{" ワーカーの増加が "}<strong>{"FM のクォータを超えない"}</strong>{" ように上限を設ける "}</td><td>{"スケールアウトが 429 を悪化させる"}</td></tr><tr className="odd"><td>{"3"}</td><td>{" 需要の予測できる山には "}<strong>{"スケジュールスケーリング"}</strong>{" を使う "}</td><td>{"スパイクに事前対応できる"}</td></tr><tr className="even"><td>{"4"}</td><td>{"容量計画を定期的に見直す (機能追加、プロンプト長の変化)"}</td><td>{"平均トークン数は変わりやすい"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"非同期化できる処理は非同期化する"}</td><td>{"同時接続数とタイムアウトの問題を緩和"}</td></tr><tr className="even"><td>{"6"}</td><td>{"機能別のトークン配分や上限 (クォータ分配) を設計する"}</td><td>{"1 機能が全体の容量を食いつぶさない"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="10-6-試験の狙われどころ" tabIndex={-1}>{"10-6. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「GenAI アプリのオートスケーリング」→ "}<strong>{"CPU ではなく、キュー長 / 同時実行数 / カスタムメトリクス"}</strong>{" が正解の方向。 "}</li>{" "}<li>{" 「ワーカーを増やしたら 429 が増えた」→ "}<strong>{"FM クォータを考慮した上限設定"}</strong>{"。 "}</li>{" "}<li>{" 「毎朝 9 時にスパイク」→ "}<strong>{"スケジュールスケーリング / 事前確保"}</strong>{"。 "}</li>{" "}</ul>
{" "}
<p>{" 出典: Amazon Bedrock Scaling and throughput best practices / Application Auto Scaling (Step 22 を参照) "}</p>
{" "}
<h2 id="step-11-skill-426-genai-ワークフロー全体の最適化" tabIndex={-1}>{" Step 11: Skill 4.2.6 GenAI ワークフロー全体の最適化 "}</h2>
{" "}
<blockquote>{" "}<p>{" 公式 Skill: GenAI ワークフロー全体で FM システムの性能を最適化する (プロンプトと補完パターンの API 呼び出しプロファイリング、検索拡張のためのベクトルデータベースのクエリ最適化、LLM 推論特有のレイテンシ削減技術、効率的なサービス間通信パターン)。 "}</p>{" "}</blockquote>
{" "}
<h3 id="11-1-部分最適から全体最適へ" tabIndex={-1}>{"11-1. 部分最適から全体最適へ"}</h3>
{" "}
<p>{" ここまでは個々の手法でしたが、実際のアプリは「"}<strong>{"認証 → ガードレール → 検索 → プロンプト生成 → FM → 後処理 → 保存"}</strong>{"」という複数ステップの連鎖です。全体の時間とコストは "}<strong>{"最も遅いステップ"}</strong>{" と "}<strong>{"ステップ間の無駄"}</strong>{" で決まります。 "}</p>
{" "}
<h3 id="11-2-4-つの観点" tabIndex={-1}>{"11-2. 4 つの観点"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="11-2. 4 つの観点の表 45">{" "}<table><thead><tr className="header"><th scope="col">{"観点"}</th><th scope="col">{"やること"}</th><th scope="col">{"ツールや手法"}</th></tr></thead><tbody><tr className="odd"><td>{"API 呼び出しのプロファイリング"}</td><td>{" 各呼び出しの所要時間、入力と出力のトークン数、エラーを計測する "}</td><td>{" AWS X-Ray や OpenTelemetry (ADOT) のスパン、CloudWatch の GenAI 可観測性 "}</td></tr><tr className="even"><td>{"ベクトル DB のクエリ最適化"}</td><td>{" 検索の遅延を分析し、フィルタ、インデックス設定、取得件数を調整する "}</td><td>{"OpenSearch のスロークエリ分析、Step 7 の手法"}</td></tr><tr className="odd"><td>{"LLM 推論特有のレイテンシ削減"}</td><td>{" 出力短縮、プロンプトキャッシュ、小型モデル、ストリーミング、不要な連鎖の削除 "}</td><td>{"Step 5 と Step 6 の手法"}</td></tr><tr className="even"><td>{"サービス間通信の効率化"}</td><td>{"呼び出し回数と待ちを減らす"}</td><td>{"下表"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="11-3-サービス間通信の最適化" tabIndex={-1}>{"11-3. サービス間通信の最適化"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="11-3. サービス間通信の最適化の表 46">{" "}<table><thead><tr className="header"><th scope="col">{"課題"}</th><th scope="col">{"改善"}</th></tr></thead><tbody><tr className="odd"><td>{"ステップが直列で遅い"}</td><td>{" 依存関係のない処理は並列化 (Step Functions の Parallel など) "}</td></tr><tr className="even"><td>{"小さな呼び出しを大量に行う (おしゃべりな通信)"}</td><td>{"まとめて 1 回で処理する、バッチ化する"}</td></tr><tr className="odd"><td>{"接続のたびに確立し直す"}</td><td>{"SDK クライアントを再利用し、接続を維持する"}</td></tr><tr className="even"><td>{"同期で待つ必要のない処理"}</td><td>{" EventBridge や SQS で "}<strong>{"非同期化"}</strong>{" (ログ、保存、通知) "}</td></tr><tr className="odd"><td>{"不要なネットワーク経路"}</td><td>{" VPC エンドポイント (PrivateLink) でインターネット経由を避ける。リージョンを近接させる "}</td></tr><tr className="even"><td>{"ペイロードが大きい"}</td><td>{"必要な情報だけを渡し、大きなデータは S3 参照にする"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="11-4-最適化前後のイメージ" tabIndex={-1}>{"11-4. 最適化前後のイメージ"}</h3>
{" "}
<Diagram id="diag-15" label="11-4. 最適化前後のイメージ" />
{" "}
<Diagram id="diag-16" label="11-4. 最適化前後のイメージ" />
{" "}
<h3 id="11-5-改善の進め方-プロファイル--仮説--検証" tabIndex={-1}>{" 11-5. 改善の進め方 (プロファイル → 仮説 → 検証) "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="11-5. 改善の進め方 (プロファイル → 仮説 → 検証)の表 47">{" "}<table><thead><tr className="header"><th scope="col">{"手順"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{"トレースで全体の時間内訳を可視化する"}</td></tr><tr className="even"><td>{"2"}</td><td>{"もっとも時間かコストを使っているステップを特定する"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"そのステップに対応する手法を選ぶ (表 11-2)"}</td></tr><tr className="even"><td>{"4"}</td><td>{" 変更前後を "}<strong>{"同じ条件のベンチマーク"}</strong>{" で比較する "}</td></tr><tr className="odd"><td>{"5"}</td><td>{"品質が落ちていないかゴールデンデータセットで確認する"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="11-6-ベストプラクティス" tabIndex={-1}>{"11-6. ベストプラクティス"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="11-6. ベストプラクティスの表 48">{" "}<table><thead><tr className="header"><th scope="col">{"#"}</th><th scope="col">{"ベストプラクティス"}</th><th scope="col">{"理由"}</th></tr></thead><tbody><tr className="odd"><td>{"1"}</td><td>{" 各ステップにトレース ID を通し、"}<strong>{"エンドツーエンドで計測"}</strong>{" する "}</td><td>{"部分的な計測では真のボトルネックが見えない"}</td></tr><tr className="even"><td>{"2"}</td><td>{"最適化は "}<strong>{"ボトルネックから"}</strong>{" 着手する"}</td><td>{"速いところを磨いても全体は速くならない"}</td></tr><tr className="odd"><td>{"3"}</td><td>{"同期が必須でない処理は非同期にする"}</td><td>{"ユーザーの待ち時間を減らす"}</td></tr><tr className="even"><td>{"4"}</td><td>{"SDK クライアントは再利用する"}</td><td>{"接続確立のオーバーヘッドを減らす"}</td></tr><tr className="odd"><td>{"5"}</td><td>{"不要な LLM 呼び出し (連鎖の中の冗長な呼び出し) を削る"}</td><td>{"遅延とコストの両方を削減"}</td></tr><tr className="even"><td>{"6"}</td><td>{"変更のたびに品質評価を回す"}</td><td>{"速くなったが精度が落ちた、を防ぐ"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="11-7-試験の狙われどころ" tabIndex={-1}>{"11-7. 試験の狙われどころ"}</h3>
{" "}
<ul>{" "}<li>{" 「どのステップが遅いのか分からない」→ "}<strong>{"分散トレーシング (X-Ray / OpenTelemetry) によるプロファイリング"}</strong>{"。 "}</li>{" "}<li>{"「複数の独立した呼び出しで遅い」→ "}<strong>{"並列化"}</strong>{"。"}</li>{" "}<li>{"「ログ保存で応答が遅れる」→ "}<strong>{"非同期化"}</strong>{"。"}</li>{" "}</ul>
{" "}
<p>{" 出典: CloudWatch Generative AI observability / AWS X-Ray / AWS Step Functions (Step 22 を参照) "}</p>
{" "}</div>; }
