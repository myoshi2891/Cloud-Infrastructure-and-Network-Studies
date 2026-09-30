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

    'diag-9': `flowchart TB
subgraph POD["Pod (単一のネットワーク名前空間を共有)"]
    direction LR
    C1["メインコンテナ<br/>(アプリ本体)"]
    C2["サイドカーコンテナ<br/>(例: Envoyプロキシ)"]
    VOL[("共有ボリューム")]
    C1 <-->|localhost通信| C2
    C1 --- VOL
    C2 --- VOL
end
IP["Pod IP: 10.244.1.5"] --- POD

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class POD highlightFill`,

    'diag-10': `flowchart TB
subgraph LIFECYCLE["Pod起動シーケンス"]
    direction TB
    INIT1["initContainers<br/>(通常の初期化コンテナ、<br/>順に実行し完了して終了)"]
    SIDECAR["initContainers内の<br/>restartPolicy: Always<br/>(ネイティブサイドカー)"]
    MAIN["containers<br/>(メインアプリコンテナ、<br/>並行起動)"]
    INIT1 -->|完了後| SIDECAR
    SIDECAR -->|起動完了後| MAIN
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class SIDECAR highlightFill`,

    'diag-11': `stateDiagram-v2
direction LR
[*] --> Pending: Pod作成
Pending --> Running: ノードにスケジュール済みで<br/>全コンテナが作成され、少なくとも<br/>1つが実行中/起動中/再起動中
Running --> Succeeded: 全コンテナが正常終了<br/>(Job等)
Running --> Failed: いずれかのコンテナが<br/>異常終了(再起動しない設定)
Running --> Running: liveness失敗時に<br/>自動再起動
Succeeded --> [*]
Failed --> [*]`,

    'diag-12': `flowchart TD
START([コンテナ起動]) --> SP{Startup Probe<br/>設定あり?}
SP -->|あり、未成功| WAIT["Liveness/Readinessを<br/>一時停止して待機"]
WAIT --> FT{failureThreshold<br/>到達?}
FT -->|未到達| SP
FT -->|到達| KILL["コンテナを終了し<br/>restartPolicyに従う"]
SP -->|成功 or 未設定| PAR[["以降は2つのProbeが<br/>独立して並行実行"]]
PAR --> LP["Liveness Probe実行"]
PAR --> RP["Readiness Probe実行"]
LP -->|失敗| RESTART["コンテナ再起動<br/>(restartPolicyに従う)"]
LP -->|成功| LP
KILL --> START
RESTART --> START
RP -->|失敗| NOTREADY["Serviceの<br/>エンドポイントから除外"]
NOTREADY --> RP
RP -->|成功| READY["Serviceの<br/>エンドポイントに含める"]
READY --> RP

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
class READY highlightFill
class RESTART,KILL,NOTREADY dangerFill`,

    'diag-13': `flowchart LR
A["Pod削除要求<br/>(kubectl delete)"] --> B["preStopフック実行"]
B --> C["SIGTERM送信"]
C --> D{"terminationGracePeriod<br/>Seconds以内に終了?"}
D -->|Yes| E["正常終了"]
D -->|No| F["SIGKILLで強制終了"]

classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
class F dangerFill`,

    'diag-14': `flowchart TB
subgraph CLUSTER["クラスタ"]
    subgraph NS1["namespace: production"]
        P1[Pod A]
        P2[Pod B]
    end
    subgraph NS2["namespace: staging"]
        P3[Pod C]
    end
    subgraph NS3["namespace: kube-system"]
        P4[システムPod]
    end
end
P1 -.->|"NetworkPolicy未設定なら<br/>自由に到達可能"| P3

classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
class P1,P3 dangerFill`,

    'diag-15': `flowchart LR
subgraph PODS["複数のPod"]
    PA["Pod<br/>app=kiada, env=prod"]
    PB["Pod<br/>app=kiada, env=staging"]
    PC["Pod<br/>app=other, env=prod"]
end
SEL["ラベルセレクタ<br/>app=kiada,env=prod"] -->|マッチ| PA

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class PA highlightFill`,

    'diag-16': `flowchart TB
CM[("ConfigMap<br/>(平文設定)")]
SEC[("Secret<br/>(base64エンコード)")]
POD["Pod"]

CM -->|環境変数として注入| POD
CM -->|ボリュームとしてマウント| POD
SEC -->|環境変数として注入| POD
SEC -->|ボリュームとしてマウント| POD

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
class CM highlightFill
class SEC dangerFill`,

    'diag-17': `flowchart LR
A["kubectl apply -f secret.yaml"] --> B["APIサーバーが受理"]
B --> C{"etcd暗号化<br/>(EncryptionConfiguration)<br/>設定済みか?"}
C -->|"未設定(デフォルト)"| D["Base64のまま平文でetcdに保存"]
C -->|設定済み| E["AES-CBC/AES-GCM等で<br/>暗号化してetcdに保存"]

classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class D dangerFill
class E highlightFill`,

    'diag-18': `flowchart TB
subgraph TYPES["主なボリューム種別 - 原著9章"]
    direction TB
    ED["emptyDir<br/>Podと同じ寿命、<br/>コンテナ間の一時共有領域"]
    IMG["image volume<br/>コンテナイメージを<br/>そのままボリューム化(新機能)"]
    HP["hostPath<br/>ワーカーノードの<br/>ファイルシステムに直接アクセス"]
    CMV["configMap / secret volume<br/>設定値をファイルとして<br/>マウント"]
    DAPI["downwardAPI volume<br/>Podメタデータを<br/>ファイルとして公開"]
    PROJ["projected volume<br/>複数ボリュームを<br/>1つに統合"]
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
class ED,IMG,CMV,DAPI,PROJ highlightFill
class HP dangerFill`,

    'diag-19': `sequenceDiagram
participant DEV as 開発者
participant PVC as PersistentVolumeClaim
participant SC as StorageClass
participant CSI as CSIドライバ
participant PV as PersistentVolume
participant POD as Pod

DEV->>PVC: PVCを作成(容量・アクセスモードを指定)
PVC->>SC: 動的プロビジョニングを要求
SC->>CSI: 対応するストレージを確保するよう要求
CSI->>PV: PVを自動生成してPVCにバインド
DEV->>POD: PodのvolumesでPVCを参照
POD->>PV: PVにマウントして読み書き`,

    'diag-20': `flowchart TB
subgraph DYN["動的プロビジョニング(推奨)"]
    direction LR
    PVC1["PVC作成"] --> SC1["StorageClassが<br/>自動でPVを生成"]
end
subgraph STATIC["静的プロビジョニング"]
    direction LR
    ADMIN["管理者が事前に<br/>PVを手動作成"] --> PVC2["PVCがPVに<br/>バインド"]
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class DYN highlightFill`,

    'diag-21': `flowchart TB
SVC["Service<br/>clusterIP: 10.96.0.42<br/>selector: app=kiada"]
subgraph PODS["ラベル app=kiada のPod群"]
    P1["Pod A<br/>10.244.1.5"]
    P2["Pod B<br/>10.244.2.7"]
    P3["Pod C<br/>10.244.3.9"]
end
EP["EndpointSlice<br/>(自動更新される<br/>IPアドレス一覧)"]

SVC --> EP
EP --> P1
EP --> P2
EP --> P3

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class SVC,EP highlightFill`,

    'diag-22': `flowchart TD
START([外部公開の要件は?]) --> Q1{クラスタ内部のみで<br/>十分か?}
Q1 -->|Yes| CIP["ClusterIP<br/>(既定。クラスタ内DNS経由)"]
Q1 -->|No、外部公開が必要| Q2{クラウドロード<br/>バランサーを使えるか?}
Q2 -->|Yes| LB["LoadBalancer<br/>(クラウドLBを自動プロビジョニング)"]
Q2 -->|No、学習・オンプレミス| NP["NodePort<br/>(全ノードの固定ポートで公開)"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class CIP,LB highlightFill`,

    'diag-23': `flowchart TB
CLIENT["クライアント"] --> LB["クラウドロードバランサー"]
LB --> ING_CTRL["Ingressコントローラ<br/>(リバースプロキシ)"]
ING_CTRL -->|"/api/*"| SVC_A["Service: api"]
ING_CTRL -->|"/web/*"| SVC_B["Service: web"]
ING_CTRL -->|"api.example.com"| SVC_A
ING_CTRL -->|"www.example.com"| SVC_B

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class ING_CTRL highlightFill`,

    'diag-24': `flowchart TB
subgraph ROLES["ロール別のリソース分離 - 原著13.1節"]
    direction TB
    GC["GatewayClass<br/>(インフラ提供者が定義<br/>実装の種類を指定)"]
    GW["Gateway<br/>(クラスタ運用者が作成<br/>リスナー・証明書を設定)"]
    HR["HTTPRoute / GRPCRoute /<br/>TCPRoute / UDPRoute<br/>(アプリチームが作成<br/>ルーティングルールを定義)"]
    GC --> GW
    GW --> HR
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class GC,GW,HR highlightFill`,

    'diag-25': `flowchart LR
subgraph CANARY["トラフィック分割の例 - 原著13.3.2節"]
    direction LR
    ROUTE["HTTPRoute"]
    V1["Service: app-v1<br/>weight: 90"]
    V2["Service: app-v2<br/>weight: 10"]
    ROUTE -->|90%| V1
    ROUTE -->|10%| V2
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class ROUTE highlightFill`,

    'diag-26': `flowchart LR
OBSERVE["観測<br/>(現在のPod数を確認)"] --> DIFF{"望ましい状態(replicas)と<br/>差分があるか?"}
DIFF -->|"実際 < 望ましい"| CREATE["不足分のPodを作成"]
DIFF -->|"実際 > 望ましい"| DELETE["超過分のPodを削除"]
DIFF -->|一致| WAIT["待機"]
CREATE --> OBSERVE
DELETE --> OBSERVE
WAIT --> OBSERVE

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class OBSERVE highlightFill`,

    'diag-27': `flowchart TB
DEPLOY["Deployment"] --> RS_OLD["ReplicaSet(旧バージョン)<br/>replicas: 0"]
DEPLOY --> RS_NEW["ReplicaSet(新バージョン)<br/>replicas: 3"]
RS_NEW --> P1["Pod v2"]
RS_NEW --> P2["Pod v2"]
RS_NEW --> P3["Pod v2"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class DEPLOY,RS_NEW highlightFill`,

    'diag-28': `sequenceDiagram
participant D as Deployment
participant RSOLD as ReplicaSet(v1)
participant RSNEW as ReplicaSet(v2)

Note over D: RollingUpdate開始<br/>maxSurge/maxUnavailableに従う<br/>(以下は maxUnavailable: 0 の場合)
D->>RSNEW: replicas +1
RSNEW-->>D: 新Podがreadyになるまで待機<br/>(maxUnavailable: 0 のため<br/>先に旧を縮小できない)
D->>RSOLD: replicas -1
D->>RSNEW: replicas +1
RSNEW-->>D: readyを確認
D->>RSOLD: replicas -1
Note over D: 全Podの入れ替えが完了するまで繰り返す`,

    'diag-29': `flowchart TB
subgraph STRATS["デプロイ戦略の比較"]
    direction TB
    CANARY["カナリアリリース<br/>一部のトラフィックだけ<br/>新バージョンへ流す"]
    AB["A/Bテスト<br/>ユーザー属性に基づいて<br/>バージョンを振り分ける"]
    BG["Blue/Green<br/>新旧環境を並行稼働させ<br/>一斉に切り替える"]
    SHADOW["トラフィックシャドウイング<br/>本番トラフィックを複製して<br/>新バージョンへも送るが<br/>応答は使わない"]
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class CANARY highlightFill`,

    'diag-30': `flowchart TB
SS["StatefulSet: mongodb"]
HS["ヘッドレスService"]
subgraph PODS["順序付きPod"]
    direction LR
    P0["mongodb-0<br/>PVC: data-mongodb-0"]
    P1["mongodb-1<br/>PVC: data-mongodb-1"]
    P2["mongodb-2<br/>PVC: data-mongodb-2"]
end
SS --> HS
HS --> P0
HS --> P1
HS --> P2
P0 -.->|"mongodb-0.mongodb<br/>固定DNS名"| P1

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class SS,HS highlightFill`,

    'diag-31': `flowchart LR
A["mongodb-0起動"] -->|Ready後| B["mongodb-1起動"]
B -->|Ready後| C["mongodb-2起動"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class A highlightFill`,

    'diag-32': `flowchart TB
DS["DaemonSet: fluentd"]
subgraph N1["ノード1"]
    DP1["fluentd Pod"]
end
subgraph N2["ノード2"]
    DP2["fluentd Pod"]
end
subgraph N3["ノード3(新規追加)"]
    DP3["fluentd Pod<br/>(自動的に配置される)"]
end
DS --> DP1
DS --> DP2
DS -.->|"ノード追加時に自動配置"| DP3

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class DS highlightFill`,

    'diag-33': `flowchart TB
JOB["Job: data-migration<br/>completions: 5<br/>parallelism: 2"]
subgraph RUN["実行中"]
    direction LR
    P1["Pod 1<br/>実行中"]
    P2["Pod 2<br/>実行中"]
end
JOB --> RUN
RUN -->|"正常終了(Succeeded)<br/>×5回に達するまで"| DONE["Job完了"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class DONE highlightFill`,

    'diag-34': `flowchart LR
CJ["CronJob<br/>schedule: '0 2 * * *'"] -->|毎日2:00に生成| J1["Job (2026-08-27実行分)"]
CJ -->|翌日2:00に生成| J2["Job (2026-08-28実行分)"]
J1 --> P1["Pod"]
J2 --> P2["Pod"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class CJ highlightFill`,

    'diag-35': `flowchart LR
subgraph CYCLE["Kubernetesのリリースサイクル(年3回)"]
    direction LR
    A["拡張機能<br/>フリーズ"] --> B["コード/テスト<br/>フリーズ"]
    B --> C["ドキュメント<br/>フリーズ"]
    C --> D["GAリリース"]
    D -->|約4ヶ月後| A
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class D highlightFill`,

    'diag-36': `flowchart LR
subgraph OLD["従来のデバイス割り当て(Device Plugin)"]
    direction LR
    POD_OLD["Pod"] -->|"resources.limits:<br/>nvidia.com/gpu: 1"| DEV_OLD["GPUをそのまま<br/>丸ごと1枚割り当て"]
end
subgraph NEW["DRAによる割り当て"]
    direction LR
    RC["ResourceClaim<br/>(GPUの種類・共有方法を<br/>柔軟に指定)"]
    POD_NEW["Pod"] --> RC
    RC -->|"Just-In-Timeで<br/>最適なデバイスを選択"| DEV_NEW["GPU / FPGA / NIC"]
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class RC highlightFill`,

    'diag-37': `flowchart TB
subgraph BEFORE["v1.32以前: リソース変更は原則Pod再作成"]
    direction LR
    B1["spec.containers[*].resources<br/>変更"] --> B2["Pod再作成"] --> B3["接続切断・<br/>ステート消失"]
end
subgraph AFTER["v1.33以降: コンテナ単位のIn-Place Resize<br/>(ベータで既定有効)・v1.35でGA"]
    direction LR
    A1["spec.containers[*].resources<br/>変更"] --> A2["kubeletがcgroup設定を<br/>動的に更新"] --> A3["対応するリソースは<br/>Pod再作成なしで反映<br/>(resizePolicy次第で<br/>コンテナ再起動)"]
end
subgraph PODLEVEL["v1.36: Pod-level resources の<br/>インプレース変更 (ベータ・別機能)"]
    direction LR
    P1["spec.resources<br/>(Pod単位)変更"] --> P2["Pod全体のcgroup上限を<br/>インプレースで更新"]
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
class A2,A3 highlightFill
class P2 highlightFill
class B2,B3 dangerFill`,

    'diag-38': `flowchart TB
T1["2025年11月11日<br/>SIG Network + Security<br/>Response Committeeが<br/>終了を発表"] --> T2["2026年3月24日<br/>ベストエフォート<br/>メンテナンス終了"]
T2 --> T3["以降: セキュリティパッチ・<br/>バグ修正・新機能提供なし"]
T3 --> T4["既存デプロイは動作継続するが<br/>新規CVEに対して脆弱"]

classDef dangerFill fill:#5c1a1a,stroke:#d94a4a,color:#ffffff
class T3,T4 dangerFill`,

    'diag-39': `flowchart LR
A["v1.28 (2023/8)<br/>アルファ導入"] --> B["v1.29 (2023/12)<br/>ベータ・既定で有効"] --> C["v1.33 (2025/4)<br/>GA(安定版)"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class C highlightFill`,

    'diag-40': `flowchart TB
subgraph STATS["CNCF Annual Cloud Native Survey (2026年1月発表)"]
    direction TB
    S1["クラウドネイティブ技術の<br/>組織導入率: 98%"]
    S2["コンテナ利用者のうち<br/>本番環境でKubernetesを<br/>稼働: 82%(2023年は66%)"]
    S3["生成AIモデルをホストする<br/>組織のうちKubernetes上で<br/>推論ワークロードを稼働: 66%"]
    S4["AIモデルを毎日<br/>デプロイしている組織:<br/>わずか7%"]
end

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class S2 highlightFill`,

    'diag-41': `flowchart TB
STEP0["Step 0: コンテナの基礎<br/>(第0部)<br/>Docker Desktopで<br/>Hello Worldコンテナを起動"] --> STEP1
STEP1["Step 1: クラスタの仕組みを知る<br/>(第1部)<br/>kindでローカルクラスタを構築し<br/>kubectlの基本操作に慣れる"] --> STEP2
STEP2["Step 2: Podを動かす<br/>(第2部)<br/>マルチコンテナPod・<br/>ヘルスチェックを実装する"] --> STEP3
STEP3["Step 3: 設定を外出しする<br/>(第3部)<br/>ConfigMap/Secret/PVCを使って<br/>ステートフルなアプリを構築"] --> STEP4
STEP4["Step 4: 外部公開する<br/>(第4部)<br/>ServiceとGateway APIで<br/>アプリを公開する"] --> STEP5
STEP5["Step 5: 本番運用の型を学ぶ<br/>(第5部)<br/>Deployment/StatefulSetで<br/>ローリングアップデートを体験"] --> STEP6
STEP6["Step 6: 最新動向を追う<br/>(第6部)<br/>DRA・In-Place Resize等<br/>2026年時点の変化を把握"]

classDef highlightFill fill:#1a3a5c,stroke:#4a90d9,color:#ffffff
class STEP1,STEP4 highlightFill`,
};
