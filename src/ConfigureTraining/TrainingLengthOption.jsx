import DotRadioButton from '../Controls/DotRadioButton';
import { useFormContext } from 'react-hook-form';
import { findInputError, isFormInvalid } from '../Utils/ValidationUtils.js';

import styles from './TrainingLengthOption.module.css';

function TrainingLengthOption(props) {

    const { register, formState: { errors } } = useFormContext();

    const inputError = findInputError(errors, props.inputId);
    const isInvalid = isFormInvalid(inputError);

    return (
        <div className='group-inside-panel--2x-margin'>
            <div className='row'>
                <DotRadioButton
                    id={props.radioButtonId}
                    key={props.radioButtonId}
                    name={props.radioButtonsName}
                    value={props.radioButtonId}
                    checked={props.radioButtonChecked}
                    onChange={props.handleSettingRadioButton}
                />
                <div className='font--main-for-small-labels'>{props.title}</div>
            </div>
            <div className='row'>
                <input
                    className={`main-text-box border-radius-small font--main-for-controls ${styles['input']}`}
                    id={props.inputId}  
                    type='number'
                    {...register(props.inputId, { disabled: props.isInputDisabled,
                        validate: {
                            required: value => {
                                if (!value && props.formMethods.getValues(props.radioButtonsName) === props.radioButtonId)
                                    return 'Required when the option is selected.';
                                return true;
                            }
                        },
                        min: {
                            value: 1,
                            message: 'Must be 1 or more.'
                        },
                        max: {
                            value: props.maxValue,
                            message: `Must be ${props.maxValue} or less.`
                        }
                    })}
                />
                <div className='font--main-for-small-labels row--label-after-textbox'>{props.note}</div>
            </div>
            {isInvalid && (
                <div className='validation-label' key={props.inputId + '_errorMessage'}>{inputError.error.message}</div>
            )}
        </div>
    )
}

export default TrainingLengthOption;