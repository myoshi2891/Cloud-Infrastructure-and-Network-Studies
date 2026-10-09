import { Diagram } from '../Diagram';

export function Step11() {
  return (
    <>
      <h1 className="task-heading" id="task-13-ai">
        Task 1.3 生成 AI の概念と手法
      </h1>
      <blockquote className="note-callout">
        <p>
          Task 1.3: Apply GenAI concepts and techniques.<br />
          生成 AI の概念と手法を、ビジネス成果のために適用できること。
        </p>
      </blockquote>
      <section id="step-11-skill-131">
        <h2>Step 11: プロンプトエンジニアリングの基本 (Skill 1.3.1)</h2>
        <p>
          <strong>試験ガイドの該当スキル</strong>: 望ましい AI
          の出力を得るために、基本的なプロンプトエンジニアリングの原則を適用できる。
        </p>
        <h3 id="_70">ひとことで言うと</h3>
        <div className="tldr-box">
          <p>
            <strong>プロンプトは「AI への仕事の依頼書」</strong>
            です。曖昧な依頼は曖昧な成果物を生みます。<strong>目的・背景・条件・出力形式を明確に書き、試して改善する</strong>のが基本です。
          </p>
        </div>

        <h3 id="_71">詳しい解説</h3>
        <p>
          Amazon Bedrock のプロンプト設計ガイドは、LLM
          は<strong>シンプルで率直な指示</strong>で最もよく働き、タスクの期待を明確に記述して曖昧さを減らすことで、モデルが意図を正しく解釈できる、と説明しています。例として、分類の問題では、選択肢を明示的に「カテゴリ」として示すことが良い書き方とされています。
        </p>
        <h4 id="_72">良いプロンプトの要素</h4>
        <div className="table-wrap">
          <table>
            <thead>
              <tr className="t-head">
                <th>要素</th>
                <th>内容</th>
                <th>例</th>
              </tr>
            </thead>
            <tbody>
              <tr className="t-odd">
                <td><strong>役割</strong></td>
                <td>AI にどの立場で答えさせるか</td>
                <td>「あなたは B2B 企業のカスタマーサクセス担当です」</td>
              </tr>
              <tr className="t-even">
                <td><strong>目的・タスク</strong></td>
                <td>何をしてほしいか (具体的に)</td>
                <td>「以下の問い合わせに対する返信案を作成してください」</td>
              </tr>
              <tr className="t-odd">
                <td><strong>背景・文脈</strong></td>
                <td>判断に必要な情報</td>
                <td>顧客の契約プラン、過去のやりとり</td>
              </tr>
              <tr className="t-even">
                <td><strong>条件・制約</strong></td>
                <td>守るべきルール</td>
                <td>「200 字以内、丁寧語、価格の約束はしない」</td>
              </tr>
              <tr className="t-odd">
                <td><strong>出力形式</strong></td>
                <td>望む形の指定</td>
                <td>「見出し 3 つと箇条書きで」「JSON で」</td>
              </tr>
              <tr className="t-even">
                <td><strong>例 (ショット)</strong></td>
                <td>望む出力の見本</td>
                <td>良い返信例を 1 から 2 件示す</td>
              </tr>
              <tr className="t-odd">
                <td><strong>入力データ</strong></td>
                <td>処理対象</td>
                <td>問い合わせ本文</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>Bedrock のガイドは、次のような実践も挙げています。</p>
        <ul>
          <li><strong>指示や質問はプロンプトの最後に置くと結果が良い</strong></li>
          <li><strong>区切り文字を使い、入力データと指示を分ける</strong> (API 利用時)</li>
          <li><strong>出力インジケーター</strong>で、期待する出力の始まりの形を示す</li>
          <li>汎化のための良い実践、そしてテキスト要約などタスク別の最適化</li>
        </ul>
        <h4 id="_73">推論パラメータ (ビジネス職は「何のつまみか」を理解する)</h4>
        <div className="table-wrap">
          <table>
            <thead>
              <tr className="t-head">
                <th>パラメータ</th>
                <th>役割</th>
                <th>ビジネス上の使い分け</th>
              </tr>
            </thead>
            <tbody>
              <tr className="t-odd">
                <td><strong>温度 (temperature)</strong></td>
                <td>
                  応答の「創造性」を調整する。低いと決定的で安定、高いと多様で創造的
                </td>
                <td>事実に基づく回答・分類は低く、アイデア出しは高く</td>
              </tr>
              <tr className="t-even">
                <td><strong>最大生成長 (max tokens)</strong></td>
                <td>生成するトークン数の上限</td>
                <td>
                  感情分類のように短い回答で足りる作業では小さく設定してコストも抑える
                </td>
              </tr>
              <tr className="t-odd">
                <td><strong>Top-p</strong></td>
                <td>選ばれ得るトークンの確率の範囲を絞る</td>
                <td>出力のばらつきを調整する</td>
              </tr>
              <tr className="t-even">
                <td><strong>停止シーケンス</strong></td>
                <td>この文字列が出たら生成を止める</td>
                <td>出力形式の制御</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="_74">プロンプト改善のサイクル</h4>
        <figure className="diagram-figure">
          <Diagram id="d12" />
          <figcaption>図 13</figcaption>
        </figure>
        <h4 id="_75">悪い例と良い例</h4>
        <div className="table-wrap">
          <table>
            <thead>
              <tr className="t-head">
                <th></th>
                <th>プロンプト</th>
                <th>何が問題 / 良い点</th>
              </tr>
            </thead>
            <tbody>
              <tr className="t-odd">
                <td>悪い例</td>
                <td>「この顧客に返信して」</td>
                <td>目的、条件、形式、トーンが不明。何を前提にすべきか分からない</td>
              </tr>
              <tr className="t-even">
                <td>良い例</td>
                <td>
                  「あなたは当社のカスタマーサポートです。以下の問い合わせに対する返信案を作成してください。条件:
                  200
                  字以内、丁寧語、返金の約束はしない、不明点は担当者に確認する旨を伝える。出力:
                  件名と本文。問い合わせ: (ここに本文)」
                </td>
                <td>
                  役割、タスク、条件、形式、入力が明確で、指示と入力データが分かれている
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 id="_76">プロンプトでできることの限界</h4>
        <p>
          プロンプトを工夫しても、<strong>モデルが持っていない最新情報や社内の非公開情報</strong>は出せません。その場合は
          RAG (Step 13) が必要です。また、生成 AI は<strong>もっともらしい誤り (ハルシネーション)</strong>
          を出すことがあるため、重要な判断では人の確認が必要です。
        </p>
        <h3 id="_77">ベストプラクティス</h3>
        <div className="practice-box">
          <ol>
            <li>
              <strong>指示は具体的・簡潔・完全に</strong>:
              曖昧さを減らし、期待を明示する。
            </li>
            <li>
              <strong>入力データと指示を区切る</strong>:
              区切り文字や見出しで分け、誤解を避ける。
            </li>
            <li>
              <strong>出力形式を指定する</strong>: 後工程 (表、JSON、定型文)
              で使える形にそろえる。
            </li>
            <li>
              <strong>例を見せる (フューショット)</strong>: 望む出力の見本を 1 から 2
              件添えると安定する。
            </li>
            <li>
              <strong>複雑な依頼は分割する</strong>: 一度に多くを頼まず、段階に分ける。
            </li>
            <li>
              <strong>テストして改善する</strong>:
              複数の入力パターンで試し、評価基準で確かめる。
            </li>
            <li>
              <strong>プロンプトを資産として管理する</strong>:
              テンプレート化し、バージョン管理と共有の仕組みを持つ (Amazon Bedrock Prompt
              Management のような機能もあります)。
            </li>
            <li>
              <strong>機密情報を入力しない運用ルール</strong>を併せて周知する (Step 10)。
            </li>
            <li>
              <strong>プロンプトは「最初の手段」</strong>:
              モデル適応の階段では最初に試す低コストな手段 (Step 13)。
            </li>
          </ol>
        </div>

        <h3 id="_78">よくある誤解と試験の狙い目</h3>
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
                  <td>「プロンプトは長ければ良い」</td>
                  <td>長さではなく、明確さと具体性が重要</td>
                </tr>
                <tr className="t-even">
                  <td>「プロンプトを工夫すれば何でも答えられる」</td>
                  <td>モデルが知らない社内情報は出せない。RAG などが必要</td>
                </tr>
                <tr className="t-odd">
                  <td>「一度作れば完成」</td>
                  <td>試行と改善が前提。モデルの更新でも挙動は変わる</td>
                </tr>
                <tr className="t-even">
                  <td>「温度を上げれば正確になる」</td>
                  <td>温度が高いほど多様で創造的。事実重視なら低くする</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <h3 id="_79">根拠となるソース</h3>
        <div className="source-box">
          <ul>
            <li>
              Design a prompt (Amazon Bedrock User Guide):{' '}
              <a
                href="https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html"
                rel="noopener"
                target="_blank"
              >
                https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html
              </a>
            </li>
            <li>
              General guidelines for Amazon Bedrock LLM users:{' '}
              <a
                href="https://docs.aws.amazon.com/bedrock/latest/userguide/general-guidelines-for-bedrock-users.html"
                rel="noopener"
                target="_blank"
              >
                https://docs.aws.amazon.com/bedrock/latest/userguide/general-guidelines-for-bedrock-users.html
              </a>
            </li>
            <li>
              試験ガイド「Technologies and concepts」(プロンプトエンジニアリングの基礎):{' '}
              <a
                href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html"
                rel="noopener"
                target="_blank"
              >
                https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/aib-01-technologies-concepts.html
              </a>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
