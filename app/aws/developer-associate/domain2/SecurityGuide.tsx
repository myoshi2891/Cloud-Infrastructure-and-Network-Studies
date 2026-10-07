'use client';
import { useState } from 'react';
import { NavBar } from './NavBar';
import { ChecklistContext } from './ChecklistItem';
import { CHECK_COUNT } from './constants';
import { Step0 } from './sections/Step0';
import { Step1 } from './sections/Step1';
import { Task1Heading } from './sections/Task1Heading';
import { Step2 } from './sections/Step2';
import { Step3 } from './sections/Step3';
import { Step4 } from './sections/Step4';
import { Step5 } from './sections/Step5';
import { Step6 } from './sections/Step6';
import { Step7 } from './sections/Step7';
import { Step8 } from './sections/Step8';
import { Step9 } from './sections/Step9';
import { Task2Heading } from './sections/Task2Heading';
import { Step10 } from './sections/Step10';
import { Step11 } from './sections/Step11';
import { Step12 } from './sections/Step12';
import { Step13 } from './sections/Step13';
import { Step14 } from './sections/Step14';
import { Step15 } from './sections/Step15';
import { Step16 } from './sections/Step16';
import { Task3Heading } from './sections/Task3Heading';
import { Step17 } from './sections/Step17';
import { Step18 } from './sections/Step18';
import { Step19 } from './sections/Step19';
import { Step20 } from './sections/Step20';
import { Step21 } from './sections/Step21';
import { Step22 } from './sections/Step22';
import { Step23 } from './sections/Step23';
import { AppendixA } from './sections/AppendixA';
import { AppendixB } from './sections/AppendixB';
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
            <Task1Heading />
            <Step2 />
            <Step3 />
            <Step4 />
            <Step5 />
            <Step6 />
            <Step7 />
            <Step8 />
            <Step9 />
            <Task2Heading />
            <Step10 />
            <Step11 />
            <Step12 />
            <Step13 />
            <Step14 />
            <Step15 />
            <Step16 />
            <Task3Heading />
            <Step17 />
            <Step18 />
            <Step19 />
            <Step20 />
            <Step21 />
            <Step22 />
            <Step23 />
            <AppendixA />
            <AppendixB />
        </main>
    </ChecklistContext></div>;
}




