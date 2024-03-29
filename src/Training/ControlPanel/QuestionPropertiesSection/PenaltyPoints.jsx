import blockIcon from './block.png';
import iconAndValueStyles from '../IconAndValue.module.css';
function PenaltyPoints(props) {
    return (
        <div className='row flex-all-free-space'>
            <img src={blockIcon} width='16rem' alt='PP' title='Penalty Points' />
            <div className={`flex-all-free-space ${iconAndValueStyles['value']}`}>{props.value}</div>
        </div>
    )
}

export default PenaltyPoints;