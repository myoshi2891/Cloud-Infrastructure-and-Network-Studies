"use client";

import { useEffect, useCallback, useRef, useState, useSyncExternalStore, type MouseEvent } from "react";
import { NAV_ITEMS } from "./constants";

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

function subscribeToHash(onChange: () => void) {
    window.addEventListener("hashchange", onChange);
    window.addEventListener("popstate", onChange);
    return () => {
        window.removeEventListener("hashchange", onChange);
        window.removeEventListener("popstate", onChange);
    };
}

function initialActiveId() {
    const fragment = window.location.hash.slice(1);
    return NAV_ITEMS.find(item => item.id === fragment)?.id ?? NAV_ITEMS[0]!.id;
}

/**
 * CCNP Service Provider ガイド用のサイドバー目次コンポーネント。
 */
export function NavBar({ isOpen, onClose, onToggle }: NavBarProps) {
    const toggleRef = useRef<HTMLButtonElement>(null);
    const initialId = useSyncExternalStore(subscribeToHash, initialActiveId, () => NAV_ITEMS[0]!.id);
    const [selectedId, setActiveId] = useState<string | null>(null);
    const activeId = selectedId ?? initialId;

    // pushStateでの直接選択は保ち、履歴・ハッシュ移動時はURLの現在地へ戻す。
    useEffect(() => subscribeToHash(() => setActiveId(null)), []);

    useEffect(() => {
        if (!isOpen) return;
        /** 開いた目次はフォーカス位置に関係なくEscapeで閉じ、開閉ボタンへフォーカスを戻す。 */
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            onClose();
            toggleRef.current?.focus();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen, onClose]);

    /** 現在地の目次リンクを更新し、必要に応じて目次内のスクロール位置を合わせる。 */
    const activateLink = useCallback((anchor: Element) => {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        sidebar.querySelectorAll("nav a").forEach((l) => {
            l.classList.remove("active");
            l.removeAttribute("aria-current");
        });
        anchor.classList.add("active");
        anchor.setAttribute("aria-current", "location");
        setActiveId((anchor.getAttribute("href") ?? "").slice(1));
        const nav = sidebar.querySelector<HTMLElement>(".nav");
        if (nav && anchor instanceof HTMLElement) {
            const top = anchor.getBoundingClientRect().top - nav.getBoundingClientRect().top + nav.scrollTop;
            if (top < nav.scrollTop + 40 || top > nav.scrollTop + nav.clientHeight - 80) {
                nav.scrollTop = Math.max(0, top - nav.clientHeight / 3);
            }
        }
    }, []);

    /** 目次を閉じて現在地・URLハッシュ・移動先のフォーカスを同期する。 */
    const handleLinkClick = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
        if (e.ctrlKey || e.metaKey) return;
        e.preventDefault();
        onClose();
        activateLink(e.currentTarget);
        if (href.startsWith("#")) {
            const targetId = href.slice(1);
            window.history.pushState(null, "", href);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.tabIndex = -1;
                targetEl.focus({ preventScroll: true });
                targetEl.scrollIntoView?.({ behavior: "instant" });
            }
        }
    }, [onClose, activateLink]);

    useEffect(() => {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;

        const links = [...sidebar.querySelectorAll("nav a[href^=\"#\"]")];
        const map = new Map<string, Element>(
            links.map((a) => [(a.getAttribute("href") ?? "").slice(1), a]),
        );
        if (typeof IntersectionObserver === "undefined") return;

        let io: IntersectionObserver;
        const observeSections = () => {
            io?.disconnect();
            const intersecting = new Set<Element>();
            const sections = NAV_ITEMS.flatMap(item => {
                const element = document.getElementById(item.id);
                return element ? [element] : [];
            }).sort((a, b) => a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1);
            const height = window.innerHeight;
            io = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            intersecting.add(entry.target);
                        } else {
                            intersecting.delete(entry.target);
                        }
                    });
                    const section = sections.find(element => intersecting.has(element));
                    const target = section && map.get(section.id);
                    if (target) activateLink(target);
                },
                { rootMargin: `${-height * 0.2}px 0px ${-height * 0.7}px 0px` },
            );

            sections.forEach(element => io.observe(element));
        };

        observeSections();
        window.addEventListener("resize", observeSections);
        return () => {
            window.removeEventListener("resize", observeSections);
            io.disconnect();
        };
    }, [activateLink]);

    return (
        <>
            <button
                type="button"
                ref={toggleRef}
                className="sidebar-toggle"
                onClick={onToggle}
                aria-expanded={isOpen}
                aria-controls="sidebar"
                aria-label="目次を開閉"
            >
                <i className="ti ti-menu-2" aria-hidden="true" />
                <span>目次</span>
            </button>

            {isOpen && (
                <button
                    type="button"
                    className="sidebar-backdrop"
                    onClick={() => {
                        onClose();
                        toggleRef.current?.focus();
                    }}
                    aria-label="目次を閉じる"
                />
            )}

            <aside id="sidebar" className={`sidebar ${isOpen ? "open" : ""}`} aria-label="ページナビゲーション">
                <div className="brand">
                    <svg className="crest" viewBox="0 0 44 44" aria-hidden="true">
                        <circle className="ring" cx="22" cy="22" r="20" />
                        <circle className="ring2" cx="22" cy="22" r="15" />
                        <path className="link" d="M22 11 L12 29 L32 29 Z" />
                        <circle className="node" cx="22" cy="11" r="3" />
                        <circle className="node" cx="12" cy="29" r="3" />
                        <circle className="node" cx="32" cy="29" r="3" />
                        <circle className="core" cx="22" cy="23" r="2.5" />
                    </svg>
                    <div>
                        <div className="brand-title">CCNP Service Provider</div>{" "}
                        <div className="brand-sub">初学者向け完全ガイド</div>{" "}
                    </div>
                </div>{" "}

                <nav className="nav" aria-label="目次">
                    <ul>
                        {NAV_ITEMS.map((item) => {
                            const levelClass = item.isChapter ? "l2" : item.isSub ? "l4" : "l3";
                            return (
                                <li key={item.id}>
                                    <a
                                        href={`#${item.id}`}
                                        className={`${levelClass}${activeId === item.id ? " active" : ""}`}
                                        aria-current={activeId === item.id ? "location" : undefined}
                                        onClick={(e) => handleLinkClick(e, `#${item.id}`)}
                                    >
                                        {item.label}
                                    </a>{" "}
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
        </>
    );
}
