'use client';

import { useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS } from './constants';

export default function ProfessionalAgenticArchitectGuide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="agentic-guide-page">
            <div className="layout">
                <NavBar />
                <main className="main">
<div className="hero">

                        <div className="kicker">Professional Agentic Architect · 認定ガイド</div>
                        <h1>Google Cloud Professional Agentic Architect 認定試験 技術ガイド</h1>
                        <p className="hero-lede">
                        初学者向けに、Professional Agentic
                        Architectベータ試験の出題範囲を項目ごとに解説し、各サービス・機能のベストプラクティスをまとめた技術文書です。
                    </p>
                        <div className="meta-row">
                            <span className="pill">試験形式 <strong>ベータ試験</strong></span>
                            <span className="pill">試験時間 <strong>3時間</strong></span>
                            <span className="pill">図解 <strong>Mermaid 21点</strong></span>
                            <span className="pill">参考文献 <strong>63件</strong></span>
                            </div>
                        
                    </div>
<h2 id="この試験について">この試験について</h2>
<p>
                    Google Cloud Certified Professional Agentic Architectは、Google
                    Cloud上で自律的かつAI駆動のエージェント型ワークフロー（agentic
                    workflow）を設計・管理する技術者向けの認定資格です。大規模言語モデル（LLM）の活用、エージェント設計パターンの適用、コーディング、Google
                    Cloud上でのデータソース統合について深い経験を持つ、開発者またはアーキテクトを対象としています<a className="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a><a className="footnote-ref" href="#ref2" id="fnref2" role="doc-noteref"><sup>2</sup></a>。
                </p>
<p>
                    2026年9月4日時点で、この試験は<strong>ベータ試験</strong>として提供されています。ベータ期間中に収集された正答率などの統計データをもとに、正式版（GA）の合格基準が決定される仕組みです<a className="footnote-ref" href="#ref1" id="fnref3" role="doc-noteref"><sup>1</sup></a>。
                </p>
<h3 id="ベータ試験の概要">ベータ試験の概要</h3>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td>試験時間</td>
                                    <td>3時間</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>受験料</td>
                                    <td>120米ドル（正規価格200米ドルから40%割引、税別）</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>出題形式</td>
                                    <td>
                                    選択式問題 約80問（プロクター付きオンライン受験または会場受験）
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>言語</td>
                                    <td>英語のみ</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>有効期間</td>
                                    <td>合格から1年間</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>前提条件</td>
                                    <td>
                                    なし（推奨経験：クラウドソリューションの構築・テスト・デプロイ・管理経験3年以上、うちGoogle
                                    Cloudでのエージェント型ソリューション構築経験1年以上）
                                </td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>認定構成</td>
                                    <td>
                                    ①Pearson監督の選択式試験（概念知識・システム設計判断・アーキテクチャ標準を評価）
                                    ②Google
                                    Skills上で実施するハンズオンラボ（実装力・コーディング力を評価）
                                </td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>
<p>
                    出典：Google Cloud公式認定ページ<a className="footnote-ref" href="#ref1" id="fnref4" role="doc-noteref"><sup>1</sup></a>、公式Exam Guide PDF<a className="footnote-ref" href="#ref2" id="fnref5" role="doc-noteref"><sup>2</sup></a>
                        </p>
<h3 id="出題範囲の配点構成">出題範囲の配点構成</h3>
<p>
                    エージェント開発のライフサイクル（ローコードでの構築 →
                    コーディングエージェントの活用 → コードによるカスタム開発 → 評価・デプロイ →
                    セキュリティ・ガバナンス）に沿って、5つのセクションで構成されています。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag1} ariaLabel="出題範囲の配点構成パイチャート" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    セクション3「カスタムエージェントの開発」が全体の3分の1を占める最重要領域であり、続いてセクション4「評価とデプロイ」が22%を占めます。この2セクションだけで出題の過半数（55%）に達するため、学習の優先度を高く設定することをお勧めします。
                </p>
<h3 id="google-cloud-エージェントプラットフォームの全体像">
                    Google Cloud エージェントプラットフォームの全体像
                </h3>
<p>
                    試験範囲の各サービスは、Gemini Enterprise Agent Platform（旧Vertex
                    AIから進化した統合プラットフォーム）の「Build・Scale・Govern・Optimize」という4つの柱に整理されています<a className="footnote-ref" href="#ref6" id="fnref6" role="doc-noteref"><sup>6</sup></a>。まずこの全体像を把握すると、個々のサービスの位置づけが理解しやすくなります。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag2} ariaLabel="Google Cloud エージェントプラットフォームの全体像（Build・Run・Govern）" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    出典：Agent Platform overview<a className="footnote-ref" href="#ref6" id="fnref7" role="doc-noteref"><sup>6</sup></a>、Gemini Enterprise発表ブログ<a className="footnote-ref" href="#ref7" id="fnref8" role="doc-noteref"><sup>7</sup></a>
                        </p>
<hr />
<h2 id="セクション1-ローコードツールを使用したエージェントの構築配点-約13">
                    セクション1: ローコードツールを使用したエージェントの構築（配点 約13%）
                </h2>
<p>
                    このセクションでは、コードを書かずに（またはごく少量のコードで）エージェントを構築・接続するための、Gemini
                    Enterprise配下のローコード／ノーコードツール群を扱います。
                </p>
<h3 id="11-ローコードツールを使用したエージェントワークフローと動作の設定">
                    1.1 ローコードツールを使用したエージェントワークフローと動作の設定
                </h3>
<h4>Workflow Builder（旧 Agent Designer）と CX Agent Studio</h4>
<p>Gemini Enterprise には、目的の異なる2つのローコード構築ツールがあります。</p>
<ul>

                        <li>
                            <strong>Workflow Builder（旧 Agent Designer）</strong>：Gemini Enterprise
                        アプリ内に統合された、no-code／low-codeのプラットフォームです。自然言語プロンプトによるエージェントの作成・プレビュー、インタラクティブなフローキャンバスでのワークフロー編集、サブエージェントを使った複数ステップタスクのオーケストレーション、Gmail・Google
                        Drive・Jiraなど社内外のデータソース／ツールとの接続、定期実行スケジューリングまでを担います<a className="footnote-ref" href="#ref4" id="fnref9" role="doc-noteref"><sup>4</sup></a><a className="footnote-ref" href="#ref89" id="fnref10" role="doc-noteref"><sup>89</sup></a>。従業員が自分の業務知識をノーコードで「AIヘルパー」に変換するための入口として位置づけられています<a className="footnote-ref" href="#ref93" id="fnref11" role="doc-noteref"><sup>93</sup></a>。
                    </li>
                        <li>
                            <strong>CX Agent Studio（Customer Experience Agent Studio）</strong>：会話型AIエージェントに特化した、Gemini搭載のミニマルコード構築ツールです。バックエンドのツール呼び出し中も自然な会話フローを維持する非同期処理、双方向ストリーミングによる低遅延な音声対話、変更履歴・ワンクリックロールバックなどのチーム開発向けバージョン管理機能を備えています<a className="footnote-ref" href="#ref5" id="fnref12" role="doc-noteref"><sup>5</sup></a><a className="footnote-ref" href="#ref92" id="fnref13" role="doc-noteref"><sup>92</sup></a>。
                    </li>
                        
                    </ul>
<p>
                    このうち <strong>CX Agent Studio</strong>（およびその前身である Dialogflow
                    CX）が採用しているのが、「状態ベースのワークフロー（state-based
                    workflow）」という考え方です。これは、会話の流れを<strong>ページ（状態）</strong>、<strong>遷移ルート（transition route）</strong>、<strong>イベントハンドラ</strong>の3要素でモデル化する設計手法で、これら3つはいずれも
                    Dialogflow CX／CX Agent Studio の構成要素です。Workflow Builder
                    のフローキャンバスは業務手順を可視化するタスク指向の Flow
                    であり、ここで言う状態ベースワークフローとは別の概念なので混同しないでください。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag3} ariaLabel="CX Agent Studio 状態遷移モデル" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    各ページには、few-shotプロンプトやChain-of-Thought（CoT）プロンプトを使った<strong>システムインストラクション</strong>と<strong>コンソール内プロンプトテンプレート</strong>を設定し、エージェントの振る舞いを誘導します。Workflow
                    BuilderのチャットペインはNo-code志向のユーザーが自然言語でエージェントを調整するのに向いており、Flowキャンバスはより精密な制御を行いたい場合に使います<a className="footnote-ref" href="#ref4" id="fnref14" role="doc-noteref"><sup>4</sup></a>。
                </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                状態（ページ）は単一責任を持たせて細かく分割し、1ページに複数の意図を詰め込まない。意図分類は専用のルーティングページに集約する。
                            </li>
                                {" "}
                                <li>
                                システムインストラクションには、few-shot例を2〜3件程度含めることでフォーマットの逸脱を防ぐ。指示文だけでは出力形式が安定しないケースが多い。
                            </li>
                                {" "}
                                <li>
                            <code>no-match</code>／<code>no-input</code>イベントハンドラを必ず設計し、有人エスカレーションへのフォールバック経路を用意する。
                            </li>
                                {" "}
                                <li>
                                チャットペイン（自然言語での調整）とFlowキャンバス（構造化編集）を併用し、大まかな骨格をチャットで素早く作成してからFlowキャンバスで細部を詰める。
                            </li>
                            </ul>
                        </div>
                    </div>

<h3 id="12-gemini-enterpriseへのエンタープライズデータ接続">
                    1.2 Gemini Enterpriseへのエンタープライズデータ接続
                </h3>
<p>
                    Workflow Builderや検索体験にエンタープライズ固有データを接続する際は、<strong>Agent Search</strong>（旧Vertex AI Search）をはじめとするGemini
                    Enterpriseのデータコネクタ機能を使用します<a className="footnote-ref" href="#ref97" id="fnref15" role="doc-noteref"><sup>97</sup></a>。ここで扱う考慮事項は大きく2つです。
                </p>
