import alarmIcon from './alarm.png';

function StopwatchSection() {
    return (
        <div className='font--bold' style={{ "display": "flex", "borderRight": "0.1rem solid black", "minHeight": "100%" }}>
            <div style={{ "display": "flex", "flexDirection": "row", "margin": "0.2rem", "minHeight": "100%" }}>
                <img src={alarmIcon} width='20rem' alt='QLT' title='Question Learning Time' />
                <div style={{ "flexGrow": "1", "marginLeft": "0.15rem", "minHeight": "100%", "display": "flex", "flexDirection": "column", "alignItems": "center", "justifyContent":"center" }}>0:08</div>
            </div>
        </div>
    )
}

export default StopwatchSection;