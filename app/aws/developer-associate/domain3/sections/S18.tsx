import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs18を全文・順序どおり収録。 */
export function S18() { return <>
<h2 id="s18" tabIndex={-1}>{"Step 14：承認済みバージョンを使う環境（Skill 3.3.3）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.3.3"}</strong>{": 統合テスト用に、承認済みバージョンを使うアプリケーション環境を作成する（例：Lambda エイリアス、コンテナイメージタグ、AWS Amplify ブランチ、AWS Copilot 環境）"}</p>{" "}</blockquote>
{" "}
<h3>{"14.1 考え方：「どのバージョンがどの環境にあるか」を固定する"}</h3>
{" "}
<p>{"統合テストでは、"}<strong>{"「テストしたものと同じもの」が本番に行く"}</strong>{" ことが大切です。そのため "}<strong>{"バージョンに名前（ラベル）を付け、環境がそれを指す"}</strong>{" 形にします。"}</p>
{" "}
<Diagram id="d23" label="Step 14：承認済みバージョンを使う環境（Skill 3.3.3）の図解 d23" />
{" "}
<h3>{"14.2 例①：Lambda バージョンとエイリアス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 49">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"特徴"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong><code>{"$LATEST"}</code></strong></td>

<td>{"最新の編集中コード"}</td>

<td><strong>{"変更可能（ミュータブル）"}</strong></td>

</tr>

<tr>

<td><strong>{"バージョン"}</strong></td>

<td><code>{"$LATEST"}</code>{" のスナップショット（1, 2, 3…）"}</td>

<td><strong>{"不変（イミュータブル）"}</strong>{"。コードと設定が固定"}</td>

</tr>

<tr>

<td><strong>{"エイリアス"}</strong></td>

<td>{"バージョンを指す "}<strong>{"名前付きポインタ"}</strong>{"（"}<code>{"dev"}</code>{"、"}<code>{"prod"}</code>{"）"}</td>

<td>{"別のバージョンに "}<strong>{"付け替え可能"}</strong>{"。"}<strong>{"加重ルーティング（2 バージョン間の割合）"}</strong>{" も可能"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d24" label="Step 14：承認済みバージョンを使う環境（Skill 3.3.3）の図解 d24" />
{" "}
<CodeBlock index={24} language="bash" lines={["# バージョンを発行","aws lambda publish-version --function-name my-func --description \"release 1.4.0\"","","# エイリアスを作る / 付け替える","aws lambda create-alias --function-name my-func --name test --function-version 2","aws lambda update-alias --function-name my-func --name test --function-version 3","","# 加重ルーティング（prod: バージョン1に 90%、バージョン2に 10%）","aws lambda update-alias --function-name my-func --name prod \\","  --function-version 1 \\","  --routing-config '{\"AdditionalVersionWeights\": {\"2\": 0.1}}'"]} />
{" "}
<blockquote>{" "}<p>{"⚠️ "}<strong>{"ポイント"}</strong>{": イベントソース（S3、API Gateway 等）には "}<strong>{"エイリアスの ARN"}</strong>{" を設定します。エイリアスを付け替えるだけで、呼び出し元の設定を変えずに切り替えられます。"}</p>{" "}</blockquote>
{" "}
<h3>{"14.3 例②：コンテナイメージのタグ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 50">
<table>

<thead>

<tr>

<th scope="col">{"タグ付けの方法"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"評価"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"latest"}</code></td>

<td><code>{"orders:latest"}</code></td>

<td>{"❌ "}<strong>{"何が入っているか不明、再現性なし"}</strong></td>

</tr>

<tr>

<td><strong>{"セマンティックバージョン"}</strong></td>

<td><code>{"orders:1.4.2"}</code></td>

<td>{"✅ 人が読める"}</td>

</tr>

<tr>

<td><strong>{"Git コミット SHA"}</strong></td>

<td><code>{"orders:3f9a2c1"}</code></td>

<td>{"✅ 追跡性が高い"}</td>

</tr>

<tr>

<td><strong>{"ダイジェスト"}</strong></td>

<td><code>{"orders@sha256:..."}</code></td>

<td>{"✅ "}<strong>{"完全に不変"}</strong>{"（最も確実）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<ul>
{" "}
<li>{"Amazon ECR の "}<strong>{"タグのイミュータビリティ（不変）設定"}</strong>{" を有効にすると、"}<strong>{"既存タグの上書きを防げます"}</strong>{"。"}</li>
{" "}
<li>{"環境（タスク定義・Lambda）には "}<strong>{"承認済みの特定タグ（またはダイジェスト）"}</strong>{" を指定します。"}</li>
{" "}
</ul>
{" "}
<h3>{"14.4 例③：AWS Amplify のブランチ"}</h3>
{" "}
<ul>
{" "}
<li>{"Amplify Hosting では "}<strong>{"Git の ブランチ＝環境"}</strong>{" として扱えます（例："}<code>{"main"}</code>{"＝本番、"}<code>{"dev"}</code>{"＝開発、"}<code>{"feature/xxx"}</code>{"＝機能ブランチの一時環境）。"}</li>
{" "}
<li>{"ブランチごとに "}<strong>{"環境変数"}</strong>{" を設定でき、"}<strong>{"プルリクエストのプレビュー環境"}</strong>{" も作れます。"}</li>
{" "}
<li>{"承認済みのブランチ（例："}<code>{"release"}</code>{"）だけを統合テスト環境に接続すれば、「承認されたコード」だけを検証できます。"}</li>
{" "}
</ul>
{" "}
<h3>{"14.5 例④：AWS Copilot の環境（注意：サポート終了）"}</h3>
{" "}
<ul>
{" "}
<li>{"AWS Copilot CLI は、"}<code>{"copilot env"}</code>{" で "}<strong>{"環境（test / prod など）"}</strong>{" を作る仕組みで、試験ガイドの例に挙がっています。"}</li>
{" "}
<li>{"ただし "}<strong>{"2026-06-12 にサポートが終了"}</strong>{" しました（OSS として GitHub には残るが、AWS による新機能・セキュリティ更新・サポートはなし）。"}</li>
{" "}
<li>{"AWS のコンテナブログでは、移行先として、"}<strong>{"CloudFormation／CDK による ECS の定義"}</strong>{" や、"}<strong>{"Amazon ECS Express Mode"}</strong>{" などの選択肢が紹介されています。"}</li>
{" "}
<li>{"試験対策としては「Copilot は "}<strong>{"環境（Environment）単位でアプリを管理し、パイプラインを生成するコンテナ向け CLI"}</strong>{"」と理解しておけば十分です。"}</li>
{" "}
</ul>
{" "}
<h3>{"14.6 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 51">
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

<td><strong>{"成果物を一度だけビルド"}</strong>{" し、同じものを各環境へ昇格"}</td>

<td>{"差異の排除"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><code>{"latest"}</code>{" タグを "}<strong>{"本番で使わない"}</strong></td>

<td>{"再現性の確保"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"ECR は "}<strong>{"イミュータブルタグ＋ライフサイクルポリシー"}</strong>{"（古いイメージの自動削除）"}</td>

<td>{"安全とコスト"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"Lambda は "}<strong>{"エイリアス経由で呼び出す"}</strong>{"（"}<code>{"$LATEST"}</code>{" を本番で直接参照しない）"}</td>

<td>{"安定した切り替え"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong>{"承認（レビュー／テスト合格）後"}</strong>{" にだけ、承認済みタグ・エイリアスを進める"}</td>

<td>{"品質ゲート"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"一時環境（ブランチ別）は "}<strong>{"自動削除"}</strong></td>

<td>{"コスト削減"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"14.7 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 52">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Lambda でテスト用と本番用に別バージョンを指したい"}</td>

<td><strong>{"バージョン＋エイリアス"}</strong></td>

</tr>

<tr>

<td>{"本番が使うコンテナイメージを確実に固定したい"}</td>

<td><strong>{"不変タグまたはダイジェスト"}</strong></td>

</tr>

<tr>

<td>{"ブランチごとに自動で環境を作りたい（フロントエンド）"}</td>

<td><strong>{"Amplify Hosting のブランチデプロイ"}</strong></td>

</tr>

<tr>

<td><code>{"$LATEST"}</code>{" が危険な理由"}</td>

<td><strong>{"変更可能"}</strong>{"で、意図せず挙動が変わる"}</td>

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
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda のバージョン"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/configuration-versions.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda のエイリアス"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/configuration-aliases.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/lambda/latest/dg/configuring-alias-routing.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"エイリアスによるトラフィックシフト"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/lambda/latest/dg/configuring-alias-routing.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"ECR のイメージタグ変更可否"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/AmazonECR/latest/userguide/image-tag-mutability.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/amplify/latest/userguide/multi-environments.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Amplify のブランチ／複数環境"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/amplify/latest/userguide/multi-environments.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/amplify/latest/userguide/environment-variables.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Amplify の環境変数"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/amplify/latest/userguide/environment-variables.html"}</span></a>
<a className="ref" href="https://aws.amazon.com/blogs/containers/announcing-the-end-of-support-for-the-aws-copilot-cli" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS Copilot CLI サポート終了の告知"}</span><span className="ref-url"><b>{"aws.amazon.com"}</b>{"/blogs/containers/announcing-the-end-of-support-for-the-aws-copilot-cli"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
