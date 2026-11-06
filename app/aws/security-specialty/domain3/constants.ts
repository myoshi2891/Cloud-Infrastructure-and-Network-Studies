export type DiagramId = keyof typeof DIAGRAMS;

export const DIAGRAMS = {
    "diag-0": "flowchart TB\nD3[\"Domain 3<br/>Infrastructure Security\"]\nT1[\"Task 3.1<br/>ネットワークエッジ\"]\nT2[\"Task 3.2<br/>コンピュート\"]\nT3[\"Task 3.3<br/>ネットワーク制御\"]\nD3 --> T1\nD3 --> T2\nD3 --> T3\nT1 --> S11[\"3.1.1 エッジ戦略の選定\"]\nT1 --> S12[\"3.1.2 エッジ保護の実装\"]\nT1 --> S13[\"3.1.3 エッジルールの設計\"]\nT1 --> S14[\"3.1.4 外部サービス連携\"]\nT2 --> S21[\"3.2.1 堅牢化 AMI とイメージ\"]\nT2 --> S22[\"3.2.2 ロールの適切な適用\"]\nT2 --> S23[\"3.2.3 脆弱性スキャン\"]\nT2 --> S24[\"3.2.4 パッチ適用の自動化\"]\nT2 --> S25[\"3.2.5 安全な管理アクセス\"]\nT2 --> S26[\"3.2.6 パイプライン内の脆弱性検出\"]\nT2 --> S27[\"3.2.7 生成 AI の保護\"]\nT3 --> S31[\"3.3.1 SG・NACL・Network Firewall\"]\nT3 --> S32[\"3.3.2 ハイブリッド接続\"]\nT3 --> S33[\"3.3.3 ハイブリッドの要件\"]\nT3 --> S34[\"3.3.4 ネットワーク分離\"]\nT3 --> S35[\"3.3.5 不要なアクセスの特定\"]",
    "diag-1": "flowchart LR\nU[\"ユーザー / 攻撃者\"] --> L1[\"層1 エッジ<br/>Shield, WAF, CloudFront\"]\nL1 --> L2[\"層2 ネットワーク境界<br/>NACL, Network Firewall\"]\nL2 --> L3[\"層3 ワークロード境界<br/>セキュリティグループ\"]\nL3 --> L4[\"層4 ホスト<br/>堅牢化 AMI, パッチ, Inspector\"]\nL4 --> L5[\"層5 アプリ・データ<br/>実行ロール, 暗号化\"]",
    "diag-2": "flowchart TB\nC[\"クライアント\"] --> R53[\"Route 53<br/>DNS(Shield Advanced 対象)\"]\nR53 --> CF[\"CloudFront<br/>TLS 終端・キャッシュ・ジオ制限\"]\nCF --> WAF1[\"AWS WAF<br/>Web ACL\"]\nWAF1 --> ALB[\"Application Load Balancer<br/>(CloudFront からのみ許可)\"]\nALB --> APP[\"アプリケーション<br/>プライベートサブネット\"]\nSH[\"AWS Shield<br/>L3/L4 DDoS 対策\"] -.保護.-> CF\nSH -.保護.-> ALB",
    "diag-3": "flowchart TD\nA[\"脅威を特定する\"] --> B{\"攻撃の層は?\"}\nB -->|\"L3 / L4 ネットワーク層\"| C[\"Shield Standard で自動緩和\"]\nC --> C2{\"高い可用性要件や<br/>コスト保護が必要?\"}\nC2 -->|\"はい\"| C3[\"Shield Advanced を追加\"]\nC2 -->|\"いいえ\"| C4[\"Standard のまま\"]\nB -->|\"L7 アプリケーション層\"| D{\"どの攻撃?\"}\nD -->|\"インジェクション系\"| E[\"WAF マネージドルール\"]\nD -->|\"ボット\"| F[\"WAF Bot Control\"]\nD -->|\"リクエスト過多\"| G[\"WAF レートベースルール\"]\nD -->|\"特定地域\"| H[\"地理制限 / ジオ一致ルール\"]",
    "diag-4": "flowchart LR\nI[\"インターネット\"] --> CF[\"CloudFront\"]\nCF -->|\"OAC + 署名付きリクエスト\"| S3[\"S3 バケット<br/>CloudFront からのみ許可\"]\nCF -->|\"カスタムヘッダー<br/>+ CloudFront プレフィックスリスト\"| ALB[\"ALB<br/>SG は CloudFront のみ許可\"]\nI -.直接アクセスは拒否.-> S3\nI -.直接アクセスは拒否.-> ALB",
    "diag-5": "flowchart TD\nREQ[\"リクエスト到着\"] --> P1[\"優先度の小さいルールから順に評価\"]\nP1 --> M{\"ルールに一致?\"}\nM -->|\"Allow\"| ALLOW[\"許可して評価終了\"]\nM -->|\"Block\"| BLOCK[\"ブロックして評価終了\"]\nM -->|\"Count\"| CNT[\"カウントして次のルールへ\"]\nCNT --> P1\nM -->|\"CAPTCHA / Challenge\"| CH[\"チャレンジ実施\"]\nM -->|\"不一致\"| NEXT[\"次のルールへ\"]\nNEXT --> P1\nNEXT --> DEF[\"全ルール不一致ならデフォルトアクション\"]",
    "diag-6": "flowchart LR\nA[\"AWS サービスのログ<br/>CloudTrail, VPC Flow Logs, WAF など\"] --> SL[\"Amazon Security Lake\"]\nSL -->|\"OCSF 形式に正規化<br/>Parquet で S3 に保存\"| S3[\"S3 データレイク\"]\nB[\"サードパーティのセキュリティ製品\"] --> CONV[\"ソース側で OCSF に変換<br/>Parquet で出力\"]\nCONV -->|\"カスタムソースの<br/>S3 の場所へ書き込み\"| S3\nS3 --> ATH[\"Athena で分析\"]\nS3 --> SIEM[\"SIEM / 分析ツール(サブスクライバー)\"]",
    "diag-7": "flowchart LR\nB[\"ビルド<br/>堅牢化 AMI<br/>コンテナイメージ\"] --> D[\"デプロイ<br/>ロールで権限付与\"]\nD --> R[\"ランタイム<br/>Inspector / GuardDuty\"]\nR --> P[\"運用<br/>Patch Manager\"]\nP --> A[\"管理アクセス<br/>Session Manager\"]\nA -.脆弱性を発見したらビルドに戻る.-> B",
    "diag-8": "flowchart TD\nBASE[\"ベースイメージ<br/>(最新の公式 AMI など)\"] --> BUILD[\"ビルドコンポーネント<br/>堅牢化・ツール導入\"]\nBUILD --> TEST[\"テストコンポーネント<br/>設定検証・脆弱性スキャン\"]\nTEST --> OK{\"合格?\"}\nOK -->|\"はい\"| DIST[\"配布設定<br/>複数リージョン・アカウントへ共有\"]\nOK -->|\"いいえ\"| FAIL[\"パイプライン失敗<br/>通知して修正\"]\nDIST --> USE[\"起動テンプレート / Auto Scaling が新 AMI を使用\"]",
    "diag-9": "flowchart TD\nQ[\"どのコンピュート?\"] --> E[\"EC2\"]\nQ --> L[\"Lambda\"]\nQ --> C[\"ECS\"]\nQ --> K[\"EKS\"]\nE --> E1[\"インスタンスプロファイル<br/>(IAM ロールをアタッチ)\"]\nL --> L1[\"実行ロール\"]\nC --> C1[\"タスクロール(アプリ用)<br/>タスク実行ロール(ECS 基盤用)\"]\nK --> K1[\"IRSA または Pod Identity<br/>(Pod 単位の権限)\"]",
    "diag-10": "flowchart TD\nBL[\"パッチベースライン<br/>承認ルールを定義\"] --> PG[\"パッチグループ<br/>タグで対象を分ける\"]\nPG --> MW[\"メンテナンスウィンドウ<br/>実行日時を指定\"]\nMW --> RUN[\"AWS-RunPatchBaseline<br/>Scan / Install\"]\nRUN --> RPT[\"コンプライアンスレポート\"]\nRPT --> INS[\"Amazon Inspector で再スキャン<br/>(継続的検証)\"]\nINS -->|\"未修正の脆弱性あり\"| BL",
    "diag-11": "flowchart LR\nU[\"管理者(IAM / SSO で認証)\"] -->|\"ssm:StartSession\"| SSM[\"Systems Manager サービス\"]\nSSM -->|\"SSM Agent が外向きに接続済み\"| EC2[\"EC2(プライベートサブネット)<br/>インバウンドポート 0\"]\nSSM -.セッションログ.-> LOG[\"CloudWatch Logs / S3\"]\nSSM -.API 記録.-> CT[\"CloudTrail\"]",
    "diag-12": "flowchart LR\nDEV[\"開発者が<br/>コードを書く\"] --> IDE[\"IDE 内スキャン<br/>(Amazon Q Developer)\"]\nIDE --> PR[\"プルリクエスト\"]\nPR --> CI[\"CI/CD パイプライン\"]\nCI --> SAST[\"静的解析 SAST<br/>(Inspector コードセキュリティ<br/>/ Amazon Q Developer)\"]\nCI --> SCA[\"依存関係スキャン SCA\"]\nCI --> IMG[\"コンテナイメージスキャン<br/>(ECR + Inspector)\"]\nSAST --> GATE{\"重大な問題?\"}\nSCA --> GATE\nIMG --> GATE\nGATE -->|\"あり\"| STOP[\"ビルド失敗<br/>修正を要求\"]\nGATE -->|\"なし\"| DEPLOY[\"デプロイ\"]",
    "diag-13": "flowchart LR\nU[\"ユーザー入力\"] --> G1[\"Guardrails<br/>入力チェック\"]\nG1 -->|\"違反\"| BLK1[\"ブロック / 定型文を返す\"]\nG1 -->|\"OK\"| M[\"基盤モデル<br/>Amazon Bedrock\"]\nM --> G2[\"Guardrails<br/>出力チェック\"]\nG2 -->|\"違反\"| BLK2[\"ブロック / マスク\"]\nG2 -->|\"OK\"| R[\"ユーザーへ回答\"]",
    "diag-14": "flowchart LR\nIN[\"インターネット\"] --> IGW[\"インターネットゲートウェイ\"]\nIGW --> NACL1[\"NACL<br/>(サブネット境界・ステートレス)\"]\nNACL1 --> SG[\"セキュリティグループ<br/>(ENI・ステートフル)\"]\nSG --> EC2[\"EC2 インスタンス\"]\nEC2 -->|\"戻り通信\"| SG\nSG --> NACL2[\"NACL<br/>(戻りのエフェメラルポートも許可が必要)\"]\nNACL2 --> IGW",
    "diag-15": "flowchart TB\nsubgraph SPOKE[\"スポーク VPC 群\"]\nA[\"VPC A<br/>ワークロード\"]\nB[\"VPC B<br/>ワークロード\"]\nend\nTGW[\"Transit Gateway\"]\nsubgraph INSPECT[\"検査用 VPC\"]\nFW[\"Network Firewall<br/>エンドポイント\"]\nNAT[\"NAT ゲートウェイ\"]\nend\nA --> TGW\nB --> TGW\nTGW --> FW\nFW --> NAT\nNAT --> IGW[\"インターネットゲートウェイ\"]",
    "diag-16": "flowchart TD\nS{\"接続要件は?\"} -->|\"とにかく早く・低コスト\"| V[\"Site-to-Site VPN\"]\nS -->|\"大容量・安定・閉域\"| D[\"Direct Connect\"]\nD --> E{\"暗号化が必要?\"}\nE -->|\"回線区間をレイヤー2で暗号化\"| M[\"MACsec\"]\nE -->|\"エンドツーエンドで IPsec\"| VP[\"DX 上の Site-to-Site VPN\"]\nE -->|\"不要\"| DONLY[\"DX のみ\"]\nS -->|\"高可用性\"| HA[\"DX + VPN のバックアップ<br/>複数ロケーション DX\"]",
    "diag-17": "flowchart LR\nU[\"社員のブラウザ\"] --> VA[\"Verified Access エンドポイント\"]\nVA --> IDP[\"ID プロバイダー<br/>IAM Identity Center / OIDC\"]\nVA --> DEV[\"デバイス信頼プロバイダー<br/>(デバイスの状態)\"]\nVA --> POL{\"Cedar ポリシーで評価<br/>ID + デバイス + コンテキスト\"}\nPOL -->|\"許可\"| APP[\"社内アプリ<br/>プライベートサブネット\"]\nPOL -->|\"拒否\"| DENY[\"アクセス拒否\"]",
    "diag-18": "flowchart TB\nNET[\"インターネット\"] --> ALB\nsubgraph PUB[\"パブリックサブネット\"]\nALB[\"ALB\"]\nNATGW[\"NAT ゲートウェイ\"]\nend\nsubgraph PRIV[\"プライベートサブネット\"]\nAPP[\"アプリ層\"]\nend\nsubgraph ISO[\"分離サブネット\"]\nDB[\"データベース層\"]\nVPCE[\"VPC エンドポイント\"]\nend\nALB -->|\"SG 参照で許可\"| APP\nAPP -->|\"SG 参照で許可\"| DB\nAPP --> NATGW\nAPP --> VPCE",
    "diag-19": "flowchart TD\nQ[\"調べたいこと\"] --> A{\"目的は?\"}\nA -->|\"あってはならない経路が<br/>存在しないか確認\"| NAA[\"Network Access Analyzer\"]\nA -->|\"特定の 2 点間が<br/>なぜ通信できない\"| RA[\"Reachability Analyzer\"]\nA -->|\"EC2 の公開ポートを<br/>洗い出す\"| INS[\"Inspector 到達性の検出結果\"]\nA -->|\"実際の通信を確認\"| FL[\"VPC Flow Logs\"]",
    "diag-20": "flowchart TD\nS[\"接続できない\"] --> R{\"ルートテーブルに<br/>宛先への経路がある?\"}\nR -->|\"ない\"| FIXR[\"ルート追加<br/>(IGW / NAT / TGW / ピアリング)\"]\nR -->|\"ある\"| SGO{\"送信元の SG の<br/>アウトバウンドが許可?\"}\nSGO -->|\"拒否\"| FIXS1[\"アウトバウンドルールを追加\"]\nSGO -->|\"許可\"| NACLO{\"送信元サブネットの NACL<br/>アウトバウンド許可?\"}\nNACLO -->|\"拒否\"| FIXN1[\"NACL を修正\"]\nNACLO -->|\"許可\"| NACLI{\"宛先サブネットの NACL<br/>インバウンド許可?<br/>戻りのエフェメラルポートも許可?\"}\nNACLI -->|\"拒否\"| FIXN2[\"NACL を修正\"]\nNACLI -->|\"許可\"| SGI{\"宛先の SG の<br/>インバウンドが許可?\"}\nSGI -->|\"拒否\"| FIXS2[\"インバウンドルールを追加\"]\nSGI -->|\"許可\"| OS[\"OS ファイアウォール / アプリの待受 / DNS を確認\"]"
} as const satisfies Record<string, string>;

