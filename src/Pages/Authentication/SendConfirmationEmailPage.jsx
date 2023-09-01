import { useEffect } from 'react';
import { sendConfirmationEmail } from '../../Utils/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { emailSendingStateActions } from '../../ReduxStore/emailSendingState';

function SendConfirmationEmailPage() {
    const dispatch = useDispatch();
    const emailSendingAccessToken = useSelector(state => state.emailSendingState.accessToken);
    const emailSendingIsExecuting = useSelector(state => state.emailSendingState.isExecuting);

    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="middle-vertical-align-container vertical-center-column">
            <div className="main-control-container middle-vertical-align-block">
                <div className="font--main-for-labels central-text">You should confirm your e-mail before continuing.<br />If you already sent the e-mail, click the link inside that.</div>
            </div>
            <div className="main-control-container central-text">
                <button onClick={() => sendConfirmationEmail(emailSendingAccessToken, dispatch, emailSendingStateActions)} disabled={emailSendingIsExecuting} className="main-button central-button font--main-for-controls central-button--small-width increased-button-height">Send confirmation e-mail</button>
            </div>
        </div>
    );
}

export default SendConfirmationEmailPage;