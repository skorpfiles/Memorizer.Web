function SingleButton(props) {
    return (
        <div className='column'>
            <button className='main-button border-radius-small font--main-for-controls' style={{ "width": "20rem", "margin":"auto" }}>{props.text}</button>
        </div>
    );
}

export default SingleButton;