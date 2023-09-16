import styles from './IconButton.module.css';

function IconButton(props) {
    return (
        <button className={styles['icon-button']} style={{ visibility: props.visibility === 'hidden' ? 'hidden' : 'visible' }} onClick={props.onClick}>
            <img className={styles['icon-image']} src={props.src} width='12rem' height='12rem' alt={props.alt} title={props.title} />
        </button>
    );
}

export default IconButton;