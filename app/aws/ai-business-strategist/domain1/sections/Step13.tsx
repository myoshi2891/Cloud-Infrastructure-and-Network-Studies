import { Diagram } from '../Diagram';

export function Step13() {
  return (
    <section id="step-13-rag-skill-133">
      <h2>Step 13: モデル適応 RAG とファインチューニング (Skill 1.3.3)</h2>
      <p>
        <strong>試験ガイドの該当スキル</strong>: モデル適応の手法 (例:
        RAG、ファインチューニング) が、特定のビジネスニーズに対する AI
        の応答をどう改善するかを認識している。
      </p>
      <h3 id="_87">ひとことで言うと</h3>
      <div className="tldr-box">
        <p>
          <strong>
            RAG は「カンニングペーパー (社内資料)
            を見せながら答えさせる」方法、ファインチューニングは「特定の話し方や専門性を追加で訓練する」方法
          </strong>
          です。まずプロンプト、次に
          RAG、それでも足りなければファインチューニング、と<strong>簡単なものから段階的に</strong>進めます。
        </p>
      </div>

      <h3 id="_88">詳しい解説</h3>
      <h4 id="_89">基盤モデルの弱点 (なぜ適応が必要か)</h4>
      <p>
        AWS の SageMaker
        ドキュメントは、基盤モデルは通常オフラインで学習されるため、学習後に作られたデータを知らず、一般的なコーパスで学習されているため、ドメイン固有のタスクでは効果が下がる、と説明しています。
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">弱点</th>
              <th scope="col">例</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>最新情報を知らない</td>
              <td>今月改定された社内規程</td>
            </tr>
            <tr className="t-even">
              <td>社内の非公開情報を知らない</td>
              <td>自社の製品マニュアル、契約条件</td>
            </tr>
            <tr className="t-odd">
              <td>自社のトーンや形式に沿わない</td>
              <td>自社の返信スタイル、専門用語</td>
            </tr>
            <tr className="t-even">
              <td>業界の専門用語に弱い</td>
              <td>医療・法律などの領域用語</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h4 id="4_1">4 つの手法の位置づけ</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">手法</th>
              <th scope="col">何をするか</th>
              <th scope="col">モデル本体の変更</th>
              <th scope="col">得意なこと</th>
              <th scope="col">主な留意点</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>プロンプトエンジニアリング</strong></td>
              <td>指示や例を工夫する</td>
              <td>なし</td>
              <td>形式・トーン・簡単な誘導</td>
              <td>モデルが知らない情報は出せない</td>
            </tr>
            <tr className="t-even">
              <td><strong>RAG (検索拡張生成)</strong></td>
              <td>質問に関連する社内文書などを検索し、プロンプトに付けて渡す</td>
              <td><strong>なし</strong></td>
              <td>最新情報、社内知識、根拠の提示</td>
              <td>検索品質・データ品質に依存。トークンが増える</td>
            </tr>
            <tr className="t-odd">
              <td><strong>ファインチューニング</strong></td>
              <td>追加の教師データでモデルを追加学習</td>
              <td><strong>あり</strong></td>
              <td>出力の形式・トーン・専門的な振る舞い</td>
              <td>ラベル付きデータが必要。作成と運用のコスト</td>
            </tr>
            <tr className="t-even">
              <td><strong>継続事前学習など</strong></td>
              <td>ラベルなしの大量データで領域知識を追加学習</td>
              <td>あり</td>
              <td>専門領域の言語理解</td>
              <td>大量データと費用が必要。データ量だけで正当化しない</td>
            </tr>
            <tr className="t-odd">
              <td><strong>蒸留 (distillation)</strong></td>
              <td>大きなモデルの出力で小さなモデルを訓練</td>
              <td>小さなモデルを作る</td>
              <td>コストと遅延の削減</td>
              <td>事前に品質基準を確認したモデルが必要</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        AWS の Prescriptive Guidance は、RAG
        を「基盤モデルが、回答を生成する前に、学習データの外にある権威あるデータソース
        (自社文書など) を参照する」方式と説明しています。構成要素として、<strong>
          基盤モデル (通常は LLM)、ガードレール
          (質問・プロンプト・取得した内容・回答が、正確で責任ある内容か)、オーケストレーター
          (全体の流れの管理)、ユーザー体験、ID とユーザー管理 (アクセス制御)
        </strong>{' '}
        を挙げています。
      </p>
      <h4 id="rag">RAG の流れ</h4>
      <figure className="diagram-figure">
        <Diagram id="d14" />
        <figcaption>図 15</figcaption>
      </figure>
      <p>
        Amazon Bedrock Knowledge Bases は、RAG を Bedrock
        のマネージド機能として提供し、自社データに接続します。AWS の Prescriptive Guidance
        は、RAG
        によってモデルを「汎用の生成器」から「ドメインを理解し、ポリシーに沿った、説明可能な
        AI アシスタント」に近づけられる、と述べています。また、RAG
        では、検索と推論の<strong>監査ログ</strong>、ユーザーのフィードバックによる<strong>修正の回路</strong>、記憶を残すかどうかの<strong>制御</strong>など、企業側の責任も生じます。
      </p>
      <h4 id="rag_1">RAG とファインチューニングの比較</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">観点</th>
              <th scope="col">RAG</th>
              <th scope="col">ファインチューニング</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>解決したい問題</td>
              <td>「知識が足りない・古い」</td>
              <td>「振る舞い・形式・トーンが合わない」</td>
            </tr>
            <tr className="t-even">
              <td>更新のしやすさ</td>
              <td>参照元の文書を改訂し、データソースを同期して更新内容がインデックス化された後に Knowledge Bases へ反映される</td>
              <td>再学習が必要</td>
            </tr>
            <tr className="t-odd">
              <td>根拠の提示</td>
              <td>しやすい (出典を示せる)</td>
              <td>難しい (知識が重みに埋め込まれる)</td>
            </tr>
            <tr className="t-even">
              <td>データの要件</td>
              <td>検索対象の文書 (整備が必要)</td>
              <td>質の高いラベル付きデータ</td>
            </tr>
            <tr className="t-odd">
              <td>導入速度・初期コスト</td>
              <td>比較的早く、低い</td>
              <td>準備と学習に時間・費用がかかる</td>
            </tr>
            <tr className="t-even">
              <td>主なリスク</td>
              <td>検索の失敗、古い・誤った文書の参照</td>
              <td>学習データ内容の再現、更新の難しさ</td>
            </tr>
            <tr className="t-odd">
              <td>アクセス制御</td>
              <td>参照元の文書に権限を適用できる</td>
              <td>学習した情報は重みに含まれ、後から制御しにくい</td>
            </tr>
          </tbody>
        </table>
      </div>
      <blockquote className="note-callout">
        <p>
          上表の「学習した情報が出力に再現され得る」「RAG
          では参照元に権限管理を適用できる」という点は、Amazon Bedrock
          のカスタマイズに関する解説記事 (第三者) が整理しています。設計時は AWS
          の公式ドキュメントで最新の仕様を確認してください。
        </p>
      </blockquote>
      <h4 id="_90">判断フロー: どこまで進めるか</h4>
      <p>
        AWS の「生成 AI
        カスタマイズのスペクトラム」の解説は、<strong>シンプルに始め、必要になったときだけ段階を上げる</strong>、という考え方を示しています。Well-Architected
        の生成 AI レンズも、<strong>
          まずプロンプトエンジニアリング → 必要なら RAG →
          それでも足りなければファインチューニングや継続事前学習
        </strong>の順を推奨し、独自の基盤モデルをゼロから構築するのは資源とコストが最も大きい選択肢としています。
      </p>
      <figure className="diagram-figure">
        <Diagram id="d15" />
        <figcaption>図 16</figcaption>
      </figure>
      <p>
        AWS の解説は、<strong>RAG とファインチューニングの併用</strong>が最も一般的なハイブリッドだと述べています。ファインチューニングで振る舞いや形式を整え、RAG
        で、学習サイクルより速く変化する動的な知識を補う構成です。
      </p>
      <h4 id="_91">ビジネスシナリオで選んでみる</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">シナリオ</th>
              <th scope="col">推奨</th>
              <th scope="col">理由</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>社内規程の最新版に基づいて従業員の質問に答えたい</td>
              <td>RAG</td>
              <td>規程は頻繁に改定される。根拠の提示も必要</td>
            </tr>
            <tr className="t-even">
              <td>顧客への返信を自社の言い回しと形式にそろえたい</td>
              <td>プロンプト → 足りなければファインチューニング</td>
              <td>振る舞い・トーンの問題</td>
            </tr>
            <tr className="t-odd">
              <td>製品マニュアルの Q&amp;A ボットを作りたい</td>
              <td>RAG</td>
              <td>大量の文書から、根拠つきで回答する</td>
            </tr>
            <tr className="t-even">
              <td>専門用語の多い医療・法務文書を高精度で扱いたい</td>
              <td>RAG + ファインチューニングの併用を検討</td>
              <td>知識と専門的な表現の両方が必要</td>
            </tr>
            <tr className="t-odd">
              <td>大型モデルで品質を確認できたが、本番の量ではコストと遅延が課題</td>
              <td>蒸留</td>
              <td>小さなモデルで同等の品質を狙う</td>
            </tr>
            <tr className="t-even">
              <td>「データが大量にあるから」という理由で継続事前学習を検討</td>
              <td>慎重に判断</td>
              <td>データ量だけでは正当化できない</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 id="_92">ベストプラクティス</h3>
      <div className="practice-box">
        <ol>
          <li>
            <strong>簡単な手段から始め、必要になったら上げる</strong>: プロンプト → RAG
            → ファインチューニング → 継続事前学習。
          </li>
          <li>
            <strong>「何が足りないのか」で手法を選ぶ</strong>: 知識不足なら
            RAG、振る舞い不足ならファインチューニング。
          </li>
          <li>
            <strong>RAG の成否は参照データの品質で決まる</strong>:
            古い版の除去、正式版の指定、メタデータ、権限を整備する (Step 4)。
          </li>
          <li>
            <strong>RAG には権限管理を組み込む</strong>: 誰がどの文書を検索できるか。ID
            とアクセス制御を設計に含める。
          </li>
          <li>
            <strong>ガードレールと人の確認を組み合わせる</strong>:
            幻覚や不適切な出力への備え。
          </li>
          <li>
            <strong>効果を測って判断する</strong>:
            モデル評価ツールなどで、導入前後の改善を定量的に確認する。
          </li>
          <li><strong>ハイブリッド構成と蒸留でコストを最適化する</strong>。</li>
          <li><strong>監査ログとフィードバックの回路を用意する</strong>。</li>
        </ol>
      </div>

      <h3 id="_93">よくある誤解と試験の狙い目</h3>
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
                <td>「RAG はモデルを再学習する」</td>
                <td>RAG はモデルを変更せず、検索した情報をプロンプトに追加する</td>
              </tr>
              <tr className="t-even">
                <td>「ファインチューニングで最新情報を覚えさせるのが最善」</td>
                <td>頻繁に変わる知識は RAG が適する</td>
              </tr>
              <tr className="t-odd">
                <td>「ファインチューニングは常に RAG より高品質」</td>
                <td>課題による。多くは RAG やプロンプトで足りる</td>
              </tr>
              <tr className="t-even">
                <td>「データが多いから継続事前学習」</td>
                <td>データ量だけでは根拠にならない</td>
              </tr>
              <tr className="t-odd">
                <td>「独自モデルをゼロから作るのが最も確実」</td>
                <td>最も費用と資源がかかる選択肢。最後の手段</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          試験の狙い目は、<strong>
            「知識の不足 → RAG」「振る舞いの不足 →
            ファインチューニング」「まずは簡単な手段から」
          </strong>という選択の判断です。
        </p>
      </div>

      <h3 id="_94">根拠となるソース</h3>
      <div className="source-box">
        <ul>
          <li>
            The generative AI customization spectrum: From prompt engineering to custom
            models on AWS (AWS ML Blog):{' '}
            <a
              href="https://aws.amazon.com/blogs/machine-learning/the-generative-ai-customization-spectrum-from-prompt-engineering-to-custom-models-on-aws/"
              rel="noopener"
              target="_blank"
            >
              https://aws.amazon.com/blogs/machine-learning/the-generative-ai-customization-spectrum-from-prompt-engineering-to-custom-models-on-aws/
            </a>
          </li>
          <li>
            GENOPS05-BP01 Learn when to customize models (Generative AI Lens,
            Well-Architected):{' '}
            <a
              href="https://docs.aws.amazon.com/it_it/wellarchitected/latest/generative-ai-lens/genops05-bp01.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/it_it/wellarchitected/latest/generative-ai-lens/genops05-bp01.html
            </a>
          </li>
          <li>
            Understanding Retrieval Augmented Generation (AWS Prescriptive Guidance):{' '}
            <a
              href="https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/what-is-rag.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/prescriptive-guidance/latest/retrieval-augmented-generation-options/what-is-rag.html
            </a>
          </li>
          <li>
            Grounding and Retrieval Augmented Generation (AWS Prescriptive Guidance):{' '}
            <a
              href="https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-serverless/grounding-and-rag.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/prescriptive-guidance/latest/agentic-ai-serverless/grounding-and-rag.html
            </a>
          </li>
          <li>
            Retrieval Augmented Generation (Amazon SageMaker AI):{' '}
            <a
              href="https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-customize-rag.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/sagemaker/latest/dg/jumpstart-foundation-models-customize-rag.html
            </a>
          </li>
          <li>
            Submit a model customization job for fine-tuning or continued pre-training
            (Amazon Bedrock):{' '}
            <a
              href="https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-submit.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/bedrock/latest/userguide/model-customization-submit.html
            </a>
          </li>
          <li>
            Model Customization on Amazon Bedrock (第三者の解説、補足):{' '}
            <a
              href="https://hidekazu-konishi.com/entry/model_customization_on_amazon_bedrock.html"
              rel="noopener"
              target="_blank"
            >
              https://hidekazu-konishi.com/entry/model_customization_on_amazon_bedrock.html
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
