import type { Metadata } from 'next';
import SecuritySpecialtyGuide from './SecuritySpecialtyGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'AWS Certified Security - Specialty (SCS-C03) 初学者向けステップバイステップ完全ガイド',
    description: 'SCS-C03全6ドメイン・16タスクを101表・40図・27コードと8問の確認問題で学ぶ完全ガイド。',
};

/** SCS-C03の公式試験範囲に沿った学習ページ。 */
export default function SecuritySpecialtyPage() { return <SecuritySpecialtyGuide />; }
