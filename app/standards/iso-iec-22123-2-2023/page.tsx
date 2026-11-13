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
import Section16 from './sections/Section16';
import Section17 from './sections/Section17';

export const metadata: Metadata = { title: 'ISO/IEC 22123-2:2023 初学者向け解説ガイド', description: 'クラウドの特性、能力タイプ、サービスカテゴリ、役割、データ、仮想化をステップバイステップで学ぶ概念ガイド。' };
/** ISO/IEC 22123-2:2023の全章と原本SVGをサーバー描画する。 */
export default function Page() { return <IsoGuide><Intro /><Section1 /><Section2 /><Section3 /><Section4 /><Section5 /><Section6 /><Section7 /><Section8 /><Section9 /><Section10 /><Section11 /><Section12 /><Section13 /><Section14 /><Section15 /><Section16 /><Section17 /></IsoGuide>; }
