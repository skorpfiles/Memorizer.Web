import QuestionIcon from './question.png';
import styles from './NeutralQuestionAndAnswer.module.css';
import { useSelector } from 'react-redux';
function NeutralQuestionAndAnswer() {
    const questionText = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].text);
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const untypedAnswer = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].untypedAnswer);
    const typedAnswers = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].typedAnswers);

    const resultAnswer = questionType === 'typedAnswers' ? typedAnswers.map(ans=>ans.text).join('; ') : untypedAnswer;

    return (
        <div className={`column ${styles['container']}`}>
            <div className={`row ${styles['question-container']}`}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className={`font--question-above-answer ${styles['question-text']}`}>{questionText}</div>
            </div>
            <div className={`font--main-for-training-questions ${styles['answer']}`}>{resultAnswer}</div>
        </div>
    );
}

export default NeutralQuestionAndAnswer;