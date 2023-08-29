import RegisterPanel from '../../UserManagement/RegisterPanel'
import { useEffect } from 'react';

function RegisterPage(props) {
    useEffect(() => {
        document.title = "Register User - Memorizer";
    });
    return (
        <div className="middle-vertical-align-container">
            <div className="middle-vertical-align-block column-small">
                <div className="title-before-panel">
                    <div className="font--main-for-labels">
                        Register a new account
                    </div>
                </div>
                <RegisterPanel
                    currentUser={props.currentUser}
                    registrationState={props.registrationState}
                    handleRegister={props.handleRegister}
                />
            </div>
        </div>
    )
}

export default RegisterPage;