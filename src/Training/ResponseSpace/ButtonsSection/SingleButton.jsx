import styles from './SingleButton.module.css';
import { useEnterKey } from '../../../hooks/useEnterKey.js';

function SingleButton(props) {
    useEnterKey(props.handleClick);
    return (
        <div className='column'>
            <button className={`main-button border-radius-small font--main-for-controls ${styles['content']}`}
                onClick={() => props.handleClick()} disabled={props.disabled}>{props.text}</button>
        </div>
    );
}

export default SingleButton;