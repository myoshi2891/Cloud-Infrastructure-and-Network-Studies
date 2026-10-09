export function AppendixB() {
  return (
    <section id="b">
      <h2>付録 B: 間違えやすいポイント総整理</h2>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">#</th>
              <th scope="col">紛らわしい 2 つ</th>
              <th scope="col">見分け方</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>1</td>
              <td>AI と ML と生成 AI</td>
              <td>
                入れ子 (AI ⊃ ML ⊃ ディープラーニング ⊃ 生成 AI)。生成 AI
                は新しいコンテンツを作る
              </td>
            </tr>
            <tr className="t-even">
              <td>2</td>
              <td>アルゴリズムとモデル</td>
              <td>アルゴリズム = 学び方、モデル = 学習の結果</td>
            </tr>
            <tr className="t-odd">
              <td>3</td>
              <td>学習と推論</td>
              <td>学習 = 作る工程、推論 = 使う工程</td>
            </tr>
            <tr className="t-even">
              <td>4</td>
              <td>構造化と非構造化</td>
              <td>表形式で定義済み、対、型が決まっていない (文章・画像・音声)</td>
            </tr>
            <tr className="t-odd">
              <td>5</td>
              <td>データ量と品質</td>
              <td>量が多くても品質が低ければ成果は出ない</td>
            </tr>
            <tr className="t-even">
              <td>6</td>
              <td>ISO/IEC 23053 と 42001</td>
              <td>
                23053 = ML システムの記述の枠組み、42001 = AI マネジメントシステム
                (認証可能)
              </td>
            </tr>
            <tr className="t-odd">
              <td>7</td>
              <td>ルールベースと AI</td>
              <td>ルールを書き出せる・例外が少ない → ルール。曖昧・多様 → AI</td>
            </tr>
            <tr className="t-even">
              <td>8</td>
              <td>チャットボットと AI エージェント</td>
              <td>応答が中心か、目標に向けて自律的にツールを使い実行するか</td>
            </tr>
            <tr className="t-odd">
              <td>9</td>
              <td>データドリフトとコンセプトドリフト</td>
              <td>入力データの性質の変化、対、入力と正解の関係そのものの変化</td>
            </tr>
            <tr className="t-even">
              <td>10</td>
              <td>禁止と分類</td>
              <td>禁止だけでは防げない。透明な分類 + 承認済みの代替手段</td>
            </tr>
            <tr className="t-odd">
              <td>11</td>
              <td>プロンプトと RAG</td>
              <td>プロンプトは指示の工夫、RAG は外部知識の取り込み</td>
            </tr>
            <tr className="t-even">
              <td>12</td>
              <td>RAG とファインチューニング</td>
              <td>知識不足 → RAG、振る舞い不足 → ファインチューニング</td>
            </tr>
            <tr className="t-odd">
              <td>13</td>
              <td>トークンとコンテキストウィンドウ</td>
              <td>処理の単位、対、一度に扱える総量 (入力 + 出力)</td>
            </tr>
            <tr className="t-even">
              <td>14</td>
              <td>継続事前学習とファインチューニング</td>
              <td>
                前者はラベルなしの大量データで領域知識、後者は目的別の追加学習。どちらも後段の選択肢
              </td>
            </tr>
            <tr className="t-odd">
              <td>15</td>
              <td>蒸留と RAG</td>
              <td>蒸留 = 小さなモデルを作りコストを下げる、RAG = 知識を外から補う</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 id="_95">試験の解き方のコツ (この試験の性格に沿って)</h3>
      <ol>
        <li>
          <strong>技術の細部より、ビジネス判断の軸を探す</strong>:
          「コスト」「リスク」「実現可能性」「根拠」「説明責任」のどれが問われているか。
        </li>
        <li>
          <strong>「最初に」「まず」と問われたら、簡単で低コストな手段を選ぶ</strong>:
          プロンプト → RAG → ファインチューニングの順。
        </li>
        <li>
          <strong>極端な選択肢を疑う</strong>: 「全面禁止」「完全自動化」「AI
          を一切使わない」は不正解になりやすい。
        </li>
        <li>
          <strong>複数選択問題は、選択肢が「すべてビジネス上の合理性」を満たしているか確認する</strong>。
        </li>
        <li>
          <strong>「人の確認」「継続的な監視」「透明性」「ガバナンス」が含まれる選択肢は有力</strong>。
        </li>
      </ol>
    </section>
  );
}
