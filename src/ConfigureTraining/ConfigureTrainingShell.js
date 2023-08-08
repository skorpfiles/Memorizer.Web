import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import QuestionnairesListForTrainingPanel from './QuestionnairesListForTrainingPanel';

function ConfigureTrainingShell(props) {

    const methods = useForm();
    const onSubmit = data => console.info(data);

    return (
        <div className="Column-medium VerticalFullHeightColumn DisplayFlex">
            <div className="TitleBeforePanel">
                <div className="Font-MainForLabels">
                    Configure your training
                </div>
            </div>
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="DisplayFlex GroupInsidePanel" style={{ alignItems:"center" }}>
                        <div className="Font-MainForSmallLabels" style={{marginRight:"1em"}}>Name:</div>
                        <InputWithValidation
                            inputType="text"
                            inputId="trainingName"
                            inputName="trainingName"
                            containerClassName="FlexAllFreeSpace"
                            inputClassName="MainTextBox FullWidth SmallBorderRadius Font-MainForControls"
                        />
                    </div>
                    <div className="DisplayFlex GroupInsidePanel" style={{flexDirection:"column"}}>
                        <div className="Font-MainForSmallLabels" style={{ marginBottom: "0.25em" }}>Questionnaires:</div>
                        <QuestionnairesListForTrainingPanel
                            selectedQuestionnaires={props.selectedQuestionnaires}
                            handleAddingAnotherQuestionnaire={props.handleAddingAnotherQuestionnaire} />
                        <div className="CenterText" style={{ marginTop: "0.25em" }}>Questions: {props.questionnairesStats.questionsTotalCount}; New: {props.questionnairesStats.newQuestionsCount}; Recheck: {props.questionnairesStats.recheckedQuestionsCount}; Approx. max time to train: {props.questionnairesStats.maxTimeToTrainMinutes} min.</div>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default ConfigureTrainingShell;