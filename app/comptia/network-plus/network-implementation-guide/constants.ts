export interface NavItem {
    id: string;
    num: string;
    numClass?: string;
    badge?: string;
    title: string;
    icon?: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
    { id: 'overview', num: '0', title: '全体像' },
    { id: 'step1', num: '1', numClass: 'num-purple', badge: '2.1', title: 'ルーティング' },
    { id: 'step2', num: '2', numClass: 'num-teal', badge: '2.2', title: 'スイッチング' },
    { id: 'step3', num: '3', numClass: 'num-coral', badge: '2.3', title: 'ワイヤレス' },
    { id: 'step4', num: '4', numClass: 'num-pink', badge: '2.4', title: '物理設置' },
    { id: 'step5', num: '5', title: 'まとめ' },
    { id: 'references', num: '', icon: 'ti-link', title: '参考文献' },
] as const;

export type DiagramId =
    | 'diag-pie-domain'
    | 'diag-domain-pillars'
    | 'diag-route-decision'
    | 'diag-nat-pat'
    | 'diag-fhrp'
    | 'diag-vlan'
    | 'diag-stp'
    | 'diag-wireless-types'
    | 'diag-wireless-auth'
    | 'diag-physical-install';

export const DIAGRAMS: Record<DiagramId, string> = {
    'diag-pie-domain': `pie
    title Network+ N10-009 ドメイン別出題比率
    "1.0 Networking Concepts (23%)" : 23
    "2.0 Network Implementation (20%)" : 20
    "3.0 Network Operations (19%)" : 19
    "4.0 Network Security (14%)" : 14
    "5.0 Network Troubleshooting (24%)" : 24`,
    'diag-domain-pillars': `flowchart TD
A["Domain 2.0<br/>Network Implementation (20%)"] --> B["2.1 ルーティング技術<br/>(Routing)"]
A --> C["2.2 スイッチング技術<br/>(Switching)"]
A --> D["2.3 ワイヤレス機器<br/>(Wireless)"]
A --> E["2.4 物理インストレーション<br/>(Physical)"]`,
    'diag-route-decision': `flowchart TD
A["パケットの宛先アドレスを確認"] --> B{"最長プレフィックス一致<br/>(Longest Prefix Match) を選択"}
B --> C{"一致する候補経路が存在するか"}
C -->|"存在しない"| D["パケットを破棄しICMP到達不能を返す"]
C -->|"1件のみ存在"| E["その経路で転送"]
C -->|"複数存在(同一プレフィックス長・異プロトコル)"| F["Administrative Distanceが最小の経路を採用"]
C -->|"複数存在(同一プロトコル内)"| G["メトリック値が最小の経路を採用"]
F --> E
G --> E`,
    'diag-nat-pat': `flowchart LR
A["社内端末<br/>Private IP 192.168.1.10"] --> B["NAT/PATルーター"]
B -->|"送信元IPとポートを変換テーブルに記録"| C["インターネット<br/>Public IP 203.0.113.5"]
C --> D["宛先サーバー"]
D -->|"応答パケット"| C
C --> B
B -->|"変換テーブルを参照し元のIPへ戻す"| A`,
    'diag-fhrp': `flowchart TD
Client["クライアント端末<br/>デフォルトゲートウェイ=VIP"] --> VIP["仮想IPアドレス<br/>例 192.168.1.1"]
VIP --> R1["ルーターA (Active)"]
R1 -.->|"障害検知時に自動切替"| R2["ルーターB (Standby)"]`,
    'diag-vlan': `flowchart TB
SW["L2スイッチ"] --> V10["VLAN 10<br/>営業部門"]
SW --> V20["VLAN 20<br/>開発部門"]
SW --> V99["VLAN 99<br/>管理用 (Native VLAN)"]
V10 --> PC1["PC・IP電話"]
V20 --> PC2["開発者端末"]`,
    'diag-stp': `stateDiagram-v2
[*] --> Blocking
Blocking --> Listening : タイマー経過
Listening --> Learning : タイマー経過
Learning --> Forwarding : タイマー経過
Forwarding --> Blocking : トポロジー変化を検知`,
    'diag-wireless-types': `flowchart LR
subgraph Infra["インフラストラクチャモード"]
AP["アクセスポイント AP"] --- STA1["端末1"]
AP --- STA2["端末2"]
end
subgraph AdHoc["アドホックモード"]
D1["端末A"] --- D2["端末B"]
end
subgraph Mesh["メッシュネットワーク"]
M1["AP1"] --- M2["AP2"]
M2 --- M3["AP3"]
M1 --- M3
end`,
    'diag-wireless-auth': `flowchart TD
A["クライアントがSSIDを検出"] --> B{"認証方式は"}
B --> |"Open (認証なし)"| C["すぐに関連付け (Association)"]
B --> |"OWE (Enhanced Open)"| C2["非認証Diffie-Hellman鍵交換 (OWE)"]
B --> |"WPA2-Personal (PSK)"| D["事前共有鍵 (PSK) による4ウェイハンドシェイク"]
B --> |"WPA3-Personal (SAE)"| D2["SAE (Dragonfly) ハンドシェイク"]
B --> |"Enterprise (802.1X)"| E["RADIUSサーバーへ認証情報を転送"]
D --> F["暗号鍵を生成し通信開始"]
D2 --> F
E --> F
C2 --> F
C --> G["暗号化なしで通信開始"]`,
    'diag-physical-install': `flowchart TD
A["現地調査 (Site Survey)"] --> B["ラック配置・スペース計画"]
B --> C["配線計画 (ケーブルマネジメント)"]
C --> D["電源設計 (UPS・PDU・冗長化)"]
D --> E["環境要因の確認 (温度・湿度・防火)"]
E --> F["ラベリングとドキュメント化"]`,
};
