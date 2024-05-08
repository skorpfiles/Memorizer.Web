import { FormProvider, useForm } from 'react-hook-form';
import TypingAnswerInputContainerWithValidation from './TypingAnswerInputContainerWithValidation';
import { useSelector } from 'react-redux';
import { useReducer } from 'react';
import { useGoingNext } from '../../hooks/useGoingNext';
import styles from './TypingAnswerPanel.module.css';

function TypingAnswerPanel() {
    const methods = useForm();
    const goNext = useGoingNext();
    const handleSubmitNextAnswer = data => {
        console.log(data);
        const newResultAnswers = [...typing.resultAnswers, data.typedAnswer];
        dispatchTyping({ type: 'set', newResultAnswers });
        if (newResultAnswers.length === typedAnswersLength) {
            goNext(true, null, newResultAnswers, false);
        }
        else {
            methods.setValue('typedAnswer', '');
        }
    }

    const handleSubmitIDontKnow = () => {
        goNext(true, false, typing.resultAnswers, true);
    }

    const typedAnswersLength = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].typedAnswers.length);

    const typingReducer = (state, action) => {
        if (action.type === 'set') {
            return {
                resultAnswers: action.newResultAnswers,
                currentAnswerIndex: action.newResultAnswers.length + 1
            }
        }
        else {
            return null;
        }
    }

    const [typing, dispatchTyping] = useReducer(typingReducer, {
        resultAnswers: [],
        currentAnswerIndex: 1
    });

    return (
        <FormProvider {...methods}>
            <form className='column' onSubmit={methods.handleSubmit(handleSubmitNextAnswer)}>
                <TypingAnswerInputContainerWithValidation
                    currentIndex={typing.currentAnswerIndex}
                    answersCount={typedAnswersLength}
                    inputValidation={{
                        required: {
                            value: true,
                            message: 'Answer is required.'
                        }
                    }}
                />
                <div className={`row ${styles['buttons-line']}`}>
                    <input type='submit' className='main-button border-radius-small font--main-for-controls flex-all-free-space' value='OK' />
                    <button className={`main-button border-radius-small font--main-for-controls ${styles['i-dont-know-button']}`} onClick={handleSubmitIDontKnow}>I don't know</button>
                </div>
            </form>
        </FormProvider>
    );
}

export default TypingAnswerPanel;