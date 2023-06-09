import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import './RegisterPanel.css';

function RegisterPanel() {
    const captchaRef = useRef(null);
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    const [isRegisterButtonEnabled, setIsRegisterButtonEnabled] = useState(false);

    return (
        <form className="Panel">
            <input className="MainTextBox FullWidth Font-MainForControls" id="Email" placeholder="Email" />
            <input className="MainTextBox FullWidth Font-MainForControls" id="Username" placeholder="Username" />
            <input className="MainTextBox FullWidth Font-MainForControls" id="Password" type="password" placeholder="Password" />
            <input className="MainTextBox FullWidth Font-MainForControls" id="RepeatPassword" type="password" placeholder="Repeat the password" />
            <div className="CaptchaContainer">
                <ReCAPTCHA
                    ref={captchaRef}
                    sitekey={siteKey}
                    size="compact"
                    onChange={() => setIsRegisterButtonEnabled(true)}
                />
            </div>
            <input className="MainButton FullWidth Font-MainForControls" type="submit" id="registerButton" value="Register" disabled={!isRegisterButtonEnabled} />
            <div className="CenterText Font-Default"><a href="/">I already have an account</a></div>
        </form>
    );
}

export default RegisterPanel;