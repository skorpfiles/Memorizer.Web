import ButtonsSection from './ResponseSpace/ButtonsSection';
import NoteSection from './ResponseSpace/NoteSection';
import LoaderSection from './ResponseSpace/LoaderSection';
import styles from './ResponseSpace.module.css';
import './TrainingSpace.css';

import { useSelector } from 'react-redux';

function ResponseSpace() {
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const trainingStage = useSelector(state => state.trainingState.trainingStage);
    const answerIsSending = useSelector(state => state.answerSendingState.isExecuting);
    const answerSendingIsInError = useSelector(state => state.answerSendingState.isError);

    return (
        <div className={`column training-space-width ${styles['container']}`}>
            {(questionType !== 'typedAnswers' || trainingStage === 'learn' || trainingStage === 'check') && (<NoteSection />)}
            {(questionType !== 'typedAnswers' || trainingStage === 'learn' || trainingStage === 'check') && (<ButtonsSection />)}
            <LoaderSection isLoading={answerIsSending} hasErrorResult={answerSendingIsInError} />
        </div>
    );
}

export default ResponseSpace;