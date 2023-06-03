import './Header.css';
import UserAccountHeaderSection from './UserManagement/UserAccountHeaderSection';

function Header() {
    return (
        <header>
            <div className="Header-Logo">Memorizer</div>
            <UserAccountHeaderSection userName="Test User"/>
        </header>
    );
}

export default Header;