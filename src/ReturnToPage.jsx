import styles from './ReturnToPage.module.css';
import { useNavigate } from 'react-router-dom';
import PointerButton from './Controls/PointerButton';

function ReturnToPage(props) {
    const navigate = useNavigate();
    const handleClick = props.customClickHandler ?? (() => navigate(props.path));
    return (
        <div className={styles['container']}>
            <PointerButton id='Back' value='<' onClick={handleClick} />
            <div className={`font--main-for-controls ${styles['labelled-button']}`}><span className='link-button' onClick={handleClick}>{props.text}</span></div>
        </div>
    )
}

export default ReturnToPage;