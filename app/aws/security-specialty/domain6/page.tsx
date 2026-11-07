import type { Metadata } from 'next';
import ScsDomain6Guide from './ScsDomain6Guide';
import './page.css';

export const metadata: Metadata = {
    title: 'SCS-C03 Domain 6: Security Foundations and Governance 完全ガイド | AWS Certified Security - Specialty',
    description: 'AWS Certified Security - Specialty (SCS-C03) Content Domain 6: Security Foundations and Governance 完全ガイド。AWS Organizations、Control Tower、組織ポリシー（SCP/RCP）、Firewall Manager、Audit Manager、Artifact、Well-Architected Toolを体系的に完全解説。',
};

export default function Page() {
    return <ScsDomain6Guide />;
}
