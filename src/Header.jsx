import styles from './Header.module.css';
import UserAccountHeaderSection from './UserManagement/UserAccountHeaderSection';
import { useSelector } from 'react-redux';

function Header() {
    const userIsLogged = useSelector(state => state.user.isUserLogged);
    const isWallpaperView = useSelector(state => state.wallpaperView.isWallpaperView);
    const currentWallpaperView = useSelector(state => state.wallpaperView.currentWallpaperView);
    const backgroundImage = (!isWallpaperView ? 'linear-gradient(#ABC0E4, #ABC0E4, transparent)' : null);

    return (
        <header className={styles['container']} style={{ backgroundImage }}>
            <div className={styles['logo']}><a className={styles['memorizer-href']} href='/'>Memorizer</a></div>
            {userIsLogged && (<UserAccountHeaderSection />)}
        </header>
    );
}

export default Header;