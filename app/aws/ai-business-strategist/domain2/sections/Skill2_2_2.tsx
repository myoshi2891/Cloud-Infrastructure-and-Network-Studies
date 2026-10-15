import { Diagram } from '../Diagram';

export function Skill2_2_2() {
    return (
        <>
<h3 id="s4-h2">Skill 2.2.2: 導入前にベースライン指標を確立する</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨: AI 導入の効果を正確に測るため、AI
                                ソリューションを導入する前にベースライン指標を確立する。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            「AI
                            を入れる前の数字を取っているか」が問われます。ベースラインがなければ、改善したのか、もともとだったのかが分かりません。
                        </p><h4>初学者向けの解説</h4><p><strong>ベースラインとは</strong></p><p>
                            導入前の現状の数値です。効果は「導入後の値 -
                            ベースライン」で測ります。ダイエットに例えると、始める前の体重の記録です。記録がなければ、いくら減ったか分かりません。
                        </p><p><strong>ベースラインがないとどうなるか</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">状況</th>
                                        <th scope="col">問題</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>導入後の数字しかない</td>
                                        <td>改善幅を証明できず、ROI を計算できない</td>
                                    </tr>
                                    <tr>
                                        <td>「なんとなく良くなった」という印象</td>
                                        <td>予算の根拠にならない。懐疑的な人を説得できない</td>
                                    </tr>
                                    <tr>
                                        <td>比較の条件が違う</td>
                                        <td>季節要因や他の施策の影響を効果と誤認する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>ベースラインを取る手順</strong></p><Diagram id="d10" /><p><strong>測る対象の例</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">分類</th>
                                        <th scope="col">ベースラインの例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>時間</td>
                                        <td>1 件あたりの処理時間、リードタイム</td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>1 件あたりの処理コスト、外注費</td>
                                    </tr>
                                    <tr>
                                        <td>品質</td>
                                        <td>エラー率、手戻り率、顧客からの苦情数</td>
                                    </tr>
                                    <tr>
                                        <td>売上</td>
                                        <td>商談化率、受注率、顧客単価</td>
                                    </tr>
                                    <tr>
                                        <td>体験</td>
                                        <td>顧客満足度、従業員満足度</td>
                                    </tr>
                                    <tr>
                                        <td>利用</td>
                                        <td>現在のツールの利用状況</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>より確かな比較のための工夫</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">方法</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>対照グループ</td>
                                        <td>AI を使うグループと使わないグループを並べて比べる</td>
                                    </tr>
                                    <tr>
                                        <td>期間の比較</td>
                                        <td>導入前後の同じ時期 (季節性を考慮) で比べる</td>
                                    </tr>
                                    <tr>
                                        <td>段階的な展開</td>
                                        <td>一部の部署から始め、他の部署を比較対象にする</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>導入前に必ず測る。</strong> 「導入したら測ろう」では遅い。
                            </li>
                            <li>
                                <strong>導入後も同じ定義と方法で測る。</strong>
                                計測方法が変わると、比較できない。
                            </li>
                            <li>
                                <strong>十分な期間をとる。</strong> 繁忙期と閑散期の差を含める。
                            </li>
                            <li>
                                <strong>他の要因を意識する。</strong>
                                同時期の他の施策や市場の変化が結果に影響しうる。
                            </li>
                            <li>
                                <strong>ベースラインを共有する。</strong>
                                関係者が同じ出発点を認識できるようにする。
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
                                        <td>ベースラインを取らずに導入する</td>
                                        <td>プロジェクトの初期にタスク化する</td>
                                    </tr>
                                    <tr>
                                        <td>導入前後で定義が違う</td>
                                        <td>定義を文書化し固定する</td>
                                    </tr>
                                    <tr>
                                        <td>期間が短く、偶然の値を拾う</td>
                                        <td>十分な期間とサンプルを確保する</td>
                                    </tr>
                                    <tr>
                                        <td>他要因の影響を無視する</td>
                                        <td>対照グループや期間比較を使う</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>
                                「AI
                                導入の前に何をすべきか」という問いでは、<strong>ベースライン指標の確立</strong>が正解になりやすい。
                            </li>
                            <li>効果を「正確に」測るための前提であることを押さえる。</li>
                        </ul><hr />
        </>
    );
}
