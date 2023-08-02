import QuickTrainingConfigurationPage from "../Pages/ConfigureTraining/QuickTrainingConfigurationPage";
import ReturnToMainPage from "../ReturnToMainPage";

function SelectTrainingRouteElement(props) {
    return (
        <div className="RouteElementWithReturnButton">
            <ReturnToMainPage />
            <QuickTrainingConfigurationPage currentUser={props.currentUser} />
        </div>
    );
}

export default SelectTrainingRouteElement;