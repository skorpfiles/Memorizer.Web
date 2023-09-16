import styles from './Footer.module.css';
import SkorpFilesLogo from './SkorP Files Logo.png';

function Footer() {
    return (
        <footer className={styles['container']}>
            <div className={styles['about-text']}>Memorizer is a <a href='https://skorp24.info'>SkorP Files'</a> product.</div>
            <div className={styles['logo']}>
                <img src={SkorpFilesLogo} width='64rem' alt='SkorP Files' />
            </div>
        </footer>
    );
}

export default Footer;