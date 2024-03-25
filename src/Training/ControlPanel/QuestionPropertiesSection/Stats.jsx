import Rating from './Rating';
import PenaltyPoints from './PenaltyPoints';
function Stats() {
    return (
        <div style={{ "display": "flex", "flexDirection": "row" }}>
            <PenaltyPoints value="0" />
            <div style={{"width":"0.5rem"}}/>
            <Rating value="50" isNew={ true } />
        </div>
    )
}

export default Stats;