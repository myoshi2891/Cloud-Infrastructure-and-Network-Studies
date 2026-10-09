import { Diagram } from '../Diagram';
/** Skill 1.1.11 Amazon Q Developerを全量保持する。 */
export function Sk1111(){return (<section className="section" id="sk-1-1-11" tabIndex={-1}>
<h2>{"Skill 1.1.11 Amazon Q Developer"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: Amazon Q Developer を使って開発を支援する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"生成 AI の開発アシスタント"}</strong>{"を使って、コードの作成・説明・テスト・レビュー・AWS の質問への回答を効率化するスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"主な機能"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 43">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"インラインコード補完"}</strong></td>

<td>{"エディタで入力中に、コードの続きを提案"}</td>

</tr>

<tr>

<td><strong>{"チャット"}</strong></td>

<td>{"コードや AWS について自然言語で質問・説明・デバッグ支援"}</td>

</tr>

<tr>

<td><strong>{"エージェント的なコーディング"}</strong></td>

<td>{"実装計画の作成、複数ファイルの変更、シェルコマンドの提案など（従来は "}<code>{"/dev"}</code>{" と呼ばれていた機能）"}</td>

</tr>

<tr>

<td><strong>{"ユニットテスト生成"}</strong></td>

<td>{"既存コードに対するテストの自動生成（従来 "}<code>{"/test"}</code>{"）"}</td>

</tr>

<tr>

<td><strong>{"コードレビュー / セキュリティスキャン"}</strong></td>

<td>{"脆弱性やコード品質の問題を検出し、修正案を提示（従来 "}<code>{"/review"}</code>{"）"}</td>

</tr>

<tr>

<td><strong>{"コード変換"}</strong></td>

<td>{"Java のバージョンアップや .NET の移植（有料プランの機能）"}</td>

</tr>

<tr>

<td><strong>{"AWS コンソール内の Amazon Q Developer"}</strong></td>

<td>{"AWS の使い方、エラーの切り分け、リソースの質問への回答"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"最新状況の注意（2026 年 10 月時点）"}</h4>
{" "}
<p>{"AWS は "}<strong>{"Amazon Q Developer の IDE プラグインと有料サブスクリプションを 2027 年 4 月 30 日にサポート終了"}</strong>{"とし、後継として "}<strong>{"Kiro"}</strong>{"（仕様駆動型のエージェント開発環境）への移行を案内しています。一方、"}<strong>{"AWS マネジメントコンソール内の Amazon Q Developer や、Slack / Microsoft Teams 連携などは、この終了の対象外"}</strong>{"と案内されています。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 44">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"状況"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"IDE プラグイン・有料サブスクリプション"}</td>

<td>{"2027 年 4 月 30 日にサポート終了"}</td>

</tr>

<tr>

<td>{"後継"}</td>

<td>{"Kiro（仕様駆動開発、エージェント、MCP 対応）"}</td>

</tr>

<tr>

<td>{"コンソール内の Amazon Q Developer"}</td>

<td>{"継続（終了の対象外）"}</td>

</tr>

<tr>

<td>{"DVA-C02 の試験ガイド"}</td>

<td><strong>{"Skill 1.1.11 として Amazon Q Developer が記載されている"}</strong>{"ため、試験対策としては機能の理解が必要"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"試験は公式の試験ガイドに沿って出題されます。"}<strong>{"ガイドに載っている Amazon Q Developer の機能（補完・チャット・テスト生成・レビュー・セキュリティスキャンなど）の理解"}</strong>{"を優先し、実務で新規に導入する場合は最新の公式案内（Kiro を含む）を確認してください。"}</p>{" "}</blockquote>
{" "}
<h4>{"AI 支援開発の「新興トピック」への備え"}</h4>
{" "}
<p>{"試験ガイドの「Emerging topics」では、スコアに影響しない問題として、次のような内容が出る可能性があると記載されています。"}</p>
{" "}
<ul>
{" "}
<li>{"AI 支援ツールで、コードの生成・レビュー・最適化・リファクタリング・セキュリティスキャンを行う"}</li>
{" "}
<li>{"AI サービスを組み込む際の"}<strong>{"セキュリティリスク"}</strong>{"の特定と軽減（データプライバシー、アクセス管理、モデルの入出力の制御、"}<strong>{"ログに機密情報を出さない"}</strong>{"など）"}</li>
{" "}
<li>{"AI ツールによるテスト生成、CI/CD の支援、エラー分析、最適化の提案"}</li>
{" "}
</ul>
{" "}
<figure className="diagram-card"><Diagram id="d14" label="Skill 1.1.11 Amazon Q Developerの図解 d14" /></figure>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"生成されたコードは必ず人間がレビュー"}</strong>{"し、テストとセキュリティスキャンを通してから採用する"}</li>
{" "}
<li>{"プロンプトや共有するコードに"}<strong>{"認証情報・個人情報・機密データを含めない"}</strong></li>
{" "}
<li>{"生成コードの "}<strong>{"IAM 権限は最小権限"}</strong>{"になっているか確認する（ワイルドカード "}<code>{"*"}</code>{" の権限を鵜呑みにしない）"}</li>
{" "}
<li>{"生成 AI は"}<strong>{"補助"}</strong>{"であり、責任は開発者にある"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「既存関数のユニットテストを素早く作りたい」→ "}<strong>{"Amazon Q Developer のテスト生成"}</strong></li>
{" "}
<li>{"「コードの脆弱性をコミット前に検出したい」→ "}<strong>{"セキュリティスキャン / コードレビュー機能"}</strong></li>
{" "}
<li>{"「AWS サービスの使い方をコード上で質問したい」→ "}<strong>{"IDE のチャット"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
