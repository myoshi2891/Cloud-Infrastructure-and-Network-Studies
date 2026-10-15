export function Sec6_Services() {
    return (
        <section id="s6" className="section">

                        <h2>6. Domain 2 に登場する AWS のサービス、フレームワーク、ツール</h2>

                        <p>
                            試験ガイドは、これらを「戦略レベル」で理解することを求めています。設定や運用の手順は範囲外です。
                        </p>
                        <div className="table-wrap" role="region" tabIndex={0} aria-label="表: 6. Domain 2 に登場する AWS のサービス、フレームワーク、ツール">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">分類</th>
                                        <th scope="col">名称</th>
                                        <th scope="col">戦略レベルでの理解</th>
                                        <th scope="col">関連 Skill</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AI / ML</td>
                                        <td>Amazon Bedrock</td>
                                        <td>
                                            生成 AI
                                            アプリケーションを構築するプラットフォーム。料金の区分
                                            (オンデマンド、バッチ、プロビジョンドスループットなど)、ガードレール、ナレッジベースを知っておく
                                        </td>
                                        <td>2.1.2、2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>AI / ML</td>
                                        <td>Amazon SageMaker AI</td>
                                        <td>
                                            独自の ML
                                            を作る場面。マネージドで足りるか、カスタムが必要かの判断。インスタンス課金と
                                            Savings Plans
                                        </td>
                                        <td>2.1.2、2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>ビジネスインテリジェンス</td>
                                        <td>Amazon Quick</td>
                                        <td>
                                            AI
                                            を使った業務アシスタント、ダッシュボード作成、ワークフロー自動化。機械学習の専門知識なしで使える。利用者ごとのシート課金
                                        </td>
                                        <td>2.1.2、2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>戦略</td>
                                        <td>AWS Cloud Adoption Framework (AWS CAF)</td>
                                        <td>
                                            AI
                                            の取り組みを組織全体で計画、拡大するための枠組み。ビジネス、人材、ガバナンス、プラットフォーム、セキュリティ、オペレーションの
                                            6 つの視点
                                        </td>
                                        <td>2.1.1、全般</td>
                                    </tr>
                                    <tr>
                                        <td>ガバナンス</td>
                                        <td>AWS 責任共有モデル</td>
                                        <td>
                                            AI
                                            ワークロードでのデータセキュリティとコンプライアンスの責任分担
                                            (ガバナンスレベル)
                                        </td>
                                        <td>2.1.2</td>
                                    </tr>
                                    <tr>
                                        <td>ガバナンス</td>
                                        <td>Well-Architected Framework (Responsible AI Lens)</td>
                                        <td>
                                            責任ある AI のベストプラクティス。生成 AI 向けの
                                            Generative AI Lens も存在する
                                        </td>
                                        <td>2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>AWS AI サービスの料金体系</td>
                                        <td>従量課金、インスタンス課金、シート課金</td>
                                        <td>2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>AWS Pricing Calculator</td>
                                        <td>事前の費用見積もり</td>
                                        <td>2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>AWS Cost Explorer</td>
                                        <td>実績のコスト分析</td>
                                        <td>2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>Savings Plans</td>
                                        <td>利用量のコミットメントによる割引</td>
                                        <td>2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>調達</td>
                                        <td>AWS Marketplace</td>
                                        <td>
                                            製品やサービスを比較、調達。Build-Buy-Partner
                                            の評価に使う
                                        </td>
                                        <td>2.1.2</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout">
                            <p>
                                補足: AWS Cloud Adoption Framework for AI, ML, and Generative AI
                                (CAF-AI) のホワイトペーパーは、AWS
                                のサイト上で「歴史的な参照用であり、一部の内容が古い可能性がある」と表示されています。概念の理解には有用ですが、最新の情報は他の公式資料と併せて確認してください。
                            </p>
                        </div>
                    
        </section>
    );
}
