import { Diagram } from "../Diagram";
import CodeBlock from "../CodeBlock";


/**
 * SectionDomain4
 */
export default function SectionDomain4() {
    return (
        <>
<h1 id="s-h1-4">Domain 4: セキュリティとコンプライアンス(16%)</h1>
<blockquote>
<p>運用者の視点では、<strong>「ルールを決める」ことは範囲外</strong>(ガバナンス要件の定義は対象外)で、<strong>「決められたルールを実装・強制・監査・是正する」</strong> ことが問われます。</p>
</blockquote>
<Diagram id="dg43" />

<h2 id="s-h2-11">Step 9. Task 4.1 セキュリティとコンプライアンスのツール・ポリシー</h2>
<h3 id="s-h3-40">Skill 4.1.1 🔴 IAM 機能の実装(パスワードポリシー・MFA・ロール・フェデレーション・リソースポリシー・条件)</h3>
<blockquote>
<p>公式スキル文: IAM の機能を実装する(例: パスワードポリシー、多要素認証 [MFA]、ロール、フェデレーテッドアイデンティティ、リソースポリシー、ポリシー条件)。</p>
</blockquote>
<h4>(1) IAM の登場人物</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">要素</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td>ユーザー</td>
<td>人またはアプリに対応する長期の ID(アクセスキーを持てる)</td>
</tr>
<tr>
<td>グループ</td>
<td>ユーザーの集合(権限をまとめて付与)</td>
</tr>
<tr>
<td><strong>ロール</strong></td>
<td><strong>一時的な認証情報</strong> を引き受けて使う ID。EC2 / Lambda / 他アカウント / フェデレーションに使う</td>
</tr>
<tr>
<td>ポリシー</td>
<td>JSON の権限定義</td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ポリシーの種類</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>アイデンティティベース</strong></td>
<td>ユーザー / グループ / ロールにアタッチ(「この ID は何ができるか」)</td>
</tr>
<tr>
<td><strong>リソースベース</strong></td>
<td>S3 バケット、SQS、KMS キー、Lambda などに付ける(「誰がこのリソースを使えるか」。<strong>Principal を含む</strong>)</td>
</tr>
<tr>
<td><strong>信頼ポリシー</strong></td>
<td>ロールの <strong>「誰がこのロールを引き受けられるか」</strong>(リソースベースの一種)</td>
</tr>
<tr>
<td><strong>権限境界</strong></td>
<td>ID に付与できる権限の <strong>上限</strong> を設定</td>
</tr>
<tr>
<td><strong>SCP(Organizations)</strong></td>
<td>アカウントの権限の上限(Skill 4.1.3)</td>
</tr>
<tr>
<td>セッションポリシー</td>
<td>ロール引き受け時に権限をさらに絞る</td>
</tr>
</tbody>
</table></div>
<h4>(2) 主な機能の実装ポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">機能</th>
<th scope="col">内容・ベストプラクティス</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>パスワードポリシー</strong></td>
<td>最小長、文字種、有効期限、再利用禁止などをアカウントで設定(IAM ユーザーのパスワードに適用)</td>
</tr>
<tr>
<td><strong>MFA</strong></td>
<td>仮想 MFA / <strong>FIDO2(パスキー・セキュリティキー)</strong> / ハードウェア。<strong>ルートユーザーと特権ユーザーには必須</strong>。ポリシー条件 <code>aws:MultiFactorAuthPresent</code> で MFA を要求</td>
</tr>
<tr>
<td><strong>ロール</strong></td>
<td><strong>EC2 → インスタンスプロファイル</strong>、Lambda → 実行ロール。<strong>アクセスキーをコードに埋め込まない</strong>。他アカウントへのアクセスは <code>sts:AssumeRole</code></td>
</tr>
<tr>
<td><strong>フェデレーション</strong></td>
<td><strong>IAM Identity Center</strong>(推奨)、SAML 2.0 / OIDC による IdP 連携。ユーザーごとの IAM ユーザーを作らない。アプリのユーザーには Amazon Cognito</td>
</tr>
<tr>
<td><strong>リソースベースポリシー</strong></td>
<td><strong>クロスアカウントアクセス</strong> を、ロールの引き受けなしで直接許可できる</td>
</tr>
<tr>
<td><strong>ルートユーザー</strong></td>
<td>日常利用しない・アクセスキーを作らない・MFA 必須</td>
</tr>
</tbody>
</table></div>
<h4>(3) 条件キー(Condition)の頻出例</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">条件キー</th>
<th scope="col">用途の例</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>aws:SourceIp</code></td>
<td>特定の IP からのみ許可</td>
</tr>
<tr>
<td><code>aws:MultiFactorAuthPresent</code></td>
<td>MFA 認証済みのときだけ許可</td>
</tr>
<tr>
<td><code>aws:RequestedRegion</code></td>
<td><strong>特定リージョンのみ許可 / 拒否</strong></td>
</tr>
<tr>
<td><code>aws:PrincipalOrgID</code></td>
<td><strong>組織内のアカウントのみ</strong> にリソースを公開</td>
</tr>
<tr>
<td><code>aws:SourceVpce</code> / <code>aws:SourceVpc</code></td>
<td><strong>特定の VPC エンドポイント経由のみ</strong> 許可</td>
</tr>
<tr>
<td><code>aws:SecureTransport</code></td>
<td><strong>HTTPS 以外を拒否</strong>(S3 バケットポリシーの定番)</td>
</tr>
<tr>
<td><code>aws:PrincipalTag</code> / <code>aws:ResourceTag</code></td>
<td><strong>タグに基づく ABAC</strong></td>
</tr>
<tr>
<td><code>aws:SourceArn</code> / <code>aws:SourceAccount</code></td>
<td>サービスからの呼び出し元を限定(混乱した代理人対策)</td>
</tr>
</tbody>
</table></div>
<p><strong>例: HTTPS 以外を拒否する S3 バケットポリシー</strong></p>
<CodeBlock index={6} />

<h4>(4) ポリシー評価ロジック(超重要)</h4>
<Diagram id="dg44" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">原則</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>既定は暗黙の拒否</strong></td>
<td>明示的な許可がなければ拒否</td>
</tr>
<tr>
<td><strong>明示的な Deny が常に勝つ</strong></td>
<td>どこかに Deny があれば許可は無効</td>
</tr>
<tr>
<td><strong>同一アカウント内</strong></td>
<td>ID ベースポリシーまたはリソースベースポリシーの <strong>どちらかが Allow</strong> なら許可(境界・SCP が許す範囲で)</td>
</tr>
<tr>
<td><strong>クロスアカウント</strong></td>
<td><strong>両方のアカウント</strong> で許可が必要(リソース側のポリシー + 呼び出し側の ID ポリシー。ただしリソースベースポリシーで <strong>特定の ID を直接指定</strong> した場合は例外あり)</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>最小権限の原則</strong>。最初は広く与えず、<strong>Access Analyzer の未使用アクセス / アクセス履歴</strong> で絞り込む</li>
<li><strong>長期のアクセスキーを避け</strong>、ロール(一時認証情報)を使う</li>
<li>人のアクセスは <strong>IAM Identity Center(フェデレーション)</strong> に一本化</li>
<li><strong>特権操作には MFA を要求</strong></li>
<li>グループ / ロールで権限を管理し、<strong>ユーザーに直接ポリシーを付けない</strong></li>
<li>外部の第三者に付与するロールには <strong>ExternalId</strong> を設定する</li>
<li><strong>未使用のユーザー・キー・ロールを定期的に削除</strong>(認証情報レポートで確認)</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>IAM: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html</a></li>
<li>IAM のベストプラクティス: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html</a></li>
<li>ポリシー評価ロジック: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_evaluation-logic.html</a></li>
<li>グローバル条件キー: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies_condition-keys.html</a></li>
</ul>
<h3 id="s-h3-41">Skill 4.1.2 🔴 アクセス問題のトラブルシュートと監査(CloudTrail / Access Analyzer / ポリシーシミュレーター)</h3>
<blockquote>
<p>公式スキル文: AWS のツール(例: CloudTrail、IAM Access Analyzer、IAM ポリシーシミュレーター)を使い、アクセスの問題をトラブルシュート・監査する。</p>
</blockquote>
<h4>(1) 使うツールの役割</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ツール</th>
<th scope="col">用途</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>CloudTrail</strong></td>
<td><strong>「誰が・いつ・どこから・何を試みて・成功 / 失敗したか」</strong> を確認。<code>errorCode</code>(<code>AccessDenied</code>)で拒否を検索</td>
</tr>
<tr>
<td><strong>IAM ポリシーシミュレーター</strong></td>
<td>特定の ID が特定の API を実行できるか、<strong>どのポリシーで許可 / 拒否されるか</strong> を実際に実行せずに検証</td>
</tr>
<tr>
<td><strong>IAM Access Analyzer</strong></td>
<td>・<strong>外部アクセスの検出</strong>(S3、IAM ロール、KMS、Lambda などが外部に公開されていないか)<br />{" "}
・<strong>未使用アクセスの検出</strong>(未使用のロール、キー、権限)<br />{" "}
・<strong>ポリシーの検証</strong>(文法・ベストプラクティス)<br />{" "}
・<strong>CloudTrail に基づくポリシー生成</strong></td>
</tr>
<tr>
<td><strong>認証情報レポート</strong></td>
<td>全ユーザーのパスワード・アクセスキー・MFA の状態</td>
</tr>
<tr>
<td><strong>アクセスアドバイザー</strong></td>
<td>各ユーザー / ロールが <strong>サービスを最後に使った日時</strong> → 不要な権限の削減に使う</td>
</tr>
</tbody>
</table></div>
<h4>(2) AccessDenied の切り分けフロー</h4>
<Diagram id="dg45" />

<h4>(3) 覚えておきたい具体例</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因の例</th>
</tr>
</thead>
<tbody>
<tr>
<td>S3 に <strong>管理者でもアクセスできない</strong></td>
<td><strong>バケットポリシーの明示的 Deny</strong>(例: VPC エンドポイント以外を拒否)、<strong>SCP</strong>、<strong>KMS キーポリシー</strong></td>
</tr>
<tr>
<td>暗号化オブジェクトが読めない</td>
<td><strong>KMS の権限(<code>kms:Decrypt</code>)</strong> がない</td>
</tr>
<tr>
<td>別アカウントのバケットにアクセスできない</td>
<td><strong>リソース側と ID 側の両方の許可</strong> が必要</td>
</tr>
<tr>
<td>VPC 内から AWS API が拒否される</td>
<td><strong>VPC エンドポイントポリシー</strong> が制限している</td>
</tr>
<tr>
<td>認可メッセージが暗号化されている</td>
<td><code>aws sts decode-authorization-message</code> で復号</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li>変更前に <strong>ポリシーシミュレーター / Access Analyzer のポリシー検証</strong> で検証する</li>
<li><strong>Access Analyzer を全リージョン(または組織単位)で有効化</strong> し、外部公開を継続的に検出する</li>
<li><strong>CloudTrail を有効化し、ログを保護</strong> する(別アカウント保管、ログファイル検証)</li>
<li>定期的に <strong>認証情報レポート / アクセスアドバイザー</strong> で未使用の認証情報・権限を棚卸し</li>
<li>権限は <strong>CloudTrail の実績からポリシーを生成</strong> して絞る</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>IAM Access Analyzer: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html</a></li>
<li>IAM ポリシーシミュレーター: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_testing-policies.html</a></li>
<li>アクセス拒否のトラブルシュート: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/troubleshoot_access-denied.html</a></li>
<li>CloudTrail: <a href="https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html">https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html</a></li>
</ul>
<h3 id="s-h3-42">Skill 4.1.3 🔴 マルチアカウント戦略の安全な実装(Organizations / SCP / IAM Identity Center)</h3>
<blockquote>
<p>公式スキル文: マルチアカウント戦略を安全に実装する(例: AWS Organizations、サービスコントロールポリシー、IAM Identity Center)。</p>
</blockquote>
<h4>(1) なぜ複数アカウントか</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">目的</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>爆発半径の限定</strong></td>
<td>1 つのアカウントの問題が他に波及しない</td>
</tr>
<tr>
<td>環境の分離</td>
<td>本番 / 開発 / セキュリティ / ログ保管を分離</td>
</tr>
<tr>
<td>権限と請求の分離</td>
<td>チーム・プロジェクト単位</td>
</tr>
</tbody>
</table></div>
<h4>(2) AWS Organizations の構造</h4>
<Diagram id="dg46" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">要素</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>管理アカウント</td>
<td>組織の作成・請求の集約。<strong>ワークロードを置かない</strong></td>
</tr>
<tr>
<td>OU(組織単位)</td>
<td>アカウントのグループ。<strong>ポリシーは OU 単位で継承</strong></td>
</tr>
<tr>
<td><strong>SCP(サービスコントロールポリシー)</strong></td>
<td><strong>メンバーアカウントの権限の上限(ガードレール)</strong>。<strong>権限を「付与」するものではない</strong></td>
</tr>
<tr>
<td>その他のポリシー</td>
<td>タグポリシー、バックアップポリシー、AI サービスのオプトアウトポリシー、リソースコントロールポリシー(RCP)など</td>
</tr>
<tr>
<td><strong>委任管理者</strong></td>
<td>Security Hub、GuardDuty、Config、IAM Identity Center などの <strong>管理を専用アカウントへ委任</strong></td>
</tr>
<tr>
<td>一括請求</td>
<td>請求の統合・ボリューム割引</td>
</tr>
</tbody>
</table></div>
<h4>(3) SCP の重要ルール</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ルール</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>許可を与えない</strong></td>
<td>SCP は「<strong>許可できる最大範囲</strong>」。<strong>SCP で許可していても、IAM で許可しなければアクセスできない</strong></td>
</tr>
<tr>
<td>管理アカウントには <strong>適用されない</strong></td>
<td>管理アカウントの ID は SCP の影響を受けない</td>
</tr>
<tr>
<td>影響範囲</td>
<td><strong>メンバーアカウントのルートユーザーを含むすべての ID</strong> に影響</td>
</tr>
<tr>
<td>サービスリンクロール</td>
<td>SCP の影響を受けない</td>
</tr>
<tr>
<td>戦略</td>
<td><strong>拒否リスト方式</strong>(既定の <code>FullAWSAccess</code> を残し、禁止事項を Deny)が一般的 / 許可リスト方式(必要なものだけ許可)</td>
</tr>
<tr>
<td>よくある使い方</td>
<td><strong>使用リージョンの制限</strong>、<strong>特定サービスの禁止</strong>、<strong>CloudTrail / Config の停止禁止</strong>、<strong>ルートユーザーの利用禁止</strong>、<strong>暗号化の強制</strong></td>
</tr>
</tbody>
</table></div>
<p><strong>例: 東京・大阪以外のリージョンを拒否(グローバルサービスを除外)</strong></p>
<CodeBlock index={7} />

<h4>(4) IAM Identity Center</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>役割</td>
<td><strong>複数アカウントと業務アプリへの Single Sign-On(SSO)</strong> を一元管理</td>
</tr>
<tr>
<td>ID ソース</td>
<td>Identity Center ディレクトリ / <strong>Active Directory</strong> / <strong>外部 IdP(Okta、Entra ID など。SCIM でプロビジョニング)</strong></td>
</tr>
<tr>
<td><strong>権限セット(Permission Set)</strong></td>
<td>アカウントに割り当てる権限のテンプレート。各アカウントに <strong>IAM ロールとして自動展開</strong> される</td>
</tr>
<tr>
<td>割り当て</td>
<td><strong>ユーザー / グループ × アカウント × 権限セット</strong></td>
</tr>
<tr>
<td>利点</td>
<td><strong>長期のアクセスキー不要</strong>(CLI も <code>aws sso login</code> で一時認証情報)、MFA の強制、集中管理</td>
</tr>
</tbody>
</table></div>
<h4>(5) AWS Control Tower(補足)</h4>
<p><strong>ランディングゾーン(推奨されるマルチアカウント環境)の自動構築</strong>と、<strong>ガードレール(予防的 = SCP / 検出的 = Config)</strong> の適用を提供します。</p>
<h4>(6) ベストプラクティス</h4>
<ul>
<li><strong>管理アカウントを最小限に利用</strong> し、ワークロードを置かない</li>
<li>ログ・セキュリティ用の <strong>専用アカウント</strong> を作り、<strong>組織の証跡</strong> のログは別アカウントに集約</li>
<li><strong>SCP は小さく始めて段階的に適用</strong>(まず OU 単位でテスト)し、<strong>ルートでの Deny は慎重に</strong></li>
<li>人のアクセスは <strong>IAM Identity Center</strong> に統一し、IAM ユーザーを作らない</li>
<li>セキュリティサービスは <strong>委任管理者で組織全体を集約管理</strong></li>
</ul>
<h4>(7) 参考 URL</h4>
<ul>
<li>AWS Organizations: <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html">https://docs.aws.amazon.com/organizations/latest/userguide/orgs_introduction.html</a></li>
<li>SCP: <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html">https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html</a></li>
<li>IAM Identity Center: <a href="https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html">https://docs.aws.amazon.com/singlesignon/latest/userguide/what-is.html</a></li>
<li>AWS Control Tower: <a href="https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html">https://docs.aws.amazon.com/controltower/latest/userguide/what-is-control-tower.html</a></li>
</ul>
<h3 id="s-h3-43">Skill 4.1.4 🟡 Trusted Advisor のセキュリティチェック結果に基づく修復</h3>
<blockquote>
<p>公式スキル文: AWS Trusted Advisor のセキュリティチェックの結果に基づいて修復を実装する。</p>
</blockquote>
<h4>(1) Trusted Advisor とは</h4>
<p>AWS のベストプラクティスに照らして環境を自動チェックし、<strong>推奨事項</strong> を示すサービスです。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">カテゴリ</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>コスト最適化</td>
<td>未使用リソース、リザーブドの活用</td>
</tr>
<tr>
<td>パフォーマンス</td>
<td>過負荷のリソースなど</td>
</tr>
<tr>
<td><strong>セキュリティ</strong></td>
<td>公開されている設定・弱い設定の検出</td>
</tr>
<tr>
<td>耐障害性</td>
<td>Multi-AZ、バックアップ</td>
</tr>
<tr>
<td>サービスクォータ</td>
<td>上限への接近</td>
</tr>
<tr>
<td>コストの割引・運用の最適化</td>
<td></td>
</tr>
</tbody>
</table></div>
<h4>(2) 代表的なセキュリティチェックと修復</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">チェック</th>
<th scope="col">指摘内容</th>
<th scope="col">修復</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ルートアカウントの MFA</strong></td>
<td>MFA が未設定</td>
<td>ルートに MFA を設定</td>
</tr>
<tr>
<td><strong>セキュリティグループ - 制限のないポート</strong></td>
<td>特定ポートが <code>0.0.0.0/0</code> に開放</td>
<td>送信元を必要な範囲に絞る(SSH / RDP は Session Manager で代替)</td>
</tr>
<tr>
<td><strong>S3 バケットのアクセス許可</strong></td>
<td>バケットが公開(または広範なアクセス)</td>
<td><strong>S3 ブロックパブリックアクセス</strong> を有効化、ポリシー修正</td>
</tr>
<tr>
<td><strong>IAM の使用状況 / アクセスキーのローテーション</strong></td>
<td>古いアクセスキー</td>
<td>キーのローテーション・削除</td>
</tr>
<tr>
<td><strong>公開されている EBS / RDS スナップショット</strong></td>
<td>スナップショットが公開</td>
<td>共有設定を非公開に</td>
</tr>
<tr>
<td><strong>漏洩した(公開された)アクセスキー</strong></td>
<td>キーが公開リポジトリ等で露出</td>
<td><strong>直ちに無効化・ローテーション</strong></td>
</tr>
<tr>
<td>CloudTrail のロギング</td>
<td>証跡が無効</td>
<td>証跡を有効化</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg47" />

<h4>(3) 利用上のポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>サポートプランによる違い</strong></td>
<td><strong>すべてのチェックを利用するには Business Support 以上</strong>(上位プラン)が必要。下位のプランでは <strong>一部の主要なチェックのみ</strong>(例: ルートの MFA、公開 S3 など)。最新の対象は公式ドキュメントで確認</td>
</tr>
<tr>
<td>更新</td>
<td>自動で定期更新。手動で <strong>更新(リフレッシュ)</strong> も可能</td>
</tr>
<tr>
<td>通知</td>
<td>EventBridge / 週次レポートで通知</td>
</tr>
<tr>
<td>組織ビュー</td>
<td>組織内の複数アカウントの結果を集約</td>
</tr>
<tr>
<td>位置づけ</td>
<td>Trusted Advisor は <strong>「ベストプラクティスの助言」</strong>。継続的な準拠管理や詳細な検出には <strong>Config / Security Hub</strong> を併用</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>指摘を放置せず優先度を付けて対処</strong>(公開されたキーや公開 S3 は最優先)</li>
<li>結果の変化を <strong>EventBridge で通知・自動修復に連携</strong></li>
<li><strong>例外(意図的な設定)は理由を記録</strong> して「抑制」する</li>
<li>修復後は <strong>再チェックで解消を確認</strong></li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>AWS Trusted Advisor: <a href="https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html">https://docs.aws.amazon.com/awssupport/latest/user/trusted-advisor.html</a></li>
</ul>
<h3 id="s-h3-44">Skill 4.1.5 🔴 コンプライアンス要件の強制と継続的モニタリング(リージョン・サービス選択 / AWS Config 適合パック)</h3>
<blockquote>
<p>公式スキル文: コンプライアンス要件と継続的モニタリングを強制する(例: リージョンとサービスの選択、AWS Config 適合パック)。(<strong>「リージョンとサービスの選択」は SOA-C03 で追加</strong>)</p>
</blockquote>
<h4>(1) 「予防」と「検出」の 2 本柱</h4>
<Diagram id="dg48" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">区分</th>
<th scope="col">ツール</th>
<th scope="col">例</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>予防</strong></td>
<td><strong>SCP / IAM ポリシー</strong></td>
<td><strong>使用リージョンを限定</strong>、<strong>使用可能なサービスを限定</strong>、暗号化なしの作成を拒否</td>
</tr>
<tr>
<td><strong>検出</strong></td>
<td><strong>AWS Config</strong></td>
<td>暗号化されていない EBS、公開 S3 を検出</td>
</tr>
<tr>
<td><strong>是正</strong></td>
<td><strong>Config 修復アクション</strong></td>
<td>SSM Automation で自動的に是正</td>
</tr>
</tbody>
</table></div>
<h4>(2) リージョンとサービスの選択</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">手段</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SCP でリージョンを制限</strong></td>
<td><code>aws:RequestedRegion</code> で <strong>許可リージョン以外を Deny</strong>(グローバルサービスは <code>NotAction</code> で除外)。Skill 4.1.3 の例を参照</td>
</tr>
<tr>
<td><strong>SCP でサービスを制限</strong></td>
<td>承認されたサービスのみ許可する <strong>許可リスト方式</strong>、禁止サービスの <strong>拒否リスト方式</strong></td>
</tr>
<tr>
<td><strong>Control Tower</strong></td>
<td><strong>リージョン拒否ガードレール</strong> を提供</td>
</tr>
<tr>
<td>要件の例</td>
<td><strong>データレジデンシー(国内にデータを置く)</strong>、承認されていないサービスの使用禁止</td>
</tr>
</tbody>
</table></div>
<h4>(3) AWS Config</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">要素</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>構成レコーダー</strong></td>
<td>リソースの構成と <strong>変更履歴</strong> を継続記録</td>
</tr>
<tr>
<td><strong>Config ルール</strong></td>
<td>リソースが <strong>準拠(COMPLIANT)か非準拠(NON_COMPLIANT)</strong> かを評価。<strong>マネージドルール</strong>(例: <code>s3-bucket-public-read-prohibited</code>、<code>encrypted-volumes</code>、<code>restricted-ssh</code>、<code>required-tags</code>)/ カスタムルール(Lambda / Guard)</td>
</tr>
<tr>
<td>評価のタイミング</td>
<td><strong>構成変更時</strong> / <strong>定期</strong></td>
</tr>
<tr>
<td><strong>適合パック(Conformance Pack)</strong></td>
<td><strong>複数のルールと修復アクションを 1 つのパッケージ</strong> として、アカウント / 組織にデプロイ(CIS、PCI DSS などの <strong>サンプルテンプレート</strong> あり)</td>
</tr>
<tr>
<td><strong>修復アクション</strong></td>
<td>非準拠に対して <strong>SSM Automation ランブックを自動 / 手動実行</strong></td>
</tr>
<tr>
<td><strong>アグリゲーター</strong></td>
<td><strong>複数アカウント・リージョンの結果を集約</strong></td>
</tr>
<tr>
<td>履歴</td>
<td>リソースの <strong>構成タイムライン</strong>(いつ何が変わったか)を確認</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg49" />

<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>SCP で「できないようにする」(予防)+ Config で「違反を見つける」(検出)+ 修復アクションで「直す」(是正)</strong> の三段構え</li>
<li><strong>適合パックと組織の Config</strong> で全アカウントに一括展開</li>
<li><strong>アグリゲーター</strong> で全体のコンプライアンス状況を一元把握</li>
<li>修復アクションは <strong>まず手動承認から開始</strong> し、影響を理解してから自動化</li>
<li><strong>Config のコスト</strong> はレコード数に依存するため、記録対象のリソースタイプを適切に選ぶ</li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>AWS Config: <a href="https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html">https://docs.aws.amazon.com/config/latest/developerguide/WhatIsConfig.html</a></li>
<li>適合パック: <a href="https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html">https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html</a></li>
<li>Config の修復: <a href="https://docs.aws.amazon.com/config/latest/developerguide/remediation.html">https://docs.aws.amazon.com/config/latest/developerguide/remediation.html</a></li>
<li>SCP: <a href="https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html">https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html</a></li>
</ul>
<h2 id="s-h2-12">Step 10. Task 4.2 データとインフラを守る戦略</h2>
<h3 id="s-h3-45">Skill 4.2.1 🟡 データ分類スキームの実装と強制</h3>
<blockquote>
<p>公式スキル文: データ分類スキームを実装し、強制する。</p>
</blockquote>
<h4>(1) データ分類とは</h4>
<p>データを <strong>機密度で分類</strong>(例: 公開 / 社内限定 / 機密 / 極秘)し、<strong>分類ごとに保護レベルを変える</strong> 考え方です。運用者は、<strong>決められた分類スキームを AWS 上で実装・強制</strong> します(分類の定義自体は範囲外)。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">分類(例)</th>
<th scope="col">保護の例</th>
</tr>
</thead>
<tbody>
<tr>
<td>公開</td>
<td>暗号化は推奨、CloudFront で配信可</td>
</tr>
<tr>
<td>社内限定</td>
<td>IAM / SG でアクセス制限、暗号化</td>
</tr>
<tr>
<td>機密</td>
<td><strong>KMS カスタマー管理キー</strong>、アクセスログ、MFA、ネットワーク制限</td>
</tr>
<tr>
<td>極秘</td>
<td>専用アカウント、<strong>Object Lock</strong>、厳格な監査、VPC エンドポイント経由のみ</td>
</tr>
</tbody>
</table></div>
<h4>(2) AWS での実装手段</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">手段</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>タグ付け</strong></td>
<td><code>DataClassification=Confidential</code> などを <strong>リソースに付与</strong>(分類の基盤)</td>
</tr>
<tr>
<td><strong>Amazon Macie</strong></td>
<td><strong>S3 内の機密データ(個人情報など)を自動検出・分類</strong>。機密データ検出ジョブ、<strong>自動検出</strong>。見つけた結果を EventBridge / Security Hub に連携</td>
</tr>
<tr>
<td><strong>タグポリシー(Organizations)</strong></td>
<td><strong>タグのキー・値の標準化</strong>(表記ゆれ防止)</td>
</tr>
<tr>
<td><strong>ABAC(属性ベースのアクセス制御)</strong></td>
<td><strong>タグを条件</strong> にアクセス制御(<code>aws:ResourceTag/DataClassification</code> = <code>aws:PrincipalTag/...</code>)</td>
</tr>
<tr>
<td><strong>SCP / IAM 条件</strong></td>
<td><strong>タグなしのリソース作成を拒否</strong>(<code>aws:RequestTag</code>)、タグの変更を制限</td>
</tr>
<tr>
<td><strong>AWS Config</strong></td>
<td><code>required-tags</code> ルールでタグの付与漏れを検出</td>
</tr>
<tr>
<td><strong>保護の自動適用</strong></td>
<td>分類に応じて <strong>暗号化(KMS キー)、バージョニング、Object Lock、バックアップ</strong> を適用</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg50" />

<h4>(3) ベストプラクティス</h4>
<ul>
<li><strong>作成時にタグを強制</strong>(タグなしの作成を拒否)</li>
<li><strong>Macie</strong> で想定外の場所にある機密データを継続的に検出</li>
<li>分類ごとに <strong>暗号化・アクセス制御・監査のレベルを標準化</strong>(IaC に組み込み)</li>
<li><strong>ABAC</strong> で権限の管理をスケールさせる</li>
<li>機密データの <strong>アクセスログ(S3 サーバーアクセスログ / CloudTrail データイベント)</strong> を有効化</li>
</ul>
<h4>(4) 参考 URL</h4>
<ul>
<li>Amazon Macie: <a href="https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html">https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html</a></li>
<li>IAM の ABAC: <a href="https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html">https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction_attribute-based-access-control.html</a></li>
</ul>
<h3 id="s-h3-46">Skill 4.2.2 🔴 保管時の暗号化の実装・設定・トラブルシュート(AWS KMS)</h3>
<blockquote>
<p>公式スキル文: 保管時の暗号化(例: AWS KMS)を実装・設定・トラブルシュートする。</p>
</blockquote>
<h4>(1) KMS の基本</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">用語</th>
<th scope="col">意味</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>KMS キー</strong>(旧 CMK)</td>
<td>暗号化に使うキー。<strong>キーそのものは KMS の外に出ない</strong></td>
</tr>
<tr>
<td><strong>エンベロープ暗号化</strong></td>
<td>データは <strong>データキー</strong> で暗号化し、そのデータキーを <strong>KMS キーで暗号化</strong> して保存</td>
</tr>
<tr>
<td><strong>キーポリシー</strong></td>
<td><strong>KMS キーに必須のリソースベースポリシー</strong>。キーポリシーが許可しない限り IAM だけではアクセス不可</td>
</tr>
<tr>
<td>グラント</td>
<td>一時的・プログラム的な権限委任(AWS サービスが内部的に使用)</td>
</tr>
<tr>
<td>エイリアス</td>
<td>キーの別名(<code>alias/my-key</code>)</td>
</tr>
</tbody>
</table></div>
<h4>(2) キーの種類</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">種類</th>
<th scope="col">管理者</th>
<th scope="col">特徴</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>AWS 所有のキー</strong></td>
<td>AWS</td>
<td>利用者から見えない。無料</td>
</tr>
<tr>
<td><strong>AWS マネージドキー</strong>(<code>aws/s3</code> など)</td>
<td>AWS(サービスごと)</td>
<td><strong>ローテーションは自動(毎年)</strong>。<strong>キーポリシーは変更不可</strong></td>
</tr>
<tr>
<td><strong>カスタマー管理キー</strong></td>
<td><strong>利用者</strong></td>
<td><strong>キーポリシーの管理、有効化 / 無効化、ローテーション設定、削除スケジュール、クロスアカウント共有が可能</strong></td>
</tr>
</tbody>
</table></div>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>キーローテーション</strong></td>
<td>カスタマー管理キーは <strong>自動ローテーションを有効化</strong>(<strong>既定は 1 年ごと</strong>、期間を変更可能)。<strong>キー ID / ARN は変わらず</strong>、過去のデータは <strong>古いキーマテリアルで復号</strong> できる</td>
</tr>
<tr>
<td><strong>削除</strong></td>
<td><strong>待機期間 7〜30 日(既定 30 日)</strong> を設ける。待機中は <strong>使用不可</strong>、期間内なら <strong>キャンセル可能</strong>。削除したら <strong>そのキーで暗号化したデータは復号不能</strong></td>
</tr>
<tr>
<td>キーの無効化</td>
<td>一時的に停止(復号もできなくなる)</td>
</tr>
<tr>
<td><strong>マルチリージョンキー</strong></td>
<td>同じキーマテリアルを複数リージョンで使用(DR、グローバルテーブル向け)</td>
</tr>
<tr>
<td>対称 / 非対称</td>
<td>既定は <strong>対称(AES-256)</strong></td>
</tr>
</tbody>
</table></div>
<h4>(3) サービス別の保管時暗号化</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col">ポイント</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>EBS</strong></td>
<td>ボリューム単位の暗号化。<strong>リージョンごとの「既定で暗号化」</strong> を有効化可能。<strong>既存の暗号化なしボリュームを直接暗号化することはできない</strong> → <strong>スナップショット → 暗号化コピー → 新ボリューム</strong></td>
</tr>
<tr>
<td><strong>S3</strong></td>
<td><strong>SSE-S3(既定。すべての新規オブジェクトに自動適用)</strong>、<strong>SSE-KMS</strong>(監査・キー制御が必要な場合)、SSE-C、DSSE-KMS。<strong>S3 Bucket Keys</strong> で KMS 呼び出しを削減しコスト・スロットリングを軽減</td>
</tr>
<tr>
<td><strong>RDS</strong></td>
<td><strong>作成時に暗号化を指定</strong>。<strong>既存の非暗号化インスタンスは直接暗号化できない</strong> → <strong>スナップショットを暗号化コピー → 復元</strong>。リードレプリカやスナップショットも暗号化される</td>
</tr>
<tr>
<td><strong>DynamoDB</strong></td>
<td><strong>常に暗号化</strong>(キーの種類を選択)</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td><strong>作成時に暗号化を指定</strong>(後から変更不可)</td>
</tr>
</tbody>
</table></div>
<Diagram id="dg51" />

<h4>(4) KMS のトラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因と対処</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>AccessDeniedException</code> / <code>KMSInvalidStateException</code></td>
<td><strong>キーポリシーに許可がない</strong>、キーが <strong>無効 / 削除予定</strong>、IAM 権限(<code>kms:Decrypt</code>、<code>kms:GenerateDataKey</code>、<code>kms:Encrypt</code>)</td>
</tr>
<tr>
<td>別アカウントから暗号化リソースを使えない</td>
<td><strong>キーポリシーで外部アカウントを許可</strong> + 外部アカウントの <strong>IAM でも許可</strong>。<strong>AWS マネージドキーは共有不可</strong></td>
</tr>
<tr>
<td><strong>暗号化スナップショット / AMI を共有できない</strong></td>
<td><strong>カスタマー管理キーで暗号化し、共有先にキーの使用権限を付与</strong></td>
</tr>
<tr>
<td>EC2 / ASG の起動が失敗</td>
<td><strong>サービスリンクロール(Auto Scaling)</strong> にキーの権限が必要</td>
</tr>
<tr>
<td><code>ThrottlingException</code>(KMS のリクエスト上限)</td>
<td>S3 の <strong>Bucket Keys</strong>、データキーのキャッシュ、リクエストの削減</td>
</tr>
<tr>
<td>キー削除後にデータが読めない</td>
<td>復旧不能。<strong>削除は待機期間を使い、使用状況を確認してから</strong></td>
</tr>
<tr>
<td>条件 <code>kms:ViaService</code></td>
<td><strong>特定のサービス経由のみ</strong> キーを使えるように制限</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>既定で暗号化</strong>(EBS の既定暗号化、S3 の既定暗号化、RDS・EFS は作成時に暗号化)</li>
<li>監査・クロスアカウント・キー制御が必要なら <strong>カスタマー管理キー</strong>。<strong>自動ローテーションを有効化</strong></li>
<li>キーポリシーは <strong>最小権限</strong>、<strong>キー管理者と利用者を分離</strong></li>
<li>削除は <strong>待機期間を使い、CloudTrail で使用状況を確認</strong> してから</li>
<li><strong>S3 + SSE-KMS には Bucket Keys</strong> でコスト・性能を最適化</li>
<li><strong>KMS の使用は CloudTrail で全記録</strong> されるため、監査に活用</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>AWS KMS: <a href="https://docs.aws.amazon.com/kms/latest/developerguide/overview.html">https://docs.aws.amazon.com/kms/latest/developerguide/overview.html</a></li>
<li>キーのローテーション: <a href="https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html">https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html</a></li>
<li>EBS の暗号化: <a href="https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html">https://docs.aws.amazon.com/ebs/latest/userguide/ebs-encryption.html</a></li>
<li>S3 のデータ保護と暗号化: <a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html">https://docs.aws.amazon.com/AmazonS3/latest/userguide/UsingEncryption.html</a></li>
</ul>
<h3 id="s-h3-47">Skill 4.2.3 🔴 転送中の暗号化の実装・設定・トラブルシュート(AWS Certificate Manager)</h3>
<blockquote>
<p>公式スキル文: 転送中の暗号化(例: AWS Certificate Manager [ACM])を実装・設定・トラブルシュートする。</p>
</blockquote>
<h4>(1) 基本</h4>
<p><strong>TLS(HTTPS)</strong> で通信を暗号化し、<strong>盗聴と改ざん</strong> を防ぎます。AWS では <strong>ACM</strong> が証明書の発行と管理を担います。</p>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">ACM の機能</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>パブリック証明書</strong></td>
<td><strong>無料</strong>。ドメイン所有を検証して発行</td>
</tr>
<tr>
<td>検証方法</td>
<td><strong>DNS 検証(推奨)</strong>:指定された <strong>CNAME レコードを DNS に追加</strong>。Route 53 なら自動追加も可能 / メール検証</td>
</tr>
<tr>
<td><strong>自動更新</strong></td>
<td><strong>DNS 検証の CNAME を残している限り</strong> 自動更新される</td>
</tr>
<tr>
<td>統合サービス</td>
<td><strong>ALB / NLB / CloudFront / API Gateway</strong> などに <strong>直接関連付け</strong>(ACM のパブリック証明書は標準では <strong>EC2 インスタンスに直接インストールできない</strong>ため、LB や CloudFront で終端するのが基本)</td>
</tr>
<tr>
<td><strong>プライベート CA</strong></td>
<td>社内向けの <strong>プライベート証明書</strong> を発行</td>
</tr>
<tr>
<td>インポート</td>
<td>外部で取得した証明書を ACM に取り込める(<strong>インポートした証明書は自動更新されない</strong> → 期限を自分で管理)</td>
</tr>
</tbody>
</table></div>
<h4>(2) 重要な注意点</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">注意点</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>リージョン</strong></td>
<td>ACM の証明書は <strong>リージョンごと</strong>。<strong>ALB を使うならその ALB のリージョン</strong> に作成</td>
</tr>
<tr>
<td><strong>CloudFront 用</strong></td>
<td><strong>米国東部(バージニア北部)<code>us-east-1</code></strong> で証明書を作成する必要がある(CloudFront の定番トラップ)</td>
</tr>
<tr>
<td>ワイルドカード</td>
<td><code>*.example.com</code> を発行可能(<strong>ルートドメイン <code>example.com</code> は別途追加が必要</strong>)</td>
</tr>
</tbody>
</table></div>
<h4>(3) 暗号化の実装ポイント</h4>
<Diagram id="dg52" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">対象</th>
<th scope="col">設定</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>ALB</strong></td>
<td><strong>HTTPS リスナー(443)に ACM 証明書</strong> を設定。<strong>HTTP(80)→ HTTPS(443)のリダイレクト</strong> ルール。<strong>セキュリティポリシー(TLS バージョン・暗号スイート)</strong> を選択</td>
</tr>
<tr>
<td><strong>CloudFront</strong></td>
<td><strong>ビューアープロトコルポリシー</strong>(<code>Redirect HTTP to HTTPS</code> / <code>HTTPS Only</code>)、<strong>オリジンプロトコルポリシー</strong></td>
</tr>
<tr>
<td><strong>S3</strong></td>
<td>バケットポリシーで <strong><code>aws:SecureTransport</code> が false の場合は Deny</strong></td>
</tr>
<tr>
<td><strong>RDS</strong></td>
<td><strong>SSL/TLS 接続を必須化</strong>(PostgreSQL の <code>rds.force_ssl</code>、MySQL の <code>require_secure_transport</code> など)。クライアントに <strong>RDS の CA 証明書バンドル</strong> を設定</td>
</tr>
<tr>
<td><strong>EFS</strong></td>
<td>マウント時に TLS を有効化(<code>amazon-efs-utils</code> の <code>tls</code> オプション)</td>
</tr>
<tr>
<td><strong>VPN / Direct Connect</strong></td>
<td>VPN は IPsec で暗号化。Direct Connect は <strong>単体では暗号化されない</strong> → VPN や MACsec と組み合わせ</td>
</tr>
</tbody>
</table></div>
<h4>(4) トラブルシュート</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">症状</th>
<th scope="col">原因と対処</th>
</tr>
</thead>
<tbody>
<tr>
<td>証明書が <strong>ALB / CloudFront の選択肢に出ない</strong></td>
<td><strong>リージョン違い</strong>(CloudFront は us-east-1)</td>
</tr>
<tr>
<td>証明書が <strong>「検証保留中」のまま</strong></td>
<td><strong>DNS 検証の CNAME が未追加 / 誤り</strong></td>
</tr>
<tr>
<td>証明書が <strong>期限切れ</strong></td>
<td><strong>自動更新に失敗</strong>(CNAME の削除)/ <strong>インポート証明書の期限管理漏れ</strong> → EventBridge の「ACM 証明書の有効期限接近」イベントでアラート</td>
</tr>
<tr>
<td>ブラウザの証明書エラー</td>
<td><strong>ドメイン名が不一致</strong>(SAN に含まれない)、中間証明書の不足、期限切れ</td>
</tr>
<tr>
<td>古いクライアントが接続できない</td>
<td>ALB / CloudFront の <strong>セキュリティポリシーが新しすぎる</strong>(TLS 1.0 / 1.1 を無効化しているなど)</td>
</tr>
<tr>
<td><code>HTTP → HTTPS</code> で無限リダイレクト</td>
<td>CloudFront とオリジンの両方でリダイレクトしている</td>
</tr>
</tbody>
</table></div>
<h4>(5) ベストプラクティス</h4>
<ul>
<li><strong>ACM の DNS 検証 + 自動更新</strong> を使い、証明書の手動管理をなくす</li>
<li><strong>HTTP を HTTPS にリダイレクト</strong>し、<strong>最新の TLS ポリシー</strong>(TLS 1.2 以上)を選択</li>
<li><strong>データストア(S3 / RDS)でも TLS を強制</strong> する</li>
<li>証明書の <strong>有効期限を監視</strong>(特にインポート証明書)</li>
<li><strong>ワイルドカード証明書の使い回しに注意</strong>(影響範囲を限定)</li>
</ul>
<h4>(6) 参考 URL</h4>
<ul>
<li>AWS Certificate Manager: <a href="https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html">https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html</a></li>
<li>ALB の HTTPS リスナー: <a href="https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html">https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html</a></li>
</ul>
<h3 id="s-h3-48">Skill 4.2.4 🔴 シークレットの安全な保管</h3>
<blockquote>
<p>公式スキル文: AWS サービスを使ってシークレットを安全に保管する。</p>
</blockquote>
<h4>(1) 基本原則</h4>
<p><strong>パスワード・API キー・DB 認証情報を、コード / AMI / 環境変数 / テンプレートにベタ書きしない</strong> こと。専用サービスに保管し、<strong>実行時に取得</strong> します。</p>
<h4>(2) AWS Secrets Manager と Systems Manager Parameter Store の比較</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col"><strong>Secrets Manager</strong></th>
<th scope="col"><strong>Parameter Store(SecureString)</strong></th>
</tr>
</thead>
<tbody>
<tr>
<td>主な用途</td>
<td><strong>シークレット専用</strong>(DB 認証情報・API キー)</td>
<td>設定値全般 + 暗号化した値</td>
</tr>
<tr>
<td><strong>自動ローテーション</strong></td>
<td><strong>ネイティブ対応</strong>(RDS などは組み込み、その他は Lambda で実装)</td>
<td><strong>なし</strong>(Lambda などで自作)</td>
</tr>
<tr>
<td>暗号化</td>
<td><strong>常に KMS で暗号化</strong></td>
<td>SecureString で KMS 暗号化(標準 / プレーンも選べる)</td>
</tr>
<tr>
<td>コスト</td>
<td><strong>シークレット数 + API 呼び出しで課金</strong></td>
<td><strong>標準パラメータは無料</strong>(高度なパラメータは有料)</td>
</tr>
<tr>
<td>クロスリージョンレプリケーション</td>
<td><strong>対応</strong></td>
<td>なし</td>
</tr>
<tr>
<td>階層構造</td>
<td>名前で管理</td>
<td><strong>パス形式(<code>/prod/app/db</code>)で階層管理</strong></td>
</tr>
<tr>
<td>バージョン管理</td>
<td>あり(ステージングラベル)</td>
<td>あり</td>
</tr>
<tr>
<td>使い分け</td>
<td><strong>ローテーションが必要・DB 認証情報</strong></td>
<td><strong>設定値、コストを抑えたい単純な機密値</strong></td>
</tr>
</tbody>
</table></div>
<Diagram id="dg53" />

<h4>(3) 実装のポイント</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>アクセス制御</strong></td>
<td><strong>IAM ロールに最小権限</strong>(特定のシークレットだけ <code>GetSecretValue</code>)。<strong>リソースポリシー</strong> でクロスアカウント共有</td>
</tr>
<tr>
<td>暗号化キー</td>
<td>既定は AWS マネージドキー。<strong>クロスアカウント共有にはカスタマー管理キーが必要</strong></td>
</tr>
<tr>
<td><strong>RDS ローテーション</strong></td>
<td>Secrets Manager が <strong>Lambda で自動的にパスワードを変更し DB 側も更新</strong>。アプリは <strong>常に最新のシークレットを取得</strong> する(ハードコードしない)</td>
</tr>
<tr>
<td><strong>CloudFormation</strong></td>
<td>動的参照 <code>{"{"}{"{"}resolve:secretsmanager:...{"}"}{"}"}</code> / <code>{"{"}{"{"}resolve:ssm-secure:...{"}"}{"}"}</code> で <strong>テンプレートに平文を書かない</strong></td>
</tr>
<tr>
<td>ECS / Lambda</td>
<td>ECS は <strong>タスク定義の <code>secrets</code></strong> で注入。Lambda は取得結果を <strong>キャッシュ</strong>(API 呼び出し削減)</td>
</tr>
<tr>
<td>監査</td>
<td>CloudTrail で <strong>取得 / 変更を記録</strong>、アクセスの異常を検知</td>
</tr>
</tbody>
</table></div>
<h4>(4) ベストプラクティス</h4>
<ul>
<li><strong>ハードコード禁止</strong>(コード、AMI、リポジトリ、環境変数の平文)</li>
<li><strong>自動ローテーション</strong> を有効にし、漏洩時の影響を限定</li>
<li><strong>最小権限</strong> + <strong>カスタマー管理キー</strong>(必要な場合)</li>
<li>アプリ側は <strong>取得結果をキャッシュ</strong> し、API コストと遅延を削減</li>
<li><strong>漏洩した疑いがあれば直ちにローテーション / 無効化</strong></li>
</ul>
<h4>(5) 参考 URL</h4>
<ul>
<li>AWS Secrets Manager: <a href="https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html">https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html</a></li>
<li>Parameter Store: <a href="https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html">https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html</a></li>
</ul>
<h3 id="s-h3-49">Skill 4.2.5 🔴 レポート設定と検出結果の修復(Security Hub / GuardDuty / Config / Inspector / Security Agent)</h3>
<blockquote>
<p>公式スキル文: AWS サービス(例: AWS Security Hub、Amazon GuardDuty、AWS Config、Amazon Inspector、AWS Security Agent)のレポートを設定し、検出結果を修復する。</p>
</blockquote>
<h4>(1) サービスの役割分担</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">サービス</th>
<th scope="col"><strong>何を見るか</strong></th>
<th scope="col">主な検出内容</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>Amazon GuardDuty</strong></td>
<td><strong>脅威検出</strong>(ログの異常分析)</td>
<td>不正アクセス、暗号通貨マイニング、侵害されたインスタンス / 認証情報、通常と異なる API 利用</td>
</tr>
<tr>
<td><strong>Amazon Inspector</strong></td>
<td><strong>脆弱性スキャン</strong></td>
<td>EC2 / ECR コンテナイメージ / Lambda の <strong>ソフトウェア脆弱性(CVE)</strong> とネットワーク到達性</td>
</tr>
<tr>
<td><strong>AWS Config</strong></td>
<td><strong>構成のコンプライアンス</strong></td>
<td>構成が <strong>ルールに準拠</strong> しているか(暗号化なし、公開など)</td>
</tr>
<tr>
<td><strong>AWS Security Hub</strong></td>
<td><strong>検出結果の集約と優先順位付け</strong></td>
<td>上記サービスなどの <strong>検出結果を一元化</strong>、<strong>セキュリティ標準</strong>(AWS 基礎セキュリティのベストプラクティス、CIS、PCI DSS、NIST など)に対する <strong>準拠状況のスコア</strong></td>
</tr>
<tr>
<td><strong>Amazon Macie</strong></td>
<td><strong>S3 の機密データ</strong></td>
<td>個人情報の検出</td>
</tr>
<tr>
<td><strong>IAM Access Analyzer</strong></td>
<td><strong>外部公開・未使用アクセス</strong></td>
<td>意図しない共有、未使用の権限</td>
</tr>
<tr>
<td><strong>AWS Security Agent</strong></td>
<td><strong>AI による自律型セキュリティテスト</strong></td>
<td>アプリケーションに対する <strong>ペネトレーションテスト</strong>(オンデマンド)や設計・コードのセキュリティレビューを自動化するエージェント(フロンティアエージェント)</td>
</tr>
</tbody>
</table></div>
<h4>(2) GuardDuty の仕組み</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">項目</th>
<th scope="col">内容</th>
</tr>
</thead>
<tbody>
<tr>
<td>入力データ</td>
<td><strong>CloudTrail(管理 / データイベント)・VPC フローログ・DNS ログ</strong>。エージェントやログ設定の変更は <strong>不要</strong></td>
</tr>
<tr>
<td>保護プラン</td>
<td>S3、EKS、マルウェア対策(EBS)、RDS、Lambda、ランタイム監視 など(有効化して拡張)</td>
</tr>
<tr>
<td><strong>検出結果の重要度</strong></td>
<td>低 / 中 / 高(Critical を含む場合あり)</td>
</tr>
<tr>
<td>マルチアカウント</td>
<td><strong>委任管理者</strong> で組織全体を有効化・集約</td>
</tr>
</tbody>
</table></div>
<h4>(3) 検出 → 修復の流れ</h4>
<Diagram id="dg54" />

<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">検出例</th>
<th scope="col">一般的な対応</th>
</tr>
</thead>
<tbody>
<tr>
<td>GuardDuty: EC2 が不審な通信</td>
<td><strong>SG で隔離</strong>(通信を遮断するフォレンジック用 SG)、スナップショット取得、調査 → 再構築</td>
</tr>
<tr>
<td>GuardDuty: 漏洩した認証情報</td>
<td><strong>キーの無効化 / ロールの引き受け無効化</strong>(セッションの取り消し)、CloudTrail で影響範囲調査</td>
</tr>
<tr>
<td>Inspector: 脆弱性</td>
<td><strong>パッチ適用(Patch Manager)/ イメージ再ビルド(Image Builder)</strong>、脆弱なパッケージの更新</td>
</tr>
<tr>
<td>Config: 非準拠</td>
<td><strong>修復アクション</strong> で是正</td>
</tr>
<tr>
<td>Security Hub: 標準のスコア低下</td>
<td>失敗したコントロールの <strong>優先順位付け → 修復</strong></td>
</tr>
</tbody>
</table></div>
<h4>(4) Inspector の前提</h4>
<div className="table-wrap"><table>
<thead>
<tr>
<th scope="col">対象</th>
<th scope="col">前提</th>
</tr>
</thead>
<tbody>
<tr>
<td>EC2</td>
<td><strong>SSM エージェントが管理対象インスタンスとして動作</strong>(エージェントベースのスキャン)。エージェントレススキャンも選択可</td>
</tr>
<tr>
<td>ECR</td>
<td>プッシュ時 / 継続的にイメージをスキャン</td>
</tr>
<tr>
<td>Lambda</td>
<td>関数のコードと依存関係をスキャン</td>
</tr>
<tr>
<td>優先順位</td>
<td><strong>Inspector スコア</strong>(ネットワーク到達性やエクスプロイトの有無で調整)</td>
</tr>
</tbody>
</table></div>
<h4>(5) AWS Security Agent / AWS DevOps Agent について(学習上の位置づけ)</h4>
<p>AWS Security Agent は DevOps Agent と同時期(2026 年 3 月)に一般提供された、<strong>セキュリティテストを自律的・継続的に実行するエージェント</strong>です。公式スキル文に例示されているため名称と <strong>役割(AI によるペネトレーションテストの自動化)</strong> は覚えておきましょう。ただし試験の中心は <strong>Security Hub / GuardDuty / Config / Inspector の役割の区別と、検出結果をどう修復につなげるか</strong> です。</p>
<h4>(6) ベストプラクティス</h4>
<ul>
<li><strong>全リージョン・全アカウントで有効化</strong> し、<strong>委任管理者</strong> で一元管理</li>
<li><strong>Security Hub で集約</strong> し、優先度の高いものから対処</li>
<li><strong>EventBridge と自動修復</strong> をつなぐ(ただし重大な処置は承認を挟む)</li>
<li><strong>誤検知は抑制ルール</strong> で管理し、アラート疲れを防ぐ</li>
<li><strong>インシデント対応の手順(隔離 → 保全 → 調査 → 復旧)をランブック化</strong></li>
<li>検出結果を <strong>ダッシュボードで可視化</strong> し、定期的にレビューする</li>
</ul>
<h4>(7) 参考 URL</h4>
<ul>
<li>AWS Security Hub: <a href="https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html">https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html</a></li>
<li>Amazon GuardDuty: <a href="https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html">https://docs.aws.amazon.com/guardduty/latest/ug/what-is-guardduty.html</a></li>
<li>Amazon Inspector: <a href="https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html">https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html</a></li>
<li>AWS Security Agent / DevOps Agent の GA 報道(二次情報): <a href="https://letsdatascience.com/news/aws-releases-frontier-agents-for-security-and-devops-6a8d7387">https://letsdatascience.com/news/aws-releases-frontier-agents-for-security-and-devops-6a8d7387</a></li>
</ul>
        </>
    );
}
