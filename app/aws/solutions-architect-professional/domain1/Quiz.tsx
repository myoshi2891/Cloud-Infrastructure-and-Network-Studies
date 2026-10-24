'use client';

import type { ReactNode } from 'react';
import { useState } from 'react';

type QuizItem = {
    num: number;
    id: string;
    answer: string;
    qText: string;
    opts: { opt: string; letter: string; text: string }[];
    strongText: string;
    expAfterStrong: ReactNode;
};

const QUIZ_ITEMS: QuizItem[] = [
    {
        "num": 1,
        "id": "問題-1",
        "answer": "B",
        "qText": "数十の VPC を持つ組織で、今後も VPC が増え続ける。VPC 間とオンプレミスの接続を一元管理したい。最も運用負荷が低い構成はどれか。",
        "opts": [
            {
                "opt": "A",
                "letter": "A",
                "text": "すべての VPC 同士をピアリングで接続する"
            },
            {
                "opt": "B",
                "letter": "B",
                "text": "Transit Gateway を使い、各 VPC と VPN や Direct Connect をアタッチする"
            },
            {
                "opt": "C",
                "letter": "C",
                "text": "各 VPC にインターネットゲートウェイを付け、インターネット経由で通信する"
            },
            {
                "opt": "D",
                "letter": "D",
                "text": "VPC ごとに専用の VPN を作成する"
            }
        ],
        "strongText": "答え: B。",
        "expAfterStrong": "VPC が多数で増加する場合、ピアリングは接続数が急増し、非推移的で管理困難。Transit Gateway でハブ・アンド・スポークにする。"
    },
    {
        "num": 2,
        "id": "問題-2",
        "answer": "B",
        "qText": "オンプレミスのアプリケーションから、インターネットを経由せずに Amazon S3 へアクセスしたい。Direct Connect で接続済みである。どの構成が適切か。",
        "opts": [
            {
                "opt": "A",
                "letter": "A",
                "text": "S3 の Gateway エンドポイントを作成する"
            },
            {
                "opt": "B",
                "letter": "B",
                "text": "S3 の Interface エンドポイント (PrivateLink) を作成し、Direct Connect 経由でアクセスする"
            },
            {
                "opt": "C",
                "letter": "C",
                "text": "NAT Gateway を作成する"
            },
            {
                "opt": "D",
                "letter": "D",
                "text": "VPC ピアリングを作成する"
            }
        ],
        "strongText": "答え: B。",
        "expAfterStrong": "Gateway エンドポイントはオンプレミスからは利用できない。Interface エンドポイントを使う。"
    },
    {
        "num": 3,
        "id": "問題-3",
        "answer": "B",
        "qText": "管理アカウントのセキュリティ担当者が、組織内のすべてのメンバーアカウントで、CloudTrail の停止を禁止したい。最も適切な方法はどれか。",
        "opts": [
            {
                "opt": "A",
                "letter": "A",
                "text": "各アカウントの管理者に IAM ポリシーを設定してもらう"
            },
            {
                "opt": "B",
                "letter": "B",
                "text": "Organizations で、CloudTrail の停止を拒否する SCP を組織ルート (またはメンバーアカウントを含むすべての OU) に適用する"
            },
            {
                "opt": "C",
                "letter": "C",
                "text": "CloudTrail の通知を SNS で受け取る"
            },
            {
                "opt": "D",
                "letter": "D",
                "text": "AWS Config ルールで検出する"
            }
        ],
        "strongText": "答え: B。",
        "expAfterStrong": "予防型の統制として SCP が適切。D は検出であり、停止自体を防げない。"
    },
    {
        "num": 4,
        "id": "問題-4",
        "answer": "B",
        "qText": "RTO が15分、RPO が1分未満で、リージョン障害に備える必要がある。データベースは Amazon Aurora を使用している。コストも考慮したい。適切な構成はどれか。",
        "opts": [
            {
                "opt": "A",
                "letter": "A",
                "text": "日次スナップショットを別リージョンにコピーする"
            },
            {
                "opt": "B",
                "letter": "B",
                "text": "Aurora Global Database を使い、副リージョンにウォームスタンバイ構成を用意する"
            },
            {
                "opt": "C",
                "letter": "C",
                "text": "単一リージョンの Multi-AZ のみとする"
            },
            {
                "opt": "D",
                "letter": "D",
                "text": "オンデマンドで復旧時にインフラを再構築する"
            }
        ],
        "strongText": "答え: B。",
        "expAfterStrong": (
            <>
                リージョン間の継続的レプリケーションで RPO を短く、ウォームスタンバイで RTO を短くできる。ただしレプリケーションは非同期のため、RPO 1分未満は保証値ではなく、レプリケーション遅延に依存する一般的な目標値である (通常の遅延は1秒未満)。上限を明示的に担保したい場合は、Aurora PostgreSQL Global Database の管理対象 RPO (<code>rds.global_db_rpo</code> パラメータ、秒単位) で許容遅延の上限を設定し (すべてのセカンダリクラスターの遅延が目標値を超えると、いずれかが目標値内に戻るまでプライマリでのコミットがブロックされる)、遅延と CloudWatch の <code>AuroraGlobalDBRPOLag</code> を監視する。A と D は RTO と RPO を満たせない。C はリージョン障害に備えられない。
            </>
        )
    },
    {
        "num": 5,
        "id": "問題-5",
        "answer": "A",
        "qText": "事業部門ごとにコストを把握したい。タグを付けているが、Cost Explorer でタグ別の集計が表示されない。原因として最も可能性が高いものはどれか。",
        "opts": [
            {
                "opt": "A",
                "letter": "A",
                "text": "コスト配分タグを有効化していない"
            },
            {
                "opt": "B",
                "letter": "B",
                "text": "タグポリシーを作成していない"
            },
            {
                "opt": "C",
                "letter": "C",
                "text": "Savings Plans を購入していない"
            },
            {
                "opt": "D",
                "letter": "D",
                "text": "Compute Optimizer を有効にしていない"
            }
        ],
        "strongText": "答え: A。",
        "expAfterStrong": "タグを付けただけではコスト管理には反映されず、請求コンソールでコスト配分タグを有効化する必要がある。"
    },
    {
        "num": 6,
        "id": "問題-6",
        "answer": "B",
        "qText": "多数の従業員が、既存の外部 ID プロバイダーでサインインして、複数の AWS アカウントを利用する。IAM ユーザーは作成したくない。最も適切な方法はどれか。",
        "opts": [
            {
                "opt": "A",
                "letter": "A",
                "text": "アカウントごとに IAM ユーザーを作成する"
            },
            {
                "opt": "B",
                "letter": "B",
                "text": "IAM Identity Center と外部 IdP を連携し、権限セットを割り当てる"
            },
            {
                "opt": "C",
                "letter": "C",
                "text": "Amazon Cognito のユーザープールを使う"
            },
            {
                "opt": "D",
                "letter": "D",
                "text": "アクセスキーを共有する"
            }
        ],
        "strongText": "答え: B。",
        "expAfterStrong": "従業員のマルチアカウントのシングルサインオンは IAM Identity Center が標準。Cognito は顧客向けアプリの認証が主目的。"
    }
];

