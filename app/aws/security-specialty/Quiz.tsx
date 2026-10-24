'use client';

import { createContext, useContext, useId, useState, type ComponentProps, type ReactNode } from 'react';

type AnswerState = { selected: string[]; open: boolean; correct: boolean };
type QuizState = Record<string, AnswerState>;
const QuizContext = createContext<{ state: QuizState; update: (id: string, value: AnswerState) => void; reset: () => void } | null>(null);
const CardContext = createContext<{ selected: string[]; open: boolean; graded: boolean; answers: string[]; multi: number; labelId: string; select: (value: string) => void; toggle: () => void } | null>(null);
const empty: AnswerState = { selected: [], open: false, correct: false };

/** 全8問の回答・開閉状態をReactで管理する。 */
export function QuizProvider({ children }: { children: ReactNode }) {
    const [state, setState] = useState<QuizState>({});
    return <QuizContext.Provider value={{ state, update: (id, value) => setState(previous => ({ ...previous, [id]: value })), reset: () => setState({}) }}>{children}</QuizContext.Provider>;
}
function useQuiz() { const value = useContext(QuizContext); if (!value) throw new Error('QuizProvider is required'); return value; }
function useCard() { const value = useContext(CardContext); if (!value) throw new Error('QuizCard is required'); return value; }

/** 原本の採点・個数制限・DOM順の選択置換を保持する問題カード。 */
export function QuizCard({ answer, multi, labelId, className, children, ...props }: ComponentProps<'div'> & { answer: string; multi: number; labelId: string }) {
    const id = useId(); const quiz = useQuiz(); const current = quiz.state[id] ?? empty;
    const answers = answer.split(',').map(value => value.trim());
    const isCorrect = (selected: string[]) => selected.length === answers.length && answers.every(value => selected.includes(value));
    const graded = current.selected.length >= multi || (current.open && current.selected.length > 0);
    const select = (value: string) => {
        let selected = [...current.selected];
        if (selected.includes(value)) selected = selected.filter(item => item !== value);
        else if (multi === 1) selected = [value];
        else { if (selected.length >= multi) selected.shift(); selected.push(value); selected.sort(); }
        quiz.update(id, { selected, open: current.open || selected.length >= multi, correct: isCorrect(selected) });
    };
    const toggle = () => quiz.update(id, { ...current, open: !current.open });
    return <CardContext.Provider value={{ ...current, graded, answers, multi, labelId, select, toggle }}>
        <div {...props} data-multi={multi} className={`${className ?? ''}${graded ? isCorrect(current.selected) ? ' is-graded-correct' : ' is-graded-wrong' : ''}`}>{children}</div>
    </CardContext.Provider>;
}

/** マウス・Enter・Spaceで操作できる単一／複数選択肢。 */
export function QuizOption({ value, children, ...props }: Omit<ComponentProps<'li'>, 'value'> & { value: string }) {
    const card = useCard(); const selected = card.selected.includes(value); const correct = card.answers.includes(value);
    const result = card.graded && ((selected && correct) || (card.open && correct)) ? ' is-correct' : card.graded && selected ? ' is-wrong' : '';
    return <li {...props} role={card.multi > 1 ? 'checkbox' : 'radio'} tabIndex={0} aria-checked={selected} className={`${selected ? 'is-selected' : ''}${result}`} onClick={() => card.select(value)} onKeyDown={event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); card.select(value); }
    }}>{children}</li>;
}

/** 自動開示後も利用者が開閉でき、リセットにも連動する解説。 */
export function QuizDetails({ children, ...props }: ComponentProps<'details'>) {
    const card = useCard();
    return <details {...props} open={card.open} onClick={event => {
        if (event.target instanceof Element && event.target.closest('summary')) { event.preventDefault(); card.toggle(); }
    }}>{children}</details>;
}

/** 回答済み数と正解数を原本の表記で表示する。 */
export function QuizStat({ kind, className }: { kind: 'answered' | 'correct'; className: string }) {
    const { state } = useQuiz(); const count = Object.values(state).filter(value => kind === 'answered' ? value.selected.length > 0 : value.correct).length;
    return <span id={kind === 'answered' ? 'quizAnsweredCount' : 'quizCorrectCount'} className={className} aria-live="polite">{kind === 'answered' ? '回答済み' : '正解'} {count} / 8 問</span>;
}

/** 回答済み率を原本と同じ百分率で表示する。 */
export function QuizProgress() { const { state } = useQuiz(); const answered = Object.values(state).filter(value => value.selected.length > 0).length; return <div id="quizProgressBar" className="quiz-progress-bar" style={{ width: `${Math.round(answered / 8 * 100)}%` }} />; }

/** 回答・色・採点・解説・進捗を初期状態へ戻す。 */
export function QuizReset(props: ComponentProps<'button'>) { const { reset } = useQuiz(); return <button {...props} type="button" onClick={reset} />; }

/** 問題見出しで読み上げ名を付けた選択肢グループ。 */
export function QuizOptions(props: ComponentProps<'ul'>) { const card=useCard();return <ul {...props} role={card.multi > 1 ? 'group' : 'radiogroup'} aria-labelledby={card.labelId} />; }
