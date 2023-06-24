import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import './RegisterPanel.css';
import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import { PasswordValidations } from './Utils.js';

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
                        },
                        pattern: {
                            value:
                                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: 'Must be a correct e-mail string.',
                        },
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
                        },
                        maxLength: {
                            value: 100,
                            message: "Username must have maximum 100 symbols."
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
                    inputValidation={PasswordValidations}
                />
                <InputWithValidation
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputId="RepeatPassword"
                    inputName="RepeatPassword"
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