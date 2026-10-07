'use client';
import { memo } from 'react';
import { NavBar } from './NavBar';
/** 状態に依存しない本文をメモ化し、目次操作で図を再描画しない。 */
const GuideContents=memo(function GuideContents(){return <>
<header className="hero">{" "}<div className="eyebrow">
<i className="ti ti-certificate" aria-hidden="true"></i>
{"AWS Certified Developer - Associate"}
</div>{" "}<h1>{"Domain 1: Development with AWS Services"}</h1>{" "}<p className="sub">{"完全ガイド(初学者向け・ステップバイステップ)"}</p>{" "}<div className="meta">
<p>{"対象試験: AWS Certified Developer - Associate (DVA-C02)"}</p>
<p>{"注意: DVA-C02 の最終受験日は "}<strong>{"2026 年 11 月 30 日"}</strong>{"です。最新情報は "}<a href="https://aws.amazon.com/certification/certified-developer-associate/" target="_blank" rel="noopener noreferrer">{"AWS Certified Developer - Associate 公式ページ"}</a>{"を確認してください。"}</p>
<p>{"対象範囲: "}<strong>{"Content Domain 1「Development with AWS Services」（スコア対象問題の 32%）"}</strong></p>
<p>{"作成日: 2026-10-04"}</p>
<p>{"根拠: AWS 公式 試験ガイド（DVA-C02）の Domain 1 の全 29 スキル（Skill 1.1.1〜1.3.9）と、各サービスの AWS 公式ドキュメント"}</p>
</div>{" "}<div className="chips">
<span className="chip"><i className="ti ti-percentage" aria-hidden="true"></i>{"Domain 1 は配点 32%"}</span>
<span className="chip"><i className="ti ti-list-check" aria-hidden="true"></i>{"全 29 スキル"}</span>
<span className="chip"><i className="ti ti-chart-dots-3" aria-hidden="true"></i>{"Mermaid 図 31 点"}</span>
<span className="chip"><i className="ti ti-help-circle" aria-hidden="true"></i>{"練習問題 15 問"}</span>
</div>{" "}</header>
{/* SECTIONS */}
</>;});
/** 目次操作と静的本文を分離した学習ガイド。 */
export function DevelopmentGuide(){return <NavBar><GuideContents /></NavBar>;}
