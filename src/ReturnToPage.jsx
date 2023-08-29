import './ReturnToPage.css';
import { useNavigate } from 'react-router-dom';
import PointerButton from './PointerButton';

function ReturnToPage(props) {
    const navigate = useNavigate();
    const handleClick = props.customClickHandler ?? (() => navigate(props.path));
    return (
        <div className="ReturnToPage-Container">
            <PointerButton id="Back" value="<" onClick={handleClick} />
            <div className="Font-MainForControls ReturnToPage-Label" onClick={handleClick} ><a href="#">{props.text}</a></div>
        </div>
    )
}

export default ReturnToPage;