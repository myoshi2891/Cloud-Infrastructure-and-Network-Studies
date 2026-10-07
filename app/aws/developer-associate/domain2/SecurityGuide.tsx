'use client';
import { useState } from 'react';
import { NavBar } from './NavBar';
import { ChecklistContext } from './ChecklistItem';
import { CHECK_COUNT } from './constants';
import { Step0 } from './sections/Step0';
import { Step1 } from './sections/Step1';
/** 全本文とチェックリストの達成件数を保持する学習ガイド。 */
export function SecurityGuide() {
    const [checked, setChecked] = useState<Set<number>>(() => new Set());
    const toggle = (index: number) => setChecked(previous => {
        const next = new Set(previous);
        if (next.has(index)) next.delete(index); else next.add(index);
        return next;
    });
    return <div className="dva-security-page"><NavBar /><ChecklistContext value={{ checked, toggle }}>
        <main className="main">
            <header className="hero">{" "}<div className="eyebrow">
{"AWS CERTIFIED DEVELOPER - ASSOCIATE (DVA-C02)"}
</div>{" "}<h1>{"ドメイン2：セキュリティ（Security）完全ガイド"}</h1>{" "}<p>{"初学者向け・ステップバイステップ解説。各項目の詳細説明、サービス／機能ごとのベストプラクティス、根拠となる公式ソースURL付き。"}</p>{" "}<div className="chips">
<span className="chip">{"配点 26%"}</span>
<span className="chip">{"3タスク・17スキル"}</span>
<span className="chip">{"24 Steps"}</span>
<span className="chip">{"Mermaid 35図"}</span>
<span className="chip">{"練習問題12問"}</span>
</div>{" "}</header>
            <div className="progress">自己採点チェックリスト達成: <b id="pcount" aria-live="polite">{checked.size} / {CHECK_COUNT}</b></div>
            <Step0 />
            <Step1 />
        </main>
    </ChecklistContext></div>;
}

