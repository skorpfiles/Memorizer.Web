import AuthenticationPage from '../Pages/Authentication/AuthenticationPage';
import MainPage from '../Pages/MainPage';
import SendConfirmationEmailPage from '../Pages/Authentication/SendConfirmationEmailPage';
import WeSentEmailPage from '../Pages/Authentication/WeSentEmailPage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';

function MainRouteElement() {
    const isUserLogged = useSelector(state => state.user.isUserLogged);
    const isEmailSendingModeActive = useSelector(state => state.emailSendingState.isModeActive);
    const isEmailSendingFinished = useSelector(state => state.emailSendingState.isFinished);
    const [enableWallpaperView, ] = useWallpaperViewDispatcher();

    let mainPage;

    useEffect(() => {
        enableWallpaperView();
    }, [enableWallpaperView]);

    if (isUserLogged) {
        mainPage = (
            <MainPage />
        );
    }
    else {
        if (!isEmailSendingModeActive) {
            mainPage = (
                <AuthenticationPage/>
            );
        }
        else {
            if (!isEmailSendingFinished) {
                mainPage = (
                    <SendConfirmationEmailPage/>
                );
            }
            else {
                mainPage = (
                    <WeSentEmailPage />
                );
            }
        }
    }

    return mainPage;
}

export default MainRouteElement;