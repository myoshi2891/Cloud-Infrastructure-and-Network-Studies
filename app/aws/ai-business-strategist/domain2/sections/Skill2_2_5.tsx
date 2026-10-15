import { Diagram } from '../Diagram';

export function Skill2_2_5() {
    return (
        <>
<h3 id="s4-h5">Skill 2.2.5: コスト要因の基本的な管理</h3><div className="callout">
                            <p>
                                試験ガイドの原文の趣旨: AI
                                導入におけるコスト計画と最適化戦略を含む、基本的なコスト要因の管理を実行する。試験ガイドは、AWS
                                の AI サービスの料金体系
                                (従量課金、インスタンス課金、シート課金など)、Savings Plans、AWS
                                Pricing Calculator、AWS Cost Explorer、AWS Marketplace
                                に言及しています。
                            </p>
                        </div><h4>何を問われるか</h4><p>
                            AI
                            のコストが何で決まり、どう見積もり、どう見張り、どう抑えるかの<strong>基本</strong>が問われます。技術的な最適化の実装ではなく、<strong>計画と管理の考え方</strong>です。
                        </p><h4>初学者向けの解説</h4><p><strong>ステップ 1: 料金体系の 3 つの型を理解する</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">料金体系</th>
                                        <th scope="col">仕組み</th>
                                        <th scope="col">AWS での例</th>
                                        <th scope="col">向く場面</th>
                                        <th scope="col">注意点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>従量課金 (消費ベース)</td>
                                        <td>使った量に応じて支払う</td>
                                        <td>
                                            Amazon Bedrock のオンデマンド
                                            (入力と出力のトークン数に応じた料金)
                                        </td>
                                        <td>利用量が読めない、小さく始めたい</td>
                                        <td>使うほど増える。急増に注意</td>
                                    </tr>
                                    <tr>
                                        <td>インスタンス課金</td>
                                        <td>稼働させる計算資源の時間に応じて支払う</td>
                                        <td>
                                            Amazon SageMaker AI
                                            (選んだインスタンスの利用に応じた料金)
                                        </td>
                                        <td>安定した大量の処理、独自モデルの運用</td>
                                        <td>使っていない時間も課金される場合がある</td>
                                    </tr>
                                    <tr>
                                        <td>シート課金</td>
                                        <td>利用者 1 人あたりで支払う</td>
                                        <td>
                                            Amazon Quick
                                            (利用者の種別とサブスクリプションの種類がある。Professional
                                            と Enterprise では、利用者ごとの料金に加えて月額 $250
                                            のアカウント料金や利用量の超過料金がかかる場合がある)
                                        </td>
                                        <td>従業員向けのツールを全社展開する</td>
                                        <td>
                                            利用者が使わなくても課金される。適正な人数の管理が必要
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><div className="callout">
                            <p>
                                Amazon Bedrock
                                の料金ページには、オンデマンドに加えて、バッチ処理の料金、プロンプトキャッシュの料金、プロビジョンドスループット、リザーブド層、レイテンシー最適化推論などの区分があります。モデルごとに価格が異なるため、最新の価格は必ず公式ページで確認してください。
                            </p>
                        </div><p><strong>ステップ 2: 生成 AI のコストが増える要因を知る</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コスト要因</th>
                                        <th scope="col">説明</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>利用量 (トークン数)</td>
                                        <td>
                                            入力と出力の文章が長いほど、1 回あたりの費用が増える
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>モデルの選択</td>
                                        <td>高性能なモデルほど単価が高い傾向がある</td>
                                    </tr>
                                    <tr>
                                        <td>利用回数</td>
                                        <td>利用者や呼び出しの数が増えると比例して増える</td>
                                    </tr>
                                    <tr>
                                        <td>追加の仕組み</td>
                                        <td>
                                            検索
                                            (ナレッジベース)、エージェント、ガードレールなど周辺機能の費用
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>運用の人件費</td>
                                        <td>監視、改善、ガバナンスにかかる人の費用</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>ステップ 3: 計画する (事前に見積もる)</strong></p><ul>
                            <li>
                                AWS Pricing Calculator で、計画中の構成の費用を事前に見積もる。AWS
                                のドキュメントは、新しいワークロードの計画や、コミットメント購入の計画に使えると説明しています。
                            </li>
                            <li>
                                利用者数、1 日あたりの利用回数、1
                                回あたりの文章量を前提として置き、低、中、高の 3
                                シナリオで試算する。
                            </li>
                        </ul><p><strong>ステップ 4: 監視する (実績を見る)</strong></p><ul>
                            <li>
                                AWS Cost Explorer
                                で、過去の費用と利用状況を可視化、分析し、傾向を把握する。
                            </li>
                            <li>
                                AWS Budgets
                                で予算のしきい値を決め、超過しそうなときにアラートを受け取る。
                            </li>
                            <li>
                                コスト配分タグを付けて、プロジェクトや部門ごとの費用を追えるようにする。
                            </li>
                        </ul><p><strong>ステップ 5: 最適化する (減らす、賢く使う)</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">戦略</th>
                                        <th scope="col">内容</th>
                                        <th scope="col">注意点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>用途に合うモデルを選ぶ</td>
                                        <td>簡単な作業に高価な高性能モデルは不要な場合がある</td>
                                        <td>品質を評価したうえで選ぶ</td>
                                    </tr>
                                    <tr>
                                        <td>入力と出力を短くする</td>
                                        <td>不要な文章や重複を減らす</td>
                                        <td>品質が落ちないか確認する</td>
                                    </tr>
                                    <tr>
                                        <td>繰り返しの内容を再利用する</td>
                                        <td>キャッシュなどの仕組みを活用する</td>
                                        <td>対応しているモデルと条件を確認する</td>
                                    </tr>
                                    <tr>
                                        <td>即時性が不要な処理はバッチにする</td>
                                        <td>価格表にバッチ料金の区分がある</td>
                                        <td>応答が遅れてよい用途に限る</td>
                                    </tr>
                                    <tr>
                                        <td>コミットメントを活用する</td>
                                        <td>
                                            Savings Plans は 1 年または 3
                                            年の利用量を約束する代わりに割引を得る。SageMaker AI
                                            向けの Savings Plans もある
                                        </td>
                                        <td>利用量が安定している場合に向く。過剰に約束しない</td>
                                    </tr>
                                    <tr>
                                        <td>使われていない資源を見直す</td>
                                        <td>未使用のライセンスやシートを整理する</td>
                                        <td>定期的に棚卸しする</td>
                                    </tr>
                                    <tr>
                                        <td>調達方法を比較する</td>
                                        <td>AWS Marketplace で選択肢を比べる</td>
                                        <td>総コストで比較する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><p><strong>コスト管理のサイクル</strong></p><Diagram id="d13" /><p><strong>AWS のコスト管理ツールの使い分け</strong></p><div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">使うタイミング</th>
                                        <th scope="col">一言で言うと</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>AWS Pricing Calculator</td>
                                        <td>導入前</td>
                                        <td>「いくらかかりそうか」を見積もる</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Cost Explorer</td>
                                        <td>導入後</td>
                                        <td>「いくら使ったか、何が増えたか」を分析する</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Budgets</td>
                                        <td>導入後</td>
                                        <td>「予算を超えそうなら知らせる」</td>
                                    </tr>
                                    <tr>
                                        <td>Savings Plans</td>
                                        <td>利用量が安定してから</td>
                                        <td>「約束の代わりに単価を下げる」</td>
                                    </tr>
                                    <tr>
                                        <td>AWS Marketplace</td>
                                        <td>調達の検討時</td>
                                        <td>「サードパーティ製品を探して比べ、調達する」</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><div className="callout">
                            <p>
                                AWS Well-Architected Framework の Generative AI Lens
                                は、コスト最適化を含む 6 つの柱にわたって生成 AI
                                ワークロードのベストプラクティスを示しています。試験ガイドは「Responsible
                                AI
                                Lens」に言及していますが、コスト面のヒントを得る参考としてもこのレンズが役立ちます
                                (参考文献を参照)。
                            </p>
                        </div><h4>ベストプラクティス</h4><ul>
                            <li>
                                <strong>最初に小さく始める。</strong>
                                従量課金で始め、利用実績が安定してからコミットメントを検討する。
                            </li>
                            <li>
                                <strong>3 つ以上のシナリオで見積もる。</strong>
                                想定より使われた場合の費用も試算する。
                            </li>
                            <li>
                                <strong>予算とアラートを最初から設定する。</strong>
                                使ってから気づくのでは遅い。
                            </li>
                            <li>
                                <strong>タグで責任を明確にする。</strong>
                                部門やプロジェクト単位で費用を把握する。
                            </li>
                            <li>
                                <strong>コストと品質のバランスで選ぶ。</strong>
                                安さだけでなく、ビジネス成果に必要な品質を保つ。
                            </li>
                            <li>
                                <strong>定期的に見直す。</strong>
                                価格やモデルは変わる。四半期ごとなどにレビューする。
                            </li>
                            <li>
                                <strong>コスト最適化を ROI とつなげる。</strong>
                                コスト削減が目的ではなく、価値あたりのコストを下げることが目的。
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
                                        <td>PoC の費用を見て、本番を試算しない</td>
                                        <td>本番の規模を想定して見積もる</td>
                                    </tr>
                                    <tr>
                                        <td>予算やアラートがなく、月末に請求で驚く</td>
                                        <td>事前に予算とアラートを設定する</td>
                                    </tr>
                                    <tr>
                                        <td>利用量が読めないのにコミットメントを組む</td>
                                        <td>実績を見てから検討する</td>
                                    </tr>
                                    <tr>
                                        <td>高性能モデルをすべての用途に使う</td>
                                        <td>用途ごとにモデルを選ぶ</td>
                                    </tr>
                                    <tr>
                                        <td>シートを配ったまま使われない</td>
                                        <td>利用状況を確認し、棚卸しする</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div><h4>試験での着眼点</h4><ul>
                            <li>
                                「従量課金、インスタンス課金、シート課金」の<strong>それぞれが向く場面</strong>を区別できる。
                            </li>
                            <li>
                                見積もりは <strong>Pricing Calculator</strong>、実績分析は
                                <strong>Cost Explorer</strong>、コミットメントによる割引は
                                <strong>Savings Plans</strong>、調達比較は
                                <strong>AWS Marketplace</strong>、という役割分担を押さえる。
                            </li>
                        </ul>
        </>
    );
}
