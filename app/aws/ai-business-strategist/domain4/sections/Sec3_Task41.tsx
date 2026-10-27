import React from 'react';
import { Diagram } from '../Diagram';

export const Sec3_Task41: React.FC = () => {
    return (
        <section className="section" id="s3">
            <h2><i className="ti ti-gauge"></i>2. Task 4.1 AI の準備度と成熟度を評価する</h2>
            <h3>2-0. まず全体の流れ</h3>
            <Diagram id="d1" />
            <h3 id="k4-1-1">Skill 4.1.1 事業準備度を複数の観点で評価する</h3>
            <p>
                <strong>① 何を問われるか</strong> AI
                を導入する前に、組織が「始められる状態か」を、リーダーの合意・データ品質・文化的な準備・技術基盤・ガバナンスといった
                <strong>複数の観点</strong> で診断できるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> 登山にたとえると、山頂(AI
                の成果)を目指す前に、体力・装備・天気・仲間・地図が揃っているかを確認する作業です。「装備(ツール)だけ買って、体力(人と文化)がない」状態が最も危険です。
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点</th>
                            <th scope="col">確認する問い</th>
                            <th scope="col">危険信号の例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>リーダーの合意</td>
                            <td>経営層は目的・予算・責任者に合意しているか</td>
                            <td>「まず AI を入れろ」とだけ指示があり、目的が曖昧</td>
                        </tr>
                        <tr>
                            <td>データ品質</td>
                            <td>必要なデータは存在し、正確で、最新か</td>
                            <td>部署ごとに形式がバラバラ、更新が止まっている</td>
                        </tr>
                        <tr>
                            <td>文化的な準備</td>
                            <td>失敗を許容し、試す文化があるか</td>
                            <td>新しいことは「前例がない」で止まる</td>
                        </tr>
                        <tr>
                            <td>技術基盤</td>
                            <td>データを集め、モデルを使い、運用できる基盤があるか</td>
                            <td>データが各部署のファイルに散在</td>
                        </tr>
                        <tr>
                            <td>ガバナンス</td>
                            <td>利用ルール、リスク管理、責任者が決まっているか</td>
                            <td>誰が AI の判断に責任を持つか不明</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>③ 具体例</strong> ある小売企業が「問い合わせ対応を生成 AI
                で自動化したい」と考えた場合。経営層の合意はあるが、FAQ
                が古く、商品データが部署ごとに別管理で、利用ルールもない。この場合の正しい判断は「いきなり全店導入」ではなく、<strong>データの整備とルール作りを優先しつつ小さく検証する</strong>ことです。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">理由</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>構築を始める前に準備度アセスメントを行う</td>
                            <td>必要な能力のギャップを先に見える化できる</td>
                            <td>[S22][S6]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                評価は技術だけでなく、ビジネス・人・ガバナンス・基盤・セキュリティ・運用の
                                6 つの視点で見る
                            </td>
                            <td>AWS CAF for AI が 6 つの視点で能力を整理している</td>
                            <td>[S8]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                一度きりで終わらせず、導入の進行に合わせて基礎能力を進化させ、準備度を更新する
                            </td>
                            <td>準備度は導入が進むにつれて変わる</td>
                            <td>[S7]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                データ戦略の問い(必要なデータ種別の利用可能性、品質指標、ガバナンス体制)を評価項目に入れる
                            </td>
                            <td>データの準備度が AI の成否を左右する</td>
                            <td>[S21]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong> -
                「最新ツールの導入」や「エンジニアの大量採用」を最初の一手にする選択肢は誤りになりやすいです。<strong>準備度の診断が先</strong>です。 - 準備度の評価は「合格・不合格の判定」ではなく、<strong>次の一手を決めるための診断</strong>です。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S6] [S7] [S8] [S21] [S22]</p>
            <h3 id="k4-1-2">Skill 4.1.2 AI 成熟度モデルで現在地を評価する</h3>
            <p>
                <strong>① 何を問われるか</strong> AI
                成熟度モデルを使い、企業が「実験段階」から「全社展開」までのどこにいるかを評価できるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> 成熟度モデルは
                <strong>「AI 活用の階段」</strong>
                です。自分が何段目にいるかが分かれば、次の一段に必要なことだけに集中できます。
            </p>
            <p>
                AWS の規範的ガイダンスには、生成 AI の成熟度モデルがあり、<strong>Envision → Experiment → Launch → Scale</strong>の 4 段階で整理されています。[S11][S12]
            </p>
            <Diagram id="d2" />
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">段階</th>
                            <th scope="col">主な状態</th>
                            <th scope="col">次の段階へ進むための主な活動</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Level 1 Envision</td>
                            <td>生成 AI の基本を理解し、用途の候補を探す</td>
                            <td>構造化されたパイロットを計画する</td>
                            <td>[S12][S18]</td>
                        </tr>
                        <tr>
                            <td>Level 2 Experiment</td>
                            <td>
                                部門横断の専任チームが、検証済みのモデルやツールでパイロットを実施。リスク・ガバナンス・責任ある
                                AI の方針も整備
                            </td>
                            <td>
                                本番品質のインフラ(CI/CD、標準デプロイパターン)、本番用ガバナンス、可観測性(監視・ログ)を整える
                            </td>
                            <td>[S12][S13]</td>
                        </tr>
                        <tr>
                            <td>Level 3 Launch</td>
                            <td>
                                本番品質の生成 AI を、ガバナンス・監視・サポート体制付きで運用
                            </td>
                            <td>
                                運用モデルと RACI
                                の正式化、再利用可能なパターンの抽出、データガバナンスがセルフサービスに耐えるか見直す
                            </td>
                            <td>[S14]</td>
                        </tr>
                        <tr>
                            <td>Level 4 Scale</td>
                            <td>
                                複数部門が広く利用。全社のインフラとツール、再利用可能な部品のライブラリがある
                            </td>
                            <td>
                                標準化・自動化されたガバナンスとコスト最適化を維持しながら拡大
                            </td>
                            <td>[S15]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>③ 具体例</strong> 「部署 A が PoC を 3
                つ実施し、専任チームもできたが、本番用の監視や責任分担は未整備」という企業は、<strong>Level 2(Experiment)から Level 3(Launch)への移行期</strong>にいます。次の一手は、新しい PoC を増やすことではなく、<strong>本番のインフラ・ガバナンス・監視を整えること</strong>です。
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
                                成熟度評価で「現在地」と「次の段階で重点を置く領域」を特定する
                            </td>
                            <td>[S11][S16]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                組織を 1 つのラベルで決めつけない。部門ごとに段階が違ってよい
                            </td>
                            <td>[S12]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                成熟度レベルは「次の一手」を選ぶための目安として使い、必ず順番に通過すべき関門とはみなさない。導入の各側面(aspect)には複数レベルの特徴が混在しうる
                            </td>
                            <td>[S12][S13][S14]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>⑤ ひっかけ注意(重要)</strong></p>
            <blockquote>
                <p>
                    <strong>成熟度モデルの段階名は、資料によって違います。</strong> -
                    <strong>生成 AI 成熟度モデル(規範的ガイダンス)</strong>: Envision →
                    <strong>Experiment</strong> → Launch → Scale -
                    <strong>AWS CAF for AI の変革の旅</strong>: Envision →
                    <strong>Align</strong> → Launch → Scale [S7]
                </p>
                <p>
                    試験ガイドの Skill 4.4.1 の例は「envision, experiment, launch,
                    scale」です。[S3] 「Align」は CAF の 2 番目の段階で、<strong>能力ギャップの特定や関係者の合意</strong>に焦点があります。混同しないようにしましょう。
                </p>
            </blockquote>
            <p><strong>⑥ 根拠</strong>: [S3] [S7] [S11] [S12] [S13] [S14] [S15] [S16] [S18]</p>
            <h3 id="k4-1-3">
                Skill 4.1.3 人・プロセス・技術・ガバナンスの能力ギャップを特定する
            </h3>
            <p>
                <strong>① 何を問われるか</strong> AI 変革の成功を妨げる具体的な不足を、<strong>人・プロセス・技術・ガバナンス</strong>の 4 領域で見つけられるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> 「AI
                がうまくいかない」という漠然とした悩みを、<strong>どの領域の何が足りないのか</strong>に分解する作業です。医師が「体調が悪い」を検査で具体的な原因に絞るのと同じです。
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">領域</th>
                            <th scope="col">典型的なギャップ</th>
                            <th scope="col">対応の方向性</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>人</td>
                            <td>AI リテラシー不足、専任人材の不足、変化への抵抗</td>
                            <td>研修、チャンピオンの任命、採用と外部パートナー活用</td>
                        </tr>
                        <tr>
                            <td>プロセス</td>
                            <td>
                                用途の選定・評価・承認の流れがない、ワークフローが AI 前提でない
                            </td>
                            <td>用途の評価基準と承認フローの整備、業務プロセスの再設計</td>
                        </tr>
                        <tr>
                            <td>技術</td>
                            <td>データ基盤の分断、評価・監視の仕組みがない</td>
                            <td>データ統合、評価と可観測性の仕組み、本番運用の基盤</td>
                        </tr>
                        <tr>
                            <td>ガバナンス</td>
                            <td>
                                責任者不明、リスク分類やポリシーの欠如、データの管理ルールがない
                            </td>
                            <td>責任体制(RACI)、ポリシー、データガバナンスの整備</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>③ 具体例</strong> 「PoC
                は成功するのに本番に進まない」という症状を分解すると、多くの場合
                <strong>プロセス(本番移行の基準がない)</strong> と
                <strong>ガバナンス(本番運用の責任者と承認が不明)</strong>
                の不足が見つかります。技術を増強しても解決しません。
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
                            <td>4 領域すべてを見る。技術だけの診断にしない</td>
                            <td>[S3][S8]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                部門間の依存関係と、関係者の懸念も同時に洗い出す(CAF の Align
                                段階の焦点)
                            </td>
                            <td>[S7]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                AI
                                導入は他の技術より部門横断の取り組みになると認識し、ギャップ対応も部門横断で進める
                            </td>
                            <td>[S7]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>
                選択肢に「技術」だけを強化する案と、「人・プロセス・ガバナンスも含む案」が並ぶ場合、後者が正解になりやすいです。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S7] [S8]</p>
            <h3 id="k4-1-4">Skill 4.1.4 投資の優先順位と成長の道筋を作る</h3>
            <p>
                <strong>① 何を問われるか</strong>
                戦略目標と現在の成熟度に基づき、<strong>どのギャップにどの順番で投資するか</strong>、そして
                <strong>次の段階へ進む道筋</strong> を作れるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong>
                限られた予算と人員で、全部を一度に直すことはできません。<strong>「戦略目標に効くか」と「いまの段階で実行できるか」</strong>の 2 軸で優先順位を付けます。
            </p>
            <Diagram id="d3" />
            <p><strong>③ 具体例</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">状況</th>
                            <th scope="col">優先度の判断</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>「顧客対応の効率化」が戦略目標で、FAQ データは整備済み</td>
                            <td>最優先。すぐに小さく検証できる</td>
                        </tr>
                        <tr>
                            <td>同じ目標だが、データが部署ごとに分断</td>
                            <td>まずデータ統合と責任者の任命(前提整備)</td>
                        </tr>
                        <tr>
                            <td>目標と関係が薄い高度な AI 機能の導入</td>
                            <td>後回し。定期的に再評価</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
                                成熟度の各段階の「次へ進むための活動」を投資計画に落とし込む
                            </td>
                            <td>[S13][S14]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                用途はビジネスインパクトと実現可能性の 2 軸で優先順位を付ける
                            </td>
                            <td>[S4]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>成長の道筋は段階的にし、各段階で測定可能な成果を置く</td>
                            <td>[S7][S27]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>
                「最も高度な技術」や「最大規模の投資」を優先する選択肢は誤りになりやすいです。<strong>戦略目標と現在地に合うもの</strong>が正解です。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S4] [S7] [S13] [S14] [S27]</p>
        </section>
    );
};
