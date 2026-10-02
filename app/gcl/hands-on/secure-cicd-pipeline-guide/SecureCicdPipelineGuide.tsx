'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import NavBar from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

/** 自然倍率と説明を保持する、スクロール時に再描画しない図ラッパー。 */
const Diagram = memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div id={`diagram-${id}`} className="mermaid-target">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

/** セキュアCI/CDパイプラインの原本全文を保持するガイド。 */
export default function SecureCicdPipelineGuide() {
    return (
        <div className="secure-cicd-page">
            <div className="layout">
                <NavBar />
                <main className="content">
                    {' '}
                    <div className="hero">
                        {' '}
                        <span className="hero-eyebrow">
                            <i className="ti ti-shield-lock" aria-hidden="true"></i>
                            {'Software Supply Chain Security'}
                        </span>{' '}
                        <h1>{'セキュアなコンテナ CI/CD パイプライン構築ガイド'}</h1>{' '}
                        <p className="hero-subtitle">
                            {
                                ' Artifact Registry × Binary Authorization × Cloud Build によるソフトウェアサプライチェーンセキュリティ実践。Cymbal Bank のコンテナアプリケーションをセキュアにデプロイするシナリオを題材に、初学者でも一つずつ理解しながら進められるよう、各タスクの背景にあるベストプラクティスとその根拠を解説します。 '
                            }
                        </p>{' '}
                    </div>{' '}
                    <section id="overview" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-info-circle" aria-hidden="true"></i>
                            {'1. このガイドについて'}
                        </h2>{' '}
                        <h3>{'1.1 対象読者'}</h3>{' '}
                        <ul>
                            {' '}
                            <li>
                                {
                                    ' Google Cloud のコンテナデプロイに初めて触れるソフトウェアエンジニア / QA エンジニア '
                                }
                            </li>{' '}
                            <li>
                                {
                                    ' Artifact Registry・Cloud Build・Binary Authorization を「使ったことはあるが、なぜそう設定するのか」を理解したい方 '
                                }
                            </li>{' '}
                            <li>
                                {
                                    ' ソフトウェアサプライチェーンセキュリティ（SLSA、脆弱性スキャン、イメージ署名）の実践的な考え方を学びたい方 '
                                }
                            </li>{' '}
                        </ul>{' '}
                        <h3>{'1.2 学習目標'}</h3>{' '}
                        <ol>
                            {' '}
                            <li>
                                {
                                    ' コンテナイメージを「検証前」と「検証後」で分離管理する設計思想を理解する '
                                }
                            </li>{' '}
                            <li>
                                {
                                    ' Cloud Build を使ったビルド → スキャン → 署名 → デプロイの自動化パイプラインを構築できる '
                                }
                            </li>{' '}
                            <li>
                                {
                                    ' Binary Authorization の Attestor・Note・Attestation・Policy の関係を説明できる '
                                }
                            </li>{' '}
                            <li>
                                {
                                    ' 脆弱性スキャン結果を CI/CD のゲート（品質関門）として使う理由と実装方法を理解する '
                                }
                            </li>{' '}
                            <li>
                                {
                                    ' 実際にビルドが失敗した際、どう調査し、修正し、再実行するかのフローを体得する '
                                }
                            </li>{' '}
                        </ol>{' '}
                    </section>{' '}
                    <section id="architecture" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-topology-star-3" aria-hidden="true"></i>
                            {'2. 全体アーキテクチャ'}
                        </h2>{' '}
                        <p>
                            {
                                ' このパイプラインは「信頼されていないイメージ」と「信頼されたイメージ」を'
                            }
                            <strong>{'物理的に別のリポジトリへ分離する'}</strong>
                            {
                                'ことが最大の設計ポイントです。スキャンや署名が完了する前のイメージが誤って本番相当の場所から参照されることを防ぎます。 '
                            }
                        </p>{' '}
                        <div className="mermaid-card">
                            {' '}
                            <p className="mermaid-caption">
                                {'図1: ビルドからデプロイまでの全体フロー'}
                            </p>{' '}
                            <div className="mermaid-container">
                                {' '}
                                <Diagram
                                    id="architecture"
                                    label="図1: ビルドからデプロイまでの全体フロー"
                                />{' '}
                            </div>{' '}
                        </div>{' '}
                        <h3>{'このアーキテクチャが優れている理由'}</h3>{' '}
                        <div className="table-scroll">
                            <table>
                                {' '}
                                <thead>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <th scope="col">{'設計判断'}</th>{' '}
                                        <th scope="col">{'理由'}</th>{' '}
                                    </tr>{' '}
                                </thead>{' '}
                                <tbody>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <td>{'スキャン用と本番用でリポジトリを分ける'}</td>{' '}
                                        <td>
                                            {
                                                ' スキャン未完了・未署名のイメージが誤って参照・デプロイされるリスクを構造的に排除できる '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'CRITICAL 脆弱性でビルドを止める'}</td>{' '}
                                        <td>
                                            {
                                                ' 「気づいたら直す」ではなく「検出したら先に進めない」ことで、脆弱性のある成果物がそもそも生成されない '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            {'Cloud Run 側でも Binary Authorization を強制する'}
                                        </td>{' '}
                                        <td>
                                            {
                                                ' パイプラインを経由しない手動デプロイからも本番環境を守る、多層防御（Defense in Depth）になる '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                </tbody>{' '}
                            </table>
                        </div>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/artifact-registry/docs/analysis"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {
                                        'Artifact analysis and vulnerability scanning | Artifact Registry'
                                    }
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/overview"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Binary Authorization overview'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                    </section>{' '}
                    <section id="concepts" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-book" aria-hidden="true"></i>
                            {'3. 主要概念の整理'}
                        </h2>{' '}
                        <p>
                            {
                                ' 事前にこれらの用語の関係を理解しておくと、後続の作業がスムーズになります。 '
                            }
                        </p>{' '}
                        <div className="table-scroll">
                            <table>
                                {' '}
                                <thead>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <th scope="col">{'用語'}</th>{' '}
                                        <th scope="col">{'役割'}</th>{' '}
                                    </tr>{' '}
                                </thead>{' '}
                                <tbody>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <td>{'Artifact Registry'}</td>{' '}
                                        <td>
                                            {
                                                ' Docker イメージなどの成果物を保管するリポジトリサービス。リポジトリ単位でアクセス制御・スキャン設定ができる '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Artifact Analysis（旧 Container Analysis）'}</td>{' '}
                                        <td>
                                            {
                                                ' イメージ内のパッケージを解析し、既知の脆弱性（CVE）情報をメタデータとして付与するサービス '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Note'}</td>{' '}
                                        <td>
                                            {
                                                ' 「このような検証・属性を表す」というメタデータの型を定義するリソース。例：脆弱性の分類、Attestation の型 '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Occurrence'}</td>{' '}
                                        <td>
                                            {
                                                ' 特定のイメージに対して、ある Note が実際に発生した記録（例：このイメージにこの脆弱性が見つかった、というインスタンス） '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Binary Authorization'}</td>{' '}
                                        <td>
                                            {
                                                ' デプロイ時に「このイメージは信頼できるプロセスを経たか」を強制検証するポリシーエンジン '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Attestor（検証者）'}</td>{' '}
                                        <td>
                                            {
                                                '誰が・どの鍵で署名したかを表すエンティティ。Note と紐づく'
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Attestation（証明書）'}</td>{' '}
                                        <td>
                                            {
                                                ' Attestor が特定のイメージに対して発行する「デジタル署名付きの合格証」 '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Cloud KMS'}</td>{' '}
                                        <td>
                                            {
                                                ' Attestation に使う非対称署名鍵を安全に生成・保管・利用するための鍵管理サービス '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'Cloud Build'}</td>{' '}
                                        <td>
                                            {
                                                ' ソースコードからイメージのビルド・テスト・デプロイまでを自動化する CI/CD サービス '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                </tbody>{' '}
                            </table>
                        </div>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/key-concepts"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Binary Authorization concepts'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/attestations"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Attestations overview'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                    </section>{' '}
                    <section id="task1" tabIndex={-1}>
                        {' '}
                        <h2>
                            {' '}
                            <i className="ti ti-number-1" aria-hidden="true"></i>
                            {'4. Task 1: 環境準備と Artifact Registry リポジトリの設計 '}
                        </h2>{' '}
                        <h3>{'4.1 やること'}</h3>{' '}
                        <ul>
                            {' '}
                            <li>
                                {
                                    ' 必要な API（Cloud KMS、Cloud Run、Cloud Build、GKE、Container Registry、Artifact Registry、Container Scanning、On-Demand Scanning、Binary Authorization）を有効化する '
                                }
                            </li>{' '}
                            <li>{'サンプルアプリのソース一式を取得する'}</li>{' '}
                            <li>
                                {' '}
                                <code>{'artifact-scanning-repo'}</code>
                                {'（スキャン用）と '}
                                <code>{'artifact-prod-repo'}</code>
                                {'（本番用）の2つの Docker リポジトリを作成する '}
                            </li>{' '}
                        </ul>{' '}
                        <h3>{'4.2 ベストプラクティスと根拠'}</h3>{' '}
                        <h4>{'API は必要最小限を「事前に」まとめて有効化する'}</h4>{' '}
                        <p>
                            {
                                ' パイプライン実行中に権限不足で失敗すると、どのステップで何が足りないのか切り分けに時間がかかります。使用するサービス群を最初にまとめて有効化しておくことで、後続タスクでの手戻りを防げます。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/sdk/gcloud/reference/services/enable"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'gcloud services enable リファレンス'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h4>{'リポジトリを「用途」で分離する'}</h4>{' '}
                        <p>
                            {
                                ' Artifact Registry のリポジトリは、CMEK 暗号化やクリーンアップポリシー、Immutable Tags（イメージタグの上書き防止）などをリポジトリ単位で設定できます。スキャン専用リポジトリと本番用リポジトリを分けることで、たとえば本番用リポジトリだけに Immutable Tags を有効化し、「一度検証したイメージは書き換えられない」という不変性を保証する、といった段階ごとに異なるガバナンスを適用できます。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/artifact-registry/docs/repositories/create-repos"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Create standard repositories | Artifact Registry'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/artifact-registry/docs/docker/store-docker-container-images"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {
                                        'Quickstart: Store Docker container images in Artifact Registry'
                                    }
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <span className="code-label">{'実行コマンド例'}</span>{' '}
                        <div className="code-block" role="region" aria-label="シェルコマンド例">
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' artifacts repositories create artifact-scanning-repo \\'}
                            </div>
                            <div className="code-line">{'  --repository-format=docker \\'}</div>
                            <div className="code-line">{'  --location=REGION \\'}</div>
                            <div className="code-line">
                                {'  --description='}
                                <span className="hl-string">
                                    {'"Scanning repository for pre-verified images"'}
                                </span>
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' artifacts repositories create artifact-prod-repo \\'}
                            </div>
                            <div className="code-line">{'  --repository-format=docker \\'}</div>
                            <div className="code-line">{'  --location=REGION \\'}</div>
                            <div className="code-line">
                                {'  --description='}
                                <span className="hl-string">
                                    {'"Production repository for signed images"'}
                                </span>
                            </div>
                        </div>{' '}
                    </section>{' '}
                    <section id="task2" tabIndex={-1}>
                        {' '}
                        <h2>
                            {' '}
                            <i className="ti ti-number-2" aria-hidden="true"></i>
                            {'5. Task 2: 基本的な Cloud Build パイプラインの構築 '}
                        </h2>{' '}
                        <h3>{'5.1 やること'}</h3>{' '}
                        <ul>
                            {' '}
                            <li>
                                {' Cloud Build のサービスアカウントに '}
                                <code>{'roles/iam.serviceAccountUser'}</code>
                                {' と '}
                                <code>{'roles/ondemandscanning.admin'}</code>
                                {' を付与する '}
                            </li>{' '}
                            <li>
                                {' '}
                                <code>{'cloudbuild.yaml'}</code>
                                {' のイメージ名プレースホルダーを埋める（'}
                                <code>{'artifact-scanning-repo'}</code>
                                {' / '}
                                <code>{'sample-image'}</code>
                                {'） '}
                            </li>{' '}
                            <li>
                                {
                                    'ビルドを実行し、スキャン結果に CRITICAL 脆弱性があることを確認する'
                                }
                            </li>{' '}
                        </ul>{' '}
                        <h3>{'5.2 ベストプラクティスと根拠'}</h3>{' '}
                        <h4>
                            {
                                ' 最小権限の原則（Principle of Least Privilege）を Cloud Build のサービスアカウントにも適用する '
                            }
                        </h4>{' '}
                        <p>
                            {
                                ' Cloud Build のデフォルトサービスアカウントは強い権限を持ちがちですが、パイプラインが実際に必要とする操作単位でロールを追加する方が安全です。'
                            }
                            <code>{'roles/ondemandscanning.admin'}</code>
                            {
                                ' はスキャンの実行だけに必要な権限であり、汎用的な Editor ロールなどを付与しない方が事故を防げます。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/build/docs/iam-roles-permissions"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'IAM roles and permissions | Cloud Build'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/build/docs/securing-builds/set-service-account-permissions"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Configure access for the default Cloud Build service account'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h4>{'イメージ名は完全修飾パスで固定する'}</h4>{' '}
                        <p>
                            {' '}
                            <code>
                                {
                                    '<region>-docker.pkg.dev/<project-id>/artifact-scanning-repo/sample-image'
                                }
                            </code>
                            {
                                ' の形式でイメージ URL を明示することで、ビルド・プッシュ・スキャンの各ステップが必ず同じイメージを指すようになり、参照ミスを防げます。 '
                            }
                        </p>{' '}
                        <div className="code-block" role="region" aria-label="YAML設定例">
                            <div className="code-line">
                                <span className="hl-keyword">{'steps'}</span>
                                {':'}
                            </div>
                            <div className="code-line">
                                {'  - '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{'"build"'}</span>
                            </div>
                            <div className="code-line">
                                {'    '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/docker'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'    '}
                                <span className="hl-keyword">{'args'}</span>
                                {': ['}
                                <span className="hl-string">{"'build'"}</span>
                                {', '}
                                <span className="hl-string">{"'-t'"}</span>
                                {', '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image'"
                                    }
                                </span>
                                {', '}
                                <span className="hl-string">{"'.'"}</span>
                                {']'}
                            </div>
                            <div className="code-line">
                                {'  - '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{'"push"'}</span>
                            </div>
                            <div className="code-line">
                                {'    '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/docker'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'    '}
                                <span className="hl-keyword">{'args'}</span>
                                {': ['}
                                <span className="hl-string">{"'push'"}</span>
                                {', '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image'"
                                    }
                                </span>
                                {']'}
                            </div>
                        </div>{' '}
                        <h4>{'この段階でわざと脆弱性のあるイメージを確認する意味'}</h4>{' '}
                        <p>
                            {
                                ' 実務では「動くから安全」ではありません。この時点でスキャン結果に CRITICAL 脆弱性が出ることを確認しておくことで、Task 4 で組み込む自動ゲートが正しく機能していることを後で検証できます。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/artifact-analysis/docs/container-scanning-overview"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Container scanning overview | Artifact Analysis'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                    </section>{' '}
                    <section id="task3" tabIndex={-1}>
                        {' '}
                        <h2>
                            {' '}
                            <i className="ti ti-number-3" aria-hidden="true"></i>
                            {'6. Task 3: Binary Authorization のセットアップ '}
                        </h2>{' '}
                        <p>
                            {
                                ' ここが本ラボの中核です。Attestor・Note・Cloud KMS 鍵・Policy の4つがどう連携するかを図で整理します。 '
                            }
                        </p>{' '}
                        <div className="mermaid-card">
                            {' '}
                            <p className="mermaid-caption">
                                {' 図2: Binary Authorization を構成するリソースの関係 '}
                            </p>{' '}
                            <div className="mermaid-container">
                                {' '}
                                <Diagram
                                    id="binauthz"
                                    label="図2: Binary Authorization を構成するリソースの関係"
                                />{' '}
                            </div>{' '}
                        </div>{' '}
                        <h3>{'6.1 Attestor の作成: なぜ Note と Attestor を分けて設計するのか'}</h3>{' '}
                        <p>
                            {' Binary Authorization では、'}
                            <strong>{'Note が「何を証明するか」の定義'}</strong>
                            {'であり、'}
                            <strong>{'Attestor が「誰がその証明を行う権限を持つか」の実体'}</strong>
                            {
                                'です。この分離により、同じ Note（例：脆弱性検証済み）に対して、将来的に複数の Attestor（複数チームの署名鍵）を関連付けるといった拡張が可能になります。 '
                            }
                        </p>{' '}
                        <div className="code-block" role="region" aria-label="シェルコマンド例">
                            <div className="code-line">
                                <span className="hl-keyword">{'cat'}</span>
                                {' > ./vulnerability_note.json << EOM'}
                            </div>
                            <div className="code-line">{'{'}</div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-string">{'"attestation"'}</span>
                                {': {'}
                            </div>
                            <div className="code-line">
                                {'    '}
                                <span className="hl-string">{'"hint"'}</span>
                                {': {'}
                            </div>
                            <div className="code-line">
                                {'      '}
                                <span className="hl-string">{'"human_readable_name"'}</span>
                                {': '}
                                <span className="hl-string">
                                    {'"Container Vulnerabilities attestation authority"'}
                                </span>
                            </div>
                            <div className="code-line">{'    }'}</div>
                            <div className="code-line">{'  }'}</div>
                            <div className="code-line">{'}'}</div>
                            <div className="code-line">{'EOM'}</div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-keyword">{'curl'}</span>
                                {' -X POST \\'}
                            </div>
                            <div className="code-line">
                                {'  -H '}
                                <span className="hl-string">
                                    {'"Content-Type: application/json"'}
                                </span>
                                {' \\'}
                            </div>
                            <div className="code-line">
                                {'  -H '}
                                <span className="hl-string">
                                    {'"Authorization: Bearer $(gcloud auth print-access-token)"'}
                                </span>
                                {' \\'}
                            </div>
                            <div className="code-line">
                                {'  --data-binary @./vulnerability_note.json \\'}
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-string">
                                    {
                                        '"https://containeranalysis.googleapis.com/v1/projects/$PROJECT_ID/notes/?noteId=vulnerability_note"'
                                    }
                                </span>
                            </div>
                        </div>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/attestations"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Attestations overview | Binary Authorization'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/key-concepts"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Binary Authorization concepts'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h3>{'6.2 Attestor を gcloud で作成・確認する'}</h3>{' '}
                        <div className="code-block" role="region" aria-label="シェルコマンド例">
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' container binauthz attestors create vulnerability-attestor \\'}
                            </div>
                            <div className="code-line">
                                {'  --attestation-authority-note=vulnerability_note \\'}
                            </div>
                            <div className="code-line">
                                {'  --attestation-authority-note-project=$PROJECT_ID'}
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' container binauthz attestors list'}
                            </div>
                        </div>{' '}
                        <h4>{'IAM ポリシーで Note へのアクセスを絞る理由'}</h4>{' '}
                        <p>
                            {
                                ' Binary Authorization のサービスエージェントが Note の Occurrence（脆弱性や Attestation の実データ）を参照できる必要がありますが、'
                            }
                            <code>{'roles/containeranalysis.notes.occurrences.viewer'}</code>
                            {
                                ' という限定的な閲覧権限のみを Note リソース単位で付与することで、プロジェクト全体ではなくこの Note に対してのみアクセスを許可する、最小権限のスコーピングが実現できます。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/cloud-build"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {
                                        'Create a Binary Authorization attestation in a Cloud Build pipeline'
                                    }
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h3>{'6.3 Cloud KMS 鍵ペアの生成: なぜ非対称署名鍵を使うのか'}</h3>{' '}
                        <p>
                            {
                                ' Attestation は「誰かが確かにこのプロセスを実行した」ことを暗号学的に証明するものです。対称鍵と異なり、非対称署名鍵（秘密鍵で署名し、公開鍵で検証）は Cloud KMS 内に秘密鍵を保持したまま外部に出さずに署名処理を実行でき、検証は公開鍵だけで完結します。これにより署名鍵の漏えいリスクを大きく下げられます。 '
                            }
                        </p>{' '}
                        <div className="code-block" role="region" aria-label="シェルコマンド例">
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' kms keyrings create binauthz-keys --location=global'}
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' kms keys create lab-key \\'}
                            </div>
                            <div className="code-line">{'  --keyring=binauthz-keys \\'}</div>
                            <div className="code-line">{'  --location=global \\'}</div>
                            <div className="code-line">{'  --purpose=asymmetric-signing \\'}</div>
                            <div className="code-line">
                                {'  --default-algorithm=ec-sign-p256-sha256'}
                            </div>
                        </div>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/kms/docs/create-key"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Create a key | Cloud Key Management Service'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/kms/docs/create-validate-signatures"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Creating and validating digital signatures'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <p>
                            <strong>{'鍵を Attestor に紐づける'}</strong>
                        </p>{' '}
                        <div className="code-block" role="region" aria-label="シェルコマンド例">
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' container binauthz attestors public-keys add \\'}
                            </div>
                            <div className="code-line">
                                {'  --attestor=vulnerability-attestor \\'}
                            </div>
                            <div className="code-line">
                                {'  --keyversion-project=$PROJECT_ID \\'}
                            </div>
                            <div className="code-line">{'  --keyversion-location=global \\'}</div>
                            <div className="code-line">
                                {'  --keyversion-keyring=binauthz-keys \\'}
                            </div>
                            <div className="code-line">{'  --keyversion-key=lab-key \\'}</div>
                            <div className="code-line">
                                {'  --keyversion='}
                                <span className="hl-number">{'1'}</span>
                            </div>
                        </div>{' '}
                        <h3>{'6.4 Binary Authorization ポリシーの更新'}</h3>{' '}
                        <p>
                            {
                                ' デフォルトポリシーはすべてのイメージのデプロイを許可する設定になっています。これを「'
                            }
                            <code>{'vulnerability-attestor'}</code>
                            {' による Attestation がなければデプロイを拒否する」という'}
                            <strong>{'ホワイトリスト方式（拒否がデフォルト）'}</strong>
                            {
                                'に変更します。ポリシーは例外リストではなく「原則拒否 + 明示的な許可条件」で構成するのが、サプライチェーン攻撃対策の定石です。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/key-concepts"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Binary Authorization concepts'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/run/configure-policy-cloud-run"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {
                                        'Quickstart: Configure a Binary Authorization policy with Cloud Run'
                                    }
                                </a>
                            </span>{' '}
                        </div>{' '}
                    </section>{' '}
                    <section id="task4" tabIndex={-1}>
                        {' '}
                        <h2>
                            {' '}
                            <i className="ti ti-number-4" aria-hidden="true"></i>
                            {
                                '7. Task 4: 脆弱性スキャン・重大度チェック・署名を組み込んだセキュアパイプライン '
                            }
                        </h2>{' '}
                        <h3>{'7.1 Cloud Build サービスアカウントへの追加権限'}</h3>{' '}
                        <p>
                            {
                                ' Task 4 では、スキャン結果の判定と署名処理という新しい操作が加わるため、権限も追加します。 '
                            }
                        </p>{' '}
                        <div className="table-scroll">
                            <table>
                                {' '}
                                <thead>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <th scope="col">{'ロール'}</th>{' '}
                                        <th scope="col">{'付与対象'}</th>{' '}
                                        <th scope="col">{'目的'}</th>{' '}
                                    </tr>{' '}
                                </thead>{' '}
                                <tbody>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            <code>
                                                {'roles/binaryauthorization.attestorsViewer'}
                                            </code>
                                        </td>{' '}
                                        <td>{'Cloud Build SA'}</td>{' '}
                                        <td>{'Attestor の情報を参照するため'}</td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            <code>{'roles/cloudkms.signerVerifier'}</code>
                                        </td>{' '}
                                        <td>{'Cloud Build SA / Compute Engine デフォルト SA'}</td>{' '}
                                        <td>{'KMS 鍵で署名・検証を行うため'}</td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            <code>{'roles/containeranalysis.notes.attacher'}</code>
                                        </td>{' '}
                                        <td>{'Cloud Build SA'}</td>{' '}
                                        <td>
                                            {'Note に Occurrence（Attestation）を付与するため'}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            <code>{'roles/iam.serviceAccountUser'}</code>
                                        </td>{' '}
                                        <td>{'Cloud Build SA'}</td>{' '}
                                        <td>{'他のサービスアカウントとして振る舞うため'}</td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            <code>{'roles/ondemandscanning.admin'}</code>
                                        </td>{' '}
                                        <td>{'Cloud Build SA'}</td>{' '}
                                        <td>{'On-Demand Scanning を実行するため'}</td>{' '}
                                    </tr>{' '}
                                </tbody>{' '}
                            </table>
                        </div>{' '}
                        <p className="lead">
                            {
                                ' 役割を機能単位で細かく分けて付与することで、後から「このパイプラインが実際に何をしているか」を IAM ポリシーだけから読み取れるようになります。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/build/docs/iam-roles-permissions"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'IAM roles and permissions | Cloud Build'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h3>{'7.2 Custom Build Step（binauthz-attestation）を使う理由'}</h3>{' '}
                        <p>
                            {
                                ' Attestation の作成は、ペイロード生成・署名・Attestation の登録という複数手順から成ります。Google 提供の Custom Build Step（'
                            }
                            <code>{'binauthz-attestation'}</code>
                            {'）はこれをラップしており、'}
                            <code>{'cloudbuild.yaml'}</code>
                            {
                                ' からは1ステップの宣言で済みます。生の API 呼び出しを毎回手書きするより、実装ミスによる誤った Attestation 発行のリスクを下げられます。 '
                            }
                        </p>{' '}
                        <div className="code-block" role="region" aria-label="シェルコマンド例">
                            <div className="code-line">
                                <span className="hl-keyword">{'git'}</span>
                                {
                                    ' clone https://github.com/GoogleCloudPlatform/cloud-builders-community.'
                                }
                                <span className="hl-keyword">{'git'}</span>
                            </div>
                            <div className="code-line">
                                <span className="hl-keyword">{'cd'}</span>
                                {' cloud-builders-community/binauthz-attestation'}
                            </div>
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' builds submit . --config cloudbuild.yaml'}
                            </div>
                            <div className="code-line">
                                <span className="hl-keyword">{'cd'}</span>
                                {' ../..'}
                            </div>
                            <div className="code-line">
                                <span className="hl-keyword">{'rm'}</span>
                                {' -rf cloud-builders-community'}
                            </div>
                        </div>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/binauthz-attestation"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'cloud-builders-community: binauthz-attestation (GitHub)'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/cloud-build"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {
                                        'Create a Binary Authorization attestation in a Cloud Build pipeline'
                                    }
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h3>{'7.3 完成させた cloudbuild.yaml（各ステップの設計意図つき）'}</h3>{' '}
                        <div className="code-block" role="region" aria-label="YAML設定例">
                            <div className="code-line">
                                <span className="hl-keyword">{'steps'}</span>
                                {':'}
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-comment">
                                    {'# 1. ビルド: artifact-scanning-repo 宛てにタグ付け'}
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{'"build"'}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/docker'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {': ['}
                                <span className="hl-string">{"'build'"}</span>
                                {', '}
                                <span className="hl-string">{"'-t'"}</span>
                                {', '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image'"
                                    }
                                </span>
                                {', '}
                                <span className="hl-string">{"'.'"}</span>
                                {']'}
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'waitFor'}</span>
                                {': ['}
                                <span className="hl-string">{"'-'"}</span>
                                {']'}
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-comment">
                                    {'# 2. push: まず「検証前」リポジトリへ'}
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{'"push"'}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/docker'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {': ['}
                                <span className="hl-string">{"'push'"}</span>
                                {', '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image'"
                                    }
                                </span>
                                {']'}
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-comment">
                                    {
                                        '# 3. On-Demand Scanning でスキャンを実行し、scan_id を後続ステップに渡す'
                                    }
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': scan'}
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/gcloud'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'entrypoint'}</span>
                                {': '}
                                <span className="hl-string">{"'bash'"}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {':'}
                            </div>
                            <div className="code-line">
                                {'  - '}
                                <span className="hl-string">{"'-c'"}</span>
                            </div>
                            <div className="code-line">{'  - |'}</div>
                            <div className="code-line">
                                {'    ('}
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' artifacts docker '}
                                <span className="hl-keyword">{'images'}</span>
                                {' scan \\'}
                            </div>
                            <div className="code-line">
                                {
                                    '    REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image \\'
                                }
                            </div>
                            <div className="code-line">{'    --location us \\'}</div>
                            <div className="code-line">
                                {'    --format='}
                                <span className="hl-string">{'"value(response.scan)"'}</span>
                                {') > /workspace/scan_id.txt'}
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-comment">
                                    {'# 4. CRITICAL が1件でもあればビルドを止める（品質ゲート）'}
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': severity check'}
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/gcloud'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'entrypoint'}</span>
                                {': '}
                                <span className="hl-string">{"'bash'"}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {':'}
                            </div>
                            <div className="code-line">
                                {'  - '}
                                <span className="hl-string">{"'-c'"}</span>
                            </div>
                            <div className="code-line">{'  - |'}</div>
                            <div className="code-line">
                                {'      '}
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' artifacts docker '}
                                <span className="hl-keyword">{'images'}</span>
                                {' list-vulnerabilities $('}
                                <span className="hl-keyword">{'cat'}</span>
                                {' /workspace/scan_id.txt) \\'}
                            </div>
                            <div className="code-line">
                                {'      --format='}
                                <span className="hl-string">
                                    {'"value(vulnerability.effectiveSeverity)"'}
                                </span>
                                {' | '}
                                <span className="hl-keyword">{'if'}</span>
                                {' grep -Fxq CRITICAL; \\'}
                            </div>
                            <div className="code-line">
                                {'      '}
                                <span className="hl-keyword">{'then'}</span>
                                {' echo '}
                                <span className="hl-string">
                                    {'"Failed vulnerability check for CRITICAL level"'}
                                </span>
                                {' && '}
                                <span className="hl-keyword">{'exit'}</span>{' '}
                                <span className="hl-number">{'1'}</span>
                                {'; '}
                                <span className="hl-keyword">{'else'}</span>
                                {' echo \\'}
                            </div>
                            <div className="code-line">
                                {'      '}
                                <span className="hl-string">
                                    {'"No CRITICAL vulnerability found, congrats !"'}
                                </span>
                                {' && '}
                                <span className="hl-keyword">{'exit'}</span>{' '}
                                <span className="hl-number">{'0'}</span>
                                {'; '}
                                <span className="hl-keyword">{'fi'}</span>
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-comment">
                                    {'# 5. 検査を通過したイメージにのみ Attestation を発行'}
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{"'create-attestation'"}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/${PROJECT_ID}/binauthz-attestation:latest'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {':'}
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">{"'--artifact-url'"}</span>
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image'"
                                    }
                                </span>
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">{"'--attestor'"}</span>
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">
                                    {"'projects/$PROJECT_ID/attestors/vulnerability-attestor'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">{"'--keyversion'"}</span>
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">
                                    {
                                        "'projects/$PROJECT_ID/locations/global/keyRings/binauthz-keys/cryptoKeys/lab-key/cryptoKeyVersions/1'"
                                    }
                                </span>
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-comment">
                                    {'# 6. 署名済みイメージだけを本番リポジトリへ昇格させる'}
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{'"push-to-prod"'}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/docker'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {':'}
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">{"'tag'"}</span>
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image'"
                                    }
                                </span>
                            </div>
                            <div className="code-line">
                                {'    - '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-prod-repo/sample-image'"
                                    }
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{'"push-to-prod-final"'}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/docker'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {': ['}
                                <span className="hl-string">{"'push'"}</span>
                                {', '}
                                <span className="hl-string">
                                    {
                                        "'REGION-docker.pkg.dev/$PROJECT_ID/artifact-prod-repo/sample-image'"
                                    }
                                </span>
                                {']'}
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-comment">
                                    {'# 7. Cloud Run に Binary Authorization 強制ありでデプロイ'}
                                </span>
                            </div>
                            <div className="code-line">
                                {'- '}
                                <span className="hl-keyword">{'id'}</span>
                                {': '}
                                <span className="hl-string">{"'deploy-to-cloud-run'"}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'name'}</span>
                                {': '}
                                <span className="hl-string">
                                    {"'gcr.io/cloud-builders/gcloud'"}
                                </span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'entrypoint'}</span>
                                {': '}
                                <span className="hl-string">{"'bash'"}</span>
                            </div>
                            <div className="code-line">
                                {'  '}
                                <span className="hl-keyword">{'args'}</span>
                                {':'}
                            </div>
                            <div className="code-line">
                                {'  - '}
                                <span className="hl-string">{"'-c'"}</span>
                            </div>
                            <div className="code-line">{'  - |'}</div>
                            <div className="code-line">
                                {'    '}
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' run deploy auth-service \\'}
                            </div>
                            <div className="code-line">
                                {
                                    '    --image=REGION-docker.pkg.dev/$PROJECT_ID/artifact-prod-repo/sample-image \\'
                                }
                            </div>
                            <div className="code-line">
                                {
                                    '    --binary-authorization=default --region=REGION --allow-unauthenticated'
                                }
                            </div>
                            <div className="code-line"></div>
                            <div className="code-line">
                                <span className="hl-keyword">{'images'}</span>
                                {':'}
                            </div>
                            <div className="code-line">
                                {
                                    '  - REGION-docker.pkg.dev/$PROJECT_ID/artifact-scanning-repo/sample-image'
                                }
                            </div>
                        </div>{' '}
                        <h4>{'ステップ設計で意識すべきポイント'}</h4>{' '}
                        <div className="table-scroll">
                            <table>
                                {' '}
                                <thead>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <th scope="col">{'ポイント'}</th>{' '}
                                        <th scope="col">{'なぜ重要か'}</th>{' '}
                                    </tr>{' '}
                                </thead>{' '}
                                <tbody>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            {' スキャン結果を '}
                                            <code>{'scan_id.txt'}</code>
                                            {' でステップ間受け渡し '}
                                        </td>{' '}
                                        <td>
                                            {
                                                ' Cloud Build の各ステップはコンテナが独立しているため、'
                                            }
                                            <code>{'/workspace'}</code>
                                            {' を介したファイル共有で状態を引き継ぐ '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            <code>{'grep -Fxq'}</code>
                                            {' で完全一致検索'}
                                        </td>{' '}
                                        <td>
                                            {
                                                ' 部分一致だと別文字列も誤検出しうるため、行全体一致（'
                                            }
                                            <code>{'-x'}</code>
                                            {'）で厳密に判定する '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'署名ステップを severity check の後に配置'}</td>{' '}
                                        <td>
                                            {
                                                ' Cloud Build はデフォルトで前ステップの成功を条件に直列実行するため、脆弱性ありのイメージには絶対に署名されない '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            <code>{'images:'}</code>
                                            {' フィールドにビルド成果物を明記'}
                                        </td>{' '}
                                        <td>
                                            {
                                                ' Cloud Build のビルド履歴・Build Provenance に、どのイメージがこのビルドから生成されたかを正しく記録するため '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            {' '}
                                            <code>{'--binary-authorization=default'}</code>
                                            {' を Cloud Run 側にも指定 '}
                                        </td>{' '}
                                        <td>
                                            {
                                                ' パイプライン外から未署名イメージが直接デプロイされることをサービス自体がブロックする、多層防御の要 '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                </tbody>{' '}
                            </table>
                        </div>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/sdk/gcloud/reference/run/deploy"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'gcloud run deploy リファレンス'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/binary-authorization/docs/run/enabling-binauthz-cloud-run"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Enable Binary Authorization for Cloud Run'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://docs.cloud.google.com/artifact-analysis/docs/ods-cloudbuild"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Use On-Demand Scanning in your Cloud Build pipeline'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <div className="callout callout-info">
                            {' '}
                            <i className="ti ti-bulb" aria-hidden="true"></i>{' '}
                            <span>
                                {
                                    'ここでビルドが CRITICAL 脆弱性により失敗するのは想定どおりの挙動です。これは「セキュリティゲートが機能していることの動作確認」であり、次のタスクで初めて根本原因（依存パッケージの脆弱性）を修正します。障害対応の基本と同じく、まず失敗を正しく検知できているかを確認してから、原因を修正するという順序を踏むことが重要です。'
                                }
                            </span>{' '}
                        </div>{' '}
                    </section>{' '}
                    <section id="task5" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-number-5" aria-hidden="true"></i>
                            {'8. Task 5: 脆弱性の修正と再デプロイ'}
                        </h2>{' '}
                        <h3>{'8.1 やること'}</h3>{' '}
                        <ul>
                            {' '}
                            <li>
                                {'Dockerfile のベースイメージを '}
                                <code>{'python:3.8-alpine'}</code>
                                {' に変更'}
                            </li>{' '}
                            <li>
                                {
                                    ' Flask 3.0.3 / Gunicorn 23.0.0 / Werkzeug 3.0.4 へ依存パッケージを更新 '
                                }
                            </li>{' '}
                            <li>{'パイプラインを再実行し、成功を確認'}</li>{' '}
                            <li>
                                {' 検証目的で '}
                                <code>{'allUsers'}</code>
                                {' に '}
                                <code>{'roles/run.invoker'}</code>
                                {' を付与し、動作確認 '}
                            </li>{' '}
                        </ul>{' '}
                        <h3>{'8.2 ベストプラクティスと根拠'}</h3>{' '}
                        <h4>{'Alpine ベースイメージを選ぶ理由'}</h4>{' '}
                        <p>
                            {
                                ' Alpine は必要最小限のパッケージのみで構成された軽量な Linux ディストリビューションです。含まれるパッケージ数が少ないほど、攻撃対象領域（Attack Surface）と既知脆弱性の混入経路が減ります。イメージサイズが小さくなることで、pull・デプロイの速度向上という副次効果も得られます。 '
                            }
                        </p>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/container-registry/docs/container-best-practices"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Best practices for containers'}
                                </a>
                                {'、 '}
                                <a
                                    href="https://cloud.google.com/software-supply-chain-security/docs/base-images"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'Base images | Software supply chain security'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h4>{'依存パッケージのバージョンをピン留めして更新する理由'}</h4>{' '}
                        <p>
                            {
                                ' Flask、Gunicorn、Werkzeug はいずれも Web サーバーの根幹に関わるパッケージです。バージョンを明示的に固定することで「ビルドのたびに異なるバージョンが解決され、再現性がなくなる」問題を防ぎつつ、既知の CVE が修正されたバージョンへ確実にアップグレードできます。 '
                            }
                        </p>{' '}
                        <h4>{'検証用の allUsers 権限は一時的なものと明確に扱う'}</h4>{' '}
                        <div className="code-block" role="region" aria-label="シェルコマンド例">
                            <div className="code-line">
                                <span className="hl-keyword">{'gcloud'}</span>
                                {' beta run services add-iam-policy-binding \\'}
                            </div>
                            <div className="code-line">{'  --region=REGION \\'}</div>
                            <div className="code-line">{'  --member=allUsers \\'}</div>
                            <div className="code-line">{'  --role=roles/run.invoker \\'}</div>
                            <div className="code-line">{'  auth-service'}</div>
                        </div>{' '}
                        <div className="callout callout-warning">
                            {' '}
                            <i className="ti ti-alert-triangle" aria-hidden="true"></i>{' '}
                            <span>
                                {
                                    'これは動作確認のためだけの設定であり、本番運用では IAP（Identity-Aware Proxy）や認証必須の呼び出し（'
                                }
                                <code>{'gcloud run services proxy'}</code>
                                {
                                    ' や ID トークン）に置き換えるべきです。ラボの手順書自体も「本番環境では使用しないこと」と明記している点は、実務でもそのまま踏襲すべき注意点です。'
                                }
                            </span>{' '}
                        </div>{' '}
                        <div className="source-note">
                            {' '}
                            <i className="ti ti-link" aria-hidden="true"></i>{' '}
                            <span>
                                <span className="source-label">{'出典:'}</span>{' '}
                                <a
                                    href="https://docs.cloud.google.com/sdk/gcloud/reference/run/deploy"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    {'gcloud run deploy リファレンス'}
                                </a>
                            </span>{' '}
                        </div>{' '}
                        <h3>{'8.3 再実行後の確認フロー'}</h3>{' '}
                        <div className="mermaid-card">
                            {' '}
                            <p className="mermaid-caption">
                                {'図3: 修正から再デプロイまでの確認フロー'}
                            </p>{' '}
                            <div className="mermaid-container">
                                {' '}
                                <Diagram
                                    id="verify"
                                    label="図3: 修正から再デプロイまでの確認フロー"
                                />{' '}
                            </div>{' '}
                        </div>{' '}
                    </section>{' '}
                    <section id="sequence" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-arrows-exchange" aria-hidden="true"></i>
                            {'9. パイプライン全体のシーケンス'}
                        </h2>{' '}
                        <p>
                            {
                                ' 各コンポーネントがどのタイミングでやり取りするかを俯瞰しておくと、障害発生時にどこを調査すべきか判断しやすくなります。 '
                            }
                        </p>{' '}
                        <div className="mermaid-card">
                            {' '}
                            <p className="mermaid-caption">
                                {'図4: ビルドから検証までのシーケンス図'}
                            </p>{' '}
                            <div className="mermaid-container">
                                {' '}
                                <Diagram
                                    id="sequence"
                                    label="図4: ビルドから検証までのシーケンス図"
                                />{' '}
                            </div>{' '}
                        </div>{' '}
                    </section>{' '}
                    <section id="best-practices" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-checklist" aria-hidden="true"></i>
                            {'10. ベストプラクティス総まとめ'}
                        </h2>{' '}
                        <div className="table-scroll">
                            <table>
                                {' '}
                                <thead>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <th scope="col">{'領域'}</th>{' '}
                                        <th scope="col">{'ベストプラクティス'}</th>{' '}
                                        <th scope="col">{'出典'}</th>{' '}
                                    </tr>{' '}
                                </thead>{' '}
                                <tbody>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <td>{'リポジトリ設計'}</td>{' '}
                                        <td>{'スキャン用と本番用のリポジトリを分離する'}</td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/artifact-registry/docs/repositories/create-repos"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'Create standard repositories'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'権限管理'}</td>{' '}
                                        <td>
                                            {
                                                'Cloud Build SA には機能単位の最小権限ロールのみ付与する'
                                            }
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/build/docs/iam-roles-permissions"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'IAM roles and permissions'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'脆弱性スキャン'}</td>{' '}
                                        <td>
                                            {
                                                ' On-Demand Scanning をビルドパイプラインに組み込み、重大度でゲートする '
                                            }
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/artifact-analysis/docs/ods-cloudbuild"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'On-Demand Scanning in Cloud Build'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'署名 / Attestation'}</td>{' '}
                                        <td>
                                            {'非対称鍵（Cloud KMS）でビルドプロセス自体を証明する'}
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/binary-authorization/docs/cloud-build"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'Create a Binary Authorization attestation'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'デプロイ強制'}</td>{' '}
                                        <td>
                                            {' Cloud Run 側にも '}
                                            <code>{'--binary-authorization=default'}</code>
                                            {' を設定し多層防御にする '}
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/binary-authorization/docs/run/enabling-binauthz-cloud-run"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'Enable Binary Authorization for Cloud Run'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'ポリシー設計'}</td>{' '}
                                        <td>{'原則拒否＋明示的な許可条件でポリシーを構成する'}</td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/binary-authorization/docs/key-concepts"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'Binary Authorization concepts'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'ベースイメージ'}</td>{' '}
                                        <td>{'Alpine など最小構成のベースイメージを選ぶ'}</td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://cloud.google.com/software-supply-chain-security/docs/base-images"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'Base images'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'依存関係管理'}</td>{' '}
                                        <td>{'脆弱性修正済みバージョンへ明示的にピン留めする'}</td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/container-registry/docs/container-best-practices"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'Best practices for containers'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'一時的な公開設定'}</td>{' '}
                                        <td>
                                            {
                                                '検証用の緩和設定は本番投入前に必ず取り除く運用ルールを持つ'
                                            }
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <a
                                                href="https://docs.cloud.google.com/sdk/gcloud/reference/run/deploy"
                                                target="_blank"
                                                rel="noopener"
                                            >
                                                {'gcloud run deploy リファレンス'}
                                            </a>{' '}
                                        </td>{' '}
                                    </tr>{' '}
                                </tbody>{' '}
                            </table>
                        </div>{' '}
                    </section>{' '}
                    <section id="troubleshooting" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-bug" aria-hidden="true"></i>
                            {'11. よくあるつまずきポイント'}
                        </h2>{' '}
                        <div className="table-scroll">
                            <table>
                                {' '}
                                <thead>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <th scope="col">{'症状'}</th>{' '}
                                        <th scope="col">{'想定される原因'}</th>{' '}
                                        <th scope="col">{'対処'}</th>{' '}
                                    </tr>{' '}
                                </thead>{' '}
                                <tbody>
                                    {' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            {'severity check ステップが常に成功してしまう'}
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <code>{'grep -Fxq'}</code>
                                            {' の対象文字列や大文字小文字が一致していない '}
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <code>
                                                {
                                                    '--format="value(vulnerability.effectiveSeverity)"'
                                                }
                                            </code>
                                            {' の出力値と '}
                                            <code>{'CRITICAL'}</code>
                                            {' の表記を完全一致させる '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            {'create-attestation ステップが権限エラーで失敗する'}
                                        </td>{' '}
                                        <td>
                                            {' Cloud Build SA / Compute Engine デフォルト SA に '}
                                            <code>{'roles/cloudkms.signerVerifier'}</code>
                                            {' が付与されていない '}
                                        </td>{' '}
                                        <td>
                                            {'Task 4 のロール一覧を再確認し、両方の SA に付与する'}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            {
                                                'Cloud Run へのデプロイが Binary Authorization に拒否される'
                                            }
                                        </td>{' '}
                                        <td>
                                            {
                                                ' Policy に Attestor が正しく登録されていない、または Attestation が異なる Note に紐づいている '
                                            }
                                        </td>{' '}
                                        <td>
                                            {' '}
                                            <code>{'gcloud container binauthz policy export'}</code>
                                            {' でポリシーの内容を確認する '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>
                                            {'binauthz-attestation イメージが見つからない'}
                                        </td>{' '}
                                        <td>
                                            {
                                                ' Custom Build Step がまだプロジェクトの Container Registry にビルド・push されていない '
                                            }
                                        </td>{' '}
                                        <td>
                                            {' Task 4 の '}
                                            <code>{'git clone'}</code>
                                            {' 〜 '}
                                            <code>{'gcloud builds submit'}</code>
                                            {' の手順を再実行する '}
                                        </td>{' '}
                                    </tr>{' '}
                                    <tr>
                                        {' '}
                                        <td>{'KMS の鍵バージョンパスを間違える'}</td>{' '}
                                        <td>
                                            {' '}
                                            <code>{'keyVersion'}</code>
                                            {' は必ず '}
                                            <code>{'cryptoKeyVersions/1'}</code>
                                            {' までのフルパスが必要 '}
                                        </td>{' '}
                                        <td>
                                            {
                                                ' 鍵リング名・鍵名・バージョン番号をすべて含むフルパスを使用する '
                                            }
                                        </td>{' '}
                                    </tr>{' '}
                                </tbody>{' '}
                            </table>
                        </div>{' '}
                    </section>{' '}
                    <section id="references" tabIndex={-1}>
                        {' '}
                        <h2>
                            <i className="ti ti-link" aria-hidden="true"></i>
                            {'12. 参考文献（出典一覧）'}
                        </h2>{' '}
                        <ol className="reference-list">
                            {' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'01'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/overview"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Binary Authorization overview '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {'docs.cloud.google.com/binary-authorization/docs/overview'}
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'02'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/key-concepts"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Binary Authorization concepts '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/binary-authorization/docs/key-concepts'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'03'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/attestations"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Attestations overview | Binary Authorization '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/binary-authorization/docs/attestations'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'04'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/making-attestations"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Create attestations | Binary Authorization '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/binary-authorization/docs/making-attestations'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'05'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/cloud-build"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {
                                            'Create a Binary Authorization attestation in a Cloud Build pipeline '
                                        }
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/binary-authorization/docs/cloud-build'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'06'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://github.com/GoogleCloudPlatform/cloud-builders-community/tree/master/binauthz-attestation"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'cloud-builders-community: binauthz-attestation (GitHub) '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {'github.com/GoogleCloudPlatform/cloud-builders-community'}
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'07'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/run/overview"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Set up overview for Cloud Run | Binary Authorization '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/binary-authorization/docs/run/overview'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'08'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/run/enabling-binauthz-cloud-run"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Enable Binary Authorization for Cloud Run '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/binary-authorization/docs/run/enabling-binauthz-cloud-run'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'09'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/binary-authorization/docs/run/configure-policy-cloud-run"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {
                                            'Quickstart: Configure a Binary Authorization policy with Cloud Run '
                                        }
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/binary-authorization/docs/run/configure-policy-cloud-run'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'10'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/artifact-registry/docs/analysis"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {
                                            'Artifact analysis and vulnerability scanning | Artifact Registry '
                                        }
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {'docs.cloud.google.com/artifact-registry/docs/analysis'}
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'11'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/artifact-analysis/docs/container-scanning-overview"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Container scanning overview | Artifact Analysis '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/artifact-analysis/docs/container-scanning-overview'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'12'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/artifact-analysis/docs/ods-cloudbuild"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Use On-Demand Scanning in your Cloud Build pipeline '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/artifact-analysis/docs/ods-cloudbuild'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'13'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://cloud.google.com/sdk/gcloud/reference/artifacts/docker/images/scan"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'gcloud artifacts docker images scan リファレンス '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'cloud.google.com/sdk/gcloud/reference/artifacts/docker/images/scan'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'14'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/artifact-registry/docs/repositories/create-repos"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Create standard repositories | Artifact Registry '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/artifact-registry/docs/repositories/create-repos'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'15'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/artifact-registry/docs/docker/store-docker-container-images"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {
                                            'Quickstart: Store Docker container images in Artifact Registry '
                                        }
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/artifact-registry/docs/docker/store-docker-container-images'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'16'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/kms/docs/create-key"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Create a key | Cloud Key Management Service '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {'docs.cloud.google.com/kms/docs/create-key'}
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'17'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/kms/docs/create-validate-signatures"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Creating and validating digital signatures | Cloud KMS '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/kms/docs/create-validate-signatures'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'18'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/build/docs/iam-roles-permissions"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'IAM roles and permissions | Cloud Build '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {'docs.cloud.google.com/build/docs/iam-roles-permissions'}
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'19'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/build/docs/securing-builds/set-service-account-permissions"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {
                                            'Configure access for the default Cloud Build service account '
                                        }
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/build/docs/securing-builds/set-service-account-permissions'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'20'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/sdk/gcloud/reference/run/deploy"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'gcloud run deploy リファレンス '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {'docs.cloud.google.com/sdk/gcloud/reference/run/deploy'}
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'21'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://docs.cloud.google.com/container-registry/docs/container-best-practices"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Best practices for containers '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'docs.cloud.google.com/container-registry/docs/container-best-practices'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'22'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://cloud.google.com/software-supply-chain-security/docs/base-images"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'Base images | Software supply chain security '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {
                                            'cloud.google.com/software-supply-chain-security/docs/base-images'
                                        }
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                            <li className="reference-item">
                                {' '}
                                <span className="reference-index">{'23'}</span>{' '}
                                <div className="reference-body">
                                    {' '}
                                    <a
                                        href="https://www.skills.google/course_templates/1164/labs/610922"
                                        target="_blank"
                                        rel="noopener"
                                    >
                                        {'元となる Challenge Lab: Secure Software Delivery '}
                                        <i
                                            className="ti ti-external-link reference-icon"
                                            aria-hidden="true"
                                        ></i>
                                    </a>{' '}
                                    <span className="reference-url">
                                        {'skills.google/course_templates/1164/labs/610922'}
                                    </span>{' '}
                                </div>{' '}
                            </li>{' '}
                        </ol>{' '}
                        <p className="footnote">
                            {
                                ' 本ガイドは公式ドキュメントの内容を要約・再構成したものであり、実際の設定値（リージョン名やプロジェクトIDなど）は各自の環境に合わせて置き換えてください。 '
                            }
                        </p>{' '}
                    </section>{' '}
                </main>
            </div>
        </div>
    );
}
