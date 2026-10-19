'use client';

import { createContext, useContext, useState, useSyncExternalStore, type ReactNode } from 'react';

type Result = { picked: string | null; correct: boolean };
type QuizState = {
    results: Record<string, Result>;
    answer: (id: string, picked: string | null, correct: boolean) => void;
    reset: () => void;
};
const QuizContext = createContext<QuizState | null>(null);
const QuestionContext = createContext<{ id: string; answer: string } | null>(null);

function useQuiz() {
    const quiz = useContext(QuizContext);
    if (!quiz) throw new Error('QuizProvider is required');
    return quiz;
}
function useQuestion() {
    const question = useContext(QuestionContext);
    if (!question) throw new Error('PracticeQuestion is required');
    return question;
}

/** 10問の回答・正解集計を共有し、リセットで初期状態へ戻す。 */
export function QuizProvider({ children }: { children: ReactNode }) {
    const [results, setResults] = useState<Record<string, Result>>({});
    const answer = (id: string, picked: string | null, correct: boolean) => {
        setResults(current => current[id] ? current : { ...current, [id]: { picked, correct } });
    };
    return <QuizContext.Provider value={{ results, answer, reset: () => setResults({}) }}>
        <div className="guide-part" data-part="revision">{children}</div>
    </QuizContext.Provider>;
}

/** 原本の集計バー。解答表示だけでは正解数を加算しない。 */
export function QuizBar() {
    const quiz = useQuiz();
    const results = Object.values(quiz.results);
    return <div className="quiz-bar" id="quizBar" aria-live="polite">
        <span className="stat">{'回答 '}<strong className="s-done">{results.length}</strong>{' / '}<span className="s-total">10</span>{' 問'}</span><span className="stat">{'正解 '}<strong className="s-ok">{results.filter(result => result.correct).length}</strong>{' 問'}</span><span className="spacer" /><button className="quiz-btn quiz-reset" type="button" onClick={quiz.reset}>リセット</button>
    </div>;
}

const subscribeNothing = () => () => {};

/** サーバー描画では false、クライアントのハイドレーション後に true を返す。 */
function useHydrated() {
    return useSyncExternalStore(subscribeNothing, () => true, () => false);
}

/** 原本の問題・選択肢・解説を保持し、回答済み状態を描画する。JS無効時は .quiz:not(.js) で解説を表示したままにする。 */
export function PracticeQuestion({ id, answer, children }: { id: string; answer: string; children: ReactNode }) {
    const result = useQuiz().results[id];
    const hydrated = useHydrated();
    return <QuestionContext.Provider value={{ id, answer }}>
        <div className={`quiz${hydrated ? ' js' : ''}${result ? ' answered' : ''}`} data-answer={answer} data-result={result ? result.correct ? 'ok' : 'ng' : undefined} id={id}>{children}</div>
    </QuestionContext.Provider>;
}

/** 一度回答した問題の再回答を防ぎ、正解と誤選択を区別する。 */
export function QuizOption({ option, children }: { option: string; children: ReactNode }) {
    const question = useQuestion();
    const quiz = useQuiz();
    const result = quiz.results[question.id];
    const status = result ? option === question.answer ? ' correct' : result.picked === option ? ' wrong' : '' : '';
    return <button type="button" className={`quiz-opt${status}`} data-key={option} aria-pressed={result?.picked === option} disabled={Boolean(result)} onClick={() => quiz.answer(question.id, option, option === question.answer)}>{children}</button>;
}

/** 未回答の正解表示は原本と同じく回答済み・不正解として集計する。 */
export function QuizReveal({ children }: { children: ReactNode }) {
    const question = useQuestion();
    const quiz = useQuiz();
    return <button className="quiz-btn quiz-reveal" type="button" onClick={() => quiz.answer(question.id, null, false)}>{children}</button>;
}
