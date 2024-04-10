import styles from './MainText.module.css';
function MainText() {
    return (
        <div className={`column ${styles['container']}`}>
            <div className='font--main-for-training-questions'>Perform the Mozart's Symphony No. 40.</div>
        </div>
    );
}

export default MainText;