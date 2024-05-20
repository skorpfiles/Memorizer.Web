import styles from './MainText.module.css';
import { useSelector } from 'react-redux';

function MainText() {
    const questionText = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].text);
    return (
        <div className={`column ${styles['container']}`}>
            <div className='font--main-for-training-questions'>{questionText}</div>
        </div>
    );
}

export default MainText;