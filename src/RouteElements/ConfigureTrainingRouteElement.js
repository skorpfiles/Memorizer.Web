import SelectQuestionnairePage from '../Pages/ConfigureTraining/SelectQuestionnairePage';
import ReturnToMainPage from '../ReturnToMainPage';

function ConfigureTrainingRouteElement(props) {
    return (
        <div className="RouteElementWithReturnButton">
            <ReturnToMainPage />
            <SelectQuestionnairePage currentUser={props.currentUser} />
        </div>
    );
}

export default ConfigureTrainingRouteElement;