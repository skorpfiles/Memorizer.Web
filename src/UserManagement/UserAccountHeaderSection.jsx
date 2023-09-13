import styles from './UserAccountHeaderSection.module.css';
import userIcon from './user.png';
import logoutIcon from './logout.png';
import { useSelector, useDispatch } from 'react-redux';
import { userActions } from '../ReduxStore/user';
import { emailConfirmationStateActions } from '../ReduxStore/emailConfirmationState';
import { logOut } from '../Utils/authentication';

function UserAccountHeaderSection() {
    const userLoginSelector = useSelector(state => state.user.userLogin);
    const accessToken = useSelector(state => state.user.accessToken);

    const dispatch = useDispatch();

    return (
        <div className={styles['container']}>
            <img src={userIcon} width="16rem" alt="User" />
            <div className={styles['userName']}>
                {userLoginSelector}
            </div>
            <img src={logoutIcon} width="16rem" alt="Log Out" title="Log Out" className={styles['logOutButton']} onClick={() => logOut(accessToken, dispatch, userActions, emailConfirmationStateActions)} />
        </div>
    )
}

export default UserAccountHeaderSection;