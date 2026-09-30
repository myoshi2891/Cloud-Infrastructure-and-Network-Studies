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

export const DIAGRAMS: Record<string, string> = {
    'diag-1': `flowchart TB
subgraph VM["仮想マシン方式"]
    direction TB
    HW1[物理ハードウェア]
    HOST_OS[ホストOS]
    HV[ハイパーバイザー]
    subgraph VMGuest1["ゲストVM 1"]
        GOS1[ゲストOS]
        APP1[アプリA]
    end
    subgraph VMGuest2["ゲストVM 2"]
        GOS2[ゲストOS]
        APP2[アプリB]
    end
    HW1 --> HV
    HV --> VMGuest1
    HV --> VMGuest2
end

subgraph CT["コンテナ方式"]
    direction TB
    HW2[物理ハードウェア]
    HOS[ホストOS + カーネル]
    CE[コンテナランタイム]
    subgraph C1["コンテナ1"]
        CAPP1[アプリA]
    end
    subgraph C2["コンテナ2"]
        CAPP2[アプリB]
    end
    HW2 --> HOS
    HOS --> CE
    CE --> C1
    CE --> C2
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class CE,HOS highlightFill`,

    'diag-2': `flowchart LR
A[Dockerfile] -->|docker build| B[コンテナイメージ]
B -->|docker push| C[(コンテナレジストリ)]
C -->|docker pull| D[別ホストのDockerデーモン]
D -->|docker run| E[実行中のコンテナ]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class B,C highlightFill`,

    'diag-3': `flowchart TB
subgraph Before["Kubernetes以前"]
    direction TB
    SRV1[サーバー1] --- APP_A1[アプリA]
    SRV2[サーバー2] --- APP_B1[アプリB]
    SRV3[サーバー3] --- APP_C1[アプリC]
    NOTE1[["各サーバーを個別に管理・<br/>デプロイ先を手動で決定"]]
end

subgraph After["Kubernetes導入後"]
    direction TB
    CLUSTER[["Kubernetesクラスタ<br/>(統一されたデプロイ領域)"]]
    APP_A2[アプリA]
    APP_B2[アプリB]
    APP_C2[アプリC]
    CLUSTER --> APP_A2
    CLUSTER --> APP_B2
    CLUSTER --> APP_C2
    NOTE2[["宣言的なマニフェストを<br/>クラスタに提出するだけ"]]
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class CLUSTER highlightFill`,

    'diag-4': `flowchart TD
START([アプリケーションの複雑度は?]) --> Q1{マイクロサービス数は<br/>多いか?}
Q1 -->|少ない・モノリス中心| SIMPLE[シンプルなPaaS/VMで<br/>十分な可能性が高い]
Q1 -->|多数のサービス群| Q2{自動スケーリング・<br/>自己修復が必要か?}
Q2 -->|不要| SIMPLE
Q2 -->|必要| Q3{運用チームは<br/>Kubernetesを<br/>自前運用できるか?}
Q3 -->|できない・小規模チーム| MANAGED["マネージドKubernetes<br/>(GKE/EKS/AKS)を検討"]
Q3 -->|専任チームがある| SELFHOST[自前運用 or<br/>エンタープライズ<br/>ディストリビューションを検討]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
classDef warnFill fill:#5c3a1a,stroke:#d9904a,color:#ffffff
class MANAGED,SELFHOST highlightFill
class SIMPLE warnFill`,

    'diag-5': `flowchart TB
subgraph CP["コントロールプレーン"]
    direction TB
    API[kube-apiserver<br/>APIサーバー]
    ETCD[(etcd<br/>分散KVS)]
    SCHED[kube-scheduler<br/>スケジューラ]
    CM[kube-controller-manager<br/>コントローラ群]
    API <--> ETCD
    API <--> SCHED
    API <--> CM
end

subgraph WN1["ワーカーノード 1"]
    direction TB
    KUBELET1[kubelet]
    PROXY1[kube-proxy]
    CRI1[コンテナランタイム<br/>containerd等]
    POD1A[Pod]
    POD1B[Pod]
    KUBELET1 --> CRI1
    CRI1 --> POD1A
    CRI1 --> POD1B
end

subgraph WN2["ワーカーノード 2"]
    direction TB
    KUBELET2[kubelet]
    PROXY2[kube-proxy]
    CRI2[コンテナランタイム]
    POD2A[Pod]
    KUBELET2 --> CRI2
    CRI2 --> POD2A
end

API <-->|状態の報告/受信| KUBELET1
API <-->|状態の報告/受信| KUBELET2

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class API,ETCD highlightFill`,

    'diag-6': `sequenceDiagram
participant U as 開発者(kubectl)
participant API as kube-apiserver
participant ETCD as etcd
participant SCHED as kube-scheduler
participant KUBELET as kubelet(対象ノード)
participant CRI as コンテナランタイム

U->>API: マニフェストを適用<br/>(kubectl apply -f pod.yaml)
API->>ETCD: オブジェクトを永続化
API-->>U: 受理レスポンス
SCHED->>API: 未配置Podを監視(watch)
SCHED->>API: 最適ノードをバインディング
API->>ETCD: バインディング結果を保存
KUBELET->>API: 自ノード宛てのPodを監視(watch)
KUBELET->>CRI: コンテナ起動を指示
CRI-->>KUBELET: コンテナ起動完了
KUBELET->>API: Podステータスを報告
API->>ETCD: 最新状態を保存`,

    'diag-7': `flowchart LR
A["kubectl config<br/>(kubeconfig設定)"] --> B["kubectl apply -f<br/>マニフェスト適用"]
B --> C["kubectl get<br/>状態確認"]
C --> D["kubectl describe<br/>詳細調査"]
D --> E{問題あり?}
E -->|Yes| F["kubectl logs /<br/>kubectl exec<br/>デバッグ"]
F --> B
E -->|No| G["kubectl expose /<br/>kubectl scale<br/>公開・スケール"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class B,G highlightFill`,

    'diag-8': `flowchart TB
MANIFEST["YAML/JSON マニフェスト"] --> META["metadata<br/>(name, namespace, labels,<br/>annotations, uid等)"]
MANIFEST --> SPEC["spec<br/>(望ましい状態を宣言)"]
MANIFEST --> STATUS["status<br/>(実際の状態。<br/>Kubernetesが書き込む)"]

SPEC -->|"ユーザーが記述"| RECONCILE{{"コントローラが<br/> reconcile(調整)"}}
RECONCILE -->|"現実を反映"| STATUS

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class RECONCILE highlightFill`,
};
