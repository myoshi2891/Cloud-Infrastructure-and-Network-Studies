import { render, act } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import NavBar from '@/app/recommended-books/designing-data-intensive-applications/NavBar';
import { NAV_ITEMS } from '@/app/recommended-books/designing-data-intensive-applications/constants';

const OFFSET_RATIO = 0.15;

function mountHeadings(tops: number[]) {
  const nodes = NAV_ITEMS.map((item, index) => {
    const el = document.createElement('h2');
    el.id = item.id;
    el.getBoundingClientRect = () => ({ top: tops[index] ?? 99999 } as DOMRect);
    document.body.appendChild(el);
    return el;
  });
  return { setTops(next: number[]) { nodes.forEach((n, i) => { n.getBoundingClientRect = () => ({ top: next[i] ?? 99999 } as DOMRect); }); } };
}
const current = (c: HTMLElement) => c.querySelector('a[aria-current="location"]')?.getAttribute('href');

afterEach(() => { document.body.innerHTML = ''; });

describe('DDIA 目次の現在位置', () => {
  it('長い節の途中では、見出しが観測帯から外れても直前の見出しを現在位置にする', () => {
    const h = window.innerHeight;
    const offset = h * OFFSET_RATIO;
    const tops = NAV_ITEMS.map((_, i) => offset + 50 + i * 2000);
    const headings = mountHeadings(tops);
    const { container } = render(<NavBar />);
    // 3番目の見出しが画面上端を大きく越え、次の見出しはまだ画面下にある（下方向スクロール）
    headings.setTops(NAV_ITEMS.map((_, i) => (i <= 2 ? -3000 + i * 1000 : h * 3 + i * 2000)));
    act(() => { window.dispatchEvent(new Event('scroll')); });
    expect(current(container)).toBe('#' + NAV_ITEMS[2].id);
    // 上方向スクロールで1番目の節の中へ戻る（2番目の見出しは下へ外れる）
    headings.setTops(NAV_ITEMS.map((_, i) => (i === 0 ? -500 : h * 2 + i * 2000)));
    act(() => { window.dispatchEvent(new Event('scroll')); });
    expect(current(container)).toBe('#' + NAV_ITEMS[0].id);
  });
});
