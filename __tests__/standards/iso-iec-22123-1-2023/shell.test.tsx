import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import Guide from '@/app/standards/iso-iec-22123-1-2023/IsoGuide';
import Checklist from '@/app/standards/iso-iec-22123-1-2023/Checklist';

describe('ISOガイドの操作境界', () => {
    it('目次を開きEscapeで閉じ、フォーカスをトグルへ戻す', async () => {
        const user = userEvent.setup();
        const { getByRole } = render(<Guide><h2 id="0-この規格を一言でいうと">本文</h2></Guide>);
        const toggle = getByRole('button', { name: '目次を開閉' });
        await user.click(toggle);
        expect(toggle).toHaveAttribute('aria-expanded', 'true');
        await user.keyboard('{Escape}');
        expect(toggle).toHaveAttribute('aria-expanded', 'false');
        expect(toggle).toHaveFocus();
    });
    it('各チェックの切替が独立して進捗へ反映される', async () => {
        const user = userEvent.setup();
        const { getAllByRole, container } = render(<Checklist labels={['用語を説明', 'モデルを比較']} />);
        const boxes = getAllByRole('checkbox');
        await user.click(boxes[1]!);
        expect(boxes[0]).not.toBeChecked();
        expect(boxes[1]).toBeChecked();
        expect(container.querySelector('.cp-count')).toHaveTextContent('1 / 2');
        expect(container.querySelector('.cp-fill')).toHaveStyle({ width: '50%' });
    });
});
