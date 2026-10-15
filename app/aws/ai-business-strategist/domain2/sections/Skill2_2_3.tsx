import { Diagram } from '../Diagram';

export function Skill2_2_3() {
    return (
        <>
<h3 id="s4-h3">Skill 2.2.3: ROI を包括的に算出する</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨:
                                時間の節約、コスト削減、売上成長、生産性向上などを含む包括的なフレームワークで、AI
                                の投資利益率 (ROI) を計算する。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            「投資に対して、どれだけ価値が戻るか」を、便益とコストの両面から<strong>漏れなく</strong>計算できるかが問われます。
                        </p><h4>初学者向けの解説</h4><p><strong>基本の式</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.2.3 基本の式">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">指標</th>
                                        <th scope="col">式</th>
                                        <th scope="col">意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ROI</td>
                                        <td>(総便益 - 総コスト) ÷ 総コスト</td>
                                        <td>投資 1 に対して、どれだけの利益が出たか</td>
                                    </tr>
                                    <tr>
                                        <td>純便益</td>
                                        <td>総便益 - 総コスト</td>
                                        <td>差し引きで残った価値</td>
                                    </tr>
                                    <tr>
                                        <td>回収期間 (ペイバック)</td>
                                        <td>累計の純便益がプラスに転じるまでの期間</td>
                                        <td>何か月で元が取れるか</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>便益の種類 (試験ガイドが挙げる要素)</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.2.3 便益の種類 (試験ガイドが挙げる要素)">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">便益</th>
                                        <th scope="col">内容</th>
                                        <th scope="col">金額への換算の例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>時間の節約</td>
                                        <td>作業時間が減る</td>
                                        <td>削減時間 × 人件費単価</td>
                                    </tr>
                                    <tr>
                                        <td>コスト削減</td>
                                        <td>外注費、運用費、エラー対応費が減る</td>
                                        <td>削減額そのもの</td>
                                    </tr>
                                    <tr>
                                        <td>売上の増加</td>
                                        <td>商談化率、単価、継続率が上がる</td>
                                        <td>増加した売上 × 利益率</td>
                                    </tr>
                                    <tr>
                                        <td>生産性の向上</td>
                                        <td>同じ人数でより多くの成果を出せる</td>
                                        <td>追加の処理量 × 1 件あたりの価値</td>
                                    </tr>
                                    <tr>
                                        <td>無形の効果</td>
                                        <td>顧客満足度、従業員の定着</td>
                                        <td>事前に合意した換算ルールで参考値として扱う</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>コストの種類 (見落としやすい部分)</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.2.3 コストの種類 (見落としやすい部分)">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コスト</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>利用料</td>
                                        <td>
                                            モデルの利用料
                                            (トークン課金など)、ライセンス、シート料金
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>初期構築</td>
                                        <td>開発、システム統合、データの整備</td>
                                    </tr>
                                    <tr>
                                        <td>運用</td>
                                        <td>監視、保守、改善、モデルの更新</td>
                                    </tr>
                                    <tr>
                                        <td>人と組織</td>
                                        <td>教育、変革の推進、業務の再設計</td>
                                    </tr>
                                    <tr>
                                        <td>ガバナンス</td>
                                        <td>リスク評価、監査、コンプライアンス対応</td>
                                    </tr>
                                    <tr>
                                        <td>外部支援</td>
                                        <td>コンサルタント、パートナーへの費用</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>計算例 (数値は説明用の架空の値です)</strong></p><p>
                            問い合わせ対応の担当者 50 人に、AI による回答支援を導入するケースです。
                        </p><p>前提:</p><ul>
                            <li>1 人あたり週 2 時間の作業時間を削減できる見込み</li>
                            <li>年間稼働 48 週、1 時間あたりの人件費 40 USD</li>
                            <li>
                                削減した時間がすべて価値に変わるわけではないため、<strong>実現率を 50%</strong>
                                と見積もる
                            </li>
                        </ul><p>便益の計算:</p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.2.3 計算例 (数値は説明用の架空の値です) (1)">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">計算</th>
                                        <th scope="col">金額</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>理論上の年間便益</td>
                                        <td>50 人 × 2 時間 × 48 週 × 40 USD</td>
                                        <td>192,000 USD</td>
                                    </tr>
                                    <tr>
                                        <td>実現率 50% を反映した年間便益</td>
                                        <td>192,000 USD × 50%</td>
                                        <td>96,000 USD</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p>コストの計算:</p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.2.3 計算例 (数値は説明用の架空の値です) (2)">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">1 年目</th>
                                        <th scope="col">2 年目</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>利用料</td>
                                        <td>30,000 USD</td>
                                        <td>30,000 USD</td>
                                    </tr>
                                    <tr>
                                        <td>統合 (初期のみ)</td>
                                        <td>40,000 USD</td>
                                        <td>0 USD</td>
                                    </tr>
                                    <tr>
                                        <td>教育と変革推進 (初期のみ)</td>
                                        <td>20,000 USD</td>
                                        <td>0 USD</td>
                                    </tr>
                                    <tr>
                                        <td>運用とガバナンス</td>
                                        <td>20,000 USD</td>
                                        <td>20,000 USD</td>
                                    </tr>
                                    <tr>
                                        <td><strong>合計</strong></td>
                                        <td><strong>110,000 USD</strong></td>
                                        <td><strong>50,000 USD</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p>ROI の計算:</p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.2.3 計算例 (数値は説明用の架空の値です) (3)">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">期間</th>
                                        <th scope="col">便益</th>
                                        <th scope="col">コスト</th>
                                        <th scope="col">純便益</th>
                                        <th scope="col">ROI</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1 年目</td>
                                        <td>96,000 USD</td>
                                        <td>110,000 USD</td>
                                        <td>-14,000 USD</td>
                                        <td>約 -12.7%</td>
                                    </tr>
                                    <tr>
                                        <td>2 年目</td>
                                        <td>96,000 USD</td>
                                        <td>50,000 USD</td>
                                        <td>46,000 USD</td>
                                        <td>92%</td>
                                    </tr>
                                    <tr>
                                        <td>2 年累計</td>
                                        <td>192,000 USD</td>
                                        <td>160,000 USD</td>
                                        <td>32,000 USD</td>
                                        <td>20%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p>
                            回収期間は、1 年目終了時点の累計赤字 14,000 USD を、2
                            年目の月あたりの純便益 (約 3,833 USD) で埋める計算になり、<strong>およそ 16 か月</strong>です。
                        </p><p>この例から分かる大切な学びは 3 つです。</p><ol>
                            <li>
                                <strong>初年度は赤字になることがある。</strong>
                                初期費用を含めるため、複数年で評価する。
                            </li>
                            <li>
                                <strong>実現率を使わないと、便益を過大評価する。</strong>
                                節約した時間が、すべて別の価値ある仕事に使われるとは限らない。
                            </li>
                            <li>
                                <strong>コストを利用料だけで見ると、ROI が高く出すぎる。</strong>
                                統合、教育、運用も含める。
                            </li>
                        </ol><Diagram id="d11" /><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>包括的に見る。</strong>
                                時間の節約、コスト削減、売上、生産性を漏れなく洗い出す。
                            </li>
                            <li>
                                <strong>コストは TCO で見る。</strong>
                                利用料、構築、運用、教育、ガバナンスまで含める。
                            </li>
                            <li>
                                <strong>ベースラインを使う。</strong>
                                便益は、導入前の値との差で計算する (Skill 2.2.2)。
                            </li>
                            <li>
                                <strong>保守的に見積もる。</strong>
                                実現率や不確実性を織り込み、楽観的な前提に頼らない。
                            </li>
                            <li>
                                <strong>複数のシナリオで確認する。</strong>
                                便益が低い場合と高い場合で ROI がどう変わるかを見る (感度分析)。
                            </li>
                            <li>
                                <strong>二重計上を避ける。</strong>
                                同じ効果を、時間の節約と生産性の向上の両方で数えない。
                            </li>
                            <li>
                                <strong>複数年で評価する。</strong> 初期費用が大きい取り組みは、1
                                年目だけで判断しない。
                            </li>
                            <li>
                                <strong>無形の効果は別枠で示す。</strong>
                                金額に換算する場合も、根拠と前提を明記する。
                            </li>
                        </ul><h4>よくある落とし穴</h4><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.2.3 よくある落とし穴">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">落とし穴</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>便益だけを数えてコストが不完全</td>
                                        <td>コストの 6 種類を確認する</td>
                                    </tr>
                                    <tr>
                                        <td>節約時間の全額を便益にする</td>
                                        <td>実現率を設定する</td>
                                    </tr>
                                    <tr>
                                        <td>1 年目だけで判断する</td>
                                        <td>複数年で評価する</td>
                                    </tr>
                                    <tr>
                                        <td>前提が 1 通りだけ</td>
                                        <td>シナリオを複数用意する</td>
                                    </tr>
                                    <tr>
                                        <td>ベースラインなしの比較</td>
                                        <td>先に測る</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>
                                ROI
                                の問題では、<strong>時間の節約、コスト削減、売上成長、生産性向上のすべてを含めた包括的な評価</strong>が正解になりやすい。
                            </li>
                            <li>
                                コストの見落とし (統合、教育、運用) を指摘する選択肢に注目する。
                            </li>
                        </ul><hr />
        </>
    );
}
