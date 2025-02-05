import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerSendingStateActions } from '../ReduxStore/answerSendingState';
import { callApi } from '../Utils/GlobalUtils';
import { DEMO_QUESTIONS_MODE } from '../TestData/TrainingDataForTest';

export const useSendQuestionAnswer = () => {
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.user.accessToken);

    return useCallback(async (sentData) => {
        dispatch(answerSendingStateActions.setInProcess());
        if (!DEMO_QUESTIONS_MODE) {
            try {
                const response = await callApi('/Training/UpdateQuestionStatus', 'POST', accessToken, JSON.stringify({
                    questionId: sentData.questionId,
                    trainingStartTime: new Date(sentData.trainingStartTime).toISOString(),
                    givenTypedAnswers: sentData.givenTypedAnswers,
                    isAnswerCorrect: sentData.isAnswerCorrect,
                    answerTimeMilliseconds: sentData.answerTimeMilliseconds
                }));
                if (response.ok) {
                    dispatch(answerSendingStateActions.setSuccessfulSending());
                    return true;
                }
                else {
                    const result = await response.json();
                    dispatch(answerSendingStateActions.setError({ errorMessage: `${response.status} ${result.errorText}` }));
                    return false;
                }
            }
            catch (error) {
                console.log(error);
                dispatch(answerSendingStateActions.setError({ errorMessage: 'Error: Unable to connect to the API.' }));
                return false;
            }
        }
        else {
            dispatch(answerSendingStateActions.setSuccessfulSending());
            return true;
        }
    }, [accessToken, dispatch]);
}