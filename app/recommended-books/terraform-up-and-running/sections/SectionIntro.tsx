// app/recommended-books/terraform-up-and-running/sections/SectionIntro.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function SectionIntro({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="この記事について">この記事について</h2>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">項目</th>
                            <th scope="col">内容</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>対象読者</td>
                                <td>
                                    Terraformに初めて触れるソフトウェアエンジニア・インフラエンジニア
                                </td>
                            </tr>
                            <tr className="row-even">
                                <td>前提知識</td>
                                <td>
                                    基本的なLinuxコマンド操作、クラウド（本ガイドはAWSを主軸）の基礎概念
                                </td>
                            </tr>
                            <tr className="row-odd">
                                <td>ゴール</td>
                                <td>
                                    Terraformの思想・基本構文・State管理・モジュール化・チーム運用までを一気通貫で理解する
                                </td>
                            </tr>
                            <tr className="row-even">
                                <td>対応バージョン</td>
                                <td>
                                    Terraform 1.16系（2026年8月時点の最新安定版）、一部でOpenTofu
                                    1.12系にも言及
                                </td>
                            </tr>
                            <tr className="row-odd">
                                <td>図解ポリシー</td>
                                <td>
                                    ASCIIアートは使用せず、フローチャートはMermaid、比較情報はMarkdown表で統一
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<p>
                    原著は「Intermediate to
                    advanced」向けとされていますが、本ガイドではその内容を噛み砕き、各章の要点・具体的なHCLコード例・ベストプラクティスを初学者向けに再構成しています。
                </p>

        </section>
    );
}
