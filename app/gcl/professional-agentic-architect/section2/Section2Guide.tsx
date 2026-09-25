'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

interface DiagramProps {
    id: DiagramId;
    ariaLabel: string;
}

const Diagram = memo(function Diagram({ id, ariaLabel }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <MermaidDiagram
            chart={chart}
            ariaLabel={ariaLabel}
            preserveNaturalScale={true}
            theme="light"
        />
    );
});

export default function Section2Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const totalChecklist = 12;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    const handleCheckChange = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="agentic-section2-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <div className="hero">
                        <div className="kicker">Professional Agentic Architect · Section 2</div>
                        <h1>
                            Professional Agentic Architect 認定試験 セクション2:
                            コーディングエージェントを使用したアプリケーション開発（配点 約17%）
                        </h1>
                        <div className="meta-row">
                            <span className="pill">配点 <strong>約17%</strong></span>
                            <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                            <span className="pill">図解 <strong>Mermaid 7点</strong></span>
                            <span className="pill">参考文献 <strong>29件</strong></span>
                        </div>
                    </div>

                    <h2 id="はじめに">はじめに</h2>
                    <p>
                        本ガイドは、Google Cloud「Professional Agentic
                        Architect」（ベータ試験、2026年9月30日まで受験可能）<a
                            className="footnote-ref"
                            href="#ref1"
                            id="fnref1"
                            role="doc-noteref"
                        ><sup>1</sup></a>の出題範囲のうち、<strong>セクション2: コーディングエージェントを使用したアプリケーション開発</strong>（Using coding agents for application
                        development、配点約17%）を初学者向けに徹底解説するものです。内容の根拠は公式試験ガイドPDF<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref2"
                            role="doc-noteref"
                        ><sup>2</sup></a>および公式認定ページ<a
                            className="footnote-ref"
                            href="#ref1"
                            id="fnref3"
                            role="doc-noteref"
                        ><sup>1</sup></a>です。
                    </p>
                    <p>
                        試験全体は次の5セクションで構成されており、セクション2はセクション3（33%）・セクション4（22%）に次いで3番目に配点が高い領域です<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref4"
                            role="doc-noteref"
                        ><sup>2</sup></a>。
                    </p>

                    <Diagram
                        id="diag-1"
                        ariaLabel="試験の配点構成を示す円グラフ（全5セクション）"
                    />

                    <p>
                        セクション2は、公式試験ガイドによれば以下の2つの小項目（considerations）で構成されています<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref5"
                            role="doc-noteref"
                        ><sup>2</sup></a>。
                    </p>
                    <ul>
                        <li>
                            <strong>2.1 コーディングエージェントの効果的な活用</strong> —
                            MCPサーバー・カスタムスキル・ツールアクセスの設定、セキュアなサンドボックスでの利用、リファクタリング・実行ランタイム最適化・脆弱性パッチ適用
                        </li>
                        <li>
                            <strong>2.2 エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ</strong>
                            —
                            Antigravityでのスキル・プラグイン・拡張フック・ルール・サブエージェント作成、Agents
                            CLIによる拡張
                        </li>
                    </ul>
                    <p>
                        <strong>注記</strong>:
                        公式試験ガイドの「対象ツール一覧」には含まれていませんが、2.1の本文中では「Cloud
                        Workstations」がセキュアサンドボックスの具体例として明記されています<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref6"
                            role="doc-noteref"
                        ><sup>2</sup></a>。本ガイドでもこの記載に従い解説します。
                    </p>

                    <h2 id="セクション2に関連する主な対象ツール">
                        セクション2に関連する主な対象ツール
                    </h2>
                    <p>
                        公式試験ガイドの「対象ツール一覧（in scope for this exam）」<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref7"
                            role="doc-noteref"
                        ><sup>2</sup></a>のうち、セクション2に特に関連するものを以下にまとめます。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ツール名</th>
                                    <th scope="col">概要</th>
                                    <th scope="col">本ガイドでの主な登場箇所</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Antigravity (CLI, SDK, App)</td>
                                    <td>
                                        Googleのエージェントファースト開発プラットフォーム。IDE・CLI（<code>agy</code>）・SDKの3形態で提供される<a
                                            className="footnote-ref"
                                            href="#ref4"
                                            id="fnref8"
                                            role="doc-noteref"
                                        ><sup>4</sup></a><a
                                            className="footnote-ref"
                                            href="#ref5"
                                            id="fnref9"
                                            role="doc-noteref"
                                        ><sup>5</sup></a>
                                    </td>
                                    <td>2.1.1, 2.1.2, 2.2.1, 2.2.2</td>
                                </tr>
                                <tr className="even">
                                    <td>Claude Code on Google Cloud</td>
                                    <td>
                                        Google CloudのAgent Platform（旧Vertex
                                        AI）経由で課金・IAM・監査ログを統合して使うAnthropic Claude
                                        Codeのコーディングエージェント<a
                                            className="footnote-ref"
                                            href="#ref7"
                                            id="fnref10"
                                            role="doc-noteref"
                                        ><sup>7</sup></a>
                                    </td>
                                    <td>2.1.1</td>
                                </tr>
                                <tr className="odd">
                                    <td>Model Context Protocol (MCP) servers</td>
                                    <td>
                                        エージェントに外部ツール・データへの標準化されたアクセスを提供するプロトコルとサーバー実装<a
                                            className="footnote-ref"
                                            href="#ref11"
                                            id="fnref11"
                                            role="doc-noteref"
                                        ><sup>11</sup></a>
                                    </td>
                                    <td>2.1.1, 2.2.1</td>
                                </tr>
                                <tr className="even">
                                    <td>Google Kubernetes Engine (GKE)</td>
                                    <td>
                                        Agent
                                        Sandbox機能によりgVisorベースのカーネルレベル隔離実行環境を提供<a
                                            className="footnote-ref"
                                            href="#ref12"
                                            id="fnref12"
                                            role="doc-noteref"
                                        ><sup>12</sup></a><a
                                            className="footnote-ref"
                                            href="#ref14"
                                            id="fnref13"
                                            role="doc-noteref"
                                        ><sup>14</sup></a>
                                    </td>
                                    <td>2.1.2</td>
                                </tr>
                                <tr className="odd">
                                    <td>Agents CLI in Agent Platform</td>
                                    <td>
                                        コーディングエージェントにADKでのエージェント構築・評価・デプロイのスキルを付与するCLIとスキル群<a
                                            className="footnote-ref"
                                            href="#ref24"
                                            id="fnref14"
                                            role="doc-noteref"
                                        ><sup>24</sup></a><a
                                            className="footnote-ref"
                                            href="#ref25"
                                            id="fnref15"
                                            role="doc-noteref"
                                        ><sup>25</sup></a>
                                    </td>
                                    <td>2.2.2</td>
                                </tr>
                                <tr className="even">
                                    <td>Skill Registry</td>
                                    <td>
                                        スキルを一元管理・検証・配布するセキュアなリポジトリ<a
                                            className="footnote-ref"
                                            href="#ref30"
                                            id="fnref16"
                                            role="doc-noteref"
                                        ><sup>30</sup></a>
                                    </td>
                                    <td>2.2.1, 2.2.2</td>
                                </tr>
                                <tr className="odd">
                                    <td>Agent Registry</td>
                                    <td>
                                        エージェント・MCPサーバー・スキル・エンドポイントを登録・発見・ガバナンスする統合カタログ<a
                                            className="footnote-ref"
                                            href="#ref28"
                                            id="fnref17"
                                            role="doc-noteref"
                                        ><sup>28</sup></a>
                                    </td>
                                    <td>2.2.2</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Run</td>
                                    <td>
                                        Agents CLIのデフォルトのデプロイターゲットの1つ<a
                                            className="footnote-ref"
                                            href="#ref24"
                                            id="fnref18"
                                            role="doc-noteref"
                                        ><sup>24</sup></a>
                                    </td>
                                    <td>2.2.2</td>
                                </tr>
                                <tr className="odd">
                                    <td>Google Cloud Observability (Cloud Logging / Cloud Trace)</td>
                                    <td>
                                        3系統を区別する。①<strong>Cloud Trace のスパン</strong>（レイテンシ・呼び出し階層）はデプロイしたエージェントに対して既定で有効。②<strong>メッセージ本文（プロンプト／レスポンス）の記録</strong>は
                                        <code>OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT</code>
                                        が既定
                                        <code>NO_CONTENT</code> のため記録されず、この1つの環境変数が
                                        Trace のスパン属性と Cloud Logging
                                        のイベントログの<strong>双方</strong>の本文出力を制御する。③<strong>Cloud Storage／BigQuery へのログ出力</strong>はさらに別条件で、素の
                                        <code>agents-cli deploy</code>
                                        は保存先バケット／データセットを作成しないため、Terraform
                                        等でプロビジョニングしたうえでアップロード先の設定を行って初めて利用可能になる<a
                                            className="footnote-ref"
                                            href="#ref24"
                                            id="fnref19"
                                            role="doc-noteref"
                                        ><sup>24</sup></a>
                                    </td>
                                    <td>2.2.2</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <hr />
                    <h2 id="21-コーディングエージェントの効果的な活用">
                        2.1 コーディングエージェントの効果的な活用
                    </h2>
                    <h3 id="211-mcpサーバーカスタムスキルツールアクセスの設定">
                        2.1.1 MCPサーバー・カスタムスキル・ツールアクセスの設定
                    </h3>
                    <p>
                        コーディングエージェント（Antigravity、Claude Code on Google
                        Cloudなど）は、単体では自分のコード生成能力しか持ちません。実際の開発ワークフローで役立てるには、(a)
                        外部システムに接続する<strong>MCPサーバー</strong>、(b)
                        特定タスクの専門知識をまとめた<strong>カスタムスキル</strong>、(c)
                        それらへの<strong>ツールアクセス権限</strong>を適切に設定する必要があります<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref20"
                            role="doc-noteref"
                        ><sup>2</sup></a>。
                    </p>
                    <p>
                        <strong>MCP</strong>（Model Context
                        Protocol）は、エージェントと外部ツール・データソースの間の通信を標準化するプロトコルです。stdio（ローカルサブプロセス起動）などのトランスポートに対応しており、npm/PyPIパッケージやバイナリとして配布されたMCPサーバーをそのまま利用できます<a
                            className="footnote-ref"
                            href="#ref11"
                            id="fnref21"
                            role="doc-noteref"
                        ><sup>11</sup></a>。
                    </p>
                    <p>
                        Antigravityでは、設定の置き場所が「プロジェクトスコープ」と「グローバルスコープ」の2階層に整理されています<a
                            className="footnote-ref"
                            href="#ref9"
                            id="fnref22"
                            role="doc-noteref"
                        ><sup>9</sup></a><a className="footnote-ref" href="#ref23" id="fnref23" role="doc-noteref"><sup>23</sup></a>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">設定対象</th>
                                    <th scope="col">プロジェクトスコープ（リポジトリ単位・チーム共有）</th>
                                    <th scope="col">グローバルスコープ（ユーザー単位）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>MCPサーバー設定</td>
                                    <td>プロジェクト内の設定（存在する場合）</td>
                                    <td>
                                        <code>&lt;user-home&gt;/.gemini/config/mcp_config.json</code><a
                                            className="footnote-ref"
                                            href="#ref9"
                                            id="fnref24"
                                            role="doc-noteref"
                                        ><sup>9</sup></a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>ルール（Rules）</td>
                                    <td>
                                        <code>.agents/rules/*.md</code><a
                                            className="footnote-ref"
                                            href="#ref23"
                                            id="fnref25"
                                            role="doc-noteref"
                                        ><sup>23</sup></a>
                                    </td>
                                    <td>
                                        <code>&lt;user-home&gt;/.gemini/GEMINI.md</code>
                                        内の共通スニペット<a
                                            className="footnote-ref"
                                            href="#ref23"
                                            id="fnref26"
                                            role="doc-noteref"
                                        ><sup>23</sup></a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>スキル（Skills）</td>
                                    <td>
                                        <code>.agent/skills/&lt;name&gt;/SKILL.md</code><a
                                            className="footnote-ref"
                                            href="#ref10"
                                            id="fnref27"
                                            role="doc-noteref"
                                        ><sup>10</sup></a>
                                    </td>
                                    <td>
                                        <code>&lt;user-home&gt;/.gemini/antigravity/skills/&lt;name&gt;</code><a
                                            className="footnote-ref"
                                            href="#ref10"
                                            id="fnref28"
                                            role="doc-noteref"
                                        ><sup>10</sup></a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>用途</td>
                                    <td>リポジトリ固有の規約・接続先を明文化</td>
                                    <td>全プロジェクトに共通する個人設定</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        Antigravity
                        2.0以降、旧来の「拡張機能（extensions）」は「プラグイン」という呼び方に整理され、MCPサーバー・スキル設定を一元管理できるようになりました<a
                            className="footnote-ref"
                            href="#ref9"
                            id="fnref29"
                            role="doc-noteref"
                        ><sup>9</sup></a>。これはAntigravity CLI（<code>agy</code>）が旧Gemini
                        CLIの設定ツリー（<code>&lt;user-home&gt;/.gemini/</code>）をそのまま引き継いだ結果であり、Google自身もAntigravity
                        CLIをGemini
                        CLIの中核機能（エージェントスキル・拡張フック・サブエージェント・拡張機能）を引き継ぐ後継ツールと位置づけています<a
                            className="footnote-ref"
                            href="#ref22"
                            id="fnref30"
                            role="doc-noteref"
                        ><sup>22</sup></a>。
                    </p>
                    <p>
                        一方、<strong>Claude Code on Google Cloud</strong>は、Google CloudのAgent
                        Platform（旧Vertex AI）経由でClaude
                        Codeを利用する構成です。個人のPro/Maxプラン経由のOAuthログインとは別の経路であり、<code>CLAUDE_CODE_USE_VERTEX=1</code>などの環境変数を設定することで有効化します<a
                            className="footnote-ref"
                            href="#ref7"
                            id="fnref31"
                            role="doc-noteref"
                        ><sup>7</sup></a>。この構成のメリットは、GCPの請求・IAM（<code>roles/aiplatform.user</code>など）・VPC
                        Service Controls・Cloud Loggingにそのまま統合できる点です<a
                            className="footnote-ref"
                            href="#ref8"
                            id="fnref32"
                            role="doc-noteref"
                        ><sup>8</sup></a>。Claude
                        Code自体もMCPサーバー設定をサポートしているため、Antigravityと同様にプロジェクト固有のツールアクセスを構成できます<a
                            className="footnote-ref"
                            href="#ref8"
                            id="fnref33"
                            role="doc-noteref"
                        ><sup>8</sup></a>。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    <strong>スコープを明確に分ける</strong>: リポジトリ固有の接続情報は{' '}
                                    <code>.agents/</code>{' '}
                                    配下（プロジェクトスコープ）に、個人の好みや全社共通ツールは{' '}
                                    <code>&lt;user-home&gt;/.gemini/config/</code>（グローバルスコープ）に置き、チームメンバー間で設定の重複や不整合を防ぐ<a
                                        className="footnote-ref"
                                        href="#ref9"
                                        id="fnref34"
                                        role="doc-noteref"
                                    ><sup>9</sup></a><a
                                        className="footnote-ref"
                                        href="#ref23"
                                        id="fnref35"
                                        role="doc-noteref"
                                    ><sup>23</sup></a>。
                                </li>{' '}
                                <li>
                                    <strong>最小権限のツールアクセス</strong>:
                                    MCPサーバー定義では、利用可能なツールを <code>enabled_tools</code> /{' '}
                                    <code>disabled_tools</code>{' '}
                                    で明示的に絞り込み、エージェントに不要な操作権限を与えない<a
                                        className="footnote-ref"
                                        href="#ref11"
                                        id="fnref36"
                                        role="doc-noteref"
                                    ><sup>11</sup></a>。
                                </li>{' '}
                                <li>
                                    <strong>シークレットを設定ファイルに直書きしない</strong>:
                                    MCPサーバーのグローバル設定に環境変数を安全に渡せない既知の制約が指摘されており（2026年半ば時点）、Secret
                                    ManagerやWorkload
                                    Identity連携など、より安全な認証情報の受け渡し方法を優先する<a
                                        className="footnote-ref"
                                        href="#ref9"
                                        id="fnref37"
                                        role="doc-noteref"
                                    ><sup>9</sup></a>。
                                </li>{' '}
                                <li>
                                    <strong><code>AGENTS.md</code> /{' '}
                                    <code>GEMINI.md</code>{' '}
                                    でプロジェクトの振る舞いを明文化する</strong>: これはAntigravityだけでなくClaude
                                    Code・Codexなど複数のコーディングエージェントが共通で参照するファイル規約であり、ツール横断で一貫した挙動を得やすい<a
                                        className="footnote-ref"
                                        href="#ref9"
                                        id="fnref38"
                                        role="doc-noteref"
                                    ><sup>9</sup></a>。
                                </li>{' '}
                                <li>
                                    <strong>課金・監査要件があるならGoogle Cloud経由に統一する</strong>:
                                    複数のコーディングエージェント（Antigravity、Claude
                                    Code）を混在利用する組織では、Claude Code on Google
                                    Cloudを使うことでGCPの既存のガバナンス機構（IAM、VPC-SC、Cloud
                                    Logging）にコーディングエージェントの利用実績を一元的に記録できる<a
                                        className="footnote-ref"
                                        href="#ref8"
                                        id="fnref39"
                                        role="doc-noteref"
                                    ><sup>8</sup></a>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <Diagram
                        id="diag-2"
                        ariaLabel="コーディングエージェントとMCPサーバー、スキル、ルール、Agent Platformの連携を示す図"
                    />

                    <h3 id="212-セキュアなサンドボックスでのコーディングエージェントの利用">
                        2.1.2 セキュアなサンドボックスでのコーディングエージェントの利用
                    </h3>
                    <p>
                        コーディングエージェントが生成・実行するコードは、原理的に<strong>「未信頼のコード」として扱うべき</strong>です。プロンプトインジェクションや意図しないバグにより、ホスト環境への予期しないアクセスが発生し得るためです<a
                            className="footnote-ref"
                            href="#ref13"
                            id="fnref40"
                            role="doc-noteref"
                        ><sup>13</sup></a>。公式試験ガイドは、その隔離手段の具体例としてGoogle Kubernetes
                        Engine（GKE）、Cloud Workstations、Antigravityの3つを挙げています<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref41"
                            role="doc-noteref"
                        ><sup>2</sup></a>。
                    </p>
                    <p>
                        <strong>GKE Agent Sandbox</strong>は、Kubernetes SIG
                        Appsのサブプロジェクトとして開発された、AIエージェントのような未信頼コードを安全に実行するためのKubernetes拡張です<a
                            className="footnote-ref"
                            href="#ref12"
                            id="fnref42"
                            role="doc-noteref"
                        ><sup>12</sup></a><a className="footnote-ref" href="#ref13" id="fnref43" role="doc-noteref"><sup>13</sup></a>。中核技術は<strong>gVisor</strong>というアプリケーションカーネルで、通常のコンテナがホストカーネルを共有するのに対し、gVisorは以下の2つのコンポーネントでLinux
                        APIをユーザー空間に再実装し、ホストカーネルへの直接アクセスを遮断します<a
                            className="footnote-ref"
                            href="#ref17"
                            id="fnref44"
                            role="doc-noteref"
                        ><sup>17</sup></a>。
                    </p>
                    <ul>
                        <li>
                            <strong>Sentry</strong>:
                            エージェントが発行するシステムコール（<code>exec</code>、<code>socket</code>など）を横取りし、あたかも本物のカーネルであるかのように振る舞う実行エンジン
                        </li>
                        <li>
                            <strong>Gofer</strong>:
                            ファイルシステム操作を仲介する専用プロセス。Sentryはファイルに直接アクセスできず、必ずGoferを経由する
                        </li>
                    </ul>
                    <p>
                        GKE Agent Sandboxは、この上に3つのKubernetesプリミティブを提供します<a
                            className="footnote-ref"
                            href="#ref13"
                            id="fnref45"
                            role="doc-noteref"
                        ><sup>13</sup></a>。
                    </p>
                    <ul>
                        <li>
                            <strong>Sandbox</strong>: 実際のワークロードリソース（隔離実行環境の本体）
                        </li>
                        <li>
                            <strong>SandboxTemplate</strong>:
                            セキュリティ設計図（どのランタイム・ネットワークポリシーを使うか）
                        </li>
                        <li>
                            <strong>SandboxClaim</strong>:
                            ADKやLangChainなど上位フレームワークから実行環境をトランザクショナルに要求するためのリソース
                        </li>
                    </ul>
                    <p>
                        ウォームプール（事前起動済みPodのプール）により、コールドスタート遅延を1秒未満に抑えられます<a
                            className="footnote-ref"
                            href="#ref13"
                            id="fnref46"
                            role="doc-noteref"
                        ><sup>13</sup></a>。またAgent SandboxはgVisorに加えKata
                        Containersのようなオープンソースのサンドボックスもプラガブルなインターフェースとしてサポートしています。ネットワーク面では、マネージドな既定ポスチャとして{' '}
                        <strong>Sandbox Router
                        以外からのingressを拒否し、RFC1918のプライベートIP空間・CoreDNS・メタデータサーバーへのegressを拒否</strong>するKubernetesネットワークポリシーが組み込まれています<a
                            className="footnote-ref"
                            href="#ref15"
                            id="fnref47"
                            role="doc-noteref"
                        ><sup>15</sup></a>。ただしこれは「すべてを拒否する」設定ではなく、<strong>public Internetへのegressは既定で許可</strong>される点に注意が必要です。外部への通信も遮断したい場合は、カスタムポリシーやair-gapped構成を別途適用します。またADKには<code>GkeCodeExecutor</code>という統合機能があり、コード実行リクエストのたびにConfigMap作成→gVisor有効なハードニング済みPodとしてのKubernetes
                        Job作成→実行、という流れを自動化します<a
                            className="footnote-ref"
                            href="#ref16"
                            id="fnref48"
                            role="doc-noteref"
                        ><sup>16</sup></a>。
                    </p>
                    <p>
                        <strong>Cloud Workstations</strong>は、Googleが提供するマネージド型のセキュアなリモート開発環境です。コミュニティの実践例では、Cloud
                        Workstationsのコンテナイメージ上にAntigravity本体をインストールし、Chrome Remote
                        DesktopやVNC経由でブラウザからリモート操作することで、ローカルマシンに何もインストールせずに高い隔離性を持つAntigravity環境を実現する手法が紹介されています<a
                            className="footnote-ref"
                            href="#ref18"
                            id="fnref49"
                            role="doc-noteref"
                        ><sup>18</sup></a><a className="footnote-ref" href="#ref19" id="fnref50" role="doc-noteref"><sup>19</sup></a>。また、Data Agent Kit拡張機能（VS Code向け）はCloud
                        Workstationsにデフォルトでインストールされており、Google
                        Cloudのデータ資産に対する統一されたビューを標準の開発環境として提供します<a
                            className="footnote-ref"
                            href="#ref20"
                            id="fnref51"
                            role="doc-noteref"
                        ><sup>20</sup></a>。
                    </p>
                    <p>
                        <strong>Antigravity自体のローカル実行</strong>にも、シェルコマンド実行の可否を制御する「Terminal
                        Policy」という設定があり、<code>Auto</code>（標準コマンドを確認なしで自動実行）や<code>Agent Decides</code>（確認が必要かどうかをエージェント自身に判断させる）といったモードを選択できます<a
                            className="footnote-ref"
                            href="#ref5"
                            id="fnref52"
                            role="doc-noteref"
                        ><sup>5</sup></a>。ただしこれはOSプロセスレベルの制御であり、gVisorのようなカーネルレベル分離は提供しません。
                    </p>

                    <h4>環境ごとの比較</h4>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">環境</th>
                                    <th scope="col">分離レベル</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">セットアップの手間</th>
                                    <th scope="col">適したシナリオ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Antigravityローカル実行</td>
                                    <td>OSプロセスレベル（Terminal Policyによる実行制御のみ）</td>
                                    <td>個人開発・プロトタイピング</td>
                                    <td>低</td>
                                    <td>信頼できるコード・小規模な検証</td>
                                </tr>
                                <tr className="even">
                                    <td>Cloud Workstations</td>
                                    <td>VMベースの永続的な隔離環境（ユーザー間分離）</td>
                                    <td>チーム開発環境の標準化、リモートでのAntigravity実行</td>
                                    <td>中</td>
                                    <td>複数人開発、BYOD対応、監査要件がある組織</td>
                                </tr>
                                <tr className="odd">
                                    <td>GKE Agent Sandbox（gVisor）</td>
                                    <td>
                                        カーネルレベル分離（Sentry/Goferによるシステムコール傍受）＋マネージドなネットワークポスチャ（Sandbox
                                        Router以外からのingressを拒否し、RFC1918レンジ・CoreDNS・メタデータサーバへのegressを拒否。ただしパブリックインターネットへのegressは既定で許可）
                                    </td>
                                    <td>本番環境でのLLM生成コード実行、マルチテナントSaaS</td>
                                    <td>高（Kubernetesクラスタ運用が前提）</td>
                                    <td>大規模・マルチテナント・未信頼コードの実行が常態化する環境</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <Diagram
                        id="diag-3"
                        ariaLabel="未信頼コードの性質に応じたセキュアサンドボックスの選定フロー図"
                    />

                    <Diagram
                        id="diag-4"
                        ariaLabel="GKE Agent SandboxとgVisorによるカーネル分離アーキテクチャ図"
                    />

                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    「LLMが生成したコードは常に未信頼」という前提に立ち、既定のネットワークポスチャ（Sandbox
                                    Router以外からのingress拒否／RFC1918・CoreDNS・メタデータサーバーへのegress拒否）に加え、<strong>既定では許可されるpublic Internetへのegress</strong>をカスタムポリシーやair-gapped構成で絞り込み、最小権限のWorkload
                                    Identityと組み合わせる<a
                                        className="footnote-ref"
                                        href="#ref13"
                                        id="fnref53"
                                        role="doc-noteref"
                                    ><sup>13</sup></a><a
                                        className="footnote-ref"
                                        href="#ref17"
                                        id="fnref54"
                                        role="doc-noteref"
                                    ><sup>17</sup></a>。
                                </li>{' '}
                                <li>
                                    独自にPodを組むのではなく、ADKの<code>GkeCodeExecutor</code>のようなマネージド統合を利用し、ハードニング済み設定をゼロから実装しない<a
                                        className="footnote-ref"
                                        href="#ref16"
                                        id="fnref55"
                                        role="doc-noteref"
                                    ><sup>16</sup></a>。
                                </li>{' '}
                                <li>
                                    ウォームプールでコールドスタートを抑えつつ、アイドル状態のサンドボックスは積極的にサスペンド・削除してコストを最適化する<a
                                        className="footnote-ref"
                                        href="#ref13"
                                        id="fnref56"
                                        role="doc-noteref"
                                    ><sup>13</sup></a>。
                                </li>{' '}
                                <li>
                                    監査要件がある組織では、個人のローカル実行に頼らずCloud
                                    Workstations上にAntigravityを集約し、セッションを一元的に管理する<a
                                        className="footnote-ref"
                                        href="#ref18"
                                        id="fnref57"
                                        role="doc-noteref"
                                    ><sup>18</sup></a><a
                                        className="footnote-ref"
                                        href="#ref20"
                                        id="fnref58"
                                        role="doc-noteref"
                                    ><sup>20</sup></a>。
                                </li>{' '}
                                <li>
                                    ローカルでAntigravityを使う場合でも、Terminal
                                    Policyを安易に<code>Auto</code>にせず、重要な操作は<code>Agent Decides</code>や手動承認を組み合わせる<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref59"
                                        role="doc-noteref"
                                    ><sup>5</sup></a>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="213-リファクタリング実行ランタイム最適化脆弱性パッチ適用">
                        2.1.3 リファクタリング・実行ランタイム最適化・脆弱性パッチ適用
                    </h3>
                    <p>
                        コーディングエージェントの実運用における代表的なユースケースが、既存コードの<strong>リファクタリング</strong>、<strong>実行ランタイムの最適化</strong>、<strong>アプリケーション層の脆弱性パッチ適用</strong>です<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref60"
                            role="doc-noteref"
                        ><sup>2</sup></a>。これらはいずれも「動いているコードを変更する」タスクであり、新規コード生成以上に振る舞いの回帰（デグレード）に注意が必要です。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">ユースケース</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">推奨アプローチ</th>
                                    <th scope="col">主なリスクと対策</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>リファクタリング</td>
                                    <td>可読性・保守性の向上、技術的負債の解消</td>
                                    <td>
                                        タスクを小さく分割し、既存のテスト（またはgolden test
                                        set）で現状の振る舞いを固定してから変更させる
                                    </td>
                                    <td>
                                        大規模な一括変更はレビューが困難になりデグレードを見逃しやすい →
                                        差分を小さく保ち人間レビューを必須化する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>実行ランタイム最適化</td>
                                    <td>レイテンシ・コスト削減</td>
                                    <td>
                                        プロファイリング結果など計測データをツール経由でエージェントに与え、推測ではなく実測に基づいて最適化させる
                                    </td>
                                    <td>
                                        過度な最適化により可読性が低下する →
                                        ベンチマーク比較（Before/After）を完了条件に含める
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>アプリケーション層の脆弱性パッチ</td>
                                    <td>セキュアコーディング基準への準拠</td>
                                    <td>
                                        SAST/SCAツールの検出結果を構造化データとしてエージェントに渡し、修正後は再スキャンで検証する
                                    </td>
                                    <td>
                                        誤検知への過剰対応や新たな脆弱性の混入 →
                                        人間によるセキュリティレビューをマージ前に必須化する
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        いずれのユースケースでも、2.1.2で解説したセキュアなサンドボックス内でエージェントに変更を実行・検証させ、その後に人間のレビューを経てマージするという一連の流れが基本パターンとなります。
                    </p>

                    <Diagram
                        id="diag-5"
                        ariaLabel="エージェントによるリファクタリング・最適化・パッチ適用のライフサイクルを示す図"
                    />

                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    変更前に既存テストまたはgolden test
                                    setを整備し、エージェントの変更が「意図した差分以外は振る舞いを変えていない」ことを機械的に検証できるようにする（評価手法の詳細はセクション4で扱う）。
                                </li>{' '}
                                <li>
                                    リファクタリングタスクは1回のセッションで単一ファイル・単一モジュールに範囲を絞り、差分をレビュー可能なサイズに保つ。
                                </li>{' '}
                                <li>
                                    静的解析・脆弱性スキャンの結果はMCPツールや拡張フック経由でエージェントに構造化データとして渡し、フリーテキストの説明だけに頼らない。
                                </li>{' '}
                                <li>
                                    実行ランタイム最適化では、変更前後のベンチマーク結果を成果物として残し、体感ではなく数値で効果を確認する。
                                </li>{' '}
                                <li>
                                    いかに自動テスト・自動スキャンを通過しても、脆弱性パッチとセキュリティに関わる変更は人間によるレビューをマージ前の必須ゲートとする。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr />
                    <h2 id="22-エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ">
                        2.2 エンタープライズワークフロー向けのコーディングエージェントのカスタマイズ
                    </h2>
                    <h3 id="221-antigravityにおけるスキルプラグイン拡張フックルールサブエージェントの作成">
                        2.2.1
                        Antigravityにおけるスキル・プラグイン・拡張フック・ルール・サブエージェントの作成
                    </h3>
                    <p>
                        公式試験ガイドは、Antigravityを使って作成できるカスタマイズ要素として「スキル、プラグイン、拡張フック、ルール、サブエージェント」の5つを明示しています<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref61"
                            role="doc-noteref"
                        ><sup>2</sup></a>。それぞれの役割は次の表の通りです。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">要素</th>
                                    <th scope="col">目的</th>
                                    <th scope="col">読み込みタイミング</th>
                                    <th scope="col">主な保存場所</th>
                                    <th scope="col">具体例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ルール（Rules）</td>
                                    <td>常時適用すべき方針・規約を明文化する</td>
                                    <td>セッション開始時に常に読み込まれる</td>
                                    <td>
                                        <code>.agents/rules/*.md</code>（プロジェクト）／<code>&lt;user-home&gt;/.gemini/GEMINI.md</code>（グローバル）<a
                                            className="footnote-ref"
                                            href="#ref23"
                                            id="fnref62"
                                            role="doc-noteref"
                                        ><sup>23</sup></a>
                                    </td>
                                    <td>
                                        セキュリティ方針、Gitワークフロー規約<a
                                            className="footnote-ref"
                                            href="#ref21"
                                            id="fnref63"
                                            role="doc-noteref"
                                        ><sup>21</sup></a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>スキル（Skills）</td>
                                    <td>タスクに関連する専門知識をオンデマンドで提供する</td>
                                    <td>関連タスクを検出した時点で段階的に開示（進行的開示）</td>
                                    <td>
                                        <code>.agent/skills/&lt;name&gt;/SKILL.md</code>（プロジェクト）／<code>&lt;user-home&gt;/.gemini/antigravity/skills/&lt;name&gt;</code>（グローバル）<a
                                            className="footnote-ref"
                                            href="#ref10"
                                            id="fnref64"
                                            role="doc-noteref"
                                        ><sup>10</sup></a>
                                    </td>
                                    <td>
                                        外部API連携手順、コーディング規約集<a
                                            className="footnote-ref"
                                            href="#ref21"
                                            id="fnref65"
                                            role="doc-noteref"
                                        ><sup>21</sup></a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>プラグイン（Plugins）</td>
                                    <td>スキル・コマンド・MCP設定・ルールをひとまとめにして配布する</td>
                                    <td>
                                        インストール時に展開され、以後は内部のスキル等と同様にオンデマンドで参照される
                                    </td>
                                    <td>
                                        共有設定フォルダ（旧称: extensions）<a
                                            className="footnote-ref"
                                            href="#ref9"
                                            id="fnref66"
                                            role="doc-noteref"
                                        ><sup>9</sup></a>
                                    </td>
                                    <td>
                                        <code>google/agents-cli</code>、Data Agent Kit plugin<a
                                            className="footnote-ref"
                                            href="#ref24"
                                            id="fnref67"
                                            role="doc-noteref"
                                        ><sup>24</sup></a><a
                                            className="footnote-ref"
                                            href="#ref20"
                                            id="fnref68"
                                            role="doc-noteref"
                                        ><sup>20</sup></a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>拡張フック（Extension Hooks）</td>
                                    <td>
                                        決定論的な処理をライフサイクルイベントに合わせて強制実行する
                                    </td>
                                    <td>
                                        <code>PreToolUse</code>／<code>PostToolUse</code>などのイベント発火時
                                    </td>
                                    <td>
                                        フック設定ファイル（プロジェクト／グローバル）<a
                                            className="footnote-ref"
                                            href="#ref23"
                                            id="fnref69"
                                            role="doc-noteref"
                                        ><sup>23</sup></a>
                                    </td>
                                    <td>
                                        ファイル閲覧前のシークレット検出フック<a
                                            className="footnote-ref"
                                            href="#ref23"
                                            id="fnref70"
                                            role="doc-noteref"
                                        ><sup>23</sup></a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>サブエージェント（Subagents）</td>
                                    <td>専門タスクを独立したコンテキストに委譲する</td>
                                    <td>メインエージェントが必要と判断した時点で動的に生成</td>
                                    <td>
                                        エージェント定義ファイル<a
                                            className="footnote-ref"
                                            href="#ref21"
                                            id="fnref71"
                                            role="doc-noteref"
                                        ><sup>21</sup></a>
                                    </td>
                                    <td>
                                        プランナー、コードレビュアー、セキュリティレビュアー、E2Eランナー<a
                                            className="footnote-ref"
                                            href="#ref21"
                                            id="fnref72"
                                            role="doc-noteref"
                                        ><sup>21</sup></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>
                        これらの要素の中でも特に重要な設計思想が<strong>「進行的開示」</strong>（progressive
                        disclosure）です。Antigravityの基盤モデルは強力な汎用知識を持ちますが、プロジェクト固有のルールやツールをすべて常時コンテキストに読み込むと、ツール肥大化・コスト増加・レイテンシ増加・混乱を招きます。スキルは「使われるまで休眠している専門知識パッケージ」として設計されており、必要なタスクが来たときにだけ読み込まれます<a
                            className="footnote-ref"
                            href="#ref6"
                            id="fnref73"
                            role="doc-noteref"
                        ><sup>6</sup></a>。
                    </p>
                    <p>
                        Antigravity 2.0では「Dynamic
                        Subagents」が導入され、プランナー・コードレビュアー・セキュリティレビュアー・ビルドエラー解決・E2Eランナー・リファクタークリーナー・ドキュメント更新担当など、役割ごとに独立したサブエージェントを構成する実践例が広く共有されています<a
                            className="footnote-ref"
                            href="#ref21"
                            id="fnref74"
                            role="doc-noteref"
                        ><sup>21</sup></a>。サブエージェントは独立したコンテキストウィンドウを持つため、メインの会話コンテキストを専門タスクの詳細で汚染せずに済みます。
                    </p>

                    <Diagram
                        id="diag-6"
                        ariaLabel="Antigravityにおけるルール、スキル、プラグイン、拡張フック、サブエージェントの実行フロー図"
                    />

                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    ルールは常時読み込まれてコンテキストを消費するため、本当に全セッション共通で必要な方針のみに絞り込む<a
                                        className="footnote-ref"
                                        href="#ref6"
                                        id="fnref75"
                                        role="doc-noteref"
                                    ><sup>6</sup></a>。
                                </li>{' '}
                                <li>
                                    汎用的だが頻繁には使わない知識はスキル化し、進行的開示に委ねることでツール肥大化とコスト増を防ぐ<a
                                        className="footnote-ref"
                                        href="#ref6"
                                        id="fnref76"
                                        role="doc-noteref"
                                    ><sup>6</sup></a>。
                                </li>{' '}
                                <li>
                                    チームやOSSコミュニティで再利用する場合は、スキル・コマンド・MCP設定・ルールをプラグインとしてまとめ、バージョン管理する<a
                                        className="footnote-ref"
                                        href="#ref9"
                                        id="fnref77"
                                        role="doc-noteref"
                                    ><sup>9</sup></a><a
                                        className="footnote-ref"
                                        href="#ref24"
                                        id="fnref78"
                                        role="doc-noteref"
                                    ><sup>24</sup></a>。
                                </li>{' '}
                                <li>
                                    シークレット検出のようなセキュリティ上絶対に守るべきチェックは、LLMの判断に委ねずに拡張フックで機械的に強制する<a
                                        className="footnote-ref"
                                        href="#ref23"
                                        id="fnref79"
                                        role="doc-noteref"
                                    ><sup>23</sup></a>。
                                </li>{' '}
                                <li>
                                    プランニングやコードレビュー、セキュリティレビューのように専門性が高く並列化が有効なタスクは、メインエージェントから切り離してサブエージェントに委譲する<a
                                        className="footnote-ref"
                                        href="#ref21"
                                        id="fnref80"
                                        role="doc-noteref"
                                    ><sup>21</sup></a>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <h3 id="222-agents-cliによるantigravityの拡張構築スケールガバナンス最適化">
                        2.2.2 Agents CLIによるAntigravityの拡張（構築・スケール・ガバナンス・最適化）
                    </h3>
                    <p>
                        <strong>Agents CLI in Agent Platform</strong>（<code>agents-cli</code>）は、Googleが提供するCLIとスキル群のセットで、Antigravity・Gemini
                        CLI・Claude Code・Codexなど任意のコーディングエージェントに、Google CloudのAgent
                        Development
                        Kit（ADK）を使ったエージェント構築・評価・デプロイ・運用の専門知識を与えます<a
                            className="footnote-ref"
                            href="#ref24"
                            id="fnref81"
                            role="doc-noteref"
                        ><sup>24</sup></a><a className="footnote-ref" href="#ref25" id="fnref82" role="doc-noteref"><sup>25</sup></a>。公式試験ガイドはこれを「Antigravityを拡張し、デプロイ済みエージェントを構築・スケール・ガバナンス・最適化する」ための手段として位置づけています<a
                            className="footnote-ref"
                            href="#ref2"
                            id="fnref83"
                            role="doc-noteref"
                        ><sup>2</sup></a>。Googleは2026年5月のI/O
                        &apos;26で、Antigravityをコーディング・エージェントオーケストレーション戦略の中核として据え、Agents
                        CLIをその上でADK・評価・デプロイ・観測性・公開に関する専門知識を付与する存在として発表しました<a
                            className="footnote-ref"
                            href="#ref27"
                            id="fnref84"
                            role="doc-noteref"
                        ><sup>27</sup></a>。
                    </p>
                    <p>
                        セットアップは非常にシンプルで、人間が直接実行するコマンドは基本的に1つだけです<a
                            className="footnote-ref"
                            href="#ref24"
                            id="fnref85"
                            role="doc-noteref"
                        ><sup>24</sup></a>。
                    </p>
                    <p><code>uvx google-agents-cli setup</code></p>
                    <p>
                        これによりCLI本体と、コーディングエージェント向けのスキル一式がインストールされます。スキルのみを追加したい場合は次のコマンドも利用できます<a
                            className="footnote-ref"
                            href="#ref24"
                            id="fnref86"
                            role="doc-noteref"
                        ><sup>24</sup></a>。
                    </p>
                    <p><code>npx skills add google/agents-cli</code></p>
                    <p>
                        セットアップ後は、開発者はCLIの個別コマンドを覚える必要がなく、コーディングエージェントに自然言語で指示するだけで済みます（例:「agents-cliを使って、冗長な文章を要約するエージェントを作って」）<a
                            className="footnote-ref"
                            href="#ref24"
                            id="fnref87"
                            role="doc-noteref"
                        ><sup>24</sup></a><a className="footnote-ref" href="#ref26" id="fnref88" role="doc-noteref"><sup>26</sup></a>。
                    </p>
                    <p>
                        agents-cliは、ADKのライフサイクル全体にわたって次の7種類のスキルを提供します<a
                            className="footnote-ref"
                            href="#ref24"
                            id="fnref89"
                            role="doc-noteref"
                        ><sup>24</sup></a>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">スキル名</th>
                                    <th scope="col">コーディングエージェントが習得する内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td><code>google-agents-cli-workflow</code></td>
                                    <td>
                                        開発ライフサイクル全体、コード保持ルール、モデル選定の考え方
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><code>google-agents-cli-adk-code</code></td>
                                    <td>
                                        ADK Python
                                        APIの詳細（エージェント、ツール、オーケストレーション、コールバック、状態管理）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td><code>google-agents-cli-scaffold</code></td>
                                    <td>
                                        プロジェクトの雛形生成（新規作成／機能追加／アップグレード）
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><code>google-agents-cli-eval</code></td>
                                    <td>
                                        評価手法（メトリクス、evalset、LLM-as-judge、トラジェクトリスコアリング）
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td><code>google-agents-cli-deploy</code></td>
                                    <td>
                                        デプロイ（Agent Runtime、Cloud
                                        Run、GKE、CI/CD、シークレット管理）
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
                        典型的な開発フローは、(1) スキャフォールディングでプロジェクトを生成し、(2){' '}
                        <code>agents-cli eval run</code> による評価を反復して品質を高め、(3)
                        デプロイ設定を追加してCloud Run等にデプロイし、(4) デプロイ後は自動的にCloud
                        Traceが有効化される、という流れです<a
                            className="footnote-ref"
                            href="#ref26"
                            id="fnref90"
                            role="doc-noteref"
                        ><sup>26</sup></a>。さらに開発者が「監視基盤をセットアップして」と指示すれば、コーディングエージェントがサービスアカウント・Cloud
                        Storageバケット・BigQueryデータセットを自動的にプロビジョニングし、より詳細な観測性を実現します<a
                            className="footnote-ref"
                            href="#ref26"
                            id="fnref91"
                            role="doc-noteref"
                        ><sup>26</sup></a>。
                    </p>
                    <p>
                        「ガバナンス」の側面では、Agent
                        Registry（エージェント・MCPサーバー・エンドポイントの統合カタログ）<a
                            className="footnote-ref"
                            href="#ref28"
                            id="fnref92"
                            role="doc-noteref"
                        ><sup>28</sup></a>とSkill
                        Registry（スキル専用の一元管理リポジトリ、ZIPペイロードの自動検証・バージョン管理・アクセスポリシーによる認可を提供）<a
                            className="footnote-ref"
                            href="#ref30"
                            id="fnref93"
                            role="doc-noteref"
                        ><sup>30</sup></a>が対応します。Agent
                        Registryは2026年6月18日にGA（一般提供）となり、続いて2026年7月23日にはSkill
                        Registryのガバナンス機能（スキルのライフサイクル管理、バージョン履歴、検証済みパブリッシャーの確認など）がプレビューとして追加されました<a
                            className="footnote-ref"
                            href="#ref29"
                            id="fnref94"
                            role="doc-noteref"
                        ><sup>29</sup></a>。
                    </p>

                    <Diagram
                        id="diag-7"
                        ariaLabel="Agents CLIとAgent Platformによるエージェントライフサイクル（Scaffold〜Eval〜Deploy〜Observability〜Registry）のシーケンス図"
                    />

                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    人間が直接実行するのは<code>uvx google-agents-cli setup</code>によるセットアップのみとし、以降はコーディングエージェントへの自然言語指示に統一する運用を徹底する<a
                                        className="footnote-ref"
                                        href="#ref24"
                                        id="fnref95"
                                        role="doc-noteref"
                                    ><sup>24</sup></a>。
                                </li>{' '}
                                <li>
                                    <code>agents-cli eval run</code>による反復評価を開発サイクルの中心に据え、golden
                                    dataに基づく評価が通るまでデプロイに進まない<a
                                        className="footnote-ref"
                                        href="#ref26"
                                        id="fnref96"
                                        role="doc-noteref"
                                    ><sup>26</sup></a>。
                                </li>{' '}
                                <li>
                                    デプロイ先（Agent Runtime／Cloud
                                    Run／GKE）はユースケース・コスト・運用要件で選定し、<code>agents-cli scaffold enhance --deployment-target</code>で後からインフラ設定を追加できる柔軟性を活用する（選定基準の詳細はセクション4.2で扱う）<a
                                        className="footnote-ref"
                                        href="#ref26"
                                        id="fnref97"
                                        role="doc-noteref"
                                    ><sup>26</sup></a>。
                                </li>{' '}
                                <li>
                                    デプロイ後にデフォルトで有効化されるCloud
                                    Traceに加え、専用のサービスアカウント・ストレージ・BigQueryデータセットを設定し、観測性を本番運用レベルまで引き上げる<a
                                        className="footnote-ref"
                                        href="#ref26"
                                        id="fnref98"
                                        role="doc-noteref"
                                    ><sup>26</sup></a>。
                                </li>{' '}
                                <li>
                                    チームやエンタープライズでの展開時は、個々のスキル・エージェントを野放しにせず、Agent
                                    RegistryとSkill
                                    Registryでバージョンとアクセスポリシーを一元管理する<a
                                        className="footnote-ref"
                                        href="#ref28"
                                        id="fnref99"
                                        role="doc-noteref"
                                    ><sup>28</sup></a><a
                                        className="footnote-ref"
                                        href="#ref30"
                                        id="fnref100"
                                        role="doc-noteref"
                                    ><sup>30</sup></a>。
                                </li>
                            </ul>
                        </div>
                    </div>

                    <hr />
                    <h2 id="学習チェックリスト">学習チェックリスト</h2>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="title">学習チェックリスト</span>
                            <span className="count">{checkedCount} / {totalChecklist} 完了</span>
                        </div>
                        <ul className="checklist-items">
                            <li>
                                <input
                                    id="chk1"
                                    type="checkbox"
                                    checked={!!checkedItems['chk1']}
                                    onChange={() => handleCheckChange('chk1')}
                                />
                                <label htmlFor="chk1">
                                    MCPサーバーの設定ファイルの配置場所（プロジェクトスコープ vs
                                    グローバルスコープ）を説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk2"
                                    type="checkbox"
                                    checked={!!checkedItems['chk2']}
                                    onChange={() => handleCheckChange('chk2')}
                                />
                                <label htmlFor="chk2">
                                    Antigravityにおける「進行的開示（progressive
                                    disclosure）」の意味と、それがスキルの設計にどう反映されているかを説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk3"
                                    type="checkbox"
                                    checked={!!checkedItems['chk3']}
                                    onChange={() => handleCheckChange('chk3')}
                                />
                                <label htmlFor="chk3">
                                    Claude Code on Google
                                    Cloudを使う際の前提条件（API有効化、IAMロール、モデルアクセス、環境変数）を列挙できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk4"
                                    type="checkbox"
                                    checked={!!checkedItems['chk4']}
                                    onChange={() => handleCheckChange('chk4')}
                                />
                                <label htmlFor="chk4">
                                    GKE Agent Sandboxがgvisorの
                                    Sentry／Goferでどのようにカーネルレベル分離を実現するかを説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk5"
                                    type="checkbox"
                                    checked={!!checkedItems['chk5']}
                                    onChange={() => handleCheckChange('chk5')}
                                />
                                <label htmlFor="chk5">
                                    GKE Agent
                                    Sandboxの3つのKubernetesプリミティブ（Sandbox／SandboxTemplate／SandboxClaim）の役割を説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk6"
                                    type="checkbox"
                                    checked={!!checkedItems['chk6']}
                                    onChange={() => handleCheckChange('chk6')}
                                />
                                <label htmlFor="chk6">
                                    Cloud Workstations・GKE Agent
                                    Sandbox・Antigravityローカル実行の使い分け基準を説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk7"
                                    type="checkbox"
                                    checked={!!checkedItems['chk7']}
                                    onChange={() => handleCheckChange('chk7')}
                                />
                                <label htmlFor="chk7">
                                    エージェントによるリファクタリング・最適化・脆弱性パッチにおいて、自動テスト／スキャンと人間レビューの両方が必要な理由を説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk8"
                                    type="checkbox"
                                    checked={!!checkedItems['chk8']}
                                    onChange={() => handleCheckChange('chk8')}
                                />
                                <label htmlFor="chk8">
                                    ルール・スキル・プラグイン・拡張フック・サブエージェントそれぞれの目的と読み込みタイミングの違いを説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk9"
                                    type="checkbox"
                                    checked={!!checkedItems['chk9']}
                                    onChange={() => handleCheckChange('chk9')}
                                />
                                <label htmlFor="chk9">
                                    Agents
                                    CLIが提供する主要スキル（scaffold／eval／deploy等）の役割を説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk10"
                                    type="checkbox"
                                    checked={!!checkedItems['chk10']}
                                    onChange={() => handleCheckChange('chk10')}
                                />
                                <label htmlFor="chk10">
                                    Agents
                                    CLIでデプロイした際にデフォルトで有効化される観測性機能を説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk11"
                                    type="checkbox"
                                    checked={!!checkedItems['chk11']}
                                    onChange={() => handleCheckChange('chk11')}
                                />
                                <label htmlFor="chk11">
                                    Agent RegistryとSkill Registryの役割の違いを説明できる
                                </label>
                            </li>
                            <li>
                                <input
                                    id="chk12"
                                    type="checkbox"
                                    checked={!!checkedItems['chk12']}
                                    onChange={() => handleCheckChange('chk12')}
                                />
                                <label htmlFor="chk12">
                                    コーディングエージェントの生成コードを「常に未信頼」として扱うべき理由を説明できる
                                </label>
                            </li>
                        </ul>
                    </div>

                    <hr />
                    <h2 id="参考文献">参考文献</h2>
                    <div className="ref-grid" id="referenceGrid">
                        <div className="ref-card" id="ref1">
                            <div className="num">1</div>
                            <div className="txt">
                                Professional Agentic Architect Certification（公式認定ページ）.
                                <a href="https://cloud.google.com/learn/certification/agentic-architect" target="_blank" rel="noopener noreferrer">
                                    https://cloud.google.com/learn/certification/agentic-architect
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref2">
                            <div className="num">2</div>
                            <div className="txt">
                                Professional Agentic Architect Certification exam guide（公式試験ガイドPDF）.
                                <a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf" target="_blank" rel="noopener noreferrer">
                                    https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref4">
                            <div className="num">4</div>
                            <div className="txt">
                                Build with Google Antigravity, our new agentic development platform（Google Developers Blog）.
                                <a href="https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/" target="_blank" rel="noopener noreferrer">
                                    https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref5">
                            <div className="num">5</div>
                            <div className="txt">
                                Google Antigravity（製品ページ）.
                                <a href="https://antigravity.google/product/antigravity-ide/" target="_blank" rel="noopener noreferrer">
                                    https://antigravity.google/product/antigravity-ide/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref6">
                            <div className="num">6</div>
                            <div className="txt">
                                Getting Started with Google Antigravity（Google Codelabs）.
                                <a href="https://codelabs.developers.google.com/getting-started-google-antigravity" target="_blank" rel="noopener noreferrer">
                                    https://codelabs.developers.google.com/getting-started-google-antigravity
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref7">
                            <div className="num">7</div>
                            <div className="txt">
                                Claude Code on Google Cloud&apos;s Agent Platform（Claude Code Docs）.
                                <a href="https://code.claude.com/docs/en/google-vertex-ai" target="_blank" rel="noopener noreferrer">
                                    https://code.claude.com/docs/en/google-vertex-ai
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref8">
                            <div className="num">8</div>
                            <div className="txt">
                                Run Claude Code on Google Cloud: Use Your GCP Credits for AI Coding, Desktop Control, and More（DEV Community）.
                                <a href="https://dev.to/timtech4u/run-claude-code-on-google-cloud-use-your-gcp-credits-for-ai-coding-desktop-control-and-more-2151" target="_blank" rel="noopener noreferrer">
                                    https://dev.to/timtech4u/run-claude-code-on-google-cloud-use-your-gcp-credits-for-ai-coding-desktop-control-and-more-2151
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref9">
                            <div className="num">9</div>
                            <div className="txt">
                                Configuring MCP Servers and Skills for Antigravity CLI and IDE（Medium, Google Cloud Community）.
                                <a href="https://medium.com/google-cloud/configuring-mcp-servers-and-skills-for-antigravity-cli-and-ide-a938c7eebb78" target="_blank" rel="noopener noreferrer">
                                    https://medium.com/google-cloud/configuring-mcp-servers-and-skills-for-antigravity-cli-and-ide-a938c7eebb78
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref10">
                            <div className="num">10</div>
                            <div className="txt">
                                Google Antigravity integration guide（CoinGecko Docs）.
                                <a href="https://docs.coingecko.com/docs/ai-agent-hub/antigravity.md" target="_blank" rel="noopener noreferrer">
                                    https://docs.coingecko.com/docs/ai-agent-hub/antigravity.md
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref11">
                            <div className="num">11</div>
                            <div className="txt">
                                antigravity-sdk-rust MCP documentation.
                                <a href="https://docs.rs/crate/antigravity-sdk-rust/latest/source/docs/mcp.md" target="_blank" rel="noopener noreferrer">
                                    https://docs.rs/crate/antigravity-sdk-rust/latest/source/docs/mcp.md
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref12">
                            <div className="num">12</div>
                            <div className="txt">
                                Google Cloud: A Deep Dive into GKE Sandbox for Agents（The New Stack）.
                                <a href="https://thenewstack.io/google-cloud-a-deep-dive-into-gke-sandbox-for-agents/" target="_blank" rel="noopener noreferrer">
                                    https://thenewstack.io/google-cloud-a-deep-dive-into-gke-sandbox-for-agents/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref13">
                            <div className="num">13</div>
                            <div className="txt">
                                Google Announces GKE Agent Sandbox and Hypercluster at Next &apos;26（InfoQ）.
                                <a href="https://www.infoq.com/news/2026/05/gke-agent-sandbox-hypercluster/" target="_blank" rel="noopener noreferrer">
                                    https://www.infoq.com/news/2026/05/gke-agent-sandbox-hypercluster/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref14">
                            <div className="num">14</div>
                            <div className="txt">
                                Isolate AI code execution with Agent Sandbox（Google Cloud Docs）.
                                <a href="https://docs.cloud.google.com/kubernetes-engine/docs/how-to/agent-sandbox" target="_blank" rel="noopener noreferrer">
                                    https://docs.cloud.google.com/kubernetes-engine/docs/how-to/agent-sandbox
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref15">
                            <div className="num">15</div>
                            <div className="txt">
                                Bringing you Agent Sandbox on GKE and Agent Substrate（Google Cloud Blog）.
                                <a href="https://cloud.google.com/blog/products/containers-kubernetes/bringing-you-agent-sandbox-on-gke-and-agent-substrate" target="_blank" rel="noopener noreferrer">
                                    https://cloud.google.com/blog/products/containers-kubernetes/bringing-you-agent-sandbox-on-gke-and-agent-substrate
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref16">
                            <div className="num">16</div>
                            <div className="txt">
                                Google Cloud GKE Code Executor tool for ADK（ADK Docs）.
                                <a href="https://google.github.io/adk-docs/integrations/gke-code-executor" target="_blank" rel="noopener noreferrer">
                                    https://google.github.io/adk-docs/integrations/gke-code-executor
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref17">
                            <div className="num">17</div>
                            <div className="txt">
                                GKE Agent Sandbox and GKE Pod Snapshots: Zero trust security for AI Agents at scale（Medium, Google Cloud Community）.
                                <a href="https://medium.com/google-cloud/gke-agent-sandbox-and-gke-pod-snapshots-zero-trust-security-for-ai-agents-at-scale-559261ee20b5" target="_blank" rel="noopener noreferrer">
                                    https://medium.com/google-cloud/gke-agent-sandbox-and-gke-pod-snapshots-zero-trust-security-for-ai-agents-at-scale-559261ee20b5
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref18">
                            <div className="num">18</div>
                            <div className="txt">
                                Using Chrome Remote Desktop to run Antigravity on a Cloud Workstation（Medium, Google Cloud Community）.
                                <a href="https://medium.com/google-cloud/using-chrome-remote-desktop-to-run-antigravity-on-a-cloud-workstation-or-just-in-a-container-d00296425a0f" target="_blank" rel="noopener noreferrer">
                                    https://medium.com/google-cloud/using-chrome-remote-desktop-to-run-antigravity-on-a-cloud-workstation-or-just-in-a-container-d00296425a0f
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref19">
                            <div className="num">19</div>
                            <div className="txt">
                                Running Antigravity on a browser tab（Medium, Google Cloud Community）.
                                <a href="https://medium.com/google-cloud/running-antigravity-on-a-browser-tab-6298bb7e47c4" target="_blank" rel="noopener noreferrer">
                                    https://medium.com/google-cloud/running-antigravity-on-a-browser-tab-6298bb7e47c4
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref20">
                            <div className="num">20</div>
                            <div className="txt">
                                Data Agent Kit overview（Google Cloud Docs）.
                                <a href="https://docs.cloud.google.com/data-agent-kit/overview" target="_blank" rel="noopener noreferrer">
                                    https://docs.cloud.google.com/data-agent-kit/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref21">
                            <div className="num">21</div>
                            <div className="txt">
                                iamaanahmad/everything-antigravity releases（GitHub）.
                                <a href="https://github.com/iamaanahmad/everything-antigravity/releases" target="_blank" rel="noopener noreferrer">
                                    https://github.com/iamaanahmad/everything-antigravity/releases
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref22">
                            <div className="num">22</div>
                            <div className="txt">
                                Antigravity CLI Setup（claude-mem Docs）.
                                <a href="https://docs.claude-mem.ai/antigravity-cli/setup.md" target="_blank" rel="noopener noreferrer">
                                    https://docs.claude-mem.ai/antigravity-cli/setup.md
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref23">
                            <div className="num">23</div>
                            <div className="txt">
                                Google Antigravity integration（SonarSource Docs）.
                                <a href="https://docs.sonarsource.com/sonarqube-cli/integrations/antigravity" target="_blank" rel="noopener noreferrer">
                                    https://docs.sonarsource.com/sonarqube-cli/integrations/antigravity
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref24">
                            <div className="num">24</div>
                            <div className="txt">
                                Shubhamsaboo/agents-cli（GitHub）.
                                <a href="https://github.com/Shubhamsaboo/agents-cli" target="_blank" rel="noopener noreferrer">
                                    https://github.com/Shubhamsaboo/agents-cli
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref25">
                            <div className="num">25</div>
                            <div className="txt">
                                Getting Started — agents-cli（公式ドキュメント）.
                                <a href="https://google.github.io/agents-cli/guide/getting-started/" target="_blank" rel="noopener noreferrer">
                                    https://google.github.io/agents-cli/guide/getting-started/
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref26">
                            <div className="num">26</div>
                            <div className="txt">
                                Build an agent with ADK and Agents CLI in Agent Platform（Google Cloud Docs）.
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/quickstart-adk" target="_blank" rel="noopener noreferrer">
                                    https://docs.cloud.google.com/gemini-enterprise-agent-platform/agents/quickstart-adk
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref27">
                            <div className="num">27</div>
                            <div className="txt">
                                I/O &apos;26 news for agent developers on Google Cloud（Google Cloud Blog）.
                                <a href="https://cloud.google.com/blog/topics/developers-practitioners/io26-news-for-agent-developers-on-google-cloud" target="_blank" rel="noopener noreferrer">
                                    https://cloud.google.com/blog/topics/developers-practitioners/io26-news-for-agent-developers-on-google-cloud
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref28">
                            <div className="num">28</div>
                            <div className="txt">
                                Agent Registry overview（Google Cloud Docs）.
                                <a href="https://docs.cloud.google.com/agent-registry/overview" target="_blank" rel="noopener noreferrer">
                                    https://docs.cloud.google.com/agent-registry/overview
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref29">
                            <div className="num">29</div>
                            <div className="txt">
                                Agent Registry release notes（Google Cloud Docs）.
                                <a href="https://docs.cloud.google.com/agent-registry/release-notes" target="_blank" rel="noopener noreferrer">
                                    https://docs.cloud.google.com/agent-registry/release-notes
                                </a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref30">
                            <div className="num">30</div>
                            <div className="txt">
                                Skill Registry overview（Google Cloud Docs）.
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry" target="_blank" rel="noopener noreferrer">
                                    https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/skill-registry
                                </a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
