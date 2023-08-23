import { useState, useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import QuestionnairesListForTrainingPanel from './QuestionnairesListPanel/QuestionnairesListForTrainingPanel';
import TrainingLengthOption from './TrainingLengthOption';
import { CallApi } from '../Utils/GlobalUtils';

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
        <div className="Column-medium VerticalFullHeightColumn DisplayFlex">
            <div className="TitleBeforePanel">
                <div className="Font-MainForLabels">
                    Configure your training
                </div>
            </div>
            <FormProvider {...props.formMethods}>
                <form onSubmit={props.formMethods.handleSubmit(onSubmit)}>
                    <div className="DisplayFlex GroupInsidePanel-2xMargin" style={{ alignItems: "baseline" }}>
                        <div className="Font-MainForSmallLabels" style={{ marginRight: "0.5em"}}>Name:</div>
                        <InputWithValidation
                            inputType="text"
                            inputId="trainingName"
                            inputName="trainingName"
                            containerClassName="FlexAllFreeSpace"
                            inputClassName="MainTextBox FullWidth SmallBorderRadius Font-MainForControls"
                            validationLabelClassName="ValidationLabel"
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
                    <div className="DisplayFlex GroupInsidePanel-2xMargin" style={{flexDirection:"column"}}>
                        <div className="Font-MainForSmallLabels" style={{ marginBottom: "0.25em" }}>Questionnaires:</div>
                        <QuestionnairesListForTrainingPanel
                            selectedQuestionnaires={props.trainingStatus.selectedQuestionnaires}
                            handleAddingAnotherQuestionnaire={props.handleAddingAnotherQuestionnaire}
                            handleDeleteQuestionnaire={props.handleDeleteQuestionnaire}
                        />
                        <div className="CenterText" style={{ marginTop: "0.25em" }}>{statsText}</div>
                    </div>
                    <TrainingLengthOption
                        radioButtonId="questionsCountRadioButton"
                        radioButtonsName="trainingLengthRadioGroup"
                        handleSettingRadioButton={props.handleSettingTrainingLength}
                        title="How many questions would you like to train now?"
                        inputId="questionsCount"
                        isInputDisabled={!props.trainingStatus.trainingLengthAsQuestionsCount}
                        questionsTotalCount={props.questionnairesStats.stats.questionsTotalCount}
                        note={questionsCountRadioButtonNote}
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
                        formMethods={props.formMethods}
                    />
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