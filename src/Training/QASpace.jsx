import MainText from './QASpace/MainText';
import NeutralQuestionAndAnswer from './QASpace/NeutralQuestionAndAnswer';
import QuestionAndCorrectUntypedAnswer from './QASpace/QuestionAndCorrectUntypedAnswer';
import QuestionAndTypedAnswerResults from './QASpace/QuestionAndTypedAnswerResults';
import TypingAnswerPanel from './QASpace/TypingAnswerPanel';
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
                case 'check': selectedComponent = (<QuestionAndCorrectUntypedAnswer/>); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<NeutralQuestionAndAnswer />); break;
                case 'train': case 'trainAfterLearning': selectedComponent = (<TypingAnswerPanel />); break;
                case 'check': selectedComponent = (<QuestionAndTypedAnswerResults />); break;
                default: break;
            }
            break;
        }
        default: break;
    }
    return (
        <div className='flex-all-free-space training-space-width' style={{ "alignItems": "center", "justifyContent":"center","margin":"auto" }}>
            {selectedComponent}
        </div>
    )
}

export default QASpace;