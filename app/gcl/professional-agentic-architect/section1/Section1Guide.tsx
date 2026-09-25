'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import {
    DIAGRAMS,
    type DiagramId,
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
                        本ガイドは、Google Cloud 認定資格「<a href="https://cloud.google.com/learn/certification/agentic-architect">Professional Agentic Architect</a>」<a className="footnote-ref" href="#ref2" id="fnref1" role="doc-noteref"><sup>2</sup></a>（ベータ試験）の{' '}
                        <strong>セクション1: ローコードツールでのエージェント構築（Building agents using low-code tools）</strong>{' '}
                        を、初学者向けにステップバイステップで解説するものです。公式{' '}
                        <a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf">試験ガイドPDF</a><a className="footnote-ref" href="#ref1" id="fnref2" role="doc-noteref"><sup>1</sup></a>{' '}
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
                        Google が用意した{' '}
                        <strong>Gemini Enterprise 上のローコード／ノーコード・ビルダー</strong>{' '}
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
                        が「決定的なビジネスロジックと生成AIを組み合わせ、コードを1行も書かずにシンプルなアシスタントから高度に複雑な自律オーケストレーターまで構築できる」機能として拡張されたことが発表されました<a className="footnote-ref" href="#ref3" id="fnref8" role="doc-noteref"><sup>3</sup></a>。さらに2026年8月のリリースノートでは、Agent Designer が{' '}
                        <strong>Workflow Builder</strong> に名称変更され
                        GA（一般提供）に到達したことが記載されています。Workflow Builder
                        は、スケジュール実行・オンデマンド実行・チャット内での{' '}
                        <code>@メンション</code> 呼び出しに対応し、既存の A2A／ADK
                        エージェントをインポートして一元管理できる点、Google
                        Workspace（Gmail・カレンダー・Chat・Drive）や
                        Slack・Jira・ServiceNow・Confluence・Microsoft OneDrive／SharePoint・Outlook
                        等のエンタープライズコネクタに接続できる点が特徴です<a className="footnote-ref" href="#ref6" id="fnref9" role="doc-noteref"><sup>6</sup></a>。
                    </p>
                    <p>
                        一方、<strong>Customer Experience Agent Studio（CX Agent Studio）</strong>{' '}
                        は、AIとエージェントビルダーUIを用いてユーザーを支援する、ミニマルコードの会話型エージェントビルダーです<a className="footnote-ref" href="#ref8" id="fnref10" role="doc-noteref"><sup>8</sup></a>。CX Agent Studio は Agent Development
                        Kit（ADK）を基盤に構築されており、ノーコード／ローコードのユーザー層にも ADK
                        の能力を届けることを狙いとしています。CX Agent Studio は{' '}
                        <strong>Dialogflow CX の進化形</strong>{' '}
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
                        つまり、<strong>「社内向けの汎用タスク自動化・マルチステップワークフロー」には Workflow Builder（旧 Agent Designer）</strong>、<strong>「顧客対応・コンタクトセンター向けの高度な会話型エージェント」には CX Agent Studio</strong>{' '}
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
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    まず「エージェントが対話する相手が社内の従業員か、社外の顧客か」で一次判断を行う。前者に寄るタスク（社内ワークフロー・レポーティング・チーム間連携）は Workflow Builder、後者に寄るタスク（カスタマーサポート・音声IVR）は CX Agent Studio が第一候補になる。
                                </li>{' '}
                                <li>
                                    「決定的（deterministic）」な業務ロジックが必要な部分（本人確認、規定に沿った段階的なデータ収集など）と、「生成的（generative）」な自由対応が必要な部分を切り分けて設計することが、両ツール共通の設計原則である。
                                </li>{' '}
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
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    新規ユースケースはすべて CX Agent Studio エージェントとして構築し、既存の複雑な Dialogflow CX 資産（playbook とフローが密結合しているもの）は当面維持しつつ、ルーティング層で両者を振り分ける「エージェントタイプの分離（isolated approach）」から始めるのが移行の第一選択となる<a className="footnote-ref" href="#ref9" id="fnref25" role="doc-noteref"><sup>9</sup></a>。
                                </li>{' '}
                                <li>
                                    playbook とフローの相互作用が CX Agent Studio のルーティング層からブラックボックスとして見える限り、playbook を含む構成も許容される。一方で、複数の CX フローと CX Agent Studio エージェントが行き来する「convolutedな」構成はカプセル化を損なうため避ける<a className="footnote-ref" href="#ref9" id="fnref26" role="doc-noteref"><sup>9</sup></a>。
                                </li>{' '}
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
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    まずは自然言語で素朴にインストラクションを書き、<code>Restructure instructions</code> でXML構造に変換してから <code>role</code> / <code>persona</code> / <code>constraints</code> / <code>taskflow</code> / <code>examples</code> の各セクションを磨き込む、というワークフローが効率的である。
                                </li>{' '}
                                <li>
                                    Few-shot サンプルは「モデルが実際に間違えたケース」から逆算して追加する。仮説ベースで大量のサンプルを先回りして詰め込むと、かえって過学習・汎化性能の低下を招く。
                                </li>{' '}
                                <li>
                                    ブランドトーンや共通の禁止事項は個々のエージェントのインストラクションに重複して書かず、グローバルインストラクションに一元化することで、保守性と一貫性を両立できる。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <h2 id="3-12-gemini-enterprise-へのエンタープライズデータ接続">
                        3. 1.2 Gemini Enterprise へのエンタープライズデータ接続
                    </h2>
                    <h3 id="31-agent-search旧-vertex-ai-searchとデータ接続">
                        3.1 Agent Search（旧 Vertex AI Search）とデータ接続
                    </h3>
                    <p>
                        出題項目1.2の中心となるのが <strong>Agent Search</strong>（旧称 Vertex AI Search）です。Agent Search は、Webサイト・構造化データ・非構造化データを対象に、Googleクオリティの検索体験を構築できるサービスであり、生成AIエージェント／アプリを構築するためのグラウンディングシステムと、DIY向けのグラウンディングAPIをすぐに使える形で提供しています<a className="footnote-ref" href="#ref11" id="fnref39" role="doc-noteref"><sup>11</sup></a>。
                    </p>
                    <p>
                        エンタープライズが Agent Search を活用する代表的な機会は次の2つです<a className="footnote-ref" href="#ref11" id="fnref40" role="doc-noteref"><sup>11</sup></a>。
                    </p>
                    <ol>
                        <li>
                            社内イントラネットや顧客向けWebサイトの検索体験を、単純なキーワード一致から、Google 検索の生成的な検索体験に近い会話型検索へと刷新する
                        </li>
                        <li>
                            深い情報検索・最新の自然言語処理・大規模言語処理を組み合わせ、ユーザーの意図を理解して最も関連性の高い結果を返す
                        </li>
                    </ol>
                    <p>
                        Agent Search は、Gemini Enterprise Agent Platform の<strong>拡張機能（extensions）</strong>と<strong>データコネクタ（data connectors）</strong>を通じて、自社システム・Google製品・サードパーティアプリケーションに接続できます<a className="footnote-ref" href="#ref11" id="fnref41" role="doc-noteref"><sup>11</sup></a>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">種別</th>
                                    <th scope="col">説明</th>
                                    <th scope="col">例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>データコネクタ（取り込み用）</td>
                                    <td>
                                        Agent Search が対象アプリケーションのデータをインデックスへ取り込むための接続。多くは<strong>読み取り専用</strong>で、定期的に同期される
                                    </td>
                                    <td>Jira、Confluence、Salesforce</td>
                                </tr>
                                <tr className="even">
                                    <td>接続アプリ（Workflow Builder）</td>
                                    <td>
                                        インデックスへの取り込みではなく、<strong>実行時に対象アプリへ問い合わせて検索・データ更新のアクション</strong>を行う接続。Workflow Builder のエージェントが呼び出す
                                    </td>
                                    <td>Google Workspace、Slack、Jira、ServiceNow</td>
                                </tr>
                                <tr className="odd">
                                    <td>Agent Platform 拡張機能</td>
                                    <td>
                                        <strong>ユーザーに代わって外部システムのアクション（取引等）を実行</strong>できる。Workflow Builder の接続アプリと同じく実行時にライブの外部システムを呼ぶ経路であり、取り込みとは別系統
                                    </td>
                                    <td>メール送信、チケット作成等</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        出題ガイドの試験対象ツール一覧にも記載されている <strong>Agent Search</strong> と <strong>Agent Registry・MCPサーバー</strong> の連携についても触れておくと、Agent Search のデータストアは Model Context Protocol（MCP）サーバーとしても公開できるため、ADK エージェントや CX Agent Studio、その他 MCP 対応クライアントから「1つのツール」として呼び出すことができます<a className="footnote-ref" href="#ref13" id="fnref42" role="doc-noteref"><sup>13</sup></a>。CX Agent Studio 側にも、データストアを直接ツールとして追加する仕組みが用意されています（Data store tools、Website data store tools、Cloud storage data store tools、File Search tools など）<a className="footnote-ref" href="#ref8" id="fnref43" role="doc-noteref"><sup>8</sup></a>。
                    </p>
                    <Diagram id="diag6" label="エンタープライズデータ接続アーキテクチャ" />
                    <p>
                        なお、Agent Search は2026年4月の Google Cloud Next で Vertex AI Search から改称されたブランドですが、Google Cloud コンソールのUI表示は当面「Vertex AI Search and AI Applications」のままであり、APIも引き続き Discovery Engine API のエンドポイントを使用します。改称後もプロダクトの機能自体は変わっていない点に注意してください<a className="footnote-ref" href="#ref12" id="fnref44" role="doc-noteref"><sup>12</sup></a><a className="footnote-ref" href="#ref14" id="fnref45" role="doc-noteref"><sup>14</sup></a>。
                    </p>
                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    データストアと、その上に構築する検索アプリ（あるいはエージェントのツール）は<strong>疎結合</strong>である。1つのデータストアを複数の検索アプリで再利用したり、逆に複数のデータストアを1つのアプリで横断検索したりできるため、「検索ウィジェット」から「エージェントのツール」へ用途を変えたい場合でも、データの再取り込みは不要である。
                                </li>{' '}
                                <li>
                                    データコネクタは同期対象アプリケーションの<strong>アクセス制御（ACL）を尊重</strong>できる。ただしユーザー単位のACLが実際に適用されるのは、①ACL対応のコネクタを使用し、②データソース側でACLが設定されており、③同期に必要な権限・スコープが付与され、④identity sync（IDプロバイダとのID紐付け）が構成されている、という条件がすべて満たされた場合に限る。これらが未構成の場合はACLは適用されないため、設計時に4条件の充足を必ず確認する。
                                </li>{' '}
                                <li>
                                    「インデックス済みの読み取りだけで十分か」なら<strong>データコネクタ</strong>（取り込み＋定期同期）、「常に最新の値を実行時に取りに行きたい、あるいは対象アプリへ書き込ませたい」なら<strong>Workflow Builder の接続アプリ</strong>、「ユーザーに代わって外部システムで取引などのアクションを完了させたい」なら<strong>Agent Platform 拡張機能</strong>を選ぶ。接続アプリと拡張機能は取り込み経路ではなく実行時の検索・書き込み経路である点を、データコネクタと明確に区別する。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <h3 id="32-非構造化マルチモーダルデータ動画音声画像の取り込みと処理">
                        3.2 非構造化マルチモーダルデータ（動画・音声・画像）の取り込みと処理
                    </h3>
                    <p>
                        出題項目1.2のもう一方の柱は、「<strong>動画・音声・画像などの非構造化マルチモーダルデータをエージェントのワークフローに取り込み、処理する</strong>」ことです。Gemini Enterprise Agent Platform では、この要件に対応する複数の仕組みが用意されています。
                    </p>
                    <h4>Geminiのネイティブなマルチモーダル理解</h4>
                    <p>
                        Gemini モデルは、テキストと同じリクエスト内で動画・音声・画像を直接扱うことができます。動画については、音声を含む単一または複数の動画をリクエストに含めることが可能です<a className="footnote-ref" href="#ref17" id="fnref46" role="doc-noteref"><sup>17</sup></a>。特に注目すべきは「<strong>エージェント型動画理解（agentic video understanding）</strong>」という機能で、これは従来の「固定フレームレート（既定1FPS）で動画を静的に取り込む」処理とは異なり、モデルのコア推論能力とネイティブな動画ツールを組み合わせ、視覚フレーム・音声・トランスクリプトを横断して動画の特定セグメントを<strong>動的に検索・スキャン・検査</strong>する仕組みです<a className="footnote-ref" href="#ref21" id="fnref47" role="doc-noteref"><sup>21</sup></a>。
                    </p>
                    <h4>Gemini Embedding 2 による統一マルチモーダル埋め込み</h4>
                    <p>
                        複数モダリティのデータを横断的に検索・検索拡張生成（RAG）に活用するための基盤が <strong>Gemini Embedding 2</strong> です。これは Gemini API で最初に、テキスト・画像・動画・音声・ドキュメントを<strong>単一の埋め込み空間</strong>にマッピングするモデルであり、100以上の言語に対応しています<a className="footnote-ref" href="#ref15" id="fnref48" role="doc-noteref"><sup>15</sup></a><a className="footnote-ref" href="#ref16" id="fnref49" role="doc-noteref"><sup>16</sup></a>。1回の呼び出しで扱える入力量の目安は、テキスト最大8,192トークン、画像6枚、音声180秒、PDF6ページです<a className="footnote-ref" href="#ref16" id="fnref50" role="doc-noteref"><sup>16</sup></a>。動画の最大時間は音声抽出設定によって変わり、<code>audio_track_extraction</code> が無効な場合はデフォルトの1 FPSで最大120秒、有効な場合は動画と音声が同じ8,192トークンの上限を共有するため、同条件で最大およそ81秒となります<a className="footnote-ref" href="#ref16" id="fnref51" role="doc-noteref"><sup>16</sup></a>。
                    </p>
                    <p>
                        Gemini Embedding 2 は Matryoshka Representation Learning（MRL）に対応しており、精度をあまり落とさずに出力次元数を切り詰められます<a className="footnote-ref" href="#ref20" id="fnref52" role="doc-noteref"><sup>20</sup></a>。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">出力次元数</th>
                                    <th scope="col">用途の目安</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>3072</td>
                                    <td>最大精度（デフォルト）。ストレージコストも最大</td>
                                </tr>
                                <tr className="even">
                                    <td>1536</td>
                                    <td>多くの本番システムに適したバランス</td>
                                </tr>
                                <tr className="odd">
                                    <td>768</td>
                                    <td>軽量。モバイル／エッジ向け</td>
                                </tr>
                                <tr className="even">
                                    <td>256</td>
                                    <td>超小型。超高スループットが求められるシステム向け</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        さらに、埋め込み対象を最適化するための<strong>カスタムタスク指示</strong>を指定できます<a className="footnote-ref" href="#ref15" id="fnref53" role="doc-noteref"><sup>15</sup></a>。Gemini Embedding 2 では <code>task_type</code> の列挙値ではなく、入力テキストの先頭にタスクを記述するプロンプト形式（例：<code>task: search result | query: {'{content}'}</code>、<code>task: code retrieval | query: {'{content}'}</code>）でタスクを指定します。
                    </p>
                    <p>
                        一方、従来のテキスト埋め込み API では、次のような <code>task_type</code> の列挙値でタスクを指定します。
                    </p>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">タスクタイプ</th>
                                    <th scope="col">用途</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td><code>RETRIEVAL_DOCUMENT</code></td>
                                    <td>
                                        データ取り込み時に、検索対象のドキュメントをインデックス化する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><code>RETRIEVAL_QUERY</code></td>
                                    <td>検索時に、ユーザーの質問文を埋め込む</td>
                                </tr>
                                <tr className="odd">
                                    <td><code>SEMANTIC_SIMILARITY</code></td>
                                    <td>
                                        2つのテキストがどれだけ意味的に近いかを測る意味的テキスト類似度（STS）タスク
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td><code>CLASSIFICATION</code></td>
                                    <td>カテゴリ分類タスク</td>
                                </tr>
                                <tr className="odd">
                                    <td><code>CLUSTERING</code></td>
                                    <td>クラスタリングや重複排除タスク</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p>
                        同一の意味空間にテキストと画像・動画の埋め込みベクトルがマッピングされるため、「テキストで画像を検索する」「画像で動画を検索する」といったクロスモーダル検索が実現できます<a className="footnote-ref" href="#ref19" id="fnref54" role="doc-noteref"><sup>19</sup></a>。
                    </p>
                    <h4>マルチモーダルデータセット（Agent Platform）</h4>
                    <p>
                        Gemini Enterprise Agent Platform には、ファインチューニングやバッチ予測に向けた「マルチモーダルデータセット」という管理対象データセットの一種が用意されています。これは他の単一モダリティ用データセットと異なり、テキスト・画像・音声・動画のいずれのデータも含められる点が特徴です<a className="footnote-ref" href="#ref18" id="fnref55" role="doc-noteref"><sup>18</sup></a>。マルチモーダルデータセットは Gemini のような Google モデル専用であり（サードパーティモデルには使用不可）、BigQuery を基盤としています。既存の BigQuery テーブルや DataFrame から作成した場合は、データを物理コピーせずロジカルビューとして扱うため追加のストレージコストが発生しない一方、それ以外のソースから作成した場合は BigQuery への新規コピーが発生し、ストレージコストがかかります<a className="footnote-ref" href="#ref18" id="fnref56" role="doc-noteref"><sup>18</sup></a>。
                    </p>
                    <Diagram id="diag7" label="マルチモーダル非構造化データ処理パイプライン" />
                    <div className="callout-practice">
                        <div className="icon">✓</div>{' '}
                        <div className="body">
                            <div className="label">ベストプラクティス</div>{' '}
                            <ul>
                                <li>
                                    「動画の中の特定シーンだけをピンポイントで参照させたい」場合は、静的な固定フレームレート処理ではなく、エージェント型動画理解が動的にセグメントを検索・検査する挙動を活かせるようプロンプト・ツール設計を行う。
                                </li>{' '}
                                <li>
                                    マルチモーダル検索基盤を新規設計する際は、モダリティごとに別々の埋め込みモデル・ベクトルインデックスを用意するのではなく、Gemini Embedding 2 のような統一埋め込み空間を使うことで、クロスモーダル検索とRAGパイプラインの実装をシンプルに保てる。
                                </li>{' '}
                                <li>
                                    出力次元数（3072/1536/768/256）はストレージコストと精度のトレードオフである。本番規模のシステムでは、まず1536次元を既定候補として検討し、レイテンシ・コスト要件が厳しい場合にのみ次元削減を検討するのが実務的な進め方である。
                                </li>{' '}
                                <li>
                                    ファインチューニングやバッチ予測でマルチモーダルデータを扱う場合、既存の BigQuery テーブルを流用できないかを先に検討する。新規コピーを避けられればストレージコストとデータ重複・フォーマット不整合のリスクを同時に減らせる。
                                </li>
                            </ul>
                        </div>
                    </div>
                    <hr />
                    <h2 id="4-セクション1-ベストプラクティス総まとめ">
                        4. セクション1 ベストプラクティス総まとめ
                    </h2>
                    <div className="table-scroll">
                        <table>
                            <thead>
                                <tr className="header">
                                    <th scope="col">トピック</th>
                                    <th scope="col">重要なベストプラクティス</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="odd">
                                    <td>ツール選定</td>
                                    <td>
                                        対話相手が社内従業員か社外顧客かでまず一次判断し、決定的ロジックと生成的対応を切り分けて設計する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>状態ベースワークフロー</td>
                                    <td>
                                        フローは常に「ブラックボックス」として扱い、入出力は明示的なパラメータマッピングで受け渡す
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>インストラクション設計</td>
                                    <td>
                                        自然言語→XML構造化（role/persona/constraints/taskflow/examples）の順で磨き込み、共通ルールはグローバルインストラクションに集約する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>Few-shot</td>
                                    <td>
                                        実際の失敗事例から逆算して最小限追加し、過学習による汎化性能の低下を避ける
                                    </td>
                                </tr>
                                <tr className="odd">
                                    <td>データ接続</td>
                                    <td>
                                        データストアと検索アプリ／ツールを疎結合に保つ。ユーザー単位ACLはACL対応コネクタ・ソース側ACL・必要な権限／スコープ・identity syncがすべて構成された場合にのみ適用される前提でセキュリティ設計する
                                    </td>
                                </tr>
                                <tr className="even">
                                    <td>マルチモーダル取り込み</td>
                                    <td>
                                        統一埋め込み空間（Gemini Embedding 2）でモダリティ横断のRAG基盤をシンプルに保ち、動画は動的なエージェント型理解を活用する
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <hr />
                    <h2 id="5-学習チェックリスト">5. 学習チェックリスト</h2>
                    <div className="checklist-card">
                        <div className="checklist-header">
                            <span className="title">学習チェックリスト</span>
                            <span className="count">{checkedCount} / 19 完了</span>
                        </div>
                        <ul className="checklist-items">
                            <li>
                                <input id="chk1" type="checkbox" checked={Boolean(checkedItems['chk1'])} onChange={() => toggleCheck('chk1')} /><label htmlFor="chk1">Workflow Builder（旧 Agent Designer）と CX Agent Studio の違いと使い分け基準を説明できる</label>
                            </li>
                            <li>
                                <input id="chk2" type="checkbox" checked={Boolean(checkedItems['chk2'])} onChange={() => toggleCheck('chk2')} /><label htmlFor="chk2">Workflow Builder の主要タブ（Chat／Flow／Schedule／Preview）の役割を説明できる</label>
                            </li>
                            <li>
                                <input id="chk3" type="checkbox" checked={Boolean(checkedItems['chk3'])} onChange={() => toggleCheck('chk3')} /><label htmlFor="chk3">ページ、インテントルート、条件ルート、イベントハンドラの違いを説明できる</label>
                            </li>
                            <li>
                                <input id="chk4" type="checkbox" checked={Boolean(checkedItems['chk4'])} onChange={() => toggleCheck('chk4')} /><label htmlFor="chk4">状態ハンドラの「スコープ」と評価順序の基本を理解している</label>
                            </li>
                            <li>
                                <input id="chk5" type="checkbox" checked={Boolean(checkedItems['chk5'])} onChange={() => toggleCheck('chk5')} /><label htmlFor="chk5">CX Agent Studio の Flow-based エージェントで既存 Dialogflow CX フローを移行する際の「ブラックボックス原則」を説明できる</label>
                            </li>
                            <li>
                                <input id="chk6" type="checkbox" checked={Boolean(checkedItems['chk6'])} onChange={() => toggleCheck('chk6')} /><label htmlFor="chk6">システムインストラクションでの変数・ツール・サブエージェント参照構文（<code>{'{var}'}</code>、<code>{'{@TOOL:}'}</code>、<code>{'{@AGENT:}'}</code>）を使える</label>
                            </li>
                            <li>
                                <input id="chk7" type="checkbox" checked={Boolean(checkedItems['chk7'])} onChange={() => toggleCheck('chk7')} /><label htmlFor="chk7">Restructure instructions が生成するXML構造（role／persona／constraints／taskflow／examples等）の各タグの役割を説明できる</label>
                            </li>
                            <li>
                                <input id="chk8" type="checkbox" checked={Boolean(checkedItems['chk8'])} onChange={() => toggleCheck('chk8')} /><label htmlFor="chk8">taskflow → subtask → step（trigger／action）の階層構造が、構造化されたタスク分解・指示設計として有効である理由を説明できる</label>
                            </li>
                            <li>
                                <input id="chk9" type="checkbox" checked={Boolean(checkedItems['chk9'])} onChange={() => toggleCheck('chk9')} /><label htmlFor="chk9">Few-shotサンプルの4要素（<code>[user]</code>／<code>[model]</code>／<code>tool_code</code>／<code>tool_outputs</code>）を使ってサンプルを書ける</label>
                            </li>
                            <li>
                                <input id="chk10" type="checkbox" checked={Boolean(checkedItems['chk10'])} onChange={() => toggleCheck('chk10')} /><label htmlFor="chk10">Few-shotサンプルを使うべき場面と、過学習（overfit）のリスクを説明できる</label>
                            </li>
                            <li>
                                <input id="chk11" type="checkbox" checked={Boolean(checkedItems['chk11'])} onChange={() => toggleCheck('chk11')} /><label htmlFor="chk11">グローバルインストラクションとエージェント個別インストラクションの違いと使い分けを説明できる</label>
                            </li>
                            <li>
                                <input id="chk12" type="checkbox" checked={Boolean(checkedItems['chk12'])} onChange={() => toggleCheck('chk12')} /><label htmlFor="chk12">Agent Search（旧Vertex AI Search）のデータストアと、データコネクタ／拡張機能の違いを説明できる</label>
                            </li>
                            <li>
                                <input id="chk13" type="checkbox" checked={Boolean(checkedItems['chk13'])} onChange={() => toggleCheck('chk13')} /><label htmlFor="chk13">データコネクタでユーザー単位ACLが適用されるための4条件（ACL対応コネクタ・ソース側ACL・必要な権限／スコープ・identity sync）と、データストアと検索アプリが疎結合である利点を説明できる</label>
                            </li>
                            <li>
                                <input id="chk14" type="checkbox" checked={Boolean(checkedItems['chk14'])} onChange={() => toggleCheck('chk14')} /><label htmlFor="chk14">Agent SearchのMCPサーバー経由でのツール公開の仕組みを理解している</label>
                            </li>
                            <li>
                                <input id="chk15" type="checkbox" checked={Boolean(checkedItems['chk15'])} onChange={() => toggleCheck('chk15')} /><label htmlFor="chk15">Gemini Embedding 2による統一マルチモーダル埋め込み空間の特徴（対応モダリティ・入力量の目安・MRLによる次元数の切り詰め）を説明できる</label>
                            </li>
                            <li>
                                <input id="chk16" type="checkbox" checked={Boolean(checkedItems['chk16'])} onChange={() => toggleCheck('chk16')} /><label htmlFor="chk16">Gemini Embedding 2のカスタムタスク指示形式（<code>task: search result | query: {'{content}'}</code> のようなプロンプト形式）でタスクを指定できる</label>
                            </li>
                            <li>
                                <input id="chk17" type="checkbox" checked={Boolean(checkedItems['chk17'])} onChange={() => toggleCheck('chk17')} /><label htmlFor="chk17">従来のテキスト埋め込みAPIが使う<code>task_type</code>列挙値との違いを説明できる</label>
                            </li>
                            <li>
                                <input id="chk18" type="checkbox" checked={Boolean(checkedItems['chk18'])} onChange={() => toggleCheck('chk18')} /><label htmlFor="chk18">動画理解における「静的な固定フレームレート処理」と「エージェント型動画理解」の違いを説明できる</label>
                            </li>
                            <li>
                                <input id="chk19" type="checkbox" checked={Boolean(checkedItems['chk19'])} onChange={() => toggleCheck('chk19')} /><label htmlFor="chk19">マルチモーダルデータセット（Agent Platform）がBigQueryを基盤とすることと、そのコスト構造を理解している</label>
                            </li>
                        </ul>
                    </div>
                    <hr />
                    <h2 id="6-参考文献">6. 参考文献</h2>
                    <h3 id="試験ガイド認定情報">試験ガイド・認定情報</h3>
                    <div className="ref-grid">
                        <div className="ref-card" id="ref1">
                            <div className="num">1</div>
                            <div className="txt">
                                <a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf">Professional Agentic Architect Certification exam guide (PDF)</a> — Google Cloud
                            </div>
                        </div>
                        <div className="ref-card" id="ref2">
                            <div className="num">2</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/learn/certification/agentic-architect">Professional Agentic Architect | Google Cloud Learn</a> — 認定資格の公式概要ページ
                            </div>
                        </div>
                    </div>
                    <h3 id="gemini-enterprise--workflow-builder旧-agent-designer">
                        Gemini Enterprise / Workflow Builder（旧 Agent Designer）
                    </h3>
                    <div className="ref-grid">
                        <div className="ref-card" id="ref3">
                            <div className="num">3</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/blog/products/ai-machine-learning/whats-new-in-gemini-enterprise">What&apos;s new in Gemini Enterprise | Google Cloud Blog</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref4">
                            <div className="num">4</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini/enterprise/docs/agent-designer">Agent Designer overview | Gemini Enterprise Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref5">
                            <div className="num">5</div>
                            <div className="txt">
                                <a href="https://support.google.com/g/answer/16540723?hl=en">Create and manage agents using Agent Designer | Gemini Enterprise – Business Edition Help</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref6">
                            <div className="num">6</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini/enterprise/docs/release-notes">Gemini Enterprise release notes | Google Cloud Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref7">
                            <div className="num">7</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/overview">Agent Platform overview | Gemini Enterprise Agent Platform Documentation</a>
                            </div>
                        </div>
                    </div>
                    <h3 id="customer-experiencecxagent-studio">
                        Customer Experience（CX）Agent Studio
                    </h3>
                    <div className="ref-grid">
                        <div className="ref-card" id="ref8">
                            <div className="num">8</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio">CX Agent Studio | Google Cloud Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref9">
                            <div className="num">9</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/flow">Flow-based agents | CX Agent Studio Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref10">
                            <div className="num">10</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-cx/cx-agent-studio/instruction">Instructions | CX Agent Studio Documentation</a>
                            </div>
                        </div>
                    </div>
                    <h3 id="agent-search旧-vertex-ai-searchとデータ接続">
                        Agent Search（旧 Vertex AI Search）とデータ接続
                    </h3>
                    <div className="ref-grid">
                        <div className="ref-card" id="ref11">
                            <div className="num">11</div>
                            <div className="txt">
                                <a href="https://cloud.google.com/products/gemini-enterprise-agent-platform/agent-search">Agent Search on Gemini Enterprise Agent Platform | Google Cloud</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref12">
                            <div className="num">12</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/generative-ai-app-builder/docs/create-data-store-es">Create a search data store | Agent Search Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref13">
                            <div className="num">13</div>
                            <div className="txt">
                                <a href="https://codelabs.developers.google.com/ge-gws-agents">Integrate Gemini Enterprise Agents with Google Workspace | Google Codelabs</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref14">
                            <div className="num">14</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/generative-ai-app-builder/docs/release-notes">Agent Search release notes | Google Cloud Documentation</a>
                            </div>
                        </div>
                    </div>
                    <h3 id="マルチモーダルデータとembedding">マルチモーダルデータとEmbedding</h3>
                    <div className="ref-grid">
                        <div className="ref-card" id="ref15">
                            <div className="num">15</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2">Gemini Embedding 2 | Gemini Enterprise Agent Platform Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref16">
                            <div className="num">16</div>
                            <div className="txt">
                                <a href="https://developers.googleblog.com/building-with-gemini-embedding-2/">Building with Gemini Embedding 2: Agentic multimodal RAG and beyond | Google Developers Blog</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref17">
                            <div className="num">17</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/video-understanding">Video understanding | Gemini Enterprise Agent Platform Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref18">
                            <div className="num">18</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/capabilities/datasets">Multimodal datasets | Gemini Enterprise Agent Platform Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref19">
                            <div className="num">19</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/embeddings/get-multimodal-embeddings">Get multimodal embeddings | Gemini Enterprise Agent Platform Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref20">
                            <div className="num">20</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/gemini/embedding-2">Gemini Embedding 2 | Gemini Enterprise Agent Platform Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref21">
                            <div className="num">21</div>
                            <div className="txt">
                                <a href="https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-agentic-video-in-gemini/">Introducing agentic video understanding with Gemini</a>
                            </div>
                        </div>
                    </div>
                    <h3 id="dialogflow-cx-状態ベースワークフロー基礎概念">
                        Dialogflow CX 状態ベースワークフロー（基礎概念）
                    </h3>
                    <div className="ref-grid">
                        <div className="ref-card" id="ref22">
                            <div className="num">22</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/dialogflow/cx/docs/concept/page">Pages | Dialogflow CX Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref23">
                            <div className="num">23</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/dialogflow/cx/docs/how/migrate">Migrating from Dialogflow ES to Dialogflow CX | Google Cloud Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref24">
                            <div className="num">24</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/dialogflow/cx/docs/concept/handler">State handlers | Dialogflow CX Documentation</a>
                            </div>
                        </div>
                        <div className="ref-card" id="ref25">
                            <div className="num">25</div>
                            <div className="txt">
                                <a href="https://docs.cloud.google.com/dialogflow/cx/docs/concept/page">Pages | Dialogflow CX Documentation</a>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
