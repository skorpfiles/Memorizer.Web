import { useSelector, useDispatch } from 'react-redux';
import { useSendQuestionAnswer } from './useSendQuestionAnswer';
import { trainingStateActions } from '../ReduxStore/training';

export const useGoingNext = () => {
    const dispatch = useDispatch();
    const sendQuestionAnswer = useSendQuestionAnswer();
    const questionId = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].id);
    const trainingStartTime = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].trainingStartTime);
    const answerTimeMilliseconds = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].answerTimeMilliseconds);

    return async (gotAnswer, isAnswerCorrect, givenTypedAnswers, iDontKnow) => {
        if (gotAnswer) {
            await sendQuestionAnswer({
                questionId,
                trainingStartTime,
                givenTypedAnswers,
                isAnswerCorrect,
                answerTimeMilliseconds
            });
        }
        dispatch(trainingStateActions.goNext({ gotAnswer, isAnswerCorrect, givenTypedAnswers, iDontKnow }));
        if (gotAnswer) {
            dispatch(trainingStateActions.updateCorrectAnswersPercent());
        }
    }
}