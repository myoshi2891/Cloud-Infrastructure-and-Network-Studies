'use client';

import NavBar from './NavBar';
import Foundation from './sections/Foundation';
import Domain1 from './sections/Domain1';

/** 原本のサイドバーと全量本文を配置する。 */
export default function AipGuide() {
    return (
        <div className="aip-guide-page layout">
            <NavBar />
            <main className="main"><Foundation />
<Domain1 /></main>
        </div>
    );
}
