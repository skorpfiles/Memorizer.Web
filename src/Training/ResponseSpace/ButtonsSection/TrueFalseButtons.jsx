import styles from './TrueFalseButtons.module.css';
function TrueFalseButtons(props) {
    return (
        <div className='row' style={{"width":"100%"}}>
            <button className='main-button border-radius-small font--main-for-controls' style={{"flex":"1 0 0", "backgroundColor":"#00cc00","borderColor":"#00cc00"}}>{props.trueText}</button>
            <div className={styles['separator']} />
            <button className='main-button border-radius-small font--main-for-controls' style={{ "flex": "1 0 0", "backgroundColor":"red","borderColor":"red" }}>{props.falseText}</button>
        </div>
    );
}

export default TrueFalseButtons;