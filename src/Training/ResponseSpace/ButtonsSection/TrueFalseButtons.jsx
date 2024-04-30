import styles from './TrueFalseButtons.module.css';
function TrueFalseButtons(props) {
    return (
        <div className='row'>
            <button className={`main-button border-radius-small font--main-for-controls ${styles['true-button']}`} onClick={()=>props.handleTrueClick()}>{props.trueText}</button>
            <div className={styles['separator']} />
            <button className={`main-button border-radius-small font--main-for-controls ${styles['false-button']}`} onClick={() => props.handleFalseClick()}>{props.falseText}</button>
        </div>
    );
}

export default TrueFalseButtons;