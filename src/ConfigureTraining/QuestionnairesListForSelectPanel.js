import { useState, useEffect } from 'react';
import { CallApi } from '../Utils/GlobalUtils';
import QuestionnairesListForSelectElement from "./QuestionnairesListForSelectElement";
import PageSwitcher from "./PageSwitcher";

function QuestionnairesListForSelectPanel(props) {
    const [questionnairesForSelectList, setQuestionnairesForSelectList] = useState({
        items: null,
        currentPage: null,
        totalPages: null,
        isLoading: true,
        isLoadingSuccessful: false,
        isLoadingError: false,
        loadingErrorMessage: null
    });

    useEffect(() => {
        try {
            const getUsersAndQuestionnairesListFunc = async () => {
                const response =
                    await CallApi("/Repository/Questionnaires?origin=" + props.currentOrigin, "GET", props.currentUser.accessToken);
                if (response.ok) {
                    const result = await response.json();
                    setQuestionnairesForSelectList({
                        items: result.questionnaires,
                        currentPage: result.questionnaires.length>0 ? 1 : 0,
                        totalPages: result.totalPages,
                        isLoading: false,
                        isLoadingSuccessful: true,
                        isLoadingError: false,
                        loadingErrorMessage: null
                    });
                }
                else {
                    const result = await response.json();
                    setQuestionnairesForSelectList({
                        items: null,
                        currentPage: null,
                        totalPages: null,
                        isLoading: false,
                        isLoadingSuccessful: false,
                        isLoadingError: true,
                        loadingErrorMessage: `${response.status} ${result.errorText}`
                    });
                }
            }
            getUsersAndQuestionnairesListFunc().catch(console.error);
        }
        catch (error) {
            console.log(error);
            setQuestionnairesForSelectList({
                items: null,
                currentPage: null,
                totalPages: null,
                isLoading: false,
                isLoadingSuccessful: false,
                isLoadingError: true,
                loadingErrorMessage: "Error: Unable to connect to the API."
            });
        }
    }, [props.currentOrigin]);


    let data;
    if (questionnairesForSelectList.isLoading) {
        data = (<div className="CenterText">Loading...</div>);
    }
    else if (questionnairesForSelectList.isLoadingSuccessful) {
        if (questionnairesForSelectList.items !== null && questionnairesForSelectList.items.length > 0) {
            data = (
                <ul className="Font-MainForLists TightList">
                    {questionnairesForSelectList.items.map(item => <QuestionnairesListForSelectElement questionnaire={item} />)}
                </ul>
            )
        }
        else {
            data = (<div className="CenterText">No items</div>);
        }
    }
    else {
        data = (<div className="CenterText">{questionnairesForSelectList.loadingErrorMessage}</div>);
    }

    return (
        <div className="GroupInsidePanel Panel FullHeight">
            <div style={{flex:"1 0 auto"}}>
                {data}
            </div>
            <PageSwitcher currentPage={questionnairesForSelectList.currentPage} totalPages={questionnairesForSelectList.totalPages} />
        </div>
    );
}

export default QuestionnairesListForSelectPanel;