import { Diagram } from '../Diagram';

export function Skill2_1_2() {
    return (
        <>
<h3 id="s3-h2">Skill 2.1.2: Build-Buy-Partner を評価する</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨:
                                予算、期間、能力、ベンダー提案、規制コンプライアンス要件などを考慮して、AI
                                導入の「作る、買う、組む」を評価する。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            同じ目的でも、「自社で作る」「既製の製品やサービスを買う」「パートナーと組む」のどれが最適かを、制約条件から選べるかが問われます。
                        </p><h4>初学者向けの解説</h4><p><strong>3 つの選択肢</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.2 3 つの選択肢">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">選択肢</th>
                                        <th scope="col">意味</th>
                                        <th scope="col">向くケース</th>
                                        <th scope="col">主な注意点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Build (作る)</td>
                                        <td>自社でモデルやアプリを開発する</td>
                                        <td>差別化の源泉になる、独自データを活かす、要件が特殊</td>
                                        <td>時間、人材、費用がかかる。運用も自社責任</td>
                                    </tr>
                                    <tr>
                                        <td>Buy (買う)</td>
                                        <td>既製の製品、SaaS、API を利用する</td>
                                        <td>一般的な課題、早く価値を出したい、人材が少ない</td>
                                        <td>独自性が出にくい、ベンダー依存、カスタマイズの限界</td>
                                    </tr>
                                    <tr>
                                        <td>Partner (組む)</td>
                                        <td>
                                            システムインテグレーターやコンサルなどの外部専門家と共同で進める
                                        </td>
                                        <td>社内に専門性がない、短期間で立ち上げたい</td>
                                        <td>費用、ナレッジの社内定着、依存のリスク</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>判断の 5 つの観点</strong> (試験ガイドが挙げる要素)</p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.2 判断の 5 つの観点">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">観点</th>
                                        <th scope="col">確認する問い</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>予算</td>
                                        <td>
                                            初期費用と運用費用はいくらか。総所有コスト (TCO)
                                            で比べたか
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>期間</td>
                                        <td>いつまでに価値を出す必要があるか</td>
                                    </tr>
                                    <tr>
                                        <td>能力</td>
                                        <td>社内に必要な人材とスキルがあるか。外部から補えるか</td>
                                    </tr>
                                    <tr>
                                        <td>ベンダー提案</td>
                                        <td>
                                            提案内容、実績、価格体系、契約条件、サポートは妥当か
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>規制コンプライアンス</td>
                                        <td>
                                            データの扱い、所在地、監査対応などの要件を満たせるか
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>意思決定の流れ (簡易版)</strong></p><Diagram id="d4" /><p>
                            <strong>AWS の選択肢を「作る、買う、組む」に当てはめる (戦略レベル)</strong>
                        </p><p>
                            試験ガイドは Amazon Bedrock、Amazon SageMaker AI、Amazon Quick
                            を戦略レベルで理解することを求め、AWS Marketplace を Build-Buy-Partner
                            の評価に使えるツールとして挙げています。
                        </p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.2 意思決定の流れ (簡易版)">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">選択肢</th>
                                        <th scope="col">AWS での一例</th>
                                        <th scope="col">位置づけ</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Buy (すぐ使える)</td>
                                        <td>Amazon Quick</td>
                                        <td>
                                            AI
                                            アシスタント、ダッシュボード作成、ワークフロー自動化を、機械学習の専門知識なしで使える
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>中間 (基盤モデルを使って組み立てる)</td>
                                        <td>Amazon Bedrock</td>
                                        <td>
                                            生成 AI
                                            アプリケーションを構築するプラットフォーム。ガードレールやナレッジベースなどの機能がある
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Build (独自の ML を作る)</td>
                                        <td>Amazon SageMaker AI</td>
                                        <td>
                                            独自のモデルを作って学習、展開するためのサービス。マネージドで足りるか、カスタムが必要かの判断が論点
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Partner / 調達</td>
                                        <td>AWS Marketplace</td>
                                        <td>
                                            サードパーティのソフトウェアやサービスを探して比較、調達する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><div className="callout">
                            <p>
                                注意:
                                試験ガイドは、これらのサービスを<strong>設定、管理できることは求めていません</strong>。「どの状況で何を選ぶか」の判断が問われます。
                            </p>
                        </div><p><strong>ベンダー提案を評価するときのチェックリスト</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.2 ベンダー提案を評価するときのチェックリスト">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">評価軸</th>
                                        <th scope="col">確認内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>適合性</td>
                                        <td>自社の課題と成果指標に合っているか</td>
                                    </tr>
                                    <tr>
                                        <td>実績</td>
                                        <td>同業種や同規模での導入事例があるか</td>
                                    </tr>
                                    <tr>
                                        <td>データの扱い</td>
                                        <td>自社データの利用範囲、保管場所、学習への利用の有無</td>
                                    </tr>
                                    <tr>
                                        <td>コンプライアンス</td>
                                        <td>業界規制や社内規程を満たせるか。監査に対応できるか</td>
                                    </tr>
                                    <tr>
                                        <td>コスト構造</td>
                                        <td>
                                            従量課金、インスタンス課金、シート課金のどれか。総額の見通しは立つか
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>拡張性と出口</td>
                                        <td>将来の拡大や乗り換え (ロックイン) に対応できるか</td>
                                    </tr>
                                    <tr>
                                        <td>サポート</td>
                                        <td>障害時の対応、SLA、ロードマップ</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>中核を作り、周辺は買う。</strong>
                                競争優位に直結する部分に投資し、一般的な機能は既製品で済ませる。
                            </li>
                            <li>
                                <strong>TCO で比べる。</strong>
                                初期費用だけでなく、運用、人件費、統合、教育の費用も含める。
                            </li>
                            <li>
                                <strong>段階的に進める。</strong>
                                まず買う、または組んで早く価値を出し、必要に応じて内製化を進める道もある。
                            </li>
                            <li>
                                <strong>規制要件を初期に確認する。</strong>
                                後から気づくと手戻りが大きい。
                            </li>
                            <li>
                                <strong>ベンダーに検証させる。</strong> 自社データを使った小さな PoC
                                で、提案の主張を確かめる。
                            </li>
                            <li>
                                <strong>出口を設計する。</strong>
                                データの持ち出しやモデルの入れ替えを契約時点で考える。
                            </li>
                        </ul><h4>よくある落とし穴</h4><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.2 よくある落とし穴">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">落とし穴</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>何でも内製したがる</td>
                                        <td>差別化に効かない部分は買う</td>
                                    </tr>
                                    <tr>
                                        <td>価格の安さだけで選ぶ</td>
                                        <td>TCO、規制対応、実績を含めて比較する</td>
                                    </tr>
                                    <tr>
                                        <td>パートナー任せで社内に知見が残らない</td>
                                        <td>知識移転を契約に含める</td>
                                    </tr>
                                    <tr>
                                        <td>ベンダーの説明を鵜呑みにする</td>
                                        <td>自社データで検証する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>「期間が短く、社内人材が少ない」なら Buy か Partner が有力。</li>
                            <li>
                                「独自データが競争力の源泉で、専門人材もいる」なら Build が有力。
                            </li>
                            <li>
                                「厳しい規制要件がある」なら、コンプライアンスを満たせるかが決め手になる。
                            </li>
                        </ul><hr />
        </>
    );
}
