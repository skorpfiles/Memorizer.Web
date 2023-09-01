import './Header.css';
import UserAccountHeaderSection from './UserManagement/UserAccountHeaderSection';
import { useSelector } from 'react-redux';

function Header() {
    const userIsLogged = useSelector(state => state.user.isUserLogged);
    return (
        <header>
            <div className="logo">Memorizer</div>
            {userIsLogged && (<UserAccountHeaderSection />)}
        </header>
    );
}

export default Header;