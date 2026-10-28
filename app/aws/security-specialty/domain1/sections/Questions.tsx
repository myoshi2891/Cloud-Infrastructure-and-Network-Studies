export default function Questions() {
    return (
        <section className="guide-part" data-part="questions">
            <h2 id="7-確認問題" tabIndex={-1}>7. 確認問題</h2>
<p>各問題の下の「答えを見る」を開くと解答と解説が表示されます。</p>
<h3 id="問題-1" tabIndex={-1}>問題 1</h3>
<p>組織内の全アカウント、全リージョンの管理イベント (管理 API アクティビティ) を漏れなく記録し、ワークロードアカウントの管理者が削除できないようにしたい。最も適切な構成はどれか。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: 管理アカウントまたは委任管理者で、マルチリージョンの組織トレイルを作成し、ログアーカイブ専用アカウントの S3 バケットに配信する。ログファイル整合性検証を有効にし、SSE-KMS で暗号化する。S3 オブジェクトアクセスなどのデータイベントも記録する必要がある場合は、データイベントセレクターを追加する。</p>{' '}<p>解説: 組織トレイルなら新規アカウントも自動で対象になります。ログを別アカウントに集めることで、ワークロード管理者による削除を防げます。</p></details>
<h3 id="問題-2" tabIndex={-1}>問題 2</h3>
<p>GuardDuty を使うために、VPC フローログと Route 53 のクエリログを自分で有効化する必要があるか。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: 必要ない。</p>{' '}<p>解説: GuardDuty は CloudTrail、VPC フローログ、DNS ログなどを、独立したデータストリームとして直接参照します。自分でフローログを有効化しなくても検出できます。ただし、自分での調査や長期保管のためにフローログを有効化するのは別の話です。</p></details>
<h3 id="問題-3" tabIndex={-1}>問題 3</h3>
<p>CloudTrail の StopLogging 操作が実行されたら、ただちに通知したい。どうするか。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: EventBridge ルールで、CloudTrail 経由の API 呼び出しイベント (eventName が StopLogging など) を検出し、SNS などに通知する。または、CloudTrail を CloudWatch Logs に送り、メトリクスフィルターとアラームで通知する。</p></details>
<h3 id="問題-4" tabIndex={-1}>問題 4</h3>
<p>Lambda 関数を実行したが、CloudWatch Logs にロググループが作られない。最初に確認すべきことは何か。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: Lambda の実行ロールに、<code>logs:CreateLogGroup</code>、<code>logs:CreateLogStream</code>、<code>logs:PutLogEvents</code>{' '}の権限があるか (<code>AWSLambdaBasicExecutionRole</code>{' '}がアタッチされているか)。</p>{' '}<p>解説: Lambda はログの送信に実行ロールの権限を使います。権限がないと、ログが書き込まれません。</p></details>
<h3 id="問題-5" tabIndex={-1}>問題 5</h3>
<p>API Gateway (REST API) のステージで実行ログを有効にしたのに、ログが出力されない。見落としがちな設定は何か。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: アカウントレベルで、API Gateway が CloudWatch Logs に書き込むための IAM ロールの ARN を設定していない可能性がある (REST API・WebSocket API の場合)。HTTP API は実行ログを持たず、ステージのアクセスログと出力先ロググループの設定を確認する。</p></details>
<h3 id="問題-6" tabIndex={-1}>問題 6</h3>
<p>Security Hub CSPM のコントロールの評価結果が不正確になる (実際の設定と合わない WARNING や FAILED が表示される)。最も可能性の高い原因は何か。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: AWS Config の構成レコーダーが、該当する Security Hub CSPM コントロールが必要とするリソースタイプを記録していない (レコーダーが無効、または記録対象のリソースタイプが不足している)。</p>{' '}<p>解説: Security Hub CSPM の多くのコントロールは、Config のルールを基に評価されます。そのため、有効にしたコントロールが評価に使うリソースタイプを Config の構成レコーダーで記録する必要があります。記録されていないと、評価結果が WARNING や FAILED などの不正確な値になります。</p></details>
<h3 id="問題-7" tabIndex={-1}>問題 7</h3>
<p>複数のアカウント・リージョンにあるセキュリティログを OCSF に正規化して 1 か所に集め、既存の SIEM にもほぼリアルタイムで連携したい。適切なサービスと設定は何か。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: Amazon Security Lake を委任管理者で有効化し、ロールアップリージョンで集約する。SIEM にはデータアクセスのサブスクライバーを作成し、新しいオブジェクトの書き込み通知を受けて取り込む。</p></details>
<h3 id="問題-8" tabIndex={-1}>問題 8</h3>
<p>ELB のヘルスチェックが失敗し続けるが、アプリケーションは正常に動作している。まず何を確認するか。</p>
<details><summary>答えを見る</summary>{' '}<p>答え: ターゲットのセキュリティグループ (と NACL) が、ヘルスチェックの通信 (ロードバランサーなどからの通信) を許可しているか。あわせて、ヘルスチェックのパス、ポート、期待するレスポンスコードも確認する。</p></details>
<hr />
        </section>
    );
}
