import { Diagram } from '../Diagram';
/** 原本のtask15区分を全文保持する。 */
export default function Task15() { return <div className="guide-part" data-part="task15"><h2 id="7-task-15-fm-拡張のための検索メカニズム" tabIndex={-1}>{"7. Task 1.5 FM 拡張のための検索メカニズム"}</h2>

<p><strong>{"Task の目的"}</strong>{": RAG の「検索」部分の精度を上げる。分割、埋め込み、検索方式、再ランク、クエリ改善、FM との接続の 6 要素を押さえます。"}</p>

<h3 id="高精度-rag-パイプライン" tabIndex={-1}>{"高精度 RAG パイプライン"}</h3>

<Diagram id="diag-11" label="高精度 RAG パイプラインの図解" />

<h3 id="skill-151-文書の分割チャンキング" tabIndex={-1}>{"Skill 1.5.1 文書の分割(チャンキング)"}</h3>

<p><strong>{"何をするか"}</strong>{": 長い文書を、検索しやすく FM に渡しやすい大きさに切り分ける。"}</p>

<p><strong>{"なぜ重要か"}</strong>{": チャンクが"}<strong>{"大きすぎる"}</strong>{"と無関係な内容が混ざって検索精度が下がり、"}<strong>{"小さすぎる"}</strong>{"と文脈が欠けて意味が通らなくなります。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"内容"}</th><th scope="col">{"向いている場面"}</th><th scope="col">{"注意点"}</th></tr></thead><tbody><tr className="odd"><td>{"固定サイズ"}</td><td>{"指定したトークン数で機械的に分割。前後を重ねる(オーバーラップ)設定も可"}</td><td>{"構造が単純で均質な文書"}</td><td>{"文の途中で切れることがある"}</td></tr><tr className="even"><td>{"デフォルト"}</td><td>{"約 300 トークンずつに分割"}</td><td>{"まず試す標準設定"}</td><td>{"文書構造は考慮しない"}</td></tr><tr className="odd"><td>{"階層(Hierarchical)"}</td><td>{"親チャンクと子チャンクの 2 階層。子で検索し、必要に応じて親を渡す"}</td><td>{"章立てのある長い文書、規程、マニュアル"}</td><td>{"S3 のベクトルバケットをストアにする場合は非推奨"}</td></tr><tr className="even"><td>{"セマンティック"}</td><td>{"意味のまとまりで分割。内部で FM を使う"}</td><td>{"話題が連続的に変わる文書"}</td><td>{"FM の利用分の追加コストがかかる"}</td></tr><tr className="odd"><td>{"チャンクなし"}</td><td>{"文書をそのまま 1 つとして扱う"}</td><td>{"事前に分割済みの短い文書"}</td><td>{"ページ番号の引用などが使えなくなる"}</td></tr><tr className="even"><td>{"カスタム(Lambda)"}</td><td>{"独自ロジックで分割"}</td><td>{"業務固有の構造(条文、表、FAQ)"}</td><td>{"実装と保守の負担"}</td></tr></tbody></table></div>

<Diagram id="diag-12" label="Skill 1.5.1 文書の分割(チャンキング)の図解" />

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"分割後は"}<strong>{"検索結果を実際に確認"}</strong>{"する(文脈が欠けていないか)"}</li>{" "}<li>{"オーバーラップは"}<strong>{"文脈の途切れ"}</strong>{"を補うために使う(多すぎるとコストと重複が増える)"}</li>{" "}<li>{"複雑な表や図を含む文書は、"}<strong>{"FM を使ったパース(解析)"}</strong>{"を先に行い、そのうえで階層チャンキングを組み合わせると精度が上がりやすい"}</li>{" "}<li>{"チャンク設定を変えたら、"}<strong>{"必ず再取り込みと再評価"}</strong>{"を行う"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock Knowledge Bases チャンキング "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking.html"}</a></p>

<p>{"出典: 検索精度の改善(AWS re:Post ナレッジセンター) "}<a href="https://repost.aws/knowledge-center/bedrock-knowledge-bases-accurate-results-filters">{"https://repost.aws/knowledge-center/bedrock-knowledge-bases-accurate-results-filters"}</a></p>

<h3 id="skill-152-埋め込みモデルの選択と構成" tabIndex={-1}>{"Skill 1.5.2 埋め込みモデルの選択と構成"}</h3>

<p><strong>{"何をするか"}</strong>{": 検索の質とコストを左右する埋め込みモデルを、次元数とドメイン適合性で選ぶ。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"選定の観点"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"次元数"}</td><td>{"次元数が大きいほど表現力が高いが、保存容量と検索コストが増える。Titan Text Embeddings V2 は 256、512、1024 次元から選べる"}</td></tr><tr className="even"><td>{"言語対応"}</td><td>{"日本語を含む多言語に対応しているか"}</td></tr><tr className="odd"><td>{"入力上限"}</td><td>{"1 回で埋め込める最大トークン数(チャンクサイズと整合させる)"}</td></tr><tr className="even"><td>{"モダリティ"}</td><td>{"テキストのみか、画像も扱うか(マルチモーダル埋め込み)"}</td></tr><tr className="odd"><td>{"ドメイン適合"}</td><td>{"専門用語の多い領域で精度が出るか(実データで評価)"}</td></tr></tbody></table></div>

<p><strong>{"大量データのバッチ処理"}</strong>{": Lambda で文書をまとめて埋め込み生成する場合は、"}<strong>{"並列度の制御"}</strong>{"と"}<strong>{"スロットリング対策のリトライ"}</strong>{"を組み込みます。"}</p>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"候補モデルを"}<strong>{"自社データの評価セット"}</strong>{"で比較する(一般ベンチマークだけで決めない)"}</li>{" "}<li>{"取り込み時と検索時で、"}<strong>{"必ず同じ埋め込みモデル"}</strong>{"を使う"}</li>{" "}<li>{"次元数は、精度と容量のバランスで決める("}<strong>{"小さい次元でも十分なことが多い"}</strong>{"ため、評価で確認)"}</li>{" "}<li>{"モデル変更は全データの再埋め込みを伴うため、"}<strong>{"変更計画を立てて"}</strong>{"から実施する"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock 埋め込みモデル "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/titan-embedding-models.html"}</a></p>

<p>{"出典: Bedrock Embeddings の考え方 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/embeddings.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/embeddings.html"}</a></p>

<h3 id="skill-153-ベクトル検索ソリューションの構成" tabIndex={-1}>{"Skill 1.5.3 ベクトル検索ソリューションの構成"}</h3>

<p><strong>{"何をするか"}</strong>{": 実際にベクトル検索を動かす基盤を構成する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"基盤"}</th><th scope="col">{"構成のポイント"}</th></tr></thead><tbody><tr className="odd"><td>{"OpenSearch Service"}</td><td>{"k-NN インデックスを作成し、ベクトル用フィールドに次元数と距離の指標、ANN アルゴリズムを設定"}</td></tr><tr className="even"><td>{"Aurora PostgreSQL と pgvector"}</td><td>{"pgvector 拡張を有効化し、ベクトル列と HNSW などのインデックスを作成"}</td></tr><tr className="odd"><td>{"Bedrock Knowledge Bases"}</td><td>{"ベクトルストアをマネージドで構成。分割、埋め込み、保存を任せられる"}</td></tr></tbody></table></div>

<p><strong>{"距離の指標(類似度の測り方)"}</strong></p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"指標"}</th><th scope="col">{"意味"}</th></tr></thead><tbody><tr className="odd"><td>{"コサイン類似度"}</td><td>{"ベクトルの向きの近さ。テキスト検索で一般的"}</td></tr><tr className="even"><td>{"ユークリッド距離"}</td><td>{"ベクトル間の直線距離"}</td></tr><tr className="odd"><td>{"内積"}</td><td>{"向きと大きさの両方を反映。正規化済みベクトルではコサインと同等の順位になる"}</td></tr></tbody></table></div>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"埋め込みモデルが推奨する距離の指標に"}<strong>{"合わせる"}</strong></li>{" "}<li>{"インデックスの作成パラメータ(HNSW の接続数など)は、"}<strong>{"再現率、速度、メモリ"}</strong>{"のトレードオフ。評価で決める"}</li>{" "}<li>{"本番前に"}<strong>{"負荷試験"}</strong>{"で、検索遅延とスケール特性を確認する"}</li>{" "}</ul></div></div>

