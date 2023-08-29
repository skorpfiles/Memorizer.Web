import './PointerButton.css';

function PointerButton(props) {
    return (
        <input className="PointerButton MainButton" type="submit" id={props.id} value={props.value} onClick={props.onClick} disabled={props.disabled} />
    )
}

export default PointerButton;