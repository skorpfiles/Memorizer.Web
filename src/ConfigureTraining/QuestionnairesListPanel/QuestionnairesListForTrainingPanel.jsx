import "./QuestionnairesListForTrainingPanel.css";
import Questionnaire from "./Questionnaire";
import AddButton from "./AddButton";

function QuestionnairesListForTrainingPanel(props) {
    return (
        <div className="PanelForFlexWrapElements SmallBorderRadius DisplayFlex">
            {props.selectedQuestionnaires.map(item => (<Questionnaire key={item.id} name={item.name} deleteQuestionnaire={() => props.handleDeleteQuestionnaire(item.id)} />))}
            <AddButton onClick={props.handleAddingAnotherQuestionnaire} />
        </div>
    )
}

export default QuestionnairesListForTrainingPanel;