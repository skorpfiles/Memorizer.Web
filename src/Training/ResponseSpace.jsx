import ButtonsSection from './ResponseSpace/ButtonsSection';
import NoteSection from './ResponseSpace/NoteSection';
import LoaderSection from './ResponseSpace/LoaderSection';
import styles from './ResponseSpace.module.css';
import './TrainingSpace.css';

import { useSelector } from 'react-redux';

function ResponseSpace(props) {
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const trainingStage = useSelector(state => state.trainingState.trainingStage);
    if (questionType !== 'typedAnswers' || trainingStage === 'learn' || trainingStage === 'check') {
        return (
            <div className={`column training-space-width ${styles['container']}`}>
                <NoteSection/>
                <ButtonsSection/>
                <LoaderSection isLoading={props.questionsIsLoading} hasErrorResult={props.questionsLoadingError} />
            </div>
        );
    }
    else {
        return null;
    }
}

export default ResponseSpace;