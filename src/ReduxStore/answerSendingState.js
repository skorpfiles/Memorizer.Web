import { createSlice } from '@reduxjs/toolkit';

const answerSendingStateSlice = createSlice({
    name: 'answerSendingStateSlice',
    initialState: {
        isExecuting: false,
        isFinished: false,
        isSucceed: false,
        isError: false,
        errorMessage: null
    },
    reducers: {
        setDefault(state) {
            state.isExecuting = false;
            state.isFinished = false;
            state.isSucceed = false;
            state.isError = false;
            state.errorMessage = null;
        },
        setInProcess(state) {
            state.isExecuting = true;
            state.isFinished = false;
            state.isSucceed = false;
            state.isError = false;
            state.errorMessage = null;
        },
        setSuccessfulSending(state) {
            state.isExecuting = false;
            state.isFinished = true;
            state.isSucceed = true;
            state.isError = false;
            state.errorMessage = null;
        },
        setError(state, action) {
            state.isExecuting = false;
            state.isFinished = true;
            state.isSucceed = false;
            state.isError = true;
            state.errorMessage = action.payload.errorMessage
        }
    }
});

export const answerSendingStateReducer = answerSendingStateSlice.reducer;
export const answerSendingStateActions = answerSendingStateSlice.actions;