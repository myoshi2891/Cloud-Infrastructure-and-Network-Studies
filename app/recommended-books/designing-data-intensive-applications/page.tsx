import type { Metadata } from 'next';
import DdiaGuide from './DdiaGuide';
import './page.css';
export const metadata: Metadata = { title: 'Designing Data-Intensive Applications（DDIA）初学者向け完全ガイド' };
/** DDIA学習ガイド。 */
export default function Page() { return <DdiaGuide />; }
