import type { ReactNode } from 'react';
/** 元の文字列を欠落させず、Atom One Darkのトークン色へ対応付ける。 */
function highlight(line: string, language: string): ReactNode {
    const pattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(#.*$)|\b(import|from|def|return|if|else|for|in|with|as|True|False|None|SELECT|FROM|WHERE|AND|OR|INSERT|INTO|VALUES|GET|HTTP|POST)\b|\b(true|false|null)\b|\b\d+(?:\.\d+)?\b/g;
    const parts: ReactNode[] = [];
    let offset = 0;
    for (const match of line.matchAll(pattern)) {
        if (match.index > offset) parts.push(line.slice(offset, match.index));
        const className = match[1] ? language === 'json' && /^\s*:/.test(line.slice(match.index + match[0].length)) ? 'hljs-attr' : 'hljs-string' : match[2] ? 'hljs-comment' : match[3] ? 'hljs-keyword' : match[4] ? 'hljs-literal' : 'hljs-number';
        parts.push(<span key={match.index} className={className}>{match[0]}</span>);
        offset = match.index + match[0].length;
    }
    if (offset < line.length) parts.push(line.slice(offset));
    return parts;
}
/** 言語見出しと全コード行を、原本の文字列順序のまま保持する。 */
export function CodeBlock({language,lines,index}:{language:string;lines:string[];index:number}) {
    return <div className="code-block" data-language={language} tabIndex={0} role="region" aria-label={`${language} コード例 ${index+1}`}>
        {lines.map((line,i)=><div className="code-line" key={i}>
            {i===0 && <span className="cb-head"><i className="ti ti-code" aria-hidden="true" />{language}</span>}
            <span className="code-line-content">{highlight(i===0 ? line.slice(language.length) : line,language)}</span>
        </div>)}
    </div>;
}
