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
    const trainingStageParameters = useSelector(state => state.trainingState.trainingStageParameters);

    const handleGoNext = () => {
        goNext(false);
    }

    const handleAnswer = (isAnswerCorrect, givenTypedAnswers) => {
        goNext(true, isAnswerCorrect, givenTypedAnswers);
    }

    const handleChallengingIncorrectness = () => {
        dispatch(trainingStateActions.challengeIncorrectness());
    }

    let selectedComponent;
    switch (questionType) {
        case 'task': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Done' handleClick={()=>handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<TrueFalseButtons trueText='Yes' falseText='No'
                    handleTrueClick={() => handleAnswer(true, [])} handleFalseClick={() => handleAnswer(false, [])} />); break;
                default: break;
            }
            break;
        }
        case 'untypedAnswer': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<SingleButton text='Check the answer' handleClick={() => handleGoNext()} />); break;
                case 'check': selectedComponent = (<TrueFalseButtons trueText='Correct' falseText='Incorrect'
                    handleTrueClick={() => handleAnswer(true, [])} handleFalseClick={() => handleAnswer(false, [])} />); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': break; //show nothing
                case 'check': {
                    switch (trainingStageParameters[0]) {
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