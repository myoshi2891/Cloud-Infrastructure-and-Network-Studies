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

export default function Section3Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const totalChecklist = 16;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    const handleCheckChange = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="agentic-section3-page">
            <div className="layout">
                <NavBar />
                <main className="main">

                <div className="hero">
                    <div className="kicker">Professional Agentic Architect &middot; Section 3</div>
                    <h1>
                        Google Cloud Professional Agentic Architect(ベータ試験) セクション3:
                        カスタムエージェントの開発 完全ガイド
                    </h1>
                    <div className="meta-row">
                        <span className="pill">配点 <strong>約33%</strong></span>
                        <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 15点</strong></span>
                        <span className="pill">参考文献 <strong>50件</strong></span>
                    </div>
                </div>

                <h2 id="この記事について">この記事について</h2>

                <p>
                    本記事は、Google Cloud Professional Agentic Architect(ベータ試験)の<strong
                        >セクション3: Developing custom agents</strong
                    >(カスタムエージェントの開発、出題比率
                    約33%)を、初学者にもわかりやすいようステップバイステップで解説する技術ガイドです。
                </p>

                <p>
                    セクション3は5つの出題セクションの中で最大の出題比率(約33%)を占めており、次の3つの中項目で構成されています。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">中項目</th>
                                <th scope="col">タイトル</th>
                                <th scope="col">主な出題内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>3.1</td>
                                <td>コードによるエージェントワークフローの設計と構築</td>
                                <td>言語モデルの選定、ADK、セッションとメモリ、Agents CLI</td>
                            </tr>
                            <tr className="even">
                                <td>3.2</td>
                                <td>エンタープライズドメイン知識の統合</td>
                                <td>
                                    RAGパイプライン、ベクトル検索、Agent Identity、Agent Registry
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>3.3</td>
                                <td>エージェントワークフローのオーケストレーションと調整</td>
                                <td>MCP/A2Aプロトコル、マルチエージェントパターン</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    本記事は公式試験ガイドPDF(2026年9月時点の最新版)と、Google
                    Cloud公式ドキュメント・公式ブログを直接調査したうえで作成しています。出題文言はできる限り原文の意図を保ったまま日本語で解説し、各項目の末尾には根拠となる一次情報源をURL付きの脚注として明記しています。
                </p>

                <p>
                    ASCIIアートによる図解は使用せず、すべての図はMermaid記法で作成し、表形式の情報はMarkdownテーブルで整理しています。
                </p>

                <p>
                    <strong>前提知識</strong>: 本記事は<a
                        href="https://cloud.google.com/learn/certification/agentic-architect"
                        >セクション1(ローコードツールでのエージェント構築)</a
                    >および<a href="https://cloud.google.com/learn/certification/agentic-architect"
                        >セクション2(コーディングエージェントを使用したアプリケーション開発)</a
                    >の内容を前提としています。特にAgents CLI、Antigravity、Skill
                    Registryの基本概念は本記事でも再度登場するため、未読の場合は先にセクション1・2のガイドに目を通すことをお勧めします。
                </p>

                <hr />

                <h2 id="セクション3の全体像">セクション3の全体像</h2>

                <p>
                    まず、3.1〜3.3がどのように関連しているかを俯瞰します。3.1は「エージェント単体をコードでどう作るか」、3.2は「そのエージェントに企業データの知識と権限をどう持たせるか」、3.3は「複数のエージェントをどう協調させ、統制するか」という段階的な関係になっています。
                </p>

                <Diagram id="diag-1" ariaLabel="セクション3 全体像: コード構築、知識統合、オーケストレーションの関係を示すフローチャート" />

                <p>
                    セクション3で扱う主要サービス・概念は次のとおりです(試験ガイドの「対象ツール」リストに準拠)<a
                        className="footnote-ref"
                        href="#ref1"
                        id="fnref1"
                        role="doc-noteref"
                        ><sup>1</sup></a
                    >。
                </p>

                <ul>
                    <li><strong>Agent Development Kit (ADK)</strong></li>{' '}
                    <li><strong>Agent Retrieval / Vector Search 1.0</strong></li>{' '}
                    <li><strong>Agent Registry</strong></li>{' '}
                    <li><strong>Agent Identity</strong></li>{' '}
                    <li><strong>Agentic protocols(A2A、MCP)</strong></li>{' '}
                    <li><strong>Agents CLI in Agent Platform</strong></li>{' '}
                    <li><strong>Model Garden</strong></li>{' '}
                    <li><strong>RAG Engine</strong></li>{' '}
                    <li><strong>Skill Registry</strong></li>{' '}
                    <li>
                        <strong>BigQuery、Cloud SQL、Cloud Storage、Firestore</strong
                        >(RAGやツール連携先としてのデータストア)
                    </li>
                </ul>

                <hr />

                <h2 id="31-コードによるエージェントワークフローの設計と構築">
                    3.1 コードによるエージェントワークフローの設計と構築
                </h2>

                <p>
                    出題文言(原文)は次のとおりです<a
                        className="footnote-ref"
                        href="#ref1"
                        id="fnref2"
                        role="doc-noteref"
                        ><sup>1</sup></a
                    >。
                </p>

                <p>3.1 Designing and building agentic workflows in code. Considerations include:</p>

                <ul>
                    <li>
                        Selecting and configuring the appropriate language model(LLM vs.
                        SLM、self-hosted vs. SaaS、OSS vs. proprietary LLM)considering cost,
                        security, and agent architecture
                    </li>{' '}
                    <li>
                        Building custom agents using open-source libraries(e.g., Agent Development
                        Kit [ADK])
                    </li>{' '}
                    <li>
                        Configuring sessions and memory(e.g., Agent Platform Memory Bank and managed
                        sessions)
                    </li>{' '}
                    <li>
                        Configuring skills using Agents CLI(e.g., plugins and agent vs. human mode)
                    </li>
                </ul>

                <h3 id="311-言語モデルの選定基準">3.1.1 言語モデルの選定基準</h3>

                <p>
                    カスタムエージェントを構築する際、最初に決めるべきはどのモデルを土台に使うかです。試験では「コスト・セキュリティ・エージェントアーキテクチャ」の3つの観点から、以下の3つの軸でモデルを選定する能力が問われます。
                </p>

                <h4>軸1: LLM vs. SLM(大規模言語モデル vs. 小規模言語モデル)</h4>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">LLM(大規模言語モデル)</th>
                                <th scope="col">SLM(小規模言語モデル)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>パラメータ規模の目安</td>
                                <td>数百億〜数兆パラメータ級(Gemini、Claude Opus/Fable系など)</td>
                                <td>数億〜十数B程度(Gemma、Gemini Nano系など)</td>
                            </tr>
                            <tr className="even">
                                <td>得意なタスク</td>
                                <td>
                                    オープンエンドな推論、複雑な多段階タスク、幅広い知識を要する対話
                                </td>
                                <td>
                                    定型的・反復的・分類的なタスク、ツール呼び出し中心のエージェントループ
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>レイテンシ</td>
                                <td>高め(数百ミリ秒〜数秒)</td>
                                <td>低め(数十〜数百ミリ秒)</td>
                            </tr>
                            <tr className="even">
                                <td>コスト</td>
                                <td>トークン単価が高い</td>
                                <td>トークン単価が低く高頻度呼び出しに向く</td>
                            </tr>
                            <tr className="odd">
                                <td>実行環境</td>
                                <td>基本的にクラウド</td>
                                <td>エッジデバイス・オンデバイス・単一GPUでも稼働可能</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    エージェント設計の実務では、<strong>「エージェントのループは基本的に少数の専門タスクを反復するだけ</strong>」という性質から、ハイブリッド構成(定型作業はSLMに任せ、判断が難しいケースのみLLMにエスカレーションする)が主流のアーキテクチャパターンになっています<a
                        className="footnote-ref"
                        href="#ref2"
                        id="fnref3"
                        role="doc-noteref"
                        ><sup>2</sup></a
                    ><a className="footnote-ref" href="#ref3" id="fnref4" role="doc-noteref"
                        ><sup>3</sup></a
                    >。この設計判断ができるかどうかは、コスト最適化とエージェントアーキテクチャ設計の両面で試験の評価対象になります。
                </p>

                <Diagram id="diag-2" ariaLabel="軸1 言語モデル選定フローチャート: タスク性質分析からLLM、SLM、ハイブリッド構成への分岐" />

                <h4>軸2: self-hosted vs. SaaS(自己ホスト型 vs. マネージドサービス型)</h4>

                <p>
                    Model
                    Gardenでは、モデルの入手・運用方法として大きく2つの選択肢が用意されています<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref5"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    ><a className="footnote-ref" href="#ref5" id="fnref6" role="doc-noteref"
                        ><sup>5</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">Model-as-a-Service (MaaS)</th>
                                <th scope="col">Self-deployed(自己デプロイ)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>概要</td>
                                <td>
                                    サーバーレスでデプロイ作業不要。トークン課金で即座に利用可能
                                </td>
                                <td>
                                    自組織のGoogle
                                    CloudプロジェクトとVPCネットワーク内に、GPU/TPUを確保して自分でモデルをホスト
                                </td>
                            </tr>
                            <tr className="even">
                                <td>対象モデル例</td>
                                <td>
                                    Gemini、Claude(Anthropicのレート課金)、多くのオープンウェイトモデル
                                </td>
                                <td>
                                    Gemma、Llama、Hugging
                                    Face上のモデル、パートナーのプロプライエタリモデル(Cloud
                                    Marketplace経由でライセンス購入)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>インフラ管理</td>
                                <td>不要(Googleが管理)</td>
                                <td>
                                    必要(オンデマンドハードウェアまたは既存のCompute
                                    Engine予約/確約利用割引を利用)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>適したケース</td>
                                <td>迅速な立ち上げ、変動する需要、運用負荷を抑えたい場合</td>
                                <td>
                                    データ主権・VPC内完結が必要な場合、細かいレイテンシ/スループット制御が必要な場合
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    Model
                    Gardenには200以上の基盤モデルがGoogle・パートナー・オープンソースコミュニティから提供されており、探索・実験のための単一のカタログとして機能します<a
                        className="footnote-ref"
                        href="#ref5"
                        id="fnref7"
                        role="doc-noteref"
                        ><sup>5</sup></a
                    >。
                </p>

                <h4>軸3: OSS vs. proprietary LLM(オープンソース vs. プロプライエタリ)</h4>

                <p>
                    ここでの分類は「オープンウェイト」と「オープンソース」の違いを正しく理解しているかがポイントです<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref8"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>

                <ul>
                    <li>
                        <strong>オープンウェイトモデル</strong>:
                        学習済みの重み(パラメータ)が公開されているモデル。推論やチューニングに利用できるが、学習データやアーキテクチャの詳細、学習コードまでは公開されていないことが多い(例:
                        Gemma、多くのLlamaモデル)。
                    </li>{' '}
                    <li>
                        <strong>オープンソースモデル</strong>:
                        重みに加えて、学習データ・学習コードを含むコードベース全体が公開されているモデル。透明性が最も高い。
                    </li>{' '}
                    <li>
                        <strong>プロプライエタリモデル</strong>:
                        重みも学習詳細も非公開。API経由でのみ利用可能(例:
                        Gemini、Claude、GPT系)。Model
                        Garden経由でパートナーのプロプライエタリモデルをセルフデプロイ用にライセンス購入することも可能<a
                            className="footnote-ref"
                            href="#ref4"
                            id="fnref9"
                            role="doc-noteref"
                            ><sup>4</sup></a
                        >。
                    </li>
                </ul>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                コスト・レイテンシ・プライバシー要件が厳しい高頻度タスクにはSLM、複雑な推論やオープンドメインの対話にはLLMという<strong>ハイブリッドルーティング</strong>を基本設計にする<a
                                    className="footnote-ref"
                                    href="#ref2"
                                    id="fnref10"
                                    role="doc-noteref"
                                    ><sup>2</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref3"
                                    id="fnref11"
                                    role="doc-noteref"
                                    ><sup>3</sup></a
                                >。
                            </li>{' '}
                            <li>
                                データを外部に出せない規制業種では、self-hosted(自己デプロイ)かつオープンウェイトモデルの組み合わせを優先的に検討する<a
                                    className="footnote-ref"
                                    href="#ref4"
                                    id="fnref12"
                                    role="doc-noteref"
                                    ><sup>4</sup></a
                                >。
                            </li>{' '}
                            <li>
                                モデル選定は一度きりの意思決定ではなく、Model
                                Gardenのモデルカードで提供されるベンチマークやライセンス条件を継続的に確認し、評価セット(セクション4で扱うADK
                                Evaluationなど)で比較検証する。
                            </li>{' '}
                            <li>
                                ADKはGeminiに最適化されている一方でモデルに依存しない(model-agnostic)設計になっており、LiteLLM統合を介してAnthropic・Meta・Mistral
                                AI・AI21 Labsなど多様なプロバイダのモデルを選択できる<a
                                    className="footnote-ref"
                                    href="#ref6"
                                    id="fnref13"
                                    role="doc-noteref"
                                    ><sup>6</sup></a
                                >。この柔軟性を活かし、エージェントごとに最適なモデルを使い分けることが推奨される。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h3 id="312-agent-development-kit-adk-によるカスタムエージェント構築">
                    3.1.2 Agent Development Kit (ADK) によるカスタムエージェント構築
                </h3>

                <p><strong>ADKとは何か</strong></p>

                <p>
                    Agent Development
                    Kit(ADK)は、AIエージェントの構築・デバッグ・デプロイを行うためのオープンソースかつモジュール式のフレームワークです<a
                        className="footnote-ref"
                        href="#ref7"
                        id="fnref14"
                        role="doc-noteref"
                        ><sup>7</sup></a
                    >。Gemini・Googleエコシステムに最適化されている一方でモデルに依存せず(model-agnostic)、デプロイ環境にも依存しない(deployment-agnostic)設計となっており、Python・TypeScript・Go・Javaの4言語でSDKが提供されています<a
                        className="footnote-ref"
                        href="#ref7"
                        id="fnref15"
                        role="doc-noteref"
                        ><sup>7</sup></a
                    ><a className="footnote-ref" href="#ref6" id="fnref16" role="doc-noteref"
                        ><sup>6</sup></a
                    >。
                </p>

                <p>
                    ADKは元々2025年のGoogle Cloud
                    NEXTで発表されたオープンソースフレームワークで、AgentspaceやGoogle Customer
                    Engagement
                    Suite(CES)など、Google自身のプロダクト内のエージェントを支える基盤としても使われています<a
                        className="footnote-ref"
                        href="#ref8"
                        id="fnref17"
                        role="doc-noteref"
                        ><sup>8</sup></a
                    >。
                </p>

                <p>
                    ADKが提供する主要な能力は次の3つに整理できます<a
                        className="footnote-ref"
                        href="#ref9"
                        id="fnref18"
                        role="doc-noteref"
                        ><sup>9</sup></a
                    ><a className="footnote-ref" href="#ref8" id="fnref19" role="doc-noteref"
                        ><sup>8</sup></a
                    >。
                </p>

                <ol>
                    <li>
                        <strong>Multi-Agent by Design(マルチエージェント前提の設計)</strong>:
                        複数の専門特化エージェントを階層構造に組み合わせて、モジュール化・スケーラブルなアプリケーションを構築できる。複雑な調整・委譲(delegation)を実現する。
                    </li>{' '}
                    <li>
                        <strong>Rich Model Ecosystem(豊富なモデルエコシステム)</strong>:
                        Geminiに限らず、Vertex AI Model
                        Garden経由でアクセス可能な任意のモデルを選択可能。LiteLLM統合によりAnthropic、Meta、Mistral
                        AI、AI21 Labsなど多数のプロバイダのモデルを利用できる<a
                            className="footnote-ref"
                            href="#ref8"
                            id="fnref20"
                            role="doc-noteref"
                            ><sup>8</sup></a
                        >。
                    </li>{' '}
                    <li>
                        <strong>Rich Tool Ecosystem(豊富なツールエコシステム)</strong>:
                        サードパーティアプリケーションや独自コードを統合するためのツールエコシステムを備え、組み込み評価ツールやパートナー評価ツールで実行トラジェクトリをテストできる<a
                            className="footnote-ref"
                            href="#ref9"
                            id="fnref21"
                            role="doc-noteref"
                            ><sup>9</sup></a
                        >。
                    </li>
                </ol>

                <Diagram id="diag-3" ariaLabel="ADKによるエージェント階層構造: ルートエージェントと専門サブエージェントおよびツールの構成" />

                <p><strong>ADKの開発ライフサイクル</strong></p>

                <p>
                    ADKは、エージェント開発ライフサイクル全体(構築→実行→評価→スケール)を一貫してサポートするよう設計されています<a
                        className="footnote-ref"
                        href="#ref9"
                        id="fnref22"
                        role="doc-noteref"
                        ><sup>9</sup></a
                    >。
                </p>

                <ol>
                    <li>
                        ローカルでエージェントを構築し、ブラウザベースの開発UIまたはターミナルで対話的に実行してテストする<a
                            className="footnote-ref"
                            href="#ref10"
                            id="fnref23"
                            role="doc-noteref"
                            ><sup>10</sup></a
                        >。
                    </li>{' '}
                    <li>ツール(組み込みツール、MCPツール、カスタム関数ツール)を追加する。</li>{' '}
                    <li>
                        サブエージェントを追加し、オーケストレーター(親エージェント)またはA2Aプロトコル経由で連携させる。
                    </li>{' '}
                    <li>セッションとメモリを構成する(3.1.3で詳述)。</li>{' '}
                    <li>必要に応じてHuman-in-the-Loop(人間による承認)ワークフローを組み込む。</li>{' '}
                    <li>Webインターフェースやロガーでログ・デバッグを行う。</li>{' '}
                    <li>Web UIやCI/CDパイプラインで評価を実行する。</li>{' '}
                    <li>
                        Agent Runtime、Cloud Run、GKEのいずれかにデプロイする<a
                            className="footnote-ref"
                            href="#ref9"
                            id="fnref24"
                            role="doc-noteref"
                            ><sup>9</sup></a
                        >。
                    </li>
                </ol>

                <p><strong>推奨されるデプロイ先</strong></p>

                <p>
                    Googleは、ADKエージェントのデプロイ先として<strong>Agent Runtime</strong
                    >(旧Agent Engine)を推奨しています。Agent
                    Runtimeは、ADKなどのフレームワークで構築されたAIエージェントのデプロイ・管理・スケーリングに特化したフルマネージドのGoogle
                    Cloudサービスです<a
                        className="footnote-ref"
                        href="#ref7"
                        id="fnref25"
                        role="doc-noteref"
                        ><sup>7</sup></a
                    >。
                </p>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                単一の巨大なエージェントに全ロジックを詰め込むのではなく、責務ごとにサブエージェントを分割し、ルートエージェントが委譲(delegation)する階層構造を基本とする<a
                                    className="footnote-ref"
                                    href="#ref9"
                                    id="fnref26"
                                    role="doc-noteref"
                                    ><sup>9</sup></a
                                >。
                            </li>{' '}
                            <li>
                                ローカル開発時はADKの対話型開発UI(ブラウザベース)を活用し、ツール呼び出しやエージェント間の委譲を可視化しながらデバッグする<a
                                    className="footnote-ref"
                                    href="#ref10"
                                    id="fnref27"
                                    role="doc-noteref"
                                    ><sup>10</sup></a
                                >。
                            </li>{' '}
                            <li>
                                モデル選定は3.1.1の基準に基づき、サブエージェントごとに異なるモデル(例:
                                ルーターはSLM、専門タスクはLLM)を使い分けることも検討する。
                            </li>{' '}
                            <li>
                                本番デプロイでは自前でインフラを構築するのではなく、Agent
                                Runtimeのマネージド機能(セッション管理・スケーリング・オブザーバビリティ統合)を活用する<a
                                    className="footnote-ref"
                                    href="#ref7"
                                    id="fnref28"
                                    role="doc-noteref"
                                    ><sup>7</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h3 id="313-セッションとメモリの設定">3.1.3 セッションとメモリの設定</h3>

                <p>
                    エージェントが「今の会話の文脈」と「過去の会話をまたいだ記憶」の両方をどう扱うかは、実運用エージェントの品質を大きく左右します。Gemini
                    Enterprise Agent
                    Platformでは、この2つの役割が明確に分離された2つのマネージドサービスとして提供されています<a
                        className="footnote-ref"
                        href="#ref11"
                        id="fnref29"
                        role="doc-noteref"
                        ><sup>11</sup></a
                    ><a className="footnote-ref" href="#ref12" id="fnref30" role="doc-noteref"
                        ><sup>12</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機能</th>
                                <th scope="col">Agent Platform Sessions</th>
                                <th scope="col">Agent Platform Memory Bank</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>役割</td>
                                <td>
                                    単一のエージェントとのやり取りにおける、状態データとコンテキストの管理
                                </td>
                                <td>複数セッションをまたいだ永続的な記憶の保持と呼び出し</td>
                            </tr>
                            <tr className="even">
                                <td>スコープ</td>
                                <td>1回の継続的な会話(短期)</td>
                                <td>ユーザー(アイデンティティ)単位での長期記憶</td>
                            </tr>
                            <tr className="odd">
                                <td>中核概念</td>
                                <td>
                                    <strong>Session</strong
                                    >(ユーザーとエージェント間の一連のやり取りの時系列記録)、<strong>Event</strong>(会話内容や関数呼び出しなどのアクションを格納する柔軟なスキーマ)
                                </td>
                                <td>LLMによる知識抽出、パーソナライズされたメモリプロファイル</td>
                            </tr>
                            <tr className="even">
                                <td>ADKとの統合</td>
                                <td>
                                    ADKエージェントをAgent
                                    Platformにデプロイすると自動的にセッション管理される
                                </td>
                                <td>
                                    セッション終了時に<code>add_session_to_memory</code>(ADK)または<code>GenerateMemories</code>/<code
                                        >IngestEvents</code
                                    >
                                    APIを明示的に呼び出すことで、セッションのイベント列を情報源にメモリが生成される(イベントが蓄積されるだけでは生成されない)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-4" ariaLabel="セッションとMemory Bankの協調シーケンス図: 会話履歴の蓄積と長期記憶の抽出・再利用" />

                <p>
                    <strong>Memory Bankの主な用途</strong
                    ><a className="footnote-ref" href="#ref12" id="fnref31" role="doc-noteref"
                        ><sup>12</sup></a
                    >
                </p>

                <ol>
                    <li>
                        <strong>長期パーソナライゼーション</strong>:
                        エージェントがユーザーの嗜好・履歴・重要な詳細を複数セッションにわたって記憶する。例:
                        過去の問い合わせ内容や製品の好みを覚えているカスタマーサービスエージェント。
                    </li>{' '}
                    <li>
                        <strong>LLM駆動の知識抽出</strong>:
                        会話やマルチモーダルコンテンツから重要な情報を自動的に特定・永続化する。例:
                        一連の技術論文を読み、主要な知見・手法・結論を統合したメモリを構築するリサーチエージェント。
                    </li>{' '}
                    <li>
                        <strong>動的に進化するコンテキスト</strong>:
                        静的でない知識源として、新しい情報を継続的に取り込む。
                    </li>
                </ol>

                <p><strong>リージョンとデータ所在に関する注意点</strong></p>

                <p>
                    Memory
                    Bankはスコープベースのデータ分離(アイデンティティ単位)を提供しますが、リージョン間でのメモリ混在を防ぐには、RBAC(ロールベースアクセス制御)とIAMポリシーを併用して地理的境界を強制する必要があります<a
                        className="footnote-ref"
                        href="#ref12"
                        id="fnref32"
                        role="doc-noteref"
                        ><sup>12</sup></a
                    >。Memory
                    Bankインスタンス作成時には、データが保存時にその地理的境界内に留まるよう、リージョンまたはマルチリージョンのロケーション(EU向けの<code>eu</code>、米国向けの<code>us</code>など)を選択します<a
                        className="footnote-ref"
                        href="#ref12"
                        id="fnref33"
                        role="doc-noteref"
                        ><sup>12</sup></a
                    >。2026年時点で、Memory
                    BankとSessionsはマルチリージョンおよびグローバルエンドポイントに対応してGA(一般提供)となっていますが、グローバルエンドポイントを使う場合はCMEK(顧客管理暗号鍵)が利用できない点に注意が必要です<a
                        className="footnote-ref"
                        href="#ref13"
                        id="fnref34"
                        role="doc-noteref"
                        ><sup>13</sup></a
                    >。
                </p>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                単一会話内の文脈保持にはSessions、複数回の利用をまたいだパーソナライズにはMemory
                                Bankという役割分担を明確にし、両方を組み合わせて設計する<a
                                    className="footnote-ref"
                                    href="#ref11"
                                    id="fnref35"
                                    role="doc-noteref"
                                    ><sup>11</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref12"
                                    id="fnref36"
                                    role="doc-noteref"
                                    ><sup>12</sup></a
                                >。
                            </li>{' '}
                            <li>
                                ADKでデプロイする場合、セッション管理はインフラ層で自動的に統合されるため、独自のデータベース接続やベクトルストアをアプリケーションコードに実装する必要はない<a
                                    className="footnote-ref"
                                    href="#ref12"
                                    id="fnref37"
                                    role="doc-noteref"
                                    ><sup>12</sup></a
                                >。
                            </li>{' '}
                            <li>
                                コンプライアンス要件がある場合は、Memory
                                Bankのリージョン選択とIAM/RBACによる越境防止策を必ずセットで設計する<a
                                    className="footnote-ref"
                                    href="#ref12"
                                    id="fnref38"
                                    role="doc-noteref"
                                    ><sup>12</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Memory Bankへのアクセスは、IAM
                                Conditionsを使ってきめ細かく制御できるため、テナント分離が必要なマルチテナントSaaS型エージェントでは特に活用する。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h3 id="314-agents-cliによるスキル設定">3.1.4 Agents CLIによるスキル設定</h3>

                <p><strong>Agents CLIとは</strong></p>

                <p>
                    Agents CLI(<code>google-agents-cli</code>)は、AIコーディングエージェント(Gemini
                    CLI、Claude Code、Codex、Antigravityなど)向けに設計された専用ツールで、Google
                    Cloudのエージェントスタック全体(Agent Platform、Cloud
                    Run、A2A統合など)への直接的で機械可読なインターフェースを提供します<a
                        className="footnote-ref"
                        href="#ref14"
                        id="fnref39"
                        role="doc-noteref"
                        ><sup>14</sup></a
                    >。<code>uvx google-agents-cli setup</code
                    >という1つのコマンドで、コーディングアシスタントに必要なスキルをまとめて注入できます<a
                        className="footnote-ref"
                        href="#ref14"
                        id="fnref40"
                        role="doc-noteref"
                        ><sup>14</sup></a
                    >。
                </p>

                <p>
                    セクション2で扱ったAntigravity固有のスキル・プラグイン・拡張フックとは異なり、Agents
                    CLIのスキルはADKのライフサイクル全体(スキャフォールディング・評価・デプロイ・監視)を横断してどのコーディングエージェントからも呼び出せる<strong>共通のコンテキストファイル</strong>という位置づけです<a
                        className="footnote-ref"
                        href="#ref15"
                        id="fnref41"
                        role="doc-noteref"
                        ><sup>15</sup></a
                    >。
                </p>

                <p>
                    <strong>バンドルされる7つのスキル</strong
                    ><a className="footnote-ref" href="#ref16" id="fnref42" role="doc-noteref"
                        ><sup>16</sup></a
                    ><a className="footnote-ref" href="#ref15" id="fnref43" role="doc-noteref"
                        ><sup>15</sup></a
                    >
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
                                    開発ライフサイクル全体、コード保全ルール、モデル選定の指針(常時アクティブ)
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>google-agents-cli-adk-code</code></td>
                                <td>
                                    ADKのPython
                                    API(エージェント種別、ツール定義、オーケストレーションパターン、コールバック、状態管理)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><code>google-agents-cli-scaffold</code></td>
                                <td>
                                    プロジェクトの雛形作成(<code>scaffold create</code>、<code
                                        >scaffold enhance</code
                                    >、<code>scaffold upgrade</code>)
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>google-agents-cli-eval</code></td>
                                <td>
                                    評価指標、evalsetのスキーマ、LLM-as-judge、ツールトラジェクトリのスコアリング
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><code>google-agents-cli-deploy</code></td>
                                <td>
                                    デプロイワークフロー(Agent Runtime、Cloud
                                    Run、GKE)、サービスアカウント、ロールバック
                                </td>
                            </tr>
                            <tr className="even">
                                <td><code>google-agents-cli-publish</code></td>
                                <td>
                                    ADK登録とA2A登録の使い分け、プログラマティック/対話的な公開手順
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><code>google-agents-cli-observability</code></td>
                                <td>
                                    Cloud Trace、プロンプト・レスポンスログ、BigQuery Agent
                                    Analytics、サードパーティ連携(AgentOps、Phoenix、MLflowなど)
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    このスキル群は、インストール先のコーディングエージェントが対応する形式(Claude
                    Codeのプラグイン形式、Gemini
                    CLIの拡張機能形式など)に変換されて配布されるため、試験ガイドが言う「<strong>plugins</strong>」は、Agents
                    CLIのスキルが各コーディングエージェントのプラグイン/拡張の仕組みに載せて配布・注入される形態を指していると理解すると整合的です<a
                        className="footnote-ref"
                        href="#ref14"
                        id="fnref44"
                        role="doc-noteref"
                        ><sup>14</sup></a
                    ><a className="footnote-ref" href="#ref15" id="fnref45" role="doc-noteref"
                        ><sup>15</sup></a
                    >。
                </p>

                <p><strong>Agent Mode と Human Mode</strong></p>

                <p>
                    Agents CLIは、2つの利用モードを想定して設計されています<a
                        className="footnote-ref"
                        href="#ref14"
                        id="fnref46"
                        role="doc-noteref"
                        ><sup>14</sup></a
                    ><a className="footnote-ref" href="#ref17" id="fnref47" role="doc-noteref"
                        ><sup>17</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">モード</th>
                                <th scope="col">概要</th>
                                <th scope="col">想定利用者</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><strong>Agent Mode</strong></td>
                                <td>
                                    バンドルされたスキルを介して、コーディングエージェント(Gemini
                                    CLI、Claude
                                    Codeなど)自身がCLIコマンドを判断・実行する。CLIはAIによる消費に最適化されている
                                </td>
                                <td>AIコーディングアシスタント</td>
                            </tr>
                            <tr className="even">
                                <td><strong>Human Mode</strong></td>
                                <td>
                                    開発者がターミナルやスクリプトから同じコマンドを直接実行し、決定論的(deterministic)な制御を行う。いつでも「手と目」を自分で操作できる
                                </td>
                                <td>人間の開発者</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-5" ariaLabel="Agents CLIの実行モード: Agent ModeとHuman Modeによる共通コマンド実行とデプロイフロー" />

                <p>
                    Human
                    Modeは、AIに完全に委ねるのではなく、決定論的な実行が必要な場面(本番デプロイの最終承認、機密性の高い操作など)で開発者が直接介入できるようにするためのフォールバック経路として設計されています<a
                        className="footnote-ref"
                        href="#ref17"
                        id="fnref48"
                        role="doc-noteref"
                        ><sup>17</sup></a
                    >。
                </p>

                <p><strong>ADK登録とA2A登録の使い分け(publishスキル)</strong></p>

                <p>
                    <code>google-agents-cli-publish</code
                    >スキルは、ADK形式での登録とA2A形式での登録という2つの公開モードの使い分け、プログラマティック/対話的な利用方法、デプロイメタデータからの自動検出をカバーします<a
                        className="footnote-ref"
                        href="#ref16"
                        id="fnref49"
                        role="doc-noteref"
                        ><sup>16</sup></a
                    >。これは3.3で扱うマルチエージェント連携の土台となる知識です。
                </p>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                チーム全体でエージェント開発を標準化する場合、個々の開発者が手作業でCLIコマンドを覚えるのではなく、<code
                                    >agents-cli setup</code
                                >でコーディングエージェントにスキルを注入し、Agent
                                Modeでの半自動運用を基本にする<a
                                    className="footnote-ref"
                                    href="#ref14"
                                    id="fnref50"
                                    role="doc-noteref"
                                    ><sup>14</sup></a
                                >。
                            </li>{' '}
                            <li>
                                本番デプロイやシークレットに関わる操作など、取り返しのつかない操作はHuman
                                Modeで明示的に実行し、監査可能な形でログを残す<a
                                    className="footnote-ref"
                                    href="#ref17"
                                    id="fnref51"
                                    role="doc-noteref"
                                    ><sup>17</sup></a
                                >。
                            </li>{' '}
                            <li>
                                前提条件(Python
                                3.11以上、<code>uv</code>、Node.js)を満たした上で、<code
                                    >uvx google-agents-cli setup</code
                                >のほか<code>pipx</code>や<code>venv</code>+<code>pip</code>でもインストール可能であることを把握しておく<a
                                    className="footnote-ref"
                                    href="#ref16"
                                    id="fnref52"
                                    role="doc-noteref"
                                    ><sup>16</sup></a
                                >。
                            </li>{' '}
                            <li>
                                既にgcloudで認証済みであれば、Agents CLIはApplication Default
                                Credentialsを自動的に利用するため、追加の認証設定は基本的に不要<a
                                    className="footnote-ref"
                                    href="#ref16"
                                    id="fnref53"
                                    role="doc-noteref"
                                    ><sup>16</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h2 id="32-エンタープライズドメイン知識の統合">
                    3.2 エンタープライズドメイン知識の統合
                </h2>

                <p>
                    出題文言(原文)は次のとおりです<a
                        className="footnote-ref"
                        href="#ref1"
                        id="fnref54"
                        role="doc-noteref"
                        ><sup>1</sup></a
                    >。
                </p>

                <p>3.2 Integrating enterprise domain knowledge. Considerations include:</p>

                <ul>
                    <li>
                        Designing, configuring, and managing retrieval-augmented generation (RAG)
                        pipelines and vector retrieval systems(e.g., embedding models, similarity
                        scoring, and reranking)using appropriate services such as vector
                        databases(e.g., Vector Search and Agent Retrieval)
                    </li>{' '}
                    <li>Configuring agent permissions(e.g., Agent Identity)</li>{' '}
                    <li>
                        Using Google Cloud tools(e.g., Agent Registry, Google Cloud MCP Servers)to
                        configure prebuilt and custom capabilities(e.g., custom integration layers
                        for managed databases, API integrations, and MCP server that connects agents
                        to third-party SaaS tools and remote servers)
                    </li>
                </ul>

                <h3 id="321-ragパイプラインとベクトル検索システムの設計">
                    3.2.1 RAGパイプラインとベクトル検索システムの設計
                </h3>

                <p><strong>RAG Engineとは</strong></p>

                <p>
                    RAG Engineは、Gemini Enterprise Agent
                    Platformのコンポーネントの1つで、検索拡張生成(Retrieval-Augmented Generation,
                    RAG)を実現するデータフレームワークです<a
                        className="footnote-ref"
                        href="#ref18"
                        id="fnref55"
                        role="doc-noteref"
                        ><sup>18</sup></a
                    >。LLMは組織固有の非公開データを理解できないという問題を、RAG
                    Engineによって外部知識をLLMのコンテキストに追加することで解決し、ハルシネーションを減らしより正確な回答を可能にします<a
                        className="footnote-ref"
                        href="#ref18"
                        id="fnref56"
                        role="doc-noteref"
                        ><sup>18</sup></a
                    >。
                </p>

                <p><strong>RAGパイプラインの6ステップ</strong></p>

                <p>
                    RAG Engineの中核概念は、処理順に次の6つです<a
                        className="footnote-ref"
                        href="#ref18"
                        id="fnref57"
                        role="doc-noteref"
                        ><sup>18</sup></a
                    >。
                </p>

                <Diagram id="diag-6" ariaLabel="RAGパイプラインの6段階フロー: データ取り込みから生成までのステップ" />

                <ol>
                    <li>
                        <strong>データ取り込み(Data ingestion)</strong>: ローカルファイル、Cloud
                        Storage、Google Driveなど異なるデータソースからデータを取り込む。
                    </li>{' '}
                    <li>
                        <strong>データ変換(Data transformation)</strong>:
                        インデックス化のためにデータをチャンク(小さな断片)に分割するなど、データを準備する。
                    </li>{' '}
                    <li>
                        <strong>埋め込み(Embedding)</strong>:
                        単語やテキストを数値表現に変換する。意味的に近いテキストは高次元ベクトル空間上で近い位置に配置される。
                    </li>{' '}
                    <li>
                        <strong>データインデックス化(Data indexing)</strong>: RAG
                        Engineが「コーパス」と呼ばれるインデックスを作成する。検索に最適化された知識ベースの目次のような役割を果たす。
                    </li>{' '}
                    <li>
                        <strong>検索(Retrieval)</strong>:
                        ユーザーの質問やプロンプトに対して、コーパスの中からクエリに関連する情報を検索する。
                    </li>{' '}
                    <li>
                        <strong>生成(Generation)</strong>:
                        検索された情報を元のユーザークエリに追加するコンテキストとして与え、生成AIモデルが事実に基づいた(grounded)関連性の高い応答を生成する。
                    </li>
                </ol>

                <p><strong>ベクトルデータベースの選択肢</strong></p>

                <p>
                    RAG
                    Engineは複数のベクトルデータベースバックエンドをサポートしており、用途に応じて選択できます。公式ドキュメントの構成上、次のような選択肢が用意されています<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref58"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">バックエンド</th>
                                <th scope="col">管理主体</th>
                                <th scope="col">特徴</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>RagManagedDb</td>
                                <td>Googleが完全管理</td>
                                <td>追加設定なしで始められるデフォルトの選択肢</td>
                            </tr>
                            <tr className="even">
                                <td>Agent Retrieval(旧Vector Search 2.0)</td>
                                <td>Googleが完全管理</td>
                                <td>
                                    RAG
                                    Engineが裏側でCollectionsを管理し、プロジェクト内から直接アクセス可能
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Vector Search 1.0</td>
                                <td>Googleが管理(ユーザーがインデックス設定)</td>
                                <td>大規模なANN(近似最近傍)検索に実績があるインデックスサービス</td>
                            </tr>
                            <tr className="even">
                                <td>Feature Store</td>
                                <td>ユーザー管理</td>
                                <td>既存のFeature Store資産を再利用したい場合</td>
                            </tr>
                            <tr className="odd">
                                <td>Weaviate / Pinecone</td>
                                <td>サードパーティ</td>
                                <td>既存のベクトルDB資産・エコシステムを活かしたい場合</td>
                            </tr>
                            <tr className="even">
                                <td>Agent Search(旧Vertex AI Search)</td>
                                <td>Googleが完全管理</td>
                                <td>エンタープライズ検索機能と統合したい場合</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    <strong>Vector Search 1.0 と Agent Retrieval(旧Vector Search 2.0)の違い</strong>
                </p>

                <p>
                    試験対象ツールリストには「Agent Retrieval and Vector Search
                    1.0」として両方が明記されており、両者の違いを理解しておくことが重要です<a
                        className="footnote-ref"
                        href="#ref1"
                        id="fnref59"
                        role="doc-noteref"
                        ><sup>1</sup></a
                    ><a className="footnote-ref" href="#ref20" id="fnref60" role="doc-noteref"
                        ><sup>20</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">Vector Search 1.0</th>
                                <th scope="col">Agent Retrieval(旧Vector Search 2.0)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>位置づけ</td>
                                <td>ANN(近似最近傍)インデックスをサービスとして提供する仕組み</td>
                                <td>
                                    ゼロから設計された、自己チューニング・フルマネージドのAIネイティブ検索エンジン
                                </td>
                            </tr>
                            <tr className="even">
                                <td>管理単位</td>
                                <td>インデックス(Index)が主要リソース</td>
                                <td>
                                    Collection(関連するJSONオブジェクトの集合)と、その中のData
                                    Object
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>埋め込み生成</td>
                                <td>別途埋め込み生成が必要</td>
                                <td>
                                    組み込みモデルによる自動埋め込み生成、または独自の埋め込みを持ち込む(BYOE)ことも可能
                                </td>
                            </tr>
                            <tr className="even">
                                <td>メタデータ格納</td>
                                <td>別途Vertex AI Feature Storeが必要な場合がある</td>
                                <td>データと埋め込みを1か所に統合格納(補助的なストレージ不要)</td>
                            </tr>
                            <tr className="odd">
                                <td>検索方式</td>
                                <td>ベクトル類似度検索が中心</td>
                                <td>
                                    ベクトル類似度検索 +
                                    キーワード検索を組み合わせたハイブリッド検索(RRF: Reciprocal
                                    Rank Fusionで統合)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>料金体系</td>
                                <td>インフラベース</td>
                                <td>
                                    利用量ベース(小規模向け)とリソースベース(高チューニング向け)の2モデル
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>移行</td>
                                <td>—</td>
                                <td>
                                    専用の移行ガイドが提供されている<a
                                        className="footnote-ref"
                                        href="#ref21"
                                        id="fnref61"
                                        role="doc-noteref"
                                        ><sup>21</sup></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <Diagram id="diag-7" ariaLabel="Vector Search 1.0とAgent Retrievalのアーキテクチャ比較とハイブリッド検索" />

                <p><strong>リランキング(Reranking)</strong></p>

                <p>
                    検索精度をさらに高めるため、RAG Engineは2種類のリランカーを提供しています<a
                        className="footnote-ref"
                        href="#ref22"
                        id="fnref62"
                        role="doc-noteref"
                        ><sup>22</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">リランカー</th>
                                <th scope="col">概要</th>
                                <th scope="col">レイテンシ</th>
                                <th scope="col">精度</th>
                                <th scope="col">料金</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Agent Platform ranking API</td>
                                <td>
                                    高精度な関連度スコアリングに特化した、低レイテンシのスタンドアロン・セマンティックリランカー
                                </td>
                                <td>非常に低い(100ミリ秒未満)</td>
                                <td>最先端(state-of-the-art)レベル</td>
                                <td>RAG Engineのリクエスト単位課金</td>
                            </tr>
                            <tr className="even">
                                <td>LLM reranker</td>
                                <td>
                                    Geminiへの追加呼び出しによってチャンクとクエリの関連性を評価する
                                </td>
                                <td>高め(1〜2秒)</td>
                                <td>モデル依存</td>
                                <td>LLMのトークン課金</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    Agent Platform ranking APIを利用するにはDiscovery Engine
                    APIを有効化する必要があり、<code>RagRetrievalConfig</code>の<code>ranking.rank_service.model_name</code>にモデル名(例:{' '}<code>semantic-ranker-default@latest</code>)を指定します。LLM
                    rerankerを使う場合はGeminiモデルのみサポートされ、<code>ranking.llm_ranker.model_name</code>にモデル名を指定します<a
                        className="footnote-ref"
                        href="#ref22"
                        id="fnref63"
                        role="doc-noteref"
                        ><sup>22</sup></a
                    >。
                </p>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                低レイテンシが要求されるリアルタイムのエージェント応答には、Agent
                                Platform ranking
                                APIを優先する。高精度だが多少のレイテンシが許容される場合や、より柔軟な関連性判断ロジックが必要な場合にLLM
                                rerankerを検討する<a
                                    className="footnote-ref"
                                    href="#ref22"
                                    id="fnref64"
                                    role="doc-noteref"
                                    ><sup>22</sup></a
                                >。
                            </li>{' '}
                            <li>
                                新規プロジェクトでは、補助ストレージ不要で自動埋め込み生成・ハイブリッド検索を備えるAgent
                                Retrievalを第一候補とし、既存のVector Search
                                1.0資産がある場合は移行ガイドに沿って段階的に移行する<a
                                    className="footnote-ref"
                                    href="#ref21"
                                    id="fnref65"
                                    role="doc-noteref"
                                    ><sup>21</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref20"
                                    id="fnref66"
                                    role="doc-noteref"
                                    ><sup>20</sup></a
                                >。
                            </li>{' '}
                            <li>
                                ベクトルデータベースの選定は「管理コストを最小化したいか」「既存資産(Weaviate/Pinecone等)を活かしたいか」で判断し、RagManagedDbまたはAgent
                                RetrievalをRAG Engineのデフォルトの選択肢とする<a
                                    className="footnote-ref"
                                    href="#ref19"
                                    id="fnref67"
                                    role="doc-noteref"
                                    ><sup>19</sup></a
                                >。
                            </li>{' '}
                            <li>
                                チャンク分割(データ変換)の粒度は、埋め込みモデルのコンテキスト長や検索精度に直結するため、ドキュメントの構造(見出し・段落)に沿ったチャンク戦略を検討する。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h3 id="322-エージェント権限の設定agent-identity">
                    3.2.2 エージェント権限の設定(Agent Identity)
                </h3>

                <p><strong>Agent Identityとは</strong></p>

                <p>
                    Agent
                    Identityは、各エージェントに完全マネージドなユニークアイデンティティを付与し、セキュアなアクセス制御と監査を可能にする仕組みです<a
                        className="footnote-ref"
                        href="#ref23"
                        id="fnref68"
                        role="doc-noteref"
                        ><sup>23</sup></a
                    >。IAM、Principal Access Boundary(PAB)、VPC Service Controlsといった Google
                    のポリシーシステムと完全に統合されています<a
                        className="footnote-ref"
                        href="#ref23"
                        id="fnref69"
                        role="doc-noteref"
                        ><sup>23</sup></a
                    >。
                </p>

                <p><strong>アイデンティティの割り当てフロー</strong></p>

                <p>
                    Agent Identityは次のワークフローで認証・認可を行います<a
                        className="footnote-ref"
                        href="#ref23"
                        id="fnref70"
                        role="doc-noteref"
                        ><sup>23</sup></a
                    >。
                </p>

                <Diagram id="diag-8" ariaLabel="Agent Identityによる認証・認可シーケンス図: SPIFFE証明書とContext-Aware Access、PAB連携" />

                <p>
                    <strong>Agent Identityの主要機能</strong
                    ><a className="footnote-ref" href="#ref23" id="fnref71" role="doc-noteref"
                        ><sup>23</sup></a
                    >
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">機能</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Context-Aware Access</td>
                                <td>
                                    デフォルトでGoogle管理のポリシーがmTLSとDPoPトークンバインディングを強制し、証明書バインドされたトークンが信頼された実行環境の外で再利用されるのを防ぐ
                                </td>
                            </tr>
                            <tr className="even">
                                <td>IAM統合</td>
                                <td>標準的なIAMのAllowポリシー・Denyポリシーをサポート</td>
                            </tr>
                            <tr className="odd">
                                <td>Principal Access Boundary(PAB)</td>
                                <td>
                                    他の権限に関わらず、エージェントがアクセスできるリソースを制限する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>VPC Service Controls統合</td>
                                <td>
                                    サービス境界の保護と、境界のingress/egressルールにおけるプリンシパルとしてのエージェントアイデンティティ利用をサポート
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>監査ログ統合</td>
                                <td>
                                    エージェントが「自分自身として」動作する場合と「エンドユーザーの代理として」動作する場合の両方で、説明責任を果たせる明確な監査ログを提供
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p><strong>Principal Access Boundary(PAB)の位置づけ</strong></p>

                <p>
                    PABは「アイデンティティのファイアウォール」に例えられる仕組みで、IAMとVPC
                    Service
                    Controlsが埋めきれなかったギャップ、すなわち「アイデンティティそのものの適格性(eligibility)の制御」に対応します<a
                        className="footnote-ref"
                        href="#ref24"
                        id="fnref72"
                        role="doc-noteref"
                        ><sup>24</sup></a
                    ><a className="footnote-ref" href="#ref25" id="fnref73" role="doc-noteref"
                        ><sup>25</sup></a
                    >。
                </p>

                <ul>
                    <li>
                        <strong>黄金律</strong>:
                        あるアイデンティティが正しいIAM権限を付与されていたとしても、そのアイデンティティが認可された境界の外から来ている場合、PABはアクセスをブロックします<a
                            className="footnote-ref"
                            href="#ref25"
                            id="fnref74"
                            role="doc-noteref"
                            ><sup>25</sup></a
                        >。
                    </li>{' '}
                    <li>
                        PABポリシーは組織・フォルダ・プロジェクトといったリソースコンテナに対して境界ルールとして定義し、特定のプリンシパルセット(プロジェクト単位・フォルダ単位・組織単位・ワークフォースプール単位・ワークロードプール単位など)に紐付けます<a
                            className="footnote-ref"
                            href="#ref25"
                            id="fnref75"
                            role="doc-noteref"
                            ><sup>25</sup></a
                        >。
                    </li>{' '}
                    <li>
                        2026年時点で、Agent IdentityのIAM
                        Allow/Denyポリシーは一般提供(GA)、PABはプレビュー、Unified Access
                        Policy(UAP)は近日提供予定という位置づけです<a
                            className="footnote-ref"
                            href="#ref26"
                            id="fnref76"
                            role="doc-noteref"
                            ><sup>26</sup></a
                        >。
                    </li>
                </ul>

                <pre className="code-block">
                        <div className="code-line"><span className="tok-comment">// PABポリシー例: エージェントが特定フォルダ内のリソースにのみアクセス可能にする</span></div>
                        <div className="code-line">&#123;</div>
                        <div className="code-line">  <span className="tok-key">"name"</span>: <span className="tok-string">"organizations/ORGANIZATION_ID/locations/global/principalAccessBoundaryPolicies/example-policy"</span>,</div>
                        <div className="code-line">  <span className="tok-key">"details"</span>: &#123;</div>
                        <div className="code-line">    <span className="tok-key">"rules"</span>: [</div>
                        <div className="code-line">      &#123;</div>
                        <div className="code-line">        <span className="tok-key">"description"</span>: <span className="tok-string">"Restrict agent identity inside a folder"</span>,</div>
                        <div className="code-line">        <span className="tok-key">"resources"</span>: [</div>
                        <div className="code-line">          <span className="tok-string">"//cloudresourcemanager.googleapis.com/folder/0123456789012"</span></div>
                        <div className="code-line">        ],</div>
                        <div className="code-line">        <span className="tok-key">"effect"</span>: <span className="tok-string">"ALLOW"</span></div>
                        <div className="code-line">      &#125;</div>
                        <div className="code-line">    ]</div>
                        <div className="code-line">  &#125;</div>
                        <div className="code-line">&#125;</div>
                    </pre>

                <p>
                    このポリシーをバインドするには、次のようなコマンドを使用します<a
                        className="footnote-ref"
                        href="#ref27"
                        id="fnref77"
                        role="doc-noteref"
                        ><sup>27</sup></a
                    >。
                </p>

                <pre className="code-block">
                        <div className="code-line"><span className="tok-keyword">gcloud</span> iam principal-access-boundary-policies bindings create example-pab-binding \</div>
                        <div className="code-line">  <span className="tok-keyword">--organization</span>=organizations/ORGANIZATION_ID \</div>
                        <div className="code-line">  <span className="tok-keyword">--policy</span>=example-policy \</div>
                        <div className="code-line">  <span className="tok-keyword">--target-principal-set</span>=cloudresourcemanager.googleapis.com/organizations/ORGANIZATION_ID</div>
                    </pre>

                <p><strong>プリンシパル識別子のフォーマット</strong></p>

                <p>
                    Agent IdentityをIAM
                    Allowポリシーで使用する場合、プリンシパル識別子は次の形式に従います<a
                        className="footnote-ref"
                        href="#ref24"
                        id="fnref78"
                        role="doc-noteref"
                        ><sup>24</sup></a
                    >。
                </p>

                <pre className="code-block">
                        <div className="code-line">principal://<span className="tok-key">TRUST_DOMAIN</span>/resources/SERVICE/<span className="tok-key">RESOURCE_PATH</span></div>
                    </pre>

                <p>
                    例えば、Agent Runtime上のエージェントは次のような識別子になります<a
                        className="footnote-ref"
                        href="#ref24"
                        id="fnref79"
                        role="doc-noteref"
                        ><sup>24</sup></a
                    >。
                </p>

                <pre className="code-block">
                        <div className="code-line">principal://agents.global.org<span className="tok-number">-123456789012</span>.system.id.goog/resources/aiplatform/projects/<span className="tok-number">9876543210</span>/locations/us-central1/reasoningEngines/my-test-agent</div>
                    </pre>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                IAM権限だけに頼らず、PABを組み合わせて「万一過剰な権限が付与されてもアクセスできる範囲を物理的に制限する」多層防御を設計する<a
                                    className="footnote-ref"
                                    href="#ref25"
                                    id="fnref80"
                                    role="doc-noteref"
                                    ><sup>25</sup></a
                                >。
                            </li>{' '}
                            <li>
                                本番投入前には、PABポリシーやAgent
                                Gatewayのアクセスポリシーをドライランモード(<code>DRY_RUN</code>)でステージング環境に適用し、意図通りに機能するかをCloud
                                Audit Logsで確認してから強制モードに切り替える<a
                                    className="footnote-ref"
                                    href="#ref28"
                                    id="fnref81"
                                    role="doc-noteref"
                                    ><sup>28</sup></a
                                >。
                            </li>{' '}
                            <li>
                                エージェントが「自分自身として」動作するケースと「エンドユーザーの代理として」動作するケースを設計段階で区別し、それぞれに適した監査ログの粒度を確保する<a
                                    className="footnote-ref"
                                    href="#ref23"
                                    id="fnref82"
                                    role="doc-noteref"
                                    ><sup>23</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Agent
                                Identityはエージェント自身の権限を表すものであり、これだけでユーザーの代理(on
                                behalf of
                                user)アクセスが保証されるわけではない。ユーザーの代理でサードパーティサービスにアクセスする場合は、3-legged
                                OAuthによるユーザー同意の取得、委任トークン(アクセストークン／リフレッシュトークン)の取得、下流サービス側でのそのトークンの検証をあわせて設計する。取得したクライアントシークレットやリフレッシュトークンはSecret
                                Managerに保管し、ローテーションを含めて安全に管理する<a
                                    className="footnote-ref"
                                    href="#ref29"
                                    id="fnref83"
                                    role="doc-noteref"
                                    ><sup>29</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h3 id="323-google-cloudツールによる事前構築カスタム機能の設定">
                    3.2.3 Google Cloudツールによる事前構築・カスタム機能の設定
                </h3>

                <p><strong>Agent Registryとは</strong></p>

                <p>
                    Agent Registryは、Model Context
                    Protocol(MCP)サーバー、ツール、スタンドアロンスキル、AIエージェントを組織内で一元的に保存・検出・統制するための集中カタログです<a
                        className="footnote-ref"
                        href="#ref30"
                        id="fnref84"
                        role="doc-noteref"
                        ><sup>30</sup></a
                    >。Gemini Enterprise Agent Platformにおけるガバナンス層(governance
                    pillar)と、エージェント・サーバー・スキル・エンドポイントの統合インベントリという位置づけです<a
                        className="footnote-ref"
                        href="#ref30"
                        id="fnref85"
                        role="doc-noteref"
                        ><sup>30</sup></a
                    >。
                </p>

                <p>
                    Agent
                    Registryが解決する課題は、断片化したツールアクセス、孤立したデータ、重複した実装といった、複雑なAIデプロイにありがちな問題です<a
                        className="footnote-ref"
                        href="#ref30"
                        id="fnref86"
                        role="doc-noteref"
                        ><sup>30</sup></a
                    >。
                </p>

                <p><strong>データモデル</strong></p>

                <p>
                    Agent Registry APIは次のリソースを管理します<a
                        className="footnote-ref"
                        href="#ref30"
                        id="fnref87"
                        role="doc-noteref"
                        ><sup>30</sup></a
                    ><a className="footnote-ref" href="#ref31" id="fnref88" role="doc-noteref"
                        ><sup>31</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">リソース</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Agent</td>
                                <td>
                                    特定のスキルを持つ自律的なアクター。A2A Agent
                                    Cardから抽出されたスキルが発見の主要な手がかりとなる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>McpServer</td>
                                <td>標準化されたデータリソースとツールを提供するプロバイダ</td>
                            </tr>
                            <tr className="odd">
                                <td>Endpoint</td>
                                <td>エージェントがアクセスする対象URL(通常REST API)</td>
                            </tr>
                            <tr className="even">
                                <td>Skill</td>
                                <td>エージェントの高レベルな能力を表す</td>
                            </tr>
                            <tr className="odd">
                                <td>SkillRevision</td>
                                <td>スキルのバージョン管理単位</td>
                            </tr>
                            <tr className="even">
                                <td>Publisher</td>
                                <td>エージェント・スキルの発行元</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p><strong>自動登録 vs. 手動登録</strong></p>

                <p>
                    Agent Registryは2つの登録方式をサポートします<a
                        className="footnote-ref"
                        href="#ref32"
                        id="fnref89"
                        role="doc-noteref"
                        ><sup>32</sup></a
                    >。
                </p>

                <Diagram id="diag-9" ariaLabel="Agent RegistryによるMCPサーバー登録・カタログ化・エージェント利用フロー" />

                <ul>
                    <li>
                        <strong>自動検出</strong>: Google・Google
                        Cloudの公式リモートMCPサーバーは自動的に登録・取り込みされます。対応するGoogle
                        Cloud API(例: Compute Engine
                        API)をプロジェクトで有効化するだけで、対応するMCPサーバーとそのツールが即座に登録され、Agent
                        Registryで発見可能になります<a
                            className="footnote-ref"
                            href="#ref32"
                            id="fnref90"
                            role="doc-noteref"
                            ><sup>32</sup></a
                        >。GKE上のカスタムMCPサーバーも、Deploymentマニフェストに<code
                            >registry.gke.io/functional-type: "MCP_SERVER"</code
                        >ラベルとエンドポイント/機能を宣言するアノテーションを付与することで、自動的にイントロスペクションされ登録されます<a
                            className="footnote-ref"
                            href="#ref32"
                            id="fnref91"
                            role="doc-noteref"
                            ><sup>32</sup></a
                        >。
                    </li>{' '}
                    <li>
                        <strong>手動登録</strong>:
                        外部サーバーやカスタムAPIが提供するツールを管理・再利用したい場合は、明示的にMCPサーバーを登録する必要があります。手動登録の場合、Agent
                        Registryはエンドポイントを登録しますが自動でツールをイントロスペクションしないため、<code>toolspec.json</code>ファイルをアップロードしてツール仕様を提供する必要があります<a
                            className="footnote-ref"
                            href="#ref32"
                            id="fnref92"
                            role="doc-noteref"
                            ><sup>32</sup></a
                        >。
                    </li>
                </ul>

                <p><strong>Google Cloud MCP Servers</strong></p>

                <p>
                    Googleは複数のGoogle
                    Cloudサービスに対して公式のリモートMCPサーバーを提供しており、これらは有効化するだけでAgent
                    Registryに自動登録されます。主要なものは次のとおりです<a
                        className="footnote-ref"
                        href="#ref33"
                        id="fnref93"
                        role="doc-noteref"
                        ><sup>33</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">カテゴリ</th>
                                <th scope="col">提供されるMCPサーバー例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>データベース</td>
                                <td>
                                    AlloyDB for PostgreSQL、BigQuery、Bigtable、Cloud
                                    SQL(MySQL/PostgreSQL/SQL Server)、Firestore、Spanner
                                </td>
                            </tr>
                            <tr className="even">
                                <td>コンピュート/インフラ</td>
                                <td>
                                    Compute Engine(GCE)、Google Kubernetes Engine(GKE)、Cloud
                                    Run、Cloud Resource Manager
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ストレージ</td>
                                <td>Cloud Storage</td>
                            </tr>
                            <tr className="even">
                                <td>セキュリティ</td>
                                <td>Google Security Operations(Chronicle)</td>
                            </tr>
                            <tr className="odd">
                                <td>その他</td>
                                <td>Google Maps(Grounding Lite)、Developer Knowledge API</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    これらに加え、ローカル実行またはCloud
                    Runへのデプロイが可能なオープンソースのMCPサーバー(Google
                    Workspace、Firebase、MCP Toolbox for Databases、Google Cloud
                    Security関連、gcloud CLI連携など)も用意されています<a
                        className="footnote-ref"
                        href="#ref33"
                        id="fnref94"
                        role="doc-noteref"
                        ><sup>33</sup></a
                    >。
                </p>

                <p><strong>MCP経由でのツールディスカバリ</strong></p>

                <p>
                    MCPクライアントは<code>tools/list</code>メソッドを使ってMCPサーバーが提供するツールとその説明を取得できます。Google
                    Cloudのリモート MCP
                    サーバーでは、<code>tools/list</code>メソッド自体に認証は不要です<a
                        className="footnote-ref"
                        href="#ref34"
                        id="fnref95"
                        role="doc-noteref"
                        ><sup>34</sup></a
                    >。ただしこれは Google Cloud のリモート MCP
                    サーバーに限った挙動であり、カスタム実装やサードパーティの MCP
                    サーバーではトランスポート層での認証が必要な場合があります。ツール呼び出し時の認証要件もサーバーごとに異なるため、接続先ごとに確認してください。
                </p>

                <pre className="code-block">
                        <div className="code-line"><span className="tok-keyword">POST</span> /<span className="tok-key">TOOLSET_ENDPOINT</span> HTTP/<span className="tok-number">1.1</span></div>
                        <div className="code-line">Host: <span className="tok-key">SERVICE_NAME</span></div>
                        <div className="code-line">Content-Type: application/json</div>
                        <div className="code-line"></div>
                        <div className="code-line">&#123;</div>
                        <div className="code-line">  <span className="tok-key">"jsonrpc"</span>: <span className="tok-string">"2.0"</span>,</div>
                        <div className="code-line">  <span className="tok-key">"method"</span>: <span className="tok-string">"tools/list"</span></div>
                        <div className="code-line">&#125;</div>
                    </pre>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                標準化されたGoogle
                                CloudサービスへのアクセスにはGoogle公式のMCPサーバーを最優先で使い、独自にAPIラッパーを書かないようにする。API有効化だけでAgent
                                Registryに自動登録される利点を活かす<a
                                    className="footnote-ref"
                                    href="#ref32"
                                    id="fnref96"
                                    role="doc-noteref"
                                    ><sup>32</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref33"
                                    id="fnref97"
                                    role="doc-noteref"
                                    ><sup>33</sup></a
                                >。
                            </li>{' '}
                            <li>
                                カスタムAPIやサードパーティSaaSツールを社内で再利用可能にするには、Agent
                                Registryへの手動登録(<code>toolspec.json</code>)を通じてカタログ化し、車輪の再発明(重複実装)を防ぐ<a
                                    className="footnote-ref"
                                    href="#ref32"
                                    id="fnref98"
                                    role="doc-noteref"
                                    ><sup>32</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Agent Registryは「カタログ」であり、ポリシー執行(enforcement)はAgent
                                Gatewayが担う、という役割分担を理解する。ツールへのアクセス制御はIAMポリシーとAgent
                                Gatewayを併用して行う<a
                                    className="footnote-ref"
                                    href="#ref35"
                                    id="fnref99"
                                    role="doc-noteref"
                                    ><sup>35</sup></a
                                >。
                            </li>{' '}
                            <li>
                                高度なBigQuery操作(スケジューリング、権限管理、予約管理など)にはBigQuery
                                MCPサーバー単体ではなく、Cloud CLI
                                MCPサーバー配下の<code>run_bq_command</code>ツールを使う必要がある点に注意する<a
                                    className="footnote-ref"
                                    href="#ref36"
                                    id="fnref100"
                                    role="doc-noteref"
                                    ><sup>36</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h2 id="33-エージェントワークフローのオーケストレーションと調整">
                    3.3 エージェントワークフローのオーケストレーションと調整
                </h2>

                <p>
                    出題文言(原文)は次のとおりです<a
                        className="footnote-ref"
                        href="#ref1"
                        id="fnref101"
                        role="doc-noteref"
                        ><sup>1</sup></a
                    >。
                </p>

                <p>3.3 Orchestrating and coordinating agentic workflows. Considerations include:</p>

                <ul>
                    <li>
                        Orchestrating agents using agentic protocols(e.g., MCP and Agent2Agent
                        [A2A])
                    </li>{' '}
                    <li>
                        Selecting and coordinating multiagent handoffs and workflows(e.g., parallel
                        agents, sequential agents, and graph workflow)using Google Cloud tools(e.g.,
                        Agent Identity, Agent Registry, Agent Runtime, and agent policies)
                    </li>
                </ul>

                <h3 id="331-エージェントプロトコルによるオーケストレーション">
                    3.3.1 エージェントプロトコルによるオーケストレーション
                </h3>

                <p><strong>MCPとA2Aの役割分担</strong></p>

                <p>
                    マルチエージェントシステムを構築する上で押さえるべき最重要ポイントは、<strong>MCPとA2Aは競合する技術ではなく、補完関係にある</strong>という点です。
                </p>

                <Diagram id="diag-10" ariaLabel="MCPとAgent2Agent (A2A) プロトコルの役割分担とレイヤー構成" />

                <ul>
                    <li>
                        <strong>MCP(Model Context Protocol)</strong>:
                        エージェントとツール・データソースの間の接続を標準化するプロトコル。3.2.3で解説したGoogle
                        Cloud MCP Serversがその実装例です。
                    </li>{' '}
                    <li>
                        <strong>A2A(Agent2Agent)</strong>:
                        異なるビルダー・プラットフォームで構築されたエージェント同士が、互いを発見し、協調し、安全にタスクを委任し合うための、エージェント間コミュニケーションを標準化するオープンプロトコルです<a
                            className="footnote-ref"
                            href="#ref37"
                            id="fnref102"
                            role="doc-noteref"
                            ><sup>37</sup></a
                        >。
                    </li>
                </ul>

                <p><strong>A2Aプロトコルの技術的特徴</strong></p>

                <p>
                    A2Aは2025年4月のGoogle Cloud
                    NEXTで発表されたオープン標準で、50以上のパートナーの協力のもとApache
                    2.0ライセンスでオープンソース化され、現在はLinux
                    Foundationがガバナンスを担っています<a
                        className="footnote-ref"
                        href="#ref38"
                        id="fnref103"
                        role="doc-noteref"
                        ><sup>38</sup></a
                    ><a className="footnote-ref" href="#ref39" id="fnref104" role="doc-noteref"
                        ><sup>39</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">特徴</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>トランスポート</td>
                                <td>
                                    HTTP、Server-Sent Events(SSE)、JSON-RPC
                                    2.0(v0.3以降はgRPCもサポート)<a
                                        className="footnote-ref"
                                        href="#ref39"
                                        id="fnref105"
                                        role="doc-noteref"
                                        ><sup>39</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref40"
                                        id="fnref106"
                                        role="doc-noteref"
                                        ><sup>40</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Agent Card</td>
                                <td>
                                    <code>/.well-known/agent-card.json</code
                                    >で公開される、エージェントの身元と能力を宣伝する機械可読なJSONメタデータ(いわば「エージェントの名刺」)<a
                                        className="footnote-ref"
                                        href="#ref41"
                                        id="fnref107"
                                        role="doc-noteref"
                                        ><sup>41</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>モダリティ</td>
                                <td>
                                    テキスト・ファイル・フォーム・ストリームに対応(モダリティ非依存)
                                </td>
                            </tr>
                            <tr className="even">
                                <td>実行の不透明性</td>
                                <td>
                                    エージェントは内部ロジックや状態を公開せずに相互作用できる(opaque
                                    execution)
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>セキュリティ</td>
                                <td>
                                    v0.3でセキュリティカードの署名機能、Python
                                    SDKのクライアント側サポート拡張が追加<a
                                        className="footnote-ref"
                                        href="#ref39"
                                        id="fnref108"
                                        role="doc-noteref"
                                        ><sup>39</sup></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p><strong>A2Aのタスクライフサイクル</strong></p>

                <p>
                    A2Aプロトコルにおけるタスクは、次の状態遷移を経て進行します<a
                        className="footnote-ref"
                        href="#ref40"
                        id="fnref109"
                        role="doc-noteref"
                        ><sup>40</sup></a
                    >。
                </p>

                <Diagram id="diag-11" ariaLabel="A2Aタスクライフサイクル状態遷移図: submittedからworking、completed等の遷移" />

                <p><strong>Google CloudにおけるA2Aエージェントの登録・実行</strong></p>

                <p>
                    Gemini Enterpriseでは、A2Aエージェントを「Custom agent via
                    A2A」として登録でき、Agent Cardの内容をJSON形式で入力します<a
                        className="footnote-ref"
                        href="#ref37"
                        id="fnref110"
                        role="doc-noteref"
                        ><sup>37</sup></a
                    >。Cloud
                    Run上でA2Aエージェントをホストする場合、サービング・オーケストレーション層(Cloud
                    Run)がGeminiやVertex AIなどのAIモデル、AlloyDBやA2A
                    TaskStoreなどのメモリストレージ、APIを介した外部ツールとのやり取りを管理します<a
                        className="footnote-ref"
                        href="#ref42"
                        id="fnref111"
                        role="doc-noteref"
                        ><sup>42</sup></a
                    >。
                </p>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                エージェントとツール・データの接続にはMCP、エージェント同士の協調・タスク委任にはA2Aという役割分担を明確にし、両方を組み合わせてアーキテクチャを設計する。
                            </li>{' '}
                            <li>
                                異なるベンダー・フレームワーク(LangGraph、BeeAIなど)のエージェントと連携する必要がある場合は、A2A準拠のサーバー/クライアントとして公開することで統合コストをO(N²)からO(N)に近づけられる<a
                                    className="footnote-ref"
                                    href="#ref43"
                                    id="fnref112"
                                    role="doc-noteref"
                                    ><sup>43</sup></a
                                >。
                            </li>{' '}
                            <li>
                                A2Aエージェントを登録する際は、Agent2Agent
                                Protocol公式仕様に記載されたAgent
                                Cardの必須フィールドを確認し、バージョン(0.3または1.0)の互換性をAgent
                                Registry側の対応状況と照合する<a
                                    className="footnote-ref"
                                    href="#ref31"
                                    id="fnref113"
                                    role="doc-noteref"
                                    ><sup>31</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref37"
                                    id="fnref114"
                                    role="doc-noteref"
                                    ><sup>37</sup></a
                                >。
                            </li>{' '}
                            <li>
                                ADKで構築した既存エージェントは、A2Aサーバーとして公開する、あるいはA2Aエージェントをサブエージェントとして取り込むことで、双方向にA2Aエコシステムへ組み込むことができる<a
                                    className="footnote-ref"
                                    href="#ref44"
                                    id="fnref115"
                                    role="doc-noteref"
                                    ><sup>44</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h3 id="332-マルチエージェントのハンドオフとワークフローの調整">
                    3.3.2 マルチエージェントのハンドオフとワークフローの調整
                </h3>

                <p><strong>ADKのワークフローエージェント4パターン</strong></p>

                <p>
                    ADKは、複数のサブエージェントをどのような制御構造で実行するかに応じて、複数の「ワークフローエージェント」を提供しています。これは、サブエージェントを関数のように扱い、ワークフローエージェントがプログラミング言語の制御構文のようにオーケストレーションする、という考え方に基づいています<a
                        className="footnote-ref"
                        href="#ref45"
                        id="fnref116"
                        role="doc-noteref"
                        ><sup>45</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">パターン</th>
                                <th scope="col">概要</th>
                                <th scope="col">適したユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><strong>SequentialAgent</strong></td>
                                <td>
                                    サブエージェントを定義順に1つずつ実行する、最も基本的なワークフローエージェント<a
                                        className="footnote-ref"
                                        href="#ref46"
                                        id="fnref117"
                                        role="doc-noteref"
                                        ><sup>46</sup></a
                                    >
                                </td>
                                <td>
                                    明確な依存関係のある処理チェーン(例:
                                    アウトライン作成→執筆→ファクトチェック)
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>ParallelAgent</strong></td>
                                <td>
                                    複数のサブエージェントを同時(並行)に実行する<a
                                        className="footnote-ref"
                                        href="#ref47"
                                        id="fnref118"
                                        role="doc-noteref"
                                        ><sup>47</sup></a
                                    >
                                </td>
                                <td>
                                    独立したサブタスクに分割できる処理(例:
                                    複数の観点からの並行リサーチ)。「fan out and
                                    gather」パターンとしてよく使われる
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>LoopAgent</strong></td>
                                <td>
                                    一連のサブエージェントを、指定した最大反復回数まで繰り返し実行する<a
                                        className="footnote-ref"
                                        href="#ref46"
                                        id="fnref119"
                                        role="doc-noteref"
                                        ><sup>46</sup></a
                                    >
                                </td>
                                <td>批評→修正のような反復的な自己改善プロセス</td>
                            </tr>
                            <tr className="even">
                                <td><strong>グラフベースワークフロー(Graph)</strong></td>
                                <td>
                                    有向グラフとして条件分岐・ループ・任意のDAGトポロジーを表現する、より汎用的なワークフロー。グラフAPIでは<code>NewFunctionNode</code>・<code>NewAgentNode</code>・<code>NewDynamicNode</code>などでノードを構成する<a
                                        className="footnote-ref"
                                        href="#ref48"
                                        id="fnref120"
                                        role="doc-noteref"
                                        ><sup>48</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref49"
                                        id="fnref121"
                                        role="doc-noteref"
                                        ><sup>49</sup></a
                                    >
                                </td>
                                <td>
                                    条件付き分岐、人間の承認ゲート、チェックポイントからの再開が必要な複雑な本番ワークフロー
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p>
                    これら3つの基本パターン(Sequential/Parallel/Loop)で表現しきれない複雑な依存関係や条件分岐が必要な場合、ADKは静的なグラフでは表現しづらい制御フロー向けに<strong>CustomAgent</strong>(独自ロジックの実装)や、ループ・条件分岐・再帰をコードで直接組み立てる<strong>動的ワークフロー</strong>という選択肢も提供しています<a
                        className="footnote-ref"
                        href="#ref49"
                        id="fnref122"
                        role="doc-noteref"
                        ><sup>49</sup></a
                    ><a className="footnote-ref" href="#ref50" id="fnref123" role="doc-noteref"
                        ><sup>50</sup></a
                    >。
                </p>

                <Diagram id="diag-12" ariaLabel="4つのエージェントオーケストレーションパターン: Sequential, Parallel, Loop, Graph" />

                <p><strong>組み合わせパターンの実例</strong></p>

                <p>
                    実務では、これら4パターンを入れ子(ネスト)にして組み合わせるのが一般的です。例えば、コンテンツパイプラインを構築する場合、次のように各フェーズごとに最適なパターンを選び、それら全体を<code>SequentialAgent</code>で束ねます<a
                        className="footnote-ref"
                        href="#ref47"
                        id="fnref124"
                        role="doc-noteref"
                        ><sup>47</sup></a
                    >。
                </p>

                <pre className="code-block">
                        <div className="code-line"><span className="tok-comment"># 1. リサーチフェーズ(並行)</span></div>
                        <div className="code-line"><span className="tok-key">research_sources</span> = <span className="tok-func">ParallelAgent</span>(</div>
                        <div className="code-line">    <span className="tok-key">sub_agents</span>=[web_research_agent, academic_search_agent, social_media_monitor]</div>
                        <div className="code-line">)</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="tok-comment"># 2. コンテンツ生成フェーズ(順次)</span></div>
                        <div className="code-line"><span className="tok-key">content_creation</span> = <span className="tok-func">SequentialAgent</span>(</div>
                        <div className="code-line">    <span className="tok-key">sub_agents</span>=[outline_writer, draft_writer, fact_checker]</div>
                        <div className="code-line">)</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="tok-comment"># 3. レビュー・編集フェーズ(反復)</span></div>
                        <div className="code-line"><span className="tok-key">editing_cycle</span> = <span className="tok-func">LoopAgent</span>(</div>
                        <div className="code-line">    <span className="tok-key">sub_agents</span>=[editor_agent, proofreader_agent, final_reviewer],</div>
                        <div className="code-line">    <span className="tok-key">max_iterations</span>=<span className="tok-number">3</span></div>
                        <div className="code-line">)</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="tok-comment"># 4. 公開フェーズ(順次)</span></div>
                        <div className="code-line"><span className="tok-key">publication_pipeline</span> = <span className="tok-func">SequentialAgent</span>(</div>
                        <div className="code-line">    <span className="tok-key">sub_agents</span>=[seo_optimizer, formatter_agent, publisher_agent]</div>
                        <div className="code-line">)</div>
                        <div className="code-line"></div>
                        <div className="code-line"><span className="tok-comment"># 全体を統合する最上位のSequentialAgent</span></div>
                        <div className="code-line"><span className="tok-key">content_workflow</span> = <span className="tok-func">SequentialAgent</span>(</div>
                        <div className="code-line">    <span className="tok-key">sub_agents</span>=[research_sources, content_creation, editing_cycle, publication_pipeline]</div>
                        <div className="code-line">)</div>
                    </pre>

                <p><strong>パターン選定の判断基準</strong></p>

                <Diagram id="diag-13" ariaLabel="ワークフロー調整パターンの選定決定木: 依存関係・反復・分岐に基づく選択フロー" />

                <p><strong>Google Cloudツールによるマルチエージェントの統制</strong></p>

                <p>
                    試験ガイドは、マルチエージェントのハンドオフ・ワークフローの選定だけでなく、それを<strong
                        >Agent Identity、Agent Registry、Agent Runtime、agent policiesというGoogle
                        Cloudツールを使って調整する</strong
                    >ことも問うています<a
                        className="footnote-ref"
                        href="#ref1"
                        id="fnref125"
                        role="doc-noteref"
                        ><sup>1</sup></a
                    >。ここまでに解説した内容を統合すると、次のような全体アーキテクチャになります。
                </p>

                <Diagram id="diag-14" ariaLabel="オーケストレーターとサブエージェント、外部A2Aエージェントの統合連携アーキテクチャ" />

                <ul>
                    <li>
                        <strong>Agent Identity</strong>:
                        個々のサブエージェントおよびオーケストレーター自身に固有のアイデンティティを付与し、エージェント間のやり取りもIAMポリシー・PABで境界を統制する(3.2.2参照)。
                    </li>{' '}
                    <li>
                        <strong>Agent Registry</strong>:
                        マルチエージェントシステムが利用するMCPサーバー・ツール・他のA2Aエージェントのスキルを一元的に検出・管理する(3.2.3参照)。
                    </li>{' '}
                    <li>
                        <strong>Agent Runtime</strong>:
                        オーケストレーターおよびサブエージェント群のフルマネージドな実行基盤として、セッション管理・スケーリング・オブザーバビリティを統合的に提供する(3.1.2参照)。
                    </li>{' '}
                    <li>
                        <strong>Agent policies</strong>: IAM Access Policies、Semantic Governance
                        Policiesなどを通じて、エージェント間通信やツール実行に対するガバナンスルールを適用する。
                    </li>
                </ul>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                4つのワークフローパターン(Sequential/Parallel/Loop/Graph)は互いに排他的ではなく、ネストして組み合わせるのが実務上の標準パターンであると理解する<a
                                    className="footnote-ref"
                                    href="#ref47"
                                    id="fnref126"
                                    role="doc-noteref"
                                    ><sup>47</sup></a
                                >。
                            </li>{' '}
                            <li>
                                依存関係がなく独立して実行できるタスクは積極的にParallelAgentで並列化し、レイテンシを削減する(fan-out
                                &amp; gatherパターン)<a
                                    className="footnote-ref"
                                    href="#ref47"
                                    id="fnref127"
                                    role="doc-noteref"
                                    ><sup>47</sup></a
                                >。
                            </li>{' '}
                            <li>
                                単純な3パターン(Sequential/Parallel/Loop)で表現できない条件分岐・人間承認・障害からの復旧が必要な本番ワークフローには、Graphベースのオーケストレーションを検討する<a
                                    className="footnote-ref"
                                    href="#ref48"
                                    id="fnref128"
                                    role="doc-noteref"
                                    ><sup>48</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref49"
                                    id="fnref129"
                                    role="doc-noteref"
                                    ><sup>49</sup></a
                                >。
                            </li>{' '}
                            <li>
                                マルチエージェントシステムのセキュリティは個々のエージェント単位で閉じず、Agent
                                Identity・Agent Registry・Agent Runtime・agent
                                policiesを横断して一貫したガバナンスを設計する(セクション5で詳述)。
                            </li>
                        </ul>
                    </div>
                </div>

                <hr />

                <h2 id="セクション3-全体アーキテクチャ">セクション3 全体アーキテクチャ</h2>

                <p>3.1〜3.3で解説した要素をすべて1つの図に統合すると、次のようになります。</p>

                <Diagram id="diag-15" ariaLabel="セクション3 全体アーキテクチャ統合図: 構築、知識・権限統合、オーケストレーションの全体連動" />

                <hr />

                <h2 id="試験対象ツール一覧セクション3関連">試験対象ツール一覧(セクション3関連)</h2>

                <p>
                    公式試験ガイドに明記されている「試験対象ツール」のうち、セクション3で直接扱ったものを整理します<a
                        className="footnote-ref"
                        href="#ref1"
                        id="fnref130"
                        role="doc-noteref"
                        ><sup>1</sup></a
                    >。
                </p>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ツール名</th>
                                <th scope="col">本記事での主な解説箇所</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Agent Development Kit (ADK)</td>
                                <td>3.1.2</td>
                            </tr>
                            <tr className="even">
                                <td>Agent Identity</td>
                                <td>3.2.2</td>
                            </tr>
                            <tr className="odd">
                                <td>Agent Registry</td>
                                <td>3.2.3、3.3.2</td>
                            </tr>
                            <tr className="even">
                                <td>Agent Retrieval and Vector Search 1.0</td>
                                <td>3.2.1</td>
                            </tr>
                            <tr className="odd">
                                <td>Agent Runtime(formerly Agent Engine)</td>
                                <td>3.1.2、3.3.2</td>
                            </tr>
                            <tr className="even">
                                <td>Agentic protocols(A2A, MCP)</td>
                                <td>3.3.1</td>
                            </tr>
                            <tr className="odd">
                                <td>Agents CLI in Agent Platform</td>
                                <td>3.1.4</td>
                            </tr>
                            <tr className="even">
                                <td>BigQuery / Cloud SQL / Cloud Storage / Firestore</td>
                                <td>3.2.3(データ連携先・MCPサーバー対象)</td>
                            </tr>
                            <tr className="odd">
                                <td>Model Context Protocol (MCP) servers</td>
                                <td>3.2.3、3.3.1</td>
                            </tr>
                            <tr className="even">
                                <td>Model Garden</td>
                                <td>3.1.1</td>
                            </tr>
                            <tr className="odd">
                                <td>RAG Engine</td>
                                <td>3.2.1</td>
                            </tr>
                            <tr className="even">
                                <td>Skill Registry</td>
                                <td>3.1.4</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr />

                <h2 id="ベストプラクティス総まとめ">ベストプラクティス総まとめ</h2>

                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">領域</th>
                                <th scope="col">ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>モデル選定</td>
                                <td>
                                    高頻度・定型タスクはSLM、複雑な推論はLLMというハイブリッドルーティングを基本とする<a
                                        className="footnote-ref"
                                        href="#ref2"
                                        id="fnref131"
                                        role="doc-noteref"
                                        ><sup>2</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref3"
                                        id="fnref132"
                                        role="doc-noteref"
                                        ><sup>3</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ADK設計</td>
                                <td>
                                    単一の巨大エージェントを避け、責務ごとにサブエージェントを分割した階層構造にする<a
                                        className="footnote-ref"
                                        href="#ref9"
                                        id="fnref133"
                                        role="doc-noteref"
                                        ><sup>9</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>セッション/メモリ</td>
                                <td>
                                    短期文脈はSessions、長期パーソナライズはMemory
                                    Bankと役割を分離し、リージョン境界をIAM/RBACで補強する<a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref134"
                                        role="doc-noteref"
                                        ><sup>12</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Agents CLI</td>
                                <td>
                                    日常的な開発はAgent Mode、本番デプロイ承認などの重要操作はHuman
                                    Modeで実施する<a
                                        className="footnote-ref"
                                        href="#ref17"
                                        id="fnref135"
                                        role="doc-noteref"
                                        ><sup>17</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>RAG設計</td>
                                <td>
                                    低レイテンシが必要ならAgent Platform ranking
                                    API、精度重視ならLLM rerankerを使い分ける<a
                                        className="footnote-ref"
                                        href="#ref22"
                                        id="fnref136"
                                        role="doc-noteref"
                                        ><sup>22</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ベクトルDB選定</td>
                                <td>
                                    新規はAgent
                                    Retrieval(自動埋め込み・ハイブリッド検索・単一ストレージ)を第一候補にする<a
                                        className="footnote-ref"
                                        href="#ref20"
                                        id="fnref137"
                                        role="doc-noteref"
                                        ><sup>20</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>権限設計</td>
                                <td>
                                    IAMだけに頼らずPABを併用し、過剰権限が付与されてもアクセス範囲を物理的に制限する<a
                                        className="footnote-ref"
                                        href="#ref25"
                                        id="fnref138"
                                        role="doc-noteref"
                                        ><sup>25</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ツール統合</td>
                                <td>
                                    Google公式MCPサーバーを優先利用し、カスタムツールはAgent
                                    Registryに手動登録してカタログ化する<a
                                        className="footnote-ref"
                                        href="#ref32"
                                        id="fnref139"
                                        role="doc-noteref"
                                        ><sup>32</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>プロトコル選択</td>
                                <td>
                                    エージェント⇔ツールはMCP、エージェント⇔エージェントはA2Aという役割分担を徹底する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>オーケストレーション</td>
                                <td>
                                    Sequential/Parallel/Loop/Graphをネストして組み合わせ、独立タスクは積極的に並列化する<a
                                        className="footnote-ref"
                                        href="#ref47"
                                        id="fnref140"
                                        role="doc-noteref"
                                        ><sup>47</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ガバナンス</td>
                                <td>
                                    Agent Identity・Agent Registry・Agent Runtime・agent
                                    policiesを横断した一貫した統制を設計する
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <hr />

                <h2 id="学習チェックリスト">学習チェックリスト</h2>

                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="title">学習チェックリスト</span
                        ><span className="count">{checkedCount} / {totalChecklist} 完了</span>
                    </div>
                    <ul>
                        <li>
                            <input id="chk1" type="checkbox" checked={!!checkedItems['chk1']} onChange={() => handleCheckChange('chk1')} /><label htmlFor="chk1"
                                >LLM/SLM、self-hosted/SaaS、OSS/proprietaryという3つの軸でモデル選定の判断ができる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk2" type="checkbox" checked={!!checkedItems['chk2']} onChange={() => handleCheckChange('chk2')} /><label htmlFor="chk2"
                                >ADKのマルチエージェント階層構造(ルートエージェント・サブエージェント・ツール)を説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk3" type="checkbox" checked={!!checkedItems['chk3']} onChange={() => handleCheckChange('chk3')} /><label htmlFor="chk3"
                                >ADKがPython/TypeScript/Go/Javaで提供され、model-agnostic・deployment-agnosticであることを理解している</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk4" type="checkbox" checked={!!checkedItems['chk4']} onChange={() => handleCheckChange('chk4')} /><label htmlFor="chk4"
                                >Sessions(短期・単一会話)とMemory
                                Bank(長期・複数セッション横断)の役割の違いを説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk5" type="checkbox" checked={!!checkedItems['chk5']} onChange={() => handleCheckChange('chk5')} /><label htmlFor="chk5"
                                >Memory
                                Bankのリージョン選択とIAM/RBACによる越境防止の必要性を理解している</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk6" type="checkbox" checked={!!checkedItems['chk6']} onChange={() => handleCheckChange('chk6')} /><label htmlFor="chk6"
                                >Agents CLIのAgent ModeとHuman
                                Modeの違い、および7つのバンドルスキルの概要を説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk7" type="checkbox" checked={!!checkedItems['chk7']} onChange={() => handleCheckChange('chk7')} /><label htmlFor="chk7"
                                >RAGパイプラインの6ステップ(取り込み→変換→埋め込み→インデックス化→検索→生成)を説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk8" type="checkbox" checked={!!checkedItems['chk8']} onChange={() => handleCheckChange('chk8')} /><label htmlFor="chk8"
                                >Vector Search 1.0とAgent Retrieval(旧Vector Search 2.0)の違い(Index
                                vs Collection/Data
                                Object、自動埋め込み、ハイブリッド検索)を説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk9" type="checkbox" checked={!!checkedItems['chk9']} onChange={() => handleCheckChange('chk9')} /><label htmlFor="chk9"
                                >Agent Platform ranking APIとLLM
                                rerankerのレイテンシ・精度・料金のトレードオフを説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk10" type="checkbox" checked={!!checkedItems['chk10']} onChange={() => handleCheckChange('chk10')} /><label htmlFor="chk10"
                                >Agent
                                Identityの認証フロー(SPIFFEアイデンティティ、X.509証明書、Context-Aware
                                Access)を説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk11" type="checkbox" checked={!!checkedItems['chk11']} onChange={() => handleCheckChange('chk11')} /><label htmlFor="chk11"
                                >Principal Access
                                Boundary(PAB)がIAM権限とは独立した「境界」であることを理解している</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk12" type="checkbox" checked={!!checkedItems['chk12']} onChange={() => handleCheckChange('chk12')} /><label htmlFor="chk12"
                                >Agent
                                Registryが管理するリソース(Agent/McpServer/Endpoint/Skill/Publisher)と自動登録・手動登録の違いを説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk13" type="checkbox" checked={!!checkedItems['chk13']} onChange={() => handleCheckChange('chk13')} /><label htmlFor="chk13"
                                >MCPとA2Aの役割分担(ツール接続 vs
                                エージェント間協調)を説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk14" type="checkbox" checked={!!checkedItems['chk14']} onChange={() => handleCheckChange('chk14')} /><label htmlFor="chk14"
                                >A2Aのタスクライフサイクル(submitted→working→completed/failed/canceled/rejected)を説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk15" type="checkbox" checked={!!checkedItems['chk15']} onChange={() => handleCheckChange('chk15')} /><label htmlFor="chk15"
                                >SequentialAgent、ParallelAgent、LoopAgent、Graph/GraphAgentの使い分けとネストによる組み合わせパターンを説明できる</label
                            >
                        </li>{' '}
                        <li>
                            <input id="chk16" type="checkbox" checked={!!checkedItems['chk16']} onChange={() => handleCheckChange('chk16')} /><label htmlFor="chk16"
                                >マルチエージェントシステムの統制にAgent Identity、Agent
                                Registry、Agent Runtime、agent
                                policiesがどう関わるかを説明できる</label
                            >
                        </li>
                    </ul>
                </div>

                <hr />

                <h2 id="参考文献">参考文献</h2>

                <div className="ref-grid" id="referenceGrid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            Google Cloud, "Professional Agentic Architect Certification exam guide"
                            (PDF).
                            <a
                                href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf"
                                >https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            Futureagi, "SLM vs LLM in 2026: Cost, Latency, and Quality Compared".
                            <a href="https://futureagi.com/blog/comparison-slm-llm-language-models/"
                                >https://futureagi.com/blog/comparison-slm-llm-language-models/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            Futureagi, "Small Language Models for Agentic AI in 2026: SLM Lineup +
                            Build Guide".
                            <a
                                href="https://futureagi.com/blog/small-language-models-agentic-ai-2025/"
                                >https://futureagi.com/blog/small-language-models-agentic-ai-2025/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            Google Cloud Documentation, "Overview of self-deployed models".
                            <a
                                href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/self-deployed-models"
                                >https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/self-deployed-models</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            Google Cloud Documentation, "Overview of Model Garden".
                            <a
                                href="https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models"
                                >https://docs.cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            Google Developers Blog, "Agent Development Kit: Making it easy to build
                            multi-agent applications".
                            <a
                                href="https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/"
                                >https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            Google Cloud Documentation, "Overview of Agent Development Kit".
                            <a
                                href="https://cloud.google.com/agent-builder/agent-development-kit/overview"
                                >https://cloud.google.com/agent-builder/agent-development-kit/overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            Google Developers Blog, "Agent Development Kit: Making it easy to build
                            multi-agent applications"(モデルエコシステムに関する記述).
                            <a
                                href="https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/"
                                >https://developers.googleblog.com/en/agent-development-kit-easy-to-build-multi-agent-applications/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Development Kit | Gemini Enterprise
                            Agent Platform".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            Google Cloud Documentation, "Overview of Agent Development
                            Kit"(クイックスタートに関する記述).
                            <a
                                href="https://cloud.google.com/agent-builder/agent-development-kit/overview"
                                >https://cloud.google.com/agent-builder/agent-development-kit/overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Platform Sessions overview".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Platform Memory Bank".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/memory-bank</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref13">
                        <div className="num">13</div>
                        <div className="txt">
                            Google Cloud Documentation, "Gemini Enterprise Agent Platform release
                            notes".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/release-notes</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref14">
                        <div className="num">14</div>
                        <div className="txt">
                            Google Developers Blog, "Agents CLI in Agent Platform: create to
                            production in one CLI".
                            <a
                                href="https://developers.googleblog.com/agents-cli-in-agent-platform-create-to-production-in-one-cli/"
                                >https://developers.googleblog.com/agents-cli-in-agent-platform-create-to-production-in-one-cli/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref15">
                        <div className="num">15</div>
                        <div className="txt">
                            Google, "Agents CLI Skills Reference".
                            <a href="https://google.github.io/agents-cli/reference/skills/"
                                >https://google.github.io/agents-cli/reference/skills/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref16">
                        <div className="num">16</div>
                        <div className="txt">
                            Google, "Agents CLI Getting Started".
                            <a href="https://google.github.io/agents-cli/guide/getting-started/"
                                >https://google.github.io/agents-cli/guide/getting-started/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref17">
                        <div className="num">17</div>
                        <div className="txt">
                            Bala's Blog, "Google Cloud Agents CLI: From Prototype to Production in
                            One Command".
                            <a
                                href="https://blog.balakumar.dev/2026/05/31/google-cloud-agents-cli-from-prototype-to-production-in-one-command/"
                                >https://blog.balakumar.dev/2026/05/31/google-cloud-agents-cli-from-prototype-to-production-in-one-command/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref18">
                        <div className="num">18</div>
                        <div className="txt">
                            Google Cloud Documentation, "RAG Engine on Gemini Enterprise Agent
                            Platform overview".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/rag-overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref19">
                        <div className="num">19</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Development Kit"(RAG
                            Engineナビゲーション中のVector database choices構成).
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/adk</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref20">
                        <div className="num">20</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Retrieval (formerly Vector Search
                            2.0) overview".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref21">
                        <div className="num">21</div>
                        <div className="txt">
                            Google Cloud Documentation, "Migrate from Vector Search 1.0".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/migration-from-vs-1_0"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/vector-search-2/migration-from-vs-1_0</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref22">
                        <div className="num">22</div>
                        <div className="txt">
                            Google Cloud Documentation, "Reranking for RAG Engine on Gemini
                            Enterprise Agent Platform".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/retrieval-and-ranking"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/rag-engine/retrieval-and-ranking</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref23">
                        <div className="num">23</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Identity overview | Identity and
                            Access Management (IAM)".
                            <a href="https://docs.cloud.google.com/iam/docs/agent-identity-overview"
                                >https://docs.cloud.google.com/iam/docs/agent-identity-overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref24">
                        <div className="num">24</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Identity overview | Gemini Enterprise
                            Agent Platform".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref25">
                        <div className="num">25</div>
                        <div className="txt">
                            Medium (Google Cloud Community), Arnaud Redon, "GCP Principal access
                            boundaries in Depth".
                            <a
                                href="https://medium.com/google-cloud/gcp-principal-access-boundaries-in-deepth-0c2c7579badb"
                                >https://medium.com/google-cloud/gcp-principal-access-boundaries-in-deepth-0c2c7579badb</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref26">
                        <div className="num">26</div>
                        <div className="txt">
                            Google Cloud Blog, "What's new in IAM: Security, governance, and runtime
                            defense".
                            <a
                                href="https://cloud.google.com/blog/products/identity-security/whats-new-in-iam-security-governance-and-runtime-defense"
                                >https://cloud.google.com/blog/products/identity-security/whats-new-in-iam-security-governance-and-runtime-defense</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref27">
                        <div className="num">27</div>
                        <div className="txt">
                            Google Cloud Documentation, "Create and apply principal access boundary
                            policies".
                            <a
                                href="https://cloud.google.com/iam/docs/principal-access-boundary-policies-create"
                                >https://cloud.google.com/iam/docs/principal-access-boundary-policies-create</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref28">
                        <div className="num">28</div>
                        <div className="txt">
                            Google Cloud Documentation, "IAM Access policies overview | Gemini
                            Enterprise Agent Platform".
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/iam-overview-uap"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/iam-overview-uap</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref29">
                        <div className="num">29</div>
                        <div className="txt">
                            Google Cloud Documentation, "Use agent identity with Vertex AI Agent
                            Engine".
                            <a
                                href="https://cloud.google.com/agent-builder/agent-engine/agent-identity"
                                >https://cloud.google.com/agent-builder/agent-engine/agent-identity</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref30">
                        <div className="num">30</div>
                        <div className="txt">
                            Google Cloud Documentation, "Agent Registry overview".
                            <a href="https://docs.cloud.google.com/agent-registry/overview"
                                >https://docs.cloud.google.com/agent-registry/overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref31">
                        <div className="num">31</div>
                        <div className="txt">
                            Google Cloud Documentation, "Key concepts | Agent Registry".
                            <a href="https://docs.cloud.google.com/agent-registry/concepts"
                                >https://docs.cloud.google.com/agent-registry/concepts</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref32">
                        <div className="num">32</div>
                        <div className="txt">
                            Google Cloud Documentation, "Register MCP servers | Agent Registry".
                            <a
                                href="https://docs.cloud.google.com/agent-registry/register-mcp-servers"
                                >https://docs.cloud.google.com/agent-registry/register-mcp-servers</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref33">
                        <div className="num">33</div>
                        <div className="txt">
                            GitHub, google/mcp, "Google's official Model Context Protocol (MCP)
                            servers".
                            <a href="https://github.com/google/mcp"
                                >https://github.com/google/mcp</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref34">
                        <div className="num">34</div>
                        <div className="txt">
                            Google Cloud Documentation, "Manage MCP servers | Google Cloud MCP
                            servers".
                            <a href="https://docs.cloud.google.com/mcp/manage-mcp-servers"
                                >https://docs.cloud.google.com/mcp/manage-mcp-servers</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref35">
                        <div className="num">35</div>
                        <div className="txt">
                            Google Cloud Documentation, "Manage MCP servers and tools | Agent
                            Registry".
                            <a href="https://docs.cloud.google.com/agent-registry/manage-mcp-tools"
                                >https://docs.cloud.google.com/agent-registry/manage-mcp-tools</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref36">
                        <div className="num">36</div>
                        <div className="txt">
                            Google Cloud Documentation, "Use the BigQuery MCP server".
                            <a href="https://docs.cloud.google.com/bigquery/docs/use-bigquery-mcp"
                                >https://docs.cloud.google.com/bigquery/docs/use-bigquery-mcp</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref37">
                        <div className="num">37</div>
                        <div className="txt">
                            Google Cloud Documentation, "Register and manage A2A agents | Gemini
                            Enterprise".
                            <a
                                href="https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-a2a-agent"
                                >https://docs.cloud.google.com/gemini/enterprise/docs/register-and-manage-an-a2a-agent</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref38">
                        <div className="num">38</div>
                        <div className="txt">
                            Apono, "What is Agent2Agent (A2A) Protocol and How to Adopt it?".
                            <a
                                href="https://www.apono.io/blog/what-is-agent2agent-a2a-protocol-and-how-to-adopt-it/"
                                >https://www.apono.io/blog/what-is-agent2agent-a2a-protocol-and-how-to-adopt-it/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref39">
                        <div className="num">39</div>
                        <div className="txt">
                            Google Cloud Blog, "Agent2Agent protocol (A2A) is getting an upgrade".
                            <a
                                href="https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade"
                                >https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref40">
                        <div className="num">40</div>
                        <div className="txt">
                            Atlan, "Google A2A Protocol: How Agent-to-Agent Coordination Works".
                            <a href="https://atlan.com/know/google-a2a-protocol/"
                                >https://atlan.com/know/google-a2a-protocol/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref41">
                        <div className="num">41</div>
                        <div className="txt">
                            Medium (Google Cloud Community), "Understanding Agent2Agent (A2A) — The
                            Protocol for Agent Collaboration".
                            <a
                                href="https://medium.com/google-cloud/understanding-a2a-the-protocol-for-agent-collaboration-2eade88246ca"
                                >https://medium.com/google-cloud/understanding-a2a-the-protocol-for-agent-collaboration-2eade88246ca</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref42">
                        <div className="num">42</div>
                        <div className="txt">
                            Google Cloud Documentation, "Overview of A2A agents on Cloud Run".
                            <a href="https://docs.cloud.google.com/run/docs/ai/a2a-agents"
                                >https://docs.cloud.google.com/run/docs/ai/a2a-agents</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref43">
                        <div className="num">43</div>
                        <div className="txt">
                            GitHub, a2aproject/A2A.
                            <a href="https://github.com/a2aproject/A2A"
                                >https://github.com/a2aproject/A2A</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref44">
                        <div className="num">44</div>
                        <div className="txt">
                            Google Cloud Blog, "Agent2Agent protocol (A2A) is getting an
                            upgrade"(ADKエージェントのA2A公開に関する記述).
                            <a
                                href="https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade"
                                >https://cloud.google.com/blog/products/ai-machine-learning/agent2agent-protocol-is-getting-an-upgrade</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref45">
                        <div className="num">45</div>
                        <div className="txt">
                            Medium, Forusone, "Mastering ADK Workflows: A Developer's Guide to
                            Sequential, Parallel, Loop and Custom Agents".
                            <a
                                href="https://medium.com/@shins777/adk-workflow-the-core-logic-of-ai-agent-8ce4be5c1c40"
                                >https://medium.com/@shins777/adk-workflow-the-core-logic-of-ai-agent-8ce4be5c1c40</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref46">
                        <div className="num">46</div>
                        <div className="txt">
                            Medium, Forusone, "Mastering ADK Workflows"(LoopAgentのコード例).
                            <a
                                href="https://medium.com/@shins777/adk-workflow-the-core-logic-of-ai-agent-8ce4be5c1c40"
                                >https://medium.com/@shins777/adk-workflow-the-core-logic-of-ai-agent-8ce4be5c1c40</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref47">
                        <div className="num">47</div>
                        <div className="txt">
                            Google ADK Training Hub, "Workflows &amp; Orchestration".
                            <a
                                href="https://raphaelmansuy.github.io/adk_training/docs/workflows-orchestration/"
                                >https://raphaelmansuy.github.io/adk_training/docs/workflows-orchestration/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref48">
                        <div className="num">48</div>
                        <div className="txt">
                            adk.dev, "Graph-based agent workflows - Agent Development Kit (ADK)".
                            <a href="https://adk.dev/graphs/">https://adk.dev/graphs/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref49">
                        <div className="num">49</div>
                        <div className="txt">
                            Google Codelabs, "Build Multi-Agent Systems with ADK".
                            <a
                                href="https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk"
                                >https://codelabs.developers.google.com/codelabs/production-ready-ai-with-gc/3-developing-agents/build-a-multi-agent-system-with-adk</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref50">
                        <div className="num">50</div>
                        <div className="txt">
                            adk.dev, "Graph-based agent workflows"(動的ワークフローに関する記述).
                            <a href="https://adk.dev/graphs/">https://adk.dev/graphs/</a>
                        </div>
                    </div>
                </div>
            
                </main>
            </div>
        </div>
    );
}
