import {
    Navigate
} from 'react-router-dom';
import { useState } from 'react';
import RegisterPage from '../Pages/Authentication/RegisterPage';
import WeSentEmailPage from '../Pages/Authentication/WeSentEmailPage';
import { CallApi } from '../Utils/GlobalUtils';

function RegisterRouteElement(props) {

    let [registrationState, setRegistrationState] = useState({
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null,
        resultUserId: null,
        isConfirmationRequired: false
    });

    let registerPage;

    if (!props.currentUser.isUserLogged) {
        if (!registrationState.isSucceed) {
            registerPage = (
                <RegisterPage
                    currentUser={props.currentUser}
                    registrationState={registrationState}
                    handleRegister={(email, login, password, repeatPassword, captchaToken) => registerUser(setRegistrationState, props.setEmailSendingState, email, login, password, repeatPassword, captchaToken)}
                />
            );
        }
        else {
            if (registrationState.isConfirmationRequired) {
                registerPage = (
                    <WeSentEmailPage />
                );
            }
            else {
                registerPage = (
                    <Navigate replace to="/" />
                );
            }
        }
    }

    return registerPage;
}

async function registerUser(setRegistrationState, setEmailSendingState, email, login, password, repeatPassword, captchaToken) {

    if (password === repeatPassword) {

        try {
            setRegistrationState({
                isExecuting: true,
                isFinished: false,
                isSucceed: false,
                isError: false,
                errorMessage: null,
                resultUserId: null,
                isConfirmationRequired: false
            });

            const response =
                await CallApi("/Account/Register", "PUT", null, JSON.stringify({ email, login, password, captchaToken }));

            const result = await response.json();

            if (response.ok) {
                setRegistrationState({
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: true,
                    isError: false,
                    errorMessage: null,
                    resultUserId: result.userId,
                    isConfirmationRequired: result.isConfirmationRequired
                });

                if (result.isConfirmationRequired) {
                    setEmailSendingState({
                        isModeActive: false,
                        accessToken: null,
                        isExecuting: false,
                        isFinished: true,
                        isSucceed: true,
                        isError: false,
                        errorMessage: null
                    });
                }
            }
            else {
                setRegistrationState({
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: false,
                    isError: true,
                    errorMessage: `${response.status} ${result.errorText}`,
                    resultUserId: null,
                    isConfirmationRequired: false
                });
            }
        }
        catch (error) {
            console.log(error);
            setRegistrationState({
                isExecuting: false,
                isFinished: true,
                isSucceed: false,
                isError: true,
                errorMessage: "Error: Unable to register user.",
                resultUserId: null,
                isConfirmationRequired: false
            });
        }
    }
    else {
        setRegistrationState({
            isExecuting: false,
            isFinished: true,
            isSucceed: false,
            isError: true,
            errorMessage: "Error: Password and Repeat Password don't match.",
            resultUserId: null,
            isConfirmationRequired: false
        });
    }
}

export default RegisterRouteElement;