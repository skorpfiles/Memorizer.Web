import styles from './DotRadioButton.module.css';
import { useFormContext } from 'react-hook-form';

function DotRadioButton(props) {

    const { register } = useFormContext();

    return (
        <div className={styles['dot-radio-button']} >
            <input type='radio' id={props.id} value={props.value} {...register(props.name, {onChange:(event)=>props.onChange(event.target.value)})} />
            <label for={props.id}></label>
        </div>
    );
}

export default DotRadioButton;