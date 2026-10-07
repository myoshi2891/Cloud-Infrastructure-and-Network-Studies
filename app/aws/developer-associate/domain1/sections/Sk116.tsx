import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** Skill 1.1.6 API の作成・拡張・保守を全量保持する。 */
export function Sk116(){return (<section className="section" id="sk-1-1-6" tabIndex={-1}>
<h2>{"Skill 1.1.6 API の作成・拡張・保守"}</h2>
{" "}
<blockquote>{" "}<p>{"公式のスキル文: API を作成・拡張・保守する（リクエスト / レスポンスの変換、検証ルールの適用、ステータスコードの上書きなど）"}</p>{" "}</blockquote>
{" "}
<h3 className="h-one">{"ひとことで言うと"}</h3>
{" "}
<p><strong>{"Amazon API Gateway"}</strong>{" を使って、HTTP の窓口（API）を作り、入力のチェックやデータ変換、エラーの返し方まで制御するスキルです。"}</p>
{" "}
<h3 className="h-detail">{"詳しい説明"}</h3>
{" "}
<h4>{"API の種類"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 17">
<table>

<thead>

<tr>

<th scope="col">{"種類"}</th>

<th scope="col">{"特徴"}</th>

<th scope="col">{"向く場面"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"REST API"}</strong></td>

<td>{"機能が最も豊富。リクエスト検証、マッピングテンプレート、API キー / 使用量プラン、キャッシュ、リソースポリシー、WAF 連携など"}</td>

<td>{"高機能な API 管理が必要なとき"}</td>

</tr>

<tr>

<td><strong>{"HTTP API"}</strong></td>

<td>{"軽量・低価格・低レイテンシー。JWT オーソライザーをネイティブにサポート"}</td>

<td>{"シンプルなプロキシ型 API"}</td>

</tr>

<tr>

<td><strong>{"WebSocket API"}</strong></td>

<td>{"クライアントとサーバーの双方向通信"}</td>

<td>{"チャット、リアルタイム通知"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 18">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"REST API"}</th>

<th scope="col">{"HTTP API"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"リクエスト検証（Request Validation）"}</td>

<td>{"あり"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td>{"マッピングテンプレート（VTL）による本文変換"}</td>

<td>{"あり"}</td>

<td>{"なし（パラメータのマッピングのみ）"}</td>

</tr>

<tr>

<td>{"API キー・使用量プラン"}</td>

<td>{"あり"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td>{"API キャッシュ"}</td>

<td>{"あり"}</td>

<td>{"なし"}</td>

</tr>

<tr>

<td>{"JWT オーソライザー"}</td>

<td>{"Cognito オーソライザーまたは Lambda オーソライザーで実現"}</td>

<td>{"ネイティブ対応"}</td>

</tr>

<tr>

<td>{"価格"}</td>

<td>{"高め"}</td>

<td>{"低め"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"「検証・変換・キャッシュ・使用量プランが必要」→ "}<strong>{"REST API"}</strong>{"。「安く速く、単純でよい」→ "}<strong>{"HTTP API"}</strong>{"。この見分けが試験の定番です。"}</p>{" "}</blockquote>
{" "}
<h4>{"統合タイプ（Integration）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 19">
<table>

<thead>

<tr>

<th scope="col">{"統合"}</th>

<th scope="col">{"内容"}</th>

<th scope="col">{"使いどころ"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Lambda プロキシ統合"}</strong></td>

<td>{"リクエスト全体をそのまま Lambda に渡し、Lambda が HTTP レスポンスの形式で返す"}</td>

<td>{"最も簡単。Lambda 側で自由に処理"}</td>

</tr>

<tr>

<td><strong>{"Lambda 非プロキシ（カスタム）統合"}</strong></td>

<td>{"API Gateway がマッピングテンプレートで入出力を変換"}</td>

<td>{"既存の Lambda を改修せず、API 側で形式を整えたい"}</td>

</tr>

<tr>

<td><strong>{"HTTP 統合 / AWS サービス統合"}</strong></td>

<td>{"任意の HTTP エンドポイントや AWS サービス（SQS、DynamoDB、Step Functions など）を直接呼ぶ"}</td>

<td>{"Lambda を挟まず直接つなぎ、コードを減らす"}</td>

</tr>

<tr>

<td><strong>{"Mock 統合"}</strong></td>

<td>{"バックエンドなしで固定のレスポンスを返す"}</td>

<td>{"開発初期・CORS のプリフライト"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"Lambda プロキシ統合では、Lambda 関数が次の形式で返す必要があります。形式が違うと API Gateway は "}<code>{"502 Bad Gateway"}</code>{"（Malformed Lambda proxy response）を返します。"}</p>
{" "}
<CodeBlock index={1} language="python" lines={["pythonimport json","","def handler(event, context):","    return {","        \"statusCode\": 200,                       # 必須","        \"headers\": {\"Content-Type\": \"application/json\"},","        \"body\": json.dumps({\"message\": \"ok\"}),   # 本文は文字列","    }"]} />
{" "}
<h4>{"リクエスト・レスポンスの変換（REST API・非プロキシ統合）"}</h4>
{" "}
<p><strong>{"マッピングテンプレート"}</strong>{"は、"}<strong>{"VTL（Velocity Template Language）"}</strong>{"で書く変換ルールです。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 20">
<table>

<thead>

<tr>

<th scope="col">{"変換の場所"}</th>

<th scope="col">{"役割"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"統合リクエスト"}</td>

<td>{"クライアントからの入力をバックエンド向けに整形"}</td>

<td>{"クエリ文字列を JSON 本文に詰め替える"}</td>

</tr>

<tr>

<td>{"統合レスポンス"}</td>

<td>{"バックエンドの出力をクライアント向けに整形"}</td>

<td>{"不要なフィールドを除いて返す"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<figure className="diagram-card"><Diagram id="d08" label="Skill 1.1.6 API の作成・拡張・保守の図解 d08" /></figure>
{" "}
<h4>{"検証ルールの適用（Request Validation）"}</h4>
{" "}
<p>{"REST API では、"}<strong>{"バックエンドに届く前に"}</strong>{"リクエストを API Gateway 側で検証できます。"}</p>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 21">
<table>

<thead>

<tr>

<th scope="col">{"検証対象"}</th>

<th scope="col">{"例"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"必須のクエリ文字列・ヘッダー・パスパラメータ"}</td>

<td><code>{"?userId="}</code>{" が無ければ 400"}</td>

</tr>

<tr>

<td>{"リクエスト本文"}</td>

<td><strong>{"モデル（JSON Schema）"}</strong>{"に沿っているか（必須項目・型・最小値など）"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"検証に失敗すると、API Gateway が "}<strong>{"400 Bad Request"}</strong>{" を返し、バックエンド（Lambda）は呼ばれません。"}<strong>{"不正な入力で Lambda の料金を払わずに済む"}</strong>{"のが利点です。"}</p>
{" "}
<h4>{"ステータスコードの上書き"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 22">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"統合レスポンスのマッピング"}</td>

<td>{"バックエンドのエラー文言やステータスを、正規表現で別のステータスコードに割り当てる（非プロキシ統合）"}</td>

</tr>

<tr>

<td>{"マッピングテンプレートで上書き"}</td>

<td>{"VTL の "}<code>{"$context.responseOverride.status"}</code>{" でステータスを設定する"}</td>

</tr>

<tr>

<td>{"ゲートウェイレスポンス"}</td>

<td>{"認可失敗（401 / 403）、スロットル（429）、検証失敗（400）など、"}<strong>{"API Gateway 自身が出すエラー"}</strong>{"の本文・ヘッダーをカスタマイズ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h4>{"API の保守（ステージ・デプロイ・制御）"}</h4>
{" "}
<div className="table-wrap" role="region" tabIndex={0} aria-label="開発ガイドの表 23">
<table>

<thead>

<tr>

<th scope="col">{"機能"}</th>

<th scope="col">{"内容"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"ステージ"}</strong>{"（"}<code>{"dev"}</code>{" / "}<code>{"test"}</code>{" / "}<code>{"prod"}</code>{"）"}</td>

<td>{"API の公開される「環境」。REST API は変更後に"}<strong>{"デプロイしないと反映されない"}</strong></td>

</tr>

<tr>

<td><strong>{"ステージ変数"}</strong></td>

<td>{"ステージごとに値を切り替える（例: 呼び出す Lambda の"}<strong>{"エイリアス"}</strong>{"を変える）"}</td>

</tr>

<tr>

<td><strong>{"カナリアリリース"}</strong></td>

<td>{"一部のトラフィック（例: 10%）だけ新バージョンに流して検証"}</td>

</tr>

<tr>

<td><strong>{"スロットリング / 使用量プラン"}</strong></td>

<td>{"リクエスト率の制限、API キーごとの利用量制御"}</td>

</tr>

<tr>

<td><strong>{"キャッシュ"}</strong></td>

<td>{"レスポンスを TTL 付きでキャッシュ（REST API）。バックエンドの負荷とレイテンシーを削減"}</td>

</tr>

<tr>

<td><strong>{"CORS"}</strong></td>

<td>{"ブラウザからのクロスオリジン呼び出しを許可（OPTIONS のプリフライト応答と、レスポンスの "}<code>{"Access-Control-Allow-Origin"}</code>{"）"}</td>

</tr>

<tr>

<td><strong>{"OpenAPI"}</strong></td>

<td>{"OpenAPI（Swagger）定義のインポート / エクスポートで API を定義管理"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"統合のタイムアウトは既定で 29 秒です。REST API は応答に時間のかかる処理に向かないため、長い処理は非同期化します（Skill 1.1.4）。"}</p>{" "}</blockquote>
{" "}
<h3 className="h-bp">{"ベストプラクティス"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"入力検証は API Gateway の Request Validation で入口に置く"}</strong>{"（Lambda の中だけで検証しない）"}</li>
{" "}
<li>{"API のバージョン管理は"}<strong>{"ステージ + Lambda エイリアス"}</strong>{"で行い、本番トラフィックの切り替えは"}<strong>{"カナリア"}</strong>{"で慎重に"}</li>
{" "}
<li>{"公開 API には"}<strong>{"スロットリング"}</strong>{"と"}<strong>{"認可"}</strong>{"（IAM / Cognito / Lambda オーソライザー）を必ず設定する"}</li>
{" "}
<li>{"応答が変わりにくい GET には"}<strong>{"キャッシュ"}</strong>{"を使う"}</li>
{" "}
<li>{"エラーのレスポンス形式を"}<strong>{"統一"}</strong>{"する（ゲートウェイレスポンスで揃える）"}</li>
{" "}
</ul>
{" "}
<h3 className="h-exam">{"試験での狙われ方"}</h3>
{" "}
<ul>
{" "}
<li>{"「不正な入力を Lambda に届く前に弾きたい」→ "}<strong>{"REST API の Request Validation（モデル）"}</strong></li>
{" "}
<li>{"「Lambda の返すエラーを 4xx に変えたい」→ "}<strong>{"統合レスポンスのマッピング / マッピングテンプレート"}</strong></li>
{" "}
<li>{"「API を変更したのに反映されない」→ "}<strong>{"ステージへデプロイしていない"}</strong></li>
{" "}
<li>{"「Lambda プロキシ統合で 502」→ "}<strong>{"Lambda の戻り値の形式が違う"}</strong></li>
{" "}
<li>{"「CORS エラー」→ "}<strong>{"API 側（OPTIONS と応答ヘッダー）で CORS を有効化"}</strong></li>
{" "}
</ul>
{" "}
</section>);}
