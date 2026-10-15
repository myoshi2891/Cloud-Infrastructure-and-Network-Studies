export function Sec11_References() {
    return (
        <section id="s11" className="section">

                        <h2>11. 参考文献 (ソース URL)</h2>

                        <p>
                            本ガイドの根拠として使った情報源です。Skill
                            の内容は、試験ガイドの記載を基本にしています。ROI
                            の計算式、SMART、ステージゲートなどのビジネス上の一般的な考え方は、特定の
                            AWS
                            文書に固有のものではなく、広く使われている実務の考え方を試験の文脈に合わせて整理したものです。
                        </p>
                        <h3 id="s11-h1">11.1 試験の公式情報 (一次情報)</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">資料</th>
                                        <th scope="col">URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS Certified AI Business Strategist 認定ページ</td>
                                        <td>
                                            https://aws.amazon.com/certification/certified-ai-business-strategist/
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>試験ガイド (AIB-C01) 全体</td>
                                        <td>
                                            https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Content Domain 2: AI Strategy and Business Value
                                            Creation
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>試験に登場しうる技術と概念</td>
                                        <td>
                                            https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>対象範囲内の AWS サービスと機能</td>
                                        <td>
                                            https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="s11-h2">
                            11.2 AWS の公式ドキュメント (サービス、フレームワーク、料金)
                        </h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">資料</th>
                                        <th scope="col">本ガイドでの用途</th>
                                        <th scope="col">URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            AWS CAF for AI, ML, and Generative AI (ホワイトペーパー)
                                        </td>
                                        <td>
                                            組織全体で AI を計画、拡大する枠組み (Skill 2.1.1、全般)
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Well-Architected Generative AI Lens</td>
                                        <td>
                                            生成 AI の 6 つの柱にわたるベストプラクティス (Skill
                                            2.2.5)
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/wellarchitected/latest/generative-ai-lens/generative-ai-lens.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Building an enterprise-ready generative AI platform on
                                            AWS (Prescriptive Guidance)
                                        </td>
                                        <td>
                                            試作の乱立、コスト最適化と ROI 測定などの課題 (Skill
                                            2.1.3、2.2.3)
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/prescriptive-guidance/latest/strategy-enterprise-ready-gen-ai-platform/introduction.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Bedrock の料金</td>
                                        <td>
                                            オンデマンド、バッチ、キャッシュ、プロビジョンドスループットなどの区分
                                            (Skill 2.2.5)
                                        </td>
                                        <td>https://aws.amazon.com/bedrock/pricing/</td>
                                    </tr>
                                    <tr>
                                        <td>Amazon SageMaker AI の料金</td>
                                        <td>オンデマンドと Savings Plans (Skill 2.2.5)</td>
                                        <td>https://aws.amazon.com/sagemaker-ai/pricing/</td>
                                    </tr>
                                    <tr>
                                        <td>What are Savings Plans?</td>
                                        <td>
                                            1 年または 3 年のコミットメントによる割引 (Skill 2.2.5)
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/savingsplans/latest/userguide/what-is-savings-plans.md
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Quick とは</td>
                                        <td>
                                            AI を使った
                                            BI、ワークフロー自動化、ロール別のサブスクリプション
                                            (Skill 2.1.2、2.2.5)
                                        </td>
                                        <td>
                                            https://docs.aws.amazon.com/quicksight/latest/user/quickstart.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Quick ドキュメント (トップ)</td>
                                        <td>同上</td>
                                        <td>https://docs.aws.amazon.com/quick/</td>
                                    </tr>
                                    <tr>
                                        <td>Amazon Quick FAQ</td>
                                        <td>部門別の活用例 (Skill 2.1.1)</td>
                                        <td>https://aws.amazon.com/quick/faqs/</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            AWS Billing and Cost Management
                                            (ログ記録と監視のページ内の Pricing Calculator の説明)
                                        </td>
                                        <td>事前の費用見積もり (Skill 2.2.5)</td>
                                        <td>
                                            https://docs.aws.amazon.com/cost-management/latest/userguide/billing-security-logging.html
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AWS Pricing Calculator</td>
                                        <td>費用の見積もりツール</td>
                                        <td>https://calculator.aws/</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Marketplace</td>
                                        <td>サードパーティ製品の探索、調達 (Skill 2.1.2、2.2.5)</td>
                                        <td>https://aws.amazon.com/marketplace</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="s11-h3">11.3 補助的な情報源 (参考)</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">資料</th>
                                        <th scope="col">用途</th>
                                        <th scope="col">URL</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS Partner Network ブログ: McKinsey との対談</td>
                                        <td>
                                            優先順位付けと、PoC、MVP、拡大という進め方 (Skill 2.1.3)
                                        </td>
                                        <td>
                                            https://aws.amazon.com/blogs/apn/generative-ai-trends-and-opportunities-for-aws-partners-a-conversation-with-mckinsey-and-company/
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="s11-h4">11.4 注意事項</h3>
                        <ul>
                            <li>
                                <strong>ベータ試験の条件:</strong> 認定ページ (ベータ試験の概要)
                                と試験ガイドで、試験時間などの条件が異なっています (第 1
                                章参照)。受験前に最新の条件を確認してください。
                            </li>
                            <li>
                                <strong>試験の性質:</strong> 認定ページは、この試験が「AWS
                                のサービスの知識を評価するものではない」と説明しています。一方、試験ガイドは
                                Amazon Bedrock、Amazon SageMaker AI、Amazon Quick、AWS CAF
                                などを戦略レベルで理解することを推奨しています。サービスの設定方法ではなく、<strong>どの場面で何を選ぶか</strong>を理解する方針で学習してください。
                            </li>
                            <li>
                                <strong>料金の情報:</strong>
                                料金、モデル、サービスの名称、機能は変わります。本ガイドの料金に関する記述は仕組みの理解のためのもので、具体的な金額は必ず公式の料金ページで確認してください。本ガイドの計算例の数値は、説明用の架空の値です。
                            </li>
                            <li>
                                <strong>試験ガイドの更新:</strong>
                                試験内容は変更される可能性があります。学習の前に、試験ガイドの最新版を確認してください。
                            </li>
                            <li>
                                <strong>確認日:</strong> 本ガイドは 2026-09-28
                                時点の公開情報に基づいています。
                            </li>
                        </ul>
                    
        </section>
    );
}
