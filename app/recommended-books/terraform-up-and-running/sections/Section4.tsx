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
                    <div className="code-line"><span className="hl-kw">module</span> <span className="hl-str">&quot;webserver_cluster&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">source</span> = <span className="hl-str">&quot;../../modules/services/webserver-cluster&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">cluster_name</span>  = <span className="hl-str">&quot;webservers-stage&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">instance_type</span> = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">min_size</span>      = <span className="hl-num">2</span></div>
                    <div className="code-line">    <span className="hl-attr">max_size</span>      = <span className="hl-num">2</span></div>
                    <div className="code-line">&#125;</div>
                </pre>
<Diagram id="diag-8" ariaLabel="再利用可能なTerraformモジュールの入力・リソース・出力構造" />
<h3 id="4-2-モジュール入力変数module-inputs">{' '}4-2. モジュール入力変数（Module Inputs）{' '}</h3>
<p>{' '}呼び出し元から値を注入するためのインターフェースです。<code>default</code>を持たない変数は必須パラメータになります。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;cluster_name&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;The name to use for all the cluster resources&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-type">string</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;instance_type&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;The type of EC2 Instance to run&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-type">string</span></div>
                    <div className="code-line">    <span className="hl-kw">default</span>     = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-cm"># 空文字を弾く。この validation があって初めて、</span></div>
                    <div className="code-line">    <span className="hl-cm"># 第9部の expect_failures = [var.instance_type] が検証エラーを検出できる</span></div>
                    <div className="code-line">    validation &#123;</div>
                    <div className="code-line">        <span className="hl-attr">condition</span>     = <span className="hl-fn">length</span>(<span className="hl-fn">trimspace</span>(<span className="hl-var">var.instance_type</span>)) &gt; <span className="hl-num">0</span></div>
                    <div className="code-line">        <span className="hl-attr">error_message</span> = <span className="hl-str">&quot;instance_type must not be empty.&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="4-3-モジュールのlocal値">4-3. モジュールのlocal値</h3>
<p>{' '}繰り返し使う計算式や、外部に公開する必要のない中間値は<code>locals</code>にまとめます。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">locals</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">http_port</span>    = <span className="hl-num">80</span></div>
                    <div className="code-line">    <span className="hl-attr">any_port</span>     = <span className="hl-num">0</span></div>
                    <div className="code-line">    <span className="hl-attr">any_protocol</span> = <span className="hl-str">&quot;-1&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">all_ips</span>      = [<span className="hl-str">&quot;0.0.0.0/0&quot;</span>]</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="4-4-モジュール出力値module-outputs">{' '}4-4. モジュール出力値（Module Outputs）{' '}</h3>
<p>呼び出し元やCLIから参照できる戻り値です。</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">output</span> <span className="hl-str">&quot;asg_name&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">value</span>       = aws_autoscaling_group.example.name</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;The name of the Auto Scaling Group&quot;</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">output</span> <span className="hl-str">&quot;alb_dns_name&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">value</span>       = aws_lb.example.dns_name</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;The domain name of the load balancer&quot;</span></div>
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
                    <div className="code-line"><span className="hl-cm"># path.moduleの利用例（落とし穴の対処）</span></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">user_data</span> = <span className="hl-fn">file</span>(<span className="hl-str">&quot;$&#123;path.module&#125;/user-data.sh&quot;</span>)</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="4-6-モジュールバージョニング">4-6. モジュールバージョニング</h3>
<p>{' '}Gitリポジトリやレジストリの参照時に<code>ref</code>やバージョン制約を明示し、意図しない破壊的変更の巻き込みを防ぎます。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">module</span> <span className="hl-str">&quot;webserver_cluster&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">source</span>  = <span className="hl-str">&quot;github.com/foo/modules//services/webserver-cluster?ref=v0.1.4&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">cluster_name</span>  = <span className="hl-str">&quot;webservers-stage&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">instance_type</span> = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># Terraformレジストリ経由の場合</span></div>
                    <div className="code-line"><span className="hl-kw">module</span> <span className="hl-str">&quot;vpc&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">source</span>  = <span className="hl-str">&quot;terraform-aws-modules/vpc/aws&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">version</span> = <span className="hl-str">&quot;~&gt; 5.0&quot;</span></div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<ul>{' '}<li>{' '}<code>ref</code>にブランチ名（<code>main</code>等）を指定しない。必ずタグ／コミットハッシュで固定する{' '}</li>{' '}<li>{' '}セマンティックバージョニング（<code>~&gt; 5.0</code>のような制約演算子）で、意図しないメジャーアップデートの巻き込みを防ぐ{' '}</li>{' '}</ul>{' '}</div>{' '}</div>

        </section>
    );
}
