// app/recommended-books/terraform-up-and-running/sections/Section10.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section10({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第10部原著第10章対応-チームでterraformを使う">{' '}第10部（原著第10章対応）: チームでTerraformを使う{' '}</h2>
<h3 id="10-1-チームへのiac導入">10-1. チームへのIaC導入</h3>
<p>原著が強調するのは、技術的な正しさだけでなく「組織的にどう導入するか」です。</p>
<ul>{' '}<li>{' '}上司・意思決定者に投資対効果（デプロイ速度、障害復旧時間の改善）を説明する{' '}</li>{' '}<li>{' '}一度にすべてを移行せず、新規プロジェクトや影響範囲の小さい部分から段階的に導入する{' '}</li>{' '}<li>{' '}チームに学習時間を確保する（Terraformの学習コストをスケジュールに織り込む）{' '}</li>{' '}</ul>
<h3 id="10-210-3-アプリケーションコードとインフラコードのデプロイワークフロー">{' '}10-2〜10-3. アプリケーションコードとインフラコードのデプロイワークフロー{' '}</h3>
<p>{' '}原著は「アプリケーションコードのデプロイ」と「インフラコードのデプロイ」を並べて比較し、共通のワークフロー原則を示しています。{' '}</p>
<Diagram id="diag-16" ariaLabel="アプリケーションコードとインフラコードのデプロイパイプライン統合フロー" />
<div className="table-scroll">{' '}<table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">観点</th>
                            <th scope="col">アプリケーションコード</th>
                            <th scope="col">インフラコード</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>デプロイ単位</td>
                                <td>ビルド済みアーティファクト（バイナリ/コンテナ）</td>
                                <td><code>terraform apply</code>によるクラウドAPI呼び出し</td>
                            </tr>
                            <tr className="row-even">
                                <td>ロールバック</td>
                                <td>旧アーティファクトへの切り戻し</td>
                                <td>{' '}直前のコードへの<code>revert</code>{' '}+ 再<code>apply</code>（データを伴う変更は要注意）{' '}</td>
                            </tr>
                            <tr className="row-odd">
                                <td>承認プロセス</td>
                                <td>コードレビュー + CIパス</td>
                                <td>コードレビュー +{' '}<code>plan</code>結果の目視確認</td>
                            </tr>
                            <tr className="row-even">
                                <td>特有のリスク</td>
                                <td>ロジックバグ</td>
                                <td>削除を伴う変更による本番データ/リソースの喪失</td>
                            </tr>
                        </tbody>
                    </table>{' '}</div>
<h3 id="10-4-まとめて考える">10-4. まとめて考える</h3>
<ul>{' '}<li>{' '}インフラコードもアプリケーションコードと同じ厳密さでバージョン管理・レビュー・テストする{' '}</li>{' '}<li>{' '}<code>terraform plan</code>の出力を「デプロイ前の最終確認ポイント」としてワークフローに組み込む{' '}</li>{' '}<li>CI/CD上での<code>apply</code>実行権限は最小限のロール・環境に限定する</li>{' '}</ul>

        </section>
    );
}