/**
 * SAP-C02 Domain 1 の確認シナリオ（答え付き）クイズコンポーネント。
 * 選択肢クリック・キーボード操作による正誤判定、解説自動開閉、スコア集計、リセットを提供。
 */
export default function Quiz() {
    const [selected, setSelected] = useState<Record<number, string>>({});
    const [openDetails, setOpenDetails] = useState<Record<number, boolean>>({});

    const handleSelect = (qNum: number, optLetter: string) => {
        if (selected[qNum]) return; // 回答後は変更不可
        setSelected((prev) => ({ ...prev, [qNum]: optLetter }));
        setOpenDetails((prev) => ({ ...prev, [qNum]: true }));
    };

    const handleReset = () => {
        setSelected({});
        setOpenDetails({});
    };

    const answeredCount = Object.keys(selected).length;
    const correctCount = QUIZ_ITEMS.filter((item) => selected[item.num] === item.answer).length;

    return (
        <div className="quiz-container">
            <div className="quiz-score">
                <span id="quizStat">
                    回答 {answeredCount} / {QUIZ_ITEMS.length} ・ 正解 {correctCount}
                </span>
                <button type="button" id="quizReset" onClick={handleReset}>
                    やり直す
                </button>
            </div>

            {QUIZ_ITEMS.map((item) => {
                const userChoice = selected[item.num];
                const isAnswered = Boolean(userChoice);
                const isDetailsOpen = Boolean(openDetails[item.num]);

                return (
                    <div key={item.id} className="quiz-block">
                        <h3 id={item.id} tabIndex={-1}>問題 {item.num}</h3>
                        <div
                            className={`quiz-card ${isAnswered ? "answered" : ""}`}
                            data-answer={item.answer}
                        >
                            <p className="quiz-q">{item.qText}</p>
                            <ul className="quiz-options">
                                {item.opts.map((opt) => {
                                    let optClass = "quiz-opt";
                                    if (isAnswered) {
                                        if (opt.opt === item.answer) {
                                            optClass += " correct";
                                        } else if (opt.opt === userChoice) {
                                            optClass += " incorrect";
                                        }
                                    }

                                    return (
                                        <li
                                            key={opt.opt}
                                            className={optClass}
                                            data-opt={opt.opt}
                                            role="button"
                                            tabIndex={0}
                                            onClick={() => handleSelect(item.num, opt.opt)}
                                            onKeyDown={(e) => {
                                                if (e.key === "Enter" || e.key === " ") {
                                                    e.preventDefault();
                                                    handleSelect(item.num, opt.opt);
                                                }
                                            }}
                                        >
                                            <span className="quiz-letter">{opt.letter}</span>
                                            <span className="quiz-text">{opt.text}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                            <details
                                className="quiz-answer"
                                open={isDetailsOpen}
                                onToggle={(e) => {
                                    const isOpen = (e.currentTarget as HTMLDetailsElement).open;
                                    setOpenDetails((prev) => ({ ...prev, [item.num]: isOpen }));
                                }}
                            >
                                <summary>答えを見る</summary>
                                <div className="quiz-answer-body">
                                    <p>
                                        <strong>{item.strongText}</strong>
                                        {item.expAfterStrong}
                                    </p>
                                </div>
                            </details>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
