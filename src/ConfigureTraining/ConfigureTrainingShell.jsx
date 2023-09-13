import { FormProvider } from 'react-hook-form';
import InputWithValidation from '../Controls/InputWithValidation';
import QuestionnairesListForTrainingPanel from './QuestionnairesListPanel/QuestionnairesListForTrainingPanel';
import TrainingLengthOption from './TrainingLengthOption';
import styles from './ConfigureTrainingShell.module.css';

function ConfigureTrainingShell(props) {

    const onSubmit = data => console.info(data);

    let statsText, questionsCountRadioButtonNote = "", timeRadioButtonNote = "(minutes)";

    if (props.questionnairesStats.isLoading) {
        statsText = "Loading...";
    }
    else if (props.questionnairesStats.isFinished) {
        if (props.questionnairesStats.isSuccessful) {
            statsText = `Questions: ${props.questionnairesStats.stats.questionsTotalCount}; New: ${props.questionnairesStats.stats.newQuestionsCount}; Recheck: ${props.questionnairesStats.stats.recheckedQuestionsCount}; Approx.max time to train: ${props.questionnairesStats.stats.maxTimeToTrainMinutes} min.`;
            if (props.questionnairesStats.stats.questionsTotalCount > 0) {
                questionsCountRadioButtonNote = `(max ${props.questionnairesStats.stats.questionsTotalCount} for these questionnaires)`;
                timeRadioButtonNote = `(minutes; max ${props.questionnairesStats.stats.maxTimeToTrainMinutes} for these questionnaires)`;
            }
        }
        else {
            statsText = "A error during loading statistics.";
        }
    }
    else {
        statsText = "";
    }

    return (
        <div className="column-medium vertical-full-height-column display-flex">
            <div className="title-before-panel">
                <div className="font--main-for-labels">
                    Configure your training
                </div>
            </div>
            <FormProvider {...props.formMethods}>
                <form onSubmit={props.formMethods.handleSubmit(onSubmit)}>
                    <div className="group-inside-panel--2x-margin row">
                        <div className="font--main-for-small-labels row--label-before-textbox">Name:</div>
                        <InputWithValidation
                            inputType="text"
                            inputId="trainingName"
                            inputName="trainingName"
                            containerClassName="flex-all-free-space"
                            inputClassName="main-text-box full-width border-radius-small font--main-for-controls"
                            validationLabelClassName="validation-label"
                            value={props.trainingStatus.name}
                            inputValidation={{
                                required: {
                                    value: true,
                                    message: "Name is required."
                                },
                                maxLength: {
                                    value: 10000,
                                    message: "Username must have maximum 10000 symbols."
                                }
                            }}
                        />
                    </div>
                    <div className="group-inside-panel--2x-margin column">
                        <div className="font--main-for-small-labels">Questionnaires:</div>
                        <QuestionnairesListForTrainingPanel
                            selectedQuestionnaires={props.trainingStatus.selectedQuestionnaires}
                            handleAddingAnotherQuestionnaire={props.handleAddingAnotherQuestionnaire}
                            handleDeleteQuestionnaire={props.handleDeleteQuestionnaire}
                        />
                        <div className={`central-text ${styles['stats-text']}`}>{statsText}</div>
                    </div>
                    <TrainingLengthOption
                        radioButtonId="questionsCountRadioButton"
                        radioButtonsName="trainingLengthRadioGroup"
                        handleSettingRadioButton={props.handleSettingTrainingLength}
                        title="How many questions would you like to train now?"
                        inputId="questionsCount"
                        isInputDisabled={!props.trainingStatus.trainingLengthAsQuestionsCount}
                        note={questionsCountRadioButtonNote}
                        maxValue={props.questionnairesStats.stats.questionsTotalCount}
                        formMethods={props.formMethods}
                    />
                    <TrainingLengthOption
                        radioButtonId="timeRadioButton"
                        radioButtonsName="trainingLengthRadioGroup"
                        handleSettingRadioButton={props.handleSettingTrainingLength}
                        title="Or how much time would you like to spend for the training?"
                        inputId="time"
                        isInputDisabled={props.trainingStatus.trainingLengthAsQuestionsCount}
                        note={timeRadioButtonNote}
                        maxValue={props.questionnairesStats.stats.maxTimeToTrainMinutes}
                        formMethods={props.formMethods}
                    />
                    <div className="group-inside-panel--2x-margin display-flex">
                        <input type="submit" className="main-button increased-button-height central-button--small-width font--main-for-controls border-radius-big" disabled={!props.trainingStatus.selectedQuestionnaires || props.trainingStatus.selectedQuestionnaires.length===0} value="Start Training!" />
                    </div>
                    <div className="group-inside-panel--2x-margin">
                        Add the next page to your bookmarks if you want to have a quick direct access to starting this training.
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default ConfigureTrainingShell;