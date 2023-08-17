import DotRadioButton from '../DotRadioButton';
import { useFormContext } from 'react-hook-form';
import { findInputError, isFormInvalid } from '../Utils/ValidationUtils.js';

function TrainingLengthOption(props) {

    const { register, formState: { errors } } = useFormContext();

    const inputError = findInputError(errors, props.inputId);
    const isInvalid = isFormInvalid(inputError);

    return (
        <div className="GroupInsidePanel-2xMargin">
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <DotRadioButton
                    id={props.radioButtonId}
                    key={props.radioButtonId}
                    name={props.radioButtonsName}
                    value={props.radioButtonId}
                    onChange={props.handleSettingRadioButton}
                />
                <div className="Font-MainForSmallLabels">{props.title}</div>
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <input
                    className="MainTextBox SmallBorderRadius Font-MainForControls"
                    id={props.inputId}
                    type="number"
                    style={{ width: "5em" }}
                    {...register(props.inputId, { disabled: props.isInputDisabled,
                        validate: {
                            required: value => {
                                if (!value && props.formMethods.getValues(props.radioButtonsName) === props.radioButtonId)
                                    return 'Required when the option is selected.';
                                return true;
                            }
                        }
                    })}
                />
                <div className="Font-MainForSmallLabels" style={{ marginLeft: "0.5em" }}>{props.note}</div>
            </div>
            {isInvalid && (
                <div className="ValidationLabel" key={props.inputId + "_errorMessage"}>{inputError.error.message}</div>
            )}
        </div>
    )
}

export default TrainingLengthOption;