// app/recommended-books/terraform-up-and-running/sections/Section7.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section7({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第7部原著第7章対応-複数プロバイダーの利用">{' '}第7部（原著第7章対応）: 複数プロバイダーの利用{' '}</h2>
<h3 id="7-1-単一プロバイダーでの作業とプロバイダーのインストール">{' '}7-1. 単一プロバイダーでの作業とプロバイダーのインストール{' '}</h3>
<p>{' '}プロバイダーは<code>required_providers</code>ブロックでソースとバージョンを明示します。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">terraform</span> &#123;</div>
                    <div className="code-line">    <span className="hl-kw">required_providers</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">aws</span> = &#123;</div>
                    <div className="code-line">            <span className="hl-attr">source</span>  = <span className="hl-str">&quot;hashicorp/aws&quot;</span></div>
                    <div className="code-line">            <span className="hl-attr">version</span> = <span className="hl-str">&quot;~&gt; 6.0&quot;</span></div>
                    <div className="code-line">        &#125;</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="7-2-同一プロバイダーの複数コピーマルチリージョンマルチアカウント">{' '}7-2. 同一プロバイダーの複数コピー（マルチリージョン・マルチアカウント）{' '}</h3>
<p>{' '}<code>alias</code>を使うことで、1つのTerraformコード内から複数リージョン・複数AWSアカウントを扱えます。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">provider</span> <span className="hl-str">&quot;aws&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">region</span> = <span className="hl-str">&quot;us-east-2&quot;</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">provider</span> <span className="hl-str">&quot;aws&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">alias</span>  = <span className="hl-str">&quot;usa_west_2&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">region</span> = <span className="hl-str">&quot;us-west-2&quot;</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;east&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-kw">provider</span> = aws</div>
                    <div className="code-line">    <span className="hl-cm"># ...</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_instance&quot;</span> <span className="hl-str">&quot;west&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-kw">provider</span> = aws.usa_west_2</div>
                    <div className="code-line">    <span className="hl-cm"># ...</span></div>
                    <div className="code-line">&#125;</div>
                </pre>
<Diagram id="diag-11" ariaLabel="マルチリージョン・マルチアカウントでの複数プロバイダーエイリアス構成" />
<h3 id="7-3-複数プロバイダーに対応したモジュールの作成">{' '}7-3. 複数プロバイダーに対応したモジュールの作成{' '}</h3>
<p>{' '}モジュールを複数プロバイダーで再利用可能にするには、<code>configuration_aliases</code>でエイリアスの受け渡しを明示します。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">terraform</span> &#123;</div>
                    <div className="code-line">    <span className="hl-kw">required_providers</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">aws</span> = &#123;</div>
                    <div className="code-line">            <span className="hl-attr">source</span>                = <span className="hl-str">&quot;hashicorp/aws&quot;</span></div>
                    <div className="code-line">            <span className="hl-attr">version</span>               = <span className="hl-str">&quot;~&gt; 6.0&quot;</span></div>
                    <div className="code-line">            <span className="hl-attr">configuration_aliases</span> = [aws.usa_west_2]</div>
                    <div className="code-line">        &#125;</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="7-4-異なる複数プロバイダーの利用-dockerkubernetesクラッシュコース">{' '}7-4. 異なる複数プロバイダーの利用: Docker/Kubernetesクラッシュコース{' '}</h3>
