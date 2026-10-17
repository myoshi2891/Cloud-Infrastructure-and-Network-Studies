import type { ReactNode } from 'react';

type Language = 'python' | 'json' | 'logs-insights';

/** 文字列を実行・HTML化せず、原文の境界を保って構文トークンへ分割する。 */
function highlight(line: string, language: Language): ReactNode[] {
    const pattern = /(""".*?"""|''' .*?'''|f?"(?:\\.|[^"\\])*"|f?'(?:\\.|[^'\\])*')|(#.*$)|\b(import|from|def|return|if|else|elif|for|in|with|as|True|False|None|try|except|raise|lambda|not|and|or|fields|filter|stats|by|sort|desc|limit)\b|\b(true|false|null)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*(?=\s*\()/g;
    const tokens: ReactNode[] = [];
    let offset = 0;
    for (const match of line.matchAll(pattern)) {
        if (match.index > offset) tokens.push(line.slice(offset, match.index));
        const type = match[1]
            ? language === 'json' && /^\s*:/.test(line.slice(match.index + match[0].length)) ? 'attr' : 'string'
            : match[2] ? 'comment' : match[3] ? 'keyword' : match[4] ? 'literal' : /^\d/.test(match[0]) ? 'number' : 'title';
        tokens.push(<span key={match.index} className={`hljs-${type}`}>{match[0]}</span>);
        offset = match.index + match[0].length;
    }
    if (offset < line.length) tokens.push(line.slice(offset));
    return tokens;
}

/** 全コード行と空行を保持する、Python・JSON・Logs Insightsのコード例。 */
export function CodeBlock({ language, lines, index }: { language: Language; lines: string[]; index: number }) {
    return <div className="code-block" data-language={language} tabIndex={0} role="region" aria-label={`${language} コード例 ${index + 1}`}>
        {lines.map((line, index) => <div className="code-line" key={index}>{highlight(line, language)}</div>)}
    </div>;
}
