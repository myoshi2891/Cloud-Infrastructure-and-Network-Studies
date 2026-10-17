/**
 * AWS公式ドキュメント（2026-10-16確認）にもとづく原本からの訂正。
 * 原本fixtureは固定Gitの証跡として改変せず、表示内容の期待値にだけ適用する。
 */
/** after 指定時は、直前の表セル（結合テキストでは直前の語句）が after と一致する from だけを訂正する。 */
type Correction = readonly [from: string, to: string, after?: string];

/** Domain 1: 旧URLはユーザーガイドのトップへ302転送されるため、データソース接続の現行ページへ差し替える。 */
export const AIP_DOMAIN1_CORRECTIONS: readonly Correction[] = [
    ['/userguide/kb-data-source-connectors.html', '/userguide/data-source-connectors.html'],
    // embeddings.html もユーザーガイドのトップへ302転送されるため、ナレッジベースが埋め込みを作成・検索する仕組みのページへ差し替える
    ['/userguide/embeddings.html', '/userguide/kb-how-it-works.html'],
    ['ナレッジベースのコネクタを利用', 'ナレッジベースのコネクタを利用。カスタマーマネージドのナレッジベースでは2026年9月30日以降これらのコネクタを新規作成できない(既存のコネクタは取り込みと検索を引き続き利用可能)。Bedrock Managed Knowledge Base は Confluence、SharePoint、Salesforce のネイティブコネクタを提供する。Salesforce コネクタは文書単位の ACL に対応しないため、クロールした Salesforce のコンテンツはナレッジベースの利用者全員が取得できる(Salesforce 側のレコード権限は引き継がれない)。保護が必要な内容はサーバー側で別途認可を行う'],
    ['ナレッジベースのウェブクローラーを利用', 'ナレッジベースのウェブクローラーを利用。カスタマーマネージドのナレッジベースでは2026年9月30日以降ウェブクローラーを新規作成できない(既存のクローラーは取り込みと検索を引き続き利用可能)。Bedrock Managed Knowledge Base はウェブクローラーのネイティブコネクタを提供する'],
    // ガードレールのPIIマスクはAPIの入出力にだけ効き、モデル呼び出しログには元の内容が残る
    // Knowledge Bases はベクトルストアではなく、下記のストアを保存先に使うマネージド RAG
    ['Bedrock Knowledge Bases(マネージド)', 'Bedrock Knowledge Bases(マネージド RAG。ベクトルストアではなく、下記のストアを保存先に使う)'],
    // userContext は ACL 対応ソースでしか効かないため、非対応ソースはサーバー生成フィルターで絞る
    [' を Retrieve に渡す、または ②', ' を Retrieve に渡す(制限のあるすべてのデータソースが ACL に対応している場合に限る)、または ②ACL 非対応のデータソースでは'],
    // 関数呼び出し・MCP の検索ツールは回答生成の前に実行され、その結果が最終回答の根拠になる
    ['CTX --> FM["FM が回答を生成"]', 'CTX --> ACC["1.5.6 関数呼び出しや MCP で FM から検索を利用"]\nACC -->|"検索結果をツール結果として FM へ返す"| FM["FM が回答を生成"]'],
    ['\nFM --> ACC["1.5.6 関数呼び出しや MCP で FM から検索を利用"]', ''],
    ['PII は、FM に渡す前にマスキングするか、ガードレールで保護する', 'PII は、FM に渡す前（Bedrock へのリクエスト前にマスキング）に取り除く。ガードレールはモデルの入出力をマスクできるが、モデル呼び出しログはサニタイズしないため、生の PII を残してはならない場合は呼び出しログを別途保護する(ログの無効化、KMS 暗号化、アクセス制限など)'],
];

