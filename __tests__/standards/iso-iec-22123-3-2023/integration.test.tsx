import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { EXAMS, STATS } from '@/app/constants';
import { toNavTree } from '@/app/navigation';
import { ProviderMark } from '@/components/ProviderMark';

describe('国際規格ガイドのホーム・Header統合', () => {
    it('国際規格グループからISOガイドへ1つの正しいリンクを提供する', () => {
        const exam = EXAMS.find(item => item.id === 'iso-iec-22123-3-2023');
        expect(exam?.provider).toBe('Standards');
        expect(exam?.href).toBe('/standards/iso-iec-22123-3-2023');
        const group = toNavTree(EXAMS).find(item => item.provider === 'Standards');
        expect(group?.exams.find(item => item.id === exam?.id)?.items).toEqual([
            { label: 'リファレンスアーキテクチャ', href: '/standards/iso-iec-22123-3-2023' },
        ]);
    });
    it('規格を資格試験として集計せず、規格用のプロバイダーマークを表示する', () => {
        const count = EXAMS.filter(item => item.status !== 'coming-soon' && !['Books', 'Tools', 'Standards'].includes(item.provider)).length;
        expect(STATS[0]?.value).toBe(String(count));
        const { getByText } = render(<ProviderMark provider="Standards" />);
        expect(getByText('ISO/IEC')).toBeInTheDocument();
    });
});
