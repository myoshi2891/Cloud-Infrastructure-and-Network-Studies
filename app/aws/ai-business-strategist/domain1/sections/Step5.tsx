import { Diagram } from '../Diagram';

export function Step5() {
    return (
        <section id="step-5-skill-115">
            <h2>Step 5: 過去データによるモデル学習 (Skill 1.1.5)</h2>
            <p>
                <strong>試験ガイドの該当スキル</strong>: 過去データ (historical data) を使った AI
                モデルの学習に関する概念を説明できる。
            </p>
            <h3 id="_27">ひとことで言うと</h3>
            <div className="tldr-box">
                <p>
                    <strong>モデルは「過去の例」から規則性を学び、その規則を未来のデータに当てはめます</strong>。だから、過去が未来を代表していること (データが現実を映していること)
                    と、学習後もフィードバックで更新し続けることが重要です。
                </p>
            </div>

            <h3 id="_28">詳しい解説</h3>
            <h4 id="_29">学習の基本サイクル</h4>
            <p>
                AWS
                の記事は、教師あり学習を例に、モデルに入力を与え、出力を返すように学習させると説明しています
                (例:
                画像を入力に、その画像に特定の物体が写っている確率を出力する)。そして、学習は「一度きりの作業ではなく、最新の例とフィードバックで継続的に訓練し続ける」ものだと述べています。
            </p>
            <figure className="diagram-figure">
                <Diagram id="d5" label="図 6 学習の基本サイクルを示す図" />
                <figcaption>図 6</figcaption>
            </figure>
            <h4 id="_30">学習の種類 (ビジネスパーソンが知っておく水準)</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">種類</th>
                            <th scope="col">概要</th>
                            <th scope="col">過去データの形</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td><strong>教師あり学習</strong></td>
                            <td>「入力と正解」のペアから学ぶ</td>
                            <td>ラベル付きデータ</td>
                            <td>過去の取引と「不正だった/正常だった」から不正を判定</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>教師なし学習</strong></td>
                            <td>正解なしでデータの構造を見つける</td>
                            <td>ラベルなしデータ</td>
                            <td>顧客を購買パターンで自動的にグループ分け</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>強化学習</strong></td>
                            <td>試行と報酬から行動方針を学ぶ</td>
                            <td>行動と報酬の履歴</td>
                            <td>在庫補充や推薦の方針の最適化</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="note-callout">
                <p>
                    教師あり・教師なし・強化学習の 3 分類は ML
                    の一般的な整理です。試験ガイドは「過去データによるモデル学習に関する概念」と表現しており、ビジネス職向けには<strong>「学習には過去データが要る」「ラベル (正解) 付きデータは作るのに手間がかかる」</strong>という理解が実務上の要点です。
                </p>
            </blockquote>
            <h4 id="_31">過去データで学習するときの注意点</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">注意点</th>
                            <th scope="col">何が起きるか</th>
                            <th scope="col">対策の方向性</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td><strong>過去の偏りの継承</strong></td>
                            <td>過去の採用・与信などの偏った判断をそのまま学習する</td>
                            <td>学習データの偏りを点検し、公平性の観点で評価する</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>環境の変化</strong></td>
                            <td>過去のパターンが今は通用しない (景気、季節、規制、顧客行動)</td>
                            <td>継続的な監視と再学習 (Step 9)</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>データ不足・低多様性</strong></td>
                            <td>少数の事例に過剰に合わせ、新しい事例に弱い</td>
                            <td>データの量と多様性を確保する</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>評価の使い回し</strong></td>
                            <td>学習に使ったデータで評価すると、実力より高く見える</td>
                            <td>学習に使っていないデータで評価する</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>ラベルの誤り</strong></td>
                            <td>誤った正解を覚える</td>
                            <td>ラベル品質の管理</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4 id="ai_3">生成 AI の場合の「過去データ」</h4>
            <p>
                生成 AI
                の基盤モデルは、提供元が大規模データで事前学習します。企業側が「過去データで追加学習する」場面は、<strong>ファインチューニング (Step 13)</strong>
                です。自社の過去の問い合わせ対応記録などを教師データにして、トーンや形式を学ばせるイメージです。Amazon
                Bedrock ではモデルカスタマイズ (ファインチューニング、継続事前学習) をコンソールや
                API から実行でき、学習データは Amazon S3 に置いて使います。
            </p>
            <h3 id="_32">ベストプラクティス</h3>
            <div className="practice-box">
                <ol>
                    <li>
                        <strong>「過去は未来を代表するか」を毎回問う</strong>: 前提が変わった領域
                        (新規事業、規制変更、パンデミックのような急変)
                        では過去データの価値が下がる。
                    </li>
                    <li>
                        <strong>学習用と評価用のデータを分ける</strong>:
                        「学習に使っていない例」でどれだけ当たるかが、本当の実力。
                    </li>
                    <li>
                        <strong>ラベル付けのコストを見積もる</strong>:
                        教師あり学習ではラベル作成が大きな工数になる。
                    </li>
                    <li>
                        <strong>フィードバックの回路を業務に組み込む</strong>:
                        誤りを現場が報告できる導線を作り、再学習に活かす。
                    </li>
                    <li>
                        <strong>学習を「一回きりのプロジェクト」にしない</strong>:
                        学習・評価・展開・監視・再学習のサイクル (運用体制) を予算に含める。
                    </li>
                </ol>
            </div>

            <h3 id="_33">よくある誤解と試験の狙い目</h3>
            <div className="misconception-box">
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr className="t-head">
                                <th scope="col">誤解</th>
                                <th scope="col">正しい理解</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="t-odd">
                                <td>「学習すれば永久に使える」</td>
                                <td>環境が変われば精度が落ちる。継続的な更新が必要</td>
                            </tr>
                            <tr className="t-even">
                                <td>「過去データが多いほど必ず良い」</td>
                                <td>量よりも、品質・多様性・代表性が重要</td>
                            </tr>
                            <tr className="t-odd">
                                <td>「学習データの偏りはモデルが自動で補正する」</td>
                                <td>偏りはそのまま学習される</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 id="_34">根拠となるソース</h3>
            <div className="source-box">
                <ul>
                    <li>
                        Machine Learning: Avoiding Garbage in, Garbage Out (AWS):{' '}
                        <a
                            href="https://aws.amazon.com/blogs/enterprise-strategy/machine-learning-avoiding-garbage-in-garbage-out/"
                            rel="noopener"
                            target="_blank"
                        >
                            https://aws.amazon.com/blogs/enterprise-strategy/machine-learning-avoiding-garbage-in-garbage-out/
                        </a>
                    </li>
                    <li>
                        Submit a model customization job for fine-tuning or continued pre-training
                        (Amazon Bedrock):{' '}
                        <a
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-submit.html"
                            rel="noopener"
                            target="_blank"
                        >
                            https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-submit.html
                        </a>
                    </li>
                    <li>
                        Customize models in Amazon Bedrock with your own data (AWS News Blog):{' '}
                        <a
                            href="https://aws.amazon.com/blogs/aws/customize-models-in-amazon-bedrock-with-your-own-data-using-fine-tuning-and-continued-pre-training/"
                            rel="noopener"
                            target="_blank"
                        >
                            https://aws.amazon.com/blogs/aws/customize-models-in-amazon-bedrock-with-your-own-data-using-fine-tuning-and-continued-pre-training/
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
