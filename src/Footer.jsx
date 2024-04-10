import styles from './Footer.module.css';
import SkorpFilesLogo from './SkorP Files Logo.png';
import { useSelector } from 'react-redux';

function Footer() {
    const isWallpaperView = useSelector(state => state.wallpaperView.isWallpaperView);
    const currentWallpaperView = useSelector(state => state.wallpaperView.currentWallpaperView);
    const backgroundImage = (!isWallpaperView ? 'linear-gradient(transparent, #ABC0E4, #ABC0E4)' : null);

    return (
        <footer className={styles['container']} style={{ backgroundImage }}>
            <div className={styles['about-text']}>Memorizer is a <a href='https://skorp24.info' target='_blank' rel='noopener noreferrer'>SkorP Files'</a> product.</div>
            <div className={styles['logo']}>
                <img src={SkorpFilesLogo} width='64rem' alt='SkorP Files' />
            </div>
        </footer>
    );
}

export default Footer;