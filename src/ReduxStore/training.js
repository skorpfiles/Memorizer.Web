import { createSlice } from '@reduxjs/toolkit';

const trainingStateSlice = createSlice({
    name: 'trainingStateSlice',
    initialState: {
        trainingQuestions: {
            areLoading: false,
            loadingFinished: false,
            loadingSucceed: false,
            items: null,
            itemsCount: null
        },
        currentState: {
            question: null,
            questionIndex: null,
            trainingStage: null,
            trainingStageParameters: null,
            questionTimeSeconds: 0,
            correctAnswersPercent: 100,
            isTrainingResultReady: false
        },
        uploadingResults: {
            areUploading: false,
            finished: false,
            succeed: false
        }
    },
    reducers: {
        setDefault(state) {
            state.trainingQuestions.areLoading = false;
            state.trainingQuestions.loadingFinished = false;
            state.trainingQuestions.loadingSucceed = false;
            state.trainingQuestions.items = null;
            state.trainingQuestions.itemsCount = null;

            state.currentState.question = null;
            state.currentState.questionIndex = null;
            state.currentState.trainingStage = null;
            state.currentState.trainingStageParameters = null;
            state.currentState.questionTimeSeconds = 0;
            state.currentState.correctAnswersPercent = 100;
            state.currentState.isTrainingResultReady = false;

            state.uploadingResults.areUploading = false;
            state.uploadingResults.finished = false;
            state.uploadingResults.succeed = false;
        },

    }
});

export const trainingStateReducer = trainingStateSlice.reducer;
export const trainingStateActions = trainingStateSlice.actions;