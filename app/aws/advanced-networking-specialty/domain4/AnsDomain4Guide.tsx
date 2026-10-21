import Foundation from './sections/Foundation';
import Task41 from './sections/Task41';
import Task42 from './sections/Task42';
import Task43 from './sections/Task43';
import Revision from './sections/Revision';
import NavBar from './NavBar';
/** ANS-C01 Domain 4の全区画を原本の順序で表示する。 */
export default function AnsDomain4Guide() {
    return <div className="ans-domain4-page layout"><NavBar /><main className="main"><Foundation /><Task41 /><Task42 /><Task43 /><Revision /></main></div>;
}
