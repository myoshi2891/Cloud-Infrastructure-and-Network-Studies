import NavBar from './NavBar';
import Foundation from './sections/foundation';
import Task21 from './sections/task21';
import Task22 from './sections/task22';
import Task23 from './sections/task23';
import Task24 from './sections/task24';
import Task25 from './sections/task25';
import Task26 from './sections/task26';
import Appendix from './sections/appendix';
/** Domain 2本文（Server）。チェック進捗はChecklistCardのClient状態に閉じる。 */
export default function SapDomain2Guide() {
 return <div className="sap-domain2-page"><div className="layout"><NavBar/><main className="main"><Foundation/><Task21/><Task22/><Task23/><Task24/><Task25/><Task26/><Appendix/></main></div></div>;
}
