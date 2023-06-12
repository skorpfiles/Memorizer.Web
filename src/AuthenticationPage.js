import AuthenticationPanel from './UserManagement/AuthenticationPanel';
import MemorizerLogoWithSubtitle from './MemorizerLogoWithSubtitle';
import { useEffect } from 'react';

function AuthenticationPage() {
    useEffect(() => {
        document.title = "Memorizer";
    });
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="Column-small">
                <MemorizerLogoWithSubtitle />
                <AuthenticationPanel />
            </div>
        </div>
    )
}

export default AuthenticationPage;