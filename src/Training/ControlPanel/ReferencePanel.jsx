import styles from './ReferencePanel.module.css';
function ReferencePanel(props) {
    return (
        <div className={`font--notes ${styles['container']}`}>
            <div className={`overflow-ellipsis ${styles['content']}`} title={props.reference}>Reference: {props.reference}</div>
        </div>
    )
}

export default ReferencePanel;