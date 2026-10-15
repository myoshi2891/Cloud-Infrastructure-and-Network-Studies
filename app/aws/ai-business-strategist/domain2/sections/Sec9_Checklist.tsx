interface Sec9Props {
    checkedItems: Record<number, boolean>;
    onToggle: (index: number) => void;
}

export function Sec9_Checklist({ checkedItems, onToggle }: Sec9Props) {
    const totalCount = 18;
    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <section id="s9" className="section">
            <h2>9. 直前チェックリスト</h2>
            <div className="chk-counter">進捗: {completedCount} / {totalCount} 完了</div>

            <p>自分の言葉で説明できるかを確認してください。</p>
            <p><strong>Task 2.1: 戦略の整合</strong></p>
            <ul>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-1"
                            checked={checkedItems[1] || false}
                            onChange={() => onToggle(1)}
                        />
                        <span>
                            課題、成果、AI の能力の対応づけを、部門別の例で説明できる
                            (2.1.1)
                        </span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-2"
                            checked={checkedItems[2] || false}
                            onChange={() => onToggle(2)}
                        />
                        <span>
                            Build、Buy、Partner の違いと、判断の 5 観点
                            (予算、期間、能力、ベンダー提案、規制) を言える
                            (2.1.2)
                        </span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-3"
                            checked={checkedItems[3] || false}
                            onChange={() => onToggle(3)}
                        />
                        <span>
                            優先順位付けの 4 軸
                            (価値、実現可能性、持続可能性、戦略的整合性) を言える
                            (2.1.3)
                        </span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-4"
                            checked={checkedItems[4] || false}
                            onChange={() => onToggle(4)}
                        />
                        <span>拡大、一時停止、終了の判断基準を説明できる (2.1.3)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-5"
                            checked={checkedItems[5] || false}
                            onChange={() => onToggle(5)}
                        />
                        <span>AI が適切でない典型例を 3 つ以上挙げられる (2.1.4)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-6"
                            checked={checkedItems[6] || false}
                            onChange={() => onToggle(6)}
                        />
                        <span>ルールベース自動化を選ぶべき場面を説明できる (2.1.4)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-7"
                            checked={checkedItems[7] || false}
                            onChange={() => onToggle(7)}
                        />
                        <span>
                            移行の 4 観点 (事業継続性、コスト、データ、パフォーマンス)
                            を説明できる (2.1.5)
                        </span>
                    </label>
                </li>
            </ul>
            <p><strong>Task 2.2: 価値の測定</strong></p>
            <ul>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-8"
                            checked={checkedItems[8] || false}
                            onChange={() => onToggle(8)}
                        />
                        <span>有形と無形の KPI の例を挙げられる (2.2.1)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-9"
                            checked={checkedItems[9] || false}
                            onChange={() => onToggle(9)}
                        />
                        <span>ベースラインが必要な理由を説明できる (2.2.2)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-10"
                            checked={checkedItems[10] || false}
                            onChange={() => onToggle(10)}
                        />
                        <span>ROI の式と、便益とコストの種類を言える (2.2.3)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-11"
                            checked={checkedItems[11] || false}
                            onChange={() => onToggle(11)}
                        />
                        <span>実現率と複数年評価の意味を説明できる (2.2.3)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-12"
                            checked={checkedItems[12] || false}
                            onChange={() => onToggle(12)}
                        />
                        <span>先行指標と遅行指標の違いを例で示せる (2.2.4)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-13"
                            checked={checkedItems[13] || false}
                            onChange={() => onToggle(13)}
                        />
                        <span>
                            従量課金、インスタンス課金、シート課金の違いと向く場面を言える
                            (2.2.5)
                        </span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-14"
                            checked={checkedItems[14] || false}
                            onChange={() => onToggle(14)}
                        />
                        <span>
                            Pricing Calculator、Cost Explorer、Savings Plans、AWS
                            Marketplace の役割を区別できる (2.2.5)
                        </span>
                    </label>
                </li>
            </ul>
            <p><strong>Task 2.3: 競争優位</strong></p>
            <ul>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-15"
                            checked={checkedItems[15] || false}
                            onChange={() => onToggle(15)}
                        />
                        <span>競争環境を評価する視点を挙げられる (2.3.1)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-16"
                            checked={checkedItems[16] || false}
                            onChange={() => onToggle(16)}
                        />
                        <span>AI 活用の 4 つのレベルを説明できる (2.3.2)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-17"
                            checked={checkedItems[17] || false}
                            onChange={() => onToggle(17)}
                        />
                        <span>真似されやすい優位と続く優位の違いを言える (2.3.3)</span>
                    </label>
                </li>
                <li className="chk-item">
                    <label className="chk-label">
                        <input
                            type="checkbox"
                            id="chk-18"
                            checked={checkedItems[18] || false}
                            onChange={() => onToggle(18)}
                        />
                        <span>
                            業界の成熟度と競争動向に応じた投資姿勢を説明できる
                            (2.3.4)
                        </span>
                    </label>
                </li>
            </ul>
        </section>
    );
}
