import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
import styles from './QuestionStageSection.module.css';

import { useSelector } from 'react-redux';

function QuestionStageSection() {
    const trainingStage = useSelector(state => state.trainingState.trainingStage);
    const isQuestionNew = useSelector(state => state.trainingState.currentQuestion.myStatus.isNew);

    return (
        <div className={`row ${styles['content']}`}>
            {isQuestionNew && (<NewQuestionSignal />)}
            <Stage name="Learn" isActive={ (trainingStage === 'learn') } />
            <Stage name="Train" isActive={ (trainingStage === 'train') } />
            <Stage name="Check" isActive={ (trainingStage === 'check') } />
        </div>
    )
}

export default QuestionStageSection;