import { Diagram } from '../Diagram';

export const HeroSection = () => {
    return (
        <>
            <header className="hero">
                <p className="eyebrow">AWS Certification Study Guide</p>
                <h1>
                    AWS Certified AI Business Strategist (AIB-C01)
                    初学者向けステップバイステップ完全ガイド
                </h1>
                <blockquote className="callout">
                    <p>
                        <strong>対象読者</strong>: AI
                        の実装経験がないビジネス職(プロダクト/プログラムマネージャー、営業・事業開発、事業部リーダー、コンサルタント、ビジネスアナリスト、マーケター){' '}
                        <strong>このガイドの狙い</strong>: 試験ガイド(AIB-C01)に書かれた 4
                        ドメイン・13
                        タスク・全スキルを、初学者向けにやさしく解説し、各項目のベストプラクティスと根拠
                        URL を添える <strong>情報の基準日</strong>: 2026-09-28 に取得した AWS
                        公式ページの内容に基づく(本試験は 2026-09 時点で{' '}
                        <strong>beta exam</strong>{' '}
                        として提供中のため、試験形式・価格・時間は変更される可能性があります。受験前に必ず公式ページを再確認してください)
                    </p>
                </blockquote>
            </header>

            <h2 id="s2">目次</h2>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">セクション</th>
                            <th scope="col">対応ドメイン</th>
                            <th scope="col">配点</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Step 0</td>
                            <td>試験の全体像と学習ロードマップ</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Step 1</td>
                            <td>AI の基本概念と用語</td>
                            <td>Domain 1 Task 1.1</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 2</td>
                            <td>AI ソリューションの種類と選び方</td>
                            <td>Domain 1 Task 1.2</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 3</td>
                            <td>生成 AI の基本技法</td>
                            <td>Domain 1 Task 1.3</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 4</td>
                            <td>AI 戦略を事業目標に合わせる</td>
                            <td>Domain 2 Task 2.1</td>
                            <td>28%</td>
                        </tr>
                        <tr>
                            <td>Step 5</td>
                            <td>AI のビジネス価値を測定・実証する</td>
                            <td>Domain 2 Task 2.2</td>
                            <td>28%</td>
                        </tr>
                        <tr>
                            <td>Step 6</td>
                            <td>競争優位のための AI ポジショニング</td>
                            <td>Domain 2 Task 2.3</td>
                            <td>28%</td>
                        </tr>
                        <tr>
                            <td>Step 7</td>
                            <td>責任ある AI を意思決定に組み込む</td>
                            <td>Domain 3 Task 3.1</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 8</td>
                            <td>AI ガバナンス体制と規制対応</td>
                            <td>Domain 3 Task 3.2</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 9</td>
                            <td>企業の AI リスクと緩和策</td>
                            <td>Domain 3 Task 3.3</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 10</td>
                            <td>AI 活用の準備度と成熟度の評価</td>
                            <td>Domain 4 Task 4.1</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 11</td>
                            <td>データとインフラの土台づくり</td>
                            <td>Domain 4 Task 4.2</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 12</td>
                            <td>組織変革と AI 人材の育成</td>
                            <td>Domain 4 Task 4.3</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 13</td>
                            <td>パイロットから全社展開へスケールする</td>
                            <td>Domain 4 Task 4.4</td>
                            <td>24%</td>
                        </tr>
                        <tr>
                            <td>Step 14</td>
                            <td>試験範囲の AWS サービス・フレームワーク(戦略レベル)</td>
                            <td>全ドメイン横断</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>Step 15</td>
                            <td>試験対策と練習問題</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>付録</td>
                            <td>スキルチェックリスト / 用語集 / 参考文献</td>
                            <td>-</td>
                            <td>-</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 id="s3">このガイドの読み方</h2>
            <div className="tbl">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">記号・表記</th>
                            <th scope="col">意味</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><strong>試験ガイド記載</strong></td>
                            <td>AWS 公式の試験ガイド(AIB-C01)に明記されている内容</td>
                        </tr>
                        <tr>
                            <td><strong>補足解説</strong></td>
                            <td>
                                初学者が理解しやすいように、一般的な知識や具体例で補った内容。試験ガイドの文言そのものではありません
                            </td>
                        </tr>
                        <tr>
                            <td><strong>ベストプラクティス</strong></td>
                            <td>
                                各項目を実務で行う際の推奨アプローチ。根拠が AWS
                                公式資料の場合は出典を付け、一般的な実務知見の場合は「一般的な実務ガイダンス」と明記
                            </td>
                        </tr>
                        <tr>
                            <td><strong>出典</strong></td>
                            <td>根拠となる URL。各 Step の末尾にまとめ、最後に全 URL を一覧化</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote className="callout note">
                <p>
                    <strong>注意</strong>:
                    試験ガイドは「この試験は網羅的な内容リストを提供しない」と明記しています。本ガイドは公式ガイドのスキル項目を漏れなく扱いますが、出題内容のすべてを保証するものではありません。
                </p>
            </blockquote>

        </>
    );
};
