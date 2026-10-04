// app/recommended-books/terraform-up-and-running/sections/Section5.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section5({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第5部原著第5章対応-ループ条件分岐デプロイ落とし穴">
                    第5部（原著第5章対応）: ループ・条件分岐・デプロイ・落とし穴
                </h2>
<h3 id="5-15-4-ループの4パターン">5-1〜5-4. ループの4パターン</h3>
<p>
                    Terraformには目的の異なる4種類のループ構文があります。使い分けを誤ると保守性が大きく下がるため、表で整理します。
                </p>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">構文</th>
                            <th scope="col">対象</th>
                            <th scope="col">特徴</th>
                            <th scope="col">典型的な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td><code>count</code></td>
                                <td>リソース／モジュール全体</td>
                                <td>インデックス番号(<code>count.index</code>)で複製</td>
                                <td>単純に同じものをN個作る</td>
                            </tr>
                            <tr className="row-even">
                                <td><code>for_each</code>（マップ/セット）</td>
                                <td>リソース／モジュール全体</td>
                                <td>各要素にキー文字列が付き、途中の要素削除に強い</td>
                                <td>名前付きの複数リソースを作る</td>
                            </tr>
                            <tr className="row-odd">
                                <td><code>for</code>式</td>
                                <td>リスト・マップの変換</td>
                                <td>値の変換・フィルタリングのみ、リソースは複製しない</td>
                                <td>変数の加工、出力値の整形</td>
                            </tr>
                            <tr className="row-even">
                                <td><code>for</code>文字列ディレクティブ</td>
                                <td>テンプレート文字列内</td>
                                <td>文字列の中でループを展開</td>
                                <td><code>user_data</code>スクリプト等の動的生成</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<pre className="code-block">
                    <div className="code-line"># 以下の例が参照する入力変数。宣言がないと undeclared variable エラーになる</div>
                    <div className="code-line">variable "names" &#123;</div>
                    <div className="code-line">  description = "for式で大文字化する名前のリスト"</div>
                    <div className="code-line">  type        = list(string)</div>
                    <div className="code-line">  default     = ["neo", "trinity", "morpheus"]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">variable "users" &#123;</div>
                    <div className="code-line">  description = "バケットポリシーへ展開するユーザー名のリスト"</div>
                    <div className="code-line">  type        = list(string)</div>
                    <div className="code-line">  default     = ["neo", "trinity"]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"># count: 単純な複製（ただしリスト順序に依存し途中削除に弱い）</div>
                    <div className="code-line">resource "aws_iam_user" "example" &#123;</div>
                    <div className="code-line">  count = 3</div>
                    <div className="code-line">  name  = "neo.$&#123;count.index&#125;"</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"># for_each: キーに基づく複製（推奨）。順序に依存しないため安全に増減できる</div>
                    <div className="code-line">resource "aws_iam_user" "example2" &#123;</div>
                    <div className="code-line">  for_each = toset(["neo", "trinity", "morpheus"])</div>
                    <div className="code-line">  name     = each.value</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"># for式: 値の変換</div>
                    <div className="code-line">locals &#123;</div>
                    <div className="code-line">  upper_names = [for name in var.names : upper(name)]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"># for文字列ディレクティブ: テンプレート内でのループ</div>
                    <div className="code-line">locals &#123;</div>
                    <div className="code-line">  bucket_policy = &lt;&lt;-EOF</div>
                    <div className="code-line">  %&#123; for user in var.users ~&#125;</div>
                    <div className="code-line">  Allow access for $&#123;user&#125;</div>
                    <div className="code-line">  %&#123; endfor ~&#125;</div>
                    <div className="code-line">  EOF</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-practice">
                    <div className="callout-icon">✓</div>
                    <div className="callout-body">
                        <div className="callout-label">ベストプラクティス</div>
                        <p>
                            <code>count</code>は「同じものをN個作る」だけの単純なケースに留め、要素の識別が必要な場合は<code>for_each</code>を優先する。<code>for_each</code>はキーで管理されるため、リストの途中の要素を削除しても他のリソースが不要に再作成されません。
                        </p>
                    </div>
                </div>
