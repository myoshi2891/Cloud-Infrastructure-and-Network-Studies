import { Diagram } from '../Diagram';

export function Sec1() {
    return (
        <section id="s1" className="section">

                        <h2>1. この試験と Domain 2 の位置づけ</h2>

                        <h3 id="s1-h1">1.1 試験の概要</h3>
                        <p>
                            AIB-C01 は、AI の取り組みを評価し、推進し、拡大する立場の人が、AI
                            の能力をビジネス成果に結びつけ、責任ある AI
                            を整え、大規模な導入を進められるかを確かめる試験です。試験ガイドは「技術的な実装よりも戦略的な意思決定を優先する」と明記しています。コードを書く力ではなく、投資判断、ビジネスケース、ガバナンス、拡大の判断力が問われます。
                        </p>
                        <div className="table-wrap" role="region" tabIndex={0} aria-label="表: 1.1 試験の概要">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>試験名</td>
                                        <td>AWS Certified AI Business Strategist (AIB-C01)</td>
                                    </tr>
                                    <tr>
                                        <td>対象者</td>
                                        <td>
                                            AI
                                            の取り組みを評価、推進、拡大するビジネス職。技術チームと協働するが、AI
                                            ソリューション自体は構築しない
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>前提</td>
                                        <td>
                                            コーディングや AWS の実装経験は不要。AI
                                            の基本知識と、AWS AI
                                            サービスの戦略レベルでの理解があるとよい。AI に携わった
                                            6 か月程度の経験が推奨
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>問題形式</td>
                                        <td>
                                            択一 (正解 1、不正解 3) と複数選択 (5 つ以上の選択肢から
                                            2 つ以上を選ぶ。全部正解で得点)
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>スコア</td>
                                        <td>100〜1,000 の換算スコア、合格は 700</td>
                                    </tr>
                                    <tr>
                                        <td>採点</td>
                                        <td>
                                            補償型。セクションごとの合格は不要で、全体で合格すればよい
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>不正解の扱い</td>
                                        <td>未回答は不正解。誤答による減点はない</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout">
                            <p>
                                注意 (出典間の差異): 試験ガイドの「試験時間」は 130
                                分と記載されていますが、認定ページのベータ試験の概要は 170 分、85
                                問、ベータ価格 50 USD
                                と記載しています。ベータ試験と標準試験で条件が異なる可能性があるため、受験を予約する時点で最新の条件を必ず確認してください。認定ページは日本語での受験にも対応しています。
                            </p>
                        </div>
                        <h3 id="s1-h2">1.2 4 つのドメインと配点</h3>
                        <div className="table-wrap" role="region" tabIndex={0} aria-label="表: 1.2 4 つのドメインと配点">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ドメイン</th>
                                        <th scope="col">配点</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            Domain 1: AI Fundamentals and Literacy (AI
                                            の基礎とリテラシー)
                                        </td>
                                        <td>24%</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <strong>Domain 2: AI Strategy and Business Value Creation
                                                (AI 戦略と価値創出)</strong>
                                        </td>
                                        <td><strong>28%</strong></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Domain 3: AI Governance and Responsible AI Leadership
                                            (AI ガバナンスと責任ある AI のリーダーシップ)
                                        </td>
                                        <td>24%</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            Domain 4: Business Readiness, Leadership, and AI
                                            Transformation (ビジネスの準備状況、リーダーシップ、AI
                                            変革)
                                        </td>
                                        <td>24%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p>
                            <strong>Domain 2 は最大配点 (28%) です。</strong> 試験全体の約 4 分の 1
                            強を占めるため、ここを固めることが合格への近道になります。
                        </p>
                        <h3 id="s1-h3">1.3 Domain 2 の 3 つの Task と 14 の Skill</h3>
                        <Diagram id="d0" />
                        <h3 id="s1-h4">1.4 Domain 2 を一言でいうと</h3>
                        <p>
                            Domain 2 は、AI
                            プロジェクトの「入口から出口まで」をビジネスの目で見る領域です。
                        </p>
                        <Diagram id="d1" />
                        <div className="table-wrap" role="region" tabIndex={0} aria-label="表: 1.4 Domain 2 を一言でいうと">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">流れ</th>
                                        <th scope="col">対応する Skill</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>何の課題を解くか</td>
                                        <td>2.1.1</td>
                                    </tr>
                                    <tr>
                                        <td>どう調達するか</td>
                                        <td>2.1.2</td>
                                    </tr>
                                    <tr>
                                        <td>どれを先にやるか</td>
                                        <td>2.1.3</td>
                                    </tr>
                                    <tr>
                                        <td>本当に AI が必要か</td>
                                        <td>2.1.4</td>
                                    </tr>
                                    <tr>
                                        <td>移行するときの注意</td>
                                        <td>2.1.5</td>
                                    </tr>
                                    <tr>
                                        <td>どう測るか</td>
                                        <td>2.2.1 〜 2.2.4</td>
                                    </tr>
                                    <tr>
                                        <td>いくら使い、どう抑えるか</td>
                                        <td>2.2.5</td>
                                    </tr>
                                    <tr>
                                        <td>競争上どう位置づけるか</td>
                                        <td>2.3.1 〜 2.3.4</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 id="s1-h5">1.5 試験範囲外のこと (学習の線引き)</h3>
                        <p>
                            試験ガイドは、次のような技術作業を「対象外」としています。深入りしなくて構いません。
                        </p>
                        <ul>
                            <li>AI モデルやアルゴリズムの開発、コーディング</li>
                            <li>データエンジニアリング、特徴量エンジニアリング</li>
                            <li>ハイパーパラメータのチューニング</li>
                            <li>パイプラインやインフラの構築と展開</li>
                            <li>モデルの数学的、統計的分析</li>
                            <li>AWS サービスの設定、展開、管理</li>
                            <li>本番運用中の AI システムの技術的な運用管理</li>
                        </ul>
                        <p>
                            Domain 2
                            で問われるのは、「どの案件に投資するか」「どう測るか」「どう位置づけるか」という<strong>ビジネス判断</strong>です。
                        </p>
                    
        </section>
    );
}
