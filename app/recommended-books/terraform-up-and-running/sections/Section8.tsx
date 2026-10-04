// app/recommended-books/terraform-up-and-running/sections/Section8.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function Section8({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="第8部原著第8章対応-本番グレードのterraformコード">
                    第8部（原著第8章対応）: 本番グレードのTerraformコード
                </h2>
<h3 id="8-1-なぜ本番グレードのインフラ構築は時間がかかるのか">
                    8-1. なぜ本番グレードのインフラ構築は時間がかかるのか
                </h3>
<p>
                    「動くだけのTerraformコード」と「本番運用に耐えるTerraformコード」の間には大きなギャップがあります。原著はこのギャップを埋める要素を「本番グレードインフラのチェックリスト」として整理しています。
                </p>
<h3 id="8-2-本番グレードインフラのチェックリスト">
                    8-2. 本番グレードインフラのチェックリスト
                </h3>
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">カテゴリ</th>
                            <th scope="col">具体項目</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>インストール</td>
                                <td>バージョン管理、依存関係管理、OS起動時の自動起動設定</td>
                            </tr>
                            <tr className="row-even">
                                <td>設定</td>
                                <td>環境ごとの設定値管理、シークレット管理（第6部参照）</td>
                            </tr>
                            <tr className="row-odd">
                                <td>ビルド</td>
                                <td>パッケージング、コンテナ化、Immutableなアーティファクト管理</td>
                            </tr>
                            <tr className="row-even">
                                <td>デプロイ</td>
                                <td>ゼロダウンタイムデプロイ、ロールバック手順</td>
                            </tr>
                            <tr className="row-odd">
                                <td>高可用性</td>
                                <td>複数AZ/複数リージョン、Auto Scaling、フェイルオーバー</td>
                            </tr>
                            <tr className="row-even">
                                <td>スケーラビリティ</td>
                                <td>水平/垂直スケーリング、負荷分散</td>
                            </tr>
                            <tr className="row-odd">
                                <td>パフォーマンス</td>
                                <td>キャッシュ、CDN、コネクションプーリング</td>
                            </tr>
                            <tr className="row-even">
                                <td>監視</td>
                                <td>メトリクス、ログ集約、アラート、ダッシュボード</td>
                            </tr>
                            <tr className="row-odd">
                                <td>セキュリティ</td>
                                <td>最小権限、暗号化（転送時/保管時）、ネットワーク分離</td>
                            </tr>
                            <tr className="row-even">
                                <td>コスト最適化</td>
                                <td>
                                    適切なインスタンスサイズ、スポットインスタンス活用、未使用リソースの削除
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h3 id="8-3-本番グレードモジュールの4原則">8-3. 本番グレードモジュールの4原則</h3>
<Diagram id="diag-13" ariaLabel="本番グレードモジュールを支える4原則（明示的、分離、テスト可能、バージョニング）" />
<div className="table-scroll">
                    <table>
                        <thead>
                            <tr className="row-header">
                            <th scope="col">原則</th>
                            <th scope="col">悪い例</th>
                            <th scope="col">良い例</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="row-odd">
                                <td>Small</td>
                                <td>1つのモジュールにVPC・ASG・RDS・IAMをすべて詰め込む</td>
                                <td>VPCモジュール、ASGモジュール、RDSモジュールに分割</td>
                            </tr>
                            <tr className="row-even">
                                <td>Composable</td>
                                <td>モジュール内部でハードコードされたリソース名に依存</td>
                                <td>入力変数と出力値だけで疎結合に連携</td>
                            </tr>
                            <tr className="row-odd">
                                <td>Testable</td>
                                <td>手動でのAWSコンソール確認に依存</td>
                                <td><code>terraform test</code>やTerratestで自動検証可能</td>
                            </tr>
                            <tr className="row-even">
                                <td>Versioned</td>
                                <td><code>source</code>にブランチ名やパスをそのまま指定</td>
                                <td>タグ・コミットハッシュでバージョン固定</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
<h3 id="8-4-terraformを超えて">8-4. Terraformを超えて</h3>
<p>
                    本番運用では、Terraformだけで完結せず、CI/CDパイプライン、監視ツール（Datadog等）、Policy
                    as Codeツール（第11部参照）との組み合わせが前提になります。
                </p>

        </section>
    );
}