<p>{"出典: OpenSearch k-NN "}<a href="https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html">{"https://docs.aws.amazon.com/opensearch-service/latest/developerguide/knn.html"}</a></p>

<p>{"出典: Aurora PostgreSQL pgvector "}<a href="https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html">{"https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html"}</a></p>

<h3 id="skill-154-関連性を高める高度な検索アーキテクチャ" tabIndex={-1}>{"Skill 1.5.4 関連性を高める高度な検索アーキテクチャ"}</h3>

<p><strong>{"何をするか"}</strong>{": ベクトル検索だけに頼らず、キーワード検索や再ランクを組み合わせて関連性を上げる。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th><th scope="col">{"強み"}</th></tr></thead><tbody><tr className="odd"><td>{"セマンティック検索"}</td><td>{"意味の近さで検索"}</td><td>{"言い換えや同義語に強い"}</td></tr><tr className="even"><td>{"キーワード検索"}</td><td>{"語句の一致で検索"}</td><td>{"型番、固有名詞、略語に強い"}</td></tr><tr className="odd"><td><strong>{"ハイブリッド検索"}</strong></td><td>{"両者を組み合わせる"}</td><td>{"両方の弱点を補う"}</td></tr><tr className="even"><td><strong>{"リランカー"}</strong></td><td>{"取得した候補を、質問との関連度で並べ直す専用モデル"}</td><td>{"上位の精度を引き上げる"}</td></tr></tbody></table></div>

<Diagram id="diag-13" label="Skill 1.5.4 関連性を高める高度な検索アーキテクチャの図解" />

<p><strong>{"Bedrock Knowledge Bases での使い方"}</strong></p>

<ul>{" "}<li>{"検索時の設定でハイブリッド検索を指定できる(対応するベクトルストアで利用可能)"}</li>{" "}<li>{"検索設定に "}<strong>{"リランキングモデル"}</strong>{"を指定でき、既定のランカーの代わりに使える"}</li>{" "}<li>{"取得する件数は、既定で最大 5 件。"}<strong>{"取得件数を増やして"}</strong>{"から、リランカーで絞る、という使い方が有効"}</li>{" "}</ul>

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"型番や略語が多いデータは、"}<strong>{"ハイブリッド検索"}</strong>{"を最初の選択肢にする"}</li>{" "}<li>{"「広く取って(多めに取得)、リランカーで絞る」の二段構えが定石"}</li>{" "}<li>{"再ランクは"}<strong>{"遅延とコストが増える"}</strong>{"ため、効果を評価して採用する"}</li>{" "}</ul></div></div>