export const DIAGRAM_DESCRIPTIONS: Record<DiagramId, string> = {
    "diag-0": "Task 3.1 ネットワークエッジ、Task 3.2 コンピュートワークロード、Task 3.3 ネットワークセキュリティ制御の3つのタスクと16のスキルの階層構造を表すDomain 3の全体像。",
    "diag-1": "ユーザーや攻撃者からの通信が、層1エッジ（Shield, WAF, CloudFront）、層2ネットワーク境界（NACL, Network Firewall）、層3ワークロード境界（セキュリティグループ）、層4ホスト（堅牢化AMI, パッチ, Inspector）、層5アプリ・データ（実行ロール, 暗号化）を順に通過する多層防御の概念図。",
    "diag-2": "クライアントからRoute 53、CloudFront、AWS WAF、CloudFrontからのみ許可するALBを経てプライベートサブネットのアプリケーションへ至り、AWS ShieldがCloudFrontとALBを保護するエッジ防御全体のアーキテクチャ図。",
    "diag-3": "脅威を特定し、攻撃の層（L3/L4かL7か）や要件に応じてShield Standard、Shield Advanced、WAF、レート制限、マネージドルールを選定するフロー。",
    "diag-4": "カスタムヘッダー検証によるALBオリジン保護と、OACによるS3オリジン保護でCloudFrontの直接迂回を遮断する設計フロー。",
    "diag-5": "リクエスト到着から優先度順のルール評価、カウント・ブロック・許可のアクション判定、およびデフォルトアクションへのフォールバックを示すWAF評価フロー。",
    "diag-6": "CloudTrailやVPC Flow LogsなどのログをOCSF標準スキーマに変換してSecurity Lakeに集約し、サードパーティSIEMで分析する統合フロー。",
    "diag-7": "ビルド時の堅牢化AMIとコンテナイメージ、デプロイ時のロールによる権限付与、ランタイムのInspectorとGuardDuty、運用のPatch Manager、Session Managerによる管理アクセスへと進み、脆弱性を発見したらビルドに戻るコンピュートセキュリティの全体フロー。",
    "diag-8": "ベースイメージからビルドコンポーネントによる堅牢化、テストコンポーネントによる検証、AMI配布・共有をパイプラインで自動化するEC2 Image Builderのワークフロー。",
    "diag-9": "EC2はインスタンスプロファイル、Lambdaは実行ロール、ECSはタスクロール（アプリ用）とタスク実行ロール（ECS基盤用）、EKSはIRSAまたはPod Identityを使うという、コンピュート環境ごとの権限付与の選択図。",
    "diag-10": "承認ルールを定めたパッチベースライン、パッチグループ、メンテナンスウィンドウによる自動適用とSystems Manager Patch Managerの実行フロー。",
    "diag-11": "管理者がIAMまたはSSOで認証してssm:StartSessionでSystems Managerサービスへ接続し、SSM Agentが外向きに接続済みのプライベートサブネットのEC2へインバウンドポート0で到達し、セッションログをCloudWatch LogsまたはS3へ、API記録をCloudTrailへ残すSession Managerの仕組み。",
    "diag-12": "開発者のIDE内スキャンからコミット・PRレビュー、CIパイプラインスキャン、レジストリスキャンを経て本番へ進むDevSecOpsシフトレフトの流れ。",
    "diag-13": "ユーザー入力をGuardrailsが入力チェックし、違反ならブロックまたは定型文を返し、問題なければAmazon Bedrockの基盤モデルへ渡し、モデルの出力もGuardrailsが出力チェックして違反ならブロックまたはマスクし、問題なければユーザーへ回答する保護フロー。",
    "diag-14": "インターネットからIGW、サブネットのNACL、ENIのセキュリティグループを経てEC2へ至るインバウンドパケットの通過順序とステートフル/ステートレスの比較。",
    "diag-15": "スポークVPC群（VPC A、VPC B）のワークロードからTransit Gatewayを経由し、検査用VPC内のNetwork FirewallエンドポイントとNATゲートウェイを通ってインターネットゲートウェイへ向かう、検査用VPCへ通信を集約する構成。",
    "diag-16": "接続要件に応じて、迅速・低コストならSite-to-Site VPN、大容量・安定・閉域ならDirect Connect、高可用性ならDXとVPNのバックアップや複数ロケーションDXを選び、Direct Connectでは暗号化要件に応じてMACsec、DX上のSite-to-Site VPN、DXのみに分岐する接続方式決定木。",
    "diag-17": "社員がIdPで認証し、Verified Accessエンドポイントとセキュリティポリシー（Cedar）で評価されて社内プライベートアプリへセキュアにアクセスするゼロトラストフロー。",
    "diag-18": "インターネットからパブリックサブネットのALBへ入り、SG参照で許可してプライベートサブネットのアプリ層へ、さらにSG参照で許可して分離サブネットのデータベース層へ接続し、アプリ層がパブリックサブネットのNATゲートウェイと分離サブネットのVPCエンドポイントを利用する3層ネットワークセグメンテーション構成。",
    "diag-19": "目的に応じて、あってはならない経路が存在しないかの確認にNetwork Access Analyzer、特定の2点間が通信できない原因の調査にReachability Analyzer、EC2の公開ポートの洗い出しにInspectorの到達性の検出結果、実際の通信の確認にVPC Flow Logsを選ぶ使い分け決定木。",
    "diag-20": "ルートテーブルの経路確認からIGW/NAT GW、セキュリティグループ、NACL、OS内ファイアウォール・サービス起動確認へと段階的に進むトラブルシューティング決定フロー。"
} as const;

