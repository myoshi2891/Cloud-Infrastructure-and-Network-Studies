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
        <div className="mermaid-wrap">
            <MermaidDiagram
                chart={chart}
                ariaLabel={ariaLabel}
                preserveNaturalScale={true}
                theme="light"
            />
        </div>
    );
});

export default function Section4Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const totalChecklist = 17;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    const handleCheckChange = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="agentic-section4-page">
            <div className="layout">
                <NavBar />
                <main className="main">

                <div className="hero">
                    <div className="kicker">Professional Agentic Architect &middot; Section 4</div>
                    <h1>
                        Professional Agentic Architect 認定試験 徹底解説：セクション4 評価とデプロイ
                    </h1>
                    <div className="meta-row">
                        <span className="pill">配点 <strong>約22%</strong></span>
                        <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 9点</strong></span>
                        <span className="pill">参考文献 <strong>22件</strong></span>
                    </div>
                </div>

                <p>
                    対象セクション：<strong
                        >Section 4: Evaluating and deploying agentic
                        workflows（評価とデプロイ）</strong>{' '}―― 出題比率 約22% 本ガイドは Google Cloud 公式認定ページ{' '}<a className="footnote-ref" href="#ref1" id="fnref1" role="doc-noteref"><sup>1</sup></a>{' '}と公式 Exam Guide PDF{' '}<a className="footnote-ref" href="#ref2" id="fnref2" role="doc-noteref"><sup>2</sup></a>{' '}の記述に基づき、4.1・4.2 の各出題項目を初学者向けに一つずつ丁寧に解説します。
                </p>

                <h2 id="はじめに">はじめに</h2>
                <p>
                    Professional Agentic Architect
                    試験のセクション4は、「作ったエージェントが本当に正しく動くのか」「本番でどう安定して動かし続けるのか」という、エージェント開発の最終段階を扱います。公式
                    Exam Guide では以下の2項目・約22%の配点が定義されています<a
                        className="footnote-ref"
                        href="#ref2"
                        id="fnref3"
                        role="doc-noteref"
                        ><sup>2</sup></a
                    >。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">項目</th>
                                <th scope="col">出題内容</th>
                                <th scope="col">配点目安</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>4.1 Evaluating agents in development and in production</td>
                                <td>
                                    テストセット作成、継続的評価パイプライン、評価フレームワーク選定、ゴールデンデータセット評価
                                </td>
                                <td>セクション4内の前半</td>
                            </tr>
                            <tr className="even">
                                <td>4.2 Deploying and scaling production workloads</td>
                                <td>
                                    デプロイランタイム選定、トラブルシューティング、パフォーマンス監視と最適化
                                </td>
                                <td>セクション4内の後半</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    LLM
                    エージェントは非決定的（同じ入力でも毎回微妙に異なる出力を返す）という性質を持つため、通常のソフトウェアテストのような「合格/不合格」の単純な判定だけでは品質を保証できません<a
                        className="footnote-ref"
                        href="#ref3"
                        id="fnref4"
                        role="doc-noteref"
                        ><sup>3</sup></a
                    >。そのためGoogle
                    Cloudは、開発中の単体テスト的な評価から、本番トラフィックに対する継続的な品質監視まで、開発ライフサイクル全体をカバーする評価の仕組みを用意しています。以下の図は、本ガイドが扱う全体像です。
                </p>
                <Diagram id="diag-1" ariaLabel="開発・CI/CD・本番フェーズのライフサイクル循環図" />
                <p>
                    この図が示す通り、評価（4.1）とデプロイ（4.2）は一方通行の工程ではなく、本番での観測結果が次の評価データセットにフィードバックされる循環構造を持ちます。この循環を意識しながら、各項目を見ていきましょう。
                </p>
                <h2 id="41-開発時本番環境でのエージェント評価">
                    4.1 開発時・本番環境でのエージェント評価
                </h2>
                <p>
                    Exam Guide 原文4.1は次の4つの考慮事項を挙げています<a
                        className="footnote-ref"
                        href="#ref2"
                        id="fnref5"
                        role="doc-noteref"
                        ><sup>2</sup></a
                    >。
                </p>
                <ul>
                    <li>
                        Creating test sets for agent
                        evaluation（ゴールデンデータ、プロンプト、エッジケースを含むテストセットの作成）
                    </li>{' '}
                            <li>
                        Creating continuous evaluation pipelines to assess an agent&apos;s tool execution
                        based on established success
                        criteria（確立された成功基準に基づきツール実行を評価する継続的評価パイプラインの構築）
                    </li>{' '}
                            <li>
                        Determining the appropriate evaluation framework and tooling（ADK evaluation
                        tooling (evalset)、Agent Platform Gen AI evaluation service、custom
                        autoraters などの適切な評価フレームワーク／ツールの決定）
                    </li>{' '}
                            <li>
                        Evaluating an agentic system against a golden dataset to assess agent
                        response and retrieval
                        quality（ADKを使用したゴールデンデータセットに対する評価）
                    </li>
                </ul>
                <h3 id="411-テストセットの作成ゴールデンデータプロンプトエッジケース">
                    4.1.1 テストセットの作成：ゴールデンデータ、プロンプト、エッジケース
                </h3>
                <p>
                    エージェント評価の出発点は「何を正解とするか」を定義するテストデータです。ADK（Agent
                    Development Kit）の評価フレームワークは、この正解データを{' '}<strong>EvalSet</strong>（評価セット）という構造化データとして表現します<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref6"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <p>
                    ADKにおけるエージェント評価は、大きく2つの観点に分解されます<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref7"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <ol>
                    <li>
                        <strong>トラジェクトリ（trajectory）とツール利用の評価</strong
                        >：エージェントが最終回答に至るまでにどのツールをどの順序で呼び出したかを、期待されるステップ列と比較する。
                    </li>{' '}
                            <li>
                        <strong>最終応答（final response）の評価</strong
                        >：エージェントが返した最終的な回答の品質・正確性・関連性を評価する。
                    </li>
                </ol>
                <p>
                    ADKは1件のセッション（会話）を評価する最小単位として「ターン（turn）」を定義しており、各ターンには次の要素が含まれます<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref8"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">要素</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>User Content</td>
                                <td>ユーザーが送った質問・指示</td>
                            </tr>
                            <tr className="even">
                                <td>Expected Intermediate Tool Use Trajectory</td>
                                <td>
                                    正しく応答するためにエージェントが呼び出すべきツール呼び出しの列
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Expected Intermediate Agent Responses</td>
                                <td>
                                    マルチエージェント構成でサブエージェントが生成する中間的な自然言語応答（開発者がエージェントの経路が正しいか確認するために重要）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Final Response</td>
                                <td>エージェントが返すべき最終応答</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    このテストデータは、単体テスト向けの軽量な「test
                    file」（<code>*.test.json</code>）と、複雑で長いマルチターン会話を表現できる「evalset」の2形式で管理できます<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref9"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。両者はPydanticバックエンドのスキーマ（Eval Set／Eval
                    Case）で正式に定義されており、ADK Web
                    UIのEvalタブで実際のセッションを保存してテストケース化することも、手動でJSONを記述することも可能です<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref10"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <p>
                    エッジケースの作り込みという観点では、ADKは固定のプロンプト集合だけでなく、AIモデルによって動的にユーザー応答を生成する{' '}<strong>User Simulation（ユーザーシミュレーション）</strong> も提供します<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref11"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。これは、ユーザーが必要な情報を一度に全部言うとは限らない（例えば2つの値を1つずつ順番に伝えてくる場合と、まとめて伝えてくる場合がある）という現実の会話のばらつきをテストに反映するための仕組みです。Agent
                    Platform側でも、エージェントの指示（instructions）とツール定義から多様なマルチターンのテストシナリオを自動生成する「シナリオ生成とユーザーシミュレーション」機能が提供されています<a
                        className="footnote-ref"
                        href="#ref5"
                        id="fnref12"
                        role="doc-noteref"
                        ><sup>5</sup></a
                    >。
                </p>
                <Diagram id="diag-2" ariaLabel="Test File・Evalset・User Simulationからテストデータ作成方法を選択するフロー" />
                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                ゴールデンデータセットには「典型的な正常系」だけでなく、ツールがエラーを返すケースやユーザーが曖昧な質問をするケースなど、意図的にエッジケースを含める。
                            </li>{' '}
                            <li>
                                テストケースはADK Web
                                UIで実際のセッションから作成すると、手動でJSONを書くよりも正確で保守しやすい<a
                                    className="footnote-ref"
                                    href="#ref4"
                                    id="fnref13"
                                    role="doc-noteref"
                                    ><sup>4</sup></a
                                >。
                            </li>{' '}
                            <li>
                                大規模なテストデータを1つのevalsetに詰め込みすぎず、単体テスト用のtest
                                fileと統合テスト用のevalsetを役割分担して管理する<a
                                    className="footnote-ref"
                                    href="#ref4"
                                    id="fnref14"
                                    role="doc-noteref"
                                    ><sup>4</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 id="412-継続的評価パイプラインの構築ツール実行の評価">
                    4.1.2 継続的評価パイプラインの構築：ツール実行の評価
                </h3>
                <p>
                    Exam Guideが指す「established success
                    criteria（確立された成功基準）に基づく継続的評価パイプライン」は、ADKの{' '}<strong>評価基準（Evaluation Criteria）</strong> とAgent Platformの{' '}<strong>Online Monitor（継続的品質監視）</strong>{' '}の両輪で理解すると整理しやすくなります。
                </p>
                <p>
                    まずADK側の評価基準です。ADKは組み込みの評価指標を複数提供しており、目的に応じて使い分けます<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref15"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">評価基準</th>
                                <th scope="col">何を測るか</th>
                                <th scope="col">主な用途</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><code>tool_trajectory_avg_score</code></td>
                                <td>ツール呼び出し列の完全一致度</td>
                                <td>CI/CDでの高速な回帰テスト</td>
                            </tr>
                            <tr className="even">
                                <td><code>response_match_score</code></td>
                                <td>参照回答とのROUGE-1類似度</td>
                                <td>CI/CDでの高速な回帰テスト</td>
                            </tr>
                            <tr className="odd">
                                <td><code>final_response_match_v2</code></td>
                                <td>LLMによる意味的な一致判定</td>
                                <td>信頼できる参照回答との柔軟な比較</td>
                            </tr>
                            <tr className="even">
                                <td><code>rubric_based_final_response_quality_v1</code></td>
                                <td>カスタムルーブリックに基づく応答品質判定</td>
                                <td>参照回答がない場合の品質評価</td>
                            </tr>
                            <tr className="odd">
                                <td><code>rubric_based_tool_use_quality_v1</code></td>
                                <td>カスタムルーブリックに基づくツール利用の妥当性判定</td>
                                <td>「AツールはBツールより先に呼ぶべき」等の推論プロセス検証</td>
                            </tr>
                            <tr className="even">
                                <td><code>hallucinations_v1</code></td>
                                <td>ツール出力など利用可能な情報に対する応答の裏付け度</td>
                                <td>ハルシネーション検出</td>
                            </tr>
                            <tr className="odd">
                                <td><code>safety_v1</code></td>
                                <td>応答が安全ポリシーに違反していないか</td>
                                <td>安全性チェック</td>
                            </tr>
                            <tr className="even">
                                <td><code>multi_turn_task_success_v1</code></td>
                                <td>マルチターン会話全体でのゴール達成度</td>
                                <td>会話全体の成功可否評価</td>
                            </tr>
                            <tr className="odd">
                                <td><code>multi_turn_trajectory_quality_v1</code></td>
                                <td>マルチターン会話全体の経路の効率性・論理性</td>
                                <td>会話全体の経路品質評価</td>
                            </tr>
                            <tr className="even">
                                <td><code>multi_turn_tool_use_quality_v1</code></td>
                                <td>マルチターンにわたるツール呼び出しの妥当性</td>
                                <td>会話全体でのツール利用評価</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    評価基準を明示的に設定しない場合、ADKは既定で{' '}<code>tool_trajectory_avg_score=1.0</code>（完全一致を要求）と{' '}<code>response_match_score=0.8</code>（多少の揺らぎを許容）を使用します<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref16"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。CI/CDパイプラインに組み込む場合は、これら2つの高速で予測可能な指標を軸にし、意味的な同一性を厳密に見たい場合は{' '}<code>final_response_match_v2</code> を、参照回答がないケースでは{' '}<code>rubric_based_final_response_quality_v1</code>{' '}を追加するのが公式の推奨です<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref17"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <p>
                    続いて、「確立された成功基準に基づく継続的評価パイプライン」を本番トラフィックに対して回す仕組みが{' '}<strong>Online Monitor</strong> です。Online
                    Monitorは、本番稼働中のエージェントの品質低下（<strong>quality drift</strong
                    >）を継続的に検知するための機能で、次のような周期的なループで動作します<a
                        className="footnote-ref"
                        href="#ref6"
                        id="fnref18"
                        role="doc-noteref"
                        ><sup>6</sup></a
                    >。
                </p>
                <Diagram id="diag-3" ariaLabel="Online Monitorがトレースをサンプリングして評価し結果を出力する周期ループのシーケンス図" />
                <p>
                    Online
                    Monitorを機能させるには、エージェント側が特定のOpenTelemetryシグナルをCloud
                    Traceに出力している必要があります。具体的には、エージェント名・説明・会話IDを含む「invoke
                    agentスパン」と、プロンプト・応答・システム指示・ツール定義を含む{' '}<code>gen_ai.client.inference.operation.details</code>{' '}イベントです<a
                        className="footnote-ref"
                        href="#ref6"
                        id="fnref19"
                        role="doc-noteref"
                        ><sup>6</sup></a
                    >。ADKを使っている場合は、次の環境変数を設定することでこれらのテレメトリを有効化します<a
                        className="footnote-ref"
                        href="#ref6"
                        id="fnref20"
                        role="doc-noteref"
                        ><sup>6</sup></a
                    >。
                </p>
                <pre className="code-block" role="region" aria-label="テレメトリ設定環境変数">
                        <div className="code-line"><span className="tok-key">OTEL_SEMCONV_STABILITY_OPT_IN</span>=<span className="tok-string">&apos;gen_ai_latest_experimental&apos;</span></div>
                        <div className="code-line"><span className="tok-key">OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT</span>=<span className="tok-string">&apos;EVENT_ONLY&apos;</span></div>
                    </pre>
                <p>
                    画像や大きなドキュメントなどマルチモーダルなデータを扱う場合は、トレースのスパンに直接埋め込むのではなく、環境変数でCloud
                    Storageバケットへ書き出す構成が推奨されています<a
                        className="footnote-ref"
                        href="#ref6"
                        id="fnref21"
                        role="doc-noteref"
                        ><sup>6</sup></a
                    >。アップロードは{' '}<code>OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT</code>{' '}単体では有効にならず、アップロード用のフック（<code>OTEL_INSTRUMENTATION_GENAI_COMPLETION_HOOK</code>）と書き出し先（<code>OTEL_INSTRUMENTATION_GENAI_UPLOAD_BASE_PATH</code>）を併せて指定する必要があります<a
                        className="footnote-ref"
                        href="#ref6"
                        id="fnref22"
                        role="doc-noteref"
                        ><sup>6</sup></a
                    >。
                </p>
                <pre className="code-block" role="region" aria-label="Cloud Storage書き出し設定環境変数">
                        <div className="code-line"><span className="tok-key">OTEL_INSTRUMENTATION_GENAI_COMPLETION_HOOK</span>=<span className="tok-string">&apos;upload&apos;</span></div>
                        <div className="code-line"><span className="tok-key">OTEL_INSTRUMENTATION_GENAI_UPLOAD_BASE_PATH</span>=<span className="tok-string">&apos;gs://&lt;バケット名&gt;/&lt;プレフィックス&gt;&apos;</span></div>
                        <div className="code-line"><span className="tok-key">OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT</span>=<span className="tok-string">&apos;jsonl&apos;</span></div>
                    </pre>
                <div className="callout-warning">
                    <div className="icon">!</div>{' '}
                    <div className="body">
                        <div className="label">有効化前に必須のデータ保護要件</div>{' '}
                        <p>
                            <code>OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT</code>{' '}はプロンプト・モデル応答・システム指示の<strong>本文そのもの</strong>をテレメトリとして永続化し、<code>OTEL_INSTRUMENTATION_GENAI_UPLOAD_FORMAT</code>{' '}はマルチモーダルデータをCloud
                            Storageへ書き出します。エンドユーザー入力にはPII・認証情報・機密文書が含まれ得るため、これらは「観測性の設定」ではなく<strong>個人データの新たな保管先を増やす変更</strong>として扱い、有効化前に次を満たすこと。</p>{' '}
                        <ul>
                            <li>
                                <strong>データ分類</strong
                                >：捕捉対象の会話に含まれ得るデータ種別（PII、決済情報、健康情報、社外秘）を事前に棚卸しし、分類に応じて捕捉可否を判断する。分類が未確定のうちは本番で有効化しない。
                            </li>{' '}
                            <li>
                                <strong>マスキング／秘匿化</strong>：<code>EVENT_ONLY</code>{' '}は捕捉内容を減らす設定ではなく、プロンプト・モデル応答・ユーザーIDをイベントとして<strong
                                    >Cloud Loggingに記録する</strong
                                >設定である。本文の捕捉が許容できない場合は、スパン・イベント・アップロード対象へ書き出す前段でPII・シークレットのリダクションを行うか、<code>NO_CONTENT</code>{' '}を選択する。なお、Online
                                Monitorが必要とするのは前述の特定のOpenTelemetryシグナル（invoke
                                agentスパンと{' '}<code>gen_ai.client.inference.operation.details</code>{' '}イベント）であり、<code>EVENT_ONLY</code>{' '}を設定しただけで監視が成立するわけではない。本文捕捉を伴う設定は、まず開発・ステージング環境限定の有効化から始める。
                            </li>{' '}
                            <li>
                                <strong>最小権限のIAM</strong>：トレース・ログ・Cloud
                                Storageバケットの閲覧権限を調査担当に限定する。<code>roles/storage.objectViewer</code>{' '}などをプロジェクト全体へ広く付与せず、バケット単位で絞る。既定のプロジェクト閲覧者が会話本文を読める状態にしない。
                            </li>{' '}
                            <li>
                                <strong>暗号化</strong
                                >：保存先バケットとログシンクに顧客管理鍵（CMEK）を適用し、転送経路のTLSを含めて暗号化要件を満たすことを確認する。
                            </li>{' '}
                            <li>
                                <strong>保持期間と削除</strong>：Cloud
                                Loggingのリテンション設定とCloud
                                Storageのライフサイクルルールで保持期間の上限を明示し、期限到達で自動削除する。加えて、削除請求（GDPRの消去権など）に応えるための対象特定・削除手順を運用手順として定義する。
                            </li>{' '}
                            <li>
                                <strong>同意と告知</strong
                                >：エンドユーザーの会話本文を保存する旨をプライバシーポリシー・利用規約に反映し、必要な同意取得と越境移転の要件（保存リージョンの選定を含む）を法務・プライバシー担当と確認する。
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                Online
                                Monitorの作成時は「全トラフィックを評価する」か「フィルタ条件（Duration、トークン使用量など）で絞り込む」かを選び、コスト管理のために{' '}<strong>サンプリング率</strong> と{' '}<strong>1回あたりの最大サンプル数</strong> を必ず設定する<a
                                    className="footnote-ref"
                                    href="#ref6"
                                    id="fnref23"
                                    role="doc-noteref"
                                    ><sup>6</sup></a
                                >。
                            </li>{' '}
                            <li>
                                <code>OnlineEvaluator</code>{' '}の作成権限を持つユーザーは同一プロジェクト内の任意のエージェントに監視を紐付けられてしまうため、権限昇格を防ぐ目的でOnlineEvaluatorの作成権限は管理者に限定する<a
                                    className="footnote-ref"
                                    href="#ref6"
                                    id="fnref24"
                                    role="doc-noteref"
                                    ><sup>6</sup></a
                                >。
                            </li>{' '}
                            <li>
                                結果がダッシュボードに表示されない場合は、(1)
                                必要なOpenTelemetry属性が実際にCloud Traceへ出力されているか、(2)
                                フィルタ条件が実トラフィックに一致しているか、(3) Cloud
                                LoggingにMonitor自身のエラーログが出ていないか、の順で切り分ける<a
                                    className="footnote-ref"
                                    href="#ref6"
                                    id="fnref25"
                                    role="doc-noteref"
                                    ><sup>6</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 id="413-評価フレームワークとツールの選定">
                    4.1.3 評価フレームワークとツールの選定
                </h3>
                <p>
                    Exam Guideが挙げる3つの選択肢 ――{' '}<strong>ADK evaluation tooling (evalset)</strong>、<strong
                        >Agent Platform Gen AI evaluation service</strong
                    >、<strong>custom autoraters</strong> ――
                    は、互いに排他的な選択肢ではなく、開発ライフサイクルの段階によって組み合わせて使うものです。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">ADK Evaluation（evalset／test file）</th>
                                <th scope="col">Agent Platform Gen AI Evaluation Service</th>
                                <th scope="col">Custom LLM Metrics（判定LLMによるカスタム指標）</th>
                                <th scope="col">Custom Code Metrics（決定論的なカスタム評価関数）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>主な利用段階</td>
                                <td>
                                    ローカル開発でのプロンプト・ツール構成の高速なイテレーション<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref26"
                                        role="doc-noteref"
                                        ><sup>5</sup></a
                                    >
                                </td>
                                <td>
                                    デプロイ済みエージェントの評価、履歴トレースや外部ログの分析<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref27"
                                        role="doc-noteref"
                                        ><sup>5</sup></a
                                    >
                                </td>
                                <td>
                                    標準指標でカバーできない主観的・定性的な品質を判定LLMに評価させたい場合<a
                                        className="footnote-ref"
                                        href="#ref7"
                                        id="fnref28"
                                        role="doc-noteref"
                                        ><sup>7</sup></a
                                    >
                                </td>
                                <td>
                                    正解が機械的に判定できる業務ルール（形式・数値・スキーマ準拠など）を検証したい場合<a
                                        className="footnote-ref"
                                        href="#ref7"
                                        id="fnref29"
                                        role="doc-noteref"
                                        ><sup>7</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>実行方法</td>
                                <td>
                                    <code>adk web</code>（Web UI）、<code>pytest</code>、<code
                                        >adk eval</code
                                    >（CLI）、<code>adk conformance</code>（回帰テスト）<a
                                        className="footnote-ref"
                                        href="#ref4"
                                        id="fnref30"
                                        role="doc-noteref"
                                        ><sup>4</sup></a
                                    >
                                </td>
                                <td>
                                    Google Cloudコンソール、Agent Platform
                                    SDK（<code>client.evals.evaluate()</code>）<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref31"
                                        role="doc-noteref"
                                        ><sup>5</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref7"
                                        id="fnref32"
                                        role="doc-noteref"
                                        ><sup>7</sup></a
                                    >
                                </td>
                                <td>
                                    判定用プロンプト（ルーブリック）と採点基準を定義し、Evaluation
                                    ServiceのSDKに登録<a
                                        className="footnote-ref"
                                        href="#ref7"
                                        id="fnref33"
                                        role="doc-noteref"
                                        ><sup>7</sup></a
                                    >
                                </td>
                                <td>
                                    Pythonで決定論的な評価関数を定義し、Evaluation
                                    ServiceのSDKに登録<a
                                        className="footnote-ref"
                                        href="#ref7"
                                        id="fnref34"
                                        role="doc-noteref"
                                        ><sup>7</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>得意なこと</td>
                                <td>ツール呼び出し順序の厳密比較、CI/CDへの組み込み、回帰テスト</td>
                                <td>
                                    マルチターンAutoRaterによる会話全体の評価、失敗パターンのクラスタリング、プロンプト最適化
                                </td>
                                <td>
                                    LLM-as-judge方式によるドメイン固有スコアリング（トーン、コンプライアンス基準への準拠度など）
                                </td>
                                <td>
                                    再現性のある合否判定（正規表現・JSONスキーマ検証・数値許容誤差など）。判定LLMのコストとばらつきを伴わない
                                </td>
                            </tr>
                            <tr className="even">
                                <td>認証方式</td>
                                <td>
                                    <code>GOOGLE_API_KEY</code> またはApplication Default
                                    Credentials（品質評価系の指標を使う場合）<a
                                        className="footnote-ref"
                                        href="#ref4"
                                        id="fnref35"
                                        role="doc-noteref"
                                        ><sup>4</sup></a
                                    >
                                </td>
                                <td>
                                    Agent Platform SDKの初期化（プロジェクト・リージョン指定）<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref36"
                                        role="doc-noteref"
                                        ><sup>5</sup></a
                                    >
                                </td>
                                <td>
                                    Evaluation Service SDKと同様（判定モデルの呼び出し権限が必要）
                                </td>
                                <td>Evaluation Service SDKと同様</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Agent Platform Gen AI Evaluation
                    Serviceは、次の6段階の反復ワークフローとして整理されています<a
                        className="footnote-ref"
                        href="#ref5"
                        id="fnref37"
                        role="doc-noteref"
                        ><sup>5</sup></a
                    >。
                </p>
                <Diagram id="diag-4" ariaLabel="評価ケースの定義からエージェントの最適化までの6段階評価ワークフロー" />
                <p>
                    このサービスの中核機能は次の4点です<a
                        className="footnote-ref"
                        href="#ref5"
                        id="fnref38"
                        role="doc-noteref"
                        ><sup>5</sup></a
                    ><a className="footnote-ref" href="#ref8" id="fnref39" role="doc-noteref"
                        ><sup>8</sup></a
                    >。
                </p>
                <ul>
                    <li>
                        <strong>Scenario generation and user simulation</strong
                        >：エージェントの指示とツール定義から、多様なマルチターンのテストシナリオを自動生成する。
                    </li>{' '}
                            <li>
                        <strong>Environment simulation</strong
                        >：特定のツール呼び出しをインターセプトし、モックデータやHTTP
                        503エラー・レイテンシスパイクなどの疑似障害を注入することで、本番バックエンドに影響を与えずにエージェントの耐障害性を検証する。
                    </li>{' '}
                            <li>
                        <strong>Multi-turn evaluation</strong>：会話履歴全体を
                        <strong>Multi-Turn AutoRaters</strong>
                        で自動評価する。これらのAutoRaterは意図の抽出を分析し、動的にルーブリックを生成し、指示遵守についての客観的な判定根拠を提示する。
                    </li>{' '}
                            <li>
                        <strong>Prompt optimization</strong
                        >：失敗パターンを特定し、システム指示の改善案を反復的に提案・検証する。
                    </li>
                </ul>
                <p>
                    「custom autoraters」は、Evaluation Serviceの中で{' '}<strong>Custom functions</strong>{' '}として位置づけられており、Pythonで独自の評価ロジックを実装できます<a
                        className="footnote-ref"
                        href="#ref8"
                        id="fnref40"
                        role="doc-noteref"
                        ><sup>8</sup></a
                    >。標準のLLM-as-judge指標や{' '}<code>rubric_based_*</code>{' '}系の指標で表現しきれない、業務固有のスコアリングルールを定義したい場合に使用します。実装形態は2つに分かれ、判定LLMにルーブリックを与えて定性的な品質を採点させる{' '}<strong>Custom LLM Metrics</strong>（例：社内コンプライアンス基準への準拠度）と、判定LLMを介さず入出力をコードで検証する決定論的な{' '}<strong>Custom Code Metrics</strong>（例：JSONスキーマ準拠、数値の許容誤差判定）を、評価したい対象の性質に応じて使い分けます。評価データセットの用意方法も柔軟で、プロンプトを直接アップロードする方法、テンプレート＋変数ファイルで組み立てる方法、本番ログから直接サンプリングする方法、合成データ生成で大量の一貫したサンプルを作る方法の4通りが用意されています<a
                        className="footnote-ref"
                        href="#ref8"
                        id="fnref41"
                        role="doc-noteref"
                        ><sup>8</sup></a
                    >。
                </p>
                <p>
                    失敗の分析についても専用の仕組みがあります。評価結果の中で失敗したケースは自動的に{' '}<strong>Loss Clusters（損失クラスタ）</strong>{' '}としてグループ化され、どのような種類の失敗が多いのかを俯瞰できます<a
                        className="footnote-ref"
                        href="#ref9"
                        id="fnref42"
                        role="doc-noteref"
                        ><sup>9</sup></a
                    >。
                </p>
                <pre className="code-block" role="region" aria-label="Loss Clusters生成のPythonコード例">
                        <div className="code-line"><span className="tok-comment"># 失敗パターンをクラスタリングして俯瞰する例</span></div>
                        <div className="code-line"><span className="tok-key">loss_clusters</span> = client.evals.<span className="tok-func">generate_loss_clusters</span>(<span className="tok-key">eval_result</span>=eval_result)</div>
                    </pre>
                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                「ローカル開発中の高速なイテレーション」にはADK
                                evalset、「デプロイ後の継続的な品質保証」にはGen AI Evaluation
                                ServiceのOnline Monitor、という住み分けを基本線にする<a
                                    className="footnote-ref"
                                    href="#ref5"
                                    id="fnref43"
                                    role="doc-noteref"
                                    ><sup>5</sup></a
                                >。
                            </li>{' '}
                            <li>
                                標準指標が業務要件に合わない場合のみカスタム関数を追加し、まずは組み込みのルーブリックベース指標（<code>rubric_based_*</code>）で表現できないか検討する<a
                                    className="footnote-ref"
                                    href="#ref7"
                                    id="fnref44"
                                    role="doc-noteref"
                                    ><sup>7</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref8"
                                    id="fnref45"
                                    role="doc-noteref"
                                    ><sup>8</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Environment simulationで疑似障害（HTTP
                                503、レイテンシスパイクなど）を注入したテストを、本番リリース前のゲートに組み込み、ツール障害時のエージェントの振る舞いを検証する<a
                                    className="footnote-ref"
                                    href="#ref5"
                                    id="fnref46"
                                    role="doc-noteref"
                                    ><sup>5</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 id="414-ゴールデンデータセットに対するエージェント評価adkを使用">
                    4.1.4 ゴールデンデータセットに対するエージェント評価（ADKを使用）
                </h3>
                <p>
                    Exam
                    Guideのこの項目は、「ADKを使って、ゴールデンデータセットに対しエージェントの応答品質とリトリーバル（検索）品質を評価する」という実務的な操作を指しています。ADKでは、これは主に3つの実行手段で行います<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref47"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <ol>
                    <li>
                        <strong>Web UI（<code>adk web</code>）</strong
                        >：エージェントと対話しながらセッションを保存し、Evalタブから評価セットを作成・編集・実行する。実行結果は合否だけでなく、失敗した項目については実際の出力と期待される出力を並べて比較でき、Traceタブでツール呼び出しやモデルへのリクエスト・レスポンスをステップごとに確認できる。
                    </li>{' '}
                            <li>
                        <strong><code>pytest</code>によるプログラム的実行</strong
                        >：CI/CDパイプラインに統合するための方法。<code
                            >AgentEvaluator.evaluate()</code
                        >
                        にエージェントモジュールとテストデータのパスを渡すだけで、テストランナー上でADK評価が走る。
                    </li>{' '}
                            <li>
                        <strong>CLI（<code>adk eval</code>）</strong
                        >：ビルド生成・検証プロセスの一部として自動化しやすいコマンドライン実行方法。evalsetファイル名にコロン区切りでテスト名を指定すると、特定のテストだけを実行できる。
                    </li>
                </ol>
                <pre className="code-block" role="region" aria-label="pytestによる評価テスト例">
                        <div className="code-line"><span className="tok-keyword">from</span> google.adk.evaluation.agent_evaluator <span className="tok-keyword">import</span> AgentEvaluator</div>
                        <div className="code-line"><span className="tok-keyword">import</span> pytest</div>
                        <div className="code-line">{''}</div>
                        <div className="code-line"><span className="tok-key">@pytest.mark.asyncio</span></div>
                        <div className="code-line"><span className="tok-keyword">async</span> <span className="tok-keyword">def</span> <span className="tok-func">test_with_single_test_file</span>():</div>
                        <div className="code-line">    <span className="tok-string">&quot;&quot;&quot;ホームオートメーションエージェントの基本的な能力をテスト&quot;&quot;&quot;</span></div>
                        <div className="code-line">    <span className="tok-keyword">await</span> AgentEvaluator.<span className="tok-func">evaluate</span>(</div>
                        <div className="code-line">        <span className="tok-key">agent_module</span>=<span className="tok-string">&quot;home_automation_agent&quot;</span>,</div>
                        <div className="code-line">        <span className="tok-key">eval_dataset_file_path_or_dir</span>=<span className="tok-string">&quot;tests/integration/fixture/home_automation_agent/simple_test.test.json&quot;</span>,</div>
                        <div className="code-line">    )</div>
                    </pre>
                <p>
                    「応答品質」だけでなく「リトリーバル品質」も評価対象になる点が試験のポイントです。重要なのは、<strong>この2つは別々の指標で測る必要がある</strong>ことです。
                </p>
                <ul>
                    <li>
                        <strong>応答品質（groundedness）</strong>：<code>hallucinations_v1</code>
                        は「取得できたコンテキストに対して応答がどれだけ裏付けられているか」を測る指標であり、検索結果に基づかない虚偽の応答を検出できます<a
                            className="footnote-ref"
                            href="#ref4"
                            id="fnref48"
                            role="doc-noteref"
                            ><sup>4</sup></a
                        >。ただしこれは<em>応答</em>の裏付け度であって、<strong>リトリーバル自体の良し悪しは測れません</strong>。検索が的外れな文書しか返さなくても、エージェントが「情報がありません」と答えれば
                        <code>hallucinations_v1</code> は高いスコアになり得ます。
                    </li>{' '}
                            <li>
                        <strong>リトリーバル品質（retrieval quality）</strong
                        >：検索器が正しい文書を、正しい順序で引けているかを測るには、クエリごとに「正解となる関連文書」を付与したゴールデンデータセットが必要です。その上で
                        <strong>recall@k</strong
                        >（正解文書を上位k件に取りこぼしなく含められたか）、<strong>precision@k</strong>（上位k件の関連度）、<strong
                            >MRR / nDCG</strong
                        >（正解文書がどれだけ上位に並んだか）といった、正解ラベルとの照合に基づく指標で評価します。
                    </li>
                </ul>
                <p>
                    つまり{' '}<code>hallucinations_v1</code>{' '}はリトリーバル品質の代理指標にはならないため、RAGパイプラインの評価では「正解文書ラベル付きデータセットによるリトリーバル指標」と「<code>hallucinations_v1</code>{' '}による応答の裏付け度」の<strong>両方</strong>を並行して計測します。リトリーバル指標が低ければ検索器（チャンク分割、埋め込みモデル、リランカー、top-k）を、リトリーバル指標は高いのに{' '}<code>hallucinations_v1</code>{' '}が低ければ生成側のプロンプト・引用制約を疑う、という切り分けが可能になります。
                </p>
                <p>
                    さらにADKは、<strong>Conformance Testing（適合性テスト）</strong>{' '}という回帰テストの仕組みも提供しています<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref49"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。これは「過去に記録・検証済みの正解となるやりとり（ゴールデンベースライン）」に対して、コード変更後のエージェントの挙動が一致し続けているかを検証する仕組みです。
                </p>
                <Diagram id="diag-5" ariaLabel="ADK Conformance Testingのベースライン記録と回帰テストフロー" />
                <p>
                    Conformance Testingのディレクトリ構成は{' '}<code>tests/&lt;category_name&gt;/&lt;test_case_name&gt;/</code>{' '}の階層で固定されており、<code>spec.yaml</code>（テスト仕様）、<code>generated-recordings.yaml</code>（記録された応答）、<code>generated-session.yaml</code>（記録されたセッション状態）の3ファイルで1つのテストケースを構成します<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref50"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。<code>--generate_report</code>{' '}フラグを付けることで、テスト結果のMarkdownサマリーレポートを出力することもできます<a
                        className="footnote-ref"
                        href="#ref4"
                        id="fnref51"
                        role="doc-noteref"
                        ><sup>4</sup></a
                    >。
                </p>
                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                ゴールデンベースラインは手動で作成せず、<code>adk conformance create</code>{' '}による自動記録を使う。LLMリクエストやツール呼び出しは複雑で、手動でのYAML作成はミスの元になる<a
                                    className="footnote-ref"
                                    href="#ref4"
                                    id="fnref52"
                                    role="doc-noteref"
                                    ><sup>4</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Conformance Testingは{' '}<code>adk conformance test</code>{' '}としてCI/CDパイプライン（プルリクエスト時のゲートなど）に組み込み、期待される挙動からの逸脱があればマージをブロックする<a
                                    className="footnote-ref"
                                    href="#ref4"
                                    id="fnref53"
                                    role="doc-noteref"
                                    ><sup>4</sup></a
                                >。
                            </li>{' '}
                            <li>
                                リトリーバル品質は、クエリごとに正解となる関連文書を付与したゴールデンデータセットを用意し、recall@k・precision@k・nDCGなど<strong>正解ラベルとの照合に基づく検索指標</strong>で測る。<code>hallucinations_v1</code>{' '}は応答の裏付け度（groundedness）を測る指標であり、リトリーバル品質の代替にはならないため、検索指標と併せて計測して「もっともらしいが検索結果に基づかない回答」を別途検出する<a
                                    className="footnote-ref"
                                    href="#ref4"
                                    id="fnref54"
                                    role="doc-noteref"
                                    ><sup>4</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <h2 id="42-本番ワークロードのデプロイとスケーリング">
                    4.2 本番ワークロードのデプロイとスケーリング
                </h2>
                <p>
                    Exam Guide原文4.2は次の3つの考慮事項を挙げています<a
                        className="footnote-ref"
                        href="#ref2"
                        id="fnref55"
                        role="doc-noteref"
                        ><sup>2</sup></a
                    >。
                </p>
                <ul>
                    <li>
                        Selecting optimal deployment runtime based on the use case, requirements,
                        and cost（Agent Runtime、Cloud
                        Run、GKEなど、ユースケース・要件・コストに基づく最適なデプロイランタイムの選定）
                    </li>{' '}
                            <li>
                        Troubleshooting agent
                        issues（ドリフト、ツール呼び出しレイテンシ、エージェントの推論ループ、システム障害などのトラブルシューティング）
                    </li>{' '}
                            <li>
                        Monitoring and optimizing agents for performance, reliability, and
                        cost（ロジックエラー、レイテンシのボトルネック、ハルシネーションの特定を含む、パフォーマンス・信頼性・コストの監視と最適化）
                    </li>
                </ul>
                <h3 id="421-最適なデプロイランタイムの選定">
                    4.2.1 最適なデプロイランタイムの選定
                </h3>
                <p>
                    ADKで書かれたエージェントは特定のランタイムに縛られないポータブルな設計になっており、同じコードをローカル開発、Agent
                    Runtime、Cloud Run、GKEのいずれにもデプロイできます<a
                        className="footnote-ref"
                        href="#ref10"
                        id="fnref56"
                        role="doc-noteref"
                        ><sup>10</sup></a
                    >。試験で問われるのは、それぞれの特性を理解した上での「どのユースケースにどのランタイムを選ぶか」という判断です。
                </p>
                <Diagram id="diag-6" ariaLabel="デプロイランタイム選定の判断フローチャート" />
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">観点</th>
                                <th scope="col">Agent Runtime（旧 Agent Engine）</th>
                                <th scope="col">Cloud Run</th>
                                <th scope="col">GKE</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>運用モデル</td>
                                <td>
                                    フルマネージドのオピニオネイテッド・ランタイム。インフラを意識せずエージェントロジックに集中できる<a
                                        className="footnote-ref"
                                        href="#ref10"
                                        id="fnref57"
                                        role="doc-noteref"
                                        ><sup>10</sup></a
                                    >
                                </td>
                                <td>
                                    マネージドのサーバーレスコンテナ実行基盤。コンテナイメージさえあれば任意の言語・フレームワークを実行可能<a
                                        className="footnote-ref"
                                        href="#ref11"
                                        id="fnref58"
                                        role="doc-noteref"
                                        ><sup>11</sup></a
                                    >
                                </td>
                                <td>
                                    Googleが管理するコントロールプレーン上で、自分でノードプール・Pod構成・ネットワークを管理するKubernetesクラスタ<a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref59"
                                        role="doc-noteref"
                                        ><sup>12</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>スケーリング</td>
                                <td>
                                    組み込みのオートスケーリングとエンドツーエンドの管理機能<a
                                        className="footnote-ref"
                                        href="#ref10"
                                        id="fnref60"
                                        role="doc-noteref"
                                        ><sup>10</sup></a
                                    >
                                </td>
                                <td>
                                    リクエストに応じて自動スケール、トラフィックゼロ時はゼロまでスケールダウン（コスト効率が高い）<a
                                        className="footnote-ref"
                                        href="#ref11"
                                        id="fnref61"
                                        role="doc-noteref"
                                        ><sup>11</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref62"
                                        role="doc-noteref"
                                        ><sup>12</sup></a
                                    >
                                </td>
                                <td>
                                    柔軟だがノードプールやPod構成の設計・運用が必要。GPUなど特殊なハードウェア要件に強い<a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref63"
                                        role="doc-noteref"
                                        ><sup>12</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref13"
                                        id="fnref64"
                                        role="doc-noteref"
                                        ><sup>13</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>フレームワーク対応</td>
                                <td>
                                    ADK（Python/Go/Javaで深い統合）、LangChain、LangGraph、AG2、LlamaIndex、A2Aプロトコル、カスタムフレームワーク（カスタムテンプレート）に対応<a
                                        className="footnote-ref"
                                        href="#ref10"
                                        id="fnref65"
                                        role="doc-noteref"
                                        ><sup>10</sup></a
                                    >
                                </td>
                                <td>
                                    コンテナ化できれば任意の言語・フレームワーク（<code
                                        >adk api_server</code
                                    >
                                    でREST API化するのが典型例）<a
                                        className="footnote-ref"
                                        href="#ref11"
                                        id="fnref66"
                                        role="doc-noteref"
                                        ><sup>11</sup></a
                                    >
                                </td>
                                <td>コンテナ化できれば任意の言語・フレームワーク</td>
                            </tr>
                            <tr className="even">
                                <td>典型的な適用場面</td>
                                <td>
                                    Google
                                    Cloudネイティブな本番運用、Terraformでのインフラ管理、Agents
                                    CLIによるscaffold〜deployの一気通貫パイプライン<a
                                        className="footnote-ref"
                                        href="#ref10"
                                        id="fnref67"
                                        role="doc-noteref"
                                        ><sup>10</sup></a
                                    >
                                </td>
                                <td>
                                    シンプルな1コンテナ構成、リクエスト課金でコストを抑えたい場合、Swagger
                                    UIなど標準REST APIとしての公開<a
                                        className="footnote-ref"
                                        href="#ref11"
                                        id="fnref68"
                                        role="doc-noteref"
                                        ><sup>11</sup></a
                                    >
                                </td>
                                <td>
                                    既存のKubernetes基盤との統合、GPU常時稼働ワークロード、複雑なマルチコンテナ・ネットワーク要件<a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref69"
                                        role="doc-noteref"
                                        ><sup>12</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref13"
                                        id="fnref70"
                                        role="doc-noteref"
                                        ><sup>13</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>運用の主体</td>
                                <td>
                                    Google（管理者権限やIAM設定など一部は利用者が設定）<a
                                        className="footnote-ref"
                                        href="#ref10"
                                        id="fnref71"
                                        role="doc-noteref"
                                        ><sup>10</sup></a
                                    >
                                </td>
                                <td>
                                    利用者（スケーリング設定、ヘルスチェック、監視は自前で構成）<a
                                        className="footnote-ref"
                                        href="#ref11"
                                        id="fnref72"
                                        role="doc-noteref"
                                        ><sup>11</sup></a
                                    >
                                </td>
                                <td>
                                    利用者（ノードプール、Pod、ネットワークすべて利用者が設計）<a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref73"
                                        role="doc-noteref"
                                        ><sup>12</sup></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Agent Runtimeは、API上では後方互換性のため{' '}<code>ReasoningEngine</code>{' '}というリソース名を使い続けている点も実務上・試験対策上の注意点です<a
                        className="footnote-ref"
                        href="#ref10"
                        id="fnref74"
                        role="doc-noteref"
                        ><sup>10</sup></a
                    >。デプロイ方法としては、既にビルド済みのコンテナイメージをArtifact
                    Registryから直接デプロイする方法と、Dockerfileと利用者のソースファイルを渡してAgent
                    Runtime側でビルド・デプロイを自動化する方法の2通りがあります<a
                        className="footnote-ref"
                        href="#ref10"
                        id="fnref75"
                        role="doc-noteref"
                        ><sup>10</sup></a
                    >。ADKで書かれたPythonエージェントの場合は <code>adk</code> CLI（<code
                        >adk deploy agent_engine</code
                    >）から、Goエージェントの場合は{' '}<code>adkgo</code>{' '}CLIから直接デプロイできる「フル統合」レベルのサポートが提供されています<a
                        className="footnote-ref"
                        href="#ref10"
                        id="fnref76"
                        role="doc-noteref"
                        ><sup>10</sup></a
                    >。
                </p>
                <p>
                    Agents
                    CLIは、この判断を助けるための統一インターフェースとして、Scaffold（雛形作成）→Evaluate（評価）→Deploy（デプロイ）→Publish（公開）→Observe（観測）という一気通貫のエージェント開発ライフサイクルを提供します<a
                        className="footnote-ref"
                        href="#ref10"
                        id="fnref77"
                        role="doc-noteref"
                        ><sup>10</sup></a
                    >。インフラのプロビジョニング（<code>agents-cli infra</code
                    >：サービスアカウント、IAMバインディング、API有効化、テレメトリ用バケット、Terraformステートの準備）と、実際のデプロイ（<code
                        >agents-cli deploy</code
                    >：コンテナのビルド、レジストリへのプッシュ、サービスの起動）は明確に分離されており、通常はインフラを先に用意してからデプロイする流れになります<a
                        className="footnote-ref"
                        href="#ref14"
                        id="fnref78"
                        role="doc-noteref"
                        ><sup>14</sup></a
                    >。
                </p>
                <p>
                    本番稼働後のリビジョン管理も試験の対象範囲です。Agent Runtimeでは、<code>ReasoningEngine</code>{' '}リソースの{' '}<code>trafficConfig</code>{' '}フィールドを通じて、常に最新リビジョンにトラフィックを流す{' '}<code>trafficSplitAlwaysLatest</code>{' '}設定と、複数のリビジョンにパーセンテージを指定して手動でトラフィックを分割するカナリアリリース的な設定の両方をサポートしています<a
                        className="footnote-ref"
                        href="#ref15"
                        id="fnref79"
                        role="doc-noteref"
                        ><sup>15</sup></a
                    >。Cloud
                    Runでも同様に、リビジョン単位でのトラフィック分割・ロールバック・段階的なリリースが可能です<a
                        className="footnote-ref"
                        href="#ref16"
                        id="fnref80"
                        role="doc-noteref"
                        ><sup>16</sup></a
                    >。
                </p>
                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                「インフラをできるだけ意識したくない・ADKとの統合を重視する」場合はAgent
                                Runtime、「既存のコンテナ運用フローに乗せたい・コストを最小化したい」場合はCloud
                                Run、「GPU常時稼働やKubernetes上の既存基盤との統合が必須」の場合はGKE、という優先順位で検討する<a
                                    className="footnote-ref"
                                    href="#ref10"
                                    id="fnref81"
                                    role="doc-noteref"
                                    ><sup>10</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref11"
                                    id="fnref82"
                                    role="doc-noteref"
                                    ><sup>11</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref12"
                                    id="fnref83"
                                    role="doc-noteref"
                                    ><sup>12</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref13"
                                    id="fnref84"
                                    role="doc-noteref"
                                    ><sup>13</sup></a
                                >。
                            </li>{' '}
                            <li>
                                本番リリースはトラフィックをいきなり100%切り替えるのではなく、Agent
                                RuntimeまたはCloud
                                Runのトラフィック分割機能を使って段階的に新リビジョンへ移行し、問題があれば即座にロールバックできる体制にする<a
                                    className="footnote-ref"
                                    href="#ref15"
                                    id="fnref85"
                                    role="doc-noteref"
                                    ><sup>15</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref16"
                                    id="fnref86"
                                    role="doc-noteref"
                                    ><sup>16</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Agents CLIの <code>infra</code> →{' '}<code>deploy</code>{' '}の分離を活かし、インフラのプロビジョニングとアプリケーションのデプロイを別々のパイプラインステージとして管理する<a
                                    className="footnote-ref"
                                    href="#ref14"
                                    id="fnref87"
                                    role="doc-noteref"
                                    ><sup>14</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 id="422-エージェントの問題のトラブルシューティング">
                    4.2.2 エージェントの問題のトラブルシューティング
                </h3>
                <p>
                    Exam Guideが挙げる4つの症状 ―― <strong>drift（ドリフト）</strong>、<strong
                        >tool invocation latency（ツール呼び出しレイテンシ）</strong
                    >、<strong>agent reasoning loops（エージェントの推論ループ）</strong>、<strong>system failures（システム障害）</strong>{' '}―― は、いずれも従来のアプリケーション監視だけでは検出しにくい、エージェント特有の障害モードです。従来のAPM（アプリケーションパフォーマンス監視）はHTTPステータスコードやレイテンシといった外形的な指標を見ますが、エージェントは「HTTP
                    200を返しているのに、内容的には誤った判断をしている」というケースが多く、診断のレイヤーそのものを変える必要があります<a
                        className="footnote-ref"
                        href="#ref17"
                        id="fnref88"
                        role="doc-noteref"
                        ><sup>17</sup></a
                    ><a className="footnote-ref" href="#ref18" id="fnref89" role="doc-noteref"
                        ><sup>18</sup></a
                    >。
                </p>
                <Diagram id="diag-7" ariaLabel="エージェント障害モードの診断フローチャート" />
                <p>
                    <strong>ドリフト（drift）</strong>{' '}は、ユーザー行動や外部データの変化によって引き起こされる、エージェント性能の緩やかな低下を指します<a
                        className="footnote-ref"
                        href="#ref6"
                        id="fnref97"
                        role="doc-noteref"
                        ><sup>6</sup></a
                    >。これはOnline
                    Monitorが継続的に品質指標をスコアリングし、時系列チャートとして可視化することで検知します<a
                        className="footnote-ref"
                        href="#ref6"
                        id="fnref98"
                        role="doc-noteref"
                        ><sup>6</sup></a
                    ><a className="footnote-ref" href="#ref19" id="fnref99" role="doc-noteref"
                        ><sup>19</sup></a
                    >。単発の失敗ではなく「傾向」として現れるため、一時点のトレースを見るだけでは気づきにくく、継続的な監視が不可欠です。
                </p>
                <p>
                    <strong>ツール呼び出しレイテンシ（tool invocation latency）</strong>{' '}は、Observabilityダッシュボードの{' '}<strong>Toolsタブ</strong>{' '}で個別ツールごとのp95レイテンシ・呼び出し回数・エラー率・「ツールが呼ばれなかった頻度」を確認することで特定します<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref100"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。特定のツールだけ突出してレイテンシが高い場合、そのツール自体（外部API、データベースクエリなど）がボトルネックである可能性が高く、モデル呼び出し側の{' '}<strong>Modelsタブ</strong>（p95レイテンシ、呼び出し数、クォータ失敗など）と切り分けて診断します<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref101"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。
                </p>
                <p>
                    <strong>エージェントの推論ループ（reasoning loops）</strong>{' '}は、エージェントがツールエラーや曖昧なプロンプトに遭遇した際、結論に達しないまま同じ種類のツール呼び出しを繰り返してしまう現象です。マルチエージェント構成では、エージェントAがBに処理を委譲し、BがCに委譲し、CがAに送り返すといった「無限ハンドオフループ」も同種の問題として知られています<a
                        className="footnote-ref"
                        href="#ref18"
                        id="fnref102"
                        role="doc-noteref"
                        ><sup>18</sup></a
                    >。Google CloudのAgent Anomaly Detection（プレビュー機能）は、この種の問題を{' '}<strong>OWASP ASI08（Agentic Cascading Failures）</strong>{' '}というカテゴリで扱っており、障害の伝播・無限実行ループ・振動する再試行・フィードバックループの増幅を監視対象としています<a
                        className="footnote-ref"
                        href="#ref20"
                        id="fnref103"
                        role="doc-noteref"
                        ><sup>20</sup></a
                    >。診断の第一歩は、<code>Traces</code>{' '}タブでセッションのステップごとの実行（ツール呼び出しと推論ロジックの有向非巡回グラフ）を確認し、同一のツール呼び出しが不自然に繰り返されていないかを見ることです<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref104"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。
                </p>
                <p>
                    <strong>システム障害（system failures）</strong>{' '}は、エージェント固有の問題というよりインフラ層の問題（タイムアウト、認証切れ、クォータ超過、ネットワーク分断など）であることが多く、Cloud
                    Loggingの生ログストリーム（severity、タイムスタンプ、実行サマリーを含む）で深掘りします<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref105"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。
                </p>
                <p>
                    Google Cloudが提供する{' '}<strong>Agent Anomaly Detection</strong>（2026年時点でプレビュー、承認制）は、これらの問題を横断的にカバーする「推論ベースの監査レイヤー」です<a
                        className="footnote-ref"
                        href="#ref20"
                        id="fnref106"
                        role="doc-noteref"
                        ><sup>20</sup></a
                    >。OpenTelemetryのログと実行トレースを非同期に取り込み、エージェントセッションの活動を多層で分析します。
                </p>
                <Diagram id="diag-8" ariaLabel="Agent Anomaly Detectionの3層分析アーキテクチャ" />
                <p>
                    この多層構成により、常時すべてのトラフィックに高コストな詳細分析をかけるのではなく、Layer
                    1で疑わしいものだけを絞り込み、Layer
                    2・3で深掘りすることで、エージェントの応答速度に実行レイテンシを追加せずに近リアルタイムの監査を実現しています<a
                        className="footnote-ref"
                        href="#ref20"
                        id="fnref107"
                        role="doc-noteref"
                        ><sup>20</sup></a
                    >。監視対象の脅威カテゴリは、OWASP Top 10 for Agentic Security
                    Threatsに沿った次の5分類です<a
                        className="footnote-ref"
                        href="#ref20"
                        id="fnref108"
                        role="doc-noteref"
                        ><sup>20</sup></a
                    >。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">脅威カテゴリ</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Tool misuse（OWASP ASI02）</td>
                                <td>
                                    危険なツールチェーン、パラメータ操作、間接的なプロンプトインジェクションなど、ツールの不正利用
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Identity privilege abuse（OWASP ASI03）</td>
                                <td>
                                    動的な信頼委譲の悪用、ペルソナ偽装、メモリのエスカレーション、confused
                                    deputy脆弱性による権限逸脱
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Agentic cascading failures（OWASP ASI08）</td>
                                <td>
                                    障害の伝播、無限実行ループ、振動する再試行、フィードバックループの増幅
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Rogue agents（OWASP ASI10）</td>
                                <td>
                                    宣言された役割の逸脱、安全ガードレールの回避、システム指示からの逸脱
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Resource exhaustion</td>
                                <td>
                                    計算資源・LLMトークン・ネットワーク帯域の意図的または暴走的な過消費
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Agent Anomaly Detectionを利用するには、Agent Runtimeへのデプロイ、ADK for Python
                    バージョン1.2以降（2.1.0以降推奨）、US（マルチリージョン）のLogging／Observabilityバケット、OpenTelemetryトレーシング・ロギングの有効化、プロンプト入力・応答出力を捕捉するメタデータ設定など、複数の前提条件を満たす必要があります<a
                        className="footnote-ref"
                        href="#ref20"
                        id="fnref109"
                        role="doc-noteref"
                        ><sup>20</sup></a
                    >。
                </p>
                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                推論ループ対策は「検知」と「予防」の両輪で考える。予防側では最大ツール呼び出し回数の上限（ハードリミット）を設け、暴走時のトークン・コスト増大を防ぐ<a
                                    className="footnote-ref"
                                    href="#ref21"
                                    id="fnref110"
                                    role="doc-noteref"
                                    ><sup>21</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref22"
                                    id="fnref111"
                                    role="doc-noteref"
                                    ><sup>22</sup></a
                                >。
                            </li>{' '}
                            <li>
                                ドリフトは1回のトレース確認では気づけないため、Online
                                Monitorによる時系列の継続監視を必ず設定する<a
                                    className="footnote-ref"
                                    href="#ref6"
                                    id="fnref112"
                                    role="doc-noteref"
                                    ><sup>6</sup></a
                                >。
                            </li>{' '}
                            <li>
                                システム障害の切り分けでは、まずModelsタブ（モデル起因か）とToolsタブ（外部ツール起因か）を確認し、どちらでもなければCloud
                                Loggingでインフラ層（タイムアウト、認証、クォータ）を疑う、という順序で診断する<a
                                    className="footnote-ref"
                                    href="#ref19"
                                    id="fnref113"
                                    role="doc-noteref"
                                    ><sup>19</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Agent Anomaly Detectionのような監査レイヤーは、Model
                                Armor（コンテンツセキュリティ）やAgent
                                Gateway（トラフィック監視）と役割が異なる点に注意する。Agent Anomaly
                                Detectionは「推論・振る舞い」を、Model
                                Armorは「コンテンツの安全性」を、それぞれ別の層で見ている<a
                                    className="footnote-ref"
                                    href="#ref20"
                                    id="fnref114"
                                    role="doc-noteref"
                                    ><sup>20</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <h3 id="423-パフォーマンス信頼性コストの監視と最適化">
                    4.2.3 パフォーマンス・信頼性・コストの監視と最適化
                </h3>
                <p>
                    エージェントのObservability（可観測性）は、メトリクス・トレース・ログの3本柱で構成されます<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref115"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。Agent
                    Platformコンソールでエージェントを選択すると、Observabilityタブの中に次の6つのビューが用意されています<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref116"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ビュー</th>
                                <th scope="col">表示内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Overview</td>
                                <td>
                                    総セッション数、セッションあたりの平均ターン数、総呼び出し回数、トークン使用量（入力/出力）、トラフィック量、レイテンシパーセンタイル（p50/p95/p99）、エラー率の時系列チャート
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Evaluation</td>
                                <td>
                                    Online
                                    Monitorによる平均応答品質、安全性指標、ハルシネーション率、ツール利用品質の時系列ウィジェット
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Models</td>
                                <td>
                                    基盤モデルごとのp95レイテンシ、総呼び出し数、エラー率、クォータ失敗、トークン使用量の内訳
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Tools</td>
                                <td>
                                    接続された外部ツール・サービスごとのp95レイテンシ、呼び出し数、エラー率、ツールが呼ばれなかった頻度
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Usage</td>
                                <td>
                                    コンテナのCPU割り当て、メモリ割り当て、トークン使用量などインフラレベルの指標
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Logs</td>
                                <td>
                                    severityやタイムスタンプ、実行サマリーを含むフィルタ可能な生ログストリーム
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    さらに{' '}<code>Traces</code>{' '}タブでは特定セッションのステップごとの実行を、スパンの有向非巡回グラフと入出力とともに詳細に確認でき、<code>Topology</code>{' '}タブではそのエージェント単体の受信・送信依存関係を俯瞰できます<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref117"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。これらのテレメトリを支えているのが{' '}<strong>OpenTelemetry Semantic Conventions for generative AI systems</strong>{' '}で、ツール実行・リトリーバルステップ・トークン消費といった複雑なマルチステップのエージェントワークフローを、ベンダー非依存の共通フォーマットで記述するための業界標準です<a
                        className="footnote-ref"
                        href="#ref19"
                        id="fnref118"
                        role="doc-noteref"
                        ><sup>19</sup></a
                    >。
                </p>
                <p>
                    パフォーマンスとコストの最適化については、Agent
                    Runtimeで具体的に数値化された知見が公開されています<a
                        className="footnote-ref"
                        href="#ref21"
                        id="fnref119"
                        role="doc-noteref"
                        ><sup>21</sup></a
                    >。
                </p>
                <p>
                    <strong>コールドスタート問題</strong
                    >：リクエストが到着した時にアイドル状態のインスタンス／コンテナが存在しない場合、新しいインスタンスの起動が必要になり大きなレイテンシが発生します。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">シナリオ</th>
                                <th scope="col">平均レイテンシ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    コールドスタート（<code>min_instances=1</code>、初回実行、300並列リクエスト）
                                </td>
                                <td>約4.7秒</td>
                            </tr>
                            <tr className="even">
                                <td>ウォームスタート（同条件で直後に再実行）</td>
                                <td>約0.4秒</td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    <code>min_instances=10</code> に引き上げた場合のコールドスタート
                                </td>
                                <td>約1.4秒</td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <code>min_instances=10</code> ＋
                                    安定した継続的負荷（1,500クエリ/分を60秒間）
                                </td>
                                <td>約1.6秒で安定</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    この結果が示す通り、4秒を超えるオーバーヘッドのほぼすべてが新規インスタンスの起動待ちに起因しています。スパイク的・高トラフィックなアプリケーションでは、<code>min_instances</code>{' '}をベースライントラフィックを処理できる水準まで引き上げること（最大値は10）、あるいはキューを使って安定的・継続的な負荷をAgent
                    Runtimeに送り、サービスを「ウォーム」に保つことが有効な対策です<a
                        className="footnote-ref"
                        href="#ref21"
                        id="fnref120"
                        role="doc-noteref"
                        ><sup>21</sup></a
                    >。
                </p>
                <p>
                    <strong>非同期ワーカーの活用不足</strong>：<code>container_concurrency</code>{' '}は既定では同期コード向けに設定されており、各Agent
                    Platformインスタンスは1リクエストずつしか処理しません。しかしADKベースのような非同期エージェントは、LLM呼び出しやツール呼び出しなどI/Oバウンドな複数リクエストを同時に処理できます<a
                        className="footnote-ref"
                        href="#ref21"
                        id="fnref121"
                        role="doc-noteref"
                        ><sup>21</sup></a
                    >。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">設定</th>
                                <th scope="col">結果</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    <code>min_instances=10</code>、既定の
                                    <code>container_concurrency=9</code>、300並列リクエスト
                                </td>
                                <td>
                                    中央値レイテンシ約4秒だが、最大レイテンシは60秒まで急増（リクエストのキューイングが発生）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <code>min_instances=10</code
                                    >、<code>container_concurrency=36</code>（既定の4倍）、300並列リクエスト
                                </td>
                                <td>最大レイテンシが60秒から約7秒まで低下</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    各コンテナ内では9個のエージェントプロセスが並列稼働するため、1プロセスあたりの同時処理可能リクエスト数は{' '}<code>container_concurrency / 9</code>{' '}で決まります。非同期エージェントでは{' '}<code>container_concurrency</code>{' '}を9の倍数（例：36）に設定することが出発点として推奨されますが、値を上げすぎるとメモリ不足（OOM）エラーのリスクがある点には注意が必要です<a
                        className="footnote-ref"
                        href="#ref21"
                        id="fnref122"
                        role="doc-noteref"
                        ><sup>21</sup></a
                    >。
                </p>
                <Diagram id="diag-9" ariaLabel="コールドスタートと並行度チューニングによるレイテンシ改善フロー" />
                <p>
                    「Monitoring and optimizing agents for performance, reliability, and
                    cost」で明示的に触れられている「ロジックエラー・レイテンシのボトルネック・ハルシネーションの特定」は、これまで見てきた仕組みを組み合わせて次のように対応づけられます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">症状</th>
                                <th scope="col">主な特定手段</th>
                                <th scope="col">主な対処</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ロジックエラー</td>
                                <td>
                                    Traceタブでのステップ実行確認、<code
                                        >tool_trajectory_avg_score</code
                                    >
                                    や <code>rubric_based_tool_use_quality_v1</code> による回帰検知
                                </td>
                                <td>
                                    プロンプト・ツール定義の見直し、Agent
                                    Optimizerによる指示の自動改善提案<a
                                        className="footnote-ref"
                                        href="#ref9"
                                        id="fnref123"
                                        role="doc-noteref"
                                        ><sup>9</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>レイテンシのボトルネック</td>
                                <td>
                                    Observability
                                    Tools/Modelsタブのp95レイテンシ、コールドスタート・並行度の分析
                                </td>
                                <td>
                                    <code>min_instances</code> の引き上げ、<code
                                        >container_concurrency</code
                                    >
                                    のチューニング<a
                                        className="footnote-ref"
                                        href="#ref21"
                                        id="fnref124"
                                        role="doc-noteref"
                                        ><sup>21</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ハルシネーション</td>
                                <td>
                                    <code>hallucinations_v1</code> 指標、Online
                                    MonitorのEvaluationタブでの継続監視
                                </td>
                                <td>
                                    RAGパイプラインの根拠付け強化、safetyやhallucination指標をリリースゲートに追加<a
                                        className="footnote-ref"
                                        href="#ref4"
                                        id="fnref125"
                                        role="doc-noteref"
                                        ><sup>4</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref6"
                                        id="fnref126"
                                        role="doc-noteref"
                                        ><sup>6</sup></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="callout-practice">
                    <div className="icon">&#10003;</div>{' '}
                    <div className="body">
                        <div className="label">ベストプラクティス</div>{' '}
                        <ul>
                            <li>
                                コストと信頼性はトレードオフになりやすい。<code>min_instances</code>{' '}を上げるとコールドスタートは減る。なお、これらのリソース制御がプレビュー段階にある間は、最小インスタンス数を高く設定してもアイドル時間に対してエージェントは課金されない。ただし課金ルールは今後変更される可能性があるため、実トラフィックのベースラインを計測した上で値を決める<a
                                    className="footnote-ref"
                                    href="#ref21"
                                    id="fnref127"
                                    role="doc-noteref"
                                    ><sup>21</sup></a
                                >。
                            </li>{' '}
                            <li>
                                非同期（ADKベースなど）エージェントは{' '}<code>container_concurrency</code>{' '}を既定値のまま使わず、9の倍数を出発点にチューニングし、OOMエラーが出ないことを負荷テストで確認する<a
                                    className="footnote-ref"
                                    href="#ref21"
                                    id="fnref128"
                                    role="doc-noteref"
                                    ><sup>21</sup></a
                                >。
                            </li>{' '}
                            <li>
                                パフォーマンス最適化の前に、必ずObservabilityのOverview／Models／Toolsタブでボトルネックの所在（モデル呼び出しかツール呼び出しかインフラか）を特定してから対処する。原因を特定せずにインスタンス数だけ増やすとコストだけが増えるリスクがある<a
                                    className="footnote-ref"
                                    href="#ref19"
                                    id="fnref129"
                                    role="doc-noteref"
                                    ><sup>19</sup></a
                                ><a
                                    className="footnote-ref"
                                    href="#ref21"
                                    id="fnref130"
                                    role="doc-noteref"
                                    ><sup>21</sup></a
                                >。
                            </li>{' '}
                            <li>
                                Agent
                                Optimizerのようなプロンプト最適化機能を、失敗クラスタの分析結果と組み合わせて使うことで、人手でログを読み込むよりも効率的にロジックエラーを改善できる<a
                                    className="footnote-ref"
                                    href="#ref9"
                                    id="fnref131"
                                    role="doc-noteref"
                                    ><sup>9</sup></a
                                >。
                            </li>
                        </ul>
                    </div>
                </div>

                <h2 id="セクション4-試験対象ツール一覧">セクション4 試験対象ツール一覧</h2>
                <p>
                    公式Exam
                    Guideに列挙されている試験対象ツールのうち、セクション4（評価とデプロイ）に直接関連するものを整理すると次の通りです<a
                        className="footnote-ref"
                        href="#ref2"
                        id="fnref132"
                        role="doc-noteref"
                        ><sup>2</sup></a
                    >。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ツール／サービス</th>
                                <th scope="col">セクション4での役割</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Agent Development Kit (ADK)</td>
                                <td>
                                    evalset／test fileによる評価、Conformance Testing、Agent
                                    Runtimeへのフル統合デプロイ
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Agent evaluation</td>
                                <td>
                                    Agent Platform Gen AI Evaluation
                                    Service全般（オンライン／オフライン評価、シミュレーション、失敗クラスタ分析）
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Agent Runtime（旧 Agent Engine）</td>
                                <td>
                                    フルマネージドなデプロイ先。トラフィック分割、トレーシング、ロギング、パフォーマンス最適化
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Cloud Run</td>
                                <td>サーバーレスコンテナベースのデプロイ先の選択肢</td>
                            </tr>
                            <tr className="odd">
                                <td>Google Kubernetes Engine (GKE)</td>
                                <td>フル制御が必要な場合のデプロイ先の選択肢</td>
                            </tr>
                            <tr className="even">
                                <td>Google Cloud Observability（Cloud Logging / Cloud Trace）</td>
                                <td>
                                    Online Monitor・Offline
                                    Evaluation・Observabilityダッシュボードのテレメトリ基盤
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>
                                    BigQuery / Cloud SQL / Cloud Storage / Firestore / Memorystore
                                    for Redis
                                </td>
                                <td>
                                    エージェントのデータ層。評価結果の格納（Cloud
                                    Storage）やセッション状態の永続化などに関連
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2 id="ベストプラクティスまとめ">ベストプラクティスまとめ</h2>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">カテゴリ</th>
                                <th scope="col">ベストプラクティス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>テストセット設計</td>
                                <td>
                                    正常系だけでなくエッジケース・ツールエラーを含める。ADK Web
                                    UIから実セッションを取り込んでテストケース化する<a
                                        className="footnote-ref"
                                        href="#ref4"
                                        id="fnref133"
                                        role="doc-noteref"
                                        ><sup>4</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>評価指標選定</td>
                                <td>
                                    CI/CDには <code>tool_trajectory_avg_score</code> と
                                    <code>response_match_score</code>、意味的一致には
                                    <code>final_response_match_v2</code>、参照回答なしには
                                    <code>rubric_based_*</code> を使い分ける<a
                                        className="footnote-ref"
                                        href="#ref4"
                                        id="fnref134"
                                        role="doc-noteref"
                                        ><sup>4</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>評価フレームワーク</td>
                                <td>
                                    ローカル開発はADK evalset、デプロイ後の継続監視はGen AI
                                    Evaluation ServiceのOnline Monitorを基本線とする<a
                                        className="footnote-ref"
                                        href="#ref5"
                                        id="fnref135"
                                        role="doc-noteref"
                                        ><sup>5</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>回帰テスト</td>
                                <td>
                                    <code>adk conformance</code>
                                    によるゴールデンベースラインの自動記録・自動比較をCI/CDのゲートにする<a
                                        className="footnote-ref"
                                        href="#ref4"
                                        id="fnref136"
                                        role="doc-noteref"
                                        ><sup>4</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ランタイム選定</td>
                                <td>
                                    フルマネージド志向ならAgent
                                    Runtime、シンプルなコンテナ運用ならCloud
                                    Run、GPU常時稼働や既存Kubernetes資産の活用ならGKE<a
                                        className="footnote-ref"
                                        href="#ref10"
                                        id="fnref137"
                                        role="doc-noteref"
                                        ><sup>10</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref11"
                                        id="fnref138"
                                        role="doc-noteref"
                                        ><sup>11</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref12"
                                        id="fnref139"
                                        role="doc-noteref"
                                        ><sup>12</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>リリース管理</td>
                                <td>
                                    トラフィック分割によるカナリアリリースと即時ロールバックの体制を整える<a
                                        className="footnote-ref"
                                        href="#ref15"
                                        id="fnref140"
                                        role="doc-noteref"
                                        ><sup>15</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref16"
                                        id="fnref141"
                                        role="doc-noteref"
                                        ><sup>16</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>トラブルシューティング</td>
                                <td>
                                    Observabilityの各タブ（Overview/Evaluation/Models/Tools/Usage/Logs）で症状ごとに切り分ける診断フローを持つ<a
                                        className="footnote-ref"
                                        href="#ref19"
                                        id="fnref142"
                                        role="doc-noteref"
                                        ><sup>19</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>推論ループ対策</td>
                                <td>
                                    検知（Online Monitor、Agent Anomaly
                                    Detection）と予防（呼び出し回数の上限設定）を両輪で実施する<a
                                        className="footnote-ref"
                                        href="#ref20"
                                        id="fnref143"
                                        role="doc-noteref"
                                        ><sup>20</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref21"
                                        id="fnref144"
                                        role="doc-noteref"
                                        ><sup>21</sup></a
                                    ><a
                                        className="footnote-ref"
                                        href="#ref22"
                                        id="fnref145"
                                        role="doc-noteref"
                                        ><sup>22</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>パフォーマンス最適化</td>
                                <td>
                                    <code>min_instances</code> と
                                    <code>container_concurrency</code>
                                    を実測データに基づいてチューニングし、コストとレイテンシのバランスを取る<a
                                        className="footnote-ref"
                                        href="#ref21"
                                        id="fnref146"
                                        role="doc-noteref"
                                        ><sup>21</sup></a
                                    >
                                </td>
                            </tr>
                            <tr className="even">
                                <td>セキュリティ監査</td>
                                <td>
                                    Agent Anomaly DetectionをOWASP Top 10 for Agentic Security
                                    Threatsの枠組みで理解し、Model Armor・Agent
                                    Gatewayと役割分担する<a
                                        className="footnote-ref"
                                        href="#ref20"
                                        id="fnref147"
                                        role="doc-noteref"
                                        ><sup>20</sup></a
                                    >
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h2 id="学習チェックリスト">学習チェックリスト</h2>
                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="title">学習チェックリスト</span
                        ><span className="count">{checkedCount} / {totalChecklist} 完了</span>
                    </div>
                    <ul>
                        <li>
                            <input id="chk1" type="checkbox" checked={!!checkedItems.chk1} onChange={() => handleCheckChange('chk1')} /><label htmlFor="chk1"
                                >ADKのEvalSetとTest
                                Fileの違い（対象セッション数・用途）を説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk2" type="checkbox" checked={!!checkedItems.chk2} onChange={() => handleCheckChange('chk2')} /><label htmlFor="chk2"
                                >トラジェクトリ評価と最終応答評価の違いを説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk3" type="checkbox" checked={!!checkedItems.chk3} onChange={() => handleCheckChange('chk3')} /><label htmlFor="chk3"
                                >User
                                Simulationがなぜ必要か（固定プロンプトの限界）を説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk4" type="checkbox" checked={!!checkedItems.chk4} onChange={() => handleCheckChange('chk4')} /><label htmlFor="chk4"
                                >ADKの評価指標（<code>tool_trajectory_avg_score</code>、<code>response_match_score</code>、<code>final_response_match_v2</code>、<code>rubric_based_*</code>、<code>hallucinations_v1</code>、<code>safety_v1</code>、<code>multi_turn_*</code>）を用途別に選べる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk5" type="checkbox" checked={!!checkedItems.chk5} onChange={() => handleCheckChange('chk5')} /><label htmlFor="chk5"
                                >Online Monitorが検出する「quality
                                drift」とは何かを説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk6" type="checkbox" checked={!!checkedItems.chk6} onChange={() => handleCheckChange('chk6')} /><label htmlFor="chk6"
                                >Online Monitorに必要なOpenTelemetryのシグナル（invoke
                                agentスパン、inference events）を挙げられる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk7" type="checkbox" checked={!!checkedItems.chk7} onChange={() => handleCheckChange('chk7')} /><label htmlFor="chk7"
                                >ADK evalset・Gen AI Evaluation Service・custom
                                autoratersの使い分けを説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk8" type="checkbox" checked={!!checkedItems.chk8} onChange={() => handleCheckChange('chk8')} /><label htmlFor="chk8"
                                >Loss Clustersとプロンプト最適化の関係を説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk9" type="checkbox" checked={!!checkedItems.chk9} onChange={() => handleCheckChange('chk9')} /><label htmlFor="chk9"
                                >Conformance
                                Testingの3つのファイル（spec.yaml、generated-recordings.yaml、generated-session.yaml）の役割を説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk10" type="checkbox" checked={!!checkedItems.chk10} onChange={() => handleCheckChange('chk10')} /><label htmlFor="chk10"
                                >Agent Runtime／Cloud
                                Run／GKEのそれぞれが向いているユースケースを説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk11" type="checkbox" checked={!!checkedItems.chk11} onChange={() => handleCheckChange('chk11')} /><label htmlFor="chk11"
                                >Agent
                                Runtimeの旧称と、APIリソース名（ReasoningEngine）を知っている</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk12" type="checkbox" checked={!!checkedItems.chk12} onChange={() => handleCheckChange('chk12')} /><label htmlFor="chk12"
                                >トラフィック分割によるカナリアリリースの仕組みを説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk13" type="checkbox" checked={!!checkedItems.chk13} onChange={() => handleCheckChange('chk13')} /><label htmlFor="chk13"
                                >ドリフト・ツール呼び出しレイテンシ・推論ループ・システム障害それぞれの典型的な診断手段を挙げられる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk14" type="checkbox" checked={!!checkedItems.chk14} onChange={() => handleCheckChange('chk14')} /><label htmlFor="chk14"
                                >Observabilityの6つのタブ（Overview/Evaluation/Models/Tools/Usage/Logs）がそれぞれ何を表示するか説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk15" type="checkbox" checked={!!checkedItems.chk15} onChange={() => handleCheckChange('chk15')} /><label htmlFor="chk15"
                                >Agent Anomaly
                                Detectionの3層構成（Layer1〜3）とOWASPの脅威カテゴリを説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk16" type="checkbox" checked={!!checkedItems.chk16} onChange={() => handleCheckChange('chk16')} /><label htmlFor="chk16"
                                >コールドスタート問題への対策（<code>min_instances</code>）を数値とともに説明できる</label
                            >
                        </li>{' '}
                            <li>
                            <input id="chk17" type="checkbox" checked={!!checkedItems.chk17} onChange={() => handleCheckChange('chk17')} /><label htmlFor="chk17"
                                >非同期エージェントにおける<code>container_concurrency</code>のチューニング方法を説明できる</label
                            >
                        </li>
                    </ul>
                </div>

                <h2 id="出典">出典</h2>
                <div className="ref-grid" id="referenceGrid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            Google Cloud, &quot;Professional Agentic Architect certification,&quot;
                            <a href="https://cloud.google.com/learn/certification/agentic-architect"
                                >https://cloud.google.com/learn/certification/agentic-architect</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            Google Cloud, &quot;Professional Agentic Architect Certification exam
                            guide&quot; (PDF),
                            <a
                                href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf"
                                >https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            Google, &quot;Why evaluate agents,&quot; ADK Docs,
                            <a
                                href="https://github.com/google/adk-docs/blob/main/docs/evaluate/index.md"
                                >https://github.com/google/adk-docs/blob/main/docs/evaluate/index.md</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            Google, &quot;Evaluate your agents with ADK,&quot; adk-docs
                            (evaluate/index.md),
                            <a
                                href="https://github.com/google/adk-docs/blob/main/docs/evaluate/index.md"
                                >https://github.com/google/adk-docs/blob/main/docs/evaluate/index.md</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            Google Cloud, &quot;Agent evaluation,&quot; Gemini Enterprise Agent
                            Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/agent-evaluation</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            Google Cloud, &quot;Continuous evaluation with online monitors,&quot;
                            Gemini Enterprise Agent Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-online"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-online</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            Google Cloud, &quot;Gen AI evaluation service overview,&quot; Gemini
                            Enterprise Agent Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/models/evaluation-overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            Google Cloud Blog, &quot;I/O &apos;26 news for agent developers on Google
                            Cloud,&quot;
                            <a
                                href="https://cloud.google.com/blog/topics/developers-practitioners/io26-news-for-agent-developers-on-google-cloud"
                                >https://cloud.google.com/blog/topics/developers-practitioners/io26-news-for-agent-developers-on-google-cloud</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Google Cloud, &quot;Evaluate your agents,&quot; Gemini Enterprise Agent
                            Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/evaluation/evaluate-agents</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            Google Cloud, &quot;Agent Runtime,&quot; Gemini Enterprise Agent
                            Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/build/runtime</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            Mazlum Tosun, &quot;End-to-End AI Agent on GCP: ADK, BigQuery MCP, Agent
                            Engine, and Cloud Run,&quot; Medium (Google Cloud Community),
                            <a
                                href="https://medium.com/google-cloud/end-to-end-ai-agent-on-gcp-adk-bigquery-mcp-agent-engine-and-cloud-run-4843fec27c13"
                                >https://medium.com/google-cloud/end-to-end-ai-agent-on-gcp-adk-bigquery-mcp-agent-engine-and-cloud-run-4843fec27c13</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            Amit Divekar, &quot;GCP Cloud Run vs GKE in 2026: Architecting for
                            High-Throughput AI Workloads,&quot;
                            <a href="https://amitdevx.tech/blogs/gcp-cloud-run-gke-ai-workloads"
                                >https://amitdevx.tech/blogs/gcp-cloud-run-gke-ai-workloads</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref13">
                        <div className="num">13</div>
                        <div className="txt">
                            happtiq, &quot;In Comparison: Cloud Run vs. Google Kubernetes
                            Engine,&quot;
                            <a href="https://www.happtiq.com/blog/cloud-run-vs-gke"
                                >https://www.happtiq.com/blog/cloud-run-vs-gke</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref14">
                        <div className="num">14</div>
                        <div className="txt">
                            Google, &quot;Deployment,&quot; Agents CLI Guide,
                            <a href="https://google.github.io/agents-cli/guide/deployment/"
                                >https://google.github.io/agents-cli/guide/deployment/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref15">
                        <div className="num">15</div>
                        <div className="txt">
                            Google Cloud, &quot;Manage revisions and traffic,&quot; Gemini
                            Enterprise Agent Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/manage-revisions-and-traffic</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref16">
                        <div className="num">16</div>
                        <div className="txt">
                            Google Cloud, &quot;Rollbacks, gradual rollouts, and traffic
                            migration,&quot; Cloud Run Documentation,
                            <a
                                href="https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration"
                                >https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref17">
                        <div className="num">17</div>
                        <div className="txt">
                            Arize AI, &quot;Why AI Agents Break: A Field Analysis of Production
                            Failures,&quot;
                            <a href="https://arize.com/blog/common-ai-agent-failures/"
                                >https://arize.com/blog/common-ai-agent-failures/</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref18">
                        <div className="num">18</div>
                        <div className="txt">
                            Analytics Insight, &quot;AI Agent Performance Problems: Causes, Fixes,
                            and Best Practices,&quot;
                            <a
                                href="https://www.analyticsinsight.net/artificial-intelligence/common-ai-agent-performance-problems-and-how-to-fix-them"
                                >https://www.analyticsinsight.net/artificial-intelligence/common-ai-agent-performance-problems-and-how-to-fix-them</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref19">
                        <div className="num">19</div>
                        <div className="txt">
                            Google Cloud, &quot;Observability overview,&quot; Gemini Enterprise
                            Agent Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/overview"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/optimize/observability/overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref20">
                        <div className="num">20</div>
                        <div className="txt">
                            Google Cloud, &quot;Agent Anomaly Detection overview,&quot; Gemini
                            Enterprise Agent Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-anomalies-overview"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-anomalies-overview</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref21">
                        <div className="num">21</div>
                        <div className="txt">
                            Google Cloud, &quot;Optimize and scale Agent Runtime performance,&quot;
                            Gemini Enterprise Agent Platform Documentation,
                            <a
                                href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale"
                                >https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/runtime/optimize-and-scale</a
                            >
                        </div>
                    </div>
                    <div className="ref-card" id="ref22">
                        <div className="num">22</div>
                        <div className="txt">
                            dev.to (AWS), &quot;How to Prevent AI Agent Reasoning Loops from Wasting
                            Tokens,&quot;
                            <a
                                href="https://dev.to/aws/how-to-prevent-ai-agent-reasoning-loops-from-wasting-tokens-2652"
                                >https://dev.to/aws/how-to-prevent-ai-agent-reasoning-loops-from-wasting-tokens-2652</a
                            >
                        </div>
                    </div>
                </div>
            
                </main>
            </div>
        </div>
    );
}
