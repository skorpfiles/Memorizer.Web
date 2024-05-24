import TypingAnswerPanel from './TypingAnswerPanel';
import styles from './QuestionWithTypingAnswer.module.css';
import { useSelector } from 'react-redux';
import MultilineText from '../../Controls/MultilineText';

function QuestionWithTypingAnswer() {
    const questionText = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].text);

    return (
        <div className={`column ${styles['outer-container']}`}>
            <div className={`column ${styles['inner-container']}`}>
                <div className={`font--main-for-training-questions ${styles['question']}`}>
                    <MultilineText text={questionText} />
                </div>
                <div className='column full-width'>
                    <TypingAnswerPanel />
                </div>
            </div>
        </div>
    );
}

export default QuestionWithTypingAnswer;