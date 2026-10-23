import { Diagram } from '../Diagram';
/** 原本のfoundation区分を全文保持する。 */
export default function Foundation(){return <div className="guide-part" data-part="foundation">
<div className={"hero"}>{" "}<div className={"kicker"}>{"Advanced Networking - Specialty · Domain 3"}</div>{" "}<h1>{" AWS Certified Advanced Networking - Specialty (ANS-C01) Content Domain 3: Network Management and Operation 初学者向けステップバイステップ解説ガイド "}</h1>{" "}<div className={"meta-row"}>{" "}<span className={"pill"}>{"配点 "}<strong>{"試験全体の20%"}</strong></span>{" "}<span className={"pill"}>{"対象 "}<strong>{"初学者〜中級者"}</strong></span>{" "}<span className={"pill"}>{"図解 "}<strong>{"Mermaid 26点"}</strong></span>{" "}<span className={"pill"}>{"参考文献 "}<strong>{"30件"}</strong></span>{" "}</div>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"対象試験"}</strong>{": AWS Certified Advanced Networking - Specialty (ANS-C01) "}</p>{" "}<p>{" "}<strong>{"対象範囲"}</strong>{": Content Domain 3（試験全体の "}<strong>{"20%"}</strong>{"） "}</p>{" "}<p>{" "}<strong>{"最終確認日"}</strong>{": 2026-10-16（上限値・仕様は変更されることがあるため、受験前に必ず公式ドキュメントで再確認してください） "}</p>{" "}<p>{" "}<strong>{"アンカー情報源"}</strong>{": "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/advanced-networking-specialty-01/advanced-networking-specialty-01-domain3.html"}>{"ANS-C01 Exam Guide – Domain 3"}</a>{" "}</p>{" "}</blockquote>

<h2 id={"0-このガイドの使い方"} tabIndex={-1}>{"0. このガイドの使い方"}</h2>

<p>{" このガイドは、試験ガイドが示す Domain 3 の "}<strong>{"3つのタスク"}</strong>{" を、次の順番で学べるように構成しています。 "}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"0. このガイドの使い方（表1）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"ステップ"}</th><th scope="col">{"何をするか"}</th><th scope="col">{"目的"}</th></tr></thead><tbody><tr className={"odd"}><td>{"① 全体像を知る"}</td><td>{"Domain 3 が何を問うているかを地図で把握する"}</td><td>{"迷子にならない"}</td></tr><tr className={"even"}><td>{"② 用語を揃える"}</td><td>{"BGP・VIF・MTU などの言葉を先に理解する"}</td><td>{"後の説明を読みやすくする"}</td></tr><tr className={"odd"}><td>{"③ タスクごとに学ぶ"}</td><td>{"「なぜ必要か → 仕組み → 設定 → ベストプラクティス」の順"}</td><td>{"暗記ではなく理解で覚える"}</td></tr><tr className={"even"}><td>{"④ 確認問題を解く"}</td><td>{"シナリオ問題で判断力を確認する"}</td><td>{"本番形式に慣れる"}</td></tr><tr className={"odd"}><td>{"⑤ 根拠URLを読む"}</td><td>{"公式ドキュメントで裏付けを取る"}</td><td>{"正確な知識にする"}</td></tr></tbody></table>{" "}</div>

<h3 id={"表記ルール"} tabIndex={-1}>{"表記ルール"}</h3>

<ul>{" "}<li>{" 図解は "}<strong>{"Mermaid（フローチャート）"}</strong>{" と "}<strong>{"Markdown の表"}</strong>{" のみを使用しています。 "}</li>{" "}<li>{" 数値（上限値など）は 2026-10-16 時点で公式ドキュメントを確認したものです。 "}</li>{" "}<li>{" 「"}<strong>{"試験ポイント"}</strong>{"」と書かれた囲みは、問われやすい判断基準です。 "}</li>{" "}<li>{"コマンド例は構文ハイライト付きのコードブロックで示します。"}</li>{" "}</ul>

<h2 id={"1-domain-3-の全体像"} tabIndex={-1}>{"1. Domain 3 の全体像"}</h2>

<p>{" Domain 3 は「作った（Domain 2）ネットワークを "}<strong>{"運用し続ける"}</strong>{" ための知識」を問います。構築後に起きる、経路の変更・障害・性能劣化・コスト増加にどう対処するかが中心です。 "}</p>

<h3 id={"11-3つのタスク"} tabIndex={-1}>{"1.1 3つのタスク"}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.1 3つのタスク（表2）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"タスク"}</th><th scope="col">{"一言でいうと"}</th><th scope="col">{"主なサービス・機能"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"3.1"}</strong>{" ルーティングと接続性の維持"}</td><td>{"「正しい道を通っているか」を保つ"}</td><td>{" Direct Connect, Site-to-Site VPN, Transit Gateway, BGP, ルートテーブル, PrivateLink, VPC ピアリング "}</td></tr><tr className={"even"}><td><strong>{"3.2"}</strong>{" 監視・分析・トラブルシューティング"}</td><td>{"「なぜ通じないか・遅いか」を調べる"}</td><td>{" CloudWatch, VPC Flow Logs, Traffic Mirroring, Reachability Analyzer, Network Manager "}</td></tr><tr className={"odd"}><td><strong>{"3.3"}</strong>{" 最適化"}</td><td>{"「速く・止まらず・安く」する"}</td><td>{" Route 53, Global Accelerator, ENA/EFA, ジャンボフレーム, マルチキャスト, サブネット設計 "}</td></tr></tbody></table>{" "}</div>

