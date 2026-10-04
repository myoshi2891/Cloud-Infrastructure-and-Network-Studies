'use client';

import React from 'react';
import { Diagram } from '../Diagram';


export function SectionIntro() {
    return (
        <>
            <div className="hero">
                    <div className="kicker">初学者のためのステップバイステップ学習ロードマップ</div>
                    <h1>TCP/IP Illustrated, Volume 1: The Protocols（第2版）解説ガイド</h1>
                    <div className="meta-row">
                        <span className="pill">全18章 <strong>+ 最新動向</strong></span>
                        <span className="pill">対象 <strong>初学者</strong></span>
                        <span className="pill">図解 <strong>Mermaid 35点</strong></span>
                        <span className="pill">参考文献 <strong>39件</strong></span>
                    </div>
                </div>
            <p>
                    原著: <em>TCP/IP Illustrated, Volume 1: The Protocols, 2nd Edition</em>（Kevin
                    R. Fall, W. Richard Stevens 著、Addison-Wesley
                    Professional／O&apos;Reilly、2011年11月刊、1,056ページ） 参照:{' '}
                    <a href="https://www.oreilly.com/library/view/tcp-ip-illustrated-volume/9780132808200/">O&apos;Reilly公式書籍ページ</a>
                </p>
            <p>
                    本ガイドは原著の目次構成（全18章＋付録）に沿って、TCP/IPプロトコルスイートの内部動作を初学者向けに独自の説明・図解で再構成したものです。原文の複製・転載は一切行っていません。2026年8月30日時点の最新動向についてはWeb検索で調査し、末尾の参考文献に一次情報源のURLを明記しています。
                </p>
            <hr />
            <h2 id="part0">第0部：なぜ今この本を読むのか</h2>
            <h3 id="s0-1">0.1 この本の立ち位置</h3>
            <p>
                    <code>TCP/IP Illustrated, Volume 1</code> は、1994年に故W. Richard
                    Stevens氏が著した初版を、Kevin R. Fall氏（元Intel
                    Research／PARC研究者、DTN＝Delay Tolerant
                    Networkingの提唱者の一人）が2011年に全面刷新した第2版です。初版の特徴だった「<code>tcpdump</code>で実際のパケットをキャプチャしながらプロトコルの動きを&quot;見る&quot;」というスタイルを継承しつつ、Linux・Windows・Mac
                    OSの最新実装、IPv6、NAT、DNSSECなど2010年代前半までの技術を反映しています。
                </p>
            <p>
                    Vint
                    Cerf氏（TCP/IPの共同発明者）は本書について「インターネット運用の洗練・保護、あるいは根強い問題への代替解決策を模索するエンジニアにとって、この本の知見はかけがえのないものになるだろう」と評しています。
                </p>
            <Diagram id="diag-0" label="Vint Cerf氏（TCP/IPの共同発明者）は本書について「インターネット運用の洗練・保護、あるいは根強い問題への代替解決策を模索するエンジニアにとって、この本の知見はかけがえのないものになるだろう」と評しています。" />
            <h3 id="s0-2">0.2 なぜ2026年に読む価値があるか</h3>
            <ul>
                    <li>
                        <strong>RFCは変わっても&quot;考え方&quot;は変わらない</strong>：TCP/IPのアーキテクチャ原則（レイヤ分離、end-to-endの原則、ベストエフォート配送）は1970年代から本質的に不変です。BBRv3やQUICのような新技術も、この本が説明する基礎モデルの上に構築されています。
                    </li>
                    <li>
                        <strong>障害調査・パケット解析の実務直結スキル</strong>：<code>tcpdump</code>／Wiresharkでパケットを読む力は、クラウドネイティブ時代でもロードバランサやサービスメッシュのトラブルシューティングに直結します。
                    </li>
                    <li>
                        <strong>本ガイドの補完方針</strong>：原著は2011年刊行のため、TCP輻輳制御（BBR）、DNSSEC/DoH/DoQの普及率、post-quantum
                        TLS、IPv6の主要ネットワークでの普及率など、2012年以降の進展は第19部で個別にアップデートします。
                    </li>
                </ul>
            <h3 id="s0-3">0.3 前提知識</h3>
            <div className="table-scroll" tabIndex={0} role="region" aria-label="0.3 前提知識">
                    <table>
                        <thead>
                            <tr className="header">
                                <th scope="col">前提</th>
                                <th scope="col">目安</th>
                                <th scope="col">なぜ必要か</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>2進数・16進数の基礎</td>
                                <td>IPアドレスやポート番号の表記を理解できる</td>
                                <td>ヘッダフィールドはビット単位で定義されるため</td>
                            </tr>
                            <tr className="even">
                                <td>OSI参照モデルの概要</td>
                                <td>7層モデルの名称を知っている</td>
                                <td>TCP/IPの4〜5層モデルとの対応付けに使う</td>
                            </tr>
                            <tr className="odd">
                                <td>コマンドライン操作</td>
                                <td><code>ping</code>／<code>curl</code>／シェルの基本</td>
                                <td>本書の実験は端末操作が前提</td>
                            </tr>
                            <tr className="even">
                                <td>
                                    （推奨）<code>tcpdump</code>か<code>Wireshark</code>のインストール環境
                                </td>
                                <td>実際にパケットを観察したい場合</td>
                                <td>本書の学習効果は「読む」より「見る」ことで最大化される</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            <hr />
        </>
    );
}
