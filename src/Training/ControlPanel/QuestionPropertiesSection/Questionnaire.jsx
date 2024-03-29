import bookIcon from './book.png';
import iconAndValueStyles from '../IconAndValue.module.css';
function Questionnaire(props) {
    return (
        <div className='row'>
            <img src={bookIcon} width='16rem' alt='Questionnaire' title='Questionnaire' />
            <div className={`overflow-ellipsis ${iconAndValueStyles['value']}`}>{props.name}</div>
        </div>
    )
}

export default Questionnaire;