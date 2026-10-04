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
                    <div className="code-line"># macOS (Homebrew)</div>
                    <div className="code-line">brew tap hashicorp/tap</div>
                    <div className="code-line">brew install hashicorp/tap/terraform</div>
                    <div className="code-line"></div>
                    <div className="code-line"># バージョン確認</div>
                    <div className="code-line">terraform version</div>
                </pre>
<p>{' '}複数バージョンを切り替える場合は<code>tfenv</code>や<code>asdf</code>のようなバージョンマネージャの利用が推奨されます。プロジェクトごとにバージョンを固定するため、<code>required_version</code>をコード側にも明示します。{' '}</p>
<pre className="code-block">
                    <div className="code-line">terraform &#123;</div>
                    <div className="code-line">  required_version = &quot;&gt;= 1.16.0, &lt; 2.0.0&quot;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="2-3-単一サーバーのデプロイ">2-3. 単一サーバーのデプロイ</h3>
<p>Terraformの最小構成は「provider」と「resource」の2ブロックです。</p>
<pre className="code-block">
                    <div className="code-line">provider &quot;aws&quot; &#123;</div>
                    <div className="code-line">  region = &quot;us-east-2&quot;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource &quot;aws_instance&quot; &quot;example&quot; &#123;</div>
                    <div className="code-line">  ami           = &quot;ami-0fb653ca2d3203ac1&quot;</div>
                    <div className="code-line">  instance_type = &quot;t2.micro&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  tags = &#123;</div>
                    <div className="code-line">    Name = &quot;terraform-example&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-warning">{' '}<div className="callout-icon">⚠{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">注意{' '}</div>{' '}<p>{' '}AMI ID はリージョン固有かつ時間とともに廃止・置き換えが進むため、上のようにハードコードした ID は別リージョンや将来の実行では解決できずに{' '}<code>apply</code>{' '}が失敗します。実務では{' '}<code>aws_ami</code>{' '}データソースで最新の AMI を動的に解決します。{' '}</p>{' '}</div>{' '}</div>
<pre className="code-block">
                    <div className="code-line">data &quot;aws_ami&quot; &quot;ubuntu&quot; &#123;</div>
                    <div className="code-line">  most_recent = true</div>
                    <div className="code-line">  owners      = [&quot;099720109477&quot;] # Canonical</div>
                    <div className="code-line"></div>
                    <div className="code-line">  filter &#123;</div>
                    <div className="code-line">    name   = &quot;name&quot;</div>
                    <div className="code-line">    values = [&quot;ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*&quot;]</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource &quot;aws_instance&quot; &quot;example&quot; &#123;</div>
                    <div className="code-line">  ami           = data.aws_ami.ubuntu.id</div>
                    <div className="code-line">  instance_type = &quot;t2.micro&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  tags = &#123;</div>
                    <div className="code-line">    Name = &quot;terraform-example&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>基本ワークフローは次の3ステップです。</p>
<Diagram id="diag-4" ariaLabel="単一サーバーデプロイの基本フロー（main.tfからAWS EC2への反映）" />
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<ul>{' '}<li>{' '}<code>terraform plan</code>の出力は必ず目視確認してから<code>apply</code>する（CI上でも<code>plan</code>結果をレビュー対象にする）{' '}</li>{' '}<li>{' '}<code>terraform apply</code>の前に<code>terraform fmt</code>と<code>terraform validate</code>をCIに組み込み、構文エラーを早期検出する{' '}</li>{' '}</ul>{' '}</div>{' '}</div>
<h3 id="2-4-単一webサーバーのデプロイ">2-4. 単一Webサーバーのデプロイ</h3>
<p>{' '}<code>user_data</code>でサーバー起動時にスクリプトを実行し、<code>aws_security_group</code>でポートを開放します。{' '}</p>
<pre className="code-block">
                    <div className="code-line">resource &quot;aws_security_group&quot; &quot;instance&quot; &#123;</div>
                    <div className="code-line">  name = &quot;terraform-example-instance&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  ingress &#123;</div>
                    <div className="code-line">    from_port   = 8080</div>
                    <div className="code-line">    to_port     = 8080</div>
                    <div className="code-line">    protocol    = &quot;tcp&quot;</div>
                    <div className="code-line">    cidr_blocks = [&quot;0.0.0.0/0&quot;]</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource &quot;aws_instance&quot; &quot;example&quot; &#123;</div>
                    <div className="code-line">  ami                    = &quot;ami-0fb653ca2d3203ac1&quot;</div>
                    <div className="code-line">  instance_type          = &quot;t2.micro&quot;</div>
                    <div className="code-line">  vpc_security_group_ids = [aws_security_group.instance.id]</div>
                    <div className="code-line"></div>
                    <div className="code-line">  user_data = &lt;&lt;-EOF</div>
                    <div className="code-line">              #!/bin/bash</div>
                    <div className="code-line">              echo &quot;Hello, World&quot; &gt; index.html</div>
                    <div className="code-line">              nohup busybox httpd -f -p 8080 &amp;</div>
                    <div className="code-line">              EOF</div>
                    <div className="code-line"></div>
                    <div className="code-line">  user_data_replace_on_change = true</div>
                    <div className="code-line"></div>
                    <div className="code-line">  tags = &#123;</div>
                    <div className="code-line">    Name = &quot;terraform-example&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>{' '}<code>0.0.0.0/0</code>のような全開放CIDRは学習用の最小構成であり、本番では特定のCIDRブロックやセキュリティグループ参照に絞り込むのがベストプラクティスです。{' '}</p>
