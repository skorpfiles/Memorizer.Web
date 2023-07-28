import './ReturnToMainPage.css';
import { useNavigate } from 'react-router-dom';

function ReturnToMainPage() {
    const navigate = useNavigate();
    return (
        <div className="ReturnToMainPage-Container">
            <input className="ReturnToMainPage-Button MainButton" type="submit" id="Back" value="<" onClick={()=> navigate("/") } />
            <div className="Font-MainForControls ReturnToMainPage-Label">Return to the main page</div>
        </div>
    )
}

export default ReturnToMainPage;