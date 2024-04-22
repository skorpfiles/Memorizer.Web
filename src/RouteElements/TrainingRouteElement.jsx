import ReturnToPage from '../ReturnToPage';
import TrainingPage from '../Pages/Training/TrainingPage';
import TrainingResultPage from '../Pages/Training/TrainingResultPage';
import TrainingLoadingPage from '../Pages/Training/TrainingLoadingPage';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';
import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { callApi } from '../Utils/GlobalUtils';
import { trainingActions } from '../ReduxStore/training';

function TrainingRouteElement(props) {
    const setWallpaperView = useWallpaperViewDispatcher();

    const questionsForTrainingReducer = (state, action) => {
        switch (action.type) {
            case 'setIsLoading':
                return {
                    isLoading: true,
                    loadingFinished: false,
                    loadingSucceed: false,
                    loadingError: false,
                    loadingErrorMessage: null
                };
            case 'setSuccess':
                return {
                    isLoading: false,
                    loadingFinished: true,
                    loadingSucceed: true,
                    loadingError: false,
                    loadingErrorMessage: null
                };
            case 'setError':
                return {
                    isLoading: false,
                    loadingFinished: true,
                    loadingSucceed: false,
                    loadingError: true,
                    loadingErrorMessage: action.errorMessage
                };
            default:
                return { ...state };
        }
    }

    const [isTrainingIdCorrect, setIsTrainingIdCorrect] = useState(null);

    const [questionsForTrainingState, dispatchQuestionsForTrainingState] = useReducer(questionsForTrainingReducer, {
        isLoading: false,
        loadingFinished: false,
        loadingSucceed: false,
        loadingError: false,
        loadingErrorMessage: null
    });

    const accessToken = useSelector(state => state.user.accessToken);

    const dispatch = useDispatch();

    useEffect(() => {
        setWallpaperView('trainingWallpaper');
    }, [setWallpaperView]);

    useEffect(() => {
        if (props.trainingId !== null) {
            setIsTrainingIdCorrect(true);
            dispatch(trainingActions.setDefault());
            dispatchQuestionsForTrainingState('setIsLoading');
            try {
                const loadingQuestionsListFunc = async () => {
                    const url = '/Repository/Questionnaires/' + props.trainingId;
                    const response = await callApi(url, 'GET', accessToken);
                    if (response.ok) {
                        const result = await response.json();
                        dispatch(trainingActions.setTrainingId(props.trainingId));
                    }
                }








                dispatch(trainingActions.setNewQuestionsList());
            }
            catch(error) {
                console.log(error);
                dispatchQuestionsForTrainingState('setError', 'Error: Unable to connect to the API.');
            }
        }
    })

    return (
        <div className='route-element-with-return-button'>
            {/*<ReturnToPage path='/' text='Return to the main page' />*/}
            <TrainingPage />
            {/*<TrainingResultPage/>*/}
            {/*<TrainingLoadingPage/>*/}
        </div>
    );
}

export default TrainingRouteElement;