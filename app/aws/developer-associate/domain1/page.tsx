import type { Metadata } from 'next';
import { DevelopmentGuide } from './DevelopmentGuide';
import '@fontsource-variable/source-serif-4/index.css';
import '@tabler/icons-webfont/tabler-icons.min.css';
import './page.css';
export const metadata: Metadata={title:"AWS DVA-C02 Domain 1: Development with AWS Services 完全ガイド",description:'AWS DVA-C02 Domain 1の全29スキル・31図・15問を学ぶ完全ガイド。Lambda、SDK、メッセージング、DynamoDBを詳しく解説。'};
/** AWS開発ガイドのServerルート。 */
export default function DevelopmentPage(){return <DevelopmentGuide />;}
