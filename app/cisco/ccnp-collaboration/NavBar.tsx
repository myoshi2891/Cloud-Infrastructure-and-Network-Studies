"use client";

import { useEffect, useCallback } from "react";
import { NAV_ITEMS } from "./constants";

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
}

/**
 * CCNP Collaboration ガイド用のサイドバー目次コンポーネント。
 */
export function NavBar({ isOpen, onClose, onToggle }: NavBarProps) {
    const handleLinkClick = useCallback((href: string) => {
        onClose();
        if (href.startsWith("#")) {
            const targetId = href.slice(1);
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                targetEl.tabIndex = -1;
                targetEl.focus({ preventScroll: true });
                targetEl.scrollIntoView?.({ behavior: "instant" });
            }
        }
    }, [onClose]);

    useEffect(() => {
        if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") return;

        const sidebar = document.getElementById("sidebar");
        if (!sidebar) return;

        const itemOf = new Map<string, HTMLElement>();
        sidebar.querySelectorAll('a[href^="#"]').forEach((a) => {
            const li = a.closest("li");
            const href = a.getAttribute("href");
            if (li && href) {
                itemOf.set(href.slice(1), li as HTMLElement);
            }
        });

        const visible = new Set<Element>();
        const update = () => {
            if (!visible.size) return;
            const arr = Array.from(visible).sort((a, b) => {
                return (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING) ? -1 : 1;
            });
            const last = arr[arr.length - 1];
            sidebar.querySelectorAll("li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            const li = last ? itemOf.get(last.id) : undefined;
            if (!li) return;
            li.classList.add("active");
            const a = li.querySelector("a");
            if (a) {
                a.setAttribute("aria-current", "location");
                if (typeof a.scrollIntoView === "function") {
                    a.scrollIntoView({ block: "nearest" });
                }
            }
        };

        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (e.isIntersecting) visible.add(e.target);
                else visible.delete(e.target);
            });
            update();
        }, { rootMargin: "-20% 0px -70% 0px" });

        document.querySelectorAll("section[id], header[id]").forEach((s) => { io.observe(s); });

        return () => {
            io.disconnect();
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) {
                onClose();
                const toggle = document.querySelector(".nav-toggle") as HTMLButtonElement | null;
                toggle?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    return (
        <aside className={`sidebar ${isOpen ? 'open' : ''}`} id="sidebar">{"\n            "}<button className={"nav-toggle"} type={"button"} aria-expanded={isOpen ? 'true' : 'false'} aria-controls={"nav"} onClick={onToggle}>{"\n                "}<i className={"ti ti-menu-2"}></i>{"メニュー\n            "}</button>{"\n            "}<div className={"brand"}>{"\n                "}<svg viewBox={"0 0 48 48"} width={"40"} height={"40"} aria-hidden={"true"}>{"\n                    "}<circle cx={"24"} cy={"24"} r={"21"} fill={"none"} stroke={"currentColor"} strokeWidth={"2"}></circle>{"\n                    "}<circle cx={"24"} cy={"24"} r={"16"} fill={"none"} stroke={"currentColor"} strokeWidth={"1"}></circle>{"\n                    "}<text x={"24"} y={"29"} textAnchor={"middle"} fontSize={"12"} fill={"currentColor"}>{"\n                        CCNP\n                    "}</text>{"\n                "}</svg>{"\n                "}<div>{"\n                    "}<div className={"brand-name"}>{"CCNP Collaboration"}</div>{"\n                    "}<div className={"brand-sub"}>{"学習ガイド"}</div>{"\n                "}</div>{"\n            "}</div>{"\n            "}<nav id={"nav"} aria-label="CCNP Collaboration 学習ガイド 目次">{"\n                "}<ul>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#0-本ガイドの使い方と注意事項"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#0-本ガイドの使い方と注意事項");
            window.history.pushState(null, "", "#0-本ガイドの使い方と注意事項");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"0. 本ガイドの使い方と注意事項"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#1-認定の全体像"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#1-認定の全体像");
            window.history.pushState(null, "", "#1-認定の全体像");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"1. 認定の全体像"}</a></li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#2-まず押さえる基礎-cisco-collaboration-の全体アーキテクチャ"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#2-まず押さえる基礎-cisco-collaboration-の全体アーキテクチャ");
            window.history.pushState(null, "", "#2-まず押さえる基礎-cisco-collaboration-の全体アーキテクチャ");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"2. まず押さえる基礎: Cisco Collaboration の全体アーキテクチャ"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#3-学習ロードマップ"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#3-学習ロードマップ");
            window.history.pushState(null, "", "#3-学習ロードマップ");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"3. 学習ロードマップ"}</a></li>{"\n                    "}<li className={"part"}>{"\n                        "}<a href={"#part-a-コア試験-350-801-clcor"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#part-a-コア試験-350-801-clcor");
            window.history.pushState(null, "", "#part-a-コア試験-350-801-clcor");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"Part A. コア試験 350-801 CLCOR"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#第1章-インフラストラクチャと設計20"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#第1章-インフラストラクチャと設計20");
            window.history.pushState(null, "", "#第1章-インフラストラクチャと設計20");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"第1章 インフラストラクチャと設計（20%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#第2章-プロトコルコーデックエンドポイント20"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#第2章-プロトコルコーデックエンドポイント20");
            window.history.pushState(null, "", "#第2章-プロトコルコーデックエンドポイント20");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"第2章 プロトコル、コーデック、エンドポイント（20%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#第3章-cisco-ios-xe-ゲートウェイとメディアリソース15"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#第3章-cisco-ios-xe-ゲートウェイとメディアリソース15");
            window.history.pushState(null, "", "#第3章-cisco-ios-xe-ゲートウェイとメディアリソース15");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"第3章 Cisco IOS XE ゲートウェイとメディアリソース（15%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#第4章-コールコントロール25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#第4章-コールコントロール25");
            window.history.pushState(null, "", "#第4章-コールコントロール25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"第4章 コールコントロール（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#第5章-qos10"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#第5章-qos10");
            window.history.pushState(null, "", "#第5章-qos10");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"第5章 QoS（10%）"}</a></li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#第6章-コラボレーションアプリケーション10"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#第6章-コラボレーションアプリケーション10");
            window.history.pushState(null, "", "#第6章-コラボレーションアプリケーション10");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"第6章 コラボレーションアプリケーション（10%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"part"}>{"\n                        "}<a href={"#part-b-300-810-clica-コラボレーションアプリケーション"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#part-b-300-810-clica-コラボレーションアプリケーション");
            window.history.pushState(null, "", "#part-b-300-810-clica-コラボレーションアプリケーション");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"Part B. 300-810 CLICA コラボレーションアプリケーション"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#b1-シングルサインオンsso15"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#b1-シングルサインオンsso15");
            window.history.pushState(null, "", "#b1-シングルサインオンsso15");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"B1. シングルサインオン（SSO）（15%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#b2-cisco-unified-im-and-presencecloud-messaging30"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#b2-cisco-unified-im-and-presencecloud-messaging30");
            window.history.pushState(null, "", "#b2-cisco-unified-im-and-presencecloud-messaging30");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"B2. Cisco Unified IM and Presence、Cloud Messaging（30%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#b3-cisco-unity-connection30"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#b3-cisco-unity-connection30");
            window.history.pushState(null, "", "#b3-cisco-unity-connection30");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"B3. Cisco Unity Connection（30%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#b4-アプリケーションクライアント25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#b4-アプリケーションクライアント25");
            window.history.pushState(null, "", "#b4-アプリケーションクライアント25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"B4. アプリケーションクライアント（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"part"}>{"\n                        "}<a href={"#part-c-300-815-claccm-拡張コールコントロールとモビリティ"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#part-c-300-815-claccm-拡張コールコントロールとモビリティ");
            window.history.pushState(null, "", "#part-c-300-815-claccm-拡張コールコントロールとモビリティ");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"Part C. 300-815 CLACCM 拡張コールコントロールとモビリティ"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#c1-シグナリングおよびメディアプロトコル20"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#c1-シグナリングおよびメディアプロトコル20");
            window.history.pushState(null, "", "#c1-シグナリングおよびメディアプロトコル20");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"C1. シグナリングおよびメディアプロトコル（20%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#c2-ゲートウェイテクノロジーcmesrst10"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#c2-ゲートウェイテクノロジーcmesrst10");
            window.history.pushState(null, "", "#c2-ゲートウェイテクノロジーcmesrst10");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"C2. ゲートウェイテクノロジー（CME／SRST）（10%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#c3-cisco-unified-border-elementcube15"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#c3-cisco-unified-border-elementcube15");
            window.history.pushState(null, "", "#c3-cisco-unified-border-elementcube15");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"C3. Cisco Unified Border Element（CUBE）（15%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#c4-コールコントロールとダイヤルプラン設計25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#c4-コールコントロールとダイヤルプラン設計25");
            window.history.pushState(null, "", "#c4-コールコントロールとダイヤルプラン設計25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"C4. コールコントロールとダイヤルプラン設計（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#c5-cisco-ucm-のコールコントロール機能20"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#c5-cisco-ucm-のコールコントロール機能20");
            window.history.pushState(null, "", "#c5-cisco-ucm-のコールコントロール機能20");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"C5. Cisco UCM のコールコントロール機能（20%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#c6-モビリティ10"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#c6-モビリティ10");
            window.history.pushState(null, "", "#c6-モビリティ10");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"C6. モビリティ（10%）"}</a></li>{"\n                    "}<li className={"part"}>{"\n                        "}<a href={"#part-d-300-820-clcei-クラウドとエッジ"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#part-d-300-820-clcei-クラウドとエッジ");
            window.history.pushState(null, "", "#part-d-300-820-clcei-クラウドとエッジ");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"Part D. 300-820 CLCEI クラウドとエッジ"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#d1-主要概念25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#d1-主要概念25");
            window.history.pushState(null, "", "#d1-主要概念25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"D1. 主要概念（25%）"}</a></li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#d2-expressway-の初期設定と-b2b25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#d2-expressway-の初期設定と-b2b25");
            window.history.pushState(null, "", "#d2-expressway-の初期設定と-b2b25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"D2. Expressway の初期設定と B2B（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#d3-モバイルおよびリモートアクセスmra25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#d3-モバイルおよびリモートアクセスmra25");
            window.history.pushState(null, "", "#d3-モバイルおよびリモートアクセスmra25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"D3. モバイルおよびリモートアクセス（MRA）（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#d4-cisco-webex-テクノロジー25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#d4-cisco-webex-テクノロジー25");
            window.history.pushState(null, "", "#d4-cisco-webex-テクノロジー25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"D4. Cisco Webex テクノロジー（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"part"}>{"\n                        "}<a href={"#part-e-300-835-clauto-自動化とプログラミング"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#part-e-300-835-clauto-自動化とプログラミング");
            window.history.pushState(null, "", "#part-e-300-835-clauto-自動化とプログラミング");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"Part E. 300-835 CLAUTO 自動化とプログラミング"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#e1-ネットワークプログラマビリティの基礎10"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#e1-ネットワークプログラマビリティの基礎10");
            window.history.pushState(null, "", "#e1-ネットワークプログラマビリティの基礎10");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"E1. ネットワークプログラマビリティの基礎（10%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#e2-ユニファイドコミュニケーション25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#e2-ユニファイドコミュニケーション25");
            window.history.pushState(null, "", "#e2-ユニファイドコミュニケーション25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"E2. ユニファイドコミュニケーション（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#e3-クラウドコラボレーションwebex-api25"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#e3-クラウドコラボレーションwebex-api25");
            window.history.pushState(null, "", "#e3-クラウドコラボレーションwebex-api25");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"E3. クラウドコラボレーション（Webex API）（25%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#e4-コラボレーションエンドポイント20"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#e4-コラボレーションエンドポイント20");
            window.history.pushState(null, "", "#e4-コラボレーションエンドポイント20");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"E4. コラボレーションエンドポイント（20%）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#e5-ミーティング20"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#e5-ミーティング20");
            window.history.pushState(null, "", "#e5-ミーティング20");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"E5. ミーティング（20%）"}</a></li>{"\n                    "}<li className={"part"}>{"\n                        "}<a href={"#part-f-試験対策トラブルシュート思考法用語集"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#part-f-試験対策トラブルシュート思考法用語集");
            window.history.pushState(null, "", "#part-f-試験対策トラブルシュート思考法用語集");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"Part F. 試験対策・トラブルシュート思考法・用語集"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#f1-試験対策の進め方"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#f1-試験対策の進め方");
            window.history.pushState(null, "", "#f1-試験対策の進め方");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"F1. 試験対策の進め方"}</a></li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#f2-症状別の最初の疑いどころ"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#f2-症状別の最初の疑いどころ");
            window.history.pushState(null, "", "#f2-症状別の最初の疑いどころ");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"F2. 症状別の最初の疑いどころ"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#f3-ポートとプロトコルの早見表"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#f3-ポートとプロトコルの早見表");
            window.history.pushState(null, "", "#f3-ポートとプロトコルの早見表");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"F3. ポートとプロトコルの早見表"}</a>{"\n                    "}</li>{"\n                    "}<li className={"chap"}><a href={"#f4-用語集"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#f4-用語集");
            window.history.pushState(null, "", "#f4-用語集");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"F4. 用語集"}</a></li>{"\n                    "}<li className={"chap"}>{"\n                        "}<a href={"#f5-学習計画の例12-週間"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#f5-学習計画の例12-週間");
            window.history.pushState(null, "", "#f5-学習計画の例12-週間");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"F5. 学習計画の例（12 週間）"}</a>{"\n                    "}</li>{"\n                    "}<li className={"part"}>{"\n                        "}<a href={"#付録-参考ソース一覧url"} onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#付録-参考ソース一覧url");
            window.history.pushState(null, "", "#付録-参考ソース一覧url");
            const li = (e.currentTarget as HTMLElement).closest("li");
            document.querySelectorAll("#sidebar li.active").forEach((l) => {
                l.classList.remove("active");
                l.querySelector("a")?.removeAttribute("aria-current");
            });
            li?.classList.add("active");
            e.currentTarget.setAttribute("aria-current", "location");
        }}>{"付録. 参考ソース一覧（URL）"}</a>{"\n                    "}</li>{"\n                "}</ul>{"\n            "}</nav>{"\n        "}</aside>
    );
}