<p>{"出典: ナレッジベースのクエリと取得 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-retrieve.html"}</a></p>

<p>{"出典: Bedrock リランクモデル "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/rerank.html"}</a></p>

<p>{"出典: ハイブリッド検索の発表(AWS Machine Learning Blog) "}<a href="https://aws.amazon.com/blogs/machine-learning/knowledge-bases-for-amazon-bedrock-now-supports-hybrid-search/">{"https://aws.amazon.com/blogs/machine-learning/knowledge-bases-for-amazon-bedrock-now-supports-hybrid-search/"}</a></p>

<h3 id="skill-155-クエリ処理の高度化" tabIndex={-1}>{"Skill 1.5.5 クエリ処理の高度化"}</h3>

<p><strong>{"何をするか"}</strong>{": ユーザーの質問そのものを改善して、検索で見つかりやすくする。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"手法"}</th><th scope="col">{"内容"}</th><th scope="col">{"実装例"}</th></tr></thead><tbody><tr className="odd"><td>{"クエリ拡張"}</td><td>{"同義語や関連語を補い、検索の取りこぼしを減らす"}</td><td>{"Bedrock の FM に拡張案を生成させる"}</td></tr><tr className="even"><td>{"クエリ分解"}</td><td>{"複合的な質問を、複数の単純な質問に分けて個別に検索"}</td><td>{"Lambda で分解、またはナレッジベースのクエリ分解機能"}</td></tr><tr className="odd"><td>{"クエリ変換"}</td><td>{"口語を検索向けの表現に書き換える、会話の文脈を補う"}</td><td>{"Step Functions で変換と検索を順番に実行"}</td></tr></tbody></table></div>

<p><strong>{"例"}</strong>{": 「A 製品と B 製品の保証期間の違いは?」を、「A 製品の保証期間」と「B 製品の保証期間」の 2 つに分解して検索し、結果を合わせて回答する。"}</p>

<Diagram id="diag-14" label="Skill 1.5.5 クエリ処理の高度化の図解" />

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"クエリ分解は"}<strong>{"検索回数と遅延が増える"}</strong>{"(複雑な質問にだけ適用する)"}</li>{" "}<li>{"会話型では、"}<strong>{"直前の文脈を補った質問"}</strong>{"に書き換えてから検索する(「それは?」のような指示語対策)"}</li>{" "}<li>{"変換前後のクエリを"}<strong>{"ログに残し"}</strong>{"、改善の材料にする。ただし PII やシークレットは"}<strong>{"記録前に削除・マスク"}</strong>{"し、必要最小限の内容だけを残す。ログには"}<strong>{"アクセス権限と保持期間"}</strong>{"を設定する"}</li>{" "}</ul></div></div>

<p>{"出典: ナレッジベースのクエリと応答生成の設定 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/kb-test-config.html"}</a></p>

<h3 id="skill-156-fm-と検索をつなぐ一貫したアクセス手段" tabIndex={-1}>{"Skill 1.5.6 FM と検索をつなぐ一貫したアクセス手段"}</h3>

<p><strong>{"何をするか"}</strong>{": FM が必要なときに検索を呼べるよう、標準化されたインターフェースを用意する。"}</p>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"方式"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className="odd"><td>{"関数呼び出し(ツール利用)"}</td><td>{"検索機能を「ツール」として FM に定義し、FM が必要と判断したときに呼ばせる"}</td></tr><tr className="even"><td>{"MCP(Model Context Protocol)"}</td><td>{"AI アプリと外部ツール、データをつなぐ標準プロトコル。MCP クライアントからベクトル検索を呼び出せる"}</td></tr><tr className="odd"><td>{"標準化した API パターン"}</td><td>{"検索用の API を共通の仕様で提供し、複数のアプリから再利用"}</td></tr></tbody></table></div>

<Diagram id="diag-15" label="Skill 1.5.6 FM と検索をつなぐ一貫したアクセス手段の図解" />

<div className="callout-practice"><div className="icon">{"✓"}</div><div className="body"><div className="label">{"ベストプラクティス"}</div><ul>{" "}<li>{"ツールの"}<strong>{"名前、説明、引数の定義を明確"}</strong>{"にする(FM はそれを読んで使うかを判断する)"}</li>{" "}<li>{"検索ツールにも"}<strong>{"アクセス制御"}</strong>{"(誰のどのデータか)を必ず適用する"}</li>{" "}<li>{"呼び出しの入出力を"}<strong>{"ログに残して"}</strong>{"、監査と改善に使う。PII やシークレットを含むペイロードは"}<strong>{"最小化またはマスク"}</strong>{"してから記録し、ログの"}<strong>{"閲覧権限と保持期間"}</strong>{"を制御する"}</li>{" "}<li>{"検索ツールの返却量を"}<strong>{"制限"}</strong>{"して、トークンの浪費を防ぐ"}</li>{" "}</ul></div></div>

<p>{"出典: Bedrock ツール利用 "}<a href="https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html">{"https://docs.aws.amazon.com/bedrock/latest/userguide/tool-use.html"}</a></p>

<p>{"出典: Model Context Protocol 公式サイト "}<a href="https://modelcontextprotocol.io/">{"https://modelcontextprotocol.io/"}</a></p>

<p>{"出典: AWS MCP サーバー(awslabs) "}<a href="https://github.com/awslabs/mcp">{"https://github.com/awslabs/mcp"}</a></p>

<h3 id="task-15-の試験ポイント" tabIndex={-1}>{"Task 1.5 の試験ポイント"}</h3>

<div className="table-scroll" tabIndex={0}><table><thead><tr className="header"><th scope="col">{"よく出る場面"}</th><th scope="col">{"選ぶ答えの方向"}</th></tr></thead><tbody><tr className="odd"><td>{"章立てのある長い規程文書で、検索精度と文脈を両立したい"}</td><td>{"階層チャンキング"}</td></tr><tr className="even"><td>{"型番や略語の検索漏れが多い"}</td><td>{"ハイブリッド検索"}</td></tr><tr className="odd"><td>{"取得結果の上位の精度をさらに上げたい"}</td><td>{"リランカー"}</td></tr><tr className="even"><td>{"複数の論点を含む質問に答えたい"}</td><td>{"クエリ分解"}</td></tr><tr className="odd"><td>{"FM が自分で判断して検索を呼ぶようにしたい"}</td><td>{"関数呼び出し、または MCP"}</td></tr><tr className="even"><td>{"埋め込みの容量を節約したい"}</td><td>{"次元数の小さい設定を評価して選ぶ"}</td></tr></tbody></table></div>

<hr />
</div>; }
