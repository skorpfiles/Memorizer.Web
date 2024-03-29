import chartIcon from './chart.png';
import iconAndValueStyles from '../IconAndValue.module.css';
function Rating(props) {
    return (
        <div className='row flex-all-free-space'>
            <img src={chartIcon} width='16rem' alt='Rating' title='Rating' />
            <div className={`flex-all-free-space ${iconAndValueStyles['value']}`}>{props.isNew ? 'N' : props.value}</div>
        </div>
    )
}

export default Rating;