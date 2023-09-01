import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../Controls/InputWithValidation';
import { PasswordValidations } from './Utils.js';
import { logIn } from '../Utils/authentication';

import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../ReduxStore/user';
import { emailSendingStateActions } from '../ReduxStore/emailSendingState';

function AuthenticationPanel() {
    const dispatch = useDispatch();
    const isUserLogging = useSelector(state => state.user.isUserLogging);
    const isLoggingError = useSelector(state => state.user.isLoggingError);
    const loggingErrorMessage = useSelector(state => state.user.loggingErrorMessage);

    const methods = useForm();
    const onSubmit = data => logIn(data.username, data.password, dispatch, userActions, emailSendingStateActions);

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
                    disabled={isUserLogging}
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
                    disabled={isUserLogging}
                />
                <div className="main-control-container">
                    <input className="main-button full-width font--main-for-controls" type="submit" id="LogIn" value="Log In" disabled={isUserLogging} />
                    {isLoggingError && (
                        <div className="error-label">{loggingErrorMessage}</div>)
                    }
                </div>
                <div className="central-text font--default">or {!isUserLogging && (<a href="/Register">register</a>)}{isUserLogging && "register"}</div>
            </form>
        </FormProvider>
    );
}

export default AuthenticationPanel;