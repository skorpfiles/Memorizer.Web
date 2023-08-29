import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';
import { PasswordValidations } from './Utils.js';

function AuthenticationPanel(props) {
    const methods = useForm();
    const onSubmit = data => props.handleLogIn(data.username, data.password);

    return (
        <FormProvider {...methods}>
            <form
                className="Panel DisplayFlex BigBorderRadius"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <InputWithValidation
                    containerClassName="MainControlContainer"
                    inputClassName="MainTextBox FullWidth Font-MainForControls SmallBorderRadius"
                    inputName="username"
                    inputId="Username"
                    inputType="text"
                    inputPlaceholder="Username"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "Username is required."
                        }
                    }}
                    disabled={props.currentUser.isUserLogging}
                />
                <InputWithValidation
                    containerClassName="MainControlContainer"
                    inputClassName="MainTextBox FullWidth Font-MainForControls SmallBorderRadius"
                    inputName="password"
                    inputId="Password"
                    inputType="password"
                    inputPlaceholder="Password"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={PasswordValidations}
                    disabled={props.currentUser.isUserLogging}
                />
                <div className="MainControlContainer">
                    <input className="MainButton FullWidth Font-MainForControls" type="submit" id="LogIn" value="Log In" disabled={props.currentUser.isUserLogging} />
                    {props.currentUser.isLoggingError && (
                        <div className="ErrorLabel">{props.currentUser.loggingErrorMessage}</div>)
                    }
                </div>
                <div className="CenterText Font-Default">or {!props.currentUser.isUserLogging && (<a href="/Register">register</a>)}{props.currentUser.isUserLogging && "register"}</div>
            </form>
        </FormProvider>
    );
}

export default AuthenticationPanel;