<h3 id="5-5-条件分岐">5-5. 条件分岐</h3>
<p>
                    Terraformには<code>if</code>文はありませんが、三項演算子と<code>count</code>/<code>for_each</code>を組み合わせて条件付きリソース作成を表現します。
                </p>
<pre className="code-block">
                    <div className="code-line">variable "enable_autoscaling" &#123;</div>
                    <div className="code-line">  description = "スケジュールベースのオートスケーリングを有効にするか"</div>
                    <div className="code-line">  type        = bool</div>
                    <div className="code-line">  default     = false</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_autoscaling_schedule" "scale_out_during_business_hours" &#123;</div>
                    <div className="code-line">  count = var.enable_autoscaling ? 1 : 0</div>
                    <div className="code-line"></div>
                    <div className="code-line">  scheduled_action_name = "scale-out-during-business-hours"</div>
                    <div className="code-line">  min_size               = 2</div>
                    <div className="code-line">  max_size               = 10</div>
                    <div className="code-line">  desired_capacity       = 10</div>
                    <div className="code-line">  recurrence             = "0 9 * * *"</div>
                    <div className="code-line">  autoscaling_group_name = aws_autoscaling_group.example.name</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="5-6-ゼロダウンタイムデプロイ">5-6. ゼロダウンタイムデプロイ</h3>
<p>
                    <code>create_before_destroy</code>ライフサイクルルールは、Terraformの既定の「削除してから作成」を「作成してから削除」へ<strong>順序を入れ替える</strong>ものです。ただしこれ<strong>単体ではダウンタイムがなくなることは保証されません</strong>。Terraformはリソースの作成APIが完了した時点で次のステップへ進むだけで、新しいインスタンス上でアプリケーションが実際にリクエストを処理できる状態になったかどうかは判断しないためです。ヘルスチェックを待たずに旧リソースを破棄すれば、その隙間はそのままサービス断になります。
                </p>
<p>
                    無停止に近づけるには、<code>create_before_destroy</code>に加えて次の3点を揃える必要があります。
                </p>
<ol type="1">
                    <li>
                        <strong>新旧のASGを同じロードバランサー（ターゲットグループ）に接続する。</strong>
                        接続していなければ、そもそもトラフィックの引き継ぎ先が存在しません。
                    </li>
                    <li>
                        <strong><code>min_elb_capacity</code>（ASG新規作成時）または<code>wait_for_elb_capacity</code>（既存ASGの容量変更時）で、指定台数がELBのヘルスチェックを通過するまでTerraformを待たせる。</strong>
                        この待機がないと、健全なインスタンスが揃う前に旧ASGが破棄されます。
                    </li>
                    <li>
                        <strong>既存ASGのインスタンス入れ替えは<code>instance_refresh</code>に任せ、その完了を明示的に確認する。</strong>
                        <code>instance_refresh</code>は<code>apply</code>の完了後もAWS側で非同期に進むため、<strong><code>apply</code>が成功しても入れ替えが成功したとは限りません</strong>。CDパイプライン側でリフレッシュのステータス（<code>Successful</code> /
                        <code>Failed</code> /
                        <code>Cancelled</code>）をポーリングし、失敗・中断時は直前のLaunch
                        Templateバージョンへ戻すロールバック手順まで用意して初めて運用に耐えます。
                    </li>
                </ol>
