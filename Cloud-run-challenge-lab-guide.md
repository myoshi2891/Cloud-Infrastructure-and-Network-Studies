# Develop Serverless Applications on Cloud Run: Challenge Lab 完全解説ガイド

> **Pet Theory 請求アプリ（Billing）をCloud Runでサーバーレス化する 全7タスク**
> 初学者向け・ステップバイステップ・ベストプラクティス準拠版
>
> 作成日: 2026-10-30 ／ 想定読者: Google Cloud初学者、Cloud Runコース受講者

---

## 目次

0. [この文書の使い方](#0-この文書の使い方)
1. [ラボの全体像](#1-ラボの全体像)
2. [先に押さえる基礎知識](#2-先に押さえる基礎知識)
3. [環境準備（Provision the lab environment）](#3-環境準備provision-the-lab-environment)
4. [Task 1: 公開サービスを有効化する](#task-1-公開billingサービスをデプロイする)
5. [Task 2: フロントエンドをデプロイする](#task-2-ステージングのフロントエンドをデプロイする)
6. [Task 3: 非公開（認証あり）サービスへ置き換える](#task-3-非公開billingサービスへ置き換える)
7. [Task 4: Billing用サービスアカウントを作る](#task-4-billing用サービスアカウントを作る)
8. [Task 5: 本番Billingサービスをデプロイする](#task-5-本番billingサービスをデプロイする)
9. [Task 6: Frontend用サービスアカウントを作り権限を付ける](#task-6-frontend用サービスアカウントを作り権限を付ける)
10. [Task 7: 本番Frontendを再デプロイする](#task-7-本番frontendを再デプロイする)
11. [全タスク通しのコマンドまとめ](#11-全タスク通しのコマンドまとめ)
12. [トラブルシューティング](#12-トラブルシューティング)
13. [ベストプラクティス解説（本番運用の視点）](#13-ベストプラクティス解説本番運用の視点)
14. [理解度チェック](#14-理解度チェック)
15. [参考情報](#15-参考情報)

---

## 0. この文書の使い方

### 0.1 チャレンジラボとは

通常のラボは「この通りに打てばOK」という手順書がありますが、**チャレンジラボは手順が書かれていません**。コースで学んだスキルを使い、自分でコマンドを組み立てて課題をクリアします。採点は自動で、**制限時間内に全タスクを完了すると100%** になります。

この文書は、手順書が無い部分を埋める **「考え方 → コマンド → 確認方法 → つまずきポイント」** の4点セットで解説します。

### 0.2 重要な注意: 名前の「表記ゆれ」について

ラボの手順書テキストには、`Billing service account` や `Private billing service` のように **人間向けの説明表記** で書かれた値があります。実際のラボ画面（左パネルの表）では、`private-billing-service` のような **実際に使う名前** が書かれているのが一般的です。

> **鉄則: ラボ画面に表示されている値を最優先する。**
> この文書では、命名規則（小文字・数字・ハイフンのみ）に沿った一般的な名前を使います。画面の値と違う場合は、**画面の値に置き換えて** ください。後述の「名前の対応表」と「変数」を使えば、1か所の修正で全コマンドに反映できます。

### 0.3 学習の進め方

| ステップ | やること | 目安 |
|---|---|---|
| 1 | 第1〜2章で全体像と用語をつかむ | 10分 |
| 2 | 第3章で環境を整える | 5分 |
| 3 | Task 1〜7を順に実施し、各タスク後に **Check my progress** を押す | 各5〜10分 |
| 4 | つまずいたら第12章を見る | 随時 |
| 5 | 終わったら第13〜14章で「なぜそうするのか」を復習 | 15分 |

---

## 1. ラボの全体像

### 1.1 シナリオ

動物病院 **Pet Theory** は、既存のモノリシック（一枚岩）な **請求（Billing）アプリ** をサーバーレス化したいと考えています。あなたは開発チームの一員として、**開発チームから渡されたコードとイメージ** を Cloud Run にデプロイし、**ステージング環境 → 本番環境** へ段階的に移行します。

### 1.2 完了条件（Definition of Done）

| Ref | 完了条件 | 対応タスク |
|---|---|---|
| 1 | ステージング構成をデプロイする | Task 1, 2, 3 |
| 2 | 本番構成をデプロイする | Task 4, 5, 7 |
| 3 | 本番構成のコンポーネント間アクセスを保護する | Task 4, 5, 6, 7 |

### 1.3 7タスクの一覧

| Task | 内容 | 成果物 | 認証 | ポイント |
|---|---|---|---|---|
| 1 | 公開Billing APIを作る | `billing-staging-api:0.1` を Cloud Run へ | なし（公開） | ビルド → デプロイ → 疎通確認 |
| 2 | ステージングFrontendを作る | `frontend-staging:0.1` を Cloud Run へ | なし（公開） | Task 1と同じ型の繰り返し |
| 3 | Billingを非公開版へ置き換える | `billing-staging-api:0.2` を Cloud Run へ | **あり** | 既存サービス削除、IDトークンで呼ぶ |
| 4 | Billing用サービスアカウントを作る | サービスアカウント | - | ロールは付けない（N/A） |
| 5 | 本番Billingをデプロイ | `billing-prod-api:0.1` を Cloud Run へ | **あり** | 専用サービスアカウントを紐付け |
| 6 | Frontend用サービスアカウントを作る | サービスアカウント＋権限 | - | `run.invoker` をBillingに付与 |
| 7 | 本番Frontendを再デプロイ | `frontend-prod:0.1` を Cloud Run へ | なし（公開） | Frontend用サービスアカウントを紐付け |

### 1.4 タスクの流れ（フローチャート）

```mermaid
flowchart TD
    S["環境準備<br/>プロジェクト・リージョン設定、リポジトリをclone"] --> T1
    subgraph STG["ステージング環境（Ref 1）"]
        T1["Task 1<br/>公開Billing APIをデプロイ"] --> T2["Task 2<br/>公開Frontendをデプロイ"]
        T2 --> T3["Task 3<br/>公開Billingを削除し<br/>非公開Billingをデプロイ"]
    end
    T3 --> T4
    subgraph PRD["本番環境（Ref 2・Ref 3）"]
        T4["Task 4<br/>Billing用サービスアカウント作成"] --> T5["Task 5<br/>本番Billingをデプロイ<br/>認証あり＋SA紐付け"]
        T5 --> T6["Task 6<br/>Frontend用サービスアカウント作成<br/>run.invokerを付与"]
        T6 --> T7["Task 7<br/>本番Frontendをデプロイ<br/>公開＋SA紐付け"]
    end
    T7 --> E["本番FrontendのURLを開いて<br/>請求画面を確認"]
```

### 1.5 最終的に完成する本番構成

```mermaid
flowchart LR
    U["ユーザー<br/>（ブラウザ）"] -->|"HTTPS（誰でもアクセス可）"| F
    subgraph CR["Cloud Run"]
        F["Frontend 本番サービス<br/>実行SA: Frontend用SA"]
        B["Billing 本番サービス<br/>認証必須<br/>実行SA: Billing用SA"]
    end
    F -->|"IDトークン付きリクエスト"| B
    IAM{{"IAM<br/>Frontend用SAに<br/>roles/run.invoker"}} -.許可.-> B
```

> **ここが設計の肝**: 外部に公開するのは Frontend だけ。Billing（お金に関わるAPI）は **認証必須** にして、**Frontend用サービスアカウントだけ** が呼べるようにします。これが「Secure Access between components（コンポーネント間アクセスの保護）」の意味です。

---

## 2. 先に押さえる基礎知識

### 2.1 用語集

| 用語 | 一言で言うと | 本ラボでの登場場面 |
|---|---|---|
| **Cloud Run** | コンテナをサーバー管理なしで動かすサービス。リクエストが無いときは0台まで縮退する | 全タスクのデプロイ先 |
| **コンテナイメージ** | アプリと実行環境をひとまとめにした「配布物」 | `billing-staging-api:0.1` など |
| **Dockerfile** | イメージの作り方を書いたレシピ | 各コードのフォルダに入っている |
| **Cloud Build** | クラウド上でイメージをビルドするサービス | `gcloud builds submit` |
| **gcr.io** | イメージ保管先のドメイン。現在は **Artifact Registry** が裏で保管する | イメージ名 `gcr.io/PROJECT_ID/名前:タグ` |
| **サービス（Service）** | Cloud Runで動くアプリの単位。URLが1つ払い出される | `public-billing-service` など |
| **リビジョン** | サービスのデプロイごとに作られる不変のスナップショット | 再デプロイで増える |
| **サービスアカウント（SA）** | 人ではなく **プログラムが使う身元（ID）** | Task 4, 6 |
| **IAMロール** | 「何をしてよいか」の権限セット | `roles/run.invoker` |
| **roles/run.invoker** | Cloud Runサービスを **呼び出せる** 権限 | Task 6 |
| **認証なし / 認証あり** | 誰でも呼べる / 許可されたIDだけ呼べる | Task 1, 2, 7 / Task 3, 5 |
| **IDトークン** | 「私は誰か」を証明する短命のトークン | `gcloud auth print-identity-token` |
| **ステージング / 本番** | 動作確認用環境 / 実際にユーザーが使う環境 | Task 1〜3 / Task 4〜7 |

### 2.2 「認証なし」とは実は何をしているのか

Cloud Run の「認証なし（unauthenticated）」は、内部的には **`allUsers`（全員）に `roles/run.invoker` を付与** している状態です。

| オプション | 実際の意味 | 呼び出し時 |
|---|---|---|
| `--allow-unauthenticated` | 全員に呼び出し権限を付ける | そのまま `curl URL` で応答する |
| `--no-allow-unauthenticated` | 誰にも付けない（許可したIDだけ） | トークン無しだと **403 Forbidden** |

### 2.3 イメージ作成からサービス公開までの流れ

```mermaid
flowchart LR
    A["ソースコード<br/>＋Dockerfile"] -->|"gcloud builds submit"| B["Cloud Build<br/>イメージをビルド"]
    B -->|"push"| C["gcr.io<br/>（Artifact Registryが保管）"]
    C -->|"gcloud run deploy"| D["Cloud Run<br/>サービス＋URL"]
    D --> E["curlなどで疎通確認"]
```

**この「ビルド → デプロイ → 疎通確認」の3段が、Task 1, 2, 3, 5, 7 で繰り返し出てきます。** 一度型を覚えれば、残りは「フォルダ・イメージ名・サービス名・オプション」を差し替えるだけです。

### 2.4 gcr.io に関する最新の注意点（2026-10-30時点）

- 旧 **Container Registry は2025年3月18日にシャットダウン済み** で、既存の旧形式イメージには依存できません。
- 一方、**Artifact Registry 上の `gcr.io` リポジトリ** は引き続き利用でき、`gcr.io/...` という従来のイメージ名のまま使えます。
- 過去にContainer Registryを使っていないプロジェクト（ラボ用の新規プロジェクトなど）では、`gcr.io` は最初から **Artifact Registry がホスト** します。

つまり、ラボで `gcr.io/$PROJECT_ID/...` と書いても問題ありません。ただし **本番運用では `REGION-docker.pkg.dev` 形式の Artifact Registry リポジトリが推奨** です（第13章で解説）。

---

## 3. 環境準備（Provision the lab environment）

### 3.1 前提チェックリスト

| 確認項目 | OK条件 |
|---|---|
| ブラウザ | **シークレットウィンドウ** を使っている（個人アカウントとの混線を防ぐ） |
| アカウント | ラボ画面の **Student用アカウント** のみでログインしている |
| 課金 | 個人のGoogle Cloudアカウントでログインしていない |
| タイマー | ラボは一時停止できない。時間配分を意識する |

### 3.2 Step 1: Cloud Shell を開く

Google Cloud コンソール右上の **Cloud Shell を有効化** アイコンをクリックします。ブラウザ内にLinuxターミナルが開きます。`gcloud` や `git` は最初から入っています。

### 3.3 Step 2: プロジェクトを設定する

```bash
gcloud config set project \
$(gcloud projects list --format='value(PROJECT_ID)' \
--filter='qwiklabs-gcp')
```

**何をしているか**: `gcloud projects list` でプロジェクトを一覧し、名前が `qwiklabs-gcp` を含むものだけを抽出してプロジェクトIDを取り出し、それを **既定プロジェクト** に設定します。

### 3.4 Step 3: リージョンを設定する

ラボ画面に書かれている **リージョン名** を、`REGION` の部分にそのまま使います（例: `us-central1` のような値。**必ずラボ画面の値** を使う）。

```bash
export REGION=ラボ画面に表示されているリージョン
gcloud config set run/region $REGION
```

> `export` で変数にしておくと、以降のコマンドで `$REGION` と書くだけで済み、**打ち間違いを防げます**。

### 3.5 Step 4: 共通変数を一括設定する

```bash
# プロジェクトID
export PROJECT_ID=$(gcloud config get-value project)

# サービス名・サービスアカウント名（ラボ画面の値と違う場合はここだけ直す）
export PUBLIC_BILLING_SVC=public-billing-service
export FRONTEND_STG_SVC=frontend-staging-service
export PRIVATE_BILLING_SVC=private-billing-service
export BILLING_SA=billing-service-sa
export PROD_BILLING_SVC=billing-prod-service
export FRONTEND_SA=frontend-service-sa
export PROD_FRONTEND_SVC=frontend-prod-service

# 確認
echo "PROJECT_ID=$PROJECT_ID  REGION=$REGION"
```

> **注意**: Cloud Shell は一定時間操作がないと **再接続** され、`export` した変数が消えます。コマンドが急に失敗したら、まず `echo $PROJECT_ID $REGION` で変数が残っているか確認し、消えていたらこの章をやり直してください。

### 3.6 Step 5: 必要なAPIの有効化（念のため）

ラボ環境では有効化済みのことが多いですが、**何度実行しても安全（冪等）** なので念のため実行します。

```bash
gcloud services enable \
  run.googleapis.com \
  cloudbuild.googleapis.com \
  artifactregistry.googleapis.com
```

### 3.7 Step 6: コードを取得する

```bash
git clone https://github.com/rosera/pet-theory.git && cd pet-theory/lab07
ls
```

`ls` で、各タスクで使うフォルダが並んでいることを確認します。

| フォルダ | 使うタスク | 内容 |
|---|---|---|
| `unit-api-billing` | Task 1 | 公開Billing API（初版） |
| `staging-frontend-billing` | Task 2 | ステージング用Frontend |
| `staging-api-billing` | Task 3 | 更新版Billing API（非公開用） |
| `prod-api-billing` | Task 5 | 本番用Billing API |
| `prod-frontend-billing` | Task 7 | 本番用Frontend |

### 3.8 名前の対応表（ここだけ見れば迷わない）

| Task | 手順書の表記 | この文書で使う値 | 用途 |
|---|---|---|---|
| 1 | Billing Service | `public-billing-service` | 公開Billingサービス名 |
| 1 | Billing Image | `billing-staging-api:0.1` | イメージ名:タグ |
| 2 | Frontend staging service | `frontend-staging-service` | ステージングFrontend名 |
| 2 | Image Name | `frontend-staging:0.1` | イメージ名:タグ |
| 3 | Private billing service | `private-billing-service` | 非公開Billingサービス名 |
| 3 | Image Name | `billing-staging-api:0.2` | イメージ名:タグ |
| 4 | Billing service account | `billing-service-sa` | SAのID |
| 4 | Display Name | `Billing Service Cloud Run` | SAの表示名 |
| 5 | Billing production service | `billing-prod-service` | 本番Billing名 |
| 5 | Image Name | `billing-prod-api:0.1` | イメージ名:タグ |
| 6 | Frontend service account | `frontend-service-sa` | SAのID |
| 6 | Display Name | `Billing Service Cloud Run Invoker` | SAの表示名 |
| 7 | Frontend production service | `frontend-prod-service` | 本番Frontend名 |
| 7 | Image Name | `frontend-prod:0.1` | イメージ名:タグ |

> **再確認**: 上記のサービス名・SA名は「一般的な命名」です。ラボ画面に別の指定があれば **そちらが正** です。特に **イメージ名とタグ（`0.1` / `0.2`）は採点に関わりやすい** ので、一文字も変えないでください。

---

## Task 1: 公開Billingサービスをデプロイする

### 1.1 ゴール

| 項目 | 値 |
|---|---|
| イメージ | `billing-staging-api:0.1` |
| サービス | 公開Billingサービス |
| 認証 | **なし（unauthenticated）** |
| コード | `pet-theory/lab07/unit-api-billing` |

**採点される3点**: ① Cloud Buildでイメージをビルド ② 認証なしでCloud Runにデプロイ ③ エンドポイントにアクセスして応答がある

### 1.2 Step 1: ソースフォルダへ移動し、中身を確認する

```bash
cd pet-theory/lab07/unit-api-billing
ls
cat Dockerfile
```

**なぜ中身を見るのか**: チャレンジラボでは「何が入っているか」を自分で確認する習慣が大切です。`Dockerfile` があれば、そのフォルダがビルド対象だと分かります。

### 1.3 Step 2: Cloud Buildでイメージをビルドする

```bash
gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/billing-staging-api:0.1 .
```

| 部分 | 意味 |
|---|---|
| `gcloud builds submit` | 現在のフォルダをCloud Buildに送ってビルドする |
| `--tag gcr.io/$PROJECT_ID/billing-staging-api:0.1` | 完成したイメージの **名前:タグ** |
| 末尾の `.` | ビルド対象は **現在のフォルダ**（ピリオドの付け忘れに注意） |

成功すると、最後に `SUCCESS` と表示されます。

### 1.4 Step 3: Cloud Runにデプロイする（認証なし）

```bash
gcloud run deploy $PUBLIC_BILLING_SVC \
  --image gcr.io/$PROJECT_ID/billing-staging-api:0.1 \
  --region $REGION \
  --allow-unauthenticated
```

| オプション | 意味 |
|---|---|
| `gcloud run deploy サービス名` | サービスを作成（既にあれば新リビジョンで更新） |
| `--image` | Step 2で作ったイメージを指定 |
| `--region` | デプロイ先リージョン |
| `--allow-unauthenticated` | **認証なし（全員が呼べる）** |

> 途中で対話的に質問された場合（APIの有効化やリージョン選択など）は、ラボ画面のリージョンを選び、有効化は `y` で進めます。

### 1.5 Step 4: 疎通確認

```bash
PUBLIC_BILLING_URL=$(gcloud run services describe $PUBLIC_BILLING_SVC \
  --region $REGION \
  --format "value(status.url)")
echo $PUBLIC_BILLING_URL
curl $PUBLIC_BILLING_URL
```

**ここで確認すること**: トークン無しの `curl` で **応答が返ってくる**（403ではない）。これが「公開サービス」の正しい状態です。

### 1.6 つまずきポイント

| 症状 | 原因 | 対処 |
|---|---|---|
| `curl` が **403** | `--allow-unauthenticated` を付け忘れた | 同じ `deploy` コマンドを `--allow-unauthenticated` 付きで再実行 |
| ビルドで `Dockerfile` が見つからない | 別のフォルダでコマンドを実行した | `pwd` で場所を確認し、正しいフォルダへ `cd` |
| 進捗チェックが通らない | 反映待ち | **30秒待って** 再度 Check my progress |

---

## Task 2: ステージングのフロントエンドをデプロイする

### 2.1 ゴール

| 項目 | 値 |
|---|---|
| イメージ | `frontend-staging:0.1` |
| サービス | ステージングFrontendサービス |
| 認証 | **なし（unauthenticated）** |
| コード | `pet-theory/lab07/staging-frontend-billing` |

### 2.2 手順

Task 1 とまったく同じ型です。**変わるのは、フォルダ・イメージ名・サービス名だけ** です。

```bash
cd pet-theory/lab07/staging-frontend-billing
ls

# ビルド
gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/frontend-staging:0.1 .

# デプロイ（認証なし）
gcloud run deploy $FRONTEND_STG_SVC \
  --image gcr.io/$PROJECT_ID/frontend-staging:0.1 \
  --region $REGION \
  --allow-unauthenticated
```

### 2.3 疎通確認

```bash
FRONTEND_STG_URL=$(gcloud run services describe $FRONTEND_STG_SVC \
  --region $REGION \
  --format "value(status.url)")
echo $FRONTEND_STG_URL
curl $FRONTEND_STG_URL
```

ブラウザで `$FRONTEND_STG_URL` を開いても確認できます。

### 2.4 ポイント

- Frontendは **ユーザーのブラウザから直接開かれる** ため、「認証なし（公開）」が正しい設計です。
- 「Frontendは公開、Billing（お金のAPI）は非公開」という **役割による使い分け** が、このラボ全体のテーマです。

---

## Task 3: 非公開Billingサービスへ置き換える

### 3.1 状況の整理

開発チームがアプリを更新しました。**更新版（`0.2`）を、今度は認証必須でデプロイ** します。

| 項目 | 値 |
|---|---|
| イメージ | `billing-staging-api:0.2` |
| サービス | 非公開Billingサービス |
| リポジトリ | `gcr.io` |
| 認証 | **あり（authenticated）** |
| コード | `pet-theory/lab07/staging-api-billing` |

**採点される4点**: ① 既存Billingサービスの削除 ② Cloud Buildでビルド ③ 認証ありでデプロイ ④ サービスURLを環境変数に入れて疎通確認

### 3.2 なぜ既存サービスを削除するのか

Task 1 で作った公開Billingサービスは、**誰でも呼べる状態でインターネットに残っています**。非公開版に置き換えるなら、公開版を残しておく理由はありません。放置すると **セキュリティ上の穴** になります。

```mermaid
flowchart LR
    A["公開Billing<br/>認証なし<br/>（Task 1で作成）"] -->|"削除"| X["（なし）"]
    X --> B["非公開Billing<br/>認証あり<br/>（Task 3で作成）"]
```

### 3.3 Step 1: 既存の公開Billingサービスを削除する

```bash
gcloud run services delete $PUBLIC_BILLING_SVC \
  --region $REGION \
  --quiet
```

`--quiet` は確認プロンプトを省略するオプションです。削除は取り消せないので、**サービス名が正しいか** を事前に `gcloud run services list` で確認してください。

```bash
gcloud run services list --region $REGION
```

### 3.4 Step 2: 更新版をビルドする

```bash
cd pet-theory/lab07/staging-api-billing
ls

gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/billing-staging-api:0.2 .
```

### 3.5 Step 3: 認証必須でデプロイする

```bash
gcloud run deploy $PRIVATE_BILLING_SVC \
  --image gcr.io/$PROJECT_ID/billing-staging-api:0.2 \
  --region $REGION \
  --no-allow-unauthenticated
```

**Task 1との違いはたった1つ**: `--allow-unauthenticated` が `--no-allow-unauthenticated` に変わっただけです。

### 3.6 Step 4: URLを環境変数に入れる

```bash
BILLING_URL=$(gcloud run services describe $PRIVATE_BILLING_SVC \
  --region $REGION \
  --format "value(status.url)")
echo $BILLING_URL
```

| 部分 | 意味 |
|---|---|
| `gcloud run services describe サービス名` | サービスの詳細情報を取得 |
| `--format "value(status.url)"` | 詳細のうち **URLの値だけ** を取り出す |
| `BILLING_URL=$(...)` | 出力をシェル変数に保存 |

> **注意（手順書の表記について）**: 手順書の `describe` の後ろには `Private billing service` と書かれていますが、これは説明表記です。**実際のサービス名**（`$PRIVATE_BILLING_SVC`）を指定してください。スペースを含む名前はCloud Runのサービス名にできません。

### 3.7 Step 5: 疎通確認（2パターンで理解する）

**まず、トークン無しで呼ぶ（失敗するのが正解）**

```bash
curl $BILLING_URL
```

`403 Forbidden` が返ります。**これは「保護が効いている」証拠** です。

**次に、IDトークン付きで呼ぶ（成功するのが正解）**

```bash
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" $BILLING_URL
```

応答が返れば成功です。

```mermaid
sequenceDiagram
    autonumber
    participant You as あなた（Cloud Shell）
    participant GC as gcloud
    participant B as 非公開Billingサービス
    You->>B: curl（トークンなし）
    B-->>You: 403 Forbidden
    You->>GC: gcloud auth print-identity-token
    GC-->>You: IDトークン（あなたの身元証明）
    You->>B: curl + Authorization: Bearer トークン
    B->>B: IAMでrun.invokerを確認
    B-->>You: 200 OK
```

> **補足**: 手順書では `curl -X get` と小文字で書かれていますが、`curl` は **何も指定しなければGETで送る** ため `-X` は不要です。HTTPメソッド名は本来大文字（`GET`）なので、明示するなら `-X GET` とします。

### 3.8 つまずきポイント

| 症状 | 原因 | 対処 |
|---|---|---|
| トークン付きでも403 | 反映待ち、または別アカウントで実行 | 少し待つ。`gcloud auth list` で学生アカウントか確認 |
| `Service not found` | サービス名の打ち間違い | `gcloud run services list` で名前を確認 |
| 削除前にデプロイしてしまった | 順序ミス | 公開版が残っていれば削除してから再確認 |

---

## Task 4: Billing用サービスアカウントを作る

### 4.1 そもそもなぜサービスアカウントが必要か

Cloud Runのサービスは、デプロイ時に特に指定しないと **デフォルトのサービスアカウント**（Compute Engineのデフォルトアカウント）で動きます。このアカウントは **広い権限を持っていることが多く**、アプリが乗っ取られた場合の被害が大きくなります。

**ベストプラクティスは「サービスごとに専用のサービスアカウントを作り、必要最小限の権限だけを付ける」** ことです。

| 方式 | 権限 | リスク |
|---|---|---|
| デフォルトSAを使う | 広い（プロジェクトの編集権限を持つ場合もある） | 高い |
| **専用SAを使う** | **必要なものだけ** | **低い** |

### 4.2 ゴール

| 項目 | 値 |
|---|---|
| サービスアカウント | Billing用サービスアカウント |
| 表示名（Display Name） | `Billing Service Cloud Run` |
| ロール | **N/A（付けない）** |

### 4.3 手順

```bash
gcloud iam service-accounts create $BILLING_SA \
  --display-name "Billing Service Cloud Run"
```

| 部分 | 意味 |
|---|---|
| `gcloud iam service-accounts create ID` | サービスアカウントを作成。**ID** は後で変更できない |
| `--display-name` | コンソールに表示される分かりやすい名前 |

### 4.4 確認

```bash
gcloud iam service-accounts list
```

作成したSAのメールアドレスは次の形式になります。

```text
billing-service-sa@PROJECT_ID.iam.gserviceaccount.com
```

### 4.5 「ロール N/A」の意味

**Billingサービスは他のGoogle Cloudリソース（Cloud Storageなど）を使わない** ため、追加のロールは不要です。「何も付けない」のが **最小権限の原則** に沿った正しい姿です。

> **よくある誤解**: 「SAを作ったらEditorなどを付けておこう」は **NG** です。必要になった時点で、必要なロールだけを付けます。

---

## Task 5: 本番Billingサービスをデプロイする

### 5.1 ゴール

| 項目 | 値 |
|---|---|
| イメージ | `billing-prod-api:0.1` |
| サービス | 本番Billingサービス |
| リポジトリ | `gcr.io` |
| 認証 | **あり（authenticated）** |
| コード | `pet-theory/lab07/prod-api-billing` |
| サービスアカウント | Task 4 で作ったBilling用SA |

**採点される4点**: ① デプロイ ② 認証有効 ③ サービスアカウント紐付け ④ 応答確認

### 5.2 Step 1: ビルド

```bash
cd pet-theory/lab07/prod-api-billing
ls

gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/billing-prod-api:0.1 .
```

### 5.3 Step 2: デプロイ（認証あり＋サービスアカウント）

```bash
gcloud run deploy $PROD_BILLING_SVC \
  --image gcr.io/$PROJECT_ID/billing-prod-api:0.1 \
  --region $REGION \
  --no-allow-unauthenticated \
  --service-account $BILLING_SA@$PROJECT_ID.iam.gserviceaccount.com
```

| オプション | 意味 |
|---|---|
| `--no-allow-unauthenticated` | 認証必須 |
| `--service-account` | **このサービスが実行時に使う身元**。メールアドレス形式で指定 |

> **ポイント**: `--service-account` は **「このサービス自身が何者として動くか」** を決めるオプションです。「誰がこのサービスを呼べるか」とは **別の話** です（呼べる人は `run.invoker` で決まります。Task 6 で扱います）。

```mermaid
flowchart TB
    subgraph W["2つの権限の向きを区別する"]
        direction TB
        A["実行SA（--service-account）<br/>このサービスが外へ出るときの身元"]
        B["呼び出し権限（run.invoker）<br/>このサービスを呼べる人"]
    end
    A --- N1["Task 5 で設定<br/>（Billing用SAを紐付け）"]
    B --- N2["Task 6 で設定<br/>（Frontend用SAに付与）"]
```

### 5.4 Step 3: 疎通確認

```bash
PROD_BILLING_URL=$(gcloud run services describe $PROD_BILLING_SVC \
  --region $REGION \
  --format "value(status.url)")
echo $PROD_BILLING_URL

curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" \
  $PROD_BILLING_URL
```

### 5.5 SA紐付けの確認

```bash
gcloud run services describe $PROD_BILLING_SVC \
  --region $REGION \
  --format "value(spec.template.spec.serviceAccountName)"
```

`billing-service-sa@...` と表示されれば、期待通りに紐付いています。

### 5.6 トークン無しでも確認する（保護の確認）

```bash
curl $PROD_BILLING_URL
```

`403` になることを確認します。**「通る確認」と「止まる確認」の両方をやる** のが、セキュリティ設定の基本です。

---

## Task 6: Frontend用サービスアカウントを作り権限を付ける

### 6.1 状況の整理

Task 5 で本番Billingを **認証必須** にしたため、そのままではFrontendもBillingを呼べません。そこで **Frontend専用のサービスアカウントを作り、本番Billingを呼べる権限だけを付けます**。

| 項目 | 値 |
|---|---|
| サービスアカウント | Frontend用サービスアカウント |
| 表示名 | `Billing Service Cloud Run Invoker` |
| ロール | `run.invoker` |

**採点される4点**: ① SA作成 ② Frontendサービスで使う準備 ③ `run.invoker` 付与 ④ サービスへのバインド

### 6.2 Step 1: サービスアカウントを作成する

```bash
gcloud iam service-accounts create $FRONTEND_SA \
  --display-name "Billing Service Cloud Run Invoker"
```

### 6.3 Step 2: 本番Billingサービスに `run.invoker` を付与する

```bash
gcloud run services add-iam-policy-binding $PROD_BILLING_SVC \
  --region $REGION \
  --member "serviceAccount:$FRONTEND_SA@$PROJECT_ID.iam.gserviceaccount.com" \
  --role "roles/run.invoker"
```

| オプション | 意味 | 本ラボの値 |
|---|---|---|
| `add-iam-policy-binding` | 既存のポリシーに **1件追加** する（他の権限は消えない） | - |
| 対象（位置引数） | **どのリソースに** 権限を付けるか | 本番Billingサービス |
| `--member` | **誰に** 付けるか | Frontend用SA |
| `--role` | **どの権限を** 付けるか | `roles/run.invoker` |

### 6.4 「誰に・何を・どこに」を図で理解する

```mermaid
flowchart LR
    M["誰に（member）<br/>Frontend用SA"] -->|"何を（role）<br/>roles/run.invoker"| R["どこに（resource）<br/>本番Billingサービス"]
```

> **ベストプラクティス**: 権限は **プロジェクト全体ではなく、サービス単位** で付けます。プロジェクト全体に `run.invoker` を付けると、他のすべてのCloud Runサービスも呼べてしまいます（権限が広すぎる）。今回の「Bind Account to Service」は、まさに **サービス単位のバインド** を指しています。

### 6.5 Step 3: 確認

```bash
gcloud run services get-iam-policy $PROD_BILLING_SVC --region $REGION
```

出力に、次のような部分があれば成功です。

```text
- members:
  - serviceAccount:frontend-service-sa@PROJECT_ID.iam.gserviceaccount.com
  role: roles/run.invoker
```

### 6.6 つまずきポイント

| 症状 | 原因 | 対処 |
|---|---|---|
| `Service account ... does not exist` | SA作成直後で反映待ち | 数十秒待ってから再実行 |
| `Service not found` | Billing本番サービスが未作成 | Task 5 を先に完了する |
| 付与したのに後で403 | 付与先サービスの取り違え | `get-iam-policy` で **本番Billing** に付いているか確認 |

---

## Task 7: 本番Frontendを再デプロイする

### 7.1 ゴール

| 項目 | 値 |
|---|---|
| イメージ | `frontend-prod:0.1` |
| サービス | 本番Frontendサービス |
| リポジトリ | `gcr.io` |
| 認証 | **なし（unauthenticated）** |
| コード | `pet-theory/lab07/prod-frontend-billing` |
| サービスアカウント | Task 6 で作ったFrontend用SA |

### 7.2 「認証なし」と「Enable Authentication」は矛盾しない

手順書の表は認証が **unauthenticated**、評価項目には **Enable Authentication** と書かれていて混乱しやすい箇所です。次のように整理します。

| 通信の区間 | 認証 | 理由 |
|---|---|---|
| ユーザーのブラウザ → Frontend | **なし（公開）** | ブラウザからトークン無しで画面を開けるようにするため |
| Frontend → Billing | **あり（IDトークン）** | Billingは非公開。Frontend用SAの身元で呼ぶ |

> 表の `unauthenticated` は **Frontend自身の公開設定**、`Enable Authentication` は **FrontendがBillingへ認証付きでアクセスする仕組み（SAの利用）** を指していると読み取れます。デプロイ時は **表の値（認証なし）** に従ってください。

### 7.3 Step 1: コードを確認する（重要）

```bash
cd pet-theory/lab07/prod-frontend-billing
ls
cat Dockerfile
grep -rn "process.env" . --include=*.js --exclude-dir=node_modules
```

**なぜ確認するのか**: FrontendがBillingのURLを **環境変数で受け取る設計** の場合、デプロイ時にその値を渡さないと画面にデータが出ません。手順書に書かれていなくても、**コードが環境変数を読んでいるなら渡す** のがエンジニアの仕事です。

| `grep` の結果 | 対応 |
|---|---|
| 環境変数（例: Billing URLを読む変数）が見つかる | 次のStep 3で `--set-env-vars` を付ける |
| 何も見つからない | 付けなくてよい |

### 7.4 Step 2: ビルド

```bash
gcloud builds submit \
  --tag gcr.io/$PROJECT_ID/frontend-prod:0.1 .
```

### 7.5 Step 3: デプロイ（公開＋サービスアカウント）

**基本形**

```bash
gcloud run deploy $PROD_FRONTEND_SVC \
  --image gcr.io/$PROJECT_ID/frontend-prod:0.1 \
  --region $REGION \
  --allow-unauthenticated \
  --service-account $FRONTEND_SA@$PROJECT_ID.iam.gserviceaccount.com
```

**コードが環境変数でBilling URLを受け取る場合**（変数名はコードで確認した名前に置き換える）

```bash
PROD_BILLING_URL=$(gcloud run services describe $PROD_BILLING_SVC \
  --region $REGION --format "value(status.url)")

gcloud run deploy $PROD_FRONTEND_SVC \
  --image gcr.io/$PROJECT_ID/frontend-prod:0.1 \
  --region $REGION \
  --allow-unauthenticated \
  --service-account $FRONTEND_SA@$PROJECT_ID.iam.gserviceaccount.com \
  --set-env-vars "変数名=$PROD_BILLING_URL"
```

### 7.6 Step 4: 動作確認（最終ゴール）

```bash
PROD_FRONTEND_URL=$(gcloud run services describe $PROD_FRONTEND_SVC \
  --region $REGION \
  --format "value(status.url)")
echo $PROD_FRONTEND_URL
```

表示されたURLを **ブラウザで開き**、**Billing Service のページ（請求情報の画面）** が表示されれば完成です。

画面のデータは、FrontendがFrontend用SAの身元で、非公開の本番Billingから取得しています。

```mermaid
sequenceDiagram
    autonumber
    actor U as ユーザー（ブラウザ）
    participant F as 本番Frontend（公開）
    participant M as メタデータサーバー
    participant B as 本番Billing（非公開）
    U->>F: ページを開く（認証なし）
    F->>M: IDトークンを要求（宛先はBillingのURL）
    M-->>F: Frontend用SAのIDトークン
    F->>B: Authorization: Bearer IDトークン
    B->>B: IAM確認（run.invokerあり？）
    B-->>F: 200 請求データ
    F-->>U: 画面を表示
```

### 7.7 画面にデータが出ないときの切り分け

```mermaid
flowchart TD
    A["Frontendの画面は開くが<br/>請求データが出ない"] --> B{"FrontendのログにBillingへの<br/>呼び出しエラーがある？"}
    B -->|"403"| C["Task 6のrun.invokerを確認<br/>付与先は本番Billingか？<br/>メンバーはFrontend用SAか？"]
    B -->|"401"| D["IDトークンの宛先が違う可能性<br/>Billing URLを確認"]
    B -->|"接続できない / URL未設定"| E["環境変数でBilling URLを<br/>渡す設計かコードを確認"]
    B -->|"エラーなし"| F["Frontendに紐付いたSAが<br/>Frontend用SAか確認"]
```

ログの確認コマンド:

```bash
gcloud logging read \
  "resource.type=cloud_run_revision AND resource.labels.service_name=$PROD_FRONTEND_SVC" \
  --limit 20 \
  --format "value(timestamp, textPayload)"
```

---

## 11. 全タスク通しのコマンドまとめ

> **使い方**: 各タスクの意味を理解したあとに、復習用として使ってください。**意味を理解せずにコピペするのは非推奨** です（名前の違いや、Task 7の環境変数など、確認が必要な箇所があるため）。

```bash
# ===== 環境準備 =====
gcloud config set project \
$(gcloud projects list --format='value(PROJECT_ID)' --filter='qwiklabs-gcp')
export REGION=ラボ画面に表示されているリージョン
gcloud config set run/region $REGION
export PROJECT_ID=$(gcloud config get-value project)

export PUBLIC_BILLING_SVC=public-billing-service
export FRONTEND_STG_SVC=frontend-staging-service
export PRIVATE_BILLING_SVC=private-billing-service
export BILLING_SA=billing-service-sa
export PROD_BILLING_SVC=billing-prod-service
export FRONTEND_SA=frontend-service-sa
export PROD_FRONTEND_SVC=frontend-prod-service

gcloud services enable run.googleapis.com cloudbuild.googleapis.com artifactregistry.googleapis.com
git clone https://github.com/rosera/pet-theory.git && cd pet-theory/lab07

# ===== Task 1: 公開Billing =====
cd pet-theory/lab07/unit-api-billing
gcloud builds submit --tag gcr.io/$PROJECT_ID/billing-staging-api:0.1 .
gcloud run deploy $PUBLIC_BILLING_SVC \
  --image gcr.io/$PROJECT_ID/billing-staging-api:0.1 \
  --region $REGION --allow-unauthenticated
curl $(gcloud run services describe $PUBLIC_BILLING_SVC --region $REGION --format "value(status.url)")

# ===== Task 2: ステージングFrontend =====
cd pet-theory/lab07/staging-frontend-billing
gcloud builds submit --tag gcr.io/$PROJECT_ID/frontend-staging:0.1 .
gcloud run deploy $FRONTEND_STG_SVC \
  --image gcr.io/$PROJECT_ID/frontend-staging:0.1 \
  --region $REGION --allow-unauthenticated

# ===== Task 3: 非公開Billing（置き換え）=====
gcloud run services delete $PUBLIC_BILLING_SVC --region $REGION --quiet
cd pet-theory/lab07/staging-api-billing
gcloud builds submit --tag gcr.io/$PROJECT_ID/billing-staging-api:0.2 .
gcloud run deploy $PRIVATE_BILLING_SVC \
  --image gcr.io/$PROJECT_ID/billing-staging-api:0.2 \
  --region $REGION --no-allow-unauthenticated
BILLING_URL=$(gcloud run services describe $PRIVATE_BILLING_SVC --region $REGION --format "value(status.url)")
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" $BILLING_URL

# ===== Task 4: Billing用SA =====
gcloud iam service-accounts create $BILLING_SA --display-name "Billing Service Cloud Run"

# ===== Task 5: 本番Billing =====
cd pet-theory/lab07/prod-api-billing
gcloud builds submit --tag gcr.io/$PROJECT_ID/billing-prod-api:0.1 .
gcloud run deploy $PROD_BILLING_SVC \
  --image gcr.io/$PROJECT_ID/billing-prod-api:0.1 \
  --region $REGION --no-allow-unauthenticated \
  --service-account $BILLING_SA@$PROJECT_ID.iam.gserviceaccount.com
PROD_BILLING_URL=$(gcloud run services describe $PROD_BILLING_SVC --region $REGION --format "value(status.url)")
curl -H "Authorization: Bearer $(gcloud auth print-identity-token)" $PROD_BILLING_URL

# ===== Task 6: Frontend用SA + run.invoker =====
gcloud iam service-accounts create $FRONTEND_SA --display-name "Billing Service Cloud Run Invoker"
gcloud run services add-iam-policy-binding $PROD_BILLING_SVC \
  --region $REGION \
  --member "serviceAccount:$FRONTEND_SA@$PROJECT_ID.iam.gserviceaccount.com" \
  --role "roles/run.invoker"

# ===== Task 7: 本番Frontend =====
cd pet-theory/lab07/prod-frontend-billing
grep -rn "process.env" . --include=*.js --exclude-dir=node_modules   # 環境変数の要否を確認
gcloud builds submit --tag gcr.io/$PROJECT_ID/frontend-prod:0.1 .
gcloud run deploy $PROD_FRONTEND_SVC \
  --image gcr.io/$PROJECT_ID/frontend-prod:0.1 \
  --region $REGION --allow-unauthenticated \
  --service-account $FRONTEND_SA@$PROJECT_ID.iam.gserviceaccount.com
  # 環境変数が必要なら: --set-env-vars "変数名=$PROD_BILLING_URL"
```

### 完了チェックリスト

| 確認 | 内容 | OK |
|---|---|---|
| Task 1 | 公開Billingがトークン無しで応答 | ☐ |
| Task 2 | ステージングFrontendが応答 | ☐ |
| Task 3 | 公開Billing削除済み。非公開Billingはトークン無し403、トークン付き成功 | ☐ |
| Task 4 | Billing用SAが一覧に存在 | ☐ |
| Task 5 | 本番BillingにBilling用SAが紐付き、トークン無し403 | ☐ |
| Task 6 | Frontend用SAが本番Billingの `run.invoker` に入っている | ☐ |
| Task 7 | 本番Frontendのブラウザ表示でBillingのデータが見える | ☐ |

---

## 12. トラブルシューティング

### 12.1 エラー別の早見表

| 症状 | 主な原因 | 対処 |
|---|---|---|
| `curl` が **403 Forbidden** | 認証必須サービスにトークン無しで呼んだ / 権限不足 | 非公開サービスなら正常。呼びたいなら `Authorization: Bearer $(gcloud auth print-identity-token)` を付ける |
| `curl` が **401 Unauthorized** | トークンが無効・期限切れ | トークンを再取得して再実行 |
| `curl` が **404** | URLのパスが違う / アプリ側の仕様 | `curl -i URL` でヘッダと本文を確認 |
| `PERMISSION_DENIED`（デプロイ時） | 学生アカウント以外でログインしている | `gcloud auth list` で確認 |
| `Image not found` | ビルドが失敗した / イメージ名・タグの打ち間違い | `gcloud builds list` と、イメージ名の `0.1` / `0.2` を確認 |
| `Service account ... does not exist` | SA作成直後、またはメールアドレスの綴りミス | 数十秒待つ。`gcloud iam service-accounts list` で確認 |
| デプロイは成功したが起動しない | アプリがポートで待ち受けていない | Cloud Runは環境変数 `PORT` で受け付ける。ログを確認 |
| 変数が空（`echo` で何も出ない） | Cloud Shellが再接続された | 第3章の変数設定をやり直す |
| Check my progress が通らない | 反映待ち / 名前・タグの不一致 | **30秒待つ** → 名前・タグ・認証設定をラボ画面と照合 |

### 12.2 切り分けフローチャート

```mermaid
flowchart TD
    A["エラーが出た"] --> B{"どの段階？"}
    B -->|"ビルド<br/>gcloud builds submit"| C["フォルダは正しいか？pwd / ls<br/>Dockerfileはあるか？<br/>末尾のピリオドはあるか？"]
    B -->|"デプロイ<br/>gcloud run deploy"| D["イメージ名とタグは<br/>ビルド時と完全一致か？<br/>SAのメールは正しいか？"]
    B -->|"呼び出し<br/>curl"| E{"HTTPステータスは？"}
    E -->|"403"| F["サービスは認証必須か？<br/>トークンを付けたか？<br/>run.invokerが付いているか？"]
    E -->|"401"| G["トークンを取り直す"]
    E -->|"5xx"| H["ログを確認<br/>gcloud logging read"]
    B -->|"採点が通らない"| I["30秒待つ<br/>名前・タグ・認証設定を再確認"]
```

### 12.3 エラーメッセージを読む習慣（チャレンジラボの本質）

チャレンジラボでは、**エラーメッセージの調査と修正が学習の一部** として想定されています。次の順で読むと、原因にたどり着きやすくなります。

| 順番 | 見る場所 | 例 |
|---|---|---|
| 1 | エラーの **1行目** | `ERROR: (gcloud.run.deploy) ...` |
| 2 | **どのリソース** の話か | サービス名、イメージ名、SA名 |
| 3 | **何が足りない・違う** と言っているか | `not found` / `permission denied` / `invalid` |
| 4 | `gcloud ... --help` | オプション名の確認 |

---

## 13. ベストプラクティス解説（本番運用の視点）

このラボは学習用に簡略化されています。実際の本番運用では、次の観点を加えます。

### 13.1 本ラボで実践している良い設計

| 実践項目 | 内容 | 効果 |
|---|---|---|
| **公開範囲の最小化** | 公開するのはFrontendだけ。Billingは認証必須 | 攻撃対象領域を縮小 |
| **専用サービスアカウント** | サービスごとに別のSAを使う | 被害の影響範囲を限定 |
| **最小権限** | Billing用SAにはロールなし。Frontend用SAには `run.invoker` のみ | 権限の過剰付与を防ぐ |
| **サービス単位のIAM** | プロジェクト全体ではなく特定サービスにバインド | 横展開を防ぐ |
| **段階的なリリース** | ステージング → 本番 | 本番前に問題を検出 |
| **不要リソースの削除** | 公開Billingを削除 | 放置された公開口をなくす |

### 13.2 本番運用で追加したいこと

| 観点 | 推奨事項 |
|---|---|
| **イメージの保管先** | 新規には `REGION-docker.pkg.dev/PROJECT/REPO/IMAGE:TAG` 形式のArtifact Registryを推奨。`gcr.io` は互換のために残された形式 |
| **イメージのバージョン固定** | `latest` を避け、タグ固定やダイジェスト（`@sha256:...`）で指定し、再現性を確保 |
| **環境の分離** | ステージングと本番を **別プロジェクト** に分ける。IAMや課金も分離できる |
| **秘密情報** | パスワードやAPIキーは環境変数に直書きせず **Secret Manager** を使う（URLのような非機密値は環境変数で可） |
| **CI/CD** | 手動の `gcloud` ではなく、Cloud Buildトリガーなどで自動化し、再現性と監査性を確保 |
| **ネットワーク制御** | バックエンド側は Ingress 制限の利用を検討（Cloud Run同士で内部限定にする場合は、VPC経由の接続設計が別途必要） |
| **監視** | Cloud Logging / Cloud Monitoring でエラー率・レイテンシのアラートを設定 |
| **スケール設定** | `--min-instances`（コールドスタート対策）、`--max-instances`（コスト上限）、`--concurrency` を要件に合わせて調整 |
| **ロールバック** | リビジョンは残るため、問題発生時は **過去リビジョンにトラフィックを戻す** だけで復旧できる |

### 13.3 認証方式の整理

| シナリオ | 推奨される認証 |
|---|---|
| 人間が検証でCloud Shellから呼ぶ | `gcloud auth print-identity-token` |
| **Cloud Run → Cloud Run（本ラボ）** | **サービスアカウントのIDトークン＋`run.invoker`** |
| 外部の一般ユーザー向けAPI | 公開 ＋ アプリ層での認証（API Gateway、Identity Platformなど） |

### 13.4 設計判断の理由（なぜこうするのか）

```mermaid
flowchart TD
    Q1{"インターネットから<br/>直接呼ばれる必要がある？"} -->|"はい（画面など）"| P["公開<br/>--allow-unauthenticated"]
    Q1 -->|"いいえ（内部API）"| N["認証必須<br/>--no-allow-unauthenticated"]
    N --> Q2{"誰が呼ぶ？"}
    Q2 -->|"他のCloud Runサービス"| SA["呼び出し元の専用SAに<br/>run.invokerを付与"]
    Q2 -->|"人間（検証）"| ID["IDトークン付きで呼ぶ"]
```

---

## 14. 理解度チェック

### Q1. `--allow-unauthenticated` を付けたサービスは、内部的には何をしている？

<details>
<summary>答えを見る</summary>

`allUsers`（全員）に `roles/run.invoker` を付与している。そのため誰でもトークン無しで呼び出せる。

</details>

### Q2. 認証必須のサービスにトークン無しで `curl` したときのステータスは？ それは失敗？

<details>
<summary>答えを見る</summary>

`403 Forbidden`。**失敗ではなく、保護が正しく効いている状態**。

</details>

### Q3. `--service-account` と `roles/run.invoker` の違いは？

<details>
<summary>答えを見る</summary>

`--service-account` は **そのサービスが実行時に使う身元（外へ出るときの身元）**。`run.invoker` は **そのサービスを呼び出せる権限（入ってくる側の許可）**。向きが逆。

</details>

### Q4. Task 4 でBilling用SAにロールを付けない理由は？

<details>
<summary>答えを見る</summary>

Billingサービスは他のGoogle Cloudリソースを使わないため。**最小権限の原則** により、必要になるまで何も付けない。

</details>

### Q5. `run.invoker` をプロジェクト全体ではなくサービスに付ける理由は？

<details>
<summary>答えを見る</summary>

プロジェクト全体に付けると、そのSAが **すべてのCloud Runサービスを呼べてしまう** ため。必要な呼び先（本番Billing）だけに限定する。

</details>

### Q6. Task 3 で公開Billingを削除する理由は？

<details>
<summary>答えを見る</summary>

認証なしの公開サービスを残すと、請求APIが **誰でも呼べる状態で放置される** ため。非公開版へ置き換え、攻撃対象を減らす。

</details>

### Q7. 本番Frontendを公開（認証なし）にするのに、安全といえる理由は？

<details>
<summary>答えを見る</summary>

公開するのはユーザー向け画面だけで、**重要なデータを持つBillingは認証必須のまま** だから。しかもFrontendからBillingを呼べるのはFrontend用SAだけ。

</details>

### Q8. 本番運用でイメージを `latest` タグで管理しないのはなぜ？

<details>
<summary>答えを見る</summary>

`latest` は中身が変わるため、**どのバージョンが動いているか追跡できず、再現性とロールバックが難しくなる** ため。タグ固定やダイジェスト指定が望ましい。

</details>

---

## 15. 参考情報

### 15.1 2026-10-30にウェブで確認した情報

| 内容 | URL |
|---|---|
| Container Registryの廃止とシャットダウン | https://docs.cloud.google.com/container-registry/docs/deprecations/container-registry-deprecation |
| Container Registryシャットダウンへの備え（2025年3月18日以降の段階） | https://docs.cloud.google.com/artifact-registry/docs/transition/prepare-gcr-shutdown |
| Artifact Registry の gcr.io リポジトリ概要 | https://docs.cloud.google.com/artifact-registry/docs/transition/gcr-repositories |

### 15.2 公式ドキュメント（最新の仕様は必ずここで確認）

| 内容 | URL |
|---|---|
| Cloud Run ドキュメント | https://cloud.google.com/run/docs |
| Cloud Run のサービス間認証 | https://cloud.google.com/run/docs/authenticating/service-to-service |
| Cloud Run のアクセス管理（IAM） | https://cloud.google.com/run/docs/securing/managing-access |
| Cloud Build ドキュメント | https://cloud.google.com/build/docs |

### 15.3 この文書の前提と限界

- ラボの手順書テキストでは、一部の名前が **説明表記** になっているため、サービス名・SA名は一般的な命名で補っています。**ラボ画面の値が常に優先** です。
- Task 7 のFrontendが環境変数でBilling URLを受け取るかどうかは、手順書テキストからは判断できません。**コードを確認して判断する手順** を載せています。
- ラボの内容・画面・リポジトリは更新されることがあります。**差異があればラボ画面の指示に従ってください。**

---

**お疲れさまでした。** このラボで身につく型は、**「ビルド → デプロイ → 疎通確認」** と **「公開は最小限、内部は認証必須＋専用SA＋最小権限」** の2つです。この2つを説明できれば、Cloud Runの基礎設計は十分に理解できています。
