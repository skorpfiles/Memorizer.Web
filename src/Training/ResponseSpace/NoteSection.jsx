import styles from './NoteSection.module.css';

import { useSelector } from 'react-redux';

function NoteSection() {
    let resultComponent;
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    const trainingStage = useSelector(state => state.trainingState.trainingStage);
    const isAnswerCorrect = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].isAnswerCorrect);
    const questionIsChallenged = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].challenged);

    switch (questionType) {
        case 'task': {
            switch (trainingStage) {
                case 'learn': resultComponent = (<div>It's a task. Please do this and then click "Done".</div>); break;
                case 'trainAfterLearning': resultComponent = (<div>Repeat the task again.<br/>Have you done this successfully?</div>); break;
                case 'train': resultComponent = (<div>It's a task. Please do this.<br/>Have you done this successfully?</div>); break;
                default: break;
            }
            break;
        }
        case 'untypedAnswer': {
            switch (trainingStage) {
                case 'learn': resultComponent = (<div>Please learn this answer, and then click "Train the question".</div>); break;
                case 'train': resultComponent = (<div>Please answer this question, and check your answer.</div>); break;
                case 'check': resultComponent = (<div>How was your answer?</div>); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (trainingStage) {
                case 'learn': resultComponent = (<div>Please learn these answers, and then click "Train the question".<br/>You will need to type the answers.</div>); break;
                default: break;
            }
            break;
        }
        case 'untypedAndTypedAnswers': {
            switch (trainingStage) {
                case 'learn': resultComponent = (<div>Please learn these answers, and then click "Train the question".</div>); break;
                case 'speak': resultComponent = (<div>Answer this question verbally, and then go to typed answering.</div>); break;
                case 'check':
                    if (isAnswerCorrect && !questionIsChallenged) {
                        resultComponent = (<div>How was your verbal answer?</div>); break;
                    }
                    break;
                default: break;
            }
            break;
        }
        default: break;
    }

    return (
        <div className={`font--default ${styles['content']}`}>{resultComponent}</div>
    );
}

export default NoteSection;