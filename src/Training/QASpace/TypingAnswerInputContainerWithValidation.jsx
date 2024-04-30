import { useFormContext } from 'react-hook-form';
import { findInputError, isFormInvalid } from '../../Utils/ValidationUtils.js';
function TypingAnswerInputContainerWithValidation(props) {
    const { register, formState: { errors }} = useFormContext();

    const inputError = findInputError(errors, 'typedAnswer');
    const isInvalid = isFormInvalid(inputError);

    return (
        <div className='row border-radius-small' style={{ "border": "0.1rem solid black", "backgroundColor": "white", "padding": "0.5rem", "margin": "0.25rem 0" }}>
            <div style={{ "backgroundColor": "#DAE3F3", "padding": "0.5rem" }}>{props.currentIndex} of {props.answersCount}</div>
            <input
                className='full-width font--main-for-controls'
                id='typedAnswer'
                type='text'
                placeholder='Type an answer'
                style={{ "flex": "1 0 0", "border": "none", "padding": "0.5rem", "boxSizing": "border-box" }}
                {...register('typedAnswer', { disabled: props.disabled, ...props.inputValidation })}
            />
            {isInvalid && (
                <div className='validation-label' key={props.inputId + '_errorMessage'}>{inputError.error.message}</div>
            )}
        </div>
    );
}

export default TypingAnswerInputContainerWithValidation;