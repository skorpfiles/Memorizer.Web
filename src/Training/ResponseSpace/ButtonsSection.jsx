import SingleButton from './ButtonsSection/SingleButton';
import TrueFalseButtons from './ButtonsSection/TrueFalseButtons';
import MainButtonWithObjectionButton from './ButtonsSection/MainButtonWithObjectionButton';

function ButtonsSection(props) {
    let selectedComponent;
    switch (props.questionType) {
        case 'task': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Done' />); break;
                case 'train': selectedComponent = (<TrueFalseButtons trueText='Yes' falseText='No' />); break;
                default: break;
            }
            break;
        }
        case 'untypedAnswer': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' />); break;
                case 'train': selectedComponent = (<SingleButton text='Check the answer' />); break;
                case 'check': selectedComponent = (<TrueFalseButtons trueText='Correct' falseText='Incorrect' />); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': {
            switch (props.trainingStage) {
                case 'learn': selectedComponent = (<SingleButton text='Train the question' />); break;
                case 'check': {
                    switch (props.typedAnswersCheckResultMode) {
                        case 'incorrect': selectedComponent = (<MainButtonWithObjectionButton mainText='Next' objectionText='It was correct!' />); break;
                        case 'correct': selectedComponent = (<SingleButton text='Next' />); break;
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
        <div style={{ "margin": "0.25rem" }}>
            {selectedComponent}
        </div>
    )
}

export default ButtonsSection;