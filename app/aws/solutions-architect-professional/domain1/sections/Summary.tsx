export default function Summary() {
    return (
        <section className="guide-section" data-section="summary">
<h2 id="7-横断まとめ-キーワードから答えを選ぶ早見表" tabIndex={-1}>
                    7. 横断まとめ: キーワードから答えを選ぶ早見表
                </h2>
<div className="table-scroll" role="region" tabIndex={0} aria-label={"7. 横断まとめ: キーワードから答えを選ぶ早見表 (表49)"}>
<table>
                        <thead>
                            <tr className="header">
                                <th scope="col">問題文のキーワード</th>
                                <th scope="col">優先して検討するサービスや機能</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="odd">
                                <td>多数の VPC を接続、推移的な通信</td>
                                <td>Transit Gateway</td>
                            </tr>
                            <tr className="even">
                                <td>CIDR が重複しているが特定サービスだけ公開</td>
                                <td>AWS PrivateLink</td>
                            </tr>
                            <tr className="odd">
                                <td>専用線の暗号化</td>
                                <td>MACsec、または Direct Connect 上の VPN</td>
                            </tr>
                            <tr className="even">
                                <td>オンプレミスと AWS の名前解決</td>
                                <td>Route 53 Resolver の Inbound と Outbound Endpoint</td>
                            </tr>
                            <tr className="odd">
                                <td>S3 にオンプレミスからプライベートアクセス</td>
                                <td>Interface エンドポイント</td>
                            </tr>
                            <tr className="even">
                                <td>通信できない原因を設定から調べたい</td>
                                <td>Reachability Analyzer</td>
                            </tr>
                            <tr className="odd">
                                <td>別アカウントの操作を一時的に許可</td>
                                <td>IAM ロールの引き受け (AssumeRole)</td>
                            </tr>
                            <tr className="even">
                                <td>従業員の SSO、外部 IdP 連携</td>
                                <td>IAM Identity Center</td>
                            </tr>
                            <tr className="odd">
                                <td>組織全体で操作を禁止</td>
                                <td>SCP</td>
                            </tr>
                            <tr className="even">
                                <td>全アカウントの API ログを集約</td>
                                <td>組織の CloudTrail 証跡</td>
                            </tr>
                            <tr className="odd">
                                <td>検出結果の一元化</td>
                                <td>Security Hub と GuardDuty の委任管理者</td>
                            </tr>
                            <tr className="even">
                                <td>暗号化スナップショットを別アカウントへ共有</td>
                                <td>カスタマーマネージドキー</td>
                            </tr>
                            <tr className="odd">
                                <td>低コストの DR、データは常時複製</td>
                                <td>パイロットライト</td>
                            </tr>
                            <tr className="even">
                                <td>ほぼ即時の切り替え</td>
                                <td>マルチサイト Active/Active</td>
                            </tr>
                            <tr className="odd">
                                <td>オンプレミスサーバーの DR</td>
                                <td>AWS Elastic Disaster Recovery</td>
                            </tr>
                            <tr className="even">
                                <td>バックアップの改ざん防止</td>
                                <td>
                                    AWS Backup の Vault Lock
                                    (コンプライアンスモード。猶予期間後に変更不可、保持期間中は削除不可)
                                    と別アカウントへのコピー
                                </td>
                            </tr>
                            <tr className="odd">
                                <td>標準化したマルチアカウントを素早く構築</td>
                                <td>AWS Control Tower</td>
                            </tr>
                            <tr className="even">
                                <td>サブネットを複数アカウントで共有</td>
                                <td>AWS RAM の VPC 共有</td>
                            </tr>
                            <tr className="odd">
                                <td>コストをタグで部門に配賦</td>
                                <td>コスト配分タグの有効化、Cost Categories</td>
                            </tr>
                            <tr className="even">
                                <td>中断可能なバッチ処理のコスト削減</td>
                                <td>スポットインスタンス</td>
                            </tr>
                            <tr className="odd">
                                <td>構成が変わる安定利用の割引</td>
                                <td>Compute Savings Plans</td>
                            </tr>
                            <tr className="even">
                                <td>最も詳細なコストデータ</td>
                                <td>Cost and Usage Report</td>
                            </tr>
                            <tr className="odd">
                                <td>インスタンスの適正サイズ</td>
                                <td>Compute Optimizer</td>
                            </tr>
                        </tbody>
                    </table>
</div>
<hr />
        </section>
    );
}
