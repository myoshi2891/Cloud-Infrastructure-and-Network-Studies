/**
 * AWS公式ドキュメント（2026-10-16確認）にもとづく原本からの訂正。
 * 原本fixtureは固定Gitの証跡として改変せず、表示内容の期待値にだけ適用する。
 */
type Correction = readonly [from: string, to: string];

/** Domain 1: 旧URLはユーザーガイドのトップへ302転送されるため、データソース接続の現行ページへ差し替える。 */
export const AIP_DOMAIN1_CORRECTIONS: readonly Correction[] = [
    ['/userguide/kb-data-source-connectors.html', '/userguide/data-source-connectors.html'],
    // embeddings.html もユーザーガイドのトップへ302転送されるため、ナレッジベースが埋め込みを作成・検索する仕組みのページへ差し替える
    ['/userguide/embeddings.html', '/userguide/kb-how-it-works.html'],
    ['ナレッジベースのコネクタを利用', 'ナレッジベースのコネクタを利用。カスタマーマネージドのナレッジベースでは2026年9月30日以降これらのコネクタを新規作成できない(既存のコネクタは取り込みと検索を引き続き利用可能)。Bedrock Managed Knowledge Base は Confluence と SharePoint のネイティブコネクタを提供するが、Salesforce は含まれない'],
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
