import { useState } from 'react';
import SettingsIcon from './settings.png';
import IconButton from '../../Controls/IconButton';
import styles from './QuickTrainingsListPanelElement.module.css';

function QuickTrainingsListPanelElement(props) {
    const [mouseOnElement, setMouseOnElement] = useState(false);

    return (<li>
        <div style={{
            fontSize: "1rem",
            color: "#002060",
            width: "100%",
            border: "0.15rem solid #8FAADC",
            backgroundImage: "linear-gradient(to bottom, white 0%, white 50%, #DAE3F3 100%)",
            textAlign: "left",
            
            marginBottom: "-0.15rem",
            display: "flex",
            alignItems: "center",

            boxSizing: "border-box"
        }}>
            <div style={{
                flexGrow: "1", cursor: "pointer", padding: "0.25rem 0.35rem",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis"
            }}>
                {props.training.name}
            </div>
            <div style={{ width: "0.025rem", height:"1rem", backgroundColor: "#8FAADC" }}></div>
            <div style={{ padding: "0.25rem 0.35rem", cursor: "pointer" }}>
                <IconButton src={SettingsIcon} alt="Settings" title="Settings" />
            </div>
        </div>
    </li>);
}

export default QuickTrainingsListPanelElement;