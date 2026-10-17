import { Diagram } from '../Diagram';
/** 原本のfoundation区分を全文・順序どおり保持する。 */
export default function Foundation() { return <div className="guide-part" data-part="foundation">{" "}
<div className="hero">{" "}<div className="kicker">{" AWS Certified Generative AI Developer - Professional (AIP-C01) · Domain 4 "}</div>{" "}<h1>{" Content Domain 4: Operational Efficiency and Optimization for GenAI Applications 初学者向け ステップバイステップ解説ガイド "}</h1>{" "}<div className="meta-row">{" "}<span className="pill">{"配点 "}<strong>{"12%"}</strong></span>{" "}<span className="pill">{"対象 "}<strong>{"初学者向け"}</strong></span>{" "}<span className="pill">{"図解 "}<strong>{"Mermaid 22点"}</strong></span>{" "}<span className="pill">{"参考文献 "}<strong>{"36件"}</strong></span>{" "}</div>{" "}</div>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="Domain 4の表 1">{" "}<table><thead><tr className="header"><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"対象試験"}</td><td>{" AWS Certified Generative AI Developer - Professional (AIP-C01) "}</td></tr><tr className="even"><td>{"対象ドメイン"}</td><td>{" Content Domain 4: Operational Efficiency and Optimization for GenAI Applications "}</td></tr><tr className="odd"><td>{"出題比率"}</td><td>{"12% of scored content"}</td></tr><tr className="even"><td>{"構成"}</td><td>{"3 Task / 16 Skill"}</td></tr><tr className="odd"><td>{"作成日"}</td><td>{"2026-10-09"}</td></tr><tr className="even"><td>{"一次情報"}</td><td>{"AWS 公式 試験ガイド (Domain 4 ページ)"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p><strong>{"このガイドの読み方"}</strong></p>{" "}<ol>{" "}<li>{" まず Step 0 と Step 1 で「全体像」と「3 つの最適化レバー」をつかみます。 "}</li>{" "}<li>{" Step 2 以降は、公式試験ガイドの Skill 1 つにつき 1 Step で、「何か」「なぜ重要か」「仕組み」「ベストプラクティス」「試験の狙われどころ」の順に説明します。 "}</li>{" "}<li>{" 最後に、サービス選択表、試験の罠、練習問題、チートシート、参考 URL をまとめています。 "}</li>{" "}</ol>{" "}<p><strong>{"信頼性に関する注意"}</strong></p>{" "}<ul>{" "}<li>{" 公式試験ガイドの Skill 文言は、2026-10-09 に取得した Domain 4 ページに基づきます。 "}</li>{" "}<li>{" サービスの仕様、対応モデル、料金、クォータは頻繁に変わります。数値や対応モデルは「考え方の例」として読み、最終確認は公式ドキュメントで行ってください。 "}</li>{" "}<li>{" 参考 URL は「今回の調査で実際に内容を確認できたもの」と「既知のパスで未確認のもの」を区別して、最終章に表示しています。 "}</li>{" "}</ul>{" "}</blockquote>
{" "}
<h2 id="step-0-domain-4-の全体像" tabIndex={-1}>{"Step 0: Domain 4 の全体像"}</h2>
{" "}
<h3 id="0-1-このドメインで問われること" tabIndex={-1}>{"0-1. このドメインで問われること"}</h3>
{" "}
<p>{" Domain 4 は、「動く GenAI アプリ」を "}<strong>{"安く・速く・安定して・見える状態で"}</strong>{" 運用するための知識を問います。配点は 12% と小さめですが、Domain 1 から 3 で作った仕組みを本番運用で磨く内容なので、他ドメインの問題にも関連語として頻出します。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="0-1. このドメインで問われることの表 2">{" "}<table><thead><tr className="header"><th scope="col">{"Task"}</th><th scope="col">{"テーマ"}</th><th scope="col">{"Skill 数"}</th><th scope="col">{"一言でいうと"}</th></tr></thead><tbody><tr className="odd"><td>{"4.1"}</td><td>{"コスト最適化とリソース効率"}</td><td>{"4"}</td><td>{"無駄なトークンと無駄な呼び出しを減らす"}</td></tr><tr className="even"><td>{"4.2"}</td><td>{"アプリケーション性能の最適化"}</td><td>{"6"}</td><td>{"速く、たくさん、的確に答えさせる"}</td></tr><tr className="odd"><td>{"4.3"}</td><td>{"GenAI アプリのモニタリング"}</td><td>{"6"}</td><td>{"何が起きているか見えるようにして、早く直す"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="0-2-16-skill-の一覧" tabIndex={-1}>{"0-2. 16 Skill の一覧"}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="0-2. 16 Skill の一覧の表 3">{" "}<table><thead><tr className="header"><th scope="col">{"Skill"}</th><th scope="col">{"一言要約"}</th><th scope="col">{"代表的なキーワード"}</th></tr></thead><tbody><tr className="odd"><td>{"4.1.1"}</td><td>{"トークン効率化"}</td><td>{" トークン推定、コンテキスト最適化、プロンプト圧縮、max tokens "}</td></tr><tr className="even"><td>{"4.1.2"}</td><td>{"モデル選択フレームワーク"}</td><td>{"階層化、ルーティング、価格性能比"}</td></tr><tr className="odd"><td>{"4.1.3"}</td><td>{"高スループットな FM システム"}</td><td>{"バッチ、容量計画、Provisioned Throughput"}</td></tr><tr className="even"><td>{"4.1.4"}</td><td>{"キャッシュ"}</td><td>{"セマンティックキャッシュ、プロンプトキャッシュ、ハッシュ化"}</td></tr><tr className="odd"><td>{"4.2.1"}</td><td>{"応答性"}</td><td>{"ストリーミング、並列化、事前計算、低レイテンシモデル"}</td></tr><tr className="even"><td>{"4.2.2"}</td><td>{"検索性能"}</td><td>{"インデックス最適化、クエリ前処理、ハイブリッド検索"}</td></tr><tr className="odd"><td>{"4.2.3"}</td><td>{"スループット最適化"}</td><td>{"バッチ推論、同時実行制御、スロットリング対策"}</td></tr><tr className="even"><td>{"4.2.4"}</td><td>{"FM 性能調整"}</td><td>{"temperature、top-p、top-k、A/B テスト"}</td></tr><tr className="odd"><td>{"4.2.5"}</td><td>{"リソース配分"}</td><td>{"トークン量ベースの容量計画、オートスケーリング"}</td></tr><tr className="even"><td>{"4.2.6"}</td><td>{"ワークフロー最適化"}</td><td>{"API プロファイリング、ベクトル DB クエリ、サービス間通信"}</td></tr><tr className="odd"><td>{"4.3.1"}</td><td>{"包括的オブザーバビリティ"}</td><td>{"メトリクス、トレース、ビジネス指標"}</td></tr><tr className="even"><td>{"4.3.2"}</td><td>{"GenAI 固有モニタリング"}</td><td>{"トークン使用量、幻覚率、異常検知、呼び出しログ"}</td></tr><tr className="odd"><td>{"4.3.3"}</td><td>{"統合オブザーバビリティ"}</td><td>{"ダッシュボード、監査ログ、フォレンジック"}</td></tr><tr className="even"><td>{"4.3.4"}</td><td>{"ツール性能"}</td><td>{"ツール呼び出しの追跡、マルチエージェント"}</td></tr><tr className="odd"><td>{"4.3.5"}</td><td>{"ベクトルストア運用"}</td><td>{"性能監視、インデックス最適化、データ品質"}</td></tr><tr className="even"><td>{"4.3.6"}</td><td>{"FM 固有のトラブルシューティング"}</td><td>{"ゴールデンデータセット、出力 diff、推論経路"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id="0-3-ドメイン構造のマップ" tabIndex={-1}>{"0-3. ドメイン構造のマップ"}</h3>
{" "}
<Diagram id="diag-1" label="0-3. ドメイン構造のマップ" />
{" "}
<h3 id="0-4-学習の進め方" tabIndex={-1}>{"0-4. 学習の進め方"}</h3>
{" "}
<ol>{" "}<li>{"Step 1 で用語 (トークン、TTFT、TPM など) を押さえる。"}</li>{" "}<li>{" Task 4.1 → 4.2 → 4.3 の順に読む。4.3 で「測る」ことを学ぶと、4.1 と 4.2 の改善の効果確認がつながります。 "}</li>{" "}<li>{" Step 18 と Step 19 で「問題文のキーワード → 正解の方向」をパターン化する。 "}</li>{" "}<li>{"Step 20 の練習問題を、解説を隠して解く。"}</li>{" "}</ol>
{" "}
<h2 id="step-1-前提知識---トークンと-3-つの最適化レバー" tabIndex={-1}>{" Step 1: 前提知識 - トークンと 3 つの最適化レバー "}</h2>
{" "}
<h3 id="1-1-トークンとは" tabIndex={-1}>{"1-1. トークンとは"}</h3>
{" "}
<p>{" LLM は文字ではなく "}<strong>{"トークン"}</strong>{" という単位でテキストを処理します。課金、速度、上限 (コンテキストウィンドウ)、クォータのすべてがトークンを基準にします。 "}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="1-1. トークンとはの表 4">{" "}<table><thead><tr className="header"><th scope="col">{"用語"}</th><th scope="col">{"意味"}</th><th scope="col">{"運用上のポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"入力トークン"}</td><td>{"プロンプト (システムプロンプト、履歴、検索結果、質問)"}</td><td>{"長いほど高く、遅くなる"}</td></tr><tr className="even"><td>{"出力トークン"}</td><td>{"モデルが生成する回答"}</td><td>{"一般に入力より単価が高く、生成時間の大半を占める"}</td></tr><tr className="odd"><td>{"コンテキストウィンドウ"}</td><td>{"1 回の呼び出しで扱える入出力の合計上限"}</td><td>{"超えるとエラーか切り捨てになる"}</td></tr><tr className="even"><td>{"TTFT"}</td><td>{"Time To First Token。最初のトークンが届くまでの時間"}</td><td>{"体感速度を決める"}</td></tr><tr className="odd"><td>{"TPOT / 生成速度"}</td><td>{"1 トークンあたりの生成時間"}</td><td>{"長い回答ほど合計時間が伸びる"}</td></tr><tr className="even"><td>{"TPM / RPM"}</td><td>{"1 分あたりのトークン数 / リクエスト数のクォータ"}</td><td>{"超えるとスロットリング (429)"}</td></tr></tbody></table>{" "}</div>
{" "}
<blockquote>{" "}<p>{" "}<strong>{"日本語の注意"}</strong>{": 日本語は同じ意味でも英語よりトークン数が多くなりがちです。コスト見積もりと容量計画は、必ず "}<strong>{"実際の日本語データで"}</strong>{" 計測します。 "}</p>{" "}</blockquote>
{" "}
<h3 id="1-2-3-つの最適化レバー" tabIndex={-1}>{"1-2. 3 つの最適化レバー"}</h3>
{" "}
<p>{"GenAI アプリの最適化は、次の 3 つのレバーのトレードオフです。"}</p>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="1-2. 3 つの最適化レバーの表 5">{" "}<table><thead><tr className="header"><th scope="col">{"レバー"}</th><th scope="col">{"測る指標"}</th><th scope="col">{"主な改善手段"}</th></tr></thead><tbody><tr className="odd"><td>{"コスト"}</td><td>{"1 リクエストあたり、1 タスク成功あたりの金額"}</td><td>{"トークン削減、小さいモデル、キャッシュ、バッチ"}</td></tr><tr className="even"><td>{"レイテンシ"}</td><td>{"TTFT、全体応答時間 (p50 / p95 / p99)"}</td><td>{" ストリーミング、低レイテンシモデル、並列化、プロンプトキャッシュ "}</td></tr><tr className="odd"><td>{"スループット"}</td><td>{"1 秒あたりに処理できる量、スロットリング率"}</td><td>{" クォータ管理、クロスリージョン推論、Provisioned Throughput、バッチ "}</td></tr></tbody></table>{" "}</div>
{" "}
<p>{" さらに「品質」が 4 つ目の軸としてあり、"}<strong>{"品質を落とさずに"}</strong>{" 上の 3 つを改善するのが Domain 4 の本質です。 "}</p>
{" "}
<Diagram id="diag-2" label="1-2. 3 つの最適化レバー" />
{" "}
<h3 id="1-3-amazon-bedrock-の推論オプション比較" tabIndex={-1}>{" 1-3. Amazon Bedrock の推論オプション比較 "}</h3>
{" "}
<div className="table-scroll" tabIndex={0} role="region" aria-label="1-3. Amazon Bedrock の推論オプション比較の表 6">{" "}<table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"特徴"}</th><th scope="col">{"向いている場面"}</th><th scope="col">{"注意点"}</th></tr></thead><tbody><tr className="odd"><td>{"オンデマンド"}</td><td>{"使った分だけ支払い。クォータの範囲で利用"}</td><td>{"開発、変動の大きい本番"}</td><td>{"需要ピークでスロットリングが起きうる"}</td></tr><tr className="even"><td>{"クロスリージョン推論"}</td><td>{" 推論プロファイル経由で複数リージョンに振り分け、スループットと回復力を高める "}</td><td>{"ピーク時の 429 対策"}</td><td>{"データの所在要件を確認する"}</td></tr><tr className="odd"><td>{"Provisioned Throughput"}</td><td>{"専用の推論容量を購入 (モデルユニット単位)"}</td><td>{"安定した高負荷、一定の性能保証、カスタムモデル"}</td><td>{"常時課金。使わない時間も費用が発生"}</td></tr><tr className="even"><td>{"バッチ推論"}</td><td>{"S3 の入力ファイルをまとめて非同期処理し、結果を S3 に出力"}</td><td>{"夜間の大量処理、評価、要約の一括生成"}</td><td>{"リアルタイム用途には不向き"}</td></tr><tr className="odd"><td>{"レイテンシ最適化推論"}</td><td>{" "}<code>{"performanceConfig"}</code>{" で最適化を指定し、対応モデルで応答を速くする "}</td><td>{"時間に敏感な対話"}</td><td>{"対応モデルとリージョンが限定的 (仕様は変化する)"}</td></tr><tr className="even"><td>{"プロンプトキャッシュ"}</td><td>{"繰り返し使う長いプロンプト部分を再利用"}</td><td>{"長いシステムプロンプト、文書チャット"}</td><td>{"対応モデル、最小トークン数、TTL の条件がある"}</td></tr></tbody></table>{" "}</div>
{" "}
<Diagram id="diag-3" label="1-3. Amazon Bedrock の推論オプション比較" />
{" "}
<p>{" 出典: Amazon Bedrock Scaling and throughput best practices / Optimize model inference for latency / Prompt caching (URL は Step 22 を参照) "}</p>
{" "}</div>; }