<h3 id={"12-タスク間の関係"} tabIndex={-1}>{"1.2 タスク間の関係"}</h3>

<Diagram id="diag-1" label={"1.2 タスク間の関係"} />

<p>{" 運用は "}<strong>{"「維持する → 観測する → 改善する → また維持する」"}</strong>{" の循環です。試験でも「障害を調べて（3.2）、設定を直し（3.1）、再発しにくい構成にする（3.3）」のように、複数タスクをまたぐシナリオが出ます。 "}</p>

<h3 id={"13-試験形式の基本情報公式-exam-guide-より"} tabIndex={-1}>{" 1.3 試験形式の基本情報（公式 Exam Guide より） "}</h3>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.3 試験形式の基本情報（公式 Exam Guide より）（表3）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"出題形式"}</td><td>{"複数選択（正解が2つ以上）と マッチング"}</td></tr><tr className={"even"}><td>{"採点対象の問題数"}</td><td>{"50 問（ほかに採点対象外の 15 問が混在）"}</td></tr><tr className={"odd"}><td>{"合格スコア"}</td><td>{"100〜1,000 のスケールスコアで "}<strong>{"750 以上"}</strong></td></tr><tr className={"even"}><td>{"採点方式"}</td><td>{"補償型（ドメインごとの合格点はなく、全体で合格すればよい）"}</td></tr><tr className={"odd"}><td>{"Domain 3 の比重"}</td><td>{"20%"}</td></tr></tbody></table>{" "}</div>

<h2 id={"2-前提知識まず押さえる用語集"} tabIndex={-1}>{"2. 前提知識：まず押さえる用語集"}</h2>

<p>{"初学者がつまずきやすい用語を先に整理します。以降の章で何度も登場します。"}</p>

<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"2. 前提知識：まず押さえる用語集（表4）"}>{" "}<table><thead><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"意味"}</th><th scope="col">{"初学者向けの例え"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"BGP"}</strong></td><td>{"組織間（AS 間）で経路情報を交換するプロトコル"}</td><td>{"郵便局同士が「この住所はうちが届けます」と教え合う仕組み"}</td></tr><tr className={"even"}><td><strong>{"ASN"}</strong></td><td>{"BGP で使う自律システム番号"}</td><td>{"組織の識別番号"}</td></tr><tr className={"odd"}><td><strong>{"VIF（仮想インターフェイス）"}</strong></td><td>{"Direct Connect 上の論理的な接続口"}</td><td>{"1本の専用線を用途別に区切った出入口"}</td></tr><tr className={"even"}><td><strong>{"Direct Connect Gateway (DXGW)"}</strong></td><td>{"複数の VPC/TGW を専用線につなぐグローバルなゲートウェイ"}</td><td>{"専用線の「ハブ駅」"}</td></tr><tr className={"odd"}><td><strong>{"Transit Gateway (TGW)"}</strong></td><td>{"多数の VPC やオンプレミスをつなぐ中継ルーター"}</td><td>{"ネットワークの「ターミナル駅」"}</td></tr><tr className={"even"}><td><strong>{"VGW / CGW"}</strong></td><td>{"VPN の AWS 側 / お客様側の終端"}</td><td>{"橋の両端の橋台"}</td></tr><tr className={"odd"}><td><strong>{"ECMP"}</strong></td><td>{"同じコストの複数経路に負荷を分散する方式"}</td><td>{"同じ距離の道を複数車線で使う"}</td></tr><tr className={"even"}><td><strong>{"BFD"}</strong></td><td>{"経路障害を高速に検知する仕組み"}</td><td>{"生存確認を1秒単位で行う"}</td></tr><tr className={"odd"}><td><strong>{"MTU"}</strong></td><td>{"一度に送れる最大パケットサイズ"}</td><td>{"荷物の最大サイズ"}</td></tr><tr className={"even"}><td><strong>{"MSS"}</strong></td><td>{"TCP で1パケットに載せられるデータ量"}</td><td>{"箱の中身の最大量"}</td></tr><tr className={"odd"}><td><strong>{"PMTUD"}</strong></td><td>{"経路上の最小 MTU を自動で調べる仕組み"}</td><td>{"道の一番狭い所を測る"}</td></tr><tr className={"even"}><td><strong>{"CIDR"}</strong></td><td>{"IP アドレス範囲の表記（例: 10.0.0.0/16）"}</td><td>{"住所の「市区町村」の範囲"}</td></tr><tr className={"odd"}><td><strong>{"ENI / ENA / EFA"}</strong></td><td>{"仮想NIC / 高性能NIC / HPC 向け NIC"}</td><td>{"普通の玄関 / 広い玄関 / 専用搬入口"}</td></tr></tbody></table>{" "}</div>

<blockquote>{" "}<p>{" "}<strong>{"試験ポイント"}</strong>{": Specialty 試験は用語の意味ではなく「"}<strong>{"この状況でどれを選ぶか"}</strong>{"」を問います。用語は、判断の材料として使えるようにしておきます。 "}</p>{" "}</blockquote>
</div>;}
