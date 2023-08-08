import SelectTrainingPage from "../Pages/ConfigureTraining/SelectTrainingPage";
import ReturnToMainPage from "../ReturnToMainPage";

function SelectTrainingRouteElement(props) {
    return (
        <div className="RouteElementWithReturnButton">
            <ReturnToMainPage />
            <SelectTrainingPage currentUser={props.currentUser} />
        </div>
    );
}

export default SelectTrainingRouteElement;