<p>{' '}TerraformはAWSのようなクラウドAPIだけでなく、DockerデーモンやKubernetes APIも「プロバイダー」として扱えます。{' '}</p>
<Diagram id="diag-12" ariaLabel="Terraformによる複数プロバイダー（AWS, Kubernetes, Docker）の連携構成" />
<h3 id="7-5-eksでのdockerコンテナデプロイ">7-5. EKSでのDockerコンテナデプロイ</h3>
<p>{' '}クラスタ本体とクラスタ内のリソースは、<strong>別々のroot module（＝別State）</strong>として構成します。まずEKSクラスタを作る側です。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-cm"># root module A（例: live/eks-cluster）: aws プロバイダーでクラスタ本体だけを管理する</span></div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># クラスタが参照する前提を同じroot module内で宣言しておく</span></div>
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;subnet_ids&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;EKSコントロールプレーンを配置するサブネットID（最低2つ、別AZ）&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-fn">list</span>(<span className="hl-type">string</span>)</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">data</span> <span className="hl-type">&quot;aws_iam_policy_document&quot;</span> <span className="hl-str">&quot;cluster_assume_role&quot;</span> &#123;</div>
                    <div className="code-line">    statement &#123;</div>
                    <div className="code-line">        <span className="hl-attr">effect</span>  = <span className="hl-str">&quot;Allow&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">actions</span> = [<span className="hl-str">&quot;sts:AssumeRole&quot;</span>]</div>
                    <div className="code-line"></div>
                    <div className="code-line">        principals &#123;</div>
                    <div className="code-line">            <span className="hl-attr">type</span>        = <span className="hl-str">&quot;Service&quot;</span></div>
                    <div className="code-line">            <span className="hl-attr">identifiers</span> = [<span className="hl-str">&quot;eks.amazonaws.com&quot;</span>]</div>
                    <div className="code-line">        &#125;</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_iam_role&quot;</span> <span className="hl-str">&quot;cluster&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">name</span>               = <span className="hl-str">&quot;example-cluster-role&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">assume_role_policy</span> = data.aws_iam_policy_document.cluster_assume_role.json</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_iam_role_policy_attachment&quot;</span> <span className="hl-str">&quot;cluster&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">role</span>       = aws_iam_role.cluster.name</div>
                    <div className="code-line">    <span className="hl-attr">policy_arn</span> = <span className="hl-str">&quot;arn:aws:iam::aws:policy/AmazonEKSClusterPolicy&quot;</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_eks_cluster&quot;</span> <span className="hl-str">&quot;cluster&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">name</span>     = <span className="hl-str">&quot;example-cluster&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">role_arn</span> = aws_iam_role.cluster.arn</div>
                    <div className="code-line"></div>
                    <div className="code-line">    vpc_config &#123;</div>
                    <div className="code-line">        <span className="hl-attr">subnet_ids</span> = <span className="hl-var">var.subnet_ids</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-cm"># ロール権限が付与される前にクラスタ作成が走らないようにする</span></div>
                    <div className="code-line">    <span className="hl-attr">depends_on</span> = [aws_iam_role_policy_attachment.cluster]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">output</span> <span className="hl-str">&quot;cluster_name&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">value</span>       = aws_eks_cluster.cluster.name</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;Kubernetesリソース側のroot moduleへ渡すクラスタ名&quot;</span></div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>{' '}次に、そのクラスタ内でKubernetesリソースを管理する側です。クラスタは自分では作らず、<strong>data sourceで既存クラスタを参照</strong>して<code>provider &quot;kubernetes&quot;</code>を構成します。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-cm"># root module B（例: live/eks-workloads）: kubernetes プロバイダーでクラスタ内リソースを管理する</span></div>
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;cluster_name&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;root module A の cluster_name 出力（terraform_remote_state 等で受け取る）&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-type">string</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">data</span> <span className="hl-type">&quot;aws_eks_cluster&quot;</span> <span className="hl-str">&quot;cluster&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">name</span> = <span className="hl-var">var.cluster_name</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># provider ブロックが参照する認証トークンの供給元</span></div>
                    <div className="code-line"><span className="hl-kw">data</span> <span className="hl-type">&quot;aws_eks_cluster_auth&quot;</span> <span className="hl-str">&quot;cluster&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">name</span> = <span className="hl-var">var.cluster_name</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">provider</span> <span className="hl-str">&quot;kubernetes&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">host</span>                   = data.aws_eks_cluster.cluster.endpoint</div>
                    <div className="code-line">    <span className="hl-attr">cluster_ca_certificate</span> = <span className="hl-fn">base64decode</span>(data.aws_eks_cluster.cluster.certificate_authority[<span className="hl-num">0</span>].<span className="hl-kw">data</span>)</div>
                    <div className="code-line">    <span className="hl-attr">token</span>                  = data.aws_eks_cluster_auth.cluster.token</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;kubernetes_deployment&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    metadata &#123;</div>
                    <div className="code-line">        <span className="hl-attr">name</span> = <span className="hl-str">&quot;example-app&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">    spec &#123;</div>
                    <div className="code-line">        <span className="hl-attr">replicas</span> = <span className="hl-num">3</span></div>
                    <div className="code-line">        <span className="hl-cm"># selector と template は紙面の都合で省略している（どちらも必須ブロック）</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-note">{' '}<div className="callout-icon">ℹ{' '}</div>{' '}<div className="callout-body">{' '}<p>{' '}このスニペットは要点のみを抜き出した<strong>断片</strong>です。そのまま<code>apply</code>できる形にするには、<code>terraform</code>ブロックの<code>required_providers</code>で<code>hashicorp/aws</code>と<code>hashicorp/kubernetes</code>を宣言し、<code>kubernetes_deployment</code>の<code>spec</code>に必須の<code>selector</code>と<code>template</code>を補う必要があります。{' '}</p>{' '}</div>{' '}</div>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<p>{' '}EKSクラスタ本体（<code>aws</code>プロバイダー管轄）と、その中で動くKubernetesリソース（<code>kubernetes</code>プロバイダー管轄）は、必ずroot module／Stateを分離します。同一のapplyでクラスタを作りながら、そのクラスタの<code>endpoint</code>や<code>token</code>で<code>provider &quot;kubernetes&quot;</code>を構成すると、プロバイダー設定が「まだ存在しないリソースの属性」に依存することになり、初回<code>apply</code>や<code>plan</code>が失敗したり、クラスタの再作成時にプロバイダーの初期化ごと壊れてStateを手当てできなくなったりします。分離しておけば、クラスタ側の変更（バージョンアップ、ノードグループ変更）とアプリ側の変更（Deploymentの更新）を独立した変更頻度・責任分界点で回せます。{' '}</p>{' '}</div>{' '}</div>

        </section>
    );
}
