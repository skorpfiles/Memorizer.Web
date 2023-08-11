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

    let result = selectQuestionnairePageIsShown ? (
        <div className="RouteElementWithReturnButton">
            <ReturnToPage customClickHandler={() => setSelectQuestionnairePageIsShown(false)} text="Return to the training page" />
            <SelectQuestionnairePage
                currentUser={props.currentUser}
                alreadySelectedQuestionnaires={trainingStatus.selectedQuestionnaires}
                handleConfirmingAddingQuestionnaire={handleConfirmingAddingQuestionnaire}
            />
        </div>
    ) : (
        <div className="RouteElementWithReturnButton">
            <ReturnToPage path="/" text="Return to the main page" />
            <ConfigureTrainingShell
                trainingStatus={trainingStatus}
                handleAddingAnotherQuestionnaire={handleAddingAnotherQuestionnaire}
                handleDeleteQuestionnaire={handleDeleteQuestionnaire}
            />
        </div>
    );

    return result;
}

export default ConfigureTrainingPage;