import React from 'react';
import { Diagram } from '../Diagram';

export const Sec1_Overview: React.FC = () => {
    return (
        <section className="section" id="s1">
            <h2><i className="ti ti-compass"></i>0. 試験の全体像と Domain 4 の位置づけ</h2>
            <h3>0-1. この試験は何を測るのか</h3>
            <p>
                AIB-C01 は、AI を「作る人」ではなく{' '}
                <strong>「評価し、推進し、拡大する人」</strong>{' '}
                のための試験です。公式の試験ガイドは、AI
                の能力をビジネス成果に結びつけ、責任ある AI を実践し、AI
                の導入を大規模に進める力を検証すると説明しています。また、技術的な実装よりも戦略的な意思決定を重視します。[S2]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">項目</th>
                            <th scope="col">内容</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>想定受験者</td>
                            <td>
                                プロダクトマネージャー、プログラムマネージャー、営業、事業部門の責任者、コンサルタント、マーケター、ビジネスアナリストなど
                            </td>
                            <td>
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                >
                                    [S2]
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>コーディング経験</td>
                            <td>不要(AWS の構築経験も不要)</td>
                            <td>
                                <a
                                    href="https://aws.amazon.com/certification/certified-ai-business-strategist/"
                                >
                                    [S1]
                                </a>
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                >
                                    [S2]
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>推奨経験</td>
                            <td>
                                AI を導入しているチームと、またはその近くで働いた約 6 か月の経験
                            </td>
                            <td>
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                >
                                    [S2]
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>出題形式</td>
                            <td>択一(正解 1 つ)と複数選択(5 択以上から 2 つ以上を選ぶ)</td>
                            <td>
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                >
                                    [S2]
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>採点</td>
                            <td>
                                100〜1,000 のスケールスコア、合格は
                                700。補償型採点(ドメインごとの足切りなし)
                            </td>
                            <td>
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                >
                                    [S2]
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>不正解の扱い</td>
                            <td>未回答は不正解。誤答による減点はなし</td>
                            <td>
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                >
                                    [S2]
                                </a>
                            </td>
                        </tr>
                        <tr>
                            <td>Domain 4 の比率</td>
                            <td>24%(Domain 1: 24%、Domain 2: 28%、Domain 3: 24%)</td>
                            <td>
                                <a
                                    href="https://docs.aws.amazon.com/aws-certification/latest/ai-business-strategist-01/ai-business-strategist-01.html"
                                >
                                    [S2]
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote>
                <p>
                    <strong>注意: 試験時間の記載が 2 つのページで異なります。</strong>{' '}
                    試験ガイドには 130 分と書かれていますが、認定ページのベータ試験概要には 170
                    分・85
                    問と記載されています。ベータ試験か通常版かで異なる可能性があるため、受験前に必ず最新の公式ページを確認してください。[S1][S2]
                </p>
            </blockquote>
            <h3>0-2. Domain 4 をひとことで言うと</h3>
            <p>
                <strong>
                    「AI を使いたい」から「AI
                    が組織で当たり前に成果を出している」状態まで、組織を連れていく方法
                </strong>{' '}
                を問うドメインです。技術の話より、<strong>人・データ・仕組み・進め方</strong>{' '}
                の話が中心です。
            </p>
            <Diagram id="d0" />
            <h3>0-3. 試験ガイドに載っている関連キーワード</h3>
            <p>
                公式の「試験に出る可能性のある技術と概念」には、Domain 4
                に直結する次の項目が含まれます。[S4]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">分類</th>
                            <th scope="col">キーワード</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>準備度・成熟度</td>
                            <td>組織の AI 準備度と成熟度の評価</td>
                        </tr>
                        <tr>
                            <td>データ</td>
                            <td>
                                データ戦略、データオーナーシップ、データサイロの解消、データ品質
                            </td>
                        </tr>
                        <tr>
                            <td>変革</td>
                            <td>変更管理、ワークフォース変革、組織全体の AI リテラシー向上</td>
                        </tr>
                        <tr>
                            <td>スケール</td>
                            <td>パイロットから全社展開へ、AI センターオブエクセレンス(COE)</td>
                        </tr>
                        <tr>
                            <td>AWS</td>
                            <td>
                                Amazon Bedrock / Amazon SageMaker AI / Amazon
                                Quick(戦略レベル)、AWS
                                CAF、責任共有モデル、料金体系とコスト最適化
                            </td>
                        </tr>
                        <tr>
                            <td>標準</td>
                            <td>ISO/IEC 23053、ISO/IEC 42001 などの国際的な AI 標準</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
