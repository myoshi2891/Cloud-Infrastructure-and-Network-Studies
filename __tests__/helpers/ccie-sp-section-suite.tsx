import type { ComponentType } from 'react';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import HeroIntro from '@/app/cisco/ccie/service-provider/sections/HeroIntro';
import CoreRouting from '@/app/cisco/ccie/service-provider/sections/CoreRouting';
import ArchitecturesServices from '@/app/cisco/ccie/service-provider/sections/ArchitecturesServices';
import AccessConnectivity from '@/app/cisco/ccie/service-provider/sections/AccessConnectivity';
import HighAvailability from '@/app/cisco/ccie/service-provider/sections/HighAvailability';
import Security from '@/app/cisco/ccie/service-provider/sections/Security';
import AssuranceAutomation from '@/app/cisco/ccie/service-provider/sections/AssuranceAutomation';
import Appendix from '@/app/cisco/ccie/service-provider/sections/Appendix';
import { ccieSpInventory } from './ccie-sp-inventory';
import { squash } from './migration-test-utils';

/** page.tsx と同じ描画順のセクション。目次（NavBar）は見出し・表セル・外部リンクを持たないため、本文はこの順で全量を構成する。 */
const SECTIONS = [
    HeroIntro,
    CoreRouting,
    ArchitecturesServices,
    AccessConnectivity,
    HighAvailability,
    Security,
    AssuranceAutomation,
    Appendix,
] as const satisfies readonly ComponentType[];

type SectionComponent = (typeof SECTIONS)[number];

/** 本文のみで構成される種別。li は目次分を含むためページ全体テストで検証する。 */
const TEXT_KINDS = ['h1', 'h2', 'h3', 'h4', 'th', 'td'] as const;
type TextKind = (typeof TEXT_KINDS)[number];

/** セクションを単独描画し、種別ごとの描画値（テキストは空白除去、リンクは href）を出現順に返す。 */
const renderedCache = new Map<ComponentType, Record<TextKind | 'links', string[]>>();

function renderedValues(Section: ComponentType): Record<TextKind | 'links', string[]> {
    const cached = renderedCache.get(Section);
    if (cached) return cached;
    const { container, unmount } = render(<Section />);
    const texts = Object.fromEntries(
        TEXT_KINDS.map((kind) => [
            kind,
            [...container.querySelectorAll(kind)].map((element) => squash(element.textContent ?? '')),
        ]),
    ) as Record<TextKind, string[]>;
    const links = [...container.querySelectorAll('a[href^="http"]')].map(
        (anchor) => anchor.getAttribute('href') ?? '',
    );
    unmount();
    const result = { ...texts, links };
    renderedCache.set(Section, result);
    return result;
}

/** セクション単独描画での表（列見出し数）とコードブロック（行数）を出現順に返す。 */
const structureCache = new Map<ComponentType, { tableColumnHeaders: number[]; codeLines: number[] }>();

function renderedStructures(Section: ComponentType): { tableColumnHeaders: number[]; codeLines: number[] } {
    const cached = structureCache.get(Section);
    if (cached) return cached;
    const { container, unmount } = render(<Section />);
    const result = {
        tableColumnHeaders: [...container.querySelectorAll('table')].map(
            (table) => table.querySelectorAll('th[scope="col"]').length,
        ),
        codeLines: [...container.querySelectorAll('.code-block')].map(
            (block) => block.querySelectorAll('.code-line').length,
        ),
    };
    unmount();
    structureCache.set(Section, result);
    return result;
}

/** インベントリ structures のうち、指定セクションが担う表の列見出し数とコード行数の期待値。 */
export function expectedStructures(Section: SectionComponent): { tableColumnHeaders: number[]; codeLines: number[] } {
    const index = SECTIONS.indexOf(Section);
    const before = SECTIONS.slice(0, index).map(renderedStructures);
    const own = renderedStructures(Section);
    const offset = (key: 'tableColumnHeaders' | 'codeLines'): number =>
        before.reduce((sum, item) => sum + item[key].length, 0);
    const { tableColumnHeaders, codeLines } = ccieSpInventory.structures;
    return {
        tableColumnHeaders: tableColumnHeaders.slice(
            offset('tableColumnHeaders'),
            offset('tableColumnHeaders') + own.tableColumnHeaders.length,
        ),
        codeLines: codeLines.slice(offset('codeLines'), offset('codeLines') + own.codeLines.length),
    };
}

const EXPECTED: Record<TextKind | 'links', readonly string[]> = {
    ...(Object.fromEntries(TEXT_KINDS.map((kind) => [kind, ccieSpInventory[kind].map(squash)])) as Record<
        TextKind,
        string[]
    >),
    links: ccieSpInventory.links.map((link) => link.href),
};

/**
 * インベントリのうち、指定セクションが担う区間を返す。
 * 開始位置は先行セクションの描画件数の累積。最終セクションは末尾まで全件を担うため、
 * どのセクションが末尾の要素を落としても、後続セクション（最終なら自身）の検証が失敗する。
 */
function expectedSlice(kind: TextKind | 'links', index: number, renderedCount: number): readonly string[] {
    const offset = SECTIONS.slice(0, index).reduce((sum, Section) => sum + renderedValues(Section)[kind].length, 0);
    const isLast = index === SECTIONS.length - 1;
    return EXPECTED[kind].slice(offset, isLast ? undefined : offset + renderedCount);
}

/**
 * CCIE SP の各セクションについて、全見出し（h1〜h4）・全表セル（th / td）を空白除去後の完全一致で、
 * 外部リンクの href を重複を含む出現順の配列で、訂正済みインベントリの該当区間と照合する。
 */
export function defineCcieSpSectionSuite(Section: SectionComponent): void {
    const index = SECTIONS.indexOf(Section);
    describe(`${Section.name} — インベントリ区間との完全一致`, () => {
        it('セクションが page.tsx の描画順に登録されている', () => {
            expect(index).toBeGreaterThanOrEqual(0);
        });

        it.each([...TEXT_KINDS, 'links' as const])('%s が件数・順序・内容まで移行元の区間と一致する', (kind) => {
            const rendered = renderedValues(Section)[kind];
            expect(rendered).toEqual(expectedSlice(kind, index, rendered.length));
        });
    });
}
