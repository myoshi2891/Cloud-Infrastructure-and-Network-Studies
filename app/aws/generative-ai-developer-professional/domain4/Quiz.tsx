'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

type Result = { picked: string[]; correct: boolean };
type QuizState = { results: Record<string, Result>; grade: (id: string, result: Result) => void; reset: () => void; generation: number };
const QuizContext = createContext<QuizState | null>(null);
const AnswerTextContext = createContext('');
const QuestionContext = createContext<{ picked: string[]; select: (key: string) => void; check: () => void; result: Result | undefined; answer: readonly string[]; multi: boolean; } | null>(null);
function useQuiz() { const value = useContext(QuizContext); if (!value) throw new Error('Missing quiz provider'); return value; }
function useQuestion() { const value = useContext(QuestionContext); if (!value) throw new Error('Missing question provider'); return value; }

/** 原本12問の得点・回答進捗とリセットを管理する。 */
export function QuizProvider({ children }: { children: ReactNode }) {
    const [results, setResults] = useState<Record<string, Result>>({});
    const [generation, setGeneration] = useState(0);
    const grade = (id: string, result: Result) => setResults(previous => previous[id] ? previous : { ...previous, [id]: result });
    const reset = () => { setResults({}); setGeneration(value => value + 1); };
    return <QuizContext.Provider value={{ results, grade, reset, generation }}><div className="quiz" id="quiz">{children}</div></QuizContext.Provider>;
}

/** 正解数と回答済み割合を原本のバーに表示する。 */
export function QuizBar() {
    const { results, reset } = useQuiz();
    return <div className="quiz-bar"><div className="score" role="status" aria-live="polite">正解数 <span>{Object.values(results).filter(result => result.correct).length}</span> / <span className="total">12</span></div><div className="track" role="progressbar" aria-label="回答済み問題" aria-valuemin={0} aria-valuemax={12} aria-valuenow={Object.keys(results).length}><div className="fill" style={{ width: `${Object.keys(results).length / 12 * 100}%` }} /></div><button type="button" className="q-reset" onClick={reset}>やり直す</button></div>;
}

/** リセット時に未確定の選択状態も再初期化する問題境界。 */
export function Question(props: { id: string; answer: readonly string[]; multi: boolean; children: ReactNode }) {
    const { generation } = useQuiz();
    return <QuestionBody key={generation} {...props} />;
}
function QuestionBody({ id, answer, multi, children }: { id: string; answer: readonly string[]; multi: boolean; children: ReactNode }) {
    const { results, grade } = useQuiz();
    const [picked, setPicked] = useState<string[]>([]);
    const result = results[id];
    const submit = (keys: string[]) => { if (!result && keys.length) grade(id, { picked: keys, correct: keys.length === answer.length && keys.every(key => answer.includes(key)) }); };
    const select = (key: string) => {
        if (result) return;
        if (!multi) { submit([key]); return; }
        setPicked(previous => previous.includes(key) ? previous.filter(value => value !== key) : [...previous, key]);
    };
    return <QuestionContext.Provider value={{ picked, select, check: () => submit(picked), result, answer, multi }}><div className="q-card" id={id} data-answer={answer.join(',')} data-multi={String(multi)}>{children}</div></QuestionContext.Provider>;
}

/** 単一選択は即時採点し、複数選択は確定まで選択を切り替える。 */
export function Option({ option, children }: { option: string; children: ReactNode }) {
    const { select, picked, result, answer, multi } = useQuestion();
    const state = result ? answer.includes(option) ? ' correct' : result.picked.includes(option) ? ' wrong' : '' : picked.includes(option) ? ' selected' : '';
    return <button type="button" className={`q-opt${state}`} data-key={option} disabled={!!result} aria-pressed={multi ? picked.includes(option) : undefined} onClick={() => select(option)}>{children}</button>;
}

/** 複数選択を完全一致で採点する。 */
export function Check({ children }: { children: ReactNode }) {
    const { picked, result, check } = useQuestion();
    return <button type="button" className="q-check" disabled={!!result || !picked.length} onClick={check}>{children}</button>;
}

/** 解説本文を初期DOMにも保持し、採点後に表示する。 */
export function Explanation({ answerText, children }: { answerText: string; children: ReactNode }) {
    const { result } = useQuestion();
    return <div className={`q-explain${result ? result.correct ? ' ok' : ' ng' : ''}`} hidden={!result} data-answer-text={answerText}><AnswerTextContext.Provider value={answerText}>{children}</AnswerTextContext.Provider></div>;
}

/** 原本の正誤文言と正解表記を読み上げ可能に表示する。 */
export function Verdict() {
    const { result } = useQuestion();
    const answerText = useContext(AnswerTextContext);
    return <p className="verdict" role="status">{result ? `${result.correct ? '正解です。' : '不正解です。'} ${answerText}` : ''}</p>;
}
