'use client';

import { createContext, useContext, useCallback, useState, type ReactNode } from 'react';

const CheckedCount = createContext(0);

/** チェックリストカード。カード内の選択済み項目数だけをClient状態として持つ。 */
export function ChecklistCard({ children }: { children: ReactNode }) {
    const [count, setCount] = useState(0);

    /** カードのマウント時に、復元済みのチェック状態を完了数へ反映する。 */
    const card = useCallback((node: HTMLDivElement | null) => {
        if (node) setCount(node.querySelectorAll('input:checked').length);
    }, []);

    return (
        <CheckedCount.Provider value={count}>
            <div
                ref={card}
                className="checklist-card"
                onChange={(event) => setCount(event.currentTarget.querySelectorAll('input:checked').length)}
            >
                {children}
            </div>
        </CheckedCount.Provider>
    );
}

/** 所属するカードの完了数を表示する。 */
export function ChecklistCount({ total }: { total: number }) {
    const count = useContext(CheckedCount);
    return <span className="count">{`${count} / ${total} 完了`}</span>;
}
