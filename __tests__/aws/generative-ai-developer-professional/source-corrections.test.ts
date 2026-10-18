import { describe, expect, it } from 'vitest';
import domain1 from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.json';
import domain2 from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.json';
import domain1Fidelity from '@/docs/migration-inventory/aws-aip-c01-domain1-guide.fidelity.json';
import domain2Fidelity from '@/docs/migration-inventory/aws-aip-c01-domain2-guide.fidelity.json';
import domain3 from '@/docs/migration-inventory/aws-aip-c01-domain3-guide.json';
import domain3Fidelity from '@/docs/migration-inventory/aws-aip-c01-domain3-guide.fidelity.json';
import domain4 from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.json';
import rawQuiz4 from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.quiz.json';
import domain4Fidelity from '@/docs/migration-inventory/aws-aip-c01-domain4-guide.fidelity.json';
import { AIP_DOMAIN1_CORRECTIONS, AIP_DOMAIN2_CORRECTIONS, AIP_DOMAIN3_CORRECTIONS, AIP_DOMAIN4_CORRECTIONS, AIP_DOMAIN4_REFERENCE_ROWS, withSourceCorrections } from '@/__tests__/helpers/aip-source-corrections';

const count = (text: string, part: string) => text.split(part).length - 1;

describe('AIP domain1/2 AWS公式ドキュメントにもとづく訂正', () => {
    it.each([
        ['domain1', domain1, AIP_DOMAIN1_CORRECTIONS],
        ['domain2', domain2, AIP_DOMAIN2_CORRECTIONS],
    ] as const)('%s: 各訂正が原本inventoryの対象箇所に一致する（空振りしない）', (_name, inventory, corrections) => {
        const body = inventory.bodyContent.map(block => block.text).join('\n');
        // 図の定義はinventoryに含まれないため、fidelity fixtureの図も照合対象にする
        const fidelity = inventory === domain2 ? domain2Fidelity : domain1Fidelity;
        const diagrams = Object.values(fidelity.guideParts).flatMap(part => part.diagrams).join('\n');
        const target = [body, inventory.td.join('\n'), inventory.listItems.join('\n'), diagrams].join('\n');
        for (const [from] of corrections) expect(count(target, from), from).toBeGreaterThanOrEqual(1);
    });

    it.each([
        // 図の定義はinventoryに含まれないため、fidelity fixtureの図も照合対象にする
        ['domain3', domain3, AIP_DOMAIN3_CORRECTIONS, Object.values(domain3Fidelity.guideParts).flatMap(part => part.diagrams)],
        // 冒頭の件数表示はinventoryに含まれないため、domain4はfidelity fixtureの全文も照合対象にする
        ['domain4', domain4, AIP_DOMAIN4_CORRECTIONS, [...Object.values(domain4Fidelity.guideParts).flatMap(part => [part.text, ...part.diagrams]), JSON.stringify(rawQuiz4)]],
    ] as const)('%s: 各訂正が原本inventoryの本文・表セル・リスト項目に一致する（空振りしない）', (_name, inventory, corrections, extra) => {
        const target = [...inventory.bodyContent.map(block => block.text), ...inventory.td, ...inventory.listItems, ...extra].join('\n');
        for (const [from] of corrections) expect(count(target, from), from).toBeGreaterThanOrEqual(1);
    });

    it('domain3: 公平性メトリクスはアプリが算出してCloudWatchへ発行し、事前定義の指標とは書かない', () => {
        const corrected = withSourceCorrections(domain3, AIP_DOMAIN3_CORRECTIONS);
        const skill = corrected.bodyContent.find(block => block.text.includes('Skill 3.4.2:'))?.text ?? '';
        expect(skill).not.toContain('事前定義');
        expect(skill).toContain('アプリケーション側で公平性メトリクスを算出して CloudWatch にカスタムメトリクスとして発行');
    });

    it('domain3: Q2はGuardrailIdentifier条件キーが効く4つの推論APIに要件を限定し、解説も同じ範囲にする', () => {
        const corrected = withSourceCorrections(domain3, AIP_DOMAIN3_CORRECTIONS);
        const texts = corrected.bodyContent.map(block => block.text);
        const apis = 'Converse、ConverseStream、InvokeModel、InvokeModelWithResponseStream';
        expect(texts).toContain(`社内の全開発者が Bedrock の推論 API（${apis}）を呼ぶ際、必ず特定のガードレールを使わせたい。`);
        expect(texts).toContain('答え: B。条件キーで、これら 4 つの推論 API でガードレールなしの呼び出しを拒否できる。');
        expect(texts).not.toContain('社内の全開発者が Bedrock を呼ぶ際、必ず特定のガードレールを使わせたい。');
    });

    it('domain3: text-to-SQLの同一結果は同じSQLを同じデータに実行した場合に限り、Q4の解説も固定クエリを示す', () => {
        const corrected = withSourceCorrections(domain3, AIP_DOMAIN3_CORRECTIONS);
        const reliability = corrected.td[corrected.td.indexOf('結果の信頼性') + 1] ?? '';
        expect(reliability).toContain('生成される SQL はリクエストごとに変わりうる');
        expect(reliability).toContain('同じ SQL を同じデータに実行した場合に限る');
        expect(reliability).toContain('検証済みの固定クエリやパラメータ化テンプレート');
        const answer = corrected.bodyContent.map(block => block.text).find(text => text.includes('答え: B。SQL は検証')) ?? '';
        expect(answer).toContain('検証済みの固定クエリやパラメータ化テンプレートを同じデータに対して実行する');
    });

    it('domain3: 図diag-11は対応表をFMへの経路に置かず、権限のある復元だけにつなぐ', () => {
        const corrected = withSourceCorrections(domain3Fidelity, AIP_DOMAIN3_CORRECTIONS);
        const chart = Object.values(corrected.guideParts).flatMap(part => part.diagrams).find(dsl => dsl.includes('NAME_001 ADDR_001')) ?? '';
        const edges = chart.split('\n').filter(line => /^\w+\b.*(-->|-\.->)/.test(line));
        expect(edges).toContain('TOK --> FM["FM 推論 PII を含まない入力"]');
        expect(edges.filter(line => /\bMAP\b/.test(line))).toEqual(['MAP["対応表を暗号化して別保管 DynamoDB KMS"] -.->|"権限確認後のみ参照"| RES']);
    });

    it('domain4: 使用量を記録するだけのヘルパー名を記録専用にし、図diag-8は両キャッシュでテナントと権限を確認してからヒットを返す', () => {
        const corrected = withSourceCorrections(domain4Fidelity, AIP_DOMAIN4_CORRECTIONS);
        const all = JSON.stringify(corrected);
        expect(all).not.toContain('invoke_with_budget');
        expect(all).toContain('invoke_and_log_usage');
        const chart = Object.values(corrected.guideParts).flatMap(part => part.diagrams).find(dsl => dsl.includes('完全一致キャッシュに存在するか')) ?? '';
        const lines = chart.split('\n');
        expect(lines.filter(line => line.endsWith('| HIT'))).toEqual(['TEX -->|"はい"| HIT', 'TSEM -->|"はい"| HIT']);
        expect(lines).toEqual(expect.arrayContaining(['TEX -->|"いいえ"| EMB', 'TSEM -->|"いいえ"| FM', 'SEM -->|"いいえ"| FM', 'FM --> STORE', 'STORE --> HIT']));
    });

    it('domain4: Q3のセマンティックキャッシュ例を公開済みの送料FAQにし、解説も同じ前提にする', () => {
        const corrected = withSourceCorrections(rawQuiz4, AIP_DOMAIN4_CORRECTIONS);
        const q3 = corrected.find(question => question.id === 'q3');
        expect(q3?.answer).toEqual(['B']);
        expect(q3?.stem).toContain('「送料はいくらですか」「配送料金を教えてください」');
        expect(q3?.stem).not.toContain('配送状況はどうなっていますか');
        expect(q3?.explanation).toContain('全ユーザー共通で変化の少ない FAQ はセマンティックキャッシュに向きます');
        expect(q3?.explanation).toContain('キャッシュせず都度取得');
        // クイズfixture自体が表示内容と一致し、訂正による差分の吸収に頼らない
        expect(rawQuiz4.find(question => question.id === 'q3')).toEqual(q3);
    });

    it('domain4: 使用量記録の例が機能・モデル別だけを記録することと、テナント別に集計する方法を明記する', () => {
        const corrected = withSourceCorrections(domain4, AIP_DOMAIN4_CORRECTIONS);
        const point = corrected.bodyContent.find(block => block.text.includes('「どの機能がコストを食っているか」'))?.text ?? '';
        expect(point).toContain('この例は機能 (Feature) とモデル別のメトリクスだけを記録します');
        expect(point).toContain('Dimensions とイベントのルートの両方に TenantId を加えます');
    });

    it('domain4: 直列ステップは所要時間の合計、最も遅い経路は並列時だけとし、キャッシュのトークン数を別に扱う', () => {
        const corrected = withSourceCorrections(domain4, AIP_DOMAIN4_CORRECTIONS);
        const workflow = corrected.bodyContent.find(block => block.text.includes('複数ステップの連鎖です'))?.text ?? '';
        expect(workflow).toContain('各ステップの所要時間の合計');
        expect(workflow).toContain('並列実行している場合だけ');
        expect(workflow).not.toContain('最も遅いステップ');
        const metric = corrected.td.indexOf('InputTokenCount / OutputTokenCount / CacheReadInputTokenCount / CacheWriteInputTokenCount');
        expect(metric).toBeGreaterThanOrEqual(0);
        expect(corrected.td[metric + 1]).toBe('入出力トークン数');
        expect(corrected.td[metric + 2]).toContain('読み取りは通常の入力より割安、書き込みは割高');
        expect(corrected.td[metric + 2]).toContain('クォータ');
    });

    it('domain4: HYBRIDの対応ストアをOpenSearch Serverless・RDS (Aurora PostgreSQL)・MongoDB Atlasとし、Step 22に根拠ページを足す', () => {
        const corrected = withSourceCorrections(domain4, AIP_DOMAIN4_CORRECTIONS, AIP_DOMAIN4_REFERENCE_ROWS);
        const hybrid = corrected.listItems.find(item => item.includes('HYBRID または SEMANTIC')) ?? '';
        expect(hybrid).toContain('Amazon OpenSearch Serverless、Amazon RDS (Aurora PostgreSQL)、MongoDB Atlas');
        expect(hybrid).toContain('フィルタ可能なテキストフィールドを持たない構成では SEMANTIC');
        expect(hybrid).not.toContain('(他の構成では SEMANTIC のみ)');
        const kbTestConfig = 'https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html';
        const standardApi = domain4.td.indexOf('https://docs.aws.amazon.com/bedrock/latest/APIReference/API_agent-runtime_KnowledgeBaseVectorSearchConfiguration.html');
        expect(corrected.td.slice(standardApi + 1, standardApi + 5)).toEqual(['確認済み', '4.2.2', expect.stringContaining('HYBRID の対応ベクトルストア'), kbTestConfig]);
        expect(corrected.td).toHaveLength(domain4.td.length + 4);
        expect(corrected.links.map(link => link.href).filter(href => href === kbTestConfig)).toHaveLength(1);
        expect(corrected.links).toHaveLength(domain4.links.length + 1);
    });

    it('domain2: カスタムモデルのProvisioned Throughputを条件付きにし、オンデマンドデプロイに触れ、問題5の正解は保持する', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const all = [...corrected.bodyContent.map(block => block.text), ...corrected.td, ...corrected.listItems].join('\n');
        expect(all).not.toContain('Bedrock で使うときは Provisioned Throughput が必要');
        expect(all).not.toContain('Bedrock のカスタムモデル推論には Provisioned Throughput が必要');
        expect(all).not.toContain('カスタムモデルを推論に使うには Provisioned Throughput が必要です');
        const step9 = corrected.listItems.find(item => item.includes('（試験の定番）'));
        expect(step9).toContain('すべてのカスタムモデルで Provisioned Throughput が必須ではなく');
        expect(step9).toContain('オンデマンドデプロイ');
        expect(corrected.td).toContain('カスタムモデルを安定したスループットで本番推論（Bedrock）');
        const misconception = corrected.td.indexOf('カスタムモデルはオンデマンドでも処理能力が確保される');
        expect(misconception).toBeGreaterThanOrEqual(0);
        expect(corrected.td[misconception + 1]).toContain('オンデマンドデプロイも可能');
        // 問題5は「安定したスループット」が前提のため、正解Bの説明として Provisioned Throughput を保持する
        const answer5 = corrected.bodyContent.find(block => block.text.includes('C は Lambda の機能で'))?.text ?? '';
        expect(answer5).toMatch(/^B。問題文は安定したスループットを求めているため/);
        expect(answer5).toContain('Provisioned Throughput');
        expect(answer5).toContain('オンデマンドデプロイ');
    });

    it('domain2: Step 15はDirect Connectのプライベート接続と暗号化を区別し、図diag-22も同じ区別にする', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const cell = corrected.td.find(item => item.startsWith('オンプレミスとAWSのプライベート接続')) ?? '';
        expect(cell).toContain('Direct Connect は既定では暗号化されない');
        for (const method of ['TLS', 'MACsec', 'Site-to-Site VPN']) expect(cell).toContain(method);
        expect(corrected.td.join('\n')).not.toContain('閉域・暗号化接続');
        const chart = withSourceCorrections(domain2Fidelity.guideParts.task3.diagrams, AIP_DOMAIN2_CORRECTIONS).find(item => item.includes('Direct Connect または VPN')) ?? '';
        expect(chart).not.toContain('暗号化された専用経路');
        expect(chart).toContain('|Direct Connect または VPN<br/>プライベート経路<br/>暗号化は TLS MACsec VPN で行う|');
    });

    it('domain1: 旧コネクタURLを残さず、廃止日と既存コネクタの継続、Managed Knowledge BaseのSalesforce対応を明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        expect(corrected.links.map(link => link.href)).not.toContain('https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-connectors.html');
        const connectorCell = corrected.td.find(cell => cell.startsWith('ナレッジベースのコネクタを利用'));
        expect(connectorCell).toContain('2026年9月30日以降');
        expect(connectorCell).toContain('既存のコネクタは取り込みと検索を引き続き利用可能');
        expect(connectorCell).toContain('Confluence、SharePoint、Salesforce のネイティブコネクタを提供する');
        expect(corrected.td.find(cell => cell.startsWith('ナレッジベースのウェブクローラーを利用'))).toContain('2026年9月30日以降');
    });

    it('domain1: Salesforceコネクタは文書単位のACLに対応せず、保護が必要な内容はサーバー側で別途認可すると明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        const connectorCell = corrected.td.find(cell => cell.startsWith('ナレッジベースのコネクタを利用')) ?? '';
        expect(connectorCell).toContain('Salesforce コネクタは文書単位の ACL に対応しない');
        expect(connectorCell).toContain('クロールした Salesforce のコンテンツはナレッジベースの利用者全員が取得できる');
        expect(connectorCell).toContain('保護が必要な内容はサーバー側で別途認可を行う');
    });

    it('domain1: Task 1.5の埋め込みの出典を、ナレッジベースが埋め込みを作成・検索する仕組みのページへ差し替える', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        const hrefs = corrected.links.map(link => link.href);
        expect(hrefs).not.toContain('https://docs.aws.amazon.com/bedrock/latest/userguide/embeddings.html');
        expect(hrefs).toContain('https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html');
        const citation = corrected.bodyContent.find(block => block.text.startsWith('出典: Bedrock Embeddings の考え方'))?.text ?? '';
        expect(citation).toBe('出典: Bedrock Embeddings の考え方 https://docs.aws.amazon.com/bedrock/latest/userguide/kb-how-it-works.html');
    });

    it('domain1: PIIのガードレールはモデル入力をマスクするが呼び出しログはサニタイズしないことを明記する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        expect(corrected.listItems.join('\n')).not.toContain('マスキングするか、ガードレールで保護する');
        const item = corrected.listItems.find(text => text.startsWith('PII は')) ?? '';
        expect(item).toContain('Bedrock へのリクエスト前にマスキング');
        expect(item).toContain('モデル呼び出しログはサニタイズしない');
        expect(item).toContain('呼び出しログを別途保護');
    });

    it('domain1: Task 1.4はKnowledge BasesをマネージドRAGとして区別し、userContextはACL対応ソースに限定する', () => {
        const corrected = withSourceCorrections(domain1, AIP_DOMAIN1_CORRECTIONS);
        const kbCell = corrected.td.find(cell => cell.startsWith('Bedrock Knowledge Bases(マネージド')) ?? '';
        expect(kbCell).toContain('マネージド RAG');
        expect(kbCell).toContain('ベクトルストアではなく');
        for (const store of ['Amazon OpenSearch Service / Serverless', 'Amazon Aurora PostgreSQL + pgvector', 'Amazon DynamoDB(ベクトルインデックス)', 'Amazon S3 Vectors']) expect(corrected.td).toContain(store);
        const item = corrected.listItems.find(text => text.startsWith('権限属性を持たせ')) ?? '';
        expect(item).toContain('制限のあるすべてのデータソースが ACL に対応している場合に限る');
        expect(item).toContain('ACL 非対応のデータソースでは認証済み ID からサーバー側で生成したメタデータフィルター');
        expect(item).toContain('クライアントが送ってきた権限フィルターをそのまま使ってはならない');
    });

    it('domain1: 図diag-11は関数呼び出し・MCPの検索ツールを回答生成より前に置き、その結果を回答に渡す', () => {
        const charts = withSourceCorrections(Object.values(domain1Fidelity.guideParts).flatMap(part => part.diagrams), AIP_DOMAIN1_CORRECTIONS);
        const chart = charts.find(item => item.includes('1.5.6 関数呼び出しや MCP')) ?? '';
        expect(chart).not.toContain('FM --> ACC');
        expect(chart).not.toContain('CTX --> FM');
        expect(chart).toContain('CTX --> ACC["1.5.6 関数呼び出しや MCP で FM から検索を利用"]');
        expect(chart).toContain('ACC -->|"検索結果をツール結果として FM へ返す"| FM["FM が回答を生成"]');
        // ACC の定義は1回だけ（ノードの重複定義を残さない）
        expect(count(chart, 'ACC["')).toBe(1);
    });

    it('domain2: 推論プロファイルは全リージョンの基盤モデル許可が必要で、直接呼び出し防止にInferenceProfileArn条件を勧める', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const note = corrected.bodyContent.find(block => block.text.startsWith('Resource を * にしない'))?.text ?? '';
        expect(note).not.toContain('そのARNも含めて指定します');
        expect(note).toContain('プロファイルに関連付けられたすべてのリージョンの基盤モデル ARN も許可');
        expect(note).toContain('AccessDeniedException');
        expect(note).toContain('bedrock:InferenceProfileArn');
        expect(note).toContain('基盤モデルの直接呼び出しを防ぐ');
    });

    it('domain2: 検証パターンがtoolSpecと一致し、A123/ のような不正IDを拒否する', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const code = corrected.bodyContent.find(block => block.text.includes('def handler(event, context):'))?.text ?? '';
        const pattern = /re\.compile\(r"([^"]+)"\)/.exec(code)?.[1];
        expect(pattern).toBe('A[0-9A-Z]{4,}');
        expect(code).toContain('ORDER_ID_PATTERN.fullmatch(order_id)');
        expect(code).not.toContain('startswith');
        // Python の fullmatch と同じく全体一致で判定する
        const fullmatch = new RegExp(`^(?:${pattern})$`);
        expect(['A1234', 'AB12C', 'A0000Z'].every(id => fullmatch.test(id))).toBe(true);
        expect(['A123/', 'A12', 'a1234', 'B1234', 'A12345\n', 'Aabcd'].some(id => fullmatch.test(id))).toBe(false);
    });

    it('domain2: エラー集計はerrorCodeを出力するアプリログを対象にし、呼び出しログのトークン集計は保持する', () => {
        const corrected = withSourceCorrections(domain2, AIP_DOMAIN2_CORRECTIONS);
        const queries = corrected.bodyContent.filter(block => block.text.includes('| filter')).map(block => block.text);
        expect(queries[0]).toMatch(/^# アプリが出力する構造化エラーログが対象.*errorCode がない）\nfields @timestamp, requestId, modelId, errorCode\n\| filter ispresent\(errorCode\)/);
        expect(queries[0]).not.toContain('inputTokenCount');
        expect(queries[1]).toContain('input.inputTokenCount as inTok');
    });
});
