import { useDispatch } from 'react-redux';
import { trainingStateActions } from '../ReduxStore/training';

export const useGoingNext = () => {
    const dispatch = useDispatch();

    return async (gotAnswer, isAnswerCorrect, givenTypedAnswers, iDontKnow) => {
        dispatch(trainingStateActions.goNext({ gotAnswer, isAnswerCorrect, givenTypedAnswers, iDontKnow }));
        if (gotAnswer) {
            dispatch(trainingStateActions.updateCorrectAnswersPercent());
        }
    }
}