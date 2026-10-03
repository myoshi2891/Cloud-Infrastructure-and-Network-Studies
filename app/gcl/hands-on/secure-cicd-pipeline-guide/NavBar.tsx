'use client';

import { useEffect, useRef } from 'react';
import { NAV_ITEMS } from './constants';

/** 原本の目次と出典を保持し、スクロール・キーボード操作を同期する。 */
export default function NavBar() {
    const navRef = useRef<HTMLElement>(null);

    const activate = (id: string) => {
        navRef.current?.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
            const active = link.hash === `#${id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    };

    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) activate(entry.target.id);
                });
            },
            { rootMargin: '-20% 0px -70% 0px' },
        );
        NAV_ITEMS.forEach((item) => {
            const section = document.getElementById(item.id);
            if (section) observer.observe(section);
        });
        return () => observer.disconnect();
    }, []);

    return (
        <div className="sidebar">
            <span className="sidebar-brand">Google Cloud Challenge Lab Guide</span>
            <p className="sidebar-title">セキュアなコンテナ CI/CD パイプライン構築ガイド</p>
            <nav aria-label="ガイドの目次" ref={navRef}>
                <ul>
                    {NAV_ITEMS.map((item, index) => (
                        <li key={item.id}>
                            <a
                                href={`#${item.id}`}
                                className={index === 0 ? 'active' : undefined}
                                aria-current={index === 0 ? 'location' : undefined}
                                onClick={(event) => {
                                    const section = document.getElementById(item.id);
                                    if (!section) return;
                                    event.preventDefault();
                                    window.history.pushState(null, '', `#${item.id}`);
                                    section.focus({ preventScroll: true });
                                    section.scrollIntoView?.({
                                        behavior: 'smooth',
                                        block: 'start',
                                    });
                                    activate(item.id);
                                }}
                            >
                                <i className={item.icon} aria-hidden="true" />
                                {item.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="sidebar-source">
                元となる Challenge Lab:
                <br />{' '}
                <a
                    href="https://www.skills.google/course_templates/1164/labs/610922"
                    target="_blank"
                    rel="noopener"
                >
                    Secure Software Delivery
                </a>
            </div>
        </div>
    );
}
