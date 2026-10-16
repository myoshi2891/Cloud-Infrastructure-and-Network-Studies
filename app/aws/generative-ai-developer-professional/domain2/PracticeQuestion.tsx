'use client';

import { useState, type ReactNode } from 'react';

type ChoiceKey = 'A' | 'B' | 'C' | 'D';
interface PracticeQuestionProps {
    id: string;
    heading: ReactNode;
    prompt: ReactNode;
    options: readonly { key: ChoiceKey; label: ReactNode }[];
    correctAnswers: readonly ChoiceKey[];
    explanation: ReactNode;
}

/** 解説を開くと選択した回答を採点する。複数選択は正解集合の完全一致で判定する。 */
export function PracticeQuestion({ id, heading, prompt, options, correctAnswers, explanation }: PracticeQuestionProps) {
    const [selected, setSelected] = useState<ChoiceKey[]>([]);
    const [revealed, setRevealed] = useState(false);
    const multiple = correctAnswers.length > 1;
    const verdict = selected.length === 0 ? 'unanswered'
        : selected.length === correctAnswers.length && correctAnswers.every(key => selected.includes(key)) ? 'correct' : 'incorrect';

    function select(key: ChoiceKey) {
        setSelected(current => multiple
            ? current.includes(key) ? current.filter(item => item !== key) : [...current, key]
            : [key]);
    }

    return <section className="practice-question" aria-labelledby={id}>
        {heading}
        {prompt}
        <fieldset className="practice-choices" aria-labelledby={id}>
            <ul className="practice-options">
                {options.map(option => <li key={option.key}>
                    <label className="practice-option" htmlFor={`${id}-choice-${option.key}`}
                        data-selected={selected.includes(option.key)}
                        data-result={revealed && selected.length > 0
                            ? correctAnswers.includes(option.key) ? 'correct' : selected.includes(option.key) ? 'incorrect' : undefined
                            : undefined}>
                        <input id={`${id}-choice-${option.key}`} name={id}
                            type={multiple ? 'checkbox' : 'radio'} value={option.key}
                            checked={selected.includes(option.key)} onChange={() => select(option.key)} />
                        <span className="practice-option-text">{option.label}</span>
                    </label>
                </li>)}
            </ul>
        </fieldset>
        <details onToggle={event => setRevealed(event.currentTarget.open)}>
            <summary>答えと解説</summary>
            {revealed && <p className="practice-feedback" data-verdict={verdict} role="status">
                {verdict === 'unanswered' ? '未回答です。選択肢を選んでください。'
                    : verdict === 'correct' ? '正解です。'
                    : `不正解です。正解は ${correctAnswers.join('・')} です。`}
            </p>}
            {explanation}
        </details>
    </section>;
}
