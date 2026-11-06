/**
 * 全図のテキスト代替。図の構成要素・分岐・フィードバックループを文章で説明し、aria-describedby で各図へ関連付ける。
 * 生成スクリプト（scripts/migrate-sap-domain4.mjs）の対象外で、再生成しても保持される。
 */
export const DIAGRAM_DESCRIPTIONS: Record<string, string> = {
    'diag-0': 'Task 4.1 何を移すか決める、Task 4.2 どう運ぶか決める、Task 4.3 移行先の部品を決める、Task 4.4 作り変えて価値を高めるの順に進み、次の波へ戻って反復するDomain 4全体の移行サイクル。',
    'diag-1': '現状を評価するAssess、体制と基盤を整えるMobilize、実際に移行と最新化を推進するMigrate and Modernizeの順に進むAWS大規模移行の3つの主要フェーズ。',
    'diag-2': 'アプリを評価し、不要ならRetire、規制等で残すならRetain、SaaS代替ならRepurchase、期限優先ならRelocateまたはRehost、クラウド価値を狙うならReplatformまたはRefactorへと導く7Rsの決定木。',
    'diag-3': '低リスクで手順を確立するパイロットから、第1波（独立性の高いアプリ）、第2波（依存関係のある業務アプリ）、第3波（基幹や複雑なアプリ）へと段階的に進めるウェーブ計画の進行図。',
    'diag-4': '回線許容期間でSnow Familyかネットワークかを判断し、プロトコルに応じてTransfer Family、DataSync、S3 CLI、S3 Transfer Acceleration、Storage Gatewayを分岐して選ぶデータ転送サービスの選択フロー。',
    'diag-5': 'ソースサーバーにエージェントを導入し、ブロックレベルで継続レプリケーションして軽量EC2・EBSに保存、テスト検証後にカットオーバーインスタンスを起動しファイナライズするMGNの移行手順。',
    'diag-6': 'エンジンが同じ同種移行ならDMSまたはネイティブツール、異種移行ならSCTでスキーマとコードを変換してからDMSで移行し、いずれも検証とカットオーバーへ合流するデータベース移行アプローチ。',
    'diag-7': '即時利用ならVPN、大量・安定通信ならDirect Connectを選び、暗号化や冗長性要件に応じてDirect ConnectへのVPN併用かDirect Connect単体かを決定するネットワーク接続フロー。',
    'diag-8': 'アプリがAD機能を深く使うならManaged Microsoft AD、AWS側にディレクトリを持たないならAD Connectorを選び、いずれもIAM Identity Centerでシングルサインオンを実現するID基盤の構成図。',
    'diag-9': 'OS制御が必要ならEC2、コンテナならコンテナ基盤、Webアプリを小変更でマネージド化するならElastic Beanstalk、イベント駆動短時間処理ならLambdaを選ぶコンピュート選択の決定木。',
    'diag-10': 'Kubernetes必須ならEKS、最も簡単に公開したいならECS Express Mode、その他はECSを選び、ノード管理不要ならFargate、GPUや特殊要件ならEC2起動タイプを選ぶコンテナホスティングの決定木。',
    'diag-11': 'アクセス方式に応じて、OS・DB領域はEBS、Linux共有はEFS、Windows共有はFSx for Windows、HPCはFSx for Lustre、NetAppはFSx for NetApp ONTAP、オブジェクトAPIはS3、iSCSIはVolume Gatewayを選ぶストレージ決定木。',
    'diag-12': 'リレーショナルで完全制御ならEC2自己管理、一部制御ならRDS Custom、高性能商用置換ならAurora、標準ならRDSを選び、非リレーショナルで検索ならOpenSearch、その他ならDynamoDBを選ぶデータベース決定木。',
    'diag-13': 'API GatewayやALBなどのファサードが利用者のリクエストを受け、未移行機能は既存モノリスへ、移行済み機能は新サービスへ振り分け、段階的に置き換えていくストラングラーフィグパターンの構成図。',
    'diag-14': '既存メッセージプロトコル維持ならAmazon MQ、ワークフロー順序制御ならStep Functions、複数先への通知ならSNS、ルール振り分けならEventBridge、バッファならSQSを選ぶ疎結合統合サービスの決定木。',
    'diag-15': '注文サービスから発行されたメッセージをSNSトピックが受け、在庫・請求・通知の各SQSキューに並行配信し、それぞれのLambdaが非同期処理を実行するファンアウトパターンの構成図。',
};
