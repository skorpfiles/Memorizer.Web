import styles from './Footer.module.css';
import SkorpFilesLogoBlack from './SkorP Files 256px Logo Black.png';
import { useSelector } from 'react-redux';

function Footer() {
    const currentWallpaperView = useSelector(state => state.wallpaperView.currentWallpaperView);
    const backgroundImage = (currentWallpaperView === 'none' ? 'linear-gradient(transparent, #ABC0E4, #ABC0E4)' : null);

    return (
        <footer className={styles['container']} style={{ backgroundImage }}>
            <div className={styles['about-text']}>Memorizer is a <a href='https://skorp24.info' target='_blank' rel='noopener noreferrer'>SkorP Files'</a> product.</div>
            <div className={styles['logo']}>
                <img src={SkorpFilesLogoBlack} width='64rem' alt='SkorP Files' />
            </div>
        </footer>
    );
}

export default Footer;