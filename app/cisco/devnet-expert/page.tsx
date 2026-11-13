import type { Metadata } from 'next';
import '@fontsource-variable/source-serif-4/index.css';
import DevNetExpertGuide from './DevNetExpertGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Cisco Certified DevNet Expert（現 CCIE Automation）初学者向け完全ガイド',
    description: 'CCIE Automation / DevNet Expertの学習ロードマップ、5つのラボドメイン、AUTOCOR、コード例、受験前チェックリストを収録した完全ガイド。',
};

/** Cisco expert automation study guide route. */
export default function DevNetExpertPage() {
    return <DevNetExpertGuide />;
}
