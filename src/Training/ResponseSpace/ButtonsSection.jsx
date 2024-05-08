import SingleButton from './ButtonsSection/SingleButton';
import TrueFalseButtons from './ButtonsSection/TrueFalseButtons';
import MainButtonWithObjectionButton from './ButtonsSection/MainButtonWithObjectionButton';
import styles from './ButtonsSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { trainingStateActions } from '../../ReduxStore/training';
import { useGoingNext } from '../../hooks/useGoingNext';

function ButtonsSection() {
    const dispatch = useDispatch();
    const goNext = useGoingNext();

    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const trainingStage = useSelector(state => state.trainingState.trainingStage);

    const isAnswerCorrect = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].isAnswerCorrect);
    const iDontKnow = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].iDontKnow);

    const handleGoNext = () => {
        goNext(false);
    }

    const handleAnswer = (isResponsedAnswerCorrect, givenTypedAnswers) => {
        goNext(true, isResponsedAnswerCorrect, givenTypedAnswers);
    }

    const handleChallengingIncorrectness = () => {
        dispatch(trainingStateActions.challengeIncorrectness());
    }

    const answerSendingIsGoing = useSelector(state => state.answerSendingState.isExecuting);

    let selectedComponent;
    switch (questionType) {
        case 'task': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Done' disabled={answerSendingIsGoing} handleClick={()=>handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<TrueFalseButtons trueText='Yes' falseText='No' disabled={answerSendingIsGoing}
                    handleTrueClick={() => handleAnswer(true, [])} handleFalseClick={() => handleAnswer(false, [])} />); break;
                default: break;
            }
            break;
        }
        case 'untypedAnswer': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<SingleButton text='Check the answer' disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'check': selectedComponent = (<TrueFalseButtons trueText='Correct' falseText='Incorrect' disabled={answerSendingIsGoing}
                    handleTrueClick={() => handleAnswer(true, [])} handleFalseClick={() => handleAnswer(false, [])} />); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': case 'untypedAndTypedAnswers': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': break; //show nothing
                case 'check': {
                    if (isAnswerCorrect || iDontKnow) {
                        selectedComponent = (<SingleButton text='Next' disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />);
                    }
                    else {
                        selectedComponent = selectedComponent = (<MainButtonWithObjectionButton mainText='Next' objectionText='It was correct!' disabled={answerSendingIsGoing}
                            handleMainButtonClick={() => handleAnswer(null, [])} handleObjectionButtonClick={() => handleChallengingIncorrectness()} />);
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