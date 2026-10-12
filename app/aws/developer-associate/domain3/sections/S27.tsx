import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs27を全文・順序どおり収録。 */
export function S27() { return <>
<h2 id="s27" tabIndex={-1}>{"Step 22：デプロイ戦略（Skill 3.4.5 / 3.4.11）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.5"}</strong>{": デプロイ戦略を使ってアプリケーションバージョンをデプロイする "}<strong>{"Skill 3.4.11"}</strong>{": リリース用のデプロイ戦略（blue/green、canary、rolling など）を設定する"}</p>{" "}</blockquote>
{" "}
<h3>{"22.1 戦略の基本"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 74">
<table>

<thead>

<tr>

<th scope="col">{"戦略"}</th>

<th scope="col">{"仕組み"}</th>

<th scope="col">{"長所"}</th>

<th scope="col">{"短所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"All at once"}</strong></td>

<td>{"全台を一括更新"}</td>

<td>{"最速・単純"}</td>

<td><strong>{"ダウンタイム"}</strong>{"・失敗時の影響大"}</td>

</tr>

<tr>

<td><strong>{"Rolling"}</strong></td>

<td>{"数台ずつ順番に更新"}</td>

<td>{"追加コストなし"}</td>

<td>{"更新中は "}<strong>{"容量が減る"}</strong>{"、新旧が混在"}</td>

</tr>

<tr>

<td><strong>{"Rolling with additional batch"}</strong></td>

<td>{"追加バッチを先に起動してから更新"}</td>

<td><strong>{"容量を維持"}</strong></td>

<td>{"少額の追加コスト"}</td>

</tr>

<tr>

<td><strong>{"Immutable"}</strong></td>

<td><strong>{"新しい Auto Scaling グループ"}</strong>{" に新バージョンを作り、成功後に入れ替え"}</td>

<td>{"安全、ロールバックが速い"}</td>

<td>{"一時的に 2 倍のインスタンス"}</td>

</tr>

<tr>

<td><strong>{"Blue/Green"}</strong></td>

<td><strong>{"別環境（green）"}</strong>{" を用意して切り替え"}</td>

<td>{"即時切替・即時ロールバック"}</td>

<td>{"環境を 2 つ分用意（コスト）"}</td>

</tr>

<tr>

<td><strong>{"Canary"}</strong></td>

<td><strong>{"少量（例 10%）"}</strong>{" に先行して流し、問題なければ残りへ"}</td>

<td>{"影響範囲が小さい"}</td>

<td>{"設定が複雑"}</td>

</tr>

<tr>

<td><strong>{"Linear"}</strong></td>

<td><strong>{"一定割合ずつ"}</strong>{"（例 10% ずつ毎分）増やす"}</td>

<td>{"段階的で監視しやすい"}</td>

<td>{"完了まで時間がかかる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d34" label="Step 22：デプロイ戦略（Skill 3.4.5 / 3.4.11）の図解 d34" />
{" "}
<h3>{"22.2 サービス別の対応表（頻出）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 75">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"選べる戦略"}</th>

<th scope="col">{"設定場所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Elastic Beanstalk"}</strong></td>

<td>{"All at once / Rolling / Rolling with additional batch / Immutable / Traffic splitting。"}<strong>{"Blue/green は CNAME スワップ"}</strong></td>

<td>{"環境の設定（デプロイポリシー）"}</td>

</tr>

<tr>

<td><strong>{"CodeDeploy EC2/オンプレ"}</strong></td>

<td><strong>{"In-place"}</strong>{"（AllAtOnce / HalfAtATime / OneAtATime）と "}<strong>{"Blue/Green"}</strong></td>

<td>{"デプロイ設定"}</td>

</tr>

<tr>

<td><strong>{"CodeDeploy Lambda"}</strong></td>

<td><strong>{"Canary"}</strong>{"、"}<strong>{"Linear"}</strong>{"、"}<strong>{"AllAtOnce"}</strong>{"（エイリアスの重みを移す）"}</td>

<td>{"デプロイ設定"}</td>

</tr>

<tr>

<td><strong>{"CodeDeploy ECS"}</strong></td>

<td><strong>{"Canary"}</strong>{"、"}<strong>{"Linear"}</strong>{"、"}<strong>{"AllAtOnce"}</strong>{"（Blue/Green。ALB のターゲットグループを切替）"}</td>

<td>{"デプロイ設定"}</td>

</tr>

<tr>

<td><strong>{"API Gateway（REST）"}</strong></td>

<td><strong>{"カナリアリリース"}</strong>{"（ステージ内で割合指定）"}</td>

<td>{"ステージ設定"}</td>

</tr>

<tr>

<td><strong>{"AWS AppConfig"}</strong></td>

<td>{"AllAtOnce / Linear / Canary（設定の配信）"}</td>

<td>{"配信戦略"}</td>

</tr>

<tr>

<td><strong>{"ECS ローリング更新"}</strong></td>

<td><code>{"minimumHealthyPercent"}</code>{" / "}<code>{"maximumPercent"}</code>{"。"}<strong>{"デプロイサーキットブレーカー"}</strong>{" で自動ロールバック"}</td>

<td>{"サービス設定"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"💡 CodeDeploy の事前定義設定名の例："}<code>{"CodeDeployDefault.LambdaCanary10Percent5Minutes"}</code>{"、"}<code>{"CodeDeployDefault.LambdaLinear10PercentEvery1Minute"}</code>{"、"}<code>{"CodeDeployDefault.ECSCanary10Percent5Minutes"}</code>{"、"}<code>{"CodeDeployDefault.HalfAtATime"}</code>{"。"}</p>{" "}</blockquote>
{" "}
<h3>{"22.3 SAM で Lambda のカナリアデプロイを設定する"}</h3>
{" "}
<CodeBlock index={29} language="yaml" lines={["Resources:","  OrderFunction:","    Type: AWS::Serverless::Function","    Properties:","      Handler: app.handler","      Runtime: python3.13","      CodeUri: src/orders/","      AutoPublishAlias: live","      DeploymentPreference:","        Type: Canary10Percent5Minutes     # 10% を 5 分間先行 → 問題なければ 100%","        Alarms:","          - !Ref ErrorsAlarm              # このアラームが ALARM になったら自動ロールバック","        Hooks:","          PreTraffic: !Ref PreTrafficFn   # 切替前の検証 Lambda","          PostTraffic: !Ref PostTrafficFn # 切替後の検証 Lambda"]} />
{" "}
<Diagram id="d35" label="Step 22：デプロイ戦略（Skill 3.4.5 / 3.4.11）の図解 d35" />
{" "}
<p><strong>{"ベストプラクティス"}</strong></p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 76">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td>{"本番は "}<strong>{"All at once を避け"}</strong>{"、canary / linear / blue-green を使う"}</td>

<td>{"被害最小化"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"戦略と必ず "}<strong>{"CloudWatch アラーム"}</strong>{"（エラー率・レイテンシ）を組み合わせる"}</td>

<td>{"自動ロールバック"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td><strong>{"ヘルスチェック／検証フック"}</strong>{" を実装する"}</td>

<td>{"異常を早期に検知"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"DB スキーマ変更は "}<strong>{"後方互換"}</strong>{"（新旧が同時に動いても壊れない）に"}</td>

<td>{"新旧混在期間がある"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"dev は簡易（All at once）、prod は慎重、と "}<strong>{"環境で変える"}</strong></td>

<td>{"速度と安全の両立"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"狙われどころ"}</strong>{": 「ダウンタイムなし + 容量維持」→ Rolling with additional batch / Blue-Green。「最も速くロールバック」→ Blue/Green・Immutable。「Lambda を 10% だけ先に」→ CodeDeploy canary（SAM の DeploymentPreference）。「追加コストなしで段階更新」→ Rolling。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"8 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Beanstalk のデプロイポリシー"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/elasticbeanstalk/latest/dg/using-features.rolling-version-deploy.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-configurations.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeDeploy のデプロイ設定"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codedeploy/latest/userguide/deployment-configurations.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"SAM の段階的デプロイ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/automating-updates-to-serverless-apps.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ECS ローリング更新"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AmazonECS/latest/developerguide/deployment-type-ecs.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-circuit-breaker.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ECS サーキットブレーカー"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AmazonECS/latest/developerguide/deployment-circuit-breaker.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/whitepapers/latest/blue-green-deployments/welcome.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Blue/Green Deployments on AWS（ホワイトペーパー）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/whitepapers/latest/blue-green-deployments/welcome.html"}</span></a>
<a className="ref" href="https://martinfowler.com/bliki/BlueGreenDeployment.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Martin Fowler「BlueGreenDeployment」"}</span><span className="ref-url"><b>{"martinfowler.com"}</b>{"/bliki/BlueGreenDeployment.html"}</span></a>
<a className="ref" href="https://martinfowler.com/bliki/CanaryRelease.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Martin Fowler「CanaryRelease」"}</span><span className="ref-url"><b>{"martinfowler.com"}</b>{"/bliki/CanaryRelease.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
