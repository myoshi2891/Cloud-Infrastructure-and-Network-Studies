
/** 練習問題（15 問）を全量保持する。 */
export function Sec35(){return (<section className="section" id="sec-35" tabIndex={-1}>
<h2>{"練習問題（15 問）"}</h2>
{" "}
<p>{"答えは"}<strong>{"各問題の直後"}</strong>{"に載せています。まず自分で考えてから確認してください。"}</p>
{" "}
<p><strong>{"問 1."}</strong>{" ある電子商取引アプリでは、注文が確定すると、在庫・請求・分析の 3 つのシステムが、それぞれ独立して処理する必要がある。どれかのシステムが遅延しても、他に影響しないようにしたい。最も適切な構成はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. 注文サービスが 3 つのシステムを順番に同期呼び出しする"}</li>
{" "}
<li>{"B. 注文サービスが SNS トピックに発行し、3 つの SQS キューが購読する"}</li>
{" "}
<li>{"C. 3 つのシステムが注文テーブルを Scan して新しい注文を探す"}</li>
{" "}
<li>{"D. 注文サービスが 1 つの SQS キューに送り、3 つのシステムが同じキューから受信する"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。1 つのイベントを複数の宛先が"}<strong>{"独立して"}</strong>{"処理する "}<strong>{"SNS + SQS のファンアウト"}</strong>{"です。A は密結合、C は非効率、D は 1 つのメッセージを 1 つのコンシューマーしか受け取れないため、全システムに届きません。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 2."}</strong>{" API Gateway（REST API）の背後にある Lambda に、不正な形式のリクエスト本文が届き、無駄な実行料金が発生している。Lambda のコードを変更せずに改善するには。"}</p>
{" "}
<ul>
{" "}
<li>{"A. Lambda のメモリを減らす"}</li>
{" "}
<li>{"B. API Gateway でモデル（JSON Schema）による Request Validation を有効にする"}</li>
{" "}
<li>{"C. HTTP API に移行する"}</li>
{" "}
<li>{"D. API キャッシュを有効にする"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。検証に失敗したリクエストは API Gateway が "}<strong>{"400"}</strong>{" で拒否し、Lambda は呼ばれません。"}<strong>{"HTTP API には Request Validation がない"}</strong>{"ため C は不適切です。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 3."}</strong>{" S3 にファイルがアップロードされるたびに Lambda を起動している。Lambda が失敗したイベントを、後から調査・再処理できるようにしたい。最も適切なものはどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. Lambda の同期呼び出しに変更する"}</li>
{" "}
<li>{"B. 非同期呼び出しの失敗時の送信先（Destination）または DLQ に SQS を設定する"}</li>
{" "}
<li>{"C. S3 のバージョニングを有効にする"}</li>
{" "}
<li>{"D. Lambda のタイムアウトを延ばす"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。S3 は Lambda を"}<strong>{"非同期"}</strong>{"で呼びます。再試行（既定で 2 回）後も失敗したイベントを "}<strong>{"Destination（または DLQ）"}</strong>{"に送れます。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 4."}</strong>{" SQS をトリガーとする Lambda で、バッチ（10 件）のうち 1 件が失敗すると、成功した 9 件も再処理されて重複が発生する。どう対処すべきか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. バッチサイズを 1 にする"}</li>
{" "}
<li>{"B. 関数の応答で "}<code>{"batchItemFailures"}</code>{" を返す部分バッチ応答（"}<code>{"ReportBatchItemFailures"}</code>{"）を有効にする"}</li>
{" "}
<li>{"C. 可視性タイムアウトを 0 秒にする"}</li>
{" "}
<li>{"D. FIFO を標準キューに変更する"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。"}<strong>{"部分バッチ応答"}</strong>{"で、失敗したメッセージだけが再処理されます。A は効率が落ちるため最適ではありません。"}<strong>{"冪等な処理"}</strong>{"も併せて設計します。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 5."}</strong>{" Kinesis Data Streams にデータを書き込むと、"}<code>{"ProvisionedThroughputExceededException"}</code>{" が出る。ストリーム全体では容量に余裕がある。原因と対策として最も適切なものはどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. ホットシャード。パーティションキーを分散させ、指数バックオフで再試行する"}</li>
{" "}
<li>{"B. 保持期間が短い。365 日に延長する"}</li>
{" "}
<li>{"C. Lambda のメモリ不足。メモリを増やす"}</li>
{" "}
<li>{"D. Firehose に切り替える"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"A"}</strong>{"。特定のパーティションキーに偏ると、"}<strong>{"特定のシャードだけ"}</strong>{"が上限を超えます。キーの分散と再試行が基本の対策です。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 6."}</strong>{" Lambda 関数がプライベートサブネット内の RDS に接続する。同時実行が増えると DB の接続数が上限に達する。最も適切な対策はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. Lambda のタイムアウトを延ばす"}</li>
{" "}
<li>{"B. "}<strong>{"RDS Proxy"}</strong>{" を使い、接続はハンドラーの外で初期化して再利用する"}</li>
{" "}
<li>{"C. RDS をパブリックサブネットに移す"}</li>
{" "}
<li>{"D. Lambda の VPC 設定を外す"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。"}<strong>{"RDS Proxy"}</strong>{" が接続をプールして共有します。D は VPC 内の RDS に到達できなくなります。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 7."}</strong>{" VPC に接続した Lambda 関数が、S3 へのアクセスがタイムアウトするようになった。VPC にはパブリックサブネットがあるが、Lambda はプライベートサブネットにある。最もコスト効率の良い解決策はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. NAT ゲートウェイを追加する"}</li>
{" "}
<li>{"B. S3 用のゲートウェイ型 VPC エンドポイントを作成する"}</li>
{" "}
<li>{"C. Lambda をパブリックサブネットに移す"}</li>
{" "}
<li>{"D. インターネットゲートウェイを Lambda にアタッチする"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。"}<strong>{"S3 と DynamoDB はゲートウェイ型 VPC エンドポイント（無料）"}</strong>{"で到達できます。A も動作しますが、費用がかかります。C は、パブリックサブネットに置いても Lambda にはパブリック IP が付かないため不可です。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 8."}</strong>{" Lambda 関数の最適なメモリ設定を、実測データに基づいて見つけたい。最も適切な方法はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. メモリを最大にしておく"}</li>
{" "}
<li>{"B. AWS Lambda Power Tuning を使って、複数のメモリ設定で実行し比較する"}</li>
{" "}
<li>{"C. タイムアウトを最大にする"}</li>
{" "}
<li>{"D. 予約済み同時実行を設定する"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。"}<strong>{"実測して"}</strong>{"コストと速度の最適点を見つけます。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 9."}</strong>{" Java の Lambda 関数でコールドスタートが長く、初回リクエストの遅延が問題になっている。追加費用をできるだけ抑えつつ改善する選択肢はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. 予約済み同時実行を増やす"}</li>
{" "}
<li>{"B. Lambda SnapStart を有効にする"}</li>
{" "}
<li>{"C. メモリを最小にする"}</li>
{" "}
<li>{"D. 関数を VPC に接続する"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。"}<strong>{"SnapStart"}</strong>{" は初期化済みのスナップショットから起動します。A の予約済み同時実行は上限の確保であり、コールドスタートを減らしません。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 10."}</strong>{" DynamoDB のテーブルが "}<code>{"userId"}</code>{"（PK）と "}<code>{"orderDate"}</code>{"（SK）を持つ。「"}<code>{"status"}</code>{" が "}<code>{"SHIPPED"}</code>{" の注文を、全ユーザーから検索したい」。最も効率的な方法はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. Scan + FilterExpression"}</li>
{" "}
<li>{"B. "}<code>{"status"}</code>{" を PK とする GSI を作成して Query する（ただし偏りに注意）"}</li>
{" "}
<li>{"C. 強い整合性の Query"}</li>
{" "}
<li>{"D. LSI を後から追加する"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。別の属性での検索には "}<strong>{"GSI"}</strong>{" が適しています。ただし "}<code>{"status"}</code>{" は低カーディナリティなので、"}<strong>{"ホットパーティションに注意"}</strong>{"（"}<code>{"status"}</code>{" + 日付などの複合キー、シャーディングを検討）。LSI は後から追加できません。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 11."}</strong>{" あるアイテムのサイズは 7 KB。このアイテムを "}<strong>{"強い整合性"}</strong>{"で 1 秒に 20 回読み取る場合に必要な RCU はいくつか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. 20"}</li>
{" "}
<li>{"B. 40"}</li>
{" "}
<li>{"C. 80"}</li>
{" "}
<li>{"D. 10"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B（40）"}</strong>{"。7 KB を 4 KB 単位で切り上げて "}<strong>{"2"}</strong>{" 単位 × 20 回 = "}<strong>{"40 RCU"}</strong>{"。結果整合性なら 20 RCU になります。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 12."}</strong>{" DynamoDB のセッションテーブルで、期限切れのセッションを自動削除し、書き込み容量も消費したくない。最も適切なものはどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. Lambda を定期実行して Scan し、削除する"}</li>
{" "}
<li>{"B. 有効期限を "}<strong>{"Unix エポック秒（数値）"}</strong>{"で保存し、"}<strong>{"TTL"}</strong>{" を有効にする"}</li>
{" "}
<li>{"C. DynamoDB Streams を有効にする"}</li>
{" "}
<li>{"D. DAX を導入する"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。TTL による削除は"}<strong>{"書き込み容量を消費しません"}</strong>{"。削除は遅れる場合があるため、アプリ側でも期限を確認します。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 13."}</strong>{" DynamoDB の読み取りが多く、同じアイテムが繰り返し読まれる。レスポンスをマイクロ秒にしたく、アプリの変更は最小限にしたい。どれを使うか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. ElastiCache for Memcached"}</li>
{" "}
<li>{"B. Amazon DynamoDB Accelerator (DAX)"}</li>
{" "}
<li>{"C. S3 Transfer Acceleration"}</li>
{" "}
<li>{"D. DynamoDB のオンデマンドモード"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。"}<strong>{"DAX は DynamoDB API と互換"}</strong>{"で、クライアントを差し替えるだけで使えます。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 14."}</strong>{" ユーザーが商品名の一部を入力して、あいまい検索・関連度順での検索を行えるようにしたい。商品データは DynamoDB に保存している。適切な構成はどれか。"}</p>
{" "}
<ul>
{" "}
<li>{"A. DynamoDB の Scan で、"}<code>{"contains"}</code>{" フィルターを使う"}</li>
{" "}
<li>{"B. DynamoDB Streams + Lambda で、OpenSearch Service に同期し、検索は OpenSearch で行う"}</li>
{" "}
<li>{"C. DAX を使う"}</li>
{" "}
<li>{"D. LSI を使う"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"B"}</strong>{"。"}<strong>{"全文検索・関連度順は OpenSearch"}</strong>{" の得意分野です。DynamoDB は主データ、OpenSearch は検索用の複製とします。"}</p>
{" "}
</details>
{" "}
<p><strong>{"問 15."}</strong>{" （複数選択・2 つ選ぶ）外部の決済 API を呼ぶ Lambda がある。決済 API は時折タイムアウトし、リトライで二重課金が発生した。また、決済 API が長時間停止すると、Lambda の実行時間が伸びて費用が増える。適切な対策を 2 つ選べ。"}</p>
{" "}
<ul>
{" "}
<li>{"A. 決済リクエストに"}<strong>{"冪等性キー"}</strong>{"を付ける"}</li>
{" "}
<li>{"B. リトライを無制限に行う"}</li>
{" "}
<li>{"C. "}<strong>{"タイムアウト"}</strong>{"とサーキットブレーカーを実装する"}</li>
{" "}
<li>{"D. Lambda のタイムアウトを最大の 15 分にする"}</li>
{" "}
<li>{"E. 決済 API の認証情報をコードに埋め込む"}</li>
{" "}
</ul>
{" "}
<details>
{" "}
<summary>{"答えと解説"}</summary>
{" "}
<p><strong>{"A と C"}</strong>{"。"}<strong>{"冪等性キー"}</strong>{"で二重課金を防ぎ、"}<strong>{"タイムアウト + サーキットブレーカー"}</strong>{"で長時間停止から自分を守ります。B・D は悪化させ、E はセキュリティ上の問題です。"}</p>
{" "}
</details>
{" "}
</section>);}
