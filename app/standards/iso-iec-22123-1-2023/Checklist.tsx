'use client';
import { useState, type ReactNode } from 'react';

/** 原本のチェック項目と装飾を保ち、完了件数とバーをReact状態から同期する。 */
export default function Checklist({ labels }: { labels: ReactNode[] }) {
    const [checked, setChecked] = useState<Set<number>>(() => new Set());
    return <div className="checklist-card">
        <div className="checklist-progress"><span className="cp-label">自己点検の進捗</span><span className="cp-bar"><span className="cp-fill" style={{ width: `${labels.length ? checked.size / labels.length * 100 : 0}%` }} /></span><span className="cp-count" data-total={labels.length} aria-live="polite">{checked.size} / {labels.length}</span></div>
        <ul className="task-list checklist" aria-label="自己点検チェックリスト">{labels.map((label, index) => <li key={index}><label><input type="checkbox" checked={checked.has(index)} onChange={() => setChecked(previous => { const next = new Set(previous); if (next.has(index)) next.delete(index); else next.add(index); return next; })} />{label}</label></li>)}</ul>
    </div>;
}
