import NavBar from './NavBar';
import Foundation from './sections/foundation';
import Task31 from './sections/task31';
import Task32 from './sections/task32';
import Task33 from './sections/task33';
import Task34 from './sections/task34';
import Task35 from './sections/task35';
import Appendix from './sections/appendix';
/** Domain 3本文（Server）。チェック進捗はChecklistCardのClient状態に閉じる。 */
export default function SapDomain3Guide() {
 return <div className="sap-domain3-page"><div className="layout"><NavBar/><main className="main"><Foundation/><Task31/><Task32/><Task33/><Task34/><Task35/><Appendix/></main></div></div>;
}
