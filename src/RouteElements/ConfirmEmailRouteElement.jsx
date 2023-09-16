import ConfirmEmailPage from '../Pages/Authentication/ConfirmEmailPage';
import {
    Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';

function ConfirmEmailRouteElement() {
    const isUserLogged = useSelector(state => state.user.isUserLogged);
    const emailConfirmationIsFinished = useSelector(state => state.emailConfirmationState.isFinished);
    let confirmEmailPage;

    if (!isUserLogged) {
        if (!emailConfirmationIsFinished) {
            confirmEmailPage = (
                <ConfirmEmailPage/>
            );
        }
        else {
            confirmEmailPage = (
                <Navigate replace to='/' />
            );
        }
    }

    return confirmEmailPage;
}

export default ConfirmEmailRouteElement;