import { Diagram } from '../Diagram';

export function Step4() {
    return (
        <section id="step-4-skill-114">
            <h2>Step 4: データ品質がなぜ重要か (Skill 1.1.4)</h2>
            <p>
                <strong>試験ガイドの該当スキル</strong>: AI
                の成果にとってデータ品質が重要な理由を説明できる。
            </p>
            <h3 id="_20">ひとことで言うと</h3>
            <div className="tldr-box">
                <p>
                    <strong>「ゴミを入れればゴミが出る (Garbage In, Garbage Out)」</strong>。AI
                    の性能の上限は、学習や参照に使うデータの品質で決まります。データが偏っている、古い、誤っている、重複していると、AI
                    は自信満々に間違えます。
                </p>
            </div>

            <h3 id="_21">詳しい解説</h3>
            <p>
                AWS Executive in Residence
                の記事は、機械学習はデータなしには成立せず、サンプル数が少なすぎたり、データの質が現実を正しく反映していなかったりすれば、モデルは役に立たなくなると述べています。同記事は、画像認識の例で、モデルが誤った結果を出す原因になり得るデータの問題として次を挙げています。
            </p>
            <ul>
                <li>
                    データが<strong>均一すぎて多様性がない</strong>
                    (赤いリンゴだけで学習すると、青リンゴや形の違うリンゴを見分けられない)
                </li>
                <li>データが<strong>不完全、または重複</strong>している</li>
                <li>
                    データに<strong>誤ったラベル</strong>が付いている
                    (疲れた人間が別のものを取り違えて付与する)
                </li>
            </ul>
            <h4 id="_22">品質の観点 (ビジネス向けチェックリスト)</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">観点</th>
                            <th scope="col">意味</th>
                            <th scope="col">問題が起きると</th>
                            <th scope="col">点検の問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td><strong>正確性</strong></td>
                            <td>値が事実と合っている</td>
                            <td>誤った学習・誤った回答</td>
                            <td>入力ミスや誤記はないか</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>完全性</strong></td>
                            <td>必要な項目・件数がそろっている</td>
                            <td>特定の層で精度が落ちる</td>
                            <td>欠損は多くないか</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>一貫性</strong></td>
                            <td>表記や定義が統一されている</td>
                            <td>同じものが別物扱いになる</td>
                            <td>部門間で定義は同じか</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>鮮度</strong></td>
                            <td>データが最新である</td>
                            <td>古い前提で判断する</td>
                            <td>更新頻度は業務に合うか</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>代表性・多様性</strong></td>
                            <td>対象の現実をバランスよく含む</td>
                            <td>偏った判断 (バイアス)</td>
                            <td>特定の顧客層が欠けていないか</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>重複の少なさ</strong></td>
                            <td>同じ事例の重複が少ない</td>
                            <td>特定パターンを過大評価</td>
                            <td>重複排除しているか</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>ラベルの正しさ</strong></td>
                            <td>教師データの正解が正しい</td>
                            <td>モデルが誤ったパターンを覚える</td>
                            <td>ラベル付けの品質管理はあるか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="note-callout">
                <p>
                    表の観点名は、上記 AWS 記事が挙げる問題 (多様性不足・不完全・重複・誤ラベル)
                    を、実務で使いやすいように整理し直したものです。試験では観点名の暗記よりも、<strong>「データ品質が悪いと成果が悪化する」因果関係と、その対策の方向性</strong>を問う問題が想定されます。
                </p>
            </blockquote>
            <h4 id="_23">データ品質が成果に効く流れ</h4>
            <figure className="diagram-figure">
                <Diagram id="d4" label="図 5 データ品質が成果に効く流れを示す図" />
                <figcaption>図 5</figcaption>
            </figure>
            <h4 id="ai_2">生成 AI でもデータ品質は同じく重要</h4>
            <p>
                生成 AI では、基盤モデルの学習データは提供元が管理しますが、<strong>自社データを使う場面 (RAG の参照文書、ファインチューニングの教師データ)</strong>{' '}
                では品質が結果を直接左右します。たとえば社内マニュアルが古い版と新しい版で混在していれば、RAG
                は古い手順を根拠として回答してしまいます。
            </p>
            <h3 id="_24">ベストプラクティス</h3>
            <div className="practice-box">
                <ol>
                    <li>
                        <strong>小さく始めて、データで学ぶ</strong>: AWS
                        の記事も、明確な目的を持つ小さな垂直スライス (エンドツーエンドの 1
                        ユースケース) から始めることを推奨しています。
                    </li>
                    <li>
                        <strong>データオーナーを決める</strong>:
                        誰がデータの正しさに責任を持つかを明確にする。
                    </li>
                    <li>
                        <strong>データ品質の指標と閾値を KPI 化する</strong>:
                        欠損率、重複率、更新遅延など。
                    </li>
                    <li>
                        <strong>ラベリングは品質管理をセットにする</strong>:
                        人手のラベルにも誤りは入る。複数人チェックや抜き取り検査を組み込む。
                    </li>
                    <li>
                        <strong>偏りを点検する</strong>:
                        学習データが特定の属性に偏っていないか、ビジネスの現実を代表しているかを見る
                        (Domain 3 の公平性につながる)。
                    </li>
                    <li>
                        <strong>「データが不足する問題」には無理に AI を当てない</strong>: AWS
                        の記事は、車両の傷の画像判定の例で、人間の目でも判別できない細かさのデータでは、モデルにも信頼できる予測はできないと述べています。<strong>データが問題を解ける水準にあるか</strong>を事前に確認する。
                    </li>
                </ol>
            </div>

            <h3 id="_25">よくある誤解と試験の狙い目</h3>
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
                                <td>「データ量が多ければ品質は問わない」</td>
                                <td>量が多くても偏り・誤り・重複があれば性能は上がらない</td>
                            </tr>
                            <tr className="t-even">
                                <td>「高性能なモデルなら悪いデータも吸収できる」</td>
                                <td>データの問題はモデルの高性能さでは埋まらない</td>
                            </tr>
                            <tr className="t-odd">
                                <td>「一度きれいにすれば終わり」</td>
                                <td>
                                    データは変化する。継続的な品質管理が必要 (Step 9
                                    のドリフトにつながる)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 id="_26">根拠となるソース</h3>
            <div className="source-box">
                <ul>
                    <li>
                        Machine Learning: Avoiding Garbage in, Garbage Out (AWS Executive in
                        Residence Blog):{' '}
                        <a
                            href="https://aws.amazon.com/blogs/enterprise-strategy/machine-learning-avoiding-garbage-in-garbage-out/"
                            rel="noopener"
                            target="_blank"
                        >
                            https://aws.amazon.com/blogs/enterprise-strategy/machine-learning-avoiding-garbage-in-garbage-out/
                        </a>
                    </li>
                    <li>
                        試験ガイド (データ品質が技術・概念一覧に含まれる):{' '}
                        <a
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html"
                            rel="noopener"
                            target="_blank"
                        >
                            https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
