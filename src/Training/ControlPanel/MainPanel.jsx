import QuestionStageSection from './QuestionStageSection';
import QuestionPropertiesSection from './QuestionPropertiesSection';
import TrainingProgressSection from './TrainingProgressSection';
import styles from './MainPanel.module.css';
function MainPanel() {
    return (
        <div className={`column ${styles['content']}`}>
            <QuestionStageSection />
            <QuestionPropertiesSection/>
            <TrainingProgressSection/>
        </div>
    );
}

export default MainPanel;