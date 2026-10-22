'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { CatalogControls } from '@/components/CatalogControls';
import styles from './Header.module.css';
import { EXAMS, providerMeta, type Provider } from '@/app/constants';
import { toNavTree, type NavExam, type NavGroup } from '@/app/navigation';
import { getRecent, type RecentEntry } from '@/lib/recentPages';
import { ProviderMark, SiteMark } from '@/components/ProviderMark';

const NAV_TREE = toNavTree(EXAMS);

/**
 * Filter a navigation tree of exam groups by a search query.
 *
 * Performs a case-insensitive substring match of `query` against each exam's `label`
 * and against each `item.label` within an exam. Matching exams are included with
 * their full original `items` array preserved so all domains remain accessible.
 * If `query` is only whitespace, the original `tree` is returned unchanged.
 *
 * @param tree - The navigation groups to filter
 * @param query - Search text; trimmed and lowercased for matching. Whitespace-only disables filtering
 * @returns The filtered navigation tree containing only groups with at least one matching exam.
 */
function filterNavTree(tree: readonly NavGroup[], query: string): NavGroup[] {
    const q = query.trim().toLowerCase();
    if (!q) return tree as NavGroup[];
    return tree
        .map((group): NavGroup => {
            const exams = group.exams.filter((exam) => {
                if (`${group.provider} ${group.label}`.toLowerCase().includes(q)) return true;
                if (exam.label.toLowerCase().includes(q)) return true;
                return exam.items.some((it) => it.label.toLowerCase().includes(q));
            });
            return { ...group, exams };
        })
        .filter((group) => group.exams.length > 0);
}

/**
 * Renders a sticky top navigation bar with a hamburger button that opens a right-side navigation drawer.
 *
 * The drawer contains the site's navigation and enforces scroll lock, keyboard accessibility (Tab focus trapping and Escape-to-close), and focus restoration to the hamburger trigger when closed.
 */
