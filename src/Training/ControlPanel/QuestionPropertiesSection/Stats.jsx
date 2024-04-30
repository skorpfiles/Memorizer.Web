import Rating from './Rating';
import PenaltyPoints from './PenaltyPoints';
import styles from './Stats.module.css';
import { useSelector } from 'react-redux';
function Stats() {
    const isNew = useSelector(state => state.trainingState.currentQuestion.myStatus.isNew);
    const penaltyPoints = useSelector(state => state.trainingState.currentQuestion.myStatus.penaltyPoints);
    const rating = useSelector(state => state.trainingState.currentQuestion.myStatus.rating);
    return (
        <div className='row'>
            <PenaltyPoints value={penaltyPoints} />
            <div className={styles['separator']} />
            <Rating value={rating} isNew={isNew} />
        </div>
    );
}

export default Stats;