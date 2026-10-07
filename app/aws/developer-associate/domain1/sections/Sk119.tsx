import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.1.9 API・SDK で AWS サービスを操作するを全量保持する。 */
export function Sk119(){return (<section className="section" id="sk-1-1-9" tabIndex={-1}>
<h2>{"Skill 1.1.9 API・SDK で AWS サービスを操作する"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: API と AWS SDK を使って AWS サービスとやり取りするコードを書く"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"AWS のすべてのサービスは "}<strong>{"API"}</strong>{" として公開されており、"}<strong>{"SDK"}</strong>{"（各言語のライブラリ）や "}<strong>{"CLI"}</strong>{" を通じて操作します。"}<strong>{"認証情報の扱い"}</strong>{"・"}<strong>{"ページネーション"}</strong>{"・"}<strong>{"再試行"}</strong>{"の 3 点が試験の要です。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"呼び出し手段の関係"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 33">
<table>

<thead>

<tr>

<th scope="col">{"手段"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWS API（HTTPS）"}</strong></td>

<td>{"本体。リクエストには "}<strong>{"Signature Version 4（SigV4）の署名"}</strong>{"が必要"}</td>

</tr>

<tr>

<td><strong>{"AWS SDK"}</strong></td>

<td>{"署名・再試行・ページネーションなどを肩代わりしてくれる言語別ライブラリ（Python: boto3、JavaScript: AWS SDK for JavaScript v3、Java、.NET、Go など）"}</td>

</tr>

<tr>

<td><strong>{"AWS CLI"}</strong></td>

<td>{"コマンドラインから API を呼ぶツール（内部は SDK ベース）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"自分で署名を実装することは通常ありません。"}<strong>{"SDK を使えば SigV4 署名は自動"}</strong>{"で行われます。"}</p>{" "}</blockquote>
{" "}
<h4>{"認証情報プロバイダーチェーン"}</h4>
{" "}
<p>{"SDK は、認証情報を"}<strong>{"決まった順序で自動的に探します"}</strong>{"。コードに"}<strong>{"アクセスキーを書き込まない"}</strong>{"のが大原則です。"}</p>
{" "}
<figure className="diagram-card"><Diagram id="d12" label="Skill 1.1.9 API・SDK で AWS サービスを操作するの図解 d12" /></figure>
{" "}
<p>{"（正確な順序は SDK の言語によって多少異なります。"}<strong>{"考え方は「明示指定 → 環境変数 → 設定ファイル → コンテナ / インスタンスのロール」"}</strong>{"と覚えます。）"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 34">
<table>

<thead>

<tr>

<th scope="col">{"実行場所"}</th>

<th scope="col">{"使うべき認証情報"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Lambda"}</td>

<td><strong>{"実行ロール"}</strong>{"（SDK が自動で取得。コードに書かない）"}</td>

</tr>

<tr>

<td>{"EC2"}</td>

<td><strong>{"インスタンスプロファイル（IAM ロール）"}</strong></td>

</tr>

<tr>

<td>{"ECS / EKS"}</td>

<td>{"タスクロール / IRSA など"}</td>

</tr>

<tr>

<td>{"ローカル開発"}</td>

<td><strong>{"IAM Identity Center（SSO）のプロファイル"}</strong>{"など、一時認証情報"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"リージョンの指定"}</h4>
{" "}
<p>{"リージョンは "}<strong>{"コード・環境変数（"}<code>{"AWS_REGION"}</code>{" / "}<code>{"AWS_DEFAULT_REGION"}</code>{"）・設定ファイル"}</strong>{"で指定します。Lambda では "}<code>{"AWS_REGION"}</code>{" が自動で設定されます。"}</p>
{" "}
<h4>{"ページネーション"}</h4>
{" "}
<p>{"一覧取得 API は、結果が多いと"}<strong>{"一度に全部を返さず"}</strong>{"、続きを取得するためのトークンを返します。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 35">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"トークン"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"多くの API"}</td>

<td><code>{"NextToken"}</code>{" / "}<code>{"NextMarker"}</code>{" / "}<code>{"ContinuationToken"}</code>{"（S3 の ListObjectsV2）"}</td>

</tr>

<tr>

<td>{"DynamoDB の Query / Scan"}</td>

<td><code>{"LastEvaluatedKey"}</code>{"（次回 "}<code>{"ExclusiveStartKey"}</code>{" に渡す）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"SDK の"}<strong>{"ページネーター（paginator）"}</strong>{"を使えば、続きの取得を自動化できます。"}</p>
{" "}
<CodeBlock index={6} language="python" lines={["pythons3 = boto3.client(\"s3\")","paginator = s3.get_paginator(\"list_objects_v2\")","for page in paginator.paginate(Bucket=\"my-bucket\", Prefix=\"logs/\"):","    for obj in page.get(\"Contents\", []):","        print(obj[\"Key\"])"]} />
{" "}
<blockquote>{" "}<p><strong>{"1 回の応答だけを見て「全部取れた」と思い込む"}</strong>{"のは典型的なバグです。"}</p>{" "}</blockquote>
{" "}
<h4>{"その他の押さえどころ"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 36">
<table>

<thead>

<tr>

<th scope="col">{"トピック"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"クライアントの再利用"}</strong></td>

<td>{"クライアントの生成は重い。Lambda では"}<strong>{"ハンドラーの外（初期化フェーズ）で作り、再利用"}</strong>{"する"}</td>

</tr>

<tr>

<td><strong>{"ウェイター"}</strong></td>

<td>{"状態が変わるまで待つ仕組み（例: テーブルが ACTIVE になるまで）"}</td>

</tr>

<tr>

<td><strong>{"S3 マルチパートアップロード"}</strong></td>

<td>{"大きなファイルを分割して並列アップロード。"}<strong>{"100 MB 以上で推奨、5 GB 超は必須"}</strong>{"（最大オブジェクトは 5 TB）"}</td>

</tr>

<tr>

<td><strong>{"署名付き URL（Presigned URL）"}</strong></td>

<td>{"認証情報を渡さずに、"}<strong>{"期限付き"}</strong>{"で S3 オブジェクトのアップロード / ダウンロードを許可"}</td>

</tr>

<tr>

<td><strong>{"AWS CLI の "}<code>{"--query"}</code></strong></td>

<td>{"JMESPath で出力を絞り込む。"}<code>{"--output"}</code>{" で形式変更。"}<code>{"--profile"}</code>{" で認証情報を切り替え"}</td>

</tr>

<tr>

<td><strong>{"CLI のページネーション"}</strong></td>

<td>{"既定で自動的に全ページ取得。"}<code>{"--max-items"}</code>{" / "}<code>{"--page-size"}</code>{" で制御"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"署名付き URL の例です。"}</p>
{" "}
<CodeBlock index={7} language="python" lines={["pythonurl = boto3.client(\"s3\").generate_presigned_url(","    \"get_object\",","    Params={\"Bucket\": \"my-bucket\", \"Key\": \"report.pdf\"},","    ExpiresIn=900,   # 15 分間だけ有効",")"]} />
{" "}
<blockquote>{" "}<p>{"署名付き URL は、"}<strong>{"URL を作った人（ロール）の権限"}</strong>{"で動作します。一時的な認証情報（ロール）で作った URL は、"}<strong>{"その認証情報の有効期限が切れると使えなくなります"}</strong>{"。"}</p>{" "}</blockquote>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li>{"コードに"}<strong>{"アクセスキーを書かない"}</strong>{"。"}<strong>{"IAM ロール"}</strong>{"（Lambda の実行ロール等）と"}<strong>{"一時認証情報"}</strong>{"を使う"}</li>
{" "}
<li><strong>{"最小権限"}</strong>{"の IAM ポリシーを付与する"}</li>
{" "}
<li><strong>{"ページネーター"}</strong>{"でページングを確実に処理する"}</li>
{" "}
<li>{"クライアントは"}<strong>{"使い回す"}</strong>{"（Lambda ならハンドラーの外で初期化）"}</li>
{" "}
<li>{"再試行・タイムアウトは SDK の設定で調整する（Skill 1.1.5）"}</li>
{" "}
<li>{"大きなファイルは"}<strong>{"マルチパート"}</strong>{"、ユーザーに直接アップロードさせたいなら"}<strong>{"署名付き URL"}</strong></li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「EC2 / Lambda 上のアプリがアクセスキーなしで S3 にアクセスしたい」→ "}<strong>{"IAM ロール"}</strong></li>
{" "}
<li>{"「一覧 API の結果が途中で切れる」→ "}<strong>{"ページネーション（NextToken / ページネーター）"}</strong></li>
{" "}
<li>{"「ユーザーが直接 S3 にアップロードしたい」→ "}<strong>{"署名付き URL"}</strong></li>
{" "}
<li>{"「大きなファイルのアップロードが失敗する」→ "}<strong>{"マルチパートアップロード"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
