import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { emailSendingStateReducer } from './emailSendingState';
import { emailConfirmationStateReducer } from './emailConfirmationState';
import { wallpaperViewReducer } from './wallpaperView';
import { trainingStateReducer } from './training';
import { answerSendingStateReducer } from './answerSendingState';

export const store = configureStore({
    reducer: {
        user: userReducer,
        emailSendingState: emailSendingStateReducer,
        emailConfirmationState: emailConfirmationStateReducer,
        wallpaperView: wallpaperViewReducer,
        trainingState: trainingStateReducer,
        answerSendingState: answerSendingStateReducer
    }
});