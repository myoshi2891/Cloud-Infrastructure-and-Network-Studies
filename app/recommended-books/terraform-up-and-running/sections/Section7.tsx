// app/recommended-books/terraform-up-and-running/sections/Section7.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section7({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第7部原著第7章対応-複数プロバイダーの利用">
                    第7部（原著第7章対応）: 複数プロバイダーの利用
                </h2>
<h3 id="7-1-単一プロバイダーでの作業とプロバイダーのインストール">
                    7-1. 単一プロバイダーでの作業とプロバイダーのインストール
                </h3>
<p>
                    プロバイダーは<code>required_providers</code>ブロックでソースとバージョンを明示します。
                </p>
<pre className="code-block">
                    <div className="code-line">terraform &#123;</div>
                    <div className="code-line">  required_providers &#123;</div>
                    <div className="code-line">    aws = &#123;</div>
                    <div className="code-line">      source  = "hashicorp/aws"</div>
                    <div className="code-line">      version = "~&gt; 6.0"</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="7-2-同一プロバイダーの複数コピーマルチリージョンマルチアカウント">
                    7-2. 同一プロバイダーの複数コピー（マルチリージョン・マルチアカウント）
                </h3>
<p>
                    <code>alias</code>を使うことで、1つのTerraformコード内から複数リージョン・複数AWSアカウントを扱えます。
                </p>
<pre className="code-block">
                    <div className="code-line">provider "aws" &#123;</div>
                    <div className="code-line">  region = "us-east-2"</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">provider "aws" &#123;</div>
                    <div className="code-line">  alias  = "usa_west_2"</div>
                    <div className="code-line">  region = "us-west-2"</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_instance" "east" &#123;</div>
                    <div className="code-line">  provider = aws</div>
                    <div className="code-line">  # ...</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_instance" "west" &#123;</div>
                    <div className="code-line">  provider = aws.usa_west_2</div>
                    <div className="code-line">  # ...</div>
                    <div className="code-line">&#125;</div>
                </pre>
<Diagram id="diag-11" ariaLabel="マルチリージョン・マルチアカウントでの複数プロバイダーエイリアス構成" />
<h3 id="7-3-複数プロバイダーに対応したモジュールの作成">
                    7-3. 複数プロバイダーに対応したモジュールの作成
                </h3>
<p>
                    モジュールを複数プロバイダーで再利用可能にするには、<code>configuration_aliases</code>でエイリアスの受け渡しを明示します。
                </p>
<pre className="code-block">
                    <div className="code-line">terraform &#123;</div>
                    <div className="code-line">  required_providers &#123;</div>
                    <div className="code-line">    aws = &#123;</div>
                    <div className="code-line">      source                = "hashicorp/aws"</div>
                    <div className="code-line">      version               = "~&gt; 6.0"</div>
                    <div className="code-line">      configuration_aliases = [aws.usa_west_2]</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="7-4-異なる複数プロバイダーの利用-dockerkubernetesクラッシュコース">
                    7-4. 異なる複数プロバイダーの利用: Docker/Kubernetesクラッシュコース
                </h3>
<p>
                    TerraformはAWSのようなクラウドAPIだけでなく、DockerデーモンやKubernetes
                    APIも「プロバイダー」として扱えます。
                </p>
<Diagram id="diag-12" ariaLabel="Terraformによる複数プロバイダー（AWS, Kubernetes, Docker）の連携構成" />
<h3 id="7-5-eksでのdockerコンテナデプロイ">7-5. EKSでのDockerコンテナデプロイ</h3>
<p>
                    クラスタ本体とクラスタ内のリソースは、**別々のroot
                    module（＝別State）**として構成します。まずEKSクラスタを作る側です。
                </p>
