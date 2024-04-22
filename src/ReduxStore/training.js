import { createSlice } from '@reduxjs/toolkit';

const trainingStateSlice = createSlice({
    name: 'trainingStateSlice',
    initialState: {
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
            state.questionsCount = action.payload.questionsCount;
        }
    }
});

export const trainingStateReducer = trainingStateSlice.reducer;
export const trainingStateActions = trainingStateSlice.actions;