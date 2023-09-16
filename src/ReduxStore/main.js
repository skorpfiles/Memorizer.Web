import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { emailSendingStateReducer } from './emailSendingState';
import { emailConfirmationStateReducer } from './emailConfirmationState';
import { wallpaperViewReducer } from './wallpaperView';

export const store = configureStore({
    reducer: {
        user: userReducer,
        emailSendingState: emailSendingStateReducer,
        emailConfirmationState: emailConfirmationStateReducer,
        wallpaperView: wallpaperViewReducer
    }
});