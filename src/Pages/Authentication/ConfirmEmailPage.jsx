import { useEffect } from 'react';

function ConfirmEmailPage(props) {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="middle-vertical-align-container">
            <div className="vertical-center-column">
                <div className="font--main-for-labels">Confirmation...</div>
            </div>
        </div>
    );
}

export default ConfirmEmailPage;