import RegisterPanel from './UserManagement/RegisterPanel'

function RegisterPage() {
    return (
        <div className="MiddleVerticalAlignContainer">
            <div className="Column-small">
                <div className="TitleBeforePanel">
                    <div className="Font-MainForLabels">
                        Register a new account
                    </div>
                </div>
                <RegisterPanel />
            </div>
        </div>
    )
}

export default RegisterPage;