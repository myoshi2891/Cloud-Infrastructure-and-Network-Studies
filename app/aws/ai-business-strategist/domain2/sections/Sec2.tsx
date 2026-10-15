export function Sec2() {
    return (
        <section id="s2" className="section">

                        <h2>2. Step 0: 最初に覚える用語</h2>

                        <p>
                            Domain 2
                            の解説で何度も出てくる用語を先に整理します。ここで一度読んでおけば、以降がぐっと読みやすくなります。
                        </p>
                        <div className="table-wrap" role="region" tabIndex={0} aria-label="表: 2. Step 0: 最初に覚える用語">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">用語</th>
                                        <th scope="col">やさしい説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ユースケース</td>
                                        <td>
                                            AI を使って解きたい具体的な業務課題。例:
                                            問い合わせ対応の自動化
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ビジネス成果 (アウトカム)</td>
                                        <td>
                                            取り組みの結果として事業に起きる変化。例:
                                            顧客の待ち時間の短縮、売上の増加
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>KPI (重要業績評価指標)</td>
                                        <td>
                                            目標の達成度を測る数値。例: 一次解決率、1
                                            件あたり処理コスト
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ベースライン</td>
                                        <td>AI を入れる前の現状値。効果を測る「ものさし」の起点</td>
                                    </tr>
                                    <tr>
                                        <td>ROI (投資利益率)</td>
                                        <td>
                                            投資に対してどれだけ利益が戻ったか。(便益 - コスト) ÷
                                            コスト
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>TCO (総所有コスト)</td>
                                        <td>
                                            導入から運用までにかかる費用の合計。利用料だけでなく、人件費や統合費用も含む
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>先行指標</td>
                                        <td>将来の成功を早めに予測できる指標。例: 利用率の伸び</td>
                                    </tr>
                                    <tr>
                                        <td>遅行指標</td>
                                        <td>
                                            結果が出てから分かる指標。例:
                                            年間の売上、年間のコスト削減額
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>PoC (概念実証)</td>
                                        <td>「技術的にできそうか」を小さく試す検証</td>
                                    </tr>
                                    <tr>
                                        <td>パイロット</td>
                                        <td>限られた範囲で実業務に使って効果を確かめる試行</td>
                                    </tr>
                                    <tr>
                                        <td>Build-Buy-Partner</td>
                                        <td>
                                            自社で作る、既製品を買う、パートナーと組む、の 3
                                            つの調達方針
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ルールベース自動化</td>
                                        <td>
                                            「もし A なら B」という決まったルールで動く仕組み。AI
                                            を使わない
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ロックイン</td>
                                        <td>
                                            特定ベンダーやプラットフォームに依存して、乗り換えにくくなること
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>生成 AI (GenAI)</td>
                                        <td>文章や画像などを新しく生成できる AI</td>
                                    </tr>
                                    <tr>
                                        <td>トークン</td>
                                        <td>
                                            生成 AI
                                            が文章を処理する最小単位。利用料金の計算単位になることが多い
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>FinOps</td>
                                        <td>
                                            クラウドの費用を、事業と技術と財務が協力して管理する考え方
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout">
                            <p>
                                ポイント: 試験は「AI
                                とは何か」の細かい技術説明を求めるのではなく、こうした<strong>ビジネス用語を使って判断できるか</strong>を見ます。
                            </p>
                        </div>
                    
        </section>
    );
}
