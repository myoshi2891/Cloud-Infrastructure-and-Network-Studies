import { Diagram } from '../Diagram';
import { CodeBlock } from '../CodeBlock';
/** 原本のs8を全文・順序どおり収録。 */
export function S8() { return <>
<h2 id="s8" tabIndex={-1}>{"Step 6：環境別の設定と AWS AppConfig（Skill 3.1.5）"}</h2>
{" "}
<blockquote>{" "}<p><strong>{"Skill 3.1.5"}</strong>{": 特定の環境向けにアプリケーション設定を準備する（例：AWS AppConfig の使用）"}</p>{" "}</blockquote>
{" "}
<h3>{"6.1 課題：dev / test / prod で設定が違う"}</h3>
{" "}
<p>{"接続先 DB、外部 API の URL、機能のオン/オフ、ログレベル…。"}<strong>{"コードは同じ、設定だけ違う"}</strong>{" のが理想です。"}</p>
{" "}
<h3>{"6.2 設定の置き場所の比較（最重要）"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 18">
<table>

<thead>

<tr>

<th scope="col">{"方法"}</th>

<th scope="col">{"向いている用途"}</th>

<th scope="col">{"特徴"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"環境変数"}</strong></td>

<td>{"起動時に決まる単純な値"}</td>

<td>{"変更には関数の更新（再デプロイ）が必要。合計 4 KB（Lambda）"}</td>

</tr>

<tr>

<td><strong>{"SSM Parameter Store"}</strong></td>

<td>{"設定値、階層管理（"}<code>{"/app/prod/key"}</code>{"）"}</td>

<td>{"無料枠あり。"}<code>{"SecureString"}</code>{" は KMS で暗号化。バージョン管理・ラベルあり"}</td>

</tr>

<tr>

<td><strong>{"AWS Secrets Manager"}</strong></td>

<td>{"パスワード、API キー"}</td>

<td><strong>{"自動ローテーション"}</strong>{"、きめ細かな制御"}</td>

</tr>

<tr>

<td><strong>{"AWS AppConfig"}</strong></td>

<td><strong>{"実行時に変わる設定"}</strong>{"、機能フラグ"}</td>

<td><strong>{"段階的配信・検証・自動ロールバック"}</strong>{"。コード再デプロイ不要"}</td>

</tr>

<tr>

<td>{"設定ファイル（パッケージ同梱）"}</td>

<td>{"変わらない既定値"}</td>

<td>{"変更はビルド・デプロイが必要"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<Diagram id="d7" label="Step 6：環境別の設定と AWS AppConfig（Skill 3.1.5）の図解 d7" />
{" "}
<h3>{"6.3 AWS AppConfig のしくみ"}</h3>
{" "}
<p>{"AppConfig は "}<strong>{"AWS Systems Manager の機能"}</strong>{" で、設定を "}<strong>{"デプロイ（段階的に配信）"}</strong>{" するサービスです。"}</p>
{" "}
<Diagram id="d8" label="Step 6：環境別の設定と AWS AppConfig（Skill 3.1.5）の図解 d8" />
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 19">
<table>

<thead>

<tr>

<th scope="col">{"概念"}</th>

<th scope="col">{"説明"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><strong>{"Application"}</strong></td>

<td>{"設定を使うアプリの単位"}</td>

</tr>

<tr>

<td><strong>{"Environment"}</strong></td>

<td>{"配信先の論理グループ（dev / prod）。"}<strong>{"監視用の CloudWatch アラーム"}</strong>{" を紐付けられる"}</td>

</tr>

<tr>

<td><strong>{"Configuration profile"}</strong></td>

<td>{"設定データの定義。"}<strong>{"Freeform（自由形式）"}</strong>{" と "}<strong>{"Feature flags（機能フラグ）"}</strong>{" がある"}</td>

</tr>

<tr>

<td><strong>{"Validator"}</strong></td>

<td>{"配信前に "}<strong>{"JSON Schema"}</strong>{" または "}<strong>{"Lambda"}</strong>{" で設定の妥当性を検証"}</td>

</tr>

<tr>

<td><strong>{"Deployment strategy"}</strong></td>

<td>{"配信速度："}<strong>{"デプロイ時間"}</strong>{"、"}<strong>{"増加率"}</strong>{"、"}<strong>{"ベイク時間"}</strong>{"（監視期間）"}</td>

</tr>

<tr>

<td><strong>{"Deployment"}</strong></td>

<td>{"設定を環境に配信する実行。ロールバック可能"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<p>{"事前定義の配信戦略（代表例）："}</p>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 20">
<table>

<thead>

<tr>

<th scope="col">{"戦略"}</th>

<th scope="col">{"動き"}</th>

</tr>

</thead>

<tbody>

<tr>

<td><code>{"AppConfig.AllAtOnce"}</code></td>

<td>{"一括で即時配信"}</td>

</tr>

<tr>

<td><code>{"AppConfig.Linear50PercentEvery30Seconds"}</code></td>

<td>{"30 秒ごとに 50% ずつ増やして配信"}</td>

</tr>

<tr>

<td><code>{"AppConfig.Canary10Percent20Minutes"}</code></td>

<td>{"まず 10% に配信し、20 分かけて全体へ"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<blockquote>{" "}<p>{"上記以外にも事前定義の戦略があります。カスタム戦略も作成できます。"}</p>{" "}</blockquote>
{" "}
<h3>{"6.4 アプリから設定を取得する"}</h3>
{" "}
<ul>
{" "}
<li><strong>{"Lambda では「AWS AppConfig Lambda 拡張機能（Extension）」"}</strong>{" を使うのが定番です。拡張機能が "}<strong>{"設定をキャッシュ"}</strong>{" し、ローカル HTTP（"}<code>{"localhost:2772"}</code>{"）経由で取得できます。API 呼び出しを減らし、コストと遅延を抑えます。"}</li>
{" "}
<li>{"直接 SDK で取得する場合は、"}<code>{"StartConfigurationSession"}</code>{" と "}<code>{"GetLatestConfiguration"}</code>{" を使います。"}</li>
{" "}
</ul>
{" "}
<CodeBlock index={7} language="python" lines={["import os, urllib.request, json","","def handler(event, context):","    env = os.environ[\"STAGE\"]   # デプロイ環境名（dev / staging / prod）","    url = (\"http://localhost:2772/applications/myapp\"","           f\"/environments/{env}/configurations/feature-flags\")","    with urllib.request.urlopen(url) as res:","        config = json.loads(res.read())","    if config.get(\"newCheckout\", {}).get(\"enabled\"):","        return \"new flow\"","    return \"old flow\""]} />
{" "}
<h3>{"6.5 ベストプラクティス"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 21">
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

<td>{"設定は "}<strong>{"コードと分離"}</strong>{" し、環境ごとに用意する"}</td>

<td>{"同じ成果物を全環境で使える"}</td>

</tr>

<tr>

<td>{"2"}</td>

<td><strong>{"機密は Secrets Manager"}</strong>{" / SecureString。AppConfig に平文の秘密を置かない"}</td>

<td>{"漏洩防止"}</td>

</tr>

<tr>

<td>{"3"}</td>

<td>{"AppConfig では "}<strong>{"Validator を必ず設定"}</strong>{" する"}</td>

<td>{"不正な設定の配信を防ぐ"}</td>

</tr>

<tr>

<td>{"4"}</td>

<td><strong>{"段階的配信（Linear / Canary）＋ CloudWatch アラーム"}</strong>{" を組み合わせる"}</td>

<td>{"異常時に自動ロールバック"}</td>

</tr>

<tr>

<td>{"5"}</td>

<td>{"Lambda では "}<strong>{"AppConfig 拡張機能"}</strong>{" でキャッシュする"}</td>

<td>{"呼び出し回数・遅延を削減"}</td>

</tr>

<tr>

<td>{"6"}</td>

<td>{"パラメータは "}<code>{"/アプリ名/環境名/キー"}</code>{" の "}<strong>{"階層命名"}</strong>{" にする"}</td>

<td>{"環境の切り替えが簡単"}</td>

</tr>

<tr>

<td>{"7"}</td>

<td>{"機能フラグは "}<strong>{"用が済んだら削除"}</strong>{" する"}</td>

<td>{"技術的負債の蓄積防止"}</td>

</tr>

</tbody>

</table>
</div>
{" "}
<h3>{"6.6 試験での狙われどころ"}</h3>
{" "}
<div className="table-wrap" tabIndex={0} role="region" aria-label="デプロイの表 22">
<table>

<thead>

<tr>

<th scope="col">{"問われ方"}</th>

<th scope="col">{"答えの方向性"}</th>

</tr>

</thead>

<tbody>

<tr>

<td>{"再デプロイなしで設定を安全に変更し、問題があれば自動で戻したい"}</td>

<td><strong>{"AWS AppConfig"}</strong>{"（段階的配信＋アラーム連携）"}</td>

</tr>

<tr>

<td>{"設定を JSON Schema で検証してから配信"}</td>

<td><strong>{"AppConfig の Validator"}</strong></td>

</tr>

<tr>

<td>{"パスワードを自動ローテーションしたい"}</td>

<td><strong>{"Secrets Manager"}</strong></td>

</tr>

<tr>

<td>{"環境ごとの値を階層で管理"}</td>

<td><strong>{"Parameter Store の階層パス"}</strong></td>

</tr>

<tr>

<td>{"Lambda から AppConfig を低コスト・低遅延で使う"}</td>

<td><strong>{"AppConfig Lambda 拡張機能"}</strong></td>

</tr>

</tbody>

</table>
</div>
{" "}
<section className="refs">
<div className="refs-head">
<span className="refs-title">{"参照 URL（この Step）"}</span>
<span className="refs-count">{"7 件"}</span>
</div>
<div className="refs-grid">
<a className="ref" href="https://docs.aws.amazon.com/appconfig/latest/userguide/what-is-appconfig.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"AWS AppConfig とは"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/appconfig/latest/userguide/what-is-appconfig.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-configuration-and-profile.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"設定プロファイルの作成"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/appconfig/latest/userguide/appconfig-creating-configuration-and-profile.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"配信戦略"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/appconfig/latest/userguide/appconfig-creating-deployment-strategy.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-feature-flags.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"機能フラグ"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/appconfig/latest/userguide/appconfig-feature-flags.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/appconfig/latest/userguide/appconfig-integration-lambda-extensions.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Lambda 拡張機能との統合"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/appconfig/latest/userguide/appconfig-integration-lambda-extensions.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Parameter Store"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/systems-manager/latest/userguide/systems-manager-parameter-store.html"}</span></a>
<a className="ref" href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html" target="_blank" rel="noopener noreferrer"><span className="ref-top"><span className="ref-kind aws">{"AWS 公式"}</span><span className="ref-arrow" aria-hidden="true">{"↗"}</span></span><span className="ref-label">{"Secrets Manager"}</span><span className="ref-url"><b>{"docs.aws.amazon.com"}</b>{"/secretsmanager/latest/userguide/intro.html"}</span></a>
</div>
</section>
{" "}
<hr />
{" "}
</>; }
