'use client';

import { useEffect, useRef, useState } from 'react';
import { CatalogControls } from '@/components/CatalogControls';
import { providerMeta, providerOrder, type Exam, type Provider } from '@/app/constants';
import styles from '@/app/page.module.css';
import { ProviderMark } from '@/components/ProviderMark';
import { ExamCard } from './ExamCard';

/** Groups the supplied entries into provider-specific catalog sections. */
export function ExamCatalog({ exams }: { exams: Exam[] }) {
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<Provider | 'all'>('all');
    // ヒーローの導線先が絞り込みで非表示のとき、解除後の再描画を待ってから移動する
    const pendingProviderId = useRef<string | null>(null);

    useEffect(() => {
        const onProviderLinkClick = (event: MouseEvent) => {
            if (!(event.target instanceof Element)) return;
            const targetId = event.target.closest('a[href^="#provider-"]')?.getAttribute('href')?.slice(1);
            // 絞り込みが無ければ全セクションが描画済みのため、ブラウザ標準のアンカー移動に任せる
            if (!targetId || (query === '' && selected === 'all')) return;
            pendingProviderId.current = targetId;
            setQuery('');
            setSelected('all');
        };
        document.addEventListener('click', onProviderLinkClick);
        return () => document.removeEventListener('click', onProviderLinkClick);
    }, [query, selected]);

    useEffect(() => {
        const targetId = pendingProviderId.current;
        if (!targetId) return;
        pendingProviderId.current = null;
        document.getElementById(targetId)?.scrollIntoView();
    });

    const categories = providerOrder.flatMap((provider) => {
        const count = exams.filter((exam) => exam.provider === provider).length;
        return count ? [{ provider, count }] : [];
    });
    const term = query.trim().toLocaleLowerCase();
    const matches = exams.filter((exam) =>
        (selected === 'all' || exam.provider === selected) &&
        [exam.label, exam.abbr, exam.description, exam.level, exam.provider, providerMeta[exam.provider].label,
            ...exam.domains.map((domain) => domain.label)].join(' ').toLocaleLowerCase().includes(term),
    );
    return (
        <section id="catalog" className={styles.catalog} aria-labelledby="catalog-heading">
            <div className={styles.catalogIntro}>
                <p>Study catalog</p>
                <h2 id="catalog-heading">次に学ぶことを、見つけよう。</h2>
                <span>プロバイダごとに整理された学習パスから、次の一歩を選択できます。</span>
            </div>

            <div className={styles.catalogToolbar}>
                <CatalogControls categories={categories} selected={selected} onSelect={setSelected}
                    query={query} onQueryChange={setQuery} searchLabel="学習ガイドを検索" />
                <p className={styles.resultCount} role="status" aria-live="polite">{matches.length} 件の学習パス</p>
            </div>
            {matches.length === 0 && (
                <div className={styles.emptyState}>
                    <h3>条件に合う学習ガイドが見つかりませんでした</h3>
                    <p>キーワードを短くするか、別のカテゴリをお試しください。</p>
                    <button type="button" onClick={() => { setQuery(''); setSelected('all'); }}>検索条件をリセット</button>
                </div>
            )}
            {providerOrder.map((provider, index) => {
                const providerExams = matches.filter((exam) => exam.provider === provider);
                if (providerExams.length === 0) return null;
                const meta = providerMeta[provider];
                return (
                    <section
                        key={provider}
                        id={`provider-${provider.toLowerCase()}`}
                        className={styles.providerSection}
                        data-provider={provider.toLowerCase()}
                        aria-labelledby={`provider-heading-${provider}`}
                    >
                        <header className={styles.providerHeader}>
                            <span className={styles.providerIndex}>0{index + 1}</span>
                            <ProviderMark provider={provider} />
                            <div className={styles.providerTitle}>
                                <p>{meta.kicker}</p>
                                <h3 id={`provider-heading-${provider}`}>{meta.label}</h3>
                            </div>
                            <p className={styles.providerDescription}>{meta.description}</p>
                            <span className={styles.providerCount}>
                                {providerExams.length} {meta.countUnit.en}
                            </span>
                        </header>
                        <div className={styles.cards}>
                            {providerExams.map((exam) => (
                                <ExamCard key={exam.id} exam={exam} />
                            ))}
                        </div>
                    </section>
                );
            })}
        </section>
    );
}
