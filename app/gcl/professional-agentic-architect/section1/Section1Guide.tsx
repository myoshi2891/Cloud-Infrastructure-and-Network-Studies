'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import {
    CHECKLIST_ITEMS,
    DIAGRAMS,
    type DiagramId,
    REFERENCES,
} from './constants';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap" data-testid="mermaid-diagram-wrap">
            <MermaidDiagram
                chart={chart}
                ariaLabel={label}
                preserveNaturalScale={true}
                theme="light"
            />
        </div>
    );
});

export default function Section1Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

    const toggleCheck = (id: string) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="agentic-section1-page">
            <div className="layout">
                <NavBar />
                <main className="main" id="main-content">
                    <div className="hero">
                        <div className="kicker">Professional Agentic Architect · Section 1</div>
                        <h1>
                            Professional Agentic Architect 試験ガイド — セクション1:
                            ローコードツールでのエージェント構築（配点 約13%）
                        </h1>
                        <div className="meta-row">
                            <span className="pill">配点 <strong>約13%</strong></span>
                            <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                            <span className="pill">図解 <strong>Mermaid 7点</strong></span>
                            <span className="pill">参考文献 <strong>25件</strong></span>
                        </div>
                    </div>

                    <p>
                        本ガイドは、Google Cloud 認定資格「<a href="https://cloud.google.com/learn/certification/agentic-architect">Professional Agentic Architect</a>」<a className="footnote-ref" href="#ref2" id="fnref1" role="doc-noteref"><sup>2</sup></a>（ベータ試験）の
                        <strong>セクション1: ローコードツールでのエージェント構築（Building agents using low-code tools）</strong>
                        を、初学者向けにステップバイステップで解説するものです。公式
                        <a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf">試験ガイドPDF</a><a className="footnote-ref" href="#ref1" id="fnref2" role="doc-noteref"><sup>1</sup></a>
                        に記載された出題範囲（1.1／1.2）に沿って、関連する Google Cloud
                        サービスの仕組み・設定方法・ベストプラクティスを、図解と表を用いて詳しく説明します。
                    </p>
                    <p><strong>セクション1の出題範囲（配点 約13%）</strong></p>
                    <ul>
                        <li>
                            <strong>1.1</strong>
                            ローコードツールを用いたエージェントのワークフローと動作の設定
                        </li>
                        <li><strong>1.2</strong> Gemini Enterprise へのエンタープライズデータの接続</li>
                    </ul>
                    <hr />
                    <h2 id="1-セクション1の全体像">1. セクション1の全体像</h2>
                    <p>
                        Professional Agentic Architect
                        試験は5つのセクションで構成されており、セクション1はその中で「コードを書かずに（あるいは最小限のコードで）エージェントを構築する」領域を扱います。後続のセクション2（コーディングエージェント）やセクション3（ADK等によるプロコード開発）が「エージェントを自分で作り込む」アプローチであるのに対し、セクション1は
                        Google が用意した
                        <strong>Gemini Enterprise 上のローコード／ノーコード・ビルダー</strong>
                        を使いこなす能力を問う点が特徴です。
                    </p>
                    <Diagram id="diag1" label="セクション1全体構成フロー" />
                    <p>出題範囲に明示されているツール名は次の2つです。</p>
                    <ul>
                        <li>
                            <strong>Gemini Enterprise Workflow Builder</strong>（旧 Agent
                            Designer。2026年8月に現行名称へ移行、詳細は後述）<a className="footnote-ref" href="#ref6" id="fnref3" role="doc-noteref"><sup>6</sup></a>
                        </li>
                        <li>
                            <strong>Customer Experience Agent Studio（CX Agent Studio）</strong><a className="footnote-ref" href="#ref8" id="fnref4" role="doc-noteref"><sup>8</sup></a>
                        </li>
                    </ul>
                    <p>
                        両者はいずれも Gemini Enterprise Agent Platform の一部ですが<a className="footnote-ref" href="#ref7" id="fnref5" role="doc-noteref"><sup>7</sup></a>、対象とするユースケースが異なります。次章から順に見ていきましょう。
                    </p>
                    <hr />
                    <h2 id="2-11-ローコードツールを使ったエージェントワークフロー動作の設定">
                        2. 1.1 ローコードツールを使ったエージェントワークフロー・動作の設定
                    </h2>
                    <h3 id="21-gemini-enterprise-のローコードビルダー全体像workflow-builder旧-agent-designerと-cx-agent-studio">
                        2.1 Gemini Enterprise のローコードビルダー全体像：Workflow Builder（旧 Agent
                        Designer）と CX Agent Studio
                    </h3>
                    <p>
                        <strong>Workflow Builder（旧 Agent Designer）</strong>（Gemini Enterprise
                        アプリ内蔵のビルダー）は、自然言語のチャット操作、またはビジュアルな Flow
                        キャンバスによって、単一ステップ〜複数ステップのエージェントを作成・管理・公開できる、インタラクティブなノーコード／ローコード・プラットフォームです<a className="footnote-ref" href="#ref4" id="fnref6" role="doc-noteref"><sup>4</sup></a>。画面は次の4つのタブで構成されます。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タブ</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>Chat（チャットペイン）</td>
                                    <td>
                                        自然言語プロンプトでエージェントを対話的に構築・調整する。ノーコードユーザー向け
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Flow</td>
                                    <td>
                                        エージェント全体のワークフローと制御ロジックを視覚的に表示・編集する。メインエージェントとサブエージェントを管理し、複雑な複数ステップのエージェントを設計する
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>Schedule</td>
                                    <td>エージェントの実行スケジュール（定期実行）を1つ以上設定する</td>
                                </tr>
                                <tr className="even">
                                    <td>Preview</td>
                                    <td>構築中のエージェントをその場でテストできるライブ環境</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        上記4タブの構成は、Gemini Enterprise（Business
                        Edition）のヘルプドキュメントでも同様に説明されています<a className="footnote-ref" href="#ref5" id="fnref7" role="doc-noteref"><sup>5</sup></a>。
                    </p>
                    <p>
                        2026年4月の Google Cloud Next では、Agent Designer
                        が「決定的なビジネスロジックと生成AIを組み合わせ、コードを1行も書かずにシンプルなアシスタントから高度に複雑な自律オーケストレーターまで構築できる」機能として拡張されたことが発表されました<a className="footnote-ref" href="#ref3" id="fnref8" role="doc-noteref"><sup>3</sup></a>。さらに2026年8月のリリースノートでは、Agent Designer が
                        <strong>Workflow Builder</strong> に名称変更され
                        GA（一般提供）に到達したことが記載されています。Workflow Builder
                        は、スケジュール実行・オンデマンド実行・チャット内での
                        <code>@メンション</code> 呼び出しに対応し、既存の A2A／ADK
                        エージェントをインポートして一元管理できる点、Google
                        Workspace（Gmail・カレンダー・Chat・Drive）や
                        Slack・Jira・ServiceNow・Confluence・Microsoft OneDrive／SharePoint・Outlook
                        等のエンタープライズコネクタに接続できる点が特徴です<a className="footnote-ref" href="#ref6" id="fnref9" role="doc-noteref"><sup>6</sup></a>。
                    </p>
                    <p>
                        一方、<strong>Customer Experience Agent Studio（CX Agent Studio）</strong>
                        は、AIとエージェントビルダーUIを用いてユーザーを支援する、ミニマルコードの会話型エージェントビルダーです<a className="footnote-ref" href="#ref8" id="fnref10" role="doc-noteref"><sup>8</sup></a>。CX Agent Studio は Agent Development
                        Kit（ADK）を基盤に構築されており、ノーコード／ローコードのユーザー層にも ADK
                        の能力を届けることを狙いとしています。CX Agent Studio は
                        <strong>Dialogflow CX の進化形</strong>
                        と位置づけられており、次のような優位点を持ちます<a className="footnote-ref" href="#ref8" id="fnref11" role="doc-noteref"><sup>8</sup></a>。
                    </p>
                    <ul>
                        <li>AIを活用したエージェントの構築・最適化・評価の高速化</li>
                        <li>
                            非エンジニア／エージェントアーキテクト向けの、シンプルで直感的なビジュアルビルダー
                        </li>
                        <li>
                            インフラ・エンタープライズ統合・セキュリティ・運用上の複雑さを裏側で解決する「ラストマイル問題」の解消
                        </li>
                        <li>
                            バックエンドのツール呼び出し中も自然な会話の流れを維持する非同期処理（不自然な沈黙の排除）
                        </li>
                        <li>双方向ストリーミングによる超低遅延な音声対話</li>
                        <li>
                            チームでの共同編集を支援する変更履歴・ワンクリックロールバック・競合警告などの統合コラボレーション機能
                        </li>
                    </ul>
                    <p>
                        つまり、<strong>「社内向けの汎用タスク自動化・マルチステップワークフロー」には Workflow Builder（旧 Agent Designer）</strong>、<strong>「顧客対応・コンタクトセンター向けの高度な会話型エージェント」には CX Agent Studio</strong>
                        という使い分けが基本となります。
                    </p>
                    <Diagram id="diag2" label="Workflow Builder と CX Agent Studio のツール選定フロー" />
                    <p>両ツールの主な違いを整理すると次のとおりです。</p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">観点</th>
                                    <th scope="col">Gemini Enterprise Workflow Builder（旧 Agent Designer）</th>
                                    <th scope="col">Customer Experience Agent Studio</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>主な用途</td>
                                    <td>社内向け業務自動化・マルチステップワークフロー</td>
                                    <td>顧客対応・コンタクトセンター向け会話型エージェント</td>
                                </tr>
                                <tr className="even">
                                    <td>構築方法</td>
                                    <td>
                                        自然言語チャット + ビジュアル Flow キャンバス（no-code / low-code）
                                    </td>
                                    <td>AI ガイド付きビジュアルビルダー（minimal-code）</td>
                                </tr>
                                <tr className="odd">
                                    <td>基盤技術</td>
                                    <td>Gemini Enterprise Agent Platform</td>
                                    <td>Agent Development Kit（ADK）ベース</td>
                                </tr>
                                <tr className="even">
                                    <td>構成要素の単位</td>
                                    <td>メインエージェント + サブエージェント</td>
                                    <td>エージェント + ツール + コールバック + ガードレール</td>
                                </tr>
                                <tr className="odd">
                                    <td>状態管理の考え方</td>
                                    <td>
                                        タスク指向の Flow（業務手順の可視化）。ページ・遷移ルート・イベントハンドラによる状態ベースワークフローとは別概念
                                    </td>
                                    <td>
                                        エージェント指向。決定的ロジックが必要な場合は Dialogflow CX 由来の状態ベースワークフロー（ページ・遷移ルート・イベントハンドラ）を「Flow-based エージェント」として取り込み可能
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>主な接続先の例</td>
                                    <td>Gmail、Google Drive、Jira 等のエンタープライズコネクタ</td>
                                    <td>
                                        データストア、File Search、Salesforce、ServiceNow、MCP 等の各種ツール
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>実行トリガー</td>
                                    <td>スケジュール実行、チャット内 <code>@メンション</code></td>
                                    <td>チャット／音声／Webウィジェット等のマルチチャネル</td>
                                </tr>
                                <tr className="even">
                                    <td>前身・位置づけ</td>
                                    <td>
                                        旧称 Agent Designer。2026年8月に GA 化し Workflow Builder へ改称
                                    </td>
                                    <td>Dialogflow CX の進化形</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    まず「エージェントが対話する相手が社内の従業員か、社外の顧客か」で一次判断を行う。前者に寄るタスク（社内ワークフロー・レポーティング・チーム間連携）は Workflow Builder、後者に寄るタスク（カスタマーサポート・音声IVR）は CX Agent Studio が第一候補になる。
                                </li>
                                <li>
                                    「決定的（deterministic）」な業務ロジックが必要な部分（本人確認、規定に沿った段階的なデータ収集など）と、「生成的（generative）」な自由対応が必要な部分を切り分けて設計することが、両ツール共通の設計原則である。
                                </li>
                                <li>
                                    試験では正式名称の変遷（Agent Designer → Workflow Builder）を問われる可能性があるため、出題文中の「Agent Designer」は最新のドキュメント上では「Workflow Builder」に対応する場合がある点を押さえておく。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="22-状態ベースワークフローページ遷移ルートイベントハンドラ">
                        2.2 状態ベースワークフロー：ページ・遷移ルート・イベントハンドラ
                    </h3>
                    <p>
                        出題項目1.1には「<strong>ページ、遷移ルート、イベントハンドラを用いた状態ベースワークフローの構成</strong>」が明記されています。これは CX Agent Studio の前身である <strong>Dialogflow CX</strong> に由来する会話設計モデルであり、CX Agent Studio では「Flow-based エージェント」という形で、この状態ベースの仕組みを取り込むことができます<a className="footnote-ref" href="#ref9" id="fnref12" role="doc-noteref"><sup>9</sup></a>。まずは基礎となる Dialogflow CX の概念を押さえましょう。
                    </p>
                    <p>
                        Dialogflow CX の会話は、<strong>ステートマシン（状態機械）</strong> として表現されます<a className="footnote-ref" href="#ref22" id="fnref13" role="doc-noteref"><sup>22</sup></a>。
                    </p>
                    <ul>
                        <li>
                            <strong>フロー（Flow）</strong>：関連するページの集合体。1つの高レベルな会話トピック（例：注文フロー、返品フロー）を担当する。
                        </li>
                        <li>
                            <strong>ページ（Page）</strong>：会話グラフのノードであり、会話の「状態」を表す。ある時点でアクティブなページは常に1つで、ユーザー入力やイベントに応じて別のページへ遷移する。1つのページが複数ターンにわたってアクティブであり続けることも多い<a className="footnote-ref" href="#ref22" id="fnref14" role="doc-noteref"><sup>22</sup></a>。
                        </li>
                        <li>
                            <strong>状態ハンドラ（State handler）</strong>：ページやフローの遷移・応答を制御する仕組みで、以下の3種類がある<a className="footnote-ref" href="#ref23" id="fnref15" role="doc-noteref"><sup>23</sup></a><a className="footnote-ref" href="#ref24" id="fnref16" role="doc-noteref"><sup>24</sup></a>。
                        </li>
                        <li>
                            <strong>インテントルート（Intent route）</strong>：ユーザー発話が特定のインテントに一致した場合に発火する。
                        </li>
                        <li>
                            <strong>条件ルート（Condition route）</strong>：セッションパラメータに基づく条件式が真になった場合に発火する。
                        </li>
                        <li>
                            <strong>イベントハンドラ（Event handler）</strong>：<code>no-match</code>（意図不一致）、<code>no-input</code>（無音）、<code>webhook-error</code> などのシステムイベント、またはカスタムイベントが発火した場合に呼び出される。
                        </li>
                    </ul>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">種別</th>
                                    <th scope="col">トリガー条件</th>
                                    <th scope="col">典型的な用途</th>
                                    <th scope="col">消費（consume）の挙動</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>インテントルート</td>
                                    <td>ユーザー発話が特定インテントに一致</td>
                                    <td>「注文する」「キャンセルする」等、主要な会話分岐</td>
                                    <td>
                                        インテントは消費され、原則として最初に一致したルートのみが呼び出される<a className="footnote-ref" href="#ref24" id="fnref17" role="doc-noteref"><sup>24</sup></a>
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>条件ルート</td>
                                    <td>セッションパラメータに対する条件式が真</td>
                                    <td>フォーム充足後の自動遷移、ビジネスロジックによる分岐</td>
                                    <td>
                                        条件は消費されないため、複数のルートが連続して呼び出され得る<a className="footnote-ref" href="#ref24" id="fnref18" role="doc-noteref"><sup>24</sup></a>
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>イベントハンドラ</td>
                                    <td>
                                        システムイベント（no-match／no-input／webhook-error）またはカスタムイベントの発火
                                    </td>
                                    <td>
                                        聞き取れなかった際の再質問、エラー時のオペレーターへのエスカレーション
                                    </td>
                                    <td>
                                        イベントは消費され、スコープ内で最初に見つかったハンドラのみが呼び出される<a className="footnote-ref" href="#ref24" id="fnref19" role="doc-noteref"><sup>24</sup></a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        状態ハンドラには「<strong>スコープ（scope）</strong>」という概念があり、あるハンドラが呼び出されるためには、そのハンドラが現在の状況に対して有効範囲内でなければなりません。スコープは「現在アクティブなページ」「現在アクティブなフロー」「現在入力を収集しようとしているフォームパラメータ」のいずれかを基準とし、スコープ内のハンドラは決められた順序で評価されます<a className="footnote-ref" href="#ref24" id="fnref20" role="doc-noteref"><sup>24</sup></a>。ページ側では、フォームパラメータが未入力の場合に事前入力を試みたうえで、ページレベルのルート → イベントハンドラという順に状態ハンドラが評価されます<a className="footnote-ref" href="#ref25" id="fnref21" role="doc-noteref"><sup>25</sup></a>。
                    </p>
                    <p>以下は、簡略化した注文フローを状態機械として表現した例です。</p>
                    <Diagram id="diag3" label="簡略化した注文フローの状態遷移図" />
                    <h4>CX Agent Studio における Flow-based エージェント</h4>
                    <p>
                        CX Agent Studio 自体は「エージェント＋ツール＋コールバック」というモデルで構築されるため、ページ／遷移ルートという概念をネイティブには持ちません。しかし、既存の Dialogflow CX 資産を活かしたい場合や、決定的なビジネスロジックをどうしても状態機械として表現したい場合のために、CX Agent Studio は既存の Dialogflow CX フローを「<strong>Flow-based エージェント</strong>」としてインポートし、<code>END_SESSION</code> に達するまで会話をそのフローへハンドオフできる仕組みを提供しています<a className="footnote-ref" href="#ref9" id="fnref22" role="doc-noteref"><sup>9</sup></a>。
                    </p>
                    <p>
                        Flow-based エージェントを作成する際は、次の手順を踏みます<a className="footnote-ref" href="#ref9" id="fnref23" role="doc-noteref"><sup>9</sup></a>。
                    </p>
                    <ol>
                        <li>
                            起点となる CX Agent Studio エージェント配下で「Flow-based エージェントのインポート」を選択する
                        </li>
                        <li>フローが属するプロジェクトとエージェントを選択する</li>
                        <li>
                            表示名・説明（親エージェントが「いつこのフローに制御を渡すべきか」を判断できる説明文）を入力する
                        </li>
                        <li>フロー開始リソースと、使用する環境（既定は draft）を指定する</li>
                        <li>
                            入力変数マッピング（親エージェント→フローへ渡すセッションパラメータ）と、出力変数マッピング（フロー→親エージェントへ返す変数）を設定する
                        </li>
                    </ol>
                    <p>
                        公式ドキュメントは、移行時のベストプラクティスとして次のような「<strong>ブラックボックス原則</strong>」を明確に示しています<a className="footnote-ref" href="#ref9" id="fnref24" role="doc-noteref"><sup>9</sup></a>。
                    </p>
                    <ul>
                        <li>
                            フローはセッションパラメータという<strong>暗黙のグローバル変数</strong>に依存する。既定では、あるフロー内で収集したパラメータは自動的にセッションスコープへ伝播し、後続のフローからもアクセス可能になる。この仕組みにより、上流フローのパラメータ収集ロジックを変更すると下流フローが意図せず壊れるリスクがある。
                        </li>
                        <li>
                            そのため CX Agent Studio エージェントは、フローを<strong>カプセル化されたブラックボックス</strong>として扱うべきであり、必要な情報はすべて明示的な入力パラメータとしてフローに渡し、フロー終了時には定義済みの出力パラメータをセッションパラメータから明示的に埋めてから制御を返す設計にする。
                        </li>
                        <li>
                            <strong>Steering agent（ルーティング層）</strong> としては CX Agent Studio エージェントを用い、CX Agent Studio エージェント同士・フロー同士の間のルーティングを担わせる。CX Agent Studio の Steering agent は、<code>END_SESSION</code> に到達して制御が戻るまでは Dialogflow CX エージェント間の直接の転送を行えない点に注意する。
                        </li>
                    </ul>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">フローの用途</th>
                                    <th scope="col">良い例</th>
                                    <th scope="col">悪い例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>高度に決定的なビジネスロジック</td>
                                    <td>
                                        段階的なデータ収集・入力検証、セッションパラメータに基づく認証フロー
                                    </td>
                                    <td>
                                        定型応答（コールバックで十分実現できる）、意図分類・検出（LLMを使うべき領域）
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    新規ユースケースはすべて CX Agent Studio エージェントとして構築し、既存の複雑な Dialogflow CX 資産（playbook とフローが密結合しているもの）は当面維持しつつ、ルーティング層で両者を振り分ける「エージェントタイプの分離（isolated approach）」から始めるのが移行の第一選択となる<a className="footnote-ref" href="#ref9" id="fnref25" role="doc-noteref"><sup>9</sup></a>。
                                </li>
                                <li>
                                    playbook とフローの相互作用が CX Agent Studio のルーティング層からブラックボックスとして見える限り、playbook を含む構成も許容される。一方で、複数の CX フローと CX Agent Studio エージェントが行き来する「convolutedな」構成はカプセル化を損なうため避ける<a className="footnote-ref" href="#ref9" id="fnref26" role="doc-noteref"><sup>9</sup></a>。
                                </li>
                                <li>
                                    状態ハンドラの評価順序（インテントルートはインテントを消費、条件ルートは消費しない、イベントハンドラはスコープ内で最初の1つのみ呼び出される）を正しく理解しておくことは、意図しない多重発火や無限ループのデバッグに直結する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="23-システムインストラクションとインコンソールプロンプトテンプレートfew-shot--chain-of-thought">
                        2.3 システムインストラクションとインコンソール・プロンプトテンプレート（Few-shot / Chain-of-Thought）
                    </h3>
                    <p>
                        出題項目1.1のもう一つの柱は、「<strong>エージェントの動作を導くためのシステムインストラクションおよびインコンソールのプロンプトテンプレート（Few-shot、Chain-of-Thoughtなど）の作成</strong>」です。CX Agent Studio の Instructions 機能を例に、実務的な組み立て方を見ていきます<a className="footnote-ref" href="#ref10" id="fnref27" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <h4>インストラクションの基本構文</h4>
                    <p>
                        CX Agent Studio の「エージェントインストラクション」は自然言語でモデルに詳細な振る舞いを指示するテキストです。インストラクション内では、次のような特別な参照構文を利用できます<a className="footnote-ref" href="#ref10" id="fnref28" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">参照対象</th>
                                    <th scope="col">記法</th>
                                    <th scope="col">説明</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>セッション変数</td>
                                    <td><code>{'{variable_name}'}</code></td>
                                    <td>スネークケースの変数名を波かっこで囲んで参照する</td>
                                </tr>
                                <tr className="even">
                                    <td>ツール</td>
                                    <td><code>{'{@TOOL: tool_name}'}</code></td>
                                    <td>エージェントに追加済みのツールを表示名で参照する</td>
                                </tr>
                                <tr className="odd">
                                    <td>サブエージェント</td>
                                    <td><code>{'{@AGENT: Agent Name}'}</code></td>
                                    <td>サブエージェントを表示名で参照する</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        エディタ上で <code>@</code> を入力するとエージェント・ツール・変数を選択できるコンテキストメニューが開き、<code>{'{'}</code> を入力すると利用可能な変数の一覧が表示されるため、これらの参照は「チップ」としてハイライトされ、タイプミスを防止できます<a className="footnote-ref" href="#ref10" id="fnref29" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <p>
                        なお、プロンプトやインストラクションの記述には、モデルの理解精度を最大化するため <strong>英語を用いることが推奨</strong> されています。エージェントは実行時にはエンドユーザーの発話言語を自動検出して同じ言語で応答するため、インストラクション自体の言語と、実際にエージェントが話す言語は別物である点に注意してください<a className="footnote-ref" href="#ref10" id="fnref30" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <h4>「Restructure instructions」機能とXML構造</h4>
                    <p>
                        自然言語だけでもインストラクションは機能しますが、公式ドキュメントは「<strong>XML構造でフォーマットした方がモデルの指示追従性が向上する</strong>」と明記しており、CX Agent Studio には自然言語のインストラクションをワンクリックで推奨のXML構造へ変換する「<strong>Restructure instructions</strong>」ボタンが用意されています<a className="footnote-ref" href="#ref10" id="fnref31" role="doc-noteref"><sup>10</sup></a>。推奨されるXMLタグは次のとおりです。
                    </p>
                    <Diagram id="diag4" label="エージェントインストラクションのXML構造階層" />
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タグ</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td><code>role</code></td>
                                    <td>エージェントの中核となる機能・責務を定義する</td>
                                </tr>
                                <tr className="even">
                                    <td><code>persona</code></td>
                                    <td>エージェントの性格・トーン・振る舞いのガイドラインを記述する</td>
                                </tr>
                                <tr className="odd">
                                    <td><code>primary_goal</code></td>
                                    <td><code>persona</code> 内でエージェントの主目的を明示する</td>
                                </tr>
                                <tr className="even">
                                    <td><code>constraints</code></td>
                                    <td>エージェントが従うべきルール・制限事項を列挙する</td>
                                </tr>
                                <tr className="odd">
                                    <td><code>taskflow</code></td>
                                    <td>会話フローを一連のサブタスクとして概説する</td>
                                </tr>
                                <tr className="even">
                                    <td><code>subtask</code></td>
                                    <td><code>taskflow</code> 内の特定のサブタスク（1つ以上の <code>step</code> から構成）</td>
                                </tr>
                                <tr className="odd">
                                    <td><code>step</code></td>
                                    <td><code>subtask</code> 内の個々のステップ（<code>trigger</code> と <code>action</code> を含む）</td>
                                </tr>
                                <tr className="even">
                                    <td><code>trigger</code></td>
                                    <td><code>step</code> を発火させる条件・ユーザー入力</td>
                                </tr>
                                <tr className="odd">
                                    <td><code>action</code></td>
                                    <td><code>step</code> が発火した際にエージェントが取るべき行動</td>
                                </tr>
                                <tr className="even">
                                    <td><code>examples</code></td>
                                    <td>特定シナリオ向けの Few-shot サンプルを格納する</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        この <code>taskflow → subtask → step（trigger／action）</code> という階層構造は、CX Agent Studio における <strong>構造化されたタスク分解と指示設計</strong> の枠組みです。「複雑な会話タスクを、条件（trigger）と行動（action）が明示された小さなステップに分解して積み上げる」という設計は、あくまで開発者が記述する制御構造であり、モデル内部の推論過程そのものではない点に注意してください。抽象的な1文の指示（例：「ユーザーの意図を判断して適切に対応して」）ではなく、<code>trigger</code> ごとに条件を明示し、<code>action</code> ごとに取るべき行動を具体化することで、モデルの解釈揺れを減らせます。
                    </p>
                    <h4>インライン Few-shot サンプル</h4>
                    <p>
                        <strong>Few-shotプロンプティング</strong> とは、少数の具体例をモデルに与えることで振る舞い・トーン・ロジックを導く手法です。CX Agent Studio では、この具体例をUIの別パネルではなくインストラクション本文内に直接記述する「インライン Few-shot サンプル」として扱います<a className="footnote-ref" href="#ref10" id="fnref32" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <p>
                        Few-shot サンプルを追加すべき主なシーンは次のとおりです<a className="footnote-ref" href="#ref10" id="fnref33" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <ul>
                        <li>
                            <strong>品質問題の解消</strong>：モデルが指示を一貫して誤解する、特定の失敗パターンを修正したいとき
                        </li>
                        <li>
                            <strong>複雑なフォーマット</strong>：非標準的な出力フォーマットを、非常に厳密に指定したいとき
                        </li>
                        <li>
                            <strong>微妙なロジック</strong>：if-then形式の指示だけでは意思決定の機微を捉えきれないとき
                        </li>
                    </ul>
                    <p>
                        一方で、次のような<strong>警告</strong>も明記されています<a className="footnote-ref" href="#ref10" id="fnref34" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <ul>
                        <li>
                            <strong>控えめに使う</strong>：サンプルを入れすぎると、モデルがサンプルに「過学習（overfit）」し、未知のユーザークエリへの汎化能力を失う恐れがある
                        </li>
                        <li>
                            <strong>網羅的である必要はない</strong>：あらゆるユーザークエリを列挙する必要はなく、あくまでモデルの推論パターンを示す「ガイダンス」として使う
                        </li>
                        <li>
                            <strong>まずは指示から</strong>：Few-shotを追加する前に、明確で説明的な指示だけで問題を解決できないか試す
                        </li>
                    </ul>
                    <p>
                        Few-shot サンプル1件は、会話の1ターンを模した次の4要素で構成されます<a className="footnote-ref" href="#ref10" id="fnref35" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">要素</th>
                                    <th scope="col">記法</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ユーザー入力</td>
                                    <td><code>[user]</code></td>
                                    <td>エンドユーザーの発話・質問を表す</td>
                                </tr>
                                <tr className="even">
                                    <td>モデル応答／思考</td>
                                    <td><code>[model]</code></td>
                                    <td>エージェントのテキスト応答、または推論過程を表す</td>
                                </tr>
                                <tr className="odd">
                                    <td>ツール呼び出し</td>
                                    <td><code>tool_code</code></td>
                                    <td>外部ツール・関数への呼び出し方（引数など）を示す</td>
                                </tr>
                                <tr className="even">
                                    <td>ツール出力</td>
                                    <td><code>tool_outputs</code></td>
                                    <td>
                                        ツールから返るデータをシミュレートし、モデルにその解釈のさせ方を教える
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        この4要素の流れは、次のような1ターンのシーケンスとして理解すると分かりやすくなります。
                    </p>
                    <Diagram id="diag5" label="Few-shot ツール呼び出し1ターンシーケンス" />
                    <h4>指示によるレスポンスのフォーマット指定</h4>
                    <p>
                        出題範囲には直接含まれませんが、実務上重要な補足として、CX Agent Studio の公式ベストプラクティスは「エージェントの応答フォーマット」自体もインストラクションで指定すべきだとしています<a className="footnote-ref" href="#ref10" id="fnref36" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <ul>
                        <li>
                            <strong>チャンク化と余白</strong>：ユーザーは読むのではなく「スキャン」するため、密な段落を書かない。1テキストブロックは1〜2文までに抑え、異なるアイデアの間には改行を入れる
                        </li>
                        <li>
                            <strong>戦略的な太字</strong>：商品名・価格・日付・注文番号・締切など、重要なデータポイントは太字にして即座に目に留まるようにする
                        </li>
                        <li>
                            <strong>箇条書き優先</strong>：2項目・2ステップ以上に言及する場合は、自動的に箇条書きまたは番号付きリストに変換する
                        </li>
                    </ul>
                    <h4>グローバルインストラクション</h4>
                    <p>
                        エージェント個別のインストラクションに加え、CX Agent Studio では<strong>エージェントアプリケーション全体の高度な設定</strong>として「グローバルインストラクション」を定義できます<a className="footnote-ref" href="#ref10" id="fnref37" role="doc-noteref"><sup>10</sup></a>。エージェントアプリケーション内のすべてのエージェントはグローバルインストラクションを継承し、会話の各ターンごとに、エージェント個別のインストラクションに上乗せする形でモデルへ送信されます。ブランドトーンや全般的な「やるべきこと／やってはいけないこと」、グローバルに共有される変数、顧客プロファイルなど、すべてのエージェントが知っておくべき汎用的な情報を定義するのに適しています<a className="footnote-ref" href="#ref10" id="fnref38" role="doc-noteref"><sup>10</sup></a>。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">✓</div>
                        <div className="body">
                            <div className="label">ベストプラクティス</div>
                            <ul>
                                <li>
                                    まずは自然言語で素朴にインストラクションを書き、<code>Restructure instructions</code> でXML構造に変換してから <code>role</code> / <code>persona</code> / <code>constraints</code> / <code>taskflow</code> / <code>examples</code> の各セクションを磨き込む、というワークフローが効率的である。
                                </li>
                                <li>
                                    Few-shot サンプルは「モデルが実際に間違えたケース」から逆算して追加する。仮説ベースで大量のサンプルを先回りして詰め込むと、かえって過学習・汎化性能の低下を招く。
                                </li>
                                <li>
                                    ブランドトーンや共通の禁止事項は個々のエージェントのインストラクションに重複して書かず、グローバルインストラクションに一元化することで、保守性と一貫性を両立できる。
                                </li>
                            </ul>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
