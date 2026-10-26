/**
 * AWS公式ドキュメント（2026-10-26確認）にもとづく ANS-C01 / SAP-C02 総合ガイド原本からの訂正。
 * 原本fixtureは固定Gitの証跡として改変せず、表示内容の期待値にだけ withSourceCorrections で適用する。
 */
/** after 指定時は、直前の表セル（結合テキストでは直前の語句）が after と一致する from だけを訂正する。 */
type Correction = readonly [from: string, to: string, after?: string];

/** ANS-C01: ルート伝播の対象と、BGP の経路選択で効く向きを公式ドキュメントに合わせる。 */
export const ANS_GUIDE_CORRECTIONS: readonly Correction[] = [
    // VGW の伝播は VPC サブネットのルートテーブルへ入るが、TGW の伝播は TGW ルートテーブルだけを更新する
    ['VGW や TGW が BGP で学習した経路を、ルートテーブルに自動で追加', 'VGW の伝播は、BGP で学習した経路を VPC サブネットのルートテーブルに自動で追加。TGW の伝播は TGW ルートテーブルだけを更新するため、VPC サブネットのルートテーブルには TGW 宛てのルートを別途設定する'],
    // DX の Local Preference コミュニティは、AWS からオンプレミスへ向かう経路の選択に効く
    ['AWS が受け取る側の優先度は、Direct Connect の BGP コミュニティタグで制御できる', 'AWS 側での経路の優先度 (AWS → オンプレミスの向き) は、Direct Connect の Local Preference コミュニティタグで制御できる'],
    ['オンプレミス → AWS (AWS が受け取る)', 'オンプレミス → AWS (お客様ルーターが AWS から受け取った経路を選ぶ)'],
    ['Direct Connect の Local Preference コミュニティ、より具体的なプレフィックスの広告', 'お客様ルーター側の Local Preference (AWS から受信した経路に設定)'],
    ['AWS → オンプレミス (お客様ルーターが受け取る)', 'AWS → オンプレミス (AWS がお客様から受け取った経路を選ぶ)'],
    ['お客様ルーター側の Local Preference、AS_PATH プリペンドで AWS 側へ送る経路を調整', 'AWS へ広告する経路に、Direct Connect の Local Preference コミュニティを付ける、より具体的なプレフィックスを広告する、AS_PATH プリペンドを足す'],
    ['で、AWS が受け取る経路の優先度を制御。', 'で、AWS が受け取る経路の優先度 (AWS → オンプレミスの向き) を制御。'],
    ['で、送出する経路を制御。', 'を使う。Local Preference は AWS へ向かう経路 (オンプレミス → AWS) の選択に、AS_PATH プリペンドは AWS へ広告する経路の調整 (AWS → オンプレミスの向き) に使う。'],
    // 引用符なしでは $packets がシェル変数として展開されるため、短縮構文全体を単一引用符で囲む
    ['--metric-transformations metricName=RejectedPackets,metricNamespace=Network,metricValue=$packets,defaultValue=0', "--metric-transformations 'metricName=RejectedPackets,metricNamespace=Network,metricValue=$packets,defaultValue=0'"],
    // CloudFront と ALB はクライアントの TLS を終端するため、TLS の保護範囲は接続の区間ごとになる
    ['クライアント ↔ サーバー間 (エンドツーエンド)', 'TLS 接続の区間ごと。CloudFront や ALB はクライアントからの TLS を終端し、その先のオリジンやターゲットまでの区間は HTTPS を設定した場合にだけ暗号化される'],
    // Inter-Region VPC ピアリングは 8,500 バイトまでのジャンボフレームに対応し、1,500 の上限はインターネットと VPN 経由に限る
    ['VPN 経由は 1,500 未満、Inter-Region ピアリングや IGW 経由は 1,500 など', 'VPN 経由は 1,500 未満、IGW 経由は 1,500、Inter-Region VPC ピアリングは 8,500 など'],
    ['1,500 (ジャンボは使えない)', 'インターネット / VPN は 1,500 (ジャンボは使えない)。Inter-Region VPC ピアリングは 8,500 まで', 'インターネット / VPN / Inter-Region ピアリング'],
    ['1,500', '8,500', 'Inter-Region VPC ピアリング'],
];

/** 構文トークンの訂正。[クラス, 開始位置, 削除するトークン, 挿入するトークン]。 */
type TokenCorrection = readonly [key: string, index: number, remove: readonly string[], insert: readonly string[]];

/** ANS-C01: 単一引用符で囲んだ --metric-transformations の値は、変数や演算子ではなく1つの文字列トークンになる。 */
export const ANS_GUIDE_SYNTAX_CORRECTIONS: readonly TokenCorrection[] = [
    ['nv', 11, ['metricName', '$packets'], []],
    ['o', 20, ['=', '=', '=', '='], []],
    ['m', 12, ['0'], []],
    ['s1', 4, [], ["'metricName=RejectedPackets,metricNamespace=Network,metricValue=$packets,defaultValue=0'"]],
];