/** Domain 2: 検証をtoolSpecのpatternと一致させ、errorCodeを持たない呼び出しログではなくアプリのエラーログを集計する。 */
export const AIP_DOMAIN2_CORRECTIONS: readonly Correction[] = [
    ['def handler(event, context):', 'import re\n\nORDER_ID_PATTERN = re.compile(r"A[0-9A-Z]{4,}")  # toolSpec の pattern と同じ形式\n\ndef handler(event, context):'],
    ['order_id.startswith("A") and len(order_id) >= 5', 'ORDER_ID_PATTERN.fullmatch(order_id)'],
    ['order_id は A で始まる5文字以上の英数字です。', 'order_id は A の後に英大文字または数字が4文字以上続く形式です。'],
    ['fields @timestamp, modelId, input.inputTokenCount, output.outputTokenCount', '# アプリが出力する構造化エラーログが対象（モデル呼び出しログには errorCode がない）\nfields @timestamp, requestId, modelId, errorCode'],
    // カスタムモデルは対応モデルならオンデマンドデプロイでき、Provisioned Throughput は安定したスループットが必要な場合の選択肢
    ['ファインチューニング済みのカスタムモデルを Bedrock で使うときは Provisioned Throughput が必要', 'ファインチューニング済みのカスタムモデルを Bedrock で安定したスループットで提供するときは Provisioned Throughput を使う'],
    ['（試験の定番）。', '（試験の定番）。ただし、すべてのカスタムモデルで Provisioned Throughput が必須ではなく、対応モデルではカスタムモデルのオンデマンドデプロイ（トークン従量課金）も選べます。'],
    ['ファインチューニングしたカスタムモデルを本番運用', 'ファインチューニングしたカスタムモデルを安定したスループットで本番運用'],
    ['「カスタムモデル（ファインチューニング）をBedrockで推論」', '「カスタムモデル（ファインチューニング）をBedrockで安定したスループットで推論」'],
    ['カスタムモデルもオンデマンドで使える', 'カスタムモデルはオンデマンドでも処理能力が確保される'],
    ['Bedrock のカスタムモデル推論には ', '対応するカスタムモデルはオンデマンドデプロイも可能だが、処理能力を確保して安定したスループットで推論するには '],
    ['カスタムモデルの本番推論（Bedrock）', 'カスタムモデルを安定したスループットで本番推論（Bedrock）'],
    // 問題5は「安定したスループット」が前提のため、正解Bは変えず理由だけを条件付きにする
    ['Bedrock のカスタムモデルを推論に使うには Provisioned Throughput が必要です。', '問題文は安定したスループットを求めているため、モデルユニットで処理能力を確保する Provisioned Throughput を使います（対応モデルではカスタムモデルのオンデマンドデプロイも可能ですが、処理能力は確保されません）。'],
    // Direct Connect はプライベート接続だが既定では暗号化しないため、暗号化手段を明示する
    ['オンプレミスとAWSの閉域・暗号化接続', 'オンプレミスとAWSのプライベート接続（Direct Connect は既定では暗号化されないため、暗号化が必要なら TLS、MACsec、または Direct Connect 上の Site-to-Site VPN（IPsec）を使う）'],
    ['|Direct Connect または VPN<br/>暗号化された専用経路|', '|Direct Connect または VPN<br/>プライベート経路<br/>暗号化は TLS MACsec VPN で行う|'],
    // 推論プロファイルはプロファイルARNだけでなく、関連する全リージョンの基盤モデルARNも許可が必要
    ['推論プロファイルを使う場合は、そのARNも含めて指定します。', '推論プロファイルを使う場合は、プロファイルの ARN に加えて、プロファイルに関連付けられたすべてのリージョンの基盤モデル ARN も許可します（プロファイル ARN だけでは、別リージョンへルーティングされた呼び出しが AccessDeniedException で失敗します）。プロファイル経由の呼び出しに限定して基盤モデルの直接呼び出しを防ぐには、基盤モデルを許可するステートメントに bedrock:InferenceProfileArn 条件キーを付けます。'],
];

