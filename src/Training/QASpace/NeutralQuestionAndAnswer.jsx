import QuestionIcon from './question.png';
import styles from './NeutralQuestionAndAnswer.module.css';
import { useSelector } from 'react-redux';
function NeutralQuestionAndAnswer() {
    const questionText = useSelector(state => state.trainingState.currentQuestion.text);
    const questionType = useSelector(state => state.trainingState.currentQuestion.type);
    const untypedAnswer = useSelector(state => state.trainingState.currentQuestion.untypedAnswer);
    const typedAnswers = useSelector(state => state.trainingState.currentQuestion.typedAnswers);

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