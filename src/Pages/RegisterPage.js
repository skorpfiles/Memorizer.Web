import RegisterPanel from '../UserManagement/RegisterPanel'
import { useEffect } from 'react';

function RegisterPage(props) {
    useEffect(() => {
        document.title = "Register User - Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="Column-small">
                <div className="TitleBeforePanel">
                    <div className="Font-MainForLabels">
                        Register a new account
                    </div>
                </div>
                <RegisterPanel
                    currentUser={ props.currentUser }
                />
            </div>
        </div>
    )
}

export default RegisterPage;