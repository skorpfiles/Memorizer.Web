import ButtonsSection from './ResponseSpace/ButtonsSection';
import NoteSection from './ResponseSpace/NoteSection';
import styles from './ResponseSpace.module.css';
import './TrainingSpace.css';

function ResponseSpace(props) {
    return (
        <div className={`column training-space-width ${styles['container']}`}>
            <NoteSection
                questionType={props.questionType}
                trainingStage={props.trainingStage} />
            <ButtonsSection
                questionType={props.questionType}
                trainingStage={props.trainingStage}
                typedAnswersCheckResultMode={props.typedAnswersCheckResultMode} />
        </div>
    )
}

export default ResponseSpace;