import MainPanel from './ControlPanel/MainPanel';
import ReferencePanel from './ControlPanel/ReferencePanel';
import styles from './ControlPanel.module.css';
import './TrainingSpace.css';
function ControlPanel(props) {
    return (
        <div className={`column training-space-width ${styles['container']}`}>
            <MainPanel trainingStage={props.trainingStage} />
            <div className={styles['separator']}></div>
            <ReferencePanel/>
        </div>
    )
}

export default ControlPanel;