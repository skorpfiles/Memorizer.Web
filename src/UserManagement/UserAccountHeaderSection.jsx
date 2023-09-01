import styles from './UserAccountHeaderSection.module.css';
import userIcon from './user.png';
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
            <div>
                <img src={userIcon} width="32em" alt="User" />
            </div>
            <div>
                {userLoginSelector} (<span onClick={() => logOut(accessToken, dispatch, userActions, emailConfirmationStateActions)}><a id="logout" href="#">log out</a></span>)
            </div>
        </div>
    )
}

export default UserAccountHeaderSection;