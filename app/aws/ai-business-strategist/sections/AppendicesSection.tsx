import { Diagram } from '../Diagram';

export const AppendicesSection = () => {
    return (
        <>
            <h2 id="s96">付録 A スキルチェックリスト(試験ガイドの全スキル)</h2>
            <p>自己評価に使ってください。</p>
            <h3 id="s97">Domain 1</h3>
            <ul className="checklist">
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.1.1 AI
                            の基本概念(アルゴリズム、モデル、学習、推論、予測)をビジネス文脈で説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.1.2 AI・ML・生成 AI を区別できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.1.3 構造化データと非構造化データの違いと AI
                            への関連を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.1.4 データ品質が AI の成果に重要な理由を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.1.5 過去データによるモデル学習の概念を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.1.6 ISO/IEC 23053、42001
                            などグローバルな枠組みと共通語彙を知っている</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.2.1 ルールベース自動化と AI の使い分けを判断できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.2.2 AI エージェントの特徴と中核能力を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.2.3 継続的な監視・更新とモデルドリフトの必要性を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.2.4 AI ツールの分類でシャドー AI リスクを抑える方法を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.3.1 基本的なプロンプトエンジニアリングを適用できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.3.2 トークン制限とコンテキストウィンドウの影響を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >1.3.3 RAG とファインチューニングの効果と使い分けを説明できる</span
                        ></label
                    >
                </li>
            </ul>
            <h3 id="s98">Domain 2</h3>
            <ul className="checklist">
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.1.1
                            高インパクトのユースケースを特定し、事業成果に対応づけられる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.1.2 Build・Buy・Partner を評価できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.1.3
                            価値・実現可能性・持続可能性・整合性で優先順位づけし、スケール・一時停止・終了を判断できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.1.4 AI が適切でない場面を判断できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.1.5 AI への移行や AI
                            プラットフォーム間の移行の考慮点を挙げられる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.2.1 有形・無形の KPI を定義できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.2.2 導入前のベースラインの重要性を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span>2.2.3 ROI を包括的に算出できる</span></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.2.4 成功を予測する先行指標を挙げられる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.2.5 コスト計画・最適化の基本を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.3.1 競争環境を評価し、AI 導入の優位性を特定できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.3.2 ビジネスモデル変革の機会を特定できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.3.3 持続的な競争優位と運用改善を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >2.3.4 業界成熟度と競争に応じた投資水準を判断できる</span
                        ></label
                    >
                </li>
            </ul>
            <h3 id="s99">Domain 3</h3>
            <ul className="checklist">
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.1.1 責任ある AI の次元をビジネスシナリオに適用できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.1.2 事業目標との衝突時のトレードオフを整理できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.1.3 計画段階から責任ある AI を統合すべきと説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.1.4 人の監督が必要な場面とセーフガードを説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.2.1 部門横断・責任明確なガバナンス体制を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.2.2 規制コンプライアンスリスクを特定し対応できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.2.3
                            アクセス制御とデータセキュリティのガバナンス観点を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.2.4 リスク分類フレームワークで優先順位づけできる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.3.1 本番のリスクコントロールと監視の必要性を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.3.2
                            バイアスが複数段階で起きること、バイアスドリフトの監視を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.3.3 有害コンテンツと IP の懸念への対応を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >3.3.4
                            幻覚・データ品質劣化・ドリフトなど信頼性リスクの緩和を説明できる</span
                        ></label
                    >
                </li>
            </ul>
            <h3 id="s100">Domain 4</h3>
            <ul className="checklist">
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.1.1 準備度を複数の観点で評価できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.1.2 AI 成熟度モデルで現在地を評価できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.1.3 人・プロセス・技術・ガバナンスの能力ギャップを特定できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.1.4 投資の優先順位と成長の道筋を決められる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.2.1 データの準備度(品質・アクセス性・サイロ)を評価できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.2.2 データ戦略・所有権・共有の枠組みの重要性を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.2.3 技術・インフラ要件を戦略レベルで評価できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.3.1 経営スポンサーと AI チャンピオンを設定できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.3.2 部門横断チームと責任基準を設計できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.3.3 従業員の懸念に応える透明なコミュニケーションを設計できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.3.4 文化的障壁とリーダーの介入策を挙げられる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.3.5 AI リテラシー向上の育成手法を選べる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.3.6 人の役割を AI との協働・監督へ移行する方針を立てられる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.4.1 反復型の変革フェーズを適用できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.4.2 短期の成功から全社展開へ進める方法を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.4.3 AI CoE と部門横断連携の仕組みを説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.4.4 継続的なフィードバックと成功指標を設計できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.4.5 実験から本番グレードへの移行要件を説明できる</span
                        ></label
                    >
                </li>
                <li>
                    <label
                        ><input type="checkbox" /><span
                            >4.4.6 スケール中の事業継続性・性能などを評価できる</span
                        ></label
                    >
                </li>
            </ul>

            <h2 id="s101">付録 B 用語集</h2>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">用語</th>
                            <th scope="col">意味</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI エージェント</td>
                            <td>目標に向けて自律的に計画し、ツールを使って行動する AI</td>
                        </tr>
                        <tr>
                            <td>AWS CAF</td>
                            <td>
                                AWS Cloud Adoption Framework。クラウド導入の計画・拡大のための枠組み
                            </td>
                        </tr>
                        <tr>
                            <td>CAF-AI</td>
                            <td>CAF を AI・ML・生成 AI 向けに拡張した枠組み</td>
                        </tr>
                        <tr>
                            <td>CoE</td>
                            <td>Center of Excellence。標準・支援・人材育成を担う中核組織</td>
                        </tr>
                        <tr>
                            <td>ROI</td>
                            <td>投資対効果。(便益 − コスト)÷ コスト</td>
                        </tr>
                        <tr>
                            <td>KPI</td>
                            <td>重要業績評価指標</td>
                        </tr>
                        <tr>
                            <td>ベースライン</td>
                            <td>導入前の基準値</td>
                        </tr>
                        <tr>
                            <td>先行指標</td>
                            <td>最終成果の前に成功の兆しを示す指標</td>
                        </tr>
                        <tr>
                            <td>ガードレール</td>
                            <td>AI の入力・出力を制御して安全性を保つ仕組み</td>
                        </tr>
                        <tr>
                            <td>幻覚(hallucination)</td>
                            <td>もっともらしいが誤った出力</td>
                        </tr>
                        <tr>
                            <td>RAG</td>
                            <td>検索拡張生成。外部データを検索して回答に反映する</td>
                        </tr>
                        <tr>
                            <td>ファインチューニング</td>
                            <td>追加データでモデルを再学習させる</td>
                        </tr>
                        <tr>
                            <td>トークン</td>
                            <td>AI が文章を処理する単位。料金にも関わる</td>
                        </tr>
                        <tr>
                            <td>コンテキストウィンドウ</td>
                            <td>モデルが一度に扱える情報量の上限</td>
                        </tr>
                        <tr>
                            <td>モデルドリフト</td>
                            <td>時間の経過でモデルの性能が低下すること</td>
                        </tr>
                        <tr>
                            <td>バイアスドリフト</td>
                            <td>時間の経過でバイアスが生じる、または変化すること</td>
                        </tr>
                        <tr>
                            <td>シャドー AI</td>
                            <td>承認なしに従業員が使う AI ツール</td>
                        </tr>
                        <tr>
                            <td>責任共有モデル</td>
                            <td>クラウド事業者と利用者の責任分担の考え方</td>
                        </tr>
                        <tr>
                            <td>Scoping Matrix</td>
                            <td>
                                生成 AI の利用形態を Scope 1〜5 に分類し統制を整理する AWS の枠組み
                            </td>
                        </tr>
                        <tr>
                            <td>ISO/IEC 42001</td>
                            <td>AI マネジメントシステムの国際規格</td>
                        </tr>
                        <tr>
                            <td>NIST AI RMF</td>
                            <td>
                                Govern・Map・Measure・Manage の 4 機能による AI リスク管理の枠組み
                            </td>
                        </tr>
                        <tr>
                            <td>EU AI Act</td>
                            <td>リスクベースの EU の AI 規制</td>
                        </tr>
                        <tr>
                            <td>ガバナンス・バイ・デザイン</td>
                            <td>計画・設計の段階からガバナンスを組み込む考え方</td>
                        </tr>
                        <tr>
                            <td>PoC</td>
                            <td>概念実証。小さく試して実現性・価値を確かめる</td>
                        </tr>
                        <tr>
                            <td>Provisioned Throughput</td>
                            <td>
                                Bedrock
                                で処理能力を確保する課金形態。コミットメント期間により料金が変わる
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="s102">付録 C 参考文献(根拠ソース一覧)</h2>
            <h3 id="s103">C-1 AWS 公式: 試験情報</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">内容</th>
                            <th scope="col">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AWS Certified AI Business Strategist 認定ページ</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/certification/certified-ai-business-strategist/"
                                    >https://aws.amazon.com/certification/certified-ai-business-strategist/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>試験ガイド AIB-C01(全体)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Domain 1</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Domain 2</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Domain 3</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Domain 4</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>試験に出る技術・概念</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>範囲内サービス</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>範囲外サービス</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-out-of-scope-services.html"
                                    >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-out-of-scope-services.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Exam Prep Plan(Skill Builder)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://skillbuilder.aws/category/exam-prep/ai-business-strategist-business-AIB-C01"
                                    >https://skillbuilder.aws/category/exam-prep/ai-business-strategist-business-AIB-C01</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>受験前ポリシー(beta exam 含む)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/certification/policies/before-testing/"
                                    >https://aws.amazon.com/certification/policies/before-testing/</a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s104">C-2 AWS 公式: 戦略・ガバナンス</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">内容</th>
                            <th scope="col">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AWS CAF for AI, ML, and Generative AI</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                                    >https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>AWS CAF(公式ページ。要最新確認)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/cloud-adoption-framework/"
                                    >https://aws.amazon.com/cloud-adoption-framework/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Well-Architected Responsible AI Lens</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html"
                                    >https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Responsible AI Lens 発表記事</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/blogs/machine-learning/announcing-the-aws-well-architected-responsible-ai-lens"
                                    >https://aws.amazon.com/blogs/machine-learning/announcing-the-aws-well-architected-responsible-ai-lens</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>新しい Well-Architected Lenses(What&apos;s New)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/about-aws/whats-new/2025/11/new-aws-well-architected-lenses-ai-ml-workloads"
                                    >https://aws.amazon.com/about-aws/whats-new/2025/11/new-aws-well-architected-lenses-ai-ml-workloads</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Architecture Blog(3 つの AI レンズ)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/blogs/architecture/architecting-for-ai-excellence-aws-launches-three-well-architected-lenses-at-reinvent-2025"
                                    >https://aws.amazon.com/blogs/architecture/architecting-for-ai-excellence-aws-launches-three-well-architected-lenses-at-reinvent-2025</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Generative AI Security Scoping Matrix</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/"
                                    >https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Agentic AI Security Scoping Matrix(AWS Security Blog)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/blogs/security/the-agentic-ai-security-scoping-matrix-a-framework-for-securing-autonomous-ai-systems/"
                                    >https://aws.amazon.com/blogs/security/the-agentic-ai-security-scoping-matrix-a-framework-for-securing-autonomous-ai-systems/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Prescriptive Guidance: 生成 AI プラットフォームのセキュリティ</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-enterprise-ready-gen-ai-platform/security.html"
                                    >https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-enterprise-ready-gen-ai-platform/security.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>What Is Agentic AI?</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/what-is/agentic-ai/"
                                    >https://aws.amazon.com/what-is/agentic-ai/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Data for agentic AI(リソースページ)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/data/resources/data-foundation-for-agentic-ai/"
                                    >https://aws.amazon.com/data/resources/data-foundation-for-agentic-ai/</a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s105">C-3 AWS 公式: サービス</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">内容</th>
                            <th scope="col">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Bedrock Guardrails の仕組み</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html"
                                    >https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Bedrock Knowledge Bases の仕組み</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html"
                                    >https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Knowledge Bases GA 発表</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/blogs/aws/knowledge-bases-now-delivers-fully-managed-rag-experience-in-amazon-bedrock"
                                    >https://aws.amazon.com/blogs/aws/knowledge-bases-now-delivers-fully-managed-rag-experience-in-amazon-bedrock</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Bedrock プロンプトエンジニアリングとは</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-prompt-engineering.html"
                                    >https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-prompt-engineering.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Bedrock プロンプト設計</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html"
                                    >https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Bedrock プロンプトエンジニアリングの概念</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                                    >https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Amazon Bedrock 料金</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/bedrock/pricing/"
                                    >https://aws.amazon.com/bedrock/pricing/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>What is Amazon SageMaker AI?</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
                                    >https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Amazon Quick Suite 発表(AWS News Blog)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/blogs/aws/reimagine-the-way-you-work-with-ai-agents-in-amazon-quick-suite/"
                                    >https://aws.amazon.com/blogs/aws/reimagine-the-way-you-work-with-ai-agents-in-amazon-quick-suite/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>AWS Pricing Calculator</td>
                            <td>
                                <a target="_blank" rel="noopener" href="https://calculator.aws/"
                                    >https://calculator.aws/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>AWS Cost Explorer(製品)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/aws-cost-management/aws-cost-explorer/"
                                    >https://aws.amazon.com/aws-cost-management/aws-cost-explorer/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>AWS Cost Explorer(ドキュメント)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://docs.aws.amazon.com/console/billing/costexplorer"
                                    >https://docs.aws.amazon.com/console/billing/costexplorer</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>AWS Marketplace</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/marketplace"
                                    >https://aws.amazon.com/marketplace</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>AWS Pricing</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://aws.amazon.com/pricing/"
                                    >https://aws.amazon.com/pricing/</a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s106">C-4 標準・規制・第三者情報</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">内容</th>
                            <th scope="col">URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ISO/IEC 42001(ISO ヘルプセンター)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai"
                                    >https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>ISO/IEC 42001 の構造の解説(EVS)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://www.evs.ee/en/ai-management-standard"
                                    >https://www.evs.ee/en/ai-management-standard</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>NIST AI Risk Management Framework</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://www.nist.gov/itl/ai-risk-management-framework"
                                    >https://www.nist.gov/itl/ai-risk-management-framework</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>NIST AI RMF 1.0 公開ニュース</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://nist.gov/news-events/news/2023/01/nist-risk-management-framework-aims-improve-trustworthiness-artificial"
                                    >https://nist.gov/news-events/news/2023/01/nist-risk-management-framework-aims-improve-trustworthiness-artificial</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>EU AI Act(欧州委員会関連ページ)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://interoperable-europe.ec.europa.eu/collection/egovernment/news/eu-ai-act-first-regulation-artificial-intelligence"
                                    >https://interoperable-europe.ec.europa.eu/collection/egovernment/news/eu-ai-act-first-regulation-artificial-intelligence</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Responsible AI の 10 次元(InfoQ)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://infoq.com/news/2025/12/aws-expands-well-architected/"
                                    >https://infoq.com/news/2025/12/aws-expands-well-architected/</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>AWS CAF の 6 視点の解説(IBM)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://ibm.com/think/topics/aws-cloud-adoption-framework"
                                    >https://ibm.com/think/topics/aws-cloud-adoption-framework</a
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>Bedrock Guardrails の機能紹介(TrueFoundry)</td>
                            <td>
                                <a
                                    target="_blank"
                                    rel="noopener"
                                    href="https://www.truefoundry.com/docs/ai-gateway/bedrock-guardrails"
                                    >https://www.truefoundry.com/docs/ai-gateway/bedrock-guardrails</a
                                >
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s107">C-5 出典の扱いについて</h3>
            <ul>
                <li>
                    試験の形式・時間・料金・スキル項目は、<strong
                        >2026-09-28 に取得した AWS 公式ページ</strong
                    >に基づきます。beta 期間中は変更される可能性があります
                </li>
                <li>
                    「補足解説」「一般的な実務ガイダンス」と明記した部分は、理解を助けるための一般知識であり、AWS
                    の公式見解ではありません
                </li>
                <li>
                    ISO/IEC 23053 は一次情報の本文を取得できていないため、ISO
                    の公式規格ページで確認してください
                </li>
                <li>
                    AWS CAF の公式ページと Data for agentic AI
                    のリソースは、本文の全文取得ができていません(リンク先で最新を確認してください)
                </li>
                <li>
                    本ガイドは法的助言ではありません。規制・知的財産の判断は専門家にご相談ください
                </li>
            </ul>

            <p>
                <em
                    >作成日: 2026-09-28 / 対象試験: AWS Certified AI Business Strategist
                    (AIB-C01)</em
                >
            </p>
        </>
    );
};
