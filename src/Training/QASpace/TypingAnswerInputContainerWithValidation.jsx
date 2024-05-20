import { useFormContext } from 'react-hook-form';
import { findInputError, isFormInvalid } from '../../Utils/ValidationUtils.js';
import styles from './TypingAnswerInputContainerWithValidation.module.css';
import { useEffect } from 'react';

function TypingAnswerInputContainerWithValidation(props) {
    const { register, setFocus, formState: { errors }} = useFormContext();

    const inputError = findInputError(errors, 'typedAnswer');
    const isInvalid = isFormInvalid(inputError);

    useEffect(() => {
        if (props.focus) {
            setFocus('typedAnswer');
        }
    }, [props.focus, setFocus]);

    return (
        <div className={`row border-radius-small ${styles['container']}`}>
            {props.answersCount > 1 && (<div className={styles['answers-counter']}>{props.currentIndex} of {props.answersCount}</div>)}
            <input
                className={`full-width font--main-for-controls ${styles['answer-input']}`}
                id='typedAnswer'
                type='text'
                placeholder='Type an answer'
                {...register('typedAnswer', { disabled: props.disabled, ...props.inputValidation })}
            />
            {isInvalid && (
                <div className='validation-label'>{inputError.error.message}</div>
            )}
        </div>
    );
}

export default TypingAnswerInputContainerWithValidation;