import type {Metadata} from 'next';
import AipDomain2Guide from './AipDomain2Guide';
import './page.css';
export const metadata:Metadata={title:'AIP-C01 Domain 2: 実装と統合 | Cloud Infrastructure Studies',description:'AIP-C01 Domain 2の全5タスク・25スキル、42図、96表を解説する学習ガイド。'};
/** Domain 2詳細ガイドのServerエントリ。 */
export default function Page(){return <AipDomain2Guide/>;}
