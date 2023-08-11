import { useState } from 'react';
import IconButton from '../IconButton';
import DeleteIcon from './delete.png';

function QuestionnairesListForTrainingElement(props) {
    const [mouseOnElement, setMouseOnElement] = useState(false);

    return (<li
        onMouseEnter={() => setMouseOnElement(true)}
        onMouseLeave={() => setMouseOnElement(false)}
    >
        <div className="EllipsisList-LineContainer">
            <div className="EllipsisList-Label">
                {props.name}
            </div>
            <IconButton visibility={mouseOnElement} src={DeleteIcon} alt="Remove" title="Remove" onClick={props.handleDeleteElement} />
        </div>
    </li>);
}

export default QuestionnairesListForTrainingElement;