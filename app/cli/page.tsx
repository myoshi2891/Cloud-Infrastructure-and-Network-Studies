import type { Metadata } from 'next';
import CliGuide from './CliGuide';
import './page.css';

export const metadata: Metadata = {
    title: 'CLIコマンド実践ワンライナー集 — 初学者のためのステップバイステップガイド',
    description:
        '日常の開発・運用・トラブルシューティングで「知っていると10倍速くなる」CLIワンライナーを、仕組みの理解から実践シナリオまで段階的に解説します。find, grep, sed, awk, ps, ss, lsof, df, du, Git, Docker, journalctl など主要コマンドの構文とパイプライン処理を網羅。',
};

export default function CliPage() {
    return <CliGuide />;
}
