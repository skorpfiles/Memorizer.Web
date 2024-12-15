import MainText from './QASpace/MainText';
import NeutralQuestionAndAnswer from './QASpace/NeutralQuestionAndAnswer';
import QuestionResults from './QASpace/QuestionResults';
import QuestionWithTypingAnswer from './QASpace/QuestionWithTypingAnswer';
import styles from './QASpace.module.css';
import './TrainingSpace.css';

import { useSelector } from 'react-redux';

function QASpace() {
    const trainingStage = useSelector(state => state.trainingState.trainingStage);
    const questionType = useSelector(state => state.trainingState.questions[state.trainingState.currentQuestionIndex].type);
    let selectedComponent;
    switch (questionType) {
        case 'task': {
            selectedComponent = (<MainText />);
            break;
        }
        case 'untypedAnswer': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<NeutralQuestionAndAnswer/>); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<MainText />); break;
                case 'check': selectedComponent = (<QuestionResults />); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<NeutralQuestionAndAnswer />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<QuestionWithTypingAnswer />); break;
                case 'check': selectedComponent = (<QuestionResults />); break;
                default: break;
            }
            break;
        }
        case 'untypedAndTypedAnswers': {
            switch (trainingStage) {
                case 'learn': selectedComponent = (<NeutralQuestionAndAnswer />); break;
                case 'speak': case 'speakAfterLearning': selectedComponent = (<MainText />); break;
                case 'write': selectedComponent = (<QuestionWithTypingAnswer />); break;
                case 'check': selectedComponent = (<QuestionResults />); break;
                default: break;
            }
            break;
        }
        default: break;
    }
    return (
        <div className={`flex-all-free-space training-space-qa-width ${styles['content']}`}>
            {selectedComponent}
        </div>
    )
}

export default QASpace;