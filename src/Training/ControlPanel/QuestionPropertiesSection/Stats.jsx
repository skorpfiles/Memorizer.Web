import Rating from './Rating';
import PenaltyPoints from './PenaltyPoints';
function Stats() {
    return (
        <div style={{"display":"flex", "flexDirection":"row"}}>
            <Rating />
            <PenaltyPoints/>
        </div>
    )
}

export default Stats;