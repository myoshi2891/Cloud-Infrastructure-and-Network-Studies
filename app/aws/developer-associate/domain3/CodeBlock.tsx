import type { ReactNode } from 'react';

/** 原本に近い色で文字列・コメント・キー・数値を装飾し、全文を保持する。 */
function highlight(line: string, language: string): ReactNode {
    if (language === 'text' || language === 'plaintext') return line;
    const pattern = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(#.*$)|\b(import|from|def|return|if|else|for|in|with|as|True|False|None|FROM|RUN|COPY|WORKDIR|CMD|ENTRYPOINT|ENV|ARG|EXPOSE|aws|sam|docker|git|pip|pytest|curl)\b|\b(true|false|null)\b|\b\d+(?:\.\d+)?\b|\b[\w.-]+(?=\s*[:=])/g;
    const parts: ReactNode[] = [];
    let offset = 0;
    for (const match of line.matchAll(pattern)) {
        if (match.index > offset) parts.push(line.slice(offset, match.index));
        const className = match[1] ? language === 'json' && /^\s*:/.test(line.slice(match.index + match[0].length)) ? 'hljs-attr' : 'hljs-string' : match[2] ? 'hljs-comment' : match[3] ? 'hljs-keyword' : match[4] ? 'hljs-literal' : /^\d/.test(match[0]) ? 'hljs-number' : 'hljs-attr';
        parts.push(<span key={match.index} className={className}>{match[0]}</span>);
        offset = match.index + match[0].length;
    }
    if (offset < line.length) parts.push(line.slice(offset));
    return parts;
}

/** 言語・空行・インデントを保持する横スクロール可能なコード例。 */
export function CodeBlock({ language, lines, index }: { language: string; lines: string[]; index: number }) {
    return <div className="code-block hljs" data-language={language} tabIndex={0} role="region" aria-label={`${language} コード例 ${index + 1}`}>
        {lines.map((line, lineIndex) => <div className="code-line" key={lineIndex}><code className={`language-${language}`}>{highlight(line, language)}</code></div>)}
    </div>;
}
