import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs7を全文・順序どおり収録。 */
export function S7() { return <>
<h2 id="s7" tabIndex={-1}>{"Step 5：リソース要件（メモリ・CPU）（Skill 3.1.4）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.1.4"}</strong>{": アプリケーションのリソース要件（メモリ、コア数など）を適用する"}</p>{" "}</blockquote>
{" "}
<h3>{"5.1 サービスごとの「リソース指定」の違い"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 15">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"指定するもの"}</th>

<th scope="col">{"補足"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWS Lambda"}</strong></td>

<td><strong>{"メモリ（128 MB〜10,240 MB）"}</strong>{"、タイムアウト（最大 15 分）、一時ストレージ（/tmp）"}</td>

<td><strong>{"CPU は直接指定できず、メモリに比例して割り当て"}</strong></td>

</tr>

<tr>

<td><strong>{"Amazon ECS（Fargate）"}</strong></td>

<td>{"タスクの "}<strong>{"vCPU とメモリ"}</strong>{" の組み合わせ"}</td>

<td>{"許可された組み合わせのみ（例：0.25 vCPU は 0.5〜2 GB）"}</td>

</tr>

<tr>

<td><strong>{"Amazon ECS（EC2）"}</strong></td>

<td>{"コンテナごとの CPU ユニットとメモリ"}</td>

<td><code>{"memory"}</code>{" は "}<strong>{"ハード制限"}</strong>{"、"}<code>{"memoryReservation"}</code>{" は "}<strong>{"ソフト制限"}</strong></td>

</tr>

<tr>

<td><strong>{"EC2 / Elastic Beanstalk"}</strong></td>

<td><strong>{"インスタンスタイプ"}</strong></td>

<td>{"用途別（汎用・コンピュート最適化・メモリ最適化）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"5.2 Lambda：メモリを増やすと CPU も増える"}</h3>
{" "}
<Diagram id="d6" label="Step 5：リソース要件（メモリ・CPU）（Skill 3.1.4）の図解 d6" />
{" "}
<ul>
{" "}
<li>{"約 "}<strong>{"1,769 MB で 1 vCPU 相当"}</strong>{" になります。"}</li>
{" "}
<li><strong>{"ポイント"}</strong>{"：メモリを上げて実行時間が大きく短縮されれば、"}<strong>{"総コストが下がる"}</strong>{" こともあります。最適値は "}<strong>{"計測"}</strong>{" で決めます（AWS Lambda Power Tuning などのツールが使われます）。"}</li>
{" "}
<li><strong>{"メモリ不足"}</strong>{"："}<code>{"Runtime exited with error: signal: killed"}</code>{" やメモリ超過メッセージ → メモリを増やす。"}</li>
{" "}
<li><strong>{"タイムアウト"}</strong>{"：処理が長い場合は、タイムアウト値の引き上げ、処理の分割（Step Functions、SQS）を検討します。"}</li>
{" "}
</ul>
{" "}
<h3>{"5.3 SAM テンプレートでリソース要件を設定する"}</h3>
{" "}
<CodeBlock index={5} language="yaml" lines={["Globals:","  Function:","    Runtime: python3.13","    MemorySize: 512          # 全関数の既定メモリ","    Timeout: 10              # 秒","","Resources:","  ReportFunction:","    Type: AWS::Serverless::Function","    Properties:","      Handler: app.handler","      CodeUri: src/report/","      MemorySize: 1769       # この関数だけ個別に上書き","      Timeout: 60","      EphemeralStorage:","        Size: 2048           # /tmp を 2GB に拡張（MB単位）"]} />
{" "}
<h3>{"5.4 ECS のタスク定義でのリソース指定（抜粋）"}</h3>
{" "}
<CodeBlock index={6} language="json" lines={["{","  \"family\": \"orders-api\",","  \"requiresCompatibilities\": [\"FARGATE\"],","  \"networkMode\": \"awsvpc\",","  \"cpu\": \"512\",","  \"memory\": \"1024\",","  \"containerDefinitions\": [","    {","      \"name\": \"app\",","      \"image\": \"123456789012.dkr.ecr.ap-northeast-1.amazonaws.com/orders:1.4.2\",","      \"memory\": 1024","    }","  ]","}"]} />
{" "}
<h3>{"5.5 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 16">
<table>

<thead>

<tr>

<th scope="col">{"#"}</th>

<th scope="col">{"ベストプラクティス"}</th>

<th scope="col">{"理由"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"推測ではなく計測"}</strong>{" してサイズを決める（CloudWatch、Power Tuning、Compute Optimizer）"}</td>

<td>{"過不足を避ける"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"環境ごとに "}<strong>{"サイズを変えてよい"}</strong>{"（dev は小さく、prod は十分に）"}</td>

<td>{"コスト最適化"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"リソース設定は "}<strong>{"IaC に明記"}</strong>{" する"}</td>

<td>{"再現性と変更履歴"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"Lambda の "}<strong>{"タイムアウトは必要最小限"}</strong>{" に設定"}</td>

<td>{"暴走時の課金・影響を抑える"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"ECS は "}<strong>{"タスクとコンテナの制限の整合"}</strong>{" をとる"}</td>

<td>{"配置失敗・OOM Kill を防ぐ"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"定期的に "}<strong>{"見直す"}</strong>{"（トラフィック増減に合わせる）"}</td>

<td>{"劣化の早期発見"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"5.6 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 17">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Lambda の処理が遅い。CPU を増やしたい"}</td>

<td><strong>{"メモリを増やす"}</strong>{"（CPU は直接設定できない）"}</td>

</tr>

<tr>

<td><code>{"/tmp"}</code>{" に大きなファイルを置きたい"}</td>

<td><strong>{"EphemeralStorage"}</strong>{" を拡張（最大 10,240 MB）"}</td>

</tr>

<tr>

<td>{"Lambda の最大実行時間"}</td>

<td><strong>{"15 分"}</strong></td>

</tr>

<tr>

<td>{"Fargate で指定する必須項目"}</td>

<td><strong>{"タスクレベルの cpu と memory"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"5 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-memory.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda メモリ設定"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/configuration-memory.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda クォータ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/gettingstarted-limits.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definition_parameters.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ECS タスク定義のパラメータ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AmazonECS/latest/developerguide/task_definition_parameters.html"}</span></a>
<a className="ref" href="https://github.com/alexcasalboni/aws-lambda-power-tuning" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind oss">{"GitHub"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS Lambda Power Tuning（OSS）"}</span><span className="ref-url"><b>{"github.com"}</b>{"/alexcasalboni/aws-lambda-power-tuning"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/wellarchitected/latest/serverless-applications-lens/welcome.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Serverless Applications Lens"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/wellarchitected/latest/serverless-applications-lens/welcome.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
