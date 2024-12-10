import { useFormContext } from 'react-hook-form';
import { findInputError, isFormInvalid } from '../Utils/ValidationUtils.js';

function InputWithValidation(props) {
    const { register, formState: { errors } } = useFormContext();

    const inputError = findInputError(errors, props.inputName);
    const isInvalid = isFormInvalid(inputError);

    return (
        <div className={props.containerClassName} style={props.containerStyle}>
            <input
                className={props.inputClassName}
                id={props.inputId}
                type={props.inputType}
                step={props.inputStep}
                placeholder={props.inputPlaceholder}
                style={props.inputStyle}
                {...register(props.inputName, { disabled: props.disabled, ...props.inputValidation })}
            />
            {isInvalid && (
                <div className={props.validationLabelClassName} key={props.inputId+'_errorMessage'}>{inputError.error.message}</div>
            )}
        </div>
    );
}

export default InputWithValidation;