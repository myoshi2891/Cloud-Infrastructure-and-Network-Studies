import { Diagram } from '../Diagram';
import { Skill2_1_1 } from './Skill2_1_1';
import { Skill2_1_2 } from './Skill2_1_2';
import { Skill2_1_3 } from './Skill2_1_3';
import { Skill2_1_4 } from './Skill2_1_4';
import { Skill2_1_5 } from './Skill2_1_5';

export function Sec3() {
    return (
        <section id="s3" className="section">
            <h2>3. Task 2.1: AI 戦略をビジネス目標に整合させる</h2>
            <p>
                Task 2.1 は、「AI を使う理由」と「どう進めるか」を決める段階です。AI
                ありきではなく、<strong>ビジネス課題から出発する</strong>ことが全編を貫く原則です。
            </p>
            <Diagram id="d2" />
            <hr />
            <Skill2_1_1 />
            <Skill2_1_2 />
            <Skill2_1_3 />
            <Skill2_1_4 />
            <Skill2_1_5 />
        </section>
    );
}
