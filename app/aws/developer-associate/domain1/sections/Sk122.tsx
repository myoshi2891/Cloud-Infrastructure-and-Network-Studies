import { Diagram } from '../Diagram';
/** Skill 1.2.2 Lambda の設定を全量保持する。 */
export function Sk122(){return (<section className="section" id="sk-1-2-2" tabIndex={-1}>
<h2>{"Skill 1.2.2 Lambda の設定"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: 環境変数とパラメータを定義して Lambda 関数を設定する（メモリ、同時実行数、タイムアウト、ランタイム、ハンドラー、レイヤー、拡張機能、トリガー、送信先など）"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p>{"Lambda の"}<strong>{"設定項目の意味と、上限値・ふるまい"}</strong>{"を覚えるスキルです。数値の暗記が得点に直結します。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"主要な設定項目と上限"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 55">
<table>

<thead>

<tr>

<th scope="col">{"項目"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"上限・既定"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"メモリ"}</strong></td>

<td>{"CPU もメモリに比例して割り当てられる"}</td>

<td><strong>{"128 MB〜10,240 MB"}</strong></td>

</tr>

<tr>

<td><strong>{"タイムアウト"}</strong></td>

<td>{"1 回の実行の最大時間"}</td>

<td>{"既定 "}<strong>{"3 秒"}</strong>{"、最大 "}<strong>{"900 秒（15 分）"}</strong></td>

</tr>

<tr>

<td><strong>{"ランタイム"}</strong></td>

<td>{"Python、Node.js、Java、.NET、Ruby、Go（OS 専用ランタイム）など。"}<strong>{"カスタムランタイム"}</strong>{"も可"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td><strong>{"ハンドラー"}</strong></td>

<td>{"関数の入口（例: Python "}<code>{"app.handler"}</code>{" = "}<code>{"app.py"}</code>{" の "}<code>{"handler"}</code>{" 関数）"}</td>

<td>{"—"}</td>

</tr>

<tr>

<td><strong>{"環境変数"}</strong></td>

<td>{"設定値を外部化"}</td>

<td><strong>{"合計 4 KB"}</strong></td>

</tr>

<tr>

<td><strong>{"レイヤー"}</strong></td>

<td>{"共通ライブラリを別パッケージにして共有"}</td>

<td><strong>{"関数あたり最大 5 つ"}</strong>{"。関数 + レイヤーの合計（展開後）"}<strong>{"250 MB"}</strong></td>

</tr>

<tr>

<td><strong>{"/tmp（一時ストレージ）"}</strong></td>

<td>{"一時的な作業領域"}</td>

<td><strong>{"512 MB〜10,240 MB"}</strong></td>

</tr>

<tr>

<td><strong>{"デプロイパッケージ"}</strong></td>

<td>{".zip（直接アップロード 50 MB、展開後 250 MB）または"}<strong>{"コンテナイメージ（最大 10 GB）"}</strong></td>

<td>{"—"}</td>

</tr>

<tr>

<td><strong>{"同時実行（既定）"}</strong></td>

<td>{"リージョン内のアカウント全体で同時に動ける数"}</td>

<td>{"既定 "}<strong>{"1,000"}</strong>{"（引き上げ可能）"}</td>

</tr>

<tr>

<td><strong>{"アーキテクチャ"}</strong></td>

<td><code>{"x86_64"}</code>{" または "}<code>{"arm64"}</code>{"（Graviton）"}</td>

<td>{"arm64 は価格性能比に優れることが多い"}</td>

</tr>

<tr>

<td><strong>{"呼び出しペイロード"}</strong></td>

<td>{"同期の要求 / 応答"}</td>

<td><strong>{"6 MB"}</strong></td>

</tr>

<tr>

<td><strong>{"非同期呼び出しのペイロード"}</strong></td>

<td>{"イベントのサイズ"}</td>

<td><strong>{"256 KB"}</strong>{"（最新の上限は公式クォータで確認）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><strong>{"メモリを増やすと CPU も増える"}</strong>{"ため、CPU 負荷の高い処理は、メモリを上げると"}<strong>{"実行時間が短くなって、料金が同程度か安くなる"}</strong>{"ことがあります（Skill 1.2.6）。"}</p>{" "}</blockquote>
{" "}
<h4>{"環境変数の扱い"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 56">
<table>

<thead>

<tr>

<th scope="col">{"ポイント"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"用途"}</td>

<td>{"テーブル名、ステージ名、ログレベルなど"}<strong>{"環境ごとに変わる値"}</strong></td>

</tr>

<tr>

<td>{"暗号化"}</td>

<td>{"保管時は "}<strong>{"KMS で暗号化"}</strong>{"。さらに保護したい場合は"}<strong>{"暗号化ヘルパー"}</strong>{"（転送中の暗号化）を使う"}</td>

</tr>

<tr>

<td>{"機密情報"}</td>

<td>{"パスワード・API キーは環境変数に"}<strong>{"平文で置かず"}</strong>{"、"}<strong>{"Secrets Manager / Parameter Store（SecureString）"}</strong>{"から取得する"}</td>

</tr>

<tr>

<td>{"予約された変数"}</td>

<td><code>{"AWS_REGION"}</code>{"、"}<code>{"AWS_LAMBDA_FUNCTION_NAME"}</code>{" など Lambda が設定するもの。上書き不可のものがある"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"実行ライフサイクル"}</h4>
{" "}
<p>{"Lambda の実行は "}<strong>{"Init → Invoke → Shutdown"}</strong>{" の 3 フェーズです。"}</p>
{" "}
<figure className="diagram-card"><Diagram id="d18" label="Skill 1.2.2 Lambda の設定の図解 d18" /></figure>
{" "}
<ul>
{" "}
<li><strong>{"コールドスタート"}</strong>{": 新しい実行環境を作る（Init フェーズ）ため、初回は遅い"}</li>
{" "}
<li><strong>{"ウォームスタート"}</strong>{": 既存の実行環境を再利用する。"}<strong>{"ハンドラーの外に書いたコード（SDK クライアント、DB 接続）は再利用される"}</strong></li>
{" "}
</ul>
{" "}
<h4>{"同時実行の制御"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 57">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"費用"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"予約済み同時実行（Reserved Concurrency）"}</strong></td>

<td>{"その関数が使える同時実行数を"}<strong>{"確保"}</strong>{"し、同時に"}<strong>{"上限"}</strong>{"にもなる。他の関数に食われず、下流を過負荷から守れる"}</td>

<td>{"追加料金なし"}</td>

</tr>

<tr>

<td><strong>{"プロビジョニング済み同時実行（Provisioned Concurrency）"}</strong></td>

<td>{"実行環境を"}<strong>{"事前に初期化しておく"}</strong>{"ことで、"}<strong>{"コールドスタートを抑える"}</strong>{"。バージョン / エイリアスに設定"}</td>

<td>{"追加料金あり"}</td>

</tr>

<tr>

<td><strong>{"SnapStart"}</strong></td>

<td>{"初期化済みの状態の"}<strong>{"スナップショット"}</strong>{"から高速に起動する。Java で提供され、Python・.NET にも対応"}</td>

<td>{"対応ランタイムで利用"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p><strong>{"「同時実行を制限して下流（DB や外部 API）を守りたい」→ 予約済み同時実行"}</strong>{"、"}<strong>{"「コールドスタートを避けたい」→ プロビジョニング済み同時実行 / SnapStart"}</strong>{"。混同しやすい重要な区別です。"}</p>{" "}</blockquote>
{" "}
<h4>{"バージョンとエイリアス"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 58">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"バージョン"}</strong></td>

<td>{"公開すると"}<strong>{"不変のスナップショット"}</strong>{"になる（"}<code>{"$LATEST"}</code>{" は可変）"}</td>

</tr>

<tr>

<td><strong>{"エイリアス"}</strong></td>

<td>{"バージョンを指す"}<strong>{"名前付きポインタ"}</strong>{"（"}<code>{"prod"}</code>{"、"}<code>{"dev"}</code>{"）。"}<strong>{"加重エイリアス"}</strong>{"で、トラフィックを 90 / 10 などに分けてカナリアリリース"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"拡張機能・トリガー・送信先"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 59">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"拡張機能（Extensions）"}</strong></td>

<td>{"監視・セキュリティ・設定取得などのツールを、関数と"}<strong>{"並行して動かす"}</strong>{"仕組み（ロギング、メトリクス送信など）"}</td>

</tr>

<tr>

<td><strong>{"トリガー"}</strong></td>

<td>{"関数を起動するもの。API Gateway、S3、SQS、SNS、EventBridge、Kinesis、DynamoDB Streams、ALB、"}<strong>{"関数 URL"}</strong>{" など"}</td>

</tr>

<tr>

<td><strong>{"送信先（Destinations）"}</strong></td>

<td>{"非同期呼び出しの"}<strong>{"成功 / 失敗の結果を別のサービスへ送る"}</strong>{"（Skill 1.2.3）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"設定値は環境変数・Parameter Store・Secrets Manager で外部化"}</strong>{"し、コードに埋め込まない"}</li>
{" "}
<li>{"共通ライブラリは"}<strong>{"レイヤー"}</strong>{"に切り出して再利用する（ただし合計サイズと数の上限に注意）"}</li>
{" "}
<li><strong>{"バージョン + エイリアス"}</strong>{"で安全にリリースし、"}<strong>{"加重エイリアス"}</strong>{"で段階的に切り替える"}</li>
{" "}
<li>{"依存先を守るなら"}<strong>{"予約済み同時実行"}</strong>{"、遅延を避けたいなら"}<strong>{"プロビジョニング済み同時実行 / SnapStart"}</strong></li>
{" "}
<li><strong><code>{"arm64"}</code></strong>{" を検討する（性能当たりのコストが良いことが多い）"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「処理が 15 分を超える」→ "}<strong>{"Lambda では不可。Step Functions / ECS / Batch へ"}</strong></li>
{" "}
<li>{"「パッケージが大きすぎる」→ "}<strong>{"レイヤー / コンテナイメージ（最大 10 GB）"}</strong></li>
{" "}
<li>{"「DB を守るため Lambda の同時実行数に上限を付けたい」→ "}<strong>{"予約済み同時実行"}</strong></li>
{" "}
<li>{"「コールドスタートが遅い」→ "}<strong>{"プロビジョニング済み同時実行 / SnapStart / 初期化処理の最適化"}</strong></li>
{" "}
<li>{"「新バージョンを一部のユーザーだけに公開したい」→ "}<strong>{"加重エイリアス"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
