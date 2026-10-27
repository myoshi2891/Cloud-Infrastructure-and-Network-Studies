import React from 'react';
import { Diagram } from '../Diagram';

export const Sec5_Task43: React.FC = () => {
    return (
        <section className="section" id="s5">
            <h2>
                <i className="ti ti-users-group"></i>4. Task 4.3 全社の変革を率い、AI 人材を育てる
            </h2>
            <h3>4-0. 全体の流れ</h3>
            <p>
                AWS CAF for AI は、AI の取り組みは
                <strong>技術だけの課題ではなく、ガードレールを作り推進する「人」に決定的に依存する</strong>
                と述べ、<strong>文化の重要性</strong> を強調しています。[S9]
            </p>
            <Diagram id="d6" />
            <h3 id="k4-3-1">Skill 4.3.1 経営層のスポンサーシップと AI チャンピオン</h3>
            <p>
                <strong>① 何を問われるか</strong> 経営層の後ろ盾を確立し、現場で推進する
                <strong>AI チャンピオン</strong>
                を見つけて権限を与えることで、全社で勢いを保てるか。[S3]
            </p>
            <p><strong>② やさしい説明</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">役割</th>
                            <th scope="col">何をする人か</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>経営スポンサー</td>
                            <td>予算・優先順位・障害の除去を担保する上位の後ろ盾</td>
                            <td>役員が AI 推進の成果責任を持つ</td>
                        </tr>
                        <tr>
                            <td>AI チャンピオン</td>
                            <td>各部門で AI 活用を広め、現場の声を吸い上げる旗振り役</td>
                            <td>営業部の中堅が勉強会を主催</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                AWS の COE 解説では、AI/ML COE を作る最初の一歩は
                <strong>上級リーダーからのスポンサーシップの確保</strong>
                だとされています。[S25] また、AI ステアリング委員会に AI
                チャンピオンを置くことも推奨されています。[S26]
            </p>
            <p>
                <strong>③ 具体例</strong> AI
                の専任チームだけが頑張っても、営業・経理・法務が動かなければ全社には広がりません。<strong>スポンサーが優先順位を明言し、各部門のチャンピオンが現場に橋をかける</strong>ことで、継続的な推進力になります。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>スポンサーは目的・予算・意思決定権限を持つ人にする</td>
                            <td>[S25]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>各部門にチャンピオンを置き、時間と権限を公式に与える</td>
                            <td>[S3][S26]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                経営層の関与は一度きりでなく、進捗レビューなど継続的な仕組みにする
                            </td>
                            <td>[S9][S35]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>取り組みを事業目標・KPI と結び付けて報告する</td>
                            <td>[S26]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong> 「ボトムアップだけで自然に広がる」「IT
                部門に全責任を任せる」は、推進力が続かない選択肢として誤りになりやすいです。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S9] [S25] [S26] [S35]</p>
            <h3 id="k4-3-2">Skill 4.3.2 部門横断チームと明確な責任体制</h3>
            <p>
                <strong>① 何を問われるか</strong>
                事業責任者、技術専門家、法務、コンプライアンスなど
                <strong>多様な専門性を持つ部門横断チーム</strong> を作り、AI の取り組みに
                <strong>明確な責任基準</strong> を割り当てられるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> AI
                のプロジェクトは、技術だけでは成立しません。法務(権利・規制)、コンプライアンス(ルール)、事業部門(価値)、技術(実現)が揃って初めて前に進みます。
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">メンバー</th>
                            <th scope="col">貢献</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>事業責任者</td>
                            <td>課題・価値・成功指標を定義</td>
                        </tr>
                        <tr>
                            <td>技術専門家</td>
                            <td>実現可能性と実装</td>
                        </tr>
                        <tr>
                            <td>法務・コンプライアンス</td>
                            <td>規制、知的財産、契約、リスクの確認</td>
                        </tr>
                        <tr>
                            <td>データ責任者</td>
                            <td>データの品質とアクセス</td>
                        </tr>
                        <tr>
                            <td>現場の代表者</td>
                            <td>実際の業務との整合、受け入れ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                責任体制には{' '}
                <strong>RACI(実行責任者・説明責任者・相談先・報告先を整理する表)</strong>{' '}
                がよく使われます。AWS の成熟度モデルでも、運用モデルと RACI の整備が
                Launch〜Scale の重要な活動とされています。[S14][S15]
            </p>
            <p>
                <strong>③ 具体例</strong> 採用スクリーニングの AI
                を検討する場合、人事(業務)、技術、法務(差別禁止や個人情報)、コンプライアンスが最初から関与していれば、後から「使えない」と判明する手戻りを防げる。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                IT、データサイエンス、法務、事業部門の代表を含むチームを作る
                            </td>
                            <td>[S24]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                各取り組みに <strong>説明責任を負う責任者を 1 人</strong> 置く
                            </td>
                            <td>[S3][S14]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>運用モデルと RACI を文書化し、組織内に公開する</td>
                            <td>[S14][S15]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                モデルの評価、法務レビュー、アクセス申請などの社内プロセスを整備する
                            </td>
                            <td>[S23]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「技術者だけのチーム」「責任者が曖昧な合議制」は誤りになりやすいです。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S14] [S15] [S23] [S24]</p>
            <h3 id="k4-3-3">Skill 4.3.3 透明なコミュニケーション戦略</h3>
            <p>
                <strong>① 何を問われるか</strong>{' '}
                従業員の不安(導入時期、期待する成果、自分の役割への影響)に応える{' '}
                <strong>透明なコミュニケーション戦略</strong> を作れるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> 「AI
                に仕事を奪われるのでは」という不安は自然です。情報が少ないほど噂が広がります。<strong>早く、正直に、繰り返し、双方向で</strong>{' '}
                伝えることが基本です。AWS の資料も、AI
                が生成する洞察への信頼を築くための変更管理プログラムや、関係者向けのコミュニケーションチャネルの再設計を推奨しています。[S26]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">伝えるべきこと</th>
                            <th scope="col">具体的な内容の例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>なぜ導入するか</td>
                            <td>目的と期待する成果(業務の負荷軽減、品質向上など)</td>
                        </tr>
                        <tr>
                            <td>いつ何が変わるか</td>
                            <td>導入のスケジュール、段階、影響を受ける業務</td>
                        </tr>
                        <tr>
                            <td>自分の役割はどうなるか</td>
                            <td>役割の変化、再教育の機会、意思決定への関与</td>
                        </tr>
                        <tr>
                            <td>どう意見を届けるか</td>
                            <td>質問窓口、フィードバックの経路</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>③ 具体例</strong> 経理部門に請求書処理の AI
                を導入する際、「何か月後に」「どの作業が」「どう変わり」「どんな研修があるか」を導入前に説明し、説明会と質疑の場を複数回設けると、抵抗が大きく下がる。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>導入の計画段階から伝え、決定後の通知だけにしない</td>
                            <td>[S7][S35]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>良い情報だけでなく、不確実な点や限界も正直に伝える</td>
                            <td>[S3]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>一方向の発表でなく、質問・意見を集める双方向の仕組みにする</td>
                            <td>[S26]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>役割への影響を具体的に示し、再教育の機会とセットで伝える</td>
                            <td>[S9]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「不安を煽らないよう、導入直前まで伝えない」は誤りです。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S7] [S9] [S26] [S35]</p>
            <h3 id="k4-3-4">Skill 4.3.4 文化的な障壁を見抜き、リーダーの介入策を決める</h3>
            <p>
                <strong>① 何を問われるか</strong>{' '}
                <strong>リスク回避、変化への抵抗、失敗への恐れ</strong>{' '}
                などの文化的障壁を認識し、リーダーが取るべき介入を選べるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> AI
                は「やってみないと分からない」「出力を調整して改善する」性質が強く、<strong>試して学ぶ文化</strong>{' '}
                が重要です。AWS CAF for AI も、AI
                では望ましい出力を得るために適切な入力を探し続ける文化が、より重要だと述べています。[S9]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">障壁</th>
                            <th scope="col">よく見られる兆候</th>
                            <th scope="col">リーダーの介入策</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>リスク回避</td>
                            <td>「前例がない」「失敗したら責任問題」</td>
                            <td>安全に実験できる範囲を明示し、失敗しても責めない</td>
                        </tr>
                        <tr>
                            <td>変化への抵抗</td>
                            <td>新しいツールを使わない、従来のやり方に固執</td>
                            <td>
                                早期から関与させ、現場の課題解決から始める。クイックウィンを共有
                            </td>
                        </tr>
                        <tr>
                            <td>失敗への恐れ</td>
                            <td>完璧になるまで公開しない</td>
                            <td>「生産的な失敗」から学びを共有する文化を作る</td>
                        </tr>
                        <tr>
                            <td>雇用不安</td>
                            <td>噂が広がる、協力が減る</td>
                            <td>役割の変化と再教育を透明に説明</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                AWS は、<strong>安全に実験できる文化</strong> を作ること、そして
                <strong>「生産的な失敗」から学びを体系的に集めること</strong>{' '}
                を原則に挙げています。行動しないコストが計算された実験のリスクを上回ることもあると述べています。[S27]
            </p>
            <p>
                <strong>③ 具体例</strong> ある部門で AI の試行が進まない場合、マネージャー自身が
                AI
                ツールを使い、うまくいかなかった例も共有すると、メンバーが試しやすくなる(リーダーが手本を示す)。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>安全な実験の範囲とルールを明示する</td>
                            <td>[S27]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>失敗から得た学びを、プロジェクトをまたいで体系的に蓄積する</td>
                            <td>[S27]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                変革の初期から、リーダーシップ・文化・組織構造に関する変更管理の枠組みを組み込む
                            </td>
                            <td>[S35]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>リーダー自身が行動で示す</td>
                            <td>[S9]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「ルールで使用を義務化して罰則を設ける」などの強制は、抵抗を強めるため誤りになりやすいです。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S9] [S27] [S35]</p>
            <h3 id="k4-3-5">Skill 4.3.5 AI リテラシーを加速する人材育成の手法</h3>
            <p>
                <strong>① 何を問われるか</strong> 全社の AI リテラシーを高めるため、<strong>POC プログラム、ハッカソン、研修、責任ある AI 研修</strong> などから適切な手法を選べるか。[S3]
            </p>
            <p><strong>② やさしい説明</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">手法</th>
                            <th scope="col">目的</th>
                            <th scope="col">向いている対象・場面</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>POC(概念実証)プログラム</td>
                            <td>小さく作って価値と実現性を体験で確認</td>
                            <td>具体的な用途がある部門</td>
                        </tr>
                        <tr>
                            <td>ハッカソン</td>
                            <td>短期間で多くのアイデアを形にし、熱量を高める</td>
                            <td>発想を広げたい、部門横断の交流を作りたい</td>
                        </tr>
                        <tr>
                            <td>研修・トレーニング</td>
                            <td>体系的に知識とスキルを底上げ</td>
                            <td>全社員、役割別</td>
                        </tr>
                        <tr>
                            <td>責任ある AI 研修</td>
                            <td>公平性・透明性・プライバシー・安全性などの原則と運用を理解</td>
                            <td>全員(特に AI を使う・承認する人)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                AWS の COE 解説は、COE
                が研修プログラム、ワークショップ、認定プログラム、ハッカソンを提供できるとしています。[S25]
                また、技術面と責任ある AI
                の両方を含む包括的な研修プログラムを推奨しています。[S23]
            </p>
            <p>
                AWS CAF の People 視点には、従業員の現在の知識・スキル・関心を分析する「Learning
                Needs Analysis(学習ニーズ分析)」の例があります。[S36b] また、CAF for AI は、AI
                人材を「ユーザーからビルダーまで」引き入れ、育成・維持していくことを強調しています。[S9]
            </p>
            <p>
                <strong>③ 具体例</strong> 全社員向けには基礎研修と責任ある AI
                研修、営業・人事など用途が明確な部門には POC
                プログラム、部門横断の発想を広げたいときはハッカソン、と{' '}
                <strong>目的に応じて組み合わせる</strong>。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>まず現在のスキルと関心を把握してから育成計画を作る</td>
                            <td>[S36b]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>役割別(一般利用者、推進者、ビルダー)に内容を分ける</td>
                            <td>[S9]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>技術研修と責任ある AI 研修をセットにする</td>
                            <td>[S23]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>継続的な再教育の機会を設ける</td>
                            <td>[S9]</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>研修を COE の活動として定着させる</td>
                            <td>[S25]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「一部の専門家だけを育成する」「一度の研修で完了」は誤りになりやすいです。<strong>全社・継続的・目的別</strong> が基本です。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S9] [S23] [S25] [S36b]</p>
            <h3 id="k4-3-6">Skill 4.3.6 人の役割を「手作業」から「監督と協働」へ移す</h3>
            <p>
                <strong>① 何を問われるか</strong> 人の役割を、手作業中心から{' '}
                <strong>AI の監督・AI との協働</strong>{' '}
                へ移す機会を見つけ、人の強み(批判的思考、共感、創造性)と AI の能力を{' '}
                <strong>戦略的にバランス</strong> させられるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> AI
                は大量で繰り返しの処理やパターン認識が得意で、人は文脈の理解、倫理的判断、共感、創造が得意です。<strong>AI に任せる部分と人が担う部分を設計する</strong> ことが重要です。
            </p>
            <Diagram id="d7" />
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">業務の特徴</th>
                            <th scope="col">推奨される役割分担(考え方)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>大量・反復・ルールが明確</td>
                            <td>
                                AI が中心、人は品質監視。ルールで足りるなら AI
                                でなくルールベースの自動化も選択肢
                            </td>
                        </tr>
                        <tr>
                            <td>判断にリスクや影響が大きい</td>
                            <td>人が最終判断。AI は材料を提供</td>
                        </tr>
                        <tr>
                            <td>共感・交渉・創造が価値の源泉</td>
                            <td>人が中心、AI は準備や分析を支援</td>
                        </tr>
                        <tr>
                            <td>AI の出力が不確実(ハルシネーション、バイアス)</td>
                            <td>人の確認とエスカレーション基準を設ける</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                (役割分担の表は、試験ガイドの「人による監督、ガードレール、エスカレーションの判断」「AI
                でなくルールベース自動化を使うべき場面」の観点を初学者向けに整理したものです。[S4])
            </p>
            <p>
                <strong>③ 具体例</strong> カスタマーサポートで、AI
                が問い合わせの一次回答を下書きし、人が確認して送信。怒りや複雑な事情を含む案件は自動でオペレーターに引き継ぐ。人は{' '}
                <strong>感情への配慮と例外対応</strong> に時間を使えるようになる。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                「自動化できる作業」でなく「人が価値を出せる仕事」を起点に再設計する
                            </td>
                            <td>[S3]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>エスカレーションの基準(どんな場合に人へ戻すか)を明文化する</td>
                            <td>[S4]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>監督する人への研修と、責任の所在の明確化をセットにする</td>
                            <td>[S9][S14]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>役割の変化と再教育の機会を、従業員へ透明に説明する</td>
                            <td>[S3][S9]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「人を完全に置き換える」「人は何も変わらない」の両極端は誤りになりやすいです。<strong>人の役割が監督・協働へ進化する</strong> という見方が正解です。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S4] [S9] [S14]</p>
        </section>
    );
};
