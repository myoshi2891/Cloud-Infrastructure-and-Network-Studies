/**
 * 固定原本から生成したSVGリテラル専用のServer Component。
 * Reactのstyle変換で失われる!importantを含め、原本の座標・文字・配色を保持する。
 * 呼び出し元は生成済みsectionsのみ。外部入力やURLパラメーターは渡さない。
 */
export default function OriginalSvg({ markup }: { markup: string }) {
    return <div className="svg-source" dangerouslySetInnerHTML={{ __html: markup }} />;
}
