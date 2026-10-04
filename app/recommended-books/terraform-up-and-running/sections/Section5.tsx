// app/recommended-books/terraform-up-and-running/sections/Section5.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section5({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第5部原著第5章対応-ループ条件分岐デプロイ落とし穴">{' '}第5部（原著第5章対応）: ループ・条件分岐・デプロイ・落とし穴{' '}</h2>
<h3 id="5-15-4-ループの4パターン">5-1〜5-4. ループの4パターン</h3>
<p>{' '}Terraformには目的の異なる4種類のループ構文があります。使い分けを誤ると保守性が大きく下がるため、表で整理します。{' '}</p>
<div className="table-scroll">{' '}<table>
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
                    </table>{' '}</div>
<pre className="code-block">
                    <div className="code-line"><span className="hl-cm"># 以下の例が参照する入力変数。宣言がないと undeclared variable エラーになる</span></div>
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;names&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;for式で大文字化する名前のリスト&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-fn">list</span>(<span className="hl-type">string</span>)</div>
                    <div className="code-line">    <span className="hl-kw">default</span>     = [<span className="hl-str">&quot;neo&quot;</span>, <span className="hl-str">&quot;trinity&quot;</span>, <span className="hl-str">&quot;morpheus&quot;</span>]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;users&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;バケットポリシーへ展開するユーザー名のリスト&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-fn">list</span>(<span className="hl-type">string</span>)</div>
                    <div className="code-line">    <span className="hl-kw">default</span>     = [<span className="hl-str">&quot;neo&quot;</span>, <span className="hl-str">&quot;trinity&quot;</span>]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># count: 単純な複製（ただしリスト順序に依存し途中削除に弱い）</span></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_iam_user&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">count</span> = <span className="hl-num">3</span></div>
                    <div className="code-line">    <span className="hl-attr">name</span>  = <span className="hl-str">&quot;neo.$&#123;count.index&#125;&quot;</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># for_each: キーに基づく複製（推奨）。順序に依存しないため安全に増減できる</span></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_iam_user&quot;</span> <span className="hl-str">&quot;example2&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">for_each</span> = <span className="hl-fn">toset</span>([<span className="hl-str">&quot;neo&quot;</span>, <span className="hl-str">&quot;trinity&quot;</span>, <span className="hl-str">&quot;morpheus&quot;</span>])</div>
                    <div className="code-line">    <span className="hl-attr">name</span>     = <span className="hl-var">each.value</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># for式: 値の変換</span></div>
                    <div className="code-line"><span className="hl-kw">locals</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">upper_names</span> = [<span className="hl-kw">for</span> name <span className="hl-kw">in</span> <span className="hl-var">var.names</span> : <span className="hl-fn">upper</span>(name)]</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># for文字列ディレクティブ: テンプレート内でのループ</span></div>
                    <div className="code-line"><span className="hl-kw">locals</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">bucket_policy</span> = &lt;&lt;-EOF</div>
                    <div className="code-line">    %&#123; <span className="hl-kw">for</span> user <span className="hl-kw">in</span> <span className="hl-var">var.users</span> ~&#125;</div>
                    <div className="code-line">    Allow access <span className="hl-kw">for</span> $&#123;user&#125;</div>
                    <div className="code-line">    %&#123; endfor ~&#125;</div>
                    <div className="code-line">    EOF</div>
                    <div className="code-line">&#125;</div>
                </pre>
<div className="callout callout-practice">{' '}<div className="callout-icon">✓{' '}</div>{' '}<div className="callout-body">{' '}<div className="callout-label">ベストプラクティス{' '}</div>{' '}<p>{' '}<code>count</code>は「同じものをN個作る」だけの単純なケースに留め、要素の識別が必要な場合は<code>for_each</code>を優先する。<code>for_each</code>はキーで管理されるため、リストの途中の要素を削除しても他のリソースが不要に再作成されません。{' '}</p>{' '}</div>{' '}</div>
<h3 id="5-5-条件分岐">5-5. 条件分岐</h3>
<p>{' '}Terraformには<code>if</code>文はありませんが、三項演算子と<code>count</code>/<code>for_each</code>を組み合わせて条件付きリソース作成を表現します。{' '}</p>
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;enable_autoscaling&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;スケジュールベースのオートスケーリングを有効にするか&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-type">bool</span></div>
                    <div className="code-line">    <span className="hl-kw">default</span>     = <span className="hl-bool">false</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_autoscaling_schedule&quot;</span> <span className="hl-str">&quot;scale_out_during_business_hours&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">count</span> = <span className="hl-var">var.enable_autoscaling</span> ? <span className="hl-num">1</span> : <span className="hl-num">0</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-attr">scheduled_action_name</span> = <span className="hl-str">&quot;scale-out-during-business-hours&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">min_size</span>               = <span className="hl-num">2</span></div>
                    <div className="code-line">    <span className="hl-attr">max_size</span>               = <span className="hl-num">10</span></div>
                    <div className="code-line">    <span className="hl-attr">desired_capacity</span>       = <span className="hl-num">10</span></div>
                    <div className="code-line">    <span className="hl-attr">recurrence</span>             = <span className="hl-str">&quot;0 9 * * *&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">autoscaling_group_name</span> = aws_autoscaling_group.example.name</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="5-6-ゼロダウンタイムデプロイ">5-6. ゼロダウンタイムデプロイ</h3>
