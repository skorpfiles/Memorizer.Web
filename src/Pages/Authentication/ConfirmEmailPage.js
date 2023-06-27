import AuthenticationPanel from '../../UserManagement/AuthenticationPanel';
import MemorizerLogoWithSubtitle from './MemorizerLogoWithSubtitle';
import { useEffect } from 'react';
import './ConfirmEmailPage.css';

function ConfirmEmailPage(props) {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="VerticalCenterColumn">
                <div className="SuccessMessage">Your email has been confirmed successfully.<br />Now you can log in.</div>
                <div className="Column-small">
                    <MemorizerLogoWithSubtitle />
                    <AuthenticationPanel
                        handleLogIn={props.handleLogIn}
                        currentUser={props.currentUser}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConfirmEmailPage;