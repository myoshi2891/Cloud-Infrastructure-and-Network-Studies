// app/recommended-books/terraform-up-and-running/sections/Section4.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section4({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第4部原著第4章対応-再利用可能なインフラをモジュールで作る">{' '}第4部（原著第4章対応）: 再利用可能なインフラをモジュールで作る{' '}</h2>
<h3 id="4-1-モジュールの基本">4-1. モジュールの基本</h3>
<p>{' '}モジュールとは、<code>.tf</code>ファイル群をまとめたディレクトリのことです。ルートモジュール（実行の起点）から子モジュールを<code>module</code>ブロックで呼び出します。{' '}</p>
<pre className="code-block">
                    <div className="code-line">module &quot;webserver_cluster&quot; &#123;</div>
                    <div className="code-line">  source = &quot;../../modules/services/webserver-cluster&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  cluster_name  = &quot;webservers-stage&quot;</div>
                    <div className="code-line">  instance_type = &quot;t2.micro&quot;</div>
                    <div className="code-line">  min_size      = 2</div>
                    <div className="code-line">  max_size      = 2</div>
                    <div className="code-line">&#125;</div>
                </pre>
<Diagram id="diag-8" ariaLabel="再利用可能なTerraformモジュールの入力・リソース・出力構造" />
<h3 id="4-2-モジュール入力変数module-inputs">{' '}4-2. モジュール入力変数（Module Inputs）{' '}</h3>
<p>{' '}呼び出し元から値を注入するためのインターフェースです。<code>default</code>を持たない変数は必須パラメータになります。{' '}</p>
<pre className="code-block">
                    <div className="code-line">variable &quot;cluster_name&quot; &#123;</div>
                    <div className="code-line">  description = &quot;The name to use for all the cluster resources&quot;</div>
                    <div className="code-line">  type        = string</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">variable &quot;instance_type&quot; &#123;</div>
                    <div className="code-line">  description = &quot;The type of EC2 Instance to run&quot;</div>
                    <div className="code-line">  type        = string</div>
                    <div className="code-line">  default     = &quot;t2.micro&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # 空文字を弾く。この validation があって初めて、</div>
                    <div className="code-line">  # 第9部の expect_failures = [var.instance_type] が検証エラーを検出できる</div>
                    <div className="code-line">  validation &#123;</div>
                    <div className="code-line">    condition     = length(trimspace(var.instance_type)) &gt; 0</div>
                    <div className="code-line">    error_message = &quot;instance_type must not be empty.&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="4-3-モジュールのlocal値">4-3. モジュールのlocal値</h3>
<p>{' '}繰り返し使う計算式や、外部に公開する必要のない中間値は<code>locals</code>にまとめます。{' '}</p>
<pre className="code-block">
                    <div className="code-line">locals &#123;</div>
                    <div className="code-line">  http_port    = 80</div>
                    <div className="code-line">  any_port     = 0</div>
                    <div className="code-line">  any_protocol = &quot;-1&quot;</div>
                    <div className="code-line">  all_ips      = [&quot;0.0.0.0/0&quot;]</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="4-4-モジュール出力値module-outputs">{' '}4-4. モジュール出力値（Module Outputs）{' '}</h3>
<p>呼び出し元やCLIから参照できる戻り値です。</p>
<pre className="code-block">
                    <div className="code-line">output &quot;asg_name&quot; &#123;</div>
                    <div className="code-line">  value       = aws_autoscaling_group.example.name</div>
                    <div className="code-line">  description = &quot;The name of the Auto Scaling Group&quot;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">output &quot;alb_dns_name&quot; &#123;</div>
                    <div className="code-line">  value       = aws_lb.example.dns_name</div>
                    <div className="code-line">  description = &quot;The domain name of the load balancer&quot;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="4-5-モジュールの落とし穴">4-5. モジュールの落とし穴</h3>
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">落とし穴</th>
                            <th scope="col">内容</th>
                            <th scope="col">対処</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>ファイルパス</td>
                                <td>{' '}<code>user_data</code>等でモジュール内の相対ファイルを読む際、実行時のカレントディレクトリ基準になってしまう{' '}</td>
                                <td>{' '}<code>path.module</code>を使い、常にモジュール自身のディレクトリからの相対パスにする{' '}</td>
                            </tr>
                            <tr className="row-even">
                                <td>インラインブロック</td>
                                <td>{' '}<code>ingress &#123;&#125;</code>のようなインラインブロックは、呼び出し元から動的に個数を増減できない{' '}</td>
                                <td>{' '}可能な限り<code>aws_security_group_rule</code>等の別リソースに分離し、<code>for_each</code>で動的生成する{' '}</td>
                            </tr>
                            <tr className="row-odd">
                                <td>ハードコードされたリージョン/プロバイダー</td>
                                <td>{' '}モジュール内で<code>provider &quot;aws&quot; &#123; region = ... &#125;</code>を固定すると再利用性が落ちる{' '}</td>
                                <td>プロバイダー設定は呼び出し元（ルートモジュール）に任せる</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<pre className="code-block">
                    <div className="code-line"># path.moduleの利用例（落とし穴の対処）</div>
                    <div className="code-line">resource &quot;aws_instance&quot; &quot;example&quot; &#123;</div>
                    <div className="code-line">  user_data = file(&quot;$&#123;path.module&#125;/user-data.sh&quot;)</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="4-6-モジュールバージョニング">4-6. モジュールバージョニング</h3>
<p>{' '}Gitリポジトリやレジストリの参照時に<code>ref</code>やバージョン制約を明示し、意図しない破壊的変更の巻き込みを防ぎます。{' '}</p>
<pre className="code-block">
                    <div className="code-line">module &quot;webserver_cluster&quot; &#123;</div>
                    <div className="code-line">  source  = &quot;github.com/foo/modules//services/webserver-cluster?ref=v0.1.4&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  cluster_name  = &quot;webservers-stage&quot;</div>
                    <div className="code-line">  instance_type = &quot;t2.micro&quot;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"># Terraformレジストリ経由の場合</div>
                    <div className="code-line">module &quot;vpc&quot; &#123;</div>
                    <div className="code-line">  source  = &quot;terraform-aws-modules/vpc/aws&quot;</div>
                    <div className="code-line">  version = &quot;~&gt; 5.0&quot;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<ul>{' '}<li>{' '}<code>ref</code>にブランチ名（<code>main</code>等）を指定しない。必ずタグ／コミットハッシュで固定する{' '}</li>{' '}<li>{' '}セマンティックバージョニング（<code>~&gt; 5.0</code>のような制約演算子）で、意図しないメジャーアップデートの巻き込みを防ぐ{' '}</li>{' '}</ul>{' '}</div>{' '}</div>

        </section>
    );
}
