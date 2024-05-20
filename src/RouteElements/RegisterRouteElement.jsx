import {
    Navigate
} from 'react-router-dom';
import { useReducer, useEffect } from 'react';
import RegisterPage from '../Pages/Authentication/RegisterPage';
import WeSentEmailPage from '../Pages/Authentication/WeSentEmailPage';
import { callApi } from '../Utils/GlobalUtils';
import { useSelector, useDispatch } from 'react-redux';
import { emailSendingStateActions } from '../ReduxStore/emailSendingState';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';

function RegisterRouteElement() {
    const setWallpaperView = useWallpaperViewDispatcher();

    useEffect(() => {
        setWallpaperView('mainWallpaper');
    }, [setWallpaperView]);

    const registrationStateReducer = (state, action) => {
        switch (action.type) {
            case 'setIsLoading':
                return {
                    isExecuting: true,
                    isFinished: false,
                    isSucceed: false,
                    isError: false,
                    errorMessage: null,
                    resultUserId: null,
                    isConfirmationRequired: false
                };
            case 'setSuccess':
                return {
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: true,
                    isError: false,
                    errorMessage: null,
                    resultUserId: action.userId,
                    isConfirmationRequired: action.isConfirmationRequired
                };
            case 'setError':
                return {
                    isExecuting: false,
                    isFinished: true,
                    isSucceed: false,
                    isError: true,
                    errorMessage: action.errorMessage,
                    resultUserId: null,
                    isConfirmationRequired: false
                };
            default:
                return {
                    ...state
                };
        }
    }

    const [registrationState, dispatchRegistrationState] = useReducer(registrationStateReducer, {
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null,
        resultUserId: null,
        isConfirmationRequired: false
    })

    const dispatch = useDispatch();
    const isUserLogged = useSelector(state => state.user.isUserLogged);

    let registerPage;

    if (!isUserLogged) {
        if (!registrationState.isSucceed) {
            registerPage = (
                <RegisterPage
                    registrationState={registrationState}
                    handleRegister={(email, login, password, repeatPassword, captchaToken) => registerUser(dispatchRegistrationState, email, login, password, repeatPassword, captchaToken, dispatch, emailSendingStateActions)}
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
                    <Navigate replace to='/' />
                );
            }
        }
    }

    return registerPage;
}

async function registerUser(dispatchRegistrationState, email, login, password, repeatPassword, captchaToken, dispatch, emailSendingStateActions) {

    if (password === repeatPassword) {

        try {
            dispatchRegistrationState({ type: 'setIsLoading' });

            const response =
                await callApi('/Account/Register', 'PUT', null, JSON.stringify({ email, login, password, captchaToken }));

            const result = await response.json();

            if (response.ok) {
                dispatchRegistrationState({ type: 'setSuccess', userId: result.userId, isConfirmationRequired: result.isConfirmationRequired });

                if (result.isConfirmationRequired) {
                    dispatch(emailSendingStateActions.setDefault());
                }
            }
            else {
                dispatchRegistrationState({ type: 'setError', errorMessage: `${response.status} ${result.errorText}` });
            }
        }
        catch (error) {
            console.log(error);
            dispatchRegistrationState({ type: 'setError', errorMessage: 'Error: Unable to register user.' });
        }
    }
    else {
        dispatchRegistrationState({
            type: 'setError', errorMessage: "Error: Password and Repeat Password don't match."
        });
    }
}

export default RegisterRouteElement;