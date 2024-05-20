import ReturnToPage from '../ReturnToPage';
import TrainingPage from '../Pages/Training/TrainingPage';
import TrainingResultPage from '../Pages/Training/TrainingResultPage';
import LoadingPage from '../Pages/LoadingPage';
import { useWallpaperViewDispatcher } from '../hooks/useWallpaperViewDispatcher';
import { useState, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { callApi } from '../Utils/GlobalUtils';
import { trainingStateActions } from '../ReduxStore/training';
import { GetTrainingQuestionsForEveryType, DEMO_QUESTIONS_MODE } from '../TestData/TrainingDataForTest';

function TrainingRouteElement() {
    const setWallpaperView = useWallpaperViewDispatcher();

    const [searchParams,] = useSearchParams();

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

    const [, setIsTrainingIdCorrect] = useState(null);

    const [questionsForTrainingState, dispatchQuestionsForTrainingState] = useReducer(questionsForTrainingReducer, {
        isLoading: false,
        loadingFinished: false,
        loadingSucceed: false,
        loadingError: false,
        loadingErrorMessage: null
    });

    const accessToken = useSelector(state => state.user.accessToken);

    const isTrainingResultReady = useSelector(state => state.trainingState.isTrainingResultReady);

    const dispatch = useDispatch();

    useEffect(() => {
        setWallpaperView('trainingWallpaper');
    }, [setWallpaperView]);

    useEffect(() => {
        const trainingId = searchParams.get('id');
        if (trainingId !== null) {
            setIsTrainingIdCorrect(true);
            dispatch(trainingStateActions.setDefault());
            dispatchQuestionsForTrainingState({ type: 'setIsLoading' });
            try {
                const loadingQuestionsListFunc = async () => {
                    let url = '/Training/Start?id=' + trainingId;
                    const response = await callApi(url, 'GET', accessToken);
                    if (response.ok) {
                        const result = resultSelector(await response.json());
                        dispatch(trainingStateActions.startTraining({
                            trainingId,
                            trainingName: result.name,
                            questions: result.questions
                        }));
                        dispatchQuestionsForTrainingState({ type: 'setSuccess' });
                    }
                    else {
                        const result = await response.json();
                        dispatchQuestionsForTrainingState({ type: 'setError', errorMessage: `${response.status} ${result.errorText}` });
                    }
                }
                loadingQuestionsListFunc().catch(console.error);
            }
            catch (error) {
                console.log(error);
                dispatchQuestionsForTrainingState({ type: 'setError', errorMessage: 'Error: Unable to connect to the API.' });
            }
        }
        else {
            dispatchQuestionsForTrainingState({ type: 'setError', errorMessage: 'Incorrect training ID.' });
        }
    }, [searchParams, dispatch, accessToken]);

    let mainContent = null;
    if (!questionsForTrainingState.loadingSucceed) {
        mainContent = (<LoadingPage hasErrorResult={questionsForTrainingState.loadingError} />);
    }
    else if (!isTrainingResultReady) {
        mainContent = (<TrainingPage />);
    }
    else {
        mainContent = (<TrainingResultPage />);
    }

    return (
        <div className='route-element-with-return-button'>
            {!isTrainingResultReady && (<ReturnToPage path='/' text='Return to the main page' />)}
            {mainContent}
        </div>
    );
}

function resultSelector(realResult) {
    return DEMO_QUESTIONS_MODE ? GetTrainingQuestionsForEveryType() : realResult;
}

export default TrainingRouteElement;