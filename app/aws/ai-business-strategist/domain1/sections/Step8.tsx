import { Diagram } from '../Diagram';

export function Step8() {
  return (
    <section id="step-8-ai-skill-122">
      <h2>Step 8: AI エージェントとは (Skill 1.2.2)</h2>
      <p>
        <strong>試験ガイドの該当スキル</strong>: AI エージェントを他の AI
        ソリューションと区別し、AI エージェントの中核能力
        (自律性、ツール利用、エージェント間通信、オーケストレーション戦略) を特定できる。
      </p>
      <h3 id="_49">ひとことで言うと</h3>
      <div className="tldr-box">
        <p>
          <strong>
            AI
            エージェントは「目標を与えると、自分で考え、ツールを使い、手順を進めて成果を出す
            AI」
          </strong>
          です。質問に答えるだけのチャットボットや、決まった手順を実行するだけの自動化とは、<strong>自律性</strong>で区別されます。
        </p>
      </div>

      <h3 id="_50">詳しい解説</h3>
      <p>
        AWS の学習ページは、AI
        エージェントを「推論、判断、ツール、リソースを柔軟に使う必要がある目標を、自力で達成できるソフトウェアアプリケーション」と説明しています。AWS
        の Prescriptive Guidance
        は、エージェントを「環境を知覚し、目標について推論し、それに応じて行動する自律的なデジタル存在」と定義し、固定ロジックで動く従来のソフトウェアと違って、文脈に応じて振る舞いを変えると述べています。
      </p>
      <h4 id="3">3 つのソリューションの違い</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">観点</th>
              <th scope="col">ルールベース自動化</th>
              <th scope="col">生成 AI アシスタント</th>
              <th scope="col">AI エージェント</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>主な動き</td>
              <td>決まった手順を実行</td>
              <td>質問や指示に応答して文章等を生成</td>
              <td>目標に向けて計画し、複数ステップを実行</td>
            </tr>
            <tr className="t-even">
              <td>自律性</td>
              <td>なし (完全に事前定義)</td>
              <td>低い (人の指示ごとに応答)</td>
              <td><strong>高い</strong> (自分で次の行動を決める)</td>
            </tr>
            <tr className="t-odd">
              <td>ツール利用</td>
              <td>事前に決められた連携</td>
              <td>限定的</td>
              <td><strong>API、データベース、他システムを呼び出す</strong></td>
            </tr>
            <tr className="t-even">
              <td>記憶・文脈</td>
              <td>なし</td>
              <td>会話履歴の範囲</td>
              <td>記憶を保持して長い作業を継続できる</td>
            </tr>
            <tr className="t-odd">
              <td>人の関与</td>
              <td>例外時のみ</td>
              <td>常に (指示と確認)</td>
              <td>承認ポイントを設計して関与</td>
            </tr>
            <tr className="t-even">
              <td>例</td>
              <td>定刻にレポートを転記</td>
              <td>議事録の要約を作る</td>
              <td>問い合わせを受けて在庫を検索し、注文変更の手続きまで進める</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        SAP 向けの AWS ドキュメントは、進化の段階を次のように整理しています (アシスタント →
        ツールを使うエージェント →
        より高度な自律を持つエージェント的システム)。「人の関与が大きい、プロンプト中心の受け身のアシスタント」から始まり、「文脈認識とツール利用を備え、複数ステップを実行するが、ガードレールに従い、プロンプトに依存する初期のエージェント」を経て、「より複雑な推論・計画・記憶を統合する、自律性の高いエージェント的システム」へ進みます。
      </p>
      <h4 id="_51">エージェントの動き: 知覚 → 推論 → 行動 のループ</h4>
      <figure className="diagram-figure">
        <Diagram id="d8" />
        <figcaption>図 9</figcaption>
      </figure>
      <p>
        AWS の Prescriptive Guidance は、この知覚 (perceive)、推論 (reason)、行動 (act)
        のループを、エージェントの動作の基本として示しています。
      </p>
      <h4 id="4">中核能力 (試験ガイドが明示した 4 つ)</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">中核能力</th>
              <th scope="col">意味</th>
              <th scope="col">ビジネスでの理解</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>自律性 (autonomy)</strong></td>
              <td>人が逐一指示しなくても、目標に向けて自分で判断し進める</td>
              <td>「報告書を作って」と頼むだけで、資料集めから下書きまで進める</td>
            </tr>
            <tr className="t-even">
              <td><strong>ツール利用 (tool use)</strong></td>
              <td>外部システム、API、データベース、検索などを呼び出して実行する</td>
              <td>社内の在庫システムを検索し、メールを送る</td>
            </tr>
            <tr className="t-odd">
              <td>
                <strong>エージェント間通信 (agent-to-agent communication)</strong>
              </td>
              <td>複数のエージェントが情報を渡し合い、協調する</td>
              <td>調査エージェントの結果を、執筆エージェントが受け取る</td>
            </tr>
            <tr className="t-even">
              <td><strong>オーケストレーション (orchestration)</strong></td>
              <td>複数のステップやエージェントの流れを調整・管理する</td>
              <td>誰が、いつ、何をするかを統括する司令塔</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        AWS の Prescriptive Guidance は、エージェント基盤 (フレームワーク)
        に求められる要素として、<strong>
          エージェントのオーケストレーション、ツール統合、メモリ管理、ワークフロー定義
          (連鎖、ルーティング、並列化、リフレクションなど)、デプロイと監視
        </strong>を挙げています。また、LLM
        がツール、環境、メモリにアクセスする方法を標準化する仕組みとして、Model Context
        Protocol (MCP) が紹介されています。
      </p>
      <h4 id="_52">オーケストレーション戦略のイメージ</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">構成</th>
              <th scope="col">概要</th>
              <th scope="col">向く場面</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>単一エージェント</strong></td>
              <td>1 つのエージェントが焦点の定まった作業を完結する</td>
              <td>範囲が狭い定型的な依頼</td>
            </tr>
            <tr className="t-even">
              <td><strong>マルチエージェント (階層型)</strong></td>
              <td>統括エージェントが専門エージェントに指示を出す</td>
              <td>複数の専門領域が絡む複雑な業務</td>
            </tr>
            <tr className="t-odd">
              <td><strong>マルチエージェント (分散型)</strong></td>
              <td>対等なエージェントが協調する</td>
              <td>役割が対等で分担できる作業</td>
            </tr>
          </tbody>
        </table>
      </div>
      <figure className="diagram-figure">
        <Diagram id="d9" />
        <figcaption>図 10</figcaption>
      </figure>
      <h3 id="_53">ベストプラクティス</h3>
      <div className="practice-box">
        <ol>
          <li>
            <strong>ビジネス優先度から始める</strong>: AWS
            の戦略ガイドは、認知的な過負荷、意思決定のボトルネック、分断されたワークフローなど、自律性が助けになる領域を特定し、ドメイン固有の課題定義でエージェントの責任範囲を決めるよう勧めています。ツール先行・モデル先行の発想は避けます。
          </li>
          <li>
            <strong>自律の範囲を明確に決める (スコープ)</strong>:
            どのエージェントが組織を代表して行動でき、<strong>取り消せない操作の前にどんな承認しきい値を設けるか</strong>を定義する。
          </li>
          <li>
            <strong>
              エージェントとツール、エージェント同士の接続を「アイデンティティの境界」として扱う
            </strong>: 誰 (どのエージェント) が何にアクセスできるかを権限で制御する。
          </li>
          <li>
            <strong>人の承認 (human-in-the-loop) と監査証跡を設計に入れる</strong>:
            エージェントの登録簿、承認しきい値、実行の記録を用意する。
          </li>
          <li>
            <strong>エージェントを「デジタルなチームメイト」として管理する</strong>:
            役割、責任、成果指標を定めて運用する。
          </li>
          <li>
            <strong>段階的に自律度を上げる</strong>:
            まず低リスクな業務で読み取り中心から始め、実績を見て書き込み・実行権限を広げる。
          </li>
        </ol>
      </div>

      <h3 id="_54">よくある誤解と試験の狙い目</h3>
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
                <td>「エージェント = チャットボット」</td>
                <td>
                  チャットボットは応答が中心。エージェントは目標に向けて計画・ツール実行まで行う
                </td>
              </tr>
              <tr className="t-even">
                <td>「エージェントなら人の確認は不要」</td>
                <td>取り消せない操作や高リスク判断には承認を設ける</td>
              </tr>
              <tr className="t-odd">
                <td>「エージェントは AI モデルそのもの」</td>
                <td>
                  エージェントは、モデルにツール・記憶・オーケストレーションを組み合わせた仕組み
                </td>
              </tr>
              <tr className="t-even">
                <td>「マルチエージェントなら必ず良い」</td>
                <td>複雑さと管理負荷が増える。課題に合う構成を選ぶ</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          試験の狙い目は、<strong>「自律性・ツール利用が決め手」</strong>という区別と、<strong>「エージェントには承認の仕組みとガバナンスが要る」</strong>という点です。
        </p>
      </div>

      <h3 id="_55">根拠となるソース</h3>
      <div className="source-box">
        <ul>
          <li>
            AWS Training &quot;Artificial Intelligence&quot; (AI エージェントの定義):{' '}
            <a
              href="https://aws.amazon.com/training/learn-about/ai/"
              rel="noopener"
              target="_blank"
            >
              https://aws.amazon.com/training/learn-about/ai/
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
            Agentic AI frameworks (AWS Prescriptive
            Guidance、オーケストレーション・ツール統合・メモリ・ワークフロー):{' '}
            <a
              href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/frameworks.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-frameworks/frameworks.html
            </a>
          </li>
          <li>
            Agentic AI (AWS ドキュメント for SAP、進化の段階と単一/マルチエージェント):{' '}
            <a
              href="https://docs.aws.amazon.com/sap/latest/general/rise-agenticai.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/sap/latest/general/rise-agenticai.html
            </a>
          </li>
          <li>
            Operationalizing agentic AI on AWS
            (ビジネス優先度から始める、デジタルチームメイト):{' '}
            <a
              href="https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/strategy-operationalizing-agentic-ai.pdf"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/pdfs/prescriptive-guidance/latest/strategy-operationalizing-agentic-ai/strategy-operationalizing-agentic-ai.pdf
            </a>
          </li>
          <li>
            Govern AI Adoption Before It Governs You (自律の範囲の設定、承認しきい値):{' '}
            <a
              href="https://aws.amazon.com/blogs/migration-and-modernization/govern-ai-adoption-before-it-governs-you/"
              rel="noopener"
              target="_blank"
            >
              https://aws.amazon.com/blogs/migration-and-modernization/govern-ai-adoption-before-it-governs-you/
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
