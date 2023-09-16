import styles from './PointerButton.module.css';

function PointerButton(props) {
    return (
        <input className={`main-button border-radius-big ${styles['pointer-button']}`} type='submit' id={props.id} value={props.value} onClick={props.onClick} disabled={props.disabled} />
    )
}

export default PointerButton;