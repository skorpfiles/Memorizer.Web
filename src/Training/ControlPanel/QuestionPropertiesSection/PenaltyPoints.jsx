import blockIcon from './block.png';
function PenaltyPoints(state) {
    return (
        <div style={{ "display": "flex", "flexDirection": "row", "flexGrow": "1" }}>
            <img src={blockIcon} width='16rem' alt='PP' title='Penalty Points' />
            <div style={{ "flexGrow": "1", "marginLeft": "0.15rem" }}>{state.value}</div>
        </div>
    )
}

export default PenaltyPoints;