/** 原本の examprep セクション本文。 */
export default function ExamPrep() {
    return (<section className="guide-part" data-part="examprep">
    <h2 id={"13-練習問題-確認テスト"} tabIndex={-1}>{"13. 練習問題 (確認テスト)"}</h2>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q1."}</strong>{" 従業員が複数の AWS アカウントに、会社の外部 IdP\n                    でサインインしたい。長期の IAM ユーザーは作りたくない。最も適切な設計は?\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        IAM Identity Center の ID ソースに外部 IdP (SAML 2.0) を設定し、SCIM\n                        でユーザーとグループを同期する。許可セットをグループに割り当てる。IAM\n                        ユーザーは作らず、各アカウントに自動作成されるロールを一時認証情報で引き受ける。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q2."}</strong>{"\n                    モバイルアプリのサインインしたユーザーに、自分のフォルダだけを S3\n                    で読み書きさせたい。必要な構成は?\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        Cognito ユーザープールで認証し、ID プールで JWT を AWS\n                        の一時認証情報に交換する。認証済みロールの IAM ポリシーで、Cognito ID\n                        を含むプレフィックス ("}<code>{"${cognito-identity.amazonaws.com:sub}"}</code>{")\n                        に限定する。未認証アクセスは無効にする。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q3."}</strong>{" 開発者に IAM\n                    ロールの作成を許可したいが、管理者権限を持つロールを作って昇格されたくない。どうする?\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        開発者の許可に\n                        "}<code>{"iam:PermissionsBoundary"}</code>{"\n                        条件を付け、指定の境界ポリシーが付いたロールしか作成できないようにする。境界ポリシーの削除や変更を拒否するステートメントも加える。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q4."}</strong>{" 第三者の SaaS\n                    事業者にクロスアカウントのロールを引き受けさせる。混乱した代理人問題への対策は?\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        ロールの信頼ポリシーに\n                        "}<code>{"sts:ExternalId"}</code>{" 条件を設定し、事業者が顧客ごとに一意の外部 ID\n                        を使うようにする。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q5."}</strong>{"\n                    開発チームの権限を「実際に使った操作」だけに絞りたい。もっとも効率的な方法は?\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        IAM Access Analyzer のポリシー生成で、CloudTrail の実際のアクティビティ\n                        (最大 90 日) から最小権限のポリシーを生成する。ただし S3\n                        のデータイベントなどのアクションレベルの履歴や\n                        "}<code>{"iam:PassRole"}</code>{"\n                        は生成されたポリシーに含まれないため、必要な権限が欠けていないかを確認して追加してから既存ポリシーと置き換える。さらに未使用アクセスアナライザーで未使用の権限を検出して削除する。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q6."}</strong>{"\n                    プロジェクトが頻繁に増えるが、そのたびにポリシーを書き換えたくない。「自分のプロジェクトのリソースだけ操作できる」ようにしたい。\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        ABAC を採用する。ポリシーで "}<code>{"aws:ResourceTag/project"}</code>{" と\n                        "}<code>{"${aws:PrincipalTag/project}"}</code>{"\n                        の一致を条件にする。タグの付与と変更権限は厳しく制限する。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q7."}</strong>{" ユーザーに S3\n                    の許可を付けたのに、クロスアカウントのバケットにアクセスできない。確認すべきことは?\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        クロスアカウントでは、アクセス元の ID\n                        ベースポリシーとバケット側のバケットポリシーの両方が許可している必要がある。加えて、KMS\n                        で暗号化されている場合はキーポリシーの許可、SCP や RCP、VPC\n                        エンドポイントポリシーによる拒否も確認する。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <p>{"\n                    "}<strong>{"Q8."}</strong>{" EC2 のオペレーションで「Encoded authorization failure\n                    message」が返った。原因を調べるには?\n                "}</p>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えを見る"}</summary>{"\n                    "}<p>{"\n                        "}<code>{"sts:DecodeAuthorizationMessage"}</code>{" で復号する\n                        (復号するための権限が必要)。復号結果から、拒否したポリシーの種類と対象のアクションを確認する。\n                    "}</p>{"\n                "}</details>
    {"\n\n                "}
        </section>);
}
