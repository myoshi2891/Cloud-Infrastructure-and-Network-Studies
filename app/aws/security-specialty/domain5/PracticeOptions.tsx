'use client';

import { Children, Fragment, isValidElement, useId, useState, type ReactElement, type ReactNode } from 'react';

/** 選択肢の li だけを順に取り出す。Fragment は展開し、li 以外は回答記号をずらさないよう除外する。 */
function choiceItems(children: ReactNode): ReactElement<{ children?: ReactNode }>[] {
    return Children.toArray(children).flatMap(child => {
        if (!isValidElement<{ children?: ReactNode }>(child)) return [];
        if (child.type === Fragment) return choiceItems(child.props.children);
        return child.type === 'li' ? [child] : [];
    });
}

/** 原文の選択肢を保持し、選択した時点で正誤を表示する。 */
export default function PracticeOptions({ questionId, answers, children }: {
    questionId: string;
    answers: string[];
    children: ReactNode;
}) {
    const name = useId();
    const [selected, setSelected] = useState<string[]>([]);
    const multiple = answers.length > 1;
    const graded = selected.length >= answers.length;
    const correct = selected.length === answers.length && answers.every(answer => selected.includes(answer));
    const options = choiceItems(children);

    function choose(value: string) {
        setSelected(previous => multiple
            ? previous.includes(value) ? previous.filter(item => item !== value) : [...previous, value]
            : [value]);
    }

    return <>
        <ul className="practice-options" aria-labelledby={questionId}>
            {options.map((option, index) => {
                const value = String.fromCharCode(65 + index);
                const checked = selected.includes(value);
                const result = graded && checked ? answers.includes(value) ? 'correct' : 'wrong' : undefined;
                return <li key={value} data-selected={checked} data-result={result}>
                    <label>
                        <input type={multiple ? 'checkbox' : 'radio'} name={name} value={value}
                            checked={checked} onChange={() => choose(value)} aria-describedby={`${name}-feedback`} />
                        <span>{option.props.children}</span>
                    </label>
                </li>;
            })}
        </ul>
        <div id={`${name}-feedback`} className="practice-feedback" role="status" aria-atomic="true"
            data-result={graded ? correct ? 'correct' : 'wrong' : undefined}>
            {selected.length === 0 ? '' : !graded
                ? `あと${answers.length - selected.length}つ選択してください。`
                : `${correct ? '正解です。' : '不正解です。'} 正解: ${answers.join(' と ')}`}
        </div>
    </>;
}
