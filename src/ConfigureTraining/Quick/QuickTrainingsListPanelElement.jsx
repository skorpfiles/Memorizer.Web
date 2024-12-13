import SettingsIcon from './settings.png';
import IconButton from '../../Controls/IconButton';
import styles from './QuickTrainingsListPanelElement.module.css';
import { useNavigate } from 'react-router-dom';

function QuickTrainingsListPanelElement(props) {
    const navigate = useNavigate();

    const handleSelectTraining = () => {
        navigate(`/train?id=${props.training.id}`);
    }

    const handleEditTraining = (e) => {
        navigate(`/train/configure?id=${props.training.id}`);
        e.stopPropagation();
    }

    return (
        <li>
            <div className='tight-list-element row border-box' onClick={handleSelectTraining}>
                <button className={`overflow-ellipsis font--main-for-lists ${styles['select-button']}`}>
                    {props.training.name}
                </button>
                <div className={styles['separator']}></div>
                <div className={styles['settings-button'] }>
                    <IconButton src={SettingsIcon} alt='Settings' title='Settings' onClick={handleEditTraining} />
                </div>
            </div>
        </li>);
}

export default QuickTrainingsListPanelElement;