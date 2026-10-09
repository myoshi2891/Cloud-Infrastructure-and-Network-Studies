import { Diagram } from '../Diagram';

export function Step10() {
  return (
    <section id="step-10-ai-ai-skill-124">
      <h2>Step 10: AI ツールの分類とシャドー AI 対策 (Skill 1.2.4)</h2>
      <p>
        <strong>試験ガイドの該当スキル</strong>: AI ツールの透明性のある分類 (例:
        承認済み、ブロック、評価中) を確立し、シャドー AI のリスクを軽減できる。
      </p>
      <h3 id="_63">ひとことで言うと</h3>
      <div className="tldr-box">
        <p>
          <strong>
            シャドー AI とは、会社が承認・把握していない AI
            ツールを従業員が業務で使うこと
          </strong>
          です。禁止だけでは防げません。<strong>「承認済み・評価中・ブロック」の一覧を公開し、承認済みの使いやすい代替手段を先に用意する</strong>ことが基本です。
        </p>
      </div>

      <h3 id="_64">詳しい解説</h3>
      <p>
        AWS のブログ (Govern AI Adoption Before It Governs You)
        は、従業員は仕事をしようとしているだけで、規則を破る意図はなく、承認されていない AI
        ツールに情報を貼り付ける行為を止める仕組みがないことが問題だと説明しています。シャドー
        IT は導入に「ソフトウェアのインストール」が必要でしたが、シャドー AI は<strong>ブラウザのタブ 1 つ</strong>で始まります。また、漏れるのはデータだけでなく、<strong>判断の根拠となる推論やビジネスロジック</strong>であり、AI
        の自信に満ちた誤答が本番システムに書き戻され、検証される前に意思決定の根拠になり得る、とも述べています。
      </p>
      <h4 id="_65">主なリスク</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th>リスク</th>
              <th>内容</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>データ漏えい</strong></td>
              <td>
                機密情報、顧客情報、ソースコードなどを承認外のツールに入力してしまう
              </td>
            </tr>
            <tr className="t-even">
              <td><strong>承認済み SaaS に組み込まれた AI</strong></td>
              <td>
                会議ツールや協働ツールが、定期アップデートで AI
                機能を追加する。調達審査の時点では存在しなかった機能が動き出す
              </td>
            </tr>
            <tr className="t-odd">
              <td><strong>プロンプトインジェクション</strong></td>
              <td>
                文書、メール、Web ページに隠された指示を AI が実行してしまう。OWASP
                の LLM 向け Top 10 で最上位 (LLM-01) に挙げられている
              </td>
            </tr>
            <tr className="t-even">
              <td><strong>ハルシネーションによる誤判断</strong></td>
              <td>もっともらしい誤りを根拠に意思決定する</td>
            </tr>
            <tr className="t-odd">
              <td><strong>規制・コンプライアンス違反</strong></td>
              <td>
                規制の観点での説明責任を果たせない (EU AI Act は AI
                システムの一覧の維持を求める)
              </td>
            </tr>
            <tr className="t-even">
              <td><strong>信頼できないモデルのサプライチェーン</strong></td>
              <td>出所や安全性が確認されていないモデル・ツールの利用</td>
            </tr>
            <tr className="t-odd">
              <td><strong>エージェント型のシャドー AI</strong></td>
              <td>
                未承認のエージェントを社内メールや社内システムに接続するなど、監督なしに自律的に動く処理が生まれる
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 id="_66">分類 (ティア) の考え方</h4>
      <p>
        AWS のブログは、<strong>「承認済み・条件付き・制限」の 1 ページの一覧を公開する</strong>ことを勧めています。試験ガイドの例は「承認済み、ブロック、評価中」です。呼び方は違っても、<strong>透明な分類とその根拠の公開</strong>が要点です。
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th>分類</th>
              <th>意味</th>
              <th>典型的な条件</th>
              <th>従業員への案内</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>承認済み (Approved / Green)</strong></td>
              <td>評価済みで、業務利用してよい</td>
              <td>SSO 経由、データの取扱いルールに適合、ログ取得、契約締結済み</td>
              <td>利用方法と入力可能なデータの範囲を明示</td>
            </tr>
            <tr className="t-even">
              <td>
                <strong>評価中・条件付き (Under evaluation / Conditional)</strong>
              </td>
              <td>評価途中、または限定条件つきで許可</td>
              <td>機密でないデータのみ、特定の部門・用途のみ、期間限定</td>
              <td>何を評価しているか、いつ結論が出るかを明示</td>
            </tr>
            <tr className="t-odd">
              <td><strong>ブロック・制限 (Blocked / Restricted)</strong></td>
              <td>リスクが高く利用不可</td>
              <td>機密漏えいの恐れ、規制違反、出所不明</td>
              <td>理由と、代わりに使える承認済みツールを明示</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 id="ai_5">新しい AI ツールの受付フロー</h4>
      <figure className="diagram-figure">
        <Diagram id="d11" />
        <figcaption>図 12</figcaption>
      </figure>
      <h4 id="aws-paved-road">AWS が示す「舗装された道 (paved road)」の考え方</h4>
      <p>
        AWS のブログは、シャドー AI
        は<strong>プロダクト品質の問題</strong>でもある、と述べています。承認済みの道具が遅く、機能も劣るなら、合理的な従業員は迂回します。ブロックを強めると利用は個人の端末・自宅ネットワークへ移り、可視性がゼロになります。だから、<strong>承認済みの経路を、それ以外を選ぶほうが面倒に感じるほど使いやすくする</strong>ことが要点です。
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th>層</th>
              <th>内容</th>
              <th>具体例</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>人の層</strong></td>
              <td>
                部門横断の上級リーダーによる AI
                ガバナンス評議会。どのツールを許可リストに入れるか、どのデータをどのモデルに入れてよいか、エージェントが人の承認なしにどこまで動けるか等を決める
              </td>
              <td>議長と憲章を持ち、定期的に開催する</td>
            </tr>
            <tr className="t-even">
              <td><strong>技術の層 (承認された入口)</strong></td>
              <td>
                従業員が使える承認済みの AI (Amazon Quick、Amazon Bedrock など)
                を、自社の ID 境界の中で提供する
              </td>
              <td>SSO でログインでき、企業データが自社のアカウントに閉じている</td>
            </tr>
            <tr className="t-odd">
              <td><strong>技術の層 (ポリシーと根拠付け)</strong></td>
              <td>ガードレール、社内文書に接続する仕組み (RAG)、機密データの分類</td>
              <td>
                Amazon Bedrock Guardrails、Amazon Bedrock Knowledge Bases、Amazon
                Macie
              </td>
            </tr>
            <tr className="t-even">
              <td><strong>技術の層 (可視化と証跡)</strong></td>
              <td>利用状況のログ、異常検知、規格に対応づけた証跡の収集</td>
              <td>AWS CloudTrail、Amazon GuardDuty、AWS Audit Manager</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 id="30-aws">30 日で始める手順 (AWS のブログの整理)</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th>期間</th>
              <th>やること</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>1 から 2 週目 (発見)</td>
              <td>
                承認済み SaaS に密かに組み込まれた AI 機能を洗い出す。既存の AI
                ツールでプロンプトインジェクションの試験をする
              </td>
            </tr>
            <tr className="t-even">
              <td>2 から 3 週目 (承認済みの入口を作る)</td>
              <td>
                低リスクの用途 (顧客データを含まない社内要約など) を 1 つ選び、SSO
                経由の「グリーン」な選択肢として公開する
              </td>
            </tr>
            <tr className="t-odd">
              <td>3 から 4 週目 (赤線を守らせる)</td>
              <td>
                発見された最高リスクのツールをブロックまたは制限する。<strong>承認済みの代替手段が使えるようになってから</strong>行う
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 id="_67">ベストプラクティス</h3>
      <div className="practice-box">
        <ol>
          <li>
            <strong>分類を透明にして公開する</strong>:
            承認済み・評価中・ブロックの一覧、理由、申請方法を全社に周知する。
          </li>
          <li>
            <strong>禁止する前に代替を用意する</strong>:
            承認済みで、使いやすく、能力が遜色ない選択肢を先に出す。
          </li>
          <li>
            <strong>入力してよいデータの区分を明示する</strong>:
            公開情報、社内限定、機密、個人情報などの区分ごとに使えるツールを決める。
          </li>
          <li>
            <strong>AI ガバナンスの責任主体を持つ</strong>:
            決定権を持つ部門横断の評議会。技術部門任せにしない。
          </li>
          <li>
            <strong>承認済みツールでも継続的に再評価する</strong>:
            新機能の追加で状況が変わる (組み込み型 AI)。
          </li>
          <li>
            <strong>利用状況を可視化して、非公式利用を「責める」より「引き込む」</strong>: 「なぜ承認外を使ったか」を聞き取り、承認済みの改善に生かす。
          </li>
          <li>
            <strong>エージェントの利用も対象にする</strong>:
            自律範囲、承認しきい値、監査証跡を含める。
          </li>
        </ol>
      </div>

      <h3 id="_68">よくある誤解と試験の狙い目</h3>
      <div className="misconception-box">
        <div className="table-wrap">
          <table>
            <thead>
              <tr className="t-head">
                <th>誤解</th>
                <th>正しい理解</th>
              </tr>
            </thead>
            <tbody>
              <tr className="t-odd">
                <td>「AI ツールは全面禁止すれば安全」</td>
                <td>
                  禁止だけでは、利用が見えない場所に移るだけ。代替の提供が必要
                </td>
              </tr>
              <tr className="t-even">
                <td>「シャドー AI は悪意のある従業員の問題」</td>
                <td>多くは業務を早く進めたい善意の行動。仕組みの問題</td>
              </tr>
              <tr className="t-odd">
                <td>「承認済みの SaaS なら AI 機能も承認済み」</td>
                <td>後から追加された AI 機能は別途評価が必要</td>
              </tr>
              <tr className="t-even">
                <td>「ガバナンスは IT 部門が決めればよい」</td>
                <td>リスク許容度・倫理・ブランドは経営を含む部門横断の判断</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          試験の狙い目は、<strong>「透明な分類 (承認済み、評価中、ブロック) と、承認済みの代替手段の提供を組み合わせる」</strong>という設計判断です。
        </p>
      </div>

      <h3 id="_69">根拠となるソース</h3>
      <div className="source-box">
        <ul>
          <li>
            Govern AI Adoption Before It Governs You (AWS Migration &amp; Modernization
            Blog, 2026-08-25):{' '}
            <a
              href="https://aws.amazon.com/blogs/migration-and-modernization/govern-ai-adoption-before-it-governs-you/"
              rel="noopener"
              target="_blank"
            >
              https://aws.amazon.com/blogs/migration-and-modernization/govern-ai-adoption-before-it-governs-you/
            </a>
          </li>
          <li>
            試験ガイド「Technologies and concepts」(シャドー AI のリスクと管理):{' '}
            <a
              href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html
            </a>
          </li>
          <li>
            OWASP Top 10 for Large Language Model Applications:{' '}
            <a
              href="https://owasp.org/www-project-top-10-for-large-language-model-applications/"
              rel="noopener"
              target="_blank"
            >
              https://owasp.org/www-project-top-10-for-large-language-model-applications/
            </a>
          </li>
          <li>
            NIST AI Risk Management Framework:{' '}
            <a
              href="https://www.nist.gov/itl/ai-risk-management-framework"
              rel="noopener"
              target="_blank"
            >
              https://www.nist.gov/itl/ai-risk-management-framework
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