<ol>

                        <li>
                            <strong>プロプライエタリなデータソースへの安全な接続とクエリ</strong>：Gemini Enterprise / Agent
                        Searchを使い、社内文書・データベース・SaaSアプリケーションなどのエンタープライズ固有データソースに安全に接続し、検索クエリを実行できるように設定します。
                    </li>
                        <li>
                            <strong>非構造化マルチモーダルデータの取り込みと処理</strong>：動画・音声・画像などの非構造化データをエージェントワークフローに取り込み、処理できるようにします。
                    </li>
                        
                    </ol>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag4} ariaLabel="Gemini Enterprise データ接続アーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>


                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                データコネクタの認可は、コネクタに付与するOAuthスコープ、データソース側の外部ACL、identity
                                sync
                                の構成をそれぞれ個別に最小権限化する。これらはコネクタ経由で読み取れるデータの範囲を決める設定である。
                            </li>
                                {" "}
                                <li>
                                後述するAgent IdentityのPAB（Principal Access
                                Boundary）は、エージェント主体がアクセスできるGoogle
                                Cloudリソースの境界を定める別レイヤの制御として、コネクタ側の設定とは独立に設定する。
                            </li>
                                {" "}
                                <li>
                                非構造化マルチモーダルデータは、取り込み前にフォーマット・言語・機密度を確認し、必要に応じてSensitive
                                Data
                                Protection（後述セクション5）で前処理してからインデックス化する。
                            </li>
                                {" "}
                                <li>
                                データソースの更新頻度に応じてインデックスの再構築サイクルを設計し、鮮度が重要なデータ（在庫・価格など）は差分更新の仕組みを検討する。
                            </li>
                            </ul>
                        </div>
                    </div>

<hr />
<h2 id="セクション2-コーディングエージェントを使用したアプリケーション開発配点-約17">
                    セクション2: コーディングエージェントを使用したアプリケーション開発（配点
                    約17%）
                </h2>
<h3 id="21-コーディングエージェントの効果的な使用">
                    2.1 コーディングエージェントの効果的な使用
                </h3>
<p>
                    「コーディングエージェント」とは、開発者に代わってコードの読み書き・リファクタリング・デバッグを自律的に行うAIエージェントを指します。Google
                    Cloud上では、代表的な実装として<strong>Antigravity</strong>（Googleのエージェント・ファースト開発プラットフォーム）や、Google
                    Cloud上で稼働する<strong>Claude Code</strong>が試験範囲に含まれます<a className="footnote-ref" href="#ref11" id="fnref16" role="doc-noteref"><sup>11</sup></a><a className="footnote-ref" href="#ref13" id="fnref17" role="doc-noteref"><sup>13</sup></a>。
                </p>
<h4>MCPサーバー、カスタムスキル、ツールアクセスの設定</h4>
<p>
                    コーディングエージェントの能力は、接続されたツール群によって大きく左右されます。<strong>Model Context Protocol（MCP）サーバー</strong>を使うと、エージェントに対してファイルシステム・データベース・外部APIなど任意のツールを標準化されたプロトコルで公開できます。Antigravityでは、IDE・CLI・SDKのいずれの形態でもMCPサーバーを追加設定できます<a className="footnote-ref" href="#ref55" id="fnref18" role="doc-noteref"><sup>55</sup></a>。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag5} ariaLabel="コーディングエージェントのツール接続とサンドボックス実行" theme="light" preserveNaturalScale={true} />
                    </div>

<h4>セキュアサンドボックスでの使用</h4>
<p>
                    コーディングエージェントに実行権限を与える際は、本番環境から隔離された<strong>セキュアサンドボックス</strong>内で動作させることが重要です。試験範囲では、GKE（Google
                    Kubernetes Engine）、Cloud
                    Workstations、Antigravity自身のサンドボックス機能の3つが挙げられています。
                </p>
<ul>

                        <li>
                            <strong>GKE</strong>：Podレベルの分離とネットワークポリシーで、エージェントの実行環境をきめ細かく制御できます。
                    </li>
                        <li>
                            <strong>Cloud Workstations</strong>：ブラウザから利用できるマネージド開発環境で、エージェントの作業空間ごとに構成をテンプレート化できます。
                    </li>
                        <li>
                            <strong>Antigravityサンドボックス</strong>：IDE組み込みの隔離実行環境で、エージェントが生成した変更をArtifacts（タスクリスト、実装計画、スクリーンショット、ブラウザ録画など）として可視化し、人間がレビューしてから反映できます<a className="footnote-ref" href="#ref57" id="fnref19" role="doc-noteref"><sup>57</sup></a>。
                    </li>
                        
                    </ul>
<h4>コーディングエージェントによるコード改善作業</h4>
<p>
                    試験範囲では、コーディングエージェントを使った次の3種類の作業が明示されています。
                </p>
<ol>

                        <li><strong>ソースコードのリファクタリング</strong></li>
                        <li><strong>実行ランタイムの最適化</strong></li>
                        <li><strong>アプリケーション層の脆弱性パッチ適用</strong></li>
                        
                    </ol>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                コーディングエージェントに本番相当のクレデンシャルを直接渡さない。サンドボックス内では専用のサービスアカウント／エージェントIDを使い、最小権限を徹底する（詳細はセクション5のAgent
                                Identityを参照）。
                            </li>
                                {" "}
                                <li>
                                MCPサーバーは信頼できるソースからのみ追加し、ツールの説明文（tool
                                description）に紛れ込ませたプロンプトインジェクションのリスクを常に意識する。
                            </li>
                                {" "}
                                <li>
                                破壊的な操作（削除・本番デプロイなど）を伴うタスクは、Artifactsやプルリクエストなど人間がレビューできる中間生成物を経由させ、完全自律実行にしない。
                            </li>
                                {" "}
                                <li>
                                リファクタリングや脆弱性パッチのタスクでは、着手前後でテストスイートを実行し、エージェントの変更が既存の振る舞いを壊していないことを機械的に確認する。
                            </li>
                            </ul>
                        </div>
                    </div>

<h3 id="22-エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ">
                    2.2 エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ
                </h3>
<h4>
                    Antigravityでのスキル・プラグイン・拡張フック・ルール・サブエージェントの作成
                </h4>
<p>
                    Antigravityは、単なるコード補完ツールではなく、エージェントを中心に据えた開発プラットフォームです。エンタープライズ向けにカスタマイズする手段として、以下が試験範囲に含まれます。
                </p>
<ul>

                        <li>
                            <strong>スキル（Skills）</strong>：特定のタスクに関する知識・手順をパッケージ化し、必要なときだけエージェントのコンテキストに読み込ませる仕組みです。
                    </li>
                        <li>
                            <strong>プラグイン（Plugins）</strong>：スキルとMCPサーバーを1つの配布可能な単位にまとめる、ベンダー中立のオープン仕様「Agent
                        Plugins」に準拠します。Googleはこの仕様のコアメンテナーとして参加しており、Agents
                        CLIやData Agent Kitがこの形式でプラグインを配布しています<a className="footnote-ref" href="#ref15" id="fnref20" role="doc-noteref"><sup>15</sup></a><a className="footnote-ref" href="#ref67" id="fnref21" role="doc-noteref"><sup>67</sup></a>。
                    </li>
                        <li>
                            <strong>拡張フック（Extension hooks）</strong>：エージェントのライフサイクルイベント（セッション開始・終了など）に処理を差し込む仕組みです。
                    </li>
                        <li>
                            <strong>ルール（Rules）</strong>：<code>AGENTS.md</code>のようなプロジェクトレベルのルールファイルを通じて、コーディング規約やレビュー基準をエージェントに継続的に守らせます<a className="footnote-ref" href="#ref50" id="fnref22" role="doc-noteref"><sup>50</sup></a>。
                    </li>
                        <li>
                            <strong>サブエージェント（Subagents）</strong>：単一のエージェントに全タスクを担わせるのではなく、役割ごとに専門化したサブエージェントへ処理を委譲する構成です。
                    </li>
                        
                    </ul>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag6} ariaLabel="Antigravity エコシステム（プラグイン・スキル・ルール・拡張フック）" theme="light" preserveNaturalScale={true} />
                    </div>

<h4>Agents CLIによるAntigravityの拡張</h4>
<p>
                        <strong>Agents CLI</strong>は、Agent
                    Platform上でのエージェント構築・評価・デプロイ・公開のための「スキル集」をコーディングエージェントに提供する、統一されたコマンドラインインターフェースです。Antigravity、Gemini
                    CLI、Claude
                    Code、Codexなど任意のコーディングエージェントと組み合わせて使用できます<a className="footnote-ref" href="#ref14" id="fnref23" role="doc-noteref"><sup>14</sup></a><a className="footnote-ref" href="#ref60" id="fnref24" role="doc-noteref"><sup>60</sup></a>。ADK・エージェント評価手法・Google
                    Cloudへのデプロイ方法に関する専門知識をカプセル化しており、自然言語の指示だけでこれらの複雑な操作をAI開発ツールに実行させることができます<a className="footnote-ref" href="#ref10" id="fnref25" role="doc-noteref"><sup>10</sup></a>。
                </p>
<p>Agents CLIが提供する主なスキルは次の7種類です。</p>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">スキル名</th>
                                    <th scope="col">役割</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td><code>google-agents-cli-workflow</code></td>
                                    <td>開発ライフサイクル全体の管理、コード保全ルール、モデル選定</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td><code>google-agents-cli-scaffold</code></td>
                                    <td>プロジェクトの雛形作成・拡張・アップグレード</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td><code>google-agents-cli-adk-code</code></td>
                                    <td>
                                    ADK Python
                                    APIの利用パターン（エージェント・ツール・オーケストレーション・コールバック・状態）
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td><code>google-agents-cli-eval</code></td>
                                    <td>
                                    評価手法（メトリクス・evalset・LLM-as-judge・トラジェクトリスコアリング）
                                </td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td><code>google-agents-cli-deploy</code></td>
                                    <td>
                                    Agent Runtime／Cloud
                                    Run／GKEへのデプロイ、CI/CD、シークレット管理
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td><code>google-agents-cli-publish</code></td>
                                    <td>Gemini Enterpriseへのエージェント公開</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td><code>google-agents-cli-observability</code></td>
                                    <td>デプロイ後の可観測性設定</td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>
<p>
                    出典：Agents CLI公式リポジトリ<a className="footnote-ref" href="#ref14" id="fnref26" role="doc-noteref"><sup>14</sup></a><a className="footnote-ref" href="#ref60" id="fnref27" role="doc-noteref"><sup>60</sup></a>
                        </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                スキルはタスクに一致したときだけコンテキストに読み込まれる設計を活かし、無関係なスキルを常時ロードしてコンテキストウィンドウを浪費しない。
                            </li>
                                {" "}
                                <li>
                                Agent
                                Pluginsの仕様に従う場合、認証情報（トークンやAPIキー）をヘッダーなどのパッケージデータに直書きしない。プラグインは第三者がダウンロードして中身を読める前提で設計する<a className="footnote-ref" href="#ref15" id="fnref28" role="doc-noteref"><sup>15</sup></a>。
                            </li>
                                {" "}
                                <li>
                            <code>agents-cli</code>はスタンドアロンのCLIとしても、コーディングエージェント経由でも呼び出せるため、CI/CDパイプラインではCLI直接呼び出し、開発者の対話的作業ではコーディングエージェント経由、と使い分けると効率的。
                            </li>
                                {" "}
                                <li>
                                サブエージェントへの分割は「専門化による品質向上」と「オーケストレーションの複雑化」のトレードオフであることを意識し、まずは単一エージェント＋ツール群で始め、責務が明確に分離できる場合のみサブエージェント化する。
                            </li>
                            </ul>
                        </div>
                    </div>

