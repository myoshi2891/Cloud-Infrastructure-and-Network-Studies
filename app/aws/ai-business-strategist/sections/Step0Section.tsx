import { Diagram } from '../Diagram';

export const Step0Section = () => {
    return (
        <>
            <h2 id="s4">Step 0 試験の全体像と学習ロードマップ</h2>
            <h3 id="s5">0-1 この試験は何を測るのか</h3>
            <p>
                <strong>試験ガイド記載</strong>: この試験は、AI
                の能力を事業成果に結びつける力、責任ある AI の実践を確立する力、AI
                ソリューション最適化の機会を評価する力、AI
                導入を全社規模へ推進する力を検証します。<strong>技術的な実装よりも戦略的な意思決定を優先</strong>する試験です。
            </p>
            <p>つまり、次のような「ビジネス判断」の問いが中心になります。</p>
            <ul>
                <li>どの AI 投資を進め、どれを止めるか</li>
                <li>投資をどう説明して予算を獲得するか</li>
                <li>リスクをどう管理して安心して使える状態にするか</li>
                <li>試験導入(パイロット)をどう全社に広げるか</li>
            </ul>
            <p>
                <strong>AWS サービスの操作方法や設定手順は問われません</strong
                >(後述の対象外リスト参照)。ただし、Amazon Bedrock・Amazon SageMaker AI・Amazon Quick
                などは「戦略レベルの知識」として範囲に含まれます。
            </p>
            <h3 id="s6">0-2 試験概要(2026-09-28 時点)</h3>
            <div className="tbl">
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
                            <td>試験名 / コード</td>
                            <td>AWS Certified AI Business Strategist / AIB-C01</td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr>
                            <td>カテゴリ</td>
                            <td>Business</td>
                            <td>認定ページ</td>
                        </tr>
                        <tr>
                            <td>形式</td>
                            <td>択一(multiple choice)と複数選択(multiple response)</td>
                            <td>認定ページ・試験ガイド</td>
                        </tr>
                        <tr>
                            <td>問題数</td>
                            <td>85 問(beta exam)</td>
                            <td>認定ページ</td>
                        </tr>
                        <tr>
                            <td>試験時間</td>
                            <td>170 分(beta exam の表記)。試験ガイドには 130 分の記載もある</td>
                            <td>認定ページ / 試験ガイド</td>
                        </tr>
                        <tr>
                            <td>受験料</td>
                            <td>50 USD(beta 価格)。標準価格は 100 USD</td>
                            <td>認定ページ</td>
                        </tr>
                        <tr>
                            <td>受験方法</td>
                            <td>Pearson テストセンター、またはオンライン監督付き試験</td>
                            <td>認定ページ</td>
                        </tr>
                        <tr>
                            <td>言語</td>
                            <td>英語、日本語</td>
                            <td>認定ページ</td>
                        </tr>
                        <tr>
                            <td>想定受験者</td>
                            <td>
                                AI の成果創出を担う、または担いたい専門職。<strong
                                    >コーディング・AWS 実装経験は不要</strong
                                >
                            </td>
                            <td>認定ページ</td>
                        </tr>
                        <tr>
                            <td>推奨経験</td>
                            <td>AI に取り組むチームと協働した実務経験 約 6 か月</td>
                            <td>認定ページ・試験ガイド</td>
                        </tr>
                        <tr>
                            <td>合格基準</td>
                            <td>スケールスコア 100〜1,000 のうち 700 以上で合格</td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr>
                            <td>採点方式</td>
                            <td>
                                補償型(compensatory):
                                各ドメインで合格点を取る必要はなく、試験全体で合格すればよい
                            </td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr>
                            <td>誤答の扱い</td>
                            <td>未回答は不正解扱い。推測回答にペナルティなし</td>
                            <td>試験ガイド</td>
                        </tr>
                        <tr>
                            <td>特典</td>
                            <td>
                                2027-02-15 までに取得すると Early Adopter デジタルバッジを追加取得
                            </td>
                            <td>認定ページ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout note">
                <p>
                    <strong>時間の食い違いについて</strong>: 認定ページの beta exam 概要は 170
                    分、試験ガイドは 130 分と記載しています。beta
                    版と標準版の違いによる可能性がありますが、取得したページからは断定できません。受験予約画面の表示を最終確認してください。
                </p>
            </blockquote>
            <p>
                <strong>補足解説(時間配分の目安)</strong>: beta の 85 問 / 170 分なら、1
                問あたり平均 2
                分です。標準版の問題数は取得したページに記載がないため、標準版での目安は算出していません。
            </p>
            <h3 id="s7">0-3 問題形式のルール</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">形式</th>
                            <th scope="col">特徴</th>
                            <th scope="col">解き方のコツ(補足解説)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>択一(multiple choice)</td>
                            <td>正解 1 つ、誤答(distractor)3 つ</td>
                            <td>
                                「最初に取るべき行動」「最も適切」など、順序や優先度を問う文言に注意
                            </td>
                        </tr>
                        <tr>
                            <td>複数選択(multiple response)</td>
                            <td>
                                5 つ以上の選択肢から正解が 2 つ以上。<strong
                                    >すべて選んで初めて得点</strong
                                >
                            </td>
                            <td>選ぶ個数が問題文に書かれているか確認。部分点はない</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s8">0-4 ドメイン配点</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">ドメイン</th>
                            <th scope="col">名称</th>
                            <th scope="col">配点</th>
                            <th scope="col">含まれるタスク</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Domain 1</td>
                            <td>AI Fundamentals and Literacy(AI の基礎とリテラシー)</td>
                            <td>24%</td>
                            <td>1.1 / 1.2 / 1.3</td>
                        </tr>
                        <tr>
                            <td>Domain 2</td>
                            <td>AI Strategy and Business Value Creation(AI 戦略と価値創出)</td>
                            <td><strong>28%</strong></td>
                            <td>2.1 / 2.2 / 2.3</td>
                        </tr>
                        <tr>
                            <td>Domain 3</td>
                            <td>
                                AI Governance and Responsible AI Leadership(ガバナンスと責任ある AI)
                            </td>
                            <td>24%</td>
                            <td>3.1 / 3.2 / 3.3</td>
                        </tr>
                        <tr>
                            <td>Domain 4</td>
                            <td>
                                Business Readiness, Leadership, and AI
                                Transformation(準備度・リーダーシップ・変革)
                            </td>
                            <td>24%</td>
                            <td>4.1 / 4.2 / 4.3 / 4.4</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>補足解説</strong>: 配点が最も高いのは Domain 2 ですが、差は 4
                ポイントだけです。<strong>4 ドメインをバランスよく学ぶ</strong
                >のが合格への近道です。補償型採点なので、得意ドメインで不得意ドメインを補えます。
            </p>
            <h3 id="s9">0-5 試験の対象外となる業務(試験ガイド記載)</h3>
            <p>
                次の業務は「対象受験者が行うことを期待されない」とされています。学習の優先度を下げてかまいません。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">対象外の業務(要約)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI・ML モデルやアルゴリズムの開発・コーディング</td>
                        </tr>
                        <tr>
                            <td>データエンジニアリング、特徴量エンジニアリングの実装</td>
                        </tr>
                        <tr>
                            <td>ハイパーパラメータ調整、モデル最適化</td>
                        </tr>
                        <tr>
                            <td>AI・ML パイプラインやインフラの構築・デプロイ</td>
                        </tr>
                        <tr>
                            <td>AI・ML モデルの数学的・統計的分析</td>
                        </tr>
                        <tr>
                            <td>AI・ML システムのセキュリティ、コンプライアンス対策の実装</td>
                        </tr>
                        <tr>
                            <td>AWS サービスやクラウドインフラの設定・デプロイ・運用</td>
                        </tr>
                        <tr>
                            <td>
                                AI
                                ソリューション向けの特定アルゴリズム、フレームワーク、技術アーキテクチャの選定・調整
                            </td>
                        </tr>
                        <tr>
                            <td>
                                データの前処理・クレンジング・ラベリング・アノテーションの実作業
                            </td>
                        </tr>
                        <tr>
                            <td>
                                本番 AI
                                システムの技術運用(インフラ監視、パイプラインのデバッグ、モデル性能のトラブルシュートなど)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s10">0-6 AI Practitioner との違い</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点</th>
                            <th scope="col">AI Business Strategist</th>
                            <th scope="col">AI Practitioner</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>検証する力</td>
                            <td>
                                AI
                                投資判断、事業ケース作成、ガバナンス適用、パイロットから本番への推進といった<strong
                                    >ビジネス判断力</strong
                                >
                            </td>
                            <td>
                                AI・ML・生成 AI の<strong>基礎知識</strong>と AWS の AI
                                サービスの知識
                            </td>
                        </tr>
                        <tr>
                            <td>AWS サービス知識</td>
                            <td>評価対象ではない(戦略レベルの認識のみ)</td>
                            <td>評価対象</td>
                        </tr>
                        <tr>
                            <td>向いている人</td>
                            <td>企画・営業・事業推進・コンサル</td>
                            <td>AI 技術の基礎を体系的に押さえたい人</td>
                        </tr>
                        <tr>
                            <td>両方取得</td>
                            <td>可能(技術知識と戦略判断の両方を示せる)</td>
                            <td>可能</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s11">0-7 学習ロードマップ</h3>
            <Diagram id="dgm-0" />
            <p><strong>推奨の学習手順(公式の Exam Prep Plan に沿った流れ)</strong>:</p>
            <ol>
                <li>
                    <strong>試験を知る</strong>: AWS Skill Builder の Exam Prep Plan
                    と試験ガイドを確認し、公式の練習問題セット(Official Practice Question
                    Set)で出題スタイルに慣れる
                </li>
                <li>
                    <strong>知識のすき間を埋める</strong>:
                    不足している領域のデジタルコースを受講する
                </li>
                <li>
                    <strong>復習と演習</strong>:
                    ドメインごとに範囲を見直し、模擬問題で理解の穴を見つける。Meeting Simulator
                    で演習する
                </li>
                <li>
                    <strong>準備度を測る</strong>: 公式の練習試験(Official Practice
                    Exam)を受ける。ただし <strong>beta 期間中は提供されない</strong>
                </li>
            </ol>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">認定ページ</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/certification/certified-ai-business-strategist/"
                            >https://aws.amazon.com/certification/certified-ai-business-strategist/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">試験ガイド</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Exam Prep Plan(Skill Builder)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://skillbuilder.aws/category/exam-prep/ai-business-strategist-business-AIB-C01"
                            >https://skillbuilder.aws/category/exam-prep/ai-business-strategist-business-AIB-C01</a
                        >
                    </li>
                    <li>
                        <span className="src-label">beta exam の方針</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/certification/policies/before-testing/"
                            >https://aws.amazon.com/certification/policies/before-testing/</a
                        >
                    </li>
                </ul>
            </div>

        </>
    );
};
