import { Diagram } from '../Diagram';

export function Skill2_2_1() {
    return (
        <>
<h3 id="s4-h1">Skill 2.2.1: KPI を定義する</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨: AI イニシアチブの KPI を、有形の効果
                                (コスト削減、売上成長など) と無形の効果
                                (顧客満足度、従業員の生産性など) の両方について定義する。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            「成功をどの数字で測るか」を決められるかが問われます。有形の効果だけでなく、<strong>数値化しにくい無形の効果</strong>も含める点がポイントです。
                        </p><h4>初学者向けの解説</h4><p><strong>KPI とは</strong></p><p>
                            目標に対して、どれだけ進んだかを表す数値です。「AI
                            を導入した」は活動であり、成果ではありません。「顧客の待ち時間が短くなった」が成果で、それを数字にしたものが
                            KPI です。
                        </p><p><strong>有形の効果と無形の効果</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">意味</th>
                                        <th scope="col">例 (KPI)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>有形 (Tangible)</td>
                                        <td>お金や数量で直接測れる</td>
                                        <td>
                                            コスト削減額、売上の増加、処理時間の短縮、エラー率の低下、1
                                            件あたり処理コスト
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>無形 (Intangible)</td>
                                        <td>直接お金にしにくいが価値がある</td>
                                        <td>
                                            顧客満足度、NPS、従業員満足度、従業員の生産性の実感、意思決定の質、ブランドへの信頼
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>部門別の KPI の例</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">部門</th>
                                        <th scope="col">有形の KPI の例</th>
                                        <th scope="col">無形の KPI の例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>カスタマーオペレーション</td>
                                        <td>平均処理時間、一次解決率、1 件あたり対応コスト</td>
                                        <td>顧客満足度 (CSAT)、顧客の再利用意向</td>
                                    </tr>
                                    <tr>
                                        <td>営業とマーケティング</td>
                                        <td>商談化率、受注率、提案作成時間</td>
                                        <td>営業担当者の負担感、顧客体験</td>
                                    </tr>
                                    <tr>
                                        <td>研究開発</td>
                                        <td>調査にかかる期間、開発サイクルの長さ</td>
                                        <td>研究者の創造的な作業への集中度</td>
                                    </tr>
                                    <tr>
                                        <td>ソフトウェア開発</td>
                                        <td>リリース頻度、レビュー時間、不具合の件数</td>
                                        <td>開発者の満足度、開発者体験</td>
                                    </tr>
                                    <tr>
                                        <td>バックオフィス</td>
                                        <td>処理件数、処理時間、入力ミスの件数</td>
                                        <td>従業員の満足度、業務の負担感</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>無形の効果を測るコツ</strong></p><ul>
                            <li>
                                定期的なアンケート (満足度、実感する時間の削減など) で数値化する。
                            </li>
                            <li>利用率や継続利用などの行動データで補う。</li>
                            <li>
                                可能なら、金額への換算ルールを事前に決める
                                (ただし過度に楽観的にしない)。
                            </li>
                        </ul><p><strong>良い KPI の条件 (SMART)</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">条件</th>
                                        <th scope="col">意味</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Specific (具体的)</td>
                                        <td>何を測るかが明確</td>
                                    </tr>
                                    <tr>
                                        <td>Measurable (測定可能)</td>
                                        <td>数値で追える</td>
                                    </tr>
                                    <tr>
                                        <td>Achievable (達成可能)</td>
                                        <td>現実的な目標である</td>
                                    </tr>
                                    <tr>
                                        <td>Relevant (関連性)</td>
                                        <td>ビジネス目標と結びついている</td>
                                    </tr>
                                    <tr>
                                        <td>Time-bound (期限)</td>
                                        <td>いつまでに達成するかが決まっている</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><Diagram id="d9" /><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>ビジネス目標から逆算する。</strong> KPI
                                は目標の達成度を映すものにする。
                            </li>
                            <li>
                                <strong>有形と無形の両方を持つ。</strong>
                                有形だけでは、顧客満足や従業員の体験の悪化を見落とす。
                            </li>
                            <li>
                                <strong>数を絞る。</strong>
                                多すぎると焦点がぼやける。重要なものに絞る。
                            </li>
                            <li>
                                <strong>担当者を決める。</strong>
                                誰が測り、誰が責任を持つかを明確にする。
                            </li>
                            <li>
                                <strong>品質の指標も入れる。</strong> 速度やコストだけを追うと、AI
                                の誤りや品質低下を見逃す。
                            </li>
                            <li>
                                <strong>関係者と合意する。</strong>
                                経営、事業部門、技術部門が同じ定義を共有する。
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
                                        <td>活動を成果と混同する (導入数、利用回数だけ)</td>
                                        <td>事業成果に結びつく指標を置く</td>
                                    </tr>
                                    <tr>
                                        <td>測りやすいものだけを測る</td>
                                        <td>無形の効果も定義する</td>
                                    </tr>
                                    <tr>
                                        <td>指標の定義が部門でばらばら</td>
                                        <td>計算方法を文書化して共有する</td>
                                    </tr>
                                    <tr>
                                        <td>速度だけを追い品質が落ちる</td>
                                        <td>品質と満足度の指標をセットにする</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>「有形と無形の両方を定義する」が正解になりやすい。</li>
                            <li>
                                コスト削減や売上のような数値だけでなく、<strong>顧客満足度や従業員の生産性</strong>も
                                KPI になり得る点を押さえる。
                            </li>
                        </ul><hr />
        </>
    );
}