<hr />
<h2 id="セクション3-カスタムエージェントの開発配点-約33">
                    セクション3: カスタムエージェントの開発（配点 約33%）
                </h2>
<p>
                    試験全体の3分の1を占める最重要セクションです。ローコードツールでは対応しきれない、コードによるエージェントの設計・構築・エンタープライズデータ統合・マルチエージェントオーケストレーションを扱います。
                </p>
<h3 id="31-コードでのエージェントワークフローの設計と構築">
                    3.1 コードでのエージェントワークフローの設計と構築
                </h3>
<h4>言語モデルの選定と設定</h4>
<p>
                    エージェントアーキテクチャを設計する最初のステップは、どの言語モデルを使うかの選定です。試験範囲では、コスト・セキュリティ・アーキテクチャ要件を踏まえた次の3つの軸での比較検討が問われます。
                </p>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">比較軸</th>
                                    <th scope="col">選択肢A</th>
                                    <th scope="col">選択肢B</th>
                                    <th scope="col">主な判断基準</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td>モデルサイズ</td>
                                    <td>LLM（大規模言語モデル）</td>
                                    <td>SLM（小規模言語モデル）</td>
                                    <td>
                                    推論の複雑さ、レイテンシ要件、コスト、エッジ／オンデバイス実行の要否
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>ホスティング形態</td>
                                    <td>自己ホスト（self-hosted）</td>
                                    <td>SaaS（マネージドAPI）</td>
                                    <td>データ主権・レイテンシ制御 vs 運用負荷の軽減</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>ライセンス形態</td>
                                    <td>OSS（オープンソース）</td>
                                    <td>プロプライエタリ</td>
                                    <td>カスタマイズ性・透明性 vs サポート体制・最新性能</td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag7} ariaLabel="言語モデル選定デシジョンフロー" theme="light" preserveNaturalScale={true} />
                    </div>


                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                まずSaaS型のGemini
                                LLMsで最小構成のプロトタイプを作り、レイテンシ・コスト・精度の実測値を取ってから、自己ホストやSLMへの移行要否を判断する。早期の自己ホスト化は運用コストの見積もりを誤らせやすい。
                            </li>
                                {" "}
                                <li>
                                Model
                                Gardenを使うと、Google製・パートナー製・OSSを含む200以上のモデルを同一のワークフローで比較評価できるため、モデル選定のPoC段階で活用する<a className="footnote-ref" href="#ref90" id="fnref29" role="doc-noteref"><sup>90</sup></a>。
                            </li>
                                {" "}
                                <li>
                                コスト最適化の観点では、複雑な推論が必要なステップのみLLMを使い、定型的な分類やフォーマット変換にはSLMを使う「モデルの階層化（model
                                cascading）」も検討する。
                            </li>
                            </ul>
                        </div>
                    </div>

<h4>開発ツールとしてのADK（Agent Development Kit）</h4>
<p>
                        <strong>Agent Development Kit</strong>（ADK）は、Python・TypeScript・Go・Javaに対応した、オープンソースのコードファーストなエージェント構築フレームワークです。Geminiとの親和性が高い一方でモデル非依存・デプロイ先非依存に設計されており、通常のソフトウェア開発に近い感覚でエージェント開発ができます<a className="footnote-ref" href="#ref8" id="fnref30" role="doc-noteref"><sup>8</sup></a><a className="footnote-ref" href="#ref9" id="fnref31" role="doc-noteref"><sup>9</sup></a>。
                </p>
<p>ADKによる開発は、次のような段階的な拡張パスをたどるのが一般的です。</p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag8} ariaLabel="ADKエージェント開発の段階的拡張パス" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    出典：ADKフレームワーク概要<a className="footnote-ref" href="#ref9" id="fnref32" role="doc-noteref"><sup>9</sup></a>
                        </p>
<h4>セッションとメモリの設定</h4>
<p>
                    会話状態を保持するには<strong>Agent Platform Sessions</strong>、長期記憶（ユーザーの好み・過去の経緯）を扱うには<strong>Agent Platform Memory Bank</strong>を使用します。
                </p>
<ul>

                        <li>
                            <strong>Sessions</strong>：ユーザーとエージェント間のやり取りの履歴（イベント）を時系列に保持する仕組みです。ADKエージェントをAgent
                        Runtimeにデプロイすると、セッション管理は自動的に有効になります<a className="footnote-ref" href="#ref125" id="fnref33" role="doc-noteref"><sup>125</sup></a>。
                    </li>
                        <li>
                            <strong>Memory Bank</strong>：セッションのイベント群を送信すると、内容がインテリジェントに処理され「メモリ」として永続化されます。エージェントは過去の会話をまたいでこのメモリを検索し、パーソナライズされた応答を生成できます<a className="footnote-ref" href="#ref121" id="fnref34" role="doc-noteref"><sup>121</sup></a>。<code>AdkApp</code>
                        が使うメモリサービスの既定値は実行環境で切り替わり、ローカル開発では
                        <code>InMemoryMemoryService</code>、Agent Runtime 上では
                        <code>VertexAiMemoryBankService</code> になります<a className="footnote-ref" href="#ref123" id="fnref35" role="doc-noteref"><sup>123</sup></a>。ただし切り替わるのは既定の実装だけで、<strong>Memory Bank
                            インスタンスの作成と呼び出し側への権限付与は別途必要な前提条件</strong>です。またメモリは自動的に生成されるわけではなく、<code>add_session_to_memory</code>（セッション全体の取り込み）、<code>generate</code>（メモリ生成の明示実行）、<code>IngestEvents</code>（イベント単位の取り込み）といった該当するトリガーを呼び出したときにのみ生成されます。
                    </li>
                        
                    </ul>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag9} ariaLabel="セッションと長期記憶（SessionsとMemory Bank）のアーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>


                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                Memory
                                Bankには「メモリポイズニング」のリスクがある。虚偽情報が長期記憶として保存され、将来のセッションでエージェントがそれを事実として扱ってしまう問題であり、Model
                                Armorでの事前スクリーニングや、メモリ生成元セッションの出所検証で緩和する<a className="footnote-ref" href="#ref121" id="fnref36" role="doc-noteref"><sup>121</sup></a>。
                            </li>
                                {" "}
                                <li>
                                本番デプロイ時にカスタムのインメモリセッションサービスを使い続けると、Agent
                                Runtime上でセッションが同期されない場合があるため、マネージドのSessions／Memory
                                Bankへ切り替える<a className="footnote-ref" href="#ref123" id="fnref37" role="doc-noteref"><sup>123</sup></a>。
                            </li>
                                {" "}
                                <li>
                            <code>PreloadMemoryTool</code>などを使い、どのタイミングでメモリを取得しプロンプトに含めるかを明示的に制御する。無条件にすべてのメモリを毎回注入すると、コンテキスト膨張とレイテンシ増加を招く。
                            </li>
                            </ul>
                        </div>
                    </div>

<h4>Agents CLIでのスキル設定</h4>
<p>
                    ADKエージェントの構築時にも、前セクションで紹介したAgents
                    CLIのスキル（<code>agent</code>モードと<code>human</code>モードの切り替えを含む）やプラグインを活用できます。<code>agent</code>モードはAI開発ツールが自律的に判断を進めるモード、<code>human</code>モードは各ステップで開発者の確認を挟むモードに相当し、本番投入前の検証段階では<code>human</code>モードを使うことが推奨されます。
                </p>
<h3 id="32-エンタープライズドメイン知識の統合">
                    3.2 エンタープライズドメイン知識の統合
                </h3>
<h4>RAGパイプラインとベクトル検索システムの設計</h4>
<p>
                    エージェントに社内知識を持たせる代表的な手法が<strong>RAG</strong>（Retrieval-Augmented
                    Generation）です。試験範囲では、埋め込みモデル・類似度スコアリング・リランキングを含むRAGパイプライン全体の設計・構成・管理と、その裏側で使うベクトルデータベースの選定が問われます。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag10} ariaLabel="RAGパイプラインとAgent Retrievalアーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    RAGを支えるベクトルデータベースとして、試験ガイドでは<strong>Vector Search 1.0</strong>と<strong>Agent Retrieval</strong>の2つが明示されています。両者は別物であり、違いを理解しておく必要があります。
                </p>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">比較項目</th>
                                    <th scope="col">Vector Search 1.0</th>
                                    <th scope="col">Agent Retrieval（旧Vector Search 2.0）</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td>位置づけ</td>
                                    <td>ANN（近似最近傍探索）のインデックス・アズ・ア・サービス</td>
                                    <td>
                                    自己チューニング型のAIネイティブ検索エンジン（ストレージ＋検索の統合基盤）
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>管理単位</td>
                                    <td>
                                    インデックスとエンドポイント（VM・レプリカ数などを自分で設定）
                                </td>
                                    <td>
                                    Collection（データオブジェクトの集合、リレーショナルDBのテーブルに近い概念）
                                </td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>運用の手間</td>
                                    <td>利用者がセットアップ・管理・クリーンアップを担う</td>
                                    <td>自動チューニングされ、VMやレプリカ設定が不要</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>データの可視性</td>
                                    <td>プロジェクト内で可視</td>
                                    <td>
                                    プロジェクト内で可視、独自の埋め込み自動生成やBYOE（Bring Your
                                    Own Embeddings）に対応
                                </td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>適するケース</td>
                                    <td>既存の大規模ANN基盤を引き続き利用したい場合</td>
                                    <td>新規構築で、迅速な立ち上げと運用負荷軽減を重視する場合</td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>
<p>
                    出典：Agent Retrieval概要<a className="footnote-ref" href="#ref36" id="fnref38" role="doc-noteref"><sup>36</sup></a>、RAG Engineバックエンド比較<a className="footnote-ref" href="#ref37" id="fnref39" role="doc-noteref"><sup>37</sup></a>
                        </p>
