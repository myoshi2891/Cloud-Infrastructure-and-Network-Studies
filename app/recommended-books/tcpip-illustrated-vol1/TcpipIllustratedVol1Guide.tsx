'use client';

import { memo } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';
import { SectionIntro } from './sections/SectionIntro';
import { SectionParts1to4 } from './sections/SectionParts1to4';
import { SectionParts5to8 } from './sections/SectionParts5to8';

export function TcpipIllustratedVol1Guide() {
    return (
        <div className="tcpip-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <SectionIntro />
                    <SectionParts1to4 />
                    <SectionParts5to8 />
                </main>
            </div>
        </div>
    );
}
