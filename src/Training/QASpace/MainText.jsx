import styles from './MainText.module.css';
import { useSelector } from 'react-redux';

function MainText() {
    const questionText = useSelector(state => state.trainingState.currentQuestion.text);
    return (
        <div className={`column ${styles['container']}`}>
            <div className='font--main-for-training-questions'>{questionText}</div>
        </div>
    );
}

export default MainText;