import './Header.css';
import UserAccountHeaderSection from './UserManagement/UserAccountHeaderSection';

function Header(props) {
    let userAccountSection = <UserAccountHeaderSection
        userLogin={props.userLogin}
        handleLogOut={props.handleLogOut }
    />
    return (
        <header>
            <div className="logo">Memorizer</div>
            {props.userIsLogged && userAccountSection}
        </header>
    );
}

export default Header;