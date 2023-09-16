import styles from './Header.module.css';
import UserAccountHeaderSection from './UserManagement/UserAccountHeaderSection';
import { useSelector } from 'react-redux';

function Header() {
    const userIsLogged = useSelector(state => state.user.isUserLogged);
    return (
        <header className={styles['container']}>
            <div className={styles['logo']}><a className={styles['memorizer-href']} href='/'>Memorizer</a></div>
            {userIsLogged && (<UserAccountHeaderSection />)}
        </header>
    );
}

export default Header;