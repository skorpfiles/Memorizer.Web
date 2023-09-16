import './Footer.css';
import SkorpFilesLogo from './SkorP Files Logo.png';

function Footer() {
    return (
        <footer>
            <div className='about-text'>Memorizer is a <a href='https://skorp24.info'>SkorP Files'</a> product.</div>
            <div className='logo'>
                <img src={SkorpFilesLogo} width='64rem' alt='SkorP Files' />
            </div>
        </footer>
    );
}

export default Footer;