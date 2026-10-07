import type { Metadata } from 'next';
import { SecurityGuide } from './SecurityGuide';
import './page.css';
export const metadata: Metadata = { title: "AWS DVA-C02 ドメイン2 セキュリティ完全ガイド", description: 'AWS DVA-C02 ドメイン2 セキュリティを24 Steps・35図・12問で学ぶ完全ガイド。IAM、Cognito、KMS、暗号化、機密データ管理を詳しく解説。' };
/** セキュリティガイドのServerルート。 */
export default function SecurityPage() { return <SecurityGuide />; }
