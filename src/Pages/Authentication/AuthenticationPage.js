import AuthenticationPanel from '../../UserManagement/AuthenticationPanel';
import MemorizerLogoWithSubtitle from './MemorizerLogoWithSubtitle';
import { useEffect } from 'react';
import './AuthenticationPage.css';

function AuthenticationPage(props) {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="VerticalCenterColumn MiddleVerticalAlignBlock">
                {
                    (props.emailConfirmation.isFinished && props.emailConfirmation.isSucceed) &&
                    (<div className="SuccessMessage">Your email has been confirmed successfully.<br />Now you can log in.</div>)
                }
                {
                    (props.emailConfirmation.isFinished && !props.emailConfirmation.isSucceed) &&
                    (<div className="FailMessage">Unable to confirm e-mail.<br />Log in to repeat.</div>)
                }
                <div className="Column-small">
                    <MemorizerLogoWithSubtitle />
                    <AuthenticationPanel
                        handleLogIn={props.handleLogIn}
                        currentUser={props.currentUser}
                    />
                </div>
            </div>
        </div>
    )
}

export default AuthenticationPage;