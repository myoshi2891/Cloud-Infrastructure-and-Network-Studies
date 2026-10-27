import React from 'react';

export const Sec11_Glossary: React.FC = () => {
    return (
        <section className="section" id="s11">
            <h2>
                <i className="ti ti-book"></i>10. 用語集
            </h2>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">用語</th>
                            <th scope="col">意味</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AI チャンピオン</td>
                            <td>各部門で AI 活用を推進する旗振り役</td>
                        </tr>
                        <tr>
                            <td>AWS CAF</td>
                            <td>
                                AWS Cloud Adoption Framework。クラウド導入を 6 つの視点で整理した枠組み
                            </td>
                        </tr>
                        <tr>
                            <td>CAF for AI</td>
                            <td>CAF を AI/ML/生成 AI 向けに拡張した枠組み</td>
                        </tr>
                        <tr>
                            <td>COE</td>
                            <td>Center of Excellence。専門知識を集約して全社を支援する組織</td>
                        </tr>
                        <tr>
                            <td>Envision / Experiment / Launch / Scale</td>
                            <td>生成 AI 成熟度モデルの 4 段階</td>
                        </tr>
                        <tr>
                            <td>Five V&apos;s Framework</td>
                            <td>
                                Value, Visualize, Validate, Verify, Venture。AWS が示す、AI を本番へ進める枠組み
                            </td>
                        </tr>
                        <tr>
                            <td>AI フライホイール</td>
                            <td>
                                高品質なデータが AI を改善し、成果が新しいデータを生む好循環
                            </td>
                        </tr>
                        <tr>
                            <td>ガードレール</td>
                            <td>AI の出力や動作を安全な範囲に保つ仕組み</td>
                        </tr>
                        <tr>
                            <td>データサイロ</td>
                            <td>部門ごとに孤立して共有されないデータ</td>
                        </tr>
                        <tr>
                            <td>データオーナーシップ / スチュワードシップ</td>
                            <td>データへの責任(所有から責任ある管理へ)</td>
                        </tr>
                        <tr>
                            <td>ドリフト</td>
                            <td>時間の経過でモデルの性能が変わること</td>
                        </tr>
                        <tr>
                            <td>ハルシネーション</td>
                            <td>AI がもっともらしい誤りを生成すること</td>
                        </tr>
                        <tr>
                            <td>RACI</td>
                            <td>実行責任・説明責任・相談先・報告先を整理する責任分担表</td>
                        </tr>
                        <tr>
                            <td>クイックウィン</td>
                            <td>短期間で成果が見える取り組み</td>
                        </tr>
                        <tr>
                            <td>責任共有モデル</td>
                            <td>クラウド事業者と顧客のセキュリティ責任の分担</td>
                        </tr>
                        <tr>
                            <td>シャドー AI</td>
                            <td>組織の承認なく使われる AI ツール</td>
                        </tr>
                        <tr>
                            <td>ベースライン</td>
                            <td>導入前の基準値。効果測定の比較元</td>
                        </tr>
                        <tr>
                            <td>RAG</td>
                            <td>外部の情報を検索して回答に活用する生成 AI の手法</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>
    );
};
