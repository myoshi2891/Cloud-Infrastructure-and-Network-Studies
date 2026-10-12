import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs4を全文・順序どおり収録。 */
export function S4() { return <>
<h2 id="s4" tabIndex={-1}>{"Step 2：依存関係の管理（Skill 3.1.1）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.1.1"}</strong>{": コードモジュールの依存関係（環境変数、設定ファイル、コンテナイメージなど）をパッケージ内で管理する"}</p>{" "}</blockquote>
{" "}
<h3>{"2.1 依存関係とは？"}</h3>
{" "}
<p>{"アプリは自分のコードだけでは動きません。次のような "}<strong>{"「動くために必要なもの」"}</strong>{" をまとめて管理します。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 5">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"管理場所"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ライブラリ"}</td>

<td>{"Python の "}<code>{"requests"}</code>{"、Node.js の "}<code>{"axios"}</code></td>

<td><code>{"requirements.txt"}</code>{" / "}<code>{"package.json"}</code></td>

</tr>

<tr>

<td>{"実行時設定"}</td>

<td><code>{"TABLE_NAME"}</code>{" などの環境変数"}</td>

<td>{"Lambda の環境変数、SAM の "}<code>{"Environment"}</code></td>

</tr>

<tr>

<td>{"設定ファイル"}</td>

<td><code>{"config.json"}</code>{"、"}<code>{".ini"}</code></td>

<td>{"パッケージ内、または AppConfig"}</td>

</tr>

<tr>

<td>{"コンテナイメージ"}</td>

<td>{"ベースイメージ、OS パッケージ"}</td>

<td><code>{"Dockerfile"}</code>{"、Amazon ECR"}</td>

</tr>

<tr>

<td>{"共通コード"}</td>

<td>{"複数関数で共有するユーティリティ"}</td>

<td>{"Lambda レイヤー"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"2.2 Lambda における依存関係の持ち方（3 つの選択肢）"}</h3>
{" "}
<Diagram id="d3" label="Step 2：依存関係の管理（Skill 3.1.1）の図解 d3" />
{" "}
<h3>{"2.3 コード例：Python の依存関係を zip に同梱する流れ"}</h3>
{" "}
<CodeBlock index={0} language="bash" lines={["# 依存ライブラリを一時ディレクトリへインストール","pip install -r requirements.txt -t ./package","","# アプリコードを追加して zip 化","cp app.py ./package/","cd package && zip -r ../function.zip . && cd ..","","# 関数を更新","aws lambda update-function-code \\","  --function-name my-func \\","  --zip-file fileb://function.zip"]} />
{" "}
<p>{"SAM を使うと、依存関係の解決〜パッケージングを "}<code>{"sam build"}</code>{" が自動で行います。"}</p>
{" "}
<CodeBlock index={1} language="bash" lines={["sam build        # requirements.txt を読み、.aws-sam/build に成果物を作る","sam deploy --guided"]} />
{" "}
<h3>{"2.4 環境変数の扱い"}</h3>
{" "}
<ul>
{" "}
<li>{"Lambda の環境変数は "}<strong>{"関数ごとに合計 4 KB まで"}</strong>{"。"}</li>
{" "}
<li>{"値は保存時に暗号化されます（デフォルトで AWS 管理のキー）。"}<strong>{"機密情報（パスワード等）を平文で入れない"}</strong>{" のが基本。Secrets Manager や SSM Parameter Store（SecureString）を使い、環境変数には "}<strong>{"参照先の名前"}</strong>{" を入れます。"}</li>
{" "}
</ul>
{" "}
<CodeBlock index={2} language="yaml" lines={["# SAM の例：環境変数に「テーブル名」と「パラメータ名」を渡す","Resources:","  OrderFunction:","    Type: AWS::Serverless::Function","    Properties:","      Handler: app.handler","      Runtime: python3.13","      Environment:","        Variables:","          TABLE_NAME: !Ref OrdersTable","          DB_PASSWORD_PARAM: /myapp/prod/db_password   # 値ではなく名前を渡す"]} />
{" "}
<h3>{"2.5 コンテナイメージの依存関係"}</h3>
{" "}
<ul>
{" "}
<li>{"Lambda や ECS ではコンテナイメージにすべての依存関係を封じ込められます。"}</li>
{" "}
<li><strong>{"ベストプラクティス"}</strong></li>
{" "}
<li>{"ベースイメージは "}<strong>{"公式（AWS 提供の Lambda ベースイメージ等）"}</strong>{" を使い、最小構成にする。"}</li>
{" "}
<li>{"変更頻度の低い層（OS・ライブラリ）を "}<strong>{"Dockerfile の上位"}</strong>{" に置き、変更が多いアプリコードを下位に置く（ビルドキャッシュが効く）。"}</li>
{" "}
<li>{"イメージは "}<strong>{"Amazon ECR"}</strong>{" に置き、"}<strong>{"イメージスキャン"}</strong>{" を有効にする。"}</li>
{" "}
<li>{"タグは "}<strong>{"不変（immutable）"}</strong>{" に設定するか、デプロイ時に "}<strong>{"ダイジェスト（sha256）"}</strong>{" で固定する。"}</li>
{" "}
</ul>
{" "}
<CodeBlock index={3} language="dockerfile" lines={["FROM public.ecr.aws/lambda/python:3.13","COPY requirements.txt ${LAMBDA_TASK_ROOT}","RUN pip install -r requirements.txt","COPY app.py ${LAMBDA_TASK_ROOT}","CMD [\"app.handler\"]"]} />
{" "}
<h3>{"2.6 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 6">
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

<td>{"依存関係は "}<strong>{"バージョン固定"}</strong>{"（ロックファイル利用）"}</td>

<td>{"ビルドの再現性を保つ"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"不要な依存を入れない"}</strong></td>

<td>{"パッケージ縮小 → コールドスタート短縮・攻撃面縮小"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"共通ライブラリは "}<strong>{"レイヤー"}</strong>{" で共有"}</td>

<td>{"重複排除、更新の一元化"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"機密値は "}<strong>{"環境変数に直書きしない"}</strong></td>

<td>{"漏洩防止"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"AWS SDK は "}<strong>{"ランタイム同梱版か自前同梱かを意識"}</strong></td>

<td>{"再現性を重視するなら同梱して固定"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"依存関係の "}<strong>{"脆弱性スキャン"}</strong>{" を CI に組み込む"}</td>

<td>{"供給網リスク対策"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"2.7 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 7">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"複数関数で共通ライブラリを使い、更新を一元化したい"}</td>

<td><strong>{"Lambda レイヤー"}</strong></td>

</tr>

<tr>

<td>{"依存関係が合計で解凍後 250MB を超える"}</td>

<td><strong>{"コンテナイメージ"}</strong>{"（最大 10GB）"}</td>

</tr>

<tr>

<td>{"DB パスワードを安全に渡したい"}</td>

<td><strong>{"Secrets Manager / Parameter Store（SecureString）"}</strong>{" を実行時に取得"}</td>

</tr>

<tr>

<td>{"環境ごとに変わる値を同じパッケージで切り替えたい"}</td>

<td><strong>{"環境変数"}</strong>{" や AppConfig など、コード外の設定"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"7 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-package.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda デプロイパッケージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/gettingstarted-package.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/chapter-layers.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda レイヤー"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/chapter-layers.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-envvars.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda 環境変数"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/configuration-envvars.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/images-create.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda コンテナイメージ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/images-create.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-limits.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda クォータ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/gettingstarted-limits.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Amazon ECR イメージタグの変更可否"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AmazonECR/latest/userguide/image-tag-mutability.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"SAM とは"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/serverless-application-model/latest/developerguide/what-is-sam.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
