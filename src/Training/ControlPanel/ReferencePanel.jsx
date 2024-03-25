function ReferencePanel(props) {
    return (
        <div className='font--notes' style={{ "backgroundImage": "linear-gradient(to bottom, white, #C7D5ED)" }}>
            <div style={{"margin":"0.25rem"}}>Reference: {props.reference}</div>
        </div>
    )
}

export default ReferencePanel;