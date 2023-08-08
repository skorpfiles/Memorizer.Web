import { useFormContext } from 'react-hook-form';

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
                placeholder={props.inputPlaceholder}
                disabled={props.disabled}
                {...register(props.inputName, props.inputValidation)}
            />
            {isInvalid && (
                <div className={props.validationLabelClassName} key={props.inputId+"_errorMessage"}>{inputError.error.message}</div>
            )}
        </div>
    );
}

export function findInputError(errors, name) {
    const filtered = Object.keys(errors)
        .filter(key => key.includes(name))
        .reduce((cur, key) => {
            return Object.assign(cur, { error: errors[key] })
        }, {})
    return filtered
}

export const isFormInvalid = err => {
    if (Object.keys(err).length > 0) return true
    return false
}

export default InputWithValidation;