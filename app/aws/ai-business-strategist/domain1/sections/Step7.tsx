import { Diagram } from '../Diagram';

export function Step7() {
    return (
        <section id="step-7-ai-skill-121">
            <h1 className="task-heading" id="task-12-ai">
                Task 1.2 適切な AI ソリューションタイプの選択
            </h1>
            <blockquote className="note-callout">
                <p>
                    Task 1.2: Identify and select appropriate AI solution types.<br />
                    ビジネス要件と制約に応じて、適切な AI ソリューションの種類を見極めて選べること。
                </p>
            </blockquote>
            <h2>Step 7: ルールベース自動化か AI か (Skill 1.2.1)</h2>
            <p>
                <strong>試験ガイドの該当スキル</strong>: ルールベース自動化を使う場面と、AI
                ソリューションを使う場面を判断できる。
            </p>
            <h3 id="_41">ひとことで言うと</h3>
            <div className="tldr-box">
                <p>
                    <strong>
                        ルールを全部書き出せて、例外が少ないならルールベース。ルールが書ききれない、または入力が多様で曖昧なら
                        AI
                    </strong>
                    です。「AI を使うこと」自体を目的にせず、<strong>いちばん単純で確実な手段</strong>から選びます。
                </p>
            </div>

            <h3 id="_42">詳しい解説</h3>
            <p>
                AWS の Prescriptive Guidance は、ソフトウェアエージェント (RPA
                や意思決定エンジンを含む)
                は何十年も前から存在したが、それらは<strong>単純で決定的</strong>であり、あらかじめ定めたルールと記号論理に従って、繰り返しの多い変動の少ない作業を実行するものだった、と説明しています。生成
                AI の登場で、大規模言語モデル (LLM)
                が複雑な入力の解釈、動的な応答の生成、知識の統合を行えるようになり、脆いハードコードされたロジックに頼らずに柔軟さを持たせられるようになりました。
            </p>
            <h4 id="vs-ai">比較表: ルールベース自動化 vs AI</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">観点</th>
                            <th scope="col">ルールベース自動化</th>
                            <th scope="col">AI (ML / 生成 AI)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>動作の原理</td>
                            <td>人が書いた「もし A ならば B」</td>
                            <td>データから学んだパターン (確率的)</td>
                        </tr>
                        <tr className="t-even">
                            <td>得意な入力</td>
                            <td>形式が決まっている、条件が明確</td>
                            <td>曖昧、多様、自由記述、画像、音声</td>
                        </tr>
                        <tr className="t-odd">
                            <td>結果の再現性</td>
                            <td>同じ入力なら常に同じ出力</td>
                            <td>出力が揺れることがある</td>
                        </tr>
                        <tr className="t-even">
                            <td>説明のしやすさ</td>
                            <td>高い (ルールを示せる)</td>
                            <td>低い場合がある (説明可能性の設計が必要)</td>
                        </tr>
                        <tr className="t-odd">
                            <td>変化への対応</td>
                            <td>ルールを人が更新する</td>
                            <td>再学習・プロンプト更新・RAG 更新</td>
                        </tr>
                        <tr className="t-even">
                            <td>導入・運用コスト</td>
                            <td>一般に低い</td>
                            <td>データ、評価、監視、ガバナンスの負担がある</td>
                        </tr>
                        <tr className="t-odd">
                            <td>誤りの性質</td>
                            <td>ルール漏れ (想定外は処理不能)</td>
                            <td>もっともらしい誤り、バイアス、ドリフト</td>
                        </tr>
                        <tr className="t-even">
                            <td>例</td>
                            <td>金額が閾値以上なら承認者を上位に切り替える</td>
                            <td>問い合わせ文から意図を理解して分類する、要約する</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4 id="_43">判断フロー</h4>
            <figure className="diagram-figure">
                <Diagram id="d7" label="図 8 ルールベース自動化と AI の判断フローを示す図" />
                <figcaption>図 8</figcaption>
            </figure>
            <h4 id="_44">具体例で判断してみる</h4>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">業務</th>
                            <th scope="col">選択</th>
                            <th scope="col">理由</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td>「購入金額が 10 万円を超えたら部長承認」を自動で回す</td>
                            <td>ルールベース</td>
                            <td>ルールが明確で例外が少ない</td>
                        </tr>
                        <tr className="t-even">
                            <td>毎月決まったフォーマットの CSV を別システムに転記する</td>
                            <td>ルールベース (RPA など)</td>
                            <td>形式が固定で判断が不要</td>
                        </tr>
                        <tr className="t-odd">
                            <td>自由記述の問い合わせを内容で仕分けし、返信案を作る</td>
                            <td>AI (生成 AI)</td>
                            <td>入力が多様で曖昧</td>
                        </tr>
                        <tr className="t-even">
                            <td>手書き混じりの請求書から金額と日付を抽出する</td>
                            <td>AI (ドキュメント抽出)</td>
                            <td>レイアウトが多様</td>
                        </tr>
                        <tr className="t-odd">
                            <td>解約しそうな顧客を早めに見つける</td>
                            <td>AI (従来型 ML)</td>
                            <td>多数の要因のパターンを学ぶ必要がある</td>
                        </tr>
                        <tr className="t-even">
                            <td>法令で「手順を一字一句変えてはならない」定型処理</td>
                            <td>ルールベース</td>
                            <td>再現性と説明可能性が最優先</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4 id="_45">ハイブリッドという選択肢</h4>
            <p>
                現実には<strong>組み合わせ</strong>が最も多いです。たとえば「AI が問い合わせを分類し
                (曖昧な入力の解釈)、その結果に応じてルールが担当部署へ自動振り分けし、金額条件で承認フローに乗せる
                (確実な処理)」という構成です。AI
                の得意な部分と、ルールの得意な部分を分担させると、コストとリスクが下がります。
            </p>
            <h3 id="_46">ベストプラクティス</h3>
            <div className="practice-box">
                <ol>
                    <li>
                        <strong>「ルールで書けるか」を最初に問う</strong>。書けるなら、まずルールで実現し、AI は例外処理や入力の解釈に限定する。
                    </li>
                    <li>
                        <strong>AI に置き換える前に、現行業務の例外パターンを数える</strong>。例外が多く、ルール保守が破綻しているなら AI の候補になる。
                    </li>
                    <li>
                        <strong>説明責任が重い業務は、ルールを優先するか、AI に人の承認を付ける</strong>。
                    </li>
                    <li>
                        <strong>コスト全体で比較する</strong>: AI
                        はモデル利用料だけでなく、データ整備、評価、監視、ガバナンスの費用が発生する。
                    </li>
                    <li>
                        <strong>ハイブリッドで段階導入する</strong>: まずルールで土台を作り、AI
                        を一部に足して効果を測る。
                    </li>
                </ol>
            </div>

            <h3 id="_47">よくある誤解と試験の狙い目</h3>
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
                                <td>「AI のほうが常に高度で優れている」</td>
                                <td>単純な定型業務ではルールのほうが安く確実</td>
                            </tr>
                            <tr className="t-even">
                                <td>「ルールベースは古いので廃止すべき」</td>
                                <td>再現性・説明性が必要な領域で今も最適</td>
                            </tr>
                            <tr className="t-odd">
                                <td>「AI を入れれば例外処理も自動で解決する」</td>
                                <td>AI も誤る。人のエスカレーション経路が必要</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    試験では、<strong>「ルールが明確で例外が少ない → ルールベース」「曖昧・多様・パターン認識が必要 → AI」</strong>という判断軸を選ばせるシナリオ問題が想定されます。
                </p>
            </div>

            <h3 id="_48">根拠となるソース</h3>
            <div className="source-box">
                <ul>
                    <li>
                        Operationalizing agentic AI on AWS (AWS Prescriptive
                        Guidance、RPA・決定的なルール実行と生成 AI の違い):{' '}
                        <a
                            href="https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/strategy-operationalizing-agentic-ai.pdf"
                            rel="noopener"
                            target="_blank"
                        >
                            https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/strategy-operationalizing-agentic-ai.pdf
                        </a>
                    </li>
                    <li>
                        Software agents to agentic AI (AWS Prescriptive Guidance):{' '}
                        <a
                            href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-foundations/new-generation.html"
                            rel="noopener"
                            target="_blank"
                        >
                            https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-foundations/new-generation.html
                        </a>
                    </li>
                    <li>
                        試験ガイド「Technologies and concepts」(ルールベース自動化を使う場面):{' '}
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
