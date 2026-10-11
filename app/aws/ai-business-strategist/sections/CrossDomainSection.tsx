export const CrossDomainSection = () => {
    return (
        <>
            <h1 id="s87">横断編と仕上げ</h1>
            <h2 id="s88">Step 14 試験範囲の AWS サービス・フレームワーク(戦略レベル)</h2>
            <p>
                <strong>重要</strong>: 試験は AWS
                サービスの<strong>設定・操作を問いません</strong>。「何のためのサービスか」「ビジネス判断にどう関わるか」を押さえます。
            </p>
            <h3 id="s89">14-1 範囲内のサービス・機能(試験ガイド記載)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">カテゴリ</th>
                            <th scope="col">対象</th>
                            <th scope="col">適用範囲</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI / ML</td>
                            <td>Amazon Bedrock、Amazon SageMaker AI</td>
                            <td>基本的な適用のみ</td>
                        </tr>
                        <tr>
                            <td>BI</td>
                            <td>Amazon Quick</td>
                            <td>基本的な適用のみ</td>
                        </tr>
                        <tr>
                            <td>クラウド戦略とガバナンス</td>
                            <td>AWS CAF、AWS 責任共有モデル</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>料金とコスト管理</td>
                            <td>
                                AWS AI サービスの料金体系(従量・インスタンス・シート)、AWS Cost
                                Explorer、AWS Marketplace、AWS Pricing Calculator
                            </td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s90">14-2 サービス・フレームワーク別の要点とベストプラクティス</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">名称</th>
                            <th scope="col">一言で</th>
                            <th scope="col">試験での押さえどころ</th>
                            <th scope="col">ベストプラクティス</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Amazon Bedrock</td>
                            <td>
                                基盤モデルで生成 AI アプリ・エージェントを作る管理型プラットフォーム
                            </td>
                            <td>
                                料金の種類(オンデマンド・バッチ・Provisioned
                                Throughput・カスタマイズ)、<strong>Guardrails</strong>、<strong
                                    >Knowledge Bases</strong
                                >
                            </td>
                            <td>
                                まず管理型で始め、Guardrails で安全性を確保、社内知識は RAG
                                で活用、コスト構造を事前に把握
                            </td>
                        </tr>
                        <tr>
                            <td>Amazon SageMaker AI</td>
                            <td>
                                ML
                                モデルや基盤モデルを構築・学習・デプロイする完全マネージドサービス
                            </td>
                            <td>
                                カスタム ML が必要な場面と、管理型で足りる場面の<strong
                                    >使い分け</strong
                                >
                            </td>
                            <td>
                                独自性が必要で専門人材がいる場合に選択。まず既製・管理型で足りないかを確認
                            </td>
                        </tr>
                        <tr>
                            <td>Amazon Quick</td>
                            <td>
                                研究・BI・自動化・アクション実行を一つにまとめた、AI
                                搭載の職場向けアシスタント(旧称 Quick Suite)
                            </td>
                            <td>従業員向け AI アシスタントの Buy 選択肢、シート課金の例</td>
                            <td>権限の範囲内でデータに接続し、利用ルールと教育を併せて導入</td>
                        </tr>
                        <tr>
                            <td>AWS CAF / CAF-AI</td>
                            <td>
                                事業・人材・ガバナンス・基盤・セキュリティ・運用の視点で導入計画を整理
                            </td>
                            <td>全社的な計画と拡大、準備度評価の型</td>
                            <td>6 つの視点を漏れなく確認し、技術偏重を避ける</td>
                        </tr>
                        <tr>
                            <td>AWS 責任共有モデル</td>
                            <td>AWS と利用者の責任分担</td>
                            <td>
                                AI
                                ワークロードでのデータセキュリティ・コンプライアンスの<strong>ガバナンスレベル</strong>の理解
                            </td>
                            <td>利用形態(Scope)ごとに自社が担う統制を整理</td>
                        </tr>
                        <tr>
                            <td>Well-Architected Responsible AI Lens</td>
                            <td>責任ある AI のための質問集とベストプラクティス</td>
                            <td>ガバナンスのベストプラクティスの参照元。責任ある AI の次元</td>
                            <td>設計段階から使い、ユースケースを狭く定義して課題から逆算</td>
                        </tr>
                        <tr>
                            <td>AWS Pricing Calculator / Cost Explorer</td>
                            <td>見積もりと実績分析</td>
                            <td>ビジネスケース作成とコスト管理</td>
                            <td>導入前に見積もり、導入後に定期分析</td>
                        </tr>
                        <tr>
                            <td>AWS Marketplace</td>
                            <td>ソリューションの探索・調達</td>
                            <td>Build・Buy・Partner の評価</td>
                            <td>複数候補を同じ評価軸で比較</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s91">14-3 範囲外の代表例(試験ガイド記載)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">カテゴリ</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>インフラ・コンピュート</td>
                            <td>Amazon EC2、AWS Lambda</td>
                        </tr>
                        <tr>
                            <td>ネットワーク・配信</td>
                            <td>Amazon VPC、Amazon CloudFront</td>
                        </tr>
                        <tr>
                            <td>データベース・ストレージ</td>
                            <td>Amazon RDS、Amazon S3</td>
                        </tr>
                        <tr>
                            <td>コンテナ</td>
                            <td>Amazon ECS、Amazon EKS</td>
                        </tr>
                        <tr>
                            <td>開発ツール・DevOps</td>
                            <td>AWS CodePipeline、AWS CloudFormation</td>
                        </tr>
                        <tr>
                            <td>セキュリティの実装・設定</td>
                            <td>IAM ポリシー記述、AWS KMS</td>
                        </tr>
                        <tr>
                            <td>その他</td>
                            <td>IoT、メディアなど専門的なサービス</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">範囲内サービス</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">範囲外サービス</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-out-of-scope-services.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-out-of-scope-services.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">技術・概念の一覧</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Amazon Quick 発表(AWS News Blog)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/blogs/aws/reimagine-the-way-you-work-with-ai-agents-in-amazon-quick-suite/"
                            >https://aws.amazon.com/blogs/aws/reimagine-the-way-you-work-with-ai-agents-in-amazon-quick-suite/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">What is Amazon SageMaker AI?</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
                            >https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Amazon Bedrock 料金</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/bedrock/pricing/"
                            >https://aws.amazon.com/bedrock/pricing/</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s92">Step 15 試験対策と練習問題</h2>
            <h3 id="s93">15-1 問題を解く 6 つの視点(本ガイドの推奨。公式の解法ではありません)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">視点</th>
                            <th scope="col">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1 立場を確認</td>
                            <td>
                                自分は誰の立場か(ビジネス職)。<strong
                                    >技術実装を選ぶ選択肢は疑う</strong
                                >
                            </td>
                        </tr>
                        <tr>
                            <td>2 目的を確認</td>
                            <td>事業目標・成果は何か。目的に直結する選択肢を選ぶ</td>
                        </tr>
                        <tr>
                            <td>3 順序を確認</td>
                            <td>
                                「最初に」「次に」を問う問題は、<strong
                                    >測定(ベースライン)→ 小さく検証 → 拡大</strong
                                >、<strong>リスク評価 → 統制</strong>の順序が基本
                            </td>
                        </tr>
                        <tr>
                            <td>4 リスクと統制</td>
                            <td>影響が大きいなら人の関与、ガバナンス、段階的展開を選ぶ</td>
                        </tr>
                        <tr>
                            <td>5 極端を避ける</td>
                            <td>
                                「すべて禁止」「全社一斉導入」「制限なしで開放」のような極端案は誤りになりやすい
                            </td>
                        </tr>
                        <tr>
                            <td>6 複数選択の注意</td>
                            <td>
                                選ぶ個数を確認し、<strong>すべての正解を選ぶ</strong>(部分点なし)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s94">15-2 よくある落とし穴</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">落とし穴</th>
                            <th scope="col">正しい考え方</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI ありきで考える</td>
                            <td>ルールベースや AI 不使用が最適な場合もある(Skill 2.1.4、1.2.1)</td>
                        </tr>
                        <tr>
                            <td>導入前の数値を取らない</td>
                            <td>ベースラインなしに効果は証明できない</td>
                        </tr>
                        <tr>
                            <td>技術指標だけで成功とする</td>
                            <td>事業 KPI と先行指標をひも付ける</td>
                        </tr>
                        <tr>
                            <td>導入して終わり</td>
                            <td>監視・ドリフト・バイアスドリフトへの継続対応が必要</td>
                        </tr>
                        <tr>
                            <td>ガバナンスを後付けにする</td>
                            <td>企画段階から組み込む(governance by design)</td>
                        </tr>
                        <tr>
                            <td>いきなり全社展開</td>
                            <td>短期の成功から段階的に拡大</td>
                        </tr>
                        <tr>
                            <td>禁止だけで管理しようとする</td>
                            <td>承認済みの代替手段と分類の透明性で、シャドー AI を抑える</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s95">15-3 練習問題(本ガイドのオリジナル。実際の試験問題ではありません)</h3>
            <div className="qcard">
                <p>
                    <strong>問 1.</strong> ある企業が、社内規程に基づく問い合わせ対応に生成 AI
                    を導入したいが、規程は頻繁に改定される。最新の規程に基づき、根拠を示して回答させたい。最も適切な手段はどれか。
                </p>
                <ul>
                    <li><strong>A.</strong> モデルを毎月ゼロから学習し直す</li>
                    <li><strong>B.</strong> RAG により最新の規程文書を検索して回答に反映する</li>
                    <li><strong>C.</strong> 回答を人がすべて手書きする</li>
                    <li><strong>D.</strong> 一般公開の生成 AI サービスに規程全文を入力する</li>
                </ul>
            </div>
            <div className="qcard">
                <p>
                    <strong>問 2.</strong> カスタマーサポート部門が AI
                    導入の効果を経営層に示したい。導入前に最初に行うべきことはどれか。
                </p>
                <ul>
                    <li><strong>A.</strong> 導入後の目標値のみを設定する</li>
                    <li>
                        <strong>B.</strong>
                        現在の平均処理時間や顧客満足度をベースラインとして測定する
                    </li>
                    <li><strong>C.</strong> 競合の広告を調べる</li>
                    <li><strong>D.</strong> 全社一斉に展開する</li>
                </ul>
            </div>
            <div className="qcard">
                <p>
                    <strong>問 3.</strong> 従業員が承認のない生成 AI
                    ツールに機密情報を入力していることが判明した。最も適切な対応はどれか。<strong
                        >(2 つ選択)</strong
                    >
                </p>
                <ul>
                    <li>
                        <strong>A.</strong>
                        承認済み・評価中・ブロックの分類を明示し、承認済みの代替ツールを用意する
                    </li>
                    <li><strong>B.</strong> 何も対応せず様子を見る</li>
                    <li>
                        <strong>C.</strong> 入力してはいけない情報の教育と利用ガイドラインを周知する
                    </li>
                    <li><strong>D.</strong> すべての AI 利用を無期限に禁止する</li>
                    <li><strong>E.</strong> 各自の判断に任せる</li>
                </ul>
            </div>
            <div className="qcard">
                <p>
                    <strong>問 4.</strong> 融資審査の支援に AI
                    を使う計画がある。個人の生活に大きく影響する判断である。最も適切な設計はどれか。
                </p>
                <ul>
                    <li><strong>A.</strong> AI の判断を完全自動で確定する</li>
                    <li>
                        <strong>B.</strong> 人による確認、エスカレーション基準、説明可能性を組み込む
                    </li>
                    <li><strong>C.</strong> 精度だけを最優先にする</li>
                    <li><strong>D.</strong> 利用者に AI の利用を知らせない</li>
                </ul>
            </div>
            <div className="qcard">
                <p>
                    <strong>問 5.</strong> パイロットが成功した。次に取るべき行動として最も適切なものはどれか。
                </p>
                <ul>
                    <li>
                        <strong>A.</strong>
                        本番の基準(運用・ガバナンス・コスト)を確認し、段階的に展開する
                    </li>
                    <li><strong>B.</strong> 直ちに全社へ同時展開する</li>
                    <li><strong>C.</strong> 成果の共有をせず、次の実験に移る</li>
                    <li><strong>D.</strong> 監視は不要として運用チームを解散する</li>
                </ul>
            </div>
            <div className="qcard">
                <p>
                    <strong>問 6.</strong> 競合の AI 活用が急速に進む業界で、当社は AI
                    の取り組みがまだ初期段階である。投資水準の判断として最も適切なものはどれか。
                </p>
                <ul>
                    <li><strong>A.</strong> 何もしない</li>
                    <li>
                        <strong>B.</strong>
                        競争状況と事業価値に基づき、優先領域に投資を厚くしつつ段階的に進める
                    </li>
                    <li><strong>C.</strong> 流行しているからという理由で最大限投資する</li>
                    <li><strong>D.</strong> 規制やリスクを考慮せず一斉導入する</li>
                </ul>
            </div>
            <details>
                <summary>解答と解説</summary>
                <div className="tbl">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">問</th>
                                <th scope="col">正解</th>
                                <th scope="col">解説</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>B</td>
                                <td>
                                    頻繁に変わる知識は RAG
                                    で最新文書を参照させる。毎回の再学習(A)はコストと手間が過大。D
                                    は情報管理上の問題(Step 3、Step 2-4)
                                </td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>B</td>
                                <td>ベースラインがなければ効果を示せない(Step 5-3)</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>A, C</td>
                                <td>
                                    分類の透明化、代替手段、教育・ガイドラインが基本。放置(B)、無期限の全面禁止(D)、丸投げ(E)は不適切(Step
                                    2-4)
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>B</td>
                                <td>
                                    影響が大きい判断は、人の関与、エスカレーション、説明可能性、透明性が必要(Step
                                    7)
                                </td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>A</td>
                                <td>
                                    実験から本番への移行は、ガバナンスと運用要件を満たしたうえで段階的に(Step
                                    13)
                                </td>
                            </tr>
                            <tr>
                                <td>6</td>
                                <td>B</td>
                                <td>
                                    投資水準は業界成熟度と競争のダイナミクス、事業価値で決める(Step
                                    6-4)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </details>

        </>
    );
};
