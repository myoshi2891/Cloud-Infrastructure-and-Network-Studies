// app/recommended-books/kubernetes-in-action/page.tsx
import type { Metadata } from 'next';
import { KubernetesInActionGuide } from './KubernetesInActionGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'Kubernetes in Action, Second Edition 完全解説ガイド ― 初学者のためのステップバイステップ入門',
    description:
        'Marko Lukša 著『Kubernetes in Action, Second Edition』を軸に、コンテナの基礎からPod・ストレージ・Service・Gateway API・ワークロード管理、2026年最新動向まで完全解説。',
};

export default function KubernetesInActionPage() {
    return <KubernetesInActionGuide />;
}
