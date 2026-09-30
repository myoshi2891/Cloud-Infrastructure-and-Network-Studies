// app/recommended-books/kubernetes-in-action/constants.ts

export interface NavItem {
    id: string;
    label: string;
    level: 'h2' | 'h3';
}

export const NAV_ITEMS: readonly NavItem[] = [
    { id: 'about', label: 'この記事について', level: 'h2' },
    { id: 'part0', label: '第0部: コンテナ技術の基礎（本書の前提知識）', level: 'h2' },
    { id: '0-1', label: '0.1 コンテナとVMの違い', level: 'h3' },
    { id: '0-2', label: '0.2 Dockerとコンテナランタイム', level: 'h3' },
    { id: '0-3', label: '0.3 OCI標準とコンテナ代替ツール', level: 'h3' },
    { id: 'part1', label: '第1部: Kubernetesを始める（原著Part 1: 第1〜4章）', level: 'h2' },
    { id: '1-1', label: '1.1 Kubernetesとは何か', level: 'h3' },
    { id: '1-2', label: '1.2 Kubernetesクラスタのアーキテクチャ', level: 'h3' },
    { id: '1-3', label: '1.3 最初のアプリケーションをデプロイする', level: 'h3' },
    { id: '1-4', label: '1.4 Kubernetes APIとオブジェクトモデル', level: 'h3' },
    { id: 'part2', label: '第2部: Podでアプリケーションを実行する（原著Part 2: 第5〜7章）', level: 'h2' },
    { id: '2-1', label: '2.1 Podの基本', level: 'h3' },
    { id: '2-2', label: '2.2 Podのライフサイクルとヘルスチェック', level: 'h3' },
    { id: '2-3', label: '2.3 名前空間・ラベル・アノテーションによる整理', level: 'h3' },
    { id: 'part3', label: '第3部: アプリケーションの設定とストレージ（原著Part 3: 第8〜10章）', level: 'h2' },
    { id: '3-1', label: '3.1 ConfigMapとSecret', level: 'h3' },
    { id: '3-2', label: '3.2 ボリューム', level: 'h3' },
    { id: '3-3', label: '3.3 PersistentVolumeによる永続化', level: 'h3' },
    { id: 'part4', label: '第4部: アプリケーションの接続と公開（原著Part 4: 第11〜13章）', level: 'h2' },
    { id: '4-1', label: '4.1 Service', level: 'h3' },
    { id: '4-2', label: '4.2 Ingress', level: 'h3' },
    { id: '4-3', label: '4.3 Gateway API', level: 'h3' },
    { id: 'part5', label: '第5部: 大規模運用のためのアプリケーション管理（原著Part 5: 第14〜18章）', level: 'h2' },
    { id: '5-1', label: '5.1 ReplicaSet', level: 'h3' },
    { id: '5-2', label: '5.2 Deployment', level: 'h3' },
    { id: '5-3', label: '5.3 StatefulSet', level: 'h3' },
    { id: '5-4', label: '5.4 DaemonSet', level: 'h3' },
    { id: '5-5', label: '5.5 JobとCronJob', level: 'h3' },
    { id: 'part6', label: '第6部: 2026年8月時点の最新動向（原著範囲外・独自追加）', level: 'h2' },
    { id: '6-1', label: '6.1 Kubernetes 1.37とリリースサイクル', level: 'h3' },
    { id: '6-2', label: '6.2 Dynamic Resource Allocation（DRA）とAIワークロード', level: 'h3' },
    { id: '6-3', label: '6.3 In-Place Pod Resize（無停止リサイズ）', level: 'h3' },
    { id: '6-4', label: '6.4 Ingress-NGINX終了とGateway API移行', level: 'h3' },
    { id: '6-5', label: '6.5 ネイティブサイドカーコンテナ', level: 'h3' },
    { id: '6-6', label: '6.6 CNCF調査に見るKubernetes導入状況', level: 'h3' },
    { id: 'roadmap', label: '学習ロードマップと認定資格', level: 'h2' },
    { id: 'checklist', label: 'ベストプラクティスチェックリスト', level: 'h2' },
    { id: 'glossary', label: '用語集', level: 'h2' },
    { id: 'references', label: '参考文献', level: 'h2' },
] as const;

export type DiagramId = string;
export const DIAGRAMS: Record<string, string> = {};
