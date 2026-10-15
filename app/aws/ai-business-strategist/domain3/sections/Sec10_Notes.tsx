import React from 'react';

export const Sec10_Notes: React.FC = () => {
    return (
        <>
            <section className="section" id="s10">
                <div className="sec-head">
                    <span className="eyebrow">Chapter 10</span>
                    <h2>
                        <i className="ti ti-book"></i>
                        <span>本資料の注意事項</span>
                    </h2>
                </div>
                <div className="prose">
                    <ul>
                        <li>
                            <strong>一次情報を優先してください。</strong>
                            試験内容・時間・配点・対象サービスは変更されることがあります(試験ガイドの試験時間と認定ページの記載が異なっていた点も含む)。受験前に公式ページを再確認してください。
                        </li>
                        <li>
                            規制(特に EU AI Act
                            の適用時期)とサービスの提供状況(メンテナンスモードなど)は変化が速い分野です。本資料は
                            2026-09-30 時点で確認できた情報に基づきます。
                        </li>
                        <li>
                            9.4 の規制・標準および 9.5
                            は二次的な解説を含みます。法的な判断が必要な場合は、法務専門家や原典(法令・規格の原文)で確認してください。本資料は法的助言ではありません。
                        </li>
                        <li>
                            各表の「例」「ベストプラクティス」は学習用の整理です。AWS
                            の公式資料にある事実(次元の定義、Guardrails のポリシー、責任共有、IP
                            補償など)と、一般的な実務の考え方(RACI、リスクティア例など)が混在しています。後者は組織に合わせて調整してください。
                        </li>
                    </ul>
                </div>
            </section>
            <footer className="footer">
                <p>
                    AIB-C01 Domain 3 初学者向けガイド。執筆基準日
                    2026-09-30。試験内容・規制・サービス提供状況は変更されることがあるため、受験前に公式ページで最新情報を確認してください。
                </p>
            </footer>
        </>
    );
};
