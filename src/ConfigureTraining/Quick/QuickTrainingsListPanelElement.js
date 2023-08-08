import { useState } from 'react';
import SettingsIcon from './settings.png';
import IconButton from '../../IconButton';
import './QuickTrainingsListPanelElement.css';

function QuickTrainingsListPanelElement(props) {
    const [mouseOnElement, setMouseOnElement] = useState(false);

    return (<li
        onMouseEnter={() => setMouseOnElement(true)}
        onMouseLeave={() => setMouseOnElement(false)}
    >
        <div className="QuickTrainingsListPanelElement-LineContainer">
            <div className="QuickTrainingsListPanelElement-Link">
                <a href="#">{props.training.name}</a>
            </div>
            <IconButton visibility={mouseOnElement} src={SettingsIcon} alt="Settings" title="Settings" />
        </div>
    </li>);
}

export default QuickTrainingsListPanelElement;