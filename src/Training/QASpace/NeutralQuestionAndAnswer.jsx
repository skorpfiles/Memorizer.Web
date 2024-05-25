import QuestionIcon from './question.png';
import PenIcon from './pen.png';
import styles from './NeutralQuestionAndAnswer.module.css';
import { useSelector } from 'react-redux';
import MultilineText from '../../Controls/MultilineText';

function NeutralQuestionAndAnswer() {
    const questionText = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].text);
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const untypedAnswer = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].untypedAnswer);
    const typedAnswers = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].typedAnswers);

    const resultAnswer = (questionType === 'typedAnswers') ? typedAnswers.map(ans => ans.text).join('; ') : untypedAnswer;
    const additionalTypedAnswers = (questionType === 'untypedAndTypedAnswers') ? typedAnswers.map(ans => ans.text).join('; ') : null;

    return (
        <div className={`column ${styles['container']}`}>
            <div className={styles['question-container']}>
                <img className='iconic-question--icon' src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className={`iconic-question--text font--question-above-answer ${styles['question-text']}`}><MultilineText text={questionText} /></div>
            </div>
            <div className={`font--main-for-training-questions ${styles['answer']}`}><MultilineText text={resultAnswer}/></div>
            {(questionType === 'untypedAndTypedAnswers') && (
                <div className={`row ${styles['typed-answers-container']}`}>
                    <img className='iconic-question--icon' src={PenIcon} width='24rem' alt='Typed Answers' title='Typed Answers' />
                    <div className={`iconic-question--text font--main-for-training-questions ${styles['typed-answers-text']}`}>{additionalTypedAnswers}</div>
                </div>
            ) }
        </div>
    );
}

export default NeutralQuestionAndAnswer;