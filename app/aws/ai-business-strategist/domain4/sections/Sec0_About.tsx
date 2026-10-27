import React from 'react';

export const Sec0_About: React.FC = () => {
    return (
        <section className="section" id="s0">
            <h2><i className="ti ti-info-circle"></i>この文書について</h2>
            <p>
                <strong>
                    Business Readiness, Leadership, and AI
                    Transformation(準備度・リーダーシップ・変革)
                </strong>
                を、初学者向けにステップバイステップで解説します。
            </p>
            <ul>
                <li>対象試験: AWS Certified AI Business Strategist (AIB-C01)</li>
                <li>対象ドメイン: Content Domain 4(試験全体の <strong>24%</strong>)</li>
                <li>
                    根拠の表記: 本文中の <code>[S1]</code> などは、末尾「参考 URL
                    一覧」の番号に対応します。
                </li>
            </ul>
            <blockquote>
                <p>
                    <strong>この文書の読み方</strong>
                    「公式が書いていること」と「初学者向けに筆者が整理した考え方」を区別するため、各項目を次の順で書いています。
                    <strong>
                        ①何を問われるか → ②やさしい説明 → ③具体例 → ④ベストプラクティス →
                        ⑤ひっかけ注意 → ⑥根拠
                    </strong>
                </p>
            </blockquote>
        </section>
    );
};
