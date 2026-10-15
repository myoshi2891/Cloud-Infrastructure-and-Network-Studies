import NavBar from './NavBar';
import Foundation from './sections/Foundation';

/** 原本ライトテーマの目次と本文を配置する。状態は操作用コンポーネント内に閉じる。 */
export default function AipDomain1Guide() {
    return <div className="aip-domain1-page layout"><NavBar /><main className="main"><Foundation /></main></div>;
}
