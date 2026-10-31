'use client';
import { createContext, useContext, useState, type ReactNode } from 'react';
const CheckedCount = createContext(0);
/** チェックリスト1枚。カード内の選択済み項目数だけをClient状態として持つ。 */
export function ChecklistCard({ children }: {
    children: ReactNode;
}) { const [count, setCount] = useState(0); return <CheckedCount.Provider value={count}>
<div className="checklist-card" onChange={event => setCount(event.currentTarget.querySelectorAll('input:checked').length)}>
{children}
</div>
</CheckedCount.Provider>; }
/** 所属するカードの完了数を表示する。 */
export function ChecklistCount({ total }: {
    total: number;
}) { const count = useContext(CheckedCount); return <span className="count">
{`${count} / ${total} 完了`}
</span>; }
