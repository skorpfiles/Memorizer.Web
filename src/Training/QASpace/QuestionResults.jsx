import QuestionIcon from './question.png';
import styles from './QuestionResults.module.css';
import { useSelector } from 'react-redux';
function QuestionResults() {
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const trainingStageParameters = useSelector(state => state.trainingState.trainingStageParameters);
    const questionText = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].text);
    const untypedAnswer = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].untypedAnswer);
    const typedAnswers = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].typedAnswers);
    const givenTypedAnswers = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].givenTypedAnswers);
    const isAnswerCorrect = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].isAnswerCorrect);

    const typedAnswersMode = questionType === 'typedAnswers';
    const htmlAnswers = [];

    let givenTypedAnswersTexts = [];

    if (typedAnswersMode) {
        givenTypedAnswersTexts = givenTypedAnswers.map(ans => ans.text);
        for (let i = 0; i < typedAnswers.length; i++) {
            htmlAnswers.push(givenTypedAnswersTexts.includes(typedAnswers[i].text) ? (<span key={typedAnswers[i].text}>{typedAnswers[i].text}</span>) : (<span style={{ "color": "red" }} key={typedAnswers[i].text}>{typedAnswers[i].text}</span>));
            if (i < typedAnswers.length - 1) {
                htmlAnswers.push('; ');
            }
        }
    }

    return (
        <div className={`column ${styles['container']}`}>
            <div className={`row ${styles['question-container']}`}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className={`font--question-above-answer ${styles['question-text']}`}>{questionText}</div>
            </div>
            <div className={`font--main-for-training-questions border-radius-small ${styles['answer']}`}>{typedAnswersMode ?
                htmlAnswers.map(ans => ans) :
                untypedAnswer}</div>
            {typedAnswersMode && !isAnswerCorrect && (<div className='font--default' style={{color:"red"}}>Incorrect: {givenTypedAnswersTexts.filter(ans => !typedAnswers.map(ans=>ans.text).includes(ans)).join('; ')}</div>)}

            {(typedAnswersMode && trainingStageParameters[0] === 'incorrect') && (<div className={`font--default ${styles['incorrect-result-message']}`}>You have some mistakes.<br />The question will be retrained during the next trainings.</div>)}
            {(typedAnswersMode && trainingStageParameters[0] === 'correct') && (<div className={`font--main-for-training-questions ${styles['correct-result-message']}`}>correct</div>)}
        </div>
    );
}

export default QuestionResults;