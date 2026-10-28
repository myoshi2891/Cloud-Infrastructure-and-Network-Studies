import React from 'react';

export const Sec7_Services: React.FC = () => {
    return (
        <section className="section" id="s7">
            <h2>
                <i className="ti ti-cloud"></i>6. 関連する AWS サービス・フレームワーク早見表
            </h2>
            <p>
                試験ガイドが「対象範囲」とするものを、Domain 4 の観点で整理します。いずれも{' '}
                <strong>戦略レベル(基本的な適用のみ)</strong> の理解で十分です。[S5]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">カテゴリ</th>
                            <th scope="col">項目</th>
                            <th scope="col">Domain 4 での位置づけ</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI / ML</td>
                            <td>Amazon Bedrock</td>
                            <td>
                                生成 AI の基盤。Guardrails(安全策)、Knowledge Bases、料金体系を知る
                            </td>
                            <td>[S2][S5][S31]</td>
                        </tr>
                        <tr>
                            <td>AI / ML</td>
                            <td>Amazon SageMaker AI</td>
                            <td>カスタム ML。マネージドかカスタムかの判断</td>
                            <td>[S2][S5]</td>
                        </tr>
                        <tr>
                            <td>BI</td>
                            <td>Amazon Quick</td>
                            <td>AI を活用した業務アシスタント</td>
                            <td>[S1][S2][S5]</td>
                        </tr>
                        <tr>
                            <td>戦略・ガバナンス</td>
                            <td>AWS Cloud Adoption Framework(CAF)</td>
                            <td>
                                6 つの視点(Business / People / Governance / Platform / Security / Operations)で AI 導入を計画・拡大
                            </td>
                            <td>[S2][S8][S34]</td>
                        </tr>
                        <tr>
                            <td>戦略・ガバナンス</td>
                            <td>AWS 責任共有モデル</td>
                            <td>AI ワークロードでのデータ保護とコンプライアンスの責任分担</td>
                            <td>[S2][S5][S30]</td>
                        </tr>
                        <tr>
                            <td>戦略・ガバナンス</td>
                            <td>Well-Architected Framework(Responsible AI レンズ)</td>
                            <td>ガバナンスのベストプラクティス</td>
                            <td>[S2]</td>
                        </tr>
                        <tr>
                            <td>料金・コスト</td>
                            <td>料金体系(従量・インスタンス・シート)</td>
                            <td>総コストの見積もり</td>
                            <td>[S2][S5]</td>
                        </tr>
                        <tr>
                            <td>料金・コスト</td>
                            <td>AWS Pricing Calculator / Cost Explorer</td>
                            <td>見積もりと分析</td>
                            <td>[S2][S5][S32][S33]</td>
                        </tr>
                        <tr>
                            <td>料金・コスト</td>
                            <td>Savings Plans</td>
                            <td>コスト最適化の例</td>
                            <td>[S2][S33]</td>
                        </tr>
                        <tr>
                            <td>料金・コスト</td>
                            <td>AWS Marketplace</td>
                            <td>構築・購入・提携の判断</td>
                            <td>[S2][S5]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>AWS CAF for AI の 6 つの視点(Domain 4 に関係が深いもの)</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">視点</th>
                            <th scope="col">役割(要約)</th>
                            <th scope="col">AI で加わる代表的な能力</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Business</td>
                            <td>AI 投資を事業成果につなげる</td>
                            <td>Generative AI</td>
                            <td>[S8]</td>
                        </tr>
                        <tr>
                            <td>People</td>
                            <td>技術とビジネスの橋渡しとなり、学び続ける文化を育む</td>
                            <td>ML Fluency、ワークフォース変革、文化の進化</td>
                            <td>[S8][S9]</td>
                        </tr>
                        <tr>
                            <td>Governance</td>
                            <td>AI の取り組みを調整し、便益を最大化、リスクを最小化</td>
                            <td>Responsible use of AI</td>
                            <td>[S8]</td>
                        </tr>
                        <tr>
                            <td>Platform</td>
                            <td>AI ライフサイクルを支える基盤設計</td>
                            <td>AI ライフサイクル管理と MLOps</td>
                            <td>[S10]</td>
                        </tr>
                        <tr>
                            <td>Security</td>
                            <td>AI システムへの脅威への対応</td>
                            <td>(CAF の考え方を基に AI 特有の攻撃経路を整理)</td>
                            <td>[S8]</td>
                        </tr>
                        <tr>
                            <td>Operations</td>
                            <td>本番での継続的な運用</td>
                            <td>(本番運用・監視)</td>
                            <td>[S8]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote>
                <p>
                    <strong>補足</strong>: AWS CAF for AI
                    のホワイトペーパーには「歴史的な参考資料」との注記があります。概念は今も有用ですが、最新の内容は
                    AWS の公式ページで確認してください。[S6]
                </p>
            </blockquote>
        </section>
    );
};
