import { Diagram } from '../Diagram';

export function Sec0() {
    return (
        <section id="0-domain-1">
            <h2>0. 先に知っておくこと: 試験の全体像と Domain 1 の位置づけ</h2>
            <h3 id="01">0.1 この試験は「何を測る」のか</h3>
            <p>
                試験ガイドによると、AIB-C01 は AI の能力をビジネス成果に翻訳し、責任ある AI
                を確立し、AI
                導入を大規模に推進する力を検証する試験です。強調されているのは<strong>技術的な実装よりも戦略的な意思決定</strong>です。
            </p>
            <p>
                つまり Domain 1 で問われるのは「モデルをどう作るか」ではなく、次のような<strong>ビジネス上の判断に必要な AI リテラシー</strong>です。
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">問われること</th>
                            <th scope="col">問われないこと (試験ガイドで対象外)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>「AI と ML と生成 AI は何が違うか」を説明する</td>
                            <td>AI/ML モデルやアルゴリズムのコーディング</td>
                        </tr>
                        <tr className="t-even">
                            <td>「この業務はルールで足りるか、AI が必要か」を判断する</td>
                            <td>ハイパーパラメータ調整やモデル最適化</td>
                        </tr>
                        <tr className="t-odd">
                            <td>「RAG とファインチューニングのどちらが向くか」を選ぶ</td>
                            <td>AI/ML パイプラインやインフラの構築・デプロイ</td>
                        </tr>
                        <tr className="t-even">
                            <td>「シャドー AI をどう管理するか」を設計する</td>
                            <td>数学的・統計的なモデル分析</td>
                        </tr>
                        <tr className="t-odd">
                            <td>「モデルの劣化に気づく仕組み」を求める</td>
                            <td>
                                本番 AI システムの技術運用 (インフラ監視、パイプラインのデバッグ等)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="02">0.2 試験の基本情報</h3>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">項目</th>
                            <th scope="col">内容</th>
                            <th scope="col">出典</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>対象者</td>
                            <td>
                                AI 施策を評価・推進・拡大するビジネス専門職。コーディングや AWS
                                実装経験は不要
                            </td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr className="t-even">
                            <td>推奨経験</td>
                            <td>
                                AI を導入するチームと、または AI 導入チームの傍らで働いた約 6
                                か月の経験
                            </td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr className="t-odd">
                            <td>出題形式</td>
                            <td>
                                択一 (正解 1・不正解 3) と複数選択 (5 択以上から 2
                                つ以上を選ぶ)。未回答は不正解、推測回答のペナルティなし
                            </td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr className="t-even">
                            <td>合否</td>
                            <td>
                                合否判定。スコアは 100 から 1,000 の換算スコアで、合格は 700 以上
                            </td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr className="t-odd">
                            <td>採点方式</td>
                            <td>補償型 (ドメインごとの合格点はなく、試験全体で合格すればよい)</td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr className="t-even">
                            <td>Domain 1 の配点</td>
                            <td><strong>24%</strong></td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr className="t-odd">
                            <td>提供言語</td>
                            <td>英語、日本語</td>
                            <td>認定ページ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="note-callout">
                <p>
                    <strong>注意 (情報の食い違い)</strong>: 試験時間について、試験ガイドのページは
                    <strong>130 分</strong>、認定ページのベータ試験概要は
                    <strong>170 分・85 問</strong> と記載しています
                    (確認日時点)。ベータ期間の値と標準版の値が異なる可能性があるため、<strong>申し込み画面と公式ページの最新表記を必ず確認してください</strong>。ベータ試験の料金は認定ページ上で
                    50 USD (標準版は 100 USD) と案内されています。
                </p>
            </blockquote>
            <h3 id="03-4">0.3 4 つのドメインと配点</h3>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">ドメイン</th>
                            <th scope="col">配点</th>
                            <th scope="col">本ガイドの扱い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td><strong>Domain 1: AI Fundamentals and Literacy</strong></td>
                            <td><strong>24%</strong></td>
                            <td><strong>本ガイドで詳解</strong></td>
                        </tr>
                        <tr className="t-even">
                            <td>Domain 2: AI Strategy and Business Value Creation</td>
                            <td>28%</td>
                            <td>対象外 (別ガイド)</td>
                        </tr>
                        <tr className="t-odd">
                            <td>Domain 3: AI Governance and Responsible AI Leadership</td>
                            <td>24%</td>
                            <td>対象外 (別ガイド)</td>
                        </tr>
                        <tr className="t-even">
                            <td>Domain 4: Business Readiness, Leadership, and AI Transformation</td>
                            <td>24%</td>
                            <td>対象外 (別ガイド)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                Domain 1 は他の 3 ドメインの「共通言語」にあたります。ここでの用語や判断軸
                (データ品質、ドリフト、シャドー AI、RAG など)
                が、戦略・ガバナンス・組織変革の問題文にも頻繁に登場します。
            </p>
            <h3 id="04-domain-1">0.4 Domain 1 の構造</h3>
            <p>Domain 1 は 3 つのタスクと 13 のスキルで構成されています。</p>
            <figure className="diagram-figure">
                <Diagram id="d0" label="図 1 Domain 1 の構造を示す図" />
                <figcaption>図 1</figcaption>
            </figure>
            <h3 id="05-3">0.5 学習の進め方 (推奨 3 パス)</h3>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">パス</th>
                            <th scope="col">やること</th>
                            <th scope="col">目安</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>1 周目</td>
                            <td>
                                Step 1 から Step 13 を順に読み、各 Step
                                冒頭の「ひとことで言うと」だけ把握する
                            </td>
                            <td>1 から 2 時間</td>
                        </tr>
                        <tr className="t-even">
                            <td>2 周目</td>
                            <td>
                                表と Mermaid 図を自分の言葉で説明できるか確認する。特に
                                <strong>比較表 (Step 2, 7, 13)</strong> と
                                <strong>判断フロー (Step 7, 13)</strong>
                            </td>
                            <td>3 から 4 時間</td>
                        </tr>
                        <tr className="t-odd">
                            <td>3 周目</td>
                            <td>
                                付録 B (間違えやすいポイント) と付録 C (15 問)
                                で弱点を洗い出し、該当 Step に戻る
                            </td>
                            <td>2 時間</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="06-step">0.6 各 Step の読み方</h3>
            <p>各 Step は次の順で構成されています。</p>
            <ol>
                <li><strong>試験ガイドの該当スキル</strong> (原文の趣旨)</li>
                <li><strong>ひとことで言うと</strong> (30 秒で把握)</li>
                <li><strong>詳しい解説</strong> (初学者向け、たとえ話つき)</li>
                <li><strong>ベストプラクティス</strong> (ビジネス判断としての「やるべきこと」)</li>
                <li><strong>よくある誤解と試験の狙い目</strong></li>
                <li><strong>根拠となるソース</strong></li>
            </ol>
        </section>
    );
}
