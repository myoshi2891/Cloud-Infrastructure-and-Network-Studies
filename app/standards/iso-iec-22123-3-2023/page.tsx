import type { Metadata } from 'next';
import './page.css';
import IsoGuide from './IsoGuide';
import Intro from './sections/Intro';
import Section1 from './sections/Section1';
import Section2 from './sections/Section2';
import Section3 from './sections/Section3';
import Section4 from './sections/Section4';
import Section5 from './sections/Section5';
import Section6 from './sections/Section6';
import Section7 from './sections/Section7';
import Section8 from './sections/Section8';
import Section9 from './sections/Section9';
import Section10 from './sections/Section10';
import Section11 from './sections/Section11';
import Section12 from './sections/Section12';
import Section13 from './sections/Section13';
import Section14 from './sections/Section14';
import Section15 from './sections/Section15';
import Appendix from './sections/Appendix';

export const metadata: Metadata = { title: 'ISO/IEC 22123-3:2023 初学者向け完全ガイド｜クラウド リファレンスアーキテクチャ（CCRA）', description: 'クラウドのリファレンスアーキテクチャを、ユーザービュー・機能ビュー・横断的側面・役割から段階的に学ぶガイド。' };
/** ISO/IEC 22123-3:2023の全15章・原本20 SVG・参考ソースをサーバー描画する。 */
export default function Page() { return <IsoGuide><Intro /><Section1 /><Section2 /><Section3 /><Section4 /><Section5 /><Section6 /><Section7 /><Section8 /><Section9 /><Section10 /><Section11 /><Section12 /><Section13 /><Section14 /><Section15 /><Appendix /></IsoGuide>; }
