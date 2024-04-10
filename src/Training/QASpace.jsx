import MainText from './QASpace/MainText';
import NeutralQuestionAndAnswer from './QASpace/NeutralQuestionAndAnswer';
import QuestionResults from './QASpace/QuestionResults';
import QuestionWithTypingAnswer from './QASpace/QuestionWithTypingAnswer';
import styles from './QASpace.module.css';
import './TrainingSpace.css';

function QASpace(props) {
    let selectedComponent;
    switch (props.questionType) {
        case 'task': {
            selectedComponent = (<MainText />);
            break;
        }
        case 'untypedAnswer': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<NeutralQuestionAndAnswer/>); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<MainText />); break;
                case 'check': selectedComponent = (<QuestionResults questionType={props.questionType} typedAnswersCheckResultMode={props.typedAnswersCheckResultMode} />); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<NeutralQuestionAndAnswer />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<QuestionWithTypingAnswer />); break;
                case 'check': selectedComponent = (<QuestionResults questionType={props.questionType} typedAnswersCheckResultMode={props.typedAnswersCheckResultMode} />); break;
                default: break;
            }
            break;
        }
        default: break;
    }
    return (
        <div className={`flex-all-free-space training-space-width ${styles['content']}`}>
            {selectedComponent}
        </div>
    )
}

export default QASpace;