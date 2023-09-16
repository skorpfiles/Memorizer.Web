import styles from './ReturnToPage.module.css';
import { useNavigate } from 'react-router-dom';
import PointerButton from './Controls/PointerButton';

function ReturnToPage(props) {
    const navigate = useNavigate();
    const handleClick = props.customClickHandler ?? (() => navigate(props.path));
    return (
        <div className={styles['container']}>
            <PointerButton id='Back' value='<' onClick={handleClick} />
            <label className='font--main-for-controls' onClick={handleClick} ><a href='#'>{props.text}</a></label>
        </div>
    )
}

export default ReturnToPage;