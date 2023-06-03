import './UserAccountHeaderSection.css';
import userIcon from './user.png';

function UserAccountHeaderSection(props) {
    return (
        <div className="UserAccountHeaderSection-Main">
            <div className="UserAccountHeaderSection-UserIcon">
                <img src={userIcon} width="32em" alt="User" />
            </div>
            <div className="UserAccountHeaderSection-Text">
                {props.userName} (<a id="logout" href="#">log out</a>)
            </div>
        </div>
    )
}

export default UserAccountHeaderSection;