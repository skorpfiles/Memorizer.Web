import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import './RegisterPanel.css';
import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import { PasswordValidations } from './Utils.js';

function RegisterPanel(props) {
    const captchaRef = useRef(null);
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    const [isCaptchaConfirmed, setIsCaptchaConfirmed] = useState(false);

    const methods = useForm();
    const onSubmit = data => console.log(data);

    const [registerState, setRegisterState] = useState({
        isRegistering: false,
        isRegisteringError: false,
        registeringErrorMessage: null
    });

    return (
        <FormProvider {...methods}>
            <form className="Panel" onSubmit={methods.handleSubmit(onSubmit)}>
                <InputWithValidation
                    containerClassName="MainControlContainer"
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="Email"
                    inputName="email"
                    inputType="text"
                    inputPlaceholder="E-mail"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "E-mail is required."
                        },
                        pattern: {
                            value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Must be a correct e-mail string.',
                        },
                    }}
                />
                <InputWithValidation
                    containerClassName="MainControlContainer"
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="Username"
                    inputName="username"
                    inputType="text"
                    inputPlaceholder="Username"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "Username is required."
                        },
                        maxLength: {
                            value: 100,
                            message: "Username must have maximum 100 symbols."
                        }
                    }}
                />
                <InputWithValidation
                    containerClassName="MainControlContainer"
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="Password"
                    inputName="password"
                    inputType="password"
                    inputPlaceholder="Password"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={PasswordValidations}
                />
                <InputWithValidation
                    containerClassName="MainControlContainer"
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="RepeatPassword"
                    inputName="repeatPassword"
                    inputType="password"
                    inputPlaceholder="Repeat the password"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        validate: (val) => {
                            if (methods.watch('Password') != val) {
                                return "The passwords must be the same.";
                            }
                        },
                    }}
                />
                <div className="CaptchaContainer">
                    <ReCAPTCHA
                        ref={captchaRef}
                        sitekey={siteKey}
                        size="compact"
                        onChange={() => setIsCaptchaConfirmed(true)}
                    />
                </div>
                <div className="MainControlContainer">
                    <input className="MainButton FullWidth Font-MainForControls" type="submit" id="registerButton" value="Register" disabled={!isCaptchaConfirmed || registerState.isRegistering} />
                    {props.currentUser.isLoggingError && (
                        <div className="ErrorLabel">{props.currentUser.loggingErrorMessage}</div>)
                    }
                </div>
                <div className="CenterText Font-Default"><a href="/">I already have an account</a></div>
            </form>
        </FormProvider>
    );
}

export default RegisterPanel;