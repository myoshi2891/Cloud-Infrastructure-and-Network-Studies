import { Diagram } from "../Diagram";

export default function Foundation() {
    return (
        <section className="guide-section" data-section="foundation">
<div className="hero">
                    <div className="kicker">Solutions Architect Professional · Domain 1</div>
                    <h1>
                        AWS Certified Solutions Architect - Professional (SAP-C02) Content Domain 1:
                        Design Solutions for Organizational Complexity
                        初学者向けステップバイステップガイド
                    </h1>
                    <div className="meta-row">
                        <span className="pill">配点 <strong>約26%</strong></span>
                        <span className="pill">対象 <strong>初学者〜中級者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 19点</strong></span>
                        <span className="pill">参考文献 <strong>66件</strong></span>
                    </div>
                </div>
<blockquote>
                    <p>
                        対象: SAP-C02 の Content Domain 1 (スコア比率 26%)。5つの出題タスク (Task
                        1.1 〜 1.5)
                        を、基礎から順番に、ベストプラクティスと根拠URL付きで解説します。
                    </p>
                    <p>
                        出題範囲の一次情報: AWS 公式 SAP-C02 Exam Guide (Version 1.2)。本ガイドの
                        Task 名・Knowledge・Skills は同ガイドの記述に沿って構成しています。
                    </p>
                </blockquote>
<h2 id="0-はじめに-このガイドの使い方">0. はじめに: このガイドの使い方</h2>
<h3 id="01-このガイドの前提">0.1 このガイドの前提</h3>
<ul>
                    <li>
                        想定読者: AWS の基本サービス (EC2, S3, VPC, IAM)
                        に触れたことがあり、Professional レベルの設計問題に初めて取り組む方
                    </li>
                    <li>
                        学び方: 各 Task を「なぜ必要か → 基本用語 → サービス → 設計パターン →
                        ベストプラクティス → よくある落とし穴」の順に読み進めます
                    </li>
                    <li>
                        図解ルール: フローチャートは Mermaid、表と比較は Markdown で記載しています
                        (ASCII アートは使用していません)
                    </li>
                </ul>
<h3 id="02-参照元に関する注意">0.2 参照元に関する注意</h3>
<ul>
                    <li>
                        依頼文に貼られていた URL (<code>ai-professional-01</code>)
                        は、別の試験である AWS Certified Generative AI Developer - Professional
                        (AIP-C01) のページです。SAP-C02 とは試験範囲が異なるため、本ガイドでは
                        SAP-C02 の公式 Exam Guide を一次情報として使用しています
                    </li>
                    <li>
                        一次情報 (SAP-C02 Exam Guide PDF):
                        <a href="https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf">https://d1.awsstatic.com/training-and-certification/docs-sa-pro/AWS-Certified-Solutions-Architect-Professional_Exam-Guide.pdf</a>
                    </li>
                    <li>
                        AWS
                        のドキュメントは頻繁に再構成され、機能の上限値や名称も更新されます。数値や新機能は受験直前に必ず公式ドキュメントで再確認してください
                    </li>
                </ul>
<h3 id="03-professional-試験の解き方-最重要">
                    0.3 Professional 試験の解き方 (最重要)
                </h3>
<p>
                    Professional の問題は「複数の要件 (コスト、運用負荷、セキュリティ、可用性)
                    を同時に満たす最適解」を選ぶ形式です。回答数は問題ごとに指定されており、単一回答の問題では最適な1つを、複数回答の問題では指定された数の正しい選択肢をすべて選びます。次の順で要件を読み解くと迷いにくくなります。
                </p>
<Diagram id="diag-1" label={"0.3 Professional 試験の解き方 (最重要)"} />
<hr />
<h2 id="1-domain-1-の全体像">1. Domain 1 の全体像</h2>
<h3 id="11-出題タスクと試験で問われる力">1.1 出題タスクと試験で問われる力</h3>
<p>Domain 1 のテーマは「単一アプリではなく、組織全体を設計する視点」です。</p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"1.1 出題タスクと試験で問われる力 (表1)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">Task</th>
                                <th scope="col">タイトル</th>
                                <th scope="col">一言でいうと</th>
                                <th scope="col">主なサービス</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>1.1</td>
                                <td>Architect network connectivity strategies</td>
                                <td>複数 VPC とオンプレミスをどうつなぐか</td>
                                <td>
                                    VPC, Transit Gateway, Direct Connect, VPN, PrivateLink, Route 53
                                    Resolver
                                </td>
                            </tr>
                            <tr className="even">
                                <td>1.2</td>
                                <td>Prescribe security controls</td>
                                <td>誰に何を許可し、どう守り、どう監査するか</td>
                                <td>
                                    IAM, IAM Identity Center, KMS, ACM, CloudTrail, Security Hub,
                                    GuardDuty
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>1.3</td>
                                <td>Design reliable and resilient architectures</td>
                                <td>障害時にどう復旧するか</td>
                                <td>
                                    AWS Elastic Disaster Recovery, AWS Backup, Multi-AZ, Aurora
                                    Global Database
                                </td>
                            </tr>
                            <tr className="even">
                                <td>1.4</td>
                                <td>Design a multi-account AWS environment</td>
                                <td>アカウントをどう分けて統制するか</td>
                                <td>AWS Organizations, AWS Control Tower, AWS RAM</td>
                            </tr>
                            <tr className="odd">
                                <td>1.5</td>
                                <td>Determine cost optimization and visibility strategies</td>
                                <td>コストをどう見える化し、減らすか</td>
                                <td>
                                    Cost Explorer, Budgets, Savings Plans, Compute Optimizer, S3
                                    Storage Lens
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<h3 id="12-学習の順序-おすすめ">1.2 学習の順序 (おすすめ)</h3>
<p>
                    アカウント構成 (Task 1.4) を先に理解すると、他の Task
                    の「組織全体でどう実現するか」が理解しやすくなります。
                </p>
<Diagram id="diag-2" label={"1.2 学習の順序 (おすすめ)"} />
<h3 id="13-well-architected-framework-との対応">
                    1.3 Well-Architected Framework との対応
                </h3>
<p>
                    SAP-C02 は AWS Well-Architected Framework の考え方に基づいて設計されています。
                </p>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"1.3 Well-Architected Framework との対応 (表2)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">柱</th>
                                <th scope="col">本 Domain での主な登場箇所</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>セキュリティ</td>
                                <td>Task 1.2, 1.4 (SCP, 暗号化, 集中監査)</td>
                            </tr>
                            <tr className="even">
                                <td>信頼性</td>
                                <td>Task 1.3 (DR, バックアップ, 自動復旧)</td>
                            </tr>
                            <tr className="odd">
                                <td>コスト最適化</td>
                                <td>Task 1.5 (購入オプション, タグ, 右サイジング)</td>
                            </tr>
                            <tr className="even">
                                <td>運用上の優秀性</td>
                                <td>Task 1.4 (ガバナンス, 集中ログ, 自動化)</td>
                            </tr>
                            <tr className="odd">
                                <td>パフォーマンス効率</td>
                                <td>
                                    Task 1.1 (リージョン選択, 接続方式), Task 1.3 (スケール方式)
                                </td>
                            </tr>
                        </tbody>
                    </table>
</div>
<p>
                    {"出典: "}
                    <a href="https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html">https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html</a>
                </p>
<hr />
        </section>
    );
}
