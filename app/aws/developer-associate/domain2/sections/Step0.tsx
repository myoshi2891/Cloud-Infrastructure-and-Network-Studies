import { Diagram } from '../Diagram';
/** 原本のStep 0　試験の概要とこのガイドの使い方を省略せず収録。 */
export function Step0() { return (<section className="section">
<h2 id="step-0" tabIndex={-1}>{"Step 0 試験の概要とこのガイドの使い方"}</h2>
{" "}
<h3>{"0-1 DVA-C02とは"}</h3>
{" "}
<p>{"公式試験ガイドによると、DVA-C02は開発者ロールの人向けで、AWSクラウド上のアプリケーションの"}<strong>{"開発・テスト・デプロイ・デバッグ"}</strong>{"の能力を検証します。検証される能力には「アプリケーションコードとデータの保護（Secure application code and data）」が含まれています。"}</p>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"スコア対象の問題数"}</td>

<td>{"50問"}</td>

</tr>

<tr>

<td>{"採点対象外（アンスコア）問題"}</td>

<td>{"15問（どれがそれかは分からない）"}</td>

</tr>

<tr>

<td>{"試験時間"}</td>

<td>{"130分"}</td>

</tr>

<tr>

<td>{"合格スコア"}</td>

<td>{"720点（100〜1,000のスケールスコア）"}</td>

</tr>

<tr>

<td>{"採点モデル"}</td>

<td>{"補償型（各ドメインで合格点を取る必要はなく、全体で合格すればよい）"}</td>

</tr>

<tr>

<td>{"問題形式"}</td>

<td>{"単一選択（正解1・不正解3）と複数選択（5択以上から2つ以上選ぶ）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"0-2 ドメインの重み"}</h3>
{" "}
<div className="table-wrap">
<table>

<thead>

<tr>

<th scope="col">{"ドメイン"}</th>

<th scope="col">{"配点比率"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1. AWSサービスによる開発"}</td>

<td>{"32%"}</td>

</tr>

<tr>

<td><strong>{"2. セキュリティ（このガイド）"}</strong></td>

<td><strong>{"26%"}</strong></td>

</tr>

<tr>

<td>{"3. デプロイ"}</td>

<td>{"24%"}</td>

</tr>

<tr>

<td>{"4. トラブルシューティングと最適化"}</td>

<td>{"18%"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"セキュリティは"}<strong>{"全体の約4分の1"}</strong>{"を占める重要ドメインです。"}</p>
{" "}
<h3>{"0-3 ドメイン2の構成（3タスク・17スキル）"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={0} label="Step 0　試験の概要とこのガイドの使い方の図解" />
</div>
{" "}
<h3>{"0-4 試験範囲外（Out of scope）の目安"}</h3>
{" "}
<p>{"公式ガイドは、受験者に期待されない業務として、アーキテクチャ設計、CI/CDパイプラインの設計・作成、"}<strong>{"IAMユーザー／グループの管理"}</strong>{"、サーバー／OSの管理、ネットワーク基盤の設計（VPC、Direct Connectなど）を挙げています。したがって本ガイドでは、IAMは「"}<strong>{"開発者として安全に使う"}</strong>{"」観点（ロール、ポリシーを読み書きする、トークンを扱う）を中心に学びます。"}</p>
{" "}
<h3>{"0-5 学習ロードマップ"}</h3>
{" "}
<div className="diagram-card">
<Diagram index={1} label="Step 0　試験の概要とこのガイドの使い方の図解" />
</div>
{" "}
<h3>{"0-6 各Stepの読み方"}</h3>
{" "}
<p>{"各Stepは次の順序で書かれています。"}</p>
{" "}
<ol>
{" "}
<li><strong>{"試験で問われること"}</strong>{"（対応するスキルID）"}</li>
{" "}
<li><strong>{"やさしい解説"}</strong>{"（用語の意味から）"}</li>
{" "}
<li><strong>{"図・表"}</strong>{"（Mermaidと表）"}</li>
{" "}
<li><strong>{"コード例"}</strong>{"（CLI／Python／JSON）"}</li>
{" "}
<li><strong>{"ベストプラクティス"}</strong></li>
{" "}
<li><strong>{"試験のひっかけポイント"}</strong></li>
{" "}
<li><strong>{"根拠ソース（URL）"}</strong></li>
{" "}
</ol>
{" "}
<blockquote>{" "}<p><strong>{"注意"}</strong>{"：AWSのサービスは頻繁に更新されます。数値（上限・既定値）や新機能は、受験直前に必ず公式ドキュメントで再確認してください。"}</p>{" "}</blockquote>
{" "}
<hr />
{" "}
</section>); }
