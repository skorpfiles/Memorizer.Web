import TypingAnswerPanel from './TypingAnswerPanel';
function QuestionWithTypingAnswer() {
    return (
        <div className='column' style={{ "alignItems": "center", "justifyContent": "center", "height":"100%", "width":"100%" }} >
            <div className='column' style={{ "alignItems": "stretch", "height": "15rem", "justifyContent": "space-around", "width": "100%" }}>
                <div className='font--main-for-training-questions' style={{"margin":"auto"}}>table</div>
                <div className='column' style={{ "width": "100%" }}>
                    <TypingAnswerPanel />
                </div>
            </div>
        </div>
    );
}

export default QuestionWithTypingAnswer;