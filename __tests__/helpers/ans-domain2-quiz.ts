/** Remove only quiz presentation changes before comparing the original content inventory. */
export function normalizeAnsDomain2Quiz(source: Element): Element {
    const root = source.cloneNode(true) as Element;
    const quiz = root.querySelector('.review-quiz');
    if (!quiz) return root;
    const intro = document.createElement('p');
    intro.textContent = ' 実際の試験は難易度が高く、複数選択が中心です。ここでは理解確認用です。折りたたみの中に解答があります。 ';
    quiz.before(intro);
    quiz.querySelectorAll('.quiz-card').forEach(card => {
        const paragraph = document.createElement('p');
        paragraph.innerHTML = card.querySelector('legend')!.innerHTML;
        const number = paragraph.querySelector('.quiz-question-number')!;
        const strong = document.createElement('strong');
        strong.textContent = number.textContent;
        number.replaceWith(strong);
        const list = document.createElement('ul');
        card.querySelectorAll('.quiz-option').forEach(option => {
            const item = document.createElement('li');
            item.append(option.querySelector('.quiz-letter')!.textContent + '. ');
            const text = option.querySelector('span:last-child')!;
            item.insertAdjacentHTML('beforeend', text.innerHTML);
            list.append(item);
        });
        const answer = card.querySelector('details')!;
        answer.querySelector('summary')!.textContent = '解答と解説';
        quiz.before(paragraph, list, answer);
    });
    quiz.remove();
    return root;
}
