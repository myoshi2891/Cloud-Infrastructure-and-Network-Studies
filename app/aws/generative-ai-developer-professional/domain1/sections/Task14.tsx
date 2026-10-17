import { Diagram } from '../Diagram';
/** 原本のtask14区分を全文保持する。 */
export default function Task14() { return <div className="guide-part" data-part="task14"><h2 id="6-task-14-ベクトルストア設計と実装" tabIndex={-1}>{"6. Task 1.4 ベクトルストア設計と実装"}</h2>

<p><strong>{"Task の目的"}</strong>{": 意味検索(キーワード一致ではなく意味の近さで探す検索)の基盤を設計し、性能と鮮度を維持する。"}</p>

<h3 id="ベクトルストア構成の全体像" tabIndex={-1}>{"ベクトルストア構成の全体像"}</h3>

<Diagram id="diag-8" label="ベクトルストア構成の全体像の図解" />

<h3 id="ベクトルストアの選択肢" tabIndex={-1}>{"ベクトルストアの選択肢"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"選択肢"}</th><th scope="col">{"特徴"}</th><th scope="col">{"向いている場面"}</th></tr></thead><tbody><tr className="odd"><td>{"Bedrock Knowledge Bases(マネージド RAG。ベクトルストアではなく、下記のストアを保存先に使う)"}</td><td>{"取り込み、分割、埋め込み、検索を一括で提供"}</td><td>{"早く、運用負荷を抑えて RAG を作りたい"}</td></tr><tr className="even"><td>{"Amazon OpenSearch Service / Serverless"}</td><td>{"高機能な検索とベクトル検索を両立。ハイブリッド検索、細かなチューニング"}</td><td>{"大規模、高度な検索要件、既存の検索基盤がある"}</td></tr><tr className="odd"><td>{"Amazon Aurora PostgreSQL + pgvector"}</td><td>{"リレーショナルデータとベクトルを同じ DB で扱える"}</td><td>{"既存の SQL 資産と結合したい、中規模"}</td></tr><tr className="even"><td>{"Amazon RDS for PostgreSQL + pgvector"}</td><td>{"同上。Aurora ほど拡張性は求めない場合"}</td><td>{"小から中規模"}</td></tr><tr className="odd"><td>{"Amazon DynamoDB(ベクトルインデックス)"}</td><td>{"テーブルにベクトルインデックスを定義し、"}<code>{"SearchVectors"}</code>{" API で近似最近傍検索を直接実行。埋め込みは生成しないため Bedrock などで作成する"}</td><td>{"既存の DynamoDB テーブルのデータにそのまま意味検索を足したい"}</td></tr><tr className="even"><td>{"Amazon DynamoDB との併用"}</td><td>{"ベクトル検索は専用ストア、メタデータや原文は DynamoDB"}</td><td>{"高度な検索機能は専用ストアに任せ、低遅延のキー参照でメタデータを管理したい"}</td></tr><tr className="odd"><td>{"Amazon S3 Vectors"}</td><td>{"S3 上にベクトルを保存。コスト重視"}</td><td>{"大量のベクトルを低コストで保持したい"}</td></tr></tbody></table></div>

<Diagram id="diag-9" label="ベクトルストアの選択肢の図解" />

<p>{"出典: Bedrock Knowledge Bases 前提条件(対応ベクトルストア) "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-prereq.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-prereq.html"}</a></p>

<p>{"出典: Amazon S3 Vectors "}<a href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html">{"https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html"}</a></p>

<p>{"出典: Using vector indexes in DynamoDB "}<a href="https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/VectorSearch.html">{"https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/VectorSearch.html"}</a></p>

<h3 id="skill-141-fm-拡張のための高度なベクトル-db-アーキテクチャ" tabIndex={-1}>{"Skill 1.4.1 FM 拡張のための高度なベクトル DB アーキテクチャ"}</h3>

<p><strong>{"何をするか"}</strong>{": キーワード検索を超えた、意味にもとづく検索を提供する基盤を設計する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"構成例"}</th><th scope="col">{"ポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"Bedrock Knowledge Bases"}</td><td>{"階層チャンク(親と子)など、文書構造に応じた整理ができる"}</td></tr><tr className="even"><td>{"OpenSearch Service と Neural プラグイン"}</td><td>{"OpenSearch から Bedrock の埋め込みモデルを呼び出し、取り込み時や検索時に自動でベクトル化。トピック別のセグメント化にも向く"}</td></tr><tr className="odd"><td>{"RDS または Aurora と S3"}</td><td>{"文書原本は S3、ベクトルとメタデータは DB という分担"}</td></tr><tr className="even"><td>{"DynamoDB のベクトルインデックス"}</td><td>{"項目に埋め込みを保存し、"}<code>{"SearchVectors"}</code>{" で DynamoDB 上を直接検索"}</td></tr><tr className="odd"><td>{"DynamoDB と ベクトル DB"}</td><td>{"埋め込みは専用ストア、メタデータや原文管理は DynamoDB"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li><strong>{"埋め込みモデルの次元数と、インデックスの次元数を一致"}</strong>{"させる(不一致だと登録や検索に失敗する)"}</li>{" "}<li>{"埋め込みモデルを"}<strong>{"後から変えると、全データの再埋め込みが必要"}</strong>{"になるため、最初に十分検討する"}</li>{" "}<li>{"原文を S3 に置き、ベクトルストアには"}<strong>{"出典へのポインタ(S3 URI など)"}</strong>{"を持たせる"}</li>{" "}</ul></div></div>

<p>{"出典: OpenSearch Service ベクトル検索 "}<a href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vector-search.html">{"https://docs.aws.amazon.com/opensearch-service/latest/developerguide/vector-search.html"}</a></p>

<p>{"出典: Aurora と pgvector "}<a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html">{"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html"}</a></p>

<h3 id="skill-142-メタデータ設計" tabIndex={-1}>{"Skill 1.4.2 メタデータ設計"}</h3>

<p><strong>{"何をするか"}</strong>{": 文書に付ける属性情報(メタデータ)を設計し、検索の精度と文脈の正しさを高める。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"メタデータの種類"}</th><th scope="col">{"例"}</th><th scope="col">{"活用方法"}</th></tr></thead><tbody><tr className="odd"><td>{"時間"}</td><td>{"作成日、更新日、有効期限"}</td><td>{"「最新の規程だけ」に絞る"}</td></tr><tr className="even"><td>{"著者、所有者"}</td><td>{"部署名、作成者"}</td><td>{"信頼できる出典に限定する"}</td></tr><tr className="odd"><td>{"分類"}</td><td>{"ドメイン、文書種別、機密区分"}</td><td>{"「人事規程だけ検索」と絞る"}</td></tr><tr className="even"><td>{"アクセス権限"}</td><td>{"閲覧可能なグループ"}</td><td>{"ユーザーごとに検索結果を制限する"}</td></tr></tbody></table></div>

<p><strong>{"Bedrock Knowledge Bases での実装ポイント"}</strong></p>

<ul>{" "}<li>{"S3 の文書に対応する "}<strong>{"メタデータファイル"}</strong>{"(文書名に "}<code>{".metadata.json"}</code>{" を付けた JSON)を並べて置くと、取り込み時に属性として登録される"}</li>{" "}<li>{"検索時に"}<strong>{"メタデータフィルター"}</strong>{"を指定すると、条件に合う文書だけが対象になる"}</li>{" "}<li>{"S3 のオブジェクトタグやユーザー定義メタデータは、"}<strong>{"そのままでは Knowledge Bases のフィルター属性にならない"}</strong>{"。属性として使うには、"}<code>{".metadata.json"}</code>{" ファイルに書くか、取り込み処理で文書のメタデータにコピーする"}</li>{" "}</ul>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"検索に使う属性は、"}<strong>{"取り込み前に設計"}</strong>{"する(後から付け直すと再取り込みが必要)"}</li>{" "}<li>{"権限属性を持たせ、"}<strong>{"検索時に取得段階で絞り込む"}</strong>{"(FM に「見せないで」と頼むのではなく、そもそも取得しない)。ただしメタデータフィルターは「検索条件」であってエンドユーザーの認可ではない。ユーザー単位の制御は、①ACL 対応データソースで"}<strong>{"認証済み ID から導いた "}<code>{"userContext"}</code></strong>{" を Retrieve に渡す(制限のあるすべてのデータソースが ACL に対応している場合に限る)、または ②ACL 非対応のデータソースでは"}<strong>{"認証済み ID からサーバー側で生成したメタデータフィルター"}</strong>{"を使う。"}<strong>{"クライアントが送ってきた権限フィルターをそのまま使ってはならない"}</strong></li>{" "}<li>{"Lake Formation は、対応するデータソースで "}<strong>{"Knowledge Base のサービスロール"}</strong>{"が読めるデータを制御するもので、検索を呼び出したユーザーごとの取得範囲を制御するものではない"}</li>{" "}<li>{"属性の値は"}<strong>{"表記を統一"}</strong>{"する(例: 「人事部」と「HR」を混ぜない)"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock Knowledge Bases メタデータ "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"}</a></p>

<p>{"出典: Bedrock Knowledge Bases データソース設定 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html"}</a></p>

<h3 id="skill-143-大規模でも高速な検索のためのアーキテクチャ" tabIndex={-1}>{"Skill 1.4.3 大規模でも高速な検索のためのアーキテクチャ"}</h3>

<p><strong>{"何をするか"}</strong>{": データ量やリクエスト数が増えても、検索の速度と精度を保つ。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"シャーディング戦略(OpenSearch)"}</td><td>{"インデックスを複数のシャードに分け、並列に検索。シャード数とサイズのバランスが重要"}</td></tr><tr className="even"><td>{"マルチインデックス"}</td><td>{"ドメインごと(例: 法務、製品、人事)にインデックスを分け、検索対象を絞る"}</td></tr><tr className="odd"><td>{"階層インデックス"}</td><td>{"文書レベルで絞ってから、チャンクレベルで検索する二段構え"}</td></tr><tr className="even"><td>{"近似最近傍探索(ANN)"}</td><td>{"HNSW などのアルゴリズムで、厳密さを少し譲って大幅に高速化"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"1 つのシャードを"}<strong>{"大きくしすぎない、小さくしすぎない"}</strong>{"(OpenSearch のガイドでは、検索用途で数十 GiB 程度が目安)"}</li>{" "}<li>{"用途が異なるデータを 1 つのインデックスに"}<strong>{"混ぜない"}</strong>{"(専門ドメインは分ける)"}</li>{" "}<li><strong>{"検索の再現率と速度のトレードオフ"}</strong>{"を、評価データで測って調整する"}</li>{" "}<li>{"負荷に応じて OpenSearch Serverless の自動スケールを活用する"}</li>{" "}</ul></div></div>

<p>{"出典: OpenSearch シャード数の見積もり "}<a href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/bp-sharding.html">{"https://docs.aws.amazon.com/opensearch-service/latest/developerguide/bp-sharding.html"}</a></p>

<p>{"出典: OpenSearch Serverless ベクトル検索コレクション "}<a href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-vector-search.html">{"https://docs.aws.amazon.com/opensearch-service/latest/developerguide/serverless-vector-search.html"}</a></p>

<h3 id="skill-144-既存リソースとの統合コンポーネント" tabIndex={-1}>{"Skill 1.4.4 既存リソースとの統合コンポーネント"}</h3>

<p><strong>{"何をするか"}</strong>{": 社内の文書管理システム、ナレッジベース、Wiki などを、GenAI アプリのデータとして接続する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"接続先"}</th><th scope="col">{"方法"}</th></tr></thead><tbody><tr className="odd"><td>{"S3"}</td><td>{"ナレッジベースのデータソースとして直接指定"}</td></tr><tr className="even"><td>{"Confluence、SharePoint、Salesforce"}</td><td>{"ナレッジベースのコネクタを利用。カスタマーマネージドのナレッジベースでは2026年9月30日以降これらのコネクタを新規作成できない(既存のコネクタは取り込みと検索を引き続き利用可能)。Bedrock Managed Knowledge Base は Confluence、SharePoint、Salesforce のネイティブコネクタを提供する。Salesforce コネクタは文書単位の ACL に対応しないため、クロールした Salesforce のコンテンツはナレッジベースの利用者全員が取得できる(Salesforce 側のレコード権限は引き継がれない)。保護が必要な内容はサーバー側で別途認可を行う"}</td></tr><tr className="odd"><td>{"Web サイト"}</td><td>{"ナレッジベースのウェブクローラーを利用。カスタマーマネージドのナレッジベースでは2026年9月30日以降ウェブクローラーを新規作成できない(既存のクローラーは取り込みと検索を引き続き利用可能)。Bedrock Managed Knowledge Base はウェブクローラーのネイティブコネクタを提供する"}</td></tr><tr className="even"><td>{"独自システム"}</td><td>{"カスタムデータソース、または Lambda での取り込み処理"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"既存のアクセス権限を"}<strong>{"メタデータとして引き継ぎ"}</strong>{"、権限のない人に結果が出ないようにする"}</li>{" "}<li>{"接続の認証情報は "}<strong>{"Secrets Manager"}</strong>{" で管理する"}</li>{" "}<li>{"取り込み対象の範囲(フォルダ、更新範囲)を限定し、不要データによる"}<strong>{"ノイズとコスト増"}</strong>{"を避ける"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock Knowledge Bases データソース "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/data-source-connectors.html"}</a></p>

<h3 id="skill-145-ベクトルストアの鮮度を保つデータ保守" tabIndex={-1}>{"Skill 1.4.5 ベクトルストアの鮮度を保つデータ保守"}</h3>

<p><strong>{"何をするか"}</strong>{": 元データの更新に合わせて、ベクトルストアを常に最新で正確に保つ。"}</p>

<Diagram id="diag-10" label="Skill 1.4.5 ベクトルストアの鮮度を保つデータ保守の図解" />

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"更新方式"}</th><th scope="col">{"内容"}</th><th scope="col">{"向いている場面"}</th></tr></thead><tbody><tr className="odd"><td>{"差分(増分)更新"}</td><td>{"変更分だけを再処理(ナレッジベースの同期は、変更のあった文書のみ処理する)"}</td><td>{"通常の運用"}</td></tr><tr className="even"><td>{"リアルタイム変更検知"}</td><td>{"S3 イベントや変更通知を契機に、即座に同期"}</td><td>{"鮮度が重要な業務"}</td></tr><tr className="odd"><td>{"スケジュール更新"}</td><td>{"EventBridge のスケジュールで定期的に同期"}</td><td>{"日次や週次で十分な場合"}</td></tr><tr className="even"><td>{"直接取り込み API"}</td><td>{"ナレッジベースへ文書を API で直接登録、削除"}</td><td>{"独自システムからの即時反映"}</td></tr><tr className="odd"><td>{"全件再構築"}</td><td>{"埋め込みモデルやチャンク設定を変えたときに実施"}</td><td>{"設計変更時のみ"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li><strong>{"削除や有効期限切れ"}</strong>{"も反映する(古い規程が検索に残る事故を防ぐ)"}</li>{" "}<li>{"更新の成否を"}<strong>{"メトリクスとアラーム"}</strong>{"で監視する"}</li>{" "}<li>{"同期と本番検索が干渉しないよう、"}<strong>{"同期の時間帯や頻度"}</strong>{"を調整する"}</li>{" "}<li>{"更新日時のメタデータを使い、"}<strong>{"古い情報を検索時に除外"}</strong>{"できるようにする"}</li>{" "}</ul></div></div>

<p>{"出典: ナレッジベースのデータソース同期 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/kb-data-source-sync-ingest.html"}</a></p>

<p>{"出典: Amazon EventBridge Scheduler "}<a href="https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html">{"https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html"}</a></p>

<h3 id="task-14-の試験ポイント" tabIndex={-1}>{"Task 1.4 の試験ポイント"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"よく出る場面"}</th><th scope="col">{"選ぶ答えの方向"}</th></tr></thead><tbody><tr className="odd"><td>{"運用負荷を最小にして RAG を構築したい"}</td><td>{"Bedrock Knowledge Bases のマネージド構成"}</td></tr><tr className="even"><td>{"既存の PostgreSQL データと結合して検索したい"}</td><td>{"Aurora と pgvector"}</td></tr><tr className="odd"><td>{"大規模で高度な検索(ハイブリッド、チューニング)が必要"}</td><td>{"OpenSearch Service"}</td></tr><tr className="even"><td>{"文書の更新を自動で検索に反映したい"}</td><td>{"S3 イベントと Lambda で取り込みジョブを起動、または定期同期"}</td></tr><tr className="odd"><td>{"部署別、機密区分別に結果を絞りたい"}</td><td>{"メタデータとフィルター"}</td></tr></tbody></table></div>

<hr />
</div>; }
