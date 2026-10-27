import React from 'react';

export const Sec8_Rules: React.FC = () => {
    return (
        <section className="section" id="s8">
            <h2>
                <i className="ti ti-bulb"></i>7. 試験での判断ルール
            </h2>
            <p>
                Domain 4 の選択肢で迷ったときの考え方です。試験ガイドが「技術実装より戦略的意思決定を重視する」としていること、および前章までの AWS の推奨を基にした <strong>筆者の整理</strong> です。[S2]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">判断ルール</th>
                            <th scope="col">正解になりやすい例</th>
                            <th scope="col">誤りになりやすい例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>診断が先</td>
                            <td>準備度アセスメントから始める</td>
                            <td>いきなり大規模導入</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>事業成果から逆算</td>
                            <td>目的と成功指標を決めてから選ぶ</td>
                            <td>最新技術の導入自体を目的化</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>段階的・反復的</td>
                            <td>小さく検証して広げる</td>
                            <td>ビッグバンの一括導入</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>人と文化を軽視しない</td>
                            <td>研修、チャンピオン、透明な説明</td>
                            <td>技術だけ強化、強制的な利用</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>データが土台</td>
                            <td>品質・オーナー・サイロ解消を先に</td>
                            <td>データ量を増やすだけ</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>責任を明確に</td>
                            <td>説明責任者と RACI</td>
                            <td>合議で責任が曖昧</td>
                        </tr>
                        <tr>
                            <td>7</td>
                            <td>本番は別物</td>
                            <td>受け入れ基準・運用・ガバナンスを整える</td>
                            <td>PoC 成功 = 本番準備完了</td>
                        </tr>
                        <tr>
                            <td>8</td>
                            <td>測定し続ける</td>
                            <td>ベースライン → 継続測定 → 改善</td>
                            <td>導入完了で終了</td>
                        </tr>
                        <tr>
                            <td>9</td>
                            <td>範囲外の実装は選ばない</td>
                            <td>戦略・責任・コストの判断</td>
                            <td>アルゴリズム選定・パイプライン構築の詳細</td>
                        </tr>
                        <tr>
                            <td>10</td>
                            <td>極端を避ける</td>
                            <td>ルールに基づく共有、段階的な移行</td>
                            <td>全面禁止 / 全面自由</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <blockquote>
                <p>
                    <strong>シャドー AI について</strong>: 試験の関連キーワードには「未承認の AI ツール利用(シャドー AI)のリスクと管理」があります。[S4] 単純な全面禁止ではなく、
                    <strong>承認された選択肢の提供、ガバナンス、教育</strong> を組み合わせる方向が、上記ルール 10 と整合的です(整理は筆者)。
                </p>
            </blockquote>
        </section>
    );
};
