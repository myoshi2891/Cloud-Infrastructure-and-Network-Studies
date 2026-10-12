import type { Metadata } from 'next';
import { DeploymentGuide } from './DeploymentGuide';
import '@fontsource-variable/source-serif-4/index.css';
import './page.css';
export const metadata: Metadata = { title: "AWS DVA-C02 Domain 3: Deployment 初学者向けガイド", description: 'AWS DVA-C02 ドメイン3のデプロイを26 Steps・39図で学ぶガイド。アーティファクト準備、テスト、IaC、CI/CD、デプロイ戦略とロールバックを解説。' };
/** デプロイガイドのServerルート。 */
export default function DeploymentPage() { return <DeploymentGuide />; }
