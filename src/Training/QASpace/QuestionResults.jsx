import QuestionIcon from './question.png';
import styles from './QuestionResults.module.css';
import { useSelector } from 'react-redux';
import PenIcon from './pen.png';

function QuestionResults() {
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const questionText = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].text);
    const untypedAnswer = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].untypedAnswer);
    const typedAnswers = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].typedAnswers);
    const givenTypedAnswers = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].givenTypedAnswers);
    const isAnswerCorrect = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].isAnswerCorrect);
    const iDontKnow = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].iDontKnow);

    const typedAnswersMode = (questionType === 'typedAnswers' || questionType === 'untypedAndTypedAnswers');
    const untypedAnswerMode = (questionType === 'untypedAnswer' || questionType === 'untypedAndTypedAnswers');
    const htmlAnswers = [];

    let givenTypedAnswersTexts = [];

    if (typedAnswersMode) {
        givenTypedAnswersTexts = givenTypedAnswers.map(ans => ans.text);
        for (let i = 0; i < typedAnswers.length; i++) {
            htmlAnswers.push(givenTypedAnswersTexts.includes(typedAnswers[i].text) ? (<span key={typedAnswers[i].text}>{typedAnswers[i].text}</span>) : (<span className={styles['red-font-color']} key={typedAnswers[i].text}>{typedAnswers[i].text}</span>));
            if (i < typedAnswers.length - 1) {
                htmlAnswers.push('; ');
            }
        }
    }

    let resultMessage = null;

    if (typedAnswersMode) {
        if (isAnswerCorrect) {
            resultMessage = (<div className={`font--main-for-training-questions ${styles['correct-result-message']}`}>correct</div>);
        }
        else {
            if (iDontKnow) {
                resultMessage = (<div className={`font--default ${styles['incorrect-result-message']}`}>You didn't remember the answer.<br />The question will be retrained soon.</div>);
            }
            else {
                resultMessage = (<div className={`font--default ${styles['incorrect-result-message']}`}>You have some mistakes.<br />The question will be retrained during the next trainings.</div>);
            }
        }
    }
    else {
        resultMessage = null;
    }
    

    return (
        <div className={`column ${styles['container']}`}>
            <div className={styles['question-container']}>
                <img className='iconic-question--icon' src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className={`iconic-question--text font--question-above-answer ${styles['question-text']}`}>{questionText}</div>
            </div>

            {untypedAnswerMode && typedAnswersMode && (
                <div className={`row font--main-for-training-questions border-radius-small ${styles['answer']}`}>
                    <img className='iconic-question--icon' src={PenIcon} width='24rem' alt='Typed Answers' title='Typed Answers' />
                    <div className={`iconic-question--text font--main-for-training-questions ${styles['typed-answers-text']}`}>{htmlAnswers.map(ans => ans)}</div>
                </div>
            )}
            {untypedAnswerMode && typedAnswersMode && !isAnswerCorrect && !iDontKnow && givenTypedAnswersTexts.length > 0 && (<div className='font--default'>Incorrect answers: {givenTypedAnswersTexts.filter(ans => !typedAnswers.map(ans => ans.text).includes(ans)).join('; ')}</div>)}

            {typedAnswersMode && untypedAnswerMode && (<div className={styles['separator']} />)}

            {untypedAnswerMode && (<div className={`iconic-question--text font--main-for-training-questions border-radius-small ${styles['answer']}`}>{untypedAnswer}</div>)}
            {!untypedAnswerMode && typedAnswersMode && (<div className={`iconic-question--text font--main-for-training-questions border-radius-small ${styles['answer']}`}>{htmlAnswers.map(ans => ans)}</div>)}
            {!untypedAnswerMode && typedAnswersMode && !isAnswerCorrect && !iDontKnow && givenTypedAnswersTexts.length > 0 && (<div className='font--default'>Incorrect answers: {givenTypedAnswersTexts.filter(ans => !typedAnswers.map(ans => ans.text).includes(ans)).join('; ')}</div>)}

            {resultMessage}
        </div>
    );
}

export default QuestionResults;