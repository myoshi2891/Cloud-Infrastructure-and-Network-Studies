/** 原本app-dの全内容。 */
export function Section29() { return (<section className="section" id="app-d" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-bulb" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"付録 D"}</p>
<h2>{"新興トピック(AI 支援ツール)"}</h2>
</div>
</div>
{" "}
<p>{"試験ガイドには、"}<strong>{"採点されない事前テスト問題として出題される可能性がある新興トピック"}</strong>{" が記載されています(スコアには影響しません)。DVA-C02 のガイドが挙げる領域のうち、ドメイン 4 に関係するものを整理します。"}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 151">
<table className="t3">

<thead>

<tr>

<th scope="col">{"領域"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"本ガイドの関連 Step"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"AI 支援による "}<strong>{"エラー分析とトラブルシューティング提案"}</strong></td>

<td>{"AWS の AI ツール(例: Amazon Q Developer)でエラーの意味や対処案を得る"}</td>

<td>{"Step 1, 23"}</td>

</tr>

<tr>

<td>{"AI 支援による "}<strong>{"最適化の機会の特定"}</strong></td>

<td>{"ボトルネック検出、リソース使用量の最適化、コード効率の改善提案"}</td>

<td>{"Step 17, 22"}</td>

</tr>

<tr>

<td>{"AI 支援による "}<strong>{"テスト生成と自動化"}</strong></td>

<td>{"テスト生成、テスト結果の分析、回帰テストの自動化"}</td>

<td>{"Step 1"}</td>

</tr>

<tr>

<td>{"AI 支援による "}<strong>{"CI/CD の支援"}</strong></td>

<td>{"デプロイ承認、環境のプロビジョニング、デプロイ後の検証"}</td>

<td>{"Step 6"}</td>

</tr>

<tr>

<td><strong>{"AI サービス統合時のセキュリティ"}</strong></td>

<td>{"データプライバシー、アクセス管理、モデルの入出力の制御、"}<strong>{"機密コンテンツがログに出ないようにする"}</strong></td>

<td>{"Step 9"}</td>

</tr>

<tr>

<td>{"AI 支援によるコードの生成・レビュー・最適化"}</td>

<td>{"仕様駆動のコード生成、自動コードレビュー、セキュリティスキャン"}</td>

<td>{"Step 1"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p><strong>{"心構え:"}</strong>{" AI の提案は "}<strong>{"必ず人間が検証"}</strong>{" します(権限の広がり、機密の漏えい、誤った修正のリスク)。本質は本ガイドの Step 1〜24 の知識を "}<strong>{"AI がうまく補助する"}</strong>{" という位置づけです。"}</p>
{" "}
</section>); }
