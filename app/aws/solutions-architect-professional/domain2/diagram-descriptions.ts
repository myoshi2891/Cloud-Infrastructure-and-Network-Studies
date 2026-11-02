/**
 * 全図のテキスト代替。図の構成要素・分岐・ループを文章で説明し、aria-describedby で各図へ関連付ける。
 * 生成スクリプト（scripts/migrate-sap-domain2.mjs）の対象外で、再生成しても保持される。
 */
export const DIAGRAM_DESCRIPTIONS: Record<string, string> = {
    'diag-0': 'Domain 2 から6つのタスクへ分岐する。Task 2.1 デプロイ戦略（運用上の優秀性）、Task 2.2 ビジネス継続性（信頼性・DR）、Task 2.3 セキュリティ統制（セキュリティ）、Task 2.4 信頼性要件（信頼性・可用性）、Task 2.5 パフォーマンス目標（パフォーマンス効率）、Task 2.6 コスト最適化（コスト最適化）。',
    'diag-1': 'CodeCommit または GitHub のコード変更が、CodePipeline の Source、CodeBuild のビルドとテスト、CodeDeploy または CloudFormation のデプロイへ順に進む。CloudWatch アラームによるヘルスチェックで、正常なら本番反映完了、異常なら自動ロールバックに分岐する。',
    'diag-2': 'ユーザーのリクエストを ALB の加重ターゲットグループがリクエスト単位で分散し、90 パーセントを Blue 環境の現行バージョン、10 パーセントを Green 環境の新バージョンへ送る。Green をアラームで監視し、問題がなければ 100 パーセントを Green へ移し、問題があれば Blue へ即時に切り戻す。',
    'diag-3': '依存関係と要件の現状把握、非重要ワークロードでの小さな開始、新旧を同時に運用する並行稼働、加重ルーティングによる段階的な切り替え、ロールバック期間後の旧環境の撤去の順に進む移行経路。',
    'diag-4': 'AWS グローバルインフラは、地理的に離れた独立した地域であるリージョン、CloudFront などの配信拠点であるエッジロケーション、ユーザーの近くへ拡張する Local Zones と Wavelength に分かれる。リージョンの中には、それぞれ独立した拠点であるアベイラビリティゾーンがある。',
    'diag-5': '時間の流れに沿って、最後のバックアップまたは複製の時点から障害発生までが RPO（失ってよいデータの期間）、障害発生からサービス復旧までが RTO（復旧までに許容できる時間）であることを示す。',
    'diag-6': 'RTO と RPO を個別に評価し、厳しい方の目標から順に判定する。どちらかがほぼゼロならマルチサイト Active/Active、どちらかが分単位ならウォームスタンバイ、どちらかが数十分程度ならパイロットライト、両方とも数時間以上でよければバックアップとリストアを選ぶ。',
    'diag-7': 'ユーザーのリクエストを Route 53 のフェイルオーバーポリシーで振り分ける。ヘルスチェックがプライマリ環境（東京リージョン）を監視し、正常時はプライマリへ、異常を検知したらセカンダリ環境（大阪リージョン）へ送る。',
    'diag-8': 'リクエストに明示的な Deny があれば拒否する。なければ Organizations の SCP や権限境界の許可範囲内かを確認し、範囲外なら拒否する。範囲内で、アイデンティティベースまたはリソースベースのポリシーに Allow があれば許可し、なければ拒否する。',
    'diag-9': 'インターネットからの通信はパブリックサブネットの ALB に届く。セキュリティグループで ALB からの 443 番だけを許可したプライベートサブネットのアプリ層へ進み、さらにアプリ層からの 3306 番だけを許可したプライベートサブネットの DB 層へ流れる。',
    'diag-10': '保存時の暗号化では、AWS KMS のカスタマー管理キーを S3 の SSE-KMS、EBS 暗号化、RDS 暗号化に使う。転送時の暗号化では、AWS Certificate Manager の証明書で CloudFront と ALB が TLS を提供する。',
    'diag-11': 'プライベートサブネットの EC2 は、ルートテーブル経由のゲートウェイエンドポイントで Amazon S3 へ、ENI 経由のインターフェースエンドポイントで Systems Manager などへ、インターネットを経由せずに接続する。',
    'diag-12': 'ユーザーと攻撃者の通信が、Shield で DNS を保護する Route 53、Shield と WAF でエッジで攻撃を吸収する CloudFront、WAF を適用した ALB、Auto Scaling の EC2 またはコンテナ、プライベートサブネットのデータ層の順に通る多層防御。',
    'diag-13': 'ユーザーから Route 53 と、複数 AZ に配置した ALB を経て、AZ-a と AZ-c の Auto Scaling の EC2 へ分散する。両方の EC2 は AZ-a の Aurora ライターに接続し、ライターは AZ-c の Aurora リーダーへレプリケーションする。',
    'diag-14': '注文受付 API が Amazon SNS トピックへ発行し、決済処理・在庫更新・通知の3つの SQS キューへファンアウトする。決済と在庫は Auto Scaling のワーカー、通知は Lambda が処理する。決済処理キューで失敗を繰り返したメッセージはデッドレターキューへ移る。',
    'diag-15': 'データの種類で分岐する。画像・動画・ログなどのオブジェクトは Amazon S3、OS 起動や DB のブロックは Amazon EBS か、一時データ向けで超高速なインスタンスストア、共有ファイルは Linux NFS の Amazon EFS か、Windows・Lustre・ONTAP・OpenZFS 向けの Amazon FSx を選ぶ。',
    'diag-16': 'データとアクセスの特徴で7つに分岐する。複雑な結合と ACID のリレーショナルは RDS または Aurora、キーによる大規模なミリ秒アクセスは DynamoDB、マイクロ秒のインメモリは ElastiCache または MemoryDB、関係性のグラフは Neptune、時系列は Timestream for InfluxDB（LiveAnalytics は既存顧客のみ）、分析用 DWH は Redshift、全文検索とログ分析は OpenSearch Service。',
    'diag-17': 'ユーザーからエッジキャッシュの CloudFront と ALB を経てアプリへ届く。アプリは ElastiCache をアプリ側キャッシュに使う。書き込みは RDS Proxy のデフォルトエンドポイントから Aurora DB クラスターのライターインスタンスへ、読み取りは読み取り専用エンドポイントから Aurora レプリカへ送る。処理のバッファには SQS または Kinesis を使う。',
    'diag-18': '設計前に Pricing Calculator で見積もり、運用中は Cost Explorer で分析し、Budgets と Anomaly Detection で統制し、Compute Optimizer と Trusted Advisor で最適化して、再び分析へ戻る継続的なサイクル。',
    'diag-19': '中断されても再実行できるならスポットインスタンス。できない場合、1年以上安定して使わないならオンデマンド。安定して使い、インスタンス構成が変わる可能性があれば Compute Savings Plans またはコンバーチブル RI、構成が固定なら EC2 Instance Savings Plans またはスタンダード RI を選ぶ。',
    'diag-20': '128 KiB 以上のオブジェクトは S3 Standard から、作成から30日後に Standard-IA、作成から90日後に Glacier Flexible Retrieval、作成から365日後に Glacier Deep Archive へ移り、作成から7年後に削除される。日数はいずれも直前のクラスへ移った日ではなくオブジェクトの作成日から数える。128 KiB 未満のオブジェクトは既定では移行せず、Standard のまま作成から7年後に削除される。',
    'diag-21': 'データ転送コストを下げる5つの方法。S3 と DynamoDB へのゲートウェイエンドポイント、CloudFront のキャッシュによるオリジン転送の削減、同一 AZ 内で完結させて AZ 間通信を減らす設計、データの圧縮による不要な転送の回避、大量転送での Direct Connect や Snow ファミリーの検討。',
    'diag-22': '公式試験ガイドで範囲を確認し、本ガイドで概念と比較表を理解し、Well-Architected の各柱を読み、ハンズオンで実際に構築し、模擬問題で最適化キーワードを練習し、弱点を公式ドキュメントで補強する、6段階の学習ステップ。',
};
