import { Diagram } from '../Diagram';

export function Sec7_DecisionPatterns() {
    return (
        <section id="s7" className="section">

                        <h2>7. Domain 2 全体を貫く判断の型</h2>

                        <p>問題に迷ったときは、次の 8 つの型に当てはめて考えてください。</p>
                        <div className="table-wrap" role="region" tabIndex={0} aria-label="表: 7. Domain 2 全体を貫く判断の型">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">判断の型</th>
                                        <th scope="col">迷ったときの答え</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>出発点はどこか</td>
                                        <td>技術ではなく、<strong>ビジネス課題と成果</strong></td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>AI は本当に必要か</td>
                                        <td>
                                            ルールベースや業務改善で足りるなら、<strong>AI を使わない</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>作るか買うか</td>
                                        <td>
                                            差別化に効くなら Build、一般的な課題なら
                                            Buy、専門性が足りなければ Partner。<strong>制約 (予算、期間、能力、規制) で決める</strong>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>どれを先にやるか</td>
                                        <td>
                                            価値だけでなく、<strong>実現可能性、持続可能性、戦略的整合性</strong>も含めて評価する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>効果をどう示すか</td>
                                        <td>
                                            <strong>導入前にベースラインを取り</strong>、有形と無形の KPI で測る
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>ROI の計算</td>
                                        <td>
                                            <strong>便益もコストも漏れなく</strong>、複数年で、保守的に
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>進捗をどう確認するか</td>
                                        <td>
                                            成果を待たず、<strong>先行指標</strong>を早く、頻繁に見る
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>投資の水準</td>
                                        <td>
                                            業界の成熟度と競争動向に合わせ、<strong>段階的に</strong>投資して見直す
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>全体を 1 枚の流れにまとめると、次のようになります。</p>
                        <Diagram id="d19" />
                    
        </section>
    );
}
