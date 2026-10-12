import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs5を全文・順序どおり収録。 */
export function S5() { return <>
<h2 id="s5" tabIndex={-1}>{"Step 3：ファイルとディレクトリ構造（Skill 3.1.2）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.1.2"}</strong>{": アプリケーションのデプロイ用にファイルとディレクトリ構造を整理する"}</p>{" "}</blockquote>
{" "}
<h3>{"3.1 なぜ構造が大切なのか"}</h3>
{" "}
<p>{"デプロイツールは "}<strong>{"「決まった場所」に「決まった名前」のファイルがあること"}</strong>{" を前提に動きます。名前や場所を間違えると、デプロイが失敗します。"}</p>
{" "}
<h3>{"3.2 AWS のツールが探す「決まったファイル」"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 8">
<table>

<thead>

<tr>

<th scope="col">{"ツール"}</th>

<th scope="col">{"必要なファイル"}</th>

<th scope="col">{"置き場所"}</th>

<th scope="col">{"役割"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"AWS CodeBuild"}</td>

<td><code>{"buildspec.yml"}</code></td>

<td>{"ソースのルート（既定）"}</td>

<td>{"ビルド手順の定義"}</td>

</tr>

<tr>

<td>{"AWS CodeDeploy（EC2/オンプレ）"}</td>

<td><code>{"appspec.yml"}</code></td>

<td><strong>{"アーカイブのルート"}</strong></td>

<td>{"配置先とライフサイクルフックの定義"}</td>

</tr>

<tr>

<td>{"AWS CodeDeploy（Lambda / ECS）"}</td>

<td>{"AppSpec（YAML または JSON）"}</td>

<td>{"デプロイ時に指定"}</td>

<td>{"切り替えるバージョンやタスク定義"}</td>

</tr>

<tr>

<td>{"AWS SAM"}</td>

<td><code>{"template.yaml"}</code>{"、"}<code>{"samconfig.toml"}</code></td>

<td>{"プロジェクトのルート"}</td>

<td>{"アプリ全体の定義・デプロイ設定"}</td>

</tr>

<tr>

<td>{"AWS CloudFormation"}</td>

<td>{"テンプレート（YAML/JSON）"}</td>

<td>{"任意（S3 または手元）"}</td>

<td>{"インフラの定義"}</td>

</tr>

<tr>

<td>{"Elastic Beanstalk"}</td>

<td><code>{".ebextensions/*.config"}</code>{"、"}<code>{"Procfile"}</code>{" など"}</td>

<td>{"ソースバンドルのルート"}</td>

<td>{"環境設定の拡張"}</td>

</tr>

<tr>

<td>{"AWS Amplify Hosting"}</td>

<td><code>{"amplify.yml"}</code></td>

<td>{"リポジトリのルート"}</td>

<td>{"ビルド設定"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"3.3 SAM プロジェクトの標準的なディレクトリ構成"}</h3>
{" "}
<CodeBlock index={4} language="text" lines={["my-app/","├── template.yaml            # SAM テンプレート（インフラ定義）","├── samconfig.toml           # sam deploy の設定（環境別）","├── buildspec.yml            # CodeBuild のビルド手順","├── src/","│   ├── orders/","│   │   ├── app.py           # Lambda ハンドラー","│   │   └── requirements.txt # 依存関係","│   └── payments/","│       ├── app.py","│       └── requirements.txt","├── layers/","│   └── common/              # 共通レイヤー","├── events/","│   └── order-created.json   # テスト用イベント","└── tests/","    ├── unit/","    └── integration/"]} />
{" "}
<blockquote>{" "}<p>{"上記はディレクトリ構造の例示です（図解ではなく、ファイルの配置例を示すコードブロックです）。"}</p>{" "}</blockquote>
{" "}
<h3>{"3.4 Lambda の zip パッケージで最も多い失敗"}</h3>
{" "}
<Diagram id="d4" label="Step 3：ファイルとディレクトリ構造（Skill 3.1.2）の図解 d4" />
{" "}
<ul>
{" "}
<li>{"例："}<code>{"Handler"}</code>{" を "}<code>{"app.handler"}</code>{" と設定した場合、zip の直下に "}<code>{"app.py"}</code>{" が必要です。"}</li>
{" "}
<li>{"フォルダごと圧縮すると "}<code>{"my-app/app.py"}</code>{" となり、ハンドラーが見つかりません。"}</li>
{" "}
</ul>
{" "}
<h3>{"3.5 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 9">
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

<td><strong>{"関数ごとにディレクトリを分ける"}</strong></td>

<td>{"依存関係の肥大化を防ぎ、パッケージを小さく保つ"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><code>{"buildspec.yml"}</code>{" / "}<code>{"appspec.yml"}</code>{" は "}<strong>{"ルート"}</strong>{" に置く"}</td>

<td>{"ツールが自動で見つける"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"テスト用イベント・テストコードは "}<strong>{"本番パッケージに含めない"}</strong></td>

<td>{"サイズ削減と情報漏洩防止"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><code>{".gitignore"}</code>{" と "}<code>{".samignore"}</code>{" 等で "}<strong>{"不要ファイル（"}<code>{"node_modules"}</code>{" のキャッシュ、"}<code>{".env"}</code>{" など）を除外"}</strong></td>

<td>{"機密や不要物の混入防止"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong>{"インフラ（template）とアプリ（src）を同じリポジトリ"}</strong>{" で管理"}</td>

<td>{"変更を一緒にレビュー・デプロイできる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"3.6 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 10">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"CodeDeploy で EC2 にデプロイしたら「appspec.yml が見つからない」"}</td>

<td><code>{"appspec.yml"}</code>{" を "}<strong>{"アーカイブのルート"}</strong>{" に置く"}</td>

</tr>

<tr>

<td>{"CodeBuild のビルド手順の置き場所"}</td>

<td>{"ルートの "}<code>{"buildspec.yml"}</code>{"（または別名ファイルをプロジェクトで指定）"}</td>

</tr>

<tr>

<td>{"Lambda が "}<code>{"Handler not found"}</code></td>

<td>{"zip のルート直下にハンドラーがあるか確認"}</td>

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
<a className="ref" href="https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeBuild の buildspec リファレンス"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codebuild/latest/userguide/build-spec-ref.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeDeploy の AppSpec ファイル"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codedeploy/latest/userguide/reference-appspec-file.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Elastic Beanstalk の .ebextensions"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/elasticbeanstalk/latest/dg/ebextensions.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/amplify/latest/userguide/build-settings.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Amplify のビルド設定"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/amplify/latest/userguide/build-settings.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda デプロイパッケージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/gettingstarted-package.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
