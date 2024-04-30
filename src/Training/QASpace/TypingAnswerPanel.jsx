import { FormProvider, useForm } from 'react-hook-form';
import TypingAnswerInputContainerWithValidation from './TypingAnswerInputContainerWithValidation';
import { useSelector } from 'react-redux';
import { useReducer } from 'react';
import { useGoingNext } from '../../hooks/useGoingNext';

function TypingAnswerPanel() {
    const methods = useForm();
    const goNext = useGoingNext();
    const onSubmit = data => {
        console.log(data);
        dispatchTyping({ type: 'push', newAnswer: data.typedAnswer });
        if (typing.currentAnswerIndex === typedAnswersLength) {
            goNext({ gotAnswer: true, isAnswerCorrect: null, givenTypedAnswers: typing.resultAnswers });
        }
        else {
            methods.setValue('typedAnswer', '');
        }
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
                <div className='row' style={{ "margin": "0.25rem 0" }}>
                    <input type='submit' className='main-button border-radius-small font--main-for-controls flex-all-free-space' value='OK'/>
                    <button className='main-button border-radius-small font--main-for-controls' style={{ "marginLeft": "0.5rem" }}>I don't know</button>
                </div>
            </form>
        </FormProvider>
    );
}

export default TypingAnswerPanel;