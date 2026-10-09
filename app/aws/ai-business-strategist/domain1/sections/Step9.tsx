import { Diagram } from '../Diagram';

export function Step9() {
  return (
    <section id="step-9-skill-123">
      <h2>Step 9: 継続的な監視とモデルドリフト (Skill 1.2.3)</h2>
      <p>
        <strong>試験ガイドの該当スキル</strong>: AI
        ソリューションに継続的な監視と更新が必要な理由を、モデルドリフトと性能変化の検知・是正の観点から説明できる。
      </p>
      <h3 id="_56">ひとことで言うと</h3>
      <div className="tldr-box">
        <p>
          <strong>AI は「作って終わり」ではありません</strong>
          。世の中とデータが変わると、モデルの精度は静かに落ちていきます。この劣化
          (ドリフト) を早く見つけて直す仕組みが要ります。
        </p>
      </div>

      <h3 id="_57">詳しい解説</h3>
      <p>
        AWS の SageMaker Model Monitor の説明は、ML
        モデルの精度は時間とともに劣化することがあり、これを<strong>モデルドリフト</strong>と呼ぶと述べています。原因は入力特徴の変化など多様で、さらに<strong>コンセプトドリフト</strong>{' '}
        (入力と望ましい出力の関係そのものが変わることによる劣化) も精度に影響します。入力データの分布が変わる<strong>データドリフト</strong>とは区別します。
      </p>
      <h4 id="_58">ドリフトの種類</h4>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">種類</th>
              <th scope="col">何が変わるか</th>
              <th scope="col">例</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td><strong>データドリフト</strong></td>
              <td>
                本番で入ってくるデータの統計的な性質が、学習時のデータから離れていく
              </td>
              <td>新商品の投入で購買データの傾向が変わる</td>
            </tr>
            <tr className="t-even">
              <td><strong>コンセプトドリフト</strong></td>
              <td>「入力と正解の関係」そのものが変わる</td>
              <td>不正の手口が変わり、過去のパターンが通用しなくなる</td>
            </tr>
            <tr className="t-odd">
              <td><strong>モデル品質の劣化</strong></td>
              <td>精度などの性能指標が下がる</td>
              <td>予測の当たる率が下がる</td>
            </tr>
            <tr className="t-even">
              <td><strong>バイアスのドリフト</strong></td>
              <td>予測の偏りが時間とともに変わる</td>
              <td>学習時と異なる住宅ローン金利のもとで、住宅価格予測に偏りが出る</td>
            </tr>
            <tr className="t-odd">
              <td><strong>特徴量の寄与のドリフト</strong></td>
              <td>どの入力が予測に効いているかの構成が変わる</td>
              <td>以前は効いていた要因が効かなくなる</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        AWS のドキュメントは、本番の ML
        モデルが受け取るデータは学習用に丁寧に整えられたデータほどきれいではなく、本番データの統計的性質が学習時のベースラインから離れるとモデルの予測精度が落ち始める、と説明しています。バイアスのドリフトについては、学習データと本番のデータが異なるときにバイアスが生じたり拡大したりし得ること、その変化が一時的な場合も恒久的な場合もあることを述べ、住宅価格予測モデルの例
        (学習時と現在の住宅ローン金利の差で出力が偏る) を挙げています。
      </p>
      <h4 id="_59">監視と是正のループ</h4>
      <figure className="diagram-figure">
        <Diagram id="d10" />
        <figcaption>図 11</figcaption>
      </figure>
      <h4 id="aws">AWS での監視の例 (ビジネスレベルの理解でよい)</h4>
      <p>
        Amazon SageMaker Model Monitor は、本番の ML
        モデルを自動で監視し、品質の問題が起きたときに通知するサービスで、ルールでドリフトを検知してアラートを出します。監視の種類として、<strong>
          データ品質、モデル品質
          (精度など)、バイアスのドリフト、特徴量寄与のドリフト
        </strong>が挙げられています。データ品質 (入力データのドリフト) の監視では、学習データから作った基準線 (ベースライン) と本番の入力データを継続的に比べます。ただし、これは入力の変化を捉えるもので、予測の正確さは測れません。精度などのモデル品質の監視は、予測結果を後から得られる正解ラベル (グラウンドトゥルース) と突き合わせて行う別の仕組みです。
      </p>
      <blockquote className="note-callout">
        <p>
          <strong>最新状況の注意</strong>: 確認時点で、SageMaker Model Monitor
          の公式ページには「新規のお客様には提供されていない」旨の案内があります
          (既存の顧客は通常どおり利用可能)。試験は<strong>「ドリフトを検知して対処する仕組みが必要」という概念</strong>を問うものであり、特定のサービス名の暗記が目的ではありません。実際のサービス選定は、その時点の
          AWS 公式情報で確認してください。
        </p>
      </blockquote>
      <h4 id="ai_4">生成 AI の監視は何を見るか</h4>
      <p>
        従来型 ML の「精度」に加え、生成 AI では次のような観点が加わります
        (ビジネス職が把握すべき観点の整理)。
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr className="t-head">
              <th scope="col">観点</th>
              <th scope="col">例</th>
            </tr>
          </thead>
          <tbody>
            <tr className="t-odd">
              <td>回答の正確性・根拠</td>
              <td>ハルシネーションの発生率、出典の妥当性</td>
            </tr>
            <tr className="t-even">
              <td>安全性・有害性</td>
              <td>不適切な出力、機密情報の流出</td>
            </tr>
            <tr className="t-odd">
              <td>参照データの鮮度</td>
              <td>RAG の参照元が古くなっていないか</td>
            </tr>
            <tr className="t-even">
              <td>ユーザーの評価</td>
              <td>役に立ったか、修正された頻度</td>
            </tr>
            <tr className="t-odd">
              <td>コスト・遅延</td>
              <td>トークン使用量、応答時間</td>
            </tr>
            <tr className="t-even">
              <td>モデル更新の影響</td>
              <td>基盤モデルのバージョン変更で挙動が変わっていないか</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3 id="_60">ベストプラクティス</h3>
      <div className="practice-box">
        <ol>
          <li>
            <strong>導入前に「何をもって劣化とみなすか」を決める</strong>: 成果指標
            (KPI) と許容しきい値、基準線を最初に定義する。
          </li>
          <li>
            <strong>監視の責任者を決める</strong>:
            誰がアラートを受け、誰が判断し、誰が再学習や停止を決めるのかを明確にする
            (ガバナンスの役割分担)。
          </li>
          <li>
            <strong>フィードバック経路を作る</strong>:
            現場の「おかしい」を集める仕組みを業務に組み込む。
          </li>
          <li>
            <strong>更新の計画を予算に含める</strong>: 再学習、データ更新、RAG
            参照元の更新、評価の工数を継続コストとして見積もる。
          </li>
          <li>
            <strong>緊急時の停止・切り戻し手順を用意する</strong>:
            品質が急に悪化したときに、AI を止めて人手運用に戻せるようにする。
          </li>
          <li>
            <strong>変化が起こりやすい前提を把握する</strong>:
            季節性、規制変更、新商品、顧客行動の変化、市場ショックなど。
          </li>
        </ol>
      </div>

      <h3 id="_61">よくある誤解と試験の狙い目</h3>
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
                <td>「出荷時に精度が高ければ、その後も高い」</td>
                <td>環境とデータが変わるので、精度は落ち得る</td>
              </tr>
              <tr className="t-even">
                <td>「ドリフトは技術者だけの問題」</td>
                <td>
                  ビジネス成果に直結する。責任者と予算を決めるのは経営・事業側
                </td>
              </tr>
              <tr className="t-odd">
                <td>「監視は障害が起きたときにやる」</td>
                <td>静かな劣化を早期に検知するため、常時の監視が必要</td>
              </tr>
              <tr className="t-even">
                <td>「再学習すれば必ず直る」</td>
                <td>データ品質・前提の変化も含めて原因を調べる</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          試験の狙い目は、<strong>「AI の運用は継続的な監視と更新が前提」</strong>という結論を、シナリオで選べるかどうかです。
        </p>
      </div>

      <h3 id="_62">根拠となるソース</h3>
      <div className="source-box">
        <ul>
          <li>
            Data and model quality monitoring with Amazon SageMaker Model Monitor (AWS
            Docs):{' '}
            <a
              href="https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/sagemaker/latest/dg/model-monitor.html
            </a>
          </li>
          <li>
            Amazon SageMaker Model Monitor
            (製品ページ、モデルドリフトとコンセプトドリフトの説明):{' '}
            <a
              href="https://www.amazonaws.cn/en/sagemaker/model-monitor/"
              rel="noopener"
              target="_blank"
            >
              https://www.amazonaws.cn/en/sagemaker/model-monitor/
            </a>
          </li>
          <li>
            Bias drift for models in production (AWS Docs、住宅価格予測の例):{' '}
            <a
              href="https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-bias-drift.html
            </a>
          </li>
          <li>
            Feature attribution drift for models in production (AWS Docs):{' '}
            <a
              href="https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-feature-attribution-drift.html"
              rel="noopener"
              target="_blank"
            >
              https://docs.aws.amazon.com/sagemaker/latest/dg/clarify-model-monitor-feature-attribution-drift.html
            </a>
          </li>
          <li>
            Detecting data drift using Amazon SageMaker (AWS Architecture Blog):{' '}
            <a
              href="https://aws.amazon.com/blogs/architecture/detecting-data-drift-using-amazon-sagemaker/"
              rel="noopener"
              target="_blank"
            >
              https://aws.amazon.com/blogs/architecture/detecting-data-drift-using-amazon-sagemaker/
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
