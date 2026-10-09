export function AppendixA() {
  return (
    <section id="a-aws">
      <h2>付録 A: 試験に出る AWS サービスとフレームワーク (ビジネスレベル)</h2>
      <p>
        試験ガイドは、AWS サービスを<strong>「基本的な応用のみ (basic application only)」</strong>の範囲で対象とし、技術的な実装や設定は範囲外としています。認定ページも、この試験は
        AWS
        サービスの知識を評価するものではなく、戦略的な意思決定力を測る、と説明しています。したがって、<strong>「何のためのサービスか」「どんな場面で選ぶか」</strong>を説明できれば十分です。
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">名称</th>
              <th scope="col">分類</th>
              <th scope="col">ビジネスレベルの理解</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>Amazon Bedrock</strong></td>
              <td>生成 AI プラットフォーム</td>
              <td>
                複数の基盤モデルを単一の API で利用し、RAG (Knowledge
                Bases)、ガードレール
                (Guardrails)、エージェント、モデルカスタマイズ、料金体系などをマネージドで提供する。推論はサービス側が運用するモデルデプロイ用アカウントで処理され、入出力はモデル提供者と共有されず、モデル学習にも使われない。データの保持はモデルや設定 (ログ記録など) によって異なる
              </td>
            </tr>
            <tr className="t-even">
              <td><strong>Amazon SageMaker AI</strong></td>
              <td>カスタム ML</td>
              <td>
                独自の ML
                モデルを作る・管理する場面。マネージドかカスタムかの選択で、より高い制御が必要なときに使う
              </td>
            </tr>
            <tr className="t-odd">
              <td><strong>Amazon Quick</strong></td>
              <td>AI 搭載のビジネスアシスタント / BI</td>
              <td>
                従業員向けの AI
                アシスタントとして、メール、文書、データ分析などを支援する (BI
                としての基本的な応用)
              </td>
            </tr>
            <tr className="t-even">
              <td><strong>AWS Cloud Adoption Framework (AWS CAF)</strong></td>
              <td>クラウド戦略</td>
              <td>
                組織横断で AI 施策を計画・拡大するための枠組み (CAF-AI は
                AI・ML・生成 AI 向け)
              </td>
            </tr>
            <tr className="t-odd">
              <td><strong>AWS 責任共有モデル</strong></td>
              <td>ガバナンス</td>
              <td>
                AI
                ワークロードでのデータ保護やコンプライアンスの責任分担をガバナンスの観点で理解する
              </td>
            </tr>
            <tr className="t-even">
              <td>
                <strong>Well-Architected Framework (Responsible AI Lens)</strong>
              </td>
              <td>ガバナンスのベストプラクティス</td>
              <td>責任ある AI のためのベストプラクティス</td>
            </tr>
            <tr className="t-odd">
              <td><strong>AWS AI サービスの料金体系</strong></td>
              <td>コスト</td>
              <td>従量課金 (消費ベース)、インスタンスベース、シートベースなど</td>
            </tr>
            <tr className="t-even">
              <td><strong>AWS Pricing Calculator / Cost Explorer</strong></td>
              <td>コスト計画</td>
              <td>事前の見積もり / 利用実績の分析</td>
            </tr>
            <tr className="t-odd">
              <td><strong>Savings Plans</strong></td>
              <td>コスト最適化</td>
              <td>使用量のコミットによる割引</td>
            </tr>
            <tr className="t-even">
              <td><strong>AWS Marketplace</strong></td>
              <td>調達</td>
              <td>
                自前構築・購入・提携 (build-buy-partner)
                の判断で、サードパーティの製品を検討する
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 id="step">学習した Step との対応</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">付録の項目</th>
              <th scope="col">関連する Step</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>Bedrock Knowledge Bases</td>
              <td>Step 13 (RAG)</td>
            </tr>
            <tr className="t-even">
              <td>Bedrock Guardrails</td>
              <td>Step 10, 13 (ポリシー、ガードレール)</td>
            </tr>
            <tr className="t-odd">
              <td>Bedrock モデルカスタマイズ</td>
              <td>Step 5, 13 (ファインチューニング)</td>
            </tr>
            <tr className="t-even">
              <td>Bedrock / Quick を承認済みの入口に</td>
              <td>Step 10 (シャドー AI 対策)</td>
            </tr>
            <tr className="t-odd">
              <td>SageMaker Model Monitor (ドリフト検知の例)</td>
              <td>Step 9</td>
            </tr>
            <tr className="t-even">
              <td>CAF-AI</td>
              <td>Step 2, Domain 4</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
