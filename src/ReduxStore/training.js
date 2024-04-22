import { createSlice } from '@reduxjs/toolkit';

const trainingStateSlice = createSlice({
    name: 'trainingStateSlice',
    initialState: {
        //trainingQuestions: {
        //    areLoading: false,
        //    loadingFinished: false,
        //    loadingSucceed: false,
        //    items: null,
        //    itemsCount: null
        //},
        trainingId: null,
        questions: null,
        questionsCount: null,
        currentQuestion: null,
        currentQuestionIndex: null,
        trainingStage: null,
        trainingStageParameters: null,
        currentQuestionTimeSeconds: 0,
        correctAnswersPercent: 100,
        isTrainingResultReady: false
        //uploadingResults: {
        //    areUploading: false,
        //    finished: false,
        //    succeed: false
        //}
    },
    reducers: {
        setDefault(state) {
            state.trainingId = null;
            state.questions = null;
            state.questionsCount = null;
            state.currentQuestion = null;
            state.currentQuestionIndex = null;
            state.trainingStage = null;
            state.trainingStageParameters = null;
            state.currentQuestionTimeSeconds = 0;
            state.correctAnswersPercent = 100;
            state.isTrainingResultReady = false;
        },
        setTrainingId(state, action) {
            state.trainingId = action.payload
        },
        setNewQuestionsList(state, action) {
            state.questions = action.payload.questions;
            state.questionsCount = action.payload.questions.length;
        }
    }
});

export const trainingStateReducer = trainingStateSlice.reducer;
export const trainingStateActions = trainingStateSlice.actions;