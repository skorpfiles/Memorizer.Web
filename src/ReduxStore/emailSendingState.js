import { createSlice } from '@reduxjs/toolkit';

const emailSendingStateSlice = createSlice({
    name: "emailSendingStateSlice",
    initialState: {
        isModeActive: false,
        accessToken: null,
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null
    },
    reducers: {
        setDefault(state) {
            state.isModeActive = false;
            state.accessToken = null;
            state.isExecuting = false;
            state.isFinished = false;
            state.isSucceed = false;
            state.isError = false;
            state.errorMessage = null;
        },
        setModeAsActive(state) {
            state.isModeActive = true;
        },
        setAccessToken(state, action) {
            state.accessToken = action.payload.accessToken;
        },
        setInProcess(state) {
            state.isModeActive = true;
            state.isExecuting = true;
            state.isFinished = false;
            state.isSucceed = false;
            state.isError = false;
            state.errorMessage = null;
        },
        setSuccessfulSending(state) {
            state.isModeActive = true;
            state.isExecuting = false;
            state.isFinished = true;
            state.isSucceed = true;
            state.isError = false;
            state.errorMessage = null;
        },
        setError(state, action) {
            state.isModeActive = true;
            state.isExecuting = false;
            state.isFinished = true;
            state.isSucceed = false;
            state.isError = true;
            state.errorMessage = action.payload.errorMessage
        }
    }
});

export const emailSendingStateReducer = emailSendingStateSlice.reducer;
export const emailSendingStateActions = emailSendingStateSlice.actions;