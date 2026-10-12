'use client';
import { useState } from 'react';
import { CHECK_COUNT } from './constants';
/** 9項目のチェック状態・件数・進捗・全完了表示を同期する。 */
export function Checklist() {
    const [checked, setChecked] = useState<Set<number>>(() => new Set());
    const toggle = (index: number) => setChecked(previous => {
        const next = new Set(previous);
        if (next.has(index)) next.delete(index); else next.add(index);
        return next;
    });
    return (<div className="checklist">
<div className="cl-head">
<span className="cl-title">{"理解度セルフチェック"}</span>
<span className="cl-count" aria-live="polite"><b>{checked.size}</b>{" / 9"}</span>
</div>
<div className="cl-bar">
<div className="cl-fill" style={{ width: `${checked.size / CHECK_COUNT * 100}%` }}>

</div>
</div>
<ul>
<li className={checked.has(0) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(0)} onChange={() => toggle(0)} /><span className="cl-text">{"Lambda のパッケージ形式と上限（50MB / 250MB / 10GB / レイヤー 5）を言える"}</span></label></li>
{" "}
<li className={checked.has(1) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(1)} onChange={() => toggle(1)} /><span className="cl-text">{"環境変数・Parameter Store・Secrets Manager・AppConfig の使い分けを説明できる"}</span></label></li>
{" "}
<li className={checked.has(2) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(2)} onChange={() => toggle(2)} /><span className="cl-text"><code>{"sam local"}</code>{" / "}<code>{"sam sync"}</code>{" / "}<code>{"sam deploy --config-env"}</code>{" の違いがわかる"}</span></label></li>
{" "}
<li className={checked.has(3) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(3)} onChange={() => toggle(3)} /><span className="cl-text">{"API Gateway のステージ・ステージ変数・カナリア・カスタドメインを説明できる"}</span></label></li>
{" "}
<li className={checked.has(4) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(4)} onChange={() => toggle(4)} /><span className="cl-text">{"Lambda のバージョン／エイリアス／重み付けルーティングを使える"}</span></label></li>
{" "}
<li className={checked.has(5) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(5)} onChange={() => toggle(5)} /><span className="cl-text">{"CloudFormation の変更セット・更新動作・ロールバック・ドリフトを説明できる"}</span></label></li>
{" "}
<li className={checked.has(6) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(6)} onChange={() => toggle(6)} /><span className="cl-text">{"buildspec.yml / appspec.yml の役割と置き場所を言える"}</span></label></li>
{" "}
<li className={checked.has(7) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(7)} onChange={() => toggle(7)} /><span className="cl-text">{"各サービスで選べるデプロイ戦略と、ロールバック方法を対応づけられる"}</span></label></li>
{" "}
<li className={checked.has(8) ? 'chk done' : 'chk'}><label><input type="checkbox" checked={checked.has(8)} onChange={() => toggle(8)} /><span className="cl-text">{"Q Developer の件（後継 Kiro）と Copilot CLI 終了を把握している"}</span></label></li>
{" "}
</ul>
<div className="cl-done" hidden={checked.size !== CHECK_COUNT}>
{"すべて確認できました。次は練習問題や公式ドキュメントで仕上げましょう。"}
</div>
</div>);
}
