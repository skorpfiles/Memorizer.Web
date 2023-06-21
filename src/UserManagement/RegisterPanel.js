import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import './RegisterPanel.css';
import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';

function RegisterPanel() {
    const captchaRef = useRef(null);
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    const [isRegisterButtonEnabled, setIsRegisterButtonEnabled] = useState(false);

    const methods = useForm();
    const onSubmit = data => console.log(data);

    return (
        <FormProvider {...methods}>
            <form className="Panel" onSubmit={methods.handleSubmit(onSubmit)}>
                <InputWithValidation
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="Email"
                    inputName="Email"
                    inputType="text"
                    inputPlaceholder="E-mail"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "E-mail is required."
                        }
                    }}
                />
                <InputWithValidation
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="Username"
                    inputName="Username"
                    inputType="text"
                    inputPlaceholder="Username"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "Username is required."
                        }
                    }}
                />
                <InputWithValidation
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="Password"
                    inputName="Password"
                    inputType="password"
                    inputPlaceholder="Password"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "Password is required."
                        }
                    }}
                />
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
        </FormProvider>
    );
}

export default RegisterPanel;