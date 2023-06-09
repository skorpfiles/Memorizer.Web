function AuthenticationPanel() {
    return (
        <form className="Panel">
            <input className="MainTextBox FullWidth Font-MainForControls" id="Username" placeholder="Username" />
            <input className="MainTextBox FullWidth Font-MainForControls" id="Password" type="password" placeholder="Password" />
            <input className="MainButton FullWidth Font-MainForControls" type="submit" id="LogIn" value="Log In" />
            <div className="CenterText Font-Default">or <a href="/Register">register</a></div>
        </form>
    )
}

export default AuthenticationPanel;