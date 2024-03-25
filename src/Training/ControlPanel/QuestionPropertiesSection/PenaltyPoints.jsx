import blockIcon from './block.png';
function PenaltyPoints(props) {
    return (
        <div style={{ "display": "flex", "flexDirection": "row", "flexGrow": "1" }}>
            <img src={blockIcon} width='16rem' alt='PP' title='Penalty Points' />
            <div style={{ "flexGrow": "1", "marginLeft": "0.15rem" }}>{props.value}</div>
        </div>
    )
}

export default PenaltyPoints;