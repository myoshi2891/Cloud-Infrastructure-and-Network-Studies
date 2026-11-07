import { Diagram } from '../Diagram';
/** 原本の herointro セクション本文。 */
export default function HeroIntro() {
    return (<section className="guide-part" data-part="herointro">
    {"\n                "}
    <div className={"hero"}>{"\n                    "}<div className={"kicker"}>{"\n                        AWS Certified Security - Specialty (SCS-C03) · Domain 5\n                    "}</div>{"\n                    "}<h1>{"\n                        AWS Certified Security - Specialty (SCS-C03) Content Domain 5: Data\n                        Protection 完全ガイド(初学者向け・ステップバイステップ)\n                    "}</h1>{"\n                    "}<div className={"meta-row"}>{"\n                        "}<span className={"pill"}>{"配点 "}<strong>{"18%"}</strong></span>{"\n                        "}<span className={"pill"}>{"対象 "}<strong>{"初学者向け"}</strong></span>{"\n                        "}<span className={"pill"}>{"図解 "}<strong>{"Mermaid 15点"}</strong></span>{"\n                        "}<span className={"pill"}>{"参考文献 "}<strong>{"57件"}</strong></span>{"\n                    "}</div>{"\n                "}</div>
    {"\n\n                "}
    <blockquote>{"\n                    "}<p>{"\n                        対象試験: AWS Certified Security - Specialty (SCS-C03)"}<br />{"対象ドメイン:\n                        "}<strong>{"Content Domain 5: Data Protection(出題比率 18%)"}</strong><br />{"作成日: 2026-10-22"}<br />{"想定読者: AWS\n                        のセキュリティを初めて体系的に学ぶ方(インフラ・開発の基礎知識があればOK)\n                    "}</p>{"\n                "}</blockquote>
    {"\n\n                "}
    <h2 id={"1-この文書の使い方と試験の全体像"} tabIndex={-1}>{"1. この文書の使い方と試験の全体像"}</h2>
    {"\n                "}
    <h3 id={"11-試験情報公式ガイドより"} tabIndex={-1}>{"1.1 試験情報(公式ガイドより)"}</h3>
    {"\n                "}
    <div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 1：1.1 試験情報(公式ガイドより)"}>{"\n                    "}<table><thead><tr className={"header"}><th scope="col">{"項目"}</th><th scope="col">{"内容"}</th></tr></thead><tbody><tr className={"odd"}><td>{"試験名"}</td><td>{"AWS Certified Security - Specialty (SCS-C03)"}</td></tr><tr className={"even"}><td>{"想定受験者"}</td><td>{"クラウドセキュリティ実務 3〜5年相当"}</td></tr><tr className={"odd"}><td>{"問題数"}</td><td>{"採点対象 50問 + 採点対象外 15問(見分けはつかない)"}</td></tr><tr className={"even"}><td>{"合格点"}</td><td>{"スケールスコア 100〜1,000 のうち "}<strong>{"750 以上"}</strong></td></tr><tr className={"odd"}><td>{"採点方式"}</td><td>{"\n                                    補償型(各ドメインで合格点を取る必要はなく、全体で合格すればよい)\n                                "}</td></tr><tr className={"even"}><td>{"出題形式"}</td><td>{"択一、複数選択、並べ替え(Ordering)、マッチング"}</td></tr><tr className={"odd"}><td>{"Domain 5 の配点"}</td><td><strong>{"18%"}</strong>{"(Domain 4 の 20% に次いで大きい)"}</td></tr></tbody></table>{"\n                "}</div>
    {"\n                "}
    <blockquote>{"\n                    "}<p>{"\n                        根拠:\n                        "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03.html"}>{"Exam Guide (SCS-C03)"}</a>{"\n                    "}</p>{"\n                "}</blockquote>
    {"\n                "}
    <h3 id={"12-domain-5-の構造"} tabIndex={-1}>{"1.2 Domain 5 の構造"}</h3>
    {"\n                "}
    <p>{"\n                    Domain 5 は\n                    "}<strong>{"3つの Task と 12個の Skill"}</strong>{"\n                    で構成されています。この文書もこの順番で解説します。\n                "}</p>
    {"\n                "}
    <div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 2：1.2 Domain 5 の構造"}>{"\n                    "}<table><thead><tr className={"header"}><th scope="col">{"Task"}</th><th scope="col">{"内容"}</th><th scope="col">{"Skill 数"}</th></tr></thead><tbody><tr className={"odd"}><td><strong>{"5.1"}</strong></td><td>{"転送中のデータの制御を設計・実装する"}</td><td>{"3"}</td></tr><tr className={"even"}><td><strong>{"5.2"}</strong></td><td>{"保存中のデータの制御を設計・実装する"}</td><td>{"4"}</td></tr><tr className={"odd"}><td><strong>{"5.3"}</strong></td><td>{"機密データ・認証情報・シークレット・暗号鍵を保護する"}</td><td>{"5"}</td></tr></tbody></table>{"\n                "}</div>
    {"\n                "}
    <blockquote>{"\n                    "}<p>{"\n                        根拠:\n                        "}<a href={"https://docs.aws.amazon.com/aws-certification/latest/security-specialty-03/security-specialty-03-domain5.html"}>{"Content Domain 5: Data Protection"}</a>{"\n                    "}</p>{"\n                "}</blockquote>
    {"\n                "}
    <h3 id={"13-学習の進め方おすすめ"} tabIndex={-1}>{"1.3 学習の進め方(おすすめ)"}</h3>
    {"\n                "}
    <ol>{"\n                    "}<li>{"まず「2. 基礎知識」で用語を押さえる(ここを飛ばすと後半で必ず詰まります)"}</li>{"\n                    "}<li>{"\n                        Task 5.1 → 5.2 → 5.3 の順に読む。各 Skill は次の型で書いてあります\n                        "}<ul>{"\n                            "}<li>{"\n                                "}<strong>{"ひとことで言うと"}</strong>{" → "}<strong>{"なぜ必要か"}</strong>{" →\n                                "}<strong>{"仕組み"}</strong>{" → "}<strong>{"設定手順"}</strong>{" →\n                                "}<strong>{"ベストプラクティス"}</strong>{" →\n                                "}<strong>{"試験のポイント"}</strong>{"\n                            "}</li>{"\n                        "}</ul>{"\n                    "}</li>{"\n                    "}<li>{"各章末の「試験のポイント」を、自分の言葉で説明できるか確認する"}</li>{"\n                    "}<li>{"最後に「7. 理解度チェック」で腕試しする"}</li>{"\n                "}</ol>
    {"\n                "}
    <h3 id={"14-試験範囲外出題されないことの確認"} tabIndex={-1}>{"\n                    1.4 試験範囲外(出題されない)ことの確認\n                "}</h3>
    {"\n                "}
    <p>{"\n                    公式ガイドでは次の業務は"}<strong>{"対象外"}</strong>{"とされています。深入りしなくて大丈夫です。\n                "}</p>
    {"\n                "}
    <ul>{"\n                    "}<li>{"暗号アルゴリズムそのものの設計"}</li>{"\n                    "}<li>{"パケットレベルでのトラフィック分析"}</li>{"\n                    "}<li>{"クラウド全体のアーキテクチャ設計"}</li>{"\n                    "}<li>{"エンドユーザーコンピューティングの管理"}</li>{"\n                    "}<li>{"機械学習モデルの学習"}</li>{"\n                "}</ul>
    {"\n                "}
    <p>{"\n                    つまり「暗号の数学」ではなく、「"}<strong>{"AWS のどのサービス・機能を、どの場面で、どう設定して守るか"}</strong>{"」を問われます。\n                "}</p>
    {"\n                "}
    <h2 id={"2-基礎知識-データ保護を理解する4つの土台"} tabIndex={-1}>{"\n                    2. 基礎知識: データ保護を理解する4つの土台\n                "}</h2>
    {"\n                "}
    <h3 id={"21-データの3つの状態"} tabIndex={-1}>{"2.1 データの3つの状態"}</h3>
    {"\n                "}
    <p>{"データ保護は、データがどの状態にあるかで考えると整理できます。"}</p>
    {"\n                "}
    <div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 3：2.1 データの3つの状態"}>{"\n                    "}<table><thead><tr className={"header"}><th scope="col">{"状態"}</th><th scope="col">{"英語"}</th><th scope="col">{"例"}</th><th scope="col">{"主な守り方"}</th><th scope="col">{"Domain 5 の Task"}</th></tr></thead><tbody><tr className={"odd"}><td>{"転送中"}</td><td>{"Data in Transit"}</td><td>{"ブラウザ→ALB、アプリ→DB"}</td><td>{"TLS、VPN、PrivateLink"}</td><td><strong>{"5.1"}</strong></td></tr><tr className={"even"}><td>{"保存中"}</td><td>{"Data at Rest"}</td><td>{"S3 のオブジェクト、EBS ボリューム"}</td><td>{"暗号化、ロック、バックアップ"}</td><td><strong>{"5.2"}</strong></td></tr><tr className={"odd"}><td>{"秘密情報そのもの"}</td><td>{"Secrets / Keys"}</td><td>{"DB パスワード、API キー、暗号鍵"}</td><td>{"Secrets Manager、KMS、CloudHSM"}</td><td><strong>{"5.3"}</strong></td></tr></tbody></table>{"\n                "}</div>
    {"\n                "}
    <h3 id={"22-暗号化の基本用語"} tabIndex={-1}>{"2.2 暗号化の基本用語"}</h3>
    {"\n                "}
    <div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 4：2.2 暗号化の基本用語"}>{"\n                    "}<table><thead><tr className={"header"}><th scope="col">{"用語"}</th><th scope="col">{"やさしい説明"}</th></tr></thead><tbody><tr className={"odd"}><td>{"平文(Plaintext)"}</td><td>{"暗号化前の読めるデータ"}</td></tr><tr className={"even"}><td>{"暗号文(Ciphertext)"}</td><td>{"暗号化後の読めないデータ"}</td></tr><tr className={"odd"}><td>{"対称鍵暗号"}</td><td>{"\n                                    暗号化と復号に"}<strong>{"同じ鍵"}</strong>{"を使う(例:\n                                    AES-256)。高速で大量データ向き\n                                "}</td></tr><tr className={"even"}><td>{"非対称鍵暗号"}</td><td>{"\n                                    "}<strong>{"公開鍵と秘密鍵のペア"}</strong>{"を使う(例:\n                                    RSA、ECC)。署名や鍵交換向き\n                                "}</td></tr><tr className={"odd"}><td>{"TLS"}</td><td>{"通信を暗号化・認証するプロトコル。HTTPS の「S」の正体"}</td></tr><tr className={"even"}><td>{"証明書"}</td><td>{"\n                                    「この公開鍵はこのサーバーのものです」と認証局(CA)が保証する電子的な身分証\n                                "}</td></tr><tr className={"odd"}><td>{"鍵ローテーション"}</td><td>{"\n                                    鍵を定期的に新しいものに切り替えること。万一の漏えい影響を限定する\n                                "}</td></tr></tbody></table>{"\n                "}</div>
    {"\n                "}
    <h3 id={"23-エンベロープ暗号化最重要の概念"} tabIndex={-1}>{"2.3 エンベロープ暗号化(最重要の概念)"}</h3>
    {"\n                "}
    <p>{"\n                    AWS の暗号化サービスはほぼすべて\n                    "}<strong>{"エンベロープ暗号化"}</strong>{" で動いています。ここを理解すると KMS\n                    の問題の大半が解けます。\n                "}</p>
    {"\n                "}
    <p>{"\n                    "}<strong>{"なぜ必要か"}</strong>{": KMS の "}<code>{"Encrypt"}</code>{" API\n                    で直接暗号化できるのは最大 4 KB\n                    までです。大きなデータは、データ用の鍵(データキー)で暗号化し、そのデータキーを\n                    KMS の鍵(KMS キー)で暗号化します。\n                "}</p>
    {"\n                "}
    <Diagram id="diag-0" label={"2.3 エンベロープ暗号化(最重要の概念)"}/>
    {"\n                "}
    <p>{"\n                    "}<strong>{"ポイント"}</strong>{" - KMS キー(旧称 CMK)そのものは\n                    "}<strong>{"KMS の外に出ません"}</strong>{"(CloudHSM や外部キーストアでも原則同様) -\n                    保存するのは「暗号文 +\n                    暗号化済みデータキー」。平文のデータキーは使い終わったらすぐ破棄 -\n                    鍵へのアクセス権(誰が\n                    "}<code>{"Decrypt"}</code>{"\n                    できるか)を管理すれば、データへのアクセスを間接的に制御できる\n                "}</p>
    {"\n                "}
    <h3 id={"24-責任共有モデルとデータ保護"} tabIndex={-1}>{"2.4 責任共有モデルとデータ保護"}</h3>
    {"\n                "}
    <div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 5：2.4 責任共有モデルとデータ保護"}>{"\n                    "}<table><thead><tr className={"header"}><th scope="col">{"区分"}</th><th scope="col">{"AWS の責任"}</th><th scope="col">{"お客様の責任"}</th></tr></thead><tbody><tr className={"odd"}><td>{"暗号化機能"}</td><td>{"暗号化機能・ハードウェア・KMS 基盤の提供と運用"}</td><td>{"\n                                    "}<strong>{"暗号化を有効にする・強制する設定、鍵ポリシー、アクセス制御"}</strong>{"\n                                "}</td></tr><tr className={"even"}><td>{"転送中"}</td><td>{"AWS 内部ネットワークの物理保護"}</td><td><strong>{"TLS 設定、エンドポイント設計、証明書管理"}</strong></td></tr><tr className={"odd"}><td>{"保存中"}</td><td>{"ストレージ基盤の保護"}</td><td>{"\n                                    "}<strong>{"暗号化方式の選択、バックアップ・保持・削除ポリシー"}</strong>{"\n                                "}</td></tr></tbody></table>{"\n                "}</div>
    {"\n                "}
        </section>);
}
