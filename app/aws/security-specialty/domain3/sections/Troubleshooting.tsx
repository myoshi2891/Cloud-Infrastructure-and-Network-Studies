import { Diagram } from '../Diagram';
/** 原本の troubleshooting セクション本文。 */
export default function Troubleshooting() {
    return (<section className="guide-part" data-part="troubleshooting">
    <h2 id={"8-トラブルシューティング実践フロー"} tabIndex={-1}>{"8. トラブルシューティング実践フロー"}</h2>
    {"\n                "}
    <h3 id={"81-ec2-から宛先へ接続できないときの調べ方"} tabIndex={-1}>{"\n                    8.1 「EC2 から宛先へ接続できない」ときの調べ方\n                "}</h3>
    {"\n                "}
    <Diagram id="diag-20" label={"8.1 「EC2 から宛先へ接続できない」ときの調べ方"}/>
    {"\n                "}
    <blockquote>{"\n                    "}<p>{"\n                        "}<strong>{"ツール活用"}</strong>{": 上記のチェックを手作業ではなく\n                        "}<strong>{"VPC Reachability Analyzer"}</strong>{"\n                        に任せると、どこで止まっているかを示してくれます。実際の拒否は\n                        "}<strong>{"VPC Flow Logs"}</strong>{"("}<code>{"REJECT"}</code>{")で確認できます。\n                    "}</p>{"\n                "}</blockquote>
    {"\n                "}
    <h3 id={"82-症状別チェックリスト"} tabIndex={-1}>{"8.2 症状別チェックリスト"}</h3>
    {"\n                "}
    <div className={"table-scroll"} tabIndex={0} role="region" aria-label={"比較表 42：8.2 症状別チェックリスト"}>{"\n                    "}<table><thead><tr className={"header"}><th scope="col">{"症状"}</th><th scope="col">{"まず疑うこと"}</th><th scope="col">{"確認・修復ツール"}</th></tr></thead><tbody><tr className={"odd"}><td>{"CloudFront 経由だと S3 が 403"}</td><td>{"OAC とバケットポリシー、KMS キーポリシー"}</td><td>{"CloudFront 設定、バケットポリシー"}</td></tr><tr className={"even"}><td>{"ブラウザで S3 呼び出しが CORS エラー"}</td><td>{"S3 CORS 設定(オリジン、メソッド、ヘッダー)"}</td><td>{"S3 CORS 設定、ブラウザ開発者ツール"}</td></tr><tr className={"odd"}><td>{"正規ユーザーが WAF でブロック"}</td><td>{"誤検知ルール(マネージドルール)"}</td><td>{"WAF ログ、サンプルリクエスト、Count へ変更"}</td></tr><tr className={"even"}><td>{"Session Manager で接続できない"}</td><td>{"\n                                    SSM Agent、インスタンスプロファイル、VPC エンドポイント(ssm /\n                                    ssmmessages、必要に応じて ec2messages)\n                                "}</td><td>{"Fleet Manager、Reachability Analyzer"}</td></tr><tr className={"odd"}><td>{"EC2 のアプリが S3 に Access Denied"}</td><td>{"\n                                    インスタンスプロファイルの権限、バケットポリシー、VPC\n                                    エンドポイントポリシー\n                                "}</td><td>{"IAM Policy Simulator、CloudTrail"}</td></tr><tr className={"even"}><td>{"戻り通信が届かない"}</td><td>{"NACL のエフェメラルポート"}</td><td>{"NACL ルール、Flow Logs"}</td></tr><tr className={"odd"}><td>{"パッチが適用されない"}</td><td>{"パッチグループのタグ、ベースライン、SSM 接続"}</td><td>{"Patch Manager コンプライアンス、Run Command 履歴"}</td></tr><tr className={"even"}><td>{"Inspector で対象が出てこない"}</td><td>{"SSM Agent の状態、Inspector の有効化、対応 OS"}</td><td>{"Inspector の対象範囲、Systems Manager"}</td></tr><tr className={"odd"}><td>{"VPN は上がるが通信できない"}</td><td>{"ルーティング(BGP、静的ルート)、SG / NACL"}</td><td>{"VPN トンネル状態、ルートテーブル"}</td></tr></tbody></table>{"\n                "}</div>
    {"\n\n                "}
        </section>);
}
