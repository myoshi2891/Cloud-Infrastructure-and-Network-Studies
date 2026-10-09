import { Diagram } from '../Diagram';
/** Skill 1.2.4 Lambda のテストを全量保持する。 */
export function Sk124(){return (<section className="section" id="sk-1-2-4" tabIndex={-1}>
<h2>{"Skill 1.2.4 Lambda のテスト"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: AWS のサービスとツールを使って、テストコードを書いて実行する"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"Lambda 関数を"}<strong>{"ローカル・クラウド・本番"}</strong>{"の各段階でテストする方法を知るスキルです。Skill 1.1.7 のユニットテストを土台に、クラウド上での確認方法を足します。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 64">
<table>

<thead>

<tr>

<th scope="col">{"段階"}</th>

<th scope="col">{"方法"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"ローカル"}</td>

<td>{"ユニットテスト（pytest、Jest など）+ モック"}</td>

<td>{"AWS に接続せずロジックを確認"}</td>

</tr>

<tr>

<td>{"ローカル"}</td>

<td><code>{"sam local invoke"}</code>{" / "}<code>{"sam local start-api"}</code></td>

<td>{"Lambda の実行環境を再現して動かす（Docker が必要）"}</td>

</tr>

<tr>

<td>{"クラウド"}</td>

<td><strong>{"Lambda コンソールのテストイベント"}</strong></td>

<td>{"JSON のイベントを作って実行（1 関数あたり保存できるテストイベントは 10 件まで）"}</td>

</tr>

<tr>

<td>{"クラウド"}</td>

<td><strong>{"AWS CLI / SDK の "}<code>{"invoke"}</code></strong></td>

<td><code>{"aws lambda invoke --function-name fn --payload file://event.json out.json"}</code></td>

</tr>

<tr>

<td>{"クラウド"}</td>

<td><strong>{"Lambda のテスト用 IDE 機能（AWS Toolkit など）"}</strong></td>

<td>{"IDE からリモート呼び出し・デバッグ"}</td>

</tr>

<tr>

<td>{"結合"}</td>

<td>{"実際の AWS リソースに対するテスト（専用の開発アカウント / スタック）"}</td>

<td>{"権限・イベント形式・他サービスとの連携を確認"}</td>

</tr>

<tr>

<td>{"段階的リリース"}</td>

<td><strong>{"バージョン + 加重エイリアス"}</strong>{"、"}<strong>{"CodeDeploy"}</strong>{" でカナリア / 線形ロールアウト"}</td>

<td>{"本番トラフィックの一部で検証し、アラームで"}<strong>{"自動ロールバック"}</strong></td>

</tr>

<tr>

<td>{"観測"}</td>

<td>{"CloudWatch Logs / Metrics、"}<strong>{"AWS X-Ray"}</strong></td>

<td>{"実行結果・遅延・エラーの確認"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d20" label="Skill 1.2.4 Lambda のテストの図解 d20" /></figure>
{" "}
<h4>{"invoke の呼び出しタイプ（CLI / SDK）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 65">
<table>

<thead>

<tr>

<th scope="col"><code>{"InvocationType"}</code></th>

<th scope="col">{"動作"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"RequestResponse"}</code>{"（既定）"}</td>

<td>{"同期。結果を待つ"}</td>

</tr>

<tr>

<td><code>{"Event"}</code></td>

<td>{"非同期。"}<code>{"202"}</code>{" を即返す"}</td>

</tr>

<tr>

<td><code>{"DryRun"}</code></td>

<td>{"権限・パラメータの検証のみで"}<strong>{"実行しない"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"同期呼び出しで "}<code>{"LogType=Tail"}</code>{" を指定すると、"}<strong>{"末尾 4 KB の実行ログ"}</strong>{"を応答で受け取れ、テスト時のデバッグに便利です。"}</p>{" "}</blockquote>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"ロジックはハンドラーの外"}</strong>{"に出してユニットテストし、"}<strong>{"境界（AWS 呼び出し）はモック"}</strong>{"する"}</li>
{" "}
<li>{"結合テストは"}<strong>{"本番とは別のアカウント / スタック"}</strong>{"で行う"}</li>
{" "}
<li>{"本番リリースは"}<strong>{"加重エイリアス + CodeDeploy"}</strong>{"で段階的に行い、"}<strong>{"CloudWatch アラームと連動した自動ロールバック"}</strong>{"を設定する"}</li>
{" "}
<li>{"テストでは"}<strong>{"本物のイベント形式"}</strong>{"（"}<code>{"sam local generate-event"}</code>{" やコンソールの共有テストイベント）を使う"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「権限だけを確認して、関数は実行したくない」→ "}<strong><code>{"DryRun"}</code></strong></li>
{" "}
<li>{"「新バージョンを少しずつ公開し、問題があれば自動で戻したい」→ "}<strong>{"加重エイリアス + CodeDeploy（カナリア / 線形）+ アラーム"}</strong></li>
{" "}
<li>{"「ローカルで Lambda を再現して確認」→ "}<strong><code>{"sam local invoke"}</code></strong></li>
{" "}
</ul>
{" "}
</section>);}
