import QuickTrainingsListPanel from "../../ConfigureTraining/Quick/QuickTrainingsListPanel";
import ReturnToMainPage from "../../ReturnToMainPage";

function QuickTrainingConfigurationPage() {
    return (
        <div className="MiddleVerticalAlignContainer VerticalCenterColumn">
            <div className="TitleBeforePanel">
                <div className="Font-MainForLabels">
                    Select a training you've trained recently
                </div>
            </div>
            <QuickTrainingsListPanel trainings={
                [
                    { name: "Questionnaire 1" },
                    { name: "Questionnaire 2" }
                ]
            } />
            <div className="TitleBetweenPanels">
                <div className="Font-MainForLabels">
                    Or you can start another questionnaire
                </div>
            </div>
            <div className="MainControlContainer DisplayFlex">
                <button className="MainButton FullWidth CentralButton-SmallWidth Font-MainForControls">Browse questionnaires</button>
            </div>
        </div>
    );
}

export default QuickTrainingConfigurationPage;