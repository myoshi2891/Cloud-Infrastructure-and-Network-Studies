import { Diagram } from '../Diagram';

export function Skill2_1_3() {
    return (
        <>
<h3 id="s3-h3">
                            Skill 2.1.3:
                            イニシアチブを優先順位付けし、拡大・一時停止・終了を判断する
                        </h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨:
                                ビジネス価値、実現可能性、持続可能性、戦略的整合性に基づいて AI
                                イニシアチブに優先順位をつけ、「拡大する、一時停止する、終了する」を決める。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            候補が多いときに、限られた予算と人材をどこに配分するかを決める力と、<strong>始めた後にも「続ける、止める」を冷静に判断する力</strong>が問われます。
                        </p><h4>初学者向けの解説</h4><p><strong>4 つの評価軸</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.3 4 つの評価軸">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">評価軸</th>
                                        <th scope="col">確認する問い</th>
                                        <th scope="col">具体的な見方</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ビジネス価値</td>
                                        <td>成功したら事業にどれだけ効くか</td>
                                        <td>売上、コスト削減、生産性、顧客満足度への影響</td>
                                    </tr>
                                    <tr>
                                        <td>実現可能性</td>
                                        <td>現実に作れて、運用できるか</td>
                                        <td>
                                            データの有無と品質、技術の成熟度、人材、統合の難しさ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>持続可能性</td>
                                        <td>長く続けられるか</td>
                                        <td>
                                            運用コスト、保守体制、モデルの劣化への対応、環境への影響
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>戦略的整合性</td>
                                        <td>会社の方向性と合っているか</td>
                                        <td>経営目標、重点分野、競争戦略との一致</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>スコアリングの進め方</strong></p><ol>
                            <li>各ユースケースを 4 軸で採点する (例: 1〜5 点)。</li>
                            <li>軸ごとの重み (重要度) を経営と合意する。</li>
                            <li>合計点で並べ、価値が高く実現しやすいものから着手する。</li>
                            <li>結果を関係者に共有し、納得感を得る。</li>
                        </ol><p>以下は採点の例です (点数は説明用の架空の値です)。</p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.3 スコアリングの進め方">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ユースケース</th>
                                        <th scope="col">価値</th>
                                        <th scope="col">実現可能性</th>
                                        <th scope="col">持続可能性</th>
                                        <th scope="col">整合性</th>
                                        <th scope="col">判断</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>問い合わせ対応の支援</td>
                                        <td>4</td>
                                        <td>4</td>
                                        <td>4</td>
                                        <td>5</td>
                                        <td>最優先で着手</td>
                                    </tr>
                                    <tr>
                                        <td>請求書のデータ抽出</td>
                                        <td>3</td>
                                        <td>5</td>
                                        <td>4</td>
                                        <td>3</td>
                                        <td>早期の成功事例として着手</td>
                                    </tr>
                                    <tr>
                                        <td>全社の需要予測の刷新</td>
                                        <td>5</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>5</td>
                                        <td>データ整備後に着手</td>
                                    </tr>
                                    <tr>
                                        <td>社内向けの話題性の高い実験</td>
                                        <td>2</td>
                                        <td>3</td>
                                        <td>2</td>
                                        <td>1</td>
                                        <td>見送りを検討</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>価値と実現可能性の 2 軸マップ</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.3 価値と実現可能性の 2 軸マップ">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col">実現可能性が高い</th>
                                        <th scope="col">実現可能性が低い</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><strong>価値が高い</strong></td>
                                        <td>最優先。すぐ着手する (クイックウィン)</td>
                                        <td>戦略的な投資。データや基盤を整えてから着手する</td>
                                    </tr>
                                    <tr>
                                        <td><strong>価値が低い</strong></td>
                                        <td>余力があれば実施。優先度は低い</td>
                                        <td>見送る</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>拡大、一時停止、終了の判断 (ステージゲート)</strong></p><p>
                            AI
                            の取り組みは、始めて終わりではありません。節目ごとに、次のように判断します。
                        </p><Diagram id="d5" /><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.3 拡大、一時停止、終了の判断 (ステージゲート)">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">判断</th>
                                        <th scope="col">典型的な条件</th>
                                        <th scope="col">次のアクション</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>拡大する</td>
                                        <td>目標指標を達成し、コストと体制も見合う</td>
                                        <td>対象範囲や部門を広げる。運用体制を整える</td>
                                    </tr>
                                    <tr>
                                        <td>一時停止する</td>
                                        <td>
                                            一部の指標が未達だが、原因が特定でき解決の見込みがある
                                        </td>
                                        <td>課題 (データ品質、利用率など) を改善して再評価する</td>
                                    </tr>
                                    <tr>
                                        <td>終了する</td>
                                        <td>
                                            価値が出ない、または実現の見込みがない、戦略が変わった
                                        </td>
                                        <td>
                                            投資を止め、得られた学びを次に活かす。リソースを他の案件へ移す
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>基準を先に決める。</strong>
                                「何を達成したら拡大し、何なら止めるか」を開始前に合意する
                                (後から基準を動かさない)。
                            </li>
                            <li>
                                <strong>小さく始めて早く学ぶ。</strong> PoC から
                                MVP、そして本番へと段階を踏む。AWS のパートナー向けブログでも、1〜2
                                週間程度で作れる
                                PoC、MVP、組織全体への展開という順序が紹介されています。
                            </li>
                            <li>
                                <strong>サンクコストに引きずられない。</strong>
                                すでに使った費用を理由に続けない。将来の価値だけで判断する。
                            </li>
                            <li>
                                <strong>終了を失敗と見なさない。</strong>
                                早く止めることは、リソースを守る正しい判断である。
                            </li>
                            <li>
                                <strong>ポートフォリオで管理する。</strong>
                                個々の案件だけでなく、全体の投資バランスを定期的に見直す。
                            </li>
                        </ul><h4>よくある落とし穴</h4><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.3 よくある落とし穴">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">落とし穴</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>声の大きい人の案件が通る</td>
                                        <td>共通の評価基準と点数で比較する</td>
                                    </tr>
                                    <tr>
                                        <td>実現可能性の軽視</td>
                                        <td>データと人材の現実を確認する</td>
                                    </tr>
                                    <tr>
                                        <td>止められない (サンクコスト)</td>
                                        <td>事前に中止基準を決める</td>
                                    </tr>
                                    <tr>
                                        <td>価値の見積もりが楽観的</td>
                                        <td>
                                            ベースラインと保守的な前提を使う (Skill 2.2.2、2.2.3)
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>
                                優先順位付けの正解は、<strong>価値だけでなく実現可能性、持続可能性、戦略的整合性も含めて評価する</strong>もの。
                            </li>
                            <li>
                                「目標が未達でも、原因が解決可能なら一時停止して改善」「見込みがなければ終了」というように、3
                                つの判断を使い分ける。
                            </li>
                        </ul><hr />
        </>
    );
}
