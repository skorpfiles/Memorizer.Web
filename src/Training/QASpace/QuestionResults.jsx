import QuestionIcon from './question.png';
import styles from './QuestionResults.module.css';
function QuestionResults(props) {
    let typedAnswersMode = props.questionType === 'typedAnswers';
    let htmlAnswers = [];

    if (typedAnswersMode) {
        const words = [
            {
                text: 'stol',
                isCorrect: false
            },
            {
                text: 'tablica',
                isCorrect: true
            }
        ];

        for (let i = 0; i < words.length; i++) {
            htmlAnswers.push(words[i].isCorrect ? (<span>{words[i].text}</span>) : (<span style={{ "color": "red" }}>{words[i].text}</span>));
            if (i < words.length - 1) {
                htmlAnswers.push('; ');
            }
        }
    }

    return (
        <div className={`column ${styles['container']}`}>
            <div className={`row ${styles['question-container']}`}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className={`font--question-above-answer ${styles['question-text']}`}>table</div>
            </div>
            <div className={`font--main-for-training-questions border-radius-small ${styles['answer']}`}>{typedAnswersMode ?
                htmlAnswers.map(ans => ans) :
                'Second conditional sentences use a past tense in the "if" clause and would + infinitive in the main clause.'}</div>
            {(typedAnswersMode && props.typedAnswersCheckResultMode === 'incorrect') && (<div className={`font--default ${styles['incorrect-result-message']}`}>You have some mistakes.<br />The question will be retrained in the next trainings.</div>)}
            {(typedAnswersMode && props.typedAnswersCheckResultMode === 'correct') && (<div className={`font--main-for-training-questions ${styles['correct-result-message']}`}>correct</div>)}
        </div>
    );
}

export default QuestionResults;