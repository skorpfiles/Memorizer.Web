import './ReturnToMainPage.css';
import { useNavigate } from 'react-router-dom';
import PointerButton from './PointerButton';

function ReturnToMainPage() {
    const navigate = useNavigate();
    return (
        <div className="ReturnToMainPage-Container">
            <PointerButton id="Back" value="<" onClick={() => navigate("/")} />
            <div className="Font-MainForControls ReturnToMainPage-Label" onClick={() => navigate("/")} ><a href="#">Return to the main page</a></div>
        </div>
    )
}

export default ReturnToMainPage;