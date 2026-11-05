'use client';

import { Children, isValidElement, useId, useState, type ReactNode } from 'react';

/** 演習問題の選択肢を描画し、選択した回答の正誤を表示する。 */
function PracticeOptions({ correctAnswer, children }: { correctAnswer: string; children: ReactNode }) {
    const [selected, setSelected] = useState<string | null>(null);
    const feedbackId = useId();

    return (
        <div className="practice-options">
            {Children.toArray(children).filter(isValidElement).map((option, index) => {
                const letter = String.fromCharCode(65 + index);
                const result = selected === null ? undefined : letter === correctAnswer ? 'correct' : letter === selected ? 'incorrect' : undefined;

                return (
                    <button
                        key={letter}
                        type="button"
                        className="practice-option"
                        aria-pressed={selected === letter}
                        aria-describedby={selected === letter ? feedbackId : undefined}
                        data-result={result}
                        onClick={() => setSelected(letter)}
                    >
                        {option}
                    </button>
                );
            })}
            <div id={feedbackId} role="status" className="practice-feedback" data-result={selected === null ? undefined : selected === correctAnswer ? 'correct' : 'incorrect'}>
                {selected !== null && (selected === correctAnswer ? '正解です。' : `不正解です。正解は ${correctAnswer} です。`)}
            </div>
        </div>
    );
}

