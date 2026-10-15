import React from 'react';

export const Sec7_ExamTips: React.FC = () => {
    return (
        <section className="section" id="s7">
            <div className="sec-head">
                <span className="eyebrow">Chapter 07</span>
                <h2>
                    <i className="ti ti-target"></i>
                    <span>試験対策: 頻出パターンと引っかけポイント</span>
                </h2>
            </div>
            <div className="prose">
                <h3 id="s7-1">7.1 正解になりやすい考え方</h3>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">パターン</th>
                                <th scope="col">正解の方向性</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>計画段階の話</td>
                                <td>
                                    責任ある
                                    AI・ガバナンスは<strong>最初から</strong>組み込む(後付けは誤り)
                                </td>
                            </tr>
                            <tr>
                                <td>高影響な判断</td>
                                <td>
                                    <strong>人間の監督</strong>を維持、エスカレーション基準を定義
                                </td>
                            </tr>
                            <tr>
                                <td>ガバナンス体制</td>
                                <td>
                                    <strong>部門横断</strong>＋<strong>明確な責任者</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>リスクの扱い</td>
                                <td>
                                    <strong>リスクに応じた(比例した)</strong>統制。一律最強も一律ゆるいも誤り
                                </td>
                            </tr>
                            <tr>
                                <td>バイアス</td>
                                <td>
                                    1 回きりでなく<strong>全ライフサイクル</strong>＋<strong>継続監視(Bias Drift)</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>幻覚</td>
                                <td>
                                    ゼロにできない前提の<strong>多層防御</strong>(根拠づけ＋チェック＋人間)
                                </td>
                            </tr>
                            <tr>
                                <td>責任共有</td>
                                <td>
                                    AWS が守るのは基盤。<strong>データ・アクセス・設定は顧客</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>規制</td>
                                <td>
                                    法務と連携して適用範囲を確認し、証跡を残す。AWS
                                    の認証は顧客の責任を免除しない
                                </td>
                            </tr>
                            <tr>
                                <td>IP</td>
                                <td>補償があっても<strong>確認プロセスは必要</strong></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="s7-2">7.2 引っかけの型</h3>
                <ol>
                    <li>
                        「ガードレールを入れれば公平性も説明可能性も解決」→
                        ガードレールは主に安全性・プライバシー・根拠づけ。公平性・説明可能性は別途の評価・文書化が必要
                    </li>
                    <li>
                        「AWS がセキュリティを担うので顧客の対応は不要」→
                        責任共有モデルの誤解
                    </li>
                    <li>
                        「リリース前にテストして合格したので継続監視は不要」→ ドリフトと
                        Bias Drift を無視
                    </li>
                    <li>
                        「AI の利用を全面禁止すればリスクはなくなる」→ シャドー AI
                        を招く。承認済みの代替を用意する
                    </li>
                    <li>「PoC が成功してからガバナンス」→ Governance by Design に反する</li>
                    <li>
                        「全 AI システムに最高水準の審査」→
                        比例原則(リスクベース)に反し、拡大を妨げる
                    </li>
                    <li>「技術チームがすべて決める」→ 部門横断・責任者の明確化に反する</li>
                </ol>
                <h3 id="s7-3">7.3 複数選択問題のコツ</h3>
                <ul>
                    <li>
                        5
                        択以上から<strong>すべての正解</strong>を選ぶ必要があります(部分点なし)。設問文の「2
                        つ選べ」等の指定を必ず確認
                    </li>
                    <li>
                        誤答選択肢は「極端(常に・絶対・すべて)」「順序の誤り(後から)」「責任の押し付け(ベンダー任せ)」になりやすい
                    </li>
                </ul>
            </div>
        </section>
    );
};
