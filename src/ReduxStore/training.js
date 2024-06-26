import { createSlice } from '@reduxjs/toolkit';
import { getNextStateInTrainingQuestion, checkIfAnswerIsCorrect, getCorrectAnswersPercent } from '../Utils/TrainingUtils.js';

const trainingStateSlice = createSlice({
    name: 'trainingStateSlice',
    initialState: {
        trainingId: null,
        trainingName: null,
        questions: null,
        questionsCount: null,
        currentQuestionIndex: null,
        trainingStage: null,
        trainingStageParameters: null,
        timerIsGoing: false,
        currentQuestionTimeSeconds: 0,
        correctAnswersPercent: 100,
        isTrainingResultReady: false
    },
    reducers: {
        setDefault(state) {
            state.trainingId = null;
            state.trainingName = null;
            state.questions = null;
            state.questionsCount = null;
            state.currentQuestionIndex = null;
            state.trainingStage = null;
            state.trainingStageParameters = null;
            state.timerIsGoing = false;
            state.currentQuestionTimeSeconds = 0;
            state.correctAnswersPercent = 0;
            state.isTrainingResultReady = false;
        },
        startTraining(state, action) {
            //set training info
            state.trainingId = action.payload.trainingId;
            state.trainingName = action.payload.trainingName;

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

            //set training stage
            const nextState = getNextStateInTrainingQuestion(state.questions[state.currentQuestionIndex], null, null);
            state.trainingStage = nextState.trainingStage;
            state.trainingStageParameters = nextState.trainingStageParameters;
            if (nextState.startTrainingTimer) {
                state.questions[state.currentQuestionIndex].trainingStartTime = Date.now();
                state.timerIsGoing = true;
            }
            if (nextState.stopTrainingTimer) {
                state.questions[state.currentQuestionIndex].answerTimeMilliseconds = Date.now() - state.questions[state.currentQuestionIndex].trainingStartTime;
                state.timerIsGoing = false;
            }
        },
        goNext(state, action) {
            let nextState;
            if (action.payload.gotAnswer) {
                const newAnswerState = checkIfAnswerIsCorrect(state.trainingStage, state.questions[state.currentQuestionIndex], action.payload.givenTypedAnswers, action.payload.isAnswerCorrect);
                state.questions[state.currentQuestionIndex].gotAnswer = true;
                state.questions[state.currentQuestionIndex].givenTypedAnswers = newAnswerState.givenTypedAnswers;
                state.questions[state.currentQuestionIndex].isAnswerCorrect = state.questions[state.currentQuestionIndex].isAnswerCorrect !== false ? newAnswerState.isCorrect : false;
                state.questions[state.currentQuestionIndex].iDontKnow = action.payload.iDontKnow ?? false;
                nextState = getNextStateInTrainingQuestion(state.questions[state.currentQuestionIndex], {
                    trainingStage: state.trainingStage,
                    trainingStageParameters: [newAnswerState.isCorrect ? 'correct' : 'incorrect']
                });
            }
            else {
                nextState = getNextStateInTrainingQuestion(state.questions[state.currentQuestionIndex], {
                    trainingStage: state.trainingStage,
                    trainingStageParameters: state.trainingStageParameters
                });
            }

            if (nextState.startTrainingTimer) {
                state.questions[state.currentQuestionIndex].trainingStartTime = Date.now();
                state.timerIsGoing = true;
            }
            if (nextState.stopTrainingTimer) {
                state.questions[state.currentQuestionIndex].answerTimeMilliseconds = Date.now() - state.questions[state.currentQuestionIndex].trainingStartTime;
                state.timerIsGoing = false;
            }

            if (nextState.switchToNextQuestion) {
                if (state.currentQuestionIndex + 1 < state.questionsCount) {
                    state.currentQuestionIndex++;
                    nextState = getNextStateInTrainingQuestion(state.questions[state.currentQuestionIndex], null, null);
                    state.trainingStage = nextState.trainingStage;
                    state.trainingStageParameters = nextState.trainingStageParameters;
                    if (nextState.startTrainingTimer) {
                        state.questions[state.currentQuestionIndex].trainingStartTime = Date.now();
                        state.timerIsGoing = true;
                    }
                    if (nextState.stopTrainingTimer) {
                        state.questions[state.currentQuestionIndex].answerTimeMilliseconds = Date.now() - state.questions[state.currentQuestionIndex].trainingStartTime;
                        state.timerIsGoing = false;
                    }
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
            state.questions[state.currentQuestionIndex].isAnswerCorrect = true;
            state.questions[state.currentQuestionIndex].challenged = true;
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