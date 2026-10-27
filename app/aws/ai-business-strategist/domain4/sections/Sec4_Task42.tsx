import React from 'react';
import { Diagram } from '../Diagram';

export const Sec4_Task42: React.FC = () => {
    return (
        <section className="section" id="s4">
            <h2><i className="ti ti-database"></i>3. Task 4.2 データとインフラの土台を整える</h2>
            <h3>3-0. データが AI の燃料になる</h3>
            <p>
                AWS CAF for AI は、高品質なデータが AI を学習・調整し、予測が業務成果を生み、その成果が新しいデータを生む、という好循環を{' '}
                <strong>AI フライホイール</strong>{' '}
                と呼びます。データとデータ戦略が、このフライホイールを回し続ける燃料です。[S7]
            </p>
            <Diagram id="d4" />
            <h3 id="k4-2-1">Skill 4.2.1 データの準備度を評価する(品質・アクセス性・サイロ)</h3>
            <p>
                <strong>① 何を問われるか</strong> データの{' '}
                <strong>品質</strong>、<strong>アクセス性</strong>、そして{' '}
                <strong>データサイロ(部門ごとに孤立したデータ)</strong> が AI
                の取り組みに与える影響を評価できるか。[S3]
            </p>
            <p>
                <strong>② やさしい説明</strong> AI
                は「入れたデータの質」がそのまま出力の質になります。これは「Garbage in, garbage
                out(ゴミを入れればゴミが出る)」と呼ばれます。[S19] 量が多いだけでは足りません。
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">評価軸</th>
                            <th scope="col">意味</th>
                            <th scope="col">確認の問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>完全性</td>
                            <td>必要な項目が欠けていないか</td>
                            <td>空欄や欠損が多くないか</td>
                        </tr>
                        <tr>
                            <td>正確性</td>
                            <td>内容が事実と合っているか</td>
                            <td>誤記や重複がないか</td>
                        </tr>
                        <tr>
                            <td>一貫性</td>
                            <td>形式や定義が揃っているか</td>
                            <td>部署ごとに単位や表記が違わないか</td>
                        </tr>
                        <tr>
                            <td>適時性</td>
                            <td>最新の状態か</td>
                            <td>更新が止まっていないか</td>
                        </tr>
                        <tr>
                            <td>アクセス性</td>
                            <td>必要な人とシステムが安全に使えるか</td>
                            <td>取り出すのに何週間もかかっていないか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                (完全性・正確性・一貫性・適時性は、AWS の生成 AI
                ワークロード評価の設問例で品質指標として挙げられています。[S21])
            </p>
            <p>
                <strong>データサイロの影響</strong> サイロがあると、AI
                は会社の一部の情報しか見られず、回答が偏ったり、部署ごとに似た AI
                を重複して作ったりします。AWS の Generative AI Lens
                は、構造化データと非構造化データを統合し、データがどこにあっても一元的にアクセスできる状態を目指すよう述べています。[S20]
            </p>
            <p>
                <strong>③ 具体例</strong> 営業部は顧客データを CRM
                に、サポート部はチケット管理ツールに、マーケ部は表計算ファイルに保存している。各部門が別々に
                AI を試すと、顧客像が一致せず、<strong>「顧客の全体像を把握する AI」が作れません</strong>。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                AI
                                に使うデータ種別を洗い出し、利用可能な割合と品質基準を満たす割合を測る
                            </td>
                            <td>[S21]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                データ品質の KPI とダッシュボードを設定し、事業目標と結び付ける
                            </td>
                            <td>[S29]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>
                                データ品質を担う専任のスチュワード(管理担当)を置き、権限と資源を与える
                            </td>
                            <td>[S29]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>非構造化データ(文書、画像など)も戦略的な資産として扱う</td>
                            <td>[S17][S20]</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>
                                生成 AI の RAG
                                やファインチューニングでも、データ準備の質が結果を左右すると認識する
                            </td>
                            <td>[S19]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「データ量を増やせば解決する」は誤りになりやすいです。<strong>質・アクセス性・統合</strong>{' '}
                が重要です。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S17] [S19] [S20] [S21] [S29]</p>
            <p><strong>フローで見るデータ準備度の判断</strong></p>
            <Diagram id="d5" />
            <h3 id="k4-2-2">Skill 4.2.2 データ戦略・オーナーシップ・共有の枠組み</h3>
            <p>
                <strong>① 何を問われるか</strong> AI の基盤となる{' '}
                <strong>データ戦略、データオーナーシップ、データ共有の枠組み</strong>{' '}
                の重要性を説明できるか。[S3]
            </p>
            <p><strong>② やさしい説明</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">用語</th>
                            <th scope="col">やさしい意味</th>
                            <th scope="col">例</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>データ戦略</td>
                            <td>「どのデータを、何のために、どう集め守り活用するか」の方針</td>
                            <td>顧客対応 AI のために FAQ と問い合わせ履歴を整備する</td>
                        </tr>
                        <tr>
                            <td>データオーナーシップ</td>
                            <td>「このデータに責任を持つのは誰か」を決めること</td>
                            <td>商品マスタは商品企画部が責任者</td>
                        </tr>
                        <tr>
                            <td>データ共有の枠組み</td>
                            <td>部門間や外部とデータを共有する際の規則と合意</td>
                            <td>誰が、何の目的で、どの範囲まで使えるか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                AWS の資料は、データガバナンスを支える柱に <strong>品質保証</strong> と{' '}
                <strong>オーナーシップ</strong> を挙げ、オーナーシップは単なる所有ではなく{' '}
                <strong>スチュワードシップ(責任ある管理)</strong>{' '}
                の意識への転換が重要だと述べています。[S29]
            </p>
            <p>
                <strong>③ 具体例</strong> ある保険会社では、契約データの責任部署が曖昧で、AI
                用に使ってよい範囲が不明。結果、法務確認のたびに数週間止まる。<strong>データ責任者、利用目的別のアクセス規則、個人情報の扱い</strong>{' '}
                を事前に定めていれば、検証のスピードが上がる。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>部門横断のデータガバナンス委員会を置き、方針を管理する</td>
                            <td>[S21]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                ロールベースのアクセス制御、データ分類、定期監査を組み合わせる
                            </td>
                            <td>[S21]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>データ戦略を AI 導入の各段階(Envision〜Scale)に結び付ける</td>
                            <td>[S17][S18]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>4 つの柱(人・基盤・運用・ガバナンス)でデータ戦略を整理する</td>
                            <td>[S18]</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>
                                プライバシー保護と AI のデータ需要のバランスを戦略に明記する
                            </td>
                            <td>[S21]</td>
                        </tr>
                        <tr>
                            <td>6</td>
                            <td>
                                過度に制限的・中央集権的なデータガバナンスは、部門を超えた拡大を妨げる。セルフサービスを許しつつ標準ポリシーとアクセス制御を維持する
                            </td>
                            <td>[S14]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「データを全社で自由に共有する」も「データを全部ロックダウンする」も極端です。<strong>ルールに基づく共有</strong>{' '}
                が正解になりやすいです。
            </p>
            <p><strong>⑥ 根拠</strong>: [S3] [S14] [S17] [S18] [S21] [S29]</p>
            <h3 id="k4-2-3">Skill 4.2.3 技術・インフラ要件を戦略レベルで評価する</h3>
            <p>
                <strong>① 何を問われるか</strong> AI の取り組みを支えるための{' '}
                <strong>基盤の要件</strong>{' '}
                を、技術者ではなくビジネス側の視点で評価できるか。[S3]
                (設計や構築そのものは範囲外です。[S2])
            </p>
            <p><strong>② やさしい説明</strong> 経営者として確認したいのは次の問いです。</p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">観点</th>
                            <th scope="col">ビジネス側の問い</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>使うモデルの選択肢</td>
                            <td>既製の AI サービスで足りるか、独自のカスタマイズが必要か</td>
                        </tr>
                        <tr>
                            <td>データの流れ</td>
                            <td>必要なデータを安全に AI へ届けられるか</td>
                        </tr>
                        <tr>
                            <td>セキュリティと責任分担</td>
                            <td>
                                どこまでが自社の責任で、どこからがクラウド事業者・モデル提供者の責任か
                            </td>
                        </tr>
                        <tr>
                            <td>運用と監視</td>
                            <td>本番で品質・コスト・リスクを監視できるか</td>
                        </tr>
                        <tr>
                            <td>コスト</td>
                            <td>料金体系と総コストを見通せるか</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p><strong>AWS の主要サービス(戦略レベルの理解で十分)</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">サービス</th>
                            <th scope="col">戦略レベルの位置づけ</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Amazon Bedrock</td>
                            <td>
                                生成 AI
                                アプリやエージェントを構築するためのプラットフォーム。Guardrails、Knowledge
                                Bases、料金の選択肢が論点
                            </td>
                            <td>[S2][S31]</td>
                        </tr>
                        <tr>
                            <td>Amazon SageMaker AI</td>
                            <td>
                                カスタム
                                ML。マネージド型で足りるか、カスタム構築が必要かを判断する場面で登場
                            </td>
                            <td>[S2]</td>
                        </tr>
                        <tr>
                            <td>Amazon Quick</td>
                            <td>
                                AI
                                による業務支援アシスタント(調査、ビジネスインサイト、自動化など)
                            </td>
                            <td>[S1][S2]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>責任共有モデルと AI</strong> AWS の責任共有モデルは、AWS
                がクラウドの基盤部分を運用し、顧客が自分のデータやアプリの保護を担う、という役割分担です。生成
                AI では、<strong>自社の使い方(既存モデルを API で使う、自社データでファインチューニングするなど)によって、自社が担う範囲が変わります</strong>。AWS はこれを整理する「Generative AI Security Scoping
                Matrix」を公開しています。[S30] また Amazon Bedrock
                は、入力と出力をモデル提供者と共有せず、基盤モデルの学習にも使わないと説明しています。[S31]
            </p>
            <p>
                <strong>料金体系</strong> 試験ガイドは、AWS の AI サービスの料金体系として{' '}
                <strong>従量課金型、インスタンス型、シート(利用者数)型</strong>{' '}
                を挙げ、コスト最適化の例として Savings Plans、見積もりに AWS Pricing Calculator
                と AWS Cost Explorer、構築・購入・提携の判断に AWS Marketplace
                を挙げています。[S2][S5]
            </p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">ツール・概念</th>
                            <th scope="col">使いどころ</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>AWS Pricing Calculator</td>
                            <td>導入前のコスト見積もり</td>
                            <td>[S2][S33]</td>
                        </tr>
                        <tr>
                            <td>AWS Cost Explorer</td>
                            <td>
                                過去のコストと使用量を可視化・分析し、将来を予測する(過去 13
                                か月の表示、18 か月先の予測が可能)
                            </td>
                            <td>[S32]</td>
                        </tr>
                        <tr>
                            <td>Savings Plans</td>
                            <td>利用量のコミットによる割引(コスト最適化策)</td>
                            <td>[S2][S33]</td>
                        </tr>
                        <tr>
                            <td>AWS Marketplace</td>
                            <td>構築(Build)・購入(Buy)・提携(Partner)の比較検討</td>
                            <td>[S2]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>③ 具体例</strong>{' '}
                「社内文書の検索・要約」という用途なら、自前でモデルを開発するより、<strong>マネージドサービスで既存モデルを使い、自社データを組み合わせる</strong>{' '}
                ほうが短期間で価値を出せる場合が多い。ただし、独自データでの高度なカスタマイズが競争優位に直結するなら、カスタム
                ML も検討対象になる。
            </p>
            <p><strong>④ ベストプラクティス</strong></p>
            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">実践</th>
                            <th scope="col">根拠</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>
                                AI サービス層(既製モデルを利用する層)と ML
                                サービス層(モデルを訓練・調整する層)を区別して基盤を考える
                            </td>
                            <td>[S10]</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>
                                導入の採用状況を測るフィードバックの仕組みと指標を最初から設ける
                            </td>
                            <td>[S10]</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>責任共有の範囲を、自社の AI の使い方ごとに確認する</td>
                            <td>[S30]</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>
                                料金体系(従量、インスタンス、シート)を理解し、総コストで判断する
                            </td>
                            <td>[S2][S27]</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>
                                セキュリティ・ガバナンスの実装詳細は専門チームに任せ、ビジネス側は要件と責任範囲の確認に集中する
                            </td>
                            <td>[S2]</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>
                <strong>⑤ ひっかけ注意</strong>{' '}
                「アルゴリズムの選定」「ハイパーパラメータ調整」「パイプライン構築」など{' '}
                <strong>技術実装の選択肢</strong>{' '}
                は範囲外です。戦略・責任・コストの観点の選択肢を選びます。[S2]
            </p>
            <p><strong>⑥ 根拠</strong>: [S1] [S2] [S5] [S10] [S27] [S30] [S31] [S32] [S33]</p>
        </section>
    );
};
