'use client';
import { createContext, useContext, type ReactNode } from 'react';
/** ガイド全体のチェック状態。 */
export const ChecklistContext = createContext<{ checked: Set<number>; toggle: (index: number) => void }>({ checked: new Set(), toggle: () => {} });
/** 原本のラベル・チェック装飾を保持し、全体達成件数へ連動する項目。 */
export function ChecklistItem({ index, children }: { index: number; children: ReactNode }) {
    const { checked, toggle } = useContext(ChecklistContext);
    return <li className={`chk${checked.has(index) ? ' done' : ''}`}><label><input type="checkbox" checked={checked.has(index)} onChange={() => toggle(index)} />{children}</label></li>;
}
