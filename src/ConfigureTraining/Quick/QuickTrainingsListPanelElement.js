import { useState } from 'react';
import settingsIcon from './settings.png';
import SettingsButton from './SettingsButton';
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
            <SettingsButton visibility={mouseOnElement} />
        </div>
    </li>);
}

export default QuickTrainingsListPanelElement;