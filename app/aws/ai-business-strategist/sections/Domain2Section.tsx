import { Diagram } from '../Diagram';

export const Domain2Section = () => {
    return (
        <>
            <h1 id="s28">Domain 2 AI Strategy and Business Value Creation(配点 28%)</h1>
            <h2 id="s29">Step 4 AI 戦略を事業目標に合わせる(Task 2.1)</h2>
            <h3 id="s30">4-1 高インパクトなユースケースの特定と成果への対応づけ(Skill 2.1.1)</h3>
            <p>
                <strong>考え方</strong>: 「AI で何ができるか」ではなく「<strong
                    >どの事業成果を、どの AI の能力で実現するか</strong
                >」から逆算します。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">事業機能</th>
                            <th scope="col">代表的な AI の能力</th>
                            <th scope="col">期待する事業成果(例)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>カスタマーオペレーション</td>
                            <td>問い合わせの要約・回答案作成、自動応対、感情分析</td>
                            <td>対応時間の短縮、顧客満足度の向上、一次解決率の改善</td>
                        </tr>
                        <tr>
                            <td>営業・マーケティング</td>
                            <td>提案文・コンテンツ生成、リード優先順位付け、パーソナライズ</td>
                            <td>商談化率の向上、コンテンツ制作リードタイムの短縮</td>
                        </tr>
                        <tr>
                            <td>研究開発</td>
                            <td>文献・特許の要約と検索、アイデア創出支援</td>
                            <td>調査工数の削減、探索スピードの向上</td>
                        </tr>
                        <tr>
                            <td>ソフトウェア開発</td>
                            <td>コード補完、テスト・ドキュメント作成の支援</td>
                            <td>開発生産性の向上、品質の安定</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-6" />
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>
                    現場の業務フローを観察し、<strong>時間がかかっている作業・ミスが多い作業・属人化した作業</strong>を起点に候補を探す
                </li>
                <li>「成果指標(KPI)を 1 つ言えないユースケース」は、優先度を下げる</li>
            </ul>
            <h3 id="s31">4-2 Build・Buy・Partner の判断(Skill 2.1.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">選択肢</th>
                            <th scope="col">内容</th>
                            <th scope="col">AWS 上のイメージ(戦略レベル)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Build(自社構築)</td>
                            <td>自社でモデル活用や開発を行う。差別化と自由度が高い</td>
                            <td>
                                Amazon Bedrock でモデルを活用して自社アプリを構築、Amazon SageMaker
                                AI でカスタム ML を構築
                            </td>
                        </tr>
                        <tr>
                            <td>Buy(購入)</td>
                            <td>既製のソフトウェアや SaaS を導入する。早く始められる</td>
                            <td>
                                Amazon Quick のような AI アシスタント、SaaS に組み込まれた AI 機能
                            </td>
                        </tr>
                        <tr>
                            <td>Partner(提携)</td>
                            <td>ベンダー・パートナー・コンサルと組んで実現する</td>
                            <td>AWS Marketplace や AWS パートナーの活用</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>判断要素(試験ガイド記載)</strong>:
                予算、期間、社内の能力、ベンダー提案の内容、規制・コンプライアンス要件。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">判断要素</th>
                            <th scope="col">Build に傾く</th>
                            <th scope="col">Buy / Partner に傾く</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>予算</td>
                            <td>継続投資できる</td>
                            <td>初期費用を抑えたい</td>
                        </tr>
                        <tr>
                            <td>期間</td>
                            <td>時間をかけられる</td>
                            <td>早期に成果が必要</td>
                        </tr>
                        <tr>
                            <td>社内能力</td>
                            <td>専門人材がいる</td>
                            <td>人材が不足</td>
                        </tr>
                        <tr>
                            <td>差別化</td>
                            <td>競争優位の核になる</td>
                            <td>他社と同じで十分な汎用機能</td>
                        </tr>
                        <tr>
                            <td>規制・データ</td>
                            <td>厳格な管理が必要で自社管理したい</td>
                            <td>ベンダーが必要な認証・統制を満たしている</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-7" />
            <p>
                <strong>補足解説(所有範囲とセキュリティ責任)</strong>: AWS の Generative AI Security
                Scoping Matrix は、生成 AI の利用形態を所有範囲の小さい順に 5 つの Scope
                に分類します。Build / Buy
                の選択は、<strong>どこまで自社が管理責任を負うか</strong>にも直結します。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">Scope</th>
                            <th scope="col">利用形態</th>
                            <th scope="col">例(AWS の整理)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>コンシューマー向けアプリの利用</td>
                            <td>一般公開の生成 AI サービス</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>エンタープライズアプリの利用</td>
                            <td>生成 AI 機能を持つ SaaS</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>事前学習済みモデル上に自社アプリを構築</td>
                            <td>Amazon Bedrock 上の基盤モデル</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>自社データでファインチューニング</td>
                            <td>Bedrock のカスタムモデル、SageMaker JumpStart</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>自社データでモデルをゼロから学習</td>
                            <td>自社学習モデル</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    <strong>ベンダー提案は同じ評価軸で比較</strong
                    >する(機能、総コスト、データの取り扱い、規制対応、契約条件、撤退のしやすさ)
                </li>
                <li>
                    最初は Buy / Partner で素早く価値を確認し、差別化領域だけ Build
                    に移行する、という段階的な進め方も有効(一般的な実務ガイダンス)
                </li>
            </ul>
            <h3 id="s32">4-3 AI イニシアチブの優先順位づけ(Skill 2.1.3)</h3>
            <p>
                <strong>4 つの評価軸(試験ガイド記載)</strong>:
                ビジネス価値、実現可能性、持続可能性、戦略との整合性。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">評価軸</th>
                            <th scope="col">確認する問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ビジネス価値</td>
                            <td>売上・コスト・顧客体験にどれだけ効くか</td>
                        </tr>
                        <tr>
                            <td>実現可能性</td>
                            <td>データ、技術、人材、期間の面で現実的か</td>
                        </tr>
                        <tr>
                            <td>持続可能性</td>
                            <td>運用コストや保守を継続でき、変化にも対応できるか</td>
                        </tr>
                        <tr>
                            <td>戦略整合性</td>
                            <td>経営戦略・事業目標に合っているか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>判断の結末は 3 種類: スケール・一時停止・終了</strong></p>
            <Diagram id="dgm-8" />
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    事前に<strong>「継続・停止の判断基準」と判断のタイミング</strong>を決めておく(感情や既得権益で継続しないため)
                </li>
                <li>
                    「終了」は失敗ではなく<strong>学びの獲得</strong>と位置づけ、得られた教訓を共有する(一般的な実務ガイダンス)
                </li>
            </ul>
            <h3 id="s33">4-4 AI が適切でない場面の見極め(Skill 2.1.4)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">AI が適切でないケース</th>
                            <th scope="col">理由</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ルールが明確で、既存の自動化で十分</td>
                            <td>複雑さとコストが見合わない</td>
                        </tr>
                        <tr>
                            <td>学習・参照に使える質の良いデータがない</td>
                            <td>成果が出ない。まずデータ整備</td>
                        </tr>
                        <tr>
                            <td>価値が小さい、または測定できない</td>
                            <td>投資対効果が示せない</td>
                        </tr>
                        <tr>
                            <td>誤りの影響が大きいのに、人の確認や統制を置けない</td>
                            <td>リスクが受容できない</td>
                        </tr>
                        <tr>
                            <td>常に毎回同一の結果が求められる</td>
                            <td>生成 AI は出力にぶれがある</td>
                        </tr>
                        <tr>
                            <td>規制上・倫理上の制約で利用が認められない</td>
                            <td>コンプライアンス違反のおそれ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ポイント</strong>: 試験では「AI
                を導入しない」「まず別の手段」という選択肢が<strong>正解になる場合</strong>があります。「AI
                ありき」で選ばないこと。
            </p>
            <h3 id="s34">4-5 業務やプラットフォームを AI へ移行する際の考慮点(Skill 2.1.5)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">考慮点</th>
                            <th scope="col">確認すること</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>事業継続性</td>
                            <td>移行中・障害時に業務が止まらないか。旧手順への切り戻しは可能か</td>
                        </tr>
                        <tr>
                            <td>コスト</td>
                            <td>移行費用、二重運用期間、従量課金の増減、契約の縛り</td>
                        </tr>
                        <tr>
                            <td>データの準備状況</td>
                            <td>移行対象データの品質、形式、アクセス権</td>
                        </tr>
                        <tr>
                            <td>性能への影響</td>
                            <td>応答時間、精度、利用者体験の変化。事前に基準値を測る</td>
                        </tr>
                        <tr>
                            <td>プラットフォーム間の移行</td>
                            <td>
                                特定ベンダーへの依存度、プロンプト・評価データ・連携部分の移し替えのしやすさ
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>
                    <strong>並行稼働</strong>や段階的な切り替えを計画し、切り戻し条件を決めておく
                </li>
                <li>
                    特定モデルにしか動かない作りを避け、プロンプトや評価セットを<strong>資産として管理</strong>しておくと乗り換えが楽になる
                </li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 2</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AI Security Scoping Matrix(Scope 1〜5)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/"
                            >https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">試験対象のサービス一覧</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-in-scope-services.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS Marketplace</span
                        ><a target="_blank" rel="noopener" href="https://aws.amazon.com/marketplace"
                            >https://aws.amazon.com/marketplace</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s35">Step 5 AI のビジネス価値を測定・実証する(Task 2.2)</h2>
            <h3 id="s36">5-1 全体の流れ</h3>
            <Diagram id="dgm-9" />
            <h3 id="s37">5-2 KPI の設定: 有形の効果と無形の効果(Skill 2.2.1)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">区分</th>
                            <th scope="col">例</th>
                            <th scope="col">測り方の例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>有形(定量化しやすい)</td>
                            <td>コスト削減、売上増、処理時間の短縮、エラー率の低下</td>
                            <td>財務データ、業務ログ</td>
                        </tr>
                        <tr>
                            <td>無形(定量化しにくい)</td>
                            <td>顧客満足度、従業員の生産性・エンゲージメント、意思決定の質</td>
                            <td>アンケート、NPS、従業員サーベイ</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    KPI
                    は<strong>事業目標とひも付け</strong>て決める(「利用回数」だけで成功としない)
                </li>
                <li>無形の効果も<strong>測る仕組み</strong>(アンケートなど)を最初から用意する</li>
            </ul>
            <h3 id="s38">5-3 導入前のベースライン(基準値)の設定(Skill 2.2.2)</h3>
            <p>
                <strong>理由</strong>: 導入前の数値がなければ、導入後の改善が AI
                のおかげかどうかを示せません。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">例(カスタマーサポート)</th>
                            <th scope="col">導入前(ベースライン)</th>
                            <th scope="col">導入後</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1 件あたり平均処理時間</td>
                            <td>測定しておく</td>
                            <td>同じ定義で再測定</td>
                        </tr>
                        <tr>
                            <td>顧客満足度</td>
                            <td>測定しておく</td>
                            <td>同じ定義で再測定</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>測定方法と期間を<strong>導入前後で統一</strong>する</li>
                <li>
                    可能なら、AI
                    を使う群と使わない群を比べる(季節要因などの影響を減らす。一般的な実務ガイダンス)
                </li>
            </ul>
            <h3 id="s39">5-4 AI の ROI を算出する(Skill 2.2.3)</h3>
            <p><strong>基本式</strong>: ROI(%)= (得られた便益 − 総コスト)÷ 総コスト × 100</p>
            <p>
                <strong>便益の観点(試験ガイド記載の例)</strong>:
                時間の節約、コスト削減、売上増、生産性向上。{' '}
                <strong>コストの観点(補足解説)</strong>:
                モデル・サービス利用料、開発・連携費用、運用・保守、教育・変革管理、ガバナンス対応。
            </p>
            <p><strong>計算例(仮の数値です)</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">項目</th>
                            <th scope="col">数値</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>月間の問い合わせ件数</td>
                            <td>20,000 件</td>
                        </tr>
                        <tr>
                            <td>1 件あたり処理時間の短縮</td>
                            <td>12 分 → 9 分(3 分短縮)</td>
                        </tr>
                        <tr>
                            <td>月間の削減時間</td>
                            <td>3 分 × 20,000 件 = 60,000 分 = 1,000 時間</td>
                        </tr>
                        <tr>
                            <td>1 時間あたり人件費</td>
                            <td>3,000 円</td>
                        </tr>
                        <tr>
                            <td>月間の便益</td>
                            <td>1,000 時間 × 3,000 円 = 300 万円</td>
                        </tr>
                        <tr>
                            <td>月間の総コスト(利用料・運用・教育など)</td>
                            <td>120 万円</td>
                        </tr>
                        <tr>
                            <td>月間の純便益</td>
                            <td>300 万円 − 120 万円 = 180 万円</td>
                        </tr>
                        <tr>
                            <td>ROI(月次)</td>
                            <td>180 万円 ÷ 120 万円 × 100 = 150%</td>
                        </tr>
                        <tr>
                            <td>初期投資 600 万円の回収期間</td>
                            <td>600 万円 ÷ 180 万円 ≒ 3.3 か月</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout note">
                <p>
                    <strong>注意(重要)</strong>:
                    「削減した時間」は、その時間が<strong>別の価値ある業務に再配分されて初めて</strong>財務上の便益になります。時間削減をそのまま人件費削減と読み替えると、便益を過大評価しがちです。
                </p>
            </blockquote>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    便益は<strong>保守的な前提</strong>で見積もり、コストは<strong>見落としなく</strong>含める
                </li>
                <li>定量化しにくい効果は、ROI とは別に<strong>併記</strong>する</li>
            </ul>
            <h3 id="s40">5-5 先行指標(リーディングインジケーター)(Skill 2.2.4)</h3>
            <p>
                <strong>先行指標</strong>は、最終成果(売上など)が出る前に成功の兆しを示す指標です。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">種類</th>
                            <th scope="col">例</th>
                            <th scope="col">意味</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>先行指標</td>
                            <td>
                                利用率、週次アクティブ利用者数、タスク完了率、ユーザー満足度、回答の採用率
                            </td>
                            <td>「使われているか」「役に立っているか」の早期シグナル</td>
                        </tr>
                        <tr>
                            <td>遅行指標</td>
                            <td>売上、コスト削減額、解約率</td>
                            <td>最終的な成果。結果が出るまで時間がかかる</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>:
                先行指標が悪化した時点で、<strong>利用者の声を聞き、改善する</strong>。遅行指標を待つと、手遅れになりがちです。
            </p>
            <h3 id="s41">5-6 コストの基本管理(Skill 2.2.5)</h3>
            <p><strong>AWS の AI サービスの料金体系(試験ガイド記載の例)</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">体系</th>
                            <th scope="col">意味</th>
                            <th scope="col">代表的なイメージ(補足解説)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>従量課金(consumption-based)</td>
                            <td>使った量に応じて課金</td>
                            <td>生成 AI のトークン量に応じた従量料金</td>
                        </tr>
                        <tr>
                            <td>インスタンス課金(instance-based)</td>
                            <td>利用する計算資源の時間に応じて課金</td>
                            <td>カスタム ML の学習・推論用の計算資源</td>
                        </tr>
                        <tr>
                            <td>シート課金(seat-based)</td>
                            <td>ユーザー数に応じて課金</td>
                            <td>従業員向け AI アシスタント</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>Amazon Bedrock の料金の考え方(料金ページの記載より)</strong>:
                オンデマンド(従量)、バッチ、Provisioned Throughput(処理能力の確保。1 か月・6
                か月などのコミットメントで割安になる料金の例がある)、モデルカスタマイズ料金(学習、保管、推論)が用意されています。
            </p>
            <p><strong>コスト管理の道具(試験範囲)</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">道具</th>
                            <th scope="col">使いどころ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AWS Pricing Calculator</td>
                            <td>導入前に構成に基づく費用を<strong>見積もる</strong></td>
                        </tr>
                        <tr>
                            <td>AWS Cost Explorer</td>
                            <td>
                                導入後のコストと使用量を<strong>可視化・分析</strong>する。過去 13
                                か月の表示と、今後 18 か月の予測に対応
                            </td>
                        </tr>
                        <tr>
                            <td>Savings Plans</td>
                            <td>
                                一定の利用を約束する代わりに割引を得る(対象サービスや条件は要確認)
                            </td>
                        </tr>
                        <tr>
                            <td>AWS Marketplace</td>
                            <td>ソリューションの比較や購入・提携先の検討</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    本番前に<strong>コストの見積もり</strong>を作り、想定利用量が 2
                    倍になった場合も確認する
                </li>
                <li>
                    利用量が読めない初期は従量課金で始め、<strong>使用実績が安定してから</strong>コミットメント型の割引を検討する(一般的な実務ガイダンス)
                </li>
                <li>コストを定期的に見直す担当者と頻度を決める</li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 2 / 対象受験者の説明</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">参照</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Amazon Bedrock 料金</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/bedrock/pricing/"
                            >https://aws.amazon.com/bedrock/pricing/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS Pricing Calculator</span
                        ><a target="_blank" rel="noopener" href="https://calculator.aws/"
                            >https://calculator.aws/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS Cost Explorer(製品ページ)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/aws-cost-management/aws-cost-explorer/"
                            >https://aws.amazon.com/aws-cost-management/aws-cost-explorer/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS Cost Explorer(ドキュメント)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/console/billing/costexplorer"
                            >https://docs.aws.amazon.com/console/billing/costexplorer</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS Pricing</span
                        ><a target="_blank" rel="noopener" href="https://aws.amazon.com/pricing/"
                            >https://aws.amazon.com/pricing/</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s42">Step 6 競争優位のための AI ポジショニング(Task 2.3)</h2>
            <h3 id="s43">6-1 競争環境の評価と AI 導入の優位性(Skill 2.3.1)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">分析の観点</th>
                            <th scope="col">確認する問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>競合の動き</td>
                            <td>競合はすでに AI を使って何を改善しているか</td>
                        </tr>
                        <tr>
                            <td>顧客の期待</td>
                            <td>顧客は AI による迅速さ・個別対応を期待し始めているか</td>
                        </tr>
                        <tr>
                            <td>自社の資産</td>
                            <td>他社にない独自データ、顧客接点、専門知見は何か</td>
                        </tr>
                        <tr>
                            <td>参入障壁の変化</td>
                            <td>AI により新規参入者が有利になる領域はどこか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s44">6-2 ビジネスモデル変革の機会(Skill 2.3.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">変革の方向</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>提供価値の高度化</td>
                            <td>製品にAI機能を組み込み、個別最適化されたサービスにする</td>
                        </tr>
                        <tr>
                            <td>提供コストの構造変化</td>
                            <td>人手に依存していたサービスを低コストで大規模に提供する</td>
                        </tr>
                        <tr>
                            <td>新規の収益源</td>
                            <td>蓄積データや専門知見を使った新サービス、データ活用型サービス</td>
                        </tr>
                        <tr>
                            <td>顧客体験の再設計</td>
                            <td>24 時間対応、即時提案、待ち時間の解消</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s45">6-3 持続的な競争優位と運用面の改善(Skill 2.3.3)</h3>
            <p>
                <strong>考え方(一般的な実務ガイダンス)</strong>: AI
                モデルそのものは、他社も同じものを利用できることが多いため、<strong>モデルだけでは差別化になりにくい</strong>。持続的な優位は次のような要素から生まれます。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">優位の源泉</th>
                            <th scope="col">説明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>独自データ</td>
                            <td>他社が持たない高品質なデータを継続的に蓄積・活用する</td>
                        </tr>
                        <tr>
                            <td>業務への組み込み</td>
                            <td>AI を日常業務のワークフローに深く組み込み、使われ続ける</td>
                        </tr>
                        <tr>
                            <td>学習の速さ</td>
                            <td>実験→評価→改善のサイクルを速く回せる組織能力</td>
                        </tr>
                        <tr>
                            <td>人材と文化</td>
                            <td>AI を使いこなせる人材と、試行を許容する文化</td>
                        </tr>
                        <tr>
                            <td>信頼</td>
                            <td>責任ある AI の実践により、顧客・規制当局の信頼を得る</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s46">6-4 投資水準の決め方(Skill 2.3.4)</h3>
            <p>
                <strong>考え方</strong>:
                投資の大きさは、<strong>業界の成熟度と競争のダイナミクス</strong>で決めます。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">状況</th>
                            <th scope="col">投資の方向性(一般的な実務ガイダンス)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>競合が急速に AI を活用し、顧客の期待も上がっている</td>
                            <td>投資を厚くし、スピードを重視する</td>
                        </tr>
                        <tr>
                            <td>業界の AI 活用がまだ初期で、成果の見通しが不確か</td>
                            <td>小さな実験を複数走らせ、学びながら段階的に投資する</td>
                        </tr>
                        <tr>
                            <td>規制が厳しく、リスクが大きい業界</td>
                            <td>ガバナンスを先に固めたうえで、範囲を絞って投資する</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ポイント</strong>:
                「最新技術だから大きく投資する」「他社がやっているからやる」は理由になりません。<strong>事業価値と競争状況</strong>から根拠を示します。
            </p>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 2</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain2.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >AWS CAF-AI ホワイトペーパー(AI を通じて事業価値を生む考え方)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            >https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html</a
                        >
                    </li>
                </ul>
            </div>

        </>
    );
};
