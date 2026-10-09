import { Diagram } from '../Diagram';

export function Step12() {
  return (
    <section id="step-12-skill-132">
      <h2>Step 12: トークン上限とコンテキストウィンドウ (Skill 1.3.2)</h2>
      <p>
        <strong>試験ガイドの該当スキル</strong>:
        トークン制限やコンテキストウィンドウの制約が、生成 AI
        システムの性能に影響する場面を特定できる。
      </p>
      <h3 id="_80">ひとことで言うと</h3>
      <div className="tldr-box">
        <p>
          <strong>
            トークンは AI が文章を処理する最小単位 (単語や文字のかたまり)
            で、コンテキストウィンドウは「一度に扱える作業机の広さ」
          </strong>
          です。机に載る量 (入力と出力の合計)
          には上限があり、超えると処理できない、または重要な情報が抜け落ちます。
        </p>
      </div>

      <h3 id="_81">詳しい解説</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">用語</th>
              <th scope="col">意味</th>
              <th scope="col">ビジネスへの影響</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>トークン</strong></td>
              <td>モデルが処理するテキストの単位。文章はトークンに分割される</td>
              <td>利用料金と処理時間の単位になることが多い</td>
            </tr>
            <tr className="t-even">
              <td><strong>入力トークン</strong></td>
              <td>プロンプト、指示、会話履歴、参照文書などモデルに渡す内容</td>
              <td>多いほどコストと遅延が増える</td>
            </tr>
            <tr className="t-odd">
              <td><strong>出力トークン</strong></td>
              <td>モデルが生成する回答</td>
              <td>上限を設定でき、長い出力はコストが増える</td>
            </tr>
            <tr className="t-even">
              <td><strong>コンテキストウィンドウ</strong></td>
              <td>
                一度のやり取りで扱えるトークンの最大量 (入力と出力を含めた作業記憶)
              </td>
              <td>超えると処理エラーや情報の欠落が起きる</td>
            </tr>
            <tr className="t-odd">
              <td><strong>最大生成長 (max tokens)</strong></td>
              <td>生成する出力の上限</td>
              <td>短い回答で足りる作業では小さくして、コストも抑える</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        チュートリアル記事は、入力トークンと出力トークンがすべてコンテキストウィンドウ内に収まる必要があり、超過すると
        API がエラーを返すと説明しています。AWS の Prescriptive Guidance は、RAG
        で大きなテキストの塊を追加するとトークン使用量 (つまりコスト) が増えるため、<strong>
          RAG の精度とプロンプトの経済性のバランス
        </strong>を、チャンク分割、要約、メタデータによる絞り込みなどで取る必要がある、と述べています。
      </p>
      <h4 id="_82">コンテキストウィンドウに入るもの</h4>
      <figure className="diagram-figure">
        <Diagram id="d13" />
        <figcaption>図 14</figcaption>
      </figure>
      <h4 id="_83">制約が性能に影響する場面 (試験で狙われる)</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">場面</th>
              <th scope="col">起きること</th>
              <th scope="col">対策の方向性</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>非常に長い文書の要約・分析</strong></td>
              <td>文書全体が収まらず、処理できない、または一部が欠ける</td>
              <td>分割して段階的に処理、要点抽出、階層的な要約</td>
            </tr>
            <tr className="t-even">
              <td><strong>長い会話の継続</strong></td>
              <td>過去のやりとりが積み重なり、古い内容が失われる、コストが増える</td>
              <td>履歴の要約、重要事項の再提示、会話の区切り</td>
            </tr>
            <tr className="t-odd">
              <td><strong>RAG で大量の資料を渡す</strong></td>
              <td>
                不要な情報でトークンを消費し、コストと遅延が増え、重要情報が埋もれる
              </td>
              <td>検索精度の向上、チャンクの適切な分割、絞り込み</td>
            </tr>
            <tr className="t-even">
              <td><strong>長い出力の要求</strong></td>
              <td>出力が途中で切れる、コストが増える</td>
              <td>出力を分割して依頼、最大生成長の設計</td>
            </tr>
            <tr className="t-odd">
              <td><strong>繰り返し同じ大きな指示を送る</strong></td>
              <td>毎回同じトークンを処理して無駄なコスト</td>
              <td>共通部分の再利用 (プロンプトキャッシュなどの機能)、指示の簡潔化</td>
            </tr>
            <tr className="t-even">
              <td><strong>多言語・専門表記</strong></td>
              <td>同じ内容でもトークン数が変わり得る</td>
              <td>実際のデータでトークン量を見積もる</td>
            </tr>
          </tbody>
        </table>
      </div>
      <blockquote className="note-callout">
        <p>
          「日本語 1
          文字は何トークンか」など、具体的な換算はモデルごとに異なります。試験や実務では<strong>特定の数値を暗記するより、「トークン量がコスト・遅延・品質に影響する」という関係</strong>を押さえます。
        </p>
      </blockquote>
      <h3 id="_84">ベストプラクティス</h3>
      <div className="practice-box">
        <ol>
          <li>
            <strong>ユースケース設計の初期に、扱う文書量とトークン量を見積もる</strong>:
            長文書や大量の履歴を扱う場合は、コンテキスト上限が設計の制約になる。
          </li>
          <li>
            <strong>必要な情報だけを渡す</strong>:
            何でも詰め込まず、関連性の高い情報を選ぶ (RAG の検索品質が鍵)。
          </li>
          <li>
            <strong>プロンプトを簡潔にする</strong>:
            冗長な指示はコストと遅延の原因になる。
          </li>
          <li>
            <strong>出力の上限を用途に合わせて設定する</strong>:
            分類なら短く、報告書なら長く。
          </li>
          <li>
            <strong>トークン使用量を継続的に監視し、コスト管理に組み込む</strong>:
            料金は消費量に連動する構造が多い (付録 A の料金体系)。
          </li>
          <li>
            <strong>モデルごとの上限は変わる</strong>:
            最新の仕様を確認して選定し、上限の大きいモデルは費用や遅延とのトレードオフも見る。
          </li>
        </ol>
      </div>

      <h3 id="_85">よくある誤解と試験の狙い目</h3>
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
                <td>「コンテキストウィンドウが大きければ何でも入れてよい」</td>
                <td>
                  大量入力はコスト・遅延を増やし、重要情報が埋もれる場合もある
                </td>
              </tr>
              <tr className="t-even">
                <td>「トークン = 単語」</td>
                <td>単語より細かい単位に分かれることがある</td>
              </tr>
              <tr className="t-odd">
                <td>「上限は入力だけに適用される」</td>
                <td>入力と出力の両方が収まる必要がある</td>
              </tr>
              <tr className="t-even">
                <td>「会話が長くても AI は全部覚えている」</td>
                <td>上限を超えた内容は扱えない。管理が必要</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <h3 id="_86">根拠となるソース</h3>
      <div className="source-box">
        <ul>
          <li>
            Grounding and Retrieval Augmented Generation (AWS Prescriptive
            Guidance、トークン予算の最適化):{' '}
            <a
              href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-serverless/grounding-and-rag.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-serverless/grounding-and-rag.html
            </a>
          </li>
          <li>
            Design a prompt (Amazon Bedrock、最大生成長など):{' '}
            <a
              href="https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/bedrock/latest/userguide/design-a-prompt.html
            </a>
          </li>
          <li>
            Amazon Bedrock for Beginners (DEV Community、補足資料 / 第三者記事):{' '}
            <a
              href="https://dev.to/aws/amazon-bedrock-for-beginners-from-first-prompt-to-ai-agent-full-tutorial-12ln"
              rel="noopener"
              target="_blank"
            >
              https://dev.to/aws/amazon-bedrock-for-beginners-from-first-prompt-to-ai-agent-full-tutorial-12ln
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
