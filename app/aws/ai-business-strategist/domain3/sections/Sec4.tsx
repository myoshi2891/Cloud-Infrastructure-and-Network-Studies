import { Diagram } from '../Diagram';

export function Sec4() {
    return (
        <section className="section" id="s4">
            <div className="sec-head">
                <span className="eyebrow">Chapter 04</span>
                <h2>
                    <i className="ti ti-gavel"></i><span>Task 3.2 ガバナンス構造の確立と規制遵守</span>
                </h2>
            </div>
            <div className="prose">
                <h3 id="s4-1">
                    4.1 【Skill 3.2.1】部門横断の代表と明確な責任を持つ AI ガバナンス体制
                </h3>
                <h4>Step 1: なぜ部門横断か</h4>
                <p>
                    AI
                    のリスクは技術だけでなく、法務・倫理・セキュリティ・事業・人事にまたがります。1
                    部門だけで決めると見落としが出ます。NIST AI RMF の Govern
                    機能も、責任構造(誰が責任を持ち、権限を与えられ、訓練されているか)を組織内に整備することを求めています。
                </p>
                <h4>Step 2: 体制のイメージ</h4>
                <Diagram id="d4" />
                <h4>Step 3: 役割と責任の例(RACI の考え方)</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">活動</th>
                                <th scope="col">事業オーナー</th>
                                <th scope="col">技術チーム</th>
                                <th scope="col">法務</th>
                                <th scope="col">セキュリティ</th>
                                <th scope="col">委員会</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ユースケース提案とリスク分類</td>
                                <td>実施(R)</td>
                                <td>支援</td>
                                <td>助言</td>
                                <td>助言</td>
                                <td>承認(A)</td>
                            </tr>
                            <tr>
                                <td>評価・テスト実施</td>
                                <td>確認</td>
                                <td>実施(R)</td>
                                <td>助言</td>
                                <td>助言</td>
                                <td>基準設定</td>
                            </tr>
                            <tr>
                                <td>規制要件の解釈</td>
                                <td>情報提供</td>
                                <td>情報提供</td>
                                <td>実施(R)</td>
                                <td>助言</td>
                                <td>承認(A)</td>
                            </tr>
                            <tr>
                                <td>アクセス制御・データ保護</td>
                                <td>確認</td>
                                <td>支援</td>
                                <td>助言</td>
                                <td>実施(R)</td>
                                <td>承認(A)</td>
                            </tr>
                            <tr>
                                <td>本番監視・インシデント対応</td>
                                <td>説明責任(A)</td>
                                <td>実施(R)</td>
                                <td>助言</td>
                                <td>支援</td>
                                <td>報告を受ける</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout info">
                    <i className="ti ti-bulb c-icon"></i>
                    <p>
                        表は責任分担の考え方を示す例です(R＝実行責任、A＝最終責任)。組織ごとに調整してください。
                    </p>{' '}
                    <p>ベストプラクティス(3.2.1)</p>{' '}
                    <ol>
                        <li>
                            <strong>各 AI システムに「名前のある責任者」</strong>を置く(責任の所在が曖昧＝ガバナンス不全){' '}
                        </li>
                        <li>
                            委員会は「承認だけの機関」にせず、<strong>方針・基準・例外処理・定期レビュー</strong>を持たせる{' '}
                        </li>
                        <li>
                            AI
                            センター・オブ・エクセレンス(CoE)と連携し、標準テンプレートと再利用可能な統制を配る{' '}
                        </li>
                        <li>
                            社内 AI
                            利用ポリシー(許可ツール、禁止データ、レビュー要件)と教育をセットで整備する{' '}
                        </li>
                        <li>
                            <strong>シャドー AI</strong>(未承認ツールの利用)のリスクを認識し、禁止一辺倒ではなく「承認済みの安全な代替手段」を用意する
                        </li>
                    </ol>
                </div>
                <h3 id="s4-2">
                    4.2 【Skill 3.2.2】AI を使う業務プロセスの規制遵守リスクを特定し対処する
                </h3>
                <h4>Step 1: まず「どの法令・基準が自社に関係するか」を把握する</h4>
                <p>
                    規制は地域・業界・用途で変わります。ビジネス担当者の役割は、<strong>法務と連携して適用範囲を見極め、要件を計画に落とし込む</strong>ことです(自分で実装や法的解釈を行うことではありません)。
                </p>
                <h4>Step 2: 主要な枠組み(試験で名前が出やすいもの)</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">枠組み</th>
                                <th scope="col">種類</th>
                                <th scope="col">要点(初学者向け)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>EU AI Act(規則 2024/1689)</td>
                                <td>法規制(EU)</td>
                                <td>
                                    AI をリスクで 4
                                    段階に分類し、リスクに応じた義務を課す。汎用
                                    AI(GPAI)モデルには別の枠組み
                                </td>
                            </tr>
                            <tr>
                                <td>ISO/IEC 42001</td>
                                <td>国際規格</td>
                                <td>
                                    AI マネジメントシステム(AIMS)の認証可能な規格。2023 年
                                    12 月発行。組織の統治の仕組みを対象
                                </td>
                            </tr>
                            <tr>
                                <td>NIST AI RMF</td>
                                <td>自主的フレームワーク(米国)</td>
                                <td>
                                    Govern / Map / Measure / Manage の 4
                                    機能でリスクを扱う。認証制度はない
                                </td>
                            </tr>
                            <tr>
                                <td>ISO/IEC 23053</td>
                                <td>国際規格</td>
                                <td>
                                    機械学習を用いる AI
                                    システムの枠組み(試験ガイドの「関連概念」に例示されている)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout info">
                    <i className="ti ti-bulb c-icon"></i>
                    <p>
                        ISO/IEC 42001 は「組織の管理の仕組み」の認証、NIST AI RMF
                        は「リスク管理の考え方・進め方」の指針、という役割の違いをつかむと整理しやすくなります。両者は補完関係で、どちらか一方だけが正解とは限りません。
                    </p>
                </div>
                <h4>Step 3: EU AI Act の 4 段階リスク分類</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">分類</th>
                                <th scope="col">内容</th>
                                <th scope="col">例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>許容できないリスク</td>
                                <td>原則禁止</td>
                                <td>特定形態のソーシャルスコアリングなど</td>
                            </tr>
                            <tr>
                                <td>高リスク</td>
                                <td>
                                    安全・健康・基本的権利に影響しうる。文書化、リスク管理、人間の監督などの重い義務
                                </td>
                                <td>採用、与信、教育、重要インフラ</td>
                            </tr>
                            <tr>
                                <td>限定リスク</td>
                                <td>透明性義務(AI との対話であることの通知など)</td>
                                <td>チャットボット、生成コンテンツ</td>
                            </tr>
                            <tr>
                                <td>最小リスク</td>
                                <td>特段の義務なし</td>
                                <td>スパムフィルター等</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p><strong>適用時期の最新状況(2026-09-30 時点で確認できた情報)</strong></p>
                <ul>
                    <li>
                        禁止される行為と AI リテラシー義務は 2025 年 2 月 2
                        日に適用開始、GPAI 義務は 2025 年 8 月 2 日に適用開始。
                    </li>
                    <li>
                        2026 年 7 月に成立した「Digital Omnibus on AI」(規則
                        2026/1744)により、高リスクの義務は、Annex III の単独システムが 2027
                        年 12 月 2 日、Annex I の製品組込み型が 2028 年 8 月 2
                        日に延期。一方、透明性義務(第 50 条)等は予定どおり 2026 年 8 月 2
                        日に適用。ただし第 50 条 2 項の AI
                        生成コンテンツのマーキング・検出義務は、2026 年 8 月 2
                        日より前に市場投入されたシステムについて 2026 年 12 月 2
                        日までの移行期間がある。
                    </li>
                    <li>
                        同規則で新たに追加された禁止行為は、2026 年 12 月 2 日から適用。
                    </li>
                    <li>
                        「延期＝義務がなくなる」ではない点に注意。日程は今後変わりうるため、実務では最新の公式情報を確認すること。
                    </li>
                </ul>
                <div className="callout info">
                    <i className="ti ti-bulb c-icon"></i>
                    <p>
                        試験に向けた要点:
                        具体的な日付の暗記よりも「<strong>リスクが高い用途ほど重い義務</strong>」「<strong>規制はリスクベースで段階的</strong>」という構造理解が大切です。
                    </p>
                </div>
                <h4>Step 4: 規制遵守の進め方</h4>
                <Diagram id="d5" />
                <div className="callout best">
                    <i className="ti ti-star c-icon"></i>
                    <p>ベストプラクティス(3.2.2)</p>{' '}
                    <ol>
                        <li>
                            <strong>AI 利用の棚卸し(AI インベントリ)</strong>を作り、ユースケース単位で規制との対応を管理する{' '}
                        </li>
                        <li>
                            越境データ・個人情報・業界規制(金融、医療等)を、計画段階から法務と確認する{' '}
                        </li>
                        <li>
                            「後から証明できる」ように、評価結果・承認記録・ログを保管する{' '}
                        </li>
                        <li>
                            AWS
                            側の認証・コンプライアンスは<strong>利用者の責任を代替しない</strong>(次節の責任共有モデル)
                        </li>
                    </ol>
                </div>
                <h3 id="s4-3">
                    4.3 【Skill 3.2.3】AI システムに適したアクセス制御とデータセキュリティ
                </h3>
                <h4>Step 1: 責任共有モデルを AI に当てはめる</h4>
                <p>
                    AWS
                    が基盤(インフラ)を守り、顧客は<strong>自分のデータ、アクセス権、モデル設定、アプリケーションの統制</strong>に責任を持ちます。AI
                    セキュリティの不備は、広すぎる IAM
                    権限、検索(RAG)のアクセス制御の甘さ、エージェントの権限過多といった顧客側の設定で起きやすいとされます。
                </p>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">誰が</th>
                                <th scope="col">主な責任(戦略レベル)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>AWS</td>
                                <td>クラウド基盤、マネージドサービスの基盤セキュリティ</td>
                            </tr>
                            <tr>
                                <td>顧客</td>
                                <td>
                                    誰がどのデータ・モデルにアクセスできるか、データ分類、プロンプトや出力の取り扱い、ガードレール設定、利用ポリシー
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Step 2: Generative AI Security Scoping Matrix(どこまで自社が持つか)</h4>
                <p>
                    AWS は生成 AI の利用形態を 5
                    つの「スコープ」に分け、自社が担う統制の範囲を判断する考え方を示しています。
                </p>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">スコープ</th>
                                <th scope="col">利用形態</th>
                                <th scope="col">自社の統制の中心</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1</td>
                                <td>消費者向けアプリの利用</td>
                                <td>利用ポリシー、入力してよい情報の教育、流出監視</td>
                            </tr>
                            <tr>
                                <td>2</td>
                                <td>エンタープライズアプリの AI 機能</td>
                                <td>ベンダー契約・データ取扱いの確認、権限管理</td>
                            </tr>
                            <tr>
                                <td>3</td>
                                <td>事前学習済みモデルを使ってアプリを構築</td>
                                <td>
                                    アクセス制御、データ保護、プロンプトインジェクション対策
                                </td>
                            </tr>
                            <tr>
                                <td>4</td>
                                <td>自社データでモデルを微調整</td>
                                <td>学習データの管理・分類、上記に加えモデルの管理</td>
                            </tr>
                            <tr>
                                <td>5</td>
                                <td>モデルを自前で学習</td>
                                <td>最も広い責任範囲</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>数字が大きいほど、自社が所有・管理する範囲(＝負う統制)が広がります。</p>
                <h4>Step 3: アクセス制御・データ保護の基本</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">領域</th>
                                <th scope="col">何をするか</th>
                                <th scope="col">ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>ID とアクセス</td>
                                <td>誰が何をできるか</td>
                                <td>
                                    <strong>最小権限</strong>。役割別に権限を分ける(AWS では
                                    IAM を利用)
                                </td>
                            </tr>
                            <tr>
                                <td>データ分類</td>
                                <td>機密度に応じた扱い</td>
                                <td>
                                    機密・個人データを AI に渡してよいか事前に分類・承認
                                </td>
                            </tr>
                            <tr>
                                <td>RAG のデータアクセス</td>
                                <td>検索対象の権限</td>
                                <td>
                                    「ユーザーが見てよい文書だけ」を検索対象にする。AI
                                    経由で権限外の情報が見えないようにする
                                </td>
                            </tr>
                            <tr>
                                <td>暗号化・ネットワーク</td>
                                <td>保存時・通信時の保護</td>
                                <td>暗号化、プライベート接続</td>
                            </tr>
                            <tr>
                                <td>プライバシー</td>
                                <td>個人情報の最小化</td>
                                <td>
                                    不要な個人情報は渡さない。必要なら入出力でマスキング(Guardrails
                                    の機密情報フィルター等)
                                </td>
                            </tr>
                            <tr>
                                <td>ログと監査</td>
                                <td>誰が何をしたか</td>
                                <td>
                                    利用ログを保管し、監査可能にする(CloudTrail
                                    等)。ブロックされた内容がログに平文で残る場合があるため、ログ側の扱いも設計する
                                </td>
                            </tr>
                            <tr>
                                <td>脅威対策</td>
                                <td>プロンプトインジェクション等</td>
                                <td>
                                    入力前の細かな認可とデータフィルタリング＋ガードレール(AWS
                                    のスコーピングマトリクスの指針)
                                </td>
                            </tr>
                            <tr>
                                <td>エージェント</td>
                                <td>自律的な操作</td>
                                <td>必要最小限のツール・権限、重要操作は人間承認</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout info">
                    <i className="ti ti-bulb c-icon"></i>
                    <p>
                        試験の視点:
                        ここでビジネス担当者に問われるのは、<strong>設定手順ではなく「どの統制が必要か」を見極めること</strong>です(試験ガイドでは、セキュリティやコンプライアンスの実装自体はスコープ外)。
                    </p>
                </div>
                <h3 id="s4-4">
                    4.4 【Skill 3.2.4】AI リスク分類フレームワークで優先順位付けする
                </h3>
                <h4>Step 1: なぜ分類するのか</h4>
                <p>
                    すべての AI
                    に最高レベルの統制をかけると、コストが膨らみイノベーションが止まります。逆に一律に緩いと重大リスクを見逃します。<strong>リスクに応じて統制の強さを変える</strong>のがリスクベースアプローチです。
                </p>
                <h4>Step 2: 分類の考え方(自社版のリスクティア例)</h4>
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr>
                                <th scope="col">観点</th>
                                <th scope="col">高リスク寄り</th>
                                <th scope="col">低リスク寄り</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>影響を受ける人</td>
                                <td>顧客・市民・従業員の権利や生活</td>
                                <td>社内の作業支援</td>
                            </tr>
                            <tr>
                                <td>判断の自律度</td>
                                <td>AI が自動で決定・実行</td>
                                <td>人が最終決定</td>
                            </tr>
                            <tr>
                                <td>データの機微性</td>
                                <td>個人・機密・規制対象</td>
                                <td>公開情報</td>
                            </tr>
                            <tr>
                                <td>誤りのコスト</td>
                                <td>大きい・取消不能</td>
                                <td>小さい・修正容易</td>
                            </tr>
                            <tr>
                                <td>規制の該当</td>
                                <td>高リスク区分・業界規制あり</td>
                                <td>特段の規制なし</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h4>Step 3: 分類→統制の流れ</h4>
                <Diagram id="d6" />
                <div className="callout best">
                    <i className="ti ti-star c-icon"></i>
                    <p>ベストプラクティス(3.2.4)</p>{' '}
                    <ol>
                        <li>
                            分類は<strong>ライフサイクルを通じて</strong>行う(企画時だけでなく、機能追加・データ変更・規制変更のたびに再評価){' '}
                        </li>
                        <li>
                            EU AI Act の 4 分類や NIST AI RMF
                            の考え方を<strong>参照して</strong>社内基準を作る(自社用途に合わせて調整){' '}
                        </li>
                        <li>
                            高リスク分類のシステムに、限られたガバナンス資源を<strong>優先的に</strong>投入する
                        </li>
                    </ol>
                </div>
            </div>
        </section>
    );
}
