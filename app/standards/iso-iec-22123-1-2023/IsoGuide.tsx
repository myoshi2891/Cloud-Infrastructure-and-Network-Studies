'use client';
import { useState, type ReactNode } from 'react';
import NavBar from './NavBar';

/** 本文はサーバーで描画し、目次の開閉状態だけをクライアントで保持する。 */
export default function IsoGuide({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    return <div className="iso-22123-page"><div className="layout"><NavBar open={open} onClose={() => setOpen(false)} onToggle={() => setOpen(value => !value)} /><main className="main">{children}</main></div></div>;
}
