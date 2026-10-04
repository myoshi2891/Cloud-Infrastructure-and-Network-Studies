// app/recommended-books/terraform-up-and-running/sections/Section3.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section3({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第3部原著第3章対応-terraformの状態state管理">{' '}第3部（原著第3章対応）: Terraformの状態（State）管理{' '}</h2>
<h3 id="3-1-state-fileとは何かなぜ必要か">3-1. State fileとは何か、なぜ必要か</h3>
<p>{' '}Terraformは実際のクラウドリソースと、HCLで書いた宣言との対応関係を<code>terraform.tfstate</code>というJSONファイルに記録します。このState fileがあることで、Terraformは「今何が存在するか」「次の<code>apply</code>で何を変更すべきか」を判断できます。State fileがなければ、Terraformは既存リソースをゼロから再作成しようとしてしまいます。{' '}</p>
<h3 id="3-2-stateの共有ストレージリモートバックエンド">{' '}3-2. Stateの共有ストレージ（リモートバックエンド）{' '}</h3>
<p>{' '}チーム開発ではState fileをローカルに置かず、S3・Google Cloud Storage・Azure Blob Storage・HCP Terraformのようなリモートバックエンドで共有・排他制御するのが必須のベストプラクティスです。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">terraform</span> &#123;</div>
                    <div className="code-line">    <span className="hl-kw">backend</span> <span className="hl-str">&quot;s3&quot;</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">bucket</span>       = <span className="hl-str">&quot;my-company-terraform-state&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">key</span>          = <span className="hl-str">&quot;global/services/webserver-cluster/terraform.tfstate&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">region</span>       = <span className="hl-str">&quot;us-east-2&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">encrypt</span>      = <span className="hl-bool">true</span></div>
                    <div className="code-line">        <span className="hl-attr">use_lockfile</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="3-3-2026年最新s3ネイティブロックとdynamodbの非推奨化">{' '}3-3. 【2026年最新】S3ネイティブロックとDynamoDBの非推奨化{' '}</h3>
<p>{' '}長年、S3バックエンドでの排他ロックにはDynamoDBテーブルの併設が「お作法」とされてきました。しかし<strong>Terraform 1.10（2024年11月）でS3ネイティブロック（<code>use_lockfile</code>）が実験的機能として導入され、Terraform 1.11でGA（正式版）に昇格、同時に<code>dynamodb_table</code>引数が非推奨化</strong>されました。S3の条件付き書き込み（Conditional Writes）機能を使い、state本体と同じバケット内に<code>.tflock</code>ファイルを作成する仕組みで、DynamoDBテーブルの作成・IAM権限管理が不要になります。{' '}</p>
<Diagram id="diag-6" ariaLabel="S3ネイティブロックによるTerraform State管理とロック取得フロー" />
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">項目</th>
                            <th scope="col">旧方式（S3 + DynamoDB）</th>
                            <th scope="col">新方式（S3ネイティブロック）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>必要なAWSリソース</td>
                                <td>S3バケット + DynamoDBテーブル</td>
                                <td>S3バケットのみ</td>
                            </tr>
                            <tr className="row-even">
                                <td>設定パラメータ</td>
                                <td><code>dynamodb_table = &quot;terraform-locks&quot;</code></td>
                                <td><code>use_lockfile = true</code></td>
                            </tr>
                            <tr className="row-odd">
                                <td>対応バージョン</td>
                                <td>全バージョン（非推奨方向）</td>
                                <td>Terraform 1.10で実験導入、1.11でGA</td>
                            </tr>
                            <tr className="row-even">
                                <td>IAM権限</td>
                                <td>S3権限 + DynamoDB権限</td>
                                <td>S3権限のみ</td>
                            </tr>
                            <tr className="row-odd">
                                <td>今後の見通し</td>
                                <td><code>dynamodb_table</code>は非推奨、将来削除予定</td>
                                <td>新規プロジェクトの標準として推奨</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<p>{' '}新規プロジェクトは<code>use_lockfile = true</code>を採用し、既存プロジェクトも計画的に移行する。移行時はS3バケットのバージョニングを有効化しておくこと。{' '}</p>{' '}</div>{' '}</div>
