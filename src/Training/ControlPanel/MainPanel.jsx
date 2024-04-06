import QuestionStageSection from './QuestionStageSection';
import QuestionPropertiesSection from './QuestionPropertiesSection';
import TrainingProgressSection from './TrainingProgressSection';
import styles from './MainPanel.module.css';
function MainPanel(props) {
    return (
        <div className={`column ${styles['content']}`}>
            <QuestionStageSection trainingStage={props.trainingStage} />
            <QuestionPropertiesSection/>
            <TrainingProgressSection/>
        </div>
    );
}

export default MainPanel;