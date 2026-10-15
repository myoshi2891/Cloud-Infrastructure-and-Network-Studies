import { Diagram } from '../Diagram';
import { Skill2_3_1 } from './Skill2_3_1';
import { Skill2_3_2 } from './Skill2_3_2';
import { Skill2_3_3 } from './Skill2_3_3';
import { Skill2_3_4 } from './Skill2_3_4';

export function Sec5() {
    return (
        <section id="s5" className="section">
            <h2>5. Task 2.3: 競争優位のために AI を位置づける</h2>
            <p>
                Task 2.3 は、AI
                を「社内の効率化ツール」にとどめず、<strong>競争上の武器</strong>として位置づける視点です。自社だけでなく、市場、競合、業界の成熟度を見て判断します。
            </p>
            <Diagram id="d14" />
            <hr />
            <Skill2_3_1 />
            <Skill2_3_2 />
            <Skill2_3_3 />
            <Skill2_3_4 />
        </section>
    );
}
