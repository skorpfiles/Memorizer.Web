import styles from './SingleButton.module.css';

function SingleButton(props) {
    return (
        <div className='column'>
            <button className={`main-button border-radius-small font--main-for-controls ${styles['content']}`} onClick={() => props.handleClick()} disabled={props.disabled}>{props.text}</button>
        </div>
    );
}

export default SingleButton;