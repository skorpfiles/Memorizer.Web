import ButtonsSection from './ResponseSpace/ButtonsSection';
import NoteSection from './ResponseSpace/NoteSection';

function ResponseSpace() {
    return (
        <div className='column' style={{ "border": "1px solid black", "minHeight": "7.5rem", "alignItems": "center", "justifyContent": "center" }}>
            <NoteSection questionType='typedAnswers' trainingStage='check' />
            <ButtonsSection questionType='typedAnswers' trainingStage='check' typedAnswersCheckResultMode='incorrect' />
        </div>
    )
}

export default ResponseSpace;