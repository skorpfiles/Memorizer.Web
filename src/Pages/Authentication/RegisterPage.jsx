import RegisterPanel from '../../UserManagement/RegisterPanel'
import { useEffect } from 'react';

function RegisterPage(props) {
    useEffect(() => {
        document.title = "Register User - Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="MiddleVerticalAlignBlock Column-small">
                <div className="TitleBeforePanel">
                    <div className="Font-MainForLabels">
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