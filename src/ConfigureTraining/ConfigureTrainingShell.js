import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import QuestionnairesListForTrainingPanel from './QuestionnairesListPanel/QuestionnairesListForTrainingPanel';
import DotRadioButton from '../DotRadioButton';

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
                    <div className="DisplayFlex GroupInsidePanel-2xMargin" style={{ alignItems:"center" }}>
                        <div className="Font-MainForSmallLabels" style={{marginRight:"1em"}}>Name:</div>
                        <InputWithValidation
                            inputType="text"
                            inputId="trainingName"
                            inputName="trainingName"
                            containerClassName="FlexAllFreeSpace"
                            inputClassName="MainTextBox FullWidth SmallBorderRadius Font-MainForControls"
                            value={props.trainingStatus.name}
                        />
                    </div>
                    <div className="DisplayFlex GroupInsidePanel-2xMargin" style={{flexDirection:"column"}}>
                        <div className="Font-MainForSmallLabels" style={{ marginBottom: "0.25em" }}>Questionnaires:</div>
                        <QuestionnairesListForTrainingPanel
                            selectedQuestionnaires={props.trainingStatus.selectedQuestionnaires}
                            handleAddingAnotherQuestionnaire={props.handleAddingAnotherQuestionnaire}
                            handleDeleteQuestionnaire={props.handleDeleteQuestionnaire}
                        />
                        <div className="CenterText" style={{ marginTop: "0.25em" }}>Questions: {props.trainingStatus.questionnairesStats.questionsTotalCount}; New: {props.trainingStatus.questionnairesStats.newQuestionsCount}; Recheck: {props.trainingStatus.questionnairesStats.recheckedQuestionsCount}; Approx. max time to train: {props.trainingStatus.questionnairesStats.maxTimeToTrainMinutes} min.</div>
                    </div>
                    <div className="GroupInsidePanel-2xMargin">
                        <div style={{ display: "flex", flexDirection:"row", alignItems:"center" }}>
                            <DotRadioButton id="questionsCountRadioButton" name="trainingLengthRadioGroup" checked={props.trainingStatus.trainingLengthAsQuestionsCount} onChange={() => props.setTrainingLengthAsQuestionsCount(true) } />
                            <div className="Font-MainForSmallLabels">How many questions would you like to train now?</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <InputWithValidation
                                inputType="text"
                                inputId="questionsCount"
                                inputName="questionsCount"
                                inputClassName="MainTextBox SmallBorderRadius Font-MainForControls"
                                inputStyle={{ width: "5em" }}
                                disabled={!props.trainingStatus.trainingLengthAsQuestionsCount}
                            />
                            <div className="Font-MainForSmallLabels" style={{ marginLeft: "0.5em" }}>(max {props.trainingStatus.questionnairesStats.questionsTotalCount} for these questionnaires)</div>
                        </div>
                    </div>
                    <div className="GroupInsidePanel-2xMargin">
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <DotRadioButton id="timeRadioButton" name="trainingLengthRadioGroup" checked={!props.trainingStatus.trainingLengthAsQuestionsCount} onChange={() => props.setTrainingLengthAsQuestionsCount(false)} />
                            <div className="Font-MainForSmallLabels">Or how much time would you like to spend for the training?</div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <InputWithValidation
                                inputType="text"
                                inputId="time"
                                inputName="time"
                                inputClassName="MainTextBox SmallBorderRadius Font-MainForControls"
                                inputStyle={{ width: "5em" }}
                                disabled={props.trainingStatus.trainingLengthAsQuestionsCount}
                            />
                            <div className="Font-MainForSmallLabels" style={{ marginLeft: "0.5em" }}>(minutes; max {props.trainingStatus.questionnairesStats.maxTimeToTrainMinutes} for these questionnaires)</div>
                        </div>
                    </div>
                    <div className="GroupInsidePanel-2xMargin DisplayFlex">
                        <input type="submit" className="MainButton IncreaseButtonHeight CentralButton-SmallWidth Font-MainForControls" disabled={!props.trainingStatus.selectedQuestionnaires || props.trainingStatus.selectedQuestionnaires.length===0} value="Start Training!" />
                    </div>
                    <div className="GroupInsidePanel-2xMargin">
                        Add the next page to your bookmarks if you want to have a quick direct access to starting this training.
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default ConfigureTrainingShell;