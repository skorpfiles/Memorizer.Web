import styles from './PointerButton.module.css';

function PointerButton(props) {
    return (
        <button className={`main-button border-radius-big ${styles['pointer-button']}`} id={props.id} onClick={props.onClick} disabled={props.disabled}>{props.value}</button>
    )
}

export default PointerButton;