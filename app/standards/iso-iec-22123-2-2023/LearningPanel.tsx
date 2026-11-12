'use client';
import { createContext, useContext, useRef, useState, type ReactNode, type InputHTMLAttributes } from 'react';

type Progress = { checked: Set<number>; total: number; quiz: boolean; toggle: (index: number) => void };
const Context = createContext<Progress | null>(null);
/** 各チェックリストとクイズの進捗を独立して参照する。 */
function useProgress() {
    const value = useContext(Context);
    if (!value) throw new Error('LearningPanel is required');
    return value;
}
/** 原本のチェック・クイズをReactの状態で管理し、答えの一括開閉も保持する。 */
export function LearningPanel({ children, className, total, quiz }: { children: ReactNode; className: string; total: number; quiz: boolean }) {
    const [checked, setChecked] = useState<Set<number>>(new Set());
    const root = useRef<HTMLDivElement>(null);
    return <Context.Provider value={{ checked, total, quiz, toggle(index) { setChecked(previous => { const next = new Set(previous); if (next.has(index)) next.delete(index); else next.add(index); return next; }); } }}>
        <div ref={root} className={className + (!quiz && checked.size === total ? ' complete' : '')} onClick={event => {
            if (!(event.target instanceof Element)) return;
            const button = event.target.closest<HTMLButtonElement>('button');
            if (!button) return;
            const action = button.dataset.act;
            if (button.classList.contains('cl-reset') || action === 'reset') setChecked(new Set());
            if (action) root.current?.querySelectorAll('details').forEach(details => { details.open = action === 'open'; });
        }}>{children}</div>
    </Context.Provider>;
}
/** 原本のラベル構造を維持する制御チェックボックス。 */
export function PanelCheckbox({ index, ...props }: InputHTMLAttributes<HTMLInputElement> & { index: number }) {
    const { checked, toggle } = useProgress();
    return <input {...props} type="checkbox" checked={checked.has(index)} onChange={() => toggle(index)} />;
}
/** 現在の選択件数と原本の補足文を表示する。 */
export function PanelCount({ className }: { className: string }) {
    const { checked, total, quiz } = useProgress();
    return <span className={className} aria-live="polite">{checked.size} / {total}{quiz ? ' 理解できた' : ''}</span>;
}
/** 進捗を原本のグラデーションと幅へ反映する。 */
export function PanelFill({ className }: { className: string }) {
    const { checked, total } = useProgress();
    return <div className={className} style={{ width: `${total ? checked.size / total * 100 : 0}%` }} />;
}
/** 理解済みの設問へ原本のknown装飾を適用する。 */
export function QuizCard({ index, className, children }: { index: number; className: string; children: ReactNode }) {
    const { checked } = useProgress();
    return <div className={className + (checked.has(index) ? ' known' : '')}>{children}</div>;
}
