import type {Metadata} from 'next';
import AnsDomain1Guide from './AnsDomain1Guide';
import './page.css';
export const metadata:Metadata={title:"AWS Certified Advanced Networking - Specialty (ANS-C01) Content Domain 1: Network Design 初学者向けステップバイステップ解説ガイド",description:'ANS-C01 Domain 1の全6タスクを75表・15図・7コード・6問・10チェックで学ぶネットワーク設計ガイド。'};
/** ANS-C01 Domain 1ガイドのServer入口。 */
export default function Page(){return <AnsDomain1Guide />;}
