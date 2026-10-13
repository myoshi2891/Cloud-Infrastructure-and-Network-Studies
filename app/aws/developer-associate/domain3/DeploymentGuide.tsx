import { NavBar } from './NavBar';
import { S1 } from './sections/S1';
import { S2 } from './sections/S2';
import { S3 } from './sections/S3';
import { S4 } from './sections/S4';
import { S5 } from './sections/S5';
import { S6 } from './sections/S6';
import { S7 } from './sections/S7';
import { S8 } from './sections/S8';
import { S9 } from './sections/S9';
import { S10 } from './sections/S10';
import { S11 } from './sections/S11';
import { S12 } from './sections/S12';
import { S13 } from './sections/S13';
import { S14 } from './sections/S14';
import { S15 } from './sections/S15';
import { S16 } from './sections/S16';
import { S17 } from './sections/S17';
import { S18 } from './sections/S18';
import { S19 } from './sections/S19';
import { S20 } from './sections/S20';
import { S21 } from './sections/S21';
import { S22 } from './sections/S22';
import { S23 } from './sections/S23';
import { S24 } from './sections/S24';
import { S25 } from './sections/S25';
import { S26 } from './sections/S26';
import { S27 } from './sections/S27';
import { S28 } from './sections/S28';
import { S29 } from './sections/S29';
import { S30 } from './sections/S30';
import { S31 } from './sections/S31';
import { S32 } from './sections/S32';
import { S33 } from './sections/S33';
/** 静的本文（Server Component）。 */
function GuideContents() { return <>
    <S1 />
    <S2 />
    <S3 />
    <S4 />
    <S5 />
    <S6 />
    <S7 />
    <S8 />
    <S9 />
    <S10 />
    <S11 />
    <S12 />
    <S13 />
    <S14 />
    <S15 />
    <S16 />
    <S17 />
    <S18 />
    <S19 />
    <S20 />
    <S21 />
    <S22 />
    <S23 />
    <S24 />
    <S25 />
    <S26 />
    <S27 />
    <S28 />
    <S29 />
    <S30 />
    <S31 />
    <S32 />
    <S33 />
</>; }
/** 原本のhero・33節・footerを保持するデプロイ教材。 */
export function DeploymentGuide() { return <div className="dva-deployment-page"><NavBar /><main>
<header className="hero">{" "}<div className="eyebrow">
{"AWS Certified Developer - Associate (DVA-C02)"}
</div>{" "}<h1>{"Content Domain 3: Deployment"}<span className="sub">{"初学者向けステップバイステップ・ガイド"}</span></h1>{" "}<p>{"公式試験ガイドの 4 タスク・27 スキルを漏れなく Step に対応させ、各 Step にベストプラクティスと根拠 URL を付けています。フローチャートは Mermaid、図解・表は Markdown 由来の表で記述しています（ASCII 図は不使用）。"}</p>{" "}<p>{"情報確認日: 2026-10-03（サービス状況は変わることがあるため、最終確認は公式ドキュメントで行ってください）。"}</p>{" "}<div className="chips">
<span className="chip">{"出題比率 24%"}</span>
<span className="chip">{"4 タスク / 27 スキル"}</span>
<span className="chip">{"試験 130 分・合格 720/1000"}</span>
</div>{" "}</header>
<div className="content"><GuideContents /></div>
<footer className="footer">{"© 学習用資料。AWS サービスの仕様・名称は公式ドキュメントを優先してください。"}</footer>
</main></div>; }
