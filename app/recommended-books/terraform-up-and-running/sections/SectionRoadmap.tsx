// app/recommended-books/terraform-up-and-running/sections/SectionRoadmap.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
    checkedItems: Record<number, boolean>;
    onCheckboxChange: (index: number) => void;
    completedCount: number;
}

export function SectionRoadmap({ Diagram, checkedItems, onCheckboxChange, completedCount }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="学習ロードマップチェックリスト">学習ロードマップ・チェックリスト</h2>
<h3 id="初学者向け学習ステップ">初学者向け学習ステップ</h3>
<Diagram id="diag-19" ariaLabel="Terraform初学者から本番運用エンジニアまでのステップバイステップ学習ロードマップ" />
<h3 id="学習導入チェックリスト">学習・導入チェックリスト</h3>
<div className="checklist-card">{' '}<div className="checklist-header">{' '}<span className="checklist-title">チェックリスト</span><span className="checklist-counter">{completedCount} / 9 完了</span>{' '}</div>{' '}<ul className="checklist">{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[0]} onChange={() => onCheckboxChange(0)} /><code>terraform version</code>で意図したバージョンが使われているか確認した</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[1]} onChange={() => onCheckboxChange(1)} />Stateをローカルではなくリモートバックエンド（S3等）に置き、<code>use_lockfile = true</code>でロックを有効化した</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[2]} onChange={() => onCheckboxChange(2)} />すべての<code>variable</code>/<code>output</code>に<code>description</code>と<code>type</code>を明記した</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[3]} onChange={() => onCheckboxChange(3)} />モジュールの<code>source</code>をタグ・コミットハッシュで固定し、ブランチ名を直接参照していない</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[4]} onChange={() => onCheckboxChange(4)} />シークレットは<code>sensitive = true</code>任せにせず、可能な範囲でEphemeral Resources/Write-Only Argumentsへの移行を検討した</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[5]} onChange={() => onCheckboxChange(5)} />CIで<code>terraform fmt -check</code>・<code>terraform validate</code>・<code>terraform test</code>を実行している</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[6]} onChange={() => onCheckboxChange(6)} /><code>terraform plan</code>の出力を人がレビューしてから<code>apply</code>する運用になっている</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[7]} onChange={() => onCheckboxChange(7)} />本番の重要リソースに<code>prevent_destroy</code>を設定した</label>{' '}</li>{' '}<li>{' '}<label><input type="checkbox" checked={!!checkedItems[8]} onChange={() => onCheckboxChange(8)} />OPA/Sentinel/Checkov等、最低1つのPolicy as Codeレイヤーを導入した</label>{' '}</li>{' '}</ul>{' '}</div>
<h3 id="資格取得を目指す場合の補足">資格取得を目指す場合の補足</h3>
<p>{' '}HashiCorp Certified: Terraform Associateは2026年1月8日に旧003版から<strong>004版</strong>へ刷新され、Terraform 1.12時点の機能（安全なライフサイクル戦略、カスタム条件、HCP Terraformプロジェクト等）に対応した出題内容になっています。本ガイドの第2〜5部・第9部の内容は、同資格の主要出題範囲（Terraformの基本概念、ワークフロー、State、モジュール、HCP Terraform）と重なっています。{' '}</p>

        </section>
    );
}
