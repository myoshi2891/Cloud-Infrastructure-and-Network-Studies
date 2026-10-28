import NavBar from './NavBar';
import Hero from './sections/Hero';
import Task11 from './sections/Task11';
import Task12 from './sections/Task12';
import Task13 from './sections/Task13';
import ScenarioSummary from './sections/ScenarioSummary';
import ChecklistSection from './sections/ChecklistSection';
import Questions from './sections/Questions';
import UpdatesAndReferences from './sections/UpdatesAndReferences';

/** SCS-C03 Domain 1 (Detection) 学習ガイドの全セクション構成 */
export default function ScsDomain1Guide() {
    return (
        <div className="scs-domain1-page layout">
            <NavBar />
            <main className="main">
                <Hero />
                <Task11 />
                <Task12 />
                <Task13 />
                <ScenarioSummary />
                <ChecklistSection />
                <Questions />
                <UpdatesAndReferences />
            </main>
        </div>
    );
}
