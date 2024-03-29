import MainPanel from './ControlPanel/MainPanel';
import ReferencePanel from './ControlPanel/ReferencePanel';
import styles from './ControlPanel.module.css';
function ControlPanel() {
    return (
        <div className={`column ${styles['container']}`}>
            <MainPanel />
            <div className={styles['separator']}></div>
            <ReferencePanel reference='Very Long Reference Very Long Reference Very Long Reference Very Long Reference Very Long Reference Very Long Reference' />
        </div>
    )
}

export default ControlPanel;