/** 原本app-aの全内容。 */
export function Section26() { return (<section className="section" id="app-a" tabIndex={-1}>
{" "}
<div className="sec-head">
<div className="sec-icon">
<i className="ti ti-clipboard-list" aria-hidden="true"></i>
</div>
<div>
<p className="eyebrow">{"付録 A"}</p>
<h2>{"練習問題と解答"}</h2>
</div>
</div>
{" "}
<p>{"本試験に近い形式の練習問題です。先に自分で答えを考えてから、解答を確認してください。"}</p>
{" "}
<h3>{"問題"}</h3>
{" "}
<p><strong>{"問 1."}</strong>{" Lambda 関数の処理時間が長いと感じています。どのダウンストリーム呼び出しが全体の遅延の原因かを特定したい。最も適切な方法はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. CloudWatch Logs の "}<code>{"REPORT"}</code>{" 行だけを確認する"}</li>
{" "}
<li>{"B. Lambda のアクティブトレースを有効にし、X-Ray のトレースでサブセグメントを確認する"}</li>
{" "}
<li>{"C. Lambda のメモリを最大にする"}</li>
{" "}
<li>{"D. CloudTrail でイベントを検索する"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 2."}</strong>{" Lambda 関数から、API 呼び出しによる追加の遅延なく、非同期にカスタムメトリクスを CloudWatch へ送りたい。最も適切なのはどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. 関数内で同期的に "}<code>{"PutMetricData"}</code>{" を呼ぶ"}</li>
{" "}
<li>{"B. 埋め込みメトリクスフォーマット(EMF)の JSON をログに出力する"}</li>
{" "}
<li>{"C. 別の Lambda を毎分起動してログを集計する"}</li>
{" "}
<li>{"D. CloudTrail のログからメトリクスを作る"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 3."}</strong>{" X-Ray のトレースに「会員ランク」を付け、特定ランクのトレースだけを検索できるようにしたい。どれを使うか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. メタデータ"}</li>
{" "}
<li>{"B. アノテーション"}</li>
{" "}
<li>{"C. セグメント名の変更"}</li>
{" "}
<li>{"D. サンプリングルールの変更"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 4."}</strong>{" 重要な Lambda 関数が、他の関数の急増によってスロットルされています。この重要な関数の実行枠を確保し、追加料金も避けたい。どうすればよいか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. プロビジョニングされた同時実行数を設定する"}</li>
{" "}
<li>{"B. 予約済み同時実行数を設定する"}</li>
{" "}
<li>{"C. メモリを増やす"}</li>
{" "}
<li>{"D. タイムアウトを短くする"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 5."}</strong>{" SQS をイベントソースとする Lambda で、同じメッセージが重複して処理されます。関数のタイムアウトは 60 秒、キューの可視性タイムアウトは 30 秒です。最初に行うべき修正はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. 可視性タイムアウトを関数のタイムアウトより十分長く(目安 6 倍以上)する"}</li>
{" "}
<li>{"B. バッチサイズを 1 にする"}</li>
{" "}
<li>{"C. Lambda のメモリを減らす"}</li>
{" "}
<li>{"D. キューを FIFO に変更する"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 6."}</strong>{" SNS トピックに「注文イベント」を発行しています。ある購読者は "}<code>{"status = \"approved\""}</code>{" のメッセージだけ処理したい。購読者のコード変更を最小にするには。"}</p>
{" "}
<ul>
{" "}
<li>{"A. 購読者のコードで "}<code>{"status"}</code>{" を判定して読み捨てる"}</li>
{" "}
<li>{"B. 購読者のサブスクリプションにフィルターポリシーを設定する"}</li>
{" "}
<li>{"C. 発行者側で "}<code>{"approved"}</code>{" 専用のトピックを増やす"}</li>
{" "}
<li>{"D. 購読者を SQS に置き換える"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 7."}</strong>{" CloudFront で、ビューワーの言語ごとに内容を出し分けつつ、キャッシュヒット率を高く保ちたい。適切な設定はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. すべてのヘッダーをキャッシュキーに含める"}</li>
{" "}
<li>{"B. "}<code>{"Accept-Language"}</code>{" のみをキャッシュキーに含めるキャッシュポリシーを使う"}</li>
{" "}
<li>{"C. キャッシュを無効化する"}</li>
{" "}
<li>{"D. "}<code>{"User-Agent"}</code>{" をキャッシュキーに含める"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 8."}</strong>{" DynamoDB の読み取りが特定のアイテムに集中し、レイテンシが問題になっています。アプリのコード変更を最小限に、マイクロ秒単位の読み取りを実現するには。"}</p>
{" "}
<ul>
{" "}
<li>{"A. DAX を導入する"}</li>
{" "}
<li>{"B. Scan を使う"}</li>
{" "}
<li>{"C. オンデマンドから変更する"}</li>
{" "}
<li>{"D. グローバルテーブルにする"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 9."}</strong>{" ALB 配下のアプリで、利用者が 503 を受け取っています。まず確認すべきことは何か。"}</p>
{" "}
<ul>
{" "}
<li>{"A. ターゲットグループに正常なターゲットがあるか(ヘルスチェックの状態)"}</li>
{" "}
<li>{"B. CloudFront のキャッシュ設定"}</li>
{" "}
<li>{"C. Lambda の予約済み同時実行数"}</li>
{" "}
<li>{"D. SNS のフィルターポリシー"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 10."}</strong>{" CodeDeploy で EC2 へのデプロイが失敗しました。原因の調査として最も適切なのはどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. CloudFront のアクセスログ"}</li>
{" "}
<li>{"B. CodeDeploy のライフサイクルイベントの失敗理由と、インスタンス上のエージェントのログを確認する"}</li>
{" "}
<li>{"C. S3 のバケットポリシーのみ確認する"}</li>
{" "}
<li>{"D. DynamoDB のメトリクス"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 11."}</strong>{" (複数選択)Lambda から RDS へ接続するアプリで、トラフィック急増時に「接続数が多すぎる」エラーが出ます。適切な対策を 2 つ選べ。"}</p>
{" "}
<ul>
{" "}
<li>{"A. RDS Proxy を使う"}</li>
{" "}
<li>{"B. 接続をハンドラーの外で作成し再利用する"}</li>
{" "}
<li>{"C. 呼び出しごとに新しい接続を作る"}</li>
{" "}
<li>{"D. タイムアウトを最大にする"}</li>
{" "}
<li>{"E. ログレベルを DEBUG にする"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 12."}</strong>{" Lambda 関数のコストを下げつつ速くしたい。関数は CPU 負荷が高く、"}<code>{"Max Memory Used"}</code>{" は割り当ての 20% 程度です。最も適切な調査はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. メモリを最小にする"}</li>
{" "}
<li>{"B. Power Tuning でメモリ設定を変えながらコストと速度を実測する"}</li>
{" "}
<li>{"C. タイムアウトを短くする"}</li>
{" "}
<li>{"D. プロビジョニング済み同時実行数を設定する"}</li>
{" "}
</ul>
{" "}
<p><strong>{"問 13."}</strong>{" 「デプロイの失敗・成功をチームのチャットに自動で通知したい」。最も適切な構成はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. CloudWatch Logs のメトリクスフィルター"}</li>
{" "}
<li>{"B. CodeDeploy / CodePipeline の状態変化を EventBridge ルールで検知して SNS(チャット連携)へ通知する"}</li>
{" "}
<li>{"C. X-Ray のサンプリングルール"}</li>
{" "}
<li>{"D. Route 53 のヘルスチェック"}</li>
{" "}
</ul>
{" "}
<h3>{"解答と解説"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="表 148">
<table className="t3">

<thead>

<tr>

<th scope="col">{"問"}</th>

<th scope="col">{"正解"}</th>

<th scope="col">{"解説"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"1"}</td>

<td><strong>{"B"}</strong></td>

<td>{"下流呼び出しごとの時間は "}<strong>{"トレースのサブセグメント"}</strong>{" で分かる。REPORT 行は関数全体の時間のみ。CloudTrail は API 操作の監査用("}<a href="#step-12">{"Step 12"}</a>{")"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"B"}</strong></td>

<td><strong>{"EMF"}</strong>{" は API 呼び出し不要で非同期。"}<code>{"PutMetricData"}</code>{" の同期呼び出しは遅延・コスト・スロットリングの原因("}<a href="#step-4">{"Step 4"}</a>{", "}<a href="#step-11">{"Step 11"}</a>{")"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td><strong>{"B"}</strong></td>

<td><strong>{"アノテーションはインデックスされ、フィルター式で検索できる"}</strong>{"。メタデータは検索不可("}<a href="#step-13">{"Step 13"}</a>{")"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"B"}</strong></td>

<td><strong>{"予約済み同時実行数"}</strong>{" は枠を確保でき "}<strong>{"無料"}</strong>{"。プロビジョニング済みは有料でコールドスタート対策が目的("}<a href="#step-16">{"Step 16"}</a>{")"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td><strong>{"A"}</strong></td>

<td>{"可視性タイムアウトが関数のタイムアウトより短いと、処理中にメッセージが再び見えて "}<strong>{"重複処理"}</strong>{" される。目安は関数タイムアウトの 6 倍以上("}<a href="#step-7">{"Step 7"}</a>{")"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td><strong>{"B"}</strong></td>

<td><strong>{"サブスクリプションフィルターポリシー"}</strong>{" で SNS 側で絞り込む。コードも処理も減る("}<a href="#step-19">{"Step 19"}</a>{")"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td><strong>{"B"}</strong></td>

<td>{"出し分けに必要な "}<strong>{"最小限のヘッダーのみ"}</strong>{" をキャッシュキーに入れる。"}<code>{"User-Agent"}</code>{" や全ヘッダーはヒット率を大きく下げる("}<a href="#step-20">{"Step 20"}</a>{")"}</td>

</tr>

<tr>

<td>{"8"}</td>

<td><strong>{"A"}</strong></td>

<td><strong>{"DAX"}</strong>{" は DynamoDB 専用のインメモリキャッシュで、クライアント差し替え中心の導入でマイクロ秒の読み取りが可能("}<a href="#step-21">{"Step 21"}</a>{")"}</td>

</tr>

<tr>

<td>{"9"}</td>

<td><strong>{"A"}</strong></td>

<td>{"ALB の 503 は "}<strong>{"正常なターゲットがない"}</strong>{" 場合。ヘルスチェックの状態を確認("}<a href="#step-15">{"Step 15"}</a>{", "}<a href="#step-23">{"Step 23"}</a>{")"}</td>

</tr>

<tr>

<td>{"10"}</td>

<td><strong>{"B"}</strong></td>

<td>{"CodeDeploy は "}<strong>{"ライフサイクルイベントの失敗理由"}</strong>{" と "}<strong>{"エージェントのログ"}</strong>{" が基本の調査先("}<a href="#step-6">{"Step 6"}</a>{")"}</td>

</tr>

<tr>

<td>{"11"}</td>

<td><strong>{"A, B"}</strong></td>

<td><strong>{"RDS Proxy"}</strong>{" で接続をプールし、"}<strong>{"接続を再利用"}</strong>{"。呼び出しごとの新規接続は接続数を押し上げる("}<a href="#step-22">{"Step 22"}</a>{")"}</td>

</tr>

<tr>

<td>{"12"}</td>

<td><strong>{"B"}</strong></td>

<td>{"メモリは "}<strong>{"CPU と比例"}</strong>{"。CPU 負荷が高い処理はメモリを増やすと速くなり、トータルコストが下がることがある。"}<strong>{"実測(Power Tuning)"}</strong>{" が正解("}<a href="#step-18">{"Step 18"}</a>{")"}</td>

</tr>

<tr>

<td>{"13"}</td>

<td><strong>{"B"}</strong></td>

<td>{"デプロイの "}<strong>{"状態変化イベント"}</strong>{" は EventBridge で検知し、SNS 経由で通知する("}<a href="#step-14">{"Step 14"}</a>{")"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
</section>); }
