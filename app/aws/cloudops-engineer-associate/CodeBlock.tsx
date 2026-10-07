// app/aws/cloudops-engineer-associate/CodeBlock.tsx
import type { ReactNode } from 'react';
import { CODE_BLOCKS } from './constants';

type Token = {
    text: string;
    className?: string;
};

/**
 * 1行のコード文字列をトークン分割してハイライト用の ReactNode を返す。
 * 不変条件: すべてのトークンの text を結合した文字列は必ず元の line と完全一致する。
 */
function highlightLine(line: string, language?: string): ReactNode {
    if (!language) {
        return line;
    }

    const tokens: Token[] = [];

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
        // 2) 文字列: "..."
        // 3) ディレクティブ / 関数: !Ref, {{ ... }}
        // 4) キー: key:
        // 5) リテラル: true, false, Enabled, Retain
        const regex = /(#.*$)|("(\\[\s\S]|[^"\\])*")|(!Ref|{{[^}]+}})|([a-zA-Z0-9_.-]+(?=\s*:))|(\b(?:true|false|Enabled|Retain)\b)/g;
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
            } else if (match[6]) {
                className = 'hljs-literal';
            }
            tokens.push({ text: matchedText, className });
            lastIndex = regex.lastIndex;
        }

        if (lastIndex < line.length) {
            tokens.push({ text: line.slice(lastIndex) });
        }
    } else if (language === 'plaintext') {
        // CloudWatch Logs クエリ / VPC フローログ トークナイズ
        // 1) クエリキーワード: fields, filter, stats, as, by, bin, sort, desc, limit, like
        // 2) クエリ関数: count(), count(*)
        // 3) 文字列・正規表現: /ERROR/, "REJECT"
        // 4) フローログステータス: ACCEPT, OK, REJECT
        // 5) IP アドレス / インターフェース ID: eni-..., IP
        const regex = /(\b(?:fields|filter|like|stats|as|by|bin|sort|desc|limit)\b)|(count\(\*?\))|(\/[A-Z0-9_.-]+\/|"(\\[\s\S]|[^"\\])*")|(\b(?:ACCEPT|OK)\b)|(\bREJECT\b)|(eni-[a-zA-Z0-9]+|\b\d{1,3}(?:\.\d{1,3}){3}\b)/g;
        let lastIndex = 0;
        let match: RegExpExecArray | null;

        while ((match = regex.exec(line)) !== null) {
            if (match.index > lastIndex) {
                tokens.push({ text: line.slice(lastIndex, match.index) });
            }
            const matchedText = match[0];
            let className = '';
            if (match[1]) {
                className = 'hljs-keyword';
            } else if (match[2]) {
                className = 'hljs-built_in';
            } else if (match[3]) {
                className = 'hljs-string';
            } else if (match[5]) {
                className = 'hljs-string';
            } else if (match[6]) {
                className = 'hljs-deletion';
            } else if (match[7]) {
                className = 'hljs-variable';
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
    index: number;
    ariaLabel?: string;
}

/**
 * AWS CloudOps ガイド用コードブロックコンポーネント。
 * 原本 HTML と完全準拠の .cb-head + 各行 .code-line 構造、
 * Atom One Dark シンタックスハイライト、
 * および TDD 契約（textContent 完全一致）を満たします。
 */
export default function CodeBlock({ index, ariaLabel }: CodeBlockProps) {
    const block = CODE_BLOCKS[index];
    if (!block) return null;

    return (
        <div className="code-block" role="region" aria-label={ariaLabel ?? `コードブロック ${index + 1}`}>
            <div className="code-line">
                <span className="cb-head">{block.head}</span>
                <span className="code-line-content">{highlightLine(block.firstLineRest, block.head)}</span>
            </div>
            {block.remainingLines.map((line, lineIndex) => (
                <div key={lineIndex} className="code-line">
                    <span className="code-line-content">{highlightLine(line, block.head)}</span>
                </div>
            ))}
        </div>
    );
}
