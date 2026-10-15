export function Sec1() {
    return (
        <section className="section" id="s1">
            <div className="sec-head">
                <span className="eyebrow">Chapter 01</span>
                <h2>
                    <i className="ti ti-book"></i><span>この資料の使い方と試験の位置づけ</span>
                </h2>
            </div>
            <div className="prose">
                <h3 id="s1-1">1.1 試験の基本情報</h3>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">項目</th>
                                <th scope="col">内容</th>
                                <th scope="col">出典</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>試験名</td>
                                <td>AWS Certified AI Business Strategist (AIB-C01)</td>
                                <td>試験ガイド</td>
                            </tr>
                            <tr>
                                <td>想定受験者</td>
                                <td>
                                    AI
                                    を評価・推進・拡大する業務担当者。技術チームと協働するが、自分で
                                    AI を構築はしない
                                </td>
                                <td>試験ガイド</td>
                            </tr>
                            <tr>
                                <td>出題形式</td>
                                <td>
                                    択一(正解 1・誤答 3) / 複数選択(5 択以上から 2
                                    つ以上を全て選ぶ)
                                </td>
                                <td>試験ガイド</td>
                            </tr>
                            <tr>
                                <td>合格点</td>
                                <td>
                                    100〜1,000 のスケールドスコアで 700
                                    以上。補償型採点のためドメインごとの足切りはない
                                </td>
                                <td>試験ガイド</td>
                            </tr>
                            <tr>
                                <td>Domain 3 の配点</td>
                                <td>採点対象コンテンツの 24%</td>
                                <td>試験ガイド</td>
                            </tr>
                            <tr>
                                <td>試験時間</td>
                                <td>
                                    試験ガイドには 130 分、認定ページのベータ試験概要には
                                    170 分・85
                                    問と記載(<strong>記載が食い違うため、受験時は必ず最新の公式ページを確認</strong>)
                                </td>
                                <td>試験ガイド / 認定ページ</td>
                            </tr>
                            <tr>
                                <td>言語</td>
                                <td>英語・日本語(認定ページ)</td>
                                <td>認定ページ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout info">
                    <i className="ti ti-bulb c-icon"></i>
                    <p>
                        ポイント: この試験は「AWS
                        サービスの操作知識」ではなく「ビジネス判断力」を測ります。認定ページにも、AWS
                        サービスの知識を評価する試験ではないと明記されています。ただし試験ガイドの対象範囲には
                        Amazon Bedrock(Guardrails 等)、Amazon SageMaker AI、Amazon
                        Quick、AWS CAF、責任共有モデルなどが「戦略レベル」で含まれます。
                    </p>
                </div>
                <h3 id="s1-2">1.2 学習の進め方(ステップ)</h3>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">ステップ</th>
                                <th scope="col">やること</th>
                                <th scope="col">目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Step 1</td>
                                <td>
                                    第 2 章で Domain 3 の全体像(3 つの Task と 12
                                    のスキル)を頭に入れる
                                </td>
                                <td>15 分</td>
                            </tr>
                            <tr>
                                <td>Step 2</td>
                                <td>
                                    第 3〜5 章を Task
                                    ごとに読む。各スキルの「何が問われるか」→「なぜ重要か」→「ベストプラクティス」の順
                                </td>
                                <td>各 40〜60 分</td>
                            </tr>
                            <tr>
                                <td>Step 3</td>
                                <td>第 6 章で AWS サービスと役割を対応づける</td>
                                <td>20 分</td>
                            </tr>
                            <tr>
                                <td>Step 4</td>
                                <td>
                                    第 7・8 章で引っかけパターンを確認し、確認問題を解く
                                </td>
                                <td>30 分</td>
                            </tr>
                            <tr>
                                <td>Step 5</td>
                                <td>
                                    第 9 章の一次情報で、自分の言葉で説明できるか検証する
                                </td>
                                <td>随時</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}
