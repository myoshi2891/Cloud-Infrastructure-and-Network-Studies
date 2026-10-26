'use client';

import { createContext, useContext, useState, type ComponentProps, type ReactNode } from 'react';
import { QUIZ_ANSWERS } from './constants';

const QuizContext = createContext<{
    selected: Readonly<Record<string, string>>;
    choose: (id: string, value: string) => void;
    reset: () => void;
} | null>(null);
const CardContext = createContext<{ id: string; answer: string } | null>(null);
const total = Object.keys(QUIZ_ANSWERS).length;
function useQuiz() { const value = useContext(QuizContext); if (!value) throw new Error('QuizProvider is required'); return value; }
function useCard() { const value = useContext(CardContext); if (!value) throw new Error('QuizCard is required'); return value; }

/** 原本の単一回答・再回答禁止・リセットを保持する。 */
export function QuizProvider({ children }: { children: ReactNode }) {
    const [selected, setSelected] = useState<Record<string, string>>({});
    return <QuizContext.Provider value={{ selected,
        choose: (id, value) => setSelected(previous => previous[id] ? previous : { ...previous, [id]: value }),
        reset: () => setSelected({}),
    }}>{children}</QuizContext.Provider>;
}

/** 回答済みのカードに正誤クラスを適用する。 */
export function QuizCard({ answer, id, className, children, ...props }: Omit<ComponentProps<'article'>, 'id'> & { answer: string; id: string }) {
    const { selected } = useQuiz();
    const value = selected[id];
    return <CardContext.Provider value={{ id, answer }}>
        <article {...props} id={id} className={`${className ?? ''}${value ? value === answer ? ' is-correct' : ' is-wrong' : ''}`}>{children}</article>
    </CardContext.Provider>;
}

/** 正解・選択した誤答・その他を色分けし、回答後はフォーカスを保ったまま aria-disabled で無効化する。 */
export function QuizOption({ value, className, ...props }: Omit<ComponentProps<'button'>, 'value'> & { value: string }) {
    const { id, answer } = useCard(); const { selected, choose } = useQuiz(); const current = selected[id];
    const result = current ? value === answer ? ' is-correct' : value === current ? ' is-wrong' : ' is-dim' : '';
    return <button {...props} type="button" className={`${className ?? ''}${result}`} aria-disabled={current ? true : undefined} onClick={() => { if (!current) choose(id, value); }} />;
}

/** 選択後だけ原本の解説を開示する。 */
export function QuizResult(props: ComponentProps<'div'>) {
    const { id } = useCard(); const { selected } = useQuiz();
    return <div {...props} hidden={!selected[id]} />;
}

/** 原本どおりの正誤メッセージを表示する。 */
export function QuizVerdict() {
    const { id, answer } = useCard(); const { selected } = useQuiz(); const value = selected[id];
    return <div className="q-verdict">{value ? value === answer ? '✓ 正解です' : `✗ 不正解です。正解は ${answer} です` : ''}</div>;
}

/** 回答済み数または正解数を初期のstrong要素に表示する。 */
export function QuizStat({ kind }: { kind: 'answered' | 'correct' }) {
    const { selected } = useQuiz();
    const count = Object.entries(selected).filter(([id, value]) => kind === 'answered' || QUIZ_ANSWERS[id] === value).length;
    return <strong id={kind === 'answered' ? 'qDone' : 'qScore'}>{count}</strong>;
}

/** 全問に対する回答率を表示する。 */
export function QuizProgress() {
    const { selected } = useQuiz();
    return <div id="qFill" className="qb-fill" style={{ width: `${Object.keys(selected).length / total * 100}%` }} />;
}

/** 全問回答時に75%を基準とした原本の総合メッセージを表示する。 */
export function QuizFinal() {
    const { selected } = useQuiz(); const done = Object.keys(selected).length;
    const score = Object.entries(selected).filter(([id, value]) => QUIZ_ANSWERS[id] === value).length;
    const percent = Math.round(score / total * 100);
    const message = percent >= 75
        ? '合格ラインの目安に到達しています。間違えた問題を解説で復習しましょう。'
        : '正答率が 75% 未満です。間違えた問題の Step に戻って復習しましょう。';
    return <div id="qFinal" className="qb-final" hidden={done !== total}>{done === total ? `全 ${total} 問終了:${score} / ${total}(${percent}%) ${message}` : ''}</div>;
}

/** 状態を初期化し、原本と同じく問題区画へスクロールする。 */
export function QuizReset(props: ComponentProps<'button'>) {
    const { reset } = useQuiz();
    return <button {...props} type="button" onClick={() => {
        reset();
        const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
        document.getElementById('quiz')?.scrollIntoView?.({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    }} />;
}
