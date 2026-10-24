import NavBar from "./NavBar";
import Foundation from "./sections/Foundation";
import Task11 from "./sections/Task11";
import Task12 from "./sections/Task12";
import Task13 from "./sections/Task13";
import Task14 from "./sections/Task14";
import Task15 from "./sections/Task15";
import Summary from "./sections/Summary";
import QuizSection from "./sections/QuizSection";
import References from "./sections/References";

/**
 * AWS SAP-C02 Domain 1 (組織の複雑さに対応する設計) 完全対策ガイド。
 * 原本の全11セクション、49表、19図、1コードブロック、確認シナリオ6問を完全収録。
 */
export default function SapDomain1Guide() {
    return (
        <div className="sap-domain1-page layout">
            <NavBar />
            <main className="main">
                <Foundation />
                <Task11 />
                <Task12 />
                <Task13 />
                <Task14 />
                <Task15 />
                <Summary />
                <QuizSection />
                <References />
            </main>
        </div>
    );
}
