import { Diagram } from '../Diagram';
import { Skill2_2_1 } from './Skill2_2_1';
import { Skill2_2_2 } from './Skill2_2_2';
import { Skill2_2_3 } from './Skill2_2_3';
import { Skill2_2_4 } from './Skill2_2_4';
import { Skill2_2_5 } from './Skill2_2_5';

export function Sec4() {
    return (
        <section id="s4" className="section">
            <h2>4. Task 2.2: AI のビジネス価値を測定し実証する</h2>
            <p>
                Task 2.2 は、「AI
                は本当に価値を生んだのか」を数字で示す段階です。経営層の承認、予算の継続、拡大の判断は、すべてこの<strong>測定の質</strong>にかかっています。
            </p>
            <Diagram id="d8" />
            <hr />
            <Skill2_2_1 />
            <Skill2_2_2 />
            <Skill2_2_3 />
            <Skill2_2_4 />
            <Skill2_2_5 />
        </section>
    );
}
