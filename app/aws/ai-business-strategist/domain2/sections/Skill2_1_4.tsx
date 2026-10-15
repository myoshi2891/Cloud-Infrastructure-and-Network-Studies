import { Diagram } from '../Diagram';

export function Skill2_1_4() {
    return (
        <>
<h3 id="s3-h4">Skill 2.1.4: AI が適切でないケースを見極める</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨: ビジネス課題に対して、AI
                                が適切な解決策ではない場面を判断する。技術と概念の一覧にも「ルールベースの自動化を
                                AI の代わりに使うべき場面」が挙がっています。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            「AI
                            を使わない」という判断ができるかが問われます。戦略家にとって重要な力です。AI
                            は万能ではなく、費用も、リスクも、運用の手間もかかります。
                        </p><h4>初学者向けの解説</h4><p><strong>まず、3 つの手段の違いを理解する</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.4 まず、3 つの手段の違いを理解する">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">手段</th>
                                        <th scope="col">動き方</th>
                                        <th scope="col">得意なこと</th>
                                        <th scope="col">苦手なこと</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ルールベース自動化</td>
                                        <td>決めたルールどおりに動く</td>
                                        <td>
                                            手順が明確で例外が少ない定型業務。結果が毎回同じで説明しやすい
                                        </td>
                                        <td>ルールで書ききれない曖昧な判断</td>
                                    </tr>
                                    <tr>
                                        <td>従来型の機械学習</td>
                                        <td>データからパターンを学んで予測する</td>
                                        <td>需要予測、不正検知など、データが豊富な予測課題</td>
                                        <td>データが少ない課題、説明が必須の判断</td>
                                    </tr>
                                    <tr>
                                        <td>生成 AI</td>
                                        <td>学習した知識から文章などを生成する</td>
                                        <td>要約、下書き、対話、非定型の文章処理</td>
                                        <td>常に正確な結果が必須の処理、厳密な計算</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>AI が向かない典型パターン</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.4 AI が向かない典型パターン">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">パターン</th>
                                        <th scope="col">例</th>
                                        <th scope="col">代わりの手段</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ルールで十分に解ける</td>
                                        <td>「注文金額が一定以上なら承認が必要」</td>
                                        <td>ルールベースの自動化</td>
                                    </tr>
                                    <tr>
                                        <td>毎回同じ正確な結果が必須</td>
                                        <td>税額や給与の計算</td>
                                        <td>決定的なプログラム、計算ロジック</td>
                                    </tr>
                                    <tr>
                                        <td>十分な品質のデータがない</td>
                                        <td>履歴が少ない、記録が不正確</td>
                                        <td>まずデータ整備。手作業やプロセス改善</td>
                                    </tr>
                                    <tr>
                                        <td>誤りの許容度が極めて低い</td>
                                        <td>人命や重大な法的責任に関わる最終判断</td>
                                        <td>人による判断、AI は補助に限定</td>
                                    </tr>
                                    <tr>
                                        <td>説明責任が厳格に求められる</td>
                                        <td>判断理由の説明が法的に必要</td>
                                        <td>説明しやすい手法、人のレビュー</td>
                                    </tr>
                                    <tr>
                                        <td>件数が少なく効果が小さい</td>
                                        <td>年に数回しか発生しない作業</td>
                                        <td>手作業のまま</td>
                                    </tr>
                                    <tr>
                                        <td>価値が費用に見合わない</td>
                                        <td>節約額より導入と運用の費用が大きい</td>
                                        <td>導入しない、または規模を縮小する</td>
                                    </tr>
                                    <tr>
                                        <td>根本原因が AI で解けない</td>
                                        <td>組織の役割分担の混乱、プロセスの不備</td>
                                        <td>プロセス改善、組織の見直し</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>判断のフローチャート</strong></p><Diagram id="d6" /><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>最もシンプルな解決策から検討する。</strong>
                                ルールベース、プロセス改善、既存ツールの設定変更で解決できるなら、それが最も安く確実。
                            </li>
                            <li>
                                <strong>AI と非 AI を組み合わせる。</strong>
                                例えば、判断の大半をルールで処理し、例外だけを AI
                                や人に回す設計も有効。
                            </li>
                            <li>
                                <strong>人間の関与を設計する。</strong>
                                影響の大きい判断では、人が確認、承認する仕組み (Human-in-the-loop)
                                を入れる。
                            </li>
                            <li>
                                <strong>「AI を使わなかった理由」を記録する。</strong>
                                後で再検討するときに役立つ (技術やデータの状況が変わることもある)。
                            </li>
                            <li>
                                <strong>課題の根本原因を確認する。</strong> 症状に AI
                                を当てはめても、原因が別にあれば効果は出ない。
                            </li>
                        </ul><h4>よくある落とし穴</h4><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.4 よくある落とし穴">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">落とし穴</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>「AI を入れること」が目的化する</td>
                                        <td>成果から逆算し、非 AI の選択肢も比較する</td>
                                    </tr>
                                    <tr>
                                        <td>生成 AI に厳密な計算をさせる</td>
                                        <td>計算は決定的なロジックに任せる</td>
                                    </tr>
                                    <tr>
                                        <td>データ不備を無視して進める</td>
                                        <td>データ準備を先に評価する</td>
                                    </tr>
                                    <tr>
                                        <td>高リスクな判断を完全自動化する</td>
                                        <td>人の確認を残す</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>
                                「手順が明確で例外が少ない定型作業」には、ルールベースの自動化が正解になる。
                            </li>
                            <li>
                                「データが不足している」「説明責任が厳格」といった条件がある選択肢では、<strong>AI 導入を急がない</strong>ものが正解になりやすい。
                            </li>
                        </ul><hr />
        </>
    );
}