<pre className="code-block">
                    <div className="code-line"># root module A（例: live/eks-cluster）: aws プロバイダーでクラスタ本体だけを管理する</div>
                    <div className="code-line"></div>
                    <div className="code-line"># クラスタが参照する前提を同じroot module内で宣言しておく</div>
                    <div className="code-line">variable "subnet_ids" &#123;</div>
                    <div className="code-line">  description = "EKSコントロールプレーンを配置するサブネットID（最低2つ、別AZ）"</div>
                    <div className="code-line">  type        = list(string)</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">data "aws_iam_policy_document" "cluster_assume_role" &#123;</div>
                    <div className="code-line">  statement &#123;</div>
                    <div className="code-line">    effect  = "Allow"</div>
                    <div className="code-line">    actions = ["sts:AssumeRole"]</div>
                    <div className="code-line"></div>
                    <div className="code-line">    principals &#123;</div>
                    <div className="code-line">      type        = "Service"</div>
                    <div className="code-line">      identifiers = ["eks.amazonaws.com"]</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_iam_role" "cluster" &#123;</div>
                    <div className="code-line">  name               = "example-cluster-role"</div>
                    <div className="code-line">  assume_role_policy = data.aws_iam_policy_document.cluster_assume_role.json</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_iam_role_policy_attachment" "cluster" &#123;</div>
                    <div className="code-line">  role       = aws_iam_role.cluster.name</div>
                    <div className="code-line">  policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_eks_cluster" "cluster" &#123;</div>
                    <div className="code-line">  name     = "example-cluster"</div>
                    <div className="code-line">  role_arn = aws_iam_role.cluster.arn</div>
                    <div className="code-line"></div>
                    <div className="code-line">  vpc_config &#123;</div>
                    <div className="code-line">    subnet_ids = var.subnet_ids</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # ロール権限が付与される前にクラスタ作成が走らないようにする</div>
                    <div className="code-line">  depends_on = [aws_iam_role_policy_attachment.cluster]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">output "cluster_name" &#123;</div>
                    <div className="code-line">  value       = aws_eks_cluster.cluster.name</div>
                    <div className="code-line">  description = "Kubernetesリソース側のroot moduleへ渡すクラスタ名"</div>
                    <div className="code-line">&#125;</div>
                </pre>
<p>
                    次に、そのクラスタ内でKubernetesリソースを管理する側です。クラスタは自分では作らず、<strong>data sourceで既存クラスタを参照</strong>して<code>provider "kubernetes"</code>を構成します。
                </p>
<pre className="code-block">
                    <div className="code-line"># root module B（例: live/eks-workloads）: kubernetes プロバイダーでクラスタ内リソースを管理する</div>
                    <div className="code-line">variable "cluster_name" &#123;</div>
                    <div className="code-line">  description = "root module A の cluster_name 出力（terraform_remote_state 等で受け取る）"</div>
                    <div className="code-line">  type        = string</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">data "aws_eks_cluster" "cluster" &#123;</div>
                    <div className="code-line">  name = var.cluster_name</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"># provider ブロックが参照する認証トークンの供給元</div>
                    <div className="code-line">data "aws_eks_cluster_auth" "cluster" &#123;</div>
                    <div className="code-line">  name = var.cluster_name</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">provider "kubernetes" &#123;</div>
                    <div className="code-line">  host                   = data.aws_eks_cluster.cluster.endpoint</div>
                    <div className="code-line">  cluster_ca_certificate = base64decode(data.aws_eks_cluster.cluster.certificate_authority[0].data)</div>
                    <div className="code-line">  token                  = data.aws_eks_cluster_auth.cluster.token</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "kubernetes_deployment" "example" &#123;</div>
                    <div className="code-line">  metadata &#123;</div>
                    <div className="code-line">    name = "example-app"</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  spec &#123;</div>
                    <div className="code-line">    replicas = 3</div>
                    <div className="code-line">    # selector と template は紙面の都合で省略している（どちらも必須ブロック）</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-note">
                    <div className="callout-icon">ℹ</div>
                    <div className="callout-body">
                        <p>
                            このスニペットは要点のみを抜き出した<strong>断片</strong>です。そのまま<code>apply</code>できる形にするには、<code>terraform</code>ブロックの<code>required_providers</code>で<code>hashicorp/aws</code>と<code>hashicorp/kubernetes</code>を宣言し、<code>kubernetes_deployment</code>の<code>spec</code>に必須の<code>selector</code>と<code>template</code>を補う必要があります。
                        </p>
                    </div>
                </div>
<div className="callout callout-practice">
                    <div className="callout-icon">✓</div>
                    <div className="callout-body">
                        <div className="callout-label">ベストプラクティス</div>
                        <p>
                            EKSクラスタ本体（<code>aws</code>プロバイダー管轄）と、その中で動くKubernetesリソース（<code>kubernetes</code>プロバイダー管轄）は、必ずroot
                            module／Stateを分離します。同一のapplyでクラスタを作りながら、そのクラスタの<code>endpoint</code>や<code>token</code>で<code>provider "kubernetes"</code>を構成すると、プロバイダー設定が「まだ存在しないリソースの属性」に依存することになり、初回<code>apply</code>や<code>plan</code>が失敗したり、クラスタの再作成時にプロバイダーの初期化ごと壊れてStateを手当てできなくなったりします。分離しておけば、クラスタ側の変更（バージョンアップ、ノードグループ変更）とアプリ側の変更（Deploymentの更新）を独立した変更頻度・責任分界点で回せます。
                        </p>
                    </div>
                </div>

        </section>
    );
}
