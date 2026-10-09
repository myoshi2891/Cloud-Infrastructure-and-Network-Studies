import { Diagram } from '../Diagram';

export const Domain3Section = () => {
    return (
        <>
            <h1 id="s47">Domain 3 AI Governance and Responsible AI Leadership(配点 24%)</h1>
            <h2 id="s48">Step 7 責任ある AI を意思決定に組み込む(Task 3.1)</h2>
            <h3 id="s49">7-1 責任ある AI の原則と次元(Skill 3.1.1)</h3>
            <p>
                <strong>責任ある AI(Responsible AI)</strong>とは、AI
                の利益を最大化し、リスクを最小化することを目指して AI
                を設計・開発・利用する取り組みです。AWS の Well-Architected Responsible AI Lens
                は、AI に固有の「次元」を定義しています(報道では 10 次元と紹介されています)。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">次元</th>
                            <th scope="col">ビジネス向けの意味</th>
                            <th scope="col">事業側が投げるべき問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>公平性(fairness)</td>
                            <td>特定の属性の人に不利な結果を出さない</td>
                            <td>属性ごとの結果に差が出ていないか。誰が不利益を受けうるか</td>
                        </tr>
                        <tr>
                            <td>説明可能性(explainability)</td>
                            <td>なぜその結果になったか説明できる</td>
                            <td>顧客・監査人・規制当局に説明が求められる場面か</td>
                        </tr>
                        <tr>
                            <td>プライバシー(privacy)</td>
                            <td>データを適切に取得・利用・管理する</td>
                            <td>個人情報を使う根拠と同意は。不要なデータは使っていないか</td>
                        </tr>
                        <tr>
                            <td>安全性(safety)</td>
                            <td>人や社会に害を与えない</td>
                            <td>誤作動や有害な出力が起きた時の被害は何か</td>
                        </tr>
                        <tr>
                            <td>透明性(transparency)</td>
                            <td>AI を使っていること、限界を利用者に伝える</td>
                            <td>利用者は AI が関与していると知っているか</td>
                        </tr>
                        <tr>
                            <td>堅牢性(robustness)</td>
                            <td>想定外の入力でも安定して動く</td>
                            <td>異常な入力や悪意のある入力でどうなるか</td>
                        </tr>
                        <tr>
                            <td>制御可能性(controllability)</td>
                            <td>AI の振る舞いを監視し、調整・停止できる</td>
                            <td>問題発生時に人が止められるか</td>
                        </tr>
                        <tr>
                            <td>セキュリティ(security)</td>
                            <td>データやモデルを不正から守る</td>
                            <td>不正アクセスやデータ漏えいへの備えは</td>
                        </tr>
                        <tr>
                            <td>真実性(veracity)</td>
                            <td>出力が正確で事実に基づく</td>
                            <td>誤情報(幻覚)の検出手段は</td>
                        </tr>
                        <tr>
                            <td>ガバナンス(governance)</td>
                            <td>責任と統制の仕組みがある</td>
                            <td>誰が最終責任を持つか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout">
                <p>
                    試験ガイドが例示している次元は「公平性、説明可能性、プライバシー、安全性、透明性、堅牢性」です。試験ではこれらを<strong>ビジネスシナリオに当てはめて</strong>判断する力が問われます。
                </p>
            </blockquote>
            <h3 id="s50">7-2 事業目標と責任ある AI が衝突する時のトレードオフ(Skill 3.1.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">衝突の例</th>
                            <th scope="col">考え方</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>精度を優先すると説明しにくいモデルになる</td>
                            <td>
                                判断の影響度が高い領域(融資、採用、医療など)では説明可能性を優先し、低リスク領域で精度を優先する
                            </td>
                        </tr>
                        <tr>
                            <td>パーソナライズを強めるとプライバシーへの懸念が高まる</td>
                            <td>収集データを最小化し、同意と透明性を確保する</td>
                        </tr>
                        <tr>
                            <td>展開スピードを優先すると評価やレビューが不足する</td>
                            <td>影響度に応じてレビューの深さを変える(リスクベース)</td>
                        </tr>
                        <tr>
                            <td>コスト削減を優先すると人のチェックが減る</td>
                            <td>重大な判断には人の関与を残す</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>トレードオフは<strong>隠さず、判断の根拠と責任者を記録</strong>する</li>
                <li>
                    <strong
                        >関係者(法務、コンプライアンス、現場、影響を受ける人)を早期に巻き込む</strong
                    >
                </li>
                <li>
                    「利益 vs
                    責任」の二択にせず、<strong>範囲を絞る、人の確認を足す</strong>など第三の選択肢を探す
                </li>
            </ul>
            <h3 id="s51">7-3 設計段階から統合する「ガバナンス・バイ・デザイン」(Skill 3.1.3)</h3>
            <p>
                AWS の Responsible AI Lens の設計原則には、<strong
                    >設計から運用まで責任ある AI
                    の観点を通して考え、問題をライフサイクルのできるだけ早い段階で見つけて解消すること</strong
                >、そして<strong>ユースケースを狭く定義し、解くべき課題から逆算して仕様を決めること</strong>が含まれます。早期に対処するほど、後戻りのコストと時間を減らせます。
            </p>
            <Diagram id="dgm-10" />
            <p>
                <strong>ベストプラクティス</strong>:
                <strong>プロジェクト計画の最初(要件定義)の時点</strong>で、責任ある AI
                のチェック項目を作業項目に含める。完成間際に審査を追加するのは手戻りが大きい。
            </p>
            <h3 id="s52">7-4 人による監督が必要な場面とセーフガード(Skill 3.1.4)</h3>
            <p><strong>人の監督(Human oversight)が必要になる場面(補足解説)</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">場面</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>判断が個人の権利・生活に大きく影響する</td>
                            <td>融資審査、採用、医療、法的判断</td>
                        </tr>
                        <tr>
                            <td>誤りのコストが大きい</td>
                            <td>契約書の自動送付、大口の返金</td>
                        </tr>
                        <tr>
                            <td>AI の確信度が低い、または前例のない状況</td>
                            <td>想定外の問い合わせ</td>
                        </tr>
                        <tr>
                            <td>規制が人の関与を求めている</td>
                            <td>高リスク AI に関する規制要件</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>セーフガードの 3 本柱(試験ガイドの例)</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">セーフガード</th>
                            <th scope="col">役割</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>幻覚検出</td>
                            <td>事実に基づかない出力を見つけて抑える</td>
                        </tr>
                        <tr>
                            <td>ガードレール</td>
                            <td>入力・出力を制御して、不適切な内容を防ぐ</td>
                        </tr>
                        <tr>
                            <td>エスカレーション基準</td>
                            <td>どんな場合に人へ引き継ぐかを事前に定める</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-11" />
            <p><strong>Amazon Bedrock Guardrails(戦略レベルの理解)</strong></p>
            <ul>
                <li>
                    生成 AI
                    アプリの<strong>ユーザー入力とモデル応答の両方を評価</strong>して安全性を保つ機能
                </li>
                <li>
                    1
                    つのガードレールは、<strong>コンテンツフィルター、拒否トピック、機密情報フィルター、単語フィルター、画像コンテンツフィルター</strong>などのポリシーの組み合わせで構成できる
                </li>
                <li>
                    入力が違反と判定されるとモデル推論は破棄され、あらかじめ設定したブロックメッセージが返る。応答が違反した場合は、ブロックメッセージへの置き換えや機密情報のマスキングが行われる
                </li>
                <li>Amazon Bedrock Agents と Knowledge Bases でも利用できる</li>
                <li>
                    事実性の検証機能として、応答が元情報に根拠づけられているかを確認する「コンテキスト根拠チェック」(contextual
                    grounding checks)があると紹介されている(詳細は AWS の最新ドキュメントで確認)
                </li>
            </ul>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    <strong>エスカレーション基準は導入前に文章化</strong
                    >する(「確信度が低い」「金額が閾値超え」「苦情・法的懸念」など)
                </li>
                <li>
                    人の確認が形式的にならないよう、<strong>確認者に十分な情報と時間・権限</strong>を与える(一般的な実務ガイダンス)
                </li>
                <li>ガードレールは一度設定して終わりでなく、<strong>定期的にテスト</strong>する</li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 3</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS Well-Architected Responsible AI Lens</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html"
                            >https://docs.aws.amazon.com/wellarchitected/latest/responsible-ai-lens/responsible-ai-lens.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Responsible AI Lens 発表記事(設計原則)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/blogs/machine-learning/announcing-the-aws-well-architected-responsible-ai-lens"
                            >https://aws.amazon.com/blogs/machine-learning/announcing-the-aws-well-architected-responsible-ai-lens</a
                        >
                    </li>
                    <li>
                        <span className="src-label">新しい Well-Architected Lenses の発表</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/about-aws/whats-new/2025/11/new-aws-well-architected-lenses-ai-ml-workloads"
                            >https://aws.amazon.com/about-aws/whats-new/2025/11/new-aws-well-architected-lenses-ai-ml-workloads</a
                        >
                    </li>
                    <li>
                        <span className="src-label">10 次元の紹介(InfoQ)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://infoq.com/news/2025/12/aws-expands-well-architected/"
                            >https://infoq.com/news/2025/12/aws-expands-well-architected/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">How Amazon Bedrock Guardrails works</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >Bedrock Guardrails
                            の機能紹介(第三者による解説。コンテキスト根拠チェックなど)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://www.truefoundry.com/docs/ai-gateway/bedrock-guardrails"
                            >https://www.truefoundry.com/docs/ai-gateway/bedrock-guardrails</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s53">Step 8 AI ガバナンス体制と規制対応(Task 3.2)</h2>
            <h3 id="s54">8-1 部門横断の AI ガバナンス体制と明確な責任(Skill 3.2.1)</h3>
            <p>
                <strong>ガバナンスとは</strong>: 「AI
                をどう使い、誰が何に責任を持つか」を決めるルールと仕組みです。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">構成要素</th>
                            <th scope="col">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>部門横断の代表</td>
                            <td>
                                事業部門、IT・データ、セキュリティ、法務、コンプライアンス、人事、リスク管理など
                            </td>
                        </tr>
                        <tr>
                            <td>明確な責任(アカウンタビリティ)</td>
                            <td>AI ごとの責任者(オーナー)、承認者、監視担当を明確にする</td>
                        </tr>
                        <tr>
                            <td>方針と手順</td>
                            <td>AI 利用方針、審査プロセス、インシデント対応</td>
                        </tr>
                        <tr>
                            <td>報告ライン</td>
                            <td>経営層への定期報告</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">役割の例</th>
                            <th scope="col">主な責任</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>経営スポンサー</td>
                            <td>方針の承認、リソース確保、最終的な責任</td>
                        </tr>
                        <tr>
                            <td>AI ガバナンス委員会</td>
                            <td>高リスク案件の審査、方針の維持・更新</td>
                        </tr>
                        <tr>
                            <td>事業オーナー</td>
                            <td>ユースケースの成果とリスクに責任を持つ</td>
                        </tr>
                        <tr>
                            <td>法務・コンプライアンス</td>
                            <td>規制・契約の適合確認</td>
                        </tr>
                        <tr>
                            <td>セキュリティ</td>
                            <td>データ保護とアクセス管理</td>
                        </tr>
                        <tr>
                            <td>技術チーム</td>
                            <td>実装・運用・品質監視</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>: ISO/IEC 42001
                は、リーダーシップの関与、リスク評価、監視・監査、継続的改善といった要素を含むマネジメントシステムの型を示しており、体制設計の参考になります。
            </p>
            <h3 id="s55">8-2 AI に関する規制コンプライアンスリスクへの対応(Skill 3.2.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">手順</th>
                            <th scope="col">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>AI を使う業務を棚卸しする(どこで、何のデータで、誰に影響するか)</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                適用される法令・規制・業界基準を特定する(個人情報、消費者保護、業界規制、地域の
                                AI 規制など)
                            </td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                リスクの高い用途を特定し、必要な統制(記録、説明、人の関与、審査)を設ける
                            </td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>法務・コンプライアンスと連携して継続的に見直す</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>例: EU の AI 法(EU AI Act)</strong
                >は、リスクに応じて規制の強さを変える<strong>リスクベースのアプローチ</strong>を採用しています。欧州委員会の説明では、最小リスクは義務なし、高リスクは厳格な要件、許容できないリスクは禁止、チャットボットなど特定の透明性リスクには
                AI との対話であることの明示が求められます。
            </p>
            <blockquote className="callout note">
                <p>
                    <strong>注意</strong>:
                    法規制の適用範囲・時期は国や時期で変わります。<strong>本ガイドは法的助言ではありません。</strong>具体的な適用判断は法務の専門家に確認してください。
                </p>
            </blockquote>
            <h3 id="s56">8-3 アクセス制御とデータセキュリティ(Skill 3.2.3)</h3>
            <p>
                試験では<strong>実装手順ではなく、ガバナンスとして何を求めるか</strong>が問われます。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">論点</th>
                            <th scope="col">ガバナンスとしての考え方</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>アクセス制御</td>
                            <td>
                                最小権限の原則。AI
                                や利用者が扱えるデータ・機能を必要な範囲に限定する
                            </td>
                        </tr>
                        <tr>
                            <td>データ分類</td>
                            <td>機密度に応じ、AI に入力してよいデータの範囲を定める</td>
                        </tr>
                        <tr>
                            <td>データの取り扱い</td>
                            <td>
                                保管場所、保持期間、学習への利用可否、第三者提供の条件を明確にする
                            </td>
                        </tr>
                        <tr>
                            <td>ベンダー管理</td>
                            <td>ベンダーのデータ取扱い条件、認証、責任分界を確認する</td>
                        </tr>
                        <tr>
                            <td>責任分界</td>
                            <td>利用形態ごとに、どのセキュリティ統制を自社が担うかを整理する</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>AWS 責任共有モデルと AI(戦略レベル)</strong>: 一般に AWS
                はクラウド基盤側のセキュリティに責任を持ち、利用者はその上での設定・データ・アクセス管理に責任を持ちます。AI
                では、<strong
                    >Step 4 の Scope 1〜5 で利用形態が変わると、自社が担う統制の範囲が変わる</strong
                >、という理解が有用です。
            </p>
            <p>
                AWS の Generative AI Security Scoping Matrix は、全 Scope に共通する 5
                つのセキュリティ領域を示します。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">領域</th>
                            <th scope="col">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ガバナンスとコンプライアンス</td>
                            <td>事業を後押ししつつリスクを抑える方針・手順・報告</td>
                        </tr>
                        <tr>
                            <td>法務とプライバシー</td>
                            <td>生成 AI の利用・構築に関する法規制・プライバシー要件</td>
                        </tr>
                        <tr>
                            <td>リスク管理</td>
                            <td>潜在的な脅威の特定と推奨される緩和策</td>
                        </tr>
                        <tr>
                            <td>コントロール</td>
                            <td>リスクを軽減するためのセキュリティ統制の実装</td>
                        </tr>
                        <tr>
                            <td>レジリエンス</td>
                            <td>可用性と事業上のサービスレベルを維持する設計</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s57">8-4 リスク分類フレームワークによる優先順位づけ(Skill 3.2.4)</h3>
            <p>
                <strong>考え方</strong>: すべての AI
                に同じ強さの統制をかけるのではなく、<strong>リスクの大きさに応じて統制の強さを変える</strong>(リスクベース)。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">リスク階層(例)</th>
                            <th scope="col">特徴</th>
                            <th scope="col">統制の強さ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>高</td>
                            <td>個人の権利・安全・重要な意思決定に影響</td>
                            <td>事前審査、人の関与、詳細な記録、定期監査</td>
                        </tr>
                        <tr>
                            <td>中</td>
                            <td>影響は限定的だが顧客や業務に関わる</td>
                            <td>標準的なレビュー、監視、利用者への通知</td>
                        </tr>
                        <tr>
                            <td>低</td>
                            <td>社内の軽微な効率化</td>
                            <td>基本方針の遵守と簡易な登録</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-12" />
            <p><strong>参考になる枠組み</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">枠組み</th>
                            <th scope="col">要点</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>NIST AI RMF 1.0</td>
                            <td>
                                米国 NIST
                                による自主的な枠組み。Govern(統治)、Map(文脈の把握)、Measure(測定)、Manage(管理)の
                                4 機能を、AI ライフサイクル全体で継続的に回す。2024 年には生成 AI
                                向けプロファイル(NIST AI 600-1)も公開
                            </td>
                        </tr>
                        <tr>
                            <td>ISO/IEC 42001</td>
                            <td>認証可能な AI マネジメントシステム規格</td>
                        </tr>
                        <tr>
                            <td>EU AI Act</td>
                            <td>リスクベースの法規制(許容できない、高、限定的、最小)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>:
                リスク分類は<strong>ユースケース登録の入口</strong>に組み込み、ライフサイクル(企画・開発・運用)の節目で再評価する。
            </p>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 3</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AI Security Scoping Matrix</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/"
                            >https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >AWS Prescriptive Guidance(生成 AI
                            プラットフォームのセキュリティとガバナンス)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-enterprise-ready-gen-ai-platform/security.html"
                            >https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-enterprise-ready-gen-ai-platform/security.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">ISO/IEC 42001</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai"
                            >https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai</a
                        >
                    </li>
                    <li>
                        <span className="src-label">EU AI Act(欧州委員会関連ページ)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://interoperable-europe.ec.europa.eu/collection/egovernment/news/eu-ai-act-first-regulation-artificial-intelligence"
                            >https://interoperable-europe.ec.europa.eu/collection/egovernment/news/eu-ai-act-first-regulation-artificial-intelligence</a
                        >
                    </li>
                    <li>
                        <span className="src-label">NIST AI Risk Management Framework</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://www.nist.gov/itl/ai-risk-management-framework"
                            >https://www.nist.gov/itl/ai-risk-management-framework</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s58">Step 9 企業の AI リスクと緩和策(Task 3.3)</h2>
            <h3 id="s59">9-1 本番運用のリスクコントロールと監視(Skill 3.3.1)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">監視の観点</th>
                            <th scope="col">見ること</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>品質</td>
                            <td>正確性、幻覚率、回答の採用率</td>
                            <td>サンプリングによる人の評価</td>
                        </tr>
                        <tr>
                            <td>安全性</td>
                            <td>有害・不適切な出力、ガードレールの発動件数</td>
                            <td>発動ログの定期確認</td>
                        </tr>
                        <tr>
                            <td>公平性</td>
                            <td>属性ごとの結果の差</td>
                            <td>グループ別の結果比較</td>
                        </tr>
                        <tr>
                            <td>セキュリティ・プライバシー</td>
                            <td>機密情報の入力・出力、不審なアクセス</td>
                            <td>検知と報告の仕組み</td>
                        </tr>
                        <tr>
                            <td>事業指標</td>
                            <td>KPI、顧客苦情</td>
                            <td>ダッシュボード</td>
                        </tr>
                        <tr>
                            <td>コスト</td>
                            <td>利用量と費用の推移</td>
                            <td>Cost Explorer での確認</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>:
                導入時に<strong>「何を、誰が、どの頻度で見て、異常時に何をするか」</strong>を決める。インシデント対応の連絡ルートも事前に定める。
            </p>
            <h3 id="s60">9-2 バイアスはライフサイクルの複数段階で発生する(Skill 3.3.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">段階</th>
                            <th scope="col">バイアスの発生例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>データ収集</td>
                            <td>特定の集団のデータが少ない(標本の偏り)</td>
                        </tr>
                        <tr>
                            <td>ラベル付け</td>
                            <td>人の主観や先入観がラベルに入る</td>
                        </tr>
                        <tr>
                            <td>モデル学習</td>
                            <td>過去の偏った判断を学び再現する</td>
                        </tr>
                        <tr>
                            <td>評価</td>
                            <td>全体の精度だけ見て、集団別の差を見落とす</td>
                        </tr>
                        <tr>
                            <td>導入・運用</td>
                            <td>現場での使われ方が想定と異なり、特定の人に不利になる</td>
                        </tr>
                        <tr>
                            <td>フィードバックループ</td>
                            <td>AI の判断が新しいデータを生み、偏りが強化される</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>バイアスドリフト</strong>:
                導入時に問題なくても、データや社会状況の変化で<strong>時間とともにバイアスが生じる</strong>ことがあります。したがって<strong>継続的な監視</strong>が重要です。
            </p>
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>導入前だけでなく、<strong>運用中も定期的に集団別の結果を確認</strong>する</li>
                <li>多様な視点を持つメンバーでレビューする</li>
                <li>問題を見つけた時の是正手順(停止・修正・再評価)を定義しておく</li>
            </ul>
            <h3 id="s61">9-3 有害コンテンツと知的財産(IP)のリスク管理(Skill 3.3.3)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">リスク</th>
                            <th scope="col">内容</th>
                            <th scope="col">対策の方向性</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>有害コンテンツ</td>
                            <td>ヘイト、暴力、差別的な表現、不適切な出力</td>
                            <td>
                                ガードレールのコンテンツフィルターや拒否トピックの設定、人のレビュー
                            </td>
                        </tr>
                        <tr>
                            <td>機密情報の漏えい</td>
                            <td>個人情報や社内機密が入力・出力に含まれる</td>
                            <td>機密情報フィルター、入力ルール、教育</td>
                        </tr>
                        <tr>
                            <td>IP(知的財産)の侵害</td>
                            <td>生成物が第三者の著作物に類似するおそれ</td>
                            <td>用途に応じた確認プロセス、契約条件の確認</td>
                        </tr>
                        <tr>
                            <td>入力データの権利</td>
                            <td>権利のないデータを AI に投入してしまう</td>
                            <td>データの権利確認、利用ルール</td>
                        </tr>
                        <tr>
                            <td>出力の権利・帰属</td>
                            <td>生成物の権利の扱いが不明確</td>
                            <td>ベンダーの利用規約・契約の確認</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout note">
                <p>
                    <strong>注意</strong>:
                    知的財産の判断は複雑です。<strong>本ガイドは法的助言ではありません。</strong>法務部門・専門家と連携してください。
                </p>
            </blockquote>
            <p>
                NIST の生成 AI プロファイル(NIST AI 600-1)は、生成 AI
                特有のリスクとして、事実と異なる出力(confabulation)、有害コンテンツ、データ漏えいなどを整理しています。
            </p>
            <h3 id="s62">9-4 信頼性リスク: 幻覚・データ品質の劣化・モデルドリフト(Skill 3.3.4)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">リスク</th>
                            <th scope="col">内容</th>
                            <th scope="col">緩和策</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>幻覚(hallucination)</td>
                            <td>もっともらしいが事実と異なる出力</td>
                            <td>
                                RAG による根拠づけ、プロンプト改善、出典表示、重要判断での人の確認
                            </td>
                        </tr>
                        <tr>
                            <td>データ品質の劣化</td>
                            <td>元データが古くなる、欠損や誤りが増える</td>
                            <td>データ品質の継続監視、更新運用、所有者の明確化</td>
                        </tr>
                        <tr>
                            <td>モデルドリフト</td>
                            <td>環境変化で性能が低下する</td>
                            <td>性能監視と再評価・再学習(Step 2-3 参照)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    出力が<strong>根拠(出典)に基づいている</strong>ことを確認できる設計にする(Knowledge
                    Bases は取得情報に出典を付ける)
                </li>
                <li>
                    幻覚をゼロにはできない前提で、<strong
                        >影響の大きい用途では人の確認を残す</strong
                    >
                </li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 3</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain3.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Prompt engineering concepts(幻覚低減の手段)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">How Amazon Bedrock Guardrails works</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >NIST AI Risk Management Framework(生成 AI プロファイルを含む)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://www.nist.gov/itl/ai-risk-management-framework"
                            >https://www.nist.gov/itl/ai-risk-management-framework</a
                        >
                    </li>
                </ul>
            </div>

        </>
    );
};
