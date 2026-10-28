import '@tabler/icons-webfont/tabler-icons.min.css';
import type { Metadata } from 'next';
import { TroubleshootingGuide } from './TroubleshootingGuide';
import '@fontsource-variable/source-serif-4/index.css';
import './page.css';
export const metadata: Metadata = {title: "AWS DVA-C02 Content Domain 4: Troubleshooting and Optimization 初学者向けステップバイステップ解説ガイド", description: 'AWS DVA-C02 Domain 4の全3タスク・25 Stepsを、159表・34図・25コード例で学ぶトラブルシューティングと最適化のガイド。'};
/** Domain 4学習ガイドのServer入口。 */
export default function Page() { return <TroubleshootingGuide />; }
