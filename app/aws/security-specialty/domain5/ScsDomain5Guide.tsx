import NavBar from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Task51 from './sections/Task51';
import Task52 from './sections/Task52';
import Task53 from './sections/Task53';
import Summary from './sections/Summary';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';

/** SCS Domain 5 Guide コンポーネント。 */
export default function ScsDomain5Guide() {
    return (
        <div className="scs-domain5-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <HeroIntro />
                    <Task51 />
                    <Task52 />
                    <Task53 />
                    <Summary />
                    <ExamPrep />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
