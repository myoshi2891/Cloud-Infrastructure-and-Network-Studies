import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EXAMS } from '@/app/constants';
import { ExamCatalog } from '@/components/sections/home';
import { Header } from '@/components/Header';

vi.mock('next/navigation', () => ({ usePathname: () => '/' }));
const exams = EXAMS.filter((exam) => exam.status !== 'coming-soon');

describe('カタログの検索とカテゴリ選択', () => {
    it('カテゴリとキーワードを組み合わせ、該当なしからリセットできる', async () => {
        const user = userEvent.setup();
        render(<ExamCatalog exams={exams} />);
        const originalCount = screen.getAllByRole('article').length;
        await user.click(screen.getByRole('button', { name: /^Amazon Web Services/ }));
        expect(screen.getAllByRole('article')).toHaveLength(exams.filter((exam) => exam.provider === 'AWS').length);
        await user.type(screen.getByRole('searchbox'), '存在しない教材');
        expect(screen.queryAllByRole('article')).toHaveLength(0);
        await user.click(screen.getByRole('button', { name: '検索条件をリセット' }));
        expect(screen.getAllByRole('article')).toHaveLength(originalCount);
        expect(screen.getByRole('searchbox')).toHaveValue('');
    });

    it('略称とドメイン名でも教材を発見できる', async () => {
        const user = userEvent.setup();
        render(<ExamCatalog exams={exams} />);
        await user.type(screen.getByRole('searchbox'), 'ACE');
        expect(screen.getByRole('heading', { name: 'Associate Cloud Engineer' })).toBeInTheDocument();
        await user.clear(screen.getByRole('searchbox'));
        await user.type(screen.getByRole('searchbox'), '運用管理');
        expect(screen.getByRole('heading', { name: 'Associate Cloud Engineer' })).toBeInTheDocument();
    });
});

describe('グローバルメニューの拡張可能なカテゴリ選択', () => {
    it('カテゴリ内を検索し、閉じて再度開くと全カテゴリに戻る', async () => {
        const user = userEvent.setup();
        render(<Header />);
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
        const dialog = within(screen.getByRole('dialog'));
        await user.click(dialog.getByRole('button', { name: /^Amazon Web Services/ }));
        expect(dialog.queryByRole('heading', { name: 'Google Cloud' })).not.toBeInTheDocument();
        expect(dialog.getByRole('heading', { name: 'Amazon Web Services' })).toBeInTheDocument();
        await user.type(dialog.getByRole('searchbox'), 'cloud digital');
        expect(dialog.getByRole('status')).toHaveTextContent('該当する項目はありません');
        await user.keyboard('{Escape}');
        await screen.findByRole('button', { name: 'メニューを開く', expanded: false });
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
        expect(within(screen.getByRole('dialog')).getByRole('button', { name: /^すべて/ })).toHaveAttribute('aria-pressed', 'true');
        expect(within(screen.getByRole('dialog')).getByRole('searchbox')).toHaveValue('');
    });

    it('検索欄を含めてTabキーでフォーカスが順番に進む', async () => {
        const user = userEvent.setup();
        render(<Header />);
        await user.click(screen.getByRole('button', { name: 'メニューを開く' }));
        const dialog = within(screen.getByRole('dialog'));
        dialog.getByRole('searchbox').focus();
        await user.tab();
        expect(dialog.getByRole('button', { name: /^すべて/ })).toHaveFocus();
    });
});