<Diagram id="diag-9" ariaLabel="ASGとALBを用いたゼロダウンタイム（ローリング/ブルーグリーン）デプロイフロー" />
<pre className="code-block">
                    <div className="code-line">resource "aws_launch_template" "example" &#123;</div>
                    <div className="code-line">  # ...</div>
                    <div className="code-line">  lifecycle &#123;</div>
                    <div className="code-line">    create_before_destroy = true</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"># ASGが参照するターゲットグループ。この宣言がないと</div>
                    <div className="code-line"># aws_lb_target_group.asg は未定義参照となり terraform validate が失敗する</div>
                    <div className="code-line">resource "aws_lb_target_group" "asg" &#123;</div>
                    <div className="code-line">  name = "terraform-asg-example"</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # インスタンスが待ち受け、セキュリティグループが開放しているポートと一致させる。</div>
                    <div className="code-line">  # ここを 80 のままにするとヘルスチェックが通らず、min_elb_capacity の待機が</div>
                    <div className="code-line">  # タイムアウトして apply が失敗する</div>
                    <div className="code-line">  port     = 8080</div>
                    <div className="code-line">  protocol = "HTTP"</div>
                    <div className="code-line">  vpc_id   = var.vpc_id</div>
                    <div className="code-line"></div>
                    <div className="code-line">  health_check &#123;</div>
                    <div className="code-line">    path     = "/"</div>
                    <div className="code-line">    protocol = "HTTP"</div>
                    <div className="code-line">    matcher  = "200"</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">variable "vpc_id" &#123;</div>
                    <div className="code-line">  description = "ターゲットグループを作成するVPCのID"</div>
                    <div className="code-line">  type        = string</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">variable "min_size" &#123;</div>
                    <div className="code-line">  description = "ASGの最小インスタンス数（min_elb_capacityの待機台数にも使う）"</div>
                    <div className="code-line">  type        = number</div>
                    <div className="code-line">  default     = 2</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">resource "aws_autoscaling_group" "example" &#123;</div>
                    <div className="code-line">  # ...</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # 1. ロードバランサー（ターゲットグループ）へ接続し、健全性の判定もELBに委ねる</div>
                    <div className="code-line">  target_group_arns = [aws_lb_target_group.asg.arn]</div>
                    <div className="code-line">  health_check_type = "ELB"</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # 2. 指定台数がELBのヘルスチェックを通過するまで apply を完了させない</div>
                    <div className="code-line">  #    min_elb_capacity は「作成時」しか待たないため、既存ASGの更新でも待つ</div>
                    <div className="code-line">  #    wait_for_elb_capacity を使う</div>
                    <div className="code-line">  wait_for_elb_capacity = var.min_size</div>
                    <div className="code-line"></div>
                    <div className="code-line">  # 3. 既存ASGのインスタンス入れ替えは instance_refresh に任せる</div>
                    <div className="code-line">  #    ただし apply 完了後もAWS側で非同期に進むため、</div>
                    <div className="code-line">  #    CD側で完了確認とロールバックを別途実装すること</div>
                    <div className="code-line">  instance_refresh &#123;</div>
                    <div className="code-line">    strategy = "Rolling"</div>
                    <div className="code-line">    preferences &#123;</div>
                    <div className="code-line">      min_healthy_percentage = 100</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">  lifecycle &#123;</div>
                    <div className="code-line">    create_before_destroy = true</div>
                    <div className="code-line">  &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="5-7-terraformの落とし穴">5-7. Terraformの落とし穴</h3>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">落とし穴</th>
                            <th scope="col">内容</th>
                            <th scope="col">対処</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td><code>count</code>/<code>for_each</code>の制約</td>
                                <td>
                                    値をリソースブロック内の計算結果に依存させられない場合がある（plan時に値が未確定だとエラー）
                                </td>
                                <td>
                                    可能な限り<code>variable</code>など、plan前に確定する値をループ対象にする
                                </td>
                            </tr>
                            <tr className="row-even">
                                <td>ゼロダウンタイムデプロイの限界</td>
                                <td>DBのようなステートフルなリソースには単純に適用できない</td>
                                <td>Blue/Greenやマイグレーション専用の仕組みを別途設計する</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Valid Plansが失敗することがある</td>
                                <td>
                                    <code>plan</code>が通っても、<code>apply</code>時にクラウド側の制約（クォータ等）でエラーになることがある
                                </td>
                                <td>リトライ処理・クォータの事前申請・段階的apply</td>
                            </tr>
                            <tr className="row-even">
                                <td>リファクタリングの難しさ</td>
                                <td>
                                    リソース名の変更やモジュール構造の変更は、Terraform内部では「削除→再作成」と解釈されがち
                                </td>
                                <td>
                                    <code>moved</code>ブロック（Terraform 1.1以降）や<code>terraform state mv</code>で安全に移行する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<pre className="code-block">
                    <div className="code-line"># リソース名変更時の安全な移行(movedブロック)</div>
                    <div className="code-line">moved &#123;</div>
                    <div className="code-line">  from = aws_instance.old_name</div>
                    <div className="code-line">  to   = aws_instance.new_name</div>
                    <div className="code-line">&#125;</div>
                </pre>

        </section>
    );
}
