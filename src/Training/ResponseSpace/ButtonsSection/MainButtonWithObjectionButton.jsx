import styles from './MainButtonWithObjectionButton.module.css';
import { useEnterKey } from '../../../hooks/useEnterKey.js';

function MainButtonWithObjectionButton(props) {
    useEnterKey(props.handleMainButtonClick);
    return (
        <div className={`row ${styles['container']}`}>
            <button className={`main-button border-radius-small font--main-for-controls ${styles['main-button']}`} onClick={() => props.handleMainButtonClick()} disabled={props.disabled}>{props.mainText}</button>
            <div className={styles['separator']} />
            <button className={`main-button border-radius-small font--notes ${styles['objection-button']}`} onClick={() => props.handleObjectionButtonClick()} disabled={props.disabled}>{props.objectionText}</button>
        </div>
    );
}

export default MainButtonWithObjectionButton;