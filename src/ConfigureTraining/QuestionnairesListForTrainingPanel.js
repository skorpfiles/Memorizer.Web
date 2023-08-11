import QuestionnairesListForTrainingElement from "./QuestionnairesListForTrainingElement";
import "./QuestionnairesListForTrainingPanel.css";

function QuestionnairesListForTrainingPanel(props) {
    return (
        <div className="Panel SmallBorderRadius FloatContainer">
            <ul className="Font-MainForControls TightList">
                {props.selectedQuestionnaires.map(item => (<QuestionnairesListForTrainingElement key={item.id} name={item.name} handleDeleteElement={()=>props.handleDeleteQuestionnaire(item.id)} />))}
            </ul>
            <button className="MainButton RightButton Font-MainForControls" onClick={props.handleAddingAnotherQuestionnaire}>Add...</button>
        </div>
    )
}

export default QuestionnairesListForTrainingPanel;