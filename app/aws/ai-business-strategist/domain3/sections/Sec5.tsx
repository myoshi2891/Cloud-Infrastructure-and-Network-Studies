import { Diagram } from '../Diagram';

export function Sec5() {
    return (
        <section className="section" id="s5">
            <div className="sec-head">
                <span className="eyebrow">Chapter 05</span>
                <h2>
                    <i className="ti ti-alert-triangle"></i><span>Task 3.3 企業 AI リスクの特定と軽減策の指示</span>
                </h2>
            </div>
            <div className="prose">
                <h3 id="s5-1">5.1 【Skill 3.3.1】本番 AI のリスク統制と監視の必要性</h3>
                <h4>なぜ本番で監視が必要か</h4>
                <p>
                    AI
                    は従来のルールベースソフトと違い、<strong>出力が毎回変わりうる</strong>うえ、データや環境の変化で性能が変わります。リリース時に合格でも、運用中に劣化・偏り・新しい悪用が起こります。
                </p>
                <Diagram id="d7" />
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">統制・監視の項目</th>
                                <th scope="col">例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>品質・正確性</td>
                                <td>正答率、根拠の一致度、ユーザー評価</td>
                            </tr>
                            <tr>
                                <td>安全性</td>
                                <td>有害出力の発生率、ガードレール遮断数</td>
                            </tr>
                            <tr>
                                <td>公平性</td>
                                <td>属性別の結果の差</td>
                            </tr>
                            <tr>
                                <td>ドリフト</td>
                                <td>入力データ分布や出力の変化</td>
                            </tr>
                            <tr>
                                <td>セキュリティ</td>
                                <td>不審なアクセス、プロンプトインジェクション試行</td>
                            </tr>
                            <tr>
                                <td>コスト・利用状況</td>
                                <td>利用量、単価、異常な増加</td>
                            </tr>
                            <tr>
                                <td>インシデント</td>
                                <td>発生件数、対応時間、再発防止</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout best">
                    <i className="ti ti-star c-icon"></i>
                    <p>ベストプラクティス(3.3.1)</p>{' '}
                    <ol>
                        <li>
                            <strong>リリース前に「監視指標としきい値、担当者、対応手順」を決める</strong>(後付けにしない){' '}
                        </li>
                        <li>
                            監視は一度きりでなく<strong>継続</strong>。変更管理(モデル更新・プロンプト変更)にも承認プロセスを設ける{' '}
                        </li>
                        <li>インシデント対応(停止・切り戻し・通知)を訓練しておく{' '}</li>
                        <li>
                            監視ツールの選定は、SageMaker Model Monitor
                            が新規顧客に閉じている点を踏まえ、CloudWatch や OSS
                            監視基盤など<strong>現行で選べる手段</strong>を検討する
                        </li>
                    </ol>
                </div>
                <h3 id="s5-2">
                    5.2 【Skill 3.3.2】バイアスは複数の段階で発生し、Bias Drift
                    の継続監視が重要
                </h3>
                <h4>Step 1: バイアスが入り込む段階</h4>
                <Diagram id="d8" />
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">段階</th>
                                <th scope="col">バイアスの例</th>
                                <th scope="col">対策の方向性</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>データ</td>
                                <td>
                                    特定グループのデータが少ない・過去の判断が偏っている
                                </td>
                                <td>データの代表性の確認、不足の補完</td>
                            </tr>
                            <tr>
                                <td>設計・学習</td>
                                <td>全体精度だけを最適化し、少数グループの精度が低い</td>
                                <td>グループ別指標を評価基準に含める</td>
                            </tr>
                            <tr>
                                <td>評価</td>
                                <td>平均値だけ見て個別の差を見落とす</td>
                                <td>属性・状況別の評価</td>
                            </tr>
                            <tr>
                                <td>展開</td>
                                <td>想定外の集団に使う</td>
                                <td>対象範囲を明確にし、範囲外の利用を防ぐ</td>
                            </tr>
                            <tr>
                                <td>運用</td>
                                <td>時間とともに偏りが変化(Bias Drift)</td>
                                <td>継続測定、しきい値、再評価</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout info">
                    <i className="ti ti-bulb c-icon"></i>
                    <p>
                        大切な考え方:{' '}
                        <strong>バイアスは「1 回チェックして終わり」ではない</strong>。試験ガイドも、複数の段階で起こりうることと、Bias Drift
                        の継続監視の重要性を挙げています。
                    </p>{' '}
                    <p>ベストプラクティス(3.3.2)</p>{' '}
                    <ol>
                        <li>
                            開発前・評価時・運用中の<strong>すべての段階</strong>で公平性を確認する{' '}
                        </li>
                        <li>
                            多様な視点(多様な利害関係者、現場、影響を受ける人)を評価に含める{' '}
                        </li>
                        <li>
                            Bias Drift
                            に備え、<strong>定期的な再測定と是正のトリガー</strong>を決める{' '}
                        </li>
                        <li>
                            生成 AI では、出力の固定観念(ステレオタイプ)評価などを Bedrock
                            Evaluations 等で行う(計測は事前評価と運用中の両方)
                        </li>
                    </ol>
                </div>
                <h3 id="s5-3">
                    5.3 【Skill 3.3.3】有害コンテンツリスクと知的財産(IP)の懸念を管理する
                </h3>
                <h4>Step 1: 有害コンテンツ</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">リスク</th>
                                <th scope="col">例</th>
                                <th scope="col">対策</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>有害な出力</td>
                                <td>ヘイト、暴力、性的内容、違法行為の助長</td>
                                <td>コンテンツフィルター(Bedrock Guardrails)</td>
                            </tr>
                            <tr>
                                <td>範囲外の回答</td>
                                <td>投資助言など、提供してはいけない助言</td>
                                <td>拒否トピック(Denied topics)</td>
                            </tr>
                            <tr>
                                <td>個人情報の露出</td>
                                <td>入出力に PII が含まれる</td>
                                <td>機密情報フィルターによるブロック / マスキング</td>
                            </tr>
                            <tr>
                                <td>悪用(プロンプト攻撃)</td>
                                <td>制限を回避させる入力</td>
                                <td>プロンプト攻撃検知</td>
                            </tr>
                            <tr>
                                <td>不適切な語句</td>
                                <td>競合名、不適切表現</td>
                                <td>ワードフィルター</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Amazon Bedrock Guardrails は、コンテンツフィルター(Hate / Insults /
                    Sexual / Violence / Misconduct / Prompt
                    Attack)、拒否トピック、ワードフィルター、機密情報フィルター、コンテキスト根拠チェック、Automated
                    Reasoning
                    チェック(英語(米国)のみ対応)といった保護(ポリシー)を、モデルとは独立して入力・出力に適用できる仕組みです。フィルターの強さはカテゴリーごとに調整できます。
                </p>
                <div className="callout warn">
                    <i className="ti ti-alert-triangle c-icon"></i>
                    <p>
                        注意:
                        強度を上げるほど検知は増えますが、正常な内容の誤遮断も増えます。対象ユーザーとリスクに合わせた調整が必要です(ビジネス判断)。
                    </p>
                </div>
                <h4>Step 2: 知的財産(IP)リスク</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">リスク</th>
                                <th scope="col">内容</th>
                                <th scope="col">対策</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>出力が第三者の権利を侵害</td>
                                <td>生成物が既存の著作物と酷似する</td>
                                <td>出力の確認プロセス、高リスク用途は人のレビュー</td>
                            </tr>
                            <tr>
                                <td>学習データの権利</td>
                                <td>モデルやファインチューニングに使うデータの権利</td>
                                <td>データの出所・ライセンスを確認し記録</td>
                            </tr>
                            <tr>
                                <td>機密情報・自社 IP の流出</td>
                                <td>従業員が外部 AI に機密を入力</td>
                                <td>
                                    利用ポリシー、承認済みツール、教育(シャドー AI 対策)
                                </td>
                            </tr>
                            <tr>
                                <td>生成物の権利帰属</td>
                                <td>自社が生成物を使えるか</td>
                                <td>契約条件・提供者の規約を確認</td>
                            </tr>
                            <tr>
                                <td>契約上の補償</td>
                                <td>提供者が第三者請求から守るか</td>
                                <td>補償(indemnity)の範囲・条件を確認</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    AWS は、提供対象の生成 AI サービスについて、出力に対する第三者の IP
                    侵害請求に対する補償を用意しています。たとえば Amazon Nova
                    の一般提供モデルの出力については「上限のない IP 補償」を提供すると
                    Amazon Nova のドキュメントに記載されています(AWS サービス条件の 50.10
                    項)。補償の対象サービスや条件は更新されうるため、利用前にサービス条件を確認してください。
                </p>
                <div className="callout best">
                    <i className="ti ti-star c-icon"></i>
                    <p>ベストプラクティス(3.3.3)</p>{' '}
                    <ol>
                        <li>
                            有害コンテンツ対策は<strong>入力側と出力側の両方</strong>にかける{' '}
                        </li>
                        <li>
                            <strong>補償があっても審査は不要にならない</strong>。補償は請求への防御であって、侵害のリスクそのものを消すわけではない。用途によっては人のレビューを併用する{' '}
                        </li>
                        <li>
                            利用するモデル・サービスの<strong>規約と補償の範囲を確認</strong>し、法務と連携する{' '}
                        </li>
                        <li>
                            自社データや顧客データを AI
                            に入力するルール(禁止データ・承認済みツール)を明確にする
                        </li>
                    </ol>
                </div>
                <h3 id="s5-4">
                    5.4 【Skill 3.3.4】AI
                    システムの信頼性リスク(幻覚・データ品質低下・モデルドリフト)
                </h3>
                <h4>Step 1: 3 つの信頼性リスク</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">リスク</th>
                                <th scope="col">何が起きるか</th>
                                <th scope="col">起きやすい原因</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>幻覚</td>
                                <td>もっともらしい誤情報を自信を持って出力</td>
                                <td>根拠情報の不足、曖昧な質問、モデルの性質</td>
                            </tr>
                            <tr>
                                <td>データ品質の劣化</td>
                                <td>入力・参照データが古い・欠損・不整合になる</td>
                                <td>データ更新の停止、上流システムの変更</td>
                            </tr>
                            <tr>
                                <td>モデルドリフト</td>
                                <td>時間とともに現実とモデルの前提がずれ、性能が落ちる</td>
                                <td>顧客行動・市場・言語の変化</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Step 2: 多層の対策</h4>
                <Diagram id="d9" />
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">対策</th>
                                <th scope="col">効果</th>
                                <th scope="col">AWS での例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>RAG(検索拡張生成)</td>
                                <td>最新・社内の情報を根拠に回答させ、幻覚を減らす</td>
                                <td>Amazon Bedrock Knowledge Bases</td>
                            </tr>
                            <tr>
                                <td>コンテキスト根拠チェック</td>
                                <td>応答が参照情報に基づくか、質問に関連するかを検査</td>
                                <td>
                                    Bedrock Guardrails(根拠づけと関連性のサブフィルター)
                                </td>
                            </tr>
                            <tr>
                                <td>Automated Reasoning チェック</td>
                                <td>
                                    自然言語で定義したポリシー・論理ルールに出力が適合するか検証(現時点で英語(米国)のみ対応。日本語の入出力には直接適用できない)
                                </td>
                                <td>Bedrock Guardrails</td>
                            </tr>
                            <tr>
                                <td>引用の提示</td>
                                <td>利用者が根拠を確認できる</td>
                                <td>Knowledge Bases の出典表示</td>
                            </tr>
                            <tr>
                                <td>データ品質管理</td>
                                <td>参照データの鮮度・正確性を継続確認</td>
                                <td>データオーナーの明確化、更新プロセス</td>
                            </tr>
                            <tr>
                                <td>ドリフト監視</td>
                                <td>入力・出力の変化を検知して再評価</td>
                                <td>
                                    CloudWatch や OSS 監視基盤(Model Monitor
                                    は新規顧客に閉じている)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout info">
                    <i className="ti ti-bulb c-icon"></i>
                    <p>
                        補足: コンテキスト根拠チェックは RAG
                        などで「根拠となる情報」がある場合に有効です。根拠がない自由な質問には別の対策(人間レビュー、用途制限)が必要です。
                    </p>{' '}
                    <p>ベストプラクティス(3.3.4)</p>{' '}
                    <ol>
                        <li>
                            「幻覚はゼロにできない」前提で、<strong>発生しても被害が出ない設計</strong>(人間確認、根拠表示、用途限定)にする{' '}
                        </li>
                        <li>
                            <strong>データの鮮度と責任者</strong>を決める(データ品質の劣化は
                            AI の品質劣化に直結){' '}
                        </li>
                        <li>
                            性能低下を検知したら、<strong>再学習 / プロンプト修正 / 参照データ更新 / 停止</strong>のどれをいつ行うかの基準を用意する{' '}
                        </li>
                        <li>
                            AI
                            で置き換えられる業務でも、<strong>ルールベース自動化のほうが適切な場面</strong>(正確さが絶対で判断が単純な処理)を見極める
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
