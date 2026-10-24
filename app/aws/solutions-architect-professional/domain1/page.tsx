import type { Metadata } from "next";
import SapDomain1Guide from "./SapDomain1Guide";
import "./page.css";

export const metadata: Metadata = {
    title: "AWS Certified Solutions Architect - Professional (SAP-C02) Content Domain 1: Design Solutions for Organizational Complexity 初学者向けステップバイステップガイド",
    description: "SAP-C02 Domain 1 (組織の複雑さに対応する設計) を全5タスク、49表、19図、1コード例、確認問題6問で学ぶ完全対策ガイド。",
};

/**
 * SAP-C02 Domain 1 学習ガイドの Server 入口。
 */
export default function Page() {
    return <SapDomain1Guide />;
}
