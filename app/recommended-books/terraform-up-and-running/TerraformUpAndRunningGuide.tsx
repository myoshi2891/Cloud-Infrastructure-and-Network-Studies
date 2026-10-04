// app/recommended-books/terraform-up-and-running/TerraformUpAndRunningGuide.tsx
'use client';

import { memo, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { NavBar } from './NavBar';
import { DIAGRAMS, type DiagramId } from './constants';

import { SectionIntro } from './sections/SectionIntro';
import { Section0 } from './sections/Section0';
import { Section1 } from './sections/Section1';
import { Section2 } from './sections/Section2';
import { Section3 } from './sections/Section3';
import { Section4 } from './sections/Section4';
import { Section5 } from './sections/Section5';
import { Section6 } from './sections/Section6';
import { Section7 } from './sections/Section7';
import { Section8 } from './sections/Section8';
import { Section9 } from './sections/Section9';
import { Section10 } from './sections/Section10';
import { Section11 } from './sections/Section11';
import { SectionRoadmap } from './sections/SectionRoadmap';
import { SectionAppendix } from './sections/SectionAppendix';
import { SectionReferences } from './sections/SectionReferences';

interface DiagramProps {
    id: DiagramId;
    ariaLabel: string;
}

const Diagram = memo(function Diagram({ id, ariaLabel }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={ariaLabel} preserveNaturalScale={true} />
        </div>
    );
});

/**
 * Terraform: Up and Running 実践ガイド クライアントコンポーネント。
 */
export function TerraformUpAndRunningGuide() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

    const handleCheckboxChange = (index: number) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    const completedCount = Object.values(checkedItems).filter(Boolean).length;

    return (
        <div className="terraform-up-and-running-page">
            <header className="hero">
                <div className="hero-eyebrow">
                    Terraform 実践ガイド · 初学者向けステップバイステップ解説
                </div>
                <h1>Terraform: Up and Running 実践ガイド ― 初学者のためのステップバイステップ解説</h1>
                <div className="hero-pills">
                    <span className="pill">対象: <strong>Terraform初学者</strong></span>
                    <span className="pill">対応版: <strong>Terraform 1.16系 / OpenTofu 1.12系</strong></span>
                    <span className="pill">図解: <strong>Mermaid 19点</strong></span>
                    <span className="pill">表: <strong>18件</strong></span>
                    <span className="pill">参考文献: <strong>7件</strong></span>
                </div>
            </header>

            <div className="layout">
                <NavBar
                    isOpen={sidebarOpen}
                    onToggle={() => setSidebarOpen((v) => !v)}
                    onClose={() => setSidebarOpen(false)}
                />

                <main className="main">
                    <SectionIntro Diagram={Diagram} />
                    <Section0 Diagram={Diagram} />
                    <Section1 Diagram={Diagram} />
                    <Section2 Diagram={Diagram} />
                    <Section3 Diagram={Diagram} />
                    <Section4 Diagram={Diagram} />
                    <Section5 Diagram={Diagram} />
                    <Section6 Diagram={Diagram} />
                    <Section7 Diagram={Diagram} />
                    <Section8 Diagram={Diagram} />
                    <Section9 Diagram={Diagram} />
                    <Section10 Diagram={Diagram} />
                    <Section11 Diagram={Diagram} />
                    <SectionRoadmap
                        Diagram={Diagram}
                        checkedItems={checkedItems}
                        onCheckboxChange={handleCheckboxChange}
                        completedCount={completedCount}
                    />
                    <SectionAppendix Diagram={Diagram} />
                    <SectionReferences Diagram={Diagram} />
                </main>
            </div>
        </div>
    );
}
