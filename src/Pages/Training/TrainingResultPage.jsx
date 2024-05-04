import okIcon from './ok.png';
import styles from './TrainingResultPage.module.css';
import '../../Training/TrainingSpace.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { trainingStateActions } from '../../ReduxStore/training';

function TrainingResultPage() {
    const correctAnswersPercent = useSelector(state => state.trainingState.correctAnswersPercent);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    return (
        <div className='column middle-vertical-align-block training-space-width'>
            <div className={`row font--main-for-small-labels training-space-narrow-width ${styles['thanks-message-container']}`}>
                <img src={okIcon} width='88rem' alt='Great job!' />
                <div className={styles['thanks-message-text']}><p>Great Job!</p><p>Your result is {Math.round(correctAnswersPercent)}%.</p></div>
            </div>
            <div className={`font--default font--bold ${styles['instructions']}`}>Please have a break and then repeat the training.<br />Difficult questions will be trained more often than easy ones.<br />Every repetition enhances your memorization.</div>
            <button className={`main-button central-button border-radius-small font--main-for-controls training-space-narrow-width ${styles['navigate-button-up']}`}>Show detailed results</button>
            <button className={`main-button central-button border-radius-small font--main-for-controls training-space-narrow-width ${styles['navigate-button-down']}`} onClick={() => {
                dispatch(trainingStateActions.setDefault());
                navigate('/');
            }}>Return to the main page</button>
        </div>
    );
}

export default TrainingResultPage;