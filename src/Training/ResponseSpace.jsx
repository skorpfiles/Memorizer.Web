import ButtonsSection from './ResponseSpace/ButtonsSection';
import NoteSection from './ResponseSpace/NoteSection';
import styles from './ResponseSpace.module.css';
import './TrainingSpace.css';

function ResponseSpace() {
    return (
        <div className={`column training-space-width ${styles['container']}`}>
            <NoteSection questionType='task' trainingStage='train' />
            <ButtonsSection questionType='task' trainingStage='train' typedAnswersCheckResultMode='incorrect' />
        </div>
    )
}

export default ResponseSpace;