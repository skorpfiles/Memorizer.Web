import Rating from './Rating';
import PenaltyPoints from './PenaltyPoints';
import styles from './Stats.module.css';
function Stats() {
    return (
        <div className='row'>
            <PenaltyPoints value="0" />
            <div className={styles['separator']} />
            <Rating value="50" isNew={ true } />
        </div>
    )
}

export default Stats;