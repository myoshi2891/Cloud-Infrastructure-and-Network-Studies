import Quiz from "../Quiz";

export default function QuizSection() {
    return (
        <section className="guide-section" data-section="quiz">
            <h2 id="8-確認シナリオ-答え付き" tabIndex={-1}>8. 確認シナリオ (答え付き)</h2>
            <Quiz />
        </section>
    );
}