<h3 id="2-5-設定可能なwebサーバー変数の導入">{' '}2-5. 設定可能なWebサーバー（変数の導入）{' '}</h3>
<p>{' '}ハードコードを避けるため<code>variable</code>ブロックで入力値を外出しします。変数を定義しただけでは何も変わらないため、2-4でポート番号を直書きしていた箇所（セキュリティグループの<code>ingress</code>と<code>user_data</code>）を必ず<code>var.server_port</code>への参照に置き換えます。{' '}</p>
<pre className="code-block">
                    <div className="code-line">variable &quot;server_port&quot; &#123;</div>
                    <div className="code-line">  description = &quot;The port the server will use for HTTP requests&quot;</div>
                    <div className="code-line">  type        = number</div>
                    <div className="code-line">  default     = 8080</div>
                    <div className="code-line">&#125;</div>
                </pre>
<pre className="code-block">
                    <div className="code-line">resource &quot;aws_security_group&quot; &quot;instance&quot; &#123;</div>
                    <div className="code-line">  name = &quot;terraform-example-instance&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  ingress &#123;</div>
                    <div className="code-line">    from_port   = var.server_port</div>
                    <div className="code-line">    to_port     = var.server_port</div>
                    <div className="code-line">    protocol    = &quot;tcp&quot;</div>
                    <div className="code-line">    cidr_blocks = [&quot;0.0.0.0/0&quot;]</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource &quot;aws_instance&quot; &quot;example&quot; &#123;</div>
                    <div className="code-line">  ami                    = &quot;ami-0fb653ca2d3203ac1&quot;</div>
                    <div className="code-line">  instance_type          = &quot;t2.micro&quot;</div>
                    <div className="code-line">  vpc_security_group_ids = [aws_security_group.instance.id]</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # $&#123;var.server_port&#125; で変数の値をスクリプトへ埋め込む（HEREDOC内でも補間が効く）</div>
                    <div className="code-line">  user_data = &lt;&lt;-EOF</div>
                    <div className="code-line">              #!/bin/bash</div>
                    <div className="code-line">              echo &quot;Hello, World&quot; &gt; index.html</div>
                    <div className="code-line">              nohup busybox httpd -f -p $&#123;var.server_port&#125; &amp;</div>
                    <div className="code-line">              EOF</div>
                    <div className="code-line"></div>
                    <div className="code-line">  user_data_replace_on_change = true</div>
                    <div className="code-line"></div>
                    <div className="code-line">  tags = &#123;</div>
                    <div className="code-line">    Name = &quot;terraform-example&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">output &quot;public_ip&quot; &#123;</div>
                    <div className="code-line">  value       = aws_instance.example.public_ip</div>
                    <div className="code-line">  description = &quot;The public IP address of the web server&quot;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>{' '}これで<code>server_port</code>の値を変えるだけで、<strong>実際に待ち受けるポートと許可するポートの両方</strong>が追従します。片方だけを変数化すると、サーバーは新しいポートで待ち受けるのにセキュリティグループは旧ポートを開けたまま、という接続不能な状態になるため、必ず両方をひとつの変数から導出します。{' '}</p>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<ul>{' '}<li>{' '}すべての<code>variable</code>と<code>output</code>に<code>description</code>を書く（自己文書化、<code>terraform-docs</code>との相性も良い）{' '}</li>{' '}<li>型制約（<code>type</code>）を明示し、想定外の値の混入を防ぐ</li>{' '}</ul>{' '}</div>{' '}</div>
<h3 id="2-6-webサーバークラスタのデプロイ">2-6. Webサーバークラスタのデプロイ</h3>
<p>{' '}単一サーバーでは可用性が確保できないため、Auto Scaling Group（ASG）とLaunch Templateでクラスタ化します。{' '}</p>
<pre className="code-block">
                    <div className="code-line">resource &quot;aws_launch_template&quot; &quot;example&quot; &#123;</div>
                    <div className="code-line">  image_id      = &quot;ami-0fb653ca2d3203ac1&quot;</div>
                    <div className="code-line">  instance_type = &quot;t2.micro&quot;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  vpc_security_group_ids = [aws_security_group.instance.id]</div>
                    <div className="code-line"></div>
                    <div className="code-line">  user_data = base64encode(&lt;&lt;-EOF</div>
                    <div className="code-line">              #!/bin/bash</div>
                    <div className="code-line">              echo &quot;Hello, World&quot; &gt; index.html</div>
                    <div className="code-line">              nohup busybox httpd -f -p 8080 &amp;</div>
                    <div className="code-line">              EOF</div>
                    <div className="code-line">  )</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource &quot;aws_autoscaling_group&quot; &quot;example&quot; &#123;</div>
                    <div className="code-line">  launch_template &#123;</div>
                    <div className="code-line">    id      = aws_launch_template.example.id</div>
                    <div className="code-line">    version = aws_launch_template.example.latest_version</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  instance_refresh &#123;</div>
                    <div className="code-line">    strategy = &quot;Rolling&quot;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  min_size = 2</div>
                    <div className="code-line">  max_size = 10</div>
                    <div className="code-line"></div>
                    <div className="code-line">  tag &#123;</div>
                    <div className="code-line">    key                 = &quot;Name&quot;</div>
                    <div className="code-line">    value               = &quot;terraform-asg-example&quot;</div>
                    <div className="code-line">    propagate_at_launch = true</div>
                    <div className="code-line">  &#125;</div>
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
                    <div className="code-line">resource &quot;aws_db_instance&quot; &quot;production&quot; &#123;</div>
                    <div className="code-line">  # ...</div>
                    <div className="code-line"></div>
                    <div className="code-line">  lifecycle &#123;</div>
                    <div className="code-line">    prevent_destroy = true</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>

        </section>
    );
}
