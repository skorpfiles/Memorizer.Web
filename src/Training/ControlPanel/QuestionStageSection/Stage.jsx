import styles from './Stage.module.css';
function Stage(props) {
    return props.isActive ? (
        <div class={`font--notes font--bold ${styles['content']} ${styles['active']}`}>{`► ${props.name}`}</div>
    ) : (
            <div class={`font--notes ${styles['content']}`}>{props.name}</div>
    );
}

export default Stage;