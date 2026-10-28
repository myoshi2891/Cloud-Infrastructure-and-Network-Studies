/** 原本の文言・順序を保ち、問題と選択肢に表示用のラッパーだけを追加する。 */
export function stylePracticeMarkup(markup, answers) {
    let count = 0;
    const cards = markup.replace(/<p><strong>\{"問 (\d+)\."\}<\/strong>[\s\S]*?<\/ul>/g, (question, number) => {
        count++;
        const id = `practice-question-${number}`;
        const answer=answers[Number(number)-1];
        if(!answer)throw new Error('Missing source answer '+number);
        return `<PracticeQuestion number={${number}} correct={${JSON.stringify(answer.correct)}} explanation={<>${answer.explanation}</>}>\n${question.replace('<p>', `<p id="${id}">`)}\n</PracticeQuestion>`;
    });
    if(count !== 13) throw new Error(`Expected 13 unchanged practice questions, found ${count}`);
    return cards.replace('className="table-wrap"', 'className="table-wrap practice-answers"');
}