<p>
                    RAG
                    Engineを使う場合は、バックエンドとして<code>RagManagedVertexVectorSearch</code>（Agent
                    Retrieval利用・フルマネージド）、<code>VertexVectorSearch</code>（Vector Search
                    1.0利用・自己管理）、<code>RagManagedDb</code>（Spanner利用・CMEK対応）から選択できます<a className="footnote-ref" href="#ref37" id="fnref40" role="doc-noteref"><sup>37</sup></a>。
                </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                CMEK（顧客管理暗号鍵）によるデータ主権要件がある場合は<code>RagManagedDb</code>（Spanner）を検討する。ただしプロジェクト内から直接データを閲覧できない制約があるため、可観測性要件とのトレードオフを事前に評価する。
                            </li>
                                {" "}
                                <li>
                                新規プロジェクトでは、自動チューニングと運用負荷軽減の観点からAgent
                                Retrieval（<code>RagManagedVertexVectorSearch</code>）を第一候補とし、既存のVector
                                Search 1.0資産がある場合のみ移行コストと比較検討する。
                            </li>
                                {" "}
                                <li>
                                リランキングステップを省略しない。初段の類似度検索だけでは意味的に近いが文脈上は不適切な文書を拾いやすく、リランキングモデルによる二段階選別で回答精度が大きく改善する。
                            </li>
                                {" "}
                                <li>
                                チャンク分割の粒度は、検索精度とコンテキスト長のバランスで決める。粒度が細かすぎると文脈が失われ、粗すぎると無関係な情報が混入しやすい。
                            </li>
                            </ul>
                        </div>
                    </div>

<h4>エージェント権限の設定（Agent Identity）</h4>
<p>
                    RAGパイプラインやツールへのアクセス権限は、<strong>Agent Identity</strong>によってエージェント単位で付与します。詳細はセクション5.1で扱いますが、ここでは「どのデータソースにどのエージェントがアクセスできるか」を設計段階から権限モデルに組み込むことが重要だと押さえておいてください。
                </p>
<h4>Google Cloudツールを使った事前構築・カスタム機能の設定</h4>
<p>
                    エージェントに機能（capability）を持たせる手段として、次のツールが試験範囲に含まれます。
                </p>
<ul>

                        <li>
                            <strong>Agent Registry</strong>：エージェントを発見可能なサービスとして登録するカタログです。Agent
                        Runtimeにデプロイされたエージェントは自動登録され、Google
                        Workspace連携エージェントやGemini
                        Enterpriseの組み込みエージェントのようなGoogle提供エージェントは追加設定なしで発見可能です<a className="footnote-ref" href="#ref19" id="fnref41" role="doc-noteref"><sup>19</sup></a><a className="footnote-ref" href="#ref20" id="fnref42" role="doc-noteref"><sup>20</sup></a>。
                    </li>
                        <li>
                            <strong>Google Cloud MCPサーバー</strong>：マネージドデータベース向けのカスタム統合レイヤー、API統合、サードパーティSaaSツール・リモートサーバーへエージェントを接続するMCPサーバーなど、事前構築済みおよびカスタムの機能を提供します。
                    </li>
                        
                    </ul>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag11} ariaLabel="事前構築機能とAgent Runtimeアーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    出典：Agent Registryの自動登録<a className="footnote-ref" href="#ref19" id="fnref43" role="doc-noteref"><sup>19</sup></a><a className="footnote-ref" href="#ref20" id="fnref44" role="doc-noteref"><sup>20</sup></a>
                        </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                社内で複数チームがエージェントを開発する組織では、Agent
                                Registryへの登録をデプロイパイプラインの必須ステップとして標準化し、他チームが車輪の再発明をせずに既存エージェントのスキルを再利用できるようにする。
                            </li>
                                {" "}
                                <li>
                                外部SaaSやリモートサーバーに接続するMCPサーバーは、後述のAgent
                                Gatewayを経由させ、未登録の宛先への通信を遮断する構成にする。
                            </li>
                            </ul>
                        </div>
                    </div>

<h3 id="33-エージェントワークフローのオーケストレーションと調整">
                    3.3 エージェントワークフローのオーケストレーションと調整
                </h3>
<h4>エージェントプロトコルによるオーケストレーション（MCPとA2A）</h4>
<p>
                    複数エージェントが協調して動作する「マルチエージェントシステム」を構築する際、2つのオープンプロトコルが中核を担います。
                </p>
<ul>

                        <li>
                            <strong>MCP（Model Context Protocol）</strong>：エージェント（モデル）と外部ツール・データソースを接続するための標準規格です。クライアント・サーバーモデルを採用し、AIアプリケーション（MCPホスト）がツールサーバーへの接続を維持して、コンテキストと能力の提供を受けます<a className="footnote-ref" href="#ref71" id="fnref45" role="doc-noteref"><sup>71</sup></a><a className="footnote-ref" href="#ref73" id="fnref46" role="doc-noteref"><sup>73</sup></a>。
                    </li>
                        <li>
                            <strong>A2A（Agent2Agent）</strong>：異なるフレームワーク・異なるベンダー・異なるサーバー上で動作するエージェント同士が、内部状態やロジックを公開せずに対等な立場（ピア）として通信・連携するためのオープン標準です。2025年4月にGoogleが発表し、現在はLinux
                        Foundationに寄贈され、Apache-2.0ライセンスで管理されています<a className="footnote-ref" href="#ref40" id="fnref47" role="doc-noteref"><sup>40</sup></a><a className="footnote-ref" href="#ref41" id="fnref48" role="doc-noteref"><sup>41</sup></a><a className="footnote-ref" href="#ref75" id="fnref49" role="doc-noteref"><sup>75</sup></a>。
                    </li>
                        
                    </ul>
<p>
                    両者は競合ではなく補完関係にあります。「エージェントとツールをつなぐのがMCP、エージェントとエージェントをつなぐのがA2A」と整理すると理解しやすいです<a className="footnote-ref" href="#ref73" id="fnref50" role="doc-noteref"><sup>73</sup></a>。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag12} ariaLabel="MCPとA2Aプロトコルの連携アーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    A2Aの主要概念として、エージェントの名称・URL・バージョン・スキルを記載したJSONマニフェストである<strong>AgentCard</strong>（<code>/.well-known/agent-card.json</code>で公開）、構造化されたタスクのライフサイクル管理、双方向のメッセージベース連携、型付きデータをやり取りする<strong>Artifact Handling</strong>があります<a className="footnote-ref" href="#ref72" id="fnref51" role="doc-noteref"><sup>72</sup></a><a className="footnote-ref" href="#ref73" id="fnref52" role="doc-noteref"><sup>73</sup></a>。
                </p>
<h4>マルチエージェントのハンドオフとワークフローの選定</h4>
<p>
                    ADKは、マルチエージェントの制御フローを構築するための複数の手段を提供します。目的に応じて使い分けます。
                </p>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">パターン</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">適するケース</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td>Sequential（逐次）</td>
                                    <td>サブエージェントを決められた順序で1つずつ実行</td>
                                    <td>
                                    データ処理パイプライン（パース→抽出→要約など、順序が重要な処理）
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>Parallel（並列）</td>
                                    <td>独立したサブエージェントを同時実行し結果を集約</td>
                                    <td>
                                    複数情報源からの並行リサーチなど、速度が重要かつタスクが独立している場合
                                </td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>Loop（ループ）</td>
                                    <td>特定の終了条件を満たすまでサブエージェントを繰り返し実行</td>
                                    <td>Generator→Criticのような反復的な品質改善ループ</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>Graph workflow（グラフ）</td>
                                    <td>
                                    ノードとエッジで構成される宣言的なグラフにより、条件分岐・ファンアウト・人間承認・リトライを表現
                                </td>
                                    <td>決定論的かつ構造化された複雑な業務プロセス</td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>
<p>
                    出典：ADKマルチエージェントパターン解説<a className="footnote-ref" href="#ref42" id="fnref53" role="doc-noteref"><sup>42</sup></a>、ADKグラフワークフロー<a className="footnote-ref" href="#ref43" id="fnref54" role="doc-noteref"><sup>43</sup></a>
                        </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag13} ariaLabel="マルチエージェントオーケストレーションパターン" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    これらのオーケストレーションは、Google
                    Cloud側のガバナンス機構と組み合わせて運用します。具体的には、<strong>Agent Identity</strong>でエージェントごとの実行権限を、<strong>Agent Registry</strong>でハンドオフ先エージェントの発見と検証を、<strong>Agent Runtime</strong>で実行基盤を、<strong>エージェントポリシー</strong>でどのエージェントがどの操作を実行できるかを制御します。
                </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                まずADKの組み込みワークフローエージェント（Sequential／Parallel／Loop）で実装できないか検討し、それでも表現しきれない複雑な分岐・承認フローが必要な場合にのみグラフベースのワークフローに移行する。過剰に複雑なグラフは保守性を下げる。
                            </li>
                                {" "}
                                <li>
                                Human-in-the-loop（人間承認）が必要なステップは、専用の承認サブエージェントとして切り出し、<code>SequentialAgent</code>の中に組み込むと、承認ロジックを他のワークフローでも再利用しやすい<a className="footnote-ref" href="#ref140" id="fnref55" role="doc-noteref"><sup>140</sup></a>。
                            </li>
                                {" "}
                                <li>
                                A2Aでエージェント間連携を行う場合、AgentCardに記載する<code>skills</code>は実際に提供する機能と一致させ、過大申告（実装していない機能を記載）を避ける。呼び出し側のオーケストレーターがAgentCardを信頼してルーティングを決定するため、不一致は実行時エラーの温床になる。
                            </li>
                                {" "}
                                <li>
                                マルチエージェント構成では、エージェント間の連携数が増えるほど統合の複雑度がO(N²)で増大する。A2Aのような標準プロトコルを使うことでこの複雑度を抑えられるが、それでも協調するエージェント数は業務上必要な最小限にとどめる設計を心がける<a className="footnote-ref" href="#ref76" id="fnref56" role="doc-noteref"><sup>76</sup></a>。
                            </li>
                            </ul>
                        </div>
                    </div>

<hr />
<h2 id="セクション4-エージェントワークフローの評価とデプロイ配点-約22">
                    セクション4: エージェントワークフローの評価とデプロイ（配点 約22%）
                </h2>
<h3 id="41-開発環境本番環境でのエージェント評価">
                    4.1 開発環境・本番環境でのエージェント評価
                </h3>
