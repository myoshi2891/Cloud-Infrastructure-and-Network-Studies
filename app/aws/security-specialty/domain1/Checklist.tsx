'use client';
import { useState, type ReactNode } from 'react';

export interface ChecklistItem {
    id: string;
    label: ReactNode;
}

export function ChecklistCard({
    items,
    title = 'チェックリスト',
}: {
    items: ChecklistItem[];
    title?: string;
}) {
    const [checked, setChecked] = useState<Record<string, boolean>>({});

    const checkedCount = items.filter((item) => checked[item.id]).length;

    const toggle = (id: string) => {
        setChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <div className="checklist-card">
            <div className="checklist-header">
                <span className="title">{title}</span>
                <span className="count">{`${checkedCount} / ${items.length} 完了`}</span>
            </div>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        <input
                            id={item.id}
                            type="checkbox"
                            checked={Boolean(checked[item.id])}
                            onChange={() => toggle(item.id)}
                        />
                        <label htmlFor={item.id}>{item.label}</label>
                    </li>
                ))}
            </ul>
        </div>
    );
}
