export function AppendixD() {
  return (
    <section id="d">
      <h2>付録 D: 用語集</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">用語</th>
              <th scope="col">英語</th>
              <th scope="col">意味</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>人工知能</td>
              <td>AI (Artificial Intelligence)</td>
              <td>人間の知能を要する作業を行う、または模倣する機械の広い分野</td>
            </tr>
            <tr className="t-even">
              <td>機械学習</td>
              <td>ML (Machine Learning)</td>
              <td>データから規則性を学ぶ AI の手法</td>
            </tr>
            <tr className="t-odd">
              <td>ディープラーニング</td>
              <td>Deep Learning</td>
              <td>多層のニューラルネットワークを使う ML の手法</td>
            </tr>
            <tr className="t-even">
              <td>生成 AI</td>
              <td>GenAI (Generative AI)</td>
              <td>文章・画像・コードなど新しいコンテンツを生み出す AI</td>
            </tr>
            <tr className="t-odd">
              <td>基盤モデル</td>
              <td>Foundation Model (FM)</td>
              <td>大規模データで事前学習された大規模モデル。多用途に転用できる</td>
            </tr>
            <tr className="t-even">
              <td>大規模言語モデル</td>
              <td>LLM</td>
              <td>言語を扱う大規模な基盤モデル</td>
            </tr>
            <tr className="t-odd">
              <td>アルゴリズム</td>
              <td>Algorithm</td>
              <td>データからパターンを見つける手順</td>
            </tr>
            <tr className="t-even">
              <td>モデル</td>
              <td>Model</td>
              <td>学習の結果得られたパターンの塊</td>
            </tr>
            <tr className="t-odd">
              <td>学習</td>
              <td>Training</td>
              <td>データからモデルを作る工程</td>
            </tr>
            <tr className="t-even">
              <td>推論</td>
              <td>Inference</td>
              <td>学習済みモデルで新しい入力から結果を得る工程</td>
            </tr>
            <tr className="t-odd">
              <td>予測</td>
              <td>Prediction</td>
              <td>推論の出力</td>
            </tr>
            <tr className="t-even">
              <td>構造化データ</td>
              <td>Structured data</td>
              <td>スキーマが定義された表形式のデータ</td>
            </tr>
            <tr className="t-odd">
              <td>非構造化データ</td>
              <td>Unstructured data</td>
              <td>決まった型がないデータ (文章、画像、音声など)</td>
            </tr>
            <tr className="t-even">
              <td>データ品質</td>
              <td>Data quality</td>
              <td>正確性・完全性・鮮度・代表性などデータの良さ</td>
            </tr>
            <tr className="t-odd">
              <td>ラベル</td>
              <td>Label</td>
              <td>教師あり学習での正解</td>
            </tr>
            <tr className="t-even">
              <td>モデルドリフト</td>
              <td>Model drift</td>
              <td>時間とともにモデルの精度が劣化する現象</td>
            </tr>
            <tr className="t-odd">
              <td>データドリフト</td>
              <td>Data drift</td>
              <td>入力データの分布 (統計的な性質) が学習時から変化すること</td>
            </tr>
            <tr className="t-even">
              <td>コンセプトドリフト</td>
              <td>Concept drift</td>
              <td>
                入力と望ましい出力 (正解) の関係そのものが変わること
              </td>
            </tr>
            <tr className="t-odd">
              <td>ベースライン</td>
              <td>Baseline</td>
              <td>比較の基準になる、学習時のデータの特性</td>
            </tr>
            <tr className="t-even">
              <td>ルールベース自動化</td>
              <td>Rule-based automation</td>
              <td>人が定めた規則で動く自動化</td>
            </tr>
            <tr className="t-odd">
              <td>AI エージェント</td>
              <td>AI agent</td>
              <td>目標に向けて推論し、ツールを使い、自律的に実行する AI</td>
            </tr>
            <tr className="t-even">
              <td>オーケストレーション</td>
              <td>Orchestration</td>
              <td>複数のステップやエージェントの流れを調整すること</td>
            </tr>
            <tr className="t-odd">
              <td>MCP</td>
              <td>Model Context Protocol</td>
              <td>LLM が外部のツールやデータに接続する方法を標準化する仕組み</td>
            </tr>
            <tr className="t-even">
              <td>シャドー AI</td>
              <td>Shadow AI</td>
              <td>組織が承認・把握していない AI ツールの業務利用</td>
            </tr>
            <tr className="t-odd">
              <td>ガードレール</td>
              <td>Guardrails</td>
              <td>入出力を安全・適切に保つための制御</td>
            </tr>
            <tr className="t-even">
              <td>プロンプト</td>
              <td>Prompt</td>
              <td>AI への指示・入力</td>
            </tr>
            <tr className="t-odd">
              <td>フューショット</td>
              <td>Few-shot</td>
              <td>出力の見本を数件示すプロンプトの手法</td>
            </tr>
            <tr className="t-even">
              <td>温度</td>
              <td>Temperature</td>
              <td>出力の創造性 (ばらつき) を調整するパラメータ</td>
            </tr>
            <tr className="t-odd">
              <td>トークン</td>
              <td>Token</td>
              <td>モデルが処理するテキストの単位</td>
            </tr>
            <tr className="t-even">
              <td>コンテキストウィンドウ</td>
              <td>Context window</td>
              <td>一度に扱えるトークンの最大量</td>
            </tr>
            <tr className="t-odd">
              <td>RAG</td>
              <td>Retrieval Augmented Generation</td>
              <td>検索した情報を渡して回答を生成させる手法</td>
            </tr>
            <tr className="t-even">
              <td>ファインチューニング</td>
              <td>Fine-tuning</td>
              <td>追加データでモデルを追加学習すること</td>
            </tr>
            <tr className="t-odd">
              <td>継続事前学習</td>
              <td>Continued pre-training</td>
              <td>ラベルなしの大量データで領域知識を追加学習すること</td>
            </tr>
            <tr className="t-even">
              <td>蒸留</td>
              <td>Distillation</td>
              <td>大きなモデルの出力で小さなモデルを訓練すること</td>
            </tr>
            <tr className="t-odd">
              <td>ハルシネーション</td>
              <td>Hallucination</td>
              <td>もっともらしいが誤った出力</td>
            </tr>
            <tr className="t-even">
              <td>AIMS</td>
              <td>AI Management System</td>
              <td>ISO/IEC 42001 が定める AI マネジメントシステム</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
