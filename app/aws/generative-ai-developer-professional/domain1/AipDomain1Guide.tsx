import NavBar from './NavBar';
import Task16 from './sections/Task16';
import Task15 from './sections/Task15';
import Task14 from './sections/Task14';
import Task13 from './sections/Task13';
import Task12 from './sections/Task12';
import Task11 from './sections/Task11';
import Foundation from './sections/Foundation';

/** 原本ライトテーマの目次と本文を配置する。状態は操作用コンポーネント内に閉じる。 */
export default function AipDomain1Guide() {
    return <div className="aip-domain1-page layout"><NavBar /><main className="main"><Foundation /><Task11 /><Task12 /><Task13 /><Task14 /><Task15 /><Task16 /></main></div>;
}
