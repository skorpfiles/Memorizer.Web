import SettingsIcon from './settings.png';
import IconButton from '../../Controls/IconButton';
import styles from './QuickTrainingsListPanelElement.module.css';

function QuickTrainingsListPanelElement(props) {
    return (
        <li>
            <div className='tight-list-element row border-box'>
                <div className={`overflow-ellipsis ${styles['select-button']}`}>
                    {props.training.name}
                </div>
                <div className={styles['separator']}></div>
                <div className={styles['settings-button'] }>
                    <IconButton src={SettingsIcon} alt='Settings' title='Settings' />
                </div>
            </div>
        </li>);
}

export default QuickTrainingsListPanelElement;