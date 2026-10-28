import React from 'react';

export const Sec9_PracticeQuestions: React.FC = () => {
    return (
        <section className="section" id="s9">
            <h2>
                <i className="ti ti-help-circle"></i>8. 練習問題(自作)
            </h2>
            <blockquote>
                <p>以下は学習用に筆者が作成した問題で、実際の試験問題ではありません。</p>
            </blockquote>
            <p>
                <strong>Q1(択一)</strong> ある企業で経営層は生成 AI
                に意欲的だが、データは部署ごとに形式がバラバラで、データの責任者も決まっていない。最も適切な最初の一手は?
            </p>
            <ul>
                <li>A. 全社向けの生成 AI チャットボットを直ちに展開する</li>
                <li>
                    B.
                    データ準備度を評価し、責任者の任命とサイロの解消方針を決めたうえで、小さな検証を進める
                </li>
                <li>C. 最新の高性能モデルを契約する</li>
                <li>D. ML エンジニアを大量に採用する</li>
            </ul>
            <details>
                <summary>答えと解説</summary>
                <p>
                    <strong>B</strong>。データの準備度、オーナーシップ、サイロ解消が AI
                    の土台です(Skill 4.2.1、4.2.2)。A・C・D
                    は土台が整う前の投資で、リスクが高い選択です。
                </p>
            </details>
            <p>
                <strong>Q2(択一)</strong> 生成 AI 成熟度モデルの 4
                つのレベルを、低い順に並べたものは?
            </p>
            <ul>
                <li>A. Envision → Experiment → Launch → Scale</li>
                <li>B. Experiment → Envision → Scale → Launch</li>
                <li>C. Launch → Envision → Experiment → Scale</li>
                <li>D. Envision → Align → Launch → Scale</li>
            </ul>
            <details>
                <summary>答えと解説</summary>
                <p>
                    <strong>A</strong>。D は AWS CAF for AI の変革の旅の段階名(Align
                    を含む)で、ひっかけです(Skill 4.1.2)。
                </p>
            </details>
            <p>
                <strong>Q3(複数選択: 2 つ選ぶ)</strong> 従業員が「AI
                で仕事がなくなる」と不安を抱いている。リーダーの適切な対応はどれか。
            </p>
            <ul>
                <li>A. 導入時期と役割への影響を、早い段階から透明に説明する</li>
                <li>B. 導入直前まで情報を伏せる</li>
                <li>C. 実践的な研修と小さな PoC への参加機会を提供する</li>
                <li>D. 利用を義務化し、使わない場合は評価を下げる</li>
                <li>E. 質問は受け付けない</li>
            </ul>
            <details>
                <summary>答えと解説</summary>
                <p>
                    <strong>A と C</strong>(Skill 4.3.3、4.3.4、4.3.5)。B・D・E
                    は不安と抵抗を強めます。
                </p>
            </details>
            <p>
                <strong>Q4(択一)</strong> PoC
                が成功し、経営層が全社展開を求めている。最も適切な次の対応は?
            </p>
            <ul>
                <li>A. そのまま全社へ展開する</li>
                <li>
                    B.
                    本番の受け入れ基準、運用体制、ガバナンス、監視、コストを整えてから段階的に展開する
                </li>
                <li>C. PoC を追加で 10 件実施する</li>
                <li>D. 展開を無期限に延期する</li>
            </ul>
            <details>
                <summary>答えと解説</summary>
                <p>
                    <strong>B</strong>(Skill 4.4.5)。PoC の成功は本番準備の完了を意味しません。
                </p>
            </details>
            <p><strong>Q5(択一)</strong> AI COE の説明として最も適切なものは?</p>
            <ul>
                <li>A. すべての AI 開発を COE だけが行う</li>
                <li>
                    B.
                    ガイダンスや再利用可能な能力を提供し、事業部門との連携でスケールを支える専任の組織
                </li>
                <li>C. 各部門の AI 活用を禁止する部署</li>
                <li>D. 技術者だけで構成される監査部門</li>
            </ul>
            <details>
                <summary>答えと解説</summary>
                <p>
                    <strong>B</strong>(Skill 4.4.3)。COE は支援・標準化・再利用促進の役割です。
                </p>
            </details>
            <p>
                <strong>Q6(複数選択: 2 つ選ぶ)</strong> AI
                の効果を継続的に追跡するために適切な施策は?
            </p>
            <ul>
                <li>A. 導入前にベースライン指標を測定する</li>
                <li>B. 導入後は技術指標だけを確認する</li>
                <li>C. 技術指標と事業指標の両方を設定する</li>
                <li>D. 導入完了をもって測定を終了する</li>
                <li>E. フィードバックは集めない</li>
            </ul>
            <details>
                <summary>答えと解説</summary>
                <p><strong>A と C</strong>(Skill 4.4.4)。</p>
            </details>
        </section>
    );
};
