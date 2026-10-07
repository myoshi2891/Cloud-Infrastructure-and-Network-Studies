import { Diagram } from "../Diagram";


/**
 * SectionIntro
 */
export default function SectionIntro() {
    return (
        <>
<blockquote>
<p>対象試験: <strong>AWS Certified CloudOps Engineer - Associate (SOA-C03)</strong><br />{" "}

出題範囲の根拠: AWS 公式 Exam Guide(5 ドメイン / 13 タスク / 53 スキル)<br />{" "}

本書の方針: 試験ガイドの <strong>スキル(Skill)を 1 つずつ</strong> 取り上げ、「何のためのものか → 仕組み → ベストプラクティス → つまずきポイント → 参考 URL」の順に解説します。</p>
</blockquote>
<h2 id="s-h2-1">本書の読み方と表記ルール</h2>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>図解</td>
<td>フローチャートは Mermaid、表・比較は Markdown の表を使用(ASCII アートは使用しません)</td>
</tr>
<tr>
<td>Step</td>
<td>試験ガイドのタスク(例: Task 1.1)ごとに Step を区切り、その中でスキル(例: Skill 1.1.1)を順に解説します</td>
</tr>
<tr>
<td>ベストプラクティス</td>
<td>各スキルの末尾に「ベストプラクティス」を箇条書きでまとめます</td>
</tr>
<tr>
<td>参考 URL</td>
<td>各スキルの末尾と巻末にまとめて掲載します</td>
</tr>
<tr>
<td>優先度</td>
<td>🔴 = 頻出・必須、🟡 = 重要、🟢 = 理解しておくと安心</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p><strong>注意(URL について)</strong><br />{" "}

試験ガイド本体(5 つのドメインページ・比較ページ)の URL は実際にアクセスして内容を確認済みです。<br />{" "}

それ以外の AWS ドキュメント URL は、公式ドキュメントの標準的なページ構成に基づいて掲載しています。もしリンク切れの場合は、ページタイトルで AWS ドキュメントを検索してください。</p>
</blockquote>
<h2 id="s-h2-2">Step 0. 試験の全体像</h2>
<h3 id="s-h3-1">0-1. この試験は何を測るのか</h3>
<p>SOA-C03 は <strong>CloudOps エンジニア</strong>(クラウド運用担当)向けの試験です。公式ガイドによれば、AWS 上のワークロードを <strong>デプロイ・管理・運用</strong> する能力を検証します。具体的には次のことができるかが問われます。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">#</th>
<th scope="col">問われる能力</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>AWS Well-Architected Framework に沿ってワークロードを支援・維持する</td>
</tr>
<tr>
<td>2</td>
<td>AWS マネジメントコンソールと AWS CLI で運用作業を行う</td>
</tr>
<tr>
<td>3</td>
<td>コンプライアンス要件を満たすセキュリティ統制を実装する</td>
</tr>
<tr>
<td>4</td>
<td>システムを監視・ログ収集・トラブルシュートする</td>
</tr>
<tr>
<td>5</td>
<td>ネットワークの概念(DNS、TCP、IP、ファイアウォール)を適用する</td>
</tr>
<tr>
<td>6</td>
<td>アーキテクチャ要件(高可用性・性能・キャパシティ)を実装する</td>
</tr>
<tr>
<td>7</td>
<td>事業継続(BC)と災害復旧(DR)の手順を実施する</td>
</tr>
<tr>
<td>8</td>
<td>インシデントを識別・分類・修復する</td>
</tr>
</tbody>
</table></div>
<h3 id="s-h3-2">0-2. 試験フォーマット</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>問題形式</td>
<td>択一(正解 1 つ + 不正解 3 つ)/ 複数選択(5 つ以上の選択肢から 2 つ以上が正解)</td>
</tr>
<tr>
<td>採点対象の問題数</td>
<td>50 問</td>
</tr>
<tr>
<td>採点対象外の問題数</td>
<td>15 問(将来の問題評価用。どれが対象外かは分かりません)</td>
</tr>
<tr>
<td>合計</td>
<td>65 問</td>
</tr>
<tr>
<td>結果</td>
<td>合否判定(Pass / Fail)</td>
</tr>
<tr>
<td>スコア</td>
<td>100〜1,000 のスケールドスコア、<strong>合格最低点は 720</strong></td>
</tr>
<tr>
<td>採点方式</td>
<td><strong>補償型(compensatory)</strong> … 各ドメインで合格点を取る必要はなく、総合で合格すればよい</td>
</tr>
<tr>
<td>未回答</td>
<td>不正解扱い。ただし <strong>誤答による減点はない</strong> ため、必ず全問に回答する</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 <strong>初学者向けポイント</strong>: 補償型なので「苦手ドメインがあっても、他で稼げば合格できる」試験です。ただしドメインの重みが違うため、<strong>比重の大きいドメイン 1〜3(各 22%)</strong> を優先して固めるのが効率的です。</p>
</blockquote>
<h3 id="s-h3-3">0-3. ドメイン配分</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ドメイン</th>
<th scope="col">内容</th>
<th scope="col">配分</th>
</tr>
</thead>
<tbody>
<tr>
<td>Domain 1</td>
<td>モニタリング、ログ、分析、修復、パフォーマンス最適化</td>
<td><strong>22%</strong></td>
</tr>
<tr>
<td>Domain 2</td>
<td>信頼性と事業継続</td>
<td><strong>22%</strong></td>
</tr>
<tr>
<td>Domain 3</td>
<td>デプロイ、プロビジョニング、自動化</td>
<td><strong>22%</strong></td>
</tr>
<tr>
<td>Domain 4</td>
<td>セキュリティとコンプライアンス</td>
<td>16%</td>
</tr>
<tr>
<td>Domain 5</td>
<td>ネットワークとコンテンツ配信</td>
<td>18%</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg0" />

<h3 id="s-h3-4">0-4. 対象受験者像(公式ガイドより)</h3>
<ul>
<li>AWS 上でのデプロイ・管理・トラブルシュート・ネットワーク・セキュリティの経験 <strong>約 1 年</strong></li>
<li>システム管理者などの運用系ロールでの経験 <strong>1 年以上</strong></li>
</ul>
<p>推奨される一般 IT 知識は次のとおりです。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">分野</th>
<th scope="col">具体例</th>
</tr>
</thead>
<tbody>
<tr>
<td>運用技術</td>
<td>監視、ログ、トラブルシュートの手法</td>
</tr>
<tr>
<td>ネットワーク</td>
<td>DNS、TCP、IP、ファイアウォール</td>
</tr>
<tr>
<td>アーキテクチャ要件</td>
<td>高可用性、性能、キャパシティ</td>
</tr>
<tr>
<td>スクリプト</td>
<td>少なくとも 1 つのスクリプト言語</td>
</tr>
<tr>
<td>OS</td>
<td>少なくとも 1 つの主要 OS</td>
</tr>
<tr>
<td>その他</td>
<td>クラウドの理解、コンテナとオーケストレーションの基礎、CI/CD と Git</td>
</tr>
</tbody>
</table></div>
<h3 id="s-h3-5">0-5. 試験範囲外のタスク(公式ガイドより)</h3>
<p>次のような <strong>「設計・開発・戦略立案」系の作業</strong> は対象外です。「運用者として実行・調整・修復する」ことに集中できます。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">範囲外のタスク</th>
</tr>
</thead>
<tbody>
<tr>
<td>分散アーキテクチャの設計</td>
</tr>
<tr>
<td>CI/CD パイプラインの設計</td>
</tr>
<tr>
<td>ハイブリッド / マルチ VPC ネットワークの設計</td>
</tr>
<tr>
<td>ソフトウェア開発</td>
</tr>
<tr>
<td>セキュリティ・コンプライアンス・ガバナンス要件の定義</td>
</tr>
<tr>
<td>ランサムウェア防御戦略の策定</td>
</tr>
<tr>
<td>リソースキャパシティの評価・計画</td>
</tr>
<tr>
<td>コスト分析・TCO 分析</td>
</tr>
<tr>
<td>AWS サービスの請求・インボイス管理</td>
</tr>
</tbody>
</table></div>
<h3 id="s-h3-6">0-6. SOA-C02 から SOA-C03 への変更点</h3>
<p>SOA-C03 は 2025 年 9 月 30 日から使用されています(SOA-C02 は 2025 年 9 月 29 日まで)。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">区分</th>
<th scope="col">変更内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>ドメイン構成</td>
<td>旧 Domain 6「コストとパフォーマンスの最適化(12%)」が廃止され、旧 6.1・6.2 は <strong>Task 1.3(パフォーマンス最適化)</strong> に移動</td>
</tr>
<tr>
<td>追加</td>
<td><strong>CloudWatch エージェント</strong> による EC2 / ECS / EKS からのメトリクス・ログ収集(Task 1.1)</td>
</tr>
<tr>
<td>追加</td>
<td><strong>CloudFormation と AWS CDK</strong> によるスタック管理(Task 3.1)</td>
</tr>
<tr>
<td>追加</td>
<td><strong>リージョン・サービス選択などのコンプライアンス強制</strong>(Task 4.1)</td>
</tr>
<tr>
<td>追加</td>
<td><strong>CloudWatch ネットワークモニタリングサービス</strong> の設定と分析(Task 5.3)</td>
</tr>
<tr>
<td>削除</td>
<td>S3 静的ウェブサイトホスティングの設定(Task 5.2)</td>
</tr>
<tr>
<td>移動</td>
<td>VPN は旧 Task 4.2 から <strong>Task 5.1</strong> へ</td>
</tr>
</tbody>
</table></div>
<blockquote>
<p>💡 公式ガイドのスキル文中には、最近登場したサービス(Kiro、AWS DevOps Agent、Amazon S3 Files、AWS Security Agent など)が例として挙げられています。本書では該当箇所で簡潔に解説します。</p>
</blockquote>
<h3 id="s-h3-7">0-7. 学習ロードマップ</h3>
<p>運用の流れ(作る → 見る → 直す → 守る → つなぐ)に沿って学ぶと理解しやすくなります。</p>
<Diagram id="dg1" />

<h3 id="s-h3-8">0-8. 本書の構成(スキルと Step の対応)</h3>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">Domain</th>
<th scope="col">Task</th>
<th scope="col">スキル数</th>
<th scope="col">本書の Step</th>
</tr>
</thead>
<tbody>
<tr>
<td>1</td>
<td>1.1 メトリクス・アラーム・フィルター</td>
<td>5</td>
<td>Step 1</td>
</tr>
<tr>
<td>1</td>
<td>1.2 監視メトリクスによる問題の特定と修復</td>
<td>3</td>
<td>Step 2</td>
</tr>
<tr>
<td>1</td>
<td>1.3 コンピュート・ストレージ・DB の性能最適化</td>
<td>6</td>
<td>Step 3</td>
</tr>
<tr>
<td>2</td>
<td>2.1 スケーラビリティと弾力性</td>
<td>3</td>
<td>Step 4</td>
</tr>
<tr>
<td>2</td>
<td>2.2 高可用で回復力のある環境</td>
<td>2</td>
<td>Step 5</td>
</tr>
<tr>
<td>2</td>
<td>2.3 バックアップとリストア</td>
<td>4</td>
<td>Step 6</td>
</tr>
<tr>
<td>3</td>
<td>3.1 クラウドリソースのプロビジョニングと保守</td>
<td>6</td>
<td>Step 7</td>
</tr>
<tr>
<td>3</td>
<td>3.2 既存リソース管理の自動化</td>
<td>2</td>
<td>Step 8</td>
</tr>
<tr>
<td>4</td>
<td>4.1 セキュリティ・コンプライアンスのツールとポリシー</td>
<td>5</td>
<td>Step 9</td>
</tr>
<tr>
<td>4</td>
<td>4.2 データとインフラの保護</td>
<td>5</td>
<td>Step 10</td>
</tr>
<tr>
<td>5</td>
<td>5.1 ネットワーク機能と接続の実装・最適化</td>
<td>4</td>
<td>Step 11</td>
</tr>
<tr>
<td>5</td>
<td>5.2 ドメイン・DNS・コンテンツ配信</td>
<td>3</td>
<td>Step 12</td>
</tr>
<tr>
<td>5</td>
<td>5.3 ネットワーク接続のトラブルシュート</td>
<td>5</td>
<td>Step 13</td>
</tr>
<tr>
<td>合計</td>
<td>13 タスク</td>
<td><strong>53</strong></td>
<td>Step 1〜13 + 付録</td>
</tr>
</tbody>
</table></div>
        </>
    );
}
