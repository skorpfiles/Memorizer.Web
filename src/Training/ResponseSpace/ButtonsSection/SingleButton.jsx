function SingleButton(props) {
    return (
        <button className='main-button border-radius-small font--main-for-controls' style={{"width":"20rem"}}>{props.text}</button>
    );
}

export default SingleButton;