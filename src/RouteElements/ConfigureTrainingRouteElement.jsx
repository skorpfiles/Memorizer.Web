import ConfigureTrainingPage from '../Pages/ConfigureTraining/ConfigureTrainingPage';
import ReturnToPage from '../ReturnToPage';

function ConfigureTrainingRouteElement(props) {
    return (
        <ConfigureTrainingPage currentUser={props.currentUser} />
    );
}

export default ConfigureTrainingRouteElement;