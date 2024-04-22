import styles from './Stage.module.css';
function Stage(props) {
    return props.isActive ? (
        <div className={`font--notes font--bold ${styles['content']} ${styles['active']}`}>{`► ${props.name}`}</div>
    ) : (
            <div className={`font--notes ${styles['content']}`}>{props.name}</div>
    );
}

export default Stage;