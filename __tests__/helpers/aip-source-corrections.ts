/**
 * AWS公式ドキュメント（2026-10-16確認）にもとづく原本からの訂正。
 * 原本fixtureは固定Gitの証跡として改変せず、表示内容の期待値にだけ適用する。
 */
type Correction = readonly [from: string, to: string];

/** Domain 1: 旧URLはユーザーガイドのトップへ302転送されるため、データソース接続の現行ページへ差し替える。 */
export const AIP_DOMAIN1_CORRECTIONS: readonly Correction[] = [
    ['/userguide/kb-data-source-connectors.html', '/userguide/data-source-connectors.html'],
    ['ナレッジベースのコネクタを利用', 'ナレッジベースのコネクタを利用。カスタマーマネージドのナレッジベースでは2026年9月30日以降これらのコネクタを新規作成できない(既存のコネクタは取り込みと検索を引き続き利用可能)。Bedrock Managed Knowledge Base は Confluence と SharePoint のネイティブコネクタを提供するが、Salesforce は含まれない'],
    ['ナレッジベースのウェブクローラーを利用', 'ナレッジベースのウェブクローラーを利用。カスタマーマネージドのナレッジベースでは2026年9月30日以降ウェブクローラーを新規作成できない(既存のクローラーは取り込みと検索を引き続き利用可能)。Bedrock Managed Knowledge Base はウェブクローラーのネイティブコネクタを提供する'],
];

/** Domain 2: 検証をtoolSpecのpatternと一致させ、errorCodeを持たない呼び出しログではなくアプリのエラーログを集計する。 */
export const AIP_DOMAIN2_CORRECTIONS: readonly Correction[] = [
    ['def handler(event, context):', 'import re\n\nORDER_ID_PATTERN = re.compile(r"A[0-9A-Z]{4,}")  # toolSpec の pattern と同じ形式\n\ndef handler(event, context):'],
    ['order_id.startswith("A") and len(order_id) >= 5', 'ORDER_ID_PATTERN.fullmatch(order_id)'],
    ['order_id は A で始まる5文字以上の英数字です。', 'order_id は A の後に英大文字または数字が4文字以上続く形式です。'],
    ['fields @timestamp, modelId, input.inputTokenCount, output.outputTokenCount', '# アプリが出力する構造化エラーログが対象（モデル呼び出しログには errorCode がない）\nfields @timestamp, requestId, modelId, errorCode'],
];

const correctText = (text: string, corrections: readonly Correction[]): string =>
    corrections.reduce((current, [from, to]) => current.replaceAll(from, to), text);

function correctValue(value: unknown, corrections: readonly Correction[]): unknown {
    if (typeof value === 'string') return correctText(value, corrections);
    if (Array.isArray(value)) {
        // コード行の配列では、訂正で増えた行を独立した行として展開する
        return value.flatMap(item => {
            if (typeof item !== 'string') return [correctValue(item, corrections)];
            const corrected = correctText(item, corrections);
            return !item.includes('\n') && corrected.includes('\n') ? corrected.split('\n') : [corrected];
        });
    }
    if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, correctValue(item, corrections)]));
    }
    return value;
}

/** fixtureの全文字列へ訂正を適用した複製を返す。構造とキーは変えない。 */
export function withSourceCorrections<T>(value: T, corrections: readonly Correction[]): T {
    return correctValue(value, corrections) as T;
}
