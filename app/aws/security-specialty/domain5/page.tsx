import type { Metadata } from 'next';
import ScsDomain5Guide from './ScsDomain5Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'SCS-C03 Domain 5: Data Protection 完全ガイド | AWS Certified Security - Specialty',
    description: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 5: Data Protection 完全ガイド。転送中・保存中データの暗号化、KMS、CloudHSM、Secrets Manager、証明書管理をステップバイステップで完全解説。',
};

export default function Page() {
    return <ScsDomain5Guide />;
}
