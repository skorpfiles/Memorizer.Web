import ConfigureTrainingShell from '../../ConfigureTraining/ConfigureTrainingShell';
import { useState, useEffect, useReducer } from 'react';
import { callApi } from '../../Utils/GlobalUtils';
import SelectQuestionnairePage from './SelectQuestionnairePage';
import ReturnToPage from '../../ReturnToPage';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

function ConfigureTrainingPage() {
    const [trainingStatus, setTrainingStatus] = useState({
        name: "My Training",
        selectedQuestionnaires: [],
        trainingLengthAsQuestionsCount: true
    });

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

    const [selectQuestionnairePageIsShown, setSelectQuestionnairePageIsShown] = useState(true); //defines if the SelectQuestionnairePage component is shown in this moment instead of ConfigureTrainingShell.

    const [selectQuestionnairePageStatus, setSelectQuestionnairePageStatus] = useState({
        currentFilter: "ownFilter",
        searchTerm: ""
    });

    const defaultValues = {
        trainingLengthRadioGroup: "questionsCountRadioButton",
        trainingName: "My Training"
    };

    const methods = useForm({defaultValues});

    const accessToken = useSelector(state => state.user.accessToken);

    const handleAddingAnotherQuestionnaire = () => setSelectQuestionnairePageIsShown(true);
    const handleDeleteQuestionnaire = (id) => setTrainingStatus(prevState => ({
        ...prevState,
        selectedQuestionnaires: prevState.selectedQuestionnaires.filter(questionnaire => questionnaire.id !== id)
    }));
    const handleConfirmingAddingQuestionnaire = (addedQuestionnaire) => {
        setTrainingStatus(prevState => ({
            ...prevState,
            selectedQuestionnaires: [
                ...prevState.selectedQuestionnaires,
                addedQuestionnaire
            ]
        }));
        setSelectQuestionnairePageIsShown(false);
    }
    const handleSettingTrainingLength = (value) => {
        setTrainingStatus(prevState => ({
            ...prevState,
            trainingLengthAsQuestionsCount: value ==="questionsCountRadioButton"
        }));
    }

    const handleSettingTrainingName = (value) => {
        setTrainingStatus(prevState => ({
            ...prevState,
            name: value
        }));
    }

    useEffect(() => {
        try {
            const refreshStatsFunc = async () => {
                dispatchQuestionnairesStats({ type: 'setIsLoading' });

                let newQuestionnairesStatsItems = [];
                let newQuestionsTotalCount = 0;
                let newNewQuestionsCount = 0;
                let newRecheckedQuestionsCount = 0;

                //refresh stats items list by adding/deleting absent elements, calculate known values
                trainingStatus.selectedQuestionnaires.forEach(questionnaire => {
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
                        const response = await callApi(`/Repository/Questionnaire/${questionnaireStatsItem.id}?calculateTime=true`, "GET", accessToken);
                        if (response.ok) {
                            const result = await response.json();
                            return ({
                                id: questionnaireStatsItem.id,
                                filled: true,
                                totalTrainingTimeSeconds: result.totalTrainingTimeSeconds
                            });
                        }
                        else {
                            throw new Error("Unable to get questionnaire stats.");
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
            refreshStatsFunc().catch(console.error);
        }
        catch (error) {
            console.log(error);
            dispatchQuestionnairesStats({
                type: 'setError',
                errorMessage: error
            });
        }
    }, [trainingStatus.selectedQuestionnaires]);

    let result = selectQuestionnairePageIsShown ? (
        <div className="route-element-with-return-button">
            <ReturnToPage customClickHandler={() => setSelectQuestionnairePageIsShown(false)} text="Return to the training page" />
            <SelectQuestionnairePage
                alreadySelectedQuestionnaires={trainingStatus.selectedQuestionnaires}
                handleConfirmingAddingQuestionnaire={handleConfirmingAddingQuestionnaire}
                status={selectQuestionnairePageStatus}
                setStatus={setSelectQuestionnairePageStatus}
            />
        </div>
    ) : (
        <div className="route-element-with-return-button">
            <ReturnToPage path="/" text="Return to the main page" />
            <ConfigureTrainingShell
                    trainingStatus={trainingStatus}
                    handleAddingAnotherQuestionnaire={handleAddingAnotherQuestionnaire}
                    handleDeleteQuestionnaire={handleDeleteQuestionnaire}
                    handleSettingTrainingLength={handleSettingTrainingLength}
                    setName={handleSettingTrainingName}
                    formMethods={methods}
                    questionnairesStats={questionnairesStats}
            />
        </div>
    );

    return result;
}

export default ConfigureTrainingPage;