<h3 id="3-4-backendの制約">3-4. Backendの制約</h3>
<ul>{' '}<li>{' '}バックエンド設定自体は変数展開ができない（<code>backend</code>ブロック内でvariableは使えない）{' '}</li>{' '}<li>{' '}バックエンドの切り替えには<code>terraform init -migrate-state</code>が必要{' '}</li>{' '}<li>{' '}ロックの取得に失敗するとチーム全体の作業がブロックされるため、CI/CDのタイムアウト設計が重要{' '}</li>{' '}</ul>
<h3 id="3-5-state分離-workspacesとfile-layout">{' '}3-5. State分離: WorkspacesとFile Layout{' '}</h3>
<p>環境（dev/staging/prod）ごとにStateを分離する方法は主に2つあります。</p>
<Diagram id="diag-7" ariaLabel="Workspaces vs File LayoutによるState分離アプローチの比較" />
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">観点</th>
                            <th scope="col">Workspaces</th>
                            <th scope="col">ファイルレイアウト分離</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>コードの重複</td>
                                <td>なし（1本のコードを使い回す）</td>
                                <td>ディレクトリごとに重複しやすい</td>
                            </tr>
                            <tr className="row-even">
                                <td>環境間の設定差分</td>
                                <td><code>terraform.workspace</code>変数で分岐が必要</td>
                                <td>ディレクトリごとに完全に独立して記述可能</td>
                            </tr>
                            <tr className="row-odd">
                                <td>誤爆リスク</td>
                                <td>「今どのworkspaceにいるか」の見落としリスクあり</td>
                                <td>ディレクトリが分かれているため誤爆しにくい</td>
                            </tr>
                            <tr className="row-even">
                                <td>原著の推奨</td>
                                <td>小規模・一時的な環境分離向け</td>
                                <td>本番運用の環境分離として推奨</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<p>{' '}本番環境の分離にはWorkspacesよりファイルレイアウトによる分離（Gruntwork社が提唱する「live」リポジトリのパターンなど）が安全とされています。理由は、Workspacesは「今どの環境を操作しているか」がコマンドライン上で見えにくく、誤って本番を破壊するリスクがあるためです。{' '}</p>{' '}</div>{' '}</div>
<h3 id="3-6-terraform_remote_stateデータソース">{' '}3-6.{' '}<code>terraform_remote_state</code>データソース{' '}</h3>
<p>{' '}あるコンポーネントのStateから、別のコンポーネントが出力値を参照する仕組みです。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">data</span> <span className="hl-type">&quot;terraform_remote_state&quot;</span> <span className="hl-str">&quot;vpc&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-kw">backend</span> = <span className="hl-str">&quot;s3&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">config</span> = &#123;</div>
                    <div className="code-line">        <span className="hl-attr">bucket</span> = <span className="hl-str">&quot;my-company-terraform-state&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">key</span>    = <span className="hl-str">&quot;global/vpc/terraform.tfstate&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">region</span> = <span className="hl-str">&quot;us-east-2&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">subnet_id</span> = data.terraform_remote_state.vpc.outputs.subnet_id</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<p>{' '}モジュール間の依存関係を<code>terraform_remote_state</code>で明示することで、VPCのような基盤コンポーネントと、アプリケーション固有のリソースを別々のStateに分離しつつ連携できます。{' '}</p>{' '}</div>{' '}</div>
<div className="callout callout-warning">{' '}<div className="callout-icon">⚠{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">セキュリティ上の注意{' '}</div>{' '}<p>{' '}<code>outputs.subnet_id</code>のように特定の出力値だけを参照していても、<code>terraform_remote_state</code>はバックエンド(上の例ではS3バケット)から<strong>State全体を読み取ります</strong>。つまり参照側にバックエンドの読み取り権限を与えることは、そのStateに含まれるすべての値（DBパスワードや秘密鍵など、リソース属性としてStateに平文で残る機密情報を含む）へのアクセスを許すことと同義です。機密情報を含むStateを他チームと共有する場合は、必要な値だけを渡す限定的な手段を検討します。{' '}</p>{' '}</div>{' '}</div>
<ul>{' '}<li>{' '}HCP Terraform/Enterpriseでは<code>tfe_outputs</code>データソースを使い、State全体ではなくワークスペースの出力値だけを共有する{' '}</li>{' '}<li>{' '}出力値をSSM Parameter StoreやSecrets Managerへ書き出し、参照側にはそのパラメータのみ読み取り権限を与える{' '}</li>{' '}<li>{' '}そもそもStateに機密情報を残さないよう、write-only引数（第6部参照）やエフェメラルリソースを使う{' '}</li>{' '}</ul>

        </section>
    );
}
