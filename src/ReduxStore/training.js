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
        startTraining(state, action) {
            //set training id
            state.trainingId = action.payload.trainingId

            //set new questions list
            state.questions = action.payload.questions;
            state.questionsCount = action.payload.questionsCount;

            //move to first question
            if (state.questionsCount > 0) {
                state.currentQuestion = state.questions[0];
                state.currentQuestionIndex = 0;
            }

            //start training current question
            state.currentQuestionTimeSeconds = 0;
            state.correctAnswersPercent = 0;
        },
        setTrainingStage(state, action) {
            state.trainingStage = action.payload.newTrainingStage;
            state.trainingStageParameters = action.payload.newTrainingStageParameters;
        },
        answerCurrentQuestionAndSetTrainingStage(state, action) {
            //answer
            state.currentQuestion.givenTypedAnswers = action.payload.givenTypedAnswers;
            state.currentQuestion.isAnswerCorrect = action.payload.isAnswerCorrect;
            state.currentQuestion.timeSeconds = action.payload.timeSeconds;
            state.currentQuestion.myStatus.rating = action.payload.newRating;
            state.currentQuestion.myStatus.penaltyPoints = action.payload.newPenaltyPoints;
            state.correctAnswersPercent = action.payload.resultCorrectAnswersPercent;

            //switch to the next training stage
            state.trainingStage = action.payload.newTrainingStage;
            state.trainingStageParameters = action.payload.newTrainingStageParameters;
        },
        moveToNextQuestion(state) {
            if (state.currentQuestionIndex + 1 < state.questionsCount) {
                state.currentQuestionIndex++;
                state.currentQuestion = state.questions[state.currentQuestionIndex];
            }
        },
        setTrainingResult(state) {
            state.isTrainingResultReady = true;
        }
    }
});

export const trainingStateReducer = trainingStateSlice.reducer;
export const trainingStateActions = trainingStateSlice.actions;