'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';
import { SectionIntro } from './sections/SectionIntro';
import { SectionParts1to4 } from './sections/SectionParts1to4';

export function TcpipIllustratedVol1Guide() {
    return (
        <div className="tcpip-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <SectionIntro />
                    <SectionParts1to4 />
                </main>
            </div>
        </div>
    );
}
