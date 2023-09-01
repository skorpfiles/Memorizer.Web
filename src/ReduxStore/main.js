import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './user';
import { emailSendingStateReducer } from './emailSendingState';
import { emailConfirmationStateReducer } from './emailConfirmationState';

export const store = configureStore({
    reducer: {
        user: userReducer,
        emailSendingState: emailSendingStateReducer,
        emailConfirmationState: emailConfirmationStateReducer
    }
});