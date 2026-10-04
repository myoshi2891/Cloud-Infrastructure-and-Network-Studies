// app/recommended-books/terraform-up-and-running/sections/Section2.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section2({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第2部原著第2章対応-terraformことはじめ">{' '}第2部（原著第2章対応）: Terraformことはじめ{' '}</h2>
<p>{' '}原著第2章は、AWS上で「単一サーバー」→「単一Webサーバー」→「設定可能なWebサーバー」→「Webサーバークラスタ」→「ロードバランサー」という順に、段階的に本番相当の構成へ育てていくハンズオン構成になっています。本ガイドでも同じ順序で、各ステップの目的とHCLコード例を示します。{' '}</p>
<h3 id="2-1-awsアカウントの準備ベストプラクティス">{' '}2-1. AWSアカウントの準備（ベストプラクティス）{' '}</h3>
<p>本番運用を見据える場合、以下は必ず押さえておくべき基本です。</p>
<ul>{' '}<li>{' '}<strong>ルートユーザーは日常利用しない</strong>: MFAを設定した上で金庫にしまい、IAMユーザー/IAM Identity Center経由で作業する{' '}</li>{' '}<li>{' '}<strong>最小権限のIAMユーザーでTerraformを実行する</strong>:{' '}<code>AdministratorAccess</code>を安易に付与しない{' '}</li>{' '}<li>{' '}<strong>認証情報をコードに埋め込まない</strong>: 環境変数や<code>~/.aws/credentials</code>、あるいはCI/CDのOIDC連携を使う{' '}</li>{' '}</ul>
<h3 id="2-2-terraformのインストール">2-2. Terraformのインストール</h3>
<pre className="code-block">
                    <div className="code-line"><span className="hl-cm"># macOS (Homebrew)</span></div>
                    <div className="code-line"><span className="hl-cmd">brew</span> tap hashicorp/tap</div>
                    <div className="code-line"><span className="hl-cmd">brew</span> install hashicorp/tap/terraform</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># バージョン確認</span></div>
                    <div className="code-line"><span className="hl-cmd">terraform</span> version</div>
                </pre>
<p>{' '}複数バージョンを切り替える場合は<code>tfenv</code>や<code>asdf</code>のようなバージョンマネージャの利用が推奨されます。プロジェクトごとにバージョンを固定するため、<code>required_version</code>をコード側にも明示します。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">terraform</span> &#123;</div>
                    <div className="code-line">    <span className="hl-kw">required_version</span> = <span className="hl-str">&quot;&gt;= 1.16.0, &lt; 2.0.0&quot;</span></div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="2-3-単一サーバーのデプロイ">2-3. 単一サーバーのデプロイ</h3>
<p>Terraformの最小構成は「provider」と「resource」の2ブロックです。</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">provider</span> <span className="hl-str">&quot;aws&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">region</span> = <span className="hl-str">&quot;us-east-2&quot;</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">ami</span>           = <span className="hl-str">&quot;ami-0fb653ca2d3203ac1&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">instance_type</span> = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">tags</span> = &#123;</div>
                    <div className="code-line">        <span className="hl-attr">Name</span> = <span className="hl-str">&quot;terraform-example&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-warning">{' '}<div className="callout-icon">⚠{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">注意{' '}</div>{' '}<p>{' '}AMI ID はリージョン固有かつ時間とともに廃止・置き換えが進むため、上のようにハードコードした ID は別リージョンや将来の実行では解決できずに{' '}<code>apply</code>{' '}が失敗します。実務では{' '}<code>aws_ami</code>{' '}データソースで最新の AMI を動的に解決します。{' '}</p>{' '}</div>{' '}</div>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">data</span> <span className="hl-type">&quot;aws_ami&quot;</span> <span className="hl-str">&quot;ubuntu&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">most_recent</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line">    <span className="hl-attr">owners</span>      = [<span className="hl-str">&quot;099720109477&quot;</span>] <span className="hl-cm"># Canonical</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-kw">filter</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">name</span>   = <span className="hl-str">&quot;name&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">values</span> = [<span className="hl-str">&quot;ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*&quot;</span>]</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">ami</span>           = data.aws_ami.ubuntu.id</div>
                    <div className="code-line">    <span className="hl-attr">instance_type</span> = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">tags</span> = &#123;</div>
                    <div className="code-line">        <span className="hl-attr">Name</span> = <span className="hl-str">&quot;terraform-example&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>基本ワークフローは次の3ステップです。</p>
