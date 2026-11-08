"use client";

import { useEffect, useCallback, type MouseEvent } from "react";

interface NavBarProps {
    isOpen: boolean;
    onClose: () => void;
    onToggle: () => void;
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
        sidebar.querySelectorAll(".g").forEach((g) => g.classList.remove("open"));
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

        document.querySelectorAll("section[id]").forEach((s) => io.observe(s));

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
            <aside className={`sidebar ${isOpen ? "open" : ""}`} id="sidebar">{"\n                "}<div className={"brand"}>{"\n                    "}<svg viewBox={"0 0 48 48"} aria-hidden={"true"}>{"\n                        "}<circle cx={"24"} cy={"24"} r={"22"} fill={"#F6F7F9"} stroke={"#2E3F72"} strokeWidth={"2"}></circle>{"\n                        "}<circle cx={"24"} cy={"24"} r={"17"} fill={"none"} stroke={"#B8802A"} strokeWidth={"1.5"}></circle>{"\n                        "}<path d={"M24 12 L35 31 L13 31 Z"} fill={"none"} stroke={"#2E3F72"} strokeWidth={"1.5"}></path>{"\n                        "}<circle cx={"24"} cy={"12"} r={"3.5"} fill={"#2E3F72"}></circle>{"\n                        "}<circle cx={"35"} cy={"31"} r={"3.5"} fill={"#1B6E6A"}></circle>{"\n                        "}<circle cx={"13"} cy={"31"} r={"3.5"} fill={"#8C3A5C"}></circle>{"\n                    "}</svg>{"\n                    "}<div><b>{"CCNP Enterprise"}</b><span>{"初学者向け完全ガイド"}</span></div>{"\n                "}</div>{"\n                "}<nav aria-label={"目次"}>{"\n                    "}<ul>{"\n                        "}<li className={"g open"}>{"\n                            "}<a href={"#第1章-認定の全体像"} onClick={(e) => handleLinkClick(e, "#第1章-認定の全体像")}>{"第1章 認定の全体像"}</a>{"\n                            "}<ul className={"sub"}>{"\n                                "}<li>{"\n                                    "}<a href={"#11-ccnp-enterprise-とは"} onClick={(e) => handleLinkClick(e, "#11-ccnp-enterprise-とは")}>{"1.1 CCNP Enterprise とは"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#12-試験一覧公式ページ準拠"} onClick={(e) => handleLinkClick(e, "#12-試験一覧公式ページ準拠")}>{"1.2 試験一覧（公式ページ準拠）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#13-バージョン表記の注意重要"} onClick={(e) => handleLinkClick(e, "#13-バージョン表記の注意重要")}>{"1.3 バージョン表記の注意（重要）"}</a>{"\n                                "}</li>{"\n                                "}<li><a href={"#14-学習ロードマップ"} onClick={(e) => handleLinkClick(e, "#14-学習ロードマップ")}>{"1.4 学習ロードマップ"}</a></li>{"\n                                "}<li>{"\n                                    "}<a href={"#15-コンセントレーションの選び方"} onClick={(e) => handleLinkClick(e, "#15-コンセントレーションの選び方")}>{"1.5 コンセントレーションの選び方"}</a>{"\n                                "}</li>{"\n                            "}</ul>{"\n                        "}</li>{"\n                        "}<li className={"g"}>{"\n                            "}<a href={"#第2章-コア試験-350-401-encor"} onClick={(e) => handleLinkClick(e, "#第2章-コア試験-350-401-encor")}>{"第2章 コア試験 350-401 ENCOR"}</a>{"\n                            "}<ul className={"sub"}>{"\n                                "}<li>{"\n                                    "}<a href={"#出題配分試験内容-pdf-v12-準拠"} onClick={(e) => handleLinkClick(e, "#出題配分試験内容-pdf-v12-準拠")}>{"出題配分（試験内容 PDF v1.2 準拠）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#21-アーキテクチャ15"} onClick={(e) => handleLinkClick(e, "#21-アーキテクチャ15")}>{"2.1 アーキテクチャ（15%）"}</a>{"\n                                "}</li>{"\n                                "}<li><a href={"#22-仮想化10"} onClick={(e) => handleLinkClick(e, "#22-仮想化10")}>{"2.2 仮想化（10%）"}</a></li>{"\n                                "}<li>{"\n                                    "}<a href={"#23-インフラストラクチャ30"} onClick={(e) => handleLinkClick(e, "#23-インフラストラクチャ30")}>{"2.3 インフラストラクチャ（30%）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#24-ネットワークアシュアランス10"} onClick={(e) => handleLinkClick(e, "#24-ネットワークアシュアランス10")}>{"2.4 ネットワークアシュアランス（10%）"}</a>{"\n                                "}</li>{"\n                                "}<li><a href={"#25-セキュリティ20"} onClick={(e) => handleLinkClick(e, "#25-セキュリティ20")}>{"2.5 セキュリティ（20%）"}</a></li>{"\n                                "}<li>{"\n                                    "}<a href={"#26-自動化と人工知能15"} onClick={(e) => handleLinkClick(e, "#26-自動化と人工知能15")}>{"2.6 自動化と人工知能（15%）"}</a>{"\n                                "}</li>{"\n                            "}</ul>{"\n                        "}</li>{"\n                        "}<li className={"g"}>{"\n                            "}<a href={"#第3章-コンセントレーション試験8-種"} onClick={(e) => handleLinkClick(e, "#第3章-コンセントレーション試験8-種")}>{"第3章 コンセントレーション試験（8 種）"}</a>{"\n                            "}<ul className={"sub"}>{"\n                                "}<li>{"\n                                    "}<a href={"#31-300-410-enarsi高度なルーティングとサービス"} onClick={(e) => handleLinkClick(e, "#31-300-410-enarsi高度なルーティングとサービス")}>{"3.1 300-410 ENARSI（高度なルーティングとサービス）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#32-300-415-ensdwicatalyst-sd-wan-の実装"} onClick={(e) => handleLinkClick(e, "#32-300-415-ensdwicatalyst-sd-wan-の実装")}>{"3.2 300-415 ENSDWI（Catalyst SD-WAN の実装）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#33-300-420-ensldエンタープライズ設計"} onClick={(e) => handleLinkClick(e, "#33-300-420-ensldエンタープライズ設計")}>{"3.3 300-420 ENSLD（エンタープライズ設計）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#34-300-425-enwlsdワイヤレス設計"} onClick={(e) => handleLinkClick(e, "#34-300-425-enwlsdワイヤレス設計")}>{"3.4 300-425 ENWLSD（ワイヤレス設計）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#35-300-430-enwlsiワイヤレス実装"} onClick={(e) => handleLinkClick(e, "#35-300-430-enwlsiワイヤレス実装")}>{"3.5 300-430 ENWLSI（ワイヤレス実装）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#36-300-435-enauto自動化"} onClick={(e) => handleLinkClick(e, "#36-300-435-enauto自動化")}>{"3.6 300-435 ENAUTO（自動化）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#37-300-440-enccクラウド接続"} onClick={(e) => handleLinkClick(e, "#37-300-440-enccクラウド接続")}>{"3.7 300-440 ENCC（クラウド接続）"}</a>{"\n                                "}</li>{"\n                            "}</ul>{"\n                        "}</li>{"\n                        "}<li className={"g"}>{"\n                            "}<a href={"#第4章-横断ベストプラクティス集"} onClick={(e) => handleLinkClick(e, "#第4章-横断ベストプラクティス集")}>{"第4章 横断ベストプラクティス集"}</a>{"\n                            "}<ul className={"sub"}>{"\n                                "}<li><a href={"#41-設計の原則"} onClick={(e) => handleLinkClick(e, "#41-設計の原則")}>{"4.1 設計の原則"}</a></li>{"\n                                "}<li><a href={"#42-運用の原則"} onClick={(e) => handleLinkClick(e, "#42-運用の原則")}>{"4.2 運用の原則"}</a></li>{"\n                                "}<li><a href={"#43-セキュリティの原則"} onClick={(e) => handleLinkClick(e, "#43-セキュリティの原則")}>{"4.3 セキュリティの原則"}</a></li>{"\n                                "}<li><a href={"#44-自動化の原則"} onClick={(e) => handleLinkClick(e, "#44-自動化の原則")}>{"4.4 自動化の原則"}</a></li>{"\n                            "}</ul>{"\n                        "}</li>{"\n                        "}<li className={"g"}>{"\n                            "}<a href={"#第5章-学習計画と試験対策"} onClick={(e) => handleLinkClick(e, "#第5章-学習計画と試験対策")}>{"第5章 学習計画と試験対策"}</a>{"\n                            "}<ul className={"sub"}>{"\n                                "}<li>{"\n                                    "}<a href={"#51-8-週間の学習プラン例encor"} onClick={(e) => handleLinkClick(e, "#51-8-週間の学習プラン例encor")}>{"5.1 8 週間の学習プラン例（ENCOR）"}</a>{"\n                                "}</li>{"\n                                "}<li><a href={"#52-ラボ環境"} onClick={(e) => handleLinkClick(e, "#52-ラボ環境")}>{"5.2 ラボ環境"}</a></li>{"\n                                "}<li>{"\n                                    "}<a href={"#53-最重要コマンド早見表確認トラブルシュート"} onClick={(e) => handleLinkClick(e, "#53-最重要コマンド早見表確認トラブルシュート")}>{"5.3 最重要コマンド早見表（確認・トラブルシュート）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#54-トラブルシュートの型どの試験でも使える"} onClick={(e) => handleLinkClick(e, "#54-トラブルシュートの型どの試験でも使える")}>{"5.4 トラブルシュートの型（どの試験でも使える）"}</a>{"\n                                "}</li>{"\n                                "}<li><a href={"#55-試験当日の心構え"} onClick={(e) => handleLinkClick(e, "#55-試験当日の心構え")}>{"5.5 試験当日の心構え"}</a></li>{"\n                            "}</ul>{"\n                        "}</li>{"\n                        "}<li className={"g"}>{"\n                            "}<a href={"#第6章-用語集"} onClick={(e) => handleLinkClick(e, "#第6章-用語集")}>{"第6章 用語集"}</a>{"\n                            "}<ul className={"sub"}></ul>{"\n                        "}</li>{"\n                        "}<li className={"g"}>{"\n                            "}<a href={"#第7章-参照ソースurl"} onClick={(e) => handleLinkClick(e, "#第7章-参照ソースurl")}>{"第7章 参照ソース（URL）"}</a>{"\n                            "}<ul className={"sub"}>{"\n                                "}<li>{"\n                                    "}<a href={"#71-a-cisco-公式認定試験内容"} onClick={(e) => handleLinkClick(e, "#71-a-cisco-公式認定試験内容")}>{"7.1 A: Cisco 公式（認定・試験内容）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#72-b-cisco-公式技術資料設計製品"} onClick={(e) => handleLinkClick(e, "#72-b-cisco-公式技術資料設計製品")}>{"7.2 B: Cisco 公式技術資料（設計・製品）"}</a>{"\n                                "}</li>{"\n                                "}<li><a href={"#73-c-標準規格rfc"} onClick={(e) => handleLinkClick(e, "#73-c-標準規格rfc")}>{"7.3 C: 標準規格（RFC）"}</a></li>{"\n                                "}<li>{"\n                                    "}<a href={"#74-d-補助資料学習の理解を深める"} onClick={(e) => handleLinkClick(e, "#74-d-補助資料学習の理解を深める")}>{"7.4 D: 補助資料（学習の理解を深める）"}</a>{"\n                                "}</li>{"\n                                "}<li>{"\n                                    "}<a href={"#75-情報の鮮度に関する注意"} onClick={(e) => handleLinkClick(e, "#75-情報の鮮度に関する注意")}>{"7.5 情報の鮮度に関する注意"}</a>{"\n                                "}</li>{"\n                            "}</ul>{"\n                        "}</li>{"\n                    "}</ul>{"\n                "}</nav>{"\n            "}</aside>
        </>
    );
}
