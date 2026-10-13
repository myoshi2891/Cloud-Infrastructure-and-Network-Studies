'use client';

import NavBar from './NavBar';
import Foundation from './sections/Foundation';
import Domain1 from './sections/Domain1';
import Domain2 from './sections/Domain2';
import Domain3 from './sections/Domain3';
import Operations from './sections/Operations';
import Revision from './sections/Revision';

/** 原本のサイドバーと全量本文を配置する。 */
export default function AipGuide() {
    return (
        <div className="aip-guide-page layout">
            <NavBar />
            <main className="main"><Foundation />
<Domain1 />
<Domain2 />
<Domain3 />
<Operations />
<Revision /></main>
        </div>
    );
}
