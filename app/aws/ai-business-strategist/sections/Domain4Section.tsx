import { Diagram } from '../Diagram';

export const Domain4Section = () => {
    return (
        <>
            <h1 id="s63">
                Domain 4 Business Readiness, Leadership, and AI Transformation(配点 24%)
            </h1>
            <h2 id="s64">Step 10 AI 活用の準備度と成熟度の評価(Task 4.1)</h2>
            <h3 id="s65">10-1 準備度(レディネス)を測る観点(Skill 4.1.1)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点(試験ガイドの例)</th>
                            <th scope="col">確認する問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>リーダーシップの一致</td>
                            <td>経営層は AI の目的・投資・責任について同じ方向を向いているか</td>
                        </tr>
                        <tr>
                            <td>データ品質</td>
                            <td>使うデータは正確で、必要な時に使える状態か</td>
                        </tr>
                        <tr>
                            <td>文化の準備度</td>
                            <td>試行錯誤を許容し、AI を受け入れる風土があるか</td>
                        </tr>
                        <tr>
                            <td>技術基盤</td>
                            <td>AI を動かすための基盤や連携が用意できるか</td>
                        </tr>
                        <tr>
                            <td>ガバナンスの枠組み</td>
                            <td>方針、審査、責任分担が整っているか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>補足解説(AWS CAF の視点)</strong>: AWS Cloud Adoption Framework(AWS
                CAF)は、クラウド導入を
                Business(事業)、People(人材)、Governance(ガバナンス)、Platform(基盤)、Security(セキュリティ)、Operations(運用)の
                6 つの視点で整理します。AI 向けには AWS CAF-AI があり、AI
                の旅路で組織能力が成熟するにつれて必要となる基盤的な能力を整理しています。準備度評価で「事業・人・統制・技術」を漏れなく見る際の型として使えます。
            </p>
            <h3 id="s66">10-2 AI 成熟度モデルで現在地を知る(Skill 4.1.2)</h3>
            <p>
                試験ガイドは、成熟度の段階の例として「実験(experimentation)」から「全社規模での展開(enterprise-scale
                deployment)」までを挙げています。以下は<strong>理解を助けるための説明用モデル</strong>で、試験の段階名と完全一致するとは限りません。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">段階(説明用)</th>
                            <th scope="col">状態</th>
                            <th scope="col">次に必要なこと</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1 探索</td>
                            <td>AI への関心はあるが取り組みは散発的</td>
                            <td>目的の明確化、小さな実験</td>
                        </tr>
                        <tr>
                            <td>2 実験</td>
                            <td>複数の PoC が個別に進む</td>
                            <td>成功基準の統一、共通のガイドライン</td>
                        </tr>
                        <tr>
                            <td>3 本番化</td>
                            <td>いくつかが本番運用に入る</td>
                            <td>運用体制、監視、ガバナンス</td>
                        </tr>
                        <tr>
                            <td>4 全社展開</td>
                            <td>多くの部門で活用され標準化が進む</td>
                            <td>CoE、再利用資産、人材育成</td>
                        </tr>
                        <tr>
                            <td>5 最適化</td>
                            <td>AI が事業の中核に組み込まれ継続的に改善</td>
                            <td>新しいビジネスモデルへの挑戦</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s67">10-3 能力ギャップの特定(Skill 4.1.3)</h3>
            <p><strong>4 つの観点: 人・プロセス・技術・ガバナンス</strong></p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点</th>
                            <th scope="col">ギャップの例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>人</td>
                            <td>AI リテラシー不足、推進役の不在、スキルの偏り</td>
                        </tr>
                        <tr>
                            <td>プロセス</td>
                            <td>案件の受付・優先順位づけ・評価の手順がない</td>
                        </tr>
                        <tr>
                            <td>技術</td>
                            <td>データ連携が不十分、共通基盤がない</td>
                        </tr>
                        <tr>
                            <td>ガバナンス</td>
                            <td>責任の所在が不明、リスク審査の基準がない</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s68">10-4 開発投資の優先順位と成長の道筋(Skill 4.1.4)</h3>
            <Diagram id="dgm-13" />
            <p><strong>ベストプラクティス(一般的な実務ガイダンス)</strong></p>
            <ul>
                <li>現在の成熟度に<strong>合わない大きすぎる目標</strong>は避け、一段階上を狙う</li>
                <li>
                    「技術だけ」でなく、<strong>人・プロセス・ガバナンスに同時に投資</strong>する(技術に偏ると定着しない)
                </li>
            </ul>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 4</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS CAF-AI</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            >https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >AWS
                            CAF(公式ページ。本ガイド作成時に本文は未取得のため最新は要確認)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/cloud-adoption-framework/"
                            >https://aws.amazon.com/cloud-adoption-framework/</a
                        >
                    </li>
                    <li>
                        <span className="src-label">6 つの視点の解説(IBM)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://ibm.com/think/topics/aws-cloud-adoption-framework"
                            >https://ibm.com/think/topics/aws-cloud-adoption-framework</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s69">Step 11 データとインフラの土台づくり(Task 4.2)</h2>
            <h3 id="s70">11-1 データ準備度の評価(Skill 4.2.1)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点</th>
                            <th scope="col">確認する問い</th>
                            <th scope="col">問題があると</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>品質</td>
                            <td>正確・完全・一貫しているか</td>
                            <td>出力の信頼性が下がる</td>
                        </tr>
                        <tr>
                            <td>アクセス性</td>
                            <td>必要な人・システムが、必要な時に使えるか</td>
                            <td>案件が進まない、利用が限定される</td>
                        </tr>
                        <tr>
                            <td><strong>データのサイロ</strong></td>
                            <td>部門ごとに分断されていないか</td>
                            <td>全体像が見えず、価値が限定される</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>:
                ユースケースごとに<strong>必要なデータの棚卸し</strong>(どこにあるか、誰が持つか、品質は、アクセス権は)を行い、ボトルネックを可視化する。
            </p>
            <h3 id="s71">11-2 データ戦略・所有権・共有の枠組み(Skill 4.2.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">要素</th>
                            <th scope="col">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>データ戦略</td>
                            <td>
                                事業目標を達成するためにどのデータを、どう集め・整え・活用するか
                            </td>
                        </tr>
                        <tr>
                            <td>データ所有権(オーナーシップ)</td>
                            <td>データごとに責任者を置き、品質・利用ルールに責任を持たせる</td>
                        </tr>
                        <tr>
                            <td>データ共有の枠組み</td>
                            <td>
                                部門・組織間でデータを安全に共有するルール(目的、範囲、権限、条件)
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    データオーナーを<strong>明確に指名</strong>する(責任者不在のデータは品質が劣化しやすい。一般的な実務ガイダンス)
                </li>
                <li>
                    共有ルールは「<strong>共有しない理由</strong>」ではなく「<strong>安全に共有する方法</strong>」を中心に設計する
                </li>
                <li>
                    関連資料として、AWS は「エージェント型 AI のための 7
                    つの重要なデータ機能」というリソースを公開しています
                </li>
            </ul>
            <h3 id="s72">11-3 技術・インフラの要件を戦略レベルで評価する(Skill 4.2.3)</h3>
            <p>
                <strong>ビジネス職に求められるのは、設計ではなく「何が必要かを見極めること」</strong
                >です。
            </p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点</th>
                            <th scope="col">戦略レベルの問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>計算資源・スケール</td>
                            <td>想定する利用量に耐えられるか。利用が増えた時のコストは</td>
                        </tr>
                        <tr>
                            <td>管理型かカスタムか</td>
                            <td>既製のマネージドサービスで足りるか、独自開発が必要か</td>
                        </tr>
                        <tr>
                            <td>連携</td>
                            <td>既存の業務システムやデータ基盤と連携できるか</td>
                        </tr>
                        <tr>
                            <td>セキュリティ・ガバナンス</td>
                            <td>責任分界とデータ保護の要件を満たせるか</td>
                        </tr>
                        <tr>
                            <td>運用体制</td>
                            <td>本番運用と監視を担える人材・体制があるか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>AWS サービスの戦略的な位置づけ</strong>: Amazon Bedrock
                は基盤モデルを使った生成 AI アプリケーション構築のための管理型サービス、Amazon
                SageMaker AI は ML
                モデルと基盤モデルの構築・学習・デプロイを行う完全マネージドサービスです。「まずマネージドを検討し、必要な場合にカスタム」という選択の枠組みを理解しておきます。
            </p>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 4</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">What is Amazon SageMaker AI?</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html"
                            >https://docs.aws.amazon.com/sagemaker/latest/dg/whatis.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >Data for agentic AI(AWS のリソース。タイトルのみ確認)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/data/resources/data-foundation-for-agentic-ai/"
                            >https://aws.amazon.com/data/resources/data-foundation-for-agentic-ai/</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s73">Step 12 組織変革と AI 人材の育成(Task 4.3)</h2>
            <h3 id="s74">12-1 経営層のスポンサーシップと AI チャンピオン(Skill 4.3.1)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">役割</th>
                            <th scope="col">果たすこと</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>経営スポンサー</td>
                            <td>方針を示し、予算と権限を確保し、障害を取り除く</td>
                        </tr>
                        <tr>
                            <td>AI チャンピオン</td>
                            <td>現場で活用を広め、成功事例や困りごとを橋渡しする</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>:
                スポンサーの関与は<strong>一度きりの宣言ではなく継続的</strong>に(進捗レビューへの参加、成果の発信)。チャンピオンには<strong>時間と裁量</strong>を与える。
            </p>
            <h3 id="s75">12-2 部門横断チームと明確なアカウンタビリティ(Skill 4.3.2)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">メンバー</th>
                            <th scope="col">貢献</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>事業リード</td>
                            <td>課題定義と成果への責任</td>
                        </tr>
                        <tr>
                            <td>技術専門家</td>
                            <td>実装・運用</td>
                        </tr>
                        <tr>
                            <td>法務・コンプライアンス</td>
                            <td>規制・契約の適合</td>
                        </tr>
                        <tr>
                            <td>セキュリティ・データ</td>
                            <td>保護と品質</td>
                        </tr>
                        <tr>
                            <td>現場の代表</td>
                            <td>実業務に合うかの確認</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>: <strong>誰が意思決定し、誰が結果に責任を持つか</strong>を書面で明確にする(RACI
                などの責任分担表が有効。一般的な実務ガイダンス)。
            </p>
            <h3 id="s76">12-3 従業員の不安に応える透明なコミュニケーション(Skill 4.3.3)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">従業員の不安</th>
                            <th scope="col">伝えるべきこと</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>「自分の仕事がなくなるのでは」</td>
                            <td>役割の変化の方針、再教育の機会、AI が担う範囲と人が担う範囲</td>
                        </tr>
                        <tr>
                            <td>「いつから何が変わるのか」</td>
                            <td>導入時期のスケジュール</td>
                        </tr>
                        <tr>
                            <td>「何を期待されるのか」</td>
                            <td>成果に対する期待値と評価の考え方</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>: <strong>早く、正直に、繰り返し</strong
                >伝える。分からないことは「まだ決まっていない」と明示し、決まり次第共有する。双方向の質問窓口を設ける。
            </p>
            <h3 id="s77">12-4 文化的な障壁とリーダーシップの介入(Skill 4.3.4)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">障壁</th>
                            <th scope="col">介入(リーダーの行動)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>リスク回避</td>
                            <td>小さく安全な実験の場を用意し、リスクの上限を明確にする</td>
                        </tr>
                        <tr>
                            <td>変化への抵抗</td>
                            <td>現場を設計に巻き込み、日常業務の具体的な便益を示す</td>
                        </tr>
                        <tr>
                            <td>失敗への恐れ</td>
                            <td>失敗から学ぶことを評価し、責めない。学びを共有する</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s78">12-5 AI リテラシーを高める人材育成(Skill 4.3.5)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">手法</th>
                            <th scope="col">効果</th>
                            <th scope="col">向く対象</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>概念実証(PoC)プログラム</td>
                            <td>実際の課題で体験しながら学ぶ</td>
                            <td>事業部門の推進メンバー</td>
                        </tr>
                        <tr>
                            <td>ハッカソン</td>
                            <td>短期間で創造的に試し、熱量を高める</td>
                            <td>部門横断の参加者</td>
                        </tr>
                        <tr>
                            <td>研修プログラム</td>
                            <td>体系的な知識の底上げ</td>
                            <td>全従業員、管理職</td>
                        </tr>
                        <tr>
                            <td>責任ある AI の研修</td>
                            <td>リスクとルールの理解</td>
                            <td>AI を使うすべての人</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>:
                役割別(経営層、管理職、実務担当、推進者)に<strong>内容と深さを変える</strong>。学んだ直後に<strong>業務で使う機会</strong>を用意する。
            </p>
            <h3 id="s79">12-6 人の役割の移行: 手作業から AI との協働・監督へ(Skill 4.3.6)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">人が得意なこと</th>
                            <th scope="col">AI が得意なこと</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>批判的思考、判断、共感、創造性、文脈の理解</td>
                            <td>大量データの処理、反復作業、高速な下書き・要約</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>方向性</strong>: 人の役割を「手作業の実行」から「AI
                の成果を確認し、判断し、顧客に寄り添う」へ移す。
            </p>
            <p>
                <strong>ベストプラクティス</strong>: 人と AI
                の<strong>役割分担を業務ごとに設計</strong>し、人の役割の新しい価値(判断・共感・関係構築)を明確にして教育する。
            </p>
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 4</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS CAF-AI(People 視点を含む枠組み)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            >https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html</a
                        >
                    </li>
                </ul>
            </div>

            <h2 id="s80">Step 13 パイロットから全社展開へスケールする(Task 4.4)</h2>
            <h3 id="s81">13-1 反復型の変革フェーズ(Skill 4.4.1)</h3>
            <p>
                試験ガイドは、フェーズの例として「構想(envision)、実験(experiment)、ローンチ(launch)、スケール(scale)」を挙げています。
            </p>
            <Diagram id="dgm-14" />
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">フェーズ</th>
                            <th scope="col">目的</th>
                            <th scope="col">主な活動</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>構想</td>
                            <td>価値の仮説を作る</td>
                            <td>課題・ユースケース・成功基準の定義</td>
                        </tr>
                        <tr>
                            <td>実験</td>
                            <td>小さく検証する</td>
                            <td>PoC、データ・技術・リスクの検証</td>
                        </tr>
                        <tr>
                            <td>ローンチ</td>
                            <td>本番で使い始める</td>
                            <td>限定範囲での運用開始、ガバナンス適用</td>
                        </tr>
                        <tr>
                            <td>スケール</td>
                            <td>拡大する</td>
                            <td>他部門・他業務への展開、標準化</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout note">
                <p>
                    <strong>補足</strong>: 一般的な AWS CAF では変革フェーズに Envision / Align /
                    Launch / Scale といった名称が使われます。試験ガイドの表記は「envision,
                    experiment, launch,
                    scale」です。<strong>名称よりも、反復しながら段階的に進む考え方</strong>が重要です。
                </p>
            </blockquote>
            <h3 id="s82">13-2 短期の成功から全社展開へ(Skill 4.4.2)</h3>
            <p><strong>ベストプラクティス</strong></p>
            <ul>
                <li>
                    <strong>価値が見えやすく、リスクが低く、実現しやすい</strong
                    >案件をクイックウィンとして最初に選ぶ
                </li>
                <li>成果と学びを<strong>社内に共有</strong>し、次の展開の支持を得る</li>
                <li>
                    再利用できる部品(プロンプト、評価セット、ガイドライン)を蓄積して展開を加速する
                </li>
            </ul>
            <h3 id="s83">13-3 AI センター・オブ・エクセレンス(CoE)と部門横断の連携(Skill 4.4.3)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">CoE の機能</th>
                            <th scope="col">内容</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>標準とガイドライン</td>
                            <td>利用方針、開発・評価の基準、テンプレート</td>
                        </tr>
                        <tr>
                            <td>再利用資産</td>
                            <td>共通の部品、事例、ナレッジ</td>
                        </tr>
                        <tr>
                            <td>人材育成</td>
                            <td>研修、コミュニティ運営</td>
                        </tr>
                        <tr>
                            <td>案件の受付と支援</td>
                            <td>ユースケースの相談、優先順位づけ、伴走支援</td>
                        </tr>
                        <tr>
                            <td>ガバナンス連携</td>
                            <td>リスク審査や規制対応との橋渡し</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>ベストプラクティス</strong>: CoE
                が<strong>「承認するだけの関所」にならず、現場を支援する</strong>存在になるようにする。中央と各部門の推進役が連携する体制(ハブ・アンド・スポーク型など)も一つの方法(一般的な実務ガイダンス)。
            </p>
            <h3 id="s84">13-4 継続的なフィードバックと成功指標(Skill 4.4.4)</h3>
            <ul>
                <li>利用者フィードバックの窓口(ボタン、アンケート、定期ヒアリング)を設ける</li>
                <li>
                    Step 5 の KPI と<strong>先行指標</strong>で進捗を追い、長期的な価値も追跡する
                </li>
                <li>得られた学びを<strong>ロードマップに反映</strong>する</li>
            </ul>
            <h3 id="s85">13-5 実験段階から本番グレードへの移行(Skill 4.4.5)</h3>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">項目</th>
                            <th scope="col">実験(PoC)</th>
                            <th scope="col">本番グレード</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>対象</td>
                            <td>限定的・小規模</td>
                            <td>実際の業務・顧客・本格的な利用量</td>
                        </tr>
                        <tr>
                            <td>品質基準</td>
                            <td>探索的</td>
                            <td>合意済みの品質・可用性の基準</td>
                        </tr>
                        <tr>
                            <td>ガバナンス</td>
                            <td>簡易</td>
                            <td>リスク審査、承認、記録、規制対応</td>
                        </tr>
                        <tr>
                            <td>運用</td>
                            <td>開発チームの片手間</td>
                            <td>監視、障害対応、サポート体制、コスト管理</td>
                        </tr>
                        <tr>
                            <td>責任</td>
                            <td>曖昧</td>
                            <td>オーナー・責任者が明確</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h3 id="s86">13-6 スケール中の事業継続性と性能の確保(Skill 4.4.6)</h3>
            <p>スケールの各段階で、次の要素を確認します。</p>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">要素</th>
                            <th scope="col">確認すること</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>事業継続</td>
                            <td>障害時の代替手段、切り戻し</td>
                        </tr>
                        <tr>
                            <td>性能</td>
                            <td>利用者増による応答遅延・品質低下がないか</td>
                        </tr>
                        <tr>
                            <td>コスト</td>
                            <td>利用量増加に伴う費用の見通し</td>
                        </tr>
                        <tr>
                            <td>ガバナンス</td>
                            <td>展開先でもリスク審査・方針が守られているか</td>
                        </tr>
                        <tr>
                            <td>人と組織</td>
                            <td>展開先の教育・サポートが追いついているか</td>
                        </tr>
                        <tr>
                            <td>データ</td>
                            <td>新しい対象でも品質とアクセス権が確保されているか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <Diagram id="dgm-15" />
            <div className="src-box">
                <p className="src-head">出典</p>
                <ul className="src-list">
                    <li>
                        <span className="src-label">試験ガイド Domain 4</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html"
                            >https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01-domain4.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label">AWS CAF-AI</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html"
                            >https://docs.aws.amazon.com/whitepapers/latest/aws-caf-for-ai/aws-caf-for-ai.html</a
                        >
                    </li>
                    <li>
                        <span className="src-label"
                            >認定ページ(パイロットから本番へという試験の趣旨)</span
                        ><a
                            target="_blank"
                            rel="noopener"
                            href="https://aws.amazon.com/certification/certified-ai-business-strategist/"
                            >https://aws.amazon.com/certification/certified-ai-business-strategist/</a
                        >
                    </li>
                </ul>
            </div>

        </>
    );
};
