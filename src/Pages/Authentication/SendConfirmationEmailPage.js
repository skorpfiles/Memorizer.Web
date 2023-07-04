import { useEffect } from 'react';

function SendConfirmationEmailPage(props) {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer VerticalCenterColumn">
            <div className="MainControlContainer MiddleVerticalAlignBlock">
                <div className="Font-MainForLabels CenterText">You should confirm your e-mail before continuing.<br />If you already sent the e-mail, click the link inside that.</div>
            </div>
            <div className="MainControlContainer CenterText">
                <button onClick={props.handleSendingEmail} disabled={props.emailSendingState.isExecuting} className="MainButton Font-MainForControls CentralButton IncreaseButtonHeight">Send confirmation e-mail</button>
            </div>
        </div>
    );
}

export default SendConfirmationEmailPage;