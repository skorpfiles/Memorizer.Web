import QuestionIcon from './question.png';
function QuestionAndTypedAnswerResults(props) {
    const words = [
        {
            text: 'stol',
            isCorrect: false
        },
        {
            text: 'tablica',
            isCorrect: true
        }
    ];

    let htmlAnswers = [];

    for (let i = 0; i < words.length; i++) {
        htmlAnswers.push(words[i].isCorrect ? (<span>{words[i].text}</span>) : (<span style={{ "color": "red" }}>{words[i].text}</span>));
        if (i < words.length - 1) {
            htmlAnswers.push('; ');
        }
    }

    return (
        <div className='column' style={{ "justifyContent": "center", "height": "100%" }}>
            <div className='row' style={{ "padding": "0.4rem 0" }}>
                <img src={QuestionIcon} width='24rem' alt='Question' title='Question' />
                <div className='font--question' style={{ "marginLeft": "0.2rem" }}>table</div>
            </div>
            <div className='font--main-for-training-questions border-radius-small' style={{ "margin": "0rem -0.4rem", "border": "0.1rem solid #00cc00", "padding": "0.4rem" }}>{htmlAnswers.map(ans => ans)}</div>
            {props.typedAnswersCheckResultMode === 'incorrect' && (<div className='font--default' style={{ "margin": "0.8rem", "textAlign": "center", "color": "red" }}>You have some mistakes.<br />The question will be retrained soon.</div>)}
            {props.typedAnswersCheckResultMode === 'correct' && (<div className='font--main-for-training-questions' style={{ "margin": "0.8rem", "textAlign": "center", "color": "#00cc00" }}>correct</div>)}
        </div>
    );
}

export default QuestionAndTypedAnswerResults;