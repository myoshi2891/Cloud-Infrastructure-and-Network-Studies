import PracticeOptions from "../PracticeOptions";
/** 原本の examprep セクション本文。 */
export default function ExamPrep() {
    return (<section className="guide-part" data-part="examprep">
    <h2 id={"7-理解度チェック演習問題"} tabIndex={-1}>{"7. 理解度チェック(演習問題)"}</h2>
    {"\n                "}
    <p>{"各問題の答えは "}<code>{"<details>"}</code>{" を開くと確認できます。"}</p>
    {"\n                "}
    <h3 id={"問題-1"} tabIndex={-1}>{"問題 1"}</h3>
    {"\n                "}
    <p>{"\n                    ある企業では、S3 バケットへの"}<strong>{"すべてのアクセスを TLS 1.2 以上に限定"}</strong>{"し、HTTP でのアクセスを拒否したい。最も適切な方法は?\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-1" answers={["B"]}>{"\n                    "}<li>{"A. CloudFront の Viewer Protocol Policy を設定する"}</li>{"\n                    "}<li>{"\n                        B. バケットポリシーで "}<code>{"aws:SecureTransport"}</code>{" が\n                        "}<code>{"false"}</code>{" のリクエストを Deny し、"}<code>{"s3:TlsVersion"}</code>{" が 1.2\n                        未満のリクエストも Deny する\n                    "}</li>{"\n                    "}<li>{"C. S3 のバケット既定暗号化を SSE-KMS にする"}</li>{"\n                    "}<li>{"D. VPC エンドポイントを作成する"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。転送中の暗号化を"}<strong>{"リソースポリシーで強制"}</strong>{"する定石です。A は\n                        CloudFront 経由のみに効果、C は保存時の暗号化、D\n                        はアクセス経路の制御で、いずれも TLS バージョンの強制ではありません。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <h3 id={"問題-2"} tabIndex={-1}>{"問題 2"}</h3>
    {"\n                "}
    <p>{"\n                    オンプレミスのデータセンターから Direct Connect 経由で S3\n                    に"}<strong>{"インターネットを通さず"}</strong>{"アクセスしたい。Gateway\n                    エンドポイントを作成したが、オンプレミスから利用できない。どうすべきか?\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-2" answers={["B"]}>{"\n                    "}<li>{"A. NAT ゲートウェイを追加する"}</li>{"\n                    "}<li>{"\n                        B. S3 用の\n                        "}<strong>{"Interface エンドポイント(PrivateLink)"}</strong>{"\n                        を作成し、プライベート IP 経由でアクセスする\n                    "}</li>{"\n                    "}<li>{"C. VPC ピアリングを設定する"}</li>{"\n                    "}<li>{"D. インターネットゲートウェイを追加する"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。Gateway エンドポイントは VPC\n                        内のルートテーブルで機能するため、"}<strong>{"オンプレミスから直接は利用できません"}</strong>{"。Interface\n                        エンドポイントは\n                        "}<strong>{"VPC 内のプライベート IP(ENI)"}</strong>{"を持つので、Direct Connect や\n                        VPN 経由で到達できます。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <h3 id={"問題-3"} tabIndex={-1}>{"問題 3"}</h3>
    {"\n                "}
    <p>{"\n                    規制により、"}<strong>{"ルートユーザーを含む誰も"}</strong>{"、7年間は S3\n                    オブジェクトを削除・上書きできないようにする必要がある。設定として正しいものは?(2つ選択)\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-3" answers={["A", "C"]}>{"\n                    "}<li>{"\n                        A. バケットで\n                        "}<strong>{"S3 Object Lock"}</strong>{" を有効にする(バージョニングが前提)\n                    "}</li>{"\n                    "}<li>{"B. "}<strong>{"ガバナンスモード"}</strong>{"で 7年の保持期間を設定する"}</li>{"\n                    "}<li>{"C. "}<strong>{"コンプライアンスモード"}</strong>{"で 7年の保持期間を設定する"}</li>{"\n                    "}<li>{"D. MFA Delete のみを有効にする"}</li>{"\n                    "}<li>{"E. バケットポリシーで Delete を Deny する"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"A と C"}</strong>{"。ルートユーザーも削除不可にできるのは"}<strong>{"コンプライアンスモード"}</strong>{"だけです。ガバナンスモードは特別権限で解除可能、バケットポリシーは変更可能なため\n                        WORM 要件を満たしません。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <h3 id={"問題-4"} tabIndex={-1}>{"問題 4"}</h3>
    {"\n                "}
    <p>{"\n                    ランサムウェア対策として、"}<strong>{"本番アカウントの管理者権限を攻撃者に奪われても"}</strong>{"、バックアップが破壊されない構成にしたい。最も適切なのは?\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-4" answers={["C"]}>{"\n                    "}<li>{"\n                        A. 同一アカウントの標準バックアップボールトにガバナンスモードの Vault Lock\n                        を設定する\n                    "}</li>{"\n                    "}<li>{"B. S3 クロスリージョンレプリケーションのみを使う"}</li>{"\n                    "}<li>{"\n                        C.\n                        "}<strong>{"論理的エアギャップボールト"}</strong>{"を使い、バックアップを本番とは分離された境界に保持する\n                    "}</li>{"\n                    "}<li>{"D. EBS スナップショットを手動で取得する"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"C"}</strong>{"。論理的エアギャップボールトは"}<strong>{"常にコンプライアンスモードの Vault Lock"}</strong>{"が適用され、本番アカウントの IAM 経路から分離されています。A\n                        はガバナンスモードで権限者が解除可能、B は削除の伝播リスク、D\n                        は運用が属人的で防御になりません。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <h3 id={"問題-5"} tabIndex={-1}>{"問題 5"}</h3>
    {"\n                "}
    <p>{"\n                    Amazon RDS for MySQL の本番 DB\n                    を暗号化していないことが判明した。"}<strong>{"最小のダウンタイム"}</strong>{"で暗号化するには?\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-5" answers={["C"]}>{"\n                    "}<li>{"A. コンソールで「暗号化を有効化」を選択する"}</li>{"\n                    "}<li>{"B. KMS キーポリシーを変更する"}</li>{"\n                    "}<li>{"\n                        C.\n                        スナップショットを取得し、"}<strong>{"暗号化を有効にしてコピー"}</strong>{"し、そこから新しい\n                        DB を復元して切り替える\n                    "}</li>{"\n                    "}<li>{"D. EBS 既定暗号化を有効化する"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"C"}</strong>{"。RDS\n                        は"}<strong>{"作成時にのみ"}</strong>{"暗号化を指定できます。既存 DB\n                        は「スナップショット → 暗号化コピー →\n                        復元」で暗号化します。ダウンタイムを減らすには、復元後に"}<strong>{"レプリケーションや DMS"}</strong>{"で差分を追従させる手法もあります。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <h3 id={"問題-6"} tabIndex={-1}>{"問題 6"}</h3>
    {"\n                "}
    <p>{"\n                    DB 認証情報を Secrets Manager\n                    で管理し、"}<strong>{"ダウンタイムなし"}</strong>{"で定期的にローテーションしたい。適切な戦略は?\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-6" answers={["B"]}>{"\n                    "}<li>{"A. 単一ユーザー戦略"}</li>{"\n                    "}<li>{"B. 交互ユーザー(Alternating users)戦略"}</li>{"\n                    "}<li>{"C. 手動でパスワードを変更"}</li>{"\n                    "}<li>{"D. Parameter Store の SecureString を使用"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。2つのユーザーを交互に更新するため、"}<strong>{"更新中でも有効な認証情報が常に存在"}</strong>{"します。単一ユーザーは更新の瞬間に旧パスワードが無効になる影響があり、Parameter\n                        Store には"}<strong>{"組み込みのローテーション機能がありません"}</strong>{"。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <h3 id={"問題-7"} tabIndex={-1}>{"問題 7"}</h3>
    {"\n                "}
    <p>{"\n                    ある企業が、"}<strong>{"自社で生成した鍵素材"}</strong>{"を KMS\n                    に取り込んで使っている。コンプライアンス上、"}<strong>{"素材を定期的に入れ替え"}</strong>{"つつ、"}<strong>{"既存データを再暗号化せず"}</strong>{"、"}<strong>{"キー ARN も変更しない"}</strong>{"ことが求められる。最適な方法は?\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-7" answers={["B"]}>{"\n                    "}<li>{"A. 自動ローテーションを有効化する"}</li>{"\n                    "}<li>{"\n                        B. 新しい鍵素材をインポートし(Pending\n                        rotation)、"}<strong>{"オンデマンドローテーション"}</strong>{"を実行する\n                    "}</li>{"\n                    "}<li>{"C. 新しい KMS キーを作り、全データを再暗号化する"}</li>{"\n                    "}<li>{"D. キーを削除して再作成する"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。インポート素材の KMS\n                        キーは"}<strong>{"自動ローテーション不可"}</strong>{"ですが、2025年6月から"}<strong>{"オンデマンドローテーション"}</strong>{"に対応しました。キー\n                        ARN・エイリアスを維持し、既存データも引き続き復号できます。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
    <h3 id={"問題-8"} tabIndex={-1}>{"問題 8"}</h3>
    {"\n                "}
    <p>{"\n                    アプリケーションログに顧客のメールアドレスとクレジットカード番号が混入する恐れがある。"}<strong>{"ログ取り込み時に自動でマスク"}</strong>{"し、"}<strong>{"権限のある一部のセキュリティ担当だけ"}</strong>{"が元の値を確認できるようにしたい。\n                "}</p>
    {"\n                "}
    <PracticeOptions questionId="問題-8" answers={["B"]}>{"\n                    "}<li>{"A. Amazon Macie をロググループに設定する"}</li>{"\n                    "}<li>{"\n                        B.\n                        "}<strong>{"CloudWatch Logs のデータ保護ポリシー"}</strong>{"(Deidentify)を設定し、"}<code>{"logs:Unmask"}</code>{"\n                        を限定したロールにのみ付与する\n                    "}</li>{"\n                    "}<li>{"C. ログ保持期間を短くする"}</li>{"\n                    "}<li>{"D. ロググループを KMS で暗号化する"}</li>{"\n                "}</PracticeOptions>
    {"\n                "}
    <details>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。マスクは CloudWatch Logs\n                        のデータ保護ポリシー、元の値の表示は\n                        "}<code>{"logs:Unmask"}</code>{" で制御します。Macie は"}<strong>{"S3 内の機密データ発見"}</strong>{"が主用途、KMS\n                        暗号化は保存時の保護でログ閲覧者に対するマスキングではありません。\n                    "}</p>{"\n                "}</details>
    {"\n                "}
        </section>);
}
