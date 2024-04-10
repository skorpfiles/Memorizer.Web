import QuestionIcon from './question.png';
import styles from './NeutralQuestionAndAnswer.module.css';
function NeutralQuestionAndAnswer(props) {
    return (
        <div className={`column ${styles['container']}`}>
            <div className={`row ${styles['question-container']}`}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className={`font--question-above-answer ${styles['question-text']}`}>How to create a second conditional sentence?</div>
            </div>
            <div className={`font--main-for-training-questions ${styles['answer']}`}>Second conditional sentences use a past tense in the 'if' clause and would + infinitive in the main clause.</div>
        </div>
    );
}

export default NeutralQuestionAndAnswer;