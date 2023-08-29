import { useEffect } from 'react';

function WeSentEmailPage() {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="middle-vertical-align-container vertical-center-column">
            <div className="main-control-container">
                <div className="font--main-for-labels central-text">Thank you for the registration!<br />We've sent a confirmation e-mail for you.<br />After the confirmation you will be able to log in.</div>
            </div>
            <div className="main-control-container">
                <div className="font--default central-text"><a href="/">Return to the main page</a></div>
            </div>
        </div>
    );
}

export default WeSentEmailPage;