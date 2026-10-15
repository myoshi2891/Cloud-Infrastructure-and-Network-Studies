import { Diagram } from '../Diagram';

export function Sec2() {
    return (
        <section className="section" id="s2">
            <div className="sec-head">
                <span className="eyebrow">Chapter 02</span>
                <h2><i className="ti ti-route"></i><span>Domain 3 の全体像</span></h2>
            </div>
            <div className="prose">
                <p>
                    Domain 3 は 3 つの Task、合計 12
                    のスキルで構成されています(試験ガイドの記載どおり)。
                </p>
                <Diagram id="d0" />
                <h3 id="s2-1">2.1 3 つの Task を一言でいうと</h3>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">Task</th>
                                <th scope="col">一言でいうと</th>
                                <th scope="col">初学者向けの比喩</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>3.1</td>
                                <td>
                                    「AI をどういう価値観で使うか」を決め、判断に反映する
                                </td>
                                <td>会社の行動規範を AI にも適用する</td>
                            </tr>
                            <tr>
                                <td>3.2</td>
                                <td>
                                    「誰が責任を持ち、どのルールに従うか」を仕組みにする
                                </td>
                                <td>交通ルールと免許制度・警察の整備</td>
                            </tr>
                            <tr>
                                <td>3.3</td>
                                <td>「動かし始めた後に何が起きるか」を見張り、直す</td>
                                <td>車の定期点検とドライブレコーダー</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="s2-2">2.2 まず覚える用語</h3>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">用語</th>
                                <th scope="col">やさしい説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>責任ある AI(Responsible AI)</td>
                                <td>
                                    利益を最大化しつつ、リスクと害を最小化するよう AI
                                    を設計・開発・利用する取り組み
                                </td>
                            </tr>
                            <tr>
                                <td>ガバナンス</td>
                                <td>意思決定の権限・責任・ルール・監督の仕組み全体</td>
                            </tr>
                            <tr>
                                <td>ガードレール</td>
                                <td>
                                    AI
                                    の入出力に対して、有害・不適切・範囲外の内容を検知して止める安全装置
                                </td>
                            </tr>
                            <tr>
                                <td>幻覚(ハルシネーション)</td>
                                <td>AI がもっともらしいが事実でない内容を出力すること</td>
                            </tr>
                            <tr>
                                <td>モデルドリフト</td>
                                <td>
                                    時間の経過で入力データの傾向や現実が変わり、モデル性能が劣化すること
                                </td>
                            </tr>
                            <tr>
                                <td>Bias Drift</td>
                                <td>
                                    運用中に、特定グループへの偏りが徐々に変化・悪化すること
                                </td>
                            </tr>
                            <tr>
                                <td>Human-in-the-loop</td>
                                <td>重要な判断に人間のレビューや承認を組み込むこと</td>
                            </tr>
                            <tr>
                                <td>シャドー AI</td>
                                <td>
                                    会社が承認していない AI ツールを従業員が業務で使うこと
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
