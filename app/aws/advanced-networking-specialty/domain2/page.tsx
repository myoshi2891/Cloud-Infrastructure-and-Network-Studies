import type {Metadata} from 'next';
import AnsDomain2Guide from './AnsDomain2Guide';
import './page.css';
export const metadata:Metadata={title:'AWS Certified Advanced Networking - Specialty (ANS-C01) Content Domain 2: Network Implementation(ネットワークの実装)初学者向けステップバイステップ解説',description:'ANS-C01 Domain 2の全4タスクを57表・26図・11コード・確認問題8問で学ぶネットワーク実装ガイド。'};
/** ANS-C01 Domain 2ガイドのServer入口。 */
export default function Page(){return <AnsDomain2Guide/>;}
