import {Diagram} from '../Diagram';
/** 原本のfoundationを全文・順序どおり保持する。 */
export default function Foundation(){return <section className="guide-part" data-part="foundation">{" "}
<div className={"hero"}>{" "}<div className={"kicker"}>{" AWS Certified Advanced Networking - Specialty · Domain 1 "}</div>{" "}<h1 >{" AWS Certified Advanced Networking - Specialty (ANS-C01) Content Domain 1: Network Design 初学者向けステップバイステップ解説ガイド "}</h1>{" "}<div className={"meta-row"}>{" "}<span className={"pill"}>{"配点 "}<strong >{"30%"}</strong></span>{" "}<span className={"pill"}>{"対象 "}<strong >{"初学者〜中級者"}</strong></span>{" "}<span className={"pill"}>{"図解 "}<strong >{"Mermaid 15点"}</strong></span>{" "}<span className={"pill"}>{"参考URL "}<strong >{"49件"}</strong></span>{" "}</div>{" "}</div>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"Network Design（表1）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"対象試験"}</td><td >{"AWS Certified Advanced Networking - Specialty (ANS-C01)"}</td></tr><tr className={"even"}><td >{"対象範囲"}</td><td >{"Content Domain 1: Network Design (スコア対象問題の 30%)"}</td></tr><tr className={"odd"}><td >{"含まれるタスク"}</td><td >{"Task 1.1 から Task 1.6 までの 6 タスク"}</td></tr><tr className={"even"}><td >{"想定読者"}</td><td >{"AWS ネットワークを体系的に学び始める初学者から中級者"}</td></tr><tr className={"odd"}><td >{"作成日"}</td><td >{"2026-10-16"}</td></tr><tr className={"even"}><td >{"根拠"}</td><td >{" AWS 公式の試験ガイドとサービス別ドキュメント (末尾の参考 URL 一覧を参照) "}</td></tr></tbody></table>{" "}</div>
{" "}
<p >{" 注意: 本ガイドは試験ガイドの Knowledge と Skills の各項目を、初学者が順に理解できるよう噛み砕いたものです。試験ガイド自身が「網羅的な出題リストではない」と述べているとおり、出題範囲の保証ではありません。AWS のサービス仕様やクォータは更新されるため、数値や仕様は必ず最新の公式ドキュメントで確認してください。 "}</p>
{" "}
<h2 id={"0-このガイドの使い方"} tabIndex={-1}>{"0. このガイドの使い方"}</h2>
{" "}
<h3 id={"ステップ形式の学習の流れ"} tabIndex={-1}>{"ステップ形式の学習の流れ"}</h3>
{" "}
<ol >{" "}<li >{"各タスクの冒頭で「試験ガイドが求める Knowledge と Skills」を確認する"}</li>{" "}<li >{"「基礎知識」で用語と仕組みを理解する"}</li>{" "}<li >{"「サービスと機能の詳細」で、各機能が何を解決するのかを押さえる"}</li>{" "}<li >{"「ベストプラクティス」で、設計の判断基準を覚える"}</li>{" "}<li >{"「選択のコツと試験での落とし穴」で、似たサービスの使い分けを確認する"}</li>{" "}<li >{"最後に「理解度チェック」で、複数選択式の形式に慣れる"}</li>{" "}</ol>
{" "}
<h3 id={"表記ルール"} tabIndex={-1}>{"表記ルール"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"表記ルール（表2）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"記号"}</th><th scope="col">{"意味"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"試験ガイド原文"}</td><td >{" Knowledge of または Skills in として公式ガイドに記載されている項目 "}</td></tr><tr className={"even"}><td >{"ベストプラクティス"}</td><td >{" AWS 公式ドキュメントや Well-Architected の考え方に沿った設計指針 "}</td></tr><tr className={"odd"}><td >{"落とし穴"}</td><td >{"試験で誤答の選択肢として出やすい紛らわしいポイント"}</td></tr><tr className={"even"}><td >{"出典"}</td><td >{"各節の末尾に示す根拠 URL"}</td></tr></tbody></table>{" "}</div>
{" "}
<h2 id={"1-試験の全体像とドメイン-1-の位置づけ"} tabIndex={-1}>{" 1. 試験の全体像とドメイン 1 の位置づけ "}</h2>
{" "}
<h3 id={"11-試験の基本情報"} tabIndex={-1}>{"1.1 試験の基本情報"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.1 試験の基本情報（表3）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"試験の目的"}</td><td >{" AWS とハイブリッドのネットワークアーキテクチャを、大規模に設計、実装、管理、保護する力を検証する "}</td></tr><tr className={"even"}><td >{"推奨経験"}</td><td >{" ネットワーク経験 5 年以上、うちクラウドとハイブリッドのネットワーク経験 2 年以上 "}</td></tr><tr className={"odd"}><td >{"問題形式"}</td><td >{"複数選択 (Multiple response) とマッチング (Matching)"}</td></tr><tr className={"even"}><td >{"問題数"}</td><td >{" スコア対象 50 問と、スコア対象外 15 問 (どれが対象外かは分からない) "}</td></tr><tr className={"odd"}><td >{"合格スコア"}</td><td >{"100 から 1,000 のスケールスコアで 750 以上"}</td></tr><tr className={"even"}><td >{"採点方式"}</td><td >{"補償型 (ドメインごとの合格点はなく、総合で合格すればよい)"}</td></tr><tr className={"odd"}><td >{"未回答"}</td><td >{"不正解扱い。推測で解答しても減点はない"}</td></tr></tbody></table>{" "}</div>
{" "}
<h3 id={"12-ドメイン配分"} tabIndex={-1}>{"1.2 ドメイン配分"}</h3>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.2 ドメイン配分（表4）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"ドメイン"}</th><th scope="col">{"配点"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"Domain 1: Network Design"}</td><td >{"30%"}</td></tr><tr className={"even"}><td >{"Domain 2: Network Implementation"}</td><td >{"26%"}</td></tr><tr className={"odd"}><td >{"Domain 3: Network Management and Operation"}</td><td >{"20%"}</td></tr><tr className={"even"}><td >{"Domain 4: Network Security, Compliance, and Governance"}</td><td >{"24%"}</td></tr></tbody></table>{" "}</div>
{" "}
<p >{" ドメイン 1 は最も配点が大きく、この試験の土台です。ここで学ぶ「どのサービスをどう選ぶか」という設計判断は、ドメイン 2 以降の実装や運用の問いにも繰り返し登場します。 "}</p>
{" "}
<h3 id={"13-ドメイン-1-の学習マップ"} tabIndex={-1}>{"1.3 ドメイン 1 の学習マップ"}</h3>
{" "}
<Diagram id="diag-1" label={"1.3 ドメイン 1 の学習マップ"} />
{" "}
<h3 id={"14-ネットワーク基礎の復習-osi-参照モデルと-aws-サービスの対応"} tabIndex={-1}>{" 1.4 ネットワーク基礎の復習 (OSI 参照モデルと AWS サービスの対応) "}</h3>
{" "}
<p >{" ロードバランサーやファイアウォールの違いは「どの層を見て判断するか」で決まります。まずこの対応表を頭に入れてください。 "}</p>
{" "}
<div className={"table-scroll"} role="region" tabIndex={0} aria-label={"1.4 ネットワーク基礎の復習 (OSI 参照モデルと AWS サービスの対応)（表5）"}>{" "}<table ><thead ><tr className={"header"}><th scope="col">{"層"}</th><th scope="col">{"名称"}</th><th scope="col">{"判断に使う情報"}</th><th scope="col">{"代表的な AWS サービス"}</th></tr></thead><tbody ><tr className={"odd"}><td >{"L3"}</td><td >{"ネットワーク層"}</td><td >{"IP アドレス"}</td><td >{"Gateway Load Balancer、Transit Gateway、ルートテーブル"}</td></tr><tr className={"even"}><td >{"L4"}</td><td >{"トランスポート層"}</td><td >{"IP アドレスとポート、TCP と UDP"}</td><td >{" Network Load Balancer、セキュリティグループ、Global Accelerator "}</td></tr><tr className={"odd"}><td >{"L7"}</td><td >{"アプリケーション層"}</td><td >{"HTTP のパス、ホスト名、ヘッダー"}</td><td >{"Application Load Balancer、CloudFront、AWS WAF"}</td></tr></tbody></table>{" "}</div>
{" "}</section>;}
