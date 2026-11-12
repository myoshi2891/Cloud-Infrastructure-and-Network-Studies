/**
 * 固定原本から生成したSVGリテラル専用のServer Component。
 * Reactのstyle変換で失われる!importantを含め、原本の座標・文字・配色を保持する。
 * 呼び出し元は生成済みsectionsのみ。外部入力やURLパラメーターは渡さない。
 * 自然スケールは常時有効（原本の実寸属性とpage.cssの縮小抑止）。DOMにも契約を公開する。
 */
export default function OriginalSvg({ markup }: { markup: string }) {
    return <div className="svg-source" data-preserve-natural-scale="true" dangerouslySetInnerHTML={{ __html: markup }} />;
}
