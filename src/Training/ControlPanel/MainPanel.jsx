import QuestionStageSection from './QuestionStageSection';
import QuestionPropertiesSection from './QuestionPropertiesSection';
import TrainingProgressSection from './TrainingProgressSection';
function MainPanel() {
    return (
        <div style={{ "display": "flex", "flexDirection": "column", "backgroundImage": "linear-gradient(to bottom, white, #ABC0E4 74%, #ABC0E4 83%, #C7D5ED)" }}>
            <QuestionStageSection/>
            <QuestionPropertiesSection/>
            <TrainingProgressSection/>
        </div>
    );
}

export default MainPanel;