import NavBar from './NavBar';
import Hero from './sections/Hero';
import Task21 from './sections/Task21';
import Task22 from './sections/Task22';
import Scenarios from './sections/Scenarios';
import ExamPrep from './sections/ExamPrep';
import ChecklistSection from './sections/ChecklistSection';
import Appendix from './sections/Appendix';

/** SCS-C03 Domain 2 (Incident Response) 学習ガイドの全セクション構成 */
export default function ScsDomain2Guide() {
    return (
        <div className="scs-domain2-page layout">
            <NavBar />
            <main className="main">
                <Hero />
                <Task21 />
                <Task22 />
                <Scenarios />
                <ExamPrep />
                <ChecklistSection />
                <Appendix />
            </main>
        </div>
    );
}
