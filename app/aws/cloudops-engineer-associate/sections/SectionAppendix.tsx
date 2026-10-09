

/**
 * SectionAppendix
 */
export default function SectionAppendix() {
    return (
        <>
<h1 id="s-h1-6">付録</h1>
<h2 id="s-h2-16">付録 A. 頻出トラップ早見表(「これを見たらこう答える」)</h2>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">設問のキーワード</th>
<th scope="col">答え・考え方</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>EC2 の <strong>メモリ / ディスク使用率</strong> を監視したい</td>
<td><strong>CloudWatch エージェント</strong>(標準メトリクスにない)</td>
</tr>
<tr>
<td>2</td>
<td><strong>90 日より前</strong> の API 操作を調べたい</td>
<td>CloudTrail の <strong>証跡(S3)/ CloudTrail Lake</strong></td>
</tr>
<tr>
<td>3</td>
<td>複数アラームの AND 条件で通知したい</td>
<td><strong>複合アラーム</strong>(EC2 / Auto Scaling アクションは持てない)</td>
</tr>
<tr>
<td>4</td>
<td>アラームで <strong>EC2 を自動復旧</strong></td>
<td><code>StatusCheckFailed_System</code> の <strong>recover アクション</strong></td>
</tr>
<tr>
<td>5</td>
<td>CloudWatch アラームが SNS に届かない(暗号化トピック)</td>
<td><strong>カスタマー管理キー</strong> + キーポリシーで <code>cloudwatch.amazonaws.com</code> を許可</td>
</tr>
<tr>
<td>6</td>
<td>EventBridge ルールが動かない</td>
<td><strong>パターン不一致 / バス・リージョン違い / ターゲット権限</strong></td>
</tr>
<tr>
<td>7</td>
<td><strong>gp2 → コスト削減 + 性能</strong></td>
<td><strong>gp3</strong> へ(稼働中に Elastic Volumes で変更可)</td>
</tr>
<tr>
<td>8</td>
<td><strong>大きなファイルを速く / 確実に</strong> S3 へ</td>
<td><strong>マルチパートアップロード</strong></td>
</tr>
<tr>
<td>9</td>
<td>遠隔地から S3 への転送が遅い</td>
<td><strong>S3 Transfer Acceleration</strong></td>
</tr>
<tr>
<td>10</td>
<td>未完了のマルチパートがコストを増やす</td>
<td>ライフサイクルで <strong>未完了アップロードの中止</strong></td>
</tr>
<tr>
<td>11</td>
<td>Lambda → RDS で <strong>接続数が急増</strong></td>
<td><strong>RDS Proxy</strong></td>
</tr>
<tr>
<td>12</td>
<td>低レイテンシ HPC の EC2 配置</td>
<td><strong>クラスタープレイスメントグループ</strong></td>
</tr>
<tr>
<td>13</td>
<td>少数の重要インスタンスを別ハードウェアに</td>
<td><strong>スプレッドプレイスメントグループ</strong>(AZ あたり最大 7)</td>
</tr>
<tr>
<td>14</td>
<td>負荷が <strong>周期的に予測できる</strong></td>
<td><strong>スケジュール / 予測スケーリング</strong></td>
</tr>
<tr>
<td>15</td>
<td>最も簡単な Auto Scaling ポリシー</td>
<td><strong>ターゲット追跡</strong></td>
</tr>
<tr>
<td>16</td>
<td>アプリ障害でもインスタンスを置換したい</td>
<td>ASG の <strong>ELB ヘルスチェック</strong> を有効化</td>
</tr>
<tr>
<td>17</td>
<td>ALB の <strong>503</strong></td>
<td><strong>正常なターゲットがない</strong></td>
</tr>
<tr>
<td>18</td>
<td>ALB の <strong>504</strong></td>
<td><strong>ターゲットの応答がタイムアウト</strong></td>
</tr>
<tr>
<td>19</td>
<td>RDS の <strong>可用性</strong> vs <strong>読み取り性能</strong></td>
<td>Multi-AZ vs リードレプリカ</td>
</tr>
<tr>
<td>20</td>
<td>RDS の PITR / スナップショット復元</td>
<td><strong>新しいインスタンス</strong> が作られる(エンドポイントが変わる)</td>
</tr>
<tr>
<td>21</td>
<td>誤削除・論理破損からの復旧</td>
<td><strong>PITR / スナップショット</strong>(Multi-AZ は効かない)</td>
</tr>
<tr>
<td>22</td>
<td>RPO / RTO</td>
<td>RPO = <strong>データ損失の許容時点</strong>、RTO = <strong>復旧時間</strong></td>
</tr>
<tr>
<td>23</td>
<td>コスト最優先の DR</td>
<td><strong>バックアップとリストア</strong></td>
</tr>
<tr>
<td>24</td>
<td>データ層だけ常時稼働の DR</td>
<td><strong>パイロットライト</strong></td>
</tr>
<tr>
<td>25</td>
<td>縮小版が常時稼働の DR</td>
<td><strong>ウォームスタンバイ</strong></td>
</tr>
<tr>
<td>26</td>
<td>全アカウント・リージョンに <strong>同じ構成</strong> をデプロイ</td>
<td><strong>CloudFormation StackSets</strong></td>
</tr>
<tr>
<td>27</td>
<td>1 つのリソース(サブネット等)を <strong>共有</strong></td>
<td><strong>AWS RAM</strong></td>
</tr>
<tr>
<td>28</td>
<td>CloudFormation を適用前にプレビュー</td>
<td><strong>変更セット</strong></td>
</tr>
<tr>
<td>29</td>
<td><code>UPDATE_ROLLBACK_FAILED</code></td>
<td>原因を直して <strong>更新のロールバックを続行</strong></td>
</tr>
<tr>
<td>30</td>
<td>IAM リソースを含むテンプレートのエラー</td>
<td><strong><code>CAPABILITY_IAM</code></strong> の承認</td>
</tr>
<tr>
<td>31</td>
<td>サブネットの利用可能 IP 数</td>
<td><strong>(総数 − 5)</strong>。<code>/28</code> が最小</td>
</tr>
<tr>
<td>32</td>
<td>SSH を開けずにサーバーに接続</td>
<td><strong>Session Manager</strong></td>
</tr>
<tr>
<td>33</td>
<td>SSM の管理対象にならない</td>
<td><strong>エージェント / IAM ロール / ネットワーク経路(エンドポイント)</strong></td>
</tr>
<tr>
<td>34</td>
<td>暗黙の拒否 / 明示的 Deny</td>
<td><strong>明示的 Deny が常に優先</strong></td>
</tr>
<tr>
<td>35</td>
<td>SCP の効果</td>
<td><strong>権限の上限(付与はしない)</strong>。<strong>管理アカウントには適用されない</strong></td>
</tr>
<tr>
<td>36</td>
<td>特定リージョンのみ許可</td>
<td><strong>SCP + <code>aws:RequestedRegion</code></strong></td>
</tr>
<tr>
<td>37</td>
<td>既存の <strong>非暗号化 RDS / EBS</strong> を暗号化</td>
<td><strong>スナップショット → 暗号化コピー → 復元</strong></td>
</tr>
<tr>
<td>38</td>
<td>CloudFront 用の ACM 証明書</td>
<td><strong><code>us-east-1</code></strong></td>
</tr>
<tr>
<td>39</td>
<td>シークレットの <strong>自動ローテーション</strong></td>
<td><strong>Secrets Manager</strong></td>
</tr>
<tr>
<td>40</td>
<td>コストを抑えた設定値の保管</td>
<td><strong>Parameter Store(標準)</strong></td>
</tr>
<tr>
<td>41</td>
<td>脅威検出 / 脆弱性スキャン / 構成の準拠 / 集約</td>
<td><strong>GuardDuty / Inspector / Config / Security Hub</strong></td>
</tr>
<tr>
<td>42</td>
<td>S3・DynamoDB へのプライベートアクセス</td>
<td><strong>ゲートウェイエンドポイント(無料)</strong></td>
</tr>
<tr>
<td>43</td>
<td>VPC ピアリング</td>
<td><strong>推移的ではない</strong>。<strong>CIDR 重複不可</strong>。<strong>両側にルート</strong></td>
</tr>
<tr>
<td>44</td>
<td>多数の VPC を接続</td>
<td><strong>Transit Gateway</strong></td>
</tr>
<tr>
<td>45</td>
<td>SG / NACL</td>
<td><strong>ステートフル / ステートレス</strong></td>
</tr>
<tr>
<td>46</td>
<td><code>example.com</code>(頂点)を ALB に向ける</td>
<td><strong>エイリアスレコード</strong></td>
</tr>
<tr>
<td>47</td>
<td>固定 IP・非 HTTP の高速化</td>
<td><strong>Global Accelerator</strong></td>
</tr>
<tr>
<td>48</td>
<td>キャッシュを効かせたい</td>
<td><strong>CloudFront</strong>(キャッシュキーを最小化)</td>
</tr>
<tr>
<td>49</td>
<td>フローログ:インバウンド ACCEPT、戻りが REJECT</td>
<td><strong>NACL の復路許可漏れ</strong></td>
</tr>
<tr>
<td>50</td>
<td>ハイブリッド回線の劣化を事前検知</td>
<td><strong>Network Synthetic Monitor</strong></td>
</tr>
<tr>
<td>51</td>
<td>地域 / ISP 別のユーザー体験の悪化</td>
<td><strong>Internet Monitor</strong></td>
</tr>
<tr>
<td>52</td>
<td>NAT のコストを削減</td>
<td><strong>ゲートウェイ / インターフェイスエンドポイント</strong> で NAT を経由しない</td>
</tr>
</tbody>
</table></div>
<h2 id="s-h2-17">付録 B. 練習問題(選択問題 + 解説)</h2>
<blockquote>
<p>本番に近い形式です。まず自分で考えてから解説を読みましょう。</p>
</blockquote>
<h3 id="s-h3-62">問題 1(Domain 1)</h3>
<p>EC2 インスタンス上のアプリケーションが、メモリ使用率が 90% を超えたときに運用チームへメール通知したい。<strong>最も運用負荷が低い</strong> 方法はどれか。</p>
<p>A. CloudWatch の標準メトリクス <code>MemoryUtilization</code> にアラームを設定する<br />{" "}

B. CloudWatch エージェントをインストールしてメモリメトリクスを収集し、そのメトリクスのアラームから SNS 通知を送る<br />{" "}

C. CloudTrail でメモリ使用量のイベントを検索する<br />{" "}

D. Lambda で毎分 EC2 に SSH 接続してメモリを確認する</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。EC2 のメモリ使用率は標準メトリクスに含まれません(A は不正)。CloudWatch エージェントで収集し、アラーム → SNS で通知するのが標準的です。C は監査ログで用途が違い、D は運用負荷が高い方法です。(Skill 1.1.2、1.1.3、1.1.5)</p>
</details>
<h3 id="s-h3-63">問題 2(Domain 1)</h3>
<p>複数のアラームがそれぞれ頻繁に鳴り、運用チームが通知の洪水に悩んでいる。「CPU が高い <strong>かつ</strong> レイテンシが高い」ときだけ通知したい。どうすべきか。</p>
<p>A. 各アラームの期間を長くする<br />{" "}

B. 複合アラームで AND 条件を設定する<br />{" "}

C. SNS のフィルターポリシーを設定する<br />{" "}

D. 各アラームを無効にする</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。複合アラームは複数のアラームを AND / OR / NOT で組み合わせてノイズを減らす機能です。(Skill 1.1.3)</p>
</details>
<h3 id="s-h3-64">問題 3(Domain 1)</h3>
<p>EventBridge ルールを作成したが、ターゲットの Lambda 関数が呼び出されない。確認すべき事項として <strong>適切なものを 2 つ</strong> 選べ。</p>
<p>A. イベントパターンが実際のイベントと一致しているか<br />{" "}

B. Lambda 関数のリソースベースポリシーで EventBridge からの呼び出しが許可されているか<br />{" "}

C. Lambda 関数のメモリ設定が 128 MB か<br />{" "}

D. VPC のネットワーク ACL<br />{" "}

E. CloudTrail のログファイル検証</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: A、B</strong>。パターン不一致と、ターゲット側の呼び出し権限が代表的な原因です。(Skill 1.2.2)</p>
</details>
<h3 id="s-h3-65">問題 4(Domain 1)</h3>
<p>gp2 の EBS ボリュームで、<code>BurstBalance</code> が 0 になり性能が低下した。<strong>コストを抑えつつ</strong> 恒常的に高い性能を確保するには。</p>
<p>A. 容量を減らす<br />{" "}

B. gp3 に変更して必要な IOPS を設定する<br />{" "}

C. sc1 に変更する<br />{" "}

D. インスタンスストアに移行する(永続データも保存する)</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。gp3 は基準の IOPS / スループットが容量と独立しており、gp2 のバーストクレジットに依存せず、一般に安価です。Elastic Volumes で稼働中に変更できます。(Skill 1.3.2)</p>
</details>
<h3 id="s-h3-66">問題 5(Domain 1)</h3>
<p>Lambda 関数から RDS for MySQL に接続しているが、同時実行が増えると「Too many connections」エラーが発生する。<strong>最も適切な対策</strong> は。</p>
<p>A. RDS のインスタンスクラスを必ず下げる<br />{" "}

B. RDS Proxy を導入して接続をプールする<br />{" "}

C. リードレプリカを追加する<br />{" "}

D. Lambda のタイムアウトを延ばす</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。短命な接続が多数発生する場合は RDS Proxy で接続を集約します。(Skill 1.3.5)</p>
</details>
<h3 id="s-h3-67">問題 6(Domain 2)</h3>
<p>Web アプリの負荷が毎日ほぼ同じ時間帯(平日 9 時)に急増する。<strong>ユーザーが待たされないように</strong> 事前に台数を増やしたい。</p>
<p>A. ステップスケーリング<br />{" "}

B. スケジュールスケーリング(または予測スケーリング)<br />{" "}

C. シンプルスケーリング<br />{" "}

D. 手動で台数を変更</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。予測可能な負荷には、事前に増やすスケジュール / 予測スケーリングが適切です。(Skill 2.1.1)</p>
</details>
<h3 id="s-h3-68">問題 7(Domain 2)</h3>
<p>ALB の背後のインスタンスで、アクセスログの <code>elb_status_code</code> が 504 を返している。<strong>最初に確認すべき</strong> のは。</p>
<p>A. ターゲットの応答時間とアイドルタイムアウト(既定 60 秒)の関係、およびターゲットの負荷<br />{" "}

B. S3 バケットのバージョニング<br />{" "}

C. Route 53 のレイテンシーポリシー<br />{" "}

D. KMS キーのローテーション</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: A</strong>。504 はターゲットの応答がタイムアウトしたことを示します。処理時間とアイドルタイムアウト、ターゲットの負荷や疎通(SG / NACL)を確認します。(Skill 2.2.1)</p>
</details>
<h3 id="s-h3-69">問題 8(Domain 2)</h3>
<p>RDS で誤って重要なテーブルを削除してしまった。削除の <strong>数分前の状態</strong> に戻したい。Multi-AZ 構成である。</p>
<p>A. スタンバイにフェイルオーバーする<br />{" "}

B. ポイントインタイムリストアで削除直前の時点に新しいインスタンスとして復元する<br />{" "}

C. リードレプリカを昇格する(レプリカは削除済みのデータを持っている)<br />{" "}

D. 何もしなくても自動で戻る</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。Multi-AZ は同期レプリケーションのため削除もスタンバイに反映されます。PITR で新しいインスタンスとして復元し、必要なデータを戻します。(Skill 2.3.2)</p>
</details>
<h3 id="s-h3-70">問題 9(Domain 2)</h3>
<p>RTO が数分、RPO がほぼゼロで、コストは許容される。最も適した DR 戦略は。</p>
<p>A. バックアップとリストア<br />{" "}

B. パイロットライト<br />{" "}

C. ウォームスタンバイ<br />{" "}

D. マルチサイト(アクティブ / アクティブ)</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: D</strong>(要件がほぼ無停止・ほぼデータ損失なしの場合)。数分の RTO を許容できて、コストを抑えたい場合はウォームスタンバイも候補ですが、「RPO がほぼゼロ、コストは許容」の条件ではアクティブ / アクティブが最も近いです。(Skill 2.3.4)</p>
</details>
<h3 id="s-h3-71">問題 10(Domain 3)</h3>
<p>全アカウント(新規作成分を含む)に同じ IAM ロールと Config ルールを自動的に展開したい。</p>
<p>A. 各アカウントでスタックを手動作成<br />{" "}

B. サービスマネージド型アクセス許可の CloudFormation StackSets(自動デプロイ有効)<br />{" "}

C. AWS RAM でロールを共有<br />{" "}

D. Lambda で毎日全アカウントにログイン</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。StackSets のサービスマネージド型は Organizations と統合され、新規アカウントへ自動デプロイできます。RAM は IAM ロールの共有には使えません。(Skill 3.1.4)</p>
</details>
<h3 id="s-h3-72">問題 11(Domain 3)</h3>
<p>CloudFormation スタックの作成が <code>CREATE_FAILED</code> で失敗した。トラブルシュートで <strong>最初に</strong> すべきことは。</p>
<p>A. スタックを削除して、再試行する<br />{" "}

B. スタックイベントを確認し、最初に失敗したリソースとその理由を特定する<br />{" "}

C. リージョンを変更する<br />{" "}

D. 管理者ユーザーに切り替える</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。後続の失敗は連鎖の結果であることが多く、最初の失敗の理由を確認するのが基本です。(Skill 3.1.3)</p>
</details>
<h3 id="s-h3-73">問題 12(Domain 3)</h3>
<p>プライベートサブネットの EC2 を、SSH ポートを開けずに管理し、<strong>操作ログも残したい</strong>。</p>
<p>A. 踏み台サーバーを置く<br />{" "}

B. Systems Manager Session Manager を使う<br />{" "}

C. SG で 22 番を 0.0.0.0/0 に開放する<br />{" "}

D. EC2 Instance Connect Endpoint のみを使う(ログ要件は無視)</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。Session Manager は SSH ポート不要で、操作ログを S3 / CloudWatch Logs に記録できます。管理対象になるには、エージェント、IAM ロール、ネットワーク経路(NAT または VPC エンドポイント)が必要です。(Skill 3.2.1)</p>
</details>
<h3 id="s-h3-74">問題 13(Domain 4)</h3>
<p>S3 バケットのオブジェクトを読み取れない。ユーザーの IAM ポリシーには <code>s3:GetObject</code> が許可されている。オブジェクトは SSE-KMS(カスタマー管理キー)で暗号化されている。<strong>考えられる原因は</strong>。</p>
<p>A. KMS キーポリシー / 権限に <code>kms:Decrypt</code> の許可がない<br />{" "}

B. S3 のバージョニングが有効<br />{" "}

C. バケットが複数 AZ に保存されている<br />{" "}

D. Route 53 のヘルスチェックの失敗</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: A</strong>。SSE-KMS のオブジェクトを読むには KMS の復号権限も必要です。(Skill 4.2.2、4.1.2)</p>
</details>
<h3 id="s-h3-75">問題 14(Domain 4)</h3>
<p>Organizations の SCP について <strong>正しいもの</strong> はどれか。</p>
<p>A. SCP でサービスを許可すれば、IAM ポリシーがなくてもアクセスできる<br />{" "}

B. SCP は管理アカウントにも適用される<br />{" "}

C. SCP は権限の上限を定めるものであり、権限を付与するものではない<br />{" "}

D. SCP はサービスリンクロールにも適用される</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: C</strong>。SCP はガードレールで、付与は IAM で行います。管理アカウントとサービスリンクロールには影響しません。(Skill 4.1.3)</p>
</details>
<h3 id="s-h3-76">問題 15(Domain 4)</h3>
<p>データベースの認証情報を <strong>自動でローテーション</strong> し、アプリが常に最新の認証情報を取得できるようにしたい。</p>
<p>A. Parameter Store の標準パラメータ<br />{" "}

B. AWS Secrets Manager<br />{" "}

C. EC2 の環境変数<br />{" "}

D. S3 バケットのテキストファイル</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。ネイティブのローテーション機能を持つのは Secrets Manager です。(Skill 4.2.4)</p>
</details>
<h3 id="s-h3-77">問題 16(Domain 5)</h3>
<p>プライベートサブネットの EC2 が S3 から大量にデータを取得しており、NAT ゲートウェイのデータ処理料金が高い。<strong>最も費用対効果の高い対策</strong> は。</p>
<p>A. NAT ゲートウェイを大きなタイプにする<br />{" "}

B. S3 用のゲートウェイ VPC エンドポイントを作成する<br />{" "}

C. NAT ゲートウェイを増やす<br />{" "}

D. インターフェイスエンドポイントのみを作成する</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。S3 のゲートウェイエンドポイントは無料で、NAT を経由しないためデータ処理料金を削減できます。(Skill 5.1.2、5.1.4)</p>
</details>
<h3 id="s-h3-78">問題 17(Domain 5)</h3>
<p>VPC フローログで、あるサーバー宛ての TCP 443 が ACCEPT されているのに、そのサーバーからの戻りのパケット(エフェメラルポート宛て)が REJECT されている。<strong>原因として最も可能性が高い</strong> のは。</p>
<p>A. セキュリティグループのインバウンドルール不足<br />{" "}

B. ネットワーク ACL のアウトバウンド(復路)ルール不足<br />{" "}

C. Route 53 のヘルスチェック<br />{" "}

D. IGW の障害</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。SG はステートフルなので戻りは自動許可されます。復路が REJECT なら、ステートレスな NACL の許可漏れが疑われます。(Skill 5.1.1、5.3.2)</p>
</details>
<h3 id="s-h3-79">問題 18(Domain 5)</h3>
<p>CloudFront で配信するサイトに HTTPS を適用するため、ACM で証明書を発行したい。<strong>どのリージョン</strong> で発行すべきか。</p>
<p>A. ディストリビューションの利用者に最も近いリージョン<br />{" "}

B. 米国東部(バージニア北部)<code>us-east-1</code><br />{" "}

C. オリジン(ALB)と同じリージョン<br />{" "}

D. どのリージョンでもよい</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。CloudFront で使う ACM 証明書は us-east-1 で作成する必要があります。(Skill 4.2.3)</p>
</details>
<h3 id="s-h3-80">問題 19(Domain 5)</h3>
<p>Site-to-Site VPN の両方のトンネルが <code>UP</code> だが、オンプレミスから VPC 内のインスタンスにアクセスできない。確認すべきこととして <strong>適切なものを 2 つ</strong> 選べ。</p>
<p>A. VPC のルートテーブルにオンプレミス CIDR 向けのルート(またはルート伝播)があるか<br />{" "}

B. セキュリティグループ / NACL がオンプレミスの CIDR からの通信を許可しているか<br />{" "}

C. EBS ボリュームタイプ<br />{" "}

D. S3 のライフサイクルルール<br />{" "}

E. CloudFront のキャッシュ TTL</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: A、B</strong>。トンネルが UP ならネゴシエーションは成功しています。次にルーティングと SG / NACL を確認します。(Skill 5.3.4)</p>
</details>
<h3 id="s-h3-81">問題 20(Domain 5)</h3>
<p>Direct Connect と Site-to-Site VPN を使うハイブリッド環境で、<strong>回線のパケットロスとレイテンシの劣化を継続的に監視</strong> したい。エージェントのインストールは避けたい。</p>
<p>A. CloudWatch Internet Monitor<br />{" "}

B. CloudWatch Network Synthetic Monitor<br />{" "}

C. VPC フローログのみ<br />{" "}

D. AWS Config</p>
<details>
<summary>解答と解説</summary>
<p><strong>正解: B</strong>。Network Synthetic Monitor は、VPC のサブネットからオンプレミスの宛先へプローブを送るアクティブ監視で、エージェント不要です。(Skill 5.3.5)</p>
</details>
<h2 id="s-h2-18">付録 C. サービス比較チートシート</h2>
<h3 id="s-h3-82">C-1. 監視・ログ・監査</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">一言</th>
</tr>
</thead>
<tbody>
<tr>
<td>CloudWatch</td>
<td>メトリクス・ログ・アラームの性能監視</td>
</tr>
<tr>
<td>CloudTrail</td>
<td>API 操作の監査(誰が何をしたか)</td>
</tr>
<tr>
<td>AWS Config</td>
<td>リソース構成の履歴と準拠評価</td>
</tr>
<tr>
<td>EventBridge</td>
<td>イベントのルーティング</td>
</tr>
<tr>
<td>Systems Manager</td>
<td>運用自動化の総合セット</td>
</tr>
<tr>
<td>X-Ray</td>
<td>分散トレーシング</td>
</tr>
</tbody>
</table></div>
<h3 id="s-h3-83">C-2. セキュリティ検出系</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">見るもの</th>
<th scope="col">入力</th>
</tr>
</thead>
<tbody>
<tr>
<td>GuardDuty</td>
<td>脅威(不審な挙動)</td>
<td>CloudTrail、フローログ、DNS ログなど</td>
</tr>
<tr>
<td>Inspector</td>
<td>脆弱性(CVE)</td>
<td>EC2 / ECR / Lambda</td>
</tr>
<tr>
<td>Config</td>
<td>構成の準拠</td>
<td>リソース構成</td>
</tr>
<tr>
<td>Macie</td>
<td>S3 の機密データ</td>
<td>S3 オブジェクト</td>
</tr>
<tr>
<td>Access Analyzer</td>
<td>外部公開・未使用アクセス</td>
<td>IAM / リソースポリシー</td>
</tr>
<tr>
<td>Security Hub</td>
<td>上記の集約・スコア化</td>
<td>各サービスの検出結果</td>
</tr>
<tr>
<td>Trusted Advisor</td>
<td>ベストプラクティスの助言</td>
<td>アカウント全体</td>
</tr>
</tbody>
</table></div>
<h3 id="s-h3-84">C-3. ストレージ</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ニーズ</th>
<th scope="col">選択</th>
</tr>
</thead>
<tbody>
<tr>
<td>汎用ブロック</td>
<td>EBS gp3</td>
</tr>
<tr>
<td>高 IOPS・ミッションクリティカル</td>
<td>EBS io2</td>
</tr>
<tr>
<td>大容量シーケンシャル HDD</td>
<td>st1</td>
</tr>
<tr>
<td>Linux 共有ファイル</td>
<td>EFS</td>
</tr>
<tr>
<td>Windows 共有(SMB・AD)</td>
<td>FSx for Windows</td>
</tr>
<tr>
<td>HPC</td>
<td>FSx for Lustre</td>
</tr>
<tr>
<td>オブジェクト</td>
<td>S3</td>
</tr>
<tr>
<td>S3 をファイルとしてマウント</td>
<td>S3 Files</td>
</tr>
</tbody>
</table></div>
<h3 id="s-h3-85">C-4. 負荷分散・配信</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">レイヤー / 特徴</th>
</tr>
</thead>
<tbody>
<tr>
<td>ALB</td>
<td>L7、パス / ホストルーティング、WAF</td>
</tr>
<tr>
<td>NLB</td>
<td>L4、固定 IP、超低レイテンシ</td>
</tr>
<tr>
<td>GWLB</td>
<td>L3、仮想アプライアンス</td>
</tr>
<tr>
<td>CloudFront</td>
<td>CDN(キャッシュあり)</td>
</tr>
<tr>
<td>Global Accelerator</td>
<td>固定エニーキャスト IP(キャッシュなし)</td>
</tr>
<tr>
<td>Route 53</td>
<td>DNS とヘルスチェック</td>
</tr>
</tbody>
</table></div>
<h3 id="s-h3-86">C-5. バックアップ・DR</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">手段</th>
<th scope="col">用途</th>
</tr>
</thead>
<tbody>
<tr>
<td>AWS Backup</td>
<td>一元的なバックアップ(ボールトロック、クロスリージョン / アカウント)</td>
</tr>
<tr>
<td>DLM</td>
<td>EBS スナップショット / AMI の自動化</td>
</tr>
<tr>
<td>RDS 自動バックアップ + PITR</td>
<td>DB を任意の時点へ</td>
</tr>
<tr>
<td>S3 バージョニング / レプリケーション</td>
<td>オブジェクトの誤削除 / リージョン障害対策</td>
</tr>
<tr>
<td>Elastic Disaster Recovery</td>
<td>サーバーの継続レプリケーションと DR</td>
</tr>
</tbody>
</table></div>
<h2 id="s-h2-19">付録 D. 4 週間の学習プラン(例)</h2>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">週</th>
<th scope="col">内容</th>
<th scope="col">ゴール</th>
</tr>
</thead>
<tbody>
<tr>
<td>1 週目</td>
<td>Step 0 + Domain 1(Step 1〜3)</td>
<td>CloudWatch / EventBridge / SSM Automation の基本操作、EBS・S3・RDS の性能チューニング</td>
</tr>
<tr>
<td>2 週目</td>
<td>Domain 2(Step 4〜6) + Domain 3(Step 7〜8)</td>
<td>Auto Scaling、ELB、Multi-AZ、バックアップ・DR、CloudFormation、Systems Manager</td>
</tr>
<tr>
<td>3 週目</td>
<td>Domain 4(Step 9〜10) + Domain 5(Step 11〜13)</td>
<td>IAM / SCP / KMS / Config、VPC・Route 53・CloudFront・トラブルシュート</td>
</tr>
<tr>
<td>4 週目</td>
<td>付録 A・B の復習、弱点の再学習、ハンズオン</td>
<td>模擬問題で 8 割以上</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>ハンズオンの推奨</strong>: 実際に手を動かすと定着度が大きく変わります。<strong>(1) CloudWatch エージェントでメモリを収集しアラームを作る、(2) ASG + ALB を作って障害を再現、(3) CloudFormation で VPC を作って変更セットを体験、(4) VPC フローログで REJECT を読む、(5) RDS の PITR を実行</strong> がおすすめです。</p>
</blockquote>
<h2 id="s-h2-20">付録 E. 参考 URL 一覧</h2>
<blockquote>
<p>「試験ガイド」の URL は内容を確認済みです。そのほかの URL は AWS ドキュメントの標準的なページ構成に基づいています。リンク切れの場合は、ページタイトルで検索してください。</p>
</blockquote>
<h3 id="s-h3-87">E-1. 試験ガイド(根拠となる一次情報)</h3>
<ul>
<li>試験ガイド(トップ): <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03.html</a></li>
<li>Domain 1: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain1.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain1.html</a></li>
<li>Domain 2: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain2.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain2.html</a></li>
<li>Domain 3: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain3.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain3.html</a></li>
<li>Domain 4: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain4.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain4.html</a></li>
<li>Domain 5: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain5.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-domain5.html</a></li>
<li>SOA-C02 と SOA-C03 の比較: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-comparison.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/sysops-administrator-associate-03-comparison.html</a></li>
<li>対象サービス一覧: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/soa-03-in-scope-services.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/soa-03-in-scope-services.html</a></li>
<li>対象外サービス一覧: <a href="https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/soa-03-out-of-scope-services.html">https://docs.aws.amazon.com/aws-certification/latest/sysops-administrator-associate-03/soa-03-out-of-scope-services.html</a></li>
<li>試験の公式ページ: <a href="https://aws.amazon.com/certification/certified-cloudops-engineer-associate/">https://aws.amazon.com/certification/certified-cloudops-engineer-associate/</a></li>
</ul>
<h3 id="s-h3-88">E-2. 設計思想(Well-Architected)</h3>
<ul>
<li>信頼性の柱: <a href="https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html">https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html</a></li>
<li>運用上の優秀性の柱: <a href="https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html">https://docs.aws.amazon.com/wellarchitected/latest/operational-excellence-pillar/welcome.html</a></li>
<li>セキュリティの柱: <a href="https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html">https://docs.aws.amazon.com/wellarchitected/latest/security-pillar/welcome.html</a></li>
</ul>
<h3 id="s-h3-89">E-3. 新機能(試験ガイドで例示されているもの)</h3>
<ul>
<li>Amazon S3 Files(AWS ニュースブログ): <a href="https://aws.amazon.com/blogs/aws/launching-s3-files-making-s3-buckets-accessible-as-file-systems/">https://aws.amazon.com/blogs/aws/launching-s3-files-making-s3-buckets-accessible-as-file-systems/</a></li>
<li>Amazon S3 Files(発表): <a href="https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-s3-files">https://aws.amazon.com/about-aws/whats-new/2026/04/amazon-s3-files</a></li>
<li>AWS DevOps Agent GA(InfoQ): <a href="https://infoq.com/news/2026/04/aws-devops-agent-ga">https://infoq.com/news/2026/04/aws-devops-agent-ga</a></li>
<li>AWS DevOps Agent GA(AWS Cloud Operations Blog の要約): <a href="https://aws-news.com/article/2026-03-31-announcing-general-availability-of-aws-devops-agent">https://aws-news.com/article/2026-03-31-announcing-general-availability-of-aws-devops-agent</a></li>
<li>AWS Security Agent / DevOps Agent GA(二次情報): <a href="https://letsdatascience.com/news/aws-releases-frontier-agents-for-security-and-devops-6a8d7387">https://letsdatascience.com/news/aws-releases-frontier-agents-for-security-and-devops-6a8d7387</a></li>
</ul>
<blockquote>
<p>各スキルの個別の参考 URL は、本文の各スキルの末尾に記載しています。</p>
</blockquote>
<h2 id="s-h2-21">付録 F. 本書の更新方針と留意点</h2>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>根拠</td>
<td>試験ガイドの <strong>スキル文言</strong> をそのまま見出しに使用し、説明は AWS 公式ドキュメントの仕様に基づいて記述</td>
</tr>
<tr>
<td>数値・仕様</td>
<td>サービスの仕様(上限値・既定値・料金)は <strong>変更されうる</strong> ため、試験直前に公式ドキュメントで確認</td>
</tr>
<tr>
<td>新サービス</td>
<td>Kiro、AWS DevOps Agent、Amazon S3 Files、AWS Security Agent は <strong>公式スキル文での例示を踏まえた概要</strong> にとどめている(公式ドキュメントでの詳細確認を推奨)</td>
</tr>
<tr>
<td>範囲</td>
<td>試験ガイドは「包括的な出題リストではない」と明記されているため、各 Step の関連サービスも <strong>幅広く</strong> 学習する</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>🎯 <strong>合格のコツ</strong>: 「運用者として <strong>何を見て(監視)、何が起きたら(アラーム)、どう直すか(自動化)</strong>」「<strong>止めない・戻せる・守る・つなぐ</strong> をどのサービスで実現するか」を、本書の Mermaid の図とともに説明できる状態を目指しましょう。</p>
</blockquote>
        </>
    );
}
