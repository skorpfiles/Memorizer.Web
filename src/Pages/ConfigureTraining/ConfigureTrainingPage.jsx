import ConfigureTrainingShell from '../../ConfigureTraining/ConfigureTrainingShell';
import { useState, useReducer, useEffect, useCallback, useRef } from 'react';
import { callApi } from '../../Utils/GlobalUtils';
import SelectQuestionnairePage from './SelectQuestionnairePage';
import ReturnToPage from '../../ReturnToPage';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoadingPage from '../LoadingPage';

function ConfigureTrainingPage() {

    //------- Shared objects --------//
    const accessToken = useSelector(state => state.user.accessToken);
    const defaultValues = {
        trainingLengthRadioGroup: 'questionsCountRadioButton',
        trainingName: 'My Training'
    };
    const methods = useForm({ defaultValues });

    //------- Calculating Stats -------//

    const questionnairesStatsReducer = (state, action) => {
        switch (action.type) {
            case 'setIsLoading':
                return {
                    ...state,
                    isLoading: true,
                    isFinished: false,
                    isSuccessful: false,
                    isError: false,
                    errorMessage: null
                };
            case 'setSuccess':
                return {
                    questionnaires: action.questionnaires,
                    stats: {
                        questionsTotalCount: action.questionsTotalCount,
                        newQuestionsCount: action.newQuestionsCount,
                        recheckedQuestionsCount: action.recheckedQuestionsCount,
                        maxTimeToTrainMinutes: action.maxTimeToTrainMinutes
                    },
                    isLoading: false,
                    isFinished: true,
                    isSuccessful: true,
                    isError: false,
                    errorMessage: null
                };
            case 'setError':
                return {
                    ...state,
                    isLoading: false,
                    isFinished: true,
                    isSuccessful: false,
                    isError: true,
                    errorMessage: action.errorMessage
                };
            default:
                return { ...state };
        }
    }

    const [questionnairesStats, dispatchQuestionnairesStats] = useReducer(questionnairesStatsReducer, {
        questionnaires: [], //{ id : ..., filled: ..., maxTimeToTrainMinutes : ... }
        stats: {
            questionsTotalCount: 0,
            newQuestionsCount: 0,
            recheckedQuestionsCount: 0,
            maxTimeToTrainMinutes: 0
        },
        isLoading: false,
        isFinished: false,
        isSuccessful: false,
        isError: false,
        errorMessage: null
    });

    const refreshStatsFuncRef = useRef();
    const refreshStatsFunc = useCallback(async (newTrainingStatusSelectedQuestionnaires) => {
        try {
            dispatchQuestionnairesStats({ type: 'setIsLoading' });

            let newQuestionnairesStatsItems = [];
            let newQuestionsTotalCount = 0;
            let newNewQuestionsCount = 0;
            let newRecheckedQuestionsCount = 0;

            //refresh stats items list by adding/deleting absent elements, calculate known values
            newTrainingStatusSelectedQuestionnaires.forEach(questionnaire => {
                let newQuestionnaireStats = questionnairesStats.questionnaires.find(q => q.id === questionnaire.id);
                if (newQuestionnaireStats === undefined) {
                    newQuestionnaireStats = {
                        id: questionnaire.id,
                        filled: false,
                        totalTrainingTimeSeconds: null
                    };
                }
                newQuestionnairesStatsItems = [
                    ...newQuestionnairesStatsItems,
                    newQuestionnaireStats
                ];

                newQuestionsTotalCount += questionnaire.countsOfQuestions.total;
                newNewQuestionsCount += questionnaire.countsOfQuestions.new;
                newRecheckedQuestionsCount += questionnaire.countsOfQuestions.rechecked;
            });

            //refresh stats for unfilled items
            const processQuestionnaireStatsItem = async (questionnaireStatsItem) => {
                if (!questionnaireStatsItem.filled) {
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    const response = await callApi(`/Repository/Questionnaire/${questionnaireStatsItem.id}?calculateTime=true`, 'GET', accessToken);
                    if (response.ok) {
                        const result = await response.json();
                        return ({
                            id: questionnaireStatsItem.id,
                            filled: true,
                            totalTrainingTimeSeconds: result.totalTrainingTimeSeconds
                        });
                    }
                    else {
                        throw new Error('Unable to get questionnaire stats.');
                    }
                }
                else {
                    return questionnaireStatsItem;
                }
            }

            const processQuestionnairesResults = await Promise.all(newQuestionnairesStatsItems.map(processQuestionnaireStatsItem));

            //set state

            let maxTimeToTrainMinutes = processQuestionnairesResults.reduce(((acc, value) => acc + Math.floor(value.totalTrainingTimeSeconds / 60)), 0);
            if (maxTimeToTrainMinutes < 1) {
                maxTimeToTrainMinutes = 1;
            }

            dispatchQuestionnairesStats({
                type: 'setSuccess',
                questionnaires: processQuestionnairesResults,
                questionsTotalCount: newQuestionsTotalCount,
                newQuestionsCount: newNewQuestionsCount,
                recheckedQuestionsCount: newRecheckedQuestionsCount,
                maxTimeToTrainMinutes
            });
        }
        catch (error) {
            console.log(error);
            dispatchQuestionnairesStats({
                type: 'setError',
                errorMessage: error
            });
        }
    }, [accessToken, questionnairesStats]);

    useEffect(() => {
        refreshStatsFuncRef.current = refreshStatsFunc;
    });

    //------- Training Status -------//

    const [trainingStatus, setTrainingStatus] = useState({
        id: null,
        name: 'My Training',
        selectedQuestionnaires: [],
        trainingLengthAsQuestionsCount: true
    });

    //------- Load Training By ID -------//

    const [searchParams,] = useSearchParams();

    const loadTrainingReducer = (state, action) => {
        switch (action.type) {
            case 'setIsLoading':
                return {
                    isLoading: true,
                    loadingFinished: false,
                    loadingSucceed: false,
                    loadingError: false,
                    loadingErrorMessage: null,
                };
            case 'setSuccess':
                return {
                    isLoading: false,
                    loadingFinished: true,
                    loadingSucceed: true,
                    loadingError: false,
                    loadingErrorMessage: null,
                };
            case 'setError':
                return {
                    isLoading: false,
                    loadingFinished: true,
                    loadingSucceed: false,
                    loadingError: true,
                    loadingErrorMessage: action.errorMessage,
                };
            default:
                return { ...state };
        }
    }

    const [loadTrainingState, dispatchLoadTrainingState] = useReducer(loadTrainingReducer, {
        isLoading: false,
        loadingFinished: false,
        loadingSucceed: false,
        loadingError: false,
        loadingErrorMessage: null,
    })

    useEffect(() => {
        const trainingId = searchParams.get('id');
        if (trainingId != null) {
            setSelectQuestionnairePageIsShown(false);
            dispatchLoadTrainingState('setIsLoading');
            try {
                const loadingTrainingFunc = async () => {
                    let url = '/Repository/Training/' + trainingId + '?calculateTime=true';
                    const response = await callApi(url, 'GET', accessToken);
                    if (response.ok) {
                        const result = await response.json();
                        const selectedQuestionnaires = result.questionnaires.map(item => {
                            return {
                                id: item.id,
                                name: item.name,
                                countsOfQuestions: item.countsOfQuestions
                            };
                        });
                        setTrainingStatus({
                            id: result.id,
                            name: result.name,
                            selectedQuestionnaires,
                            trainingLengthAsQuestionsCount: result.lengthType === 'questionsCount'
                        });
                        methods.setValue('trainingName', result.name);
                        methods.setValue('questionsCount', result.questionsCount);
                        methods.setValue('time', result.timeMinutes);
                        dispatchLoadTrainingState('setSuccess');
                        await refreshStatsFuncRef.current(selectedQuestionnaires);
                    }
                    else {
                        const result = await response.json();
                        dispatchLoadTrainingState({ type: 'setError', errorMessage: `${response.status} ${result.errorText}` });
                    }
                };
                loadingTrainingFunc().catch(console.error);
            }
            catch (error) {
                console.log(error);
                dispatchLoadTrainingState({ type: 'setError', errorMessage: 'Error: Unable to connect to the API.' });
            }
        }
    }, [accessToken, methods, searchParams]);

    //------- Configure Page / Select Questionnaire Toggling -------//

    const [selectQuestionnairePageIsShown, setSelectQuestionnairePageIsShown] = useState(true); //defines if the SelectQuestionnairePage component is shown in this moment instead of ConfigureTrainingShell.

    const [selectQuestionnairePageStatus, setSelectQuestionnairePageStatus] = useState({
        currentFilter: 'ownFilter',
        searchTerm: ''
    });

    //------- UI filling and handling -------//

    const handleAddingAnotherQuestionnaire = () => setSelectQuestionnairePageIsShown(true);
    const handleDeleteQuestionnaire = async (id) => {
        const newSelectedQuestionnaires = trainingStatus.selectedQuestionnaires.filter(questionnaire => questionnaire.id !== id);
        setTrainingStatus(prevState => ({
            ...prevState,
            selectedQuestionnaires: newSelectedQuestionnaires
        }));
        await refreshStatsFunc(newSelectedQuestionnaires);
    };
    const handleConfirmingAddingQuestionnaire = async (addedQuestionnaire) => {
        const newSelectedQuestionnaires = [
            ...trainingStatus.selectedQuestionnaires,
            addedQuestionnaire
        ]
        setTrainingStatus(prevState => ({
            ...prevState,
            selectedQuestionnaires: newSelectedQuestionnaires
        }));
        refreshStatsFunc(newSelectedQuestionnaires).catch(console.error);
        setSelectQuestionnairePageIsShown(false);
    }
    const handleSettingTrainingLength = (value) => {
        setTrainingStatus(prevState => ({
            ...prevState,
            trainingLengthAsQuestionsCount: value ==='questionsCountRadioButton'
        }));
    }

    const handleSettingTrainingName = (value) => {
        setTrainingStatus(prevState => ({
            ...prevState,
            name: value
        }));
    }

    //------- Create a new Training -------//

    const saveTrainingReducer = (state, action) => {
        switch (action.type) {
            case 'setIsLoading':
                return {
                    readyForLoading: true,
                    isLoading: true,
                    loadingFinished: false,
                    loadingSucceed: false,
                    loadingError: false,
                    loadingErrorMessage: null,
                    resultTrainingId: null
                };
            case 'setSuccess':
                return {
                    readyForLoading: true,
                    isLoading: false,
                    loadingFinished: true,
                    loadingSucceed: true,
                    loadingError: false,
                    loadingErrorMessage: null,
                    resultTrainingId: action.resultTrainingId
                };
            case 'setError':
                return {
                    readyForLoading: true,
                    isLoading: false,
                    loadingFinished: true,
                    loadingSucceed: false,
                    loadingError: true,
                    loadingErrorMessage: action.errorMessage,
                    resultTrainingId: null
                };
            default:
                return { ...state };
        }
    }

    const [saveTrainingState, dispatchSaveTrainingState] = useReducer(saveTrainingReducer, {
        readyForLoading: false,
        isLoading: false,
        loadingFinished: false,
        loadingSucceed: false,
        resultTrainingId: null,
        loadingError: false,
        loadingErrorMessage: null
    });

    const processCreateTraining = async (data, createNew) => {
        dispatchSaveTrainingState({ type: 'setIsLoading' });

        let body = {
            name: data.trainingName,
            lengthType: (data.trainingLengthRadioGroup === 'questionsCountRadioButton' ? 'questionsCount' : (data.trainingLengthRadioGroup === 'timeRadioButton' ? 'time' : null)),
            questionsCount: data.questionsCount ? parseInt(data.questionsCount, 10) : 0,
            timeMinutes: data.time ? parseInt(data.time, 10) : 0,
            newQuestionsFraction: 0.25,
            penaltyQuestionsFraction: 0.25,
            questionnairesIds: trainingStatus.selectedQuestionnaires.map(q => q.id)
        };

        if (createNew) {
            body = {
                ...body,
                id: trainingStatus.id
            }
        };

        const response = await callApi(`/Repository/Training`, createNew ? 'PUT' : 'POST', accessToken, JSON.stringify(body));
        if (response.ok) {
            if (createNew) {
                const result = await response.json();
                dispatchSaveTrainingState({ type: 'setSuccess', resultTrainingId: result.id });
            }
            else {
                dispatchSaveTrainingState({ type: 'setSuccess', resultTrainingId: trainingStatus.id });
            }
        }
        else {
            const result = await response.json();
            dispatchSaveTrainingState({ type: 'setError', errorMessage: `${response.status} ${result.errorText}` });
        }
    }

    //------- Submit & Start Training -------//

    const navigate = useNavigate();

    const handleStartTraining = (data) => {
        console.info(data);
        try {
            processCreateTraining(data).catch(console.error);
        }
        catch (error) {
            console.log(error);
            dispatchSaveTrainingState({ type: 'setError', errorMessage: 'Error: Unable to connect to the API.' });
        }
    }

    useEffect(() => {
        if (saveTrainingState.loadingSucceed) {
            navigate(`/train?id=${saveTrainingState.resultTrainingId}`);
        }
    }, [saveTrainingState.loadingSucceed, saveTrainingState.resultTrainingId, navigate]);

    //------- JSX -------//

    let result;

    if (saveTrainingState.readyForLoading && !saveTrainingState.loadingSucceed) {
        result = (
            <div className='route-element-with-return-button'>
                <ReturnToPage customClickHandler={() => setSelectQuestionnairePageIsShown(false)} text='Return to the training page' />
                <LoadingPage hasErrorResult={saveTrainingState.loadingError} />
            </div>
        );
    }
    else {
        result = selectQuestionnairePageIsShown ? (
            <div className='route-element-with-return-button'>
                <ReturnToPage customClickHandler={() => setSelectQuestionnairePageIsShown(false)} text='Return to the training page' />
                <SelectQuestionnairePage
                    alreadySelectedQuestionnaires={trainingStatus.selectedQuestionnaires}
                    handleConfirmingAddingQuestionnaire={handleConfirmingAddingQuestionnaire}
                    status={selectQuestionnairePageStatus}
                    setStatus={setSelectQuestionnairePageStatus}
                />
            </div>
        ) : (
            <div className='route-element-with-return-button'>
                <ReturnToPage path='/' text='Return to the main page' />
                <ConfigureTrainingShell
                    trainingStatus={trainingStatus}
                    handleAddingAnotherQuestionnaire={handleAddingAnotherQuestionnaire}
                    handleDeleteQuestionnaire={handleDeleteQuestionnaire}
                    handleSettingTrainingLength={handleSettingTrainingLength}
                    handleStartTraining={handleStartTraining}
                    setName={handleSettingTrainingName}
                    formMethods={methods}
                    questionnairesStats={questionnairesStats}
                />
            </div>
        );
    }

    return result;
}

export default ConfigureTrainingPage;