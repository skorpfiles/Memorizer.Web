import QuestionIcon from './question.png';
import styles from './NeutralQuestionAndAnswer.module.css';
import { useSelector } from 'react-redux';
function NeutralQuestionAndAnswer() {
    const questionText = useSelector(state => state.trainingState.currentQuestion.text);
    const answer = useSelector(state => state.trainingState.currentQuestion.untypedAnswer);
    return (
        <div className={`column ${styles['container']}`}>
            <div className={`row ${styles['question-container']}`}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className={`font--question-above-answer ${styles['question-text']}`}>{questionText}</div>
            </div>
            <div className={`font--main-for-training-questions ${styles['answer']}`}>{answer}</div>
        </div>
    );
}

export default NeutralQuestionAndAnswer;