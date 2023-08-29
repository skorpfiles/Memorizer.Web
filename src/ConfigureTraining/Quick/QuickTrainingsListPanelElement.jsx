import { useState } from 'react';
import SettingsIcon from './settings.png';
import IconButton from '../../Controls/IconButton';
import styles from './QuickTrainingsListPanelElement.module.css';

function QuickTrainingsListPanelElement(props) {
    const [mouseOnElement, setMouseOnElement] = useState(false);

    return (<li
        onMouseEnter={() => setMouseOnElement(true)}
        onMouseLeave={() => setMouseOnElement(false)}
    >
        <div className={styles['line-container']}>
            <div className={styles['link-container']}>
                <a href="#">{props.training.name}</a>
            </div>
            <IconButton visibility={mouseOnElement} src={SettingsIcon} alt="Settings" title="Settings" />
        </div>
    </li>);
}

export default QuickTrainingsListPanelElement;