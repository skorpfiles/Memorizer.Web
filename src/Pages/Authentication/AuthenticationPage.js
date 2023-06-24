import AuthenticationPanel from '../../UserManagement/AuthenticationPanel';
import MemorizerLogoWithSubtitle from './MemorizerLogoWithSubtitle';
import { useEffect } from 'react';

function AuthenticationPage(props) {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="Column-small">
                <MemorizerLogoWithSubtitle />
                <AuthenticationPanel
                    handleLogIn={props.handleLogIn }
                    currentUser={props.currentUser }
                />
            </div>
        </div>
    )
}

export default AuthenticationPage;