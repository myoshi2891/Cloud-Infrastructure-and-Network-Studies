import { Diagram } from '../Diagram';
/** 原本のs1を全文・順序どおり収録。 */
export function S1() { return <>
<h2 id="s1" tabIndex={-1}>{"0. はじめに：このガイドの使い方と Domain 3 の全体像"}</h2>
{" "}
<h3>{"0.1 Domain 3 で問われること"}</h3>
{" "}
<p>{"公式試験ガイドでは、Domain 3「Deployment」は "}<strong>{"スコア対象問題の 24%"}</strong>{" を占めます（Domain 1: 32%、Domain 2: 26%、Domain 4: 18%）。試験は 65 問（うちスコア対象は 50 問、15 問は採点対象外）、制限時間は 130 分、合格スコアは 720（100〜1,000 の換算スコア）です。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 1">
<table>

<thead>

<tr>

<th scope="col">{"タスク"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"スキル数"}</th>

<th scope="col">{"対応 Step"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"Task 1"}</td>

<td>{"デプロイ用アプリケーションアーティファクトの準備"}</td>

<td>{"5"}</td>

<td>{"Step 2〜6"}</td>

</tr>

<tr>

<td>{"Task 2"}</td>

<td>{"開発環境でのアプリケーションテスト"}</td>

<td>{"5"}</td>

<td>{"Step 7〜11"}</td>

</tr>

<tr>

<td>{"Task 3"}</td>

<td>{"デプロイテストの自動化"}</td>

<td>{"6"}</td>

<td>{"Step 12〜16"}</td>

</tr>

<tr>

<td>{"Task 4"}</td>

<td>{"AWS CI/CD サービスによるコードデプロイ"}</td>

<td>{"11"}</td>

<td>{"Step 17〜25"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"0.2 初学者のための学習ロードマップ"}</h3>
{" "}
<Diagram id="d0" label="0. はじめに：このガイドの使い方と Domain 3 の全体像の図解 d0" />
{" "}
<h3>{"0.3 学習の進め方（おすすめ）"}</h3>
{" "}
<ol>
{" "}
<li><strong>{"Step 1"}</strong>{" で「ビルド → テスト → デプロイ」の流れと用語をつかみます。"}</li>
{" "}
<li>{"Task 1〜4 を順に読み、各 Step の "}<strong>{"「試験での狙われどころ」"}</strong>{" の表を必ず確認します。"}</li>
{" "}
<li>{"手を動かせる人は、SAM（AWS Serverless Application Model）のサンプルアプリで "}<code>{"sam build"}</code>{" → "}<code>{"sam deploy"}</code>{" を一度体験すると、理解が一気に深まります。"}</li>
{" "}
<li>{"最後に "}<strong>{"Step 26"}</strong>{" の練習問題で確認します。"}</li>
{" "}
</ol>
{" "}
<h3>{"0.4 【重要】最新のサービス状況（2026-10-03 時点）"}</h3>
{" "}
<p>{"試験ガイドの記述と、実際のサービス状況に差が出ている項目があります。"}<strong>{"試験では試験ガイドの用語が使われます"}</strong>{"が、実務では最新状況を知っておくことが大切です。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 2">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"試験ガイドの記述"}</th>

<th scope="col">{"最新状況（確認日: 2026-10-03）"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"AWS CodeCommit"}</td>

<td>{"リポジトリ利用が前提"}</td>

<td>{"2024年7月に新規受付停止（de-emphasized）となったが、"}<strong>{"2025年11月24日に GA（一般提供）へ復帰"}</strong>{"し、新規顧客も利用可能"}</td>

</tr>

<tr>

<td>{"Amazon Q Developer"}</td>

<td>{"Skill 3.3.6 でテスト自動生成"}</td>

<td>{"IDE プラグインと有料サブスクリプションは "}<strong>{"2027-04-30 にサポート終了"}</strong>{"。"}<strong>{"新規サインアップは 2026-05-15 に停止"}</strong>{"。後継は "}<strong>{"Kiro"}</strong>{"。AWS マネジメントコンソール内の Q Developer 等は継続"}</td>

</tr>

<tr>

<td>{"AWS Copilot CLI"}</td>

<td>{"Skill 3.3.3 の例に登場"}</td>

<td><strong>{"2026-06-12 にサポート終了"}</strong>{"（OSS として GitHub には残るが、AWS による更新・セキュリティパッチ・サポートなし）"}</td>

</tr>

<tr>

<td>{"AWS Cloud9 / CodeStar など"}</td>

<td>{"（試験範囲外）"}</td>

<td>{"新規顧客の受付停止などの動きあり。新規採用は避ける"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"💡 "}<strong>{"学習のコツ"}</strong>{": 試験対策としては「Q Developer」「Copilot」という言葉と概念を理解しつつ、実務では「Kiro」「ECS Express Mode / CloudFormation / CDK」などの現行手段も知っておくと安心です。"}</p>{" "}</blockquote>
{" "}
<h3>{"0.5 エマージングトピック（採点対象外の先行出題）"}</h3>
{" "}
<p>{"試験ガイドには「採点対象外の事前テスト問題」として、次の AI 関連トピックが出題され得ると記載されています。Domain 3 に関係するものは以下です。"}</p>
{" "}
<ul>
{" "}
<li>{"AI を使った CI/CD の支援（自動デプロイ承認、環境プロビジョニング、デプロイ後検証など）"}</li>
{" "}
<li>{"AI ツールによるテスト生成・テスト自動化（テスト実行、結果分析、リグレッションテスト、カバレッジ）"}</li>
{" "}
<li>{"AI 支援開発ツールでのコード生成・レビュー・リファクタリング・セキュリティスキャン"}</li>
{" "}
</ul>
{" "}
<p>{"これらは "}<strong>{"スコアには影響しません"}</strong>{" が、Step 16 で基本的な考え方を紹介します。"}</p>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この章）"}</span>
<span className="refs-count">{"7 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"試験ガイド（DVA-C02）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/aws-certification/latest/developer-associate-02/developer-associate-02.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02-domain3.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Domain 3 の公式ページ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/aws-certification/latest/developer-associate-02/developer-associate-02-domain3.html"}</span></a>
<a className="ref" href="https://aws.amazon.com/certification/certified-developer-associate/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"認定の公式ページ"}</span><span className="ref-url"><b>{"aws.amazon.com"}</b>{"/certification/certified-developer-associate/"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/dva-technologies-concepts.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"技術・概念の一覧"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/aws-certification/latest/developer-associate-02/dva-technologies-concepts.html"}</span></a>
<a className="ref" href="https://aws.amazon.com/blogs/devops/aws-codecommit-returns-to-general-availability/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"CodeCommit の GA 復帰"}</span><span className="ref-url"><b>{"aws.amazon.com"}</b>{"/blogs/devops/aws-codecommit-returns-to-general-availability/"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Q Developer IDE プラグインのサポート終了"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html"}</span></a>
<a className="ref" href="https://aws.amazon.com/blogs/containers/announcing-the-end-of-support-for-the-aws-copilot-cli" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS Copilot CLI のサポート終了告知"}</span><span className="ref-url"><b>{"aws.amazon.com"}</b>{"/blogs/containers/announcing-the-end-of-support-for-the-aws-copilot-cli"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
