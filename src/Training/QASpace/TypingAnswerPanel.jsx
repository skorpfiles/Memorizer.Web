import { FormProvider, useForm } from 'react-hook-form';
import TypingAnswerInputContainerWithValidation from './TypingAnswerInputContainerWithValidation';
import { useSelector } from 'react-redux';
import { useReducer, useEffect, useState } from 'react';
import { useGoingNext } from '../../hooks/useGoingNext';
import styles from './TypingAnswerPanel.module.css';

function TypingAnswerPanel() {
    const methods = useForm();
    const goNext = useGoingNext();
    const onSubmit = data => {
        console.log(data);
        dispatchTyping({ type: 'push', newAnswer: data.typedAnswer });
        methods.setValue('typedAnswer', '');
    }

    const typedAnswersLength = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].typedAnswers.length);

    const typingReducer = (state, action) => {
        if (action.type === 'push') {
            return {
                resultAnswers: [...state.resultAnswers, action.newAnswer],
                currentAnswerIndex: state.currentAnswerIndex + 1
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

    const [iDontKnow, setIDontKnow] = useState(false);

    useEffect(() => {
        if (typing.currentAnswerIndex > typedAnswersLength || iDontKnow) {
            goNext(true, iDontKnow ? false : null, typing.resultAnswers, iDontKnow);
        }
    }, [goNext, typedAnswersLength, typing.currentAnswerIndex, typing.resultAnswers, iDontKnow]);

    return (
        <FormProvider {...methods}>
            <form className='column' onSubmit={methods.handleSubmit(onSubmit)}>
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
                    <button className={`main-button border-radius-small font--main-for-controls ${styles['i-dont-know-button']}`} onClick={() => setIDontKnow(true)}>I don't know</button>
                </div>
            </form>
        </FormProvider>
    );
}

export default TypingAnswerPanel;