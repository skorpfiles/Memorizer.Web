import NewQuestionSignal from './QuestionStageSection/NewQuestionSignal';
import Stage from './QuestionStageSection/Stage';
function QuestionStageSection() {
    return (
        <div style={{ "display": "flex", "flexDirection": "row", "borderBottom":"0.1rem solid black" }}>
            <NewQuestionSignal />
            <Stage name="Learn" />
            <Stage name="Train" isActive={true} />
        </div>
    )
}

export default QuestionStageSection;