/** 構文トークンへ訂正を適用した複製を返す。削除対象が原本と一致しない場合は、訂正が黙って無効化されないよう例外にする。 */
export function withSyntaxCorrections(tokens: Readonly<Record<string, readonly string[]>>, corrections: readonly TokenCorrection[]): Record<string, string[]> {
    const result = Object.fromEntries(Object.entries(tokens).map(([key, list]) => [key, [...list]]));
    for (const [key, index, remove, insert] of corrections) {
        const list = result[key];
        if (list === undefined) throw new Error(`構文トークン ${key} が原本にありません`);
        const removed = list.splice(index, remove.length, ...insert);
        if (JSON.stringify(removed) !== JSON.stringify(remove)) throw new Error(`構文トークン ${key}[${index}] が原本と一致しません: ${JSON.stringify(removed)}`);
    }
    return result;
}

/** SAP-C02: Snow ファミリーは新規顧客へ提供されないため、物理転送の代替を Data Transfer Terminal にする。 */
export const SAP_GUIDE_CORRECTIONS: readonly Correction[] = [
    // Q11: 新規顧客の前提で、Snow の代わりに Data Transfer Terminal を正解 C にする
    ['オンプレミスの 200 TB のファイルデータを、回線が 1 Gbps しかない環境で、できるだけ早く S3 へ移したい。最も適切なのは?', '新たに AWS を利用し始めた企業が、オンプレミスの 200 TB のファイルデータを、回線が 1 Gbps しかない環境で、できるだけ早く S3 へ移したい。Enterprise Support を契約しており (Data Transfer Terminal の利用条件)、データは持ち運べるストレージ機器にコピーでき、近くに AWS Data Transfer Terminal がある。最も適切なのは?'],
    ['Snow ファミリーの物理デバイスを利用する', 'ストレージ機器を AWS Data Transfer Terminal へ持ち込み、高速回線で S3 にアップロードする'],
    ['このような大容量には物理デバイスが有利です(ただし提供状況は最新情報を確認)。', 'Snow ファミリーは新規顧客への提供が終了しているため、データをストレージ機器にコピーして Data Transfer Terminal の高速回線でアップロードする方法が有力です。拠点を使えない場合は、回線を増強 (Direct Connect のホスト型接続など) して DataSync で転送します。'],
    // Domain 4 Step 18: 表119・表124・図43・図46
    ['物理デバイスを郵送して大容量データやエッジ処理(提供状況は変更が案内されているため、最新情報を確認)', '物理デバイスを郵送して大容量データやエッジ処理(新規顧客への提供は終了。新規の物理転送は AWS Data Transfer Terminal、オンライン転送は DataSync を検討)'],
    ['提供状況は変更が案内されているため、最新情報を確認', '新規顧客への提供は終了'],
    ['回線で何か月もかかるなら最初から Snow などを検討できる', '回線で何か月もかかるなら最初から Data Transfer Terminal での物理転送や回線増強を検討できる'],
    ['DataSync Snow Transfer Family Storage Gateway', 'DataSync Data Transfer Terminal Transfer Family Storage Gateway'],
    ['物理デバイス Snow ファミリー', '物理転送 AWS Data Transfer Terminal'],
    // Step 23 早見表も Q11 と同じ代替に揃える
    ['Snow ファミリー', 'AWS Data Transfer Terminal(Snow ファミリーは新規顧客への提供終了)', '大容量データの物理転送'],
    // 図7: Permission Boundary はプリンシパルに設定がある場合だけ評価し、同一アカウントで IAM ユーザー ARN・ロールセッション ARN を指定したリソースベースの許可は制限しない
    ['C -->|はい| D{"Permission Boundary で許可されているか"}', 'C -->|はい| R{"同一アカウントのリソースベースポリシーが IAM ユーザー ARN またはロールセッション ARN を指定して Allow しているか"}\nR -->|はい| Y\nR -->|いいえ| D{"プリンシパルに Permission Boundary が設定されているか"}\nD -->|いいえ| E\nD -->|はい| F{"Permission Boundary で許可されているか"}\nF -->|いいえ| X\nF -->|はい| E'],
    ['D -->|いいえ| X\nD -->|はい| E{"いずれかのポリシーで明示的に Allow があるか"}', 'E{"アイデンティティベースポリシー、またはロール ARN を指定したリソースベースポリシーで明示的に Allow があるか"}'],
    // Step 22 #7: 読み取りを受け付けないのは Multi-AZ DB インスタンスのスタンバイで、Multi-AZ DB クラスターは読み取り可能なスタンバイを持つ
    ['RDS Multi-AZ で読み取りを分散できる', 'RDS Multi-AZ DB インスタンスで読み取りを分散できる'],
    ['Multi-AZ は可用性のため。分散にはリードレプリカ', 'Multi-AZ DB インスタンスのスタンバイは可用性のためで、読み取りを受け付けない。読み取りのスケーリングにはリードレプリカを使う (Multi-AZ DB クラスターは読み取り可能なスタンバイインスタンスを持つ)'],
];
