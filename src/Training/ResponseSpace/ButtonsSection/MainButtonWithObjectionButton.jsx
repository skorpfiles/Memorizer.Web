import styles from './MainButtonWithObjectionButton.module.css';
function MainButtonWithObjectionButton() {
    return (
        <div className={`row ${styles['container']}`}>
            <button className={`main-button border-radius-small font--main-for-controls ${styles['main-button']}`}>Next</button>
            <div className={styles['separator']} />
            <button className={`main-button border-radius-small font--notes ${styles['objection-button']}`}>It was correct!</button>
        </div>
    );
}

export default MainButtonWithObjectionButton;