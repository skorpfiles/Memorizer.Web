import './Footer.css';
import SkorpFilesLogo from './SkorP Files Logo.png';

function Footer() {
    return (
        <footer>
            <div className="Footer-AboutText">Memorizer is a <a href="https://skorp24.info">SkorP Files'</a> product.</div>
            <div className="Footer-Logo">
                <img src={SkorpFilesLogo} width="64em" alt="SkorP Files" />
            </div>
        </footer>
    );
}

export default Footer;