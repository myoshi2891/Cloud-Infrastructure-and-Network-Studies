import NavBar from './NavBar';
import Foundation from './sections/foundation';
import Task41 from './sections/task41';
import Task42 from './sections/task42';
import Task43 from './sections/task43';
import Task44 from './sections/task44';
import Summary from './sections/summary';
import Appendix from './sections/appendix';

/** Domain 4本文（Server）。チェック進捗はChecklistCardのClient状態に閉じる。 */
export default function SapDomain4Guide() {
    return (
        <div className="sap-domain4-page">
            <div className="layout">
                <NavBar />
                <main className="main">
                    <Foundation />
                    <Task41 />
                    <Task42 />
                    <Task43 />
                    <Task44 />
                    <Summary />
                    <Appendix />
                </main>
            </div>
        </div>
    );
}
