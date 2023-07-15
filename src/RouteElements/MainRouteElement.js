import AuthenticationPage from '../Pages/Authentication/AuthenticationPage';
import MainPage from '../Pages/MainPage';
import SendConfirmationEmailPage from '../Pages/Authentication/SendConfirmationEmailPage';
import WeSentEmailPage from '../Pages/Authentication/WeSentEmailPage';
import { CallApi } from '../Utils/GlobalUtils';

function MainRouteElement(props) {
    let mainPage;

    if (props.currentUser.isUserLogged) {
        mainPage = (
            <MainPage />
        );
    }
    else {
        if (!props.emailSendingState.isModeActive) {
            mainPage = (
                <AuthenticationPage
                    handleLogIn={props.handleLogIn}
                    currentUser={props.currentUser}
                    emailConfirmation={props.emailConfirmationState}
                />
            );
        }
        else {
            if (!props.emailSendingState.isFinished) {
                mainPage = (
                    <SendConfirmationEmailPage
                        emailSendingState={props.emailSendingState}
                        handleSendingEmail={() => sendConfirmationEmail(props.setEmailSendingState, props.emailSendingState.accessToken)}
                    />
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

async function sendConfirmationEmail(setEmailSendingState, accessToken) {
    try {
        setEmailSendingState({
            isModeActive: true,
            accessToken,
            isExecuting: true,
            isFinished: false,
            isSucceed: false,
            isError: false,
            errorMessage: null
        });

        const response =
            await CallApi("/Account/RepeatEmailConfirmation", "POST", accessToken);

        if (response.ok) {
            setEmailSendingState({
                isModeActive: true,
                accessToken,
                isExecuting: false,
                isFinished: true,
                isSucceed: true,
                isError: false,
                errorMessage: null
            });
        }
        else {
            const result = await response.json();
            setEmailSendingState({
                isModeActive: true,
                accessToken,
                isExecuting: false,
                isFinished: true,
                isSucceed: false,
                isError: true,
                errorMessage: `${response.status} ${result.errorText}`
            });
        }
    }
    catch (error) {
        setEmailSendingState({
            isModeActive: true,
            accessToken,
            isExecuting: false,
            isFinished: true,
            isSucceed: false,
            isError: true,
            errorMessage: "Error: Unable to send confirmation email"
        });
    }
}

export default MainRouteElement;