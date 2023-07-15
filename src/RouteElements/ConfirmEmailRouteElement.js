import ConfirmEmailPage from '../Pages/Authentication/ConfirmEmailPage';
import {
    Navigate
} from 'react-router-dom';

function ConfirmEmailRouteElement(props) {
    let confirmEmailPage;

    if (!props.currentUser.isUserLogged) {
        if (!props.emailConfirmationState.isFinished) {
            confirmEmailPage = (
                <ConfirmEmailPage/>
            );
        }
        else {
            confirmEmailPage = (
                <Navigate replace to="/" />
            );
        }
    }

    return confirmEmailPage;
}

export default ConfirmEmailRouteElement;