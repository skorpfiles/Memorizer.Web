import settingsIcon from './settings.png';
import './SettingsButton.css';

function SettingsButton(props) {
    return (
        <div style={{ visibility: props.visibility ? "visible" : "hidden" }}>
            <img className="SettingsButton" src={settingsIcon} width="12em" height="12em" alt="Settings" />
        </div>
    );
}

export default SettingsButton;