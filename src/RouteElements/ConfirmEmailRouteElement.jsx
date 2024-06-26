import ConfirmEmailPage from '../Pages/Authentication/ConfirmEmailPage';
import {
    Navigate
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';
import { useEffect } from 'react';

function ConfirmEmailRouteElement() {
    const isUserLogged = useSelector(state => state.user.isUserLogged);
    const emailConfirmationIsFinished = useSelector(state => state.emailConfirmationState.isFinished);

    const setWallpaperView = useWallpaperViewDispatcher();

    useEffect(() => {
        setWallpaperView('mainWallpaper');
    }, [setWallpaperView]);

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