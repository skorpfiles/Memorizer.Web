import QuickTrainingsListPanel from "../../ConfigureTraining/Quick/QuickTrainingsListPanel";

function SelectTrainingPage(props) {
    return (
        <div className="MiddleVerticalAlignContainer VerticalCenterColumn">
            <div className="TitleBeforePanel">
                <div className="Font-MainForLabels">
                    Select a training you've trained recently
                </div>
            </div>
            <QuickTrainingsListPanel currentUser={props.currentUser} />
            <div className="TitleBetweenPanels">
                <div className="Font-MainForLabels">
                    Or you can start a new training
                </div>
            </div>
            <div className="MainControlContainer DisplayFlex">
                <button className="MainButton FullWidth CentralButton-SmallWidth Font-MainForControls">Create new training</button>
            </div>
        </div>
    );
}

export default SelectTrainingPage;