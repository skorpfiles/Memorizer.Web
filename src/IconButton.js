import './IconButton.css';

function IconButton(props) {
    return (
        <div style={{ visibility: props.visibility ? "visible" : "hidden" }}>
            <img className="IconButton" src={props.src} width="12em" height="12em" alt={props.alt} title={props.title } />
        </div>
    );
}

export default IconButton;