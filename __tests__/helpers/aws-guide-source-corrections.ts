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
];

/** SAP-C02: Snow ファミリーは新規顧客へ提供されないため、物理転送の代替を Data Transfer Terminal にする。 */
export const SAP_GUIDE_CORRECTIONS: readonly Correction[] = [
    // Q11: 新規顧客の前提で、Snow の代わりに Data Transfer Terminal を正解 C にする
    ['オンプレミスの 200 TB のファイルデータを、回線が 1 Gbps しかない環境で、できるだけ早く S3 へ移したい。最も適切なのは?', '新たに AWS を利用し始めた企業が、オンプレミスの 200 TB のファイルデータを、回線が 1 Gbps しかない環境で、できるだけ早く S3 へ移したい。データは持ち運べるストレージ機器にコピーでき、近くに AWS Data Transfer Terminal がある。最も適切なのは?'],
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
];