<p>
                    エージェントは非決定的（同じ入力でも毎回同じ出力になるとは限らない）であるため、従来のソフトウェアテストとは異なる評価アプローチが必要です。試験範囲では、テストセットの設計から本番運用中の継続的評価までが問われます。
                </p>
<h4>テストセットの作成</h4>
<p>
                    代表的なユーザークエリ・エッジケース・想定される失敗パターンを網羅した<strong>評価用データセット</strong>（evalset）を作成します。ADKのevalsetには、ユーザー入力・期待される最終応答・期待されるツール呼び出し軌跡（trajectory）などを含めることができます<a className="footnote-ref" href="#ref46" id="fnref57" role="doc-noteref"><sup>46</sup></a>。
                </p>
<h4>評価フレームワークの選定</h4>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">フレームワーク／手法</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">主な用途</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td>ADK Evaluation（evalset）</td>
                                    <td>
                                    ADK組み込みの評価機能。応答の一致度とツール呼び出し軌跡の一致度を採点
                                </td>
                                    <td>開発中のユニットテスト的な評価</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>Gen AI Evaluation Service（Vertex AI）</td>
                                    <td>
                                    LLM-as-a-judge方式によるモデル非依存の評価サービス。定性的な品質基準を定義できる
                                </td>
                                    <td>応答品質・安全性・関連性などの評価</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>カスタムオートレーター（Autoraters）</td>
                                    <td>組織固有の評価基準に合わせて作成する、LLMベースの自動採点者</td>
                                    <td>ドメイン固有の合否判定が必要な場合</td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>
<p>
                    出典：Agent Evaluation概要<a className="footnote-ref" href="#ref44" id="fnref58" role="doc-noteref"><sup>44</sup></a><a className="footnote-ref" href="#ref45" id="fnref59" role="doc-noteref"><sup>45</sup></a>、ADK評価ガイド<a className="footnote-ref" href="#ref46" id="fnref60" role="doc-noteref"><sup>46</sup></a>
                        </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag14} ariaLabel="エージェント評価パイプラインフロー" theme="light" preserveNaturalScale={true} />
                    </div>

<h4>継続的評価パイプラインの構築</h4>
<p>
                    本番投入後も評価を一度きりで終わらせず、CI/CDパイプラインに組み込んで継続的に実行します。新しいプロンプトバージョンやモデルバージョンをリリースするたびにevalsetを自動実行し、リグレッション（性能劣化）を検出する仕組みが望まれます<a className="footnote-ref" href="#ref47" id="fnref61" role="doc-noteref"><sup>47</sup></a>。
                </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                evalsetは実際の本番ログから継続的に「難しかったケース」「失敗したケース」を追加し、リリースを重ねるごとに評価網羅性を高めていく。
                            </li>
                                {" "}
                                <li>
                                LLM-as-judge方式を使う場合、判定に使うモデルと評価対象のモデルを分ける（同一モデルによる自己評価バイアスを避ける）。
                            </li>
                                {" "}
                                <li>
                                ツール呼び出し軌跡の評価は、最終応答の正しさだけでなく「正しい手順で」正しい結果に到達したかを確認するために重要。誤った手順でも偶然正しい結果に至るケースを見逃さない。
                            </li>
                                {" "}
                                <li>
                                安全性・有害性に関する評価基準は、機能面の評価基準とは別の評価軸として独立に管理し、両方が閾値を満たすことをリリースゲートの条件にする。
                            </li>
                            </ul>
                        </div>
                    </div>

<h3 id="42-本番ワークロードのデプロイとスケーリング">
                    4.2 本番ワークロードのデプロイとスケーリング
                </h3>
<h4>デプロイランタイムの選定</h4>
<p>
                    ADKで構築したエージェントは、複数のランタイムにデプロイできます。試験範囲では<strong>Agent Runtime</strong>（旧Agent Engine）、<strong>Cloud Run</strong>、<strong>GKE</strong>の3つが比較対象です。
                </p>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">ランタイム</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">適するケース</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td>Agent Runtime</td>
                                    <td>
                                    Vertex
                                    AI上のフルマネージドランタイム。自動スケーリング、セッション／メモリの組み込み管理、組み込みの可観測性を提供<a className="footnote-ref" href="#ref16" id="fnref62" role="doc-noteref"><sup>16</sup></a><a className="footnote-ref" href="#ref18" id="fnref63" role="doc-noteref"><sup>18</sup></a><a className="footnote-ref" href="#ref52" id="fnref64" role="doc-noteref"><sup>52</sup></a>
                                        </td>
                                    <td>
                                    迅速なデプロイと運用負荷の最小化を優先する場合。ADKとの統合が最も深い
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>Cloud Run</td>
                                    <td>
                                    サーバーレスコンテナ実行環境。A2A準拠エージェントのホスティングに対応<a className="footnote-ref" href="#ref39" id="fnref65" role="doc-noteref"><sup>39</sup></a>
                                        </td>
                                    <td>
                                    既存のCloud
                                    Runベースのマイクロサービス構成に組み込みたい場合、より柔軟なコンテナ制御が必要な場合
                                </td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>GKE</td>
                                    <td>Kubernetesベースのコンテナオーケストレーション</td>
                                    <td>
                                    複雑なネットワークポリシーやマルチテナント分離など、高度なインフラ制御が必要な場合
                                </td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag15} ariaLabel="デプロイランタイム選定デシジョンツリー" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    出典：Agent Runtime概要<a className="footnote-ref" href="#ref16" id="fnref66" role="doc-noteref"><sup>16</sup></a><a className="footnote-ref" href="#ref18" id="fnref67" role="doc-noteref"><sup>18</sup></a>、Cloud Run上のA2Aエージェント<a className="footnote-ref" href="#ref39" id="fnref68" role="doc-noteref"><sup>39</sup></a>
                        </p>
<h4>トラブルシューティング</h4>
<p>
                    本番運用中のエージェントで発生しやすい典型的な問題として、次の4つが試験範囲に挙げられています。
                </p>
<ul>

                        <li>
                            <strong>エージェントドリフト（Agent drift）</strong>：時間経過とともに、エージェントの応答傾向が意図した振る舞いから徐々にずれていく現象。
                    </li>
                        <li>
                            <strong>ツール呼び出しのレイテンシ</strong>：外部ツール・APIの応答遅延がエージェント全体の応答時間を悪化させる問題。
                    </li>
                        <li>
                            <strong>推論ループ（Reasoning loops）</strong>：エージェントが同じ思考・ツール呼び出しを堂々巡りして終了条件に到達しない問題。
                    </li>
                        <li>
                            <strong>システム障害</strong>：依存サービスの障害、レート制限超過、認証エラーなど。
                    </li>
                        
                    </ul>
<p>
                    これらは<strong>Cloud Logging</strong>と<strong>Cloud Trace</strong>を中核とする<strong>Agent Observability</strong>機能で検知・診断します。エージェントのステップ・ツール呼び出し・LLM呼び出しをトレースとして可視化し、どのステップでレイテンシや異常なループが発生しているかを特定できます<a className="footnote-ref" href="#ref48" id="fnref69" role="doc-noteref"><sup>48</sup></a>。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag16} ariaLabel="可観測性とテレメトリアーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>

<h4>パフォーマンス・信頼性・コストの監視と最適化</h4>
<p>デプロイ後は、次の3軸を継続的にモニタリングします。</p>
<ul>

                        <li>
                            <strong>パフォーマンス</strong>：応答レイテンシ、スループット（同時実行数）。
                    </li>
                        <li><strong>信頼性</strong>：エラー率、タイムアウト率、再試行成功率。</li>
                        <li>
                            <strong>コスト</strong>：トークン消費量、モデル呼び出し回数、インフラのスケーリングに伴う課金。
                    </li>
                        
                    </ul>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                Agent
                                Runtimeを使う場合でも、可観測性を「後付け」にせず、開発初期の段階からCloud
                                Trace用の計装（instrumentation）をADKエージェントに組み込んでおく。
                            </li>
                                {" "}
                                <li>
                                推論ループ対策として、ツール呼び出しやエージェントのステップ数に上限（max
                                iteration）を設け、上限到達時は人間へのエスカレーションにフォールバックする設計を標準にする。
                            </li>
                                {" "}
                                <li>
                                コスト最適化は、モデルの階層化（複雑なステップだけLLM、それ以外はSLM）、キャッシュ可能なレスポンスの再利用、不要なメモリ取得の抑制の3点をまず検討する。
                            </li>
                                {" "}
                                <li>
                                デプロイ先の選定（Agent Runtime／Cloud
                                Run／GKE）は一度決めたら固定ではなく、運用実績（コスト・レイテンシ・チームの運用スキル）に応じて見直す前提でアーキテクチャを設計する。
                            </li>
                            </ul>
                        </div>
                    </div>

<hr />
<h2 id="セクション5-エージェントワークフローのセキュリティとガバナンス配点-約15">
                    セクション5: エージェントワークフローのセキュリティとガバナンス（配点 約15%）
                </h2>
<h3 id="51-エージェントのセキュリティとガバナンスの設定">
                    5.1 エージェントのセキュリティとガバナンスの設定
                </h3>
<h4>認証とセキュアなツール実行</h4>
<p>
                    エージェントがツールやAPIを呼び出す際の認証方式として、<strong>OAuth 2.0</strong>と<strong>Auth Manager</strong>が試験範囲に含まれます。
                </p>
<ul>

                        <li>
                            <strong>OAuth 2.0（2LO / 3LO）</strong>：エージェントがユーザーの代わりに動作する場合は3-legged
                        OAuth（3LO、ユーザー同意が必要）、エージェント自身がシステムとして動作する場合は2-legged
                        OAuth（2LO、ユーザー同意なしのサービス間認証）を使い分けます<a className="footnote-ref" href="#ref33" id="fnref70" role="doc-noteref"><sup>33</sup></a>。
                    </li>
                        <li>
                            <strong>Auth Manager</strong>：エージェントとツール間の認証設定を一元管理する仕組みです。ツールごとに個別の認証コードを書く代わりに、宣言的な認証設定（AuthConfig）をAgent
                        Registry上のツールセットにバインドできます<a className="footnote-ref" href="#ref32" id="fnref71" role="doc-noteref"><sup>32</sup></a><a className="footnote-ref" href="#ref34" id="fnref72" role="doc-noteref"><sup>34</sup></a>。
                    </li>
                        
                    </ul>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag17} ariaLabel="OAuth 2.0 と Auth Manager の認証シーケンス" theme="light" preserveNaturalScale={true} />
                    </div>

