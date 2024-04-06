import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
import styles from './QuestionStageSection.module.css';
function QuestionStageSection(props) {
    return (
        <div className={`row ${styles['content']}`}>
            <NewQuestionSignal />
            <Stage name="Learn" isActive={ (props.trainingStage === 'learn') } />
            <Stage name="Train" isActive={ (props.trainingStage === 'train') } />
            <Stage name="Check" isActive={ (props.trainingStage === 'check') } />
        </div>
    )
}

export default QuestionStageSection;