<p>{' '}<code>create_before_destroy</code>ライフサイクルルールは、Terraformの既定の「削除してから作成」を「作成してから削除」へ<strong>順序を入れ替える</strong>ものです。ただしこれ<strong>単体ではダウンタイムがなくなることは保証されません</strong>。Terraformはリソースの作成APIが完了した時点で次のステップへ進むだけで、新しいインスタンス上でアプリケーションが実際にリクエストを処理できる状態になったかどうかは判断しないためです。ヘルスチェックを待たずに旧リソースを破棄すれば、その隙間はそのままサービス断になります。{' '}</p>
<p>{' '}無停止に近づけるには、<code>create_before_destroy</code>に加えて次の3点を揃える必要があります。{' '}</p>
<ol type="1">{' '}<li>{' '}<strong>新旧のASGを同じロードバランサー（ターゲットグループ）に接続する。</strong>{' '}接続していなければ、そもそもトラフィックの引き継ぎ先が存在しません。{' '}</li>{' '}<li>{' '}<strong><code>min_elb_capacity</code>（ASG新規作成時）または<code>wait_for_elb_capacity</code>（既存ASGの容量変更時）で、指定台数がELBのヘルスチェックを通過するまでTerraformを待たせる。</strong>{' '}この待機がないと、健全なインスタンスが揃う前に旧ASGが破棄されます。{' '}</li>{' '}<li>{' '}<strong>既存ASGのインスタンス入れ替えは<code>instance_refresh</code>に任せ、その完了を明示的に確認する。</strong>{' '}<code>instance_refresh</code>は<code>apply</code>の完了後もAWS側で非同期に進むため、<strong><code>apply</code>が成功しても入れ替えが成功したとは限りません</strong>。CDパイプライン側でリフレッシュのステータス（<code>Successful</code>{' '}/{' '}<code>Failed</code>{' '}/{' '}<code>Cancelled</code>）をポーリングし、失敗・中断時は直前のLaunch Templateバージョンへ戻すロールバック手順まで用意して初めて運用に耐えます。{' '}</li>{' '}</ol>
<Diagram id="diag-9" ariaLabel="ASGとALBを用いたゼロダウンタイム（ローリング/ブルーグリーン）デプロイフロー" />
<pre className="code-block">
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_launch_template&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-cm"># ...</span></div>
                    <div className="code-line">    <span className="hl-kw">lifecycle</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">create_before_destroy</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-cm"># ASGが参照するターゲットグループ。この宣言がないと</span></div>
                    <div className="code-line"><span className="hl-cm"># aws_lb_target_group.asg は未定義参照となり terraform validate が失敗する</span></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_lb_target_group&quot;</span> <span className="hl-str">&quot;asg&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">name</span> = <span className="hl-str">&quot;terraform-asg-example&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-cm"># インスタンスが待ち受け、セキュリティグループが開放しているポートと一致させる。</span></div>
                    <div className="code-line">    <span className="hl-cm"># ここを 80 のままにするとヘルスチェックが通らず、min_elb_capacity の待機が</span></div>
                    <div className="code-line">    <span className="hl-cm"># タイムアウトして apply が失敗する</span></div>
                    <div className="code-line">    <span className="hl-attr">port</span>     = <span className="hl-num">8080</span></div>
                    <div className="code-line">    <span className="hl-attr">protocol</span> = <span className="hl-str">&quot;HTTP&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">vpc_id</span>   = <span className="hl-var">var.vpc_id</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    health_check &#123;</div>
                    <div className="code-line">        <span className="hl-attr">path</span>     = <span className="hl-str">&quot;/&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">protocol</span> = <span className="hl-str">&quot;HTTP&quot;</span></div>
                    <div className="code-line">        <span className="hl-attr">matcher</span>  = <span className="hl-str">&quot;200&quot;</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;vpc_id&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;ターゲットグループを作成するVPCのID&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-type">string</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">variable</span> <span className="hl-str">&quot;min_size&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">description</span> = <span className="hl-str">&quot;ASGの最小インスタンス数（min_elb_capacityの待機台数にも使う）&quot;</span></div>
                    <div className="code-line">    <span className="hl-attr">type</span>        = <span className="hl-type">number</span></div>
                    <div className="code-line">    <span className="hl-kw">default</span>     = <span className="hl-num">2</span></div>
                    <div className="code-line">&#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line"><span className="hl-kw">resource</span> <span className="hl-type">&quot;aws_autoscaling_group&quot;</span> <span className="hl-str">&quot;example&quot;</span> &#123;</div>
                    <div className="code-line">    <span className="hl-cm"># ...</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-cm"># 1. ロードバランサー（ターゲットグループ）へ接続し、健全性の判定もELBに委ねる</span></div>
                    <div className="code-line">    <span className="hl-attr">target_group_arns</span> = [aws_lb_target_group.asg.arn]</div>
                    <div className="code-line">    <span className="hl-attr">health_check_type</span> = <span className="hl-str">&quot;ELB&quot;</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-cm"># 2. 指定台数がELBのヘルスチェックを通過するまで apply を完了させない</span></div>
                    <div className="code-line">    <span className="hl-cm">#    min_elb_capacity は「作成時」しか待たないため、既存ASGの更新でも待つ</span></div>
                    <div className="code-line">    <span className="hl-cm">#    wait_for_elb_capacity を使う</span></div>
                    <div className="code-line">    <span className="hl-attr">wait_for_elb_capacity</span> = <span className="hl-var">var.min_size</span></div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-cm"># 3. 既存ASGのインスタンス入れ替えは instance_refresh に任せる</span></div>
                    <div className="code-line">    <span className="hl-cm">#    ただし apply 完了後もAWS側で非同期に進むため、</span></div>
                    <div className="code-line">    <span className="hl-cm">#    CD側で完了確認とロールバックを別途実装すること</span></div>
                    <div className="code-line">    instance_refresh &#123;</div>
                    <div className="code-line">        <span className="hl-attr">strategy</span> = <span className="hl-str">&quot;Rolling&quot;</span></div>
                    <div className="code-line">        preferences &#123;</div>
                    <div className="code-line">            <span className="hl-attr">min_healthy_percentage</span> = <span className="hl-num">100</span></div>
                    <div className="code-line">        &#125;</div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line"></div>
                    <div className="code-line">    <span className="hl-kw">lifecycle</span> &#123;</div>
                    <div className="code-line">        <span className="hl-attr">create_before_destroy</span> = <span className="hl-bool">true</span></div>
                    <div className="code-line">    &#125;</div>
                    <div className="code-line">&#125;</div>
                </pre>
