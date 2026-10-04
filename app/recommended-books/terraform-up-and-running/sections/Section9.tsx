// app/recommended-books/terraform-up-and-running/sections/Section9.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section9({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第9部原著第9章対応-terraformコードのテスト手法">{' '}第9部（原著第9章対応）: Terraformコードのテスト手法{' '}</h2>
<h3 id="9-1-手動テスト">9-1. 手動テスト</h3>
<p>{' '}<code>terraform apply</code>で実際にデプロイし、curlやブラウザで動作確認、<code>terraform destroy</code>で片付ける、という最も基本的な検証方法です。手動テストは重要ですが、繰り返し実行するコストが高く、実施漏れが起きやすいという弱点があります。{' '}</p>
<h3 id="9-2-自動テストの3階層">9-2. 自動テストの3階層</h3>
<Diagram id="diag-14" ariaLabel="Terraformコードにおけるテストピラミッド（ユニット、統合、E2E）の3階層" />
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">階層</th>
                            <th scope="col">実行速度</th>
                            <th scope="col">カバー範囲</th>
                            <th scope="col">実行頻度の目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>ユニットテスト</td>
                                <td>速い（秒〜分）</td>
                                <td>単一モジュールのロジック</td>
                                <td>全PRで実行</td>
                            </tr>
                            <tr className="row-even">
                                <td>インテグレーションテスト</td>
                                <td>中程度（分）</td>
                                <td>モジュール間の連携</td>
                                <td>全PRまたはマージ時</td>
                            </tr>
                            <tr className="row-odd">
                                <td>E2Eテスト</td>
                                <td>遅い（分〜時間）</td>
                                <td>本番相当環境全体</td>
                                <td>定期実行・リリース前</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<h3 id="9-32026年最新terraform-testネイティブテストフレームワーク">{' '}9-3.【2026年最新】<code>terraform test</code>ネイティブテストフレームワーク{' '}</h3>
<p>{' '}原著刊行時点（2022年）ではTerraform公式のテストフレームワークは存在せず、Go言語製のTerratest（Gruntwork社製）が事実上の標準でした。しかし<strong>Terraform 1.6でネイティブの<code>terraform test</code>コマンドがGAとなり、Terraform 1.7で<code>mock_provider</code>によるモック機能が追加</strong>されたことで、HCLだけで書ける公式テストの選択肢が確立しました。2026年時点では「ロジック検証はネイティブ<code>terraform test</code>＋モック、実クラウド確認が必要な深いテストはTerratest」という併用が一般的なベストプラクティスです。{' '}</p>
<p><code>tests/webserver_cluster.tftest.hcl</code>の例:</p>
<pre className="code-block">
                    <div className="code-line">mock_provider &quot;aws&quot; &#123;&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">run &quot;validate_cluster_size&quot; &#123;</div>
                    <div className="code-line">  command = plan</div>
                    <div className="code-line"></div>
                    <div className="code-line">  variables &#123;</div>
                    <div className="code-line">    cluster_name  = &quot;test-cluster&quot;</div>
                    <div className="code-line">    instance_type = &quot;t2.micro&quot;</div>
                    <div className="code-line">    min_size      = 2</div>
                    <div className="code-line">    max_size      = 2</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  assert &#123;</div>
                    <div className="code-line">    condition     = aws_autoscaling_group.example.min_size == 2</div>
                    <div className="code-line">    error_message = &quot;ASGのmin_sizeが期待値と一致しません&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">run &quot;reject_invalid_instance_type&quot; &#123;</div>
                    <div className="code-line">  command = plan</div>
                    <div className="code-line"></div>
                    <div className="code-line">  variables &#123;</div>
                    <div className="code-line">    # instance_type の validation 失敗だけをテストしたいので、</div>
                    <div className="code-line">    # 必須変数である cluster_name には有効な値を与えておく</div>
                    <div className="code-line">    # （未指定だと「変数未設定」で先に失敗し、意図したテストにならない）</div>
                    <div className="code-line">    cluster_name  = &quot;test-cluster&quot;</div>
                    <div className="code-line">    instance_type = &quot;&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  expect_failures = [var.instance_type]</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>{' '}<code>expect_failures</code>は「そのオブジェクトの検証が失敗すること」を期待するテストです。したがって<code>var.instance_type</code>を指定する場合、<strong>変数側に<code>validation</code>ブロックが定義されていることが前提</strong>になります。上の<code>reject_invalid_instance_type</code>が意図どおり動くのは、第4部で<code>instance_type</code>に空文字を拒否する<code>validation</code>を書いてあるからです。<code>validation</code>のない変数に<code>expect_failures</code>を指定すると、失敗が発生せずテスト自体が失敗します。{' '}</p>
<pre className="code-block">
                    <div className="code-line">terraform test</div>
                </pre>
<h3 id="9-4-mock_providerによる高速ユニットテスト">{' '}9-4.{' '}<code>mock_provider</code>による高速ユニットテスト{' '}</h3>
<p>{' '}<code>mock_provider</code>を使うと、実際のクラウド認証情報なしに、計算属性（ARN、IDなど）をTerraformが自動生成してテストを走らせられます。{' '}</p>
<Diagram id="diag-15" ariaLabel="mock_providerを活用した高速ユニットテストの実行アーキテクチャ" />
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<p>{' '}<code>mock_provider</code>によるplanベースのユニットテストをCIの最初のゲートとして高速に回し、実プロバイダーを使うapplyベースのインテグレーションテストは頻度を抑えて（例: マージ時のみ）実行する構成が、速度とコストのバランスに優れています。{' '}</p>{' '}</div>{' '}</div>
<h3 id="9-5-terratest等その他のアプローチ">9-5. Terratest等その他のアプローチ</h3>
<p>{' '}Go言語でTerraformコードをデプロイし、HTTPリクエストやAWS SDK呼び出しで検証後に自動破棄する手法です。<code>terraform test</code>では表現しづらい複雑な検証ロジック（外部APIとの結合確認等）に向いています。{' '}</p>
<pre className="code-block">
                    <div className="code-line">package test</div>
                    <div className="code-line"></div>
                    <div className="code-line">import (</div>
                    <div className="code-line">    &quot;testing&quot;</div>
                    <div className="code-line">    &quot;github.com/gruntwork-io/terratest/modules/terraform&quot;</div>
                    <div className="code-line">)</div>
                    <div className="code-line"></div>
                    <div className="code-line">func TestWebServerCluster(t *testing.T) &#123;</div>
                    <div className="code-line">    terraformOptions := &amp;terraform.Options&#123;</div>
                    <div className="code-line">        TerraformDir: &quot;../examples/webserver-cluster&quot;,</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">    defer terraform.Destroy(t, terraformOptions)</div>
                    <div className="code-line">    terraform.InitAndApply(t, terraformOptions)</div>
                    <div className="code-line">    {'//'} HTTPリクエストなどで検証</div>
                    <div className="code-line">&#125;</div>
                </pre>

        </section>
    );
}
