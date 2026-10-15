import { Diagram } from '../Diagram';

export function Skill2_2_4() {
    return (
        <>
<h3 id="s4-h4">Skill 2.2.4: 成功を予測する先行指標を特定する</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨: AI
                                プロジェクトの成功を予測する先行指標を特定する。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            成果 (売上やコスト削減)
                            が出るまで待たずに、<strong>早い段階で「うまくいきそうか」を判断できる指標</strong>を選べるかが問われます。
                        </p><h4>初学者向けの解説</h4><p><strong>先行指標と遅行指標</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">特徴</th>
                                        <th scope="col">例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>先行指標</td>
                                        <td>
                                            早く動き、将来の成果を予測する。行動を変えるきっかけになる
                                        </td>
                                        <td>
                                            利用率、継続利用、利用者の満足度、タスク完了率、教育の受講率
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>遅行指標</td>
                                        <td>結果が出てから分かる。成果そのものを表す</td>
                                        <td>年間のコスト削減額、売上の増加、ROI</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p>
                            天気に例えると、先行指標は「雲行き」、遅行指標は「その日に降った雨量」です。雲行きを見れば、傘の準備ができます。
                        </p><p><strong>AI プロジェクトで使える先行指標の例</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">分類</th>
                                        <th scope="col">先行指標</th>
                                        <th scope="col">何を予測するか</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>採用</td>
                                        <td>利用者数、アクティブ率、利用頻度、継続率</td>
                                        <td>現場に定着し、効果が広がるか</td>
                                    </tr>
                                    <tr>
                                        <td>品質</td>
                                        <td>
                                            出力の正確性、利用者による修正の割合、エスカレーション率
                                        </td>
                                        <td>信頼され使い続けられるか</td>
                                    </tr>
                                    <tr>
                                        <td>体験</td>
                                        <td>利用者満足度、フィードバックの傾向</td>
                                        <td>顧客や従業員に受け入れられているか</td>
                                    </tr>
                                    <tr>
                                        <td>効率</td>
                                        <td>タスクの完了時間、初回の価値を得るまでの時間</td>
                                        <td>生産性の向上につながるか</td>
                                    </tr>
                                    <tr>
                                        <td>データ</td>
                                        <td>データ品質のスコア、データ更新の頻度</td>
                                        <td>精度が維持されるか</td>
                                    </tr>
                                    <tr>
                                        <td>組織</td>
                                        <td>教育の受講、スポンサーの関与、関係者の参加</td>
                                        <td>組織が推進できているか</td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>1 回の利用あたりのコスト、予算の消化率</td>
                                        <td>採算が合うか</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>先行指標から成果までのつながり</strong></p><Diagram id="d12" /><p>
                            左側 (教育、利用率) が先行指標、右側 (コスト削減、ROI)
                            が遅行指標です。<strong>左が伸びていなければ、右も伸びません。</strong>
                        </p><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>成果との因果関係を仮説として持つ。</strong>
                                「利用率が上がれば、時間が減る」のようにつなぎ、実際に成り立つかを検証する。
                            </li>
                            <li>
                                <strong>早く、頻繁に測る。</strong>
                                週次や月次で確認し、問題があれば早く手を打つ。
                            </li>
                            <li>
                                <strong>先行指標に基準値を設定する。</strong>
                                基準を下回ったら、原因を調べて改善する、または拡大を止める。
                            </li>
                            <li>
                                <strong>利用者の声を集める。</strong>
                                数字に出る前の違和感を、フィードバックから拾う。
                            </li>
                            <li>
                                <strong>先行と遅行を組み合わせる。</strong>
                                先行指標だけでは価値を証明できない。
                            </li>
                        </ul><h4>よくある落とし穴</h4><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">落とし穴</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>成果が出るまで何も測らない</td>
                                        <td>開始直後から先行指標を追う</td>
                                    </tr>
                                    <tr>
                                        <td>利用回数が多い = 成功と決めつける</td>
                                        <td>品質、満足度、成果との関連を確認する</td>
                                    </tr>
                                    <tr>
                                        <td>成果とつながらない指標を追う</td>
                                        <td>因果の仮説を立てて検証する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>
                                「早期に成功を予測できる」のは、<strong>利用率、満足度、タスク完了率などの先行指標</strong>。年間のコスト削減額は遅行指標。
                            </li>
                            <li>
                                先行指標が悪化したときは、拡大を急がず、原因を調べて改善する選択肢が正解になりやすい。
                            </li>
                        </ul><hr />
        </>
    );
}
