import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
import styles from './QuestionStageSection.module.css';

import { useSelector } from 'react-redux';

function QuestionStageSection() {
    const trainingStage = useSelector(state => state.trainingState.trainingStage);

    return (
        <div className={`row ${styles['content']}`}>
            <NewQuestionSignal />
            <Stage name="Learn" isActive={ (trainingStage === 'learn') } />
            <Stage name="Train" isActive={ (trainingStage === 'train') } />
            <Stage name="Check" isActive={ (trainingStage === 'check') } />
        </div>
    )
}

export default QuestionStageSection;