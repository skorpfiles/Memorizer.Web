import styles from './ReferencePanel.module.css';
import { useSelector } from 'react-redux';

function ReferencePanel() {
    const reference = useSelector(state => state.trainingState.currentQuestion.reference);
    return (
        <div className={`font--notes ${styles['container']}`}>
            <div className={`overflow-ellipsis ${styles['content']}`} title={reference}>Reference: {reference}</div>
        </div>
    )
}

export default ReferencePanel;