export const NAV_ITEMS = [
    {
        "id": "1-このガイドの使い方",
        "label": "1. このガイドの使い方",
        "level": 2
    },
    {
        "id": "11-学習の進め方ステップバイステップ",
        "label": "1.1 学習の進め方(ステップバイステップ)",
        "level": 3
    },
    {
        "id": "12-各スキルの読み方",
        "label": "1.2 各スキルの読み方",
        "level": 3
    },
    {
        "id": "13-注意事項",
        "label": "1.3 注意事項",
        "level": 3
    },
    {
        "id": "2-domain-3-の全体像",
        "label": "2. Domain 3 の全体像",
        "level": 2
    },
    {
        "id": "21-位置づけ",
        "label": "2.1 位置づけ",
        "level": 3
    },
    {
        "id": "22-3-つの-task-と-16-のスキル",
        "label": "2.2 3 つの Task と 16 のスキル",
        "level": 3
    },
    {
        "id": "23-task-とスキルの対応表試験ガイドの原文に沿った整理",
        "label": "2.3 Task とスキルの対応表(試験ガイドの原文に沿った整理)",
        "level": 3
    },
    {
        "id": "3-前提知識ここだけは先に押さえる",
        "label": "3. 前提知識(ここだけは先に押さえる)",
        "level": 2
    },
    {
        "id": "31-責任共有モデルshared-responsibility-model",
        "label": "3.1 責任共有モデル(Shared Responsibility Model)",
        "level": 3
    },
    {
        "id": "32-多層防御defense-in-depth",
        "label": "3.2 多層防御(Defense in Depth)",
        "level": 3
    },
    {
        "id": "33-vpc-の基本用語",
        "label": "3.3 VPC の基本用語",
        "level": 3
    },
    {
        "id": "4-task-31-ネットワークエッジサービスのセキュリティ制御",
        "label": "4. Task 3.1 ネットワークエッジサービスのセキュリティ制御",
        "level": 2
    },
    {
        "id": "40-エッジ防御の全体像",
        "label": "4.0 エッジ防御の全体像",
        "level": 3
    },
    {
        "id": "41-skill-311-脅威に基づくエッジセキュリティ戦略の定義と選定",
        "label": "4.1 Skill 3.1.1 脅威に基づくエッジセキュリティ戦略の定義と選定",
        "level": 3
    },
    {
        "id": "42-skill-312-ネットワークエッジ保護の実装",
        "label": "4.2 Skill 3.1.2 ネットワークエッジ保護の実装",
        "level": 3
    },
    {
        "id": "43-skill-313-要件に基づくエッジ制御とルールの設計実装",
        "label": "4.3 Skill 3.1.3 要件に基づくエッジ制御とルールの設計・実装",
        "level": 3
    },
    {
        "id": "44-skill-314-エッジサービスとサードパーティ製品の統合",
        "label": "4.4 Skill 3.1.4 エッジサービスとサードパーティ製品の統合",
        "level": 3
    },
    {
        "id": "45-task-31-まとめ試験の着眼点",
        "label": "4.5 Task 3.1 まとめ(試験の着眼点)",
        "level": 3
    },
    {
        "id": "5-task-32-コンピュートワークロードのセキュリティ制御",
        "label": "5. Task 3.2 コンピュートワークロードのセキュリティ制御",
        "level": 2
    },
    {
        "id": "51-skill-321-堅牢化ハードニングされた-ec2-ami-とコンテナイメージ",
        "label": "5.1 Skill 3.2.1 堅牢化(ハードニング)された EC2 AMI とコンテナイメージ",
        "level": 3
    },
    {
        "id": "52-skill-322-インスタンスプロファイルサービスロール実行ロールの適切な適用",
        "label": "5.2 Skill 3.2.2 インスタンスプロファイル、サービスロール、実行ロールの適切な適用",
        "level": 3
    },
    {
        "id": "53-skill-323-コンピュートリソースの既知の脆弱性スキャン",
        "label": "5.3 Skill 3.2.3 コンピュートリソースの既知の脆弱性スキャン",
        "level": 3
    },
    {
        "id": "54-skill-324-パッチ適用の自動化と継続的検証",
        "label": "5.4 Skill 3.2.4 パッチ適用の自動化と継続的検証",
        "level": 3
    },
    {
        "id": "55-skill-325-コンピュートリソースへの安全な管理アクセス",
        "label": "5.5 Skill 3.2.5 コンピュートリソースへの安全な管理アクセス",
        "level": 3
    },
    {
        "id": "56-skill-326-パイプライン内の脆弱性の検出と修復のためのセキュリティツール設定",
        "label": "5.6 Skill 3.2.6 パイプライン内の脆弱性の検出と修復のためのセキュリティツール設定",
        "level": 3
    },
    {
        "id": "57-skill-327-生成-ai-アプリケーションの保護とガードレール",
        "label": "5.7 Skill 3.2.7 生成 AI アプリケーションの保護とガードレール",
        "level": 3
    },
    {
        "id": "58-task-32-まとめ試験の着眼点",
        "label": "5.8 Task 3.2 まとめ(試験の着眼点)",
        "level": 3
    },
    {
        "id": "6-task-33-ネットワークセキュリティ制御の設計とトラブルシューティング",
        "label": "6. Task 3.3 ネットワークセキュリティ制御の設計とトラブルシューティング",
        "level": 2
    },
    {
        "id": "61-skill-331-通信の許可拒否の制御セキュリティグループnaclaws-network-firewall",
        "label": "6.1 Skill 3.3.1 通信の許可・拒否の制御(セキュリティグループ、NACL、AWS Network Firewall)",
        "level": 3
    },
    {
        "id": "62-skill-332-ハイブリッド--マルチクラウド間の安全な接続の設計",
        "label": "6.2 Skill 3.3.2 ハイブリッド / マルチクラウド間の安全な接続の設計",
        "level": 3
    },
    {
        "id": "63-skill-333-ハイブリッド環境と-aws-間の通信に必要なセキュリティ要件の決定aws-verified-access",
        "label": "6.3 Skill 3.3.3 ハイブリッド環境と AWS 間の通信に必要なセキュリティ要件の決定(AWS Verified Access)",
        "level": 3
    },
    {
        "id": "64-skill-334-セキュリティ要件に基づくネットワークセグメンテーションの設計",
        "label": "6.4 Skill 3.3.4 セキュリティ要件に基づくネットワークセグメンテーションの設計",
        "level": 3
    },
    {
        "id": "65-skill-335-不要なネットワークアクセスの特定",
        "label": "6.5 Skill 3.3.5 不要なネットワークアクセスの特定",
        "level": 3
    },
    {
        "id": "66-task-33-まとめ試験の着眼点",
        "label": "6.6 Task 3.3 まとめ(試験の着眼点)",
        "level": 3
    },
    {
        "id": "7-横断まとめ-サービス選択早見表とキーワード対応表",
        "label": "7. 横断まとめ: サービス選択早見表とキーワード対応表",
        "level": 2
    },
    {
        "id": "71-サービス選択早見表",
        "label": "7.1 サービス選択早見表",
        "level": 3
    },
    {
        "id": "72-間違えやすいペア",
        "label": "7.2 間違えやすいペア",
        "level": 3
    },
    {
        "id": "73-設計判断のトレードオフ試験ガイドのコストセキュリティ複雑さ",
        "label": "7.3 設計判断のトレードオフ(試験ガイドの「コスト・セキュリティ・複雑さ」)",
        "level": 3
    },
    {
        "id": "8-トラブルシューティング実践フロー",
        "label": "8. トラブルシューティング実践フロー",
        "level": 2
    },
    {
        "id": "81-ec2-から宛先へ接続できないときの調べ方",
        "label": "8.1 「EC2 から宛先へ接続できない」ときの調べ方",
        "level": 3
    },
    {
        "id": "82-症状別チェックリスト",
        "label": "8.2 症状別チェックリスト",
        "level": 3
    },
    {
        "id": "9-理解度チェック演習問題",
        "label": "9. 理解度チェック(演習問題)",
        "level": 2
    },
    {
        "id": "10-参考-url根拠ソース一覧",
        "label": "10. 参考 URL(根拠ソース一覧)",
        "level": 2
    },
    {
        "id": "101-試験ガイドアンカー",
        "label": "10.1 試験ガイド(アンカー)",
        "level": 3
    },
    {
        "id": "102-task-31-ネットワークエッジ",
        "label": "10.2 Task 3.1 ネットワークエッジ",
        "level": 3
    },
    {
        "id": "103-task-32-コンピュート",
        "label": "10.3 Task 3.2 コンピュート",
        "level": 3
    },
    {
        "id": "104-task-33-ネットワーク",
        "label": "10.4 Task 3.3 ネットワーク",
        "level": 3
    },
    {
        "id": "105-全般",
        "label": "10.5 全般",
        "level": 3
    }
] as const;
