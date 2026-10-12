/** 全33目次と39図の単一正本。 */
export const NAV_ITEMS = [
    {
        "id": "s1",
        "label": "0. はじめに：このガイドの使い方と Domain 3 の全体像",
        "className": "nav l2"
    },
    {
        "id": "s2",
        "label": "Step 1：デプロイの全体像（CI/CD と環境の考え方）",
        "className": "nav l2"
    },
    {
        "id": "s3",
        "label": "Task 1：デプロイ用アプリケーションアーティファクトの準備",
        "className": "nav l1"
    },
    {
        "id": "s4",
        "label": "Step 2：依存関係の管理（Skill 3.1.1）",
        "className": "nav l2"
    },
    {
        "id": "s5",
        "label": "Step 3：ファイルとディレクトリ構造（Skill 3.1.2）",
        "className": "nav l2"
    },
    {
        "id": "s6",
        "label": "Step 4：コードリポジトリの活用（Skill 3.1.3）",
        "className": "nav l2"
    },
    {
        "id": "s7",
        "label": "Step 5：リソース要件（メモリ・CPU）（Skill 3.1.4）",
        "className": "nav l2"
    },
    {
        "id": "s8",
        "label": "Step 6：環境別の設定と AWS AppConfig（Skill 3.1.5）",
        "className": "nav l2"
    },
    {
        "id": "s9",
        "label": "Task 2：開発環境でのアプリケーションテスト",
        "className": "nav l1"
    },
    {
        "id": "s10",
        "label": "Step 7：デプロイ済みコードのテスト（Skill 3.2.1）",
        "className": "nav l2"
    },
    {
        "id": "s11",
        "label": "Step 8：統合テストと外部依存のモック（Skill 3.2.2）",
        "className": "nav l2"
    },
    {
        "id": "s12",
        "label": "Step 9：開発用エンドポイントと API Gateway ステージ（Skill 3.2.3）",
        "className": "nav l2"
    },
    {
        "id": "s13",
        "label": "Step 10：既存環境へのスタック更新（Skill 3.2.4）",
        "className": "nav l2"
    },
    {
        "id": "s14",
        "label": "Step 11：イベント駆動アプリケーションのテスト（Skill 3.2.5）",
        "className": "nav l2"
    },
    {
        "id": "s15",
        "label": "Task 3：デプロイテストの自動化",
        "className": "nav l1"
    },
    {
        "id": "s16",
        "label": "Step 12：テストイベントの作成（Skill 3.3.1）",
        "className": "nav l2"
    },
    {
        "id": "s17",
        "label": "Step 13：API リソースの複数環境へのデプロイと環境管理（Skill 3.3.2 / 3.3.5）",
        "className": "nav l2"
    },
    {
        "id": "s18",
        "label": "Step 14：承認済みバージョンを使う環境（Skill 3.3.3）",
        "className": "nav l2"
    },
    {
        "id": "s19",
        "label": "Step 15：IaC テンプレートの実装とデプロイ（Skill 3.3.4）",
        "className": "nav l2"
    },
    {
        "id": "s20",
        "label": "Step 16：Amazon Q Developer（と後継 Kiro）によるテスト生成（Skill 3.3.6）",
        "className": "nav l2"
    },
    {
        "id": "s21",
        "label": "Task 4：AWS CI/CD サービスによるコードデプロイ",
        "className": "nav l1"
    },
    {
        "id": "s22",
        "label": "Step 17：Lambda のデプロイパッケージ形式（Skill 3.4.1）",
        "className": "nav l2"
    },
    {
        "id": "s23",
        "label": "Step 18：API Gateway のステージとカスタムドメイン（Skill 3.4.2）",
        "className": "nav l2"
    },
    {
        "id": "s24",
        "label": "Step 19：既存 IaC テンプレートの更新（Skill 3.4.3）",
        "className": "nav l2"
    },
    {
        "id": "s25",
        "label": "Step 20：AWS サービスによるアプリケーション環境の管理（Skill 3.4.4）",
        "className": "nav l2"
    },
    {
        "id": "s26",
        "label": "Step 21：コミットで起動する CI/CD とワークフローのオーケストレーション（Skill 3.4.6 / 3.4.7）",
        "className": "nav l2"
    },
    {
        "id": "s27",
        "label": "Step 22：デプロイ戦略（Skill 3.4.5 / 3.4.11）",
        "className": "nav l2"
    },
    {
        "id": "s28",
        "label": "Step 23：ロールバック（Skill 3.4.8）",
        "className": "nav l2"
    },
    {
        "id": "s29",
        "label": "Step 24：ラベルとブランチによるバージョン・リリース管理（Skill 3.4.9）",
        "className": "nav l2"
    },
    {
        "id": "s30",
        "label": "Step 25：ランタイム設定による動的デプロイ（Skill 3.4.10）",
        "className": "nav l2"
    },
    {
        "id": "s31",
        "label": "Step 26：総合演習（練習問題・チェックリスト）",
        "className": "nav l2"
    },
    {
        "id": "s32",
        "label": "付録：スキル番号と Step の対応表",
        "className": "nav l2"
    },
    {
        "id": "s33",
        "label": "付録：根拠となる一次情報",
        "className": "nav l2"
    }
] as const;
export const DIAGRAMS = {
    "d0": "flowchart TD\n    A[\"Step 1 全体像を知る\"] --> B[\"Task 1 作る 準備\"]\n    B --> C[\"Task 2 試す 開発環境\"]\n    C --> D[\"Task 3 自動化する\"]\n    D --> E[\"Task 4 届ける CI/CD\"]\n    E --> F[\"Step 26 演習で定着\"]",
    "d1": "flowchart LR\n    SRC[\"Source<br/>CodeCommit / GitHub\"] --> BLD[\"Build<br/>CodeBuild\"]\n    BLD --> TST[\"Test<br/>CodeBuild など\"]\n    TST --> APR[\"Approval<br/>手動承認\"]\n    APR --> DEP[\"Deploy<br/>CodeDeploy / CloudFormation\"]\n    PL[\"CodePipeline<br/>全体の流れを管理\"] -.-> SRC\n    PL -.-> BLD\n    PL -.-> DEP",
    "d2": "flowchart TD\n    T1[\"Task 1 アーティファクト準備\"] --> S1[\"3.1.1 依存関係\"]\n    T1 --> S2[\"3.1.2 ディレクトリ構成\"]\n    T1 --> S3[\"3.1.3 リポジトリ\"]\n    T1 --> S4[\"3.1.4 リソース要件\"]\n    T1 --> S5[\"3.1.5 環境別設定\"]",
    "d3": "flowchart TD\n    Q[\"依存関係をどう含める?\"] --> A[\"zip に同梱<br/>最もシンプル\"]\n    Q --> B[\"レイヤーに分離<br/>共通ライブラリを共有\"]\n    Q --> C[\"コンテナイメージ<br/>大きい依存関係やOS要件\"]\n    A --> A1[\"上限: 解凍後 250MB<br/>レイヤー含む\"]\n    B --> B1[\"1関数に最大5レイヤー\"]\n    C --> C1[\"イメージ上限 10GB\"]",
    "d4": "flowchart TD\n    A[\"zip を作る\"] --> B{\"ハンドラーは zip の<br/>ルート直下にある?\"}\n    B -- \"はい\" --> C[\"正常に呼び出される\"]\n    B -- \"いいえ フォルダごと圧縮した\" --> D[\"Handler not found エラー\"]\n    D --> E[\"フォルダの中身を<br/>ルートに置いて再圧縮\"]",
    "d5": "flowchart LR\n    DEV[\"開発者\"] -->|\"git push\"| REPO[\"コードリポジトリ\"]\n    REPO -->|\"変更を検知\"| PL[\"CodePipeline\"]\n    PL --> BLD[\"CodeBuild<br/>ビルド・テスト\"]\n    BLD --> ART[\"アーティファクト<br/>S3 / ECR\"]\n    ART --> DEP[\"デプロイ\"]",
    "d6": "flowchart LR\n    M[\"メモリを増やす\"] --> C[\"CPU も比例して増える\"]\n    C --> D[\"実行時間が短くなることがある\"]\n    D --> P[\"課金は GBミリ秒<br/>メモリ x 時間\"]\n    P --> R[\"最適点を探す<br/>必ずしも最小メモリが最安ではない\"]",
    "d7": "flowchart TD\n    Q[\"設定をどこに置く?\"] --> A{\"機密情報?\"}\n    A -- \"はい\" --> S[\"Secrets Manager<br/>または SecureString\"]\n    A -- \"いいえ\" --> B{\"再デプロイなしで<br/>安全に切り替えたい?\"}\n    B -- \"はい\" --> AC[\"AWS AppConfig\"]\n    B -- \"いいえ\" --> C{\"起動時に固定の値?\"}\n    C -- \"はい\" --> E[\"環境変数\"]\n    C -- \"いいえ\" --> P[\"Parameter Store\"]",
    "d8": "flowchart TD\n    APP[\"Application<br/>アプリ\"] --> ENV[\"Environment<br/>dev / test / prod\"]\n    APP --> PROF[\"Configuration profile<br/>設定の元データ\"]\n    PROF --> SRC[\"保存場所<br/>AppConfig hosted / S3 /<br/>Parameter Store など\"]\n    PROF --> VAL[\"Validator<br/>JSON Schema / Lambda\"]\n    ENV --> DEPLOY[\"Deployment<br/>配信の実行\"]\n    PROF --> DEPLOY\n    STRAT[\"Deployment strategy<br/>配信の速度\"] --> DEPLOY\n    DEPLOY --> ALARM[\"CloudWatch アラーム<br/>異常で自動ロールバック\"]",
    "d9": "flowchart TD\n    T2[\"Task 2 開発環境でテスト\"] --> S1[\"3.2.1 デプロイ済みコードのテスト\"]\n    T2 --> S2[\"3.2.2 統合テスト とモック\"]\n    T2 --> S3[\"3.2.3 開発エンドポイント\"]\n    T2 --> S4[\"3.2.4 スタック更新\"]\n    T2 --> S5[\"3.2.5 イベント駆動のテスト\"]",
    "d10": "flowchart LR\n    A[\"コードを書く\"] --> B[\"ローカルで単体テスト<br/>sam local invoke\"]\n    B --> C[\"dev 環境へデプロイ<br/>sam deploy / sam sync\"]\n    C --> D[\"クラウド上でテスト<br/>invoke / API 呼び出し\"]\n    D --> E[\"ログ・トレースで確認<br/>CloudWatch / X-Ray\"]\n    E --> A",
    "d11": "flowchart TD\n    U[\"単体テスト 多い 速い<br/>外部はモック\"] --> I[\"統合テスト 中程度<br/>dev 環境の実サービス\"]\n    I --> E[\"E2E テスト 少ない 遅い<br/>本番に近い環境\"]",
    "d12": "flowchart LR\n    C[\"クライアント\"] --> AG[\"API Gateway\"]\n    AG -->|\"本番 dev 環境\"| BE[\"本物のバックエンド\"]\n    AG -->|\"Mock 統合\"| MK[\"固定レスポンスを返す\"]",
    "d13": "flowchart TD\n    DEF[\"API の定義<br/>リソース・メソッド\"] -->|\"デプロイ作成\"| D1[\"Deployment<br/>スナップショット\"]\n    D1 --> ST1[\"dev ステージ\"]\n    D1 --> ST2[\"test ステージ\"]\n    D2[\"別の Deployment\"] --> ST3[\"prod ステージ\"]",
    "d14": "flowchart TD\n    TPL[\"template.yaml<br/>同じ 1 つ\"] --> DEV[\"スタック myapp-dev<br/>Stage=dev\"]\n    TPL --> STG[\"スタック myapp-staging<br/>Stage=staging\"]\n    TPL --> PRD[\"スタック myapp-prod<br/>Stage=prod\"]",
    "d15": "flowchart TD\n    A[\"sam build\"] --> B[\"sam deploy\"]\n    B --> C[\"変更セットを作成<br/>追加 変更 削除の一覧\"]\n    C --> D{\"確認する?\"}\n    D -- \"confirm_changeset が true\" --> E[\"人が内容を確認\"]\n    D -- \"false\" --> F[\"自動で実行\"]\n    E --> F\n    F --> G[\"スタックを更新\"]\n    G --> H{\"成功?\"}\n    H -- \"はい\" --> I[\"完了\"]\n    H -- \"いいえ\" --> J[\"自動ロールバック\"]",
    "d16": "flowchart TD\n    A[\"段階 1 ハンドラー単体<br/>疑似イベント JSON を渡す\"] --> B[\"段階 2 連携確認<br/>dev 環境でイベントを実際に発生\"]\n    B --> C[\"段階 3 異常系<br/>失敗 重複 順序違いを再現\"]",
    "d17": "flowchart LR\n    SRC[\"イベント発生\"] --> Q[\"Lambda 呼び出し\"]\n    Q --> OK{\"成功?\"}\n    OK -- \"はい\" --> DONE[\"完了\"]\n    OK -- \"いいえ\" --> RT[\"自動リトライ\"]\n    RT --> OK2{\"成功?\"}\n    OK2 -- \"はい\" --> DONE\n    OK2 -- \"いいえ\" --> DLQ[\"DLQ または Destination へ<br/>後で調査 再処理\"]",
    "d18": "flowchart TD\n    T3[\"Task 3 デプロイテストの自動化\"] --> S1[\"3.3.1 テストイベント\"]\n    T3 --> S2[\"3.3.2 API を複数環境へ\"]\n    T3 --> S3[\"3.3.3 承認済みバージョンの環境\"]\n    T3 --> S4[\"3.3.4 IaC テンプレート\"]\n    T3 --> S5[\"3.3.5 サービス別の環境管理\"]\n    T3 --> S6[\"3.3.6 Q Developer でテスト生成\"]",
    "d19": "flowchart LR\n    EV[\"テストイベント JSON\"] --> LF[\"Lambda 関数\"]\n    LF --> RS[\"レスポンス JSON\"]\n    RS --> AS[\"期待値と比較\"]",
    "d20": "flowchart TD\n    A[\"events ディレクトリに<br/>テストイベントを保存\"] --> B[\"pytest 等で<br/>全イベントを読み込み\"]\n    B --> C[\"ハンドラーに渡す\"]\n    C --> D[\"戻り値を検証\"]\n    D --> E[\"CodeBuild で自動実行\"]",
    "d21": "flowchart LR\n    A[\"API 定義を変更\"] --> B[\"create-deployment<br/>デプロイを作成\"]\n    B --> C[\"dev ステージに反映\"]\n    C --> D[\"動作確認\"]\n    D --> E[\"同じ定義を test ステージへ\"]\n    E --> F[\"prod ステージへ\"]",
    "d22": "flowchart LR\n    A[\"同一 API の<br/>ステージ分離\"] --> B[\"同一アカウントの<br/>別スタック\"]\n    B --> C[\"別アカウント<br/>推奨\"]",
    "d23": "flowchart LR\n    BLD[\"ビルド成果物<br/>不変のバージョン\"] --> V[\"バージョン番号 やタグ\"]\n    V --> E1[\"統合テスト環境<br/>承認済みバージョンを指す\"]\n    V --> E2[\"本番環境<br/>承認後に同じものを指す\"]",
    "d24": "flowchart TD\n    L[\"$LATEST 編集中\"] -->|\"publish-version\"| V1[\"バージョン 1\"]\n    L -->|\"publish-version\"| V2[\"バージョン 2\"]\n    L -->|\"publish-version\"| V3[\"バージョン 3\"]\n    V3 --> AD[\"エイリアス dev\"]\n    V2 --> AT[\"エイリアス test 承認済み\"]\n    V1 --> AP[\"エイリアス prod\"]",
    "d25": "flowchart LR\n    SAM[\"SAM テンプレート<br/>短い記述\"] -->|\"Transform で展開\"| CFN[\"CloudFormation<br/>テンプレート\"]\n    CFN --> STK[\"スタック\"]\n    STK --> RES[\"Lambda / API Gateway /<br/>DynamoDB / IAM など\"]",
    "d26": "flowchart TD\n    A[\"sam validate --lint<br/>テンプレート検査\"] --> B[\"sam build<br/>依存関係を解決\"]\n    B --> C[\"sam local invoke / start-api<br/>ローカル確認\"]\n    C --> D[\"sam deploy --guided<br/>初回デプロイ\"]\n    D --> E[\"スタック作成 CREATE_COMPLETE\"]\n    E --> F[\"以降は sam deploy で更新\"]",
    "d27": "flowchart TD\n    A[\"テスト対象の関数を選択<br/>IDE で開く\"] --> B[\"AI アシスタントに依頼<br/>Q Developer の /test など\"]\n    B --> C[\"単体テストの案が生成される\"]\n    C --> D[\"人がレビュー<br/>期待値は正しいか\"]\n    D --> E{\"妥当?\"}\n    E -- \"はい\" --> F[\"リポジトリにコミット\"]\n    E -- \"いいえ\" --> G[\"指示を具体化して再生成<br/>または手で修正\"]\n    G --> C\n    F --> H[\"CI で自動実行<br/>CodeBuild\"]",
    "d28": "flowchart TD\n    T4[\"Task 4 CI/CD でデプロイ\"] --> A[\"3.4.1 Lambda パッケージ\"]\n    T4 --> B[\"3.4.2 ステージとカスタムドメイン\"]\n    T4 --> C[\"3.4.3 IaC 更新\"]\n    T4 --> D[\"3.4.4 環境管理\"]\n    T4 --> E[\"3.4.5 / 3.4.11 デプロイ戦略\"]\n    T4 --> F[\"3.4.6 / 3.4.7 コミット起動とワークフロー\"]\n    T4 --> G[\"3.4.8 ロールバック\"]\n    T4 --> H[\"3.4.9 ラベルとブランチ\"]\n    T4 --> I[\"3.4.10 動的デプロイ\"]",
    "d29": "flowchart TD\n    Q[\"パッケージ形式を選ぶ\"] --> A{\"解凍後 250MB 以下?\"}\n    A -- \"はい\" --> B{\"共通ライブラリを複数関数で共有?\"}\n    B -- \"はい\" --> L[\"zip + レイヤー\"]\n    B -- \"いいえ\" --> Z[\"zip のみ\"]\n    A -- \"いいえ\" --> C[\"コンテナイメージ 最大 10GB\"]",
    "d30": "flowchart LR\n    U[\"利用者\"] --> R53[\"Route 53 エイリアスレコード<br/>api.example.com\"]\n    R53 --> CD[\"API Gateway カスタムドメイン名<br/>ACM 証明書\"]\n    CD -->|\"base path v1\"| S1[\"API A の prod ステージ\"]\n    CD -->|\"base path v2\"| S2[\"API B の prod ステージ\"]",
    "d31": "flowchart TD\n    E[\"テンプレートを編集\"] --> V[\"sam validate --lint / cfn-lint\"]\n    V --> C[\"変更セットを作成\"]\n    C --> R{\"Replacement を含む?\"}\n    R -- \"はい\" --> W[\"データ消失やリンク切れを確認<br/>DeletionPolicy や Retain を検討\"]\n    R -- \"いいえ\" --> X[\"変更セットを実行\"]\n    W --> X\n    X --> OK{\"成功?\"}\n    OK -- \"はい\" --> D1[\"UPDATE_COMPLETE\"]\n    OK -- \"いいえ\" --> RB[\"UPDATE_ROLLBACK_COMPLETE 自動で元に戻る\"]",
    "d32": "flowchart LR\n    APP[\"アプリケーション\"] --> DEV[\"dev 環境\"]\n    APP --> STG[\"staging 環境\"]\n    APP --> PRD[\"prod 環境\"]\n    DEV -->|\"同じ成果物を昇格\"| STG\n    STG -->|\"承認後に昇格\"| PRD",
    "d33": "flowchart LR\n    G[\"git push\"] --> S[\"Source<br/>CodeCommit / GitHub\"]\n    S --> B[\"Build<br/>CodeBuild buildspec.yml\"]\n    B --> T[\"Test<br/>CodeBuild\"]\n    T --> D1[\"Deploy staging<br/>CodeDeploy / CloudFormation\"]\n    D1 --> M[\"Manual approval<br/>SNS 通知\"]\n    M --> D2[\"Deploy prod\"]",
    "d34": "flowchart TD\n    Q[\"デプロイ戦略を選ぶ\"] --> A{\"ダウンタイムを許容できる?\"}\n    A -- \"はい 開発環境\" --> AA[\"All at once\"]\n    A -- \"いいえ\" --> B{\"追加コストを払える?\"}\n    B -- \"いいえ\" --> R[\"Rolling\"]\n    B -- \"はい\" --> C{\"最優先は?\"}\n    C -- \"即時切替と即時ロールバック\" --> BG[\"Blue/Green\"]\n    C -- \"影響範囲を小さく\" --> CN[\"Canary / Linear\"]\n    C -- \"容量維持\" --> RA[\"Rolling with additional batch\"]\n    C -- \"安全な入れ替え Beanstalk\" --> IM[\"Immutable\"]",
    "d35": "flowchart LR\n    V1[\"旧バージョン 100%\"] --> C[\"新バージョン 10%<br/>旧バージョン 90%\"]\n    C -->|\"5 分間 アラーム監視\"| D{\"アラームなし?\"}\n    D -- \"はい\" --> N[\"新バージョン 100%\"]\n    D -- \"いいえ\" --> RB[\"自動ロールバック<br/>旧バージョン 100%\"]",
    "d36": "flowchart TD\n    D[\"新バージョンをデプロイ\"] --> M[\"アラーム ヘルスチェックで監視\"]\n    M --> OK{\"異常?\"}\n    OK -- \"なし\" --> FIN[\"デプロイ完了\"]\n    OK -- \"あり\" --> RB[\"自動ロールバック\"]\n    RB --> PREV[\"直近の成功バージョンに復帰\"]",
    "d37": "flowchart LR\n    F[\"feature ブランチ\"] -->|\"プルリクエスト レビュー\"| M[\"main\"]\n    M -->|\"git tag v1.4.0\"| T[\"リリースタグ\"]\n    T --> P[\"パイプライン起動\"]\n    P --> ART[\"成果物にバージョンを付与<br/>イメージタグ Lambda バージョン\"]\n    ART --> ENV[\"staging から prod へ昇格\"]",
    "d38": "flowchart LR\n    C[\"クライアント\"] --> ST[\"API Gateway<br/>dev ステージ<br/>lambdaAlias = dev\"]\n    C --> SP[\"API Gateway<br/>prod ステージ<br/>lambdaAlias = prod\"]\n    ST --> LD[\"Lambda エイリアス dev\"]\n    SP --> LP[\"Lambda エイリアス prod\"]"
} as const;
export type DiagramId = keyof typeof DIAGRAMS;
export const CHECK_COUNT = 9;
