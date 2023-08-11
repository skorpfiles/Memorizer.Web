import './DotRadioButton.css';

function DotRadioButton(props) {
    return (
        <div className="DotRadioButton">
            <input type="radio" id={props.id} name={props.name} checked={props.checked} onChange={props.onChange} />
            <label for={props.id}></label>
        </div>
    );
}

export default DotRadioButton;