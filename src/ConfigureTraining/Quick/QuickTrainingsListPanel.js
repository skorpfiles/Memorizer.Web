import QuickTrainingsListPanelElement from "./QuickTrainingsListPanelElement";

function QuickTrainingsListPanel(props) {

    var data;
    if (props.trainings !== null && props.trainings.length > 0) {
        data = (<ul className="Font-MainForControls">
            {props.trainings.map(item => <QuickTrainingsListPanelElement training={item} />)}
        </ul>);
    }
    else {
        data = (<div className="CenterText">No items</div>);
    }

    return (
        <div className="Column-small Panel">
            {data}
            <div className="CenterText Font-Default"><a href="#">Browse and manage all</a></div>
        </div>
    );
}

export default QuickTrainingsListPanel;