<Diagram id="diag-4" ariaLabel="単一サーバーデプロイの基本フロー（main.tfからAWS EC2への反映）" />
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<ul>{' '}<li>{' '}<code>terraform plan</code>の出力は必ず目視確認してから<code>apply</code>する（CI上でも<code>plan</code>結果をレビュー対象にする）{' '}</li>{' '}<li>{' '}<code>terraform apply</code>の前に<code>terraform fmt</code>と<code>terraform validate</code>をCIに組み込み、構文エラーを早期検出する{' '}</li>{' '}</ul>{' '}</div>{' '}</div>
<h3 id="2-4-単一webサーバーのデプロイ">2-4. 単一Webサーバーのデプロイ</h3>
<p>{' '}<code>user_data</code>でサーバー起動時にスクリプトを実行し、<code>aws_security_group</code>でポートを開放します。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_security_group&quot;</span> <span className="hl-str">&quot;instance&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">name</span> = <span className="hl-str">&quot;terraform-example-instance&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-kw">ingress</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">from_port</span>   = <span className="hl-num">8080</span></div>
                    <div className="code-line">        <span className="hl-attr">to_port</span>     = <span className="hl-num">8080</span></div>
                    <div className="code-line">        <span className="hl-attr">protocol</span>    = <span className="hl-str">&quot;tcp&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">cidr_blocks</span> = [<span className="hl-str">&quot;0.0.0.0/0&quot;</span>]</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">ami</span>                    = <span className="hl-str">&quot;ami-0fb653ca2d3203ac1&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">instance_type</span>          = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">vpc_security_group_ids</span> = [aws_security_group.instance.id]</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">user_data</span> = &lt;&lt;-EOF</div>
                    <div className="code-line">        <span className="hl-cm">#!/bin/bash</span></div>
                    <div className="code-line">        echo <span className="hl-str">&quot;Hello, World&quot;</span> &gt; index.html</div>
                    <div className="code-line">        nohup busybox httpd -f -p <span className="hl-num">8080</span> &amp;</div>
                    <div className="code-line">        EOF</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">user_data_replace_on_change</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">tags</span> = &#123;</div>
                    <div className="code-line">        <span className="hl-attr">Name</span> = <span className="hl-str">&quot;terraform-example&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>{' '}<code>0.0.0.0/0</code>のような全開放CIDRは学習用の最小構成であり、本番では特定のCIDRブロックやセキュリティグループ参照に絞り込むのがベストプラクティスです。{' '}</p>
<h3 id="2-5-設定可能なwebサーバー変数の導入">{' '}2-5. 設定可能なWebサーバー（変数の導入）{' '}</h3>
<p>{' '}ハードコードを避けるため<code>variable</code>ブロックで入力値を外出しします。変数を定義しただけでは何も変わらないため、2-4でポート番号を直書きしていた箇所（セキュリティグループの<code>ingress</code>と<code>user_data</code>）を必ず<code>var.server_port</code>への参照に置き換えます。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;server_port&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;The port the server will use for HTTP requests&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-type">number</span></div>
                    <div className="code-line">    <span className="hl-kw">default</span>     = <span className="hl-num">8080</span></div>
                    <div className="code-line">&#125;</div>
                </pre>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_security_group&quot;</span> <span className="hl-str">&quot;instance&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">name</span> = <span className="hl-str">&quot;terraform-example-instance&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-kw">ingress</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">from_port</span>   = <span className="hl-var">var.server_port</span></div>
                    <div className="code-line">        <span className="hl-attr">to_port</span>     = <span className="hl-var">var.server_port</span></div>
                    <div className="code-line">        <span className="hl-attr">protocol</span>    = <span className="hl-str">&quot;tcp&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">cidr_blocks</span> = [<span className="hl-str">&quot;0.0.0.0/0&quot;</span>]</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">ami</span>                    = <span className="hl-str">&quot;ami-0fb653ca2d3203ac1&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">instance_type</span>          = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">vpc_security_group_ids</span> = [aws_security_group.instance.id]</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-cm"># $&#123;var.server_port&#125; で変数の値をスクリプトへ埋め込む（HEREDOC内でも補間が効く）</span></div>
                    <div className="code-line">    <span className="hl-attr">user_data</span> = &lt;&lt;-EOF</div>
                    <div className="code-line">        <span className="hl-cm">#!/bin/bash</span></div>
                    <div className="code-line">        echo <span className="hl-str">&quot;Hello, World&quot;</span> &gt; index.html</div>
                    <div className="code-line">        nohup busybox httpd -f -p $&#123;<span className="hl-var">var.server_port</span>&#125; &amp;</div>
                    <div className="code-line">        EOF</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">user_data_replace_on_change</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">tags</span> = &#123;</div>
                    <div className="code-line">        <span className="hl-attr">Name</span> = <span className="hl-str">&quot;terraform-example&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">output</span> <span className="hl-str">&quot;public_ip&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">value</span>       = aws_instance.example.public_ip</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;The public IP address of the web server&quot;</span></div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>{' '}これで<code>server_port</code>の値を変えるだけで、<strong>実際に待ち受けるポートと許可するポートの両方</strong>が追従します。片方だけを変数化すると、サーバーは新しいポートで待ち受けるのにセキュリティグループは旧ポートを開けたまま、という接続不能な状態になるため、必ず両方をひとつの変数から導出します。{' '}</p>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<ul>{' '}<li>{' '}すべての<code>variable</code>と<code>output</code>に<code>description</code>を書く（自己文書化、<code>terraform-docs</code>との相性も良い）{' '}</li>{' '}<li>型制約（<code>type</code>）を明示し、想定外の値の混入を防ぐ</li>{' '}</ul>{' '}</div>{' '}</div>
