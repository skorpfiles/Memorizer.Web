import SelectTrainingPage from "../Pages/ConfigureTraining/SelectTrainingPage";
import ReturnToPage from "../ReturnToPage";

function SelectTrainingRouteElement(props) {
    return (
        <div className="route-element-with-return-button">
            <ReturnToPage path="/" text="Return to the main page" />
            <SelectTrainingPage currentUser={props.currentUser} />
        </div>
    );
}

export default SelectTrainingRouteElement;