/** Domain 3: CloudWatch に事前定義の公平性メトリクスはないため、アプリが算出して発行する形にする。 */
export const AIP_DOMAIN3_CORRECTIONS: readonly Correction[] = [
    ['CloudWatch の事前定義された公平性メトリクス、', 'アプリケーション側で公平性メトリクスを算出して CloudWatch にカスタムメトリクスとして発行、'],
    // bedrock:GuardrailIdentifier による強制は4つの推論APIだけに効くため、Q2の要件と解説をその範囲に限定する
    ['社内の全開発者が Bedrock を呼ぶ際、', '社内の全開発者が Bedrock の推論 API（Converse、ConverseStream、InvokeModel、InvokeModelWithResponseStream）を呼ぶ際、'],
    ['条件キーでガードレールなしの推論を拒否できる。', '条件キーで、これら 4 つの推論 API でガードレールなしの呼び出しを拒否できる。'],
    // 生成SQLはリクエストごとに変わりうるため、同じ数値になるのは同じSQLを同じデータに実行した場合だけ
    ['数値は DB から取得するため、同じデータなら同じ結果になる（決定的）', '数値は LLM ではなく DB が計算するため推測によるぶれはない。ただし生成される SQL はリクエストごとに変わりうるため、同じ結果になるのは同じ SQL を同じデータに実行した場合に限る。毎回同じ数値が必要な集計は、検証済みの固定クエリやパラメータ化テンプレートを使う'],
    ['SQL は検証、実行は最小権限（読み取り専用）。', 'SQL は検証、実行は最小権限（読み取り専用）。毎回同じ数値を保証するには、検証済みの固定クエリやパラメータ化テンプレートを同じデータに対して実行する。'],
    // 対応表はモデルへの経路に置かず、権限のある復元だけが参照する別保管とする
    ['\nTOK --> MAP["対応表を暗号化して別保管 DynamoDB KMS"]', ''],
    ['\nMAP --> RES', '\nMAP["対応表を暗号化して別保管 DynamoDB KMS"] -.->|"権限確認後のみ参照"| RES'],
];

/** Domain 4: 直列ステップの所要時間は合計され、最も遅い経路が効くのは並列時だけ。キャッシュのトークン数は別メトリクスで扱う。 */
export const AIP_DOMAIN4_CORRECTIONS: readonly Correction[] = [
    ['全体の時間とコストは 最も遅いステップ と ステップ間の無駄 で決まります。', '直列に実行するステップでは、全体の時間は 各ステップの所要時間の合計 と ステップ間の無駄 で決まります。最も遅い経路がレイテンシを決めるのは、独立したステップを並列実行している場合だけです。'],
    ['最も遅いステップ', '各ステップの所要時間の合計'],
    ['InputTokenCount / OutputTokenCount', 'InputTokenCount / OutputTokenCount / CacheReadInputTokenCount / CacheWriteInputTokenCount'],
    ['コストの監視、トークンバーストの検知', 'コストの監視、トークンバーストの検知。キャッシュ読み取りは通常の入力より割安、書き込みは割高になるモデルがあるため、InputTokenCount と分けて集計する。クォータへの算入方法もモデルごとに異なるため、最新の料金表とクォータの説明で確認する'],
    // InvokeAgent とナレッジベース検索は CloudTrail のデータイベントで既定では記録されない。参考URL表の同名セルは訂正しない
    ['AWS CloudTrail', 'AWS CloudTrail (InvokeAgent やナレッジベースの Retrieve / RetrieveAndGenerate はデータイベントで既定では記録されないため、データイベントセレクターの設定が必要)', '誰が、いつ、どの API を呼んだか (操作の監査)'],
    // HYBRID は OpenSearch Serverless だけでなく、フィルタ可能なテキストフィールドを持つ RDS・MongoDB のベクトルストアでも使える
    ['ハイブリッドは、フィルタ可能なテキストフィールドを持つ Amazon OpenSearch Serverless のベクトルストアで利用できる', 'ハイブリッドは、フィルタ可能なテキストフィールドを持つ Amazon OpenSearch Serverless、Amazon RDS (Aurora PostgreSQL)、MongoDB Atlas のベクトルストアで利用できる'],
    ['(他の構成では SEMANTIC のみ)', '(これら以外のベクトルストアや、フィルタ可能なテキストフィールドを持たない構成では SEMANTIC のみ)'],
    // 参考文献は AIP_DOMAIN4_REFERENCE_ROWS で1行追加するため、冒頭の件数表示も合わせる（原本で「36件」はこの1箇所のみ）
    ['36件', '37件'],
];

