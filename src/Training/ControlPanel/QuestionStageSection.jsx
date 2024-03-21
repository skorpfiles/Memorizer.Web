import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
function QuestionStageSection() {
    return (
        <div style={{ "display": "flex", "flexDirection":"row"}}>
            <NewQuestionSignal />
            <Stage />
            <Stage />
            <Stage />
        </div>
    )
}

export default QuestionStageSection;