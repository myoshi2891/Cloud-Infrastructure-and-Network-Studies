'use client';

import React, { memo, useEffect, useState } from 'react';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';
import { NavBar } from './NavBar';

interface DiagramProps {
    id: DiagramId;
    label: string;
}

const Diagram = memo(function Diagram({ id, label }: DiagramProps) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="diagram-wrap">
            <div className="diagram" id={id} aria-label={label} data-preserve-natural-scale="true">
                <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale />
            </div>
        </div>
    );
});

/**
 * CompTIA Network+ (N10-009) Domain 2.0 Network Implementation 完全解説ガイドコンポーネント (Client Component)
 */
export function ComptiaNetworkImplementationGuide() {
    const [progress, setProgress] = useState<number>(0);

    useEffect(() => {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setProgress(pct);
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        return () => {
            window.removeEventListener('scroll', updateProgress);
        };
    }, []);

    return (
        <div className="comptia-network-implementation-page">
            <div className="progress-track">
                <div
                    className="progress-fill"
                    id="progressFill"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
            <div className="layout">
                <NavBar />
                <main className="content main-content">
                    <header className="hero">
                        <div className="hero-main">
                            <span className="chip">
                                <i className="ti ti-certificate"></i>CompTIA Network+ (N10-009)
                            </span>
                            <h1>Network Implementation ドメイン 徹底解説ガイド</h1>
                            <p className="lede">
                                初学者向けにステップバイステップで整理した、CompTIA Network+
                                の「ネットワークの実装」ドメインの解説です。
                            </p>
                        </div>
                        <div className="hero-stat">
                            <div className="hero-stat-value">
                                20<span>%</span>
                            </div>
                            <div className="hero-stat-label">
                                試験全体に占める<br />出題比率（Domain 2.0）
                            </div>
                        </div>
                    </header>

                    <section id="overview" tabIndex={-1}>
                        <h2>
                            <i className="ti ti-layout-dashboard"></i>Step 0: 全体像を掴む
                        </h2>
                        <p>
                            CompTIA Network+ (N10-009)
                            は2024年6月に発表された最新バージョン（V9）です。試験は最大90問（多肢選択式とパフォーマンスベース問題の混在）、制限時間90分、合格ラインは900点満点中720点です。試験は5つのドメインで構成されています。
                        </p>

                        <table>
                            <caption>Network+ N10-009 ドメイン別出題比率</caption>
                            <thead>
                                <tr>
                                    <th scope="col">ドメイン番号</th>
                                    <th scope="col">ドメイン名</th>
                                    <th scope="col">出題比率</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1.0</td>
                                    <td>Networking Concepts（ネットワークの概念）</td>
                                    <td>23%</td>
                                </tr>
                                <tr>
                                    <td>2.0</td>
                                    <td>
                                        <strong>Network Implementation（ネットワークの実装）</strong>
                                    </td>
                                    <td>
                                        <strong>20%</strong>
                                    </td>
                                </tr>
                                <tr>
                                    <td>3.0</td>
                                    <td>Network Operations（ネットワークの運用）</td>
                                    <td>19%</td>
                                </tr>
                                <tr>
                                    <td>4.0</td>
                                    <td>Network Security（ネットワークセキュリティ）</td>
                                    <td>14%</td>
                                </tr>
                                <tr>
                                    <td>5.0</td>
                                    <td>Network Troubleshooting（トラブルシューティング）</td>
                                    <td>24%</td>
                                </tr>
                            </tbody>
                        </table>

                        <Diagram
                            id="diag-pie-domain"
                            label="Network+ N10-009 ドメイン別出題比率円グラフ"
                        />

                        <p>
                            Network
                            Implementationドメインは、公式の出題範囲上、次の4つのサブ領域（2.1〜2.4）で構成されています。「L3のルーティング
                            → L2のスイッチング → 無線 →
                            物理層」という、ネットワークを実際に組み立てる順序に沿って整理されています。
                        </p>

                        <div className="pillars">
                            <div className="pillar pillar-purple">
                                <i className="ti ti-route"></i>
                                <div className="pillar-title">2.1 ルーティング技術</div>
                                <div className="pillar-desc">静的/動的ルーティング、NAT/PAT、FHRP</div>
                            </div>
                            <div className="pillar pillar-teal">
                                <i className="ti ti-topology-star-3"></i>
                                <div className="pillar-title">2.2 スイッチング技術</div>
                                <div className="pillar-desc">VLAN、STP、MTU</div>
                            </div>
                            <div className="pillar pillar-coral">
                                <i className="ti ti-wifi"></i>
                                <div className="pillar-title">2.3 ワイヤレス機器</div>
                                <div className="pillar-desc">Wi-Fi規格、暗号化、認証</div>
                            </div>
                            <div className="pillar pillar-pink">
                                <i className="ti ti-building-warehouse"></i>
                                <div className="pillar-title">2.4 物理インストレーション</div>
                                <div className="pillar-desc">設置・電源・環境要因</div>
                            </div>
                        </div>

                        <Diagram
                            id="diag-domain-pillars"
                            label="Domain 2.0 4つのサブ領域の構成図"
                        />

                        <div className="callout callout-info">
                            <div className="callout-title">
                                <i className="ti ti-info-circle"></i>補足
                            </div>{' '}
                            <p>
                                旧バージョン（N10-008）ではデバイス比較の一部もこのドメインに含まれていましたが、N10-009では該当内容がDomain
                                1.0（Networking
                                Concepts）側に整理し直されています。教材購入時は必ず「N10-009」対応版であることを確認してください。
                            </p>
                        </div>
                    </section>

                    <section id="step1" tabIndex={-1}>
                        <div className="step-tag">
                            <span className="chip chip-purple">Objective 2.1</span>
                        </div>
                        <h2>
                            <i className="ti ti-route accent-purple"></i>Step 1: ルーティング技術を理解する
                        </h2>
                        <p>
                            ルーティングとは、異なるネットワーク（サブネット）間でパケットを転送する仕組みです。ここではルーターがどのように経路を決めているかを段階的に理解します。
                        </p>

                        <h3>1-1. 静的ルーティングと動的ルーティング</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">静的ルーティング (Static)</th>
                                    <th scope="col">動的ルーティング (Dynamic)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>設定方法</td>
                                    <td>管理者が手動で経路を1件ずつ設定</td>
                                    <td>プロトコルが自動で経路を学習・交換</td>
                                </tr>
                                <tr>
                                    <td>変化への対応</td>
                                    <td>構成変更時は手動修正が必要</td>
                                    <td>障害を自動検知し経路を再計算</td>
                                </tr>
                                <tr>
                                    <td>負荷</td>
                                    <td>ほぼゼロ</td>
                                    <td>制御パケット交換により一定の負荷</td>
                                </tr>
                                <tr>
                                    <td>向いている環境</td>
                                    <td>小規模・経路数が少ない環境</td>
                                    <td>中〜大規模で変化が多い環境</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>1-2. 主要な動的ルーティングプロトコル</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">プロトコル</th>
                                    <th scope="col">分類</th>
                                    <th scope="col">主な用途</th>
                                    <th scope="col">経路選択の基準</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>OSPF</td>
                                    <td>リンクステート型 IGP</td>
                                    <td>企業内ネットワーク（AS内）</td>
                                    <td>コスト（帯域幅ベース）</td>
                                </tr>
                                <tr>
                                    <td>EIGRP</td>
                                    <td>ハイブリッド型 IGP（Cisco独自）</td>
                                    <td>企業内ネットワーク（AS内）</td>
                                    <td>帯域幅・遅延の複合値</td>
                                </tr>
                                <tr>
                                    <td>BGP</td>
                                    <td>パスベクター型 EGP</td>
                                    <td>AS間・インターネット全体</td>
                                    <td>AS-PATH長などのポリシー属性</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            IGP（Interior Gateway
                            Protocol）は自組織内（1つの自律システム＝AS）向け、EGP（Exterior Gateway
                            Protocol）は組織間・インターネット全体向け、という役割分担で整理すると覚えやすくなります。
                        </p>

                        <h3>1-3. ルート選択の基準：Administrative DistanceとMetric</h3>
                        <Diagram
                            id="diag-route-decision"
                            label="ルート選択の判断基準フローチャート"
                        />

                        <p>
                            Administrative
                            Distance（AD）は「どのルーティング情報源をどれだけ信頼するか」を示す0〜255の指標で、値が小さいほど優先されます。代表的なデフォルト値は次のとおりです。
                        </p>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">経路情報源</th>
                                    <th scope="col">デフォルトAD値</th>
                                    <th scope="col">備考</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>直接接続 (Connected)</td>
                                    <td>
                                        <strong>0</strong>
                                    </td>
                                    <td>最優先</td>
                                </tr>
                                <tr>
                                    <td>静的ルート (Static)</td>
                                    <td>
                                        <strong>1</strong>
                                    </td>
                                    <td>手動設定は原則優先される</td>
                                </tr>
                                <tr>
                                    <td>EIGRP</td>
                                    <td>
                                        <strong>90</strong>
                                    </td>
                                    <td>内部経路</td>
                                </tr>
                                <tr>
                                    <td>OSPF</td>
                                    <td>
                                        <strong>110</strong>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>BGP（外部）</td>
                                    <td>
                                        <strong>20</strong>
                                    </td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>BGP（内部）</td>
                                    <td>
                                        <strong>200</strong>
                                    </td>
                                    <td>最も信頼度が低い部類</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>1-4. アドレス変換：NATとPAT</h3>
                        <p>
                            NAT (Network Address Translation)
                            は、プライベートIPアドレスをパブリックIPアドレスに変換してインターネット通信を可能にする技術です。PAT
                            (Port Address Translation)
                            はNATの一種で、ポート番号を組み合わせることで1つのパブリックIPを複数の内部端末で共有できるようにします。
                        </p>
                        <Diagram id="diag-nat-pat" label="NAT/PAT アドレス変換の仕組み" />

                        <h3>1-5. 冗長化の仕組み：FHRPとVIP</h3>
                        <p>
                            FHRP (First Hop Redundancy Protocol)
                            は、クライアントのデフォルトゲートウェイを冗長化する仕組みです。複数台のルーターで1つの仮想IPアドレス（VIP）を共有し、Active機器の障害時も設定変更なしに自動でStandby機器へ切り替わります（代表例：HSRP、VRRP）。
                        </p>
                        <Diagram id="diag-fhrp" label="FHRPとVIPによる冗長化" />

                        <h3>1-6. サブインターフェース (Subinterfaces)</h3>
                        <p>
                            1つの物理インターフェースを論理的に複数に分割し、それぞれに異なるVLANやIPアドレスを割り当てる仕組みです。「Router
                            on a
                            Stick」と呼ばれる構成で、1本の物理トランクリンクを通じて複数VLAN間のルーティングを行う際によく使われます。
                        </p>
                    </section>

                    <section id="step2" tabIndex={-1}>
                        <div className="step-tag">
                            <span className="chip chip-teal">Objective 2.2</span>
                        </div>
                        <h2>
                            <i className="ti ti-topology-star-3 accent-teal"></i>Step 2:
                            スイッチング技術を理解する
                        </h2>
                        <p>
                            スイッチはOSI参照モデルの主にデータリンク層（レイヤー2）で動作し、MACアドレスを基にフレームを転送します。ここでは実務で頻出するVLAN・インターフェース設定・STP・MTUを扱います。
                        </p>

                        <h3>2-1. VLANの基本</h3>
                        <p>
                            VLAN (Virtual LAN)
                            は1台の物理スイッチを論理的に複数のブロードキャストドメインへ分割する技術です。部署やセキュリティ要件ごとにネットワークを分離でき、物理配線を変更せず柔軟な構成変更が可能になります。
                        </p>
                        <Diagram id="diag-vlan" label="VLANによるネットワーク分割" />

                        <h3>2-2. インターフェース設定</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">ポートタイプ</th>
                                    <th scope="col">役割</th>
                                    <th scope="col">通過するVLAN数</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>アクセスポート (Access)</td>
                                    <td>エンドユーザー端末を接続する</td>
                                    <td>1つのVLANのみ</td>
                                </tr>
                                <tr>
                                    <td>トランクポート (Trunk)</td>
                                    <td>
                                        スイッチ間・ルーターとの接続に使用し複数VLANのタグ付きフレームを運ぶ
                                    </td>
                                    <td>複数（802.1Qでタグ付け）</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>2-3. スパニングツリープロトコル (STP)</h3>
                        <p>
                            STPは冗長経路を持つスイッチ環境で発生しうる「ループ」を防ぐためのプロトコルです。各ポートは以下の状態を段階的に遷移し、最終的にループのない論理トポロジーを構築します。
                        </p>
                        <Diagram id="diag-stp" label="STPポート状態遷移図" />
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">状態</th>
                                    <th scope="col">動作内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Blocking</td>
                                    <td>BPDUは受信するがフレーム転送やMAC学習は行わない</td>
                                </tr>
                                <tr>
                                    <td>Listening</td>
                                    <td>BPDUの送受信でトポロジーを把握するが転送はしない</td>
                                </tr>
                                <tr>
                                    <td>Learning</td>
                                    <td>MACアドレステーブルの学習を開始するが転送はしない</td>
                                </tr>
                                <tr>
                                    <td>Forwarding</td>
                                    <td>通常どおりフレームを転送する（ループなしと判断された状態）</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>2-4. MTUとジャンボフレーム</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">標準MTU</th>
                                    <th scope="col">ジャンボフレーム</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>一般的なサイズ</td>
                                    <td>1500バイト（Ethernet標準）</td>
                                    <td>9000バイト前後（機器依存）</td>
                                </tr>
                                <tr>
                                    <td>主な用途</td>
                                    <td>一般的なLAN通信</td>
                                    <td>ストレージネットワーク（iSCSIなど）や高スループット通信</td>
                                </tr>
                                <tr>
                                    <td>注意点</td>
                                    <td>経路上の全機器で同一MTU設定が必要</td>
                                    <td>経路上の全機器でジャンボフレーム対応が必須</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="step3" tabIndex={-1}>
                        <div className="step-tag">
                            <span className="chip chip-coral">Objective 2.3</span>
                        </div>
                        <h2>
                            <i className="ti ti-wifi accent-coral"></i>Step 3:
                            ワイヤレス機器とテクノロジーを理解する
                        </h2>
                        <p>
                            無線LANの設計では、周波数帯・SSID設計・暗号化方式・アクセスポイントの配置などを総合的に検討します。
                        </p>

                        <h3>3-1. 周波数帯とWi-Fi規格</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">規格</th>
                                    <th scope="col">Wi-Fi世代名</th>
                                    <th scope="col">周波数帯</th>
                                    <th scope="col">理論上の最大速度（目安）</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>802.11a</td>
                                    <td>-</td>
                                    <td>5 GHz</td>
                                    <td>約54 Mbps</td>
                                </tr>
                                <tr>
                                    <td>802.11b</td>
                                    <td>-</td>
                                    <td>2.4 GHz</td>
                                    <td>約11 Mbps</td>
                                </tr>
                                <tr>
                                    <td>802.11g</td>
                                    <td>-</td>
                                    <td>2.4 GHz</td>
                                    <td>約54 Mbps</td>
                                </tr>
                                <tr>
                                    <td>802.11n</td>
                                    <td>Wi-Fi 4</td>
                                    <td>2.4 GHz / 5 GHz</td>
                                    <td>約600 Mbps</td>
                                </tr>
                                <tr>
                                    <td>802.11ac</td>
                                    <td>Wi-Fi 5</td>
                                    <td>5 GHz</td>
                                    <td>約3.5 Gbps</td>
                                </tr>
                                <tr>
                                    <td>802.11ax</td>
                                    <td>Wi-Fi 6 / 6E</td>
                                    <td>2.4 GHz / 5 GHz（6Eは6 GHz帯追加）</td>
                                    <td>約9.6 Gbps</td>
                                </tr>
                                <tr>
                                    <td>802.11be</td>
                                    <td>Wi-Fi 7</td>
                                    <td>2.4 GHz / 5 GHz / 6 GHz</td>
                                    <td>数十Gbps級（理論値）</td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="callout callout-warning">
                            <div className="callout-title">
                                <i className="ti ti-alert-triangle"></i>注意
                            </div>{' '}
                            <p>
                                理論上の最大速度はカタログスペック上の値であり、実際のスループットは電波環境・端末数・干渉などで大きく変動します。試験対策としては「世代が新しいほど高速・高効率になる」という相対的な順序を押さえれば十分です。
                            </p>
                        </div>
                        <p>
                            2.4GHzは障害物に強く到達距離が長い一方、干渉を受けやすいという特徴があります。5GHz・6GHz帯は高速通信が可能な一方、直進性が強く障害物に弱いため、設置場所の設計（チャネル選定含む）が重要になります。
                        </p>

                        <h3>3-2. ネットワークタイプ</h3>
                        <Diagram id="diag-wireless-types" label="無線ネットワークタイプ" />

                        <h3>3-3. 認証と暗号化方式</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">方式</th>
                                    <th scope="col">暗号化アルゴリズム</th>
                                    <th scope="col">現在の位置づけ</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>WEP</td>
                                    <td>RC4（脆弱性あり）</td>
                                    <td>非推奨・使用すべきではない</td>
                                </tr>
                                <tr>
                                    <td>WPA</td>
                                    <td>RC4 + TKIP</td>
                                    <td>非推奨（WEPの応急的な後継）</td>
                                </tr>
                                <tr>
                                    <td>WPA2</td>
                                    <td>AES-CCMP</td>
                                    <td>長らく標準として広く利用</td>
                                </tr>
                                <tr>
                                    <td>WPA3</td>
                                    <td>AES-GCMP、SAEによる強固な鍵交換</td>
                                    <td>現行の推奨規格</td>
                                </tr>
                            </tbody>
                        </table>
                        <Diagram id="diag-wireless-auth" label="無線認証フロー" />
                        <p>
                            ゲストネットワークは、社内の本番VLANとは別のSSID・VLANとして分離し、来訪者や私物端末（BYOD）を隔離するために設計されます。
                        </p>

                        <h3>3-4. アンテナとアクセスポイントの配置</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">アンテナ種別</th>
                                    <th scope="col">特徴</th>
                                    <th scope="col">用途例</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>無指向性 (Omnidirectional)</td>
                                    <td>全方向へ均等に電波を放射</td>
                                    <td>オフィスなど一般的な屋内カバレッジ</td>
                                </tr>
                                <tr>
                                    <td>指向性 (Directional / Yagi)</td>
                                    <td>特定方向へ電波を集中させ到達距離を伸ばす</td>
                                    <td>建物間の点対点リンク</td>
                                </tr>
                                <tr>
                                    <td>パラボラ (Parabolic)</td>
                                    <td>非常に狭いビーム角で長距離をカバー</td>
                                    <td>遠距離の拠点間接続</td>
                                </tr>
                            </tbody>
                        </table>
                        <p>
                            アクセスポイントの設置場所は、カバレッジの重なり（セル間のオーバーラップ）とチャネル干渉の回避を両立させるよう計画する必要があります。
                        </p>
                    </section>

                    <section id="step4" tabIndex={-1}>
                        <div className="step-tag">
                            <span className="chip chip-pink">Objective 2.4</span>
                        </div>
                        <h2>
                            <i className="ti ti-building-warehouse accent-pink"></i>Step 4:
                            物理インストレーションを理解する
                        </h2>
                        <p>
                            どれほど論理設計が優れていても、物理的な設置環境が適切でなければネットワークは安定して稼働しません。設置・電源・環境要因を扱います。
                        </p>

                        <Diagram
                            id="diag-physical-install"
                            label="物理インストレーションの実施手順"
                        />

                        <h3>4-1. 設置場所に関する考慮事項</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>ラック配置</td>
                                    <td>保守のためのアクセススペース確保、機器の重量分散</td>
                                </tr>
                                <tr>
                                    <td>配線経路</td>
                                    <td>
                                        ケーブルの最大長制限（例：銅線Ethernetは一般に100m）を踏まえた経路設計
                                    </td>
                                </tr>
                                <tr>
                                    <td>ケーブルマネジメント</td>
                                    <td>ラベリング、パッチパネルの活用、束線による整理整頓</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>4-2. 電源に関する考慮事項</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">役割</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>UPS（無停電電源装置）</td>
                                    <td>
                                        停電時に一定時間電力を供給し安全なシャットダウンや電源切替の猶予を作る
                                    </td>
                                </tr>
                                <tr>
                                    <td>PDU（電源分配ユニット）</td>
                                    <td>ラック内の複数機器へ電源を分配・管理する</td>
                                </tr>
                                <tr>
                                    <td>冗長電源（デュアル電源）</td>
                                    <td>電源ユニット自体を二重化し片方の故障でも稼働を継続する</td>
                                </tr>
                            </tbody>
                        </table>

                        <h3>4-3. 環境要因</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th scope="col">項目</th>
                                    <th scope="col">内容</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>温度・湿度管理</td>
                                    <td>
                                        過度な発熱はハードウェア故障の主要因のため空調・気流設計が重要
                                    </td>
                                </tr>
                                <tr>
                                    <td>防火・消火設備</td>
                                    <td>
                                        通信機器室ではガス系消火設備など機器に配慮した消火方式が採用されることが多い
                                    </td>
                                </tr>
                                <tr>
                                    <td>静電気対策</td>
                                    <td>部品交換時の静電気放電（ESD）による機器損傷を防ぐ対策</td>
                                </tr>
                            </tbody>
                        </table>
                    </section>

                    <section id="step5" tabIndex={-1}>
                        <h2>
                            <i className="ti ti-checklist"></i>Step 5: 学習の進め方（まとめ）
                        </h2>
                        <div className="callout callout-info">
                            <div className="callout-title">
                                <i className="ti ti-bulb"></i>暗記より理解を優先する
                            </div>{' '}
                            <p>
                                特にNAT/PAT、STP、AD値は暗記だけだと応用問題に対応しづらい領域です。図解の流れを自分の言葉で説明できるかを確認しましょう。
                            </p>
                        </div>
                        <div className="callout callout-info">
                            <div className="callout-title">
                                <i className="ti ti-arrows-right-left"></i>
                                Troubleshootingドメインとの接続を意識する
                            </div>{' '}
                            <p>
                                出題比率24%のNetwork
                                Troubleshootingドメインでは、ルーティングテーブル、VLAN割り当て、STP、ケーブル規格などNetwork
                                Implementationで学んだ内容がそのまま前提知識になります。
                            </p>
                        </div>
                        <div className="callout callout-info">
                            <div className="callout-title">
                                <i className="ti ti-device-laptop"></i>
                                実機・シミュレータでの操作経験を積む
                            </div>{' '}
                            <p>
                                パフォーマンスベース問題（PBQ）対策として、CompTIAの公式学習製品（CertMaster
                                Learn/Practice/Labs）などでコマンドライン操作に慣れておくと得点が安定します。
                            </p>
                        </div>
                    </section>

                    <section id="references" tabIndex={-1}>
                        <h2>
                            <i className="ti ti-link"></i>参考文献・出典
                        </h2>
                        <p>
                            本資料の試験範囲・出題比率・ドメイン構成に関する情報は、CompTIA公式サイトの記載に基づいています。
                        </p>
                        <ul className="refs">
                            <li>
                                <div className="ref-title">
                                    CompTIA Network+
                                    公式認定ページ（試験概要・ドメイン別出題比率・出題範囲サマリー）
                                </div>
                                <a
                                    className="ref-url"
                                    href="https://www.comptia.org/en-us/certifications/network/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.comptia.org/en-us/certifications/network/
                                </a>
                                <a
                                    className="ref-url"
                                    href="https://www.comptia.org/en/certifications/network/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.comptia.org/en/certifications/network/
                                </a>
                            </li>
                            <li>
                                <div className="ref-title">
                                    CompTIA Blog「The New Network+ (N10-009) Exam: Your Questions
                                    Answered」（N10-009での変更点解説）
                                </div>
                                <a
                                    className="ref-url"
                                    href="https://www.comptia.org/en-us/blog/the-new-network-n10-009-exam-your-questions-answered/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.comptia.org/en-us/blog/the-new-network-n10-009-exam-your-questions-answered/
                                </a>
                            </li>
                            <li>
                                <div className="ref-title">
                                    CompTIA Blog「What Is on the CompTIA Network+
                                    Exam?」（出題内容の概要）
                                </div>
                                <a
                                    className="ref-url"
                                    href="https://www.comptia.org/en-us/blog/what-is-on-the-comptia-network-exam/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.comptia.org/en-us/blog/what-is-on-the-comptia-network-exam/
                                </a>
                            </li>
                            <li>
                                <div className="ref-title">
                                    CompTIA Blog「CompTIA Network+ N10-008 vs.
                                    N10-009」（旧バージョンとの比較）
                                </div>
                                <a
                                    className="ref-url"
                                    href="https://www.comptia.org/en-us/blog/comptia-network-n10-008-vs-n10-009-whats-the-difference/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    https://www.comptia.org/en-us/blog/comptia-network-n10-008-vs-n10-009-whats-the-difference/
                                </a>
                            </li>
                        </ul>
                        <footer>
                            CompTIAの出題範囲（Exam
                            Objectives）は改訂される場合があります。実際の受験前には、必ず上記の公式ページで最新の出題範囲PDFをご確認ください。
                        </footer>
                    </section>
                </main>
            </div>
        </div>
    );
}
