import { Diagram } from '../Diagram';
/** 原本のs20を全文・順序どおり収録。 */
export function S20() { return <>
<h2 id="s20" tabIndex={-1}>{"Step 16：Amazon Q Developer（と後継 Kiro）によるテスト生成（Skill 3.3.6）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.3.6"}</strong>{": Amazon Q Developer を使って自動テストを生成する"}</p>{" "}</blockquote>
{" "}
<h3>{"16.1 まず最新状況を押さえる（重要）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 62">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容（2026-10-03 時点で確認）"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"試験ガイド"}</td>

<td>{"Skill 3.3.6 は "}<strong>{"Amazon Q Developer"}</strong>{" と記載"}</td>

</tr>

<tr>

<td>{"新規サインアップ"}</td>

<td><strong>{"2026-05-15 に停止"}</strong></td>

</tr>

<tr>

<td>{"IDE プラグイン／有料サブスクリプション"}</td>

<td><strong>{"2027-04-30 にサポート終了"}</strong>{"（それまで重大なバグ修正は継続）"}</td>

</tr>

<tr>

<td>{"後継"}</td>

<td><strong>{"Kiro"}</strong>{"（仕様駆動のエージェント型開発環境：IDE / CLI）"}</td>

</tr>

<tr>

<td>{"継続するもの"}</td>

<td>{"AWS マネジメントコンソール内の Q Developer、ドキュメントサイト、コンソールモバイルアプリ、Slack / Teams 向けチャットアプリ連携"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"💡 "}<strong>{"学習のコツ"}</strong>{": 試験では「Q Developer がテストコードを生成できる」という "}<strong>{"機能概念"}</strong>{" が問われる可能性があります。実務や今後の学習では Kiro でも同様のこと（テスト生成、レビュー、リファクタリング）ができる、と理解しておきましょう。"}</p>{" "}</blockquote>
{" "}
<h3>{"16.2 AI によるテスト生成の流れ"}</h3>
{" "}
<Diagram id="d27" label="Step 16：Amazon Q Developer（と後継 Kiro）によるテスト生成（Skill 3.3.6）の図解 d27" />
{" "}
<h3>{"16.3 何ができるか"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 63">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"単体テストの生成"}</strong></td>

<td>{"関数を読み取り、正常系・境界値・異常系のテスト案を作る"}</td>

</tr>

<tr>

<td><strong>{"モックの提案"}</strong></td>

<td>{"AWS SDK 呼び出し等を模擬するコードを提案"}</td>

</tr>

<tr>

<td><strong>{"カバレッジ向上"}</strong></td>

<td>{"不足しているケースの追加"}</td>

</tr>

<tr>

<td><strong>{"説明・リファクタリング"}</strong></td>

<td>{"コードの説明、改善案"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"16.4 使い方のコツ（プロンプトの例）"}</h3>
{" "}
<ul>
{" "}
<li>{"「この関数に対して pytest の単体テストを書いてください。DynamoDB 呼び出しは moto でモック化し、"}<strong>{"正常系・入力欠損・DB エラー"}</strong>{" の 3 パターンを含めてください。」"}</li>
{" "}
<li><strong>{"テスト対象、テストフレームワーク、モック方針、網羅したいケース"}</strong>{" を明示すると品質が上がります。"}</li>
{" "}
</ul>
{" "}
<h3>{"16.5 ベストプラクティス（AI 利用時の注意）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 64">
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

<td><strong>{"生成されたテストは必ず人がレビュー"}</strong>{" する"}</td>

<td>{"期待値が実装の誤りをそのまま追認している場合がある"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"機密情報（鍵・個人情報）をプロンプトに入れない"}</strong></td>

<td>{"情報漏洩防止"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"生成物も "}<strong>{"CI で実行し、通ることを確認"}</strong></td>

<td>{"品質保証"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td>{"生成されたテストを "}<strong>{"コードレビューの対象"}</strong>{" にする"}</td>

<td>{"チーム標準の維持"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong>{"セキュリティスキャン"}</strong>{" と併用する"}</td>

<td>{"脆弱なコードの混入防止"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"AI に "}<strong>{"頼りきらず、重要な仕様ケースは自分で定義"}</strong>{" する"}</td>

<td>{"品質の最終責任は人にある"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"16.6 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 65">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"既存コードに対する単体テストを素早く作りたい"}</td>

<td><strong>{"Amazon Q Developer のテスト生成"}</strong>{"（IDE のチャット）"}</td>

</tr>

<tr>

<td>{"生成されたテストの扱い"}</td>

<td><strong>{"レビューして CI に組み込む"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"16.7 エマージングトピック：AI と CI/CD（採点対象外の先行出題）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 66">
<table>

<thead>

<tr>

<th scope="col">{"観点"}</th>

<th scope="col">{"例"}</th>

<th scope="col">{"気をつける点"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"自動デプロイ承認"}</td>

<td>{"変更内容・テスト結果を AI が要約して承認者を支援"}</td>

<td><strong>{"最終承認は人間"}</strong>{" またはポリシーで明確に制御"}</td>

</tr>

<tr>

<td>{"環境プロビジョニング"}</td>

<td>{"AI が IaC の雛形を生成"}</td>

<td>{"生成 IaC は "}<strong>{"cfn-lint・レビュー・変更セット"}</strong>{" で検証"}</td>

</tr>

<tr>

<td>{"デプロイ後検証"}</td>

<td>{"AI がログ・メトリクスを分析して異常を検出"}</td>

<td>{"誤検知を前提に、"}<strong>{"自動ロールバック条件はアラームで明示"}</strong></td>

</tr>

<tr>

<td>{"テスト自動化"}</td>

<td>{"テスト生成・結果分析・リグレッション"}</td>

<td>{"生成物のレビュー必須"}</td>

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
<a className="ref" href="https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Q Developer IDE プラグインのサポート終了と Kiro への移行"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/amazonq/latest/qdeveloper-ug/q-developer-ide-end-of-support.html"}</span></a>
<a className="ref" href="https://kiro.dev/docs/upgrade-guides/migrating-from-q-developer/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"Kiro 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Kiro への移行ガイド"}</span><span className="ref-url"><b>{"kiro.dev"}</b>{"/docs/upgrade-guides/migrating-from-q-developer/"}</span></a>
<a className="ref" href="https://kiro.dev/" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"Kiro 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Kiro 公式サイト"}</span><span className="ref-url"><b>{"kiro.dev"}</b>{"/"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/amazonq/latest/qdeveloper-ug/what-is.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Amazon Q Developer ユーザーガイド"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/amazonq/latest/qdeveloper-ug/what-is.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/aws-certification/latest/developer-associate-02/developer-associate-02.html#developer-associate-02-emerging-topics" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"試験ガイド（エマージングトピック）"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/aws-certification/latest/developer-associate-02/developer-associate-02.html#developer-associate-02-emerging-topics"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
