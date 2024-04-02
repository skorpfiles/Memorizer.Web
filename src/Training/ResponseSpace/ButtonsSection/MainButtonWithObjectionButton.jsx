function MainButtonWithObjectionButton() {
    return (
        <div className='row' style={{ "width": "100%", "alignItems":"stretch" }}>
            <button className='main-button border-radius-small font--main-for-controls' style={{ "flex": "6 0 0" }}>Next</button>
            <div style={{"width":"0.5rem"}} />
            <button className='main-button border-radius-small font--notes' style={{ "flex": "1 0 0" }}>It was correct!</button>
        </div>
    );
}

export default MainButtonWithObjectionButton;