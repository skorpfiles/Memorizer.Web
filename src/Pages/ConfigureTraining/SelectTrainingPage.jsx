import QuickTrainingsListPanel from "../../ConfigureTraining/Quick/QuickTrainingsListPanel";
import { useNavigate } from 'react-router-dom';

function SelectTrainingPage(props) {

    const navigate = useNavigate();

    return (
        <div className="middle-vertical-align-container vertical-center-column">
            <div className="title-before-panel">
                <div className="font--main-for-labels">
                    Select a training you've trained recently
                </div>
            </div>
            <QuickTrainingsListPanel currentUser={props.currentUser} />
            <div className="title-between-panels">
                <div className="font--main-for-labels">
                    Or you can start a new training
                </div>
            </div>
            <div className="main-control-container display-flex">
                <button className="main-button full-width central-button--small-width font--main-for-controls" onClick={() => navigate("/train/configure") }>Create new training</button>
            </div>
        </div>
    );
}

export default SelectTrainingPage;