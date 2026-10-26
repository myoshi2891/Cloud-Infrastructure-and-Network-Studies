import NavBar from './NavBar';
import Foundation from './sections/Foundation';
import Domain1 from './sections/Domain1';
import Domain2 from './sections/Domain2';
import Domain3 from './sections/Domain3';
import Domain4 from './sections/Domain4';
import Revision from './sections/Revision';

/** 本文をサーバー描画し、目次と練習問題の操作だけをクライアントへ分離する。 */
export default function SolutionsArchitectProfessionalGuide() {
    return <div className="sap-guide-page"><div className="layout">
        <NavBar />
        <main className="main"><Foundation /><Domain1 /><Domain2 /><Domain3 /><Domain4 /><Revision /></main>
    </div></div>;
}