/** 原本の参照表へ追加する行。after は直前行の URL セルと一致させ、cells の末尾を URL とする。 */
type ReferenceRow = readonly [after: string, cells: readonly string[]];

/** Domain 4 Step 22: HYBRID の対応ベクトルストアを記載したユーザーガイドを、API リファレンス標準版の直後に追加する。 */
export const AIP_DOMAIN4_REFERENCE_ROWS: readonly ReferenceRow[] = [
    ['https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_KnowledgeBaseVectorSearchConfiguration.html',
        ['確認済み', '4.2.2', 'Knowledge Bases の検索タイプ (HYBRID の対応ベクトルストア) と取得設定', 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html']],
];

const correctText = (text: string, corrections: readonly Correction[]): string =>
    corrections.reduce((current, [from, to, after]) =>
        after === undefined ? current.replaceAll(from, to) : current.replaceAll(`${after} ${from}`, `${after} ${to}`), text);

const cellText = (item: unknown): string | undefined => {
    if (typeof item === 'string') return item;
    if (typeof item !== 'object' || item === null || !('text' in item)) return undefined;
    return typeof item.text === 'string' ? item.text : undefined;
};

/** 直前の要素が after と一致するセルにだけ文脈付き訂正を適用する。 */
const contextualTarget = (items: readonly unknown[], index: number, corrections: readonly Correction[]): string | undefined =>
    corrections.find(([from, , after]) => after !== undefined && cellText(items[index]) === from && cellText(items[index - 1]) === after)?.[1];

function correctValue(value: unknown, corrections: readonly Correction[]): unknown {
    if (typeof value === 'string') return correctText(value, corrections);
    if (Array.isArray(value)) {
        // コード行の配列では、訂正で増えた行を独立した行として展開する
        return value.flatMap((item, index) => {
            const contextual = contextualTarget(value, index, corrections);
            if (contextual !== undefined) return [typeof item === 'string' ? contextual : { ...(correctValue(item, corrections) as object), text: contextual }];
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

const hrefOf = (item: unknown): string | undefined =>
    typeof item === 'object' && item !== null && 'href' in item && typeof item.href === 'string' ? item.href : undefined;

/** 配列要素が after の行（表セル列・リンク・表の行）に当たる場合、同じ形の追加行を返す。 */
function addedItem(item: unknown, [after, cells]: ReferenceRow): unknown[] {
    const url = cells.at(-1);
    if (item === after) return [...cells];
    if (hrefOf(item) === after) return [{ ...(item as object), href: url, text: url }];
    if (Array.isArray(item) && cellText(item.at(-1)) === after) return [item.map((cell: unknown, index) => ({ ...(cell as object), text: cells[index] }))];
    return [];
}

function insertRows(value: unknown, rows: readonly ReferenceRow[]): unknown {
    // 結合テキストでは直前行の URL の後ろへ追加行の語句を続ける。URL セル自身（完全一致）は変えない
    if (typeof value === 'string') return rows.reduce((current, [after, cells]) => current === after ? current : current.replaceAll(after, `${after} ${cells.join(' ')}`), value);
    if (Array.isArray(value)) return value.flatMap(item => [insertRows(item, rows), ...rows.flatMap(row => addedItem(item, row))]);
    if (typeof value === 'object' && value !== null) {
        return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, insertRows(item, rows)]));
    }
    return value;
}

/** fixtureの全文字列へ訂正を適用した複製を返す。rows を渡した場合だけ参照表へ行を追加する。 */
export function withSourceCorrections<T>(value: T, corrections: readonly Correction[], rows: readonly ReferenceRow[] = []): T {
    return insertRows(correctValue(value, corrections), rows) as T;
}
