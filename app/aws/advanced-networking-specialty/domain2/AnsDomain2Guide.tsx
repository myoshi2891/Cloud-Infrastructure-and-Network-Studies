import NavBar from './NavBar';
import Foundation from './sections/Foundation';
import Task21 from './sections/Task21';
import Task22 from './sections/Task22';
import Task23 from './sections/Task23';
import Task24 from './sections/Task24';
import Revision from './sections/Revision';
/** 原本の全区分を掲載順に構成する。操作状態はNavBar内に限定する。 */
export default function AnsDomain2Guide(){return <div className="ans-domain2-page layout"><NavBar/><main className="main"><Foundation/><Task21/><Task22/><Task23/><Task24/><Revision/></main></div>;}
