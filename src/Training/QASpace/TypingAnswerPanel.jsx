import InputWithValidation from '../../Controls/InputWithValidation';
import { FormProvider, useForm } from 'react-hook-form';

function TypingAnswerPanel() {
    const methods = useForm();

    return (
        <div className='column'>
            <div className='row border-radius-small' style={{ "border": "0.1rem solid black", "backgroundColor": "white", "padding": "0.5rem", "margin":"0.25rem 0" }}>
                <div style={{ "backgroundColor": "#DAE3F3", "padding": "0.5rem" }}>1 of 2</div>
                <input style={{ "flex": "1 0 0","border":"none", "padding":"0.5rem" }} value='stul'></input>
            </div>
            <div className='row' style={{"margin":"0.25rem 0"}}>
                <button className='main-button border-radius-small font--main-for-controls flex-all-free-space'>OK</button>
                <button className='main-button border-radius-small font--main-for-controls' style={{"marginLeft":"0.5rem"}}>I don't know</button>
            </div>
        </div>
    );
}

export default TypingAnswerPanel;