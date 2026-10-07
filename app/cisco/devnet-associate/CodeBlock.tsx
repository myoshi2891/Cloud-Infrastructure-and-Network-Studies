// app/cisco/devnet-associate/CodeBlock.tsx
import type { ReactNode } from 'react';

type Token = {
    text: string;
    className?: string;
};

/**
 * 1行のコード文字列をトークン分割してハイライト用の ReactNode を返す。
 * 不変条件: すべてのトークンの text を結合した文字列は必ず元の line と完全一致する。
 */
function highlightLine(line: string, language?: string): ReactNode {
    if (!language || language === 'text') {
        return line;
    }

    const tokens: Token[] = [];

    if (language === 'diff') {
        if (/^(---\s|\+\+\+\s|@@)/.test(line)) {
            return <span className="hljs-meta">{line}</span>;
        }
        if (line.startsWith('+')) {
            return <span className="hljs-addition">{line}</span>;
        }
        if (line.startsWith('-')) {
            return <span className="hljs-deletion">{line}</span>;
        }
        return line;
    }

    if (language === 'json') {
        // JSON トークナイズ
        // 1) キー: "key":
        // 2) 文字列値: "value"
        // 3) 数値: 10
        // 4) リテラル: true, false, null
        const regex = /("(\\[\s\S]|[^"\\])*"(?=\s*:))|("(\\[\s\S]|[^"\\])*")|(\b(?:true|false|null)\b)|(-?\b\d+(?:\.\d+)?\b)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            const matchedText = match[0];
            let className = '';
            if (match[1]) {
                className = 'hljs-attr';
            } else if (match[3]) {
                className = 'hljs-string';
            } else if (match[5]) {
                className = 'hljs-literal';
            } else if (match[6]) {
                className = 'hljs-number';
            }
            tokens.push({ text: matchedText, className });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else if (language === 'yaml') {
        // YAML トークナイズ
        // 1) コメント: # ...
        // 2) ドキュメントヘッダー: ---
        // 3) キー: key:
        // 4) リテラル: true, false, null
        // 5) 数値: \b\d+\b
        const commentIdx = line.indexOf('#');
        let codePart = line;
        let commentPart = '';
        if (commentIdx !== -1) {
            // 文字列内の # でないことを簡易判定
            codePart = line.slice(0, commentIdx);
            commentPart = line.slice(commentIdx);
        }

        if (codePart.trim() === '---') {
            tokens.push({ text: codePart, className: 'hljs-meta' });
        } else {
            const regex = /(^[ \t]*[a-zA-Z0-9_.-]+(?=:))|(\b(?:true|false|null)\b)|(-?\b\d+(?:\.\d+)?\b)|("(\\[\s\S]|[^"\\])*"|'[^']*')/g;
            let lastIndex = 0;
            let match: RegExpExecArray | null;
            while ((match = regex.exec(codePart)) !== null) {
                if (match.index > lastIndex) {
                    tokens.push({ text: codePart.slice(lastIndex, match.index) });
                }
                const matchedText = match[0];
                let className = '';
                if (match[1]) {
                    className = 'hljs-attr';
                } else if (match[2]) {
                    className = 'hljs-literal';
                } else if (match[3]) {
                    className = 'hljs-number';
                } else if (match[4]) {
                    className = 'hljs-string';
                }
                tokens.push({ text: matchedText, className });
                lastIndex = regex.lastIndex;
            }
            if (lastIndex < codePart.length) {
                tokens.push({ text: codePart.slice(lastIndex) });
            }
        }
        if (commentPart) {
            tokens.push({ text: commentPart, className: 'hljs-comment' });
        }
    } else if (language === 'xml') {
        // XML トークナイズ
        // 1) コメント: <!-- ... -->
        // 2) タグ名: <tag, </tag, >
        // 3) 属性名: attr=
        // 4) 属性値: "value"
        const regex = /(<!--[\s\S]*?-->)|(<\/?)([a-zA-Z0-9_:-]+)|([a-zA-Z0-9_:-]+(?==))|("(\\[\s\S]|[^"\\])*")|(>|\/>)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            if (match[1]) {
                tokens.push({ text: match[1], className: 'hljs-comment' });
            } else if (match[2] && match[3]) {
                tokens.push({ text: match[2] });
                tokens.push({ text: match[3], className: 'hljs-name' });
            } else if (match[4]) {
                tokens.push({ text: match[4], className: 'hljs-attr' });
            } else if (match[5]) {
                tokens.push({ text: match[5], className: 'hljs-string' });
            } else if (match[7]) {
                tokens.push({ text: match[7] });
            }
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else if (language === 'python') {
        // Python トークナイズ
        // 1) コメント: # ...
        // 2) 文字列: "...", '...', f"...", f'...'
        // 3) キーワード: import, from, def, return, if, else, etc.
        // 4) リテラル: True, False, None
        // 5) ビルトイン関数: print, len, etc.
        // 6) 数値
        // 7) デコレータ: @...
        const regex = /(#.*$)|(f?"(\\[\s\S]|[^"\\])*"|f?'(\\[\s\S]|[^'\\])*')|(@[a-zA-Z0-9_]+)|(\b(?:def|class|import|from|as|return|if|elif|else|for|while|in|try|except|finally|raise|with|pass|break|continue|lambda|yield|async|await|not|and|or|is)\b)|(\b(?:True|False|None)\b)|(\b(?:print|len|str|int|dict|list|set|open|range|enumerate|isinstance|type|super)\b)|(-?\b\d+(?:\.\d+)?\b)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            const matchedText = match[0];
            let className = '';
            if (match[1]) {
                className = 'hljs-comment';
            } else if (match[2]) {
                className = 'hljs-string';
            } else if (match[4]) {
                className = 'hljs-meta';
            } else if (match[5]) {
                className = 'hljs-keyword';
            } else if (match[6]) {
                className = 'hljs-literal';
            } else if (match[7]) {
                className = 'hljs-built_in';
            } else if (match[8]) {
                className = 'hljs-number';
            }
            tokens.push({ text: matchedText, className });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else if (language === 'bash') {
        // Bash トークナイズ
        if (line.startsWith('#!')) {
            return <span className="hljs-meta">{line}</span>;
        }
        const regex = /(#.*$)|("(\\[\s\S]|[^"\\])*"|'[^']*')|(\$[a-zA-Z0-9_]+|\$\{[a-zA-Z0-9_]+\})|(\b(?:if|then|else|elif|fi|for|do|done|while|case|esac|function)\b)|(\b(?:mkdir|cp|mv|rm|cd|ls|pwd|cat|echo|chmod|chown|useradd|apt-get|export|grep|sed|awk|curl|exit)\b)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            const matchedText = match[0];
            let className = '';
            if (match[1]) {
                className = 'hljs-comment';
            } else if (match[2]) {
                className = 'hljs-string';
            } else if (match[4]) {
                className = 'hljs-variable';
            } else if (match[5]) {
                className = 'hljs-keyword';
            } else if (match[6]) {
                className = 'hljs-built_in';
            }
            tokens.push({ text: matchedText, className });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else if (language === 'dockerfile') {
        // Dockerfile トークナイズ
        const regex = /(#.*$)|(^[A-Z]+\b)|("(\\[\s\S]|[^"\\])*")/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            const matchedText = match[0];
            let className = '';
            if (match[1]) {
                className = 'hljs-comment';
            } else if (match[2]) {
                className = 'hljs-keyword';
            } else if (match[3]) {
                className = 'hljs-string';
            }
            tokens.push({ text: matchedText, className });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else if (language === 'http') {
        // HTTP トークナイズ
        const requestMatch = /^(GET|POST|PUT|DELETE|PATCH)\s+([^\s]+)\s+(HTTP\/[0-9.]+)/.exec(line);
        if (requestMatch) {
            return (
                <>
                    <span className="hljs-keyword">{requestMatch[1]}</span>{' '}
                    <span className="hljs-string">{requestMatch[2]}</span>{' '}
                    <span className="hljs-meta">{requestMatch[3]}</span>
                </>
            );
        }
        const headerMatch = /^([a-zA-Z0-9_-]+):(.*)$/.exec(line);
        if (headerMatch) {
            return (
                <>
                    <span className="hljs-attr">{headerMatch[1]}</span>:
                    <span className="hljs-string">{headerMatch[2]}</span>
                </>
            );
        }
        return line;
    } else if (language === 'hcl') {
        // Terraform HCL トークナイズ
        const regex = /(#.*$|\/\/.*$)|("(\\[\s\S]|[^"\\])*")|(\b(?:terraform|required_providers|provider|resource|data|variable|output|locals)\b)|([a-zA-Z0-9_.-]+(?=\s*=))/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            const matchedText = match[0];
            let className = '';
            if (match[1]) {
                className = 'hljs-comment';
            } else if (match[2]) {
                className = 'hljs-string';
            } else if (match[4]) {
                className = 'hljs-keyword';
            } else if (match[5]) {
                className = 'hljs-attr';
            }
            tokens.push({ text: matchedText, className });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else if (language === 'yang') {
        // YANG トークナイズ
        const regex = /((\/\/|\/\*).*$)|("(\\[\s\S]|[^"\\])*")|(\b(?:module|namespace|prefix|container|list|key|leaf|leaf-list|type|description|default|config|import|revision)\b)|(\b(?:string|uint8|uint16|uint32|uint64|int8|int16|int32|int64|boolean|enumeration)\b)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            const matchedText = match[0];
            let className = '';
            if (match[1]) {
                className = 'hljs-comment';
            } else if (match[3]) {
                className = 'hljs-string';
            } else if (match[5]) {
                className = 'hljs-keyword';
            } else if (match[6]) {
                className = 'hljs-built_in';
            }
            tokens.push({ text: matchedText, className });
            lastIndex = regex.lastIndex;
        }
        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else {
        return line;
    }

    if (tokens.length === 0) {
        return line;
    }

    return (
        <>
            {tokens.map((token, i) =>
                token.className ? (
                    <span key={i} className={token.className}>
                        {token.text}
                    </span>
                ) : (
                    token.text
                ),
            )}
        </>
    );
}

interface CodeBlockProps {
    lines: string[];
    lang?: string;
    ariaLabel?: string;
}

/**
 * Cisco DevNet Associate ガイド向けコードブロック。
 * 行ごとに .code-line を生成し、シンタックスハイライトトークンを付与する。
 * 各行の textContent は元の文字列と完全一致し、TDD 契約を満たす。
 */
export default function CodeBlock({ lines, lang, ariaLabel }: CodeBlockProps) {
    return (
        <div className="code-block" role="region" aria-label={ariaLabel}>
            {lines.map((line, index) => (
                <div key={index} className="code-line">
                    {highlightLine(line, lang)}
                </div>
            ))}
        </div>
    );
}
