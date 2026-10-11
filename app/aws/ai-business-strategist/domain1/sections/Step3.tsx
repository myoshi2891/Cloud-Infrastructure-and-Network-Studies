import { Diagram } from '../Diagram';

export function Step3() {
    return (
        <section id="step-3-skill-113">
            <h2>Step 3: 構造化データと非構造化データ (Skill 1.1.3)</h2>
            <p>
                <strong>試験ガイドの該当スキル</strong>: 構造化データと非構造化データを区別し、AI
                にとってのデータ種別の関連性を説明できる。
            </p>
            <h3 id="_15">ひとことで言うと</h3>
            <div className="tldr-box">
                <p>
                    <strong>
                        構造化データは「表になっていて、項目の意味が決まっているデータ」、非構造化データは「決まった型がない文章・画像・音声など」
                    </strong>
                    です。AI が扱える範囲を大きく広げたのが、非構造化データを扱える技術
                    (ディープラーニング、生成 AI) です。
                </p>
            </div>

            <h3 id="_16">詳しい解説</h3>
            <p>
                AWS の説明では、構造化データは事前に定義されたスキーマ (項目名、データ型、制約)
                を持ち、行と列で表現される表形式が典型です。一方、非構造化データは決まったデータモデルを持たず、SNS
                の投稿のように、ソフトウェアが取り込み・分析するのが難しいデータです。また、構造化データは価格や注文数などの<strong>量的な情報</strong>は追えても、顧客の感情のような<strong>質的な文脈</strong>は捉えにくく、それは自由回答アンケートやレビュー文のような非構造化データに現れる、とも説明されています。
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">種類</th>
                            <th scope="col">特徴</th>
                            <th scope="col">具体例</th>
                            <th scope="col">AI での主な用途</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td><strong>構造化データ</strong></td>
                            <td>行と列、項目が定義済み</td>
                            <td>顧客マスタ、売上表、在庫テーブル、センサー数値</td>
                            <td>需要予測、不正検知、解約予測、レコメンド</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>半構造化データ</strong></td>
                            <td>完全な表ではないが、タグ等で構造を持つ</td>
                            <td>JSON、XML、ログ、メールのヘッダー</td>
                            <td>ログ分析、データ連携</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>非構造化データ</strong></td>
                            <td>決まった型がない</td>
                            <td>メール本文、契約書 PDF、通話録音、画像、動画、SNS 投稿</td>
                            <td>感情分析、文書要約、画像認識、音声書き起こし、生成 AI・RAG</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="note-callout">
                <p>
                    試験ガイドが明示しているのは「構造化」と「非構造化」の 2
                    種類です。半構造化は理解を助ける補足として載せています。
                </p>
            </blockquote>
            <h4 id="ai_1">なぜ AI にとって重要か</h4>
            <figure className="diagram-figure">
                <Diagram id="d3" label="図 4 構造化データと非構造化データの活用を示す図" />
                <figcaption>図 4</figcaption>
            </figure>
            <p>ビジネス上の含意は 3 点です。</p>
            <ol>
                <li>
                    <strong>企業データの多くは非構造化</strong>であり、生成 AI
                    が価値を生む余地が大きい (議事録、マニュアル、契約書、問い合わせ履歴など)。
                </li>
                <li>
                    ただし非構造化データは<strong>品質の評価や管理が難しい</strong>
                    (誰が最新版か、どれが正式版か、機密度はどうか)。
                </li>
                <li>
                    構造化データは<strong>すぐ使いやすい半面、質的な理由 (なぜ) が欠けがち</strong>。両方を組み合わせると洞察が深まる。
                </li>
            </ol>
            <h3 id="_17">ベストプラクティス</h3>
            <div className="practice-box">
                <ol>
                    <li>
                        <strong>データ棚卸しを最初にやる</strong>:
                        「どの部門に、どの種類のデータが、どんな形式・品質・機密度で存在するか」を一覧化する。
                    </li>
                    <li>
                        <strong>非構造化データにはメタデータと権限を付ける</strong>:
                        更新日、作成者、機密区分、正式版フラグ。後で RAG (Step 13)
                        の参照元にするときに効く。
                    </li>
                    <li>
                        <strong>用途とデータ種別を対応づける</strong>:
                        予測は構造化、要約や質問応答は非構造化、というように「課題 → データ種別 →
                        技術」で考える。
                    </li>
                    <li>
                        <strong>データのサイロ化を減らす</strong>:
                        部門ごとに分断されたデータは学習にも参照にも使いにくい (Domain 4
                        のデータ戦略にもつながる)。
                    </li>
                </ol>
            </div>

            <h3 id="_18">よくある誤解と試験の狙い目</h3>
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
                                <td>「AI は表データしか使えない」</td>
                                <td>ディープラーニングや生成 AI は非構造化データも扱える</td>
                            </tr>
                            <tr className="t-even">
                                <td>「非構造化データはそのまま AI に入れれば使える」</td>
                                <td>
                                    整理・品質確認・権限管理が必要。品質の評価は構造化より難しい
                                </td>
                            </tr>
                            <tr className="t-odd">
                                <td>「構造化データだけで顧客理解は十分」</td>
                                <td>質的な理由や感情は非構造化データに現れる</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 id="_19">根拠となるソース</h3>
            <div className="source-box">
                <ul>
                    <li>
                        What is Structured Data? (AWS):{' '}
                        <a
                            href="https://aws.amazon.com/what-is/structured-data/"
                            rel="noopener"
                            target="_blank"
                        >
                            https://aws.amazon.com/what-is/structured-data/
                        </a>
                    </li>
                    <li>
                        AWS CAF for AI, ML, and Generative AI
                        (ディープラーニングは非構造化データが得意):{' '}
                        <a
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            rel="noopener"
                            target="_blank"
                        >
                            https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
