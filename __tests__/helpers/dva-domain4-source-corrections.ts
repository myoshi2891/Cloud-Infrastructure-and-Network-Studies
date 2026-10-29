import { withSourceCorrections } from './aip-source-corrections';

/** after 指定時は、直前の表セルが after と一致するセルだけを訂正する。 */
type Correction = readonly [from: string, to: string, after?: string];

const UNUSED = '登録済みターゲットがない、または全ターゲットが unused(未使用)状態';
const S24_FIX = 'ターゲットの登録状況、ロードバランサーで有効な AZ、ターゲットの状態(unused の理由)を確認';
const S27_CAUSE = '登録済みターゲットなし / 全ターゲットが unused(未使用)';
const S27_FIX = 'ターゲットの登録状況・ターゲットの状態';

/**
 * DVA Domain 4: AWS公式ドキュメントにもとづく原本からの訂正。原本fixtureは固定Gitの証跡として改変せず、表示内容の期待値にだけ適用する。
 * - ALB が生成する 503 は、ターゲットグループが空、または登録済みターゲットがすべて unused の場合。全ターゲットが異常な場合はフェイルオープンする
 *   https://docs.aws.amazon.com/elasticloadbalancing/latest/application/load-balancer-troubleshooting.html
 * - ProjectionExpression は転送量を減らすが、読み取り容量はアイテム全体のサイズで消費される
 *   https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/Expressions.ProjectionExpressions.html
 * - SQS の可視性タイムアウトは関数タイムアウトの 6 倍に MaximumBatchingWindowInSeconds を加えた値以上
 *   https://docs.aws.amazon.com/lambda/latest/dg/services-sqs-configure.html
 */
export const DVA_DOMAIN4_CORRECTIONS: readonly Correction[] = [
    ['ALB の 正常なターゲットがない', 'ALB が生成する 503: ターゲットグループが空、または登録済みターゲットがすべて unused(未使用)状態'],
    ['正常なターゲットが 0 → ターゲットグループのヘルスチェック設定と、アプリの応答を確認', `${UNUSED} → ターゲットの登録状況と、unused の原因(ターゲットの AZ がロードバランサーで有効か、ターゲットグループがリスナーで使われているか、インスタンスが停止していないか)を確認`],
    ['ProjectionExpression で取得する項目を絞り、転送量・消費容量を削減', 'ProjectionExpression で取得する項目を絞り、転送量を削減(消費する読み取り容量はアイテム全体のサイズで計算されるため減らない)'],
    ['ProjectionExpression、Scan → Query への変更', 'Scan → Query への変更(消費容量を削減)。ProjectionExpression は転送量を減らすが、消費容量は減らない'],
    ['正常なターゲットがない', UNUSED, 'ALB の 503'],
    ['ヘルスチェックの設定・アプリの状態', S24_FIX],
    ['正常なターゲットがゼロ', UNUSED],
    ['A. ターゲットグループに正常なターゲットがあるか(ヘルスチェックの状態)', 'A. ターゲットグループにターゲットが登録され、unused(未使用)状態になっていないか(ターゲットの状態)'],
    ['ALB の 503 は 正常なターゲットがない 場合。ヘルスチェックの状態を確認', 'ALB の 503 は 登録済みターゲットがない、または登録済みターゲットがすべて unused(未使用)状態 の場合に返る。全ターゲットがヘルスチェックに失敗した場合は、ALB はフェイルオープンして全ターゲットへ転送する。ヘルスチェックの状態は診断材料として併せて確認'],
    ['ヘルスチェック', S27_FIX, '正常なターゲットなし'],
    ['正常なターゲットなし', S27_CAUSE],
    ['可視性タイムアウト ≥ 6 × 関数タイムアウト、冪等キー', '可視性タイムアウト ≥ 6 × 関数タイムアウト + MaximumBatchingWindowInSeconds、冪等キー'],
    ['関数のタイムアウトより長く(目安 6 倍以上)', '関数のタイムアウトの 6 倍 + MaximumBatchingWindowInSeconds 以上'],
];

const squash = (value: string): string => value.replace(/\s+/g, '');

/** 空白を除いた結合テキスト（節全文・配置）では、文脈付き訂正を前後のセルごと置換する。 */
const JOINED_CORRECTIONS: readonly Correction[] = [
    ['ALBの503正常なターゲットがないヘルスチェックの設定・アプリの状態', squash(`ALB の 503${UNUSED}${S24_FIX}`)],
    ['ALB503正常なターゲットなしヘルスチェックALB504', squash(`ALB 503${S27_CAUSE}${S27_FIX}ALB 504`)],
];

/** 空白を除いた fixture.structure 向けの訂正。 */
export const DVA_DOMAIN4_SQUASHED_CORRECTIONS: readonly Correction[] = [
    ...JOINED_CORRECTIONS,
    ...DVA_DOMAIN4_CORRECTIONS.map(([from, to, after]): Correction => after === undefined ? [squash(from), squash(to)] : [squash(from), squash(to), squash(after)]),
];

/** 空白を保持した inventory・付録Aの原文へ訂正を適用する。 */
export const withDvaDomain4Corrections = <T,>(value: T): T => withSourceCorrections(value, DVA_DOMAIN4_CORRECTIONS);

/** 空白を除いた fidelity structure へ訂正を適用する。 */
export const withDvaDomain4SquashedCorrections = <T,>(value: T): T => withSourceCorrections(value, DVA_DOMAIN4_SQUASHED_CORRECTIONS);
