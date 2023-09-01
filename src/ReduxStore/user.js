import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        isUserLogging: false,
        isUserLogged: false,
        userLogin: 'test',
        accessToken: null,
        isLoggingError: false,
        loggingErrorMessage: null,
        isEmailConfirmationRequired: false
    },
    reducers: {
        setAuthenticationInProcess(state) {
            state.isUserLogging = true;
            state.isUserLogged = false;
            state.userLogin = null;
            state.accessToken = null;
            state.isLoggingError = false;
            state.loggingErrorMessage = null;
            state.isEmailConfirmationRequired = false;
        },
        setAuthenticationIsSuccessful(state, action) {
            state.isUserLogging = false;
            state.isUserLogged = true;
            state.userLogin = action.payload.userLogin;
            state.accessToken = action.payload.accessToken;
            state.isLoggingError = false;
            state.loggingErrorMessage = null;
            state.isEmailConfirmationRequired = action.payload.isEmailConfirmationRequired;
        },
        setAuthenticationError(state, action) {
            state.isUserLogging = false;
            state.isUserLogged = false;
            state.userLogin = null;
            state.accessToken = null;
            state.isLoggingError = true;
            state.loggingErrorMessage = action.payload.loggingErrorMessage;
            state.isEmailConfirmationRequired = false;
        },
        setLogOut(state) {
            state.isUserLogging = false;
            state.isUserLogged = false;
            state.userLogin = null;
            state.accessToken = null;
            state.isLoggingError = false;
            state.loggingErrorMessage = null;
            state.isEmailConfirmationRequired = false;
        },
        setAuthenticationFailedBecauseEmailUnconfirmed(state) {
            state.isUserLogging = false;
            state.isUserLogged = false;
            state.userLogin = null;
            state.accessToken = null;
            state.isLoggingError = false;
            state.loggingErrorMessage = null;
            state.isEmailConfirmationRequired = true;
        }
    }
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;