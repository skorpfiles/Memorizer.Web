import SingleButton from './ButtonsSection/SingleButton';
import TrueFalseButtons from './ButtonsSection/TrueFalseButtons';
import MainButtonWithObjectionButton from './ButtonsSection/MainButtonWithObjectionButton';
import styles from './ButtonsSection.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { trainingStateActions } from '../../ReduxStore/training';
import { useGoingNext } from '../../hooks/useGoingNext';
import { useSendQuestionAnswer } from '../../hooks/useSendQuestionAnswer';
import { switchTextForDeviceType } from '../../Utils/GlobalUtils';

function ButtonsSection() {
    const dispatch = useDispatch();
    const goNext = useGoingNext();
    const sendQuestionAnswer = useSendQuestionAnswer();

    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const trainingStage = useSelector(state => state.trainingState.trainingStage);

    const isAnswerCorrect = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].isAnswerCorrect);
    const iDontKnow = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].iDontKnow);
    const questionIsChallenged = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].challenged);

    const questionId = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].id);
    const trainingStartTime = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].trainingStartTime);
    const answerTimeMilliseconds = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].answerTimeMilliseconds);

    const havingGotTypedAnswers = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].givenTypedAnswers);

    const answerSendingStateIsError = useSelector(state => state.answerSendingState.isError);

    const handleGoNext = () => {
        console.log('handleGoNext');
        goNext(false);
    }

    const handleAnswer = async (isResponsedAnswerCorrect, givenTypedAnswers, sendAnswer) => {
        if (sendAnswer) {
            await sendQuestionAnswer({
                questionId,
                trainingStartTime,
                givenTypedAnswers,
                isAnswerCorrect: isResponsedAnswerCorrect,
                answerTimeMilliseconds: answerTimeMilliseconds ?? (Date.now() - trainingStartTime)
            });
        }
        if (!answerSendingStateIsError) {
            console.log(`handleAnswer: Going next because answerSendingStateIsError is ${answerSendingStateIsError}`);
            goNext(true, isResponsedAnswerCorrect, givenTypedAnswers);
        };
    }

    const handleSendingHavingGotAnswerAndGoingNext = async (isResponsedAnswerCorrect) => {
        await sendQuestionAnswer({
            questionId,
            trainingStartTime,
            givenTypedAnswers: havingGotTypedAnswers,
            isAnswerCorrect: isResponsedAnswerCorrect ?? isAnswerCorrect,
            answerTimeMilliseconds: answerTimeMilliseconds ?? (Date.now() - trainingStartTime)
        });
        if (!answerSendingStateIsError) {
            console.log(`handleSendingHavingGotAnswerAndGoingNext: Going next because answerSendingStateIsError is ${answerSendingStateIsError}`);
            goNext(false);
        }
    }

    const handleChallengingIncorrectness = () => {
        dispatch(trainingStateActions.challengeIncorrectness());
    }

    const answerSendingIsGoing = useSelector(state => state.answerSendingState.isExecuting);



    let selectedComponent;
    switch (questionType) {
        case 'task': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text={switchTextForDeviceType('Done','Done (Enter)')} disabled={answerSendingIsGoing} handleClick={()=>handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<TrueFalseButtons trueText={switchTextForDeviceType('Yes', 'Yes (Q)')} falseText={switchTextForDeviceType('No', 'No (W)')} disabled={answerSendingIsGoing}
                    handleTrueClick={() => handleAnswer(true, [], true)} handleFalseClick={() => handleAnswer(false, [], true)} />); break;
                default: break;
            }
            break;
        }
        case 'untypedAnswer': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text={switchTextForDeviceType('Train the question', 'Train the question (Enter)')} disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<SingleButton text={switchTextForDeviceType('Check the answer', 'Check the answer (Enter)')} disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'check': selectedComponent = (<TrueFalseButtons trueText={switchTextForDeviceType('Correct', 'Correct (Q)')} falseText={switchTextForDeviceType('Incorrect', 'Incorrect (W)')} disabled={answerSendingIsGoing}
                    handleTrueClick={() => handleAnswer(true, [], true)} handleFalseClick={() => handleAnswer(false, [], true)} />); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text={switchTextForDeviceType('Train the question', 'Train the question (Enter)')} disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'train': case 'trainAfterLearning': break; //show nothing
                case 'check': {
                    if (isAnswerCorrect || iDontKnow) {
                        selectedComponent = (<SingleButton text={switchTextForDeviceType('Next', 'Next (Enter)')} disabled={answerSendingIsGoing} handleClick={() => handleSendingHavingGotAnswerAndGoingNext()} />);
                    }
                    else {
                        selectedComponent = (<MainButtonWithObjectionButton mainText={switchTextForDeviceType('Next', 'Next (Enter)')} objectionText='It was correct!' disabled={answerSendingIsGoing}
                            handleMainButtonClick={() => handleSendingHavingGotAnswerAndGoingNext()} handleObjectionButtonClick={() => handleChallengingIncorrectness()} />);
                    }
                    break;
                }
                default: break;
            }
            break;
        }
        case 'untypedAndTypedAnswers': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text={switchTextForDeviceType('Train the question', 'Train the question (Enter)')} disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'speak': case 'speakAfterLearning': selectedComponent = (<SingleButton text={switchTextForDeviceType('Go to typing', 'Go to typing (Enter)')} disabled={answerSendingIsGoing} handleClick={() => handleGoNext()} />); break;
                case 'write': break; //show nothing
                case 'check': {
                    if (iDontKnow || questionIsChallenged) {
                        selectedComponent = (<SingleButton text={switchTextForDeviceType('Next', 'Next (Enter)')} disabled={answerSendingIsGoing} handleClick={() => handleSendingHavingGotAnswerAndGoingNext()} />);
                    }
                    else if (isAnswerCorrect) {
                        selectedComponent = (<TrueFalseButtons trueText={switchTextForDeviceType('Correct', 'Correct (Q)')} falseText={switchTextForDeviceType('Incorrect', 'Incorrect (W)')} disabled={answerSendingIsGoing}
                            handleTrueClick={() => handleSendingHavingGotAnswerAndGoingNext(true)} handleFalseClick={() => handleSendingHavingGotAnswerAndGoingNext(false)} />);
                    }
                    else {
                        selectedComponent = (<MainButtonWithObjectionButton mainText={switchTextForDeviceType('Next', 'Next (Enter)')} objectionText='It was correct!' disabled={answerSendingIsGoing}
                            handleMainButtonClick={() => handleSendingHavingGotAnswerAndGoingNext()} handleObjectionButtonClick={() => handleChallengingIncorrectness()} />);
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