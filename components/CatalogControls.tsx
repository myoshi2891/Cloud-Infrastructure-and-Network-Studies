'use client';

import { providerMeta, type Provider } from '@/app/constants';
import styles from './CatalogControls.module.css';

export type CatalogCategory = { provider: Provider; count: number };

/** Shared discovery controls: category definitions and counts come from the supplied catalog. */
export function CatalogControls({ categories, selected, onSelect, query, onQueryChange, searchLabel }: {
    categories: CatalogCategory[];
    selected: Provider | 'all';
    onSelect: (provider: Provider | 'all') => void;
    query: string;
    onQueryChange: (query: string) => void;
    searchLabel: string;
}) {
    return (
        <div className={styles.controls}>
            <label className={styles.search}>
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.5" />
                    <path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
                <span className="sr-only">{searchLabel}</span>
                <input type="search" value={query} onChange={(event) => onQueryChange(event.target.value)}
                    placeholder="試験名・書籍名・キーワードで検索" aria-label={searchLabel} />
            </label>
            <div className={styles.categories} role="group" aria-label="学習カテゴリ">
                <button type="button" aria-pressed={selected === 'all'} onClick={() => onSelect('all')}>
                    すべて <span>{categories.reduce((sum, category) => sum + category.count, 0)}</span>
                </button>
                {categories.map(({ provider, count }) => (
                    <button key={provider} type="button" aria-pressed={selected === provider} onClick={() => onSelect(provider)}>
                        {providerMeta[provider].label} <span>{count}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
