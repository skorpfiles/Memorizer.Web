import styles from './IconButton.module.css';

function IconButton(props) {
    return (
        <div style={{ visibility: props.visibility ? "visible" : "hidden" }}>
            <img className={styles['icon-button']} src={props.src} width="12rem" height="12rem" alt={props.alt} title={props.title} onClick={props.onClick } />
        </div>
    );
}

export default IconButton;