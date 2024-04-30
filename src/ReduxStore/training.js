import { createSlice } from '@reduxjs/toolkit';
import { goNextInTrainingQuestion, challengeIncorrectness, checkIfAnswerIsCorrect, getCorrectAnswersPercent } from '../Utils/TrainingUtils.js';

const trainingStateSlice = createSlice({
    name: 'trainingStateSlice',
    initialState: {
        trainingId: null,
        questions: null,
        questionsCount: null,
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
            state.currentQuestionIndex = null;
            state.trainingStage = null;
            state.trainingStageParameters = null;
            state.currentQuestionTimeSeconds = 0;
            state.correctAnswersPercent = 0;
            state.isTrainingResultReady = false;
        },
        startTraining(state, action) {
            //set training id
            state.trainingId = action.payload.trainingId

            //set new questions list
            state.questions = action.payload.questions;
            if (state.questions !== null) {
                state.questionsCount = action.payload.questions.length;
            }
            else {
                state.questionsCount = null;
            }

            //move to first question
            if (state.questionsCount > 0) {
                state.questions[state.currentQuestionIndex] = state.questions[0];
                state.currentQuestionIndex = 0;
            }

            //start training current question
            state.currentQuestionTimeSeconds = 0;
            state.correctAnswersPercent = 0;
            state.questions[state.currentQuestionIndex].trainingStartTime = new Date().toISOString();

            //set training stage
            const nextState = goNextInTrainingQuestion(state.questions[state.currentQuestionIndex], null, null);
            state.trainingStage = nextState.trainingStage;
            state.trainingStageParameters = nextState.trainingStageParameters;
        },
        goNext(state, action) {
            if (action.payload.gotAnswer) {
                const newAnswerState = checkIfAnswerIsCorrect(state.questions[state.currentQuestionIndex], action.payload.givenTypedAnswers, action.payload.isAnswerCorrect);
                state.questions[state.currentQuestionIndex].gotAnswer = true;
                state.questions[state.currentQuestionIndex].givenTypedAnswers = newAnswerState.givenTypedAnswers;
                state.questions[state.currentQuestionIndex].isAnswerCorrect = newAnswerState.isCorrect;
                state.questions[state.currentQuestionIndex].timeSeconds = action.payload.timeSeconds;
                state.questions[state.currentQuestionIndex].myStatus.rating = action.payload.newRating;
                state.questions[state.currentQuestionIndex].myStatus.penaltyPoints = action.payload.newPenaltyPoints;
            }

            let nextState = goNextInTrainingQuestion(state.questions[state.currentQuestionIndex], {
                trainingStage: state.trainingStage,
                trainingStageParameters: state.trainingStageParameters
            }, [...(action.payload.parameters || [])]);

            if (nextState.switchToNextQuestion) {
                if (state.currentQuestionIndex + 1 < state.questionsCount) {
                    state.currentQuestionIndex++;
                    //state.currentQuestion = state.questions[state.currentQuestionIndex];
                    state.questions[state.currentQuestionIndex].trainingStartTime = new Date().toISOString();
                    nextState = goNextInTrainingQuestion(state.questions[state.currentQuestionIndex], null, null);
                    state.trainingStage = nextState.trainingStage;
                    state.trainingStageParameters = nextState.trainingStageParameters;
                }
                else {
                    state.isTrainingResultReady = true;
                }
            }
            else {
                state.trainingStage = nextState.trainingStage;
                state.trainingStageParameters = nextState.trainingStageParameters;
            }
        },
        challengeIncorrectness(state) {
            state.trainingStageParameters = challengeIncorrectness(state.questions[state.currentQuestionIndex], state.trainingStage, state.trainingStageParameters);
        },
        updateCorrectAnswersPercent(state) {
            state.correctAnswersPercent = getCorrectAnswersPercent(state.questions);
        },
        setTrainingResult(state) {
            state.isTrainingResultReady = true;
        }
    }
});

export const trainingStateReducer = trainingStateSlice.reducer;
export const trainingStateActions = trainingStateSlice.actions;