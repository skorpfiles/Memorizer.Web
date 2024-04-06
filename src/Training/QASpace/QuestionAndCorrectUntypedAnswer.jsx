import QuestionIcon from './question.png';
function QuestionAndCorrectUntypedAnswer() {
    return (
        <div className='column' style={{ "justifyContent": "center", "height": "100%" }}>
            <div className='row' style={{ "padding": "0.4rem 0" }}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className='font--question' style={{ "marginLeft": "0.2rem" }}>How to create a second conditional sentence?</div>
            </div>
            <div className='font--main-for-training-questions border-radius-small' style={{ "margin": "0rem -0.4rem", "border":"0.1rem solid #00cc00","padding":"0.4rem" }}>Second conditional sentences use a past tense in the 'if' clause and would + infinitive in the main clause.</div>
        </div>
    );
}

export default QuestionAndCorrectUntypedAnswer;