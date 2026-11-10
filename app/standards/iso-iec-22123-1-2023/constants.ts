/** 原本の18項目の目次。監視対象もこの配列から導出する。 */
export const NAV_ITEMS = [
  {
    "id": "0-%E3%81%93%E3%81%AE%E8%A6%8F%E6%A0%BC%E3%82%92%E4%B8%80%E8%A8%80%E3%81%A7%E3%81%84%E3%81%86%E3%81%A8",
    "text": "0. この規格を一言でいうと"
  },
  {
    "id": "step-1-%E8%A6%8F%E6%A0%BC%E3%81%AE%E5%9F%BA%E6%9C%AC%E6%83%85%E5%A0%B1%E3%81%A8%E4%BD%8D%E7%BD%AE%E3%81%A5%E3%81%91",
    "text": "Step 1: 規格の基本情報と位置づけ"
  },
  {
    "id": "step-2-2023%E5%B9%B4%E7%89%88%E3%81%A7%E4%BD%95%E3%81%8C%E5%A4%89%E3%82%8F%E3%81%A3%E3%81%9F%E3%81%8B",
    "text": "Step 2: 2023年版で何が変わったか"
  },
  {
    "id": "step-3-%E8%A6%8F%E6%A0%BC%E3%81%AE%E6%A7%8B%E6%88%90%E7%AC%AC3%E7%AB%A0%E3%81%AE14%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AA",
    "text": "Step 3: 規格の構成（第3章の14カテゴリ）"
  },
  {
    "id": "step-4-%E5%9F%BA%E7%A4%8E%E7%94%A8%E8%AA%9E--cloud-computing--cloud-service--cloud-solution",
    "text": "Step 4: 基礎用語 ― cloud computing / cloud service / cloud solution"
  },
  {
    "id": "step-5-%E9%85%8D%E5%82%99%E3%83%A2%E3%83%87%E3%83%AB%E3%83%87%E3%83%97%E3%83%AD%E3%82%A4%E3%83%A1%E3%83%B3%E3%83%88%E3%83%A2%E3%83%87%E3%83%AB",
    "text": "Step 5: 配備モデル（デプロイメントモデル）"
  },
  {
    "id": "step-6-%E5%BD%B9%E5%89%B2%E3%81%A8%E9%96%A2%E4%BF%82%E8%80%85party--role--csc--csp--csn",
    "text": "Step 6: 役割と関係者（party / role / CSC / CSP / CSN）"
  },
  {
    "id": "step-7-%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%81%AE%E4%B8%BB%E8%A6%81%E7%89%B9%E6%80%A7",
    "text": "Step 7: クラウドの主要特性"
  },
  {
    "id": "step-8-%E8%83%BD%E5%8A%9B%E3%82%BF%E3%82%A4%E3%83%97%E3%81%A8%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E3%82%AB%E3%83%86%E3%82%B4%E3%83%AAiaas--paas--saas-%E3%81%BB%E3%81%8B",
    "text": "Step 8: 能力タイプとサービスカテゴリ（IaaS / PaaS / SaaS ほか）"
  },
  {
    "id": "step-9-%E7%9B%B8%E4%BA%92%E9%81%8B%E7%94%A8%E6%80%A7%E3%81%A8%E5%8F%AF%E6%90%AC%E6%80%A7",
    "text": "Step 9: 相互運用性と可搬性"
  },
  {
    "id": "step-10-%E3%82%B5%E3%83%BC%E3%83%93%E3%82%B9%E5%A5%91%E7%B4%84%E3%81%BE%E3%82%8F%E3%82%8A%E3%81%AE%E7%94%A8%E8%AA%9Esla--slo--sqo",
    "text": "Step 10: サービス契約まわりの用語（SLA / SLO / SQO）"
  },
  {
    "id": "step-11-%E3%82%AF%E3%83%A9%E3%82%A6%E3%83%89%E3%83%87%E3%83%BC%E3%82%BF%E3%81%AE%E5%88%86%E9%A1%9E",
    "text": "Step 11: クラウドデータの分類"
  },
  {
    "id": "step-12-310314-%E3%81%AE%E6%A6%82%E8%A6%B3%E3%81%A8%E5%AE%9F%E5%8B%99%E3%81%A7%E3%81%AE%E4%BD%BF%E3%81%84%E6%96%B9",
    "text": "Step 12: 3.10〜3.14 の概観と実務での使い方"
  },
  {
    "id": "%E9%96%A2%E9%80%A3%E8%A6%8F%E6%A0%BCnist-sp-800-145-%E3%81%A8%E3%81%AE%E6%AF%94%E8%BC%83",
    "text": "関連規格・NIST SP 800-145 との比較"
  },
  {
    "id": "%E9%96%8B%E7%99%BA%E8%80%85%E3%82%A2%E3%83%BC%E3%82%AD%E3%83%86%E3%82%AF%E3%83%88%E3%81%AE%E8%A6%96%E7%82%B9%E3%83%AD%E3%83%83%E3%82%AF%E3%82%A4%E3%83%B3%E3%81%AE%E8%AD%B0%E8%AB%96",
    "text": "開発者・アーキテクトの視点（ロックインの議論）"
  },
  {
    "id": "%E7%90%86%E8%A7%A3%E5%BA%A6%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF",
    "text": "理解度チェック"
  },
  {
    "id": "%E8%AA%BF%E6%9F%BB%E3%81%AE%E9%99%90%E7%95%8C%E3%81%A8%E6%B3%A8%E6%84%8F%E7%82%B9",
    "text": "調査の限界と注意点"
  },
  {
    "id": "%E5%8F%82%E8%80%83%E3%82%BD%E3%83%BC%E3%82%B9%E4%B8%80%E8%A6%A7url",
    "text": "参考ソース一覧（URL）"
  }
] as const;
