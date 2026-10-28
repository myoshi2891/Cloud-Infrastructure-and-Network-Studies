import React from 'react';
import { Diagram } from '../Diagram';

export const Sec6_Task44: React.FC = () => {
  return (
    <section className="section" id="s6">
      <h2>
        <i className="ti ti-rocket"></i>5. Task 4.4 パイロットから全社展開へスケールする
      </h2>
      <h3 id="k4-4-1">Skill 4.4.1 反復的な変革アプローチ(段階を踏んで進める)</h3>
      <p>
        <strong>① 何を問われるか</strong>{' '}
        <strong>Envision → Experiment → Launch → Scale</strong> のような段階を踏む{' '}
        <strong>反復的な変革アプローチ</strong> を適用できるか。[S3]
      </p>
      <p>
        <strong>② やさしい説明</strong> 一度に完璧な全社導入を目指さず、
        <strong>小さく試し、学び、広げる</strong>{' '}
        を繰り返します。AWS CAF for AI
        も、変革は反復的・漸進的な改善に基づくべきとしています。[S7]
      </p>
      <Diagram id="d8" />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">段階</th>
              <th scope="col">ゴール</th>
              <th scope="col">主な活動</th>
              <th scope="col">進める目安(出口)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Envision</td>
              <td>用途と目的を明確化</td>
              <td>事業成果から逆算、関係者の特定、必要データの把握</td>
              <td>優先用途と成功指標が合意されている</td>
            </tr>
            <tr>
              <td>Experiment</td>
              <td>価値と実現性を検証</td>
              <td>パイロット、PoC、モデルやツールの選定</td>
              <td>検証結果が出て、継続・中止が判断できる</td>
            </tr>
            <tr>
              <td>Launch</td>
              <td>本番で価値を実証</td>
              <td>本番用インフラ、ガバナンス、監視、サポート</td>
              <td>本番で成果を測定できている</td>
            </tr>
            <tr>
              <td>Scale</td>
              <td>広範囲に持続的な価値</td>
              <td>再利用部品、標準パターン、運用モデルの整備</td>
              <td>複数部門が自走して活用している</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        (Envision の活動は [S7][S18]、各段階の内容は [S12][S13][S14][S15]
        を基にしています。出口の目安は初学者向けの整理です。)
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
                各段階でデータ戦略・ガバナンス・セキュリティ・運用の整合を取る
              </td>
              <td>[S17]</td>
            </tr>
            <tr>
              <td>2</td>
              <td>事業成果から逆算して進める</td>
              <td>[S7]</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                すべてのプロジェクトが本番に到達するとは限らない。学びを蓄積して次に活かす
              </td>
              <td>[S27]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>⑤ ひっかけ注意</strong>{' '}
        「要件をすべて固めてから一括導入(ビッグバン)」は誤りになりやすいです。
        <strong>反復的・段階的</strong> が正解です。
      </p>
      <p><strong>⑥ 根拠</strong>: [S3] [S7] [S12] [S13] [S14] [S15] [S17] [S18] [S27]</p>

      <h3 id="k4-4-2">Skill 4.4.2 短期の成果から全社展開へ積み上げる</h3>
      <p>
        <strong>① 何を問われるか</strong>{' '}
        <strong>短期の成果(クイックウィン)から始めて、全社展開へ築く</strong>{' '}
        スケーリング手法を実行できるか。[S3]
      </p>
      <p>
        <strong>② やさしい説明</strong> AWS は、最初は{' '}
        <strong>明確に定義された範囲の小さなプロジェクトで、はっきりした事業価値を示す</strong>{' '}
        ことを推奨しています。[S23] また、AI の取り組みを{' '}
        <strong>投資ポートフォリオ</strong>{' '}
        とみなし、クイックウィン(数か月で価値)、戦略的施策(中長期の変革)、ムーンショット(事業を変革しうる挑戦)をバランスさせる考え方を示しています。[S27]
      </p>
      <p>
        用途の優先順位付けは、<strong>ビジネスインパクトと実現可能性</strong> で行います。[S4]
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">実現可能性が高い</th>
              <th scope="col">実現可能性が低い</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>インパクト大</strong></td>
              <td><strong>最優先</strong>(クイックウィンの候補)</td>
              <td>戦略的施策(前提整備を進めながら中長期で)</td>
            </tr>
            <tr>
              <td><strong>インパクト小</strong></td>
              <td>余力があれば(学習目的)</td>
              <td>見送り</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>③ 具体例</strong>{' '}
        「社内問い合わせの一次対応」のように、範囲が明確でデータが揃い、効果を測りやすい用途を最初に選ぶ。成功事例と学びを他部門へ展開し、次により大きな用途へ進む。
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
              <td>範囲が限定され、測定可能な価値がある案件から始める</td>
              <td>[S23]</td>
            </tr>
            <tr>
              <td>2</td>
              <td>成果を可視化して共有し、次の投資の根拠にする</td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>3</td>
              <td>クイックウィンだけに偏らず、戦略的施策も並行して育てる</td>
              <td>[S27]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>⑤ ひっかけ注意</strong>{' '}
        「最も大規模で野心的な案件から始める」は誤りになりやすいです。ただし{' '}
        <strong>クイックウィンだけで終わらせず、全社展開へ橋渡しする</strong>{' '}
        ことが重要です。
      </p>
      <p><strong>⑥ 根拠</strong>: [S3] [S4] [S23] [S27]</p>

      <h3 id="k4-4-3">Skill 4.4.3 AI センターオブエクセレンス(COE)と部門横断の連携</h3>
      <p>
        <strong>① 何を問われるか</strong>{' '}
        <strong>AI COE</strong> と、部門横断の連携の仕組みを作り、スケールを支えられるか。[S3]
      </p>
      <p>
        <strong>② やさしい説明</strong> AWS の解説では、AI/ML COE は、組織内の AI/ML
        の取り組みを調整・監督する専任の組織で、<strong>集中型または連合型</strong> があり、事業戦略と価値提供の橋渡しをします。成果物は{' '}
        <strong>ガイダンス(ベストプラクティス、教訓、チュートリアルなど)</strong> と{' '}
        <strong>能力(人のスキル、ツール、技術ソリューション、再利用可能なテンプレート)</strong> の 2 種類です。[S25]
      </p>
      <Diagram id="d9" />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">項目</th>
              <th scope="col">内容</th>
              <th scope="col">根拠</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>最初の一歩</td>
              <td>
                上級リーダーのスポンサーシップ、リーダーシップ体制、ミッションと目的の設定
              </td>
              <td>[S25]</td>
            </tr>
            <tr>
              <td>組織形態</td>
              <td>集中型または連合型</td>
              <td>[S25]</td>
            </tr>
            <tr>
              <td>連携</td>
              <td>
                事業部門と定期的に関わり、用途の機会を発見しつつ、ガバナンスと品質基準を維持
              </td>
              <td>[S23]</td>
            </tr>
            <tr>
              <td>関連体制</td>
              <td>AI COE に加え、モデルガバナンス委員会を置くことを検討</td>
              <td>[S23]</td>
            </tr>
            <tr>
              <td>社内プロセス</td>
              <td>新モデルの技術評価、法務レビュー、アクセス申請などを整備</td>
              <td>[S23]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        集中型と連合型の違いは、次のように整理できます(整理は筆者によるもので、詳細は [S25] を参照)。
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">形態</th>
              <th scope="col">特徴</th>
              <th scope="col">向いている状況</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>集中型</td>
              <td>専門家を 1 か所に集め、標準化と品質を強く担保</td>
              <td>立ち上げ期、専門家が少ない</td>
            </tr>
            <tr>
              <td>連合型</td>
              <td>各部門に拠点を置き、中央が調整</td>
              <td>部門ごとに文脈が異なり、規模が大きい</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>③ 具体例</strong> 各部門が別々に AI
        を調達・構築して重複や品質のばらつきが生じている場合、COE が{' '}
        <strong>共通のテンプレート、評価基準、ガイドライン</strong> を提供し、部門の取り組みを支える。
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
              <td>COE のミッションと責任範囲を明確にし、スポンサーを確保する</td>
              <td>[S25]</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                「ゲートキーパー」でなく、ガイダンスと能力を提供する{' '}
                <strong>支援役</strong> にする
              </td>
              <td>[S25]</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                COE を中心に、組織全体が既存の AI サービスと COE を活用できるよう人材を育てる
              </td>
              <td>[S9]</td>
            </tr>
            <tr>
              <td>4</td>
              <td>開発の運用成熟(MLOps)の実践を COE から広める</td>
              <td>[S9]</td>
            </tr>
            <tr>
              <td>5</td>
              <td>
                クラウド COE の考え方(ガイダンスとガバナンスの提供、文化変革の推進)も参考にする
              </td>
              <td>[S36]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>⑤ ひっかけ注意</strong> 「COE がすべての AI 開発を集中して担う」「COE はルールを押し付ける部署」は誤りになりやすいです。
        <strong>支援し、標準化し、再利用を促す</strong> 役割です。
      </p>
      <p><strong>⑥ 根拠</strong>: [S3] [S9] [S23] [S25] [S36]</p>

      <h3 id="k4-4-4">Skill 4.4.4 継続的なフィードバックと成功指標</h3>
      <p>
        <strong>① 何を問われるか</strong>{' '}
        <strong>継続的なフィードバックの仕組みと成功指標</strong> で、AI の取り組みの進捗と長期的な価値を追跡できるか。[S3]
      </p>
      <p>
        <strong>② やさしい説明</strong> 「導入した」で終わらず、
        <strong>効果が出ているか、使われているか、品質は保たれているか</strong>{' '}
        を測り続けます。AWS は、測定の枠組みを{' '}
        <strong>過去データによるベースライン指標</strong>{' '}
        から始め、技術指標(精度、応答時間)と事業指標(生産性向上、顧客満足度)の両方を扱うよう述べています。[S27]
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">指標カテゴリ</th>
              <th scope="col">例</th>
              <th scope="col">見ること</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>事業価値</td>
              <td>コスト削減、生産性向上、収益、顧客満足度</td>
              <td>事業目標への貢献</td>
            </tr>
            <tr>
              <td>利用・浸透</td>
              <td>利用者数、利用頻度、継続率</td>
              <td>現場で使われているか</td>
            </tr>
            <tr>
              <td>品質・信頼性</td>
              <td>精度、応答時間、エラーや誤情報の発生率</td>
              <td>品質が保たれているか</td>
            </tr>
            <tr>
              <td>リスク・コンプライアンス</td>
              <td>インシデント件数、ポリシー違反、エスカレーション率</td>
              <td>安全に運用できているか</td>
            </tr>
            <tr>
              <td>コスト</td>
              <td>単位あたりコスト、総所有コスト</td>
              <td>採算が合っているか</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        (カテゴリ分けは初学者向けの整理で、ベースライン指標・技術指標と事業指標の両方を扱う考え方は [S27]、プラットフォームの採用状況の指標は [S10] に基づきます。)
      </p>
      <p>
        <strong>AI は「放置できない」</strong>{' '}
        試験ガイドの関連キーワードには、モデルドリフト(時間とともに性能が変わる現象)や性能変化を理由に、AI システムには継続的な監視が必要という点が挙がっています。[S4] 生成 AI は出力が一定でない(非決定的)ため、従来のソフトウェアとは違う評価の枠組みが必要です。[S28]
      </p>
      <p>
        <strong>③ 具体例</strong> 問い合わせ対応 AI の導入前に、対応時間と満足度のベースラインを測る。導入後は、対応時間、満足度、誤回答率、エスカレーション率、利用率を月次で確認し、ユーザーのフィードバックを改善に反映する。
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
                <strong>導入前にベースラインを測定</strong> し、効果を比較できるようにする
              </td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>2</td>
              <td>技術指標と事業指標の両方を設定する</td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>3</td>
              <td>
                ユーザーのフィードバックを評価データ・改善に還流させる仕組みを作る
              </td>
              <td>[S19]</td>
            </tr>
            <tr>
              <td>4</td>
              <td>指標と継続的な測定は、導入段階ごとに見直す</td>
              <td>[S7]</td>
            </tr>
            <tr>
              <td>5</td>
              <td>性能の劣化(ドリフト)を監視し、必要なら見直す</td>
              <td>[S4]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>⑤ ひっかけ注意</strong>{' '}
        「導入完了をもって成功」や「技術指標だけ」の選択肢は誤りになりやすいです。
        <strong>事業成果と継続的な測定</strong> が重要です。
      </p>
      <p><strong>⑥ 根拠</strong>: [S3] [S4] [S7] [S10] [S19] [S27] [S28]</p>

      <h3 id="k4-4-5">Skill 4.4.5 実験から本番品質への移行(ガバナンスと運用要件)</h3>
      <p>
        <strong>① 何を問われるか</strong> AI の取り組みが{' '}
        <strong>実験段階から本番品質</strong> へ移る際の、
        <strong>ガバナンスと運用の要件</strong> を扱えるか。[S3]
      </p>
      <p>
        <strong>② やさしい説明</strong> パイロットは「うまく動くか」を確かめる場、本番は「壊れず、安全に、採算が合って動き続ける」場です。AWS の資料は、Experiment から Launch へ進む際に、
        <strong>本番品質のインフラ、本番用ガバナンス、生成 AI 向けの可観測性</strong> を整えるよう述べています。[S13]
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">観点</th>
              <th scope="col">パイロット</th>
              <th scope="col">本番</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>目的</td>
              <td>価値・実現性の検証</td>
              <td>継続的な価値提供と安定運用</td>
            </tr>
            <tr>
              <td>体制</td>
              <td>臨時のチーム</td>
              <td>継続的な監視・改善・サポート体制</td>
            </tr>
            <tr>
              <td>ガバナンス</td>
              <td>簡易</td>
              <td>本番用の枠組み(利用管理、モデル更新の管理)</td>
            </tr>
            <tr>
              <td>監視</td>
              <td>担当者が手作業で確認</td>
              <td>観測・ログ・自動の監視</td>
            </tr>
            <tr>
              <td>インシデント</td>
              <td>想定なし</td>
              <td>生成 AI 向けのインシデント対応手順</td>
            </tr>
            <tr>
              <td>コスト</td>
              <td>少量で見えにくい</td>
              <td>単位コストと総コストの管理</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>(観点の一部は [S13][S23] に基づき、表としての整理は初学者向けです。)</p>
      <p>
        AWS は、<strong>AI の取り組みは小規模の成功が本番の成功を保証しない</strong> ことも示しています。
        <strong>Five V&apos;s Framework</strong> は、Value、Visualize、Validate、Verify、Venture の 5 つで、本番までの道筋を示します。[S27]
      </p>
      <Diagram id="d10" />
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">フェーズ</th>
              <th scope="col">中心となる問い</th>
              <th scope="col">根拠</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Value</td>
              <td>
                これは解く価値があるか(戦略的優先度に沿った高インパクトの機会を狙う)
              </td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>Visualize</td>
              <td>成功をどう測るか(事業成果と結び付く指標、ベースライン)</td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>Validate</td>
              <td>
                現実の要件・制約で検証できるか(統合・負荷・コンプライアンス・ユーザー評価)
              </td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>Verify</td>
              <td>
                大規模に運用できるか(ガバナンス、変更管理、運用準備、アーキテクチャのトレードオフ)
              </td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>Venture</td>
              <td>
                資金とリソースを長期的に確保できるか(総所有コスト、経営層の関与、保守の専任チーム)
              </td>
              <td>[S27]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p><strong>本番移行の判断フロー(整理)</strong></p>
      <Diagram id="d11" />
      <p>
        <strong>③ 具体例</strong> PoC で精度が高かった文書要約 AI を全社展開する前に、本番の受け入れ基準(精度・応答時間・コスト)、監視と障害時の連絡体制、利用ルール、モデル更新時の確認手順を決める。
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
                本番用のガバナンス、CI/CD などの標準デプロイ、可観測性を整備する
              </td>
              <td>[S13]</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                生成 AI 特有の <strong>インシデント対応手順</strong> を用意する
              </td>
              <td>[S23]</td>
            </tr>
            <tr>
              <td>3</td>
              <td>非決定的な出力を前提に、評価の枠組みを作る</td>
              <td>[S28]</td>
            </tr>
            <tr>
              <td>4</td>
              <td>運用準備(ワークフロー、連携点、チームの能力)を評価する</td>
              <td>[S27]</td>
            </tr>
            <tr>
              <td>5</td>
              <td>総所有コスト(開発・統合・研修・運用)を見積もる</td>
              <td>[S27]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>⑤ ひっかけ注意</strong> 「PoC が成功したので、そのまま全社展開」は誤りになりやすいです。
        <strong>本番の要件を別途整える</strong> ことが必要です。
      </p>
      <p><strong>⑥ 根拠</strong>: [S3] [S13] [S23] [S27] [S28]</p>

      <h3 id="k4-4-6">Skill 4.4.6 スケール中に事業継続とパフォーマンスを守る</h3>
      <p>
        <strong>① 何を問われるか</strong> AI を全社へ広げる間、
        <strong>事業の継続性と性能を守る</strong> ために、複数の要因を評価できるか。[S3]
      </p>
      <p>
        <strong>② やさしい説明</strong> 拡大すると、コスト、品質、セキュリティ、ガバナンス、人の受け入れなど、パイロットでは見えなかった問題が一気に表面化します。
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">要因</th>
              <th scope="col">無視した場合のリスク</th>
              <th scope="col">対策の方向性</th>
              <th scope="col">根拠</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>コスト(単位コスト・総コスト)</td>
              <td>利用拡大で予算超過、採算割れ</td>
              <td>総所有コストの見積もり、料金体系の理解、継続的なコスト管理</td>
              <td>[S2][S27]</td>
            </tr>
            <tr>
              <td>品質・性能</td>
              <td>誤り・遅延の増加</td>
              <td>継続的な評価と監視、ドリフトの検知</td>
              <td>[S4][S28]</td>
            </tr>
            <tr>
              <td>セキュリティ・コンプライアンス</td>
              <td>データ漏えい、規制違反</td>
              <td>責任範囲の確認、ガバナンスの自動化</td>
              <td>[S15][S30]</td>
            </tr>
            <tr>
              <td>データガバナンス</td>
              <td>拡大を妨げる、または統制が効かない</td>
              <td>標準ポリシーを保ちつつセルフサービスを許容</td>
              <td>[S14]</td>
            </tr>
            <tr>
              <td>人材・組織</td>
              <td>離職や受け入れ不足で推進が止まる</td>
              <td>人材の再教育、離職に強いプロセス、外部パートナーの活用</td>
              <td>[S9]</td>
            </tr>
            <tr>
              <td>調達・提携</td>
              <td>特定の構築方針への依存</td>
              <td>構築・購入・提携を比較して判断</td>
              <td>[S2]</td>
            </tr>
            <tr>
              <td>インシデント対応</td>
              <td>障害時に混乱</td>
              <td>生成 AI 向けのインシデント対応手順</td>
              <td>[S23]</td>
            </tr>
            <tr>
              <td>共通基盤</td>
              <td>部門ごとの重複、品質のばらつき</td>
              <td>再利用可能なパターン、部品ライブラリ</td>
              <td>[S15]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>③ 具体例</strong> 全社展開で利用者が 10 倍になった際、コストが想定を超え、応答が遅くなり、部門ごとに似た AI が乱立した。事前に{' '}
        <strong>単位コスト、監視、共通の部品、責任者</strong> を整えていれば防げた。
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
                スケールの各段階で、コスト・品質・リスク・組織の受け入れを同時に評価する
              </td>
              <td>[S15]</td>
            </tr>
            <tr>
              <td>2</td>
              <td>
                再利用可能な部品、標準パターン、セルフサービスの基盤を整える
              </td>
              <td>[S15]</td>
            </tr>
            <tr>
              <td>3</td>
              <td>ガバナンスを自動化し、拡大に耐える形にする</td>
              <td>[S15][S18]</td>
            </tr>
            <tr>
              <td>4</td>
              <td>導入の進行に合わせて基礎能力を進化させる</td>
              <td>[S7]</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>⑤ ひっかけ注意</strong> 「性能だけ」「コストだけ」など{' '}
        <strong>1 つの要因だけ</strong> を最適化する選択肢は誤りになりやすいです。
        <strong>複数の要因を総合的に評価</strong> します。
      </p>
      <p>
        <strong>⑥ 根拠</strong>: [S2] [S3] [S4] [S7] [S9] [S14] [S15] [S18] [S23] [S27] [S28] [S30]
      </p>
    </section>
  );
}
