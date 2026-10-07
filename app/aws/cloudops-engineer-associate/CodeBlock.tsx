import { CODE_BLOCKS } from './constants';

interface CodeBlockProps {
    index: number;
    ariaLabel?: string;
}

/**
 * AWS CloudOps ガイド用コードブロックコンポーネント。
 * インベントリの TDD 契約（.code-line 構造および textContent 完全一致）を満たします。
 */
export default function CodeBlock({ index, ariaLabel }: CodeBlockProps) {
    const block = CODE_BLOCKS[index];
    if (!block) return null;

    return (
        <div className="code-block" role="region" aria-label={ariaLabel ?? `コードブロック ${index + 1}`}>
            {block.lines.map((line, lineIndex) => (
                <div key={lineIndex} className="code-line">
                    {lineIndex === 0 && block.head ? (
                        <>
                            <span className="cb-head">{block.head}</span>
                            {block.firstLineRest}
                        </>
                    ) : (
                        line
                    )}
                </div>
            ))}
        </div>
    );
}
