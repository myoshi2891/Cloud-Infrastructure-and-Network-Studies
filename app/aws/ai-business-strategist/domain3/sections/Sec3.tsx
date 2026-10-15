import { Diagram } from '../Diagram';

export function Sec3() {
    return (
        <section className="section" id="s3">
            <div className="sec-head">
                <span className="eyebrow">Chapter 03</span>
                <h2>
                    <i className="ti ti-scale"></i><span>Task 3.1 責任ある AI 原則をビジネス判断に適用する</span>
                </h2>
            </div>
            <div className="prose">
                <h3 id="s3-1">
                    3.1 【Skill 3.1.1】責任ある AI の原則(次元)をビジネスシナリオに適用する
                </h3>
                <h4>Step 1: AWS が示す「責任ある AI」の次元を知る</h4>
                <p>
                    AWS は責任ある AI を複数の「次元」で整理しています。AWS の Generative AI
                    Lens は、下表の 8 つ(Governance(ガバナンス)と
                    Transparency(透明性)を含む)を責任ある AI
                    の次元として示しています。一方、Responsible AI Lens(2025 年 11
                    月公開)の「8」は次元ではなく、ユースケース定義から運用までの<strong>ライフサイクルに沿った 8 つの重点領域(focus areas)</strong>です。同じ「8」でも数えている対象が異なる点に注意してください。
                </p>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">次元</th>
                                <th scope="col">意味(やさしく)</th>
                                <th scope="col">問いかけの例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Fairness(公平性)</td>
                                <td>関係するさまざまなグループへの影響を考える</td>
                                <td>特定の属性の人に不利な結果が出ていないか</td>
                            </tr>
                            <tr>
                                <td>Explainability(説明可能性)</td>
                                <td>出力や判断の理由を理解・評価できる</td>
                                <td>「なぜその結論？」に答えられるか</td>
                            </tr>
                            <tr>
                                <td>Privacy and Security(プライバシーとセキュリティ)</td>
                                <td>データとモデルを適切に取得・利用・保護する</td>
                                <td>個人情報を必要以上に使っていないか。漏れないか</td>
                            </tr>
                            <tr>
                                <td>Safety(安全性)</td>
                                <td>有害な出力や悪用を減らす</td>
                                <td>有害な回答や不適切な使われ方を防げるか</td>
                            </tr>
                            <tr>
                                <td>Controllability(制御可能性)</td>
                                <td>AI の挙動を監視し、方向づけ・修正できる</td>
                                <td>問題が出たら止めたり直したりできるか</td>
                            </tr>
                            <tr>
                                <td>Veracity and Robustness(正確性と堅牢性)</td>
                                <td>想定外・悪意ある入力でも正しい出力を保つ</td>
                                <td>事実に基づいているか。変な入力に強いか</td>
                            </tr>
                            <tr>
                                <td>Governance(ガバナンス)</td>
                                <td>
                                    AI
                                    のサプライチェーン(提供者・利用者)を含めベストプラクティスを組み込む
                                </td>
                                <td>責任者とルールは明確か</td>
                            </tr>
                            <tr>
                                <td>Transparency(透明性)</td>
                                <td>利害関係者が AI との関わり方を判断できる</td>
                                <td>AI であることや限界を開示しているか</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout warn">
                    <i className="ti ti-alert-triangle c-icon"></i>
                    <p>
                        注意: 試験ガイド上の例示は「fairness, explainability, privacy,
                        safety, transparency, robustness」です。資料により次元の数え方(6 つ
                        / 8 つ / 10 つ)が異なるため、<strong>個々の名称を暗記するより「懸念事項 → どの次元 →
                        どの対策」と対応づける練習</strong>が有効です。
                    </p>
                </div>
                <h4>Step 2: 次元と具体的な統制(AWS での例)を対応づける</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">次元</th>
                                <th scope="col">代表的な対策の考え方</th>
                                <th scope="col">AWS での例(戦略レベル)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Fairness</td>
                                <td>出力・データを属性別に評価し偏りを測る</td>
                                <td>
                                    Amazon Bedrock Evaluations、SHAP / バイアス指標の計測
                                </td>
                            </tr>
                            <tr>
                                <td>Explainability</td>
                                <td>回答の根拠(出典)を示す、モデルの用途・限界を文書化</td>
                                <td>Knowledge Bases の引用、Model Cards</td>
                            </tr>
                            <tr>
                                <td>Privacy and Security</td>
                                <td>個人情報のマスキング、最小権限、暗号化</td>
                                <td>
                                    Bedrock Guardrails の機密情報フィルター、IAM、暗号化
                                </td>
                            </tr>
                            <tr>
                                <td>Safety</td>
                                <td>有害コンテンツ・禁止トピックの遮断</td>
                                <td>
                                    Bedrock Guardrails のコンテンツフィルター、拒否トピック
                                </td>
                            </tr>
                            <tr>
                                <td>Controllability</td>
                                <td>監視、人間の介入、停止手段</td>
                                <td>監視ダッシュボード、人間レビューの導線</td>
                            </tr>
                            <tr>
                                <td>Veracity and Robustness</td>
                                <td>根拠づけ、幻覚検知、評価</td>
                                <td>
                                    コンテキスト根拠チェック、Automated Reasoning
                                    チェック(英語(米国)のみ対応。日本語の入出力には直接適用できない)
                                </td>
                            </tr>
                            <tr>
                                <td>Governance</td>
                                <td>記録・監査・責任の明確化</td>
                                <td>Model Cards、ログ(CloudTrail 等)</td>
                            </tr>
                            <tr>
                                <td>Transparency</td>
                                <td>用途・限界・提供元情報の開示</td>
                                <td>AWS AI Service Cards、UI での AI 利用表示</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout warn">
                    <i className="ti ti-alert-triangle c-icon"></i>
                    <p>
                        状況の更新(重要): SageMaker AI の Clarify、Augmented AI(A2I)、Model
                        Monitor などは、2026 年 6 月 30
                        日の発表で「メンテナンスモード」に移行し、2026 年 7 月 30
                        日以降は新規顧客が利用できません(既存顧客は継続利用可)。Clarify
                        の後継としては、オープンソースの監視ソリューション、SHAP
                        ライブラリ、SageMaker AI MLflow、Amazon CloudWatch、Amazon
                        QuickSight、Amazon Bedrock Evaluations
                        の組み合わせが案内されています。<strong>試験は戦略レベルの概念が中心ですが、新規に構築する提案では「メンテナンスモードのサービスに新規依存しない」視点が実務では重要</strong>です。
                    </p>
                </div>
                <h4>Step 3: シナリオへの当てはめ練習</h4>
                <p>
                    <strong>シナリオ</strong>: 採用選考の一次スクリーニングに生成 AI
                    で応募書類要約を導入したい。
                </p>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">考えるべきこと</th>
                                <th scope="col">該当する次元</th>
                                <th scope="col">ビジネスとしての打ち手</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>属性によって要約の質が変わらないか</td>
                                <td>Fairness</td>
                                <td>
                                    事前に属性別の品質評価を実施し、基準を満たさなければ展開しない
                                </td>
                            </tr>
                            <tr>
                                <td>採用担当者が「なぜこの要約？」と聞ける</td>
                                <td>Explainability</td>
                                <td>要約の根拠となる原文箇所を示す設計にする</td>
                            </tr>
                            <tr>
                                <td>応募者の個人情報が外部に漏れない</td>
                                <td>Privacy and Security</td>
                                <td>機密情報のマスキング、アクセス権の最小化</td>
                            </tr>
                            <tr>
                                <td>合否は AI だけで決めない</td>
                                <td>Controllability / Governance</td>
                                <td>最終判断は人間、記録を残す</td>
                            </tr>
                            <tr>
                                <td>応募者へ AI 利用を伝える</td>
                                <td>Transparency</td>
                                <td>利用目的と範囲を明示</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout best">
                    <i className="ti ti-star c-icon"></i>
                    <p>ベストプラクティス(3.1.1)</p>
                    <ol>
                        <li>
                            対象ユースケースを<strong>狭く</strong>定義する(範囲が狭いほどリスクの洗い出しとテストが容易。Responsible
                            AI Lens の設計原則)
                        </li>
                        <li>
                            次元ごとに「誰が・何で・どの基準で」確認するかを決めてから開発に入る
                        </li>
                        <li>
                            1 つのツール(例:
                            ガードレール)で全次元をカバーできると考えない。安全性は守れても、公平性や説明可能性は別の仕組みが必要
                        </li>
                    </ol>
                </div>
                <h3 id="s3-2">
                    3.2 【Skill 3.1.2】事業目標と責任ある AI
                    原則が衝突したときのトレードオフを整理する
                </h3>
                <h4>Step 1: 典型的な衝突</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">事業目標</th>
                                <th scope="col">衝突しやすい原則</th>
                                <th scope="col">典型例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>早く市場に出したい(速度)</td>
                                <td>安全性・公平性の事前検証</td>
                                <td>評価を省略してリリース</td>
                            </tr>
                            <tr>
                                <td>コストを下げたい</td>
                                <td>人間レビュー、監視</td>
                                <td>レビュー人員の削減</td>
                            </tr>
                            <tr>
                                <td>精度・パーソナライズを上げたい</td>
                                <td>プライバシー</td>
                                <td>個人データの過剰な利用</td>
                            </tr>
                            <tr>
                                <td>高性能なブラックボックスモデルを使いたい</td>
                                <td>説明可能性</td>
                                <td>理由を説明できない判断</td>
                            </tr>
                            <tr>
                                <td>機能を広く提供したい</td>
                                <td>安全性・制御可能性</td>
                                <td>用途を絞らず公開</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Step 2: 判断の進め方(フロー)</h4>
                <Diagram id="d1" label="図 2" />
                <h4>Step 3: ベストプラクティス</h4>
                <ul>
                    <li>
                        <strong>「どちらかを捨てる」ではなく「軽減策を付けて両立」を探す</strong>。例:
                        速度を保ちつつ、対象ユーザーを絞ったパイロット→段階拡大にする。
                    </li>
                    <li>
                        影響が大きいほど(採用、与信、医療など)原則を優先する。試験では<strong>高リスク用途では速度・コストより安全・公平・人間の監督が優先される選択肢が正解になりやすい</strong>。
                    </li>
                    <li>
                        判断の根拠・承認者・残存リスクを<strong>記録</strong>する(後日の説明責任と監査のため)。
                    </li>
                </ul>
                <h3 id="s3-3">
                    3.3 【Skill 3.1.3】責任ある AI
                    をプロジェクト計画に組み込む時期を見極める(Governance by Design)
                </h3>
                <h4>結論: 最初から。「作ってから付け足す」は誤り</h4>
                <p>
                    AWS の Responsible AI Lens は「Responsible by
                    design」を設計原則として掲げ、設計から運用まで各段階で次元を考慮し、問題をライフサイクルの早期に特定・解決することを重視しています。後工程での手戻りコストを避ける狙いです。
                </p>
                <Diagram id="d2" label="図 3" />
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">段階</th>
                                <th scope="col">責任ある AI の組み込み例</th>
                                <th scope="col">ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>企画</td>
                                <td>目的・対象者・影響・リスク分類を文書化</td>
                                <td>「解くべき問題」から逆算し、ユースケースを狭くする</td>
                            </tr>
                            <tr>
                                <td>設計</td>
                                <td>データの出所・権利・個人情報の扱い、モデル選定基準</td>
                                <td>第三者モデル / データのリスク(供給網)も評価</td>
                            </tr>
                            <tr>
                                <td>開発・評価</td>
                                <td>属性別評価、有害出力テスト、根拠づけの検証</td>
                                <td>「合格基準」を事前に決める</td>
                            </tr>
                            <tr>
                                <td>展開</td>
                                <td>承認ゲート、段階展開、人間の介入手順</td>
                                <td>承認なしに本番へ出さない</td>
                            </tr>
                            <tr>
                                <td>運用</td>
                                <td>継続監視、インシデント対応、定期見直し</td>
                                <td>変化(データ・規制・利用実態)で再評価</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout warn">
                    <i className="ti ti-alert-triangle c-icon"></i>
                    <p>
                        引っかけ注意: 「まず PoC
                        を作り、うまくいったらガバナンスを検討する」は Governance by Design
                        に反する選択肢。<strong>計画段階でリスク評価・責任分担・評価基準を組み込む</strong>のが正解方向です。
                    </p>
                </div>
                <h3 id="s3-4">
                    3.4 【Skill 3.1.4】人間の監督が必要な状況と、適切なセーフガードを見極める
                </h3>
                <h4>Step 1: 人間の監督(Human Oversight)が必要になりやすい状況</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">状況</th>
                                <th scope="col">例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>人の権利・生活・安全に重大な影響</td>
                                <td>採用、与信、医療、法的判断</td>
                            </tr>
                            <tr>
                                <td>誤りのコストが大きい / 取り消せない</td>
                                <td>高額取引、契約、規制報告</td>
                            </tr>
                            <tr>
                                <td>出力の信頼性が不確実</td>
                                <td>根拠が乏しい回答、低い確信度</td>
                            </tr>
                            <tr>
                                <td>AI が行動を起こせる(エージェント)</td>
                                <td>外部システムへの書込み、支払い</td>
                            </tr>
                            <tr>
                                <td>前例のない・想定外の入力</td>
                                <td>新規ケース、敵対的な入力</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Step 2: セーフガードの種類(試験ガイドの例に対応)</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">セーフガード</th>
                                <th scope="col">役割</th>
                                <th scope="col">例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ガードレール</td>
                                <td>有害・範囲外の入出力を自動で検知・遮断</td>
                                <td>Amazon Bedrock Guardrails</td>
                            </tr>
                            <tr>
                                <td>幻覚検知</td>
                                <td>出力が根拠情報に基づくかを確認</td>
                                <td>
                                    コンテキスト根拠チェック、Automated Reasoning
                                    チェック(英語(米国)のみ対応)
                                </td>
                            </tr>
                            <tr>
                                <td>エスカレーション基準</td>
                                <td>どんなときに人に引き継ぐかを事前に定義</td>
                                <td>確信度が低い、機微トピック、高額、苦情</td>
                            </tr>
                            <tr>
                                <td>人間レビュー / 承認</td>
                                <td>高リスク出力の最終確認</td>
                                <td>承認キュー、二重確認</td>
                            </tr>
                            <tr>
                                <td>停止・ロールバック手段</td>
                                <td>問題時に止められる</td>
                                <td>機能フラグ、緊急停止手順</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Step 3: エスカレーション判断フロー</h4>
                <Diagram id="d3" label="図 4" />
                <div className="callout best">
                    <i className="ti ti-star c-icon"></i>
                    <p>ベストプラクティス(3.1.4)</p>
                    <ol>
                        <li>
                            <strong>リスクに比例</strong>して人間の関与を強める(全件レビューは非現実的。高リスクは全件、低リスクはサンプリング)
                        </li>
                        <li>
                            エスカレーション基準を<strong>事前に文書化</strong>し、担当者と対応時間を決める
                        </li>
                        <li>
                            ガードレールは「万能」ではない。ガードレール＋根拠づけ＋人間レビューの<strong>多層防御</strong>にする
                        </li>
                        <li>
                            人間レビュー基盤の選定では、Amazon Augmented
                            AI(A2I)が新規顧客に閉じている点(前述)に留意し、自社の承認ワークフローなど代替を検討する
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
