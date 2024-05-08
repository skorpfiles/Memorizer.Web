import styles from './MainButtonWithObjectionButton.module.css';
function MainButtonWithObjectionButton(props) {
    return (
        <div className={`row ${styles['container']}`}>
            <button className={`main-button border-radius-small font--main-for-controls ${styles['main-button']}`} onClick={() => props.handleMainButtonClick()} disabled={props.disabled}>Next</button>
            <div className={styles['separator']} />
            <button className={`main-button border-radius-small font--notes ${styles['objection-button']}`} onClick={() => props.handleObjectionButtonClick()} disabled={props.disabled}>It was correct!</button>
        </div>
    );
}

export default MainButtonWithObjectionButton;