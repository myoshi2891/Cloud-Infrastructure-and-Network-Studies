import type { Metadata } from 'next';
import './page.css';
import IsoGuide from './IsoGuide';
import Foundation from './sections/Foundation';
import Models from './sections/Models';
import Services from './sections/Services';
import Data from './sections/Data';
import Practice from './sections/Practice';
import Appendix from './sections/Appendix';

export const metadata: Metadata = {
    title: 'ISO/IEC 22123-1:2023 クラウドコンピューティング 用語 初学者向け解説',
    description: 'ISO/IEC 22123-1:2023 のクラウド用語、配備モデル、役割、主要特性、相互運用性と可搬性、SLA、データ分類をステップバイステップで学ぶガイド。',
};

/** 全文と原本の描画済みSVGをサーバーで構成し、操作だけをClientへ委譲する。 */
export default function Page() {
    return <IsoGuide><Foundation /><Models /><Services /><Data /><Practice /><Appendix /></IsoGuide>;
}
