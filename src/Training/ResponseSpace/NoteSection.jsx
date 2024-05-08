import styles from './NoteSection.module.css';
function NoteSection(props) {
    let resultComponent;
    switch (props.questionType) {
        case 'task': {
            switch (props.trainingStage) {
                case 'learn': resultComponent = (<div>It's a task. Please do this and then click "Done".</div>); break;
                case 'trainAfterLearning': resultComponent = (<div>Then repeat the task again.<br/>Have you done this successfully?</div>); break;
                case 'train': resultComponent = (<div>It's a task. Please do this.<br/>Have you done this successfully?</div>); break;
                default: break;
            }
            break;
        }
        case 'untypedAnswer': {
            switch (props.trainingStage) {
                case 'learn': resultComponent = (<div>Please learn this answer, and then click "Train the question".</div>); break;
                case 'train': resultComponent = (<div>Please answer this question, and check your answer.</div>); break;
                case 'check': resultComponent = (<div>How was your answer?</div>); break;
                default: break;
            }
            break;
        }
        case 'typedAnswers': case 'untypedAndTypedAnswers': {
            switch (props.trainingStage) {
                case 'learn': resultComponent = (<div>Please learn these answers, and then click "Train the question".<br/>You will need to type the answers.</div>); break;
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