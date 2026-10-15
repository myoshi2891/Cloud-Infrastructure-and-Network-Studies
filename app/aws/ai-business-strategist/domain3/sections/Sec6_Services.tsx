import React from 'react';

export const Sec6_Services: React.FC = () => {
    return (
        <section className="section" id="s6">
            <div className="sec-head">
                <span className="eyebrow">Chapter 06</span>
                <h2>
                    <i className="ti ti-settings"></i>
                    <span>AWS サービス・フレームワーク早見表(戦略レベル)</span>
                </h2>
            </div>
            <div className="prose">
                <p>
                    試験ガイドの対象範囲(Amazon Bedrock、Amazon SageMaker AI、Amazon
                    Quick、AWS CAF、責任共有モデル、Well-Architected の Responsible AI Lens
                    等)のうち、Domain 3 に関係する部分です。
                </p>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">名前</th>
                                <th scope="col">Domain 3 での位置づけ</th>
                                <th scope="col">覚えておくこと</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Amazon Bedrock Guardrails</td>
                                <td>安全性・プライバシー・正確性の統制</td>
                                <td>
                                    コンテンツフィルター、拒否トピック、ワード、機密情報、コンテキスト根拠、Automated
                                    Reasoning(英語(米国)のみ)。モデルに依存せず入出力に適用
                                </td>
                            </tr>
                            <tr>
                                <td>Amazon Bedrock Knowledge Bases</td>
                                <td>根拠づけ(RAG)</td>
                                <td>幻覚の低減と出典提示</td>
                            </tr>
                            <tr>
                                <td>Amazon Bedrock Evaluations</td>
                                <td>品質・公平性の評価</td>
                                <td>展開前後の評価。Clarify 後継の構成要素の 1 つ</td>
                            </tr>
                            <tr>
                                <td>Amazon SageMaker AI</td>
                                <td>カスタム ML の基盤</td>
                                <td>
                                    Clarify / Model Monitor / A2I は 2026-07-30
                                    以降、新規顧客不可(既存は継続利用可)。Model Cards
                                    などの記録は継続的に重要
                                </td>
                            </tr>
                            <tr>
                                <td>Amazon Quick</td>
                                <td>AI ビジネスアシスタント</td>
                                <td>対象範囲に含まれる。データアクセス権の統制が論点</td>
                            </tr>
                            <tr>
                                <td>AWS 責任共有モデル</td>
                                <td>役割分担</td>
                                <td>AWS は基盤、顧客はデータ・アクセス・設定・アプリ</td>
                            </tr>
                            <tr>
                                <td>Generative AI Security Scoping Matrix</td>
                                <td>利用形態別の統制範囲</td>
                                <td>スコープ 1〜5。番号が大きいほど自社の責任範囲が広い</td>
                            </tr>
                            <tr>
                                <td>Well-Architected Responsible AI Lens</td>
                                <td>責任ある AI のベストプラクティス</td>
                                <td>
                                    2025 年 11
                                    月公開。設計から運用までの質問とベストプラクティス。Generative
                                    AI Lens / ML Lens と併用
                                </td>
                            </tr>
                            <tr>
                                <td>AWS CAF</td>
                                <td>組織の AI 導入計画</td>
                                <td>ガバナンスの視点を含む全社的な計画・拡大の枠組み</td>
                            </tr>
                            <tr>
                                <td>AWS AI Service Cards</td>
                                <td>透明性</td>
                                <td>
                                    AWS 提供の AI
                                    サービスの用途・限界・責任ある利用に関する情報
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout warn">
                    <i className="ti ti-alert-triangle c-icon"></i>
                    <p>
                        最新性の注意: AWS は 2026 年 6 月に約 12 のサービス /
                        機能を新規顧客向けにメンテナンスモードへ移行すると発表しました(Amazon
                        Bedrock Agents は「Bedrock Agents Classic」へ、Kendra、Q Business
                        など)。試験は概念中心ですが、「サービス名を暗記する」より「役割(何のための統制か)」を理解し、最新の提供状況を公式ページで確認する姿勢が安全です。
                    </p>
                </div>
            </div>
        </section>
    );
};
