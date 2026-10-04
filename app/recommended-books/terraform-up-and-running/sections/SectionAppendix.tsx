// app/recommended-books/terraform-up-and-running/sections/SectionAppendix.tsx
import React from 'react';

interface SectionProps {
    Diagram: React.ComponentType<{ id: import('../constants').DiagramId; ariaLabel: string }>;
}

export function SectionAppendix({ Diagram }: SectionProps) {
    return (
        <section className="section-block">
<h2 id="付録a-推奨リソース原著付録arecommended-reading準拠の構成">{' '}付録A: 推奨リソース（原著付録A「Recommended Reading」準拠の構成）{' '}</h2>
<p>{' '}原著の付録Aは「Books」「Blogs」「Talks」「Newsletters」「Online Forums」の5カテゴリで関連リソースを紹介する構成になっています。本ガイドでも同じカテゴリ構成で、2026年8月時点でも参照価値の高いソースを整理します。{' '}</p>
<h3 id="books関連書籍">Books（関連書籍）</h3>
<ul>{' '}<li>{' '}<em>Terraform: Up and Running, 3rd Edition</em>{' '}― Yevgeniy Brikman著（本ガイドの原著）{' '}</li>{' '}<li>{' '}<em>Fundamentals of DevOps and Software Delivery</em>{' '}― Yevgeniy Brikman著（DevOps全般の考え方を体系的に学べる姉妹書）{' '}</li>{' '}</ul>
<h3 id="blogsブログ">Blogs（ブログ）</h3>
<ul>{' '}<li>{' '}Gruntwork Blog（著者Yevgeniy Brikman本人が現在も更新するTerraform/OpenTofu/Terragrunt関連の一次情報源）{' '}</li>{' '}<li>HashiCorp公式ブログ（新機能・破壊的変更のリリースノートの一次情報源）</li>{' '}</ul>
<h3 id="talksカンファレンス動画">Talks（カンファレンス動画）</h3>
<ul>{' '}<li>{' '}HashiConf（HashiCorp主催の年次カンファレンス。Terraform Stacks等の大型発表が行われる場）{' '}</li>{' '}</ul>
<h3 id="newslettersニュースレター">Newsletters（ニュースレター）</h3>
<ul>{' '}<li>Gruntwork Newsletter（DevOps/IaCの実務トピックを定期配信）</li>{' '}</ul>
<h3 id="online-forumsオンラインフォーラム">{' '}Online Forums（オンラインフォーラム）{' '}</h3>
<ul>{' '}<li>HashiCorp Discuss（公式コミュニティフォーラム）</li>{' '}<li>{' '}GitHub Issues（<code>hashicorp/terraform</code>および<code>opentofu/opentofu</code>リポジトリ、バグ報告・仕様議論の一次情報）{' '}</li>{' '}</ul>

        </section>
    );
}
