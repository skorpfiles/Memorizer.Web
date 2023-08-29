import AuthenticationPanel from '../../UserManagement/AuthenticationPanel';
import MemorizerLogoWithSubtitle from './MemorizerLogoWithSubtitle';
import { useEffect } from 'react';
import style from './AuthenticationPage.module.css';

function AuthenticationPage(props) {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="middle-vertical-align-container">
            <div className="vertical-center-column middle-vertical-align-block">
                {
                    (props.emailConfirmation.isFinished && props.emailConfirmation.isSucceed) &&
                    (<div className={style['success-message']}>Your email has been confirmed successfully.<br />Now you can log in.</div>)
                }
                {
                    (props.emailConfirmation.isFinished && !props.emailConfirmation.isSucceed) &&
                    (<div className={style['fail-message']}>Unable to confirm e-mail.<br />Log in to repeat.</div>)
                }
                <div className="column-small">
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