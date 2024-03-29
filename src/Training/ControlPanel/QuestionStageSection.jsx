import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
import styles from './QuestionStageSection.module.css';
function QuestionStageSection() {
    return (
        <div className={`row ${styles['content']}`}>
            <NewQuestionSignal />
            <Stage name="Learn" />
            <Stage name="Train" isActive={true} />
        </div>
    )
}

export default QuestionStageSection;