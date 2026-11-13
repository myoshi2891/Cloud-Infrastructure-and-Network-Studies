'use client';
import { useCallback, useState, type ReactNode } from 'react';
import NavBar from './NavBar';
/** 静的本文をServerから受け取り、目次の開閉状態だけを所有する。 */
export default function IsoGuide({ children }: { children: ReactNode }) {
    const [open, setOpen] = useState(false);
    const close = useCallback(() => setOpen(false), []);
    const toggle = useCallback(() => setOpen(previous => !previous), []);
    return <div className="iso-22123-3-page"><div className="layout"><NavBar open={open} onClose={close} onToggle={toggle} /><main className="main">{children}</main></div></div>;
}
