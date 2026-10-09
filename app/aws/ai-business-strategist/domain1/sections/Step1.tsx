import { Diagram } from '../Diagram';

export function Step1() {
    return (
        <section id="step-1-ai-skill-111">
            <h1 className="task-heading" id="task-11">Task 1.1 コア概念と用語</h1>
            <blockquote className="note-callout">
                <p>
                    Task 1.1: Describe core AI concepts and define terminology.<br />
                    AI の中核概念を説明し、用語を定義できること。
                </p>
            </blockquote>
            <h2>Step 1: AI の基本概念 (Skill 1.1.1)</h2>
            <p>
                <strong>試験ガイドの該当スキル</strong>: ビジネスの文脈で、AI の基本概念
                (アルゴリズム、モデル、学習、推論、予測など) を認識し説明できる。
            </p>
            <h3 id="_1">ひとことで言うと</h3>
            <div className="tldr-box">
                <p>
                    <strong>
                        AI
                        は「データから規則性を学び、新しいデータに対して予測や判断や生成を返す仕組み」
                    </strong>
                    です。学ぶ段階が「学習 (training)」、使う段階が「推論 (inference)」です。
                </p>
            </div>

            <h3 id="_2">詳しい解説</h3>
            <h4 id="_3">用語をレストランにたとえる</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">用語</th>
                            <th scope="col">意味</th>
                            <th scope="col">レストランのたとえ</th>
                            <th scope="col">ビジネスでの例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td><strong>データ</strong></td>
                            <td>学習や推論の材料</td>
                            <td>食材</td>
                            <td>過去 3 年分の注文履歴</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>アルゴリズム</strong></td>
                            <td>データからパターンを見つける手順・方法</td>
                            <td>レシピ (調理法)</td>
                            <td>「近い顧客を探して似た購買を推薦する」という計算方法</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>学習 (training)</strong></td>
                            <td>アルゴリズムにデータを読ませて、パターンを覚えさせる工程</td>
                            <td>修業期間</td>
                            <td>過去の注文履歴で需要予測を学ばせる</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>モデル</strong></td>
                            <td>学習の結果できあがった「パターンの塊」</td>
                            <td>修業を終えたシェフ</td>
                            <td>「需要予測モデル」</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>推論 (inference)</strong></td>
                            <td>学習済みモデルに新しい入力を与えて結果を得ること</td>
                            <td>実際に料理を作って出す</td>
                            <td>来月の商品別需要を予測する</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>予測 (prediction)</strong></td>
                            <td>推論で得られる出力</td>
                            <td>出てきた料理</td>
                            <td>「来月は 1,200 個売れる見込み」</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="note-callout">
                <p>
                    <strong>ポイント</strong>:
                    学習は「一度に大量の計算資源を使う準備の工程」、推論は「日々の利用で繰り返し発生する工程」です。ビジネスでは、コストの出方が両者で異なる点を意識します
                    (例: 学習は初期投資、推論は利用量に比例)。
                </p>
            </blockquote>
            <h4 id="_4">学習から予測までの流れ</h4>
            <figure className="diagram-figure">
                <Diagram id="d1" label="図 2 学習から予測までの流れを示す図" />
                <figcaption>図 2</figcaption>
            </figure>
            <h4 id="ai">AI の出力は「確率的」である</h4>
            <p>
                AWS の CAF-AI (AI・ML・生成 AI 向けクラウド導入フレームワーク) は、多くの AI
                システムに共通する特徴として、<strong>確からしさの高い予測や判断 (確率的な結果) を出すこと</strong>を挙げています。ここがビジネス上とても重要です。
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">従来のソフトウェア</th>
                            <th scope="col">AI</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>同じ入力なら同じ出力 (決定的)</td>
                            <td>同じ入力でも出力が揺れることがある (確率的)</td>
                        </tr>
                        <tr className="t-even">
                            <td>仕様どおりなら「正しい」</td>
                            <td>「どれくらい当たるか」を精度で評価する</td>
                        </tr>
                        <tr className="t-odd">
                            <td>バグは修正すれば消える</td>
                            <td>誤りをゼロにはできず、許容範囲と対処を設計する</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="_5">ベストプラクティス</h3>
            <div className="practice-box">
                <ol>
                    <li>
                        <strong>「精度 100%」を前提に設計しない</strong>。誤りが起きたときの業務フロー (人による確認、差し戻し)
                        を最初から組み込む。
                    </li>
                    <li>
                        <strong>学習 (作る) と推論 (使う) を分けてコストを見積もる</strong>。ビジネスケースでは両方を別項目にする。
                    </li>
                    <li>
                        <strong>専門用語は「たとえ」ではなく定義で共有する</strong>。組織内で語彙がズレると、要件・契約・ガバナンスの議論が噛み合わない (Step
                        6 の標準語彙につながる)。
                    </li>
                    <li><strong>AI に向く課題か最初に判定する</strong> (Step 7)。</li>
                </ol>
            </div>

            <h3 id="_6">よくある誤解と試験の狙い目</h3>
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
                                <td>「モデル = アルゴリズム」</td>
                                <td>アルゴリズムは学び方、モデルは学んだ結果</td>
                            </tr>
                            <tr className="t-even">
                                <td>「推論 = 学習の続き」</td>
                                <td>
                                    推論は学習済みモデルを使うこと。推論中にモデルが自動で賢くなるわけではない
                                </td>
                            </tr>
                            <tr className="t-odd">
                                <td>「AI は正解を返す」</td>
                                <td>AI は確率的な予測を返す。誤りは起きる</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 id="_7">根拠となるソース</h3>
            <div className="source-box">
                <ul>
                    <li>
                        AWS CAF for AI, ML, and Generative AI (AI の定義と確率的な成果):{' '}
                        <a
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            rel="noopener"
                            target="_blank"
                        >
                            https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html
                        </a>
                    </li>
                    <li>
                        AWS Executive in Residence Blog &quot;Machine Learning: Avoiding Garbage in,
                        Garbage Out&quot; (学習と入出力の考え方):{' '}
                        <a
                            href="https://aws.amazon.com/blogs/enterprise-strategy/machine-learning-avoiding-garbage-in-garbage-out/"
                            rel="noopener"
                            target="_blank"
                        >
                            https://aws.amazon.com/blogs/enterprise-strategy/machine-learning-avoiding-garbage-in-garbage-out/
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
