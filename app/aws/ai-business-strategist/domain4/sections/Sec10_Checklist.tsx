'use client';

import React, { useState } from 'react';

const CHECKLIST_ITEMS = [
    '4 つのタスク(4.1〜4.4)と 19 のスキルを、自分の言葉で説明できる',
    '準備度の 5 観点(リーダー合意・データ品質・文化・技術基盤・ガバナンス)を言える',
    '生成 AI 成熟度モデル(Envision → Experiment → Launch → Scale)と、CAF の段階(Envision → Align → Launch → Scale)の違いを説明できる',
    '能力ギャップの 4 領域(人・プロセス・技術・ガバナンス)を具体例で説明できる',
    '投資の優先順位を「戦略目標」と「現在の成熟度」で判断できる',
    'データ品質・アクセス性・サイロの影響を説明できる',
    'データ戦略、オーナーシップ、共有の枠組みの違いを説明できる',
    'AI フライホイールを説明できる',
    'Bedrock / SageMaker AI / Quick の役割を戦略レベルで説明できる',
    '責任共有モデルが生成 AI の使い方で変わることを説明できる',
    '料金体系(従量・インスタンス・シート)と、コスト関連ツールの役割を言える',
    '経営スポンサーと AI チャンピオンの違いを説明できる',
    '部門横断チームの構成と RACI の考え方を説明できる',
    '透明なコミュニケーションで伝えるべき 4 点を言える',
    '文化的障壁(リスク回避・抵抗・失敗への恐れ)と介入策を対応付けられる',
    '人材育成の手法(POC・ハッカソン・研修・責任ある AI 研修)の使い分けを説明できる',
    '人の役割の移行(手作業 → 監督・協働)と、エスカレーションの考え方を説明できる',
    'クイックウィンとポートフォリオの考え方を説明できる',
    'COE の役割(ガイダンスと能力の提供、集中型と連合型)を説明できる',
    'ベースライン、技術指標と事業指標、継続的な監視(ドリフト)を説明できる',
    "パイロットと本番の違い、Five V's の 5 フェーズを説明できる",
    'スケール時に評価すべき複数の要因(コスト・品質・セキュリティ・ガバナンス・人材)を挙げられる',
];

export const Sec10_Checklist: React.FC = () => {
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleToggle = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const total = CHECKLIST_ITEMS.length;
    const completedCount = Object.values(checkedItems).filter(Boolean).length;
    const progressPercent = (100 * completedCount) / total;

    return (
        <section className="section" id="s10">
            <h2>
                <i className="ti ti-checklist"></i>9. 直前チェックリスト
            </h2>
            <div>
                <div className="chk-count" aria-live="polite" aria-atomic="true">
                    {completedCount} / {total} 完了
                </div>
                <div className="chk-bar">
                    <i style={{ width: `${progressPercent}%` }}></i>
                </div>
            </div>
            <ul className="checklist">
                {CHECKLIST_ITEMS.map((text, index) => (
                    <li key={index}>
                        <label className="chk">
                            <input
                                type="checkbox"
                                checked={!!checkedItems[index]}
                                onChange={() => handleToggle(index)}
                            />
                            <span>{text}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </section>
    );
};
