import Questionnaire from './Questionnaire';
import AddButton from './AddButton';

function QuestionnairesListForTrainingPanel(props) {
    return (
        <div className='panel-for-flex-wrap-elements border-radius-small display-flex' id='questionnairesListForTrainingPanel'>
            {props.selectedQuestionnaires.map(item => (<Questionnaire key={item.id} name={item.name} deleteQuestionnaire={() => props.handleDeleteQuestionnaire(item.id)} />))}
            <AddButton onClick={props.handleAddingAnotherQuestionnaire} />
        </div>
    )
}

export default QuestionnairesListForTrainingPanel;