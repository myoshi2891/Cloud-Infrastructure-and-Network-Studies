"use client";

import { useEffect, useCallback, type MouseEvent } from "react";
import { NAV_ITEMS, type NavItem } from "./constants";

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

const NAV_GROUPS: { chapter: NavItem; items: NavItem[] }[] = [];
for (const item of NAV_ITEMS) {
    if (item.isChapter) {
        NAV_GROUPS.push({ chapter: item, items: [] });
    } else {
        NAV_GROUPS.at(-1)?.items.push(item);
    }
}

/**
 * CCNP Enterprise ガイド用のサイドバー目次コンポーネント。
 */
export function NavBar({ isOpen, onClose, onToggle }: NavBarProps) {
    const activateLink = useCallback((anchor: Element) => {
        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;
        sidebar.querySelectorAll("nav a").forEach((l) => {
            l.classList.remove("active");
            l.removeAttribute("aria-current");
        });
        sidebar.querySelectorAll(".g").forEach((g) => {
            g.classList.remove("open");
        });
        anchor.classList.add("active");
        anchor.setAttribute("aria-current", "location");
        const g = anchor.closest(".g");
        if (g) g.classList.add("open");
    }, []);

    const handleLinkClick = useCallback((e: MouseEvent<HTMLAnchorElement>, href: string) => {
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
        if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;

        const links = [...sidebar.querySelectorAll("nav a[href^=\"#\"]")];
        const map = new Map<string, Element>(
            links.map((a) => [(a.getAttribute("href") ?? "").slice(1), a]),
        );

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    const a = map.get(entry.target.id);
                    if (!a) return;
                    activateLink(a);
                });
            },
            { rootMargin: "-20% 0px -70% 0px" },
        );

        NAV_ITEMS.forEach(({ href }) => {
            const target = document.getElementById(href.slice(1));
            if (target) io.observe(target);
        });

        return () => io.disconnect();
    }, [activateLink]);

    return (
        <>
            <button
                type="button"
                className="menu-toggle"
                onClick={onToggle}
                aria-label="目次を開閉"
                aria-expanded={isOpen}
            >
                <i className="ti ti-menu-2" />
            </button>
            <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">{"\n                "}<div className={"brand"}>{"\n                    "}<svg viewBox={"0 0 48 48"} aria-hidden={"true"}>{"\n                        "}<circle cx={"24"} cy={"24"} r={"22"} fill={"#F6F7F9"} stroke={"#2E3F72"} strokeWidth={"2"}></circle>{"\n                        "}<circle cx={"24"} cy={"24"} r={"17"} fill={"none"} stroke={"#B8802A"} strokeWidth={"1.5"}></circle>{"\n                        "}<path d={"M24 12 L35 31 L13 31 Z"} fill={"none"} stroke={"#2E3F72"} strokeWidth={"1.5"}></path>{"\n                        "}<circle cx={"24"} cy={"12"} r={"3.5"} fill={"#2E3F72"}></circle>{"\n                        "}<circle cx={"35"} cy={"31"} r={"3.5"} fill={"#1B6E6A"}></circle>{"\n                        "}<circle cx={"13"} cy={"31"} r={"3.5"} fill={"#8C3A5C"}></circle>{"\n                    "}</svg>{"\n                    "}<div><b>{"CCNP Enterprise"}</b><span>{"初学者向け完全ガイド"}</span></div>{"\n                "}</div>{"\n                "}
            <nav aria-label="目次">
                <ul>
                    {NAV_GROUPS.map(({ chapter, items }, index) => (
                        <li className={index === 0 ? "g open" : "g"} key={chapter.href}>
                            <a href={chapter.href} onClick={(e) => handleLinkClick(e, chapter.href)}>
                                {chapter.text}
                            </a>{"\n"}
                            <ul className="sub">
                                {items.map((item) => (
                                    <li key={item.href}>
                                        <a href={item.href} onClick={(e) => handleLinkClick(e, item.href)}>
                                            {item.text}
                                        </a>{"\n"}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </nav>
            {"\n            "}</aside>
        </>
    );
}
