import ReCAPTCHA from 'react-google-recaptcha';
import { useRef, useState } from 'react';
import styles from './RegisterPanel.module.css';
import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import { PasswordValidations } from './Utils.js';
import { CallApi } from '../Utils/GlobalUtils';

function RegisterPanel(props) {
    const captchaRef = useRef(null);
    const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    const [isCaptchaConfirmed, setIsCaptchaConfirmed] = useState(false);

    const methods = useForm();
    const onSubmit = data => props.handleRegister(data.email, data.username, data.password, data.repeatPassword, captchaRef.current.getValue());

    return (
        <FormProvider {...methods}>
            <form className="panel display-flex border-radius-big" onSubmit={methods.handleSubmit(onSubmit)}>
                <InputWithValidation
                    containerClassName="main-control-container"
                    inputClassName="main-text-box full-width font--main-for-controls border-radius-small"
                    inputId="Email"
                    inputName="email"
                    inputType="text"
                    inputPlaceholder="E-mail"
                    validationLabelClassName="validation-label"
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
                    containerClassName="main-control-container"
                    inputClassName="main-text-box full-width font--main-for-controls border-radius-small"
                    inputId="Username"
                    inputName="username"
                    inputType="text"
                    inputPlaceholder="Username"
                    validationLabelClassName="validation-label"
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
                    containerClassName="main-control-container"
                    inputClassName="main-text-box full-width font--main-for-controls border-radius-small"
                    inputId="Password"
                    inputName="password"
                    inputType="password"
                    inputPlaceholder="Password"
                    validationLabelClassName="validation-label"
                    inputValidation={PasswordValidations}
                />
                <InputWithValidation
                    containerClassName="main-control-container"
                    inputClassName="main-text-box full-width font--main-for-controls border-radius-small"
                    inputId="RepeatPassword"
                    inputName="repeatPassword"
                    inputType="password"
                    inputPlaceholder="Repeat the password"
                    validationLabelClassName="validation-label"
                    inputValidation={{
                        validate: (val) => {
                            if (methods.watch('password') !== val) {
                                return "The passwords must be the same.";
                            }
                        },
                    }}
                />
                <div className={styles['captcha-container']}>
                    <ReCAPTCHA
                        ref={captchaRef}
                        sitekey={siteKey}
                        size="compact"
                        onChange={(token) => setIsCaptchaConfirmed(token!==null)}
                    />
                </div>
                <div className="main-control-container">
                    <input className="main-button full-width font--main-for-controls" type="submit" id="registerButton" value="Register" disabled={!isCaptchaConfirmed || props.registrationState.isExecuting} />
                    {(props.registrationState.isError) && (
                        <div className="error-label">{props.registrationState.errorMessage}</div>)
                    }
                </div>
                <div className="central-text font--default"><a href="/">I already have an account</a></div>
            </form>
        </FormProvider>
    );
}

export default RegisterPanel;