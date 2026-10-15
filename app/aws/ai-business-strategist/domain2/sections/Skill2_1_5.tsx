import { Diagram } from '../Diagram';

export function Skill2_1_5() {
    return (
        <>
<h3 id="s3-h5">Skill 2.1.5: 業務・AI プラットフォームの移行時の検討事項</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨: 業務プロセスを AI
                                ベースのソリューションへ移行する、または AI
                                プラットフォーム間で移行する準備で、事業継続性、コストへの影響、データの準備状況、パフォーマンスへの影響などを評価する。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            「AI に切り替える」「別の AI
                            基盤に乗り換える」ときに、<strong>事業を止めず、想定外の費用を出さず、品質を落とさない</strong>ための検討事項を押さえているかが問われます。
                        </p><h4>初学者向けの解説</h4><p><strong>2 種類の移行</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.5 2 種類の移行">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">種類</th>
                                        <th scope="col">例</th>
                                        <th scope="col">主な論点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>業務プロセスから AI ベースへ</td>
                                        <td>
                                            手作業や既存システムでの処理を、AI
                                            を使った処理に置き換える
                                        </td>
                                        <td>
                                            業務が止まらないか、品質は保てるか、人の役割はどう変わるか
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>AI プラットフォーム間</td>
                                        <td>あるモデルやサービスから別のものへ乗り換える</td>
                                        <td>切り替え費用、出力の変化、再評価、ロックイン</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>4 つの検討観点</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.5 4 つの検討観点">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">観点</th>
                                        <th scope="col">確認する問い</th>
                                        <th scope="col">具体例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>事業継続性</td>
                                        <td>
                                            移行中も業務を止めずに済むか。問題が起きたら戻せるか
                                        </td>
                                        <td>新旧の並行運用、段階的な切り替え、ロールバック手順</td>
                                    </tr>
                                    <tr>
                                        <td>コストへの影響</td>
                                        <td>移行で何が増減するか</td>
                                        <td>
                                            二重運用の期間の費用、移行作業、教育、契約の解約費用、利用料の変化
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>データの準備状況</td>
                                        <td>必要なデータは使える状態か</td>
                                        <td>
                                            品質、形式、所在、アクセス権、機密性、データの移行の難しさ
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>パフォーマンスへの影響</td>
                                        <td>品質、速度、精度は維持、向上するか</td>
                                        <td>
                                            応答時間、精度、利用者の体験。モデルを変えると出力が変わる可能性がある
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>移行の進め方 (段階的な切り替え)</strong></p><Diagram id="d7" /><p><strong>プラットフォーム間の移行で特に注意すること</strong></p><ul>
                            <li>
                                <strong>出力が変わりうる。</strong> 生成 AI
                                のモデルを変えると、同じ入力でも回答の内容や品質が変わることがある。切り替える前に、代表的なケースで新旧を比較評価する。
                            </li>
                            <li>
                                <strong>ロックインを見極める。</strong>
                                特定サービス固有の機能に深く依存するほど、乗り換えの費用が増える。
                            </li>
                            <li>
                                <strong>契約と料金体系の違い。</strong>
                                従量課金か、シート課金か、コミットメントがあるか (Skill 2.2.5)。
                            </li>
                            <li>
                                <strong>データの持ち出し。</strong> 蓄積したデータや設定を移せるか。
                            </li>
                        </ul><p><strong>移行前のチェックリスト</strong></p><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.5 移行前のチェックリスト">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">分類</th>
                                        <th scope="col">チェック項目</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>事業継続性</td>
                                        <td>
                                            並行運用の期間を決めたか。ロールバックの条件と手順はあるか。繁忙期を避けたか
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>コスト</td>
                                        <td>
                                            二重運用、移行作業、教育、解約費用を見積もったか。移行後の運用費も試算したか
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>データ</td>
                                        <td>データの所在、品質、権限、規制上の制約を確認したか</td>
                                    </tr>
                                    <tr>
                                        <td>パフォーマンス</td>
                                        <td>
                                            新旧の比較基準 (指標)
                                            を決めたか。ベースラインを取得したか
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>人と組織</td>
                                        <td>利用者への説明、教育、業務手順の更新を計画したか</td>
                                    </tr>
                                    <tr>
                                        <td>ガバナンス</td>
                                        <td>
                                            リスク評価、承認、コンプライアンス確認が済んでいるか
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>一気に切り替えない。</strong>
                                小さく試し、並行運用し、段階的に広げる。
                            </li>
                            <li>
                                <strong>ロールバック計画を先に用意する。</strong>
                                戻せる安心感が、大胆で安全な移行を可能にする。
                            </li>
                            <li>
                                <strong>ベースラインを取る。</strong>
                                移行の前後を比べられるようにする (Skill 2.2.2 と連動)。
                            </li>
                            <li>
                                <strong>総コストで見る。</strong>
                                利用料の単価だけでなく、移行と二重運用の費用を含める。
                            </li>
                            <li>
                                <strong>利用者の教育と周知を計画に含める。</strong>
                                技術が正しくても、使われなければ成果は出ない。
                            </li>
                        </ul><h4>よくある落とし穴</h4><div className="table-wrap" role="region" tabIndex={0} aria-label="表: Skill 2.1.5 よくある落とし穴">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">落とし穴</th>
                                        <th scope="col">対策</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>旧システムを先に止める</td>
                                        <td>新旧の並行運用の期間を確保する</td>
                                    </tr>
                                    <tr>
                                        <td>移行費用を見落とす</td>
                                        <td>二重運用、教育、解約費用も見積もる</td>
                                    </tr>
                                    <tr>
                                        <td>データが使える状態にない</td>
                                        <td>移行前にデータの準備状況を評価する</td>
                                    </tr>
                                    <tr>
                                        <td>モデル変更後の品質を確認しない</td>
                                        <td>比較評価を実施してから切り替える</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>
                                移行の問題では、<strong>並行運用、段階的な展開、ロールバック</strong>を含む選択肢が有力。
                            </li>
                            <li>
                                4 つの観点 (事業継続性、コスト、データの準備状況、パフォーマンス)
                                のうち、どれが不足しているかを見抜く問題が出る。
                            </li>
                        </ul>
        </>
    );
}
