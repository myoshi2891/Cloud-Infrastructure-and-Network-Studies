type Token = { text: string; className?: string };

/** 文字を削らず、JSON/Pythonのリテラル・コメント・予約語を色分けする。 */
function highlight(source: string, language: string): Token[] {
    if (!['json', 'python'].includes(language)) return [{text:source}];
    const pattern = /("""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|#[^\n]*|\b(?:True|False|None|true|false|null)\b|\b(?:def|class|return|import|from|as|if|else|elif|try|except|finally|raise|with|for|in|while|not|and|or|is|pass|lambda|yield|async|await)\b|\b\d+(?:\.\d+)?\b|\b[A-Za-z_]\w*\b)/g;
    const tokens: Token[] = [];
    let cursor = 0;
    let definition = false;
    for(const match of source.matchAll(pattern)) {
        const index = match.index;
        if(index > cursor) tokens.push({text:source.slice(cursor,index)});
        const text = match[0];
        let className: string | undefined;
        if (/^["']/.test(text)) className = language === 'json' && /^\s*:/.test(source.slice(index+text.length)) ? 'hljs-attr' : 'hljs-string';
        else if(text.startsWith('#') && language === 'python') className = 'hljs-comment';
        else if(/^(True|False|None|true|false|null)$/.test(text)) className = 'hljs-literal';
        else if(/^\d/.test(text)) className = 'hljs-number';
        else if(definition) className = 'hljs-title';
        else if(/^(def|class|return|import|from|as|if|else|elif|try|except|finally|raise|with|for|in|while|not|and|or|is|pass|lambda|yield|async|await)$/.test(text)) className = 'hljs-keyword';
        definition = text === 'def' || text === 'class';
        tokens.push({text,className}); cursor = index+text.length;
    }
    if(cursor < source.length) tokens.push({text:source.slice(cursor)});
    return tokens;
}

/** 元のコード行構造と二層の背景を保持する静的コード表示。 */
export function CodeBlock({language,lines}:{language:string;lines:readonly string[]}) {
    const rows: Token[][] = [[]];
    for(const token of highlight(lines.join('\n'),language)) {
        token.text.split('\n').forEach((text,index) => {
            if(index) rows.push([]);
            rows.at(-1)!.push({text,className:token.className});
        });
    }
    return <div className="code-viewport"><div className="code-block" data-language={language}>{rows.map((tokens,index) => <div className="code-line" key={index}>{tokens.map((token,i) => token.className ? <span className={token.className} key={i}>{token.text}</span> : <span key={i}>{token.text}</span>)}</div>)}</div></div>;
}