export function Header() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [query, setQuery] = useState('');
    const [selected, setSelected] = useState<Provider | 'all'>('all');
    const [recent, setRecent] = useState<RecentEntry[]>([]);
    const drawerRef = useRef<HTMLDivElement>(null);
    const hamburgerRef = useRef<HTMLButtonElement>(null);
    const closeButtonRef = useRef<HTMLButtonElement>(null);
    const currentPath = usePathname();
    const filteredTree = useMemo(() => filterNavTree(NAV_TREE, query)
        .filter((group) => selected === 'all' || group.provider === selected), [query, selected]);
    const hasResults = filteredTree.length > 0;
    const isSearching = query.trim().length > 0;

    /**
     * Captures a snapshot of recently viewed entries and opens the navigation drawer.
     *
     * This records the current recent-history snapshot so the drawer can display up-to-date
     * "recently viewed" links, then sets the drawer open state.
     */
    function openDrawerWithRecent() {
        // 開いた瞬間の履歴スナップショットを採取（外部 store なので useEffect ではなくイベントで取得）
        setRecent(getRecent());
        setDrawerOpen(true);
    }

    /**
     * Clears the drawer search query and closes the navigation drawer.
     *
     * Clears the current search input used for filtering the nav tree and sets the drawer open state to false.
     */
    function closeDrawer() {
        setQuery('');
        setSelected('all');
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            setDrawerOpen(false);
        }, 270);
    }

    // Drawer: スクロールロック + 開時に閉じるボタンへフォーカス + 閉時にトリガーへ復帰
    useEffect(() => {
        if (!drawerOpen) return;

        const triggerEl = hamburgerRef.current;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        // フォーカス移動はマウント完了後に確実に行う
        const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);

        return () => {
            window.clearTimeout(focusTimer);
            document.body.style.overflow = previousOverflow;
            triggerEl?.focus();
        };
    }, [drawerOpen]);

    // Drawer: Escape で閉じる + Tab フォーカストラップ
    useEffect(() => {
        if (!drawerOpen) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                e.preventDefault();
                closeDrawer();
                return;
            }
            if (e.key !== 'Tab') return;
            const container = drawerRef.current;
            if (!container) return;
            const rawTabbables = container.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
            );
            // summary は常時タブ可能。details 内のコンテンツは open 時のみタブ可能
            const tabbables = Array.from(rawTabbables).filter((el) => {
                if (el.tagName.toLowerCase() === 'summary') return true;
                const d = el.closest('details');
                return !d || d.open;
            });
            const first = tabbables[0];
            const last = tabbables[tabbables.length - 1];
            if (!first || !last) return;
            const active = document.activeElement as HTMLElement | null;
            if (e.shiftKey && (active === first || !container.contains(active))) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && active === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [drawerOpen]);

    return (
        <>
            <nav
                aria-label="サイト全体のメインナビゲーション"
                className={`sticky top-0 z-50 ${styles.bar}`}
                style={{
                    height: 'var(--header-h, 48px)',
                    minHeight: 'var(--header-h, 48px)',
                }}
            >
                <div
                    className={styles.barInner}
                    style={{ maxWidth: 'var(--site-content-width)', marginLeft: 'auto', marginRight: 'auto' }}
                >
                    {/* Logo / Brand */}
                    <Link
                        href="/"
                        className={styles.brandLink}
                    >
                        <SiteMark />
                        <span className={styles.brand}>
                            Cloud Infrastructure{' '}
                            <span className="text-gradient-aurora">Studies</span>
                        </span>
                    </Link>

                    <div className={styles.quickLinks}>
                        <Link href="/" aria-current={currentPath === '/' ? 'page' : undefined}>ホーム</Link>
                        <Link href="/#catalog">学習カタログ</Link>
                    </div>
                    {/* Hamburger trigger */}
                    <button
                        ref={hamburgerRef}
                        type="button"
                        onClick={openDrawerWithRecent}
                        aria-label="メニューを開く"
                        aria-haspopup="dialog"
                        aria-expanded={drawerOpen}
                        aria-controls="site-nav-drawer"
                        className={styles.trigger}
                    >
                        <svg
                            viewBox="0 0 18 18"
                            fill="none"
                            aria-hidden="true"
                            className="h-[18px] w-[18px] md:h-[22px] md:w-[22px]"
                        >
                            {/* 上の線: 開いた時 45deg 回転して X の一方になる */}
                            <path
                                d="M2 5h14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{
                                    transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
                                    transformOrigin: '9px 9px',
                                    transform: drawerOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                                }}
                            />
                            {/* 中央の線: フェードアウト */}
                            <path
                                d="M2 9h14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{
                                    transition: 'opacity 0.2s ease, transform 0.2s ease',
                                    transformOrigin: '9px 9px',
                                    opacity: drawerOpen ? 0 : 1,
                                    transform: drawerOpen ? 'scaleX(0.5)' : 'none',
                                }}
                            />
                            {/* 下の線: 開いた時 -45deg 回転して X のもう一方になる */}
                            <path
                                d="M2 13h14"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                style={{
                                    transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
                                    transformOrigin: '9px 9px',
                                    transform: drawerOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                                }}
                            />
                        </svg>
                        <span className="hidden text-[13px] font-semibold tracking-wide uppercase md:inline">
                            学習メニュー
                        </span>
                    </button>
                </div>
            </nav>
            {(drawerOpen || isClosing) && (
                <div
                    ref={drawerRef}
                    id="site-nav-drawer"
                    role="dialog"
                    aria-modal="true"
                    aria-label="サイトナビゲーション"
                    className="fixed inset-0 z-[200] flex justify-end md:justify-center"
                >
                    <div
                        className="hdr-backdrop absolute inset-0 bg-black/70 backdrop-blur-md"
                        data-state={isClosing ? 'closing' : 'open'}
                        onClick={closeDrawer}
                        aria-hidden
                    />
                    <aside
                        className={`hdr-panel ${styles.panel}`}
                        data-state={isClosing ? 'closing' : 'open'}
                    >
                        {/* Header — 外側で背景・ボーダーを画面端まで延ばし、内側ラッパーで本文と左右整列 */}
                        <div className={styles.panelHeader}>
                            <div
                                className={styles.panelHeaderInner}
                                style={{
                                    maxWidth: 'var(--site-content-width)',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            >
                                <div className="flex items-center gap-3 md:gap-4">
                                    <span className="hidden md:flex"><SiteMark /></span>
                                    <span className="text-sm font-semibold text-[var(--color-foreground)] md:text-xl md:font-bold md:tracking-tight">
                                        メニュー
                                    </span>
                                </div>
                                <button
                                    ref={closeButtonRef}
                                    type="button"
                                    onClick={closeDrawer}
                                    aria-label="メニューを閉じる"
                                    className={styles.close}
                                >
                                    <span aria-hidden className="text-lg leading-none md:text-2xl">
                                        ×
                                    </span>
                                </button>
                            </div>
                        </div>

                        {/* Body */}
                        <div
                            className={styles.body}
                            style={{
                                maxWidth: 'var(--site-content-width)',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        >
                            <div className={styles.intro}>
                                <div>
                                    <p className={styles.kicker}>YOUR LEARNING DIRECTORY</p>
                                    <h2>次の学びへ、ここから。</h2>
                                    <p>資格・技術書・実践ガイドを、ひとつの場所から。</p>
                                </div>
                                <Link href="/" onClick={closeDrawer} className={styles.homeLink}>ホームへ戻る ↗</Link>
                            </div>
                            <div className={styles.toolbar}>
                                <CatalogControls categories={NAV_TREE.map((group) => ({ provider: group.provider, count: group.exams.length }))}
                                    selected={selected} onSelect={setSelected} query={query} onQueryChange={setQuery}
                                    searchLabel="ナビゲーション検索" />
                            </div>

                            {hasResults ? (
                                <div className={styles.groups}>
                                    {filteredTree.map((group) => (
                                        <ProviderSection
                                            key={group.provider}
                                            group={group}
                                            currentPath={currentPath}
                                            forceOpenAll={isSearching}
                                            onLinkClick={closeDrawer}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div
                                    role="status"
                                    aria-live="polite"
                                    className={styles.emptyState}
                                >
                                    「{query}」に該当する項目はありません。
                                </div>
                            )}

                            {!isSearching && recent.length > 0 && (
                                <nav
                                    aria-label="最近見たページ"
                                    className="border-t border-white/[0.06]"
                                    style={{ marginTop: '2rem' }}
                                >
                                    <h2 className="mb-3 flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-[var(--color-muted-foreground)] md:mb-4 md:text-[13px] md:tracking-[0.18em]">
                                        <span
                                            className="md:inline-block md:h-px md:w-6 md:bg-white/15"
                                            aria-hidden
                                        />
                                        最近見たページ
                                    </h2>
                                    <ul className="flex flex-wrap gap-2 md:gap-2.5">
                                        {recent.map((entry) => (
                                            <li key={entry.href}>
                                                <Link
                                                    href={entry.href}
                                                    onClick={closeDrawer}
                                                    className={styles.recentLink}
                                                >
                                                    <span
                                                        aria-hidden
                                                        className="text-[var(--color-muted-foreground)]"
                                                    >
                                                        ↻
                                                    </span>
                                                    {entry.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </div>
                    </aside>
                </div>
            )}
        </>
    );
}

/**
 * Renders a provider section with a header and its exams.
 *
 * Displays a hero strip with the provider label and exam count, followed by the provider's exams rendered as accordions.
 *
 * All categories use the same responsive grid so new providers need no layout-specific branches.
 *
 * @param group - Navigation group object containing provider, label, and exams.
 * @param currentPath - Current pathname used to mark active item links.
 * @param forceOpenAll - When true, non-coming-soon exams are forced open.
 * @param onLinkClick - Callback invoked when an exam item link is clicked (typically to close the drawer).
 * @returns The section element that groups the provider header and its exam accordions.
 */
function ProviderSection({
    group,
    currentPath,
    forceOpenAll,
    onLinkClick,
}: {
    group: NavGroup;
    currentPath: string | null;
    forceOpenAll: boolean;
    onLinkClick: () => void;
}) {
    return (
        <section
            aria-labelledby={`nav-group-${group.provider}`}
            className={styles.providerSection}
        >
            {/* Hero strip */}
            <div className={styles.providerHeader}>
                <div className="flex items-center gap-3 md:gap-4">
                    <ProviderMark provider={group.provider} compact />
                    <h2
                        id={`nav-group-${group.provider}`}
                        className="text-[13px] font-bold tracking-tight text-[var(--color-foreground)] md:text-[18px]"
                    >
                        {group.label}
                    </h2>
                </div>
                <span className={styles.providerCount}>
                    {group.exams.length} {providerMeta[group.provider].countUnit.ja}
                </span>
            </div>

            {/* カテゴリによらず共通のレスポンシブグリッドを使う。 */}
            <ul
                className={styles.examList}
            >
                {group.exams.map((exam) => (
                    <li key={exam.id}>
                        <DrawerExamAccordion
                            exam={exam}
                            currentPath={currentPath}
                            forceOpen={forceOpenAll}
                            onLinkClick={onLinkClick}
                        />
                    </li>
                ))}
            </ul>
        </section>
    );
}

/**
 * Render an accordion section for a single exam inside the drawer navigation.
 *
 * Renders a <details>/<summary> accordion showing the exam icon and label, an optional
 * "準備中" badge when the exam status is `coming-soon`, and a list of links for the
 * exam's items when not coming soon.
 *
 * @param exam - The exam data (label, icon, colorClass, status, and items) to render.
 * @param onLinkClick - Callback invoked when any exam item link is clicked.
 * @returns A JSX element containing the exam accordion (header plus optional item links).
 */
function DrawerExamAccordion({
    exam,
    currentPath,
    forceOpen = false,
    onLinkClick,
}: {
    exam: NavExam;
    currentPath: string | null;
    forceOpen?: boolean;
    onLinkClick: () => void;
}) {
    const isComingSoon = exam.status === 'coming-soon';
    // 現在ページが exam 配下に含まれるなら open default にする（uncontrolled details の defaultOpen 相当）
    const containsActive = !!currentPath && exam.items.some((item) => item.href === currentPath);
    const shouldOpen = (forceOpen && !isComingSoon) || containsActive;
    return (
        <details
            open={shouldOpen || undefined}
            className={cn(exam.colorClass, styles.accordion, isComingSoon && styles.comingSoon)}
        >
            <summary className={styles.summary}>
                <span
                    className={styles.examIcon}
                    aria-hidden
                >
                    {exam.icon}
                </span>
                <span className="flex-1 leading-tight md:tracking-tight">{exam.label}</span>
                {isComingSoon && (
                    <span className={styles.providerCount}>
                        準備中
                    </span>
                )}
                <svg
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                    className={styles.chevron}
                >
                    <path
                        d="M2 4l4 4 4-4"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </summary>
            {!isComingSoon && (
                <ul
                    className="flex flex-col border-t border-white/[0.04]"
                    style={{ padding: '4px 6px', gap: '4px' }}
                >
                    {exam.items.map((item) => {
                        const isActive = currentPath === item.href;
                        return (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    onClick={onLinkClick}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={cn(
                                        'flex items-center justify-between gap-2 rounded-lg leading-relaxed text-[13px] text-[var(--color-muted)] transition-colors hover:bg-white/[0.06] hover:text-[var(--color-foreground)] md:rounded-xl md:text-[15px]',
                                        isActive &&
                                            'bg-white/[0.08] font-semibold text-[var(--color-foreground)]',
                                    )}
                                    style={{ padding: '10px 12px', minHeight: '44px' }}
                                >
                                    <span className="min-w-0 flex-1 whitespace-normal break-words">{item.label}</span>
                                    {isActive && (
                                        <span
                                            aria-hidden
                                            className="h-1.5 w-1.5 shrink-0 rounded-full bg-current"
                                        />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            )}
        </details>
    );
}
