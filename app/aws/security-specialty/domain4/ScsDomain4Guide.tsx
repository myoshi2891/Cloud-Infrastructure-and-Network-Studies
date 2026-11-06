import HeroIntro from './sections/HeroIntro';
import Task41 from './sections/Task41';
import Task42Authz from './sections/Task42Authz';
import Task42Policy from './sections/Task42Policy';
import Summary from './sections/Summary';
import ExamPrep from './sections/ExamPrep';
import Appendix from './sections/Appendix';
import NavBar from './NavBar';

/**
 * AWS SCS-C03 Domain 4: Identity and Access Management 完全ガイド。
 */
export default function ScsDomain4Guide() {
    return (
        <div className="scs-domain4-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <HeroIntro />
                    <Task41 />
                    <Task42Authz />
                    <Task42Policy />
                    <Summary />
                    <ExamPrep />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
