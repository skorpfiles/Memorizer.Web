import AuthenticationPanel from './UserManagement/AuthenticationPanel';
import MemorizerLogoWithSubtitle from './MemorizerLogoWithSubtitle';

function AuthenticationPage() {
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