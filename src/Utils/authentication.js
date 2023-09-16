import { callApi } from './GlobalUtils';
import { CookiesExpireDays } from './GlobalConstants';

export async function logIn(login, password, dispatch, userActions, emailSendingStateActions) {
    try {
        dispatch(userActions.setAuthenticationInProcess());

        const response =
            await callApi('/Account/Token', 'POST', null, JSON.stringify({ login, password }));

        if (response.ok) {
            const result = await response.json();

            if (result.isEmailConfirmed) {
                let expirationDate1 = new Date();
                expirationDate1.setDate(expirationDate1.getDate() + CookiesExpireDays);

                document.cookie = 'accessToken=' + result.accessToken + '; expires=' + expirationDate1 + '; ';
                document.cookie = 'userLogin=' + result.login + '; expires=' + expirationDate1 + '; ';

                dispatch(userActions.setAuthenticationIsSuccessful({
                    userLogin: result.login,
                    accessToken: result.accessToken,
                    isEmailConfirmationRequired: !result.isEmailConfirmed
                }));
            }
            else {
                dispatch(userActions.setAuthenticationFailedBecauseEmailUnconfirmed());
                dispatch(emailSendingStateActions.setAccessToken({ accessToken: result.accessToken }));
                dispatch(emailSendingStateActions.setModeAsActive());
            }
        }
        else {
            const result = await response.json();
            dispatch(userActions.setAuthenticationError({
                loggingErrorMessage: `${response.status} ${result.errorText}`
            }));
        }
    }
    catch (error) {
        console.log(error);
        dispatch(userActions.setAuthenticationError({
            loggingErrorMessage: 'Error: Unable to connect to the API'
        }));
    }
}

export async function logOut(accessToken, dispatch, userActions, emailConfirmationStateActions) {
    try {
        dispatch(userActions.setAuthenticationInProcess());
        const response = await callApi('/Account/Logout', 'POST', accessToken);
        if (response.ok) {
            dispatch(userActions.setLogOut());

            document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
            document.cookie = 'userLogin=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        }
        else {
            const result = await response.json();
            dispatch(userActions.setAuthenticationError(`${response.status} ${result.errorText}`));
        }
        dispatch(emailConfirmationStateActions.setDefault());
    }
    catch (error) {
        console.log(error);
    }
}

export async function confirmRegistration(userId, confirmationCode, dispatch, emailConfirmationStateActions) {
    if (userId !== null || confirmationCode !== null) {
        try {
            dispatch(emailConfirmationStateActions.setInProcess());

            const response =
                await callApi('/Account/ConfirmRegistration', 'POST', null, JSON.stringify({ userId, confirmationCode }));

            if (response.ok) {
                dispatch(emailConfirmationStateActions.setSuccess());
            }
            else {
                const result = await response.json();
                dispatch(emailConfirmationStateActions.setError({ errorMessage: `${response.status} ${result.errorMessage}` }));
            }
        }
        catch (error) {
            console.log(error);
            dispatch(emailConfirmationStateActions.setError({ errorMessage: 'Error: Unable to register user.' }));
        }
    }
    else {
        dispatch(emailConfirmationStateActions.setError({ errorMessage: 'Error: userId and confirmationCode must not be null.' }));
    }
}

export async function sendConfirmationEmail(accessToken, dispatch, emailSendingStateActions) {
    try {
        dispatch(emailSendingStateActions.setInProcess());

        const response =
            await callApi('/Account/RepeatEmailConfirmation', 'POST', accessToken);

        if (response.ok) {
            dispatch(emailSendingStateActions.setSuccessfulSending());
        }
        else {
            const result = await response.json();
            dispatch(emailSendingStateActions.setError({ errorMessage: `${response.status} ${result.errorText}` }));
        }
    }
    catch (error) {
        dispatch(emailSendingStateActions.setError({ errorMessage: 'Error: Unable to send confirmation email' }));
    }
}