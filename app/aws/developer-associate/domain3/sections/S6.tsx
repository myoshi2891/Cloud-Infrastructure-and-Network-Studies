import { Diagram } from '../Diagram';
/** 原本のs6を全文・順序どおり収録。 */
export function S6() { return <>
<h2 id="s6" tabIndex={-1}>{"Step 4：コードリポジトリの活用（Skill 3.1.3）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.1.3"}</strong>{": デプロイ環境でコードリポジトリを使用する"}</p>{" "}</blockquote>
{" "}
<h3>{"4.1 コードリポジトリとは"}</h3>
{" "}
<p><strong>{"バージョン管理（Git）されたコードの保管庫"}</strong>{" です。デプロイでは「どのコミットを環境に出すか」の "}<strong>{"唯一の情報源（Single Source of Truth）"}</strong>{" になります。"}</p>
{" "}
<h3>{"4.2 AWS でのリポジトリの選択肢"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 11">
<table>

<thead>

<tr>

<th scope="col">{"選択肢"}</th>

<th scope="col">{"特徴"}</th>

<th scope="col">{"パイプラインとの接続"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"AWS CodeCommit"}</strong></td>

<td>{"AWS のマネージド Git。IAM・VPC エンドポイント・CloudTrail と統合。2025-11 に GA 復帰"}</td>

<td>{"CodePipeline の Source に直接指定"}</td>

</tr>

<tr>

<td><strong>{"GitHub / GitLab / Bitbucket"}</strong></td>

<td>{"外部の Git サービス"}</td>

<td><strong>{"AWS CodeConnections"}</strong>{"（旧 CodeStar Connections）で接続"}</td>

</tr>

<tr>

<td><strong>{"Amazon S3"}</strong></td>

<td>{"zip を置く簡易ソース。バージョニング有効が必須"}</td>

<td>{"CodePipeline / CodeDeploy / Beanstalk が参照"}</td>

</tr>

<tr>

<td><strong>{"Amazon ECR"}</strong></td>

<td>{"コンテナイメージのリポジトリ"}</td>

<td>{"イメージ push をパイプライン起動に使える"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"4.3 コミットがデプロイされるまで"}</h3>
{" "}
<Diagram id="d5" label="Step 4：コードリポジトリの活用（Skill 3.1.3）の図解 d5" />
{" "}
<h3>{"4.4 CodeCommit の接続方法（頻出）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 12">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"認証"}</th>

<th scope="col">{"ポイント"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"HTTPS（Git 認証情報）"}</td>

<td>{"IAM ユーザーに発行した Git 認証情報"}</td>

<td>{"手軽。IAM ユーザーが前提"}</td>

</tr>

<tr>

<td><strong>{"HTTPS（git-remote-codecommit）"}</strong></td>

<td>{"IAM ロール／一時認証情報"}</td>

<td><strong>{"フェデレーションや IAM ロールで使える"}</strong>{"（推奨）"}</td>

</tr>

<tr>

<td>{"SSH"}</td>

<td>{"IAM ユーザーに登録した SSH 公開鍵"}</td>

<td>{"鍵管理が必要"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"⚠️ AWS アクセスキーをコードにコミットしてはいけません。EC2 / Lambda / CodeBuild などの "}<strong>{"IAM ロール"}</strong>{" を使います。"}</p>{" "}</blockquote>
{" "}
<h3>{"4.5 リポジトリ運用のベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 13">
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

<td><strong>{"メインブランチを保護"}</strong>{"（直接 push 禁止、プルリクエスト必須）"}</td>

<td>{"本番品質を守る"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td>{"CodeCommit では "}<strong>{"承認ルールテンプレート"}</strong>{"（Approval rule template）でレビュー必須化"}</td>

<td>{"レビュー漏れ防止"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td><strong>{"機密情報（鍵・パスワード）をコミットしない"}</strong>{"。誤コミット対策に "}<code>{"git-secrets"}</code>{" 等を導入"}</td>

<td>{"漏洩防止"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"IaC・アプリ・パイプライン定義"}</strong>{" を同じ（または関連する）リポジトリで管理"}</td>

<td>{"変更履歴を追跡できる"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"外部 Git との接続は "}<strong>{"CodeConnections"}</strong>{" を使い、"}<strong>{"最小権限"}</strong>{" のリポジトリアクセスにする"}</td>

<td>{"セキュリティ"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"S3 をソースにするなら "}<strong>{"バージョニング"}</strong>{" を有効化"}</td>

<td>{"過去版へ戻せる"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"4.6 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 14">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"GitHub のコミットで CodePipeline を起動したい"}</td>

<td><strong>{"CodeConnections"}</strong>{"（接続）を Source に使う"}</td>

</tr>

<tr>

<td>{"IAM ロールで CodeCommit に安全に接続したい"}</td>

<td><strong>{"git-remote-codecommit"}</strong></td>

</tr>

<tr>

<td>{"S3 をソースにするときの必須設定"}</td>

<td><strong>{"バージョニングの有効化"}</strong></td>

</tr>

<tr>

<td>{"CodeCommit のコミットを起点に他サービスを呼ぶ"}</td>

<td><strong>{"EventBridge ルール／CodeCommit トリガー（SNS・Lambda）"}</strong></td>

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
<a className="ref" href="https://docs.aws.amazon.com/codecommit/latest/userguide/welcome.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeCommit とは"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codecommit/latest/userguide/welcome.html"}</span></a>
<a className="ref" href="https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeCommit GA 復帰の告知"}</span><span className="ref-url"><b>{"aws.amazon.com"}</b>{"/blogs/devops/aws-codecommit-returns-to-general-availability/"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeConnections"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/dtconsole/latest/userguide/welcome-connections.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodePipeline の概念"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codepipeline/latest/userguide/concepts.html"}</span></a>
<a className="ref" href="https://trunkbaseddevelopment.com/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Trunk Based Development"}</span><span className="ref-url"><b>{"trunkbaseddevelopment.com"}</b>{"/"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
