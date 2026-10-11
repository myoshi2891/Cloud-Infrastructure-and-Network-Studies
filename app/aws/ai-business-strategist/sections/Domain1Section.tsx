import { Diagram } from '../Diagram';

export const Domain1Section = () => {
    return (
        <>
            <h1 id="s12">Domain 1 AI Fundamentals and Literacy(配点 24%)</h1>
            <h2 id="s13">Step 1 AI の基本概念と用語(Task 1.1)</h2>
            <h3 id="s14">1-1 まず全体像: AI・ML・深層学習・生成 AI の関係(Skill 1.1.1 / 1.1.2)</h3>
            <p>
                <strong>やさしい例え</strong>: AI
                を「新入社員の育成」にたとえると分かりやすくなります。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">用語</th>
                            <th scope="col">新入社員の例え</th>
                            <th scope="col">ビジネスでの意味</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>アルゴリズム</td>
                            <td>仕事の進め方のルール</td>
                            <td>データからパターンを見つける計算手順</td>
                        </tr>
                        <tr>
                            <td>モデル</td>
                            <td>研修を終えた新入社員が身につけた「勘所」</td>
                            <td>学習の結果できあがった、予測や判断を行う仕組み</td>
                        </tr>
                        <tr>
                            <td>学習(training)</td>
                            <td>過去の事例を使った研修</td>
                            <td>過去データからパターンを学ばせる工程</td>
                        </tr>
                        <tr>
                            <td>推論(inference)</td>
                            <td>実務で目の前の案件を判断する</td>
                            <td>学習済みモデルに新しい入力を与えて結果を得る工程</td>
                        </tr>
                        <tr>
                            <td>予測(prediction)</td>
                            <td>判断の結果</td>
                            <td>モデルが出す出力(数値、分類、文章など)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>AI・ML・GenAI の違い(試験ガイド記載の識別ポイント)</strong></p>
            <Diagram id="dgm-1" />
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">区分</th>
                            <th scope="col">何をするか</th>
                            <th scope="col">ビジネス例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI(広い概念)</td>
                            <td>
                                人の知的作業を機械が代替・支援する。ルールベースの仕組みも広義には含まれる
                            </td>
                            <td>問い合わせの自動振り分け</td>
                        </tr>
                        <tr>
                            <td>機械学習(ML)</td>
                            <td>過去データからパターンを学び、予測・分類する</td>
                            <td>解約予測、需要予測、不正検知</td>
                        </tr>
                        <tr>
                            <td>生成 AI(GenAI)</td>
                            <td>
                                学習したパターンをもとに新しいコンテンツ(文章・画像・コードなど)を生み出す
                            </td>
                            <td>議事録の要約、営業メールの下書き、コード補完</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout note">
                <p>
                    <strong>補足解説</strong>: 図の入れ子関係は、AWS の CAF-AI
                    ホワイトペーパーに掲載された「AI・ML・深層学習・生成 AI
                    の分類図」と同じ考え方です。試験では「この課題は ML で足りるのか、生成 AI
                    が必要か」といった区別が問われます。
                </p>
            </blockquote>
            <h3 id="s15">1-2 構造化データと非構造化データ(Skill 1.1.3)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">種類</th>
                            <th scope="col">特徴</th>
                            <th scope="col">例</th>
                            <th scope="col">相性のよい AI の使い方</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>構造化データ</td>
                            <td>行と列で整理され、項目が決まっている</td>
                            <td>売上表、顧客マスタ、在庫、取引履歴</td>
                            <td>需要予測、離反予測、スコアリングなど従来型の ML</td>
                        </tr>
                        <tr>
                            <td>非構造化データ</td>
                            <td>決まった型がない</td>
                            <td>メール、PDF、契約書、通話音声、画像、動画、チャットログ</td>
                            <td>
                                要約、検索、文書抽出、対話といった生成 AI・自然言語処理・画像認識
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>補足解説</strong>: 企業データの多くは非構造化データだと言われます。生成 AI
                の登場で、これまで活用しづらかった文書や会話の価値を引き出せるようになった点が、ビジネスインパクトの源泉です。
            </p>
            <h3 id="s16">1-3 なぜデータ品質が重要か(Skill 1.1.4)</h3>
            <p>
                <strong>原則</strong>: 質の低いデータからは質の低い結果が出ます(Garbage In, Garbage
                Out)。AI の成果は、モデルの賢さ以前に<strong>データの質</strong>に左右されます。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">データ品質の観点</th>
                            <th scope="col">問題が起きた場合のビジネス影響(例)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>正確性</td>
                            <td>誤った顧客情報から誤った提案が出る</td>
                        </tr>
                        <tr>
                            <td>完全性(欠損がない)</td>
                            <td>一部の顧客群が学習に含まれず、精度が偏る</td>
                        </tr>
                        <tr>
                            <td>一貫性</td>
                            <td>部門ごとに定義が違う指標で、比較・集計が食い違う</td>
                        </tr>
                        <tr>
                            <td>鮮度</td>
                            <td>古い価格や規程をもとに回答してしまう</td>
                        </tr>
                        <tr>
                            <td>代表性(偏りがない)</td>
                            <td>特定の属性に不利な判断を生む(公平性のリスク)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>
                    AI 案件の初期に「使うデータは何か、誰が所有し、品質は誰が保証するか」を確認する
                </li>
                <li>データ品質の指標(欠損率、更新頻度など)を決めて定期的に確認する</li>
                <li>
                    「データが整うまで待つ」のではなく、<strong>対象範囲を絞って小さく始め</strong>、データ整備と並行して価値検証を進める
                </li>
            </ul>
            <h3 id="s17">1-4 過去データによる学習の考え方(Skill 1.1.5)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">概念</th>
                            <th scope="col">ビジネス向けの説明</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>学習データ</td>
                            <td>
                                モデルが「お手本」として学ぶ過去の事例。ここに含まれない状況には弱い
                            </td>
                        </tr>
                        <tr>
                            <td>教師あり学習</td>
                            <td>
                                正解(ラベル)付きの過去データから学ぶ。例: 過去の解約有無から解約予測
                            </td>
                        </tr>
                        <tr>
                            <td>教師なし学習</td>
                            <td>正解なしでデータの構造を見つける。例: 顧客のグルーピング</td>
                        </tr>
                        <tr>
                            <td>学習用・検証用・テスト用の分割</td>
                            <td>
                                学習に使っていないデータで性能を確かめ、本番で通用するかを見積もる
                            </td>
                        </tr>
                        <tr>
                            <td>過学習</td>
                            <td>お手本を丸暗記して、新しいデータに弱くなる状態</td>
                        </tr>
                        <tr>
                            <td>履歴データの偏り</td>
                            <td>過去の判断に偏りがあれば、モデルはそれを再現・増幅しうる</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ポイント</strong>:
                「過去がそのまま未来に続く」という前提が崩れると、精度は落ちます(Step 2
                のドリフトにつながります)。
            </p>
            <h3 id="s18">1-5 グローバルな枠組みと共通用語(Skill 1.1.6)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">標準・枠組み</th>
                            <th scope="col">概要</th>
                            <th scope="col">位置づけ</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ISO/IEC 42001</td>
                            <td>
                                AI マネジメントシステム(AIMS)の国際規格。AI
                                を開発・提供・利用する組織向けに、リスク管理や継続的改善の要求事項と指針を定める。ISO
                                9001 や ISO/IEC 27001 と同様のマネジメントシステム規格の構造を持つ
                            </td>
                            <td>組織として AI を統制するための枠組み</td>
                        </tr>
                        <tr>
                            <td>ISO/IEC 23053</td>
                            <td>
                                機械学習を用いた AI
                                システムの枠組みと用語を定める規格(一般的な理解に基づく説明)
                            </td>
                            <td>共通用語の土台</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout">
                <p>
                    <strong>注</strong>: ISO/IEC 23053
                    については、本ガイド作成時に一次情報の本文を取得できていません。規格の正確な範囲は
                    ISO の公式規格ページで確認してください。試験ガイドは 42001 と 23053
                    を「共通語彙とグローバルな枠組みを知っておく例」として挙げています。
                </p>
            </blockquote>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    社内で「AI」「モデル」「エージェント」などの用語の定義をそろえ、経営層・法務・IT・事業部が同じ意味で議論できるようにする
                </li>
                <li>
                    規格は「認証を取ること」自体が目的ではなく、<strong>ガバナンスの設計図として参照</strong>する
                </li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 1</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >AWS CAF-AI ホワイトペーパー(AI・ML・深層学習・生成 AI の分類図)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            >https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">ISO/IEC 42001 の解説(ISO ヘルプセンター)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai"
                            >https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai</a
                        >
                    </li>
                    <li>
                        <span className="src-label">ISO/IEC 42001 の構造の解説(EVS)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://www.evs.ee/en/ai-management-standard"
                            >https://www.evs.ee/en/ai-management-standard</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s19">Step 2 AI ソリューションの種類と選び方(Task 1.2)</h2>
            <h3 id="s20">2-1 ルールベース自動化と AI の使い分け(Skill 1.2.1)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点</th>
                            <th scope="col">ルールベース自動化が向く</th>
                            <th scope="col">AI が向く</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>判断基準</td>
                            <td>明確で安定している(例: 金額が 10 万円以上なら承認者を追加)</td>
                            <td>曖昧・複雑でルール化しきれない(例: 問い合わせ文面の意図把握)</td>
                        </tr>
                        <tr>
                            <td>入力データ</td>
                            <td>構造化されている</td>
                            <td>非構造化データを含む</td>
                        </tr>
                        <tr>
                            <td>結果の許容</td>
                            <td>毎回同じ結果が必須</td>
                            <td>ある程度の確率的なぶれを許容できる</td>
                        </tr>
                        <tr>
                            <td>説明責任</td>
                            <td>判断根拠をルールで完全に説明したい</td>
                            <td>精度向上のメリットが大きく、別途の監視や統制で対応できる</td>
                        </tr>
                        <tr>
                            <td>変化の頻度</td>
                            <td>ルールがほとんど変わらない</td>
                            <td>パターンが多様で、データから学ぶ価値が高い</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-2" />
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>
                    「AI
                    を使うこと」を目的にせず、<strong>最もシンプルで確実な手段から検討</strong>する
                </li>
                <li>
                    ルールベースと AI の<strong>組み合わせ</strong>も有効(例:
                    定型部分はルール、例外判断だけ AI)
                </li>
            </ul>
            <h3 id="s21">2-2 AI エージェントとその他の AI ソリューションの違い(Skill 1.2.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">種類</th>
                            <th scope="col">何をするか</th>
                            <th scope="col">人の関与</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>ルールベース自動化(RPA など)</td>
                            <td>決められた手順を繰り返す</td>
                            <td>手順は人が事前に定義</td>
                        </tr>
                        <tr>
                            <td>生成 AI アシスタント(チャット)</td>
                            <td>質問に応じて文章を生成・回答</td>
                            <td>人が依頼し、結果を確認</td>
                        </tr>
                        <tr>
                            <td><strong>AI エージェント</strong></td>
                            <td>
                                目標を受け取り、<strong>自分で計画を立て、ツールを使い、行動を実行</strong>する
                            </td>
                            <td>目標設定と承認・監督</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>AI エージェントの中核能力(試験ガイド記載の例)</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">能力</th>
                            <th scope="col">やさしい説明</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>自律性(autonomy)</td>
                            <td>逐一指示しなくても、目標に向けて次の手を判断する</td>
                            <td>「今月の未回収請求を整理して」で調査から下書きまで進める</td>
                        </tr>
                        <tr>
                            <td>ツール利用(tool use)</td>
                            <td>社内システムや外部サービスを呼び出して実行する</td>
                            <td>CRM の検索、チケット起票、メール送信</td>
                        </tr>
                        <tr>
                            <td>エージェント間連携</td>
                            <td>複数のエージェントが役割分担して協力する</td>
                            <td>調査担当と文書作成担当が連携</td>
                        </tr>
                        <tr>
                            <td>オーケストレーション戦略</td>
                            <td>複数のエージェントやツールの実行順序・役割・引き継ぎを設計する</td>
                            <td>統括役が各担当に振り分けて結果を統合</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>
                    最初は<strong>参照だけ</strong>の低リスクな業務から始め、更新・送信など<strong>影響の大きい操作には人の承認</strong>を入れる
                </li>
                <li>エージェントに渡す権限は必要最小限にする</li>
                <li>
                    AWS は、自律的な AI システム向けに「Agentic AI Security Scoping
                    Matrix」を公開しており、エージェント導入時のセキュリティ論点整理の参考になります
                </li>
            </ul>
            <h3 id="s22">2-3 モデルドリフトと継続的な監視・更新(Skill 1.2.3)</h3>
            <p>
                AI
                は「作って終わり」ではありません。<strong>現実が変わると精度が落ちる</strong>ためです。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">用語</th>
                            <th scope="col">意味</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>モデルドリフト(広義)</td>
                            <td>時間とともにモデルの性能が低下すること</td>
                            <td>導入時 90% だった正答率が徐々に下がる</td>
                        </tr>
                        <tr>
                            <td>データドリフト</td>
                            <td>入力データの傾向が学習時と変わる</td>
                            <td>新商品の登場で問い合わせ内容が変化</td>
                        </tr>
                        <tr>
                            <td>コンセプトドリフト</td>
                            <td>入力と正解の関係そのものが変わる</td>
                            <td>景気変動で「優良顧客」の条件が変わる</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-3" />
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    <strong
                        >導入前に、性能の許容ライン(しきい値)と、下回った時の担当者・対応手順</strong
                    >を決めておく
                </li>
                <li>業務 KPI(顧客満足度、処理時間)と、モデルの品質指標の両方を見る</li>
                <li>
                    例: Amazon Bedrock Guardrails のドキュメントは、ガードレールを支える基盤モデルが
                    AWS
                    により定期的に更新されるため、<strong>継続してテスト・検証することを推奨</strong>しています。マネージドサービスであっても、利用側の検証は必要という好例です
                </li>
            </ul>
            <h3 id="s23">2-4 シャドー AI と AI ツールの分類(Skill 1.2.4)</h3>
            <p>
                <strong>シャドー AI</strong>とは、IT・セキュリティ部門の承認なしに従業員が使う AI
                ツールのことです。機密情報の入力や、規約違反、監査不能といったリスクを生みます。
            </p>
            <p><strong>対策の柱: AI ツールの透明な分類</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">分類</th>
                            <th scope="col">意味</th>
                            <th scope="col">運用のポイント</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>承認済み(approved)</td>
                            <td>評価を経て利用が認められたツール</td>
                            <td>利用条件(入力してよいデータの範囲)を明示</td>
                        </tr>
                        <tr>
                            <td>評価中(under evaluation)</td>
                            <td>審査・パイロット中</td>
                            <td>限定ユーザー・限定データで試す</td>
                        </tr>
                        <tr>
                            <td>ブロック(blocked)</td>
                            <td>利用禁止</td>
                            <td>禁止理由と代替手段を併せて周知</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    「禁止するだけ」ではなく、<strong>申請しやすい導入窓口と、承認済みの代替ツール</strong>を用意する(禁止だけでは隠れて使われやすい。一般的な実務ガイダンス)
                </li>
                <li>利用ガイドライン(入力してはいけない情報)を教育し、利用状況を把握する</li>
                <li>
                    AWS の Generative AI Security Scoping Matrix では、一般消費者向けの公開 AI
                    サービスの利用(Scope 1)と、SaaS に組み込まれた生成 AI 機能の利用(Scope
                    2)で、利用規約・ライセンス・データ主権などの遵守が重要と整理されています
                </li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 1</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AI Security Scoping Matrix</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/"
                            >https://aws.amazon.com/ai/generative-ai/security/scoping-matrix/</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >AWS Security Blog(Agentic AI Security Scoping Matrix)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/blogs/security/the-agentic-ai-security-scoping-matrix-a-framework-for-securing-autonomous-ai-systems/"
                            >https://aws.amazon.com/blogs/security/the-agentic-ai-security-scoping-matrix-a-framework-for-securing-autonomous-ai-systems/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">What Is Agentic AI?(AWS)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/what-is/agentic-ai/"
                            >https://aws.amazon.com/what-is/agentic-ai/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">How Amazon Bedrock Guardrails works</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/guardrails-how.html</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s24">Step 3 生成 AI の基本技法(Task 1.3)</h2>
            <h3 id="s25">3-1 プロンプトエンジニアリングの基本(Skill 1.3.1)</h3>
            <p>
                <strong>プロンプト</strong>とは、生成 AI に与える指示・入力です。AWS
                のドキュメントは、指示が一貫していて明確で簡潔であるほど望ましい応答が得られると説明しています。
            </p>
            <p><strong>プロンプトの基本要素</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">要素</th>
                            <th scope="col">内容</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>指示</td>
                            <td>何をしてほしいか</td>
                            <td>「以下の顧客レビューを 3 点で要約して」</td>
                        </tr>
                        <tr>
                            <td>コンテキスト</td>
                            <td>背景・役割・対象読者</td>
                            <td>「あなたはカスタマーサポートの管理者です」</td>
                        </tr>
                        <tr>
                            <td>入力データ</td>
                            <td>処理対象</td>
                            <td>レビュー本文</td>
                        </tr>
                        <tr>
                            <td>出力形式の指定</td>
                            <td>形式・長さ・トーン</td>
                            <td>「箇条書き 3 点、各 40 文字以内」</td>
                        </tr>
                        <tr>
                            <td>例(few-shot)</td>
                            <td>望む出力の見本</td>
                            <td>良い要約の例を 1〜2 件</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>AWS ドキュメントが挙げる主な指針</strong></p>
            <ul>
                <li>単純・明確・完全な指示を与え、曖昧さを減らす</li>
                <li>質問や指示はプロンプトの<strong>最後</strong>に置くとよい結果が出やすい</li>
                <li>区切り文字で指示と入力データを分ける</li>
                <li>出力の形式や選択肢を明示する(出力インジケータ)</li>
            </ul>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">悪い例</th>
                            <th scope="col">良い例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>「このテキストを分類して」</td>
                            <td>
                                「次のテキストを 営業 / 法務 / 人事
                                のいずれかに分類し、カテゴリ名のみ出力して」
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li><strong>小さく試して改善を繰り返す</strong>(1 回で完璧を狙わない)</li>
                <li>良いプロンプトは<strong>チームの共有資産</strong>として管理する</li>
                <li>
                    幻覚(事実と異なる出力)の低減には、プロンプトの改善、RAG、別モデルの検討が有効です(AWS
                    ドキュメントの記載)
                </li>
            </ul>
            <h3 id="s26">3-2 トークン制限とコンテキストウィンドウ(Skill 1.3.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">用語</th>
                            <th scope="col">意味</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>トークン</td>
                            <td>
                                AI
                                が文章を処理する最小単位(単語や文字の断片)。料金計算の単位にもなる
                            </td>
                        </tr>
                        <tr>
                            <td>コンテキストウィンドウ</td>
                            <td>モデルが 1 回の処理で扱える情報量(入力と出力の合計)の上限</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>性能に影響する場面</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">状況</th>
                            <th scope="col">起きること</th>
                            <th scope="col">対処の方向性</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>長大な文書を丸ごと渡す</td>
                            <td>上限を超える、または後半・途中の情報が反映されにくい</td>
                            <td>分割、要約してから渡す、RAG で必要部分のみ取り出す</td>
                        </tr>
                        <tr>
                            <td>長い会話を続ける</td>
                            <td>過去のやり取りが押し出される</td>
                            <td>要点を引き継ぐ、会話を区切る</td>
                        </tr>
                        <tr>
                            <td>出力が長い</td>
                            <td>コストと待ち時間が増える</td>
                            <td>出力長を制限、形式を簡潔に</td>
                        </tr>
                        <tr>
                            <td>コスト</td>
                            <td>入力・出力のトークン量に応じて課金されるモデルが多い</td>
                            <td>不要な文脈を減らす</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout">
                <p>
                    Amazon Bedrock の料金ページでは、モデルごとに「100 万入力トークンあたり」「100
                    万出力トークンあたり」の従量料金が示されています。トークン量がコストに直結することの実例です。
                </p>
            </blockquote>
            <h3 id="s27">3-3 モデル適応技法: RAG とファインチューニング(Skill 1.3.3)</h3>
            <p>
                <strong>課題</strong>: 汎用の生成 AI
                は、あなたの会社の最新情報や社内ルールを知りません。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">手法</th>
                            <th scope="col">何をするか</th>
                            <th scope="col">向く場面</th>
                            <th scope="col">主な留意点</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>プロンプト改善</td>
                            <td>指示・例・形式を工夫する</td>
                            <td>まず最初に試す</td>
                            <td>追加の知識は与えられない</td>
                        </tr>
                        <tr>
                            <td><strong>RAG</strong>(検索拡張生成)</td>
                            <td>
                                回答時に社内文書などから関連情報を検索し、プロンプトに添えて生成させる
                            </td>
                            <td>最新情報・社内文書に基づく回答、根拠の提示が必要</td>
                            <td>検索対象データの品質・権限管理が重要</td>
                        </tr>
                        <tr>
                            <td><strong>ファインチューニング</strong></td>
                            <td>
                                追加データでモデルを再学習させ、特定の文体・専門用語・振る舞いを身につけさせる
                            </td>
                            <td>一貫した文体や専門領域の振る舞いが必要</td>
                            <td>学習データの準備、追加コスト、更新の手間</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-4" />
            <p><strong>選び方の流れ(一般的な実務ガイダンス)</strong></p>
            <Diagram id="dgm-5" />
            <p><strong>Amazon Bedrock での位置づけ(戦略レベル)</strong></p>
            <ul>
                <li>
                    <strong>Knowledge Bases</strong>: RAG
                    を管理型で実現する機能。文書を断片化して埋め込みに変換しベクトルインデックスに保存し、実行時に関連情報を取り出して回答を補強する。継続的なモデル再学習なしに自社データを活用でき、取得情報には出典が付くため透明性の向上と幻覚の抑制に役立つ、と
                    AWS は説明している
                </li>
                <li>
                    <strong>モデルのカスタマイズ(ファインチューニング)</strong>:
                    料金ページには、学習(100
                    万トークンあたり)、カスタムモデルの月額保管料、カスタムモデルでの推論の料金が別建てで示されている。推論の料金は対応モデルとデプロイ方式によって異なり、対応モデルではオンデマンド推論も選べる (Provisioned Throughput が必須とは限らない)。<strong
                        >RAG に比べてコスト構造が増える</strong
                    >ことを意識する
                </li>
            </ul>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    <strong>プロンプト改善 → RAG → ファインチューニング</strong
                    >の順に、コストと手間の小さい手段から試す
                </li>
                <li>
                    改善効果は、事前に用意した<strong>評価用の質問セット</strong>で定量的に確認する
                </li>
                <li>
                    RAG
                    では、参照元文書の<strong>アクセス権限と更新運用</strong>をセットで設計する(閲覧権限のない人に機密文書の内容が漏れないようにする。一般的な実務ガイダンス)
                </li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 1</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain1.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">What is prompt engineering?(Amazon Bedrock)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-prompt-engineering.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/what-is-prompt-engineering.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Design a prompt(Amazon Bedrock)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Prompt engineering concepts(Amazon Bedrock)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-engineering-guidelines.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">How Amazon Bedrock knowledge bases work</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html"
                            >https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">Knowledge Bases GA 発表</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/blogs/aws/knowledge-bases-now-delivers-fully-managed-rag-experience-in-amazon-bedrock"
                            >https://aws.amazon.com/blogs/aws/knowledge-bases-now-delivers-fully-managed-rag-experience-in-amazon-bedrock</a
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
                </ul>
            </div>

        </>
    );
};
