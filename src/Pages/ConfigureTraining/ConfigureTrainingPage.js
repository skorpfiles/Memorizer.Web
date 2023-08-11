import ConfigureTrainingShell from '../../ConfigureTraining/ConfigureTrainingShell';
import InputWithValidation from '../../InputWithValidation';
import { useState } from 'react';
import SelectQuestionnairePage from './SelectQuestionnairePage';

function ConfigureTrainingPage(props) {
    const [selectedQuestionnaires, setSelectedQuestionnaires] = useState([]);
    const [questionnairesStats, setQuestionnairesStats] = useState({
        questionsTotalCount: 0,
        newQuestionsCount: 0,
        recheckedQuestionsCount: 0,
        maxTimeToTrainMinutes: 0
    });
    const [selectQuestionnairePageIsShown, setSelectQuestionnairePageIsShown] = useState(false);
    const [trainingLengthAsQuestionsCount, setTrainingLengthAsQuestionsCount] = useState(true);

    const handleAddingAnotherQuestionnaire = () => setSelectQuestionnairePageIsShown(true);
    const handleDeleteQuestionnaire = (id) => setSelectedQuestionnaires(prevState => prevState.filter(questionnaire => questionnaire.id !== id));
    const handleConfirmingAddingQuestionnaire = (addedQuestionnaire) => {
        setSelectedQuestionnaires(prevState => ([
            ...prevState,
            addedQuestionnaire
        ]));
        setSelectQuestionnairePageIsShown(false);
    }

    let result = selectQuestionnairePageIsShown ? (
        <SelectQuestionnairePage
            currentUser={props.currentUser}
            handleConfirmingAddingQuestionnaire={handleConfirmingAddingQuestionnaire}
        />) : (
        <ConfigureTrainingShell
                selectedQuestionnaires={selectedQuestionnaires}
                handleAddingAnotherQuestionnaire={handleAddingAnotherQuestionnaire}
                questionnairesStats={questionnairesStats}
                trainingLengthAsQuestionsCount={trainingLengthAsQuestionsCount}
                setTrainingLengthAsQuestionsCount={setTrainingLengthAsQuestionsCount}
                handleDeleteQuestionnaire={handleDeleteQuestionnaire}
        />
    );

    return result;
}

export default ConfigureTrainingPage;