<h3 id="2-6-webサーバークラスタのデプロイ">2-6. Webサーバークラスタのデプロイ</h3>
<p>{' '}単一サーバーでは可用性が確保できないため、Auto Scaling Group（ASG）とLaunch Templateでクラスタ化します。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_launch_template&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">image_id</span>      = <span className="hl-str">&quot;ami-0fb653ca2d3203ac1&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">instance_type</span> = <span className="hl-str">&quot;t2.micro&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">vpc_security_group_ids</span> = [aws_security_group.instance.id]</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">user_data</span> = <span className="hl-fn">base64encode</span>(&lt;&lt;-EOF</div>
                    <div className="code-line">        <span className="hl-cm">#!/bin/bash</span></div>
                    <div className="code-line">        echo <span className="hl-str">&quot;Hello, World&quot;</span> &gt; index.html</div>
                    <div className="code-line">        nohup busybox httpd -f -p <span className="hl-num">8080</span> &amp;</div>
                    <div className="code-line">        EOF</div>
                    <div className="code-line">    )</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_autoscaling_group&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    launch_template &#123;</div>
                    <div className="code-line">        <span className="hl-attr">id</span>      = aws_launch_template.example.id</div>
                    <div className="code-line">        <span className="hl-attr">version</span> = aws_launch_template.example.latest_version</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">    instance_refresh &#123;</div>
                    <div className="code-line">        <span className="hl-attr">strategy</span> = <span className="hl-str">&quot;Rolling&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">min_size</span> = <span className="hl-num">2</span></div>
                    <div className="code-line">    <span className="hl-attr">max_size</span> = <span className="hl-num">10</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    tag &#123;</div>
                    <div className="code-line">        <span className="hl-attr">key</span>                 = <span className="hl-str">&quot;Name&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">value</span>               = <span className="hl-str">&quot;terraform-asg-example&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">propagate_at_launch</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>{' '}<code>version</code>に文字列<code>&quot;$Latest&quot;</code>を書くと、Launch Templateの中身（AMIやユーザーデータ）を変更してもASG側の属性値は<code>&quot;$Latest&quot;</code>のまま変わらないため、Terraformは差分を検知せずASGを更新しません。<code>aws_launch_template.example.latest_version</code>を参照すれば、テンプレート更新のたびにバージョン番号が変わってASGにも差分が現れ、<code>instance_refresh</code>によるローリング入れ替えが起動します。{' '}</p>
<h3 id="2-7-ロードバランサーのデプロイ">2-7. ロードバランサーのデプロイ</h3>
<p>{' '}ALB（Application Load Balancer）をASGの手前に配置し、ヘルスチェック付きでトラフィックを分散します。{' '}</p>
<Diagram id="diag-5" ariaLabel="WebサーバークラスタとApplication Load Balancer（ALB）の構成図" />
<h3 id="2-8-クリーンアップ">2-8. クリーンアップ</h3>
<p>{' '}学習環境では課金を止めるため<code>terraform destroy</code>で作成したリソースを確実に削除します。共有環境では<code>terraform plan -destroy</code>で影響範囲を確認してから実行するのが安全です。{' '}</p>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<ul>{' '}<li>{' '}個人の検証環境は使い終わったら都度<code>destroy</code>する（コスト管理）{' '}</li>{' '}<li>{' '}本番環境では<code>prevent_destroy</code>ライフサイクルルールで誤削除を防止する{' '}</li>{' '}</ul>{' '}</div>{' '}</div>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_db_instance&quot;</span> <span className="hl-str">&quot;production&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-cm"># ...</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-kw">lifecycle</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">prevent_destroy</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>

        </section>
    );
}
