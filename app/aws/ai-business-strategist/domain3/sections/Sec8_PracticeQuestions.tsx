import React from 'react';

export const Sec8_PracticeQuestions: React.FC = () => {
    return (
        <section className="section" id="s8">
            <div className="sec-head">
                <span className="eyebrow">Chapter 08</span>
                <h2>
                    <i className="ti ti-checklist"></i>
                    <span>確認問題(自己採点用)</span>
                </h2>
            </div>
            <div className="prose">
                <p>
                    <strong>問 1</strong>　金融機関が生成 AI
                    で与信に関する顧客向け回答を提供します。最も適切なセーフガードの組み合わせはどれですか。(2
                    つ)<br />
                    {' '}A. ガードレールのみを設定し、人間は関与させない<br />
                    {' '}B. 高影響の回答は人間が確認し、エスカレーション基準を事前に定義する<br />
                    {' '}C. 出力の根拠づけと、範囲外トピック(例:
                    個別の投資助言)の遮断を組み合わせる<br />
                    {' '}D. 応答速度を最優先し、レビューは月次の事後確認のみとする<br />
                    {' '}E. 責任は AWS にあるため社内での基準は不要
                </p>
                <p>
                    <strong>問 2</strong>　ガバナンス体制の設計として最も適切なものは。<br />
                    {' '}A. 技術部門のみで構成し、意思決定を高速化<br />
                    {' '}B. 法務・セキュリティ・事業・技術・人事などが参加し、各 AI
                    システムに責任者を置く<br />
                    {' '}C. 外部ベンダーに全面委託<br />
                    {' '}D. リリース後に責任者を決める
                </p>
                <p>
                    <strong>問 3</strong>　リリース時の公平性テストに合格しました。次に最も適切な対応は。<br />
                    {' '}A. 継続監視は不要<br />
                    {' '}B. 運用中も属性別の指標を継続的に測定し、Bias Drift
                    の検知時の是正手順を定める<br />
                    {' '}C. 半年後に 1 度だけ再テスト<br />
                    {' '}D. 苦情が出たときだけ対応
                </p>
                <p>
                    <strong>問 4</strong>　責任共有モデルに関する説明として適切なものは。<br />
                    {' '}A. AWS がデータへのアクセス権の管理まですべて担う<br />
                    {' '}B. AWS
                    は基盤を保護し、顧客はデータ・アクセス制御・モデル設定・アプリの統制を担う<br />
                    {' '}C. 顧客は何も担わない<br />
                    {' '}D. 責任共有は生成 AI には適用されない
                </p>
                <p>
                    <strong>問 5</strong>　社員が未承認の外部 AI
                    ツールに社外秘資料を入力していることが分かりました。最も適切な初動を含む方針は。<br />
                    {' '}A. 全面禁止し、以降は調査しない<br />
                    {' '}B.
                    利用ポリシーと教育を整え、承認済みで安全な代替ツールを提供し、データ取扱いルールを明確にする<br />
                    {' '}C. 個人の責任として放置<br />
                    {' '}D. すべての AI 利用を無期限に停止
                </p>
                <details className="answer">
                    <summary>解答と解説を表示</summary>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">問</th>
                                    <th scope="col">解答</th>
                                    <th scope="col">解説</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>B、C</td>
                                    <td>
                                        高影響領域は人間の監督と事前のエスカレーション基準が必要。根拠づけと範囲外遮断の組み合わせが多層防御になる。A/D
                                        は監督不足、E は責任共有の誤解
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>B</td>
                                    <td>
                                        部門横断の代表と明確な責任者が Skill 3.2.1 の要点
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>B</td>
                                    <td>
                                        バイアスは運用中に変化しうる(Bias
                                        Drift)。継続監視と是正手順が必要
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>B</td>
                                    <td>
                                        AWS は基盤、顧客はデータ・アクセス・設定・アプリ
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>B</td>
                                    <td>
                                        全面禁止はシャドー AI
                                        を招く。ポリシー・教育・承認済み代替・データルールの組み合わせが基本
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </details>
            </div>
        </section>
    );
};
