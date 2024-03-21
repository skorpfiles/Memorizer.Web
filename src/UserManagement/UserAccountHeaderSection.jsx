import styles from './UserAccountHeaderSection.module.css';
import userIcon from './user.png';
import logoutIcon from './logout.png';
import waitIcon from './wait.gif';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../ReduxStore/user';
import { emailConfirmationStateActions } from '../ReduxStore/emailConfirmationState';
import { logOut } from '../Utils/authentication';

function UserAccountHeaderSection() {
    const userLoginSelector = useSelector(state => state.user.userLogin);
    const accessToken = useSelector(state => state.user.accessToken);
    const authenticationInProcess = useSelector(state => state.user.isUserLogging);

    const dispatch = useDispatch();

    return (
        <div className={`border-radius-small ${styles['container']}`}>
            <img src={userIcon} width='16rem' alt='User' title={userLoginSelector} />
            <div className={styles['separator']}></div>
            <button className={styles['logOutButton']} onClick={() => logOut(accessToken, dispatch, userActions, emailConfirmationStateActions)}>
                {!authenticationInProcess && <img src={logoutIcon} width='16rem' alt='Log Out' title='Log Out' className={styles['logOutButtonImage']} />}
                {authenticationInProcess && <img src={waitIcon} width='16rem' alt='Please wait' />}
            </button>
        </div>
    )
}

export default UserAccountHeaderSection;