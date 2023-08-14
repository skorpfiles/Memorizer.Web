import ConfigureTrainingShell from '../../ConfigureTraining/ConfigureTrainingShell';
import InputWithValidation from '../../InputWithValidation';
import { useState } from 'react';
import SelectQuestionnairePage from './SelectQuestionnairePage';
import ReturnToPage from '../../ReturnToPage';

function ConfigureTrainingPage(props) {
    const [trainingStatus, setTrainingStatus] = useState({
        name: "My Training",
        selectedQuestionnaires: [],
        questionnairesStats: {
            questionsTotalCount: 0,
            newQuestionsCount: 0,
            recheckedQuestionsCount: 0,
            maxTimeToTrainMinutes: 0
        },
        trainingLengthAsQuestionsCount: true
    });

    const [selectQuestionnairePageIsShown, setSelectQuestionnairePageIsShown] = useState(true); //defines if the SelectQuestionnairePage component is shown in this moment instead of ConfigureTrainingShell.

    const [selectQuestionnairePageStatus, setSelectQuestionnairePageStatus] = useState({
        currentFilter: "ownFilter",
        searchTerm: ""
    });

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
    const handleSettingTrainingLengthAsQuestionsCount = (value) => {
        setTrainingStatus(prevState => ({
            ...prevState,
            trainingLengthAsQuestionsCount: value
        }));
    }

    let result = selectQuestionnairePageIsShown ? (
        <div className="RouteElementWithReturnButton">
            <ReturnToPage customClickHandler={() => setSelectQuestionnairePageIsShown(false)} text="Return to the training page" />
            <SelectQuestionnairePage
                currentUser={props.currentUser}
                alreadySelectedQuestionnaires={trainingStatus.selectedQuestionnaires}
                handleConfirmingAddingQuestionnaire={handleConfirmingAddingQuestionnaire}
                status={selectQuestionnairePageStatus}
                setStatus={setSelectQuestionnairePageStatus}
            />
        </div>
    ) : (
        <div className="RouteElementWithReturnButton">
            <ReturnToPage path="/" text="Return to the main page" />
            <ConfigureTrainingShell
                    trainingStatus={trainingStatus}
                    handleAddingAnotherQuestionnaire={handleAddingAnotherQuestionnaire}
                    handleDeleteQuestionnaire={handleDeleteQuestionnaire}
                    handleSettingTrainingLengthAsQuestionsCount={handleSettingTrainingLengthAsQuestionsCount}
            />
        </div>
    );

    return result;
}

export default ConfigureTrainingPage;