import { Diagram } from '../Diagram';
/** 原本のs2を全文・順序どおり収録。 */
export function S2() { return <>
<h2 id="s2" tabIndex={-1}>{"Step 1：デプロイの全体像（CI/CD と環境の考え方）"}</h2>
{" "}
<h3>{"1.1 そもそも「デプロイ」とは"}</h3>
{" "}
<p><strong>{"デプロイ"}</strong>{" とは、開発者が書いたコードを、利用者が使える環境（AWS 上のサーバーや Lambda など）に "}<strong>{"届けて動かすこと"}</strong>{" です。手作業でやると、ミス・ばらつき・時間がかかる、という問題が起きます。そこで "}<strong>{"自動化"}</strong>{" します。"}</p>
{" "}
<h3>{"1.2 用語を先におさえよう"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 3">
<table>

<thead>

<tr>

<th scope="col">{"用語"}</th>

<th scope="col">{"意味"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"アーティファクト"}</td>

<td>{"デプロイの対象となる「成果物」"}</td>

<td>{"zip ファイル、コンテナイメージ、CloudFormation テンプレート"}</td>

</tr>

<tr>

<td>{"ビルド"}</td>

<td>{"ソースコードから成果物を作る作業"}</td>

<td>{"依存ライブラリのインストール、コンパイル、zip 化"}</td>

</tr>

<tr>

<td>{"CI（継続的インテグレーション）"}</td>

<td>{"コードを頻繁に統合し、自動でビルド・テストする"}</td>

<td>{"コミットのたびに CodeBuild がテストを実行"}</td>

</tr>

<tr>

<td>{"CD（継続的デリバリー／デプロイ）"}</td>

<td>{"成果物を自動で環境へ届ける"}</td>

<td>{"CodeDeploy や CloudFormation が本番へ反映"}</td>

</tr>

<tr>

<td>{"IaC（Infrastructure as Code）"}</td>

<td>{"インフラ構成をコードで書く"}</td>

<td>{"CloudFormation、AWS SAM、AWS CDK"}</td>

</tr>

<tr>

<td>{"環境（Environment）"}</td>

<td>{"用途ごとに分けた実行場所"}</td>

<td>{"dev（開発）、test / staging（検証）、prod（本番）"}</td>

</tr>

<tr>

<td>{"ロールバック"}</td>

<td>{"問題が起きたとき、前の状態に戻すこと"}</td>

<td>{"前バージョンへ切り戻し"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"1.3 AWS の CI/CD サービスの役割分担"}</h3>
{" "}
<Diagram id="d1" label="Step 1：デプロイの全体像（CI/CD と環境の考え方）の図解 d1" />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 4">
<table>

<thead>

<tr>

<th scope="col">{"サービス"}</th>

<th scope="col">{"役割"}</th>

<th scope="col">{"一言でいうと"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"AWS CodeCommit"}</td>

<td>{"Git リポジトリ（ソース管理）"}</td>

<td>{"コードの置き場所"}</td>

</tr>

<tr>

<td>{"AWS CodeBuild"}</td>

<td>{"ビルド・テストの実行"}</td>

<td>{"作業用の使い捨てサーバー"}</td>

</tr>

<tr>

<td>{"AWS CodeDeploy"}</td>

<td>{"EC2 / Lambda / ECS へのデプロイ"}</td>

<td>{"配達員（戦略つき）"}</td>

</tr>

<tr>

<td>{"AWS CodePipeline"}</td>

<td>{"ステージをつなぐワークフロー"}</td>

<td>{"ベルトコンベア"}</td>

</tr>

<tr>

<td>{"AWS CloudFormation / SAM"}</td>

<td>{"インフラとアプリの宣言的デプロイ"}</td>

<td>{"設計図から環境を作る"}</td>

</tr>

<tr>

<td>{"AWS AppConfig"}</td>

<td>{"実行時の設定を安全に配信"}</td>

<td>{"設定のデプロイ専用"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"1.4 環境分離のベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"環境ごとに分ける"}</strong>{": dev / test / prod は "}<strong>{"別スタック"}</strong>{"、できれば "}<strong>{"別 AWS アカウント"}</strong>{" に分けます（影響範囲の限定、権限分離）。"}</li>
{" "}
<li><strong>{"同じ成果物を昇格させる"}</strong>{": 「テストで通ったものと同じ成果物」を本番に出します（本番用に作り直さない）。これを "}<strong>{"Build once, deploy many"}</strong>{" と呼びます。"}</li>
{" "}
<li><strong>{"設定はコードの外へ"}</strong>{": 環境差分（DB 接続先など）は環境変数・Parameter Store・AppConfig で与えます（The Twelve-Factor App の考え方）。"}</li>
{" "}
<li><strong>{"すべてをコード化"}</strong>{": 手作業の変更は避け、IaC とパイプラインで再現可能にします。"}</li>
{" "}
</ul>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"4 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/whitepapers/latest/practicing-continuous-integration-continuous-delivery/welcome.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Practicing CI/CD on AWS（ホワイトペーパー）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/whitepapers/latest/practicing-continuous-integration-continuous-delivery/welcome.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS CodePipeline とは"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/codepipeline/latest/userguide/welcome.html"}</span></a>
<a className="ref" href="https://12factor.net/config" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"The Twelve-Factor App（設定）"}</span><span className="ref-url"><b>{"12factor.net"}</b>{"/config"}</span></a>
<a className="ref" href="https://martinfowler.com/bliki/ContinuousDelivery.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind ext">{"外部資料"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Martin Fowler「Continuous Delivery」関連"}</span><span className="ref-url"><b>{"martinfowler.com"}</b>{"/bliki/ContinuousDelivery.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
