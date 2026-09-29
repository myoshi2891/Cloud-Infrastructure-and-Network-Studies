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

export default function Section5Guide() {
    const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
    const totalChecklist = 17;
    const checkedCount = Object.values(checkedItems).filter(Boolean).length;

    const handleCheckChange = (id: string) => {
        setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="agentic-section5-page">
            <div className="layout">
                <NavBar />
                <main className="main">

                <div className="hero">
                    <div className="kicker">Professional Agentic Architect · Section 5</div>
                    <h1>
                        Google Cloud Professional Agentic
                        Architect：セクション5「セキュリティとガバナンス」完全攻略ガイド
                    </h1>
                    <div className="meta-row">
                        <span className="pill">配点 <strong>約15%</strong></span>
                        <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 9点</strong></span>
                        <span className="pill">参考文献 <strong>24件</strong></span>
                    </div>
                </div>

                <blockquote className="lede-quote">
                    <p>
                        Google Cloud Certified Professional Agentic Architect
                        認定試験のセクション5（配点
                        約15%）を、脅威モデルの基礎からエンタープライズ実装、試験特有の頻出シナリオまで、初学者でも一気通貫で理解できるように解説します。
                    </p>
                </blockquote>
                <h2 id="1-セクション5概要自律型aiエージェントにおける脅威モデルとガバナンスの基本">
                    1. セクション5概要：自律型AIエージェントにおける脅威モデルとガバナンスの基本
                </h2>
                <h3 id="11-なぜエージェントは従来のwebアプリより危険なのか">
                    1.1 なぜ「エージェント」は従来のWebアプリより危険なのか
                </h3>
                <p>
                    従来のWebアプリケーションのセキュリティモデルは、「入力はすべて信頼できない」という前提のもとで、決まったAPIエンドポイントと決まった権限だけを守ればよいものでした。ところが自律型AIエージェント（Agentic
                    AI）は、次の3点で根本的に異なるリスクプロファイルを持ちます。
                </p>
                <ol>
                    <li>
                        <strong>意思決定の主体が確率的である</strong>：エージェントの「次に何をするか」は大規模言語モデル（LLM）の推論によって動的に決まります。同じ入力でも実行されるツール呼び出しが変わり得るため、静的なコードレビューだけでは安全性を保証できません。
                    </li>
                    <li>
                        <strong>信頼境界が入力の中に埋め込まれる</strong>：ユーザーの指示（信頼できる）と、メールの本文やWebページ、RAGで取得したドキュメントなどの外部データ（信頼できない）が、同じプロンプトという1つのチャネルに混在します。この結果、悪意のある指示が外部データに紛れ込む<strong>間接的プロンプトインジェクション</strong>（indirect
                        prompt injection）が、エージェント特有の最重要脅威になります。
                    </li>
                    <li>
                        <strong>エージェントは「実世界に作用する権限」を持つ</strong>：メール送信、ファイル削除、送金、コード実行など、エージェントに与えられたツールはそのまま実際のシステムを変更します。ハルシネーション（誤った推論）や悪意ある操作が、そのまま過剰な権限行使（excessive
                        agency）につながります。
                    </li>
                </ol>
                <p>
                    Google の Secure AI Framework（SAIF）はこの構造を「Application &
                    Perception」→「Reasoning core」→「Orchestration」→「Response
                    rendering」という4つのコンポーネントに分解し、各段階でどのような脅威が入り込むかを整理しています。
                </p>
                <Diagram id="diag-1" ariaLabel="自律型AIエージェントの4層構造と各段階におけるセキュリティリスク" />
                <p>
                    この図が示す通り、境界は「アプリケーションの外側」ではなく、<strong>エージェント内部のあらゆる受け渡しポイント</strong>に存在します。セクション5で学ぶ各サービス（Agent
                    Identity、Agent Gateway、Model Armor、Semantic Governance
                    Policy）は、それぞれこの図のどこか特定のポイントを守るために設計されています。
                </p>
                <h3 id="12-saifgoogle-の-secure-ai-framework-におけるエージェント特有のリスクと制御">
                    1.2 SAIF：Google の Secure AI Framework
                    における「エージェント特有」のリスクと制御
                </h3>
                <p>
                    SAIF は元々モデル全般のセキュリティを扱うフレームワークですが、2025年以降「Focus
                    on
                    Agents」という拡張が公開され、エージェント特有の2大リスクと3つの制御が定義されています。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">分類</th>
                                <th scope="col">名称</th>
                                <th scope="col">内容</th>
                                <th scope="col">対応する制御</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>リスク</td>
                                <td>
                                    <strong>Sensitive Data Disclosure</strong>（機密データ開示）
                                </td>
                                <td>
                                    エージェントが持つ特権的アクセス（メール・ファイル・PCそのもの）を悪用され、個人情報や社内機密が外部に漏洩する。ツールを使って文書を共有したり、URLやMarkdown画像に情報を埋め込んで持ち出す手口も含まれる。
                                </td>
                                <td>
                                    Agent Permissions、Agent User Control、Agent
                                    Observability、出力の検証とサニタイズ
                                </td>
                            </tr>
                            <tr className="even">
                                <td>リスク</td>
                                <td><strong>Rogue Actions</strong>（意図しない実行）</td>
                                <td>
                                    誤って（misalignment）あるいは悪意を持って（間接的プロンプトインジェクション等）、エージェントが意図しない実世界アクションを実行してしまう。複数エージェント間の通信を乗っ取る手口や、カレンダー招待に潜ませた「時限発火」型の攻撃も含まれる。
                                </td>
                                <td>Agent Permissions、Agent User Control、Agent Observability</td>
                            </tr>
                            <tr className="odd">
                                <td>制御</td>
                                <td><strong>Agent User Control</strong></td>
                                <td>
                                    ユーザーのデータを変更する、またはユーザーに代わって行動するアクションについて、必ずユーザーの承認を取得する（Human-in-the-Loop
                                    の理論的根拠）。
                                </td>
                                <td>—</td>
                            </tr>
                            <tr className="even">
                                <td>制御</td>
                                <td><strong>Agent Permissions</strong></td>
                                <td>
                                    最小権限の原則をエージェントの権限の「上限」として適用し、利用可能なツール数とアクションの範囲を絞り込む。文脈に応じて動的に権限を絞る「リファレンスモニター」的な設計も推奨される。
                                </td>
                                <td>—</td>
                            </tr>
                            <tr className="odd">
                                <td>制御</td>
                                <td><strong>Agent Observability</strong>（新設）</td>
                                <td>
                                    エージェントの行動・ツール利用・推論過程をログで追跡可能にし、デバッグ、セキュリティ監査、ユーザーへの説明責任を果たせるようにする。
                                </td>
                                <td>—</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    これらの制御は、後述する <strong>Agent Identity</strong>（最小権限のID）、<strong>Agent Gateway</strong>（実行時のポリシー執行と可観測性）、<strong>Semantic Governance Policy</strong>（意図整合性の検証）という Google Cloud の実装にそのまま対応しています。
                </p>
                <h3 id="13-業界標準の脅威分類owasp-top-10-との対応">
                    1.3 業界標準の脅威分類：OWASP Top 10 との対応
                </h3>
                <p>
                    Google Cloud の実装を理解する前に、業界共通言語である OWASP
                    の脅威分類を押さえておくと、試験のシナリオ問題（「この攻撃を防ぐには何を設定すべきか」）に対応しやすくなります。2025年以降、OWASP
                    は LLM 単体の脅威と、エージェント特有の脅威を別々のTop 10として整理しています。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">ID</th>
                                <th scope="col">名称</th>
                                <th scope="col">概要</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ASI01</td>
                                <td>Agent Goal Hijack</td>
                                <td>
                                    悪意あるコンテンツによってエージェントの目的そのものが書き換えられる（間接的プロンプトインジェクションの発展形）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ASI02</td>
                                <td>Tool Misuse and Exploitation</td>
                                <td>
                                    正規のツールを、パラメータ改ざんやツールチェーンの悪用によって安全でない形で使用される
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ASI03</td>
                                <td>Identity and Privilege Abuse</td>
                                <td>エージェントが高権限の認証情報を継承・昇格させて悪用される</td>
                            </tr>
                            <tr className="even">
                                <td>ASI04</td>
                                <td>Agentic Supply Chain Vulnerabilities</td>
                                <td>
                                    侵害されたツール・プラグイン・外部MCPサーバーなどのサプライチェーン経由の脆弱性
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ASI05</td>
                                <td>Unexpected Code Execution</td>
                                <td>
                                    エージェントが安全でないコード／コマンドを生成・実行してしまう
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ASI06</td>
                                <td>Memory and Context Poisoning</td>
                                <td>
                                    エージェントの記憶やRAGデータベースに毒データが注入され、意思決定が歪められる
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>ASI07</td>
                                <td>Insecure Inter-Agent Communication</td>
                                <td>マルチエージェント間通信でのなりすまし・改ざん</td>
                            </tr>
                            <tr className="even">
                                <td>ASI08</td>
                                <td>Cascading Failures</td>
                                <td>小さな誤りが計画・実行・記憶全体に連鎖的に増幅する</td>
                            </tr>
                            <tr className="odd">
                                <td>ASI09</td>
                                <td>Human Agent Trust Exploitation</td>
                                <td>
                                    人間がエージェントの提案を過信し、ソーシャルエンジニアリングに利用される
                                </td>
                            </tr>
                            <tr className="even">
                                <td>ASI10</td>
                                <td>Rogue Agents</td>
                                <td>
                                    侵害・誤動作したエージェントが正規に見えるまま有害な行動を取る
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    OWASP GenAI LLM Top
                    10（2026年版、2026-08-04リリース）とは、以下のように対応関係があります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">エージェント側リスク</th>
                                <th scope="col">対応するLLM Top 10（2026年版）</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>ASI01: Agent Goal Hijack</td>
                                <td>LLM01: Prompt Injection</td>
                            </tr>
                            <tr className="even">
                                <td>ASI02 / ASI03: Tool Misuse / Identity Abuse</td>
                                <td>LLM03: Excessive Agency</td>
                            </tr>
                            <tr className="odd">
                                <td>ASI05: Unexpected Code Execution</td>
                                <td>LLM01, LLM10: Improper Output Handling</td>
                            </tr>
                            <tr className="even">
                                <td>ASI06: Memory and Context Poisoning</td>
                                <td>LLM05: Data and Model Poisoning</td>
                            </tr>
                            <tr className="odd">
                                <td>ASI08: Cascading Failures</td>
                                <td>LLM07: Misinformation</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <blockquote className="note-callout info">
                    <p>
                        <strong>参考（歴史的な対応表）：</strong> 旧 OWASP LLM Top 10
                        2025年版では、Excessive Agency は LLM06、Improper Output Handling は
                        LLM05、Misinformation は LLM09
                        に分類されていました。2026年版ではリスクの再評価に伴い番号が変更されています（Excessive
                        Agency が LLM06 → LLM03 に昇格など）。
                    </p>
                </blockquote>
                <h3 id="14-試験ガイド原文におけるセクション5の範囲">
                    1.4 試験ガイド原文における「セクション5」の範囲
                </h3>
                <p>
                    公式試験ガイド（後掲リンク参照）は、セクション5「Securing and governing agentic
                    workflows」（配点
                    約15%）を次の2項目で定義しています。試験対策上、この原文の粒度を正確に押さえることが最も重要です。
                </p>
                <ul>
                    <li>
                        <strong>5.1 Configuring agent security and
                            governance（エージェントのセキュリティとガバナンスの構成）</strong>
                        <ul>
                            <li>
                                OAuth 2.0によるエージェント〜ツール間APIコールの認証・安全な実行
                            </li>
                            <li>
                                Agent Identity を用いた Principal Access
                                Boundary（PAB）ポリシーの構成
                            </li>
                            <li>
                                トラフィックの監視とエージェントの追跡のための Agent Gateway の構成
                            </li>
                            <li>
                                エージェント的ガバナンスとポリシー執行の設計・構成（Agent
                                Registry、Model Armor など）
                            </li>
                        </ul>
                    </li>
                    <li>
                        <strong>5.2 Implementing secure agent behavior and
                            execution（安全なエージェントの動作と実行の実装）</strong>
                        <ul>
                            <li>
                                適切な安全性フレームワークとガードレールの設計（Agent Gateway、Model
                                Armor、Human-in-the-Loop）
                            </li>
                            <li>
                                Agent Gateway と Agent Registry
                                によるデータへの安全なアクセスとID伝播の構成
                            </li>
                        </ul>
                    </li>
                </ul>
                <p>
                    このガイドの2〜5章は、この原文の粒度に沿って、ユーザーからご要望のあった VPC
                    Service Controls・CMEK・Sensitive Data
                    Protection・監査ログなどの一般的なエンタープライズセキュリティ概念も組み込みながら、実装レベルまで掘り下げます。
                </p>
                <blockquote className="source-note">
                    <p>
                        <strong>出典：</strong>{' '} <a href="https://cloud.google.com/learn/certification/agentic-architect">Professional Agentic Architect 認定試験概要</a>、<a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf">公式Exam Guide PDF</a>、<a href="https://saif.google/focus-on-agents">SAIF: Focus on Agents</a>、<a href="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/">OWASP Top 10 for Agentic Applications 2026</a>
                    </p>
                </blockquote>
                <hr />
                <h2 id="2-id管理認証アクセス制御agent-identity--zero-trust">
                    2. ID管理・認証・アクセス制御（Agent Identity & Zero Trust）
                </h2>
                <h3 id="21-なぜサービスアカウントでは不十分なのか">
                    2.1 なぜサービスアカウントでは不十分なのか
                </h3>
                <p>
                    従来型のGoogle
                    Cloudワークロードはサービスアカウントで認証していましたが、エージェントには次のような固有の課題があります。
                </p>
                <ul>
                    <li>
                        サービスアカウントキーが漏洩すると、有効期限が切れるまで永続的に悪用され得る
                    </li>
                    <li>
                        複数のエージェントインスタンスが同じサービスアカウントを共有すると、「どのエージェントが何をしたか」の追跡が困難になる
                    </li>
                    <li>
                        ユーザーに代わって行動する場合の権限委譲（on-behalf-of）が標準化されていない
                    </li>
                </ul>
                <p>
                    これらを解決するために設計されたのが <strong>Agent Identity</strong> です。Agent
                    Identity
                    はサービスアカウントを置き換えるものではなく、エージェント実行基盤（Agent
                    Runtime、Gemini Enterprise、Cloud Run
                    など）向けに特化した、より強く縛られた（strongly attested）ID基盤です。
                </p>
                <h3 id="22-agent-identity-の中核コンポーネント">
                    2.2 Agent Identity の中核コンポーネント
                </h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">コンポーネント</th>
                                <th scope="col">説明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><strong>SPIFFE ベースID</strong></td>
                                <td>
                                    各エージェントに一意のSPIFFE ID文字列を付与。形式は
                                    <code>spiffe://TRUST_DOMAIN/resources/SERVICE/RESOURCE_PATH</code>。IAM許可ポリシーではプリンシパル識別子として
                                    <code>principal://...</code> 形式を用いる。
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>Agent 認証情報</strong></td>
                                <td>
                                    X.509証明書（24時間有効・自動更新）とGoogle
                                    Cloudアクセストークンをサポート。アクセストークンはエージェント固有のX.509証明書に暗号学的に束縛（token
                                    binding）され、トークン盗難を防止する。
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>Agent Identity auth manager</strong></td>
                                <td>
                                    API
                                    キー、OAuthクライアントID/シークレット、委任されたエンドユーザーOAuthトークンを一元管理する「認証情報の金庫」。auth
                                    provider という構成単位でツールごとの認証方式を定義する。
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>Context-Aware Access（既定で有効）</strong></td>
                                <td>
                                    mTLS と DPoP（Demonstrating Proof of
                                    Possession）による二重束縛（double-bound credentials）。Google
                                    Cloud APIへの直接アクセスはmTLSで、Agent
                                    Gatewayを介した先へのアクセスはDPoPで、それぞれ再生攻撃（リプレイ）を防止する。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    サービスアカウントとの決定的な違いは、<strong>Agent Identity
                        は既定で共有されず、なりすまし（impersonation）ができず、長期間有効なキーを発行できない</strong>という点です。これにより、最小権限の原則がアーキテクチャレベルで強制されます。
                </p>
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            サービスアカウントキーの発行・配布をやめ、Agent IdentityのSPIFFE
                            ID＋自動更新X.509証明書に置き換えましょう。長期間有効なキー自体が存在しなければ、キー漏洩による被害はそもそも発生し得ません。
                        </p>
                    </div>
                </div>

                <h3 id="23-認証モデル誰の権限で何を呼び出すか">
                    2.3 認証モデル：誰の権限で、何を呼び出すか
                </h3>
                <p>
                    Agent Identity
                    は「エージェント自身の権限で動くのか」「エンドユーザーに代わって動くのか」で異なる認証方式を使い分けます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">権限の所在</th>
                                <th scope="col">認証方式</th>
                                <th scope="col">対象リソース</th>
                                <th scope="col">ユースケース</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><strong>ユーザー委任権限</strong></td>
                                <td>OAuth 2.0（3-legged / 3LO）</td>
                                <td>外部ツール・サービス</td>
                                <td>
                                    エージェントが特定ユーザーに代わって行動する場合（例：ユーザーのJiraタスクやGitHubリポジトリへのアクセス）。auth
                                    manager で3LOの auth provider
                                    を構成し、ユーザーの同意とトークンを管理する。
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>エージェント自身の権限</strong></td>
                                <td>Cloud-based identity（Agent Identity）</td>
                                <td>Google Cloud サービス</td>
                                <td>
                                    Google Cloud上でホストされるエージェントが自身のIDで他のGoogle
                                    Cloudサービスにアクセスする場合。
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>エージェント自身の権限</strong></td>
                                <td>OAuth 2.0（2-legged / 2LO）</td>
                                <td>外部ツール・サービス</td>
                                <td>OAuth対応の外部サービスとのマシン間認証で推奨。</td>
                            </tr>
                            <tr className="even">
                                <td><strong>エージェント自身の権限</strong></td>
                                <td>API キー</td>
                                <td>外部ツール・サービス</td>
                                <td>
                                    暗号鍵やパスワードによる認証が必要な外部サービス向け。auth
                                    manager が安全に保管・管理する。
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>エージェント自身の権限</strong></td>
                                <td>HTTP Basic認証</td>
                                <td>外部ツール・サービス</td>
                                <td>
                                    <strong>HTTPS/TLS なしでの使用は禁止</strong>。TLS
                                    で保護された通信路上でのみ使用可。平文通信での利用は資格情報が漏洩するリスクがあるため厳禁。
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    Agent Identity が Agent Gateway や Gemini Enterprise
                    とともに使われる場合、Gemini Enterprise
                    コネクタなどから提供されるエンドユーザーの認証情報は auth manager
                    によって暗号化され、Agent Gateway
                    側で復号されます。つまり、<strong>エージェント自身は生の認証情報に触れることができません</strong>。これは間接的プロンプトインジェクションでエージェントが乗っ取られた場合でも、認証情報そのものの流出を防ぐ重要な防御層です。
                </p>
                <h3 id="24-認証認可フローエンドユーザー--エージェント--google-cloud-ツールapi">
                    2.4 認証・認可フロー：エンドユーザー → エージェント → Google Cloud ツール/API
                </h3>
                <p>
                    以下は、ユーザーがエージェントに指示を出し、エージェントがGoogle
                    Cloud上のツール（他のエージェントやMCPサーバーなど）を呼び出すまでの、Agent
                    Identity と Agent Gateway が関与する典型的なシーケンスです。
                </p>
                <Diagram id="diag-2" ariaLabel="エンドユーザー・エージェント・Google CloudツールAPI間の認証認可シーケンスフロー" />
                <p>
                    このフローの重要なポイントは、<strong>IAP（Identity-Aware
                        Proxy）の適用範囲がトラフィック方向によって異なる</strong>ことです。<strong>Agent-to-Anywhere（egress）では IAP
                        が既定の実行時強制レイヤーとして常時有効</strong>であり、ドライラン監査モードへの切り替えも可能です。一方、<strong>Client-to-Agent（ingress）には IAP は適用されず</strong>、クライアントからエージェントへの受信リクエストの認証・認可制御は、IAP
                    とは別途構成するメカニズム（例：API Gateway の認証設定、Cloud IAM
                    の呼び出し元検証）で実施します。また、宛先（他のエージェント、MCPサーバー、エンドポイント）は必ず
                    Agent Registry に登録し、<code>iap.resources.egressViaIAP</code>{' '}権限をエージェントIDに付与する必要があります。未登録の宛先へのアクセスは、Agent
                    Registry
                    に登録しない代わりに「未登録エンドポイント向けポリシー」を個別設定しない限り拒否されます。
                </p>
                <h3 id="25-principal-access-boundarypabポリシー">
                    2.5 Principal Access Boundary（PAB）ポリシー
                </h3>
                <p>
                    PAB
                    は、通常のIAM許可ポリシー（何を許可するか）とは独立した「<strong>このプリンシパルがそもそもアクセスしてよい対象の外枠</strong>」を定義する仕組みです。IAMロールで許可されていても、PABの外側にあるリソースにはアクセスできません。
                </p>
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
                                <td>API バージョン</td>
                                <td>IAM v3 API（GA）</td>
                            </tr>
                            <tr className="even">
                                <td>定義の階層</td>
                                <td>PABポリシーは常に組織（Organization）の子として定義される</td>
                            </tr>
                            <tr className="odd">
                                <td>適用方法</td>
                                <td>
                                    PABポリシーを作成し、ポリシーバインディングでプリンシパルセットに紐付ける（1つのバインディングは1つのPABポリシーと1つのプリンシパルセットを結びつける）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>制限</td>
                                <td>
                                    1つのプリンシパルセットに最大10個のPABポリシーをバインド可能、1ポリシーあたり最大500ルール
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>評価順序</td>
                                <td>
                                    IAMは許可ポリシー・拒否ポリシー・PABポリシーをすべて同時に評価するが、概念上は「PABでそもそも対象外か」→「拒否ポリシーで明示的に拒否されていないか」→「許可ポリシーで許可されているか」の順に考えると理解しやすい
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Agent Identity との統合</td>
                                <td>
                                    Agent Identity は IAM 許可/拒否ポリシー、PAB、VPC Service
                                    Controls と統合されており、Agent Identity
                                    単体のドキュメントでも「PABはエージェントがアクセスできるリソースを、他の権限に関わらず制限する」と明記されている
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    エージェントアーキテクチャでPABが特に有効なのは、<strong>「このエージェントは組織内のどのプロジェクトにもアクセスしてよいわけではなく、担当プロジェクトのSpanner/Cloud
                        Storageバケットだけに限定する</strong>」といった、ロールベースのIAMだけでは表現しにくい「外枠」を敷く場面です。
                </p>
                <Diagram id="diag-3" ariaLabel="Principal Access Boundary (PAB) によるエージェントのアクセス境界制御" />
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            IAMロールで許可されている＝安全、とは限りません。まずPABで「そもそもアクセスしてよい対象」を組織レベルで絞り込み、IAMロールはその内側だけで最小権限を与える、という二段構えで設計しましょう。
                        </p>
                    </div>
                </div>
                <h3 id="26-iam-conditions-によるきめ細やかな制御">
                    2.6 IAM Conditions によるきめ細やかな制御
                </h3>
                <p>
                    Sessions（対話セッション）や Memory
                    Bank（エージェントの長期記憶）へのアクセスは、IAM Conditions
                    を使って属性ベースで制御できます。条件式（CEL: Common Expression
                    Language）で評価する属性はリソースごとに決まっており、<strong>セッションIDのプレフィックスを評価するのではない</strong>点に注意が必要です。
                </p>
                <ul>
                    <li>
                        <strong>Sessions</strong>：セッション作成時に指定した <code>userId</code> を
                        <code>aiplatform.googleapis.com/sessionUserId</code> で評価する。例：<code>api.getAttribute('aiplatform.googleapis.com/sessionUserId',
                            '').startsWith('team-a-')</code>
                    </li>
                    <li>
                        <strong>Memory Bank</strong>：メモリ作成時に指定したスコープ（<code>{"{'user_id': '123'}"}</code>
                        のような任意の辞書）を
                        <code>aiplatform.googleapis.com/memoryScope</code>
                        で評価する。スコープ単位で「どのプリンシパルがどのグループのメモリを読み書きできるか」を制御できる（条件付き
                        IAM
                        ポリシーはプロジェクトレベルで作成し、プロジェクト内の全メモリに適用される）。ただし
                        <strong>複数スコープにまたがって動作する <code>ListMemories</code> と
                            <code>PurgeMemories</code> は
                            <code>memoryScope</code> 条件に対応しない</strong>
                        ため、スコープ単位で制限できない。これらを許可するには無条件ロールの付与が必要で、無条件ロールを持つプリンシパルは意図したスコープ外のメモリまで一覧取得・削除できてしまう。この2権限は別途、付与先を絞った最小権限として設計する
                    </li>
                </ul>
                <p>
                    これは、Vertex AI Search/Agent Search 時代から続くGoogle CloudのIAM
                    Conditions機構をAgent Platformのリソースにもそのまま適用したものです。
                </p>
                <blockquote className="source-note">
                    <p>
                        <strong>出典：</strong>{' '} <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview">Agent Identity overview</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview">Agent Gateway overview</a>、<a href="https://docs.cloud.google.com/iam/docs/overview">IAM overview</a>、<a href="https://docs.cloud.google.com/iam/docs/policy-types">IAM policy types（PAB）</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions">Control access to sessions with IAM Conditions</a>
                    </p>
                </blockquote>
                <hr />
                <h2 id="3-ネットワーク境界保護とデータプライバシー">
                    3. ネットワーク境界保護とデータプライバシー
                </h2>
                <h3 id="31-vpc-service-controlsvpc-scエージェント基盤での適用範囲を正確に理解する">
                    3.1 VPC Service Controls（VPC-SC）：エージェント基盤での適用範囲を正確に理解する
                </h3>
                <p>
                    VPC-SCは、Google Cloud
                    APIレベルでのデータ流出（exfiltration）を防ぐためのサービス境界（Service
                    Perimeter）機構です。エージェント基盤においては、<strong>「どのAPIがVPC-SCに対応しているか」を正確に把握すること</strong>が試験対策上非常に重要です。誤った一般化（「エージェント関連はすべてVPC-SCで守れる」）は典型的な誤答パターンになります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">コンポーネント</th>
                                <th scope="col">VPC-SC対応状況</th>
                                <th scope="col">備考</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    <strong>Agent Identity API</strong>&lt;br/&gt;（<code>agentidentity.googleapis.com</code>）
                                </td>
                                <td>○ 対応</td>
                                <td>
                                    サービス境界に追加してAPIアクセスを制御可能。境界内のクライアントは
                                    Restricted
                                    VIP（<code>restricted.googleapis.com</code>）経由でアクセスする必要がある
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <strong>Agent Identity Credentials API</strong>&lt;br/&gt;（<code>agentidentitycredentials.googleapis.com</code>）
                                </td>
                                <td>○ 対応</td>
                                <td>同上</td>
                            </tr>
                            <tr className="odd">
                                <td><strong>Agent Identity の Ingress/Egressルール</strong></td>
                                <td>○ 対応</td>
                                <td>
                                    エージェントIDをプリンシパルとして ingress/egress
                                    ルールに指定し、境界で保護されたリソースへのアクセスを許可できる
                                </td>
                            </tr>
                            <tr className="even">
                                <td>
                                    <strong>RAG Engine / Agent Retrieval（Vector Search 2.0）</strong>
                                </td>
                                <td>○ 対応（CMEK経由の暗号化と合わせて利用）</td>
                                <td>
                                    データそのものの保護はCMEKが担い、境界保護はVPC-SCが担うという役割分担
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>Agent Gateway</strong></td>
                                <td><strong>× 非対応</strong></td>
                                <td>
                                    公式ドキュメントで明記された既知の制限。VPC-SCで宛先を絞り込むことはできないため、代わりに<strong>カスタム組織ポリシー制約</strong>でエージェントとゲートウェイのバインディングを制限する（承認済みのAgent
                                    Gatewayのみに制限する）運用が推奨される
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>Semantic Governance Policy</strong></td>
                                <td><strong>× 非対応</strong>（プレビュー機能）</td>
                                <td>
                                    ポリシーエンジン自体はVPCネットワーク内にプロビジョニングするが、VPC-SCの境界保護機構そのものには対応していない
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    この「Agent
                    GatewayはVPC-SCに対応しない」という制限は、試験でも狙われやすいポイントです。正しい代替策は、<strong>組織ポリシーのカスタム制約で「承認済みのAgent
                        Gatewayとしかバインドできない」ように制限する</strong>ことであり、VPC-SCの境界にAgent Gatewayを組み込もうとする設計は誤りです。
                </p>
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            Agent GatewayをVPC Service
                            Controlsの境界に含めようとしないでください。宛先を絞り込みたい場合は、組織ポリシーのカスタム制約で「承認済みのAgent
                            Gatewayとしかバインドできない」ように制限するのが、現時点で唯一の正しい代替策です。
                        </p>
                    </div>
                </div>
                <h3 id="32-cmek顧客管理暗号鍵どこで何を暗号化できるか">
                    3.2 CMEK（顧客管理暗号鍵）：どこで、何を暗号化できるか
                </h3>
                <p>
                    Cloud
                    KMSで管理する顧客管理暗号鍵（CMEK）は、Google管理鍵をユーザー管理の鍵に置き換えることで、鍵のローテーション・失効・監査をユーザー側が完全にコントロールできるようにする仕組みです。エージェント基盤では次の対象がCMEKに対応します。
                </p>
                <ul>
                    <li>
                        <strong>RAG Engine</strong>：コーパス（グラウンディングデータ）の保管をCMEKで暗号化。ただし<strong>CMEKに対応するのは Spanner モードの
                            <code>RagManagedDb</code> のみ</strong>であり、<code>RagManagedVertexVectorSearch</code>（Serverless
                        モードの既定のベクトルDB）と <code>VertexVectorSearch</code>（自前の Vector
                        Search インデックスを持ち込む構成）は <strong>CMEK 非対応</strong>。CMEK
                        が要件なら Spanner モード + <code>RagManagedDb</code> を選ぶ
                    </li>
                    <li>
                        <strong>Agent Retrieval（旧 Vector Search 2.0）</strong>：Collection/Data
                        Objectの保管をCMEKで暗号化
                    </li>
                    <li>
                        <strong>Vector Search 1.0</strong>：インデックスデータの暗号化は<strong>Google管理暗号化のみ対応（CMEK非対応）</strong>
                    </li>
                </ul>
                <p>
                    これにより、「エージェントが参照するグラウンディングデータ（社内ナレッジベース）を、組織のセキュリティポリシー上、Google管理鍵ではなく自社管理の鍵で暗号化したい」という金融・医療業界などのエンタープライズ要件に応えられます。
                </p>
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            CMEKが必須要件になる規制業種では、RAG
                            EngineをSpannerモード（<code>RagManagedDb</code>）で構築してください。Serverlessモードの既定DBや、自前のVector
                            Searchインデックスを持ち込む構成ではCMEKを適用できません。
                        </p>
                    </div>
                </div>
                <h3 id="33-sensitive-data-protection旧-cloud-dlpと-model-armor-の統合">
                    3.3 Sensitive Data Protection（旧 Cloud DLP）と Model Armor の統合
                </h3>
                <p>
                    Sensitive Data Protection
                    は、150種類以上のinfoType（クレジットカード番号、SSN、メールアドレス、Google
                    Cloud認証情報など）を検出・分類・匿名化するサービスです。エージェント基盤における最大の特徴は、<strong>単体で使うのではなく Model Armor に統合される形で使われる</strong>点です（詳細は4章）。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">検出レベル</th>
                                <th scope="col">対応するinfoType例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Basic SDP</td>
                                <td>
                                    クレジットカード番号、米国SSN、金融口座番号、米国ITIN、Google
                                    Cloud認証情報、Google Cloud APIキー
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Advanced SDP（カスタムInspectテンプレート）</td>
                                <td>
                                    汎用パスワード、Google以外のAPIキー、組織独自のシークレット形式、カスタムメタデータラベルinfoType（リッチドキュメントのメタデータラベルに基づくサニタイズ）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="34-データ保護の全体像">3.4 データ保護の全体像</h3>
                <Diagram id="diag-4" ariaLabel="エージェント基盤におけるデータ保護とネットワーク境界多層防御アーキテクチャ" />
                <h3 id="35-private-service-connectpscによる閉域網連携">
                    3.5 Private Service Connect（PSC）による閉域網連携
                </h3>
                <p>
                    Vector Search（1.0系）は、パブリックエンドポイント・Private Service
                    Connect（推奨）・Private Services
                    Access（VPCピアリング）の3方式でデプロイ・クエリが可能です。PSCは、コンシューマ側のVPCとGoogleが管理するプロデューサ側サービスとの間を、パブリックIPを経由せずに接続する仕組みで、金融機関などパブリックエンドポイントを許容できない環境で標準的に使われます。Agent
                    Runtime
                    側にもPSCインターフェースが用意されており、エージェントの実行環境自体をプライベートネットワークに閉じ込めることができます。
                </p>
                <blockquote className="source-note">
                    <p>
                        <strong>出典：</strong>{' '} <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview">Agent Identity overview（VPC Service Controls節）</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview">Agent Gateway overview（Limitations節）</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview">Semantic governance policies overview</a>、<a href="https://cloud.google.com/security/products/model-armor">Model Armor</a>
                    </p>
                </blockquote>
                <hr />
                <h2 id="4-エージェントのガードレール安全性フィルタポリシー執行">
                    4. エージェントのガードレール・安全性フィルタ・ポリシー執行
                </h2>
                <p>
                    エージェントの「実行時の安全性」は、単一の製品ではなく<strong>複数のレイヤーが重ね合わさった多層防御</strong>（Layered
                    Governance）として設計されます。この節では、Model
                    Armor（コンテンツレベルの防御）、Semantic Governance
                    Policy（意図レベルの防御）、Human-in-the-Loop（人間による最終防御）の3層を扱います。
                </p>
                <h3 id="41-model-armorコンテンツレベルのランタイム防御">
                    4.1 Model Armor：コンテンツレベルのランタイム防御
                </h3>
                <p>
                    Model Armor
                    は、プロンプトとレスポンスの両方をリアルタイムでスキャンする「AIファイアウォール」です。あらゆるLLM（Gemini、Claude、Llamaなど）をREST
                    API経由で保護できるモデル非依存の設計になっています。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">検出カテゴリ</th>
                                <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>
                                    <strong>プロンプトインジェクション/ジェイルブレイク検知</strong>
                                </td>
                                <td>
                                    直接的・間接的なインジェクション、ジェイルブレイク試行を検知。検知フィルタはバッファ（非ストリーミング）モードで最大65,536トークン（262,144文字）までのプロンプト/レスポンスに対応（リアルタイムのストリーミングモードはトークン数の上限なし）
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>悪意のあるURL検知</strong></td>
                                <td>
                                    プロンプト・レスポンスに埋め込まれたフィッシングリンクやマルウェア配布URLを検知
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>Responsible AI（RAI）コンテンツフィルタ</strong></td>
                                <td>
                                    ヘイトスピーチ、ハラスメント、性的表現、危険なコンテンツなどを閾値ベースで検出
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>Sensitive Data Protection連携</strong></td>
                                <td>
                                    Basic/Advanced
                                    SDPと統合し、PII・金融情報・認証情報などの漏洩を防止
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>マルウェア/文書スキャン</strong></td>
                                <td>
                                    PDFやOfficeファイルなど、リッチドキュメント経由の悪意あるコンテンツも検査対象にできる
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    <strong>Floor Settings（フロア設定）と Template（テンプレート）</strong>{' '}という2つの構成単位を理解することが重要です。
                </p>
                <ul>
                    <li>
                        <strong>Floor Settings</strong>：組織・フォルダ・プロジェクトレベルで設定する「譲れない最低ライン」のベースライン設定。配下のすべてのテンプレートはこのフロア設定を満たす必要がある。Google管理MCPサーバーとVertex
                        AI（Gemini呼び出し）向けのフロア設定は現在プレビュー機能として提供されている。
                    </li>
                    <li>
                        <strong>Template</strong>：個々のアプリケーション（エージェント）向けに作成する、より厳格な検出設定。「Inspect
                        and block」（違反をブロック）と「Inspect
                        only」（違反をログのみ記録）の2つの執行モードを選択できる。
                    </li>
                </ul>
                <Diagram id="diag-5" ariaLabel="Model Armor によるユーザー入力・ツール出力のインライン検査とサニタイズフロー" />
                <p>
                    Agent Gateway との統合では、Model Armor は「AI security
                    guardrails」として、MCPプロンプトインジェクション攻撃などの新しいリスクからエージェント間通信を保護する役割を担います。Client-to-Agent（受信するクライアントからの有害コンテンツ対策）とAgent-to-Anywhere（送信先への機密データ漏洩・インジェクション対策）の両方向で設定可能です。
                </p>
                <p>
                    ただし、<strong>Model Armor
                        が両方向のすべてのペイロードを検査するわけではありません</strong>。検査対象は次のとおりで、対象外の経路は Model Armor
                    では防御できないため、別の統制（IAM / PAB、Semantic Governance
                    Policy、監査ログ）で補う必要があります。ただし{' '}<strong>IAM / PAB・Semantic Governance
                        Policy・監査ログはいずれもコンテンツサニタイズの代替にはなりません</strong>（それぞれ到達可能な相手の制限、意図レベルの判定、事後追跡であり、ペイロード内の有害コンテンツや機密データそのものを検査するものではありません）。対象外の経路については、アプリケーション側での内容検査、または対応する検査統合（Model
                    Armor の Sanitize API 直接呼び出しなど）を別途組み込む必要があります。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">方向・プロトコル</th>
                                <th scope="col">適用プロトコル</th>
                                <th scope="col">検査対象</th>
                                <th scope="col">検査対象外</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>Client-to-Agent（ADK のみ）</td>
                                <td>ADK（Vertex AI Agent Runtime）</td>
                                <td>
                                    <code>reasoningEngines.streamQuery</code>
                                    のリクエスト/レスポンス（ADK製・Agent Runtime
                                    上のエージェントのみ）
                                </td>
                                <td>
                                    それ以外の ReasoningEngine ペイロード、ReasoningEngine
                                    のエラーレスポンス、非ADK（LangChain 等）のペイロード
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Agent-to-Anywhere（MCP）</td>
                                <td>MCP（Model Context Protocol）</td>
                                <td>
                                    <code>tools/call</code> と
                                    <code>prompts/get</code>
                                    のリクエスト/レスポンス、MCPツール実行エラー
                                </td>
                                <td>
                                    <code>tools/list</code>、<code>resources/*</code>、<code>notifications/*</code>、MCP
                                    の Streamable
                                    HTTP/SSE、（ツール実行エラー以外の）MCPプロトコルエラー
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>Agent-to-Anywhere（OpenAI互換）</td>
                                <td>
                                    OpenAI API互換エンドポイント（例：Vertex AI OpenAI互換 API）
                                </td>
                                <td>
                                    Chat Completions の
                                    Create・Delete・Get・List・Update（非ストリーミングのみ）、Get
                                    chat messages、Responses の
                                    Create・Get・Delete（非ストリーミングのみ）、Legacy
                                    Completions、Legacy Assistants の
                                    Create・Delete・List・Modify・Retrieve、Legacy Messages の
                                    Create・Delete・List・Modify・Retrieve、Legacy Threads の
                                    Create・Delete・Modify・Retrieve、Embeddings の Create、OpenAI
                                    API エラー
                                </td>
                                <td>
                                    ストリーミングレスポンス（<code>stream: true</code>）、ファイルアップロード・画像生成・モデレーション・その他の非テキスト生成エンドポイント。<strong>上記に列挙されていないペイロードはサニタイズされずに通過します</strong>
                                </td>
                            </tr>
                            <tr className="even">
                                <td>Agent-to-Anywhere（A2A）</td>
                                <td>A2A（Agent-to-Agent）プロトコル</td>
                                <td>
                                    Send Message 操作、Agent Card、Get Extended Agent Card
                                    操作、および JSON-RPC・HTTP+JSON/REST プロトコルバインディング
                                </td>
                                <td>
                                    ストリーミングメッセージ（<code>SendStreamingMessage</code>）、<code>GetTask</code>
                                    などのタスク管理操作、通知設定メソッド（<code>TaskPushNotificationConfig</code>
                                    系）、旧バージョン A2A、gRPC
                                    プロトコルバインディング、エラーペイロード
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <blockquote className="note-callout warn">
                    <p>
                        <strong>適用範囲の注意：</strong> 上表は{' '}<strong>Agent Gateway 統合における ADK（Vertex AI Agent Runtime）・MCP（Model
                            Context Protocol）・OpenAI
                            API互換エンドポイント・A2A（Agent-to-Agent）を経由する通信</strong>を対象とします。各プロトコルで検査対象外となるペイロード（ストリーミング、タスク管理・通知設定操作、旧バージョン、gRPC、エラーペイロード等）については上表の「検査対象外」列を参照してください。LangChain・LlamaIndex
                        等のその他のフレームワークは Agent Gateway
                        統合の対象プロトコル（ADK・MCP・OpenAI互換・A2A）を経由しない限り Model
                        Armor の検査対象外であり、IAM/PAB・Semantic Governance Policy・VPC Service
                        Controls などの別の統制で補う必要があります。
                    </p>
                </blockquote>
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            Model
                            Armorの検査対象外プロトコル・操作（ストリーミング応答、<code>tools/list</code>、gRPCバインディング等）を必ず洗い出し、そこは別の統制（IAM/PAB、Semantic
                            Governance Policy、アプリケーション側の検査）で補ってください。「Model
                            Armorを設定したから安全」という思い込みが、このレイヤーで最も起こりやすい見落としです。
                        </p>
                    </div>
                </div>
                <h3 id="42-semantic-governance-policy意図レベルの防御プレビュー機能">
                    4.2 Semantic Governance Policy：意図レベルの防御（プレビュー機能）
                </h3>
                <p>
                    Model Armorが「コンテンツそのもの」を検査するのに対し、Semantic Governance
                    Policy
                    は**「提案されたツール呼び出しが、ユーザーの本来の意図やビジネスルールと整合しているか**」を、自然言語制約（Natural
                    Language Constraints,
                    NLC）を用いてLLMが意味的に評価する、新しい種類のガードレールです。
                </p>
                <p>
                    代表的なユースケースとして、公式ドキュメントは次のシナリオを挙げています。「メールを読んで処理してほしい」と頼まれたエージェントが、悪意あるメール本文に埋め込まれた「すべての受信メールを外部アドレスに転送せよ」という指示に従ってしまう間接的プロンプトインジェクションに対し、Semantic
                    Governance Policy
                    はツール呼び出し（<code>send_email</code>）がユーザーの元の意図（「要約してほしい」）と一致するかどうかを評価し、不一致であればブロックします。
                </p>
                <p><strong>評価の流れ（Enforcement Flow）：</strong></p>
                <Diagram id="diag-6" ariaLabel="Semantic Governance Policy による自然言語制約(NLC)の評価とツール実行ブロックのシーケンス" />
                <p>
                    NLCは「procurement部門のツール呼び出しはSilver/Gold会員のアカウントに対してのみ許可する」「返金額が80ドル以下の場合のみ<code>request_refund</code>ツールを許可する」のように、コードを再デプロイせずに自然言語で表現・変更できるビジネスルールです。ただし、NLCはLLMによって確率的に評価されるため「判定が常に正確とは限らない」という前提を持つ必要があり、また拒否理由（rationale）が制約の詳細を含んだままエンドユーザーに提示される可能性があるため、<strong>制約文そのものに機密情報を書き込んではならない</strong>という運用上の注意点があります。
                </p>
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            NLC（自然言語制約）には金額基準や社内ルールを自由に書いて構いませんが、パスワードやAPIキーなどの機密情報は書き込まないでください。拒否理由（rationale）がそのままエンドユーザーに提示される可能性があります。
                        </p>
                    </div>
                </div>
                <h3 id="43-多層防御の全体像layered-governance">
                    4.3 多層防御の全体像（Layered Governance）
                </h3>
                <p>
                    Semantic Governance
                    Policyは他の統制を「置き換える」のではなく「補完する」ものである、という位置付けが公式に強調されています。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">統制レイヤー</th>
                                <th scope="col">実現メカニズム</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>認証</td>
                                <td>Identity-Aware Proxy、Apigee などのID対応ゲートウェイ</td>
                            </tr>
                            <tr className="even">
                                <td>Ingress側のRBAC</td>
                                <td>ロールベースアクセス制御（例：調達部門のみアクセス可）</td>
                            </tr>
                            <tr className="odd">
                                <td>Ingress側のABAC</td>
                                <td>属性ベースアクセス制御（例：役職に応じた承認上限）</td>
                            </tr>
                            <tr className="even">
                                <td>レート制限</td>
                                <td>API Gateway、Apigee</td>
                            </tr>
                            <tr className="odd">
                                <td>プロンプトスキャン</td>
                                <td>
                                    Model Armor（PII、ヘイトスピーチ、プロンプトインジェクション）
                                </td>
                            </tr>
                            <tr className="even">
                                <td>レスポンススキャン</td>
                                <td>Model Armor（PII/PHIのマスキング）</td>
                            </tr>
                            <tr className="odd">
                                <td>Egress側のID制御</td>
                                <td>
                                    Agent
                                    Gatewayに対するIAM許可ポリシー（どのMCPサーバーにアクセスできるか）
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>ユーザー意図との整合性</strong></td>
                                <td><strong>Semantic Governance Policy</strong></td>
                            </tr>
                            <tr className="odd">
                                <td><strong>ビジネス制約の遵守</strong></td>
                                <td>
                                    <strong>Semantic Governance Policy</strong>（例：権限があっても信用情報照会を許可しない）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="44-human-in-the-loophitl高リスク操作の人間承認ゲート">
                    4.4 Human-in-the-Loop（HITL）：高リスク操作の人間承認ゲート
                </h3>
                <p>
                    SAIFの「Agent User
                    Control」の実装として、データ削除・送金・外部送信のような不可逆または高コストな操作には、エージェントが自律的に実行する前に人間の承認を挟む設計が推奨されます。実装パターンとしては次の2種類が代表的です。
                </p>
                <ol>
                    <li>
                        <strong>ハードストップ型承認</strong>：エージェントが提案を生成した時点で処理を一時停止し、人間が明示的に承認するまでツール呼び出しを実行しない（例：ADKのHITL拡張やカスタムのapproval
                        queueパターン）。
                    </li>
                    <li>
                        <strong>閾値ベースの自動判定＋エスカレーション</strong>：Semantic Governance
                        PolicyのNLCで金額やリスクレベルの閾値を定義する。NLCの責務は<strong>閾値に基づくポリシー判定結果（allow/block）を返すことのみ</strong>に限定され、Policy自体は承認キューを作成しない。閾値超過が判定された場合、<strong>アプリケーション側がその判定結果を受け取り、人間承認キュー（例：Pub/Sub
                            + 承認UI）へ送信する</strong>。人間が承認した後にのみツール呼び出しを実行する流れとなる。
                    </li>
                </ol>
                <blockquote className="note-callout warn">
                    <p>
                        <strong>注意：</strong> IAP の <code>DRY_RUN</code> モードは HITL
                        の実装パターンではありません。<code>DRY_RUN</code>{' '}は拒否対象となるリクエストを<strong>ログに記録したうえで通信自体は許可する</strong>モードであり、ポリシーを本番適用する前に業務影響を評価するための<strong>監査・段階導入の仕組み</strong>です。人間の承認を待たずに処理は進むため、高リスク操作のゲートには使えません。高リスク操作には承認キューなどの<strong>明示的な人間承認ゲート</strong>（上記1・2）を使ってください。
                    </p>
                </blockquote>
                <Diagram id="diag-7" ariaLabel="Human-in-the-Loop (HITL) におけるハードストップ型と閾値エスカレーション型の承認フロー" />
                <blockquote className="source-note">
                    <p>
                        <strong>出典：</strong>{' '} <a href="https://cloud.google.com/security/products/model-armor">Model Armor 製品ページ</a>、<a href="https://docs.cloud.google.com/model-armor/release-notes">Model Armor release notes</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview">Semantic governance policies overview</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview">Agent Gateway overview</a>、<a href="https://saif.google/focus-on-agents">SAIF: Focus on Agents（Agent User Control）</a>
                    </p>
                </blockquote>
                <hr />
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            IAPの<code>DRY_RUN</code>モードは「まず様子を見る」ための監査・段階導入の仕組みであり、承認ゲートではありません。高リスク操作を人間の承認なしに進ませたくない場合は、承認キューを使った明示的なHuman-in-the-Loopゲート（ハードストップ型
                            または 閾値エスカレーション型）を別途実装してください。
                        </p>
                    </div>
                </div>
                <h2 id="5-監査可観測性コンプライアンス">5. 監査・可観測性・コンプライアンス</h2>
                <p>
                    エージェントは自律的に行動するため、「何が起きたか」を事後的に完全に再構築できることが、セキュリティ運用とコンプライアンスの両面で必須になります。
                </p>
                <h3 id="51-agent-observability誰が何を誰に代わって行ったか">
                    5.1 Agent Observability：誰が・何を・誰に代わって行ったか
                </h3>
                <p>
                    Agent Gateway
                    は、すべてのエージェント間・エージェント〜ツール間通信について、ネットワーク層でのテレメトリを生成し、Cloud
                    Logging と Cloud Trace にエクスポートします。Agent Identity
                    と組み合わさることで、ログには次の情報が明確に記録されます。
                </p>
                <ul>
                    <li>エージェント自身のSPIFFE ID（誰が実行したか）</li>
                    <li>
                        エンドユーザーに代わって行動した場合は、エージェントIDとエンドユーザーIDの両方
                    </li>
                    <li>
                        Model
                        Armorのサニタイズ処理ログ（テンプレートの作成・更新などの管理アクティビティ、および実際のプロンプト/レスポンスへのサニタイズ実行ログ）
                    </li>
                    <li>Semantic Governance Policyの判定ログ（ALLOW/DENYの判定とその根拠）</li>
                </ul>
                <p>
                    これはSAIFの「Agent Observability」制御をGoogle
                    Cloudの実装に落とし込んだものであり、「エージェントの行動が透明で監査可能である」ことを、事後対応（インシデント調査）と事前防止（異常検知）の両方に活用します。
                </p>
                <h3 id="52-agent-anomaly-detection異常行動の継続的検知">
                    5.2 Agent Anomaly Detection：異常行動の継続的検知
                </h3>
                <p>
                    Agent Observabilityが「記録する」仕組みであるのに対し、Agent Anomaly
                    Detection（プレビュー機能）は、蓄積されたログをもとに<strong>能動的に異常を検知する</strong>仕組みです。3層のアーキテクチャで構成されます。
                </p>
                <ol>
                    <li>
                        <strong>Layer 1：軽量MLによる一次スクリーニング</strong> —
                        大量のトラフィックから統計的な外れ値を高速に抽出
                    </li>
                    <li>
                        <strong>Layer 2：異常分析</strong> — Layer
                        1で抽出された候補を、より高度なモデルで分析し誤検知を除去
                    </li>
                    <li>
                        <strong>Layer 3：呼び出しレベルの詳細分析</strong> —
                        個別のツール呼び出し単位まで掘り下げて根本原因を特定
                    </li>
                </ol>
                <p>
                    検知対象となる脅威カテゴリは、OWASP Top 10 for Agentic Security
                    Threatsに準拠する形で、Tool misuse（ツールの誤用）、Identity privilege
                    abuse（権限の悪用）、Agentic cascading failures（連鎖的な障害）、Rogue
                    agents（不正なエージェント）、Resource
                    exhaustion（リソース枯渇）の5種類に整理されています。
                </p>
                <Diagram id="diag-8" ariaLabel="Agent Anomaly Detection による3層監視とOWASP Top 10脅威カテゴリの検知アーキテクチャ" />
                <h3 id="53-コンプライアンスへの接続データ主権とログ保持">
                    5.3 コンプライアンスへの接続：データ主権とログ保持
                </h3>
                <p>
                    Google Cloud の技術的統制（Agent
                    Identity、CMEK、VPC-SC、監査ログ）は、それ自体が特定の規制へのコンプライアンスを保証するものではありませんが、代表的な規制が要求する統制要件にそのままマッピングできます。
                </p>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">規制・基準</th>
                                <th scope="col">主な要求事項</th>
                                <th scope="col">対応する技術的統制</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td><strong>EU AI Act</strong></td>
                                <td>
                                    高リスクAIシステムに対するログ保持、人間の監督（human
                                    oversight）、透明性の確保
                                </td>
                                <td>
                                    <strong>Request-Response Logging（Agent Observability）</strong>
                                    によるプロンプト/レスポンス本文の保管（Cloud Storage
                                    への出力、保存期間・アクセス制御はバケットポリシーで設定）。<strong>Cloud Audit Logs</strong>
                                    は管理操作（エージェント作成・設定変更等）を記録するものでありプロンプト/レスポンス本文は含まない（Data
                                    Access Audit Logs は必要に応じて別途有効化）。Human-in-the-Loop
                                    承認ゲート
                                </td>
                            </tr>
                            <tr className="even">
                                <td><strong>HIPAA</strong>（米国医療）</td>
                                <td>PHI（保護対象保健情報）の暗号化、アクセス制御、監査証跡</td>
                                <td>
                                    CMEK による暗号化、Sensitive Data Protection による PHI
                                    検出・マスキング、Cloud Audit Logs
                                </td>
                            </tr>
                            <tr className="odd">
                                <td><strong>PCI-DSS</strong>（決済カード業界）</td>
                                <td>カード会員データの保護、アクセス制御の最小化、定期的な監査</td>
                                <td>
                                    Model Armor の Sensitive Data Protection
                                    連携（カード番号検出）、PAB による権限の外枠制限、Cloud Audit
                                    Logs
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <p>
                    データ主権（Data Residency）の観点では、Model
                    Armor自体のリージョン展開（例：<code>asia-south1</code>、<code>asia-southeast1</code>、<code>australia-southeast2</code>{' '}など）を、エージェントが処理するデータの所在地要件に合わせて選択する必要があります。また、RAG
                    Engine・Agent Retrieval の CMEK
                    設定は、鍵の保管場所（リージョン）をデータの保管場所と一致させるという基本原則も忘れてはいけません。
                </p>
                <blockquote className="source-note">
                    <p>
                        <strong>出典：</strong>{' '} <a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview">Agent Gateway overview（Agent Observability節）</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-anomalies-overview">Agent Anomaly Detection overview</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/view-security-findings">View security findings</a>、<a href="https://docs.cloud.google.com/model-armor/release-notes">Model Armor release notes（リージョン展開）</a>
                    </p>
                </blockquote>
                <hr />
                <div className="callout-practice">
                    <div className="icon">✓ </div>
                    <div className="body">
                        <div className="label">ベストプラクティス </div>
                        <p>
                            EU AI Actのログ保持要件に対応する際は、Cloud Audit
                            Logs（管理操作の記録）とRequest-Response
                            Logging（プロンプト/レスポンス本文の記録）を混同しないでください。本文そのものの保存が必要なら、Agent
                            ObservabilityのRequest-Response
                            Loggingを明示的に有効化する必要があります。
                        </p>
                    </div>
                </div>
                <h2 id="6-試験対策頻出アンチパターンと意思決定フローチャート">
                    6. 試験対策：頻出アンチパターンと意思決定フローチャート
                </h2>
                <h3 id="61-アンチパターンと正解パターンの対比">
                    6.1 アンチパターンと正解パターンの対比
                </h3>
                <div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">#</th>
                                <th scope="col">アンチパターン</th>
                                <th scope="col">なぜ危険か</th>
                                <th scope="col">正解パターン</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>1</td>
                                <td>
                                    サービスアカウントキー（JSONファイル）をエージェントのコンテナイメージにハードコードする
                                </td>
                                <td>
                                    キー漏洩時に無期限で悪用可能。監査でも「誰が使ったか」が曖昧になる
                                </td>
                                <td>
                                    Agent Identity のSPIFFE ID +
                                    自動更新X.509証明書を使用し、長期キーの発行自体を回避する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>2</td>
                                <td>
                                    エージェントに
                                    <code>roles/editor</code> のような広範なロールを付与する
                                </td>
                                <td>
                                    最小権限の原則に反し、プロンプトインジェクションによる被害範囲（blast
                                    radius）が最大化する
                                </td>
                                <td>
                                    必要なリソースへの最小ロールを付与し、さらに PAB
                                    でアクセス可能なリソースの外枠自体を制限する
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>3</td>
                                <td>
                                    Agent Gateway をVPC Service
                                    Controlsの境界内に配置し、境界だけで宛先制御できると想定する
                                </td>
                                <td>Agent Gateway は VPC-SC 非対応という既知の制限がある</td>
                                <td>
                                    カスタム組織ポリシー制約で「承認済みAgent
                                    Gatewayとのみバインド可能」に制限する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>4</td>
                                <td>
                                    外部SaaS連携（サードパーティMCPサーバーなど）を、Agent
                                    Registryに登録せず、暗黙的に許可されると想定する
                                </td>
                                <td>
                                    未登録の宛先へのegressはIAPで拒否されるのが既定動作。逆に、拒否されない設定ミスがあれば統制の空白点になる
                                </td>
                                <td>
                                    宛先を必ず Agent Registry に登録し、<code>iap.resources.egressViaIAP</code>{' '}権限を明示的に付与してスコープを絞る
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>5</td>
                                <td>
                                    「返金は担当者の裁量で」といった業務ルールを、システムプロンプトの自然文だけに書いて安全だと考える
                                </td>
                                <td>
                                    システムプロンプトは間接的プロンプトインジェクションで上書き・無視され得る
                                </td>
                                <td>
                                    金額閾値などのビジネスルールは Semantic Governance Policy の NLC
                                    として、モデル呼び出しの外側（Agent Gateway層）で強制する
                                </td>
                            </tr>
                            <tr className="even">
                                <td>6</td>
                                <td>
                                    Model Armor
                                    のテンプレートだけをプロジェクトごとに個別設定し、組織共通のフロア設定を省略する
                                </td>
                                <td>
                                    プロジェクトごとに検出基準がバラバラになり、最低限のガードレールが担保されない部門が生まれる
                                </td>
                                <td>
                                    組織/フォルダレベルで Floor Settings
                                    を設定し、プロジェクトのテンプレートがそれを下回れないようにする
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>7</td>
                                <td>
                                    高リスク操作（送金・削除・外部送信）も含め、エージェントに完全な自律実行を許可する
                                </td>
                                <td>Rogue Actions のリスクが実世界の損害に直結する</td>
                                <td>
                                    SAIFの Agent User Control に従い、高リスク操作には
                                    Human-in-the-Loop の承認ゲートを設ける
                                </td>
                            </tr>
                            <tr className="even">
                                <td>8</td>
                                <td>
                                    RAGのグラウンディングデータをGoogle管理鍵のまま本番運用し、規制業種の鍵管理要件を満たしていると誤認する
                                </td>
                                <td>
                                    Google管理鍵はユーザー側でのローテーション・失効制御ができない
                                </td>
                                <td>
                                    RAG Engine / Agent Retrieval で CMEK を有効化し、Cloud KMS
                                    の鍵ポリシーで管理する。ただし
                                    <strong>RAG Engine で CMEK を適用できるのは Spanner モードの
                                        <code>RagManagedDb</code> のみ</strong>
                                    であり、Serverless
                                    モード・<code>RagManagedVertexVectorSearch</code>・<code>VertexVectorSearch</code>
                                    には CMEK を適用できない（CMEK が要件なら Spanner
                                    モードを選択する）
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <h3 id="62-シナリオ問題の解き方意思決定フローチャート">
                    6.2 シナリオ問題の解き方：意思決定フローチャート
                </h3>
                <p>
                    試験のシナリオ問題は「〇〇を守りたい場合、どのサービスを設定すべきか」という形式が中心です。以下のフローで一次切り分けができます。
                </p>
                <Diagram id="diag-9" ariaLabel="試験シナリオ問題におけるセキュリティ統制選定の意思決定フローチャート" />
                <h3 id="63-試験対象ツールセクション5関連チェックリスト">
                    6.3 試験対象ツール（セクション5関連）チェックリスト
                </h3>
                <div className="checklist-card">
                    <div className="checklist-header">
                        <span className="title">学習チェックリスト</span><span className="count">{checkedCount} / {totalChecklist} 完了</span>
                    </div>
                    <ul>
                        <li>
                            <input id="chk1" type="checkbox" checked={Boolean(checkedItems['chk1'])} onChange={() => handleCheckChange('chk1')} /><label htmlFor="chk1">Agent Development Kit（ADK）</label>
                        </li>
                        <li>
                            <input id="chk2" type="checkbox" checked={Boolean(checkedItems['chk2'])} onChange={() => handleCheckChange('chk2')} /><label htmlFor="chk2">Agent evaluation</label>
                        </li>
                        <li>
                            <input id="chk3" type="checkbox" checked={Boolean(checkedItems['chk3'])} onChange={() => handleCheckChange('chk3')} /><label htmlFor="chk3">Agent Gateway</label>
                        </li>
                        <li>
                            <input id="chk4" type="checkbox" checked={Boolean(checkedItems['chk4'])} onChange={() => handleCheckChange('chk4')} /><label htmlFor="chk4">Agent Identity</label>
                        </li>
                        <li>
                            <input id="chk5" type="checkbox" checked={Boolean(checkedItems['chk5'])} onChange={() => handleCheckChange('chk5')} /><label htmlFor="chk5">Agent Registry</label>
                        </li>
                        <li>
                            <input id="chk6" type="checkbox" checked={Boolean(checkedItems['chk6'])} onChange={() => handleCheckChange('chk6')} /><label htmlFor="chk6">Agent Retrieval / Vector Search 1.0</label>
                        </li>
                        <li>
                            <input id="chk7" type="checkbox" checked={Boolean(checkedItems['chk7'])} onChange={() => handleCheckChange('chk7')} /><label htmlFor="chk7">Agent Runtime（旧 Agent Engine）</label>
                        </li>
                        <li>
                            <input id="chk8" type="checkbox" checked={Boolean(checkedItems['chk8'])} onChange={() => handleCheckChange('chk8')} /><label htmlFor="chk8">Agent Search（旧 Vertex AI Search）</label>
                        </li>
                        <li>
                            <input id="chk9" type="checkbox" checked={Boolean(checkedItems['chk9'])} onChange={() => handleCheckChange('chk9')} /><label htmlFor="chk9">Agentic protocols（A2A、MCP）</label>
                        </li>
                        <li>
                            <input id="chk10" type="checkbox" checked={Boolean(checkedItems['chk10'])} onChange={() => handleCheckChange('chk10')} /><label htmlFor="chk10">Agents CLI in Agent Platform</label>
                        </li>
                        <li>
                            <input id="chk11" type="checkbox" checked={Boolean(checkedItems['chk11'])} onChange={() => handleCheckChange('chk11')} /><label htmlFor="chk11">Antigravity（CLI、SDK、App）</label>
                        </li>
                        <li>
                            <input id="chk12" type="checkbox" checked={Boolean(checkedItems['chk12'])} onChange={() => handleCheckChange('chk12')} /><label htmlFor="chk12">Auth Manager（OAuth 2.0）</label>
                        </li>
                        <li>
                            <input id="chk13" type="checkbox" checked={Boolean(checkedItems['chk13'])} onChange={() => handleCheckChange('chk13')} /><label htmlFor="chk13">Google Cloud Observability（Cloud Logging、Cloud Trace）</label>
                        </li>
                        <li>
                            <input id="chk14" type="checkbox" checked={Boolean(checkedItems['chk14'])} onChange={() => handleCheckChange('chk14')} /><label htmlFor="chk14">Model Armor</label>
                        </li>
                        <li>
                            <input id="chk15" type="checkbox" checked={Boolean(checkedItems['chk15'])} onChange={() => handleCheckChange('chk15')} /><label htmlFor="chk15">Model Context Protocol（MCP）servers</label>
                        </li>
                        <li>
                            <input id="chk16" type="checkbox" checked={Boolean(checkedItems['chk16'])} onChange={() => handleCheckChange('chk16')} /><label htmlFor="chk16">Sensitive Data Protection</label>
                        </li>
                        <li>
                            <input id="chk17" type="checkbox" checked={Boolean(checkedItems['chk17'])} onChange={() => handleCheckChange('chk17')} /><label htmlFor="chk17">Skill Registry</label>
                        </li>
                    </ul>
                </div>
                <blockquote className="source-note">
                    <p>
                        <strong>出典：</strong>{' '} <a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf">公式Exam Guide PDF（試験対象ツール一覧）</a>、<a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview">Agent Gateway overview（Limitations節）</a>
                    </p>
                </blockquote>
                <hr />
                <h2 id="7-参考リソース公式ドキュメント一覧">
                    7. 参考リソース・公式ドキュメント一覧
                </h2>
                <h3 id="試験概要公式ガイド">試験概要・公式ガイド</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref1">
                        <div className="num">1</div>
                        <div className="txt">
                            Professional Agentic Architect 認定試験概要<br /><a href="https://cloud.google.com/learn/certification/agentic-architect" target="_blank" rel="noopener">https://cloud.google.com/learn/certification/agentic-architect</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref2">
                        <div className="num">2</div>
                        <div className="txt">
                            公式 Exam Guide PDF<br /><a href="https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf" target="_blank" rel="noopener">https://services.google.com/fh/files/misc/professional_agentic_architect_exam_guide_english.pdf</a>
                        </div>
                    </div>
                </div>
                <h3 id="secure-ai-frameworksaif脅威モデル">
                    Secure AI Framework（SAIF）・脅威モデル
                </h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref3">
                        <div className="num">3</div>
                        <div className="txt">
                            SAIF: Google's Guide to Secure AI（トップページ）<br /><a href="https://saif.google/" target="_blank" rel="noopener">https://saif.google/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref4">
                        <div className="num">4</div>
                        <div className="txt">
                            SAIF: Focus on Agents（エージェント特有のリスクと制御）<br /><a href="https://saif.google/focus-on-agents" target="_blank" rel="noopener">https://saif.google/focus-on-agents</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref5">
                        <div className="num">5</div>
                        <div className="txt">
                            SAIF: Why SAIF<br /><a href="https://saif.google/why-saif" target="_blank" rel="noopener">https://saif.google/why-saif</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref6">
                        <div className="num">6</div>
                        <div className="txt">
                            OWASP Top 10 for Agentic Applications 2026<br /><a href="https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/" target="_blank" rel="noopener">https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref7">
                        <div className="num">7</div>
                        <div className="txt">
                            OWASP Top 10 for Agentic Applications：詳細解説（Promptfoo）<br /><a href="https://www.promptfoo.dev/docs/red-team/owasp-agentic-ai" target="_blank" rel="noopener">https://www.promptfoo.dev/docs/red-team/owasp-agentic-ai</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref8">
                        <div className="num">8</div>
                        <div className="txt">
                            OWASP Top 10 for LLM Applications 2025 解説<br /><a href="https://aembit.io/blog/owasp-top-10-llm-risks-explained/" target="_blank" rel="noopener">https://aembit.io/blog/owasp-top-10-llm-risks-explained/</a>
                        </div>
                    </div>
                </div>
                <h3 id="agent-identity認証アクセス制御">Agent Identity・認証・アクセス制御</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref9">
                        <div className="num">9</div>
                        <div className="txt">
                            Agent Identity overview<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-identity-overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref10">
                        <div className="num">10</div>
                        <div className="txt">
                            IAM overview<br /><a href="https://docs.cloud.google.com/iam/docs/overview" target="_blank" rel="noopener">https://docs.cloud.google.com/iam/docs/overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref11">
                        <div className="num">11</div>
                        <div className="txt">
                            IAM policy types（Principal Access Boundary）<br /><a href="https://docs.cloud.google.com/iam/docs/policy-types" target="_blank" rel="noopener">https://docs.cloud.google.com/iam/docs/policy-types</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref12">
                        <div className="num">12</div>
                        <div className="txt">
                            Create and apply principal access boundary policies<br /><a href="https://cloud.google.com/iam/docs/principal-access-boundary-policies-create" target="_blank" rel="noopener">https://cloud.google.com/iam/docs/principal-access-boundary-policies-create</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref13">
                        <div className="num">13</div>
                        <div className="txt">
                            Control access to sessions with IAM Conditions<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/scale/sessions/iam-conditions</a>
                        </div>
                    </div>
                </div>
                <h3 id="agent-gatewayネットワーク境界データ保護">
                    Agent Gateway・ネットワーク境界・データ保護
                </h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref14">
                        <div className="num">14</div>
                        <div className="txt">
                            Agent Gateway overview<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/agent-gateway-overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref15">
                        <div className="num">15</div>
                        <div className="txt">
                            Set up an Agent Gateway<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/gateways/set-up-agent-gateway</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref16">
                        <div className="num">16</div>
                        <div className="txt">
                            Govern your agents（4つの統治の柱）<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref17">
                        <div className="num">17</div>
                        <div className="txt">
                            Agent Registry<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-registry" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/agent-registry</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref18">
                        <div className="num">18</div>
                        <div className="txt">
                            Codelab: Govern agentic workloads with Agent Platform<br /><a href="https://codelabs.developers.google.com/cloudnet-agent-gateway" target="_blank" rel="noopener">https://codelabs.developers.google.com/cloudnet-agent-gateway</a>
                        </div>
                    </div>
                </div>
                <h3 id="model-armorsemantic-governanceガードレール">
                    Model Armor・Semantic Governance・ガードレール
                </h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref19">
                        <div className="num">19</div>
                        <div className="txt">
                            Model Armor 製品ページ<br /><a href="https://cloud.google.com/security/products/model-armor" target="_blank" rel="noopener">https://cloud.google.com/security/products/model-armor</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref20">
                        <div className="num">20</div>
                        <div className="txt">
                            Model Armor release notes<br /><a href="https://docs.cloud.google.com/model-armor/release-notes" target="_blank" rel="noopener">https://docs.cloud.google.com/model-armor/release-notes</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref21">
                        <div className="num">21</div>
                        <div className="txt">
                            Semantic governance policies overview<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/policies/semantic-governance-overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref22">
                        <div className="num">22</div>
                        <div className="txt">
                            Building a secure agent system with Model Armor（Codelab）<br /><a href="https://codelabs.developers.google.com/secure-agent-modelarmor" target="_blank" rel="noopener">https://codelabs.developers.google.com/secure-agent-modelarmor</a>
                        </div>
                    </div>
                </div>
                <h3 id="監査可観測性コンプライアンス">監査・可観測性・コンプライアンス</h3>
                <div className="ref-grid">
                    <div className="ref-card" id="ref23">
                        <div className="num">23</div>
                        <div className="txt">
                            Agent Anomaly Detection overview<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-anomalies-overview" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/agent-anomalies-overview</a>
                        </div>
                    </div>
                    <div className="ref-card" id="ref24">
                        <div className="num">24</div>
                        <div className="txt">
                            View security findings<br /><a href="https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/view-security-findings" target="_blank" rel="noopener">https://docs.cloud.google.com/gemini-enterprise-agent-platform/govern/view-security-findings</a>
                        </div>
                    </div>
                </div>
            
                </main>
            </div>
        </div>
    );
}
