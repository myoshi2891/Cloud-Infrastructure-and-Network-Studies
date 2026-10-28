import React from 'react';

export const Sec2_Map: React.FC = () => {
    return (
        <section className="section" id="s2">
            <h2><i className="ti ti-map-2"></i>1. Domain 4 の地図(全 19 スキル)</h2>
            <p>
                公式の試験ガイドにある 4 つのタスクと 19
                のスキルを、やさしい言葉に言い換えた一覧です。[S3]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">公式スキル(要約)</th>
                            <th scope="col">一言でいうと</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>Task 4.1</strong></td>
                            <td><strong>AI の事業準備度と成熟度を評価する</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4.1.1</td>
                            <td>
                                リーダーの合意、データ品質、文化、技術基盤、ガバナンスなどの観点で準備度を評価
                            </td>
                            <td>「AI を始められる状態か」を診断する</td>
                        </tr>
                        <tr>
                            <td>4.1.2</td>
                            <td>AI 成熟度モデルで企業の現在地(実験〜全社展開)を評価</td>
                            <td>「いまどの段階か」を知る</td>
                        </tr>
                        <tr>
                            <td>4.1.3</td>
                            <td>人・プロセス・技術・ガバナンスの能力ギャップを特定</td>
                            <td>「何が足りないか」を洗い出す</td>
                        </tr>
                        <tr>
                            <td>4.1.4</td>
                            <td>戦略目標と成熟度に基づき投資の優先順位と成長の道筋を作る</td>
                            <td>「どこから手を付けるか」を決める</td>
                        </tr>
                        <tr>
                            <td><strong>Task 4.2</strong></td>
                            <td><strong>AI のためのデータとインフラの土台を整える</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4.2.1</td>
                            <td>データ品質、アクセス性、データサイロの影響を評価</td>
                            <td>データが「使える状態」か確認する</td>
                        </tr>
                        <tr>
                            <td>4.2.2</td>
                            <td>
                                データ戦略、データオーナーシップ、データ共有の枠組みの重要性を説明
                            </td>
                            <td>データの「持ち主とルール」を決める</td>
                        </tr>
                        <tr>
                            <td>4.2.3</td>
                            <td>AI を支える技術・インフラ要件を評価</td>
                            <td>必要な「基盤」を見極める</td>
                        </tr>
                        <tr>
                            <td><strong>Task 4.3</strong></td>
                            <td><strong>全社の変革を率い、AI 対応の人材を育てる</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4.3.1</td>
                            <td>経営層のスポンサーシップと AI チャンピオンで推進力を維持</td>
                            <td>「偉い人の後ろ盾」と「現場の旗振り役」</td>
                        </tr>
                        <tr>
                            <td>4.3.2</td>
                            <td>多様な専門性を持つ部門横断チームと明確な責任体制を作る</td>
                            <td>「みんなで進め、責任者を決める」</td>
                        </tr>
                        <tr>
                            <td>4.3.3</td>
                            <td>従業員の不安に応える透明なコミュニケーション戦略を作る</td>
                            <td>「隠さず、早く、繰り返し伝える」</td>
                        </tr>
                        <tr>
                            <td>4.3.4</td>
                            <td>
                                文化的な障壁(リスク回避、変化への抵抗、失敗への恐れ)を見抜き、リーダーの介入策を決める
                            </td>
                            <td>「心理的な壁」を取り除く</td>
                        </tr>
                        <tr>
                            <td>4.3.5</td>
                            <td>
                                POC、ハッカソン、研修、責任ある AI 研修など人材育成の手法を選ぶ
                            </td>
                            <td>「AI リテラシー」を底上げする</td>
                        </tr>
                        <tr>
                            <td>4.3.6</td>
                            <td>
                                人の役割を手作業から AI の監督・協働へ移し、人と AI の強みを両立
                            </td>
                            <td>「人にしかできないこと」を残す</td>
                        </tr>
                        <tr>
                            <td><strong>Task 4.4</strong></td>
                            <td><strong>パイロットから全社展開へスケールする</strong></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>4.4.1</td>
                            <td>
                                段階的(Envision、Experiment、Launch、Scale
                                など)に進める反復的変革
                            </td>
                            <td>「小さく始めて段階的に広げる」</td>
                        </tr>
                        <tr>
                            <td>4.4.2</td>
                            <td>短期の成果から始めて全社展開へ積み上げる</td>
                            <td>「クイックウィン」で勢いをつける</td>
                        </tr>
                        <tr>
                            <td>4.4.3</td>
                            <td>AI COE と部門横断の連携の仕組みを作る</td>
                            <td>「専門家の拠点」を作る</td>
                        </tr>
                        <tr>
                            <td>4.4.4</td>
                            <td>継続的なフィードバックと成功指標で進捗と長期価値を追跡</td>
                            <td>「測り続け、改善し続ける」</td>
                        </tr>
                        <tr>
                            <td>4.4.5</td>
                            <td>実験から本番品質への移行(ガバナンスと運用要件を含む)</td>
                            <td>「実験」と「本番」の壁を越える</td>
                        </tr>
                        <tr>
                            <td>4.4.6</td>
                            <td>
                                スケール中に事業継続とパフォーマンスを守るため複数の要因を評価
                            </td>
                            <td>「広げても壊れない」ようにする</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
