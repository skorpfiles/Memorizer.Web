import styles from './TrueFalseButtons.module.css';
import { useEffect } from 'react';

function TrueFalseButtons(props) {

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'q':
                case 'Q':
                    props.handleTrueClick();
                    break;
                case 'w':
                case 'W':
                    props.handleFalseClick();
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [props]);

    return (
        <div className='row'>
            <button className={`main-button border-radius-small font--main-for-controls ${styles['true-button']}`} onClick={() => props.handleTrueClick()} disabled={props.disabled}>{props.trueText}</button>
            <div className={styles['separator']} />
            <button className={`main-button border-radius-small font--main-for-controls ${styles['false-button']}`} onClick={() => props.handleFalseClick()} disabled={props.disabled}>{props.falseText}</button>
        </div>
    );
}

export default TrueFalseButtons;