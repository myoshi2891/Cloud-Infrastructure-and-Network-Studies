import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs26を全文・順序どおり収録。 */
export function S26() { return <>
<h2 id="s26" tabIndex={-1}>{"Step 21：コミットで起動する CI/CD とワークフローのオーケストレーション（Skill 3.4.6 / 3.4.7）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.4.6"}</strong>{": コードをリポジトリにコミットして、ビルド・テスト・デプロイを起動する "}<strong>{"Skill 3.4.7"}</strong>{": オーケストレーションされたワークフローで、各環境にコードをデプロイする"}</p>{" "}</blockquote>
{" "}
<Diagram id="d33" label="Step 21：コミットで起動する CI/CD とワークフローのオーケストレーション（Skill 3.4.6 / 3.4.7）の図解 d33" />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 72">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"役割"}</th>

<th scope="col">{"要点"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"CodePipeline"}</strong></td>

<td>{"ステージ（Source / Build / Test / Approval / Deploy）をつなぐ"}</td>

<td>{"アーティファクトは "}<strong>{"S3"}</strong>{" 経由で受け渡し。"}<strong>{"V2"}</strong>{" はブランチ・タグ・ファイルパスのトリガーフィルターと変数に対応"}</td>

</tr>

<tr>

<td><strong>{"CodeBuild"}</strong></td>

<td>{"ビルド・テストの実行環境"}</td>

<td><code>{"buildspec.yml"}</code>{"（version 0.2）："}<code>{"phases"}</code>{"（install / pre_build / build / post_build）、"}<code>{"artifacts"}</code>{"、"}<code>{"cache"}</code>{"、"}<code>{"env"}</code></td>

</tr>

<tr>

<td><strong>{"CodeDeploy"}</strong></td>

<td>{"EC2 / Lambda / ECS へ配備"}</td>

<td><code>{"appspec.yml"}</code>{" と "}<strong>{"ライフサイクルフック"}</strong></td>

</tr>

<tr>

<td><strong>{"CloudFormation アクション"}</strong></td>

<td>{"スタックの作成・更新（変更セットの作成 → 実行）"}</td>

<td>{"IaC を段階的に昇格"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<CodeBlock index={27} language="yaml" lines={["# buildspec.yml（抜粋）","version: 0.2","env:","  parameter-store:","    API_ENDPOINT: /myapp/dev/api_endpoint     # 機密は Secrets Manager 参照も可","phases:","  install:","    runtime-versions:","      python: 3.13","  pre_build:","    commands:","      - pip install -r requirements.txt","  build:","    commands:","      - pytest tests/unit","      - sam build","  post_build:","    commands:","      - sam package --s3-bucket $ARTIFACT_BUCKET --output-template-file packaged.yaml","artifacts:","  files:","    - packaged.yaml"]} />
{" "}
<CodeBlock index={28} language="yaml" lines={["# appspec.yml（EC2 / オンプレ向け。アーカイブのルートに置く）","version: 0.0","os: linux","files:","  - source: /","    destination: /var/www/app","hooks:","  BeforeInstall:","    - location: scripts/stop_server.sh","  AfterInstall:","    - location: scripts/install_deps.sh","  ApplicationStart:","    - location: scripts/start_server.sh","  ValidateService:","    - location: scripts/health_check.sh","      timeout: 120"]} />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 73">
<table>

<thead>

<tr>

<th scope="col">{"プラットフォーム"}</th>

<th scope="col">{"主なライフサイクルフック"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"EC2 / オンプレ"}</td>

<td>{"ApplicationStop → BeforeInstall → AfterInstall → ApplicationStart → ValidateService（LB 利用時は BeforeBlockTraffic / AfterBlockTraffic / BeforeAllowTraffic / AfterAllowTraffic も）"}</td>

</tr>

<tr>

<td>{"Lambda"}</td>

<td><strong>{"BeforeAllowTraffic"}</strong>{"、"}<strong>{"AfterAllowTraffic"}</strong>{"（検証用 Lambda を指定）"}</td>

</tr>

<tr>

<td>{"ECS"}</td>

<td>{"BeforeInstall、AfterInstall、AfterAllowTestTraffic、BeforeAllowTraffic、AfterAllowTraffic"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"ベストプラクティス"}</strong>{": ① 本番手前に "}<strong>{"手動承認ステージ"}</strong>{"（SNS 通知）② "}<strong>{"同じアーティファクト"}</strong>{"を各環境にデプロイ ③ CodeBuild のサービスロールは "}<strong>{"最小権限"}</strong>{"、機密は環境変数に平文で置かず "}<strong>{"Parameter Store / Secrets Manager"}</strong>{" ④ "}<strong>{"キャッシュ"}</strong>{"でビルド短縮 ⑤ クロスアカウントは "}<strong>{"KMS カスタマー管理キー + クロスアカウントロール"}</strong>{" ⑥ パイプライン自体もIaC管理 ⑦ 実行失敗は "}<strong>{"EventBridge"}</strong>{" で通知。"}</p>
{" "}
<p><strong>{"狙われどころ"}</strong>{": 「コミットで自動デプロイ」→ CodePipeline の Source 検知（イベント駆動）。「ビルド手順の置き場所」→ "}<code>{"buildspec.yml"}</code>{"。「Lambda デプロイ前後の検証」→ BeforeAllowTraffic / AfterAllowTraffic フック。「EC2 の配置先とスクリプト」→ "}<code>{"appspec.yml"}</code>{"。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"6 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodePipeline の概念"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codepipeline/latest/userguide/concepts.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"手動承認"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codepipeline/latest/userguide/approvals.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codepipeline/latest/userguide/pipeline-types.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"パイプラインタイプ（V1/V2）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codepipeline/latest/userguide/pipeline-types.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"buildspec リファレンス"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codebuild/latest/userguide/build-spec-ref.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AppSpec フック"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"クロスアカウントのパイプライン"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codepipeline/latest/userguide/pipelines-create-cross-account.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
