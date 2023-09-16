import AuthenticationPanel from '../../UserManagement/AuthenticationPanel';
import MemorizerLogoWithSubtitle from './MemorizerLogoWithSubtitle';
import { useEffect } from 'react';
import styles from './AuthenticationPage.module.css';
import { useSelector } from 'react-redux';

function AuthenticationPage() {
    const emailConfirmationIsFinished = useSelector(state => state.emailConfirmationState.isFinished);
    const emailConfirmationIsSucceed = useSelector(state => state.emailConfirmationState.isSucceed);

    useEffect(() => {
        document.title = 'Memorizer';
    });

    return (
        <div className='middle-vertical-align-container'>
            <div className='vertical-center-column middle-vertical-align-block'>
                {
                    (emailConfirmationIsFinished && emailConfirmationIsSucceed) &&
                    (<div className={styles['success-message']}>Your email has been confirmed successfully.<br />Now you can log in.</div>)
                }
                {
                    (emailConfirmationIsFinished && !emailConfirmationIsSucceed) &&
                    (<div className={styles['fail-message']}>Unable to confirm e-mail.<br />Log in to repeat.</div>)
                }
                <div className='column-small'>
                    <MemorizerLogoWithSubtitle />
                    <AuthenticationPanel/>
                </div>
            </div>
        </div>
    )
}

export default AuthenticationPage;