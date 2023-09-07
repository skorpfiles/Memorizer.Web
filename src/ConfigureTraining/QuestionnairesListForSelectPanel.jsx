import { useEffect, useReducer } from 'react';
import { callApi } from '../Utils/GlobalUtils';
import QuestionnairesListForSelectElement from "./QuestionnairesListForSelectElement";
import PageSwitcher from "./PageSwitcher";
import { useSelector } from 'react-redux';

function QuestionnairesListForSelectPanel(props) {
    const questionnairesForSelectListReducer = (state, action) => {
        switch (action.type) {
            case 'setIsLoading':
                return {
                    items: null,
                    currentPage: null,
                    totalPages: null,
                    isFirstLoading: state.isFirstLoading,
                    isLoading: true,
                    isLoadingSuccessful: false,
                    isLoadingError: false,
                    loadingErrorMessage: null
                };
            case 'setSuccess':
                return {
                    items: action.items,
                    currentPage: action.currentPage,
                    totalPages: action.totalPages,
                    isFirstLoading: false,
                    isLoading: false,
                    isLoadingSuccessful: true,
                    isLoadingError: false,
                    loadingErrorMessage: null
                };
            case 'setError':
                return {
                    items: null,
                    currentPage: null,
                    totalPages: null,
                    isFirstLoading: false,
                    isLoading: false,
                    isLoadingSuccessful: false,
                    isLoadingError: true,
                    loadingErrorMessage: action.errorMessage
                };
            default:
                return { ...state };
        }
    }

    const [questionnairesForSelectList, dispatchQuestionnairesForSelectList] = useReducer(questionnairesForSelectListReducer, {
        items: null,
        currentPage: null,
        totalPages: null,
        isFirstLoading: true,
        isLoading: true,
        isLoadingSuccessful: false,
        isLoadingError: false,
        loadingErrorMessage: null
    });

    const accessToken = useSelector(state => state.user.accessToken);

    useEffect(() => {
        const debounce = setTimeout(() => {
            dispatchQuestionnairesForSelectList({ type: 'setIsLoading' });

            try {
                const getUsersAndQuestionnairesListFunc = async () => {
                    let url = "/Repository/Questionnaires?origin=" + props.currentOrigin;
                    if (props.currentSearchTerm) {
                        url += "&partOfName=" + encodeURIComponent(props.currentSearchTerm);
                    }

                    const response =
                        await callApi(url, "GET", accessToken);
                    if (response.ok) {
                        const result = await response.json();
                        dispatchQuestionnairesForSelectList({
                            type: 'setSuccess',
                            items: result.questionnaires.filter(item => item.countsOfQuestions.total > 0 && !props.alreadySelectedQuestionnaires.some(item2 => item2.id === item.id)),
                            currentPage: result.questionnaires.length > 0 ? 1 : 0,
                            totalPages: result.totalPages
                        });
                    }
                    else {
                        const result = await response.json();
                        dispatchQuestionnairesForSelectList({ type: 'setError', errorMessage: `${response.status} ${result.errorText}` });
                    }
                }
                getUsersAndQuestionnairesListFunc().catch(console.error);
            }
            catch (error) {
                console.log(error);
                dispatchQuestionnairesForSelectList({ type: 'setError', errorMessage: 'Error: Unable to connect to the API.' });
            }
        }, 300);
        return () => clearTimeout(debounce);
    }, [props.currentOrigin, props.currentSearchTerm]);


    let data;
    if (questionnairesForSelectList.isLoading) {
        if (questionnairesForSelectList.isFirstLoading) {
            data = (<div className="central-text">Loading...</div>);
        }
        else {
            data = null;
        }
    }
    else if (questionnairesForSelectList.isLoadingSuccessful) {
        if (questionnairesForSelectList.items !== null && questionnairesForSelectList.items.length > 0) {
            data = (
                <ul className="font--main-for-lists tight-list">
                    {questionnairesForSelectList.items.map(item => <QuestionnairesListForSelectElement key={item.id} questionnaire={item} handleClick={() => props.handleConfirmingAddingQuestionnaire(item)} />)}
                </ul>
            )
        }
        else {
            data = (<div className="central-text">No items</div>);
        }
    }
    else {
        data = (<div className="central-text">{questionnairesForSelectList.loadingErrorMessage}</div>);
    }

    return (
        <div className="group-inside-panel panel display-flex border-radius-small flex-all-free-space">
            <div className="flex-all-free-space">
                {data}
            </div>
            <PageSwitcher currentPage={questionnairesForSelectList.currentPage} totalPages={questionnairesForSelectList.totalPages} />
        </div>
    );
}

export default QuestionnairesListForSelectPanel;