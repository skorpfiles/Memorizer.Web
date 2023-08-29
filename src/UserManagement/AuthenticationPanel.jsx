import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import { PasswordValidations } from './Utils.js';

function AuthenticationPanel(props) {
    const methods = useForm();
    const onSubmit = data => props.handleLogIn(data.username, data.password);

    return (
        <FormProvider {...methods}>
            <form
                className="panel display-flex border-radius-big"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <InputWithValidation
                    containerClassName="main-control-container"
                    inputClassName="main-text-box full-width font--main-for-controls border-radius-small"
                    inputName="username"
                    inputId="Username"
                    inputType="text"
                    inputPlaceholder="Username"
                    validationLabelClassName="validation-label"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "Username is required."
                        }
                    }}
                    disabled={props.currentUser.isUserLogging}
                />
                <InputWithValidation
                    containerClassName="main-control-container"
                    inputClassName="main-text-box full-width font--main-for-controls border-radius-small"
                    inputName="password"
                    inputId="Password"
                    inputType="password"
                    inputPlaceholder="Password"
                    validationLabelClassName="validation-label"
                    inputValidation={PasswordValidations}
                    disabled={props.currentUser.isUserLogging}
                />
                <div className="main-control-container">
                    <input className="main-button full-width font--main-for-controls" type="submit" id="LogIn" value="Log In" disabled={props.currentUser.isUserLogging} />
                    {props.currentUser.isLoggingError && (
                        <div className="error-label">{props.currentUser.loggingErrorMessage}</div>)
                    }
                </div>
                <div className="central-text font--default">or {!props.currentUser.isUserLogging && (<a href="/Register">register</a>)}{props.currentUser.isUserLogging && "register"}</div>
            </form>
        </FormProvider>
    );
}

export default AuthenticationPanel;