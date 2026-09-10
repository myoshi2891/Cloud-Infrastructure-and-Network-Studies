export interface NavItem {
    id: string;
    title: string;
    icon: string;
}

export const NAV_ITEMS: readonly NavItem[] = [
    { id: 'overview', title: '全体像', icon: 'ti-layout-grid' },
    { id: 'methodology', title: '5.1 方法論', icon: 'ti-route' },
    { id: 'cabling', title: '5.2 ケーブル/物理', icon: 'ti-plug-connected' },
    { id: 'services', title: '5.3 サービス', icon: 'ti-server-2' },
    { id: 'performance', title: '5.4 パフォーマンス', icon: 'ti-gauge' },
    { id: 'tools', title: '5.5 ツール', icon: 'ti-tools' },
    { id: 'tips', title: '学習のポイント', icon: 'ti-bulb' },
    { id: 'references', title: '出典・参考資料', icon: 'ti-books' },
] as const;

export type DiagramId = 'mermaid-methodology' | 'mermaid-approaches';

export const DIAGRAMS: Record<DiagramId, string> = {
    'mermaid-methodology': `flowchart TB
A["1. 問題を特定する<br/>Identify the problem"] --> B["2. 推定原因の理論を立てる<br/>Establish a theory of probable cause"]
B --> C{"3. 理論をテストして<br/>原因を検証する"}
C -->|"原因を確認できた"| D["4. 解決に向けた<br/>行動計画を立てる"]
C -->|"確認できなかった"| E{"新しい理論を<br/>立て直せるか？"}
E -->|"はい(再検証)"| B
E -->|"いいえ(対応範囲外)"| F["上位担当者へ<br/>エスカレーション"]
D --> G["5. 解決策を実施する<br/>(または必要ならエスカレーション)"]
G --> H["6. システム全体の動作を検証し<br/>再発防止策を実施する"]
H --> I["7. 対応内容を記録する<br/>Document findings & lessons learned"]
F --> I`,
    'mermaid-approaches': `flowchart TB
subgraph TD1["トップダウン(Top-to-bottom OSI)"]
direction TB
T7["レイヤー7: アプリケーション層から確認"] --> T4["レイヤー4: トランスポート層"]
T4 --> T3["レイヤー3: ネットワーク層"]
T3 --> T2["レイヤー2: データリンク層"]
T2 --> T1["レイヤー1: 物理層まで降りていく"]
end
subgraph BU1["ボトムアップ(Bottom-to-top OSI)"]
direction TB
B1["レイヤー1: 物理層から確認"] --> B2["レイヤー2: データリンク層"]
B2 --> B3["レイヤー3: ネットワーク層"]
B3 --> B4["レイヤー4: トランスポート層"]
B4 --> B7["レイヤー7: アプリケーション層まで昇っていく"]
end
subgraph DC1["分割統治法(Divide and conquer)"]
direction TB
M["中間の層(例: レイヤー3)から開始"] --> MU["問題なければ上位層側を疑う"]
M --> MD["問題があれば下位層側を疑う"]
end`,
};
