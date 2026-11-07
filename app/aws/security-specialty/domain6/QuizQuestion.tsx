"use client";

import { Children, isValidElement, useState, type ReactNode } from "react";

type ContentElement = { children?: ReactNode };

export default function QuizQuestion({ number, correctAnswers, children }: {
    number: number;
    correctAnswers: number[];
    children: ReactNode;
}) {
    const [selected, setSelected] = useState<number[]>([]);
    const elements = Children.toArray(children).filter(isValidElement<ContentElement>);
    const prompt = elements[0];
    const options = Children.toArray(elements[1]?.props.children)
        .filter(isValidElement<ContentElement>);
    const multiple = correctAnswers.length > 1;
    const wrong = selected.some((index) => !correctAnswers.includes(index));
    const correct = !wrong && selected.length === correctAnswers.length;
    const status = selected.length === 0 ? "" : wrong ? "不正解" : correct ? "正解" : "あと1つ選択してください";

    function choose(index: number) {
        setSelected((previous) => multiple
            ? previous.includes(index) ? previous.filter((value) => value !== index) : [...previous, index]
            : [index]);
    }

    return (
        <div className="d6-quiz-card" role="group" aria-labelledby={`d6-question-${number}`}>
            <div className="d6-quiz-prompt" id={`d6-question-${number}`}>{prompt}</div>
            <ul className="d6-quiz-options">
                {options.map((option, index) => {
                    const active = selected.includes(index);
                    const state = active ? correctAnswers.includes(index) ? "correct" : "incorrect" : "idle";
                    return (
                        <li key={index}>
                            <button type="button" className="d6-quiz-option" data-state={state}
                                aria-pressed={active} onClick={() => choose(index)}>
                                <span className="d6-quiz-indicator" aria-hidden="true">{active ? state === "correct" ? "✓" : "×" : ""}</span>
                                <span>{option.props.children}</span>
                                {active && <span className="d6-quiz-option-result">{state === "correct" ? "正解" : "不正解"}</span>}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className="d6-quiz-feedback" role="status" aria-live="polite"
                data-state={selected.length === 0 ? "idle" : wrong ? "incorrect" : correct ? "correct" : "pending"}>
                {status && <><span aria-hidden="true">{wrong ? "×" : correct ? "✓" : "○"}</span> {status}</>}
            </div>
        </div>
    );
}