<h3 id="5-7-terraformの落とし穴">5-7. Terraformの落とし穴</h3>
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
                                <td><code>count</code>/<code>for_each</code>の制約</td>
                                <td>{' '}値をリソースブロック内の計算結果に依存させられない場合がある（plan時に値が未確定だとエラー）{' '}</td>
                                <td>{' '}可能な限り<code>variable</code>など、plan前に確定する値をループ対象にする{' '}</td>
                            </tr>
                            <tr className="row-even">
                                <td>ゼロダウンタイムデプロイの限界</td>
                                <td>DBのようなステートフルなリソースには単純に適用できない</td>
                                <td>Blue/Greenやマイグレーション専用の仕組みを別途設計する</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Valid Plansが失敗することがある</td>
                                <td>{' '}<code>plan</code>が通っても、<code>apply</code>時にクラウド側の制約（クォータ等）でエラーになることがある{' '}</td>
                                <td>リトライ処理・クォータの事前申請・段階的apply</td>
                            </tr>
                            <tr className="row-even">
                                <td>リファクタリングの難しさ</td>
                                <td>{' '}リソース名の変更やモジュール構造の変更は、Terraform内部では「削除→再作成」と解釈されがち{' '}</td>
                                <td>{' '}<code>moved</code>ブロック（Terraform 1.1以降）や<code>terraform state mv</code>で安全に移行する{' '}</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<pre className="code-block">
                    <div className="code-line"><span className="hl-cm"># リソース名変更時の安全な移行(movedブロック)</span></div>
                    <div className="code-line"><span className="hl-kw">moved</span> &#123;</div>
                    <div className="code-line">    <span className="hl-attr">from</span> = aws_instance.old_name</div>
                    <div className="code-line">    <span className="hl-attr">to</span>   = aws_instance.new_name</div>
                    <div className="code-line">&#125;</div>
                </pre>

        </section>
    );
}
