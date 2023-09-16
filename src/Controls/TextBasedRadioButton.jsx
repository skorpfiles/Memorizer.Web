import styles from './TextBasedRadioButton.module.css';

function TextBasedRadioButton(props) {
    let containerClassName = styles['container'];
    if (props.containerClassName) {
        containerClassName += ' ' + props.containerClassName;
    }
    return (
        <div className={containerClassName}>
            <input type='radio' value={props.value} id={props.id} checked={props.checked} />
            <input type='button' className='main-button border-radius-big full-width font--main-for-controls' for={props.id} id={props.id} value={props.text} onClick={props.onChange} />
        </div>
    )
}

export default TextBasedRadioButton;