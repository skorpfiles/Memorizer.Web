import './RadioButton.css';

function RadioButton(props) {
    let containerClassName = "RadioButton";
    if (props.containerClassName) {
        containerClassName += ' ' + props.containerClassName;
    }
    return (
        <div className={containerClassName}>
            <input type="radio" value={props.value} id={props.id} checked={props.checked} />
            <input type="button" className="MainButton FullWidth Font-MainForControls" for={props.id} id={props.id} value={props.text} onClick={props.onChange} />
        </div>
    )
}

export default RadioButton;