import { Checklist } from '../Checklist';
/** 原本のs31を全文・順序どおり収録。 */
export function S31() { return <>
<h2 id="s31" tabIndex={-1}>{"Step 26：総合演習（練習問題・チェックリスト）"}</h2>
{" "}
<h3>{"練習問題"}</h3>
{" "}
<p><strong>{"Q1."}</strong>{" Lambda の依存ライブラリが解凍後 400MB になった。最も適切な対応は？"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<strong>{"コンテナイメージ"}</strong>{"でデプロイする（上限 10GB）。zip（レイヤー込み）は解凍後 250MB まで。"}
</details>
{" "}
<p><strong>{"Q2."}</strong>{" 本番の Lambda を、まず 10% のトラフィックだけ新バージョンに流し、エラーが出たら自動で戻したい。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
{"SAM の "}<strong>{"DeploymentPreference（Canary10Percent5Minutes）+ CloudWatch アラーム"}</strong>{"（実体は CodeDeploy）。"}
</details>
{" "}
<p><strong>{"Q3."}</strong>{" API Gateway（REST）でメソッドを追加したが、ステージに反映されない。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<strong>{"API を再デプロイ"}</strong>{"していない。変更後はステージへデプロイが必要。"}
</details>
{" "}
<p><strong>{"Q4."}</strong>{" エッジ最適化 API に独自ドメインを設定したい。証明書はどこに作る？"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<strong>{"us-east-1 の ACM"}</strong>{" に証明書を作成する。"}
</details>
{" "}
<p><strong>{"Q5."}</strong>{" EC2 へ CodeDeploy で配備したら appspec.yml が見つからないと失敗した。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<code>{"appspec.yml"}</code>{" を"}<strong>{"アーカイブのルート"}</strong>{"に置く。"}
</details>
{" "}
<p><strong>{"Q6."}</strong>{" ダウンタイムなし・容量維持・追加コスト小で Beanstalk を更新したい。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<strong>{"Rolling with additional batch"}</strong>{"（さらに安全性重視なら Immutable）。"}
</details>
{" "}
<p><strong>{"Q7."}</strong>{" 再デプロイせずに設定を安全に変更し、異常時は自動で戻したい。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<strong>{"AWS AppConfig"}</strong>{"（段階的配信 + CloudWatch アラーム + Validator）。"}
</details>
{" "}
<p><strong>{"Q8."}</strong>{" 更新前に「どのリソースが置き換えられるか」を確認したい。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
{"CloudFormation の"}<strong>{"変更セット"}</strong>{"。"}
</details>
{" "}
<p><strong>{"Q9."}</strong>{" API 定義は共通のまま、dev / prod で呼ぶ Lambda を切り替えたい。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<strong>{"ステージ変数"}</strong>{"（"}<code>{"${stageVariables.lambdaAlias}"}</code>{"）+ "}<strong>{"Lambda エイリアス"}</strong>{"。Lambda に呼び出し権限の付与が必要。"}
</details>
{" "}
<p><strong>{"Q10."}</strong>{" コンテナイメージを確実に固定して本番に出したい。"}</p>
{" "}
<details>
<summary>{"答えを見る"}</summary>
<strong>{"不変タグまたはダイジェスト"}</strong>{"で指定し、"}<code>{"latest"}</code>{" は使わない。"}
</details>
{" "}
<h3>{"最終チェックリスト"}</h3>
{" "}
<Checklist />
{" "}
<hr />
{" "}
</>; }
