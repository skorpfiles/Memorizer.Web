import QuickTrainingConfigurationPage from "../Pages/ConfigureTraining/QuickTrainingConfigurationPage";
import ReturnToMainPage from "../ReturnToMainPage";

function SelectTrainingRouteElement() {
    return (
        <div className="RouteElementWithReturnButton">
            <ReturnToMainPage />
            <QuickTrainingConfigurationPage />
        </div>
    );
}

export default SelectTrainingRouteElement;