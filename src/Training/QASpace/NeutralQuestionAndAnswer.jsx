import QuestionIcon from './question.png';
function NeutralQuestionAndAnswer(props) {
    return (
        <div className='column' style={{ "justifyContent": "center", "height": "100%" }}>
            <div className='row' style={{ "borderBottom":"0.1rem dashed black", "padding":"0.4rem 0"}}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className='font--question' style={{"marginLeft":"0.2rem"}}>How to create a second conditional sentence?</div>
            </div>
            <div className='font--main-for-training-questions' style={{"margin":"0.4rem 0"}}>Second conditional sentences use a past tense in the 'if' clause and would + infinitive in the main clause.</div>
        </div>
    );
}

export default NeutralQuestionAndAnswer;