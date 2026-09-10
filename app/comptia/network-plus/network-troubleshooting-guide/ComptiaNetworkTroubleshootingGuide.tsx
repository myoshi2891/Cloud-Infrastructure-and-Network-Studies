'use client';

import React from 'react';
import { NavBar } from './NavBar';
import { MermaidDiagram } from '@/components/MermaidDiagram';
import { DIAGRAMS, type DiagramId } from './constants';

const Diagram = React.memo(function Diagram({ id, label }: { id: DiagramId; label: string }) {
    const chart = DIAGRAMS[id];
    if (!chart) return null;
    return (
        <div className="mermaid-wrap">
            <MermaidDiagram chart={chart} ariaLabel={label} preserveNaturalScale={true} />
        </div>
    );
});

/**
 * CompTIA Network+ Network Troubleshooting 完全ガイドコンポーネント (Client Component)
 */
export function ComptiaNetworkTroubleshootingGuide() {
    return (
        <div className="comptia-network-troubleshooting-page">
            <div className="layout">
                <NavBar />
                <main className="main-content">
                    <header className="hero">
                        <div className="badge-row">
                            <span className="badge">CompTIA Network+</span>
                            <span className="badge">試験番号: N10-009</span>
                            <span className="badge">ドメイン 5.0</span>
                        </div>
                        <h1>ネットワークトラブルシューティング完全ガイド</h1>
                        <p className="lead">
                            CompTIA Network+
                            認定資格試験（N10-009）の5ドメインのうち、出題比率が最も高い「5.0 Network
                            Troubleshooting」を、初学者でも理解できるようにステップバイステップで解説します。内容は公式
                            Exam Objectives ドキュメントに基づいています。
                        </p>
                    </header>

                    <section id="overview" tabIndex={-1} className="section">
                        <h2>
                            <i className="ti ti-layout-grid"></i>1. Network Troubleshootingドメインの全体像
                        </h2>

                        <h3>1.1 試験全体におけるドメイン構成</h3>
                        <p>
                            CompTIA Network+ (N10-009)
                            は5つのドメインで構成されており、それぞれ出題比率が異なります。
                        </p>
                        <div className="table-wrap">
                            <table>
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
                                        <td>Networking Concepts（ネットワーキングの概念）</td>
                                        <td>23%</td>
                                    </tr>
                                    <tr>
                                        <td>2.0</td>
                                        <td>Network Implementation（ネットワークの実装）</td>
                                        <td>20%</td>
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
                                        <td><strong>5.0</strong></td>
                                        <td>
                                            <strong
                                                >Network
                                                Troubleshooting（ネットワークトラブルシューティング）</strong
                                            >
                                        </td>
                                        <td><strong>24%</strong></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="callout">
                            <strong>ポイント:</strong> Network Troubleshooting
                            は5ドメイン中もっとも出題比率が高い、単独最大のドメインです。試験対策としても、実務スキルとしても最重要領域といえます。
                        </div>

                        <h3>1.2 試験の基本情報</h3>
                        <div className="table-wrap">
                            <table>
                                <tbody>
                                    <tr>
                                        <th scope="row">試験番号</th>
                                        <td>N10-009</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">出題数</th>
                                        <td>最大90問</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">出題形式</th>
                                        <td>
                                            選択問題（Multiple-choice）＋
                                            パフォーマンスベース問題（PBQ）
                                        </td>
                                    </tr>
                                    <tr>
                                        <th scope="row">試験時間</th>
                                        <td>90分</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">推奨実務経験</th>
                                        <td>IT ネットワーク分野で9〜12ヶ月以上</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>1.3 Network Troubleshootingドメインの5つのサブ項目</h3>
                        <p>この記事も、この5項目の順に沿って解説していきます。</p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目番号</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>5.1</td>
                                        <td>
                                            トラブルシューティングの方法論を説明できる（Explain the
                                            troubleshooting methodology）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5.2</td>
                                        <td>
                                            ケーブル配線と物理インターフェースの一般的な問題をトラブルシューティングできる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5.3</td>
                                        <td>
                                            ネットワークサービスに関する一般的な問題をトラブルシューティングできる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5.4</td>
                                        <td>
                                            パフォーマンスに関する一般的な問題をトラブルシューティングできる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5.5</td>
                                        <td>問題解決に適したツールやプロトコルを選択・使用できる</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="methodology" tabIndex={-1} className="section">
                        <h2><i className="ti ti-route"></i>2. 5.1 トラブルシューティングの方法論</h2>
                        <p>
                            CompTIA Network+
                            では、特定の製品やベンダーに依存しない<strong>汎用的な7ステップの問題解決プロセス</strong>が定義されています。これは試験だけでなく、実際のネットワーク運用現場でも標準的な思考の型として使われるものです。
                        </p>

                        <h3>2.1 7ステップの全体像（フローチャート）</h3>
                        <div className="mermaid-container">
                            <Diagram
                                id="mermaid-methodology"
                                label="7ステップの流れ（ステップ3で確認できない場合はステップ2に戻るループ構造）"
                            />
                        </div>
                        <p className="diagram-caption">
                            図:
                            7ステップの流れ（ステップ3で確認できない場合はステップ2に戻るループ構造）
                        </p>

                        <div className="callout">
                            <strong>重要:</strong> このフローの重要なポイントは、ステップ3で理論が確認できなかった場合、ステップ2に戻ってやり直す「ループ構造」になっていることです。トラブルシューティングは一直線に進むものではなく、仮説検証を繰り返しながら正解に近づいていくプロセスだと理解しておくとよいでしょう。
                        </div>

                        <h3>2.2 各ステップの詳細</h3>

                        <h3>
                            ステップ1: 問題を特定する（Identify the problem）
                        </h3>
                        <p>最初のステップは、思い込みで動く前に事実を集めることです。</p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">具体的なアクション</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>情報収集（Gather information）</td>
                                        <td>ログ、構成情報、監視データなど客観的な情報を集める</td>
                                    </tr>
                                    <tr>
                                        <td>ユーザーへのヒアリング（Question users）</td>
                                        <td>いつ・何をしていたときに問題が起きたかを聞く</td>
                                    </tr>
                                    <tr>
                                        <td>症状の特定（Identify symptoms）</td>
                                        <td>
                                            「遅い」「繋がらない」など曖昧な訴えを具体的な症状に落とし込む
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>変更点の確認（Determine if anything has changed）</td>
                                        <td>直前に設定変更やアップデートがなかったかを確認する</td>
                                    </tr>
                                    <tr>
                                        <td>問題の再現（Duplicate the problem, if possible）</td>
                                        <td>可能であれば同じ状況を再現し、事実として確認する</td>
                                    </tr>
                                    <tr>
                                        <td>個別対応（Approach multiple problems individually）</td>
                                        <td>
                                            複数の問題が同時に起きている場合、まとめず1つずつ切り分けて対応する
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>
                            ステップ2: 推定原因の理論を立てる（Establish a theory of probable cause）
                        </h3>
                        <p>
                            集めた情報をもとに「おそらくこれが原因だろう」という仮説（理論）を立てます。
                        </p>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">考え方</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>まず単純な原因を疑う（Question the obvious）</td>
                                        <td>
                                            ケーブルが抜けている、電源が入っていない、といった単純な物理的原因や、パスワード・SSIDの入力ミスなど単純な論理的原因から確認する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            複数のアプローチを検討する（Consider multiple approaches）
                                        </td>
                                        <td>
                                            「OSIモデルに沿ったアプローチ」や「分割統治法」を使って仮説を立てる（下記2.3で解説）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>
                            ステップ3: 理論をテストして原因を検証する（Test the theory to determine
                            cause）
                        </h3>
                        <p>立てた仮説が正しいかどうかを、実際にテストして検証します。</p>
                        <ul>
                            <li>
                                <strong>確認できた場合</strong> → 次のステップ（解決計画の立案）へ進む
                            </li>
                            <li>
                                <strong>確認できなかった場合</strong> →
                                新しい理論を立て直すか、自分の対応範囲を超えると判断した場合は上位担当者へエスカレーションする
                            </li>
                        </ul>

                        <h3>ステップ4: 解決に向けた行動計画を立てる（Establish a plan of action）</h3>
                        <p>
                            原因が特定できたら、それを解決するための具体的な計画を立てます。このとき、対応が他のシステムやユーザーに与える可能性のある影響（副作用）も合わせて洗い出しておくことが重要です。
                        </p>

                        <h3>
                            ステップ5:
                            解決策を実施する、または必要に応じてエスカレーションする（Implement the
                            solution or escalate as necessary）
                        </h3>
                        <p>
                            計画に沿って実際に対応を行います。自分の権限や知識の範囲を超える場合は、無理をせず適切な担当者へエスカレーションすることも「正しい対応」の一部として位置づけられています。
                        </p>

                        <h3>
                            ステップ6: システム全体の機能を検証し、予防策を実施する（Verify full system
                            functionality and implement preventive measures if applicable）
                        </h3>
                        <p>
                            対応後は「問題が起きていた箇所」だけでなく、<strong>システム全体が正常に機能しているか</strong>を確認します。1つの修正が別の箇所に予期しない影響を与えていないかをチェックすることが目的です。あわせて、同じ問題が再発しないような予防策（設定変更、監視強化など）を実施します。
                        </p>

                        <h3>
                            ステップ7: 対応内容を記録する（Document findings, actions, outcomes, and
                            lessons learned throughout the process）
                        </h3>
                        <p>
                            最後に、発生した症状・調査内容・実施した対応・結果・そこから得られた教訓を記録に残します。ドキュメント化はトラブルシューティングプロセス全体を通じて行うべきものであり、最後にまとめて書くだけの作業ではないという点がポイントです。
                        </p>

                        <h3>2.3 理論を立てる際の3つのアプローチ</h3>
                        <p>
                            ステップ2で仮説を立てる際、CompTIA Network+
                            では主に3つの考え方が紹介されています。いずれもOSI参照モデルの7層構造を軸にした切り分け方です。
                        </p>

                        <div className="mermaid-container">
                            <Diagram
                                id="mermaid-approaches"
                                label="理論を立てる3つのアプローチ（トップダウン／ボトムアップ／分割統治法）"
                            />
                        </div>
                        <p className="diagram-caption">
                            図: 理論を立てる3つのアプローチ（トップダウン／ボトムアップ／分割統治法）
                        </p>

                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">アプローチ</th>
                                        <th scope="col">考え方</th>
                                        <th scope="col">向いている場面</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>トップダウン（Top-to-bottom OSI）</td>
                                        <td>
                                            アプリケーション層（利用者に近い側）から確認を始め、徐々に下の層へ降りていく
                                        </td>
                                        <td>
                                            「特定のアプリだけ使えない」など上位層に原因がありそうな場合
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ボトムアップ（Bottom-to-top OSI）</td>
                                        <td>
                                            物理層（ケーブルや機器）から確認を始め、徐々に上の層へ昇っていく
                                        </td>
                                        <td>
                                            ケーブル抜けやリンクダウンなど、物理的な原因が疑われる場合
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>分割統治法（Divide and conquer）</td>
                                        <td>
                                            まずネットワーク層（レイヤー3）など中間の層を確認し、結果に応じて上下どちらを疑うか絞り込む
                                        </td>
                                        <td>
                                            どこに原因があるか見当がつかず、効率よく切り分けたい場合
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>2.4 実践例で流れをつかむ</h3>
                        <p>
                            初学者向けに、簡単なシナリオで7ステップの流れを確認してみましょう（このセクションは学習用の例示であり、公式試験問題ではありません）。
                        </p>
                        <div className="callout">
                            <strong>シナリオ:</strong> あるユーザーが社内ファイルサーバーに接続できないと申告してきた。
                        </div>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ステップ</th>
                                        <th scope="col">対応内容の例</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1. 問題を特定する</td>
                                        <td>
                                            ユーザーにヒアリングし、「今朝から接続できない」「他の同僚は接続できている」ことを確認。ローカルPCで再現テストを行う
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2. 理論を立てる</td>
                                        <td>
                                            「特定の1台だけの症状」なので、まずはそのPCの物理層・データリンク層（LANケーブル、NIC、IPアドレス設定）を疑う（ボトムアップの考え方）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3. 理論をテストする</td>
                                        <td>
                                            <code>ipconfig</code>
                                            でIPアドレスを確認したところ、DHCPから正しいアドレスが払い出されておらずAPIPAアドレスになっていた
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4. 行動計画を立てる</td>
                                        <td>
                                            スイッチポートおよびDHCPサーバー側の設定を確認する計画を立てる
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5. 解決策を実施する</td>
                                        <td>
                                            スイッチのポート設定を確認し、誤って無効化されていたポートを有効化する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6. 検証・予防策</td>
                                        <td>
                                            PCが正常にIPアドレスを取得し、ファイルサーバーに接続できることを確認。同様のポートが他にないか確認する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>7. 記録する</td>
                                        <td>
                                            症状・原因・対応内容・再発防止策をドキュメントとして残す
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="cabling" tabIndex={-1} className="section">
                        <h2>
                            <i className="ti ti-plug-connected"></i>3. 5.2
                            ケーブル配線と物理インターフェースの問題
                        </h2>
                        <p>物理層（レイヤー1）に近い、目に見える・測定できる問題を扱う項目です。</p>

                        <h3>3.1 ケーブルの問題（Cable issues）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>不適切なケーブル（Incorrect cable）</td>
                                        <td>
                                            シングルモード光ファイバとマルチモード光ファイバの混同、Cat
                                            5/6/7/8といったカテゴリ違いの使用、STP（シールド付きより対線）とUTP（非シールドより対線）の混同など
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>信号劣化（Signal degradation）</td>
                                        <td>
                                            クロストーク（Crosstalk：隣接する線からのノイズ混入）、干渉（Interference）、減衰（Attenuation：距離による信号の弱まり）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>不適切な終端処理（Improper termination）</td>
                                        <td>コネクタの結線・圧着ミスなど</td>
                                    </tr>
                                    <tr>
                                        <td>送受信の入れ替わり（TX/RX transposed）</td>
                                        <td>送信線と受信線が逆に接続されている状態</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>3.2 インターフェースの問題（Interface issues）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>インターフェースカウンタの増加</td>
                                        <td>
                                            CRC（Cyclic Redundancy
                                            Check）エラー、Runts（規定より短いフレーム）、Giants（規定より長いフレーム）、Drops（パケット破棄）などのカウンタ値の増加
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ポートステータス（Port status）</td>
                                        <td>
                                            Error disabled（エラーによる無効化）、Administratively
                                            down（管理者による意図的な無効化）、Suspended（一時停止）などの状態
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>3.3 ハードウェアの問題（Hardware issues）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>PoE（Power over Ethernet）</td>
                                        <td>
                                            電力予算超過（Power budget
                                            exceeded）、規格の不一致（Incorrect standard）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>トランシーバ（Transceivers）</td>
                                        <td>
                                            規格の不一致（Mismatch）、信号強度不足（Signal strength）
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="services" tabIndex={-1} className="section">
                        <h2><i className="ti ti-server-2"></i>4. 5.3 ネットワークサービスの問題</h2>
                        <p>
                            スイッチング・ルーティング・IPアドレッシングなど、レイヤー2〜3寄りの論理的な問題を扱う項目です。
                        </p>

                        <h3>4.1 スイッチングの問題（Switching issues）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>STP関連（Spanning Tree Protocol）</td>
                                        <td>
                                            ネットワークループ（Network
                                            loops）、ルートブリッジの選出（Root bridge
                                            selection）、ポートの役割（Port roles）、ポートの状態（Port
                                            states）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>VLAN誤割り当て（Incorrect VLAN assignment）</td>
                                        <td>ポートに設定されているVLANが意図したものと異なる</td>
                                    </tr>
                                    <tr>
                                        <td>ACL（Access Control List）</td>
                                        <td>
                                            アクセス制御リストの設定ミスによる意図しない通信の遮断／許可
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.2 ルーティングの問題（Route selection）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ルーティングテーブル（Routing table）</td>
                                        <td>
                                            経路情報が正しく登録されていない、または想定と異なる経路が選択される
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>デフォルトルート（Default routes）</td>
                                        <td>デフォルトゲートウェイへの経路設定に関する問題</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>4.3 アドレッシングの問題</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>アドレスプールの枯渇（Address pool exhaustion）</td>
                                        <td>DHCPで払い出せるIPアドレスの在庫が尽きている状態</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            誤ったデフォルトゲートウェイ（Incorrect default gateway）
                                        </td>
                                        <td>ゲートウェイアドレスの設定ミス</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            誤ったIPアドレス／重複IPアドレス（Incorrect / Duplicate IP
                                            address）
                                        </td>
                                        <td>
                                            IPアドレスの設定ミスや、同一セグメント内でのIPアドレス重複
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>誤ったサブネットマスク（Incorrect subnet mask）</td>
                                        <td>サブネットマスクの設定ミスによる通信範囲の誤認識</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="performance" tabIndex={-1} className="section">
                        <h2><i className="ti ti-gauge"></i>5. 5.4 パフォーマンスの問題</h2>
                        <p>「つながってはいるが遅い・不安定」といった性能面の問題を扱う項目です。</p>

                        <h3>5.1 有線ネットワーク共通のパフォーマンス問題</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>輻輳・競合（Congestion / Contention）</td>
                                        <td>同一回線・媒体を複数の通信が奪い合っている状態</td>
                                    </tr>
                                    <tr>
                                        <td>ボトルネック（Bottlenecking）</td>
                                        <td>
                                            ネットワーク経路上のどこか1箇所が全体の性能を制限している状態
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>帯域幅（Bandwidth）</td>
                                        <td>
                                            スループット容量（Throughput capacity）が不足している状態
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>レイテンシ（Latency）</td>
                                        <td>パケットが目的地に届くまでの遅延時間</td>
                                    </tr>
                                    <tr>
                                        <td>パケットロス（Packet loss）</td>
                                        <td>送信したパケットが途中で失われる現象</td>
                                    </tr>
                                    <tr>
                                        <td>ジッター（Jitter）</td>
                                        <td>
                                            パケット到達間隔のばらつき。特に音声・映像通話の品質に影響
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>5.2 無線ネットワーク特有のパフォーマンス問題（Wireless）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">項目</th>
                                        <th scope="col">内容</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>干渉（Interference）</td>
                                        <td>電波干渉、チャネルの重複（Channel overlap）</td>
                                    </tr>
                                    <tr>
                                        <td>信号劣化・信号消失（Signal degradation or loss）</td>
                                        <td>距離や障害物による電波品質の低下</td>
                                    </tr>
                                    <tr>
                                        <td>カバレッジ不足（Insufficient wireless coverage）</td>
                                        <td>アクセスポイントの電波が届かないエリアの存在</td>
                                    </tr>
                                    <tr>
                                        <td>クライアントの切断問題（Client disassociation issues）</td>
                                        <td>クライアント端末がAPから予期せず切断される問題</td>
                                    </tr>
                                    <tr>
                                        <td>ローミング設定ミス（Roaming misconfiguration）</td>
                                        <td>複数APを移動する際の切り替え設定に関する問題</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="tools" tabIndex={-1} className="section">
                        <h2><i className="ti ti-tools"></i>6. 5.5 適切なツールやプロトコルの選択</h2>
                        <p>問題を切り分け・診断するための具体的なツール群です。</p>

                        <h3>6.1 ソフトウェアツール（Software tools）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>プロトコルアナライザ（Protocol analyzer）</td>
                                        <td>通信内容をパケット単位で解析するツール</td>
                                    </tr>
                                    <tr>
                                        <td><code>ping</code></td>
                                        <td>対象ホストへの到達性とおおよそのレイテンシを確認する</td>
                                    </tr>
                                    <tr>
                                        <td><code>traceroute</code> / <code>tracert</code></td>
                                        <td>対象ホストまでの経路（ホップ）を確認する</td>
                                    </tr>
                                    <tr>
                                        <td><code>nslookup</code></td>
                                        <td>DNS名前解決の結果を確認する</td>
                                    </tr>
                                    <tr>
                                        <td><code>tcpdump</code></td>
                                        <td>パケットキャプチャを行うコマンドラインツール</td>
                                    </tr>
                                    <tr>
                                        <td><code>dig</code></td>
                                        <td>DNSレコードを詳細に照会するツール</td>
                                    </tr>
                                    <tr>
                                        <td><code>netstat</code></td>
                                        <td>現在の通信状態・ポート使用状況を確認する</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <code>ip</code> / <code>ifconfig</code> /
                                            <code>ipconfig</code>
                                        </td>
                                        <td>インターフェースのIPアドレスなどの設定を確認する</td>
                                    </tr>
                                    <tr>
                                        <td><code>arp</code></td>
                                        <td>
                                            IPアドレスとMACアドレスの対応表（ARPテーブル）を確認する
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Nmap</td>
                                        <td>ネットワーク上のホストやポートをスキャンするツール</td>
                                    </tr>
                                    <tr>
                                        <td>LLDP / CDP</td>
                                        <td>
                                            隣接機器の情報を収集するプロトコル（LLDPは業界標準、CDPはCisco独自）
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>スピードテスター（Speed tester）</td>
                                        <td>回線速度を測定するツール</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>6.2 ハードウェアツール（Hardware tools）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">ツール</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>トーナー（Toner）</td>
                                        <td>
                                            ケーブルの物理的な追跡・特定に使用する発信機とプローブのセット
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>ケーブルテスター（Cable tester）</td>
                                        <td>ケーブルの結線状態や断線を検査する</td>
                                    </tr>
                                    <tr>
                                        <td>タップ（Taps）</td>
                                        <td>通信経路上に割り込んでトラフィックをキャプチャする機器</td>
                                    </tr>
                                    <tr>
                                        <td>Wi-Fiアナライザ（Wi-Fi analyzer）</td>
                                        <td>無線チャネルの利用状況や電波強度を可視化する</td>
                                    </tr>
                                    <tr>
                                        <td>可視光障害位置測定器（Visual fault locator）</td>
                                        <td>光ファイバケーブルの断線・損傷箇所を特定する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>6.3 ネットワーク機器の基本コマンド（Basic networking device commands）</h3>
                        <div className="table-wrap">
                            <table>
                                <thead>
                                    <tr>
                                        <th scope="col">コマンド</th>
                                        <th scope="col">プラットフォーム</th>
                                        <th scope="col">用途</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td><code>show mac address-table</code></td>
                                        <td>Cisco IOS</td>
                                        <td>スイッチが学習したMACアドレステーブルを表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>show ip route</code></td>
                                        <td>Cisco IOS</td>
                                        <td>ルーティングテーブルを表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>show route</code></td>
                                        <td>Junos OS</td>
                                        <td>ルーティングテーブルを表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>show interface</code></td>
                                        <td>Cisco IOS / Junos OS</td>
                                        <td>インターフェースの状態・統計情報を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>show config</code></td>
                                        <td>Junos OS</td>
                                        <td>現在の設定情報を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>show arp</code></td>
                                        <td>Cisco IOS / Junos OS</td>
                                        <td>ARPテーブルを表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>show vlan</code></td>
                                        <td>Cisco IOS</td>
                                        <td>VLANの設定状況を表示する</td>
                                    </tr>
                                    <tr>
                                        <td><code>show power</code></td>
                                        <td>Cisco IOS</td>
                                        <td>電源（PoE含む）の状態を表示する</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>

                    <section id="tips" tabIndex={-1} className="section">
                        <h2><i className="ti ti-bulb"></i>7. 初学者向け 学習のポイント</h2>
                        <ul>
                            <li>
                                <strong
                                    >7ステップの順番を丸暗記するだけでなく、「なぜその順番なのか」を理解する</strong
                                >こと。特にステップ3の「理論が確認できなければステップ2に戻る」というループ構造は、試験でも実務でも頻出の考え方です。
                            </li>
                            <li>
                                OSI参照モデルの7層を常に意識し、「今、自分はどの層の問題を疑っているのか」を言語化しながら切り分ける習慣をつけると、トップダウン／ボトムアップ／分割統治法のいずれも実践しやすくなります。
                            </li>
                            <li>
                                5.2〜5.4は暗記量が多い項目ですが、「物理層寄り（5.2）→
                                論理設定寄り（5.3）→
                                性能・体感寄り（5.4）」という大まかな整理をしておくと、どの分類の問題かを判断しやすくなります。
                            </li>
                            <li>
                                5.5のコマンド・ツールは、実際に自分の手元の端末やラボ環境で一度でも実行してみると定着しやすくなります。
                            </li>
                        </ul>
                    </section>

                    <section id="references" tabIndex={-1} className="section">
                        <h2><i className="ti ti-books"></i>出典・参考資料</h2>
                        <p>
                            本記事は以下の情報源をもとに作成しています。試験内容は改訂される可能性があるため、学習の際は必ず公式サイトの最新情報を確認してください。
                        </p>
                        <ul className="ref-list">
                            <li>
                                <span className="ref-title">CompTIA Network+ 公式認定資格ページ</span>
                                <span className="ref-desc">ユーザー指定の一次情報源</span>
                                <a
                                    href="https://www.comptia.org/en-us/certifications/network/"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    https://www.comptia.org/en-us/certifications/network/
                                </a>
                            </li>
                            <li>
                                <span className="ref-title"
                                    >CompTIA Network+ N10-009 Certification Exam: Exam
                                    Objectives（公式試験目標PDF, Version 4.0）</span
                                >
                                <span className="ref-desc"
                                    >本記事の5.1〜5.5の内容・ドメイン比率・試験詳細（出題数、時間、推奨経験年数など）の一次情報源</span
                                >
                                <a
                                    href="https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    https://comptiacdn.azureedge.net/webcontent/docs/default-source/exam-objectives/comptia-network-n10-009-exam-objectives-(4-0)-(1).pdf
                                </a>
                            </li>
                            <li>
                                <span className="ref-title"
                                    >Professor Messer — Network Troubleshooting Methodology (N10-009,
                                    5.1)</span
                                >
                                <span className="ref-desc">補足の学習リソース</span>
                                <a
                                    href="https://www.professormesser.com/network-plus/n10-009/n10-009-video/network-troubleshooting-methodology-n10-009/"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    https://www.professormesser.com/network-plus/n10-009/n10-009-video/network-troubleshooting-methodology-n10-009/
                                </a>
                            </li>
                            <li>
                                <span className="ref-title">destcert — N10-009 Objectives Explained</span>
                                <span className="ref-desc">試験の合格スコアなど補足情報の参考</span>
                                <a
                                    href="https://destcert.com/resources/n10-009-objectives/"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    https://destcert.com/resources/n10-009-objectives/
                                </a>
                            </li>
                        </ul>
                    </section>

                    <footer className="footer">
                        <p>
                            本記事は独自にまとめた学習補助資料であり、CompTIA公式のトレーニング教材ではありません。試験対策には必ず公式の学習リソースも併用してください。
                        </p>
                    </footer>
                </main>
            </div>
        </div>
    );
}
