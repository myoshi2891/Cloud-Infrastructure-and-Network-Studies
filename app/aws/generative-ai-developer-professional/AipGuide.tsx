'use client';

import NavBar from './NavBar';
import Foundation from './sections/Foundation';

/** 原本のサイドバーと全量本文を配置する。 */
export default function AipGuide() {
    return (
        <div className="aip-guide-page layout">
            <NavBar />
            <main className="main"><Foundation /></main>
        </div>
    );
}
