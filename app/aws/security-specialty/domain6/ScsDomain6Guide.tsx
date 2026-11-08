import NavBar from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Task61 from './sections/Task61';
import Task62 from './sections/Task62';
import Task63 from './sections/Task63';
import Summary from './sections/Summary';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';

/** SCS Domain 6 Guide コンポーネント。 */
export default function ScsDomain6Guide() {
    return (
        <div className="scs-domain6-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <HeroIntro />
                    <Task61 />
                    <Task62 />
                    <Task63 />
                    <Summary />
                    <ExamPrep />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
