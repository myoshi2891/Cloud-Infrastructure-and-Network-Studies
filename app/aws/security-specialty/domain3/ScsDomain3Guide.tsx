import NavBar from './NavBar';
import HeroIntro from './sections/HeroIntro';
import Task31 from './sections/Task31';
import Task32 from './sections/Task32';
import Task33 from './sections/Task33';
import Summary from './sections/Summary';
import Troubleshooting from './sections/Troubleshooting';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';

/** Domain 3 本文の全セクションを原本の順序で構成する。 */
export default function ScsDomain3Guide() {
    return (
        <div className="scs-domain3-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <HeroIntro />
                    <Task31 />
                    <Task32 />
                    <Task33 />
                    <Summary />
                    <Troubleshooting />
                    <ExamPrep />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