/** 原本の examprep セクション本文。 */
export default function ExamPrep() {
    return (<section className="guide-part" data-part="examprep">
    <h2 id={"9-理解度チェック演習問題"} tabIndex={-1}>{"9. 理解度チェック(演習問題)"}</h2>
    {"\n                "}
    <blockquote>{"\n                    "}<p>{"答えは各問の直後にあります。まず自力で考えてから開いてください。"}</p>{"\n                "}</blockquote>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q1."}</strong>{" 公開 Web サイトの ALB を、CloudFront\n                    経由のアクセスだけに限定したい。最も適切な構成はどれか。"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. ALB の SG で "}<code>{"0.0.0.0/0"}</code>{" を許可する"}</span>
        <span>{"\n                    B. ALB の SG の送信元に CloudFront\n                    のマネージドプレフィックスリストを指定し、CloudFront\n                    からカスタムヘッダーを付与して検証する"}</span>
        <span>{"\n                    C. NACL で CloudFront の IP を 1 件ずつ列挙する"}</span>
        <span>{"\n                    D. ALB をパブリックサブネットから削除する\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。マネージドプレフィックスリストで送信元を CloudFront\n                        に絞り、さらにカスタムヘッダーの検証で他のディストリビューション経由のアクセスも防げます。A\n                        は迂回を許す、C は IP の変更に追従できない、D は ALB の役割を失います。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q2."}</strong>{" ブルートフォース攻撃により "}<code>{"/login"}</code>{" に同一 IP\n                    から大量のリクエストが来ている。正規ユーザーへの影響を抑えつつ防御したい。最適なのはどれか。"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. サイト全体に厳しいレートベースルールを設定"}</span>
        <span>{"\n                    B. "}<code>{"/login"}</code>{" に絞ったスコープダウン付きのレートベースルールを、Count\n                    で検証後に Block"}</span>
        <span>{"\n                    C. 国単位の地理的制限のみ"}</span>
        <span>{"\n                    D. Shield Standard のみ\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。保護対象を絞り、Count で閾値を確認してから Block\n                        にすることで誤ブロックを避けられます。Shield Standard は主に L3/L4\n                        対策であり、アプリ層のログイン試行には WAF が必要です。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q3."}</strong>{" プライベートサブネットの EC2\n                    に、インバウンドポートを開けず、操作内容も記録できる管理接続を提供したい。必要な構成はどれか。"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. 踏み台ホストを置き、22 番ポートを "}<code>{"0.0.0.0/0"}</code>{" に開放"}</span>
        <span>{"\n                    B. Session Manager を使い、SSM Agent、インスタンスプロファイル、必要な VPC\n                    エンドポイントを用意して、セッションログを CloudWatch Logs / S3 に出力"}</span>
        <span>{"\n                    C. EC2 に長期 SSH 鍵を配布"}</span>
        <span>{"\n                    D. Direct Connect を導入\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。Session Manager は IAM\n                        で認可され、インバウンドポート不要で、セッションログも残せます。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q4."}</strong>{" ECS(Fargate)上のアプリが DynamoDB\n                    を呼ぶ。権限をどこに付与するのが適切か。"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. タスク実行ロール"}</span>
        <span>{"\n                    B. タスクロール(最小権限)"}</span>
        <span>{"\n                    C. IAM ユーザーのアクセスキーをコンテナの環境変数に設定"}</span>
        <span>{"\n                    D. EC2 のインスタンスプロファイル\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。アプリ(コンテナ内のコード)が使う権限は"}<strong>{"タスクロール"}</strong>{"です。タスク実行ロールは\n                        ECR からのイメージ取得やログ出力など、ECS 基盤が使う権限です。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q5."}</strong>{" あるサブネット内のインスタンスへ向かう通信は SG\n                    で許可しているのに、応答が戻ってこない。サブネットの NACL\n                    でありがちな原因は何か。"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. SG はステートレスだから"}</span>
        <span>{"\n                    B. NACL がステートレスで、戻りのエフェメラルポートが許可されていない"}</span>
        <span>{"\n                    C. NACL に許可ルールが多すぎる"}</span>
        <span>{"\n                    D. IGW が停止している\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。NACL\n                        はステートレスなので、戻り通信(エフェメラルポート)も明示的に許可が必要です。SG\n                        はステートフルです。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q6."}</strong>{" 組織のセキュリティ要件は「インターネットから本番 DB\n                    へ到達できる経路が存在してはならない」である。この経路の有無を網羅的に検証する最適なサービスは?"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. VPC Reachability Analyzer"}</span>
        <span>{"\n                    B. Network Access Analyzer"}</span>
        <span>{"\n                    C. GuardDuty"}</span>
        <span>{"\n                    D. AWS Shield Advanced\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。Network Access Analyzer\n                        は「あってはならない経路」をスコープとして定義し、該当経路を洗い出します。Reachability\n                        Analyzer は特定の 2 点間の疎通を確認する用途です。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q7."}</strong>{" オンプレミスと AWS\n                    を閉域の専用線で接続しており、回線区間も暗号化したい。専用接続で選べる方式は?"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. Direct Connect は標準で暗号化されるので追加不要"}</span>
        <span>{"\n                    B. MACsec を有効化(または DX 上に IPsec VPN を重ねる)"}</span>
        <span>{"\n                    C. インターネット VPN に切り替える"}</span>
        <span>{"\n                    D. セキュリティグループで暗号化する\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。Direct Connect\n                        は標準では暗号化されません。MACsec(レイヤー 2)や DX 上の VPN を使います。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q8."}</strong>{" 生成 AI\n                    チャットボットに「これまでの指示を無視して…」という入力でシステムの動作を乗っ取られるリスクがある。最初に導入すべき対策は?"}</p>
    <PracticeOptions correctAnswer="B">
        <span>{"\n                    A. EC2 の CPU を増やす"}</span>
        <span>{"\n                    B. Bedrock Guardrails\n                    のプロンプト攻撃フィルターと、エージェントの最小権限ロール"}</span>
        <span>{"\n                    C. NACL で全 IP を拒否"}</span>
        <span>{"\n                    D. CloudFront の地理的制限\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"B"}</strong>{"。プロンプトインジェクション(LLM01)には入力の検査と、万一乗っ取られても被害が出ない最小権限(LLM06\n                        対策)の組み合わせが基本です。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q9."}</strong>{" Lambda\n                    関数が使用しているサードパーティ製ライブラリの既知の脆弱性を、継続的に検出したい。適切なサービスは?"}</p>
    <PracticeOptions correctAnswer="A">
        <span>{"\n                    A. Amazon Inspector"}</span>
        <span>{"\n                    B. AWS Shield"}</span>
        <span>{"\n                    C. Route 53"}</span>
        <span>{"\n                    D. AWS Direct Connect\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"A"}</strong>{"。Inspector は Lambda\n                        関数のコードと依存パッケージのスキャンに対応しています。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n                "}
    <article className="practice-card">
    <p className="practice-prompt">{"\n                    "}<strong>{"Q10."}</strong>{" 数百のアカウントに、同じ WAF ルールと Shield Advanced\n                    保護を一括で強制したい。最適なサービスは?"}</p>
    <PracticeOptions correctAnswer="A">
        <span>{"\n                    A. AWS Firewall Manager"}</span>
        <span>{"\n                    B. 各アカウントで手作業"}</span>
        <span>{"\n                    C. Amazon Macie"}</span>
        <span>{"\n                    D. AWS Artifact\n                "}</span>
    </PracticeOptions>
    {"\n                "}
    <details className={"answer"}>{"\n                    "}<summary>{"答えと解説"}</summary>{"\n                    "}<p>{"\n                        "}<strong>{"A"}</strong>{"。Firewall Manager は Organizations\n                        と連携して、WAF、Shield Advanced、SG、Network Firewall\n                        などのポリシーを組織全体に展開・強制します。\n                    "}</p>{"\n                "}</details>
    </article>
    {"\n\n                "}
        </section>);
}
