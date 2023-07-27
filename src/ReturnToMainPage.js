import './ReturnToMainPage.css';

function ReturnToMainPage() {
    return (
        <div className="ReturnToMainPage-Container">
            <a href="/"><input className="ReturnToMainPage-Button MainButton" type="submit" id="Back" value="<" href="/" /></a>
            <div className="Font-MainForControls ReturnToMainPage-Label">Return to the main page</div>
        </div>
    )
}

export default ReturnToMainPage;