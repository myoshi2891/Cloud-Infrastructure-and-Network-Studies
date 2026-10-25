import NavBar from './NavBar';
import { QuizProvider } from './Quiz';
import Foundation from './sections/Foundation';
import Domain1 from './sections/Domain1';
import Domain2 from './sections/Domain2';
import Domain3 from './sections/Domain3';
import Domain4 from './sections/Domain4';
import Domain5 from './sections/Domain5';
import Domain6 from './sections/Domain6';
import Revision from './sections/Revision';

/** 本文はサーバー描画し、目次とクイズの操作だけをクライアントへ分離する。 */
export default function SecuritySpecialtyGuide() {
    return <div className="scs-guide-page"><div className="layout">
        <NavBar />
        <main className="main">
            <Foundation /><Domain1 /><Domain2 /><Domain3 /><Domain4 /><Domain5 /><Domain6 />
            <QuizProvider><Revision /></QuizProvider>
        </main>
    </div></div>;
}
