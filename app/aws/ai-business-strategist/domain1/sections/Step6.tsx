import { Diagram } from '../Diagram';

export function Step6() {
    return (
        <section id="step-6-skill-116">
            <h2>Step 6: グローバルな枠組みと共通語彙 (Skill 1.1.6)</h2>
            <p>
                <strong>試験ガイドの該当スキル</strong>: グローバルな枠組みと統一された AI 用語 (例:
                ISO/IEC 23053、ISO/IEC 42001) を認識している。
            </p>
            <h3 id="_35">ひとことで言うと</h3>
            <div className="tldr-box">
                <p>
                    <strong>
                        ISO/IEC 22989 が「AI の共通語彙」、23053 が「ML を使う AI
                        システムを説明する枠組み」、23894 が「AI リスク管理の指針」、42001 が「AI
                        マネジメントシステムの認証可能な規格」
                    </strong>
                    です。ビジネス職は、それぞれの役割の違いを言えれば十分です。
                </p>
            </div>

            <h3 id="_36">詳しい解説</h3>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr className="t-head">
                            <th scope="col">規格</th>
                            <th scope="col">一言でいうと</th>
                            <th scope="col">役割</th>
                            <th scope="col">認証の対象か</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="t-odd">
                            <td><strong>ISO/IEC 22989</strong></td>
                            <td>AI の用語集</td>
                            <td>AI の概念と用語の共通語彙を定め、他の規格の土台になる</td>
                            <td>対象外 (用語・概念)</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>ISO/IEC 23053</strong></td>
                            <td>ML を使う AI システムの構造説明</td>
                            <td>
                                機械学習を用いる一般的な AI システムの構成要素と機能を記述する枠組み
                            </td>
                            <td>対象外 (枠組み)</td>
                        </tr>
                        <tr className="t-odd">
                            <td><strong>ISO/IEC 23894</strong></td>
                            <td>AI リスク管理の指針</td>
                            <td>AI に関わるリスクの特定・評価・低減の考え方を示す</td>
                            <td>対象外 (指針)</td>
                        </tr>
                        <tr className="t-even">
                            <td><strong>ISO/IEC 42001</strong></td>
                            <td>AI マネジメントシステム (AIMS)</td>
                            <td>
                                組織が AI
                                を責任を持って管理するための方針・プロセス・統制の要求事項。Plan-Do-Check-Act
                                の方法論で運用する
                            </td>
                            <td>組織が認証を取得できる (任意)</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <figure className="diagram-figure">
                <Diagram id="d6" label="図 7 ISO/IEC 規格の体系を示す図" />
                <figcaption>図 7</figcaption>
            </figure>
            <h4 id="_37">押さえどころ</h4>
            <ul>
                <li>
                    <strong>23053 と 42001 の違い</strong>は頻出の狙い目です。23053 は「AI
                    システムを<strong>どう記述するか</strong>」の共通の枠組み、42001 は「組織が AI
                    を<strong>どう管理するか</strong>」のマネジメントシステム規格です。
                </li>
                <li>
                    42001 は<strong>認証が任意</strong>で、ISO
                    自身は認証を行いません。認証は独立した認証機関が行います。
                </li>
                <li>
                    42001 は、AI を開発・提供・利用する組織を対象に、AI
                    システムの設計・開発・展開・利用を統治する方針・プロセス・統制の集合を確立し、継続的に改善するための要求事項を示します。
                </li>
                <li>
                    規格は世界的に増え続けています。2025
                    年にも関連規格の公表が相次ぎました。試験では「代表的な規格の役割を区別できる」ことが目標で、細かな条文の暗記は想定されにくいと考えられます
                    (ベータ試験のため出題範囲は変わり得ます)。
                </li>
            </ul>
            <h4 id="domain-3">関連する他の枠組みへの接続 (Domain 3 で詳しく扱う)</h4>
            <p>
                AWS の Shadow AI
                に関するブログは、規制面の「守るべき最低ラインの基準」として、<strong>EU AI Act</strong>{' '}
                (義務は対象となるシステムと役割に該当する場合にのみ適用される) と{' '}
                <strong>NIST AI Risk Management Framework</strong> (と生成 AI プロファイル。法的義務ではない任意のガバナンス指針)
                を挙げ、AWS Audit Manager が NIST AI RMF や ISO/IEC 42001
                などの枠組みに対応づけた証跡の収集を助けると紹介しています。Domain 1
                では「代表的な枠組みの名前と役割を知っている」ことを、Domain 3
                では「どう運用するか」を学ぶ、と切り分けると整理しやすくなります。
            </p>
            <h3 id="_38">ベストプラクティス</h3>
            <div className="practice-box">
                <ol>
                    <li>
                        <strong>社内の AI 用語集を ISO/IEC 22989 に寄せて作る</strong>:
                        部門間・ベンダー間の認識ズレを減らす。
                    </li>
                    <li>
                        <strong>
                            AI
                            ガバナンスを「個別施策」ではなく「マネジメントシステム」として設計する
                        </strong>: 42001 の Plan-Do-Check-Act
                        を参考に、方針、役割、リスク評価、監査、改善のサイクルを回す。
                    </li>
                    <li>
                        <strong>認証取得は目的ではなく手段として判断する</strong>:
                        取引先要求、規制、信頼性の証明といったビジネス要因で必要性を決める。
                    </li>
                    <li>
                        <strong>
                            ベンダー選定時に、相手が準拠・認証している規格を確認項目に入れる
                        </strong>。
                    </li>
                </ol>
            </div>

            <h3 id="_39">よくある誤解と試験の狙い目</h3>
            <div className="misconception-box">
                <div className="table-wrap">
                    <table>
                        <thead>
                            <tr className="t-head">
                                <th scope="col">誤解</th>
                                <th scope="col">正しい理解</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="t-odd">
                                <td>「ISO/IEC 42001 は法律」</td>
                                <td>国際規格であり、法規制ではない。認証は任意</td>
                            </tr>
                            <tr className="t-even">
                                <td>「23053 は AI の倫理原則を定める」</td>
                                <td>ML を使う AI システムの構成を記述する枠組み</td>
                            </tr>
                            <tr className="t-odd">
                                <td>「ISO が 42001 の認証を発行する」</td>
                                <td>認証は独立した認証機関が行う</td>
                            </tr>
                            <tr className="t-even">
                                <td>「22989 と 42001 は同じ種類の規格」</td>
                                <td>22989 は用語・概念、42001 はマネジメントシステム要求事項</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <h3 id="_40">根拠となるソース</h3>
            <div className="source-box">
                <ul>
                    <li>
                        ISO/IEC 42001:2023 (ISO 公式):{' '}
                        <a href="https://www.iso.org/standard/42001" rel="noopener" target="_blank">
                            https://www.iso.org/standard/42001
                        </a>
                    </li>
                    <li>
                        ISO &quot;ISO/IEC 42001 explained&quot; (認証は任意、ISO 自身は認証しない):{' '}
                        <a
                            href="https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai"
                            rel="noopener"
                            target="_blank"
                        >
                            https://help.iso.org/en/articles/376293-iso-iec-42001-ai-management-systems-for-ethical-and-responsible-ai
                        </a>
                    </li>
                    <li>
                        ISO/IEC 22989 (arc42 Quality Model による整理):{' '}
                        <a
                            href="https://quality.arc42.org/standards/iso-iec-22989"
                            rel="noopener"
                            target="_blank"
                        >
                            https://quality.arc42.org/standards/iso-iec-22989
                        </a>
                    </li>
                    <li>
                        Govern AI Adoption Before It Governs You (AWS Blog):{' '}
                        <a
                            href="https://aws.amazon.com/blogs/migration-and-modernization/govern-ai-adoption-before-it-governs-you/"
                            rel="noopener"
                            target="_blank"
                        >
                            https://aws.amazon.com/blogs/migration-and-modernization/govern-ai-adoption-before-it-governs-you/
                        </a>
                    </li>
                </ul>
            </div>
        </section>
    );
}