<h4>PAB（Principal Access Boundary）ポリシーの設定</h4>
<p>
                        <strong>Agent Identity</strong>は、各エージェントに一意のIDを付与し、そのエージェントが「何にアクセスできるか」を制限する仕組みです。中核となるのが<strong>Principal Access Boundary（PAB）ポリシー</strong>で、特定のプリンシパル（エージェントのID）がアクセスできるGoogle
                    Cloudリソースの境界を明示的に定義します<a className="footnote-ref" href="#ref21" id="fnref73" role="doc-noteref"><sup>21</sup></a><a className="footnote-ref" href="#ref22" id="fnref74" role="doc-noteref"><sup>22</sup></a><a className="footnote-ref" href="#ref23" id="fnref75" role="doc-noteref"><sup>23</sup></a><a className="footnote-ref" href="#ref24" id="fnref76" role="doc-noteref"><sup>24</sup></a>。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag18} ariaLabel="Agent Identity と PAB ポリシー境界アーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    PABはIAMの通常のロールベースアクセス制御を置き換えるものではなく、<strong>追加の境界線</strong>として重ねて適用するものです。IAMで許可されていても、PABの境界外であればアクセスは拒否されます<a className="footnote-ref" href="#ref23" id="fnref77" role="doc-noteref"><sup>23</sup></a><a className="footnote-ref" href="#ref24" id="fnref78" role="doc-noteref"><sup>24</sup></a>。
                </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                エージェントには専用のAgent
                                Identityを発行し、人間の開発者アカウントやプロジェクト共通のサービスアカウントを流用しない。監査ログでの追跡性が大きく向上する。
                            </li>
                                {" "}
                                <li>
                                PABポリシーは「デフォルト拒否・明示的許可」の原則で設計し、エージェントが実際に必要とするリソース・操作のみを列挙する。
                            </li>
                                {" "}
                                <li>
                                自律性の高いエージェント（人間の承認なしに広範な操作を行うエージェント）ほど、PABの境界を狭く設定し、影響範囲を最小化する。
                            </li>
                            </ul>
                        </div>
                    </div>

<h4>Agent Gatewayによるトラフィックの監視・追跡</h4>
<p>
                        <strong>Agent Gateway</strong>は、エージェントとツール・LLM・他のエージェント間のすべてのトラフィックを通過させるプロキシ層であり、可視性とガバナンスを提供します<a className="footnote-ref" href="#ref25" id="fnref79" role="doc-noteref"><sup>25</sup></a><a className="footnote-ref" href="#ref26" id="fnref80" role="doc-noteref"><sup>26</sup></a><a className="footnote-ref" href="#ref27" id="fnref81" role="doc-noteref"><sup>27</sup></a>。すべての呼び出しを一元的なチェックポイントに通すことで、組織はエージェントの挙動を監視し、ポリシーを適用できます<a className="footnote-ref" href="#ref28" id="fnref82" role="doc-noteref"><sup>28</sup></a>。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag19} ariaLabel="Agent Gateway によるトラフィック制御と可視化" theme="light" preserveNaturalScale={true} />
                    </div>

<h4>エージェントガバナンスとポリシー適用</h4>
<p>
                        <strong>Agent Registry</strong>と<strong>Model Armor</strong>は、ガバナンスの2つの側面を担います。Agent
                    Registryは「どのエージェントが存在し、何ができるか」を一元管理するカタログとしての役割を、Model
                    Armorは「入出力の内容が安全か」を検査するスクリーニング層としての役割を担います。
                </p>
<h3 id="52-セキュアなエージェントの動作と実行の実装">
                    5.2 セキュアなエージェントの動作と実行の実装
                </h3>
<h4>安全フレームワークとガードレール</h4>
<p>
                        <strong>Model Armor</strong>は、LLMベースのアプリケーションに対する入出力の両方をスクリーニングする、モデル非依存のセキュリティサービスです。プロンプトインジェクション・ジェイルブレイク攻撃の検知、機密データ（PIIなど）の漏えい防止、有害コンテンツのフィルタリング、悪意あるURLの検知を行います<a className="footnote-ref" href="#ref29" id="fnref83" role="doc-noteref"><sup>29</sup></a><a className="footnote-ref" href="#ref30" id="fnref84" role="doc-noteref"><sup>30</sup></a>。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag20} ariaLabel="Model Armor による入出力スクリーニングフロー" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                    これに加えて、<strong>Human-in-the-loop</strong>（HITL）による承認ステップを、影響度の高い操作（決済実行、本番デプロイ、顧客への一斉通知など）の直前に組み込むことで、自律実行のリスクを緩和します。
                </p>
<h4>セキュアなデータアクセスとアイデンティティの伝播</h4>
<p>
                    エージェントがユーザーに代わってデータへアクセスする際、<strong>誰の権限で</strong>アクセスしているのかを正しく伝播させることが重要です。ただしユーザーの認可コンテキストは自動的に伝播するものではありません。Agent
                    Gateway と Agent Identity を用いる場合も、<strong>委任資格情報（3-legged OAuth
                        のユーザートークン等）を呼び出しチェーンに沿って明示的に伝播させ、各下流サービス側でその資格情報を検証する</strong>設計が必要です。これによって初めて、途中のエージェントが権限昇格（本来の呼び出し元より広い権限を持ってしまうこと）を起こさない構成になります。
                </p>
<p>
                    一方、2-legged OAuth
                    やサービスアカウントを用いる場合、下流サービスから見た主体は<strong>エンドユーザーではなくエージェント自身</strong>です。この場合はエージェント主体の権限として扱い、サービスアカウントに与える権限範囲を最小化したうえで、「そのユーザーがそのデータにアクセスしてよいか」というユーザー認可はアプリケーション側で別途管理する必要があります。
                </p>

                    <div className="mermaid-wrapper">
                        <MermaidDiagram chart={DIAGRAMS.diag21} ariaLabel="多層防御（Defense in Depth）セキュリティアーキテクチャ" theme="light" preserveNaturalScale={true} />
                    </div>

<p>
                        <strong>Sensitive Data Protection</strong>（旧Cloud
                    DLP）は、氏名・クレジットカード番号・マイナンバーなどの機密データパターンを検出し、マスキングやトークン化によって匿名化するサービスです<a className="footnote-ref" href="#ref35" id="fnref85" role="doc-noteref"><sup>35</sup></a>。RAGパイプラインの取り込み時やエージェントのログ出力時に組み込むことで、機密データが意図せずLLMのコンテキストやログに残留するリスクを下げられます。
                </p>

                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        {" "}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            {" "}
                            <ul>
                                <li>
                                Model
                                Armorのポリシーは、入力用と出力用で別々に設計する。入力側は主にプロンプトインジェクション対策、出力側は主に機密情報漏えい・有害コンテンツ対策に重点を置く。
                            </li>
                                {" "}
                                <li>
                                Agent
                                Gatewayを「あとから追加するもの」ではなく、最初のアーキテクチャ設計段階からすべてのエージェント間通信・ツール呼び出しの必須経由点として組み込む。
                            </li>
                                {" "}
                                <li>
                                Sensitive Data
                                Protectionによる匿名化は、RAGのインデックス構築時（データ保存前）とエージェントの出力時（ユーザーへの応答前）の両方に配置し、単一障害点にしない。
                            </li>
                                {" "}
                                <li>
                                多層防御（Defense in Depth）の考え方で、Auth Manager・Agent
                                Identity/PAB・Agent Gateway・Model Armor・Sensitive Data
                                Protectionを重ねて適用し、いずれか1層が突破されても被害が限定されるように設計する。
                            </li>
                            </ul>
                        </div>
                    </div>

<hr />
<h2 id="試験対象ツール一覧">試験対象ツール一覧</h2>
<p>
                    公式Exam Guideに列挙されている、出題対象となるツール・サービスの一覧です<a className="footnote-ref" href="#ref2" id="fnref86" role="doc-noteref"><sup>2</sup></a>。学習の進捗確認にご利用ください。
                </p>
<div className="table-scroll">

                        <table>

                            <thead>

                                <tr className="header">

                                    <th scope="col">カテゴリ</th>
                                    <th scope="col">ツール・サービス</th>
                                    
                                </tr>
                                
                            </thead>
                            <tbody>

                                <tr className="odd">

                                    <td>ローコード構築</td>
                                    <td>
                                    Workflow Builder（旧 Agent Designer）、CX Agent Studio、Agent
                                    Search（Gemini Enterprise データコネクタ）
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>コーディングエージェント</td>
                                    <td>Antigravity、Claude Code on Google Cloud、Agents CLI</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>セキュアサンドボックス</td>
                                    <td>GKE、Cloud Workstations</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>カスタム開発フレームワーク</td>
                                    <td>Agent Development Kit（ADK）、Model Garden</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>データ・検索基盤</td>
                                    <td>
                                    RAG Engine、Vector Search 1.0、Agent Retrieval（旧Vector Search
                                    2.0）、Sensitive Data Protection
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>状態・記憶管理</td>
                                    <td>Agent Platform Sessions、Agent Platform Memory Bank</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>オーケストレーション・プロトコル</td>
                                    <td>
                                    Model Context Protocol（MCP）、Agent2Agent（A2A）、Google Cloud
                                    MCPサーバー
                                </td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>発見・カタログ</td>
                                    <td>Agent Registry</td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>デプロイランタイム</td>
                                    <td>Agent Runtime（旧Agent Engine）、Cloud Run、GKE</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>評価</td>
                                    <td>
                                    ADK Evaluation、Gen AI Evaluation
                                    Service、カスタムオートレーター
                                </td>
                                    
                                </tr>
                                <tr className="odd">

                                    <td>可観測性</td>
                                    <td>Cloud Logging、Cloud Trace（Agent Observability）</td>
                                    
                                </tr>
                                <tr className="even">

                                    <td>セキュリティ・ガバナンス</td>
                                    <td>
                                    Agent Identity（PAB）、Auth Manager、Agent Gateway、Model Armor
                                </td>
                                    
                                </tr>
                                
                            </tbody>
                            
                        </table>
                        
                    </div>
