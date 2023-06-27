import { useEffect } from 'react';
import './ConfirmEmailPage.css';

function ConfirmEmailPage(props) {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="VerticalCenterColumn">
                <div className="Font-MainForLabels">Confirmation...</div>
            </div>
        </div>
    );
}

export default ConfirmEmailPage;