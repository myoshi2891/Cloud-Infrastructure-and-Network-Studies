import type { Metadata } from 'next';
import AnsDomain3Guide from './AnsDomain3Guide';
import './page.css';
export const metadata: Metadata = {title:'AWS Certified Advanced Networking - Specialty (ANS-C01) Domain 3: Network Management and Operation',description:'ANS-C01 Domain 3の全3タスクを91表・26図・7コード・確認問題8問で学ぶネットワーク管理・運用ガイド。'};
/** ANS-C01 Domain 3ガイドのServer入口。 */
export default function Page(){return <AnsDomain3Guide/>;}
