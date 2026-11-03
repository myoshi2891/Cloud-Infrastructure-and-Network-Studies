/** 問題ごとに答えを開いて復習できる練習問題。 */
export default function PracticeQuestions() {
    return (
        <section className="practice-quiz" aria-labelledby="63-練習問題-10-問">
            <div className="quiz-intro">
                <span className="quiz-eyebrow">理解度チェック · 全 10 問</span>
                <h3 id="63-練習問題-10-問" tabIndex={-1}>6.3 練習問題 (10 問)</h3>
                <p>答えは各問の直後に書いてあります。まず自分で考えてから確認してください。</p>
                <span className="quiz-instruction">「答え・解説を確認」を開いて復習しましょう。</span>
            </div>
            <div className="quiz-questions">
                <article className="quiz-card" aria-labelledby="quiz-question-1">
                    <span className="quiz-topic">証拠保全</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-1" className="quiz-question"><strong className="quiz-number">Q1 (並べ替え)</strong>{" 侵害された疑いのある EC2\n                    インスタンスから、証拠を最大限保全するための正しい順序を選べ。 "}
                            <span className="quiz-options" role="group" aria-label="並べ替える操作">
                                <span><span>(a)</span>{" セキュリティグループで隔離する "}</span>
                                <span><span>(b)</span>{" メモリイメージを取得する "}</span>
                                <span><span>(c)</span>{" EBS スナップショットを取得する "}</span>
                                <span><span>(d)</span>{" 終了保護とタグを設定する "}</span>
                            </span>
                        </p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q1）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q1）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li><strong>{"答え"}</strong>{": (d) → (c) → (b) → (a)"}</li>{"\n                    "}<li>{"\n                        解説:\n                        保護とタグ、ディスク、メモリの順に取得し、メモリを失わないよう隔離はその後に行う。\n                    "}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-2">
                    <span className="quiz-topic">接続の封じ込め</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-2" className="quiz-question"><strong className="quiz-number">Q2</strong>{" 侵害された EC2\n                    に隔離用セキュリティグループを付与した。しかし攻撃者の既存の SSH\n                    セッションが続いている。原因は?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q2）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q2）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li>{"\n                        "}<strong>{"答え"}</strong>{":\n                        セキュリティグループは"}<strong>{"接続追跡"}</strong>{"しており、変更しても既存の追跡済み接続は切断されない。\n                    "}</li>{"\n                    "}<li>{"解説: 既存接続を切るには NACL による拒否などを併用する。"}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-3">
                    <span className="quiz-topic">認証情報の漏えい</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-3" className="quiz-question"><strong className="quiz-number">Q3</strong>{" 漏えいした IAM ユーザーのアクセスキーで、攻撃者が STS\n                    の一時認証情報を作成した。最も適切な封じ込めは?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q3）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q3）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li>{"\n                        "}<strong>{"答え"}</strong>{": キーを無効化し、IAM\n                        ユーザーにトークンの発行時刻より前の一時認証情報を拒否するインラインポリシーを付与する\n                        (またはユーザーを削除する)。\n                    "}</li>{"\n                    "}<li>{"解説: IAM ユーザーの一時認証情報はコンソールから直接失効できない。"}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-4">
                    <span className="quiz-topic">運用管理</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-4" className="quiz-question"><strong className="quiz-number">Q4</strong>{" Systems Manager Incident Manager\n                    を新規に使えない組織が、運用上の問題を集約し Automation\n                    ランブックで調査・解決したい。使うべきサービスは?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q4）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q4）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li><strong>{"答え"}</strong>{": Systems Manager OpsCenter。"}</li>{"\n                    "}<li>{"\n                        解説: Incident Manager は 2025 年 11 月 7\n                        日以降、新規顧客に非提供。OpsCenter が推奨される。\n                    "}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-5">
                    <span className="quiz-topic">実験の安全性</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-5" className="quiz-question"><strong className="quiz-number">Q5</strong>{" FIS\n                    で実験中にアプリケーションの性能が許容できないほど悪化したら、実験を自動で止めたい。どうする?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q5）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q5）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li>{"\n                        "}<strong>{"答え"}</strong>{": 定常状態を基に CloudWatch\n                        アラームを作成し、"}<strong>{"停止条件"}</strong>{"として実験テンプレートに設定する。\n                    "}</li>{"\n                    "}<li>{"解説: 停止した実験は再開できない。"}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-6">
                    <span className="quiz-topic">検出結果の調査</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-6" className="quiz-question"><strong className="quiz-number">Q6</strong>{" GuardDuty の複数の検出結果が、同じ IAM ロールと IP\n                    を共有している。これらをまとめて調査し根本原因を探したい。使うべきは?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q6）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q6）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li><strong>{"答え"}</strong>{": Amazon Detective の検出結果グループ。"}</li>{"\n                    "}<li>{"\n                        解説: Detective は関連する検出結果とエンティティをグラフ分析でまとめる。\n                    "}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-7">
                    <span className="quiz-topic">DDoS 対応</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-7" className="quiz-question"><strong className="quiz-number">Q7</strong>{" ある企業が Shield Advanced を購読し、DDoS 発生時に AWS\n                    の専門チームに緩和を依頼したい。購読以外に必要な事前準備は?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q7）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q7）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li>{"\n                        "}<strong>{"答え"}</strong>{": Business または Enterprise\n                        サポートプランへの加入と、SRT にアクセスを許可する IAM\n                        ロールの関連付け。プロアクティブエンゲージメントを使うなら連絡先の登録も行う。\n                    "}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-8">
                    <span className="quiz-topic">自動修復</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-8" className="quiz-question"><strong className="quiz-number">Q8</strong>{" Security Hub の重大度の高い検出結果に対して、自動で Lambda\n                    を実行し EC2 を隔離したい。最も適切な構成は?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q8）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q8）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li>{"\n                        "}<strong>{"答え"}</strong>{": Security Hub の検出結果を EventBridge\n                        ルールで受け、Lambda を起動する。\n                    "}</li>{"\n                    "}<li>{"\n                        解説: 検出結果のフィールド更新・抑制だけなら Security Hub\n                        の自動化ルールだが、外部アクションは EventBridge。\n                    "}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-9">
                    <span className="quiz-topic">ログの整合性</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-9" className="quiz-question"><strong className="quiz-number">Q9</strong>{" 調査担当が、CloudTrail\n                    のログが保存後に変更されていないことを証明したい。事前に何を有効にし、事後に何を実行する?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q9）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q9）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li>{"\n                        "}<strong>{"答え"}</strong>{": 事前にログファイル整合性検証を有効化\n                        (ダイジェストファイルの配信)。事後に\n                        "}<code>{"aws cloudtrail validate-logs"}</code>{" などで検証を実行する。\n                    "}</li>{"\n                    "}<li>{"解説: 有効化だけでは検証されない。"}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
                <article className="quiz-card" aria-labelledby="quiz-question-10">
                    <span className="quiz-topic">可用性の復旧</span>
                    <div className="quiz-card-body">
                        <p id="quiz-question-10" className="quiz-question"><strong className="quiz-number">Q10</strong>{" ある AZ に障害が発生した。マルチ AZ\n                    構成のアプリケーションのトラフィックを、一時的に正常な AZ\n                    に逃がしたい。使う機能は?\n                "}</p>
                    </div>
                    <details className="quiz-answer">
                        <summary>
                            <span className="quiz-answer-closed">答え・解説を確認<span className="sr-only">（Q10）</span></span>
                            <span className="quiz-answer-open">答え・解説を閉じる<span className="sr-only">（Q10）</span></span>
                            <span className="quiz-answer-icon" aria-hidden="true" />
                        </summary>
                        <div className="quiz-answer-content">
                            <ul>{"\n                    "}<li>{"\n                        "}<strong>{"答え"}</strong>{": ARC のゾーンシフト (自動で AWS\n                        に任せるならゾーンオートシフト)。\n                    "}</li>{"\n                    "}<li>{"\n                        解説: リージョン間のフェイルオーバーはルーティングコントロール (または\n                        Region switch)。\n                    "}</li>{"\n                "}</ul>
                        </div>
                    </details>
                </article>
            </div>
        </section>
    );
}
