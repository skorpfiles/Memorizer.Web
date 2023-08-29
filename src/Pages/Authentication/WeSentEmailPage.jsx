import { useEffect } from 'react';

function WeSentEmailPage() {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer VerticalCenterColumn">
            <div className="MainControlContainer">
                <div className="Font-MainForLabels CenterText">Thank you for the registration!<br />We've sent a confirmation e-mail for you.<br />After the confirmation you will be able to log in.</div>
            </div>
            <div className="MainControlContainer">
                <div className="Font-Default CenterText"><a href="/">Return to the main page</a></div>
            </div>
        </div>
    );
}

export default WeSentEmailPage;