import { Diagram } from '../Diagram';

export function Step2() {
    return (
        <section id="step-2-aiml-ai-skill-112">
            <h2>Step 2: AI・ML・生成 AI の違い (Skill 1.1.2)</h2>
            <p>
                <strong>試験ガイドの該当スキル</strong>: AI、機械学習 (ML)、生成 AI (GenAI)
                を区別できる。
            </p>
            <h3 id="_8">ひとことで言うと</h3>
            <div className="tldr-box">
                <p>
                    <strong>AI ⊃ ML ⊃ ディープラーニング ⊃ 生成 AI</strong>
                    という入れ子の関係です。広い順に、AI (知的な作業をする機械の総称)、ML
                    (データから学ぶ手法)、ディープラーニング
                    (多層のニューラルネットワークで学ぶ手法)、生成 AI (新しいコンテンツを作る AI)
                    です。
                </p>
            </div>

            <h3 id="_9">詳しい解説</h3>
            <p>
                AWS の CAF-AI は、AI
                を「人間の知能を要するタスクを実行できる機械を作る、または模倣する広い分野」、ML
                を「ルールを明示的にプログラムするのではなく、例から一般化して学ぶ AI
                の一分野」、ディープラーニングを「多層のニューラルネットワークを使い、画像・音声・テキストのような非構造化データが得意な
                ML の一手法」、生成 AI
                を「新しい、場合によっては独創的なコンテンツを生み出すディープラーニング内の新しい領域」と説明しています。
            </p>
            <figure className="diagram-figure">
                <Diagram id="d2" label="図 3 AI・ML・ディープラーニング・生成 AI の関係を示す図" />
                <figcaption>図 3</figcaption>
            </figure>
            <blockquote className="note-callout">
                <p>
                    「ルールベースのシステムも広義には AI
                    に含まれる」と整理する解説もあります。ただし AWS の CAF-AI の図は
                    AI・ML・ディープラーニング・生成 AI の 4 層を示しており、試験では<strong>この 4 層の入れ子関係</strong>を押さえれば十分です。
                </p>
            </blockquote>
            <h4 id="_10">比較表: 何ができるか、何が得意か</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">観点</th>
                            <th scope="col">従来型 ML (予測・分類)</th>
                            <th scope="col">生成 AI (GenAI)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>主な出力</td>
                            <td>数値、ラベル、スコア (例: 解約確率 82%)</td>
                            <td>文章、画像、コード、音声など新しいコンテンツ</td>
                        </tr>
                        <tr className="t-even">
                            <td>得意な問い</td>
                            <td>「どうなるか」「どれか」</td>
                            <td>「作って」「要約して」「書き換えて」</td>
                        </tr>
                        <tr className="t-odd">
                            <td>入力データ</td>
                            <td>主に構造化データ (表) が中心</td>
                            <td>テキスト・画像など非構造化データが中心</td>
                        </tr>
                        <tr className="t-even">
                            <td>学習の規模</td>
                            <td>用途ごとに専用モデルを作ることが多い</td>
                            <td>
                                大規模データで事前学習された<strong>基盤モデル (FM)</strong>
                                を多用途に転用
                            </td>
                        </tr>
                        <tr className="t-odd">
                            <td>ビジネス例</td>
                            <td>需要予測、不正検知、レコメンド、解約予測</td>
                            <td>問い合わせ返信案、議事録要約、資料作成、コード補助</td>
                        </tr>
                        <tr className="t-even">
                            <td>主なリスク</td>
                            <td>精度劣化 (ドリフト)、バイアス</td>
                            <td>ハルシネーション (もっともらしい誤り)、機密漏えい、著作権</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>基盤モデル (Foundation Model, FM)</strong>
                とは、非常に大規模なデータで事前に学習された大規模モデルのことです。AWS は、生成 AI
                は他の AI と同じく ML
                モデルで動くが、そのモデルが極めて大規模で大量データで事前学習されており、FM
                と呼ばれると説明しています。
            </p>
            <h4 id="_11">業務例で「どれに当たるか」を仕分ける</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">業務シーン</th>
                            <th scope="col">分類</th>
                            <th scope="col">理由</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>来月の店舗別売上を予測する</td>
                            <td>従来型 ML</td>
                            <td>数値を予測する</td>
                        </tr>
                        <tr className="t-even">
                            <td>取引がクレジットカード不正かを判定する</td>
                            <td>従来型 ML</td>
                            <td>「不正/正常」を分類する</td>
                        </tr>
                        <tr className="t-odd">
                            <td>顧客への返信メールの下書きを作る</td>
                            <td>生成 AI</td>
                            <td>新しい文章を作る</td>
                        </tr>
                        <tr className="t-even">
                            <td>領収書画像から金額や日付を抜き出す</td>
                            <td>ML (ディープラーニング系のドキュメント抽出)</td>
                            <td>画像から情報を認識・抽出する</td>
                        </tr>
                        <tr className="t-odd">
                            <td>「1 万円以上は上長承認」というルールで承認ルートを切り替える</td>
                            <td>AI ではなくルールベース自動化</td>
                            <td>学習も推論もなく、固定ルール (Step 7)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="_12">ベストプラクティス</h3>
            <div className="practice-box">
                <ol>
                    <li>
                        <strong>まず「ビジネスの問いの種類」で技術を選ぶ</strong>:
                        予測・分類なら従来型 ML、コンテンツ作成なら生成 AI。流行で生成 AI
                        から入らない。
                    </li>
                    <li>
                        <strong>生成 AI 導入時は「誤りの許容度」を先に決める</strong>:
                        契約書や医療情報など誤りの影響が大きい領域は、人の確認 (human-in-the-loop)
                        や根拠提示 (RAG、Step 13) を前提にする。
                    </li>
                    <li>
                        <strong>役員・現場向けに 1 枚の共通図を用意する</strong>:
                        上の入れ子図を社内資料の冒頭に置くだけで、議論の前提が揃う。
                    </li>
                </ol>
            </div>

            <h3 id="_13">よくある誤解と試験の狙い目</h3>
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
                                <td>「生成 AI と AI は同じ」</td>
                                <td>生成 AI は AI の一部 (サブセット)</td>
                            </tr>
                            <tr className="t-even">
                                <td>「生成 AI が従来型 ML を置き換える」</td>
                                <td>目的が違う。予測・分類は従来型 ML が今も適する</td>
                            </tr>
                            <tr className="t-odd">
                                <td>「ML はルールを人が書く」</td>
                                <td>
                                    ML はデータから規則性を学ぶ。ルールを人が書くのはルールベース
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 id="_14">根拠となるソース</h3>
            <div className="source-box">
                <ul>
                    <li>
                        AWS CAF for AI, ML, and Generative AI (AI・ML・ディープラーニング・生成 AI
                        の分類図と説明):{' '}
                        <a
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            rel="noopener"
                            target="_blank"
                        >
                            https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html
                        </a>
                    </li>
                    <li>
                        What is Generative AI? (AWS):{' '}
                        <a
                            href="https://aws.amazon.com/what-is/generative-ai/"
                            rel="noopener"
                            target="_blank"
                        >
                            https://aws.amazon.com/what-is/generative-ai/
                        </a>
                    </li>
                    <li>
                        試験ガイド「Technologies and concepts that might appear on the exam」:{' '}
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
