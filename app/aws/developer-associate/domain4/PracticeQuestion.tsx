'use client';
import { Children, cloneElement, isValidElement, useState, type ReactNode } from 'react';

/** 原本の設問・選択肢をそのまま使い、選択した設問の正解と解説を表示する。 */
export function PracticeQuestion({number,correct,explanation,children}:{number:number;correct:readonly string[];explanation:ReactNode;children:ReactNode}) {
    const [selected,setSelected]=useState<Set<string>>(()=>new Set());
    const multiple=correct.length>1;
    const revealed=selected.size>=correct.length;
    const success=revealed && selected.size===correct.length && correct.every(letter=>selected.has(letter));
    const feedbackId='practice-feedback-'+number;
    const choose=(letter:string)=>setSelected(previous=>{
        if(!multiple)return new Set([letter]);
        const next=new Set(previous);if(next.has(letter))next.delete(letter);else next.add(letter);return next;
    });
    const content=Children.map(children,child=>{
        if(!isValidElement<{children?:ReactNode;role?:string;'aria-labelledby'?:string}>(child)||child.type!=='ul')return child;
        let index=0;
        return cloneElement(child,{role:'group','aria-labelledby':'practice-question-'+number},Children.map(child.props.children,option=>{
            if(!isValidElement<{children?:ReactNode;className?:string;'data-state'?:string}>(option)||option.type!=='li')return option;
            const letter=String.fromCharCode(65+index++);
            const isCorrect=correct.includes(letter);
            const state=revealed && isCorrect?'correct':revealed && selected.has(letter)?'incorrect':selected.has(letter)?'selected':undefined;
            return cloneElement(option,{className:'practice-option','data-state':state},<label>
                <input type={multiple?'checkbox':'radio'} name={'practice-question-'+number} value={letter} checked={selected.has(letter)} onChange={()=>choose(letter)} aria-invalid={state==='incorrect'?true:undefined} aria-describedby={revealed?feedbackId:undefined}/>
                <span>{option.props.children}</span>
                <span className="practice-verdict" aria-hidden="true">{revealed && (isCorrect||selected.has(letter)) && <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">{isCorrect?<path d="m5 12 4 4 10-10"/>:<path d="m6 6 12 12M18 6 6 18"/>}</svg>}</span>
            </label>);
        }));
    });
    return <article className="practice-question" aria-labelledby={'practice-question-'+number} data-result={revealed?(success?'correct':'incorrect'):undefined}>
        {content}
        {revealed && <div className="practice-feedback" id={feedbackId} role="status" aria-live="polite" data-result={success?'correct':'incorrect'}>
            <p className="practice-result">{success?'正解です':'不正解です'}</p>
            <p><strong>正解</strong>{' '+correct.join(', ')}</p>
            <div>{explanation}</div>
        </div>}
    </article>;
}