<hr />
<h2 id="学習チェックリスト">学習チェックリスト</h2>

                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="title">学習チェックリスト</span><span className="count">{checkedCount} / 22 完了</span>
                        </div>
                        <ul>
                            <li>
                                <input id="chk1" type="checkbox" checked={!!checkedItems["chk1"]} onChange={() => toggleCheck("chk1")} /><label htmlFor="chk1">CX Agent Studio（およびDialogflow
                                CX）の状態ベースワークフロー（ページ／遷移ルート／イベントハンドラ）の設定方法を説明できる</label>
                            </li>
                            <li>
                                <input id="chk2" type="checkbox" checked={!!checkedItems["chk2"]} onChange={() => toggleCheck("chk2")} /><label htmlFor="chk2">Workflow Builder（旧 Agent
                                Designer）のフローキャンバスが業務手順を可視化するタスク指向のFlow機能であり、CX
                                Agent
                                Studioの状態ベースワークフローとは別概念であることを説明できる</label>
                            </li>
                            <li>
                                <input id="chk3" type="checkbox" checked={!!checkedItems["chk3"]} onChange={() => toggleCheck("chk3")} /><label htmlFor="chk3">Gemini
                                Enterpriseへのエンタープライズデータ接続と、非構造化マルチモーダルデータの取り込みの考慮点を説明できる</label>
                            </li>
                            <li>
                                <input id="chk4" type="checkbox" checked={!!checkedItems["chk4"]} onChange={() => toggleCheck("chk4")} /><label htmlFor="chk4">MCPサーバー・カスタムスキル・セキュアサンドボックス（GKE／Cloud
                                Workstations）を使ったコーディングエージェントの構成を説明できる</label>
                            </li>
                            <li>
                                <input id="chk5" type="checkbox" checked={!!checkedItems["chk5"]} onChange={() => toggleCheck("chk5")} /><label htmlFor="chk5">Antigravityにおけるスキル・プラグイン・拡張フック・ルール・サブエージェントの役割を説明できる</label>
                            </li>
                            <li>
                                <input id="chk6" type="checkbox" checked={!!checkedItems["chk6"]} onChange={() => toggleCheck("chk6")} /><label htmlFor="chk6">Agents
                                CLIが提供する主要スキル（workflow／scaffold／adk-code／eval／deploy／publish）を挙げられる</label>
                            </li>
                            <li>
                                <input id="chk7" type="checkbox" checked={!!checkedItems["chk7"]} onChange={() => toggleCheck("chk7")} /><label htmlFor="chk7">LLM/SLM、自己ホスト/SaaS、OSS/プロプライエタリの選定基準を説明できる</label>
                            </li>
                            <li>
                                <input id="chk8" type="checkbox" checked={!!checkedItems["chk8"]} onChange={() => toggleCheck("chk8")} /><label htmlFor="chk8">ADKを使ったエージェント構築の段階的な拡張パス(初期開発→高度なオーケストレーション→最適化→エンタープライズデプロイ)を説明できる</label>
                            </li>
                            <li>
                                <input id="chk9" type="checkbox" checked={!!checkedItems["chk9"]} onChange={() => toggleCheck("chk9")} /><label htmlFor="chk9">Agent Platform SessionsとMemory Bankの役割の違いを説明できる</label>
                            </li>
                            <li>
                                <input id="chk10" type="checkbox" checked={!!checkedItems["chk10"]} onChange={() => toggleCheck("chk10")} /><label htmlFor="chk10">RAGパイプライン（埋め込み→類似度検索→リランキング）の各ステップを説明できる</label>
                            </li>
                            <li>
                                <input id="chk11" type="checkbox" checked={!!checkedItems["chk11"]} onChange={() => toggleCheck("chk11")} /><label htmlFor="chk11">Vector Search 1.0とAgent Retrieval（旧Vector Search
                                2.0）の違いを説明できる</label>
                            </li>
                            <li>
                                <input id="chk12" type="checkbox" checked={!!checkedItems["chk12"]} onChange={() => toggleCheck("chk12")} /><label htmlFor="chk12">Agent RegistryとGoogle Cloud
                                MCPサーバーによる機能拡張の仕組みを説明できる</label>
                            </li>
                            <li>
                                <input id="chk13" type="checkbox" checked={!!checkedItems["chk13"]} onChange={() => toggleCheck("chk13")} /><label htmlFor="chk13">MCPとA2Aの役割分担（ツール接続 vs
                                エージェント間連携）を説明できる</label>
                            </li>
                            <li>
                                <input id="chk14" type="checkbox" checked={!!checkedItems["chk14"]} onChange={() => toggleCheck("chk14")} /><label htmlFor="chk14">ADKのSequential／Parallel／Loop／Graphワークフローパターンの使い分けを説明できる</label>
                            </li>
                            <li>
                                <input id="chk15" type="checkbox" checked={!!checkedItems["chk15"]} onChange={() => toggleCheck("chk15")} /><label htmlFor="chk15">evalsetの設計、ADK EvaluationとGen AI Evaluation
                                Serviceの違い、継続的評価パイプラインを説明できる</label>
                            </li>
                            <li>
                                <input id="chk16" type="checkbox" checked={!!checkedItems["chk16"]} onChange={() => toggleCheck("chk16")} /><label htmlFor="chk16">Agent Runtime／Cloud Run／GKEのデプロイ選定基準を説明できる</label>
                            </li>
                            <li>
                                <input id="chk17" type="checkbox" checked={!!checkedItems["chk17"]} onChange={() => toggleCheck("chk17")} /><label htmlFor="chk17">エージェントドリフト・ツール呼び出しレイテンシ・推論ループのトラブルシューティング手法を説明できる</label>
                            </li>
                            <li>
                                <input id="chk18" type="checkbox" checked={!!checkedItems["chk18"]} onChange={() => toggleCheck("chk18")} /><label htmlFor="chk18">OAuth 2.0（2LO/3LO）とAuth
                                Managerによるツール認証の仕組みを説明できる</label>
                            </li>
                            <li>
                                <input id="chk19" type="checkbox" checked={!!checkedItems["chk19"]} onChange={() => toggleCheck("chk19")} /><label htmlFor="chk19">Agent IdentityとPAB（Principal Access
                                Boundary）ポリシーの役割を説明できる</label>
                            </li>
                            <li>
                                <input id="chk20" type="checkbox" checked={!!checkedItems["chk20"]} onChange={() => toggleCheck("chk20")} /><label htmlFor="chk20">Agent
                                Gatewayによるトラフィック監視・ガバナンスの仕組みを説明できる</label>
                            </li>
                            <li>
                                <input id="chk21" type="checkbox" checked={!!checkedItems["chk21"]} onChange={() => toggleCheck("chk21")} /><label htmlFor="chk21">Model ArmorとSensitive Data
                                Protectionによる入出力スクリーニング・機密データ保護の仕組みを説明できる</label>
                            </li>
                            <li>
                                <input id="chk22" type="checkbox" checked={!!checkedItems["chk22"]} onChange={() => toggleCheck("chk22")} /><label htmlFor="chk22">多層防御（Auth Manager→Agent Identity/PAB→Agent Gateway→Model
                                Armor→Sensitive Data Protection）の全体像を説明できる</label>
                            </li>
                        </ul>
                    </div>

