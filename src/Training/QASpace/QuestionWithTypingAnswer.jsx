import TypingAnswerPanel from './TypingAnswerPanel';
import styles from './QuestionWithTypingAnswer.module.css';
function QuestionWithTypingAnswer() {
    return (
        <div className={`column ${styles['outer-container']}`}>
            <div className={`column ${styles['inner-container']}`}>
                <div className={`font--main-for-training-questions ${styles['question']}`}>table</div>
                <div className='column full-width'>
                    <TypingAnswerPanel />
                </div>
            </div>
        </div>
    );
}

export default QuestionWithTypingAnswer;