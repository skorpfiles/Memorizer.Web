import styles from './UserAccountHeaderSection.module.css';
import userIcon from './user.png';

function UserAccountHeaderSection(props) {
    return (
        <div className={styles['container']}>
            <div>
                <img src={userIcon} width="32em" alt="User" />
            </div>
            <div>
                {props.userLogin} (<span onClick={props.handleLogOut}><a id="logout" href="#">log out</a></span>)
            </div>
        </div>
    )
}

export default UserAccountHeaderSection;