<hr />
<h2 id="参考文献">参考文献</h2>
<div className="ref-grid" id="referenceGrid">

                        <div className="ref-card" id="ref1">

                            <div className="num">1</div>
                            <div className="txt">
                            Google Cloud Certified – Professional Agentic
                            Architect（公式認定ページ）
                            <a href="https://cloud.google.com/learn/certification/agentic-architect">https://cloud.google.com/learn/certification/agentic-architect</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref2">

                            <div className="num">2</div>
                            <div className="txt">
                            Professional Agentic Architect Exam Guide（公式PDF）
                            <a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf">https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref4">

                            <div className="num">4</div>
                            <div className="txt">
                            Agent Designerで低コードエージェントを設計する
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents">https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref5">

                            <div className="num">5</div>
                            <div className="txt">
                            CX Agent Studio概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio">https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref6">

                            <div className="num">6</div>
                            <div className="txt">
                            Gemini Enterprise Agent Platform概要（Build/Scale/Govern/Optimize）
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview">https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref7">

                            <div className="num">7</div>
                            <div className="txt">
                            The new Gemini Enterprise: one platform for agent development（Google
                            Cloud Blog）
                            <a href="https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development">https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref8">

                            <div className="num">8</div>
                            <div className="txt">
                            Agent Development Kit（ADK）概要
                            <a href="https://cloud.google.com/agent-builder/agent-development-kit/overview">https://cloud.google.com/agent-builder/agent-development-kit/overview</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref9">

                            <div className="num">9</div>
                            <div className="txt">
                            Agent Platform上でのADK利用ガイド
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk">https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref10">

                            <div className="num">10</div>
                            <div className="txt">
                            Agents CLIとADKによるクイックスタート
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/quickstart-adk">https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/quickstart-adk</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref11">

                            <div className="num">11</div>
                            <div className="txt">
                            Build with Google Antigravity: our new agentic development
                            platform（Google Developers Blog）
                            <a href="https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/">https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref13">

                            <div className="num">13</div>
                            <div className="txt">
                            Google Antigravity（IDE/CLI/SDK）に関する解説記事
                            <a href="https://thenextweb.com/news/google-antigravity-2-desktop-cli-sdk-io-2026">https://thenextweb.com/news/google-antigravity-2-desktop-cli-sdk-io-2026</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref14">

                            <div className="num">14</div>
                            <div className="txt">
                            Agents CLI 公式リポジトリ（GitHub）
                            <a href="https://github.com/google/agents-cli">https://github.com/google/agents-cli</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref15">

                            <div className="num">15</div>
                            <div className="txt">
                            Agent Plugins: package your skills, tools, and more（Google Developers
                            Blog）
                            <a href="https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/">https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref16">

                            <div className="num">16</div>
                            <div className="txt">
                            Agent Runtime概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime">https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref18">

                            <div className="num">18</div>
                            <div className="txt">
                            Agent Platform リリースノート
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes">https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref19">

                            <div className="num">19</div>
                            <div className="txt">
                            Agent Registryへのエージェント登録
                            <a href="https://docs.cloud.google.com/agent-registry/register-agents">https://docs.cloud.google.com/agent-registry/register-agents</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref20">

                            <div className="num">20</div>
                            <div className="txt">
                            Agent Registryの自動登録
                            <a href="https://docs.cloud.google.com/agent-registry/automatic-registration">https://docs.cloud.google.com/agent-registry/automatic-registration</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref21">

                            <div className="num">21</div>
                            <div className="txt">
                            Agent Identity概要（IAMドキュメント）
                            <a href="https://docs.cloud.google.com/iam/docs/agent-identity-overview">https://docs.cloud.google.com/iam/docs/agent-identity-overview</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref22">

                            <div className="num">22</div>
                            <div className="txt">
                            Agent RuntimeにおけるAgent Identityの利用
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity">https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/agent-identity</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref23">

                            <div className="num">23</div>
                            <div className="txt">
                            What&apos;s new in IAM security, governance, and runtime defense（Google
                            Cloud Blog）
                            <a href="https://cloud.google.com/blog/products/identity-security/whats-new-in-iam-security-governance-and-runtime-defense">https://cloud.google.com/blog/products/identity-security/whats-new-in-iam-security-governance-and-runtime-defense</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref24">

                            <div className="num">24</div>
                            <div className="txt">
                            PAB（Principal Access Boundary）ポリシーの作成
                            <a href="https://cloud.google.com/iam/docs/principal-access-boundary-policies-create">https://cloud.google.com/iam/docs/principal-access-boundary-policies-create</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref25">

                            <div className="num">25</div>
                            <div className="txt">
                            Agent Gateway概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref26">

                            <div className="num">26</div>
                            <div className="txt">
                            Agent Gatewayの監視
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/monitor-agent-gateway</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref27">

                            <div className="num">27</div>
                            <div className="txt">
                            Agent Gatewayのセットアップ
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref28">

                            <div className="num">28</div>
                            <div className="txt">
                            Agent Gateway Codelab
                            <a href="https://codelabs.developers.google.com/cloudnet-agent-gateway">https://codelabs.developers.google.com/cloudnet-agent-gateway</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref29">

                            <div className="num">29</div>
                            <div className="txt">
                            Model Armor（製品ページ）
                            <a href="https://cloud.google.com/security/products/model-armor">https://cloud.google.com/security/products/model-armor</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref30">

                            <div className="num">30</div>
                            <div className="txt">
                            Model Armor Codelab（Secure Agent）
                            <a href="https://codelabs.developers.google.com/secure-agent-modelarmor">https://codelabs.developers.google.com/secure-agent-modelarmor</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref32">

                            <div className="num">32</div>
                            <div className="txt">
                            Auth Manager概要
                            <a href="https://docs.cloud.google.com/iam/docs/auth-manager-overview">https://docs.cloud.google.com/iam/docs/auth-manager-overview</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref33">

                            <div className="num">33</div>
                            <div className="txt">
                            2-legged OAuth（2LO）による認証
                            <a href="https://docs.cloud.google.com/iam/docs/auth-with-2lo">https://docs.cloud.google.com/iam/docs/auth-with-2lo</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref34">

                            <div className="num">34</div>
                            <div className="txt">
                            ツールセットの認証設定（Agent Registry）
                            <a href="https://docs.cloud.google.com/agent-registry/authenticate-toolsets">https://docs.cloud.google.com/agent-registry/authenticate-toolsets</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref35">

                            <div className="num">35</div>
                            <div className="txt">
                            Sensitive Data Protection概要
                            <a href="https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview">https://docs.cloud.google.com/sensitive-data-protection/docs/sensitive-data-protection-overview</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref36">

                            <div className="num">36</div>
                            <div className="txt">
                            Agent Retrieval（旧Vector Search 2.0）概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview">https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref37">

                            <div className="num">37</div>
                            <div className="txt">
                            RAG Engineのバックエンド比較（Vector Search利用）
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-rag-managed-vertex-ai-vector-search">https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/use-rag-managed-vertex-ai-vector-search</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref39">

                            <div className="num">39</div>
                            <div className="txt">
                            Cloud Run上でのA2A準拠エージェントのホスティング
                            <a href="https://docs.cloud.google.com/run/docs/ai/a2a-agents">https://docs.cloud.google.com/run/docs/ai/a2a-agents</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref40">

                            <div className="num">40</div>
                            <div className="txt">
                            A2A（Agent2Agent）プロトコル 公式リポジトリ
                            <a href="https://github.com/a2aproject/A2A">https://github.com/a2aproject/A2A</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref41">

                            <div className="num">41</div>
                            <div className="txt">
                            A2A: a new era of agent interoperability（Google Developers Blog）
                            <a href="https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/">https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref42">

                            <div className="num">42</div>
                            <div className="txt">
                            A developer&apos;s guide to multi-agent patterns in ADK（Google Developers
                            Blog）
                            <a href="https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/">https://developers.googleblog.com/developers-guide-to-multi-agent-patterns-in-adk/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref43">

                            <div className="num">43</div>
                            <div className="txt">
                            ADK Graph Workflows ドキュメント
                            <a href="https://github.com/google/adk-docs/blob/main/docs/graphs/index.md">https://github.com/google/adk-docs/blob/main/docs/graphs/index.md</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref44">

                            <div className="num">44</div>
                            <div className="txt">
                            Agent Evaluation概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation">https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref45">

                            <div className="num">45</div>
                            <div className="txt">
                            エージェントの評価（SDK利用）
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents">https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref46">

                            <div className="num">46</div>
                            <div className="txt">
                            ADK Evaluationガイド
                            <a href="https://adk.dev/evaluate/">https://adk.dev/evaluate/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref47">

                            <div className="num">47</div>
                            <div className="txt">
                            A methodical approach to agent evaluation（Google Cloud Blog）
                            <a href="https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation">https://cloud.google.com/blog/topics/developers-practitioners/a-methodical-approach-to-agent-evaluation</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref48">

                            <div className="num">48</div>
                            <div className="txt">
                            Agent Observability（Cloud Logging / Cloud Trace）
                            <a href="https://docs.cloud.google.com/stackdriver/docs/observability/agent-observability">https://docs.cloud.google.com/stackdriver/docs/observability/agent-observability</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref50">

                            <div className="num">50</div>
                            <div className="txt">
                            AGENTS.mdルールファイルに関する解説（G-gen等）
                            <a href="https://blog.g-gen.co.jp/entry/vertex-ai-agent-engine-explained">https://blog.g-gen.co.jp/entry/vertex-ai-agent-engine-explained</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref52">

                            <div className="num">52</div>
                            <div className="txt">
                            ADK Agent Engineへのデプロイガイド
                            <a href="https://google.github.io/adk-docs/deploy/agent-engine">https://google.github.io/adk-docs/deploy/agent-engine</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref121">

                            <div className="num">121</div>
                            <div className="txt">
                            Agent Platform Memory Bank概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank">https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref123">

                            <div className="num">123</div>
                            <div className="txt">
                            Agent Platform Sessions概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions">https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref125">

                            <div className="num">125</div>
                            <div className="txt">
                            ADKにおけるSessionとMemoryの扱い（公式ドキュメント）
                            <a href="https://google.github.io/adk-docs/sessions/">https://google.github.io/adk-docs/sessions/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref140">

                            <div className="num">140</div>
                            <div className="txt">
                            Agent Ops Stack解説記事
                            <a href="https://dev.to/gde/google-clouds-agent-ops-stack-why-deployment-is-no-longer-the-hard-part-g3k">https://dev.to/gde/google-clouds-agent-ops-stack-why-deployment-is-no-longer-the-hard-part-g3k</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref55">

                            <div className="num">55</div>
                            <div className="txt">
                            AntigravityにおけるMCPサーバー設定
                            <a href="https://codelabs.developers.google.com/getting-started-google-antigravity">https://codelabs.developers.google.com/getting-started-google-antigravity</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref57">

                            <div className="num">57</div>
                            <div className="txt">
                            Antigravity Artifacts機能に関する解説
                            <a href="https://codelabs.developers.google.com/getting-started-google-antigravity">https://codelabs.developers.google.com/getting-started-google-antigravity</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref60">

                            <div className="num">60</div>
                            <div className="txt">
                            Agents CLIスキル一覧（GitHub README）
                            <a href="https://github.com/google/agents-cli">https://github.com/google/agents-cli</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref67">

                            <div className="num">67</div>
                            <div className="txt">
                            Agent Plugins仕様の詳細解説
                            <a href="https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/">https://developers.googleblog.com/agent-plugins-package-your-skills-tools-and-more/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref71">

                            <div className="num">71</div>
                            <div className="txt">
                            Model Context Protocol公式サイト
                            <a href="https://modelcontextprotocol.io/">https://modelcontextprotocol.io/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref72">

                            <div className="num">72</div>
                            <div className="txt">
                            A2A AgentCardの仕様
                            <a href="https://github.com/a2aproject/A2A">https://github.com/a2aproject/A2A</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref73">

                            <div className="num">73</div>
                            <div className="txt">
                            MCPとA2Aの役割分担に関する解説
                            <a href="https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/">https://developers.googleblog.com/en/a2a-a-new-era-of-agent-interoperability/</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref75">

                            <div className="num">75</div>
                            <div className="txt">
                            A2AプロトコルのLinux Foundationへの移管に関する発表
                            <a href="https://github.com/a2aproject/A2A">https://github.com/a2aproject/A2A</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref76">

                            <div className="num">76</div>
                            <div className="txt">
                            マルチエージェントシステムの複雑度に関するGoogle
                            Cloudアーキテクチャガイド
                            <a href="https://docs.cloud.google.com/architecture/multiagent-ai-system">https://docs.cloud.google.com/architecture/multiagent-ai-system</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref89">

                            <div className="num">89</div>
                            <div className="txt">
                            Agent Designerクイックスタート
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents">https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-studio/design-agents</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref90">

                            <div className="num">90</div>
                            <div className="txt">
                            Model Garden概要
                            <a href="https://cloud.google.com/model-garden">https://cloud.google.com/model-garden</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref92">

                            <div className="num">92</div>
                            <div className="txt">
                            CX Agent Studioのバージョン管理機能
                            <a href="https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio">https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref93">

                            <div className="num">93</div>
                            <div className="txt">
                            Gemini Enterprise Agent Designerに関するGoogle Cloud Blog
                            <a href="https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development">https://cloud.google.com/blog/products/ai-machine-learning/the-new-gemini-enterprise-one-platform-for-agent-development</a>
                                </div>
                            
                        </div>
                        <div className="ref-card" id="ref97">

                            <div className="num">97</div>
                            <div className="txt">
                            Agent Search（Gemini Enterpriseデータコネクタ）概要
                            <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview">https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview</a>
                                </div>
                            
                        </div>
                        
                    </div>
<p className="disclaimer">
                    本ガイドは2026年9月5日時点で公開されている公式情報をもとに作成しています。Professional
                    Agentic
                    Architectはベータ試験であり、試験範囲・ツール名称は今後変更される可能性があります。最新情報は必ず公式認定ページとExam
                    Guide PDFをご確認ください。
                </p>

                </main>
            </div>
        </div>
    );
}
