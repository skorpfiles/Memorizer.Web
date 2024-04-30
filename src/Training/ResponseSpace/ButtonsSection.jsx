import SingleButton from './ButtonsSection/SingleButton';
import TrueFalseButtons from './ButtonsSection/TrueFalseButtons';
import MainButtonWithObjectionButton from './ButtonsSection/MainButtonWithObjectionButton';
import styles from './ButtonsSection.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { trainingStateActions } from '../../ReduxStore/training';
import { useSendQuestionAnswer } from '../../hooks/useSendQuestionAnswer';

function ButtonsSection(props) {
    const dispatch = useDispatch();
    const sendQuestionAnswer = useSendQuestionAnswer();
    const questionId = useSelector(state => state.trainingState.currentQuestion.id);
    const trainingStartTime = useSelector(state => state.trainingState.currentQuestion.trainingStartTime);
    const givenTypedAnswers = useSelector(state => state.trainingState.currentQuestion.givenTypedAnswers);
    const isAnswerCorrect = useSelector(state => state.trainingState.currentQuestion.isAnswerCorrect);
    const answerTimeMilliseconds = useSelector(state => state.trainingState.currentQuestion.answerTimeMilliseconds);

    const handleGoNext = () => {
        dispatch(trainingStateActions.goNext({ gotAnswer: false }));
    }

    const handleAnswer = (isAnswerCorrect, givenTypedAnswers) => {
        sendQuestionAnswer({
            questionId,
            trainingStartTime,
            givenTypedAnswers,
            isAnswerCorrect,
            answerTimeMilliseconds
        });
        dispatch(trainingStateActions.goNext({ gotAnswer: true, isAnswerCorrect, givenTypedAnswers }));
    }

    const handleChallengingIncorrectness = () => {
        dispatch(trainingStateActions.challengeIncorrectness());
    }

    let selectedComponent;
    switch (props.questionType) {
        case 'task': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Done' handleClick={()=>handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<TrueFalseButtons trueText='Yes' falseText='No'
                    handleTrueClick={() => handleAnswer(true, [])} handleFalseClick={() => handleAnswer(false, [])} />); break;
                default: break;
            }
            break;
        }
        case 'untypedAnswer': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<SingleButton text='Check the answer' handleClick={() => handleGoNext()} />); break;
                case 'check': selectedComponent = (<TrueFalseButtons trueText='Correct' falseText='Incorrect'
                    handleTrueClick={() => handleAnswer(true, [])} handleFalseClick={() => handleAnswer(false, [])} />); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': break; //show nothing
                case 'check': {
                    switch (props.typedAnswersCheckResultMode) {
                        case 'incorrect': selectedComponent = (<MainButtonWithObjectionButton mainText='Next' objectionText='It was correct!'
                            handleMainButtonClick={() => handleAnswer(null, [])} handleObjectionButtonClick={() => handleChallengingIncorrectness()} />); break;
                        case 'correct': selectedComponent = (<SingleButton text='Next' handleClick={() => handleGoNext()} />); break;
                        default: break;
                    }
                    break;
                }
                default: break;
            }
            break;
        }
        default: break;
    }
    return (
        <div className={styles['container']}>
            {selectedComponent}
        </div>
    )
}

export default ButtonsSection;