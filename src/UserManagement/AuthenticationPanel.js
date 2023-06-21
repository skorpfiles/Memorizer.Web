import { FormProvider, useForm } from 'react-hook-form';
import InputWithValidation from '../InputWithValidation';

function AuthenticationPanel() {
    const methods = useForm();
    const onSubmit = data => console.log(data);

    return (
        <FormProvider {...methods}>
            <form
                className="Panel"
                onSubmit={methods.handleSubmit(onSubmit)}
            >
                <InputWithValidation
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputName="Username"
                    inputId="Username"
                    inputType="text"
                    inputPlaceholder="Username"
                    validationLabelClassName="ValidationLabel"
                    inputValidation={{
                        required: {
                            value: true,
                            message: "Username is required."
                        }
                    } }
                />
                <InputWithValidation
                    inputClassName="MainTextBox FullWidth Font-MainForControls"
                    inputName="Password"
                    inputId="Password"
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
                <input className="MainButton FullWidth Font-MainForControls" type="submit" id="LogIn" value="Log In" />
                <div className="CenterText Font-Default">or <a href="/Register">register</a></div>
            </form>
        </FormProvider>
    );
}

export default AuthenticationPanel;