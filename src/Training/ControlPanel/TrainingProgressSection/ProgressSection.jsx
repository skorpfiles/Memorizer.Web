import styles from './ProgressSection.module.css';
import { useSelector } from 'react-redux';
function ProgressSection() {
    const questionsCount = useSelector(state => state.trainingState.questionsCount);
    const currentQuestionIndex = useSelector(state => state.trainingState.currentQuestionIndex);

    return (
        <div className={styles['content']}>{currentQuestionIndex+1} / {questionsCount}</div>
    );
}

export default ProgressSection;